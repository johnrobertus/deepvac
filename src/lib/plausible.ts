const PLAUSIBLE_SRC = "https://plausible.io/js/pa-YTJ81vJarhaN5L_Ptqqk6.js";
const SCRIPT_ID = "plausible-script";

type PlausibleFn = ((...args: unknown[]) => void) & {
  q?: unknown[][];
  o?: Record<string, unknown>;
  init?: (options?: Record<string, unknown>) => void;
};

/** Loads Plausible only on the production hostname. Idempotent. */
export function initPlausible(): void {
  if (typeof window === "undefined" || window.location.hostname !== "deepvac.space") return;

  const w = window as unknown as { plausible?: PlausibleFn };
  const plausible: PlausibleFn =
    w.plausible ||
    (function (this: unknown, ...args: unknown[]) {
      (plausible.q = plausible.q || []).push(args);
    } as PlausibleFn);
  w.plausible = plausible;
  plausible.init =
    plausible.init ||
    function (i?: Record<string, unknown>) {
      plausible.o = i || {};
    };
  plausible.init();

  if (document.getElementById(SCRIPT_ID)) return;
  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = PLAUSIBLE_SRC;
  document.head.appendChild(script);
}
