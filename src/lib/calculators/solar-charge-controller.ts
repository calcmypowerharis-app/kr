/**
 * Solar Charge Controller Calculator Engine
 * Pure TypeScript - Decoupled from React, DOM, and UI
 * CalcMyPower.com
 *
 * Sizing Logic & Formulas:
 *
 * 1. MPPT Charge Controller Sizing:
 *    I_charge_nominal = P_array / V_battery_nominal
 *    (Planning calculation: real output depends on operating voltage, conversion efficiency,
 *     charging stage, and environmental conditions.)
 *
 *    Optional Illustrative Planning Buffer:
 *    I_charge_planning = I_charge_nominal * (1 + buffer_percent / 100)
 *    (Illustrative planning buffer, not a universal code requirement.)
 *
 * 2. PWM Charge Controller Sizing:
 *    I_charge_pwm ≈ I_array_operating <= I_array_sc
 *    (PWM switches the array directly to the battery and does not perform voltage-to-current conversion.)
 *
 * 3. Cold-Temperature Open-Circuit Voltage Check (NEC 690.7):
 *    Delta_T = T_min - 25°C
 *    Factor = 1 + (temp_coeff_percent / 100 * Delta_T)
 *    Voc_cold = Voc_STC * Factor
 *    Headroom = V_controller_max - Voc_cold
 */

export type ControllerTechnology = "mppt" | "pwm";
export type SystemVoltage = 12 | 24 | 48;
export type TemperatureUnit = "c" | "f";
export type VoltageCheckStatus = "within_limit" | "exceeded" | "not_calculated";

export const STANDARD_CONTROLLER_SIZES = [10, 15, 20, 30, 40, 50, 60, 80, 100, 120];

export interface ArrayPreset {
  id: string;
  label: string;
  watts: number;
  voltage: SystemVoltage;
  tech: ControllerTechnology;
  description: string;
}

export const SOLAR_ARRAY_PRESETS: ArrayPreset[] = [
  {
    id: "portable-100w",
    label: "100W Portable / Van Setup",
    watts: 100,
    voltage: 12,
    tech: "mppt",
    description: "Compact 100W panel charging a 12V auxiliary or portable battery bank.",
  },
  {
    id: "rv-400w",
    label: "400W Standard RV Setup",
    watts: 400,
    voltage: 12,
    tech: "mppt",
    description: "Standard 400W rooftop array on a 12V RV house battery system.",
  },
  {
    id: "cabin-800w",
    label: "800W Off-Grid Cabin",
    watts: 800,
    voltage: 24,
    tech: "mppt",
    description: "800W solar array configured for a 24V off-grid cabin battery bank.",
  },
  {
    id: "homestead-2400w",
    label: "2,400W High-Power System",
    watts: 2400,
    voltage: 48,
    tech: "mppt",
    description: "2,400W solar array charging a 48V residential or workshop storage bank.",
  },
];

export const CONTROLLER_MAX_VOC_PRESETS = [
  { value: 75, label: "75V (e.g. 75/10, 75/15 class)" },
  { value: 100, label: "100V (e.g. 100/20, 100/30, 100/50 class)" },
  { value: 150, label: "150V (e.g. 150/35, 150/60, 150/70 class)" },
  { value: 200, label: "200V (High-voltage off-grid class)" },
  { value: 250, label: "250V (e.g. 250/60, 250/100 class)" },
];

export interface SolarChargeControllerInputs {
  // Core Sizing Inputs
  arrayWatts: number;
  systemVoltage: SystemVoltage;
  controllerType: ControllerTechnology;
  enableBuffer: boolean;
  bufferPercent: number; // default: 20
  arrayIsc?: number; // required for PWM

  // Optional Voltage Compatibility Check
  enableVoltageCheck: boolean;
  vocStc?: number;
  minTemp?: number;
  tempUnit?: TemperatureUnit;
  tempCoeffPercent?: number; // e.g. -0.28
  controllerMaxVoc?: number; // e.g. 150
}

export interface SolarChargeControllerOutputs {
  // Nominal and Planning Currents
  nominalCurrentAmps: number;
  formattedNominalCurrent: string;
  planningCurrentAmps: number;
  formattedPlanningCurrent: string;
  bufferPercentUsed: number;
  isBufferEnabled: boolean;

  // Recommended Standard Rating Class
  recommendedControllerRatingAmps: number;

  // Technology Details
  controllerType: ControllerTechnology;
  technologySummary: string;

  // Voltage Compatibility Check
  isVoltageCheckEnabled: boolean;
  vocStcUsed?: number;
  minTempUsedC?: number;
  minTempUsedF?: number;
  tempCoeffUsed?: number;
  coldVocVolts?: number;
  formattedColdVoc?: string;
  controllerMaxVocUsed?: number;
  voltageHeadroomVolts?: number;
  formattedVoltageHeadroom?: string;
  voltageStatus: VoltageCheckStatus;
  voltageMessage: string;

