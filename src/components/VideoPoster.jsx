import { videoSection } from "../data/siteContent";
import { cx } from "../lib/format";
import Icon from "./Icon";
import { SourceMark } from "./SocialMarks";

/**
 * Designet poster for videoer uten eget stillbilde: mørk flate med stille
 * striper, kildemerke, tittel og play-ikon. Brukes i stedet for et tilfeldig
 * bilde, både i hovedspilleren og i kortene (`compact`). Play-ikonet tegnes av
 * den som bruker posteren (knappen ligger oppå), så her er bare flaten og teksten.
 */
export default function VideoPoster({ video, compact = false, className }) {
  return (
    <div
      className={cx(
        "relative flex h-full w-full flex-col justify-end overflow-hidden bg-brand-primary-light bg-stripes-dark text-brand-text-inverse",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/40 to-brand-primary/10"
        aria-hidden="true"
      />
      <div
        className={cx(
          "relative flex flex-col gap-2",
          compact ? "p-3 pb-3.5" : "p-5 pb-6 md:p-7 md:pb-8",
        )}
      >
        <span
          className={cx(
            "inline-flex items-center gap-1.5 font-bold uppercase tracking-[0.18em] text-brand-accent-light",
            compact ? "text-[10px]" : "text-[11px] md:text-xs",
          )}
        >
          <SourceMark source={video.source} size={compact ? 14 : 16} />
          {videoSection.posterKicker}
        </span>
        <span
          className={cx(
            "font-display leading-none tracking-wide",
            compact ? "text-xl" : "text-3xl md:text-5xl",
          )}
        >
          {video.title}
        </span>
      </div>
      <span className="pointer-events-none absolute right-3 top-3 text-brand-outline">
        <Icon name="Video" size={compact ? 16 : 22} strokeWidth={1.8} />
      </span>
    </div>
  );
}
