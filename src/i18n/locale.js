// Språk ut fra stien: norsk som standard, engelsk under /en med de samme stiene.
// Valgt språk huskes i localStorage (i try/catch), så den som har valgt engelsk
// og kommer inn på / sendes til /en.
import { DEFAULT_LOCALE } from "./localized";

export const EN_PREFIX = "/en";
const STORAGE_KEY = "gtm-sprak";

export function localeFromPath(pathname = "/") {
  return pathname === EN_PREFIX || pathname.startsWith(`${EN_PREFIX}/`) ? "en" : DEFAULT_LOCALE;
}

/** «/en/deler/bil» til «/deler/bil». Norske stier er uendret. */
export function stripLocale(pathname = "/") {
  if (pathname === EN_PREFIX) return "/";
  if (pathname.startsWith(`${EN_PREFIX}/`)) return pathname.slice(EN_PREFIX.length);
  return pathname;
}

/** Legger på /en når språket er engelsk. Eksterne lenker, ankre og tel/mailto er urørt. */
export function withLocale(to, locale) {
  if (typeof to !== "string") return to;
  if (!to.startsWith("/") || to.startsWith("//")) return to;
  if (locale !== "en") return to;
  if (to === EN_PREFIX || to.startsWith(`${EN_PREFIX}/`)) return to;
  return to === "/" ? EN_PREFIX : `${EN_PREFIX}${to}`;
}

/** Samme side på det andre språket. */
export function switchLocalePath(pathname, search, locale) {
  const bare = stripLocale(pathname);
  const target = locale === "en" ? bare : withLocale(bare, "en");
  return `${target}${search || ""}`;
}

export function readStoredLocale() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "en" || value === "nb" ? value : null;
  } catch {
    return null;
  }
}

export function storeLocale(locale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Lagring blokkert: valget gjelder bare denne visningen.
  }
}

/** true når nettleseren foretrekker engelsk (første språk i listen). */
export function browserPrefersEnglish() {
  if (typeof navigator === "undefined") return false;
  const first = navigator.languages?.[0] || navigator.language || "";
  return first.toLowerCase().startsWith("en");
}
