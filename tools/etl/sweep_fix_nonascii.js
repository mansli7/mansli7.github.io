#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const base = path.join(__dirname,'../../data/bible');
const indexPath = path.join(base,'index.json');
if(!fs.existsSync(indexPath)){
  console.error('Missing', indexPath); process.exit(1);
}
const index = JSON.parse(fs.readFileSync(indexPath,'utf8'));
const zhMap = {};
for(const b of index.books){ if(b.language==='zh' && b.name_zh) zhMap[b.name_zh]=b.id; }

function walk(dir){
  const out = [];
  for(const e of fs.readdirSync(dir, { withFileTypes:true } )){
    const p = path.join(dir, e.name);
    if(e.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

function isNonAscii(s){ return /[^\x00-\x7F]/.test(s); }

const files = walk(base).filter(f=>f.endsWith('.json'));
let renamed = 0;
const unmapped = [];

for(const fp of files){
  const fname = path.basename(fp);
  if(!isNonAscii(fname)) continue;
  try{
    const j = JSON.parse(fs.readFileSync(fp,'utf8'));
    let book_id = (j.book_id||'').toString().trim();
    const nameZh = (j.book||'').toString().trim();
    if(!book_id){
      if(nameZh && zhMap[nameZh]) book_id = zhMap[nameZh];
      else if(nameZh) book_id = nameZh.replace(/[^A-Za-z0-9]/g,'').toLowerCase();
    }
    if(!book_id){ unmapped.push(fp); continue; }
    // normalize verses
    if(Array.isArray(j.verses)){
      j.verses = j.verses.map(v=>{
        const ch = parseInt(v.chapter||v.ch||0,10)||0;
        const vs = parseInt(v.verse||v.v||0,10)||0;
        const text = (v.text||v.content||'').toString().trim();
        return { id: `${book_id}-${ch}-${vs}`, chapter: ch, verse: vs, text };
      });
    }
    j.book_id = book_id;
    const target = path.join(path.dirname(fp), `${book_id}.json`);
    fs.writeFileSync(target, JSON.stringify(j,null,2),'utf8');
    if(target !== fp) fs.unlinkSync(fp);
    // update index
    const rel = `/data/bible/${path.relative(base, path.dirname(fp)).replace(/\\\\/g,'/')}/${path.basename(target)}`;
    const entry = index.books.find(b=>b.id===book_id && b.path===rel);
    if(!entry){
      // try to update an existing entry with same id
      const existing = index.books.find(b=>b.id===book_id && b.language===j.language && b.version===j.version);
      if(existing) existing.path = rel; else index.books.push({ id: book_id, name_en: null, name_zh: nameZh||null, testament: j.testament||'OT', language: j.language||'zh', version: j.version||'CUV', path: rel });
    }
    renamed++;
    console.log('Renamed', fname, '->', path.basename(target));
  }catch(err){ console.error('Error parsing',fp,err.message); }
}

fs.writeFileSync(indexPath, JSON.stringify(index,null,2),'utf8');
console.log('Done. Renamed:', renamed, 'Unmapped:', unmapped.length);
if(unmapped.length) console.log('Unmapped files (manual review):', unmapped.join('\n'));
