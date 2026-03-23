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

// USFX/USFM book code map (common codes to our canonical ids)
const codeMap = {
  'GEN':'gen','EXO':'ex','LEV':'lev','NUM':'num','DEU':'dut','JOS':'jos','JDG':'jdg','RUT':'rth','1SA':'1sm','2SA':'2sm','1KI':'1ki','2KI':'2ki','1CH':'1ch','2CH':'2ch','EZR':'ezr','NEH':'neh','EST':'est','JOB':'job','PSA':'psa','PRO':'pro','ECC':'ecc','SNG':'sos','ISA':'isa','JER':'jer','LAM':'lam','EZK':'eze','DAN':'dan','HOS':'hos','JOL':'joe','AMOS':'amo','OBA':'oba','JON':'jon','MIC':'mic','NAM':'nah','HAB':'hab','ZEP':'zep','HAG':'hag','ZEC':'zec','MAL':'mal','MAT':'mat','MRK':'mrk','LUK':'luk','JHN':'jhn','ACT':'act','ROM':'rom','1CO':'1co','2CO':'2co','GAL':'gal','EPH':'eph','PHP':'php','COL':'col','1TH':'1th','2TH':'2th','1TI':'1ti','2TI':'2ti','TIT':'tit','PHM':'phm','HEB':'heb','JAS':'jam','1PE':'1pe','2PE':'2pe','1JN':'1jo','2JN':'2jo','3JN':'3jo','JUD':'jud','REV':'rev'
};

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
  // book name might be in attribute title or in an element (USFX uses <h> for heading and @id for code)
  const rawName = b['h'] || b['H'] || b['@_title'] || b['title'] || b['@_code'] || b['@_osisID'] || null;
  const bookName = rawName ? (typeof rawName === 'object' ? extractText(rawName) : rawName) : 'Unknown';
  const code = (b['@_id'] || b['@_code'] || (b['@_osisID'] ? b['@_osisID'] : null) || '').toString().toUpperCase();
  // Prefer explicit code map; fall back to 3-letter USFM code, then short derived id
  // Try several common code variants (full, plural, 3-letter, plural 3-letter) before falling back
  const code3 = code && code.slice(0,3);
  const book_id = codeMap[code]
    || (code && codeMap[code + 'S'])
    || (code3 && codeMap[code3])
    || (code3 && codeMap[code3 + 'S'])
    || shortBookId(bookName.replace(/[^A-Za-z0-9\s-]/g,'').trim());

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

  // If we still have bad verses (chapter 0 or text is just numbers), try raw-XML fallback
  const looksBad = verses.length === 0 || verses.every(v=> (v.chapter === 0) || (/^\d+$/.test(String(v.text).trim())) );
  // Also consider the case where we only captured verse 1 for many chapters (common in some USFX variants)
  const onlyVerseOnes = verses.length > 0 && verses.every(v=> v.verse === 1) && (new Set(verses.map(v=>v.chapter)).size > 1);
  if(looksBad || onlyVerseOnes){
    const rawVerses = parseBookFromRawXML((b['@_id']||b['@_code']||'').toString().toUpperCase());
    if(rawVerses && rawVerses.length){ verses.length = 0; verses.push(...rawVerses); }
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

  // If we captured verses but they are all verse 1 (common USFX variant where verses are
  // represented differently), attempt the raw-XML fallback to extract full verses.
  if(verses.length > 0 && verses.every(v => v.verse === 1)){
    console.warn('Only captured verse 1 for all verses in', bookName, '- trying raw XML fallback');
    const rawVerses = parseBookFromRawXML((b['@_id']||b['@_code']||'').toString().toUpperCase());
    if(rawVerses && rawVerses.length){
      verses.length = 0; verses.push(...rawVerses);
    }
  }

  // Guard: skip if book_id is empty to avoid writing files like ".json" or "-tokens.json"
  if(!book_id || String(book_id).trim() === ''){
    console.warn('Skipping write for book with empty book_id:', bookName, 'code=', code);
    continue;
  }

  const outPath = path.join(outBase, `${book_id}.json`);
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8');
  console.log('Wrote', outPath, 'verses=', out.verses.length);
}

// --- Raw XML fallback parser for USFX patterns ---
function parseBookFromRawXML(code){
  const raw = xml;
  // find the <book ...> tag that has id/code attribute equal to code
  let pos = 0; let start = -1; let end = -1;
  while((pos = raw.indexOf('<book', pos)) !== -1){
    const tagEnd = raw.indexOf('>', pos);
    if(tagEnd === -1) break;
    const tag = raw.substring(pos, tagEnd+1);
    const m = tag.match(new RegExp('\\b(?:id|ID|Id)=(\\"|\\\')?' + code + "\\1","i"));
    // fallback: also check for code bare inside tag
    if(m || new RegExp('\\b(?:id|ID|Id)=[\"\']?' + code + '[\"\']?','i').test(tag)){
      start = tagEnd + 1;
      end = raw.indexOf('</book>', start);
      if(end === -1) end = raw.length;
      break;
    }
    pos = tagEnd + 1;
  }
  if(start === -1) return null;
  const body = raw.substring(start, end);
  const verses = [];
  // iterate chapters by finding <c ...> tags
  let p = 0;
  while(true){
    const cPos = body.indexOf('<c', p);
    if(cPos === -1) break;
    const cEnd = body.indexOf('>', cPos);
    if(cEnd === -1) break;
    const cTag = body.substring(cPos, cEnd+1);
    const chMatch = cTag.match(/\b(?:id|ID|Id|n)=["']?(\d+)["']?/i);
    const chNum = chMatch ? parseInt(chMatch[1],10) : 0;
    const nextC = body.indexOf('<c', cEnd+1);
    const chunkEnd = nextC === -1 ? body.length : nextC;
    const chunk = body.substring(cEnd+1, chunkEnd);
    // scan for <v ...> occurrences
    let i = 0;
    while(true){
      const vPos = chunk.indexOf('<v', i);
      if(vPos === -1) break;
      const vEnd = chunk.indexOf('>', vPos);
      if(vEnd === -1) break;
      const vTag = chunk.substring(vPos, vEnd+1);
      const vMatch = vTag.match(/\b(?:id|ID|Id|n)=["']?(\d+)["']?/i);
      const vNum = vMatch ? parseInt(vMatch[1],10) : 0;
      let verseText = '';
      if(/\/>\s*$/.test(vTag)){ // self-closing <v .../>
        const after = vEnd + 1;
        // text up to <ve or next <v or <c
        const vePos = chunk.indexOf('<ve', after);
        const nextV = chunk.indexOf('<v', after);
        const cutoff = vePos !== -1 ? vePos : (nextV !== -1 ? nextV : chunk.length);
        verseText = chunk.substring(after, cutoff);
        i = cutoff;
      } else {
        // find closing </v>
        const close = chunk.indexOf('</v>', vEnd+1);
        if(close !== -1){
          verseText = chunk.substring(vEnd+1, close);
          i = close + 4;
        } else {
          i = vEnd +1;
        }
      }
      const cleaned = verseText.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
      if(chNum && vNum && cleaned) verses.push({ chapter: chNum, verse: vNum, text: cleaned });
      else if(vNum && cleaned) verses.push({ chapter: chNum, verse: vNum, text: cleaned });
    }
    p = chunkEnd;
  }
  return verses;
}
