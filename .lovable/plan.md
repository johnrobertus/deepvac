

# CRO-Tiefenaudit — deepvac.space

---

## 1. Executive Summary

Deepvac.space ist visuell und strukturell auf einem hohen Niveau für eine B2B-Engineering-Website in der Frühphase. Die dunkle, technische Designsprache, die konsistente Typografie und die durchdachte Seitenstruktur schaffen Glaubwürdigkeit. Die Site hat funktionale Formulare mit Backend-Integration, Turnstile-Schutz und saubere i18n.

Die zentralen Conversion-Barrieren sind:

1. **Fehlende Differenzierung im Conversion-Pfad**: Alle CTAs auf allen Seiten führen zum selben generischen Kontaktformular. Es gibt keine kontextspezifische Vorqualifizierung.
2. **Schwache Vertrauenslage**: Die References-Seite enthält null konkrete Nachweise — keine Logos, keine Projekte, keine Testimonials. Für B2B-Beschaffung in Raumfahrt/Verteidigung ist das ein Dealbreaker.
3. **Thermal Vision nicht in Products Overview integriert**: Ein Produkt existiert als vollständige Detailseite, ist aber über den Hauptnavigationspfad der Übersichtsseite unsichtbar.
4. **Hero-Botschaft zu breit**: Die Homepage-Headline „Thermal Vacuum Systems for Aerospace Qualification" ist korrekt, aber nicht differenzierend. Sie beschreibt die Kategorie, nicht Deepvac.
5. **Keine Messung**: Kein erkennbares Analytics-Setup, keine Event-Tracking-Integration, keine Conversion-Messung. CRO-Optimierung ohne Baseline ist Blindflug.

**Stärken**: Technisch präzise Copy, konsistentes Design-System, funktionale Formulare mit Validierung und Spam-Schutz, saubere zweisprachige Architektur, gutes Service-Template-System.

---

## 2. Weighted Scorecard

| # | Kategorie | Gewicht | Score (0–5) | Gewichtet | Konfidenz | Impact | Effort |
|---|-----------|---------|-------------|-----------|-----------|--------|--------|
| 1 | Positioning & Message Clarity | 15% | 3.0 | 0.45 | Hoch | Hoch | Niedrig |
| 2 | ICP Fit & Relevance | 10% | 3.5 | 0.35 | Mittel | Mittel | Niedrig |
| 3 | Offer Architecture & Solution Logic | 15% | 3.0 | 0.45 | Hoch | Hoch | Mittel |
| 4 | Engineering & System Integration Competence | 10% | 3.5 | 0.35 | Hoch | Mittel | Mittel |
| 5 | Data & Technology Communication | 5% | 2.5 | 0.125 | Mittel | Niedrig | Niedrig |
| 6 | Retrofit & Modernization Visibility | 5% | 2.5 | 0.125 | Hoch | Mittel | Niedrig |
| 7 | Trust & Technical Credibility | 10% | 1.5 | 0.15 | Hoch | Hoch | Hoch |
| 8 | CTA Architecture & Conversion Paths | 10% | 2.0 | 0.20 | Hoch | Hoch | Niedrig |
| 9 | Lead Generation Friction | 10% | 3.0 | 0.30 | Mittel | Hoch | Niedrig |
| 10 | Objection Handling | 5% | 2.0 | 0.10 | Mittel | Mittel | Niedrig |
| 11 | Navigation & Information Scent | 5% | 3.5 | 0.175 | Hoch | Mittel | Niedrig |
| 12 | Content Depth & Scanability | 5% | 3.5 | 0.175 | Hoch | Niedrig | Niedrig |
| 13 | Language & Tone | 3% | 4.0 | 0.12 | Hoch | Niedrig | Niedrig |
| 14 | Mobile CRO | 4% | 3.0 | 0.12 | Niedrig | Mittel | Mittel |
| 15 | Measurement Readiness | 3% | 0.5 | 0.015 | Hoch | Hoch | Niedrig |
| | **Gesamt** | **100%** | | **3.19 / 5.0** | | | |

---

## 3. Page-by-Page Findings

### 3.1 Homepage

