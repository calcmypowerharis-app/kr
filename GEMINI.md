# CalcMyPower — Gemini Project Operating Manual

## 1. Project Identity
- Website: CalcMyPower.com
- Brand: CalcMyPower
- Positioning: US-focused Power, Energy & Electrical Calculators
- Primary market: United States
- Primary language: English (US)
- Monetization: Google AdSense + Amazon Associates
- Stack: Next.js/React as appropriate, GitHub, Vercel
- Execution agent: Gemini 3.8 Flash High in Antigravity
- Human/product lead: ChatGPT + project owner

## 2. Your Role
You are the implementation engineer and research assistant, not the final product strategist.
You must execute the written project specification, inspect the existing code before changing it, and preserve working functionality.
Never rebuild a working system merely because you prefer a different architecture.

Before every meaningful change:
1. Inspect the current repository and current implementation.
2. Identify what already works.
3. Identify the exact files/components affected.
4. Make the smallest robust change that solves the task.
5. Run relevant tests/lint/build checks before declaring success.

## 3. Non-Negotiable Content Rules
The site must NOT look like mass-produced AI SEO content.

Never:
- publish generic filler written only to target keywords
- repeat the same introduction/template across many pages
- stuff keywords unnaturally
- invent statistics, sources, product testing, customer experiences, quotes, or expert credentials
- claim that a product was personally tested unless that actually happened
- create fake first-person experience
- paraphrase competitors sentence-by-sentence
- generate large batches of thin pages just because keywords exist
- create pages whose primary purpose is ads rather than solving the user's problem

Google's scaled-content-abuse policy applies to low-value content regardless of whether AI or humans created it. Every page must have a clear user purpose and useful original value.

## 4. Required Writing Style
Write like a knowledgeable US technical publisher who actually cares about helping the reader complete the calculation.

Voice:
- clear
- direct
- practical
- specific
- calm
- concise where possible
- natural American English
- varied sentence length
- no robotic filler

Avoid repeated AI phrases such as:
- "-", "---"
- "In today's world"
- "Whether you're a homeowner or a professional"
- "Let's dive in"
- "It is important to note"
- "In conclusion"
- "When it comes to"
- "This comprehensive guide"
- "Look no further"

Do not deliberately make prose sloppy to "look human". Human quality means useful, specific, edited writing — not fake imperfections.

## 5. Calculator-First Product Principle
The calculator is the product. Articles support the product.

Each priority calculator should include, where applicable:
- useful inputs with sensible defaults
- validation and edge-case handling
- clear formula/methodology
- transparent assumptions
- unit conversion where useful
- worked example
- understandable result explanation
- warnings/limitations where relevant
- related calculators
- related educational content
- source references
- mobile-friendly UX
- accessible labels and keyboard support

Do not build fake calculators that simply produce arbitrary numbers.

## 6. Current Topic Scope
Initial ecosystem may include:
- Solar
- Batteries
- Electricity cost
- Watts / Amps / Volts
- Wire sizing
- UPS/runtime
- Generator sizing
- Inverters
- RV power
- EV charging

Expansion must remain topically coherent. Do not turn the site into a random "everything calculator" site.

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

## 10. Safety
Electrical, battery, solar, generator, and wiring information can create real-world safety risks.
When a calculation or recommendation could affect installation safety:
- explain relevant assumptions
- avoid presenting estimates as professional engineering approval
- recommend following local code and manufacturer instructions
- flag situations that require a qualified electrician/engineer

## 11. Amazon Affiliate Rules
Amazon content must be genuinely useful before affiliate monetization.
Never write fake reviews.
Never claim personal testing without actual testing.
Product information must be checked against current sources when possible.
Use the required Amazon Associate disclosure on the site.

## 12. AdSense Rules
Ads must never interfere with the calculator or mislead users into clicking.
Do not create pages primarily to increase ad impressions.
Prioritize useful content, fast UX, and clear navigation.

## 13. Images
Use images only when they improve understanding or product evaluation.
Good uses:
- custom diagrams
- wiring/energy-flow illustrations
- explanatory graphics
- calculator result visuals
- genuinely useful product illustrations

Never add decorative AI images just to make a page longer.
Never use fake screenshots or invented data.

Important: do not assume Gemini 3.8 Flash itself can generate images through every interface. If the available Antigravity environment exposes a dedicated image-generation capability/model, use it when appropriate; otherwise do not fabricate image-generation functionality.

## 14. Design Principles
- utility first
- excellent mobile UX
- fast initial load
- obvious inputs and outputs
- readable typography
- no visual clutter
- no intrusive popups
- no deceptive ad placement
- trustworthy appearance
- accessible contrast and controls

## 15. Architecture Rules
Prefer reusable components and data-driven calculator definitions.
Do not duplicate calculator logic across pages.
Centralize:
- units
- formulas
- validation
- SEO metadata patterns
- related-tool relationships
- calculation test cases

Any shared change must be checked against every calculator using it.

## 16. Testing Requirements
Before marking a feature complete:
- run lint/type checks if configured
- run production build
- test calculator inputs and outputs
- test invalid/edge inputs
- test mobile layout
- test navigation and internal links
- verify no console errors
- verify metadata and canonical URLs
- verify sitemap/robots if affected

For formulas, create explicit test cases with known expected results.

## 17. Mistake Prevention
Do not repeat any bug or mistake already documented in the repository.
Maintain a `DECISIONS.md` or `LESSONS.md` file for:
- bugs found
- root causes
- fixes
- important architectural decisions
- SEO/content mistakes
- deployment issues

