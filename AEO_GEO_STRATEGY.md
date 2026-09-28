# CalcMyPower.com — Answer Engine (AEO) & Generative Engine Optimization (GEO) Strategy (`AEO_GEO_STRATEGY.md`)

**Document Owner:** Lead SEO Foundation Specialist  
**Status:** Production Standard  
**Scope:** Designing CalcMyPower calculators and guides for direct answer extraction, featured snippets, and citation in generative search systems (Google AI Overviews, ChatGPT Search, Perplexity, Microsoft Copilot, Claude).

> **Important Honesty Note:** No specific markup or copywriting trick guarantees inclusion in Google AI Overviews or third-party LLM answers. However, generative retrieval-augmented generation (RAG) systems and classical passage-ranking algorithms share concrete technical requirements: **SSR HTML availability, unambiguous entity/unit definitions, deterministic math, self-contained answer passages, structured data tables, and authoritative source attribution.**

---

## 1. Core Technical Prerequisite: 100% SSR HTML Availability

Generative search crawlers (such as `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, and `Google-Extended` / `Googlebot`) frequently fetch raw HTTP HTML responses without executing interactive client-side clicks or waiting for delayed client-side Suspense bailouts.

### Non-Negotiable Technical Rules for AEO/GEO on CalcMyPower
1. **Zero Full-Page SSR Bailouts:** Never wrap `<CalculatorShell>` or article content inside `<Suspense fallback={null}>` due to `useSearchParams()`. Every calculator page must pre-render its complete `<h1>`, introductory summary, default calculation state, governing formula, worked example, assumptions table, and FAQ answers in the initial static HTML payload.
2. **Zero Unmounted Accordion Answers:** Never hide FAQ or methodology text behind `{isOpen && <div>...</div>}` where `isOpen` is `false` on SSR. Always use semantic HTML `<details>` and `<summary>` (or visible cards) so 100% of answer text exists in the initial HTML DOM.
3. **Clean `robots.txt` Access:** `src/app/robots.ts` allows all standard search and answer engine user agents to crawl public pages (`Allow: /`, `Disallow: /api/`) and declares `max-snippet: -1` and `max-image-preview: "large"` in `layout.tsx` metadata.

---

## 2. Answer Engine Optimization (AEO) Architecture for Calculator Pages

When a user searches a calculation query (e.g., *"watts to amps calculator"*, *"what size generator do i need"*, *"ups runtime calculator"*), they either want to **run their own numbers immediately** or **extract a quick formula/benchmark answer**.

Every CalcMyPower calculator page must follow this 10-part AEO hierarchy:

### 1. Above-the-Fold Direct Utility & Summary (`CalculatorShell` Header)
- **One Clear `<h1>`:** Matches the primary tool intent (e.g., `Generator Size Calculator`, `Watts to Amps Electrical Calculator`).
- **2-Sentence Functional Definition:** Immediately below the `<h1>`, state what the calculator computes, which circuit/equipment types it supports, and what engineering baseline it uses (under 45 words).
- **Preloaded Realistic Default State:** The calculator must render a meaningful default calculation on load (e.g., `1,500W @ 120V = 12.50A` or the `Essential Outage` preset) so both human visitors and SSR crawlers see a live, valid calculation immediately.

### 2. Governing Formula Block (`FormulaSection`)
- Display the exact mathematical equation in plain, copyable notation (`I = P / (V × PF)` or `W_planning = (W_running + ΔW_max) × 1.25`).
- Define every variable with its **Symbol**, **Full Name**, **SI/Electrical Unit**, and **Physical Meaning**.
- State boundary conditions (e.g., balanced three-phase load assumption, Peukert's law at `>0.2C` discharge).

### 3. Step-by-Step Worked Example (`WorkedExampleSection`)
- Walk through one realistic U.S. residential or commercial scenario from raw inputs to final engineering decision.
- Show intermediate arithmetic at each step so an LLM or human reader can verify the math independently.
- State the practical conclusion (e.g., why `12.50A` continuous requires a `20A` branch circuit under the NEC 80% continuous-load rule).

### 4. Structured Assumptions & Field Ranges Table (`AssumptionsSection`)
- Present a 4-column semantic `<table>` (`Parameter | Model Default | Typical Field Range | Practical Impact`).
- Generative engines heavily extract HTML `<table>` elements when synthesizing comparative answers or explaining why real-world results differ from textbook formulas.

### 5. Limitations & Safety Disclaimers (`DisclaimerSection` + Context Warnings)
- Explicitly state model limitations (e.g., single-motor startup sequencing vs. simultaneous multi-motor starts; terminal amperage vs. distance-based voltage drop).
- Cite relevant U.S. safety standards accurately (NEC / NFPA 70, CPSC, CDC, IEEE 485) without claiming calculator outputs constitute professional engineering approval.

### 6. High-Intent, Self-Contained FAQs (`FaqSection` via `<details>`/`<summary>`)
- Include 4 to 6 real questions users ask around the calculation.
- **First-Sentence Direct Answer Rule:** The first sentence of every FAQ answer must directly answer the question with a specific number, formula, or rule before expanding on context.
  - *Bad:* "When thinking about how many amps 1,500 watts draws, there are several factors to consider depending on your voltage."
  - *Good:* "In a standard 120V household circuit with a resistive load (power factor = 1.0), 1,500 Watts draws **12.50 Amps** (`1,500W ÷ 120V = 12.50A`)."

### 7. Semantic Cluster Links (`RelatedCalculators` + Guide Bridges)
- Connect the user and crawler to the next logical calculation step (e.g., from `Watts to Amps` → `Generator Size` or `UPS Runtime`, plus deep-dive sizing guides).

---

## 3. Generative Engine Optimization (GEO) Strategy for Guides & Calculators

Generative AI search systems synthesize answers across multiple sources and cite pages that provide **high information gain, verifiable numerical anchors, explicit conditional logic, and authoritative U.S. citations**.

### 3.1 Explicit Conditional Logic ("If X, Then Y" Brackets)
Because electrical sizing depends on household configuration, never give a single vague range ("2,000 to 20,000 watts") without structured conditions. Always structure direct answers into explicit scenario brackets:
- **Scenario A (Critical Essentials / Single Appliance):** Exact wattage range + specific appliances included + why.
- **Scenario B (Well/Sump Pumps & Heavy Motor Loads):** Exact wattage range + starting surge driver + why.
- **Scenario C (Whole-House / Central HVAC):** Exact kW range + transfer switch requirement + why.

### 3.2 Verifiable Single Source of Truth Between Articles and Calculators
- When an editorial guide walks through a worked example (such as the `5.1 kW` winter essentials storm plan in `/what-size-generator-do-i-need-for-my-house` or the `1,819W` refrigerator outage plan in `/what-size-generator-to-run-a-refrigerator`), its numbers are computed directly from `src/lib/calculators/generator-size.ts` and verified by `editorial-quality.test.ts`.
- This guarantees **zero mathematical contradiction** between CalcMyPower's prose articles, JSON-LD `FAQPage` schemas, and interactive calculators.

### 3.3 High-Utility Reference Tables (HTML `<table>`)
Every guide and complex calculator should include at least one clean HTML `<table>` comparing technical attributes rather than marketing fluff:
- Appliance Running Watts vs. Starting Surge Watts vs. Surge Delta (`ΔW`).
- Generator Technologies compared by Total Harmonic Distortion (THD), noise (dBA), portability, fuel shelf life, and transfer switch type.
- Battery Chemistries (`LiFePO4` vs. `AGM/Lead-Acid` vs. `NMC`) compared by safe Depth of Discharge (`DoD`), cycle life, and Peukert sensitivity.

### 3.4 Authoritative U.S. Source Attribution
Every guide and calculator methodology must ground material safety and electrical claims in primary U.S. references:
- **National Fire Protection Association (NFPA):** *NFPA 70 / National Electrical Code (NEC)* (e.g., Article 210.19/210.20 for continuous loads, Article 430 for motors, Article 480/706 for battery storage, Article 702 for optional standby systems).
- **U.S. Consumer Product Safety Commission (CPSC) & CDC:** 20-foot outdoor portable generator carbon monoxide placement rule.
- **U.S. Department of Energy (DOE) & ENERGY STAR:** Typical residential appliance wattage and kWh consumption baselines.
- **IEEE Standards:** IEEE Std 485 ( stationary battery sizing).
- **Electrical Safety Foundation International (ESFI):** Extension cord gauge, length, and anti-backfeeding safety guidance.

### 3.5 Consistent Entity & Terminology Signals
- Always pair symbols with units on first mention (`Watts (W)`, `Amperes (A)`, `Volts (V)`, `Volt-Amperes (VA)`, `Kilowatt-Hours (kWh)`, `Amp-Hours (Ah)`, `Power Factor (PF)`, `Depth of Discharge (DoD)`).
- Clearly distinguish between:
  - **Running Watts (Continuous / Rated Watts)** vs. **Starting Watts (Surge / Peak Watts)** vs. **Additional Surge Delta (`Starting W - Running W`)**.
  - **NEC 125% Continuous-Load Rule (3+ hours)** vs. **CalcMyPower 25% Generator Planning Headroom Factor**.
  - **Real Power (`W` / `kW`)** vs. **Apparent Power (`VA` / `kVA`)**.
