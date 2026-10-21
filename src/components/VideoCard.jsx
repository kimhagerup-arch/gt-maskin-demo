import { videoSection } from "../data/siteContent";
import { useAfterLoad } from "../hooks/useAfterLoad";
import { cx } from "../lib/format";
import Icon from "./Icon";
import Picture from "./Picture";
import VideoMeta from "./VideoMeta";
import VideoPoster from "./VideoPoster";

/**
 * Kort i videolisten. Hele kortet er en knapp som laster videoen i
 * hovedspilleren. Aktivt kort markeres med aksentkant og «Spiller nå».
 * Stående video gir 9:16-kort, liggende 16:9. Miniatyrene monteres først når
 * siden er lastet, så de ikke konkurrerer med hero-bildet (boksen har fast forhold).
 * Video uten eget stillbilde får den designede posteren (mørk flate, tittel, play).
 */
export default function VideoCard({ video, active = false, onSelect }) {
  const ready = useAfterLoad();
  const portrait = video.aspect === "9:16";
  const isSnapchat = video.source === "snapchat";
  return (
    <li
      className={cx(
        "shrink-0 snap-start",
        portrait ? "w-[44%] sm:w-[30%] md:w-[208px]" : "w-[78%] sm:w-[46%] md:w-[320px]",
      )}
    >
      <button
        type="button"
        onClick={() => onSelect(video.id)}
        aria-pressed={active}
        className={cx(
          "group flex w-full flex-col gap-2.5 border p-2 text-left transition-colors",
          active
            ? "border-brand-accent bg-brand-primary-light"
            : "border-brand-border-dark bg-brand-primary-light hover:border-brand-accent-light",
        )}
      >
        <span
          className={cx(
            "relative block w-full overflow-hidden bg-brand-primary-soft",
            portrait ? "aspect-[9/16]" : "aspect-video",
          )}
        >
          {video.poster && ready ? (
            <Picture
              src={video.poster}
              alt=""
              sizes={portrait ? "(min-width: 768px) 208px, 44vw" : "(min-width: 768px) 320px, 78vw"}
              className="h-full w-full"
              imgClassName={cx(
                "h-full w-full object-cover transition-opacity",
                active ? "opacity-70" : "opacity-90 group-hover:opacity-100",
              )}
            />
          ) : video.poster ? (
            <span className="block h-full w-full bg-brand-primary-soft" aria-hidden="true" />
          ) : (
            <VideoPoster video={video} compact />
          )}
          <span className="absolute inset-0 flex items-center justify-center text-brand-text-inverse">
            <span
              className={cx(
                "flex h-11 w-11 items-center justify-center rounded-full",
                active ? "bg-brand-accent text-brand-primary" : "bg-brand-primary/70",
              )}
            >
              <Icon
                name={isSnapchat ? "ExternalLink" : "Play"}
                size={20}
                strokeWidth={isSnapchat ? 2.2 : 0}
                className={cx(!isSnapchat && "ml-0.5 fill-current")}
              />
            </span>
          </span>
          {active && (
            <span className="absolute left-0 top-0 bg-brand-accent px-2 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-primary">
              {videoSection.nowPlaying}
            </span>
          )}
          {video.placeholder && (
            <span className="absolute left-0 top-0 bg-brand-primary px-2 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-accent-light">
              {videoSection.placeholderTag}
            </span>
          )}
        </span>
        <VideoMeta video={video} compact className="px-1 pb-1" />
      </button>
    </li>
  );
}