**Beobachtet:**
- Hero-Headline: „Thermal Vacuum Systems for Aerospace Qualification" — beschreibt die Kategorie, nicht die Differenzierung
- Hero-Subtitle erklärt das Angebot gut, ist aber in einem langen Satz versteckt
- Cue-Badges: MODULAR PLATFORMS / CUSTOM TVAC SYSTEMS / CONTROL & AUTOMATION / RETROFIT & SERVICE — gut gewählt
- Kein primärer CTA im Hero sichtbar — nur Cues und ein Funding-Badge
- 16 Sektionen bis zum Kontaktformular — langer Weg zum Conversion-Punkt
- Homepage-Kontaktformular (ContactSection) hat weniger Felder als die Kontaktseite (keine Qualifier-Dropdowns) — gut für Lower-Friction-Conversion
- Lead Capture CTA-Band existiert zwischen References und Contact — „Request a Quote" + „Talk to an Engineer"
- Keine Sticky-CTA oder Floating-Action im Scroll-Verlauf

**Interpretation:** Die Homepage ist inhaltlich stark, aber der Weg zur Conversion ist lang und der Hero hat keinen direkten Call-to-Action. Ein Ingenieur, der die Seite zum ersten Mal besucht, muss 16 Sektionen scrollen, um das Formular zu erreichen.

**Empfehlungen:**
- CTA-Buttons in den Hero einbauen
- Hero-Headline differenzierend umschreiben
- Sticky-CTA oder „Talk to an Engineer"-Button bei langem Scroll

### 3.2 Contact Page

**Beobachtet:**
- Vollständiges Formular: First Name, Last Name, Work Email, Phone, Company, Project/Application, dann 3 optionale Qualifier-Dropdowns (Chamber Type, Application Area, Timeline), Message, Consent, Turnstile
- Honeypot-Feld implementiert
- Erfolgsstate mit CheckCircle und „Submit Another Inquiry"
- Sidebar: Adresse, Telefon, E-Mail, Antwortzeit, ConsentMap, LinkedIn
- FAQ-Sektion mit 4 Fragen
- CTA-Band am Ende: „Call" + „Email"
- LinkedIn-Link zeigt auf `https://linkedin.com` (generisch, nicht Deepvac-spezifisch) — **Bug**

**Interpretation:** Das Formular ist solide und hat die richtige Feldstruktur für B2B-Qualifizierung. Die Qualifier-Dropdowns sind optional und gut platziert. Der LinkedIn-Link ist fehlerhaft (generisches `https://linkedin.com` statt Firmen-URL).

**Empfehlungen:**
- LinkedIn-Link auf `https://www.linkedin.com/company/deepvac-gmbh/` korrigieren (Bug — ContactSection hat die richtige URL, Contact.tsx nicht)
- Formular-Headline „Engineering Inquiry" durch „Discuss Your Requirements" ersetzen — weniger formell
- Vertrauenssignal neben Submit-Button stärken: Antwortzeit prominent anzeigen

### 3.3 Products Overview

**Beobachtet:**
- Zeigt nur Standard Series und Custom TVAC als Produktkarten
- Thermal Vision ist nicht integriert, obwohl die Detailseite existiert und im Header-Dropdown verlinkt ist
- Decision Support Tabelle (Standard vs. Custom) vorhanden — gutes Entscheidungstool
- Cross-Link zu Services existiert
- FAQ am Ende

**Interpretation:** Strukturell solide, aber unvollständig. Jeder Besucher, der über die Übersichtsseite navigiert, verpasst Thermal Vision.

**Empfehlungen:**
- Thermal Vision als dritte Produktkarte integrieren (mit angepasstem Icon und Beschreibung)
- Ggf. Produktkategorisierung: „Chamber Platforms" (Standard + Custom) und „Engineering Systems" (Thermal Vision)

### 3.4 Standard Series

**Beobachtet:**
- Vollständige Produktseite: Hero mit TechChips, zwei Sub-Produkte (T Series + C Series), jeweils mit Bild, Features, Spezifikationen
- 2 CTAs: „Request Technical Details" + „Download Brochure"
- Application Fit Sektion
- FAQ
- CTA-Band am Ende

**Interpretation:** Referenz-Layout, gut strukturiert. CTAs sind klar differenziert.

### 3.5 Custom TVAC

**Beobachtet:**
- Hero mit TechChips (Scope: Custom / Geometry: Application-Specific / Approach: Engineering-Led)
- Project Drivers: 6 Karten zu Gründen für Custom-Systeme
- Config Dimensions: akkordeon-artige Darstellung der Konfigurationsmöglichkeiten
- Process: 5-Step Ablauf
- CTA-Band: „Discuss System Requirements" + „Explore Standard Series"
- FAQ

**Interpretation:** Stärkste Conversion-Seite. Gut differenziert, klarer Prozess, spezifischer CTA. Kein Verbesserungsdruck, aber ein Case-Study-Beispiel würde massiv helfen.

### 3.6 Thermal Vision

