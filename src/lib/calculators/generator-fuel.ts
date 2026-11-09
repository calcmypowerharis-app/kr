/**
 * Generator Fuel Consumption Calculator Logic
 * Pure TypeScript - No UI or DOM dependencies
 */

export interface GeneratorFuelFaqItem {
  question: string;
  answer: string;
}

export const GENERATOR_FUEL_FAQS: GeneratorFuelFaqItem[] = [
  {
    question: "How much gas does a 5000 watt generator use per hour?",
    answer:
      "At 50% load, a 5000W generator burns 0.50 to 0.75 gallons of gasoline per hour. Under continuous 24-hour operation, it consumes roughly 12 to 18 gallons, depending on engine displacement and whether it uses an inverter throttle.",
  },
  {
    question: "How much fuel does a generator use at 25%, 50%, 75%, and 100% load?",
    answer:
      "Fuel consumption scales non-linearly with load. A 7500W generator burns about 0.45 GPH at 25% load, 0.70 GPH at 50% load, 0.95 GPH at 75% load, and 1.25 GPH at full 100% load. Open-frame models burn more fuel at light loads than inverters.",
  },
  {
    question: "Why does a dual-fuel generator burn more propane than gasoline?",
    answer:
      "Propane contains approximately 91,500 BTU per gallon compared to 114,000 BTU per gallon for gasoline. Because propane has roughly 20% lower volumetric energy density, the engine must consume about 25% to 30% more gallons of propane to deliver identical electrical kilowatt-hours.",
  },
  {
    question: "How much natural gas does a 22kW whole-house standby generator consume?",
    answer:
      "A 22kW standby generator consumes approximately 150 to 180 cubic feet (1.5 to 1.8 CCF) per hour at 25% load, and 240 to 280 cubic feet (2.4 to 2.8 CCF) per hour at 50% load. At full load, consumption reaches 380 to 420 cubic feet per hour.",
  },
  {
    question: "What size propane tank do I need for a 72-hour power outage?",
    answer:
      "For a 7,500W dual-fuel generator running 12 hours daily at 50% load, you need about 25 gallons (105 pounds) of propane. For a 22kW standby generator running intermittently, a 250-gallon or 500-gallon on-site tank is required to provide sufficient liquid volume and vaporization surface area.",
  },
  {
    question: "How does cold winter weather affect generator fuel consumption?",
    answer:
      "Freezing temperatures increase fuel consumption by 10% to 20%. Cold air is denser, requiring extra fuel during startup and choke cycles. In extreme cold below 0°F, propane tank vapor pressure drops dramatically, which can starve large generators unless tanks are sufficiently filled or heated.",
  },
  {
    question: "How much does elevation derate generator power output and fuel efficiency?",
    answer:
      "Naturally aspirated generator engines lose 3.5% of rated power for every 1,000 feet above sea level. Above 2,500 feet, you must install a high-altitude carburetor main jet. Without high-altitude jetting, the engine runs overly rich, fouling spark plugs and wasting fuel.",
  },
  {
    question: "What are the NFPA 110 fuel reserve requirements for emergency generators?",
    answer:
      "NFPA 110 mandates that emergency power supply fuel tanks must store at least 133% of the required operational class duration. For a Class 48 system, the tank must hold 64 hours of continuous fuel at anticipated load, accounting for unpumpable bottom sediment.",
  },
  {
    question: "How long can gasoline and diesel be stored before going bad?",
    answer:
      "Untreated E10 gasoline degrades within 30 to 60 days due to oxidation and ethanol moisture absorption. Adding fuel stabilizer extends gasoline life to 12 to 24 months. Diesel fuel remains stable for 12 to 24 months if kept dry and treated with biocide.",
  },
  {
    question: "Does activating Eco-Mode noticeably reduce generator fuel consumption?",
    answer:
      "Yes. Eco-Mode throttles down engine speed from 3,600 RPM to 2,000 to 2,600 RPM when electrical loads are light. On portable inverter generators, Eco-Mode cuts fuel consumption by 25% to 40% during light loads, such as overnight refrigerator cycling and phone charging.",
  },
  {
    question: "How often should engine oil be checked and changed during extended outages?",
    answer:
      "Check engine oil every 24 operating hours and change it every 50 to 100 hours. Most small portable generator engines lack pressurized oil filters and hold less than one quart of oil. Running low on oil triggers low-oil shutdown or catastrophic engine seizure.",
  },
  {
    question: "What is wet stacking in diesel generators, and how does light loading cause it?",
    answer:
      "Wet stacking occurs when a diesel engine operates below 30% rated load for extended periods. Low in-cylinder combustion temperatures prevent fuel from burning completely. Unburned fuel and carbon accumulate in the exhaust manifold and turbocharger, degrading performance and increasing fuel waste.",
  },
];

export type FuelType = 'gasoline' | 'propane' | 'diesel' | 'natural_gas';
export type FuelUnit = 'gallons' | 'lbs' | 'ccf';

