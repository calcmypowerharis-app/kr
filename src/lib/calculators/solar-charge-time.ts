/**
 * Solar Battery Charging Time Calculator Engine
 * Pure TypeScript - Decoupled from React, DOM, and UI
 * CalcMyPower.com
 *
 * Mathematical Logic & Physics Derivations:
 *
 * 1. Battery Deficit Energy:
 *    E_nominal = V_battery * Ah_battery
 *    Delta_SoC = (target_SoC - initial_SoC) / 100
 *    E_deficit = E_nominal * Delta_SoC
 *
 * 2. Energy Required to Recharge (Accounting for Battery Inefficiencies):
 *    E_needed = E_deficit / coulombic_efficiency
 *    - LiFePO4: ~98% coulombic efficiency, linear bulk absorption up to 95%+ SoC.
 *    - Lead-Acid (AGM/Gel): ~85% coulombic efficiency due to internal resistance and absorption soak.
 *    - Flooded Lead-Acid: ~80% coulombic efficiency due to gassing and electrolyte heat.
 *
 * 3. Effective Solar Array Output (Derated for Real-World Losses):
 *    P_effective = P_rated * net_system_efficiency
 *    - Environmental derate: ~85% (thermal cell losses above 25°C STC, dust/soiling, cable resistance).
 *    - MPPT Controller: ~96.5% DC-DC conversion efficiency -> Net system efficiency ≈ 82%.
 *    - PWM Controller: ~77% voltage mismatch (clamps ~18V Vmp to ~13.5V-14V) -> Net system efficiency ≈ 65%.
 *
 * 4. Charging Time in Peak Sun Hours (PSH):
 *    T_psh = E_needed / P_effective
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
  initialSocPercent: number; // 0 to 99
  targetSocPercent: number; // 1 to 100
  chemistry: BatteryChemistry;
  solarWatts: number; // Rated STC Watts
  controllerType: ControllerTechnology;
  peakSunHoursPerDay: number; // e.g. 2.0 to 7.0, default 4.5
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
    efficiency: number;
    bulkVoltageMultiplier: number;
    maxRecommendedCRate: number;
    description: string;
    absorptionNote: string;
  }
> = {
  lifepo4: {
    name: "LiFePO4 (Lithium Iron Phosphate)",
    efficiency: 0.98,
    bulkVoltageMultiplier: 1.183, // 14.2V on 12V nominal
    maxRecommendedCRate: 0.5,
    description: "High charge acceptance with 98% coulombic efficiency and negligible absorption taper.",
    absorptionNote: "LiFePO4 batteries accept full charging current until 95% to 98% state of charge, followed by a brief cell-balancing absorption cycle.",
  },
  lead_acid_agm: {
    name: "Lead-Acid (AGM / Sealed Deep-Cycle)",
    efficiency: 0.85,
    bulkVoltageMultiplier: 1.20, // 14.4V on 12V nominal
    maxRecommendedCRate: 0.25,
    description: "Standard sealed deep-cycle battery with ~85% average charge efficiency over a full cycle.",
    absorptionNote: "AGM batteries switch from bulk to absorption mode at roughly 80% SoC. Current tapers down continuously for the remaining 20%, requiring 2 to 4 hours of steady sunlight to reach true 100% saturation.",
  },
  lead_acid_flooded: {
    name: "Lead-Acid (Flooded Deep-Cycle)",
    efficiency: 0.80,
    bulkVoltageMultiplier: 1.217, // 14.6V on 12V nominal
    maxRecommendedCRate: 0.20,
    description: "Traditional vented lead-acid with ~80% efficiency due to electrolyte heating and gassing.",
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
    description: "Converts excess panel voltage into charging current with 82% net outdoor system yield after thermal and wiring losses.",
  },
  pwm: {
    name: "PWM (Pulse Width Modulation)",
    systemEfficiency: 0.65,
    description: "Clamps solar panel voltage directly to battery level, sacrificing 20% to 30% of potential panel wattage alongside thermal derating.",
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
  const voltage = input.batteryVoltage;
  const capacityAh = Math.max(1, input.batteryCapacityAh);
  const initialSoc = Math.min(99, Math.max(0, input.initialSocPercent));
  const targetSoc = Math.min(100, Math.max(initialSoc + 1, input.targetSocPercent));
  const solarWatts = Math.max(10, input.solarWatts);
  const psh = Math.max(0.5, input.peakSunHoursPerDay);

  const chemProfile = CHEMISTRY_PROFILES[input.chemistry] || CHEMISTRY_PROFILES.lifepo4;
  const ctrlProfile = CONTROLLER_PROFILES[input.controllerType] || CONTROLLER_PROFILES.mppt;

  // 2. Battery energy math
  const nominalBatteryEnergyWh = voltage * capacityAh;
  const deficitPercent = (targetSoc - initialSoc) / 100;
  const deficitEnergyWh = nominalBatteryEnergyWh * deficitPercent;
  const energyNeededWh = deficitEnergyWh / chemProfile.efficiency;

  // 3. Solar generation math
  const effectiveSolarWatts = solarWatts * ctrlProfile.systemEfficiency;
  const bulkChargingVoltage = voltage * chemProfile.bulkVoltageMultiplier;
  const effectiveChargingAmps = effectiveSolarWatts / bulkChargingVoltage;
  const cRate = effectiveChargingAmps / capacityAh;

  // 4. Charging time math
  const chargeTimePeakSunHours = effectiveSolarWatts > 0 ? energyNeededWh / effectiveSolarWatts : 0;
  const chargeTimeDays = psh > 0 ? chargeTimePeakSunHours / psh : 0;

  // 5. Advisories & safety warnings
  let cRateWarning: string | undefined;
  if (cRate > chemProfile.maxRecommendedCRate) {
    cRateWarning = `Effective charge current (${effectiveChargingAmps.toFixed(1)}A) equals ${cRate.toFixed(2)}C, which exceeds the typical ${chemProfile.maxRecommendedCRate}C recommended limit for this chemistry. Verify manufacturer charge current specifications to prevent overheating.`;
  }

  const assumptions = [
    `Solar array derate factor: ${(ctrlProfile.systemEfficiency * 100).toFixed(0)}% net yield (accounting for panel temperature above 25°C STC, soiling, wiring, and ${ctrlProfile.name}).`,
    `Battery coulombic efficiency: ${(chemProfile.efficiency * 100).toFixed(0)}% (${chemProfile.name}).`,
    `Daily solar window: ${psh.toFixed(1)} peak sun hours per day at 1,000 W/m² equivalent irradiance.`,
    `Zero simultaneous DC or AC load draws while recharging. Active loads will extend charging duration proportionally.`,
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
