/**
 * Watts to Amps Calculator Logic
 * Pure TypeScript — Decoupled from React and DOM
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
