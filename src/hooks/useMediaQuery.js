import { useSyncExternalStore } from "react";

/**
 * true når medieuttrykket slår til. Brukes der mobil og desktop må rendre
 * forskjellig struktur (katalogtreet). Første render på klienten leser
 * matchMedia direkte, så det ikke blir et hopp mellom mobil og desktop.
 */
export function useMediaQuery(query) {
  const subscribe = (fn) => {
    if (typeof window === "undefined" || !window.matchMedia) return () => {};
    const mq = window.matchMedia(query);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  };
  const getSnapshot = () =>
    typeof window !== "undefined" && window.matchMedia ? window.matchMedia(query).matches : false;
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
