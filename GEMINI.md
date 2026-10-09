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
| **7** | SEO Rules | `.agents/rules/04_seo_keyword_strategy.md` | Search intent over keyword density, metadata, schemas |
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
| **29** | Automated Quality Gates & Scenario Single Source of Truth | `.agents/rules/07_autonomous_execution_quality_gates.md` | Multi-gate CI automation, single scenario truth, image quotas |

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
A task is DONE only when all seven quality gates pass:
1. Feature implementation matches the approved specification.
2. Responsive UX verified on both mobile (390px) and desktop layouts.
3. Automated unit/regression test suite passes (`npm test`).
4. TypeScript typecheck passes (`npx tsc --noEmit`).
5. Linter passes with zero warnings or errors (`npm run lint`).
6. Production build passes (`npm run build`).
7. Git diff is clean, reviewed, and committed with descriptive message.

### 7. Permanent Editorial Design Standard (Canonical Reference: /solar-panels-series-vs-parallel)

**Reference Design:**
Use the existing CalcMyPower editorial page:
`/solar-panels-series-vs-parallel`
as the canonical visual reference for future editorial article design.

**Important Implementation Principles:**
- Do not copy its exact content.
- Do not force every article to use every component.
- Use its design system, visual hierarchy, spacing, structure, and readability as the standard.

#### 1. Canonical Article Shell
Future editorial articles should follow the same overall publication shell:
- clean site header with breadcrumbs
- strong article hero/title area
- visible publication and update date byline near the heading
- contextual article image near the top
- main article content first/left (<article id="article-content">)
- supporting aside second/right on desktop
- clear section hierarchy
- readable content width (~780px)
- consistent card/callout treatment
- consistent table styling
- consistent CTA styling
- consistent FAQ treatment
- consistent sources/disclaimer treatment
- consistent footer

Desktop DOM order MUST remain:
1. article/content
2. aside/supporting content

Never place the sidebar before the main article content in DOM order.

#### 2. Design Consistency = Same System, Not Identical Pages
Do not independently redesign each article.
Reuse the established CalcMyPower editorial components and visual language whenever applicable.

However:
- do not force tables where a table is unnecessary
- do not force diagrams where a diagram adds no value
- do not force cards merely for decoration
- do not force FAQs just to increase word count
- do not duplicate components only to make pages look fuller

A new article should feel like it belongs to the same CalcMyPower publication family.

#### 3. Article Visual Rhythm
Use a natural rhythm similar to the reference article:
Hero -> contextual image -> quick summary/direct answer -> H2 section -> short explanatory paragraphs -> table/card/diagram when useful -> next H2 -> practical examples -> relevant calculator CTA -> FAQ -> sources/disclaimer

Avoid giant uninterrupted content blocks.

#### 4. Paragraph Readability and Visual Line Standard
For ordinary article body paragraphs at the standard desktop reading width (~780px):
- Aim for 2 to 3 rendered visual lines per paragraph.
- Prefer 1 to 2 concise sentences when the subject can be explained without losing context.
- Avoid ordinary body paragraphs that routinely extend to 4 to 6 lines.
- Keep related ideas together; do not split every sentence into its own paragraph.
- Avoid overly fragmented content, repetitive transitions, and filler.
- Preserve technical explanations, useful detail, accurate qualifications, citations, and natural reading flow.
- Short paragraphs of 1 visual line are acceptable when an answer or transition genuinely requires them.
- Longer paragraphs may remain when technical context, quotation, definition, or explanation makes the additional length necessary.
- Specialized components (tables, list items, callouts, cards, captions, disclaimers) are evaluated by their own design requirements rather than as ordinary prose paragraphs.
- Rendered visual QA: Do not rely solely on character or word counts. Verify visual line rendering in the browser DOM at 1280px desktop viewport using element text range rects.
- Never manipulate font size, line-height, or CSS solely to force paragraph line counts.

#### 5. Article Length
Standard article target:
- minimum around 1,500 words
- maximum around 1,800 words
- preferred range around 1,600 to 1,700 words

Do not inflate content to reach 1,800 words.
Do not add filler, repetitive explanations, unnecessary FAQs, or keyword-stuffed sections.
A complete 1,500-word article is better than a padded 1,800-word article.

