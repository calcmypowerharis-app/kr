# CalcMyPower — Architectural & Technical Decisions (DECISIONS.md)

This log records major technical and product decisions, context, rationale, and consequences in accordance with GEMINI.md Section 17.

---

## Decision 001: Tech Stack Selection
- **Date:** 2026-09-24
- **Status:** Approved & Implemented
- **Context:** CalcMyPower.com requires fast initial load, 100/100 Core Web Vitals, zero hosting overhead, rich client-side interactivity for calculators, and server-side pre-rendered static content for SEO.
- **Decision:** Use **Next.js 15 (App Router)** with **TypeScript**, **Tailwind CSS**, and **Lucide React** for icons.
- **Rationale:** 
  1. Next.js App Router provides automatic static optimization (SSG) for high Google PageSpeed scores.
  2. Tailwind CSS delivers utility-first styling with zero runtime CSS overhead.
  3. TypeScript ensures type safety for numerical calculations, reducing runtime arithmetic bugs.
- **Consequences:** Client-side components are marked `'use client'` while wrapper pages and layout remain Server Components for maximum SEO metadata extraction.

---

## Decision 002: Separation of Mathematical Logic from UI
- **Date:** 2026-09-24
- **Status:** Approved & Implemented
- **Context:** Building 30+ calculators can easily result in messy spaghetti code and duplicated formulas across components.
- **Decision:** All mathematical formulas, unit conversions, and input validation routines must live in `src/lib/` as pure, framework-agnostic TypeScript functions.
- **Rationale:**
  1. Pure functions can be tested with Vitest in milliseconds without mounting React components.
  2. Formulas can be reused across multiple tools (e.g. Watts to Amps formula used in Solar, Wire Sizing, and Inverter sizing).
  3. Allows strict adherence to GEMINI.md Section 15 (Architecture Rules) and Section 16 (Testing Requirements).
- **Consequences:** React components only handle user interaction, state, and rendering; all arithmetic is delegated to pure library functions.

---

## Decision 003: Selection of First Flagship Calculator
- **Date:** 2026-09-24
- **Status:** Approved & Implemented
- **Context:** The first calculator must validate the entire system, possess massive search demand, achievable SEO competition (low KD), high utility, and natural commercial affiliate intent.
- **Decision:** Implement **UPS & Battery Backup Run-Time Hours Calculator** (`/ups-battery-backup-calculator`).
- **Data Justification:**
  - Primary Target Keyword: `uninterruptible power supply hours`
  - Monthly US Search Volume: **40,500**
  - Keyword Difficulty (KD): **18%** (Easy)
  - Intent: Informational / Calculation
  - Commercial Angle: Recommends UPS replacement batteries, LiFePO4 batteries, and portable power stations.
  - Formula:
    $$T = \frac{V \times Ah \times \eta \times DoD}{P}$$
    where $V$ is battery voltage, $Ah$ is capacity, $\eta$ is inverter efficiency (typically 85%), $DoD$ is depth of discharge (50% Lead-Acid, 80-90% LiFePO4), and $P$ is load in Watts.
- **Consequences:** Provides an immediate high-value demonstration of the reusable foundation.

---

## Decision 004: Reusable Modular Component Architecture
- **Date:** 2026-09-24
- **Status:** Approved & Implemented
- **Context:** Future calculators must follow identical high quality, mobile responsiveness, accessibility, and SEO standards without duplicating layout code.
- **Decision:** Standardize all calculator pages on `CalculatorShell`, `FormulaSection`, `WorkedExampleSection`, `AssumptionsSection`, `DisclaimerSection`, `FaqSection`, and `RelatedCalculators`.
- **Rationale:** Ensures every calculator meets GEMINI.md Section 5 (Calculator-First Product Principle) out of the box with zero boilerplate.

---

