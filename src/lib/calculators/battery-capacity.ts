/**
 * Battery Capacity & Sizing Calculator Logic
 * Pure TypeScript — Decoupled from React and DOM
 * CalcMyPower.com
 *
 * Formulas:
 *
 * 1. Battery Capacity Evaluation:
 *    Nominal Energy (Wh) = Voltage (V) × Capacity (Ah)
 *    Nominal Energy (kWh) = Nominal Energy (Wh) / 1,000
 *    Estimated Usable Energy (Wh) = Nominal Energy (Wh) × Depth of Discharge (DoD)
 *    Estimated Usable Energy (kWh) = Estimated Usable Energy (Wh) / 1,000
 *
 *    Wiring Configurations:
 *    - Single Battery: V_bank = V_unit, Ah_bank = Ah_unit
 *    - Series (N batteries): V_bank = V_unit × N, Ah_bank = Ah_unit
 *    - Parallel (N batteries): V_bank = V_unit, Ah_bank = Ah_unit × N
 *
 * 2. Battery Sizing for Load & Runtime:
 *    Raw Load Energy (Wh) = Load (Watts) × Desired Runtime (Hours)
 *    Required Battery Output Energy (Wh) = Raw Load Energy (Wh) / Inverter Efficiency (η)
 *      (For DC loads, η = 1.0; for AC loads, η typically 0.85)
 *    Required Nominal Energy (Wh) = Required Battery Output Energy (Wh) / Depth of Discharge (DoD)
 *    Required Bank Capacity (Ah) = Required Nominal Energy (Wh) / System Voltage (V)
 *    Continuous DC Current Draw (Amps) = Load (Watts) / (System Voltage (V) × η)
 *    Battery Units Required = ceil(Required Bank Capacity (Ah) / Unit Battery Capacity (Ah))
 */

export type BatteryChemistry = "lifepo4" | "lead_acid" | "lithium_ion" | "custom";
export type WiringType = "single" | "series" | "parallel" | "series_parallel";
export type CapacityUnit = "ah" | "mah";
export type LoadType = "ac" | "dc";

export interface ChemistryPreset {
  name: string;
  shortName: string;
  defaultDoD: number; // e.g. 0.85
  description: string;
}

export const BATTERY_CHEMISTRY_PRESETS: Record<BatteryChemistry, ChemistryPreset> = {
  lifepo4: {
    name: "Lithium Iron Phosphate (LiFePO4)",
    shortName: "LiFePO4",
    defaultDoD: 0.85,
    description:
      "Modern deep-cycle standard with flat discharge voltage. Safely delivers 80% to 90% usable capacity without significant cycle-life degradation.",
  },
  lead_acid: {
    name: "Lead-Acid (AGM, Gel, Flooded Deep-Cycle)",
    shortName: "Lead-Acid",
    defaultDoD: 0.50,
    description:
      "Traditional lead-acid chemistry. Industry standard guidelines recommend a 50% maximum depth of discharge to prevent rapid sulfation and plate damage.",
  },
  lithium_ion: {
    name: "Lithium-Ion (NMC / Portable Power Stations)",
    shortName: "Lithium-Ion (NMC)",
    defaultDoD: 0.80,
    description:
      "Common in portable solar generators and consumer electronics. Typically operated up to 80% DoD for balanced energy density and cycle life.",
  },
  custom: {
    name: "Custom Depth of Discharge",
    shortName: "Custom",
    defaultDoD: 0.85,
    description:
      "User-specified depth of discharge percentage matching manufacturer specifications.",
  },
};

export const COMMON_BATTERY_VOLTAGES = [
  { value: 12, label: "12V (Automotive, Marine & RV)" },
  { value: 24, label: "24V (Off-Grid Solar & Inverters)" },
  { value: 36, label: "36V (Golf Carts & Trolling Motors)" },
  { value: 48, label: "48V (Home Energy Storage & Telecom)" },
];

