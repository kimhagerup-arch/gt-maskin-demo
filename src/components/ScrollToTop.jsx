import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Ruller til toppen ved rutebytte, eller til ankeret hvis URL-en har hash. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  // biome-ignore lint/correctness/useExhaustiveDependencies: skal kjøre ved hvert rutebytte, også uten hash
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      // Vent til lazy-lastet side har rendret.
      const timer = window.setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ block: "start" });
        } else {
          window.scrollTo(0, 0);
        }
      }, 60);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, hash]);

  return null;
}
