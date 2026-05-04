/**
 * Site-wide scroll/navigation helpers.
 *
 * Single source of truth for:
 *  - same-page section scrolling (scrollToId)
 *  - cross-page hash navigation (used by ScrollToTop)
 *
 * The sticky header height is accounted for via CSS `scroll-margin-top`
 * applied globally to `[id]` targets in index.css.
 */

export type ScrollBehavior = "smooth" | "instant" | "auto";

/**
 * Scroll to an element by id on the current page.
 * Safe to call with or without a leading `#`.
 */
export function scrollToId(id: string, behavior: ScrollBehavior = "smooth"): boolean {
  if (typeof window === "undefined") return false;
  const cleanId = id.startsWith("#") ? id.slice(1) : id;
  if (!cleanId) return false;
  const el = document.getElementById(cleanId);
  if (!el) return false;
  el.scrollIntoView({ behavior: behavior as ScrollBehavior, block: "start" });
  return true;
}

/**
 * Try to scroll to a hash target, retrying briefly while the destination
 * page mounts/streams in. Used after route changes.
 */
export function scrollToHashWhenReady(
  hash: string,
  opts: { behavior?: ScrollBehavior; timeoutMs?: number; intervalMs?: number } = {},
): void {
  if (typeof window === "undefined" || !hash) return;
  const behavior = opts.behavior ?? "smooth";
  const timeoutMs = opts.timeoutMs ?? 1500;
  const intervalMs = opts.intervalMs ?? 60;
  const start = performance.now();

  const attempt = () => {
    if (scrollToId(hash, behavior)) return;
    if (performance.now() - start >= timeoutMs) return;
    window.setTimeout(attempt, intervalMs);
  };

  // Defer a frame so React has a chance to commit the new route.
  requestAnimationFrame(() => requestAnimationFrame(attempt));
}
