import { Link, useLocation } from "react-router-dom";
import { language } from "../data/siteContent";
import { useLocale } from "../i18n/LocaleContext";
import { storeLocale, switchLocalePath } from "../i18n/locale";
import { cx } from "../lib/format";
import { NoFlag, UsFlag } from "./FlagIcon";

/**
 * Språkvelger med flagg: på norsk et lite USA-flagg med «EN», på engelsk et
 * norsk flagg med «NO». Bytte av språk beholder siden man står på, og valget
 * huskes i localStorage. Bruker react-routers Link direkte, siden målet
 * allerede er en ferdig sti med eller uten /en.
 */
export default function LangSwitch({ className, size = "md" }) {
  const { locale } = useLocale();
  const { pathname, search } = useLocation();
  const target = language.switchTo;
  const to = switchLocalePath(pathname, search, locale);
  const Flag = target.code === "en" ? UsFlag : NoFlag;

  return (
    <Link
      to={to}
      lang={target.code}
      hrefLang={target.code}
      aria-label={target.aria}
      onClick={() => storeLocale(target.code)}
      className={cx(
        "inline-flex items-center gap-2 rounded-pill border border-brand-border-dark-strong px-2.5 font-bold tracking-[0.08em] text-brand-text-inverse transition-colors hover:border-brand-accent-light hover:text-brand-accent-light",
        size === "md" ? "h-11 text-[13px]" : "h-12 text-[15px]",
        className,
      )}
    >
      <Flag className={size === "md" ? undefined : "h-4 w-[30px]"} />
      <span translate="no">{target.short}</span>
    </Link>
  );
}
