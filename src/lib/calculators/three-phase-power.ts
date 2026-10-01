/**
 * Three-Phase Power Calculator Engine
 * Pure TypeScript - Decoupled from React, DOM, and UI
 * CalcMyPower.com
 *
 * Mathematical Foundations:
 * Assumes a balanced, symmetrical three-phase AC system where phase voltages
 * are equal in magnitude and separated by 120 degrees, and line currents
 * are equal across all three ungrounded conductors (Phases A, B, and C).
 *
 * Reference Standards:
 * Schneider Electric Technical Guide on Three-Phase Calculations;
 * IEEE standard definitions of real (P), reactive (Q), and apparent (S) power.
 *
 * Line-to-Line (V_LL) Formulas:
 *   Real Power (Active):     P = √3 × V_LL × I × PF      (Watts)
 *   Apparent Power:          S = √3 × V_LL × I           (Volt-Amps)
 *   Reactive Power:          Q = √(S² - P²)              (VAR)
 *   Line Current from P:     I = P ÷ (√3 × V_LL × PF)    (Amps)
 *   Line Current from S:     I = S ÷ (√3 × V_LL)         (Amps)
 *
 * Line-to-Neutral (V_LN) Formulas:
 *   Real Power (Active):     P = 3 × V_LN × I × PF       (Watts)
 *   Apparent Power:          S = 3 × V_LN × I            (Volt-Amps)
 *   Reactive Power:          Q = √(S² - P²)              (VAR)
 *   Line Current from P:     I = P ÷ (3 × V_LN × PF)     (Amps)
 *   Line Current from S:     I = S ÷ (3 × V_LN)          (Amps)
 *
 * Relationship between Line and Phase Quantities:
 *   V_LL = √3 × V_LN
 *   V_LN = V_LL ÷ √3
 *   In a Wye (Y) load:   I_line = I_phase
 *   In a Delta (Δ) load: I_line = √3 × I_phase
 */

export type ThreePhaseMode = "solve_power" | "solve_current";
export type VoltageReference = "line_to_line" | "line_to_neutral";
export type PowerInputUnit = "kW" | "W" | "kVA" | "VA";

export interface ThreePhasePowerInputs {
  /** Mode: calculate power from voltage/current, or calculate current from power */
  mode: ThreePhaseMode;
  /** Voltage magnitude in Volts RMS (e.g. 208, 240, 480, 600) */
  voltage: number;
  /** Whether voltage is line-to-line (standard V_LL) or line-to-neutral (V_LN) */
  voltageReference: VoltageReference;
  /** Line current in Amperes (required for solve_power mode) */
  currentAmps?: number;
  /** Power value (required for solve_current mode) */
  powerValue?: number;
  /** Power unit for powerValue in solve_current mode (default: kW) */
  powerUnit?: PowerInputUnit;
  /** Power factor cos(θ), ranging from 0.01 to 1.0 (default: 0.85) */
  powerFactor: number;
}

export interface ValidationError {
  field: "voltage" | "currentAmps" | "powerValue" | "powerFactor";
  message: string;
}

export interface ThreePhasePowerOutputs {
  /** Active / Real Power in Watts (W) */
  realPowerWatts: number;
  /** Active / Real Power in Kilowatts (kW) */
  realPowerKw: number;
  /** Formatted real power in kW */
  formattedRealPowerKw: string;
  /** Formatted real power in Watts */
  formattedRealPowerWatts: string;

  /** Apparent Power in Volt-Amperes (VA) */
  apparentPowerVa: number;
  /** Apparent Power in Kilovolt-Amperes (kVA) */
  apparentPowerKva: number;
  /** Formatted apparent power in kVA */
  formattedApparentPowerKva: string;
  /** Formatted apparent power in VA */
  formattedApparentPowerVa: string;

  /** Reactive Power in Volt-Amperes Reactive (VAR) */
  reactivePowerVar: number;
  /** Reactive Power in Kilovolt-Amperes Reactive (kVAR) */
  reactivePowerKvar: number;
  /** Formatted reactive power in kVAR */
  formattedReactivePowerKvar: string;

