import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section } from "@/components/PageShell";
import { PlaceholderImage } from "@/components/PlaceholderImage";

const ServicePage = ({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) => (
  <Layout>
    <PageShell>
      <PageHero eyebrow={eyebrow} title={title} description={description} />
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PlaceholderImage assetId="SVC_01" type="PROCESS" aspectRatio="4/3" />
          <div className="flex flex-col justify-center space-y-4">
            <p className="text-gray text-sm leading-relaxed">Detailed service content will be developed in subsequent phases. This page shell provides the structural foundation for the final implementation.</p>
          </div>
        </div>
      </Section>
    </PageShell>
  </Layout>
);

export const TestingServices = () => <ServicePage eyebrow="Services" title="Testing Services" description="Thermal vacuum testing executed with engineering precision and comprehensive data acquisition." />;
export const ControlSystemsDesign = () => <ServicePage eyebrow="Services" title="Control Systems Design" description="Advanced automation, monitoring, and control architectures for TVAC environments." />;
export const MechanicalDesign = () => <ServicePage eyebrow="Services" title="Mechanical Design" description="Structural and mechanical engineering for high-performance vacuum systems." />;
export const RetrofitModernisation = () => <ServicePage eyebrow="Services" title="Retrofit & Modernisation" description="Upgrade and modernise existing thermal vacuum chamber infrastructure." />;
export const MaintenanceRepair = () => <ServicePage eyebrow="Services" title="Maintenance & Repair" description="Preventive maintenance, repair services, and lifecycle extension for TVAC systems." />;
export const SubsystemIntegration = () => <ServicePage eyebrow="Services" title="Subsystem Integration" description="Integration of thermal, vacuum, electrical, and mechanical subsystems." />;
