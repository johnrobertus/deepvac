export interface BlogReference {
  title: string;
  publisher: string;
  url: string;
}

export interface BlogSearchIntent {
  primaryKeyword: string;
  primaryQuestion: string;
}

export interface BlogArticle {
  slug: string;
  categoryKey: string;
  titleKey: string;
  descriptionKey: string;
  seoTitleKey: string;
  seoDescriptionKey: string;
  seoKey: string;
  datePublished: string;
  dateModified: string;
  searchIntent: {
    en: BlogSearchIntent;
    de: BlogSearchIntent;
  };
  references: BlogReference[];
  technicalNote?: {
    en: string;
    de: string;
  };
}

const PROJECT_STANDARD_NOTE = {
  en: "The applicable contract, verification plan and project-specific tailoring remain binding. Standards provide a framework; they do not create one universal test profile.",
  de: "Verbindlich bleiben Vertrag, Verifikationsplan und projektspezifisches Tailoring. Normen liefern einen Rahmen, aber kein universelles Testprofil.",
};

const PRODUCT_CONFIGURATION_NOTE = {
  en: "Deepvac values describe current reference configurations. Binding performance depends on chamber size, pumping and thermal concept, test setup and the project quotation.",
  de: "Deepvac-Werte beschreiben aktuelle Referenzkonfigurationen. Verbindliche Leistungen hängen von Kammergröße, Pump- und Thermalkonzept, Testaufbau und Projektangebot ab.",
};

const ECSS_TESTING: BlogReference = {
  title: "ECSS-E-ST-10-03C Rev.1: Testing",
  publisher: "European Cooperation for Space Standardization (ECSS)",
  url: "https://ecss.nl/standard/ecss-e-st-10-03c-rev-1-testing-31-may-2022/",
};

const NASA_GEVS: BlogReference = {
  title: "GSFC-STD-7000B: General Environmental Verification Standard (GEVS)",
  publisher: "NASA Goddard Space Flight Center",
  url: "https://standards.nasa.gov/standard/gsfc/gsfc-std-7000",
};

const SMC_S_016: BlogReference = {
  title: "SMC-S-016 (2014): Test Requirements for Launch, Upper-Stage and Space Vehicles",
  publisher: "U.S. Space and Missile Systems Center / NTIS",
  url: "https://ntrl.ntis.gov/NTRL/dashboard/searchResults/titleDetail/ADA619375.xhtml",
};

const MIL_STD_1540_STATUS: BlogReference = {
  title: "MIL-STD-1540D status record, cancelled 28 July 2016",
  publisher: "U.S. Defense Logistics Agency",
  url: "https://quicksearch.dla.mil/qsDocDetails.aspx?ident_number=36961",
};

const NASA_SPACE_ENVIRONMENT_SIMULATOR: BlogReference = {
  title: "Space Environment Simulator facility capabilities",
  publisher: "NASA Goddard Space Flight Center",
  url: "https://etd.gsfc.nasa.gov/capabilities/facilities-listing/space-environment-simulator/",
};

const OSHA_LN2: BlogReference = {
  title: "Liquid nitrogen, oxygen-deficiency monitoring and ventilation safety notice",
  publisher: "U.S. Occupational Safety and Health Administration",
  url: "https://www.osha.gov/news/newsreleases/denver/20200520",
};

const ISO_LEAK_TESTING: BlogReference = {
  title: "ISO 20485:2017: Non-destructive testing, Leak testing, Tracer gas method",
  publisher: "International Organization for Standardization (ISO)",
  url: "https://www.iso.org/standard/68190.html",
};

const NIST_LEAK_STANDARD: BlogReference = {
  title: "Leak Artifacts and Vacuum Leak Primary Standard",
  publisher: "National Institute of Standards and Technology (NIST)",
  url: "https://www.nist.gov/laboratories/tools-instruments/leak-artifacts",
};

const DEEPVAC_STANDARD_SERIES: BlogReference = {
  title: "Deepvac Standard Series: current technical data and configuration notes",
  publisher: "Deepvac GmbH",
  url: "https://deepvac.space/products/standard-series",
};

const DEEPVAC_CUSTOM_TVAC: BlogReference = {
  title: "Deepvac Custom TVAC: project-specific system scope",
  publisher: "Deepvac GmbH",
  url: "https://deepvac.space/products/custom-tvac",
};

const DEEPVAC_TESTING_SERVICES: BlogReference = {
  title: "Deepvac TVAC testing services",
  publisher: "Deepvac GmbH",
  url: "https://deepvac.space/services/testing-services",
};