## Decision 005: Separation of Conductor Sizing from Watts-to-Amps Conversion
- **Date:** 2026-09-24
- **Status:** Approved
- **Context:** Attempting to recommend a definitive wire gauge inside a Watts-to-Amps calculator is misleading because proper conductor sizing requires evaluating run distance, permissible voltage drop (typically 3%), temperature ratings (60°C/75°C/90°C), and raceway derating.
- **Decision:** The Watts-to-Amps Calculator will strictly compute current ($I$), apparent power ($VA$), and a 125% continuous duty reference. Conductor sizing is explicitly delegated to the upcoming dedicated **Wire Size & Voltage Drop Calculator** via an educational callout link.
- **Rationale:** Prevents presenting an incomplete electrical calculation as a definitive code recommendation, complying with GEMINI.md Section 10 (Safety).

---

## Decision 006: 125% Continuous-Load Reference Labeling
- **Date:** 2026-09-24
- **Status:** Approved
- **Context:** Labeling an overcurrent output as "Recommended Breaker" implies a universal breaker-sizing algorithm without considering local installation constraints, non-continuous vs continuous loads, or breaker terminal limits.
- **Decision:** Label the secondary metric as **"125% Continuous-Load Reference"** ($I \times 1.25$) and include an explicit note that final overcurrent protection selection depends on installation specifics and applicable NEC requirements.

---

## Decision 007: Explicit User Notification for Input Sanitization
- **Date:** 2026-09-24
- **Status:** Approved
- **Context:** Silently clamping invalid or unphysical inputs (such as negative watts, zero voltage, or power factors > 1.0) can confuse users and conceal entry errors.
- **Decision:** When invalid inputs are detected, the calculation logic must return user-visible validation messages explaining *why* the input is invalid while safely falling back to prevent division by zero, `NaN`, or `Infinity`.

---

## Decision 008: Explicit Homepage Canonical & WebSite Schema
- **Date:** 2026-09-24
- **Status:** Approved & Implemented
- **Context:** While `layout.tsx` defines `metadataBase`, omitting explicit alternates on the root page omitted the canonical `<link>` tag on `/`. Additionally, brand search signals benefit from dedicated WebSite schema.
- **Decision:** Explicitly export canonical `https://calcmypower.com` on `src/app/page.tsx` and inject `WebSite` JSON-LD structured data.
- **Rationale:** Prevents search engines from experiencing canonical ambiguity across trailing slash or protocol variants, adhering to GEMINI.md Section 7.

---

## Decision 009: Generator Sizing Methodology — "Largest Single Motor Surge" Rule
- **Date:** 2026-09-26
- **Status:** Approved & Implemented
- **Context:** Sizing algorithms that sum all starting surges assume that every motor in a facility or home starts at the exact same millisecond. This causes severe, expensive oversizing.
- **Decision:** Sizing for peak/surge capacity will be calculated as Total Continuous Running Watts plus the single largest motor surge delta among active loads: $W_{surge\_demand} = W_{running} + \max(W_{starting} - W_{running})$.
- **Rationale:** Reflects asynchronous real-world motor cycling and manual/automatic circuit staging, complying with IEEE and electrical contractor standards.

---

## Decision 010: CalcMyPower Planning Headroom Factor
- **Date:** 2026-09-26
- **Status:** Approved & Implemented
- **Context:** Operating internal combustion generators continuously at 100% of rated capacity creates thermal stress, excessive fuel burn, voltage/frequency sag, and risk of nuisance tripping. However, continuous duty factors vary across applications and must not be misrepresented as a universal NEC requirement.
- **Decision:** Explicitly label the 25% continuous buffer as the **"CalcMyPower planning headroom factor"**. Note that generator manufacturers and alternative sizing methodologies may use different operating margins (e.g. 10%–30%).
- **Rationale:** Transparently explains the engineering intent (targeting ~80% of generator capacity) without improperly claiming an NEC code mandate.

---

