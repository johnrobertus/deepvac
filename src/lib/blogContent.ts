import legacyData from "@/content/blog/legacy.json";
import type { Lang } from "@/lib/routes";

// All post content files (src/content/blog/part*.json) are imported eagerly.
// New files are picked up automatically — no need to edit this list.
const partModules = import.meta.glob("../content/blog/part*.json", {
  eager: true,
  import: "default",
}) as Record<string, unknown>;

/**
 * Data-driven blog content layer.
 *
 * All long-form blog posts live in src/content/blog/part*.json (bilingual),
 * concatenated here. This module exposes typed accessors used by the renderer
 * (src/pages/blog/GeneratedPost.tsx) and the blog listing (src/pages/Blog.tsx).
 *
 * The five original posts (cooling-systems, retrofit-vs-replacement,
 * aerospace-qualification-testing, tvac-cost-drivers, tvac-test-campaign)
 * keep their own hand-built components and routes; they are represented here
 * only as lightweight listing/cross-link references ("legacy").
 */

export interface BlogFaq {
  q: string;
  a: string;
}

export interface BlogSection {
  title: string;
  content: string;
  content2?: string;
  bulletsHeading?: string;
  bullets?: string[];
}

export interface BlogContent {
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  sections: BlogSection[];
  faq: BlogFaq[];
  conclusion: string;
}

export interface BlogPost {
  articleKey: string;
  enSlug: string;
  deSlug: string;
  category: string;
  datePublished: string;
  dateModified: string;
  seoKey: string;
  relatedPaths: string[];
  relatedArticles: string[];
  en: BlogContent;
  de: BlogContent;
}

export interface LegacyRef {
  articleKey: string;
  enSlug: string;
  deSlug: string;
  category: string;
  datePublished: string;
  en: { title: string; description: string };
  de: { title: string; description: string };
}

const parts = Object.keys(partModules)
  .sort()
  .map((k) => partModules[k] as BlogPost[]);

export const blogPosts: BlogPost[] = parts.flat();
export const legacyPosts: LegacyRef[] = (legacyData as unknown as LegacyRef[]) ?? [];

/** Unified listing item used by the blog index (new posts + legacy posts). */
export interface BlogListItem {
  articleKey: string;
  enSlug: string;
  deSlug: string;
  category: string;
  datePublished: string;
  en: { title: string; description: string };
  de: { title: string; description: string };
}

export const allListItems: BlogListItem[] = [
  ...blogPosts.map((p) => ({
    articleKey: p.articleKey,
    enSlug: p.enSlug,
    deSlug: p.deSlug,
    category: p.category,
    datePublished: p.datePublished,
    en: { title: p.en.title, description: p.en.description },
    de: { title: p.de.title, description: p.de.description },
  })),
  ...legacyPosts,
];

/** Resolve a post by either its EN or DE slug. */
export function findPostBySlug(slug: string | undefined): BlogPost | undefined {
  if (!slug) return undefined;
  return blogPosts.find((p) => p.enSlug === slug || p.deSlug === slug);
}

/** Localized URL path for a listing item or post. */
export function blogPostPath(item: { enSlug: string; deSlug: string }, lang: Lang): string {
  return lang === "de"
    ? `/de/ressourcen/blog/${item.deSlug}`
    : `/resources/blog/${item.enSlug}`;
}

/** Resolve a related-article key to a title + localized path (new or legacy). */
export function resolveRelatedArticle(
  key: string,
  lang: Lang,
): { title: string; path: string } | undefined {
  const item = allListItems.find((i) => i.articleKey === key);
  if (item) return { title: item[lang].title, path: blogPostPath(item, lang) };
  return undefined;
}

/** Human-readable labels for internal solution links referenced by posts. */
const SOLUTION_LABELS: Record<string, { en: string; de: string }> = {
  "/products": { en: "Thermal vacuum chambers", de: "Thermalvakuumkammern" },
  "/products/standard-series": { en: "Standard Series TVAC", de: "Standard-Serie TVAC" },
  "/products/custom-tvac": { en: "Custom TVAC systems", de: "Custom-TVAC-Systeme" },
  "/products/thermal-vision": { en: "Deepvac Thermal Vision", de: "Deepvac Thermal Vision" },
  "/products/options": { en: "Chamber options", de: "Kammer-Optionen" },
  "/products/options/solar-simulator": { en: "Solar simulator", de: "Solarsimulator" },
  "/products/options/infrared-heaters": { en: "Infrared heaters", de: "Infrarotstrahler" },
  "/products/options/temperature-control-zones": { en: "Temperature control zones", de: "Temperaturregelzonen" },
  "/products/options/temperature-sensors": { en: "Temperature sensors", de: "Temperatursensoren" },
  "/products/options/bake-out": { en: "Bake-out capability", de: "Ausheizfunktion" },
  "/products/options/cryogenic-traps": { en: "Cryogenic traps", de: "Kryofallen" },
  "/products/options/roots-booster": { en: "Roots booster", de: "Roots-Booster" },
  "/products/options/oil-free-pumping": { en: "Oil-free pumping", de: "Ölfreies Pumpen" },
  "/products/options/nitrogen-venting": { en: "Nitrogen venting & purging", de: "Stickstoff-Belüftung" },
  "/products/options/residual-gas-analysis": { en: "Residual gas analysis (RGA)", de: "Restgasanalyse (RGA)" },
  "/products/options/qcm-monitoring": { en: "QCM monitoring", de: "QCM-Überwachung" },
  "/products/options/helium-leak-test": { en: "Helium leak test prep", de: "Helium-Lecktest" },
  "/products/options/viewing-window-znse": { en: "ZnSe thermography window", de: "ZnSe-Thermografie-Schauglas" },
  "/products/options/optical-viewports": { en: "Optical viewports", de: "Optische Schaugläser" },
  "/products/options/interior-camera": { en: "Interior camera", de: "Innenraumkamera" },
  "/products/options/remote-monitoring": { en: "Remote monitoring", de: "Fernüberwachung" },
  "/products/options/process-connections": { en: "Process connections", de: "Prozessanschlüsse" },
  "/products/options/vibration-isolation": { en: "Vibration isolation", de: "Schwingungsentkopplung" },
  "/products/options/water-cooling": { en: "Water cooling", de: "Wasserkühlung" },
  "/services": { en: "Engineering services", de: "Engineering-Leistungen" },
  "/services/testing-services": { en: "TVAC testing services", de: "TVAC-Prüfdienstleistungen" },
  "/services/control-systems-design": { en: "Control systems design", de: "Steuerungstechnik" },
  "/services/mechanical-design": { en: "Mechanical design", de: "Mechanische Konstruktion" },
  "/services/retrofit-modernization": { en: "Retrofit & modernization", de: "Retrofit & Modernisierung" },
  "/services/maintenance-repair": { en: "Maintenance & repair", de: "Wartung & Reparatur" },
  "/services/subsystem-integration": { en: "Subsystem integration", de: "Subsystem-Integration" },
  "/tvac-questionnaire": { en: "Technical TVAC questionnaire", de: "Technischer TVAC-Fragebogen" },
  "/references": { en: "Project references", de: "Projektreferenzen" },
  "/contact": { en: "Contact engineering", de: "Kontakt zum Engineering" },
};

export function solutionLabel(path: string, lang: Lang): string {
  const entry = SOLUTION_LABELS[path];
  if (entry) return entry[lang];
  const tail = path.split("/").filter(Boolean).pop() ?? path;
  return tail.replace(/-/g, " ");
}
