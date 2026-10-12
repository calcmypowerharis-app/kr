# CalcMyPower.com - Keyword Cannibalization Audit & Search Intent Mapping

**Document Owner:** Lead SEO Strategist  
**Date:** October 11, 2026  
**Status:** Read-Only Audit Report (Pre-Publishing & Strategy Assessment)  
**Scope:** Sitewide Content Inventory (35 Routes across 4 Active Topical Clusters)  
**Constraint Notice:** Absolute read-only execution. No production code, metadata, or Git branch modifications. Zero em-dashes utilized.

---

## 1. Executive Summary

This keyword cannibalization audit was conducted across CalcMyPower.com prior to selecting, drafting, or publishing any new content. The audit evaluates whether existing calculators and editorial guides compete against each other for identical search queries, split search engine impressions, dilute domain link equity, or present ambiguous search intents to Google.

### Core Audit Findings

1. **New Page Justification for "Electricity Usage Calculator": STRICT NO.**  
   Creating a new page or publishing a separate article for "electricity usage calculator" is completely unjustified. The domain already hosts an interactive tool at `/electricity-use-calculator` designed specifically for this purpose. In search algorithms and user intent, "use" and "usage" are direct synonyms for the identical tool intent. Creating a separate URL would create self-inflicted direct keyword cannibalization and violate Google helpful content guidelines.

2. **Primary Target URL Assignment:**  
   The authoritative primary URL for `electricity usage calculator` is and must remain:  
   `https://calcmypower.com/electricity-use-calculator`  
   An on-page metadata optimization is recommended (for a future approved batch) to incorporate "usage" into the title tag and H1 of this existing tool.

3. **Current Content Inventory Health:**  
   The site currently consists of 35 verified indexable routes:
   - 2 Core Hubs (`/`, `/calculators`)
   - 17 Interactive Calculators (Tool intent)
   - 16 In-Depth Editorial Guides (Informational intent)  
   Every route has a 1:1 registration in `src/lib/seo/registry.ts`, matching sitemap entries, and matching canonical tags.

4. **Cannibalization Risk Profile:**  
   - **Critical / High Severity Conflicts:** 0 detected. There are no duplicate calculators or identical-angle guides currently published on the site.
   - **Medium Severity Potential Overlaps:** 3 pairs identified (requiring distinct query mapping and metadata boundary enforcement):
     - `/electricity-use-calculator` vs. `/how-to-calculate-electricity-usage` (Tool vs. Educational Formula Guide).
     - `/electricity-use-calculator` vs. `/electricity-cost-calculator` (Energy Consumption in kWh vs. Financial Utility Bill in Dollars).
     - `/how-many-amp-hours-do-i-need` vs. `/how-to-calculate-amp-hours-of-a-battery-bank` (System Load Capacity Sizing vs. Multi-Battery Series/Parallel Wiring Calculations).
   - **Low Severity / Healthy Complementary Pairs:** 6 pairs confirmed as operating under healthy hub-and-spoke reciprocal linking.

---

## 2. Content Inventory & Topical Cluster Map

The site is organized into 4 active topical clusters with strict structural separation between interactive calculators and editorial guides.

### Cluster 1: Electricity & Circuit Sizing (`electricity`) - 9 Routes

