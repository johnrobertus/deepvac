# Homepage Refactor — Executive Landing

Scope: `src/pages/Index.tsx`, all `src/components/home/*` sections, and only the `home.*` keys in `src/i18n/locales/{en,de}/home.json`. The contact form logic, Supabase function, routing, and product/service pages stay untouched. Layout, header, footer, and `common.json` button labels stay as-is unless a new key is genuinely needed.

## Goal

Turn a long brochure into a calm, scannable executive landing page. Same five answers (what / for whom / systems & services / credibility / how to inquire), delivered with much less text, stronger type, more whitespace, and the same technical tone.

## Section-by-section changes

1. **Hero** (`HeroSection.tsx`)
   - Headline → "Thermal Vacuum Systems for Aerospace Qualification" (DE: "Thermalvakuumsysteme für die Raumfahrtqualifikation").
   - Subline shortened to one sentence: "Deepvac develops modular and custom TVAC systems, control architectures, and retrofit solutions for demanding test environments."
   - Reduce capability cues from 5 → 3 ("Modular Platforms", "Custom TVAC", "Retrofit & Service").
   - Primary CTA "Discuss a TVAC Project" → `/contact`. Secondary "View Chamber Platforms" → `/products`. Reuse existing button styling, just swap labels via new keys in `home.hero.ctaPrimary` / `ctaSecondary` (avoid touching `common.json`).
   - Keep video stack, EXIST funding card, and gradient logic unchanged.

2. **Trust / System Protocol strip** (`TrustBarSection.tsx`)
   - Keep 4 cells, replace each `text` with a short phrase (max ~4 words): "Aerospace test environments", "Repeatable TVAC workflows", "Configured system architecture", "Lifecycle support". Same for DE.
   - Drop the per-cell `max-w-[28ch]` paragraph styling, tighten padding from `p-7 md:p-8` → `p-6`, and remove the now-redundant `mb-8` spacer block (collapse to a single line of label + dot + phrase).

3. **Capabilities** (`CapabilitiesSection.tsx` + `home.capabilities`)
   - Reduce items from 8 → 6 (TVAC Chamber Platforms, Control & Automation, Thermal Control, Vacuum Systems, Mechanical Interfaces, Retrofit & Service).
   - Each `description` shortened to one short sentence (≤ ~14 words).
   - Eyebrow stays "Core Capabilities"; title shortened to "Core Capabilities" headline + remove the long description (use a one-line intro only).
   - Grid stays `lg:grid-cols-3` (changed from 4 since we now have 6) for better breathing room.

4. **Product Portfolio** (`ProductPortfolioSection.tsx` + `home.productPortfolio`)
   - Keep T / C / Custom cards and the existing chamber images.
   - Strip the long `description` paragraph; keep `subtitle`, the 4-spec grid, and `note`. Section becomes spec-first.
   - Section description trimmed to one sentence.
   - Add a single "View all chamber platforms" CTA at the bottom linking to `/products`.

5. **Applications** (`ApplicationsSection.tsx` + `home.applications`)
   - Reduce from 6 → 5 items (drop "Custom TVAC Configurations", already covered by Product section).
   - One short sentence per card.
   - Section header trimmed to one-sentence intro.

6. **Services** (`ServicesSection.tsx` + `home.services`)
   - Remove the 3-pillar strip entirely (redundant with cards).
   - Group services into 4 cards: "Testing & Campaign Support", "Controls & Automation", "Mechanical & Subsystem Integration", "Retrofit, Maintenance & Repair". Map each to an existing service page (`testing-services`, `control-systems-design`, `subsystem-integration`, `retrofit-modernization`). Maintenance and Mechanical Design pages remain reachable from `/services`.
   - Each card: short label + one-sentence description.
   - Add single "Explore all engineering services" CTA → `/services`.

7. **Why Deepvac** (`WhyDeepvacSection.tsx` + `home.whyDeepvac`)
   - Reduce from 6 → 4 proof points exactly as user listed (Modular & custom, Integrated hardware/controls/support, Built for aerospace qualification, Retrofit & modernization).
   - Each description trimmed to ~15 words. Keep numbered layout.

8. **Team** (`TeamSection.tsx` + `home.team`)
   - Keep 2 founder cards and photos. Trim section description to one sentence ("Engineering-led founding team across controls, mechatronics, and thermal vacuum infrastructure.").
   - Per-member description shortened to one short expertise line (e.g. "Electrical engineering, control architecture, automation.").

9. **Catalogues / Resources** (`CataloguesSection.tsx`)
   - Keep one featured brochure card; remove the extra "View all resources" CTA below or keep only one CTA. Trim section description to one sentence.

10. **Contact** (`ContactSection.tsx`)
    - Form fields, validation, Supabase call, Turnstile, honeypot, success state, and ConsentMap remain **unchanged**.
    - Trim the surrounding copy: shorter section header description, drop the second `formTitle` / `formDescription` block above the form, and tighten section grouping spacing (`space-y-7` between sections stays, but inner `space-y-5` → `space-y-4` and reduce top padding from `py-20 md:py-28` only marginally — keep generous whitespace).
    - Sidebar address / phone / email / map untouched.

11. **Index page** (`src/pages/Index.tsx`)
    - Section order unchanged. Remove one of the two `section-divider` blocks if it ends up doubling up after section trims. Keep SEO/schema JSON-LD as-is.

## Typography & spacing pass

- Raise section vertical padding consistency to `py-24 md:py-32` for the long content sections (Capabilities, Products, Applications, Services, Why, Team) for more whitespace.
- Cap paragraph width to `max-w-[60ch]` in `SectionHeader` description usage on home so lines stay readable.
- Use existing `text-sand` / `text-gray` tokens; do not introduce new colors. Headings stay `font-medium tracking-tight`; bump section H2 to `text-3xl md:text-4xl` where currently smaller for stronger hierarchy.

## i18n

- All copy changes live in `src/i18n/locales/en/home.json` and `src/i18n/locales/de/home.json`. Keys removed in EN are removed in DE (mirrored 1:1). New keys (`hero.ctaPrimary`, `hero.ctaSecondary` if added) mirrored as well.
- No edits to `common.json`, `contact.json`, or any other namespace.

## Out of scope (explicit)

- No changes to product, service, blog, references, catalog, contact, legal pages.
- No backend, Supabase migration, edge function, GitHub Actions, or `.env` edits.
- No new dependencies. No new design tokens or theme changes.
- No new claims, logos, certifications, or customer references invented.

## Verification

After implementation: read updated files, then open the preview at `/` and `/de` to visually confirm shorter copy, calmer hero, stronger headings, and no layout regressions on mobile and desktop.

Awaiting approval before editing.