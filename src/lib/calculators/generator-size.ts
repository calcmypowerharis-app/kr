/**
 * Generator Size Calculator Logic
 * Pure TypeScript — Decoupled from React and DOM
 * CalcMyPower.com
 *
 * Four-Step Documented Planning Methodology:
 * Step 1: Total Running Watts = Σ(quantity × runningWatts)
 * Step 2: Largest Additional Starting Watts = max(0, startingWatts - runningWatts) across active loads
 * Step 3: Peak Starting Demand = Total Running Watts + Largest Additional Starting Watts
 * Step 4: CalcMyPower Planning Capacity = Peak Starting Demand × 1.25 (CalcMyPower planning headroom factor)
 *
 * Explicit Model Limitation:
 * "This practical planning model assumes that only one significant motor-driven load starts at a time.
 * If multiple large motors can start simultaneously, generator sizing may require a more detailed manufacturer or engineering analysis."
 */

export type ApplianceCategory =
  | "hvac"
  | "kitchen"
  | "water_pumps"
  | "electronics"
  | "rv"
  | "tools"
  | "other";

export interface ApplianceDefinition {
  id: string;
  name: string;
  category: ApplianceCategory;
  defaultRunningWatts: number;
  defaultStartingWatts: number;
  hasMotorSurge: boolean;
  notes?: string;
}

export interface SelectedAppliance {
  id: string;
  name: string;
  category: ApplianceCategory;
  quantity: number;
  runningWatts: number;
  startingWatts: number;
  isCustom?: boolean;
}

export interface GeneratorSizeInputs {
  appliances: SelectedAppliance[];
  /** Illustrative Power Factor (typically 0.80 for standby generators, 1.0 for inverter generators) */
  powerFactor?: number;
}

export interface GeneratorSizeOutputs {
  /** Total continuous running wattage across all selected appliances */
  totalRunningWatts: number;
  /** Single largest starting surge delta: max(startingWatts - runningWatts) among active loads */
  largestAdditionalStartingWatts: number;
  /** Name of the active appliance driving the largest startup event */
  surgeDriverName: string | null;
  /** Peak momentary starting demand: running watts + single largest surge delta */
  peakStartingDemand: number;
  /** CalcMyPower Planning Capacity: peak demand × 1.25 planning headroom factor */
  planningCapacityWatts: number;
  /** Active power in kilowatts based on planning capacity */
  planningKw: number;
  /** Apparent power in kVA based on planning capacity (kW_planning / PF) */
  planningKva: number;
  /** Continuous running apparent power in kVA (kW_running / PF) */
  runningKva: number;
  /** Momentary peak apparent power in kVA (kW_peak / PF) */
  peakKva: number;
  /** Power factor used for apparent power conversions (annotated as assumption) */
  powerFactorUsed: number;
  /** Non-silent validation errors for invalid inputs */
  errors: string[];
  /** Engineering warnings for extreme or edge conditions */
  warnings: string[];
  /** Whether the calculation represents a valid physical state */
  isValid: boolean;
}

/**
 * Standard category definitions with friendly labels
 */
export const APPLIANCE_CATEGORIES: { id: ApplianceCategory; label: string }[] = [
  { id: "hvac", label: "HVAC & Heating" },
  { id: "kitchen", label: "Kitchen & Cooking" },
  { id: "water_pumps", label: "Water & Pumps" },
  { id: "electronics", label: "Electronics & Lighting" },
  { id: "rv", label: "RV & Camping" },
  { id: "tools", label: "Workshop & Tools" },
  { id: "other", label: "Other / Custom" },
];

/**
 * Comprehensive appliance database with practical US default ratings.
 * Within each category, high-impact and common appliances are prioritized at the top.
 */
