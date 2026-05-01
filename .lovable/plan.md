# TVAC Questionnaire — Frontend Wizard (Phase 1)

Build the bilingual 5-step TVAC questionnaire as a dedicated page. Backend submission is **stubbed** with a clear TODO in this phase; final wiring to `send-inquiry` lands in the follow-up backend prompt. The existing short contact form on `/contact` and `/de/kontakt` is **not modified**.

Source of truth: attached `Q11-4.html` — every field, option, and the dynamic shape→dimensions logic is ported verbatim.

## Routes

- EN: `/tvac-questionnaire`
- DE: `/de/tvac-fragebogen`

Both routes render one shared component `TvacQuestionnaire.tsx` that adapts via `useLanguage()` and `useTranslation("questionnaire")`.

## Files

**New**
- `src/pages/TvacQuestionnaire.tsx` — the full wizard (single self-contained file, ~700 lines, mirrors `Contact.tsx` patterns).
- `src/i18n/locales/en/questionnaire.json` — all labels, options, helper text, buttons (~280 keys).
- `src/i18n/locales/de/questionnaire.json` — DE mirror, 1:1.

**Edited (additive only)**
- `src/lib/routes.ts` — append one entry: `{ en: "/tvac-questionnaire", de: "/de/tvac-fragebogen" }`.
- `src/App.tsx` — add two `<Route>` lines (EN + DE) and one import.
- `src/i18n/index.ts` — add `questionnaire` namespace import + register in both `en` and `de` resources.
- `src/i18n/locales/en/seo.json` and `src/i18n/locales/de/seo.json` — add a `questionnaire` block with title + description for `<Helmet>`.

**Untouched (explicit)**
- `src/pages/Contact.tsx` — short form unchanged.
- `supabase/functions/send-inquiry/*` — not modified in this phase.
- `tailwind.config.ts`, `src/index.css` design tokens, `Layout`, `PageShell`, `Footer`, `Navigation`, all other pages.
- `.github/workflows/*`, deployment config, sitemap scripts.

## Page structure

Built with the existing `Layout` + `PageShell` + `PageHero` so it inherits the dark Deepvac CI exactly.

```
Layout
└─ PageShell
   ├─ Helmet (title, description, canonical, hreflang, lang attr, robots="noindex,follow")
   ├─ PageHero
   │   eyebrow:    "Detailed technical inquiry" / "Detaillierte technische Anfrage"
   │   title:      "TVAC system questionnaire" / "TVAC-System-Fragebogen"
   │   description: short paragraph
   │   children:   small meta row → estimated time + "leave blank if open" reassurance
   └─ Section
       ├─ StepIndicator (5 dots + labels; collapses to "Step 2 of 5 — DUT & chamber" on mobile)
       ├─ <form onSubmit={handleSubmit}>
       │   ├─ Per-step note: "You can leave fields blank if specifications are still open."
       │   ├─ Active step content (Step1Contact … Step5SiteSchedule)
       │   ├─ GDPR consent checkbox (visible from step 5; required to submit)
       │   ├─ Honeypot (hidden) + Turnstile container — placeholders, identical pattern to Contact.tsx
       │   └─ Sticky wizard footer
       │        ┌─ "Reset all fields" (ghost, de-emphasized, opens AlertDialog confirm)
       │        └─ Right side: [Back] [Continue]   on step 5: [Back] [Send questionnaire]
       └─ (no PDF/print primary action — out of scope per requirements)
```

## Step grouping (per requirements)

| Step | Title (EN)              | Source sections from Q11-4.html |
|------|-------------------------|---------------------------------|
| 1    | Contact                 | Section 1                       |
| 2    | DUT & chamber           | Sections 2 + 3                  |
| 3    | Thermal & vacuum        | Section 4                       |
| 4    | Interfaces & control    | Sections 5 + 6 + 7              |
| 5    | Site & schedule         | Sections 8 + 9 + consent + submit |

