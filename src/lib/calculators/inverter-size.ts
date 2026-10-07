/**
 * Inverter Size & DC Current Draw Sizing Calculator Logic
 * Pure TypeScript, Decoupled from React and DOM
 * CalcMyPower.com
 *
 * Engineering Methodology:
 * 1. Total Continuous Running Load:
 *    P_running = Σ(quantity × runningWatts)
 *
 * 2. Peak Starting Surge Demand (Non-Coincident Motor Surge Baseline):
 *    ΔP_surge_max = max(0, startingWatts - runningWatts) across active loads
 *    P_peak_surge = P_running + ΔP_surge_max
 *    Note: Evaluates non-simultaneous starting; if multiple inductive loads cycle together, evaluate combined surge.
 *
 * 3. Recommended Inverter Continuous Rating (Continuous Headroom Factor):
 *    P_recommended_cont = P_running × Continuous Headroom (typically 1.25, or 25% design margin)
 *    Provides thermal margin and keeps inverter in peak efficiency window; not a mandatory electrical code rule.
 *
 * 4. Recommended Inverter Peak Surge Rating:
 *    P_recommended_surge = max(P_peak_surge, P_recommended_cont × 1.5)
 *
 * 5. Suggested Standard Commercial Inverter Size:
 *    Rounds up to standard brackets: 300W, 600W, 1000W, 1500W, 2000W, 2500W, 3000W, 4000W, 5000W
 *
 * 6. DC Battery Bank Current Draw:
 *    I_DC_running = P_running ÷ (V_DC × Inverter Efficiency)
 *    I_DC_rated = P_inverter_rated ÷ (V_DC × Inverter Efficiency)
 *    I_DC_surge = P_peak_surge ÷ (V_DC × Inverter Efficiency)
 *
 * 7. Illustrative Overcurrent Protection (DC Fuse / Breaker Estimate):
 *    I_fuse_target = I_DC_rated × 1.25 (illustrative 125% continuous protection guideline)
 *    Actual DC overcurrent protection must follow inverter manufacturer specs, conductor ampacity, and AIC ratings.
 *
 * 8. Illustrative Battery Cable Gauge Estimate (AWG):
 *    Estimated for short runs (< 6ft total loop at <= 2% voltage drop) based on 75°C/90°C copper ampacity.
 *    Longer runs require specific voltage drop calculations and manufacturer minimum conductor sizing.
 *
 * 9. Battery Bank Capacity Benchmark:
 *    Illustrative minimum battery capacity (Ah) using typical continuous discharge guidelines (0.5C LiFePO4, 0.2C Lead-Acid).
 *    Actual discharge capability depends on manufacturer battery and BMS ratings.
 */

export type InverterSystemVoltage = 12 | 24 | 48;
export type BatteryChemistry = "lifepo4" | "lead_acid";

export type InverterApplianceCategory =
  | "kitchen"
  | "electronics"
  | "pumps"
  | "tools"
  | "hvac"
  | "medical"
  | "other";

export interface InverterApplianceDefinition {
  id: string;
  name: string;
  category: InverterApplianceCategory;
  defaultRunningWatts: number;
  defaultStartingWatts: number;
  hasMotorSurge: boolean;
  notes?: string;
}

export interface SelectedInverterAppliance {
  id: string;
  name: string;
  category: InverterApplianceCategory;
  quantity: number;
  runningWatts: number;
  startingWatts: number;
  isCustom?: boolean;
}

