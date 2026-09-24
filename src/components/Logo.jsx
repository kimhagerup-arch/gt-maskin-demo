import { Link } from "react-router-dom";
import { companyFacts } from "../data/companyFacts";
import { cx } from "../lib/format";
import { getImage } from "../lib/images";

const LOGO_KEY = "/images/logo/gt-maskin-logo";

/**
 * Logo (trimmet, gjennomsiktig bakgrunn) ved siden av tekstmerket.
 * Uten logofil vises et monogram i aksentfarge.
 */
export default function Logo({ size = "md", showTagline = true, className, linkClassName }) {
  const image = getImage(LOGO_KEY);
  const box = size === "sm" ? "h-9 w-9" : "h-9 w-9 md:h-11 md:w-11";
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
      aria-label={`${companyFacts.name}, til forsiden`}
    >
      {image ? (
        <img
          src={`${LOGO_KEY}-128.png`}
          srcSet={`${LOGO_KEY}-128.png 1x, ${LOGO_KEY}-512.png 2x`}
          width={image.sizes[1]?.w || image.width}
          height={image.sizes[1]?.h || image.height}
          alt=""
          className={cx("shrink-0 object-contain", box, className)}
          decoding="async"
        />
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
      <span className="flex flex-col gap-0.5 leading-none md:gap-1">
        <span className={cx("font-display leading-none", wordmark)}>{companyFacts.wordmark}</span>
        {showTagline && (
          <span className="text-[9px] font-semibold tracking-[0.25em] text-brand-muted-inverse md:text-[11px]">
            {companyFacts.tagline}
          </span>
        )}
      </span>
    </Link>
  );
}
