# Tasks: Retro Podcast Website

**Input**: Design documents from `/specs/001-retro-podcast-site/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/](./contracts/), [quickstart.md](./quickstart.md)

**Tests**: Included — the approved plan and quickstart mandate Vitest (data invariants) and Playwright (E2E incl. axe-core); tasks below wire those in per story.

**Organization**: Tasks are grouped by user story so each story can be implemented, tested, and demonstrated independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Single Next.js static-export app at repository root: `src/`, `tests/` per [plan.md](./plan.md) structure.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure for a Next.js static-export app

- [X] T001 Initialize Next.js 15 + TypeScript project at repository root per plan.md: `package.json`, `next.config.ts` with `output: 'export'`, `tsconfig.json`, `src/` directory skeleton matching the plan's Source Code tree
- [X] T002 [P] Configure ESLint + Prettier for the repo (`.eslintrc`/`eslint.config.*`, `.prettierrc`) with scripts `lint` and `format` in `package.json`
- [X] T003 [P] Configure Vitest (`vitest.config.ts`) and Playwright (`playwright.config.ts` for local static preview + axe-core devDependency) with npm scripts `test:unit` and `test:e2e` per quickstart.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Content types, mock data, accessors, and the global retro shell that EVERY page depends on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Create podcast identity content module `src/content/site.ts` exporting `SiteContent` per contracts/data-schema.md: non-empty `name`, `tagline`, `story` (invented placeholder copy acceptable per spec Assumptions)
- [X] T005 [P] Create mocked episodes module `src/content/episodes.ts` exporting `Episode[]` per contracts/data-schema.md with EXACTLY 20 episodes: unique kebab-case `slug`, unique integer `number`, non-empty `title`/`shortDescription`/`description`, ISO `publishDate` (`YYYY-MM-DD`), optional `durationMinutes` (leave undefined on at least one episode), optional `coverArt`, exactly ONE episode with `featured: true`
- [X] T006 Create episode accessors `src/lib/episodes.ts` implementing INV-8 `getEpisodesNewestFirst()` (sort by `number` descending) and INV-9 `getFeaturedEpisode()` that NEVER returns undefined (fallback: newest episode) per contracts/data-schema.md (depends: T005)
- [X] T007 [P] Build global retro shell: root layout `src/app/layout.tsx` (html `lang="en"`, semantic `SiteHeader`/`SiteFooter`, one slot for page `h1`), components `src/components/SiteHeader.tsx` (persistent nav links to `/`, `/episodes`, `/about`, `/faq` with `aria-current="page"`) and `src/components/SiteFooter.tsx`
- [X] T008 [P] Create retro design system foundation `src/styles/globals.css` + font setup per research.md R3: CSS custom-property palette (WCAG AA-verified pairings), reset, fluid `clamp()` type scale, self-hosted SUBSET pixel display font in `src/styles/fonts/` with `font-display: swap`, system monospace body stack, scanline/bevel token classes with `prefers-reduced-motion` disabling decoration
- [X] T009 Write unit tests `tests/unit/episodes-data.test.ts` enforcing INV-1..INV-7 and accessors INV-8..INV-9 per contracts/data-schema.md (depends: T005, T006)

**Checkpoint**: Foundation ready — `npm run build` emits static shell; unit tests green; user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Landing Page with Featured Episode (Priority: P1) 🎯 MVP

**Goal**: Visitor sees podcast identity + one clearly-labeled featured episode with CTA, and can navigate to all four pages

**Independent Test**: Open `/` — podcast name, tagline, and one block labeled "Featured" (title, description, date, duration, CTA) visible; header nav reaches all pages

### Implementation for User Story 1

- [X] T010 [P] [US1] Create shared retro primitives `src/components/PixelHeading.tsx` and `src/components/RetroButton.tsx` (arcade-style link/button, chunky border + hard-shadow, keyboard-focusable) per research.md R3
- [X] T011 [US1] Create `src/components/FeaturedEpisode.tsx` consuming `getFeaturedEpisode()`: "Featured Episode" badge (FR-011), title, description, date, duration ("TBA" if `durationMinutes` undefined), CTA to `/episodes` or the featured detail route (depends: T006, T010)
- [X] T012 [US1] Implement landing page `src/app/page.tsx`: hero with `SiteContent.name` + `tagline` (FR-002) and `FeaturedEpisode` block; essential hero content visible without scroll; exactly one `<h1>` (depends: T004, T011)
- [X] T013 [US1] Add E2E test `tests/e2e/landing.spec.ts`: `/` loads, shows name/tagline, exactly one "Featured" labeled block with CTA, header nav reaches all four routes (SC-001, SC-003 structure) (depends: T012)

**Checkpoint**: User Story 1 fully functional and testable independently — deployable MVP

---

## Phase 4: User Story 2 - Episodes Page with 20 Episodes (Priority: P2)

**Goal**: Visitor browses all 20 mocked episodes newest-first with full metadata and can open a detail page with clearly-labeled placeholder audio

**Independent Test**: Open `/episodes` — 20 entries with number/title/short description/date/duration, newest first; open any entry — detail page with long description and "coming soon" placeholder player

### Implementation for User Story 2

- [ ] T014 [P] [US2] Create `src/components/EpisodeCard.tsx` rendering number, title, shortDescription, publishDate, duration ("TBA" when `durationMinutes` undefined — never blank or 0) with link to `/episodes/[slug]` per data-model.md consumer rules
- [ ] T015 [US2] Implement episodes list page `src/app/episodes/page.tsx`: renders `getEpisodesNewestFirst()` (FR-005), derives displayed count from `episodes.length` — never hard-code "20" in UI copy (edge case) (depends: T006, T014)
- [ ] T016 [US2] Create `src/components/PlaceholderPlayer.tsx`: disabled, `aria-disabled="labeled"` control with visible "AUDIO COMING SOON" messaging — must read as intentional, not broken (FR-013)
- [ ] T017 [US2] Implement episode detail route `src/app/episodes/[slug]/page.tsx` with `generateStaticParams()` over all 20 slugs: number, title, long description, date, duration, `PlaceholderPlayer`, back-link to `/episodes` (depends: T006, T016)
- [ ] T018 [US2] Add E2E test `tests/e2e/episodes.spec.ts`: `/episodes` renders 20 entries with complete metadata (SC-004), newest-first order, each links to a working detail page, placeholder player visibly labeled (depends: T015, T017)

**Checkpoint**: Stories 1 and 2 both work independently

---

## Phase 5: User Story 3 - Retro 16-Bit Gaming Look and Feel (Priority: P2)

**Goal**: Every page unmistakably reads as 16-bit retro gaming while staying WCAG AA, keyboard-usable, and responsive 320px→desktop

**Independent Test**: Unprompted viewers say "retro/16-bit" (SC-006 script in quickstart); axe reports zero critical issues; 320px viewport has no horizontal scroll

### Implementation for User Story 3

- [ ] T019 [US3] Apply full retro chrome pass across components: chunky borders, stepped bevel shadows, arcade badge/button motifs, scanline page overlay honoring `prefers-reduced-motion` (research.md R3) in `src/styles/globals.css` and affected components (depends: T008)
- [ ] T020 [US3] Run WCAG AA contrast audit on every text/background/badge pairing; adjust palette tokens in `src/styles/globals.css` until all pairings pass (FR-009) (depends: T019)
- [ ] T021 [US3] Add E2E test `tests/e2e/a11y-responsive.spec.ts`: axe-core zero critical/serious per page (SC-005), 320px no horizontal scroll on all pages (FR-010), keyboard tab reaches nav/CTAs (depends: T019)

**Checkpoint**: Visual identity verified across all built pages

---

## Phase 6: User Story 4 - About Page (Priority: P3)

**Goal**: Visitor reads podcast premise and host bio(s) in the retro style

**Independent Test**: Open `/about` — story/premise plus ≥1 host bio visible, styled consistently

### Implementation for User Story 4

- [ ] T022 [P] [US4] Create `src/content/about.ts` per contracts/data-schema.md: `AboutContent` with ≥1 `HostBio` (non-empty `id`, `name`, `role`, `bio`) and podcast `story` (from `SiteContent` or duplicated per plan — keep single source in `site.ts` if simpler) (depends: T004)
- [ ] T023 [US4] Implement about page `src/app/about/page.tsx`: premise/story + host bio section(s) (FR-006), retro styling (depends: T022)

**Checkpoint**: About page independently functional

---

## Phase 7: User Story 5 - FAQ Page (Priority: P3)

**Goal**: Visitor gets answers to ≥5 common questions in place, without JS and without leaving the page

**Independent Test**: Open `/faq` — ≥5 questions; activating each reveals its answer on the same page; answers readable with JS disabled

### Implementation for User Story 5

- [ ] T024 [P] [US5] Create `src/content/faq.ts` per contracts/data-schema.md: ≥5 `FaqItem`s (unique kebab-case `id`, non-empty `question`/`answer`, ascending `order`)
- [ ] T025 [US5] Implement FAQ page `src/app/faq/page.tsx` using native `<details>`/`<summary>` styled as retro panels (research.md R5): answer revealed on activation without navigation (FR-007, SC-007), readable with interactive enhancements unavailable (depends: T024)
- [ ] T026 [US5] Add E2E test `tests/e2e/faq.spec.ts`: ≥5 questions listed, activating each reveals its answer in place, and a JS-disabled context still exposes answer text (SC-007) (depends: T025)

**Checkpoint**: All five user stories independently functional

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements and verification that affect multiple user stories

- [ ] T027 [P] Create retro-styled 404 page `src/app/not-found.tsx` with link back to `/` (per contracts/pages.md)
- [ ] T028 [P] Performance pass per quickstart.md §6 and Constitution III: subset pixel font only, compress + size all images, lazy-load below-fold images, confirm initial page weight ≤ 500 KB compressed and no render-blocking third-party resources
- [ ] T029 Run full quickstart.md validation end-to-end: `npm run build`, `npm run test:unit`, `npm run test:e2e`, manual desktop/320px browser check, reduced-motion check, broken-link spot check; fix regressions in place
- [ ] T030 [P] Document run/build/test commands in `README.md` (install, dev, build, test:unit, test:e2e) so quickstart.md steps are reproducible by any contributor

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Foundational — MVP
- **US2 (Phase 4)**: Depends on Foundational — independent of US1
- **US3 (Phase 5)**: Depends on Foundational — verify against whatever pages exist; best after US1+US2 pages exist, can polish shell anytime
- **US4 (Phase 6)**: Depends on Foundational (needs global shell/design system) — independent of US1/US2/US3
- **US5 (Phase 7)**: Depends on Foundational — independent of other stories
- **Polish (Phase 8)**: Depends on all desired stories complete

### User Story Dependencies

- **US1 (P1)**: Foundational only
- **US2 (P2)**: Foundational only (shares accessors with US1, no code coupling)
- **US3 (P2)**: Foundational shell; needs at least one page to audit — coordinate with US1/US2 progress
- **US4 (P3)**: Foundational only
- **US5 (P3)**: Foundational only

### Within Each User Story

- Components before pages; content modules before consumers; implementation before its E2E test

### Parallel Opportunities

- Setup: T002 ∥ T003 (and T001 first)
- Foundational: T005 ∥ T004 ∥ T007 ∥ T008; then T006 and T009
- US1: T010 standalone, then T011 → T012 → T013
- US2: T014 ∥ T016, then T015/T017 → T018
- US4 ∥ US5 ∥ US2 can run simultaneously after Foundational (different files)
- Polish: T027 ∥ T030; T028 and T029 after pages exist

---

## Parallel Example: User Story 2

```bash
# Launch independent component tasks together:
Task: "Create src/components/EpisodeCard.tsx (US2)"
Task: "Create src/components/PlaceholderPlayer.tsx (US2)"

