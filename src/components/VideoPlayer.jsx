import { useState } from "react";
import { videoSection } from "../data/siteContent";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { cx } from "../lib/format";
import { getImage } from "../lib/images";
import Icon from "./Icon";
import Picture from "./Picture";
import Placeholder from "./Placeholder";

const FACEBOOK_PLUGIN = "https://www.facebook.com/plugins/video.php";
const YOUTUBE_EMBED = "https://www.youtube-nocookie.com/embed";

/** Bygger embed-URL for kilder som kan bygges inn. Snapchat kan ikke og gir null. */
export function embedUrl(video, autoplay) {
  if (!video?.src) return null;
  const auto = autoplay ? 1 : 0;
  if (video.source === "youtube") {
    return `${YOUTUBE_EMBED}/${encodeURIComponent(video.src)}?autoplay=${auto}&rel=0`;
  }
  if (video.source === "facebook") {
    const params = new URLSearchParams({
      href: video.src,
      show_text: "false",
      autoplay: auto ? "true" : "false",
    });
    return `${FACEBOOK_PLUGIN}?${params.toString()}`;
  }
  return null;
}

/**
 * Én videospiller. Posteren er alltid et lokalt bilde, og ingenting eksternt
 * lastes før brukeren trykker play. Da monteres iframe (YouTube, Facebook)
 * eller <video> (mp4). Snapchat kan ikke bygges inn og lenker ut.
 * Rammen er alltid 16:9 så siden ikke flytter seg; stående video (9:16)
 * sentreres inne i rammen.
 */
export default function VideoPlayer({ video, sizes = "100vw", large = false, className }) {
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const isSnapchat = video.source === "snapchat";
  const canPlay = Boolean(video.src) && !isSnapchat;
  const portrait = video.aspect === "9:16";

  if (playing && canPlay) {
    const autoplay = !reduced;
    if (video.source === "mp4") {
      const poster = getImage(video.poster);
      return (
        <div className={cx("aspect-video w-full bg-black", className)}>
          {/* biome-ignore lint/a11y/useMediaCaption: kundens videoer har ikke teksting ennå */}
          <video
            className="h-full w-full"
            controls
            autoPlay={autoplay}
            preload="none"
            poster={poster?.src}
            src={video.src}
          />
        </div>
      );
    }
    return (
      <div className={cx("flex aspect-video w-full justify-center bg-black", className)}>
        <iframe
          className={cx("h-full", portrait ? "aspect-[9/16]" : "w-full")}
          src={embedUrl(video, autoplay)}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    );
  }

  const control = (
    <>
      <span
        className={cx(
          "flex items-center justify-center rounded-full bg-brand-accent text-brand-primary transition-transform",
          large ? "h-16 w-16 md:h-[88px] md:w-[88px]" : "h-14 w-14",
          canPlay || (isSnapchat && video.src) ? "group-hover:scale-105" : "opacity-80",
        )}
      >
        <Icon
          name={isSnapchat ? "ExternalLink" : "Play"}
          size={large ? 34 : 26}
          strokeWidth={isSnapchat ? 2.2 : 0}
          className={cx(!isSnapchat && "ml-1 fill-current")}
        />
      </span>
      <span
        className={cx(
          "max-w-md px-4 text-center font-semibold tracking-wider",
          large ? "text-[13px]" : "text-xs",
          video.placeholder ? "text-brand-placeholder" : "text-brand-text-inverse",
        )}
      >
        {isSnapchat ? videoSection.seeOnSnapchat : video.title}
      </span>
    </>
  );

  return (
    <div
      className={cx(
        "relative aspect-video w-full overflow-hidden border border-brand-border-dark bg-brand-primary-soft",
        className,
      )}
    >
      {video.poster ? (
        <Picture
          src={video.poster}
          alt={video.posterAlt || ""}
          sizes={sizes}
          className="h-full w-full"
          imgClassName={cx("h-full w-full object-cover", video.placeholder && "opacity-80")}
        />
      ) : (
        <Placeholder label="[Videoposter]" className="h-full w-full" />
      )}
      <div
        className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-transparent to-transparent"
        aria-hidden="true"
      />

      {video.placeholder && (
        <span className="absolute left-0 top-0 bg-brand-primary px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-accent-light">
          {videoSection.placeholderTag}
        </span>
      )}

      {isSnapchat && video.src ? (
        <a
          href={video.src}
          target="_blank"
          rel="noopener noreferrer"
          className="group absolute inset-0 flex flex-col items-center justify-center gap-4 text-brand-text-inverse"
          aria-label={`${videoSection.seeOnSnapchat}: ${video.title}`}
        >
          {control}
        </a>
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          disabled={!canPlay}
          aria-disabled={!canPlay}
          className="group absolute inset-0 flex flex-col items-center justify-center gap-4 text-brand-text-inverse"
          aria-label={
            isSnapchat ? videoSection.seeOnSnapchat : `${videoSection.play}: ${video.title}`
          }
        >
          {control}
        </button>
      )}
    </div>
  );
}
