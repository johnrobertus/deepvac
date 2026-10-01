import { useTranslation } from "react-i18next";

type TrustItem = { value: string; label: string; detail?: string };

export function TrustBarSection() {
  const { t } = useTranslation("home");
  const items = t("trustBar.items", { returnObjects: true }) as TrustItem[];

  return (
    <section id="trust" aria-label="Key specifications" className="border-y border-gray/15 bg-background px-6 py-12 md:py-16">
      <div className="container-wide">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {Array.isArray(items) &&
            items.map((item, i) => (
              <div
                key={i}
                className={[
                  "px-5 py-6 md:px-8 md:py-2",
                  "border-gray/20",
                  // single column below 640px: hairline between rows
                  i > 0 ? "border-t" : "",
                  // 2x2 grid from 640px: no top line in the first row
                  i === 1 ? "sm:border-t-0" : "",
                  // vertical hairline between the two 2x2 columns
                  i % 2 === 1 ? "sm:border-l" : "",
                  // 4 columns on md+: vertical hairlines only
                  i > 0 ? "md:border-t-0 md:border-l" : "",
                ].join(" ")}
              >
                <div className="flex flex-col gap-2">
                  <span
                    className="font-medium tabular-nums text-sand text-[1.25rem] sm:text-[clamp(1.5rem,2.2vw,2rem)]"
                    style={{ letterSpacing: "-0.01em", lineHeight: 1.15 }}
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