## Decision 011: Four-Step Generator Sizing Methodology & Planning Capacity Formulation
- **Date:** 2026-09-26
- **Status:** Approved & Implemented
- **Context:** Generator sizing must accurately balance continuous running loads and motor starting inrushes without naive summation errors or hidden assumptions.
- **Decision:** Define the mathematical engine using four explicit steps:
  1. Total Running Watts = $\sum (Q_i \times W_{r,i})$
  2. Largest Additional Starting Watts = $\max(0, \max_i(W_{s,i} - W_{r,i}))$
  3. Peak Starting Demand = Total Running Watts + Largest Additional Starting Watts
  4. CalcMyPower Planning Capacity = Peak Starting Demand $\times 1.25$
  Clearly label the 25% value as the **"CalcMyPower planning headroom factor"**. Display an explicit note that this planning margin is based on established generator-sizing guidance (e.g. Cummins, Generac) and may differ by manufacturer, application, generator type, and engineering methodology, and is not a universal NEC requirement.
- **Rationale:** Ensures the generator operates comfortably within its continuous power band and can absorb motor startup transients without engine stall or voltage drop.

---

## Decision 012: Calculated Electrical Thresholds Over Arbitrary Retail Bucketing
- **Date:** 2026-09-26
- **Status:** Approved & Implemented
- **Context:** Forcing calculated generator loads into arbitrary commercial retail buckets (e.g. "4,000W–5,500W class") lacks empirical grounding and restricts user evaluation across varied generator models.
- **Decision:** Output exact calculated engineering thresholds:
  1. Total Running Watts ($W_{\text{running}}$)
  2. Peak Starting Demand ($W_{\text{peak}}$)
  3. CalcMyPower Planning Capacity ($W_{\text{planning}} = W_{\text{peak}} \times 1.25$)
  Provide an explicit equipment comparison guide instructing users to verify generator **Rated (Running) Watts** against running/planning figures and **Surge (Starting) Watts** against peak demand figures.
- **Rationale:** Adheres to technical publisher standards and prevents unverified marketing categorization.

---

## Decision 013: Cautious Attribution for Transfer Equipment and Safety Guidance
- **Date:** 2026-09-26
- **Status:** Approved & Implemented
- **Context:** Misrepresenting NEC Article 702 as mandating a single specific hardware setup across every application creates legal and technical inaccuracies.
- **Decision:** Use cautious, standardized language: *"Use properly installed transfer equipment or an approved interlock arrangement where applicable to prevent unintended interconnection with utility power. Follow applicable NEC and local code requirements and use qualified electrical professionals for installation."* Ground all CO safety advisories (including 20-foot outdoor rule) directly in current CDC and CPSC guidelines.
- **Rationale:** Ensures strict technical compliance and safety rigor per GEMINI.md Section 9 and 10.

---

## Decision 014: Explicit Distinction and Mathematical Grounding of kVA Apparent Power Model
- **Date:** 2026-09-26
- **Status:** Approved & Implemented
- **Context:** Presenting a single universal kVA value without defining which power stage it represents creates confusion between running load, peak demand, and recommended nameplate capacity.
- **Decision:** Use $kVA = kW / PF$ and explicitly distinguish between:
  1. Planning Capacity kVA ($kW_{\text{planning}} / PF$): Primary output matching generator nameplate capacity ratings.
  2. Running Load kVA ($kW_{\text{running}} / PF$): Steady-state continuous apparent power.
  3. Peak Demand kVA ($kW_{\text{peak}} / PF$): Un-buffered momentary startup demand.
  Use $PF = 0.80$ as an explicitly annotated illustrative assumption, noting that actual equipment power factor should be verified.
- **Rationale:** Eliminates ambiguity and ensures users sizing commercial or standby generators do not undersize continuous or peak kVA requirements.

---

