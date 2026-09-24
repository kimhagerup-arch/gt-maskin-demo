import { reviews } from "../data/reviews";
import { footer } from "../data/siteContent";
import { formatNumber } from "../lib/format";
import Icon from "./Icon";

const SOURCE_LABEL = {
  google: "Google-anmeldelser",
  facebook: "Facebook-anbefalinger",
};

/**
 * Badges for Google og Facebook. Rendrer ingenting når reviews.js er tom.
 * Viser kildens egen skala (4,8/5 eller 96 % anbefaler).
 */
export default function ReviewBadges({ className }) {
  if (!reviews.length) return null;

  return (
    <div className={className}>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-text-inverse">
        {footer.reviewsKicker}
      </p>
      <ul className="mt-3 flex flex-wrap gap-3">
        {reviews.map((r) => {
          const isPercent = r.scale === 100;
          const value = isPercent
            ? `${Math.round(r.rating)} %`
            : `${String(r.rating).replace(".", ",")}/${r.scale}`;
          return (
            <li key={r.source}>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 border border-brand-border-dark bg-brand-primary-light px-4 py-3 transition-colors hover:border-brand-accent-light"
              >
                <Icon
                  name={isPercent ? "ThumbsUp" : "Star"}
                  size={20}
                  strokeWidth={2}
                  className="text-brand-accent-light"
                />
                <span className="flex flex-col leading-tight">
                  <span className="font-display text-2xl text-brand-text-inverse">{value}</span>
                  <span className="text-xs text-brand-muted-inverse">
                    {SOURCE_LABEL[r.source] || r.source} · {formatNumber(r.count)}
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
