import { useEffect } from "react";

/**
 * Scrolls to an element by id and applies a temporary highlight effect.
 * Re-runs whenever any of the watched dependencies change.
 */
export function useScrollToItem(itemId: string | null, deps: unknown[] = []) {
  useEffect(() => {
    if (!itemId) return;
    // Wait a tick so the element is in the DOM after tab/category change.
    const t = setTimeout(() => {
      const el = document.getElementById(itemId);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      el.classList.add("search-highlight");
      setTimeout(() => el.classList.remove("search-highlight"), 2200);
    }, 120);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId, ...deps]);
}
