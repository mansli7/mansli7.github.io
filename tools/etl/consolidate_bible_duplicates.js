#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const base = path.join(__dirname,'../../data/bible');
const indexPath = path.join(base,'index.json');
if(!fs.existsSync(indexPath)) { console.error('missing index.json'); process.exit(1); }
const index = JSON.parse(fs.readFileSync(indexPath,'utf8'));

function walkDirs(dir){
  return fs.readdirSync(dir,{ withFileTypes:true }).filter(d=>d.isDirectory()).map(d=>d.name);
}

function allJsonFiles(dir){
  const out = [];
  for(const lang of walkDirs(dir)){
    const langDir = path.join(dir, lang);
    for(const ver of walkDirs(langDir)){
      const verDir = path.join(langDir, ver);
      const files = fs.readdirSync(verDir).filter(f=>f.endsWith('.json'));
      for(const f of files) out.push(path.join(verDir,f));
    }
  }
  return out;
}

const files = allJsonFiles(base);
const groups = Object.create(null);

for(const fp of files){
  try{
    const j = JSON.parse(fs.readFileSync(fp,'utf8'));
    const book_id = (j.book_id||'').toString().trim() || path.basename(fp,'.json').toLowerCase();
    if(!groups[book_id]) groups[book_id]=[];
    groups[book_id].push({ path: fp, json: j, size: String(fs.statSync(fp).size) });
  }catch(err){ console.error('skip',fp,err.message); }
}

let moved = 0, removed = 0, updatedIndex = 0;
for(const bid of Object.keys(groups)){
  const items = groups[bid];
  if(items.length <= 1) continue;
  // choose canonical target (if exists) else pick largest file
  let canonicalItem = items.find(it=> path.basename(it.path) === `${bid}.json`);
  if(!canonicalItem){
    // pick item with most verses if present
    canonicalItem = items.reduce((a,b)=> ( (a.json.verses||[]).length >= (b.json.verses||[]).length ? a : b));
  }
  const targetDir = path.dirname(canonicalItem.path);
  const targetPath = path.join(targetDir, `${bid}.json`);

  // write canonical content to targetPath
  fs.writeFileSync(targetPath, JSON.stringify(canonicalItem.json, null, 2), 'utf8');
  moved++;

  // remove other files that are not the target
  for(const it of items){
    if(it.path === targetPath) continue;
    try{ fs.unlinkSync(it.path); removed++; } catch(e){ /* ignore */ }
  }

  // update index entries that point to any old path for this bid
  for(const e of index.books){
    if(e.id === bid){
      const rel = `/data/bible/${path.relative(base, targetDir).replace(/\\\\/g,'/')}/${bid}.json`;
      if(e.path !== rel){ e.path = rel; updatedIndex++; }
    }
  }
}

fs.writeFileSync(indexPath, JSON.stringify(index, null, 2), 'utf8');
console.log('Consolidation complete. moved=', moved, 'removed=', removed, 'index-updated=', updatedIndex);
