# CalcMyPower.com — Topical Authority & Search-Intent Keyword Map (`KEYWORD_MAP.md`)

**Document Owner:** Lead SEO Foundation Specialist  
**Status:** Production Standard  
**Core Rule:** One primary search intent per URL. Never create multiple thin pages for keyword permutations. Determine whether an intent requires an **Interactive Calculator** or an **In-Depth Engineering Guide** (or both working as a hub-and-spoke pair).

---

## 1. Decision Framework: Calculator Page vs. Editorial Guide Page

Before creating any new route on CalcMyPower, classify the dominant search intent:

| User Query Pattern | Dominant Search Intent | Page Type to Build | Why |
|---|---|---|---|
| `"[x] calculator"`, `"convert [x] to [y]"`, `"[x] sizing calculator"`, `"uninterruptible power supply hours"` | **Interactive Calculation (Tool Intent)** | **Calculator Page** (`/[slug]-calculator`) | User has specific numbers or wants to toggle presets and get an immediate numerical result. |
| `"what size [x] do i need for [y]"`, `"how many [x] to run [y]"`, `"can a [x]W generator run a [y]"` | **Guided Sizing Decision (Informational + Calculation Intent)** | **Editorial Engineering Guide** (`/[slug]`) bridged via `?scenario=` to the parent Calculator | User does not yet know the wattage/inputs of their equipment and needs reference brackets, nameplate instructions, and worked scenarios before using the calculator. |
| Minor phrasing variants (`"generator wattage calculator"` vs. `"generator size calculator"` vs. `"house generator calculator"`) | **Identical Intent** | **Consolidate into ONE Page** (`/generator-size-calculator`) | Creating separate pages for synonyms causes keyword cannibalization and violates Google's helpful content principles. |

---

## 2. Cluster 1: Generators & Outage Backup (`generators`)

### Live Assets
| URL | Page Type | Primary Query Target | Secondary Supporting Cluster | Status |
|---|---|---|---|---|
| `/generator-size-calculator` | Calculator | `generator size calculator` | `generator wattage calculator`, `house generator size calculator`, `rv generator size calculator`, `starting vs running watts calculator`, `generator load calculator` | **LIVE** |
| `/what-size-generator-do-i-need-for-my-house` | Guide | `what size generator do i need for my house` | `how many watts to run a house`, `is a 5000 watt generator enough for a house`, `what size generator for 2000 sq ft house`, `whole house generator sizing` | **LIVE** |
| `/what-size-generator-to-run-a-refrigerator` | Guide | `what size generator to run a refrigerator` | `how many watts does a refrigerator use on a generator`, `will a 2000 watt generator run a refrigerator`, `what size generator for refrigerator and freezer` | **LIVE** |

### Planned Expansion (Prioritized by Search Intent & Ecosystem Fit)
| Proposed URL | Page Type | Primary Query Target | Supporting Queries & Scope | Parent / Companion Tool |
|---|---|---|---|---|
| `/generator-fuel-consumption-calculator` | Calculator | `generator fuel consumption calculator` | `generator gas usage per hour`, `propane generator runtime calculator`, `natural gas generator cost per hour` (Calculates gal/hr, lb/hr, or ft³/hr at 25%/50%/75%/100% load) | `/generator-size-calculator` |
| `/what-size-generator-for-rv-air-conditioner` | Guide | `what size generator for rv air conditioner` | `generator for 13500 btu rv ac`, `generator for 15000 btu rv ac`, `30 amp vs 50 amp rv generator size`, `rv ac soft start generator sizing` | `/generator-size-calculator` |
| `/what-size-generator-for-well-pump-and-sump-pump` | Guide | `what size generator for well pump` | `what size generator to run a 1/2 hp well pump`, `what size generator for sump pump`, `240v submersible well pump starting watts` | `/generator-size-calculator` |

---

## 3. Cluster 2: UPS & Battery Storage (`ups-battery`)

### Live Assets
| URL | Page Type | Primary Query Target | Secondary Supporting Cluster | Status |
|---|---|---|---|---|
| `/ups-battery-backup-calculator` | Calculator | `uninterruptible power supply hours` / `ups runtime calculator` | `battery backup calculator`, `100ah battery runtime calculator`, `inverter battery backup time calculator`, `va to watts ups runtime` | **LIVE** |

### Planned Expansion
| Proposed URL | Page Type | Primary Query Target | Supporting Queries & Scope | Parent / Companion Tool |
|---|---|---|---|---|
| `/amp-hours-to-watt-hours-calculator` | Calculator | `amp hours to watt hours calculator` | `ah to wh conversion`, `watt hours to amp hours`, `12v 100ah to kwh`, `24v 48v battery capacity in wh` | `/ups-battery-backup-calculator` |
| `/inverter-size-calculator` | Calculator | `inverter size calculator` | `what size inverter do i need`, `dc to ac inverter battery cable and fuse sizing`, `continuous vs surge inverter wattage` | `/ups-battery-backup-calculator`, `/watts-to-amps-calculator` |
| `/battery-charge-time-calculator` | Calculator | `battery charge time calculator` | `how long to charge a 100ah battery`, `solar charge time calculator`, `battery charger amp sizing` | `/ups-battery-backup-calculator` |
| `/how-long-will-a-100ah-battery-run-an-appliance` | Guide | `how long will a 100ah battery run a refrigerator` | `12v 100ah lifepo4 vs lead acid runtime`, `how long will a 100ah battery last`, `cpap and wifi router battery backup hours` | `/ups-battery-backup-calculator` |

