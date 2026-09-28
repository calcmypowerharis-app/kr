# CalcMyPower.com — Comprehensive Technical & On-Page SEO Audit (`SEO_AUDIT.md`)

**Audit Date:** 2026-09-28  
**Lead SEO Foundation Specialist:** Antigravity (Gemini 3.8 Flash High)  
**Primary Source of Truth:** Google Search Central Official Documentation (Search Essentials, Spam Policies, Helpful Content, Crawling & Indexing, Structured Data, Page Experience & Core Web Vitals, JavaScript SEO)  
**Repository Audited:** `d:\Solar Power Project` (Next.js 15 App Router, React 19, TypeScript, Tailwind CSS)

---

## 1. Executive Summary

CalcMyPower.com has a strong engineering foundation: pure TypeScript mathematical engines in `src/lib/calculators/`, zero thin placeholder pages, accurate formulas, and high-value technical content across 3 interactive calculators and 2 long-form sizing guides.

However, deep inspection of the source code and the compiled `.next/server/app/*.html` static build artifacts revealed **two critical JavaScript/SSR indexing bugs**, **one high-severity title duplication bug**, **one high-severity internal-linking/orphan-risk issue**, and several structural gaps in breadcrumbs, sitemap `lastmod` handling, 404 recovery, and entity schema.

Every finding below is strictly categorized into:
- **CONFIRMED:** Verified directly in repository source code or compiled `.next` static HTML output.
- **LIKELY:** High-probability technical behavior based on Next.js 15 / Googlebot rendering mechanics.
- **ASSUMPTION / HYPOTHESIS:** Strategic SEO best practice not explicitly mandated as a hard requirement by Google Search Central.
- **REQUIRES EXTERNAL DATA:** Metrics requiring Google Search Console (GSC), CrUX field data, or live backlink/SERP tracking.

---

## 2. Google Search Central Compliance Baseline (Phase 2)

All findings and recommendations in this audit are anchored to official Google Search Central documentation:

1. **Google Search Essentials & JavaScript SEO:** Googlebot processes JavaScript in two waves (initial SSR HTML crawl followed by headless Chromium rendering). Pages that bail out of static rendering (`BAILOUT_TO_CLIENT_SIDE_RENDERING`) or unmount text from the DOM until user click (`{isOpen && ...}`) risk delayed indexing, missing snippet text, and invisible content for non-executing crawlers.
2. **Structured Data General Guidelines:** Marked-up structured data (`FAQPage`, `BreadcrumbList`, `WebApplication`, `Article`) must correspond to content that is present in the rendered HTML DOM and visible/accessible to users. Note: Per Google's August 2023 update, `FAQPage` rich results in Google Search are largely restricted to authoritative government and health websites; however, valid `FAQPage` JSON-LD remains useful for schema graph completeness and non-Google answer engines, provided the answers exist in the HTML DOM.
3. **Title Links & Snippets:** `<title>` elements must be concise, unique, and descriptive of the specific page without repetitive boilerplate (`| CalcMyPower | CalcMyPower`).
4. **Sitemaps (`<lastmod>`, `<priority>`, `<changefreq>`):** Google Search Central explicitly documents that Google **ignores** `<priority>` and `<changefreq>`, and uses `<lastmod>` only if it is **consistently and verifiably accurate** (reflecting the actual date of the last significant content change, not a dynamic `new Date()` timestamp generated on every build).
5. **People-First Content & Scaled Content Abuse Policy:** Creating empty category pages, thin keyword-variant calculators, or unverified AI filler violates Google's spam policies regardless of whether humans or AI wrote the text.

---

## 3. Prioritized Findings Matrix (CRITICAL / HIGH / MEDIUM / LOW)

### CRITICAL Severity

