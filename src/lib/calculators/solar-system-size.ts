/**
 * Solar System Size Calculator Engine
 * Pure TypeScript - Decoupled from React, DOM, and UI
 * CalcMyPower.com
 *
 * Mathematical Sizing Logic & Formulation:
 *
 * Step 1: Daily Energy Consumption
 *   E_daily (kWh/day) = monthly_kwh / days_in_month
 *   (Default days_in_month = 30 for standard billing cycle)
 *
 * Step 2: Target Daily Solar Energy
 *   E_target (kWh/day) = E_daily * (solar_offset_percent / 100)
 *
 * Step 3: Required PV Array Nameplate Capacity
 *   P_array_kW = E_target / (peak_sun_hours * performance_ratio)
 *   P_array_W = P_array_kW * 1000
 *
 *   Where:
 *   - peak_sun_hours: Average daily solar insolation in equivalent hours at 1,000 W/m² (NREL NSRDB standard)
 *   - performance_ratio: System balance-of-system derate factor (default 0.78, accounting for temperature derating,
 *     inverter conversion, wiring resistance, soiling, and module mismatch)
 *
 * Step 4: Approximate Panel Count
 *   raw_panel_count = P_array_W / panel_wattage
 *   rounded_panel_count = Math.ceil(raw_panel_count)
 *
 * Step 5: Actual Installed Nameplate Capacity & Production
 *   actual_array_kW = (rounded_panel_count * panel_wattage) / 1000
 *   est_daily_production_kWh = actual_array_kW * peak_sun_hours * performance_ratio
 *   est_annual_production_kWh = est_daily_production_kWh * 365
 *   est_roof_sqft_modules = rounded_panel_count * 21.0 (approx 21 sq ft per modern 400W residential module)
 *   est_roof_sqft_total = rounded_panel_count * 25.0 (includes mounting spacing and perimeter fire-code setbacks)
 */

export interface SolarSystemSizeInputs {
  monthlyKwh: number; // e.g. 900 kWh/month
  daysInMonth?: number; // default 30
  solarOffsetPercent?: number; // default 100%
  peakSunHours?: number; // default 4.5 hours/day
  performanceRatioPercent?: number; // default 78% (0.78 derate factor)
  panelWattage?: number; // default 400 W
}

export interface PanelComparisonRow {
  panelWattage: number;
  label: string;
  rawCount: number;
  roundedCount: number;
  installedKw: number;
  estimatedRoofSqFt: number;
  isCurrentSelection: boolean;
}

export interface SolarSystemSizeOutputs {
  // Normalized Inputs
  monthlyKwh: number;
  daysInMonth: number;
  dailyEnergyKwh: number;
  solarOffsetPercent: number;
  targetDailySolarKwh: number;
  targetAnnualSolarKwh: number;
  peakSunHours: number;
  performanceRatio: number;
  panelWattage: number;

  // Primary Sizing Results
  systemSizeKw: number; // Required PV array DC nameplate rating in kW
  systemSizeWatts: number; // Required PV array DC nameplate rating in Watts
  rawPanelCount: number; // Exact unrounded panel count
  roundedPanelCount: number; // Approximate panel count (rounded up)
  actualArraySizeKw: number; // Installed rating with rounded panels

  // Secondary Production & Spatial Estimates
  estimatedDailyProductionKwh: number;
  estimatedAnnualProductionKwh: number;
  estimatedRoofAreaModulesSqFt: number; // Net module footprint (~21 sq ft / module)
  estimatedRoofAreaTotalSqFt: number; // Gross footprint with setbacks (~25 sq ft / module)

  // Comparison Across Common Panel Wattages
  comparisonRows: PanelComparisonRow[];

  // Validation
  isValid: boolean;
  errors: string[];
}

export interface ConsumptionPreset {
  id: string;
  label: string;
  monthlyKwh: number;
  dailyKwh: number;
  description: string;
}

