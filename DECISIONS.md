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