export interface EvaluateCapacityInputs {
  voltage: number;
  capacityValue: number;
  capacityUnit?: CapacityUnit;
  chemistry?: BatteryChemistry;
  customDoD?: number;
  batteryCount?: number;
  wiring?: WiringType;
  seriesCount?: number; // N_s: Number of batteries in series per string
  parallelStrings?: number; // N_p: Number of parallel strings
}

export interface EvaluateCapacityOutputs {
  nominalWh: number;
  nominalKwh: number;
  usableWh: number;
  usableKwh: number;
  bankVoltage: number;
  bankCapacityAh: number;
  seriesCount: number;
  parallelStrings: number;
  totalBatteries: number;
  dodPercentUsed: number;
  formattedNominalWh: string;
  formattedNominalKwh: string;
  formattedUsableWh: string;
  formattedUsableKwh: string;
  formattedBankAh: string;
  formulaExplanation: string;
  wiringSummary: string;
  warnings: string[];
  errors: { field: string; message: string }[];
  isValid: boolean;
}

export interface SizeCapacityInputs {
  loadWatts: number;
  runtimeHours: number;
  systemVoltage: number;
  loadType: LoadType;
  inverterEfficiency?: number; // 0.5 to 1.0 or 50 to 100
  chemistry: BatteryChemistry;
  customDoD?: number;
  unitBatteryAh?: number;
}

export interface SizeCapacityOutputs {
  rawEnergyWh: number;
  rawEnergyKwh: number;
  requiredBatteryWh: number;
  requiredBatteryKwh: number;
  requiredNominalWh: number;
  requiredNominalKwh: number;
  requiredBankAh: number;
  dcCurrentAmps: number;
  recommendedUnits?: number;
  unitAhUsed?: number;
  dodPercentUsed: number;
  inverterEfficiencyPercentUsed: number;
  formattedRawWh: string;
  formattedRequiredWh: string;
  formattedNominalWh: string;
  formattedBankAh: string;
  formulaExplanation: string;
  warnings: string[];
  errors: { field: string; message: string }[];
  isValid: boolean;
}

function parseDoD(chemistry: BatteryChemistry, customDoD?: number): { dodFraction: number; dodPercent: number } {
  if (chemistry === "custom" && customDoD !== undefined && !isNaN(customDoD)) {
    const val = customDoD > 1 ? customDoD / 100 : customDoD;
    const clamped = Math.min(1.0, Math.max(0.1, val));
    return { dodFraction: clamped, dodPercent: Math.round(clamped * 100) };
  }
  const defaultFrac = BATTERY_CHEMISTRY_PRESETS[chemistry]?.defaultDoD ?? 0.85;
  if (customDoD !== undefined && !isNaN(customDoD) && customDoD > 0) {
    const val = customDoD > 1 ? customDoD / 100 : customDoD;
    const clamped = Math.min(1.0, Math.max(0.1, val));
    return { dodFraction: clamped, dodPercent: Math.round(clamped * 100) };
  }
  return { dodFraction: defaultFrac, dodPercent: Math.round(defaultFrac * 100) };
}

/**
 * Evaluates an existing battery or battery bank.
 * Computes Nominal Energy (Wh/kWh), Estimated Usable Energy based on DoD,
 * and handles Single, Series, or Parallel configurations.
 */
