import { Link } from "react-router-dom";
import { SectionHeader } from "@/components/SectionHeader";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function CataloguesSection() {
  return (
    <section className="py-20 md:py-28 px-6">
      <div className="container max-w-6xl">
        <SectionHeader
          eyebrow="Resources"
          title="Technical Documentation"
          description="Download product overviews, technical specifications, and company brochures."
          className="mb-14"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["DEEPVAC Company Overview", "TVAC Product Brochure", "Technical Specifications"].map((title) => (
            <div key={title} className="bento-card rounded-lg overflow-hidden group cursor-pointer">
              <PlaceholderImage assetId="BROCHURE" type="PDF_COVER" aspectRatio="3/4" className="rounded-none" />
              <div className="p-5 space-y-3">
                <h3 className="text-sm font-medium text-sand">{title}</h3>
                <p className="text-xs text-gray">PDF document — available for download.</p>
                <Button variant="tertiary" className="text-xs">
                  <Download className="w-3 h-3 mr-1.5" />
                  Download PDF
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link to="/catalogues">View All Resources</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
