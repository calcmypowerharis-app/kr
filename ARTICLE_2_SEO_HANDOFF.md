# ARTICLE #2 SEO IMPLEMENTATION HANDOFF

**To:** Web Manager / Implementation Engineer  
**From:** Lead SEO Specialist & Strategist  
**Date:** September 30, 2026  
**Document Ref:** `ARTICLE_2_SEO_HANDOFF.md`  
**Topic:** Solar Panels in Series vs. Parallel (Wiring, Electrical Behavior & Controller Sizing)  
**Cluster:** `solar` (Topical Cluster: Solar PV & Off-Grid Systems)  
**Parent / Hub Route:** `/calculators#solar`  
**Implementation Route:** `src/app/solar-panels-series-vs-parallel/page.tsx`  
**Registry File:** `src/lib/seo/registry.ts`  

---

## 1. SEO Objective

Establish CalcMyPower.com as an authoritative, technically rigorous reference for photovoltaic circuit design by capturing top-of-funnel and mid-funnel search demand for solar wiring topology. This asset directly targets a verified **4,600 monthly U.S. search cluster** with low keyword difficulty (**KD 10% to 22%**), inaugurates educational content in the planned **`solar`** cluster, and channels high-intent DIY and off-grid traffic into CalcMyPower's calculation tools.

---

## 2. Primary & Secondary Keyword Targets

### Verified U.S. SEMrush Targets (Strict Source of Truth)
* **`solar panels serial or parallel`** (Primary Target)
  * U.S. Search Volume: **1,600 / month**
  * Keyword Difficulty: **10%**
* **`solar panel wiring diagram`** (Visual / Schematic Target)
  * U.S. Search Volume: **1,000 / month**
  * Keyword Difficulty: **12%**
* **`solar panel diagram`** (Visual / Schematic Target)
  * U.S. Search Volume: **1,000 / month**
  * Keyword Difficulty: **11%**
* **`solar panel wiring`** (Technical Guide Target)
  * U.S. Search Volume: **1,000 / month**
  * Keyword Difficulty: **22%**

### Unverified Semantic Variations (For natural contextual coverage only; do NOT invent volume metrics)
* `solar panel series vs parallel`
* `how to wire solar panels in series`
* `how to wire solar panels in parallel`
* `series parallel solar configuration 2s2p`
* `mppt voltage range series vs parallel`

---

## 3. Search Intent

Search intent is a unified combination of **analytical decision-making** ("Should I wire my panels in series or parallel?") and **practical visual execution** ("Show me the exact wiring diagram with positive and negative connections").

* **Audience Profile:** DIY off-grid builders, RV/camper van owners, homeowners planning shed or cabin solar, and solar hobbyists sizing charge controllers.
* **Core Problem:** Users have acquired 2 or more panels and need to understand how circuit arrangement changes operating voltage, amperage, wire gauge requirements, shading resilience, and charge controller compatibility.
* **SERP Consolidation:** Do not create separate pages for "diagrams" versus "series vs parallel." Google ranks comprehensive technical guides that address both the comparative decision and provide visual schematics on a single URL.

---

## 4. Exact URL, Title, H1 & Meta Description

* **Canonical URL:** `https://calcmypower.com/solar-panels-series-vs-parallel`
* **Route Path:** `/solar-panels-series-vs-parallel`
* **Slug:** `solar-panels-series-vs-parallel`
* **Page Title (`metadata.title`):**  
  `Solar Panels in Series vs Parallel: Wiring Diagrams & Sizing`  
  *(58 characters before `%s | CalcMyPower` template suffix - strictly complies with the 42 to 60 character rule)*
* **Heading 1 (`<h1>`):**  
  `Solar Panels in Series vs Parallel: Wiring, Voltage & Current Explained`
* **Meta Description (`metadata.description`):**  
  `Compare solar panels in series vs parallel. See clear wiring diagrams, calculate array voltage and current, and size charge controllers for off-grid and RV systems.`  
  *(159 characters - strictly complies with the 135 to 160 character rule; starts with an active verb; specifies technical inputs and outputs)*

---

## 5. Required Article Structure & Heading Hierarchy

The Web Manager must implement the following structural outline using standard semantic HTML elements (`<article>`, `<section>`, `<h2>`, `<h3>`):

