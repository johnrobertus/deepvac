import legacyData from "@/content/blog/legacy.json";
import type { Lang } from "@/lib/routes";

// All post content files in src/content/blog/part*.json are imported eagerly.
// New part files are picked up automatically.
const partModules = import.meta.glob("../content/blog/part*.json", {
  eager: true,
  import: "default",
}) as Record<string, unknown>;

/**
 * Data-driven blog content layer.
 *
 * Long-form posts live in src/content/blog/part*.json and are concatenated
 * here. The five original posts keep their hand-built components and routes;
 * they are represented in this module only for listings and cross-links.
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

export interface BlogSearchIntent {
  primaryKeyword: string;
  primaryQuestion: string;
}

export interface BlogReference {
  title: string;
  publisher: string;
  url: string;
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
  searchIntent: {
    en: BlogSearchIntent;
    de: BlogSearchIntent;
  };
  references: BlogReference[];
  technicalNote?: {
    en: string;
    de: string;
  };
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
  .map((key) => partModules[key] as BlogPost[]);

export const blogPosts: BlogPost[] = parts.flat();
export const legacyPosts: LegacyRef[] = (legacyData as unknown as LegacyRef[]) ?? [];

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
  ...blogPosts.map((post) => ({
    articleKey: post.articleKey,
    enSlug: post.enSlug,
    deSlug: post.deSlug,
    category: post.category,
    datePublished: post.datePublished,
    en: { title: post.en.title, description: post.en.description },
    de: { title: post.de.title, description: post.de.description },
  })),
  ...legacyPosts,
];

export function findPostBySlug(slug: string | undefined): BlogPost | undefined {
  if (!slug) return undefined;
  return blogPosts.find((post) => post.enSlug === slug || post.deSlug === slug);
}

export function blogPostPath(
  item: { enSlug: string; deSlug: string },
  lang: Lang,
): string {
  return lang === "de"
    ? `/de/ressourcen/blog/${item.deSlug}`
    : `/resources/blog/${item.enSlug}`;
}

export function resolveRelatedArticle(
  key: string,
  lang: Lang,
): { title: string; path: string } | undefined {
  const item = allListItems.find((candidate) => candidate.articleKey === key);
  if (!item) return undefined;
  return { title: item[lang].title, path: blogPostPath(item, lang) };
}

const SOLUTION_LABELS: Record<string, { en: string; de: string }> = {
  "/products": { en: "Thermal vacuum chambers", de: "Thermalvakuumkammern" },
  "/products/standard-series": { en: "Standard Series TVAC", de: "Standard-Serie TVAC" },
  "/products/custom-tvac": { en: "Custom TVAC systems", de: "Custom-TVAC-Systeme" },
  "/products/thermal-vision": { en: "Deepvac Thermal Vision", de: "Deepvac Thermal Vision" },
  "/products/options": { en: "Chamber options", de: "Kammer-Optionen" },
  "/products/options/solar-simulator": { en: "Solar simulator", de: "Solarsimulator" },
  "/products/options/infrared-heaters": { en: "Infrared heaters", de: "Infrarotstrahler" },
  "/products/options/temperature-control-zones": {
    en: "Temperature control zones",
    de: "Temperaturregelzonen",
  },
  "/products/options/temperature-sensors": {
    en: "Temperature sensors",
    de: "Temperatursensoren",
  },
  "/products/options/bake-out": { en: "Bake-out capability", de: "Ausheizfunktion" },
  "/products/options/cryogenic-traps": { en: "Cryogenic traps", de: "Kryofallen" },
  "/products/options/roots-booster": { en: "Roots booster", de: "Roots-Booster" },
  "/products/options/oil-free-pumping": { en: "Oil-free pumping", de: "Ölfreies Pumpen" },
  "/products/options/nitrogen-venting": {
    en: "Nitrogen venting and purging",
    de: "Stickstoff-Belüftung",
  },
  "/products/options/residual-gas-analysis": {
    en: "Residual gas analysis (RGA)",
    de: "Restgasanalyse (RGA)",
  },
  "/products/options/qcm-monitoring": { en: "QCM monitoring", de: "QCM-Überwachung" },
  "/products/options/helium-leak-test": {
    en: "Helium leak test preparation",
    de: "Helium-Lecktest",
  },
  "/products/options/viewing-window-znse": {
    en: "ZnSe thermography window",
    de: "ZnSe-Thermografie-Schauglas",
  },
  "/products/options/optical-viewports": {
    en: "Optical viewports",
    de: "Optische Schaugläser",
  },
  "/products/options/interior-camera": { en: "Interior camera", de: "Innenraumkamera" },
  "/products/options/remote-monitoring": { en: "Remote monitoring", de: "Fernüberwachung" },
  "/products/options/process-connections": {
    en: "Process connections",
    de: "Prozessanschlüsse",
  },
  "/products/options/vibration-isolation": {
    en: "Vibration isolation",
    de: "Schwingungsentkopplung",
  },
  "/products/options/water-cooling": { en: "Water cooling", de: "Wasserkühlung" },
  "/services": { en: "Engineering services", de: "Engineering-Leistungen" },
  "/services/testing-services": {
    en: "TVAC testing services",
    de: "TVAC-Prüfdienstleistungen",
  },
  "/services/control-systems-design": {
    en: "Control systems design",
    de: "Steuerungstechnik",
  },
  "/services/mechanical-design": {
    en: "Mechanical design",
    de: "Mechanische Konstruktion",
  },
  "/services/retrofit-modernization": {
    en: "Retrofit and modernisation",
    de: "Retrofit und Modernisierung",
  },
  "/services/maintenance-repair": {
    en: "Maintenance and repair",
    de: "Wartung und Reparatur",
  },
  "/services/subsystem-integration": {
    en: "Subsystem integration",
    de: "Subsystem-Integration",
  },
  "/tvac-questionnaire": {
    en: "Technical TVAC questionnaire",
    de: "Technischer TVAC-Fragebogen",
  },
  "/references": { en: "Project references", de: "Projektreferenzen" },
  "/contact": { en: "Contact engineering", de: "Kontakt zum Engineering" },
};

export function solutionLabel(path: string, lang: Lang): string {
  const entry = SOLUTION_LABELS[path];
  if (entry) return entry[lang];
  const tail = path.split("/").filter(Boolean).pop() ?? path;
  return tail.replace(/-/g, " ");
}
