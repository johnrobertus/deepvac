# Project Inquiry Form — Redesign Plan

## 1. Goal

Replace the current narrow "Engineering Inquiry" form on `/contact` (and `/de/kontakt`) with a clearer, conversion-oriented **Project Inquiry** form for general B2B leads (products, services, retrofit, testing, maintenance, early-stage projects). Keep the existing technical TVAC questionnaire as the dedicated path for detailed custom system specs.

## 2. Files Likely Affected

- `src/pages/Contact.tsx` — main form rewrite (structure, fields, submit payload, success view).
- `src/i18n/locales/en/contact.json` — new copy keys (form title/subtitle/sections/options/helper/buttons/success).
- `src/i18n/locales/de/contact.json` — mirrored DE copy.
- `src/i18n/locales/en/common.json` and `…/de/common.json` — possibly add validation strings if not already present (e.g. `areaOfInterestRequired`).
- `supabase/functions/send-inquiry/index.ts` — extend the short-form `InquiryPayload` to accept the new optional fields (`country`, `interests[]`, `projectStage`, `existingSystem`) and render them in the email. Existing fields (`firstName`, `lastName`, `email`, `company`, `phone`, `message`, `timeline`, `source`, honeypot, turnstile) are reused as-is.
- `src/components/questionnaire/QuestionnaireCTA.tsx` — kept; its existing `QuestionnaireCard` becomes the "Open technical questionnaire" anchor of the new decision helper. May need a small props extension or a new lightweight `FormSelectorCard` component if styling needs to differ.
- No DB schema changes required (`inquiry_logs` already stores only meta, not field payload).

## 3. Current Form Structure (observed)

`Contact.tsx` renders a single form with:

- First/Last name, Work email, Phone, Company, Project/Application (free text)
- Optional qualifier block: 3 dropdowns — Chamber Type, Application Area, Timeline
- Free-text Message
- Honeypot + Cloudflare Turnstile (invisible) + consent checkbox
- Submit calls `supabase.functions.invoke("send-inquiry", { body: { …, source: "contact-page" } })`
- Success state replaces the page section with a centered confirmation
- Sidebar: contact details card, ConsentMap, LinkedIn link
- Below: FAQ accordion

The existing edge function `send-inquiry` already handles: honeypot, rate-limit (5/10min, 20/day per IP), Turnstile verify, sanitization, validation (firstName/lastName/email/company required; min 10-char message), duplicate detection, Resend email to `info@deepvac.space`, and logs to `inquiry_logs`.

## 4. Proposed New Form Structure

Replace the qualifier dropdowns and the single project-application text input with three clearer sections, plus a decision helper above the form.

### 4.1 Decision Helper (above the form)

Compact 2-card or split panel inside an existing `bento-card` container:

- Heading: "Not sure which form to use?"
- Body: short explanation of when to use this short form vs. the technical questionnaire
- Two anchors:
  - "Continue with short inquiry" → smooth-scroll to `#project-inquiry-form`
  - "Open technical questionnaire" → `localizedPath("/tvac-questionnaire", lang)`

This replaces the current standalone `QuestionnaireCard` placement at the top of the form column. The existing `QuestionnaireCard` content can be either reused inside the helper or replaced by the new dual-CTA card.

### 4.2 Section 1 — Contact details

Two-column grid:

- First name * — text
- Last name * — text
- Work email * — email
- Company * — text
- Phone number — tel (optional)
- Country — text (optional, free input; no dropdown to keep it light)

### 4.3 Section 2 — Area of interest (checkboxes)

Section label: "What are you interested in?" with helper "Select one or more areas so we can route your request correctly." At least one selection required.

Three sub-groups, each rendered as a labelled column or grouped chip-set:

- **Products**: Standard TVAC Series · Custom TVAC System · Thermal Vision
- **Services**: Testing Services · Control Systems Design · Mechanical Design · Retrofit & Modernization · Maintenance & Repair · Subsystem Integration
- **Other**: Not sure yet · General consultation

UI: native `<input type="checkbox">` styled with `accent-blue` (matches the existing consent checkbox style) inside `bento-card`-style wrappers, no shadcn `Checkbox` needed for visual consistency.

### 4.4 Section 3 — Project context (all optional)

Three single-select dropdowns (reusing the existing `SelectField`) in a 3-col grid on desktop, stacked on mobile:

- Project stage: Early evaluation · Requirements already defined · Request for quotation · Existing system needs support · Upgrade or retrofit project · Not sure yet
- Expected timeline: Immediate · Within 3 months · 3 to 6 months · 6 to 12 months · Later · Not sure yet
- Existing system: No, new project · Yes, existing Deepvac system · Yes, existing third-party system · Not sure

### 4.5 Section 4 — Message (required)

