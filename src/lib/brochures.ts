export interface Brochure {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  tags: string[];
  pdfUrl: string;
  coverUrl: string;
  featured?: boolean;
}

export const brochures: Brochure[] = [
  {
    id: "standard-series-2026",
    title: "Deepvac Standard Series Catalog",
    subtitle: "Intelligent Thermal Vacuum Chambers",
    description:
      "Technical brochure for the Deepvac Standard Series, including common chamber characteristics, T Series and C Series platforms, thermal control concepts, control system architecture, and optional feature packages.",
    tags: ["TVAC", "Standard Series"],
    pdfUrl: "/brochures/deepvac-standard-series-catalogue-2026.pdf",
    coverUrl: "/brochures/deepvac-standard-series-cover.jpg",
    featured: true,
  },
];

export function getBrochuresByTag(tag: string): Brochure[] {
  return brochures.filter((b) => b.tags.includes(tag));
}

export function getFeaturedBrochure(): Brochure | undefined {
  return brochures.find((b) => b.featured);
}
