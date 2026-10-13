/**
 * Solar Battery Charging Time Calculator Engine
 * Pure TypeScript - Decoupled from React, DOM, and UI
 * CalcMyPower.com
 *
 * Mathematical Logic & Engineering Standards:
 *
 * 1. Battery Deficit Energy:
 *    E_nominal = V_battery * Ah_battery (Watt-hours)
 *    Delta_SoC = max(0, target_SoC - initial_SoC) / 100
 *    E_deficit = E_nominal * Delta_SoC (Watt-hours)
 *
 * 2. Energy Required to Recharge (One-Way Charging Energy Efficiency):
 *    E_needed = E_deficit / charge_energy_efficiency
 *
 *    Engineering Distinction:
 *    - Coulombic (Amp-hour) efficiency (eta_C) measures electron retention:
 *      >99% for LiFePO4, ~90-95% for lead-acid in bulk phase.
 *    - One-way charging energy efficiency (eta_charge) measures Watt-hour replenishment
 *      accounting for electrochemical overpotential (V_charge > V_nominal) and internal resistance.
 *      Typical one-way cycle values: LiFePO4 ~98%, AGM ~85%, Flooded ~80% (IEEE Std 1013).
 *    - Round-trip efficiency (eta_RTE ≈ eta_charge * eta_discharge) is lower:
 *      LiFePO4 ~92-95%, AGM ~80-85%, Flooded ~70-75%.
 *
 * 3. Effective Solar Array Output (Derated for Real-World Field Conditions):
 *    P_effective = P_rated * net_system_yield_factor
 *    - MPPT Controller: ~82% net yield illustrative baseline
 *      (accounts for ~10-15% cell thermal losses above 25°C STC per NREL PVWatts benchmarks,
 *       ~2-3% dust/soiling, ~1.5-2% DC wiring resistance, and 96-98% MPPT conversion efficiency).
 *    - PWM Controller: ~65% net yield illustrative baseline
 *      (accounts for ~15% thermal/environmental derate plus ~23% operating voltage mismatch
 *       when clamping ~18V Vmp panel output to ~13.6V-14.2V battery voltage).
 *    Note: Array yield factors are illustrative engineering baselines; cold winter days can
 *    produce higher array outputs, whereas hot desert rooftops or suboptimal tilt angles will
 *    reduce output further.
 *
 * 4. Charging Time in Peak Sun Hours (PSH):
 *    T_psh = E_needed / P_effective (hours of 1,000 W/m² equivalent irradiance)
 *
 * 5. Estimated Calendar Days:
 *    Days = T_psh / daily_peak_sun_hours
 */

export type BatteryChemistry = "lifepo4" | "lead_acid_agm" | "lead_acid_flooded";
export type ControllerTechnology = "mppt" | "pwm";
export type SystemVoltage = 12 | 24 | 48;

export interface SolarChargeTimeInput {
  batteryVoltage: SystemVoltage;
  batteryCapacityAh: number;
  initialSocPercent: number; // 0 to 100
  targetSocPercent: number; // 0 to 100
  chemistry: BatteryChemistry;
  solarWatts: number; // Rated STC Watts
  controllerType: ControllerTechnology;
  peakSunHoursPerDay: number; // e.g. 1.0 to 7.0, default 4.5
}

export interface SolarChargeTimeResult {
  nominalBatteryEnergyWh: number;
  deficitEnergyWh: number;
  energyNeededWh: number;
  effectiveSolarWatts: number;
  effectiveChargingAmps: number;
  cRate: number;
  chargeTimePeakSunHours: number;
  chargeTimeDays: number;
  systemEfficiencyPercent: number;
  batteryEfficiencyPercent: number;
  cRateWarning?: string;
  absorptionNote?: string;
  assumptions: string[];
}

export interface SolarPreset {
  id: string;
  name: string;
  description: string;
  input: SolarChargeTimeInput;
}

export const CHEMISTRY_PROFILES: Record<
  BatteryChemistry,
  {
    name: string;
    efficiency: number; // One-way charging energy efficiency (Wh basis)
    chargeEnergyEfficiency: number;
    bulkVoltageMultiplier: number;
    maxRecommendedCRate: number;
    description: string;
    absorptionNote: string;
  }