## Decision 015: Generator Technology Comparison and Appliance Interaction UX
- **Date:** 2026-09-26
- **Status:** Approved & Implemented
- **Context:** Hard wattage cutoffs for generator types (e.g. "<4500W = inverter") are technically inaccurate, as high-output inverters (7kW–10kW) and small conventional portables exist. Furthermore, user loads must allow frictionless editing and avoid arbitrary multipliers.
- **Decision:**
  1. Educational Technology Comparison: Compare portable inverter, conventional open-frame, dual-fuel, and standby units based on technical attributes (THD, noise, portability, fuel storage, automatic transfer) rather than arbitrary wattage tiers.
  2. Category-First Appliance Organization: Organize into HVAC, Kitchen, Water & Pumps, Electronics, RV, Tools, Other, prioritizing high-impact appliances.
  3. Preloaded Default Preset: Preload "Essential Outage" by default as an editable scenario and provide a clear "Clear All" button.
  4. Custom Appliance Startup: Require explicit Running Watts and Starting Watts, or a "No Motor Surge / Unknown" toggle that sets Starting = Running; strictly prohibit arbitrary 2x/3x auto-multiplication.
- **Rationale:** Maximizes educational value, technical accuracy, and UX clarity.

---

## Decision 016: Prominent Single-Motor Startup Model Limitation Notice
- **Date:** 2026-09-26
- **Status:** Approved & Implemented
- **Context:** Supporting appliance quantities ($Q_i > 1$) scales continuous running wattage ($Q_i \times W_{r,i}$), while the largest startup surge delta ($\Delta W_{\max} = \max(W_{s,i} - W_{r,i})$) assumes staggered motor starts.
- **Decision:** Display a prominent, non-hidden limitation notice in both the specification and the top of the calculator UI: *"This practical planning model assumes that only one significant motor-driven load starts at a time. If multiple large motors can start simultaneously, generator sizing may require a more detailed manufacturer or engineering analysis."*
- **Rationale:** Ensures complete transparency regarding how quantity scaling interacts with motor starting transients.

---

## Decision 017: Responsive Dual-View Pattern for Dense Technical Tables on Mobile (`<640px`)
- **Date:** 2026-09-26
- **Status:** Approved & Implemented
- **Context:** Multi-column tables with inline numeric inputs (such as the 5-column Generator Selected Appliances table and the 4-column Assumptions table) require `min-w-[500px]` or `min-w-[600px]` on desktop, which forces awkward horizontal scrolling on `390px` mobile viewports and hides delete/input controls off-screen.
- **Decision:** Use a responsive dual-view layout (`sm:hidden` stacked definition/control cards for `<640px`, `hidden sm:block` semantic `<table>` for `>=640px`) in `AssumptionsSection` and `GeneratorSizeCalculator`.
- **Rationale:** Preserves high-density tabular scanning on tablet/desktop while giving mobile users 100% visible controls and text without horizontal scrolling.

---

