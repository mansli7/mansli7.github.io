# Operations Procedures

This document defines repeatable procedures for:
1. Yearly calendar rollover (same reading sequence/codes, different year date mapping)
2. Adding or updating study questions for a book from an uploaded txt file

## A. Yearly Procedure (e.g., 2027, 2028)

Assumption:
- Reading sequence and code keys stay the same (`Ge1-4`, `Ps1-8`, ...)
- Only calendar dates move for the new year
- Study questions remain year-independent

### A1. Input files

Prepare two Excel files with the same format as:
- `tmp/2026 Bible Reading Plan.xlsx`
- `tmp/2026 讀經計畫日曆 .xlsx`

### A2. Generate the new yearly map

Current repository is still centered on `assets/js/reading-plan-2026.js`.
For each new year:
1. Create `assets/js/reading-plan-YYYY.js`
2. Keep `n`, `sq`, and related shared code metadata unchanged
3. Update the date-to-code map `r` for the new year

Note:
- This is the only year-dependent data layer we should update yearly.

### A3. Create yearly pages

Create from 2026 templates:
- `bs/ar/YYYY-calendar.md`
- `bs/ar/YYYY-en.md`
- `bs/ar/YYYY-zh.md`

Update year constants/labels in those files.

### A4. Update links/navigation

Update references from 2026-only to include new year pages:
- `_includes/nav.html`
- `index.md`
- `downloads/index.md`
- `bs/sq/index.md` (calendar CTA)

### A5. Validate

1. Open `bs/ar/YYYY-calendar` and verify weekdays and month navigation
2. Confirm cards still load prompts via `getPromptsFor(code)`
3. Confirm annual table pages (`YYYY-en`, `YYYY-zh`) resolve SQ links correctly

### A6. Publish checklist

1. `git status --short`
2. Preview locally
3. Commit with message example:
   - `feat(calendar): add YYYY reading plan pages and mapping`
4. Push to `main`

## B. Procedure: Add New Study Questions for a Book

Assumption:
- You upload a source file in the same format as `tmp/19_psm-all.txt`

### B1. Source format expectations

The txt file should contain alternating language sections separated by long hyphen divider lines.
Each section starts with a heading containing a chapter range, followed by question lines.

### B2. Automation script

Use:
- `tools/generate_hq.js` import mode

This mode can:
1. Parse uploaded txt
2. Generate markdown files:
   - `bs/sq/en/<book>.md`
   - `bs/sq/zh/<book>.md`
3. Optionally regenerate JSON:
   - `data/bs-sq/en/<book>.json`
   - `data/bs-sq/zh/<book>.json`

### B3. Commands

Preview only:

```bash
node tools/generate_hq.js --import-file tmp/19_psm-all.txt --book psalms
```

Write markdown files:

```bash
node tools/generate_hq.js --import-file tmp/19_psm-all.txt --book psalms --write-md
```

Write markdown + regenerate JSON:

```bash
node tools/generate_hq.js --import-file tmp/19_psm-all.txt --book psalms --write-md --write
```

### B4. Validate after import

1. Open:
   - `bs/sq/en/<book>.md`
   - `bs/sq/zh/<book>.md`
2. Confirm JSON exists and is non-empty:

```bash
wc -c data/bs-sq/en/<book>.json data/bs-sq/zh/<book>.json
```

3. Open calendar page and verify prompts for a code in that book.

### B5. Feedback updates (year-independent)

When feedback arrives:
1. Edit source markdown in `bs/sq/en` and `bs/sq/zh`
2. Regenerate JSON with `tools/generate_hq.js` (normal mode) or `tools/generate_hq.js --import-file ... --write-md --write`
3. No year-specific duplication is required

## C. Files commonly updated each year

- `assets/js/reading-plan-YYYY.js` (new)
- `bs/ar/YYYY-calendar.md` (new)
- `bs/ar/YYYY-en.md` (new)
- `bs/ar/YYYY-zh.md` (new)
- Navigation and landing links:
  - `_includes/nav.html`
  - `index.md`
  - `downloads/index.md`
  - `bs/sq/index.md`

## D. Recommended next improvement

Parameterize tool scripts with `--year` to avoid hardcoded `reading-plan-2026.js` references in utility scripts.
