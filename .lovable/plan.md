

# CRO-Audit-Grundlage — deepvac.space

## Schritt 1: Seiteninventar

| # | Seite | Route (EN) | Route (DE) | Seitentyp | Funnel-Stufe | Primäre Zielgruppe | Primärer CTA | Status |
|---|-------|-----------|-----------|-----------|-------------|-------------------|-------------|--------|
| 1 | **Homepage** | `/` | `/de` | Landing / Narrative | Early | Alle Segmente | „Request a Technical Consultation" | **Live** — 16-Sektionen-Aufbau, vollständig implementiert |
| 2 | **Products Overview** | `/products` | `/de/produkte` | Kategorie-Übersicht | Early–Mid | Ingenieure, Beschaffung | Weiterleitung auf Produktdetailseiten | **Live** — zeigt nur Standard Series + Custom TVAC; Thermal Vision fehlt hier (beobachtet) |
| 3 | **Standard Series** | `/products/standard-series` | `/de/produkte/standard-serie` | Produktdetail | Mid | Ingenieure, Lab Leads | „Request Technical Consultation" | **Live** — vollständig |
| 4 | **Custom TVAC** | `/products/custom-tvac` | `/de/produkte/custom-tvac` | Produktdetail | Mid | Projektleiter, Ingenieure | „Discuss System Requirements" | **Live** — vollständig |
| 5 | **Thermal Vision** | `/products/thermal-vision` | `/de/produkte/thermal-vision` | Produktdetail | Mid | Ingenieure, Retrofit-Kunden | „Request a Technical Consultation" | **Live** — nicht in Products-Overview integriert (beobachtet) |
| 6 | **TwinQCM** | `/products/twin-qcm` | — | Produktdetail | Mid | — | — | **Schwach** — Route existiert in App.tsx, aber laut Memory „explicitly removed"; Seite vermutlich Restbestand |
| 7 | **Services Overview** | `/services` | `/de/leistungen` | Kategorie-Übersicht | Early–Mid | Ingenieure, Beschaffung | „Discuss Requirements" | **Live** — 6 Services als Karten |
| 8 | **Testing Services** | `/services/testing-services` | `/de/leistungen/pruefdienstleistungen` | Service-Detail | Mid | Lab Leads, Qualität | CTA zum Kontakt | **Live** |
| 9 | **Control Systems Design** | `/services/control-systems-design` | `/de/leistungen/steuerungstechnik` | Service-Detail | Mid | Ingenieure | CTA zum Kontakt | **Live** |
| 10 | **Mechanical Design** | `/services/mechanical-design` | `/de/leistungen/mechanische-konstruktion` | Service-Detail | Mid | Ingenieure | CTA zum Kontakt | **Live** |
| 11 | **Retrofit & Modernization** | `/services/retrofit-modernization` | `/de/leistungen/retrofit-modernisierung` | Service-Detail | Mid–Late | Betreiber bestehender Systeme | CTA zum Kontakt | **Live** |
| 12 | **Maintenance & Repair** | `/services/maintenance-repair` | `/de/leistungen/wartung-reparatur` | Service-Detail | Mid–Late | Betreiber, Beschaffung | CTA zum Kontakt | **Live** |
| 13 | **Subsystem Integration** | `/services/subsystem-integration` | `/de/leistungen/subsystem-integration` | Service-Detail | Mid | Ingenieure | CTA zum Kontakt | **Live** |
| 14 | **Team** | `/team` | `/de/team` | Vertrauen / About | Early–Mid | Alle | „Contact" | **Live** — 2 Gründer mit Fotos |
| 15 | **Resources Hub** | `/resources` | `/de/ressourcen` | Hub / Index | Early | Alle | Weiterleitung Blog + Kataloge | **Live** — minimal, 2 Kacheln |
| 16 | **Catalogs** | `/catalogs` | `/de/kataloge` | Ressource | Mid | Ingenieure, Beschaffung | PDF-Download | **Live** — 1 Katalog (Standard Series) |
| 17 | **Blog Index** | `/resources/blog` | `/de/ressourcen/blog` | Content Hub | Early | Ingenieure, SEO-Traffic | Artikel-Links | **Live** — 3 Artikel |
| 18 | **Blog: Cooling Systems** | `/resources/blog/cooling-systems` | `/de/ressourcen/blog/kuehlsysteme` | Artikel | Early | Ingenieure | CTA zum Kontakt | **Live** |
| 19 | **Blog: Retrofit vs Replacement** | `/resources/blog/retrofit-vs-replacement` | `/de/ressourcen/blog/retrofit-vs-neubeschaffung` | Artikel | Early–Mid | Betreiber | CTA zum Kontakt | **Live** |
| 20 | **Blog: Aerospace Qualification** | `/resources/blog/aerospace-qualification-testing` | `/de/ressourcen/blog/raumfahrtqualifikation` | Artikel | Early | Ingenieure, Qualität | CTA zum Kontakt | **Live** |
| 21 | **Careers** | `/careers` | `/de/karriere` | Recruiting | — | Bewerber | Initiativbewerbung / Kontakt | **Live** |
| 22 | **References** | `/references` | `/de/referenzen` | Vertrauen | Mid–Late | Beschaffung, Projektleiter | Kontakt | **Schwach** — keine konkreten Projekte, Logos oder Kundennamen sichtbar (beobachtet); nur generische Industrie-Kacheln |
| 23 | **Contact** | `/contact` | `/de/kontakt` | Conversion | Late | Alle kaufbereiten Besucher | Formular absenden | **Live** — Formular mit Turnstile, Supabase Edge Function |
| 24 | **Imprint** | `/imprint` | `/de/impressum` | Legal | — | — | — | Live |
| 25 | **Privacy Policy** | `/privacy-policy` | `/de/datenschutz` | Legal | — | — | — | Live |
| 26 | **Terms & Conditions** | `/terms-and-conditions` | `/de/agb` | Legal | — | — | — | Live |
| 27 | **Media Credits** | `/media-credits` | `/de/medienquellen` | Legal | — | — | — | Live |
| 28 | **404** | `*` | `*` | Error | — | — | Zurück zur Startseite | Live |