export function calculateBatteryCapacity(inputs: EvaluateCapacityInputs): EvaluateCapacityOutputs {
  const errors: { field: string; message: string }[] = [];
  const warnings: string[] = [];

  const rawVoltage = Number(inputs.voltage);
  const rawCapacity = Number(inputs.capacityValue);
  const capacityUnit = inputs.capacityUnit || "ah";
  const wiring = inputs.wiring || "single";
  const chemistry = inputs.chemistry || "lifepo4";

  if (isNaN(rawVoltage) || !Number.isFinite(rawVoltage) || rawVoltage <= 0) {
    errors.push({
      field: "voltage",
      message: "Battery voltage must be a positive finite number greater than 0 Volts.",
    });
  }

  if (isNaN(rawCapacity) || !Number.isFinite(rawCapacity) || rawCapacity <= 0) {
    errors.push({
      field: "capacityValue",
      message: "Battery capacity must be a positive finite number greater than 0.",
    });
  }

  // Resolve series count (N_s) and parallel strings (N_p)
  let seriesCount = 1;
  let parallelStrings = 1;

  if (inputs.seriesCount !== undefined || inputs.parallelStrings !== undefined) {
    const rawNs = inputs.seriesCount !== undefined ? Number(inputs.seriesCount) : 1;
    const rawNp = inputs.parallelStrings !== undefined ? Number(inputs.parallelStrings) : 1;

    if (isNaN(rawNs) || !Number.isFinite(rawNs) || rawNs < 1 || !Number.isInteger(rawNs)) {
      errors.push({
        field: "seriesCount",
        message: "Batteries in series (Ns) must be a positive whole integer (at least 1).",
      });
    }
    if (isNaN(rawNp) || !Number.isFinite(rawNp) || rawNp < 1 || !Number.isInteger(rawNp)) {
      errors.push({
        field: "parallelStrings",
        message: "Parallel strings (Np) must be a positive whole integer (at least 1).",
      });
    }

    seriesCount = Math.max(1, Math.floor(isNaN(rawNs) || rawNs < 1 ? 1 : rawNs));
    parallelStrings = Math.max(1, Math.floor(isNaN(rawNp) || rawNp < 1 ? 1 : rawNp));
  } else {
    // Legacy count & wiring mode
    const rawCount = inputs.batteryCount !== undefined ? Number(inputs.batteryCount) : 1;
    if (isNaN(rawCount) || !Number.isFinite(rawCount) || rawCount < 1 || !Number.isInteger(rawCount)) {
      errors.push({
        field: "batteryCount",
        message: "Battery count must be a positive whole integer (at least 1).",
      });
    }
    const count = Math.max(1, Math.floor(isNaN(rawCount) || rawCount < 1 ? 1 : rawCount));

    if (wiring === "series") {
      seriesCount = count;
      parallelStrings = 1;
    } else if (wiring === "parallel") {
      seriesCount = 1;
      parallelStrings = count;
    } else if (wiring === "series_parallel") {
      seriesCount = 2;
      parallelStrings = 2;
    } else {
      seriesCount = 1;
      parallelStrings = 1;
    }
  }

  const totalBatteries = seriesCount * parallelStrings;
  const isValid = errors.length === 0;

  const unitVoltage = Math.max(0.1, isNaN(rawVoltage) || !Number.isFinite(rawVoltage) ? 12 : rawVoltage);
  const unitAhRaw = Math.max(0, isNaN(rawCapacity) || !Number.isFinite(rawCapacity) ? 100 : rawCapacity);
  const unitAh = capacityUnit === "mah" ? unitAhRaw / 1000 : unitAhRaw;

  const { dodFraction, dodPercent } = parseDoD(chemistry, inputs.customDoD);

  let bankVoltage = unitVoltage * seriesCount;
  let bankCapacityAh = unitAh * parallelStrings;

  let wiringSummary = "";
  if (totalBatteries <= 1) {
    wiringSummary = "Single battery configuration (1S1P)";
  } else if (seriesCount > 1 && parallelStrings === 1) {
    wiringSummary = `${totalBatteries} batteries wired in series (${seriesCount}S1P string). Voltage multiplies: ${unitVoltage}V × ${seriesCount} = ${bankVoltage}V; Capacity remains ${bankCapacityAh.toLocaleString("en-US", { maximumFractionDigits: 1 })} Ah.`;
  } else if (seriesCount === 1 && parallelStrings > 1) {
    wiringSummary = `${totalBatteries} batteries wired in parallel (1S${parallelStrings}P). Voltage remains ${bankVoltage}V; Capacity multiplies: ${unitAh.toLocaleString("en-US", { maximumFractionDigits: 1 })} Ah × ${parallelStrings} = ${bankCapacityAh.toLocaleString("en-US", { maximumFractionDigits: 1 })} Ah.`;
  } else {
    wiringSummary = `${totalBatteries} batteries in a ${seriesCount}S${parallelStrings}P series-parallel bank (${seriesCount} in series per string × ${parallelStrings} parallel strings). Bank voltage: ${unitVoltage}V × ${seriesCount} = ${bankVoltage}V; Bank capacity: ${unitAh.toLocaleString("en-US", { maximumFractionDigits: 1 })} Ah × ${parallelStrings} = ${bankCapacityAh.toLocaleString("en-US", { maximumFractionDigits: 1 })} Ah.`;
  }

  if (totalBatteries > 1) {
    warnings.push(
      "Multi-battery banks must use identical batteries of the same chemistry, age, voltage, capacity, and manufacturer. Never mix old and new batteries or different chemistries."
    );
  }

  if (parallelStrings > 4) {
    warnings.push(
      "Industry standards (e.g. Victron Energy Wiring Unlimited) advise paralleling no more than 3 to 4 strings to prevent severe current imbalances and premature cell aging."
    );
  }

  if (chemistry === "lead_acid" && dodPercent > 50) {
    warnings.push(
      `Discharging lead-acid batteries beyond 50% DoD (selected: ${dodPercent}%) will accelerate plate sulfation and substantially shorten battery lifespan.`
    );
  }

  let nominalWh = bankVoltage * bankCapacityAh;
  let nominalKwh = nominalWh / 1000;
  let usableWh = nominalWh * dodFraction;
  let usableKwh = usableWh / 1000;

  if (!isValid) {
    nominalWh = 0;
    nominalKwh = 0;
    usableWh = 0;
    usableKwh = 0;
    bankVoltage = 0;
    bankCapacityAh = 0;
  }

  const roundedNominalWh = Math.round((nominalWh + Number.EPSILON) * 10) / 10;
  const roundedNominalKwh = Math.round((nominalKwh + Number.EPSILON) * 1000) / 1000;
  const roundedUsableWh = Math.round((usableWh + Number.EPSILON) * 10) / 10;
  const roundedUsableKwh = Math.round((usableKwh + Number.EPSILON) * 1000) / 1000;
  const roundedBankAh = Math.round((bankCapacityAh + Number.EPSILON) * 100) / 100;

  const formattedNominalWh = `${roundedNominalWh.toLocaleString("en-US", {
    maximumFractionDigits: 1,
  })} Wh`;
  const formattedNominalKwh = `${roundedNominalKwh.toLocaleString("en-US", {
    minimumFractionDigits: roundedNominalKwh < 10 && roundedNominalKwh > 0 ? 2 : 1,
    maximumFractionDigits: 3,
  })} kWh`;
  const formattedUsableWh = `${roundedUsableWh.toLocaleString("en-US", {
    maximumFractionDigits: 1,
  })} Wh`;
  const formattedUsableKwh = `${roundedUsableKwh.toLocaleString("en-US", {
    minimumFractionDigits: roundedUsableKwh < 10 && roundedUsableKwh > 0 ? 2 : 1,
    maximumFractionDigits: 3,
  })} kWh`;
  const formattedBankAh = `${roundedBankAh.toLocaleString("en-US", {
    maximumFractionDigits: 2,
  })} Ah`;

  const formulaExplanation = isValid
    ? `Bank Voltage = ${unitVoltage}V × ${seriesCount} = ${bankVoltage}V | Bank Capacity = ${unitAh.toLocaleString("en-US", { maximumFractionDigits: 1 })}Ah × ${parallelStrings} = ${bankCapacityAh.toLocaleString("en-US", { maximumFractionDigits: 1 })}Ah | Nominal Energy = ${bankVoltage}V × ${bankCapacityAh.toLocaleString("en-US", { maximumFractionDigits: 1 })}Ah = ${formattedNominalWh} (${formattedNominalKwh}) | Estimated Usable Energy (${dodPercent}% DoD) = ${formattedNominalWh} × ${dodFraction.toFixed(2)} = ${formattedUsableWh} (${formattedUsableKwh})`
    : "Calculation paused due to invalid input values.";

  return {
    nominalWh: roundedNominalWh,
    nominalKwh: roundedNominalKwh,
    usableWh: roundedUsableWh,
    usableKwh: roundedUsableKwh,
    bankVoltage,
    bankCapacityAh: roundedBankAh,
    seriesCount,
    parallelStrings,
    totalBatteries,
    dodPercentUsed: dodPercent,
    formattedNominalWh,
    formattedNominalKwh,
    formattedUsableWh,
    formattedUsableKwh,
    formattedBankAh,
    formulaExplanation,
    wiringSummary,
    warnings,
    errors,
    isValid,
  };
}

