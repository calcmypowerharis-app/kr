/**
 * Voltage Drop Calculator Engine
 * Pure TypeScript - Decoupled from React, DOM, and UI
 * CalcMyPower.com
 *
 * Mathematical Model:
 * Resistance-based calculation grounded in NEC Chapter 9 Table 8
 * 75°C stranded conductor values for Copper and Aluminum.
 *
 * Multipliers:
 * - DC (Direct Current): 2 (accounts for outgoing and return conductors)
 * - Single-Phase AC: 2 (accounts for outgoing ungrounded conductor and return neutral/conductor)
 * - Balanced Three-Phase AC: √3 ≈ 1.7320508 (line-to-line voltage drop for balanced 3-phase circuits)
 *
 * Formulas:
 *   VD (Volts) = multiplier × I × (L / 1000) × R
 *   VD% = (VD / V_source) × 100
 *   V_load = V_source - VD
 *   R_loop (Ohms) = multiplier × (L / 1000) × R
 *
 * Where:
 *   I = load current in Amps
 *   L = one-way circuit distance in Feet (UI takes one-way; formula accounts for return path)
 *   R = conductor resistance in Ohms per 1,000 feet (NEC Chapter 9 Table 8, 75°C stranded)
 *   V_source = nominal source voltage in Volts
 */

export type CircuitType = "dc" | "ac_single_phase" | "ac_three_phase";

export type ConductorMaterial = "copper" | "aluminum";

export interface WireSizeSpec {
  id: string;
  name: string;
  gaugeLabel: string;
  copperResistance75C: number; // Ohms per 1,000 ft at 75°C stranded
  aluminumResistance75C: number; // Ohms per 1,000 ft at 75°C stranded
}

/**
 * NEC Chapter 9 Table 8: Conductor Properties
 * Stranded conductor direct-current resistance at 75°C (167°F)
 * Values in Ohms per 1,000 feet.
 */
export const WIRE_SPECS_TABLE_8: WireSizeSpec[] = [
  { id: "14_awg", name: "14 AWG", gaugeLabel: "14 AWG", copperResistance75C: 3.14, aluminumResistance75C: 5.06 },
  { id: "12_awg", name: "12 AWG", gaugeLabel: "12 AWG", copperResistance75C: 1.98, aluminumResistance75C: 3.18 },
  { id: "10_awg", name: "10 AWG", gaugeLabel: "10 AWG", copperResistance75C: 1.24, aluminumResistance75C: 2.00 },
  { id: "8_awg", name: "8 AWG", gaugeLabel: "8 AWG", copperResistance75C: 0.778, aluminumResistance75C: 1.26 },
  { id: "6_awg", name: "6 AWG", gaugeLabel: "6 AWG", copperResistance75C: 0.491, aluminumResistance75C: 0.808 },
  { id: "4_awg", name: "4 AWG", gaugeLabel: "4 AWG", copperResistance75C: 0.308, aluminumResistance75C: 0.508 },
  { id: "3_awg", name: "3 AWG", gaugeLabel: "3 AWG", copperResistance75C: 0.245, aluminumResistance75C: 0.403 },
  { id: "2_awg", name: "2 AWG", gaugeLabel: "2 AWG", copperResistance75C: 0.194, aluminumResistance75C: 0.319 },
  { id: "1_awg", name: "1 AWG", gaugeLabel: "1 AWG", copperResistance75C: 0.154, aluminumResistance75C: 0.253 },
  { id: "1_0", name: "1/0 AWG", gaugeLabel: "1/0", copperResistance75C: 0.122, aluminumResistance75C: 0.201 },
  { id: "2_0", name: "2/0 AWG", gaugeLabel: "2/0", copperResistance75C: 0.0967, aluminumResistance75C: 0.159 },
  { id: "3_0", name: "3/0 AWG", gaugeLabel: "3/0", copperResistance75C: 0.0766, aluminumResistance75C: 0.126 },
  { id: "4_0", name: "4/0 AWG", gaugeLabel: "4/0", copperResistance75C: 0.0608, aluminumResistance75C: 0.100 },
  { id: "250_kcmil", name: "250 kcmil", gaugeLabel: "250 kcmil", copperResistance75C: 0.0515, aluminumResistance75C: 0.0847 },
  { id: "300_kcmil", name: "300 kcmil", gaugeLabel: "300 kcmil", copperResistance75C: 0.0429, aluminumResistance75C: 0.0707 },
  { id: "350_kcmil", name: "350 kcmil", gaugeLabel: "350 kcmil", copperResistance75C: 0.0367, aluminumResistance75C: 0.0605 },
  { id: "500_kcmil", name: "500 kcmil", gaugeLabel: "500 kcmil", copperResistance75C: 0.0258, aluminumResistance75C: 0.0424 },
];

