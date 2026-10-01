import { createRoot } from "react-dom/client";
import "@fontsource-variable/manrope/index.css";
import "@fontsource/geist-mono/400.css";
import "@fontsource/geist-mono/500.css";
import App from "./App.tsx";
import "./index.css";
import i18n, { loadLanguage } from "./i18n";
import { getLangFromPath } from "./lib/routes";

const lang = getLangFromPath(window.location.pathname);
loadLanguage(lang)
  .then(() => i18n.changeLanguage(lang))
  .catch((error: unknown) => console.error("Translation loading failed:", error))
  .finally(() => {
    const root = document.getElementById("root");
    if (root) createRoot(root).render(<App />);
  });
