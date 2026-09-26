# CalcMyPower — Calculator Specification: Generator Size Calculator

**Document:** `CALCULATOR_SPEC_GENERATOR_SIZE.md`  
**Tool Name:** Generator Size Calculator  
**Target Route / URL:** `/generator-size-calculator`  
**Status:** SPECIFICATION APPROVED WITH REVISIONS — READY FOR IMPLEMENTATION  
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
- **Transparent Mathematical Engine:** Distinctly calculates Total Running Watts, Largest Additional Starting Watts, Peak Starting Demand, and Planning Headroom using an explicit five-variable sizing model.
- **Practical Capacity Thresholds:** Outputs exact calculated engineering thresholds (Minimum calculated running capacity, Minimum calculated peak/startup capacity, and Planning capacity after headroom) rather than arbitrary marketing buckets.
- **Equipment Specification Comparison:** Explains exactly how to compare calculated figures to generator nameplate specifications: Rated (Running) Watts vs. Surge (Starting) Watts.
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
| **Taylor Power Systems** | Precise technical specifications for prime, continuous, and standby ratings with standard power factor ($PF=0.8$). | Industrial enterprise focus; no interactive consumer builder for emergency home loads or DIY usage. | Retains proper engineering rigor (continuous duty margins, kVA conversion) while delivering a mobile-first user experience. |

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
  ├── Minimum Calculated Running Capacity (Continuous Load)
  ├── Minimum Calculated Peak/Startup Capacity (Running + Largest Surge Delta)
  ├── Planning Capacity After Headroom (Running × 1.25)
  ├── Final Minimum Generator Capacity = MAX(Peak, Headroom)
  ├── Generator Spec Comparison Guide (Rated Watts vs. Surge Watts)
  ├── kW and kVA Conversions (with PF guidance)
  └── Transparent calculation methodology box
