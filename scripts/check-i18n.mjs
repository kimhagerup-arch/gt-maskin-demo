// Sjekker at den norske og den engelske kilden for hver datamodul har samme form:
// samme nøkler, samme typer, lister med samme lengde. Feiler (exit 1) når en tekst
// finnes på det ene språket og mangler på det andre. Kjøres av npm run lint.
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MODULES = [
  "siteContent",
  "companyFacts",
  "services",
  "rental",
  "cars",
  "team",
  "timeline",
  "prices",
  "channels",
  "videos",
  "socialFeed",
  "heroSlides",
  "catalog",
  "vehicles",
  "products",
];

const problems = [];

function typeOf(value) {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

function compare(nb, en, trail) {
  const tn = typeOf(nb);
  const te = typeOf(en);
  if (tn !== te) {
    problems.push(`${trail}: nb er ${tn}, en er ${te}`);
    return;
  }
  if (tn === "array") {
    if (nb.length !== en.length) {
      problems.push(`${trail}: nb har ${nb.length} elementer, en har ${en.length}`);
    }
    const n = Math.min(nb.length, en.length);
    for (let i = 0; i < n; i++) compare(nb[i], en[i], `${trail}[${i}]`);
    return;
  }
  if (tn === "object") {
    for (const key of Object.keys(nb)) {
      if (!(key in en)) problems.push(`${trail}.${key}: mangler på engelsk`);
      else compare(nb[key], en[key], `${trail}.${key}`);
    }
    for (const key of Object.keys(en)) {
      if (!(key in nb)) problems.push(`${trail}.${key}: mangler på norsk`);
    }
    return;
  }
  if (tn === "string" && nb.trim() === "" && en.trim() !== "") {
    problems.push(`${trail}: tom på norsk`);
  }
  if (tn === "string" && en.trim() === "" && nb.trim() !== "") {
    problems.push(`${trail}: tom på engelsk`);
  }
}

for (const name of MODULES) {
  const nb = await import(pathToFileURL(path.join(root, "src/data/nb", `${name}.js`)).href);
  const en = await import(pathToFileURL(path.join(root, "src/data/en", `${name}.js`)).href);
  const nbKeys = Object.keys(nb).filter((k) => typeof nb[k] !== "function");
  const enKeys = Object.keys(en).filter((k) => typeof en[k] !== "function");
  for (const key of nbKeys) {
    if (!(key in en)) problems.push(`${name}.${key}: eksporten mangler på engelsk`);
    else compare(nb[key], en[key], `${name}.${key}`);
  }
  for (const key of enKeys) {
    if (!(key in nb)) problems.push(`${name}.${key}: eksporten mangler på norsk`);
  }
}

if (problems.length) {
  console.error(`i18n: ${problems.length} avvik mellom norsk og engelsk:`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}
console.log(`i18n: ${MODULES.length} moduler har samme form på norsk og engelsk.`);
