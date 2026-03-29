export type Lang = "en" | "de";

export interface RouteEntry {
  en: string;
  de: string;
}

/**
 * Central route map — single source of truth for all route operations.
 * Used by: App.tsx routing, language switcher, hreflang, canonical, internal links.
 */
export const routeMap: readonly RouteEntry[] = [
  { en: "/", de: "/de" },
  { en: "/products", de: "/de/produkte" },
  { en: "/products/standard-series", de: "/de/produkte/standard-serie" },
  { en: "/products/custom-tvac", de: "/de/produkte/custom-tvac" },
  { en: "/services", de: "/de/leistungen" },
  { en: "/services/testing-services", de: "/de/leistungen/pruefdienstleistungen" },
  { en: "/services/control-systems-design", de: "/de/leistungen/steuerungstechnik" },
  { en: "/services/mechanical-design", de: "/de/leistungen/mechanische-konstruktion" },
  { en: "/services/retrofit-modernization", de: "/de/leistungen/retrofit-modernisierung" },
  { en: "/services/maintenance-repair", de: "/de/leistungen/wartung-reparatur" },
  { en: "/services/subsystem-integration", de: "/de/leistungen/subsystem-integration" },
  { en: "/team", de: "/de/team" },
  { en: "/catalogs", de: "/de/kataloge" },
  { en: "/careers", de: "/de/karriere" },
  { en: "/references", de: "/de/referenzen" },
  { en: "/contact", de: "/de/kontakt" },
  { en: "/imprint", de: "/de/impressum" },
  { en: "/privacy-policy", de: "/de/datenschutz" },
  { en: "/terms-and-conditions", de: "/de/agb" },
  { en: "/media-credits", de: "/de/medienquellen" },
] as const;

// English alias routes (kept for backward compatibility, no DE equivalents needed)
export const enAliases: Record<string, string> = {
  "/catalogues": "/catalogs",
  "/services/retrofit-modernisation": "/services/retrofit-modernization",
};

/**
 * Detect language from pathname.
 * URL is the single source of truth.
 */
export function getLangFromPath(pathname: string): Lang {
  return pathname === "/de" || pathname.startsWith("/de/") ? "de" : "en";
}

/**
 * Find the route entry matching the current path.
 * Handles alias resolution for EN paths.
 */
function findRouteEntry(pathname: string): RouteEntry | undefined {
  // Direct match
  const direct = routeMap.find((r) => r.en === pathname || r.de === pathname);
  if (direct) return direct;

  // Try alias resolution (EN only)
  const resolved = enAliases[pathname];
  if (resolved) {
    return routeMap.find((r) => r.en === resolved);
  }

  return undefined;
}

/**
 * Get the alternate path for the target language.
 * Used by the language switcher.
 */
export function getAlternatePath(currentPath: string, targetLang: Lang): string {
  const entry = findRouteEntry(currentPath);
  if (entry) return entry[targetLang];

  // Fallback: if no mapping found, go to root of target language
  return targetLang === "de" ? "/de" : "/";
}

/**
 * Get hreflang entries for the current path.
 * Returns [{lang, href}] for SEO <link rel="alternate"> tags.
 */
export function getHreflangs(
  currentPath: string,
  baseUrl: string = "https://deepvac.space"
): { lang: string; href: string }[] {
  const entry = findRouteEntry(currentPath);
  if (!entry) return [];

  return [
    { lang: "en", href: `${baseUrl}${entry.en}` },
    { lang: "de", href: `${baseUrl}${entry.de}` },
    { lang: "x-default", href: `${baseUrl}${entry.en}` },
  ];
}

/**
 * Get canonical URL for the current path and language.
 */
export function getCanonical(
  currentPath: string,
  lang: Lang,
  baseUrl: string = "https://deepvac.space"
): string {
  const entry = findRouteEntry(currentPath);
  if (entry) return `${baseUrl}${entry[lang]}`;
  return `${baseUrl}${currentPath}`;
}

/**
 * Translate an EN path to the localized version for the given language.
 * Used by internal <Link> components.
 */
export function localizedPath(enPath: string, lang: Lang): string {
  if (lang === "en") return enPath;
  const entry = routeMap.find((r) => r.en === enPath);
  return entry ? entry.de : enPath;
}
