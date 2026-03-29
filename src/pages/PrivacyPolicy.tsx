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
                We process personal data only to the extent necessary to provide a functional website, respond
                to inquiries, present our services, and operate our business communication in a secure and
                efficient manner.
              </p>
              <p>
                Personal data is processed in accordance with the General Data Protection Regulation (GDPR) and
                applicable German data protection laws.
              </p>
              <p>
                We do not transfer personal data to third parties unless this is necessary for the technical
                operation of the website, for the performance of a contract or pre-contractual measures, for
                compliance with a legal obligation, on the basis of your consent, or otherwise permitted by law.
              </p>
            </LegalSection>

            <LegalSection title="Legal Bases for Processing">
              <p>Where we process personal data, we rely in particular on the following legal bases:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Art. 6(1)(a) GDPR: consent</li>
                <li>Art. 6(1)(b) GDPR: performance of a contract or pre-contractual measures</li>
                <li>Art. 6(1)(c) GDPR: compliance with a legal obligation</li>
                <li>Art. 6(1)(f) GDPR: legitimate interests</li>
              </ul>
              <p>
                Where processing is based on Art. 6(1)(f) GDPR, our legitimate interests lie in the secure,
                stable, efficient, and user-oriented operation of our website, the professional presentation of
                our company, and our business communication.
              </p>
            </LegalSection>

            <LegalSection title="Website Access Data and Server Log Files">
              <p>
                When you access our website, information is automatically collected by our hosting provider in
                server log files. This may include:
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
                This data is processed to ensure the stability, security, and technical functionality of the
                website and to detect, prevent, and investigate misuse or security-related incidents.
              </p>
              <p>Legal basis: Art. 6(1)(f) GDPR.</p>
              <p>
                Server log data is generally stored for a maximum of 7 days, unless longer retention is required
                for the investigation of security-related incidents or to assert, exercise, or defend legal
                claims.
              </p>
            </LegalSection>

            <LegalSection title="Contact by Email and Contact Form">
              <p>
                If you contact us by email or submit an inquiry via our contact form, we process the personal
                data you provide for the purpose of handling your inquiry and communicating with you.
              </p>
              <p>This may include in particular:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>first name</li>
                <li>last name</li>
                <li>business email address</li>
                <li>company name</li>
                <li>phone number, where voluntarily provided</li>
                <li>project or application information</li>
                <li>message content</li>
              </ul>
              <p>
                Mandatory fields in the contact form are marked accordingly. These data are required in order to
                process your request.
              </p>
              <p>Legal basis:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Art. 6(1)(b) GDPR, if your inquiry relates to pre-contractual measures or the performance of a
                  contract
                </li>
                <li>Art. 6(1)(f) GDPR, for general business communication and other inquiries</li>
              </ul>
              <p>
                Your data will not be shared with third parties unless this is necessary to process your request,
                required by law, or otherwise legally permitted.
              </p>
              <p>
                We store your inquiry only for as long as necessary to process it. Where statutory retention
                obligations apply, storage may continue for the duration required by applicable law.
              </p>
            </LegalSection>

            <LegalSection title="Provision of Personal Data">
              <p>
                The provision of personal data is neither legally nor contractually required. However, certain
                information may be necessary for us to process and respond to your inquiry. If you do not provide
                the relevant data, we may be unable to handle your request.
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

            <LegalSection title="No Automated Decision-Making">
              <p>
                We do not use automated decision-making, including profiling, within the meaning of Art. 22 GDPR
                in connection with this website.
              </p>
            </LegalSection>

            <LegalSection title="Changes to this Privacy Policy">
              <p>
                We reserve the right to update this Privacy Policy in order to reflect changes in legal
                requirements or changes to our website or services. The version published on this website shall
                apply.
              </p>
            </LegalSection>
          </div>
        </Section>
      </PageShell>
    </Layout>
  );
}