#### [CRITICAL-01] Full-Page SSR Bailout (`BAILOUT_TO_CLIENT_SIDE_RENDERING`) on `/generator-size-calculator`
- **Status:** **CONFIRMED** (Verified in `src/components/calculators/GeneratorSizeCalculator.tsx` and `.next/server/app/generator-size-calculator.html`)
- **Root Cause:** `GeneratorSizeCalculatorInner` calls `useSearchParams()` at the top of the component to read `?scenario=...` and wraps the entire component tree (including `<CalculatorShell>`, `<h1>Generator Size Calculator</h1>`, introductory copy, input tables, results, `<FormulaSection>`, `<WorkedExampleSection>`, `<AssumptionsSection>`, `<FaqSection>`, and `<RelatedCalculators>`) inside `<Suspense fallback={null}>`.
- **Verified Build Evidence:** Inspecting `.next/server/app/generator-size-calculator.html` confirms that `<main>` contains **zero HTML elements** outside the 3 JSON-LD `<script>` tags—only `<!--$!--><template data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING"></template><!--/$-->`.
- **SEO & CWV Impact:**
  1. Initial HTTP response HTML contains **no `<h1>`**, **no body text**, and **no internal links** (`<RelatedCalculators>`).
  2. Any search crawler or AI/LLM retrieval bot that reads initial SSR HTML sees a blank page.
  3. Because `fallback={null}` renders `0px` height on initial paint, the global `<Footer>` renders at the top of the viewport and violently shifts downward when client JS hydrates (severe CLS and delayed LCP).
- **Fix:** Isolate `useSearchParams()` into a tiny child synchronization component (`<ScenarioQueryReader />`) wrapped in `<Suspense fallback={null}>`, allowing `GeneratorSizeCalculator` to pre-render 100% of its default HTML (`Essential Outage` preset, `<h1>`, formulas, worked examples, tables, safety rules, FAQs, and internal links) statically at build time.

#### [CRITICAL-02] Calculator FAQ Answers Are Conditionally Unmounted from SSR HTML DOM (`FaqSection.tsx`)
- **Status:** **CONFIRMED** (Verified in `src/components/calculators/FaqSection.tsx` line 58 and `.next/server/app/watts-to-amps-calculator.html`)
- **Root Cause:** `FaqSection.tsx` initializes `const [openIndex, setOpenIndex] = useState<number | null>(null)` and conditionally mounts the answer with `{isOpen && ( <div>{faq.answer}</div> )}`.
- **Verified Build Evidence:** Stripping `<script>` tags from `.next/server/app/watts-to-amps-calculator.html` and `.next/server/app/ups-battery-backup-calculator.html` confirms that while the FAQ questions (`{faq.question}`) exist in the HTML DOM, **zero FAQ answers (`{faq.answer}`) exist in the HTML DOM**.
- **SEO, Schema & AEO Impact:**
  1. Googlebot and AI crawlers do not click accordion buttons; unmounted React branches (`{false && ...}`) are completely absent from the DOM.
  2. All three calculator pages inject `FAQPage` JSON-LD containing answers that are not in the initial rendered HTML DOM, conflicting with Google's Structured Data General Guidelines.
  3. Native browser "Find in page" (`Ctrl+F`) cannot locate text inside unmounted FAQ answers.
- **Fix:** Refactor `FaqSection.tsx` to use native HTML5 `<details>` and `<summary>` disclosure elements (with the first item open by default, `open={idx === 0}`). This guarantees 100% of FAQ answers are present in the static SSR HTML DOM, accessible without JavaScript, and discoverable by browser `Ctrl+F` and search engines.

---

### HIGH Severity