## Decision 018: Distinction Between "Reset Defaults" and "Clear All" in Multi-Item Calculators
- **Date:** 2026-09-26
- **Status:** Approved & Implemented
- **Context:** In calculators that preload a default multi-item scenario (like the Generator Size Calculator's "Essential Outage" preset), wiring both "Reset Defaults" and "Clear All" to empty the list breaks user expectations when trying to return to the baseline example.
- **Decision:** "Reset Defaults" must always restore the initial default preset state (`preset_essential`), whereas "Clear All" explicitly empties the selected appliance list (`[]`).
- **Rationale:** Matches standard form semantics and prevents accidental loss of the default reference scenario.

---

## Decision 019: Tool-First Homepage Hierarchy Over Redundant SaaS Showcase Blocks
- **Date:** 2026-09-26
- **Status:** Approved & Implemented
- **Context:** Promoting the same calculator four times on the homepage (Hero button, Flagship banner, Category grid, and Popular grid) created a repetitive template feel and buried the other live calculators below the fold.
- **Decision:** Structure the homepage around four focused sections: (1) Compact Hero, (2) 3 Live Calculators with governing equations and bulleted outputs, (3) Compact "More Calculators in Development" roadmap table, and (4) Brief Methodology & Standards Note.
- **Rationale:** Surfaces all live tools above or near the fold, eliminates card duplication, and maintains honest roadmap signaling.

---

## Decision 020: Flat Root-Slug URL Architecture Combined with Topical Cluster Hub
- **Date:** 2026-09-28
- **Status:** Approved & Implemented
- **Context:** Power and electrical tools frequently bridge multiple categories (e.g. `watts-to-amps-calculator` applies to Electricity, Solar, Batteries, and Generators; `ups-battery-backup-calculator` spans UPS and Battery Storage). Moving existing live URLs into nested `/[category]/[slug]` folders would create redirect debt, URL word repetition (`/generator/generator-size-calculator`), and rigid siloing.
- **Decision:** Keep all calculator and editorial guide URLs at clean root-level slugs (`/[slug]`), organize topical clusters in `src/lib/seo/registry.ts` and on `/calculators` via cluster anchors (`/calculators#generators`, `/calculators#ups-battery`, `/calculators#electricity`), and gate standalone category index pages until a cluster contains at least 3 live calculators and 2 supporting guides.
- **Rationale:** Preserves 100% of live indexed URLs, avoids thin 1-item category pages (complying with Google's Scaled Content Abuse policy), and establishes topical hierarchy through internal links, visible breadcrumbs, and structured data.

---

## Decision 021: Leaf-Level Suspense Boundary for `useSearchParams()` in Static Calculators
- **Date:** 2026-09-28
- **Status:** Approved & Implemented
- **Context:** Calling `useSearchParams()` at the top of `GeneratorSizeCalculatorInner` and wrapping the entire `<CalculatorShell>` inside `<Suspense fallback={null}>` caused Next.js 15 to emit `BAILOUT_TO_CLIENT_SIDE_RENDERING` for the entire `/generator-size-calculator` page, leaving `<main>` devoid of `<h1>`, body text, and internal links in the static SSR HTML.
- **Decision:** Isolate `useSearchParams()` into a leaf synchronization component (`<ScenarioUrlSync />`) wrapped in `<Suspense fallback={null}>` inside `<CalculatorShell>`. Initialize all calculator state deterministically on the server.
- **Rationale:** Guarantees 100% static HTML pre-rendering of the `<h1>`, default calculation, formulas, worked examples, tables, FAQs, and internal links at build time while preserving client-side `?scenario=...` deep-link preloading.

---

## Decision 022: Native HTML5 `<details>` / `<summary>` for Calculator FAQs (`FaqSection.tsx`)
- **Date:** 2026-09-28
- **Status:** Approved & Implemented
- **Context:** Conditionally mounting FAQ answers in React via `{isOpen && <div>{faq.answer}</div>}` with `openIndex = null` omitted all FAQ answers from the SSR HTML DOM, violating Google's `FAQPage` structured data visibility rules and hiding answers from non-clicking crawlers and browser `Ctrl+F` search.
- **Decision:** Render all calculator FAQs using native HTML5 `<details>` and `<summary>` elements (with the first item open by default, `open={idx === 0}`).
- **Rationale:** Ensures 100% of FAQ answers exist in the initial SSR HTML DOM, works without JavaScript, supports native browser Find-in-Page, and satisfies Google Search Central structured data and AEO/GEO requirements.

---

## Decision 023: Centralized SEO Registry & Verifiable Sitemap `lastModified` Dates
- **Date:** 2026-09-28
- **Status:** Approved & Implemented
- **Context:** Google Search Central documentation specifies that `<priority>` and `<changefreq>` are ignored in XML sitemaps, and `<lastmod>` is only trusted when it accurately reflects the real modification date of a page rather than `new Date()` on every build.
- **Decision:** Centralize all route metadata, topical cluster assignments, and explicit `YYYY-MM-DD` `lastModified` dates in `src/lib/seo/registry.ts`, driving `src/app/sitemap.ts` and automated SEO guardrails (`src/lib/seo/__tests__/seo-foundation.test.ts`).
- **Rationale:** Prevents orphaned routes, eliminates inaccurate sitemap timestamps, and enforces automated build-time verification of titles, canonicals, and internal link density.