| Route | Page Type | Primary Registered Keyword | Target Search Intent | Primary Value Proposition |
|---|---|---|---|---|
| `/electricity-use-calculator` | Calculator | `electricity use calculator` | Tool / Calculation | Calculates appliance energy consumption in Wh and kWh with duty cycle modeling. |
| `/electricity-cost-calculator` | Calculator | `electricity cost calculator` | Tool / Financial | Estimates monthly utility bills from billed kWh, tiered rates, customer fees, and taxes. |
| `/how-to-calculate-electricity-usage` | Guide | `how to calculate electricity usage` | Informational / Educational | Teaches the mathematical formula (kWh = W * h / 1000), duty cycles, and label reading. |
| `/how-to-calculate-electricity-bill` | Guide | `how to calculate electricity bill` | Informational / Educational | Explains utility rate tariffs, supply vs. delivery charges, and effective $/kWh rates. |
| `/what-is-a-watt-hour` | Guide | `watt hours` | Informational / Concept | Explains the physical difference between instantaneous power (Watts) and energy (Watt-hours). |
| `/watts-to-amps-calculator` | Calculator | `watts to amps calculator` | Tool / Circuit Conversion | Converts Watts to Amps across DC, 120V/240V AC, and 3-phase circuits with power factor. |
| `/amps-to-watts-calculator` | Calculator | `amps to watts` | Tool / Power Conversion | Converts Amps to Watts and apparent power (VA) for circuit breaker planning. |
| `/voltage-drop-calculator` | Calculator | `voltage drop calculator` | Tool / Circuit Sizing | Sizes wire gauges (AWG) to maintain NEC 3% branch circuit voltage drop standards. |
| `/three-phase-power-calculator` | Calculator | `3 phase electrical power calculator` | Tool / Industrial Circuit | Calculates balanced three-phase kW, kVA, line current, and power factor. |

### Cluster 2: Generators & Outage Backup (`generators`) - 9 Routes

| Route | Page Type | Primary Registered Keyword | Target Search Intent | Primary Value Proposition |
|---|---|---|---|---|
| `/generator-size-calculator` | Calculator | `generator size calculator` | Tool / Dynamic Sizing | Calculates home and portable generator wattage with motor surge deltas and 25% safety margins. |
| `/generator-wattage-chart` | Calculator | `wattage generator chart` | Reference / Lookup | Provides a benchmark lookup table of starting and running watts for 50+ household appliances. |
| `/generator-amperage-chart-calculator` | Calculator | `generator amperage chart` | Reference / Circuit Sizing | Converts generator kW/kVA into rated full-load Amps at 120V, 240V, and 3-phase voltages. |
| `/generator-fuel-consumption-calculator` | Calculator | `generator fuel consumption calculator` | Tool / Operating Logistics | Calculates fuel burn rate (gal/hr, lb/hr) and runtime across gas, propane, and diesel models. |
| `/how-much-gas-does-a-generator-use` | Guide | `how much gas does a generator use` | Informational / Benchmark | Practical benchmarks for generator hourly fuel use, load impacts, and fuel storage rules. |
| `/what-size-generator-do-i-need-for-my-house` | Guide | `what size generator do i need for my house` | Informational / Decision | Sizing methodology for whole-house emergency power based on essential circuits. |
| `/what-size-generator-to-run-a-refrigerator` | Guide | `what size generator to run a refrigerator` | Informational / Specific Appliance | Details refrigerator running watts, compressor startup inrush, and simultaneous loads. |
| `/how-to-calculate-watts-for-a-generator` | Guide | `calculating watts for generator` | Informational / Educational | Step-by-step tutorial on calculating running vs. starting surge watts manually. |
| `/continuous-power-generators` | Guide | `continuous power generators` | Informational / Technical | Explains ISO 8528 generator ratings (COP vs. PRP vs. ESP) and 1800 RPM continuous duty. |

### Cluster 3: UPS & Battery Storage (`ups-battery`) - 7 Routes

| Route | Page Type | Primary Registered Keyword | Target Search Intent | Primary Value Proposition |
|---|---|---|---|---|
| `/battery-capacity-calculator` | Calculator | `battery capacity calculator` | Tool / Sizing Requirement | Calculates required Amp-hours (Ah) and Watt-hours (Wh) from load, runtime, and DoD. |
| `/ups-battery-backup-calculator` | Calculator | `uninterruptible power supply hours` | Tool / Runtime Estimation | Estimates backup runtime hours from existing battery capacity, voltage, and load. |
| `/inverter-size-calculator` | Calculator | `inverter size calculator` | Tool / Component Sizing | Sizes DC-to-AC inverters, surge wattage, DC cable gauge (AWG), and fuse ratings. |
| `/how-many-amp-hours-do-i-need` | Guide | `how many amp hours do i need for a battery bank` | Informational / Sizing Decision | Sizing methodology for total bank capacity from daily appliance load profiles. |
| `/how-to-calculate-amp-hours-of-a-battery-bank` | Guide | `how to calculate amp hours of a battery bank` | Informational / Wiring Math | Step-by-step wiring formulas for Series, Parallel, and 2S2P battery configurations. |
| `/how-long-will-a-100ah-battery-last` | Guide | `12v 100ah battery` | Informational / Benchmark | Real-world runtime benchmarks for a 12V 100Ah battery across common appliances. |
| `/what-does-ah-mean-on-a-battery` | Guide | `what does ah mean on a battery` | Informational / Concept | Explains Amp-hour terminology, Peukert effect, C-rate, and chemistry depth of discharge. |

