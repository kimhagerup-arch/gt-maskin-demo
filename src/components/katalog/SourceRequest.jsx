import { partsSection } from "../../data/siteContent";
import { cx } from "../../lib/format";
import Button from "../Button";

/** Lenke til kontaktskjemaet med vare og bil ferdig utfylt. */
export function requestLink({ item, vehicle } = {}) {
  const params = new URLSearchParams();
  if (item) params.set("vare", item);
  if (vehicle) params.set("bil", vehicle);
  const q = params.toString();
  return q ? `/kontakt?${q}` : "/kontakt";
}

/**
 * «Fant du ikke delen? Vi skaffer den». Står under hver vareliste og erstatter
 * listen når den er tom, med deltype (eller søket) og bil ferdig utfylt.
 */
export default function SourceRequest({ item, vehicle, ctaLabel, className, tone = "light" }) {
  const c = partsSection.catalog.source;
  const dark = tone === "dark";
  return (
    <div
      className={cx(
        "flex flex-col gap-4 border p-5 sm:flex-row sm:items-center sm:justify-between md:p-6",
        dark
          ? "border-brand-border-dark bg-brand-primary-light text-brand-text-inverse"
          : "border-brand-border bg-brand-card text-brand-text",
        className,
      )}
    >
      <div className="flex flex-col gap-1">
        <p className="text-lg font-bold md:text-[20px]">{c.title}</p>
        <p className={cx("text-sm", dark ? "text-brand-muted-inverse" : "text-brand-muted")}>
          {c.text}
        </p>
      </div>
      <Button
        to={requestLink({ item, vehicle })}
        variant={dark ? "primary" : "dark"}
        size="sm"
        arrow
        className="shrink-0 self-start sm:self-auto"
      >
        {ctaLabel || c.cta}
      </Button>
    </div>
  );
}
