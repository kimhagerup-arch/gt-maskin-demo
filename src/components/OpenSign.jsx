import { useEffect, useState } from "react";
import { header } from "../data/siteContent";
import { cx } from "../lib/format";
import { openStatus } from "../lib/openingHours";
import { useVegas } from "../lib/vegas";

const TICK_MS = 60_000;
const VISIBLE = "(min-width: 1280px)";

/** Skiltet vises fra 1280 px; på smalere skjermer regnes ingen status (skjult likevel). */
function initialStatus() {
  if (typeof window !== "undefined" && window.matchMedia?.(VISIBLE).matches) return openStatus();
  return null;
}

function fill(template, values) {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}

/**
 * Lite neonskilt ved telefonnummeret (fra 1280 px): lyser «ÅPEN» innenfor
 * åpningstidene i norsk tid, ellers står det slukket med «STENGT». Skjermlesere
 * får hele setningen («Åpent nå, stenger 16:00»). Oppdateres hvert minutt.
 * Fem raske trykk slår på Vegas-modus (lib/vegas.js).
 */
export default function OpenSign({ className }) {
  const t = header.openSign;
  const { tap } = useVegas();
  const [status, setStatus] = useState(initialStatus);

  // Status regnes bare når skiltet er synlig (fra 1280 px), så telefoner slipper
  // å lage Intl-formatteren med tidssone. Oppdateres hvert minutt.
  useEffect(() => {
    const mq = window.matchMedia?.(VISIBLE);
    const update = () => setStatus(mq && !mq.matches ? null : openStatus());
    mq?.addEventListener("change", update);
    const timer = window.setInterval(update, TICK_MS);
    return () => {
      mq?.removeEventListener("change", update);
      window.clearInterval(timer);
    };
  }, []);

  if (!status) return <span className={cx("open-sign is-closed", className)} aria-hidden="true" />;

  const dayLabel =
    status.daysAhead === 0
      ? t.today
      : status.daysAhead === 1
        ? t.tomorrow
        : t.days[status.nextOpenDay];
  const sentence = status.open
    ? fill(t.ariaOpen, { time: t.closesAt })
    : fill(t.ariaClosedToday, { day: dayLabel, time: t.opensAt });

  return (
    <button
      type="button"
      onClick={tap}
      className={cx(
        "open-sign inline-flex h-9 items-center px-2.5 font-display text-[15px] leading-none tracking-[0.16em]",
        status.open ? "is-open" : "is-closed",
        className,
      )}
      title={sentence}
    >
      <span className="sr-only">{sentence}</span>
      <span aria-hidden="true" translate="no">
        {status.open ? t.open : t.closed}
      </span>
    </button>
  );
}
