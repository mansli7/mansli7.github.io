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
