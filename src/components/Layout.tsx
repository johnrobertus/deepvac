import { Header } from "./Header";
import { Footer } from "./Footer";
import { LanguageSuggestionBanner } from "./LanguageSuggestionBanner";
import { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <LanguageSuggestionBanner />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}

