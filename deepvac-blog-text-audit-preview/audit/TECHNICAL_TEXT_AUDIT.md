# Deepvac blog text audit for the `preview` branch

Audit date: 2026-07-23

## Scope

This package revises all 22 generated bilingual articles and the five legacy articles. It addresses technical qualification of claims, current standards status, product-data alignment, German terminology, sales tone, repetition, source transparency and article-level search intent.

## Result summary

* Generated articles reviewed: 22
* Legacy articles reviewed: 5
* English generated-content word count: 27,819 to 23,535, a reduction of 15.4%
* German generated-content word count: 24,434 to 20,141, a reduction of 17.6%
* Technical reference assignments: 72 across 32 unique URLs
* Articles with an explicit applicability or product-configuration note: 11
* Generated articles with a primary keyword and primary user question: 22 of 22
* Direct sales formulations in generated article data: reduced substantially; conclusions are now technical and neutral
* Em dash characters in audited article data and replacement code: zero

## Work completed against the audit priorities

### 1. Numerical and standards claims

The standards overview now distinguishes current scope and status instead of treating several documents as interchangeable. It identifies ECSS-E-ST-10-03C Rev.1, GSFC-STD-7000B and SMC-S-016 in their proper programme contexts. MIL-STD-1540D is retained only as a historical reference and is identified as cancelled.

Generic numerical rules were removed or qualified where the source material did not support a universal value. Examples include pump-down duration, leak-rate acceptance, chamber sizing, useful-volume ratios, ramp-rate targets, temperature-sensor errors, electric-propulsion background pressure and pumping-speed ranges.

Where a number remains, the text either ties it to a cited primary source, presents it as a current Deepvac reference configuration, or states that the binding value comes from the project specification and quotation.

### 2. Product-data alignment

Deepvac product statements were checked against the current Standard Series and options pages. Reference values such as nominal size classes, working pressure, thermal ranges, uniformity, stability, ramp capability and control features are no longer presented as universal across every test setup. Relevant articles now include a configuration note and cite the current product page.

### 3. Unsupported statistics and universal claims

Statements that sounded like measured market statistics, company-wide experience data or universal programme practice were softened. The revised wording uses terms such as programme-specific, can, may, depending on configuration and where applicable. Claims about CubeSat failure causes, launch-provider expectations, test duration, utilisation thresholds and schedule savings were revised accordingly.

### 4. German terminology

Terminology was normalised across the generated articles. Preferred forms include T-Serie, C-Serie, Standard-Serie, Fertigungs- und Integrationsfehler, Prüfling, Einbauraum, Thermalplatte, Arbeitsdruck and Ausheizen. Unnecessary English calques and inconsistent hybrid forms were reduced.

### 5. Sales tone

The conclusions of all generated articles were rewritten as technical summaries. Repeated references to the questionnaire, direct invitations to contact the company and formulaic claims about the engineering team were removed from article copy. A separate, restrained page-level contact band remains in the renderer.

### 6. Repetition and author voice

Repeated explanations of convection loss, high vacuum, cryogenic shrouds, QCM/RGA, qualification models and oil-free pumping were shortened or reframed. The content reduction was 15.4% in English and 17.6% in German while retaining the article structures, FAQs and internal linking.

### 7. Technical references

Every generated article now contains a `references` array. The renderer displays a Technical references section and exposes the URLs through BlogPosting JSON-LD citation data. The five legacy articles receive the same treatment through the legacy registry and article wrapper.

### 8. Search intent

Every generated and legacy article now has one primary keyword and one primary user question in English and German. The values are used for the keywords meta tag and BlogPosting JSON-LD `about` property. They also provide a practical editorial brief for future revisions.

### 9. Legacy reconciliation

The five hand-built articles were checked against the new content. The cooling article now uses the current configuration framing. The qualification article reflects current document status and removes generic test values. The cost and campaign articles distinguish working conditions from empty-chamber figures and use neutral conclusions. The retrofit article is framed around measured condition and documented target capability.

## Internal sign-off still required

