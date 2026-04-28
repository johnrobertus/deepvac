
## Goal
Make Deepvac feel intentionally composed on large desktop and workstation monitors (1440 / 1920 / 2560px) by widening structural containers, adding a true large-screen breakpoint, and scaling hero typography. No content, IA, routing, SEO, sitemap, CI/CD, brand, or backend changes.

## 1. Tailwind config (`tailwind.config.ts`)

Replace the `container` block and add `3xl` to `extend.screens`:

```ts
container: {
  center: true,
  padding: {
    DEFAULT: "1rem",
    sm: "1.5rem",
    lg: "2rem",
    xl: "3rem",
    "2xl": "4rem",
  },
  screens: { "2xl": "1440px" },
},
extend: {
  screens: { "3xl": "1600px" },
  // existing fontFamily, colors, etc. unchanged
}
```

## 2. Shared layout utilities (`src/index.css`)

Inside `@layer components`, add:

```css
.container-wide {
  @apply mx-auto w-full max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 3xl:px-24;
}
.container-narrow {
  @apply mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8;
}
```

## 3. Header (`src/components/Header.tsx`)
- Line 212: `container flex h-16 max-w-6xl items-center justify-between px-6` → `container-wide flex h-16 items-center justify-between`
- Line 307 (mobile menu): `container max-w-6xl space-y-6 px-6 py-6` → `container-wide space-y-6 py-6`

## 4. Hero (`src/components/home/HeroSection.tsx`)
- Line 181: outer wrapper `container max-w-6xl` → `container-wide`
- Lines 182–248: convert the inner `flex` row into a grid on `lg+`:
  ```tsx
  <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:items-center lg:gap-12 2xl:gap-20 3xl:gap-28">
    <div className="space-y-3 sm:space-y-5 lg:col-span-7 max-w-[56rem]">…text column…</div>
    <div className="hidden lg:flex lg:col-span-5 items-center justify-center 3xl:max-w-[520px]">…funding card…</div>
  </div>
  ```
- Headline (line 188): drop fixed responsive size classes, replace with fluid clamp via inline style:
  ```tsx
  <h1
    className="max-w-[15ch] font-medium text-sand [text-wrap:balance] md:max-w-[14ch] lg:max-w-[15ch] xl:max-w-[16ch]"
    style={{ fontSize: "clamp(1.7rem, 4.6vw, 5.25rem)", lineHeight: 1.0, letterSpacing: "-0.025em" }}
  >
  ```
- Body paragraph keeps `max-w-2xl` (unchanged).
- All text, CTAs, badges, cues, and funding card image/content unchanged.

## 5. Home sections — swap structural wrapper

In each file below, replace `container max-w-6xl` → `container-wide`:

- `TrustBarSection.tsx` (L15)
- `CapabilitiesSection.tsx` (L16)
- `ProductPortfolioSection.tsx` (L24)
- `ApplicationsSection.tsx` (L14)
- `ServicesSection.tsx` (L28)
- `WhyDeepvacSection.tsx` (L11)
- `TeamSection.tsx` (L19)
- `CataloguesSection.tsx` (L18)
- `ContactSection.tsx` (L150, L166)
- `FundingSection.tsx` (L13)
- `ReferencesSection.tsx` (L11)
- `LeadCaptureCTA.tsx` (if it has one)

No internal grids/cards/copy modified.

## 6. PageShell (`src/components/PageShell.tsx`)
- `Section` (L50): `container max-w-6xl` → `container-wide`
- `TrustBar` (L58): `container max-w-6xl` → `container-wide` (preserve flex/justify classes)
- `PageHero`: keep `max-w-5xl` (intentional readable prose width)
- `CTABand`: keep `max-w-4xl` (intentional centered CTA)

## 7. Footer (`src/components/Footer.tsx`)
- Line 41: `container max-w-6xl px-6 py-16 md:py-20` → `container-wide py-16 md:py-20`
- Line 104: `container flex max-w-6xl flex-col …` → `container-wide flex flex-col …` (remove redundant `px-6` on parent at L103 if present; keep `py-5` and border)

## 8. Other pages
- `src/pages/TwinQCM.tsx` (L76): `container max-w-6xl` → `container-wide`
- `src/pages/Team.tsx`: no `max-w-6xl` — no change
- `NotFound.tsx`: no change

## What is NOT changed
- No copy, headings, CTAs, translation keys, badges, or labels.
- No routes, sitemap, robots.txt, JSON-LD, hreflang, canonicals, Helmet metadata, or `Index.tsx` SEO blocks.
- No GitHub Actions, Hetzner, Supabase, Resend, Turnstile, env, or `supabase/config.toml`.
- No colors, fonts, button/card chrome, animations, or Reveal logic.
- Mobile/tablet behavior preserved (mobile padding stays at 1rem; grid kicks in at `lg+` only).

## QA after implementation
- Browser preview at 390 / 768 / 1024 / 1440 / 1920 / 2560 px:
  - no horizontal scroll
  - header logo, hero text edge, card rows, footer columns share identical left/right edges
  - hero headline scales fluidly without overflow; long German words don't break
  - funding card stays inside hero grid, no collision
  - paragraphs and CTA bands remain compact and readable
