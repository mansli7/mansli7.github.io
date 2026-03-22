#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { XMLParser } = require('fast-xml-parser');

if(process.argv.length < 5){
  console.log('Usage: node convert_usfx.js <input-usfx.xml> <langCode> <versionCode>');
  process.exit(1);
}

const input = process.argv[2];
const lang = process.argv[3]; // e.g., zh
const version = process.argv[4]; // e.g., CUV

const bookIdMap = {
  'Genesis': 'gen', 'Exodus':'ex','Leviticus':'lev','Numbers':'num','Deuteronomy':'dut','Joshua':'jos','Judges':'jdg','Ruth':'rth','1 Samuel':'1sm','2 Samuel':'2sm','1 Kings':'1ki','2 Kings':'2ki','1 Chronicles':'1ch','2 Chronicles':'2ch','Ezra':'ezr','Nehemiah':'neh','Esther':'est','Job':'job','Psalms':'psa','Proverbs':'pro','Ecclesiastes':'ecc','Song of Solomon':'sos','Isaiah':'isa','Jeremiah':'jer','Lamentations':'lam','Ezekiel':'eze','Daniel':'dan','Hosea':'hos','Joel':'joe','Amos':'amo','Obadiah':'oba','Jonah':'jon','Micah':'mic','Nahum':'nah','Habakkuk':'hab','Zephaniah':'zep','Haggai':'hag','Zechariah':'zec','Malachi':'mal','Matthew':'mat','Mark':'mrk','Luke':'luk','John':'jhn','Acts':'act','Romans':'rom','1 Corinthians':'1co','2 Corinthians':'2co','Galatians':'gal','Ephesians':'eph','Philippians':'php','Colossians':'col','1 Thessalonians':'1th','2 Thessalonians':'2th','1 Timothy':'1ti','2 Timothy':'2ti','Titus':'tit','Philemon':'phm','Hebrews':'heb','James':'jam','1 Peter':'1pe','2 Peter':'2pe','1 John':'1jo','2 John':'2jo','3 John':'3jo','Jude':'jud','Revelation':'rev'
};

function shortBookId(name){ return bookIdMap[name] || name.slice(0,3).toLowerCase(); }

function extractText(node){
  if(node == null) return '';
  if(typeof node === 'string') return node;
  if(Array.isArray(node)) return node.map(extractText).join(' ');
  let out = '';
  for(const k of Object.keys(node)){
    if(k === '#text') out += ' ' + node[k];
    else out += ' ' + extractText(node[k]);
  }
  return out;
}

const xml = fs.readFileSync(input,'utf8');
const parser = new XMLParser({ ignoreAttributes:false, attributeNamePrefix:'@_' });
const obj = parser.parse(xml);

// USFX variants: root could be usfx, bible, or osis. We'll try to find book elements.
function findBooks(o){
  const books = [];
  function walk(n){
    if(!n || typeof n !== 'object') return;
    for(const k of Object.keys(n)){
      if(k.toLowerCase() === 'book'){
        const b = n[k];
        if(Array.isArray(b)) books.push(...b); else books.push(b);
      } else {
        walk(n[k]);
      }
    }
  }
  walk(o);
  return books;
}

const books = findBooks(obj);
if(!books.length){
  console.error('No <book> nodes found in XML. Please provide a USFX file with <book> elements.');
  process.exit(1);
}

const outBase = path.join(__dirname,'../../data/bible', lang, version);
fs.mkdirSync(outBase, { recursive: true });

for(const b of books){
  // book name might be in attribute title or in an element
  const name = b['@_title'] || b['title'] || b['@_code'] || b['@_osisID'] || 'Unknown';
  const bookName = typeof name === 'object' ? extractText(name) : name;
  const book_id = shortBookId(bookName.replace(/[^A-Za-z0-9\s-]/g,'').trim());

  // find chapter nodes inside book
  const chapters = [];
  function collectChapters(node){
    if(!node || typeof node !== 'object') return;
    for(const k of Object.keys(node)){
      if(k.toLowerCase() === 'chapter' || k.toLowerCase() === 'c'){
        const ch = node[k];
        if(Array.isArray(ch)) chapters.push(...ch); else chapters.push(ch);
      } else collectChapters(node[k]);
    }
  }
  collectChapters(b);

  const verses = [];
  for(const ch of chapters){
    const chNum = ch['@_number'] || ch['@_n'] || ch['@_id'] || ch['@_osisID'] || (ch['@_class']?null:null) || null;
    const chNumber = parseInt((chNum||'0').toString().replace(/[^0-9]/g,''),10) || 0;
    // collect verse nodes inside chapter
    const verseNodes = [];
    function collectVerses(node){
      if(!node || typeof node !== 'object') return;
      for(const k of Object.keys(node)){
        if(k.toLowerCase() === 'verse' || k.toLowerCase() === 'v'){
          const vs = node[k];
          if(Array.isArray(vs)) verseNodes.push(...vs); else verseNodes.push(vs);
        } else collectVerses(node[k]);
      }
    }
    collectVerses(ch);
    for(const v of verseNodes){
      const vnum = v['@_number'] || v['@_n'] || v['@_id'] || v['@_osisID'] || null;
      const vNumber = parseInt((vnum||'0').toString().replace(/[^0-9]/g,''),10) || 0;
      const text = normalize(extractText(v));
      if(chNumber && vNumber) verses.push({ chapter: chNumber, verse: vNumber, text });
    }
  }

  // fallback: find verse nodes directly in book if no chapters
  if(!verses.length){
    const verseNodes = [];
    function collectVersesDirect(node){
      if(!node || typeof node !== 'object') return;
      for(const k of Object.keys(node)){
        if(k.toLowerCase() === 'verse' || k.toLowerCase() === 'v'){
          const vs = node[k]; if(Array.isArray(vs)) verseNodes.push(...vs); else verseNodes.push(vs);
        } else collectVersesDirect(node[k]);
      }
    }
    collectVersesDirect(b);
    for(const v of verseNodes){
      const vnum = v['@_number'] || v['@_n'] || v['@_id'] || null;
      const vNumber = parseInt((vnum||'0').toString().replace(/[^0-9]/g,''),10) || 0;
      const text = normalize(extractText(v));
      verses.push({ chapter: 0, verse: vNumber, text });
    }
  }

  function normalize(s){ return String(s||'').replace(/\s+/g,' ').trim(); }

  const out = {
    book: bookName,
    book_id: book_id,
    testament: 'OT',
    language: lang,
    version: version,
    verses: verses.map(v=>({ id: `${book_id}-${v.chapter}-${v.verse}`, chapter: v.chapter, verse: v.verse, text: v.text }))
  };

  const outPath = path.join(outBase, `${book_id}.json`);
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8');
  console.log('Wrote', outPath, 'verses=', out.verses.length);
}
