import { useState } from "react";
import { cx } from "../lib/format";
import { getImage } from "../lib/images";
import Placeholder from "./Placeholder";

/**
 * Responsivt bilde fra manifestet: webp med jpg-fallback, srcset i to bredder,
 * width/height mot layout shift, lazy-loading som standard. Faller tilbake
 * til Placeholder hvis nøkkelen mangler eller bildet feiler.
 *
 * src: manifest-nøkkel, f.eks. "/images/hero/forside-hero-firmabil"
 */
export default function Picture({
  src,
  alt = "",
  sizes = "100vw",
  className,
  imgClassName = "h-full w-full object-cover",
  loading = "lazy",
  objectPosition,
  fallbackLabel = "[Bilde]",
  tone = "dark",
  draggable = false,
}) {
  const [failed, setFailed] = useState(false);
  const image = getImage(src);

  if (!image || failed) {
    return (
      <Placeholder label={fallbackLabel} tone={tone} className={cx("h-full w-full", className)} />
    );
  }

  return (
    <picture className={cx("block", className)}>
      <source type="image/webp" srcSet={image.webpSrcSet} sizes={sizes} />
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes={sizes}
        width={image.width}
        height={image.height}
        alt={alt}
        loading={loading}
        decoding="async"
        draggable={draggable}
        className={imgClassName}
        style={objectPosition ? { objectPosition } : undefined}
        onError={() => setFailed(true)}
      />
    </picture>
  );
}