---

## 4. Cluster 3: Electricity & Circuit Sizing (`electricity`)

### Live Assets
| URL | Page Type | Primary Query Target | Secondary Supporting Cluster | Status |
|---|---|---|---|---|
| `/watts-to-amps-calculator` | Calculator | `watts to amps calculator` | `convert watts to amps`, `watts to amps 120v`, `watts to amps 240v`, `watts to amps 12v dc`, `3 phase watts to amps`, `1500 watts to amps` | **LIVE** |

### Planned Expansion
| Proposed URL | Page Type | Primary Query Target | Supporting Queries & Scope | Parent / Companion Tool |
|---|---|---|---|---|
| `/wire-size-calculator` | Calculator | `wire size calculator` / `voltage drop calculator` | `awg wire gauge calculator`, `12v dc wire size calculator`, `240v wire size for distance`, `3% voltage drop wire size` | `/watts-to-amps-calculator` |
| `/amps-to-watts-calculator` | Calculator | `amps to watts calculator` | `convert amps to watts`, `15 amps at 120v to watts`, `30 amps at 240v to watts`, `three phase amps to kw` | `/watts-to-amps-calculator` |
| `/kva-to-amps-and-kw-calculator` | Calculator | `kva to amps calculator` | `kva to kw calculator`, `kw to kva power factor`, `three phase kva to amps 480v 208v` | `/watts-to-amps-calculator`, `/generator-size-calculator` |
| `/how-many-watts-can-a-15-amp-or-20-amp-circuit-handle` | Guide | `how many watts on a 15 amp circuit` | `how many watts on a 20 amp breaker`, `80 percent continuous load rule 15a vs 20a`, `why space heaters trip 15 amp breakers` | `/watts-to-amps-calculator` |

---

## 5. Cluster 4: Solar PV & Off-Grid (`solar`)

### Planned Expansion
| Proposed URL | Page Type | Primary Query Target | Supporting Queries & Scope | Parent / Companion Tool |
|---|---|---|---|---|
| `/solar-panel-calculator` | Calculator | `solar panel calculator` | `how many solar panels do i need`, `off grid solar array and battery sizing`, `peak sun hours solar output calculator` | `/ups-battery-backup-calculator` |
| `/solar-charge-controller-size-calculator` | Calculator | `solar charge controller calculator` | `mppt vs pwm charge controller sizing`, `solar array voc and isc to controller amps` | `/watts-to-amps-calculator` |

---

## 6. Cluster 5: EV Charging (`ev-charging`)

### Planned Expansion
| Proposed URL | Page Type | Primary Query Target | Supporting Queries & Scope | Parent / Companion Tool |
|---|---|---|---|---|
| `/ev-charging-time-calculator` | Calculator | `ev charging time calculator` | `level 1 vs level 2 ev charge time`, `how long to charge electric car at 240v 32a 48a`, `ev circuit breaker sizing 80% rule` | `/watts-to-amps-calculator` |
| `/ev-charging-cost-calculator` | Calculator | `ev charging cost calculator` | `cost to charge an electric car at home`, `ev cost per mile vs gas calculator`, `kwh to charge ev cost` | `/electricity-cost-calculator` |

---

## 7. Cluster 6: Home Energy & Electricity Cost (`home-energy`)

### Planned Expansion
| Proposed URL | Page Type | Primary Query Target | Supporting Queries & Scope | Parent / Companion Tool |
|---|---|---|---|---|
| `/electricity-cost-calculator` | Calculator | `electricity cost calculator` | `kwh cost calculator`, `appliance electricity cost per month`, `watts to kwh cost per day` | `/watts-to-amps-calculator` |
| `/space-heater-electricity-cost-calculator` | Guide / Tool | `how much does it cost to run a 1500w space heater` | `1500 watt heater cost per hour and month`, `space heater amps and utility bill impact` | `/electricity-cost-calculator`, `/watts-to-amps-calculator` |

---

## 8. Cluster 7: RV & Mobile Power (`rv-power`)

### Planned Expansion
| Proposed URL | Page Type | Primary Query Target | Supporting Queries & Scope | Parent / Companion Tool |
|---|---|---|---|---|
| `/rv-battery-and-solar-calculator` | Calculator | `rv solar and battery calculator` | `boondocking amp hour energy budget`, `12v rv battery bank sizing for inverter loads` | `/ups-battery-backup-calculator`, `/solar-panel-calculator` |
