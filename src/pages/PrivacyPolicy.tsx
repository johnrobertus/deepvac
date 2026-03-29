import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section } from "@/components/PageShell";
import { useLanguage } from "@/components/LanguageProvider";
import { getHreflangs, getCanonical } from "@/lib/routes";

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h2 className="text-sand text-base font-medium">{title}</h2>
      {children}
    </div>
  );
}

export default function PrivacyPolicy() {
  const { t } = useTranslation("legal");
  const { t: tSeo } = useTranslation("seo");
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const hreflangs = getHreflangs(pathname);
  const canonical = getCanonical(pathname, lang);

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{tSeo("privacyPolicy.title")}</title>
        <meta name="description" content={tSeo("privacyPolicy.description")} />
        <link rel="canonical" href={canonical} />
        {hreflangs.map((h) => (
          <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />
        ))}
      </Helmet>

      <PageShell>
        <PageHero
          eyebrow={t("privacy.eyebrow")}
          title={t("privacy.title")}
          description="Deepvac GmbH"
        />

        <Section>
          <div className="max-w-3xl space-y-8 text-gray text-sm leading-relaxed">
            <p className="text-xs text-gray/60">Last updated: 29 March 2026</p>

            <LegalSection title="Controller">
              <p>Deepvac GmbH</p>
              <p>Represented by the Managing Director John Robertus</p>
              <p>An der Universität 1 (Building 8141)</p>
              <p>30823 Garbsen</p>
              <p>Germany</p>
              <p className="pt-2">Email: info@deepvac.space</p>
              <p>Phone: +49 157 830 270 99</p>
              <p className="pt-2">Registered office: Hanover, Germany</p>
            </LegalSection>

            <LegalSection title="General Information on Data Processing">
              <p>
                We process personal data only to the extent necessary to provide a functional website and our
                services. Processing is carried out in accordance with the General Data Protection Regulation
                (GDPR) and applicable German data protection laws.
              </p>
              <p>
                Personal data is not transferred to third parties unless this is required for technical
                operation, contractual performance, compliance with legal obligations, or based on another
                lawful basis.
              </p>
            </LegalSection>

            <LegalSection title="Legal Bases for Processing">
              <p>Where we process personal data, we rely in particular on the following legal bases:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Art. 6(1)(a) GDPR: consent</li>
                <li>Art. 6(1)(b) GDPR: performance of a contract or pre contractual measures</li>
                <li>Art. 6(1)(c) GDPR: compliance with a legal obligation</li>
                <li>Art. 6(1)(f) GDPR: legitimate interests</li>
              </ul>
              <p>
                Where processing is based on legitimate interests, our interest lies in the secure, stable,
                and efficient operation of our website and business communication.
              </p>
            </LegalSection>

            <LegalSection title="Website Access Data and Server Log Files">
              <p>
                When accessing our website, information is automatically collected by our hosting provider.
                This may include:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>IP address</li>
                <li>Date and time of access</li>
                <li>Requested content</li>
                <li>Access status and HTTP status code</li>
                <li>Amount of data transferred</li>
                <li>Referrer URL</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
              </ul>
              <p>
                This data is necessary to ensure the stability, security, and proper technical operation of the
                website.
              </p>
              <p>Legal basis: Art. 6(1)(f) GDPR.</p>
              <p>
                Server log data is stored for a maximum of 7 days unless longer retention is required for the
                investigation of security related incidents.
              </p>
            </LegalSection>

            <LegalSection title="Contact by Email or Contact Form">
              <p>
                If you contact us by email or via a contact form, the data you provide, such as name, email
                address, company name, and message content, will be processed solely for the purpose of
                handling your request and communicating with you.
              </p>
              <p>Legal basis:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Art. 6(1)(b) GDPR if your request relates to pre contractual measures or contract performance</li>
                <li>Art. 6(1)(f) GDPR for general business inquiries</li>
              </ul>
              <p>
                Your data will not be shared with third parties unless required for processing your request or
                due to legal obligations.
              </p>
              <p>
                The data will be deleted once the purpose of storage no longer applies and statutory retention
                obligations do not prevent deletion.
              </p>
            </LegalSection>

            <LegalSection title="Provision of Data">
              <p>
                The provision of personal data is neither legally nor contractually required. However, certain
                information may be necessary to process your inquiry. Failure to provide such data may result
                in us being unable to respond to your request.
              </p>
            </LegalSection>

            <LegalSection title="Hosting">
              <p>This website is hosted by:</p>
              <div className="pt-1 space-y-1">
                <p>Hetzner Online GmbH</p>
                <p>Industriestr. 25</p>
                <p>91710 Gunzenhausen</p>
                <p>Germany</p>
              </div>
              <p>
                Hetzner Online GmbH processes personal data on our behalf on the basis of a data processing
                agreement pursuant to Art. 28 GDPR. Data processing takes place on servers located in
                Nuremberg, Germany.
              </p>
            </LegalSection>

            <LegalSection title="Cookies">
              <p>
                This website uses only technically necessary cookies required for the secure and proper
                operation of the website.
              </p>
              <p>No marketing, profiling, analytics, or advertising tracking technologies are used.</p>
              <p>
                Legal basis: Art. 6(1)(f) GDPR. Our legitimate interest lies in the secure and efficient
                provision of our website.
              </p>
            </LegalSection>

            <LegalSection title="Data Retention">
              <p>
                Personal data is stored only for as long as necessary for the respective processing purpose or
                as required by statutory retention periods under German law.
              </p>
              <p>
                Business correspondence may be retained in accordance with applicable commercial and tax
                retention obligations.
              </p>
            </LegalSection>

            <LegalSection title="Data Security">
              <p>
                We implement appropriate technical and organizational measures to protect personal data against
                accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or unauthorized
                access.
              </p>
              <p>
                Data transmission between your browser and our website is encrypted using SSL or TLS
                technology.
              </p>
            </LegalSection>

            <LegalSection title="Your Rights">
              <p>You have the following rights under the GDPR:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Right of access pursuant to Art. 15 GDPR</li>
                <li>Right to rectification pursuant to Art. 16 GDPR</li>
                <li>Right to erasure pursuant to Art. 17 GDPR</li>
                <li>Right to restriction of processing pursuant to Art. 18 GDPR</li>
                <li>Right to data portability pursuant to Art. 20 GDPR</li>
                <li>Right to object pursuant to Art. 21 GDPR</li>
                <li>Right to withdraw consent at any time pursuant to Art. 7(3) GDPR</li>
              </ul>
              <p>
                Where personal data is processed on the basis of Art. 6(1)(f) GDPR, you have the right to
                object at any time on grounds relating to your particular situation.
              </p>
            </LegalSection>

            <LegalSection title="Supervisory Authority">
              <p>
                If you believe that the processing of your personal data violates applicable data protection
                law, you have the right to lodge a complaint with a supervisory authority.
              </p>
              <p>The competent supervisory authority for Deepvac GmbH is:</p>
              <div className="pt-1 space-y-1">
                <p>The State Commissioner for Data Protection of Lower Saxony</p>
                <p>Prinzenstraße 5</p>
                <p>30159 Hannover</p>
                <p>Germany</p>
              </div>
            </LegalSection>

            <LegalSection title="Changes to this Privacy Policy">
              <p>
                We reserve the right to update this Privacy Policy in order to reflect changes in legal
                requirements or in our services. The version published on our website shall apply.
              </p>
            </LegalSection>
          </div>
        </Section>
      </PageShell>
    </Layout>
  );
}
