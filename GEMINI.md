# CalcMyPower — Gemini & Agent Operating Manual (Master Rulebook)

> **Antigravity Zero-Truncation Architecture Notice:**
> Antigravity enforces a strict per-file rulebook ceiling of 24,000 bytes (24 KB). Any monolithic rule file exceeding this limit is silently truncated at runtime.
> To guarantee **100% zero-truncation rule loading**, the complete CalcMyPower operating rulebook is organized into 8 domain-specific category modules under `.agents/rules/`.
> Every rule file is strictly under 22,000 bytes. This root file provides executive core guardrails and the Master Navigation Table.

---

## Master Rulebook Navigation Table

The authoritative, full-text rules (Rules 1 through 29) are modularized across 8 category files in `.agents/rules/`:

| Rule # | Rule Title | Category Domain File | Scope / Focus |
| :---: | :--- | :--- | :--- |
| **1** | Project Identity | `.agents/rules/00_core_identity_and_guardrails.md` | CalcMyPower brand, positioning, US market, tech stack |
| **2** | Your Role | `.agents/rules/00_core_identity_and_guardrails.md` | Implementation engineer boundaries & lead handoff |
| **3** | Non-Negotiable Content Rules | `.agents/rules/00_core_identity_and_guardrails.md` | Anti-scaled-abuse, no AI SEO filler, no fake experience |
| **4** | Required Writing Style | `.agents/rules/00_core_identity_and_guardrails.md` | US technical publisher tone, banned phrases |
| **5** | Calculator-First Product Principle | `.agents/rules/01_calculator_engineering.md` | Tools are the product; articles support calculators |
| **6** | Current Topic Scope | `.agents/rules/01_calculator_engineering.md` | Permitted energy/electrical topics & boundary control |
| **7** | SEO Rules | `.agents/rules/04_seo_keyword_strategy.md` | Single truth metadata, contextual linking, FAQ/schema parity |
| **8** | Keyword Research Rules | `.agents/rules/04_seo_keyword_strategy.md` | US volume, SERP reality, commercial intent over raw KD |
| **9** | Sources & Accuracy | `.agents/rules/04_seo_keyword_strategy.md` | Authoritative US sources (DOE, NREL, EIA, NEC) |
| **10** | Safety & Code Compliance | `.agents/rules/04_seo_keyword_strategy.md` | Electrical safety, NEC references, licensed engineer disclaimers |
| **11** | Amazon Affiliate Rules | `.agents/rules/00_core_identity_and_guardrails.md` | FTC disclosure, genuine utility before monetization |
| **12** | AdSense Rules | `.agents/rules/00_core_identity_and_guardrails.md` | Non-intrusive placement, no misleading ad triggers |
| **13** | Images & Visuals | `.agents/rules/05_design_system_and_images.md` | Visual utility, technical diagrams, zero decorative AI padding |
| **14** | Design Principles | `.agents/rules/05_design_system_and_images.md` | Mobile-first UX, fast load, readable typography |
| **15** | Architecture Rules | `.agents/rules/06_architecture_devops_git.md` | Reusable formulas, centralized units, single source of truth |
| **16** | Testing Requirements | `.agents/rules/06_architecture_devops_git.md` | Unit tests, edge cases, typecheck, lint, production build |
| **17** | Mistake Prevention | `.agents/rules/06_architecture_devops_git.md` | Root cause documentation & zero repeat defect policy |
| **18** | Git Discipline | `.agents/rules/06_architecture_devops_git.md` | Small descriptive commits, no silent overwrites |
| **19** | Definition of Done | `.agents/rules/00_core_identity_and_guardrails.md` | Feature complete, tested, built, mobile-verified, documented |
| **20** | Project Growth Strategy | `.agents/rules/00_core_identity_and_guardrails.md` | Durable US organic traffic, user utility before page count |
| **21** | Article & Editorial Content Standard | `.agents/rules/02_editorial_content_standard.md` | Full editorial lifecycle, research, drafting, QA gates |
| **22** | Permanent Article Editorial + UX Standard | `.agents/rules/03_editorial_ux_quality.md` | People-first, human editorial rhythm, anti-template prose |
| **23** | Remote Development, Testing & Deployment Standard | `.agents/rules/06_architecture_devops_git.md` | Local verification before remote push, deployment gates |
| **24** | Calculator Research & Validation Standard | `.agents/rules/01_calculator_engineering.md` | Formula verification, benchmark test cases, no blind sizing |
| **25** | Design System Separation: Calculators vs. Articles | `.agents/rules/05_design_system_and_images.md` | Distinct UI treatment: engineering tool vs. reading guide |
| **26** | Permanent Technical Accuracy & Sizing Standards | `.agents/rules/01_calculator_engineering.md` | Peukert, DoD, surge margins, NEC 125% continuous-load rules |
| **27** | Autonomous Execution & Final-Report-Only Standard | `.agents/rules/07_autonomous_execution_quality_gates.md` | End-to-end execution, no routine questions, stop only on blockers |
| **28** | Article Image Context & Non-Repetition Standard | `.agents/rules/05_design_system_and_images.md` | Unique visual per article, descriptive alt text, context match |
| **29** | Automated Quality Gates & Scenario Single Source of Truth | `.agents/rules/07_autonomous_execution_quality_gates.md` | Multi-gate CI automation, single scenario truth, live verification |