export const DEFAULT_APPLIANCES: ApplianceDefinition[] = [
  // HVAC
  {
    id: "central_ac_4ton",
    name: "Central Air Conditioner (4-Ton / 48,000 BTU)",
    category: "hvac",
    defaultRunningWatts: 4500,
    defaultStartingWatts: 13500,
    hasMotorSurge: true,
    notes: "Requires large standby generator or soft-starter",
  },
  {
    id: "central_ac_3ton",
    name: "Central Air Conditioner (3-Ton / 36,000 BTU)",
    category: "hvac",
    defaultRunningWatts: 3500,
    defaultStartingWatts: 10000,
    hasMotorSurge: true,
    notes: "High compressor startup inrush",
  },
  {
    id: "window_ac_12k",
    name: "Window Air Conditioner (12,000 BTU)",
    category: "hvac",
    defaultRunningWatts: 1200,
    defaultStartingWatts: 2800,
    hasMotorSurge: true,
    notes: "Living area cooling",
  },
  {
    id: "space_heater",
    name: "Portable Electric Space Heater",
    category: "hvac",
    defaultRunningWatts: 1500,
    defaultStartingWatts: 1500,
    hasMotorSurge: false,
    notes: "Pure resistive continuous load (12.5A @ 120V)",
  },
  {
    id: "window_ac_8k",
    name: "Window Air Conditioner (8,000 BTU)",
    category: "hvac",
    defaultRunningWatts: 800,
    defaultStartingWatts: 1800,
    hasMotorSurge: true,
    notes: "Bedroom cooling unit",
  },
  {
    id: "furnace_blower_half_hp",
    name: "Furnace Fan Blower (Gas/Oil Heat, 1/2 HP)",
    category: "hvac",
    defaultRunningWatts: 800,
    defaultStartingWatts: 2300,
    hasMotorSurge: true,
    notes: "Winter heat distribution motor",
  },

  // Kitchen
  {
    id: "electric_range_burner",
    name: "Electric Range / Cooktop (Single Burner)",
    category: "kitchen",
    defaultRunningWatts: 1500,
    defaultStartingWatts: 1500,
    hasMotorSurge: false,
    notes: "Pure resistive heavy draw",
  },
  {
    id: "dishwasher",
    name: "Dishwasher",
    category: "kitchen",
    defaultRunningWatts: 1500,
    defaultStartingWatts: 2000,
    hasMotorSurge: true,
    notes: "Pump motor plus internal drying element",
  },
  {
    id: "microwave_oven",
    name: "Microwave Oven (1,000W Cooking Power)",
    category: "kitchen",
    defaultRunningWatts: 1200,
    defaultStartingWatts: 1500,
    hasMotorSurge: true,
    notes: "Magnetron transformer inrush",
  },
  {
    id: "coffee_maker",
    name: "Electric Coffee Maker (Drip)",
    category: "kitchen",
    defaultRunningWatts: 1000,
    defaultStartingWatts: 1000,
    hasMotorSurge: false,
    notes: "Pure resistive heating element",
  },
  {
    id: "toaster_2slice",
    name: "Toaster (2-Slice)",
    category: "kitchen",
    defaultRunningWatts: 850,
    defaultStartingWatts: 850,
    hasMotorSurge: false,
    notes: "Pure resistive heating element",
  },
  {
    id: "older_refrigerator_freezer",
    name: "Older Refrigerator / Deep Freezer",
    category: "kitchen",
    defaultRunningWatts: 400,
    defaultStartingWatts: 1600,
    hasMotorSurge: true,
    notes: "Older reciprocating compressor with high LRA",
  },
  {
    id: "refrigerator_freezer_modern",
    name: "Refrigerator / Freezer (Modern Energy Star)",
    category: "kitchen",
    defaultRunningWatts: 180,
    defaultStartingWatts: 1200,
    hasMotorSurge: true,
    notes: "Compressor inrush lasts 1–3 seconds",
  },

  // Water & Pumps
  {
    id: "water_heater_electric",
    name: "Electric Water Heater (40–50 Gallon)",
    category: "water_pumps",
    defaultRunningWatts: 4500,
    defaultStartingWatts: 4500,
    hasMotorSurge: false,
    notes: "Pure resistive 240V massive continuous load",
  },
  {
    id: "well_pump_1hp",
    name: "Submersible Well Pump (1 HP, 240V)",
    category: "water_pumps",
    defaultRunningWatts: 2000,
    defaultStartingWatts: 4500,
    hasMotorSurge: true,
    notes: "Starts against deep well water head pressure",
  },
  {
    id: "well_pump_half_hp",
    name: "Submersible Well Pump (1/2 HP, 240V)",
    category: "water_pumps",
    defaultRunningWatts: 1000,
    defaultStartingWatts: 2500,
    hasMotorSurge: true,
    notes: "Common residential deep well pump",
  },
  {
    id: "sump_pump_half_hp",
    name: "Sump Pump (1/2 HP)",
    category: "water_pumps",
    defaultRunningWatts: 1050,
    defaultStartingWatts: 2200,
    hasMotorSurge: true,
    notes: "High-capacity basement flood prevention",
  },
  {
    id: "sump_pump_third_hp",
    name: "Sump Pump (1/3 HP)",
    category: "water_pumps",
    defaultRunningWatts: 800,
    defaultStartingWatts: 1800,
    hasMotorSurge: true,
    notes: "Standard residential basement sump pump",
  },

  // Electronics & Lighting
  {
    id: "garage_door_opener",
    name: "Garage Door Opener (1/2 HP)",
    category: "electronics",
    defaultRunningWatts: 550,
    defaultStartingWatts: 1400,
    hasMotorSurge: true,
    notes: "Heavy initial mechanical lifting torque",
  },
  {
    id: "gaming_pc_monitor",
    name: "Desktop Gaming PC & Monitor",
    category: "electronics",
    defaultRunningWatts: 450,
    defaultStartingWatts: 450,
    hasMotorSurge: false,
    notes: "Power supply draw under load",
  },
  {
    id: "television_led_65",
    name: '55"–65" LED Television',
    category: "electronics",
    defaultRunningWatts: 120,
    defaultStartingWatts: 120,
    hasMotorSurge: false,
    notes: "Low steady-state electronic draw",
  },
  {
    id: "laptop_computer",
    name: "Laptop / Workstation Computer",
    category: "electronics",
    defaultRunningWatts: 100,
    defaultStartingWatts: 100,
    hasMotorSurge: false,
    notes: "Switch-mode power supply",
  },
  {
    id: "medical_cpap",
    name: "Medical CPAP Machine",
    category: "electronics",
    defaultRunningWatts: 60,
    defaultStartingWatts: 60,
    hasMotorSurge: false,
    notes: "Critical medical equipment; requires clean THD (<3%)",
  },
  {
    id: "led_lighting_room",
    name: "LED Home Lighting (Per Room, 4 Bulbs)",
    category: "electronics",
    defaultRunningWatts: 40,
    defaultStartingWatts: 40,
    hasMotorSurge: false,
    notes: "High efficiency; minimal starting inrush",
  },
  {
    id: "wifi_router_modem",
    name: "Wi-Fi Router & Modem",
    category: "electronics",
    defaultRunningWatts: 25,
    defaultStartingWatts: 25,
    hasMotorSurge: false,
    notes: "Constant communication equipment draw",
  },
  {
    id: "smart_phone_charger",
    name: "Smart Phone Charger (USB-C Fast Charger)",
    category: "electronics",
    defaultRunningWatts: 15,
    defaultStartingWatts: 15,
    hasMotorSurge: false,
    notes: "Low power electronic charger",
  },

  // RV & Camping
  {
    id: "rv_rooftop_ac_15k",
    name: "RV Rooftop Air Conditioner (15,000 BTU)",
    category: "rv",
    defaultRunningWatts: 1800,
    defaultStartingWatts: 3500,
    hasMotorSurge: true,
    notes: "Standard 30-Amp RV air conditioning load",
  },
  {
    id: "rv_rooftop_ac_135k",
    name: "RV Rooftop Air Conditioner (13,500 BTU)",
    category: "rv",
    defaultRunningWatts: 1500,
    defaultStartingWatts: 3200,
    hasMotorSurge: true,
    notes: "Often requires soft-starter for small generators",
  },
  {
    id: "rv_converter_charger",
    name: "RV Converter / Battery Charger (45A DC)",
    category: "rv",
    defaultRunningWatts: 600,
    defaultStartingWatts: 600,
    hasMotorSurge: false,
    notes: "Charges internal 12V house battery bank",
  },
  {
    id: "rv_absorption_refrigerator",
    name: "RV Absorption Refrigerator (Electric Mode)",
    category: "rv",
    defaultRunningWatts: 350,
    defaultStartingWatts: 350,
    hasMotorSurge: false,
    notes: "Electric heating element continuous operation",
  },

  // Tools & Workshop
  {
    id: "table_saw_10in",
    name: 'Table Saw (10", 15 Amp)',
    category: "tools",
    defaultRunningWatts: 1800,
    defaultStartingWatts: 4000,
    hasMotorSurge: true,
    notes: "High blade inertia startup draw",
  },
  {
    id: "circular_saw_7in",
    name: 'Circular Saw (7-1/4", 15 Amp)',
    category: "tools",
    defaultRunningWatts: 1800,
    defaultStartingWatts: 2800,
    hasMotorSurge: true,
    notes: "Universal motor startup inrush",
  },
  {
    id: "air_compressor_portable",
    name: "Air Compressor (1.5 HP Portable)",
    category: "tools",
    defaultRunningWatts: 1500,
    defaultStartingWatts: 3500,
    hasMotorSurge: true,
    notes: "Starts against pressure head in tank",
  },
  {
    id: "power_tool_charger",
    name: "Cordless Power Tool Dual Charger",
    category: "tools",
    defaultRunningWatts: 150,
    defaultStartingWatts: 150,
    hasMotorSurge: false,
    notes: "Electronic lithium battery charging station",
  },
];

