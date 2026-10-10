/**
 * Watts to Amps Calculator Logic
 * Pure TypeScript - Decoupled from React and DOM
 * CalcMyPower.com
 *
 * Formulas:
 * 1. DC:
 *    I = P / V
 * 2. AC Single-Phase:
 *    I = P / (V × PF)
 * 3. AC Three-Phase (Balanced, Line-to-Line):
 *    I = P / (√3 × V_LL × PF)
 * 4. AC Three-Phase (Balanced, Line-to-Neutral):
 *    I = P / (3 × V_LN × PF)
 */

export interface WattsToAmpsFaqItem {
  question: string;
  answer: string;
}

export const WATTS_TO_AMPS_FAQS: WattsToAmpsFaqItem[] = [
  {
    question: "How do I convert 1,500 Watts to Amps at 120 Volts?",
    answer:
      "In a standard 120V household circuit with a resistive load (power factor = 1.0), divide 1,500 Watts by 120 Volts: Current = 1,500 / 120 = 12.50 Amps. For continuous operation (loads operating 3 hours or more per NEC Article 100), standard non-100%-rated branch breakers are evaluated at 80% (12.0A on a 15A breaker). Because 12.5A exceeds 12.0A, a 20A branch circuit is required for continuous space heating, whereas non-continuous duty operates within a 15A circuit.",
  },
  {
    question: "Why does 100 Watts produce different Amps on 12V DC compared to 120V AC?",
    answer:
      "Current is inversely proportional to voltage (I = P / V). At 120V AC, 100 Watts requires approximately 0.83 Amps. At 12V DC (automotive or solar battery bank), that same 100 Watts draws 8.33 Amps: ten times more current. Higher current creates more resistance and heat, requiring substantially thicker wire.",
  },
  {
    question: "What is power factor, and when should I change it?",
    answer:
      "Power factor (PF) is the ratio of real power (Watts) to apparent power (Volt-Amperes) in AC circuits. Pure resistive loads (heaters, incandescent lamps) have a PF of 1.0. Inductive devices with electric motors or compressors (refrigerators, air conditioners, power tools) typically have a PF between 0.75 and 0.90. When equipment nameplate data is available, enter that specific value.",
  },
  {
    question: "What does the 125% continuous-load reference mean?",
    answer:
      "Under National Electrical Code (NEC) Article 100, a continuous load is defined as any load where maximum current is expected to continue for 3 hours or more. Under NEC Sections 210.19(A)(1) and 210.20(A), branch circuit conductors and standard non-100%-rated overcurrent devices must be sized for at least 125% of the continuous load (I × 1.25), which restricts continuous duty to 80% of standard breaker rating. This is an installation sizing rule, not a change in mathematical current or an unconditional safety guarantee.",
  },
  {
    question: "How do you calculate three-phase Watts to Amps?",
    answer:
      "For a balanced three-phase system using line-to-line voltage (V_LL), divide Watts by the product of the square root of 3 (1.732), the line-to-line voltage, and the power factor: I = P / (√3 × V_LL × PF). For example, a 10,000W load at 480V with PF 0.85 draws approximately 14.15 Amps per line.",
  },
  {
    question: "How do you calculate inverter DC amp draw from AC watts?",
    answer:
      "To calculate how many DC Amps an inverter draws from a battery bank, divide the AC load wattage by the product of battery DC voltage and inverter efficiency: I_DC = P_AC / (V_DC × Efficiency). For example, running a 1,200-Watt appliance through a 12V inverter with 90% efficiency draws approximately 111.1 Amps DC (1,200 / [12 × 0.90]). On a 24V battery bank, that same 1,200W load draws only 55.6 Amps DC, and on a 48V bank it draws 27.8 Amps DC. Always include a safety margin for inverter standby idle draw and peak compressor motor surge.",
  },
];

export type ElectricalSystemType = "dc" | "ac_single" | "ac_three";
export type ThreePhaseVoltageType = "line_to_line" | "line_to_neutral";

export interface WattsToAmpsInputs {
  /** Real power in Watts (W) */
  powerWatts: number;
  /** Operating electrical system */
  currentType: ElectricalSystemType;
  /** Nominal circuit voltage in Volts (V) */
  voltage: number;
  /** Three-phase voltage measurement reference */
  voltageType?: ThreePhaseVoltageType;
  /** Power factor (0.1 to 1.0). Applicable to AC circuits only */
  powerFactor?: number;
}

export interface ValidationError {
  field: "powerWatts" | "voltage" | "powerFactor";
  message: string;
}

export interface WattsToAmpsOutputs {
  /** Primary calculated electrical current in Amperes (A) */
  currentAmps: number;
  /** Formatted current string (e.g., '12.50 A') */
  formattedCurrent: string;
  /** Apparent power in Volt-Amps (VA), relevant for AC when PF < 1.0 */
  apparentPowerVa?: number;
  /** 125% continuous-load reference current in Amps (A) */
  continuousLoadRefAmps: number;
  /** Active electrical system label */
  systemLabel: string;
  /** Formula representation with substituted values */
  formulaExplanation: string;
  /** Non-silent validation errors for invalid input states */
  errors: ValidationError[];
  /** Engineering warnings for high currents or boundary conditions */
  warnings: string[];
  /** Whether the calculation represents valid physical state */
  isValid: boolean;
}

