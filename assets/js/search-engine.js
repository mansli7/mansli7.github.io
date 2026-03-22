// Client-side search engine
// API: SearchEngine.loadIndex(version, url, cb)
//      SearchEngine.search(query, version, cb)

window.SearchEngine = (function(){
  const indexes = {}; // version -> merged tokenIndex (token -> [ids])
  const booksCache = {}; // version:book_id -> Promise that resolves to array of verses
  const bookOrder = [
    'genesis','exodus','leviticus','numbers','deuteronomy','joshua','judges','ruth',
    '1-samuel','2-samuel','1-kings','2-kings','1-chronicles','2-chronicles','ezra','nehemiah','esther',
    'job','psalm','proverbs','ecclesiastes','song-of-solomon','isaiah','jeremiah','lamentations','ezekiel','daniel',
    'hosea','joel','amos','obadiah','jonah','micah','nahum','habakkuk','zephaniah','haggai','zechariah','malachi',
    'matthew','mark','luke','john','acts','romans','1-corinthians','2-corinthians','galatians','ephesians','philippians','colossians',
    '1-thessalonians','2-thessalonians','1-timothy','2-timothy','titus','philemon','hebrews','james','1-peter','2-peter',
    '1-john','2-john','3-john','jude','revelation'
  ];
  const bookOrderMap = Object.fromEntries(bookOrder.map((b,i)=>[b,i]));

  // Load and merge per-book token files for a given version (lazy: token files, not full book JSONs)
  async function loadTokenIndexesForVersion(version){
    if(indexes[version]) return indexes[version];
    // load global index to find books for this version
    const idxRes = await fetch('/data/bible/index.json');
    const idx = await idxRes.json();
    const books = idx.books.filter(b=>b.version===version);
    const tokenMap = Object.create(null);
    // fetch per-book token files in parallel
    const loads = books.map(async b=>{
      const parts = b.path.split('/').filter(Boolean); // data,bible,lang,ver,book.json
      const lang = parts[2] || 'en';
      const ver = parts[3] || version;
      const bookfname = parts[4] || (b.id + '-tokens.json');
      const bookid = b.id;
      const tokenUrl = `/data/bible/${lang}/${ver}/${bookid}-tokens.json`;
      try{
        const res = await fetch(tokenUrl);
        if(!res.ok) return;
        const tjson = await res.json();
        for(const [tok, ids] of Object.entries(tjson.tokens||{})){
          if(!tokenMap[tok]) tokenMap[tok]=[];
          tokenMap[tok].push(...ids);
        }
      }catch(e){ console.debug('token load failed', tokenUrl, e); }
    });
    await Promise.all(loads);
    // dedupe id arrays
    for(const k of Object.keys(tokenMap)) tokenMap[k] = Array.from(new Set(tokenMap[k]));
    indexes[version] = tokenMap;
    return tokenMap;
  }

  function tokenizeQuery(q){
    // simple tokenizer: operators &,|,~, parentheses, quoted phrases, /regex/ or words
    const tokens = [];
    let i=0;
    while(i<q.length){
      const c = q[i];
      if(c===' '){ i++; continue; }
      if(c==='&' || c==='|' || c==='~' || c==='(' || c===')'){ tokens.push({type:'op',val:c}); i++; continue; }
      if(c==='"'){
        let j=i+1; let sb='';
        while(j<q.length && q[j]!== '"'){ sb+=q[j++]; }
        tokens.push({type:'phrase',val:sb});
        i = j+1; continue;
      }
      if(c==='/' ){ // regex
        let j=i+1; let sb='';
        while(j<q.length && q[j]!=='/'){
          if(q[j]==='\\' && j+1<q.length){ sb+=q[j]+q[j+1]; j+=2; } else { sb+=q[j++]; }
        }
        tokens.push({type:'regex',val:sb});
        i = j+1; continue;
      }
      // word
      let j=i; let sb='';
      while(j<q.length && !/\s|&|\||~|\(|\)|"|\//.test(q[j])){ sb+=q[j++]; }
      tokens.push({type:'word', val: sb.toLowerCase()});
      i=j;
    }
    return tokens;
  }

  // Shunting-yard to produce RPN with precedence: ~ (unary) highest, & then |
  function toRPN(tokens){
    const out = [];
    const ops = [];
    function prec(op){ if(op==='~') return 3; if(op==='&') return 2; if(op==='|') return 1; return 0; }
    for(let t of tokens){
      if(t.type==='word' || t.type==='phrase' || t.type==='regex') out.push(t);
      else if(t.type==='op'){
        const v = t.val;
        if(v==='('){ ops.push(v); }
        else if(v===')'){
          while(ops.length && ops[ops.length-1] !== '(') out.push({type:'op', val: ops.pop()});
          ops.pop();
        } else {
          while(ops.length && prec(ops[ops.length-1]) >= prec(v)) out.push({type:'op', val: ops.pop()});
          ops.push(v);
        }
      }
    }
    while(ops.length) out.push({type:'op', val: ops.pop()});
    return out;
  }

  function evalRPN(rpn, index){
    // index: token -> [ids]
    function setFromArray(arr){ return new Set(arr || []); }
    const stack = [];
    for(const t of rpn){
      if(t.type==='word') stack.push(setFromArray(index[t.val]));
      else if(t.type==='phrase' || t.type==='regex') stack.push({__defer__:t});
      else if(t.type==='op'){
        if(t.val==='~'){
          const a = stack.pop();
          stack.push({__not__: a});
        } else {
          const b = stack.pop();
          const a = stack.pop();
          if(t.val==='&') stack.push({__and__:[a,b]});
          else if(t.val==='|') stack.push({__or__:[a,b]});
        }
      }
    }
    return stack[0];
  }

  function idsFromExpr(expr, index){
    // recursively resolve expression built by evalRPN into a Set of ids
    if(expr==null) return new Set();
    if(expr instanceof Set) return expr;
    if(expr.__not__) {
      const sub = idsFromExpr(expr.__not__, index);
      // universe = all ids from index
      const all = new Set();
      for(const ids of Object.values(index)) ids.forEach(id=>all.add(id));
      for(const s of sub) all.delete(s);
      return all;
    }
    if(expr.__and__){
      const a = idsFromExpr(expr.__and__[0], index);
      const b = idsFromExpr(expr.__and__[1], index);
      const res = new Set(); for(const x of a) if(b.has(x)) res.add(x); return res;
    }
    if(expr.__or__){
      const a = idsFromExpr(expr.__or__[0], index);
      const b = idsFromExpr(expr.__or__[1], index);
      const res = new Set(a); for(const x of b) res.add(x); return res;
    }
    if(expr.__defer__){
      // placeholder for phrase/regex: return null to indicate we need text filtering later
      return null;
    }
    return new Set();
  }

  function groupIdsByBook(ids){
    const m = {};
    for(const id of ids){
      // id formats supported:
      // - VERSION:BOOKID:chapter:verse  (legacy)
      // - bookid-chapter-verse          (current token files, e.g. gen-1-1)
      let book = null;
      if(typeof id === 'string' && id.indexOf(':') !== -1){
        const parts = id.split(':');
        book = (parts[1] || parts[0]).toLowerCase();
      } else if(typeof id === 'string' && id.indexOf('-') !== -1){
        const parts = id.split('-');
        book = (parts[0] || id).toLowerCase();
      } else {
        book = String(id).toLowerCase();
      }
      if(!m[book]) m[book]=[];
      m[book].push(id);
    }
    return m;
  }

  function loadBook(version, book_id){
    const key = `${version}:${book_id}`;
    if(booksCache[key]) return booksCache[key];
    // Only attempt the canonical path used in the repository to avoid incorrect fallbacks
    const canonical = `/data/bible/en/${version}/${book_id}.json`;

    async function tryFetch(){
      const url = canonical;
      console.debug('SearchEngine: loading book', book_id, 'from', url);
      const res = await fetch(url);
      if(!res.ok){
        console.warn('SearchEngine: failed to load', url, 'status', res.status);
        throw new Error('Book not found: '+book_id+' (tried '+url+')');
      }
      const data = await res.json();
      // normalize to an array of verse objects
      if(Array.isArray(data)) return data;
      if(data && Array.isArray(data.verses)) return data.verses;
      // some files may embed verses under other keys; try common possibilities
      if(data && Array.isArray(data.v)) return data.v;
      // fallback: if object has numeric keys, convert to array
      if(data && typeof data === 'object'){
        const arr = [];
        for(const k of Object.keys(data)){
          if(/^\d+$/.test(k) && data[k] && typeof data[k] === 'object') arr.push(data[k]);
        }
        if(arr.length) return arr;
      }
      // as a last resort, return an empty array to avoid runtime errors
      return [];
    }

    const p = tryFetch().catch(e=>{ console.error('SearchEngine: loadBook error', e); throw e; });
    booksCache[key]=p;
    return p;
  }

  async function search(query, version){
    const idx = await loadTokenIndexesForVersion(version);
    const tokens = tokenizeQuery(query);
    const rpn = toRPN(tokens);
    const expr = evalRPN(rpn, idx);
    const idsSet = idsFromExpr(expr, idx);

    // if idsSet is null, fallback to scanning universe (slow)
    let candidateIds = idsSet ? Array.from(idsSet) : ([]);

    // if expression had deferred phrase/regex nodes, we need to filter candidates by loading verse texts
    const hasDeferred = rpn.some(t=>t.type==='phrase' || t.type==='regex');
    if(hasDeferred){
      // if no candidates yet, set universe
      if(!candidateIds.length){
        const all = new Set(); for(const ids of Object.values(idx)) ids.forEach(id=>all.add(id)); candidateIds = Array.from(all);
      }
      // group by book and load books
      const byBook = groupIdsByBook(candidateIds);
      const verses = [];
      for(const book of Object.keys(byBook)){
        const arr = await loadBook(version, book);
        // map id->verse
        const map = {}; arr.forEach(v=> map[v.id]=v);
        for(const id of byBook[book]){ if(map[id]) verses.push(map[id]); }
      }

        // now apply phrase/regex filters sequentially
        let results = verses;
        for(const t of tokens){
          if(!t) continue;
          if(t.type==='phrase'){
            const need = t.val ? String(t.val).toLowerCase() : '';
            if(need) results = results.filter(v => v.text_norm && v.text_norm.includes(need));
          } else if(t.type==='regex'){
            if(t.val){ const re = new RegExp(t.val); results = results.filter(v => re.test(v.text)); }
          }
        }
        // compute simple ranking score
        const scored = results.map(v=>{
          let score = 0;
          // token matches
          const qwords = tokens.filter(t=>t.type==='word').map(t=>t.val);
          for(const w of qwords) if(v.tokens && v.tokens.includes(w)) score += 1;
          // phrase boost
          for(const t of tokens) if(t && t.type==='phrase'){
            const p = t.val ? String(t.val).toLowerCase() : '';
            if(p && v.text_norm && v.text_norm.includes(p)) score += 5;
          }
          // regex boost
          for(const t of tokens) if(t.type==='regex'){
            const re = new RegExp(t.val);
            if(re.test(v.text)) score += 2;
          }
          return {v, score};
        });
        // sort by book order then chapter/verse (stable within same score)
        scored.sort((a,b)=>{
          const va = a.v; const vb = b.v;
          const oa = (bookOrderMap[va.book_id] !== undefined) ? bookOrderMap[va.book_id] : 999;
          const ob = (bookOrderMap[vb.book_id] !== undefined) ? bookOrderMap[vb.book_id] : 999;
          if(oa !== ob) return oa - ob;
          if(va.chapter !== vb.chapter) return va.chapter - vb.chapter;
          if(va.verse !== vb.verse) return va.verse - vb.verse;
          return 0;
        });
        return scored.map(x=>x.v);
    }

    // else load verse objects for candidateIds
    const byBook = groupIdsByBook(candidateIds);
    const results = [];
    for(const book of Object.keys(byBook)){
      const arr = await loadBook(version, book);
      const map = {}; arr.forEach(v=> map[v.id]=v);
      for(const id of byBook[book]) if(map[id]) results.push(map[id]);
    }
    // compute simple ranking score for token-only results
    const scored = results.map(v=>{
      let score = 0;
      const qwords = tokens.filter(t=>t.type==='word').map(t=>t.val);
      for(const w of qwords) if(v.tokens && v.tokens.includes(w)) score += 1;
      return {v, score};
    });
    scored.sort((a,b)=>{
      const va = a.v; const vb = b.v;
      const oa = (bookOrderMap[va.book_id] !== undefined) ? bookOrderMap[va.book_id] : 999;
      const ob = (bookOrderMap[vb.book_id] !== undefined) ? bookOrderMap[vb.book_id] : 999;
      if(oa !== ob) return oa - ob;
      if(va.chapter !== vb.chapter) return va.chapter - vb.chapter;
      if(va.verse !== vb.verse) return va.verse - vb.verse;
      return b.score - a.score;
    });
    return scored.map(x=>x.v);
  }

  const loadIndex = loadTokenIndexesForVersion;
  return { loadIndex, search };
})();

