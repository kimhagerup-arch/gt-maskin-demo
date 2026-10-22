/**
 * Kopierer bilder fra assets-raw/ til public/images/<mappe>/ med beskrivende navn.
 * Lager webp og jpg i to bredder (maks 1920 og 800), trimmer logoen og
 * skriver src/data/imageManifest.js med mål for width/height-attributter.
 *
 * Kjør: npm run images
 */
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "assets-raw");
const OUT = path.join(ROOT, "public", "images");
const MANIFEST = path.join(ROOT, "src", "data", "imageManifest.js");

const FULL_WIDTH = 1920;
const CARD_WIDTH = 800;
const SMALL_WIDTH = 400;

/** [kildefil, målmappe, nytt navn, kort beskrivelse for manifestet] */
const PHOTOS = [
  ["herobilde.jpg", "hero", "forside-hero-firmabil", "Firmabilen, International panelvan i sepia"],
  ["hero.jpg", "hero", "verksted-hero-klassiker", "Amerikansk klassiker i sort-hvitt, lav vinkel"],
  [
    "herobilde-fasade.jpg",
    "hero",
    "fasade-kveld-skilt",
    "Fasaden i Myggveien i kveldslys med skilt",
  ],
  [
    "vinter-bil-fasadeskilt.jpg",
    "hero",
    "fasade-vinter-klassikere",
    "Klassikere foran fasaden om vinteren",
  ],

  [
    "verksted.jpg",
    "verksted",
    "verksted-impala-motorblokk",
    "Rød Impala i verkstedet med motorblokk på stativ",
  ],
  [
    "verksted2.jpg",
    "verksted",
    "verksted-belair-loftebukk",
    "Gul Bel Air på løftebukk med panseret oppe",
  ],
  [
    "verksted3.jpg",
    "verksted",
    "verksted-suburban-ramme",
    "Karosseri løftet av rammen på en Suburban",
  ],
  ["verksted4.jpg", "verksted", "verksted-cabriolet-loftebukk", "Grønn cabriolet på løftebukk"],
  [
    "verksted5.jpg",
    "verksted",
    "verksted-corvette-service",
    "Rød Corvette på løftebukk under service",
  ],
  ["verksted7.jpg", "verksted", "verksted-traktor", "Traktor inne i verkstedet"],
  ["verksted8.jpg", "verksted", "verksted-cabriolet-kobber", "Kobberfarget cabriolet på løftebukk"],
  ["verksted9.jpg", "verksted", "verksted-camaro-motorrom", "Gul Camaro SS med åpent motorrom"],
  ["verksted10.jpg", "verksted", "verksted-mustang-loftebukk", "Lyseblå Mustang foran løftebukk"],
  ["motor.jpg", "verksted", "motor-v8-benk", "Nyoverhalt V8-motor på pall"],

  ["butikk.jpg", "butikk", "butikk-oljehylle", "Oljehylle i butikken"],
  ["butikk2.jpg", "butikk", "butikk-rustbeskyttelse", "Hylle med rustbeskyttelse"],
  ["butikk3.jpg", "butikk", "butikk-vaesker-disk", "Væsker og tilsetninger på disken"],
  ["butikk4.jpg", "butikk", "kundemottak-bar-neon", "Kundemottaket med bardisk og neonskilt"],
  ["butikk5.jpg", "butikk", "kundemottak-sofa-cabriolet", "Kundemottaket med bilsofa og cabriolet"],
  ["butikk6.jpg", "butikk", "kundemottak-hyller-bar", "Kundemottaket med hyller og bardisk"],
  ["butikk7.jpg", "butikk", "kundemottak-cabriolet-hyller", "Cabriolet inne i kundemottaket"],
  [
    "butikk8.jpg",
    "butikk",
    "kundemottak-disk-bensinpumpe",
    "Disken med gammel bensinpumpe og bilsofa",
  ],
  ["butikk9.jpg", "butikk", "butikk-capser", "Capser i butikken"],
  ["butikk10.jpg", "butikk", "butikk-klaer", "Arbeidsklær på stativ i butikken"],

  // Butikkbilder fotografert 21.10.2026 (ingen personer i bakgrunnen).
  [
    "hero-poster.jpg",
    "hero",
    "butikk-hero-poster",
    "Første bilde i butikkvideoen: moped, kasseapparat og klesstativ",
  ],
  [
    "butikk-disk.jpg",
    "butikk",
    "kundemottak-disk-chevrolet",
    "Kundemottaket: disken, Chevrolet-skiltet og tavlene",
  ],
  [
    "butikk-mobil-vegg.jpg",
    "butikk",
    "butikk-mobil-vegg",
    "Mobil-skiltet, capser, klær og oljehyller",
  ],
  [
    "butikk-kasseapparat-national.jpg",
    "butikk",
    "butikk-kasseapparat-national",
    "Gammelt National-kasseapparat",
  ],
  [
    "butikk-stetson-capser.jpg",
    "butikk",
    "butikk-stetson-capser",
    "Stetson-capser på hylla i butikken",
  ],
  [
    "butikk-bord-klaer-capser.jpg",
    "butikk",
    "butikk-bord-klaer-capser",
    "Bord med T-skjorter og capser",
  ],
  ["butikk-hylle-amsoil.jpg", "butikk", "butikk-hylle-amsoil", "Hylle med motoroljer"],
  [
    "butikk-hylle-amsoil-diesel.jpg",
    "butikk",
    "butikk-hylle-amsoil-diesel",
    "Hylle med motoroljer og dieseloljer",
  ],
  ["butikk-hylle-girolje.jpg", "butikk", "butikk-hylle-girolje", "Hylle med girolje, ATF og CVT"],
  [
    "butikk-hylle-severe-gear.jpg",
    "butikk",
    "butikk-hylle-severe-gear",
    "Hylle med girolje i poser",
  ],
  [
    "butikk-hylle-rustbeskyttelse.jpg",
    "butikk",
    "butikk-hylle-kjemi",
    "Hylle med rustbeskyttelse og kjemi",
  ],
  [
    "butikk-motorbord.jpg",
    "butikk",
    "butikk-motorbord",
    "Bord bygd av motordeler, med Cadillac- og Shell-skilt",
  ],
  ["butikk-texaco-pumpe.jpg", "butikk", "butikk-texaco-pumpe", "Gammel Texaco-pumpe i butikken"],
  [
    "butikk-route66-krakk.jpg",
    "butikk",
    "butikk-route66-krakk",
    "Route 66-skilt og Chevrolet-krakk ved disken",
  ],
  [
    "butikk-kasseapparat-tre.jpg",
    "butikk",
    "butikk-kasseapparat-tre",
    "Gammelt kasseapparat i tre",
  ],
  [
    "butikk-kasseapparat-sort.jpg",
    "butikk",
    "butikk-kasseapparat-sort",
    "Gammelt sort kasseapparat",
  ],
  [
    "butikk-kasseapparat-national-bak.jpg",
    "butikk",
    "butikk-kasseapparat-national-bak",
    "National-kasseapparatet sett bakfra",
  ],
  ["butikk-wunderbaum.jpg", "produkter", "wunder-baum", "Wunder-Baum-stativ i butikken"],

  ["bil1.jpg", "biler", "cadillac-rod-hekk", "Rød Cadillac med finner, sett bakfra"],
  ["bil2.jpg", "biler", "camaro-gul-front", "Gul Camaro SS sett forfra"],
  ["bil3.jpg", "biler", "corvette-sort-utenfor", "Sort Corvette utenfor verkstedet"],

  ["snowmobile.jpg", "utleie", "snoscootere-oppstilt", "Snøscootere oppstilt i snøen"],
  ["tilhenger.jpg", "utleie", "biltransporthenger-skra", "Biltransporthenger sett skrått forfra"],
  ["tilhenger2.jpg", "utleie", "biltransporthenger-side", "Biltransporthenger fra siden"],

  ["utside1.jpg", "bygg", "fasade-dag-klassikere", "Bygget på dagtid med klassikere foran"],
  ["utside2.jpg", "bygg", "fasade-dag-bilpark", "Bygget på dagtid med mange biler foran"],
  ["firmabil.jpg", "bygg", "firmabil-kustom-speedshop", "Firmabilen med Kustom Speedshop-skrift"],

  ["snapchat.jpg", "some", "snapchat-qr", "Snapchat-QR-kode for GT Maskin"],
];

