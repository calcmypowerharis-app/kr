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
    lastModified: "2026-09-28",
    relatedCalculatorPaths: [
      "/generator-amperage-chart-calculator",
      "/ups-battery-backup-calculator",
      "/watts-to-amps-calculator",
    ],
    relatedGuidePaths: [
      "/how-to-calculate-watts-for-a-generator",
      "/what-size-generator-do-i-need-for-my-house",
      "/what-size-generator-to-run-a-refrigerator",
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
    lastModified: "2026-09-28",
    relatedCalculatorPaths: [
      "/battery-capacity-calculator",
      "/watts-to-amps-calculator",
      "/generator-size-calculator",
    ],
    relatedGuidePaths: [
      "/how-long-will-a-100ah-battery-last",
      "/what-is-a-watt-hour",
      "/what-does-ah-mean-on-a-battery",
      "/what-size-generator-do-i-need-for-my-house",
    ],
  },
  {
    slug: "battery-capacity-calculator",
    path: "/battery-capacity-calculator",
    title: "Battery Capacity & Sizing Calculator",
    shortTitle: "Battery Capacity",
    metaTitle: "Battery Capacity Calculator (Ah to Wh & Sizing)",
    metaDescription:
      "Calculate battery capacity in Watt-hours (Wh) and Amp-hours (Ah). Estimate usable energy and size battery capacity for a load and runtime.",
    cluster: "ups-battery",
    secondaryClusters: ["electricity", "solar", "rv-power"],
    primaryKeyword: "battery capacity calculator",
    formula: "Wh = V × Ah | Wh_usable = Wh × DoD | Ah_req = (P × t) ÷ (V × η × DoD)",
    lastModified: "2026-09-29",
    relatedCalculatorPaths: [
      "/solar-battery-calculator",
      "/ups-battery-backup-calculator",
      "/watts-to-amps-calculator",
      "/amps-to-watts-calculator",
      "/solar-panel-tilt-calculator",
    ],
    relatedGuidePaths: [
      "/how-long-will-a-100ah-battery-last",
      "/what-does-ah-mean-on-a-battery",
      "/what-is-a-watt-hour",
      "/solar-panels-series-vs-parallel",
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
    lastModified: "2026-09-28",
    relatedCalculatorPaths: [
      "/amps-to-watts-calculator",
      "/three-phase-power-calculator",
      "/voltage-drop-calculator",
      "/battery-capacity-calculator",
      "/ups-battery-backup-calculator",
      "/solar-panel-tilt-calculator",
      "/generator-size-calculator",
    ],
    relatedGuidePaths: [
      "/how-to-calculate-electricity-usage",
      "/what-is-a-watt-hour",
      "/what-does-ah-mean-on-a-battery",
      "/what-size-generator-do-i-need-for-my-house",
      "/solar-panels-series-vs-parallel",
    ],
  },
  {
    slug: "amps-to-watts-calculator",
    path: "/amps-to-watts-calculator",
    title: "Amps to Watts Electrical Calculator",
    shortTitle: "Amps to Watts",
    metaTitle: "Amps to Watts Calculator (DC, 120V/240V AC & 3-Phase)",
    metaDescription:
      "Convert Amps to Watts with our electrical calculator. Calculate real power (W) and apparent power (VA) across DC, 120V/240V single-phase, and 3-phase circuits.",
    cluster: "electricity",
    secondaryClusters: ["generators", "ups-battery", "solar"],
    primaryKeyword: "amps to watts",
    formula: "P = I × V × PF | 3Φ: P = √3 × V × I × PF",
    lastModified: "2026-09-28",
    relatedCalculatorPaths: [
      "/watts-to-amps-calculator",
      "/three-phase-power-calculator",
      "/voltage-drop-calculator",
      "/battery-capacity-calculator",
      "/solar-panel-tilt-calculator",
      "/ups-battery-backup-calculator",
      "/generator-size-calculator",
    ],
    relatedGuidePaths: [
      "/how-to-calculate-electricity-usage",
      "/what-is-a-watt-hour",
      "/what-does-ah-mean-on-a-battery",
      "/what-size-generator-do-i-need-for-my-house",
      "/solar-panels-series-vs-parallel",
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
    lastModified: "2026-09-29",
    relatedCalculatorPaths: [
      "/solar-battery-calculator",
      "/battery-capacity-calculator",
      "/watts-to-amps-calculator",
      "/ups-battery-backup-calculator",
    ],
    relatedGuidePaths: [
      "/what-is-a-watt-hour",
      "/how-long-will-a-100ah-battery-last",
      "/solar-panels-series-vs-parallel",
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
    lastModified: "2026-09-30",
    relatedCalculatorPaths: [
      "/solar-charge-controller-calculator",
      "/solar-system-size-calculator",
      "/voltage-drop-calculator",
      "/battery-capacity-calculator",
      "/solar-panel-tilt-calculator",
      "/watts-to-amps-calculator",
      "/ups-battery-backup-calculator",
    ],
    relatedGuidePaths: [
      "/solar-panels-series-vs-parallel",
      "/how-long-will-a-100ah-battery-last",
      "/what-is-a-watt-hour",
    ],
  },
  {
    slug: "solar-charge-controller-calculator",
    path: "/solar-charge-controller-calculator",
    title: "Solar Charge Controller Calculator",
    shortTitle: "Charge Controller",
    metaTitle: "Solar Charge Controller Calculator (MPPT & PWM Sizing)",
    metaDescription:
      "Calculate the charge controller size needed for your solar panels. Sizing calculator for MPPT and PWM controllers based on array wattage, battery voltage, and Voc.",
    cluster: "solar",
    secondaryClusters: ["ups-battery", "rv-power"],
    primaryKeyword: "solar charge controller calculator",
    formula: "I_nom = P_arr ÷ V_bat | I_plan = I_nom × 1.20 | Voc_cold = Voc_STC × [1 + α × (T_min - 25°C)]",
    lastModified: "2026-10-01",
    relatedCalculatorPaths: [
      "/solar-battery-calculator",
      "/solar-system-size-calculator",
      "/voltage-drop-calculator",
      "/solar-panel-tilt-calculator",
      "/battery-capacity-calculator",
      "/watts-to-amps-calculator",
    ],
    relatedGuidePaths: [
      "/solar-panels-series-vs-parallel",
      "/what-is-a-watt-hour",
      "/what-does-ah-mean-on-a-battery",
    ],
  },
  {
    slug: "voltage-drop-calculator",
    path: "/voltage-drop-calculator",
    title: "Voltage Drop Calculator",
    shortTitle: "Voltage Drop",
    metaTitle: "Voltage Drop Calculator (AC & DC Wire Size Sizing)",
    metaDescription:
      "Calculate voltage drop for DC, single-phase, and three-phase circuits. Determine voltage loss, percentage drop, and receiving voltage based on current, distance, conductor material, and wire size.",
    cluster: "electricity",
    secondaryClusters: ["solar", "rv-power", "generators"],
    primaryKeyword: "voltage drop calculator",
    formula: "VD = multiplier × I × (L ÷ 1,000) × R | 1Φ: mult = 2 | 3Φ: mult = √3",
    lastModified: "2026-10-01",
    relatedCalculatorPaths: [
      "/watts-to-amps-calculator",
      "/amps-to-watts-calculator",
      "/three-phase-power-calculator",
      "/solar-battery-calculator",
      "/solar-charge-controller-calculator",
      "/solar-system-size-calculator",
    ],
    relatedGuidePaths: [
      "/solar-panels-series-vs-parallel",
      "/what-is-a-watt-hour",
      "/what-does-ah-mean-on-a-battery",
    ],
  },
  {
    slug: "solar-system-size-calculator",
    path: "/solar-system-size-calculator",
    title: "Solar System Size Calculator",
    shortTitle: "Solar System Size",
    metaTitle: "Solar System Size Calculator (How Many Solar Panels Do I Need?)",
    metaDescription:
      "Calculate the solar system size and number of solar panels needed for your home. Estimate required array kW, panel count, and roof space based on electricity usage and peak sun hours.",
    cluster: "solar",
    secondaryClusters: ["home-energy", "rv-power"],
    primaryKeyword: "solar system size calculator",
    formula: "P_array_kW = (E_daily × Offset%) ÷ (PSH × PR) | Panels = Math.ceil(P_array_W ÷ W_panel)",
    lastModified: "2026-10-01",
    relatedCalculatorPaths: [
      "/solar-battery-calculator",
      "/solar-charge-controller-calculator",
      "/solar-panel-tilt-calculator",
      "/voltage-drop-calculator",
      "/watts-to-amps-calculator",
    ],
    relatedGuidePaths: [
      "/how-much-energy-does-a-solar-panel-produce",
      "/how-many-solar-panels-do-i-need",
      "/solar-panels-series-vs-parallel",
      "/what-is-a-watt-hour",
      "/how-long-will-a-100ah-battery-last",
    ],
  },
  {
    slug: "three-phase-power-calculator",
    path: "/three-phase-power-calculator",
    title: "Three Phase Power Calculator",
    shortTitle: "Three Phase Power",
    metaTitle: "Three Phase Power Calculator (kW, Amps & Power Factor)",
    metaDescription:
      "Calculate 3-phase real power (kW), apparent power (kVA), and line current (Amps). Supports line-to-line (208V, 240V, 480V) and line-to-neutral voltages with power factor.",
    cluster: "electricity",
    secondaryClusters: ["generators", "solar"],
    primaryKeyword: "3 phase electrical power calculator",
    formula: "P = √3 × V_LL × I × PF | S = √3 × V_LL × I | I = P ÷ (√3 × V_LL × PF)",
    lastModified: "2026-10-01",
    relatedCalculatorPaths: [
      "/watts-to-amps-calculator",
      "/amps-to-watts-calculator",
      "/voltage-drop-calculator",
      "/generator-size-calculator",
      "/solar-system-size-calculator",
    ],
    relatedGuidePaths: [
      "/what-is-a-watt-hour",
      "/what-size-generator-do-i-need-for-my-house",
      "/solar-panels-series-vs-parallel",
    ],
  },
  {
    slug: "electricity-use-calculator",
    path: "/electricity-use-calculator",
    title: "Electricity Use Calculator",
    shortTitle: "Electricity Use",
    metaTitle: "Electricity Use Calculator (Calculate kWh & Energy Consumption)",
    metaDescription:
      "Calculate appliance electricity use in Wh and kWh from watts, hours, and usage frequency. Estimate daily and monthly energy consumption and optional utility costs.",
    cluster: "electricity",
    secondaryClusters: ["home-energy", "solar", "ups-battery"],
    primaryKeyword: "electricity use calculator",
    formula: "Daily Wh = W × Hours × Qty | Daily kWh = Wh ÷ 1,000 | Monthly kWh = (Daily kWh) × Days",
    lastModified: "2026-10-03",
    relatedCalculatorPaths: [
      "/watts-to-amps-calculator",
      "/amps-to-watts-calculator",
      "/battery-capacity-calculator",
      "/solar-system-size-calculator",
      "/generator-size-calculator",
    ],
    relatedGuidePaths: [
      "/how-to-calculate-electricity-usage",
      "/what-is-a-watt-hour",
      "/how-many-solar-panels-do-i-need",
    ],
  },
  {
    slug: "generator-amperage-chart-calculator",
    path: "/generator-amperage-chart-calculator",
    title: "Generator Amperage Chart & Electrical Calculator",
    shortTitle: "Generator Amperage Chart",
    metaTitle: "Generator Amperage Chart & Calculator (120V & 240V Amps)",
    metaDescription:
      "Calculate generator amperage output at 120V and 240V. Includes a complete generator amp chart from 1kW to 26kW, wire gauge recommendations, and 80% continuous load limits.",
    cluster: "generators",
    secondaryClusters: ["electricity"],
    primaryKeyword: "generator amperage chart",
    formula: "I = P ÷ (V × PF) | 3Φ: I = P ÷ (√3 × V × PF) | Continuous: I × 0.80",
    lastModified: "2026-10-04",
    relatedCalculatorPaths: [
      "/generator-size-calculator",
      "/watts-to-amps-calculator",
      "/amps-to-watts-calculator",
      "/voltage-drop-calculator",
      "/three-phase-power-calculator",
    ],
    relatedGuidePaths: [
      "/how-to-calculate-watts-for-a-generator",
      "/what-size-generator-do-i-need-for-my-house",
      "/what-size-generator-to-run-a-refrigerator",
      "/what-is-a-watt-hour",
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
      "Calculate the generator size you need for your house based on running watts, motor startup surges, and essential circuits rather than misleading square-footage rules.",
    cluster: "generators",
    parentCalculatorPath: "/generator-size-calculator",
    scenarioLink: "/generator-size-calculator?scenario=winter-essentials",
    primaryKeyword: "what size generator do i need for my house",
    readingTime: "11 min read",
    datePublished: "2026-09-27",
    lastModified: "2026-09-28",
    heroImage: "/images/articles/standby-generator-home-installation.jpg",
    relatedCalculatorPaths: [
      "/generator-size-calculator",
      "/watts-to-amps-calculator",
      "/ups-battery-backup-calculator",
    ],
    relatedGuidePaths: ["/what-size-generator-to-run-a-refrigerator"],
  },
  {
    slug: "what-size-generator-to-run-a-refrigerator",
    path: "/what-size-generator-to-run-a-refrigerator",
    title: "What Size Generator Do I Need to Run a Refrigerator?",
    shortTitle: "Refrigerator Generator Sizing Guide",
    metaTitle: "What Size Generator to Run a Refrigerator? Sizing Guide",
    metaDescription:
      "Determine what size generator you need to run a refrigerator during a power outage based on running watts, compressor startup surge, and simultaneous household loads.",
    cluster: "generators",
    parentCalculatorPath: "/generator-size-calculator",
    scenarioLink: "/generator-size-calculator?scenario=refrigerator-outage",
    primaryKeyword: "what size generator to run a refrigerator",
    readingTime: "10 min read",
    datePublished: "2026-09-27",
    lastModified: "2026-09-28",
    heroImage: "/images/articles/residential-refrigerator-kitchen.jpg",
    relatedCalculatorPaths: [
      "/generator-size-calculator",
      "/watts-to-amps-calculator",
      "/ups-battery-backup-calculator",
    ],
    relatedGuidePaths: ["/what-size-generator-do-i-need-for-my-house"],
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
    heroImage: "/images/articles/deep-cycle-battery-amp-hours.jpg",
    relatedCalculatorPaths: [
      "/battery-capacity-calculator",
      "/ups-battery-backup-calculator",
      "/watts-to-amps-calculator",
      "/amps-to-watts-calculator",
    ],
    relatedGuidePaths: [
      "/how-long-will-a-100ah-battery-last",
      "/what-is-a-watt-hour",
      "/what-size-generator-do-i-need-for-my-house",
      "/what-size-generator-to-run-a-refrigerator",
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
    heroImage: "/images/articles/watt-hour-energy-monitor.jpg",
    relatedCalculatorPaths: [
      "/battery-capacity-calculator",
      "/ups-battery-backup-calculator",
      "/watts-to-amps-calculator",
      "/amps-to-watts-calculator",
    ],
    relatedGuidePaths: [
      "/how-to-calculate-electricity-usage",
      "/how-long-will-a-100ah-battery-last",
      "/what-does-ah-mean-on-a-battery",
      "/what-size-generator-do-i-need-for-my-house",
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
    heroImage: "/images/articles/12v-100ah-battery-runtime-comparison.jpg",
    relatedCalculatorPaths: [
      "/ups-battery-backup-calculator",
      "/battery-capacity-calculator",
      "/watts-to-amps-calculator",
      "/generator-size-calculator",
    ],
    relatedGuidePaths: [
      "/what-does-ah-mean-on-a-battery",
      "/what-is-a-watt-hour",
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
    lastModified: "2026-09-30",
    heroImage: "/images/articles/solar-panels-series-vs-parallel-wiring.webp",
    relatedCalculatorPaths: [
      "/solar-charge-controller-calculator",
      "/solar-panel-tilt-calculator",
      "/battery-capacity-calculator",
      "/watts-to-amps-calculator",
      "/amps-to-watts-calculator",
    ],
    relatedGuidePaths: [
      "/how-long-will-a-100ah-battery-last",
      "/what-is-a-watt-hour",
    ],
  },
  {
    slug: "how-many-solar-panels-do-i-need",
    path: "/how-many-solar-panels-do-i-need",
    title: "How Many Solar Panels Do I Need to Power My House?",
    shortTitle: "Solar Panel Sizing Guide",
    metaTitle: "How Many Solar Panels Do I Need to Power My House?",
    metaDescription:
      "Learn how to estimate how many solar panels your home needs using electricity usage, peak sun hours, system performance, and panel wattage. Includes examples and a free solar sizing calculator.",
    cluster: "solar",
    parentCalculatorPath: "/solar-system-size-calculator",
    scenarioLink: "/solar-system-size-calculator",
    primaryKeyword: "how many solar panels do i need to power my house",
    readingTime: "14 min read",
    datePublished: "2026-10-01",
    lastModified: "2026-10-01",
    heroImage: "/images/articles/how-many-solar-panels-do-i-need.webp",
    relatedCalculatorPaths: [
      "/solar-system-size-calculator",
      "/solar-battery-calculator",
      "/solar-charge-controller-calculator",
      "/solar-panel-tilt-calculator",
      "/voltage-drop-calculator",
    ],
    relatedGuidePaths: [
      "/solar-panels-series-vs-parallel",
      "/what-is-a-watt-hour",
    ],
  },
  {
    slug: "how-much-energy-does-a-solar-panel-produce",
    path: "/how-much-energy-does-a-solar-panel-produce",
    title: "How Much Energy Does a Solar Panel Produce? 400W Panel Examples",
    shortTitle: "Solar Panel Energy Production Guide",
    metaTitle: "How Much Energy Does a Solar Panel Produce? 400W Panel Examples",
    metaDescription:
      "Learn how much electricity a solar panel can produce per day and month. See 400W panel examples, peak sun hours, system losses, and the factors that affect solar output.",
    cluster: "solar",
    parentCalculatorPath: "/solar-system-size-calculator",
    scenarioLink: "/solar-system-size-calculator",
    primaryKeyword: "how much energy does a solar panel produce",
    readingTime: "14 min read",
    datePublished: "2026-10-01",
    lastModified: "2026-10-01",
    heroImage: "/images/articles/how-much-energy-does-a-solar-panel-produce.webp",
    relatedCalculatorPaths: [
      "/solar-system-size-calculator",
      "/solar-panel-tilt-calculator",
      "/solar-battery-calculator",
      "/solar-charge-controller-calculator",
      "/voltage-drop-calculator",
    ],
    relatedGuidePaths: [
      "/how-many-solar-panels-do-i-need",
      "/solar-panels-series-vs-parallel",
      "/what-is-a-watt-hour",
    ],
  },
  {
    slug: "how-to-calculate-electricity-usage",
    path: "/how-to-calculate-electricity-usage",
    title: "How to Calculate Electricity Usage: kWh, Appliance Audits & Costs",
    shortTitle: "Calculate Electricity Usage",
    metaTitle: "How to Calculate Electricity Usage (kWh, Appliance Audits & Cost)",
    metaDescription:
      "Learn how to calculate electricity usage for appliances and your entire home. Master Watt-hours, kWh conversions, duty cycles, standby power, and electric bill cost calculations.",
    cluster: "electricity",
    parentCalculatorPath: "/electricity-use-calculator",
    scenarioLink: "/electricity-use-calculator",
    primaryKeyword: "how to calculate electricity usage",
    readingTime: "15 min read",
    datePublished: "2026-10-03",
    lastModified: "2026-10-03",
    heroImage: "/images/articles/how-to-calculate-electricity-usage.webp",
    relatedCalculatorPaths: [
      "/electricity-use-calculator",
      "/watts-to-amps-calculator",
      "/amps-to-watts-calculator",
      "/battery-capacity-calculator",
      "/solar-system-size-calculator",
      "/generator-size-calculator",
    ],
    relatedGuidePaths: [
      "/what-is-a-watt-hour",
      "/how-many-solar-panels-do-i-need",
      "/how-much-energy-does-a-solar-panel-produce",
    ],
  },
  {
    slug: "how-to-calculate-watts-for-a-generator",
    path: "/how-to-calculate-watts-for-a-generator",
    title: "How to Calculate Watts for a Generator: Running & Starting Watts Explained",
    shortTitle: "Calculate Watts for Generator",
    metaTitle: "How to Calculate Watts for a Generator: Running & Starting Watts",
    metaDescription:
      "Learn how to calculate watts for a generator during power outages. Master running vs starting watts, locked rotor surge inrush, 25% safety margins, and worked examples.",
    cluster: "generators",
    parentCalculatorPath: "/generator-size-calculator",
    scenarioLink: "/generator-size-calculator?scenario=winter-essentials",
    primaryKeyword: "calculating watts for generator",
    readingTime: "14 min read",
    datePublished: "2026-10-04",
    lastModified: "2026-10-04",
    heroImage: "/images/articles/how-to-calculate-watts-for-a-generator.webp",
    relatedCalculatorPaths: [
      "/generator-size-calculator",
      "/generator-amperage-chart-calculator",
      "/watts-to-amps-calculator",
      "/voltage-drop-calculator",
    ],
    relatedGuidePaths: [
      "/what-size-generator-do-i-need-for-my-house",
      "/what-size-generator-to-run-a-refrigerator",
      "/how-to-calculate-electricity-usage",
      "/what-is-a-watt-hour",
    ],
  },
];

export interface CoreRouteRegistryEntry {
  path: "/" | "/calculators";
  title: string;
  lastModified: string;
}

export const CORE_ROUTE_REGISTRY: CoreRouteRegistryEntry[] = [
  {
    path: "/",
    title: "CalcMyPower | Power, Energy & Electrical Calculators",
    lastModified: "2026-09-28",
  },
  {
    path: "/calculators",
    title: "Electrical & Power Calculators Directory",
    lastModified: "2026-09-28",
  },
];

export function getAllIndexablePaths(): string[] {
  return [
    ...CORE_ROUTE_REGISTRY.map((r) => r.path),
    ...CALCULATOR_REGISTRY.map((c) => c.path),
    ...GUIDE_REGISTRY.map((g) => g.path),
  ];
}