export const CIRCUIT_TYPE_OPTIONS: { id: CircuitType; label: string; multiplier: number; description: string }[] = [
  {
    id: "dc",
    label: "DC (Direct Current)",
    multiplier: 2,
    description: "Two-wire DC circuit (positive conductor out and negative conductor return). Multiplier is 2.",
  },
  {
    id: "ac_single_phase",
    label: "Single-Phase AC",
    multiplier: 2,
    description: "Two-wire single-phase AC branch or feeder (hot conductor and return neutral or second leg). Multiplier is 2.",
  },
  {
    id: "ac_three_phase",
    label: "Three-Phase AC (Balanced)",
    multiplier: Math.sqrt(3),
    description: "Balanced three-phase AC circuit line-to-line voltage drop calculation. Multiplier is √3 (approx 1.732).",
  },
];

export const VOLTAGE_PRESETS: { value: number; label: string; circuitTypes: CircuitType[] }[] = [
  { value: 12, label: "12V DC (Vehicle / Solar)", circuitTypes: ["dc"] },
  { value: 24, label: "24V DC (Cabin / Battery)", circuitTypes: ["dc"] },
  { value: 48, label: "48V DC (Off-Grid / ESS)", circuitTypes: ["dc"] },
  { value: 120, label: "120V AC (Standard Receptacle)", circuitTypes: ["ac_single_phase"] },
  { value: 208, label: "208V AC (Commercial 3-Phase)", circuitTypes: ["ac_three_phase", "ac_single_phase"] },
  { value: 240, label: "240V AC (Residential Heavy Branch)", circuitTypes: ["ac_single_phase"] },
  { value: 277, label: "277V AC (Commercial Lighting)", circuitTypes: ["ac_single_phase"] },
  { value: 480, label: "480V AC (Industrial 3-Phase)", circuitTypes: ["ac_three_phase"] },
];

export interface VoltageDropInputs {
  circuitType: CircuitType;
  sourceVoltage: number;
  currentAmps: number;
  distanceFeet: number; // One-way distance in feet
  conductorMaterial: ConductorMaterial;
  wireSizeId: string; // matches id in WIRE_SPECS_TABLE_8
  targetThresholdPercent?: number; // default 3%
}

export interface WireComparisonRow {
  wireSizeId: string;
  wireName: string;
  resistancePer1000Ft: number;
  voltageDropVolts: number;
  voltageDropPercent: number;
  receivingVoltageVolts: number;
  loopResistanceOhms: number;
  isSelectedWire: boolean;
  isWithinThreshold: boolean;
}

export interface VoltageDropOutputs {
  circuitType: CircuitType;
  sourceVoltage: number;
  currentAmps: number;
  distanceFeet: number; // One-way distance
  conductorMaterial: ConductorMaterial;
  wireSizeId: string;
  wireName: string;
  conductorResistance75C: number; // Ohms per 1,000 ft
  circuitMultiplier: number; // 2 for DC & 1-Phase, √3 for 3-Phase

  // Calculated Results
  loopResistanceOhms: number;
  voltageDropVolts: number;
  voltageDropPercent: number;
  receivingVoltageVolts: number;

  // Comparison Threshold Evaluation
  targetThresholdPercent: number;
  isWithinThreshold: boolean;
  thresholdStatusText: string;

  // Adjacent / Reference Wire Comparisons
  comparisonRows: WireComparisonRow[];

  // Validation
  isValid: boolean;
  errors: string[];
}

export const VOLTAGE_DROP_DEFAULTS: VoltageDropInputs = {
  circuitType: "ac_single_phase",
  sourceVoltage: 120,
  currentAmps: 16,
  distanceFeet: 75,
  conductorMaterial: "copper",
  wireSizeId: "12_awg",
  targetThresholdPercent: 3.0,
};

/**
 * Validates inputs for voltage drop calculation.
 */
