#!/usr/bin/env node
/**
 * RSS 2.0 feed generator for the Deepvac engineering blog.
 *
 * Scans src/content/blog/*.json (part files + legacy refs) and writes
 * public/rss.xml with the English canonical URLs, newest first.
 * Runs in `prebuild`; never fails the build.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BASE = "https://deepvac.space";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function main() {
  const dir = path.join(ROOT, "src/content/blog");
  if (!fs.existsSync(dir)) {
    console.warn("[rss] src/content/blog missing — skipping feed.");
    return;
  }
  const items = [];
  for (const f of fs.readdirSync(dir).sort()) {
    if (!f.endsWith(".json")) continue;
    const arr = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
    for (const p of arr) {
      items.push({
        slug: p.enSlug,
        title: p.en.title,
        description: p.en.description,
        date: p.datePublished,
        category: p.category,
      });
    }
  }
  items.sort((a, b) => (a.date < b.date ? 1 : -1));

  const lastBuild = items.length
    ? new Date(items[0].date).toUTCString()
    : new Date(0).toUTCString();

  const body = items
    .map((it) => {
      const url = `${BASE}/resources/blog/${it.slug}`;
      return [
        "    <item>",
        `      <title>${esc(it.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${new Date(it.date).toUTCString()}</pubDate>`,
        `      <category>${esc(it.category)}</category>`,
        `      <description>${esc(it.description)}</description>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    "    <title>Deepvac Engineering Blog</title>",
    `    <link>${BASE}/resources/blog</link>`,
    "    <description>Technical articles on thermal vacuum systems, space simulation, qualification testing, and TVAC engineering practice.</description>",
    "    <language>en</language>",
    `    <lastBuildDate>${lastBuild}</lastBuildDate>`,
    `    <atom:link href="${BASE}/rss.xml" rel="self" type="application/rss+xml" />`,
    body,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  fs.writeFileSync(path.join(ROOT, "public", "rss.xml"), xml);
  console.log(`[rss] wrote public/rss.xml (${items.length} items)`);
}

try {
  main();
} catch (err) {
  console.warn("[rss] non-fatal:", err.message);
  process.exit(0);
}
