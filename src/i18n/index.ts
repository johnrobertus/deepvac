import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// EN namespaces (source of truth)
import enCommon from "./locales/en/common.json";
import enHome from "./locales/en/home.json";
import enProducts from "./locales/en/products.json";
import enServices from "./locales/en/services.json";
import enTeam from "./locales/en/team.json";
import enCareers from "./locales/en/careers.json";
import enReferences from "./locales/en/references.json";
import enCatalogs from "./locales/en/catalogs.json";
import enContact from "./locales/en/contact.json";
import enLegal from "./locales/en/legal.json";
import enSeo from "./locales/en/seo.json";
import enErrors from "./locales/en/errors.json";

// DE namespaces (derived, mirrors EN 1:1)
import deCommon from "./locales/de/common.json";
import deHome from "./locales/de/home.json";
import deProducts from "./locales/de/products.json";
import deServices from "./locales/de/services.json";
import deTeam from "./locales/de/team.json";
import deCareers from "./locales/de/careers.json";
import deReferences from "./locales/de/references.json";
import deCatalogs from "./locales/de/catalogs.json";
import deContact from "./locales/de/contact.json";
import deLegal from "./locales/de/legal.json";
import deSeo from "./locales/de/seo.json";
import deErrors from "./locales/de/errors.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      home: enHome,
      products: enProducts,
      services: enServices,
      team: enTeam,
      careers: enCareers,
      references: enReferences,
      catalogs: enCatalogs,
      contact: enContact,
      legal: enLegal,
      seo: enSeo,
      errors: enErrors,
    },
    de: {
      common: deCommon,
      home: deHome,
      products: deProducts,
      services: deServices,
      team: deTeam,
      careers: deCareers,
      references: deReferences,
      catalogs: deCatalogs,
      contact: deContact,
      legal: deLegal,
      seo: deSeo,
      errors: deErrors,
    },
  },
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
