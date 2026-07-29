#!/usr/bin/env node
/**
 * Static per-route <head> generator for deepvac.space
 *
 * The app is a Vite CSR SPA — social/preview crawlers only see the static
 * index.html head. This script runs postbuild and writes a dedicated
 * dist/<route>/index.html for every route pair in src/lib/route-map.json,
 * with the correct <title>, description, canonical, og:*, twitter:*,
 * hreflang and <html lang> injected server-side.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const BASE = "https://deepvac.space";

const routeMap = JSON.parse(
  fs.readFileSync(path.join(ROOT, "src/lib/route-map.json"), "utf8"),
);

export function escapeAttr(v) {
  return String(v)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function escapeHtml(v) {
  return String(v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function loadSeo(lang) {
  const p = path.join(ROOT, "src/i18n/locales", lang, "seo.json");
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

const optionItemsByLang = new Map();

function loadOptionItems(lang) {
  if (optionItemsByLang.has(lang)) return optionItemsByLang.get(lang);

  const p = path.join(ROOT, "src/i18n/locales", lang, "products.json");
  const products = JSON.parse(fs.readFileSync(p, "utf8"));
  const items = products.options?.items ?? [];
  optionItemsByLang.set(lang, items);
  return items;
}

function optionSeo(slug, lang) {
  const item = loadOptionItems(lang).find((candidate) => candidate.slug === slug);
  if (!item) return null;

  return {
    title: `${item.name} | Deepvac`,
    description: item.description.replace("{{link}}", item.linkLabel ?? ""),
  };
}

export function pickSeo(seo, key) {
  if (seo[key] && seo[key].title && seo[key].description) return seo[key];
  return seo.home;
}

/**
 * Compute the canonical head values for a route+lang. Exported so the
 * prerender pass can produce identical output as this static writer.
 */
export function computeMeta(route, lang, seoEn, seoDe) {
  const baseSeo = lang === "de" ? pickSeo(seoDe, route.seoKey) : pickSeo(seoEn, route.seoKey);
  const seo = route.optionSlug ? optionSeo(route.optionSlug, lang) ?? baseSeo : baseSeo;
  const enUrl = BASE + route.en;
  const deUrl = BASE + route.de;
  const canonical = lang === "de" ? deUrl : enUrl;
  return {
    title: seo.title,
    description: seo.description,
    canonical,
    ogUrl: canonical,
    lang,
    altLang: lang === "de" ? "en" : "de",
    altHref: lang === "de" ? enUrl : deUrl,
    xDefaultHref: enUrl,
    ogLocale: lang === "de" ? "de_DE" : "en_US",
    ogLocaleAlt: lang === "de" ? "en_US" : "de_DE",
    enUrl,
    deUrl,
    robots: route.sitemap === null ? "noindex, follow" : null,
  };
}

function buildStaticFallbackBody(meta) {
  return `
      <main style="min-height:100vh;background:#000;color:#e6e6d6;padding:4rem 1.5rem;font-family:Arial,sans-serif;line-height:1.5">
        <div style="max-width:72rem;margin:0 auto">
          <p style="margin:0 0 1rem;color:#99ccd9;text-transform:uppercase;letter-spacing:.12em;font-size:.75rem">Deepvac</p>
          <h1 style="margin:0 0 1rem;font-size:clamp(2rem,5vw,4rem);font-weight:500">${escapeHtml(meta.title)}</h1>
          <p style="margin:0;max-width:48rem;color:#b0b0a8;font-size:1.125rem">${escapeHtml(meta.description)}</p>
        </div>
      </main>`;
}

export function rewriteHead(template, meta) {
  const {
    title, description, canonical, ogUrl, lang, altLang, altHref, xDefaultHref,
    ogLocale, ogLocaleAlt, robots,
  } = meta;
  let html = template;

  // <html lang="…">
  html = html.replace(/<html\s+lang="[^"]*"/, `<html lang="${escapeAttr(lang)}"`);

  // <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);

  // meta name=description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeAttr(description)}" />`,
  );

  // canonical
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${escapeAttr(canonical)}" />`,
  );

  // og:url
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${escapeAttr(ogUrl)}" />`,
  );

  // og:locale + alternate
  html = html.replace(
    /<meta\s+property="og:locale"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:locale" content="${ogLocale}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:locale:alternate"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:locale:alternate" content="${ogLocaleAlt}" />`,
  );

  // og:title / og:description
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escapeAttr(description)}" />`,
  );

  // twitter:title / twitter:description
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
  );

  // robots (noindex for routes excluded from the sitemap)
  if (robots) {
    html = html.replace(
      /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/,
      `<meta name="robots" content="${escapeAttr(robots)}" />`,
    );
  }

  // hreflang alternates — inject just before </head>
  const hreflangs = [
    `<link rel="alternate" hreflang="${lang}" href="${escapeAttr(canonical)}" />`,
    `<link rel="alternate" hreflang="${altLang}" href="${escapeAttr(altHref)}" />`,
    `<link rel="alternate" hreflang="x-default" href="${escapeAttr(xDefaultHref)}" />`,
  ].join("\n    ");
  html = html.replace("</head>", `    ${hreflangs}\n  </head>`);

  // Keep route files useful even if the full Playwright prerender pass cannot
  // run in an environment. React createRoot will replace this immediately for
  // normal visitors, while crawlers/no-JS agents still see visible body text.
  html = html.replace('<div id="root"></div>', `<div id="root">${buildStaticFallbackBody(meta)}\n    </div>`);

  return html;
}

export function routeOutputPath(routePath) {
  if (routePath === "/") return path.join(DIST, "index.html");
  const clean = routePath.replace(/^\/+/, "");
  return path.join(DIST, clean, "index.html");
}

function writeRouteFile(routePath, html) {
  const outFile = routeOutputPath(routePath);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, html);
  return outFile;
}

export { routeMap, BASE, DIST, ROOT };

function main() {
  const indexPath = path.join(DIST, "index.html");
  if (!fs.existsSync(indexPath)) {
    console.error(`[static-meta] dist/index.html not found — did vite build run?`);
    process.exit(1);
  }
  const template = fs.readFileSync(indexPath, "utf8");
  const seoEn = loadSeo("en");
  const seoDe = loadSeo("de");

  let count = 0;
  for (const r of routeMap) {
    const enMeta = computeMeta(r, "en", seoEn, seoDe);
    const deMeta = computeMeta(r, "de", seoEn, seoDe);
    writeRouteFile(r.en, rewriteHead(template, enMeta));
    writeRouteFile(r.de, rewriteHead(template, deMeta));
    count += 2;
  }

  console.log(`[static-meta] wrote ${count} route index.html files under dist/`);
}

// Only run when invoked directly (not when imported by prerender)
const invokedDirectly = fileURLToPath(import.meta.url) === path.resolve(process.argv[1] || "");
if (invokedDirectly) main();
