# CalcMyPower — Calculator Specification: Generator Size Calculator

**Document:** `CALCULATOR_SPEC_GENERATOR_SIZE.md`  
**Tool Name:** Generator Size Calculator  
**Target Route / URL:** `/generator-size-calculator`  
**Status:** SPECIFICATION PHASE — AWAITING LEAD REVIEW  
**Implementation Engineer:** Antigravity (Gemini 3.8 Flash High)  
**Lead / Strategist:** ChatGPT + Project Owner  

---

## 1. Search Intent & Verified SEMrush Data

This specification directly targets the high-intent US search cluster for generator sizing identified in the verified project dataset:

| Target Query | Monthly US Volume | Keyword Difficulty (KD) | Search Intent | Strategic Alignment |
|---|---|---|---|---|
| `generator size calculator` | **1,600** | **32%** (Low/Med) | Tool / Sizing | **Primary H1 & Title Target** |
| `generator calculator` | **1,000** | **34%** (Low/Med) | Tool / Calculation | Core semantic supporting keyword |
| `generator sizing calculator` | **1,000** | **29%** (Low) | Tool / Sizing | Secondary meta and heading target |
| `generator load calculator` | **320** | **24%** (Low) | Calculation / Electrical | Methodology & load-budgeting section |
| `house generator size calculator` | **260** | **26%** (Low) | Practical Homeowner | Home backup application mode |
| `generator electric wattage calculator` | **260** | **19%** (Very Low) | Technical / Wattage | Electrical formula & variable section |

### Intent Analysis
Users seeking a generator size calculator have a concrete, high-stakes practical problem: **they are preparing for power outages, outfitting an RV, or sizing a jobsite generator, and they need to know what capacity generator to buy or rent without dangerously undersizing or wastefully oversizing.**

The user's journey typically falls into one of three stages:
1. **Emergency / Home Backup Planning:** Sizing essential circuits (refrigerator, sump pump, furnace blower, lights, Wi-Fi) or whole-house systems during storm seasons.
2. **RV / Camping Travel:** Determining if a 2,000W, 3,500W, or 4,500W inverter generator can start and run an RV rooftop air conditioner (13,500 BTU or 15,000 BTU) alongside converter/charger loads.
3. **Trades / DIY / Jobsite:** Sizing for air compressors, table saws, circular saws, and battery tool chargers.

---

## 2. Product Positioning & Value Proposition

Most existing generator calculators on the web suffer from one of two extremes:
- **Biased Manufacturer Funnels:** Tools from generator manufacturers (e.g. Generac, Kohler) frequently push homeowners toward expensive 22kW–26kW whole-house standby systems, obscuring raw math and requiring email/zip code lead-capture forms.
- **Crude Addition Scripts:** Basic affiliate websites use naive scripts that simply sum running watts, completely ignoring motor startup surges (Locked Rotor Amps), or alternatively, add *every* appliance's starting surge together simultaneously, producing wildly inflated, unrealistic recommendations.

### CalcMyPower Positioning:
- **Unbiased & Independent:** Not affiliated with any generator brand.
- **Transparent Mathematical Engine:** Distinctly calculates Total Running Watts, Peak Starting Demand, and explains the engineering difference between continuous running load and the *Largest Single Motor Starting Surge*.
- **Practical Capacity Range:** Outputs both the bare electrical minimum and a realistic continuous operating band (applying standard 20–25% operating headroom).
- **Multi-Application Versatility:** Dedicated presets and filters for Home Backup, Portable / Emergency, RV / Camping, and Jobsite DIY.
- **Zero Friction:** 100% client-side, instant calculation, zero forced email signups, and fully responsive across mobile, tablet, and desktop.

---

## 3. Competitor Differentiation Analysis

A thorough review of prominent market tools was conducted. The findings and CalcMyPower differentiators are summarized below:

