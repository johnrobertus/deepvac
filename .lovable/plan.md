

# Bilingual Website (EN + DE) — Refined Implementation Plan

## Core Principle

English is the fixed master version. English translation files are the **source of truth**. German keys mirror English keys 1:1 with zero structural deviation. English content is never rewritten, optimized, or restructured during this task.

---

## Architecture

### i18n Library: `react-i18next` + `i18next`

```text
src/i18n/
  index.ts                    ← init: defaultLng="en", fallbackLng="en"
  locales/
    en/                       ← SOURCE OF TRUTH — created first, never altered for i18n
      common.json             ← nav, footer, buttons, consent, validation
      home.json               ← all homepage sections
      products.json           ← products overview + subpages
      services.json           ← services overview + 6 subpages
      team.json
      careers.json
      references.json
      catalogs.json
      contact.json            ← form labels, placeholders, validation, success/error
      legal.json              ← imprint, privacy policy, terms (existing text only)
      seo.json                ← page titles + meta descriptions
      errors.json             ← 404, form validation
    de/                       ← DERIVED — must have identical keys to en/
      (same files, German translations)
```

**Rule**: Every key in `de/*.json` must exist in `en/*.json`. No German-only keys. No structural differences. A CI-time or build-time check can enforce key parity later.

### Language Detection: URL is the Single Source of Truth

- `/` and all unprefixed routes → English
- `/de` and all `/de/*` routes → German
- `localStorage` may store a preference for redirect suggestions (e.g. banner "Diese Seite ist auch auf Deutsch verfügbar"), but **never overrides** an explicit URL language
- Direct URL access always wins: visiting `/products` = English, visiting `/de/produkte` = German, regardless of any stored preference

### Central Route Map: `src/lib/routes.ts`

One single file used by: route generation in `App.tsx`, language switcher navigation, `hreflang` tag generation, canonical URL generation, all internal `<Link>` components.

```typescript
// src/lib/routes.ts
export const routeMap = [
  { en: "/",                                    de: "/de" },
  { en: "/products",                            de: "/de/produkte" },
  { en: "/products/standard-series",            de: "/de/produkte/standard-serie" },
  { en: "/products/custom-tvac",                de: "/de/produkte/custom-tvac" },
  { en: "/services",                            de: "/de/leistungen" },
  { en: "/services/testing-services",           de: "/de/leistungen/pruefdienstleistungen" },
  { en: "/services/control-systems-design",     de: "/de/leistungen/steuerungstechnik" },
  { en: "/services/mechanical-design",          de: "/de/leistungen/mechanische-konstruktion" },
  { en: "/services/retrofit-modernization",     de: "/de/leistungen/retrofit-modernisierung" },
  { en: "/services/maintenance-repair",         de: "/de/leistungen/wartung-reparatur" },
  { en: "/services/subsystem-integration",      de: "/de/leistungen/subsystem-integration" },
  { en: "/team",                                de: "/de/team" },
  { en: "/catalogs",                            de: "/de/kataloge" },
  { en: "/careers",                             de: "/de/karriere" },
  { en: "/references",                          de: "/de/referenzen" },
  { en: "/contact",                             de: "/de/kontakt" },
  { en: "/imprint",                             de: "/de/impressum" },
  { en: "/privacy-policy",                      de: "/de/datenschutz" },
  { en: "/terms-and-conditions",                de: "/de/agb" },
] as const;

// Utility functions derived from this single map:
// getAlternatePath(currentPath, targetLang) → used by language switcher
// getHreflangs(currentPath) → returns [{lang, href}] for SEO tags
// getCanonical(currentPath, lang) → returns canonical URL
// localizedPath(enPath, lang) → used by <Link> components
```

Existing route aliases (`/catalogues`, `/services/retrofit-modernisation`) remain as English fallbacks only — no German aliases needed.

---

## Routing in `App.tsx`

