import { createContext, useContext, useEffect, useLayoutEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { stripLocale, withLocale } from "./locale";
import { setActiveLocale } from "./localized";

const LocaleContext = createContext({ locale: "nb", isEn: false, path: (to) => to });

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Velger språk ut fra stien (se App.jsx: samme ruter under / og /en) og gjør
 * det aktivt for datamodulene før barna rendres. Setter html lang og
 * hreflang-lenker (nb, en og x-default) for siden man står på.
 */
export function LocaleProvider({ locale, children }) {
  setActiveLocale(locale);
  useIsomorphicLayoutEffect(() => {
    setActiveLocale(locale);
  }, [locale]);

  const { pathname, search } = useLocation();

  useEffect(() => {
    document.documentElement.lang = locale === "en" ? "en" : "nb";
    const bare = stripLocale(pathname) + (search || "");
    const origin = window.location.origin;
    const links = [
      ["nb", `${origin}${bare}`],
      ["en", `${origin}${withLocale(bare, "en")}`],
      ["x-default", `${origin}${bare}`],
    ];
    for (const el of document.head.querySelectorAll('link[rel="alternate"][hreflang]')) {
      el.remove();
    }
    for (const [lang, href] of links) {
      const el = document.createElement("link");
      el.rel = "alternate";
      el.hreflang = lang;
      el.href = href;
      document.head.appendChild(el);
    }
  }, [locale, pathname, search]);

  const value = useMemo(
    () => ({
      locale,
      isEn: locale === "en",
      path: (to) => withLocale(to, locale),
    }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}
