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
