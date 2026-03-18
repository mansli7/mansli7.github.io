(function() {
  'use strict';

  var r = {"1/1":"Ge1-4","1/2":"Ge5-8","1/3":"Ge9-12","1/4":"Ge13-16","1/5":"Ge17-20","1/6":"Ge21-24","1/7":"Ge25-28","1/8":"Ge29-32","1/9":"Ge33-36","1/10":"Ge37-40","1/11":"Review","1/12":"Ge41-44","1/13":"Ge45-48","1/14":"Ge49-50","1/15":"Ex1-4","1/16":"Ex5-8","1/17":"Ex9-12","1/18":"Review","1/19":"Ex13-16","1/20":"Ex17-20","1/21":"Ex21-24","1/22":"Ex25-28","1/23":"Ex29-32","1/24":"Ex33-36","1/25":"Review","1/26":"Ex37-40","1/27":"Lev1-4","1/28":"Lev5-8","1/29":"Lev9-12","1/30":"Lev13-16","1/31":"Lev17-20","2/1":"Review","2/2":"Lev21-24","2/3":"Lev25-27","2/4":"Nu1-4","2/5":"Nu5-8","2/6":"Nu9-12","2/7":"Nu13-16","2/8":"Review","2/9":"Nu17-20","2/10":"Nu21-24","2/11":"Nu25-28","2/12":"Nu29-32","2/13":"Nu33-36","2/14":"Dt1-4","2/15":"Review","2/16":"Dt5-8","2/17":"Dt9-12","2/18":"Dt13-16","2/19":"Dt17-20","2/20":"Dt21-24","2/21":"Dt25-28","2/22":"Review","2/23":"Dt29-32","2/24":"Dt33-34","2/25":"Jos1-4","2/26":"Jos5-8","2/27":"Jos9-12","2/28":"Jos13-16","3/1":"Review","3/2":"Jos17-20","3/3":"Jos21-24","3/4":"Jdg1-4","3/5":"Jdg5-8","3/6":"Jdg9-12","3/7":"Jdg13-16","3/8":"Review","3/9":"Jdg17-21","3/10":"Ru1-4","3/11":"1Sa1-4","3/12":"1Sa5-8","3/13":"1Sa9-12","3/14":"1Sa13-16","3/15":"Review","3/16":"1Sa17-20","3/17":"1Sa21-24","3/18":"1Sa25-28","3/19":"1Sa29-31","3/20":"2Sa1-4","3/21":"2Sa5-8","3/22":"Review","3/23":"2Sa9-12","3/24":"2Sa13-16","3/25":"2Sa17-20","3/26":"2Sa21-24","3/27":"1Ki1-4","3/28":"1Ki5-8","3/29":"Review","3/30":"1Ki9-12","3/31":"1Ki13-16","4/1":"1Ki17-20","4/2":"1Ki21-22","4/3":"2Ki1-4","4/4":"2Ki5-8","4/5":"Review","4/6":"2Ki9-12","4/7":"2Ki13-16","4/8":"2Ki17-20","4/9":"2Ki21-25","4/10":"1Ch1-4","4/11":"1Ch5-8","4/12":"Review","4/13":"1Ch9-12","4/14":"1Ch13-16","4/15":"1Ch17-20","4/16":"1Ch21-24","4/17":"1Ch25-29","4/18":"2Ch1-4","4/19":"Review","4/20":"2Ch5-8","4/21":"2Ch9-12","4/22":"2Ch13-16","4/23":"2Ch17-20","4/24":"2Ch21-24","4/25":"2Ch25-28","4/26":"Review","4/27":"2Ch29-32","4/28":"2Ch33-36","4/29":"Ezr1-4","4/30":"Ezr5-8","5/1":"Ezr9-10","5/2":"Ne1-4","5/3":"Review","5/4":"Ne5-8","5/5":"Ne9-13","5/6":"Est1-4","5/7":"Est5-8","5/8":"Est9-10","5/9":"Job1-4","5/10":"Review","5/11":"Job5-8","5/12":"Job9-12","5/13":"Job13-16","5/14":"Job17-20","5/15":"Job21-24","5/16":"Job25-28","5/17":"Review","5/18":"Job29-32","5/19":"Job33-36","5/20":"Job37-40","5/21":"Job41-42","5/22":"Ps1-8","5/23":"Ps9-17","5/24":"Review","5/25":"Ps18-23","5/26":"Ps24-32","5/27":"Ps33-37","5/28":"Ps38-41","5/29":"Ps42-47","5/30":"Ps48-54","5/31":"Review","6/1":"Ps55-60","6/2":"Ps61-65","6/3":"Ps66-72","6/4":"Ps72-75","6/5":"Ps76-79","6/6":"Ps80-84","6/7":"Review","6/8":"Ps85-89","6/9":"Ps90-95","6/10":"Ps96-100","6/11":"Ps101-106","6/12":"Ps107-110","6/13":"Ps111-118","6/14":"Review","6/15":"Ps119","6/16":"Ps120-126","6/17":"Ps126-132","6/18":"Ps133-136","6/19":"Ps137-140","6/20":"Ps141-144","6/21":"Review","6/22":"Ps145-148","6/23":"Ps149-150","6/24":"Pr1-4","6/25":"Pr5-8","6/26":"Pr9-12","6/27":"Pr13-16","6/28":"Review","6/29":"Pr17-20","6/30":"Pr21-24","7/1":"Pr25-28","7/2":"Pr29-31","7/3":"Ecc1-4","7/4":"Ecc5-8","7/5":"Review","7/6":"Ecc9-12","7/7":"SS1-4","7/8":"SS5-8","7/9":"Isa1-4","7/10":"Isa5-8","7/11":"Isa9-12","7/12":"Review","7/13":"Isa13-16","7/14":"Isa17-20","7/15":"Isa21-24","7/16":"Isa25-28","7/17":"Isa29-32","7/18":"Isa33-36","7/19":"Review","7/20":"Isa37-40","7/21":"Isa41-44","7/22":"Isa45-48","7/23":"Isa49-52","7/24":"Isa53-56","7/25":"Isa57-60","7/26":"Review","7/27":"Isa61-64","7/28":"Isa65-66","7/29":"Jer1-4","7/30":"Jer5-8","7/31":"Jer9-12","8/1":"Jer13-16","8/2":"Review","8/3":"Jer17-20","8/4":"Jer21-24","8/5":"Jer25-28","8/6":"Jer29-32","8/7":"Jer33-36","8/8":"Jer37-40","8/9":"Review","8/10":"Jer41-44","8/11":"Jer45-48","8/12":"Jer49-52","8/13":"La1-5","8/14":"Eze1-4","8/15":"Eze5-8","8/16":"Review","8/17":"Eze9-12","8/18":"Eze13-16","8/19":"Eze17-20","8/20":"Eze21-24","8/21":"Eze25-28","8/22":"Eze29-32","8/23":"Review","8/24":"Eze33-36","8/25":"Eze37-40","8/26":"Eze41-44","8/27":"Eze45-48","8/28":"Da1-4","8/29":"Da5-8","8/30":"Review","8/31":"Da9-12","9/1":"Hos1-4","9/2":"Hos5-8","9/3":"Hos9-12","9/4":"Hos13-14","9/5":"Joel1-3","9/6":"Review","9/7":"Am1-4","9/8":"Am5-9","9/9":"Ob","9/10":"Jnh1-4","9/11":"Mic1-4","9/12":"Mic5-7","9/13":"Review","9/14":"Na1-3","9/15":"Hab1-3","9/16":"Zep1-3","9/17":"Hag1-2","9/18":"Zec1-4","9/19":"Zec5-8","9/20":"Review","9/21":"Zec9-12","9/22":"Zec13-14","9/23":"Mal1-4","9/24":"Mt1-3","9/25":"Mt4-6","9/26":"Mt7-9","9/27":"Review","9/28":"Mt10-12","9/29":"Mt13-15","9/30":"Mt16-18","10/1":"Mt19-21","10/2":"Mt22-24","10/3":"Mt25-28","10/4":"Review","10/5":"Mk1-3","10/6":"Mk4-6","10/7":"Mk7-9","10/8":"Mk10-12","10/9":"Mk13-16","10/10":"Lk1-3","10/11":"Review","10/12":"Lk4-6","10/13":"Lk7-9","10/14":"Lk10-12","10/15":"Lk13-15","10/16":"Lk16-18","10/17":"Lk19-21","10/18":"Review","10/19":"Lk22-24","10/20":"Jn1-3","10/21":"Jn4-6","10/22":"Jn7-9","10/23":"Jn10-12","10/24":"Jn13-15","10/25":"Review","10/26":"Jn16-18","10/27":"Jn19-21","10/28":"Ac1-3","10/29":"Ac4-6","10/30":"Ac7-9","10/31":"Ac10-12","11/1":"Review","11/2":"Ac13-15","11/3":"Ac16-18","11/4":"Ac19-21","11/5":"Ac22-24","11/6":"Ac25-28","11/7":"Ro1-3","11/8":"Review","11/9":"Ro4-6","11/10":"Ro7-9","11/11":"Ro10-12","11/12":"Ro13-16","11/13":"1Co1-3","11/14":"1Co4-6","11/15":"Review","11/16":"1Co7-9","11/17":"1Co10-12","11/18":"1Co13-16","11/19":"2Co1-3","11/20":"2Co4-6","11/21":"2Co7-9","11/22":"Review","11/23":"2Co10-13","11/24":"Gal1-3","11/25":"Gal4-6","11/26":"Eph1-3","11/27":"Eph4-6","11/28":"Php1-4","11/29":"Review","11/30":"Col1-4","12/1":"1Th1-3","12/2":"1Th4-5","12/3":"2Th1-3","12/4":"1Ti1-3","12/5":"1Ti4-6","12/6":"Review","12/7":"2Ti1-4","12/8":"Tit1-3-Phm","12/9":"Heb1-3","12/10":"Heb4-6","12/11":"Heb7-9","12/12":"Heb10-13","12/13":"Review","12/14":"Jas1-3","12/15":"Jas4-5","12/16":"1Pe1-3","12/17":"1Pe4-5","12/18":"2Pe1-3","12/19":"1Jn1-3","12/20":"Review","12/21":"1Jn4-5","12/22":"2Jn-3Jn","12/23":"Jude","12/24":"Rev1-3","12/25":"Rev4-6","12/26":"Rev7-9","12/27":"Review","12/28":"Rev10-12","12/29":"Rev13-15","12/30":"Rev16-18","12/31":"Rev19-22"};

  var n = {"Ge":["Genesis","創世記"],"Ex":["Exodus","出埃及記"],"Lev":["Leviticus","利未記"],"Nu":["Numbers","民數記"],"Dt":["Deuteronomy","申命記"],"Jos":["Joshua","約書亞記"],"Jdg":["Judges","士師記"],"Ru":["Ruth","路得記"],"1Sa":["1 Samuel","撒母耳記上"],"2Sa":["2 Samuel","撒母耳記下"],"1Ki":["1 Kings","列王紀上"],"2Ki":["2 Kings","列王紀下"],"1Ch":["1 Chronicles","歷代志上"],"2Ch":["2 Chronicles","歷代志下"],"Ezr":["Ezra","以斯拉記"],"Ne":["Nehemiah","尼希米記"],"Est":["Esther","以斯帖記"],"Job":["Job","約伯記"],"Ps":["Psalms","詩篇"],"Pr":["Proverbs","箴言"],"Ecc":["Ecclesiastes","傳道書"],"SS":["Song of Solomon","雅歌"],"Isa":["Isaiah","以賽亞書"],"Jer":["Jeremiah","耶利米書"],"La":["Lamentations","耶利米哀歌"],"Eze":["Ezekiel","以西結書"],"Da":["Daniel","但以理書"],"Hos":["Hosea","何西阿書"],"Joel":["Joel","約珥書"],"Am":["Amos","阿摩司書"],"Ob":["Obadiah","俄巴底亞書"],"Jnh":["Jonah","約拿書"],"Mic":["Micah","彌迦書"],"Na":["Nahum","那鴻書"],"Hab":["Habakkuk","哈巴谷書"],"Zep":["Zephaniah","西番雅書"],"Hag":["Haggai","哈該書"],"Zec":["Zechariah","撒迦利亞書"],"Mal":["Malachi","瑪拉基書"],"Mt":["Matthew","馬太福音"],"Mk":["Mark","馬可福音"],"Lk":["Luke","路加福音"],"Jn":["John","約翰福音"],"Ac":["Acts","使徒行傳"],"Ro":["Romans","羅馬書"],"1Co":["1 Corinthians","哥林多前書"],"2Co":["2 Corinthians","哥林多後書"],"Gal":["Galatians","加拉太書"],"Eph":["Ephesians","以弗所書"],"Php":["Philippians","腓立比書"],"Col":["Colossians","歌羅西書"],"1Th":["1 Thessalonians","帖撒羅尼迦前書"],"2Th":["2 Thessalonians","帖撒羅尼迦後書"],"1Ti":["1 Timothy","提摩太前書"],"2Ti":["2 Timothy","提摩太後書"],"Tit":["Titus","提多書"],"Phm":["Philemon","腓利門書"],"Heb":["Hebrews","希伯來書"],"Jas":["James","雅各書"],"1Pe":["1 Peter","彼得前書"],"2Pe":["2 Peter","彼得後書"],"1Jn":["1 John","約翰一書"],"2Jn":["2 John","約翰二書"],"3Jn":["3 John","約翰三書"],"Jude":["Jude","猶大書"],"Rev":["Revelation","啟示錄"]};

  var sq = {"Ge":"genesis","Ex":"exodus","Lev":"leviticus","Nu":"numbers","Dt":"deuteronomy","Jos":"joshua","Jdg":"judges","Ru":"ruth","1Sa":"1-samuel","2Sa":"2-samuel","1Ki":"1-kings","2Ki":"2-kings"};
  var sqCoverage = {
    availableCount: Object.keys(sq).length,
    totalCount: Object.keys(n).length,
    availableRangeEn: 'Genesis through 2 Kings',
    availableRangeZh: '創世記到列王紀下'
  };

  var bgNames = {"Ge":"Genesis","Ex":"Exodus","Lev":"Leviticus","Nu":"Numbers","Dt":"Deuteronomy","Jos":"Joshua","Jdg":"Judges","Ru":"Ruth","1Sa":"1+Samuel","2Sa":"2+Samuel","1Ki":"1+Kings","2Ki":"2+Kings","1Ch":"1+Chronicles","2Ch":"2+Chronicles","Ezr":"Ezra","Ne":"Nehemiah","Est":"Esther","Job":"Job","Ps":"Psalms","Pr":"Proverbs","Ecc":"Ecclesiastes","SS":"Song+of+Solomon","Isa":"Isaiah","Jer":"Jeremiah","La":"Lamentations","Eze":"Ezekiel","Da":"Daniel","Hos":"Hosea","Joel":"Joel","Am":"Amos","Ob":"Obadiah","Jnh":"Jonah","Mic":"Micah","Na":"Nahum","Hab":"Habakkuk","Zep":"Zephaniah","Hag":"Haggai","Zec":"Zechariah","Mal":"Malachi","Mt":"Matthew","Mk":"Mark","Lk":"Luke","Jn":"John","Ac":"Acts","Ro":"Romans","1Co":"1+Corinthians","2Co":"2+Corinthians","Gal":"Galatians","Eph":"Ephesians","Php":"Philippians","Col":"Colossians","1Th":"1+Thessalonians","2Th":"2+Thessalonians","1Ti":"1+Timothy","2Ti":"2+Timothy","Tit":"Titus","Phm":"Philemon","Heb":"Hebrews","Jas":"James","1Pe":"1+Peter","2Pe":"2+Peter","1Jn":"1+John","2Jn":"2+John","3Jn":"3+John","Jude":"Jude","Rev":"Revelation"};

  function bgUrl(abbr, chapters, version, lang) {
    var name = bgNames[abbr];
    if (!name) return null;
    // Prefer human-readable names from `n` mapping when available
    var book = null;
    try {
      if (lang === 'zh' && n && n[abbr] && n[abbr][1]) book = n[abbr][1];
      else if (n && n[abbr] && n[abbr][0]) book = n[abbr][0];
    } catch (e) {
      book = null;
    }
    if (!book) book = name.replace(/\+/g, ' ');
    var search = book + (chapters ? ' ' + chapters.replace(/-/g, '-') : '');
    var ver = version || 'NIV';
    return 'https://www.biblegateway.com/passage/?search=' + encodeURIComponent(search) + '&version=' + encodeURIComponent(ver);
  }

  function studyQuestionStatus(abbr) {
    if (!abbr) return { key: 'none', available: false, en: 'Not applicable', zh: '不適用' };
    if (sq[abbr]) return { key: 'available', available: true, en: 'Available now', zh: '已提供' };
    return { key: 'coming-soon', available: false, en: 'Coming soon', zh: '即將提供' };
  }

  function parse(code) {
    if (code === 'Review') return {code:code, en:'📋 Review Day', zh:'📋 複習日', abbr:null, chapters:'', sq:null, bg:null, sqStatus:{ key:'review', available:false, en:'Review day', zh:'複習日' }};
    if (code === '2Jn-3Jn') return {code:code, en:'2 John & 3 John', zh:'約翰二書 & 約翰三書', abbr:'2Jn', chapters:'', sq:null, bg:'https://www.biblegateway.com/passage/?search=2+John&version=NIV', sqStatus:studyQuestionStatus('2Jn')};
    if (code === 'Tit1-3-Phm') return {code:code, en:'Titus 1–3 & Philemon', zh:'提多書 1–3 & 腓利門書', abbr:'Tit', chapters:'', sq:null, bg:'https://www.biblegateway.com/passage/?search=Titus+1&version=NIV', sqStatus:studyQuestionStatus('Tit')};

    var keys = Object.keys(n).sort(function(a, b) { return b.length - a.length; });
    for (var i = 0; i < keys.length; i++) {
      if (code.indexOf(keys[i]) === 0) {
        var abbr = keys[i];
        var chapters = code.slice(abbr.length);
        var chapterLabel = chapters ? ' ' + chapters.replace(/-/g, '–') : '';
        return {
          code: code,
          en: n[abbr][0] + chapterLabel,
          zh: n[abbr][1] + chapterLabel,
          abbr: abbr,
          chapters: chapters,
          sq: sq[abbr] || null,
          bg: bgUrl(abbr, chapters),
          sqStatus: studyQuestionStatus(abbr)
        };
      }
    }

    return {code:code, en:code, zh:code, abbr:null, chapters:'', sq:null, bg:null, sqStatus:studyQuestionStatus(null)};
  }

  function exactSqAnchor(parsed) {
    if (!parsed.sq || !parsed.chapters) return '';
    var range = parsed.chapters.replace(/[^0-9]+/g, '-').replace(/^-+|-+$/g, '');
    return range ? 'sq-' + parsed.sq + '-' + range : '';
  }

  function exactSqHref(targetLang, parsed) {
    var href = '/bs/sq/' + targetLang + '/' + parsed.sq;
    var anchor = exactSqAnchor(parsed);
    return anchor ? href + '#' + anchor : href;
  }

  // Utility: escape RegExp
  function escapeRegExp(s) {
    return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // In-memory cache for fetched study-question files
  var _sqCache = {};

  // Compute slug for book study-question file (e.g. "Genesis" -> "genesis", "1 Samuel" -> "1-samuel")
  function sqBookSlug(abbr) {
    if (!abbr) return null;
    var book = (n && n[abbr] && n[abbr][0]) ? n[abbr][0] : (bgNames && bgNames[abbr]) || abbr;
    return book.toLowerCase().replace(/[^0-9a-z\s-]/g, '').replace(/\s+/g, '-');
  }

  // Fetch study-question markdown for a book and extract prompts for the given chapters (or whole book)
  function fetchSqPrompts(abbr, chapters, lang) {
    lang = lang === 'zh' ? 'zh' : 'en';
    var slug = sqBookSlug(abbr);
    if (!slug) return Promise.resolve(null);
    // Try multiple path variants to support different hosting base paths
    var candidates = [
      '/bs/sq/' + lang + '/' + slug + '.md',
      './bs/sq/' + lang + '/' + slug + '.md',
      'bs/sq/' + lang + '/' + slug + '.md'
    ];

    // If any candidate is cached, use it
    for (var ci = 0; ci < candidates.length; ci++) {
      var cu = candidates[ci];
      if (_sqCache[cu]) return Promise.resolve(_sqCache[cu].prompts || _sqCache[cu].rawText || null);
    }

    // Try fetching each candidate in sequence until one succeeds
    var attemptFetch = function(index) {
      if (index >= candidates.length) return Promise.resolve(null);
      var url = candidates[index];
      return fetch(url).then(function(res) {
        if (!res.ok) throw new Error('fetch ' + url + ' failed');
        return res.text().then(function(text) { return { url: url, text: text }; });
      }).catch(function() {
        return attemptFetch(index + 1);
      });
    };

    return attemptFetch(0).then(function(result) {
      if (!result || !result.text) return null;
      var url = result.url;
      var text = result.text;
      // cache raw text
      _sqCache[url] = { rawText: text };
      var book = (n && n[abbr] && n[abbr][0]) ? n[abbr][0] : abbr;
      var ch = (chapters || '').replace(/[—–]/g, '-');
      // Build regex to find the matching section header (e.g. "Genesis 1-4")
      var sectionRegex;
      if (ch) {
        var chPat = escapeRegExp(ch).replace(/\-/g, '[-–—]');
        sectionRegex = new RegExp('^' + escapeRegExp(book) + '\\s*' + chPat + '[\\s\\S]*?(?=\n---\\n|$)', 'im');
      } else {
        sectionRegex = new RegExp('^' + escapeRegExp(book) + '[\\s\\S]*?(?=\n---\\n|$)', 'im');
      }
      var m = text.match(sectionRegex);
      var section = m ? m[0] : null;
      if (!section) {
        // fallback: try to find any section that starts with the book name
        var anyRegex = new RegExp('^' + escapeRegExp(book) + '[\\s\\S]*?(?=\n---\\n|$)', 'im');
        m = text.match(anyRegex);
        section = m ? m[0] : null;
      }
      if (!section) return null;
      // Remove heading line and split into prompt blocks
      var lines = section.split(/\n/);
      // drop the first line if it contains the heading
      if (lines.length && lines[0].toLowerCase().indexOf(book.toLowerCase()) === 0) lines.shift();
      var prompts = [];
      var buffer = [];
      for (var i = 0; i < lines.length; i++) {
        var l = lines[i].trim();
        if (!l || l === '---') {
          if (buffer.length) { prompts.push(buffer.join(' ').trim()); buffer = []; }
        } else {
          buffer.push(l);
        }
      }
      if (buffer.length) prompts.push(buffer.join(' ').trim());
      _sqCache[url].prompts = prompts.length ? prompts : null;
      return _sqCache[url].prompts;
    }).catch(function() { return null; });
  }

  // Get prompts for a reading code. Returns a Promise resolving to { en: [..], zh: [..] } or null
  function getPromptsFor(code) {
    if (!code) return Promise.resolve(null);
    // If exact prompts exist in the in-memory map, return immediately
    var hqMap = window.Mansli7Reading2026 && window.Mansli7Reading2026.hq ? window.Mansli7Reading2026.hq : {};
    if (hqMap[code]) return Promise.resolve({ en: hqMap[code].en || null, zh: hqMap[code].zh || null });

    var parsed = parse(code);
    if (!parsed || !parsed.abbr) return Promise.resolve(null);
    if (!parsed.sqStatus || !parsed.sqStatus.available) return Promise.resolve(null);

    // Try exact-range prompts from book page; if missing, fall back to aggregated book prompts
    return Promise.all([fetchSqPrompts(parsed.abbr, parsed.chapters, 'en'), fetchSqPrompts(parsed.abbr, parsed.chapters, 'zh')]).then(function(results) {
      var en = results[0];
      var zh = results[1];
      if (en || zh) return { en: en, zh: zh };
      // fallback: fetch whole book prompts
      return Promise.all([fetchSqPrompts(parsed.abbr, '', 'en'), fetchSqPrompts(parsed.abbr, '', 'zh')]).then(function(full) {
        return { en: full[0], zh: full[1] };
      });
    }).catch(function() { return null; });
  }

  window.Mansli7Reading2026 = {
    r: r,
    n: n,
    sq: sq,
    sqCoverage: sqCoverage,
    bgNames: bgNames,
    bgUrl: bgUrl,
    studyQuestionStatus: studyQuestionStatus,
    parse: parse,
    exactSqAnchor: exactSqAnchor,
    exactSqHref: exactSqHref
  };

  // expose fetch helpers
  window.Mansli7Reading2026.sqBookSlug = sqBookSlug;
  window.Mansli7Reading2026.fetchSqPrompts = fetchSqPrompts;
  window.Mansli7Reading2026.getPromptsFor = getPromptsFor;

  // Short study-question prompts keyed by reading code (used by calendar and homepage)
  // NOTE: prompts are now loaded dynamically from `/bs/sq/{en|zh}/{book}.md` when missing.
  // Keep an empty hq map here to preserve backward compatibility; prefer editing the
  // individual book pages under `/bs/sq/` instead of duplicating content.
  window.Mansli7Reading2026.hq = window.Mansli7Reading2026.hq || {};
})();