/**
 * Amps to Watts Calculator Logic
 * Pure TypeScript — Decoupled from React and DOM
 * CalcMyPower.com
 *
 * Formulas:
 * 1. DC:
 *    P = I × V
 * 2. AC Single-Phase:
 *    P = I × V × PF
 *    S = I × V (Apparent Power in VA)
 * 3. AC Three-Phase (Balanced, Line-to-Line):
 *    P = √3 × V_LL × I × PF
 *    S = √3 × V_LL × I (Apparent Power in VA)
 * 4. AC Three-Phase (Balanced, Line-to-Neutral):
 *    P = 3 × V_LN × I × PF
 *    S = 3 × V_LN × I (Apparent Power in VA)
 */

export type ElectricalSystemType = "dc" | "ac_single" | "ac_three";
export type ThreePhaseVoltageType = "line_to_line" | "line_to_neutral";

export interface AmpsToWattsInputs {
  /** Operating current in Amperes (A) */
  currentAmps: number;
  /** Nominal circuit voltage in Volts (V) */
  voltage: number;
  /** Operating electrical system */
  currentType: ElectricalSystemType;
  /** Three-phase voltage measurement reference */
  voltageType?: ThreePhaseVoltageType;
  /** Power factor (0.1 to 1.0). Applicable to AC circuits only */
  powerFactor?: number;
}

export interface ValidationError {
  field: "currentAmps" | "voltage" | "powerFactor";
  message: string;
}

export interface AmpsToWattsOutputs {
  /** Real electrical power in Watts (W) */
  powerWatts: number;
  /** Formatted real power string (e.g. '1,800.00 W' or '1,800 W') */
  formattedWatts: string;
  /** Real power in Kilowatts (kW) */
  powerKw: number;
  /** Formatted real power in kW (e.g. '1.80 kW') */
  formattedKw: string;
  /** Apparent power in Volt-Amps (VA), relevant for AC when PF < 1.0 */
  apparentPowerVa?: number;
  /** Formatted apparent power string (e.g. '1,800 VA') */
  formattedVa?: string;
  /**
   * Reference Continuous Load Planning Benchmark (NEC Article 210)
   * Pure mathematical conversion (P = V × I × PF) determines total active power.
   * For branch circuit design, NEC Article 100 defines a continuous load as
   * continuing for 3 hours or more. Under NEC 210.19(A)(1) and 210.20(A), standard
   * non-100%-rated branch circuit protective devices and conductors are sized for
   * 125% of continuous load, which establishes an 80% continuous design benchmark.
   * This is an electrical code sizing reference, not an unconditional safe limit;
   * actual installation safety also requires verified conductor gauge, terminal
   * temperature limits (60°C/75°C per NEC 110.14(C)), and deratings.
   */
  continuousLoadWattsRef: number;
  /** Formatted continuous load capacity string */
  formattedContinuousWattsRef: string;
  /** Active electrical system label */
  systemLabel: string;
  /** Formula representation with substituted values */
  formulaExplanation: string;
  /** Non-silent validation errors for invalid input states */
  errors: ValidationError[];
  /** Engineering warnings for high currents, low PF, or boundary conditions */
  warnings: string[];
  /** Whether the calculation represents a valid physical state */
  isValid: boolean;
}

export const COMMON_CIRCUIT_VOLTAGES = [
  { value: 12, label: "12V (DC Battery / Automotive)" },
  { value: 24, label: "24V (DC Solar / Marine)" },
  { value: 48, label: "48V (DC Telecom / Battery Bank)" },
  { value: 120, label: "120V (Standard US Household Outlet)" },
  { value: 208, label: "208V (US Commercial 3-Phase)" },
  { value: 240, label: "240V (US Heavy Appliance / EV Charger)" },
  { value: 277, label: "277V (US Commercial Lighting)" },
  { value: 480, label: "480V (US Industrial 3-Phase)" },
];

export interface PresetCircuit {
  label: string;
  amps: number;
  voltage: number;
  system: ElectricalSystemType;
  voltageType?: ThreePhaseVoltageType;
  pf: number;
  description: string;
}

