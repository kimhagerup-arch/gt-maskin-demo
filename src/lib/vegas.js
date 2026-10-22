// Vegas-modus (påskeegg): tastene V, E, G, A, S på desktop, eller fem raske trykk på
// ÅPEN-skiltet eller skiltplaten, slår på klassen «vegas» på <html> for økten
// (sessionStorage). Pærene løper fortere, neonen lyser sterkere og flagget vaier
// friskere (index.css). Samme vei slår det av. Aldri ved prefers-reduced-motion,
// ingen lyd, og lenker oppfører seg som før.
//
// Her ligger også pausen for skjult fane: klassen «is-hidden» på <html> setter
// alle CSS-animasjoner på pause når fanen ikke er synlig.
import { useCallback, useEffect, useSyncExternalStore } from "react";

const KEY = "gtm-vegas";
const SEQUENCE = "vegas";
const TAPS = 5;
const TAP_WINDOW_MS = 1500;
const listeners = new Set();
let on = false;
let typed = "";
let taps = [];

function reduced() {
  return (
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

function apply(next) {
  on = next;
  document.documentElement.classList.toggle("vegas", on);
  try {
    if (on) window.sessionStorage.setItem(KEY, "1");
    else window.sessionStorage.removeItem(KEY);
  } catch {
    // Uten lagring varer modusen bare til siden lastes på nytt.
  }
  for (const fn of listeners) fn();
}

export function toggleVegas() {
  if (reduced()) return;
  apply(!on);
}

/** Teller trykk: fem innenfor 1,5 s slår modusen av eller på. */
export function vegasTap() {
  const now = Date.now();
  taps = taps.filter((t) => now - t < TAP_WINDOW_MS);
  taps.push(now);
  if (taps.length >= TAPS) {
    taps = [];
    toggleVegas();
  }
}

function isTyping(target) {
  return Boolean(target?.closest?.("input, textarea, select, [contenteditable]"));
}

function onKey(e) {
  if (e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;
  const key = e.key.toLowerCase();
  if (key.length !== 1) return;
  typed = (typed + key).slice(-SEQUENCE.length);
  if (typed === SEQUENCE) {
    typed = "";
    toggleVegas();
  }
}

let installed = false;

/** Leser lagret tilstand, lytter på tastene og setter «is-hidden» ved skjult fane. Kalles én gang. */
export function installVegasAndVisibility() {
  if (installed || typeof window === "undefined") return;
  installed = true;
  try {
    if (!reduced() && window.sessionStorage.getItem(KEY) === "1") apply(true);
  } catch {
    // Ingen lagring: start av.
  }
  window.addEventListener("keydown", onKey);
  const onVisibility = () =>
    document.documentElement.classList.toggle("is-hidden", document.visibilityState === "hidden");
  document.addEventListener("visibilitychange", onVisibility);
  onVisibility();
}

function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function useVegas() {
  const isOn = useSyncExternalStore(
    subscribe,
    () => on,
    () => false,
  );
  useEffect(() => {
    installVegasAndVisibility();
  }, []);
  const tap = useCallback(() => vegasTap(), []);
  return { on: isOn, tap, toggle: toggleVegas };
}
