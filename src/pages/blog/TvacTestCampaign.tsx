import { useTranslation } from "react-i18next";
import { BlogArticlePage } from "./BlogArticlePage";

const TvacTestCampaign = () => {
  const { t } = useTranslation("blog");
  const p = "blog.articles.tvacTestCampaign";

  const phaseKeys = ["requirements", "setup", "pumpdown", "cycling", "monitoring", "datapackage"] as const;

  return (
    <BlogArticlePage
      slug="tvac-test-campaign"
      categoryKey="blog.categories.engineeringGuide"
      titleKey={`${p}.title`}
    >
      <p className="text-base">{t(`${p}.intro`)}</p>

      {phaseKeys.map((key) => (
        <ArticleSection key={key} title={t(`${p}.sections.${key}.title`)}>
          <p>{t(`${p}.sections.${key}.content`)}</p>
          <BulletList items={t(`${p}.sections.${key}.points`, { returnObjects: true }) as string[]} />
        </ArticleSection>
      ))}

      <ArticleSection title={t(`${p}.sections.prepare.title`)}>
        <p>{t(`${p}.sections.prepare.content`)}</p>
        <BulletList items={t(`${p}.sections.prepare.factors`, { returnObjects: true }) as string[]} />
      </ArticleSection>

      <Conclusion text={t(`${p}.conclusion`)} />
    </BlogArticlePage>
  );
};

function ArticleSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl md:text-2xl font-medium text-sand">{title}</h2>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc list-outside pl-5 space-y-2 text-sm text-gray">
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}

function Conclusion({ text }: { text: string }) {
  const { t } = useTranslation("blog");
  return (
    <div className="border-t border-gray/15 pt-6 space-y-2">
      <h2 className="text-lg font-medium text-sand">{t("blog.labels.takeaway")}</h2>
      <p className="text-sm">{text}</p>
    </div>
  );
}

export default TvacTestCampaign;
