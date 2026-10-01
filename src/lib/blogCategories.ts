import type { Lang } from "@/lib/routes";

/** Blog categories in display order, with the EN path of each category page. */
export const BLOG_CATEGORIES = [
  { key: "basics", enPath: "/resources/blog/category/fundamentals" },
  { key: "engineeringGuide", enPath: "/resources/blog/category/engineering-guide" },
  { key: "applications", enPath: "/resources/blog/category/applications" },
  { key: "decisionSupport", enPath: "/resources/blog/category/decision-support" },
] as const;

export type BlogCategoryKey = (typeof BLOG_CATEGORIES)[number]["key"];

export function categoryEnPath(key: string): string | undefined {
  return BLOG_CATEGORIES.find((c) => c.key === key)?.enPath;
}

export function categorySeoKey(key: string): string {
  return `blogCategory${key.charAt(0).toUpperCase()}${key.slice(1)}`;
}

export type { Lang };
