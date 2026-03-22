#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function usage(){
  console.log('Usage: node build_bible.js --in <input.txt> --out <outdir> --index <index.json> --version <VER> --language <lang>');
  process.exit(1);
}

function parseArgs(){
  const out = {};
  const args = process.argv.slice(2);
  for(let i=0;i<args.length;i++){
    const a = args[i];
    if(a.startsWith('--')){
      const key = a.slice(2);
      const val = args[i+1] && !args[i+1].startsWith('--') ? args[i+1] : true;
      out[key]=val;
      if(val !== true) i++;
    }
  }
  return out;
}

const argv = parseArgs();
if(!argv.in || !argv.out || !argv.index || !argv.version || !argv.language) usage();

const inputPath = path.resolve(argv.in);
const outDir = path.resolve(argv.out);
const indexPath = path.resolve(argv.index);
const version = argv.version;
const language = argv.language;

if(!fs.existsSync(inputPath)){
  console.error('Input file not found:', inputPath);
  process.exit(2);
}

const text = fs.readFileSync(inputPath,'utf8');
const lines = text.split(/\r?\n/);

const verseRegex = /^(.+?)\s(\d+):(\d+)\t(.*)$/;

const books = {}; // book_id -> array of verses
const tokenIndex = {}; // token -> array of ids

function bookIdFromName(name){
  return name.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9\-]/g,'');
}

function normalizeText(s){
  return s.normalize('NFKC');
}

function tokenize(s){
  const low = s.toLowerCase();
  const matches = low.match(/[a-z0-9']+/g);
  return matches || [];
}

for(const line of lines){
  if(!line || line.trim().length===0) continue;
  // skip header lines that are not verse-like
  const m = verseRegex.exec(line);
  if(!m) continue;
  const bookName = m[1].trim();
  const chapter = parseInt(m[2],10);
  const verse = parseInt(m[3],10);
  const verseText = m[4].trim();

  const book_id = bookIdFromName(bookName);
  const parallel_id = `${book_id.toUpperCase()}:${chapter}:${verse}`;
  const id = `${version}:${book_id.toUpperCase()}:${chapter}:${verse}`;

  const textNorm = normalizeText(verseText).toLowerCase();
  const tokens = tokenize(verseText);

  const vObj = {
    id,
    language,
    version,
    source: path.basename(inputPath),
    license: null,
    book: bookName,
    book_id,
    chapter,
    verse,
    text: verseText,
    text_norm: textNorm,
    tokens,
    strongs: [],
    parallel_id,
    meta: {}
  };

  if(!books[book_id]) books[book_id]=[];
  books[book_id].push(vObj);

  for(const t of tokens){
    if(!tokenIndex[t]) tokenIndex[t]=[];
    tokenIndex[t].push(id);
  }
}

// ensure out dirs
fs.mkdirSync(outDir,{recursive:true});
const indexDir = path.dirname(indexPath);
fs.mkdirSync(indexDir,{recursive:true});

// write per-book files
for(const [book_id, arr] of Object.entries(books)){
  const outFile = path.join(outDir, `${book_id}.json`);
  fs.writeFileSync(outFile, JSON.stringify(arr, null, 2), 'utf8');
  console.log('Wrote', outFile, 'verses=', arr.length);
}

// sort token index arrays and write
for(const k of Object.keys(tokenIndex)){
  // remove duplicates
  tokenIndex[k] = Array.from(new Set(tokenIndex[k]));
  tokenIndex[k].sort();
}
fs.writeFileSync(indexPath, JSON.stringify(tokenIndex), 'utf8');
console.log('Wrote index:', indexPath, 'tokens=', Object.keys(tokenIndex).length);

console.log('ETL complete.');
