import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/components/LanguageProvider";
import Index from "./pages/Index";
import Products from "./pages/Products";
import StandardSeries from "./pages/StandardSeries";
import CustomTVAC from "./pages/CustomTVAC";
import TwinQCM from "./pages/TwinQCM";
import Services from "./pages/Services";
import {
  TestingServices,
  ControlSystemsDesign,
  MechanicalDesign,
  RetrofitModernisation,
  MaintenanceRepair,
  SubsystemIntegration,
} from "./pages/ServicePages";
import Team from "./pages/Team";
import Catalogues from "./pages/Catalogues";
import Careers from "./pages/Careers";
import References from "./pages/References";
import Contact from "./pages/Contact";
import Imprint from "./pages/Imprint";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import MediaCredits from "./pages/MediaCredits";
import NotFound from "./pages/NotFound";
import { ScrollToTop } from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <LanguageProvider>
            <ScrollToTop />
            <Routes>
              {/* English routes — unprefixed */}
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/standard-series" element={<StandardSeries />} />
              <Route path="/products/custom-tvac" element={<CustomTVAC />} />
              <Route path="/products/twin-qcm" element={<TwinQCM />} />
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
              <Route path="/careers" element={<Careers />} />
              <Route path="/references" element={<References />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/imprint" element={<Imprint />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

              {/* German routes — /de prefix with localized slugs */}
              <Route path="/de" element={<Index />} />
              <Route path="/de/produkte" element={<Products />} />
              <Route path="/de/produkte/standard-serie" element={<StandardSeries />} />
              <Route path="/de/produkte/custom-tvac" element={<CustomTVAC />} />
              <Route path="/de/leistungen" element={<Services />} />
              <Route path="/de/leistungen/pruefdienstleistungen" element={<TestingServices />} />
              <Route path="/de/leistungen/steuerungstechnik" element={<ControlSystemsDesign />} />
              <Route path="/de/leistungen/mechanische-konstruktion" element={<MechanicalDesign />} />
              <Route path="/de/leistungen/retrofit-modernisierung" element={<RetrofitModernisation />} />
              <Route path="/de/leistungen/wartung-reparatur" element={<MaintenanceRepair />} />
              <Route path="/de/leistungen/subsystem-integration" element={<SubsystemIntegration />} />
              <Route path="/de/team" element={<Team />} />
              <Route path="/de/kataloge" element={<Catalogues />} />
              <Route path="/de/karriere" element={<Careers />} />
              <Route path="/de/referenzen" element={<References />} />
              <Route path="/de/kontakt" element={<Contact />} />
              <Route path="/de/impressum" element={<Imprint />} />
              <Route path="/de/datenschutz" element={<PrivacyPolicy />} />
              <Route path="/de/agb" element={<TermsAndConditions />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </LanguageProvider>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
