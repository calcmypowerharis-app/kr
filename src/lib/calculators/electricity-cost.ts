/**
 * Pure Calculation Engine: Electricity Cost & Utility Bill Estimation
 * CalcMyPower.com
 *
 * Implements deterministic calculation functions for estimating residential
 * electric utility bills from monthly kilowatt-hour (kWh) consumption,
 * volumetric energy rates ($/kWh), fixed monthly customer charges,
 * delivery/regulatory riders, and local taxes or surcharges.
 *
 * Grounded in U.S. Energy Information Administration (EIA) Form EIA-861M standards
 * and National Association of Regulatory Utility Commissioners (NARUC) rate design principles.
 */

export interface ElectricityCostInput {
  monthlyKwh: number;
  energyRate: number; // In $/kWh, e.g. 0.16 for 16 cents/kWh
  fixedMonthlyCharge?: number; // In $, e.g. 15.00 customer charge
  additionalMonthlyCharges?: number; // In $, e.g. 18.00 delivery/environmental riders
  taxRatePercent?: number; // In %, e.g. 5.0 for 5% tax
  flatTaxAmount?: number; // In $, e.g. 8.00 municipal surcharge
  billingDays?: number; // Default 30 days
}

export interface ElectricityCostLineItem {
  name: string;
  category: "energy" | "fixed" | "rider" | "tax";
  amount: number;
  percentOfTotal: number;
  description: string;
}

export interface ElectricityCostResult {
  monthlyKwh: number;
  energyRate: number;
  energyCharge: number;
  fixedMonthlyCharge: number;
  additionalMonthlyCharges: number;
  taxAmount: number;
  totalEstimatedBill: number;
  effectiveRatePerKwh: number; // In $/kWh
  effectiveCentsPerKwh: number; // In cents/kWh
  dailyEstimatedCost: number;
  annualEstimatedCost: number;
  lineItems: ElectricityCostLineItem[];
  benchmarkComparison: {
    nationalAverageRate: number; // EIA US residential benchmark: $0.165/kWh
    nationalAverageUsageKwh: number; // EIA US residential benchmark: 900 kWh/mo
    nationalAverageMonthlyBill: number; // ~$155 to $165 typical benchmark
    differenceFromAverageDollars: number;
    differenceFromAveragePercent: number;
  };
  hasInvalidInputs: boolean;
  validationErrors: string[];
}

export interface ElectricityCostPreset {
  id: string;
  name: string;
  description: string;
  monthlyKwh: number;
  energyRate: number;
  fixedMonthlyCharge: number;
  additionalMonthlyCharges: number;
  taxRatePercent: number;
  flatTaxAmount: number;
}

/**
 * EIA Residential Benchmark Constants (U.S. National Averages)
 * Source: U.S. Energy Information Administration (EIA) Form EIA-861M / Electric Power Monthly
 */
export const EIA_US_AVERAGE_RESIDENTIAL_RATE = 0.165; // $0.165 / kWh (~16.5 cents)
export const EIA_US_AVERAGE_MONTHLY_KWH = 900; // ~900 kWh / month for average U.S. home
export const EIA_US_AVERAGE_MONTHLY_BILL = 158.0; // Illustrative benchmark base bill

/**
 * Standard Presets for Quick Comparison
 * Scenario 1 matches the Centralized Single Source of Truth Benchmark:
 * 900 kWh @ $0.16/kWh ($144.00) + $15.00 fixed + $18.00 riders + $8.00 taxes = $185.00 Total Bill ($0.2056/kWh effective)
 */
export const ELECTRICITY_COST_PRESETS: ElectricityCostPreset[] = [
  {
    id: "us-average-benchmark",
    name: "U.S. Benchmark Household (Single Source of Truth)",
    description: "Standard residential single-family home using 900 kWh per month with typical base rate, customer charge, riders, and taxes.",
    monthlyKwh: 900,
    energyRate: 0.16,
    fixedMonthlyCharge: 15.0,
    additionalMonthlyCharges: 18.0,
    taxRatePercent: 0,
    flatTaxAmount: 8.0,
  },
  {
    id: "apartment-efficient",
    name: "Apartment / Efficient Small Home",
    description: "Compact living space or energy-efficient 1-2 bedroom apartment using moderate lighting and electronics with minimal HVAC load.",
    monthlyKwh: 450,
    energyRate: 0.16,
    fixedMonthlyCharge: 12.0,
    additionalMonthlyCharges: 9.0,
    taxRatePercent: 0,
    flatTaxAmount: 4.0,
  },
  {
    id: "high-demand-cooling",
    name: "High-Demand Home (Summer AC / Electric Heat)",
    description: "Larger 3-4 bedroom suburban home with central air conditioning running heavily or all-electric resistance heating.",
    monthlyKwh: 1500,
    energyRate: 0.18,
    fixedMonthlyCharge: 18.0,
    additionalMonthlyCharges: 30.0,
    taxRatePercent: 0,
    flatTaxAmount: 14.0,
  },
  {
    id: "base-energy-only",
    name: "Base Energy Supply Only (No Fixed Fees)",
    description: "Pure commodity volumetric cost isolation for examining raw kWh rates before distribution fees and utility surcharges.",
    monthlyKwh: 900,
    energyRate: 0.16,
    fixedMonthlyCharge: 0,
    additionalMonthlyCharges: 0,
    taxRatePercent: 0,
    flatTaxAmount: 0,
  },
];

