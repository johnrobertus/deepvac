#!/usr/bin/env node
/**
 * Sitemap generator for deepvac.space
 *
 * - Emits a sitemap index + 4 sub-sitemaps (main, services, resources, legal)
 * - lastmod is derived from real git commit history of the page's source files
 *   and its primary i18n locale files, so it reflects actual content changes
 *   rather than deploy timestamps.
 * - Only canonical, indexable, HTTPS URLs are included.
 *   Aliases (/catalogues, /services/retrofit-modernisation) and the 404 are excluded.
 * - Bilingual hreflang (en, de, x-default) is paired correctly per URL.
 *
 * Run via:  node scripts/generate-sitemap.mjs
 * Triggered automatically by `prebuild` in package.json.
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const BASE = "https://deepvac.space";

/**
 * Each entry: paired EN/DE canonical paths + the source files whose git
 * mtime should drive the lastmod for this URL. Locale JSON files are
 * included where translations actually carry the visible content.
 */
const routes = [
  // --- main ---
  {
    group: "main",
    en: "/", de: "/de",
    priority: 1.0, changefreq: "weekly",
    sources: [
      "src/pages/Index.tsx",
      "src/components/home",
      "src/i18n/locales/en/home.json",
      "src/i18n/locales/de/home.json",
    ],
  },
  {
    group: "main",
    en: "/products", de: "/de/produkte",
    priority: 0.95, changefreq: "weekly",
    sources: [
      "src/pages/Products.tsx",
      "src/i18n/locales/en/products.json",
      "src/i18n/locales/de/products.json",
    ],
  },
  {
    group: "main",
    en: "/products/standard-series", de: "/de/produkte/standard-serie",
    priority: 0.9, changefreq: "monthly",
    sources: [
      "src/pages/StandardSeries.tsx",
      "src/i18n/locales/en/products.json",
      "src/i18n/locales/de/products.json",
    ],
  },
  {
    group: "main",
    en: "/products/custom-tvac", de: "/de/produkte/custom-tvac",
    priority: 0.9, changefreq: "monthly",
    sources: [
      "src/pages/CustomTVAC.tsx",
      "src/i18n/locales/en/products.json",
      "src/i18n/locales/de/products.json",
    ],
  },
  {
    group: "main",
    en: "/products/thermal-vision", de: "/de/produkte/thermal-vision",
    priority: 0.85, changefreq: "monthly",
    sources: [
      "src/pages/ThermalVision.tsx",
      "src/i18n/locales/en/products.json",
      "src/i18n/locales/de/products.json",
    ],
  },
  {
    group: "main",
    en: "/references", de: "/de/referenzen",
    priority: 0.9, changefreq: "monthly",
    sources: [
      "src/pages/References.tsx",
      "src/i18n/locales/en/references.json",
      "src/i18n/locales/de/references.json",
    ],
  },
  {
    group: "main",
    en: "/contact", de: "/de/kontakt",
    priority: 0.95, changefreq: "monthly",
    sources: [
      "src/pages/Contact.tsx",
      "src/i18n/locales/en/contact.json",
      "src/i18n/locales/de/contact.json",
    ],
  },
  {
    group: "main",
    en: "/team", de: "/de/team",
    priority: 0.7, changefreq: "monthly",
    sources: [
      "src/pages/Team.tsx",
      "src/i18n/locales/en/team.json",
      "src/i18n/locales/de/team.json",
    ],
  },

  // --- services ---
  {
    group: "services",
    en: "/services", de: "/de/leistungen",
    priority: 0.95, changefreq: "weekly",
    sources: [
      "src/pages/Services.tsx",
      "src/i18n/locales/en/services.json",
      "src/i18n/locales/de/services.json",
    ],
  },
  {
    group: "services",
    en: "/services/retrofit-modernization", de: "/de/leistungen/retrofit-modernisierung",
    priority: 0.9, changefreq: "monthly",
    sources: [
      "src/pages/ServicePages.tsx",
      "src/i18n/locales/en/services.json",
      "src/i18n/locales/de/services.json",
    ],
  },
  {
    group: "services",
    en: "/services/testing-services", de: "/de/leistungen/pruefdienstleistungen",
    priority: 0.85, changefreq: "monthly",
    sources: [
      "src/pages/ServicePages.tsx",
      "src/i18n/locales/en/services.json",
      "src/i18n/locales/de/services.json",
    ],
  },
  {
    group: "services",
    en: "/services/control-systems-design", de: "/de/leistungen/steuerungstechnik",
    priority: 0.8, changefreq: "monthly",
    sources: [
      "src/pages/ServicePages.tsx",
      "src/i18n/locales/en/services.json",
      "src/i18n/locales/de/services.json",
    ],
  },
  {
    group: "services",
    en: "/services/mechanical-design", de: "/de/leistungen/mechanische-konstruktion",
    priority: 0.8, changefreq: "monthly",
    sources: [
      "src/pages/ServicePages.tsx",
      "src/i18n/locales/en/services.json",
      "src/i18n/locales/de/services.json",
    ],
  },
  {
    group: "services",
    en: "/services/maintenance-repair", de: "/de/leistungen/wartung-reparatur",
    priority: 0.8, changefreq: "monthly",
    sources: [
      "src/pages/ServicePages.tsx",
      "src/i18n/locales/en/services.json",
      "src/i18n/locales/de/services.json",
    ],
  },
  {
    group: "services",
    en: "/services/subsystem-integration", de: "/de/leistungen/subsystem-integration",
    priority: 0.8, changefreq: "monthly",
    sources: [
      "src/pages/ServicePages.tsx",
      "src/i18n/locales/en/services.json",
      "src/i18n/locales/de/services.json",
    ],
  },

  // --- resources ---
  {
    group: "resources",
    en: "/resources", de: "/de/ressourcen",
    priority: 0.6, changefreq: "monthly",
    sources: ["src/pages/Resources.tsx"],
  },
  {
    group: "resources",
    en: "/catalogs", de: "/de/kataloge",
    priority: 0.7, changefreq: "monthly",
    sources: [
      "src/pages/Catalogues.tsx",
      "src/i18n/locales/en/catalogs.json",
      "src/i18n/locales/de/catalogs.json",
    ],
  },
  {
    group: "resources",
    en: "/resources/blog", de: "/de/ressourcen/blog",
    priority: 0.6, changefreq: "weekly",
    sources: [
      "src/pages/Blog.tsx",
      "src/i18n/locales/en/blog.json",
      "src/i18n/locales/de/blog.json",
    ],
  },
  {
    group: "resources",
    en: "/resources/blog/cooling-systems", de: "/de/ressourcen/blog/kuehlsysteme",
    priority: 0.5, changefreq: "monthly",
    sources: [
      "src/pages/blog/CoolingSystems.tsx",
      "src/i18n/locales/en/blog.json",
      "src/i18n/locales/de/blog.json",
    ],
  },
  {
    group: "resources",
    en: "/resources/blog/retrofit-vs-replacement", de: "/de/ressourcen/blog/retrofit-vs-neubeschaffung",
    priority: 0.5, changefreq: "monthly",
    sources: [
      "src/pages/blog/RetrofitVsReplacement.tsx",
      "src/i18n/locales/en/blog.json",
      "src/i18n/locales/de/blog.json",
    ],
  },
  {
    group: "resources",
    en: "/resources/blog/aerospace-qualification-testing", de: "/de/ressourcen/blog/raumfahrtqualifikation",
    priority: 0.5, changefreq: "monthly",
    sources: [
      "src/pages/blog/AerospaceQualification.tsx",
      "src/i18n/locales/en/blog.json",
      "src/i18n/locales/de/blog.json",
    ],
  },
  {
    group: "resources",
    en: "/resources/blog/tvac-cost-drivers", de: "/de/ressourcen/blog/tvac-kostentreiber",
    priority: 0.5, changefreq: "monthly",
    sources: [
      "src/pages/blog/TvacCostDrivers.tsx",
      "src/i18n/locales/en/blog.json",
      "src/i18n/locales/de/blog.json",
    ],
  },
  {
    group: "resources",
    en: "/resources/blog/tvac-test-campaign", de: "/de/ressourcen/blog/tvac-testkampagne",
    priority: 0.5, changefreq: "monthly",
    sources: [
      "src/pages/blog/TvacTestCampaign.tsx",
      "src/i18n/locales/en/blog.json",
      "src/i18n/locales/de/blog.json",
    ],
  },
  {
    group: "resources",
    en: "/careers", de: "/de/karriere",
    priority: 0.5, changefreq: "monthly",
    sources: [
      "src/pages/Careers.tsx",
      "src/i18n/locales/en/careers.json",
      "src/i18n/locales/de/careers.json",
    ],
  },

  // --- legal ---
  {
    group: "legal",
    en: "/imprint", de: "/de/impressum",
    priority: 0.3, changefreq: "yearly",
    sources: [
      "src/pages/Imprint.tsx",
      "src/i18n/locales/en/legal.json",
      "src/i18n/locales/de/legal.json",
    ],
  },
  {
    group: "legal",
    en: "/privacy-policy", de: "/de/datenschutz",
    priority: 0.3, changefreq: "yearly",
    sources: [
      "src/pages/PrivacyPolicy.tsx",
      "src/i18n/locales/en/legal.json",
      "src/i18n/locales/de/legal.json",
    ],
  },
  {
    group: "legal",
    en: "/terms-and-conditions", de: "/de/agb",
    priority: 0.3, changefreq: "yearly",
    sources: [
      "src/pages/TermsAndConditions.tsx",
      "src/i18n/locales/en/legal.json",
      "src/i18n/locales/de/legal.json",
    ],
  },
  {
    group: "legal",
    en: "/media-credits", de: "/de/medienquellen",
    priority: 0.2, changefreq: "yearly",
    sources: ["src/pages/MediaCredits.tsx"],
  },
];