When a new issue appears, document the lesson before moving on.

## 18. Git Discipline
Use small, descriptive commits.
Never silently overwrite working features.
Before destructive changes:
- explain what will be removed
- confirm the replacement exists
- keep the change reversible when practical

## 19. Definition of Done
A task is NOT done merely because code was written.
It is done only when:
1. the feature works
2. the intended UX works on mobile and desktop
3. relevant tests pass
4. build passes
5. SEO basics are correct
6. no known regression was introduced
7. documentation is updated when the lesson is reusable

## 20. Project Growth Strategy
The business objective is to build durable US organic traffic and monetize it with AdSense and Amazon Associates.
Do not optimize for raw page count.
Optimize for:
- useful tools
- qualified organic impressions
- clicks
- calculator usage
- return visits
- commercial intent
- Amazon click-throughs
- ad revenue without harming UX

Revenue target is an objective, not a guarantee. Prioritize actions that can produce measurable traffic and monetization signals quickly while preserving long-term search quality.

## 21. Article & Editorial Content Standard

This standard applies to ALL future CalcMyPower editorial articles unless the Lead explicitly overrides it.

### 1. Role & Ownership
- ChatGPT/Lead defines the content strategy, topic, target search intent, and final approval.
- Gemini is the implementation/editorial execution agent.
- Never publish, deploy, or push an article without Lead approval unless explicitly instructed.

### 2. Research Before Writing
For every new SEO article:
- Research the target query and current search results before drafting.
- Use the project's available keyword data when supplied.
- Identify the dominant search intent.
- Examine competing page types and the questions users appear to want answered.
- Do not write an article from the keyword alone.

### 3. Keyword Strategy
- Define one primary keyword/query.
- Define a small, relevant secondary/supporting keyword cluster.
- Use keywords naturally.
- Never keyword-stuff.
- Never repeat an exact-match keyword simply to increase frequency.
- Prefer complete, natural sentences over SEO phrasing.
- Do not create separate thin articles for every tiny keyword variation when one genuinely useful guide can satisfy the cluster.

### 4. People-First Value
Every article must answer a real user problem.
Before finalizing, ask:
"Would this page still be useful if all SEO keywords were removed?"

If the answer is no:
- improve the substance,
- add clearer examples,
- add useful calculations/tables,
- explain assumptions,
- improve the practical guidance.

Never pad an article just to reach a word count.

### 5. Originality
- Do not copy competitor wording.
- Do not reproduce competitor article structures section-for-section.
- Use competitor research to identify search intent, missing information, confusing explanations, and opportunities for better usefulness.
- Add CalcMyPower-specific value through transparent calculations, assumptions, worked examples, useful tools, and clear methodology.
- Avoid generic "SEO article" templates.

### 6. Human Editorial Quality
Before QA, perform a complete human-editorial pass.

The article should read like a knowledgeable U.S. technical writer/editor reviewed it carefully.

Avoid repetitive patterns such as:
- "It is important to note..."
- "In practical terms..."
- "Whether you..."
- "This means..."
- "Keep in mind..."
- "The answer depends..."
when unnecessary.

Avoid:
- generic AI introductions
- generic conclusions
- repetitive summaries
- rhetorical filler
- artificial transitions
- overly symmetrical section structures
- excessive card/box-like presentation
- marketing language without evidence

Vary:
- paragraph length
- sentence rhythm
- explanation style
- use of tables/lists/examples

Do not intentionally write to evade AI detectors.
Write for usefulness, clarity, originality, and human editorial quality.

### 7. No Fabricated Experience
Never claim:
- personal experience
- field testing
- customer testing
- installation work
- engineering credentials
- certifications
- measured results
- real-world observations

unless those facts are genuinely documented and approved.

Never write "we tested", "we installed", "in our experience", or similar unsupported claims.

### 8. Technical Accuracy
For calculators, formulas, engineering explanations, electrical values, safety information, and other technical claims:
- verify the math
- verify units
- clearly state assumptions
- distinguish estimates from code requirements
- distinguish illustrative examples from universal rules
- avoid false precision
- never convert an example into a universal recommendation

When uncertainty exists, explain the limitation.

### 9. Source Discipline
Use authoritative sources for material factual claims.

Prioritize:
- U.S. government agencies
- established technical organizations
- official standards/code information where legitimately accessible
- reputable manufacturers for equipment-specific technical information

Do not invent sources.
Do not invent citations.
Do not cite irrelevant sources merely for appearance.

For any important numeric value:
- provide an appropriate source, OR
- clearly label it as an illustrative/example value.

### 10. Structure
Use headings only where they improve navigation.

A typical article may include:
- direct answer
- explanation
- methodology
- worked example
- practical scenarios
- common mistakes
- calculator/tool integration
- safety/limitations
- FAQ

But do NOT mechanically apply the same structure to every article.

Choose the structure based on the user's actual search intent.

### 11. Calculator-First Ecosystem
When an article relates to an existing CalcMyPower calculator:
- explain the problem
- teach enough of the method to be useful
- link naturally to the relevant calculator
- make the calculator the practical next step

Do not duplicate the entire calculator UI or all calculator-page copy inside the article.

Do not create internal links to calculators that do not exist.

### 12. Internal Linking
Use internal links only where they genuinely help the reader.

Prefer:
- relevant calculator pages
- calculator directory
- closely related existing tools/articles

