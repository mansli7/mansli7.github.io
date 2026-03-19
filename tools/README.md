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

Additional flags (per-day generation)
- `--code, -c <code>` — request a specific reading code (e.g. `Ge1-4` or `genesis1-4`).
- `--date, -d <YYYY-MM-DD>` — lookup the calendar for that date and emit that day’s readings.
- `--lang, -l <en|zh>` — return only the requested language.
- `--write, -w` — write per-day files when using `--date`. Writes `<date>.en.json` and `<date>.zh.json` into `--out-dir` (default `mansli7.github.io/tmp`).
- `--out-dir, -o <path>` — destination directory for `--write`.
- `--silent, -s` — suppress stderr/info messages so stdout is pure JSON.

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

- Edit the source markdown(s): add or update sections under `bs/sq/en/<slug>.md` and/or `bs/sq/zh/<slug>.md`.
	- Each section heading must start with the book name (e.g. "1 Samuel 1–4") and sections are separated by a line containing only `---`.

- Generate per-book JSON (example for 1 Samuel):

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
