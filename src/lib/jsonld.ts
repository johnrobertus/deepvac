import type { Lang } from "./routes";
import { localizedPath } from "./routes";

export const SITE_URL = "https://deepvac.space";

export interface CrumbInput {
  /** Localized display name */
  name: string;
  /** EN route path (will be localized), or an already absolute URL */
  enPath?: string;
  url?: string;
}

function absolute(crumb: CrumbInput, lang: Lang): string {
  if (crumb.url) return crumb.url;
  if (!crumb.enPath) return SITE_URL;
  if (crumb.enPath === "/") return lang === "de" ? `${SITE_URL}/de` : `${SITE_URL}/`;
  return `${SITE_URL}${localizedPath(crumb.enPath, lang)}`;
}

/**
 * Shared BreadcrumbList JSON-LD builder.
 * The Home crumb is prepended automatically.
 */
export function buildBreadcrumbJsonLd(crumbs: CrumbInput[], lang: Lang) {
  const all: CrumbInput[] = [
    { name: lang === "de" ? "Startseite" : "Home", enPath: "/" },
    ...crumbs,
  ];
  const pageUrl = absolute(all[all.length - 1], lang);

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    inLanguage: lang,
    itemListElement: all.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absolute(crumb, lang),
    })),
  };
}
