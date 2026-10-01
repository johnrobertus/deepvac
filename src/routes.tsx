import { matchPath } from "react-router-dom";
import { lazyWithPreload } from "./lib/lazyWithPreload";
import Index from "./pages/Index";
import { ensureLegal } from "./i18n";
import { getLangFromPath } from "./lib/routes";

const Products = lazyWithPreload(() => import("./pages/Products"));
const StandardSeries = lazyWithPreload(() => import("./pages/StandardSeries"));
const CustomTVAC = lazyWithPreload(() => import("./pages/CustomTVAC"));
const Options = lazyWithPreload(() => import("./pages/Options"));
const OptionDetail = lazyWithPreload(() => import("./pages/OptionDetail"));
const ThermalVision = lazyWithPreload(() => import("./pages/ThermalVision"));
const Services = lazyWithPreload(() => import("./pages/Services"));
const ControlSystemsDesign = lazyWithPreload(() =>
  import("./pages/ServicePages").then((m) => ({ default: m.ControlSystemsDesign })),
);
const MechanicalDesign = lazyWithPreload(() =>
  import("./pages/ServicePages").then((m) => ({ default: m.MechanicalDesign })),
);
const RetrofitModernisation = lazyWithPreload(() =>
  import("./pages/ServicePages").then((m) => ({ default: m.RetrofitModernisation })),
);
const MaintenanceRepair = lazyWithPreload(() =>
  import("./pages/ServicePages").then((m) => ({ default: m.MaintenanceRepair })),
);
const SubsystemIntegration = lazyWithPreload(() =>
  import("./pages/ServicePages").then((m) => ({ default: m.SubsystemIntegration })),
);
const TestingServices = lazyWithPreload(() => import("./pages/TestingServices"));
const Team = lazyWithPreload(() => import("./pages/Team"));
const Catalogues = lazyWithPreload(() => import("./pages/Catalogues"));
const Careers = lazyWithPreload(() => import("./pages/Careers"));
const References = lazyWithPreload(() => import("./pages/References"));
const Contact = lazyWithPreload(() => import("./pages/Contact"));
const Imprint = lazyWithPreload(() => Promise.all([import("./pages/Imprint"), ensureLegal(getLangFromPath(window.location.pathname))]).then(([page]) => page));
const PrivacyPolicy = lazyWithPreload(() => Promise.all([import("./pages/PrivacyPolicy"), ensureLegal(getLangFromPath(window.location.pathname))]).then(([page]) => page));
const TermsAndConditions = lazyWithPreload(() => Promise.all([import("./pages/TermsAndConditions"), ensureLegal(getLangFromPath(window.location.pathname))]).then(([page]) => page));
const MediaCredits = lazyWithPreload(() => import("./pages/MediaCredits"));
const NotFound = lazyWithPreload(() => import("./pages/NotFound"));
const Resources = lazyWithPreload(() => import("./pages/Resources"));
const Blog = lazyWithPreload(() => import("./pages/Blog"));
const CoolingSystems = lazyWithPreload(() => import("./pages/blog/CoolingSystems"));
const RetrofitVsReplacement = lazyWithPreload(() => import("./pages/blog/RetrofitVsReplacement"));
const AerospaceQualification = lazyWithPreload(() => import("./pages/blog/AerospaceQualification"));
const TvacCostDrivers = lazyWithPreload(() => import("./pages/blog/TvacCostDrivers"));
const TvacTestCampaign = lazyWithPreload(() => import("./pages/blog/TvacTestCampaign"));
const BlogCategory = lazyWithPreload(() => import("./pages/BlogCategory"));
const GeneratedPost = lazyWithPreload(() => import("./pages/blog/GeneratedPost"));
const TvacQuestionnaire = lazyWithPreload(() => import("./pages/TvacQuestionnaire"));

const IndexRoute = Object.assign(Index, { preload: () => Promise.resolve() });

