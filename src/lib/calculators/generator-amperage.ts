/**
 * Generator Amperage Chart & Electrical Calculator Logic
 * Pure TypeScript: Decoupled from React and DOM
 * CalcMyPower.com
 *
 * Formulas:
 * 1. AC Single-Phase (120V or 240V):
 *    I = P / (V × PF)
 * 2. AC Split-Phase (120/240V Dual Voltage):
 *    I_240V = P / (240 × PF)
 *    I_120V_per_leg = (P / 2) / (120 × PF) = I_240V
 *    I_120V_combined = P / (120 × PF) = 2 × I_240V (when parallel or full 120V winding switch is engaged)
 * 3. AC Three-Phase (Balanced Line-to-Line):
 *    I = P / (√3 × V_LL × PF)
 * 4. Continuous Safe Operating Load (NEC Article 210.20):
 *    I_continuous = I_rated × 0.80
 */

export type GeneratorVoltageConfig =
  | "120v_single"
  | "240v_single"
  | "120_240v_split"
  | "208v_three"
  | "480v_three";

export interface GeneratorAmperageInputs {
  /** Real power in Watts (W) */
  powerWatts: number;
  /** Voltage configuration */
  voltageConfig: GeneratorVoltageConfig;
  /** Power factor (0.5 to 1.0). Default is 1.0 for portable/residential generators */
  powerFactor?: number;
  /** Continuous load derating percentage (e.g., 80 for 80% NEC rule, 100 for unrated maximum) */
  continuousLoadPercent?: number;
}

export interface GeneratorValidationError {
  field: "powerWatts" | "powerFactor" | "continuousLoadPercent";
  message: string;
}

export interface SplitPhaseBreakdown {
  /** Full rated current at 240V (across both lines L1 and L2) in Amps */
  ampsAt240V: number;
  /** Rated current per individual 120V hot leg (balanced load) in Amps */
  ampsPer120VLeg: number;
  /** Maximum combined current at 120V if 120V full-power switch is engaged in Amps */
  total120VCombinedAmps: number;
  formattedAmpsAt240V: string;
  formattedAmpsPer120VLeg: string;
  formattedTotal120VCombinedAmps: string;
}

export interface GeneratorAmperageOutputs {
  /** Real power in Watts (W) */
  powerWatts: number;
  /** Real power in Kilowatts (kW) */
  powerKw: number;
  /** Apparent power in Volt-Amperes (VA or kVA) */
  apparentPowerVa: number;
  apparentPowerKva: number;
  /** Active voltage configuration */
  voltageConfig: GeneratorVoltageConfig;
  /** Reference voltage in Volts */
  nominalVoltage: number;
  /** Active power factor */
  powerFactor: number;
  /** Full rated output current in Amperes (A) */
  ratedAmps: number;
  formattedRatedAmps: string;
  /** Continuous safe operating current (typically 80% of rated amps) */
  continuousSafeAmps: number;
  formattedContinuousSafeAmps: string;
  /** Breakdown for 120/240V split-phase systems */
  splitPhaseDetails?: SplitPhaseBreakdown;
  /** Recommended standard circuit breaker rating in Amperes */
  recommendedBreakerAmps: number;
  /** Standard NEMA receptacle type typically installed on this generator size */
  recommendedReceptacleNema: string;
  /** Minimum copper conductor gauge (AWG) at 75°C insulation per NEC 310.16 */
  recommendedMinCopperWireAwg: string;
  /** Summary formula explanation with substituted values */
  formulaExplanation: string;
  /** Validation errors */
  errors: GeneratorValidationError[];
  /** Engineering cautions and advisory notes */
  warnings: string[];
  /** Whether inputs and outputs represent a valid physical generator state */
  isValid: boolean;
}

export interface GeneratorChartRow {
  watts: number;
  kw: number;
  category: "Compact Inverter" | "Medium Portable" | "Heavy Standby";
  ratedAmps120V: number;
  ratedAmps240V: number;
  continuousAmps120V: number;
  continuousAmps240V: number;
  typicalNemaOutlet: string;
  minWireGauge: string;
  commonApplications: string;
}

