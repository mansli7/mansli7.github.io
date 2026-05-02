const fs = require('fs');
const path = require('path');
const file = path.join(__dirname,'..','assets','js','reading-plan-2026.js');
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

// CLI flags and positional compatibility
const rawArgv = process.argv.slice(2);
const opts = {
  lang: null,
  code: null,
  date: null,
  write: false,
  outDir: null,
  silent: false,
  importFile: null,
  importBook: null,
  writeMd: false
};
// simple flag parser: --key value or --flag
for(let i=0;i<rawArgv.length;i++){
  const a = rawArgv[i];
  if(a === '--lang' || a === '-l'){ opts.lang = rawArgv[++i]; }
  else if(a === '--code' || a === '-c'){ opts.code = rawArgv[++i]; }
  else if(a === '--date' || a === '-d'){ opts.date = rawArgv[++i]; }
  else if(a === '--write' || a === '-w'){ opts.write = true; }
  else if(a === '--out-dir' || a === '-o'){ opts.outDir = rawArgv[++i]; }
  else if(a === '--silent' || a === '-s'){ opts.silent = true; }
  else if(a === '--import-file' || a === '--input' || a === '-i'){ opts.importFile = rawArgv[++i]; }
  else if(a === '--book' || a === '-b'){ opts.importBook = rawArgv[++i]; }
  else if(a === '--write-md'){ opts.writeMd = true; }
  else if(!opts.lang && (a==='en' || a==='zh')){ opts.lang = a; }
  else if(!opts.code && !a.startsWith('-')){ // positional fallback: book or code
    // if looks like a code (starts with letters+digits) keep as code, else book
    opts.code = a;
    // possible chapters next
    if(rawArgv[i+1] && !rawArgv[i+1].startsWith('-')){ opts.code = opts.code + rawArgv[++i]; }
  }
}

// convenience names
const cliLang = opts.lang;
const cliBook = opts.code;
const cliChapters = null;