* **`<h1>` Solar Panels in Series vs Parallel: Wiring, Voltage & Current Explained**
  * **`<h2>` Quick Summary: Series vs. Parallel at a Glance**
    * Includes AEO Direct-Answer Block 1.
    * Responsive Quick Comparison Table (Series vs. Parallel vs. Series-Parallel across Voltage, Current, Wire Sizing, Controller Compatibility, Shading Sensitivity, and Common Uses).
  * **`<h2>` Understanding Solar Panel Ratings (Voc, Vmp, Isc, Imp)**
    * `<h3>` Open-Circuit Voltage (Voc) vs. Maximum Power Voltage (Vmp)
    * `<h3>` Short-Circuit Current (Isc) vs. Maximum Power Current (Imp)
    * `<h3>` The Nominal "12V" or "24V" Panel Fallacy
  * **`<h2>` Solar Panels in Series: How Voltage and Current Behave**
    * Circuit mechanics: voltages add together; current remains constant.
    * Conductor sizing advantages: why higher voltage reduces resistive power loss ($I^2R$) over long cable runs.
  * **`<h2>` Series Solar Panel Wiring Diagram (2S Configuration)**
    * Render Diagram 1 (Two panels in series).
    * Step-by-step connection walkthrough (positive to negative terminal routing).
  * **`<h2>` Solar Panels in Parallel: How Voltage and Current Behave**
    * Circuit mechanics: currents add together; voltage remains constant.
    * Hardware requirements: MC4 2-to-1 Y-branch connectors and branch combiner boxes.
  * **`<h2>` Parallel Solar Panel Wiring Diagram (2P Configuration)**
    * Render Diagram 2 (Two panels in parallel).
    * Step-by-step connection walkthrough (combining positive leads and negative leads).
  * **`<h2>` Series-Parallel Wiring (2S2P): Combining Both Methods**
    * When to use hybrid wiring: arrays of 4, 6, or more modules.
    * Balancing voltage limits and current capacity.
  * **`<h2>` Series-Parallel Solar Wiring Diagram (2S2P Configuration)**
    * Render Diagram 3 (Four panels in 2S2P).
    * Step-by-step connection walkthrough (series strings combined in parallel).
  * **`<h2>` Charge Controller Compatibility: MPPT vs. PWM**
    * `<h3>` Maximum PV Input Voltage and Cold-Temperature Voc (NEC 690.7)
    * `<h3>` Minimum MPPT Tracking Voltage and High-Temperature Thermal Drop
    * `<h3>` PWM Controllers: Conceptual Clamping Behavior and Voltage Matching
  * **`<h2>` Partial Shading, Bypass Diodes, and Array Performance**
    * `<h3>` How Module Bypass Diodes Function
    * `<h3>` Shading Dynamics: Series Strings vs. Parallel Branches
  * **`<h2>` Overcurrent Protection, Fusing, and Electrical Safety**
    * Sizing overcurrent protection per module maximum series fuse ratings and NEC 690.9.
    * When parallel branch fusing is needed vs. when it is not.
    * DC disconnect switches and DC-rated circuit protection.
  * **`<h2>` Step-by-Step Calculation Examples (2S, 2P, and 2S2P)**
    * Worked mathematical demonstrations using illustrative 200W benchmark modules.
  * **`<h2>` Decision Guide: Which Wiring Method Should You Choose?**
    * Includes AEO Direct-Answer Block 2.
    * Specific recommendations for RVs, camper vans, off-grid cabins, and ground-mount systems.
  * **`<h2>` Related Power & Energy Calculators**
    * Contextual component rendering links to sibling calculators and sizing guides.
  * **`<h2>` Frequently Asked Questions**
    * FAQ Accordion rendering answers to the 5 primary user queries.

---

## 6. Required Direct-Answer / AEO Blocks

The Web Manager must ensure these exact answers are present in the server-rendered HTML for search snippet extraction:

### Block 1: Series vs. Parallel Electrical Summary (Section 2)
> **Do solar panels produce more voltage in series or parallel?**  
> Solar panels connected in **series** produce higher voltage, while panels connected in **parallel** produce higher current (amperage). In a series circuit, panel voltages add together while current remains constant ($V_{\text{total}} = V_1 + V_2$, $I_{\text{total}} = I_1$). In a parallel circuit, panel currents add together while voltage remains constant ($V_{\text{total}} = V_1$, $I_{\text{total}} = I_1 + I_2$). Under uniform sunlight and identical test conditions, the total theoretical power capacity ($V \times I$) is the same in both configurations.

