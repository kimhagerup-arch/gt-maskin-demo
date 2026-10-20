import { useEffect, useState } from "react";

/**
 * true når siden er ferdig lastet (window load), eller med en gang ved
 * rutebytte etterpå. Brukes til å utsette bilder under folden (miniatyrer,
 * dekor) så de ikke konkurrerer med hero-bildet om båndbredden ved første last.
 * Boksene har fast forhold, så ingenting flytter seg når bildene kommer.
 */
export function useAfterLoad() {
  const [ready, setReady] = useState(
    () => typeof document !== "undefined" && document.readyState === "complete",
  );

  useEffect(() => {
    if (ready) return undefined;
    const onLoad = () => setReady(true);
    window.addEventListener("load", onLoad, { once: true });
    return () => window.removeEventListener("load", onLoad);
  }, [ready]);

  return ready;
}
