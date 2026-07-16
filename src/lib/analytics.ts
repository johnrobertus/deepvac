/**
 * Provider-agnostic conversion event tracking.
 *
 * No-op until an analytics script is present on the page — supports the
 * Plausible (window.plausible) and Umami (window.umami.track) APIs.
 * Never sends personal data; only event names and coarse properties.
 */
type EventProps = Record<string, string | number | boolean>;

export function trackEvent(name: string, props?: EventProps) {
  try {
    const w = window as unknown as {
      plausible?: (name: string, opts?: { props?: EventProps }) => void;
      umami?: { track?: (name: string, props?: EventProps) => void };
    };
    if (typeof w.plausible === "function") {
      w.plausible(name, props ? { props } : undefined);
    } else if (typeof w.umami?.track === "function") {
      w.umami.track(name, props);
    }
  } catch {
    // analytics must never break the page
  }
}
