export interface BlogArticle {
  slug: string;
  categoryKey: string;
  titleKey: string;
  descriptionKey: string;
  seoTitleKey: string;
  seoDescriptionKey: string;
  /** Key in src/i18n/locales/{en,de}/seo.json used for per-post static <head> */
  seoKey: string;
  /** ISO date (YYYY-MM-DD) for BlogPosting JSON-LD */
  datePublished: string;
  /** ISO date (YYYY-MM-DD) for BlogPosting JSON-LD */
  dateModified: string;
}

/**
 * Central blog article registry.
 * To add a new article:
 * 1. Add an entry here (including seoKey + datePublished/dateModified)
 * 2. Create the article component in src/pages/blog/
 * 3. Add i18n keys to blog.json for both EN and DE
 * 4. Add the route to src/lib/route-map.json (with matching seoKey)
 * 5. Add per-post entries to src/i18n/locales/{en,de}/seo.json under seoKey
 * 6. Register the route in App.tsx
 */
export const blogArticles: BlogArticle[] = [
  {
    slug: "cooling-systems",
    categoryKey: "blog.categories.engineeringGuide",
    titleKey: "blog.articles.coolingSystems.title",
    descriptionKey: "blog.articles.coolingSystems.description",
    seoTitleKey: "blog.articles.coolingSystems.seoTitle",
    seoDescriptionKey: "blog.articles.coolingSystems.seoDescription",
    seoKey: "blogCoolingSystems",
    datePublished: "2025-03-15",
    dateModified: "2025-03-15",
  },
  {
    slug: "retrofit-vs-replacement",
    categoryKey: "blog.categories.decisionSupport",
    titleKey: "blog.articles.retrofitVsReplacement.title",
    descriptionKey: "blog.articles.retrofitVsReplacement.description",
    seoTitleKey: "blog.articles.retrofitVsReplacement.seoTitle",
    seoDescriptionKey: "blog.articles.retrofitVsReplacement.seoDescription",
    seoKey: "blogRetrofitVsReplacement",
    datePublished: "2025-05-20",
    dateModified: "2025-05-20",
  },
  {
    slug: "aerospace-qualification-testing",
    categoryKey: "blog.categories.engineeringGuide",
    titleKey: "blog.articles.aerospaceQualification.title",
    descriptionKey: "blog.articles.aerospaceQualification.description",
    seoTitleKey: "blog.articles.aerospaceQualification.seoTitle",
    seoDescriptionKey: "blog.articles.aerospaceQualification.seoDescription",
    seoKey: "blogAerospaceQualification",
    datePublished: "2025-07-10",
    dateModified: "2025-07-10",
  },
  {
    slug: "tvac-cost-drivers",
    categoryKey: "blog.categories.decisionSupport",
    titleKey: "blog.articles.tvacCostDrivers.title",
    descriptionKey: "blog.articles.tvacCostDrivers.description",
    seoTitleKey: "blog.articles.tvacCostDrivers.seoTitle",
    seoDescriptionKey: "blog.articles.tvacCostDrivers.seoDescription",
    seoKey: "blogTvacCostDrivers",
    datePublished: "2026-05-15",
    dateModified: "2026-05-15",
  },
  {
    slug: "tvac-test-campaign",
    categoryKey: "blog.categories.engineeringGuide",
    titleKey: "blog.articles.tvacTestCampaign.title",
    descriptionKey: "blog.articles.tvacTestCampaign.description",
    seoTitleKey: "blog.articles.tvacTestCampaign.seoTitle",
    seoDescriptionKey: "blog.articles.tvacTestCampaign.seoDescription",
    seoKey: "blogTvacTestCampaign",
    datePublished: "2026-06-20",
    dateModified: "2026-06-20",
  },
];
