# championbullies / graphify

Knowledge graph generation for the championbullies codebase.

## Overview

`graphify` analyzes the `src/` directory and generates wiki-style markdown documentation in `src/app/graphify-out/wiki/`.

## Components

- `graphify/build.mjs` — Lightweight source indexer; writes wiki-style INDEX.md + per-file snippets to `src/app/graphify-out/wiki/`.
- `graphify/query.mjs` — CLI surface over the same wiki (text match). *(minimal — currently only serves as a placeholder)*

## Usage

Run `npm run graphify:build` after code changes to refresh the wiki.

## Generated Output

The tool generates the following markdown files:

### INDEX.md

Auto-generated source map for `src/`. Contains a table of all source files with paths, line counts, and first lines. Example structure:

| path | lines | first line |
|---|---|---|
| `src/lib/validation.ts` | 76 | `import { z } from "zod";` |
| `src/context/ReservationContext.tsx` | 194 | `"use client";` |
| `src/components/ReservationModal.tsx` | 159 | `"use client";` |
| ... | ... | ... |

### Snippets (`src/app/graphify-out/wiki/snippets/`)

Per-file snippet markdown files containing the first 22 lines of each source file, organized by category:

- `src/app/graphify-out/wiki/snippets/app/` — Layout, page, globals CSS
- `src/app/graphify-out/wiki/snippets/components/` — Canvas, Contact, Gallery, ReservationModal, etc.
- `src/app/graphify-out/wiki/snippets/context/` — ReservationContext
- `src/app/graphify-out/wiki/snippets/lib/` — validation, ghl

### Example: `src/app/graphify-out/wiki/snippets/components/ReservationModal.tsx.md`

```markdown
"use client";

// Features:
// - Full-screen / centered modal with backdrop blur
// - Stepper/progress indicator (Step 1 of 4)
// - Keyboard accessible (ESC to close, Tab trap)
// - Portal-rendered (ReactDOM.createPortal)
// - Animations: fade + slide up (Framer Motion or CSS)
```

## Development

```bash
# Generate/refresh the graph
npm run graphify:build

# Or directly:
node graphify/build.mjs
```