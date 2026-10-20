import { feedSection } from "../data/siteContent";
import { cx, formatDate, formatNumber } from "../lib/format";
import Icon from "./Icon";
import Picture from "./Picture";
import Placeholder from "./Placeholder";
import { SourceMark } from "./SocialMarks";

/** Plattformer uten eget merke i SocialMarks får et lucide-ikon. Facebook får det blå merket. */
const PLATFORM_ICON = {
  instagram: "Images",
  youtube: "Video",
};

const MEDIA_LABEL = {
  video: "Video",
  reel: "Reel",
};

/** Tekster lengre enn dette klippes til fire linjer og får «Les mer»-lenke. */
const LONG_CAPTION = 180;

/**
 * Ett feed-kort. Blind for kilde: leser bare feltene i socialFeed-objektet.
 * Lange tekster klippes visuelt til fire linjer, lenken går til innlegget.
 */
export default function FeedCard({ post, channelName }) {
  const isVideo = post.mediaType === "video" || post.mediaType === "reel";
  const isCarousel = post.mediaType === "carousel";
  const imageKey = post.mediaUrl || post.poster || post.placeholderImage;
  const hasReactions = post.likes != null || post.comments != null;
  const mediaLabel = MEDIA_LABEL[post.mediaType];
  const isLong = (post.caption || "").length > LONG_CAPTION;

  return (
    <article className="flex h-full flex-col border border-brand-border bg-brand-card transition-colors hover:border-brand-accent">
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-surface">
        {imageKey ? (
          <Picture
            src={imageKey}
            alt={
              post.placeholder
                ? `Eksempel: ${post.placeholderLabel}`
                : post.caption?.slice(0, 80) || ""
            }
            sizes="(min-width: 1024px) 384px, (min-width: 768px) 50vw, 100vw"
            className="h-full w-full"
            imgClassName={cx("h-full w-full object-cover", post.placeholder && "saturate-[.85]")}
            tone="light"
            fallbackLabel="[Bilde fra innlegg]"
          />
        ) : (
          <Placeholder
            tone="light"
            label={post.placeholderLabel || "[Bilde fra innlegg]"}
            className="h-full w-full"
          />
        )}

        {post.placeholder && (
          <span className="absolute left-0 top-0 bg-brand-primary px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-accent-light">
            {feedSection.placeholderTag}
          </span>
        )}

        {mediaLabel && (
          <span className="absolute right-0 top-0 flex items-center gap-1.5 bg-brand-primary/90 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-brand-text-inverse">
            <Icon name="Video" size={13} strokeWidth={2} />
            {mediaLabel}
          </span>
        )}

        {isCarousel && (
          <span
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center bg-brand-primary/90 text-brand-text-inverse"
            title={feedSection.moreImages}
          >
            <Icon name="Images" size={16} strokeWidth={2} />
            <span className="sr-only">{feedSection.moreImages}</span>
          </span>
        )}

        {isVideo && (
          <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-accent text-brand-primary shadow-lg">
              <Icon name="Play" size={26} strokeWidth={0} className="ml-1 fill-current" />
            </span>
          </span>
        )}

        {post.placeholder && post.placeholderLabel && (
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-primary/90 to-transparent px-4 pb-3 pt-8 text-sm font-semibold text-brand-text-inverse">
            {post.placeholderLabel}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2.5 px-5 py-5 md:px-6">
        <p className="flex items-center gap-2 text-[13px] font-bold tracking-[0.06em] text-brand-muted">
          {PLATFORM_ICON[post.platform] ? (
            <Icon name={PLATFORM_ICON[post.platform]} size={16} strokeWidth={2} />
          ) : (
            <SourceMark source="facebook" size={18} />
          )}
          <span className="uppercase">{channelName}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.date || undefined}>
            {formatDate(post.date, feedSection.dateFallback)}
          </time>
        </p>
        <p className="line-clamp-4 whitespace-pre-line text-[15px] leading-relaxed text-brand-text">
          {post.caption}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-2 text-[13px] text-brand-muted">
          {hasReactions ? (
            <span className="flex items-center gap-3">
              {post.likes != null && (
                <span className="inline-flex items-center gap-1">
                  <Icon name="Heart" size={14} strokeWidth={2} />
                  {formatNumber(post.likes)}
                </span>
              )}
              {post.comments != null && (
                <span className="inline-flex items-center gap-1">
                  <Icon name="MessageCircle" size={14} strokeWidth={2} />
                  {formatNumber(post.comments)}
                </span>
              )}
            </span>
          ) : (
            <span />
          )}
          <a
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-brand-text transition-colors hover:text-brand-accent-deep"
          >
            {isLong ? feedSection.readMore : feedSection.openPost}
            <Icon name="ExternalLink" size={14} strokeWidth={2} />
          </a>
        </div>
      </div>
    </article>
  );
}