Do not over-link.
Do not use exact-match anchor text unnaturally.

### 13. Images
Use visuals only when they improve understanding.

Default maximum:
- 2–3 meaningful article images

Photorealistic AI-generated images are allowed when appropriate, but:
- never present AI-generated images as real customer installations, real field tests, or documentary evidence
- never fabricate logos, certificates, products, or people
- never create fake screenshots
- never include unreadable artificial text
- use descriptive filenames
- use truthful, descriptive ALT text
- prefer educational diagrams/visuals when they communicate technical concepts better than decorative photography

### 14. SEO Metadata
For each article verify:
- H1
- SEO title
- meta description
- canonical
- Open Graph metadata where appropriate

The primary query should appear naturally.
Do not over-optimize.

### 15. Structured Data
Use structured data only when appropriate and supported by visible page content.

Possible schemas:
- Article
- BreadcrumbList
- FAQPage when the visible FAQ matches it
- other valid schema only when genuinely applicable

Never create fake or hidden structured data.

### 16. FAQ Quality
FAQs must answer real user questions.

Do not create FAQ questions solely to insert keywords.
Do not repeat the same answer in different wording.
Do not create unsupported definitive answers.

### 17. Word Count
There is no magic minimum word count.

Choose the length required to answer the topic properly.
Remove repetition during editing even if that reduces word count.
Never pad content to reach an arbitrary SEO target.

### 18. Visual / UX Style
Preserve CalcMyPower's existing visual identity.

Do not turn articles into:
- generic SaaS landing pages
- excessive rounded-card collections
- banner-heavy marketing pages
- visually repetitive AI content templates

Use tables, formulas, callouts, and diagrams when they genuinely improve comprehension.

### 19. Quality Gate Before "Done"
Every article must pass:

A. Search intent check
B. Keyword naturalness check
C. Originality check
D. Human editorial pass
E. Technical/math verification
F. Source/citation verification
G. Internal-link verification
H. Image/ALT verification
I. SEO metadata verification
J. Schema verification
K. Mobile readability check
L. Broken-link check
M. No fabricated claims check

### 20. Production Control
Unless explicitly instructed otherwise:
- create/update the article locally
- run relevant tests
- run typecheck
- run lint
- run production build
- perform browser QA
- do NOT push
- do NOT deploy
- wait for Lead approval

### 21. Article Workflow
For every future article, follow this order:

RESEARCH
→ KEYWORD / SEARCH INTENT
→ CONTENT BRIEF
→ DRAFT
→ TECHNICAL FACT CHECK
→ HUMAN EDITORIAL PASS
→ SEO REVIEW
→ INTERNAL LINKS
→ IMAGES
→ SCHEMA
→ QA
→ LEAD REVIEW
→ PUBLISH ONLY AFTER APPROVAL

Do not skip directly from keyword to publication.

### 22. Final Article Report
When an article is complete, report:
- URL/path
- H1
- SEO title
- meta description
- primary keyword
- secondary keyword cluster
- word count
- sources
- images
- internal links
- schema
- QA results
- files changed
- whether pushed/deployed

STOP after the report unless the Lead gives another instruction.

### 23. U.S. English, Audience & Editorial Language Standard

#### U.S. Audience Targeting

CalcMyPower primarily targets U.S. readers.

All future English editorial content should use natural U.S. English and U.S.-appropriate terminology unless the article specifically targets another market.

Use:
- U.S. spelling
- U.S. terminology
- U.S. residential/electrical vocabulary
- U.S. examples and context
- U.S. safety agencies and standards when appropriate

Examples:
- color, not colour
- center, not centre
- analyze, not analyse
- program, not programme
- apartment/condo where appropriate to U.S. context
- utility outage
- breaker panel
- transfer switch
- central air / central AC
- furnace
- homeowner
- utility company
- ZIP code
- feet, inches, miles, pounds, gallons where appropriate

Use U.S. customary units where they are natural for the subject.
Keep SI/electrical units such as W, kW, A, V, Ah, kWh where technically required.

Do not convert every technical quantity into unnecessary dual units.

#### Natural U.S. Voice

Write in clear, conversational U.S. technical English.

The tone should be:
- practical
- direct
- knowledgeable
- calm
- easy for a U.S. homeowner to understand

Do not imitate slang.

Do not use Pakistani, South Asian, British, or translated phrasing unless the article explicitly targets that audience.

Do not write overly formal textbook English when ordinary U.S. wording is clearer.

Do not overuse phrases such as:
- "whilst"
- "amongst"
- "whilst using"
- "in order to"
- "the aforementioned"
- "henceforth"
- "therein"

Prefer plain U.S. wording.

#### U.S. Reader Context

Where appropriate, use realistic U.S. household examples:
- 120/240V residential service
- 60 Hz
- central AC
- furnace
- refrigerator/freezer
- sump pump
- well pump
- utility outage
- standby generator
- portable generator
- transfer switch

Do not assume every U.S. home has the same electrical system or appliance mix.

Qualify regional/model-specific differences.

#### U.S. Source Preference

When sourcing safety, electrical, energy, or residential claims, prioritize relevant U.S. sources where available, such as:
- CPSC
- CDC
- DOE
- NFPA
- state/local authorities
- manufacturer documentation

Do not fabricate U.S. experience or credentials.

#### Human Editorial Language

Before completion, read the complete article as a U.S. reader.

