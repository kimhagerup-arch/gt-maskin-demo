import { getActiveLocale } from "../i18n/localized";

const PLACEHOLDER = { nb: "[PRIS]", en: "[PRICE]" };

/**
 * Formaterer pris med valuta etter språk: «1 595 kr» på norsk, «NOK 1,595» på
 * engelsk. Plassholdere i klammer returneres på gjeldende språk.
 */
export function formatPrice(value) {
  if (value === null || value === undefined) return "";
  const str = String(value).trim();
  const locale = getActiveLocale();
  if (str.startsWith("["))
    return PLACEHOLDER[locale] && str === "[PRIS]" ? PLACEHOLDER[locale] : str;
  const num = Number(str.replace(/\s/g, ""));
  if (Number.isNaN(num)) return str;
  if (locale === "en") {
    return `NOK ${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(num)}`;
  }
  return `${new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 0 }).format(num)} kr`;
}

/** Formaterer ISO-dato til «12. mars 2026» eller «March 12, 2026». Plassholdere returneres uendret. */
export function formatDate(value, fallback = "") {
  if (!value) return fallback;
  const str = String(value);
  if (str.startsWith("[")) return str;
  const date = new Date(str);
  if (Number.isNaN(date.getTime())) return str;
  return new Intl.DateTimeFormat(getActiveLocale() === "en" ? "en-US" : "nb-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/** Formaterer tall med tusenskille («1 023» eller «1,023»). */
export function formatNumber(value) {
  if (value === null || value === undefined) return "";
  return new Intl.NumberFormat(getActiveLocale() === "en" ? "en-US" : "nb-NO").format(
    Number(value),
  );
}

/** Slår sammen klassenavn og hopper over tomme verdier. */
export function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}