#### [HIGH-01] Duplicate Brand Suffix in `<title>` on `/what-size-generator-to-run-a-refrigerator`
- **Status:** **CONFIRMED** (`src/app/what-size-generator-to-run-a-refrigerator/page.tsx` line 30 + `src/app/layout.tsx` line 10)
- **Root Cause:** `src/app/layout.tsx` defines `title.template = "%s | CalcMyPower"`. However, `src/app/what-size-generator-to-run-a-refrigerator/page.tsx` explicitly includes `| CalcMyPower` in its page `title` string (`"What Size Generator to Run a Refrigerator? Sizing Guide | CalcMyPower"`).
- **Impact:** Renders `<title>What Size Generator to Run a Refrigerator? Sizing Guide | CalcMyPower | CalcMyPower</title>`, wasting title pixel width and signaling template carelessness in SERPs.
- **Fix:** Remove ` | CalcMyPower` from `what-size-generator-to-run-a-refrigerator/page.tsx` and enforce a centralized metadata helper + automated test preventing `| CalcMyPower` in child page titles.

#### [HIGH-02] Near-Orphaned Editorial Guide & Missing Bottom Sections (`/what-size-generator-to-run-a-refrigerator`)
- **Status:** **CONFIRMED**
- **Root Cause:**
  1. `/what-size-generator-to-run-a-refrigerator` is **not linked** from the Homepage (`src/app/page.tsx`), **not linked** from the Calculators Directory (`src/app/calculators/page.tsx`), **not linked** from the global `Footer.tsx`, and **not linked** from the companion guide (`/what-size-generator-do-i-need-for-my-house`). Its only incoming internal link is a single inline link inside `/generator-size-calculator`.
  2. Unlike `/what-size-generator-do-i-need-for-my-house` (which concludes with a "Related Power & Sizing Tools" grid and an "Authoritative Sources & References" section), `/what-size-generator-to-run-a-refrigerator` abruptly ends after the FAQ section without related tool cards or a formal source bibliography.
- **Fix:**
  1. Feature both guides on the Homepage (`src/app/page.tsx`), on `/calculators` (`src/app/calculators/page.tsx`), and in `Footer.tsx`.
  2. Add cross-links between `/what-size-generator-do-i-need-for-my-house` and `/what-size-generator-to-run-a-refrigerator`.
  3. Add the "Related Power & Sizing Tools" and "Authoritative Sources & References" sections to `/what-size-generator-to-run-a-refrigerator/page.tsx`.

#### [HIGH-03] Missing Visible Breadcrumb Navigation on All Calculator Pages & Directory
- **Status:** **CONFIRMED** (`src/components/calculators/CalculatorShell.tsx` lines 32–41)
- **Root Cause:** All calculator pages inject `BreadcrumbList` JSON-LD (`Home > Calculators > [Calculator]`), but `CalculatorShell.tsx` only renders non-linked category/badge pills at the top of the page.
- **Impact:** Violates Google's structured data expectation that `BreadcrumbList` markup reflects visible breadcrumb links on the page, and forfeits upward internal link equity to `/` and `/calculators`.
- **Fix:** Render a semantic, accessible `<nav aria-label="Breadcrumb">` in `CalculatorShell.tsx` (`Home / Calculators / [Current Tool]`) and on `/calculators/page.tsx`, and include `/generator-size-calculator` in the breadcrumb trail of generator sizing guides.

---

### MEDIUM Severity

#### [MEDIUM-01] Dynamic `new Date()` in `src/app/sitemap.ts` & Uncentralized Route List
- **Status:** **CONFIRMED** (`src/app/sitemap.ts` line 5)
- **Root Cause:** `sitemap.ts` sets `const now = new Date()` on every build/request for all URLs and relies on a manually maintained array.
- **Impact:** Google Search Central states that `<lastmod>` is ignored if it merely reflects when the sitemap was generated rather than the true last modification date of each page.
- **Fix:** Drive `src/app/sitemap.ts` from a centralized route registry (`src/lib/seo/registry.ts`) with explicit, verifiable `YYYY-MM-DD` `lastModified` dates.