Label: "Tell us briefly what you need". Textarea with the placeholder: *"Example: We are planning a chamber upgrade, need support with control system modernization, or are looking for TVAC testing capacity for a satellite component."* Required, min 10 chars (matches edge-function validation).

### 4.6 Submit area

- Consent checkbox (kept as-is)
- Honeypot + invisible Turnstile (kept as-is)
- Primary button: "Send Project Inquiry"
- Helper line beside button: "Your request will be reviewed by our technical team and routed to the right contact."

### 4.7 Success view

- Title: "Thank you. Your request has been received."
- Body: "We will review your project context and get back to you with the next suitable step. If your request requires detailed TVAC specifications, we may invite you to complete the technical questionnaire."
- Secondary button: "Submit another inquiry"
- Optional secondary link to the technical questionnaire.

## 5. Field Validation

Client-side (synchronous, in `validateForm`):

- `firstName`, `lastName`, `email`, `company`, `message` — required, trimmed
- `email` — regex `^[^\s@]+@[^\s@]+\.[^\s@]{2,}$`
- `message` — required, ≥ 10 chars (tightened from current "optional but ≥10 if present")
- `interests` — at least one selection across all three groups
- `consent` — must be checked (existing toast)
- `phone`, `country`, `projectStage`, `timeline`, `existingSystem` — optional, no validation
- Honeypot blocks submission silently (server already returns fake success)

Server-side: reuses existing sanitize/length limits and adds:

- `interests`: array of strings, each sanitized to ≤ 80 chars, max 12 items, optional but warned-only
- `country`, `projectStage`, `existingSystem`: sanitized strings ≤ 100 chars
- `message`: required ≥ 10 chars (already enforced)

## 6. Proposed Data Payload

Sent via `supabase.functions.invoke("send-inquiry", { body: … })`:

```json
{
  "firstName": "…",
  "lastName": "…",
  "email": "…",
  "company": "…",
  "phone": "…",
  "country": "…",
  "interests": ["Standard TVAC Series", "Retrofit & Modernization"],
  "projectStage": "Request for quotation",
  "timeline": "3 to 6 months",
  "existingSystem": "Yes, existing Deepvac system",
  "message": "…",
  "source": "contact-page-project-inquiry",
  "language": "en",
  "_website": "",
  "turnstileToken": "…"
}
```

The existing `InquiryPayload` interface is extended with the four new optional fields. The `chamberType` / `applicationArea` / `project` fields can remain accepted (backward-compat) but are no longer sent from the contact page; the homepage `ContactSection` and any other callers continue to work.

## 7. Email rendering (edge function)

Update the HTML builder in `send-inquiry` to add rows for `country`, `projectStage`, `existingSystem`, and a list block for `interests` (rendered as a comma-separated string or `<ul>`). Subject line becomes: `Project Inquiry — {company} ({firstName} {lastName})` when `source` starts with `contact-page-project-inquiry`; otherwise keep the current "Engineering Inquiry –" subject so other entry points (homepage form) are unchanged.

## 8. Proposed Copy

### 8.1 English (`contact.json` additions/changes)

- `formTitle`: "Tell us about your project"
- `formSubtitle`: "Whether you need a TVAC system, testing support, retrofit work, control design, mechanical engineering, or subsystem integration, send us a short overview. We will route your request to the right specialist."
- `decisionHelper.title`: "Not sure which form to use?"
- `decisionHelper.body`: "Use this short project inquiry form if you want to discuss products, services, an existing system, testing, retrofit work, maintenance, or an early-stage project. Use the technical questionnaire if you already want to specify a custom TVAC or space simulation system in detail."
- `decisionHelper.shortCta`: "Continue with short inquiry"
- `decisionHelper.questionnaireCta`: "Open technical questionnaire"
- `sections.contact`: "Contact details"
- `sections.interest.title`: "What are you interested in?"
- `sections.interest.helper`: "Select one or more areas so we can route your request correctly."
- `sections.interest.products`: "Products"
- `sections.interest.services`: "Services"
- `sections.interest.other`: "Other"
- `sections.context.title`: "Project context"
- `fields.country`: "Country"
- `fields.projectStage`: "Project stage"
- `fields.timeline`: "Expected timeline"
- `fields.existingSystem`: "Existing system"
- `fields.messageLabel`: "Tell us briefly what you need"
- `fields.messagePlaceholder`: see §4.5
- `interests.products`: ["Standard TVAC Series", "Custom TVAC System", "Thermal Vision"]
- `interests.services`: ["Testing Services", "Control Systems Design", "Mechanical Design", "Retrofit & Modernization", "Maintenance & Repair", "Subsystem Integration"]
- `interests.other`: ["Not sure yet", "General consultation"]
- `projectStageOptions`: ["Early evaluation", "Requirements already defined", "Request for quotation", "Existing system needs support", "Upgrade or retrofit project", "Not sure yet"]
- `timelineOptions`: ["Immediate", "Within 3 months", "3 to 6 months", "6 to 12 months", "Later", "Not sure yet"] (replaces current values)
- `existingSystemOptions`: ["No, new project", "Yes, existing Deepvac system", "Yes, existing third-party system", "Not sure"]
- `submit.button`: "Send Project Inquiry"
- `submit.helper`: "Your request will be reviewed by our technical team and routed to the right contact."
- `success.title`: "Thank you. Your request has been received."
- `success.body`: "We will review your project context and get back to you with the next suitable step. If your request requires detailed TVAC specifications, we may invite you to complete the technical questionnaire."
- `validation.interestRequired`: "Please select at least one area of interest."