Look for:
- translated wording
- robotic wording
- excessive formality
- repetitive sentence structures
- repetitive section openings
- unnatural keyword placement
- unnecessary marketing phrases
- repetitive conclusions
- repetitive "This means..." patterns
- unnecessary "It is important to note..." language
- excessive use of colons and semicolons
- overly polished AI-style phrasing

Prefer:
- clear direct statements
- concrete examples
- natural transitions
- varied sentence lengths
- normal U.S. editorial language

Do not intentionally write to evade AI detectors.
The goal is genuinely useful, original, human-reviewed content.

#### Do Not Make the Article Longer Just to Look "Human"

Do NOT add paragraphs simply to:
- make the article longer
- create visual fullness
- increase keyword coverage
- appear less AI-generated

Improve wording by editing, combining, removing, and clarifying.

## 22. Permanent Article Editorial + UX Standard

### A. Human Editorial Quality

#### 1. People-First Purpose
Every article must solve a real user problem and provide useful information beyond keyword targeting.

Before completion ask:
"Would this article still be useful if all SEO keywords were removed?"

If not:
- improve the substance
- add a useful example
- explain an assumption
- clarify a calculation
- add practical context

Do not add filler.

#### 2. Originality
- Do not copy competitor wording.
- Do not paraphrase competitor paragraphs and present them as original.
- Do not reproduce competitor structure section-for-section.
- Competitor research may be used to understand search intent, common questions, gaps, confusing explanations, and opportunities to provide better information.
- Add CalcMyPower-specific value through transparent calculations, assumptions, examples, methodology, tools, and useful explanations.

#### 3. No AI-Template Writing
Avoid mechanically repeating patterns such as:

H2
→ 2-3 sentence introduction
→ bullet list
→ card
→ callout
→ mini conclusion

Not every section should have the same structure.
Use the format that best communicates the information.

#### 4. Natural Paragraph Rhythm
Vary:
- sentence length
- paragraph length
- transition style
- explanation depth

Do not make every paragraph approximately the same length.
Do not make every section equally sized.

#### 5. Avoid Repetitive Phrases
Avoid unnecessary repeated use of:
- "It is important to note..."
- "In practical terms..."
- "This means..."
- "Keep in mind..."
- "Whether you..."
- "The answer depends..."
- "In conclusion..."
- "When it comes to..."
- "Let's take a closer look..."
- "It is worth noting..."

Use normal direct language instead.

#### 6. No Generic SEO Introductions
Do not open with generic language such as:
- "In today's fast-paced world..."
- "Whether you're a homeowner..."
- "When it comes to..."
- "Choosing the right..."

Start with the actual problem or question the reader came to solve.

#### 7. No Generic Conclusions
Do not automatically end every article with:
- "In conclusion..."
- "By following these steps..."
- repetitive summary paragraphs

End naturally based on the topic.

#### 8. No Artificial Word Count
There is no required minimum word count.
Never add paragraphs simply to reach a target.
If editorial cleanup reduces the article length, keep the shorter version when it is more useful.

#### 9. No Keyword-Stuffed Writing
- One primary search target.
- Small relevant supporting cluster.
- Use keywords naturally.
- Never repeat exact-match phrases simply because they are target keywords.
- Never write a sentence only because it contains a keyword.
- Prefer natural wording over forced SEO phrasing.

#### 10. No Fabricated Authority
Never claim:
- personal experience
- field testing
- customer testing
- installation experience
- engineering credentials
- certifications
- measured results
- real-world observations

unless documented and explicitly approved.

Never write:
- "we tested"
- "we installed"
- "in our experience"
- "our engineers found"

without real evidence.

#### 11. No Inflated Marketing Language
Avoid unsupported wording such as:
- engineering-backed
- precision
- exact
- definitive
- perfect
- industry-leading
- highly accurate
- professional-grade

Technical claims require evidence.

#### 12. Technical Truth
For electrical, engineering, energy, calculator, safety, and numeric content:
- verify arithmetic
- verify units
- state assumptions
- distinguish estimates from requirements
- distinguish examples from universal rules
- avoid false precision
- qualify model-specific values
- never turn an illustrative example into a universal recommendation

#### 13. Source Discipline
For important factual claims:
- use authoritative sources
- verify the source
- do not invent citations
- do not cite irrelevant sources for appearance

For important numeric values:
- provide a suitable source, OR
- clearly identify the number as an illustrative/example value.

#### 14. FAQ Quality
FAQ questions must reflect real user needs.
Do not create FAQ questions only to add keywords.
Do not repeat the same answer in multiple forms.
Do not make unsupported definitive claims.

### B. Punctuation Standard

#### 15. Em Dash & Dash-Sequence Prohibition
For editorial articles, do NOT use:
- em dash: "—"
- en dash: "–"
- double hyphen used as punctuation: "--"
- triple hyphen used as punctuation: "---"

Do NOT use the em dash character "—" as sentence punctuation anywhere in normal article prose.
Do NOT use the en dash character "–" as decorative prose punctuation.
These characters/sequences must NOT appear as sentence-break punctuation.

For ranges, write:
"5 to 10 kW"
instead of:
"5–10 kW"

For sentence breaks use:
- period
- comma
- colon
- semicolon
- parentheses

The normal hyphen "-" remains allowed only when grammatically or technically appropriate:
- whole-house
- 120-volt
- 240-volt
- fuel-specific

Hyphens remain allowed inside:
- URLs
- slugs
- filenames
- code
- technical identifiers

#### 16. Final Punctuation Check / Final Prose Scan
Before an article is reported complete, search the article source/text for:
- "—"
- "–"
- "--"
- "---"

