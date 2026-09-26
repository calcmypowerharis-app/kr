# CalcMyPower — Human Quality, Editorial & UX Audit (`HUMAN_QUALITY_AUDIT.md`)

**Date:** 2026-09-26  
**Auditor:** Antigravity (Implementation Engineer)  
**Project Lead:** ChatGPT + Project Owner  
**Scope:** Full production codebase inspection across Homepage (`/`), Calculators Directory (`/calculators`), Global Layout (`Header`, `Footer`, `layout.tsx`), Shared Calculator Components, and all 3 live calculators (`/ups-battery-backup-calculator`, `/watts-to-amps-calculator`, `/generator-size-calculator`).

---

## 1. Executive Summary

CalcMyPower already has a strong functional core: the three live calculators use pure, unit-tested mathematical logic, expose their formulas and assumptions, validate invalid inputs non-silently, and avoid thin blog filler.

However, a line-by-line inspection of the production codebase reveals several **"AI-template" artifacts, shared-component leaks, copy inconsistencies, and trust gaps** that weaken editorial credibility:

1. **Shared-Component Template Leaks (`CONFIRMED` — `HIGH`):**
   - [`AssumptionsSection.tsx`](file:///d:/Solar%20Power%20Project/src/components/calculators/AssumptionsSection.tsx#L42) hardcodes the fourth table column header as **`Impact on Runtime`**, which appears verbatim on the **Watts to Amps** and **Generator Size** calculators even though neither calculates runtime.
   - [`ResultCard.tsx`](file:///d:/Solar%20Power%20Project/src/components/ui/ResultCard.tsx#L33) hardcodes a **`<Clock />`** icon in the primary result badge, causing the Watts-to-Amps result card (`Calculated Electrical Current`) to display a clock icon.
   - [`GeneratorSizeCalculator.tsx`](file:///d:/Solar%20Power%20Project/src/components/calculators/GeneratorSizeCalculator.tsx#L1108) passes `&amp;` inside JSX string attributes (`title="Calculation Assumptions &amp; Engineering Planning Model"` and `title="Generator Sizing &amp; Safety Disclaimer"`), which React renders literally as **`&amp;`** in the visible `<h2>` headings on the live page.
2. **Preset Data Bug (`CONFIRMED` — `HIGH`):**
   - In [`WattsToAmpsCalculator.tsx`](file:///d:/Solar%20Power%20Project/src/components/calculators/WattsToAmpsCalculator.tsx#L40), the preset button labeled **`Microwave (1,200W @ 120V)`** sets `watts: 120` instead of `1200`, calculating `1.00 A` instead of `10.00 A`.
3. **Internal Link & Navigation Gaps (`CONFIRMED` — `HIGH`):**
   - `UpsCalculator.tsx`, `WattsToAmpsCalculator.tsx`, and `Footer.tsx` link to unbuilt tools (`Wire Size & DC Voltage Drop Calculator`, `Solar Panel & Battery Sizing Hub`) that simply route to `/calculators`, while failing to cross-link to the live **Generator Size Calculator** (`/generator-size-calculator`).
4. **Residual AI-Smell & Overclaiming Copy (`CONFIRMED` — `HIGH` / `MEDIUM`):**
   - Phrases like `"Precision Power & Energy Calculators"`, `"Engineering-backed"`, `"Calculate exact backup run-time hours"`, `"CalcMyPower Engine"`, and repeated `"Accurately calculate..."` / `"engineering baselines"` formulations sound like generic SaaS/AI template copy rather than a grounded US technical publisher.
5. **WHO / HOW / WHY Trust Gaps (`CONFIRMED` — `HIGH`):**
   - The footer lists four unlinked standards (`National Electrical Code (NEC)`, `IEEE Battery Standard 485`, `UL 1741`, `NREL PVWatts`) as decorative text and displays `Privacy & Terms` as unlinked text, with no `/about` or editorial methodology disclosure explaining who publishes the site or how defaults are sourced.

---

## 2. High-Priority Copy & Functional Issues

### Finding H-01: Literal `&amp;` Rendered in Visible H2 Headings on Generator Page
- **Classification:** `CONFIRMED` | **Priority:** `HIGH`
- **Location:** [`src/components/calculators/GeneratorSizeCalculator.tsx`](file:///d:/Solar%20Power%20Project/src/components/calculators/GeneratorSizeCalculator.tsx#L1108) and [line 1144](file:///d:/Solar%20Power%20Project/src/components/calculators/GeneratorSizeCalculator.tsx#L1144)
- **Exact Current Text:**
  ```tsx
  title="Calculation Assumptions &amp; Engineering Planning Model"
  title="Generator Sizing &amp; Safety Disclaimer"
  ```
- **Why It Is Problematic:** In React JSX, HTML entities inside quoted string props are not parsed as HTML; React escapes the `&`, causing the live DOM headings to display literal `Calculation Assumptions &amp; Engineering Planning Model` and `Generator Sizing &amp; Safety Disclaimer`.
- **Recommended Replacement Principle:** Replace `&amp;` with a plain `&` inside all JSX string props (`title="Calculation Assumptions & Engineering Planning Model"` and `title="Generator Sizing & Safety Disclaimer"`).

---

### Finding H-02: Hardcoded "Impact on Runtime" Table Header Across Non-Runtime Calculators
- **Classification:** `CONFIRMED` | **Priority:** `HIGH`
- **Location:** [`src/components/calculators/AssumptionsSection.tsx`](file:///d:/Solar%20Power%20Project/src/components/calculators/AssumptionsSection.tsx#L42)
- **Exact Current Text:**
  ```tsx
  <th className="py-3 px-3.5 font-semibold">Impact on Runtime</th>
  ```
- **Why It Feels Generic / Weak:** Because `AssumptionsSection` was originally written for the UPS Runtime calculator, its fourth column header says `Impact on Runtime` on the **Watts to Amps Calculator** and the **Generator Size Calculator**. A reader looking at three-phase balance or generator power factor sees a column header claiming it affects "Runtime."
- **Recommended Replacement Principle:** Add an optional `impactHeader?: string` prop to `AssumptionsSection` defaulting to `"Practical Impact"` or `"Effect on Calculation"`, and allow each calculator to pass a specific column label (e.g., `"Impact on Runtime"` for UPS, `"Effect on Current (Amps)"` for Watts-to-Amps, and `"Effect on Generator Sizing"` for Generator Size).

---

### Finding H-03: Microwave Preset Value Mismatch (`120W` Instead of `1,200W`)
- **Classification:** `CONFIRMED` | **Priority:** `HIGH`
- **Location:** [`src/components/calculators/WattsToAmpsCalculator.tsx`](file:///d:/Solar%20Power%20Project/src/components/calculators/WattsToAmpsCalculator.tsx#L40)
- **Exact Current Text:**
  ```tsx
  { label: "Microwave (1,200W @ 120V)", watts: 120, voltage: 120, system: "ac_single", pf: 1.0 },
  ```
- **Why It Is Problematic:** Clicking `Microwave (1,200W @ 120V)` populates `120` Watts into the calculator and outputs `1.00 A` instead of `1,200` Watts (`10.00 A`). Nothing erodes user trust faster than a preset button whose number does not match its own label.
- **Recommended Replacement Principle:** Set `watts: 1200` so the preset matches its `1,200W @ 120V` label and outputs `10.00 A`.

---

### Finding H-04: Overclaiming "Exact" Battery Runtime and "Engineering-Backed" Authority
- **Classification:** `CONFIRMED` | **Priority:** `HIGH`
- **Locations & Exact Current Text:**
  1. [`src/components/calculators/UpsCalculator.tsx`](file:///d:/Solar%20Power%20Project/src/components/calculators/UpsCalculator.tsx#L92):
     > `"Calculate exact backup run-time hours for any uninterruptible power supply (UPS), inverter battery bank, or portable power station based on appliance wattage, battery voltage, and Amp-hour capacity."`
  2. [`src/app/ups-battery-backup-calculator/page.tsx`](file:///d:/Solar%20Power%20Project/src/app/ups-battery-backup-calculator/page.tsx#L19):
     > `"Find out exactly how many hours your UPS or battery backup system will run your appliances during a power outage."`
  3. [`src/components/layout/Footer.tsx`](file:///d:/Solar%20Power%20Project/src/components/layout/Footer.tsx#L19):
     > `"Engineering-backed power, battery, solar, and electrical calculators. Built for homeowners, RV travelers, off-grid DIYers, and electrical professionals."`
  4. [`src/app/page.tsx`](file:///d:/Solar%20Power%20Project/src/app/page.tsx#L111):
     > `"Precision Power & Energy Calculators"`
- **Why It Feels Generic / Weak:**
  - Battery runtime is never "exact" in the field—it varies with battery age, Peukert losses, inverter idle draw, and ambient temperature (as our own disclaimer states). Claiming "exact" hours in the intro while disclaiming "theoretical run-time estimates" at the bottom reads like AI marketing copy.
  - `"Engineering-backed"` in the footer is an unsupported authority claim that was previously removed from the homepage during Lead Visual Review but survived in `Footer.tsx`.
  - `"Precision"` on the homepage hero badge is an empty adjective.
- **Recommended Replacement Principle:**
  - Replace `"Calculate exact backup run-time hours"` with `"Estimate realistic backup runtime hours"`.
  - Replace `"Engineering-backed"` in `Footer.tsx` with specific, factual scope: `"US electrical, battery backup, and generator sizing calculators with transparent formulas and documented assumptions."`
  - Replace `"Precision Power & Energy Calculators"` badge with `"US Power & Electrical Calculators"`.

---

### Finding H-05: Fake/Premature Internal Links to Unbuilt Tools While Omitting Live Tools
- **Classification:** `CONFIRMED` | **Priority:** `HIGH`
- **Locations & Exact Current Text:**
  1. [`src/components/calculators/UpsCalculator.tsx`](file:///d:/Solar%20Power%20Project/src/components/calculators/UpsCalculator.tsx#L438-L450) (`RelatedCalculators`):
     - Links `"Wire Size & DC Voltage Drop Calculator"` → `/calculators`
     - Links `"Solar Panel & Battery Sizing Hub"` → `/calculators`
     - Does **not** link to `/generator-size-calculator`.
  2. [`src/components/calculators/WattsToAmpsCalculator.tsx`](file:///d:/Solar%20Power%20Project/src/components/calculators/WattsToAmpsCalculator.tsx#L290-L296) & [lines 508–518](file:///d:/Solar%20Power%20Project/src/components/calculators/WattsToAmpsCalculator.tsx#L508-L518):
     - Callout link: `"Explore Wire Size & Voltage Drop Calculator"` → `/calculators`
     - `RelatedCalculators`: Links `"Wire Size & DC Voltage Drop Calculator"` → `/calculators` and `"Solar Panel & Battery Sizing Hub"` → `/calculators`, while omitting `/generator-size-calculator`.
  3. [`src/components/layout/Footer.tsx`](file:///d:/Solar%20Power%20Project/src/components/layout/Footer.tsx#L42-L51) & [`src/components/layout/Header.tsx`](file:///d:/Solar%20Power%20Project/src/components/layout/Header.tsx#L25-L44):
     - Footer links `"Solar Panel Sizing"` and `"Wire Size Computation"` to `/calculators`, and omits `"Generator Size Calculator"`.
     - Header links `UPS Runtime` and `Watts to Amps`, omitting `Generator Sizing`.
- **Why It Is Problematic:** Clicking a card titled `"Explore Wire Size & Voltage Drop Calculator"` or `"Solar Panel & Battery Sizing Hub"` and landing on a directory page where that tool does not exist feels like a bait-and-switch template site. Meanwhile, the live `/generator-size-calculator` is orphaned from the header, footer, and sibling calculators' related-tool blocks.
- **Recommended Replacement Principle:**
  - Every `RelatedCalculators` card and footer link must point to a **real, live calculator route** (`/ups-battery-backup-calculator`, `/watts-to-amps-calculator`, `/generator-size-calculator`, or `/calculators` explicitly labeled as `"All Electrical & Power Calculators"`).
  - In the Watts-to-Amps conductor callout, remove the misleading `"Explore Wire Size & Voltage Drop Calculator"` link until that route is live, or link to `/calculators` with honest anchor text (`"View All Electrical Calculators"`).

---

### Finding H-06: Overclaiming NEC Mandate for UPS Inverter Sizing
- **Classification:** `CONFIRMED` | **Priority:** `HIGH`
- **Locations & Exact Current Text:**
  - [`src/components/calculators/UpsCalculator.tsx`](file:///d:/Solar%20Power%20Project/src/components/calculators/UpsCalculator.tsx#L415) & [`src/app/ups-battery-backup-calculator/page.tsx`](file:///d:/Solar%20Power%20Project/src/app/ups-battery-backup-calculator/page.tsx#L51):
    > `"Under National Electrical Code (NEC) continuous duty guidelines, size your inverter at least 25% larger than your total continuous wattage load (Continuous Load × 1.25). For example, a 400W load requires at least a 500W rated continuous inverter."`
- **Why It Is Problematic:** Just as ChatGPT flagged during the Generator Size review, the 125% continuous-load rule in the NEC governs branch-circuit conductors and overcurrent protection devices—not a universal legal mandate for standalone portable UPS or inverter wattage selection.
- **Recommended Replacement Principle:** Reframe as a practical 25% continuous planning margin: `"As a standard continuous-duty planning margin (1.25×), size your inverter at least 25% above your steady-state wattage so it does not run at 100% thermal capacity—and verify that its surge rating covers any motor or power-supply startup inrush."`

---

## 3. Medium-Priority Copy Issues

### Finding M-01: Repetitive Word Echo ("Transparent" × 2) in Homepage Hero
- **Classification:** `CONFIRMED` | **Priority:** `MEDIUM`
- **Location:** [`src/app/page.tsx`](file:///d:/Solar%20Power%20Project/src/app/page.tsx#L118-L120)
- **Exact Current Text:**
  > `"Accurate, transparent power calculations for homeowners, off-grid DIYers, RV travelers, and electricians. Every tool provides transparent formulas and explicit engineering baselines."`
- **Why It Feels Generic / Weak:** Uses `"transparent"` twice in 24 words, starts with the filler adjective `"Accurate"`, and leans on the vague phrase `"explicit engineering baselines"`.
- **Recommended Replacement Principle:** State specifically what the user can calculate and what is shown on every page: `"Practical sizing calculators for home backup power, battery banks, RV electrical systems, and branch circuits. Every calculator shows the exact formula, default assumptions, and worked math behind the result."`

---

### Finding M-02: Formulaic "Accurately calculate/convert..." Meta Descriptions
- **Classification:** `CONFIRMED` | **Priority:** `MEDIUM`
- **Locations & Exact Current Text:**
  - [`src/app/ups-battery-backup-calculator/page.tsx`](file:///d:/Solar%20Power%20Project/src/app/ups-battery-backup-calculator/page.tsx#L12): `"Accurately calculate uninterruptible power supply (UPS) backup hours..."`
  - [`src/app/watts-to-amps-calculator/page.tsx`](file:///d:/Solar%20Power%20Project/src/app/watts-to-amps-calculator/page.tsx#L29): `"Accurately convert electrical power in Watts to current in Amperes..."`
  - [`src/app/generator-size-calculator/page.tsx`](file:///d:/Solar%20Power%20Project/src/app/generator-size-calculator/page.tsx#L29): `"Accurately calculate your generator wattage requirements..."`
  - [`src/app/layout.tsx`](file:///d:/Solar%20Power%20Project/src/app/layout.tsx#L43): `"Accurate power calculations for UPS systems..."`
- **Why It Feels Generic / Weak:** Starting every meta/OG description with `"Accurately calculate..."` or `"Accurately convert..."` is a classic programmatic SEO pattern that wastes character space before stating the actual parameters.
- **Recommended Replacement Principle:** Start directly with the action and specific technical parameters (e.g., `"Estimate UPS and battery backup runtime in hours from load watts, battery voltage (12V–48V), Amp-hour capacity, and LiFePO4 vs. lead-acid depth of discharge."`).

---

### Finding M-03: SaaS Jargon Badge "CalcMyPower Engine" on Generator Result Card
- **Classification:** `CONFIRMED` | **Priority:** `MEDIUM`
- **Location:** [`src/components/calculators/GeneratorSizeCalculator.tsx`](file:///d:/Solar%20Power%20Project/src/components/calculators/GeneratorSizeCalculator.tsx#L727)
- **Exact Current Text:**
  ```tsx
  <span className="text-xs text-blue-200">CalcMyPower Engine</span>
  ```
- **Why It Feels Generic / Weak:** Calling a four-step arithmetic formula an `"Engine"` sounds like AI-generated startup hype rather than straightforward electrical documentation.
- **Recommended Replacement Principle:** Replace with informative context that actually helps the reader interpret the number, such as `"Includes 25% Headroom"` or `"Single-Motor Surge Model"`.

---

### Finding M-04: Redundant & Misleading "Reset Defaults" vs. "Clear All" on Generator Page
- **Classification:** `CONFIRMED` | **Priority:** `MEDIUM`
- **Location:** [`src/components/calculators/GeneratorSizeCalculator.tsx`](file:///d:/Solar%20Power%20Project/src/components/calculators/GeneratorSizeCalculator.tsx#L259-L266) and [line 884](file:///d:/Solar%20Power%20Project/src/components/calculators/GeneratorSizeCalculator.tsx#L884)
- **Exact Current Text:**
  - Top of card (`CalculatorShell`): `Reset Defaults` (`title="Reset to default values"`) wired to `onReset={handleClearAll}`
  - Immediately below: `Clear All` wired to `onClick={handleClearAll}`
- **Why It Is Problematic:** Both buttons sit inches apart with the exact same `<RotateCcw />` icon and both wipe the appliance list to `0`. Worse, `"Reset Defaults"` does not restore the default `"Essential Outage"` preset—it empties the calculator.
- **Recommended Replacement Principle:** Wire `onReset` on `GeneratorSizeCalculator` to `() => handleApplyPreset("essential_outage")` so `"Reset Defaults"` genuinely restores the default initial scenario, while `"Clear All"` empties the list to zero.

---

### Finding M-05: Inconsistent Affiliate Card Behavior Across the 3 Calculators
- **Classification:** `CONFIRMED` | **Priority:** `MEDIUM`
- **Locations & Exact Current Text:**
  1. [`UpsCalculator.tsx`](file:///d:/Solar%20Power%20Project/src/components/calculators/UpsCalculator.tsx#L256-L289): Renders clickable Amazon search links, but the URLs are hardcoded to `12V+100Ah+LiFePO4+battery` and `pure+sine+wave+inverter+1000w` even when the user selects a `24V` or `48V` bank or needs a `2,500W` inverter. Lacks an inline disclosure sentence on the card.
  2. [`WattsToAmpsCalculator.tsx`](file:///d:/Solar%20Power%20Project/src/components/calculators/WattsToAmpsCalculator.tsx#L315-L348): Renders clickable Amazon search links (`digital+clamp+meter+auto+ranging`, `circuit+breaker+finder+tool`), without an inline disclosure sentence on the card.
  3. [`GeneratorSizeCalculator.tsx`](file:///d:/Solar%20Power%20Project/src/components/calculators/GeneratorSizeCalculator.tsx#L820-L873): Renders 4 static `<div>` boxes that are **not links at all**, yet displays the Amazon Associate disclosure at the bottom of the card (`"As an Amazon Associate, CalcMyPower earns from qualifying purchases. We never recommend untested hardware."`).
- **Why It Is Problematic:** Having an Amazon disclosure on a box with zero links (Generator) while omitting the inline disclosure on boxes with actual Amazon links (UPS and Watts-to-Amps), plus hardcoding `12V` and `1000w` in the UPS Amazon query when the user's inputs are dynamic, looks unfinished. Additionally, `"We never recommend untested hardware"` contradicts linking to generic Amazon search results (`amazon.com/s?k=...`).
- **Recommended Replacement Principle:**
  - Standardize all three secondary hardware reference cards: use clean category links (or dynamic search queries that reflect `${batteryVoltage}V` and `${results.recommendedInverterWatts}W` on UPS), include a concise, honest inline disclosure (`"Amazon search links (Affiliate)"`), and remove the inaccurate claim `"We never recommend untested hardware"` when linking to search results.

---

### Finding M-06: Em-Dash Punctuation in Prose & Labels (`GEMINI.md` Section 4)
- **Classification:** `CONFIRMED` | **Priority:** `MEDIUM`
- **Locations & Exact Current Text:**
  - [`src/components/calculators/WattsToAmpsCalculator.tsx`](file:///d:/Solar%20Power%20Project/src/components/calculators/WattsToAmpsCalculator.tsx#L478): `"that same 100 Watts draws 8.33 Amps—ten times more current."`
  - [`src/app/watts-to-amps-calculator/page.tsx`](file:///d:/Solar%20Power%20Project/src/app/watts-to-amps-calculator/page.tsx#L61): `"that same 100 Watts draws 8.33 Amps—ten times more current."`
  - [`src/components/calculators/WattsToAmpsCalculator.tsx`](file:///d:/Solar%20Power%20Project/src/components/calculators/WattsToAmpsCalculator.tsx#L83-L89): `"Direct Current (DC — Solar, RV & Battery)"`, `"Line-to-Line Voltage (V_LL — e.g. 208V, 480V)"`
  - [`src/components/calculators/GeneratorSizeCalculator.tsx`](file:///d:/Solar%20Power%20Project/src/components/calculators/GeneratorSizeCalculator.tsx#L305): `"Example Scenario — editable:"`
- **Why It Matters:** `GEMINI.md` Section 4 explicitly instructs avoiding repeated dash habits (`"-", "---"` / em-dash clauses) typical of LLM prose.
- **Recommended Replacement Principle:** Replace em-dashes with commas, colons, or parentheses (e.g., `"draws 8.33 Amps, or ten times more current"`, `"Example Scenario (Editable):"`).

---

### Finding M-07: Filler Section Intro Sentences Before Assumptions Tables
- **Classification:** `CONFIRMED` | **Priority:** `LOW`
- **Locations & Exact Current Text:**
  - [`UpsCalculator.tsx`](file:///d:/Solar%20Power%20Project/src/components/calculators/UpsCalculator.tsx#L374): `"Every battery backup system operates in dynamic physical environments. This calculator uses standard industry engineering baselines as detailed below."`
  - [`WattsToAmpsCalculator.tsx`](file:///d:/Solar%20Power%20Project/src/components/calculators/WattsToAmpsCalculator.tsx#L428): `"Electrical conversions require clear physical baselines. This tool applies standard US electrical engineering conventions."`
- **Why It Feels Generic / Weak:** Both sentences are throat-clearing filler that could appear on any website without conveying a single fact.
- **Recommended Replacement Principle:** Use the intro sentence to state the most important real-world caveat of the table (e.g., for UPS: `"Default values assume a healthy battery bank at 77°F (25°C). Cold rooms, aged cells, or discharge rates above 0.2C will reduce actual runtime."`).

---

## 4. Repetition Patterns Across the Site

| Pattern | Where It Repeats | Why It Feels Programmatic | Replacement Principle |
|---|---|---|---|
| **4-Persona List** (`"homeowners, off-grid DIYers, RV travelers, and electricians"`) | `src/app/page.tsx` (L119) and `src/components/layout/Footer.tsx` (L19) | Identical 4-part audience list on the top and bottom of the same page. | Keep the audience mention in the footer; make the homepage hero about the *systems and problems solved*, not a roll call of personas. |
| **`"engineering baselines"` / `"standard engineering equations"`** | `layout.tsx` (L13), `page.tsx` (L20, L119), `calculators/page.tsx` (L22), `UpsCalculator.tsx` (L374) | Repeated 5 times across the site as a substitute for naming the actual assumptions (DoD, inverter efficiency, power factor, surge delta). | Name the concrete physical parameters instead of calling them `"engineering baselines"`. |
| **`"Accurately calculate..."` / `"Accurate..."`** | `page.tsx` (L119), `layout.tsx` (L43), `ups-battery-backup-calculator/page.tsx` (L12), `watts-to-amps-calculator/page.tsx` (L29), `generator-size-calculator/page.tsx` (L12, L29) | Every page claims its math is "accurate" in the first 3 words. Any calculator is expected to do arithmetic correctly; repeating "accurate" sounds defensive and templated. | Lead with the specific calculation inputs and outputs. |
| **Hardcoded `"September 2026"` Badge** | `CalculatorShell.tsx` (L23), `UpsCalculator.tsx` (L91), `WattsToAmpsCalculator.tsx` (L97), `GeneratorSizeCalculator.tsx` (L883) | Every page displays `• Updated September 2026` in the top eyebrow regardless of whether a methodology note was updated. | Keep if maintained per-tool, or replace with a concise tool-type descriptor if dates aren't tied to a changelog. |

---

## 5. Trust / Who-How-Why Gaps

Google's Quality Rater Guidelines and helpful-content systems evaluate **Who, How, and Why**—especially for YMYL-adjacent technical/electrical content where bad sizing can overload circuits or cause safety hazards.

### 1. WHO Publishes CalcMyPower? (`CONFIRMED` Gap — `HIGH`)
- **Current State:** `layout.tsx` sets `authors: [{ name: "CalcMyPower Technical Publishing" }]`, and the footer shows `CalcMyPower.com` with unlinked `Privacy & Terms` text. There is no About page, no contact/feedback mechanism, and no explanation of who maintains the site.
- **Recommendation (`RECOMMENDATION`):**
  - Do **not** invent fake electrical engineering degrees, fake authors, or fake testing labs (`GEMINI.md` Section 3).
  - Add a straightforward, honest publisher statement (either on a lightweight `/about` page or a dedicated footer/methodology disclosure) stating that **CalcMyPower** is an independent US technical reference project built to provide transparent, formula-first electrical and backup power calculators where every assumption is documented and editable.

### 2. HOW Are Calculations Produced and Verified? (`CONFIRMED` Gap — `HIGH`)
- **Current State:** In [`Footer.tsx`](file:///d:/Solar%20Power%20Project/src/components/layout/Footer.tsx#L58-L65), the column **`Standards & Code`** lists four unlinked text strings:
  - `National Electrical Code (NEC)`
  - `IEEE Battery Standard 485`
  - `UL 1741 Inverter Standard`
  - `NREL PVWatts Guidelines`
  Listing standards in the footer without explaining how they apply (especially `UL 1741` and `NREL PVWatts`, which are not even used by any of the three live calculators!) looks like "authority badge stuffing."
- **Recommendation (`RECOMMENDATION`):**
  - Remove the decorative `"Standards & Code"` list from `Footer.tsx`.
  - Document our actual calculation verification standards honestly:
    1. Every calculator's math engine is open, deterministic, and tested against known manual calculations.
    2. Default appliance wattages and battery parameters are planning estimates compiled from US Department of Energy (DOE), ENERGY STAR, and standard manufacturer nameplate ranges—and every default is user-editable.
    3. Safety advisories cite primary public-safety sources directly (such as CDC and CPSC 20-foot outdoor placement rules for portable generators).

### 3. WHY Does CalcMyPower Exist? (`RECOMMENDATION` — `MEDIUM`)
- **Current State:** The homepage says `"Fast, client-side execution designed to provide clear answers immediately on any device."`
- **Recommendation (`RECOMMENDATION`):** Explain the real user problem CalcMyPower solves: most online power calculators are either manufacturer lead-capture forms that hide their math to upsell oversized systems, or bare-bones formula boxes that ignore real-world losses like inverter efficiency, battery depth of discharge, power factor, and motor startup surges.

---

## 6. Originality Opportunities

To ensure every calculator page provides substantial original value beyond restating textbook formulas (`GEMINI.md` Sections 3, 5, and 9), we can add the following concrete, factual elements:

1. **UPS & Battery Backup Calculator (`/ups-battery-backup-calculator`) — `RECOMMENDATION`:**
   - **Low-Load Inverter Idle (Quiescent) Loss Callout / Table:** A common real-world surprise is why a 1,000Wh battery bank does *not* run a 15W Wi-Fi router for 55+ hours. A large 1,500W–2,000W inverter often draws `15W–25W` of idle self-consumption just staying switched on, cutting router runtime in half. Adding a concrete comparison table of **Load Wattage vs. Typical Inverter Idle Draw** gives users genuine practical insight they won't find on generic calculator pages.
   - **Chemistry Comparison Table (SLA/AGM vs. LiFePO4 vs. Consumer UPS):** Compare nominal voltage sag, usable DoD (50% vs. 90%), Peukert sensitivity at `>0.2C` discharge rates, and typical cycle life (`300–500` vs. `3,000–4,000` cycles).

2. **Watts to Amps Calculator (`/watts-to-amps-calculator`) — `RECOMMENDATION`:**
   - **Same Wattage Across Voltages Reference Table:** Add a compact derived comparison table showing what happens to current (`Amps`) when a **1,200W** or **2,400W** load is powered at **12V DC, 24V DC, 48V DC, 120V AC, and 240V AC**. Seeing `1,200W = 100.0 A @ 12V DC` vs. `25.0 A @ 48V DC` vs. `10.0 A @ 120V AC` immediately explains why off-grid solar and RV builders step up battery bank voltage as wattage grows.
   - **Common US Branch-Circuit Limits Reference Table:** Show standard `15A` and `20A` at `120V` and `30A` and `50A` at `240V` alongside both **Max Non-Continuous Watts (100%)** and **Max Continuous Watts (80% / 3+ Hours)** (`1,440W` on 15A/120V; `1,920W` on 20A/120V; `5,760W` on 30A/240V; `9,600W` on 50A/240V).

3. **Generator Size Calculator (`/generator-size-calculator`) — `RECOMMENDATION`:**
   - **Primary Source Citations with Outbound Reference Links:** Add explicit source attribution links at the bottom of the methodology/safety sections to:
     - **US CPSC / CDC Carbon Monoxide Generator Safety Guidelines** (20-foot outdoor rule)
     - **US Department of Energy (DOE)** appliance energy estimation resources
     - **ENERGY STAR** residential appliance consumption benchmarks

---

## 7. Visual / UI "AI-Template" Observations

Without redesigning the locked visual system, the following specific UI details currently contribute to an "AI-generated template" feel:

| # | Observation | Classification | Priority | File / Line | Recommended Fix |
|---|---|---|---|---|---|
| **V-01** | **Hardcoded `<Clock />` icon in `ResultCard.tsx`** appears on the Watts-to-Amps result badge (`Calculated Electrical Current`). | `CONFIRMED` | `HIGH` | [`ResultCard.tsx:33`](file:///d:/Solar%20Power%20Project/src/components/ui/ResultCard.tsx#L33) | Allow an optional `icon` prop on `ResultCard` (defaulting to `Zap` or `Clock` per calculator) so electrical current uses `Zap` and runtime uses `Clock`. |
| **V-02** | **Badge saturation on Homepage (`page.tsx`)**: Hero pill (`Precision Power & Energy Calculators`) + Flagship pill (`Flagship Tool`) + 8 category status pills (`1 Active Tool` / `Planned`) + 3 popular tool pills (`Live`). | `RECOMMENDATION` | `MEDIUM` | [`page.tsx:109-323`](file:///d:/Solar%20Power%20Project/src/app/page.tsx#L109-L323) | Keep status pills on the 8 category cards (where distinguishing `Active` vs `Planned` is genuinely functional), but remove the redundant green `Live` badges from the 3 Popular Electrical Calculators cards—if a calculator is in the "Popular" grid, users already expect it to be live. |
| **V-03** | **Top-bar eyebrow clutter in `CalculatorShell.tsx`**: Renders `{category} • {badge} • Updated {lastUpdated}` above every H1 (`ELECTRICAL • Electrical & Current Sizing • Updated September 2026`). | `OPTIONAL` | `LOW` | [`CalculatorShell.tsx:33-41`](file:///d:/Solar%20Power%20Project/src/components/calculators/CalculatorShell.tsx#L33-L41) | `category` and `badge` often repeat the same words (`GENERATOR SIZING • Electrical Sizing Tool`). Simplifying the eyebrow to a clickable breadcrumb (`Home / Calculators / {category}`) adds real navigation utility and matches the `BreadcrumbList` JSON-LD schema. |
| **V-04** | **Header Navigation Omission**: Desktop header shows `UPS Runtime`, `Watts to Amps`, and `All Calculators`, omitting the live `Generator Size` calculator. | `CONFIRMED` | `MEDIUM` | [`Header.tsx:25-44`](file:///d:/Solar%20Power%20Project/src/components/layout/Header.tsx#L25-L44) | Add `Generator Sizing` (`/generator-size-calculator`) to the desktop header navigation bar alongside `UPS Runtime` and `Watts to Amps`. |

---

## 8. Image / Diagram Opportunities

Per `GEMINI.md` Section 13, decorative stock photos and fake AI screenshots must never be used. However, **three specific, clean SVG technical diagrams** would materially improve user comprehension on the existing calculators:

1. **Diagram 1 — UPS Energy Conversion & Loss Flow (`/ups-battery-backup-calculator`)**
   - **Classification:** `RECOMMENDATION` | **Priority:** `MEDIUM`
   - **What It Shows:** A clean horizontal block diagram illustrating how a `12V × 100Ah = 1,200 Wh` battery bank steps down through **Chemistry Safe DoD Limit** (`-10% LiFePO4` or `-50% Lead-Acid`) and **Inverter DC→AC Conversion Heat Loss** (`-15%`) to yield **918 Wh Usable AC Output**.
   - **Why It Helps:** Visually answers the #1 user question: *"Why doesn't my 1,200Wh battery run a 100W load for 12 hours?"*

2. **Diagram 2 — Motor Startup Inrush vs. Continuous Running Load Curve (`/generator-size-calculator`)**
   - **Classification:** `RECOMMENDATION` | **Priority:** `HIGH`
   - **What It Shows:** A clean 2D plot of **Watts (vertical axis) vs. Time in Seconds (horizontal axis)** showing:
     - Steady-state continuous running baseline ($W_{\text{running}}$)
     - The 1–3 second motor locked-rotor startup spike ($\Delta W_{\max}$) reaching $W_{\text{peak}}$
     - The 25% CalcMyPower Planning Capacity band ($W_{\text{planning}} = W_{\text{peak}} \times 1.25$) above peak demand.
   - **Why It Helps:** Makes the distinction between **Running Watts**, **Peak Starting Demand**, and **Planning Capacity** immediately intuitive at a glance.

3. **Diagram 3 — Single-Phase vs. Three-Phase ($V_{LL}$ vs. $V_{LN}$) Reference (`/watts-to-amps-calculator`)**
   - **Classification:** `OPTIONAL` | **Priority:** `LOW`
   - **What It Shows:** A simple schematic contrasting Line-to-Line ($V_{LL}$ between Phase A and Phase B, e.g., `208V` or `480V` using $\sqrt{3}$) against Line-to-Neutral ($V_{LN}$ between Phase A and Neutral, e.g., `120V` or `277V` using $3$).
   - **Why It Helps:** Prevents commercial users from selecting the wrong three-phase voltage reference in the dropdown.

---

## 9. SEO Quality Observations

1. **Search Intent & Page Uniqueness (`CONFIRMED` — Strong):**
   - Each of the 3 live routes targets one distinct primary search intent (`/ups-battery-backup-calculator`, `/watts-to-amps-calculator`, `/generator-size-calculator`) with zero cannibalizing variant pages.
2. **Internal Link Graph Asymmetry (`CONFIRMED` — Needs Fix, `HIGH`):**
   - `GeneratorSizeCalculator` links out to both `UpsCalculator` and `WattsToAmpsCalculator`, but neither `UpsCalculator` nor `WattsToAmpsCalculator` links back to `GeneratorSizeCalculator`. Updating `RelatedCalculators` on UPS and Watts-to-Amps (and `Header.tsx` / `Footer.tsx`) will complete a tight, crawlable triangle across all 3 live tools.
3. **Visible Breadcrumb Alignment with `BreadcrumbList` Schema (`RECOMMENDATION` — `MEDIUM`):**
   - All 3 calculator pages output a `BreadcrumbList` JSON-LD schema (`Home → Calculators → [Calculator Name]`), but the visible page top bar shows non-clickable text pills (`{category} • {badge}`). Turning that top bar into a visible, clickable breadcrumb trail aligns visible DOM links with the structured data.
4. **External Authority Citations (`RECOMMENDATION` — `MEDIUM`):**
   - Adding clean, non-intrusive outbound reference links to primary US government/standards resources (CDC/CPSC generator CO guidance, DOE Energy Saver) strengthens E-E-A-T and complies with `GEMINI.md` Section 9.

---

## 10. Exact Recommended Changes (Summary Action Plan for Lead Approval)

When approved for implementation, the following targeted changes should be executed in a single clean pass:

1. **Fix Shared Component Bugs (`HIGH`):**
   - In [`GeneratorSizeCalculator.tsx`](file:///d:/Solar%20Power%20Project/src/components/calculators/GeneratorSizeCalculator.tsx#L1108) (L1108, L1144): Replace `&amp;` with `&` in `AssumptionsSection` and `DisclaimerSection` `title` props.
   - In [`AssumptionsSection.tsx`](file:///d:/Solar%20Power%20Project/src/components/calculators/AssumptionsSection.tsx#L42): Add `impactHeader?: string` prop (defaulting to `"Practical Impact"`) so non-runtime calculators do not display `"Impact on Runtime"`.
   - In [`ResultCard.tsx`](file:///d:/Solar%20Power%20Project/src/components/ui/ResultCard.tsx#L33): Add `icon?: "clock" | "zap"` prop so `WattsToAmpsCalculator` displays `<Zap />` instead of `<Clock />`.
   - In [`WattsToAmpsCalculator.tsx`](file:///d:/Solar%20Power%20Project/src/components/calculators/WattsToAmpsCalculator.tsx#L40): Fix `Microwave (1,200W @ 120V)` preset from `watts: 120` to `watts: 1200`.
   - In [`GeneratorSizeCalculator.tsx`](file:///d:/Solar%20Power%20Project/src/components/calculators/GeneratorSizeCalculator.tsx#L884): Wire `onReset` to restore the default `"Essential Outage"` preset (`() => handleApplyPreset("essential_outage")`) instead of `handleClearAll`.
2. **Fix Internal Links & Navigation (`HIGH`):**
   - Add `/generator-size-calculator` to `Header.tsx`, `Footer.tsx`, `UpsCalculator.tsx` (`RelatedCalculators`), and `WattsToAmpsCalculator.tsx` (`RelatedCalculators`).
   - Remove fake/premature links to unbuilt tools (`Solar Panel Sizing`, `Wire Size Computation`) from `Footer.tsx`, `UpsCalculator.tsx`, and `WattsToAmpsCalculator.tsx`, replacing them with links to the live calculators and `/calculators` directory.
3. **Tighten Copy & Remove AI-Smell (`HIGH` / `MEDIUM`):**
   - Replace `"Calculate exact backup run-time hours"` / `"Find out exactly how many hours"` on UPS page with honest estimation phrasing.
   - Replace `"Engineering-backed"` in `Footer.tsx` and `"Precision Power & Energy Calculators"` / double-`"transparent"` in `src/app/page.tsx`.
   - Replace `"CalcMyPower Engine"` badge on `GeneratorSizeCalculator.tsx` with `"Includes 25% Headroom"`.
   - Revise UPS FAQ #2 to frame the 25% inverter buffer as a continuous planning margin rather than a universal NEC requirement.
   - Remove unspaced em-dashes in `WattsToAmpsCalculator.tsx` and `page.tsx`.
4. **Standardize Hardware Reference Cards & Footer Trust (`MEDIUM`):**
   - Make `UpsCalculator` affiliate search queries dynamic to the selected voltage and recommended inverter wattage; align affiliate disclosure microcopy across all 3 calculators; remove `"We never recommend untested hardware"` from `GeneratorSizeCalculator.tsx`.
   - Replace the decorative unlinked `"Standards & Code"` list in `Footer.tsx` with a transparent **"How We Calculate & Verify"** / publisher note explainingCalcMyPower's open-formula methodology and DOE/ENERGY STAR/CDC/CPSC sourcing.

---

## 11. Things That Should NOT Be Changed

To protect what already works well (`GEMINI.md` Sections 2 & 14):

1. **Do NOT change the core mathematical engines** (`ups-runtime.ts`, `watts-to-amps.ts`, `generator-size.ts`) or their 31 passing unit tests.
2. **Do NOT redesign the visual layout, color palette, typography, or 12-column `CalculatorShell` grid.** The high-contrast slate/blue technical publisher aesthetic is clean, fast, and locked.
3. **Do NOT remove or weaken the single-motor surge limitation banner, the 4-step breakdown card, the spec-sheet matching guide, or the CDC/CPSC safety warnings on the Generator Size Calculator.**
4. **Do NOT rewrite clear, formal technical explanations into chatty/casual prose** just to sound "conversational." Specific, direct technical writing is the right voice for US electrical and power tools.