export const CONSUMPTION_PRESETS: ConsumptionPreset[] = [
  {
    id: "apartment-small",
    label: "Apartment / Efficient Small Home",
    monthlyKwh: 500,
    dailyKwh: 16.7,
    description: "Compact 1-2 bedroom residence with energy-efficient appliances and modest air conditioning.",
  },
  {
    id: "us-average",
    label: "U.S. National Average Home",
    monthlyKwh: 900,
    dailyKwh: 30.0,
    description: "Standard American single-family household baseline according to U.S. EIA residential utility data (~860-900 kWh/mo).",
  },
  {
    id: "suburban-moderate",
    label: "Medium-Large Suburban Home",
    monthlyKwh: 1200,
    dailyKwh: 40.0,
    description: "Multi-bedroom household with standard central heat pump / AC, electric water heating, and daily laundry.",
  },
  {
    id: "all-electric-ev",
    label: "Large All-Electric / EV Charging",
    monthlyKwh: 1800,
    dailyKwh: 60.0,
    description: "Spacious residence with heavy electric HVAC cooling, dedicated EV Level 2 charger, and electric pool/spa pump.",
  },
];

export interface RegionalSunPreset {
  id: string;
  label: string;
  peakSunHours: number;
  regionDescription: string;
}

export const REGIONAL_SUN_PRESETS: RegionalSunPreset[] = [
  {
    id: "north",
    label: "3.5 PSH (Northern US / PNW / Great Lakes)",
    peakSunHours: 3.5,
    regionDescription: "Pacific Northwest, Upper Midwest, Northern New England, Alaska. High seasonal winter variance.",
  },
  {
    id: "central",
    label: "4.0 PSH (Midwest / Central / Mid-Atlantic)",
    peakSunHours: 4.0,
    regionDescription: "Ohio Valley, Mid-Atlantic, Northern Plains, Central Appalachia.",
  },
  {
    id: "national-avg",
    label: "4.5 PSH (U.S. National Planning Average)",
    peakSunHours: 4.5,
    regionDescription: "Representative U.S. contiguous annual baseline for preliminary solar sizing.",
  },
  {
    id: "southeast",
    label: "5.0 PSH (Southeast / California Central)",
    peakSunHours: 5.0,
    regionDescription: "Carolinas, Georgia, Alabama, Mississippi, California Central Valley, Southern Plains.",
  },
  {
    id: "sunbelt",
    label: "5.5 PSH (Texas / Florida / Sun Belt)",
    peakSunHours: 5.5,
    regionDescription: "Florida peninsula, Gulf Coast, Southern Texas, New Mexico highlands.",
  },
  {
    id: "southwest",
    label: "6.0 PSH (Desert Southwest: AZ, NV, SoCal)",
    peakSunHours: 6.0,
    regionDescription: "Arizona, Nevada, Southern California inland, New Mexico desert. Maximum US annual solar irradiance.",
  },
];

export const PANEL_WATTAGE_PRESETS = [
  { value: 350, label: "350W (Compact / Older Standard)" },
  { value: 375, label: "375W (Residential Mid-Tier)" },
  { value: 400, label: "400W (Modern Residential Standard)" },
  { value: 420, label: "420W (High-Efficiency Mono PERC/TOPCon)" },
  { value: 450, label: "450W (High-Output / Commercial Tier)" },
];

export const COMPARISON_PANEL_WATTS = [330, 350, 375, 400, 420, 450];

export const SOLAR_SYSTEM_SIZE_DEFAULTS: SolarSystemSizeInputs = {
  monthlyKwh: 900,
  daysInMonth: 30,
  solarOffsetPercent: 100,
  peakSunHours: 4.5,
  performanceRatioPercent: 78,
  panelWattage: 400,
};

/**
 * Validates inputs for solar system size calculation.
 */
