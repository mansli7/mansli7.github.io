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

  // ── Exact study-question prompts keyed by reading code ────────
  var hq = {
    "Ge1-4": { en: ["Can you remember on which day God created humans?", "How were they created?", "The Chinese translation of 'greed' is 婪. Do you notice any connection between the structure of the word 婪 and the origin of sin?"], zh: ["讀完後能否記住，神是第幾天造人，如何造的？", "是否發現這個字『婪』和罪的由來有關聯？"] },
    "Ge5-8": { en: ["Did anyone in the genealogies in chapter 5 get drowned by the flood?", "The Chinese translation of 'ark' is 船. Does the structure of the word 船 suggest a deeper meaning to you?"], zh: ["第五章家譜裡的人有沒有被洪水淹死的？", "你對這個字『船』有了更多的理解嗎？"] },
    "Ge9-12": { en: ["What covenant did God make with Noah and his descendants, including you and me?", "When Babel is translated from Hebrew into English, what is it also called?", "There is a city in the Bible whose name comes from the same Hebrew word as Babel. Which city is it?"], zh: ["神和諾亞及後裔，包括你和我立了什麼約？", "巴別，從希伯來文翻譯成中文也稱作什麼，或者說聖經裡有一個城市的名字和巴別是同一個希伯來字，它是哪個城市？"] },
    "Ge13-16": { en: ["What covenant did God make with Abram?", "Who came out to meet Abram with bread and wine?"], zh: ["神和亞伯蘭立了什麼約？", "誰拿酒和餅迎接亞伯蘭？"] },
    "Ge17-20": { en: ["What new names did God give to Abram and Sarai, and what do they mean?", "Why did God destroy Sodom and Gomorrah?"], zh: ["神給亞伯蘭和撒萊的新名字叫什麼，有什麼含義？", "神為什麼要毀滅所多瑪和蛾摩拉？"] },
    "Ge21-24": { en: ["How old was Abram when he left Haran?", "How old was he when Isaac was born?", "What does Jehovah-jireh mean?"], zh: ["亞伯蘭出哈蘭時多大年齡？", "生以撒時多大年齡？", "耶和華以勒是什麼意思？"] },
    "Ge25-28": { en: ["Why was Esau also called Edom?", "Comparing Genesis 26:7 with Genesis 26:16 and 26:28-29, what do you observe?", "When Jacob deceived Isaac to receive the blessing, what methods did Isaac use to determine whether he was really Esau?"], zh: ["以掃為什麼又叫以東？", "對照創世記26:7與26:16、26:28-29，你讀出了什麼？", "當雅各騙以撒要祝福時，以撒用哪些方法來確定他是不是以掃？"] },
    "Ge29-32": { en: ["Jacob deceived his father. Who then deceived Jacob?", "How many years did Jacob serve Laban?", "Why was Jacob also called Israel?"], zh: ["雅各騙了父親，那誰騙了他？", "雅各服侍拉班多少年？", "雅各又被稱為以色列，為什麼？"] },
    "Ge33-36": { en: ["Where did Jacob tell Esau he was going?", "But where did he actually go instead?", "How many sons did Jacob have?"], zh: ["雅各對以掃說他會去什麼地方？", "但他實際卻去了另外什麼地方？", "雅各有多少個兒子？"] },
    "Ge37-40": { en: ["For how much silver was Joseph sold by his brothers?", "After he was sold, who was with him so that everything he did prospered?", "Did Joseph refuse Potiphar's wife because he was afraid of offending his master?"], zh: ["約瑟被哥哥們賣了多少銀子？", "被賣之後，誰與他同在，使他百事順利？", "約瑟不從波提乏妻子的誘惑，是因為他怕得罪他的主人嗎？"] },
    "Ge41-44": { en: ["How old was Joseph when he governed the whole land of Egypt?", "When they first went to Egypt to buy grain, how many sons did Jacob send?", "Whom did Joseph keep in custody while the other brothers returned to bring their youngest brother?"], zh: ["約瑟治理埃及全地時多大年齡？", "第一次到埃及買糧時，雅各派了幾個兒子？", "約瑟把誰囚下，讓其餘的哥哥回去把他們的小弟弟帶來？"] },
    "Ge45-48": { en: ["Who do you think sent Joseph to Egypt?", "Who would go down to Egypt with Jacob and surely bring him back up again?", "How many people from Jacob's family came to Egypt in total?"], zh: ["你認為是誰差約瑟去了埃及？", "誰要和雅各一同下埃及去，也必定帶他上來？", "雅各家來到埃及的共有多少人？"] },
    "Ge49-50": { en: ["Which son received the greatest blessing from Jacob?", "After Jacob died, was he buried in Egypt?", "After his father's death, did Joseph intend to repay his brothers for their evil deeds?"], zh: ["雅各給哪個兒子的祝福最好？", "雅各死後是葬在埃及嗎？", "約瑟在父親死後是否要報復他哥哥們的惡行？"] },
    "Ex1-4": { en: ["What are the names of the two store cities?", "Did Pharaoh command all his people to throw the Hebrew boys or girls into the Nile?", "What does the name Moses mean?"], zh: ["兩座積貨城名字是什麼？", "法老吩咐眾民把以色列人所生的男孩還是女孩丟在河裡？", "摩西是什麼意思？"] },
    "Ex5-8": { en: ["Does Pharaoh know the LORD?", "Could the water turn into blood?", "Could the dust turn into gnats?"], zh: ["法老認識耶和華嗎？", "水可能變成血嗎？", "塵土可能變成蝨子嗎？"] },
    "Ex9-12": { en: ["Why did the LORD raise Pharaoh up?", "After the hail and locusts, was anything green left in Egypt?", "When total darkness covered all Egypt for three days, where was there light?"], zh: ["為什麼耶和華叫法老存立？", "冰雹和蝗蟲過後，埃及地有青的留下嗎？", "埃及地黑暗三天之久時，哪裡有亮光？"] },
    "Ex13-16": { en: ["Whose bones did Moses take with him?", "Who led Israel by day with a pillar of cloud and by night with a pillar of fire?", "What was between the armies of Egypt and Israel?"], zh: ["摩西把誰的骸骨一同帶去？", "是誰不分晝夜帶領和光照以色列？", "在埃及營和以色列營中間有什麼？"] },
    "Ex17-20": { en: ["Could water flow from a rock?", "What does Jehovahnissi mean?", "When did Israel arrive at the Desert of Sinai?"], zh: ["磐石裡可能流出水嗎？", "耶和華尼西是什麼意思？", "以色列什麼時候來到西奈的曠野？"] },
    "Ex21-24": { en: ["For a Hebrew servant, in which year shall he go free?", "How should someone who sacrifices to any god other than the LORD be treated?", "In which year should the land lie unploughed and unused?"], zh: ["希伯來人作奴僕，第幾年可以自由？", "如果祭祀別神，不單單祭祀耶和華的人如何處置？", "第幾年要叫地歇息？"] },
    "Ex25-28": { en: ["Where were the tablets of the covenant law to be placed?", "Where did the LORD speak with Moses about everything He wanted Moses to command the Israelites?", "What was to be placed on the table at all times?"], zh: ["法版放在哪裡？", "耶和華在哪裡和摩西說他所要吩咐摩西傳給以色列人的一切事？", "在桌子上，常擺放什麼？"] },
    "Ex29-32": { en: ["Where was the bull for the sin offering to be slaughtered?", "Who would dwell among the Israelites and be their God?", "How often was Aaron to make atonement on the horns of the altar?"], zh: ["贖罪祭的公牛在哪裡被宰？", "誰要住在以色列人中間，作他們的神？", "亞倫多久一次要在壇的角上行贖罪之禮？"] },
    "Ex33-36": { en: ["Did Moses see the LORD's face or back?", "What name did the LORD proclaim?", "Can the Israelites make a covenant with the Canaanites?"], zh: ["摩西得見耶和華的面還是背？", "耶和華所宣告他的名是什麼？", "以色列人可以與迦南人立約嗎？"] },
    "Ex37-40": { en: ["Where are the four gold rings on the Ark placed?", "How much gold, silver, and bronze did the Israelites dedicate for the sanctuary?", "According to whose command was all the work on the tabernacle completed?"], zh: ["四個金環安在約櫃的什麼地方？", "以色列人為聖所獻的金、銀、銅各是多少？", "做會幕裡的一切是照誰所吩咐的？"] },
    "Lev1-4": { en: ["Why are burnt offerings to be presented?", "What kinds of livestock or birds can be used for a burnt offering?", "What must the grain offering be seasoned with, and what must not be included?"], zh: ["為什麼要獻燔祭？", "什麼牲畜或鳥可以用做燔祭？", "獻為素祭的供物都要用什麼調和，而不可有什麼？"] },
    "Lev5-8": { en: ["Is failing to testify truthfully a sin?", "If so, what offering is to be brought to seek forgiveness?", "Is lying a sin?"], zh: ["沒有如實地做見證，是不是罪？", "如果是，應該獻什麼祭求赦免？", "說謊是不是罪？"] },
    "Lev9-12": { en: ["When Aaron offered the sin offering, burnt offering, and fellowship offering and the glory of the LORD appeared to all the people, in what year, month, and day after Israel came out of Egypt did this occur?", "Why were Nadab and Abihu put to death?", "Were the Israelites allowed to eat pork?"], zh: ["亞倫獻了贖罪祭、燔祭、平安祭，耶和華的榮光向眾民顯現時，是以色列出埃及後第幾年幾月幾日？", "拿答、亞比戶為什麼被燒死？", "以色列人可以吃豬肉嗎？"] },
    "Lev13-16": { en: ["If a person was unclean, where was he to live?", "Who was responsible for determining whether a person or a garment was clean or unclean?", "Did a person seeking cleansing from uncleanness need to bring offerings?"], zh: ["人若不潔淨，他要住在哪裡？", "誰來確定人或衣物潔淨與否？", "不潔淨、求潔淨的人需要獻祭嗎？"] },
    "Lev17-20": { en: ["Was it permitted to eat blood?", "Can blood atone for sin?", "Were the Israelites allowed to follow the practices of the Egyptians or the Canaanites?"], zh: ["吃血可以嗎？", "血可以贖罪嗎？", "可以效法埃及人或迦南人的行為嗎？"] },
    "Lev21-24": { en: ["Who is considered the chief among the people?", "What is referred to as the food of God?", "Can a descendant of Aaron who has a defiling skin disease eat the sacred offerings?"], zh: ["誰在民中為首？", "什麼是神的食物？", "亞倫後裔長大痲瘋的可吃聖物嗎？"] },
    "Lev25-27": { en: ["How often is the Year of Jubilee to be celebrated?", "Are Israelites allowed to charge interest when lending to one another?", "If the Israelites violate the LORD's covenant, will the LORD forget the covenant He has made with Abraham, Isaac, and Jacob?"], zh: ["多少年才有一次禧年？", "以色列人之間借錢可以取利嗎？", "如果以色列人背棄了耶和華的約，耶和華會不會忘記與亞伯拉罕、以撒、雅各所立的約？"] },
    "Nu1-4": { en: ["How did the LORD instruct Moses to count the Israelite army?", "How many tribes were counted?", "What was the total number of people?"], zh: ["耶和華怎樣吩咐摩西數點以色列軍隊？", "被數點的有多少支派？", "共有多少人？"] },
    "Nu5-8": { en: ["Why must the unclean go outside the camp?", "What does Nazirite mean?", "How should Aaron and his sons bless the Israelites?"], zh: ["不潔淨的為什麼要到營外去？", "拿細耳是什麼意思？", "亞倫和他的兒子應該如何為以色列人祝福？"] },
    "Nu9-12": { en: ["If someone is unclean due to contact with a dead body and cannot celebrate the Passover, is there another day to celebrate it?", "Does Israel's journey or camping relate to the cloud over the tabernacle?", "On what day did the Israelites leave the Desert of Sinai?"], zh: ["若有人因死屍不潔淨不能守逾越節，還有其他的日子可守逾越節嗎？", "以色列人起行或安營和帳幕上的雲彩有關係嗎？", "哪一天以色列人離開西奈的曠野？"] },
    "Nu13-16": { en: ["From where did the twelve men set out to explore the land of Canaan?", "How many days did they spend exploring?", "How many spread a bad report?"], zh: ["十二個探子從哪裡出發去窺探迦南地？", "探子去了多少天？", "有幾個報惡信？"] },
    "Nu17-20": { en: ["Whose staff will sprout?", "Which firstborn must be redeemed?", "Which firstborn cannot be redeemed?"], zh: ["誰的杖發了芽？", "什麼頭生的總要贖出來？", "什麼頭生的必不可贖？"] },
    "Nu21-24": { en: ["What did Moses make and put up on a pole?", "Would whoever was bitten by a snake live by looking at it?", "In the New Testament, who said he would be lifted up in the same way so that everyone who believes in him may have eternal life?"], zh: ["摩西製造了什麼，掛在桿子上？", "凡被蛇咬的，一望它就活了嗎？", "在新約，誰說自己也必照樣被舉起來，叫一切信他的都得永生？"] },
    "Nu25-28": { en: ["In Numbers 25, what caused the plague?", "What caused the plague to stop?", "On the plains of Moab by the Jordan opposite Jericho, how many Israelites were counted?"], zh: ["在民數記25，什麼事情導致瘟疫發生？", "什麼事情使瘟疫止息？", "在摩押平原與耶利哥相對的約旦河邊，以色列人中被數的共有多少人？"] },
    "Nu29-32": { en: ["In Numbers 29, for what occasions did God instruct Moses to present the offerings?", "If a man makes a vow to the LORD or takes an oath to bind himself by a pledge, can he break his word?", "Why did they fight against the Midianites?"], zh: ["在民數記29，神曉諭摩西什麼時候要獻祭？", "人若向耶和華許願或起誓，要約束自己，可以食言嗎？", "為什麼要和米甸人打仗？"] },
    "Nu33-36": { en: ["Think again: when the king of Moab summoned Balaam, why did Balaam go the second time?", "How many places did the Israelites camp at from leaving Egypt until entering Canaan?", "After entering Canaan, what happens if the inhabitants are not driven out?"], zh: ["再想一想，摩押王召巴蘭，巴蘭為什麼第二次去了？", "以色列出埃及到進迦南前，走過多少站？", "進迦南後，倘若不趕出那地的居民，會如何？"] },
    "Dt1-4": { en: ["In which year, month, and day after the exodus did Moses proclaim the law in Moab east of the Jordan?", "To whom does judgment belong?", "Were the women and the men under twenty years of age counted in the Desert of Sinai?"], zh: ["摩西在約旦河東的摩押地講律法時是出埃及第幾年幾月幾日？", "審判是屬乎誰？", "婦人和二十歲以內的男丁在西奈曠野被數點了嗎？"] },
    "Dt5-8": { en: ["Is idolatry permitted?", "Who will be blessed by honoring their father and mother?", "What is the first commandment of the law?"], zh: ["拜偶像可以嗎？", "孝敬父母會使誰得福？", "律法的第一誡命是什麼？"] },
    "Dt9-12": { en: ["Was it because of Israel's righteousness that the LORD brought them into Canaan?", "How many periods of forty days and forty nights did Moses spend with the LORD?", "According to Deuteronomy chapter 10, what kind of God is the LORD?"], zh: ["耶和華領以色列人進迦南是因為他們的義嗎？", "摩西和耶和華在一起共有幾個四十晝夜？", "申命記第十章告訴我們耶和華是怎樣的一位神？"] },
    "Dt13-16": { en: ["If a prophet performs a sign or wonder and then entices you to follow other gods, what must you do?", "According to the law, is the pig clean?", "How often was the Year for Canceling Debts to be observed?"], zh: ["如果有先知行個神蹟，然後引誘你去拜耶和華以外的神，你該如何辦？", "按照律法，豬是潔淨的嗎？", "多久有一次豁免年？"] },
    "Dt17-20": { en: ["How many witnesses were required to establish guilt in cases of breaking the law?", "Once Israel had a king in Canaan, was he allowed to make the people return to Egypt?", "Why was the king required to read the Book of the Law all the days of his life?"], zh: ["如果有人違背了律法犯了罪，需要至少幾個見證人才能定案？", "進了迦南有了王，王可以帶百姓回埃及嗎？", "為什麼王要平生誦讀律法書？"] },
    "Dt21-24": { en: ["Which son was entitled to receive a double share of the inheritance?", "How was a stubborn and rebellious son to be punished?", "After someone guilty of a capital offense was put to death, on what was the body hung?"], zh: ["哪個兒子會多分一份產業？", "如何懲治頑梗悖逆的兒子？", "人犯了死罪被治死後，掛在什麼上？"] },
    "Dt25-28": { en: ["Was the punishment of flogging the wicked allowed to exceed forty lashes?", "What does the phrase the family of the unsandaled mean?", "Whom did Israel declare to be their God?"], zh: ["責打惡人，可以超過四十下嗎？", "脫鞋之家是什麼意思？", "以色列認誰為他們的神？"] },
    "Dt29-32": { en: ["If someone hears the words of this curse and still boasts in his heart, saying he will have peace though he persists in his own way, from where will the LORD blot out his name?", "Which places were overthrown together with Sodom in the LORD's fierce anger, and in which chapter of Genesis are they mentioned?", "Before Israel entered Canaan, who already knew the intentions of their hearts?"], zh: ["聽見這詛咒的話，心裡仍自誇說自己必平安，耶和華必不饒恕他；耶和華又要從哪裡塗抹他的名？", "和所多瑪一同被耶和華在憤怒中傾覆的還有哪些地方，創世記哪一章同時提到了它們？", "以色列未進迦南以先，誰都知道他們心中的意念？"] },
    "Dt33-34": { en: ["Comparing the blessings of Jacob and Moses, which tribe received a better blessing than before?", "How old was Moses when he died, where did he die, and does anyone know the location of his grave?", "Was there a dispute over the body of Moses?"], zh: ["比較雅各和摩西給以色列人的祝福，哪個支派得到了比以前更好的祝福？", "摩西死時多大年齡，死在何地，有人知道他的墳墓嗎？", "為摩西的屍首有過爭辯嗎？"] },
    "Jos1-4": { en: ["What did the LORD call Moses?", "What did the LORD command Joshua to meditate on day and night, and why?", "Did the people of Jericho know that the LORD brought Israel out of Egypt and across the Red Sea, and were they afraid?"], zh: ["耶和華稱摩西為他的什麼人？", "耶和華要約書亞晝夜思想什麼，為什麼？", "耶利哥人知道耶和華帶以色列出埃及、過紅海等事嗎？"] },
    "Jos5-8": { en: ["What does the name Gilgal mean?", "In which year, month, and day after the exodus did the manna from heaven cease?", "Were the walls of Jericho brought down by cannons or explosives?"], zh: ["吉甲是什麼意思？", "出埃及後第幾年、幾月、幾日天上的嗎哪就止住了？", "耶利哥的城牆是被大炮轟或炸藥炸而塌陷的嗎？"] },
    "Jos9-12": { en: ["Why were the Israelites deceived by the Hivites of Gibeon and made a treaty with them?", "Was the day on which Israel struck down the Amorites at Gibeon longer than other days?", "Which were more in number: those killed by the LORD with great hailstones, or those killed by Israel with the sword?"], zh: ["為什麼以色列人會被基遍的希未人所欺騙，與他們講和立約？", "以色列人在基遍擊殺亞摩利人的那一天是否比其他日子長？", "被耶和華降下大冰雹打死的，和被以色列人用刀殺死的，哪一個更多？"] },
    "Jos13-16": { en: ["Which tribes settled east of the Jordan River?", "In which year after entering Canaan did Eleazar and Joshua allot the land of Canaan to the Israelites?", "Who received Hebron as an inheritance, and why?"], zh: ["哪幾個支派住在約旦河東？", "以利亞撒和約書亞分配迦南地給以色列人時，是他們進入迦南的第幾年？", "誰得了希伯崙為產業？"] },
    "Jos17-20": { en: ["Where was the Tent of Meeting set up?", "Which tribe was located between Judah and the descendants of Joseph?", "Which tribe's inheritance was located within the territory of Judah?"], zh: ["會幕設立在哪裡？", "哪一個支派位於猶大與約瑟子孫之間？", "哪一個支派的地業是在猶大人的地業中間？"] },
    "Jos21-24": { en: ["How many cities did the Levitical priests receive, and within the territories of which tribes were they located?", "Did any of the good promises the LORD made to Israel fail to come true?", "Who said that two tribes would be divided and scattered within the house of Jacob?"], zh: ["利未人的祭司得了幾座城？", "耶和華應許賜福給以色列的話有沒有落空？", "誰曾說要把哪兩個支派分散在雅各家中？"] },
    "Jdg1-4": { en: ["Did the tribe of Benjamin drive out the Jebusites living in Jerusalem?", "What does Bokim mean, and why was it called that?", "After Joshua and his generation died, did the later generations know the LORD?"], zh: ["便雅憫有沒有趕出住耶路撒冷的耶布斯人？", "波金是什麼意思？", "為什麼？"] },
    "Jdg5-8": { en: ["Who was with Gideon so that he would strike down the Midianites as one man?", "What does Jehovah-Shalom mean, and what is its origin?", "How many men did Gideon lead to defeat the vast army of the Midianites, Amalekites, and the eastern peoples?"], zh: ["誰與基甸同在，他就必擊打米甸人，如擊打一人一樣？", "耶和華沙龍是什麼意思？", "它的來由是什麼？"] },
    "Jdg9-12": { en: ["Who killed his seventy brothers, and was his evil repaid?", "Why did the LORD's anger burn against Israel, so that He sold them into the hands of the Philistines and the Ammonites?", "Do you think the vow Jephthah made to the LORD was good?"], zh: ["誰殺了自己弟兄七十個人？", "他的惡有沒有受到報應？", "為什麼耶和華的怒氣向以色列發作，把他們交在非利士人和亞捫人的手中？"] },
    "Jdg13-16": { en: ["What name did the angel of the LORD give to Manoah?", "What does the riddle Out of the eater, something to eat; out of the strong, something sweet mean, and how did the Philistines learn the answer?", "How many Philistines did Samson kill with the jawbone of a donkey?"], zh: ["耶和華的使者告訴瑪挪亞他的名是什麼？", "謎語『吃的從吃者出來；甜的從強者出來』是什麼意思？", "非利士人是如何知道謎底的？"] },
    "Jdg17-21": { en: ["Micah had a shrine, and he made an ephod and some household gods and installed one of his sons as his priest. Was this in accordance with the LORD's law?", "According to the law, could Jonathan, the grandson of Moses, serve as a priest?", "What do Judges 17, 18, 19, and 21 repeatedly say that Israel did not have?"], zh: ["米迦有神堂和神像，並派他兒子作祭司，符合耶和華的律法嗎？", "按照律法，摩西的孫子約拿單可以作祭司嗎？", "士師記17、18、19、21章反覆提到以色列沒有什麼？"] },
    "Ru1-4": { en: ["What did Ruth say that made Naomi realize she was determined to follow her back to Israel?", "Ruth left her father and mother and her homeland and came to live with a people she did not know. Under whose wings did she take refuge?", "Was Boaz willing to spread the corner of his garment over Ruth?"], zh: ["路得說了什麼，使拿俄米知道她定意要跟隨自己歸回以色列？", "路得離開父母和本地，到素不認識的以色列民中，是投靠在誰的翅膀下？", "波阿斯是否願意用他的衣襟遮蓋路得，為什麼？"] },
    "1Sa1-4": { en: ["What did Hannah say in her distress, crying out and praying to the LORD, and what vow did she make?", "Why did Hannah name her son Samuel?", "Why were Eli's two sons guilty of such serious sin in the sight of the LORD?"], zh: ["哈拿心裡愁苦，就痛痛哭泣，祈禱耶和華，許願說了什麼？", "哈拿為什麼給她兒子起名叫撒母耳？", "以利兩個兒子的罪在耶和華面前甚重，為什麼？"] },
    "1Sa5-8": { en: ["Why did the Philistines return the Ark of God to Israel?", "Why did the LORD strike down seventy men of Beth Shemesh?", "What stone did Samuel set up between Mizpah and Shen, what did he name it, and what did he say?"], zh: ["為什麼非利士人要把以色列神的約櫃送回？", "伯示麥七十人為何被耶和華擊殺？", "撒母耳將一塊石頭立在米斯巴和善的中間，給石頭起名叫什麼，說了什麼？"] },
    "1Sa9-12": { en: ["Who brought Saul from the territory of Benjamin to Samuel?", "How was Saul transformed into a new man?", "When casting lots to choose Saul as king, where did he hide?"], zh: ["誰使掃羅從便雅憫地到撒母耳這裡來？", "掃羅是如何變為新人的？", "抽籤選掃羅作王時，他藏在何處？"] },
    "1Sa13-16": { en: ["In which year of Saul's reign did he act foolishly and disobey whose command, and would his throne endure?", "Was Saul's oath in 1 Samuel 14 good?", "Both involved killing enemies. Was Joshua's prayer in chapter 10 better?"], zh: ["掃羅作王第幾年，他做了糊塗事，沒有遵守誰的命令，他的王位會長久嗎？", "撒上14章掃羅叫百姓起的誓好嗎？", "同是擊殺敵人，書10章約書亞的禱告是不是更好？"] },
    "1Sa17-20": { en: ["Goliath challenged Israel for forty days. Did anyone face him?", "What did Goliath rely on to attack David, and what did David rely on to attack Goliath?", "After David killed Goliath, how did Jonathan treat David, and how did Saul treat David?"], zh: ["歌利亞向以色列人討戰四十天，有人迎戰嗎？", "歌利亞攻擊大衛是靠什麼，大衛攻擊歌利亞是靠什麼？", "大衛打死歌利亞後，約拿單如何對待大衛，而掃羅如何對待大衛，我們該向誰學習？"] },
    "1Sa21-24": { en: ["Who is mentioned in the New Testament as entering the house of God and eating the consecrated bread?", "During his flight, did David go to Philistine or Moabite territory?", "Who commanded his men to kill Ahimelek, the priest of the LORD?", "Whom did David consult about saving Keilah, and whom did he consult about leaving Keilah to escape Saul?", "In the cave, David had the opportunity to kill Saul but did not. Why?", "Did Saul know that David would become king of Israel?"], zh: ["誰曾在新約提到大衛進了神的殿，吃了陳設餅？", "大衛逃亡時，是否去過非利士地和摩押地？", "誰吩咐手下去殺耶和華的祭司亞希米勒？", "對於是否拯救基伊拉，大衛求問了誰？", "對於是否撤離基伊拉躲避掃羅，大衛又求問了誰？", "在洞裡，大衛有機會殺掃羅，但沒殺，為什麼？", "掃羅知道大衛必作以色列的王嗎？"] },
    "1Sa25-28": { en: ["David sent his servant to see Nabal. If you were in the same situation, would you respond like Nabal or like Abigail to David?", "In Saul's camp, David again had the chance to kill Saul but did not. Why?", "Did Saul know he was guilty?"], zh: ["大衛派他的僕人去見拿八，如果你遇到同樣情景，你會像拿八那樣，還是像亞比該那樣回應大衛？", "在掃羅營地，大衛又有機會殺掃羅，但沒殺，為什麼？", "掃羅知道自己有罪嗎？"] },
    "1Sa29-31": { en: ["The Philistines gathered at Aphek to fight Israel. Did the Philistine commanders allow David to go out with them?", "Whom did David consult about whether he could pursue the Amalekites?", "From the spoils David took from the Amalekites, how much did the fighting men and the guards each receive?"], zh: ["非利士人聚集到亞弗去和以色列打仗，非利士首領讓大衛和他們一同出戰嗎？", "對於是否能追趕上亞瑪力人，大衛求問了誰？", "大衛從亞瑪力人得到的擄物，上陣的和看守的各得多少？"] },
    "2Sa1-4": { en: ["Saul had pursued David for many years. Now that Saul was dead, did David rejoice or mourn and weep?", "Whether he could go up to Judah, and even which city to go to, whom did David inquire of?", "Where was David anointed king over the house of Judah?"], zh: ["掃羅曾追殺大衛多年，現在掃羅死了，大衛歡喜快樂還是悲哀哭號？", "是否可去猶大，甚至哪一個城，大衛求問了誰？", "在哪裡大衛被膏作猶大家的王？"] },
    "2Sa5-8": { en: ["How old was David when he became king, and how many years did he reign?", "Could he attack the Philistines, and whom did David inquire of?", "Why did the LORD strike Uzzah dead?"], zh: ["大衛登基時多大年紀，在位多少年？", "是否可以攻打非利士人，大衛求問了誰？", "耶和華為什麼擊殺烏撒？"] },
    "2Sa9-12": { en: ["Why did David show kindness to Mephibosheth?", "Why did David summon Uriah back to Jerusalem?", "Who killed Uriah?"], zh: ["為什麼大衛施恩與米非波設？", "大衛為什麼召烏利亞回耶路撒冷？", "誰殺死了烏利亞？"] },
    "2Sa13-16": { en: ["Amnon disgraced Tamar, and Absalom killed Amnon. Why did such calamity occur in David's house?", "According to the law, how should they have been punished?", "Who arranged for Absalom to return from Geshur to Jerusalem?"], zh: ["暗嫩玷辱了她瑪，押沙龍殺了暗嫩，為何在大衛家有此禍患？", "按照律法，如何懲治他們？", "誰設法讓押沙龍從基述回到耶路撒冷？"] },
    "2Sa17-20": { en: ["Why did Absalom and others say that Hushai the Arkite's advice is better than Ahithophel's?", "How did Ahithophel die?", "Who killed Absalom?"], zh: ["為什麼押沙龍等說亞基人戶篩的計謀比亞希多弗的計謀更好？", "亞希多弗是如何死的？", "誰殺死了押沙龍？"] },
    "2Sa21-24": { en: ["Why was there a famine for three successive years during David's reign?", "In which book of the Bible did Israel swear not to destroy the Gibeonites?", "In David's psalm, who is his fortress, rock, stronghold, shield, horn of salvation, high tower, refuge, light in darkness, and strength?"], zh: ["大衛年間為何有連續三年的飢荒？", "在聖經哪部書以色列曾起誓不殺滅基遍人？", "在大衛的詩裡，誰是他的山寨，磐石，盾牌，拯救的角，高台，避難所，照明黑暗的燈，堅固的保障？"] },
    "1Ki1-4": { en: ["Who said I will be king, and who was anointed to succeed David as king?", "What did David instruct Solomon to observe so that he would prosper in all he did and wherever he went?", "By chapter 4, how many of David's sons had been killed?"], zh: ["誰說我必作王，誰被膏接續大衛作王？", "大衛囑咐所羅門遵守什麼，這樣無論做什麼事，不拘往何處去，盡都亨通？", "到王上第四章，大衛有幾個兒子被殺死？"] },
    "1Ki5-8": { en: ["For whose name did Solomon resolve to build the temple?", "Who provided him with cedar and juniper logs according to Solomon's request?", "In which year did construction of the LORD's temple begin, and how long did it take to complete?"], zh: ["所羅門定意要為誰的名建殿？", "誰照著所羅門所要的，給他香柏木和松木？", "哪年開始建耶和華殿，歷時多久建成？"] },
    "1Ki9-12": { en: ["Is it possible for the LORD to abandon and disregard His temple, and if so, under what conditions?", "Regarding Solomon's wisdom, was there a difference between what the Queen of Sheba heard and what she saw with her own eyes?", "Whom did she say is to be praised?"], zh: ["有沒有可能耶和華捨棄不顧他的殿，如有可能，是在什麼條件下？", "關於所羅門的智慧，示巴女王聽見的和她親眼看到的有沒有區別？", "她說誰是應當稱頌的？"] },
    "1Ki13-16": { en: ["What did the man of God from Judah proclaim to the altar by the command of the LORD, and why was he killed by a lion on his way back?", "Among the family of Jeroboam, who alone was buried in a grave, and why?", "What happened to the rest, and why?"], zh: ["從猶大來的神人，奉耶和華的命向壇呼叫說了什麼，回去時，他為什麼被獅子咬死？", "屬耶羅波安的人，唯有誰得入墳墓，為什麼，其餘的會有什麼下場，為什麼？"] },
    "1Ki17-20": { en: ["Who caused the drought in Israel, and how long did it last?", "Regarding Elijah's prayer, how is it described in the New Testament?", "Who in the New Testament mentions the widow of Zarephath in Sidon?"], zh: ["使以色列遭旱災的是誰，旱災持續多久？", "關於以利亞的禱告，新約如何說？", "誰在新約提到西頓撒勒法的寡婦？"] },
    "1Ki21-22": { en: ["Why did Naboth refuse to sell his vineyard to Ahab?", "Was Naboth killed for blaspheming God?", "Who betrayed Ahab?"], zh: ["拿伯為什麼不願意賣葡萄園給亞哈？", "拿伯是因謗瀆神而被打死的嗎？", "誰賣了亞哈？"] },
    "2Ki1-4": { en: ["Why would Ahaziah not recover from the bed he lay on, and why was he certain to die?", "Why was the third captain with his fifty men not consumed by the fire sent from heaven?", "By whom, in what manner, and to where was Elijah taken?"], zh: ["為什麼亞哈謝必不下他所上的床，必定要死？", "為什麼第三個五十夫長和他的五十人沒被從天上降下來神的火燒滅？", "以利亞被誰用什麼方式接到何處？"] },
    "2Ki5-8": { en: ["Who advised Naaman of Aram to go to Samaria to be healed of leprosy?", "Did the king of Israel have a way to heal him?", "What was the method of healing provided by the man of God, Elisha?"], zh: ["誰建議亞蘭國乃縵去撒瑪利亞求治大痲瘋？", "以色列王有治療方法嗎？", "神人以利沙的治療方法是什麼？"] },
    "2Ki9-12": { en: ["Whom did Elisha's disciples anoint as king of Israel, and what did the LORD commission this king to do?", "Which king did Jehu kill along with King Jehoram of Israel?", "How was Jezebel killed, what happened to Ahab's seventy sons, was all of Ahab's house destroyed, and was the LORD's word spoken through Elijah fulfilled?"], zh: ["以利沙的門徒膏誰作以色列王，耶和華讓這個王做什麼？", "耶戶殺以色列王約蘭，同時還殺了哪個王？", "耶洗別如何被殺，亞哈七十個兒子如何被殺，亞哈家都被殺了嗎，耶和華藉以利亞所說的話成就了嗎？"] },
    "2Ki13-16": { en: ["King Hazael of Aram repeatedly oppressed Israel. Do you remember the prophecy concerning his oppression?", "Why was Elisha angry with Joash?", "King Amaziah of Judah killed the servants who had murdered his father but did not kill their children. Why, and in which book of the law is this commanded?"], zh: ["亞蘭王哈薛屢次欺壓以色列人，你還記得關於哈薛欺壓以色列的預言嗎？", "以利沙為何向約阿施發怒？", "猶大王亞瑪謝把殺他父王的臣僕殺了，卻沒有殺死他們的兒子，為什麼，律法的出處在哪部書？"] },
    "2Ki17-20": { en: ["Who was the last king of Israel, and how many years did he reign?", "Who captured Samaria and deported the Israelites to Assyria?", "Why were Israel exiled: whom did they sin against, disobey, provoke, refuse to believe, reject, forsake, and offend?"], zh: ["誰是以色列最後的王，他作王多少年？", "誰攻取撒馬利亞，將以色列人擄到亞述？", "以色列被擄，是因為他們得罪了誰，違背了誰，惹動了誰的怒氣，不信服誰，厭棄誰的律例和什麼約，離棄了誰的誡命，行了誰眼中看為惡的事？"] },
    "2Ki21-25": { en: ["Manasseh did evil in the eyes of the LORD even more than the nations destroyed before Israel. What did he build in the courts of the LORD's temple, and what did he set up inside the temple?", "Upon whom did the LORD say He would bring disaster, what would be measured, wiped out, and rejected, and why?", "When High Priest Hilkiah found the Book of the Law in the temple, how did King Josiah respond before the LORD, and what did the LORD grant him?"], zh: ["瑪拿西行耶和華眼中看為惡的事，比耶和華在以色列人面前所滅的列國更甚，在耶和華殿的兩院中築了什麼，又在殿內立了什麼？", "耶和華說，他必降禍與誰，必用量什麼的準繩和線鉈拉在哪裡，必擦淨什麼，必丟棄誰，為什麼？", "大祭司希勒家在聖殿發現律法後，猶大王約西亞在耶和華面前如何回應，耶和華又應允了他什麼？"] }
  };

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

    var bgl = parsed.bg
      ? '<a href="' + parsed.bg + '" target="_blank" rel="noopener" title="Open in BibleGateway" style="font-size:0.75rem;color:#6366f1;font-weight:500;text-decoration:none;display:inline-flex;align-items:center;gap:3px;margin-top:2px;">↗ BibleGateway</a>'
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
