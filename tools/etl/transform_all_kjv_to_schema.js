#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const base = path.join(__dirname,'../../data/bible');
const verDir = path.join(base,'en','KJV');
const indexPath = path.join(base,'index.json');
if(!fs.existsSync(verDir)) { console.error('KJV dir missing', verDir); process.exit(1); }
const bookIdMap = {
  'Genesis': 'gen', 'Exodus':'ex','Leviticus':'lev','Numbers':'num','Deuteronomy':'dut','Joshua':'jos','Judges':'jdg','Ruth':'rth','1 Samuel':'1sm','2 Samuel':'2sm','1 Kings':'1ki','2 Kings':'2ki','1 Chronicles':'1ch','2 Chronicles':'2ch','Ezra':'ezr','Nehemiah':'neh','Esther':'est','Job':'job','Psalms':'psa','Proverbs':'pro','Ecclesiastes':'ecc','Song of Solomon':'sos','Isaiah':'isa','Jeremiah':'jer','Lamentations':'lam','Ezekiel':'eze','Daniel':'dan','Hosea':'hos','Joel':'joe','Amos':'amo','Obadiah':'oba','Jonah':'jon','Micah':'mic','Nahum':'nah','Habakkuk':'hab','Zephaniah':'zep','Haggai':'hag','Zechariah':'zec','Malachi':'mal','Matthew':'mat','Mark':'mrk','Luke':'luk','John':'jhn','Acts':'act','Romans':'rom','1 Corinthians':'1co','2 Corinthians':'2co','Galatians':'gal','Ephesians':'eph','Philippians':'php','Colossians':'col','1 Thessalonians':'1th','2 Thessalonians':'2th','1 Timothy':'1ti','2 Timothy':'2ti','Titus':'tit','Philemon':'phm','Hebrews':'heb','James':'jam','1 Peter':'1pe','2 Peter':'2pe','1 John':'1jo','2 John':'2jo','3 John':'3jo','Jude':'jud','Revelation':'rev'
};

function shortBookId(name){ if(bookIdMap[name]) return bookIdMap[name]; return name.replace(/[^A-Za-z0-9]/g,'').toLowerCase().slice(0,6); }
function normalizeText(s){ return (s||'').toString().replace(/\s+/g,' ').trim(); }

const files = fs.readdirSync(verDir).filter(f=>f.endsWith('.json'));
let converted = 0;
for(const f of files){
  const fp = path.join(verDir,f);
  try{
    const raw = JSON.parse(fs.readFileSync(fp,'utf8'));
    if(Array.isArray(raw)){
      const bookName = raw[0] && raw[0].book ? raw[0].book : path.basename(f,'.json');
      const book_id = shortBookId(bookName);
      const verses = raw.map(v=>({ chapter: parseInt(v.chapter||v.ch||0,10)||0, verse: parseInt(v.verse||v.v||0,10)||0, text: normalizeText(v.text||v.body||v.content) }));
      const out = { book: bookName, book_id, testament: 'OT', language: 'en', version: 'KJV', verses: verses.map(v=>({ id: `${book_id}-${v.chapter}-${v.verse}`, chapter: v.chapter, verse: v.verse, text: v.text })) };
      const target = path.join(verDir, `${book_id}.json`);
      fs.writeFileSync(target, JSON.stringify(out,null,2),'utf8');
      if(target !== fp) fs.unlinkSync(fp);
      converted++;
      console.log('Converted', f, '->', book_id + '.json', 'verses=', out.verses.length);
    } else if(raw && raw.verses){
      const book_id = raw.book_id || shortBookId(raw.book||path.basename(f,'.json'));
      raw.book_id = book_id;
      const target = path.join(verDir, `${book_id}.json`);
      fs.writeFileSync(target, JSON.stringify(raw,null,2),'utf8');
      if(target !== fp) fs.unlinkSync(fp);
    }
  }catch(err){ console.error('skip',fp,err.message); }
}

let index = { books: [] };
if(fs.existsSync(indexPath)) index = JSON.parse(fs.readFileSync(indexPath,'utf8'));
index.books = index.books.filter(b=> !(b.language==='en' && b.version==='KJV'));
const newFiles = fs.readdirSync(verDir).filter(f=>f.endsWith('.json'));
for(const f of newFiles){
  const j = JSON.parse(fs.readFileSync(path.join(verDir,f),'utf8'));
  index.books.push({ id: j.book_id||path.basename(f,'.json'), name_en: j.book||null, name_zh: null, testament: j.testament||'OT', language: 'en', version: 'KJV', path: `/data/bible/en/KJV/${path.basename(f)}` });
}
fs.writeFileSync(indexPath, JSON.stringify(index,null,2),'utf8');
console.log('Updated index.json for en/KJV; converted files=', converted);
