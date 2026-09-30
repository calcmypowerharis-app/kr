/**
 * Solar Battery Calculator Engine
 * Pure TypeScript - Decoupled from React, DOM, and UI
 * CalcMyPower.com
 *
 * Sizing Logic & Calculations:
 *
 * Step 1: Normalization
 *   E_daily_Wh = unit === "kwh" ? E_daily * 1000 : E_daily
 *
 * Step 2: Load-Side Autonomy Energy
 *   E_autonomy_load_Wh = E_daily_Wh * N_autonomy
 *   E_autonomy_load_kWh = E_autonomy_load_Wh / 1000
 *
 * Step 3: Required Battery-Delivery Energy (Inverter Adjusted)
 *   E_battery_delivery_Wh = E_autonomy_load_Wh / inverter_efficiency
 *   E_battery_delivery_kWh = E_battery_delivery_Wh / 1000
 *
 * Step 4: Required Nominal Battery Capacity
 *   E_nominal_Wh = E_battery_delivery_Wh / usable_fraction (DoD)
 *   E_nominal_kWh = E_nominal_Wh / 1000
 *
 * Step 5: Required Battery-Bank Capacity (Amp-hours at DC Bus Voltage)
 *   Ah = E_nominal_Wh / system_voltage
 *
 * Step 6: Simplified PV Array Replenishment Estimate
 *   P_pv_replenish_W = E_daily_Wh / (peak_sun_hours * system_efficiency)
 *   (Educational planning estimate; actual yield depends on solar resource, orientation, tilt, temperature, and BOS losses.)
 */

export type DailyEnergyUnit = "kwh" | "wh";

export type BatteryChemistryType = "lifepo4" | "lead_acid_agm" | "custom";

export type SystemVoltage = 12 | 24 | 48;

export interface DailyUsagePreset {
  id: string;
  label: string;
  dailyKwh: number;
  description: string;
}

export const DAILY_USAGE_PRESETS: DailyUsagePreset[] = [
  {
    id: "camper-van",
    label: "Camper Van / Small RV",
    dailyKwh: 1.2,
    description: "Reference preset: 12V compressor fridge, LED lighting, fan, water pump, and mobile charging.",
  },
  {
    id: "off-grid-cabin",
    label: "Off-Grid Cabin",
    dailyKwh: 4.0,
    description: "Reference preset: Efficient DC/AC refrigerator, water pressure pump, laptop, TV, and basic lighting.",
  },
  {
    id: "home-backup",
    label: "Emergency Home Backup",
    dailyKwh: 8.0,
    description: "Reference preset: Critical home circuits including full-size refrigerator, sump pump, WiFi router, and task lighting.",
  },
  {
    id: "whole-home",
    label: "Whole-Home Living",
    dailyKwh: 25.0,
    description: "Reference preset: Full off-grid residential living including HVAC heat pump, laundry, kitchen appliances, and well pump.",
  },
];

export interface ChemistryDefault {
  name: string;
  defaultDoD: number; // e.g. 0.85
  description: string;
}

export const CHEMISTRY_DEFAULTS: Record<BatteryChemistryType, ChemistryDefault> = {
  lifepo4: {
    name: "LiFePO4 (Lithium Iron Phosphate)",
    defaultDoD: 0.85,
    description: "Illustrative default 85% usable depth of discharge. Adjust to your manufacturer's specific warranty or cycle rating.",
  },
  lead_acid_agm: {
    name: "Lead-Acid AGM / Gel Deep-Cycle",
    defaultDoD: 0.50,
    description: "Illustrative default 50% usable depth of discharge to protect plate health and prevent rapid sulfation.",
  },
  custom: {
    name: "Custom Usable Fraction",
    defaultDoD: 0.85,
    description: "User-defined usable discharge limit according to specific battery datasheet guidelines.",
  },
};

export const COMMON_SYSTEM_VOLTAGES: { value: SystemVoltage; label: string; description: string }[] = [
  {
    value: 12,
    label: "12V DC",
    description: "Standard for compact camper vans, small marine vessels, and modest off-grid setups.",
  },
  {
    value: 24,
    label: "24V DC",
    description: "Common for medium off-grid cabins and RV power systems balancing inverter current and wire size.",
  },
  {
    value: 48,
    label: "48V DC",
    description: "Standard for residential energy storage, hybrid inverters, and high-capacity off-grid systems.",
  },
];