### Cluster 4: Solar PV & Off-Grid Systems (`solar`) - 8 Routes

| Route | Page Type | Primary Registered Keyword | Target Search Intent | Primary Value Proposition |
|---|---|---|---|---|
| `/solar-system-size-calculator` | Calculator | `solar system size calculator` | Tool / Array Sizing | Sizes residential solar array kW and annual kWh from monthly electricity usage. |
| `/solar-battery-calculator` | Calculator | `solar battery calculator` | Tool / Storage Sizing | Sizes off-grid battery storage based on solar daily production, night loads, and autonomy days. |
| `/solar-charge-controller-calculator` | Calculator | `solar charge controller calculator` | Tool / Component Sizing | Calculates MPPT and PWM charge controller amperage and cold-weather Voc voltage limits. |
| `/solar-panel-tilt-calculator` | Calculator | `solar panel angle calculator` | Tool / Geometry | Calculates seasonal optimal solar tilt angles and compares roof pitch slopes. |
| `/how-many-solar-panels-do-i-need` | Guide | `how many solar panels do i need to power my house` | Informational / Decision | Homeowner guide estimating panel count using regional peak sun hours and efficiency factors. |
| `/how-much-energy-does-a-solar-panel-produce` | Guide | `how much energy does a solar panel produce` | Informational / Benchmark | Daily and monthly kWh output benchmarks for standard 400W solar modules. |
| `/how-to-size-a-solar-charge-controller` | Guide | `how to size a solar charge controller` | Informational / Engineering | Step-by-step methodology for matching solar array Voc and Isc to MPPT and PWM controllers. |
| `/solar-panels-series-vs-parallel` | Guide | `solar panels serial or parallel` | Informational / Wiring & Design | Explains the electrical differences between series and parallel solar string wiring. |

### Core Hubs - 2 Routes

| Route | Page Type | Registered Target | Primary Value Proposition |
|---|---|---|---|
| `/` | Flagship Home | Core Platform Hub | Brand entry point, primary tools directory, and engineering trust signals. |
| `/calculators` | Directory Hub | Topic Index Hub | Complete categorized index of all 17 calculators and 16 guides. |

---

## 3. Google Search Console (GSC) Data Status & Methodology

### Telemetry Availability Notice

- **Verified Fact:** No raw Google Search Console tabular export file (`.csv`, `.tsv`, `.xlsx`, or `.json`) is present in the repository, workspace, or environment storage.
- **Data Limitations:** Live query impressions, clicks, CTR, and SERP average positions per URL cannot be empirically quoted without fabricating numbers. In strict compliance with CalcMyPower technical accuracy rules, **zero speculative GSC metrics are presented**.
- **Audit Methodology Applied:**  
  In the absence of live GSC search performance tables, the audit was executed through systematic codebase inspection:
  1. Source code inspection of all 35 `page.tsx` routes, UI components, and JSON-LD schemas.
  2. Single source of truth analysis in `src/lib/seo/registry.ts` and `KEYWORD_MAP.md`.
  3. Mathematical input/output boundary analysis distinguishing interactive tool features from educational narrative.
  4. Search intent classification grounded in Google Search Central link and content quality guidelines.

### Specifications for Future GSC Telemetry Upload

