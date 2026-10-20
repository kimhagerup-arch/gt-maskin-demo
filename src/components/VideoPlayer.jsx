import { useState } from "react";
import { getChannel } from "../data/channels";
import { videoSection } from "../data/siteContent";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { cx } from "../lib/format";
import { getImage } from "../lib/images";
import Icon from "./Icon";
import Picture from "./Picture";
import Placeholder from "./Placeholder";

const FACEBOOK_PLUGIN = "https://www.facebook.com/plugins/video.php";
const YOUTUBE_EMBED = "https://www.youtube-nocookie.com/embed";
const FACEBOOK_REEL = /^https?:\/\/(?:www\.)?facebook\.com\/reel\/(\d+)/;

/** Sidens Facebook-handle, lest fra kanaldataene (facebook.com/<handle>). */
function facebookHandle() {
  const url = getChannel("facebook")?.url;
  if (!url) return null;
  return new URL(url).pathname.split("/").filter(Boolean)[0] || null;
}

/**
 * Reel-lenker (facebook.com/reel/<id>) spiller ikke i video-pluginen. Samme video
 * ligger på facebook.com/<side>/videos/<id>/, som pluginen godtar. Andre lenker beholdes.
 */
export function facebookEmbedHref(src) {
  const match = FACEBOOK_REEL.exec(src);
  const handle = facebookHandle();
  if (!match || !handle) return src;
  return `https://www.facebook.com/${handle}/videos/${match[1]}/`;
}

/** Bygger embed-URL for kilder som kan bygges inn. Snapchat kan ikke og gir null. */
export function embedUrl(video, autoplay) {
  if (!video?.src) return null;
  const auto = autoplay ? 1 : 0;
  if (video.source === "youtube") {
    return `${YOUTUBE_EMBED}/${encodeURIComponent(video.src)}?autoplay=${auto}&rel=0`;
  }
  if (video.source === "facebook") {
    const params = new URLSearchParams({
      href: facebookEmbedHref(video.src),
      show_text: "false",
      autoplay: auto ? "true" : "false",
    });
    return `${FACEBOOK_PLUGIN}?${params.toString()}`;
  }
  return null;
}

/**
 * Hovedspilleren. Posteren er alltid et lokalt bilde, og ingenting eksternt
 * lastes før brukeren trykker play. Da monteres iframe (YouTube, Facebook)
 * eller <video> (mp4). Snapchat kan ikke bygges inn og lenker ut.
 *
 * Rammen har fast størrelse så siden ikke flytter seg når video monteres:
 * - stående video (9:16): høyden styrer. Mobil maks 70 % av skjermhøyden,
 *   desktop maks 640 px og aldri høyere enn skjermen minus header
 *   (`.player-portrait` i index.css). Posteren fyller hele rammen.
 * - liggende video: full bredde i 16:9, med samme makshøyde på desktop.
 * Tittelen står ikke oppå bildet; den vises én gang ved siden av eller under
 * spilleren (VideoMeta).
 */
export default function VideoPlayer({ video, className }) {
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const isSnapchat = video.source === "snapchat";
  const canPlay = Boolean(video.src) && !isSnapchat;
  const portrait = video.aspect === "9:16";

  const frameClass = cx(
    "relative mx-auto max-w-full overflow-hidden bg-brand-primary-soft",
    portrait ? "player-portrait aspect-[9/16]" : "player-landscape aspect-video w-full",
    className,
  );

  if (playing && canPlay) {
    const autoplay = !reduced;
    if (video.source === "mp4") {
      const poster = getImage(video.poster);
      return (
        <div className={cx(frameClass, "bg-black")}>
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
      <div className={cx(frameClass, "bg-black")}>
        <iframe
          className="h-full w-full"
          src={embedUrl(video, autoplay)}
          title={video.title}
          allow="autoplay; encrypted-media; picture-in-picture"
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
          "flex h-16 w-16 items-center justify-center rounded-full bg-brand-accent text-brand-primary transition-transform md:h-20 md:w-20",
          canPlay || (isSnapchat && video.src) ? "group-hover:scale-105" : "opacity-80",
        )}
      >
        <Icon
          name={isSnapchat ? "ExternalLink" : "Play"}
          size={32}
          strokeWidth={isSnapchat ? 2.2 : 0}
          className={cx(!isSnapchat && "ml-1 fill-current")}
        />
      </span>
      {isSnapchat && (
        <span className="px-4 text-center text-[13px] font-semibold tracking-wider text-brand-text-inverse">
          {videoSection.seeOnSnapchat}
        </span>
      )}
    </>
  );

  return (
    <div className={cx(frameClass, "border border-brand-border-dark")}>
      {video.poster ? (
        <Picture
          src={video.poster}
          alt={video.posterAlt || ""}
          sizes={portrait ? "(min-width: 768px) 360px, 100vw" : "(min-width: 1280px) 1200px, 100vw"}
          className="h-full w-full"
          imgClassName={cx("h-full w-full object-cover", video.placeholder && "opacity-80")}
        />
      ) : (
        <Placeholder label="[Videoposter]" className="h-full w-full" />
      )}
      <div
        className="absolute inset-0 bg-gradient-to-t from-brand-primary/70 via-transparent to-transparent"
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
          aria-label={`${videoSection.play}: ${video.title}`}
        >
          {control}
        </button>
      )}
    </div>
  );
}
