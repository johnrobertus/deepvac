#!/usr/bin/env node
/**
 * Full prerender pass for deepvac.space.
 *
 * Runs AFTER generate-static-meta.mjs. Spins up a local static server for
 * `dist/`, drives Chromium via @playwright/test through every EN + DE
 * route in src/lib/route-map.json, captures the fully rendered HTML, and
 * writes it back to dist/<route>/index.html — overwriting the head-only
 * version produced by generate-static-meta.mjs with a body that already
 * contains real page content (so social crawlers and no-JS agents see
 * more than an empty <div id="root">).
 *
 * The <head> is normalized so each output file has EXACTLY ONE canonical
 * copy of title / description / canonical / og:* / twitter:* /
 * hreflang trio — the exact values generate-static-meta.mjs would
 * compute — with react-helmet-async duplicates stripped. All
 * <script type="application/ld+json"> blocks (including helmet-injected)
 * are preserved.
 *
 * Robustness contract: this step must NEVER fail the build. If Chromium
 * cannot launch, or an individual route fails/times out, keep the
 * generate-static-meta output for that route, print a warning, and
 * exit 0.
 */
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  routeMap,
  loadSeo,
  computeMeta,
  escapeAttr,
  escapeHtml,
  routeOutputPath,
  ROOT,
  DIST,
} from "./generate-static-meta.mjs";

const PORT = 4173 + Math.floor(Math.random() * 100);
const ORIGIN = `http://127.0.0.1:${PORT}`;
const NAV_TIMEOUT_MS = 15000;
const SETTLE_MS = 250;
const APP_READY_SELECTOR = "main";

// ---------- static file server with SPA fallback ----------
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

function tryFile(absPath) {
  try {
    const stat = fs.statSync(absPath);
    if (stat.isFile()) return stat;
  } catch { /* ignore */ }
  return null;
}

function startServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      try {
        const url = new URL(req.url, ORIGIN);
        const pathname = decodeURIComponent(url.pathname);
        const safe = path.posix.normalize(pathname).replace(/^\/+/, "");
        // 1) exact file
        let filePath = path.join(DIST, safe);
        let stat = tryFile(filePath);
        // 2) directory index.html
        if (!stat) {
          const withIndex = path.join(filePath, "index.html");
          const s2 = tryFile(withIndex);
          if (s2) { filePath = withIndex; stat = s2; }
        }
        // 3) SPA fallback
        if (!stat) {
          filePath = path.join(DIST, "index.html");
          stat = tryFile(filePath);
        }
        if (!stat) { res.statusCode = 404; res.end("not found"); return; }
        const ext = path.extname(filePath).toLowerCase();
        res.setHeader("Content-Type", MIME[ext] || "application/octet-stream");
        res.setHeader("Content-Length", stat.size);
        fs.createReadStream(filePath).pipe(res);
      } catch (err) {
        res.statusCode = 500;
        res.end("server error");
      }
    });
    server.on("error", reject);
    server.listen(PORT, "127.0.0.1", () => resolve(server));
  });
}

// ---------- head normalization ----------
function buildHreflangs(meta) {
  return [
    `<link rel="alternate" hreflang="${meta.lang}" href="${escapeAttr(meta.canonical)}" />`,
    `<link rel="alternate" hreflang="${meta.altLang}" href="${escapeAttr(meta.altHref)}" />`,
    `<link rel="alternate" hreflang="x-default" href="${escapeAttr(meta.xDefaultHref)}" />`,
  ];
}

/**
 * Strip react-helmet duplicates AND any pre-existing static copy of the
 * tags we own, then inject exactly one canonical copy per tag. Preserves
 * every <script type="application/ld+json"> block (including helmet-injected
 * ones with data-rh) and all other head content.
 */