  /** Operating Line Current in Amperes (A) */
  lineCurrentAmps: number;
  /** Formatted line current in Amperes */
  formattedLineCurrentAmps: string;

  /** Calculated or input Line-to-Line Voltage (V_LL) */
  vLineToLine: number;
  /** Calculated or input Line-to-Neutral Voltage (V_LN) */
  vLineToNeutral: number;

  /** Applied Power Factor (0.01 to 1.00) */
  powerFactor: number;

  /** Multiplier constant used (√3 ≈ 1.732 for line-to-line, 3 for line-to-neutral) */
  multiplier: number;

  /** Step-by-step mathematical breakdown for educational clarity */
  formulaSteps: string[];

  /** Non-silent validation errors for invalid input values */
  errors: ValidationError[];

  /** Engineering advisories (e.g. low PF, high voltage, unbalanced load notice) */
  warnings: string[];

  /** Whether results represent physically valid numbers */
  isValid: boolean;
}

export const SQRT_3 = Math.sqrt(3); // 1.7320508075688772

export interface CommonVoltagePreset {
  value: number;
  reference: VoltageReference;
  label: string;
  nominalDescription: string;
  typicalLineToNeutral?: number;
}

export const THREE_PHASE_VOLTAGE_PRESETS: CommonVoltagePreset[] = [
  {
    value: 208,
    reference: "line_to_line",
    label: "208V Line-to-Line (120/208V Wye)",
    nominalDescription: "Standard US commercial distribution; 120V line-to-neutral for convenience receptacles.",
    typicalLineToNeutral: 120,
  },
  {
    value: 240,
    reference: "line_to_line",
    label: "240V Line-to-Line (240V Delta)",
    nominalDescription: "Common US light-industrial 3-phase delta or 120/240V high-leg delta service.",
  },
  {
    value: 480,
    reference: "line_to_line",
    label: "480V Line-to-Line (277/480V Wye)",
    nominalDescription: "Standard US commercial and industrial power distribution for motors, HVAC, and transformers; 277V line-to-neutral.",
    typicalLineToNeutral: 277,
  },
  {
    value: 600,
    reference: "line_to_line",
    label: "600V Line-to-Line (347/600V Wye)",
    nominalDescription: "Heavy industrial distribution in Canada and specialized US industrial manufacturing facilities.",
    typicalLineToNeutral: 347,
  },
  {
    value: 120,
    reference: "line_to_neutral",
    label: "120V Line-to-Neutral (208V Wye)",
    nominalDescription: "Line-to-neutral branch on a 120/208V wye transformer secondary.",
  },
  {
    value: 277,
    reference: "line_to_neutral",
    label: "277V Line-to-Neutral (480V Wye)",
    nominalDescription: "Line-to-neutral voltage on a 277/480V commercial lighting or heating branch.",
  },
];

