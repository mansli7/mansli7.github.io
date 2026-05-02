# generate_hq.js — Study Question Extractor

Purpose
- Extract study-question prompts from `bs/sq/{en,zh}/*.md` into JSON consumable by the site client.

Quick usage (from workspace root):

- Print full extracted JSON (all available readings):

```bash
node mansli7.github.io/tools/generate_hq.js
```

- Generate prompts for a single book (English) and a chapter range:

```bash
node mansli7.github.io/tools/generate_hq.js en genesis 1-4
```

- Chinese example:

```bash
node mansli7.github.io/tools/generate_hq.js zh exodus 5-8
```

Notes
- The script reads `r`, `n`, and `sq` variables from `assets/js/reading-plan-2026.js` to map calendar codes to book abbreviations.
- Output is JSON keyed by calendar codes such as `Ge1-4` or `2Ki1-4`.
- The CLI accepts optional args: `[lang] [book] [chapters]` where `lang` is `en` or `zh`, `book` may be an abbreviation (`Ge`) or a slug/name (`genesis` or `創世記`), and `chapters` accepts ranges like `1-4`.

Additional flags
- `--code, -c <code>` — request a specific reading code (e.g. `Ge1-4` or `genesis1-4`).
- `--date, -d <YYYY-MM-DD>` — lookup the calendar for that date and emit that day’s readings.
- `--lang, -l <en|zh>` — return only the requested language.
- `--write, -w` — write per-day files when using `--date`; in import mode this also regenerates `data/bs-sq/{en,zh}/<book>.json`.
- `--out-dir, -o <path>` — destination directory for `--write` in per-day mode.
- `--silent, -s` — suppress stderr/info messages so stdout is pure JSON.
- `--import-file, --input, -i <path>` — import study txt (same format as `tmp/19_psm-all.txt`).
- `--book, -b <slug>` — book slug for import mode (for example `psalms`, `1-samuel`).
- `--write-md` — in import mode, write `bs/sq/en|zh/<book>.md`.

Scripting tips
- For automated workflows where you want only the JSON on stdout (no debug), pipe stderr away:

```bash
node mansli7.github.io/tools/generate_hq.js en genesis 1-4 2>/dev/null
```

- The site client prefers per-book JSON under `data/bs-sq/{lang}/{slug}.json`. Use the CLI to generate per-book JSON and save it there when preparing a deploy (example):

```bash
node mansli7.github.io/tools/generate_hq.js en genesis 1-4 > mansli7.github.io/data/bs-sq/en/genesis.json 2>/dev/null
```

If you want help adding a `--write` or `--silent` flag to the script (to write files or suppress stderr programmatically), I can add that change.

Adding or updating study questions
---------------------------------
Follow these steps to add or update study questions for a book and make them available to the live site:

Option A: import from uploaded txt (same format as `tmp/19_psm-all.txt`)

```bash
node mansli7.github.io/tools/generate_hq.js --import-file mansli7.github.io/tmp/19_psm-all.txt --book psalms --write-md --write
```

Option B: manual markdown edits under `bs/sq/en/<slug>.md` and `bs/sq/zh/<slug>.md`

- Each section heading must start with the book name (e.g. "1 Samuel 1–4") and sections are separated by a line containing only `---`.
- Then generate per-book JSON (example for 1 Samuel):

```bash
node mansli7.github.io/tools/generate_hq.js en 1-samuel > mansli7.github.io/data/bs-sq/en/1-samuel.json 2>/dev/null
node mansli7.github.io/tools/generate_hq.js zh 1-samuel > mansli7.github.io/data/bs-sq/zh/1-samuel.json 2>/dev/null
```

- Quick full-book export (all readings):

```bash
node mansli7.github.io/tools/generate_hq.js > all_readings.json
```

- Verify locally before committing:
	- Serve the site locally: `python3 -m http.server 8000 --directory mansli7.github.io`
	- Confirm JSON is served: `curl -s -I http://localhost:8000/data/bs-sq/en/1-samuel.json`
	- Use the browser Console on `http://localhost:8000` to check runtime loading:

```javascript
(async ()=>{
	await window.Mansli7Reading2026.fetchHqBook('1Sa');
	console.log('hq keys:', Object.keys(window.Mansli7Reading2026.hq||{}).filter(k=>k.indexOf('1Sa')===0));
	console.log('1Sa1-4 prompts:', await window.Mansli7Reading2026.getPromptsFor('1Sa1-4'));
})();
```

- Commit and push the generated JSON files (and the updated source `.md` files):

```bash
cd mansli7.github.io
git add data/bs-sq/en/1-samuel.json data/bs-sq/zh/1-samuel.json bs/sq/en/1-samuel.md bs/sq/zh/1-samuel.md
git commit -m "chore(data): add/update 1 Samuel study questions"
git push origin main
```

- Verify on GitHub Pages:
	- Open `https://<your-username>.github.io/data/bs-sq/en/1-samuel.json` to confirm HTTP 200.
	- Open the calendar page and use DevTools Console to run the same `fetchHqBook`/`getPromptsFor` snippet against the live site.

Notes and troubleshooting
- The extractor reads the `r`, `n`, and `sq` mappings from `assets/js/reading-plan-2026.js`. If you change book abbreviations or slugs, update that file accordingly.
- If a date is a "Review" day (code `Review`) the calendar intentionally hides the question panel — no action required for those dates.
- If you want the CLI to write per-book files directly, I can add a `--write-book` flag to automate saving outputs into `mansli7.github.io/data/bs-sq/{lang}/{slug}.json`.


in index.md of mansli7.github.io, how does it load the study question of today?

 In index.md, todayRef is only the DOM element that shows the reading label on the home page, like “2 Kings 13–16 — Study Questions”. It does not fetch the study questions itself. You can see that placeholder at index.md:36 and the separate note/action containers at index.md:38 and index.md:39.

The actual loading happens in the homepage script inside default.html:351. The flow is:

It gets today’s date and maps it to a reading code from window.Mansli7Reading2026.r, for example on 2026-04-07 that is 2Ki13-16, from reading-plan-2026.js:3.
It parses that code with parse(code) and writes the title text into todayRef and todayRefZh in default.html:384.
If study questions are available, it loads the actual prompt list and renders it into todayNote, not todayRef, in default.html:407.
It also creates the BibleGateway button inside todayActions in default.html:392.
The prompt source is window.Mansli7Reading2026.getPromptsFor(code) from reading-plan-2026.js:233. That function tries, in order:

Already-loaded in-memory prompt data in window.Mansli7Reading2026.hq.
Per-book JSON files under data/bs-sq/{lang}/{slug}.json via fetchHqBook, in reading-plan-2026.js:277.
Fallback extraction from the book study-question pages under bs/sq/{lang}/{slug} via fetchSqPrompts, in reading-plan-2026.js:88.
So the short answer is: todayRef displays the heading, but today’s study questions are loaded by the homepage script and inserted into todayNote.