function normalizeHead(html, meta) {
  // Match head content once
  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  if (!headMatch) return html;
  let head = headMatch[1];

  // Remove tags we're going to re-emit (all instances, including
  // static ones and helmet-injected copies with data-rh)
  const removeRegexes = [
    /<title\b[^>]*>[\s\S]*?<\/title>/gi,
    /<meta\b[^>]*name=["']description["'][^>]*>/gi,
    /<link\b[^>]*rel=["']canonical["'][^>]*>/gi,
    /<meta\b[^>]*property=["']og:title["'][^>]*>/gi,
    /<meta\b[^>]*property=["']og:description["'][^>]*>/gi,
    /<meta\b[^>]*property=["']og:url["'][^>]*>/gi,
    /<meta\b[^>]*property=["']og:locale["'][^>]*>/gi,
    /<meta\b[^>]*property=["']og:locale:alternate["'][^>]*>/gi,
    /<meta\b[^>]*name=["']twitter:title["'][^>]*>/gi,
    /<meta\b[^>]*name=["']twitter:description["'][^>]*>/gi,
    /<link\b[^>]*rel=["']alternate["'][^>]*hreflang=["'][^"']*["'][^>]*>/gi,
    /<link\b[^>]*hreflang=["'][^"']*["'][^>]*rel=["']alternate["'][^>]*>/gi,
  ];
  for (const rx of removeRegexes) head = head.replace(rx, "");

  // Compose canonical head insertion
  const injected = [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`,
    `<link rel="canonical" href="${escapeAttr(meta.canonical)}" />`,
    `<meta property="og:title" content="${escapeAttr(meta.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
    `<meta property="og:url" content="${escapeAttr(meta.ogUrl)}" />`,
    `<meta property="og:locale" content="${meta.ogLocale}" />`,
    `<meta property="og:locale:alternate" content="${meta.ogLocaleAlt}" />`,
    `<meta name="twitter:title" content="${escapeAttr(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`,
    ...buildHreflangs(meta),
  ].join("\n    ");

  // Collapse leftover blank lines
  head = head.replace(/(?:\s*\n){2,}/g, "\n").trimEnd();

  const newHead = `\n    ${injected}\n${head}\n  `;
  return html.replace(/<head[^>]*>[\s\S]*?<\/head>/i, (m) => {
    const openTag = m.match(/<head[^>]*>/i)[0];
    return `${openTag}${newHead}</head>`;
  });
}

// Also rewrite <html lang="…">
function setHtmlLang(html, lang) {
  return html.replace(/<html\s+lang="[^"]*"/i, `<html lang="${escapeAttr(lang)}"`);
}

// ---------- main ----------
async function loadPlaywright() {
  try {
    const mod = await import("@playwright/test");
    return mod;
  } catch (err) {
    console.warn("[prerender] @playwright/test not available:", err.message);
    return null;
  }
}

async function prerenderOne(page, route, lang, seoEn, seoDe) {
  const meta = computeMeta(route, lang, seoEn, seoDe);
  const routePath = lang === "en" ? route.en : route.de;
  const url = `${ORIGIN}${routePath}`;

  const response = await page.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: NAV_TIMEOUT_MS,
  });
  if (!response) throw new Error("no navigation response");
  if (response.status() >= 400) throw new Error(`HTTP ${response.status()}`);

  // Do not wait for `networkidle`: the homepage can keep media/asset
  // requests alive long enough to make CI flaky. Also avoid `#root > *`
  // because toaster/live-region portals are root children and may be hidden.
  // A rendered route always contains PageShell's <main>; the Suspense fallback
  // intentionally does not, so this waits for the real page body.
  await page.waitForSelector(APP_READY_SELECTOR, { state: "attached", timeout: NAV_TIMEOUT_MS });
  await page.waitForFunction(
    () => (document.querySelector("main")?.textContent ?? "").trim().length > 0,
    { timeout: NAV_TIMEOUT_MS },
  );
  await page.waitForTimeout(SETTLE_MS);

  let html = await page.content();
  html = setHtmlLang(html, lang);
  html = normalizeHead(html, meta);

  const outFile = routeOutputPath(routePath);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, html);
}

async function main() {
  const distIndex = path.join(DIST, "index.html");
  if (!fs.existsSync(distIndex)) {
    console.warn("[prerender] dist/index.html missing — skipping prerender.");
    return;
  }

  const pw = await loadPlaywright();
  if (!pw) {
    console.warn("[prerender] Playwright unavailable, keeping static-meta output. Skipping.");
    return;
  }

  let server;
  try {
    server = await startServer();
  } catch (err) {
    console.warn("[prerender] could not start static server:", err.message);
    return;
  }

  let browser;
  try {
    browser = await pw.chromium.launch({ headless: true });
  } catch (err) {
    console.warn("[prerender] Chromium launch failed, keeping static-meta output:", err.message);
    server.close();
    return;
  }

  const seoEn = loadSeo("en");
  const seoDe = loadSeo("de");

  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  let ok = 0;
  let fail = 0;
  for (const r of routeMap) {
    for (const lang of ["en", "de"]) {
      const routePath = lang === "en" ? r.en : r.de;
      try {
        await prerenderOne(page, r, lang, seoEn, seoDe);
        ok++;
      } catch (err) {
        fail++;
        console.warn(`[prerender] ${routePath} failed — keeping static-meta version. Reason: ${err.message}`);
      }
    }
  }

  await context.close().catch(() => {});
  await browser.close().catch(() => {});
  server.close();
  console.log(`[prerender] wrote ${ok} route files, ${fail} kept as static-meta fallback`);
}

main().catch((err) => {
  console.warn("[prerender] fatal (non-fatal to build):", err.message);
  // Never fail the build
  process.exit(0);
});