export interface ThreePhaseScenarioPreset {
  id: string;
  name: string;
  category: "Commercial" | "Industrial" | "Motor" | "Resistive";
  description: string;
  voltage: number;
  voltageReference: VoltageReference;
  currentAmps: number;
  powerFactor: number;
  notes: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const THREE_PHASE_FAQS: FaqItem[] = [
  {
    question: "What is the formula for 3-phase electrical power?",
    answer:
      "For a balanced three-phase system using line-to-line RMS voltage (V_LL), real power is P = √3 × V_LL × I × PF, where √3 ≈ 1.73205, I is line current in Amps, and PF is the power factor (0 to 1.0). When using line-to-neutral voltage (V_LN), the formula is P = 3 × V_LN × I × PF because total power is the sum of all three individual phase powers.",
  },
  {
    question: "Why do 3-phase power calculations use √3 (1.732)?",
    answer:
      "The square root of 3 (approximately 1.73205) arises from the 120-degree phase displacement between the three alternating sinusoidal voltages in a balanced polyphase system. Line-to-line voltage is the vector difference between two phase voltages: V_LL = √3 × V_LN. Multiplying by √3 allows you to calculate total 3-phase power directly using standard line voltage and line current without calculating each phase independently.",
  },
  {
    question: "What is the difference between kW and kVA in 3-phase systems?",
    answer:
      "Kilowatts (kW) represent real or active power: the actual energy doing mechanical work, heating, or lighting. Kilovolt-Amperes (kVA) represent apparent power: the vector combination of real power and reactive power (kVAR). Electrical equipment, transformers, and cables must be sized for kVA because they carry the total current, whereas utility billing often tracks both kW consumption and peak kVA demand.",
  },
  {
    question: "How do I calculate line current from 3-phase kW?",
    answer:
      "To find line current (I in Amperes) from real power (kW), use the rearranged formula: I = (kW × 1,000) ÷ (√3 × V_LL × PF). For example, a 10 kW load on a 208V 3-phase line with a 0.90 power factor draws: 10,000 ÷ (1.73205 × 208 × 0.90) = 10,000 ÷ 324.23 = 30.84 Amps.",
  },
  {
    question: "How does 3-phase motor horsepower relate to electrical input power?",
    answer:
      "A motor's nameplate horsepower (HP) rating reflects its mechanical shaft output, not its electrical input draw. To calculate the electrical power drawn from the utility lines, you must divide the mechanical output by the motor efficiency: P_electrical (kW) = (HP × 0.7457) ÷ Efficiency. For example, a 10 HP motor operating at 88% efficiency consumes 7.457 ÷ 0.88 = 8.47 kW of electrical input power.",
  },
  {
    question: "Does this calculator assume a balanced three-phase load?",
    answer:
      "Yes. This calculator assumes a balanced, symmetrical three-phase system where the current in all three ungrounded phase conductors is identical. If phase currents or voltages are unbalanced (for example, in a panel with heavy single-phase 120V loads placed unevenly across phases), each phase must be measured and calculated individually: P_total = P_A + P_B + P_C.",
  },
];

export const THREE_PHASE_SCENARIOS: ThreePhaseScenarioPreset[] = [
  {
    id: "commercial-hvac-208v",
    name: "208V 20A Commercial HVAC Compressor",
    category: "Commercial",
    description: "Packaged rooftop commercial air handler / heat pump running on 208V 3-phase.",
    voltage: 208,
    voltageReference: "line_to_line",
    currentAmps: 20,
    powerFactor: 0.90,
    notes: "Inductive motor compressor load with typical 0.90 operating power factor.",
  },
  {
    id: "resistive-kitchen-208v",
    name: "208V 20A Commercial Kitchen Heater",
    category: "Resistive",
    description: "Commercial 3-phase electric oven or water booster heater with unity power factor.",
    voltage: 208,
    voltageReference: "line_to_line",
    currentAmps: 20,
    powerFactor: 1.00,
    notes: "Purely resistive heating element where real power equals apparent power (kVA = kW).",
  },
  {
    id: "delta-machine-240v",
    name: "240V 30A Delta Manufacturing Equipment",
    category: "Industrial",
    description: "Commercial shop delta machine tool operating on 240V 3-phase service.",
    voltage: 240,
    voltageReference: "line_to_line",
    currentAmps: 30,
    powerFactor: 1.00,
    notes: "Resistive or power-factor-corrected delta circuit drawing 30 Amps per phase.",
  },
  {
    id: "industrial-motor-480v",
    name: "480V 15A Industrial Induction Motor",
    category: "Motor",
    description: "480V 3-phase squirrel-cage induction motor running under standard load.",
    voltage: 480,
    voltageReference: "line_to_line",
    currentAmps: 15,
    powerFactor: 0.85,
    notes: "Standard industrial motor load showing the difference between kW active draw and kVA demand.",
  },
  {
    id: "heavy-pump-480v",
    name: "480V 60A Industrial Wastewater Pump",
    category: "Industrial",
    description: "Large 480V municipal or facility centrifugal pump motor station.",
    voltage: 480,
    voltageReference: "line_to_line",
    currentAmps: 60,
    powerFactor: 0.88,
    notes: "High-capacity continuous industrial motor load with moderate power factor.",
  },
];

/**
 * Format a number to standard US locale with specific decimal places.
 */
export function formatDecimal(val: number, decimals: number = 2): string {
  if (!Number.isFinite(val)) return "0";
  return val.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Validates inputs and returns any detected errors.
 */
export function validateThreePhaseInputs(inputs: ThreePhasePowerInputs): ValidationError[] {
  const errors: ValidationError[] = [];

  if (inputs.voltage === undefined || inputs.voltage === null || isNaN(inputs.voltage)) {
    errors.push({ field: "voltage", message: "Operating voltage is required." });
  } else if (inputs.voltage <= 0) {
    errors.push({ field: "voltage", message: "Voltage must be greater than zero Volts." });
  } else if (inputs.voltage > 15000) {
    errors.push({ field: "voltage", message: "Voltage exceeds the 15,000V calculator range." });
  }

  if (inputs.powerFactor === undefined || inputs.powerFactor === null || isNaN(inputs.powerFactor)) {
    errors.push({ field: "powerFactor", message: "Power factor is required." });
  } else if (inputs.powerFactor <= 0 || inputs.powerFactor > 1.0) {
    errors.push({ field: "powerFactor", message: "Power factor must be greater than 0 and less than or equal to 1.00." });
  }

  if (inputs.mode === "solve_power") {
    if (inputs.currentAmps === undefined || inputs.currentAmps === null || isNaN(inputs.currentAmps)) {
      errors.push({ field: "currentAmps", message: "Line current is required to calculate power." });
    } else if (inputs.currentAmps < 0) {
      errors.push({ field: "currentAmps", message: "Current cannot be negative." });
    }
  } else if (inputs.mode === "solve_current") {
    if (inputs.powerValue === undefined || inputs.powerValue === null || isNaN(inputs.powerValue)) {
      errors.push({ field: "powerValue", message: "Power value is required to calculate current." });
    } else if (inputs.powerValue < 0) {
      errors.push({ field: "powerValue", message: "Power value cannot be negative." });
    }
  }

  return errors;
}

/**
 * Main Pure Three-Phase Calculation Function
 */
export function calculateThreePhasePower(inputs: ThreePhasePowerInputs): ThreePhasePowerOutputs {
  const errors = validateThreePhaseInputs(inputs);
  const warnings: string[] = [];

  const isLineToLine = inputs.voltageReference === "line_to_line";
  const multiplier = isLineToLine ? SQRT_3 : 3;

  // Default fallback values if inputs are invalid
  if (errors.length > 0) {
    const fallbackVoltage = inputs.voltage > 0 ? inputs.voltage : 208;
    const vLL = isLineToLine ? fallbackVoltage : fallbackVoltage * SQRT_3;
    const vLN = isLineToLine ? fallbackVoltage / SQRT_3 : fallbackVoltage;

    return {
      realPowerWatts: 0,
      realPowerKw: 0,
      formattedRealPowerKw: "0.00",
      formattedRealPowerWatts: "0",
      apparentPowerVa: 0,
      apparentPowerKva: 0,
      formattedApparentPowerKva: "0.00",
      formattedApparentPowerVa: "0",
      reactivePowerVar: 0,
      reactivePowerKvar: 0,
      formattedReactivePowerKvar: "0.00",
      lineCurrentAmps: 0,
      formattedLineCurrentAmps: "0.00",
      vLineToLine: vLL,
      vLineToNeutral: vLN,
      powerFactor: Math.min(Math.max(inputs.powerFactor || 0.85, 0.01), 1.0),
      multiplier,
      formulaSteps: ["Please enter valid positive inputs to view the three-phase calculation steps."],
      errors,
      warnings,
      isValid: false,
    };
  }

  const voltage = inputs.voltage;
  const pf = inputs.powerFactor;

  // Calculate equivalent voltages
  const vLineToLine = isLineToLine ? voltage : voltage * SQRT_3;
  const vLineToNeutral = isLineToLine ? voltage / SQRT_3 : voltage;

  let realPowerWatts = 0;
  let apparentPowerVa = 0;
  let lineCurrentAmps = 0;
  const formulaSteps: string[] = [];

  if (inputs.mode === "solve_power") {
    lineCurrentAmps = inputs.currentAmps ?? 0;

    if (isLineToLine) {
      // P = √3 × V_LL × I × PF
      // S = √3 × V_LL × I
      apparentPowerVa = SQRT_3 * voltage * lineCurrentAmps;
      realPowerWatts = apparentPowerVa * pf;

      formulaSteps.push(
        `Formula (Line-to-Line): P = √3 × V_LL × I × PF`,
        `Apparent Power (S): √3 × ${formatDecimal(voltage, 1)} V × ${formatDecimal(lineCurrentAmps, 2)} A = ${formatDecimal(apparentPowerVa, 2)} VA (${formatDecimal(apparentPowerVa / 1000, 3)} kVA)`,
        `Real Power (P): ${formatDecimal(apparentPowerVa, 2)} VA × ${formatDecimal(pf, 2)} PF = ${formatDecimal(realPowerWatts, 2)} W (${formatDecimal(realPowerWatts / 1000, 3)} kW)`
      );
    } else {
      // P = 3 × V_LN × I × PF
      // S = 3 × V_LN × I
      apparentPowerVa = 3 * voltage * lineCurrentAmps;
      realPowerWatts = apparentPowerVa * pf;

      formulaSteps.push(
        `Formula (Line-to-Neutral): P = 3 × V_LN × I × PF`,
        `Apparent Power (S): 3 × ${formatDecimal(voltage, 1)} V × ${formatDecimal(lineCurrentAmps, 2)} A = ${formatDecimal(apparentPowerVa, 2)} VA (${formatDecimal(apparentPowerVa / 1000, 3)} kVA)`,
        `Real Power (P): ${formatDecimal(apparentPowerVa, 2)} VA × ${formatDecimal(pf, 2)} PF = ${formatDecimal(realPowerWatts, 2)} W (${formatDecimal(realPowerWatts / 1000, 3)} kW)`,
        `Equivalent Line-to-Line Voltage: V_LL = √3 × ${formatDecimal(voltage, 1)} V = ${formatDecimal(vLineToLine, 1)} V`
      );
    }
  } else {
    // Mode: solve_current
    const powerUnit = inputs.powerUnit || "kW";
    const powerValue = inputs.powerValue ?? 0;

    const isApparentPowerInput = powerUnit === "kVA" || powerUnit === "VA";

    if (isApparentPowerInput) {
      apparentPowerVa = powerUnit === "kVA" ? powerValue * 1000 : powerValue;
      realPowerWatts = apparentPowerVa * pf;

      if (isLineToLine) {
        // I = S ÷ (√3 × V_LL)
        lineCurrentAmps = apparentPowerVa / (SQRT_3 * voltage);
        formulaSteps.push(
          `Formula (Line Current from Apparent Power): I = S ÷ (√3 × V_LL)`,
          `S = ${formatDecimal(apparentPowerVa, 2)} VA, V_LL = ${formatDecimal(voltage, 1)} V`,
          `I = ${formatDecimal(apparentPowerVa, 2)} ÷ (1.73205 × ${formatDecimal(voltage, 1)}) = ${formatDecimal(lineCurrentAmps, 2)} A`,
          `Real Power at ${formatDecimal(pf, 2)} PF: P = S × PF = ${formatDecimal(realPowerWatts / 1000, 3)} kW`
        );
      } else {
        // I = S ÷ (3 × V_LN)
        lineCurrentAmps = apparentPowerVa / (3 * voltage);
        formulaSteps.push(
          `Formula (Line Current from Apparent Power): I = S ÷ (3 × V_LN)`,
          `S = ${formatDecimal(apparentPowerVa, 2)} VA, V_LN = ${formatDecimal(voltage, 1)} V`,
          `I = ${formatDecimal(apparentPowerVa, 2)} ÷ (3 × ${formatDecimal(voltage, 1)}) = ${formatDecimal(lineCurrentAmps, 2)} A`,
          `Real Power at ${formatDecimal(pf, 2)} PF: P = S × PF = ${formatDecimal(realPowerWatts / 1000, 3)} kW`
        );
      }
    } else {
      // Real power input (kW or W)
      realPowerWatts = powerUnit === "kW" ? powerValue * 1000 : powerValue;
      apparentPowerVa = pf > 0 ? realPowerWatts / pf : 0;

      if (isLineToLine) {
        // I = P ÷ (√3 × V_LL × PF)
        lineCurrentAmps = realPowerWatts / (SQRT_3 * voltage * pf);
        formulaSteps.push(
          `Formula (Line Current from Real Power): I = P ÷ (√3 × V_LL × PF)`,
          `P = ${formatDecimal(realPowerWatts, 2)} W, V_LL = ${formatDecimal(voltage, 1)} V, PF = ${formatDecimal(pf, 2)}`,
          `Denominator: √3 × ${formatDecimal(voltage, 1)} × ${formatDecimal(pf, 2)} = ${formatDecimal(SQRT_3 * voltage * pf, 2)}`,
          `I = ${formatDecimal(realPowerWatts, 2)} ÷ ${formatDecimal(SQRT_3 * voltage * pf, 2)} = ${formatDecimal(lineCurrentAmps, 2)} A`,
          `Apparent Power (S): P ÷ PF = ${formatDecimal(apparentPowerVa / 1000, 3)} kVA`
        );
      } else {
        // I = P ÷ (3 × V_LN × PF)
        lineCurrentAmps = realPowerWatts / (3 * voltage * pf);
        formulaSteps.push(
          `Formula (Line Current from Real Power): I = P ÷ (3 × V_LN × PF)`,
          `P = ${formatDecimal(realPowerWatts, 2)} W, V_LN = ${formatDecimal(voltage, 1)} V, PF = ${formatDecimal(pf, 2)}`,
          `Denominator: 3 × ${formatDecimal(voltage, 1)} × ${formatDecimal(pf, 2)} = ${formatDecimal(3 * voltage * pf, 2)}`,
          `I = ${formatDecimal(realPowerWatts, 2)} ÷ ${formatDecimal(3 * voltage * pf, 2)} = ${formatDecimal(lineCurrentAmps, 2)} A`,
          `Apparent Power (S): P ÷ PF = ${formatDecimal(apparentPowerVa / 1000, 3)} kVA`
        );
      }
    }
  }

  // Reactive power: Q = √(S² - P²)
  const reactivePowerVar = Math.sqrt(Math.max(0, apparentPowerVa * apparentPowerVa - realPowerWatts * realPowerWatts));

  const realPowerKw = realPowerWatts / 1000;
  const apparentPowerKva = apparentPowerVa / 1000;
  const reactivePowerKvar = reactivePowerVar / 1000;

  // Engineering advisories and checks
  if (pf < 0.70) {
    warnings.push(
      `Power factor of ${formatDecimal(pf, 2)} is low for typical commercial installations. Utilities frequently assess low power factor penalty surcharges below 0.85 to 0.90, as excessive reactive current strains distribution transformers and cables.`
    );
  }

  if (voltage > 600) {
    warnings.push(
      `Operating voltage of ${formatDecimal(voltage, 0)}V is classified as medium or high voltage under standard electrical codes. High voltage systems require specialized switchgear, dielectric clearances, and utility engineering oversight.`
    );
  }

  if (lineCurrentAmps > 1000) {
    warnings.push(
      `Calculated current of ${formatDecimal(lineCurrentAmps, 1)}A represents a very large commercial or industrial service entrance that requires multiple parallel conductor sets, bus duct, or switchgear design.`
    );
  }

  return {
    realPowerWatts,
    realPowerKw,
    formattedRealPowerKw: formatDecimal(realPowerKw, 3),
    formattedRealPowerWatts: formatDecimal(realPowerWatts, 2),
    apparentPowerVa,
    apparentPowerKva,
    formattedApparentPowerKva: formatDecimal(apparentPowerKva, 3),
    formattedApparentPowerVa: formatDecimal(apparentPowerVa, 2),
    reactivePowerVar,
    reactivePowerKvar,
    formattedReactivePowerKvar: formatDecimal(reactivePowerKvar, 3),
    lineCurrentAmps,
    formattedLineCurrentAmps: formatDecimal(lineCurrentAmps, 2),
    vLineToLine,
    vLineToNeutral,
    powerFactor: pf,
    multiplier,
    formulaSteps,
    errors: [],
    warnings,
    isValid: true,
  };
}