/** Single route table: rendered by App (useRoutes) and used by preloadRoute(). */
export const appRoutes = [
  { path: "/", Component: IndexRoute },
  { path: "/products", Component: Products },
  { path: "/products/standard-series", Component: StandardSeries },
  { path: "/products/custom-tvac", Component: CustomTVAC },
  { path: "/products/options", Component: Options },
  { path: "/products/options/:optionSlug", Component: OptionDetail },
  { path: "/products/thermal-vision", Component: ThermalVision },
  { path: "/services", Component: Services },
  { path: "/services/testing-services", Component: TestingServices },
  { path: "/services/control-systems-design", Component: ControlSystemsDesign },
  { path: "/services/mechanical-design", Component: MechanicalDesign },
  { path: "/services/retrofit-modernization", Component: RetrofitModernisation },
  { path: "/services/retrofit-modernisation", Component: RetrofitModernisation },
  { path: "/services/maintenance-repair", Component: MaintenanceRepair },
  { path: "/services/subsystem-integration", Component: SubsystemIntegration },
  { path: "/team", Component: Team },
  { path: "/catalogs", Component: Catalogues },
  { path: "/catalogues", Component: Catalogues },
  { path: "/resources", Component: Resources },
  { path: "/resources/blog", Component: Blog },
  { path: "/resources/blog/cooling-systems", Component: CoolingSystems },
  { path: "/resources/blog/retrofit-vs-replacement", Component: RetrofitVsReplacement },
  { path: "/resources/blog/aerospace-qualification-testing", Component: AerospaceQualification },
  { path: "/resources/blog/tvac-cost-drivers", Component: TvacCostDrivers },
  { path: "/resources/blog/tvac-test-campaign", Component: TvacTestCampaign },
  { path: "/resources/blog/category/:category", Component: BlogCategory },
  { path: "/resources/blog/:slug", Component: GeneratedPost },
  { path: "/careers", Component: Careers },
  { path: "/references", Component: References },
  { path: "/contact", Component: Contact },
  { path: "/tvac-questionnaire", Component: TvacQuestionnaire },
  { path: "/imprint", Component: Imprint },
  { path: "/privacy-policy", Component: PrivacyPolicy },
  { path: "/terms-and-conditions", Component: TermsAndConditions },
  { path: "/media-credits", Component: MediaCredits },
  { path: "/de", Component: IndexRoute },
  { path: "/de/produkte", Component: Products },
  { path: "/de/produkte/standard-serie", Component: StandardSeries },
  { path: "/de/produkte/custom-tvac", Component: CustomTVAC },
  { path: "/de/produkte/optionen", Component: Options },
  { path: "/de/produkte/optionen/:optionSlug", Component: OptionDetail },
  { path: "/de/produkte/thermal-vision", Component: ThermalVision },
  { path: "/de/leistungen", Component: Services },
  { path: "/de/leistungen/pruefdienstleistungen", Component: TestingServices },
  { path: "/de/leistungen/steuerungstechnik", Component: ControlSystemsDesign },
  { path: "/de/leistungen/mechanische-konstruktion", Component: MechanicalDesign },
  { path: "/de/leistungen/retrofit-modernisierung", Component: RetrofitModernisation },
  { path: "/de/leistungen/wartung-reparatur", Component: MaintenanceRepair },
  { path: "/de/leistungen/subsystem-integration", Component: SubsystemIntegration },
  { path: "/de/team", Component: Team },
  { path: "/de/kataloge", Component: Catalogues },
  { path: "/de/ressourcen", Component: Resources },
  { path: "/de/ressourcen/blog", Component: Blog },
  { path: "/de/ressourcen/blog/kuehlsysteme", Component: CoolingSystems },
  { path: "/de/ressourcen/blog/retrofit-vs-neubeschaffung", Component: RetrofitVsReplacement },
  { path: "/de/ressourcen/blog/raumfahrtqualifikation", Component: AerospaceQualification },
  { path: "/de/ressourcen/blog/tvac-kostentreiber", Component: TvacCostDrivers },
  { path: "/de/ressourcen/blog/tvac-testkampagne", Component: TvacTestCampaign },
  { path: "/de/ressourcen/blog/kategorie/:category", Component: BlogCategory },
  { path: "/de/ressourcen/blog/:slug", Component: GeneratedPost },
  { path: "/de/karriere", Component: Careers },
  { path: "/de/referenzen", Component: References },
  { path: "/de/kontakt", Component: Contact },
  { path: "/de/tvac-fragebogen", Component: TvacQuestionnaire },
  { path: "/de/impressum", Component: Imprint },
  { path: "/de/datenschutz", Component: PrivacyPolicy },
  { path: "/de/agb", Component: TermsAndConditions },
  { path: "/de/medienquellen", Component: MediaCredits },
  { path: "*", Component: NotFound }
] as const;

/** Preloads the chunk for a pathname. Never rejects. */
export function preloadRoute(pathname: string): Promise<void> {
  try {
    const match = appRoutes.find((r) => matchPath({ path: r.path, end: true }, pathname));
    return Promise.resolve((match ?? appRoutes[appRoutes.length - 1]).Component.preload()).then(
      () => undefined,
      () => undefined,
    );
  } catch {
    return Promise.resolve();
  }
}
