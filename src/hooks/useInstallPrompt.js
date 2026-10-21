import { useEffect, useState } from "react";

const EVENT = "gtm:installprompt";
let deferredPrompt = null;

// Lytteren registreres når modulen lastes (hovedchunken), så vi ikke mister
// beforeinstallprompt hvis Chrome sender den før komponenten er montert.
if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    window.dispatchEvent(new Event(EVENT));
  });
  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    window.dispatchEvent(new Event(EVENT));
  });
}

function isStandalone() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

function isIos() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  const ipad = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
  return /iPhone|iPad|iPod/i.test(ua) || ipad;
}

/**
 * Tilstand for «Legg GT Maskin på hjemskjermen».
 * - standalone: siden kjører allerede som app, knappen skjules.
 * - canPrompt: Chrome/Android har sendt beforeinstallprompt, prompt() åpner dialogen.
 * - ios: iPhone/iPad, som ikke har prompt; vis veiledning i stedet.
 */
export function useInstallPrompt() {
  const [canPrompt, setCanPrompt] = useState(() => Boolean(deferredPrompt));
  const [standalone, setStandalone] = useState(isStandalone);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    setIos(isIos());
    setStandalone(isStandalone());
    const update = () => {
      setCanPrompt(Boolean(deferredPrompt));
      setStandalone(isStandalone());
    };
    window.addEventListener(EVENT, update);
    const mq = window.matchMedia?.("(display-mode: standalone)");
    mq?.addEventListener("change", update);
    return () => {
      window.removeEventListener(EVENT, update);
      mq?.removeEventListener("change", update);
    };
  }, []);

  const prompt = async () => {
    if (!deferredPrompt) return null;
    const event = deferredPrompt;
    const result = await event.prompt();
    deferredPrompt = null;
    setCanPrompt(false);
    return result?.outcome || null;
  };

  return { standalone, canPrompt, ios, prompt };
}
