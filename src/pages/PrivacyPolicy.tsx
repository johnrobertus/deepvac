import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section } from "@/components/PageShell";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <PageShell>
        <PageHero eyebrow="Legal" title="Privacy Policy" description="Deepvac GmbH" />
        <Section>
          <div className="max-w-3xl space-y-8 text-gray text-sm leading-relaxed">
            <p className="text-xs text-gray/60">Last updated: 27 February 2026</p>

            <LegalSection title="1. Controller">
              <p>Deepvac GmbH</p>
              <p>Represented by the Managing Director John Robertus</p>
              <p>An der Universität 1 (Building 8141)</p>
              <p>30823 Garbsen</p>
              <p>Germany</p>
              <p className="pt-2">Registered office: Garbsen, Germany</p>
              <p>Email: info@deepvac.space</p>
              <p>Phone: +49 157 830 270 99</p>
            </LegalSection>

            <LegalSection title="2. General Information on Data Processing">
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

            <LegalSection title="3. Legal Bases for Processing">
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

            <LegalSection title="4. Website Access Data and Server Log Files">
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
                website and to detect, prevent, and investigate misuse or security incidents.
              </p>
              <p>Legal basis: Art. 6(1)(f) GDPR.</p>
              <p>
                Server log data is generally stored for a maximum of 7 days, unless longer retention is required
                for the investigation of security-related incidents or to assert, exercise, or defend legal
                claims.
              </p>
            </LegalSection>

            <LegalSection title="5. Contact by Email and Contact Form">
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
                <li>Art. 6(1)(b) GDPR, if your inquiry relates to pre-contractual measures or the performance of a contract</li>
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

            <LegalSection title="6. Provision of Personal Data">
              <p>
                The provision of personal data is neither legally nor contractually required. However, certain
                information may be necessary for us to process and respond to your inquiry. If you do not provide
                the relevant data, we may be unable to handle your request.
              </p>
            </LegalSection>

            <LegalSection title="7. Hosting">
              <p>This website is hosted by:</p>
              <div className="pt-1 space-y-1">
                <p>Hetzner Online GmbH</p>
                <p>Industriestr. 25</p>
                <p>91710 Gunzenhausen</p>
                <p>Germany</p>
              </div>
              <p>
                Hetzner processes personal data on our behalf on the basis of a data processing agreement
                pursuant to Art. 28 GDPR.
              </p>
              <p>Data processing takes place on servers located in Nuremberg, Germany.</p>
            </LegalSection>

            <LegalSection title="8. Cookies and Similar Technologies">
              <p>
                This website uses only technically necessary cookies and similar technologies, if and to the
                extent they are required for the secure and proper provision of the website.
              </p>
              <p>
                The legal basis for storing information on, or accessing information from, your terminal device
                is Section 25(2) TDDDG, where applicable. The legal basis for the subsequent processing of
                personal data is Art. 6(1)(f) GDPR.
              </p>
              <p>
                Our legitimate interest lies in the secure, stable, and efficient provision of our website.
              </p>
              <p>
                We do not use marketing cookies, analytics cookies, profiling technologies, or advertising
                tracking tools.
              </p>
            </LegalSection>

            <LegalSection title="9. Embedded Google Maps">
              <p>On our website, we provide access to an embedded Google Map to display our location.</p>
              <p>
                The map is not loaded automatically. It is activated only after you give your consent by clicking
                the corresponding button. Before activation, no connection to Google is established for the
                display of the map.
              </p>
              <p>
                Once activated, personal data may be processed by Google, in particular your IP address, browser
                and device information, referrer data, and usage-related technical data. Google may also use
                cookies or similar technologies.
              </p>
              <p>Legal basis:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Art. 6(1)(a) GDPR</li>
                <li>Section 25(1) TDDDG, insofar as information is stored on or accessed from your terminal device</li>
              </ul>
              <p>The provider of Google Maps is:</p>
              <div className="pt-1 space-y-1">
                <p>Google Ireland Limited</p>
                <p>Gordon House, Barrow Street</p>
                <p>Dublin 4</p>
                <p>Ireland</p>
              </div>
              <p>
                Personal data may also be transferred to recipients outside the European Union or the European
                Economic Area, in particular to Google LLC in the United States, where this is necessary for the
                provision of the service.
              </p>
              <p>
                Further information on data processing by Google can be found in Google&apos;s privacy
                information.
              </p>
            </LegalSection>

            <LegalSection title="10. External Links">
              <p>
                This website may contain links to external third-party websites, including LinkedIn or Google
                Maps.
              </p>
              <p>
                When you click such a link, you leave our website and are redirected to the respective external
                website. We have no control over the data processing activities carried out by third-party
                providers on their own websites. Please refer to the respective privacy notices of those
                providers for further information.
              </p>
            </LegalSection>

            <LegalSection title="11. Recipients of Personal Data">
              <p>
                Personal data is disclosed only to those recipients who are necessary for the respective
                processing purpose. This may in particular include:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>our hosting provider acting as a processor on our behalf</li>
                <li>providers of embedded third-party content, where such content is activated by you</li>
              </ul>
              <p>
                Otherwise, data is disclosed only where there is a legal obligation to do so or where disclosure
                is otherwise legally permitted.
              </p>
            </LegalSection>

            <LegalSection title="12. Transfers to Third Countries">
              <p>
                As a rule, personal data processed through this website is not transferred to countries outside
                the European Union or the European Economic Area, unless this results from the activation of
                third-party content or another expressly used external service.
              </p>
              <p>
                Where third-party providers process data outside the EU or EEA, such processing takes place only
                on the basis of your consent, where required, or on another applicable legal basis.
              </p>
            </LegalSection>

            <LegalSection title="13. Data Retention">
              <p>
                We store personal data only for as long as necessary for the respective processing purpose or for
                as long as statutory retention obligations require.
              </p>
              <p>This means in particular:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>server log data is generally stored for up to 7 days</li>
                <li>data from email and contact form inquiries is stored until the inquiry has been fully processed, unless longer retention is required by law</li>
                <li>business correspondence may be retained for longer where required under commercial or tax law</li>
                <li>data processed in connection with consent-based third-party content is stored only for as long as necessary for the respective purpose or until consent is withdrawn, where applicable</li>
              </ul>
            </LegalSection>

            <LegalSection title="14. Data Security">
              <p>
                We implement appropriate technical and organizational measures to protect personal data against
                accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or unauthorized
                access.
              </p>
              <p>Data transmission between your browser and our website is encrypted using SSL or TLS technology.</p>
            </LegalSection>

            <LegalSection title="15. Your Rights">
              <p>You have the following rights under the GDPR, subject to the applicable legal requirements:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>right of access pursuant to Art. 15 GDPR</li>
                <li>right to rectification pursuant to Art. 16 GDPR</li>
                <li>right to erasure pursuant to Art. 17 GDPR</li>
                <li>right to restriction of processing pursuant to Art. 18 GDPR</li>
                <li>right to data portability pursuant to Art. 20 GDPR</li>
                <li>right to object pursuant to Art. 21 GDPR</li>
                <li>right to withdraw consent at any time pursuant to Art. 7(3) GDPR</li>
              </ul>
              <p>
                Where personal data is processed on the basis of Art. 6(1)(f) GDPR, you have the right to
                object at any time on grounds relating to your particular situation.
              </p>
            </LegalSection>

            <LegalSection title="16. Right to Lodge a Complaint with a Supervisory Authority">
              <p>
                If you believe that the processing of your personal data violates applicable data protection law,
                you have the right to lodge a complaint with a supervisory authority.
              </p>
              <p>The competent supervisory authority for Deepvac GmbH is:</p>
              <div className="pt-1 space-y-1">
                <p>Der Landesbeauftragte für den Datenschutz Niedersachsen</p>
                <p>Prinzenstraße 5</p>
                <p>30159 Hannover</p>
                <p>Germany</p>
              </div>
            </LegalSection>

            <LegalSection title="17. No Automated Decision-Making">
              <p>
                We do not use automated decision-making, including profiling, within the meaning of Art. 22 GDPR
                in connection with this website.
              </p>
            </LegalSection>

            <LegalSection title="18. Changes to this Privacy Policy">
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

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h2 className="text-sand text-base font-medium">{title}</h2>
      {children}
    </div>
  );
}
