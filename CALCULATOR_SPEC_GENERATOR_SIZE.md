# CalcMyPower — Calculator Specification: Generator Size Calculator

**Document:** `CALCULATOR_SPEC_GENERATOR_SIZE.md`  
**Tool Name:** Generator Size Calculator  
**Target Route / URL:** `/generator-size-calculator`  
**Status:** SPECIFICATION APPROVED WITH FINAL LEAD CORRECTIONS — AWAITING IMPLEMENTATION AUTHORIZATION  
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
2. **RV / Camping Travel:** Determining if an inverter generator can start and run an RV rooftop air conditioner (13,500 BTU or 15,000 BTU) alongside converter/charger loads.
3. **Trades / DIY / Jobsite:** Sizing for air compressors, table saws, circular saws, and battery tool chargers.

---

## 2. Product Positioning & Value Proposition

Most existing generator calculators on the web suffer from one of two extremes:
- **Biased Manufacturer Funnels:** Tools from generator manufacturers frequently push homeowners toward expensive 22kW–26kW whole-house standby systems, obscuring raw math and requiring email/zip code lead-capture forms.
- **Crude Addition Scripts:** Basic affiliate websites use naive scripts that simply sum running watts, completely ignoring motor startup surges (Locked Rotor Amps), or alternatively, add *every* appliance's starting surge together simultaneously, producing wildly inflated, unrealistic recommendations.

### CalcMyPower Positioning:
- **Unbiased & Independent:** Not affiliated with any generator brand.
- **Four-Step Documented Planning Engine:** Distinctly calculates Total Running Watts, Largest Additional Starting Watts, Peak Starting Demand, and CalcMyPower Planning Capacity ($W_{\text{peak}} \times 1.25$).
- **Practical Engineering Thresholds:** Outputs exact calculated electrical thresholds (Total Running Watts, Peak Starting Demand, and CalcMyPower Planning Capacity) rather than arbitrary marketing buckets.
- **Equipment Specification Matching Guide:** Explains exactly how to compare calculated figures to generator nameplate specifications: Rated (Running) Watts vs. Surge (Starting) Watts.
- **Educational Generator Technology Comparison:** Compares portable inverter, conventional open-frame, dual-fuel, and standby systems based on technical characteristics (clean power THD, noise, fuel flexibility, automatic transfer) rather than arbitrary wattage cutoffs.
- **Zero Friction:** 100% client-side, instant calculation, pre-loaded with an editable "Essential Outage" scenario, and fully responsive across mobile, tablet, and desktop.

---

## 3. Competitor Differentiation Analysis

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
[ Step 2: One-Click Quick Presets (Preloads "Essential Outage" by Default) ]
  ├── Essential Outage (Default: Editable scenario with Refrigerator, Sump, Router, Lights, Phone)
  ├── Full Comfort Outage (Essential + Furnace Blower + Microwave + TV)
  ├── RV 30A Summer (13.5k A/C + Converter + Fridge + Microwave)
  ├── Jobsite Framing (Air Compressor + Circular Saw + Battery Chargers)
  └── [ Clear All ] Button (Resets load list to 0W for scratch-built load lists)
            │
            ▼
[ Step 3: Interactive Appliance Selection & Custom Loads ]
  ├── Category-first organized appliance library (HVAC, Kitchen, Water & Pumps, Electronics, RV, Tools, Other)
  ├── Prioritized common/high-impact appliances at the top of each category
  ├── Quantity steppers ( + / - ) and removal buttons
  ├── Default wattage indicators clearly labeled as "typical estimates" with in-table editing
  └── Add custom appliance row (requires Running Watts; explicit Starting Watts or "No Motor Surge / Unknown")
            │
            ▼
[ Step 4: Real-Time Sizing Outputs & Educational Breakdown ]
  ├── Primary Badge: CalcMyPower Planning Capacity (Peak Starting Demand × 1.25)
  ├── Stat 1: Total Running Watts (Continuous Load)
  ├── Stat 2: Peak Starting Demand (Running + Largest Additional Surge)
  ├── Stat 3: Apparent Power (kVA based on Planning Capacity, with Running & Peak kVA breakdowns)
  ├── Generator Spec Comparison Guide (Rated Watts vs. Surge Watts)
  ├── Educational Comparison: Generator Technologies (Inverter, Conventional, Dual-Fuel, Standby)
  └── Transparent calculation methodology card
