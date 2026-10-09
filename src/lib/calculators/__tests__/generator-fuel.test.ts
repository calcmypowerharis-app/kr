import { describe, it, expect } from 'vitest';
import { calculateGeneratorFuel, GeneratorFuelInputs } from '../generator-fuel';

describe('calculateGeneratorFuel', () => {
  it('calculates correctly for a preset (Honda EU2200i @ 25%)', () => {
    const inputs: GeneratorFuelInputs = {
      calculationMode: 'preset',
      presetId: 'honda_eu2200i_gas_25',
      fuelPricePerUnit: 3.50, // $3.50 per gallon
    };

    const result = calculateGeneratorFuel(inputs);
    expect(result.fuelUnit).toBe('gallons');
    expect(result.fuelType).toBe('gasoline');
    expect(result.consumptionPerHour).toBe(0.12);
    expect(result.fuelFor4Hours).toBe(0.48);
    expect(result.fuelFor8Hours).toBe(0.96);
    expect(result.fuelFor24Hours).toBe(2.88);
    expect(result.costPerHour).toBeCloseTo(0.42);
    expect(result.costFor24Hours).toBeCloseTo(10.08);
    expect(result.tankSize).toBe(0.95);
    expect(result.tankRuntimeHours).toBeCloseTo(0.95 / 0.12);
  });

  it('calculates correctly for a custom input', () => {
    const inputs: GeneratorFuelInputs = {
      calculationMode: 'custom',
      customFuelType: 'propane',
      customFuelUnit: 'lbs',
      customConsumptionRate: 1.5,
      customTankSize: 20,
      fuelPricePerUnit: 1.20, // $1.20 per lb
    };

    const result = calculateGeneratorFuel(inputs);
    expect(result.fuelUnit).toBe('lbs');
    expect(result.fuelType).toBe('propane');
    expect(result.consumptionPerHour).toBe(1.5);
    expect(result.fuelFor4Hours).toBe(6);
    expect(result.costPerHour).toBeCloseTo(1.80);
    expect(result.tankSize).toBe(20);
    expect(result.tankRuntimeHours).toBeCloseTo(20 / 1.5);
  });

  it('handles custom input without tank size', () => {
    const inputs: GeneratorFuelInputs = {
      calculationMode: 'custom',
      customFuelType: 'natural_gas',
      customFuelUnit: 'ccf',
      customConsumptionRate: 2,
      fuelPricePerUnit: 1.50,
    };

    const result = calculateGeneratorFuel(inputs);
    expect(result.tankSize).toBeNull();
    expect(result.tankRuntimeHours).toBeNull();
  });

  it('handles zero consumption (infinite runtime)', () => {
    const inputs: GeneratorFuelInputs = {
      calculationMode: 'custom',
      customFuelType: 'gasoline',
      customFuelUnit: 'gallons',
      customConsumptionRate: 0,
      customTankSize: 5,
      fuelPricePerUnit: 3.00,
    };

    const result = calculateGeneratorFuel(inputs);
    expect(result.tankRuntimeHours).toBe(Infinity);
    expect(result.costPerHour).toBe(0);
  });

  it('throws error for negative fuel price', () => {
    const inputs: GeneratorFuelInputs = {
      calculationMode: 'preset',
      presetId: 'honda_eu2200i_gas_25',
      fuelPricePerUnit: -1,
    };

    expect(() => calculateGeneratorFuel(inputs)).toThrow('negative');
  });

  it('throws error for invalid preset', () => {
    const inputs: GeneratorFuelInputs = {
      calculationMode: 'preset',
      presetId: 'non_existent_preset',
      fuelPricePerUnit: 3,
    };

    expect(() => calculateGeneratorFuel(inputs)).toThrow('Preset not found');
  });

  it('throws error for missing custom fields in custom mode', () => {
    const inputs = {
      calculationMode: 'custom' as const,
      fuelPricePerUnit: 3,
    };

    expect(() => calculateGeneratorFuel(inputs)).toThrow('Custom mode requires');
  });

  it('throws error for negative custom consumption rate', () => {
    const inputs: GeneratorFuelInputs = {
      calculationMode: 'custom',
      customFuelType: 'gasoline',
      customFuelUnit: 'gallons',
      customConsumptionRate: -1,
      fuelPricePerUnit: 3,
    };

    expect(() => calculateGeneratorFuel(inputs)).toThrow('positive');
  });

  it('throws error for negative custom tank size', () => {
    const inputs: GeneratorFuelInputs = {
      calculationMode: 'custom',
      customFuelType: 'gasoline',
      customFuelUnit: 'gallons',
      customConsumptionRate: 0.5,
      customTankSize: -5,
      fuelPricePerUnit: 3,
    };

    expect(() => calculateGeneratorFuel(inputs)).toThrow('Tank capacity cannot be negative');
  });

  it('calculates correctly for diesel fuel', () => {
    const inputs: GeneratorFuelInputs = {
      calculationMode: 'custom',
      customFuelType: 'diesel',
      customFuelUnit: 'gallons',
      customConsumptionRate: 0.6,
      customTankSize: 10,
      fuelPricePerUnit: 4.00,
    };

    const result = calculateGeneratorFuel(inputs);
    expect(result.fuelType).toBe('diesel');
    expect(result.fuelUnit).toBe('gallons');
    expect(result.costPerHour).toBeCloseTo(2.40);
    expect(result.tankRuntimeHours).toBeCloseTo(10 / 0.6);
  });
});

