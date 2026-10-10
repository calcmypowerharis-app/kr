/**
 * Amps to Watts Calculator Logic
 * Pure TypeScript - Decoupled from React and DOM
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

export interface AmpsToWattsFaqItem {
  question: string;
  answer: string;
}

export const AMPS_TO_WATTS_FAQS: AmpsToWattsFaqItem[] = [
  {
    question: "How many watts is 15 amps at 120 volts?",
    answer:
      "In a standard 120V single-phase circuit with a resistive load (power factor = 1.0), 15 Amps equals exactly 1,800 Watts of physical power (15A × 120V = 1,800W). For continuous loads operating 3 hours or more on standard non-100%-rated circuit breakers, common sizing practice benchmarks continuous duty to 80% of rating (1,440 Watts or 12A per NEC guidelines). Applicable requirements depend on equipment duty, listing, and local codes; intermittent loads may operate up to the full 1,800 Watts based on circuit design.",
  },
  {
    question: "What is the true power of a 120V circuit operating at 10A with unity power factor?",
    answer:
      "The true power (real active power) is exactly 1,200 Watts (1.20 kW). Using the single-phase AC power formula: P = V × I × PF = 120 Volts × 10 Amperes × 1.0 = 1,200 Watts. Because the circuit operates at unity power factor (PF = 1.0), real power in Watts equals apparent power in Volt-Amperes (1,200 VA). If the power factor were 0.85 (such as an inductive motor load), true power would be 1,020 Watts while apparent power would remain 1,200 VA.",
  },
  {
    question: "How many watts is 10 amps at 120 volts?",
    answer:
      "At 120 Volts with unity power factor (PF = 1.0), 10 Amps equals exactly 1,200 Watts (10A × 120V = 1,200W). For continuous duty operating 3 hours or more on standard non-100%-rated breakers, continuous duty is typically planned to an 80% benchmark of 960 Watts (8A), depending on the equipment listing and installation context. At 240 Volts, 10 Amps produces 2,400 Watts.",
  },
  {
    question: "How many watts is 20 amps at 120 volts?",
    answer:
      "At 120 Volts with unity power factor (PF = 1.0), 20 Amps produces exactly 2,400 Watts of electrical power (20A × 120V = 2,400W). For continuous duty (3 hours or longer) on standard non-100%-rated breakers, sizing practice commonly uses an 80% planning benchmark (1,920 Watts or 16A), whereas non-continuous equipment may utilize up to 2,400 Watts subject to circuit and conductor design.",
  },
  {
    question: "How many watts is 30 amps at 120V and 240V?",
    answer:
      "At 120 Volts (such as a 30A RV park receptacle), 30 Amps produces 3,600 Watts (30A × 120V = 3,600W), with an 80% continuous planning benchmark of 2,880 Watts for loads sustained over 3 hours. At 240 Volts (such as an electric clothes dryer or water heater), 30 Amps delivers 7,200 Watts (30A × 240V = 7,200W), with an 80% continuous planning reference of 5,760 Watts.",
  },
  {
    question: "How many watts is 40 amps at 240 volts?",
    answer:
      "At 240 Volts with unity power factor (PF = 1.0), 40 Amps delivers 9,600 Watts (40A × 240V = 9,600W or 9.60 kW). Where continuous duty of 3 hours or more applies on standard non-100%-rated equipment, planning guidelines benchmark continuous load to 80% (7,680 Watts or 32A). Actual limits depend on installation type, conductor temperature ratings, and local codes. At 120 Volts, 40 Amps delivers 4,800 Watts.",
  },
  {
    question: "How do you convert amps to watts?",
    answer:
      "To convert Amps to Watts, multiply current in Amperes by circuit voltage in Volts. For direct current (DC), the formula is P = I × V. For alternating current (AC) single-phase circuits, multiply by the power factor: P = I × V × PF. For balanced three-phase circuits, multiply by the square root of 3 (1.732): P = √3 × V_LL × I × PF.",
  },
  {
    question: "Can volts be converted directly to watts?",
    answer:
      "No. Voltage is electrical potential difference, whereas wattage is the rate of energy consumption. You cannot convert volts directly into watts without knowing circuit current (Amperes) or electrical resistance (Ohms). A 120V outlet draws zero watts until a device drawing current is plugged in.",
  },
  {
    question: "How do you calculate three-phase watts from amps?",
    answer:
      "For a balanced three-phase system using line-to-line voltage, multiply the square root of 3 (approximately 1.732) by line-to-line voltage, current in Amps, and power factor: Watts = √3 × V_LL × Amps × PF. For example, 20 Amps on a 208V three-phase circuit with a power factor of 0.90 yields approximately 6,485 Watts (6.48 kW).",
  },
  {
    question: "What is the difference between watts and volt-amperes (VA)?",
    answer:
      "Watts (W) measures real active power that performs physical work or generates heat. Volt-Amperes (VA) measures apparent power, which is the total circulating voltage and current in an AC circuit. In circuits with motors or compressors, current and voltage are slightly out of phase, making VA higher than Watts (Watts = VA × Power Factor).",
  },
];

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