**Beobachtet:**
- Überarbeitete Seite mit spezifischem Produkt-Fokus
- Hero mit „Request a Technical Consultation" + „Request Technical Details" — CTA-Paar zu ähnlich
- Split-Layout: Produktbild links mit Specs, Features rechts
- 4 Feature-Karten
- Technische Spezifikationen als Strip
- Navigation-Bar: „Back to Products" + „Talk to an Engineer"
- Fehlt: FAQ, Cross-Links zu Services (z.B. Retrofit, Subsystem Integration)

**Interpretation:** Visuell und inhaltlich deutlich verbessert gegenüber früherer Version. Schwachpunkte: CTA-Differenzierung und fehlende Integration in die Übersichtsseite.

### 3.7 Services Overview

**Beobachtet:**
- 6 Service-Karten mit Icon, Beschreibung, Deliverables-Sidebar
- CTAs: „Discuss Your Requirements" + „Explore Chamber Products"
- Cross-Link zu Standard Series + Custom TVAC
- FAQ
- CTA-Band: „Talk to an Engineer" + „Request a Quote"

**Interpretation:** Strukturell gut. Alle 6 Services sind gleichgewichtig dargestellt. Retrofit als strategisches Differenzierungsmerkmal könnte visuell hervorgehoben werden.

### 3.8 Retrofit & Modernization (Service Detail)

**Beobachtet (Template):**
- ServicePageTemplate: Hero, Overview-Sektion mit Bild, Deliverables-Grid, Scenarios, Cross-Links, CTA-Band
- CTA: generisches „Discuss Your Requirements"
- Eigenes Hero-Bild (retrofit-hero.png)
- Blog-Artikel „Retrofit vs Replacement" existiert als Content-Stützung

**Interpretation:** Funktional vollständig, aber nicht als strategischer Differenzierungspunkt positioniert. Der CTA „Discuss Your Requirements" ist für Retrofit-Kunden zu vage. Bessere Option: „Assess Retrofit Suitability" oder „Evaluate Your Existing System".

### 3.9 References

**Beobachtet:**
- 4 generische Industrie-Kacheln (Aerospace & Space, Research, Industrial, Scientific)
- „Types of Engagements" als Badge-Liste
- „Coming Soon" Placeholder-Sektion für Case Studies
- Keine Logos, keine Projektnamen, keine Testimonials
- Kein konkreter Nachweis für irgendetwas

**Interpretation:** Dies ist die schwächste Seite der gesamten Website. Für B2B-Beschaffung in Raumfahrt/Verteidigung ist eine References-Seite ohne konkrete Nachweise schlimmer als keine References-Seite. Sie signalisiert explizit: „Wir haben nichts vorzuweisen."

**Empfehlungen:**
- Wenn konkrete Referenzen existieren: sofort integrieren
- Wenn nicht: Seite temporär aus der Navigation entfernen und stattdessen Vertrauenssignale auf anderen Seiten stärken (Universitäts-Kooperation, EXIST-Förderung, Gründer-Expertise)
- „Coming Soon" auf einer öffentlichen Seite entfernen — das ist ein Anti-Pattern für Vertrauen

### 3.10 Team

**Beobachtet:**
- 2 Gründer mit Fotos, Rollen, Beschreibungen, Focus-Area-Tags
- Story-Sektion mit Kompetenzen
- Philosophy-Sektion: 3 Karten
- Partnership-Sektion
- LinkedIn-Links zeigen auf `https://linkedin.com` — **gleicher Bug wie Contact**
- CTA: „Request a Technical Consultation" + „View Open Positions"

**Interpretation:** Gut strukturiert. 2-Personen-Team ist für ein Startup glaubwürdig, könnte aber das „können die das wirklich"-Signal auslösen. University-Verbindung und EXIST-Förderung könnten als Credibility-Marker stärker genutzt werden.

### 3.11 Resources Hub + Catalogs

**Beobachtet:**
- Resources Hub: 2 Kacheln (Catalogs + Blog)
- Catalogs: 1 PDF (Standard Series Q1 2026)
- Blog: 3 technische Artikel

**Interpretation:** Funktional, aber dünn. Für SEO-getriebene Lead-Generierung fehlt Masse. Für Mid-Funnel-Besucher fehlen produktspezifische Datenblätter für Custom TVAC und Thermal Vision.

### 3.12 Blog

**Beobachtet (aus Route-Analyse):**
- 3 Artikel: Cooling Systems, Retrofit vs Replacement, Aerospace Qualification Testing
- Themen passen zur ICP-Relevanz

**Interpretation:** Qualitativ relevant, quantitativ zu wenig für nachhaltige SEO-Wirkung. Nicht auditiert im Detail.