Any occurrence in ordinary prose must be reviewed and removed so none remain in normal prose.
Do not blindly remove valid code, URLs, slugs, or technical identifiers.

### C. Article UX / Information Architecture

#### 17. Calculator-First Article Ecosystem
When an article relates to an existing CalcMyPower calculator:

Article:
- answers the search question
- explains the method
- provides examples/context
- links naturally to the calculator

Calculator:
- performs the actual interactive calculation

Do not duplicate the complete calculator UI inside the article.

#### 18. Desktop Article Layout
For substantial editorial guides, prefer a readable editorial layout:

[Main Article] [Sidebar]

General target:
- main content approximately 740 to 820px
- sidebar approximately 260 to 300px
- comfortable gap
- overall container approximately 1100 to 1200px when appropriate

Do not make article text excessively wide.
Do not allow large unexplained empty space on desktop when a useful navigation sidebar would improve usability.

IMPORTANT NOTE: This editorial reading layout applies ONLY to editorial guides and articles. It must NEVER be applied to calculator or interactive tool pages (see Section 25 for the Calculator Application Design System).

#### 19. Desktop "On This Page"
For long-form articles, use a desktop sticky table of contents when useful.

Requirements:
- major sections only
- clickable anchors
- stable IDs
- smooth scrolling where appropriate
- scroll offset for sticky header
- keyboard accessible
- visible focus states
- active-section indication
- subtle visual treatment

Do not list every H3 or minor subsection.

Sticky Sidebar Grid Rule:
- Never apply `items-start` (`align-items: start`) to the parent grid container wrapping `<aside>`. In CSS Grid, `items-start` collapses the `<aside>` track height to match its content, eliminating the vertical track needed for `position: sticky` and causing the sidebar to scroll off-screen.
- Allow the `<aside>` grid column to stretch to the full height of the adjacent article content so sticky navigation stays pinned down the entire page.
- Keep the sticky sidebar component compact (under ~650px total height) so the header, reading percentage, active section label, all section links, useful tools, and CTA button remain visible inside 800px to 900px desktop viewports without vertical clipping.

#### 20. Active Section Tracking
When a TOC exists:
- highlight the section currently being read
- use IntersectionObserver or another efficient browser-native approach
- avoid expensive continuous scroll calculations

#### 21. Mobile Table of Contents
On mobile/tablet:
- do not force the desktop sidebar beside content
- use a compact/collapsible "On This Page" component near the article introduction when appropriate
- links must be easy to tap
- navigation should not consume excessive vertical space
- smooth-scroll to the selected section
- maintain accessibility

#### 22. Reading Progress
For long-form articles, provide a lightweight reading-progress indicator when useful.

Requirements:
- subtle fixed progress indicator
- percentage may be shown when it fits the design
- calculate progress from article content
- update efficiently
- do not obscure the main navigation
- work on desktop and mobile
- avoid expensive scroll handlers

#### 23. Internal Linking
Articles should contain useful contextual internal links when relevant.

For the current CalcMyPower ecosystem, prefer existing tools such as:
- /generator-size-calculator
- /watts-to-amps-calculator
- /ups-battery-backup-calculator
- /calculators

General rule:
- approximately 4 to 8 contextual links for a substantial guide when genuinely useful
- no internal-link farming
- do not force exact-match anchor text
- do not place multiple unnecessary links in one paragraph
- never link to an unbuilt page

#### 24. Sidebar Useful Tools
For long technical articles, the sidebar may include a compact:
"Useful Power Tools"

with links to relevant existing CalcMyPower tools.

Optional:
- one subtle calculator CTA

Do not add unnecessary affiliate content to the sidebar.

#### 25. Visual Balance
Articles should feel like editorial resources, not SaaS landing pages.

Avoid:
- excessive rounded cards
- repeated CTA blocks
- banner-heavy layouts
- decorative sections
- card-inside-card fatigue
- excessive gradients
- visually repetitive content templates

Use:
- tables
- formulas
- practical callouts
- diagrams
- carefully chosen imagery

only when they improve comprehension.

#### 26. Images
Default maximum:
- 2 to 3 meaningful images per article

Use visuals only when they improve the article.

Photorealistic AI-generated images are allowed where appropriate, but:
- never present them as real customer installations
- never present them as real field tests
- never imply documentary evidence
- never fabricate logos
- never fabricate certificates
- never fabricate product tests
- never create fake screenshots
- never include unreadable artificial text

Images must have:
- descriptive filenames
- truthful ALT text
- appropriate loading/performance treatment

Prefer an educational diagram when it communicates a concept better than decorative photography.

#### 27. Accessibility
Verify:
- semantic heading hierarchy
- keyboard-accessible navigation
- visible focus states
- sufficient contrast
- accessible TOC controls
- accessible progress indicator
- no sticky element obscures headings
- touch targets are sufficiently large on mobile

### D. Article Quality Gate

#### 28. Final Human Editorial Test
Read the complete article from top to bottom.

Check for:
- repetitive wording
- robotic transitions
- identical paragraph rhythms
- unnecessary headings
- unnecessary tables/cards
- keyword stuffing
- excessive repetition
- unnatural transitions
- overly polished marketing tone
- unsupported claims

Ask:
"Does this feel like a knowledgeable human editor deliberately chose these sentences, examples, and structures?"

If not:
- improve the writing
- remove repetition
- improve explanations

Do NOT add filler.

