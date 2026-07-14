#!/usr/bin/env node
/**
 * Static per-route <head> generator for deepvac.space
 *
 * The app is a Vite CSR SPA — social/preview crawlers only see the static
 * index.html head. This script runs postbuild and writes a dedicated
 * dist/<route>/index.html for every route pair in src/lib/routes.ts, with
 * the correct <title>, description, canonical, og:*, twitter:*, hreflang
 * and <html lang> injected server-side.
 *
 * Keep the route list here in sync with src/lib/routes.ts.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const BASE = "https://deepvac.space";

// Mirror of src/lib/routes.ts routeMap. Add a `seoKey` matching a top-level
// key in src/i18n/locales/{en,de}/seo.json. If a route has no dedicated
// seo entry, fall back to "home".
const routes = [
  { en: "/", de: "/de", seoKey: "home" },
  { en: "/products", de: "/de/produkte", seoKey: "products" },
  { en: "/products/standard-series", de: "/de/produkte/standard-serie", seoKey: "standardSeries" },
  { en: "/products/custom-tvac", de: "/de/produkte/custom-tvac", seoKey: "customTvac" },
  { en: "/products/thermal-vision", de: "/de/produkte/thermal-vision", seoKey: "thermalVision" },
  { en: "/services", de: "/de/leistungen", seoKey: "services" },
  { en: "/services/testing-services", de: "/de/leistungen/pruefdienstleistungen", seoKey: "testingServices" },
  { en: "/services/control-systems-design", de: "/de/leistungen/steuerungstechnik", seoKey: "controlSystems" },
  { en: "/services/mechanical-design", de: "/de/leistungen/mechanische-konstruktion", seoKey: "mechanicalDesign" },
  { en: "/services/retrofit-modernization", de: "/de/leistungen/retrofit-modernisierung", seoKey: "retrofitModernization" },
  { en: "/services/maintenance-repair", de: "/de/leistungen/wartung-reparatur", seoKey: "maintenanceRepair" },
  { en: "/services/subsystem-integration", de: "/de/leistungen/subsystem-integration", seoKey: "subsystemIntegration" },
  { en: "/team", de: "/de/team", seoKey: "team" },
  { en: "/resources", de: "/de/ressourcen", seoKey: "resources" },
  { en: "/catalogs", de: "/de/kataloge", seoKey: "catalogs" },
  { en: "/resources/blog", de: "/de/ressourcen/blog", seoKey: "resources" },
  { en: "/resources/blog/cooling-systems", de: "/de/ressourcen/blog/kuehlsysteme", seoKey: "resources" },
  { en: "/resources/blog/retrofit-vs-replacement", de: "/de/ressourcen/blog/retrofit-vs-neubeschaffung", seoKey: "resources" },
  { en: "/resources/blog/aerospace-qualification-testing", de: "/de/ressourcen/blog/raumfahrtqualifikation", seoKey: "resources" },
  { en: "/resources/blog/tvac-cost-drivers", de: "/de/ressourcen/blog/tvac-kostentreiber", seoKey: "resources" },
  { en: "/careers", de: "/de/karriere", seoKey: "careers" },
  { en: "/references", de: "/de/referenzen", seoKey: "references" },
  { en: "/contact", de: "/de/kontakt", seoKey: "contact" },
  { en: "/tvac-questionnaire", de: "/de/tvac-fragebogen", seoKey: "questionnaire" },
  { en: "/imprint", de: "/de/impressum", seoKey: "imprint" },
  { en: "/privacy-policy", de: "/de/datenschutz", seoKey: "privacyPolicy" },
  { en: "/terms-and-conditions", de: "/de/agb", seoKey: "termsAndConditions" },
  { en: "/media-credits", de: "/de/medienquellen", seoKey: "mediaCredits" },
];

function escapeAttr(v) {
  return String(v)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeHtml(v) {
  return String(v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function loadSeo(lang) {
  const p = path.join(ROOT, "src/i18n/locales", lang, "seo.json");
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function pick(seo, key) {
  if (seo[key] && seo[key].title && seo[key].description) return seo[key];
  return seo.home;
}

function rewriteHead(template, { title, description, canonical, ogUrl, lang, altLang, altHref, xDefaultHref }) {
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
  const ogLocale = lang === "de" ? "de_DE" : "en_US";
  const ogAlt = lang === "de" ? "en_US" : "de_DE";
  html = html.replace(
    /<meta\s+property="og:locale"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:locale" content="${ogLocale}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:locale:alternate"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:locale:alternate" content="${ogAlt}" />`,
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

  // hreflang alternates — inject just before </head>
  const hreflangs = [
    `<link rel="alternate" hreflang="${lang}" href="${escapeAttr(canonical)}" />`,
    `<link rel="alternate" hreflang="${altLang}" href="${escapeAttr(altHref)}" />`,
    `<link rel="alternate" hreflang="x-default" href="${escapeAttr(xDefaultHref)}" />`,
  ].join("\n    ");
  html = html.replace("</head>", `    ${hreflangs}\n  </head>`);

  return html;
}

function writeRouteFile(routePath, html) {
  // Root EN "/" — dist/index.html already exists; overwrite in place.
  if (routePath === "/") {
    fs.writeFileSync(path.join(DIST, "index.html"), html);
    return path.join(DIST, "index.html");
  }
  const clean = routePath.replace(/^\/+/, "");
  const outDir = path.join(DIST, clean);
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, "index.html");
  fs.writeFileSync(outFile, html);
  return outFile;
}

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
  for (const r of routes) {
    const enSeo = pick(seoEn, r.seoKey);
    const deSeo = pick(seoDe, r.seoKey);
    const enUrl = BASE + r.en;
    const deUrl = BASE + r.de;

    const enHtml = rewriteHead(template, {
      title: enSeo.title,
      description: enSeo.description,
      canonical: enUrl,
      ogUrl: enUrl,
      lang: "en",
      altLang: "de",
      altHref: deUrl,
      xDefaultHref: enUrl,
    });
    const deHtml = rewriteHead(template, {
      title: deSeo.title,
      description: deSeo.description,
      canonical: deUrl,
      ogUrl: deUrl,
      lang: "de",
      altLang: "en",
      altHref: enUrl,
      xDefaultHref: enUrl,
    });

    writeRouteFile(r.en, enHtml);
    writeRouteFile(r.de, deHtml);
    count += 2;
  }

  console.log(`[static-meta] wrote ${count} route index.html files under dist/`);
}

main();