---

## 4. Quick Wins (7–14 Tage)

| # | Maßnahme | Impact | Effort | Seite |
|---|----------|--------|--------|-------|
| 1 | **CTA-Buttons in Homepage-Hero einfügen**: „Discuss Your Requirements" (primär) + „Explore TVAC Platforms" (sekundär) | Hoch | Niedrig | Homepage |
| 2 | **Thermal Vision in Products Overview integrieren** als dritte Produktkarte | Hoch | Niedrig | Products |
| 3 | **LinkedIn-Links korrigieren** auf Contact.tsx und Team.tsx (Bug: `https://linkedin.com` statt `https://www.linkedin.com/company/deepvac-gmbh/`) | Niedrig | Niedrig | Contact, Team |
| 4 | **References „Coming Soon" entfernen** — entweder konkrete Inhalte oder Seite aus Navigation nehmen | Mittel | Niedrig | References |
| 5 | **Thermal Vision CTA differenzieren**: „Request a Technical Consultation" + „Request Technical Details" → „Discuss Integration Requirements" + „Request Technical Datasheet" | Mittel | Niedrig | Thermal Vision |
| 6 | **TwinQCM-Route entfernen** oder auf /products umleiten | Niedrig | Niedrig | App.tsx |
| 7 | **Retrofit Service CTA spezifizieren**: „Discuss Your Requirements" → „Assess Retrofit Suitability" | Mittel | Niedrig | Retrofit Service |
| 8 | **Homepage Hero-Headline differenzierend umschreiben** (siehe Rewrite Suggestions) | Hoch | Niedrig | Homepage |

---

## 5. Strategic Improvements (30–90 Tage)

| # | Maßnahme | Impact | Effort | Zeithorizont |
|---|----------|--------|--------|-------------|
| 1 | **Analytics implementieren**: Event-Tracking für CTA-Clicks, Formular-Starts, Formular-Submits, Seiten-Scroll-Depth, PDF-Downloads | Hoch | Mittel | 30 Tage |
| 2 | **Kontextspezifische Formular-Vorqualifizierung**: CTA auf Produktseiten soll das Kontaktformular mit vorausgewähltem Chamber Type öffnen (URL-Parameter `?chamberType=standard` etc.) | Hoch | Mittel | 30 Tage |
| 3 | **References-Seite mit realen Inhalten befüllen** oder durch „Engineering Scope" ersetzen — Beschreibung der Projekttypen ohne falsche Referenz-Behauptungen | Hoch | Hoch | 60 Tage |
| 4 | **Produktspezifische Datenblätter erstellen**: Custom TVAC Capabilities PDF, Thermal Vision Technical Brief | Mittel | Hoch | 60 Tage |
| 5 | **Retrofit als strategisches Thema aufwerten**: eigene Landing Page oder prominentere Platzierung auf Homepage mit eigenem Value Proposition Block | Mittel | Mittel | 45 Tage |
| 6 | **Sticky Header-CTA**: Bei Scroll über 50% Viewport einen persistenten „Talk to an Engineer"-Button einblenden | Mittel | Niedrig | 30 Tage |
| 7 | **Blog-Content-Pipeline aufbauen**: 2 Artikel/Monat zu ICP-relevanten Themen für SEO-Sichtbarkeit | Mittel | Hoch | 90 Tage |

---

## 6. Rewrite Suggestions

### 6.1 Homepage Hero — 3 Varianten

**Variante A — Capability-Led:**
> Headline: „Thermal Vacuum Infrastructure — Engineered End to End"
> Subtitle: „Chamber platforms, control systems, thermal management, and lifecycle support. Deepvac develops integrated TVAC systems for aerospace qualification and space environment simulation."

**Variante B — Outcome-Led:**
> Headline: „From Chamber Concept to Qualification-Ready System"
> Subtitle: „Deepvac engineers modular and custom thermal vacuum systems for repeatable qualification testing — including controls, thermal management, and long-term infrastructure support."

**Variante C — Differenzierung-Led:**
> Headline: „Not Just Chambers. Complete Thermal Vacuum Systems."
> Subtitle: „Deepvac combines vacuum chamber engineering, control architecture, thermal management, and lifecycle services into one integrated offering — for new builds and existing infrastructure."

### 6.2 Präzisere CTA-Labels (5 Vorschläge)

