export interface BlogArticle {
  slug: string;
  categoryKey: string;
  titleKey: string;
  descriptionKey: string;
  seoTitleKey: string;
  seoDescriptionKey: string;
}

/**
 * Central blog article registry.
 * To add a new article:
 * 1. Add an entry here
 * 2. Create the article component in src/pages/blog/
 * 3. Add i18n keys to blog.json for both EN and DE
 * 4. Add routes in App.tsx and routes.ts
 */
export const blogArticles: BlogArticle[] = [
  {
    slug: "cooling-systems",
    categoryKey: "blog.categories.engineeringGuide",
    titleKey: "blog.articles.coolingSystems.title",
    descriptionKey: "blog.articles.coolingSystems.description",
    seoTitleKey: "blog.articles.coolingSystems.seoTitle",
    seoDescriptionKey: "blog.articles.coolingSystems.seoDescription",
  },
  {
    slug: "retrofit-vs-replacement",
    categoryKey: "blog.categories.decisionSupport",
    titleKey: "blog.articles.retrofitVsReplacement.title",
    descriptionKey: "blog.articles.retrofitVsReplacement.description",
    seoTitleKey: "blog.articles.retrofitVsReplacement.seoTitle",
    seoDescriptionKey: "blog.articles.retrofitVsReplacement.seoDescription",
  },
  {
    slug: "aerospace-qualification-testing",
    categoryKey: "blog.categories.engineeringGuide",
    titleKey: "blog.articles.aerospaceQualification.title",
    descriptionKey: "blog.articles.aerospaceQualification.description",
    seoTitleKey: "blog.articles.aerospaceQualification.seoTitle",
    seoDescriptionKey: "blog.articles.aerospaceQualification.seoDescription",
  },
];