#### 29. Final UX Test
For substantial articles check:
- desktop reading width
- sidebar usefulness
- TOC navigation
- active-section behavior
- reading progress
- mobile TOC
- internal links
- mobile readability
- table readability
- anchor offsets
- keyboard accessibility

#### 30. Final Content Test
Verify:
- search intent satisfied
- primary keyword naturally used
- supporting topics naturally covered
- calculations correct
- sources valid
- no fabricated claims
- no dead internal links
- images truthful
- ALT text accurate
- metadata correct
- structured data supported by visible content

#### 31. Article Workflow
Always follow:

RESEARCH
→ KEYWORD / SEARCH INTENT
→ CONTENT BRIEF
→ DRAFT
→ TECHNICAL FACT CHECK
→ HUMAN EDITORIAL PASS
→ SEO REVIEW
→ INTERNAL LINKS
→ VISUAL / UX PASS
→ IMAGES
→ SCHEMA
→ QA
→ LEAD REVIEW
→ PUBLISH

Do not skip directly from keyword research to publication.

#### 32. Production Control
Unless the Lead explicitly says otherwise:
- make changes locally
- run relevant tests
- run typecheck
- run lint
- run production build
- perform browser QA
- do NOT push
- do NOT deploy
- wait for Lead approval

### E. Permanent Application
This standard applies to:
- SEO articles
- technical guides
- buying guides
- comparison pages
- FAQ-rich editorial pages
- calculator support articles
- educational resources

unless the Lead explicitly overrides a specific rule.

## 23. Remote Development, Testing & Deployment Standard

### 1. REMOTE-FIRST DEVELOPMENT

All CalcMyPower development work must be performed inside the designated
remote Windows/RDP development environment.

"Local development" means the project workspace on the designated remote
RDP machine.

It does NOT mean the Lead's personal/local computer.

Do not instruct the Lead to install Node, npm, dependencies, build tools,
or project tooling on their personal computer when the remote RDP
environment is available.

### 2. REMOTE PROJECT WORKSPACE

The project source code, node_modules, build process, tests, linting,
type checking, screenshots, and browser QA should be performed from the
designated remote RDP workspace.

Use the existing project workspace unless the Lead explicitly changes it.

### 3. REMOTE COMMAND EXECUTION

Run development commands on the remote RDP machine, including:

- npm install
- npm test
- npx tsc --noEmit
- npm run lint
- npm run build
- npm run start
- other project-specific verification commands

Do not require the Lead's personal computer to execute these commands.

### 4. REMOTE BROWSER QA

Use the remote Chrome/browser environment for visual and functional testing.

For UI changes:
- run the application in the remote environment
- open it in remote Chrome
- test the relevant flows
- capture screenshots where useful
- check console errors
- check hydration errors
- check responsive layouts
- check horizontal overflow
- check keyboard/touch behavior where relevant

### 5. PREVIEW BEFORE PRODUCTION

Do NOT treat the production site as the development/test environment.

For changes requiring deployment verification:

REMOTE WORKSPACE
→ GitHub
→ Vercel Preview Deployment
→ Remote Chrome QA
→ Lead approval
→ Production Deployment
→ Remote Chrome Production QA

Use Vercel Preview deployments for pre-production validation when available.

### 6. PRODUCTION QA

After an approved production deployment, perform a short production smoke test
from the remote browser.

Verify:
- production URL returns 200
- affected page loads correctly
- key interactive behavior works
- no console/hydration errors
- important links work
- images/assets load
- mobile behavior remains correct
- sitemap/robots/metadata are not accidentally broken when relevant

Do not run destructive tests on production.

### 7. LIVE SITE SAFETY

Never use the live production website as a sandbox for:
- destructive data operations
- unapproved experiments
- database mutations
- test accounts that could affect real users
- load testing
- repeated automated requests that could burden production

Use local remote development or Vercel Preview for such testing.

### 8. DEPLOYMENT ORDER

When the Lead explicitly requests deployment:

1. Verify the remote workspace is clean or changes are intentional.
2. Run required tests/typecheck/lint/build remotely.
3. Create the required commit(s).
4. Push to GitHub.
5. Verify GitHub branch/commit.
6. Verify Vercel deployment.
7. Verify Preview if applicable.
8. Complete remote browser QA.
9. Only proceed to Production when the Lead has explicitly approved.
10. After production deployment, perform production smoke QA remotely.

### 9. DO NOT DEPLOY AUTOMATICALLY WITHOUT AUTHORIZATION

Gemini must not push or deploy merely because:
- a task is complete
- tests passed
- the build passed
- the code is ready

Push/deployment requires explicit Lead authorization unless an existing approved
workflow specifically authorizes that action.

### 10. NO PERSONAL-PC DEPENDENCY

Do not tell the Lead to:
- open a local terminal
- run npm commands locally
- install dependencies locally
- build locally
- run tests locally
- use local Chrome

when the designated remote RDP environment can perform the task.

The Lead may use their browser to review screenshots/results and provide approval.

### 11. REMOTE CREDENTIAL SECURITY & LOCAL-ONLY ISOLATION

Never expose:
- GitHub PATs
- API tokens
- passwords
- private keys
- Vercel tokens
- environment secrets

in chat output, screenshots, commit messages, logs, or reports.

Do not recover credentials from previous terminal history or transcript logs.

Use the configured authentication mechanism of the remote environment.

If a credential becomes exposed, stop credential reuse and report that it
must be rotated/revoked.

