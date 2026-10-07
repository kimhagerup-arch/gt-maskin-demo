import { videoSection } from "../data/siteContent";
import { cx, formatDate } from "../lib/format";

const SOURCE_LABEL = {
  youtube: "YouTube",
  facebook: "Facebook",
  snapchat: "Snapchat",
  mp4: "",
};

/** Tittel, varighet, dato og kilde under en video. Felter som er null skjules. */
export default function VideoMeta({ video, className, titleClassName }) {
  const date = video.date ? formatDate(video.date, video.date) : null;
  const parts = [video.duration, date, SOURCE_LABEL[video.source]].filter(Boolean);
  return (
    <p
      className={cx(
        "flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-brand-muted-inverse",
        className,
      )}
    >
      <span className={cx("font-semibold text-brand-text-inverse", titleClassName)}>
        {video.title}
      </span>
      {parts.map((part) => (
        <span key={part}>{part}</span>
      ))}
      {video.placeholder && (
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-accent-light">
          {videoSection.placeholderTag}
        </span>
      )}
    </p>
  );
}
