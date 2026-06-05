import { useTranslation } from "react-i18next";

type TrustItem = { label: string; text: string };

export function TrustBarSection() {
  const { t } = useTranslation("home");
  const items = t("trustBar.items", { returnObjects: true }) as TrustItem[];

  return (
    <section id="trust" className="bg-background px-6 py-12">
      <div className="container-wide">
        <div
          className="overflow-hidden rounded-sm border border-gray/15"
          style={{
            background:
              "linear-gradient(180deg, hsl(var(--surface) / 0.9) 0%, hsl(var(--background)) 100%)",
            boxShadow:
              "inset 0 1px 1px hsl(0 0% 100% / 0.04), 0 10px 30px -10px hsl(0 0% 0% / 0.5)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4">
            {Array.isArray(items) &&
              items.map((item, i) => {
                const isLast = i === items.length - 1;
                return (
                  <div
                    key={i}
                    className={`group relative flex flex-col gap-3 p-6 transition-colors hover:bg-sand/[0.02] ${
                      !isLast ? "border-b border-gray/10 md:border-b-0 md:border-r" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="mono-label text-[11px] text-blue">{item.label}</span>
                      <div className="h-1.5 w-1.5 rounded-full bg-gray/30 transition-all duration-300 group-hover:bg-blue group-hover:shadow-[0_0_10px_hsl(var(--blue)/0.7)]" />
                    </div>
                    <p className="text-sm leading-snug text-sand/80">{item.text}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
