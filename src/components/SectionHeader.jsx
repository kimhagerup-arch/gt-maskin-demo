import { cx } from "../lib/format";

/**
 * Felles seksjonshode: kicker, tittel og ingress venstrejustert i én blokk
 * (ingressen maks ca. 60 tegn bred). Handlinger (knapper, tall, lenker) står
 * under ingressen på mobil, i full bredde, og fra md i en egen kolonne til
 * høyre som er bunnjustert mot tekstblokken og venstrejustert innad.
 * Aldri høyrejustert brødtekst. tone: "dark" på mørk flate, "light" på lys.
 */
export default function SectionHeader({
  kicker,
  title,
  lead,
  actions,
  tone = "dark",
  as: Heading = "h2",
  className,
  titleClassName,
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cx(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12",
        className,
      )}
    >
      <div className="flex min-w-0 flex-col gap-3 md:gap-4">
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
        {lead && (
          <p
            className={cx(
              "max-w-[60ch] text-base leading-relaxed md:text-[17px]",
              dark ? "text-brand-muted-inverse" : "text-brand-muted",
            )}
          >
            {lead}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex flex-col items-stretch gap-3 md:shrink-0 md:items-start">
          {actions}
        </div>
      )}
    </div>
  );
}
