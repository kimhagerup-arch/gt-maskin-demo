// Tospråklig innhold uten å endre komponentene: hver datamodul i src/data/
// eksporterer en «tospråklig visning» av den norske og den engelske kilden
// (src/data/nb/ og src/data/en/, samme form). Visningen er et Proxy som leser
// fra den aktive språkkilden i det øyeblikket en egenskap hentes, så
// `partsSection.catalog.tabs.bil` gir norsk eller engelsk etter hva
// LocaleProvider har satt. Nøstede objekter og lister blir samme slags visning,
// og samme nb-objekt gir alltid samme proxy (WeakMap), så React-nøkler og
// useMemo-avhengigheter er stabile.
//
// Språket settes av LocaleProvider før barna rendres (og Layout er nøklet på
// språk, så hele treet rendres på nytt ved bytte). Hendelser som kjører
// etterpå leser samme verdi. Utenfor nettleseren (vite.config.js) er språket nb.

export const LOCALES = ["nb", "en"];
export const DEFAULT_LOCALE = "nb";

let activeLocale = DEFAULT_LOCALE;

export function setActiveLocale(locale) {
  activeLocale = locale === "en" ? "en" : DEFAULT_LOCALE;
}

export function getActiveLocale() {
  return activeLocale;
}

const cache = new WeakMap();

function isObject(value) {
  return value !== null && typeof value === "object";
}

/**
 * Tospråklig visning av to verdier med samme form. Mangler den engelske
 * verdien (eller er den ikke et objekt), brukes den norske.
 */
export function localized(nb, en) {
  if (!isObject(nb)) return nb;
  if (!isObject(en)) return nb;
  let byEn = cache.get(nb);
  if (!byEn) {
    byEn = new WeakMap();
    cache.set(nb, byEn);
  }
  const hit = byEn.get(en);
  if (hit) return hit;

  const proxy = new Proxy(nb, {
    get(target, prop) {
      const source = activeLocale === "en" ? en : target;
      const value = Reflect.get(source, prop);
      if (typeof value === "function") return value;
      if (isObject(value) && typeof prop === "string") {
        return localized(target[prop], en[prop]);
      }
      if (value === undefined && activeLocale === "en") return Reflect.get(target, prop);
      return value;
    },
  });
  byEn.set(en, proxy);
  return proxy;
}
