/**
 * Pure Calculation Engine: Electricity Use & Energy Consumption
 * CalcMyPower.com
 *
 * Implements pure mathematical functions for converting appliance wattage,
 * operating schedules, duty cycles, and quantities into daily/monthly Watt-hours (Wh),
 * kilowatt-hours (kWh), and optional energy cost projections.
 *
 * Grounded in U.S. Department of Energy (DOE) and U.S. Energy Information
 * Administration (EIA) energy accounting standards.
 */

export interface ApplianceInput {
  id: string;
  name: string;
  watts: number;
  hoursPerDay: number;
  daysPerMonth?: number; // default 30
  quantity?: number; // default 1
  dutyCycle?: number; // default 1.0 (100%), range 0.01 to 1.0
  category?: string;
}

export interface ApplianceEnergyResult {
  id: string;
  name: string;
  watts: number;
  effectiveWatts: number;
  hoursPerDay: number;
  daysPerMonth: number;
  quantity: number;
  dutyCycle: number;
  dailyWh: number;
  dailyKwh: number;
  monthlyKwh: number;
  estimatedCostMonthly?: number;
  percentOfTotal: number;
  category?: string;
}

export interface ElectricityUseInput {
  appliances: ApplianceInput[];
  planningDays?: number; // default 30
  electricityRate?: number; // optional $/kWh
}

export interface ElectricityUseResult {
  totalDailyWh: number;
  totalDailyKwh: number;
  totalMonthlyKwh: number;
  planningDays: number;
  totalEstimatedMonthlyCost?: number;
  electricityRate?: number;
  applianceCount: number;
  totalUnits: number;
  highestConsumer?: ApplianceEnergyResult;
  breakdown: ApplianceEnergyResult[];
  hasInvalidInputs: boolean;
  validationErrors: string[];
}

export interface AppliancePreset {
  id: string;
  name: string;
  defaultWatts: number;
  defaultHoursPerDay: number;
  defaultDutyCycle: number;
  defaultQuantity: number;
  category: "kitchen" | "climate" | "electronics" | "lighting" | "laundry" | "general";
  notes?: string;
}

/**
 * Standard illustrative appliance library with realistic typical ratings
 */
export const PRESET_APPLIANCE_LIBRARY: AppliancePreset[] = [
  {
    id: "refrigerator",
    name: "Refrigerator / Freezer (Compressor Cycling)",
    defaultWatts: 150,
    defaultHoursPerDay: 24,
    defaultDutyCycle: 0.35,
    defaultQuantity: 1,
    category: "kitchen",
    notes: "Cycles automatically; roughly 35% active compressor duty cycle over 24 hours.",
  },
  {
    id: "tv_led",
    name: "Living Room Television (LED / 55-65 inch)",
    defaultWatts: 100,
    defaultHoursPerDay: 5,
    defaultDutyCycle: 1.0,
    defaultQuantity: 1,
    category: "electronics",
    notes: "Modern 55-inch to 65-inch 4K smart television during active viewing.",
  },
  {
    id: "led_lighting",
    name: "LED Home Lighting (Group of 6 Fixtures)",
    defaultWatts: 60,
    defaultHoursPerDay: 5,
    defaultDutyCycle: 1.0,
    defaultQuantity: 1,
    category: "lighting",
    notes: "Six 10-watt high-efficiency LED bulbs operating simultaneously.",
  },
  {
    id: "desktop_computer",
    name: "Desktop Computer & Dual Monitors",
    defaultWatts: 200,
    defaultHoursPerDay: 8,
    defaultDutyCycle: 1.0,
    defaultQuantity: 1,
    category: "electronics",
    notes: "Average running load for workstation PC with two external monitors.",
  },
  {
    id: "laptop_computer",
    name: "Laptop Computer",
    defaultWatts: 65,
    defaultHoursPerDay: 8,
    defaultDutyCycle: 1.0,
    defaultQuantity: 1,
    category: "electronics",
    notes: "Standard office laptop while charging and operating.",
  },
  {
    id: "microwave",
    name: "Microwave Oven",
    defaultWatts: 1200,
    defaultHoursPerDay: 0.25,
    defaultDutyCycle: 1.0,
    defaultQuantity: 1,
    category: "kitchen",
    notes: "15 minutes (0.25 hours) total daily cooking and reheating time.",
  },
  {
    id: "space_heater",
    name: "Portable Electric Space Heater",
    defaultWatts: 1500,
    defaultHoursPerDay: 6,
    defaultDutyCycle: 1.0,
    defaultQuantity: 1,
    category: "climate",
    notes: "Standard 1,500-watt ceramic or oil-filled resistance room heater.",
  },
  {
    id: "central_ac",
    name: "Central Air Conditioner (3-Ton / 14 SEER)",
    defaultWatts: 3500,
    defaultHoursPerDay: 6,
    defaultDutyCycle: 1.0,
    defaultQuantity: 1,
    category: "climate",
    notes: "Estimated 6 hours daily compressor run time in warm summer conditions.",
  },
  {
    id: "water_heater",
    name: "Electric Storage Water Heater",
    defaultWatts: 4500,
    defaultHoursPerDay: 2.5,
    defaultDutyCycle: 1.0,
    defaultQuantity: 1,
    category: "general",
    notes: "Resistance heating elements operate approximately 2 to 3 hours per day.",
  },
  {
    id: "ceiling_fan",
    name: "Ceiling Fan (Medium Speed)",
    defaultWatts: 40,
    defaultHoursPerDay: 8,
    defaultDutyCycle: 1.0,
    defaultQuantity: 1,
    category: "climate",
    notes: "Standard 52-inch residential ceiling fan on medium setting.",
  },
  {
    id: "coffee_maker",
    name: "Drip Coffee Maker",
    defaultWatts: 1000,
    defaultHoursPerDay: 0.5,
    defaultDutyCycle: 1.0,
    defaultQuantity: 1,
    category: "kitchen",
    notes: "30 minutes total brewing and warming plate duration.",
  },
  {
    id: "wifi_router",
    name: "Wi-Fi Router & Modem",
    defaultWatts: 15,
    defaultHoursPerDay: 24,
    defaultDutyCycle: 1.0,
    defaultQuantity: 1,
    category: "electronics",
    notes: "Continuous 24/7 network connectivity hardware.",
  },
];

