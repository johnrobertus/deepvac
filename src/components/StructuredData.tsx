import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/components/LanguageProvider";
import { getCanonical, localizedPath } from "@/lib/routes";
import tseriesImg from "@/assets/product-tseries-chamber.avif";
import cseriesImg from "@/assets/cseries-chamber.avif";
import customImg from "@/assets/custom-chamber.avif";
import thermalVisionImg from "@/assets/thermal-vision-product.jpg";
import testingHero from "@/assets/testing-hero.webp";
import mechanicalDesignHero from "@/assets/mechanical-design-hero.webp";
import controlSystemsHero from "@/assets/control-systems-hero.webp";
import retrofitHero from "@/assets/retrofit-hero.webp";
import maintenanceHero from "@/assets/maintenance-hero.webp";
import subsystemHero from "@/assets/subsystem-hero.webp";

const SITE_URL = "https://deepvac.space";

const ORGANIZATION = {
  "@type": "Organization",
  name: "Deepvac GmbH",
  legalName: "Deepvac GmbH",
  url: SITE_URL,
};

const WEBSITE = {
  "@type": "WebSite",
  name: "Deepvac",
  url: SITE_URL,
};

type JsonLd = Record<string, unknown>;

function absoluteAsset(source: string): string {
  return new URL(source, SITE_URL).href;
}

function buildImageObject(source: string, name: string): JsonLd {
  const url = absoluteAsset(source);
  return {
    "@type": "ImageObject",
    name,
    caption: name,
    url,
    contentUrl: url,
  };
}

function buildWebPage(
  name: string,
  description: string,
  url: string,
  inLanguage: "en" | "de",
  images: JsonLd[] = [],
  mainEntityId?: string,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    inLanguage,
    isPartOf: WEBSITE,
    ...(images.length > 0
      ? { image: images, primaryImageOfPage: images[0] }
      : {}),
    ...(mainEntityId ? { mainEntity: { "@id": mainEntityId } } : {}),
  };
}

function buildCollectionPage(
  name: string,
  description: string,
  url: string,
  inLanguage: "en" | "de",
  mainEntityId?: string,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
    inLanguage,
    isPartOf: WEBSITE,
    ...(mainEntityId ? { mainEntity: { "@id": mainEntityId } } : {}),
  };
}

function buildService(
  name: string,
  description: string,
  url: string,
  image?: JsonLd,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    description,
    serviceType: name,
    url,
    provider: ORGANIZATION,
    ...(image ? { image } : {}),
  };
}