// tilhenger3.jpg er identisk med tilhenger.jpg og hoppes over.

const manifest = {};

async function processPhoto([file, folder, name, description]) {
  const input = path.join(SRC, file);
  if (!existsSync(input)) {
    console.warn(`Mangler: ${file}`);
    return;
  }
  const dir = path.join(OUT, folder);
  mkdirSync(dir, { recursive: true });
  const meta = await sharp(input).rotate().metadata();
  const widths = [];
  const fullW = Math.min(meta.width, FULL_WIDTH);
  widths.push(fullW);
  if (meta.width > CARD_WIDTH + 40) widths.push(CARD_WIDTH);
  if (meta.width > SMALL_WIDTH + 40) widths.push(SMALL_WIDTH);

  const sizes = [];
  for (const w of widths) {
    const base = path.join(dir, `${name}-${w}`);
    const pipeline = sharp(input).rotate().resize({ width: w, withoutEnlargement: true });
    const info = await pipeline.clone().webp({ quality: 78 }).toFile(`${base}.webp`);
    await pipeline.clone().jpeg({ quality: 80, mozjpeg: true }).toFile(`${base}.jpg`);
    sizes.push({ w: info.width, h: info.height });
  }
  sizes.sort((a, b) => b.w - a.w);
  manifest[`/images/${folder}/${name}`] = {
    width: sizes[0].w,
    height: sizes[0].h,
    sizes,
    description,
  };
  console.log(`${file} -> ${folder}/${name} (${sizes.map((s) => s.w).join(", ")})`);
}