```

---

## 5. Complete Appliance Library & Category-First Organization

Appliances are organized strictly by preferred category hierarchy. Within each category, high-impact and common appliances are prioritized at the top.

All default wattages are derived from US Department of Energy benchmarks, manufacturer nameplates, and electrical safety standards. The calculator explicitly displays: *"Default wattages are typical estimates. Always check your equipment nameplate or owner's manual for exact ratings."* Users may edit the default values directly.

### A. Heating, Ventilation & Air Conditioning (HVAC)
| Appliance | Default Running Watts ($W_r$) | Default Starting Watts ($W_s$) | Surge Delta ($\Delta W$) | Has Motor Surge? | Typical Nameplate Notes |
|---|---|---|---|---|---|
| Central Air Conditioner (4-Ton / 48,000 BTU) | 4,500 W | 13,500 W | 9,000 W | Yes | Severe LRA; requires large standby or soft-starter |
| Central Air Conditioner (3-Ton / 36,000 BTU) | 3,500 W | 10,000 W | 6,500 W | Yes | High compressor inrush |
| Window Air Conditioner (12,000 BTU) | 1,200 W | 2,800 W | 1,600 W | Yes | High surge on hot compressor restart |
| Window Air Conditioner (8,000 BTU) | 800 W | 1,800 W | 1,000 W | Yes | Bedroom cooling; standard 120V outlet |
| Furnace Fan Blower (Gas/Oil Heat, 1/2 HP) | 800 W | 2,300 W | 1,500 W | Yes | PSC or ECM blower motor startup |
| Portable Electric Space Heater | 1,500 W | 1,500 W | 0 W | No | Pure resistive; continuous 12.5A draw @ 120V |

### B. Kitchen & Refrigeration
| Appliance | Default Running Watts ($W_r$) | Default Starting Watts ($W_s$) | Surge Delta ($\Delta W$) | Has Motor Surge? | Typical Nameplate Notes |
|---|---|---|---|---|---|
| Electric Range / Oven (Single Burner) | 1,500 W | 1,500 W | 0 W | No | Resistive element; massive continuous load |
| Dishwasher | 1,500 W | 2,000 W | 500 W | Yes | Wash pump motor + internal drying heater |
| Microwave Oven (1,000W Cooking Power) | 1,200 W | 1,500 W | 300 W | Slight | Magnetron transformer inrush |
| Electric Coffee Maker (Drip) | 1,000 W | 1,000 W | 0 W | No | Pure resistive heating element |
| Toaster (2-Slice) | 850 W | 850 W | 0 W | No | Pure resistive |
| Older Refrigerator / Deep Freezer | 400 W | 1,600 W | 1,200 W | Yes | Older reciprocating compressors have high LRA |
| Refrigerator / Freezer (Modern Energy Star) | 180 W | 1,200 W | 1,020 W | Yes | Compressor inrush lasts 1–3 seconds |

### C. Water, Plumbing & Well Pumps
| Appliance | Default Running Watts ($W_r$) | Default Starting Watts ($W_s$) | Surge Delta ($\Delta W$) | Has Motor Surge? | Typical Nameplate Notes |
|---|---|---|---|---|---|
| Electric Water Heater (40–50 Gallon) | 4,500 W | 4,500 W | 0 W | No | Pure resistive 240V; large continuous demand |
| Submersible Well Pump (1 HP, 240V) | 2,000 W | 4,500 W | 2,500 W | Yes | High starting torque against head pressure |
| Submersible Well Pump (1/2 HP, 240V) | 1,000 W | 2,500 W | 1,500 W | Yes | Deep well motor starting against head pressure |
| Sump Pump (1/2 HP) | 1,050 W | 2,200 W | 1,150 W | Yes | Common high-capacity residential pump |
| Sump Pump (1/3 HP) | 800 W | 1,800 W | 1,000 W | Yes | Critical basement flood prevention |

### D. Lighting, Electronics & Home Essentials
| Appliance | Default Running Watts ($W_r$) | Default Starting Watts ($W_s$) | Surge Delta ($\Delta W$) | Has Motor Surge? | Typical Nameplate Notes |
|---|---|---|---|---|---|
| Garage Door Opener (1/2 HP) | 550 W | 1,400 W | 850 W | Yes | Heavy initial torque lifting door |
| Desktop Gaming PC & Monitor | 450 W | 450 W | 0 W | No | High-end power supply load |
| 55"–65" LED Television | 120 W | 120 W | 0 W | No | Low continuous power |
| Laptop / Workstation Computer | 100 W | 100 W | 0 W | No | Switch-mode power supply |
| Medical CPAP Machine | 60 W | 60 W | 0 W | No | Life-support; requires clean THD (<3%) |
| LED Home Lighting (Per Room, 4 Bulbs) | 40 W | 40 W | 0 W | No | Negligible inrush; pure active power |
| Wi-Fi Router & Modem | 25 W | 25 W | 0 W | No | Constant low-voltage DC power supply |

### E. RV & Camping Power
| Appliance | Default Running Watts ($W_r$) | Default Starting Watts ($W_s$) | Surge Delta ($\Delta W$) | Has Motor Surge? | Typical Nameplate Notes |
|---|---|---|---|---|---|
| RV Rooftop A/C (15,000 BTU) | 1,800 W | 3,500 W | 1,700 W | Yes | Standard 30A RV demand |
| RV Rooftop A/C (13,500 BTU) | 1,500 W | 3,200 W | 1,700 W | Yes | Often requires soft-starter on small inverters |
| RV Converter / Battery Charger (45A DC) | 600 W | 600 W | 0 W | No | Internal battery charging load |
| RV Absorption Refrigerator (Electric Mode) | 350 W | 350 W | 0 W | No | Electric heating element mode |

### F. Jobsite & Workshop Tools
| Appliance | Default Running Watts ($W_r$) | Default Starting Watts ($W_s$) | Surge Delta ($\Delta W$) | Has Motor Surge? | Typical Nameplate Notes |
|---|---|---|---|---|---|
| Table Saw (10", 15 Amp) | 1,800 W | 4,000 W | 2,200 W | Yes | High blade inertia startup |
| Circular Saw (7-1/4", 15 Amp) | 1,800 W | 2,800 W | 1,000 W | Yes | Universal motor startup |
| Air Compressor (1.5 HP Portable) | 1,500 W | 3,500 W | 2,000 W | Yes | Starts against tank head pressure |
| Cordless Power Tool Dual Charger | 150 W | 150 W | 0 W | No | Electronic battery charging |

### G. Custom Appliance Row Rules
The custom appliance form allows users to enter unlisted equipment under the following strict rules:
- **Running Watts:** Mandatory numerical input ($\ge 0$).
- **Starting Watts:** Explicit numerical input ($\ge \text{Running Watts}$), **OR** a checkbox labeled *"No Motor Surge / Unknown"* (which sets Starting Watts = Running Watts).
- **Prohibition:** The calculator will **never** automatically multiply running watts by an arbitrary 2x or 3x multiplier when starting watts are unknown.

---

## 6. Calculation Engine & Engineering Methodology

### A. The Four-Step Documented Planning Methodology
The sizing engine is defined explicitly using the four documented steps:

#### Step 1: Total Running Watts
Sum of all selected appliance running watts:
$$W_{\text{running}} = \sum_{i=1}^{n} (Q_i \times W_{r,i})$$

#### Step 2: Largest Additional Starting Watts
The maximum additional starting surge demand among all active loads:
$$\Delta W_i = \max(0, W_{s,i} - W_{r,i})$$
$$\Delta W_{\max} = \max_{i=1}^{n} (\Delta W_i)$$

#### Step 3: Peak Starting Demand
Total Running Watts plus the Largest Additional Starting Watts:
$$W_{\text{peak}} = W_{\text{running}} + \Delta W_{\max}$$

#### Step 4: CalcMyPower Planning Capacity
Peak Starting Demand multiplied by the CalcMyPower planning headroom factor:
$$W_{\text{planning}} = W_{\text{peak}} \times 1.25$$

> **Labeling & Methodology Rule:** The 25% value is explicitly labeled as the **"CalcMyPower planning headroom factor"**.  
> It is **not** a universal National Electrical Code (NEC) requirement. This planning margin is based on established generator-sizing guidance (such as Cummins Power Generation and Generac sizing methodologies) to ensure the generator operates comfortably within its continuous power band and can absorb transient loads, engine wear, and altitude/temperature derating without stalling or tripping. Sizing guidance may differ by manufacturer, application, generator type, and engineering methodology.

---

### B. Startup / Surge Demand: Defense of the "Largest Single Motor Surge" Planning Model
A central flaw of simplistic generator calculators is the **Naive Summation Method**, which adds together the starting watts of every appliance: $\sum (Q_i \times W_{s,i})$.

> **Core Principle:** Adding every appliance's starting surge assumes all startup events occur simultaneously and can substantially overstate the required generator capacity.

- **Asynchronous Motor Cycling:** Electric motors draw starting surge (Locked Rotor Amps / inrush current) for only **0.5 to 3 seconds** while accelerating to operating speed. Under ordinary residential, RV, or jobsite conditions, appliances operate on independent, asynchronous duty cycles governed by thermostats, pressure switches, or manual switches. A refrigerator compressor, sump pump, and HVAC furnace blower do not initiate startup at the identical fraction of a second during normal operation.
- **Staged Reconnection:** Even following a power outage, circuits are energized sequentially via manual circuit breakers or transfer switch interlocks, rather than all inductive motor loads starting at the exact same millisecond.
- **Engineering Standard:** The simplified planning model accounts for full continuous running load across all operating equipment plus the single largest additional startup surge ($\Delta W_{\max} = W_{s} - W_{r}$) among active loads.

---

### C. Continuous Generator Operating Margin: Planning Headroom Rationale
Operating an internal combustion generator continuously at 100% of its rated capacity causes:
- Accelerated engine wear and thermal stress
- Excessive fuel consumption
- Severe voltage and frequency instability when transient loads cycle on
- Risk of tripping the generator's main circuit breaker

Applying the 25% CalcMyPower planning headroom factor ($W_{\text{planning}} = W_{\text{peak}} \times 1.25$) ensures that even when the single largest motor begins its startup inrush, the generator has sufficient continuous reserve to absorb the transient without dropping voltage or stalling the engine.

---

### D. Capacity Output & Generator Specification Comparison
The calculator avoids arbitrarily shoehorning results into fixed, ungrounded retail product buckets. Instead, it provides three precise calculated electrical thresholds and guides the user on how to compare them against actual generator nameplates:

1. **Total Running Watts ($W_{\text{running}}$):**
   The continuous electrical power required to keep all selected equipment operating simultaneously.
2. **Peak Starting Demand ($W_{\text{peak}}$):**
   The momentary surge capacity required to start the largest motor load while all other selected equipment continues running.
3. **CalcMyPower Planning Capacity ($W_{\text{planning}}$):**
   $$W_{\text{planning}} = W_{\text{peak}} \times 1.25$$
   The recommended generator capacity incorporating the 25% planning headroom factor.

#### What Generator Nameplate Specifications to Compare:
When evaluating portable, inverter, or standby generators, users must compare their calculated results to two standard nameplate ratings:
- **Rated / Running Watts:** Compare to **Total Running Watts** and **CalcMyPower Planning Capacity**. Sizing a generator whose continuous rated running watts meets or exceeds the Planning Capacity ensures that the unit will operate safely within its recommended continuous duty zone without thermal overload.
- **Surge / Starting (Peak) Watts:** Compare to **Peak Starting Demand**. The generator's momentary starting or surge rating must meet or exceed this value to start motor loads without stalling the engine or tripping the alternator circuit breaker.

---

### E. The kVA Apparent Power Model & Power Factor Guidance

Generators and electrical loads are rated in Kilowatts ($kW$) for active power and Kilovolt-Amperes ($kVA$) for apparent power:

$$\text{kVA} = \frac{\text{kW}}{\text{PF}}$$

#### Defining the Displayed kVA Levels:
To eliminate ambiguity, the calculator explicitly distinguishes between three distinct kVA metrics:
1. **Planning Capacity kVA ($kVA_{\text{planning}}$):**
   $$kVA_{\text{planning}} = \frac{W_{\text{planning}} / 1000}{\text{PF}}$$
   *Primary kVA Output:* This is the most useful presentation for generator comparison because whole-house standby and light commercial generators are sold and rated by their continuous/standby kVA capacity. Displaying Planning Capacity kVA ensures a buyer matching a kVA nameplate does not inadvertently buy a unit that lacks startup headroom.
2. **Running Load kVA ($kVA_{\text{running}}$):**
   $$kVA_{\text{running}} = \frac{W_{\text{running}} / 1000}{\text{PF}}$$
   *Secondary Metric:* Represents the continuous steady-state apparent power demand.
3. **Peak Demand kVA ($kVA_{\text{peak}}$):**
   $$kVA_{\text{peak}} = \frac{W_{\text{peak}} / 1000}{\text{PF}}$$
   *Secondary Metric:* Represents the un-buffered momentary apparent power spike during motor startup.

#### Power Factor ($PF$) Assumptions:
- A power factor of **$0.80$ lagging** is used as an **illustrative planning assumption** (standard for standby and commercial generator ratings).
- Small portable inverter generators typically operate near unity power factor ($\text{PF} \approx 1.0$), where $1\text{ kW} \approx 1\text{ kVA}$.
- The calculator displays the primary Planning Capacity kVA with an explicit note: *"Illustrative reference assuming standard 0.80 power factor. Verify equipment specifications for actual power factor."*

---

## 7. Outputs & Result Hierarchy

The result presentation adheres to CalcMyPower's established visual hierarchy:

```
+-------------------------------------------------------------+
| [Badge] RECOMMENDED GENERATOR PLANNING CAPACITY             |
|                                                             |
|                    4,100 Watts                              |
|             (CalcMyPower Planning Capacity)                 |
|                                                             |
| Subtext: Sized for 1,780W running load + 1,500W motor surge  |
|          with 25% CalcMyPower planning headroom.            |
+-------------------------------------------------------------+
| Stat 1: Total Running Watts      | Stat 2: Peak Starting    |
| 1,780 Watts (1.78 kW)            | 3,280 Watts (3.28 kW)    |
| Continuous operating demand      | Running + largest surge  |
+----------------------------------+--------------------------+
| Stat 3: Planning kVA (PF = 0.80) | Stat 4: Surge Driver     |
| 5.13 kVA (Planning Capacity)     | Furnace Blower           |
| (Running: 2.23 kVA | Peak: 4.10) | +1,500 W startup surge   |
+-------------------------------------------------------------+
| [Guide] HOW TO MATCH YOUR GENERATOR SPECIFICATIONS          |
| • Check Generator Rated Watts  ≥ 4,100 W (Continuous)       |
| • Check Generator Surge Watts  ≥ 3,280 W (Momentary Peak)   |
+-------------------------------------------------------------+
```

### Explanatory Methodology Breakdown (Always Visible to User):
Below the primary result card, a clear formula explanation card dynamically explains:
1. **Total Running Watts:** Sum of all active appliances ($W_{\text{running}}$).
2. **Surge Driver:** Identifies the specific selected appliance driving the peak startup event ($\Delta W_{\max}$).
3. **Planning Headroom Rationale:** Explains that operating with a 25% planning headroom factor on peak demand protects the engine, preserves fuel economy, and prevents nuisance breaker trips.
4. **Nameplate Comparison Guide:** Explicitly outlines how to match rated watts and surge watts against generator spec sheets.

---

## 8. Electrical Safety, Code & Generator Technologies

### A. Carbon Monoxide (CO) Poisoning & Placement Safety
- **Strict Warning:** Portable generators produce deadly, odorless, and colorless carbon monoxide (CO) gas.
- **20-Foot Outdoor Rule (CDC & CPSC Guidance):**
  - **NEVER** operate a generator indoors, inside a garage, in a basement, shed, or crawlspace, even if doors and windows are open.
  - Operate generators **outdoors only, at least 20 feet away** from all windows, doors, and fresh air intake vents, with the engine exhaust directed away from homes and occupied structures.
  - Sourced directly from current guidance from the **Centers for Disease Control and Prevention (CDC)** and the **U.S. Consumer Product Safety Commission (CPSC)** (*Safety Alert #5123*).
  - Install working, battery-powered or battery-backup CO alarms on every level of the home and outside sleeping areas.

### B. Backfeeding Hazards & Transfer Equipment Compliance
- **Strict Warning:** Connecting a generator directly to a standard wall outlet, clothes dryer receptacle, or electrical panel breaker using an unapproved "suicide cord" (male-to-male extension cord) is known as **backfeeding**. It is illegal, exceptionally dangerous, and creates severe life-safety hazards.
- **Hazards Explained:**
  - Backfed electrical power travels backward through the home service panel, through the utility meter, and into distribution transformers, stepping up from 120V/240V to thousands of Volts. This creates lethal electrocution hazards for utility line workers and emergency crews working to restore power.
  - When utility power is restored unexpectedly while backfeeding, two unsynchronized AC power sources collide, typically resulting in catastrophic generator failure, electrical explosion, and structure fires.
- **Transfer Equipment Standards:**
  - **Cautious Standard Language:** *"Use properly installed transfer equipment or an approved interlock arrangement where applicable to prevent unintended interconnection with utility power. Follow applicable NEC and local code requirements and use qualified electrical professionals for installation."*
  - Transfer equipment ensures a "break-before-make" mechanical separation that isolates the home from the utility grid before generator power is applied.

### C. Educational Comparison: Generator Technologies
Rather than using arbitrary wattage thresholds (e.g. "<4500W = inverter"), the calculator provides an objective, attribute-based comparison of the four primary generator technologies:

| Technology | Clean Power (THD) | Typical Noise Level | Portability & Weight | Fuel Flexibility | Best Use Case |
|---|---|---|---|---|---|
| **Portable Inverter** | Clean sine wave ($THD < 3\%$) | Quiet ($50\text{–}65\text{ dBA}$) | Highly portable ($40\text{–}120\text{ lbs}$) | Gasoline; many dual-fuel | Sensitive electronics, laptops, CPAP, RV camping, tailgating, essential home backup. |
| **Conventional Open-Frame Portable** | Higher distortion ($THD \approx 10\%\text{–}25\%$) | Loud ($68\text{–}80+\text{ dBA}$) | Heavy portable on wheels ($100\text{–}250\text{ lbs}$) | Primarily gasoline; some dual-fuel | Jobsite power tools, compressors, resistive heating, emergency sump pumps where low THD is not critical. |
| **Dual-Fuel / Tri-Fuel Portable** | Varies by alternator type (inverter vs open-frame) | Depends on engine RPM | Moderate to heavy | Gasoline + Propane (LPG) + Natural Gas | Emergency storm preparation; propane stores indefinitely without gumming carburetors. |
| **Home Standby (Stationary)** | Clean utility-grade power ($THD < 5\%$) | Quiet baffled enclosure ($60\text{–}70\text{ dBA}$) | Permanent outdoor pad installation | Natural Gas or Propane (piped) | Whole-house automatic backup; activates via Automatic Transfer Switch (ATS) within 10–20 seconds of outage. |

---

## 9. UX & Interface Specification

### A. Layout Structure
- Follows the locked `CalculatorShell` structure:
  - **Left / Main Column:** Application selector tabs, Quick Preset buttons, Searchable appliance picker, Selected load list table, and Custom appliance row.
  - **Right / Sidebar Column (Sticky on Desktop):** Primary result card with CalcMyPower Planning Capacity, secondary stats, and contextual Amazon hardware references.
- **Mobile First:** On viewports $< 768\text{px}$, the result card stacks cleanly, and preset buttons wrap without horizontal overflow.

### B. Pre-Loaded Default Preset & Reset Controls
- **Default Load:** The calculator pre-loads the **"Essential Outage"** scenario by default so users immediately see a populated, realistic calculation.
- **Editable Notice:** Display a clear badge: *"Example Scenario: Essential Outage (Preloaded — modify quantities below or clear all)."*
- **"Clear All" Button:** A prominent button next to the presets allows the user to clear all selected loads and start with a clean slate ($0\text{ W}$).

### C. Quick Presets
1. **"Essential Outage" (Default):** Refrigerator, Sump Pump 1/3 HP, Wi-Fi Router, 4 LED Light rooms, Phone Charger.
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
  4. `The Four-Step Generator Sizing Formula & Methodology`
  5. `Step-by-Step Worked Generator Sizing Example`
  6. `Typical Wattage Estimates for Common Household Appliances`
  7. `Comparing Generator Technologies: Inverter vs. Open-Frame vs. Standby`
  8. `Critical Generator Safety: Carbon Monoxide & Transfer Equipment`
  9. `Frequently Asked Questions (FAQ)`
  10. `Related Power & Electrical Calculators`

### Target FAQ Candidates
1. **What size generator do I need to run a refrigerator and a freezer?**  
   *Answer:* A modern refrigerator runs on approximately 180 Watts but requires 1,200 Watts during compressor startup. A separate freezer requires about 180 to 400 Watts running and 1,200 to 1,600 Watts starting. Total running load is about 360 to 580 Watts, with the largest single startup surge contributing 1,200 Watts above running draw, yielding a peak demand of roughly 1,560 Watts. Under the CalcMyPower planning model with a 25% headroom factor, a 2,000 to 2,500 Watt inverter generator provides reliable operation.
2. **Can a 5,000-Watt generator run a whole house?**  
   *Answer:* A 5,000W generator can easily power essential household circuits (refrigerator, sump pump, gas furnace blower, lights, Wi-Fi, television, and microwave) with planning capacity to spare. However, it cannot run large 240V central air conditioning compressors (3 to 5 tons) or electric water heaters simultaneously, which require large standby generators (14kW to 22kW).
3. **What is the difference between starting watts and running watts?**  
   *Answer:* Running watts (rated watts) is the continuous power an appliance consumes while operating normally. Starting watts (surge watts) is the temporary extra power (up to 3 times running watts) needed for 1 to 3 seconds by motor-driven equipment (refrigerators, pumps, air conditioners) to overcome mechanical inertia during startup.
4. **How do I connect a generator to my house safely without backfeeding?**  
   *Answer:* Use properly installed transfer equipment or an approved interlock arrangement where applicable to prevent unintended interconnection with utility power. Follow applicable NEC and local code requirements and use qualified electrical professionals for installation. Never attempt to "backfeed" a generator through an ordinary wall outlet or dryer plug, which creates deadly electrocution hazards for utility lineworkers and can cause an electrical fire when utility power returns.
5. **What size generator is needed for a 30-amp RV?**  
   *Answer:* A 30-amp RV service operates at 120 Volts, representing a maximum capacity of 3,600 Watts ($30\text{A} \times 120\text{V}$). Sizing a generator with 3,500W to 4,500W starting surge and at least 3,000W continuous capacity allows you to start and run a 13,500 or 15,000 BTU rooftop air conditioner while running the internal RV converter charger and residential electronics.

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

The following test scenarios must be implemented in automated Vitest tests (`src/lib/calculators/__tests__/generator-size.test.ts`) during the implementation phase, reflecting the revised formula:
$$W_{\text{planning}} = W_{\text{peak}} \times 1.25 = (W_{\text{running}} + \Delta W_{\max}) \times 1.25$$

| Case | Scenario / Description | Inputs | Mathematical Computation | Expected Outputs | Verification Purpose |
|---|---|---|---|---|---|
| **Case A** | High running requirement, zero startup surge | 3 Space Heaters ($3 \times 1,500W_r / 1,500W_s$) | $W_{\text{running}} = 4,500W$<br>$\Delta W_{\max} = 0W$<br>$W_{\text{peak}} = 4,500W$<br>$W_{\text{planning}} = 4,500 \times 1.25 = 5,625W$ | **Running:** 4,500 W<br>**Peak:** 4,500 W<br>**Planning Capacity:** 5,625 W<br>**Planning kVA (PF=0.8):** 7.031 kVA | Validates planning capacity calculation with pure resistive loads. |
| **Case B** | High startup requirement relative to running | 1 HP Submersible Well Pump ($2,000W_r / 4,500W_s$) | $W_{\text{running}} = 2,000W$<br>$\Delta W_{\max} = 4,500 - 2,000 = 2,500W$<br>$W_{\text{peak}} = 2,000 + 2,500 = 4,500W$<br>$W_{\text{planning}} = 4,500 \times 1.25 = 5,625W$ | **Running:** 2,000 W<br>**Peak:** 4,500 W<br>**Planning Capacity:** 5,625 W<br>**Planning kVA (PF=0.8):** 7.031 kVA | Validates planning capacity when motor startup surge drives peak demand. |
| **Case C** | High continuous running with modest motor surge | Microwave ($1,200W_r / 1,500W_s$) + Coffee ($1,000W_r / 1,000W_s$) + Toaster ($850W_r / 850W_s$) | $W_{\text{running}} = 3,050W$<br>$\Delta W_{\max} = 1,500 - 1,200 = 300W$<br>$W_{\text{peak}} = 3,050 + 300 = 3,350W$<br>$W_{\text{planning}} = 3,350 \times 1.25 = 4,187.5W$ | **Running:** 3,050 W<br>**Peak:** 3,350 W<br>**Planning Capacity:** 4,187.5 W<br>**Planning kVA (PF=0.8):** 5.234 kVA | Confirms exact decimal handling ($4,187.5W$) under mixed resistive/small surge loads. |
| **Case D** | Multiple motor loads — largest additional surge only | Fridge ($180W_r / 1,200W_s$, $\Delta=1,020W$) + Furnace Blower ($800W_r / 2,300W_s$, $\Delta=1,500W$) + Sump Pump ($800W_r / 1,800W_s$, $\Delta=1,000W$) | $W_{\text{running}} = 1,780W$<br>$\Delta W_i \in \{1020, 1500, 1000\} \implies \Delta W_{\max} = 1,500W$<br>$W_{\text{peak}} = 1,780 + 1,500 = 3,280W$<br>(Not naive $5,300W$)<br>$W_{\text{planning}} = 3,280 \times 1.25 = 4,100W$ | **Running:** 1,780 W<br>**Peak:** 3,280 W<br>**Planning Capacity:** 4,100 W<br>**Planning kVA (PF=0.8):** 5.125 kVA | Validates that only the single largest surge delta is added, preventing naive summation. |
| **Case E** | No startup loads (all resistive) | 10 LED Fixtures ($10 \times 10W_r = 100W$) + Space Heater ($1,500W_r / 1,500W_s$) + Wi-Fi ($25W_r / 25W_s$) | $W_{\text{running}} = 1,625W$<br>$\Delta W_{\max} = 0W$<br>$W_{\text{peak}} = 1,625W$<br>$W_{\text{planning}} = 1,625 \times 1.25 = 2,031.25W$ | **Running:** 1,625 W<br>**Peak:** 1,625 W<br>**Planning Capacity:** 2,031.25 W<br>**Planning kVA (PF=0.8):** 2.539 kVA | Validates behavior when all active loads have zero motor surge delta ($\Delta W = 0$). |
| **Case F** | All zero (empty load list or 0 quantities) | Load list empty or all $Q_i = 0$ | $W_{\text{running}} = 0W$<br>$\Delta W_{\max} = 0W$<br>$W_{\text{peak}} = 0W$<br>$W_{\text{planning}} = 0W$ | **Running:** 0 W<br>**Peak:** 0 W<br>**Planning Capacity:** 0 W<br>**Planning kVA (PF=0.8):** 0 kVA | Confirms zero division avoidance, safe defaults, and clean handling of empty input state. |
| **Case G** | Custom appliance addition | Custom Load: "Portable Air Fryer", Qty 1, $1,750W_r$, $1,750W_s$ | $W_{\text{running}} = 1,750W$<br>$\Delta W_{\max} = 0W$<br>$W_{\text{peak}} = 1,750W$<br>$W_{\text{planning}} = 1,750 \times 1.25 = 2,187.5W$ | **Running:** 1,750 W<br>**Peak:** 1,750 W<br>**Planning Capacity:** 2,187.5 W<br>**Planning kVA (PF=0.8):** 2.734 kVA | Validates dynamic user-defined custom appliance integration into calculation pipeline. |
| **Case H** | Very large whole-house load | Central AC 3-Ton ($3,500W_r / 10,000W_s$, $\Delta=6,500W$) + Well Pump 1HP ($2,000W_r / 4,500W_s$, $\Delta=2,500W$) + Water Heater ($4,500W_r / 4,500W_s$) + Fridge ($200W_r / 1,200W_s$, $\Delta=1,000W$) | $W_{\text{running}} = 10,200W$ ($10.20\text{ kW}$)<br>$\Delta W_{\max} = 6,500W$ (Central AC)<br>$W_{\text{peak}} = 10,200 + 6,500 = 16,700W$ ($16.70\text{ kW}$)<br>$W_{\text{planning}} = 16,700 \times 1.25 = 20,875W$ ($20.875\text{ kW}$) | **Running:** 10,200 W (10.20 kW)<br>**Peak:** 16,700 W (16.70 kW)<br>**Planning Capacity:** 20,875 W (20.875 kW)<br>**Running kVA:** 12.75 kVA<br>**Peak kVA:** 20.875 kVA<br>**Planning kVA:** 26.094 kVA | Validates heavy residential whole-house standby generator capacity and complete kVA triad. |
| **Case I** | Input Sanitization & Error Handling | Negative quantity (-2) or negative running watts (-500) | Clamped to $\ge 0$ with non-silent user validation error array populated | **Running:** 0 W<br>**Errors:** `["Quantity must be >= 0", "Watts must be >= 0"]` | Confirms non-silent sanitization per Decision 007 and GEMINI.md Section 5. |
| **Case J** | Mathematical Verification of kVA Model | Running: 10.2 kW, Peak: 16.7 kW, Planning: 20.875 kW, $\text{PF} = 0.80$ | Running: $10.2 / 0.8 = 12.75\text{ kVA}$<br>Peak: $16.7 / 0.8 = 20.875\text{ kVA}$<br>Planning: $20.875 / 0.8 = 26.09375\text{ kVA}$ | **Running kVA:** 12.75 kVA<br>**Peak kVA:** 20.88 kVA<br>**Planning kVA:** 26.09 kVA | Verifies that kVA levels are clearly distinguished and mathematically exact. |

---

## 13. Authoritative Sources & Technical References

In compliance with `GEMINI.md` Section 9, all technical claims, safety rules, and formulas are grounded in authoritative primary sources:

1. **Cummins Power Generation:**  
   *Application Manual: Liquid Cooled Generator Sets & Sizing Guidance (Bulletin T-030).* Methodological principles of motor inrush starting demand, generator step-load acceptance, and the continuous running plus largest single motor surge rule.
2. **Generac Power Systems:**  
   *Residential Generator Sizing Worksheet & Standby Power Sizing Guide.* Standard planning margins and appliance starting wattage multipliers.
3. **CDC (Centers for Disease Control and Prevention):**  
   *Carbon Monoxide Poisoning Prevention: Guidelines for Portable Generator Safety.* (Mandating outdoor operation at least 20 feet from all open doors, windows, and vents).
4. **CPSC (U.S. Consumer Product Safety Commission):**  
   *Safety Alert: Portable Generator Hazards and Carbon Monoxide Prevention.* Document #5123.
5. **U.S. Department of Energy (DOE) & Energy Star:**  
   *Estimating Appliance and Home Electronic Energy Use.* Energy.gov appliance wattage database and typical inrush multipliers for household motor equipment.
6. **NFPA 70 / National Electrical Code (NEC):**  
   - *Article 702 (Optional Standby Systems):* Safety interlocks and transfer equipment to isolate standby power from utility distribution lines.  
   - *Article 210.20:* Continuous duty ratings (125% factor / 80% continuous branch circuit load rule).
7. **IEEE Standard 446 (The Emerald Book):**  
   *Recommended Practice for Emergency and Standby Power Systems for Industrial and Commercial Applications.* Principles of motor inrush starting demand, asynchronous load diversity, and alternator voltage dip management.
8. **OSHA (Occupational Safety and Health Administration):**  
   *Fact Sheet: Grounding and Operating Portable Generators Safely on Jobsites.*

---

## 14. Documentation & Verification Sign-Off

- **Lead Approval Status:** APPROVED WITH FINAL MATHEMATICAL CORRECTIONS — AWAITING IMPLEMENTATION AUTHORIZATION.
- **Git Commit Planned:** `docs(spec): apply final lead corrections to generator calculator specification`
- **Implementation Status:** STRICTLY UNIMPLEMENTED pending ChatGPT lead authorization.