#### 6. Heading Discipline
Use meaningful H2/H3 sections.
Do not create a heading every few sentences just for SEO.
Each heading must represent a real topic change or useful content grouping.

#### 7. Tables
Use the established CalcMyPower table style.
Use tables when:
- comparing values
- showing scenarios
- showing calculations
- showing practical reference data

Do not convert ordinary prose into tables unnecessarily.

#### 8. Callouts and Cards
Use the established CalcMyPower informational cards for:
- key takeaways
- warnings
- important assumptions
- practical tips
- calculator CTAs

Cards must communicate useful information.
Avoid decorative card spam.

#### 9. Images and Diagrams
Use contextual visuals that directly support the article subject.
Article images must:
- be unique to the article
- never be reused across different editorial articles
- have descriptive filenames
- have useful alt text
- visually fit the established editorial style

Technical diagrams are encouraged when they make engineering concepts easier to understand.
Do not add diagrams merely for decoration.

#### 10. CTA / Internal Linking
Calculator CTAs should feel like a natural continuation of the article.
Use descriptive contextual anchors.
Do not overload articles with internal links.
The goal is: reader understands concept -> reader gets useful calculation tool.

#### 11. FAQ
FAQ belongs near the end of the article.
Use FAQ only when it adds genuine search/user value.
Visible FAQ questions and FAQ JSON-LD MUST remain identical.

#### 12. Sources / Disclaimer
Keep the established professional sources/disclaimer treatment near the end where relevant.
Never make:
- NEC compliant
- code compliant
- certified
- approved
- IEEE compliant
claims for CalcMyPower unless explicitly and legitimately supported by the task and rules.

#### 13. Mobile Readability
Reference design must remain comfortable on approximately 390 CSS px width.
Verify:
- zero horizontal overflow
- short readable paragraphs
- readable headings
- cards do not become excessively dense
- tables remain usable
- images remain responsive
- content remains the primary focus

#### 14. Article vs Calculator Design
Do not merge the editorial and calculator design systems.
Editorial article: content-first, reading/scanning experience.
Calculator: interaction-first, calculation experience.

#### 15. Future Article Pre-Check
Before implementing a new article:
- inspect /solar-panels-series-vs-parallel
- inspect the latest approved article
- reuse existing editorial components
- preserve the same shell and visual language
- choose modules based on actual content needs

#### 16. No Automatic Mass Rewrite
These rules apply primarily to FUTURE articles.
Do not rewrite all existing articles just to conform to this rule unless a separate optimization task is explicitly approved.

#### 17. Quality Gate
Every future article must pass:
- 1,500 to 1,800 word target unless justified otherwise
- no intentionally dense 4 to 6 line paragraphs
- visual consistency with /solar-panels-series-vs-parallel
- content-left / aside-right DOM order
- 390px mobile readability
- no horizontal overflow
- unique article image
- no unnecessary decorative components
- no filler content
- SEO structure intact
- mandatory date fields and ArticleDateByline verified

#### 18. Mandatory Article Date Fields and Accuracy Rules
Every future editorial article must have:
- A verified `datePublished` (ISO YYYY-MM-DD).
- A `lastModified` date maintained according to GUIDE_REGISTRY conventions.
- A visible `ArticleDateByline` near the article heading.
- Consistent Open Graph `publishedTime` and `modifiedTime` timestamps.
- Matching JSON-LD `datePublished` and `dateModified` values.
- A sitemap `lastmod` value based on the actual meaningful modification date.

Date accuracy rules:
- Never invent an original publication date.
- Never set every article to today's date merely because a shared template or date component changed.
- Preserve the original publication date when content is updated.
- Change the modification date only after a meaningful editorial or factual update.
- Do not show "Last updated" when the modification date is the same as the publication date.
- Do not use Git commit timestamps as automatic substitutes for historical publication dates.
- Flag unknown dates rather than guessing.
- Ensure the visible date and all related metadata remain consistent.
- For calculators and other tools, use a date display only where meaningful and appropriate; never expose stale or hardcoded month labels that contradict the verified modification record.

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