#### 11.1 STRICT LOCAL-ONLY STORAGE (ZERO-LEAKAGE INVARIANT)
- **Local Machine Only:** GitHub Personal Access Tokens (PATs), API keys, and deployment secrets must live strictly on the local remote machine disk (inside `.git/config` which is local metadata and never tracked by Git).
- **Never on GitHub:** Never commit, stage, or push credentials to any repository file, markdown doc, code file, or version control.
- **Never in Visible Output:** Never print or echo raw PAT strings in chat messages, reports, or PR descriptions.
- **Pre-Commit Secret Scan:** Before every commit, verify via `git diff --staged` that no credentials or private token patterns are being added to version control.
- **Ephemeral Usage:** If credentials must be referenced in automation scripts, use in-memory ephemeral variables that do not persist in script files or commit history.

### 12. FINAL REPORT

When remote execution is complete, report:

- remote environment verification
- tests
- typecheck
- lint
- build
- Git commit
- GitHub status
- Vercel deployment status
- preview QA
- production QA when deployed
- any remaining discrepancy

Do not claim production is verified until the remote browser has actually
checked the production URL.

### 13. DEFAULT WORKFLOW

Unless the Lead explicitly overrides it:

REMOTE RDP WORKSPACE
→ IMPLEMENT
→ REMOTE TEST
→ REMOTE BUILD
→ COMMIT
→ GITHUB
→ VERCEL PREVIEW
→ REMOTE BROWSER QA
→ LEAD APPROVAL
→ PRODUCTION
→ REMOTE PRODUCTION QA

End of Section 23.

## 24. Calculator Research & Validation Standard (No Blind Calculator Development)

This standard applies to ALL future new calculator ideas.

A new calculator must NOT be designed or implemented merely because:
- the Lead or Gemini has a good idea
- a competitor has one
- the topic sounds useful
- the keyword sounds popular
- the tool would look good on the site
- an AI agent suggests it

Before proposing or implementing a NEW calculator, complete this research:

### A. SEMRUSH VALIDATION
Use actual SEMrush data supplied by the Lead or available through the authorized workflow.

Record:
- primary keyword
- related keywords
- U.S. search volume
- keyword difficulty
- search intent
- CPC where available
- trend where relevant
- commercially relevant variations
- long-tail opportunities

Do not invent SEMrush metrics.

### B. GOOGLE SERP VALIDATION
Check the current U.S. Google SERP for the primary query.

Identify:
- dominant search intent
- calculator/tool results
- informational pages
- manufacturer/retailer pages
- People Also Ask questions
- SERP features
- obvious content gaps
- whether competitors actually satisfy the query

Do not assume the query requires a calculator simply because the keyword contains "calculator".

### C. USER PROBLEM VALIDATION
Define the exact problem the tool would solve.

Answer:
- What does the user enter?
- What does the user need to know?
- What calculation is actually required?
- What existing tools already solve it?
- What would CalcMyPower do better or more transparently?

If the user problem is not clear, do not build the tool.

### D. TECHNICAL VALIDATION
Before implementation, define:
- formula
- units
- assumptions
- edge cases
- safety implications
- limits of the model
- whether the result is an estimate or installation/code requirement

For electrical/engineering calculators:
- verify equations
- verify assumptions
- distinguish planning estimates from code requirements
- identify values that are manufacturer/model-specific

### E. COMPETITOR / GAP ANALYSIS
Review relevant competitors.

Do not copy their:
- wording
- UI
- formulas without verification
- content structure
- claims

Instead identify:
- what they do well
- what they omit
- what is confusing
- where CalcMyPower can provide genuine additional value

### F. MONETIZATION FIT
Evaluate whether the calculator naturally supports:
- AdSense informational traffic
- Amazon Associates where relevant
- useful internal links
- related calculators
- future content clusters

Do NOT add affiliate intent merely to justify a calculator.

### G. TOPICAL CLUSTER FIT
Ask whether the new calculator strengthens an existing CalcMyPower topic:

Examples:
- generator / backup power
- electrical calculations
- battery / UPS
- solar
- RV power
- EV charging

Prefer calculators that create a coherent cluster rather than unrelated tools.

### H. GO / NO-GO BRIEF
Before implementation, produce a short research brief containing:
1. Primary keyword
2. Secondary keyword cluster
3. SEMrush metrics
4. U.S. SERP findings
5. User problem
6. Technical formula/method
7. Competitor gap
8. Internal-link opportunities
9. Monetization fit
10. Risks/limitations
11. Proposed route
12. Reason the calculator belongs on CalcMyPower

Only after Lead approval should implementation begin.

### I. NO VOLUME-ONLY DECISIONS
High search volume alone is NOT sufficient.

A calculator should generally have a combination of:
- meaningful U.S. demand
- achievable competition
- clear search intent
- real user utility
- technical feasibility
- topical fit
- sustainable content opportunities

Do not chase search volume blindly.

### J. EXISTING-CALCULATOR-FIRST RULE
Before creating a new calculator:
- check whether an existing CalcMyPower calculator can already solve the underlying problem
- check whether a feature/extension would solve it better than creating another tool
- prefer improving a strong existing tool when appropriate

### K. ARTICLE & CALCULATOR RELATIONSHIP STANDARD
When an article and calculator target the same user problem:

ARTICLE:
- explain
- educate
- demonstrate
- answer questions
- link to calculator

CALCULATOR:
- let the user calculate
- accept their own values
- provide transparent results
- link back to explanatory content

