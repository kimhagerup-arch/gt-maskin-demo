import { cx } from "../lib/format";

/**
 * Kicker med strek, H2 og valgfri ingress eller høyre-slot (lenke/knapp).
 * tone: "dark" på mørk flate, "light" på lys flate.
 */
export default function SectionHeader({
  kicker,
  title,
  lead,
  aside,
  tone = "dark",
  as: Heading = "h2",
  className,
  titleClassName,
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cx(
        "flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-12",
        className,
      )}
    >
      <div className="flex flex-col gap-3 md:gap-4">
        {kicker && (
          <p className={cx("kicker", dark ? "text-brand-accent-light" : "text-brand-accent-deep")}>
            {kicker}
          </p>
        )}
        <Heading
          className={cx(
            Heading === "h1" ? "h1-page" : "h2-section",
            dark ? "text-brand-text-inverse" : "text-brand-text",
            titleClassName,
          )}
        >
          {title}
        </Heading>
      </div>
      {lead && (
        <p
          className={cx(
            "max-w-[440px] text-base leading-relaxed md:text-[17px]",
            dark ? "text-brand-muted-inverse" : "text-brand-muted",
          )}
        >
          {lead}
        </p>
      )}
      {aside && <div className="min-w-0 md:max-w-[50%] md:shrink-0">{aside}</div>}
    </div>
  );
}
