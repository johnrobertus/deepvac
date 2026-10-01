/// <reference types="node" />
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import routeMap from "@/lib/route-map.json";
import enSeo from "@/i18n/locales/en/seo.json";
import deSeo from "@/i18n/locales/de/seo.json";
import enProducts from "@/i18n/locales/en/products.json";
import deProducts from "@/i18n/locales/de/products.json";
import { BLOG_CATEGORIES, categorySeoKey } from "@/lib/blogCategories";

type Lang = "en" | "de";
type Route = { en: string; de: string; seoKey: string; optionSlug?: string };
type SeoEntry = { title?: string; description?: string };
type OptionItem = { slug: string; name: string; metaDescription?: string };
const routes = routeMap as Route[];
const seo: Record<Lang, Record<string, SeoEntry>> = { en: enSeo as never, de: deSeo as never };
const options: Record<Lang, OptionItem[]> = { en: enProducts.options.items as OptionItem[], de: deProducts.options.items as OptionItem[] };

const BLOG_DIR = path.resolve(__dirname, "../content/blog");
type Post = { seoKey: string; en: { seoTitle: string; seoDescription: string }; de: { seoTitle: string; seoDescription: string } };
const posts: Post[] = fs
  .readdirSync(BLOG_DIR)
  .filter((f) => /^part.*\.json$/.test(f))
  .flatMap((f) => JSON.parse(fs.readFileSync(path.join(BLOG_DIR, f), "utf8")) as Post[]);

/** Title and description the page renders for a route. */
function sourceFor(route: Route, lang: Lang): SeoEntry {
  if (route.optionSlug) {
    const item = options[lang].find((i) => i.slug === route.optionSlug);
    return { title: item ? `${item.name} | Deepvac` : undefined, description: item?.metaDescription };
  }
  return seo[lang][route.seoKey] ?? {};
}

const cases = routes.flatMap((r) => (["en", "de"] as const).map((lang) => [r[lang], lang, r] as const));

describe("SEO sources", () => {
  it.each(cases)("%s (%s) has a title and a valid description", (p, lang, route) => {
    const { title, description } = sourceFor(route, lang);
    expect(title?.trim(), `title for ${p}`).toBeTruthy();
    expect(description?.trim(), `description for ${p}`).toBeTruthy();
    const len = description!.length;
    expect(len >= 70 && len <= 170, `${p}: description length ${len} outside 70-170`).toBe(true);
    if (len < 120 || len > 155) console.warn(`[seo] ${p}: description length ${len} outside 120-155`);
  });

  it("uses the category seo key for every category page", () => {
    for (const c of BLOG_CATEGORIES) {
      const route = routes.find((r) => r.en === c.enPath);
      expect(route?.seoKey).toBe(categorySeoKey(c.key));
    }
  });

  it.each(posts.map((p) => [p.seoKey, p] as const))("%s: seo.json equals post seoTitle and seoDescription", (key, post) => {
    for (const lang of ["en", "de"] as const) {
      expect(seo[lang][key]?.title, `${lang} title`).toBe(post[lang].seoTitle);
      expect(seo[lang][key]?.description, `${lang} description`).toBe(post[lang].seoDescription);
    }
  });
});
