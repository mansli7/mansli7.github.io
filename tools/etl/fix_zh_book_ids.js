#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const base = path.join(__dirname,'../../data/bible');
const zhDir = path.join(base,'zh','CUV');
const indexPath = path.join(base,'index.json');
if(!fs.existsSync(indexPath)) { console.error('index.json missing'); process.exit(1); }
const index = JSON.parse(fs.readFileSync(indexPath,'utf8'));

// build map from Chinese name to id for zh CUV entries
const nameToId = {};
for(const b of index.books){
  if(b.language === 'zh' && b.version === 'CUV' && b.name_zh){
    nameToId[b.name_zh] = b.id;
  }
}

// manual fallbacks for Chinese book names that may not be in index
const chineseMap = {
  '阿摩司書': 'amo',
  '撒母耳記上': '1sm',
  '撒母耳記下': '2sm'
};

function shortIdFromName(name){
  // fallback: take first 3 latin letters or pinyin not available; use lowercased ascii of transliteration
  return name.replace(/[^A-Za-z0-9]/g,'').toLowerCase().slice(0,3) || name.slice(0,6);
}

const files = fs.readdirSync(zhDir).filter(f=>f.endsWith('.json'));
for(const f of files){
  // skip token index files (they live alongside book JSONs)
  if(f.endsWith('-tokens.json')) continue;
  const fp = path.join(zhDir,f);
  try{
    const j = JSON.parse(fs.readFileSync(fp,'utf8'));
    const nameZh = (j.book || '').toString().trim();
    let book_id = (j.book_id || '').toString().trim();
    if(!book_id){
      if(nameZh && nameToId[nameZh]) book_id = nameToId[nameZh];
      else if(nameZh && chineseMap[nameZh]) book_id = chineseMap[nameZh];
      else if(nameZh) book_id = shortIdFromName(nameZh);
      else book_id = path.basename(f,'.json').toLowerCase();
    }
    console.log('Computed book_id for', f, 'nameZh="' + nameZh + '" =>', book_id);

    // normalize verses ids
    if(Array.isArray(j.verses)){
      j.verses = j.verses.map(v=>{
        const ch = parseInt(v.chapter||v.ch||0,10)||0;
        const vs = parseInt(v.verse||v.v||0,10)||0;
        const text = (v.text||v.content||'').toString().trim();
        return { id: `${book_id}-${ch}-${vs}`, chapter: ch, verse: vs, text };
      });
    }

    j.book_id = book_id;

    const target = path.join(zhDir, `${book_id}.json`);
    fs.writeFileSync(target, JSON.stringify(j, null, 2), 'utf8');
    if(target !== fp) fs.unlinkSync(fp);

    // update index entry
    const rel = `/data/bible/zh/CUV/${book_id}.json`;
    const entry = index.books.find(b=>b.id === book_id && b.language==='zh' && b.version==='CUV');
    if(entry) entry.path = rel; else index.books.push({ id: book_id, name_en: null, name_zh: nameZh||null, testament: j.testament||'OT', language:'zh', version:'CUV', path: rel });

    console.log('Fixed', f, '->', book_id + '.json', 'verses=', j.verses.length);
  }catch(err){
    console.error('skip',fp,err.message);
  }
}

fs.writeFileSync(indexPath, JSON.stringify(index, null, 2), 'utf8');
console.log('Updated index.json');
