# Phase 1 Data Model: Retro Podcast Website

**Feature**: 001-retro-podcast-site | **Date**: 2026-10-12

All entities are embedded source data (TypeScript const modules under
`src/content/`) — no persistence layer, no state transitions. Validation
rules derive from spec FRs and edge cases; enforced by types at build time
and unit tests.

## Episode

Represents one podcast episode. Key source of truth: `src/content/episodes.ts`.

| Field | Type | Required | Rules / Notes |
|-------|------|----------|---------------|
| `slug` | string | yes | Unique; kebab-case; used for `/episodes/[slug]` |
| `number` | number (integer) | yes | Unique across dataset; 1–20 expected |
| `title` | string | yes | Non-empty |
| `shortDescription` | string | yes | 1–2 sentence list blurb (FR-004) |
| `description` | string | yes | Longer detail-page copy |
| `publishDate` | ISO date string (`YYYY-MM-DD`) | yes | Sort key with `number` |
| `durationMinutes` | number \| undefined | no | Missing → render "TBA" (edge case) |
| `coverArt` | string (path) \| undefined | no | If present, sized + compressed asset |
| `featured` | boolean | yes (default false) | Exactly ONE episode has `true` |

**Derived (via `src/lib/episodes.ts`, not stored)**:
- `getEpisodesNewestFirst()` — sorted by `number` desc (FR-005)
- `getEpisodeBySlug(slug)` — lookup or `undefined`
- `getFeaturedEpisode()` — the `featured: true` episode; **fallback**: if none
  or invalid reference, return newest episode and page still labels it
  featured (spec edge case)

**Integrity rules (unit-tested)**:
- Exactly 20 episodes (FR-003); if dataset changes, list still renders and
  shows the actual count (edge case → count derived, never hard-coded in UI)
- `slug` and `number` each unique
- `publishDate` parses as valid ISO date

## FaqItem

Key source of truth: `src/content/faq.ts`.

| Field | Type | Required | Rules / Notes |
|-------|------|----------|---------------|
| `id` | string | yes | Unique; kebab-case |
| `question` | string | yes | Non-empty (FR-007) |
| `answer` | string | yes | Non-empty; rendered in `<details>` |
| `order` | number | yes | Ascending display order |

**Integrity rules**: ≥5 items (FR-007); unique `id`s; contiguous or
gap-tolerant `order` (stable sort by `order` asc).

## HostBio

Key source of truth: `src/content/about.ts`.

| Field | Type | Required | Rules / Notes |
|-------|------|----------|---------------|
| `id` | string | yes | Unique |
| `name` | string | yes | Non-empty |
| `role` | string | yes | e.g., "Host & Producer" |
| `bio` | string | yes | Short paragraph |

**Integrity rules**: ≥1 host (FR-006).

## SiteContent

Podcast-level identity. Key source of truth: `src/content/site.ts`.

| Field | Type | Required | Rules / Notes |
|-------|------|----------|---------------|
| `name` | string | yes | Podcast name; used in `<title>`, header, hero |
| `tagline` | string | yes | Short hero tagline (FR-002) |
| `story` | string | yes | About-page premise (FR-006) |

## Relationships

```text
SiteContent 1 ─── (no direct FK; featured resolved via Episode.featured flag)
HostBio    * ─── about page (embedded in about.ts alongside story)
Episode    20 ── episodes list; 1 featured on landing; 20 detail routes
FaqItem    * ── faq page
```

No cross-file foreign keys — `featured` is a flag on Episode; SiteContent
holds identity copy only. This keeps content modules independently editable.

## Explicit non-entities

- **Playback/progress state**: out of scope (placeholder player, FR-013).
- **User accounts, subscriptions, comments**: excluded by spec FR-012.
- **RSS/feed models**: prohibited (FR-003).
