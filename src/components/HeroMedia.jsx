import { useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { cx } from "../lib/format";
import { getImage } from "../lib/images";
import Picture from "./Picture";

/**
 * Hero-medie: mp4 hvis `video` er satt (autoplay, muted, loop, poster),
 * ellers stillbilde. Ved prefers-reduced-motion vises bare posteren.
 */
export default function HeroMedia({
  image,
  imageAlt,
  video,
  className,
  objectPosition = "18% 50%",
}) {
  const reduced = useReducedMotion();
  const [videoFailed, setVideoFailed] = useState(false);
  const poster = getImage(image);
  const showVideo = Boolean(video) && !reduced && !videoFailed;

  return (
    <div className={cx("relative overflow-hidden bg-brand-primary-soft", className)}>
      {showVideo ? (
        <video
          className="h-full w-full object-cover"
          style={{ objectPosition }}
          autoPlay
          muted
          loop
          playsInline
          poster={poster?.src}
          onError={() => setVideoFailed(true)}
          aria-label={imageAlt}
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : (
        <Picture
          src={image}
          alt={imageAlt}
          sizes="(min-width: 1024px) 480px, 100vw"
          loading="eager"
          objectPosition={objectPosition}
          className="h-full w-full"
          fallbackLabel="[HOVEDBILDE: prosjektbil i verkstedet]"
        />
      )}
    </div>
  );
}