export const GENERATOR_VOLTAGE_OPTIONS: {
  value: GeneratorVoltageConfig;
  label: string;
  nominalVoltage: number;
  description: string;
}[] = [
  {
    value: "120_240v_split",
    label: "120/240V Split-Phase (Standard US Home Backup)",
    nominalVoltage: 240,
    description: "Standard dual-voltage generator with two 120V legs and one 240V output via 4-prong receptacle.",
  },
  {
    value: "120v_single",
    label: "120V Single-Phase (Compact Inverter / RV)",
    nominalVoltage: 120,
    description: "Standard 120V single-voltage output found on suitcase inverters and tailgating units.",
  },
  {
    value: "240v_single",
    label: "240V Single-Phase (High Voltage Dedicated)",
    nominalVoltage: 240,
    description: "Dedicated 240V single-phase circuit for pumps, welders, or heavy industrial equipment.",
  },
  {
    value: "208v_three",
    label: "208V Three-Phase Balanced (Commercial)",
    nominalVoltage: 208,
    description: "Standard commercial 120/208V 3-phase wye service line-to-line voltage.",
  },
  {
    value: "480v_three",
    label: "480V Three-Phase Balanced (Industrial)",
    nominalVoltage: 480,
    description: "Commercial and industrial standby prime generators feeding 277/480V wye distribution.",
  },
];

export const STANDARD_GENERATOR_PRESETS = [
  { label: "2,000W Inverter (Honda/Champion)", watts: 2000, config: "120v_single" as GeneratorVoltageConfig },
  { label: "3,500W RV Generator", watts: 3500, config: "120v_single" as GeneratorVoltageConfig },
  { label: "5,000W Emergency Backup", watts: 5000, config: "120_240v_split" as GeneratorVoltageConfig },
  { label: "7,500W Portable (Transfer Switch)", watts: 7500, config: "120_240v_split" as GeneratorVoltageConfig },
  { label: "10,000W Heavy Portable", watts: 10000, config: "120_240v_split" as GeneratorVoltageConfig },
  { label: "12,000W Large Portable / Dual Fuel", watts: 12000, config: "120_240v_split" as GeneratorVoltageConfig },
  { label: "20,000W Whole House Standby (Generac)", watts: 20000, config: "120_240v_split" as GeneratorVoltageConfig },
  { label: "24,000W Whole House Standby", watts: 24000, config: "120_240v_split" as GeneratorVoltageConfig },
];

/**
 * Standard generator size matrix for reference charts (1,000W to 26,000W).
 */
