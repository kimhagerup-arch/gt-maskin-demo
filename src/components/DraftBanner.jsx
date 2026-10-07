import { useState } from "react";
import { draftBanner } from "../data/siteContent";
import Icon from "./Icon";

const STORAGE_KEY = "gtm-utkast-lukket";

function readClosed() {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Tynn, lukkbar stripe øverst på alle sider mens siden er et utkast.
 * Ligger over headeren i normal flyt (ikke sticky). Lukket tilstand leses
 * synkront fra sessionStorage ved første render, så ingenting flytter seg.
 */
export default function DraftBanner() {
  const [closed, setClosed] = useState(readClosed);

  if (closed) return null;

  const close = () => {
    setClosed(true);
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // uten sessionStorage lukkes stripen bare for denne visningen
    }
  };

  return (
    <aside
      aria-label={draftBanner.label}
      className="flex min-h-9 items-center justify-between gap-3 bg-brand-accent px-4 py-1.5 text-[13px] font-semibold leading-snug text-brand-primary md:px-6"
      data-utkast
    >
      <p className="flex min-w-0 items-center gap-2">
        <Icon name="Info" size={15} strokeWidth={2.2} className="hidden shrink-0 sm:block" />
        <span>{draftBanner.text}</span>
      </p>
      <button
        type="button"
        onClick={close}
        className="flex h-7 w-7 shrink-0 items-center justify-center text-brand-primary transition-colors hover:bg-brand-accent-hover focus-visible:outline-brand-primary"
        aria-label={draftBanner.close}
        data-utkast-lukk
      >
        <Icon name="X" size={16} strokeWidth={2.4} />
      </button>
    </aside>
  );
}