/**
 * Pre-configured starter scenarios
 */
export const CALCULATOR_PRESETS = [
  {
    id: "default_home",
    name: "Default Household",
    description: "Everyday baseline combination of kitchen, living room, and lighting loads.",
    appliances: [
      {
        id: "app_1",
        name: "Refrigerator / Freezer",
        watts: 150,
        hoursPerDay: 24,
        dutyCycle: 0.35,
        quantity: 1,
        category: "kitchen",
      },
      {
        id: "app_2",
        name: "LED Lighting (6 Fixtures)",
        watts: 60,
        hoursPerDay: 5,
        dutyCycle: 1.0,
        quantity: 1,
        category: "lighting",
      },
      {
        id: "app_3",
        name: "Living Room Television",
        watts: 100,
        hoursPerDay: 5,
        dutyCycle: 1.0,
        quantity: 1,
        category: "electronics",
      },
      {
        id: "app_4",
        name: "Microwave Oven",
        watts: 1200,
        hoursPerDay: 0.25,
        dutyCycle: 1.0,
        quantity: 1,
        category: "kitchen",
      },
      {
        id: "app_5",
        name: "Wi-Fi Router & Modem",
        watts: 15,
        hoursPerDay: 24,
        dutyCycle: 1.0,
        quantity: 1,
        category: "electronics",
      },
    ],
  },
  {
    id: "home_office",
    name: "Home Office & Electronics",
    description: "Workstation computer, monitors, network router, and task lighting.",
    appliances: [
      {
        id: "app_ho_1",
        name: "Desktop Workstation & Dual Monitors",
        watts: 200,
        hoursPerDay: 8,
        dutyCycle: 1.0,
        quantity: 1,
        category: "electronics",
      },
      {
        id: "app_ho_2",
        name: "Laptop Computer",
        watts: 65,
        hoursPerDay: 8,
        dutyCycle: 1.0,
        quantity: 1,
        category: "electronics",
      },
      {
        id: "app_ho_3",
        name: "Wi-Fi Router & Network Switch",
        watts: 20,
        hoursPerDay: 24,
        dutyCycle: 1.0,
        quantity: 1,
        category: "electronics",
      },
      {
        id: "app_ho_4",
        name: "Desk Lamp (LED)",
        watts: 12,
        hoursPerDay: 8,
        dutyCycle: 1.0,
        quantity: 1,
        category: "lighting",
      },
      {
        id: "app_ho_5",
        name: "Desk Fan",
        watts: 35,
        hoursPerDay: 6,
        dutyCycle: 1.0,
        quantity: 1,
        category: "climate",
      },
    ],
  },
  {
    id: "high_consumption",
    name: "High-Draw Climate & Thermal",
    description: "Heavy thermal loads including space heaters, water heating, and cooling.",
    appliances: [
      {
        id: "app_hc_1",
        name: "Portable Electric Space Heater",
        watts: 1500,
        hoursPerDay: 6,
        dutyCycle: 1.0,
        quantity: 1,
        category: "climate",
      },
      {
        id: "app_hc_2",
        name: "Electric Storage Water Heater",
        watts: 4500,
        hoursPerDay: 2.5,
        dutyCycle: 1.0,
        quantity: 1,
        category: "general",
      },
      {
        id: "app_hc_3",
        name: "Central Air Conditioner",
        watts: 3500,
        hoursPerDay: 6,
        dutyCycle: 1.0,
        quantity: 1,
        category: "climate",
      },
    ],
  },
  {
    id: "single_device",
    name: "Single Appliance Quick Check",
    description: "Isolated evaluation of a single 100-watt appliance.",
    appliances: [
      {
        id: "app_sd_1",
        name: "Example 100W Appliance",
        watts: 100,
        hoursPerDay: 8,
        dutyCycle: 1.0,
        quantity: 1,
        category: "general",
      },
    ],
  },
];

