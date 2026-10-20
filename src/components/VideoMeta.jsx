import { videoSection } from "../data/siteContent";
import { cx, formatDate } from "../lib/format";
import Icon from "./Icon";
import { SourceMark } from "./SocialMarks";

const SOURCE_LABEL = {
  youtube: "YouTube",
  facebook: "Facebook",
  snapchat: "Snapchat",
  mp4: "",
};

/** Kildeetikett med lite merke: «Facebook» får det blå f-merket, Snapchat spøkelset. */
export function SourceLabel({ source, className }) {
  const label = SOURCE_LABEL[source];
  if (!label) return null;
  return (
    <span className={cx("inline-flex items-center gap-1.5", className)}>
      <SourceMark source={source} size={16} />
      {label}
    </span>
  );
}

/**
 * Tittel, kilde, varighet og dato for en video, pluss «Se på Facebook» når
 * videoen ligger der. Felter som er null skjules. `compact` brukes i kortene.
 */
export default function VideoMeta({ video, compact = false, className }) {
  const date = video.date ? formatDate(video.date, video.date) : null;
  const parts = [video.duration, date].filter(Boolean);
  const facebookHref = video.source === "facebook" && video.src ? video.src : null;

  if (compact) {
    return (
      <span className={cx("flex min-w-0 flex-col gap-1", className)}>
        <span className="truncate text-[15px] font-bold text-brand-text-inverse">
          {video.title}
        </span>
        <span className="flex flex-wrap items-center gap-x-2 text-[13px] text-brand-muted-inverse">
          <SourceLabel source={video.source} />
          {parts.map((part) => (
            <span key={part}>{part}</span>
          ))}
        </span>
      </span>
    );
  }

  return (
    <div className={cx("flex flex-col gap-3", className)}>
      <div className="flex flex-col gap-1.5">
        <p className="text-lg font-bold text-brand-text-inverse md:text-2xl">{video.title}</p>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-brand-muted-inverse">
          <SourceLabel source={video.source} />
          {parts.map((part) => (
            <span key={part}>{part}</span>
          ))}
          {video.placeholder && (
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-accent-light">
              {videoSection.placeholderTag}
            </span>
          )}
        </p>
      </div>
      {facebookHref && (
        <a
          href={facebookHref}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline self-start border-brand-accent-light text-brand-text-inverse hover:text-brand-accent-light"
        >
          {videoSection.seeOnFacebook}
          <Icon name="ExternalLink" size={16} strokeWidth={2.2} />
        </a>
      )}
    </div>
  );
}