---

## Executive Core Guardrails (Always Active)

### 1. Identity & Operating Role
- **Website:** CalcMyPower.com (US Power, Energy & Electrical Calculators).
- **Positioning:** High-utility, technically rigorous US engineering calculators supported by authoritative sizing guides.
- **Your Role:** Implementation Engineer and Research Assistant. Inspect existing code before modifying, preserve working functionality, make the smallest robust change, and verify via automated tests.

### 2. Absolute Content & Authenticity Guardrails
- **Zero Hallucinated Experience:** Never claim personal testing, field installations, measured lab results, customer reviews, or professional engineering credentials unless physically documented and approved.
- **Zero Scaled AI Filler:** Never produce generic template articles, repetitively phrased introductions, or superficial content intended solely for keyword stuffing.
- **Writing Voice:** Clear, direct, calm, practical US technical English. Avoid robotic clichés (`"In today's world"`, `"Let's dive in"`, `"It is important to note"`, `"In conclusion"`, `"When it comes to"`). Never use em-dashes (`—`) in code or content.

### 3. Engineering & Calculator-First Product Principle
- The interactive calculator is the core product; editorial articles exist to support and teach the calculation methodology.
- Every calculator must include:
  - Validated mathematical formulas with transparent baseline assumptions.
  - Realistic engineering margins (e.g., NEC 125% continuous-load rule, inverter efficiency deratings, chemistry-specific Depth of Discharge).
  - Explicit test cases with known reference benchmarks.
  - Clear user inputs, mobile-responsive controls, and accessible ARIA attributes.
- Never output speculative cycle-life or ungrounded battery longevity claims without verified empirical models.

### 4. Technical Accuracy & Electrical Safety
- Electrical, solar, battery, and generator systems carry life-safety implications.
- Ground all technical calculations in authoritative US standards (NEC / NFPA 70, IEEE, UL, DOE, NREL, EIA).
- Always include clear preliminary planning disclaimers advising users to consult a licensed electrician or engineer for physical installations.

### 5. Autonomous Execution Protocol (Rule 27)
- Once a task or brief is approved, execute end-to-end autonomously.
- Do NOT pause for routine questions, intermediate acknowledgments, or trivial confirmations.
- Stop only for genuine technical blockers, critical security risks, destructive actions, or explicit lead approval gates.
- Deliver work via a concise, structured Final Report covering exact changes, test passes, build verification, and deployment status.

