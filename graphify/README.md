# championbullies / graphify

Knowledge graph generation for the championbullies codebase.

## Overview

`graphify` analyzes the codebase and generates wiki-style markdown documentation in `src/app/graphify-out/wiki/`.

## Components

- `graphify/build.mjs` — Lightweight source indexer; writes wiki-style INDEX.md + per-file snippets to `src/app/graphify-out/wiki/`.
- `graphify/query.mjs` — CLI surface over the same wiki (text match).

## Usage

Run `npm run graphify:build` after code changes to refresh the graph.

## Generated Output

The tool generates markdown files for:

- Component documentation (Canvas, Contact, CustomCursor, Gallery, etc.)
- Context documentation (ReservationContext)
- Validation schemas (validation.ts)
- Step-by-step reservation flow components
- And more..."