export const AMPS_TO_WATTS_PRESETS: PresetCircuit[] = [
  {
    label: "15A @ 120V (Standard US Receptacle)",
    amps: 15,
    voltage: 120,
    system: "ac_single",
    pf: 1.0,
    description: "Standard 15A household circuit (1,800W nominal max / 1,440W continuous benchmark for 3+ hr duty)",
  },
  {
    label: "20A @ 120V (Kitchen / Bath Circuit)",
    amps: 20,
    voltage: 120,
    system: "ac_single",
    pf: 1.0,
    description: "Kitchen small appliance or bathroom 20A circuit (2,400W nominal max / 1,920W continuous benchmark for 3+ hr duty)",
  },
  {
    label: "30A @ 240V (Electric Dryer / RV 30A)",
    amps: 30,
    voltage: 240,
    system: "ac_single",
    pf: 1.0,
    description: "Electric clothes dryer, 30-gallon water heater, or 30A RV service (7,200W max)",
  },
  {
    label: "50A @ 240V (EV Charger / Range)",
    amps: 50,
    voltage: 240,
    system: "ac_single",
    pf: 1.0,
    description: "Level 2 EV charging, electric cooking range, or 50A RV service (12,000W max)",
  },
  {
    label: "20A @ 208V 3-Phase (Commercial L-L)",
    amps: 20,
    voltage: 208,
    system: "ac_three",
    voltageType: "line_to_line",
    pf: 0.90,
    description: "Commercial balanced 3-phase branch circuit at 208V line-to-line",
  },
  {
    label: "30A @ 480V 3-Phase (Industrial L-L)",
    amps: 30,
    voltage: 480,
    system: "ac_three",
    voltageType: "line_to_line",
    pf: 0.85,
    description: "Industrial three-phase motor or HVAC feed at 480V line-to-line",
  },
  {
    label: "10A @ 12V DC (Vehicle / Solar Accessory)",
    amps: 10,
    voltage: 12,
    system: "dc",
    pf: 1.0,
    description: "Direct current 12V auxiliary port, off-grid LED fixture, or DC accessory",
  },
];

