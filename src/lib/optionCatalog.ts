export type OptionItem = {
  slug: string;
  category: string;
  name: string;
  purpose: string;
  description: string;
  /** 120 to 155 character meta description, condensed from description. */
  metaDescription?: string;
  linkLabel?: string;
  linkTo?: string;
  benefits?: string[];
};

export const CATEGORY_ORDER = ["thermal", "vacuum", "observation", "integration"] as const;

/** Meta description for option detail pages (head tags and static HTML). */
export function optionMetaDescription(item: OptionItem) {
  return item.metaDescription ?? plainOptionDescription(item);
}

export function plainOptionDescription(item: OptionItem) {
  return item.description.replace("{{link}}", item.linkLabel ?? "");
}