/**
 * Pre-configured presets for instant one-click scenario planning
 */
export const GENERATOR_PRESETS: {
  id: string;
  name: string;
  description: string;
  items: { id: string; quantity: number }[];
}[] = [
  {
    id: "essential_outage",
    name: "Essential Outage (Editable)",
    description:
      "Critical baseline circuits: refrigerator, sump pump, Wi-Fi, 4 rooms of LED lighting, and phone charger.",
    items: [
      { id: "refrigerator_freezer_modern", quantity: 1 },
      { id: "sump_pump_third_hp", quantity: 1 },
      { id: "wifi_router_modem", quantity: 1 },
      { id: "led_lighting_room", quantity: 4 },
      { id: "smart_phone_charger", quantity: 1 },
    ],
  },
  {
    id: "comfort_home_backup",
    name: "Comfort Home Backup",
    description:
      "Essential circuits plus gas/oil furnace blower, microwave oven, television, and laptop.",
    items: [
      { id: "refrigerator_freezer_modern", quantity: 1 },
      { id: "sump_pump_third_hp", quantity: 1 },
      { id: "furnace_blower_half_hp", quantity: 1 },
      { id: "microwave_oven", quantity: 1 },
      { id: "television_led_65", quantity: 1 },
      { id: "laptop_computer", quantity: 1 },
      { id: "wifi_router_modem", quantity: 1 },
      { id: "led_lighting_room", quantity: 6 },
    ],
  },
  {
    id: "rv_30amp_summer",
    name: "RV 30-Amp Summer",
    description:
      "13.5k BTU RV rooftop air conditioner, 45A DC converter, microwave, and electric refrigerator.",
    items: [
      { id: "rv_rooftop_ac_135k", quantity: 1 },
      { id: "rv_converter_charger", quantity: 1 },
      { id: "rv_absorption_refrigerator", quantity: 1 },
      { id: "microwave_oven", quantity: 1 },
    ],
  },
  {
    id: "small_jobsite",
    name: "Small Jobsite / Framing",
    description:
      "1.5 HP portable air compressor, 15A circular saw, and dual tool battery charger.",
    items: [
      { id: "air_compressor_portable", quantity: 1 },
      { id: "circular_saw_7in", quantity: 1 },
      { id: "power_tool_charger", quantity: 1 },
    ],
  },
];

