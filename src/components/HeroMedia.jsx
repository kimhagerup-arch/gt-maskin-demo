import { useEffect, useState } from "react";
import { useAfterLoad } from "../hooks/useAfterLoad";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { cx } from "../lib/format";
import Picture from "./Picture";

/** true når brukeren har bedt om å spare data (Save-Data). */
function savesData() {
  if (typeof navigator === "undefined") return false;
  return Boolean(navigator.connection?.saveData);
}

/**
 * Hero-medie (brukes som bakgrunn i PageHero på /deler). Posteren (stillbildet)
 * er LCP-elementet og vises med en gang. Hvis `video` er satt, monteres en stum,
 * loopende mp4 over posteren først etter window load, og ikke ved
 * prefers-reduced-motion eller Save-Data. Videoen tones inn når første bilde er
 * klart, så posteren aldri blinker. Feiler videoen, blir posteren stående.
 */
export default function HeroMedia({
  image,
  imageAlt = "",
  video,
  className,
  imgClassName = "h-full w-full object-cover",
  sizes = "100vw",
  objectPosition = "50% 50%",
}) {
  const reduced = useReducedMotion();
  const loaded = useAfterLoad();
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [saveData, setSaveData] = useState(false);

  useEffect(() => {
    setSaveData(savesData());
  }, []);

  const showVideo = Boolean(video) && loaded && !reduced && !saveData && !videoFailed;

  return (
    <div className={cx("relative overflow-hidden bg-brand-primary-soft", className)}>
      <Picture
        src={image}
        alt={imageAlt}
        sizes={sizes}
        priority
        objectPosition={objectPosition}
        className="h-full w-full"
        imgClassName={imgClassName}
        fallbackLabel=""
      />
      {showVideo && (
        <video
          className={cx(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            videoReady ? "opacity-100" : "opacity-0",
          )}
          style={{ objectPosition }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          onPlaying={() => setVideoReady(true)}
          onError={() => setVideoFailed(true)}
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={video} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
