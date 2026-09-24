import { imageManifest } from "../data/imageManifest";

/**
 * Slår opp et bilde i manifestet generert av scripts/prepare-images.mjs.
 * Returnerer null hvis nøkkelen ikke finnes (komponentene viser da plassholder).
 */
export function getImage(key) {
  if (!key) return null;
  const entry = imageManifest[key];
  if (!entry) return null;
  const ext = entry.format === "png" ? "png" : "jpg";
  const sizes = [...entry.sizes].sort((a, b) => a.w - b.w);
  return {
    key,
    width: entry.width,
    height: entry.height,
    description: entry.description,
    src: `${key}-${entry.width}.${ext}`,
    srcSet: sizes.map((s) => `${key}-${s.w}.${ext} ${s.w}w`).join(", "),
    webpSrcSet: sizes.map((s) => `${key}-${s.w}.webp ${s.w}w`).join(", "),
    smallest: `${key}-${sizes[0].w}.${ext}`,
  };
}
