# CalcMyPower.com - 2026 Google Search & AI Algorithm Executive Directive

**Date:** October 19, 2026  
**Target:** Web Manager (`Solar Power Project`)  
**Context:** Post-Release 2026 Search & AI Strategy Alignment (Post Oct 18 Release Baseline)

---

## 1. Executive Approval & Stability Freeze Discipline

Aapka 2026 Search & AI Algorithm audit bohot comprehensive, accurate aur spot-on hai. Audit ke tamam key findings aur 4 identified codebase gaps **fully approved** hain.

> [!IMPORTANT]
> **14-Day Stability Freeze Mandatory Adherence:**  
> Site par active 14-day indexing stability freeze (**October 18 to November 1, 2026**) ko 100% respect kiya jaye ga.  
> Is doran **koi URL structure, canonical tags, redirects (308 apex), ya robots.txt directives change nahi hon gy**. Tamam structural deployment November 1, 2026 ke baad hogi.

---

## 2. The 4 Critical Codebase Gaps & Action Items (Pre-deploy prep)

Web Manager is freeze window ke doran code diffs aur assets prepare rakhay ga taake Nov 1 ko deployment frictionless ho:

### Task 1: E-E-A-T & Authorship Modernization (YMYL Compliance)
* **File:** `src/lib/seo/schema.ts` (Line ~166)
* **Gap:** Generic `"CalcMyPower Technical Publishing"` anonymous author.
* **Fix:** Replace with named, licensed reviewer using Schema.org `@type: "Person"`:
  * Name of Licensed Electrical Engineer (PE) or Master Electrician.
  * Explicit `jobTitle`, `hasCredential`, and `sameAs` authority links (e.g., LinkedIn / verified professional registry).
  * Align with Google's Quality Rater Guidelines on YMYL electrical & battery safety.

### Task 2: Schema Modernization (Deprecate HowTo -> MathSolver)
* **Target:** All 17+ interactive calculator schema wrappers.
* **Gap:** Outdated `HowTo` rich snippet references (which Google officially deprecated for desktop).
* **Fix:** Implement Google-supported **`MathSolver` (`SolveMathAction`)** structured data.
  * Explicitly define inputs, mathematical equations (NEC 125% rule, Peukert's exponent, LiFePO4 DoD), and step-by-step solution logic.

### Task 3: Affiliate Link Compliance
* **File:** `src/config/affiliate.ts` (Line ~28)
* **Gap:** Existing `rel="nofollow noopener noreferrer"`.
* **Fix:** Update strictly to **`rel="sponsored nofollow noopener noreferrer"`**.
  * Mandated by Google Search Essentials to prevent algorithmic thin-affiliate penalties under the Helpful Content / Core Updates.

### Task 4: UI & Schema Date Synchronization (Single Source of Truth)
* **File:** `src/components/calculators/CalculatorShell.tsx` (Line ~24)
* **Gap:** Hardcoded string `"September 2026"`.
* **Fix:** Bind visible date dynamically to `CALCULATOR_REGISTRY[i].lastModified`.
  * Guarantees 1:1 parity across visible UI, JSON-LD schema `dateModified`, and XML sitemap `<lastmod>`, eliminating "deceptive freshness" discrepancies.

### Task 5: AI Overview (AIO) Atomic Answer Blocks
* **Target:** Body content of each calculator page.
* **Fix:** Ensure an atomic, declarative answer block of **40–50 words** directly beneath the primary H2.
  * Formatted for direct extraction by Google AI Overviews and Search Generative Experience (SGE).

---

## 3. Deployment Timeline

1. **Pre-Nov 1:** Code modifications written, linted, and Vitest-verified locally on feature branch; zero remote changes to routing or indexing.
2. **Nov 1, 2026:** Freeze lifted -> PR merged and deployed -> Google Search Console crawl rate & inspection re-verified.
