# Graph Report - championbullies  (2026-09-18)

## Corpus Check
- 54 files · ~968,851 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 334 nodes · 470 edges · 33 communities (15 shown, 9 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `df547fe0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- devDependencies
- dependencies
- compilerOptions
- validation.ts
- Gallery.tsx
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
- ghl.ts
- SCOPE — YOUR LANE
- contact-api.mjs
- puppies.ts

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `useReservation()` - 15 edges
3. `v3.1 Plan: Modal Reservation Flow (E-commerce Product Page Style)` - 9 edges
4. `Target State (v3.1)` - 9 edges
5. `normalizePhone()` - 8 edges
6. `GHLClient` - 8 edges
7. `createGHLClientFromEnv()` - 8 edges
8. `championbullies` - 8 edges
9. `scripts` - 7 edges
10. `include` - 7 edges

## Surprising Connections (you probably didn't know these)
- `PuppyCard()` --calls--> `useReservation()`  [EXTRACTED]
  src/components/Gallery.tsx → src/context/ReservationContext.tsx
- `main()` --calls--> `normalizePhone()`  [EXTRACTED]
  test-ghl.ts → src/lib/ghl.ts
- `main()` --calls--> `getBrandTag()`  [EXTRACTED]
  test-ghl.ts → src/lib/ghl.ts
- `main()` --calls--> `createGHLClientFromEnv()`  [EXTRACTED]
  test-ghl.ts → src/lib/ghl.ts
- `ResultPanel()` --calls--> `buildFallbackMailto()`  [EXTRACTED]
  src/components/ReservationSteps/ResultPanel.tsx → src/lib/reservationSummary.ts

## Import Cycles
- None detected.

## Communities (33 total, 9 thin omitted)

### Community 0 - "devDependencies"
Cohesion: 0.11
Nodes (19): dotenv, eslint, eslint-config-next, devDependencies, dotenv, eslint, eslint-config-next, tailwindcss (+11 more)

### Community 1 - "dependencies"
Cohesion: 0.07
Nodes (27): @hookform/resolvers, next, dependencies, @hookform/resolvers, next, react, react-dom, react-hook-form (+19 more)

### Community 2 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 4 - "validation.ts"
Cohesion: 0.08
Nodes (42): ReservationModal(), CheckRow(), CheckRowProps, describedBy(), Field(), FieldGroup(), FieldGroupProps, FieldProps (+34 more)

### Community 5 - "Gallery.tsx"
Cohesion: 0.09
Nodes (26): GAP_LG, GAP_MD, Contact(), FAILURE_COPY, interestOptions, Status, Footer(), Gallery() (+18 more)

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
Cohesion: 0.15
Nodes (17): Action, buildCandidate(), EMPTY_DATA, FormData, initialState, missingStep(), PuppyData, reducer() (+9 more)

### Community 20 - "fix-modal-tokens.mjs"
Cohesion: 0.22
Nodes (6): g, galleryPath, here, m, modalPath, root

### Community 21 - "compare_titles.py"
Cohesion: 0.50
Nodes (3): load_sheet(), Compare CDJ old (plan) vs CDJ (implementation) title layout: rows 13-14…, read_xml()

### Community 25 - "championbullies / graphify"
Cohesion: 0.20
Nodes (9): championbullies / graphify, Components, Development, Example: `src/app/graphify-out/wiki/snippets/components/ReservationModal.tsx.md`, Generated Output, INDEX.md, Overview, Snippets (`src/app/graphify-out/wiki/snippets/`) (+1 more)

### Community 28 - "ghl.ts"
Cohesion: 0.12
Nodes (24): checkRateLimit(), POST(), rateLimitMap, runtime, sendFallbackEmail(), POST(), runtime, createGHLClient() (+16 more)

### Community 29 - "SCOPE — YOUR LANE"
Cohesion: 0.22
Nodes (8): 1. Contact API Route (create), CONTEXT, FIRST: READ REPO RULES, SCOPE — YOUR LANE, SIDE-BY-SIDE WITH CLINE — DO NOT OVERLAP, TASK: Frontend Architecture Fixes — ChampionBullies, ⚠️ Two Things Cline Might Flag, 🎯 Why This Structure

## Knowledge Gaps
- **149 isolated node(s):** `eslintConfig`, `PROJECT_ROOT`, `SRC`, `OUT`, `WIKI` (+144 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 183 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `dependencies`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `PROJECT_ROOT`, `SRC` to the rest of the system?**
  _149 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `validation.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08078431372549019 - nodes in this community are weakly interconnected._
- **Should `Gallery.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09365079365079365 - nodes in this community are weakly interconnected._