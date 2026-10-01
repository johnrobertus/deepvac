import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CTABand } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { localizedPath, type Lang } from "@/lib/routes";

/** CTA band shared by the blog index and the blog category pages. */
export function BlogCtaBand({ lang }: { lang: Lang }) {
  const { t: tc } = useTranslation("common");
  return (
    <CTABand
      title={lang === "de" ? "Technische Frage?" : "Have a Technical Question?"}
      description={
        lang === "de"
          ? "Besprechen Sie Ihre Anforderungen direkt mit unserem Engineering-Team."
          : "Discuss your requirements directly with our engineering team."
      }
    >
      <Button asChild>
        <Link to={localizedPath("/contact", lang)}>{tc("bookCall.heroCta")}</Link>
      </Button>
    </CTABand>
  );
}