export const PEAK_SUN_HOURS_PRESETS = [
  { value: 3.5, label: "3.5 Hours (Winter / Northern Latitudes)" },
  { value: 4.5, label: "4.5 Hours (Average Continental US Baseline)" },
  { value: 5.5, label: "5.5 Hours (Sunbelt / High Summer Insolation)" },
];

export interface SolarBatteryInputs {
  dailyEnergy: number;
  dailyEnergyUnit: DailyEnergyUnit;
  autonomyDays: number;
  systemVoltage: number;
  chemistry: BatteryChemistryType;
  customDoD?: number; // 0.01 - 1.00
  inverterEfficiency: number; // 0.70 - 1.00 (default 0.85)
  peakSunHours?: number; // default 4.5
  systemEfficiency?: number; // default 0.78 (78% balance of system)
}

export interface SolarBatteryOutputs {
  // Step 1: Normalized Daily Energy
  dailyEnergyWh: number;
  dailyEnergyKwh: number;

  // Step 2: Load-Side Autonomy Energy
  autonomyLoadEnergyWh: number;
  autonomyLoadEnergyKwh: number;

  // Step 3: Required Battery-Delivery Energy
  batteryDeliveryEnergyWh: number;
  batteryDeliveryEnergyKwh: number;

  // Step 4: Required Nominal Battery Capacity
  nominalCapacityWh: number;
  nominalCapacityKwh: number;

  // Step 5: Required Battery-Bank Capacity
  batteryBankAh: number;
  systemVoltage: number;

  // Step 6: Simplified PV Replenishment Estimate
  pvReplenishmentWatts: number;
  peakSunHours: number;
  systemEfficiency: number;

  // Active Parameters for Display
  usableFraction: number; // e.g. 0.85
  inverterEfficiency: number; // e.g. 0.85
  autonomyDays: number;

  // Validation
  isValid: boolean;
  errors: string[];
}

export const SOLAR_BATTERY_DEFAULTS: SolarBatteryInputs = {
  dailyEnergy: 5.0,
  dailyEnergyUnit: "kwh",
  autonomyDays: 1.0,
  systemVoltage: 48,
  chemistry: "lifepo4",
  customDoD: 0.85,
  inverterEfficiency: 0.85,
  peakSunHours: 4.5,
  systemEfficiency: 0.78,
};

/**
 * Validates solar battery calculator inputs.
 */
export function validateSolarBatteryInputs(inputs: SolarBatteryInputs): string[] {
  const errors: string[] = [];

  if (typeof inputs.dailyEnergy !== "number" || isNaN(inputs.dailyEnergy) || inputs.dailyEnergy <= 0) {
    errors.push("Daily energy consumption must be a positive number greater than 0.");
  }

  if (typeof inputs.autonomyDays !== "number" || isNaN(inputs.autonomyDays) || inputs.autonomyDays <= 0) {
    errors.push("Days of autonomy must be a positive number greater than 0.");
  }

  if (![12, 24, 48].includes(inputs.systemVoltage) && inputs.systemVoltage <= 0) {
    errors.push("DC system voltage must be a valid positive number.");
  }

  if (
    typeof inputs.inverterEfficiency !== "number" ||
    isNaN(inputs.inverterEfficiency) ||
    inputs.inverterEfficiency <= 0 ||
    inputs.inverterEfficiency > 1.0
  ) {
    errors.push("Inverter efficiency must be between 0.01 (1%) and 1.00 (100%).");
  }

  const dod = inputs.chemistry === "custom" && inputs.customDoD !== undefined
    ? inputs.customDoD
    : CHEMISTRY_DEFAULTS[inputs.chemistry]?.defaultDoD;

  if (typeof dod !== "number" || isNaN(dod) || dod <= 0 || dod > 1.0) {
    errors.push("Usable battery fraction (DoD) must be between 0.01 (1%) and 1.00 (100%).");
  }

  if (inputs.peakSunHours !== undefined && (isNaN(inputs.peakSunHours) || inputs.peakSunHours <= 0)) {
    errors.push("Peak sun hours must be a positive number greater than 0.");
  }

  if (
    inputs.systemEfficiency !== undefined &&
    (isNaN(inputs.systemEfficiency) || inputs.systemEfficiency <= 0 || inputs.systemEfficiency > 1.0)
  ) {
    errors.push("System efficiency must be between 0.01 (1%) and 1.00 (100%).");
  }

  return errors;
}

