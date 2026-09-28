# CalcMyPower.com — SEO Foundation Implementation Plan (`SEO_IMPLEMENTATION_PLAN.md`)

**Document Owner:** Lead SEO Foundation Specialist  
**Date:** 2026-09-28  
**Status:** Ready for Execution & QA

---

## 1. Implementation Priorities (Phase 13)

To maximize organic search impact without disrupting working calculator math or visual identity, implementation is ordered strictly by technical impact:

### Priority 1: Critical SSR & Crawlability Fixes (P0)
1. **Eliminate Full-Page SSR Bailout on `/generator-size-calculator` (`src/components/calculators/GeneratorSizeCalculator.tsx`):**
   - Extract `useSearchParams()` out of `GeneratorSizeCalculatorInner` into a lightweight child component `<ScenarioUrlSync onLoadScenario={...} />` wrapped in `<Suspense fallback={null}>`.
   - Render `GeneratorSizeCalculator` directly so Next.js 15 statically pre-renders the `<h1>`, introductory copy, default `Essential Outage` calculation, 4-step formula, worked example, comparison table, safety rules, assumptions, FAQs, and internal links into `.next/server/app/generator-size-calculator.html`.
2. **Ensure 100% SSR HTML DOM Presence for Calculator FAQs (`src/components/calculators/FaqSection.tsx`):**
   - Refactor `FaqSection.tsx` from conditional React unmounting (`{isOpen && <div>{faq.answer}</div>}`) to semantic HTML5 `<details>` and `<summary>` elements (with the first item open by default, `open={idx === 0}`).
   - Guarantees all FAQ answers exist in the initial SSR HTML DOM for Googlebot, AI/LLM crawlers, `FAQPage` structured data compliance, and native browser `Ctrl+F` search.

### Priority 2: Central SEO Registry, Sitemap & Metadata System (P0)
3. **Create Central SEO Route & Cluster Registry (`src/lib/seo/registry.ts`):**
   - Define structured metadata, topical clusters, verifiable `lastModified` ISO dates (`YYYY-MM-DD`), and relationship graphs for all live calculators and editorial guides.
4. **Create Reusable Metadata Builder (`src/lib/seo/metadata.ts`):**
   - Provide `buildPageMetadata()` to guarantee every page has an explicit `canonical` URL, non-duplicated `<title>`, complete `openGraph` (`siteName`, `locale`, `url`, `title`, `description`, `type`), and `twitter` card metadata.
5. **Upgrade `src/app/sitemap.ts`:**
   - Replace hardcoded URLs and dynamic `new Date()` timestamps with deterministic, verifiable `lastModified` dates sourced directly from `src/lib/seo/registry.ts`.
6. **Fix Duplicate Brand Suffix in `<title>` on `/what-size-generator-to-run-a-refrigerator/page.tsx` & Em-Dashes in `src/app/layout.tsx`:**
   - Remove redundant ` | CalcMyPower` from `what-size-generator-to-run-a-refrigerator/page.tsx` so the root template produces a single ` | CalcMyPower` suffix.
   - Standardize `src/app/layout.tsx` default titles to use `|` instead of em-dashes (`—`).

### Priority 3: Internal Linking, Visible Breadcrumbs & Orphan Elimination (P1)
7. **Add Visible Breadcrumb Navigation (`src/components/calculators/CalculatorShell.tsx` & `src/app/calculators/page.tsx`):**
   - Render a semantic `<nav aria-label="Breadcrumb">` at the top of `CalculatorShell` (`Home / Calculators / [Title]`) and on `/calculators` (`Home / Calculators`) matching the `BreadcrumbList` JSON-LD.
   - Update breadcrumb trails on both generator guides (`Home / Generator Size Calculator / [Guide Title]`) to strengthen topical cluster hierarchy.
8. **Connect `/what-size-generator-to-run-a-refrigerator` Across the Site:**
   - Add a second featured guide card on the Homepage (`src/app/page.tsx`) linking to `/what-size-generator-to-run-a-refrigerator`.
   - Add a "Sizing & Engineering Guides" section on `/calculators` (`src/app/calculators/page.tsx`) linking to both live guides.
   - Add a "Sizing Guides" link group in `src/components/layout/Footer.tsx`.
   - Add cross-links between `/what-size-generator-do-i-need-for-my-house` and `/what-size-generator-to-run-a-refrigerator`.
   - Add the missing **"Related Power & Sizing Tools"** section and **"Authoritative Sources & References"** footer section to `/what-size-generator-to-run-a-refrigerator/page.tsx`, and fix its nested `<main>` tag.

### Priority 4: Structured Data & 404 Recovery (P1)
9. **Enhance `src/lib/seo/schema.ts`:**
   - Add `generateOrganizationSchema()` and `generateCollectionPageSchema()`.
   - Link `WebSite`, `Organization`, `WebApplication`, and `Article` schemas with consistent `@id` identifiers (`https://calcmypower.com/#organization`, `https://calcmypower.com/#website`).
   - Inject `Organization` schema on `/` and `CollectionPage` + `BreadcrumbList` schema on `/calculators`.
10. **Create Custom 404 Page (`src/app/not-found.tsx`):**
    - Provide immediate recovery links to all 3 live calculators, both sizing guides, and `/calculators`.

### Priority 5: Automated SEO Guardrails & Verification Suite (P1)
11. **Create `src/lib/seo/__tests__/seo-foundation.test.ts`:**
    - Automated Vitest suite verifying:
      - All indexable `src/app` routes exist in `src/lib/seo/registry.ts` and `src/app/sitemap.ts`.
      - Zero child pages contain `| CalcMyPower` in `metadata.title` (preventing double brand suffixes).
      - Every page defines an explicit `canonical` URL matching its route.
      - Every internal `href="/..."` across `src/app` and `src/components` resolves to a valid existing route.
      - Every indexable content page receives at least 3 incoming internal links.
      - `FaqSection.tsx` uses `<details>`/`<summary>` without unmounting answers from SSR HTML.
      - `GeneratorSizeCalculator.tsx` does not wrap `<CalculatorShell>` inside `<Suspense fallback={null}>`.

---

## 2. Verification & QA Protocol (Phase 14)

After implementing the changes above:
1. Run `npm test` (Vitest unit tests + `editorial-quality.test.ts` + new `seo-foundation.test.ts`).
2. Run `npx tsc --noEmit` (TypeScript verification).
3. Run `npm run lint` (ESLint verification).
4. Run `npm run build` (Next.js 15 production static build).
5. Inspect compiled `.next/server/app/*.html` files to confirm:
   - `/generator-size-calculator.html` now contains `<h1>Generator Size Calculator</h1>` and full static HTML body content (no full-page `BAILOUT_TO_CLIENT_SIDE_RENDERING`).
   - All calculator `.html` files contain their FAQ answers directly in the HTML DOM outside `<script>` tags.
   - `/what-size-generator-to-run-a-refrigerator.html` has a clean single `<title>` suffix and single `<main>` landmark.