/**
 * Creates default selected items for the "Essential Outage" preset
 */
export function getEssentialOutagePreset(): SelectedAppliance[] {
  const preset = GENERATOR_PRESETS.find((p) => p.id === "essential_outage");
  if (!preset) return [];

  const result: SelectedAppliance[] = [];
  for (const item of preset.items) {
    const def = DEFAULT_APPLIANCES.find((d) => d.id === item.id);
    if (def) {
      result.push({
        id: def.id,
        name: def.name,
        category: def.category,
        quantity: item.quantity,
        runningWatts: def.defaultRunningWatts,
        startingWatts: def.defaultStartingWatts,
        isCustom: false,
      });
    }
  }
  return result;
}

export interface GeneratorScenarioPreset {
  id: string;
  name: string;
  description: string;
  appliances: SelectedAppliance[];
}

/**
 * Named pre-configured scenarios linkable via URL parameter:
 * e.g. /generator-size-calculator?scenario=winter-essentials
 */
export const GENERATOR_SCENARIO_PRESETS: Record<string, GeneratorScenarioPreset> = {
  "winter-essentials": {
    id: "winter-essentials",
    name: "Winter Storm Essentials (5.1 kW Outage Scenario)",
    description:
      "Critical winter storm emergency circuits: refrigerator, 1/2 HP gas furnace blower, 1/3 HP sump pump, microwave, Wi-Fi router, 5 rooms LED lighting, and chargers.",
    appliances: [
      {
        id: "scenario_refrigerator",
        name: "Refrigerator / Freezer (Energy Star)",
        category: "kitchen",
        quantity: 1,
        runningWatts: 180,
        startingWatts: 1200,
        isCustom: false,
      },
      {
        id: "scenario_furnace_blower",
        name: "Gas Furnace Blower Fan (1/2 HP)",
        category: "hvac",
        quantity: 1,
        runningWatts: 700,
        startingWatts: 1800,
        isCustom: false,
      },
      {
        id: "scenario_sump_pump",
        name: "Sump Pump (1/3 HP)",
        category: "water_pumps",
        quantity: 1,
        runningWatts: 600,
        startingWatts: 1400,
        isCustom: false,
      },
      {
        id: "scenario_microwave",
        name: "Microwave Oven",
        category: "kitchen",
        quantity: 1,
        runningWatts: 1200,
        startingWatts: 1200,
        isCustom: false,
      },
      {
        id: "scenario_router",
        name: "Internet Router & Fiber ONT",
        category: "electronics",
        quantity: 1,
        runningWatts: 25,
        startingWatts: 25,
        isCustom: false,
      },
      {
        id: "scenario_lighting",
        name: "Rooms LED Lighting (5 Rooms)",
        category: "electronics",
        quantity: 1,
        runningWatts: 150,
        startingWatts: 150,
        isCustom: false,
      },
      {
        id: "scenario_chargers",
        name: "Phone & Laptop Chargers",
        category: "electronics",
        quantity: 1,
        runningWatts: 100,
        startingWatts: 100,
        isCustom: false,
      },
    ],
  },
};

