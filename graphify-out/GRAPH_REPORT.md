# Graph Report - championbullies  (2026-09-17)

## Corpus Check
- 43 files · ~402,764 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 293 nodes · 396 edges · 29 communities (15 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ff718297`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- devDependencies
- dependencies
- compilerOptions
- page.tsx
- ReservationModal.tsx
- reservations.ts
- layout.tsx
- championbullies
- Target State (v3.1)
- Canvas
- Navigation.tsx
- eslint.config.mjs
- next.config.ts
- postcss.config.mjs
- ProgressRail.tsx
- build.mjs
- ReservationContext.tsx
- fix-modal-tokens.mjs
- compare_titles.py
- fix-gallery-tokens.mjs
- championbullies / graphify
- GHLClient

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `useReservation()` - 15 edges
3. `v3.1 Plan: Modal Reservation Flow (E-commerce Product Page Style)` - 9 edges
4. `Target State (v3.1)` - 9 edges
5. `championbullies` - 8 edges
6. `scripts` - 7 edges
7. `GHLClient` - 7 edges
8. `include` - 7 edges
9. `RESERVE_FORM_ID` - 6 edges
10. `buildSummaryText()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `GalleryContent()` --calls--> `useReservation()`  [EXTRACTED]
  src/components/Gallery.tsx → src/context/ReservationContext.tsx
- `ResultPanel()` --calls--> `useReservation()`  [EXTRACTED]
  src/components/ReservationSteps/ResultPanel.tsx → src/context/ReservationContext.tsx
- `POST()` --calls--> `createReference()`  [EXTRACTED]
  src/app/api/reservations/route.ts → src/lib/reservations.ts
- `POST()` --calls--> `deliverReservation()`  [EXTRACTED]
  src/app/api/reservations/route.ts → src/lib/reservations.ts
- `ReservationModal()` --calls--> `useReservation()`  [EXTRACTED]
  src/components/ReservationModal.tsx → src/context/ReservationContext.tsx

## Import Cycles
- None detected.

## Communities (29 total, 7 thin omitted)

### Community 0 - "devDependencies"
Cohesion: 0.07
Nodes (27): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node (+19 more)

### Community 1 - "dependencies"
Cohesion: 0.08
Nodes (25): @designcodeio/threeui, framer-motion, gsap, @hookform/resolvers, lenis, next, dependencies, @designcodeio/threeui (+17 more)

### Community 2 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 3 - "page.tsx"
Cohesion: 0.27
Nodes (5): Contact(), interests, Footer(), Gallery(), Hero()

### Community 4 - "ReservationModal.tsx"
Cohesion: 0.10
Nodes (33): GalleryContent(), Pup, pups, ReservationModal(), CheckRow(), CheckRowProps, describedBy(), Field() (+25 more)

### Community 5 - "reservations.ts"
Cohesion: 0.20
Nodes (15): POST(), FAILURE_COPY, ResultPanel(), FailureReason, createReference(), deliverReservation(), DeliveryResult, sendNotificationEmail() (+7 more)

### Community 6 - "layout.tsx"
Cohesion: 0.40
Nodes (3): metadata, roboto, robotoSlab

### Community 7 - "championbullies"
Cohesion: 0.22
Nodes (8): Available Scripts, championbullies, Deploy on Vercel, Features, Getting Started, Knowledge Graph, License, Tech Stack

### Community 8 - "Target State (v3.1)"
Cohesion: 0.10
Nodes (19): 1. Modal Component (`src/components/ReservationModal.tsx`), 2. Step-by-Step Flow (4 Steps), 3. Data Model, 4. State Management, 5. API Integration (Future), 6. UX Details, 7. Accessibility, 8. Files to Create/Modify (+11 more)

### Community 18 - "build.mjs"
Cohesion: 0.20
Nodes (14): buildIndex(), buildSnippets(), buildWikiIndex(), fileSafeName(), IGNORE_DIRS, listSourceFiles(), main(), OUT (+6 more)

### Community 19 - "ReservationContext.tsx"
Cohesion: 0.11
Nodes (24): Action, buildCandidate(), EMPTY_DATA, FormData, initialState, missingStep(), reducer(), ReservationActions (+16 more)

### Community 20 - "fix-modal-tokens.mjs"
Cohesion: 0.22
Nodes (6): g, galleryPath, here, m, modalPath, root

### Community 21 - "compare_titles.py"
Cohesion: 0.50
Nodes (3): load_sheet(), Compare CDJ old (plan) vs CDJ (implementation) title layout: rows 13-14…, read_xml()

### Community 25 - "championbullies / graphify"
Cohesion: 0.20
Nodes (9): championbullies / graphify, Components, Development, Example: `src/app/graphify-out/wiki/snippets/components/ReservationModal.tsx.md`, Generated Output, INDEX.md, Overview, Snippets (`src/app/graphify-out/wiki/snippets/`) (+1 more)

### Community 28 - "GHLClient"
Cohesion: 0.25
Nodes (4): createGHLClient(), GHLClient, GHLIntegration, ReservationWithGHL

## Knowledge Gaps
- **130 isolated node(s):** `eslintConfig`, `PROJECT_ROOT`, `SRC`, `OUT`, `WIKI` (+125 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 160 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `devDependencies`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `PROJECT_ROOT`, `SRC` to the rest of the system?**
  _130 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `ReservationModal.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `Target State (v3.1)` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._