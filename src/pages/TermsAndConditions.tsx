import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section } from "@/components/PageShell";
import { useLanguage } from "@/components/LanguageProvider";
import { getHreflangs, getCanonical } from "@/lib/routes";

export default function TermsAndConditions() {
  const { t } = useTranslation("legal");
  const { t: tSeo } = useTranslation("seo");
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const hreflangs = getHreflangs(pathname);
  const canonical = getCanonical(pathname, lang);

  const emailLabel = lang === "de" ? "E-Mail" : "Email";
  const phoneLabel = lang === "de" ? "Telefon" : "Phone";
  const businessAddressLabel = lang === "de" ? "Geschäftsadresse" : "Business address";
  const registeredOfficeLabel = t("imprint.registeredOffice");
  const registeredOfficeValue = t("imprint.registeredOfficeValue");

  const tk = (key: string, defaultValue?: string) =>
    t(key, {
      defaultValue,
      keySeparator: false,
    });

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{tSeo("termsAndConditions.title")}</title>
        <meta name="description" content={tSeo("termsAndConditions.description")} />
        <link rel="canonical" href={canonical} />
        {hreflangs.map((h) => (
          <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />
        ))}
      </Helmet>

      <PageShell>
        <PageHero eyebrow={t("terms.eyebrow")} title={t("terms.title")} description="Deepvac GmbH" />
        <Section>
          <div className="max-w-3xl space-y-10 text-gray text-sm leading-relaxed">
            <p className="text-xs text-gray/60">{t("terms.effectiveDate")}</p>

            <LS n="1" title={tk("terms.sections.1.title", "Parties and Contact")}>
              <p className="font-medium text-sand">1.1 {tk("terms.sections.1.provider", "Provider")}</p>
              <p>Deepvac GmbH</p>
              <p>{t("imprint.representedBy")}</p>
              <p>
                {businessAddressLabel}: An der Universität 1, 30823 Garbsen, {lang === "de" ? "Deutschland" : "Germany"}
              </p>
              <p>{emailLabel}: info@deepvac.space</p>
              <p>{phoneLabel}: +49 157 830 270 99</p>
              <p>
                {registeredOfficeLabel}: {registeredOfficeValue}
              </p>

              <p className="font-medium text-sand pt-4">1.2 {tk("terms.sections.1.customer", "Customer")}</p>
              <p>
                {tk(
                  "terms.sections.1.customerText",
                  "The contracting business customer as identified in the offer, Order, or order confirmation.",
                )}
              </p>
            </LS>

            <LS n="2" title={tk("terms.sections.2.title", "Definitions")}>
              <p>
                {tk("terms.sections.2.2.1", '2.1 "Deepvac" means Deepvac GmbH.').replace("terms.sections.2.2.1", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.2.2.2",
                  '2.2 "Customer" means the contracting party receiving Deliverables or Services from Deepvac.',
                ).replace("terms.sections.2.2.2", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.2.2.3",
                  '2.3 "Affiliate" means any entity that controls, is controlled by, or is under common control with a party. Control means holding, directly or indirectly, more than 50 percent of the voting rights or otherwise having the ability to direct management and policies.',
                ).replace("terms.sections.2.2.3", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.2.2.4",
                  '2.4 "Deliverables" means any hardware, parts, prototypes, assemblies, software, firmware, models, drawings, documentation, test plans, acceptance criteria, test reports, data, and other work results provided by Deepvac.',
                ).replace("terms.sections.2.2.4", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.2.2.5",
                  '2.5 "Services" means any testing services, engineering, design, development, consulting, integration, commissioning, training, maintenance, repair, and related activities performed by Deepvac.',
                ).replace("terms.sections.2.2.5", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.2.2.6",
                  '2.6 "Order" means the Customer\'s purchase order, acceptance of an offer, or other written instruction to proceed.',
                ).replace("terms.sections.2.2.6", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.2.2.7",
                  '2.7 "Contract" means the binding agreement formed under clause 4, including all documents listed in clause 5.',
                ).replace("terms.sections.2.2.7", "")}
              </p>
            </LS>

            <LS n="3" title={tk("terms.sections.3.title", "Scope and Applicability")}>
              <p>
                {tk(
                  "terms.sections.3.3.1",
                  "3.1 These General Terms and Conditions apply to all offers, Orders, Deliveries, Services, and Contracts with Deepvac.",
                ).replace("terms.sections.3.3.1", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.3.3.2",
                  "3.2 These Terms apply exclusively to entrepreneurs within the meaning of Section 14 German Civil Code, legal entities under public law, and special funds under public law. Contracts with consumers are excluded.",
                ).replace("terms.sections.3.3.2", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.3.3.3",
                  "3.3 The Customer's terms and conditions do not apply, even if Deepvac does not object, unless Deepvac expressly agrees to them in text form.",
                ).replace("terms.sections.3.3.3", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.3.3.4",
                  "3.4 Individual agreements in text form take precedence over these Terms.",
                ).replace("terms.sections.3.3.4", "")}
              </p>
            </LS>

            <LS n="4" title={tk("terms.sections.4.title", "Formation of Contract")}>
              <p>
                {tk(
                  "terms.sections.4.4.1",
                  "4.1 Offers are non-binding unless expressly stated as binding in text form.",
                ).replace("terms.sections.4.4.1", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.4.4.2",
                  "4.2 A Contract is concluded only when Deepvac issues an order confirmation in text form or begins performance.",
                ).replace("terms.sections.4.4.2", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.4.4.3",
                  "4.3 Oral agreements are not binding unless confirmed by Deepvac in text form.",
                ).replace("terms.sections.4.4.3", "")}
              </p>
            </LS>

            <LS n="5" title={tk("terms.sections.5.title", "Contract Documents and Order of Precedence")}>
              <p>
                {tk(
                  "terms.sections.5.5.1intro",
                  "5.1 The Contract consists of, in descending order of precedence:",
                ).replace("terms.sections.5.5.1intro", "")}
              </p>
              <ol className="list-[lower-alpha] pl-5 space-y-1">
                <li>{tk("terms.sections.5.5.1a", "Deepvac's order confirmation")}</li>
                <li>{tk("terms.sections.5.5.1b", "Deepvac's offer and annexes")}</li>
                <li>
                  {tk(
                    "terms.sections.5.5.1c",
                    "Statement of work, specification, test plan, acceptance criteria, and any agreed change orders",
                  )}
                </li>
                <li>{tk("terms.sections.5.5.1d", "These Terms")}</li>
                <li>
                  {tk("terms.sections.5.5.1e", "Any other documents expressly incorporated by reference in text form")}
                </li>
              </ol>
              <p>
                {tk(
                  "terms.sections.5.5.2",
                  "5.2 Marketing statements, website content, brochures, and general technical descriptions are non-binding unless explicitly agreed as guaranteed characteristics in text form.",
                ).replace("terms.sections.5.5.2", "")}
              </p>
            </LS>

            <LS n="6" title={tk("terms.sections.6.title", "Scope of Performance")}>
              <p>
                {tk(
                  "terms.sections.6.6.1",
                  "6.1 Deepvac shall provide Deliverables and Services only as expressly agreed in the Contract documents.",
                ).replace("terms.sections.6.6.1", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.6.6.2",
                  "6.2 Deepvac may use qualified subcontractors. Deepvac remains responsible for its contractual obligations.",
                ).replace("terms.sections.6.6.2", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.6.6.3",
                  "6.3 Unless expressly agreed, Deepvac does not owe regulatory approvals, certification outcomes, conformity assessments, or fitness for any specific purpose beyond the agreed specification.",
                ).replace("terms.sections.6.6.3", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.6.6.4",
                  "6.4 Deepvac may implement reasonable minor changes in design, components, or process if they do not materially impair the contractual purpose and are objectively reasonable for the Customer.",
                ).replace("terms.sections.6.6.4", "")}
              </p>
            </LS>

            <LS n="7" title={tk("terms.sections.7.title", "Change Requests")}>
              <p>
                {tk(
                  "terms.sections.7.7.1",
                  "7.1 Any change to scope, parameters, schedule, acceptance criteria, interfaces, documentation, or Deliverables requires a change order in text form.",
                ).replace("terms.sections.7.7.1", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.7.7.2",
                  "7.2 Deepvac will provide a change proposal including impact on price, schedule, and technical feasibility. Changes become binding only upon acceptance by both parties in text form.",
                ).replace("terms.sections.7.7.2", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.7.7.3",
                  "7.3 If the Customer requests work before a change order is agreed, such work is performed on a time and materials basis and does not imply acceptance of a fixed price or deadline.",
                ).replace("terms.sections.7.7.3", "")}
              </p>
            </LS>

            <LS n="8" title={tk("terms.sections.8.title", "Customer Cooperation Duties")}>
              <p>
                {tk(
                  "terms.sections.8.8.1",
                  "8.1 The Customer shall provide all information, decisions, access, samples, drawings, specifications, and materials required for performance in a timely manner and free of charge to Deepvac.",
                ).replace("terms.sections.8.8.1", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.8.8.2",
                  "8.2 The Customer warrants that any items, materials, and instructions provided are safe, suitable, and compliant with applicable laws and regulations.",
                ).replace("terms.sections.8.8.2", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.8.8.3",
                  "8.3 The Customer warrants that its data, materials, and instructions do not infringe third party rights. The Customer shall indemnify Deepvac against third party claims arising from such infringement, except to the extent caused by Deepvac.",
                ).replace("terms.sections.8.8.3", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.8.8.4",
                  "8.4 If Customer cooperation is delayed or incomplete, Deepvac is entitled to extend deadlines and invoice additional effort and costs.",
                ).replace("terms.sections.8.8.4", "")}
              </p>
            </LS>

            <LS n="9" title={tk("terms.sections.9.title", "Testing Services Specific Terms")}>
              <p>
                {tk(
                  "terms.sections.9.9.1",
                  "9.1 Testing shall be performed according to the agreed test plan. If no test plan is agreed, testing shall be performed according to Deepvac's standard procedures appropriate to the assignment.",
                ).replace("terms.sections.9.9.1", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.9.9.2",
                  "9.2 The Customer remains solely responsible for the design, intended use, safety, legal conformity, and regulatory compliance of the test item.",
                ).replace("terms.sections.9.9.2", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.9.9.3",
                  "9.3 Test results are valid only for the tested configuration and boundary conditions documented in the test report. Any extrapolation is at the Customer's risk.",
                ).replace("terms.sections.9.9.3", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.9.9.4",
                  "9.4 Measurement uncertainty, tolerances, and limitations are as stated in the test documentation or otherwise customary for the methods used.",
                ).replace("terms.sections.9.9.4", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.9.9.5",
                  "9.5 Deepvac may suspend or refuse testing if the test item presents a safety risk, lacks required documentation, or violates applicable rules. The Customer bears resulting costs.",
                ).replace("terms.sections.9.9.5", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.9.9.6",
                  "9.6 After completion of testing or Services, Deepvac will make the test item available for collection or shipment as agreed. Unless otherwise agreed, return shipment is at the Customer's cost and risk.",
                ).replace("terms.sections.9.9.6", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.9.9.7",
                  "9.7 Deepvac will store test items free of charge for up to thirty calendar days after notifying the Customer of completion or readiness for return, whichever occurs first.",
                ).replace("terms.sections.9.9.7", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.9.9.8",
                  "9.8 After the free storage period, Deepvac may charge reasonable storage fees. If the Customer does not arrange collection or shipment within a reasonable additional period after a written reminder, Deepvac may, where legally permissible, dispose of the test item at the Customer's expense. Where practicable, Deepvac will inform the Customer in advance.",
                ).replace("terms.sections.9.9.8", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.9.9.9",
                  "9.9 The Customer remains responsible for ensuring that test items are free of hazardous substances unless explicitly declared and agreed in text form. If hazardous materials are involved, the Customer shall provide complete safety data sheets and handling instructions prior to delivery.",
                ).replace("terms.sections.9.9.9", "")}
              </p>
            </LS>

            <LS n="10" title={tk("terms.sections.10.title", "Prices, Taxes, and Payment")}>
              <p>
                {tk(
                  "terms.sections.10.10.1",
                  "10.1 Prices are net prices plus applicable VAT and any other applicable taxes, duties, customs, or fees unless expressly included.",
                ).replace("terms.sections.10.10.1", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.10.10.2",
                  "10.2 Unless otherwise agreed, invoices are payable within fourteen calendar days from the invoice date without deduction.",
                ).replace("terms.sections.10.10.2", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.10.10.3",
                  "10.3 Deepvac may require advance payment, milestone payments, or security, especially for custom developments, prototypes, or high-value Orders.",
                ).replace("terms.sections.10.10.3", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.10.10.4",
                  "10.4 The Customer may set off only undisputed or finally adjudicated claims. Rights of retention apply only to claims arising from the same Contract.",
                ).replace("terms.sections.10.10.4", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.10.10.5",
                  "10.5 In case of late payment, statutory default interest under German law applies. Deepvac may charge reasonable reminder and collection costs as permitted by law.",
                ).replace("terms.sections.10.10.5", "")}
              </p>
            </LS>

            <LS n="11" title={tk("terms.sections.11.title", "Delivery, Deadlines, and Force Majeure")}>
              <p>
                {tk(
                  "terms.sections.11.11.1",
                  "11.1 Dates and deadlines are non-binding unless expressly agreed as binding in text form.",
                ).replace("terms.sections.11.11.1", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.11.11.1a",
                  "11.1a Contractual penalties, liquidated damages, or similar delay sanctions apply only if expressly agreed in text form in the respective order confirmation.",
                ).replace("terms.sections.11.11.1a", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.11.11.2",
                  "11.2 Delivery and performance periods start only after order confirmation, receipt of any agreed advance payment, and receipt of all Customer cooperation items required to start performance.",
                ).replace("terms.sections.11.11.2", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.11.11.3",
                  "11.3 Force majeure includes events beyond Deepvac's reasonable control, including supply chain disruptions, transportation disruptions, governmental measures, export restrictions, sanctions, labor disputes, power failures, cyber incidents not caused by Deepvac, pandemics, and natural events. In such cases, obligations are suspended for the duration, and deadlines extend accordingly.",
                ).replace("terms.sections.11.11.3", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.11.11.4",
                  "11.4 Deepvac may perform partial deliveries and partial Services if reasonable for the Customer.",
                ).replace("terms.sections.11.11.4", "")}
              </p>
            </LS>

            <LS n="12" title={tk("terms.sections.12.title", "Shipping, Risk Transfer, and Packaging")}>
              <p>
                {tk(
                  "terms.sections.12.12.1",
                  "12.1 Unless otherwise agreed, delivery is EXW Deepvac's business address (Incoterms 2020). Risk transfers upon provision for collection or handover to the carrier, whichever occurs first.",
                ).replace("terms.sections.12.12.1", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.12.12.2",
                  "12.2 The Customer bears transport, insurance, customs, export, and import costs unless otherwise agreed.",
                ).replace("terms.sections.12.12.2", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.12.12.3",
                  "12.3 Packaging is charged at cost unless otherwise agreed. Returnable packaging is accepted only by prior agreement in text form.",
                ).replace("terms.sections.12.12.3", "")}
              </p>
            </LS>

            <LS n="13" title={tk("terms.sections.13.title", "Acceptance of Deliverables")}>
              <p>
                {tk(
                  "terms.sections.13.13.1",
                  "13.1 If acceptance is agreed or legally required, acceptance criteria and procedure shall be defined in text form.",
                ).replace("terms.sections.13.13.1", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.13.13.2intro",
                  "13.2 If no acceptance procedure is agreed, acceptance occurs when Deepvac has notified the Customer in text form that the Deliverables are ready for acceptance and, in that notice, has informed the Customer of the acceptance mechanism under this clause 13.2, and then:",
                ).replace("terms.sections.13.13.2intro", "")}
              </p>
              <ol className="list-[lower-alpha] pl-5 space-y-1">
                <li>{tk("terms.sections.13.13.2a", "the Customer confirms acceptance in text form, or")}</li>
                <li>{tk("terms.sections.13.13.2b", "the Customer uses the Deliverables productively, or")}</li>
                <li>
                  {tk(
                    "terms.sections.13.13.2c",
                    "fourteen calendar days pass after such notice and the Customer has not provided a notice of material defects in text form.",
                  )}
                </li>
              </ol>
              <p>
                {tk(
                  "terms.sections.13.13.3",
                  "13.3 Minor defects that do not materially impair the contractual use do not prevent acceptance.",
                ).replace("terms.sections.13.13.3", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.13.13.4",
                  "13.4 The Customer shall test and inspect Deliverables promptly within a reasonable period, taking into account the complexity of the Deliverables and the intended use.",
                ).replace("terms.sections.13.13.4", "")}
              </p>
            </LS>

            <LS n="14" title={tk("terms.sections.14.title", "Retention of Title")}>
              <p>
                {tk(
                  "terms.sections.14.14.1",
                  "14.1 Delivered goods remain the property of Deepvac until full payment of all present and future claims arising from the business relationship.",
                ).replace("terms.sections.14.14.1", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.14.14.2",
                  "14.2 The Customer shall handle retained goods with care and insure them adequately.",
                ).replace("terms.sections.14.14.2", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.14.14.3",
                  "14.3 The Customer may resell goods in the ordinary course of business. The Customer assigns to Deepvac, as security, all claims arising from such resale up to the amount of Deepvac's outstanding claims. Deepvac accepts this assignment.",
                ).replace("terms.sections.14.14.3", "")}
              </p>
            </LS>

            <LS n="15" title={tk("terms.sections.15.title", "Warranty and Defect Claims")}>
              <p>
                {tk(
                  "terms.sections.15.15.1",
                  "15.1 The Customer shall inspect Deliverables without undue delay after delivery, insofar as this is feasible in the ordinary course of business. If Section 377 HGB applies, the Customer shall inspect the Deliverables and notify defects in accordance with that provision. In all other cases, the Customer shall notify apparent defects and hidden defects in text form without undue delay after becoming aware of them.",
                ).replace("terms.sections.15.15.1", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.15.15.2",
                  "15.2 In case of justified defects, Deepvac shall, at its discretion, repair or replace the defective Deliverable or re-perform the defective Service.",
                ).replace("terms.sections.15.15.2", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.15.15.3",
                  "15.3 The limitation period for defect claims is twelve months from delivery in the case of goods and twelve months from acceptance in the case of work results, unless mandatory law requires a longer period. Where acceptance is excluded by the nature of the work, the limitation period begins upon completion. This does not apply in cases of fraudulent concealment, assumption of a guarantee, injury to life, body, or health, intentional misconduct, gross negligence, or mandatory liability under applicable product liability law.",
                ).replace("terms.sections.15.15.3", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.15.15.4",
                  "15.4 No defect claim exists for insignificant deviations, normal wear and tear, defects caused by improper use, unauthorized modification, installation errors by the Customer or third parties, unsuitable operating conditions, or external influences beyond Deepvac's control.",
                ).replace("terms.sections.15.15.4", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.15.15.5",
                  "15.5 If the Customer or third parties perform remedial actions without Deepvac's prior consent, defect claims are excluded unless the Customer proves that such actions did not cause or aggravate the defect.",
                ).replace("terms.sections.15.15.5", "")}
              </p>
            </LS>

            <LS n="16" title={tk("terms.sections.16.title", "Liability")}>
              <p>
                {tk(
                  "terms.sections.16.16.1",
                  "16.1 Deepvac is liable without limitation for intent, gross negligence, and injury to life, body, or health.",
                ).replace("terms.sections.16.16.1", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.16.16.2",
                  "16.2 In case of slight negligence, Deepvac is liable only for breach of essential contractual obligations. Essential contractual obligations are obligations whose fulfilment is necessary to achieve the purpose of the Contract and on whose compliance the Customer may regularly rely.",
                ).replace("terms.sections.16.16.2", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.16.16.3",
                  "16.3 In the case of clause 16.2, liability is limited to the foreseeable, typically occurring damage at the time of Contract conclusion.",
                ).replace("terms.sections.16.16.3", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.16.16.4",
                  "16.4 To the extent permitted by law, Deepvac is not liable for indirect or consequential damages, including loss of profit, loss of revenue, business interruption, production downtime, loss of use, and third party claims.",
                ).replace("terms.sections.16.16.4", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.16.16.4a",
                  "16.4a To the extent liability for loss of data applies, Deepvac's liability is limited to the typical recovery effort that would have been required if the Customer had performed regular and appropriate data backups.",
                ).replace("terms.sections.16.16.4a", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.16.16.5",
                  "16.5 Unless mandatory law provides otherwise, total aggregate liability for claims based on slight negligence is limited to the net Contract value of the respective Order.",
                ).replace("terms.sections.16.16.5", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.16.16.6",
                  "16.6 Mandatory liability under applicable product liability law remains unaffected.",
                ).replace("terms.sections.16.16.6", "")}
              </p>
            </LS>

            <LS n="17" title={tk("terms.sections.17.title", "Intellectual Property and Rights of Use")}>
              <p>
                {tk(
                  "terms.sections.17.17.1",
                  "17.1 All intellectual property rights, know-how, methods, tools, templates, libraries, algorithms, models, and pre-existing software or documentation of Deepvac remain with Deepvac.",
                ).replace("terms.sections.17.17.1", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.17.17.2",
                  "17.2 Unless expressly agreed otherwise, Deliverables created under the Contract grant the Customer a non-exclusive, non-transferable, non-sublicensable right to use the Deliverables solely for the Customer's internal purposes and only to the extent necessary for the contractual purpose.",
                ).replace("terms.sections.17.17.2", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.17.17.3",
                  "17.3 Source code, CAD source files, training data, model weights, and development repositories are not owed unless expressly agreed in text form.",
                ).replace("terms.sections.17.17.3", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.17.17.4",
                  "17.4 The Customer shall not remove proprietary notices and shall not reverse engineer, decompile, or disassemble software or firmware except where mandatory law permits it.",
                ).replace("terms.sections.17.17.4", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.17.17.5",
                  "17.5 Unless expressly agreed otherwise, the Customer may use test reports and test data delivered under the Contract for the Customer's internal purposes to the extent necessary for the contractual purpose.",
                ).replace("terms.sections.17.17.5", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.17.17.6",
                  "17.6 Deepvac retains all rights in its measurement methods, test procedures, setups, tooling, templates, know-how, and underlying evaluation logic, even if reflected in reports or data.",
                ).replace("terms.sections.17.17.6", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.17.17.7",
                  "17.7 Any use of anonymized or aggregated results by Deepvac for benchmarking, quality management, marketing references, case studies, or statistics requires the Customer's prior written consent in each individual case. Without such consent, Deepvac will not use Customer-related test results outside contract performance.",
                ).replace("terms.sections.17.17.7", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.17.17.8",
                  "17.8 Raw measurement data formats, intermediate datasets, and internal system logs are provided only if expressly agreed in text form.",
                ).replace("terms.sections.17.17.8", "")}
              </p>
            </LS>

            <LS n="18" title={tk("terms.sections.18.title", "Confidentiality")}>
              <p>
                {tk(
                  "terms.sections.18.18.1",
                  "18.1 Each party shall keep confidential all non-public technical, commercial, and operational information received from the other party and shall use it only for the contractual purpose.",
                ).replace("terms.sections.18.18.1", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.18.18.2",
                  "18.2 Confidential information may be disclosed only to employees and subcontractors on a need-to-know basis and under confidentiality obligations at least as protective as those herein.",
                ).replace("terms.sections.18.18.2", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.18.18.3intro",
                  "18.3 Confidentiality does not apply to information that is:",
                ).replace("terms.sections.18.18.3intro", "")}
              </p>
              <ol className="list-[lower-alpha] pl-5 space-y-1">
                <li>{tk("terms.sections.18.18.3a", "publicly known without breach, or")}</li>
                <li>
                  {tk(
                    "terms.sections.18.18.3b",
                    "lawfully obtained from a third party without confidentiality obligations, or",
                  )}
                </li>
                <li>
                  {tk(
                    "terms.sections.18.18.3c",
                    "independently developed without use of the other party's confidential information, or",
                  )}
                </li>
                <li>
                  {tk(
                    "terms.sections.18.18.3d",
                    "required to be disclosed by law or court order. If disclosure is required and legally permissible, the disclosing party shall notify the other party in advance.",
                  )}
                </li>
              </ol>
              <p>
                {tk(
                  "terms.sections.18.18.4",
                  "18.4 The confidentiality obligation continues for five years after termination of the Contract. Trade secrets remain protected for as long as they qualify as trade secrets under applicable law.",
                ).replace("terms.sections.18.18.4", "")}
              </p>
            </LS>

            <LS n="19" title={tk("terms.sections.19.title", "Data Protection")}>
              <p>
                {tk(
                  "terms.sections.19.19.1",
                  "19.1 Each party shall comply with applicable data protection laws, including the GDPR where applicable.",
                ).replace("terms.sections.19.19.1", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.19.19.2",
                  "19.2 If Deepvac processes personal data on behalf of the Customer, the parties shall conclude a data processing agreement pursuant to Art. 28 GDPR before processing begins.",
                ).replace("terms.sections.19.19.2", "")}
              </p>
            </LS>

            <LS n="20" title={tk("terms.sections.20.title", "Export Control and Sanctions")}>
              <p>
                {tk(
                  "terms.sections.20.20.1",
                  "20.1 Performance may be subject to export control laws, sanctions, and embargoes. The Customer shall provide all information required to assess compliance, including end use and end user information upon request.",
                ).replace("terms.sections.20.20.1", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.20.20.2",
                  "20.2 Deepvac may suspend or refuse performance if it would violate applicable export control or sanctions regulations.",
                ).replace("terms.sections.20.20.2", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.20.20.3",
                  "20.3 The Customer warrants that it will not use Deliverables for prohibited end uses and will comply with applicable re-export requirements.",
                ).replace("terms.sections.20.20.3", "")}
              </p>
            </LS>

            <LS n="21" title={tk("terms.sections.21.title", "Compliance and Safety")}>
              <p>
                {tk(
                  "terms.sections.21.21.1",
                  "21.1 The Customer shall comply with all applicable safety regulations and follow Deepvac's safety instructions on Deepvac premises and when using Deepvac equipment.",
                ).replace("terms.sections.21.21.1", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.21.21.2",
                  "21.2 If the Customer provides hazardous materials, the Customer shall provide complete safety data sheets and handling instructions in advance.",
                ).replace("terms.sections.21.21.2", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.21.21.3",
                  "21.3 The Customer shall ensure that any personnel visiting Deepvac facilities are properly instructed and equipped in accordance with applicable safety rules.",
                ).replace("terms.sections.21.21.3", "")}
              </p>
            </LS>

            <LS n="22" title={tk("terms.sections.22.title", "Suspension, Termination, and Cancellation")}>
              <p>
                {tk(
                  "terms.sections.22.22.1",
                  "22.1 Deepvac may suspend performance if the Customer is in default of payment or materially breaches cooperation duties, after a reasonable notice period.",
                ).replace("terms.sections.22.22.1", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.22.22.2intro",
                  "22.2 If the Customer cancels an Order after Contract conclusion, Deepvac is entitled to invoice:",
                ).replace("terms.sections.22.22.2intro", "")}
              </p>
              <ol className="list-[lower-alpha] pl-5 space-y-1">
                <li>{tk("terms.sections.22.22.2a", "all Services performed and costs incurred, and")}</li>
                <li>
                  {tk("terms.sections.22.22.2b", "all committed third party costs and non-cancelable procurement, and")}
                </li>
                <li>
                  {tk(
                    "terms.sections.22.22.2c",
                    "a reasonable cancellation fee reflecting the portion of the Order not yet performed, taking into account saved expenses and any other use of resources, unless the Customer proves that Deepvac suffered no or lower loss.",
                  )}
                </li>
              </ol>
              <p>
                {tk(
                  "terms.sections.22.22.3",
                  "22.3 Statutory rights to terminate for cause remain unaffected.",
                ).replace("terms.sections.22.22.3", "")}
              </p>
            </LS>

            <LS n="23" title={tk("terms.sections.23.title", "Assignment")}>
              <p>
                {tk(
                  "terms.sections.23.23.1",
                  "23.1 The Customer may not assign rights or obligations under the Contract without Deepvac's prior written consent.",
                ).replace("terms.sections.23.23.1", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.23.23.2",
                  "23.2 Deepvac may assign monetary claims to third parties for financing or factoring purposes.",
                ).replace("terms.sections.23.23.2", "")}
              </p>
            </LS>

            <LS n="24" title={tk("terms.sections.24.title", "Governing Law, Jurisdiction, and Place of Performance")}>
              <p>
                {tk(
                  "terms.sections.24.24.1",
                  "24.1 The Contract is governed by the laws of the Federal Republic of Germany, excluding the United Nations Convention on Contracts for the International Sale of Goods.",
                ).replace("terms.sections.24.24.1", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.24.24.2",
                  "24.2 Exclusive place of jurisdiction for all disputes arising out of or in connection with the Contract is Hanover, Germany.",
                ).replace("terms.sections.24.24.2", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.24.24.3",
                  "24.3 Place of performance is Hanover, Germany, unless otherwise agreed in text form.",
                ).replace("terms.sections.24.24.3", "")}
              </p>
            </LS>

            <LS n="25" title={tk("terms.sections.25.title", "Text Form, Language, and Amendments")}>
              <p>
                {tk(
                  "terms.sections.25.25.1",
                  "25.1 Amendments, supplements, and side agreements require text form. Email is sufficient unless a stricter form is required by mandatory law.",
                ).replace("terms.sections.25.25.1", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.25.25.2",
                  "25.2 If these Terms are provided in multiple languages, the English version shall prevail unless expressly agreed otherwise in text form.",
                ).replace("terms.sections.25.25.2", "")}
              </p>
            </LS>

            <LS n="26" title={tk("terms.sections.26.title", "Severability and Continuity")}>
              <p>
                {tk(
                  "terms.sections.26.26.1",
                  "26.1 If any provision is invalid or unenforceable, the remaining provisions remain effective.",
                ).replace("terms.sections.26.26.1", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.26.26.2",
                  "26.2 The parties shall replace the invalid provision with a valid provision that comes closest to the economic intent of the invalid provision.",
                ).replace("terms.sections.26.26.2", "")}
              </p>
            </LS>

            <LS n="27" title={tk("terms.sections.27.title", "Project-Specific Offer Documents")}>
              <p>
                {tk(
                  "terms.sections.27.27.1",
                  "27.1 For project-specific offers, order confirmations, and supply contracts of Deepvac GmbH, the individually referenced offer documents and the commercial and legal offer conditions contained therein shall take precedence over these General Terms and Conditions to the extent of any conflict.",
                ).replace("terms.sections.27.27.1", "")}
              </p>
              <p>
                {tk(
                  "terms.sections.27.27.2",
                  "27.2 To the extent that the relevant offer documents do not contain specific provisions, these General Terms and Conditions shall apply on a supplementary basis.",
                ).replace("terms.sections.27.27.2", "")}
              </p>
            </LS>
          </div>
        </Section>
      </PageShell>
    </Layout>
  );
}

function LS({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h2 className="text-sand text-base font-medium">
        {n}. {title}
      </h2>
      {children}
    </div>
  );
}
