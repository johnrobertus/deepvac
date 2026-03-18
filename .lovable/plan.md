

## Plan: Embed Google Maps for Deepvac Location

Replace the map placeholder in both `src/pages/Contact.tsx` and `src/components/home/ContactSection.tsx` with a Google Maps embed iframe showing "An der Universität 1, 30823 Garbsen, Deutschland".

### Changes

**1. `src/pages/Contact.tsx`** — Replace the placeholder `div` (lines ~197-208) with a Google Maps iframe embed using the free embed API (no API key needed).

**2. `src/components/home/ContactSection.tsx`** — Same replacement (lines ~98-109).

Both will use:
```html
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2434.5!2d9.7!3d52.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x...!2sAn+der+Universit%C3%A4t+1%2C+30823+Garbsen!5e0!3m2!1sde!2sde!4v..."
  width="100%" height="100%"
  style="border:0; filter: invert(0.9) hue-rotate(180deg);"
  allowFullScreen loading="lazy"
/>
```

The `filter: invert + hue-rotate` trick will give the map a dark theme matching the Deepvac design system. The iframe will fill the existing `h-48` container with `rounded-lg overflow-hidden` preserved.

