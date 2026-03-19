const fs=require('fs');
const path=require('path');
const child = require('child_process');

function extractVarFromFile(file, name){
  const txt = fs.readFileSync(file,'utf8');
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
function evalObj(text){ return Function('return ('+text+');')(); }

const rText = extractVarFromFile(path.join(__dirname,'..','assets','js','reading-plan-2026.js'),'r');
if(!rText){ console.error('Could not extract r from reading-plan-2026.js'); process.exit(2); }
const r = evalObj(rText);

// run the extractor and robustly parse its first JSON object
let outRaw;
try{
  outRaw = child.execSync('node "'+path.join(__dirname,'generate_hq.js')+'" 2>&1',{encoding:'utf8', maxBuffer: 10*1024*1024});
}catch(e){ outRaw = e.stdout || ''; }
const start = outRaw.indexOf('{');
if(start < 0){ console.error('No JSON object found in extractor output'); process.exit(3); }
let parsed = null;
for(let i=outRaw.length;i>start;i--){
  try{ parsed = JSON.parse(outRaw.slice(start,i)); break; }catch(e){}
}
if(!parsed){ console.error('Failed to parse JSON from extractor output'); process.exit(4); }
const out = parsed;

// prepare output dir
const outDir = '/tmp/test';
fs.mkdirSync(outDir, { recursive: true });

const startDate = new Date(2026,0,1);
const endDate = new Date(2026,3,9);
let fileCount = 0;
for(let d=new Date(startDate); d<=endDate; d.setDate(d.getDate()+1)){
  const key = (d.getMonth()+1)+'/'+d.getDate();
  const code = r[key];
  const pad = n => String(n).padStart(2,'0');
  const iso = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  const enObj = {};
  const zhObj = {};
  if(code && code!=='Review'){
    const tokens = String(code).split(/\s*,\s*|\s*;\s*|\s+/).filter(Boolean);
    for(const token of tokens){
      if(out[token]){
        enObj[token] = out[token].en || null;
        zhObj[token] = out[token].zh || null;
      } else {
        enObj[token] = null;
        zhObj[token] = null;
      }
    }
  }
  const enPath = path.join(outDir, iso + '.en.json');
  const zhPath = path.join(outDir, iso + '.zh.json');
  fs.writeFileSync(enPath, JSON.stringify({date:iso, codes: Object.keys(enObj), readings: enObj}, null,2));
  fs.writeFileSync(zhPath, JSON.stringify({date:iso, codes: Object.keys(zhObj), readings: zhObj}, null,2));
  fileCount += 2;
}
console.log('Wrote', fileCount, 'files to', outDir);