/** Latest git commit ISO timestamp across the given paths. Falls back to file mtime. */
function gitLastmod(paths) {
  let latest = 0;
  for (const rel of paths) {
    const abs = path.join(ROOT, rel);
    try {
      const out = execSync(`git log -1 --format=%cI -- "${rel}"`, {
        cwd: ROOT, stdio: ["ignore", "pipe", "ignore"],
      }).toString().trim();
      if (out) {
        const t = Date.parse(out);
        if (!isNaN(t) && t > latest) latest = t;
        continue;
      }
    } catch { /* ignore */ }
    try {
      const stat = fs.statSync(abs);
      if (stat.mtimeMs > latest) latest = stat.mtimeMs;
    } catch { /* ignore */ }
  }
  if (!latest) latest = Date.now();
  return new Date(latest).toISOString().replace(/\.\d{3}Z$/, "+00:00");
}

function urlBlock({ enUrl, deUrl, lastmod, changefreq, priority, lang }) {
  const loc = lang === "en" ? enUrl : deUrl;
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority.toFixed(2)}</priority>`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>`,
    `    <xhtml:link rel="alternate" hreflang="de" href="${deUrl}"/>`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}"/>`,
    "  </url>",
  ].join("\n");
}

function buildSitemap(group, entries) {
  const urls = [];
  for (const r of entries) {
    const lastmod = gitLastmod(r.sources);
    const enUrl = BASE + r.en;
    const deUrl = BASE + r.de;
    urls.push(urlBlock({ enUrl, deUrl, lastmod, changefreq: r.changefreq, priority: r.priority, lang: "en" }));
    urls.push(urlBlock({ enUrl, deUrl, lastmod, changefreq: r.changefreq, priority: r.priority, lang: "de" }));
  }
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
    urls.join("\n"),
    `</urlset>`,
    ``,
  ].join("\n");
}

function buildIndex(groupLastmods) {
  const items = Object.entries(groupLastmods).map(([group, lastmod]) => [
    "  <sitemap>",
    `    <loc>${BASE}/sitemap-${group}.xml</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    "  </sitemap>",
  ].join("\n")).join("\n");
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    items,
    `</sitemapindex>`,
    ``,
  ].join("\n");
}

const groups = ["main", "services", "resources", "legal"];
const groupLastmods = {};
for (const g of groups) {
  const entries = routes.filter((r) => r.group === g);
  const xml = buildSitemap(g, entries);
  fs.writeFileSync(path.join(PUBLIC_DIR, `sitemap-${g}.xml`), xml);
  // Group lastmod = max lastmod of any contained URL
  const maxIso = entries
    .map((r) => gitLastmod(r.sources))
    .sort()
    .pop();
  groupLastmods[g] = maxIso;
  console.log(`wrote sitemap-${g}.xml (${entries.length * 2} urls, lastmod ${maxIso})`);
}

fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), buildIndex(groupLastmods));
console.log("wrote sitemap.xml (index)");
