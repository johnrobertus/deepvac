import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/components/LanguageProvider";
import Index from "./pages/Index";
import { ScrollToTop } from "./components/ScrollToTop";

const Products = lazy(() => import("./pages/Products"));
const StandardSeries = lazy(() => import("./pages/StandardSeries"));
const CustomTVAC = lazy(() => import("./pages/CustomTVAC"));
const Options = lazy(() => import("./pages/Options"));
const OptionDetail = lazy(() => import("./pages/OptionDetail"));
const ThermalVision = lazy(() => import("./pages/ThermalVision"));
const Services = lazy(() => import("./pages/Services"));
const ControlSystemsDesign = lazy(() =>
  import("./pages/ServicePages").then((m) => ({ default: m.ControlSystemsDesign })),
);
const MechanicalDesign = lazy(() =>
  import("./pages/ServicePages").then((m) => ({ default: m.MechanicalDesign })),
);
const RetrofitModernisation = lazy(() =>
  import("./pages/ServicePages").then((m) => ({ default: m.RetrofitModernisation })),
);
const MaintenanceRepair = lazy(() =>
  import("./pages/ServicePages").then((m) => ({ default: m.MaintenanceRepair })),
);
const SubsystemIntegration = lazy(() =>
  import("./pages/ServicePages").then((m) => ({ default: m.SubsystemIntegration })),
);
const TestingServices = lazy(() => import("./pages/TestingServices"));
const Team = lazy(() => import("./pages/Team"));
const Catalogues = lazy(() => import("./pages/Catalogues"));
const Careers = lazy(() => import("./pages/Careers"));
const References = lazy(() => import("./pages/References"));
const Contact = lazy(() => import("./pages/Contact"));
const Imprint = lazy(() => import("./pages/Imprint"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const MediaCredits = lazy(() => import("./pages/MediaCredits"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Resources = lazy(() => import("./pages/Resources"));
const Blog = lazy(() => import("./pages/Blog"));
const CoolingSystems = lazy(() => import("./pages/blog/CoolingSystems"));
const RetrofitVsReplacement = lazy(() => import("./pages/blog/RetrofitVsReplacement"));
const AerospaceQualification = lazy(() => import("./pages/blog/AerospaceQualification"));
const TvacCostDrivers = lazy(() => import("./pages/blog/TvacCostDrivers"));
const TvacTestCampaign = lazy(() => import("./pages/blog/TvacTestCampaign"));
const TvacQuestionnaire = lazy(() => import("./pages/TvacQuestionnaire"));

const queryClient = new QueryClient();

const RouteFallback = () => <div className="min-h-screen bg-background" aria-hidden="true" />;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <LanguageProvider>
            <ScrollToTop />
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                {/* English routes — unprefixed */}
                <Route path="/" element={<Index />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/standard-series" element={<StandardSeries />} />
                <Route path="/products/custom-tvac" element={<CustomTVAC />} />
                <Route path="/products/options" element={<Options />} />
                <Route path="/products/options/:optionSlug" element={<OptionDetail />} />
                <Route path="/products/thermal-vision" element={<ThermalVision />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/testing-services" element={<TestingServices />} />
                <Route path="/services/control-systems-design" element={<ControlSystemsDesign />} />
                <Route path="/services/mechanical-design" element={<MechanicalDesign />} />
                <Route path="/services/retrofit-modernization" element={<RetrofitModernisation />} />
                <Route path="/services/retrofit-modernisation" element={<RetrofitModernisation />} />
                <Route path="/services/maintenance-repair" element={<MaintenanceRepair />} />
                <Route path="/services/subsystem-integration" element={<SubsystemIntegration />} />
                <Route path="/team" element={<Team />} />
                <Route path="/catalogs" element={<Catalogues />} />
                <Route path="/catalogues" element={<Catalogues />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/resources/blog" element={<Blog />} />
                <Route path="/resources/blog/cooling-systems" element={<CoolingSystems />} />
                <Route path="/resources/blog/retrofit-vs-replacement" element={<RetrofitVsReplacement />} />
                <Route path="/resources/blog/aerospace-qualification-testing" element={<AerospaceQualification />} />
                <Route path="/resources/blog/tvac-cost-drivers" element={<TvacCostDrivers />} />
                <Route path="/resources/blog/tvac-test-campaign" element={<TvacTestCampaign />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/references" element={<References />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/tvac-questionnaire" element={<TvacQuestionnaire />} />
                <Route path="/imprint" element={<Imprint />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="/media-credits" element={<MediaCredits />} />

                {/* German routes — /de prefix with localized slugs */}
                <Route path="/de" element={<Index />} />
                <Route path="/de/produkte" element={<Products />} />
                <Route path="/de/produkte/standard-serie" element={<StandardSeries />} />
                <Route path="/de/produkte/custom-tvac" element={<CustomTVAC />} />
                <Route path="/de/produkte/optionen" element={<Options />} />
                <Route path="/de/produkte/optionen/:optionSlug" element={<OptionDetail />} />
                <Route path="/de/produkte/thermal-vision" element={<ThermalVision />} />
                <Route path="/de/leistungen" element={<Services />} />
                <Route path="/de/leistungen/pruefdienstleistungen" element={<TestingServices />} />
                <Route path="/de/leistungen/steuerungstechnik" element={<ControlSystemsDesign />} />
                <Route path="/de/leistungen/mechanische-konstruktion" element={<MechanicalDesign />} />
                <Route path="/de/leistungen/retrofit-modernisierung" element={<RetrofitModernisation />} />
                <Route path="/de/leistungen/wartung-reparatur" element={<MaintenanceRepair />} />
                <Route path="/de/leistungen/subsystem-integration" element={<SubsystemIntegration />} />
                <Route path="/de/team" element={<Team />} />
                <Route path="/de/kataloge" element={<Catalogues />} />
                <Route path="/de/ressourcen" element={<Resources />} />
                <Route path="/de/ressourcen/blog" element={<Blog />} />
                <Route path="/de/ressourcen/blog/kuehlsysteme" element={<CoolingSystems />} />
                <Route path="/de/ressourcen/blog/retrofit-vs-neubeschaffung" element={<RetrofitVsReplacement />} />
                <Route path="/de/ressourcen/blog/raumfahrtqualifikation" element={<AerospaceQualification />} />
                <Route path="/de/ressourcen/blog/tvac-kostentreiber" element={<TvacCostDrivers />} />
                <Route path="/de/ressourcen/blog/tvac-testkampagne" element={<TvacTestCampaign />} />
                <Route path="/de/karriere" element={<Careers />} />
                <Route path="/de/referenzen" element={<References />} />
                <Route path="/de/kontakt" element={<Contact />} />
                <Route path="/de/tvac-fragebogen" element={<TvacQuestionnaire />} />
                <Route path="/de/impressum" element={<Imprint />} />
                <Route path="/de/datenschutz" element={<PrivacyPolicy />} />
                <Route path="/de/agb" element={<TermsAndConditions />} />
                <Route path="/de/medienquellen" element={<MediaCredits />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </LanguageProvider>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