---

## Schritt 2: Strategische Lücken in der Informationsarchitektur

### A. Products Overview
- **Beobachtet:** Die Products-Übersichtsseite listet nur Standard Series und Custom TVAC. Thermal Vision ist nicht als dritte Produktkarte integriert, obwohl die Detailseite existiert und im Header-Dropdown verlinkt ist.
- **Beobachtet:** TwinQCM-Route existiert noch in App.tsx — potenzielle tote Seite.
- **Hypothese:** Ein Besucher, der über die Übersichtsseite navigiert, findet Thermal Vision nicht.

### B. Product Detail Pages
- **Beobachtet:** Standard Series und Custom TVAC haben konsistentes Layout. Thermal Vision wurde kürzlich überarbeitet, ist aber von der Übersichtsseite abgekoppelt.
- **Nicht bestimmbar:** Ob technische Datenblätter / Downloads für Custom TVAC und Thermal Vision existieren.
- **Hypothese:** Fehlende produktspezifische Kataloge/Datenblätter für Custom TVAC und Thermal Vision reduzieren die Conversion-Wahrscheinlichkeit bei Mid-Funnel-Besuchern.

### C. Services Overview & Detail
- **Beobachtet:** 6 Service-Detailseiten nutzen ein einheitliches Template (ServicePageTemplate). Alle sind live.
- **Hypothese:** Die Service-Detailseiten sind strukturell solide, aber die CTA-Differenzierung zwischen den Seiten ist gering — alle leiten auf denselben Kontakt-Endpunkt. Für CRO sollte geprüft werden, ob kontextspezifischere CTAs die Conversion verbessern.

### D. Retrofit / Modernisierung
- **Beobachtet:** Eigene Service-Detailseite existiert. Ein Blog-Artikel „Retrofit vs Replacement" unterstützt das Thema.
- **Hypothese:** Retrofit ist ein starkes Differenzierungsmerkmal für B2B-Entscheider mit Bestandsanlagen. Die aktuelle Behandlung als eine von sechs gleichrangigen Services unterschätzt möglicherweise das strategische Gewicht.

