import { useEffect, useRef, useState } from "react";
import { getChannel } from "../data/channels";
import { videoSection } from "../data/siteContent";
import { cx } from "../lib/format";
import { getImage } from "../lib/images";
import Icon from "./Icon";
import Picture from "./Picture";
import VideoPoster from "./VideoPoster";

const FACEBOOK_PLUGIN = "https://www.facebook.com/plugins/video.php";
const YOUTUBE_EMBED = "https://www.youtube-nocookie.com/embed";
const FACEBOOK_REEL = /^https?:\/\/(?:www\.)?facebook\.com\/reel\/(\d+)/;
const EMBED_ALLOW = "autoplay; encrypted-media; picture-in-picture; fullscreen";

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

/**
 * Bygger embed-URL for kilder som kan bygges inn. Brukeren har allerede trykket
 * play når URL-en brukes, så autoplay og playsinline er alltid på. Snapchat kan
 * ikke bygges inn og gir null.
 */
export function embedUrl(video) {
  if (!video?.src) return null;
  if (video.source === "youtube") {
    return `${YOUTUBE_EMBED}/${encodeURIComponent(video.src)}?autoplay=1&playsinline=1&rel=0`;
  }
  if (video.source === "facebook") {
    const params = new URLSearchParams({
      href: facebookEmbedHref(video.src),
      show_text: "false",
      autoplay: "true",
    });
    return `${FACEBOOK_PLUGIN}?${params.toString()}`;
  }
  return null;
}

/** Diskret lasteindikator i merkefarger, vist på den mørke flaten til videoen er klar. */
function LoadingMark({ hidden }) {
  return (
    <div
      className={cx(
        "pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 transition-opacity duration-300",
        hidden ? "opacity-0" : "opacity-100",
      )}
      aria-hidden={hidden}
    >
      <span className="h-12 w-12 animate-spin rounded-full border-4 border-brand-border-dark-strong border-t-brand-accent" />
      <span className="text-[13px] font-semibold tracking-wider text-brand-muted-inverse">
        {videoSection.loading}
      </span>
    </div>
  );
}

/** Egen mp4: spilles direkte i en video-tag, inline, med kontroller. Tones inn når den spiller. */
function Mp4Player({ video, onReady, ready }) {
  const ref = useRef(null);
  const poster = getImage(video.poster);

  // autoPlay-attributtet holder i de fleste nettlesere; play() er sikring der
  // attributtet ignoreres etter at elementet ble montert av et trykk.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const attempt = el.play();
    if (attempt?.catch) attempt.catch(() => {});
  }, []);

  return (
    // biome-ignore lint/a11y/useMediaCaption: kundens videoer har ikke teksting ennå
    <video
      ref={ref}
      className={cx(
        "h-full w-full transition-opacity duration-300",
        ready ? "opacity-100" : "opacity-0",
      )}
      controls
      autoPlay
      playsInline
      preload="auto"
      poster={poster?.src}
      src={video.src}
      onLoadedData={onReady}
      onPlaying={onReady}
      aria-label={video.title}
    />
  );
}

/**
 * Hovedspilleren. Før trykk vises videoens eget stillbilde, eller en designet
 * poster (mørk flate, tittel, play) når den ikke har noe. Ingenting eksternt
 * lastes før brukeren trykker play.
 *
 * Ett trykk starter videoen: mp4 spilles direkte i en video-tag med playsinline,
 * YouTube får autoplay=1 og playsinline=1, Facebook-pluginen autoplay=true, alle
 * med allow="autoplay; encrypted-media; picture-in-picture; fullscreen". Mens
 * spilleren laster, vises en mørk flate i samme ramme med en diskret
 * lasteindikator, og iframen tones inn ved onLoad. Rammen har fast størrelse,
 * så ingenting flytter seg (stående: `.player-portrait`, liggende: 16:9).
 * Snapchat kan ikke bygges inn og lenker ut.
 */
export default function VideoPlayer({ video, className }) {
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const isSnapchat = video.source === "snapchat";
  const canPlay = Boolean(video.src) && !isSnapchat;
  const portrait = video.aspect === "9:16";

  const frameClass = cx(
    "relative mx-auto max-w-full overflow-hidden bg-brand-primary-soft",
    portrait ? "player-portrait aspect-[9/16]" : "player-landscape aspect-video w-full",
    className,
  );

  if (playing && canPlay) {
    const markReady = () => setReady(true);
    return (
      <div className={cx(frameClass, "bg-brand-primary")}>
        <LoadingMark hidden={ready} />
        {video.source === "mp4" ? (
          <Mp4Player video={video} onReady={markReady} ready={ready} />
        ) : (
          <iframe
            className={cx(
              "relative h-full w-full transition-opacity duration-300",
              ready ? "opacity-100" : "opacity-0",
            )}
            src={embedUrl(video)}
            title={video.title}
            allow={EMBED_ALLOW}
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={markReady}
          />
        )}
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
        <>
          <Picture
            src={video.poster}
            alt={video.posterAlt || ""}
            sizes={
              portrait ? "(min-width: 768px) 360px, 100vw" : "(min-width: 1280px) 1200px, 100vw"
            }
            className="h-full w-full"
            imgClassName={cx("h-full w-full object-cover", video.placeholder && "opacity-80")}
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-brand-primary/70 via-transparent to-transparent"
            aria-hidden="true"
          />
        </>
      ) : (
        <VideoPoster video={video} />
      )}

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
