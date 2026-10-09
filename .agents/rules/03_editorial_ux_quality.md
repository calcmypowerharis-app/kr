# CalcMyPower Rulebook — Domain 03: Editorial Quality & Reader UX Standards

> Antigravity Modular Rule Specification: Category `03_editorial_ux_quality.md`
> Auto-discovered by Antigravity from `.agents/rules/*.md`.
> Strict Zero-Truncation Constraint: Size <= 22,000 bytes (< 24 KB per-file ceiling).

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

#### 4. Natural Paragraph Rhythm & Visual Line Standard
Vary:
- sentence length
- paragraph length
- transition style
- explanation depth

Do not make every paragraph approximately the same length.
Do not make every section equally sized.

Default editorial body paragraph:
- 1 to 2 short sentences
- approximately 2 to 3 visual lines on a normal desktop reading width (~740px to 820px)

Avoid intentionally writing:
- 4 to 6 line paragraphs
- dense text walls
- multi-sentence blocks with too many ideas
- unnecessarily long introductions

When an idea becomes too large:
split it with a new paragraph, subheading, bullet list, example, table, or callout.

IMPORTANT: "2 to 3 lines" is an editorial readability target, NOT a hard CSS line-count rule. Never manipulate font size, line height, or CSS just to force paragraph line counts. Real visual line counts are verified via rendered text rects in the DOM, not raw word count heuristics.

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

