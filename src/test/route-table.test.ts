// @vitest-environment node
import fs from "node:fs";
import path from "node:path";
import { matchPath } from "react-router-dom";
import { describe, expect, it } from "vitest";
import routeMap from "@/lib/route-map.json";
import legacy from "@/content/blog/legacy.json";
import { BLOG_CATEGORIES } from "@/lib/blogCategories";
import enProducts from "@/i18n/locales/en/products.json";
import deProducts from "@/i18n/locales/de/products.json";

type Route = { en: string; de: string; seoKey: string; optionSlug?: string };
const routes = routeMap as Route[];
const BLOG_DIR = path.resolve(__dirname, "../content/blog");
type Post = { enSlug: string; deSlug: string; seoKey: string };
const posts: Post[] = fs
  .readdirSync(BLOG_DIR)
  .filter((f) => /^part.*\.json$/.test(f))
  .flatMap((f) => JSON.parse(fs.readFileSync(path.join(BLOG_DIR, f), "utf8")) as Post[]);

/** Paths declared in the single route table in src/routes.tsx. */
const tablePaths = [...fs.readFileSync(path.resolve(__dirname, "../routes.tsx"), "utf8").matchAll(/\{\s*path:\s*"([^"]+)"/g)].map((m) => m[1]);
const ALIASES = new Set(["/services/retrofit-modernisation", "/catalogues"]);
const staticTable = tablePaths.filter((p) => p !== "*" && !ALIASES.has(p) && !p.includes(":"));
const paramTable = tablePaths.filter((p) => p.includes(":"));
const mapPaths = routes.flatMap((r) => [r.en, r.de]);

describe("route table", () => {
  it("has unique EN and DE paths", () => {
    expect(new Set(mapPaths).size).toBe(mapPaths.length);
    expect(new Set(tablePaths).size).toBe(tablePaths.length);
  });

  it("lists every static routes.tsx path in route-map.json", () => {
    expect(staticTable.filter((p) => !mapPaths.includes(p))).toEqual([]);
  });

  it("serves every route-map.json path from routes.tsx", () => {
    const unmatched = mapPaths.filter((p) => !tablePaths.some((t) => t !== "*" && matchPath({ path: t, end: true }, p)));
    expect(unmatched).toEqual([]);
  });

  it("uses every parameterised routes.tsx path at least once", () => {
    expect(paramTable.filter((t) => !mapPaths.some((p) => matchPath({ path: t, end: true }, p)))).toEqual([]);
  });

  it("does not list aliases in route-map.json", () => {
    expect(mapPaths.filter((p) => ALIASES.has(p))).toEqual([]);
  });

  const blogItems = [...posts, ...(legacy as Post[])];
  it.each(blogItems.map((p) => [p.enSlug, p] as const))("blog post %s has exactly one matching route", (_slug, post) => {
    const hits = routes.filter((r) => r.en === `/resources/blog/${post.enSlug}`);
    expect(hits).toHaveLength(1);
    expect(hits[0].de).toBe(`/de/ressourcen/blog/${post.deSlug}`);
    expect(routes.filter((r) => r.de === `/de/ressourcen/blog/${post.deSlug}`)).toHaveLength(1);
  });

  it("has a route for every option item in both languages", () => {
    const slugs = new Set(routes.filter((r) => r.optionSlug).map((r) => r.optionSlug));
    for (const items of [enProducts.options.items, deProducts.options.items]) {
      expect(items.map((i: { slug: string }) => i.slug).filter((s: string) => !slugs.has(s))).toEqual([]);
    }
  });

  it("has a route for every blog category", () => {
    expect(BLOG_CATEGORIES.filter((c) => !routes.some((r) => r.en === c.enPath))).toEqual([]);
  });
});
