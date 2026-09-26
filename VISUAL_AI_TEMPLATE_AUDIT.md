# CalcMyPower — Visual Design & Template-Pattern Audit

**Audit Date:** September 26, 2026  
**Scope:** Visual inspection of rendered pages across four viewports (`1440×900` desktop, `1280×800` desktop, `768×1024` tablet, `390×844` mobile)  
**Pages Inspected:**
1. Homepage (`/`)
2. UPS & Battery Backup Run-Time Calculator (`/ups-battery-backup-calculator`)
3. Watts to Amps Electrical Calculator (`/watts-to-amps-calculator`)
4. Generator Size Calculator (`/generator-size-calculator`)

> **Methodology Note:** In accordance with project guidelines, this audit evaluates observable visual, layout, and typographic patterns rather than making factual claims about whether a layout is "AI-generated." Every observation is classified using one of six categories: **`Template-like`**, **`Repetitive`**, **`Generic`**, **`Product-specific`**, **`Human/editorial feeling`**, or **`Useful but visually repetitive`**.

---

## 1. Executive Summary Across the 16 Visual Signals

| # | Visual Evaluation Dimension | Classification | Severity | Summary of Rendered Reality |
| :--- | :--- | :--- | :--- | :--- |
| **1** | **Excessive repeated rounded cards** | `Repetitive` | **High** | Every page container, sub-section, formula variable, worked-example step, preset, and metric is wrapped in its own bordered rounded box (`rounded-2xl` outer cards containing `rounded-xl` or `rounded-lg` inner cards, up to 3 levels deep). |
| **2** | **Repeated identical section layouts** | `Useful but visually repetitive` | **Medium** | Below the calculator fold, all three calculators stack 5–7 identical white `rounded-2xl border-slate-200 p-8 shadow-sm` containers separated by uniform `32px` (`space-y-8`) gaps. |
| **3** | **Excessive badges/chips** | `Template-like` | **Medium** | Homepage renders **13 status/eyebrow pill badges** in a single scroll (`PRECISION POWER & ENERGY CALCULATORS`, `FLAGSHIP TOOL`, 8× `1 Active Tool`/`Planned`, 3× `Live`). Calculator pages add pill badges inside formula variables, numbered steps, and result headers. |
| **4** | **Repetitive icon + heading + paragraph patterns** | `Template-like` | **Medium** | Every supporting section header across all calculators uses the exact same `p-2 rounded-lg` pastel square icon + bold `H2` title recipe (`BookOpen`, `CheckCircle2`, `Sliders`, `ShieldAlert`, `HelpCircle`, `Calculator`). Homepage bottom strip repeats the exact same green `ShieldCheck` icon 3 times. |
| **5** | **Excessive gradients or decorative effects** | `Product-specific` | **Low** | Gradients are restrained and used only on primary dark/blue result cards and the homepage flagship banner. No neon glows, floating blobs, or decorative meshes exist. |
| **6** | **Overuse of shadows** | `Human/editorial feeling` | **Low** | Shadows are subtle (`shadow-sm` on white cards, `shadow-xl` on the sticky result card). Not overdone. |
| **7** | **Artificially uniform spacing/rhythm** | `Useful but visually repetitive` | **Medium** | Because every below-the-fold educational block is an identical white card with `p-6 sm:p-8` and `space-y-8`, long-form technical content reads like a stack of dashboard widgets rather than an editorial engineering reference. |
| **8** | **Generic SaaS-style hero copy & layout** | `Generic` | **High** | The homepage opens with a centered SaaS marketing hero (eyebrow pill with lightning icon, giant centered headline, muted subheadline, centered CTA button) immediately above a second full-width dark promo banner for the exact same calculator. |
| **9** | **Sections that appear to exist only to fill page length** | `Template-like` | **High** | On the Homepage, **Popular Electrical Calculators** duplicates the exact 3 live tools already linked in **Browse by Power Category** directly above it, and the 3-column bottom feature strip (`Transparent Math / Standard Safety Margins / Zero Fluff`) adds no actionable navigation. |
| **10** | **Repeated visual patterns across different calculator pages** | `Template-like` | **High** | Shared component rigidity causes the **Watts to Amps** and **Generator Size** assumption tables to render the column header **`Impact on Runtime`** (hardcoded from the UPS calculator in [`AssumptionsSection.tsx`](file:///d:/Solar%20Power%20Project/src/components/calculator/AssumptionsSection.tsx#L28)). |
| **11** | **Generic stock/AI-style imagery** | `Human/editorial feeling` | **None** | Zero decorative stock photos or fake AI illustrations are present anywhere on the site. |
| **12** | **Overly polished but information-light sections** | `Generic` | **Medium** | The homepage 3-column trust strip and the 5 unclickable `"Planned"` category cards occupy prime above/near-fold real estate without delivering interactive utility. |
| **13** | **Excessive CTA buttons** | `Repetitive` | **High** | The homepage links to `/ups-battery-backup-calculator` **4 separate times** (`Launch UPS Run-Time Calculator ->`, `Calculate Backup Hours ->`, `UPS & Battery Backup -> View Tools`, and `UPS & Battery Backup Run-Time Hours Calculator -> Use Calculator`). |
| **14** | **Identical card structures with minimal content differences** | `Repetitive` | **High** | On the homepage, the 8 category cards and 3 popular calculator cards share identical card anatomy (top-left blue icon box, top-right status pill, bold title, muted copy, bottom blue arrow link). |
| **15** | **Visual hierarchy that prioritizes appearance over utility** | `Template-like` | **High** | CSS `line-clamp-2` truncates descriptions mid-sentence on desktop/tablet/mobile cards, and the Generator calculator's 4-column dark step breakdown truncates the surge-driving appliance name (`"Driver:..."`) at `1440px` desktop. |
| **16** | **Mobile layouts that feel like compressed desktop templates** | `Template-like` | **High** | At `390px` mobile, the 4-column Assumptions table crushes the 4th column into a 3-letter-wide vertical strip (`Imp / Run`) or clips it off-screen; long `<select>` options clip mid-word; and the Generator appliance table hides `STARTING (W)` and delete buttons off-screen behind horizontal scroll. |

---

## 2. Detailed Visual Findings by Page & Viewport

### 2.1 Homepage (`/`)

#### Finding H-1: Dual Hero + Flagship Banner & Quadruple UPS CTA Redundancy
- **Screenshot / Location:** Homepage (`/`) at `1440px` (`steps/1215/media_0.png`), `1280px` (`steps/1220/media_0.png`), `768px` (`steps/1223/media_0.png`), and `390px` (`steps/1226/media_0.png`) — top two sections of the page ([`page.tsx`](file:///d:/Solar%20Power%20Project/src/app/page.tsx#L91-L152)).
- **Classification:** `Generic` / `Repetitive`
- **Pattern Observed:** The page opens with a centered SaaS-style hero block containing an eyebrow pill (`PRECISION POWER & ENERGY CALCULATORS`), a display heading, a paragraph, and a primary blue CTA button (`Launch UPS Run-Time Calculator ->`). Directly below it (`48px` gap) sits a full-width dark-navy banner (`FLAGSHIP TOOL` pill + `UPS & Battery Backup Run-Time Hours Calculator` + `Calculate Backup Hours ->` button). Below that, the first card in **Browse by Power Category** and the first card in **Popular Electrical Calculators** also link to `/ups-battery-backup-calculator`.
- **Why It May Feel Template-Like:** Stacking a generic SaaS hero CTA directly on top of a second hero-sized promo banner for the exact same URL looks like two separate landing-page blocks pasted together. On `390px` mobile, the user must scroll past nearly two full viewport heights of UPS promotions before discovering that CalcMyPower has a Watts-to-Amps or Generator calculator.
- **Severity:** **High**
- **Recommended Change:** Remove the redundant centered hero CTA button and the separate dark flagship banner. Replace them with a compact utility header (~120px tall on desktop) that leads immediately into the 3 live calculators above the fold.

#### Finding H-2: Identical Card Anatomy Across "Browse by Power Category" and "Popular Electrical Calculators"
- **Screenshot / Location:** Homepage (`/`) at `1440px` (`steps/1215/media_0.png`) and `768px` (`steps/1223/media_0.png`) — middle two grid sections ([`page.tsx`](file:///d:/Solar%20Power%20Project/src/app/page.tsx#L154-L250)).
- **Classification:** `Template-like` / `Repetitive`
- **Pattern Observed:** The 8 cards in **Browse by Power Category** and the 3 cards in **Popular Electrical Calculators** use the exact same card template:
  - White `rounded-2xl` box with `border-slate-200`
  - Top row: `w-9 h-9` / `w-10 h-10` light-blue rounded square icon on the left + green status pill (`1 Active Tool` vs `Live`) on the right
  - Middle: Bold title + 2–3 lines of `text-slate-600` description
  - Bottom: Blue text link with right arrow (`View Tools ->` vs `Use Calculator ->`)
  Furthermore, the 3 active category cards (`UPS & Battery Backup`, `Watts, Amps & Volts`, `Generator Sizing`) link directly to the exact same 3 URLs as the 3 cards in **Popular Electrical Calculators** right below them.
- **Why It May Feel Template-Like:** Showing 3 live tools mixed with 5 unclickable `"Planned"` gray cards, followed immediately by the same 3 live tools in the exact same card design, makes the homepage feel padded to look like a larger portal than it currently is.
- **Severity:** **High**
- **Recommended Change:** Make the **3 Live Calculators** the primary above-the-fold grid with distinct, functional previews (e.g., showing what each calculates: `Hours & Minutes`, `Amperes & Continuous Load`, `Running + Surge Watts`). Move the 5 upcoming categories (`Battery Bank`, `Electricity Cost`, `Wire Sizing`, `Solar System`, `RV & EV Power`) into a compact, honest "In Development / Roadmap" text list or secondary strip without fake card chrome.

#### Finding H-3: Mid-Sentence Text Truncation (`line-clamp-2`) on 768px Tablet and 390px Mobile
- **Screenshot / Location:** Homepage (`/`) at `768px` tablet (`steps/1223/media_0.png`) and `390px` mobile (`steps/1226/media_0.png`) — **Browse by Power Category** 4-column (`768px`) and 2-column (`390px`) grids ([`page.tsx`](file:///d:/Solar%20Power%20Project/src/app/page.tsx#L166-L205)).
- **Classification:** `Template-like` (Visual hierarchy prioritizing uniform card height over readability)
- **Pattern Observed:** Because `md:grid-cols-4` forces 4 cards across a `768px` tablet screen (~160px per card) and `grid-cols-2` forces 2 cards across a `390px` mobile screen with `line-clamp-2`, **7 out of 8 category descriptions cut off mid-sentence with ellipses**:
  - `"Uninterruptible power supply duration, batter..."`
  - `"Amp-hour to Watt-hour conversion, depth of..."`
  - `"Appliance power consumption, kilowatt-..."`
  - `"AWG copper and aluminum conductor..."`
  - `"Portable and standby generator load..."`
  - `"30A and 50A RV shore power, inverter loads,..."`
- **Why It May Feel Template-Like:** Enforcing artificial card-height symmetry via CSS `line-clamp-2` at the expense of readable English phrases is a hallmark of rigid UI templates.
- **Severity:** **High**
- **Recommended Change:** Remove `line-clamp-2`, write tighter descriptions that fit naturally, and use `sm:grid-cols-2 lg:grid-cols-3` or `lg:grid-cols-4` so tablet cards at `768px` have enough horizontal breathing room.

#### Finding H-4: SaaS-Style 3-Column Feature Strip With Triple Repeated Icon
- **Screenshot / Location:** Homepage (`/`) at `1440px` (`steps/1215/media_0.png`) and `390px` (`steps/1226/media_0.png`) — bottom section above footer ([`page.tsx`](file:///d:/Solar%20Power%20Project/src/app/page.tsx#L252-L287)).
- **Classification:** `Generic` / `Overly polished but information-light`
- **Pattern Observed:** A white `rounded-2xl` container with a 3-column grid (`Transparent Math`, `Standard Safety Margins`, `Zero Fluff`) where every column starts with the exact same green `<ShieldCheck />` icon inside a `w-8 h-8 rounded-lg bg-emerald-50` box.
- **Why It May Feel Template-Like:** The 3-column "value proposition strip" with identical check-shield icons and self-congratulatory copy ("Zero Fluff") is one of the most recognizable SaaS landing-page clichés.
- **Severity:** **Medium**
- **Recommended Change:** Either remove this block entirely or replace it with a compact, factual editorial note citing the primary reference standards used across the site (NEC Articles 210/430/702, IEEE 485, DOE/NREL).

---

### 2.2 Cross-Calculator Layout & Shared Component Patterns

#### Finding C-1: Hardcoded `"Impact on Runtime"` Table Column Header Across Non-Runtime Calculators
- **Screenshot / Location:**
  - Watts to Amps (`/watts-to-amps-calculator`) at `1440px` (`steps/1254/media_0.png`) and `768px` (`steps/1258/media_0.png`) — **Physical & Technical Assumptions** table
  - Generator Size (`/generator-size-calculator`) at `1440px` (`steps/1277/media_0.png`) and `768px` (`steps/1270/media_0.png`) — **Calculation Assumptions & Engineering Planning Model** table
  - Source: [`AssumptionsSection.tsx`](file:///d:/Solar%20Power%20Project/src/components/calculator/AssumptionsSection.tsx#L28)
- **Classification:** `Template-like` / `Repetitive`
- **Pattern Observed:** The shared `AssumptionsSection` component hardcodes the 4th table column header as **`Impact on Runtime`**. Consequently, on the **Watts to Amps** calculator (which calculates current in Amperes) and the **Generator Size** calculator (which calculates wattage capacity), the rendered table header literally reads `Impact on Runtime`.
- **Why It May Feel Template-Like:** Nothing signals "cloned template page" faster to a technical reader than a leftover column header from a battery runtime calculator appearing on an Ohm's Law current converter and a generator wattage sizer.
- **Severity:** **High**
- **Recommended Change:** Add an optional `impactHeader?: string` prop to `AssumptionsSection` (defaulting to `"Practical Impact"` or `"Sizing Impact"`, with `"Impact on Runtime"` used only on the UPS calculator).

#### Finding C-2: Severe Mobile Table Compression & Column Clipping at `390px`
- **Screenshot / Location:**
  - UPS Calculator (`/ups-battery-backup-calculator`) at `390px` (`C:\Users\ADMINI~1\AppData\Local\Temp\chrome-devtools-mcp-6XcFKv\screenshot.png`)
  - Watts to Amps (`/watts-to-amps-calculator`) at `390px` (`steps/1262/media_0.png`)
  - Generator Size (`/generator-size-calculator`) at `390px` (`steps/1266/media_0.png`)
- **Classification:** `Template-like` (Mobile layout acting as a compressed desktop table)
- **Pattern Observed:** At `390px` mobile width, the 4-column `AssumptionsSection` table attempts to squeeze all 4 columns (`Parameter`, `Model Default`, `Typical Field Range`, `Impact on Runtime`) into ~324px of inner card width:
  - On **Watts to Amps** (`steps/1262/media_0.png`), the 4th column is crushed to **3 characters wide**, rendering vertical gibberish: `Imp / Run`, `Unb / com / thre / pha / prod / une / line / curr / and / neu / curr`.
  - On **UPS Calculator**, words clip on the right border (`sulfation an`, `permanentl`, `inverters los`).
  - On **Generator Size Calculator** (`steps/1266/media_0.png`), the 4th column is pushed completely off-screen to the right.
- **Why It May Feel Template-Like:** Desktop 4-column data tables that crush into 3-letter-wide vertical strips on a phone screen indicate that mobile viewports were not given a responsive stacked-row or mobile-table treatment.
- **Severity:** **High**
- **Recommended Change:** On mobile (`< 640px`), render each assumption row as a clean stacked definition block (`Parameter` + `Default / Typical Range` badge on top, full-width impact sentence below), switching to the 4-column table at `sm:` / `md:` viewports.

#### Finding C-3: Nested Card-Inside-Card-Inside-Card Architecture in Supporting Sections
- **Screenshot / Location:** All 3 calculators at `1440px` (`steps/1232/media_0.png`, `steps/1254/media_0.png`, `steps/1277/media_0.png`) — [`MethodologySection.tsx`](file:///d:/Solar%20Power%20Project/src/components/calculator/MethodologySection.tsx#L31-L51) and [`WorkedExampleSection.tsx`](file:///d:/Solar%20Power%20Project/src/components/calculator/WorkedExampleSection.tsx#L28-L55).
- **Classification:** `Useful but visually repetitive`
- **Pattern Observed:**
  1. Every supporting section below the calculator is wrapped in an identical outer `bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm` card.
  2. Inside **Calculation Methodology & Formula**, each of the 4–6 formula variables is wrapped in its own inner card (`p-3 rounded-lg bg-slate-50 border border-slate-100`) containing yet another inner pill badge (`bg-white border border-slate-200 px-2 py-0.5 rounded`).
  3. Inside **Step-by-Step Worked Example**, the scenario is a box, every individual step (`1`, `2`, `3`, `4`) is wrapped in its own full-width bordered card (`p-4 rounded-xl border border-slate-200`) containing a dark slate terminal box (`bg-slate-900 text-emerald-400`), and the result is another box.
- **Why It May Feel Template-Like:** While the content inside these sections is genuinely helpful, wrapping every variable definition and every math step inside its own individual bordered card creates heavy visual box-fatigue ("boxes inside boxes"). Technical handbooks use clean typography, subtle horizontal hairlines (`divide-y`), and left border timelines rather than putting every paragraph in a card.
- **Severity:** **Medium**
- **Recommended Change:**
  - In `MethodologySection`, replace the grid of 4–6 individual `bg-slate-50` cards with a clean, border-divided 2-column definition list or compact specification table.
  - In `WorkedExampleSection`, replace the 4 separate bordered step cards with a connected vertical step timeline (subtle left vertical line connecting numbered badges `1 -> 2 -> 3 -> 4`) with simple bottom dividers instead of full 4-sided card borders around each step.

#### Finding C-4: Identical Pastel Icon Square + H2 Header Across All 6 Supporting Section Types
- **Screenshot / Location:** All 3 calculators across all viewports (`steps/1232/media_0.png`, `steps/1254/media_0.png`, `steps/1277/media_0.png`).
- **Classification:** `Repetitive`
- **Pattern Observed:** Every single supporting section across all calculators starts with the exact same visual motif: a `p-2 rounded-lg` pastel square icon (`bg-blue-50`, `bg-emerald-50`, `bg-purple-50`, `bg-amber-50`) next to an `H2` heading.
- **Why It May Feel Template-Like:** Repeating the exact `pastel icon box + H2` header 5 to 7 times down every single page makes distinct content types (formulas, worked examples, assumptions, FAQs, related links) look like clones of the same widget.
- **Severity:** **Low**
- **Recommended Change:** Keep icons on warnings/disclaimers (`ShieldAlert`) and primary calculator headers where they aid scanning, but allow standard editorial sections (`Frequently Asked Questions`, `Related Calculators`, `Assumptions`) to use clean typographic headings without a mandatory pastel icon badge on every block.

---

### 2.3 Page-Specific Calculator Visual Findings

#### Finding U-1: Truncated `<select>` Text on `390px` Mobile (UPS & Watts-to-Amps)
- **Screenshot / Location:**
  - UPS Calculator (`/ups-battery-backup-calculator`) at `390px` (`C:\Users\ADMINI~1\AppData\Local\Temp\chrome-devtools-mcp-6XcFKv\screenshot.png`) — `Battery Chemistry & Type` dropdown
  - Watts to Amps (`/watts-to-amps-calculator`) at `390px` (`steps/1262/media_0.png`) — `Electrical System` dropdown
- **Classification:** `Template-like` (Desktop option labels overflowing mobile inputs)
- **Pattern Observed:** At `390px` mobile:
  - On the UPS Calculator, the selected option reads: `"Lithium Iron Phosphate (LiFePO4) ("` (cut off right at the opening parenthesis of `(90% DoD)`).
  - On the Watts to Amps Calculator, the selected option reads: `"AC Single-Phase (Household / Ligh"` (cut off mid-word).
- **Why It May Feel Template-Like:** Long desktop `<option>` strings that clip mid-word on standard `390px` iPhone viewports hurt polish and usability.
- **Severity:** **Medium**
- **Recommended Change:** Tighten the `<option>` label strings so they fit cleanly within `390px` mobile select boxes (e.g., `"LiFePO4 — Lithium (90% DoD)"` and `"AC Single-Phase (Residential)"`), keeping the detailed explanation in the helper text directly below the input.

#### Finding W-1: Unbalanced 3-Item Sub-Metric Grid Inside the Watts-to-Amps Result Card
- **Screenshot / Location:** Watts to Amps (`/watts-to-amps-calculator`) at `1440px` (`steps/1254/media_0.png`), `1280px` (`steps/1251/media_0.png`), `768px` (`steps/1258/media_0.png`), and `390px` (`steps/1262/media_0.png`) — dark-navy Result Card (`CALCULATED ELECTRICAL CURRENT`).
- **Classification:** `Template-like`
- **Pattern Observed:** The dark-navy `CalculatorResultCard` component renders sub-metrics in a fixed `grid-cols-2` layout. Because the UPS calculator passes 4 sub-metrics (filling a 2×2 grid) while the Watts-to-Amps calculator passes 3 sub-metrics (`125% Continuous Reference`, `Operating Voltage`, `Real Load Power`), the bottom-right quadrant of the dark card is an empty blank hole across all 4 viewports.
- **Why It May Feel Template-Like:** A 2×2 dark widget grid with one missing corner looks like a template component that expected 4 items but only received 3.
- **Severity:** **Low**
- **Recommended Change:** Either add a useful 4th electrical metric (such as **Apparent Power (VA)**: `1,200 VA` or **Standard Breaker Rating**: `15A / 20A Check`) to complete the 2×2 grid, or allow the 3rd item to span 2 columns (`col-span-2`) when `subMetrics.length === 3`.

#### Finding G-1: Generator Size Calculator — Mobile Appliance Table Hides Starting Watts & Delete Button Off-Screen (`390px`)
- **Screenshot / Location:** Generator Size Calculator (`/generator-size-calculator`) at `390px` mobile (`steps/1266/media_0.png`) — **Selected Appliances & Equipment (5)** table ([`GeneratorCalculatorClient.tsx`](file:///d:/Solar%20Power%20Project/src/app/generator-size-calculator/GeneratorCalculatorClient.tsx#L283-L407)).
- **Classification:** `Template-like` (Compressed desktop table on mobile)
- **Pattern Observed:** On `390px` mobile, the active appliance table uses `min-w-[600px]` inside an `overflow-x-auto` wrapper. As a result, the user sees `APPLIANCE`, `QTY`, and `RUNNING (W)`, while the critical **`STARTING (W)` input column, `SUBTOTAL`, and the trash/delete button are completely hidden off-screen to the right**.
- **Why It May Feel Template-Like:** Hiding half of the primary calculator controls behind a horizontal scroll container on mobile makes the core interactive tool frustrating to use on phones.
- **Severity:** **High**
- **Recommended Change:** Use a responsive mobile card/row layout below `sm:` (`< 640px`) for each selected appliance (Top row: Appliance Name + Surge Badge + Delete icon; Bottom row: compact `Qty`, `Running W`, and `Starting W` inputs side-by-side in 100% width), while keeping the clean 5-column table on `sm:`/`md:` and desktop viewports.

#### Finding G-2: Generator Size Calculator — Desktop `1440px` 4-Column Step Breakdown Truncates the Surge Driver Name
- **Screenshot / Location:** Generator Size Calculator (`/generator-size-calculator`) at `1440px` desktop (`steps/1277/media_0.png`) — dark-navy **How We Calculated Your Generator Size** box at the bottom of the left column ([`GeneratorCalculatorClient.tsx`](file:///d:/Solar%20Power%20Project/src/app/generator-size-calculator/GeneratorCalculatorClient.tsx#L539-L591)).
- **Classification:** `Template-like` (Visual grid symmetry overriding data visibility)
- **Pattern Observed:** At `1440px` desktop, the dark-navy `How We Calculated Your Generator Size` container sits inside the 7-column left pane (`~640px` wide) and uses `sm:grid-cols-4` to squeeze 4 step boxes into a single row (~135px per box). Inside `Step 2: Largest Surge (+1,020 W)`, the label identifying which appliance caused the surge (`"Driver: Refrigerator / Freezer (Modern Energy Star)"`) has `truncate` applied and renders simply as **`"Driver:..."`**. Ironically, at `768px` tablet (`steps/1270/media_0.png`), the full text is visible or wider, whereas at `1440px` desktop the appliance name is completely hidden!
- **Why It May Feel Template-Like:** Squeezing 4 cards into a narrow column and hiding the single most important diagnostic detail (`which appliance is driving the largest surge`) behind `truncate` prioritizes a 4-across visual grid over engineering clarity.
- **Severity:** **High**
- **Recommended Change:** Change the 4-step breakdown grid inside the left column from `sm:grid-cols-4` to a **2×2 grid (`grid-cols-1 sm:grid-cols-2`)** and remove `truncate` so the full surge-driving appliance name is always readable on both desktop and tablet.

#### Finding G-3: Generator Preset Cards Truncate Descriptions Mid-Sentence (`line-clamp-2`) at All Viewports
- **Screenshot / Location:** Generator Size Calculator (`/generator-size-calculator`) at `1440px` (`steps/1277/media_0.png`), `1280px` (`steps/1274/media_0.png`), `768px` (`steps/1270/media_0.png`), and `390px` (`steps/1266/media_0.png`) — **Quick Scenario Presets** ([`GeneratorCalculatorClient.tsx`](file:///d:/Solar%20Power%20Project/src/app/generator-size-calculator/GeneratorCalculatorClient.tsx#L244-L269)).
- **Classification:** `Template-like`
- **Pattern Observed:** Even at `1440px` desktop, 3 of the 4 Quick Scenario Preset cards cut off mid-sentence with ellipses due to `line-clamp-2`:
  - `Essential Outage (Editable)`: `"...4 rooms of LED lighting, an..."`
  - `Comfort Home Backup`: `"...microwave oven, television, and..."`
  - `RV 30-Amp Summer`: `"...microwave, and electric..."`
- **Why It May Feel Template-Like:** Truncating a preset summary on a wide `1440px` desktop monitor (`"...an..."`) makes the UI look carelessly clipped by a rigid card template.
- **Severity:** **Medium**
- **Recommended Change:** Remove `line-clamp-2` on the scenario preset cards (or shorten the preset summary strings by 2–3 words so the complete list of included appliances reads cleanly without ellipses).

#### Finding G-4: Inconsistent Primary Result Card Styling Between Generator Calculator and UPS / Watts-to-Amps
- **Screenshot / Location:** Compare Generator Size (`steps/1274/media_0.png` — bright royal blue card `from-blue-600 via-blue-700 to-indigo-800` + separate white `ELECTRICAL SIZING METRICS` card below) vs. UPS (`steps/1232/media_0.png`) and Watts-to-Amps (`steps/1254/media_0.png` — unified dark-slate `from-slate-900 via-slate-900 to-blue-950` card with integrated dark sub-metrics).
- **Classification:** `Useful but visually repetitive` (Slight cross-page design drift + double dark-card repetition on Generator page)
- **Pattern Observed:** On the Generator page, the primary result card is bright royal blue, followed by a separate white bordered card for `ELECTRICAL SIZING METRICS`, while the bottom of the left column has a dark-slate card (`How We Calculated Your Generator Size`) that uses the exact dark-slate theme (`bg-slate-900`) that the other two calculators use for their primary result card.
- **Why It May Feel Template-Like:** While the Generator page's right column is clean and readable, having two separate stacked cards for the primary output on the right (`RECOMMENDED CAPACITY` + `ELECTRICAL SIZING METRICS`) plus a dark-slate card at the bottom of the left column adds extra card containers.
- **Severity:** **Low**
- **Recommended Change:** Keep the high-contrast result hierarchy, as it works well functionally, or optionally unify the right-hand primary output + metrics container so it feels cohesive with theCalcMyPower result panel family.

---

## 3. What Should Remain Unchanged (Strong Product-Specific Elements)

To preserve usability, clarity, technical credibility, fast scanning, and calculator completion, **do NOT alter or remove** the following visual and structural strengths:

1. **Above-the-Fold Calculator-First Layout on All Tool Pages (`Product-specific` / `Human/editorial feeling`):**
   - All three calculators place the H1, a concise 2-line task description, and the interactive **Input Parameters + Live Sticky Result Panel** immediately above the fold at `1440px` and `1280px` without hero banners, stock photos, or introductory walls of text.
2. **Instant Reactive Calculation Without "Calculate" Submit Buttons (`Product-specific`):**
   - Outputs update immediately on preset selection, input typing, or appliance toggling. This utility-first behavior is fast, modern, and far superior to competitors that require page reloads or form submissions.
3. **One-Click Realistic Load Presets (`Product-specific`):**
   - The quick-select preset chips on UPS and Watts-to-Amps (`Home Office 120W`, `Medical CPAP 60W`, `Space Heater 1,500W @ 120V`) and the 4 editable scenario presets + searchable appliance library on the Generator calculator make the tools immediately usable for non-engineers.
4. **High-Contrast Sticky Result Readouts (`Product-specific`):**
   - The large tabular-numeral primary readout (`6 hr 7 min`, `10.00 A`, `2,750 Watts`) paired with secondary engineering metrics (`Usable AC Energy`, `DC Current Draw`, `125% Continuous Reference`, `Peak Starting Demand`, `Apparent Power kVA`) gives users both the simple answer and the technical verification in one glance.
5. **Quick-Select Voltage Pills on Watts-to-Amps (`Product-specific`):**
   - The 8 voltage quick-select buttons (`12V`, `24V`, `48V`, `120V`, `208V`, `240V`, `277V`, `480V`) directly below the voltage input are compact, fast, and tailored to US electrical standards.
6. **Generator Spec-Sheet Comparison Callout & CO / Backfeeding Safety Rules (`Human/editorial feeling`):**
   - The green **How to Match Generator Spec Sheets** box (translating Running Watts vs. Surge Watts directly onto store box labels) and the red **Carbon Monoxide (CDC/CPSC) & Anti-Backfeeding** warning section are genuinely helpful, specific, and visually distinct from the neutral calculation cards.
7. **Restrained, Uncluttered Amazon Hardware Reference Blocks (`Human/editorial feeling`):**
   - The subtle hardware reference links in the right sidebar (`COMPATIBLE HARDWARE REFERENCE`, `DIAGNOSTIC GEAR REFERENCE`, `Recommended Equipment Categories`) use clean typography without garish product images, fake star ratings, fake "BEST SELLER" ribbons, or aggressive affiliate buttons.
8. **Zero Decorative Stock / AI Imagery (`Human/editorial feeling`):**
   - The absence of generic AI-generated solar/generator stock illustrations keeps page weight tiny, LCP fast, and visual trust high.

---

## 4. Prioritized Visual Action Plan (For Lead Review Before Any Implementation)

| Priority | Target | Visual Change Summary | Severity Addressed |
| :--- | :--- | :--- | :--- |
| **P1** | **Shared `AssumptionsSection` Table** | Fix the hardcoded `"Impact on Runtime"` 4th column header on Watts-to-Amps and Generator calculators; convert the 4-column table to a responsive stacked layout on `< 640px` mobile so columns never crush into 3-letter vertical strips (`Imp / Run`) or clip off-screen. | **High** (Findings C-1, C-2) |
| **P2** | **Generator Mobile Appliance Table & Desktop 4-Step Breakdown** | Make the Generator `Selected Appliances` list responsive on `390px` mobile so `Starting (W)` and delete buttons are visible without horizontal scrolling; change the `How We Calculated Your Generator Size` breakdown from `sm:grid-cols-4` to `sm:grid-cols-2` and remove `truncate` so the surge-driving appliance name (`Driver: ...`) is never hidden on desktop. | **High** (Findings G-1, G-2) |
| **P3** | **Eliminate `line-clamp-2` Mid-Sentence Truncation** | Remove `line-clamp-2` and tighten card descriptions on Homepage category cards (`768px` / `390px`) and Generator Quick Scenario Preset cards (`1440px`–`390px`), and shorten mobile `<select>` option labels on UPS and Watts-to-Amps so no text cuts off mid-word. | **High / Medium** (Findings H-3, G-3, U-1) |
| **P4** | **De-SaaS the Homepage Layout** | Remove the redundant centered Hero CTA + duplicate Flagship UPS banner + duplicate Popular vs. Category card grids + 3-column `ShieldCheck` feature strip. Lead immediately with the 3 live calculators above the fold, followed by a compact, honest roadmap list for upcoming tools. | **High** (Findings H-1, H-2, H-4) |
| **P5** | **De-Box Supporting Editorial Sections** | Reduce card-inside-card nesting in `MethodologySection` (use a clean divided variable table/list instead of individual sub-cards) and `WorkedExampleSection` (use a connected vertical step timeline instead of 4 separate bordered boxes), and balance the 3-item sub-metric grid on the Watts-to-Amps result card. | **Medium / Low** (Findings C-3, C-4, W-1) |