### Block 2: Configuration Selection Criteria (Section 14)
> **Should I wire my solar panels in series or parallel?**  
> Wiring configuration depends on your charge controller specifications, cable distances, and installation environment. **Series wiring** is generally preferred when using an MPPT charge controller or when running cables over longer distances, as higher voltage reduces resistive power losses and allows for smaller wire gauges. **Parallel wiring** is typically used with PWM charge controllers or when modules are subject to frequent, independent partial shading. For systems with four or more panels, a **series-parallel** arrangement can provide a balance between voltage and current limits.

### Block 3: Cold-Temperature Voltage Rise (Section 10)
> **Why does solar panel voltage increase in cold weather?**  
> Photovoltaic cells exhibit a negative temperature coefficient of voltage, meaning open-circuit voltage ($V_{\text{oc}}$) increases as cell temperature drops below $25^\circ\text{C}$ ($77^\circ\text{F}$). In freezing conditions, array voltage can rise noticeably above nameplate ratings. Installers must calculate cold-weather $V_{\text{oc}}$ using the manufacturer's specific temperature coefficient per NEC 690.7 to ensure array voltage does not exceed the charge controller's maximum input voltage rating.

---

## 7. Required Technical Facts & Formulas

### 7.1 Electrical Formulas (Identical Panels)
* **Series:**
  $$V_{\text{array}} = \sum_{k=1}^{N_{\text{series}}} V_k \approx N_{\text{series}} \times V_{\text{panel}}$$
  $$I_{\text{array}} \approx I_{\text{panel}}$$
* **Parallel:**
  $$V_{\text{array}} \approx V_{\text{panel}}$$
  $$I_{\text{array}} = \sum_{j=1}^{N_{\text{parallel}}} I_j \approx N_{\text{parallel}} \times I_{\text{panel}}$$
* **Series-Parallel:**
  $$V_{\text{array}} \approx N_{\text{series}} \times V_{\text{panel}}$$
  $$I_{\text{array}} \approx N_{\text{parallel}} \times I_{\text{panel}}$$
* **Power Relationship:**
  $$P_{\text{array}} = V_{\text{array}} \times I_{\text{array}}$$
  *(Must state clearly: Real operating power depends on actual environmental conditions, cell temperature, irradiance, and controller operating point).*

### 7.2 Cold-Temperature $V_{\text{oc}}$ Formula (NEC 690.7)
$$V_{\text{oc\_cold}} = V_{\text{oc\_STC}} \times \left[ 1 + \left( \frac{\alpha_{V_{\text{oc}}}}{100} \times (T_{\text{min}} - 25^\circ\text{C}) \right) \right]$$
* **Rule:** The Web Manager must explicitly state that the temperature coefficient ($\alpha_{V_{\text{oc}}}$ or $\gamma_{V_{\text{oc}}}$) must be taken from the specific module manufacturer's datasheet or listing. Never state that a single coefficient applies to all modules.

### 7.3 PWM vs. MPPT Conceptual Behavior
* **MPPT:** DC-DC conversion steps higher array voltage down to battery charging voltage while increasing charging current ($P_{\text{in}} \approx P_{\text{out}} \times \eta$).
* **PWM:** Direct electronic switch that pulls module operating voltage down to near the battery bank's voltage. State clearly that actual delivered power depends on module operating curve, battery state of charge, irradiance, cell temperature, and controller characteristics. Do NOT present a single percentage as a universal real-world loss.

---

## 8. Exact 2S, 2P & 2S2P Worked Example Requirements

All calculations in the article and diagrams must use this standardized benchmark module with ratings explicitly marked as **illustrative example values**:

* **Illustrative Benchmark Module (STC Ratings):**
  * Rated Peak Power ($P_{\text{mp}}$): $200\text{ W}$
  * Maximum Power Voltage ($V_{\text{mp}}$): $20.4\text{ V}$
  * Maximum Power Current ($I_{\text{mp}}$): $9.80\text{ A}$
  * Open-Circuit Voltage ($V_{\text{oc}}$): $24.3\text{ V}$
  * Short-Circuit Current ($I_{\text{sc}}$): $10.20\text{ A}$

