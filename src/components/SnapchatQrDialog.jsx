import { useEffect, useRef } from "react";
import { getChannel } from "../data/channels";
import { socialLinks } from "../data/siteContent";
import Icon from "./Icon";
import Picture from "./Picture";
import { SnapchatMark } from "./SocialLinks";

/**
 * Liten dialog med Snapchat-QR, brukt så lenge brukernavnet mangler.
 * Escape og klikk utenfor lukker. Fokus flyttes inn ved åpning og tilbake
 * til knappen som åpnet (returnFocusRef) ved lukking.
 */
export default function SnapchatQrDialog({ open, onClose, returnFocusRef }) {
  const closeRef = useRef(null);
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
      }
      if (e.key === "Tab") {
        // Dialogen har bare én fokuserbar kontroll: hold fokus der.
        e.preventDefault();
        closeRef.current?.focus();
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
        role="dialog"
        aria-modal="true"
        aria-labelledby="snapchat-qr-tittel"
        className="relative flex w-full max-w-xs flex-col items-center gap-4 border border-brand-border-dark bg-brand-primary-light p-6 text-center text-brand-text-inverse animate-fade-in"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center text-brand-muted-inverse transition-colors hover:text-brand-text-inverse"
          aria-label={socialLinks.qrDialogClose}
        >
          <Icon name="X" size={20} strokeWidth={2} />
        </button>
        <span className="mt-4 text-brand-accent-light">
          <SnapchatMark size={28} />
        </span>
        <h2 id="snapchat-qr-tittel" className="text-lg font-bold">
          {socialLinks.qrDialogTitle}
        </h2>
        <div className="h-44 w-44 bg-brand-bg p-1.5">
          <Picture
            src={snapchat.qrImage}
            alt={snapchat.qrAlt}
            sizes="176px"
            imgClassName="h-full w-full object-contain"
            tone="light"
            fallbackLabel="[QR]"
          />
        </div>
        <p className="text-[13px] text-brand-muted-inverse">{socialLinks.snapchatPending}</p>
      </div>
    </div>
  );
}
