#!/usr/bin/env node
/**
 * Post-build gate for dist/ (run after `npm run build`).
 *
 * Checks every prerendered route from src/lib/route-map.json in the layout
 * scripts/prerender.mjs writes (dist/index.html, dist/<path>/index.html),
 * the 404 pages, sitemaps, healthz and the Wave 2 structured-data minimums.
 * Prints one line per problem plus a summary; exits 1 on any error.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
export const BASE = "https://deepvac.space";

export const DESC_MIN = 70;
export const DESC_MAX = 170;
export const DESC_WARN_MIN = 120;
export const DESC_WARN_MAX = 155;

/** Same pages and minimums as .github/workflows/verify-wave2-structured-data.yml. */
export const STRUCTURED_DATA_CHECKS = [
  ["products/standard-series", "BreadcrumbList", 1],
  ["products/standard-series", "Product", 2],
  ["de/produkte/standard-serie", "BreadcrumbList", 1],
  ["de/produkte/standard-serie", "Product", 2],
  ["products/thermal-vision", "BreadcrumbList", 1],
  ["products/thermal-vision", "Product", 1],
  ["products/options/solar-simulator", "BreadcrumbList", 1],
  ["services/control-systems-design", "BreadcrumbList", 1],
  ["resources/blog/cooling-systems", "BreadcrumbList", 1],
  ["resources/blog/cooling-systems", "BlogPosting", 1],
  ["de/ressourcen/blog/kuehlsysteme", "BlogPosting", 1],
  ["resources/blog/what-is-thermal-vacuum-testing", "BreadcrumbList", 1],
  ["resources/blog/what-is-thermal-vacuum-testing", "BlogPosting", 1],
  ["de/ressourcen/blog/was-ist-thermalvakuumtest", "BlogPosting", 1],
];

const JSONLD_RX = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