| Competitor | What They Do Well | Where They Fall Short | How CalcMyPower Differentiates |
|---|---|---|---|
| **Canning Generator Solutions** | Strong industrial equipment data, kW/kVA charts, and technical motor starting references. | Complex B2B/industrial focus; static tabular content; difficult for ordinary residential or RV consumers. | Translates rigorous electrical engineering principles into a clear, consumer-friendly interactive UI with transparent math. |
| **Generator Source** | Excellent technical kVA-to-kW conversion utilities; detailed single-phase vs three-phase generator parameters. | Geared primarily toward commercial diesel generators (20kW–2000kW); lacks an intuitive residential appliance picker. | Provides consumer appliance load libraries and dynamic custom wattage inputs alongside rigorous kW and kVA conversions. |
| **Honda Power Equipment** | Clean consumer categorizations (Camping, Home, Tailgating, Jobsite); recognizable equipment presets. | Locked exclusively to Honda's product lineup; simplistic bucketing that recommends specific models without explaining calculations or power factor. | Brand-agnostic sizing outputs; explains the exact formula, continuous headroom, and motor startup physics without pushing a single brand. |
| **Generac** | Comprehensive home backup wizard; covers whole-house vs managed circuit transfers. | Gated lead-capture funnel; tends to aggressively upsize homeowners toward 20kW+ whole-house standby units; hides intermediate math. | Ungated, instant results; shows exactly how staggering motor starts or managing loads allows a much smaller, affordable portable or standby generator to succeed. |
| **Taylor Power Systems** | Precise technical specifications for prime, continuous, and standby ratings with standard power factor ($PF=0.8$). | Industrial enterprise focus; no interactive consumer builder for emergency home loads or DIY usage. | Retains proper engineering rigor (continuous duty margins, $PF=0.8$ kVA conversion) while delivering a mobile-first user experience. |

---

## 4. User Flow & Application Modes

The user flow is structured to guide the user from broad intent to precise equipment selection in seconds:

```
[ Step 1: Select Application Mode ]
  ├── Home Backup (Essential Circuits vs Whole-House)
  ├── Portable Generator (Emergency, DIY, Tailgate)
  ├── RV & Camping (30-Amp / 50-Amp Service)
  └── Jobsite & Trades (Power Tools & Compressors)
            │
            ▼
[ Step 2: One-Click Quick Presets (Optional) ]
  ├── Essential Outage (Fridge + Sump + Router + Lights + Phone)
  ├── Full Comfort Outage (Essential + Furnace Blower + Microwave + TV)
  ├── RV 30A Summer (13.5k A/C + Converter + Fridge + Microwave)
  └── Jobsite Framing (Air Compressor + Circular Saw + Battery Chargers)
            │
            ▼
[ Step 3: Interactive Appliance Selection & Custom Loads ]
  ├── Browse categorized appliance library
  ├── Adjust quantities ( + / - )
  ├── Toggle starting surge applicability
  └── Add custom appliances (custom name, running watts, starting watts)
            │
            ▼
[ Step 4: Real-Time Sizing Outputs & Educational Breakdown ]
  ├── Total Running Watts (Continuous Load)
  ├── Peak Starting Demand (Running + Largest Surge)
  ├── Recommended Generator Capacity Range (with 20-25% headroom)
  ├── kW and kVA Conversions
  └── Transparent calculation explanation box
```

---

## 5. Complete Appliance Library & US Practical Defaults

All default wattages are derived from US Department of Energy, manufacturer nameplates, and electrical safety standards. The calculator explicitly displays: *"Default wattages are typical estimates. Always check your equipment nameplate or owner's manual for exact ratings."*

### A. Kitchen & Refrigeration
| Appliance | Default Running Watts ($W_r$) | Default Starting Watts ($W_s$) | Surge Delta ($\Delta W$) | Has Motor Surge? | Typical Nameplate Notes |
|---|---|---|---|---|---|
| Refrigerator / Freezer (Modern Energy Star) | 180 W | 1,200 W | 1,020 W | Yes | Compressor inrush lasts 1–3 seconds |
| Older Refrigerator / Deep Freezer | 400 W | 1,600 W | 1,200 W | Yes | Older reciprocating compressors have high LRA |
| Microwave Oven (1,000W Cooking Power) | 1,200 W | 1,500 W | 300 W | Slight | Magnetron transformer startup |
| Electric Coffee Maker (Drip) | 1,000 W | 1,000 W | 0 W | No | Pure resistive heating element |
| Toaster (2-Slice) | 850 W | 850 W | 0 W | No | Pure resistive |
| Dishwasher | 1,500 W | 2,000 W | 500 W | Yes | Wash pump motor + internal drying heater |
| Electric Range / Oven (Single Burner) | 1,500 W | 1,500 W | 0 W | No | Resistive element; large continuous draw |

