# CalcMyPower — Lessons & Mistake Prevention Log (LESSONS.md)

This log documents lessons learned, bugs found, root causes, and prevention strategies in accordance with GEMINI.md Section 17.

---

## Lesson 001: Separation of Pure Math from React State
- **Context:** Calculators with edge cases (0 load, negative Ah, extreme efficiency) can trigger division by zero, `NaN`, or infinite values if math is performed inside React `onChange` handlers without validation.
- **Rule:** Never execute raw math directly in UI handlers. Always pass sanitized inputs through a validated calculation function that returns structured results with error flags and safe fallbacks.
- **Prevention:** Vitest test suites must explicitly test boundary cases: 0 Watts, negative numbers, extreme voltages, and high loads.

---

## Lesson 002: Avoiding Hydration Mismatch in Client Calculators
- **Context:** Next.js SSR can create hydration mismatches if default values depend on `window`, `localStorage`, or client-side random IDs.
- **Rule:** Always provide static, deterministic default initial states for all calculator inputs. Use React 19 / Next.js 15 client boundaries cleanly.
- **Prevention:** Verify all calculator pages load cleanly without console warnings or hydration errors in production build.

---

## Lesson 003: Continuous Load vs Non-Continuous Load in Educational Examples
- **Context:** In a 120V household branch circuit, a 1,500W load draws 12.5A. Stating that this has "2.5A of safety headroom on a 15A breaker" is technically misleading for continuous loads (running 3+ hours, e.g. space heaters), because the NEC 80% continuous duty limit ($15\text{ A} \times 0.80 = 12.0\text{ A}$) is exceeded by 0.5A.
- **Rule:** Never claim a circuit has "safety headroom" without clearly distinguishing between non-continuous and continuous loads. Explicitly explain the 80% / 125% continuous duty rule.
- **Prevention:** Review all worked examples and FAQ answers to verify that continuous operation limits are acknowledged and not conflated with momentary trip points.

---

## Lesson 004: Assumption Transparency in Polyphase (Three-Phase) Formulas
- **Context:** Applying $I = P / (\sqrt{3} \times V \times PF)$ without explicitly stating the "balanced system" condition is physically incomplete, as unbalanced three-phase circuits have different current flows per phase and carry neutral currents.
- **Rule:** Whenever polyphase equations are displayed, state explicitly that the calculation assumes a symmetrical, balanced three-phase load.
- **Prevention:** Include balanced system notices in methodology sections, formula tooltips, and variable tables.

---

## Lesson 005: Form Control Accessible Semantics
- **Context:** Using `<label>` tags as visual section headers (e.g. `<label>Common Load Presets</label>`) without an `htmlFor` attribute or nested form control triggers browser accessibility audits ("No label associated with a form field").
- **Rule:** Use semantic `<p>` or `<span>` elements for group headers and preset buttons. Reserve `<label htmlFor="...">` strictly for actual associated `<input>`, `<select>`, and `<textarea>` controls.
- **Prevention:** Run Chrome DevTools `list_console_messages` during QA and verify 0 accessibility issues.

---

## Lesson 006: Avoiding Naive Summation in Multi-Motor Surge Sizing
- **Context:** Online generator calculators frequently sum all appliance starting watts ($\sum W_{starting}$), assuming all compressors and motor inrushes occur at the exact same millisecond. Adding every appliance's starting surge assumes all startup events occur simultaneously and can substantially overstate the required generator capacity.
- **Rule:** Clearly explain asynchronous motor cycling; size peak starting demand as Total Continuous Running Watts plus the Largest Additional Starting Watts ($\Delta W_{\max} = \max(W_s - W_r)$) among active loads, and compute CalcMyPower Planning Capacity as $W_{\text{peak}} \times 1.25$.
- **Prevention:** Emphasize this methodology in the specification, worked examples, and automated test cases.

---

## Lesson 007: Mandatory Carbon Monoxide & Backfeeding Electrical Disclaimers for Generator Tools
- **Context:** Generator sizing tools guide purchasing decisions, but portable generator misuse causes dozens of carbon monoxide fatalities and severe utility worker electrocution accidents annually from illegal backfeeding.
- **Rule:** Any generator calculator or article must prominently feature unmissable safety advisories regarding outdoor placement (at least 20 feet away from windows, doors, and vents sourced to CDC/CPSC) and transfer equipment guidance: *"Use properly installed transfer equipment or an approved interlock arrangement where applicable to prevent unintended interconnection with utility power. Follow applicable NEC and local code requirements and use qualified electrical professionals for installation."*
- **Prevention:** Standardize dedicated safety alert components in generator calculator specifications and UI layouts.

