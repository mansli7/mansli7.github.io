const fs = require('fs');
const path = require('path');
const file = path.join(__dirname,'mansli7.github.io','assets','js','reading-plan-2026.js');
const txt = fs.readFileSync(file,'utf8');
function extractVar(name){
  const marker = 'var ' + name + ' =';
  const idx = txt.indexOf(marker);
  if (idx === -1) return null;
  let i = txt.indexOf('{', idx);
  if (i === -1) return null;
  let depth = 0; let start = i;
  for (; i < txt.length; i++){
    const ch = txt[i];
    if (ch === '{') depth++;
    else if (ch === '}') depth--;
    if (depth === 0) { return txt.slice(start, i+1); }
  }
  return null;
}
function evalObj(text){
  return Function('return ('+text+');')();
}
const r = evalObj(extractVar('r'));
const n = evalObj(extractVar('n'));
const sq = evalObj(extractVar('sq'));
function sqSlug(abbr){
  if(!abbr) return null;
  const book = (n && n[abbr] && n[abbr][0]) ? n[abbr][0] : abbr;
  return book.toLowerCase().replace(/[^0-9a-z\s-]/g,'').replace(/\s+/g,'-');
}
function escapeRegExp(s){ return String(s).replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); }
function extractPrompts(lang, abbr, chapters){
  try{
    const slug = sqSlug(abbr);
    const p = path.join(__dirname,'mansli7.github.io','bs','sq',lang,slug+'.md');
    if(!fs.existsSync(p)) return null;
    let text = fs.readFileSync(p,'utf8');
    const book = (n && n[abbr] && n[abbr][0]) ? n[abbr][0] : abbr;
    const ch = (chapters||'').replace(/[—–]/g,'-').trim();

    // Split the file into chunks separated by a line with only '---'
    const parts = text.split(/\n\s*---\s*\n/);
    for (let pi = 0; pi < parts.length; pi++) {
      const part = parts[pi];
      const trimmed = part.trim();
      if (!trimmed) continue;
      const lines = trimmed.split(/\n+/).map(s=>s.trim()).filter(Boolean);
      if (!lines.length) continue;
      const heading = lines[0];
      // heading might be like "Genesis 1-4" or "Genesis 13–16"
      if (heading.toLowerCase().indexOf(book.toLowerCase()) === 0) {
        // check chapters if provided
        if (ch) {
          const hnorm = heading.replace(/\s+/g,' ').replace(/\u2013/g,'-').replace(/\u2014/g,'-').toLowerCase();
          if (hnorm.indexOf(ch.replace(/\-/g,'-')) === -1) {
            // not the exact chapter heading we're looking for
            continue;
          }
        }
        // the rest of lines after heading are prompts blocks separated by blank lines
        let bodyLines = lines.slice(1);
        // If this part only contains the heading (common), take the next part as the body
        if (bodyLines.length === 0 && parts[pi+1]) {
          bodyLines = parts[pi+1].trim().split(/\n+/).map(s=>s.trim()).filter(Boolean);
          // if the next part starts with the same heading again, drop its first line
          if (bodyLines.length && bodyLines[0].toLowerCase().indexOf(book.toLowerCase()) === 0) bodyLines.shift();
        }
        const body = bodyLines.join('\n');
        const blocks = body.split(/\n{2,}/).map(b=>b.trim()).filter(Boolean);
        const prompts = blocks.map(b=>b.replace(/\n+/g,' ').trim());
        return prompts.length?prompts:null;
      }
    }
    return null;
  } catch(e){ return null; }
}
// debug test
try{
  const dbg = extractPrompts('en','1Sa','25-28');
  console.error('DEBUG 1Sa25-28 en ->', Array.isArray(dbg)?dbg.length:dbg);
}catch(e){ console.error('DBGERR',e); }

// build dates Jan 1 to Apr 9
function datesRange(){
  const res = [];
  const start = new Date(2026,0,1);
  const end = new Date(2026,3,9);
  for(let d=new Date(start); d<=end; d.setDate(d.getDate()+1)){
    res.push([d.getMonth()+1,d.getDate()]);
  }
  return res;
}
const dates = datesRange();
const out = {};
for(const [m,d] of dates){
  const key = m+'/'+d;
  const code = r[key];
  if(!code) continue;
  if(code==='Review') continue;
  // find abbr like in parse: match longest n keys
  const keys = Object.keys(n).sort((a,b)=>b.length-a.length);
  let abbr=null; for(let k of keys){ if(code.indexOf(k)===0){ abbr=k; break; } }
  if(!abbr) continue;
  // only if sq available
  if(!sq[abbr]) continue;
  const en = extractPrompts('en',abbr, code.slice(abbr.length));
  const zh = extractPrompts('zh',abbr, code.slice(abbr.length));
  out[code] = { en: en, zh: zh };
}
console.log(JSON.stringify(out, null, 2));