export const INVERTER_PRESET_APPLIANCES: InverterApplianceDefinition[] = [
  {
    id: "refrigerator",
    name: "Residential Refrigerator / Freezer",
    category: "kitchen",
    defaultRunningWatts: 150,
    defaultStartingWatts: 1200,
    hasMotorSurge: true,
    notes: "Compressor startup draws 6x to 8x running wattage for 1-2 seconds",
  },
  {
    id: "microwave",
    name: "Microwave Oven (1,000W Output)",
    category: "kitchen",
    defaultRunningWatts: 1100,
    defaultStartingWatts: 1300,
    hasMotorSurge: false,
    notes: "Electrical draw is higher than rated cooking power (magnetron efficiency)",
  },
  {
    id: "coffee_maker",
    name: "Drip Coffee Maker",
    category: "kitchen",
    defaultRunningWatts: 900,
    defaultStartingWatts: 900,
    hasMotorSurge: false,
    notes: "Pure resistive heating element, no startup surge",
  },
  {
    id: "blender",
    name: "Countertop Blender / Food Processor",
    category: "kitchen",
    defaultRunningWatts: 400,
    defaultStartingWatts: 850,
    hasMotorSurge: true,
    notes: "Motor startup under food load requires momentary surge headroom",
  },
  {
    id: "cpap_humidifier",
    name: "CPAP Machine (with Heated Humidifier)",
    category: "medical",
    defaultRunningWatts: 60,
    defaultStartingWatts: 60,
    hasMotorSurge: false,
    notes: "Strictly requires Pure Sine Wave inverter for sensor reliability",
  },
  {
    id: "laptop_workstation",
    name: "Laptop & Dual Monitor Workstation",
    category: "electronics",
    defaultRunningWatts: 120,
    defaultStartingWatts: 120,
    hasMotorSurge: false,
    notes: "Sensitive switch-mode power supplies operate cleanest on Pure Sine Wave",
  },
  {
    id: "smart_tv_soundbar",
    name: "55-inch LED TV & Soundbar",
    category: "electronics",
    defaultRunningWatts: 110,
    defaultStartingWatts: 110,
    hasMotorSurge: false,
    notes: "Modified sine wave can cause audio buzzing or display lines",
  },
  {
    id: "starlink_satellite",
    name: "Starlink Satellite Internet Terminal",
    category: "electronics",
    defaultRunningWatts: 65,
    defaultStartingWatts: 100,
    hasMotorSurge: false,
    notes: "Peak draw occurs during initial dish motor reorientation and boot",
  },
  {
    id: "sump_pump_half_hp",
    name: "Sump Pump (1/2 HP Submersible)",
    category: "pumps",
    defaultRunningWatts: 800,
    defaultStartingWatts: 2100,
    hasMotorSurge: true,
    notes: "Inductive motor demands heavy starting torque when water is present",
  },
  {
    id: "well_pump_half_hp",
    name: "Well Pump (1/2 HP, 120V Submersible)",
    category: "pumps",
    defaultRunningWatts: 1000,
    defaultStartingWatts: 3000,
    hasMotorSurge: true,
    notes: "Deep-well pumps experience high startup pressure against water head",
  },
  {
    id: "circular_saw",
    name: "Circular Saw (7-1/4 inch, 15A)",
    category: "tools",
    defaultRunningWatts: 1400,
    defaultStartingWatts: 2500,
    hasMotorSurge: true,
    notes: "High inrush current during blade acceleration",
  },
  {
    id: "air_compressor_1hp",
    name: "Portable Air Compressor (1 HP)",
    category: "tools",
    defaultRunningWatts: 1100,
    defaultStartingWatts: 2800,
    hasMotorSurge: true,
    notes: "Starting against head tank pressure produces massive electrical surge",
  },
  {
    id: "window_ac_8k",
    name: "Window Air Conditioner (8,000 BTU)",
    category: "hvac",
    defaultRunningWatts: 750,
    defaultStartingWatts: 2200,
    hasMotorSurge: true,
    notes: "Refrigerant compressor startup requires significant surge reserve",
  },
  {
    id: "space_heater",
    name: "Electric Ceramic Space Heater",
    category: "hvac",
    defaultRunningWatts: 1500,
    defaultStartingWatts: 1500,
    hasMotorSurge: false,
    notes: "Resistive continuous load, draws full 12.5A at 120V",
  },
];

export interface InverterSizeInputs {
  /** Array of active load items */
  appliances: SelectedInverterAppliance[];
  /** Nominal battery bank DC voltage: 12V, 24V, or 48V */
  systemVoltage: InverterSystemVoltage;
  /** Inverter electrical conversion efficiency factor (e.g., 0.90 for 90%) */
  inverterEfficiency?: number;
  /** Continuous planning headroom multiplier (e.g., 1.25 for 25% margin) */
  continuousHeadroom?: number;
  /** Battery chemistry for safe discharge C-rate calculation */
  batteryChemistry?: BatteryChemistry;
}

