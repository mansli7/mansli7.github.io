#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Mapping for canonical book id (simple subset, extend as needed)
const bookIdMap = {
  'Genesis': 'gen',
  'Exodus': 'ex',
  'Leviticus': 'lev',
  'Numbers': 'num',
  'Deuteronomy': 'dut',
  'Joshua': 'jos',
  'Judges': 'jdg',
  'Ruth': 'rth',
  '1 Samuel': '1sm',
  '2 Samuel': '2sm',
  '1 Kings': '1ki',
  '2 Kings': '2ki',
  '1 Chronicles': '1ch',
  '2 Chronicles': '2ch',
  'Ezra': 'ezr',
  'Nehemiah': 'neh',
  'Esther': 'est',
  'Job': 'job',
  'Psalms': 'psa',
  'Proverbs': 'pro',
  'Ecclesiastes': 'ecc',
  'Song of Solomon': 'sos',
  'Isaiah': 'isa',
  'Jeremiah': 'jer',
  'Lamentations': 'lam',
  'Ezekiel': 'eze',
  'Daniel': 'dan',
  'Hosea': 'hos',
  'Joel': 'joe',
  'Amos': 'amo',
  'Obadiah': 'oba',
  'Jonah': 'jon',
  'Micah': 'mic',
  'Nahum': 'nah',
  'Habakkuk': 'hab',
  'Zephaniah': 'zep',
  'Haggai': 'hag',
  'Zechariah': 'zec',
  'Malachi': 'mal',
  'Matthew': 'mat',
  'Mark': 'mrk',
  'Luke': 'luk',
  'John': 'jhn',
  'Acts': 'act',
  'Romans': 'rom',
  '1 Corinthians': '1co',
  '2 Corinthians': '2co',
  'Galatians': 'gal',
  'Ephesians': 'eph',
  'Philippians': 'php',
  'Colossians': 'col',
  '1 Thessalonians': '1th',
  '2 Thessalonians': '2th',
  '1 Timothy': '1ti',
  '2 Timothy': '2ti',
  'Titus': 'tit',
  'Philemon': 'phm',
  'Hebrews': 'heb',
  'James': 'jam',
  '1 Peter': '1pe',
  '2 Peter': '2pe',
  '1 John': '1jo',
  '2 John': '2jo',
  '3 John': '3jo',
  'Jude': 'jud',
  'Revelation': 'rev'
};

function shortBookId(name){
  if(bookIdMap[name]) return bookIdMap[name];
  // fallback: take first 3 letters
  return name.slice(0,3).toLowerCase();
}

function normalizeText(s){
  if(!s) return '';
  // simple normalization: trim, collapse spaces
  return s.replace(/\s+/g,' ').trim();
}

// Read existing per-verse KJV file (array) and produce book-level JSON
const inPath = path.join(__dirname,'../../data/bible/en/KJV/genesis.json');
const outDir = path.join(__dirname,'../../data/bible/en/KJV');
if(!fs.existsSync(inPath)){
  console.error('Input KJV genesis not found at', inPath);
  process.exit(1);
}
const raw = JSON.parse(fs.readFileSync(inPath,'utf8'));

// build verses grouped by chapter
const verses = raw.map(v=>({ chapter: v.chapter, verse: v.verse, text: normalizeText(v.text) }));

const bookName = raw[0] && raw[0].book ? raw[0].book : 'Genesis';
const book_id = shortBookId(bookName);
const out = {
  book: bookName,
  book_id: book_id,
  testament: 'OT',
  language: 'en',
  version: 'KJV',
  verses: verses.map(v=>({
    id: `${book_id}-${v.chapter}-${v.verse}`,
    chapter: v.chapter,
    verse: v.verse,
    text: v.text
  }))
};

if(!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir,'gen.json');
fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8');
console.log('Wrote', outPath);

// update global index (create or merge)
const indexPath = path.join(__dirname,'../../data/bible/index.json');
let index = { books: [] };
if(fs.existsSync(indexPath)) index = JSON.parse(fs.readFileSync(indexPath,'utf8'));
// remove existing gen entry
index.books = index.books.filter(b=>b.id!=='gen');
index.books.push({ id: 'gen', name_en: bookName, name_zh: null, testament: 'OT', language: 'en', version: 'KJV', path: '/data/bible/en/KJV/gen.json' });
fs.writeFileSync(indexPath, JSON.stringify(index, null, 2), 'utf8');
console.log('Updated index at', indexPath);