---

## Lesson 008: Refraining from Arbitrary Retail Range Bucketing
- **Context:** Arbitrarily mapping numerical calculator results into fixed retail product tiers (e.g. "4,000W–5,500W class") lacks rigorous sourcing and can mislead users whose load requirements straddle or fall outside arbitrary commercial boundaries.
- **Rule:** Deliver exact calculated engineering thresholds (minimum running capacity, minimum peak/startup capacity, and planning capacity after headroom) and educate the user on how to compare them against manufacturer nameplate Rated Watts and Surge Watts.
- **Prevention:** In calculator specifications and UI results, present calculated figures first, followed by clear equipment specification matching criteria, rather than fabricated retail buckets.

---

## Lesson 009: Precise Attribution for Safety and Operating Margins
- **Context:** Presenting planning guidelines (such as 25% continuous headroom) as universal NEC code mandates or claiming NEC 702 mandates a single specific transfer switch design creates inaccurate technical claims in violation of GEMINI.md Section 9 and 10.
- **Rule:** Clearly label planning buffers (e.g., "CalcMyPower planning headroom factor"), note that manufacturer recommendations may vary, use technically cautious language for transfer equipment, and source CO safety rules directly to CDC/CPSC guidance.
- **Prevention:** Review all safety and methodology claims during specification and QA phases to ensure every standard cited is accurately represented.

---

## Lesson 010: Explicit Attribution of Apparent Power (kVA) Levels
- **Context:** Stating a single ambiguous kVA metric without defining whether it represents running load, peak demand, or planning capacity confuses users comparing equipment nameplates.
- **Rule:** Use $kVA = kW / PF$ and explicitly label what power level the kVA value represents (Planning kVA vs. Running kVA vs. Peak kVA), explicitly noting that $PF = 0.80$ is an illustrative assumption that must be verified against actual equipment specs.
- **Prevention:** Define and test all three kVA stages explicitly in calculation engines and test suites.

---

## Lesson 011: Prohibition of Arbitrary Multipliers on Custom Appliance Loads
- **Context:** Basic calculators often automatically double or triple running watts (e.g. $W_r \times 2$ or $W_r \times 3$) when a user adds a custom appliance with unknown surge, fabricating inrush characteristics for resistive or inverter loads that have zero surge.
- **Rule:** Never apply ungrounded automated multipliers to user-entered loads. Require explicit Running Watts and Starting Watts, or provide a clear "No Motor Surge / Unknown" option that sets Starting Watts = Running Watts.
- **Prevention:** Enforce input field validation that requires explicit inputs and avoids silent heuristic multipliers.

---

## Lesson 012: Attribute-Based Generator Technology Comparisons
- **Context:** Classifying generator types strictly by wattage cutoffs (e.g. declaring all generators under 4,500W are inverters and all over 7,500W are standby) is inaccurate due to modern high-wattage inverters and compact standby units.
- **Rule:** Compare generator categories (portable inverter, conventional portable, dual-fuel, and standby) based on objective technical attributes: Total Harmonic Distortion (THD), noise levels, portability, fuel storage/flexibility, and automatic transfer capabilities.
- **Prevention:** Present educational comparison tables grounded in engineering characteristics rather than rigid wattage cutoffs.

---

## Lesson 013: Explicit Accessible Attributes on Dynamic Table Inputs
- **Context:** Inline editable `<input type="number">` fields inside table rows (where column headers act as visual labels) trigger Chrome DevTools accessibility warnings (`No label associated with a form field` and `A form field element should have an id or name attribute`) if they lack explicit accessible labels and unique `id`/`name` properties.
- **Rule:** Every dynamically rendered table input must include a unique `id` (e.g. `running-watts-${item.id}`), `name`, and a descriptive `aria-label` (e.g. `Running watts for ${item.name}`).
- **Prevention:** Verify all multi-row interactive calculators with Chrome DevTools `list_console_messages` and `take_snapshot` to confirm zero form-field accessibility issues.

---

## Lesson 014: Never Pass HTML Entities (`&amp;`) Inside JSX String Props
- **Context:** Passing `title="Calculation Assumptions &amp; Engineering Planning Model"` as a JSX string prop causes React to escape the ampersand a second time, rendering literal `&amp;` in the visible heading.
- **Rule:** Always use plain characters (`&`, `'`, `"`) inside JavaScript/TypeScript string literals and JSX string props; only use HTML entities in direct JSX text children when syntactically required.
- **Prevention:** Search rendered `document.body.innerText` for `&amp;`, `&quot;`, and `&#` during browser QA.

