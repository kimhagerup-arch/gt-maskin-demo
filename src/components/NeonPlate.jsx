import { useState } from "react";
import { cx } from "../lib/format";
import { useVegas } from "../lib/vegas";

const KEY = "gtm-neon-tent";

/** true første gang i økten: da tennes neonen med et kort flimmer. */
function firstThisSession() {
  try {
    if (window.sessionStorage.getItem(KEY) === "1") return false;
    window.sessionStorage.setItem(KEY, "1");
    return true;
  } catch {
    return false;
  }
}

/**
 * Mørk skiltplate med tynn neonkant rundt logoen. Neonen tennes med et kort
 * flimmer første gang i økten (sessionStorage), ellers lyser den rolig. Selve
 * logoen endres ikke. Flimringen ligger på kantlaget (::after), så logoen står
 * stille, og den er av ved prefers-reduced-motion (index.css). Fem raske trykk
 * på platen slår på Vegas-modus.
 */
export default function NeonPlate({ children, className }) {
  const [lighting] = useState(firstThisSession);
  const { tap } = useVegas();
  return (
    <span
      className={cx("neon-plate relative inline-flex", lighting && "is-lighting", className)}
      onPointerDown={tap}
    >
      {children}
    </span>
  );
}
