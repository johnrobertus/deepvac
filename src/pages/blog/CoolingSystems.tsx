import { useTranslation } from "react-i18next";
import { BlogArticlePage } from "./BlogArticlePage";

const CoolingSystems = () => {
  const { t } = useTranslation("blog");
  const p = "blog.articles.coolingSystems";

  return (
    <BlogArticlePage
      seoTitleKey={`${p}.seoTitle`}
      seoDescriptionKey={`${p}.seoDescription`}
      categoryKey="blog.categories.engineeringGuide"
      titleKey={`${p}.title`}
    >
      <p className="text-base">{t(`${p}.intro`)}</p>

      <ArticleSection title={t(`${p}.sections.mechanical.title`)}>
        <p>{t(`${p}.sections.mechanical.content`)}</p>
        <BulletGroup heading="Advantages" items={t(`${p}.sections.mechanical.advantages`, { returnObjects: true }) as string[]} />
        <BulletGroup heading="Constraints" items={t(`${p}.sections.mechanical.constraints`, { returnObjects: true }) as string[]} />
      </ArticleSection>

      <ArticleSection title={t(`${p}.sections.ln2.title`)}>
        <p>{t(`${p}.sections.ln2.content`)}</p>
        <BulletGroup heading="Advantages" items={t(`${p}.sections.ln2.advantages`, { returnObjects: true }) as string[]} />
        <BulletGroup heading="Constraints" items={t(`${p}.sections.ln2.constraints`, { returnObjects: true }) as string[]} />
      </ArticleSection>

      <ArticleSection title={t(`${p}.sections.hybrid.title`)}>
        <p>{t(`${p}.sections.hybrid.content`)}</p>
        <BulletList items={t(`${p}.sections.hybrid.points`, { returnObjects: true }) as string[]} />
      </ArticleSection>

      <ArticleSection title={t(`${p}.sections.selection.title`)}>
        <p>{t(`${p}.sections.selection.content`)}</p>
        <BulletList items={t(`${p}.sections.selection.factors`, { returnObjects: true }) as string[]} />
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

function BulletGroup({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-sand/80">{heading}</h3>
      <BulletList items={items} />
    </div>
  );
}

function Conclusion({ text }: { text: string }) {
  return (
    <div className="border-t border-gray/15 pt-6 space-y-2">
      <h2 className="text-lg font-medium text-sand">Takeaway</h2>
      <p className="text-sm">{text}</p>
    </div>
  );
}

export default CoolingSystems;
