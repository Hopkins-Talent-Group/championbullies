import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");

function readText(p) {
  const raw = fs.readFileSync(p);
  let t = raw.toString("utf8");
  if (t.charCodeAt(0) === 0xfeff) t = t.slice(1);
  return t;
}
function writeText(p, next) {
  fs.writeFileSync(p + ".new", next, "utf8");
  fs.renameSync(p + ".new", p);
}

// 1) Gallery: unify Pup with shared PuppyData + fix dead tokens
const galleryPath = path.join(root, "src", "components", "Gallery.tsx");
let g = readText(galleryPath);
let gn = g;
if (!gn.includes("PuppyData")) {
  gn = gn.replace(
    'import { ReservationModal } from "@/components/ReservationModal";',
    'import { ReservationModal } from "@/components/ReservationModal";\nimport type { PuppyData } from "@/context/ReservationContext";'
  );
  gn = gn.replace(
    `type Pup = {
  key: string;
  name: string;
  image: string;
  gender: string;
  breed: string;
  year: number;
  price: string;
};`,
    `type Pup = PuppyData & {
  image: string;
};`
  );
}
for (const [a, b] of [
  ["var(--bone)", "var(--ink)"],
  ["var(--vermilion)", "var(--accent)"],
  ["#05070a", "#ffffff"],
]) {
  gn = gn.split(a).join(b);
}
if (gn !== g) {
  writeText(galleryPath, gn);
  console.log("gallery fixed");
} else {
  console.log("gallery no change");
}

// 2) Modal: dedupe PuppyData import, drop local duplicate type (context is source of truth)
const modalPath = path.join(root, "src", "components", "ReservationModal.tsx");
let m = readText(modalPath);
let mn = m;
const dupImport =
  'import type { PuppyData } from "@/context/ReservationContext";\nimport type { PuppyData } from "@/context/ReservationContext";';
if (mn.includes(dupImport)) {
  mn = mn.split(dupImport).join('import type { PuppyData } from "@/context/ReservationContext";');
}
const dupType = `export type PuppyData = {
  key: string;
  name: string;
  breed: string;
  price: string;
  gender: string;
  year: number;
  image?: string;
};

`;
if (mn.includes(dupType)) {
  mn = mn.split(dupType).join("");
}
if (mn !== m) {
  writeText(modalPath, mn);
  console.log("modal fixed");
} else {
  console.log("modal no change");
}