/**
 * Pure calculation function for solar battery bank sizing.
 */
export function calculateSolarBattery(inputs: SolarBatteryInputs): SolarBatteryOutputs {
  const errors = validateSolarBatteryInputs(inputs);
  const isValid = errors.length === 0;

  if (!isValid) {
    return {
      dailyEnergyWh: 0,
      dailyEnergyKwh: 0,
      autonomyLoadEnergyWh: 0,
      autonomyLoadEnergyKwh: 0,
      batteryDeliveryEnergyWh: 0,
      batteryDeliveryEnergyKwh: 0,
      nominalCapacityWh: 0,
      nominalCapacityKwh: 0,
      batteryBankAh: 0,
      systemVoltage: inputs.systemVoltage || 48,
      pvReplenishmentWatts: 0,
      peakSunHours: inputs.peakSunHours ?? 4.5,
      systemEfficiency: inputs.systemEfficiency ?? 0.78,
      usableFraction: 0.85,
      inverterEfficiency: inputs.inverterEfficiency || 0.85,
      autonomyDays: inputs.autonomyDays || 1.0,
      isValid: false,
      errors,
    };
  }

  // STEP 1: Normalize daily energy to Watt-hours (Wh)
  const dailyEnergyWh = inputs.dailyEnergyUnit === "kwh"
    ? inputs.dailyEnergy * 1000
    : inputs.dailyEnergy;
  const dailyEnergyKwh = dailyEnergyWh / 1000;

  // STEP 2: Load-side autonomy energy
  const autonomyDays = inputs.autonomyDays;
  const autonomyLoadEnergyWh = dailyEnergyWh * autonomyDays;
  const autonomyLoadEnergyKwh = autonomyLoadEnergyWh / 1000;

  // STEP 3: Required battery-delivery energy (Inverter derating)
  const inverterEfficiency = inputs.inverterEfficiency;
  const batteryDeliveryEnergyWh = autonomyLoadEnergyWh / inverterEfficiency;
  const batteryDeliveryEnergyKwh = batteryDeliveryEnergyWh / 1000;

  // STEP 4: Required nominal battery capacity (DoD / usable fraction derating)
  const usableFraction = inputs.chemistry === "custom" && inputs.customDoD !== undefined
    ? inputs.customDoD
    : CHEMISTRY_DEFAULTS[inputs.chemistry].defaultDoD;

  const nominalCapacityWh = batteryDeliveryEnergyWh / usableFraction;
  const nominalCapacityKwh = nominalCapacityWh / 1000;

  // STEP 5: Required battery-bank capacity in Amp-hours (Ah)
  const systemVoltage = inputs.systemVoltage;
  const batteryBankAh = nominalCapacityWh / systemVoltage;

  // STEP 6: Simplified PV array replenishment estimate (Watts)
  const peakSunHours = inputs.peakSunHours ?? 4.5;
  const systemEfficiency = inputs.systemEfficiency ?? 0.78;
  const pvReplenishmentWatts = dailyEnergyWh / (peakSunHours * systemEfficiency);

  return {
    dailyEnergyWh,
    dailyEnergyKwh,
    autonomyLoadEnergyWh,
    autonomyLoadEnergyKwh,
    batteryDeliveryEnergyWh,
    batteryDeliveryEnergyKwh,
    nominalCapacityWh,
    nominalCapacityKwh,
    batteryBankAh,
    systemVoltage,
    pvReplenishmentWatts,
    peakSunHours,
    systemEfficiency,
    usableFraction,
    inverterEfficiency,
    autonomyDays,
    isValid: true,
    errors: [],
  };
}

/**
 * Format helpers for clean UI presentation.
 */
export function formatKwh(value: number, decimals: number = 2): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatWh(value: number, decimals: number = 0): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatAh(value: number, decimals: number = 2): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatWatts(value: number, decimals: number = 0): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export interface SolarBatteryFaq {
  question: string;
  answer: string;
}

