// True until the first client-side navigation. During the initial page load,
// Reveal elements already in the viewport show instantly (seamless prerender takeover).
let initialLoad = true;
export const isInitialLoad = () => initialLoad;
export function markClientNavigation() {
  initialLoad = false;
}
