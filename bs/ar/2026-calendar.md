---
layout: default
title: 2026 Bible Reading Calendar
---

<div id="cal-root">

<!-- Header -->
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
  <div>
    <h1 style="font-size:1.75rem;margin-bottom:0.25rem;">📅 2026 Bible Reading Calendar</h1>
    <p class="text-slate-500 text-sm" id="cal-progress"></p>
  </div>
  <div class="flex items-center gap-2">
    <button id="langToggle" onclick="toggleLang()" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
      🌐 <span id="langLabel">Show 中文</span>
    </button>
    <a href="/bs/ar/" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">← Plans</a>
  </div>
</div>

<!-- Month navigation -->
<div class="flex items-center justify-between bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-3 mb-6">
  <button onclick="prevMonth()" class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-900">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
  </button>
  <div class="text-center">
    <div id="monthLabel" class="font-bold text-slate-900 text-lg"></div>
    <div class="text-xs text-slate-400 mt-0.5">2026</div>
  </div>
  <button onclick="nextMonth()" class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-900">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
  </button>
</div>

<!-- Legend -->
<div class="flex flex-wrap gap-4 mb-5 text-xs text-slate-500">
  <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-sm bg-blue-500 inline-block"></span> Daily Reading</span>
  <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-sm bg-emerald-500 inline-block"></span> Review Day</span>
  <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-sm bg-amber-400 inline-block"></span> Today</span>
</div>

<!-- Calendar grid -->
<div id="calGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10"></div>

</div>

