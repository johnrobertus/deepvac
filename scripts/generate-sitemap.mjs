#!/usr/bin/env node
/**
 * Sitemap generator for deepvac.space
 *
 * - Emits a sitemap index + 4 sub-sitemaps (main, services, resources, legal)
 * - Consumes src/lib/route-map.json (single source of truth). Entries whose
 *   `sitemap` field is null are excluded (e.g. /tvac-questionnaire).
 * - lastmod is derived from real git commit history of the page's source
 *   files and its primary i18n locale files, so it reflects actual content
 *   changes rather than deploy timestamps.
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

const routeMap = JSON.parse(
  fs.readFileSync(path.join(ROOT, "src/lib/route-map.json"), "utf8"),
);
const routes = routeMap
  .filter((r) => r.sitemap)
  .map((r) => ({
    en: r.en,
    de: r.de,
    group: r.sitemap.group,
    priority: r.sitemap.priority,
    changefreq: r.sitemap.changefreq,
    sources: r.sitemap.sources,
  }));

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
