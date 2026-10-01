import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
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
  const [readyPath, setReadyPath] = useState(() => i18n.language === lang && (!legalPage || i18n.hasResourceBundle(lang, "legal")) ? pathname : "");

  useEffect(() => {
    let active = true;
    Promise.all([loadLanguage(lang), ...(legalPage ? [ensureLegal(lang)] : [])])
      .then(async () => {
        if (!active) return;
        if (i18n.language !== lang) await i18n.changeLanguage(lang);
        if (active) {
          document.documentElement.lang = lang;
          setReadyPath(pathname);
        }
      })
      .catch((error: unknown) => {
        console.error("Translation loading failed:", error);
        if (active) setReadyPath(pathname);
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
      {readyPath === pathname && i18n.language === lang ? children : null}
    </LanguageContext.Provider>
  );
}