```text
<BrowserRouter>
  <LanguageProvider>        ← reads lang from URL, sets i18n.language
    <Routes>
      {/* English routes — UNCHANGED paths */}
      <Route path="/" element={<Index />} />
      <Route path="/products" element={<Products />} />
      ...existing routes unchanged...

      {/* German routes — /de prefix, localized slugs */}
      <Route path="/de" element={<Index />} />
      <Route path="/de/produkte" element={<Products />} />
      <Route path="/de/produkte/standard-serie" element={<StandardSeries />} />
      ...all German routes...

      <Route path="*" element={<NotFound />} />
    </Routes>
  </LanguageProvider>
</BrowserRouter>
```

The `LanguageProvider` wrapper:
1. Parses pathname → determines `lang` ("en" or "de")
2. Calls `i18n.changeLanguage(lang)`
3. Sets `<html lang="...">` attribute
4. Provides context: `{ lang, t, switchLanguage }`

Pages render identically — they just read from `t()` which returns the correct language.

---

## Language Switcher

- Location: Header, between nav links and CTA button
- Format: `EN | DE` — two small text buttons, active language highlighted
- On click: navigates to the equivalent route via `getAlternatePath()` from the central route map
- Mobile: same toggle in mobile menu above the CTA
- Fixed width, no layout shift

---

## SEO Implementation

Per-page `<Helmet>` using `react-helmet-async`:

```tsx
<Helmet>
  <html lang={lang} />
  <title>{t("seo:products.title")}</title>
  <meta name="description" content={t("seo:products.description")} />
  <link rel="canonical" href={getCanonical(pathname, lang)} />
  {getHreflangs(pathname).map(h => (
    <link rel="alternate" hrefLang={h.lang} href={h.href} />
  ))}
</Helmet>
```

All SEO utilities read from the central route map.

---

## Legal Pages

- Imprint, Privacy Policy, Terms and Conditions: translate existing English content into proper German legal language
- **Do not invent new legal substance** — only translate and structure what exists
- Both versions rendered from translation keys, same component, same structure

---

## Execution Phases

### Phase 1: Infrastructure
- Install `react-i18next`, `i18next`, `react-helmet-async`
- Create `src/i18n/index.ts` config
- Create `src/lib/routes.ts` central route map + utilities
- Create `LanguageProvider` component
- Create `useLanguage` hook

### Phase 2: Extract English Strings
- Audit all ~30 component/page files for hardcoded text
- Create all `en/*.json` namespace files with extracted content
- This is the largest phase

### Phase 3: Replace Hardcoded Text with `t()` Calls
- Update every component to use `useTranslation()`
- Update forms (labels, placeholders, validation, success/error messages)
- Update ConsentMap consent text
- Add `<Helmet>` SEO blocks to each page

### Phase 4: German Translations
- Create all `de/*.json` files mirroring `en/` key structure exactly
- Professional aerospace/B2B German — not literal translation
- Legal pages: proper German legal phrasing of existing content only

### Phase 5: Routing + Switcher
- Add German routes to `App.tsx`
- Add `LanguageProvider` wrapper
- Add language switcher to Header (desktop + mobile)

### Phase 6: QA Verification

**Route verification**:
- Every entry in `routeMap` tested: EN path loads English, DE path loads German
- Language switcher navigates to correct equivalent page from every page
- 404 page works for both `/unknown` and `/de/unknown`

**Content verification**:
- No hardcoded English text remains in any component (search codebase for string literals)
- No untranslated UI strings in German version (visual audit of every page)
- Forms in both languages: labels, placeholders, all validation messages, success/error states

**SEO verification**:
- Every page has correct `<html lang="">`, `<title>`, `<meta description>`
- Every page has correct `hreflang` alternate links pointing to the paired route
- Every page has correct canonical URL
- No duplicate metadata across languages

**Visual verification**:
- English version pixel-identical to pre-migration (no layout, spacing, or style changes)
- German version matches English layout (longer text may wrap but structure is preserved)

---

## Technical Details

- Fallback: if any `de/` key is missing, `i18next` returns the English value automatically
- Brand name "Deepvac" never translated
- `localStorage` key `deepvac-lang-pref` may store preference for UX hints only — URL always wins
- The existing build error (`npm:openai@^4.52.5`) is unrelated to this task and will not be addressed

