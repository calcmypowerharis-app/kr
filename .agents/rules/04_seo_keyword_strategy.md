# CalcMyPower Rulebook - Domain 04: SEO, Keyword Research & Authoritative Sources

> Antigravity Modular Rule Specification: Category `04_seo_keyword_strategy.md`
> Auto-discovered by Antigravity from `.agents/rules/*.md`.
> Strict Zero-Truncation Constraint: Size <= 22,000 bytes (< 24 KB per-file ceiling).

## 7. SEO Rules
SEO should follow search intent, not keyword density.

For every page:
- one clear primary search intent
- descriptive title and H1
- useful introduction that gets to the task quickly
- semantic supporting terms naturally
- strong internal links to relevant calculators
- unique meta title/description
- canonical URL
- Open Graph basics
- appropriate structured data only when genuinely supported
- XML sitemap coverage
- robots.txt correctness
- clean URLs
- strong Core Web Vitals

Do not create multiple pages that target the same intent merely to capture variants.

### 7.1 Metadata Single Source of Truth & Registry Parity
- `src/lib/seo/registry.ts` is the single source of truth for all public routes, including `/` and `/calculators`.
- Every route exported in `src/app/**/page.tsx` must be 100% byte-identical to `registry.ts` for:
  - `title` and `metaTitle`
  - `description` and `metaDescription`
  - `alternates.canonical`
- Automated regression test `src/lib/seo/__tests__/editorial-quality.test.ts` enforces this synchronization on every build.

### 7.2 SERP Snippet Optimization Standard
- Treat title (<= 65 chars) and description (<= 165 chars) character limits as editorial heuristics, not mechanical rules.
- Optimize for primary search intent, unique click-through value, and transparent engineering formula promises.
- Never use generic keyword stuffing or template-based repetitive phrasing.
- Never assert unsupported claims (e.g. universal NEC limits or codes) unless the exact page content verifies it.

### 7.3 Contextual Internal Linking & Topical Cluster Connectivity
- **Calculator Result Callouts:** Every interactive calculator must include a contextual companion guide card or note below calculation results linking to the cluster's deep-dive methodology guide.
- **Reciprocal Sibling Paths:** When an editorial guide links to a sibling guide in the same cluster, the destination guide must include a reciprocal contextual link back (no one-way dead ends).
- **Complementary Tool Bridges:** Cross-link complementary electrical tools (e.g., Voltage Drop -> Watts to Amps -> Series/Parallel Solar Wiring).
- **Zero Orphan Guarantee:** Every calculator and guide must receive >= 3 distinct inbound links across templates, verified by `seo-foundation.test.ts`.
- **Registry Alignment:** `relatedGuidePaths` and `relatedCalculatorPaths` in `registry.ts` must stay 100% synchronized with the physical links rendered in the DOM.

### 7.4 Structured Data (Schema.org) 1:1 Parity Standard
- Visible FAQ accordions (`<details><summary>`) and `FAQPage` JSON-LD schemas must be 100% byte-identical.
- All schema data arrays must be authored in pure TypeScript library files (`src/lib/calculators/`) or directly within `page.tsx` (never exported across client-to-server component boundaries).

### 7.5 Visual SEO & Asset Optimization Standard
- All article and calculator images must use modern WebP format (< 150 KB) with static descriptive `alt` text >= 20 characters.
- Every technical diagram, schematic, or 1:1 square graphic must use `ZoomableArticleImage` with `aspectRatio="square"` and `objectFit="contain"` on `bg-slate-50` to guarantee zero cropping of meters, gauges, or labels.

### 7.6 Live Production HTTP Verification Standard
- Never report a release or change as live based solely on Git commit, push, or merge status.
- Execute automated HTTP verification scripts (e.g., `scripts/verify_phase2_batch2_live.py`) against `https://calcmypower.com`, confirming HTTP 200 status, correct `<title>`, `<meta name="description">`, canonical links, and the physical presence of target links in the live DOM.
- Write all verification tooling as Python scripts in `scripts/` to avoid fragile Windows PowerShell inline CLI quote/regex escaping bugs.

## 8. Keyword Research Rules
Never choose a keyword from SEMrush based only on green KD.

For each candidate, consider:
- US search volume
- keyword difficulty / personal difficulty when available
- search intent
- CPC/commercial value
- current SERP composition
- strength and type of competing pages
- whether existing tools are poor/outdated
- whether a calculator can satisfy the intent better
- Amazon product connection
- topical relevance to the CalcMyPower ecosystem

Search-result reality beats a single keyword metric.

## 9. Sources & Accuracy
For technical/electrical/energy information, prefer primary or authoritative sources such as:
- US Department of Energy
- National Renewable Energy Laboratory
- Energy Information Administration
- IRS (for tax matters)
- manufacturer documentation
- utility/provider documentation when relevant
- recognized standards bodies when appropriate

Use citations/links where factual claims depend on external sources.

Never fabricate a source.

## 10. Safety & Code Compliance
Electrical, battery, solar, generator, and wiring information can create real-world safety risks.
When a calculation or recommendation could affect installation safety:
- explain relevant assumptions
- avoid presenting estimates as professional engineering approval
- recommend following local code and manufacturer instructions
- flag situations that require a qualified electrician/engineer
- cite authoritative standards (e.g., NEC 690.7, NEC 690.9, NEC 702) purely as objective technical references for sizing equations and safety factors
- do NOT present the site or its content as an accredited certification body or officially approved compliance methodology
- do NOT introduce out-of-scope standards (such as IEEE 1547 for DC wiring guides) unless explicitly specified in the approved SEO handoff