function normalizeName(s){ return String(s||'').toLowerCase().replace(/[^0-9a-z]+/g,'').trim(); }
function findAbbrFromArg(arg){
  if(!arg) return null;
  const a = String(arg).toLowerCase();
  // exact abbr
  if(n[a]) return a;
  // match by slug or english/chinese name
  const slugArg = String(arg).toLowerCase().replace(/[^0-9a-z\s-]/g,'').replace(/\s+/g,'-');
  for(const k of Object.keys(n)){
    const en = (n[k] && n[k][0])? normalizeName(n[k][0]) : '';
    const zh = (n[k] && n[k][1])? normalizeName(n[k][1]) : '';
    const slug = (n[k] && n[k][0])? n[k][0].toLowerCase().replace(/[^0-9a-z\s-]/g,'').replace(/\s+/g,'-') : '';
    if(en === normalizeName(arg) || zh === normalizeName(arg) || slug === slugArg) return k;
  }
  return null;
}
function sqSlug(abbr){
  if(!abbr) return null;
  const book = (n && n[abbr] && n[abbr][0]) ? n[abbr][0] : abbr;
  return book.toLowerCase().replace(/[^0-9a-z\s-]/g,'').replace(/\s+/g,'-');
}
function escapeRegExp(s){ return String(s).replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); }
function hasCjk(s){ return /[\u3400-\u9fff]/.test(s); }
function normalizeRange(raw){ return String(raw||'').replace(/[—–]/g,'-').replace(/\s+/g,' ').trim(); }
function extractRangeFromHeading(heading){
  const m = String(heading||'').match(/(\d+\s*[-–—]\s*\d+|\d+)/);
  return m ? normalizeRange(m[1]).replace(/\s*/g,'') : null;
}
function titleCaseSlug(slug){
  return String(slug||'').split('-').map(function(p){ return /^\d+$/.test(p) ? p : p.charAt(0).toUpperCase()+p.slice(1); }).join(' ');
}
function namesForBookSlug(slug){
  const abbr = findAbbrFromArg(slug);
  if(abbr && n[abbr]) return { en: n[abbr][0], zh: n[abbr][1], abbr };
  return { en: titleCaseSlug(slug), zh: titleCaseSlug(slug), abbr: null };
}
function parseStudyTxt(text, names){
  const lines = String(text||'').replace(/\r\n?/g,'\n').split('\n').map(function(s){ return s.trim(); });
  const headingRegex = new RegExp('^(?:' + escapeRegExp(names.en) + '|' + escapeRegExp(names.zh) + '|Psalms?)\\s+\\d+(?:\\s*[-–—]\\s*\\d+)?$', 'i');
  const order = [];
  const byRange = {};
  let currentHeading = null;
  let currentBody = [];

  function flushCurrent(){
    if(!currentHeading || !currentBody.length) return;
    const range = extractRangeFromHeading(currentHeading);
    if(!range) return;
    const body = currentBody.filter(function(l){ return !/^paste\s+:::/i.test(l) && !/^:::\s*$/.test(l); });
    if(!body.length) return;
    const lang = body.some(hasCjk) ? 'zh' : 'en';
    if(!byRange[range]){ byRange[range] = { en: [], zh: [] }; order.push(range); }
    byRange[range][lang] = body;
  }

  for(const line of lines){
    if(!line) continue;
    if(/^-{10,}$/.test(line)) continue;
    if(headingRegex.test(line)){
      flushCurrent();
      currentHeading = line;
      currentBody = [];
      continue;
    }
    if(!currentHeading) continue;
    if(/^paste\s+:::/i.test(line) || /^:::\s*$/.test(line)) continue;
    currentBody.push(line);
  }
  flushCurrent();
  return { order, byRange };
}
function buildMdFromParsed(slug, lang, names, order, byRange){
  const isZh = lang === 'zh';
  const title = isZh ? (names.zh + '學習問題') : (names.en + ' Study Questions');
  const h1 = title;
  const back = isZh ? '← 返回學習問題' : '← Back to Study Questions';
  const other = isZh ? 'English Version' : '中文版本';
  const otherHref = isZh ? ('../en/' + slug) : ('../zh/' + slug);
  const bookName = isZh ? names.zh : names.en;
  const out = [];
  out.push('---');
  out.push('layout: default');
  out.push('title: ' + title);
  out.push('---');
  out.push('');
  out.push('# ' + h1);
  out.push('');
  out.push('<div style="margin-bottom: 2rem;">');
  out.push('  <a href="../" class="cta" style="background: linear-gradient(180deg, #8b7355, #6d5a42);">' + back + '</a>');
  out.push('  <a href="' + otherHref + '" class="cta" style="margin-left: 1rem;">' + other + '</a>');
  out.push('</div>');
  out.push('');
  for(const range of order){
    const qs = byRange[range] && byRange[range][lang] ? byRange[range][lang] : [];
    if(!qs.length) continue;
    out.push('---');
    out.push('');
    out.push(bookName + ' ' + range);
    out.push('');
    for(const q of qs){ out.push(q); out.push(''); }
  }
  out.push('---');
  out.push('');
  out.push('<p style="text-align: center; margin-top: 3rem;"></p>');
  out.push('');
  return out.join('\n');
}
function runImportMode(){
  if(!opts.importFile) return false;
  if(!opts.importBook){ if(!opts.silent) console.error('Missing --book for --import-file mode'); process.exit(2); }
  const root = path.join(__dirname,'..');
  const inputPath = path.isAbsolute(opts.importFile) ? opts.importFile : path.join(root, opts.importFile);
  if(!fs.existsSync(inputPath)){ if(!opts.silent) console.error('Input not found:', inputPath); process.exit(2); }
  const names = namesForBookSlug(opts.importBook);
  const parsed = parseStudyTxt(fs.readFileSync(inputPath,'utf8'), names);
  if(!parsed.order.length){ if(!opts.silent) console.error('No valid ranges parsed from input.'); process.exit(2); }
  const enRanges = parsed.order.filter(function(rg){ return parsed.byRange[rg] && parsed.byRange[rg].en && parsed.byRange[rg].en.length; });
  const zhRanges = parsed.order.filter(function(rg){ return parsed.byRange[rg] && parsed.byRange[rg].zh && parsed.byRange[rg].zh.length; });
  if(!opts.silent) console.log('Parsed ' + parsed.order.length + ' ranges. EN: ' + enRanges.length + ', ZH: ' + zhRanges.length);

  const outEn = path.join(root,'bs','sq','en', opts.importBook + '.md');
  const outZh = path.join(root,'bs','sq','zh', opts.importBook + '.md');
  const mdEn = buildMdFromParsed(opts.importBook, 'en', names, parsed.order, parsed.byRange);
  const mdZh = buildMdFromParsed(opts.importBook, 'zh', names, parsed.order, parsed.byRange);

  if(opts.writeMd || opts.write){
    fs.mkdirSync(path.dirname(outEn), { recursive:true });
    fs.mkdirSync(path.dirname(outZh), { recursive:true });
    fs.writeFileSync(outEn, mdEn, 'utf8');
    fs.writeFileSync(outZh, mdZh, 'utf8');
    if(!opts.silent){ console.log('Wrote:', outEn); console.log('Wrote:', outZh); }
  } else {
    if(!opts.silent){
      console.log('Preview only (use --write-md to save markdown files).');
      console.log('EN output path:', outEn);
      console.log('ZH output path:', outZh);
    }
    return true;
  }

  if(opts.write){
    const cmdEn = 'node "' + path.join(root,'tools','generate_hq.js') + '" en ' + opts.importBook + ' > "' + path.join(root,'data','bs-sq','en', opts.importBook + '.json') + '"';
    const cmdZh = 'node "' + path.join(root,'tools','generate_hq.js') + '" zh ' + opts.importBook + ' > "' + path.join(root,'data','bs-sq','zh', opts.importBook + '.json') + '"';
    require('child_process').execSync(cmdEn, { stdio:'inherit', shell:'/bin/zsh' });
    require('child_process').execSync(cmdZh, { stdio:'inherit', shell:'/bin/zsh' });
    if(!opts.silent) console.log('Regenerated JSON for', opts.importBook);
  }
  return true;
}

