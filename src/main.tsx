import { createRoot } from "react-dom/client";
import "@fontsource-variable/manrope/index.css";
import "@fontsource/geist-mono/400.css";
import "@fontsource/geist-mono/500.css";
import App from "./App.tsx";
import "./index.css";
import i18n, { loadLanguage } from "./i18n";
import { getLangFromPath } from "./lib/routes";
import { initPlausible } from "./lib/plausible";
import { preloadRoute } from "./routes";

// Reveal start state only applies when JS runs (see .reveal in index.css).
document.documentElement.classList.add("js-reveal");

const lang = getLangFromPath(window.location.pathname);
const translations = loadLanguage(lang)
  .then(() => i18n.changeLanguage(lang))
  .catch((error: unknown) => console.error("Translation loading failed:", error));

// Load the route chunk in parallel so the prerendered HTML is replaced without a blank fallback.
Promise.allSettled([translations, preloadRoute(window.location.pathname)]).finally(() => {
  const root = document.getElementById("root");
  if (root) createRoot(root).render(<App />);
  initPlausible();
});