/**
 * Pure calculation function for energy charge
 */
export function calculateEnergyCharge(kwh: number, ratePerKwh: number): number {
  if (kwh <= 0 || ratePerKwh <= 0) return 0;
  return Math.round(kwh * ratePerKwh * 100) / 100;
}

/**
 * Pure calculation function for effective rate per kWh
 */
export function calculateEffectiveRate(totalBill: number, kwh: number): number {
  if (kwh <= 0 || totalBill <= 0) return 0;
  return Math.round((totalBill / kwh) * 10000) / 10000;
}

/**
 * Primary calculation engine for electricity bills
 */
export function calculateElectricityBill(input: ElectricityCostInput): ElectricityCostResult {
  const validationErrors: string[] = [];

  const rawKwh = Number(input.monthlyKwh);
  const rawRate = Number(input.energyRate);
  const rawFixed = Number(input.fixedMonthlyCharge ?? 0);
  const rawAdditional = Number(input.additionalMonthlyCharges ?? 0);
  const rawTaxPercent = Number(input.taxRatePercent ?? 0);
  const rawFlatTax = Number(input.flatTaxAmount ?? 0);
  const billingDays = Number(input.billingDays ?? 30);

  if (isNaN(rawKwh) || rawKwh < 0) {
    validationErrors.push("Monthly electricity usage (kWh) must be a non-negative number.");
  }
  if (isNaN(rawRate) || rawRate < 0) {
    validationErrors.push("Energy rate ($/kWh) must be a non-negative number.");
  }
  if (isNaN(rawFixed) || rawFixed < 0) {
    validationErrors.push("Fixed monthly customer charge must be a non-negative number.");
  }
  if (isNaN(rawAdditional) || rawAdditional < 0) {
    validationErrors.push("Additional monthly charges and riders must be a non-negative number.");
  }
  if (isNaN(rawTaxPercent) || rawTaxPercent < 0 || rawTaxPercent > 100) {
    validationErrors.push("Tax rate percentage must be between 0% and 100%.");
  }
  if (isNaN(rawFlatTax) || rawFlatTax < 0) {
    validationErrors.push("Flat tax amount must be a non-negative number.");
  }

  const hasInvalidInputs = validationErrors.length > 0;

  const monthlyKwh = Math.max(0, isNaN(rawKwh) ? 0 : rawKwh);
  const energyRate = Math.max(0, isNaN(rawRate) ? 0 : rawRate);
  const fixedMonthlyCharge = Math.max(0, isNaN(rawFixed) ? 0 : rawFixed);
  const additionalMonthlyCharges = Math.max(0, isNaN(rawAdditional) ? 0 : rawAdditional);
  const taxRatePercent = Math.min(100, Math.max(0, isNaN(rawTaxPercent) ? 0 : rawTaxPercent));
  const flatTaxAmount = Math.max(0, isNaN(rawFlatTax) ? 0 : rawFlatTax);

  // 1. Energy Charge: volumetric consumption
  const energyCharge = calculateEnergyCharge(monthlyKwh, energyRate);

  // 2. Subtotal before taxes
  const subtotalBeforeTax = Math.round((energyCharge + fixedMonthlyCharge + additionalMonthlyCharges) * 100) / 100;

  // 3. Tax Amount: percentage on subtotal plus flat tax
  const percentageTax = Math.round(subtotalBeforeTax * (taxRatePercent / 100) * 100) / 100;
  const taxAmount = Math.round((percentageTax + flatTaxAmount) * 100) / 100;

  // 4. Total Estimated Monthly Bill
  const totalEstimatedBill = Math.round((subtotalBeforeTax + taxAmount) * 100) / 100;

  // 5. Effective Billed Rate ($/kWh and cents/kWh)
  const effectiveRatePerKwh = calculateEffectiveRate(totalEstimatedBill, monthlyKwh);
  const effectiveCentsPerKwh = Math.round(effectiveRatePerKwh * 100 * 100) / 100;

  // 6. Projections
  const safeBillingDays = billingDays > 0 ? billingDays : 30;
  const dailyEstimatedCost = Math.round((totalEstimatedBill / safeBillingDays) * 100) / 100;
  const annualEstimatedCost = Math.round(totalEstimatedBill * 12 * 100) / 100;

  // 7. Line Items breakdown
  const lineItems: ElectricityCostLineItem[] = [
    {
      name: "Energy Supply & Commodity Charge",
      category: "energy",
      amount: energyCharge,
      percentOfTotal: totalEstimatedBill > 0 ? Math.round((energyCharge / totalEstimatedBill) * 1000) / 10 : 0,
      description: `${monthlyKwh.toLocaleString()} kWh @ $${energyRate.toFixed(4)}/kWh base rate`,
    },
    {
      name: "Fixed Monthly Customer Charge",
      category: "fixed",
      amount: fixedMonthlyCharge,
      percentOfTotal: totalEstimatedBill > 0 ? Math.round((fixedMonthlyCharge / totalEstimatedBill) * 1000) / 10 : 0,
      description: "Basic service and meter infrastructure fee independent of kWh used",
    },
    {
      name: "Delivery, Distribution & Regulatory Riders",
      category: "rider",
      amount: additionalMonthlyCharges,
      percentOfTotal: totalEstimatedBill > 0 ? Math.round((additionalMonthlyCharges / totalEstimatedBill) * 1000) / 10 : 0,
      description: "Grid maintenance, transmission capacity, and state mandated programs",
    },
    {
      name: "Taxes & Municipal Surcharges",
      category: "tax",
      amount: taxAmount,
      percentOfTotal: totalEstimatedBill > 0 ? Math.round((taxAmount / totalEstimatedBill) * 1000) / 10 : 0,
      description: taxRatePercent > 0 && flatTaxAmount > 0
        ? `${taxRatePercent}% plus $${flatTaxAmount.toFixed(2)} flat fee`
        : taxRatePercent > 0
        ? `${taxRatePercent}% local sales/utility tax`
        : `Flat municipal assessment of $${flatTaxAmount.toFixed(2)}`,
    },
  ];

  // 8. Benchmark comparison against EIA US National Average ($158 typical bill for 900 kWh)
  const diffDollars = Math.round((totalEstimatedBill - EIA_US_AVERAGE_MONTHLY_BILL) * 100) / 100;
  const diffPercent = EIA_US_AVERAGE_MONTHLY_BILL > 0
    ? Math.round(((totalEstimatedBill - EIA_US_AVERAGE_MONTHLY_BILL) / EIA_US_AVERAGE_MONTHLY_BILL) * 1000) / 10
    : 0;

  return {
    monthlyKwh,
    energyRate,
    energyCharge,
    fixedMonthlyCharge,
    additionalMonthlyCharges,
    taxAmount,
    totalEstimatedBill,
    effectiveRatePerKwh,
    effectiveCentsPerKwh,
    dailyEstimatedCost,
    annualEstimatedCost,
    lineItems,
    benchmarkComparison: {
      nationalAverageRate: EIA_US_AVERAGE_RESIDENTIAL_RATE,
      nationalAverageUsageKwh: EIA_US_AVERAGE_MONTHLY_KWH,
      nationalAverageMonthlyBill: EIA_US_AVERAGE_MONTHLY_BILL,
      differenceFromAverageDollars: diffDollars,
      differenceFromAveragePercent: diffPercent,
    },
    hasInvalidInputs,
    validationErrors,
  };
}

