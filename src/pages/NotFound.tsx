import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <PageShell>
        <section className="py-32 md:py-48 px-6">
          <div className="container max-w-4xl text-center space-y-8">
            <span className="mono-label text-blue">Error 404</span>
            <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-sand">
              Page Not Found
            </h1>
            <p className="text-base text-gray max-w-md mx-auto leading-relaxed">
              The page you're looking for doesn't exist or has been moved. Use the navigation above or return to the homepage.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button asChild size="lg" className="font-mono text-xs tracking-wide">
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Return to Homepage
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </PageShell>
    </Layout>
  );
};

export default NotFound;