#### [MEDIUM-02] Invalid Nested `<main>` Landmark on `/what-size-generator-to-run-a-refrigerator`
- **Status:** **CONFIRMED** (`src/app/layout.tsx` line 74 + `src/app/what-size-generator-to-run-a-refrigerator/page.tsx` line 158)
- **Root Cause:** Root `layout.tsx` wraps `{children}` in `<main className="flex-grow">`, and `what-size-generator-to-run-a-refrigerator/page.tsx` also uses `<main>` as its outer wrapper, producing `<main><main>...</main></main>`.
- **Impact:** Invalid HTML5 landmark hierarchy and screen-reader accessibility warning.
- **Fix:** Replace the inner `<main>` in `what-size-generator-to-run-a-refrigerator/page.tsx` with `<div>` (matching the pattern on all other pages).

#### [MEDIUM-03] Missing Custom `not-found.tsx` (404 Page)
- **Status:** **CONFIRMED** (No `src/app/not-found.tsx` in repository)
- **Impact:** Users hitting a mistyped URL see Next.js's bare default 404 screen with no navigation links to live calculators or guides.
- **Fix:** Create `src/app/not-found.tsx` with clear navigation links to all live calculators, sizing guides, and the `/calculators` hub.

#### [MEDIUM-04] Incomplete Open Graph / Twitter Metadata Merging on Child Pages
- **Status:** **CONFIRMED** (`src/app/page.tsx`, `src/app/calculators/page.tsx`, and calculator pages)
- **Root Cause:** Next.js App Router shallow-replaces `openGraph` and `twitter` metadata objects when defined in child pages. Pages that omit `openGraph` (`/calculators`) inherit the homepage `openGraph.url` (`https://calcmypower.com`) and homepage OG title! Pages that define partial `openGraph` (`/ups-battery-backup-calculator`) lose `siteName: "CalcMyPower"` and `locale: "en_US"`.
- **Fix:** Implement `buildPageMetadata()` in `src/lib/seo/metadata.ts` and apply it across all pages so every route outputs complete, self-consistent `canonical`, `openGraph`, and `twitter` metadata.

#### [MEDIUM-05] Missing `Organization` & `CollectionPage` JSON-LD Structured Data
- **Status:** **CONFIRMED** (`src/lib/seo/schema.ts`)
- **Root Cause:** Homepage only outputs a minimal `WebSite` schema without an `Organization` entity, and `/calculators` outputs no structured data.
- **Fix:** Add `generateOrganizationSchema()` and `generateCollectionPageSchema()` with linked `@id` URIs (`https://calcmypower.com/#organization`, `https://calcmypower.com/#website`).

---

### LOW Severity

#### [LOW-01] Em-Dash (`—`) in Root `layout.tsx` Default Metadata Titles
- **Status:** **CONFIRMED** (`src/app/layout.tsx` lines 9, 35, 41)
- **Root Cause:** `layout.tsx` uses `"CalcMyPower — Power, Energy & Electrical Calculators"`. While `editorial-quality.test.ts` checks articles, `GEMINI.md` bans em-dashes across project copy.
- **Fix:** Replace `—` with `|` in `src/app/layout.tsx`.

#### [LOW-02] Redundant `keywords` Meta Tag Arrays on Some Pages
- **Status:** **CONFIRMED** (`src/app/layout.tsx`, `watts-to-amps-calculator/page.tsx`, `generator-size-calculator/page.tsx`)
- **Context:** Google has officially ignored `<meta name="keywords">` since 2009. While harmless in small quantities, relying on `keywords` metadata provides zero Google ranking benefit and should not be treated as an SEO signal.

---

## 4. Technical SEO Audit Checklist by Category (Phase 3)

