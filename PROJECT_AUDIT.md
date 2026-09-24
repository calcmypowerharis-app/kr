# CalcMyPower — Project Audit (Phase 0)

Date: 2026-09-24  
Auditor: Implementation Engineer (Gemini 3.8 Flash High in Antigravity)  
Project Lead / Strategist: ChatGPT + Project Owner  
Repository / Workspace: `D:\Solar Power Project`  

---

## A. Current Project State
The workspace is essentially a clean slate. The only pre-existing file on disk is `GEMINI.md` (the project operating manual). No JavaScript runtime project files, configuration files, git repositories, or application code currently exist in the directory.

## B. Confirmed Facts
1. **Environment:** Windows, Node.js `v24.16.0`, npm `11.13.0`.
2. **Git:** Not initialized (`fatal: not a git repository`). No commit history exists.
3. **Framework & Codebase:** No `package.json`, `tsconfig.json`, Next.js configuration, or source files exist.
4. **Keyword Research Data:** Validated SEMrush US keyword dataset is preserved in local session memory and artifact screenshots:
   - `uninterruptible power supply hours` (Vol: 40,500 | KD: 18% | CPC: $0.21 | Intent: Informational)
   - `watts to amps` (Vol: 18,100 | KD: 28% | CPC: $0.45) & `watts to amps calculator` (Vol: 4,400 | KD: 15%)
   - `wire size computation` (Vol: 5,400 | KD: 21% | CPC: $0.74)
   - `pv panel kits` (Vol: 9,900 | KD: 25% | CPC: $0.87 | Intent: Commercial)
   - `solar calculator` (Vol: 6,600 | KD: 29% | CPC: $3.36)
   - `commercial solar panels` (Vol: 3,600 | KD: 17% | CPC: $11.61)
5. **Project Rules:** `GEMINI.md` is active as a strict rule set governing architecture, writing style, safety, and definitions of done.

## C. Existing Strengths
1. **Zero Legacy Debt:** Clean starting point avoids broken architectures, spaghetti code, or mismatched dependencies.
2. **High-Clarity Operating Rules:** `GEMINI.md` outlines non-negotiable guidelines for content, calculator-first structure, safety, and SEO.
3. **Validated High-ROI Target:** High-volume, low-KD keywords have been identified and cross-checked against actual US search data.

## D. Existing Problems
1. No git version control initialized.
2. Complete absence of core build, lint, and test infrastructure.
3. No reusable UI components or calculation engine yet.
4. No `DECISIONS.md` or `LESSONS.md` logging files.

## E. Risks
1. **Formula Inaccuracy:** Presenting unverified or oversimplified electrical calculations risks user safety and breaks `GEMINI.md` Section 10.
2. **Architecture Fragmentation:** If calculator logic is bound tightly to React UI components, scaling to 30+ calculators will cause code duplication.
3. **Hydration / SSR Mismatch:** Dynamic client-side calculations must render clean defaults without hydration flash.
4. **Accessibility & Mobile UX:** Complex calculators with multiple numeric inputs can be cumbersome on mobile without custom keypads, large tap targets, and clear validation labels.

## F. Missing Infrastructure
1. Git repository initialization + `.gitignore`.
2. Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS setup.
3. Testing framework (Vitest or Jest) with mathematical calculation test suites.
4. Shared UI library / design system (`CalculatorShell`, `InputField`, `SelectField`, `ResultCard`).
5. Centralized calculation engine (`lib/calculators/`, `lib/units/`, `lib/validation/`).
6. SEO utilities: Meta tag generators, Canonical URLs, Open Graph, Breadcrumb schema, and `SoftwareApplication` / `WebApplication` JSON-LD structured data.
7. Tracking and documentation: `DECISIONS.md`, `LESSONS.md`, `README.md`.

## G. Recommended Architecture
Follow the modular, decoupled architecture outlined in Phase 1:
- `src/lib/calculators/`: Pure TypeScript math functions, completely decoupled from React and DOM. Easily unit-tested.
- `src/lib/units/`: Centralized electrical unit conversions (W, kW, Wh, kWh, A, mA, Ah, mAh, V, HP).
- `src/lib/validation/`: Reusable validation rules (e.g. non-negative numbers, efficiency 1-100%, depth-of-discharge limits).
- `src/lib/seo/`: Structured data (JSON-LD), metadata helpers, breadcrumb generators.
- `src/components/calculators/`: Reusable presentation components (`CalculatorShell`, `InputField`, `SelectField`, `ResultCard`, `FormulaSection`, `WorkedExampleSection`, `AssumptionsSection`, `DisclaimerSection`, `FaqSection`, `RelatedCalculators`).
- `src/app/`: Next.js App Router for category silos and clean URLs (`/ups-battery-backup-calculator`, `/watts-to-amps-calculator`, etc.).

## H. Recommended Next Implementation Steps
1. Initialize Git repository and create standard `.gitignore`.
2. Initialize Next.js project with App Router, TypeScript, Tailwind CSS, ESLint, and Lucide React icons.
3. Configure Vitest for fast, pure TypeScript unit testing of formulas.
4. Build the shared foundation (Phase 2):
   - Math separation: `ups-calculator.ts` logic.
   - Validation & Units: `units.ts`, `validation.ts`.
   - UI: `CalculatorShell`, `InputField`, `ResultCard`, etc.
   - SEO & Schema: Structured data builders.
5. Implement the first calculator (Phase 3): **UPS Battery Backup Run-Time Hours Calculator** targeting `uninterruptible power supply hours` (40,500 Vol | 18% KD).
6. Verify quality gates (Phase 4): Vitest unit tests, typecheck, lint, build pass.
7. Record decisions in `DECISIONS.md` and lessons in `LESSONS.md`.

## I. Files That Should NOT Be Changed
- `GEMINI.md` — Active operating manual; must remain intact.

## J. Questions / Blockers Requiring Clarification
- None currently blocking. Keyword data is confirmed and Node/npm environment is fully ready.