/**
 * Resolves a scenario preset by identifier, or returns null if not found.
 */
export function getGeneratorScenario(
  scenarioId?: string | null
): GeneratorScenarioPreset | null {
  if (!scenarioId) return null;
  return GENERATOR_SCENARIO_PRESETS[scenarioId] || null;
}

/**
 * Formats a clean, professional plain-text summary of the user's calculated generator load
 * for sharing with an electrician or contractor.
 *
 * Complies with GEMINI.md:
 * - Dynamic based on active appliances and calculations
 * - Does NOT hardcode 30A/L14-30/specific breakers or wire gauges unless equipment requires it
 * - Explicitly highlights planning headroom, starting surge drivers, and safety disclaimers
 */
export function formatGeneratorSummaryForClipboard(
  result: GeneratorSizeOutputs,
  appliances: SelectedAppliance[]
): string {
  const activeAppliances = appliances.filter((item) => Number(item.quantity) > 0);

  const lines: string[] = [
    "CalcMyPower Generator Sizing Summary",
    "=====================================",
    "",
    `Total Running Load: ${result.totalRunningWatts.toLocaleString()} W (${(result.totalRunningWatts / 1000).toFixed(2)} kW continuous)`,
    `Largest Additional Startup Demand: +${result.largestAdditionalStartingWatts.toLocaleString()} W${
      result.surgeDriverName ? ` (${result.surgeDriverName})` : " (No motor surge)"
    }`,
    `Peak Starting Demand: ${result.peakStartingDemand.toLocaleString()} W (${(result.peakStartingDemand / 1000).toFixed(2)} kW momentary)`,
    `Calculated Planning Capacity (1.25x Headroom): ${Math.round(
      result.planningCapacityWatts
    ).toLocaleString()} W (${result.planningKw.toFixed(2)} kW / ${result.planningKva.toFixed(2)} kVA @ ${result.powerFactorUsed.toFixed(2)} PF)`,
    "",
    "Loads Included:",
  ];

  if (activeAppliances.length === 0) {
    lines.push("- (No appliances currently selected)");
  } else {
    for (const item of activeAppliances) {
      const qty = Number(item.quantity);
      const run = Number(item.runningWatts);
      const start = Number(item.startingWatts);
      const totalRun = qty * run;
      const surgeDelta = Math.max(0, start - run);
      const surgeText =
        surgeDelta > 0
          ? ` [Startup surge: ${start.toLocaleString()}W / +${surgeDelta.toLocaleString()}W delta]`
          : "";
      const qtyText = qty > 1 ? `${qty}× ` : "";

      lines.push(
        `- ${qtyText}${item.name}: ${totalRun.toLocaleString()}W continuous${surgeText}`
      );
    }
  }

  lines.push("");
  lines.push("Generator Configuration Considerations:");

  // Check for 240V or high power needs
  const has240VAppliance = activeAppliances.some(
    (a) =>
      a.id.includes("well_pump") ||
      a.id.includes("water_heater") ||
      a.id.includes("central_ac") ||
      a.name.toLowerCase().includes("240v")
  );
  const isHighLoad =
    result.totalRunningWatts >= 5000 || result.planningCapacityWatts >= 6000;

  if (has240VAppliance || isHighLoad) {
    lines.push(
      "• Voltage & Connection: Selected loads or total continuous demand require dual-voltage 120V/240V split-phase capacity (such as a 120V/240V transfer switch or panel interlock kit). Standard 120V-only generators cannot power 240V circuits or energize both split-phase panel bus bars."
    );
  } else {
    lines.push(
      "• Voltage & Connection: For whole-panel backup via manual transfer switch or interlock kit, verify whether your panel circuits require a 120V/240V dual-voltage generator to feed both panel bus bars, or isolated 120V branch circuits via individual cords."
    );
  }

  lines.push(
    "• Fuel & Altitude Derating: Multi-fuel and dual-fuel units typically deliver 10% to 20% lower output on liquid propane (LPG) or natural gas compared to gasoline. Reduce continuous ratings accordingly if operating above 2,000 ft elevation."
  );
  lines.push(
    "• Operating Duty Cycle: For engine longevity and fuel economy, maintain continuous loads within approximately 70% to 80% of rated running capacity."
  );

  lines.push("");
  lines.push("Note:");
  lines.push(
    "This is a planning estimate, not a final electrical installation or code determination. Generator, transfer equipment, inlet, breaker, conductor, and installation requirements must be verified for the actual equipment and installation by a licensed electrical professional."
  );
  lines.push("");
  lines.push("CalcMyPower:");
  lines.push("https://calcmypower.com/generator-size-calculator");

  return lines.join("\n");
}

