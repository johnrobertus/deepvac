import { createRoot } from "react-dom/client";
import "@fontsource-variable/manrope/index.css";
import "@fontsource/geist-mono/400.css";
import "@fontsource/geist-mono/500.css";
import App from "./App.tsx";
import "./index.css";
import "./i18n";

createRoot(document.getElementById("root")!).render(<App />);
