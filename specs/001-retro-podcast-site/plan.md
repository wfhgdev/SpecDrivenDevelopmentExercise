# Implementation Plan: Retro Podcast Website

**Branch**: `001-retro-podcast-site` | **Date**: 2026-10-12 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-retro-podcast-site/spec.md`

## Summary

Build a four-page static podcast website (Landing, Episodes, About, FAQ) with a
distinctive 16-bit retro gaming aesthetic, backed by 20 mocked episodes embedded
in the codebase. Per user direction: **Next.js with static site configuration**
(`output: 'export'`), no databases, no backend — all data embedded as source
content. Responsive from 320px up. Audio playback is a labeled placeholder.

## Technical Context

**Language/Version**: TypeScript 5.x (strict), Node.js 20+

**Primary Dependencies**: Next.js 15.x (App Router, static export only);
React 19.x. No other runtime dependencies without justification (Constitution V).

**Storage**: N/A — no database; episodes, FAQ, host bios embedded as typed
source data modules in the repository

**Testing**: Vitest (unit: data integrity, helpers) + Playwright (E2E: page
smoke, 20-episode count, responsive 320px, keyboard navigation) + axe-core
via Playwright for accessibility checks

**Target Platform**: Evergreen desktop & mobile browsers; deployable to any
static host (output of `next build` is a plain static directory)

**Project Type**: web (static site)

**Performance Goals**: All four pages visually ready < 2s on mid-tier mobile;
initial page weight ≤ 500 KB compressed (Constitution III) — pixel display
font must be subset and self-hosted, images compressed and sized

**Constraints**: WCAG AA contrast & keyboard navigability (Constitution IV);
zero runtime secrets (Constitution II); no server runtime in shipped output
(Constitution I); no horizontal scroll at 320px; `prefers-reduced-motion`
honored

**Scale/Scope**: 4 pages, 20 episodes, ≥5 FAQ items, 1–2 host bios; mock
content in English; single anonymous visitor type

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| # | Gate | Status | Notes |
|---|------|--------|-------|
| I | Static-First Delivery | PASS | `output: 'export'` produces pure static files; no server runtime, no per-request logic; FAQ accordion via native `<details>`/`<summary>` keeps content readable without JS |
| II | Zero Runtime Secrets | PASS | No keys/tokens needed; no external authenticated services; fonts self-hosted (no third-party font CDN by default) |
| III | Performance Budget (≤500 KB compressed, no render-blocking 3rd-party) | PASS (with plan) | Self-hosted subset pixel font for headings only; body uses system/monospace stack; all images sized + compressed + lazy below fold; no third-party scripts |
| IV | Accessibility Baseline | PASS (with plan) | Semantic HTML, one `h1`/page, `lang`, alt text, keyboard reach; retro palette MUST be contrast-checked (WCAG AA) before adoption; reduced-motion honored |
| V | Simplicity (YAGNI) | PASS | Next.js justified by explicit user choice + static export need; no CSS framework, state library, or CMS — plain CSS Modules; no speculative abstractions |
| — | Technical Constraints (single-command build, content changes without backend) | PASS | `npm run build` emits static output; content lives in source data files |
| — | Development Workflow | PASS | Build + lint gates defined; browser verification at desktop + mobile widths in quickstart |

**Gate result**: PASS — no violations; no Complexity Tracking entries required.

## Project Structure

### Documentation (this feature)

```text
specs/001-retro-podcast-site/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   ├── pages.md         # Page/route + navigation contract
│   └── data-schema.md   # Embedded content schema contract
├── checklists/
│   └── requirements.md  # Spec quality checklist
└── tasks.md             # Phase 2 output (/speckit.tasks — NOT created here)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx           # Root layout: html lang, SiteHeader, SiteFooter
│   ├── page.tsx             # Landing (/)
│   ├── episodes/
│   │   ├── page.tsx         # Episodes list (/episodes)
│   │   └── [slug]/
│   │       └── page.tsx     # Episode detail (/episodes/[slug])
│   ├── about/page.tsx       # About (/about)
│   ├── faq/page.tsx         # FAQ (/faq)
│   └── not-found.tsx        # 404 in retro style
├── components/
│   ├── SiteHeader.tsx       # Persistent nav (Home, Episodes, About, FAQ)
│   ├── SiteFooter.tsx
│   ├── EpisodeCard.tsx      # List entry: number, title, date, duration, blurb
│   ├── FeaturedEpisode.tsx  # Landing hero block, "FEATURED" badge
│   ├── RetroButton.tsx      # Arcade-style link/button
│   ├── PixelHeading.tsx
│   └── PlaceholderPlayer.tsx # Clearly-labeled non-functional audio control
├── content/
│   ├── episodes.ts          # 20 mocked episodes (typed)
│   ├── faq.ts               # ≥5 FAQ items
│   ├── about.ts             # Podcast story + host bios
│   └── site.ts              # Podcast name, tagline, featured episode ref
├── styles/
│   ├── globals.css          # Palette tokens, reset, typography
│   └── fonts/               # Self-hosted, subset pixel display font
└── lib/
    └── episodes.ts          # getEpisodes (newest-first), getBySlug, featured

tests/
├── unit/                    # Data integrity (count=20, unique numbers/slugs)
└── e2e/                     # Playwright: pages, nav, 320px, a11y, no-JS FAQ
```

**Structure Decision**: Single Next.js static-export app under `src/` with
App Router. Content separated into `src/content/` data modules so episode
copy can change without touching components (Constitution: content changes
without structural change). Episode detail pages generated at build time
from the embedded dataset.

## Complexity Tracking

No constitution violations to justify — table intentionally empty.
