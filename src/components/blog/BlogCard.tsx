import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { blogPostPath, type BlogListItem } from "@/lib/blogContent";
import type { Lang } from "@/lib/routes";

/** Article card shared by the blog index and the blog category pages. */
export function BlogCard({ item, lang }: { item: BlogListItem; lang: Lang }) {
  const { t } = useTranslation("blog");
  return (
    <Link
      to={blogPostPath(item, lang)}
      className="bento-card rounded-lg overflow-hidden flex flex-col group"
    >
      <div className="p-6 flex flex-col gap-4 flex-1">
        <span className="mono-label text-blue">{t(`blog.categories.${item.category}`)}</span>
        <h2 className="text-lg font-medium text-sand leading-snug">{item[lang].title}</h2>
        <p className="text-body flex-1">{item[lang].description}</p>
        <span className="inline-flex items-center gap-1.5 text-sm text-blue group-hover:gap-2.5 transition-all mt-2">
          {t("blog.readArticle")}
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}
