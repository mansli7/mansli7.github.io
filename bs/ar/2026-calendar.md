---
layout: default
title: 2026 Bible Reading Calendar
---

<div id="cal-root">

<!-- Header -->
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
  <div>
    <h1 class="card-en" style="font-size:1.75rem;margin-bottom:0.25rem;">📅 2026 Bible Reading Calendar</h1>
    <h1 class="card-zh" style="display:none;font-size:1.75rem;margin-bottom:0.25rem;">📅 2026 讀經月曆</h1>
    <p class="text-slate-500 text-sm" id="cal-progress"></p>
  </div>
  <div class="flex items-center gap-2">
    <button id="langToggle" type="button" onclick="toggleLang()" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm" aria-label="Switch calendar language">
      🌐 <span id="langLabel">Switch to 中文</span>
    </button>
    <a href="/bs/ar/" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
      <span class="card-en">← Plan Hub</span>
      <span class="card-zh" style="display:none;">← 計劃總覽</span>
    </a>
  </div>
</div>

<div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-6">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div>
      <p class="card-en text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">Start Here</p>
      <p class="card-zh text-xs font-bold tracking-widest text-slate-400 uppercase mb-2" style="display:none;">從這裡開始</p>
      <p class="card-en text-sm text-slate-600 leading-relaxed mb-0">Read the assigned passage first. When that book already has prepared study questions, open the panel for matched prompts and then continue to the full question set for deeper reflection.</p>
      <p class="card-zh text-sm text-slate-600 leading-relaxed mb-0" style="display:none;">先閱讀當天經文。若該書卷已經有預備好的學習問題，再打開面板查看對應提示，之後也可進入完整問題頁面作更深入思想。</p>
    </div>
    <div>
      <p class="card-en text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">Review Rhythm</p>
      <p class="card-zh text-xs font-bold tracking-widest text-slate-400 uppercase mb-2" style="display:none;">複習節奏</p>
      <p class="card-en text-sm text-slate-600 leading-relaxed mb-0">Review days point back to any study-question sets already available for the books covered that week. If a later book has no prepared questions yet, keep the day for rereading, prayer, and notes.</p>
      <p class="card-zh text-sm text-slate-600 leading-relaxed mb-0" style="display:none;">複習日會連回本週已經提供的書卷學習問題。若某些後面的書卷還沒有預備好的問題，今天就用來重讀經文、禱告與整理筆記。</p>
    </div>
    <div>
      <p class="card-en text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">Future Room</p>
      <p class="card-zh text-xs font-bold tracking-widest text-slate-400 uppercase mb-2" style="display:none;">後續擴充</p>
      <p class="card-en text-sm text-slate-600 leading-relaxed mb-0">Prepared study-question sets currently cover Genesis through 2 Kings, and the layout leaves room for later books plus richer metadata such as Strong numbers, verse notes, or bilingual source links.</p>
      <p class="card-zh text-sm text-slate-600 leading-relaxed mb-0" style="display:none;">目前已預備的學習問題涵蓋創世記到列王紀下；這個版面也保留了後續書卷與更多資料的擴充空間，例如 Strong 編號、經文註記，或雙語來源連結。</p>
    </div>
  </div>
</div>

<!-- Month navigation -->
<div class="flex items-center justify-between bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-3 mb-6">
  <button type="button" onclick="prevMonth()" class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-900" aria-label="Show previous month">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
  </button>
  <div class="text-center">
    <div id="monthLabel" class="font-bold text-slate-900 text-lg" aria-live="polite"></div>
    <div class="card-en text-xs text-slate-400 mt-0.5">2026</div>
    <div class="card-zh text-xs text-slate-400 mt-0.5" style="display:none;">2026 年</div>
  </div>
  <button type="button" onclick="nextMonth()" class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-900" aria-label="Show next month">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
  </button>
</div>