### 6. Definition of Done (Rule 19 & Rule 29)
A task is DONE only when all eight quality gates pass:
1. Feature implementation matches the approved specification.
2. Responsive UX verified on both mobile (390px) and desktop layouts.
3. Automated unit/regression test suite passes (`npm test`).
4. TypeScript typecheck passes (`npx tsc --noEmit`).
5. Linter passes with zero warnings or errors (`npm run lint`).
6. Production build passes (`npm run build`).
7. Git diff is clean, reviewed, and committed with descriptive message.
8. Live production HTTP verification passes across touched routes and links after deployment.

### 7. Permanent Editorial Design Standard (Canonical Reference: /solar-panels-series-vs-parallel)
- **Canonical Model:** `/solar-panels-series-vs-parallel` defines the visual hierarchy, spacing, shell structure, and readability standard for future guides. Do not copy content; reuse the established editorial system without forcing components.
- **Canonical Article Shell:**
  - Header with breadcrumbs, hero title, contextual image, and visible `ArticleDateByline`.
  - Content-first desktop DOM order strictly: 1. `<article id="article-content">` first/left, 2. `<aside>` supporting content second/right. Never invert DOM order.
  - Outer 12-column grid container strictly: `<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">` without `items-start`, allowing `<aside>` to stretch full height and preserving sticky sidebar and reading progress counter.
  - Desktop aside strictly: `<aside className="hidden lg:block lg:col-span-4"><TableOfContents items={items} cluster={cluster} /></aside>` without redundant wrapping cards, dark `bg-slate-900` boxes, or duplicate headers. Valid clusters: `generators`, `solar`, `ups-battery`, `electricity`.
  - Readable body width (~780px), consistent tables, cards, CTAs, FAQ accordions, sources, disclaimers, and footer.
- **Visual Rhythm:** Hero -> contextual image -> quick summary/direct answer -> H2 -> concise paragraphs -> table/card/diagram when useful -> next H2 -> practical examples -> calculator CTA -> FAQ -> sources/disclaimers. Avoid giant uninterrupted text blocks.
- **Paragraph Readability:** Ordinary body paragraphs at ~780px desktop width must aim for 2 to 3 rendered visual lines (<= 55 words, 1 to 2 concise sentences). Avoid dense 4 to 6 line blocks. Keep related ideas together; do not over-fragment into 1-sentence paragraphs. Rendered visual QA: verify via browser DOM text range rects at 1280px viewport. Never manipulate CSS solely for line counts.
- **Article Target Length:** 1,500 to 1,800 words (preferred: 1,600 to 1,700). Zero filler or keyword padding. A complete 1,500-word article is better than a padded 1,800-word article.
- **Headings & Structure:** Meaningful H2/H3 sections marking real topic shifts. No artificial SEO headings every few sentences.
- **Tables, Cards & Callouts:** Use CalcMyPower table style for comparisons, scenarios, or calculations; informative cards for takeaways, warnings, and CTAs. Zero decorative card spam.
- **Images & Zero-Cropping Standard:** Unique visual per article (never reused), descriptive filenames and alt text. All hero images and diagrams must use `ZoomableArticleImage` for modal click-to-zoom. For 1:1 square diagrams or technical schematics, configure `aspectRatio="square"` and `objectFit="contain"` with `bg-slate-50`. Never force 1:1 schematics into 16:9 containers with `object-cover`.
- **CTAs & Internal Linking:** Natural calculator CTAs with descriptive contextual anchors. Ensure 1-hop apex crawl discovery from homepage or `/calculators`.
- **Semantic FAQ:** Visible FAQ questions and FAQ JSON-LD must remain 100% identical. FAQ accordions must use semantic `<details>` and `<summary>` elements with rotating chevron indicator.
- **Sources & Safety Disclaimers:** Ground technical sizing in authoritative US standards. Never claim NEC/IEEE compliance or certified/approved status for CalcMyPower.
- **Mobile Readability:** Full responsiveness at ~390px CSS width with zero horizontal overflow, comfortable typography, and readable tables/cards.
- **System Separation:** Maintain strict separation between editorial guides (reading/scannable layout) and calculators (interactive engineering tools).
- **Mandatory Article Dates & Accuracy:**
  - Every guide must provide verified `datePublished` (ISO YYYY-MM-DD), `lastModified` maintained via GUIDE_REGISTRY, visible `ArticleDateByline`, matching Open Graph timestamps, matching JSON-LD `datePublished`/`dateModified`, and accurate sitemap `lastmod`.
  - Date rules: Never invent dates, never mass-stamp today's date, preserve original publication dates on updates, show "Last updated" only when modification differs from publication, and never expose stale month labels on calculators.