export const SOLAR_BATTERY_FAQS: SolarBatteryFaq[] = [
  {
    question: "How do I calculate solar battery capacity?",
    answer:
      "To calculate required solar battery capacity, follow a 4-step derating process: First, determine your daily electrical energy consumption in Watt-hours (Wh). Second, multiply daily energy by your desired days of autonomy (backup duration during sunless periods) to get load-side autonomy energy. Third, divide by your inverter efficiency (typically 85% to 92%) to account for DC-to-AC conversion losses. Fourth, divide by your battery's intended usable depth of discharge (DoD, such as 85% for LiFePO4 or 50% for Lead-Acid) to determine total nominal battery capacity. Finally, divide nominal Watt-hours by your DC bus voltage (12V, 24V, or 48V) to determine required battery bank Amp-hours (Ah).",
  },
  {
    question: "How many batteries do I need for a solar system?",
    answer:
      "The physical quantity of individual battery units required cannot be determined by a single universal formula. It depends on several engineering factors: your total required nominal storage capacity (kWh), the selected DC system bus voltage (12V, 24V, or 48V), the individual voltage and Amp-hour rating of your chosen battery module (such as 12V 100Ah or 48V 100Ah server-rack modules), whether modules are wired in series or parallel, manufacturer limits on parallel battery expansion, and the maximum continuous charge/discharge current permitted by the battery management system (BMS).",
  },
  {
    question: "What does days of autonomy mean in a solar battery bank?",
    answer:
      "Days of autonomy represents the number of consecutive days your battery bank can power your essential electrical loads without any solar energy generation from photovoltaic panels, such as during severe rain, dense overcast skies, or winter storms. Off-grid systems frequently plan for 1 to 3 days of autonomy depending on climate and whether a backup generator is available, while grid-tied solar systems with battery backup often size for 0.5 to 1 day to bridge typical utility grid outages.",
  },
  {
    question: "What is the difference between nominal battery capacity and usable capacity?",
    answer:
      "Nominal capacity (or nameplate capacity) is the total theoretical amount of chemical energy stored inside the battery cells when fully charged (e.g., a 100Ah 12V battery has 1,200Wh nominal capacity). Usable capacity is the practical energy you can safely extract during normal operation without causing premature cell degradation. Modern lithium iron phosphate (LiFePO4) batteries typically support an 80% to 90% usable depth of discharge, whereas traditional flooded and AGM lead-acid batteries are limited to a 50% depth of discharge to avoid plate damage and severe cycle-life penalties.",
  },
  {
    question: "Why does inverter efficiency affect battery bank sizing?",
    answer:
      "Power inverters convert direct current (DC) stored in batteries into alternating current (AC) used by standard household appliances. Inverters consume power during this conversion, with typical real-world efficiencies between 80% and 92%. To supply 1,000 Watt-hours of AC electricity to your loads through an inverter operating at 85% efficiency, the battery bank must physically supply approximately 1,176 Watt-hours of DC power (1,000 ÷ 0.85). Sizing formulas must derate for inverter efficiency so the battery does not run flat prematurely.",
  },
  {
    question: "How do I choose between a 12V, 24V, and 48V DC bus voltage?",
    answer:
      "Sizing larger energy storage systems at higher DC bus voltages can reduce operating current for a given power level. Lower current can reduce conductor sizing and voltage-drop requirements. For example, delivering 2,400 Watts requires 200 Amps at 12V, 100 Amps at 24V, but only 50 Amps at 48V. Lower amperage permits smaller wire gauges, smaller circuit breakers, and generates less resistive heat. Select a system voltage compatible with your inverter, charge controller, battery, and other connected equipment.",
  },
  {
    question: "Does this calculator estimate how much solar PV is needed to recharge the battery?",
    answer:
      "Yes, the calculator provides a simplified daily replenishment estimate based on your daily energy consumption, local peak sun hours, and an illustrative 78% balance-of-system efficiency. However, this is strictly a preliminary educational planning guideline. Actual photovoltaic array production depends heavily on real-world variables including geographical location, seasonal sun trajectory, panel tilt angle, compass azimuth, roof or shading obstructions, ambient operating temperature, soiling, and electrical wiring losses.",
  },
];