export function validateVoltageDropInputs(inputs: VoltageDropInputs): string[] {
  const errors: string[] = [];

  if (!["dc", "ac_single_phase", "ac_three_phase"].includes(inputs.circuitType)) {
    errors.push("Select a valid circuit type: DC, Single-Phase AC, or Three-Phase AC.");
  }

  if (typeof inputs.sourceVoltage !== "number" || isNaN(inputs.sourceVoltage) || inputs.sourceVoltage <= 0) {
    errors.push("Source voltage must be a positive number greater than 0.");
  }

  if (typeof inputs.currentAmps !== "number" || isNaN(inputs.currentAmps) || inputs.currentAmps <= 0) {
    errors.push("Load current must be a positive number greater than 0 Amps.");
  }

  if (typeof inputs.distanceFeet !== "number" || isNaN(inputs.distanceFeet) || inputs.distanceFeet <= 0) {
    errors.push("One-way distance must be a positive number greater than 0 feet.");
  }

  if (!["copper", "aluminum"].includes(inputs.conductorMaterial)) {
    errors.push("Select either Copper or Aluminum as the conductor material.");
  }

  const wireSpec = WIRE_SPECS_TABLE_8.find((w) => w.id === inputs.wireSizeId);
  if (!wireSpec) {
    errors.push("Select a valid wire size from the standard AWG/kcmil options.");
  }

  if (
    inputs.targetThresholdPercent !== undefined &&
    (isNaN(inputs.targetThresholdPercent) || inputs.targetThresholdPercent <= 0 || inputs.targetThresholdPercent > 50)
  ) {
    errors.push("Target comparison threshold must be between 0.1% and 50%.");
  }

  return errors;
}

/**
 * Retrieves the conductor resistance in Ohms per 1,000 ft at 75°C stranded.
 */
export function getConductorResistance(spec: WireSizeSpec, material: ConductorMaterial): number {
  return material === "copper" ? spec.copperResistance75C : spec.aluminumResistance75C;
}

/**
 * Returns the calculation circuit multiplier:
 * - DC: 2
 * - Single-Phase AC: 2
 * - Three-Phase AC (balanced): √3 ≈ 1.7320508075688772
 */
export function getCircuitMultiplier(circuitType: CircuitType): number {
  return circuitType === "ac_three_phase" ? Math.sqrt(3) : 2.0;
}

/**
 * Pure calculation function for voltage drop.
 */
export function calculateVoltageDrop(inputs: VoltageDropInputs): VoltageDropOutputs {
  const errors = validateVoltageDropInputs(inputs);
  const isValid = errors.length === 0;

  const wireSpec = WIRE_SPECS_TABLE_8.find((w) => w.id === inputs.wireSizeId) || WIRE_SPECS_TABLE_8[1]; // default 12 AWG
  const resistance = getConductorResistance(wireSpec, inputs.conductorMaterial || "copper");
  const multiplier = getCircuitMultiplier(inputs.circuitType);
  const threshold = inputs.targetThresholdPercent ?? 3.0;

  if (!isValid) {
    return {
      circuitType: inputs.circuitType,
      sourceVoltage: inputs.sourceVoltage || 120,
      currentAmps: inputs.currentAmps || 0,
      distanceFeet: inputs.distanceFeet || 0,
      conductorMaterial: inputs.conductorMaterial || "copper",
      wireSizeId: wireSpec.id,
      wireName: wireSpec.name,
      conductorResistance75C: resistance,
      circuitMultiplier: multiplier,
      loopResistanceOhms: 0,
      voltageDropVolts: 0,
      voltageDropPercent: 0,
      receivingVoltageVolts: inputs.sourceVoltage || 0,
      targetThresholdPercent: threshold,
      isWithinThreshold: false,
      thresholdStatusText: "Invalid inputs",
      comparisonRows: [],
      isValid: false,
      errors,
    };
  }

  const lengthThousands = inputs.distanceFeet / 1000;
  const loopResistanceOhms = multiplier * lengthThousands * resistance;
  const voltageDropVolts = multiplier * inputs.currentAmps * lengthThousands * resistance;
  const voltageDropPercent = (voltageDropVolts / inputs.sourceVoltage) * 100;
  const receivingVoltageVolts = inputs.sourceVoltage - voltageDropVolts;
  const isWithinThreshold = voltageDropPercent <= threshold;
  const thresholdStatusText = isWithinThreshold
    ? "Within selected comparison threshold"
    : "Exceeds selected comparison threshold";

  // Build comparison rows across all standard wire sizes for current parameters
  const comparisonRows: WireComparisonRow[] = WIRE_SPECS_TABLE_8.map((spec) => {
    const specResistance = getConductorResistance(spec, inputs.conductorMaterial);
    const specLoopR = multiplier * lengthThousands * specResistance;
    const specVD = multiplier * inputs.currentAmps * lengthThousands * specResistance;
    const specVDPercent = (specVD / inputs.sourceVoltage) * 100;
    const specVLoad = inputs.sourceVoltage - specVD;
    return {
      wireSizeId: spec.id,
      wireName: spec.name,
      resistancePer1000Ft: specResistance,
      voltageDropVolts: specVD,
      voltageDropPercent: specVDPercent,
      receivingVoltageVolts: specVLoad,
      loopResistanceOhms: specLoopR,
      isSelectedWire: spec.id === inputs.wireSizeId,
      isWithinThreshold: specVDPercent <= threshold,
    };
  });

  return {
    circuitType: inputs.circuitType,
    sourceVoltage: inputs.sourceVoltage,
    currentAmps: inputs.currentAmps,
    distanceFeet: inputs.distanceFeet,
    conductorMaterial: inputs.conductorMaterial,
    wireSizeId: wireSpec.id,
    wireName: wireSpec.name,
    conductorResistance75C: resistance,
    circuitMultiplier: multiplier,
    loopResistanceOhms,
    voltageDropVolts,
    voltageDropPercent,
    receivingVoltageVolts,
    targetThresholdPercent: threshold,
    isWithinThreshold,
    thresholdStatusText,
    comparisonRows,
    isValid: true,
    errors: [],
  };
}

