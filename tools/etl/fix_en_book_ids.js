#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const base = path.join(__dirname,'../../data/bible');
const enDir = path.join(base,'en');
const indexPath = path.join(base,'index.json');
if(!fs.existsSync(indexPath)) { console.error('index.json missing'); process.exit(1); }
const index = JSON.parse(fs.readFileSync(indexPath,'utf8'));

const bookIdMap = {
  'Genesis': 'gen', 'Exodus':'ex','Leviticus':'lev','Numbers':'num','Deuteronomy':'dut','Joshua':'jos','Judges':'jdg','Ruth':'rth','1 Samuel':'1sm','2 Samuel':'2sm','1 Kings':'1ki','2 Kings':'2ki','1 Chronicles':'1ch','2 Chronicles':'2ch','Ezra':'ezr','Nehemiah':'neh','Esther':'est','Job':'job','Psalms':'psa','Proverbs':'pro','Ecclesiastes':'ecc','Song of Solomon':'sos','Isaiah':'isa','Jeremiah':'jer','Lamentations':'lam','Ezekiel':'eze','Daniel':'dan','Hosea':'hos','Joel':'joe','Amos':'amo','Obadiah':'oba','Jonah':'jon','Micah':'mic','Nahum':'nah','Habakkuk':'hab','Zephaniah':'zep','Haggai':'hag','Zechariah':'zec','Malachi':'mal','Matthew':'mat','Mark':'mrk','Luke':'luk','John':'jhn','Acts':'act','Romans':'rom','1 Corinthians':'1co','2 Corinthians':'2co','Galatians':'gal','Ephesians':'eph','Philippians':'php','Colossians':'col','1 Thessalonians':'1th','2 Thessalonians':'2th','1 Timothy':'1ti','2 Timothy':'2ti','Titus':'tit','Philemon':'phm','Hebrews':'heb','James':'jam','1 Peter':'1pe','2 Peter':'2pe','1 John':'1jo','2 John':'2jo','3 John':'3jo','Jude':'jud','Revelation':'rev'
};

function walk(dir){
  const out = [];
  for(const d of fs.readdirSync(dir,{ withFileTypes:true } )){
    if(d.isDirectory()) out.push(path.join(dir,d.name));
  }
  return out;
}

const versions = walk(enDir);
let changed = 0;

for(const verDir of versions){
  const files = fs.readdirSync(verDir).filter(f=>f.endsWith('.json'));
  for(const f of files){
    const fp = path.join(verDir,f);
    try{
      const j = JSON.parse(fs.readFileSync(fp,'utf8'));
      const name = (j.book||'').toString().trim();
      let book_id = (j.book_id||'').toString().trim();
      if(!book_id){
        if(name && bookIdMap[name]) book_id = bookIdMap[name];
        else {
          const basefn = path.basename(f,'.json');
          book_id = basefn.replace(/-/g,'').replace(/[^A-Za-z0-9]/g,'').toLowerCase();
        }
      }

      j.book_id = book_id;
      if(Array.isArray(j.verses)){
        j.verses = j.verses.map(v=>({ chapter: parseInt(v.chapter||0,10)||0, verse: parseInt(v.verse||0,10)||0, id: `${book_id}-${parseInt(v.chapter||0,10)||0}-${parseInt(v.verse||0,10)||0}`, text: (v.text||'').toString().trim() }));
      }

      const target = path.join(verDir, `${book_id}.json`);
      fs.writeFileSync(target, JSON.stringify(j,null,2),'utf8');
      if(target !== fp) fs.unlinkSync(fp);

      const rel = `/data/bible/${path.relative(base, verDir).replace(/\\/g,'/')}/${book_id}.json`;
      const entry = index.books.find(b=>b.id===book_id && b.language==='en' && b.version===path.basename(verDir));
      if(entry) entry.path = rel; else index.books.push({ id: book_id, name_en: name||null, name_zh: null, testament: j.testament||'OT', language:'en', version:path.basename(verDir), path: rel });

      changed++;
      console.log('Normalized', f, '->', book_id + '.json');
    }catch(err){ console.error('skip',fp,err.message); }
  }
}

fs.writeFileSync(indexPath, JSON.stringify(index,null,2),'utf8');
console.log('Done. files normalized=', changed);