export interface InverterSizeOutputs {
  /** Total simultaneous continuous running wattage (Watts AC) */
  totalRunningWatts: number;
  /** Peak instantaneous surge wattage (Watts AC): running watts + single largest surge delta */
  peakSurgeWatts: number;
  /** Name of the active appliance driving the highest startup surge */
  surgeDriverName: string | null;
  /** Single largest surge delta in Watts */
  largestSurgeDelta: number;
  /** Recommended minimum continuous inverter rating with headroom applied (Watts AC) */
  recommendedContinuousWatts: number;
  /** Recommended minimum surge capacity of the inverter (Watts AC) */
  recommendedSurgeWatts: number;
  /** Next standard commercial inverter bracket size (e.g. 1000W, 2000W, 3000W) */
  suggestedInverterRatingWatts: number;
  /** Typical surge capacity provided by the suggested commercial inverter (typically 2x continuous) */
  suggestedInverterSurgeRatingWatts: number;

  /** Continuous DC current drawn from battery bank at running load (Amps DC) */
  continuousDcCurrentAmps: number;
  /** Maximum continuous DC current drawn at full rated inverter capacity (Amps DC) */
  maxRatedDcCurrentAmps: number;
  /** Momentary peak DC current drawn during motor surge event (Amps DC) */
  peakSurgeDcCurrentAmps: number;

  /** Illustrative minimum DC fuse / breaker rating estimate (Amps DC) */
  recommendedFuseAmps: number;
  /** Illustrative pure copper battery cable gauge estimate (AWG) for short runs (<6ft total loop) */
  recommendedCableGauge: string;

  /** Illustrative benchmark battery bank capacity in Amp-hours (Ah) based on typical continuous C-rate limits */
  recommendedMinBatteryCapacityAh: number;
  /** Nominal battery bank voltage used */
  systemVoltageUsed: InverterSystemVoltage;
  /** Inverter efficiency factor used (e.g., 0.90) */
  inverterEfficiencyUsed: number;
  /** Continuous headroom factor used (e.g., 1.25) */
  continuousHeadroomUsed: number;
  /** Battery chemistry used */
  batteryChemistryUsed: BatteryChemistry;

  /** Voltage optimization advice (e.g., recommend stepping up to 24V/48V if current is excessive) */
  voltageOptimizationNotice: string | null;
  /** Inverter wave type recommendation (Pure Sine Wave vs Modified) */
  inverterTypeRecommendation: string;

  /** Validation error messages preventing calculation */
  errors: string[];
  /** Engineering warnings for edge conditions */
  warnings: string[];
  /** Physical validity flag */
  isValid: boolean;
}

const STANDARD_INVERTER_BRACKETS = [
  300, 500, 600, 800, 1000, 1200, 1500, 2000, 2500, 3000, 3500, 4000, 5000, 6000, 8000, 10000,
];

const STANDARD_FUSE_SIZES = [
  40, 50, 60, 80, 100, 125, 150, 175, 200, 250, 300, 350, 400, 500, 600,
];

/**
 * Provides an illustrative pure copper cable gauge estimate for short battery inverter runs
 * (< 6ft total loop at <= 2% permissible voltage drop, assuming 75°C/90°C rated terminals).
 * Actual conductor sizing must account for total round-trip cable length, acceptable voltage drop,
 * ambient temperature derating, conduit fill, and inverter manufacturer minimum cable specifications.
 */
export function getRecommendedCableGauge(dcAmps: number): string {
  if (dcAmps <= 40) return "8 AWG (Copper)";
  if (dcAmps <= 60) return "6 AWG (Copper)";
  if (dcAmps <= 90) return "4 AWG (Copper)";
  if (dcAmps <= 120) return "2 AWG (Copper)";
  if (dcAmps <= 150) return "1/0 AWG (Copper)";
  if (dcAmps <= 195) return "2/0 AWG (Copper)";
  if (dcAmps <= 260) return "4/0 AWG (Copper)";
  if (dcAmps <= 350) return "Parallel 2/0 AWG (or 300 kcmil)";
  return "Parallel 4/0 AWG (Dual Runs Required)";
}

/**
 * Rounds up to the nearest standard commercial ANL / MRBF / Class T fuse rating as an illustrative estimate.
 * Actual DC overcurrent protection must be specified according to the inverter manufacturer manual,
 * conductor ampacity, and battery short-circuit interrupt rating (AIC).
 */
export function getStandardFuseRating(targetAmps: number): number {
  for (const size of STANDARD_FUSE_SIZES) {
    if (size >= targetAmps) return size;
  }
  return Math.ceil(targetAmps / 50) * 50;
}

/**
 * Finds the next standard commercial inverter continuous wattage bracket.
 */
