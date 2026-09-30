# CalcMyPower Rulebook — Domain 01: Calculator Engineering & Topic Scope

> Antigravity Modular Rule Specification: Category `01_calculator_engineering.md`
> Auto-discovered by Antigravity from `.agents/rules/*.md`.
> Strict Zero-Truncation Constraint: Size <= 22,000 bytes (< 24 KB per-file ceiling).

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