> = {
  lifepo4: {
    name: "LiFePO4 (Lithium Iron Phosphate)",
    efficiency: 0.98,
    chargeEnergyEfficiency: 0.98,
    bulkVoltageMultiplier: 1.183, // ~14.2V on 12V, 28.4V on 24V, 56.8V on 48V
    maxRecommendedCRate: 0.5,
    description: "High charge acceptance with 98% one-way energy efficiency and minimal absorption taper.",
    absorptionNote: "LiFePO4 batteries accept full charging current until 95% to 98% state of charge, followed by a brief cell-balancing absorption cycle.",
  },
  lead_acid_agm: {
    name: "Lead-Acid (AGM / Sealed Deep-Cycle)",
    efficiency: 0.85,
    chargeEnergyEfficiency: 0.85,
    bulkVoltageMultiplier: 1.20, // ~14.4V on 12V, 28.8V on 24V, 57.6V on 48V
    maxRecommendedCRate: 0.25,
    description: "Sealed deep-cycle battery with ~85% one-way charge energy efficiency across a full replenishment cycle.",
    absorptionNote: "AGM batteries switch from bulk to constant-voltage absorption at roughly 80% SoC. Current tapers down continuously for the remaining 20%, requiring 2 to 4 hours of steady sunlight to achieve full chemical saturation.",
  },
  lead_acid_flooded: {
    name: "Lead-Acid (Flooded Deep-Cycle)",
    efficiency: 0.80,
    chargeEnergyEfficiency: 0.80,
    bulkVoltageMultiplier: 1.217, // ~14.6V on 12V, 29.2V on 24V, 58.4V on 48V
    maxRecommendedCRate: 0.20,
    description: "Traditional vented lead-acid with ~80% one-way charge energy efficiency due to internal resistance and gassing losses.",
    absorptionNote: "Flooded batteries require an extended absorption soak and periodic equalizing charges. Recharging from 80% to 100% takes substantially longer than the initial bulk phase.",
  },
};

export const CONTROLLER_PROFILES: Record<
  ControllerTechnology,
  {
    name: string;
    systemEfficiency: number;
    description: string;
  }
> = {
  mppt: {
    name: "MPPT (Maximum Power Point Tracking)",
    systemEfficiency: 0.82,
    description: "Illustrative baseline: converts excess panel voltage into charging current with 82% net outdoor system yield after thermal derating, wiring resistance, and conversion efficiency.",
  },
  pwm: {
    name: "PWM (Pulse Width Modulation)",
    systemEfficiency: 0.65,
    description: "Illustrative baseline: clamps panel voltage directly to battery terminal voltage, yielding ~65% net outdoor system power after voltage mismatch and thermal derating.",
  },
};

export const COMMON_SOLAR_CHARGE_PRESETS: SolarPreset[] = [
  {
    id: "rv-van-100ah-200w",
    name: "RV / Van Setup: 100Ah Lithium + 200W Solar (MPPT)",
    description: "Common camper van configuration with 200W solar charging a 12V 100Ah LiFePO4 battery from 20% to 100%.",
    input: {
      batteryVoltage: 12,
      batteryCapacityAh: 100,
      initialSocPercent: 20,
      targetSocPercent: 100,
      chemistry: "lifepo4",
      solarWatts: 200,
      controllerType: "mppt",
      peakSunHoursPerDay: 4.5,
    },
  },
  {
    id: "portable-100ah-100w-pwm",
    name: "Weekend Camper: 100Ah AGM + 100W Solar (PWM)",
    description: "Budget 100W portable solar kit charging a 12V 100Ah AGM deep-cycle battery from 50% to 100%.",
    input: {
      batteryVoltage: 12,
      batteryCapacityAh: 100,
      initialSocPercent: 50,
      targetSocPercent: 100,
      chemistry: "lead_acid_agm",
      solarWatts: 100,
      controllerType: "pwm",
      peakSunHoursPerDay: 4.0,
    },
  },
  {
    id: "offgrid-cabin-200ah-800w",
    name: "Off-Grid Cabin: 24V 200Ah Lithium + 800W Solar (MPPT)",
    description: "Substantial 4.8 kWh off-grid battery bank recharged by two 400W solar modules with an MPPT controller.",
    input: {
      batteryVoltage: 24,
      batteryCapacityAh: 200,
      initialSocPercent: 20,
      targetSocPercent: 100,
      chemistry: "lifepo4",
      solarWatts: 800,
      controllerType: "mppt",
      peakSunHoursPerDay: 5.0,
    },
  },
  {
    id: "trolling-motor-50ah-100w",
    name: "Marine Trolling: 12V 50Ah Lithium + 100W Solar (MPPT)",
    description: "Compact boat setup maintaining a dedicated 12V 50Ah LiFePO4 battery with a 100W panel.",
    input: {
      batteryVoltage: 12,
      batteryCapacityAh: 50,
      initialSocPercent: 30,
      targetSocPercent: 100,
      chemistry: "lifepo4",
      solarWatts: 100,
      controllerType: "mppt",
      peakSunHoursPerDay: 4.5,
    },
  },
];

