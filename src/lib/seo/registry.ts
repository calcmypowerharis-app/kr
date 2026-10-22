/**
 * Central SEO Route, Topical Cluster & Content Registry
 * CalcMyPower.com
 *
 * Single source of truth for sitemaps, internal linking, cluster hierarchy,
 * and automated SEO verification tests.
 */

export const SITE_URL = "https://calcmypower.com";
export const SITE_NAME = "CalcMyPower";

export type ClusterId =
  | "generators"
  | "ups-battery"
  | "electricity"
  | "solar"
  | "ev-charging"
  | "home-energy"
  | "rv-power";

export interface TopicalCluster {
  id: ClusterId;
  name: string;
  shortName: string;
  description: string;
  hubAnchor: string;
  status: "active" | "planned";
}

export const TOPICAL_CLUSTERS: Record<ClusterId, TopicalCluster> = {
  generators: {
    id: "generators",
    name: "Generators & Outage Backup",
    shortName: "Generator Sizing",
    description:
      "Size portable inverter, dual-fuel, and whole-house standby generators using running watts, single-motor starting surge deltas, and continuous planning headroom.",
    hubAnchor: "/calculators#generators",
    status: "active",
  },
  "ups-battery": {
    id: "ups-battery",
    name: "UPS & Battery Backup Storage",
    shortName: "UPS & Battery",
    description:
      "Calculate uninterruptible power supply (UPS) runtime hours, usable Watt-hours (Wh), DC current draw, and inverter sizing across LiFePO4 and Lead-Acid battery banks.",
    hubAnchor: "/calculators#ups-battery",
    status: "active",
  },
  electricity: {
    id: "electricity",
    name: "Electricity & Circuit Sizing",
    shortName: "Electrical Circuits",
    description:
      "Convert real power (Watts), apparent power (VA), voltage, and current (Amps) across DC, single-phase AC, and balanced three-phase circuits with NEC continuous-load references.",
    hubAnchor: "/calculators#electricity",
    status: "active",
  },
  solar: {
    id: "solar",
    name: "Solar PV & Off-Grid Systems",
    shortName: "Solar PV",
    description:
      "Calculate optimal solar panel tilt angles, compare roof pitch slopes, size solar panel arrays, and evaluate off-grid solar storage.",
    hubAnchor: "/calculators#solar",
    status: "active",
  },
  "ev-charging": {
    id: "ev-charging",
    name: "EV Charging & Circuit Load",
    shortName: "EV Charging",
    description:
      "Estimate Level 1 and Level 2 electric vehicle charging times, 240V circuit breaker requirements, and home charging electricity costs.",
    hubAnchor: "/calculators#ev-charging",
    status: "planned",
  },
  "home-energy": {
    id: "home-energy",
    name: "Home Energy & Appliance Electricity Cost",
    shortName: "Home Energy",
    description:
      "Calculate daily, monthly, and annual kilowatt-hour (kWh) consumption and utility bill impact for household appliances and HVAC equipment.",
    hubAnchor: "/calculators#home-energy",
    status: "planned",
  },
  "rv-power": {
    id: "rv-power",
    name: "RV & Mobile Power Systems",
    shortName: "RV Power",
    description:
      "Plan 30-amp and 50-amp RV electrical service budgets, 12V/24V house battery boondocking capacity, and rooftop AC generator requirements.",
    hubAnchor: "/calculators#rv-power",
    status: "planned",
  },
};

export interface CalculatorRegistryEntry {
  slug: string;
  path: `/${string}`;
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  cluster: ClusterId;
  secondaryClusters?: ClusterId[];
  primaryKeyword: string;
  formula: string;
  lastModified: string; // Verifiable YYYY-MM-DD date for XML sitemap
  relatedCalculatorPaths: `/${string}`[];
  relatedGuidePaths: `/${string}`[];
}