/**
 * Sizes a battery bank for a required load and runtime.
 * Factors in AC inverter efficiency (when applicable) and chemistry DoD.
 */
export function sizeBatteryCapacity(inputs: SizeCapacityInputs): SizeCapacityOutputs {
  const errors: { field: string; message: string }[] = [];
  const warnings: string[] = [];

  const rawWatts = Number(inputs.loadWatts);
  const rawHours = Number(inputs.runtimeHours);
  const rawVoltage = Number(inputs.systemVoltage);
  const loadType = inputs.loadType || "ac";
  const chemistry = inputs.chemistry || "lifepo4";

  if (isNaN(rawWatts) || rawWatts <= 0) {
    errors.push({
      field: "loadWatts",
      message: "Load wattage must be greater than 0 Watts.",
    });
  }

  if (isNaN(rawHours) || rawHours <= 0) {
    errors.push({
      field: "runtimeHours",
      message: "Desired runtime must be greater than 0 hours.",
    });
  }

  if (isNaN(rawVoltage) || rawVoltage <= 0) {
    errors.push({
      field: "systemVoltage",
      message: "System voltage must be greater than 0 Volts.",
    });
  }

  const isValid = errors.length === 0;

  const loadWatts = Math.max(0, isNaN(rawWatts) ? 0 : rawWatts);
  const runtimeHours = Math.max(0, isNaN(rawHours) ? 0 : rawHours);
  const systemVoltage = Math.max(0.1, isNaN(rawVoltage) ? 12 : rawVoltage);

  // Inverter efficiency
  let effFraction = 1.0;
  let effPercent = 100;
  if (loadType === "ac") {
    const rawEff = inputs.inverterEfficiency !== undefined ? Number(inputs.inverterEfficiency) : 85;
    const normEff = rawEff > 1 ? rawEff / 100 : rawEff;
    effFraction = Math.min(1.0, Math.max(0.5, isNaN(normEff) ? 0.85 : normEff));
    effPercent = Math.round(effFraction * 100);
  }

  const { dodFraction, dodPercent } = parseDoD(chemistry, inputs.customDoD);

  const rawEnergyWh = loadWatts * runtimeHours;
  const rawEnergyKwh = rawEnergyWh / 1000;

  const requiredBatteryWh = rawEnergyWh / effFraction;
  const requiredBatteryKwh = requiredBatteryWh / 1000;

  const requiredNominalWh = requiredBatteryWh / dodFraction;
  const requiredNominalKwh = requiredNominalWh / 1000;

  const requiredBankAh = requiredNominalWh / systemVoltage;

  // DC current draw from battery bank
  const dcCurrentAmps = systemVoltage > 0 ? loadWatts / (systemVoltage * effFraction) : 0;

  let recommendedUnits: number | undefined;
  const unitAhUsed = inputs.unitBatteryAh ? Number(inputs.unitBatteryAh) : undefined;
  if (unitAhUsed && unitAhUsed > 0) {
    recommendedUnits = Math.ceil(requiredBankAh / unitAhUsed);
  }

  if (dcCurrentAmps > 100) {
    warnings.push(
      `High continuous DC current (${dcCurrentAmps.toFixed(1)} A) detected. Consider raising the system voltage (e.g. from 12V to 24V or 48V) to cut conductor sizing, reduce voltage drop, and prevent excessive cabling heat.`
    );
  }

  if (chemistry === "lead_acid" && dcCurrentAmps > requiredBankAh * 0.2) {
    warnings.push(
      `Heavy discharge rate relative to lead-acid capacity (C/5 rate exceeded). Peukert's law will reduce actual delivered runtime unless battery capacity is oversized.`
    );
  }

  const roundedRawWh = Math.round((rawEnergyWh + Number.EPSILON) * 10) / 10;
  const roundedRawKwh = Math.round((rawEnergyKwh + Number.EPSILON) * 1000) / 1000;
  const roundedReqWh = Math.round((requiredBatteryWh + Number.EPSILON) * 10) / 10;
  const roundedReqKwh = Math.round((requiredBatteryKwh + Number.EPSILON) * 1000) / 1000;
  const roundedNomWh = Math.round((requiredNominalWh + Number.EPSILON) * 10) / 10;
  const roundedNomKwh = Math.round((requiredNominalKwh + Number.EPSILON) * 1000) / 1000;
  const roundedBankAh = Math.round((requiredBankAh + Number.EPSILON) * 10) / 10;
  const roundedDcAmps = Math.round((dcCurrentAmps + Number.EPSILON) * 10) / 10;

  const formattedRawWh = `${roundedRawWh.toLocaleString("en-US", { maximumFractionDigits: 1 })} Wh`;
  const formattedRequiredWh = `${roundedReqWh.toLocaleString("en-US", { maximumFractionDigits: 1 })} Wh`;
  const formattedNominalWh = `${roundedNomWh.toLocaleString("en-US", { maximumFractionDigits: 1 })} Wh`;
  const formattedBankAh = `${roundedBankAh.toLocaleString("en-US", { maximumFractionDigits: 1 })} Ah`;

  const formulaExplanation =
    loadType === "ac"
      ? `Energy Demand = ${loadWatts}W × ${runtimeHours}h = ${formattedRawWh} | Accounting for ${effPercent}% Inverter Efficiency = ${formattedRawWh} ÷ ${effFraction.toFixed(2)} = ${formattedRequiredWh} | Accounting for ${dodPercent}% DoD = ${formattedRequiredWh} ÷ ${dodFraction.toFixed(2)} = ${formattedNominalWh} | Bank Capacity @ ${systemVoltage}V = ${formattedNominalWh} ÷ ${systemVoltage}V = ${formattedBankAh}`
      : `Energy Demand = ${loadWatts}W × ${runtimeHours}h = ${formattedRawWh} (Direct DC) | Accounting for ${dodPercent}% DoD = ${formattedRawWh} ÷ ${dodFraction.toFixed(2)} = ${formattedNominalWh} | Bank Capacity @ ${systemVoltage}V = ${formattedNominalWh} ÷ ${systemVoltage}V = ${formattedBankAh}`;

  return {
    rawEnergyWh: roundedRawWh,
    rawEnergyKwh: roundedRawKwh,
    requiredBatteryWh: roundedReqWh,
    requiredBatteryKwh: roundedReqKwh,
    requiredNominalWh: roundedNomWh,
    requiredNominalKwh: roundedNomKwh,
    requiredBankAh: roundedBankAh,
    dcCurrentAmps: roundedDcAmps,
    recommendedUnits,
    unitAhUsed,
    dodPercentUsed: dodPercent,
    inverterEfficiencyPercentUsed: effPercent,
    formattedRawWh,
    formattedRequiredWh,
    formattedNominalWh,
    formattedBankAh,
    formulaExplanation,
    warnings,
    errors,
    isValid,
  };
}