### B. Heating, Ventilation & Air Conditioning (HVAC)
| Appliance | Default Running Watts ($W_r$) | Default Starting Watts ($W_s$) | Surge Delta ($\Delta W$) | Has Motor Surge? | Typical Nameplate Notes |
|---|---|---|---|---|---|
| Furnace Fan Blower (Gas/Oil Heat, 1/2 HP) | 800 W | 2,300 W | 1,500 W | Yes | PSC or ECM blower motor startup |
| Central Air Conditioner (3-Ton / 36,000 BTU) | 3,500 W | 10,000 W | 6,500 W | Yes | Severe LRA unless equipped with soft-starter |
| Central Air Conditioner (4-Ton / 48,000 BTU) | 4,500 W | 13,500 W | 9,000 W | Yes | Requires large standby generator (18kW–24kW) |
| Window Air Conditioner (8,000 BTU) | 800 W | 1,800 W | 1,000 W | Yes | Bedroom cooling; standard 120V outlet |
| Window Air Conditioner (12,000 BTU) | 1,200 W | 2,800 W | 1,600 W | Yes | High surge on hot compressor restarts |
| Portable Electric Space Heater | 1,500 W | 1,500 W | 0 W | No | Pure resistive; continuous 12.5A draw @ 120V |

### C. Water, Plumbing & Well Pumps
| Appliance | Default Running Watts ($W_r$) | Default Starting Watts ($W_s$) | Surge Delta ($\Delta W$) | Has Motor Surge? | Typical Nameplate Notes |
|---|---|---|---|---|---|
| Sump Pump (1/3 HP) | 800 W | 1,800 W | 1,000 W | Yes | Critical basement flood prevention |
| Sump Pump (1/2 HP) | 1,050 W | 2,200 W | 1,150 W | Yes | Common high-capacity residential pump |
| Submersible Well Pump (1/2 HP, 240V) | 1,000 W | 2,500 W | 1,500 W | Yes | Deep well motor starting against head pressure |
| Submersible Well Pump (1 HP, 240V) | 2,000 W | 4,500 W | 2,500 W | Yes | High starting torque requirement |
| Electric Water Heater (40–50 Gallon) | 4,500 W | 4,500 W | 0 W | No | Pure resistive 240V; massive continuous load |

### D. Lighting, Electronics & Home Essentials
| Appliance | Default Running Watts ($W_r$) | Default Starting Watts ($W_s$) | Surge Delta ($\Delta W$) | Has Motor Surge? | Typical Nameplate Notes |
|---|---|---|---|---|---|
| LED Home Lighting (Per Room, 4 Bulbs) | 40 W | 40 W | 0 W | No | Negligible inrush; pure active power |
| Wi-Fi Router & Modem | 25 W | 25 W | 0 W | No | Constant low-voltage DC power supply |
| Laptop / Workstation Computer | 100 W | 100 W | 0 W | No | Switch-mode power supply |
| Desktop Gaming PC & Monitor | 450 W | 450 W | 0 W | No | High-end power supply load |
| 55"–65" LED Television | 120 W | 120 W | 0 W | No | Low continuous power |
| Garage Door Opener (1/2 HP) | 550 W | 1,400 W | 850 W | Yes | Heavy initial torque lifting door |
| Medical CPAP Machine | 60 W | 60 W | 0 W | No | Life-support; requires clean THD (<3%) |

### E. RV & Camping Power
| Appliance | Default Running Watts ($W_r$) | Default Starting Watts ($W_s$) | Surge Delta ($\Delta W$) | Has Motor Surge? | Typical Nameplate Notes |
|---|---|---|---|---|---|
| RV Rooftop A/C (13,500 BTU) | 1,500 W | 3,200 W | 1,700 W | Yes | Often requires soft-starter on small inverters |
| RV Rooftop A/C (15,000 BTU) | 1,800 W | 3,500 W | 1,700 W | Yes | Standard 30A RV demand |
| RV Converter / Battery Charger (45A DC) | 600 W | 600 W | 0 W | No | Internal battery charging load |
| RV Absorption Refrigerator (Electric Mode) | 350 W | 350 W | 0 W | No | Electric heating element mode |

