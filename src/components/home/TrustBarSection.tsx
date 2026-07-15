import { useTranslation } from "react-i18next";

type TrustItem = { value: string; label: string; detail?: string };

export function TrustBarSection() {
  const { t } = useTranslation("home");
  const items = t("trustBar.items", { returnObjects: true }) as TrustItem[];

  return (
    <section id="trust" aria-label="Key specifications" className="border-y border-gray/15 bg-background px-6 py-12 md:py-16">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {Array.isArray(items) &&
            items.map((item, i) => (
              <div
                key={i}
                className={[
                  "px-5 py-6 md:px-8 md:py-2",
                  // vertical hairlines between columns on md+
                  i > 0 ? "md:border-l md:border-gray/20" : "",
                  // 2x2 grid on mobile: horizontal hairline between rows
                  i >= 2 ? "border-t border-gray/20 md:border-t-0" : "",
                  // vertical hairline between the two mobile columns
                  i % 2 === 1 ? "border-l border-gray/20 md:border-l" : "",
                ].join(" ")}
              >
                <div className="flex flex-col gap-2">
                  <span
                    className="font-medium tabular-nums text-sand"
                    style={{ fontSize: "clamp(1.5rem, 2.2vw, 2rem)", letterSpacing: "-0.01em", lineHeight: 1.15 }}
                  >
                    {item.value}
                  </span>
                  <span className="mono-label">{item.label}</span>
                  {item.detail && (
                    <span className="text-[15px] text-sand/70 leading-snug">{item.detail}</span>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
