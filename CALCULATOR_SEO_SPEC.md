# CalcMyPower.com — Reusable Calculator SEO Specification (`CALCULATOR_SEO_SPEC.md`)

**Document Owner:** Lead SEO Foundation Specialist  
**Status:** Production Standard (Mandatory for all current and future calculators)  
**Purpose:** Ensure every calculator built on CalcMyPower is a complete, fast, accessible, and authoritative search landing page that satisfies both human engineering needs and Google Search Essentials / AEO / GEO criteria.

---

## 1. Required File & Code Architecture

Every calculator on CalcMyPower must be split cleanly across 4 files:

1. **Pure Mathematical Engine (`src/lib/calculators/[slug].ts`):**
   - Pure TypeScript functions, deterministic preset constants, unit conversions, and validation logic.
   - Zero React imports, zero DOM access.
2. **Unit Test Suite (`src/lib/calculators/__tests__/[slug].test.ts`):**
   - Vitest unit tests verifying normal calculations, boundary/edge cases (`0`, negative numbers, invalid power factors), and preset accuracy against labels.
3. **Interactive Client Component (`src/components/calculators/[CalculatorName].tsx`):**
   - Uses `<CalculatorShell>`, `<ResultCard>`, `<FormulaSection>`, `<WorkedExampleSection>`, `<AssumptionsSection>`, `<DisclaimerSection>`, `<FaqSection>`, and `<RelatedCalculators>`.
   - **Critical SSR Rule:** Must pre-render 100% of its default state and supporting sections during Next.js static generation. If `useSearchParams()` is used to load URL scenarios (`?scenario=...`), isolate `useSearchParams()` inside a tiny leaf child component wrapped in `<Suspense fallback={null}>` so the calculator itself never triggers `BAILOUT_TO_CLIENT_SIDE_RENDERING`.
4. **Server Route Wrapper (`src/app/[slug]-calculator/page.tsx`) + Registry Entry (`src/lib/seo/registry.ts`):**
   - Registers the calculator in `src/lib/seo/registry.ts` (which automatically updates `/sitemap.xml`).
   - Exports Next.js `metadata` via `buildPageMetadata()` from `src/lib/seo/metadata.ts`.
   - Injects `WebApplication`, `BreadcrumbList`, and `FAQPage` JSON-LD schemas via `src/lib/seo/schema.ts`.

---

## 2. On-Page SEO & Metadata Checklist

### 2.1 URL Slug
- Format: `/[primary-topic]-calculator` (lowercase, hyphen-separated, root level).
- Canonical URL: `https://calcmypower.com/[slug]-calculator` (no trailing slash, no query parameters).

### 2.2 Title Tag (`metadata.title`)
- **Length:** 42 to 60 characters before the ` | CalcMyPower` template suffix.
- **Rule:** Never include `| CalcMyPower` inside the page's `title` string because `src/app/layout.tsx` automatically appends `%s | CalcMyPower`.
- **Formula:** `[Primary Calculator Name] ([Key Scope / Modifiers])`
  - *Example:* `Watts to Amps Calculator (DC, Single-Phase & 3-Phase AC)`
  - *Example:* `Generator Size Calculator (Home Backup, RV & Portable)`

### 2.3 Meta Description (`metadata.description`)
- **Length:** 135 to 160 characters.
- **Formula:** Start with an active verb (*"Calculate"*, *"Convert"*, *"Estimate"*, *"Size"*), name the exact inputs and outputs, and highlight the engineering baseline (e.g., *NEC 125% continuous load*, *motor startup surge*, *inverter efficiency*).

### 2.4 Heading Hierarchy (`<h1>` → `<h2>` → `<h3>`)
- **Exactly One `<h1>`:** Rendered by `CalculatorShell` (`title` prop). Must include the primary calculator name naturally.
- **Logical `<h2>` Sections:**
  1. Calculation Methodology & Formula (`FormulaSection`)
  2. Step-by-Step Worked Example (`WorkedExampleSection`)
  3. Domain-Specific Reference Table (when applicable, e.g., Generator Technology Comparison)
  4. Calculation Assumptions & Real-World Variables (`AssumptionsSection`)
  5. Electrical Safety & Engineering Disclaimer (`DisclaimerSection`)
  6. Frequently Asked Questions (`FaqSection`)
  7. Related Electrical & Power Calculators (`RelatedCalculators`)
