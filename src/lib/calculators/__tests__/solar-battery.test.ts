import { describe, expect, it } from "vitest";
import {
  calculateSolarBattery,
  validateSolarBatteryInputs,
  SOLAR_BATTERY_DEFAULTS,
  DAILY_USAGE_PRESETS,
  CHEMISTRY_DEFAULTS,
  formatKwh,
  formatWh,
  formatAh,
  formatWatts,
} from "../solar-battery";

describe("Solar Battery Calculator Engine", () => {
  describe("Approved Benchmark Sizing Scenarios", () => {
    it("Scenario 1: 1200 Wh daily load, 1 day autonomy, 85% inv, 85% DoD, 12V bus", () => {
      const result = calculateSolarBattery({
        dailyEnergy: 1200,
        dailyEnergyUnit: "wh",
        autonomyDays: 1,
        inverterEfficiency: 0.85,
        chemistry: "lifepo4", // 85% DoD
        systemVoltage: 12,
      });

      expect(result.isValid).toBe(true);
      expect(result.autonomyLoadEnergyWh).toBe(1200);
      expect(result.batteryDeliveryEnergyWh).toBeCloseTo(1411.76, 2);
      expect(result.nominalCapacityWh).toBeCloseTo(1660.90, 2);
      expect(result.batteryBankAh).toBeCloseTo(138.41, 2);
      expect(result.nominalCapacityKwh).toBeCloseTo(1.66, 2);
    });

    it("Scenario 2: 4000 Wh daily load, 2 days autonomy, 90% inv, 85% DoD, 24V bus", () => {
      const result = calculateSolarBattery({
        dailyEnergy: 4000,
        dailyEnergyUnit: "wh",
        autonomyDays: 2,
        inverterEfficiency: 0.90,
        chemistry: "lifepo4", // 85% DoD
        systemVoltage: 24,
      });

      expect(result.isValid).toBe(true);
      expect(result.autonomyLoadEnergyWh).toBe(8000);
      expect(result.batteryDeliveryEnergyWh).toBeCloseTo(8888.89, 2);
      expect(result.nominalCapacityWh).toBeCloseTo(10457.52, 2);
      expect(result.batteryBankAh).toBeCloseTo(435.73, 2);
      expect(result.nominalCapacityKwh).toBeCloseTo(10.46, 2);
    });

    it("Scenario 3: 8000 Wh daily load, 1 day autonomy, 90% inv, 85% DoD, 48V bus", () => {
      const result = calculateSolarBattery({
        dailyEnergy: 8000,
        dailyEnergyUnit: "wh",
        autonomyDays: 1,
        inverterEfficiency: 0.90,
        chemistry: "lifepo4", // 85% DoD
        systemVoltage: 48,
      });

      expect(result.isValid).toBe(true);
      expect(result.autonomyLoadEnergyWh).toBe(8000);
      expect(result.batteryDeliveryEnergyWh).toBeCloseTo(8888.89, 2);
      expect(result.nominalCapacityWh).toBeCloseTo(10457.52, 2);
      expect(result.batteryBankAh).toBeCloseTo(217.86, 2);
      expect(result.nominalCapacityKwh).toBeCloseTo(10.46, 2);
    });

    it("Scenario 4: 3000 Wh daily load, 3 days autonomy, 85% inv, 50% DoD (Lead-Acid AGM), 24V bus", () => {
      const result = calculateSolarBattery({
        dailyEnergy: 3000,
        dailyEnergyUnit: "wh",
        autonomyDays: 3,
        inverterEfficiency: 0.85,
        chemistry: "lead_acid_agm", // 50% DoD
        systemVoltage: 24,
      });

      expect(result.isValid).toBe(true);
      expect(result.autonomyLoadEnergyWh).toBe(9000);
      expect(result.batteryDeliveryEnergyWh).toBeCloseTo(10588.24, 2);
      expect(result.nominalCapacityWh).toBeCloseTo(21176.47, 2);
      expect(result.batteryBankAh).toBeCloseTo(882.35, 2);
      expect(result.nominalCapacityKwh).toBeCloseTo(21.18, 2);
    });

    it("Scenario 5: 4000 Wh daily load, 4.5 peak sun hours, 78% balance-of-system efficiency", () => {
      const result = calculateSolarBattery({
        dailyEnergy: 4000,
        dailyEnergyUnit: "wh",
        autonomyDays: 1,
        inverterEfficiency: 0.85,
        chemistry: "lifepo4",
        systemVoltage: 48,
        peakSunHours: 4.5,
        systemEfficiency: 0.78,
      });

      expect(result.isValid).toBe(true);
      expect(result.pvReplenishmentWatts).toBeCloseTo(1139.60, 2);
    });
  });

  describe("Unit Conversions (kWh ↔ Wh)", () => {
    it("converts kWh input to Wh correctly", () => {
      const resultKwh = calculateSolarBattery({
        ...SOLAR_BATTERY_DEFAULTS,
        dailyEnergy: 5.0,
        dailyEnergyUnit: "kwh",
      });

      const resultWh = calculateSolarBattery({
        ...SOLAR_BATTERY_DEFAULTS,
        dailyEnergy: 5000,
        dailyEnergyUnit: "wh",
      });

      expect(resultKwh.dailyEnergyWh).toBe(5000);
      expect(resultKwh.nominalCapacityWh).toBeCloseTo(resultWh.nominalCapacityWh, 2);
      expect(resultKwh.batteryBankAh).toBeCloseTo(resultWh.batteryBankAh, 2);
    });
  });

  describe("Custom DoD & Custom Autonomy", () => {
    it("respects custom depth of discharge value", () => {
      const result = calculateSolarBattery({
        dailyEnergy: 5000,
        dailyEnergyUnit: "wh",
        autonomyDays: 1.5,
        inverterEfficiency: 0.85,
        chemistry: "custom",
        customDoD: 0.75, // 75%
        systemVoltage: 48,
      });

      expect(result.isValid).toBe(true);
      expect(result.autonomyLoadEnergyWh).toBe(7500);
      // Delivery = 7500 / 0.85 = 8823.529
      expect(result.batteryDeliveryEnergyWh).toBeCloseTo(8823.53, 1);
      // Nominal = 8823.529 / 0.75 = 11764.706
      expect(result.nominalCapacityWh).toBeCloseTo(11764.71, 1);
      // Ah = 11764.706 / 48 = 245.098
      expect(result.batteryBankAh).toBeCloseTo(245.10, 1);
    });
  });

  describe("Input Validation & Error Handling", () => {
    it("flags zero and negative daily energy", () => {
      const zeroCheck = validateSolarBatteryInputs({
        ...SOLAR_BATTERY_DEFAULTS,
        dailyEnergy: 0,
      });
      expect(zeroCheck.length).toBeGreaterThan(0);

      const negCheck = validateSolarBatteryInputs({
        ...SOLAR_BATTERY_DEFAULTS,
        dailyEnergy: -5,
      });
      expect(negCheck.length).toBeGreaterThan(0);
    });

    it("flags invalid inverter efficiency (<= 0 or > 1.0)", () => {
      const tooLow = validateSolarBatteryInputs({
        ...SOLAR_BATTERY_DEFAULTS,
        inverterEfficiency: 0,
      });
      expect(tooLow.length).toBeGreaterThan(0);

      const tooHigh = validateSolarBatteryInputs({
        ...SOLAR_BATTERY_DEFAULTS,
        inverterEfficiency: 1.25,
      });
      expect(tooHigh.length).toBeGreaterThan(0);
    });

    it("flags invalid custom DoD (< 0.20 or > 1.0)", () => {
      const tooHighDoD = validateSolarBatteryInputs({
        ...SOLAR_BATTERY_DEFAULTS,
        chemistry: "custom",
        customDoD: 1.5,
      });
      expect(tooHighDoD.length).toBeGreaterThan(0);

      const tooLowDoD = validateSolarBatteryInputs({
        ...SOLAR_BATTERY_DEFAULTS,
        chemistry: "custom",
        customDoD: 0.15, // 15% is below 20% minimum
      });
      expect(tooLowDoD.length).toBeGreaterThan(0);

      const validMinDoD = validateSolarBatteryInputs({
        ...SOLAR_BATTERY_DEFAULTS,
        chemistry: "custom",
        customDoD: 0.20, // 20% is valid minimum
      });
      expect(validMinDoD.length).toBe(0);
    });

    it("flags invalid system voltage", () => {
      const invalidV = validateSolarBatteryInputs({
        ...SOLAR_BATTERY_DEFAULTS,
        systemVoltage: 0,
      });
      expect(invalidV.length).toBeGreaterThan(0);
    });

    it("returns safe zero output object when inputs are invalid", () => {
      const res = calculateSolarBattery({
        ...SOLAR_BATTERY_DEFAULTS,
        dailyEnergy: -10,
      });

      expect(res.isValid).toBe(false);
      expect(res.errors.length).toBeGreaterThan(0);
      expect(res.nominalCapacityWh).toBe(0);
      expect(res.batteryBankAh).toBe(0);
    });
  });

  describe("Formatting Helpers", () => {
    it("formats numbers properly for display", () => {
      expect(formatKwh(10.457, 2)).toBe("10.46");
      expect(formatWh(10457.52, 0)).toBe("10,458");
      expect(formatAh(217.864, 2)).toBe("217.86");
      expect(formatWatts(1139.60, 0)).toBe("1,140");
    });
  });

  describe("Presets and Defaults Integrity", () => {
    it("has 4 approved reference presets", () => {
      expect(DAILY_USAGE_PRESETS.length).toBe(4);
      expect(DAILY_USAGE_PRESETS.map((p) => p.dailyKwh)).toEqual([1.2, 4.0, 8.0, 25.0]);
    });

    it("provides chemistry defaults for LiFePO4 (85%) and Lead-Acid AGM (50%)", () => {
      expect(CHEMISTRY_DEFAULTS.lifepo4.defaultDoD).toBe(0.85);
      expect(CHEMISTRY_DEFAULTS.lead_acid_agm.defaultDoD).toBe(0.50);
    });
  });
});