export const GENERATOR_AMPERAGE_CHART_DATA: GeneratorChartRow[] = [
  {
    watts: 1000,
    kw: 1.0,
    category: "Compact Inverter",
    ratedAmps120V: 8.3,
    ratedAmps240V: 0,
    continuousAmps120V: 6.7,
    continuousAmps240V: 0,
    typicalNemaOutlet: "NEMA 5-15R (15A Duplex)",
    minWireGauge: "14 AWG Cu",
    commonApplications: "Camping, tailgating, phone charging, LED lights, laptops",
  },
  {
    watts: 1500,
    kw: 1.5,
    category: "Compact Inverter",
    ratedAmps120V: 12.5,
    ratedAmps240V: 0,
    continuousAmps120V: 10.0,
    typicalNemaOutlet: "NEMA 5-15R or 5-20R",
    continuousAmps240V: 0,
    minWireGauge: "14 AWG Cu",
    commonApplications: "Small refrigerator, television, internet router, CPAP machine",
  },
  {
    watts: 2000,
    kw: 2.0,
    category: "Compact Inverter",
    ratedAmps120V: 16.7,
    ratedAmps240V: 0,
    continuousAmps120V: 13.3,
    continuousAmps240V: 0,
    typicalNemaOutlet: "NEMA 5-20R (20A Duplex)",
    minWireGauge: "12 AWG Cu",
    commonApplications: "Standard household refrigerator, TV, microwave (one at a time)",
  },
  {
    watts: 2500,
    kw: 2.5,
    category: "Compact Inverter",
    ratedAmps120V: 20.8,
    ratedAmps240V: 0,
    continuousAmps120V: 16.7,
    continuousAmps240V: 0,
    typicalNemaOutlet: "NEMA 5-20R or TT-30R",
    minWireGauge: "12 AWG Cu",
    commonApplications: "RV 30A plug, refrigerator, small window air conditioner",
  },
  {
    watts: 3000,
    kw: 3.0,
    category: "Compact Inverter",
    ratedAmps120V: 25.0,
    ratedAmps240V: 0,
    continuousAmps120V: 20.0,
    continuousAmps240V: 0,
    typicalNemaOutlet: "NEMA TT-30R (30A RV) or L5-30R",
    minWireGauge: "10 AWG Cu",
    commonApplications: "RV 13,500 BTU rooftop AC, refrigerator, power tools",
  },
  {
    watts: 3500,
    kw: 3.5,
    category: "Medium Portable",
    ratedAmps120V: 29.2,
    ratedAmps240V: 0,
    continuousAmps120V: 23.3,
    continuousAmps240V: 0,
    typicalNemaOutlet: "NEMA TT-30R / L5-30R",
    minWireGauge: "10 AWG Cu",
    commonApplications: "Full RV trailer power, jobsite air compressor, furnace blower",
  },
  {
    watts: 4000,
    kw: 4.0,
    category: "Medium Portable",
    ratedAmps120V: 33.3,
    ratedAmps240V: 16.7,
    continuousAmps120V: 26.7,
    continuousAmps240V: 13.3,
    typicalNemaOutlet: "NEMA L14-20R or L14-30R",
    minWireGauge: "10 AWG Cu",
    commonApplications: "Gas furnace, refrigerator, sump pump, lights, basic circuits",
  },
  {
    watts: 5000,
    kw: 5.0,
    category: "Medium Portable",
    ratedAmps120V: 41.7,
    ratedAmps240V: 20.8,
    continuousAmps120V: 33.3,
    continuousAmps240V: 16.7,
    typicalNemaOutlet: "NEMA L14-30R (30A 120/240V)",
    minWireGauge: "10 AWG Cu",
    commonApplications: "Home backup via manual transfer switch, 1/2 HP well pump, freezer",
  },
  {
    watts: 6500,
    kw: 6.5,
    category: "Medium Portable",
    ratedAmps120V: 54.2,
    ratedAmps240V: 27.1,
    continuousAmps120V: 43.3,
    continuousAmps240V: 21.7,
    typicalNemaOutlet: "NEMA L14-30R (30A 120/240V)",
    minWireGauge: "10 AWG Cu",
    commonApplications: "Essential circuits, 240V deep-well pump, gas water heater, furnace",
  },
  {
    watts: 7500,
    kw: 7.5,
    category: "Medium Portable",
    ratedAmps120V: 62.5,
    ratedAmps240V: 31.3,
    continuousAmps120V: 50.0,
    continuousAmps240V: 25.0,
    typicalNemaOutlet: "NEMA L14-30R (30A) or 14-50R",
    minWireGauge: "10 AWG Cu (30A) / 8 AWG Cu",
    commonApplications: "Standard 30A home inlet box, multiple pumps, furnace, refrigeration",
  },
  {
    watts: 8500,
    kw: 8.5,
    category: "Medium Portable",
    ratedAmps120V: 70.8,
    ratedAmps240V: 35.4,
    continuousAmps120V: 56.7,
    continuousAmps240V: 28.3,
    typicalNemaOutlet: "NEMA 14-50R (50A 120/240V)",
    minWireGauge: "8 AWG Cu",
    commonApplications: "Heavy emergency home backup, small central AC with soft starter",
  },
  {
    watts: 10000,
    kw: 10.0,
    category: "Heavy Standby",
    ratedAmps120V: 83.3,
    ratedAmps240V: 41.7,
    continuousAmps120V: 66.7,
    continuousAmps240V: 33.3,
    typicalNemaOutlet: "NEMA 14-50R (50A) or Hardwire",
    minWireGauge: "6 AWG Cu",
    commonApplications: "50A transfer switch inlet, 3-ton central AC, whole-house subpanel",
  },
  {
    watts: 12000,
    kw: 12.0,
    category: "Heavy Standby",
    ratedAmps120V: 100.0,
    ratedAmps240V: 50.0,
    continuousAmps120V: 80.0,
    continuousAmps240V: 40.0,
    typicalNemaOutlet: "NEMA 14-50R (50A) or Hardwire",
    minWireGauge: "6 AWG Cu (50A breaker)",
    commonApplications: "Full 50A utility service backup, central heat pump, water heater",
  },
  {
    watts: 15000,
    kw: 15.0,
    category: "Heavy Standby",
    ratedAmps120V: 125.0,
    ratedAmps240V: 62.5,
    continuousAmps120V: 100.0,
    continuousAmps240V: 50.0,
    typicalNemaOutlet: "Hardwired to ATS (70A Breaker)",
    minWireGauge: "4 AWG Cu",
    commonApplications: "Whole-home standby generator with automatic transfer switch",
  },
  {
    watts: 18000,
    kw: 18.0,
    category: "Heavy Standby",
    ratedAmps120V: 150.0,
    ratedAmps240V: 75.0,
    continuousAmps120V: 120.0,
    continuousAmps240V: 60.0,
    typicalNemaOutlet: "Hardwired to ATS (90A Breaker)",
    minWireGauge: "3 AWG Cu",
    commonApplications: "Whole-home automatic standby, 4-ton AC, electric range, water heater",
  },
  {
    watts: 20000,
    kw: 20.0,
    category: "Heavy Standby",
    ratedAmps120V: 166.7,
    ratedAmps240V: 83.3,
    continuousAmps120V: 133.3,
    continuousAmps240V: 66.7,
    typicalNemaOutlet: "Hardwired to ATS (100A Breaker)",
    minWireGauge: "2 AWG Cu",
    commonApplications: "Most common residential whole-home standby size (100A service feed)",
  },
  {
    watts: 22000,
    kw: 22.0,
    category: "Heavy Standby",
    ratedAmps120V: 183.3,
    ratedAmps240V: 91.7,
    continuousAmps120V: 146.7,
    continuousAmps240V: 73.3,
    typicalNemaOutlet: "Hardwired to ATS (100A Breaker)",
    minWireGauge: "1 AWG Cu or 2 AWG Cu (75°C)",
    commonApplications: "Full residential 100A whole-home coverage, two central AC units",
  },
  {
    watts: 24000,
    kw: 24.0,
    category: "Heavy Standby",
    ratedAmps120V: 200.0,
    ratedAmps240V: 100.0,
    continuousAmps120V: 160.0,
    continuousAmps240V: 80.0,
    typicalNemaOutlet: "Hardwired to ATS (125A Breaker)",
    minWireGauge: "1/0 AWG Cu",
    commonApplications: "Large home whole-house standby, multiple heat pumps, electric utilities",
  },
  {
    watts: 26000,
    kw: 26.0,
    category: "Heavy Standby",
    ratedAmps120V: 216.7,
    ratedAmps240V: 108.3,
    continuousAmps120V: 173.3,
    continuousAmps240V: 86.7,
    typicalNemaOutlet: "Hardwired to ATS (125A to 150A Breaker)",
    minWireGauge: "2/0 AWG Cu",
    commonApplications: "Large luxury home or light commercial standby installation",
  },
];

