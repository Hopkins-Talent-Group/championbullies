// One-shot codemod: strip BOM + replace dead design tokens in Gallery.tsx
import { readFileSync, writeFileSync } from "node:fs";

const p = "src/components/Gallery.tsx";
let d = readFileSync(p, "utf-8");
// strip BOM
if (d.charCodeAt(0) === 0xfeff) d = d.slice(1);
const reps = [
  ["var(--bone)", "var(--paper)"],
  ["var(--vermilion)", "var(--accent)"],
  ["#05070a", "#ffffff"],
];
for (const [a, b] of reps) d = d.split(a).join(b);
writeFileSync(p, d, "utf-8");
console.log("gallery tokens fixed");
