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
