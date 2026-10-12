# Quickstart Validation: Retro Podcast Website

**Feature**: 001-retro-podcast-site | **Date**: 2026-10-12

Run-book proving the feature works end-to-end. Implementation details live
in [plan.md](./plan.md), [contracts/](./contracts/), and
[data-model.md](./data-model.md); `tasks.md` (next phase) holds the build steps.

## Prerequisites

- Node.js 20+ and npm installed
- Repo checked out; dependencies installed (`npm install`)
- Ports free for local static preview (default 3000)

## 1. Build (Constitution: single-command static build)

```bash
npm run build
```

**Expected**: build succeeds with no errors; a static output directory is
emitted containing pre-rendered `/`, `/episodes`, `/episodes/<20 slugs>`,
`/about`, `/faq`, and a 404 page. No server runtime in output.

## 2. Unit tests (data integrity)

```bash
npm run test:unit
```

**Expected**: all pass — verifies invariants INV-1..INV-9 from
[contracts/data-schema.md](./contracts/data-schema.md): 20 episodes, unique
slugs/numbers, valid dates, exactly one featured, ≥5 FAQ, ≥1 host,
newest-first sort, featured fallback.

## 3. E2E smoke (Playwright)

```bash
npm run test:e2e
```

**Expected**: all pass —
- 4 pages load; header nav reaches Home/Episodes/About/FAQ (SC-001)
- Episodes page renders 20 entries with full metadata (SC-004)
- Landing shows one block labeled "Featured" with CTA (SC-003 structure)
- 320px viewport: no horizontal scrollbar on any page (SC-005/FR-010)
- FAQ: activating each question reveals its answer in place (SC-007)
- Keyboard: tab order reaches nav, CTAs, and FAQ summaries
- axe-core: zero critical/serious issues per page (SC-005)
- JS disabled (optional project): FAQ answers still present/readable

## 4. Manual browser verification (Constitution: desktop + mobile widths)

Serve the static output and check in browser (e.g. `npx serve out` or
`next dev` for iteration):

- [ ] Desktop (~1280px) and mobile (~375px and 320px): no overlap, no
      horizontal scroll, nav wraps cleanly
- [ ] Placeholder player visibly reads as "coming soon" — never looks broken (FR-013)
- [ ] `prefers-reduced-motion`: scanline/blink decorations off
- [ ] Links and images: no broken references on touched pages
- [ ] Contrast spot-check: body text, buttons, badges pass WCAG AA
      (eyeball + axe result)

## 5. Launch-time impression test (SC-006, human eval)

Show the home page to 5 people without priming them. **Pass** if ≥4 of 5
spontaneously say "retro", "16-bit", or "arcade/gaming" style.

## 6. Performance sanity (SC-002 / Constitution III)

- Throttle to mid-tier mobile in devtools; confirm pages visually ready < 2s
- Confirm initial page weight ≤ 500 KB compressed (exclude user-requested
  media): check transfer sizes in devtools network panel, or size the
  exported static assets for first load

## Done when

All steps above pass; failures route back to implementation before
`/speckit.tasks` completion sign-off.
