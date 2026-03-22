#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const fp = path.join(__dirname,'../../data/bible/zh/CUV/阿摩司書.json');
if(!fs.existsSync(fp)){ console.error('file not found',fp); process.exit(1); }
const j = JSON.parse(fs.readFileSync(fp,'utf8'));
const book_id = 'amo';
j.book_id = book_id;
if(Array.isArray(j.verses)){
  j.verses = j.verses.map(v=>{
    const ch = parseInt(v.chapter||0,10)||0;
    const vs = parseInt(v.verse||0,10)||0;
    const text = (v.text||'').toString().trim();
    return { id: `${book_id}-${ch}-${vs}`, chapter: ch, verse: vs, text };
  });
}
const target = path.join(__dirname,'../../data/bible/zh/CUV/amo.json');
fs.writeFileSync(target, JSON.stringify(j,null,2),'utf8');
fs.unlinkSync(fp);
console.log('Wrote', target);