export const ELECTRICITY_COST_FAQS = [
  {
    question: "Why is my effective electricity rate higher than the rate quoted by my utility?",
    answer:
      "Electric utilities frequently market their base generation or commodity supply rate (for example, 16 cents per kWh). However, your final statement includes fixed monthly customer charges, transmission delivery fees, environmental mandates, and local taxes. Dividing your total bill by your billed kilowatt-hours produces your true effective rate, which is typically 20% to 35% higher than the nominal base rate.",
  },
  {
    question: "What is the difference between supply charges and delivery charges?",
    answer:
      "Supply charges (or generation charges) cover the cost of generating electricity at power plants. Delivery charges (or transmission and distribution charges) cover the physical infrastructure: high-voltage transmission lines, local poles, wires, transformers, and emergency repair crews needed to transport that power to your home.",
  },
  {
    question: "How much electricity does an average American home use per month?",
    answer:
      "According to the U.S. Energy Information Administration (EIA Form EIA-861M), the average U.S. residential home consumes approximately 890 to 900 kilowatt-hours (kWh) per month, resulting in an average monthly electric bill of roughly $155 to $165, depending on state electricity rates and climate conditions.",
  },
  {
    question: "Will installing solar panels eliminate my entire electric bill?",
    answer:
      "No. Even if your solar system generates 100% of the kilowatt-hours you consume over a month, most electric utilities still require you to pay a mandatory monthly fixed customer service charge (typically $10 to $25 per month) to remain interconnected to the electrical grid for nighttime and backup reliability.",
  },
  {
    question: "How do tiered or inverted block rate tariffs work?",
    answer:
      "Under a tiered rate structure, your monthly usage is divided into blocks. Tier 1 covers an essential baseline allowance (for example, up to 400 kWh) billed at a lower rate. Consumption exceeding that baseline enters Tier 2 or Tier 3, where every additional kilowatt-hour is billed at an increasingly higher rate to encourage energy conservation.",
  },
  {
    question: "How can I find out how many kWh specific appliances in my house use?",
    answer:
      "You can audit your appliances using our Electricity Use Calculator, which calculates daily and monthly Watt-hours and kilowatt-hours based on appliance nameplate wattage, hours of operation, and compressor duty cycles.",
  },
];