When exporting performance telemetry from Google Search Console for ongoing cannibalization monitoring, export the following dataset:
- **Dimensions:** Both `Query` AND `Page` (exporting only `Query` or only `Page` hides cannibalization).
- **Metrics:** `Clicks`, `Impressions`, `CTR`, `Average Position`.
- **Filters:** Country = `United States`.
- **Timeframe:** Last 90 days (minimum 28 days for statistically meaningful query distributions).

---

## 4. Deep Investigation: The Electricity Cluster

The electricity cluster represents the core of the current user inquiry. The audit investigated five closely related URLs within this cluster to evaluate potential overlap.

### Detailed Page Comparison

#### 1. `/electricity-use-calculator` (Interactive Tool)
- **Primary Keyword:** `electricity use calculator` (Targeting `electricity usage calculator`)
- **Search Intent:** Tool / Calculation Intent
- **User Problem Solved:** "I want to calculate how many kilowatt-hours (kWh) my household appliances consume per day and per month."
- **Inputs:** Appliance name, rated wattage (W), daily operating hours, cycling duty factor (0.01 to 1.0), unit quantity, planning days, and an optional utility rate ($/kWh).
- **Outputs:** Total monthly kWh, total daily kWh, total daily Wh, optional estimated monthly cost ($), highest consuming appliance callout, and an interactive energy distribution breakdown bar.
- **Introductory Angle:** "Calculate electrical energy use in Watt-hours (Wh) and kilowatt-hours (kWh) from appliance wattage, daily operating time, duty cycles, and quantities."

#### 2. `/how-to-calculate-electricity-usage` (Editorial Guide)
- **Primary Keyword:** `how to calculate electricity usage`
- **Search Intent:** Informational / Educational Intent
- **User Problem Solved:** "I want to understand the formula to calculate electricity usage from watts, how to read an appliance label, and how duty cycles work."
- **Educational Focus:** Step-by-step formula breakdown (`kWh = Watts × Hours ÷ 1,000`), power (kW) vs. energy (kWh) physics, FTC EnergyGuide label reading, plug-in wattmeter usage, phantom vampire loads, and common math mistakes.
- **Introductory Angle:** "Master the fundamental formulas for calculating electrical energy consumption. Learn how to convert rated Watts into kilowatt-hours (kWh), account for operating schedules, estimate monthly utility charges, and avoid common estimation pitfalls."
- **Internal Link Bridge:** Section 13 features a dedicated interactive tool card linking directly to `/electricity-use-calculator`.

#### 3. `/electricity-cost-calculator` (Interactive Tool)
- **Primary Keyword:** `electricity cost calculator`
- **Search Intent:** Tool / Financial Calculation Intent
- **User Problem Solved:** "I know my total monthly kWh usage (e.g., from my utility bill or smart meter); what will my electric bill cost in dollars?"
- **Inputs:** Monthly kWh usage, volumetric supply energy rate ($/kWh), delivery charges, fixed monthly customer connection charge ($), and local tax rate (%).
- **Outputs:** Total estimated monthly bill ($), volumetric energy cost ($), fixed charges ($), taxes ($), and true effective cost per kilowatt-hour ($/kWh).
- **Introductory Angle:** "Calculate monthly electric utility bills and true effective cost per kilowatt-hour from volumetric usage, energy rates, fixed customer charges, delivery riders, and taxes."

#### 4. `/how-to-calculate-electricity-bill` (Editorial Guide)
- **Primary Keyword:** `how to calculate electricity bill`
- **Search Intent:** Informational / Utility Tariff Education
- **User Problem Solved:** "Why is my electric bill so high? How do utilities calculate my bill using tiers, delivery fees, and riders?"
- **Educational Focus:** Understanding utility meter reads, supply generation vs. grid delivery unbundling, customer charges, regulatory riders, flat vs. tiered vs. TOU tariffs, and calculating effective $/kWh rates.
- **Introductory Angle:** "Learn how to calculate your electric bill from monthly kWh usage and utility rates. Understand tier rates, fixed base charges, and taxes with worked examples."