/**
 * Maps current in Amperes to the next standard US circuit breaker size.
 */
export function getStandardBreakerSize(amps: number): number {
  const standardBreakers = [
    15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100, 110, 125, 150, 175, 200, 225, 250, 300, 400
  ];
  for (const size of standardBreakers) {
    if (size >= amps) return size;
  }
  return standardBreakers[standardBreakers.length - 1];
}

/**
 * Determines typical NEMA outlet and recommended copper conductor gauge
 * based on generator rating, operating voltage, and calculated current.
 */
function getOutletAndWireSpecs(
  voltageConfig: GeneratorVoltageConfig,
  ratedAmps: number,
  nominalVoltage: number
): { receptacle: string; wireGauge: string } {
  if (voltageConfig === "120v_single") {
    if (ratedAmps <= 15) {
      return {
        receptacle: "NEMA 5-15R (15A, 120V Standard Household Duplex)",
        wireGauge: "14 AWG Copper (75°C THHN/THWN-2)",
      };
    }
    if (ratedAmps <= 20) {
      return {
        receptacle: "NEMA 5-20R (20A, 120V T-Slot Commercial Duplex / GFCI)",
        wireGauge: "12 AWG Copper (75°C THHN/THWN-2)",
      };
    }
    if (ratedAmps <= 30) {
      return {
        receptacle: "NEMA TT-30R (30A, 120V RV Receptacle) or L5-30R Twist-Lock",
        wireGauge: "10 AWG Copper (75°C THHN/THWN-2)",
      };
    }
    return {
      receptacle: "Direct Terminal Lugs or High-Current Cam-Lock",
      wireGauge: "8 AWG Copper or larger",
    };
  }

  if (voltageConfig === "120_240v_split" || voltageConfig === "240v_single") {
    const checkAmps = voltageConfig === "120_240v_split" ? ratedAmps : ratedAmps;
    if (checkAmps <= 20) {
      return {
        receptacle: "NEMA L14-20R (20A, 120/240V 4-Prong Twist-Lock)",
        wireGauge: "12 AWG Copper (75°C THHN/THWN-2)",
      };
    }
    if (checkAmps <= 30) {
      return {
        receptacle: "NEMA L14-30R (30A, 120/240V 4-Prong Twist-Lock)",
        wireGauge: "10 AWG Copper (75°C THHN/THWN-2)",
      };
    }
    if (checkAmps <= 50) {
      return {
        receptacle: "NEMA 14-50R (50A, 120/240V 4-Prong Straight Blade)",
        wireGauge: "6 AWG Copper (75°C THHN/THWN-2)",
      };
    }
    if (checkAmps <= 70) {
      return {
        receptacle: "Hardwired Distribution Block to Automatic Transfer Switch (ATS)",
        wireGauge: "4 AWG Copper (75°C THHN/THWN-2)",
      };
    }
    if (checkAmps <= 95) {
      return {
        receptacle: "Hardwired Distribution Block to 100A Automatic Transfer Switch",
        wireGauge: "2 AWG Copper (75°C THHN/THWN-2)",
      };
    }
    if (checkAmps <= 115) {
      return {
        receptacle: "Hardwired Distribution Block to 125A Automatic Transfer Switch",
        wireGauge: "1 AWG Copper (75°C THHN/THWN-2)",
      };
    }
    if (checkAmps <= 150) {
      return {
        receptacle: "Hardwired Distribution Block to 150A/200A Automatic Transfer Switch",
        wireGauge: "2/0 AWG Copper (75°C THHN/THWN-2)",
      };
    }
    return {
      receptacle: "Hardwired 200A Service Entrance Rated ATS",
      wireGauge: "4/0 AWG Copper or 250 kcmil Al (75°C)",
    };
  }

  // Three-phase systems
  if (ratedAmps <= 30) {
    return {
      receptacle: `NEMA L${nominalVoltage === 208 ? "21" : "22"}-30R Twist-Lock or Pin-and-Sleeve`,
      wireGauge: "10 AWG Copper (75°C THHN/THWN-2)",
    };
  }
  if (ratedAmps <= 50) {
    return {
      receptacle: "Industrial 50A 3-Phase Hubbell / Pin-and-Sleeve Receptacle",
      wireGauge: "6 AWG Copper (75°C THHN/THWN-2)",
    };
  }
  return {
    receptacle: "Hardwired Mechanical Lugs or Series 16 Cam-Lock Connectors",
    wireGauge: ratedAmps <= 85 ? "3 AWG Cu" : ratedAmps <= 130 ? "1/0 AWG Cu" : "4/0 AWG Cu",
  };
}