export function validateSolarSystemSizeInputs(inputs: SolarSystemSizeInputs): string[] {
  const errors: string[] = [];

  if (typeof inputs.monthlyKwh !== "number" || isNaN(inputs.monthlyKwh) || inputs.monthlyKwh <= 0) {
    errors.push("Monthly electricity consumption must be a positive number greater than 0 kWh.");
  } else if (inputs.monthlyKwh > 50000) {
    errors.push("Monthly electricity consumption must be 50,000 kWh or less for residential planning.");
  }

  if (
    inputs.daysInMonth !== undefined &&
    (typeof inputs.daysInMonth !== "number" || isNaN(inputs.daysInMonth) || inputs.daysInMonth < 20 || inputs.daysInMonth > 35)
  ) {
    errors.push("Days in billing month must be between 20 and 35 days.");
  }

  if (
    inputs.solarOffsetPercent !== undefined &&
    (typeof inputs.solarOffsetPercent !== "number" || isNaN(inputs.solarOffsetPercent) || inputs.solarOffsetPercent <= 0 || inputs.solarOffsetPercent > 300)
  ) {
    errors.push("Solar offset target must be between 1% and 300%.");
  }

  if (
    inputs.peakSunHours !== undefined &&
    (typeof inputs.peakSunHours !== "number" || isNaN(inputs.peakSunHours) || inputs.peakSunHours <= 0 || inputs.peakSunHours > 12)
  ) {
    errors.push("Peak sun hours must be a positive number between 0.5 and 12 hours per day.");
  }

  if (
    inputs.performanceRatioPercent !== undefined &&
    (typeof inputs.performanceRatioPercent !== "number" || isNaN(inputs.performanceRatioPercent) || inputs.performanceRatioPercent < 50 || inputs.performanceRatioPercent > 95)
  ) {
    errors.push("System performance ratio must be between 50% and 95%.");
  }

  if (
    inputs.panelWattage !== undefined &&
    (typeof inputs.panelWattage !== "number" || isNaN(inputs.panelWattage) || inputs.panelWattage < 150 || inputs.panelWattage > 800)
  ) {
    errors.push("Panel rated wattage must be between 150W and 800W.");
  }

  return errors;
}

/**
 * Pure calculation function for solar system sizing.
 */
