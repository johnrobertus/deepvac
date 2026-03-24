import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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
import NotFound from "./pages/NotFound";
import { ScrollToTop } from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
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
          <Route path="/catalogues" element={<Catalogues />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/references" element={<References />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/imprint" element={<Imprint />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
