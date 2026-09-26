# CalcMyPower — Quality Assurance Report (QA_REPORT.md)

**Date:** 2026-09-24  
**Auditor / Implementation Engineer:** Antigravity (Gemini 3.8 Flash High)  
**Lead / Strategist:** ChatGPT + Project Owner  
**Tools Evaluated:** Homepage (`/`) and UPS & Battery Backup Run-Time Hours Calculator (`/ups-battery-backup-calculator`)  
**Live Test Target:** Local Next.js 15 production server on `http://localhost:3001`  

---

## 1. Executive Summary
A comprehensive browser-based QA was executed using Chrome DevTools MCP and DOM inspection across Desktop (1280×800), Tablet (768×1024), and Mobile (390×844) viewports. Core calculation math, responsive layout, DOM hydration, keyboard accessibility, JSON-LD schemas, and meta tags were evaluated against `GEMINI.md` requirements.

All visual refinements requested in the Lead Visual Review were implemented and verified with zero regression.

Overall Status: **PASSED (Production-Ready)**.

---

## 2. Detailed Findings by Category

| # | Inspection Item | Status | Verified Observation / Detail |
|---|---|---|---|
| 1 | **Desktop Layout (1280×800)** | **Confirmed** | Clean 12-column grid: 7 cols for input parameters, 5 cols sticky sidebar for the result card and Amazon hardware cards. Zero horizontal overflow. |
| 2 | **Mobile Layout (390×844)** | **Confirmed** | Single-column stacked layout. Preset buttons wrap cleanly with adequate touch targets. Input fields and dropdowns fit the mobile screen width with zero side-scrolling. 2-column mobile category grid. |
| 3 | **Tablet Layout (768×1024)** | **Confirmed** | Fluid responsiveness across breakpoints. Header navigation and input controls maintain readable margins and padding. |
| 4 | **Navigation & Branding** | **Confirmed** | Header logo links to `/`, subtitle updated to calm "Power Calculators". "UPS Runtime" and "All Calculators" link to their respective routes. Footer contains complete site directory, Amazon Associates disclosure, and NEC disclaimer. |
| 5 | **Input Usability** | **Confirmed** | Numeric inputs allow direct typing or stepper adjustments. Quick appliance presets (Laptop 120W, Gaming PC 450W, Router 30W, CPAP 60W, etc.) instantly populate the load input. |
| 6 | **Error & Edge States** | **Confirmed** | Zero Watts input correctly outputs "Indefinite (No Load)" with a guidance warning. Negative inputs are sanitized to 0. Division by zero is prevented. |
| 7 | **Result Readability & Prominence** | **Confirmed** | Primary runtime metric updated to high-contrast `text-6xl font-black` with custom status badge. Visually dominant while preserving clean structure. |
| 8 | **Formula Section** | **Confirmed** | Renders clear formula code box `T = [ V × Ah × DoD × η ] / P` with definitions for every variable, symbol, and unit. |
| 9 | **Worked Example Section** | **Confirmed** | Step-by-step worked example with real numbers (12V 100Ah LiFePO4 battery powering a 130W home office workstation = 7 hr 4 min). |
| 10 | **Assumptions Section** | **Confirmed** | Detailed table documenting Lead-Acid 50% DoD, LiFePO4 90% DoD, 85% inverter conversion efficiency, and temperature variables. |
| 11 | **Safety Disclaimer** | **Confirmed** | High-visibility warning box citing NEC Articles 480 & 706, battery ventilation, wire ampacity, and certified electrician advisories. |
| 12 | **FAQ Accordion** | **Confirmed** | Interactive accordion toggles cleanly with accessible chevron rotation and zero layout jumping. |
| 13 | **Related Calculators** | **Confirmed** | Internal links established to Watts to Amps Converter, Wire Size Calculator, and Solar Sizing Hub. |
| 14 | **Typography & Font Scale** | **Confirmed** | System UI font stack loads instantly without FOIT/FOUT. Crisp font weights (`font-black`, `font-bold`, `font-semibold`). |
| 15 | **Spacing & Layout Rhythm** | **Confirmed** | Consistent 8px spacing grid using Tailwind (`space-y-6`, `p-6`, `gap-4`). |
| 16 | **Accessibility (a11y)** | **Confirmed** | All form controls have explicit `<label for="...">` associations and `aria-describedby` helper texts. Tap targets exceed 44×44px. |
| 17 | **Keyboard Navigation** | **Confirmed** | Tab order navigates logically from logo -> nav links -> preset buttons -> inputs -> selects -> accordion buttons. |
| 18 | **Visible Focus States** | **Confirmed** | Input elements display prominent blue focus ring (`focus:ring-2 focus:ring-blue-100 focus:border-blue-600`). Native browser focus outlines verified on buttons. |
| 19 | **Console Errors** | **Confirmed** | Zero JavaScript runtime exceptions or hydration mismatches in the console. |
| 20 | **Hydration & SSR** | **Confirmed** | HTML rendered from server matches client DOM tree 100% on initial paint. |