export function calculateSolarSystemSize(inputs: SolarSystemSizeInputs): SolarSystemSizeOutputs {
  const errors = validateSolarSystemSizeInputs(inputs);
  const isValid = errors.length === 0;

  const monthlyKwh = inputs.monthlyKwh || 0;
  const daysInMonth = inputs.daysInMonth ?? SOLAR_SYSTEM_SIZE_DEFAULTS.daysInMonth!;
  const solarOffsetPercent = inputs.solarOffsetPercent ?? SOLAR_SYSTEM_SIZE_DEFAULTS.solarOffsetPercent!;
  const peakSunHours = inputs.peakSunHours ?? SOLAR_SYSTEM_SIZE_DEFAULTS.peakSunHours!;
  const performanceRatioPercent = inputs.performanceRatioPercent ?? SOLAR_SYSTEM_SIZE_DEFAULTS.performanceRatioPercent!;
  const panelWattage = inputs.panelWattage ?? SOLAR_SYSTEM_SIZE_DEFAULTS.panelWattage!;

  if (!isValid) {
    return {
      monthlyKwh,
      daysInMonth,
      dailyEnergyKwh: 0,
      solarOffsetPercent,
      targetDailySolarKwh: 0,
      targetAnnualSolarKwh: 0,
      peakSunHours,
      performanceRatio: performanceRatioPercent / 100,
      panelWattage,
      systemSizeKw: 0,
      systemSizeWatts: 0,
      rawPanelCount: 0,
      roundedPanelCount: 0,
      actualArraySizeKw: 0,
      estimatedDailyProductionKwh: 0,
      estimatedAnnualProductionKwh: 0,
      estimatedRoofAreaModulesSqFt: 0,
      estimatedRoofAreaTotalSqFt: 0,
      comparisonRows: [],
      isValid: false,
      errors,
    };
  }

  // Step 1: Daily Energy Consumption
  const dailyEnergyKwh = monthlyKwh / daysInMonth;

  // Step 2: Target Daily & Annual Solar Energy
  const offsetFraction = solarOffsetPercent / 100;
  const targetDailySolarKwh = dailyEnergyKwh * offsetFraction;
  const targetAnnualSolarKwh = targetDailySolarKwh * 365;

  // Step 3: Required PV Array Capacity
  const performanceRatio = performanceRatioPercent / 100;
  const dailyYieldPerKw = peakSunHours * performanceRatio; // kWh produced per kW DC per day
  const systemSizeKw = targetDailySolarKwh / dailyYieldPerKw;
  const systemSizeWatts = systemSizeKw * 1000;

  // Step 4: Approximate Panel Count
  const rawPanelCount = systemSizeWatts / panelWattage;
  const roundedPanelCount = Math.ceil(rawPanelCount);

  // Step 5: Installed Array Capacity & Production Estimates
  const actualArraySizeKw = (roundedPanelCount * panelWattage) / 1000;
  const estimatedDailyProductionKwh = actualArraySizeKw * dailyYieldPerKw;
  const estimatedAnnualProductionKwh = estimatedDailyProductionKwh * 365;

  // Step 6: Estimated Roof Spatial Requirements
  // Standard modern 400W residential module is ~68" x 44" = 20.77 sq ft (~21 sq ft)
  const estimatedRoofAreaModulesSqFt = Math.round(roundedPanelCount * 21.0);
  // Gross footprint with inter-row spacing and fire setbacks (~25 sq ft per module)
  const estimatedRoofAreaTotalSqFt = Math.round(roundedPanelCount * 25.0);

  // Comparison Across Common Panel Wattages
  const comparisonRows: PanelComparisonRow[] = COMPARISON_PANEL_WATTS.map((watts) => {
    const raw = systemSizeWatts / watts;
    const rounded = Math.ceil(raw);
    const installed = (rounded * watts) / 1000;
    const roofSqFt = Math.round(rounded * 21.0);
    return {
      panelWattage: watts,
      label: `${watts}W Module`,
      rawCount: raw,
      roundedCount: rounded,
      installedKw: installed,
      estimatedRoofSqFt: roofSqFt,
      isCurrentSelection: watts === panelWattage,
    };
  });

  return {
    monthlyKwh,
    daysInMonth,
    dailyEnergyKwh,
    solarOffsetPercent,
    targetDailySolarKwh,
    targetAnnualSolarKwh,
    peakSunHours,
    performanceRatio,
    panelWattage,
    systemSizeKw,
    systemSizeWatts,
    rawPanelCount,
    roundedPanelCount,
    actualArraySizeKw,
    estimatedDailyProductionKwh,
    estimatedAnnualProductionKwh,
    estimatedRoofAreaModulesSqFt,
    estimatedRoofAreaTotalSqFt,
    comparisonRows,
    isValid: true,
    errors: [],
  };
}

/**
 * Formatting helpers for UI presentation.
 */
export function formatKw(val: number): string {
  return val.toFixed(2);
}

export function formatKwhNumber(val: number): string {
  return val >= 100 ? Math.round(val).toLocaleString("en-US") : val.toFixed(1);
}

export function formatWattsNumber(val: number): string {
  return Math.round(val).toLocaleString("en-US");
}

export interface SolarSystemSizeFaqItem {
  question: string;
  shortAnswer: string;
  fullExplanation: string;
}