- **Pre-Check & Quality Gate:** Before publishing, inspect `/solar-panels-series-vs-parallel`, ensure <= 55 words per body paragraph, meta description <= 165 characters, zero em-dashes sitewide, and verify all 8 quality gates.

### 8. GitHub Credential Security & Official CLI Protocol
- Never extract credentials from Git Credential Manager (`git credential fill`) into ad-hoc scripts.
- Never paste tokens into chat prompts, commit messages, code files, or logs.
- Use official GitHub CLI (`gh`) for all remote GitHub workflows (PRs, releases, merges). Verify auth via `gh auth status` without revealing token data.
- If unauthenticated, prompt the owner to run `gh auth login` interactively. Never request tokens via chat.
- Immediately revoke and rotate any token accidentally exposed in logs or history.

### 9. Post-Release Search Engine Crawl & Stability Freeze Protocol (October 18, 2026 Baseline)
- **Baseline Event:** On October 18, 2026 (21:30 PKT / 16:30 UTC), the complete CalcMyPower infrastructure was finalized (edge SSL on `www`, 308 apex canonical redirects, RFC 9309 robots directives, 1-hop apex crawl discovery for all 47 static routes, sitemap.xml, and verified GSC and Bing Webmaster imports).
- **Mandatory Stability Freeze:** For at least 14 days following any major infrastructure release (specifically through November 1, 2026 for the October 18 baseline), the agent must strictly refuse any request to alter existing URLs, canonical tags, redirects, or robots directives.
- **Search Engine Latency Discipline:** Search engines require 7 to 14 days to process edge DNS/TLS and sitemap queues. Fluctuations in "Discovered - currently not indexed" or crawl volume are normal telemetry lag. Never attempt to "fix" indexing latency by renaming URLs or altering redirects.
- **Permanent Prohibitions ("What Never To Do"):**
  - Never publish mass-produced or generic AI SEO filler content.
  - Never perform unapproved mass rewrites of existing articles.
  - Never invent or hallucinate testing, field installations, laboratory measurements, customer reviews, or professional engineering credentials.
  - Never use em-dashes, en-dashes, "--", or "---" anywhere in code, comments, presets, or prose.
  - Never exceed 55 words per ordinary body paragraph (must maintain 2 to 3 visual lines at ~780px).
  - Never disable TLS verification (`-k`, `CERT_NONE`) in tests, scripts, or production probes.
  - Never treat `robots.txt` as authentication, authorization, or an access-control mechanism.
  - Never paste or extract GitHub credentials or tokens into prompts, scripts, or repository files.

---

## Modular Rulebook Directory Reference

For complete verbatim text and detailed sub-rules, consult the domain files:
- `.agents/rules/00_core_identity_and_guardrails.md` (Rules 1, 2, 3, 4, 11, 12, 19, 20)
- `.agents/rules/01_calculator_engineering.md` (Rules 5, 6, 24, 26)
- `.agents/rules/02_editorial_content_standard.md` (Rule 21)
- `.agents/rules/03_editorial_ux_quality.md` (Rule 22)
- `.agents/rules/04_seo_keyword_strategy.md` (Rules 7, 8, 9, 10)
- `.agents/rules/05_design_system_and_images.md` (Rules 13, 14, 25, 28)
- `.agents/rules/06_architecture_devops_git.md` (Rules 15, 16, 17, 18, 23)
- `.agents/rules/07_autonomous_execution_quality_gates.md` (Rules 27, 29)