/**
 * Logo: logo2.jpg er logoen på mørk flate uten ramme. Bakgrunnen fjernes
 * med flood fill fra kantene (bare mørke piksler som henger sammen med kanten),
 * slik at mørke felt inne i skjoldet beholdes. Deretter trimmes marger.
 */
async function processLogo() {
  const input = path.join(SRC, "logo2.jpg");
  if (!existsSync(input)) {
    console.warn("Mangler: logo2.jpg");
    return;
  }
  const dir = path.join(OUT, "logo");
  mkdirSync(dir, { recursive: true });
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const isBg = (i) => {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    return max < 125 && max - min < 40;
  };
  const visited = new Uint8Array(width * height);
  const stack = [];
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const p = y * width + x;
    if (visited[p]) return;
    visited[p] = 1;
    if (isBg(p * channels)) stack.push(p);
  };
  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }
  let cleared = 0;
  while (stack.length) {
    const p = stack.pop();
    data[p * channels + 3] = 0;
    cleared++;
    const x = p % width;
    const y = (p - x) / width;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }
  console.log(`logo2.jpg: ${cleared} bakgrunnspiksler gjort gjennomsiktige`);

  // Rydd bort tynne rester av skiltkanten øverst og nederst: rader der under
  // 12 % av pikslene er synlige gjøres helt gjennomsiktige, fra kantene og inn.
  const rowOpaque = (y) => {
    let n = 0;
    for (let x = 0; x < width; x++) if (data[(y * width + x) * channels + 3] > 0) n++;
    return n / width;
  };
  const clearRow = (y) => {
    for (let x = 0; x < width; x++) data[(y * width + x) * channels + 3] = 0;
  };
  for (let y = height - 1; y >= 0 && rowOpaque(y) < 0.12; y--) clearRow(y);
  for (let y = 0; y < height && rowOpaque(y) < 0.12; y++) clearRow(y);

  const png = await sharp(data, { raw: { width, height, channels } })
    .trim({ threshold: 10 })
    .png()
    .toBuffer();
  const pngMeta = await sharp(png).metadata();
  const logoBase = path.join(dir, "gt-maskin-logo");
  await sharp(png)
    .resize({ height: 512, withoutEnlargement: true })
    .png()
    .toFile(`${logoBase}-512.png`);
  await sharp(png)
    .resize({ height: 512, withoutEnlargement: true })
    .webp({ quality: 90 })
    .toFile(`${logoBase}-512.webp`);
  await sharp(png).resize({ height: 256 }).png().toFile(`${logoBase}-256.png`);
  await sharp(png).resize({ height: 256 }).webp({ quality: 90 }).toFile(`${logoBase}-256.webp`);
  await sharp(png).resize({ height: 128 }).png().toFile(`${logoBase}-128.png`);
  await sharp(png).resize({ height: 128 }).webp({ quality: 90 }).toFile(`${logoBase}-128.webp`);
  const big = await sharp(`${logoBase}-512.png`).metadata();
  const small = await sharp(`${logoBase}-128.png`).metadata();
  manifest["/images/logo/gt-maskin-logo"] = {
    width: big.width,
    height: big.height,
    sizes: [
      { w: big.width, h: big.height },
      { w: small.width, h: small.height },
    ],
    description: "GT Maskin-logo, skjold med hot rod, gjennomsiktig bakgrunn",
    format: "png",
    trimmedFrom: { width: pngMeta.width, height: pngMeta.height },
  };
  console.log(`logo -> logo/gt-maskin-logo (${big.width}x${big.height})`);
}