## Fields ported (every field from the source)

All fields from sections 1–9 are reproduced. Required fields: `company`, `firstName`, `lastName`, `email`, `consent`. Every technical field is optional and accepts blank.

Field types reproduced:
- Text / number / email / tel inputs
- Single-select dropdowns
- Checkbox groups (flat and vertical)
- **Nested checkboxes** for "Turbomolecular pump → Maglev / Mechanical"
- **Checkbox + "Other:" text input** pattern (used in DUT type, housing, viewport material, plate cooling, shroud cooling, sensor type, connectors, RF, fiber, motion, install env, power)
- Textareas
- **Port rows** (5 rows: KF, ISO-K/F, CF, DN, Custom — each with checkbox + Size/standard text + Qty number)
- **Fluid/gas grid** (qty + connection type/standard)

## Dynamic logic (ported verbatim from the script in `Q11-4.html`)

Two constants defined inside the page module, identical to the source:

```ts
const thermalPlateDimensionsByShape = {
  cubic:       ['380 × 350','480 × 450','610 × 580','780 × 750','980 × 940','1120 × 1120'],
  cylindrical: ['330 × 350','400 × 420','460 × 500','660 × 700','840 × 880','1140 × 1200'],
};
const externalDimensionsByShape = {
  cubic:       ['600 × 1800 × 900','700 × 1900 × 1000','830 × 1900 × 1130','1000 × 1900 × 1300','1150 × 1900 × 1500','1400 × 2100 × 1760'],
  cylindrical: ['600 × 1800 × 900','700 × 1900 × 1000','900 × 1900 × 1130','1100 × 1900 × 1300','1400 × 1900 × 1500','1700 × 2100 × 1860'],
};
```

Behavior wired through plain React state (no react-hook-form, to match `Contact.tsx`):

