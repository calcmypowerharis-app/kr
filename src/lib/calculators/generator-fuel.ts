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
    question: "How much gas does a 5000 watt generator use?",
    answer:
      "A typical 5000W generator running at 50% load consumes about 0.5 to 0.75 gallons of gasoline per hour. Over a 24-hour period, it will use roughly 12 to 18 gallons, depending on the exact load and generator model efficiency.",
  },
  {
    question: "Does a generator use more fuel if I plug more things into it?",
    answer:
      "Yes. Generator fuel consumption is directly tied to the electrical load. An inverter generator will automatically idle down and use significantly less fuel when running a light load (like a TV and lights) compared to running a heavy load (like an air conditioner or space heater).",
  },
  {
    question: "Is propane or gasoline cheaper to run in a dual-fuel generator?",
    answer:
      "Propane is generally less energy-dense than gasoline, so a generator will consume more gallons (or pounds) of propane per hour to produce the same wattage. However, propane rarely goes bad and won't gum up the carburetor during storage. To determine which is cheaper to run, you must compare local propane prices per pound against local gasoline prices per gallon.",
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