/**
 * Pure generator amperage calculation function.
 */
export function calculateGeneratorAmperage(
  inputs: GeneratorAmperageInputs
): GeneratorAmperageOutputs {
  const errors: GeneratorValidationError[] = [];
  const warnings: string[] = [];

  const {
    powerWatts,
    voltageConfig,
    powerFactor = 1.0,
    continuousLoadPercent = 80,
  } = inputs;

  // Validation
  if (typeof powerWatts !== "number" || isNaN(powerWatts) || powerWatts < 0) {
    errors.push({
      field: "powerWatts",
      message: "Generator power must be a non-negative number in Watts.",
    });
  }

  if (typeof powerFactor !== "number" || isNaN(powerFactor) || powerFactor < 0.5 || powerFactor > 1.0) {
    errors.push({
      field: "powerFactor",
      message: "Power factor must be between 0.5 and 1.0.",
    });
  }

  if (
    typeof continuousLoadPercent !== "number" ||
    isNaN(continuousLoadPercent) ||
    continuousLoadPercent <= 0 ||
    continuousLoadPercent > 100
  ) {
    errors.push({
      field: "continuousLoadPercent",
      message: "Continuous load derating must be between 1% and 100%.",
    });
  }

  if (errors.length > 0 || powerWatts === 0) {
    return {
      powerWatts: powerWatts || 0,
      powerKw: (powerWatts || 0) / 1000,
      apparentPowerVa: 0,
      apparentPowerKva: 0,
      voltageConfig,
      nominalVoltage: 120,
      powerFactor,
      ratedAmps: 0,
      formattedRatedAmps: "0.00 A",
      continuousSafeAmps: 0,
      formattedContinuousSafeAmps: "0.00 A",
      recommendedBreakerAmps: 15,
      recommendedReceptacleNema: "N/A",
      recommendedMinCopperWireAwg: "14 AWG",
      formulaExplanation: "I = 0 A (Zero power entered)",
      errors,
      warnings,
      isValid: errors.length === 0,
    };
  }

  let nominalVoltage = 120;
  let ratedAmps = 0;
  let splitPhaseDetails: SplitPhaseBreakdown | undefined;
  let formulaExplanation = "";

  const apparentPowerVa = Math.round((powerWatts / powerFactor) * 10) / 10;
  const apparentPowerKva = Math.round((apparentPowerVa / 1000) * 100) / 100;

  switch (voltageConfig) {
    case "120v_single": {
      nominalVoltage = 120;
      ratedAmps = powerWatts / (nominalVoltage * powerFactor);
      formulaExplanation = `I = P ÷ (V × PF) = ${powerWatts.toLocaleString()}W ÷ (${nominalVoltage}V × ${powerFactor}) = ${ratedAmps.toFixed(2)} A`;
      break;
    }

    case "240v_single": {
      nominalVoltage = 240;
      ratedAmps = powerWatts / (nominalVoltage * powerFactor);
      formulaExplanation = `I = P ÷ (V × PF) = ${powerWatts.toLocaleString()}W ÷ (${nominalVoltage}V × ${powerFactor}) = ${ratedAmps.toFixed(2)} A`;
      break;
    }

    case "120_240v_split": {
      nominalVoltage = 240;
      // At 240V across both hot legs
      const amps240 = powerWatts / (240 * powerFactor);
      // Balanced 120V per leg: each leg handles half total watts at 120V
      const ampsPerLeg = (powerWatts / 2) / (120 * powerFactor);
      // Total 120V combined current (if generator has 120V full-power switch engaged)
      const ampsTotal120 = powerWatts / (120 * powerFactor);

      ratedAmps = amps240;
      splitPhaseDetails = {
        ampsAt240V: Math.round(amps240 * 100) / 100,
        ampsPer120VLeg: Math.round(ampsPerLeg * 100) / 100,
        total120VCombinedAmps: Math.round(ampsTotal120 * 100) / 100,
        formattedAmpsAt240V: `${amps240.toFixed(2)} A`,
        formattedAmpsPer120VLeg: `${ampsPerLeg.toFixed(2)} A`,
        formattedTotal120VCombinedAmps: `${ampsTotal120.toFixed(2)} A`,
      };
      formulaExplanation = `I_240V = P ÷ (240V × PF) = ${powerWatts.toLocaleString()}W ÷ (240V × ${powerFactor}) = ${amps240.toFixed(2)} A; Per 120V Leg = ${ampsPerLeg.toFixed(2)} A`;
      break;
    }

    case "208v_three": {
      nominalVoltage = 208;
      ratedAmps = powerWatts / (Math.sqrt(3) * nominalVoltage * powerFactor);
      formulaExplanation = `I = P ÷ (√3 × V_LL × PF) = ${powerWatts.toLocaleString()}W ÷ (1.732 × ${nominalVoltage}V × ${powerFactor}) = ${ratedAmps.toFixed(2)} A`;
      break;
    }

    case "480v_three": {
      nominalVoltage = 480;
      ratedAmps = powerWatts / (Math.sqrt(3) * nominalVoltage * powerFactor);
      formulaExplanation = `I = P ÷ (√3 × V_LL × PF) = ${powerWatts.toLocaleString()}W ÷ (1.732 × ${nominalVoltage}V × ${powerFactor}) = ${ratedAmps.toFixed(2)} A`;
      break;
    }
  }

  const roundedRatedAmps = Math.round(ratedAmps * 100) / 100;
  const continuousDerateFactor = continuousLoadPercent / 100;
  const continuousSafeAmps = Math.round(roundedRatedAmps * continuousDerateFactor * 100) / 100;

  // Determine standard circuit breaker
  const recommendedBreakerAmps = getStandardBreakerSize(roundedRatedAmps);

  // Determine outlet and wire specifications
  const { receptacle, wireGauge } = getOutletAndWireSpecs(
    voltageConfig,
    roundedRatedAmps,
    nominalVoltage
  );

  // Engineering warnings
  if (voltageConfig === "120_240v_split") {
    warnings.push(
      "Split-Phase Leg Balancing: Standard 120/240V generators provide their full rating only when 120V loads are balanced equally between Line 1 and Line 2. Putting more than half the generator's wattage on a single 120V leg will trip that leg's circuit breaker even if total wattage is well below the generator rating."
    );
  }

  if (roundedRatedAmps > 30 && voltageConfig === "120v_single") {
    warnings.push(
      "High Current on 120V: At 120V, loads exceeding 30 Amps cause severe voltage drop and require heavy conductors (8 AWG or larger). For loads above 3,500 Watts, a 120/240V split-phase connection is strongly recommended."
    );
  }

  if (powerFactor < 0.85) {
    warnings.push(
      `Low Power Factor (${powerFactor.toFixed(2)}): Reactive loads draw substantially more current (${apparentPowerKva} kVA) for the same real power (${(powerWatts / 1000).toFixed(1)} kW), which can overheat generator alternator windings.`
    );
  }

  return {
    powerWatts,
    powerKw: Math.round((powerWatts / 1000) * 100) / 100,
    apparentPowerVa,
    apparentPowerKva,
    voltageConfig,
    nominalVoltage,
    powerFactor,
    ratedAmps: roundedRatedAmps,
    formattedRatedAmps: `${roundedRatedAmps.toFixed(2)} A`,
    continuousSafeAmps,
    formattedContinuousSafeAmps: `${continuousSafeAmps.toFixed(2)} A`,
    splitPhaseDetails,
    recommendedBreakerAmps,
    recommendedReceptacleNema: receptacle,
    recommendedMinCopperWireAwg: wireGauge,
    formulaExplanation,
    errors,
    warnings,
    isValid: true,
  };
}
