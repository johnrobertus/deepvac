import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getLangFromPath, getAlternatePath, type Lang } from "@/lib/routes";
import { ensureLegal, loadLanguage } from "@/i18n";

const isLegalPath = (path: string) => ["/imprint", "/privacy-policy", "/terms-and-conditions", "/de/impressum", "/de/datenschutz", "/de/agb"].includes(path);

interface LanguageContextValue {
  lang: Lang;
  switchLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  switchLanguage: () => {},
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const lang = useMemo(() => getLangFromPath(pathname), [pathname]);
  const legalPage = isLegalPath(pathname);
  const [, bumpRender] = useReducer((c: number) => c + 1, 0);

  const ready = i18n.language === lang && i18n.hasResourceBundle(lang, "common") && (!legalPage || i18n.hasResourceBundle(lang, "legal"));

  useEffect(() => {
    let active = true;
    Promise.all([loadLanguage(lang), ...(legalPage ? [ensureLegal(lang)] : [])])
      .then(async () => {
        if (!active) return;
        if (i18n.language !== lang) await i18n.changeLanguage(lang);
        if (active) {
          document.documentElement.lang = lang;
          bumpRender();
        }
      })
      .catch((error: unknown) => {
        console.error("Translation loading failed:", error);
        if (active) bumpRender();
      });
    return () => { active = false; };
  }, [lang, legalPage, pathname, i18n]);

  const switchLanguage = async () => {
    const targetLang: Lang = lang === "en" ? "de" : "en";
    const targetPath = getAlternatePath(pathname, targetLang);
    try {
      await Promise.all([loadLanguage(targetLang), ...(isLegalPath(targetPath) ? [ensureLegal(targetLang)] : [])]);
      navigate(targetPath);
    } catch (error) {
      console.error("Translation loading failed:", error);
    }
  };

  const value = useMemo(() => ({ lang, switchLanguage }), [lang, pathname]);

  return (
    <LanguageContext.Provider value={value}>
      {ready ? children : null}
    </LanguageContext.Provider>
  );
}