export function getSuggestedInverterSize(recommendedWatts: number): number {
  for (const size of STANDARD_INVERTER_BRACKETS) {
    if (size >= recommendedWatts) return size;
  }
  return Math.ceil(recommendedWatts / 1000) * 1000;
}

/**
 * Main Pure Calculation Function for Inverter Sizing
 */
export function calculateInverterSize(inputs: InverterSizeInputs): InverterSizeOutputs {
  const errors: string[] = [];
  const warnings: string[] = [];

  const systemVoltage = inputs.systemVoltage;
  if (![12, 24, 48].includes(systemVoltage)) {
    errors.push("System voltage must be 12V, 24V, or 48V DC.");
  }

  const efficiency = inputs.inverterEfficiency ?? 0.90;
  if (efficiency <= 0.5 || efficiency > 1.0) {
    errors.push("Inverter efficiency must be between 50% (0.50) and 100% (1.00).");
  }

  const headroom = inputs.continuousHeadroom ?? 1.25;
  if (headroom < 1.0 || headroom > 2.0) {
    errors.push("Continuous headroom must be between 1.00 (0% margin) and 2.00 (100% margin).");
  }

  const batteryChemistry = inputs.batteryChemistry ?? "lifepo4";
  const appliances = inputs.appliances || [];

  if (errors.length > 0) {
    return {
      totalRunningWatts: 0,
      peakSurgeWatts: 0,
      surgeDriverName: null,
      largestSurgeDelta: 0,
      recommendedContinuousWatts: 0,
      recommendedSurgeWatts: 0,
      suggestedInverterRatingWatts: 0,
      suggestedInverterSurgeRatingWatts: 0,
      continuousDcCurrentAmps: 0,
      maxRatedDcCurrentAmps: 0,
      peakSurgeDcCurrentAmps: 0,
      recommendedFuseAmps: 0,
      recommendedCableGauge: "N/A",
      recommendedMinBatteryCapacityAh: 0,
      systemVoltageUsed: systemVoltage,
      inverterEfficiencyUsed: efficiency,
      continuousHeadroomUsed: headroom,
      batteryChemistryUsed: batteryChemistry,
      voltageOptimizationNotice: null,
      inverterTypeRecommendation: "Pure Sine Wave Inverter",
      errors,
      warnings,
      isValid: false,
    };
  }

  let totalRunningWatts = 0;
  let largestSurgeDelta = 0;
  let surgeDriverName: string | null = null;
  let hasInductiveLoad = false;

  for (const app of appliances) {
    if (app.quantity <= 0) continue;
    if (app.runningWatts < 0 || app.startingWatts < 0) {
      errors.push(`Appliance "${app.name}" cannot have negative wattage.`);
      continue;
    }

    const itemRunning = app.runningWatts * app.quantity;
    totalRunningWatts += itemRunning;

    // Non-coincident motor starting surge calculation:
    // Models typical single-motor startup surge as a practical baseline.
    // If multiple inductive loads cycle concurrently, their combined surge should be evaluated.
    const singleSurgeDelta = Math.max(0, app.startingWatts - app.runningWatts);
    if (singleSurgeDelta > 0) {
      hasInductiveLoad = true;
    }
    if (singleSurgeDelta > largestSurgeDelta) {
      largestSurgeDelta = singleSurgeDelta;
      surgeDriverName = app.name;
    }
  }

  if (errors.length > 0) {
    return {
      totalRunningWatts: 0,
      peakSurgeWatts: 0,
      surgeDriverName: null,
      largestSurgeDelta: 0,
      recommendedContinuousWatts: 0,
      recommendedSurgeWatts: 0,
      suggestedInverterRatingWatts: 0,
      suggestedInverterSurgeRatingWatts: 0,
      continuousDcCurrentAmps: 0,
      maxRatedDcCurrentAmps: 0,
      peakSurgeDcCurrentAmps: 0,
      recommendedFuseAmps: 0,
      recommendedCableGauge: "N/A",
      recommendedMinBatteryCapacityAh: 0,
      systemVoltageUsed: systemVoltage,
      inverterEfficiencyUsed: efficiency,
      continuousHeadroomUsed: headroom,
      batteryChemistryUsed: batteryChemistry,
      voltageOptimizationNotice: null,
      inverterTypeRecommendation: "Pure Sine Wave Inverter",
      errors,
      warnings,
      isValid: false,
    };
  }

  if (totalRunningWatts === 0) {
    warnings.push("No active appliances selected. Showing baseline minimum recommendations.");
  }

  const peakSurgeWatts = totalRunningWatts + largestSurgeDelta;
  const recommendedContinuousWatts = Math.round(totalRunningWatts * headroom);
  const recommendedSurgeWatts = Math.max(peakSurgeWatts, Math.round(recommendedContinuousWatts * 1.5));

  const suggestedInverterRatingWatts = getSuggestedInverterSize(
    Math.max(recommendedContinuousWatts, Math.ceil(recommendedSurgeWatts / 2))
  );
  const suggestedInverterSurgeRatingWatts = suggestedInverterRatingWatts * 2;

  // DC Current Calculations
  const continuousDcCurrentAmps =
    totalRunningWatts > 0 ? Number((totalRunningWatts / (systemVoltage * efficiency)).toFixed(1)) : 0;

  const maxRatedDcCurrentAmps = Number(
    (suggestedInverterRatingWatts / (systemVoltage * efficiency)).toFixed(1)
  );

  const peakSurgeDcCurrentAmps =
    peakSurgeWatts > 0 ? Number((peakSurgeWatts / (systemVoltage * efficiency)).toFixed(1)) : 0;

  // DC Fuse Sizing: Illustrative 125% continuous rating estimate rounded to standard commercial sizes.
  // Note: Actual fuse sizing and AIC rating must follow inverter manufacturer installation requirements.
  const targetFuseAmps = maxRatedDcCurrentAmps * 1.25;
  const recommendedFuseAmps = getStandardFuseRating(targetFuseAmps);

  // Battery Cable Gauge: Short-run illustrative estimate (<6ft total loop at <=2% voltage drop)
  const recommendedCableGauge = getRecommendedCableGauge(maxRatedDcCurrentAmps);

  // Illustrative Minimum Battery Bank Capacity:
  // Typical benchmark limits: 0.5C for LiFePO4, 0.2C for Lead-Acid to mitigate voltage sag.
  // Note: Actual continuous discharge capability is determined by manufacturer battery and BMS specs.
  const cRateDivisor = batteryChemistry === "lifepo4" ? 0.50 : 0.20;
  const rawMinAh = continuousDcCurrentAmps > 0 ? continuousDcCurrentAmps / cRateDivisor : 0;
  const recommendedMinBatteryCapacityAh = Math.ceil(rawMinAh / 10) * 10; // Rounded to nearest 10Ah

  // Voltage Optimization Recommendations
  let voltageOptimizationNotice: string | null = null;
  if (systemVoltage === 12 && suggestedInverterRatingWatts >= 2000) {
    voltageOptimizationNotice =
      "High Current Alert: Drawing over 2,000 Watts on a 12V system requires massive battery cables (over 180 Amps continuous). Upgrading to a 24V or 48V battery bank cuts current by 50% to 75%, substantially reduces wire thickness and heat, and improves inverter efficiency.";
  } else if (systemVoltage === 24 && suggestedInverterRatingWatts >= 4000) {
    voltageOptimizationNotice =
      "For continuous power loads of 4,000 Watts or higher, a 48V DC battery system is strongly recommended to keep continuous current below 100 Amps and minimize resistive line losses.";
  }

  // Wave type recommendation
  const inverterTypeRecommendation = hasInductiveLoad || totalRunningWatts >= 500
    ? "Pure Sine Wave (Strongly recommended for motors, compressors, medical CPAP, and modern electronics to prevent overheating and harmonic noise)"
    : "Pure Sine Wave (Recommended for clean power and equipment longevity; Modified Sine Wave acceptable only for basic resistive heaters and incandescent bulbs)";

  if (suggestedInverterRatingWatts >= 5000 && systemVoltage === 12) {
    warnings.push("A 5,000W load on a 12V battery draws over 450 Amps DC. Operating at 12V is not practical or safe for this capacity; a 48V system is required.");
  }

  return {
    totalRunningWatts,
    peakSurgeWatts,
    surgeDriverName,
    largestSurgeDelta,
    recommendedContinuousWatts,
    recommendedSurgeWatts,
    suggestedInverterRatingWatts,
    suggestedInverterSurgeRatingWatts,
    continuousDcCurrentAmps,
    maxRatedDcCurrentAmps,
    peakSurgeDcCurrentAmps,
    recommendedFuseAmps,
    recommendedCableGauge,
    recommendedMinBatteryCapacityAh,
    systemVoltageUsed: systemVoltage,
    inverterEfficiencyUsed: efficiency,
    continuousHeadroomUsed: headroom,
    batteryChemistryUsed: batteryChemistry,
    voltageOptimizationNotice,
    inverterTypeRecommendation,
    errors,
    warnings,
    isValid: true,
  };
}