#### 5. `/what-is-a-watt-hour` (Editorial Guide)
- **Primary Keyword:** `watt hours`
- **Search Intent:** Informational / Foundational Physics
- **User Problem Solved:** "What is a Watt-hour (Wh)? How does it differ from a Watt, and how do I convert battery Amp-hours to Watt-hours?"
- **Educational Focus:** Power as instantaneous flow rate (Joules/sec) vs. energy as accumulated volume over time; converting Amp-hours to Watt-hours (`Wh = V × Ah`).

---

## 5. Keyword Opportunity Evaluation: "Electricity Usage Calculator"

The target keyword opportunity **"electricity usage calculator"** was evaluated in detail:

### 1. Does an existing page already target this keyword?
**Yes.** The existing page `https://calcmypower.com/electricity-use-calculator` was designed and developed specifically to fulfill this exact search intent.  
In `src/lib/seo/registry.ts`, it is registered with `primaryKeyword: "electricity use calculator"`.

### 2. Which existing page SHOULD be the primary target URL?
**`https://calcmypower.com/electricity-use-calculator`** MUST be the sole primary target URL.  
It contains the full multi-appliance interactive calculation engine, preset scenarios, and the `WebApplication` structured data schema.

### 3. Are other pages currently competing or at risk of competing with it?
- **`/how-to-calculate-electricity-usage`:**  
  This guide targets `how to calculate electricity usage`. Because its URL slug contains `electricity-usage`, there is a minor risk that search engines could surface the guide for tool queries if the guide copy uses tool-like phrasing. However, its H1 and title clearly focus on the educational guide angle.
- **`/electricity-cost-calculator`:**  
  This tool targets dollar cost rather than appliance energy consumption. However, users frequently search loosely for "electricity usage" when they want to calculate their electric bill cost.

### 4. Is creating a new page justified, or would it cause self-cannibalization?
**NO, CREATING A NEW PAGE IS STRICTLY UNJUSTIFIED.**  
Creating a separate page (such as `/electricity-usage-calculator`) would create textbook self-cannibalization:
- In Google search intent analysis, `electricity use calculator` and `electricity usage calculator` are grammatical synonyms for the exact same calculation tool.
- A new page would feature virtually identical functionality, splitting domain authority and internal link equity.
- It would present Google with two nearly identical pages, causing keyword flipping, ranking instability, and risk of a helpful content quality penalty.

### 5. Secondary Keywords & Long-Tail Mapping

To maintain total intent clarity across the cluster, keywords should be mapped strictly as follows:

```
+--------------------------------------------------------------------------+
|  PRIMARY TOOL URL: /electricity-use-calculator                           |
|  Search Intent: Interactive Calculation (Appliance Energy in kWh)         |
+--------------------------------------------------------------------------+
  * electricity usage calculator (Primary Tool Target)
  * electricity use calculator (Direct Synonym)
  * appliance electricity usage calculator
  * kwh usage calculator
  * power consumption calculator
  * appliance power consumption calculator
  * home electricity usage calculator
  * daily kwh calculator
  * calculate appliance energy consumption

+--------------------------------------------------------------------------+
|  COMPANION GUIDE URL: /how-to-calculate-electricity-usage                |
|  Search Intent: Informational & Educational (Formulas & Methodology)     |
+--------------------------------------------------------------------------+
  * how to calculate electricity usage (Primary Informational Target)
  * how to calculate kwh from watts
  * how to calculate appliance electricity usage
  * formula for calculating electricity usage
  * watts to kwh formula
  * how much electricity does an appliance use
  * how to calculate daily kwh usage manually
  * reading appliance energy labels

+--------------------------------------------------------------------------+
|  FINANCIAL TOOL URL: /electricity-cost-calculator                        |
|  Search Intent: Financial Utility Bill Estimation ($)                    |
+--------------------------------------------------------------------------+
  * electricity cost calculator (Primary Cost Tool Target)
  * electric bill calculator
  * kwh cost calculator
  * calculate monthly electricity bill from kwh
  * power cost calculator
```

### 6. Recommended On-Page Adjustments (For a Future Approved Release)

