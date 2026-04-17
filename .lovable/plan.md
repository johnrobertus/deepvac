

## Warum das Google-Ergebnis schlecht aussieht

**Drei Probleme zusammen:**

### 1. Veraltete Meta-Tags in `index.html` (Hauptursache)
Der statische `<title>` ist nur **"Deepvac GmbH"** und die `<meta description>` ist die alte Zeile *"Deepvac develops advanced thermal vacuum chamber systems for aerospace, research, and industrial applications."* — exakt das, was Google zeigt.

Die schöneren Texte aus `seo.json` (z.B. *"Deepvac | Thermal Vacuum Systems for Space Qualification"*) werden zwar zur Laufzeit per React/i18n gesetzt, aber:
- **Googlebot crawlt zwar JS, indexiert aber bevorzugt das, was im initialen HTML steht** (Vite SPA → leerer `<div id="root">`)
- Bei statischen SPAs ohne SSR/Prerendering bleibt die `index.html`-Description die dominante Quelle für das Snippet

### 2. Kaputtes `<link>`-Tag
Zeile 13–14 in `index.html`:
```html
<li
nk rel="canonical" href="https://deepvac.space/" />
```
Das ist syntaktisch zerbrochen (Zeilenumbruch innerhalb des Tag-Namens) → **canonical wird nicht erkannt**.

### 3. Fehlende statische Basics
- Kein `og:image` definiert → Social-Previews ohne Bild
- Kein `og:locale`
- Strukturierte Daten enthalten alte Description

### 4. Google-Index-Latenz
Selbst nach Fix dauert es **2–6 Wochen**, bis Google das Snippet aktualisiert. Du kannst über die Google Search Console eine Neuindexierung anfordern, um das zu beschleunigen.

---

## Geplante Änderungen (nur `index.html`)

**Ersetze die Head-Sektion mit:**

```html
<title>Deepvac | Thermal Vacuum Systems for Space Qualification</title>
<meta name="description" content="Deepvac engineers modular and custom thermal vacuum systems — chamber platforms, control architecture, thermal management, and lifecycle services. Engineered in Germany." />
<meta name="author" content="Deepvac GmbH" />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="https://deepvac.space/" />

<meta property="og:type" content="website" />
<meta property="og:url" content="https://deepvac.space/" />
<meta property="og:site_name" content="Deepvac" />
<meta property="og:locale" content="en_US" />
<meta property="og:locale:alternate" content="de_DE" />
<meta property="og:title" content="Deepvac | Thermal Vacuum Systems for Space Qualification" />
<meta property="og:description" content="Modular and custom thermal vacuum systems for aerospace qualification. Chamber platforms, controls, thermal management, retrofit and lifecycle services." />
<meta property="og:image" content="https://deepvac.space/og-image.png" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Deepvac | Thermal Vacuum Systems for Space Qualification" />
<meta name="twitter:description" content="Modular and custom thermal vacuum systems for aerospace qualification — engineered end to end in Germany." />
<meta name="twitter:image" content="https://deepvac.space/og-image.png" />
```

Und die JSON-LD `description` auf den gleichen neuen Text aktualisieren.

---

## Was Du danach machen musst (außerhalb des Codes)

1. **Google Search Console öffnen** → URL-Prüfung für `https://deepvac.space/` → **"Indexierung beantragen"**
2. Sitemap prüfen/einreichen (falls noch keine: ich kann eine `sitemap.xml` + `robots.txt` für die Hauptrouten generieren)
3. **Bis zu 2–6 Wochen warten** — Google entscheidet selbst, wann das Snippet aktualisiert wird

**Optionale Verbesserung (separat zu entscheiden):** Für SPAs ist `react-helmet-async` + Prerendering (z.B. via `vite-plugin-prerender` oder Lovable Cloud edge-prerendering) die saubere Lösung, damit jede Route ihr eigenes statisches `<title>`/`<meta>` hat. Das ist aber ein größerer Eingriff — Quick Fix oben reicht für das Homepage-Snippet.

