export type OptionItem = {
  slug: string;
  category: string;
  name: string;
  purpose: string;
  description: string;
  linkLabel?: string;
  linkTo?: string;
  benefits?: string[];
};

export const CATEGORY_ORDER = ["thermal", "vacuum", "observation", "integration"] as const;

export function plainOptionDescription(item: OptionItem) {
  return item.description.replace("{{link}}", item.linkLabel ?? "");
}
