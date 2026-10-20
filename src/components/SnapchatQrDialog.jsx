import { useEffect, useRef } from "react";
import { getChannel } from "../data/channels";
import { socialLinks } from "../data/siteContent";
import Icon from "./Icon";
import Picture from "./Picture";
import { SnapchatMark } from "./SocialMarks";

/**
 * Liten dialog med Snapchat-QR og lenke til profilen, brukt på desktop der
 * telefonen gjerne ligger ved siden av. Escape og klikk utenfor lukker.
 * Fokus flyttes inn ved åpning og tilbake til knappen som åpnet ved lukking.
 */
export default function SnapchatQrDialog({ open, onClose, returnFocusRef }) {
  const closeRef = useRef(null);
  const panelRef = useRef(null);
  const snapchat = getChannel("snapchat");

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

  if (!open || !snapchat?.qrImage) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-brand-primary/80 animate-fade-in"
        onClick={onClose}
        aria-label={socialLinks.qrDialogClose}
        tabIndex={-1}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="snapchat-qr-tittel"
        className="relative flex w-full max-w-xs flex-col items-center gap-4 border border-brand-border-dark bg-brand-primary-light p-6 text-center text-brand-text-inverse animate-fade-in"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-pill text-brand-muted-inverse transition-colors hover:bg-brand-primary hover:text-brand-text-inverse"
          aria-label={socialLinks.qrDialogClose}
        >
          <Icon name="X" size={20} strokeWidth={2} />
        </button>
        <span className="mt-4 flex h-14 w-14 items-center justify-center rounded-pill bg-brand-snapchat">
          <SnapchatMark size={32} />
        </span>
        <h2 id="snapchat-qr-tittel" className="text-lg font-bold">
          {socialLinks.qrDialogTitle}
        </h2>
        <div className="h-44 w-44 rounded-field bg-brand-snapchat p-1.5">
          <Picture
            src={snapchat.qrImage}
            alt={snapchat.qrAlt}
            sizes="176px"
            imgClassName="h-full w-full object-contain"
            tone="light"
            fallbackLabel="[QR]"
          />
        </div>
        {snapchat.username && (
          <p className="text-sm text-brand-muted-inverse">@{snapchat.username}</p>
        )}
        {snapchat.url && (
          <a
            href={snapchat.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-button bg-brand-snapchat px-4 text-sm font-bold text-brand-on-snapchat transition-[filter] hover:brightness-95"
          >
            <SnapchatMark size={16} />
            {socialLinks.snapchatOpen}
            <Icon name="ExternalLink" size={14} strokeWidth={2.2} />
          </a>
        )}
      </div>
    </div>
  );
}