export const COMMON_CIRCUIT_VOLTAGES = [
  { value: 12, label: "12V (DC Battery / RV)" },
  { value: 24, label: "24V (DC Solar / Marine)" },
  { value: 48, label: "48V (DC Powerwall / Telecom)" },
  { value: 120, label: "120V (Standard US Household Outlet)" },
  { value: 208, label: "208V (US Commercial 3-Phase)" },
  { value: 240, label: "240V (US Heavy Appliance / EV Charger)" },
  { value: 277, label: "277V (US Commercial Lighting)" },
  { value: 480, label: "480V (US Industrial 3-Phase)" },
];

export interface PresetAppliance {
  label: string;
  watts: number;
  voltage: number;
  system: ElectricalSystemType;
  pf: number;
}

export const WATTS_TO_AMPS_PRESETS: PresetAppliance[] = [
  { label: "Space Heater (1,500W @ 120V)", watts: 1500, voltage: 120, system: "ac_single", pf: 1.0 },
  { label: "Microwave (1,200W @ 120V)", watts: 1200, voltage: 120, system: "ac_single", pf: 1.0 },
  { label: "Clothes Dryer (5,000W @ 240V)", watts: 5000, voltage: 240, system: "ac_single", pf: 1.0 },
  { label: "RV Air Conditioner (1,800W)", watts: 1800, voltage: 120, system: "ac_single", pf: 0.85 },
  { label: "Refrigerator Running (180W)", watts: 180, voltage: 120, system: "ac_single", pf: 0.85 },
  { label: "Solar Panel (100W @ 12V DC)", watts: 100, voltage: 12, system: "dc", pf: 1.0 },
];

export function calculateWattsToAmps(inputs: WattsToAmpsInputs): WattsToAmpsOutputs {
  const errors: ValidationError[] = [];
  const warnings: string[] = [];

  const rawPower = Number(inputs.powerWatts);
  const rawVoltage = Number(inputs.voltage);
  const currentType = inputs.currentType || "ac_single";
  const voltageType = inputs.voltageType || "line_to_line";

  // Validate Power
  if (isNaN(rawPower) || rawPower < 0) {
    errors.push({
      field: "powerWatts",
      message: "Power cannot be negative or invalid. Enter 0 Watts or higher.",
    });
  }

  // Validate Voltage
  if (isNaN(rawVoltage) || rawVoltage <= 0) {
    errors.push({
      field: "voltage",
      message: "Voltage must be greater than 0 Volts to calculate current.",
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
  const power = Math.max(0, isNaN(rawPower) ? 0 : rawPower);
  const voltage = Math.max(0.001, isNaN(rawVoltage) ? 120 : rawVoltage);

  const isValid = errors.length === 0;

  // Calculation when valid
  let calculatedAmps = 0;
  let formulaExplanation = "";
  let apparentPowerVa: number | undefined;

  if (errors.some((e) => e.field === "voltage")) {
    calculatedAmps = 0;
    formulaExplanation = "Voltage must be greater than 0 V.";
  } else if (power === 0) {
    calculatedAmps = 0;
    formulaExplanation = "0 W / V = 0.00 A";
    if (isValid) {
      warnings.push("Load is currently 0 Watts. Enter wattage to compute electrical current.");
    }
  } else {
    switch (currentType) {
      case "dc": {
        calculatedAmps = power / voltage;
        formulaExplanation = `I = ${power}W / ${voltage}V = ${calculatedAmps.toFixed(2)} A`;
        break;
      }
      case "ac_single": {
        calculatedAmps = power / (voltage * pf);
        formulaExplanation = `I = ${power}W / (${voltage}V × ${pf}) = ${calculatedAmps.toFixed(2)} A`;
        if (pf < 1.0) {
          apparentPowerVa = Math.round(power / pf);
        }
        break;
      }
      case "ac_three": {
        if (voltageType === "line_to_line") {
          const denominator = Math.sqrt(3) * voltage * pf;
          calculatedAmps = power / denominator;
          formulaExplanation = `I = ${power}W / (√3 × ${voltage}V × ${pf}) = ${calculatedAmps.toFixed(2)} A (Balanced 3-Phase L-L)`;
        } else {
          const denominator = 3 * voltage * pf;
          calculatedAmps = power / denominator;
          formulaExplanation = `I = ${power}W / (3 × ${voltage}V × ${pf}) = ${calculatedAmps.toFixed(2)} A (Balanced 3-Phase L-N)`;
        }
        if (pf < 1.0) {
          apparentPowerVa = Math.round(power / pf);
        }
        break;
      }
    }
  }

  // 125% Continuous-Duty Planning Reference
  const continuousLoadRefAmps = calculatedAmps * 1.25;

  // High current warning
  if (calculatedAmps > 50) {
    warnings.push(
      `High current detected (${calculatedAmps.toFixed(1)} A). Circuits of this magnitude require dedicated heavy-duty wiring, specialized overcurrent protection, and professional installation.`
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

  // Rounding precision strictly to 2 decimal places
  const roundedAmps = Math.round((calculatedAmps + Number.EPSILON) * 100) / 100;
  const roundedContinuous = Math.round((continuousLoadRefAmps + Number.EPSILON) * 100) / 100;

  return {
    currentAmps: roundedAmps,
    formattedCurrent: `${roundedAmps.toFixed(2)} A`,
    apparentPowerVa,
    continuousLoadRefAmps: roundedContinuous,
    systemLabel,
    formulaExplanation,
    errors,
    warnings,
    isValid,
  };
}