- **Subsections (`<h3>`):** Used strictly inside `<h2>` sections (e.g., Variables & Constants, individual FAQ questions, related tool titles). Never skip heading levels (`<h1>` to `<h4>`).

---

## 3. Required Functional & Content Modules (`CalculatorShell`)

Do not pad calculator pages with generic essays. Every supporting module must directly explain or validate the calculation:

| Order | Component | SEO / AEO / User Purpose | Mandatory Requirements |
|---|---|---|---|
| **1** | **Visible Breadcrumb** (`CalculatorShell`) | Crawl hierarchy & upward internal linking | Renders `<nav aria-label="Breadcrumb">` linking `Home` → `Calculators` → `[Current Tool]`. |
| **2** | **Interactive Calculator + Preloaded Default** | Primary user utility & immediate SSR content | Must initialize with a realistic default scenario so SSR HTML displays a complete calculation immediately. |
| **3** | **`FormulaSection`** | AEO formula extraction & engineering trust | Displays exact equation(s), defines every variable symbol + unit, and states boundary conditions. |
| **4** | **`WorkedExampleSection`** | GEO verification & user comprehension | Walks through 3–4 numbered steps with real numbers matching the calculator's exact formula. |
| **5** | **`AssumptionsSection`** | Transparency & semantic table extraction | Responsive dual-view (`<640px` cards, `>=640px` `<table>`) listing Default Value, Field Range, and Practical Impact. |
| **6** | **`DisclaimerSection`** | Electrical safety & YMYL responsibility | Cites applicable U.S. standards (NEC, CPSC, CDC, IEEE) and clarifies when a licensed electrician is required. |
| **7** | **`FaqSection`** | Long-tail AEO & `FAQPage` schema match | Uses native HTML `<details>`/`<summary>` so 100% of answers exist in SSR HTML DOM and match `FAQPage` JSON-LD verbatim. |
| **8** | **`RelatedCalculators`** | Internal link cluster connectivity | Links to 2–3 sibling calculators, any companion sizing guides, and `/calculators`. |

---

## 4. Structured Data Rules for Calculator Pages

Every calculator page (`src/app/[slug]/page.tsx`) must inject three validated JSON-LD blocks:

1. **`WebApplication` (`generateWebApplicationSchema`):**
   - `applicationCategory: "UtilitiesApplication"`
   - `operatingSystem: "All"`
   - `offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }`
   - `author` / `publisher` linked to `https://calcmypower.com/#organization`.
2. **`BreadcrumbList` (`generateBreadcrumbSchema`):**
   - Position 1: `Home` (`https://calcmypower.com`)
   - Position 2: `Calculators` (`https://calcmypower.com/calculators`)
   - Position 3: `[Calculator Name]` (`https://calcmypower.com/[slug]`)
3. **`FAQPage` (`generateFaqSchema`):**
   - **Strict Synchronization Rule:** Every question and answer in `generateFaqSchema(...)` must match the visible `<FaqSection faqs={...} />` array **1:1** (best practice: define a single `const FAQ_ITEMS = [...]` constant in the page or component and pass it to both).

---

## 5. UX, Accessibility & Core Web Vitals Rules

1. **Form Control Accessibility:** Every `<input>` and `<select>` must have a unique `id`, `name`, and an explicitly associated `<label htmlFor="...">` or `aria-label`. Never use `<label>` for non-control section headings.
2. **Mobile Responsiveness (`390px` Viewport):**
   - Zero horizontal page overflow (`overflow-x`).
   - Dense multi-column tables must use the dual-view pattern (`sm:hidden` stacked cards on mobile, `hidden sm:block` `<table>` on desktop).
   - Native `<select>` `<option>` text must stay concise (`<= 38` chars) so mobile pickers do not clip text.
3. **Zero CLS (Cumulative Layout Shift):**
   - Pre-render the default calculation state on the server.
   - Reserve space for validation alerts or result cards.
4. **Fast INP (Interaction to Next Paint):**
   - Keep calculation functions pure and synchronous (`O(n)` arithmetic in `<1ms`) inside `useMemo`.