External source verification cannot approve proprietary Deepvac performance or commercial capability. Before publication, a Deepvac engineering or product owner should confirm the current Standard Series ranges, control-system features, service scope and any company-experience claims. The revised text makes these statements configuration-specific, but internal ownership remains necessary.

Local safety and legal requirements also remain site-specific. OSHA material is used as a primary safety reference for the audit, but project documentation must follow the law, building code and safety rules applicable at the installation location.

## Article matrix

| Article | Primary keyword EN | Primary keyword DE | References | Applicability note | EN words | DE words |
|---|---|---|---:|:---:|---:|---:|
| CubeSat TVAC Testing: What Small Satellites Really Need | CubeSat thermal vacuum testing | CubeSat-TVAC-Test | 4 | yes | 1390 to 1240 | 1285 to 1086 |
| Outgassing in Vacuum: TML, CVCM and Bake-Out Explained | outgassing in vacuum | Ausgasung im Vakuum | 3 | no | 1366 to 1209 | 1206 to 1079 |
| Helium Leak Testing for TVAC Chambers: Methods, Units, Practice | helium leak testing vacuum chamber | Helium-Lecktest Vakuumkammer | 4 | no | 1417 to 1291 | 1243 to 1088 |
| Space Environment Simulation: Recreating Orbit on the Ground | space environment simulation chamber | Weltraumsimulationskammer | 3 | no | 1362 to 1185 | 1199 to 1013 |
| TVAC Test Types: From Thermal Cycling to Thermal Balance | TVAC test types | TVAC-Testarten | 3 | yes | 1328 to 1113 | 1164 to 962 |
| Electric Propulsion Testing in Vacuum: Why Thruster Facilities Are a Class of Their Own | electric propulsion vacuum testing | elektrische Antriebe Vakuumtest | 3 | no | 1281 to 1120 | 1078 to 938 |
| Temperature Measurement in TVAC: Sensors, Mounting and Calibration | temperature measurement in TVAC | Temperaturmessung im TVAC | 4 | no | 1311 to 1151 | 1120 to 968 |
| TVAC Facility Requirements: What Your Building Must Provide | TVAC facility requirements | TVAC-Infrastruktur Anforderungen | 3 | yes | 1336 to 1063 | 1141 to 860 |
| Solar Simulation vs Infrared Heating: Imposing Heat Flux in TVAC | solar simulation vs infrared heating | Solarsimulation vs Infrarotheizung | 3 | no | 1287 to 1169 | 1094 to 985 |
| TVAC Chamber Sizing: How to Choose the Right Volume | TVAC chamber sizing | TVAC-Kammer dimensionieren | 3 | yes | 1304 to 1100 | 1153 to 957 |
| TVAC Chamber Lead Time: What Actually Drives Delivery | TVAC chamber lead time | Lieferzeit TVAC-Kammer | 3 | yes | 1228 to 1029 | 1067 to 867 |
| ECSS, SMC-S-016 and NASA GEVS: Thermal Vacuum Test Standards Explained | TVAC test standards | Normen für TVAC-Tests | 4 | yes | 1242 to 981 | 1108 to 856 |
| TVAC Automation: What a Modern Chamber Control System Does | TVAC automation | TVAC-Automatisierung | 3 | yes | 1186 to 1046 | 1011 to 877 |
| In-House vs External TVAC Testing: A Decision Framework | in-house vs external TVAC testing | eigene TVAC-Kammer oder Testdienstleister | 3 | no | 1207 to 1033 | 1072 to 885 |
| Testing Optics and Electronics in Vacuum: The Two Traps That Catch Bench-Proven Hardware | testing optics and electronics in vacuum | Optik und Elektronik im Vakuumtest | 4 | no | 1168 to 1009 | 1042 to 903 |
| TVAC Pumping Systems: How to Select the Right Architecture | TVAC pumping systems | Vakuumpumpstand für TVAC | 3 | yes | 1238 to 991 | 1082 to 832 |
| Vacuum Levels Explained: From Rough Vacuum to UHV | vacuum levels explained | Vakuumbereiche erklärt | 3 | yes | 1271 to 1140 | 1096 to 944 |
| What Is Thermal Vacuum (TVAC) Testing? | what is thermal vacuum testing | Was ist ein Thermalvakuumtest | 3 | yes | 1208 to 996 | 1072 to 839 |
| Contamination Control in Thermal Vacuum Testing | contamination control TVAC | Kontaminationskontrolle TVAC | 4 | no | 1161 to 831 | 1044 to 743 |
| Viewports and Optical Access in TVAC Chambers | TVAC viewports optical access | Schaugläser optischer Zugang TVAC | 3 | no | 1194 to 979 | 1069 to 867 |
| Cryo Shrouds and Thermal Plates: How TVAC Chambers Get Cold | cryo shrouds thermal plates | Kryo-Shroud Thermalplatte | 3 | yes | 1185 to 932 | 1046 to 811 |
| Used TVAC Chamber vs New: Evaluating the Second-Hand Market | used TVAC chamber vs new | gebrauchte TVAC-Kammer oder neu | 3 | no | 1149 to 927 | 1042 to 781 |

