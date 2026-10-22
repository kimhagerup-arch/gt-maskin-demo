import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { installApp } from "../data/siteContent";
import { useInstallPrompt } from "../hooks/useInstallPrompt";
import { stripLocale } from "../i18n/locale";
import { cx } from "../lib/format";
import Icon from "./Icon";
import { InstallDialog } from "./InstallButton";

const STORAGE_KEY = "gtm-app-boks-lukket";
const SNOOZE_DAYS = 14;
const DELAY_MS = 20000;
const MOBILE = "(max-width: 767px)";
/** Ruter der boksen aldri vises (skjemaer som brukeren er midt i). */
const QUIET_PATHS = ["/kasse", "/bestill"];

function snoozed() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    return Date.now() - Number(raw) < SNOOZE_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

function snooze() {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    // Ingen lagring tilgjengelig, boksen vises igjen neste gang.
  }
}

function formHasFocus() {
  const el = document.activeElement;
  return Boolean(el?.closest?.("form"));
}

/**
 * Liten boks som dukker opp av seg selv på mobil: «Legg GT Maskin på hjemskjermen».
 * Vises etter 20 sekunder på siden, eller når brukeren har rullet forbi halve
 * siden, det som kommer først. Ikke på /kasse og /bestill, ikke mens et skjema
 * har fokus, ikke når siden kjører som app, og bare når nettleseren kan
 * installere (Android/Chrome: beforeinstallprompt har kommet) eller er iPhone/iPad
 * (veiledning). «Ikke nå» eller lukk gir 14 dagers pause (localStorage).
 * Ligger fast over bunnlinjen («Ring» og «Bestill time»), flytter ikke innholdet,
 * fanger ikke fokus, og kan lukkes med Escape.
 */
export default function InstallPrompt() {
  const { standalone, canPrompt, ios, prompt } = useInstallPrompt();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const addRef = useRef(null);

  const eligible =
    !standalone &&
    !dismissed &&
    (canPrompt || ios) &&
    !QUIET_PATHS.some((p) => stripLocale(location.pathname).startsWith(p));

  // Vent på tid eller rulling, og vis boksen når vilkårene holder.
  useEffect(() => {
    if (!eligible || open) return undefined;
    if (snoozed() || !window.matchMedia(MOBILE).matches) return undefined;
    let timer = 0;
    const tryShow = () => {
      if (formHasFocus()) {
        timer = window.setTimeout(tryShow, 5000);
        return;
      }
      setOpen(true);
    };
    const onScroll = () => {
      const doc = document.documentElement;
      if (window.scrollY + window.innerHeight >= doc.scrollHeight / 2) {
        window.removeEventListener("scroll", onScroll);
        window.clearTimeout(timer);
        tryShow();
      }
    };
    timer = window.setTimeout(tryShow, DELAY_MS);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [eligible, open]);

  // Skjul igjen hvis et skjema får fokus mens boksen står, og lukk med Escape.
  useEffect(() => {
    if (!open) return undefined;
    const onFocus = () => {
      if (formHasFocus()) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("focusin", onFocus);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("keydown", onKey);
    };
  });

  const close = () => {
    snooze();
    setOpen(false);
    setDismissed(true);
  };

  const add = async () => {
    if (canPrompt) {
      const outcome = await prompt();
      if (outcome === "accepted") {
        setOpen(false);
        setDismissed(true);
      } else {
        close();
      }
      return;
    }
    setOpen(false);
    setDialogOpen(true);
  };

  if (!eligible) return null;

  return (
    <>
      {open && (
        <section
          aria-label={installApp.boxTitle}
          className={cx(
            "fixed inset-x-3 bottom-[68px] z-30 flex items-start gap-3 border border-brand-border-dark-strong bg-brand-primary-light p-4 text-brand-text-inverse shadow-2xl shadow-brand-primary-dark/80 animate-fade-in md:hidden",
          )}
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill bg-brand-accent text-brand-primary">
            <Icon name="Smartphone" size={22} strokeWidth={2} />
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="flex flex-col gap-0.5 pr-8">
              <p className="text-[15px] font-bold leading-snug">{installApp.boxTitle}</p>
              <p className="text-[13px] leading-snug text-brand-muted-inverse">
                {installApp.boxText}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                ref={addRef}
                type="button"
                onClick={add}
                className="inline-flex h-10 items-center justify-center rounded-button bg-brand-accent px-4 text-[14px] font-bold text-brand-primary transition-colors hover:bg-brand-accent-hover"
              >
                {installApp.add}
              </button>
              <button
                type="button"
                onClick={close}
                className="inline-flex h-10 items-center justify-center rounded-button border-[1.5px] border-brand-outline px-4 text-[14px] font-bold text-brand-text-inverse transition-colors hover:border-brand-muted-inverse"
              >
                {installApp.notNow}
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={close}
            className="absolute right-1.5 top-1.5 flex h-9 w-9 items-center justify-center rounded-pill text-brand-muted-inverse transition-colors hover:text-brand-text-inverse"
            aria-label={installApp.close}
          >
            <Icon name="X" size={18} strokeWidth={2} />
          </button>
        </section>
      )}
      <InstallDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          close();
        }}
        returnFocusRef={addRef}
      />
    </>
  );
}
