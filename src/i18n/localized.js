// Tospråklig innhold uten å endre komponentene: hver datamodul i src/data/
// eksporterer en «tospråklig visning» av den norske og den engelske kilden
// (src/data/nb/ og src/data/en/, samme form). Visningen er et Proxy på øverste
// nivå som leser fra den aktive språkkilden i det øyeblikket en egenskap hentes,
// så `partsSection.catalog.tabs.bil` gir norsk eller engelsk etter hva
// LocaleProvider har satt. Bare det øverste nivået går gjennom proxyen; det som
// hentes ut (objekter, lister, strenger) er de vanlige verdiene fra kilden, så
// resten av lesingen koster ingenting. scripts/check-i18n.mjs sørger for at
// begge kildene har samme form, så det aldri mangler en nøkkel på engelsk.
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

function isObject(value) {
  return value !== null && typeof value === "object";
}

/**
 * Tospråklig visning av to verdier med samme form. Mangler den engelske
 * verdien (eller er den ikke et objekt), brukes den norske.
 */
export function localized(nb, en) {
  if (!isObject(nb) || !isObject(en)) return nb;
  return new Proxy(nb, {
    get(target, prop) {
      if (activeLocale === "en") {
        const value = Reflect.get(en, prop);
        if (value !== undefined) return value;
      }
      return Reflect.get(target, prop);
    },
  });
}
