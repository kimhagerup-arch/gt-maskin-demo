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
 * Én videospiller. Posteren er alltid et lokalt bilde, og ingenting eksternt
 * lastes før brukeren trykker play. Da monteres iframe (YouTube, Facebook)
 * eller <video> (mp4). Snapchat kan ikke bygges inn og lenker ut.
 *
 * Rammen har fast forhold så siden ikke flytter seg når video monteres:
 * - liggende video: 16:9.
 * - stående video (9:16) i stor spiller: 4:5 på mobil, 16:9 fra md. Posteren
 *   fyller rammen uskarpt bak, og selve videoen står skarp i en 9:16-kolonne
 *   midt i rammen, både før og etter klikk.
 * - stående video i kort og rutenett: rammen er 9:16.
 */
export default function VideoPlayer({ video, sizes = "100vw", large = false, className }) {
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const isSnapchat = video.source === "snapchat";
  const canPlay = Boolean(video.src) && !isSnapchat;
  const portrait = video.aspect === "9:16";
  const stage = portrait && large;

  const frameClass = cx(
    "relative w-full overflow-hidden bg-brand-primary-soft",
    stage ? "aspect-[4/5] md:aspect-video" : portrait ? "aspect-[9/16]" : "aspect-video",
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
        {stage && <Backdrop video={video} sizes={sizes} />}
        <div className="relative flex h-full w-full justify-center">
          <iframe
            className={cx("h-full", stage ? "aspect-[9/16]" : "w-full")}
            src={embedUrl(video, autoplay)}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
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

  const poster = video.poster ? (
    <Picture
      src={video.poster}
      alt={video.posterAlt || ""}
      sizes={stage ? "40vw" : sizes}
      className="h-full w-full"
      imgClassName={cx("h-full w-full object-cover", video.placeholder && "opacity-80")}
    />
  ) : (
    <Placeholder label="[Videoposter]" className="h-full w-full" />
  );

  return (
    <div className={cx(frameClass, "border border-brand-border-dark")}>
      {stage ? (
        <>
          <Backdrop video={video} sizes={sizes} />
          <div className="relative flex h-full w-full justify-center">
            <div className="aspect-[9/16] h-full overflow-hidden border-x border-brand-border-dark">
              {poster}
            </div>
          </div>
        </>
      ) : (
        poster
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

/** Uskarp, dempet utgave av posteren som fyller rammen bak en stående video. Kun lokalt bilde. */
function Backdrop({ video, sizes }) {
  if (!video.poster) return null;
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <Picture
        src={video.poster}
        alt=""
        sizes={sizes}
        className="h-full w-full"
        imgClassName="h-full w-full scale-110 object-cover opacity-40 blur-2xl"
      />
      <div className="absolute inset-0 bg-brand-primary/40" />
    </div>
  );
}