```

---

## 5. Complete Appliance Library & US Practical Defaults

All default wattages are derived from US Department of Energy benchmarks, manufacturer nameplates, and electrical safety standards. The calculator explicitly displays: *"Default wattages are typical estimates. Always check your equipment nameplate or owner's manual for exact ratings."*

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

### A. Core Mathematical Definitions & Five-Variable Sizing Engine
The sizing engine is defined explicitly using five core variables:

1. **Total Running Watts ($W_{running}$):**
   Sum of all selected appliance running watts:
   $$W_{running} = \sum_{i=1}^{n} (Q_i \times W_{r,i})$$

2. **Largest Additional Starting Watts ($\Delta W_{max}$):**
   The maximum additional surge demand among all active loads (defined as starting watts minus running watts):
   $$\Delta W_i = \max(0, W_{s,i} - W_{r,i})$$
   $$\Delta W_{max} = \max_{i=1}^{n} (\Delta W_i)$$

3. **Peak Starting Demand ($W_{peak}$):**
   Total Running Watts plus the Largest Additional Starting Watts:
   $$W_{peak} = W_{running} + \Delta W_{max}$$

4. **Planning Headroom ($W_{headroom}$):**
   Total Running Watts multiplied by the CalcMyPower planning headroom factor:
   $$W_{headroom} = W_{running} \times 1.25$$

5. **Final Minimum Generator Capacity ($W_{capacity\_min}$):**
   The greater of Peak Starting Demand and Planning Headroom:
   $$W_{capacity\_min} = \max(W_{peak}, W_{headroom})$$

> **Important Engineering Notice:** This is a practical planning model and not a substitute for manufacturer-specific generator sizing or professional engineering analysis.

---

### B. Startup / Surge Demand: The "Largest Single Motor Surge" Planning Model
A central flaw of simplistic generator calculators is the **Naive Summation Method**, which adds together the starting watts of every appliance: $\sum (Q_i \times W_{s,i})$.

> **Core Principle:** Adding every appliance's starting surge assumes all startup events occur simultaneously and can substantially overstate the required generator capacity.

- **Asynchronous Motor Cycling:** Electric motors draw starting surge (Locked Rotor Amps / inrush current) for only **0.5 to 3 seconds** while accelerating up to nominal operating RPM. Under ordinary residential, RV, or jobsite conditions, appliances operate on independent, asynchronous duty cycles governed by thermostats, pressure switches, or manual switches. A refrigerator compressor, sump pump, and HVAC furnace blower do not initiate startup at the identical fraction of a second during normal operation.
- **Staged Reconnection:** Even following a power outage, circuits are energized sequentially via manual circuit breakers or transfer switch interlocks, rather than all inductive motor loads starting at the exact same millisecond.
- **Engineering Standard:** The simplified planning model accounts for full continuous running load across all operating equipment plus the single largest additional startup surge ($\Delta W_{max} = W_{s} - W_{r}$) among active loads.

---

### C. Continuous Generator Operating Margin: CalcMyPower Planning Headroom Factor
Generators are internal combustion engines coupled to an alternator. Operating a generator at 100% of its continuous rated capacity causes:
- Accelerated engine wear and thermal stress
- Excessive fuel consumption
- Severe voltage and frequency instability when transient loads cycle on
- Risk of tripping the generator's main circuit breaker

- **CalcMyPower Planning Headroom Factor:** Sizing includes a **25% continuous headroom buffer** on running load:
  $$W_{headroom} = W_{running} \times 1.25$$
  This effectively targets continuous operation at approximately 80% of rated continuous generator capacity.
- **Methodology Transparency:** The 25% buffer is the **CalcMyPower planning headroom factor** and is **not** a universal National Electrical Code (NEC) requirement. While the NEC specifies an 80% continuous duty rating for branch circuits (loads operating for 3 hours or more per NEC 210.20), generator manufacturers and alternative sizing methodologies may use different operating margins (e.g., 10% to 30%, depending on fuel type, prime vs. standby ratings, and ambient temperature/altitude deratings).

---

### D. Capacity Output & Generator Specification Comparison
The calculator avoids arbitrarily shoehorning results into fixed, ungrounded retail product buckets. Instead, it provides three precise calculated electrical thresholds and guides the user on how to compare them against actual generator nameplates:

1. **Minimum Calculated Running Capacity ($W_{running}$):**
   The minimum continuous electrical power required to keep all selected equipment operating simultaneously.
2. **Minimum Calculated Peak / Startup Capacity ($W_{peak}$):**
   The momentary surge capacity required to start the largest motor load while all other selected equipment continues running.
3. **Planning Capacity After Headroom ($W_{headroom}$):**
   The recommended continuous capacity incorporating the 25% CalcMyPower planning headroom factor to avoid operating the generator at 100% continuous load.
4. **Final Minimum Generator Capacity ($W_{capacity\_min}$):**
   $$\max(W_{peak}, W_{headroom})$$

#### What Generator Nameplate Specifications to Compare:
When evaluating portable, inverter, or standby generators, users must compare their calculated results to two standard nameplate ratings:
- **Rated / Running Watts:** Compare to **Minimum Calculated Running Capacity** and **Planning Capacity After Headroom**. The generator's continuous rated wattage should meet or exceed these values to sustain the continuous load safely.
- **Surge / Starting (Peak) Watts:** Compare to **Minimum Calculated Peak / Startup Capacity**. The generator's surge or maximum starting wattage rating must meet or exceed this value to start motor loads without stalling the engine or tripping the alternator circuit breaker.

---

### E. kW and kVA Conversions & Power Factor
Generators and electrical loads are rated in Kilowatts ($kW$) for active power and Kilovolt-Amperes ($kVA$) for apparent power.

- **Active Power ($kW$):**
  $$kW = \frac{W}{1000}$$

- **Apparent Power ($kVA$) & Power Factor ($PF$):**
  $$kVA = \frac{kW}{PF}$$
  - **Power Factor Guidance:** A power factor of **$0.80$** may be used as an illustrative planning assumption for some generator applications (standard for larger commercial sets and many residential standby generators). However, actual generator and load power factor should be verified from the applicable equipment specifications. Small portable inverter generators typically operate near unity power factor ($PF \approx 1.0$), where $1\text{ kW} \approx 1\text{ kVA}$. The calculator transparently displays both kW and kVA metrics with the illustrative $PF=0.80$ condition noted.

---

## 7. Outputs & Result Hierarchy

The result presentation adheres to CalcMyPower's established visual hierarchy:

```
+-------------------------------------------------------------+
| [Badge] MINIMUM RECOMMENDED GENERATOR CAPACITY              |
|                                                             |
|                    6,813 Watts                              |
|             (Final Minimum Generator Capacity)              |
|                                                             |
| Subtext: Sized to sustain 5,450W continuous load with 25%    |
|          planning headroom while absorbing a 1,600W surge.  |
+-------------------------------------------------------------+
| Stat 1: Running Capacity         | Stat 2: Peak Startup     |
| 5,450 Watts (5.45 kW)            | 7,050 Watts (7.05 kW)    |
| Minimum continuous load          | Running + largest surge  |
+----------------------------------+--------------------------+
| Stat 3: Planning Headroom        | Stat 4: Apparent Power   |
| 6,813 Watts (125% running)       | 8.5 kVA (at 0.80 PF)     |
| CalcMyPower planning headroom    | Illustrative reference   |
+-------------------------------------------------------------+
| [Guide] HOW TO MATCH YOUR GENERATOR SPECIFICATIONS          |
| • Check Generator Rated Watts  ≥ 6,813 W (Continuous)       |
| • Check Generator Surge Watts  ≥ 7,050 W (Momentary Peak)   |
+-------------------------------------------------------------+
```

### Explanatory Methodology Breakdown (Always Visible to User):
Below the primary result card, a clear formula explanation card dynamically explains:
1. **Total Running Watts:** Sum of all active appliances ($W_{running}$).
2. **Surge Driver:** Identifies the specific selected appliance driving the peak startup event ($\Delta W_{max}$).
3. **Planning Headroom Rationale:** Explains that operating with 25% headroom preserves engine life, improves fuel economy, and prevents breaker trips.
4. **Nameplate Comparison Guide:** Explicitly outlines how to match rated watts and surge watts against generator spec sheets.

---

## 8. Electrical Safety, Code & Hazard Guidance

Generator operation poses severe real-world safety hazards. In compliance with `GEMINI.md` Section 10, the following safety guardrails are mandatory in the UI:

### A. Carbon Monoxide (CO) Poisoning & Generator Placement
- **Strict Warning:** Portable generators produce deadly, odorless, and colorless carbon monoxide (CO) gas.
- **20-Foot Outdoor Rule (CDC & CPSC Guidance):**
  - **NEVER** operate a generator indoors, inside a garage, in a basement, shed, or crawlspace, even if doors and windows are open.
  - Operate generators **outdoors only, at least 20 feet away** from all windows, doors, and fresh air intake vents, with the engine exhaust directed away from homes and occupied structures.
  - Sourced directly from current guidance from the **Centers for Disease Control and Prevention (CDC)** and the **U.S. Consumer Product Safety Commission (CPSC)**.
  - Install working, battery-powered or battery-backup CO alarms on every level of the home and outside sleeping areas.

### B. Backfeeding Hazards & Transfer Equipment Compliance
- **Strict Warning:** Connecting a generator directly to a standard wall outlet, clothes dryer receptacle, or electrical panel breaker using an unapproved "suicide cord" (male-to-male extension cord) is known as **backfeeding**. It is illegal, exceptionally dangerous, and creates severe life-safety hazards.
- **Hazards Explained:**
  - Backfed electrical power travels backward through the home service panel, through the utility meter, and into distribution transformers, stepping up from 120V/240V to thousands of Volts. This creates lethal electrocution hazards for utility line workers and emergency crews working to restore power.
  - When utility power is restored unexpectedly while backfeeding, two unsynchronized AC power sources collide, typically resulting in catastrophic generator failure, electrical explosion, and structure fires.
- **Transfer Equipment Standards:**
  - **Cautious Standard Language:** "Use properly installed transfer equipment or an approved interlock arrangement where applicable to prevent unintended interconnection with utility power. Follow applicable NEC and local code requirements and use qualified electrical professionals for installation."
  - Transfer equipment (manual transfer switches, automatic transfer switches, or panel interlock devices) ensures a "break-before-make" mechanical separation that isolates the home from the utility grid before generator power is applied.

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
1. **"Essential Outage":** Refrigerator, Sump Pump 1/3 HP, Wi-Fi Router, 4 LED Light rooms, Phone Charger.
2. **"Comfort Home Backup":** Essential Outage + Furnace Blower (Gas/Oil 1/2 HP), Microwave Oven, 65" TV, Laptop.
3. **"RV 30-Amp Summer":** RV Rooftop A/C (13.5k BTU), RV Converter / Charger, RV Refrigerator, Microwave.
4. **"Small Jobsite":** Portable Air Compressor (1.5 HP), Circular Saw (15A), Battery Tool Dual Charger.

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
   *Answer:* A modern refrigerator runs on approximately 150–200 Watts but requires about 1,200 Watts during compressor startup. A separate freezer requires 150–300 Watts running and 1,200–1,600 Watts starting. Under our practical planning model, a 2,500 to 3,500 Watt rated inverter generator provides ample capacity to run both units continuously while absorbing the single largest compressor startup surge.
2. **Can a 5,000-Watt generator run a whole house?**  
   *Answer:* A 5,000W generator can easily power essential household circuits (refrigerator, sump pump, gas furnace blower, lights, Wi-Fi, television, and microwave). However, it cannot run large 240V whole-house central air conditioning compressors (3 to 5 tons) or electric range/water heating loads simultaneously.
3. **What is the difference between starting watts and running watts?**  
   *Answer:* Running watts (rated watts) is the continuous power an appliance consumes while operating normally. Starting watts (surge watts) is the temporary extra power (up to 3 times running watts) needed for 1 to 3 seconds by motor-driven equipment (refrigerators, pumps, air conditioners) to start moving against mechanical inertia.
4. **How do I connect a generator to my house safely without backfeeding?**  
   *Answer:* Use properly installed transfer equipment or an approved interlock arrangement where applicable to prevent unintended interconnection with utility power. Follow applicable NEC and local code requirements and use qualified electrical professionals for installation. Never attempt to "backfeed" a generator through an ordinary wall outlet or dryer plug, which creates deadly electrocution hazards for utility lineworkers and can cause an electrical fire when utility power returns.
5. **What size generator is needed for a 30-amp RV?**  
   *Answer:* A 30-amp RV service operates at 120 Volts, representing a maximum electrical capacity of 3,600 Watts ($30\text{A} \times 120\text{V}$). Sizing a 3,500W to 4,500W starting generator allows you to start and run a 13,500 or 15,000 BTU rooftop air conditioner while running the internal RV converter charger and residential electronics.

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

## 12. Detailed Calculation Test Plan (Cases A through H)

The following test scenarios must be implemented in automated Vitest tests (`src/lib/calculators/__tests__/generator-size.test.ts`) during the implementation phase:

| Case | Scenario / Description | Inputs | Mathematical Computation | Expected Outputs | Verification Purpose |
|---|---|---|---|---|---|
| **Case A** | Running requirement > startup requirement | 3 Space Heaters ($3 \times 1,500W_r / 1,500W_s$) | $W_{running} = 4,500W$<br>$\Delta W_{max} = 0W$<br>$W_{peak} = 4,500W$<br>$W_{headroom} = 4,500 \times 1.25 = 5,625W$ | **Running:** 4,500 W<br>**Peak:** 4,500 W<br>**Headroom:** 5,625 W<br>**Final Capacity:** 5,625 W | Confirms planning headroom governs when continuous load exceeds peak surge demand. |
| **Case B** | Startup requirement > 25% headroom requirement | 1 HP Submersible Well Pump ($2,000W_r / 4,500W_s$) | $W_{running} = 2,000W$<br>$\Delta W_{max} = 4,500 - 2,000 = 2,500W$<br>$W_{peak} = 2,000 + 2,500 = 4,500W$<br>$W_{headroom} = 2,000 \times 1.25 = 2,500W$ | **Running:** 2,000 W<br>**Peak:** 4,500 W<br>**Headroom:** 2,500 W<br>**Final Capacity:** 4,500 W | Confirms startup surge dictates final capacity when peak starting demand exceeds 25% headroom. |
| **Case C** | 25% headroom > startup requirement | Microwave ($1,200W_r / 1,500W_s$) + Coffee Maker ($1,000W_r / 1,000W_s$) + Toaster ($850W_r / 850W_s$) | $W_{running} = 3,050W$<br>$\Delta W_{max} = 1,500 - 1,200 = 300W$<br>$W_{peak} = 3,050 + 300 = 3,350W$<br>$W_{headroom} = 3,050 \times 1.25 = 3,812.5W \approx 3,813W$ | **Running:** 3,050 W<br>**Peak:** 3,350 W<br>**Headroom:** 3,813 W<br>**Final Capacity:** 3,813 W | Confirms 25% headroom governs when high continuous load has small motor surge. |
| **Case D** | Multiple motor loads — largest additional startup surge only | Fridge ($180W_r / 1,200W_s$, $\Delta=1,020W$) + Furnace Blower ($800W_r / 2,300W_s$, $\Delta=1,500W$) + Sump Pump ($800W_r / 1,800W_s$, $\Delta=1,000W$) | $W_{running} = 1,780W$<br>$\Delta W_i \in \{1020, 1500, 1000\} \implies \Delta W_{max} = 1,500W$<br>$W_{peak} = 1,780 + 1,500 = 3,280W$<br>(Not naive $1,200+2,300+1,800=5,300W$)<br>$W_{headroom} = 1,780 \times 1.25 = 2,225W$ | **Running:** 1,780 W<br>**Peak:** 3,280 W<br>**Headroom:** 2,225 W<br>**Final Capacity:** 3,280 W | Validates that only the single largest surge delta is added under the simplified planning model. |
| **Case E** | No startup loads (pure resistive) | 10 LED Fixtures ($10 \times 10W_r = 100W$) + Space Heater ($1,500W_r / 1,500W_s$) + Wi-Fi ($25W_r / 25W_s$) | $W_{running} = 1,625W$<br>$\Delta W_{max} = 0W$<br>$W_{peak} = 1,625W$<br>$W_{headroom} = 1,625 \times 1.25 = 2,031.25W \approx 2,032W$ | **Running:** 1,625 W<br>**Peak:** 1,625 W<br>**Headroom:** 2,032 W<br>**Final Capacity:** 2,032 W | Validates behavior when all active loads have zero motor surge delta ($\Delta W = 0$). |
| **Case F** | All zero (empty load list or 0 qty) | Load list empty or all $Q_i = 0$ | $W_{running} = 0W$<br>$\Delta W_{max} = 0W$<br>$W_{peak} = 0W$<br>$W_{headroom} = 0W$ | **Running:** 0 W<br>**Peak:** 0 W<br>**Headroom:** 0 W<br>**Final Capacity:** 0 W | Confirms zero division avoidance, safe defaults, and clean handling of empty input state. |
| **Case G** | Custom appliance addition | Custom Load: "Portable Air Fryer", Qty 1, $1,750W_r$, $1,750W_s$ | $W_{running} = 1,750W$<br>$\Delta W_{max} = 0W$<br>$W_{peak} = 1,750W$<br>$W_{headroom} = 1,750 \times 1.25 = 2,187.5W \approx 2,188W$ | **Running:** 1,750 W<br>**Peak:** 1,750 W<br>**Headroom:** 2,188 W<br>**Final Capacity:** 2,188 W | Validates dynamic user-defined custom appliance integration into calculation pipeline. |
| **Case H** | Very large whole-house load | Central AC 3-Ton ($3,500W_r / 10,000W_s$, $\Delta=6,500W$) + Well Pump 1HP ($2,000W_r / 4,500W_s$, $\Delta=2,500W$) + Water Heater ($4,500W_r / 4,500W_s$) + Fridge ($200W_r / 1,200W_s$, $\Delta=1,000W$) | $W_{running} = 10,200W$<br>$\Delta W_{max} = 6,500W$ (Central AC)<br>$W_{peak} = 10,200 + 6,500 = 16,700W$<br>$W_{headroom} = 10,200 \times 1.25 = 12,750W$ | **Running:** 10,200 W (10.2 kW)<br>**Peak:** 16,700 W (16.7 kW)<br>**Headroom:** 12,750 W (12.75 kW)<br>**Final Capacity:** 16,700 W<br>**Apparent Power (PF=0.8):** 15.94 kVA running / 20.88 kVA peak | Validates heavy residential whole-house standby generator capacity without precision loss. |
| **Case I** | Input Sanitization & Error Handling | Negative quantity (-2) or negative running watts (-500) | Clamped to $\ge 0$ with non-silent user validation error array populated | **Running:** 0 W<br>**Errors:** `["Quantity must be >= 0", "Watts must be >= 0"]` | Confirms non-silent sanitization per Decision 007 and GEMINI.md Section 5. |
| **Case J** | Power Factor & kVA Precision | $W_{running} = 8,000W$ ($8.0kW$), $PF = 0.80$ | $kW = 8000 / 1000 = 8.0 kW$<br>$kVA = 8.0 / 0.80 = 10.0 kVA$ | **kW:** 8.00 kW<br>**kVA:** 10.00 kVA | Confirms exact scaling and formatting of apparent power metrics. |

---

## 13. Authoritative Sources & Technical References

In compliance with `GEMINI.md` Section 9, all technical claims, safety rules, and formulas are grounded in authoritative primary sources:

1. **CDC (Centers for Disease Control and Prevention):**  
   *Carbon Monoxide Poisoning Prevention: Guidelines for Portable Generator Safety.* (Mandating outdoor operation at least 20 feet from all open doors, windows, and vents).
2. **CPSC (U.S. Consumer Product Safety Commission):**  
   *Safety Alert: Portable Generator Hazards and Carbon Monoxide Prevention.* Document #5123.
3. **U.S. Department of Energy (DOE) & Energy Star:**  
   *Estimating Appliance and Home Electronic Energy Use.* Energy.gov appliance wattage database and typical inrush multipliers for household motor equipment.
4. **NFPA 70 / National Electrical Code (NEC):**  
   - *Article 702 (Optional Standby Systems):* Safety interlocks and transfer equipment to isolate standby power from utility distribution lines.  
   - *Article 210.20:* Continuous duty ratings (125% factor / 80% continuous branch circuit load rule).
5. **IEEE Standard 446 (The Emerald Book):**  
   *Recommended Practice for Emergency and Standby Power Systems for Industrial and Commercial Applications.* Principles of motor inrush starting demand, asynchronous load diversity, and alternator voltage dip management.
6. **OSHA (Occupational Safety and Health Administration):**  
   *Fact Sheet: Grounding and Operating Portable Generators Safely on Jobsites.*

---

## 14. Documentation & Verification Sign-Off

- **Lead Approval Status:** APPROVED WITH REVISIONS — PENDING IMPLEMENTATION AUTHORIZATION.
- **Git Commit Planned:** `docs(spec): revise generator size calculator specification per lead review`
- **Implementation Status:** STRICTLY UNIMPLEMENTED pending ChatGPT lead command.
