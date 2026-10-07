import { aboutSection } from "../data/siteContent";
import { team } from "../data/team";
import { timeline } from "../data/timeline";
import { cx } from "../lib/format";
import Picture from "./Picture";
import Placeholder from "./Placeholder";

/** Fire faktabokser. */
export function FactBoxes({ tone = "light", className }) {
  const dark = tone === "dark";
  return (
    <ul className={cx("grid grid-cols-2 gap-3 md:gap-4", className)}>
      {aboutSection.facts.map((fact) => (
        <li
          key={fact.value}
          className={cx(
            "flex flex-col gap-1 border px-4 py-4 md:px-[22px] md:py-5",
            dark
              ? "border-brand-border-dark bg-brand-primary-light"
              : "border-brand-border bg-brand-card",
          )}
        >
          <span className="font-display text-3xl leading-none md:text-[40px]">{fact.value}</span>
          <span
            className={cx(
              "text-sm font-semibold",
              dark ? "text-brand-muted-inverse" : "text-brand-muted",
            )}
          >
            {fact.label}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Tidslinje som rader. */
export function Timeline({ tone = "light", className }) {
  const dark = tone === "dark";
  return (
    <ol className={cx("flex flex-col", className)} aria-label={aboutSection.timelineLabel}>
      {timeline.map((item, i) => (
        <li
          key={`${item.year}-${i}`}
          className={cx(
            "flex gap-5 py-5",
            i < timeline.length - 1 &&
              (dark ? "border-b border-brand-border-dark" : "border-b border-brand-border"),
            i === 0 && "pt-0",
          )}
        >
          <span
            className={cx(
              "w-[72px] shrink-0 font-display text-[28px] leading-none",
              dark ? "text-brand-accent-light" : "text-brand-accent-deep",
            )}
          >
            {item.year}
          </span>
          <span
            className={cx(
              "text-base leading-snug",
              item.placeholder
                ? dark
                  ? "text-brand-muted-inverse"
                  : "text-brand-muted"
                : dark
                  ? "text-brand-text-inverse"
                  : "text-brand-text",
            )}
          >
            {item.text}
          </span>
        </li>
      ))}
    </ol>
  );
}

/** Monogram der portrett mangler for en verifisert person. */
function Monogram({ dark, name }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      className={cx(
        "flex h-full w-full items-center justify-center border",
        dark
          ? "border-brand-border-dark bg-brand-primary-light text-brand-accent-light"
          : "border-brand-border bg-brand-primary text-brand-accent-light",
      )}
      aria-hidden="true"
    >
      <span className="font-display text-5xl tracking-wide md:text-6xl">{initials}</span>
    </div>
  );
}

/**
 * Folkene: portrett, navn og rolle. `onlyVerified` viser bare personer som ikke
 * er plassholdere (forsiden). Verifisert person uten bilde får monogram,
 * plassholdere får plassholder for portrett (/om-oss).
 */
export function TeamGrid({ tone = "light", className, large = false, onlyVerified = false }) {
  const dark = tone === "dark";
  const people = onlyVerified ? team.filter((p) => !p.placeholder) : team;
  return (
    <ul
      className={cx(
        "grid gap-3 md:gap-4",
        people.length === 1 ? "grid-cols-1 sm:max-w-[240px]" : "grid-cols-3",
        className,
      )}
    >
      {people.map((person, i) => (
        <li key={`${person.name}-${i}`} className="flex flex-col gap-2.5">
          <div className={cx("overflow-hidden", large ? "aspect-[4/5]" : "aspect-[5/4]")}>
            {person.image ? (
              <Picture
                src={person.image}
                alt={person.name}
                sizes="(min-width: 768px) 200px, 33vw"
                className="h-full w-full"
                tone={tone}
              />
            ) : person.placeholder ? (
              <Placeholder
                tone={tone}
                label={aboutSection.page.portraitLabel}
                className="h-full w-full text-xs"
              />
            ) : (
              <Monogram dark={dark} name={person.name} />
            )}
          </div>
          <span
            className={cx(
              "text-sm font-bold md:text-base",
              dark ? "text-brand-text-inverse" : "text-brand-text",
            )}
          >
            {person.name}
          </span>
          <span
            className={cx(
              "-mt-1.5 text-[13px]",
              dark ? "text-brand-muted-inverse" : "text-brand-muted",
            )}
          >
            {person.role}
          </span>
        </li>
      ))}
    </ul>
  );
}
