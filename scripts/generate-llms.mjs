#!/usr/bin/env node
/**
 * llms.txt generator for deepvac.space (https://llmstxt.org convention).
 *
 * Produces a concise, machine-readable guide to the site for AI crawlers and
 * answer engines. The engineering-blog section is generated from
 * src/content/blog/part*.json + legacy.json, so newly added articles appear
 * automatically. Runs in `prebuild`; never fails the build.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BASE = "https://deepvac.space";

const CATS = [
  ["basics", "Fundamentals"],
  ["engineeringGuide", "Engineering guides"],
  ["applications", "Applications"],
  ["decisionSupport", "Decision support"],
];

function main() {
  const dir = path.join(ROOT, "src/content/blog");
  const items = [];
  if (fs.existsSync(dir)) {
    for (const f of fs.readdirSync(dir).sort()) {
      if (!f.endsWith(".json")) continue;
      const arr = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
      for (const p of arr) {
        items.push({
          slug: p.enSlug,
          title: p.en.title,
          desc: p.en.description,
          cat: p.category,
        });
      }
    }
  }

  const L = [];
  L.push("# Deepvac");
  L.push("");
  L.push("> Deepvac GmbH designs and builds thermal vacuum (TVAC) chambers and systems for aerospace qualification, space simulation, and research. Chamber, controls, and service from one source — engineered and built in Germany (Garbsen).");
  L.push("");
  L.push("Deepvac offers standardized Standard Series TVAC platforms (cubic T Series and cylindrical C Series, 65-2000 L, working pressure <= 1e-6 mbar, -180 to +150 C), fully custom TVAC systems, the Deepvac Thermal Vision in-chamber infrared camera, and engineering services (testing, control systems, mechanical design, retrofit & modernization, maintenance, subsystem integration). All pages are available in English and German (/de/...).");
  L.push("");
  L.push("## Core pages");
  L.push("");
  L.push(`- [Thermal vacuum chambers](${BASE}/products): TVAC product overview`);
  L.push(`- [Standard Series TVAC](${BASE}/products/standard-series): modular chamber platforms, sizes and performance data`);
  L.push(`- [Custom TVAC](${BASE}/products/custom-tvac): bespoke systems for special geometries and requirements`);
  L.push(`- [Chamber options](${BASE}/products/options): solar simulation, bake-out, oil-free pumping, RGA, QCM, viewports and more`);
  L.push(`- [Deepvac Thermal Vision](${BASE}/products/thermal-vision): pressure-rated infrared camera for in-chamber thermography`);
  L.push(`- [Engineering services](${BASE}/services): testing, controls, mechanical design, retrofit, maintenance, integration`);
  L.push(`- [TVAC testing services](${BASE}/services/testing-services): thermal vacuum test campaign execution`);
  L.push(`- [Technical TVAC questionnaire](${BASE}/tvac-questionnaire): structured requirements capture for a quotation`);
  L.push(`- [Contact](${BASE}/contact): technical inquiries`);
  L.push("");
  L.push("## Engineering blog");
  L.push("");
  L.push("Technical guidance on thermal vacuum testing, chamber engineering, and procurement decisions. Every article is available in English and German.");
  L.push("");
  for (const [key, name] of CATS) {
    const group = items.filter((i) => i.cat === key);
    if (!group.length) continue;
    L.push(`### ${name}`);
    L.push("");
    for (const i of group) {
      L.push(`- [${i.title}](${BASE}/resources/blog/${i.slug}): ${i.desc}`);
    }
    L.push("");
  }

  fs.writeFileSync(path.join(ROOT, "public", "llms.txt"), L.join("\n"));
  console.log(`[llms] wrote public/llms.txt (${items.length} articles)`);
}

try {
  main();
} catch (err) {
  console.warn("[llms] non-fatal:", err.message);
  process.exit(0);
}
