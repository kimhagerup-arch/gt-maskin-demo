// Åpent eller stengt akkurat nå, regnet i norsk tid (Europe/Oslo) uansett hvor
// brukeren er. Åpningstidene er fra _kilder/FAKTA.md: mandag til fredag 08:30-16:00.
// Helligdager er ikke med (se BESLUTNINGER.md, runde 5b).

export const OPEN_DAYS = [1, 2, 3, 4, 5]; // mandag til fredag (0 = søndag)
export const OPENS_MINUTES = 8 * 60 + 30;
export const CLOSES_MINUTES = 16 * 60;

const WEEKDAYS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

/** Ukedag (0-6) og minutter siden midnatt i norsk tid. */
export function osloNow(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Oslo",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type) => parts.find((p) => p.type === type)?.value;
  const day = WEEKDAYS[get("weekday")] ?? now.getDay();
  const minutes = Number(get("hour")) * 60 + Number(get("minute"));
  return { day, minutes };
}

/**
 * { open, day, minutes, nextOpenDay, daysAhead }
 * nextOpenDay er ukedagen butikken åpner neste gang (bare når stengt),
 * daysAhead 0 = i dag, 1 = i morgen, ellers lenger fram.
 */
export function openStatus(now = new Date()) {
  const { day, minutes } = osloNow(now);
  const isOpenDay = OPEN_DAYS.includes(day);
  const open = isOpenDay && minutes >= OPENS_MINUTES && minutes < CLOSES_MINUTES;
  if (open) return { open: true, day, minutes, nextOpenDay: null, daysAhead: 0 };
  if (isOpenDay && minutes < OPENS_MINUTES) {
    return { open: false, day, minutes, nextOpenDay: day, daysAhead: 0 };
  }
  let ahead = 1;
  let next = (day + 1) % 7;
  while (!OPEN_DAYS.includes(next)) {
    next = (next + 1) % 7;
    ahead++;
  }
  return { open: false, day, minutes, nextOpenDay: next, daysAhead: ahead };
}