export interface BatteryFaqItem {
  question: string;
  answer: string;
}

export const BATTERY_CAPACITY_FAQS: BatteryFaqItem[] = [
  {
    question: "How do you calculate battery capacity in Watt-hours (Wh)?",
    answer:
      "To calculate battery energy capacity in Watt-hours (Wh), multiply the nominal battery voltage in Volts (V) by the rated capacity in Amp-hours (Ah): Energy (Wh) = Voltage (V) × Capacity (Ah). For example, a standard 12V 100Ah battery stores 1,200 Watt-hours of nominal energy (12V × 100Ah = 1,200Wh or 1.2 kWh).",
  },
  {
    question: "What is the difference between Amp-hours (Ah) and Watt-hours (Wh)?",
    answer:
      "Amp-hours (Ah) measures electrical charge volume (current over time), whereas Watt-hours (Wh) measures total energy capacity (work performed). Ah is voltage-dependent; a 100Ah battery at 12V stores 1,200Wh, while a 100Ah battery at 48V stores 4,800Wh (four times as much energy). Comparing batteries by Watt-hours (Wh) provides an accurate comparison across different system voltages.",
  },
  {
    question: "Why is usable battery capacity less than nominal capacity?",
    answer:
      "Every battery chemistry has a safe depth of discharge (DoD) limit to prevent permanent cell degradation. Traditional lead-acid batteries (AGM, Gel, Flooded) should not be discharged beyond 50% DoD to prevent rapid plate sulfation and cycle-life loss. Modern Lithium Iron Phosphate (LiFePO4) batteries safely deliver 80% to 90% of their nominal capacity. Therefore, a 100Ah lead-acid battery provides approximately 50Ah (600Wh usable), whereas a 100Ah LiFePO4 battery provides 85Ah (1,020Wh usable).",
  },
  {
    question: "Does wiring batteries in series or parallel increase battery capacity?",
    answer:
      "Wiring batteries in parallel increases total Amp-hour capacity while keeping system voltage identical. For example, two 12V 100Ah batteries wired in parallel create a 12V 200Ah bank (2,400Wh). Wiring batteries in series increases system voltage while keeping Amp-hour capacity identical. Two 12V 100Ah batteries in series create a 24V 100Ah bank (2,400Wh). In both configurations, total stored energy in Watt-hours is identical.",
  },
  {
    question: "How do you size a battery bank for a home power outage or off-grid solar?",
    answer:
      "To size a battery bank, first calculate daily or hourly energy consumption in Watt-hours: Load (Watts) × Hours of Runtime. If using an AC inverter, divide load energy by inverter efficiency (typically 85% or 0.85). Next, divide by your battery chemistry's recommended depth of discharge (0.85 for LiFePO4, 0.50 for Lead-Acid) to determine required nominal Watt-hours. Finally, divide nominal Watt-hours by your DC system voltage (12V, 24V, or 48V) to determine required battery Amp-hours.",
  },
  {
    question: "What is Peukert's Law and how does it affect battery runtime?",
    answer:
      "Peukert's Law describes how the usable capacity of a lead-acid battery decreases as the rate of discharge increases. Lead-acid batteries are typically rated at a slow 20-hour discharge rate (C/20). If discharged rapidly in 1 to 2 hours (such as running a high-wattage microwave or space heater through an inverter), internal resistance causes heat and chemical bottlenecks, reducing actual delivered capacity by 20% to 40%. LiFePO4 lithium batteries experience negligible Peukert losses and maintain rated capacity under heavy loads.",
  },
  {
    question: "How do you calculate amp hours and voltage in a series-parallel (2S2P) battery bank?",
    answer:
      "In a series-parallel configuration (such as 2S2P), total bank voltage equals the single battery voltage multiplied by the number of batteries in series per string (V_bank = V_b × N_s). Total bank capacity equals the single battery capacity multiplied by the number of parallel strings (Ah_bank = Ah_b × N_p). For example, four 12V 100Ah batteries in a 2S2P arrangement create a 24V 200Ah battery bank storing 4,800 Watt-hours (4.8 kWh) of nominal energy.",
  },
  {
    question: "Why do manufacturers recommend limiting parallel battery strings to 3 or 4?",
    answer:
      "Technical guidance from manufacturers like Victron Energy (Wiring Unlimited) recommends paralleling no more than 3 to 4 battery strings. Slight variations in cable resistance, terminal torque, and internal cell chemistry cause current to distribute unevenly among parallel strings. This imbalance leads to premature degradation of the closest string and reduces overall bank longevity unless busbars and diagonal cross-charging wiring are implemented.",
  },
];
