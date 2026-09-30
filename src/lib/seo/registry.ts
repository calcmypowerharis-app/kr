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
      "/ups-battery-backup-calculator",
      "/watts-to-amps-calculator",
    ],
    relatedGuidePaths: [
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
      "/battery-capacity-calculator",
      "/ups-battery-backup-calculator",
      "/solar-panel-tilt-calculator",
      "/generator-size-calculator",
    ],
    relatedGuidePaths: [
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
      "/battery-capacity-calculator",
      "/solar-panel-tilt-calculator",
      "/ups-battery-backup-calculator",
      "/generator-size-calculator",
    ],
    relatedGuidePaths: [
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
      "/watts-to-amps-calculator",
      "/amps-to-watts-calculator",
      "/solar-panel-tilt-calculator",
      "/battery-capacity-calculator",
    ],
    relatedGuidePaths: [
      "/how-long-will-a-100ah-battery-last",
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