export const CALCULATOR_REGISTRY: CalculatorRegistryEntry[] = [
  {
    slug: 'generator-fuel-consumption-calculator',
    path: '/generator-fuel-consumption-calculator',
    title: 'Generator Fuel Consumption Calculator',
    shortTitle: 'Generator Fuel',
    metaTitle: 'Generator Fuel Consumption Calculator',
    metaDescription: 'Estimate generator fuel use per hour, tank runtimes, and operating costs for gas, propane, and diesel models at 25%, 50%, 75%, and 100% load.',
    cluster: 'generators',
    primaryKeyword: 'generator fuel consumption calculator',
    formula: 'Cost = (Fuel Rate) * Price | Runtime = Capacity / (Fuel Rate)',
    lastModified: '2026-10-22',
    relatedCalculatorPaths: [
      '/generator-size-calculator'
    ],
    relatedGuidePaths: [
      '/what-size-generator-do-i-need-for-my-house'
    ],
  },
  {
    slug: "generator-size-calculator",
    path: "/generator-size-calculator",
    title: "Generator Size Calculator",
    shortTitle: "Generator Size",
    metaTitle: "Generator Size Calculator (Home Backup, RV & Portable)",
    metaDescription:
      "Calculate what size generator you need for home emergency backup, RV camping, or jobsite tools based on running watts, motor startup surges, and planning headroom.",
    cluster: "generators",
    secondaryClusters: ["rv-power", "home-energy"],
    primaryKeyword: "generator size calculator",
    formula: "W_planning = (W_running + ΔW_max) × 1.25",
    lastModified: '2026-10-22',
    relatedCalculatorPaths: [
      '/ups-battery-backup-calculator',
      '/watts-to-amps-calculator'
    ],
    relatedGuidePaths: [
      '/what-size-generator-do-i-need-for-my-house',
      '/what-size-generator-to-run-a-refrigerator'
    ],
  },
  {
    slug: "ups-battery-backup-calculator",
    path: "/ups-battery-backup-calculator",
    title: "UPS Battery Backup Run-Time Hours Calculator",
    shortTitle: "UPS Runtime",
    metaTitle: "UPS Battery Backup Run-Time Hours Calculator",
    metaDescription:
      "Estimate uninterruptible power supply (UPS) backup hours and battery run-time from appliance wattage, battery voltage, and Amp-hour capacity.",
    cluster: "ups-battery",
    secondaryClusters: ["electricity", "solar"],
    primaryKeyword: "uninterruptible power supply hours",
    formula: "T = (V × Ah × DoD × η) ÷ P",
    lastModified: '2026-10-22',
    relatedCalculatorPaths: [
      '/battery-capacity-calculator',
      '/watts-to-amps-calculator',
      '/generator-size-calculator'
    ],
    relatedGuidePaths: [
      '/how-long-will-a-100ah-battery-last',
      '/what-is-a-watt-hour',
      '/what-does-ah-mean-on-a-battery',
      '/what-size-generator-do-i-need-for-my-house'
    ],
  },
  {
    slug: "battery-capacity-calculator",
    path: "/battery-capacity-calculator",
    title: "Battery Capacity & Sizing Calculator",
    shortTitle: "Battery Capacity",
    metaTitle: "Battery Capacity & Bank Sizing Calculator",
    metaDescription:
      "Calculate battery capacity in Amp-hours (Ah) and Watt-hours (Wh), configure series and parallel banks, and size usable storage by load and depth of discharge.",
    cluster: "ups-battery",
    secondaryClusters: ["electricity", "solar", "rv-power"],
    primaryKeyword: "battery capacity calculator",
    formula: "Wh = V × Ah | Wh_usable = Wh × DoD | Ah_req = (P × t) ÷ (V × η × DoD)",
    lastModified: '2026-10-22',
    relatedCalculatorPaths: [
      '/solar-battery-calculator',
      '/ups-battery-backup-calculator',
      '/watts-to-amps-calculator',
      '/amps-to-watts-calculator',
      '/solar-panel-tilt-calculator'
    ],
    relatedGuidePaths: [
      '/how-many-amp-hours-do-i-need',
      '/how-long-will-a-100ah-battery-last',
      '/what-does-ah-mean-on-a-battery',
      '/what-is-a-watt-hour',
      '/solar-panels-series-vs-parallel'
    ],
  },
  {
    slug: "watts-to-amps-calculator",
    path: "/watts-to-amps-calculator",
    title: "Watts to Amps Electrical Calculator",
    shortTitle: "Watts to Amps",
    metaTitle: "Watts to Amps Calculator (DC, Single-Phase & 3-Phase AC)",
    metaDescription:
      "Convert Watts to Amps with our electrical calculator. Supports DC circuits, 120V/240V single-phase AC, and balanced 208V/480V three-phase systems with power factor.",
    cluster: "electricity",
    secondaryClusters: ["generators", "ups-battery", "solar"],
    primaryKeyword: "watts to amps calculator",
    formula: "I = P ÷ (V × PF) | 3Φ: I = P ÷ (√3 × V × PF)",
    lastModified: '2026-10-22',
    relatedCalculatorPaths: [
      '/amps-to-watts-calculator',
      '/three-phase-power-calculator',
      '/voltage-drop-calculator',
      '/battery-capacity-calculator',
      '/ups-battery-backup-calculator',
      '/solar-panel-tilt-calculator',
      '/generator-size-calculator'
    ],
    relatedGuidePaths: [
      '/electricity-use-calculator',
      '/what-is-a-watt-hour',
      '/what-does-ah-mean-on-a-battery',
      '/what-size-generator-do-i-need-for-my-house',
      '/solar-panels-series-vs-parallel'
    ],
  },
  {
    slug: "amps-to-watts-calculator",
    path: "/amps-to-watts-calculator",
    title: "Amps to Watts Electrical Calculator",
    shortTitle: "Amps to Watts",
    metaTitle: "Amps to Watts Calculator (DC, Single & 3-Phase AC)",
    metaDescription:
      "Convert amps to watts across DC, single-phase 120V/240V, and three-phase AC circuits. Calculate real power (W), apparent power (VA), and power factor.",
    cluster: "electricity",
    secondaryClusters: ["generators", "ups-battery", "solar"],
    primaryKeyword: "amps to watts",
    formula: "P = I × V × PF | 3Φ: P = √3 × V × I × PF",
    lastModified: '2026-10-22',
    relatedCalculatorPaths: [
      '/watts-to-amps-calculator',
      '/three-phase-power-calculator',
      '/voltage-drop-calculator',
      '/battery-capacity-calculator',
      '/solar-panel-tilt-calculator',
      '/ups-battery-backup-calculator',
      '/generator-size-calculator'
    ],
    relatedGuidePaths: [
      '/electricity-use-calculator',
      '/what-is-a-watt-hour',
      '/what-does-ah-mean-on-a-battery',
      '/what-size-generator-do-i-need-for-my-house',
      '/solar-panels-series-vs-parallel'
    ],
  },
  {
    slug: "solar-panel-tilt-calculator",
    path: "/solar-panel-tilt-calculator",
    title: "Solar Panel Tilt Angle Calculator",
    shortTitle: "Solar Panel Tilt",
    metaTitle: "Solar Panel Tilt Angle Calculator (Optimal Angle & Roof Pitch)",
    metaDescription:
      "Calculate the optimal solar panel tilt angle and compass orientation for your latitude. Compare roof pitch angles, seasonal adjustments, and mounting options.",
    cluster: "solar",
    secondaryClusters: ["rv-power", "home-energy"],
    primaryKeyword: "solar panel angle calculator",
    formula: "θ_roof = atan(pitch/12) × (180/π) | Tilt_winter = lat + 15° | Tilt_summer = lat - 15°",
    lastModified: '2026-10-22',
    relatedCalculatorPaths: [
      '/solar-battery-calculator',
      '/battery-capacity-calculator',
      '/watts-to-amps-calculator',
      '/ups-battery-backup-calculator'
    ],
    relatedGuidePaths: [
      '/what-is-a-watt-hour',
      '/how-long-will-a-100ah-battery-last',
      '/solar-panels-series-vs-parallel'
    ],
  },
  {
    slug: "solar-battery-calculator",
    path: "/solar-battery-calculator",
    title: "Solar Battery Calculator",
    shortTitle: "Solar Battery",
    metaTitle: "Solar Battery Calculator (Size Battery Bank for Solar PV)",
    metaDescription:
      "Calculate the battery bank capacity needed for your off-grid or backup solar system. Size storage in kWh and Amp-hours based on daily usage and autonomy.",
    cluster: "solar",
    secondaryClusters: ["ups-battery", "rv-power"],
    primaryKeyword: "solar battery calculator",
    formula: "E_nom = (E_daily × N_days) ÷ (η_inv × DoD) | Ah = E_nom ÷ V_dc",
    lastModified: '2026-10-22',
    relatedCalculatorPaths: [
      '/solar-charge-controller-calculator',
      '/solar-system-size-calculator',
      '/voltage-drop-calculator',
      '/battery-capacity-calculator',
      '/solar-panel-tilt-calculator',
      '/watts-to-amps-calculator',
      '/ups-battery-backup-calculator'
    ],
    relatedGuidePaths: [
      '/solar-panels-series-vs-parallel',
      '/how-long-will-a-100ah-battery-last',
      '/what-is-a-watt-hour',
      '/how-long-does-it-take-to-charge-a-battery-with-solar-panels'
    ],
  },
  {
    slug: "solar-charge-controller-calculator",
    path: "/solar-charge-controller-calculator",
    title: "Solar Charge Controller Calculator",
    shortTitle: "Charge Controller",
    metaTitle: "Solar Charge Controller Calculator (MPPT & PWM Sizing)",
    metaDescription:
      "Calculate solar battery charge controller size for 12V, 24V, and 48V systems. Size MPPT and PWM units using array wattage, short-circuit current, and cold Voc.",
    cluster: "solar",
    secondaryClusters: ["ups-battery", "rv-power"],
    primaryKeyword: "solar charge controller calculator",
    formula: "I_nom = P_arr ÷ V_bat | I_plan = I_nom × 1.20 | Voc_cold = Voc_STC × [1 + α × (T_min - 25°C)]",
    lastModified: '2026-10-22',
    relatedCalculatorPaths: [
      '/inverter-size-calculator',
      '/solar-battery-calculator',
      '/solar-system-size-calculator',
      '/voltage-drop-calculator',
      '/solar-panel-tilt-calculator',
      '/battery-capacity-calculator',
      '/watts-to-amps-calculator'
    ],
    relatedGuidePaths: [
      '/solar-panels-series-vs-parallel',
      '/what-is-a-watt-hour',
      '/what-does-ah-mean-on-a-battery',
      '/how-long-does-it-take-to-charge-a-battery-with-solar-panels'
    ],
  },
  {
    slug: "voltage-drop-calculator",
    path: "/voltage-drop-calculator",
    title: "Voltage Drop Calculator",
    shortTitle: "Voltage Drop",
    metaTitle: "Voltage Drop Calculator (AC, DC & Wire Sizing)",
    metaDescription:
      "Calculate voltage drop, percentage loss, and receiving voltage for AC and DC circuits. Size conductor wire gauge by distance, current, and material.",
    cluster: "electricity",
    secondaryClusters: ["solar", "rv-power", "generators"],
    primaryKeyword: "voltage drop calculator",
    formula: "VD = multiplier × I × (L ÷ 1,000) × R | 1Φ: mult = 2 | 3Φ: mult = √3",
    lastModified: '2026-10-22',
    relatedCalculatorPaths: [
      '/watts-to-amps-calculator',
      '/amps-to-watts-calculator',
      '/three-phase-power-calculator',
      '/solar-battery-calculator',
      '/solar-charge-controller-calculator',
      '/solar-system-size-calculator'
    ],
    relatedGuidePaths: [
      '/solar-panels-series-vs-parallel',
      '/what-is-a-watt-hour',
      '/what-does-ah-mean-on-a-battery'
    ],
  },
  {
    slug: "solar-system-size-calculator",
    path: "/solar-system-size-calculator",
    title: "Solar System Size Calculator",
    shortTitle: "Solar System Size",
    metaTitle: "Solar System Size Calculator (Array kW & Panel Count)",
    metaDescription:
      "Calculate solar system size and panel count for your home. Estimate array kW, module count, and roof space from daily kWh use and peak sun hours.",
    cluster: "solar",
    secondaryClusters: ["home-energy", "rv-power"],
    primaryKeyword: "solar system size calculator",
    formula: "P_array_kW = (E_daily × Offset%) ÷ (PSH × PR) | Panels = Math.ceil(P_array_W ÷ W_panel)",
    lastModified: '2026-10-22',
    relatedCalculatorPaths: [
      '/solar-battery-calculator',
      '/solar-charge-controller-calculator',
      '/solar-panel-tilt-calculator',
      '/voltage-drop-calculator',
      '/watts-to-amps-calculator'
    ],
    relatedGuidePaths: [
      '/how-much-energy-does-a-solar-panel-produce',
      '/solar-panels-series-vs-parallel',
      '/what-is-a-watt-hour',
      '/how-long-will-a-100ah-battery-last'
    ],
  },
  {
    slug: "three-phase-power-calculator",
    path: "/three-phase-power-calculator",
    title: "Three Phase Power Calculator",
    shortTitle: "Three Phase Power",
    metaTitle: "Three Phase Power Calculator (kW, Amps & Power Factor)",
    metaDescription:
      "Calculate 3-phase real power (kW), apparent power (kVA), and line current (Amps). Supports 208V, 240V, and 480V circuits with balanced loads and power factor.",
    cluster: "electricity",
    secondaryClusters: ["generators", "solar"],
    primaryKeyword: "3 phase electrical power calculator",
    formula: "P = √3 × V_LL × I × PF | S = √3 × V_LL × I | I = P ÷ (√3 × V_LL × PF)",
    lastModified: '2026-10-22',
    relatedCalculatorPaths: [
      '/watts-to-amps-calculator',
      '/amps-to-watts-calculator',
      '/voltage-drop-calculator',
      '/generator-size-calculator',
      '/solar-system-size-calculator'
    ],
    relatedGuidePaths: [
      '/what-is-a-watt-hour',
      '/what-size-generator-do-i-need-for-my-house',
      '/solar-panels-series-vs-parallel'
    ],
  },
  {
    slug: "electricity-use-calculator",
    path: "/electricity-use-calculator",
    title: "Electricity Usage Calculator",
    shortTitle: "Electricity Usage",
    metaTitle: "Electricity Usage Calculator (Calculate kWh & Appliance Energy)",
    metaDescription:
      "Calculate appliance electricity usage in kWh and Watt-hours from running watts and operating hours. Estimate daily consumption, monthly energy use, and power costs.",
    cluster: "electricity",
    secondaryClusters: ["home-energy", "solar", "ups-battery"],
    primaryKeyword: "electricity usage calculator",
    formula: "Daily Wh = W × Hours × Qty | Daily kWh = Wh ÷ 1,000 | Monthly kWh = (Daily kWh) × Days",
    lastModified: '2026-10-22',
    relatedCalculatorPaths: [
      '/electricity-cost-calculator',
      '/watts-to-amps-calculator',
      '/amps-to-watts-calculator',
      '/battery-capacity-calculator',
      '/solar-system-size-calculator',
      '/generator-size-calculator'
    ],
    relatedGuidePaths: [
      '/electricity-cost-calculator',
      '/what-is-a-watt-hour',
      '/solar-system-size-calculator'
    ],
  },
  {
    slug: "electricity-cost-calculator",
    path: "/electricity-cost-calculator",
    title: "Electricity Cost Calculator",
    shortTitle: "Electricity Cost",
    metaTitle: "Electricity Cost Calculator (Monthly kWh & Electric Bill Breakdown)",
    metaDescription:
      "Calculate your estimated monthly electricity cost from kWh usage, energy rates ($/kWh), fixed customer charges, and taxes. Compare effective rates.",
    cluster: "electricity",
    secondaryClusters: ["home-energy"],
    primaryKeyword: "electricity cost calculator",
    formula: "Total Bill = (kWh × Rate) + Fixed + Riders + Tax | Effective = Bill ÷ kWh",
    lastModified: '2026-10-22',
    relatedCalculatorPaths: [
      '/electricity-use-calculator',
      '/watts-to-amps-calculator',
      '/amps-to-watts-calculator',
      '/solar-system-size-calculator',
      '/generator-size-calculator'
    ],
    relatedGuidePaths: [
      '/electricity-use-calculator',
      '/what-is-a-watt-hour'
    ],
  },
  {
    slug: "inverter-size-calculator",
    path: "/inverter-size-calculator",
    title: "Inverter Size Calculator",
    shortTitle: "Inverter Size",
    metaTitle: "Inverter Size Calculator (Watts, Surge, Cable & Fuse Sizing)",
    metaDescription:
      "Calculate the inverter size you need in running and surge watts. Includes DC battery current draw, cable gauge (AWG), and fuse sizing for 12V, 24V, and 48V banks.",
    cluster: "ups-battery",
    secondaryClusters: ["electricity", "solar", "rv-power"],
    primaryKeyword: "inverter size calculator",
    formula: "P_cont = P_run × 1.25 | P_surge = P_run + ΔP_surge_max | I_DC = P ÷ (V × η)",
    lastModified: '2026-10-22',
    relatedCalculatorPaths: [
      '/solar-battery-calculator',
      '/solar-charge-controller-calculator',
      '/battery-capacity-calculator',
      '/watts-to-amps-calculator',
      '/generator-size-calculator',
      '/voltage-drop-calculator'
    ],
    relatedGuidePaths: [
      '/how-many-amp-hours-do-i-need',
      '/solar-charge-controller-calculator',
      '/how-long-will-a-100ah-battery-last',
      '/what-is-a-watt-hour',
      '/solar-panels-series-vs-parallel'
    ],
  },
];