export interface InverterFaqItem {
  question: string;
  answer: string;
}

export const INVERTER_FAQS: InverterFaqItem[] = [
  {
    question: "What size inverter do I need for my house or RV?",
    answer:
      "To estimate inverter requirements, calculate two distinct numbers: total continuous running watts and peak starting surge watts. Sum the running wattage of electrical appliances intended to operate concurrently, and add a recommended continuous headroom buffer (such as 20% to 25%) to operate within the inverter peak efficiency curve and prevent thermal throttling. Next, evaluate motor startup surges. Under typical non-coincident operating conditions, adding the surge delta from the single largest inductive motor provides a practical surge baseline. If multiple heavy motors cycle on simultaneously, their combined starting surge must be evaluated. The selected inverter should comfortably meet both continuous and momentary surge demands.",
  },
  {
    question: "Why should I choose Pure Sine Wave over Modified Sine Wave?",
    answer:
      "Pure Sine Wave inverters replicate the smooth, continuous AC wave provided by utility grids. Modern electronics, variable-speed refrigerators, CPAP machines, audio equipment, microwave ovens, and induction motors operate efficiently without harmonic distortion or excess heat on pure sine wave power. Modified Sine Wave inverters produce a stepped, square-like waveform that causes inductive motors to run hotter, produces audible buzzing in audio and fan motors, and can cause issues with sensitive medical hardware and battery chargers.",
  },
  {
    question: "When should I upgrade from a 12V inverter system to 24V or 48V?",
    answer:
      "As a standard electrical rule of thumb, systems requiring 1,500 Watts or less operate well on 12V DC. Systems between 1,500 Watts and 3,000 Watts benefit significantly from a 24V DC battery bank, which cuts DC amperage in half. Systems over 3,000 Watts should almost always be configured at 48V DC. Stepping up from 12V to 48V reduces DC current by 75% for the same AC wattage load, allowing you to use much thinner copper cables (e.g., 2 AWG instead of dual 4/0 AWG runs), reducing line resistance, cutting voltage drop, and preventing dangerous heat buildup.",
  },
  {
    question: "How do I calculate DC current draw from the battery bank?",
    answer:
      "DC battery current is calculated as: DC Current (Amps) = AC Inverter Load (Watts) / [System Voltage (Volts) * Inverter Efficiency]. For example, running a 1,200 Watt AC microwave through a 12V inverter with 90% efficiency draws: 1,200 / (12 * 0.90) = 111.1 Amps DC. If the same microwave is powered by a 48V battery bank, the current draw drops to: 1,200 / (48 * 0.90) = 27.8 Amps DC.",
  },
  {
    question: "Where should the DC fuse or circuit breaker be installed?",
    answer:
      "Overcurrent protection (such as a Class T, ANL, or MRBF fuse) should be installed on the ungrounded positive (+) DC cable as close to the battery source as practical to protect the conductor from high-current short circuits. In marine and mobile installations, standards like ABYC E-11 specify placing the fuse within 7 inches of the battery terminal (or up to 40 inches if the cable is enclosed in a protective sleeve). In stationary battery energy storage systems, NEC guidelines require placing overcurrent protection as close as practical to the battery output terminals. Always follow your inverter and battery manufacturer specifications for exact fuse type, placement, and interrupt rating (AIC).",
  },
  {
    question: "What battery capacity (Amp-hours) is needed to support my inverter?",
    answer:
      "Your battery bank must be sized not only for total runtime, but also to sustain continuous DC current without excessive voltage drop. Typical engineering benchmarks suggest continuous discharge rates around 0.5C for LiFePO4 (e.g., a 100Ah battery supplying up to 50A continuous) and 0.2C for traditional Lead-Acid / AGM batteries (a 100Ah battery supplying up to 20A continuous) to prevent severe Peukert capacity loss. However, actual continuous and peak discharge capabilities depend on specific manufacturer battery specifications and internal BMS current ratings.",
  },
];

