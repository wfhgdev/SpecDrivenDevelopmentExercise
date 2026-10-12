# Contract: Embedded Content Data Schema

**Feature**: 001-retro-podcast-site | **Date**: 2026-10-12

Interface between content modules (`src/content/*`) and the UI layer.
Types are the normative contract; unit tests in `tests/unit/` enforce the
invariants below at build/CI time. See [data-model.md](../data-model.md)
for field rationale.

## TypeScript shapes (normative)

```ts
// src/content/episodes.ts
export interface Episode {
  slug: string;               // unique, kebab-case
  number: number;             // unique integer
  title: string;              // non-empty
  shortDescription: string;   // non-empty
  description: string;        // non-empty
  publishDate: string;        // ISO YYYY-MM-DD
  durationMinutes?: number;   // optional → UI shows "TBA"
  coverArt?: string;          // optional repo-relative asset path
  featured: boolean;          // exactly one true across dataset
}

// src/content/faq.ts
export interface FaqItem {
  id: string;                 // unique, kebab-case
  question: string;           // non-empty
  answer: string;             // non-empty
  order: number;              // ascending display order
}

// src/content/about.ts
export interface HostBio {
  id: string;                 // unique
  name: string;               // non-empty
  role: string;               // non-empty
  bio: string;                // non-empty
}

export interface AboutContent {
  hosts: HostBio[];           // length >= 1
}

// src/content/site.ts
export interface SiteContent {
  name: string;               // non-empty
  tagline: string;            // non-empty
  story: string;              // non-empty
}
```

## Invariants (unit-test enforced)

| ID | Invariant |
|----|-----------|
| INV-1 | `episodes.length === 20` (FR-003) |
| INV-2 | All `slug` values unique |
| INV-3 | All `number` values unique |
| INV-4 | All `publishDate` values parse as ISO dates |
| INV-5 | Exactly one episode with `featured === true` |
| INV-6 | `faq.length >= 5`; all `id` unique |
| INV-7 | `about.hosts.length >= 1`; all `id` unique |
| INV-8 | Accessor `getEpisodesNewestFirst()` returns `number` descending |
| INV-9 | Accessor `getFeaturedEpisode()` never returns `undefined` (falls back to newest) |

## Consumer rules

- UI reads content **only** through `src/lib/episodes.ts` accessors or direct
  typed imports of `content` modules — never untyped fetches.
- UI MUST derive counts from `episodes.length` (no hard-coded 20 in copy).
- Missing `durationMinutes` renders "TBA" — never blank, never `0`.
- No runtime network calls to obtain any entity in this contract.