export const blogArticles: BlogArticle[] = [
  {
    slug: "cooling-systems",
    categoryKey: "blog.categories.engineeringGuide",
    titleKey: "blog.articles.coolingSystems.title",
    descriptionKey: "blog.articles.coolingSystems.description",
    seoTitleKey: "blog.articles.coolingSystems.seoTitle",
    seoDescriptionKey: "blog.articles.coolingSystems.seoDescription",
    seoKey: "blogCoolingSystems",
    datePublished: "2025-03-15",
    dateModified: "2026-07-23",
    searchIntent: {
      en: {
        primaryKeyword: "TVAC cooling systems",
        primaryQuestion: "Which cooling architecture fits the required temperature range, duty cycle and site infrastructure?",
      },
      de: {
        primaryKeyword: "Kühlsysteme für TVAC-Kammern",
        primaryQuestion: "Welche Kühlarchitektur passt zu Temperaturbereich, Einsatzprofil und Standortinfrastruktur?",
      },
    },
    references: [
      NASA_SPACE_ENVIRONMENT_SIMULATOR,
      OSHA_LN2,
      DEEPVAC_STANDARD_SERIES,
    ],
    technicalNote: PRODUCT_CONFIGURATION_NOTE,
  },
  {
    slug: "retrofit-vs-replacement",
    categoryKey: "blog.categories.decisionSupport",
    titleKey: "blog.articles.retrofitVsReplacement.title",
    descriptionKey: "blog.articles.retrofitVsReplacement.description",
    seoTitleKey: "blog.articles.retrofitVsReplacement.seoTitle",
    seoDescriptionKey: "blog.articles.retrofitVsReplacement.seoDescription",
    seoKey: "blogRetrofitVsReplacement",
    datePublished: "2025-05-20",
    dateModified: "2026-07-23",
    searchIntent: {
      en: {
        primaryKeyword: "TVAC retrofit vs replacement",
        primaryQuestion: "When should an existing thermal-vacuum facility be modernised rather than replaced?",
      },
      de: {
        primaryKeyword: "TVAC-Retrofit oder Neubeschaffung",
        primaryQuestion: "Wann sollte eine bestehende Thermalvakuumanlage modernisiert statt ersetzt werden?",
      },
    },
    references: [
      ISO_LEAK_TESTING,
      NIST_LEAK_STANDARD,
      DEEPVAC_CUSTOM_TVAC,
    ],
  },
  {
    slug: "aerospace-qualification-testing",
    categoryKey: "blog.categories.engineeringGuide",
    titleKey: "blog.articles.aerospaceQualification.title",
    descriptionKey: "blog.articles.aerospaceQualification.description",
    seoTitleKey: "blog.articles.aerospaceQualification.seoTitle",
    seoDescriptionKey: "blog.articles.aerospaceQualification.seoDescription",
    seoKey: "blogAerospaceQualification",
    datePublished: "2025-07-10",
    dateModified: "2026-07-23",
    searchIntent: {
      en: {
        primaryKeyword: "aerospace qualification testing TVAC",
        primaryQuestion: "How do programme standards and verification plans define a thermal-vacuum qualification campaign?",
      },
      de: {
        primaryKeyword: "Raumfahrtqualifikation im TVAC",
        primaryQuestion: "Wie definieren Programmnormen und Verifikationspläne eine Thermalvakuum-Qualifikationskampagne?",
      },
    },
    references: [
      ECSS_TESTING,
      NASA_GEVS,
      SMC_S_016,
      MIL_STD_1540_STATUS,
    ],
    technicalNote: PROJECT_STANDARD_NOTE,
  },
  {
    slug: "tvac-cost-drivers",
    categoryKey: "blog.categories.decisionSupport",
    titleKey: "blog.articles.tvacCostDrivers.title",
    descriptionKey: "blog.articles.tvacCostDrivers.description",
    seoTitleKey: "blog.articles.tvacCostDrivers.seoTitle",
    seoDescriptionKey: "blog.articles.tvacCostDrivers.seoDescription",
    seoKey: "blogTvacCostDrivers",
    datePublished: "2026-05-15",
    dateModified: "2026-07-23",
    searchIntent: {
      en: {
        primaryKeyword: "thermal vacuum chamber cost drivers",
        primaryQuestion: "Which engineering choices have the largest effect on TVAC system cost and lifecycle effort?",
      },
      de: {
        primaryKeyword: "Kostentreiber Thermalvakuumkammer",
        primaryQuestion: "Welche Engineering-Entscheidungen beeinflussen Kosten und Lebenszyklusaufwand eines TVAC-Systems am stärksten?",
      },
    },
    references: [
      DEEPVAC_STANDARD_SERIES,
      DEEPVAC_CUSTOM_TVAC,
    ],
    technicalNote: PRODUCT_CONFIGURATION_NOTE,
  },
  {
    slug: "tvac-test-campaign",
    categoryKey: "blog.categories.engineeringGuide",
    titleKey: "blog.articles.tvacTestCampaign.title",
    descriptionKey: "blog.articles.tvacTestCampaign.description",
    seoTitleKey: "blog.articles.tvacTestCampaign.seoTitle",
    seoDescriptionKey: "blog.articles.tvacTestCampaign.seoDescription",
    seoKey: "blogTvacTestCampaign",
    datePublished: "2026-06-20",
    dateModified: "2026-07-23",
    searchIntent: {
      en: {
        primaryKeyword: "TVAC test campaign",
        primaryQuestion: "Which phases, decisions and deliverables make a thermal-vacuum campaign auditable?",
      },
      de: {
        primaryKeyword: "TVAC-Testkampagne",
        primaryQuestion: "Welche Phasen, Entscheidungen und Liefergegenstände machen eine Thermalvakuum-Kampagne nachvollziehbar?",
      },
    },
    references: [
      ECSS_TESTING,
      NASA_GEVS,
      DEEPVAC_TESTING_SERVICES,
    ],
    technicalNote: PROJECT_STANDARD_NOTE,
  },
];
