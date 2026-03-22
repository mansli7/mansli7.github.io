const fs = require('fs');
const path = require('path');

function loadIndex(indexPath){
  return JSON.parse(fs.readFileSync(indexPath,'utf8'));
}

function loadBookJson(outDir, book_id){
  const p = path.join(outDir, `${book_id}.json`);
  if(!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p,'utf8'));
}

function tokenizeSimple(s){
  const m = s.toLowerCase().match(/[a-z0-9']+/g);
  return m || [];
}

function parseQuery(q){
  // very simple: detect quoted phrase, regex (/.../), or AND separated by '&'
  q = q.trim();
  if(q.startsWith('"') && q.endsWith('"')) return {type:'phrase', val: q.slice(1,-1)};
  if(q.startsWith('/') && q.endsWith('/')) return {type:'regex', val: q.slice(1,-1)};
  if(q.includes('&')){
    const parts = q.split('&').map(s=>s.trim());
    return {type:'and', parts};
  }
  // fallback: single word
  return {type:'word', val: q.toLowerCase()};
}

function intersectSets(sets){
  if(sets.length===0) return new Set();
  const res = new Set(sets[0]);
  for(let s of sets.slice(1)){
    for(const v of Array.from(res)) if(!s.has(v)) res.delete(v);
  }
  return res;
}

function runQuery(query, index, outDir){
  const q = parseQuery(query);
  if(q.type==='word'){
    const ids = index[q.val] || [];
    return Array.from(new Set(ids));
  }
  if(q.type==='and'){
    const sets = q.parts.map(p => new Set(index[p.toLowerCase()] || []));
    return Array.from(intersectSets(sets));
  }
  if(q.type==='phrase' || q.type==='regex'){
    // scan all verses (could be optimized)
    const results = [];
    const files = fs.readdirSync(outDir).filter(f=>f.endsWith('.json'));
    const re = q.type==='regex' ? new RegExp(q.val) : null;
    const phrase = q.type==='phrase' ? q.val.toLowerCase() : null;
    for(const f of files){
      const arr = JSON.parse(fs.readFileSync(path.join(outDir,f),'utf8'));
      for(const v of arr){
        if(q.type==='phrase'){
          if(v.text_norm && v.text_norm.includes(phrase)) results.push(v.id);
        } else {
          if(re.test(v.text)) results.push(v.id);
        }
      }
    }
    return results;
  }
}

function showVerses(ids, outDir, limit=20){
  // sort ids by canonical book order then chapter/verse
  const bookOrder = [
    'genesis','exodus','leviticus','numbers','deuteronomy','joshua','judges','ruth',
    '1-samuel','2-samuel','1-kings','2-kings','1-chronicles','2-chronicles','ezra','nehemiah','esther',
    'job','psalm','proverbs','ecclesiastes','song-of-solomon','isaiah','jeremiah','lamentations','ezekiel','daniel',
    'hosea','joel','amos','obadiah','jonah','micah','nahum','habakkuk','zephaniah','haggai','zechariah','malachi',
    'matthew','mark','luke','john','acts','romans','1-corinthians','2-corinthians','galatians','ephesians','philippians','colossians',
    '1-thessalonians','2-thessalonians','1-timothy','2-timothy','titus','philemon','hebrews','james','1-peter','2-peter',
    '1-john','2-john','3-john','jude','revelation'
  ];
  const bookIndex = Object.fromEntries(bookOrder.map((b,i)=>[b,i]));

  const parsed = ids.map(id => {
    const parts = id.split(':');
    const book = parts[1].toLowerCase();
    const ch = parseInt(parts[2],10) || 0;
    const vs = parseInt(parts[3],10) || 0;
    const order = (bookIndex[book] !== undefined) ? bookIndex[book] : 999;
    return {id, book, ch, vs, order};
  });

  parsed.sort((a,b)=>{
    if(a.order !== b.order) return a.order - b.order;
    if(a.ch !== b.ch) return a.ch - b.ch;
    return a.vs - b.vs;
  });

  const out = [];
  for(const p of parsed){
    const arr = loadBookJson(outDir, p.book);
    if(!arr) continue;
    const map = {}; arr.forEach(v=> map[v.id]=v.text);
    if(map[p.id]) out.push(`${p.id}  —  ${map[p.id]}`);
    if(out.length>=limit) break;
  }
  return out;
}

// main
const indexPath = path.resolve(process.argv[2] || 'data/bible/index/en/KJV-tokens.json');
const outDir = path.resolve(process.argv[3] || 'data/bible/en/KJV');
const queries = process.argv.slice(4);
if(!fs.existsSync(indexPath)){ console.error('Index not found:', indexPath); process.exit(1); }
const index = loadIndex(indexPath);

if(queries.length===0){
  console.log('Provide queries as args. Examples: "\"in the beginning\"" "/love/" "God & earth"');
  process.exit(0);
}

for(const q of queries){
  console.log('\n=== Query:', q, '===');
  const ids = runQuery(q, index, outDir);
  console.log('Matches:', ids.length);
  const lines = showVerses(ids, outDir, 20);
  for(const L of lines) console.log(L);
}