- `chamberShape` empty → External dimensions select is disabled with placeholder "Select option".
- `chamberShape = "cubic"` → External select offers cubic list + `Other`; thermal plate select offers cubic plate list + `Other`.
- `chamberShape = "cylindrical"` → cylindrical lists offered.
- `externalDimensions = "Other"` → reveals the matching custom-dimension block: cubic shows L/W/H inputs; cylindrical shows D/L inputs.
- `thermalPlateDimensions = "Other"` → reveals a free-text "Custom plate dimensions" input.
- Changing `chamberShape` after a value was picked clears any incompatible value while preserving still-valid ones (mirrors the source script's `[...select.options].some(...)` guard).

## State shape (single typed object)

One flat object held in `useState`, similar to Contact.tsx but larger. Keys named to mirror the questionnaire (e.g. `dutTypes: string[]`, `dutTypeOther: string`, `dutTypeOtherChecked: boolean`, `ports: { kf: { checked, size, qty }, iso: {...}, … }`). Per-step `setField(name)(value)` setter to keep handlers terse.

## UX rules (enforced)

- **Not a modal** — full page.
- **Not embedded into Custom TVAC** — secondary CTA from Custom TVAC will be added in a later prompt.
- **Enter does not advance** — form `onKeyDown` intercepts `Enter` outside `<textarea>` and prevents default; only the explicit Back/Continue/Submit buttons navigate. Submit happens only when the explicit submit button on step 5 is pressed.
- **Back/Continue only** — step transitions are gated by button clicks; no auto-validation between technical steps (only step-5 submit validates the required contact fields + consent).
- **Mobile responsive** — single-column layout below `md`, two columns above where the source uses two; step indicator collapses to a compact "Step N of 5 — {label}" line on mobile.
- **Per-step note** — small muted line under each step heading: "You can leave fields blank if specifications are still open."
- **Reset all fields** — visually de-emphasized ghost button; click opens shadcn `AlertDialog` confirming destructive intent; on confirm, state is reset to `initialForm` and the wizard returns to step 1.
- **PDF export not the main action** — entirely omitted from this page in Phase 1.
- **Submit only on step 5** — Continue button on steps 1–4 advances; on step 5 the primary button becomes "Send questionnaire".

## Styling

- All inputs/selects/textareas reuse the exact class string from `Contact.tsx`:
  `bg-background border border-gray/15 rounded-sm px-4 py-3 text-sm text-sand placeholder:text-gray/30 focus:outline-none focus:border-blue/40 focus:ring-1 focus:ring-blue/20 transition-all duration-200`
- Section dividers use `border-gray/10` and existing `mono-label` class for field labels.
- Step indicator uses `bento-card` base + Steel Blue accent for the active dot.
- No new design tokens, no new fonts, no new colors.

## i18n

- Namespace `questionnaire` registered in `src/i18n/index.ts` alongside the existing 13 namespaces.
- All visible text — labels, options, helper text, button labels, validation messages, success message, reset-confirm strings — comes from `questionnaire.json`. Common buttons (`back`, `continue`) live in the questionnaire namespace to keep this self-contained; `consentText` reuses the existing `common.form.consentText` key already used by Contact.tsx.
- DE keys mirror EN 1:1.

## Submit behavior in Phase 1 (stubbed)

```ts
async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  if (!consent) { toast.error(tc("form.validation.consentRequired")); return; }
  if (!validateRequired()) return;

  // TODO(backend): wire to supabase.functions.invoke("send-inquiry", {
  //   body: { kind: "questionnaire", source: "tvac-questionnaire", data: form,
  //           _website: honeypot, turnstileToken }
  // }) once the edge function gains the `kind: "questionnaire"` branch.
  // Until then, do NOT use mailto and do NOT show a fake success state.

  toast.message(t("wizard.stubNotice"));
  console.info("[TvacQuestionnaire] payload preview (not sent)", form);
}
```

The submit button stays enabled (so the user sees the validated state work end-to-end) but produces only a neutral toast — no false "sent" confirmation, no `mailto:`, no network call.

## Validation rules

- Required: `company`, `firstName`, `lastName`, `email` (regex), `consent`.
- Email regex identical to Contact.tsx: `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`.
- All other fields optional. Numeric inputs use `inputMode="decimal"` for soft keyboards but accept blank.
- Errors render inline with the same red treatment as Contact.tsx.

## SEO

- Helmet sets `<html lang>`, page title, description, canonical, hreflang (via `getHreflangs` / `getCanonical`).
- `<meta name="robots" content="noindex,follow" />` so the high-intent page does not surface in search; sitemap exclusion stays for the backend prompt to keep this phase scope-limited.

## Deferred to the backend prompt (explicit out-of-scope)

1. Extending `send-inquiry` edge function with the `kind: "questionnaire"` discriminator and the structured HTML email renderer to `info@deepvac.space`.
2. Replacing the stub in `handleSubmit` with the real `supabase.functions.invoke` call (Turnstile token + honeypot + duplicate detection).
3. Sitemap exclusion in `scripts/generate-sitemap.mjs`.
4. Secondary CTAs on Custom TVAC, Products, Services, Contact, and Footer pointing to the new questionnaire route.
5. Optional `localStorage` draft autosave.
6. Optional print-only stylesheet for "Save as PDF" customer copy.

## Risk and verification

- **No regression to short form** — `Contact.tsx` and the `send-inquiry` function are not touched in this phase.
- **i18n namespace addition is safe** — additive only; existing namespaces unchanged.
- **Routing addition is safe** — new path is unique; `findRouteEntry` keeps working for all existing routes.
- After implementation: verify `/tvac-questionnaire` and `/de/tvac-fragebogen` both render, language switcher swaps cleanly, all 5 steps navigate, dynamic shape logic toggles dimension blocks correctly, reset confirms before clearing, submit shows the stub toast and logs the payload, `/contact` is byte-identical.