  // Validation
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export const SOLAR_CHARGE_CONTROLLER_DEFAULTS: SolarChargeControllerInputs = {
  arrayWatts: 400,
  systemVoltage: 12,
  controllerType: "mppt",
  enableBuffer: true,
  bufferPercent: 20,
  arrayIsc: 10.0,
  enableVoltageCheck: false,
  vocStc: 48.6,
  minTemp: -10,
  tempUnit: "c",
  tempCoeffPercent: -0.30,
  controllerMaxVoc: 100,
};

export function formatAmps(val: number): string {
  if (isNaN(val) || !isFinite(val)) return "0.0 A";
  return `${(Math.round((val + Number.EPSILON) * 10) / 10).toLocaleString("en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })} A`;
}

export function formatVolts(val: number): string {
  if (isNaN(val) || !isFinite(val)) return "0.0 V";
  return `${(Math.round((val + Number.EPSILON) * 10) / 10).toLocaleString("en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })} V`;
}

export function formatWatts(val: number): string {
  if (isNaN(val) || !isFinite(val)) return "0 W";
  return `${Math.round(val).toLocaleString("en-US")} W`;
}

/**
 * Validates solar charge controller calculator inputs.
 */
export function validateSolarChargeControllerInputs(inputs: SolarChargeControllerInputs): string[] {
  const errors: string[] = [];

  if (typeof inputs.arrayWatts !== "number" || isNaN(inputs.arrayWatts) || inputs.arrayWatts <= 0) {
    errors.push("Solar array wattage must be a positive number greater than 0 Watts.");
  } else if (inputs.arrayWatts > 50000) {
    errors.push("Solar array wattage must be 50,000 Watts or less.");
  }

  if (![12, 24, 48].includes(inputs.systemVoltage)) {
    errors.push("Battery nominal voltage must be 12V, 24V, or 48V DC.");
  }

  if (inputs.controllerType !== "mppt" && inputs.controllerType !== "pwm") {
    errors.push("Controller technology must be MPPT or PWM.");
  }

  if (inputs.controllerType === "pwm") {
    if (typeof inputs.arrayIsc !== "number" || isNaN(inputs.arrayIsc) || inputs.arrayIsc <= 0) {
      errors.push("Array short-circuit current (Isc) is required to size a PWM controller. PWM controllers cannot step down voltage to create current.");
    }
  }

  if (inputs.enableBuffer) {
    if (typeof inputs.bufferPercent !== "number" || isNaN(inputs.bufferPercent) || inputs.bufferPercent < 0 || inputs.bufferPercent > 100) {
      errors.push("Planning buffer percentage must be between 0% and 100%.");
    }
  }

  if (inputs.enableVoltageCheck) {
    if (typeof inputs.vocStc !== "number" || isNaN(inputs.vocStc) || inputs.vocStc <= 0) {
      errors.push("Array open-circuit voltage (Voc at STC) must be greater than 0 Volts.");
    }
    if (typeof inputs.controllerMaxVoc !== "number" || isNaN(inputs.controllerMaxVoc) || inputs.controllerMaxVoc <= 0) {
      errors.push("Controller maximum PV input voltage must be greater than 0 Volts.");
    }
    if (typeof inputs.minTemp !== "number" || isNaN(inputs.minTemp)) {
      errors.push("Lowest expected ambient temperature must be a valid number.");
    } else {
      const minTempC = inputs.tempUnit === "f" ? (inputs.minTemp - 32) * (5 / 9) : inputs.minTemp;
      if (minTempC < -80 || minTempC > 60) {
        errors.push("Minimum temperature is outside realistic environmental limits (-80°C to 60°C).");
      }
    }
    if (typeof inputs.tempCoeffPercent !== "number" || isNaN(inputs.tempCoeffPercent)) {
      errors.push("Temperature coefficient of Voc must be a valid number (typically negative, e.g. -0.28%/°C).");
    }
  }

  return errors;
}

/**
 * Calculates charge controller current rating and optional cold Voc compatibility.
 */
export function calculateSolarChargeController(inputs: SolarChargeControllerInputs): SolarChargeControllerOutputs {
  const errors = validateSolarChargeControllerInputs(inputs);
  const warnings: string[] = [];
  const isValid = errors.length === 0;

  if (!isValid) {
    return {
      nominalCurrentAmps: 0,
      formattedNominalCurrent: "0.0 A",
      planningCurrentAmps: 0,
      formattedPlanningCurrent: "0.0 A",
      bufferPercentUsed: inputs.bufferPercent || 20,
      isBufferEnabled: inputs.enableBuffer,
      recommendedControllerRatingAmps: 0,
      controllerType: inputs.controllerType,
      technologySummary: "",
      isVoltageCheckEnabled: inputs.enableVoltageCheck,
      voltageStatus: "not_calculated",
      voltageMessage: "",
      isValid: false,
      errors,
      warnings,
    };
  }

  const {
    arrayWatts,
    systemVoltage,
    controllerType,
    enableBuffer,
    bufferPercent,
    arrayIsc = 0,
    enableVoltageCheck,
    vocStc = 0,
    minTemp = 25,
    tempUnit = "c",
    tempCoeffPercent = -0.30,
    controllerMaxVoc = 150,
  } = inputs;

  let nominalCurrent = 0;
  let technologySummary = "";

  if (controllerType === "mppt") {
    // MPPT: DC-DC conversion steps down voltage and increases current
    nominalCurrent = arrayWatts / systemVoltage;
    technologySummary = `MPPT conversion estimate: ${formatWatts(arrayWatts)} ÷ ${systemVoltage}V = ${formatAmps(nominalCurrent)}. Real-world charging output varies with actual battery voltage, ambient temperature, and conversion efficiency.`;
  } else {
    // PWM: Current is limited by array operating current / Isc
    nominalCurrent = arrayIsc;
    technologySummary = `PWM direct-coupling estimate: Current is determined by array short-circuit current (${formatAmps(arrayIsc)}). PWM does not convert excess voltage into charging current.`;
    
    // Warning if array watts are high for PWM
    if (arrayWatts > 300) {
      warnings.push("Arrays over 300 Watts typically benefit significantly from an MPPT controller. PWM controllers pull panel voltage down near battery voltage, losing potential power from higher-voltage modules.");
    }
  }

  const bufferMultiplier = enableBuffer ? 1 + bufferPercent / 100 : 1;
  const planningCurrent = nominalCurrent * bufferMultiplier;

  // Determine recommended standard controller size
  const targetForRating = planningCurrent;
  let recommendedRating = STANDARD_CONTROLLER_SIZES[STANDARD_CONTROLLER_SIZES.length - 1];
  for (const size of STANDARD_CONTROLLER_SIZES) {
    if (size >= targetForRating - 0.001) {
      recommendedRating = size;
      break;
    }
  }

  if (planningCurrent > 120) {
    recommendedRating = Math.ceil(planningCurrent / 10) * 10;
    warnings.push(`Calculated current (${formatAmps(planningCurrent)}) exceeds standard 100A-120A single-controller ratings. Consider splitting the array across multiple charge controllers or increasing system voltage (e.g. from 12V/24V to 48V).`);
  }

  // Voltage Compatibility Check (Tier 2)
  let coldVocVolts: number | undefined;
  let formattedColdVoc: string | undefined;
  let voltageHeadroomVolts: number | undefined;
  let formattedVoltageHeadroom: string | undefined;
  let voltageStatus: VoltageCheckStatus = "not_calculated";
  let voltageMessage = "";
  let minTempUsedC: number | undefined;
  let minTempUsedF: number | undefined;

  if (enableVoltageCheck && vocStc > 0 && controllerMaxVoc > 0) {
    if (tempUnit === "f") {
      minTempUsedF = minTemp;
      minTempUsedC = (minTemp - 32) * (5 / 9);
    } else {
      minTempUsedC = minTemp;
      minTempUsedF = minTemp * (9 / 5) + 32;
    }

    const deltaT = minTempUsedC - 25.0;
    const factor = 1.0 + (tempCoeffPercent / 100.0) * deltaT;
    coldVocVolts = vocStc * factor;
    voltageHeadroomVolts = controllerMaxVoc - coldVocVolts;

    formattedColdVoc = formatVolts(coldVocVolts);
    formattedVoltageHeadroom = formatVolts(voltageHeadroomVolts);

    if (coldVocVolts <= controllerMaxVoc) {
      voltageStatus = "within_limit";
      voltageMessage = `Calculated cold Voc (${formattedColdVoc}) is within the entered controller limit of ${formatVolts(controllerMaxVoc)}, leaving ${formattedVoltageHeadroom} of calculated voltage headroom.`;
    } else {
      voltageStatus = "exceeded";
      voltageMessage = `WARNING: Calculated cold Voc (${formattedColdVoc}) exceeds the entered controller limit of ${formatVolts(controllerMaxVoc)} by ${formatVolts(Math.abs(voltageHeadroomVolts))}. Exceeding the controller maximum PV voltage can damage the controller.`;
    }

    if (tempCoeffPercent > 0) {
      warnings.push("Entered temperature coefficient is positive. Most photovoltaic silicon panels have a negative Voc temperature coefficient (e.g. -0.28%/°C to -0.35%/°C). Verify your panel datasheet.");
    }
  }

  return {
    nominalCurrentAmps: Math.round((nominalCurrent + Number.EPSILON) * 10000) / 10000,
    formattedNominalCurrent: formatAmps(nominalCurrent),
    planningCurrentAmps: Math.round((planningCurrent + Number.EPSILON) * 10000) / 10000,
    formattedPlanningCurrent: formatAmps(planningCurrent),
    bufferPercentUsed: bufferPercent,
    isBufferEnabled: enableBuffer,
    recommendedControllerRatingAmps: recommendedRating,
    controllerType,
    technologySummary,
    isVoltageCheckEnabled: enableVoltageCheck,
    vocStcUsed: vocStc,
    minTempUsedC,
    minTempUsedF,
    tempCoeffUsed: tempCoeffPercent,
    coldVocVolts: coldVocVolts !== undefined ? Math.round((coldVocVolts + Number.EPSILON) * 10000) / 10000 : undefined,
    formattedColdVoc,
    controllerMaxVocUsed: controllerMaxVoc,
    voltageHeadroomVolts: voltageHeadroomVolts !== undefined ? Math.round((voltageHeadroomVolts + Number.EPSILON) * 10000) / 10000 : undefined,
    formattedVoltageHeadroom,
    voltageStatus,
    voltageMessage,
    isValid: true,
    errors: [],
    warnings,
  };
}

export interface ChargeControllerFaqItem {
  question: string;
  answer: string;
}

export const SOLAR_CHARGE_CONTROLLER_FAQS: ChargeControllerFaqItem[] = [
  {
    question: "How do I calculate what size solar charge controller I need?",
    answer:
      "For a simplified MPPT planning estimate, divide your total solar array wattage by your battery bank's nominal voltage to estimate charging current. For example, a 400-watt solar array charging a 12-volt battery produces an estimated 33.3 amps of charging current (400W ÷ 12V = 33.3A). An optional illustrative planning buffer (such as 20%) may then be added for planning purposes (resulting in 40A), but the final controller rating and operational limits must always be verified against the manufacturer's official specifications.",
  },
  {
    question: "What size charge controller do I need for a 400W solar array?",
    answer:
      "For a 400W solar array charging a 12V battery bank, estimated charging current is approximately 33.3 amps (400W ÷ 12V). With an illustrative 20% planning buffer, the planning value is 40.0 amps, meaning an entered controller rating of at least 40A may be appropriate under these stated assumptions. If the battery bank operates at 24V, estimated current drops to 16.7 amps (400W ÷ 24V), where a 20A controller rating is commonly considered. Actual controller selection depends on the manufacturer's specifications and system design.",
  },
  {
    question: "What is the difference between MPPT and PWM charge controllers?",
    answer:
      "An MPPT (Maximum Power Point Tracking) charge controller functions as an intelligent DC-to-DC buck converter. It accepts high array voltage and converts it down to battery charging voltage while increasing charging current, capturing peak module wattage. A PWM (Pulse Width Modulation) controller acts as a direct electronic switch, clamping the solar panel's voltage down near battery voltage. Because PWM cannot convert excess voltage into current, using high-voltage panels with a PWM controller results in unharvested potential energy.",
  },
  {
    question: "How does battery voltage affect charge controller current?",
    answer:
      "Increasing the battery bank voltage reduces the required charging current for the exact same solar wattage. For an 800-watt solar array on a 12V battery, estimated current is 66.7 amps (800W ÷ 12V), requiring a large 70A to 80A controller. On a 24V battery, the current drops to 33.3 amps (800W ÷ 24V), allowing a 40A controller. On a 48V battery, current drops to 16.7 amps (800W ÷ 48V). Higher system voltage allows for smaller conductor gauges and less expensive charge controllers.",
  },
  {
    question: "Why does solar panel voltage increase in cold weather?",
    answer:
      "Photovoltaic silicon cells have a negative temperature coefficient of open-circuit voltage (Voc). When ambient temperatures drop below Standard Test Conditions (25°C or 77°F), the panel's open-circuit voltage rises. In freezing winter weather, an array's voltage can rise 10% to 15% above its nameplate STC rating. Sizing must calculate the worst-case cold Voc using the module's temperature coefficient (NEC 690.7) to ensure array voltage never exceeds the charge controller's maximum DC input limit.",
  },
  {
    question: "How do I check solar panel Voc against a charge controller?",
    answer:
      "First, take the total open-circuit voltage (Voc) of your series-connected solar string at Standard Test Conditions (25°C). Next, calculate the cold-adjusted Voc based on your location's lowest expected ambient temperature and the manufacturer's Voc temperature coefficient (%/°C). Finally, verify that the cold-adjusted Voc is lower than the charge controller's maximum PV input voltage rating (e.g. 100V, 150V, or 250V). Exceeding the controller's maximum PV input voltage can damage the controller and must be avoided.",
  },
];