<!-- Legend -->
<div class="flex flex-wrap gap-4 mb-5 text-xs text-slate-500" role="list" aria-label="Calendar legend">
  <span class="card-en flex items-center gap-1.5" role="listitem"><span class="w-3 h-3 rounded-sm bg-blue-500 inline-block" aria-hidden="true"></span> Daily Reading</span>
  <span class="card-zh flex items-center gap-1.5" style="display:none;" role="listitem"><span class="w-3 h-3 rounded-sm bg-blue-500 inline-block" aria-hidden="true"></span> 每日讀經</span>
  <span class="card-en flex items-center gap-1.5" role="listitem"><span class="w-3 h-3 rounded-sm bg-emerald-500 inline-block" aria-hidden="true"></span> Review Day</span>
  <span class="card-zh flex items-center gap-1.5" style="display:none;" role="listitem"><span class="w-3 h-3 rounded-sm bg-emerald-500 inline-block" aria-hidden="true"></span> 複習日</span>
  <span class="card-en flex items-center gap-1.5" role="listitem"><span class="w-3 h-3 rounded-sm bg-amber-400 inline-block" aria-hidden="true"></span> Today</span>
  <span class="card-zh flex items-center gap-1.5" style="display:none;" role="listitem"><span class="w-3 h-3 rounded-sm bg-amber-400 inline-block" aria-hidden="true"></span> 今天</span>
</div>

<!-- Calendar grid -->
<div id="calGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10"></div>

</div>

