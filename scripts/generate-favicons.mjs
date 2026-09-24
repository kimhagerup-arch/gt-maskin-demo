/**
 * Lager favicon-sett fra den trimmede logoen:
 * favicon.ico (16/32/48), icon-192.png, icon-512.png, apple-touch-icon.png (180).
 * Logoen legges på mørk brand-primary-bakgrunn med litt luft rundt.
 *
 * Krever at scripts/prepare-images.mjs er kjørt først.
 * Kjør: npm run favicons
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const LOGO = path.join(ROOT, "public", "images", "logo", "gt-maskin-logo-512.png");
const OUT = path.join(ROOT, "public");
const BG = { r: 21, g: 20, b: 18, alpha: 1 }; // brand-primary #151412

if (!existsSync(LOGO)) {
  console.error("Fant ikke trimmet logo. Kjør npm run images først.");
  process.exit(1);
}
mkdirSync(OUT, { recursive: true });

async function square(size, padRatio) {
  const inner = Math.round(size * (1 - padRatio * 2));
  const logo = await sharp(LOGO)
    .resize({ width: inner, height: inner, fit: "inside" })
    .png()
    .toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background: BG },
  })
    .composite([{ input: logo, gravity: "centre" }])
    .png()
    .toBuffer();
}

function buildIco(pngs) {
  // ICO med PNG-innhold (støttet av alle moderne nettlesere).
  const count = pngs.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);
  const entries = [];
  let offset = 6 + 16 * count;
  for (const { size, buf } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(buf.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += buf.length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.buf)]);
}

const icoSizes = [16, 32, 48];
const icoPngs = [];
for (const size of icoSizes) {
  icoPngs.push({ size, buf: await square(size, 0.04) });
}
writeFileSync(path.join(OUT, "favicon.ico"), buildIco(icoPngs));

writeFileSync(path.join(OUT, "icon-192.png"), await square(192, 0.08));
writeFileSync(path.join(OUT, "icon-512.png"), await square(512, 0.08));
writeFileSync(path.join(OUT, "apple-touch-icon.png"), await square(180, 0.1));

// Enkel SVG-favicon med monogram som fallback for nettlesere som foretrekker SVG.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#151412"/><text x="32" y="45" text-anchor="middle" font-family="Impact, 'Arial Black', sans-serif" font-size="36" fill="#F08003">GT</text></svg>`;
writeFileSync(path.join(OUT, "favicon.svg"), svg);

writeFileSync(
  path.join(OUT, "site.webmanifest"),
  `${JSON.stringify(
    {
      name: "GT Maskin AS",
      short_name: "GT Maskin",
      icons: [
        { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      theme_color: "#151412",
      background_color: "#151412",
      display: "browser",
    },
    null,
    2,
  )}\n`,
);

console.log(
  "Favicons skrevet til public/: favicon.ico, favicon.svg, icon-192.png, icon-512.png, apple-touch-icon.png, site.webmanifest",
);