| Aktuell | Besser | Kontext |
|---------|--------|---------|
| „Request a Quote" | „Discuss System Requirements" | Products/Services allgemein |
| „Talk to an Engineer" | „Speak With a Systems Engineer" | Header, CTA-Bands |
| „Discuss Your Requirements" (Retrofit) | „Assess Retrofit Suitability" | Retrofit Service |
| „Request Technical Details" (Thermal Vision) | „Request Technical Datasheet" | Thermal Vision |
| „Learn More" (Service-Karten) | „View Service Scope" | Services Overview |

### 6.3 Friction-Reducing Lines — Contact Page (3 Vorschläge)

1. Über dem Formular: *„No commitment required. Share your project context and we'll respond with relevant technical information within two business days."*

2. Neben dem Submit-Button: *„Your inquiry goes directly to our engineering team — not a sales department."*

3. Unter den Qualifier-Dropdowns: *„These fields are optional. They help us prepare a more relevant initial response."*

### 6.4 Trust Modules für Produkt- oder Service-Seiten (3 Vorschläge)

1. **Engineering Credentials Strip** (für alle Produktseiten):
> „Founded at Leibniz University Hannover · EXIST-funded · Engineering-led team with backgrounds in mechatronics, refrigeration systems, and control architecture"

2. **Engagement Model Card** (für Custom TVAC):
> „Typical project timeline: 3–5 months from requirements definition to commissioning · Single-source engineering across mechanical, thermal, vacuum, and control subsystems"

3. **Integration Context** (für Thermal Vision):
> „Designed for integration into existing TVAC infrastructure · Engineering and hardware procurement from a single source · Compatible with standard feedthrough and viewport interfaces"

### 6.5 Bessere Inquiry Section Structure

Statt eines generischen Formulars mit optionalen Dropdowns — eine kontextgesteuerte Einleitung:

```text
┌──────────────────────────────────────────────┐
│  WHAT BRINGS YOU HERE?                       │
│                                              │
│  [ ] I need a new TVAC system               │
│  [ ] I want to modernize existing equipment  │
│  [ ] I need engineering support or services  │
│  [ ] I'm exploring options / early stage     │
│                                              │
│  (Selection adjusts visible qualifier fields │
│   and prefills context for the eng. team)    │
└──────────────────────────────────────────────┘
│                                              │
│  [Standard form fields below]                │
└──────────────────────────────────────────────┘
```

Dies reduziert kognitive Last und gibt dem Engineering-Team sofort den richtigen Kontext.

---

## 7. Analytics Gaps

| Gap | Schwere | Status |
|-----|---------|--------|
| **Kein Analytics-Script erkannt** (kein GA, kein Plausible, kein Fathom, kein PostHog) | Kritisch | Nicht bestimmbar — kein Analytics-Import im Codebase sichtbar |
| **Kein Event-Tracking für CTA-Clicks** | Kritisch | Beobachtet — keine onClick-Events mit Tracking |
| **Kein Formular-Funnel-Tracking** (Start, Feldinteraktion, Submit, Erfolg) | Hoch | Beobachtet |
| **Kein PDF-Download-Tracking** | Mittel | Beobachtet |
| **Keine Scroll-Depth-Messung** | Mittel | Beobachtet |
| **Keine Heatmap-Integration** | Niedrig | Beobachtet |
| **Keine Conversion-Baseline** | Kritisch | Direkte Folge der fehlenden Analytics |

**Empfehlung:** Datenschutzkonformes Analytics-Tool implementieren (Plausible oder Fathom — DSGVO-kompatibel, kein Cookie-Banner nötig). CTA-Clicks und Formular-Events als Custom Events tracken.

---

## 8. Final Verdict

**Gesamtscore: 3.19 / 5.0**

Deepvac.space ist eine visuell und strukturell überdurchschnittliche B2B-Engineering-Website für die Frühphase des Unternehmens. Die technische Sprache ist präzise, die Designsprache ist konsistent, und die Formular-Infrastruktur ist produktionsreif.

Die drei größten Conversion-Hebel:

1. **CTA-Architektur verbessern** (Quick Win, hoher Impact): Hero-CTAs einbauen, kontextspezifische CTA-Labels, Formular-Vorqualifizierung
2. **Vertrauenslücke schließen** (strategisch, hoher Impact): References-Seite entweder befüllen oder entfernen, Engineering-Credentials auf Produktseiten
3. **Messung starten** (Quick Win, kritisch): Ohne Analytics ist jede weitere CRO-Maßnahme nicht evaluierbar

**Nicht beurteilbar ohne Daten:**
- Actual Conversion Rate
- Traffic-Quellen und -Volumen
- Formular-Abbruchrate
- Bounce-Rate pro Seite
- Mobile vs. Desktop Conversion-Verteilung
- Sprachverteilung EN/DE im Traffic