### F. Jobsite & Workshop Tools
| Appliance | Default Running Watts ($W_r$) | Default Starting Watts ($W_s$) | Surge Delta ($\Delta W$) | Has Motor Surge? | Typical Nameplate Notes |
|---|---|---|---|---|---|
| Air Compressor (1.5 HP Portable) | 1,500 W | 3,500 W | 2,000 W | Yes | Starts against tank head pressure |
| Circular Saw (7-1/4", 15 Amp) | 1,800 W | 2,800 W | 1,000 W | Yes | Universal motor startup |
| Table Saw (10", 15 Amp) | 1,800 W | 4,000 W | 2,200 W | Yes | High blade inertia startup |
| Cordless Power Tool Dual Charger | 150 W | 150 W | 0 W | No | Electronic battery charging |

---

## 6. Calculation Engine & Engineering Methodology

### A. Core Mathematical Definitions
For each appliance $i$ in the user's selected equipment list with quantity $Q_i$, running wattage $W_{r,i}$, and starting wattage $W_{s,i}$:

1. **Item Continuous Load:**
   $$P_{r,i} = Q_i \times W_{r,i}$$

2. **Item Motor Surge Delta:**
   $$\Delta W_i = \max(0, W_{s,i} - W_{r,i})$$

3. **Total Running Watts ($W_{running}$):**
   $$W_{running} = \sum_{i=1}^{n} (Q_i \times W_{r,i})$$

---

### B. Startup / Surge Demand: Defense of the "Largest Single Motor Surge" Method
A central flaw of poor calculators is the **Naive Summation Method**, which calculates surge as $\sum (Q_i \times W_{s,i})$. 
- *Why is Naive Summation technically incorrect for generator sizing?*  
  Electric motors draw starting surge (Locked Rotor Amps) for only **0.5 to 3 seconds** while accelerating up to nominal RPM. Under ordinary residential or jobsite conditions, appliances operate on asynchronous, independent thermodynamic or mechanical cycles. A refrigerator compressor, sump pump, and furnace blower do not start at the identical millisecond unless power has just been restored simultaneously to all circuits.
- Even upon power restoration, manual circuit breakers or transfer switch interlocks are energized sequentially.
- Sizing for 100% simultaneous motor surges forces a homeowner with $2,500\text{W}$ of running load to purchase a $12,000\text{W}$ generator instead of a perfectly adequate $4,500\text{W}$ generator.

#### The Standard Electrical Engineering Rule (IEEE / Electrical Contractor Standard):
Peak starting demand is governed by the base running load of all operating appliances **plus the single largest motor startup surge** among all active equipment:

$$W_{surge\_demand} = W_{running} + \max_{i=1}^{n} (\Delta W_i)$$

*Example:*
- Refrigerator: $180\text{W}$ running, $1,200\text{W}$ starting ($\Delta W = 1,020\text{W}$)
- Sump Pump: $800\text{W}$ running, $1,800\text{W}$ starting ($\Delta W = 1,000\text{W}$)
- LED Lighting: $100\text{W}$ running, $100\text{W}$ starting ($\Delta W = 0\text{W}$)
- TV & Router: $150\text{W}$ running, $150\text{W}$ starting ($\Delta W = 0\text{W}$)

$$W_{running} = 180 + 800 + 100 + 150 = 1,230\text{ Watts}$$
$$\max(\Delta W) = \max(1020, 1000, 0, 0) = 1,020\text{ Watts (Refrigerator)}$$
$$W_{surge\_demand} = 1,230 + 1,020 = 2,250\text{ Watts}$$

---

### C. Continuous Generator Operating Headroom (The 80% Rule)
Generators are internal combustion engines powering an alternator. Operating a generator at 100% of its rated continuous capacity causes:
- Rapid engine overheating and premature wear
- High fuel consumption
- Severe voltage and frequency sag when small transient loads cycle on
- Risk of tripping the generator's main circuit breaker

**Standard Recommendation:** Sizing should target running continuous loads at approximately **75% to 80% of the generator's rated continuous capacity** (or adding a **20% to 25% safety buffer**):

$$W_{rated\_recommended} = \frac{W_{running}}{0.80} = W_{running} \times 1.25$$

---

### D. Generator Sizing Capacity Formulation
A generator has two distinct nameplate ratings:
1. **Rated (Running) Watts:** Continuous output capability.
2. **Surge (Starting / Maximum) Watts:** Short-term momentary capacity (typically 2 to 10 seconds).

The calculator outputs both dimensions:
- **Minimum Continuous Generator Rating ($W_{rated\_min}$):**
  $$W_{rated\_min} = \lceil W_{running} \times 1.20 \rceil$$
  (Rounded up to nearest 100W or standard generator class).
- **Minimum Surge / Peak Generator Rating ($W_{surge\_min}$):**
  $$W_{surge\_min} = \lceil \max(W_{surge\_demand}, W_{running} \times 1.25) \rceil$$
- **Recommended Generator Class Range:**
  To assist buyers in real-world retail categories (e.g. 3,500W, 5,000W, 7,500W, 10,000W), the calculator provides a recommended band:
  - Lower bound: $W_{rated\_min}$
  - Upper bound: Standard commercial generator category that provides $\ge 25\%$ headroom above continuous load and fully absorbs $W_{surge\_demand}$.

---

### E. kW and kVA Conversions
Generators are rated in Kilowatts ($kW$) for active power and Kilovolt-Amperes ($kVA$) for apparent power.
- **Kilowatt Conversion:**
  $$kW = \frac{W}{1000}$$
- **kVA Conversion & Power Factor ($PF$):**
  Standard US residential standby and commercial generators are rated at **$0.80$ power factor lagging** ($PF = 0.8$):
  $$kVA = \frac{kW}{0.80} = kW \times 1.25$$
  - *Small Portable Inverters ($< 5\text{ kW}$):* Usually rated at $1.0\text{ PF}$ ($1\text{ kW} = 1\text{ kVA}$).
  - *Standby & Commercial Sets ($\ge 6\text{ kW}$):* Rated at $0.8\text{ PF}$.
  - The calculator transparently displays both kW and kVA metrics, explicitly annotating the $PF=0.8$ standard assumption.

---

## 7. Outputs & Result Hierarchy

The result presentation must adhere to CalcMyPower's established visual hierarchy:

```
+-------------------------------------------------------------+
| [Badge] ESTIMATED GENERATOR CAPACITY RANGE                  |
|                                                             |
|           5,500 W – 7,500 W Rated                           |
|         (7,000 W – 9,000 W Starting Surge)                  |
|                                                             |
| Subtext: Sized for 3,850W running load with 25% headroom     |
|          and absorbing a 1,600W single largest motor surge. |
+-------------------------------------------------------------+
| Stat 1: Total Running Load       | Stat 2: Peak Surge Demand|
| 3,850 Watts (3.85 kW)            | 5,450 Watts (5.45 kW)    |
| Continuous draw across 8 loads   | Running + largest surge  |
+----------------------------------+--------------------------+
| Stat 3: Minimum Generator Rating | Stat 4: Apparent Power   |
| 4,800 Watts continuous           | 6.1 kVA (Standby PF 0.8) |
| Includes 20% continuous headroom | For standby sizing       |
+-------------------------------------------------------------+
```

### Explanatory Methodology Breakdown (Always Visible to User):
Below the primary result card, a clear formula explanation card dynamically explains:
1. **Continuous Load Sum:** Sum of all active appliances ($W_{running}$).
2. **Surge Driver:** Identifies which specific selected appliance is driving the peak startup event ($\max \Delta W$).
3. **Continuous Headroom Rationale:** Explains that operating at 75–80% load preserves engine life, improves fuel economy, and prevents breaker trips when additional items turn on.

---

## 8. Electrical Safety, Code & Hazard Guidance

Generator operation poses severe real-world safety hazards. In compliance with `GEMINI.md` Section 10, the following safety guardrails are mandatory in the UI:

### A. Carbon Monoxide (CO) Poisoning & Generator Placement
- **Strict Warning:** Portable generators produce deadly, odorless carbon monoxide gas.
- **Rules Cited:**
  - **NEVER** operate a generator indoors, in a garage, in a basement, or in a crawlspace, even with windows open.
  - Operate generators outdoors only, **at least 20 feet away** from all windows, doors, and fresh air intake vents, with the exhaust pointed away from living spaces (CDC / CPSC / OSHA guidelines).
  - Install battery-powered or battery-backup CO alarms in the home.

### B. Backfeeding Hazards & Transfer Switch Compliance
- **Strict Warning:** Connecting a generator directly to a standard wall outlet or appliance receptacle ("backfeeding" with a male-to-male suicide cord) is illegal, exceptionally dangerous, and violates the National Electrical Code.
- **Hazards Explained:**
  - Backfed electrical power energizes utility lines outside the home, stepping up through neighborhood transformers to thousands of Volts and creating lethal electrocution risks for utility line workers.
  - Inadvertent utility power restoration while backfeeding can destroy the generator and cause an immediate house fire.
- **Required Equipment:**
  - **Manual Transfer Switch or Interlock Kit:** Required by **NEC Article 702 (Optional Standby Systems)** to physically break the utility connection before connecting generator power ("break-before-make").
  - **Power Inlet Box:** Exterior-mounted NEMA inlet (e.g. L14-30 inlet) hardwired to the transfer equipment.

### C. Total Harmonic Distortion (THD) & Sensitive Electronics
- Conventional open-frame portable generators often exhibit high Total Harmonic Distortion ($THD > 10\% - 20\%$).
- Variable frequency and voltage spikes can overheat or damage modern microprocessors, variable-speed furnace ECM blowers, smart TVs, and medical equipment.
- **Recommendation:** When powering sensitive electronics, choose an **Inverter Generator** with clean sine wave power ($THD < 3\% - 5\%$).

---

## 9. UX & Interface Specification

### A. Layout Structure
- Follows the locked `CalculatorShell` structure:
  - **Left / Main Column:** Application selector tabs, Quick Preset buttons, Searchable appliance picker, Selected load list table, and Custom appliance row.
  - **Right / Sidebar Column (Sticky on Desktop):** Primary result card with recommended generator capacity, secondary stats, and contextual Amazon hardware references.
- **Mobile First:** On viewports $< 768\text{px}$, the result card stacks cleanly, and preset buttons wrap without horizontal overflow.

### B. Appliance Library Interaction
- **Search & Category Filtering:** Search input ("Search appliances, e.g. pump, fridge, saw...") with category pills (`All`, `Kitchen`, `HVAC`, `Water / Well`, `Electronics`, `RV`, `Tools`).
- **One-Click Add & Quantity Steppers:** Clicking an appliance adds it to the active load list. In the active list, users can adjust quantity with `+` / `-` buttons or delete items.
- **Custom Appliance Input:** Always accessible inputs allowing custom name, running watts, and starting watts.

### C. Quick Presets
One-click buttons that clear existing items and load pre-configured scenarios:
1. **"Essential Outage" (2,200W–3,500W class):** Refrigerator, Sump Pump 1/3 HP, Wi-Fi Router, 4 LED Light rooms, Phone Charger.
2. **"Comfort Home Backup" (5,500W–7,500W class):** Essential Outage + Furnace Blower (Gas/Oil 1/2 HP), Microwave Oven, 65" TV, Laptop.
3. **"RV 30-Amp Summer" (3,500W–4,500W class):** RV Rooftop A/C (13.5k BTU), RV Converter / Charger, RV Refrigerator, Microwave.
4. **"Small Jobsite" (3,000W–4,000W class):** Portable Air Compressor (1.5 HP), Circular Saw (15A), Battery Tool Dual Charger.

---

## 10. SEO Specification

### Target URL
`https://calcmypower.com/generator-size-calculator`

### Metadata Definitions
- **Meta Title:** Generator Size Calculator (Home Backup, RV & Portable) | CalcMyPower
- **Meta Description:** Calculate what size generator you need for home backup, RV camping, or jobsite tools. Accurate running watts, motor startup surges, and sizing recommendations.
- **H1:** Generator Size Calculator
- **H2 Structure:**
  1. `How to Calculate What Size Generator You Need`
  2. `Understanding Running Watts vs. Starting/Surge Watts`
  3. `Why You Should Not Add Every Starting Watt Together`
  4. `Generator Sizing Formula & Mathematical Methodology`
  5. `Step-by-Step Worked Generator Sizing Example`
  6. `Typical Wattage Estimates for Common Household Appliances`
  7. `Critical Generator Safety: Carbon Monoxide & Transfer Switches`
  8. `Frequently Asked Questions (FAQ)`
  9. `Related Power & Electrical Calculators`

### Target FAQ Candidates
1. **What size generator do I need to run a refrigerator and a freezer?**  
   *Answer:* A modern refrigerator runs on approximately 150–200 Watts but requires 1,200 Watts during compressor startup. A separate freezer requires 150–300 Watts running and 1,200–1,600 Watts starting. A 2,500 to 3,500 Watt inverter generator provides ample capacity to run both units simultaneously while absorbing startup surges.
2. **Can a 5,000-Watt generator run a whole house?**  
   *Answer:* A 5,000W generator can easily power essential household circuits (refrigerator, sump pump, gas furnace blower, lights, Wi-Fi, television, and microwave). However, it cannot run large 240V whole-house central air conditioning compressors (3 to 5 tons) or electric range/water heating loads simultaneously.
3. **What is the difference between starting watts and running watts?**  
   *Answer:* Running watts (rated watts) is the continuous power an appliance consumes while operating normally. Starting watts (surge watts) is the temporary extra power (up to 3 times running watts) needed for 1 to 3 seconds by motor-driven equipment (refrigerators, pumps, air conditioners) to start moving against mechanical load.
4. **How do I connect a generator to my house safely without backfeeding?**  
   *Answer:* To safely power household circuits, install a manual transfer switch or an electrical panel interlock kit connected to an exterior power inlet box. This satisfies National Electrical Code (NEC Article 702) requirements by ensuring utility power is completely disconnected before generator power is applied, preventing deadly backfeed into utility lines.
5. **What size generator is needed for a 30-amp RV?**  
   *Answer:* A 30-amp RV service operates at 120 Volts, representing a maximum capacity of 3,600 Watts ($30\text{A} \times 120\text{V}$). Sizing a 3,500W to 4,500W starting generator allows you to start and run a 13,500 or 15,000 BTU rooftop air conditioner while running the internal RV converter charger and residential electronics.

### Internal Link Targets
- Cross-link to `/ups-battery-backup-calculator`: *"Planning battery backup for electronics or short power outages? Explore our UPS Battery Backup Run-Time Calculator."*
- Cross-link to `/watts-to-amps-calculator`: *"Need to convert appliance nameplate Amps to Watts? Use our Watts to Amps Electrical Calculator."*
- Cross-link to `/calculators`: Link back to main directory.

### Schema.org JSON-LD Specifications
1. **`WebApplication`:** Name, description, URL, applicationCategory (`UtilitiesApplication`), free offer ($0).
2. **`BreadcrumbList`:** Home (`/`) $\rightarrow$ Calculators (`/calculators`) $\rightarrow$ Generator Size Calculator (`/generator-size-calculator`).
3. **`FAQPage`:** Structured Q&A pairs matching all 5 visible page FAQs.

---

## 11. Monetization & Contextual Hardware Reference

Affiliate monetization follows `GEMINI.md` Section 11: strictly secondary to the calculation tool, transparently disclosed, and without fake product reviews.

### Contextual Amazon Hardware Categories:
1. **Dual-Fuel Inverter Generators (3,500W – 4,500W class):** Contextual for RV, portable, and essential home backup.
2. **Heavy-Duty Generator Cords (30A L14-30P / 10 AWG 4-prong):** Safe connection from generator to inlet box.
3. **Outdoor Power Inlet Boxes (NEMA 3R, 30-Amp / 50-Amp):** Safe through-the-wall connection point for homeowners.
4. **Manual Transfer Switch Kits (6 to 10 circuits):** Code-compliant indoor subpanels for emergency power.
5. **Inline Digital Wattage / Kill-A-Watt Meters:** Tools to verify exact nameplate appliance draw before generator purchase.

---

## 12. Detailed Calculation Test Plan (16 Test Cases)

The following test scenarios must be implemented in automated Vitest tests (`src/lib/calculators/__tests__/generator-size.test.ts`) during the implementation phase:

| # | Scenario / Description | Inputs | Expected Logic | Expected Output | Purpose of Test |
|---|---|---|---|---|---|
| **TC-01** | Single Resistive Load | Space Heater: Qty 1, $1,500W_r$, $1,500W_s$ | $W_r=1500$, $\Delta W=0$. Surge demand = 1500. Headroom ($x1.2$) = 1800W. | Running: **1,500W**<br>Peak: **1,500W**<br>Min Rated: **1,800W** | Validates baseline resistive load without motor surge. |
| **TC-02** | Multiple Resistive Loads | 10 LED bulbs ($10\times 10W_r=100W$), Toaster ($850W_r$), Coffee Maker ($1,000W_r$) | $W_r=1950$, $\Delta W=0$. Surge demand = 1950. Headroom ($x1.2$) = 2340W. | Running: **1,950W**<br>Peak: **1,950W**<br>Min Rated: **2,340W** | Validates multi-item pure resistive summation. |
| **TC-03** | Single Inductive Motor Load | Refrigerator: Qty 1, $180W_r$, $1,200W_s$ | $W_r=180$, $\Delta W=1020$. Surge demand = $180+1020=1200W$. Headroom = $180\times 1.25=225W$. | Running: **180W**<br>Peak: **1,200W**<br>Min Surge: **1,200W** | Validates single compressor starting surge handling. |
| **TC-04** | Single High-Surge Pump | Sump Pump (1/2 HP): Qty 1, $1,050W_r$, $2,200W_s$ | $W_r=1050$, $\Delta W=1150$. Surge demand = $1050+1150=2200W$. Headroom = $1050\times 1.25=1313W$. | Running: **1,050W**<br>Peak: **2,200W**<br>Min Rated: **1,313W** | Validates motor surge on critical water pump. |
| **TC-05** | RV Rooftop Air Conditioner | RV A/C (13.5k BTU): Qty 1, $1,500W_r$, $3,200W_s$ + Converter $600W_r$ | $W_r=2100$, $\Delta W=1700$. Peak = $2100+1700=3800W$. Headroom = $2100\times 1.25=2625W$. | Running: **2,100W**<br>Peak: **3,800W**<br>Min Surge: **3,800W** | Validates typical RV 30-amp sizing threshold. |
| **TC-06** | Microwave with Transformer Inrush | Microwave: Qty 1, $1,200W_r$, $1,500W_s$ | $W_r=1200$, $\Delta W=300$. Peak = $1200+300=1500W$. Headroom = $1200\times 1.25=1500W$. | Running: **1,200W**<br>Peak: **1,500W**<br>Min Rated: **1,500W** | Validates minor inductive surge characteristic. |
| **TC-07** | Mixed Residential Outage Load | Fridge ($180/1200$), Sump ($800/1800$), Wi-Fi ($25/25$), Lights ($100/100$) | $W_r=1105W$. $\Delta W_{fridge}=1020$, $\Delta W_{sump}=1000$. Max surge delta = 1020. Peak = $1105+1020=2125W$. | Running: **1,105W**<br>Peak: **2,125W**<br>Min Rated: **1,381W** | Validates "largest single motor surge" rule across mixed loads. |
| **TC-08** | Multiple Competing High Surges | Fridge ($180/1200$, $\Delta=1020$) + Furnace Blower ($800/2300$, $\Delta=1500$) + Sump ($800/1800$, $\Delta=1000$) | $W_r=1780W$. Max surge = 1500W (Furnace). Peak demand = $1780+1500=3280W$. (Not naive $1200+2300+1800=5300W$). | Running: **1,780W**<br>Peak: **3,280W**<br>Min Rated: **2,225W** | Proves prevention of naive summation error. |
| **TC-09** | Zero Load Edge Case | All quantities = 0 or empty list | $W_r=0$, Peak=0, Headroom=0. Valid state, no crash. | Running: **0W**<br>Peak: **0W**<br>Min Rated: **0W** | Prevents arithmetic crash on empty input state. |
| **TC-10** | Negative / Invalid Input Sanitization | Quantity = -2, Running Watts = -500 | Sanitizer clamps values: Qty $\ge 0$, Watts $\ge 0$. Flag non-silent validation warning. | Running: **0W**<br>Error array populated | Validates non-silent error handling. |
| **TC-11** | Heavy Whole-House Load | Central AC 3-Ton ($3500/10000$), Well Pump 1HP ($2000/4500$), Water Heater ($4500/4500$), Fridge ($200/1200$) | $W_r=10200W$. Max surge = 6500W (Central AC). Peak = $10200+6500=16700W$. Headroom = $10200\times 1.25=12750W$. | Running: **10,200W**<br>Peak: **16,700W**<br>Standby kVA: **15.9 kVA** | Validates large residential standby generator sizing. |
| **TC-12** | Custom User Appliance Row | Custom Appliance: "Air Fryer", Qty 1, $1,750W_r$, $1,750W_s$ | Dynamically appends to load list and computes totals. | Running: **1,750W**<br>Peak: **1,750W** | Validates custom item integration. |
| **TC-13** | Recommended Generator Range Logic | $W_{running} = 3,200W$, Peak = $4,700W$ | Lower bound = $\max(3200\times 1.20, 4700\times 0.8) \approx 3,840W$. Recommended retail band: 4,000W – 5,500W class. | Band: **4,000W – 5,500W** | Validates retail category bucket mapping. |
| **TC-14** | Kilowatt Conversion | Running = 4,500W, Peak = 6,250W | $kW = W / 1000$. Precision strictly 2 decimal places. | Running: **4.50 kW**<br>Peak: **6.25 kW** | Validates kW scaling precision. |
| **TC-15** | kVA Conversion (Standby PF = 0.8) | Continuous = 8,000W (8.0 kW) | $kVA = 8.0 / 0.80 = 10.0\text{ kVA}$. | Apparent Power: **10.0 kVA** | Validates standard generator power factor conversion. |
| **TC-16** | Extreme Surge Appliance vs High Continuous Load | Scenario A: 1 load ($200W_r / 4000W_s$); Scenario B: 1 load ($4000W_r / 4000W_s$) | Scenario A: Peak = 4,000W, Running = 200W. Sizing driven by surge. Scenario B: Peak = 4,000W, Running = 4,000W. Sizing driven by continuous headroom ($4000\times 1.25 = 5000W$). | Scenario A: **4,000W Surge Class**<br>Scenario B: **5,000W Rated Class** | Confirms capacity engine properly balances continuous vs surge constraints. |

---

## 13. Documentation & Verification Sign-Off

- **Lead Approval Status:** AWAITING LEAD REVIEW BEFORE IMPLEMENTATION.
- **Git Commit Planned:** `docs(spec): add generator size calculator specification`
- **Implementation Status:** STRICTLY UNIMPLEMENTED pending ChatGPT lead approval.