| Audit Area | Current Status | Classification | Evidence & Notes |
|---|---|---|---|
| **`robots.txt`** | **PASS** | **CONFIRMED** | `src/app/robots.ts` allows `/`, disallows `/api/`, and declares `Sitemap: https://calcmypower.com/sitemap.xml`. |
| **XML Sitemap** | **PARTIAL → FIXED** | **CONFIRMED** | All 7 indexable routes included, but used `new Date()` on every build instead of verifiable per-page `lastModified` dates. |
| **Canonical URLs** | **PASS** | **CONFIRMED** | Every indexable page declares an explicit `alternates.canonical` matching `https://calcmypower.com/...` without trailing slash. Query params (`?scenario=...`) properly canonicalize to the base calculator URL. |
| **Index / Noindex** | **PASS** | **CONFIRMED** | `robots: { index: true, follow: true }` with `max-snippet: -1` and `max-image-preview: "large"` in `layout.tsx`. |
| **URL Structure & Trailing Slashes** | **PASS** | **CONFIRMED** | Clean lowercase hyphenated slugs; Next.js default `trailingSlash: false` enforced consistently across all internal `<Link>` and canonical tags. |
| **404 / Status Codes** | **NEEDS WORK → FIXED** | **CONFIRMED** | Added custom `src/app/not-found.tsx` with calculator recovery links. |
| **Title Tags & Meta Descriptions** | **PARTIAL → FIXED** | **CONFIRMED** | Fixed duplicate `\| CalcMyPower \| CalcMyPower` on `/what-size-generator-to-run-a-refrigerator` and standardized OpenGraph/Twitter metadata across all 7 routes. |
| **H1 / H2 Hierarchy** | **PASS** | **CONFIRMED** | Every page has exactly one `<h1>` and logical `<h2>`/`<h3>` nesting (once `CRITICAL-01` SSR bailout on `/generator-size-calculator` is fixed). |
| **Breadcrumbs** | **NEEDS WORK → FIXED** | **CONFIRMED** | Added visible `<nav aria-label="Breadcrumb">` on all calculator pages and `/calculators` to match `BreadcrumbList` JSON-LD. |
| **Structured Data** | **PARTIAL → FIXED** | **CONFIRMED** | Fixed DOM visibility of `FAQPage` answers (`FaqSection.tsx`), added `Organization` and `CollectionPage` schemas, and connected `@id` entities. |
| **Internal Linking & Orphan Pages** | **NEEDS WORK → FIXED** | **CONFIRMED** | Linked `/what-size-generator-to-run-a-refrigerator` from Homepage, `/calculators`, Footer, and `/what-size-generator-do-i-need-for-my-house`; added related tools & sources to refrigerator guide. |
| **Image SEO & Optimization** | **PASS** | **CONFIRMED** | Next.js `<Image>` with `priority` on hero LCP images, explicit `sizes`, descriptive filenames, and 100% unique assets verified by `editorial-quality.test.ts`. |
| **JavaScript Rendering / SSR** | **CRITICAL → FIXED** | **CONFIRMED** | Fixed `<Suspense fallback={null}>` full-page SSR bailout on `/generator-size-calculator` and unmounted FAQ answers in `FaqSection.tsx`. |
| **Core Web Vitals & Performance** | **PASS (Lab)** | **CONFIRMED (Lab) / EXTERNAL (Field)** | System font stack (zero webfont layout shift/FOIT), lightweight SVG icons, static pre-rendering. Field CrUX data requires Google Search Console once traffic threshold is met. |
| **Mobile UX & Accessibility** | **PASS** | **CONFIRMED** | Dual-view responsive tables (`<640px` cards, `>=640px` tables), `>=44px` touch targets, associated `<label htmlFor>` on all inputs, fixed nested `<main>` on refrigerator guide. |

---

## 5. Items Requiring External Data (Cannot Be Verified From Repository Alone)

In accordance with project rules, the following items require external production data and are not guessed:
1. **Google Search Console (GSC) Index Coverage & Crawl Stats:** Actual Googlebot crawl frequency, discovered-not-indexed status, and live Rich Result reports.
2. **Chrome User Experience Report (CrUX) Field Data:** Real-user 75th-percentile LCP, INP, and CLS metrics across U.S. mobile devices.
3. **Live SERP Impressions, Click-Through Rate (CTR) & Ranking Positions:** Requires GSC Performance data to evaluate title/snippet CTR optimization opportunities.
4. **Domain Authority / Referring Domains:** Requires third-party backlink index or GSC Links report.
