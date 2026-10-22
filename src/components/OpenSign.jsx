import { useEffect, useState } from "react";
import { header } from "../data/siteContent";
import { cx } from "../lib/format";
import { openStatus } from "../lib/openingHours";
import { useVegas } from "../lib/vegas";

const TICK_MS = 60_000;

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
  const [status, setStatus] = useState(() => openStatus());

  useEffect(() => {
    const timer = window.setInterval(() => setStatus(openStatus()), TICK_MS);
    return () => window.clearInterval(timer);
  }, []);

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