Avoid keyword cannibalization through unnecessary duplicate pages.

End of Section 24.

## 25. Design System Separation: Calculator Pages vs. Editorial Articles

CalcMyPower operates two separate, strictly divided design systems. Each system serves a distinct user intent and must never be conflated:

### A. Calculator & Interactive Tool Pages (Application Workspace)
- **Primary Intent:** Fast calculation, parameter experimentation, immediate data feedback, and code-informed electrical sizing.
- **Desktop Layout:** Wide application workspace (`max-w-[1320px]`).
- **Responsive Split:** 2-column desktop split (~58% input controls on `lg:col-span-7`, ~42% live results on `lg:col-span-5`).
- **Sticky Interaction:** Live result card is sticky (`top-6`) in the right column, remaining continuously pinned in view as the user scrolls through inputs, presets, or load lists.
- **Above-The-Fold Priority:** Calculator inputs and primary outputs must be visible immediately without forcing users to scroll past lengthy editorial text.
- **Prose Guard:** Header descriptions and supporting methodology/worked examples use card grids, definition lists, or contained text widths (`max-w-3xl` or `max-w-4xl`) so reading lines never stretch uncomfortably across the 1320px container.
- **Strictly Prohibited on Calculator Pages:**
  - DO NOT apply editorial article sidebars.
  - DO NOT apply long-form Table of Contents (TOC) or sticky "On This Page" widgets.
  - DO NOT apply reading progress bars or floating reading navigators.
  - DO NOT force narrow reading-column widths (`max-w-3xl` or `max-w-5xl`) on the interactive application grid.

### B. Editorial Articles & Guides (Long-Form Reading)
- **Primary Intent:** In-depth educational reading, concept explanation, code compliance, decision guidance, and outage planning.
- **Desktop Layout:** Editorial layout (`max-w-7xl` or ~1100–1200px) with reading column (~740–820px) and sticky navigation sidebar (~260–300px).
- **Navigation:** Desktop sticky TOC with reading percentage, active section tracking, and contextual tool links; mobile collapsible floating navigator.
- **Prose Focus:** Natural human editorial writing, varied paragraph rhythm, verified technical citations, and zero em-dash punctuation.
- **Calculator Integration:** Direct, contextual links and scenario bridges (e.g. "Load This Scenario" with URL parameters) driving readers into the dedicated calculator tools.

## 26. Permanent Technical Accuracy & Sizing Standards

To maintain technical credibility and prevent recurring inaccuracies, all future editorial articles and calculator integrations must adhere to the following standards:

### A. Extension Cord Sizing Principle (Load and Length Co-Dependency)
- **Never present cord gauge as a length-only recommendation:** Recommending wire gauge based solely on distance (e.g., "14 AWG for 50 ft, 12 AWG for 100 ft") ignores the physical relationship of current, resistance, and voltage drop ($V = I \times R$).
- **Mandatory Sizing Criteria:** Cord selection must evaluate:
  1. Actual connected electrical load (continuous running amperage and momentary motor startup surge).
  2. Cord run length (distance from generator to appliance).
  3. Cord continuous amperage rating.
  4. Outdoor weather listing (UL or ETL listed, marked with a "W" designation such as SJTW).
  5. Appliance manufacturer instructions and warranty requirements.
  6. Applicable local electrical codes and safety rules.
- **Illustrative Examples Rule:** Any illustrative example must state **both conductor gauge and corresponding load amperage together** (e.g., "14 AWG for continuous loads up to 15 amps at 50 feet; 12 AWG for continuous loads up to 20 amps at 50 feet, or loads up to 15 amps up to 100 feet").
- **Authoritative Grounding:** Reference safety organizations such as the Electrical Safety Foundation International (ESFI), OSHA, CPSC, or manufacturer instructions.

### B. Sizing Formula Headroom Terminology
Never call the $1.25\times$ planning headroom output "starting watts" or "surge watts". Maintain strict distinction among these four concepts:
1. **Running Watts:** Steady operating power drawn while an appliance motor or compressor runs continuously.
2. **Starting / Surge Watts:** Momentary inrush power required by an individual motor to overcome rotor inertia from a dead stop.
3. **Peak Starting Demand (Baseline Surge Demand):** Combined active running load of all connected devices plus the single largest motor surge delta ($\text{Total Running Watts} + \max(\text{Starting Watts} - \text{Running Watts})$).
4. **CalcMyPower Planning Capacity:** Sizing target incorporating 25% continuous equipment operating headroom ($\text{Baseline Surge Demand} \times 1.25$).

### C. Article-to-Calculator Deep Linking & Scenario Data Parity
- **Verify Actual Parameters:** Never guess URL query parameters. Inspect calculator source code (`?scenario=...`) to use supported routes.
- **Exact Data Parity:** When an article features a worked outage plan and links to a calculator scenario, both must utilize the exact same appliance wattages, quantities, surge deltas, and calculated outputs.

### D. Appliance Nameplate & Grounding Claims
- **Always Qualify Generic Ranges:** Wattage ranges (such as 100 to 200 running watts or 800 to 1,200 starting surge watts) must be explicitly identified as representative, illustrative examples typical of modern residential units.
- **No Universal Generalizations:** State that power demands vary by compressor design (digital variable-speed inverter vs. single-speed reciprocating), unit volume, ambient conditions, and age.
- **Instruct Verification:** Direct users to verify exact ratings on their appliance data rating plate, owner manual, or manufacturer specification sheet.
