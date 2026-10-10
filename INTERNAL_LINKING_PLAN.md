# CalcMyPower.com - Systematic Internal Linking Plan (`INTERNAL_LINKING_PLAN.md`)

**Document Owner:** Lead SEO Foundation Specialist  
**Status:** Production Standard  
**Applies To:** All calculators, editorial guides, hub pages, navigation bars, and automated link-integrity tests.

---

## 1. Core Principles of Internal Linking on CalcMyPower

Per Google Search Central's Link Best Practices:
1. **Crawlable `<a href="...">` Elements Only:** Every internal link must render as a standard HTML `<a href="/...">` (via Next.js `<Link>`) in the initial SSR HTML response. Never hide internal links inside unmounted client-only drawers or click-handlers (`router.push`).
2. **Zero Orphan or Single-Link Pages:** Every live indexable page on CalcMyPower must receive **at least 3 incoming internal links** from distinct pages/templates (e.g., `/calculators` directory hub + parent/sibling calculator + global footer/homepage or sibling guide).
3. **Natural, Descriptive Anchor Text:** Anchor text must describe the destination tool or calculation naturally (e.g., *"calculate single-motor starting surge in our Generator Size Calculator"*, *"convert appliance watts to circuit amps"*). Never force awkward exact-match keyword strings or generic *"click here"* / *"read more"* anchors.
4. **Strict Non-Existence Rule:** Never link to a planned calculator URL that does not yet return HTTP 200. Planned tools must be rendered as non-linked informational cards or routed to `/calculators` until the tool is live.

---

## 2. Mandatory Link Topology by Page Type

### A. Calculator Pages (`/[slug]-calculator`)
Every calculator page must include four distinct internal link zones:

1. **Upward Visible Breadcrumb (`CalculatorShell.tsx`):**
   - `Home` (`/`) → `Calculators` (`/calculators`) → `[Current Calculator]`
2. **Contextual Guide Banner / Callout (When Supporting Guides Exist):**
   - Placed directly above or below the formula section, linking to the cluster's deep-dive sizing guides with descriptive anchors (e.g., `/generator-size-calculator` links to `/what-size-generator-do-i-need-for-my-house` and `/what-size-generator-to-run-a-refrigerator`).
3. **Related Calculators & Companion Guides Grid (`RelatedCalculators.tsx`):**
   - Links to **2 to 3 closely related live calculators** (sibling or adjacent cluster tools) + **1 to 2 supporting guides** (when applicable) + the `/calculators` directory.
4. **Global Navigation (`Header.tsx` & `Footer.tsx`):**
   - Persistent access to flagship calculators and `/calculators`.

---

### B. Editorial Engineering Guides (`/[guide-slug]`)
Every editorial guide must include five distinct internal link zones:

1. **Upward Visible Breadcrumb:**
   - `Home` (`/`) → `[Parent Calculator]` (`/[parent-calculator-slug]`) → `[Current Guide Title]`
   - *Why:* Passing breadcrumb equity directly through the parent calculator reinforces the hub-and-spoke relationship between the informational guide and the interactive tool.
2. **Early Contextual Tool Link (Within First 250 Words):**
   - Natural inline link in the opening section pointing readers who already know their appliance loads directly to the parent calculator.
3. **Interactive Scenario Bridge (`?scenario=...`):**
   - Dedicated callout box linking to the parent calculator with a pre-loaded scenario query parameter (e.g., `/generator-size-calculator?scenario=winter-essentials` or `/generator-size-calculator?scenario=refrigerator-outage`), plus a secondary button to the clean calculator URL (`/generator-size-calculator`).
   - *Note:* Because the target calculator declares `canonical: "https://calcmypower.com/generator-size-calculator"`, Google consolidates link equity to the canonical calculator URL while users get a 1-click interactive prefill.
4. **Desktop Sticky Sidebar ("Useful Power Tools" in `TableOfContents.tsx`):**
   - Persistent sidebar links to the 3 core calculators (`/generator-size-calculator`, `/watts-to-amps-calculator`, `/ups-battery-backup-calculator`).
5. **Bottom "Related Power, Sizing Tools & Guides" Section:**
   - Cards linking to:
     - The parent calculator (`/generator-size-calculator`)
     - Sibling cluster guides (e.g., `/what-size-generator-do-i-need-for-my-house` ↔ `/what-size-generator-to-run-a-refrigerator`)
     - Adjacent calculators (`/watts-to-amps-calculator`, `/ups-battery-backup-calculator`)

---

### C. Homepage (`/`) & Calculators Directory (`/calculators`)
1. **Homepage (`src/app/page.tsx`):**
   - Links to all flagship live calculators (`/generator-size-calculator`, `/ups-battery-backup-calculator`, `/watts-to-amps-calculator`).
   - Links to **all live engineering guides** (`/what-size-generator-do-i-need-for-my-house` and `/what-size-generator-to-run-a-refrigerator`) in the "Practical Engineering Guides & Outage Planning" section.
   - Links to `/calculators`.
2. **Calculators & Guides Directory (`src/app/calculators/page.tsx`):**
   - Acts as the master HTML sitemap / topical hub.
   - Lists **100% of live calculators** and **100% of live engineering guides**, grouped logically by topical context, ensuring every indexable content page on the domain is 1 click from `/calculators` and at most 2 clicks from `/`.

---

## 3. Current Live Internal Link Matrix (Verified Post-Implementation)

