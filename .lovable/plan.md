# Hero auf großen Bildschirmen entzerren

## Problemanalyse (3094px Viewport)

Auf deinem Ultrawide-Bildschirm wirkt der Hero gequetscht, weil:

1. **Headline bricht zu früh um** — `max-w-[15ch]` zwingt "Thermovacuum systems & engineering for qualification, integration, and upgrade projects." in 6 schmale Zeilen → linke Spalte wird sehr hoch und schmal.
2. **Funding-Karte schwebt isoliert** — durch die hohe Textspalte und die `lg:grid-cols-12` Aufteilung (7/5) entsteht eine große Lücke zwischen Text und Karte.
3. **Hero-Container zu konservativ skaliert** — bei 3xl nur `max-w-[1320px]`, dadurch viel toter Raum links/rechts auf 3000px+ Screens.
4. **Vertikale Verteilung unausgewogen** — `justify-end` mit `pt-40` lässt Inhalt unten kleben, oben entsteht großer leerer Bereich.

## Änderungen

### 1. `src/index.css` — Hero-Container auf Ultrawide großzügiger
- `.hero-container` Basis bleibt `max-w-[1240px]`.
- Bei `3xl` (≥1920px) auf `max-w-[1480px]` erhöhen (statt 1320px).
- Optional: bei sehr breiten Screens (≥2560px) zusätzlich auf `max-w-[1640px]`.

### 2. `src/components/home/HeroSection.tsx` — Composition rebalancieren

**a) Headline-Breite atmen lassen**
- `max-w-[15ch]` → auf großen Screens auf `lg:max-w-[18ch] xl:max-w-[20ch] 2xl:max-w-[22ch]` erhöhen, damit Headline auf Ultrawide in 3–4 Zeilen statt 6 läuft.
- `font-size` Clamp-Wert leicht anheben (Obergrenze von `4.85rem` → ca. `5.4rem`), damit Typografie auf 3000px+ Screens präsenter wirkt.

**b) Grid-Verhältnis ausgewogener**
- `lg:grid-cols-12` Aufteilung von **7/5** → **8/4** ändern: Text bekommt mehr Raum, Karte rückt näher heran und wirkt als Begleiter statt isoliertes Element.
- Gap reduzieren: `2xl:gap-20 3xl:gap-28` → `2xl:gap-16 3xl:gap-20`.

**c) Vertikale Balance**
- Outer Wrapper von `justify-end pb-24 pt-40` (md+) → auf `justify-center pb-24 pt-32` ändern. Inhalt sitzt dann zentriert in der Viewport-Höhe statt unten geklebt.

**d) Funding-Karte**
- `max-w-[420px] 3xl:max-w-[460px]` bleibt, aber durch das breitere Grid sitzt sie näher am Text.
- Padding leicht erhöhen für visuelle Präsenz: `px-7 py-5` → `px-8 py-6`.

## Was sich NICHT ändert

- Keine Texte, Übersetzungen, Buttons, CTAs, Routing, SEO, i18n.
- Hintergrundvideos, Overlay/Vignette, Bottom-Fade unverändert.
- Mobile/Tablet-Layout (<lg) bleibt identisch — alle Änderungen greifen nur ab `lg:` aufwärts.
- Header und nachfolgende Sections nicht angefasst.

## Erwartetes Ergebnis

Auf deinem 3094px Screen:
- Headline läuft in 3–4 großzügigen Zeilen statt 6 schmalen.
- Funding-Karte sitzt rechts neben dem Text als visueller Partner, nicht isoliert.
- Inhalt ist vertikal mittig in der Viewport-Höhe.
- Hero füllt die Breite kontrolliert, ohne gestreckt oder gequetscht zu wirken.
- Auf normalen Desktop-Größen (1440–1920px) bleibt der bisher gut justierte Look erhalten.
