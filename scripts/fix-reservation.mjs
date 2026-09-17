import { readFileSync, writeFileSync } from "node:fs";

function clean(p) {
  let d = readFileSync(p, "utf-8");
  if (d.charCodeAt(0) === 0xfeff) d = d.slice(1);
  return d;
}

// 1) Gallery: use shared PuppyData, drop duplicate struct
{
  const p = "src/components/Gallery.tsx";
  let d = clean(p);
  const oldStruct = `type Pup = {
  key: string;
  name: string;
  image: string;
  gender: string;
  breed: string;
  year: number;
  price: string;
};`;
  const newStruct = `type Pup = PuppyData & {
  image: string;
};`;
  if (d.includes(oldStruct)) d = d.split(oldStruct).join(newStruct);
  // token safety (no-ops if already fixed)
  for (const [a, b] of [["var(--bone)", "var(--ink)"], ["var(--vermilion)", "var(--accent)"], ["#05070a", "#ffffff"]]) {
    d = d.split(a).join(b);
  }
  writeFileSync(p, d, "utf-8");
  console.log("gallery ok");
}

// 2) Step2 + Step3 cancel buttons: must not submit the form
for (const p of ["src/components/ReservationSteps/Step2-Contact.tsx", "src/components/ReservationSteps/Step3-Living.tsx"]) {
  let d = clean(p);
  d = d.replace(`<button
            className="reserve-btn"
            onClick={onBack}`, `<button
            type="button"
            className="reserve-btn"
            onClick={onBack}`);
  writeFileSync(p, d, "utf-8");
  console.log(p, "cancel button ok");
}