/**
 * Calculates energy consumption for a single appliance entry.
 */
export function calculateApplianceEnergy(
  appliance: ApplianceInput,
  planningDays: number = 30,
  electricityRate?: number
): ApplianceEnergyResult {
  const rawWatts = Number(appliance.watts);
  const rawHours = Number(appliance.hoursPerDay);
  const rawQty = appliance.quantity !== undefined ? Number(appliance.quantity) : 1;
  const rawDuty = appliance.dutyCycle !== undefined ? Number(appliance.dutyCycle) : 1.0;
  const rawDays = appliance.daysPerMonth !== undefined ? Number(appliance.daysPerMonth) : planningDays;

  // Sanitize values
  const watts = isNaN(rawWatts) || rawWatts < 0 ? 0 : rawWatts;
  const hoursPerDay = isNaN(rawHours) || rawHours < 0 ? 0 : Math.min(24, rawHours);
  const quantity = isNaN(rawQty) || rawQty < 1 ? 1 : Math.floor(rawQty);
  const dutyCycle = isNaN(rawDuty) || rawDuty <= 0 ? 1.0 : Math.min(1.0, rawDuty);
  const daysPerMonth = isNaN(rawDays) || rawDays < 1 ? 30 : Math.min(31, Math.floor(rawDays));

  const effectiveWatts = watts * dutyCycle;
  const dailyWh = effectiveWatts * hoursPerDay * quantity;
  const dailyKwh = dailyWh / 1000;
  const monthlyKwh = (effectiveWatts * hoursPerDay * daysPerMonth * quantity) / 1000;

  const estimatedCostMonthly =
    electricityRate !== undefined && !isNaN(electricityRate) && electricityRate >= 0
      ? monthlyKwh * electricityRate
      : undefined;

  return {
    id: appliance.id,
    name: appliance.name.trim() || "Unnamed Device",
    watts,
    effectiveWatts: Math.round(effectiveWatts * 100) / 100,
    hoursPerDay,
    daysPerMonth,
    quantity,
    dutyCycle,
    dailyWh: Math.round(dailyWh * 100) / 100,
    dailyKwh: Math.round(dailyKwh * 1000) / 1000,
    monthlyKwh: Math.round(monthlyKwh * 100) / 100,
    estimatedCostMonthly:
      estimatedCostMonthly !== undefined
        ? Math.round(estimatedCostMonthly * 100) / 100
        : undefined,
    percentOfTotal: 0, // Populated by parent aggregator
    category: appliance.category,
  };
}

/**
 * Calculates total energy usage and breakdown for a list of appliances.
 */
