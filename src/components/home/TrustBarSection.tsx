import { useTranslation } from "react-i18next";

type TrustItem = { label: string; text: string };

export function TrustBarSection() {
  const { t } = useTranslation("home");
  const items = t("trustBar.items", { returnObjects: true }) as TrustItem[];
  const heading = t("trustBar.heading", { defaultValue: "" }) as string;
  const protocol = t("trustBar.protocol", {
    defaultValue: "System Protocol · Trust / Validation",
  }) as string;

  return (
    <section className="bg-background px-6 py-14">
      <div className="container max-w-6xl">
        {/* Technical header */}
        <div className="mb-4 flex items-end justify-between gap-6 px-1">
          <div className="flex flex-col gap-1">
            <span className="mono-label text-[10px] text-blue">{protocol}</span>
            {heading && (
              <h2 className="text-base font-light tracking-wide text-sand sm:text-lg">
                {heading}
              </h2>
            )}
          </div>
        </div>

        {/* Etched frame */}
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
                    className={`relative p-7 transition-colors hover:bg-sand/[0.02] md:p-8 ${
                      !isLast ? "border-b border-gray/10 md:border-b-0 md:border-r" : ""
                    }`}
                  >
                    <div className="mb-8 flex items-start justify-between">
                      <span className="mono-label text-[11px] text-blue">{item.label}</span>
                      <div
                        className={
                          i === 0
                            ? "h-1.5 w-1.5 rounded-full bg-blue shadow-[0_0_8px_hsl(var(--blue)/0.5)]"
                            : "h-1.5 w-1.5 rounded-full bg-gray/30"
                        }
                      />
                    </div>
                    <p className="max-w-[28ch] text-pretty text-sm leading-relaxed text-sand/75">
                      {item.text}
                    </p>
                    {(i === 0 || isLast) && (
                      <div
                        className={`absolute bottom-0 h-px w-8 bg-blue/25 ${
                          i === 0 ? "left-0" : "right-0"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