/**
 * Format helpers for clean UI presentation.
 */
export function formatVolts(value: number, decimals: number = 2): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatPercent(value: number, decimals: number = 2): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatOhms(value: number, decimals: number = 4): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export interface VoltageDropFaq {
  question: string;
  answer: string;
}

export const VOLTAGE_DROP_FAQS: VoltageDropFaq[] = [
  {
    question: "What is voltage drop?",
    answer:
      "Voltage drop is the loss of electrical potential that occurs as electric current flows through the internal electrical resistance of circuit conductors from the power source to connected equipment. All physical conductors present a small amount of resistance. According to Ohm's Law (V = I × R), current passing through this resistance creates a voltage reduction along the length of the wire, resulting in a lower receiving voltage at the electrical load.",
  },
  {
    question: "How do you calculate voltage drop?",
    answer:
      "To calculate voltage drop using a resistance-based model, multiply the circuit multiplier by the load current in Amps, the one-way conductor length divided by 1,000 feet, and the conductor's resistance in Ohms per 1,000 feet. For DC and single-phase AC circuits, the multiplier is 2 to account for the outgoing and return conductors. For balanced three-phase AC circuits, the multiplier is √3 (approximately 1.732) for line-to-line calculations. Then divide the calculated voltage drop by the source voltage and multiply by 100 to find the percentage drop.",
  },
  {
    question: "Is voltage drop calculated using one-way or round-trip distance?",
    answer:
      "Field engineers and electricians measure one-way distance between the power source panel and the connected load. However, the calculation formula itself accounts for the round-trip path by applying a multiplier of 2 for two-wire DC and single-phase AC circuits. On our calculator, enter the one-way physical distance, and the calculation engine automatically accounts for the complete return conductor path.",
  },
  {
    question: "Why is voltage drop more significant on 12V systems?",
    answer:
      "A given voltage loss represents a much higher percentage on a low-voltage circuit than on a high-voltage circuit. For example, a 1.2-volt drop on a 120-volt circuit is just 1%, whereas the exact same 1.2-volt drop on a 12-volt system represents 10% of total system voltage. Furthermore, to deliver the same amount of power (Watts = Volts × Amps), a 12-volt system requires 10 times the current of a 120-volt system, multiplying resistive voltage loss.",
  },
  {
    question: "How does wire gauge affect voltage drop?",
    answer:
      "Wire gauge directly determines conductor cross-sectional area and internal resistance. Under the American Wire Gauge (AWG) standard, smaller numerical gauge numbers indicate physically thicker conductors with lower electrical resistance. Moving up by three gauge sizes (for example, from 12 AWG to 9 AWG or approximately from 10 AWG to 7 AWG) roughly doubles the cross-sectional area and halves conductor resistance, reducing voltage drop by roughly half under identical current and distance.",
  },
  {
    question: "When is √3 used in voltage drop calculations?",
    answer:
      "The square root of 3 (approximately 1.732) is used in balanced three-phase alternating current calculations to determine line-to-line voltage drop. In a balanced three-phase system, current returns across the other two phase conductors with a 120-degree phase shift rather than flowing through a single dedicated return conductor, resulting in an effective line-to-line voltage drop multiplier of √3 rather than 2.",
  },
  {
    question: "What does the NEC say about voltage drop?",
    answer:
      "The National Electrical Code (NEC / NFPA 70) mentions voltage drop in informational notes, such as Informational Note No. 2 to Section 210.19(A) for branch circuits and Section 215.2(A)(1) for feeders. These notes recommend that conductors be sized to limit voltage drop to 3% on branch circuits or feeders, and no more than 5% overall for branch circuits and feeders combined, for reasonable efficiency. Informational notes in the NEC are advisory recommendations for electrical performance, not mandatory code requirements, though certain specific sections or local jurisdictions may enforce mandatory limits.",
  },
];