The existing `/electricity-use-calculator` page currently uses the word "Use" in its visible title and H1, but omits the word "Usage", which carries the highest search volume:
1. **Registry Update:** In `src/lib/seo/registry.ts`, update `primaryKeyword` for `/electricity-use-calculator` to `"electricity usage calculator"`, maintaining `"electricity use calculator"` in secondary keywords.
2. **Meta Title Refinement:** Refine the meta title of `/electricity-use-calculator` to:  
   `Electricity Usage Calculator (Calculate Appliance kWh & Energy)` (60 characters).
3. **H1 Refinement:** Update the title prop in `ElectricityUseCalculator.tsx` from `Electricity Use Calculator` to `Electricity Usage Calculator` (or `Electricity Use & Usage Calculator`).
4. **Internal Link Anchor Alignment:** In `src/app/how-to-calculate-electricity-usage/page.tsx`, ensure the Section 13 tool card anchor uses the text:  
   `Electricity Usage Calculator`.

---

## 6. Prioritized Cannibalization Conflict Report

The following table details all potential query and topic overlaps across CalcMyPower.com, prioritized by cannibalization risk:

| Query / Topic Cluster | Competing URLs | Evidence & Overlap Analysis | Cannibalization Risk | Recommended Action |
|---|---|---|---|---|
| **Electricity Usage vs. Use Calculation** | `/electricity-use-calculator`<br>vs.<br>`/how-to-calculate-electricity-usage` | Both target appliance kWh consumption. Calculator currently uses "use" while guide uses "usage" in URL slug. Risk of search intent split if query matches both. | **Medium** | Rebrand primary tool title/H1 to target `Electricity Usage Calculator`. Keep guide strictly focused on educational formulas (`how to calculate`). Bridge guide readers to calculator via existing Section 13 CTA. |
| **Battery Bank Capacity Sizing vs. Multi-Battery Wiring Math** | `/how-many-amp-hours-do-i-need`<br>vs.<br>`/how-to-calculate-amp-hours-of-a-battery-bank` | Both are editorial guides in `ups-battery` covering Amp-hours. Risk: searchers looking for battery bank sizing may land on series/parallel wiring guide or vice-versa. | **Medium** | Strictly preserve intent boundary: `/how-many-amp-hours-do-i-need` focuses on total load capacity sizing (Ah needed for runtime). `/how-to-calculate-amp-hours-of-a-battery-bank` focuses on Series/Parallel/2S2P wiring configuration math. Reciprocal linking implemented in Phase 2 Batch 2 must be maintained. |
| **Appliance kWh Energy vs. Electric Bill Cost** | `/electricity-use-calculator`<br>vs.<br>`/electricity-cost-calculator` | `/electricity-use-calculator` includes an optional utility rate field for cost estimation, while `/electricity-cost-calculator` takes kWh as an input. Loose queries like "power cost calculator" could trigger both. | **Medium** | Keep `/electricity-use-calculator` focused on appliance inventory and physical energy consumption (kWh). Keep `/electricity-cost-calculator` focused on utility rate structures, fixed customer fees, and monthly statement breakdown. Cross-link between them. |
| **Generator Sizing Tool vs. Appliance Wattage Chart** | `/generator-size-calculator`<br>vs.<br>`/generator-wattage-chart` | Both help users determine generator size. Calculator is dynamic (with motor surge deltas and 25% safety margins); chart is static (lookup table of 50+ appliances). | **Low** (Healthy Complementary) | Maintain clear title and intent separation. The calculator targets `generator size calculator`; the chart targets `wattage generator chart` and lookup queries. Reciprocal links in place. |
| **Generator Fuel Tool vs. Gas Usage Guide** | `/generator-fuel-consumption-calculator`<br>vs.<br>`/how-much-gas-does-a-generator-use` | Both address generator fuel consumption. Tool calculates exact gallons/hour and runtime for specific models; guide provides benchmark reference and safety rules. | **Low** (Healthy Complementary) | Healthy companion pair. Companion banner on calculator links to guide; guide links back to calculator. Keep metadata distinct. |
| **Watts to Amps vs. Amps to Watts** | `/watts-to-amps-calculator`<br>vs.<br>`/amps-to-watts-calculator` | Direct mathematical inverses ($I = P/V$ vs. $P = V \times I$). Both target electrical circuit conversion. | **Low** (Distinct Search Intent) | Google SERPs distinguish between these queries. Each tool has its own dedicated URL, canonical tag, and reciprocal linking. No risk. |
| **Battery Capacity Tool vs. UPS Runtime Tool** | `/battery-capacity-calculator`<br>vs.<br>`/ups-battery-backup-calculator` | One solves for required capacity (Ah/Wh); the other solves for runtime duration (hours/minutes). | **Low** (Distinct Search Intent) | Keep inputs and primary outputs separate. Sizing vs. Runtime represent distinct search tasks. |
| **Solar Array Sizing Tool vs. Panel Count Guide** | `/solar-system-size-calculator`<br>vs.<br>`/how-many-solar-panels-do-i-need` | Tool calculates system kW and panel count from electricity usage; guide answers "how many solar panels do I need?" with regional sun hour context. | **Low** (Healthy Complementary) | Ideal hub-and-spoke relationship. Guide funnels users to calculator via prefilled scenario links. |
| **Solar Charge Controller Tool vs. Sizing Guide** | `/solar-charge-controller-calculator`<br>vs.<br>`/how-to-size-a-solar-charge-controller` | Tool computes MPPT/PWM amperage and Voc temperature limits; guide explains the engineering theory of MPPT vs. PWM. | **Low** (Healthy Complementary) | Contextual companion banner implemented on calculator in Phase 2 Batch 1. Distinct intents preserved. |

