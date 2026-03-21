---
layout: default
title: Home
---

<div class="grid grid-cols-1 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.9fr)] gap-6 items-start mb-8 mt-2">
  <section class="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
    <p class="card-en text-xs font-bold tracking-[0.2em] text-slate-400 uppercase mb-4">Bible Study Portal</p>
    <p class="card-zh text-xs font-bold tracking-[0.2em] text-slate-400 uppercase mb-4">聖經學習入口</p>
    <h1 class="card-en text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-4 max-w-2xl">Read the Bible — know the truth.</h1>
    <h1 class="card-zh text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-4 max-w-2xl">閱讀聖經，認識真理</h1>
    <p class="card-en text-slate-600 leading-relaxed mb-3">"Jesus said, 'I am the way and the truth and the life. No one comes to the Father except through me.'" — John 14:6</p>
    <p class="card-zh text-slate-600 leading-relaxed mb-3">耶穌說「我就是道路、真理、生命；若不藉著我，沒有人能到父那裡去。」— 約翰福音 14:6</p>
    <p class="card-en text-sm text-slate-500 leading-relaxed mb-4">Available: a year-long reading plan with linked study questions.</p>
    <p class="card-zh text-sm text-slate-500 leading-relaxed mb-4">已有：一年通讀聖經計劃，配合聖經思考問題。</p>
    <p class="card-en text-sm text-slate-500 leading-relaxed mb-4">In development: in-depth book studies (for example, Genesis), short articles (Chinese characters & the Bible; evolution and God’s creation), bilingual scripture lookup (Chinese ↔ English), recommended resources and maps (Chinese Bibles, Strong's numbers), an explanation of the site name, and program-generated reading-plan calendars.</p>
    <p class="card-zh text-sm text-slate-500 leading-relaxed mb-4">在建：精讀書卷（例如創世記）、短文分享（漢字與聖經、進化論與神的創造）、中英經文查詢、網站推薦與地圖、網站名稱說明，以及用程序生成的讀經計劃日曆。</p>
    
  </section>

  <aside class="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
    <p class="card-en text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">Scripture</p>
    <p class="card-zh text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">經文</p>
    <p class="card-en text-slate-600 italic leading-relaxed mb-1 text-base">All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness, so that the servant of God may be thoroughly equipped for every good work.</p>
    <p class="card-en text-slate-400 text-sm text-right mb-0">— 2 Timothy 3:16–17</p>
    <p class="card-zh text-slate-600 leading-relaxed mb-1 text-base">聖經都是神所默示的，於教訓、督責、使人歸正、教導人學義都是有益的，叫屬神的人得以完全，預備行各樣的善事。</p>
    <p class="card-zh text-slate-400 text-sm text-right mb-0">— 提摩太後書 3:16–17</p>
  </aside>
</div>

<div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 mb-8" id="today-reading">
  <div class="mb-3">
    <p class="flex items-center gap-3 mb-2"><span class="card-en text-xs font-bold tracking-widest text-slate-400 uppercase">Today&#39;s Reading</span><span id="todayDateEn" class="text-xs font-semibold tracking-widest text-slate-400 uppercase"></span></p>
    <p class="flex items-center gap-3 mb-2"><span class="card-zh text-xs font-bold tracking-widest text-slate-400 uppercase">今日讀經</span><span id="todayDate" class="text-xs font-semibold tracking-widest text-slate-400 uppercase"></span></p>
  </div>
  <div id="todayRef" class="card-en text-2xl font-bold text-slate-900 leading-tight mb-1">Loading…</div>
  <div id="todayRefZh" class="card-zh text-2xl font-bold text-slate-900 leading-tight mb-1">載入中…</div>
  <div id="todayNote" class="text-sm text-slate-500 mb-4"></div>
  <div id="todayActions" class="flex flex-wrap gap-3"></div>
</div>

<p class="card-en text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">Main Paths</p>
<p class="card-zh text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">主要入口</p>
<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
  <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div class="flex items-center mb-4">
        <div class="text-3xl mr-3">📅</div>
        <div>
          <div class="flex items-center">
            <h3 class="card-zh font-bold text-slate-900" style="font-size:1rem;margin-top:0;">先看月曆</h3>
          </div>
          <h3 class="card-en font-bold text-slate-900 mt-1" style="font-size:1rem;margin-top:0;">Calendar First</h3>
        </div>
      </div>
    <p class="card-en text-sm text-slate-500 leading-relaxed mb-5">The main reading experience: one day at a time, with study-question access built into each card.</p>
    <p class="card-zh text-sm text-slate-500 leading-relaxed mb-5">這是主要讀經方式: 一天一張卡片，並直接連到對應的學習問題。</p>
    <a href="/bs/ar/2026-calendar" class="cta card-en">Open Calendar →</a>
    <a href="/bs/ar/2026-calendar" class="cta card-zh">打開月曆 →</a>
  </div>

  <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
    <div class="flex items-center mb-4">
      <div class="text-3xl mr-3">❓</div>
      <div>
        <div class="flex items-center">
          <h3 class="card-zh font-bold text-slate-900" style="font-size:1rem;margin-top:0;">書卷學習問題</h3>
        </div>
        <h3 class="card-en font-bold text-slate-900 mt-1" style="font-size:1rem;margin-top:0;">Book Study Questions</h3>
      </div>
    </div>
    <p class="card-en text-sm text-slate-500 leading-relaxed mb-5">Browse full question sets by book for deeper individual study, journaling, or group discussion.</p>
    <p class="card-zh text-sm text-slate-500 leading-relaxed mb-5">按書卷瀏覽完整問題集，適合個人默想、筆記整理或小組討論。</p>
    <a href="/bs/sq/" class="cta card-en">Explore Questions →</a>
    <a href="/bs/sq/" class="cta card-zh">瀏覽問題 →</a>
  </div>

  <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
    <div class="flex items-center mb-4">
      <div class="text-3xl mr-3">⬇️</div>
      <div>
        <div class="flex items-center">
          <h3 class="card-zh font-bold text-slate-900" style="font-size:1rem;margin-top:0;">下載</h3>
        </div>
        <h3 class="card-en font-bold text-slate-900 mt-1" style="font-size:1rem;margin-top:0;">Downloads</h3>
      </div>
    </div>
    <p class="card-en text-sm text-slate-500 leading-relaxed mb-5">Download the original Excel plans and portable study material for offline use or printing.</p>
    <p class="card-zh text-sm text-slate-500 leading-relaxed mb-5">下載原始 Excel 計劃與可攜式學習資料，方便離線使用或列印。</p>
    <a href="/downloads/" class="cta card-en">Open Downloads →</a>
    <a href="/downloads/" class="cta card-zh">打開下載區 →</a>
  </div>
</div>

<div class="bg-slate-50 rounded-3xl border border-slate-200 p-6 mb-8">
  <p class="card-en text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">Recommended Flow</p>
  <p class="card-zh text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">建議使用流程</p>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
    <div class="rounded-2xl bg-white border border-slate-200 p-4">
      <p class="card-en font-semibold text-slate-900 mb-1">Open the calendar</p>
      <p class="card-zh font-semibold text-slate-900 mb-1">打開月曆</p>
      <p class="card-en text-sm text-slate-500 mb-0">Use the day card as your starting point.</p>
      <p class="card-zh text-sm text-slate-500 mb-0">先從當天的卡片開始。</p>
    </div>
    <div class="rounded-2xl bg-white border border-slate-200 p-4">
      <p class="card-en font-semibold text-slate-900 mb-1">Read the passage</p>
      <p class="card-zh font-semibold text-slate-900 mb-1">閱讀經文</p>
      <p class="card-en text-sm text-slate-500 mb-0">Follow the selected language and stay with the daily reading.</p>
      <p class="card-zh text-sm text-slate-500 mb-0">依照你目前選定的語言完成當天閱讀。</p>
    </div>
    <div class="rounded-2xl bg-white border border-slate-200 p-4">
      <p class="card-en font-semibold text-slate-900 mb-1">Open the prompts</p>
      <p class="card-zh font-semibold text-slate-900 mb-1">打開提示</p>
      <p class="card-en text-sm text-slate-500 mb-0">Use the study-question panel when that book already has prepared prompts.</p>
      <p class="card-zh text-sm text-slate-500 mb-0">若該書卷已經有整理好的問題，就進入對應頁面繼續思想。</p>
    </div>
    <div class="rounded-2xl bg-white border border-slate-200 p-4">
      <p class="card-en font-semibold text-slate-900 mb-1">Go deeper later</p>
      <p class="card-zh font-semibold text-slate-900 mb-1">之後再深入</p>
      <p class="card-en text-sm text-slate-500 mb-0">Use the full book pages when you want more depth.</p>
      <p class="card-zh text-sm text-slate-500 mb-0">當你想更深入時，再打開完整書卷問題頁面。</p>
    </div>
  </div>
</div>

<p class="card-en" style="text-align:center;font-size:0.875rem;color:#94a3b8;">🔎 <a href="/search/" style="color:#6366f1;">Search the site</a> for passages, topics, and resources</p>
<p class="card-zh" style="text-align:center;font-size:0.875rem;color:#94a3b8;">🔎 <a href="/search/" style="color:#6366f1;">搜尋網站</a>中的經文、主題與資源</p>