/**
 * Pure calculation engine for generator sizing.
 *
 * Implements the Four-Step Documented Planning Methodology:
 * Step 1: W_running = Σ(quantity × runningWatts)
 * Step 2: Largest Additional Starting Watts = max(0, startingWatts - runningWatts)
 * Step 3: Peak Starting Demand = W_running + Largest Additional Starting Watts
 * Step 4: CalcMyPower Planning Capacity = Peak Starting Demand × 1.25
 */
export function calculateGeneratorSize(
  inputs: GeneratorSizeInputs
): GeneratorSizeOutputs {
  const errors: string[] = [];
  const warnings: string[] = [];

  const rawPowerFactor = inputs.powerFactor ?? 0.8;
  const powerFactorUsed =
    typeof rawPowerFactor === "number" && rawPowerFactor > 0 && rawPowerFactor <= 1.0
      ? rawPowerFactor
      : 0.8;

  if (inputs.powerFactor !== undefined && (inputs.powerFactor <= 0 || inputs.powerFactor > 1.0)) {
    warnings.push("Power factor must be between 0.1 and 1.0; using illustrative default of 0.80.");
  }

  let totalRunningWatts = 0;
  let largestAdditionalStartingWatts = 0;
  let surgeDriverName: string | null = null;

  for (const item of inputs.appliances) {
    const qty = Number(item.quantity);
    const runWatts = Number(item.runningWatts);
    const startWatts = Number(item.startingWatts);
    let itemHasError = false;

    if (isNaN(qty) || qty < 0) {
      errors.push(`Invalid quantity for ${item.name}: must be a non-negative number.`);
      itemHasError = true;
    }

    if (isNaN(runWatts) || runWatts < 0) {
      errors.push(`Invalid running watts for ${item.name}: must be a non-negative number.`);
      itemHasError = true;
    }

    if (isNaN(startWatts) || startWatts < 0) {
      errors.push(`Invalid starting watts for ${item.name}: must be a non-negative number.`);
      itemHasError = true;
    }

    if (itemHasError) {
      continue;
    }

    if (startWatts < runWatts) {
      warnings.push(
        `Starting watts for ${item.name} (${startWatts}W) cannot be less than running watts (${runWatts}W); treating starting watts as equal to running watts.`
      );
    }

    if (qty === 0) {
      continue;
    }

    // Step 1: Running watts scale directly with quantity
    totalRunningWatts += qty * runWatts;

    // Step 2: Simplified single-largest-startup model:
    // Computes the startup delta for a single unit of this appliance
    const effectiveStart = Math.max(startWatts, runWatts);
    const additionalSurge = Math.max(0, effectiveStart - runWatts);

    if (additionalSurge > largestAdditionalStartingWatts) {
      largestAdditionalStartingWatts = additionalSurge;
      surgeDriverName = item.name;
    }
  }

  // Step 3: Peak Starting Demand = Total Running Watts + Largest Additional Starting Watts
  const peakStartingDemand = totalRunningWatts + largestAdditionalStartingWatts;

  // Step 4: CalcMyPower Planning Capacity = Peak Starting Demand × 1.25
  const planningCapacityWatts = peakStartingDemand * 1.25;

  // Kilowatt conversion
  const planningKw = planningCapacityWatts / 1000;

  // kVA Conversions: kVA = kW / PF
  const planningKva = planningKw / powerFactorUsed;
  const runningKva = totalRunningWatts / 1000 / powerFactorUsed;
  const peakKva = peakStartingDemand / 1000 / powerFactorUsed;

  const isValid = errors.length === 0;

  return {
    totalRunningWatts,
    largestAdditionalStartingWatts,
    surgeDriverName,
    peakStartingDemand,
    planningCapacityWatts,
    planningKw,
    planningKva,
    runningKva,
    peakKva,
    powerFactorUsed,
    errors,
    warnings,
    isValid,
  };
}
