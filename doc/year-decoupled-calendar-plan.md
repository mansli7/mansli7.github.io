## Plan: Year-Decoupled Calendar + SQ Mapping

Adopt a two-layer model: (1) year-specific calendar date map, (2) year-independent study-question map keyed by reading code. Keep current URLs working, add 2027 with minimal duplication now, then perform a small refactor so future years only require changing one map file.

**Steps**
1. Phase 1 (2027 readiness, low risk): Create 2027 calendar artifacts by reusing the same reading sequence/codes and shifting dates to 2027. *independent of SQ content updates*
2. Add `reading-plan-2027.js` with the 2027 date->code map while preserving shared code-key space (`Ge1-4`, `Ps1-8`, etc.). *blocks step 4*
3. Add `2027-calendar.md` cloned from 2026 and replace hardcoded year checks (`now.getFullYear()===2026`, weekday calculations, review-day boundaries) with `2027`. *blocks step 4*
4. Add `2027-en.md` and `2027-zh.md` annual table pages and ensure enhancement script runs for both 2026/2027 paths. *depends on 2 and 3*
5. Update nav/index/download links to expose 2027 pages while keeping 2026 as archive. *parallel with step 4*
6. Phase 2 (small refactor for future years): Introduce a year-parameterized loader pattern in layout and tools so next year only needs a new map file (or one generated JSON map).
7. In `_layouts/default.html`, replace `/2026-/` path checks with dynamic year extraction from pathname (`/(\d{4})-/`) and load the matching yearly plan script.
8. In calendar page script, move `YEAR` to a single constant and derive month/day boundaries from that constant instead of hardcoding checks.
9. Update tool scripts (`generate_hq.js`, `save_daily_prompts.js`) to accept `--year` and resolve `reading-plan-${year}.js` dynamically. Keep default `2026` for backward compatibility.
10. Phase 3 (ongoing content): Continue updating SQ content by reading code keys only; do not duplicate SQ by year. Review feedback updates edit only SQ source + generated SQ JSON.

**Relevant files**
- `/Users/simonwork/projects/mansli7.github.io/assets/js/reading-plan-2026.js` — source pattern for year map and shared code metadata (`r`, `n`, `sq`).
- `/Users/simonwork/projects/mansli7.github.io/assets/js/reading-plan-2027.js` — new year map with same code keys.
- `/Users/simonwork/projects/mansli7.github.io/bs/ar/2026-calendar.md` — currently hardcoded year logic to replicate/generalize.
- `/Users/simonwork/projects/mansli7.github.io/bs/ar/2027-calendar.md` — new year calendar page.
- `/Users/simonwork/projects/mansli7.github.io/bs/ar/2026-en.md` and `/Users/simonwork/projects/mansli7.github.io/bs/ar/2026-zh.md` — templates for annual table pages.
- `/Users/simonwork/projects/mansli7.github.io/bs/ar/2027-en.md` and `/Users/simonwork/projects/mansli7.github.io/bs/ar/2027-zh.md` — new annual table pages.
- `/Users/simonwork/projects/mansli7.github.io/_layouts/default.html` — yearly script loading + annual table enhancement detection.
- `/Users/simonwork/projects/mansli7.github.io/_includes/nav.html` — calendar navigation links.
- `/Users/simonwork/projects/mansli7.github.io/index.md` and `/Users/simonwork/projects/mansli7.github.io/downloads/index.md` — landing links mentioning 2026 currently.
- `/Users/simonwork/projects/mansli7.github.io/tools/generate_hq.js` — make `--year` configurable for map source.
- `/Users/simonwork/projects/mansli7.github.io/tools/save_daily_prompts.js` — make `--year` configurable for prompt export windows.

**Verification**
1. Open 2027 calendar page and confirm monthly weekday alignment and review-day behavior around Jan 1 week.
2. Confirm 2027 cards resolve SQ prompts from existing code-keyed data (`getPromptsFor('Ps1-8')`, etc.).
3. Confirm annual table pages for 2027 receive the same SQ enhancement behavior as 2026.
4. Run `node tools/generate_hq.js --year 2027 en psalms` and `zh psalms` after tool refactor; outputs should be non-empty and keyed by `Ps...` codes.
5. Smoke-check old 2026 URLs still work unchanged.

**Decisions**
- Include: Year-decoupling of calendar mapping from SQ content.
- Include: 2027 pages and links while preserving 2026 archive.
- Exclude for now: Full SPA/router redesign; keep current Jekyll page model.
- Exclude for now: Changing SQ key schema (stay code-keyed).

**Further Considerations**
1. URL strategy recommendation: keep both `/bs/ar/2026-calendar` and `/bs/ar/2027-calendar`, and optionally add `/bs/ar/current-calendar` redirect to latest year.
2. Map storage recommendation: short term use `reading-plan-YYYY.js`; medium term move `r` map into `data/reading-plan/YYYY.json` and keep one shared runtime loader.
3. Build automation recommendation: add a script to generate next-year pages/maps from a template to make yearly rollover a ~10 minute task.
