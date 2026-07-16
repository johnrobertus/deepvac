import { Header } from "./Header";
import { Footer } from "./Footer";
import { LanguageSuggestionBanner } from "./LanguageSuggestionBanner";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

export function Layout({ children }: { children: ReactNode }) {
  const { t } = useTranslation("common");
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-sm focus:border focus:border-blue/40 focus:bg-surface focus:px-4 focus:py-2.5 focus:text-[15px] focus:text-sand focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {t("a11y.skipToContent")}
      </a>
      <Header />
      <LanguageSuggestionBanner />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}

