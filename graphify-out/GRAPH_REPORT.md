# Graph Report - championbullies  (2026-09-18)

## Corpus Check
- 52 files · ~738,736 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 317 nodes · 427 edges · 34 communities (16 shown, 9 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8d33e62d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- devDependencies
- dependencies
- compilerOptions
- Gallery.tsx
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
- validation.ts
- SCOPE — YOUR LANE
- contact-api.mjs
- puppies.ts

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
- `PuppyCard()` --calls--> `useReservation()`  [EXTRACTED]
  src/components/Gallery.tsx → src/context/ReservationContext.tsx
- `ReservationModal()` --calls--> `useReservation()`  [EXTRACTED]
  src/components/ReservationModal.tsx → src/context/ReservationContext.tsx
- `ResultPanel()` --calls--> `useReservation()`  [EXTRACTED]
  src/components/ReservationSteps/ResultPanel.tsx → src/context/ReservationContext.tsx
- `POST()` --calls--> `createReference()`  [EXTRACTED]
  src/app/api/reservations/route.ts → src/lib/reservations.ts
- `POST()` --calls--> `deliverReservation()`  [EXTRACTED]
  src/app/api/reservations/route.ts → src/lib/reservations.ts

## Import Cycles
- None detected.

## Communities (34 total, 9 thin omitted)

### Community 0 - "devDependencies"
Cohesion: 0.12
Nodes (17): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node (+9 more)

### Community 1 - "dependencies"
Cohesion: 0.07
Nodes (27): @hookform/resolvers, next, dependencies, @hookform/resolvers, next, react, react-dom, react-hook-form (+19 more)

### Community 2 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 3 - "Gallery.tsx"
Cohesion: 0.13
Nodes (15): Contact(), FAILURE_COPY, interestOptions, Status, Footer(), Gallery(), groups, PuppyCard() (+7 more)

### Community 4 - "ReservationModal.tsx"
Cohesion: 0.14
Nodes (24): CheckRow(), CheckRowProps, describedBy(), Field(), FieldGroup(), FieldGroupProps, FieldProps, RadioOption() (+16 more)

### Community 5 - "reservations.ts"
Cohesion: 0.17
Nodes (16): POST(), FAILURE_COPY, ResultPanel(), FailureReason, createReference(), deliverReservation(), DeliveryResult, sendNotificationEmail() (+8 more)

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
Cohesion: 0.14
Nodes (18): Action, buildCandidate(), EMPTY_DATA, FormData, initialState, missingStep(), PuppyData, reducer() (+10 more)

### Community 20 - "fix-modal-tokens.mjs"
Cohesion: 0.22
Nodes (6): g, galleryPath, here, m, modalPath, root

### Community 21 - "compare_titles.py"
Cohesion: 0.50
Nodes (3): load_sheet(), Compare CDJ old (plan) vs CDJ (implementation) title layout: rows 13-14…, read_xml()

### Community 25 - "championbullies / graphify"
Cohesion: 0.20
Nodes (9): championbullies / graphify, Components, Development, Example: `src/app/graphify-out/wiki/snippets/components/ReservationModal.tsx.md`, Generated Output, INDEX.md, Overview, Snippets (`src/app/graphify-out/wiki/snippets/`) (+1 more)

### Community 28 - "validation.ts"
Cohesion: 0.09
Nodes (21): checkRateLimit(), POST(), rateLimitMap, runtime, createGHLClient(), GHLClient, ContactDetails, ContactFailureReason (+13 more)

### Community 29 - "SCOPE — YOUR LANE"
Cohesion: 0.22
Nodes (8): 1. Contact API Route (create), CONTEXT, FIRST: READ REPO RULES, SCOPE — YOUR LANE, SIDE-BY-SIDE WITH CLINE — DO NOT OVERLAP, TASK: Frontend Architecture Fixes — ChampionBullies, ⚠️ Two Things Cline Might Flag, 🎯 Why This Structure

## Knowledge Gaps
- **142 isolated node(s):** `eslintConfig`, `PROJECT_ROOT`, `SRC`, `OUT`, `WIKI` (+137 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 177 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `dependencies`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `PROJECT_ROOT`, `SRC` to the rest of the system?**
  _142 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `Gallery.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1341991341991342 - nodes in this community are weakly interconnected._
- **Should `ReservationModal.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13709677419354838 - nodes in this community are weakly interconnected._