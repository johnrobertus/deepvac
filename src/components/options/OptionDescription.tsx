import { Link } from "react-router-dom";
import { localizedPath, type Lang } from "@/lib/routes";
import type { OptionItem } from "@/lib/optionCatalog";

export function OptionDescription({ item, lang }: { item: OptionItem; lang: Lang }) {
  if (!item.linkTo || !item.linkLabel) return <>{item.description}</>;

  const parts = item.description.split("{{link}}");
  if (parts.length !== 2) return <>{item.description}</>;

  return (
    <>
      {parts[0]}
      <Link
        to={localizedPath(item.linkTo, lang)}
        className="text-blue underline underline-offset-4 hover:text-sand transition-colors"
      >
        {item.linkLabel}
      </Link>
      {parts[1]}
    </>
  );
}
