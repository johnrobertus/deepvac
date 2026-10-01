import { Suspense, useEffect, useRef } from "react";
import { BrowserRouter, useLocation, useRoutes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/components/LanguageProvider";
import { ScrollToTop } from "./components/ScrollToTop";
import { markClientNavigation } from "./lib/revealState";
import { appRoutes } from "./routes";

const RouteFallback = () => <div className="min-h-screen bg-background" aria-hidden="true" />;

const routeObjects = appRoutes.map(({ path, Component }) => ({ path, element: <Component /> }));

const AppRoutes = () => {
  const location = useLocation();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    markClientNavigation();
  }, [location.key]);
  return useRoutes(routeObjects);
};

const App = () => (
  <HelmetProvider>
    <Sonner />
    <BrowserRouter future={{ v7_startTransition: true }}>
      <LanguageProvider>
        <ScrollToTop />
        <Suspense fallback={<RouteFallback />}>
          <AppRoutes />
        </Suspense>
      </LanguageProvider>
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