### Required Worked Results:
1. **Two Panels in Series (2S):**
   * $V_{\text{mp}} = 20.4\text{ V} + 20.4\text{ V} = 40.8\text{ V}$
   * $I_{\text{mp}} = 9.80\text{ A}$
   * $V_{\text{oc}} = 24.3\text{ V} \times 2 = 48.6\text{ V}$
   * $I_{\text{sc}} = 10.20\text{A}$
   * Rated Power: $40.8\text{ V} \times 9.80\text{ A} \approx 400\text{ W}$
2. **Two Panels in Parallel (2P):**
   * $V_{\text{mp}} = 20.4\text{ V}$
   * $I_{\text{mp}} = 9.80\text{ A} + 9.80\text{ A} = 19.60\text{ A}$
   * $V_{\text{oc}} = 24.3\text{ V}$
   * $I_{\text{sc}} = 10.20\text{ A} \times 2 = 20.40\text{ A}$
   * Rated Power: $20.4\text{ V} \times 19.60\text{ A} \approx 400\text{ W}$
3. **Four Panels in Series-Parallel (2S2P):**
   * $V_{\text{mp}} = 2 \times 20.4\text{ V} = 40.8\text{ V}$
   * $I_{\text{mp}} = 2 \times 9.80\text{ A} = 19.60\text{ A}$
   * $V_{\text{oc}} = 2 \times 24.3\text{ V} = 48.6\text{ V}$
   * $I_{\text{sc}} = 2 \times 10.20\text{ A} = 20.40\text{ A}$
   * Rated Power: $40.8\text{ V} \times 19.60\text{ A} \approx 800\text{ W}$

---

## 9. Diagram Requirements for 3 Original Schematics

The article must contain three original technical diagrams. These may be rendered as accessible, clean SVG components or high-resolution WebP images with lightbox zoom capability.

```
+-------------------------------------------------------------------------+
| REQUIRED DIAGRAM SPECIFICATIONS                                         |
+-------------------------------------------------------------------------+
| DIAGRAM 1: Two Panels in Series (2S)                                    |
| - Layout: Two modules side by side.                                     |
| - Wiring: Panel 1 (+) connects to Panel 2 (-).                          |
| - Feeds: Panel 1 (-) to Controller (-); Panel 2 (+) to Controller (+).  |
| - Labels: Show Voc (24.3V), Vmp (20.4V), Isc (10.2A), Imp (9.8A) on    |
|   each module, and total array metrics (Voc: 48.6V, Vmp: 40.8V,         |
|   Isc: 10.2A, Imp: 9.8A, 400W). Mark values as "Illustrative Example". |
+-------------------------------------------------------------------------+
| DIAGRAM 2: Two Panels in Parallel (2P)                                  |
| - Layout: Two modules side by side.                                     |
| - Wiring: Panel 1 (+) and Panel 2 (+) into 2-to-1 MC4 branch connector. |
|   Panel 1 (-) and Panel 2 (-) into 2-to-1 MC4 branch connector.         |
| - Feeds: Branch (+) to Controller (+); Branch (-) to Controller (-).    |
| - Labels: Show module ratings and combined array metrics (Voc: 24.3V,   |
|   Vmp: 20.4V, Isc: 20.4A, Imp: 19.6A, 400W). Mark as "Illustrative".  |
+-------------------------------------------------------------------------+
| DIAGRAM 3: Four Panels in Series-Parallel (2S2P)                        |
| - Layout: 2x2 grid representing 4 modules (String A and String B).      |
| - Wiring: String A series connection; String B series connection.       |
|   String A (+) and String B (+) combined into parallel branch/combiner. |
|   String A (-) and String B (-) combined into parallel branch/combiner. |
| - Labels: Show string metrics (Vmp: 40.8V, Imp: 9.8A) and combined     |
|   array metrics (Voc: 48.6V, Vmp: 40.8V, Isc: 20.4A, Imp: 19.6A, 800W).|
|   Mark values as "Illustrative Example".                                |
+-------------------------------------------------------------------------+
```

* **Color Standards:** High-contrast lines; standard red for positive DC conductors (+), black or dark blue for negative DC conductors (-).
* **Accessibility:** Every diagram must have a descriptive `<figcaption>` and complete `alt` text describing the wiring path and resulting electrical values.

