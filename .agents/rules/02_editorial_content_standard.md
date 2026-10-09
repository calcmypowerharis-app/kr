# CalcMyPower Rulebook — Domain 02: Article & Editorial Content Standard

> Antigravity Modular Rule Specification: Category `02_editorial_content_standard.md`
> Auto-discovered by Antigravity from `.agents/rules/*.md`.
> Strict Zero-Truncation Constraint: Size <= 22,000 bytes (< 24 KB per-file ceiling).

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

#### Mandatory Article Date Fields & Accuracy Standard

Every editorial article MUST maintain strict date transparency:
1. Canonical Registry Entry (`src/lib/seo/registry.ts`):
   - `publishedAt: 'YYYY-MM-DD'` (original publication date).
   - `updatedAt: 'YYYY-MM-DD'` (only when meaningful editorial or technical changes occur; identical to `publishedAt` on initial release).
2. Visible Date Byline:
   - Render `ArticleDateByline` directly below the article title and hero description before the main content.
   - Shows "Published: [Date]" and optionally "Updated: [Date]".
   - Displays real verified dates, never synthetic freshness dates.
3. Schema Alignment:
   - Structured data (`Article` / `TechArticle` / `BlogPosting` JSON-LD) `datePublished` and `dateModified` must strictly match registry `publishedAt` and `updatedAt`.
4. Automated Verification:
   - All dates must pass `src/lib/seo/__tests__/date-consistency.test.ts`.