### 8.2 German (mirror)

- `formTitle`: "Erzählen Sie uns von Ihrem Projekt"
- `formSubtitle`: "Ob Sie ein TVAC-System, Testunterstützung, Retrofit, Steuerungsdesign, mechanische Konstruktion oder Subsystemintegration benötigen — senden Sie uns einen kurzen Überblick. Wir leiten Ihre Anfrage an die zuständigen Spezialisten weiter."
- `decisionHelper.title`: "Nicht sicher, welches Formular passt?"
- `decisionHelper.body`: "Verwenden Sie dieses kurze Projektanfrageformular, wenn Sie Produkte, Services, ein bestehendes System, Tests, Retrofit-Arbeiten, Wartung oder ein Projekt in einer frühen Phase besprechen möchten. Verwenden Sie den technischen Fragebogen, wenn Sie bereits ein kundenspezifisches TVAC- oder Weltraumsimulationssystem detailliert spezifizieren möchten."
- `decisionHelper.shortCta`: "Mit Kurzanfrage fortfahren"
- `decisionHelper.questionnaireCta`: "Technischen Fragebogen öffnen"
- `sections.contact`: "Kontaktdaten"
- `sections.interest.title`: "Wofür interessieren Sie sich?"
- `sections.interest.helper`: "Wählen Sie einen oder mehrere Bereiche aus, damit wir Ihre Anfrage korrekt zuordnen können."
- `sections.interest.products`: "Produkte" · `services`: "Leistungen" · `other`: "Sonstiges"
- `sections.context.title`: "Projektkontext"
- `fields.country`: "Land" · `projectStage`: "Projektphase" · `timeline`: "Erwarteter Zeitrahmen" · `existingSystem`: "Bestehendes System"
- `fields.messageLabel`: "Beschreiben Sie kurz Ihren Bedarf"
- `fields.messagePlaceholder`: "Beispiel: Wir planen ein Kammer-Upgrade, benötigen Unterstützung bei der Modernisierung des Steuerungssystems oder suchen TVAC-Testkapazität für eine Satellitenkomponente."
- `interests.products`: ["Standard TVAC Serie", "Custom TVAC System", "Thermal Vision"]
- `interests.services`: ["Testleistungen", "Steuerungstechnik / Control Systems Design", "Mechanische Konstruktion", "Retrofit & Modernisierung", "Wartung & Reparatur", "Subsystemintegration"]
- `interests.other`: ["Noch nicht sicher", "Allgemeine Beratung"]
- `projectStageOptions`: ["Frühe Evaluierung", "Anforderungen bereits definiert", "Angebotsanfrage", "Bestehendes System benötigt Support", "Upgrade- oder Retrofit-Projekt", "Noch nicht sicher"]
- `timelineOptions`: ["Sofort", "Innerhalb von 3 Monaten", "3 bis 6 Monate", "6 bis 12 Monate", "Später", "Noch nicht sicher"]
- `existingSystemOptions`: ["Nein, neues Projekt", "Ja, bestehendes Deepvac-System", "Ja, bestehendes Drittanbieter-System", "Nicht sicher"]
- `submit.button`: "Projektanfrage senden"
- `submit.helper`: "Ihre Anfrage wird von unserem Fachteam geprüft und an den richtigen Ansprechpartner weitergeleitet."
- `success.title`: "Vielen Dank. Ihre Anfrage ist eingegangen."
- `success.body`: "Wir prüfen Ihren Projektkontext und melden uns mit dem nächsten geeigneten Schritt. Falls Ihre Anfrage detaillierte TVAC-Spezifikationen erfordert, laden wir Sie ggf. zur Bearbeitung des technischen Fragebogens ein."
- `validation.interestRequired`: "Bitte wählen Sie mindestens einen Interessenbereich aus."

## 9. Distinguishing Project Inquiry vs. Technical Questionnaire

- Visual: Project Inquiry stays as a single compact form on `/contact`. The questionnaire stays at `/tvac-questionnaire` (multi-step).
- The new decision helper above the form makes the choice explicit with two clearly labelled CTAs.
- Source field: contact-page sends `source: "contact-page-project-inquiry"`; questionnaire continues to send `kind: "questionnaire"`. This keeps email subjects, log analytics, and routing distinguishable.
- Success message of the short form explicitly mentions that detailed specs may be invited via the questionnaire — sets expectations without forcing the longer path.

