#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const base = path.join(__dirname,'../../data/bible');
function walkDirs(dir){
  return fs.existsSync(dir) ? fs.readdirSync(dir,{ withFileTypes:true }).filter(d=>d.isDirectory()).map(d=>d.name) : [];
}

function tokenize(text){
  if(!text) return [];
  // match Han sequences or alphanumeric sequences
  const re = /[\p{Script=Han}]+|[A-Za-z0-9]+/gu;
  const tokens = [];
  let m;
  while((m = re.exec(text)) !== null){
    let t = m[0];
    if(/^[A-Za-z0-9]+$/.test(t)) t = t.toLowerCase();
    tokens.push(t);
  }
  return tokens;
}

let totalFiles = 0;
const langs = walkDirs(base);
for(const lang of langs){
  const langDir = path.join(base, lang);
  const versions = walkDirs(langDir);
  for(const ver of versions){
    const verDir = path.join(langDir, ver);
    const files = fs.readdirSync(verDir).filter(f=>f.endsWith('.json'));
    for(const f of files){
      const fp = path.join(verDir, f);
      try{
        const j = JSON.parse(fs.readFileSync(fp,'utf8'));
        if(!j || !Array.isArray(j.verses)) continue;
        const book_id = j.book_id || path.basename(f,'.json');
        const tokenMap = Object.create(null);
        for(const v of j.verses){
          const vid = `${book_id}-${v.chapter}-${v.verse}`;
          const text = (v.text||'').toString();
          const toks = tokenize(text);
          const seen = new Set();
          for(const t of toks){
            if(!t) continue;
            if(seen.has(t)) continue; // only record verse once per token
            seen.add(t);
            if(!tokenMap[t]) tokenMap[t]=[];
            tokenMap[t].push(vid);
          }
        }
        // convert sets to arrays (already arrays), write to file
        const out = { book: j.book||null, book_id, language: j.language||lang, version: j.version||ver, tokens: tokenMap };
        const outPath = path.join(verDir, `${book_id}-tokens.json`);
        fs.writeFileSync(outPath, JSON.stringify(out,null,2),'utf8');
        totalFiles++;
        console.log('Wrote tokens for', book_id, '->', outPath, 'tokens=', Object.keys(tokenMap).length);
      }catch(err){ console.error('skip',fp,err.message); }
    }
  }
}
console.log('Done. Generated token files for', totalFiles, 'books.');
