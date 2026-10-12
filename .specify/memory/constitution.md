<!--
Sync Impact Report
==================
Version change: (unratified template) → 1.0.0
Bump rationale: MINOR-equivalent initial adoption — first ratification of the
  scaffold; no prior principles existed to remove or redefine.
Modified principles:
  - [PRINCIPLE_1_NAME] → I. Static-First Delivery
  - [PRINCIPLE_2_NAME] → II. Zero Runtime Secrets
  - [PRINCIPLE_3_NAME] → III. Performance Budget
  - [PRINCIPLE_4_NAME] → IV. Accessibility Baseline
  - [PRINCIPLE_5_NAME] → V. Simplicity (YAGNI)
Added sections:
  - Technical Constraints
  - Development Workflow
Removed sections: none (scaffold placeholders replaced, headings preserved)
Follow-up TODOs: none — all placeholder tokens resolved.
-->

# mi-podcast Constitution

## Core Principles

### I. Static-First Delivery

All deliverables MUST build to static files (HTML, CSS, JS, assets) servable
from any static host or `file://`-compatible output. No server-side runtime,
database, or per-request logic is permitted in the shipped artifact. Any
dynamic behavior MUST be client-side or delegated to an external service
called at runtime.

Rationale: static output keeps hosting trivial, cheap, and secure by default.

### II. Zero Runtime Secrets

No API keys, tokens, credentials, or private configuration MAY be embedded in
client-shipped code or public configuration files. Anything delivered to the
browser MUST be treated as public. If a capability requires a secret, the
integration MUST be proxied server-side outside this project's scope.

Rationale: static assets are fully readable by any visitor.

### III. Performance Budget

Every page MUST load without render-blocking third-party resources, and all
images MUST be sized, compressed, and lazy-loaded where below the fold.
Budget: initial page weight SHOULD NOT exceed 500 KB compressed excluding
deliberately user-requested media; exceeding it requires removing or
justifying an asset in the change description.

Rationale: the audience is assumed to be on variable connections; weight is
a feature of a static site.

### IV. Accessibility Baseline

Every page MUST ship semantic HTML, a valid `lang` attribute, one `h1`,
keyboard-reachable interactive elements, and text alternatives for
non-text content (alt text, labels). Color contrast MUST meet WCAG AA.

Rationale: accessibility is cheapest when built in, and static pages make it
straightforward to verify.

### V. Simplicity (YAGNI)

New dependencies, build steps, and frameworks MUST be justified by an
immediate requirement; the default is plain HTML/CSS/JS plus the existing
toolchain. Prefer deleting code over abstracting it. No speculative
abstractions (base classes, plugin systems) before a second concrete use.

Rationale: minimal surface area is the primary maintenance strategy for a
small static site.

## Technical Constraints

- Output MUST be a directory of static files buildable by a single command.
- All source and generated assets MUST live in the repository; no binary or
  generated file outside an agreed `dist`/`build` output directory.
- External runtime services (analytics, fonts, CDNs) MUST be listed in the
  plan before adoption and MUST degrade gracefully when blocked or offline.
- Content changes MUST NOT require a backend deploy.
- No secrets, `.env` files, or credentials MAY be committed.

## Development Workflow

- Every change MUST pass the project's build command before being considered
  done; a broken build blocks merge.
- Linting/formatting (when configured) MUST pass with no suppressed errors.
- Changes MUST be verified in a browser at desktop and mobile widths.
- Links and asset references MUST be checked for breakage on touched pages.
- Peer review is required for changes to structure, dependencies, or
  deployment; trivial content edits may be self-approved.

## Governance

This constitution supersedes conflicting conventions for this repository.
Amendments MUST be proposed as a documented change to this file, reviewed by
a project maintainer, and include a migration note for any process that the
amendment invalidates. All pull requests and reviews MUST verify compliance
with the principles above; deviations MUST be justified in the change
description. Versioning follows semantic versioning: MAJOR for removal or
redefinition of principles, MINOR for added or materially expanded
principles/sections, PATCH for clarifications and wording fixes. Compliance
is reviewed at each amendment and at every release.

**Version**: 1.0.0 | **Ratified**: 2026-10-12 | **Last Amended**: 2026-10-12
