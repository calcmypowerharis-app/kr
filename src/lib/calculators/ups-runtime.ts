/**
 * UPS & Battery Backup Run-Time Calculator Logic
 * Pure TypeScript — No UI or DOM dependencies
 * 
 * Formula:
 * Usable Energy (Wh) = Voltage (V) × Capacity (Ah) × Depth of Discharge (DoD) × Inverter Efficiency (η)
 * Runtime (Hours) = Usable Energy (Wh) / Load (Watts)
 * Battery Current Draw (Amps) = Load (Watts) / (Voltage (V) × Inverter Efficiency (η))
 */

import { formatHoursToHoursMinutes } from "../units";

export type BatteryChemistry = "lead_acid" | "lifepo4" | "lithium_ion" | "custom";

export interface UpsRuntimeInputs {
  /** Total continuous load in Watts (W) */
  loadWatts: number;
  /** Nominal battery bank voltage (V), e.g., 12, 24, 48 */
  batteryVoltage: number;
  /** Total battery bank capacity in Amp-hours (Ah) */
  batteryCapacityAh: number;
  /** Battery chemistry profile */
  batteryChemistry: BatteryChemistry;
  /** Custom Depth of Discharge (0.1 to 1.0), used if chemistry is 'custom' or default is overridden */
  depthOfDischarge?: number;
  /** Inverter DC-to-AC conversion efficiency (0.5 to 1.0), default ~0.85 */
  inverterEfficiency?: number;
  /** Power factor of load (typically 0.8 for reactive loads, 1.0 for pure resistive) */
  powerFactor?: number;
}

export interface UpsRuntimeOutputs {
  /** Total nominal capacity in Watt-hours (Wh) */
  totalStoredWh: number;
  /** Usable energy in Watt-hours (Wh) after DoD and efficiency */
  usableWh: number;
  /** Usable energy in Kilowatt-hours (kWh) */
  usableKwh: number;
  /** Decimal runtime in hours */
  runtimeHours: number;
  /** Human-readable formatted runtime (e.g. '3 hr 45 min') */
  formattedRuntime: string;
  /** Breakdown: hours */
  hours: number;
  /** Breakdown: minutes */
  minutes: number;
  /** Continuous DC current drawn from battery bank in Amps (A) */
  dcCurrentAmps: number;
  /** Recommended minimum inverter continuous rating in Watts (1.25× practical planning margin) */
  recommendedInverterWatts: number;
  /** Recommended inverter VA rating based on power factor */
  recommendedInverterVa: number;
  /** Active Depth of Discharge percentage used */
  usedDoDPercent: number;
  /** Active Efficiency percentage used */
  usedEfficiencyPercent: number;
  /** Input warnings or notes (e.g. heavy discharge rate) */
  warnings: string[];
}

export const CHEMISTRY_DEFAULTS: Record<
  BatteryChemistry,
  { name: string; defaultDoD: number; description: string }
> = {
  lead_acid: {
    name: "Lead-Acid — AGM / Gel",
    defaultDoD: 0.50, // 50% max to preserve cycle life
    description: "Recommended maximum 50% discharge depth to prevent premature degradation.",
  },
  lifepo4: {
    name: "LiFePO4 — Lithium",
    defaultDoD: 0.90, // 90% usable safely
    description: "Modern deep-cycle lithium standard; safe down to 80–90% discharge.",
  },
  lithium_ion: {
    name: "Lithium-Ion — NMC",
    defaultDoD: 0.80, // 80% usable safely
    description: "Typical consumer portable power stations; safe down to 80% discharge.",
  },
  custom: {
    name: "Custom Discharge Depth",
    defaultDoD: 0.85,
    description: "User-defined depth of discharge.",
  },
};

export const COMMON_BATTERY_VOLTAGES = [12, 24, 36, 48];

