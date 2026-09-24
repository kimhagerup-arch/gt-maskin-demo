/**
 * Lager public/og-image.jpg (1200×630) med fasadebildet, mørk overtoning,
 * logo og firmanavn.
 *
 * Krever at scripts/prepare-images.mjs er kjørt først.
 * Kjør: npm run og-image
 */
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PHOTO = path.join(ROOT, "public", "images", "hero", "fasade-kveld-skilt-1278.jpg");
const LOGO = path.join(ROOT, "public", "images", "logo", "gt-maskin-logo-512.png");
const OUT = path.join(ROOT, "public", "og-image.jpg");
const W = 1200;
const H = 630;

for (const f of [PHOTO, LOGO]) {
  if (!existsSync(f)) {
    console.error(`Fant ikke ${path.relative(ROOT, f)}. Kjør npm run images først.`);
    process.exit(1);
  }
}

const photo = await sharp(PHOTO).resize(W, H, { fit: "cover", position: "centre" }).toBuffer();

const overlay = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#151412" stop-opacity="0.35"/>
        <stop offset="1" stop-color="#151412" stop-opacity="0.92"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
    <rect x="72" y="452" width="48" height="3" fill="#F08003"/>
    <text x="136" y="462" font-family="Impact, 'Arial Black', 'Segoe UI', sans-serif" font-size="22" letter-spacing="4" fill="#F79A2B">GODKJENT BILVERKSTED · ALTA</text>
    <text x="72" y="540" font-family="Impact, 'Arial Black', 'Segoe UI', sans-serif" font-size="72" letter-spacing="2" fill="#F3EFE7">GT MASKIN AS</text>
    <text x="72" y="584" font-family="'Segoe UI', Arial, sans-serif" font-size="26" fill="#B9B2A6">Kustom Speedshop · Myggveien 3, 9514 Alta</text>
  </svg>`,
);

const logo = await sharp(LOGO).resize({ height: 200, fit: "inside" }).png().toBuffer();
const logoMeta = await sharp(logo).metadata();

await sharp(photo)
  .composite([
    { input: overlay, top: 0, left: 0 },
    { input: logo, top: H - 200 - 56, left: W - logoMeta.width - 72 },
  ])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(OUT);

console.log(`OG-bilde skrevet: ${path.relative(ROOT, OUT)} (${W}x${H})`);