# After both land, sequential page wiring:
Task: "Implement src/app/episodes/page.tsx (depends: accessors + EpisodeCard)"
Task: "Implement src/app/episodes/[slug]/page.tsx (depends: accessors + PlaceholderPlayer)"

# Then E2E:
Task: "tests/e2e/episodes.spec.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1 Setup → Phase 2 Foundational
2. Phase 3 (US1) → validate independently via T013 + manual `/` check
3. **STOP**: demo the retro landing page with featured episode

### Incremental Delivery

1. Setup + Foundational → static shell builds
2. US1 → landing MVP deployable
3. US2 → full catalog + detail pages
4. US3 → retro identity hardening + a11y/responsive gates green
5. US4, US5 (parallel-safe) → About + FAQ
6. Polish → quickstart.md full pass, ship

### Parallel Team Strategy

1. Team completes Setup + Foundational together
2. Then: Dev A US1, Dev B US2, Dev C US4+US5; US3 polish follows pages
3. Merge order respects shared-file caution: `globals.css` tokens owned by Foundational/US3 only

---

## Notes

- [P] tasks touch different files with no dependencies on incomplete tasks
- Each user story maps to spec.md priorities (US1=P1 … US5=P3) for traceability
- Commit after each task or logical group; stop at any checkpoint to validate a story independently
- Constitution gates: every change must keep `next build` static-export green, ≤500 KB budget, WCAG AA, no secrets