function decode(v) {
  return String(v)
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function attr(tag, name) {
  const m = tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])([\\s\\S]*?)\\1`, "i"));
  return m ? decode(m[2]) : null;
}

function headOf(html) {
  const m = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i);
  return m ? m[1] : "";
}

/** Path → dist file, identical to routeOutputPath in generate-static-meta.mjs. */
export function routeFile(distDir, routePath) {
  if (routePath === "/") return path.join(distDir, "index.html");
  return path.join(distDir, routePath.replace(/^\/+/, "").replace(/\/+$/, ""), "index.html");
}

/**
 * Checks one prerendered page.
 * @param {string} html
 * @param {{ path: string, lang: "en" | "de" }} route
 * @returns {{ errors: string[], warnings: string[] }}
 */
export function checkPage(html, route) {
  const errors = [];
  const warnings = [];
  const head = headOf(html);
  if (!head) errors.push("no <head>");

  const titles = [...head.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)];
  if (titles.length !== 1) errors.push(`expected 1 <title>, found ${titles.length}`);
  else if (!decode(titles[0][1]).trim()) errors.push("empty <title>");

  const descs = [...head.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0]).filter((t) => (attr(t, "name") || "").toLowerCase() === "description");
  if (descs.length !== 1) errors.push(`expected 1 meta description, found ${descs.length}`);
  else {
    const d = (attr(descs[0], "content") || "").trim();
    if (!d) errors.push("empty meta description");
    else if (d.length < DESC_MIN || d.length > DESC_MAX) errors.push(`meta description length ${d.length} outside ${DESC_MIN}-${DESC_MAX}`);
    else if (d.length < DESC_WARN_MIN || d.length > DESC_WARN_MAX) warnings.push(`meta description length ${d.length} outside ${DESC_WARN_MIN}-${DESC_WARN_MAX}`);
  }

  const links = [...head.matchAll(/<link\b[^>]*>/gi)].map((m) => m[0]);
  const canon = links.filter((t) => (attr(t, "rel") || "").toLowerCase() === "canonical");
  const expected = BASE + route.path;
  if (canon.length !== 1) errors.push(`expected 1 canonical, found ${canon.length}`);
  else if (attr(canon[0], "href") !== expected) errors.push(`canonical is ${attr(canon[0], "href")}, expected ${expected}`);

  const alts = links.filter((t) => (attr(t, "rel") || "").toLowerCase() === "alternate" && attr(t, "hreflang") !== null);
  for (const lang of ["en", "de", "x-default"]) {
    const found = alts.filter((t) => attr(t, "hreflang").toLowerCase() === lang);
    if (found.length !== 1) errors.push(`expected 1 hreflang="${lang}", found ${found.length}`);
    else if (!(attr(found[0], "href") || "").startsWith(BASE + "/")) errors.push(`hreflang="${lang}" is not absolute on ${BASE}`);
  }

  const htmlTag = (html.match(/<html\b[^>]*>/i) || [""])[0];
  const lang = attr(htmlTag, "lang");
  if (lang !== route.lang) errors.push(`<html lang="${lang}">, expected "${route.lang}"`);
  if ((attr(htmlTag, "class") || "").split(/\s+/).includes("js-reveal")) errors.push("<html> has js-reveal class");

  const seen = new Set();
  let i = 0;
  for (const m of html.matchAll(JSONLD_RX)) {
    i++;
    let key;
    try {
      key = JSON.stringify(JSON.parse(m[1].trim()));
    } catch (err) {
      errors.push(`JSON-LD block ${i} does not parse: ${err.message}`);
      continue;
    }
    if (seen.has(key)) errors.push(`JSON-LD block ${i} duplicates an earlier block`);
    seen.add(key);
  }

  for (const m of html.matchAll(/<script\b[^>]*>/gi)) {
    const src = attr(m[0], "src") || "";
    if (/^https?:\/\/(challenges\.cloudflare\.com|plausible\.io)(\/|$)/i.test(src)) errors.push(`third-party script in static HTML: ${src}`);
  }

  return { errors, warnings };
}

/** Parsed JSON-LD entities of a page (arrays flattened). */
export function readSchemas(html) {
  const out = [];
  for (const m of html.matchAll(JSONLD_RX)) {
    try {
      const parsed = JSON.parse(m[1].trim());
      out.push(...(Array.isArray(parsed) ? parsed : [parsed]));
    } catch { /* reported by checkPage */ }
  }
  return out;
}

export function checkStructuredData(distDir, checks = STRUCTURED_DATA_CHECKS) {
  const errors = [];
  for (const [rel, type, min] of checks) {
    const file = path.join(distDir, rel, "index.html");
    if (!fs.existsSync(file)) { errors.push(`${rel}: missing for structured-data check`); continue; }
    const count = readSchemas(fs.readFileSync(file, "utf8")).filter((s) => s?.["@type"] === type).length;
    if (count < min) errors.push(`${rel}: expected at least ${min} ${type} schema(s), found ${count}`);
  }
  return errors;
}

export function checkNotFound(html) {
  const robots = [...headOf(html).matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0]).filter((t) => (attr(t, "name") || "").toLowerCase() === "robots");
  return robots.some((t) => /noindex/i.test(attr(t, "content") || "")) ? [] : ["no robots noindex meta"];
}

function locs(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((m) => decode(m[1]));
}

export function checkSitemaps(distDir) {
  const errors = [];
  const index = path.join(distDir, "sitemap.xml");
  if (!fs.existsSync(index)) return ["sitemap.xml missing"];
  const indexXml = fs.readFileSync(index, "utf8");
  const files = /<sitemapindex\b/i.test(indexXml) ? locs(indexXml) : [`${BASE}/sitemap.xml`];
  for (const url of files) {
    const rel = url.replace(BASE, "").replace(/^\/+/, "");
    const file = path.join(distDir, rel);
    if (!fs.existsSync(file)) { errors.push(`sitemap ${rel} referenced but missing`); continue; }
    for (const loc of locs(fs.readFileSync(file, "utf8"))) {
      if (!loc.startsWith(BASE)) { errors.push(`${rel}: <loc> ${loc} not on ${BASE}`); continue; }
      const p = loc.slice(BASE.length) || "/";
      if (!fs.existsSync(routeFile(distDir, p))) errors.push(`${rel}: <loc> ${loc} has no prerendered file`);
    }
  }
  return errors;
}

export function runChecks(distDir, routeMap) {
  const errors = [];
  const warnings = [];
  for (const r of routeMap) {
    for (const lang of ["en", "de"]) {
      const p = r[lang];
      const file = routeFile(distDir, p);
      if (!fs.existsSync(file)) { errors.push(`${p}: prerendered file missing (${path.relative(distDir, file)})`); continue; }
      const res = checkPage(fs.readFileSync(file, "utf8"), { path: p, lang });
      errors.push(...res.errors.map((e) => `${p}: ${e}`));
      warnings.push(...res.warnings.map((w) => `${p}: ${w}`));
    }
  }
  for (const rel of ["404.html", "de/404.html"]) {
    const file = path.join(distDir, rel);
    if (!fs.existsSync(file)) errors.push(`${rel} missing`);
    else errors.push(...checkNotFound(fs.readFileSync(file, "utf8")).map((e) => `${rel}: ${e}`));
  }
  errors.push(...checkSitemaps(distDir));
  if (!fs.existsSync(path.join(distDir, "healthz"))) errors.push("healthz missing");
  errors.push(...checkStructuredData(distDir));
  return { errors, warnings };
}

function main() {
  const distDir = path.resolve(process.argv[2] || path.join(ROOT, "dist"));
  const routeMap = JSON.parse(fs.readFileSync(path.join(ROOT, "src/lib/route-map.json"), "utf8"));
  const { errors, warnings } = runChecks(distDir, routeMap);
  for (const w of warnings) console.log(`warning  ${w}`);
  for (const e of errors) console.log(`error    ${e}`);
  console.log(`[check:dist] ${routeMap.length * 2} routes, ${errors.length} error(s), ${warnings.length} warning(s)`);
  process.exit(errors.length ? 1 : 0);
}

if (fileURLToPath(import.meta.url) === path.resolve(process.argv[1] || "")) main();