---

## 7. Strategic Recommendations for Future Releases

These recommendations are documented for review and prioritization. Per read-only instructions, no code or metadata changes are executed at this time:

### Action 1: Capture "Electricity Usage Calculator" on the Existing Tool
When the next SEO metadata batch is approved:
- Update `src/lib/seo/registry.ts` to assign `primaryKeyword: "electricity usage calculator"` to `/electricity-use-calculator`.
- Update the page meta title to: `"Electricity Usage Calculator (Calculate Appliance kWh & Energy)"`.
- Update the visible H1 in `ElectricityUseCalculator.tsx` to `"Electricity Usage Calculator"`.

### Action 2: Protect the Informational Boundary of Companion Guides
Ensure that editorial guides never adopt tool-focused titles or H1s:
- `/how-to-calculate-electricity-usage` must strictly maintain its "How to Calculate..." tutorial framing and never use "Calculator" as its primary H1 or title noun.
- This prevents Google from substituting the guide for the calculator on high-intent tool queries.

### Action 3: Establish Continuous GSC Cannibalization Monitoring
Once Google Search Console telemetry is available for CalcMyPower.com:
- Monitor queries where impressions are split across multiple URLs (e.g., both `/electricity-use-calculator` and `/how-to-calculate-electricity-usage` receiving >20% of impressions for the same query).
- If Google begins ranking the guide above the calculator for a tool query (e.g., "electricity usage calculator"), strengthen the internal link from the guide to the calculator and refine the calculator on-page copy to emphasize that exact query.

### Action 4: Standardize Pre-Publishing Cannibalization Pre-Check
Before drafting or registering any future calculator or article:
- Check `src/lib/seo/registry.ts` and `KEYWORD_MAP.md`.
- Determine whether the target query is a synonym or variant of an existing page.
- If an existing page serves the primary intent, expand or refine that page rather than publishing a new URL.

---

## 8. Audit Conclusion

CalcMyPower.com currently possesses a clean, well-differentiated content architecture with 0 critical cannibalization defects. The 35 published routes adhere to a strict structural separation between interactive calculators and editorial guides.

The primary opportunity identified is aligning the existing `/electricity-use-calculator` page with the high-volume query **"electricity usage calculator"**, which will capture target search demand without creating redundant, cannibalizing URLs.