export function calculateUpsRuntime(inputs: UpsRuntimeInputs): UpsRuntimeOutputs {
  const warnings: string[] = [];

  // Guard against invalid/zero inputs
  const loadWatts = Math.max(0, Number(inputs.loadWatts) || 0);
  const voltage = Math.max(1, Number(inputs.batteryVoltage) || 12);
  const capacityAh = Math.max(0, Number(inputs.batteryCapacityAh) || 0);
  const powerFactor = Math.min(1.0, Math.max(0.5, Number(inputs.powerFactor) || 0.8));

  // Determine DoD
  let dod = inputs.depthOfDischarge;
  if (dod === undefined || isNaN(dod) || dod <= 0 || dod > 1.0) {
    dod = CHEMISTRY_DEFAULTS[inputs.batteryChemistry]?.defaultDoD ?? 0.85;
  }
  // Clamp DoD between 10% and 100%
  dod = Math.min(1.0, Math.max(0.1, dod));

  // Determine Inverter Efficiency (default 85%)
  let efficiency = inputs.inverterEfficiency;
  if (efficiency === undefined || isNaN(efficiency) || efficiency <= 0 || efficiency > 1.0) {
    efficiency = 0.85;
  }
  efficiency = Math.min(1.0, Math.max(0.5, efficiency));

  // Total nominal stored energy = V × Ah
  const totalStoredWh = voltage * capacityAh;

  // Usable DC energy after DoD
  const usableDcWh = totalStoredWh * dod;

  // Usable AC energy delivered to load after inverter conversion loss
  const usableWh = usableDcWh * efficiency;
  const usableKwh = usableWh / 1000;

  // Runtime calculation
  let runtimeHours = 0;
  if (loadWatts > 0) {
    runtimeHours = usableWh / loadWatts;
  } else if (usableWh > 0) {
    runtimeHours = 999; // Standby with no load
  }

  // Format runtime
  const timeBreakdown = formatHoursToHoursMinutes(runtimeHours);

  // DC Current Draw = Load (W) / (V × efficiency)
  const dcCurrentAmps = efficiency > 0 && voltage > 0 && loadWatts > 0
    ? loadWatts / (voltage * efficiency)
    : 0;

  // Inverter Sizing recommendations
  // 1.25x practical continuous planning margin
  const recommendedInverterWatts = Math.ceil((loadWatts * 1.25) / 50) * 50;
  const recommendedInverterVa = Math.ceil((recommendedInverterWatts / powerFactor) / 50) * 50;

  // Engineering Warnings & Checks
  if (inputs.batteryChemistry === "lead_acid" && capacityAh > 0) {
    const cRate = dcCurrentAmps / capacityAh;
    if (cRate > 0.2) {
      warnings.push(
        `Discharge rate (${cRate.toFixed(2)}C) is high for Lead-Acid batteries. Due to Peukert's effect, actual runtime may be 15–30% shorter than this ideal estimate.`
      );
    }
  }

  if (dcCurrentAmps > 100) {
    warnings.push(
      `High DC current draw (${dcCurrentAmps.toFixed(1)} A). Ensure appropriate wire gauge (e.g. 2 AWG or 1/0 AWG) and inline fusing for safety.`
    );
  }

  if (loadWatts <= 0) {
    warnings.push("Load is currently 0 Watts. Enter appliance wattage to calculate runtime.");
  }

  return {
    totalStoredWh: Math.round(totalStoredWh),
    usableWh: Math.round(usableWh),
    usableKwh: parseFloat(usableKwh.toFixed(2)),
    runtimeHours: parseFloat(runtimeHours.toFixed(2)),
    formattedRuntime: loadWatts > 0 ? timeBreakdown.formattedText : "Indefinite (No Load)",
    hours: timeBreakdown.hours,
    minutes: timeBreakdown.minutes,
    dcCurrentAmps: parseFloat(dcCurrentAmps.toFixed(1)),
    recommendedInverterWatts: Math.max(100, recommendedInverterWatts),
    recommendedInverterVa: Math.max(150, recommendedInverterVa),
    usedDoDPercent: Math.round(dod * 100),
    usedEfficiencyPercent: Math.round(efficiency * 100),
    warnings,
  };
}
