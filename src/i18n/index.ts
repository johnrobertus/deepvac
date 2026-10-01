import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import type { Lang } from "@/lib/routes";

const languageImports = {
  en: () => import("./bundles/en"),
  de: () => import("./bundles/de"),
};
const legalImports = {
  en: () => import("./bundles/en-legal"),
  de: () => import("./bundles/de-legal"),
};

const languageLoads: Partial<Record<Lang, Promise<void>>> = {};
const legalLoads: Partial<Record<Lang, Promise<void>>> = {};

export function loadLanguage(lang: Lang): Promise<void> {
  if (!languageLoads[lang]) {
    languageLoads[lang] = languageImports[lang]().then(({ default: bundle }) => {
      for (const [namespace, resource] of Object.entries(bundle)) {
        i18n.addResourceBundle(lang, namespace, resource, true, true);
      }
    }).catch((error: unknown) => {
      delete languageLoads[lang];
      throw error;
    });
  }
  return languageLoads[lang];
}

export function ensureLegal(lang: Lang): Promise<void> {
  if (!legalLoads[lang]) {
    legalLoads[lang] = legalImports[lang]().then(({ default: legal }) => {
      i18n.addResourceBundle(lang, "legal", legal, true, true);
    }).catch((error: unknown) => {
      delete legalLoads[lang];
      throw error;
    });
  }
  return legalLoads[lang];
}

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;