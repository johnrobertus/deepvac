

# Consent-Gated Google Maps — Implementation Plan

## New file: `src/components/ConsentMap.tsx`

Reusable component with two states: placeholder (default) and live map (after consent).

**Props**: `height: string` (e.g. `"h-44"`) — controls container height. No outer card wrapper (parent already provides `bento-card`).

### Consent storage
- `localStorage` key: `deepvac-maps-consent`
- All access wrapped in try/catch with `typeof window !== "undefined"` guard
- If storage unavailable, defaults to placeholder (no consent assumed)
- Site-wide: one consent decision applies to all map instances (same key)
- Uses `window.addEventListener("storage")` so withdrawing consent in one tab updates others

### Pre-consent state
- Fixed-height container matching the `height` prop, `bg-surface` background
- Centered layout with:
  - `MapPin` icon
  - Plain text address: "Deepvac GmbH · An der Universität 1 · 30823 Garbsen · Germany"
  - Small "Copy address" ghost button using `navigator.clipboard.writeText` with `document.execCommand("copy")` fallback, toast feedback
  - Headline: "Load Google Maps"
  - Short body text about data transmission to Google
  - Primary `Button`: "Accept and load map"
  - Tertiary link to `/privacy-policy`
- All buttons keyboard accessible with visible focus rings

### Post-consent state
- Renders the Google Maps iframe directly (no sandbox attribute — it breaks the embed)
- Iframe attributes: `loading="lazy"`, `referrerPolicy="no-referrer-when-downgrade"`, `title="Deepvac GmbH Location"`, `border: 0`
- Dark-mode filter: `invert(0.9) hue-rotate(180deg)` applied via wrapper div
- Below the map: small `text-[10px] text-gray/40` link "Withdraw consent and hide map" — clears localStorage, reverts to placeholder

### Accessibility
- Button and link have strong focus-visible states (inherited from design system)
- Descriptive iframe title
- Consent text uses semantic structure (heading + paragraph)

## Edit: `src/components/home/ContactSection.tsx` (lines 248–257)

Replace the `bento-card` inner content:

```tsx
<div className="bento-card rounded-lg overflow-hidden">
  <ConsentMap height="h-44" />
</div>
```

The `ConsentMap` renders directly inside the existing card — no nested card.

## Edit: `src/pages/Contact.tsx` (lines 337–346)

Same pattern:

```tsx
<div className="bento-card rounded-lg overflow-hidden">
  <ConsentMap height="h-48" />
</div>
```

## What stays the same
- Map embed URL unchanged (no API key needed, current keyless embed works)
- Dark-mode filter preserved
- All surrounding layout, spacing, and content untouched
- Future consent manager can simply check/set the same localStorage key