export function calculateSolarChargeTime(input: SolarChargeTimeInput): SolarChargeTimeResult {
  // 1. Sanitize and validate inputs
  const voltage: SystemVoltage =
    input.batteryVoltage === 24 ? 24 : input.batteryVoltage === 48 ? 48 : 12;
  const capacityAh = Math.max(0, Number(input.batteryCapacityAh) || 0);
  const initialSoc = Math.min(100, Math.max(0, Number(input.initialSocPercent) || 0));
  const targetSoc = Math.min(100, Math.max(0, Number(input.targetSocPercent) || 0));
  const solarWatts = Math.max(0, Number(input.solarWatts) || 0);
  const psh = Math.max(0.1, Number(input.peakSunHoursPerDay) || 4.5);

  const chemProfile = CHEMISTRY_PROFILES[input.chemistry] || CHEMISTRY_PROFILES.lifepo4;
  const ctrlProfile = CONTROLLER_PROFILES[input.controllerType] || CONTROLLER_PROFILES.mppt;

  // 2. Battery energy math
  const nominalBatteryEnergyWh = voltage * capacityAh;
  const deficitPercent = Math.max(0, targetSoc - initialSoc) / 100;
  const deficitEnergyWh = nominalBatteryEnergyWh * deficitPercent;
  const energyNeededWh =
    chemProfile.efficiency > 0 && deficitEnergyWh > 0
      ? deficitEnergyWh / chemProfile.efficiency
      : 0;

  // 3. Solar generation math
  const effectiveSolarWatts = solarWatts * ctrlProfile.systemEfficiency;
  const bulkChargingVoltage = voltage * chemProfile.bulkVoltageMultiplier;
  const effectiveChargingAmps =
    bulkChargingVoltage > 0 && effectiveSolarWatts > 0
      ? effectiveSolarWatts / bulkChargingVoltage
      : 0;
  const cRate = capacityAh > 0 ? effectiveChargingAmps / capacityAh : 0;

  // 4. Charging time math (PSH and days)
  const chargeTimePeakSunHours =
    effectiveSolarWatts > 0 && energyNeededWh > 0
      ? energyNeededWh / effectiveSolarWatts
      : 0;
  const chargeTimeDays = psh > 0 ? chargeTimePeakSunHours / psh : 0;

  // 5. Advisories & safety warnings
  let cRateWarning: string | undefined;
  if (cRate > chemProfile.maxRecommendedCRate && capacityAh > 0 && effectiveChargingAmps > 0) {
    cRateWarning = `Advisory: Calculated charge current (${effectiveChargingAmps.toFixed(1)}A / ${cRate.toFixed(2)}C) exceeds the typical ${chemProfile.maxRecommendedCRate}C industry guideline for standard ${chemProfile.name} batteries. Actual maximum safe charge current depends on the manufacturer's specific cell chemistry and BMS limits; verify your battery datasheet.`;
  }

  const roundTripEstimate =
    input.chemistry === "lifepo4"
      ? "92-95%"
      : input.chemistry === "lead_acid_agm"
      ? "80-85%"
      : "70-75%";

  const assumptions = [
    `Solar array yield factor: ${(ctrlProfile.systemEfficiency * 100).toFixed(0)}% (illustrative baseline accounting for cell heat above 25°C STC, soiling, DC wiring, and ${ctrlProfile.name} efficiency). Actual field yield varies with climate and installation geometry.`,
    `Battery one-way charging energy efficiency: ${(chemProfile.efficiency * 100).toFixed(0)}% (${chemProfile.name}). Note that one-way charging energy efficiency (Wh basis) differs from round-trip cycle efficiency (~${roundTripEstimate}) and Coulombic amp-hour efficiency.`,
    `Local solar window: ${psh.toFixed(1)} peak sun hours per day at 1,000 W/m² equivalent direct irradiance.`,
    `Zero simultaneous DC or AC load draws while recharging. Active electrical loads (such as a 12V refrigerator or inverter idle draw) divert solar current and extend charging time proportionally.`,
  ];

  return {
    nominalBatteryEnergyWh: Math.round(nominalBatteryEnergyWh),
    deficitEnergyWh: Math.round(deficitEnergyWh),
    energyNeededWh: Math.round(energyNeededWh),
    effectiveSolarWatts: Number(effectiveSolarWatts.toFixed(1)),
    effectiveChargingAmps: Number(effectiveChargingAmps.toFixed(1)),
    cRate: Number(cRate.toFixed(3)),
    chargeTimePeakSunHours: Number(chargeTimePeakSunHours.toFixed(2)),
    chargeTimeDays: Number(chargeTimeDays.toFixed(2)),
    systemEfficiencyPercent: Math.round(ctrlProfile.systemEfficiency * 100),
    batteryEfficiencyPercent: Math.round(chemProfile.efficiency * 100),
    cRateWarning,
    absorptionNote: chemProfile.absorptionNote,
    assumptions,
  };
}
