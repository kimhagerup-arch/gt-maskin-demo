/** Formaterer pris med tusenskille. Plassholdere i klammer returneres uendret. */
export function formatPrice(value) {
  if (value === null || value === undefined) return "";
  const str = String(value).trim();
  if (str.startsWith("[")) return str;
  const num = Number(str.replace(/\s/g, ""));
  if (Number.isNaN(num)) return str;
  return new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 0 }).format(num);
}

/** Formaterer ISO-dato til «12. mars 2026». Plassholdere returneres uendret. */
export function formatDate(value, fallback = "") {
  if (!value) return fallback;
  const str = String(value);
  if (str.startsWith("[")) return str;
  const date = new Date(str);
  if (Number.isNaN(date.getTime())) return str;
  return new Intl.DateTimeFormat("nb-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/** Formaterer tall med tusenskille («1 023»). */
export function formatNumber(value) {
  if (value === null || value === undefined) return "";
  return new Intl.NumberFormat("nb-NO").format(Number(value));
}

/** Slår sammen klassenavn og hopper over tomme verdier. */
export function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}
