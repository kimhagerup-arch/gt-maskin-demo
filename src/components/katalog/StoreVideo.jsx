import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { cx } from "../../lib/format";
import Picture from "../Picture";

/**
 * Butikkvideoen i «Butikken i Myggveien»: posteren vises alltid, den stumme
 * videoen monteres først når rammen nærmer seg viewport, og ikke ved redusert
 * bevegelse. Ingen kontroller, ingen lyd, loop.
 */
export default function StoreVideo({ src, poster, alt, className }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [near, setNear] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setNear(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const showVideo = near && !reduced && !failed && Boolean(src);

  return (
    <div
      ref={ref}
      className={cx(
        "relative overflow-hidden border border-brand-border-dark bg-brand-primary-dark",
        className,
      )}
    >
      <Picture
        src={poster}
        alt={alt}
        sizes="(min-width: 1024px) 600px, 100vw"
        className="absolute inset-0 h-full w-full"
        imgClassName="h-full w-full object-cover"
      />
      {showVideo && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