export function calculateTotalElectricityUse(input: ElectricityUseInput): ElectricityUseResult {
  const planningDays =
    input.planningDays !== undefined && !isNaN(Number(input.planningDays)) && Number(input.planningDays) > 0
      ? Math.min(31, Math.floor(Number(input.planningDays)))
      : 30;

  const electricityRate =
    input.electricityRate !== undefined && !isNaN(Number(input.electricityRate)) && Number(input.electricityRate) >= 0
      ? Number(input.electricityRate)
      : undefined;

  const validationErrors: string[] = [];
  let hasInvalidInputs = false;

  if (!input.appliances || input.appliances.length === 0) {
    return {
      totalDailyWh: 0,
      totalDailyKwh: 0,
      totalMonthlyKwh: 0,
      planningDays,
      totalEstimatedMonthlyCost: electricityRate !== undefined ? 0 : undefined,
      electricityRate,
      applianceCount: 0,
      totalUnits: 0,
      breakdown: [],
      hasInvalidInputs: false,
      validationErrors: [],
    };
  }

  // Calculate individual appliances
  const breakdown: ApplianceEnergyResult[] = input.appliances.map((app, idx) => {
    if (app.watts < 0 || isNaN(app.watts)) {
      hasInvalidInputs = true;
      validationErrors.push(`Row ${idx + 1} (${app.name || "Device"}): Power cannot be negative.`);
    }
    if (app.hoursPerDay < 0 || app.hoursPerDay > 24 || isNaN(app.hoursPerDay)) {
      hasInvalidInputs = true;
      validationErrors.push(`Row ${idx + 1} (${app.name || "Device"}): Daily hours must be between 0 and 24.`);
    }
    return calculateApplianceEnergy(app, planningDays, electricityRate);
  });

  // Calculate aggregate totals
  const totalDailyWh = breakdown.reduce((sum, item) => sum + item.dailyWh, 0);
  const totalDailyKwh = breakdown.reduce((sum, item) => sum + item.dailyKwh, 0);
  const totalMonthlyKwh = breakdown.reduce((sum, item) => sum + item.monthlyKwh, 0);
  const totalUnits = breakdown.reduce((sum, item) => sum + item.quantity, 0);

  // Compute percentage contributions
  for (const item of breakdown) {
    item.percentOfTotal =
      totalMonthlyKwh > 0
        ? Math.round((item.monthlyKwh / totalMonthlyKwh) * 1000) / 10
        : 0;
  }

  // Find highest consumer
  let highestConsumer: ApplianceEnergyResult | undefined;
  if (breakdown.length > 0) {
    highestConsumer = [...breakdown].sort((a, b) => b.monthlyKwh - a.monthlyKwh)[0];
  }

  const totalEstimatedMonthlyCost =
    electricityRate !== undefined
      ? Math.round(totalMonthlyKwh * electricityRate * 100) / 100
      : undefined;

  return {
    totalDailyWh: Math.round(totalDailyWh * 10) / 10,
    totalDailyKwh: Math.round(totalDailyKwh * 1000) / 1000,
    totalMonthlyKwh: Math.round(totalMonthlyKwh * 100) / 100,
    planningDays,
    totalEstimatedMonthlyCost,
    electricityRate,
    applianceCount: breakdown.length,
    totalUnits,
    highestConsumer,
    breakdown,
    hasInvalidInputs,
    validationErrors,
  };
}

/**
 * Calculates estimated electricity cost from kWh and $/kWh rate.
 */
export function calculateElectricityCost(
  kwh: number,
  ratePerKwh: number
): number {
  if (isNaN(kwh) || isNaN(ratePerKwh) || kwh < 0 || ratePerKwh < 0) {
    return 0;
  }
  return Math.round(kwh * ratePerKwh * 100) / 100;
}

/**
 * Authoritative visible FAQ items for schema and UI synchronization
 */
export const ELECTRICITY_USE_FAQS = [
  {
    question: "How do I calculate electricity usage from Watts and hours?",
    answer:
      "Multiply the device wattage by the number of hours it runs per day to find daily Watt-hours (Wh). Divide that number by 1,000 to convert to kilowatt-hours (kWh): Daily kWh = (Watts × Hours) ÷ 1,000. For example, a 200-watt computer running for 8 hours uses (200 × 8) ÷ 1,000 = 1.6 kWh per day.",
  },
  {
    question: "How do I calculate kWh from appliance Watts?",
    answer:
      "Because 1 kilowatt equals 1,000 Watts, divide the appliance wattage by 1,000 to find kilowatts (kW), then multiply by operating hours: kWh = (Watts ÷ 1,000) × Hours. A 1,500-watt heater running for 2 hours equals 1.5 kW × 2 hours = 3.0 kWh.",
  },
  {
    question: "How do I calculate monthly electricity usage?",
    answer:
      "Multiply daily kilowatt-hours by the number of days in the month (typically 30 for standardized planning): Monthly kWh = Daily kWh × 30. If your home uses 30 kWh per day, your monthly consumption is 30 × 30 = 900 kWh per month.",
  },
  {
    question: "How do I calculate electricity cost from kilowatt-hours?",
    answer:
      "Multiply total kilowatt-hours by your utility company volumetric rate in dollars per kilowatt-hour: Cost ($) = kWh × ($/kWh). If your air conditioner consumes 300 kWh in July and your rate is $0.16 per kWh, the energy charge is 300 × $0.16 = $48.00.",
  },
  {
    question: "Why does an appliance not always consume its rated wattage?",
    answer:
      "Nameplate ratings represent the maximum power an appliance draws under peak operating stress. In practice, devices with variable motors, inverter compressors, or electronic power management modulate power draw based on workload and temperature, consuming less than nameplate maximums during normal operation.",
  },
  {
    question: "What is the difference between power in Watts and energy in Watt-hours?",
    answer:
      "Watts (W) and kilowatts (kW) measure power, which is the instantaneous rate of electrical energy flow. Watt-hours (Wh) and kilowatt-hours (kWh) measure energy, which is the total quantity of electricity consumed over duration. A 1,000W microwave running for 6 minutes (0.1 hours) consumes only 100 Watt-hours (0.1 kWh).",
  },
];