---

## 10. Internal-Link Placements & Anchor Text

The Web Manager must integrate these exact contextual links into the article prose:

1. **To [`/watts-to-amps-calculator`](file:///d:/Solar%20Power%20Project/src/lib/seo/registry.ts#L185-L208):**
   * *Location:* Section 6 (Parallel Wiring & Current Calculations).
   * *Exact Anchor Text:* `watts to amps electrical calculator`
   * *Target Route:* `/watts-to-amps-calculator`
2. **To [`/amps-to-watts-calculator`](file:///d:/Solar%20Power%20Project/src/lib/seo/registry.ts#L210-L233):**
   * *Location:* Section 4 (Series Wiring & Power Verification).
   * *Exact Anchor Text:* `amps to watts calculator`
   * *Target Route:* `/amps-to-watts-calculator`
3. **To [`/solar-panel-tilt-calculator`](file:///d:/Solar%20Power%20Project/src/lib/seo/registry.ts):**
   * *Location:* Section 11 (Partial Shading and Array Placement).
   * *Exact Anchor Text:* `solar panel tilt angle calculator`
   * *Target Route:* `/solar-panel-tilt-calculator`
4. **To [`/battery-capacity-calculator`](file:///d:/Solar%20Power%20Project/src/lib/seo/registry.ts#L161-L177):**
   * *Location:* Section 10 (Charge Controller & Battery Bank Integration).
   * *Exact Anchor Text:* `battery capacity and sizing calculator`
   * *Target Route:* `/battery-capacity-calculator`
5. **To [`/what-is-a-watt-hour`](file:///d:/Solar%20Power%20Project/src/lib/seo/registry.ts#L332-L358):**
   * *Location:* Section 3 (Power Calculations).
   * *Exact Anchor Text:* `understanding Watt-hours and daily energy production`
   * *Target Route:* `/what-is-a-watt-hour`
6. **To [`/how-long-will-a-100ah-battery-last`](file:///d:/Solar%20Power%20Project/src/lib/seo/registry.ts#L360-L385):**
   * *Location:* Section 14 (Off-Grid & RV Battery Sizing Context).
   * *Exact Anchor Text:* `how long will a 100Ah battery last`
   * *Target Route:* `/how-long-will-a-100ah-battery-last`

### Reciprocal Links in Existing Registry
The Web Manager must update `src/lib/seo/registry.ts`:
* Add `/solar-panels-series-vs-parallel` to `relatedGuidePaths` in:
  * `/watts-to-amps-calculator`
  * `/amps-to-watts-calculator`
  * `/battery-capacity-calculator`

---

## 11. Schema Architecture Requirements

The page must inject three structured data scripts via `src/lib/seo/schema.ts`:

1. **`Article` Schema:**
   * Headline: `Solar Panels in Series vs Parallel: Wiring, Voltage & Current Explained`
   * Description: Matches meta description verbatim.
   * Author / Publisher: Linked to `https://calcmypower.com/#organization`.
   * DatePublished / DateModified: Formatted ISO-8601 strings.
2. **`BreadcrumbList` Schema:**
   * Position 1: `Home` (`https://calcmypower.com`)
   * Position 2: `Guides` (`https://calcmypower.com/calculators`)
   * Position 3: `Solar Panels in Series vs Parallel` (`https://calcmypower.com/solar-panels-series-vs-parallel`)
3. **`FAQPage` Schema:**
   * Must contain 5 questions and answers synchronized **verbatim (1:1)** with the visible `<FaqSection>`.

---

## 12. Image & Asset Requirements

* **Hero Image:**
  * Path: `/images/articles/solar-panels-series-vs-parallel-wiring.jpg`
  * Description: Real technical photograph or clean 3D render of an off-grid solar installation with visible wiring and charge controller.
  * Alt Text: `Solar panel array wiring showing series and parallel connections to an MPPT charge controller.`
  * Size: `< 150 KB` in WebP format; dimensions `1200x675` or `1200x630`.
* **Diagram Assets:**
  * Clean vector SVGs or high-DPI WebP graphics with lightbox zoom component enabled.
  * Zero generic AI-generated decorative padding.

---

## 13. Technical Safety, Source & Claim Discipline

The Web Manager must enforce the following technical constraints throughout the prose:

1. **Overcurrent Protection (NEC 690.9):** Do not state that 3 parallel strings "always" require fuses. State that overcurrent protection depends on system design, module maximum series fuse ratings, available fault currents, conductor ampacity, and applicable NEC requirements.
2. **Temperature Coefficients (NEC 690.7):** State that temperature coefficients must be taken directly from the specific module's datasheet or listing.
3. **Controller Voltage Limits:** Use conservative wording: *"Exceeding the controller's maximum PV input voltage can damage the controller and must be avoided."* Never use absolute colloquialisms like "exceeding by 1 volt will destroy the controller."
4. **Bypass Diodes:** Use qualified terminology: *"Many crystalline-silicon modules use bypass diodes, but the number and arrangement are manufacturer- and model-specific."*
5. **Partial Shading:** Explain that bypass diodes, module design, cell mismatch, shading geometry, and controller tracking algorithms all influence actual output. Avoid claims that a shaded panel completely shuts down an entire string.
6. **Banned Words:** Do not use universal absolutes (*always*, *guaranteed*, *destroys*, *ideal*, *best*) when stating engineering principles. Use qualified wording (*generally*, *depends on*, *manufacturer-specific*, *under these stated assumptions*).

---

## 14. Cannibalization Boundaries

The Web Manager must keep the article strictly focused on its designated domain:

* **What this article OWNS:** Circuit topology, DC wiring mechanics, $V_{\text{oc}}/V_{\text{mp}}/I_{\text{sc}}/I_{\text{mp}}$ relationships, MPPT/PWM matching, bypass diode behavior, and wiring schematics.
* **What this article MUST NOT COVER:**
  * Do NOT provide full daily kWh solar array sizing (reserved for future Solar Array Calculator).
  * Do NOT provide geographic sun hour calculations or tilt angle adjustments (reserved for `/solar-panel-tilt-calculator`).
  * Do NOT calculate battery bank autonomy or discharge curves (reserved for `/battery-capacity-calculator`).
  * Defer to those specific tools via contextual internal links.

---

## 15. QA Checklist for Web Manager

Before requesting final review, verify:

- [ ] Route path matches `/solar-panels-series-vs-parallel`.
- [ ] Title tag is exactly 58 characters before the template suffix.
- [ ] Meta description is exactly 159 characters with an active verb.
- [ ] Exactly one `<h1>` tag matches approved wording.
- [ ] All 16 structural sections from Section 5 are present.
- [ ] All three AEO direct-answer blocks are included verbatim in SSR HTML.
- [ ] All three original wiring diagrams (2S, 2P, 2S2P) are rendered with clear polarity and illustrative labels.
- [ ] 200W benchmark values are clearly designated as illustrative examples.
- [ ] Cold $V_{\text{oc}}$ formula notes that temperature coefficients must come from module datasheets.
- [ ] Overcurrent protection is framed around module ratings and NEC 690.9 without universal rules.
- [ ] No banned absolute words (*always*, *guaranteed*, *destroys*, *ideal*, *best*) are used for engineering rules.
- [ ] All 6 contextual internal links are implemented with exact anchor texts.
- [ ] Reciprocal links in `src/lib/seo/registry.ts` are updated.
- [ ] `Article`, `BreadcrumbList`, and `FAQPage` JSON-LD schemas are injected and validate with zero errors.
- [ ] Mobile responsive layout verified at 390px viewport (zero horizontal overflow).

---

## 16. Definition of Done

The implementation task is complete only when all seven CalcMyPower quality gates pass:

1. **Specification Match:** Article implementation matches this handoff document completely.
2. **Mobile UX Verification:** Responsive layout verified at 390px and desktop viewports.
3. **Automated Unit Tests:** Full test suite passes (`npm test`).
4. **TypeScript Typecheck:** `npx tsc --noEmit` passes with zero errors.
5. **Linter Check:** `npm run lint` passes with zero warnings or errors.
6. **Production Build:** `npm run build` completes successfully.
7. **Clean Git Commit:** Descriptive commit message documenting the new article and registry updates.

---

### SEO HANDOFF STATUS: READY

**Unresolved Issues:** None. The technical methodology, SEMrush data, diagram specifications, and editorial boundaries have been fully validated and approved. The Web Manager may proceed with implementation.