## Technical source catalogue

* [CERN Accelerator School: Vacuum Technology](https://cds.cern.ch/record/402784), CERN
* [Outgassing properties of vacuum materials for particle accelerators](https://cds.cern.ch/record/2723690), CERN
* [Rarefied gas dynamics and its applications to vacuum technology](https://cds.cern.ch/record/1046845), CERN
* [Deepvac Custom TVAC: project-specific system scope](https://deepvac.space/products/custom-tvac), Deepvac GmbH
* [Deepvac Standard Series: current technical data and configuration notes](https://deepvac.space/products/standard-series), Deepvac GmbH
* [Deepvac TVAC testing services](https://deepvac.space/services/testing-services), Deepvac GmbH
* [ECSS-E-ST-10-03C Rev.1: Testing](https://ecss.nl/standard/ecss-e-st-10-03c-rev-1-testing-31-may-2022/), European Cooperation for Space Standardization (ECSS)
* [ECSS-Q-ST-70-02C: Thermal vacuum outgassing test for the screening of space materials](https://ecss.nl/standard/ecss-q-st-70-02c-thermal-vacuum-outgassing-test-for-the-screening-of-space-materials/), European Cooperation for Space Standardization (ECSS)
* [IEC 60751:2022: Industrial platinum resistance thermometers and platinum temperature sensors](https://webstore.iec.ch/en/publication/63753), International Electrotechnical Commission (IEC)
* [ISO 20485:2017: Non-destructive testing, Leak testing, Tracer gas method](https://www.iso.org/standard/68190.html), International Organization for Standardization (ISO)
* [ISO 20486:2017: Calibration of reference leaks for gases](https://www.iso.org/standard/68191.html), International Organization for Standardization (ISO)
* [Outgassing Data for Selecting Spacecraft Materials: Test description](https://outgassing.nasa.gov/Description), NASA
* [Electric Propulsion and Power Laboratory](https://www.nasa.gov/centers-and-facilities/glenn/electric-propulsion-and-power-laboratory/), NASA Glenn Research Center
* [GSFC-STD-7000B: General Environmental Verification Standard (GEVS)](https://standards.nasa.gov/standard/gsfc/gsfc-std-7000), NASA Goddard Space Flight Center
* [Solar Irradiance Science](https://earth.gsfc.nasa.gov/climate/projects/solar-irradiance/science), NASA Goddard Space Flight Center
* [Space Environment Simulator facility capabilities](https://etd.gsfc.nasa.gov/capabilities/facilities-listing/space-environment-simulator/), NASA Goddard Space Flight Center
* [Electric Propulsion Laboratory facilities and capabilities](https://www.jpl.nasa.gov/go/epl/capabilities/facilities/), NASA Jet Propulsion Laboratory
* [Small Spacecraft Body of Knowledge and CubeSat 101](https://www.nasa.gov/smallsat-institute/small-spacecraft-body-of-knowledge/), NASA Small Spacecraft Systems Virtual Institute
* [State of the Art of Small Spacecraft Technology, Thermal Control](https://www.nasa.gov/smallsat-institute/sst-soa/thermal-control/), NASA Small Spacecraft Systems Virtual Institute
* [Contamination Measurements During Thermal Vacuum Tests in a Large Space Chamber](https://ntrs.nasa.gov/citations/19840026425), NASA Technical Reports Server
* [HERMeS Hall Thruster Facility Effect Characterization](https://ntrs.nasa.gov/citations/20170000953), NASA Technical Reports Server
* [Molecular Accumulation during JWST Cryogenic Thermal Vacuum Testing](https://ntrs.nasa.gov/citations/20220010052), NASA Technical Reports Server
* [Thermal imaging through a zinc selenide window during vacuum testing](https://ntrs.nasa.gov/citations/20130001762), NASA Technical Reports Server
* [Leak Artifacts and Vacuum Leak Primary Standard](https://www.nist.gov/laboratories/tools-instruments/leak-artifacts), National Institute of Standards and Technology (NIST)
* [Thermocouple Calibration Services](https://www.nist.gov/pml/sensor-science/temperature-humidity/thermocouples-calibrations-services), National Institute of Standards and Technology (NIST)
* [Thermometry Calibration Services](https://www.nist.gov/pml/sensor-science/temperature-humidity/thermometry-calibration-services), National Institute of Standards and Technology (NIST)
* [Accounting for optical material transmission in thermal imaging](https://www.flir.com/support-center/instruments2/what-is-the-transmission-rate-of-the-optic-material/), Teledyne FLIR
* [Why ordinary glass blocks long-wave infrared imaging](https://www.flir.com/en-eu/discover/home-outdoor/can-thermal-imaging-see-through-walls/), Teledyne FLIR
* [MIL-STD-1540D status record (cancelled 28 July 2016)](https://quicksearch.dla.mil/qsDocDetails.aspx?ident_number=36961), U.S. Defense Logistics Agency
* [Liquid nitrogen, oxygen-deficiency monitoring and ventilation safety notice](https://www.osha.gov/news/newsreleases/denver/20200520), U.S. Occupational Safety and Health Administration
* [Oxygen-deficient atmospheres and the 19.5 percent threshold](https://www.osha.gov/otm/section-2-health-hazards/chapter-3), U.S. Occupational Safety and Health Administration
* [SMC-S-016 (2014): Test Requirements for Launch, Upper-Stage and Space Vehicles](https://ntrl.ntis.gov/NTRL/dashboard/searchResults/titleDetail/ADA619375.xhtml), U.S. Space and Missile Systems Center / NTIS

## Files replaced by the package

* `src/content/blog/part1.json`
* `src/content/blog/part2.json`
* `src/content/blog/part3.json`
* `src/content/blog/part4.json`
* `src/content/blog/part5.json`
* `src/lib/blogContent.ts`
* `src/lib/blog.ts`
* `src/pages/blog/GeneratedPost.tsx`
* `src/pages/blog/BlogArticlePage.tsx`

## Files patched by the package

* `src/i18n/locales/en/blog.json`
* `src/i18n/locales/de/blog.json`
* `src/i18n/locales/en/seo.json`
* `src/i18n/locales/de/seo.json`
* `src/content/blog/legacy.json`

## Validation performed

* All five generated JSON part files parse successfully.
* Exactly 22 generated article keys and bilingual slugs are unique.
* All related-article keys resolve against generated or legacy entries.
* Every generated article has bilingual search intent and at least two HTTPS references.
* Replacement TypeScript and TSX files pass TypeScript 5.8 syntax checking with `--noCheck`.
* The apply script was executed against a synthetic repository fixture and the resulting content passed the package validator.

A full Vite production build cannot be executed inside this environment because the complete repository and installed dependencies are not available through the read-only connector. The package prints the exact lint, test and build commands to run after application.