/**
 * Frilegging med flood fill fra kantene. Bare piksler som oppfyller `isBg` og
 * henger sammen med kanten gjøres gjennomsiktige, slik at felt med samme farge
 * inne i motivet beholdes. Returnerer trimmet png-buffer.
 */
async function cutOut(input, isBg, trimThreshold = 10) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const visited = new Uint8Array(width * height);
  const stack = [];
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const p = y * width + x;
    if (visited[p]) return;
    visited[p] = 1;
    if (isBg(data, p * channels)) stack.push(p);
  };
  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }
  let cleared = 0;
  while (stack.length) {
    const p = stack.pop();
    data[p * channels + 3] = 0;
    cleared++;
    const x = p % width;
    const y = (p - x) / width;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }
  const png = await sharp(data, { raw: { width, height, channels } })
    .trim({ threshold: trimThreshold })
    .png()
    .toBuffer();
  return { png, cleared };
}

/**
 * Snøscooter til utleiebanneret: ac-profil.jpg er produsentens profilbilde på
 * hvit bakgrunn (kun demo, byttes før go-live). Lyse, umettede piksler som henger
 * sammen med kanten fjernes, bildet trimmes og leveres som webp og png med
 * gjennomsiktighet i 400 og 800 px bredde.
 */
async function processScooter() {
  const input = path.join(SRC, "ac-profil.jpg");
  if (!existsSync(input)) {
    console.warn("Mangler: ac-profil.jpg");
    return;
  }
  const dir = path.join(OUT, "utleie");
  mkdirSync(dir, { recursive: true });
  const isLightBg = (data, i) => {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    return min > 196 && max - min < 16;
  };
  const { png, cleared } = await cutOut(input, isLightBg, 6);
  console.log(`ac-profil.jpg: ${cleared} bakgrunnspiksler gjort gjennomsiktige`);
  const base = path.join(dir, "scooter-profil");
  const sizes = [];
  for (const w of [800, 400]) {
    const pipeline = sharp(png).resize({ width: w, withoutEnlargement: true });
    const info = await pipeline.clone().png({ compressionLevel: 9 }).toFile(`${base}-${w}.png`);
    await pipeline.clone().webp({ quality: 86, alphaQuality: 90 }).toFile(`${base}-${w}.webp`);
    sizes.push({ w: info.width, h: info.height });
  }
  manifest["/images/utleie/scooter-profil"] = {
    width: sizes[0].w,
    height: sizes[0].h,
    sizes,
    description: "Snøscooter i profil, frilagt (produsentbilde, kun demo)",
    format: "png",
  };
  console.log(`ac-profil.jpg -> utleie/scooter-profil (${sizes.map((s) => s.w).join(", ")})`);
}

mkdirSync(path.join(OUT, "feed"), { recursive: true });
writeFileSync(path.join(OUT, "feed", ".gitkeep"), "");

for (const photo of PHOTOS) {
  await processPhoto(photo);
}
await processLogo();
await processScooter();

// Hero-video: kopieres til public/video/hero.mp4 hvis den finnes i assets-raw/.
let heroVideo = null;
for (const candidate of ["hero.mp4", path.join("video", "hero.mp4")]) {
  const src = path.join(SRC, candidate);
  if (existsSync(src)) {
    const dir = path.join(ROOT, "public", "video");
    mkdirSync(dir, { recursive: true });
    copyFileSync(src, path.join(dir, "hero.mp4"));
    heroVideo = "/video/hero.mp4";
    console.log(`${candidate} -> video/hero.mp4`);
    break;
  }
}
if (!heroVideo) console.log("Ingen hero.mp4 i assets-raw/, hero bruker stillbilde.");

const header = "// Skrevet av scripts/prepare-images.mjs. Ikke rediger for hånd.\n";
writeFileSync(
  MANIFEST,
  `${header}export const imageManifest = ${JSON.stringify(manifest, null, 2)};\n\nexport const heroVideo = ${JSON.stringify(heroVideo)};\n`,
);
console.log(
  `Manifest skrevet: ${path.relative(ROOT, MANIFEST)} (${Object.keys(manifest).length} bilder)`,
);
