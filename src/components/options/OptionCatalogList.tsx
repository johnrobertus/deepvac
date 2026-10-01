import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { OptionIcon } from "@/components/options/OptionIcon";
import { CATEGORY_ORDER, type OptionItem } from "@/lib/optionCatalog";
import { localizedPath } from "@/lib/routes";

export const OptionCatalogList = ({ compact = false }: { compact?: boolean }) => {
  const { t } = useTranslation("products");
  const { lang } = useLanguage();
  const items = t("options.items", { returnObjects: true }) as OptionItem[];
  const categories = t("options.categories", { returnObjects: true }) as Record<string, string>;
  const groups = CATEGORY_ORDER.map((cat) => ({ cat, items: items.filter((item) => item.category === cat) }))
    .filter(({ items: groupItems }) => groupItems.length > 0);

  return (
    <div className={compact ? "space-y-8" : "space-y-10"}>
      {groups.map(({ cat, items: groupItems }) => (
        <div key={cat}>
          <h3 className="mono-label text-blue mb-3">{categories[cat]}</h3>
          <div className={compact ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5" : "border-y border-gray/15 divide-y divide-gray/15"}>
            {groupItems.map((item) => (
              <Link
                key={item.slug}
                to={localizedPath(`/products/options/${item.slug}`, lang)}
                className={`group flex items-center gap-4 py-4 px-2 -mx-2 sm:px-3 sm:-mx-3 rounded-md hover:bg-surface/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${compact ? "border-b border-gray/15 min-w-0" : ""}`}
              >
                <span className="text-blue shrink-0" aria-hidden="true"><OptionIcon slug={item.slug} /></span>
                <span className={`flex-1 min-w-0 ${compact ? "" : "sm:grid sm:grid-cols-2 sm:gap-4 sm:items-center"}`}>
                  <span className="block text-[15px] font-medium text-sand">{item.name}</span>
                  <span className={`text-[13px] text-gray mt-0.5 sm:mt-0 ${compact ? "hidden sm:block" : "block"}`}>{item.purpose}</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 text-gray group-hover:text-blue transition-colors" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};