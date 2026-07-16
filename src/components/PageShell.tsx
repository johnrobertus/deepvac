import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { CalendarClock } from "lucide-react";
import { BookCallDialog } from "@/components/BookCallDialog";

interface PageShellProps {
  children: ReactNode;
  className?: string;
}

export function PageShell({ children, className }: PageShellProps) {
  return (
    <main id="main" className={cn("min-h-screen pt-16", className)}>
      {children}
    </main>
  );
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export function PageHero({ eyebrow, title, description, children, className }: PageHeroProps) {
  return (
    <section className={cn("py-20 md:py-32 px-6", className)}>
      <div className="container max-w-5xl space-y-6">
        {eyebrow && <span className="text-section-eyebrow">{eyebrow}</span>}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-sand">
          {title}
        </h1>
        {description && (
          <p className="text-body-lg text-sand/90">{description}</p>
        )}
        {children}
      </div>
    </section>
  );
}

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export function Section({ children, className }: SectionProps) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container-wide">{children}</div>
    </section>
  );
}

export function TrustBar({ items }: { items: string[] }) {
  return (
    <div className="border-y border-gray/20 py-8">
      <div className="container-wide flex flex-wrap items-center justify-center gap-8 md:gap-16">
        {items.map((item) => (
          <span key={item} className="mono-label text-gray">{item}</span>
        ))}
      </div>
    </div>
  );
}

export function CTABand({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  const { t } = useTranslation("common");
  const [bookCallOpen, setBookCallOpen] = useState(false);
  return (
    <section className="relative py-16 md:py-24 px-6 bg-surface border-t border-blue/20">
      <div className="container max-w-4xl text-center space-y-6">
        <h2 className="text-section-title">{title}</h2>
        {description && (
          <p className="text-section-lead mx-auto">{description}</p>
        )}
        {children && <div className="pt-4 flex flex-col sm:flex-row flex-wrap justify-center gap-4">{children}</div>}
        <p className="text-[15px] text-gray pt-2">
          {t("bookCall.inlinePrompt")}{" "}
          <button
            type="button"
            onClick={() => setBookCallOpen(true)}
            className="inline-flex items-center gap-1.5 text-gray hover:text-sand underline underline-offset-4 transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {t("bookCall.linkLabel")}
            <CalendarClock className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </p>
        <BookCallDialog open={bookCallOpen} onOpenChange={setBookCallOpen} />
      </div>
    </section>
  );
}