### E. Test-as-a-Service
- **Beobachtet:** Testing Services existiert als Service-Detailseite.
- **Nicht bestimmbar:** Ob Deepvac tatsächlich Prüfdienstleistungen als eigenständiges Geschäftsmodell (Kammer-Zugang verkaufen) anbietet oder nur Testing-Infrastruktur baut.
- **Hypothese:** Falls Testing-as-a-Service ein Angebot ist, fehlt eine klare Landing Page, die diesen Use Case isoliert adressiert.

### F. Trust / Credibility
- **Beobachtet:** References-Seite enthält keine konkreten Projektnamen, Kundenlogos oder Fallstudien — nur generische Industrie-Kategorien (Satellite, FlaskConical, Factory, Microscope Icons).
- **Beobachtet:** Trust Bar auf Homepage existiert, aber Inhalte nicht im Detail geprüft.
- **Beobachtet:** Team-Seite zeigt 2 Gründer mit Fotos und LinkedIn-Links.
- **Hypothese:** Für B2B-Entscheider in Raumfahrt/Verteidigung ist die Referenz-Seite das schwächste Glied in der Vertrauenskette. Ohne konkrete Nachweise wirkt sie als leere Behauptung.

### G. Resources / Catalogs
- **Beobachtet:** Resources Hub ist minimal (2 Kacheln: Kataloge + Blog).
- **Beobachtet:** Nur 1 Katalog (Standard Series Q1 2026) verfügbar.
- **Beobachtet:** 3 Blog-Artikel, alle technisch relevant.
- **Hypothese:** Der Resources-Bereich ist funktional, aber dünn. Für SEO-getriebene Lead-Generierung fehlt kritische Masse an Inhalten.

### H. Contact / Engineering Inquiry
- **Beobachtet:** Vollständiges Kontaktformular mit Turnstile-Schutz und Supabase Edge Function. Enthält Felder für Anfrage-Typ (SelectField).
- **Hypothese:** Die Formular-Conversion könnte durch bessere Vorqualifizierung (z.B. produktspezifische Anfrage-Pfade) verbessert werden. Aktuell landen alle CTAs der gesamten Site auf derselben generischen Kontaktseite.

---

## Empfohlene Seiten für Tiefenaudit (8–12)

| Priorität | Seite | Begründung |
|-----------|-------|------------|
| 1 | **Homepage** | Zentraler Einstiegspunkt, höchstes Traffic-Volumen, strategische Narrative |
| 2 | **Contact** | Einziger Conversion-Endpunkt, alle CTAs führen hierhin |
| 3 | **Products Overview** | Fehlende Thermal Vision Integration, Navigations-Lücke |
| 4 | **Standard Series** | Wichtigstes Produkt, Referenz-Layout für alle Produktseiten |
| 5 | **Custom TVAC** | Zweites Kernprodukt, Prüfung auf CTA-Klarheit und Differenzierung |
| 6 | **Thermal Vision** | Kürzlich überarbeitet, noch nicht vollständig integriert |
| 7 | **Services Overview** | Einstieg in 6 Service-Detailseiten, CTA-Logik prüfen |
| 8 | **Retrofit & Modernization** | Strategisch wichtiges Differenzierungsmerkmal |
| 9 | **References** | Schwächstes Vertrauenselement, höchstes Verbesserungspotenzial |
| 10 | **Resources Hub + Catalogs** | Bewertung als Lead-Generierungskanal |
| 11 | **Team** | Vertrauensbildung bei Early/Mid-Funnel |
| 12 | **Blog Index** | SEO-Potenzial und Content-Strategie |

---

## Keine blockierenden Rückfragen

Die Analyse kann auf dieser Basis fortgesetzt werden. Zwei Anmerkungen für spätere Klärung:

- **TwinQCM**: Route existiert noch — soll die Seite entfernt oder umgeleitet werden?
- **Testing Services**: Bietet Deepvac tatsächlich Kammerzugang als Dienstleistung an, oder ist „Testing Services" rein auf den Bau von Prüfinfrastruktur bezogen? Das beeinflusst die CRO-Strategie für diese Seite erheblich.

