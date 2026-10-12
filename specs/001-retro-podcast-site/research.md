# Phase 0 Research: Retro Podcast Website

**Feature**: 001-retro-podcast-site | **Date**: 2026-10-12

User-supplied technical context resolved this phase: Next.js static export,
no databases, embedded mock data, responsive/mobile-ready. Remaining
decisions below were open; all resolved — no NEEDS CLARIFICATION remain.

## R1. Static generation strategy in Next.js

**Decision**: Next.js App Router with `output: 'export'` in `next.config`.
All four pages are static; episode detail routes generated via
`generateStaticParams()` from the embedded dataset.

**Rationale**: User mandated "Next.js with static site configuration". Static
export satisfies Constitution I (no server runtime in shipped artifact) and
deploy anywhere as plain files. App Router is the current default and supports
static export fully for this scope.

**Alternatives considered**:
- Pages Router: legacy; no benefit for a new 4-page site.
- Incremental server rendering / middleware: violates static export; rejected.
- Plain HTML/CSS/JS (Constitution V default): rejected because user explicitly
  chose Next.js — the dependency is justified by direct requirement, not
  speculation.

## R2. Data embedding pattern for 20 mock episodes

**Decision**: Typed TypeScript modules in `src/content/` exporting plain
const arrays/objects (`episodes.ts`, `faq.ts`, `about.ts`, `site.ts`).
A thin `src/lib/episodes.ts` accessor layer provides sorting (newest-first),
slug lookup, and featured-episode resolution with fallback.

**Rationale**: Satisfies "data is embedded in the content" (user) and
FR-003/FR-012 (no feed, no backend). Type-checked at build time; content
editors change data without touching components. No JSON imports (weaker
typing) and no CMS (out of scope, YAGNI).

**Alternatives considered**:
- Markdown/MDX episodes: better for long-form prose, but adds content-pipeline
  complexity unjustified for 20 fixed mock items.
- JSON files: no compile-time validation of shapes.
- Local JSON-server/API: introduces a runtime service — violates Constitution I.

## R3. Retro visual system (fonts, palette, components)

**Decision**:
- **Display font**: "Press Start 2P" (or equivalent open-licensed pixel
  font), self-hosted, **subset** to A–Z, a–z, 0–9, and basic punctuation,
  used for headings and buttons only. `font-display: swap`.
- **Body font**: system monospace stack (`ui-monospace, SFMono-Regular,
  Menlo, Consolas, monospace`) — zero download cost, retro-terminal feel.
- **Palette**: dark background (deep navy/black), limited 16-color-style
  accents (green, magenta, cyan, yellow), chosen only after automated WCAG AA
  contrast verification for every text/background pairing.
- **Chrome**: 2–4px solid/chunky borders, stepped "bevel" box-shadows,
  scanline overlay as a decorative `background` on the page shell (CSS only,
  disabled under `prefers-reduced-motion`/`prefers-reduced-transparency`).
- **Buttons/links**: `RetroButton` with hard shadow offset (no soft shadows,
  no border-radius beyond 0–2px).

**Rationale**: Addresses SC-006 (unprompted "retro/16-bit" recognition) while
holding Constitution III (font subset keeps weight low) and IV (contrast
gating before palette adoption; reduced-motion honored).

**Alternatives considered**:
- Third-party font CDN (Google Fonts): render-blocking third-party request —
  violates Constitution III; rejected.
- Pixel font for all text incl. body: known legibility/AA-contrast problems
  at small sizes; rejected (display-only usage).
- GIF/canvas sprite animations: heavier, motion-sensitivity concerns; CSS-only
  decoration preferred (YAGNI).

## R4. Episode detail pages & placeholder audio

**Decision**: `/episodes/[slug]` static detail route per episode, with longer
description and a `PlaceholderPlayer` component — a disabled, `aria-disabled`
labeled control reading "AUDIO COMING SOON" (or similar), never wired to real
audio. List CTA links to detail page; detail CTA may link back to `/episodes`.

**Rationale**: US2 acceptance scenario 3 explicitly allows fuller detail or
expanded view with clearly-indicated placeholder audio. FR-013 requires the
placeholder be honest, not broken-looking. Build-time generation keeps it
static (Constitution I).

**Alternatives considered**:
- No detail page, expanding accordion on list: weaker "stand-out" feel; detail
  routes cost nothing under static export.
- Real `<audio>` with silent/sample file: implies playback works — violates
  FR-013's "clearly communicated" requirement; rejected for v1.

## R5. FAQ without-JS resilience

**Decision**: Native `<details>`/`<summary>` elements styled as retro panels.
Answers readable in the DOM without JS; no client-side framework code needed
for the accordion behavior.

**Rationale**: Edge case in spec requires core content readable when
interactive enhancements fail. Native elements = zero JS, free keyboard
support, semantic structure (Constitution IV, V).

**Alternatives considered**:
- JS-controlled accordion (state + onClick): fails no-JS edge case; adds code.

## R6. Testing approach

**Decision**:
- **Vitest**: unit tests on `content` + `lib` — exactly 20 episodes, unique
  numbers/slugs, valid ISO dates, exactly one featured flag, newest-first
  sort, ≥5 FAQ items, featured-fallback behavior.
- **Playwright**: E2E smoke for 4 pages + nav reachability (SC-001),
  20-episode render count (SC-004), 320px no-horizontal-scroll (SC-005/FR-010),
  keyboard navigation, FAQ activation (SC-007), and axe-core scan
  (SC-005 zero critical issues). Optional JS-disabled run for FAQ readability.
- **Visual check (manual)**: SC-006 5-person impression test is a launch-time
  human evaluation, scripted in quickstart — not automatable.

**Rationale**: Constitution workflow requires build/lint/browser verification;
tests map directly to success criteria. axe-core integrated in Playwright
keeps a11y gated in CI without new process.

**Alternatives considered**- Lighthouse CI: useful later; not required to satisfy current SCs; YAGNI.
- Jest: heavier with Next+TS; Vitest is leaner and TS-native.

## R7. Responsive strategy

**Decision**: Mobile-first CSS (single-column flow, fluid `clamp()` type
scale, CSS Grid/Flexbox), breakpoints at content-driven widths (~640px,
~1024px). Episode cards and nav wrap rather than overflow; verify at 320px.

**Rationale**: User stated "responsive and ready for mobile"; FR-010 and
SC-005 pin the 320px floor. No JS-based responsive hacks.

**Alternatives considered**: none material — this is the standard approach.
