/**
 * Central SEO Route, Topical Cluster & Content Registry
 * CalcMyPower.com
 *
 * Single source of truth for sitemaps, internal linking, cluster hierarchy,
 * and automated SEO verification tests.
 */

export const SITE_URL = "https://calcmypower.com";
export const SITE_NAME = "CalcMyPower";
export const DEFAULT_AUTHOR_NAME = "CalcMyPower Technical Publishing";
export const DEFAULT_AUTHOR_URL = `${SITE_URL}/about`;

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
    metaTitle: "Generator Fuel Consumption Calculator",
    metaDescription: "Track generator fuel burn in gal/hr and tank runtime for gas, propane, and diesel backup sets under load.",
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
    metaTitle: "Generator Size Calculator: Running Watts",
    metaDescription:
      "Size a backup generator for running watts, motor surge, and NEC 125% headroom to keep pumps and AC running.",
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
    metaTitle: "UPS Battery Backup Runtime Calculator",
    metaDescription:
      "Find true UPS backup runtime for routers, CPAP gear, and PCs after inverter idle draw and usable battery DoD.",
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
      '/what-size-generator-do-i-need-for-my-house',
      '/how-many-amp-hours-do-i-need'
    ],
  },
  {
    slug: "battery-capacity-calculator",
    path: "/battery-capacity-calculator",
    title: "Battery Capacity & Sizing Calculator",
    shortTitle: "Battery Capacity",
    metaTitle: "Battery Capacity Calculator: Ah & Wh Sizing",
    metaDescription:
      "Size 12V, 24V, and 48V battery banks in Ah and Wh with usable DoD limits for LiFePO4 and lead-acid storage.",
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
    metaTitle: "Watts to Amps Calculator: 120V, 240V, DC",
    metaDescription:
      "Find circuit current in amps across 12V DC, 120V, 240V, and 3-phase power with NEC 125% breaker sizing rules.",
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
      '/generator-size-calculator',
      '/electricity-use-calculator'
    ],
    relatedGuidePaths: [
      '/what-is-a-watt-hour',
      '/what-does-ah-mean-on-a-battery',
      '/what-size-generator-do-i-need-for-my-house',
      '/solar-panels-series-vs-parallel',
      '/how-many-watts-can-a-15-amp-or-20-amp-circuit-handle'
    ],
  },
  {
    slug: "amps-to-watts-calculator",
    path: "/amps-to-watts-calculator",
    title: "Amps to Watts Electrical Calculator",
    shortTitle: "Amps to Watts",
    metaTitle: "Amps to Watts Calculator: 120V, 240V, DC",
    metaDescription:
      "Find real power in watts and kW across 12V DC, 120V, and 240V AC circuits with the NEC 80% continuous limit.",
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
      '/generator-size-calculator',
      '/electricity-use-calculator'
    ],
    relatedGuidePaths: [
      '/what-is-a-watt-hour',
      '/what-does-ah-mean-on-a-battery',
      '/what-size-generator-do-i-need-for-my-house',
      '/solar-panels-series-vs-parallel',
      '/how-many-watts-can-a-15-amp-or-20-amp-circuit-handle'
    ],
  },
  {
    slug: "solar-panel-tilt-calculator",
    path: "/solar-panel-tilt-calculator",
    title: "Solar Panel Tilt Angle Calculator",
    shortTitle: "Solar Panel Tilt",
    metaTitle: "Solar Panel Tilt & Angle Calculator",
    metaDescription:
      "Find optimal solar panel tilt angles by latitude with seasonal adjustments and roof pitch slope conversions.",
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
    metaTitle: "Solar Battery Storage Sizing Calculator",
    metaDescription:
      "Size solar battery storage in kWh and Ah from daily energy use, autonomy days, and inverter efficiency.",
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
      '/how-long-does-it-take-to-charge-a-battery-with-solar-panels',
      '/how-many-amp-hours-do-i-need'
    ],
  },
  {
    slug: "solar-charge-controller-calculator",
    path: "/solar-charge-controller-calculator",
    title: "Solar Charge Controller Calculator",
    shortTitle: "Charge Controller",
    metaTitle: "Solar Charge Controller Sizing Calculator",
    metaDescription:
      
      "Size MPPT and PWM charge controllers in amps with NEC 125% margins and cold-morning array Voc headroom.",
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
    metaTitle: "Voltage Drop Calculator: Wire Sizing Tool",
    metaDescription:
      "Find wire gauge voltage drop and percentage loss across 120V, 240V, and DC runs to maintain NEC 3% limits.",
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
      '/what-does-ah-mean-on-a-battery',
      '/how-many-watts-can-a-15-amp-or-20-amp-circuit-handle'
    ],
  },
  {
    slug: "solar-system-size-calculator",
    path: "/solar-system-size-calculator",
    title: "Solar System Size Calculator",
    shortTitle: "Solar System Size",
    metaTitle: "Solar System Size Calculator: kW & Panels",
    metaDescription:
      "Size rooftop solar arrays in kW and panel count from monthly kWh use, peak sun hours, and derate factors.",
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
    metaTitle: "Three-Phase Power Calculator: kW, kVA, Amps",
    metaDescription:
      "Solve 3-phase power in kW, kVA, and line current across 208V, 240V, and 480V balanced industrial circuits.",
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
      '/solar-panels-series-vs-parallel',
      '/how-many-watts-can-a-15-amp-or-20-amp-circuit-handle'
    ],
  },
  {
    slug: "electricity-use-calculator",
    path: "/electricity-use-calculator",
    title: "Electricity Usage Calculator",
    shortTitle: "Electricity Usage",
    metaTitle: "Electricity Usage Calculator: Appliance kWh",
    metaDescription:
      "Track appliance electricity use in daily and monthly kWh from operating wattage, run hours, and duty cycles.",
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
      '/what-is-a-watt-hour',
      '/how-many-watts-can-a-15-amp-or-20-amp-circuit-handle'
    ],
  },
  {
    slug: "electricity-cost-calculator",
    path: "/electricity-cost-calculator",
    title: "Electricity Cost Calculator",
    shortTitle: "Electricity Cost",
    metaTitle: "Electricity Cost Calculator: Bill Estimator",
    metaDescription:
      "Estimate electric utility bills and true cost per kWh from energy usage, monthly fixed fees, and local taxes.",
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
      '/what-is-a-watt-hour',
      '/how-many-watts-can-a-15-amp-or-20-amp-circuit-handle'
    ],
  },
  {
    slug: "inverter-size-calculator",
    path: "/inverter-size-calculator",
    title: "Inverter Size Calculator",
    shortTitle: "Inverter Size",
    metaTitle: "Inverter Size Calculator: Watts & Surge",
    metaDescription:
      "Size power inverters in continuous and surge watts with DC battery cable gauge (AWG) and fuse ratings.",
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
    metaTitle: "What Size Generator Do I Need for My House?",
    metaDescription:
      "Compare essential vs whole-house generator wattage, motor surge inrush, and avoid square-foot sizing traps.",
    cluster: "generators",
    parentCalculatorPath: "/generator-size-calculator",
    scenarioLink: "/generator-size-calculator",
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
    metaTitle: "What Size Generator to Run a Refrigerator?",
    metaDescription:
      "Find generator wattage to run a refrigerator during outages from compressor startup surge and household loads.",
    cluster: "generators",
    parentCalculatorPath: "/generator-size-calculator",
    scenarioLink: "/generator-size-calculator",
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
    metaTitle: "What Does Ah Mean on a Battery? (Amp-Hours)",
    metaDescription:
      "Learn what battery Amp-hours (Ah) mean, convert Ah to Wh, and see how discharge rate affects usable capacity.",
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
      '/how-many-amp-hours-do-i-need',
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
    metaTitle: "What Is a Watt-Hour (Wh)? Watts vs Wh Guide",
    metaDescription:
      "Learn what a Watt-hour (Wh) measures, the difference between Watts vs Wh, and how energy determines runtime.",
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
      '/amps-to-watts-calculator',
      '/electricity-use-calculator'
    ],
    relatedGuidePaths: [
      '/how-long-will-a-100ah-battery-last',
      '/what-does-ah-mean-on-a-battery',
      '/how-many-amp-hours-do-i-need',
      '/how-many-watts-can-a-15-amp-or-20-amp-circuit-handle',
      '/what-size-generator-do-i-need-for-my-house'
    ],
  },
  {
    slug: "how-long-will-a-100ah-battery-last",
    path: "/how-long-will-a-100ah-battery-last",
    title: "How Long Will a 100Ah Battery Last? 12V Appliance Runtime Guide",
    shortTitle: "100Ah Battery Runtime Guide",
    metaTitle: "How Long Will a 12V 100Ah Battery Last?",
    metaDescription:
      "Realistic 12V 100Ah battery runtime hours for fridges, TVs, and CPAPs across LiFePO4 vs lead-acid chemistry.",
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
      '/what-does-ah-mean-on-a-battery',
      '/what-is-a-watt-hour'
    ],
  },
  {
    slug: "solar-panels-series-vs-parallel",
    path: "/solar-panels-series-vs-parallel",
    title: "Solar Panels in Series vs Parallel: Wiring, Voltage & Current Explained",
    shortTitle: "Solar Panels in Series vs Parallel",
    metaTitle: "Solar Panels in Series vs Parallel: Wiring",
    metaDescription:
      "Compare solar panels in series vs parallel with wiring schematics, array voltage, current, and MPPT limits.",
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
    metaTitle: "How Much Energy Does a Solar Panel Produce?",
    metaDescription:
      "Daily and monthly kWh output for 400W solar panels based on peak sun hours, tilt, and real system losses.",
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
      '/solar-panels-series-vs-parallel',
      '/how-long-does-it-take-to-charge-a-battery-with-solar-panels',
      '/what-is-a-watt-hour'
    ],
  },
  {
    slug: "how-many-amp-hours-do-i-need",
    path: "/how-many-amp-hours-do-i-need",
    title: "How Many Amp Hours Do I Need for a Battery Bank?",
    shortTitle: "Battery Bank Sizing Guide",
    metaTitle: "How Many Amp Hours Do I Need for a Battery?",
    metaDescription:
      "Size battery bank capacity in amp-hours (Ah) using daily watt-hours, system voltage, autonomy, and DoD limits.",
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
    metaTitle: "Solar Battery Charge Time Calculator & Guide",
    metaDescription:
      "Solar battery charge times in hours based on panel wattage, peak sun hours, MPPT efficiency, and battery type.",
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
      "Safe wattage limits for 15A and 20A 120V circuits under the NEC 80% continuous load rule and wire gauge sizes.",
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
      '/electricity-use-calculator',
      '/generator-size-calculator'
    ],
    relatedGuidePaths: [
      '/what-is-a-watt-hour',
      '/solar-panels-series-vs-parallel',
      '/what-size-generator-do-i-need-for-my-house'
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
    metaTitle: "About Us: Mission & Engineering Standards",
    metaDescription:
      "Learn about CalcMyPower's mission, engineering calculation methodology, transparent formula baselines, and authoritative US standards (NEC, IEEE, NREL, DOE).",
    lastModified: "2026-10-14",
  },
  {
    path: "/contact",
    title: "Contact Us",
    metaTitle: "Contact Us: Support & Editorial Inquiries",
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