<script>
(function() {

  var readingPlan = window.Mansli7Reading2026;
  if (!readingPlan) {
    var failedRoot = document.getElementById('cal-root');
    if (failedRoot) {
      failedRoot.innerHTML = '<div class="bg-white rounded-2xl border border-red-200 shadow-sm p-5"><p style="margin:0;color:#991b1b;font-weight:600;">Shared reading-plan data failed to load.</p><p style="margin:0.5rem 0 0;color:#7f1d1d;">Reload the page and try again.</p></div>';
    }
    return;
  }

  var r = readingPlan.r;
  var n = readingPlan.n;
  var parse = readingPlan.parse;
  var exactSqHref = readingPlan.exactSqHref;
  var sqCoverage = readingPlan.sqCoverage;

  // Use shared prompt map from reading-plan data (populated in assets/js/reading-plan-2026.js)
  var hq = readingPlan.hq || {};

  // ── Day-of-year counter ────────────────────────────────────────
  function dayOfYear(m, d) {
    var days = [0,31,28,31,30,31,30,31,31,30,31,30,31];
    var total = 0;
    for (var i = 1; i < m; i++) total += days[i];
    return total + d;
  }

  // ── State ──────────────────────────────────────────────────────
  var now = new Date();
  var todayM = now.getMonth() + 1;
  var todayD = now.getDate();
  var currentMonth = (now.getFullYear() === 2026) ? todayM : 1;
  var langZh = window.Mansli7Lang && window.Mansli7Lang.getCurrentLang() === 'zh';
  var openCardId = null;

  var MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var MONTHS_ZH = ['1 月','2 月','3 月','4 月','5 月','6 月','7 月','8 月','9 月','10 月','11 月','12 月'];
  var WEEKDAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var WEEKDAYS_ZH = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
  var DAYS_IN_MONTH = [0,31,28,31,30,31,30,31,31,30,31,30,31];

  function weekdayInfo(m, d) {
    var dayIndex = new Date(2026, m - 1, d).getDay();
    return { en: WEEKDAYS[dayIndex], zh: WEEKDAYS_ZH[dayIndex] };
  }

  function applyLangState() {}

  // ── Toggle language ───────────────────────────────────────────
  window.toggleLang = function() {
    if (!window.Mansli7Lang) return;
    window.Mansli7Lang.setLang(langZh ? 'en' : 'zh');
  };

  function syncCalendarLanguage() {
    langZh = window.Mansli7Lang && window.Mansli7Lang.getCurrentLang() === 'zh';
    document.getElementById('langLabel').textContent = langZh ? '切換至 English' : 'Switch to 中文';
    document.getElementById('monthLabel').textContent = langZh ? MONTHS_ZH[currentMonth-1] : MONTHS[currentMonth-1];
    updateProgress(currentMonth);
  }

  function setSQButtonState(cardId, isOpen) {
    var btn = document.getElementById('sqbtn-' + cardId);
    if (!btn) return;
    btn.setAttribute('aria-expanded', String(isOpen));
    var chev = btn.querySelector('.sq-chevron');
    if (chev) chev.textContent = isOpen ? '▴' : '▾';
  }

  // ── Toggle study questions panel ──────────────────────────────
  window.toggleSQ = function(cardId) {
    var panel = document.getElementById('sq-' + cardId);
    if (!panel) return;
    var isOpen = panel.style.display !== 'none';
    panel.style.display = isOpen ? 'none' : 'block';
    setSQButtonState(cardId, !isOpen);
  };

  function reviewTargets(m, d) {
    var current = new Date(2026, m - 1, d);
    var seen = {};
    var items = [];

    for (var offset = 1; offset <= 6; offset++) {
      var prev = new Date(current);
      prev.setDate(current.getDate() - offset);
      if (prev.getFullYear() !== 2026) continue;

      var code = r[(prev.getMonth() + 1) + '/' + prev.getDate()];
      if (!code || code === 'Review') continue;

      var parsed = parse(code);
      if (!parsed.sqStatus || !parsed.sqStatus.available || seen[parsed.sq]) continue;

      seen[parsed.sq] = true;
      items.push({
        slug: parsed.sq,
        en: n[parsed.abbr] ? n[parsed.abbr][0] : parsed.en,
        zh: n[parsed.abbr] ? n[parsed.abbr][1] : parsed.zh
      });
    }

    return items;
  }

  // ── Build the study question panel HTML ───────────────────────
  function sqPanel(cardId, parsed, m, d) {
    var html = '<div id="sq-' + cardId + '" style="display:none;margin-top:0.75rem;padding-top:0.75rem;border-top:1px solid #e2e8f0;">';
    var exact = parsed.code ? hq[parsed.code] : null;
    if (parsed.abbr && parsed.sqStatus && parsed.sqStatus.available && parsed.sq && exact) {
      html += '<p class="card-en" style="font-size:0.7rem;font-weight:700;letter-spacing:0.08em;color:#94a3b8;text-transform:uppercase;margin-bottom:0.5rem;">Study Questions</p>';
      html += '<p class="card-zh" style="display:none;font-size:0.7rem;font-weight:700;letter-spacing:0.08em;color:#94a3b8;text-transform:uppercase;margin-bottom:0.5rem;">學習問題</p>';
      html += '<p class="card-en" style="font-size:0.8rem;color:#64748b;line-height:1.5;margin-bottom:0.55rem;">Exact prompts for ' + parsed.en + ':</p>';
      html += '<p class="card-zh" style="display:none;font-size:0.8rem;color:#64748b;line-height:1.5;margin-bottom:0.55rem;">對應「' + parsed.zh + '」的學習提示：</p>';
      html += '<ul class="card-en" style="margin:0 0 0.7rem 1rem;padding:0;color:#0f172a;font-size:0.8rem;line-height:1.55;">';
      for (var i = 0; i < exact.en.length; i++) {
        html += '<li style="margin-bottom:0.3rem;">' + exact.en[i] + '</li>';
      }
      html += '</ul>';
      html += '<ul class="card-zh" style="display:none;margin:0 0 0.7rem 1rem;padding:0;color:#0f172a;font-size:0.8rem;line-height:1.55;">';
      for (var k = 0; k < exact.zh.length; k++) {
        html += '<li style="margin-bottom:0.3rem;">' + exact.zh[k] + '</li>';
      }
      html += '</ul>';
      html += '<a class="card-en" href="' + exactSqHref('en', parsed) + '" style="font-size:0.78rem;color:#6366f1;font-weight:600;">Open full ' + parsed.en + ' page →</a>';
      html += '<a class="card-zh" href="' + exactSqHref('zh', parsed) + '" style="display:none;font-size:0.78rem;color:#6366f1;font-weight:600;">打開完整' + parsed.zh + '頁面 →</a>';
    } else if (parsed.en === '📋 Review Day') {
      var targets = reviewTargets(m, d);
      html += '<p class="card-en" style="font-size:0.82rem;color:#64748b;line-height:1.5;margin-bottom:0.6rem;">Use today to review this week\'s readings and revisit any linked study-question sets that are already available for the books you covered.</p>';
      html += '<p class="card-zh" style="display:none;font-size:0.82rem;color:#64748b;line-height:1.5;margin-bottom:0.6rem;">今天用來複習本週讀過的經文，也可以回到本週已經提供的相關書卷學習問題頁面重新思想重點。</p>';
      if (targets.length) {
        html += '<div style="display:flex;flex-wrap:wrap;gap:0.45rem;">';
        for (var j = 0; j < targets.length; j++) {
          html += '<a class="card-en" href="/bs/sq/en/' + targets[j].slug + '" style="font-size:0.74rem;color:#0f172a;background:#eef2ff;border:1px solid #c7d2fe;padding:0.32rem 0.55rem;border-radius:9999px;text-decoration:none;font-weight:600;">' + targets[j].en + '</a>';
          html += '<a class="card-zh" href="/bs/sq/zh/' + targets[j].slug + '" style="display:none;font-size:0.74rem;color:#0f172a;background:#eef2ff;border:1px solid #c7d2fe;padding:0.32rem 0.55rem;border-radius:9999px;text-decoration:none;font-weight:600;">' + targets[j].zh + '</a>';
        }
        html += '</div>';
      } else {
        html += '<p class="card-en" style="font-size:0.82rem;color:#94a3b8;margin:0;">This week\'s readings do not yet have linked question sets. Use the day for rereading, prayer, and notes.</p>';
        html += '<p class="card-zh" style="display:none;font-size:0.82rem;color:#94a3b8;margin:0;">本週的閱讀目前還沒有對應的問題集，今天可用來重讀經文、禱告並整理筆記。</p>';
      }
    } else {
      html += '<p class="card-en" style="font-size:0.82rem;color:#64748b;line-height:1.5;margin-bottom:0.55rem;">A prepared question set for ' + parsed.en + ' is not live yet. Today\'s reading still stays on the calendar, and completed sets currently cover ' + sqCoverage.availableRangeEn + '.</p>';
      html += '<p class="card-zh" style="display:none;font-size:0.82rem;color:#64748b;line-height:1.5;margin-bottom:0.55rem;">「' + parsed.zh + '」的問題集目前尚未上線。今天的讀經仍照計畫進行，而已完成的問題集目前涵蓋' + sqCoverage.availableRangeZh + '。</p>';
      html += '<a class="card-en" href="/bs/sq/" style="font-size:0.78rem;color:#6366f1;font-weight:600;">Browse available book pages →</a>';
      html += '<a class="card-zh" href="/bs/sq/" style="display:none;font-size:0.78rem;color:#6366f1;font-weight:600;">查看目前已提供的書卷頁面 →</a>';
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
    var weekday = weekdayInfo(m, d);
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

    var bgUrlForCard = parsed.abbr ? readingPlan.bgUrl(parsed.abbr, parsed.chapters, langZh ? 'CUV' : 'NIV', langZh ? 'zh' : 'en') : parsed.bg;
    var bgl = bgUrlForCard
      ? '<a href="' + bgUrlForCard + '" target="_blank" rel="noopener" title="Open in BibleGateway" style="font-size:0.75rem;color:#6366f1;font-weight:500;text-decoration:none;display:inline-flex;align-items:center;gap:3px;margin-top:2px;">↗ BibleGateway</a>'
      : '';

    var html = '<div' + (isToday ? ' data-today="true"' : '') + ' style="background:#fff;border-radius:16px;overflow:hidden;transition:box-shadow 200ms;' + borderStyle + shadowStyle + '" onmouseover="this.style.boxShadow=\'0 6px 20px rgba(0,0,0,0.1)\'" onmouseout="this.style.boxShadow=\'' + (isToday ? '0 0 0 3px rgba(245,158,11,0.15), 0 4px 12px rgba(0,0,0,0.08)' : '0 1px 4px rgba(0,0,0,0.06)') + '\'">';

    // Color strip + date
    html += '<div style="' + stripColor + 'padding:0.5rem 0.85rem;display:flex;align-items:center;justify-content:space-between;">';
    html += '<div style="display:flex;flex-direction:column;gap:0.08rem;">';
    html += '<span class="card-en" style="font-size:0.7rem;font-weight:700;color:rgba(255,255,255,0.9);letter-spacing:0.05em;">' + MONTHS[m-1].slice(0,3).toUpperCase() + ' ' + d + ' · ' + weekday.en.toUpperCase() + '</span>';
    html += '<span class="card-zh" style="display:none;font-size:0.7rem;font-weight:700;color:rgba(255,255,255,0.9);letter-spacing:0.03em;">' + MONTHS_ZH[m-1] + ' ' + d + ' 日 · ' + weekday.zh + '</span>';
    html += '</div>';
    html += '<span class="card-en" style="font-size:0.68rem;font-weight:600;color:rgba(255,255,255,0.75);">Day ' + dayNum + ' / 365</span>';
    html += '<span class="card-zh" style="display:none;font-size:0.68rem;font-weight:600;color:rgba(255,255,255,0.75);">第 ' + dayNum + ' / 365 天</span>';
    html += '</div>';

    // Card body
    html += '<div style="padding:0.85rem;">';

    // EN reading
    html += '<div class="card-en">';
    html += '<p style="font-size:0.92rem;font-weight:700;color:#0f172a;margin:0 0 0.2rem;line-height:1.3;">' + parsed.en + '</p>';
    if (!isReview) {
      html += '<span style="display:inline-block;font-size:0.64rem;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;background:' + (parsed.sqStatus && parsed.sqStatus.available ? '#dcfce7' : '#fef3c7') + ';color:' + (parsed.sqStatus && parsed.sqStatus.available ? '#166534' : '#b45309') + ';padding:0.14rem 0.45rem;border-radius:9999px;margin:0 0 0.35rem;">' + (parsed.sqStatus && parsed.sqStatus.available ? 'Question set ready' : 'Question set coming soon') + '</span>';
    }
    html += bgl;
    html += '</div>';

    // ZH reading
    html += '<div class="card-zh" style="display:none;">';
    html += '<p style="font-size:0.92rem;font-weight:700;color:#0f172a;margin:0 0 0.2rem;line-height:1.3;">' + parsed.zh + '</p>';
    if (!isReview) {
      html += '<span style="display:inline-block;font-size:0.64rem;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;background:' + (parsed.sqStatus && parsed.sqStatus.available ? '#dcfce7' : '#fef3c7') + ';color:' + (parsed.sqStatus && parsed.sqStatus.available ? '#166534' : '#b45309') + ';padding:0.14rem 0.45rem;border-radius:9999px;margin:0 0 0.35rem;">' + (parsed.sqStatus && parsed.sqStatus.available ? '問題集已提供' : '問題集即將提供') + '</span>';
    }
    html += bgl;
    html += '</div>';

    // Today badge
    if (isToday) {
      html += '<span class="card-en" style="display:inline-block;font-size:0.65rem;font-weight:700;background:#fef3c7;color:#b45309;padding:0.15rem 0.5rem;border-radius:99px;margin-top:0.4rem;letter-spacing:0.05em;">Today</span>';
      html += '<span class="card-zh" style="display:none;font-size:0.65rem;font-weight:700;background:#fef3c7;color:#b45309;padding:0.15rem 0.5rem;border-radius:99px;margin-top:0.4rem;letter-spacing:0.05em;">今日</span>';
    }

    // Study questions button + panel
    var panelLabelEn = isReview || (parsed.sqStatus && parsed.sqStatus.available) ? '📖 Open Question Panel' : '📖 View Question Status';
    var panelLabelZh = isReview || (parsed.sqStatus && parsed.sqStatus.available) ? '📖 打開問題面板' : '📖 查看問題狀態';
    html += '<div style="margin-top:0.65rem;">';
    html += '<button type="button" id="sqbtn-' + cardId + '" onclick="toggleSQ(\'' + cardId + '\')" aria-expanded="false" aria-controls="sq-' + cardId + '" aria-label="Toggle study question details for ' + parsed.en.replace(/"/g, '&quot;') + '" style="font-size:0.78rem;color:#6366f1;font-weight:600;background:none;border:none;padding:0;cursor:pointer;display:inline-flex;align-items:center;gap:0.25rem;">';
    html += '<span class="card-en">' + panelLabelEn + '</span>';
    html += '<span class="card-zh" style="display:none;">' + panelLabelZh + '</span>';
    html += '<span class="sq-chevron">▾</span>';
    html += '</button>';
    html += sqPanel(cardId, parsed, m, d);
    html += '</div>';

    html += '</div>'; // card body
    html += '</div>'; // card wrapper

    return html;
  }

  // ── Render month ──────────────────────────────────────────────
  function renderMonth(m) {
    document.getElementById('monthLabel').textContent = langZh ? MONTHS_ZH[m-1] : MONTHS[m-1];
    var grid = document.getElementById('calGrid');
    var html = '';
    var days = DAYS_IN_MONTH[m];
    for (var d = 1; d <= days; d++) {
      var card = buildCard(m, d);
      if (card) html += card;
    }
    if (!html) html = '<p class="card-en" style="color:#94a3b8;font-size:0.9rem;">No readings are scheduled for this month.</p><p class="card-zh" style="display:none;color:#94a3b8;font-size:0.9rem;">這個月份目前沒有安排讀經內容。</p>';
    grid.innerHTML = html;

    // Re-apply language state
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
      ? (langZh
            ? '已完成第 ' + done + ' 天，共 ' + total + ' 天 · 進度 ' + pct + '%'
            : 'Completed day ' + done + ' of ' + total + ' · ' + pct + '%')
          : (langZh ? '2026 年 ' + MONTHS_ZH[m-1] + ' 讀經安排' : MONTHS[m-1] + ' 2026 reading schedule');
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
  syncCalendarLanguage();
  document.addEventListener('mansli7:langchange', function() {
    syncCalendarLanguage();
    renderMonth(currentMonth);
  });

})();
</script>
