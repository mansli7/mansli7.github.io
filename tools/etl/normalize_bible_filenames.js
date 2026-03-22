#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const base = path.join(__dirname,'../../data/bible');
const indexPath = path.join(base,'index.json');
let index = { books: [] };
if(fs.existsSync(indexPath)) index = JSON.parse(fs.readFileSync(indexPath,'utf8'));

function walkDirs(dir){
  return fs.readdirSync(dir,{ withFileTypes:true }).filter(d=>d.isDirectory()).map(d=>d.name);
}

const langs = walkDirs(base);
const updated = [];

for(const lang of langs){
  const langDir = path.join(base, lang);
  const versions = walkDirs(langDir);
  for(const ver of versions){
    const verDir = path.join(langDir, ver);
    const files = fs.readdirSync(verDir).filter(f=>f.endsWith('.json'));
    for(const f of files){
      const fp = path.join(verDir,f);
      try{
        const j = JSON.parse(fs.readFileSync(fp,'utf8'));
        const book_id = (j.book_id || j.book || path.basename(f,'.json')).toString().toLowerCase();
        const canonical = `${book_id}.json`;
        const target = path.join(verDir, canonical);
        if(fp !== target){
          // if target exists and is same content, remove source; else move/overwrite
          if(fs.existsSync(target)){
            const existing = fs.readFileSync(target,'utf8');
            if(existing === JSON.stringify(j, null, 2)){
              fs.unlinkSync(fp);
            } else {
              // overwrite target with canonical content from j
              fs.writeFileSync(target, JSON.stringify(j, null, 2), 'utf8');
              fs.unlinkSync(fp);
            }
          } else {
            fs.renameSync(fp, target);
          }
          updated.push({ from: fp, to: target });
        }

        // update index entry
        const relPath = `/data/bible/${lang}/${ver}/${canonical}`;
        const entry = index.books.find(b=>b.id === book_id && b.language === lang && b.version === ver);
        const name_en = lang === 'en' ? j.book : null;
        const name_zh = lang === 'zh' ? j.book : null;
        const testament = j.testament || 'OT';
        if(entry){
          entry.path = relPath;
          if(name_en) entry.name_en = name_en;
          if(name_zh) entry.name_zh = name_zh;
        } else {
          index.books.push({ id: book_id, name_en: name_en || null, name_zh: name_zh || null, testament, language: lang, version: ver, path: relPath });
        }
      }catch(err){
        console.error('skip',fp,err.message);
      }
    }
  }
}

fs.writeFileSync(indexPath, JSON.stringify(index, null, 2), 'utf8');
console.log('Normalized filenames. Updated index at', indexPath);
if(updated.length) console.log('Renamed files:', updated.length);