---

## Lesson 015: Centralize Preset Data and Unit-Test Preset Values Against Labels
- **Context:** In the Watts-to-Amps calculator, the `"Microwave (1,200W @ 120V)"` preset button had `watts: 120` instead of `watts: 1200`, causing a 10× calculation discrepancy (`1.00 A` instead of `10.00 A`).
- **Rule:** Export calculator preset arrays from `src/lib/calculators/*.ts` and write unit tests verifying that preset numerical values match their human-readable labels.
- **Prevention:** Added `WATTS_TO_AMPS_PRESETS` to `src/lib/calculators/watts-to-amps.ts` and test case `TC-14` in `watts-to-amps.test.ts`.

---

## Lesson 016: Keep Native `<select>` `<option>` Text Concise for `390px` Mobile Viewports
- **Context:** Native mobile `<select>` controls do not wrap single-line text in their closed state. Option labels longer than ~38 characters (especially when combined with an appended `(sublabel)`) clip horizontally on `390px` viewports.
- **Rule:** Keep `<option>` label + sublabel combinations concise (e.g., `"LiFePO4 — Lithium (90% DoD)"`, `"AC Single-Phase (Residential)"`) and place longer explanatory definitions in the field's `helperText`.
- **Prevention:** Visually inspect every `<select>` element at `390×844` via Chrome DevTools screenshots.

---

## Lesson 017: Avoid `line-clamp` on Technical Labels and Scenario Descriptions
- **Context:** Applying `line-clamp-1` or `line-clamp-2` to technical outputs (like `"Driver: Refrigerator / Freezer (Modern Energy Star)"`) or scenario preset descriptions cuts off critical appliance names and wattage ratings with `...`.
- **Rule:** Never truncate technical identifiers, appliance lists, or calculation drivers with `line-clamp`. Allow text to wrap naturally within responsive grid cells.
- **Prevention:** Visual audit across mobile (`390px`) and desktop (`1280px`/`1440px`) viewports.

---

## Lesson 018: Never Place `items-start` on Parent Grid Containers Wrapping Sticky `<aside>`
- **Context:** Setting `items-start` (`align-items: start`) on a CSS Grid container (`<div className="lg:grid ... items-start">`) collapses the `<aside>` grid column height to the height of its immediate content (~650px) rather than stretching to the full height of the adjacent article content (~12,000px). Because a `position: sticky` child can only stick within the bounds of its direct parent, `<nav className="sticky top-20">` runs out of vertical track immediately and scrolls off-screen.
- **Rule:** Never apply `items-start` to grid wrappers containing a sticky sidebar. Allow the grid column to stretch to the full height of the article row. Additionally, keep the sidebar component compact (under ~650px total height) so the reading percentage, active section label, all section links, useful tools, and CTA button remain visible inside 800px–900px viewports without vertical clipping.
- **Prevention:** Test desktop scrolling at both mid-article and end-of-article scroll offsets using Chrome DevTools screenshots to confirm the sidebar remains pinned throughout the entire page.

---

## Lesson 019: Absolute Prohibition of Em/En Dashes and Double/Triple Hyphens in Article Prose
- **Context:** Large language models routinely insert em dashes (`—`), en dashes (`–`), or double/triple hyphens (`--`/`---`) as sentence breaks, parenthetical breaks, or range indicators, creating recognizable synthetic writing patterns in violation of GEMINI.md.
- **Rule:** Ban `—`, `–`, `--`, and `---` from normal editorial prose. Use standard commas, parentheses, colons, or periods for sentence breaks. Use the word "to" for all numerical and unit ranges (e.g., `5 to 10 kW`, `$600 to $2,500`, `18 to 24 kW`). Hyphens (`-`) are permitted only inside compound adjectives (e.g. `whole-house`, `120-volt`), code, and URLs.
- **Prevention:** Run an automated pre-commit script scanning article source files for `—`, `–`, `--`, and `---` before declaring any editorial article complete.

---

## Lesson 020: Autonomous End-to-End Live Deployment Execution
- **Context:** Hesitating or pausing between git commit, git push, and live verification when the Lead has provided explicit authorization creates unnecessary round-trips.
- **Rule:** When the Lead authorizes a live deployment, execute the full pipeline end-to-end without pausing: run tests, typecheck, lint, build, staged secret scan, git commit, git push origin main, poll live production URL for 200 OK + expected content, and perform live Chrome DevTools smoke QA with screenshots.
- **Prevention:** Follow Section 23 deployment order deterministically and verify the live production URL directly.


