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

            <LS n="1" title={t("terms.sections.1.title", { defaultValue: "Parties and Contact" })}>
              <p className="font-medium text-sand">
                1.1 {t("terms.sections.1.provider", { defaultValue: "Provider" })}
              </p>
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

              <p className="font-medium text-sand pt-4">
                1.2 {t("terms.sections.1.customer", { defaultValue: "Customer" })}
              </p>
              <p>
                {t("terms.sections.1.customerText", {
                  defaultValue:
                    "The contracting business customer as identified in the offer, Order, or order confirmation.",
                })}
              </p>
            </LS>

            <LS n="2" title={t("terms.sections.2.title", { defaultValue: "Definitions" })}>
              <p>
                {t("terms.sections.2.1", {
                  defaultValue: '2.1 "Deepvac" means Deepvac GmbH.',
                })}
              </p>
              <p>
                {t("terms.sections.2.2", {
                  defaultValue:
                    '2.2 "Customer" means the contracting party receiving Deliverables or Services from Deepvac.',
                })}
              </p>
              <p>
                {t("terms.sections.2.3", {
                  defaultValue:
                    '2.3 "Affiliate" means any entity that controls, is controlled by, or is under common control with a party. Control means holding, directly or indirectly, more than 50 percent of the voting rights or otherwise having the ability to direct management and policies.',
                })}
              </p>
              <p>
                {t("terms.sections.2.4", {
                  defaultValue:
                    '2.4 "Deliverables" means any hardware, parts, prototypes, assemblies, software, firmware, models, drawings, documentation, test plans, acceptance criteria, test reports, data, and other work results provided by Deepvac.',
                })}
              </p>
              <p>
                {t("terms.sections.2.5", {
                  defaultValue:
                    '2.5 "Services" means any testing services, engineering, design, development, consulting, integration, commissioning, training, maintenance, repair, and related activities performed by Deepvac.',
                })}
              </p>
              <p>
                {t("terms.sections.2.6", {
                  defaultValue:
                    '2.6 "Order" means the Customer\'s purchase order, acceptance of an offer, or other written instruction to proceed.',
                })}
              </p>
              <p>
                {t("terms.sections.2.7", {
                  defaultValue:
                    '2.7 "Contract" means the binding agreement formed under clause 4, including all documents listed in clause 5.',
                })}
              </p>
            </LS>

            <LS n="3" title={t("terms.sections.3.title", { defaultValue: "Scope and Applicability" })}>
              <p>
                {t("terms.sections.3.1", {
                  defaultValue:
                    "3.1 These General Terms and Conditions apply to all offers, Orders, Deliveries, Services, and Contracts with Deepvac.",
                })}
              </p>
              <p>
                {t("terms.sections.3.2", {
                  defaultValue:
                    "3.2 These Terms apply exclusively to entrepreneurs within the meaning of Section 14 German Civil Code, legal entities under public law, and special funds under public law. Contracts with consumers are excluded.",
                })}
              </p>
              <p>
                {t("terms.sections.3.3", {
                  defaultValue:
                    "3.3 The Customer's terms and conditions do not apply, even if Deepvac does not object, unless Deepvac expressly agrees to them in text form.",
                })}
              </p>
              <p>
                {t("terms.sections.3.4", {
                  defaultValue: "3.4 Individual agreements in text form take precedence over these Terms.",
                })}
              </p>
            </LS>

            <LS n="4" title={t("terms.sections.4.title", { defaultValue: "Formation of Contract" })}>
              <p>
                {t("terms.sections.4.1", {
                  defaultValue: "4.1 Offers are non-binding unless expressly stated as binding in text form.",
                })}
              </p>
              <p>
                {t("terms.sections.4.2", {
                  defaultValue:
                    "4.2 A Contract is concluded only when Deepvac issues an order confirmation in text form or begins performance.",
                })}
              </p>
              <p>
                {t("terms.sections.4.3", {
                  defaultValue: "4.3 Oral agreements are not binding unless confirmed by Deepvac in text form.",
                })}
              </p>
            </LS>

            <LS
              n="5"
              title={t("terms.sections.5.title", {
                defaultValue: "Contract Documents and Order of Precedence",
              })}
            >
              <p>
                {t("terms.sections.5.1intro", {
                  defaultValue: "5.1 The Contract consists of, in descending order of precedence:",
                })}
              </p>
              <ol className="list-[lower-alpha] pl-5 space-y-1">
                <li>{t("terms.sections.5.1a", { defaultValue: "Deepvac's order confirmation" })}</li>
                <li>{t("terms.sections.5.1b", { defaultValue: "Deepvac's offer and annexes" })}</li>
                <li>
                  {t("terms.sections.5.1c", {
                    defaultValue:
                      "Statement of work, specification, test plan, acceptance criteria, and any agreed change orders",
                  })}
                </li>
                <li>{t("terms.sections.5.1d", { defaultValue: "These Terms" })}</li>
                <li>
                  {t("terms.sections.5.1e", {
                    defaultValue: "Any other documents expressly incorporated by reference in text form",
                  })}
                </li>
              </ol>
              <p>
                {t("terms.sections.5.2", {
                  defaultValue:
                    "5.2 Marketing statements, website content, brochures, and general technical descriptions are non-binding unless explicitly agreed as guaranteed characteristics in text form.",
                })}
              </p>
            </LS>

            <LS n="6" title={t("terms.sections.6.title", { defaultValue: "Scope of Performance" })}>
              <p>
                {t("terms.sections.6.1", {
                  defaultValue:
                    "6.1 Deepvac shall provide Deliverables and Services only as expressly agreed in the Contract documents.",
                })}
              </p>
              <p>
                {t("terms.sections.6.2", {
                  defaultValue:
                    "6.2 Deepvac may use qualified subcontractors. Deepvac remains responsible for its contractual obligations.",
                })}
              </p>
              <p>
                {t("terms.sections.6.3", {
                  defaultValue:
                    "6.3 Unless expressly agreed, Deepvac does not owe regulatory approvals, certification outcomes, conformity assessments, or fitness for any specific purpose beyond the agreed specification.",
                })}
              </p>
              <p>
                {t("terms.sections.6.4", {
                  defaultValue:
                    "6.4 Deepvac may implement reasonable minor changes in design, components, or process if they do not materially impair the contractual purpose and are objectively reasonable for the Customer.",
                })}
              </p>
            </LS>

            <LS n="7" title={t("terms.sections.7.title", { defaultValue: "Change Requests" })}>
              <p>
                {t("terms.sections.7.1", {
                  defaultValue:
                    "7.1 Any change to scope, parameters, schedule, acceptance criteria, interfaces, documentation, or Deliverables requires a change order in text form.",
                })}
              </p>
              <p>
                {t("terms.sections.7.2", {
                  defaultValue:
                    "7.2 Deepvac will provide a change proposal including impact on price, schedule, and technical feasibility. Changes become binding only upon acceptance by both parties in text form.",
                })}
              </p>
              <p>
                {t("terms.sections.7.3", {
                  defaultValue:
                    "7.3 If the Customer requests work before a change order is agreed, such work is performed on a time and materials basis and does not imply acceptance of a fixed price or deadline.",
                })}
              </p>
            </LS>

            <LS n="8" title={t("terms.sections.8.title", { defaultValue: "Customer Cooperation Duties" })}>
              <p>
                {t("terms.sections.8.1", {
                  defaultValue:
                    "8.1 The Customer shall provide all information, decisions, access, samples, drawings, specifications, and materials required for performance in a timely manner and free of charge to Deepvac.",
                })}
              </p>
              <p>
                {t("terms.sections.8.2", {
                  defaultValue:
                    "8.2 The Customer warrants that any items, materials, and instructions provided are safe, suitable, and compliant with applicable laws and regulations.",
                })}
              </p>
              <p>
                {t("terms.sections.8.3", {
                  defaultValue:
                    "8.3 The Customer warrants that its data, materials, and instructions do not infringe third party rights. The Customer shall indemnify Deepvac against third party claims arising from such infringement, except to the extent caused by Deepvac.",
                })}
              </p>
              <p>
                {t("terms.sections.8.4", {
                  defaultValue:
                    "8.4 If Customer cooperation is delayed or incomplete, Deepvac is entitled to extend deadlines and invoice additional effort and costs.",
                })}
              </p>
            </LS>

            <LS n="9" title={t("terms.sections.9.title", { defaultValue: "Testing Services Specific Terms" })}>
              <p>
                {t("terms.sections.9.1", {
                  defaultValue:
                    "9.1 Testing shall be performed according to the agreed test plan. If no test plan is agreed, testing shall be performed according to Deepvac's standard procedures appropriate to the assignment.",
                })}
              </p>
              <p>
                {t("terms.sections.9.2", {
                  defaultValue:
                    "9.2 The Customer remains solely responsible for the design, intended use, safety, legal conformity, and regulatory compliance of the test item.",
                })}
              </p>
              <p>
                {t("terms.sections.9.3", {
                  defaultValue:
                    "9.3 Test results are valid only for the tested configuration and boundary conditions documented in the test report. Any extrapolation is at the Customer's risk.",
                })}
              </p>
              <p>
                {t("terms.sections.9.4", {
                  defaultValue:
                    "9.4 Measurement uncertainty, tolerances, and limitations are as stated in the test documentation or otherwise customary for the methods used.",
                })}
              </p>
              <p>
                {t("terms.sections.9.5", {
                  defaultValue:
                    "9.5 Deepvac may suspend or refuse testing if the test item presents a safety risk, lacks required documentation, or violates applicable rules. The Customer bears resulting costs.",
                })}
              </p>
              <p>
                {t("terms.sections.9.6", {
                  defaultValue:
                    "9.6 After completion of testing or Services, Deepvac will make the test item available for collection or shipment as agreed. Unless otherwise agreed, return shipment is at the Customer's cost and risk.",
                })}
              </p>
              <p>
                {t("terms.sections.9.7", {
                  defaultValue:
                    "9.7 Deepvac will store test items free of charge for up to thirty calendar days after notifying the Customer of completion or readiness for return, whichever occurs first.",
                })}
              </p>
              <p>
                {t("terms.sections.9.8", {
                  defaultValue:
                    "9.8 After the free storage period, Deepvac may charge reasonable storage fees. If the Customer does not arrange collection or shipment within a reasonable additional period after a written reminder, Deepvac may, where legally permissible, dispose of the test item at the Customer's expense. Where practicable, Deepvac will inform the Customer in advance.",
                })}
              </p>
              <p>
                {t("terms.sections.9.9", {
                  defaultValue:
                    "9.9 The Customer remains responsible for ensuring that test items are free of hazardous substances unless explicitly declared and agreed in text form. If hazardous materials are involved, the Customer shall provide complete safety data sheets and handling instructions prior to delivery.",
                })}
              </p>
            </LS>

            <LS n="10" title={t("terms.sections.10.title", { defaultValue: "Prices, Taxes, and Payment" })}>
              <p>
                {t("terms.sections.10.1", {
                  defaultValue:
                    "10.1 Prices are net prices plus applicable VAT and any other applicable taxes, duties, customs, or fees unless expressly included.",
                })}
              </p>
              <p>
                {t("terms.sections.10.2", {
                  defaultValue:
                    "10.2 Unless otherwise agreed, invoices are payable within fourteen calendar days from the invoice date without deduction.",
                })}
              </p>
              <p>
                {t("terms.sections.10.3", {
                  defaultValue:
                    "10.3 Deepvac may require advance payment, milestone payments, or security, especially for custom developments, prototypes, or high-value Orders.",
                })}
              </p>
              <p>
                {t("terms.sections.10.4", {
                  defaultValue:
                    "10.4 The Customer may set off only undisputed or finally adjudicated claims. Rights of retention apply only to claims arising from the same Contract.",
                })}
              </p>
              <p>
                {t("terms.sections.10.5", {
                  defaultValue:
                    "10.5 In case of late payment, statutory default interest under German law applies. Deepvac may charge reasonable reminder and collection costs as permitted by law.",
                })}
              </p>
            </LS>

            <LS
              n="11"
              title={t("terms.sections.11.title", {
                defaultValue: "Delivery, Deadlines, and Force Majeure",
              })}
            >
              <p>
                {t("terms.sections.11.1", {
                  defaultValue:
                    "11.1 Dates and deadlines are non-binding unless expressly agreed as binding in text form.",
                })}
              </p>
              <p>
                {t("terms.sections.11.1a", {
                  defaultValue:
                    "11.1a Contractual penalties, liquidated damages, or similar delay sanctions apply only if expressly agreed in text form in the respective order confirmation.",
                })}
              </p>
              <p>
                {t("terms.sections.11.2", {
                  defaultValue:
                    "11.2 Delivery and performance periods start only after order confirmation, receipt of any agreed advance payment, and receipt of all Customer cooperation items required to start performance.",
                })}
              </p>
              <p>
                {t("terms.sections.11.3", {
                  defaultValue:
                    "11.3 Force majeure includes events beyond Deepvac's reasonable control, including supply chain disruptions, transportation disruptions, governmental measures, export restrictions, sanctions, labor disputes, power failures, cyber incidents not caused by Deepvac, pandemics, and natural events. In such cases, obligations are suspended for the duration, and deadlines extend accordingly.",
                })}
              </p>
              <p>
                {t("terms.sections.11.4", {
                  defaultValue:
                    "11.4 Deepvac may perform partial deliveries and partial Services if reasonable for the Customer.",
                })}
              </p>
            </LS>

            <LS
              n="12"
              title={t("terms.sections.12.title", {
                defaultValue: "Shipping, Risk Transfer, and Packaging",
              })}
            >
              <p>
                {t("terms.sections.12.1", {
                  defaultValue:
                    "12.1 Unless otherwise agreed, delivery is EXW Deepvac's business address (Incoterms 2020). Risk transfers upon provision for collection or handover to the carrier, whichever occurs first.",
                })}
              </p>
              <p>
                {t("terms.sections.12.2", {
                  defaultValue:
                    "12.2 The Customer bears transport, insurance, customs, export, and import costs unless otherwise agreed.",
                })}
              </p>
              <p>
                {t("terms.sections.12.3", {
                  defaultValue:
                    "12.3 Packaging is charged at cost unless otherwise agreed. Returnable packaging is accepted only by prior agreement in text form.",
                })}
              </p>
            </LS>

            <LS n="13" title={t("terms.sections.13.title", { defaultValue: "Acceptance of Deliverables" })}>
              <p>
                {t("terms.sections.13.1", {
                  defaultValue:
                    "13.1 If acceptance is agreed or legally required, acceptance criteria and procedure shall be defined in text form.",
                })}
              </p>
              <p>
                {t("terms.sections.13.2intro", {
                  defaultValue:
                    "13.2 If no acceptance procedure is agreed, acceptance occurs when Deepvac has notified the Customer in text form that the Deliverables are ready for acceptance and, in that notice, has informed the Customer of the acceptance mechanism under this clause 13.2, and then:",
                })}
              </p>
              <ol className="list-[lower-alpha] pl-5 space-y-1">
                <li>
                  {t("terms.sections.13.2a", {
                    defaultValue: "the Customer confirms acceptance in text form, or",
                  })}
                </li>
                <li>
                  {t("terms.sections.13.2b", {
                    defaultValue: "the Customer uses the Deliverables productively, or",
                  })}
                </li>
                <li>
                  {t("terms.sections.13.2c", {
                    defaultValue:
                      "fourteen calendar days pass after such notice and the Customer has not provided a notice of material defects in text form.",
                  })}
                </li>
              </ol>
              <p>
                {t("terms.sections.13.3", {
                  defaultValue:
                    "13.3 Minor defects that do not materially impair the contractual use do not prevent acceptance.",
                })}
              </p>
              <p>
                {t("terms.sections.13.4", {
                  defaultValue:
                    "13.4 The Customer shall test and inspect Deliverables promptly within a reasonable period, taking into account the complexity of the Deliverables and the intended use.",
                })}
              </p>
            </LS>

            <LS n="14" title={t("terms.sections.14.title", { defaultValue: "Retention of Title" })}>
              <p>
                {t("terms.sections.14.1", {
                  defaultValue:
                    "14.1 Delivered goods remain the property of Deepvac until full payment of all present and future claims arising from the business relationship.",
                })}
              </p>
              <p>
                {t("terms.sections.14.2", {
                  defaultValue: "14.2 The Customer shall handle retained goods with care and insure them adequately.",
                })}
              </p>
              <p>
                {t("terms.sections.14.3", {
                  defaultValue:
                    "14.3 The Customer may resell goods in the ordinary course of business. The Customer assigns to Deepvac, as security, all claims arising from such resale up to the amount of Deepvac's outstanding claims. Deepvac accepts this assignment.",
                })}
              </p>
            </LS>

            <LS n="15" title={t("terms.sections.15.title", { defaultValue: "Warranty and Defect Claims" })}>
              <p>
                {t("terms.sections.15.1", {
                  defaultValue:
                    "15.1 The Customer shall inspect Deliverables without undue delay and notify defects in text form. Apparent defects must be notified within fourteen calendar days after delivery or completion. Hidden defects must be notified without undue delay and in any case within fourteen calendar days after discovery.",
                })}
              </p>
              <p>
                {t("terms.sections.15.2", {
                  defaultValue:
                    "15.2 In case of justified defects, Deepvac shall, at its discretion, repair or replace the defective Deliverable or re-perform the defective Service.",
                })}
              </p>
              <p>
                {t("terms.sections.15.3", {
                  defaultValue:
                    "15.3 The limitation period for defect claims is twelve months from delivery or completion, unless mandatory law requires longer periods.",
                })}
              </p>
              <p>
                {t("terms.sections.15.4", {
                  defaultValue:
                    "15.4 No defect claim exists for insignificant deviations, normal wear and tear, defects caused by improper use, unauthorized modification, installation errors by the Customer or third parties, unsuitable operating conditions, or external influences beyond Deepvac's control.",
                })}
              </p>
              <p>
                {t("terms.sections.15.5", {
                  defaultValue:
                    "15.5 If the Customer or third parties perform remedial actions without Deepvac's prior consent, defect claims are excluded unless the Customer proves that such actions did not cause or aggravate the defect.",
                })}
              </p>
            </LS>

            <LS n="16" title={t("terms.sections.16.title", { defaultValue: "Liability" })}>
              <p>
                {t("terms.sections.16.1", {
                  defaultValue:
                    "16.1 Deepvac is liable without limitation for intent, gross negligence, and injury to life, body, or health.",
                })}
              </p>
              <p>
                {t("terms.sections.16.2", {
                  defaultValue:
                    "16.2 In case of slight negligence, Deepvac is liable only for breach of essential contractual obligations. Essential contractual obligations are obligations whose fulfilment is necessary to achieve the purpose of the Contract and on whose compliance the Customer may regularly rely.",
                })}
              </p>
              <p>
                {t("terms.sections.16.3", {
                  defaultValue:
                    "16.3 In the case of clause 16.2, liability is limited to the foreseeable, typically occurring damage at the time of Contract conclusion.",
                })}
              </p>
              <p>
                {t("terms.sections.16.4", {
                  defaultValue:
                    "16.4 To the extent permitted by law, Deepvac is not liable for indirect or consequential damages, including loss of profit, loss of revenue, business interruption, production downtime, loss of use, and third party claims.",
                })}
              </p>
              <p>
                {t("terms.sections.16.4a", {
                  defaultValue:
                    "16.4a To the extent liability for loss of data applies, Deepvac's liability is limited to the typical recovery effort that would have been required if the Customer had performed regular and appropriate data backups.",
                })}
              </p>
              <p>
                {t("terms.sections.16.5", {
                  defaultValue:
                    "16.5 Unless mandatory law provides otherwise, total aggregate liability for claims based on slight negligence is limited to the net Contract value of the respective Order.",
                })}
              </p>
              <p>
                {t("terms.sections.16.6", {
                  defaultValue: "16.6 Mandatory liability under applicable product liability law remains unaffected.",
                })}
              </p>
            </LS>

            <LS
              n="17"
              title={t("terms.sections.17.title", {
                defaultValue: "Intellectual Property and Rights of Use",
              })}
            >
              <p>
                {t("terms.sections.17.1", {
                  defaultValue:
                    "17.1 All intellectual property rights, know-how, methods, tools, templates, libraries, algorithms, models, and pre-existing software or documentation of Deepvac remain with Deepvac.",
                })}
              </p>
              <p>
                {t("terms.sections.17.2", {
                  defaultValue:
                    "17.2 Unless expressly agreed otherwise, Deliverables created under the Contract grant the Customer a non-exclusive, non-transferable, non-sublicensable right to use the Deliverables solely for the Customer's internal purposes and only to the extent necessary for the contractual purpose.",
                })}
              </p>
              <p>
                {t("terms.sections.17.3", {
                  defaultValue:
                    "17.3 Source code, CAD source files, training data, model weights, and development repositories are not owed unless expressly agreed in text form.",
                })}
              </p>
              <p>
                {t("terms.sections.17.4", {
                  defaultValue:
                    "17.4 The Customer shall not remove proprietary notices and shall not reverse engineer, decompile, or disassemble software or firmware except where mandatory law permits it.",
                })}
              </p>
              <p>
                {t("terms.sections.17.5", {
                  defaultValue:
                    "17.5 Unless expressly agreed otherwise, the Customer may use test reports and test data delivered under the Contract for the Customer's internal purposes to the extent necessary for the contractual purpose.",
                })}
              </p>
              <p>
                {t("terms.sections.17.6", {
                  defaultValue:
                    "17.6 Deepvac retains all rights in its measurement methods, test procedures, setups, tooling, templates, know-how, and underlying evaluation logic, even if reflected in reports or data.",
                })}
              </p>
              <p>
                {t("terms.sections.17.7", {
                  defaultValue:
                    "17.7 Any use of anonymized or aggregated results by Deepvac for benchmarking, quality management, marketing references, case studies, or statistics requires the Customer's prior written consent in each individual case. Without such consent, Deepvac will not use Customer-related test results outside contract performance.",
                })}
              </p>
              <p>
                {t("terms.sections.17.8", {
                  defaultValue:
                    "17.8 Raw measurement data formats, intermediate datasets, and internal system logs are provided only if expressly agreed in text form.",
                })}
              </p>
            </LS>

            <LS n="18" title={t("terms.sections.18.title", { defaultValue: "Confidentiality" })}>
              <p>
                {t("terms.sections.18.1", {
                  defaultValue:
                    "18.1 Each party shall keep confidential all non-public technical, commercial, and operational information received from the other party and shall use it only for the contractual purpose.",
                })}
              </p>
              <p>
                {t("terms.sections.18.2", {
                  defaultValue:
                    "18.2 Confidential information may be disclosed only to employees and subcontractors on a need-to-know basis and under confidentiality obligations at least as protective as those herein.",
                })}
              </p>
              <p>
                {t("terms.sections.18.3intro", {
                  defaultValue: "18.3 Confidentiality does not apply to information that is:",
                })}
              </p>
              <ol className="list-[lower-alpha] pl-5 space-y-1">
                <li>{t("terms.sections.18.3a", { defaultValue: "publicly known without breach, or" })}</li>
                <li>
                  {t("terms.sections.18.3b", {
                    defaultValue: "lawfully obtained from a third party without confidentiality obligations, or",
                  })}
                </li>
                <li>
                  {t("terms.sections.18.3c", {
                    defaultValue:
                      "independently developed without use of the other party's confidential information, or",
                  })}
                </li>
                <li>
                  {t("terms.sections.18.3d", {
                    defaultValue:
                      "required to be disclosed by law or court order. If disclosure is required and legally permissible, the disclosing party shall notify the other party in advance.",
                  })}
                </li>
              </ol>
              <p>
                {t("terms.sections.18.4", {
                  defaultValue:
                    "18.4 The confidentiality obligation continues for five years after termination of the Contract. Trade secrets remain protected for as long as they qualify as trade secrets under applicable law.",
                })}
              </p>
            </LS>

            <LS n="19" title={t("terms.sections.19.title", { defaultValue: "Data Protection" })}>
              <p>
                {t("terms.sections.19.1", {
                  defaultValue:
                    "19.1 Each party shall comply with applicable data protection laws, including the GDPR where applicable.",
                })}
              </p>
              <p>
                {t("terms.sections.19.2", {
                  defaultValue:
                    "19.2 If Deepvac processes personal data on behalf of the Customer, the parties shall conclude a data processing agreement pursuant to Art. 28 GDPR before processing begins.",
                })}
              </p>
            </LS>

            <LS n="20" title={t("terms.sections.20.title", { defaultValue: "Export Control and Sanctions" })}>
              <p>
                {t("terms.sections.20.1", {
                  defaultValue:
                    "20.1 Performance may be subject to export control laws, sanctions, and embargoes. The Customer shall provide all information required to assess compliance, including end use and end user information upon request.",
                })}
              </p>
              <p>
                {t("terms.sections.20.2", {
                  defaultValue:
                    "20.2 Deepvac may suspend or refuse performance if it would violate applicable export control or sanctions regulations.",
                })}
              </p>
              <p>
                {t("terms.sections.20.3", {
                  defaultValue:
                    "20.3 The Customer warrants that it will not use Deliverables for prohibited end uses and will comply with applicable re-export requirements.",
                })}
              </p>
            </LS>

            <LS n="21" title={t("terms.sections.21.title", { defaultValue: "Compliance and Safety" })}>
              <p>
                {t("terms.sections.21.1", {
                  defaultValue:
                    "21.1 The Customer shall comply with all applicable safety regulations and follow Deepvac's safety instructions on Deepvac premises and when using Deepvac equipment.",
                })}
              </p>
              <p>
                {t("terms.sections.21.2", {
                  defaultValue:
                    "21.2 If the Customer provides hazardous materials, the Customer shall provide complete safety data sheets and handling instructions in advance.",
                })}
              </p>
              <p>
                {t("terms.sections.21.3", {
                  defaultValue:
                    "21.3 The Customer shall ensure that any personnel visiting Deepvac facilities are properly instructed and equipped in accordance with applicable safety rules.",
                })}
              </p>
            </LS>

            <LS
              n="22"
              title={t("terms.sections.22.title", {
                defaultValue: "Suspension, Termination, and Cancellation",
              })}
            >
              <p>
                {t("terms.sections.22.1", {
                  defaultValue:
                    "22.1 Deepvac may suspend performance if the Customer is in default of payment or materially breaches cooperation duties, after a reasonable notice period.",
                })}
              </p>
              <p>
                {t("terms.sections.22.2intro", {
                  defaultValue:
                    "22.2 If the Customer cancels an Order after Contract conclusion, Deepvac is entitled to invoice:",
                })}
              </p>
              <ol className="list-[lower-alpha] pl-5 space-y-1">
                <li>{t("terms.sections.22.2a", { defaultValue: "all Services performed and costs incurred, and" })}</li>
                <li>
                  {t("terms.sections.22.2b", {
                    defaultValue: "all committed third party costs and non-cancelable procurement, and",
                  })}
                </li>
                <li>
                  {t("terms.sections.22.2c", {
                    defaultValue:
                      "a reasonable cancellation fee reflecting the lost contribution margin, unless the Customer proves that Deepvac suffered no or lower loss.",
                  })}
                </li>
              </ol>
              <p>
                {t("terms.sections.22.3", {
                  defaultValue: "22.3 Statutory rights to terminate for cause remain unaffected.",
                })}
              </p>
            </LS>

            <LS n="23" title={t("terms.sections.23.title", { defaultValue: "Assignment" })}>
              <p>
                {t("terms.sections.23.1", {
                  defaultValue:
                    "23.1 The Customer may not assign rights or obligations under the Contract without Deepvac's prior written consent.",
                })}
              </p>
              <p>
                {t("terms.sections.23.2", {
                  defaultValue:
                    "23.2 Deepvac may assign monetary claims to third parties for financing or factoring purposes.",
                })}
              </p>
            </LS>

            <LS
              n="24"
              title={t("terms.sections.24.title", {
                defaultValue: "Governing Law, Jurisdiction, and Place of Performance",
              })}
            >
              <p>
                {t("terms.sections.24.1", {
                  defaultValue:
                    "24.1 The Contract is governed by the laws of the Federal Republic of Germany, excluding the United Nations Convention on Contracts for the International Sale of Goods.",
                })}
              </p>
              <p>
                {t("terms.sections.24.2", {
                  defaultValue:
                    "24.2 Exclusive place of jurisdiction for all disputes arising out of or in connection with the Contract is Hanover, Germany.",
                })}
              </p>
              <p>
                {t("terms.sections.24.3", {
                  defaultValue: "24.3 Place of performance is Hanover, Germany, unless otherwise agreed in text form.",
                })}
              </p>
            </LS>

            <LS
              n="25"
              title={t("terms.sections.25.title", {
                defaultValue: "Text Form, Language, and Amendments",
              })}
            >
              <p>
                {t("terms.sections.25.1", {
                  defaultValue:
                    "25.1 Amendments, supplements, and side agreements require text form. Email is sufficient unless a stricter form is required by mandatory law.",
                })}
              </p>
              <p>
                {t("terms.sections.25.2", {
                  defaultValue:
                    "25.2 If these Terms are provided in multiple languages, the English version shall prevail unless expressly agreed otherwise in text form.",
                })}
              </p>
            </LS>

            <LS n="26" title={t("terms.sections.26.title", { defaultValue: "Severability and Continuity" })}>
              <p>
                {t("terms.sections.26.1", {
                  defaultValue:
                    "26.1 If any provision is invalid or unenforceable, the remaining provisions remain effective.",
                })}
              </p>
              <p>
                {t("terms.sections.26.2", {
                  defaultValue:
                    "26.2 The parties shall replace the invalid provision with a valid provision that comes closest to the economic intent of the invalid provision.",
                })}
              </p>
            </LS>

            <LS
              n="27"
              title={t("terms.sections.27.title", {
                defaultValue: "Project-Specific Offer Documents",
              })}
            >
              <p>
                {t("terms.sections.27.1", {
                  defaultValue:
                    "27.1 For project-specific offers, order confirmations, and supply contracts of Deepvac GmbH, the individually referenced offer documents and the commercial and legal offer conditions contained therein shall take precedence over these General Terms and Conditions to the extent of any conflict.",
                })}
              </p>
              <p>
                {t("terms.sections.27.2", {
                  defaultValue:
                    "27.2 To the extent that the relevant offer documents do not contain specific provisions, these General Terms and Conditions shall apply on a supplementary basis.",
                })}
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
