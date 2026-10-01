// @vitest-environment node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { checkNotFound, checkPage, checkSitemaps, checkStructuredData } from "../../scripts/check-dist.mjs";

const DESC = "Thermal vacuum chambers for space simulation, qualification workflows and retrofit, engineered for contamination-sensitive testing.";

function page(o: Partial<Record<"lang" | "htmlClass" | "title" | "desc" | "canonical" | "hreflang" | "extraHead" | "jsonld", string>> = {}) {
  const lang = o.lang ?? "en";
  const hreflang =
    o.hreflang ??
    `<link rel="alternate" hreflang="en" href="https://deepvac.space/products" />
     <link rel="alternate" hreflang="de" href="https://deepvac.space/de/produkte" />
     <link rel="alternate" hreflang="x-default" href="https://deepvac.space/products" />`;
  return `<!doctype html><html lang="${lang}"${o.htmlClass ? ` class="${o.htmlClass}"` : ""}><head>
    ${o.title ?? "<title>Products | Deepvac</title>"}
    ${o.desc ?? `<meta name="description" content="${DESC}" />`}
    ${o.canonical ?? '<link rel="canonical" href="https://deepvac.space/products" />'}
    ${hreflang}
    ${o.jsonld ?? '<script type="application/ld+json">{"@type":"Organization","name":"Deepvac"}</script>'}
    ${o.extraHead ?? ""}
  </head><body><main><h1>Products</h1><svg><title>icon</title></svg></main></body></html>`;
}
const route = { path: "/products", lang: "en" as const };
const run = (html: string) => checkPage(html, route);

describe("check-dist checkPage", () => {
  it("passes a valid page", () => {
    expect(run(page())).toEqual({ errors: [], warnings: [] });
  });
  it("fails on a missing title", () => expect(run(page({ title: "" })).errors.join()).toMatch(/expected 1 <title>, found 0/));
  it("fails on duplicate titles", () => expect(run(page({ title: "<title>A</title><title>B</title>" })).errors.join()).toMatch(/found 2/));
  it("fails on an empty title", () => expect(run(page({ title: "<title> </title>" })).errors.join()).toMatch(/empty <title>/));
  it("fails on duplicate descriptions", () =>
    expect(run(page({ extraHead: `<meta name="description" content="${DESC}" />` })).errors.join()).toMatch(/meta description, found 2/));
  it("fails on an empty description", () => expect(run(page({ desc: '<meta name="description" content="" />' })).errors.join()).toMatch(/empty meta description/));
  it("fails on a too short description", () =>
    expect(run(page({ desc: '<meta name="description" content="Too short." />' })).errors.join()).toMatch(/length 10 outside 70-170/));
  it("fails on a too long description", () =>
    expect(run(page({ desc: `<meta name="description" content="${"x".repeat(171)}" />` })).errors.join()).toMatch(/length 171/));
  it("only warns outside 120-155", () => {
    const r = run(page({ desc: `<meta name="description" content="${"x".repeat(100)}" />` }));
    expect(r.errors).toEqual([]);
    expect(r.warnings.join()).toMatch(/outside 120-155/);
  });
  it("fails on a missing canonical", () => expect(run(page({ canonical: "" })).errors.join()).toMatch(/expected 1 canonical, found 0/));
  it("fails on a relative canonical", () =>
    expect(run(page({ canonical: '<link rel="canonical" href="/products" />' })).errors.join()).toMatch(/canonical is \/products/));
  it("fails on a canonical to another page", () =>
    expect(run(page({ canonical: '<link rel="canonical" href="https://deepvac.space/" />' })).errors.join()).toMatch(/expected https:\/\/deepvac.space\/products/));
  it("fails on a missing hreflang", () =>
    expect(run(page({ hreflang: '<link rel="alternate" hreflang="en" href="https://deepvac.space/products" />' })).errors.join()).toMatch(/hreflang="de", found 0/));
  it("fails on a duplicate hreflang", () =>
    expect(run(page({ extraHead: '<link rel="alternate" hreflang="de" href="https://deepvac.space/de/produkte" />' })).errors.join()).toMatch(/hreflang="de", found 2/));
  it("fails on a wrong html lang", () => expect(run(page({ lang: "de" })).errors.join()).toMatch(/<html lang="de">, expected "en"/));
  it("fails on invalid JSON-LD", () =>
    expect(run(page({ jsonld: '<script type="application/ld+json">{bad</script>' })).errors.join()).toMatch(/does not parse/));
  it("fails on duplicate JSON-LD", () =>
    expect(run(page({ extraHead: '<script type="application/ld+json">{ "@type": "Organization", "name": "Deepvac" }</script>' })).errors.join()).toMatch(/duplicates/));
  it("fails on a Turnstile script", () =>
    expect(run(page({ extraHead: '<script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"></script>' })).errors.join()).toMatch(/challenges\.cloudflare\.com/));
  it("fails on a Plausible script", () =>
    expect(run(page({ extraHead: '<script defer src="https://plausible.io/js/script.js"></script>' })).errors.join()).toMatch(/plausible\.io/));
  it("fails on js-reveal on <html>", () => expect(run(page({ htmlClass: "dark js-reveal" })).errors.join()).toMatch(/js-reveal/));
});

describe("check-dist file checks", () => {
  function tmp(files: Record<string, string>) {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "check-dist-"));
    for (const [rel, content] of Object.entries(files)) {
      fs.mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true });
      fs.writeFileSync(path.join(dir, rel), content);
    }
    return dir;
  }

  it("requires robots noindex on 404 pages", () => {
    expect(checkNotFound('<html><head><meta name="robots" content="noindex, follow" /></head></html>')).toEqual([]);
    expect(checkNotFound("<html><head><title>404</title></head></html>")).toHaveLength(1);
  });

  it("maps sitemap locs to prerendered files", () => {
    const dir = tmp({
      "sitemap.xml": '<sitemapindex><sitemap><loc>https://deepvac.space/sitemap-main.xml</loc></sitemap><sitemap><loc>https://deepvac.space/sitemap-x.xml</loc></sitemap></sitemapindex>',
      "sitemap-main.xml": "<urlset><url><loc>https://deepvac.space/</loc></url><url><loc>https://deepvac.space/de</loc></url><url><loc>https://deepvac.space/gone</loc></url></urlset>",
      "index.html": "x",
      "de/index.html": "x",
    });
    const errors = checkSitemaps(dir);
    expect(errors).toHaveLength(2);
    expect(errors.join()).toMatch(/sitemap-x\.xml referenced but missing/);
    expect(errors.join()).toMatch(/\/gone has no prerendered file/);
  });

  it("enforces structured-data minimums", () => {
    const dir = tmp({
      "a/index.html": page({ jsonld: '<script type="application/ld+json">[{"@type":"Product"},{"@type":"Product","name":"b"}]</script>' }),
    });
    expect(checkStructuredData(dir, [["a", "Product", 2]])).toEqual([]);
    expect(checkStructuredData(dir, [["a", "BreadcrumbList", 1]]).join()).toMatch(/found 0/);
    expect(checkStructuredData(dir, [["b", "Product", 1]]).join()).toMatch(/missing/);
  });
});
