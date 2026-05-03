import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { scrollToHashWhenReady } from "@/lib/scroll";

/**
 * Global scroll behavior on route change:
 *  - No hash + forward navigation → reset to top instantly.
 *  - Hash present → wait for target to mount, then smooth-scroll to it
 *    (works for cross-page links like `/products#contact`).
 *  - POP (back/forward) without hash → let the browser restore position.
 */
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (hash) {
      scrollToHashWhenReady(hash);
      return;
    }
    if (navType !== "POP") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [pathname, hash, navType]);

  return null;
};
