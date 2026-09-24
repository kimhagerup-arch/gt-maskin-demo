import { useEffect, useRef } from "react";

/**
 * Legger på klassen «is-visible» første gang elementet kommer inn i viewport.
 * Brukes sammen med klassen «reveal» i index.css. Ved redusert bevegelse
 * settes klassen med en gang.
 */
export function useReveal(options = { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      }
    }, options);
    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return ref;
}