| Source Page | Links To Calculators | Links To Guides | Links To Hubs |
|---|---|---|---|
| `/` (Homepage) | `/generator-size-calculator`<br>`/ups-battery-backup-calculator`<br>`/watts-to-amps-calculator` | `/what-size-generator-do-i-need-for-my-house`<br>`/what-size-generator-to-run-a-refrigerator` | `/calculators` |
| `/calculators` (Directory Hub) | `/generator-size-calculator`<br>`/ups-battery-backup-calculator`<br>`/watts-to-amps-calculator` | `/what-size-generator-do-i-need-for-my-house`<br>`/what-size-generator-to-run-a-refrigerator` | `/` (Breadcrumb) |
| `/generator-size-calculator` | `/ups-battery-backup-calculator`<br>`/watts-to-amps-calculator` | `/what-size-generator-do-i-need-for-my-house`<br>`/what-size-generator-to-run-a-refrigerator` | `/`, `/calculators` |
| `/ups-battery-backup-calculator` | `/watts-to-amps-calculator`<br>`/generator-size-calculator` | `/what-size-generator-do-i-need-for-my-house` | `/`, `/calculators` |
| `/watts-to-amps-calculator` | `/ups-battery-backup-calculator`<br>`/generator-size-calculator` | `/what-size-generator-do-i-need-for-my-house` | `/`, `/calculators` |
| `/what-size-generator-do-i-need-for-my-house` | `/generator-size-calculator` (+ `?scenario=winter-essentials`)<br>`/watts-to-amps-calculator`<br>`/ups-battery-backup-calculator` | `/what-size-generator-to-run-a-refrigerator` | `/`, `/calculators` |
| `/what-size-generator-to-run-a-refrigerator` | `/generator-size-calculator` (+ `?scenario=refrigerator-outage`)<br>`/watts-to-amps-calculator`<br>`/ups-battery-backup-calculator` | `/what-size-generator-do-i-need-for-my-house` | `/`, `/calculators` |

---

## 4. Phase 2 Contextual & Companion Linking Matrix (Verified Post-Implementation)

The following high-value contextual links were implemented and verified across Phase 2 Batches 1 & 2:

| Source Route | Route Type | Destination Route | Destination Type | Link Location & Context |
|---|---|---|---|---|
| `/generator-fuel-consumption-calculator` | Calculator | `/how-much-gas-does-a-generator-use` | Guide | Contextual companion banner above fuel results |
| `/solar-charge-controller-calculator` | Calculator | `/how-to-size-a-solar-charge-controller` | Guide | Contextual sizing guide banner above results |
| `/solar-system-size-calculator` | Calculator | `/how-many-solar-panels-do-i-need` | Guide | Companion card below comparison table |
| `/solar-system-size-calculator` | Calculator | `/how-much-energy-does-a-solar-panel-produce` | Guide | Companion card below comparison table |
| `/inverter-size-calculator` | Calculator | `/battery-capacity-calculator` | Calculator | Companion note below inverter results |
| `/inverter-size-calculator` | Calculator | `/how-many-amp-hours-do-i-need` | Guide | Companion note below inverter results |
| `/voltage-drop-calculator` | Calculator | `/watts-to-amps-calculator` | Calculator | Related circuit tools card |
| `/voltage-drop-calculator` | Calculator | `/solar-panels-series-vs-parallel` | Guide | Related circuit tools card |
| `/how-many-amp-hours-do-i-need` | Guide | `/how-to-calculate-amp-hours-of-a-battery-bank` | Guide | Section 8 companion callout card |
| `/how-many-amp-hours-do-i-need` | Guide | `/how-long-will-a-100ah-battery-last` | Guide | Section 8 companion callout card |
| `/how-to-size-a-solar-charge-controller` | Guide | `/solar-panels-series-vs-parallel` | Guide | Section 4 series wiring note |
| `/how-to-size-a-solar-charge-controller` | Guide | `/solar-system-size-calculator` | Calculator | Section 9 interactive tool CTA |
| `/continuous-power-generators` | Guide | `/generator-fuel-consumption-calculator` | Calculator | Section 7 fuel logistics callout card |
| `/continuous-power-generators` | Guide | `/how-much-gas-does-a-generator-use` | Guide | Section 7 fuel logistics callout card |
| `/what-does-ah-mean-on-a-battery` | Guide | `/how-to-calculate-amp-hours-of-a-battery-bank` | Guide | Section 10 Mistake 4 wiring note |
| `/how-long-will-a-100ah-battery-last` | Guide | `/how-many-amp-hours-do-i-need` | Guide | Section 10 bank sizing callout card |
| `/how-long-will-a-100ah-battery-last` | Guide | `/how-to-calculate-amp-hours-of-a-battery-bank` | Guide | Section 10 bank sizing callout card |

---

## 5. Automated Enforcement Rule for Future Developers / AI Agents

Whenever a new calculator or editorial guide is added:
1. Register it in `src/lib/seo/registry.ts` with its `slug`, `cluster`, `relatedCalculatorSlugs`, and `relatedGuideSlugs`.
2. Add it to `src/app/calculators/page.tsx` (or let the directory render directly from `src/lib/seo/registry.ts`).
3. Add reciprocal links from at least 2 existing calculators/guides in the same or adjacent cluster.
4. Run `npm test` (`src/lib/seo/__tests__/seo-foundation.test.ts` and `src/lib/seo/__tests__/editorial-quality.test.ts`), which fails the build if any route in `src/app` is missing from `registry.ts`, missing from `sitemap.ts`, or has fewer than 2 incoming internal links across the codebase.