<script>
(function() {

  // ── Reading plan data (365 days) ──────────────────────────────
  var r = {"1/1":"Ge1-4","1/2":"Ge5-8","1/3":"Ge9-12","1/4":"Ge13-16","1/5":"Ge17-20","1/6":"Ge21-24","1/7":"Ge25-28","1/8":"Ge29-32","1/9":"Ge33-36","1/10":"Ge37-40","1/11":"Review","1/12":"Ge41-44","1/13":"Ge45-48","1/14":"Ge49-50","1/15":"Ex1-4","1/16":"Ex5-8","1/17":"Ex9-12","1/18":"Review","1/19":"Ex13-16","1/20":"Ex17-20","1/21":"Ex21-24","1/22":"Ex25-28","1/23":"Ex29-32","1/24":"Ex33-36","1/25":"Review","1/26":"Ex37-40","1/27":"Lev1-4","1/28":"Lev5-8","1/29":"Lev9-12","1/30":"Lev13-16","1/31":"Lev17-20","2/1":"Review","2/2":"Lev21-24","2/3":"Lev25-27","2/4":"Nu1-4","2/5":"Nu5-8","2/6":"Nu9-12","2/7":"Nu13-16","2/8":"Review","2/9":"Nu17-20","2/10":"Nu21-24","2/11":"Nu25-28","2/12":"Nu29-32","2/13":"Nu33-36","2/14":"Dt1-4","2/15":"Review","2/16":"Dt5-8","2/17":"Dt9-12","2/18":"Dt13-16","2/19":"Dt17-20","2/20":"Dt21-24","2/21":"Dt25-28","2/22":"Review","2/23":"Dt29-32","2/24":"Dt33-34","2/25":"Jos1-4","2/26":"Jos5-8","2/27":"Jos9-12","2/28":"Jos13-16","3/1":"Review","3/2":"Jos17-20","3/3":"Jos21-24","3/4":"Jdg1-4","3/5":"Jdg5-8","3/6":"Jdg9-12","3/7":"Jdg13-16","3/8":"Review","3/9":"Jdg17-21","3/10":"Ru1-4","3/11":"1Sa1-4","3/12":"1Sa5-8","3/13":"1Sa9-12","3/14":"1Sa13-16","3/15":"Review","3/16":"1Sa17-20","3/17":"1Sa21-24","3/18":"1Sa25-28","3/19":"1Sa29-31","3/20":"2Sa1-4","3/21":"2Sa5-8","3/22":"Review","3/23":"2Sa9-12","3/24":"2Sa13-16","3/25":"2Sa17-20","3/26":"2Sa21-24","3/27":"1Ki1-4","3/28":"1Ki5-8","3/29":"Review","3/30":"1Ki9-12","3/31":"1Ki13-16","4/1":"1Ki17-20","4/2":"1Ki21-22","4/3":"2Ki1-4","4/4":"2Ki5-8","4/5":"Review","4/6":"2Ki9-12","4/7":"2Ki13-16","4/8":"2Ki17-20","4/9":"2Ki21-25","4/10":"1Ch1-4","4/11":"1Ch5-8","4/12":"Review","4/13":"1Ch9-12","4/14":"1Ch13-16","4/15":"1Ch17-20","4/16":"1Ch21-24","4/17":"1Ch25-29","4/18":"2Ch1-4","4/19":"Review","4/20":"2Ch5-8","4/21":"2Ch9-12","4/22":"2Ch13-16","4/23":"2Ch17-20","4/24":"2Ch21-24","4/25":"2Ch25-28","4/26":"Review","4/27":"2Ch29-32","4/28":"2Ch33-36","4/29":"Ezr1-4","4/30":"Ezr5-8","5/1":"Ezr9-10","5/2":"Ne1-4","5/3":"Review","5/4":"Ne5-8","5/5":"Ne9-13","5/6":"Est1-4","5/7":"Est5-8","5/8":"Est9-10","5/9":"Job1-4","5/10":"Review","5/11":"Job5-8","5/12":"Job9-12","5/13":"Job13-16","5/14":"Job17-20","5/15":"Job21-24","5/16":"Job25-28","5/17":"Review","5/18":"Job29-32","5/19":"Job33-36","5/20":"Job37-40","5/21":"Job41-42","5/22":"Ps1-8","5/23":"Ps9-17","5/24":"Review","5/25":"Ps18-23","5/26":"Ps24-32","5/27":"Ps33-37","5/28":"Ps38-41","5/29":"Ps42-47","5/30":"Ps48-54","5/31":"Review","6/1":"Ps55-60","6/2":"Ps61-65","6/3":"Ps66-72","6/4":"Ps72-75","6/5":"Ps76-79","6/6":"Ps80-84","6/7":"Review","6/8":"Ps85-89","6/9":"Ps90-95","6/10":"Ps96-100","6/11":"Ps101-106","6/12":"Ps107-110","6/13":"Ps111-118","6/14":"Review","6/15":"Ps119","6/16":"Ps120-126","6/17":"Ps126-132","6/18":"Ps133-136","6/19":"Ps137-140","6/20":"Ps141-144","6/21":"Review","6/22":"Ps145-148","6/23":"Ps149-150","6/24":"Pr1-4","6/25":"Pr5-8","6/26":"Pr9-12","6/27":"Pr13-16","6/28":"Review","6/29":"Pr17-20","6/30":"Pr21-24","7/1":"Pr25-28","7/2":"Pr29-31","7/3":"Ecc1-4","7/4":"Ecc5-8","7/5":"Review","7/6":"Ecc9-12","7/7":"SS1-4","7/8":"SS5-8","7/9":"Isa1-4","7/10":"Isa5-8","7/11":"Isa9-12","7/12":"Review","7/13":"Isa13-16","7/14":"Isa17-20","7/15":"Isa21-24","7/16":"Isa25-28","7/17":"Isa29-32","7/18":"Isa33-36","7/19":"Review","7/20":"Isa37-40","7/21":"Isa41-44","7/22":"Isa45-48","7/23":"Isa49-52","7/24":"Isa53-56","7/25":"Isa57-60","7/26":"Review","7/27":"Isa61-64","7/28":"Isa65-66","7/29":"Jer1-4","7/30":"Jer5-8","7/31":"Jer9-12","8/1":"Jer13-16","8/2":"Review","8/3":"Jer17-20","8/4":"Jer21-24","8/5":"Jer25-28","8/6":"Jer29-32","8/7":"Jer33-36","8/8":"Jer37-40","8/9":"Review","8/10":"Jer41-44","8/11":"Jer45-48","8/12":"Jer49-52","8/13":"La1-5","8/14":"Eze1-4","8/15":"Eze5-8","8/16":"Review","8/17":"Eze9-12","8/18":"Eze13-16","8/19":"Eze17-20","8/20":"Eze21-24","8/21":"Eze25-28","8/22":"Eze29-32","8/23":"Review","8/24":"Eze33-36","8/25":"Eze37-40","8/26":"Eze41-44","8/27":"Eze45-48","8/28":"Da1-4","8/29":"Da5-8","8/30":"Review","8/31":"Da9-12","9/1":"Hos1-4","9/2":"Hos5-8","9/3":"Hos9-12","9/4":"Hos13-14","9/5":"Joel1-3","9/6":"Review","9/7":"Am1-4","9/8":"Am5-9","9/9":"Ob","9/10":"Jnh1-4","9/11":"Mic1-4","9/12":"Mic5-7","9/13":"Review","9/14":"Na1-3","9/15":"Hab1-3","9/16":"Zep1-3","9/17":"Hag1-2","9/18":"Zec1-4","9/19":"Zec5-8","9/20":"Review","9/21":"Zec9-12","9/22":"Zec13-14","9/23":"Mal1-4","9/24":"Mt1-3","9/25":"Mt4-6","9/26":"Mt7-9","9/27":"Review","9/28":"Mt10-12","9/29":"Mt13-15","9/30":"Mt16-18","10/1":"Mt19-21","10/2":"Mt22-24","10/3":"Mt25-28","10/4":"Review","10/5":"Mk1-3","10/6":"Mk4-6","10/7":"Mk7-9","10/8":"Mk10-12","10/9":"Mk13-16","10/10":"Lk1-3","10/11":"Review","10/12":"Lk4-6","10/13":"Lk7-9","10/14":"Lk10-12","10/15":"Lk13-15","10/16":"Lk16-18","10/17":"Lk19-21","10/18":"Review","10/19":"Lk22-24","10/20":"Jn1-3","10/21":"Jn4-6","10/22":"Jn7-9","10/23":"Jn10-12","10/24":"Jn13-15","10/25":"Review","10/26":"Jn16-18","10/27":"Jn19-21","10/28":"Ac1-3","10/29":"Ac4-6","10/30":"Ac7-9","10/31":"Ac10-12","11/1":"Review","11/2":"Ac13-15","11/3":"Ac16-18","11/4":"Ac19-21","11/5":"Ac22-24","11/6":"Ac25-28","11/7":"Ro1-3","11/8":"Review","11/9":"Ro4-6","11/10":"Ro7-9","11/11":"Ro10-12","11/12":"Ro13-16","11/13":"1Co1-3","11/14":"1Co4-6","11/15":"Review","11/16":"1Co7-9","11/17":"1Co10-12","11/18":"1Co13-16","11/19":"2Co1-3","11/20":"2Co4-6","11/21":"2Co7-9","11/22":"Review","11/23":"2Co10-13","11/24":"Gal1-3","11/25":"Gal4-6","11/26":"Eph1-3","11/27":"Eph4-6","11/28":"Php1-4","11/29":"Review","11/30":"Col1-4","12/1":"1Th1-3","12/2":"1Th4-5","12/3":"2Th1-3","12/4":"1Ti1-3","12/5":"1Ti4-6","12/6":"Review","12/7":"2Ti1-4","12/8":"Tit1-3-Phm","12/9":"Heb1-3","12/10":"Heb4-6","12/11":"Heb7-9","12/12":"Heb10-13","12/13":"Review","12/14":"Jas1-3","12/15":"Jas4-5","12/16":"1Pe1-3","12/17":"1Pe4-5","12/18":"2Pe1-3","12/19":"1Jn1-3","12/20":"Review","12/21":"1Jn4-5","12/22":"2Jn-3Jn","12/23":"Jude","12/24":"Rev1-3","12/25":"Rev4-6","12/26":"Rev7-9","12/27":"Review","12/28":"Rev10-12","12/29":"Rev13-15","12/30":"Rev16-18","12/31":"Rev19-22"};

  // ── Book name map {abbr: [EN, ZH]} ────────────────────────────
  var n = {"Ge":["Genesis","創世記"],"Ex":["Exodus","出埃及記"],"Lev":["Leviticus","利未記"],"Nu":["Numbers","民數記"],"Dt":["Deuteronomy","申命記"],"Jos":["Joshua","約書亞記"],"Jdg":["Judges","士師記"],"Ru":["Ruth","路得記"],"1Sa":["1 Samuel","撒母耳記上"],"2Sa":["2 Samuel","撒母耳記下"],"1Ki":["1 Kings","列王紀上"],"2Ki":["2 Kings","列王紀下"],"1Ch":["1 Chronicles","歷代志上"],"2Ch":["2 Chronicles","歷代志下"],"Ezr":["Ezra","以斯拉記"],"Ne":["Nehemiah","尼希米記"],"Est":["Esther","以斯帖記"],"Job":["Job","約伯記"],"Ps":["Psalms","詩篇"],"Pr":["Proverbs","箴言"],"Ecc":["Ecclesiastes","傳道書"],"SS":["Song of Solomon","雅歌"],"Isa":["Isaiah","以賽亞書"],"Jer":["Jeremiah","耶利米書"],"La":["Lamentations","耶利米哀歌"],"Eze":["Ezekiel","以西結書"],"Da":["Daniel","但以理書"],"Hos":["Hosea","何西阿書"],"Joel":["Joel","約珥書"],"Am":["Amos","阿摩司書"],"Ob":["Obadiah","俄巴底亞書"],"Jnh":["Jonah","約拿書"],"Mic":["Micah","彌迦書"],"Na":["Nahum","那鴻書"],"Hab":["Habakkuk","哈巴谷書"],"Zep":["Zephaniah","西番雅書"],"Hag":["Haggai","哈該書"],"Zec":["Zechariah","撒迦利亞書"],"Mal":["Malachi","瑪拉基書"],"Mt":["Matthew","馬太福音"],"Mk":["Mark","馬可福音"],"Lk":["Luke","路加福音"],"Jn":["John","約翰福音"],"Ac":["Acts","使徒行傳"],"Ro":["Romans","羅馬書"],"1Co":["1 Corinthians","哥林多前書"],"2Co":["2 Corinthians","哥林多後書"],"Gal":["Galatians","加拉太書"],"Eph":["Ephesians","以弗所書"],"Php":["Philippians","腓立比書"],"Col":["Colossians","歌羅西書"],"1Th":["1 Thessalonians","帖撒羅尼迦前書"],"2Th":["2 Thessalonians","帖撒羅尼迦後書"],"1Ti":["1 Timothy","提摩太前書"],"2Ti":["2 Timothy","提摩太後書"],"Tit":["Titus","提多書"],"Phm":["Philemon","腓利門書"],"Heb":["Hebrews","希伯來書"],"Jas":["James","雅各書"],"1Pe":["1 Peter","彼得前書"],"2Pe":["2 Peter","彼得後書"],"1Jn":["1 John","約翰一書"],"2Jn":["2 John","約翰二書"],"3Jn":["3 John","約翰三書"],"Jude":["Jude","猶大書"],"Rev":["Revelation","啟示錄"]};

  // ── Study question slugs (books that have SQ pages) ───────────
  var sq = {"Ge":"genesis","Ex":"exodus","Lev":"leviticus","Nu":"numbers","Dt":"deuteronomy","Jos":"joshua","Jdg":"judges","Ru":"ruth","1Sa":"1-samuel","2Sa":"2-samuel","1Ki":"1-kings","2Ki":"2-kings"};

  // ── Highlight questions (2–3 per book, placeholder for others) ─
  // Format: { "abbr": ["Q1 text", "Q2 text", "Q3 text"] }
  var hq = {
    "Ge": ["What does the creation account reveal about God's character and purposes?","How does the Fall (Gen 3) change humanity's relationship with God, and what hope does God's promise offer?","What can we learn from Abraham's faith journey about trusting God's promises?"],
    "Ex": ["How does the story of Moses' call reveal God's compassion for the oppressed?","What do the plagues reveal about God's power over the false gods of Egypt?","What is the significance of the Passover as a picture of redemption?"],
    "Lev": ["Why does God emphasize holiness so strongly, and what does that mean for us today?","How do the sacrificial laws point forward to Christ's atonement?","What does the concept of clean and unclean teach about approaching a holy God?"],
    "Nu": ["What does Israel's rebellion in the wilderness reveal about the human heart?","How does God's faithfulness continue despite Israel's repeated failures?","What can we learn from Caleb and Joshua's different response to the challenges ahead?"],
    "Dt": ["Why does Moses review the law before Israel enters the land?","What does 'love the Lord your God with all your heart' mean in practical terms?","How does the pattern of blessing and cursing in Deuteronomy apply to our own obedience?"],
    "Jos": ["How does the conquest of Canaan demonstrate God's faithfulness to His promises?","What does Rahab's story teach about faith and inclusion in God's people?","What does it mean to 'be strong and courageous' in Joshua 1, and how does this apply today?"],
    "Jdg": ["What cycle of sin, oppression, crying out, and deliverance do you observe in Judges?","How do the judges reflect both God's grace and the consequences of compromise?","What does the final chapters of Judges reveal about what happens when 'everyone does what is right in their own eyes'?"],
    "Ru": ["How does Ruth's loyalty to Naomi model covenant faithfulness?","What does Boaz's role as kinsman-redeemer foreshadow about Christ's redemption?","How does God's providence work quietly in ordinary events throughout this story?"],
    "1Sa": ["What does Samuel's birth and dedication reveal about Hannah's faith and God's response to prayer?","How does Saul's reign begin promisingly but end in tragedy, and what are the warning signs?","What qualities does God see in David that differ from what humans look for in a leader?"],
    "2Sa": ["How does David's response to Saul's death and the Philistines reveal his character?","What does God's covenant with David (2 Sam 7) promise and why is it significant?","How does David's sin with Bathsheba and its consequences illustrate the seriousness of sin?"],
    "1Ki": ["What contributed to Solomon's wisdom, and where did he go wrong later?","How does the division of the kingdom reflect the consequences of unfaithfulness?","What does Elijah's confrontation with the prophets of Baal teach about exclusive devotion to God?"],
    "2Ki": ["How do the ministries of Elijah and Elisha compare in terms of miracles and message?","What recurring pattern in the kings of Israel and Judah leads to their downfall?","How does the exile to Assyria and Babylon fulfill God's warnings in Deuteronomy?"]
  };

  // ── BibleGateway base URL builder ──────────────────────────────
  var bgNames = {"Ge":"Genesis","Ex":"Exodus","Lev":"Leviticus","Nu":"Numbers","Dt":"Deuteronomy","Jos":"Joshua","Jdg":"Judges","Ru":"Ruth","1Sa":"1+Samuel","2Sa":"2+Samuel","1Ki":"1+Kings","2Ki":"2+Kings","1Ch":"1+Chronicles","2Ch":"2+Chronicles","Ezr":"Ezra","Ne":"Nehemiah","Est":"Esther","Job":"Job","Ps":"Psalms","Pr":"Proverbs","Ecc":"Ecclesiastes","SS":"Song+of+Solomon","Isa":"Isaiah","Jer":"Jeremiah","La":"Lamentations","Eze":"Ezekiel","Da":"Daniel","Hos":"Hosea","Joel":"Joel","Am":"Amos","Ob":"Obadiah","Jnh":"Jonah","Mic":"Micah","Na":"Nahum","Hab":"Habakkuk","Zep":"Zephaniah","Hag":"Haggai","Zec":"Zechariah","Mal":"Malachi","Mt":"Matthew","Mk":"Mark","Lk":"Luke","Jn":"John","Ac":"Acts","Ro":"Romans","1Co":"1+Corinthians","2Co":"2+Corinthians","Gal":"Galatians","Eph":"Ephesians","Php":"Philippians","Col":"Colossians","1Th":"1+Thessalonians","2Th":"2+Thessalonians","1Ti":"1+Timothy","2Ti":"2+Timothy","Tit":"Titus","Phm":"Philemon","Heb":"Hebrews","Jas":"James","1Pe":"1+Peter","2Pe":"2+Peter","1Jn":"1+John","2Jn":"2+John","3Jn":"3+John","Jude":"Jude","Rev":"Revelation"};

  function bgUrl(abbr, chapters) {
    var name = bgNames[abbr];
    if (!name) return null;
    var search = name + (chapters ? '+' + chapters.replace('-', '-') : '');
    return 'https://www.biblegateway.com/passage/?search=' + search + '&version=NIV';
  }

  // ── Parse a reading code into {en, zh, abbr, chapters, sq, bg} ─
  function parse(code) {
    if (code === 'Review') return {en:'📋 Review Day', zh:'📋 複習日', abbr:null, sq:null, bg:null};
    if (code === '2Jn-3Jn') return {en:'2 John & 3 John', zh:'約翰二書 & 約翰三書', abbr:'2Jn', sq:null, bg:'https://www.biblegateway.com/passage/?search=2+John&version=NIV'};
    if (code === 'Tit1-3-Phm') return {en:'Titus 1–3 & Philemon', zh:'提多書 1–3 & 腓利門書', abbr:'Tit', sq:null, bg:'https://www.biblegateway.com/passage/?search=Titus+1&version=NIV'};
    var keys = Object.keys(n).sort(function(a,b){return b.length-a.length;});
    for (var i = 0; i < keys.length; i++) {
      if (code.indexOf(keys[i]) === 0) {
        var abbr = keys[i], ch = code.slice(abbr.length);
        var chStr = ch ? ' ' + ch.replace('-','–') : '';
        return {
          en: n[abbr][0] + chStr,
          zh: n[abbr][1] + chStr,
          abbr: abbr,
          chapters: ch,
          sq: sq[abbr] || null,
          bg: bgUrl(abbr, ch),
          hq: hq[abbr] || null
        };
      }
    }
    return {en:code, zh:code, abbr:null, sq:null, bg:null};
  }

  // ── Day-of-year counter ────────────────────────────────────────
  function dayOfYear(m, d) {
    var days = [0,31,29,31,30,31,30,31,31,30,31,30,31]; // 2026 is not leap, but plan uses 29 days in Feb
    var total = 0;
    for (var i = 1; i < m; i++) total += days[i];
    return total + d;
  }

  // ── State ──────────────────────────────────────────────────────
  var now = new Date();
  var todayM = now.getMonth() + 1;
  var todayD = now.getDate();
  var currentMonth = (now.getFullYear() === 2026) ? todayM : 1;
  var langZh = false;
  var openCardId = null;

  var MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var DAYS_IN_MONTH = [0,31,28,31,30,31,30,31,31,30,31,30,31];

  // ── Toggle language ───────────────────────────────────────────
  window.toggleLang = function() {
    langZh = !langZh;
    document.getElementById('langLabel').textContent = langZh ? 'Show English' : 'Show 中文';
    document.querySelectorAll('.card-en').forEach(function(el){ el.style.display = langZh ? 'none' : ''; });
    document.querySelectorAll('.card-zh').forEach(function(el){ el.style.display = langZh ? '' : 'none'; });
  };

  // ── Toggle study questions panel ──────────────────────────────
  window.toggleSQ = function(cardId) {
    var panel = document.getElementById('sq-' + cardId);
    var btn = document.getElementById('sqbtn-' + cardId);
    if (!panel) return;
    var isOpen = panel.style.display !== 'none';
    panel.style.display = isOpen ? 'none' : 'block';
    btn.textContent = isOpen ? '📖 Study Questions ▾' : '📖 Study Questions ▴';
  };

  // ── Build the study question panel HTML ───────────────────────
  function sqPanel(cardId, parsed) {
    var html = '<div id="sq-' + cardId + '" style="display:none;margin-top:0.75rem;padding-top:0.75rem;border-top:1px solid #e2e8f0;">';
    if (parsed.abbr && parsed.hq) {
      html += '<p style="font-size:0.7rem;font-weight:700;letter-spacing:0.08em;color:#94a3b8;text-transform:uppercase;margin-bottom:0.5rem;">Study Questions</p>';
      html += '<ol style="padding-left:1.1rem;margin:0 0 0.6rem;">';
      for (var i = 0; i < parsed.hq.length; i++) {
        html += '<li style="font-size:0.8rem;color:#475569;line-height:1.55;margin-bottom:0.35rem;" data-verse="' + parsed.abbr + '">' + parsed.hq[i] + '</li>';
      }
      html += '</ol>';
      if (parsed.sq) {
        html += '<a href="/bs/sq/en/' + parsed.sq + '" style="font-size:0.78rem;color:#6366f1;font-weight:600;">See all questions →</a>';
      }
    } else if (parsed.en === '📋 Review Day') {
      html += '<p style="font-size:0.82rem;color:#64748b;line-height:1.5;">Use today to review the passages read this week. Re-read a favourite section, journal reflections, or discuss with others.</p>';
    } else {
      html += '<p style="font-size:0.82rem;color:#94a3b8;">Study questions coming soon for this section.</p>';
    }
    html += '</div>';
    return html;
  }

  // ── Build one day card ────────────────────────────────────────
  function buildCard(m, d) {
    var key = m + '/' + d;
    var code = r[key];
    if (!code) return '';

    var parsed = parse(code);
    var isReview = (code === 'Review');
    var isToday = (m === todayM && d === todayD);
    var dayNum = dayOfYear(m, d);
    var cardId = m + '_' + d;

    var stripColor = isToday
      ? 'background:#f59e0b;'
      : isReview
        ? 'background:#10b981;'
        : 'background:#3b82f6;';

    var borderStyle = isToday
      ? 'border:2px solid #f59e0b;'
      : 'border:1px solid #e2e8f0;';

    var shadowStyle = isToday
      ? 'box-shadow:0 0 0 3px rgba(245,158,11,0.15), 0 4px 12px rgba(0,0,0,0.08);'
      : 'box-shadow:0 1px 4px rgba(0,0,0,0.06);';

    var bgl = parsed.bg
      ? '<a href="' + parsed.bg + '" target="_blank" rel="noopener" title="Open in BibleGateway" style="font-size:0.75rem;color:#6366f1;font-weight:500;text-decoration:none;display:inline-flex;align-items:center;gap:3px;margin-top:2px;">↗ BibleGateway</a>'
      : '';

    var html = '<div style="background:#fff;border-radius:16px;overflow:hidden;transition:box-shadow 200ms;' + borderStyle + shadowStyle + '" onmouseover="this.style.boxShadow=\'0 6px 20px rgba(0,0,0,0.1)\'" onmouseout="this.style.boxShadow=\'' + (isToday ? '0 0 0 3px rgba(245,158,11,0.15), 0 4px 12px rgba(0,0,0,0.08)' : '0 1px 4px rgba(0,0,0,0.06)') + '\'">';

    // Color strip + date
    html += '<div style="' + stripColor + 'padding:0.5rem 0.85rem;display:flex;align-items:center;justify-content:space-between;">';
    html += '<span style="font-size:0.7rem;font-weight:700;color:rgba(255,255,255,0.9);letter-spacing:0.05em;">' + MONTHS[m-1].slice(0,3).toUpperCase() + ' ' + d + '</span>';
    html += '<span style="font-size:0.68rem;font-weight:600;color:rgba(255,255,255,0.75);">Day ' + dayNum + ' / 365</span>';
    html += '</div>';

    // Card body
    html += '<div style="padding:0.85rem;">';

    // EN reading
    html += '<div class="card-en">';
    html += '<p style="font-size:0.92rem;font-weight:700;color:#0f172a;margin:0 0 0.2rem;line-height:1.3;">' + parsed.en + '</p>';
    html += bgl;
    html += '</div>';

    // ZH reading
    html += '<div class="card-zh" style="display:none;">';
    html += '<p style="font-size:0.92rem;font-weight:700;color:#0f172a;margin:0 0 0.2rem;line-height:1.3;">' + parsed.zh + '</p>';
    html += bgl;
    html += '</div>';

    // Today badge
    if (isToday) {
      html += '<span style="display:inline-block;font-size:0.65rem;font-weight:700;background:#fef3c7;color:#b45309;padding:0.15rem 0.5rem;border-radius:99px;margin-top:0.4rem;letter-spacing:0.05em;">TODAY</span>';
    }

    // Study questions button + panel
    html += '<div style="margin-top:0.65rem;">';
    html += '<button id="sqbtn-' + cardId + '" onclick="toggleSQ(\'' + cardId + '\')" style="font-size:0.78rem;color:#6366f1;font-weight:600;background:none;border:none;padding:0;cursor:pointer;">📖 Study Questions ▾</button>';
    html += sqPanel(cardId, parsed);
    html += '</div>';

    html += '</div>'; // card body
    html += '</div>'; // card wrapper

    return html;
  }

  // ── Render month ──────────────────────────────────────────────
  function renderMonth(m) {
    document.getElementById('monthLabel').textContent = MONTHS[m-1];
    var grid = document.getElementById('calGrid');
    var html = '';
    var days = DAYS_IN_MONTH[m];
    for (var d = 1; d <= days; d++) {
      var card = buildCard(m, d);
      if (card) html += card;
    }
    if (!html) html = '<p style="color:#94a3b8;font-size:0.9rem;">No readings scheduled for this month.</p>';
    grid.innerHTML = html;

    // Re-apply language state
    if (langZh) {
      document.querySelectorAll('.card-en').forEach(function(el){ el.style.display = 'none'; });
      document.querySelectorAll('.card-zh').forEach(function(el){ el.style.display = ''; });
    }

    // Update progress indicator
    updateProgress(m);

    // Scroll today into view if current month
    if (m === todayM) {
      var todayCard = grid.querySelector('[data-today="true"]');
      if (todayCard) setTimeout(function(){ todayCard.scrollIntoView({behavior:'smooth', block:'center'}); }, 150);
    }
  }

  function updateProgress(m) {
    var total = 0;
    for (var mm = 1; mm <= 12; mm++) {
      for (var dd = 1; dd <= DAYS_IN_MONTH[mm]; dd++) {
        if (r[(mm+'/'+dd)]) total++;
      }
    }
    var done = 0;
    if (now.getFullYear() === 2026) {
      for (var mm2 = 1; mm2 <= 12; mm2++) {
        for (var dd2 = 1; dd2 <= DAYS_IN_MONTH[mm2]; dd2++) {
          if (mm2 < todayM || (mm2 === todayM && dd2 <= todayD)) {
            if (r[(mm2+'/'+dd2)]) done++;
          }
        }
      }
    }
    var pct = Math.round((done / total) * 100);
    document.getElementById('cal-progress').textContent = done > 0
      ? 'Day ' + done + ' of ' + total + ' · ' + pct + '% complete'
      : MONTHS[m-1] + ' 2026';
  }

  // ── Navigation ────────────────────────────────────────────────
  window.prevMonth = function() {
    if (currentMonth > 1) { currentMonth--; renderMonth(currentMonth); }
  };
  window.nextMonth = function() {
    if (currentMonth < 12) { currentMonth++; renderMonth(currentMonth); }
  };

  // ── Init ──────────────────────────────────────────────────────
  renderMonth(currentMonth);

})();
</script>
