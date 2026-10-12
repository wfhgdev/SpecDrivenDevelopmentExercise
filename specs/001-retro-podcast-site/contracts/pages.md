# Contract: Pages & Navigation

**Feature**: 001-retro-podcast-site | **Date**: 2026-10-12

Interface exposed to users: the site's URL routes and persistent navigation.
Static export — every route is a pre-rendered page; no server endpoints exist.

## Routes

| Route | Page | Required content | Key FRs |
|-------|------|------------------|---------|
| `/` | Landing | Site name, tagline, exactly one featured episode block (label "Featured", title, description, date, duration), CTA to `/episodes` or featured detail; persistent nav | FR-001, FR-002, FR-011 |
| `/episodes` | Episodes | All 20 episodes newest-first; per entry: number, title, short description, date, duration ("TBA" if missing); CTA per entry to detail | FR-001, FR-003, FR-004, FR-005 |
| `/episodes/[slug]` | Episode detail | Episode number, title, long description, date, duration, `PlaceholderPlayer` labeled as non-functional; back-link to `/episodes` | US2-AS3, FR-013 |
| `/about` | About | Podcast story/premise + ≥1 host bio | FR-001, FR-006 |
| `/faq` | FAQ | ≥5 Q&A as native `<details>`; each answer revealed on activation without navigation | FR-001, FR-007, SC-007 |
| unknown | 404 | Retro-styled not-found with link home | housekeeping |

## Global page contract (every route)

- `<html lang="en">`; exactly one `<h1>`; semantic landmarks
  (`header`/`nav`/`main`/`footer`).
- Persistent navigation with links to `/`, `/episodes`, `/about`, `/faq`;
  current page indicated (`aria-current="page"`).
- Consistent 16-bit retro visual identity (FR-008): pixel display font for
  headings/buttons, limited high-contrast palette (WCAG AA verified),
  chunky borders/bevel chrome.
- Usable 320px → desktop with no horizontal page scroll (FR-010); wraps,
  never overflows.
- Core content readable without JS (FAQ via `<details>`; nav via plain links).
- Decorative motion disabled under `prefers-reduced-motion`.

## Behavioral guarantees

- Nav reachability: Episodes in 1 click from `/`, ≤2 clicks from any page
  (SC-001).
- Featured fallback: if `featured` data invalid, `/` shows newest episode
  labeled featured (spec edge case).
- Dataset count: episode count shown/derivable from data length, never a
  hard-coded "20" in UI copy (spec edge case).
- No route requires auth, accounts, or backend services (FR-012).

## Non-goals (this version)

- No audio files, no working player, no RSS endpoint, no sitemap/feed routes
  unless added later as pure static artifacts.