export interface GuideRegistryEntry {
  slug: string;
  path: `/${string}`;
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  cluster: ClusterId;
  parentCalculatorPath: `/${string}`;
  scenarioLink: string;
  primaryKeyword: string;
  readingTime: string;
  datePublished: string; // YYYY-MM-DD
  lastModified: string; // YYYY-MM-DD
  heroImage: string;
  relatedCalculatorPaths: `/${string}`[];
  relatedGuidePaths: `/${string}`[];
}

export const GUIDE_REGISTRY: GuideRegistryEntry[] = [
  {
    slug: "what-size-generator-do-i-need-for-my-house",
    path: "/what-size-generator-do-i-need-for-my-house",
    title: "What Size Generator Do I Need for My House?",
    shortTitle: "House Generator Sizing Guide",
    metaTitle: "What Size Generator Do I Need for My House? Sizing Guide",
    metaDescription:
      "Calculate the generator size you need for your house using running watts, motor startup surges, and essential circuits instead of misleading square-footage rules.",
    cluster: "generators",
    parentCalculatorPath: "/generator-size-calculator",
    scenarioLink: "/generator-size-calculator?scenario=winter-essentials",
    primaryKeyword: "what size generator do i need for my house",
    readingTime: "11 min read",
    datePublished: "2026-09-27",
    lastModified: "2026-09-28",
    heroImage: "/images/articles/standby-generator-home-installation.webp",
    relatedCalculatorPaths: [
      '/generator-size-calculator',
      '/watts-to-amps-calculator',
      '/ups-battery-backup-calculator'
    ],
    relatedGuidePaths: [
      '/what-size-generator-to-run-a-refrigerator'
    ],
  },
  {
    slug: "what-size-generator-to-run-a-refrigerator",
    path: "/what-size-generator-to-run-a-refrigerator",
    title: "What Size Generator Do I Need to Run a Refrigerator?",
    shortTitle: "Refrigerator Generator Sizing Guide",
    metaTitle: "What Size Generator to Run a Refrigerator? Sizing Guide",
    metaDescription:
      "Determine the generator size you need to run a refrigerator during an outage based on running watts, compressor startup surge, and simultaneous household loads.",
    cluster: "generators",
    parentCalculatorPath: "/generator-size-calculator",
    scenarioLink: "/generator-size-calculator?scenario=refrigerator-outage",
    primaryKeyword: "what size generator to run a refrigerator",
    readingTime: "10 min read",
    datePublished: "2026-09-27",
    lastModified: "2026-09-28",
    heroImage: "/images/articles/residential-refrigerator-kitchen.webp",
    relatedCalculatorPaths: [
      '/generator-size-calculator',
      '/watts-to-amps-calculator',
      '/ups-battery-backup-calculator'
    ],
    relatedGuidePaths: [
      '/what-size-generator-do-i-need-for-my-house'
    ],
  },
  {
    slug: "what-does-ah-mean-on-a-battery",
    path: "/what-does-ah-mean-on-a-battery",
    title: "What Does Ah Mean on a Battery? Amp-Hours Explained",
    shortTitle: "Battery Amp-Hours Explained",
    metaTitle: "What Does Ah Mean on a Battery? Amp-Hours Explained",
    metaDescription:
      "Understand what Ah (Amp-hours) means on a battery, how to convert Ah to Watt-hours (Wh), and why usable battery runtime depends on chemistry and discharge rate.",
    cluster: "ups-battery",
    parentCalculatorPath: "/ups-battery-backup-calculator",
    scenarioLink: "/ups-battery-backup-calculator",
    primaryKeyword: "what does ah mean on a battery",
    readingTime: "9 min read",
    datePublished: "2026-09-28",
    lastModified: "2026-09-28",
    heroImage: "/images/articles/deep-cycle-battery-amp-hours.webp",
    relatedCalculatorPaths: [
      '/battery-capacity-calculator',
      '/ups-battery-backup-calculator',
      '/watts-to-amps-calculator',
      '/amps-to-watts-calculator'
    ],
    relatedGuidePaths: [
      '/battery-capacity-calculator',
      '/how-long-will-a-100ah-battery-last',
      '/what-is-a-watt-hour',
      '/what-size-generator-do-i-need-for-my-house',
      '/what-size-generator-to-run-a-refrigerator'
    ],
  },
  {
    slug: "what-is-a-watt-hour",
    path: "/what-is-a-watt-hour",
    title: "What Is a Watt-Hour (Wh)? Watts vs. Watt-Hours Explained",
    shortTitle: "Watt-Hours (Wh) Explained",
    metaTitle: "What Is a Watt-Hour (Wh)? Watts vs. Watt-Hours Explained",
    metaDescription:
      "Understand what a Watt-hour (Wh) measures, the crucial difference between Watts and Watt-hours, how to convert Ah to Wh, and how energy determines battery runtime.",
    cluster: "electricity",
    parentCalculatorPath: "/watts-to-amps-calculator",
    scenarioLink: "/watts-to-amps-calculator",
    primaryKeyword: "watt hours",
    readingTime: "9 min read",
    datePublished: "2026-09-28",
    lastModified: "2026-09-28",
    heroImage: "/images/articles/watt-hour-energy-monitor.webp",
    relatedCalculatorPaths: [
      '/battery-capacity-calculator',
      '/ups-battery-backup-calculator',
      '/watts-to-amps-calculator',
      '/amps-to-watts-calculator'
    ],
    relatedGuidePaths: [
      '/electricity-use-calculator',
      '/how-long-will-a-100ah-battery-last',
      '/what-does-ah-mean-on-a-battery',
      '/what-size-generator-do-i-need-for-my-house'
    ],
  },
  {
    slug: "how-long-will-a-100ah-battery-last",
    path: "/how-long-will-a-100ah-battery-last",
    title: "How Long Will a 100Ah Battery Last? 12V Appliance Runtime Guide",
    shortTitle: "100Ah Battery Runtime Guide",
    metaTitle: "How Long Will a 100Ah Battery Last? 12V Appliance Runtime Guide",
    metaDescription:
      "Find out how long a 12V 100Ah battery will run a refrigerator, TV, CPAP, or inverter. See realistic runtime estimates for LiFePO4 and lead-acid deep-cycle batteries.",
    cluster: "ups-battery",
    parentCalculatorPath: "/ups-battery-backup-calculator",
    scenarioLink: "/ups-battery-backup-calculator",
    primaryKeyword: "12v 100ah battery",
    readingTime: "12 min read",
    datePublished: "2026-09-29",
    lastModified: "2026-09-29",
    heroImage: "/images/articles/12v-100ah-battery-runtime-comparison.webp",
    relatedCalculatorPaths: [
      '/ups-battery-backup-calculator',
      '/battery-capacity-calculator',
      '/watts-to-amps-calculator',
      '/generator-size-calculator'
    ],
    relatedGuidePaths: [
      '/how-many-amp-hours-do-i-need',
      '/battery-capacity-calculator',
      '/what-does-ah-mean-on-a-battery',
      '/what-is-a-watt-hour'
    ],
  },
  {
    slug: "solar-panels-series-vs-parallel",
    path: "/solar-panels-series-vs-parallel",
    title: "Solar Panels in Series vs Parallel: Wiring, Voltage & Current Explained",
    shortTitle: "Solar Panels in Series vs Parallel",
    metaTitle: "Solar Panels in Series vs Parallel: Wiring Diagrams & Sizing",
    metaDescription:
      "Compare solar panels in series vs parallel. See clear wiring diagrams, calculate array voltage and current, and size charge controllers for off-grid and RV systems.",
    cluster: "solar",
    parentCalculatorPath: "/solar-panel-tilt-calculator",
    scenarioLink: "/solar-panel-tilt-calculator",
    primaryKeyword: "solar panels serial or parallel",
    readingTime: "12 min read",
    datePublished: "2026-09-30",
    lastModified: "2026-10-14",
    heroImage: "/images/articles/solar-panels-series-vs-parallel-wiring.webp",
    relatedCalculatorPaths: [
      '/solar-charge-controller-calculator',
      '/solar-panel-tilt-calculator',
      '/battery-capacity-calculator',
      '/watts-to-amps-calculator',
      '/amps-to-watts-calculator'
    ],
    relatedGuidePaths: [
      '/how-long-will-a-100ah-battery-last',
      '/what-is-a-watt-hour',
      '/how-long-does-it-take-to-charge-a-battery-with-solar-panels'
    ],
  },
  {
    slug: "how-much-energy-does-a-solar-panel-produce",
    path: "/how-much-energy-does-a-solar-panel-produce",
    title: "How Much Energy Does a Solar Panel Produce? 400W Panel Examples",
    shortTitle: "Solar Panel Energy Production Guide",
    metaTitle: "How Much Energy Does a Solar Panel Produce? 400W Panel Examples",
    metaDescription:
      "Learn how much electricity a solar panel produces daily and monthly. See 400W panel examples, peak sun hours, system losses, and factors affecting solar output.",
    cluster: "solar",
    parentCalculatorPath: "/solar-system-size-calculator",
    scenarioLink: "/solar-system-size-calculator",
    primaryKeyword: "how much energy does a solar panel produce",
    readingTime: "14 min read",
    datePublished: "2026-10-01",
    lastModified: "2026-10-01",
    heroImage: "/images/articles/how-much-energy-does-a-solar-panel-produce.webp",
    relatedCalculatorPaths: [
      '/solar-system-size-calculator',
      '/solar-panel-tilt-calculator',
      '/solar-battery-calculator',
      '/solar-charge-controller-calculator',
      '/voltage-drop-calculator'
    ],
    relatedGuidePaths: [
      '/solar-system-size-calculator',
      '/solar-panels-series-vs-parallel',
      '/what-is-a-watt-hour'
    ],
  },
  {
    slug: "how-many-amp-hours-do-i-need",
    path: "/how-many-amp-hours-do-i-need",
    title: "How Many Amp Hours Do I Need for a Battery Bank?",
    shortTitle: "Battery Bank Sizing Guide",
    metaTitle: "How Many Amp Hours Do I Need for a Battery Bank? Sizing Guide",
    metaDescription:
      "Learn how to size a battery bank in amp-hours (Ah). Calculate daily watt-hours, system voltage, autonomy days, depth of discharge, and inverter losses.",
    cluster: "ups-battery",
    parentCalculatorPath: "/battery-capacity-calculator",
    scenarioLink: "/battery-capacity-calculator",
    primaryKeyword: "how many amp hours do i need for a battery bank",
    readingTime: "13 min read",
    datePublished: "2026-10-08",
    lastModified: "2026-10-08",
    heroImage: "/images/articles/how-many-amp-hours-battery-bank-sizing.webp",
    relatedCalculatorPaths: [
      '/battery-capacity-calculator',
      '/solar-battery-calculator',
      '/inverter-size-calculator',
      '/ups-battery-backup-calculator',
      '/watts-to-amps-calculator'
    ],
    relatedGuidePaths: [
      '/battery-capacity-calculator',
      '/what-does-ah-mean-on-a-battery',
      '/what-is-a-watt-hour',
      '/how-long-will-a-100ah-battery-last',
      '/solar-panels-series-vs-parallel'
    ],
  },
  {
    slug: "how-long-does-it-take-to-charge-a-battery-with-solar-panels",
    path: "/how-long-does-it-take-to-charge-a-battery-with-solar-panels",
    title: "How Long Does It Take to Charge a Battery With Solar Panels?",
    shortTitle: "Solar Battery Charge Time Guide",
    metaTitle: "How Long Does It Take to Charge a Battery With Solar Panels?",
    metaDescription:
      "Calculate solar battery charging time with our engineering calculator and guide covering peak sun hours, MPPT vs PWM efficiency, and battery chemistry.",
    cluster: "solar",
    parentCalculatorPath: "/solar-battery-calculator",
    scenarioLink: "/how-long-does-it-take-to-charge-a-battery-with-solar-panels#solar-charge-calculator",
    primaryKeyword: "solar panel charge time calculator",
    readingTime: "15 min read",
    datePublished: "2026-10-13",
    lastModified: "2026-10-13",
    heroImage: "/images/articles/how-long-does-it-take-to-charge-a-battery-with-solar-panels.webp",
    relatedCalculatorPaths: [
      '/solar-battery-calculator',
      '/solar-charge-controller-calculator',
      '/battery-capacity-calculator',
      '/solar-panel-tilt-calculator',
      '/voltage-drop-calculator'
    ],
    relatedGuidePaths: [
      '/solar-panels-series-vs-parallel',
      '/solar-charge-controller-calculator',
      '/how-long-will-a-100ah-battery-last',
      '/how-much-energy-does-a-solar-panel-produce'
    ],
  },
  {
    slug: "how-many-watts-can-a-15-amp-or-20-amp-circuit-handle",
    path: "/how-many-watts-can-a-15-amp-or-20-amp-circuit-handle",
    title: "How Many Watts on a 15-Amp or 20-Amp Circuit? Continuous Limits & Sizing",
    shortTitle: "15A vs 20A Circuit Wattage",
    metaTitle: "How Many Watts on a 15-Amp or 20-Amp Circuit?",
    metaDescription:
      "Calculate 15-amp and 20-amp circuit wattage at 120V. Understand the NEC 80% continuous load rule, wire gauge requirements, and space heater load planning.",
    cluster: "electricity",
    parentCalculatorPath: "/amps-to-watts-calculator",
    scenarioLink: "/amps-to-watts-calculator",
    primaryKeyword: "how many watts on a 15 amp circuit",
    readingTime: "13 min read",
    datePublished: "2026-10-17",
    lastModified: "2026-10-18",
    heroImage: "/images/articles/how-many-watts-can-a-15-amp-or-20-amp-circuit-handle.webp",
    relatedCalculatorPaths: [
      '/amps-to-watts-calculator',
      '/watts-to-amps-calculator',
      '/voltage-drop-calculator',
      '/electricity-cost-calculator',
      '/generator-size-calculator'
    ],
    relatedGuidePaths: [
      '/electricity-use-calculator',
      '/electricity-cost-calculator',
      '/what-is-a-watt-hour',
      '/generator-size-calculator'
    ],
  },
];