export interface GeneratorPreset {
  id: string;
  name: string;
  fuelType: FuelType;
  fuelUnit: FuelUnit;
  consumptionRate: number; // units per hour
  tankSize?: number; // capacity in fuelUnits
  source: string;
  sourceUrl?: string;
}

export const GENERATOR_FUEL_PRESETS: GeneratorPreset[] = [
  {
    id: 'honda_eu2200i_gas_25',
    name: 'Honda EU2200i (2200W) - 25% Load',
    fuelType: 'gasoline',
    fuelUnit: 'gallons',
    consumptionRate: 0.12,
    tankSize: 0.95,
    source: 'Honda Power Equipment EU2200i Specs (Calculated: 0.95 gal / 8.1 hrs)',
    sourceUrl: 'https://powerequipment.honda.com/generators/models/eu2200i'
  },
  {
    id: 'honda_eu2200i_gas_100',
    name: 'Honda EU2200i (2200W) - 100% Load',
    fuelType: 'gasoline',
    fuelUnit: 'gallons',
    consumptionRate: 0.30,
    tankSize: 0.95,
    source: 'Honda Power Equipment EU2200i Specs (Calculated: 0.95 gal / 3.2 hrs)',
    sourceUrl: 'https://powerequipment.honda.com/generators/models/eu2200i'
  },
  {
    id: 'champion_3400_propane_25',
    name: 'Champion 3400W Dual Fuel - 25% Load (Propane)',
    fuelType: 'propane',
    fuelUnit: 'lbs',
    consumptionRate: 1.38,
    tankSize: 20,
    source: 'Champion Model 100396 Specs (Calculated: 20 lbs / 14.5 hrs)',
    sourceUrl: 'https://www.championpowerequipment.com/product/100396-3400w-electric-start-dual-fuel-inverter/'
  }
];

export interface GeneratorFuelInputs {
  calculationMode: 'preset' | 'custom';
  presetId?: string;
  customFuelType?: FuelType;
  customFuelUnit?: FuelUnit;
  customConsumptionRate?: number; // per hour
  customTankSize?: number;
  fuelPricePerUnit: number;
}

export interface GeneratorFuelOutputs {
  fuelUnit: FuelUnit;
  fuelType: FuelType;
  consumptionPerHour: number;
  fuelFor4Hours: number;
  fuelFor8Hours: number;
  fuelFor12Hours: number;
  fuelFor24Hours: number;
  costPerHour: number;
  costFor24Hours: number;
  tankSize: number | null;
  tankRuntimeHours: number | null;
}

export function calculateGeneratorFuel(inputs: GeneratorFuelInputs): GeneratorFuelOutputs {
  if (inputs.fuelPricePerUnit < 0) {
    throw new Error("Fuel price cannot be negative");
  }

  let consumptionRate = 0;
  let unit: FuelUnit = 'gallons';
  let type: FuelType = 'gasoline';
  let tank = null;

  if (inputs.calculationMode === 'preset') {
    if (!inputs.presetId) {
      throw new Error("Preset mode requires a presetId");
    }
    const preset = GENERATOR_FUEL_PRESETS.find(p => p.id === inputs.presetId);
    if (!preset) {
      throw new Error(`Preset not found: ${inputs.presetId}`);
    }
    consumptionRate = preset.consumptionRate;
    unit = preset.fuelUnit;
    type = preset.fuelType;
    if (preset.tankSize) {
      tank = preset.tankSize;
    }
  } else {
    if (inputs.customConsumptionRate === undefined || inputs.customConsumptionRate < 0) {
      throw new Error("Custom mode requires a positive customConsumptionRate");
    }
    if (!inputs.customFuelUnit || !inputs.customFuelType) {
      throw new Error("Custom mode requires customFuelUnit and customFuelType");
    }
    consumptionRate = inputs.customConsumptionRate;
    unit = inputs.customFuelUnit;
    type = inputs.customFuelType;
    if (inputs.customTankSize !== undefined && inputs.customTankSize < 0) {
      throw new Error("Tank capacity cannot be negative");
    }
    if (inputs.customTankSize !== undefined && inputs.customTankSize > 0) {
      tank = inputs.customTankSize;
    }
  }

  // Handle zero division
  let tankRuntime = null;
  if (tank !== null && consumptionRate > 0) {
    tankRuntime = tank / consumptionRate;
  } else if (tank !== null && consumptionRate === 0) {
    tankRuntime = Infinity;
  }

  return {
    fuelUnit: unit,
    fuelType: type,
    consumptionPerHour: consumptionRate,
    fuelFor4Hours: consumptionRate * 4,
    fuelFor8Hours: consumptionRate * 8,
    fuelFor12Hours: consumptionRate * 12,
    fuelFor24Hours: consumptionRate * 24,
    costPerHour: consumptionRate * inputs.fuelPricePerUnit,
    costFor24Hours: (consumptionRate * 24) * inputs.fuelPricePerUnit,
    tankSize: tank,
    tankRuntimeHours: tankRuntime
  };
}
