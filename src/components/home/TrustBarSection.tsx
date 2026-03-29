import { useTranslation } from "react-i18next";

export function TrustBarSection() {
  const { t } = useTranslation("home");
  const items = t("trustBar.items", { returnObjects: true }) as string[];

  return (
    <div className="border-y border-gray/10 py-8 px-6 bg-surface/50">
      <div className="container max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.isArray(items) && items.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue/70 mt-1.5 flex-shrink-0" />
              <p className="text-xs text-gray leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
