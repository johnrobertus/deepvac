import { useTranslation } from "react-i18next";
import { BlogArticlePage } from "./BlogArticlePage";

const AerospaceQualification = () => {
  const { t } = useTranslation("blog");
  const p = "blog.articles.aerospaceQualification";

  return (
    <BlogArticlePage
      seoTitleKey={`${p}.seoTitle`}
      seoDescriptionKey={`${p}.seoDescription`}
      categoryKey="blog.categories.engineeringGuide"
      titleKey={`${p}.title`}
    >
      <p className="text-base">{t(`${p}.intro`)}</p>

      {["standards", "thermalRequirements", "vacuumRequirements", "instrumentation", "chamberCapability"].map((key) => (
        <Section key={key} title={t(`${p}.sections.${key}.title`)}>
          <p>{t(`${p}.sections.${key}.content`)}</p>
          <BulletList items={t(`${p}.sections.${key}.points`, { returnObjects: true }) as string[]} />
        </Section>
      ))}

      <div className="border-t border-gray/15 pt-6 space-y-2">
        <h2 className="text-lg font-medium text-sand">Takeaway</h2>
        <p className="text-sm">{t(`${p}.conclusion`)}</p>
      </div>
    </BlogArticlePage>
  );
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
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

export default AerospaceQualification;