if(runImportMode()) process.exit(0);

function extractPrompts(lang, abbr, chapters){
  try{
    const slug = sqSlug(abbr);
    const p = path.join(__dirname,'..','bs','sq',lang,slug+'.md');
    if(!fs.existsSync(p)) return null;
    let text = fs.readFileSync(p,'utf8');
      const book = (n && n[abbr]) ? ((lang === 'zh' && n[abbr][1]) ? n[abbr][1] : n[abbr][0]) : abbr;
    const ch = (chapters||'').replace(/[—–]/g,'-').trim();
    const extractRange = s => (s||'').replace(/[^\n0-9\-–—]/g,'').replace(/[—–]/g,'-');

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
      // allow minor Chinese character variants (e.g., 紀 vs 記)
      const headingLower = heading.toLowerCase();
      const bookLower = (book||'').toLowerCase();
      const bookAlt1 = bookLower.replace(/\u7d00/g,'\u8a18'); // 紀 -> 記
      const bookAlt2 = bookLower.replace(/\u8a18/g,'\u7d00'); // 記 -> 紀
      const bookNoSuffix = bookLower.replace(/[\u8a18\u7d00]$/,''); // drop trailing 記/紀
      const bookNoSuffixAlt = bookNoSuffix.replace(/\u7d00/g,'\u8a18');
      if (
        headingLower.indexOf(bookLower) === 0 ||
        headingLower.indexOf(bookAlt1) === 0 ||
        headingLower.indexOf(bookAlt2) === 0 ||
        headingLower.indexOf(bookNoSuffix) === 0 ||
        headingLower.indexOf(bookNoSuffixAlt) === 0
      ) {
        // check chapters if provided
        if (ch) {
            // normalize heading ranges (handle Chinese '章' and en/emdash variants)
            const hnorm = extractRange(heading).replace(/\s+/g,'').replace(/\u2013/g,'-').replace(/\u2014/g,'-');
            const cnorm = (ch||'').replace(/\s+/g,'');
            if (cnorm && hnorm.indexOf(cnorm.replace(/\-/g,'-')) === -1) {
            // not the exact chapter heading we're looking for
            continue;
          }
        }
        // the rest of lines after heading are prompts blocks separated by blank lines
        let bodyLines = lines.slice(1);
        // If this part only contains the heading (common), take the next part as the body
        if (bodyLines.length === 0 && parts[pi+1]) {
          bodyLines = parts[pi+1].trim().split(/\n+/).map(s=>s.trim()).filter(Boolean);
          // If the next part repeats the exact heading, drop only that duplicate heading line.
          // Do not drop normal questions that happen to start with the book name (e.g. "Job said...").
          if (bodyLines.length) {
            const firstNorm = bodyLines[0].toLowerCase().replace(/\s+/g, ' ').trim();
            const headingNorm = heading.toLowerCase().replace(/\s+/g, ' ').trim();
            if (firstNorm === headingNorm) bodyLines.shift();
          }
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
// debug test removed for clean output

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

function gatherForToken(token){
  const keys = Object.keys(n).sort((a,b)=>b.length-a.length);
  let abbr=null; for(let k of keys){ if(token.indexOf(k)===0){ abbr=k; break; } }
  if(!abbr) return null;
  if(!sq[abbr]) return null;
  const chapters = token.slice(abbr.length);
  const en = extractPrompts('en',abbr, chapters);
  const zh = extractPrompts('zh',abbr, chapters);
  return { en, zh };
}

for(const [m,d] of dates){
  const key = m+'/'+d;
  const code = r[key];
  if(!code) continue;
  if(code==='Review') continue;
  const tokens = String(code).split(/\s*,\s*|\s*;\s*|\s+/).filter(Boolean);
  for(const token of tokens){
    const data = gatherForToken(token);
    out[token] = data;
  }
}

function gatherForCodeList(codeList){
  const res = {};
  const tokens = String(codeList).split(/\s*,\s*|\s*;\s*|\s+/).filter(Boolean);
  for(const t of tokens){ const d=gatherForToken(t); if(d) res[t]=d; else res[t]=null; }
  return res;
}

// Build all entries for a specific book abbreviation based on the full calendar map.
function gatherForAbbrFromCalendar(abbr){
  const res = {};
  if(!abbr) return res;
  for(const k of Object.keys(r)){
    const code = r[k];
    if(!code || code === 'Review') continue;
    const tokens = String(code).split(/\s*,\s*|\s*;\s*|\s+/).filter(Boolean);
    for(const t of tokens){
      if(t.indexOf(abbr) !== 0) continue;
      const d = gatherForToken(t);
      if(d) res[t] = d;
    }
  }
  return res;
}

// If CLI requested a specific book, filter by its abbr
// helper: get calendar codes for a date string YYYY-MM-DD
function codesForDate(dateStr){
  const d = new Date(dateStr);
  if(isNaN(d)) return null;
  const key = (d.getMonth()+1)+'/'+d.getDate();
  const code = r[key];
  return code || null;
}

if(cliBook || opts.date){
  const wanted = findAbbrFromArg(cliBook);
  if(!wanted){
    if(!opts.date){
      if(!opts.silent) console.error('Could not resolve book from arg:', cliBook);
      process.exit(2);
    }
  }
  // If user asked by date, use calendar
  if(opts.date){
    const code = codesForDate(opts.date);
    if(!code){ if(!opts.silent) console.error('No reading found for date',opts.date); process.exit(2); }
    const readings = gatherForCodeList(code);
    // optionally write per-day files
    if(opts.write){
      const outDir = opts.outDir || path.join(__dirname,'..','tmp');
      fs.mkdirSync(outDir,{recursive:true});
      const iso = opts.date;
      const enPath = path.join(outDir, iso + '.en.json');
      const zhPath = path.join(outDir, iso + '.zh.json');
      const enObj = {}; const zhObj = {};
      for(const k of Object.keys(readings)){
        enObj[k] = readings[k] ? readings[k].en : null;
        zhObj[k] = readings[k] ? readings[k].zh : null;
      }
      fs.writeFileSync(enPath, JSON.stringify({date:iso, codes:Object.keys(enObj), readings:enObj},null,2));
      fs.writeFileSync(zhPath, JSON.stringify({date:iso, codes:Object.keys(zhObj), readings:zhObj},null,2));
      if(!opts.silent) console.log('Wrote',enPath,zhPath);
      process.exit(0);
    } else {
      // print readings; filter by lang if provided
      if(cliLang){
        const outp = {};
        for(const k of Object.keys(readings)){ outp[k] = { [cliLang]: readings[k] ? readings[k][cliLang] : null }; }
        console.log(JSON.stringify(outp,null,2));
      } else {
        console.log(JSON.stringify(readings,null,2));
      }
      process.exit(0);
    }
  }
  // else cliBook path (existing behavior but code token may be full code)
  const filtered = gatherForAbbrFromCalendar(wanted);
  function normalizeChaptersArg(s){
    if(!s) return '';
    return String(s).replace(/[—–]/g,'-').replace(/[^0-9\-]/g,'').replace(/\-+/g,'-').replace(/^-+|-+$/g,'');
  }
  const wantCh = normalizeChaptersArg(cliChapters);
  if(wantCh){
    for(const k of Object.keys(filtered)){
      const rem = k.slice(wanted.length);
      const remNorm = normalizeChaptersArg(rem);
      if(remNorm !== wantCh) delete filtered[k];
    }
  }
  // If a language was requested, reduce each entry to only that language
  if(cliLang){
    for(const kk of Object.keys(filtered)){
      filtered[kk] = { [cliLang]: (filtered[kk] && filtered[kk][cliLang]) ? filtered[kk][cliLang] : null };
    }
  }
  console.log(JSON.stringify(filtered, null, 2));
} else if(cliLang){
  // If only lang specified, output only entries where that lang prompts exist
  const filtered = {};
  for(const k of Object.keys(out)){
    if(out[k] && out[k][cliLang]) filtered[k] = { [cliLang]: out[k][cliLang] };
  }
  console.log(JSON.stringify(filtered, null, 2));
} else {
  console.log(JSON.stringify(out, null, 2));
}
