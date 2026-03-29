import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getLangFromPath, getAlternatePath, type Lang } from "@/lib/routes";

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

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
    document.documentElement.lang = lang;
  }, [lang, i18n]);

  const switchLanguage = () => {
    const targetLang: Lang = lang === "en" ? "de" : "en";
    const targetPath = getAlternatePath(pathname, targetLang);
    navigate(targetPath);
  };

  const value = useMemo(() => ({ lang, switchLanguage }), [lang, pathname]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
