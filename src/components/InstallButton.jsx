import { useEffect, useRef, useState } from "react";
import { installApp } from "../data/siteContent";
import { useInstallPrompt } from "../hooks/useInstallPrompt";
import { cx } from "../lib/format";
import Icon from "./Icon";

/** Liten dialog med veiledning for iPhone og iPad (Safari har ingen installeringsprompt). */
export function InstallDialog({ open, onClose, returnFocusRef }) {
  const closeRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => closeRef.current?.focus(), 30);
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll("a[href], button:not([disabled])");
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(timer);
      returnFocusRef?.current?.focus();
    };
  }, [open, onClose, returnFocusRef]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-brand-primary/80 animate-fade-in"
        onClick={onClose}
        aria-label={installApp.close}
        tabIndex={-1}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="installer-tittel"
        className="relative flex w-full max-w-xs flex-col items-center gap-4 border border-brand-border-dark bg-brand-primary-light p-6 text-center text-brand-text-inverse animate-fade-in"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-pill text-brand-muted-inverse transition-colors hover:bg-brand-primary hover:text-brand-text-inverse"
          aria-label={installApp.close}
        >
          <Icon name="X" size={20} strokeWidth={2} />
        </button>
        <span className="mt-4 flex h-14 w-14 items-center justify-center rounded-pill bg-brand-accent text-brand-primary">
          <Icon name="Smartphone" size={28} strokeWidth={2} />
        </span>
        <h2 id="installer-tittel" className="text-lg font-bold">
          {installApp.iosTitle}
        </h2>
        <ol className="flex flex-col gap-2 text-left text-sm text-brand-muted-inverse">
          {installApp.iosSteps.map((step, i) => (
            <li key={step} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-pill bg-brand-primary font-display text-base text-brand-accent-light">
                {i + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/**
 * «Legg GT Maskin på hjemskjermen». Android og Chrome: beforeinstallprompt og
 * nettleserens egen dialog. iPhone og iPad: liten dialog med veiledning.
 * Skjules når siden allerede kjører som app (display-mode: standalone), og i
 * nettlesere som verken har prompt eller er iOS.
 */
export default function InstallButton({ className, onDone }) {
  const { standalone, canPrompt, ios, prompt } = useInstallPrompt();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);

  if (standalone || (!canPrompt && !ios)) return null;

  const onClick = async () => {
    if (canPrompt) {
      const outcome = await prompt();
      if (outcome === "accepted") onDone?.();
      return;
    }
    setOpen(true);
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={onClick}
        className={cx(
          "inline-flex h-12 items-center justify-center gap-2.5 rounded-button border-[1.5px] border-brand-outline px-5 text-[15px] font-bold text-brand-text-inverse transition-colors hover:border-brand-accent-light hover:text-brand-accent-light",
          className,
        )}
      >
        <Icon name="Smartphone" size={18} strokeWidth={2} />
        {installApp.label}
      </button>
      <InstallDialog open={open} onClose={() => setOpen(false)} returnFocusRef={buttonRef} />
    </>
  );
}