---

## 3. Rendered HTML & SEO Meta Inspection

Verified via direct inspect of rendered production HTML (`page_dump.html`):
- **`<title>`:** `UPS Battery Backup Run-Time Hours Calculator | CalcMyPower` (**Confirmed**)
- **`<meta name="description">`:** `Accurately calculate uninterruptible power supply (UPS) backup hours and battery run-time based on appliance wattage, battery voltage, and Amp-hour capacity.` (**Confirmed**)
- **`<link rel="canonical">`:** `https://calcmypower.com/ups-battery-backup-calculator` (**Confirmed**)
- **Open Graph:**
  - `og:title`: `UPS &amp; Battery Backup Run-Time Calculator | CalcMyPower` (**Confirmed**)
  - `og:description`: `Find out exactly how many hours your UPS or battery backup system will run your appliances during a power outage.` (**Confirmed**)
  - `og:url`: `https://calcmypower.com/ups-battery-backup-calculator` (**Confirmed**)
  - `og:type`: `website` (**Confirmed**)
- **`<meta name="robots">`:** `index, follow` (**Confirmed**)
- **Favicon Asset:** Generated [`src/app/icon.svg`](file:///d:/Solar%20Power%20Project/src/app/icon.svg); verified served as static `/icon.svg` route with 0 errors. (**Confirmed**)
- **JSON-LD `WebApplication` Schema:** Includes name, description, applicationCategory (`UtilitiesApplication`), operatingSystem (`All`), free offer (`$0 USD`). (**Confirmed**)
- **JSON-LD `BreadcrumbList` Schema:** Breadcrumb chain `Home` -> `Calculators` -> `UPS Battery Backup Run-Time Calculator`. (**Confirmed**)
- **JSON-LD `FAQPage` Schema:** Contains 2 Q&A pairs matching page content. (**Confirmed**)

---

## 4. Phase B: Formula & Mathematics Review

### Battery Energy & Usable Capacity:
$$E_{total} = V_{nominal} \times Ah_{nominal}$$
$$E_{usable} = E_{total} \times DoD \times \eta$$

- **LiFePO4 Chemistry:** Default DoD set to 90% (0.90). This aligns with manufacturer specifications allowing 80–90% daily discharge without rapid cell degradation.
- **Lead-Acid (SLA/AGM/Gel):** Default DoD set to 50% (0.50). This aligns with IEEE Standard 485 to prevent lead sulfation.
- **Inverter Efficiency ($\eta$):** Default set to 85% (0.85). Modern pure sine wave inverters average 85–92% full-load efficiency. 85% represents an honest, conservative engineering baseline.
- **DC Current Calculation:**
  $$I_{DC} = \frac{P_{load}}{V_{nominal} \times \eta}$$
  Mathematically verified. For 150W at 12V with 85% efficiency:
  $$I_{DC} = \frac{150}{12 \times 0.85} = 14.705\text{ A} \rightarrow 14.7\text{ A}$$
- **Peukert Effect Handling:** Lead-acid batteries subjected to discharge rates > 0.2C trigger an engineering note: *"Discharge rate is high for Lead-Acid batteries. Due to Peukert's effect, actual runtime may be 15–30% shorter."*
- **Continuous Sizing Safety Factor:** Inverter sizing incorporates the NEC 125% continuous duty rule ($P \times 1.25$).

*Conclusion of Formula Review:* The mathematical engine is robust, transparent, and verified against independent hand calculations.

---

## 5. Visual Refinements & Architecture Verification (Lead Review Changes)

1. **Homepage Information Architecture:**
   - Added a dedicated "Browse by Power Category" grid covering all 8 core disciplines: **UPS & Backup, Electrical, Solar, Battery, Electricity, Generator, RV Power, and EV Charging**.
   - Active tool links directly to `/ups-battery-backup-calculator`; planned categories are visibly tagged with `"Planned"` badges, strictly avoiding dead links or fake pages.
2. **Trust Copy Audit:**
   - Removed marketing exaggeration ("Engineering-grade", "NEC Aligned").
   - Replaced with grounded technical phrasing: *"Precision Power & Energy Calculators"*, *"Formulas derived from standard electrical physics, Ohm's law, and established energy storage equations"*, and *"Standard Safety Margins: Incorporates standard 125% continuous duty references where relevant for circuit planning"*.
3. **UPS Result Card Prominence:**
   - Enhanced primary runtime result typography (`text-4xl sm:text-5xl md:text-6xl font-black`) with a dedicated blue status pill badge (`Clock` icon + title).
4. **Affiliate Block Hierarchy:**
   - Subordinated Amazon hardware reference card with muted borders (`border-slate-200/80`) and subdued typography, keeping it strictly secondary to the calculation tool.
5. **Mobile Verification:**
   - Verified 2-column mobile category layout and stacked calculator interface on 390×844 viewport. No layout shifts or usability defects found.

---

## 6. Phase C: Watts to Amps Electrical Calculator QA & Verification

**Route Tested:** `/watts-to-amps-calculator`  
**Test Target:** Local Next.js 15 production server on `http://localhost:3001`  
**Automated Unit Tests:** 13/13 passing in `src/lib/calculators/__tests__/watts-to-amps.test.ts` (19/19 suite-wide)

### 6.1 Viewport & Responsive Design Verification
- **Desktop (1280×800):** Tested and confirmed. Clean 2-column layout (7 cols inputs, 5 cols sticky results & diagnostic tools).
- **Tablet (768×1024):** Tested and confirmed. Responsive stacked layout with consistent padding and typography hierarchy.
- **Mobile (390×844):** Tested and confirmed. Preset buttons wrap cleanly, form controls stack naturally, and touch targets exceed 44×44px with zero horizontal scroll.

### 6.2 Electrical Formulas & Calculation Modes Verified
1. **Direct Current (DC):**
   $$I = \frac{P}{V}$$
   - Preset Verified: Solar Panel (100W @ 12V DC) $\rightarrow$ 8.33 A (125% Continuous Reference: 10.42 A).
   - Reactive power factor input is automatically hidden, displaying: *"DC circuits have no phase shift; power factor is inherently 1.0."*
2. **AC Single-Phase:**
   $$I = \frac{P}{V \times PF}$$
   - Presets Verified:
     - Space Heater (1,500W @ 120V, PF 1.0) $\rightarrow$ 12.50 A (125% Continuous Reference: 15.63 A).
     - Microwave (1,200W @ 120V, PF 1.0) $\rightarrow$ 10.00 A (125% Continuous Reference: 12.50 A).
     - Clothes Dryer (5,000W @ 240V, PF 1.0) $\rightarrow$ 20.83 A (125% Continuous Reference: 26.04 A).
     - RV Air Conditioner (1,800W @ 120V, PF 0.85) $\rightarrow$ 17.65 A (Apparent Power: 2,118 VA).
3. **Balanced AC Three-Phase (Line-to-Line):**
   $$I = \frac{P}{\sqrt{3} \times V_{LL} \times PF}$$
   - Verified: 10,000W at 480V with PF 0.85 $\rightarrow$ 14.15 A (125% Continuous Reference: 17.69 A).
   - Card and UI explicitly display: *"Under 480V Balanced Three-Phase (Line-to-Line) (PF: 0.85)"*.
4. **Balanced AC Three-Phase (Line-to-Neutral):**
   $$I = \frac{P}{3 \times V_{LN} \times PF}$$
   - Verified: 10,000W at 277V with PF 0.85 $\rightarrow$ 14.16 A (125% Continuous Reference: 17.70 A).

### 6.3 Technical & Safety Guardrails Verified
- **Continuous-Load Planning:** Converted all breaker references to **"125% Continuous-Load Reference"** ($I \times 1.25$). Avoided misleading claims of "2.5A safety headroom" on 15A circuits for 1,500W continuous loads (since $15\text{ A} \times 0.80 = 12.0\text{ A}$, which 12.5A exceeds).
- **Conductor & Wire Sizing Separation:** Amperage alone does not determine wire gauge. Includes a prominent educational callout explaining the necessity of run length, permissible voltage drop (3%), and insulation temperature ratings (60°C/75°C/90°C), directly linking to the upcoming Wire Size & Voltage Drop Calculator.
- **Balanced Assumption Transparency:** Explicitly states the symmetrical balanced system condition in the UI selector, result badge, calculation methodology, and physical assumptions table.
- **Non-Silent Input Validation:**
  - Tested $V = 0$: Triggers `role="alert"` `aria-live="polite"` notice: *"Voltage must be greater than 0 Volts to calculate current."* Primary result displays `--` without mathematical exception or `Infinity`.
  - Tested Negative Watts: Non-silent notice displayed; safe fallback prevents arithmetic errors.
  - Tested $PF > 1.0$: Non-silent notice displayed; sanitized safely.
  - Tested High Current (>50A): Displays engineering advisory regarding dedicated heavy-duty wiring.

### 6.4 Console & SEO Audit
- **Console Messages:** 0 runtime errors, 0 warnings, 0 hydration mismatches, 0 accessibility issues.
- **Semantic HTML:** Preset group header uses semantic `<p>` tags; all inputs have explicit `<label for="...">` associations and `aria-describedby` helper texts.
- **SEO Metadata:** Title: *"Watts to Amps Calculator (DC, Single-Phase & 3-Phase AC) | CalcMyPower"*; canonical URL: `https://calcmypower.com/watts-to-amps-calculator`.
- **JSON-LD Schemas:** All 3 schemas verified in page head: `WebApplication`, `BreadcrumbList`, and `FAQPage` (5 comprehensive Q&As).
- **XML Sitemap:** Verified entry in `/sitemap.xml`.

---

## 7. Phase D: Generator Size Calculator QA & Verification

**Date:** 2026-09-26  
**Route Tested:** `/generator-size-calculator`  
**Test Target:** Local Next.js 15 production server on `http://localhost:3000`  
**Automated Unit Tests:** 12/12 passing in `src/lib/calculators/__tests__/generator-size.test.ts` (31/31 suite-wide)

### 7.1 Viewport & Responsive Design Verification
- **Desktop (1280×800):** Tested and confirmed (`scrollWidth: 1280`, `clientWidth: 1280`, `hasHorizontalOverflow: false`). Clean 12-column grid layout with interactive appliance selector and sticky right-hand capacity summary.
- **Tablet (768×1024):** Tested and confirmed (`scrollWidth: 753`, `clientWidth: 753`, `hasHorizontalOverflow: false`). Responsive stacked layout with full table usability.
- **Mobile (390×844):** Tested with true mobile touch emulation (`scrollWidth: 390`, `clientWidth: 390`, `hasHorizontalOverflow: false`). Quick scenario cards, category filter pills, and appliance cards stack cleanly without side-scrolling.

### 7.2 Four-Step Sizing Engine & Presets Verified
1. **Explicit Single-Motor Startup Limitation Banner:**
   - Verified prominent high-contrast amber alert at the top of the calculator: *"This practical planning model assumes that only one significant motor-driven load starts at a time. If multiple large motors can start simultaneously, generator sizing may require a more detailed manufacturer or engineering analysis."*
2. **Pre-Loaded Default Scenario ("Essential Outage — Editable"):**
   - Pre-loads Refrigerator (180W run / 1200W start), Sump Pump (800W run / 1800W start), Wi-Fi Router (25W), 4 rooms of LED Lighting (4 × 40W = 160W), and Phone Charger (15W).
   - Verified math:
     - $W_{\text{running}} = 1,180\text{ W}$
     - $\Delta W_{\max} = 1,020\text{ W}$ (Surge Driver: Refrigerator / Freezer)
     - $W_{\text{peak}} = 2,200\text{ W}$
     - $W_{\text{planning}} = 2,200 \times 1.25 = 2,750\text{ W}$ ($2.75\text{ kW}$)
     - Apparent Power ($PF = 0.80$ assumption): Planning = $3.44\text{ kVA}$, Running = $1.47\text{ kVA}$, Peak = $2.75\text{ kVA}$.
3. **Interactive Controls Verified:**
   - **Clear All Button:** Resets selected appliances to `0`, displays empty-state prompt, and sets all output metrics cleanly to `0`.
   - **Scenario Presets:** Switching to *"RV 30-Amp Summer"* recalculates to $3,650\text{ W}$ running, $+1,700\text{ W}$ surge (RV Rooftop AC), $5,350\text{ W}$ peak demand, and $6,688\text{ W}$ ($6.69\text{ kW}$) planning capacity ($8.36\text{ kVA}$).
   - **Inline Editing & Quantity Scaling:** Adjusting appliance quantity scales running watts while preserving the single-motor surge model. Editing running or starting watts inline immediately updates totals and re-evaluates the surge driver.
   - **Custom Load Entry:** Requires explicit Running Watts and Starting Watts (or "No motor surge / unknown" toggle setting Starting = Running). Verified zero arbitrary $2\times$ or $3\times$ multipliers.

### 7.3 Technical Guardrails, Safety & SEO Audit
- **Spec Sheet Matching Guide:** Instructs users to compare generator **Rated (Running) Watts** against Planning Capacity and **Surge (Starting) Watts** against Peak Starting Demand, avoiding arbitrary retail wattage buckets.
- **Safety Advisories:** Displays CDC & CPSC 20-foot outdoor placement rule for carbon monoxide prevention and cautious transfer equipment / interlock guidance preventing utility backfeeding.
- **Console & Accessibility Audit:** 0 console errors, 0 warnings, 0 hydration issues, and 0 DevTools accessibility form-field issues (all inline table spinbuttons, search inputs, and custom form inputs have explicit `id`, `name`, and `aria-label` or `<label htmlFor>` bindings).
- **SEO Metadata & JSON-LD:**
  - `<title>`: `Generator Size Calculator (Home Backup, RV & Portable) | CalcMyPower`
  - `<link rel="canonical">`: `https://calcmypower.com/generator-size-calculator`
  - JSON-LD: Verified `WebApplication`, `BreadcrumbList`, and `FAQPage` (5 Q&As) in rendered `<head>`.
  - Sitemap & Navigation: Verified `/generator-size-calculator` in `/sitemap.xml`, `/calculators`, and homepage `/` popular tools & active Generator category card.