export function calculateAmpsToWatts(inputs: AmpsToWattsInputs): AmpsToWattsOutputs {
  const errors: ValidationError[] = [];
  const warnings: string[] = [];

  const rawAmps = Number(inputs.currentAmps);
  const rawVoltage = Number(inputs.voltage);
  const currentType = inputs.currentType || "ac_single";
  const voltageType = inputs.voltageType || "line_to_line";

  // Validate Current
  if (isNaN(rawAmps) || rawAmps < 0) {
    errors.push({
      field: "currentAmps",
      message: "Current cannot be negative or invalid. Enter 0 Amperes or higher.",
    });
  }

  // Validate Voltage
  if (isNaN(rawVoltage) || rawVoltage <= 0) {
    errors.push({
      field: "voltage",
      message: "Voltage must be greater than 0 Volts to calculate wattage.",
    });
  }

  // Validate Power Factor (AC only)
  let pf = 1.0;
  if (currentType !== "dc") {
    const rawPf = inputs.powerFactor !== undefined ? Number(inputs.powerFactor) : 1.0;
    if (isNaN(rawPf) || rawPf <= 0) {
      errors.push({
        field: "powerFactor",
        message: "Power factor must be greater than 0. Enter a value between 0.1 and 1.0.",
      });
      pf = 1.0;
    } else if (rawPf > 1.0) {
      errors.push({
        field: "powerFactor",
        message: "Power factor cannot exceed 1.0 (unity). Enter a value between 0.1 and 1.0.",
      });
      pf = 1.0;
    } else {
      pf = rawPf;
    }
  }

  // Safe fallback values to prevent NaN / Infinity internally
  const amps = Math.max(0, isNaN(rawAmps) ? 0 : rawAmps);
  const voltage = Math.max(0.001, isNaN(rawVoltage) ? 120 : rawVoltage);

  const isValid = errors.length === 0;

  // Calculation when valid
  let calculatedWatts = 0;
  let calculatedVa: number | undefined;
  let formulaExplanation = "";

  if (errors.some((e) => e.field === "voltage")) {
    calculatedWatts = 0;
    formulaExplanation = "Voltage must be greater than 0 V.";
  } else if (amps === 0) {
    calculatedWatts = 0;
    formulaExplanation = "0.00 A × V = 0 W";
    if (isValid) {
      warnings.push("Current is currently 0 Amperes. Enter circuit amperage to compute wattage.");
    }
  } else {
    switch (currentType) {
      case "dc": {
        calculatedWatts = amps * voltage;
        formulaExplanation = `P = I × V = ${amps}A × ${voltage}V = ${calculatedWatts.toLocaleString("en-US", { maximumFractionDigits: 2 })} W`;
        break;
      }
      case "ac_single": {
        calculatedWatts = amps * voltage * pf;
        const apparentVa = amps * voltage;
        calculatedVa = apparentVa;
        formulaExplanation = `P = I × V × PF = ${amps}A × ${voltage}V × ${pf} = ${calculatedWatts.toLocaleString("en-US", { maximumFractionDigits: 2 })} W`;
        break;
      }
      case "ac_three": {
        if (voltageType === "line_to_line") {
          const apparentVa = Math.sqrt(3) * voltage * amps;
          calculatedWatts = apparentVa * pf;
          calculatedVa = apparentVa;
          formulaExplanation = `P = √3 × V_LL × I × PF = 1.732 × ${voltage}V × ${amps}A × ${pf} = ${calculatedWatts.toLocaleString("en-US", { maximumFractionDigits: 2 })} W (Balanced 3-Phase L-L)`;
        } else {
          const apparentVa = 3 * voltage * amps;
          calculatedWatts = apparentVa * pf;
          calculatedVa = apparentVa;
          formulaExplanation = `P = 3 × V_LN × I × PF = 3 × ${voltage}V × ${amps}A × ${pf} = ${calculatedWatts.toLocaleString("en-US", { maximumFractionDigits: 2 })} W (Balanced 3-Phase L-N)`;
        }
        break;
      }
    }
  }

  // NEC Continuous-Duty Planning Benchmark (NEC Article 100, 210.19(A)(1), 210.20(A))
  // Mathematical conversion calculates absolute instantaneous active power.
  // For standard non-100%-rated branch circuit overcurrent protective devices (breakers),
  // loads operating continuously for 3 hours or more are designed to an 80% benchmark (I_cont <= 0.80 * I_breaker).
  const continuousLoadWattsRef = calculatedWatts * 0.80;

  // High current warning
  if (amps > 200) {
    warnings.push(
      `Very high current detected (${amps} A). Circuits of this magnitude require engineered service entrance equipment, commercial switchgear, and professional electrical design.`
    );
  }

  // Low power factor warning for AC
  if (currentType !== "dc" && pf < 0.70 && amps > 0) {
    warnings.push(
      `Low power factor (${pf.toFixed(2)}) detected. Significant reactive current increases conductor heating (VA) relative to useful work (Watts) and may require power factor correction in commercial facilities.`
    );
  }

  // System label formatting
  let systemLabel = "AC Single-Phase";
  if (currentType === "dc") systemLabel = "Direct Current (DC)";
  if (currentType === "ac_three") {
    systemLabel =
      voltageType === "line_to_line"
        ? "Balanced Three-Phase (Line-to-Line)"
        : "Balanced Three-Phase (Line-to-Neutral)";
  }

  // Precision rounding
  const roundedWatts = Math.round((calculatedWatts + Number.EPSILON) * 100) / 100;
  const powerKw = Math.round((calculatedWatts / 1000 + Number.EPSILON) * 100) / 100;
  const roundedContinuous = Math.round((continuousLoadWattsRef + Number.EPSILON) * 100) / 100;
  const roundedVa = calculatedVa !== undefined ? Math.round((calculatedVa + Number.EPSILON) * 100) / 100 : undefined;

  const formattedWatts = `${roundedWatts.toLocaleString("en-US", {
    minimumFractionDigits: roundedWatts % 1 !== 0 ? 2 : 0,
    maximumFractionDigits: 2,
  })} W`;

  const formattedKw = `${powerKw.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} kW`;

  const formattedContinuousWattsRef = `${roundedContinuous.toLocaleString("en-US", {
    minimumFractionDigits: roundedContinuous % 1 !== 0 ? 2 : 0,
    maximumFractionDigits: 2,
  })} W`;

  const formattedVa =
    roundedVa !== undefined
      ? `${roundedVa.toLocaleString("en-US", {
          minimumFractionDigits: roundedVa % 1 !== 0 ? 2 : 0,
          maximumFractionDigits: 2,
        })} VA`
      : undefined;

  return {
    powerWatts: roundedWatts,
    formattedWatts,
    powerKw,
    formattedKw,
    apparentPowerVa: roundedVa,
    formattedVa,
    continuousLoadWattsRef: roundedContinuous,
    formattedContinuousWattsRef,
    systemLabel,
    formulaExplanation,
    errors,
    warnings,
    isValid,
  };
}