export interface CoreRouteRegistryEntry {
  path: "/" | "/calculators" | "/privacy" | "/terms" | "/about" | "/contact";
  title: string;
  metaTitle: string;
  metaDescription: string;
  lastModified: string;
}

export const CORE_ROUTE_REGISTRY: CoreRouteRegistryEntry[] = [
  {
    path: "/",
    title: "CalcMyPower | Power, Energy & Electrical Calculators",
    metaTitle: "CalcMyPower | Power, Energy & Electrical Calculators",
    metaDescription:
      "Size backup battery banks, convert watts to amps, and calculate generator wattage using transparent engineering formulas and NEC continuous-load standards.",
    lastModified: "2026-09-28",
  },
  {
    path: "/calculators",
    title: "Electrical & Power Calculators Directory",
    metaTitle: "Electrical & Power Calculators Directory",
    metaDescription:
      "Browse interactive electrical calculators and engineering sizing tools for backup generators, battery storage, solar PV, and AC/DC circuit conversions.",
    lastModified: "2026-09-28",
  },
  {
    path: "/privacy",
    title: "Privacy Policy",
    metaTitle: "Privacy Policy",
    metaDescription:
      "CalcMyPower privacy policy. Learn how we handle cookies, analytics, and advertising data in accordance with GDPR, CCPA, and Google AdSense guidelines.",
    lastModified: "2026-10-14",
  },
  {
    path: "/terms",
    title: "Terms of Service",
    metaTitle: "Terms of Service",
    metaDescription:
      "CalcMyPower terms of service. Review preliminary planning disclaimers, calculation limitations, intellectual property, and acceptable use guidelines.",
    lastModified: "2026-10-14",
  },
  {
    path: "/about",
    title: "About CalcMyPower",
    metaTitle: "About CalcMyPower | Engineering Calculators & Methodology",
    metaDescription:
      "Learn about CalcMyPower's mission, engineering calculation methodology, transparent formula baselines, and authoritative US standards (NEC, IEEE, NREL, DOE).",
    lastModified: "2026-10-14",
  },
  {
    path: "/contact",
    title: "Contact Us",
    metaTitle: "Contact Us | CalcMyPower Technical Support & Inquiries",
    metaDescription:
      "Contact the CalcMyPower engineering and publishing team for technical feedback, formula suggestions, errata corrections, or editorial inquiries.",
    lastModified: "2026-10-14",
  },
];

export function getAllIndexablePaths(): string[] {
  return [
    ...CORE_ROUTE_REGISTRY.map((r) => r.path),
    ...CALCULATOR_REGISTRY.map((c) => c.path),
    ...GUIDE_REGISTRY.map((g) => g.path),
  ];
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Formats a YYYY-MM-DD or ISO date string into human-readable US editorial date:
 * e.g., "2026-10-09" -> "October 9, 2026".
 * Deterministic string parsing prevents timezone drift across server and client.
 */
export function formatEditorialDate(dateStr: string): string {
  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return dateStr;
  const [, year, month, day] = match;
  const monthName = MONTH_NAMES[parseInt(month, 10) - 1];
  const dayNum = parseInt(day, 10);
  return `${monthName} ${dayNum}, ${year}`;
}

export function getGuideBySlug(slug: string): GuideRegistryEntry | undefined {
  return GUIDE_REGISTRY.find((g) => g.slug === slug);
}

export function getCalculatorBySlug(slugOrPath: string): CalculatorRegistryEntry | undefined {
  const normalized = slugOrPath.startsWith("/") ? slugOrPath.slice(1) : slugOrPath;
  return CALCULATOR_REGISTRY.find((c) => c.slug === normalized || c.path === slugOrPath);
}

