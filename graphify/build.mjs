import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join, relative, extname, dirname } from "node:path";
const PROJECT_ROOT = join(import.meta.dirname, "..");
const SRC = join(PROJECT_ROOT, "src");
const OUT = join(SRC, "app", "graphify-out");
const WIKI = join(OUT, "wiki");
const SRC_INDEX_MD = join(WIKI, "INDEX.md");

const IGNORE_DIRS = new Set(["node_modules", ".next", "__tests_cache", "graphify-out"]);
const SOURCE_EXTS = new Set([".ts", ".tsx", ".js", ".mjs", ".css", ".json", ".md", ".mdx"]);

function listSourceFiles(base) {
  const results = [];
  const stack = [base];
  while (stack.length) {
    const dir = stack.pop();
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const e of entries) {
      const full = join(dir, e.name);
      if (e.isDirectory()) {
        if (!IGNORE_DIRS.has(e.name)) stack.push(full);
        continue;
      }
      if (!SOURCE_EXTS.has(extname(e.name))) continue;
      results.push(full);
    }
  }
  // DEBUG
  console.error("DEBUG: total results before filter:", results.length);
  console.error("DEBUG: paths:", results.slice(0, 5).map(p => p.substring(p.lastIndexOf("\\") > 0 ? p.lastIndexOf("\\") : 0)));
  return results
    .filter((p) => {
      const pass = !p.includes("\\node_modules\\") && !p.includes("/.next/");
      if (!pass) console.error("DEBUG: filtered out:", p);
      return pass;
    })
    .sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }));
}

function fileSafeName(p) {
  return relative(SRC, p).replace(/\\/g, "/").replace(/[^a-zA-Z0-9._/-]/g, "_");
}

function snippet(p) {
  let text;
  try {
    text = readFileSync(p, "utf8");
  } catch {
    return null;
  }
  const lines = text.split("\n");
  if (lines.length === 0) return null;
  const head = lines.slice(0, Math.min(lines.length, 22));
  return head.join("\n") + "\n" + "------ snippet (first lines) ------";
}

function buildWikiIndex(files) {
  const parts = [
    "# ChampionBullies — graphify wiki",
    "",
    "Auto-generated source map for `src/`. Updated via `npm run graphify:build`.",
    "",
    `- last updated: ${new Date().toISOString().slice(0, 10)}`,
    "",
    "## File index",
    "",
    "| path | lines | first line |",
    "|---|---|---|",
  ];
  for (const p of files) {
    let text;
    try {
      text = readFileSync(p, "utf8");
    } catch {
      continue;
    }
    const lines = text.split("\n");
    const first = lines[0]?.trim().slice(0, 100) ?? "";
    parts.push(`| ${fileSafeName(p)} | ${lines.length} | \`${first}\` |`);
  }
  return parts.join("\n") + "\n";
}

function buildSnippets(files) {
  mkdirSync(join(WIKI, "snippets"), { recursive: true });
  for (const p of files) {
    const sn = snippet(p);
    if (!sn) continue;
    const snippetPath = join(WIKI, "snippets", fileSafeName(p) + ".md");
    const snippetDir = dirname(snippetPath);
    mkdirSync(snippetDir, { recursive: true });
    writeFileSync(snippetPath, sn, "utf8");
  }
}

function buildIndex() {
  mkdirSync(WIKI, { recursive: true });
  const files = listSourceFiles(SRC);
  writeFileSync(SRC_INDEX_MD, buildWikiIndex(files), "utf8");
  buildSnippets(files);
  return files.length;
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------
async function main() {
  const argv = process.argv.slice(2);
  if (argv.includes("--help") || argv.includes("-h")) {
    console.log("graphify/build.mjs  — update src/app/graphify-out/wiki");
    console.log("Usage: node graphify/build.mjs");
    return;
  }
  const n = buildIndex();
  console.log(`graphify-out updated: ${n} source files indexed`);
  console.log(`wiki index: ${SRC_INDEX_MD}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});