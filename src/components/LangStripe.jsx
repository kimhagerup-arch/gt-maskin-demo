import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { language } from "../data/siteContent";
import { useLocale } from "../i18n/LocaleContext";
import {
  browserPrefersEnglish,
  readStoredLocale,
  storeLocale,
  switchLocalePath,
} from "../i18n/locale";
import { UsFlag } from "./FlagIcon";
import Icon from "./Icon";

const STORAGE_KEY = "gtm-engelsk-stripe-lukket";

function readClosed() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * «View this site in English»: en liten, lukkbar stripe på norske sider ved
 * første besøk med engelsk nettleserspråk. Ingen omdirigering. Vises ikke når
 * språket allerede er valgt (localStorage) eller stripen er lukket. Tilstanden
 * leses synkront ved første render, så ingenting flytter seg.
 */
export default function LangStripe() {
  const { locale } = useLocale();
  const { pathname, search } = useLocation();
  const [closed, setClosed] = useState(
    () =>
      locale === "en" || readClosed() || readStoredLocale() !== null || !browserPrefersEnglish(),
  );

  if (closed) return null;

  const close = () => {
    setClosed(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Uten lagring lukkes stripen bare for denne visningen.
    }
  };

  return (
    <aside
      lang="en"
      aria-label={language.stripe.text}
      className="flex min-h-10 items-center justify-between gap-3 border-b border-brand-border-dark bg-brand-primary-light px-4 py-1.5 text-[13px] font-semibold text-brand-text-inverse md:px-6"
    >
      <Link
        to={switchLocalePath(pathname, search, locale)}
        hrefLang="en"
        onClick={() => storeLocale("en")}
        className="inline-flex min-w-0 items-center gap-2.5 hover:text-brand-accent-light"
      >
        <UsFlag />
        <span>{language.stripe.text}</span>
        <Icon name="ArrowRight" size={15} strokeWidth={2.2} className="shrink-0" />
      </Link>
      <button
        type="button"
        onClick={close}
        aria-label={language.stripe.close}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-pill text-brand-muted-inverse hover:text-brand-text-inverse"
      >
        <Icon name="X" size={16} strokeWidth={2.4} />
      </button>
    </aside>
  );
}