## 10. Submission Flow Reuse

- Keep using `supabase.functions.invoke("send-inquiry", …)` — no new endpoint.
- Extend `InquiryPayload` (server) with `country?`, `interests?: string[]`, `projectStage?`, `existingSystem?`, `language?` and add corresponding sanitize calls + email rows.
- Honeypot, rate-limit, Turnstile, duplicate detection, and `inquiry_logs` writes remain unchanged.
- Subject-line conditional only for `source` starting with `contact-page-project-inquiry` to avoid affecting `homepage-contact` and other sources.

## 11. Risks and Edge Cases

- **Backward compatibility**: the homepage `ContactSection` still posts `chamberType`/`project`/etc. — keep those optional in the server type. Verified by inspection of `src/components/home/ContactSection.tsx`.
- `**interests` array length**: cap at 12 to prevent payload abuse; reject silently above limit.
- **Validation UX**: the "at least one interest" rule needs an inline error near the section header, not a toast, so the user sees where the missing field is.
- **DE long labels** (e.g. "Ja, bestehendes Drittanbieter-System") may overflow the dropdown on mobile — already mitigated by `mobile-ux` memory rules; ensure the select inherits `truncate`/wrap behaviour.
- **Turnstile reset on validation failure**: current code only resets on submission error; if the form is large enough that validation often fails first, the existing token may expire. Keep current behaviour; no change.
- **i18n key collisions**: avoid renaming `qualifiers.*` keys — leave them in place during migration so `Contact.tsx` doesn't briefly break, then remove unused keys at the end.
- **Email deliverability**: subject change is cosmetic; `from`/`reply_to` unchanged. No DNS impact.
- **Analytics / SEO**: page route `/contact` and `/de/kontakt` unchanged; no canonical or hreflang change required. SEO title/description not touched.

## 12. Phased Implementation Plan

**Phase 1 — Copy & data**

1. Add new keys to `en/contact.json` and `de/contact.json` (keep old keys temporarily).
2. No code changes yet — verify copy with the user if desired.

**Phase 2 — Server**
3. Extend `InquiryPayload` in `supabase/functions/send-inquiry/index.ts` with `country`, `interests`, `projectStage`, `existingSystem`, `language`.
4. Add sanitization, length/array limits, conditional subject line, and new email rows. Keep all existing fields optional.

**Phase 3 — Client form**
5. Refactor `Contact.tsx`:

- Update `FormData` interface and `initialForm`.
- Replace the `QuestionnaireCard` slot with a new decision-helper card.
- Build the three sections (contact / interests / context / message).
- Implement a small reusable `CheckboxGroup` inline (no new shadcn component required).
- Add `interests` validation with inline error.
- Update `handleSubmit` payload (`source: "contact-page-project-inquiry"`, `language: lang`, `interests: …`).
- Update success view title/body.

**Phase 4 — Cleanup & polish**
6. Remove unused `qualifiers.*` keys (chamberType / applicationArea select options that are now superseded) — only after confirming no other consumers.
7. Verify mobile layout (long DE labels, checkbox grid wrapping), keyboard navigation, and Turnstile invisible widget render.
8. Manual end-to-end submission test against the deployed `send-inquiry` function (preview environment).

**Phase 5 — Optional follow-ups (not in this change)**
9. Pre-select interest checkboxes via query params (e.g. `/contact?interest=retrofit`) so service pages can deep-link.
10. Add lightweight analytics events (form_view, form_submit, decision_helper_questionnaire_click).

---

Awaiting approval before implementation. No files will be modified until you confirm.  
Approved with the following refinements.

Please implement the Project Inquiry redesign according to your plan, but apply these changes:

1. Keep the decision helper compact. It should clarify the difference between the short Project Inquiry form and the technical questionnaire, but it must not visually overpower the form.

2. For the new contact-page-project-inquiry source, require at least one selected interest both client-side and server-side. For older sources, keep interests optional for backward compatibility.

3. Before modifying the send-inquiry edge function, inspect all existing callers of send-inquiry and preserve backward compatibility with their payloads.

4. Do not remove old i18n keys unless a project-wide search confirms that they are unused.

5. Consider whether an optional "Project or application name" field should remain. If it fits cleanly without adding friction, include it as optional. If it makes the form feel too long, omit it and rely on the message field.

6. Keep the form visually consistent with the existing Deepvac dark design, spacing, typography, bento-card style, Turnstile flow, consent checkbox, contact sidebar, map, LinkedIn card, and responsive layout.

7. Do not change the technical questionnaire route or its existing logic.

Proceed with implementation on the preview branch only.