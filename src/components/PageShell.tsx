import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
  className?: string;
}

export function PageShell({ children, className }: PageShellProps) {
  return (
    <main className={cn("min-h-screen pt-16", className)}>
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
          <span key={item} className="mono-label text-gray/80">{item}</span>
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
  return (
    <section className="relative py-16 md:py-24 px-6 bg-surface border-t border-blue/20">
      <div className="container max-w-4xl text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-sand">
          {title}
        </h2>
        {description && (
          <p className="text-gray text-base max-w-xl mx-auto leading-relaxed">{description}</p>
        )}
        {children && <div className="pt-4 flex flex-col sm:flex-row flex-wrap justify-center gap-4">{children}</div>}
      </div>
    </section>
  );
}