export const SOLAR_SYSTEM_SIZE_FAQS: SolarSystemSizeFaqItem[] = [
  {
    question: "How many solar panels do I need to power a house?",
    shortAnswer:
      "Most average American homes require between 18 and 26 solar panels (rated at 400 Watts each) to offset 100% of their annual electricity consumption.",
    fullExplanation:
      "According to the U.S. Energy Information Administration (EIA), the average U.S. household consumes approximately 860 to 900 kWh of electricity per month, or about 30 kWh per day. In a region receiving an average of 4.5 peak sun hours per day with a standard 78% system performance factor, powering this average home requires an 8.55 kW DC solar array, which equates to approximately 22 modern 400-Watt panels.",
  },
  {
    question: "How do you calculate solar system size?",
    shortAnswer:
      "Divide your target daily electricity consumption in kilowatt-hours by the product of your local peak sun hours and your system performance ratio: System Size (kW) = Daily kWh ÷ (Peak Sun Hours × Performance Ratio).",
    fullExplanation:
      "To calculate system size, first determine your average daily electricity usage from your utility bill (Monthly kWh divided by 30 days). Multiply this by your target offset fraction. Then divide that daily energy requirement by your location's daily peak sun hours multiplied by a system derate factor (typically 0.75 to 0.82 to account for real-world inverter, temperature, and wiring losses). The resulting figure represents the required DC nameplate solar capacity in kilowatts.",
  },
  {
    question: "What are peak sun hours and how do they differ from daylight hours?",
    shortAnswer:
      "A peak sun hour is not the total time the sun is in the sky, but the equivalent number of hours per day when solar irradiance averages 1,000 Watts per square meter.",
    fullExplanation:
      "Solar panels produce varying amounts of power throughout the day as the sun rises, peaks at solar noon, and sets. To standardize solar harvest calculations across different latitudes and climates, solar engineers convert total daily solar radiation into 'peak sun hours.' One peak sun hour represents 1,000 W/m² of standard sunlight for one full hour (1 kWh/m²). Most areas in the continental United States receive between 3.5 and 6.0 peak sun hours per day on an annualized basis.",
  },
  {
    question: "How does solar panel wattage affect the number of panels needed?",
    shortAnswer:
      "Higher-wattage panels generate more energy per square foot, meaning fewer total panels are required to achieve the exact same system capacity.",
    fullExplanation:
      "Because solar array capacity is measured in total kilowatts, panel wattage determines the physical module count needed to reach that target. For example, an 8.55 kW (8,550 Watt) solar array requires approximately 25 older 350-Watt panels, 22 modern 400-Watt panels, or only 19 high-output 450-Watt commercial/residential panels. Using higher-wattage panels is especially advantageous on compact roofs with limited unobstructed surface area.",
  },
  {
    question: "How much roof space do solar panels require?",
    shortAnswer:
      "A typical modern 400-Watt residential solar panel occupies approximately 21 square feet of module area, or about 25 square feet including required inter-row spacing and fire-code perimeter setbacks.",
    fullExplanation:
      "A standard residential 54-cell or 108-half-cell photovoltaic module measures roughly 68 inches long by 44 inches wide, creating a net surface area of approximately 20.8 square feet. A typical 22-panel residential system requires approximately 460 square feet of net module space, or 550 square feet of total unshaded south- or west-facing roof space once building code setbacks from roof ridges, eaves, and valleys are incorporated.",
  },
  {
    question: "What is a solar system performance ratio or derate factor?",
    shortAnswer:
      "The system performance ratio accounts for real-world electrical and thermal losses that reduce solar production below laboratory nameplate ratings, typically averaging 75% to 82%.",
    fullExplanation:
      "Solar panels are rated at Standard Test Conditions (STC) in a laboratory at a cell temperature of 25°C (77°F). Under real-world rooftop conditions, panels heat up in direct sunlight (reducing voltage), inverters lose 3% to 5% converting DC electricity to AC power, conductors exhibit internal resistance voltage drop, and dust, soiling, and module mismatch create further minor losses. NREL's PVWatts model standardizes these factors into an overall performance ratio, commonly centered around 78% for modern residential installations.",
  },
  {
    question: "Why is a solar sizing calculator only an educational planning estimate?",
    shortAnswer:
      "A calculator provides a preliminary mathematical baseline; it does not model hourly weather variations, specific roof tilt and azimuth, tree shading, or physical electrical service panel capacity.",
    fullExplanation:
      "A simple formula based on average monthly utility consumption and regional peak sun hours establishes an approximate target array size. However, actual rooftop solar production depends heavily on exact roof compass orientation (azimuth), roof pitch (tilt angle), microclimate cloud cover, tree shading, electrical service panel busbar ampacity (governed by NEC 705.12), and local utility net energy metering policies. A licensed professional solar installer conducts physical site surveys and detailed irradiance modeling prior to final engineering approval.",
  },
];
