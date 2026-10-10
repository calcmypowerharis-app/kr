# CalcMyPower Rulebook — Domain 05: Design System Separation & Image Standards

> Antigravity Modular Rule Specification: Category `05_design_system_and_images.md`
> Auto-discovered by Antigravity from `.agents/rules/*.md`.
> Strict Zero-Truncation Constraint: Size <= 22,000 bytes (< 24 KB per-file ceiling).

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

### Technical Diagrams and Zero-Cropping Standard
- All article hero images and technical diagrams must use the `ZoomableArticleImage` component to support full-resolution click-to-zoom modal inspections.
- Never crop diagrams, meters, or infographics. When an asset is square (1:1 aspect ratio), configure `ZoomableArticleImage` with `aspectRatio="square"` and `objectFit="contain"` with `bg-slate-50`.
- Do not force square graphics into fixed 16:9 (`aspect-video`) containers with `object-cover` that clips top/bottom gauge faces, chart data, or explanatory text.

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
- **Desktop Layout:** Editorial layout (`max-w-[1320px]` container with `grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12`).
- **Strict Sidebar Placement Invariant (NEVER INVERT):**
  - **Left Column (Primary):** `<article id="article-content" className="lg:col-span-8 ...">` MUST ALWAYS be first in DOM and visually positioned on the LEFT.
  - **Right Column (Secondary):** `<aside className="hidden lg:block lg:col-span-4">` containing `<TableOfContents />` MUST ALWAYS be second in DOM and visually positioned on the RIGHT.
  - **Prohibition:** NEVER place the Table of Contents or `<aside>` on the left side or before the `<article>` tag.
- **Navigation:** Desktop sticky TOC with reading percentage, active section tracking, and contextual tool links; mobile collapsible floating navigator (`MobileArticleNavigator` anchored at bottom-right).
- **Standardized Sidebar Invariant:**
  - The right column desktop sidebar must strictly use `<aside className="hidden lg:block lg:col-span-4"><TableOfContents items={items} cluster={cluster} /></aside>`.
  - Do not wrap the Table of Contents in extra decorative outer cards, duplicate headers ("Article Contents"), or ad-hoc dark `bg-slate-900` promotional boxes.
  - The 4 canonical clusters are: `generators`, `solar`, `ups-battery`, and `electricity`. Each cluster automatically supplies standardized companion calculator tools, contextual CTAs, and related guides.
- **FAQ Accordion Invariant:**
  - All article FAQ sections must use semantic HTML `<details>` and `<summary>` accordions with the rotate chevron indicator, matching `/solar-panels-series-vs-parallel`. Do not use static `div` cards for FAQs.
- **Prose Focus:** Natural human editorial writing, varied paragraph rhythm, verified technical citations, and zero em-dash punctuation.
- **Calculator Integration:** Direct, contextual links and scenario bridges (e.g. "Load This Scenario" with URL parameters) driving readers into the dedicated calculator tools.

## 28. Article Image Context & Non-Repetition Standard

1. Every editorial article MUST use images that are directly relevant to that article's specific topic, scenario, and search intent.
2. Do NOT reuse the same image asset across different editorial articles.
3. An image used in Article A must not be used again as a hero image, secondary image, section image, safety image, or decorative image in Article B.
4. Images must visually communicate the exact subject being discussed. Avoid generic stock imagery that only loosely relates to the topic.
5. Before adding an image to a new article, inspect existing article image assets and verify that the image has not already been used by another article.
6. Each new article should have its own context-specific visual assets where images are appropriate.
7. If an article discusses a refrigerator, use refrigerator-specific imagery; if it discusses a generator, use generator-specific imagery; if it discusses batteries, use battery-specific imagery, etc.
8. Do not reuse an image simply because it is already available in the project or visually convenient.
9. Image selection must follow the article's actual content and search intent, not a generic website-wide visual template.
10. Image filenames and alt text must also be context-specific and accurately describe the image.
11. Before final QA, verify that:
   - every article image is relevant to that article;
   - no image asset is shared with another editorial article;
   - no article has inherited imagery from a previous article merely for consistency.
12. This rule applies permanently to all future editorial articles and article updates.

Core principle:
ARTICLE TOPIC → SPECIFIC VISUAL CONTEXT → UNIQUE IMAGE ASSET.

Never optimize for reuse of existing article images. Optimize for contextual relevance and visual uniqueness.

