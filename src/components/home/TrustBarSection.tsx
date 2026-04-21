import { useTranslation } from "react-i18next";

export function TrustBarSection() {
  const { t } = useTranslation("home");
  const items = t("trustBar.items", { returnObjects: true }) as string[];

  return (
    <div className="border-y border-gray/10 bg-surface/50 px-6 py-10">
      <div className="container max-w-6xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {Array.isArray(items) &&
            items.map((item, i) => (
              <div key={i} className="space-y-2">
                <span className="mono-label text-blue tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-xs leading-relaxed text-gray">{item}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
