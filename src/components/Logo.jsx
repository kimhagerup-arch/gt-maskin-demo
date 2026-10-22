import { companyFacts } from "../data/companyFacts";
import { Link } from "../i18n/LocaleLink";
import { cx } from "../lib/format";
import { getImage } from "../lib/images";

const LOGO_KEY = "/images/logo/gt-maskin-logo";

/**
 * Logo (trimmet, gjennomsiktig bakgrunn) ved siden av tekstmerket.
 * Uten logofil vises et monogram i aksentfarge. Logoen hentes med lav prioritet
 * så den ikke konkurrerer med hero-bildet (LCP) om båndbredden ved første last.
 */
export default function Logo({ size = "md", showTagline = true, className, linkClassName }) {
  const image = getImage(LOGO_KEY);
  const box = size === "sm" ? "h-12 w-12" : "h-12 w-12 md:h-14 md:w-14";
  const wordmark =
    size === "sm"
      ? "text-[24px] tracking-[0.08em]"
      : "text-[24px] tracking-[0.08em] md:text-[28px]";

  return (
    <Link
      to="/"
      className={cx(
        "inline-flex items-center gap-2.5 text-brand-text-inverse md:gap-3",
        linkClassName,
      )}
    >
      {image ? (
        <picture>
          <source type="image/webp" srcSet={`${LOGO_KEY}-128.webp 1x, ${LOGO_KEY}-256.webp 2x`} />
          <img
            src={`${LOGO_KEY}-128.png`}
            srcSet={`${LOGO_KEY}-128.png 1x, ${LOGO_KEY}-256.png 2x`}
            width={image.sizes[0].w}
            height={image.sizes[0].h}
            alt=""
            className={cx("shrink-0 object-contain", box, className)}
            decoding="async"
            fetchpriority="low"
          />
        </picture>
      ) : (
        <span
          className={cx(
            "flex shrink-0 items-center justify-center bg-brand-accent font-display text-[26px] text-brand-primary",
            box,
          )}
          aria-hidden="true"
        >
          GT
        </span>
      )}
      <span className="flex flex-col gap-0.5 leading-none md:gap-1" translate="no">
        <span className={cx("font-display leading-none", wordmark)}>{companyFacts.wordmark}</span>
        {showTagline && (
          <span className="whitespace-nowrap text-[9px] font-semibold tracking-[0.15em] text-brand-muted-inverse sm:tracking-[0.25em] md:text-[11px]">
            {companyFacts.taglineParts[0]}
            <span className="hidden xs:inline"> · {companyFacts.taglineParts[1]}</span>
          </span>
        )}
      </span>
    </Link>
  );
}