export function StructuredData() {
  const { pathname } = useLocation();
  const { lang } = useLanguage();
  const { t: tProducts } = useTranslation("products");
  const { t: tServices } = useTranslation("services");
  const { t: tBlog } = useTranslation("blog");
  const { t: tSeo } = useTranslation("seo");

  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const canonical = getCanonical(path, lang);
  const matches = (en: string, de: string) => path === en || path === de;
  const schemas: JsonLd[] = [];

  if (matches("/products", "/de/produkte")) {
    const itemListId = `${canonical}#product-list`;
    const productItems = [
      {
        name: tProducts("overview.standardSeries.title") as string,
        description: tProducts("overview.standardSeries.description") as string,
        enPath: "/products/standard-series",
      },
      {
        name: tProducts("overview.customTvac.title") as string,
        description: tProducts("overview.customTvac.description") as string,
        enPath: "/products/custom-tvac",
      },
      {
        name: tProducts("overview.thermalVision.title") as string,
        description: tProducts("overview.thermalVision.description") as string,
        enPath: "/products/thermal-vision",
      },
    ];

    schemas.push(
      buildCollectionPage(
        tProducts("overview.title") as string,
        tSeo("products.description") as string,
        canonical,
        lang,
        itemListId,
      ),
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "@id": itemListId,
        name: tProducts("overview.title") as string,
        itemListElement: productItems.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "WebPage",
            name: item.name,
            description: item.description,
            url: `${SITE_URL}${localizedPath(item.enPath, lang)}`,
          },
        })),
      },
    );
  }

  if (matches("/services", "/de/leistungen")) {
    schemas.push(
      buildCollectionPage(
        tServices("overview.title") as string,
        tSeo("services.description") as string,
        canonical,
        lang,
      ),
    );

    const faqItems = tServices("overview.faq.items", {
      returnObjects: true,
    }) as Array<{ q: string; a: string }>;

    if (Array.isArray(faqItems) && faqItems.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      });
    }
  }

  if (matches("/resources/blog", "/de/ressourcen/blog")) {
    schemas.push(
      buildCollectionPage(
        tBlog("blog.title") as string,
        tBlog("blog.seo.description") as string,
        canonical,
        lang,
      ),
    );
  }

  if (matches("/products/standard-series", "/de/produkte/standard-serie")) {
    const images = [
      buildImageObject(
        tseriesImg,
        tProducts("standardSeries.tSeries.title") as string,
      ),
      buildImageObject(
        cseriesImg,
        tProducts("standardSeries.cSeries.title") as string,
      ),
    ];
    schemas.push(
      buildWebPage(
        tProducts("standardSeries.title") as string,
        tSeo("standardSeries.description") as string,
        canonical,
        lang,
        images,
      ),
    );
  }

  if (matches("/products/custom-tvac", "/de/produkte/custom-tvac")) {
    const image = buildImageObject(
      customImg,
      tProducts("customTvac.title") as string,
    );
    schemas.push(
      buildWebPage(
        tProducts("customTvac.title") as string,
        tSeo("customTvac.description") as string,
        canonical,
        lang,
        [image],
      ),
    );
  }

  if (matches("/products/thermal-vision", "/de/produkte/thermal-vision")) {
    const image = buildImageObject(
      thermalVisionImg,
      "Deepvac Thermal Vision",
    );
    schemas.push(
      buildWebPage(
        tProducts("thermalVision.title") as string,
        tSeo("thermalVision.description") as string,
        canonical,
        lang,
        [image],
      ),
    );
  }

  if (matches("/products/options", "/de/produkte/optionen")) {
    schemas.push(
      buildWebPage(
        tProducts("options.title") as string,
        tSeo("options.description") as string,
        canonical,
        lang,
      ),
    );
  }

  const serviceRoutes = [
    {
      en: "/services/testing-services",
      de: "/de/leistungen/pruefdienstleistungen",
      title: tServices("testing.title") as string,
      description: tServices("testing.description") as string,
      seoDescription: tSeo("testingServices.description") as string,
      image: testingHero,
    },
    {
      en: "/services/control-systems-design",
      de: "/de/leistungen/steuerungstechnik",
      title: tServices("controlSystems.title") as string,
      description: tServices("controlSystems.description") as string,
      seoDescription: tSeo("controlSystems.description") as string,
      image: controlSystemsHero,
    },
    {
      en: "/services/mechanical-design",
      de: "/de/leistungen/mechanische-konstruktion",
      title: tServices("mechanicalDesign.title") as string,
      description: tServices("mechanicalDesign.description") as string,
      seoDescription: tSeo("mechanicalDesign.description") as string,
      image: mechanicalDesignHero,
    },
    {
      en: "/services/retrofit-modernization",
      de: "/de/leistungen/retrofit-modernisierung",
      title: tServices("retrofit.title") as string,
      description: tServices("retrofit.description") as string,
      seoDescription: tSeo("retrofitModernization.description") as string,
      image: retrofitHero,
    },
    {
      en: "/services/maintenance-repair",
      de: "/de/leistungen/wartung-reparatur",
      title: tServices("maintenance.title") as string,
      description: tServices("maintenance.description") as string,
      seoDescription: tSeo("maintenanceRepair.description") as string,
      image: maintenanceHero,
    },
    {
      en: "/services/subsystem-integration",
      de: "/de/leistungen/subsystem-integration",
      title: tServices("subsystemIntegration.title") as string,
      description: tServices("subsystemIntegration.description") as string,
      seoDescription: tSeo("subsystemIntegration.description") as string,
      image: subsystemHero,
    },
  ];

  const serviceRoute = serviceRoutes.find(
    (route) => path === route.en || path === route.de,
  );

  if (serviceRoute) {
    const image = buildImageObject(serviceRoute.image, serviceRoute.title);
    const service = buildService(
      serviceRoute.title,
      serviceRoute.description,
      canonical,
      image,
    );
    schemas.push(
      buildWebPage(
        serviceRoute.title,
        serviceRoute.seoDescription,
        canonical,
        lang,
        [image],
        `${canonical}#service`,
      ),
      service,
    );
  }

  if (schemas.length === 0) return null;

  return (
    <Helmet>
      {schemas.map((schema, index) => (
        <script
          key={`${path}-${String(schema["@type"])}-${index}`}
          type="application/ld+json"
        >
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
