import { useEffect } from "react";

const DEFAULT_TITLE = "GT Maskin AS, US-bilspesialisten i Alta | Godkjent bilverksted";

/** Setter document.title og meta description per rute. */
export function useSeoMeta({ title, description } = {}) {
  useEffect(() => {
    document.title = title || DEFAULT_TITLE;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && description) {
      meta.setAttribute("content", description);
    }
    const og = document.querySelector('meta[property="og:title"]');
    if (og && title) {
      og.setAttribute("content", title);
    }
  }, [title, description]);
}
