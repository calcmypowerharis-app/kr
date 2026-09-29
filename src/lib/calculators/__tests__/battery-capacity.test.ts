import { describe, expect, it } from "vitest";
import {
  calculateBatteryCapacity,
  sizeBatteryCapacity,
  BATTERY_CHEMISTRY_PRESETS,
  COMMON_BATTERY_VOLTAGES,
} from "../battery-capacity";

describe("Battery Capacity & Sizing Calculator Logic", () => {
  // 1. Evaluate Existing Battery Mode
  describe("1. Mode 1: Evaluate Existing Battery / Battery Bank", () => {
    it("Case 1A: evaluates single 12V 100Ah LiFePO4 battery (85% DoD)", () => {
      const result = calculateBatteryCapacity({
        voltage: 12,
        capacityValue: 100,
        capacityUnit: "ah",
        chemistry: "lifepo4",
        batteryCount: 1,
        wiring: "single",
      });

      expect(result.isValid).toBe(true);
      expect(result.nominalWh).toBe(1200);
      expect(result.nominalKwh).toBe(1.2);
      expect(result.usableWh).toBe(1020);
      expect(result.usableKwh).toBe(1.02);
      expect(result.bankVoltage).toBe(12);
      expect(result.bankCapacityAh).toBe(100);
      expect(result.dodPercentUsed).toBe(85);
      expect(result.formattedNominalWh).toBe("1,200 Wh");
      expect(result.formattedUsableWh).toBe("1,020 Wh");
      expect(result.formattedBankAh).toBe("100 Ah");
      expect(result.errors).toHaveLength(0);
      expect(result.warnings).toHaveLength(0);
    });

    it("Case 1B: evaluates single 12V 100Ah Lead-Acid battery (50% DoD recommended)", () => {
      const result = calculateBatteryCapacity({
        voltage: 12,
        capacityValue: 100,
        capacityUnit: "ah",
        chemistry: "lead_acid",
        batteryCount: 1,
        wiring: "single",
      });

      expect(result.isValid).toBe(true);
      expect(result.nominalWh).toBe(1200);
      expect(result.usableWh).toBe(600);
      expect(result.usableKwh).toBe(0.6);
      expect(result.dodPercentUsed).toBe(50);
      expect(result.formattedUsableWh).toBe("600 Wh");
    });

    it("Case 1C: evaluates single 12V 100Ah Lithium-Ion battery (80% DoD)", () => {
      const result = calculateBatteryCapacity({
        voltage: 12,
        capacityValue: 100,
        capacityUnit: "ah",
        chemistry: "lithium_ion",
        batteryCount: 1,
        wiring: "single",
      });

      expect(result.isValid).toBe(true);
      expect(result.nominalWh).toBe(1200);
      expect(result.usableWh).toBe(960);
      expect(result.usableKwh).toBe(0.96);
      expect(result.dodPercentUsed).toBe(80);
    });

    it("Case 1D: evaluates capacity specified in milliamp-hours (mAh)", () => {
      // 3.7V 10,000 mAh power bank cell = 10 Ah × 3.7V = 37 Wh
      const result = calculateBatteryCapacity({
        voltage: 3.7,
        capacityValue: 10000,
        capacityUnit: "mah",
        chemistry: "lithium_ion",
        batteryCount: 1,
        wiring: "single",
      });

      expect(result.isValid).toBe(true);
      expect(result.bankCapacityAh).toBe(10);
      expect(result.nominalWh).toBe(37);
      expect(result.usableWh).toBe(29.6);
    });

    it("Case 1E: evaluates series wiring of four 12V 100Ah batteries (48V 100Ah bank)", () => {
      const result = calculateBatteryCapacity({
        voltage: 12,
        capacityValue: 100,
        capacityUnit: "ah",
        chemistry: "lifepo4",
        batteryCount: 4,
        wiring: "series",
      });

      expect(result.isValid).toBe(true);
      expect(result.bankVoltage).toBe(48);
      expect(result.bankCapacityAh).toBe(100);
      expect(result.nominalWh).toBe(4800);
      expect(result.nominalKwh).toBe(4.8);
      expect(result.usableWh).toBe(4080);
      expect(result.usableKwh).toBe(4.08);
      expect(result.wiringSummary).toContain("series");
      expect(result.warnings.some((w) => w.includes("identical batteries"))).toBe(true);
    });

    it("Case 1F: evaluates parallel wiring of four 12V 100Ah batteries (12V 400Ah bank)", () => {
      const result = calculateBatteryCapacity({
        voltage: 12,
        capacityValue: 100,
        capacityUnit: "ah",
        chemistry: "lifepo4",
        batteryCount: 4,
        wiring: "parallel",
      });

      expect(result.isValid).toBe(true);
      expect(result.bankVoltage).toBe(12);
      expect(result.bankCapacityAh).toBe(400);
      expect(result.nominalWh).toBe(4800);
      expect(result.nominalKwh).toBe(4.8);
      expect(result.usableWh).toBe(4080);
      expect(result.usableKwh).toBe(4.08);
      expect(result.wiringSummary).toContain("parallel");
    });

    it("Case 1G: respects custom DoD input and warns when lead-acid exceeds 50%", () => {
      const result = calculateBatteryCapacity({
        voltage: 12,
        capacityValue: 100,
        capacityUnit: "ah",
        chemistry: "lead_acid",
        customDoD: 75, // 75% DoD on lead-acid
        batteryCount: 1,
        wiring: "single",
      });

      expect(result.isValid).toBe(true);
      expect(result.dodPercentUsed).toBe(75);
      expect(result.usableWh).toBe(900);
      expect(result.warnings.some((w) => w.includes("sulfation"))).toBe(true);
    });

    it("Case 1H: returns validation errors for invalid voltage, capacity, or count", () => {
      const result = calculateBatteryCapacity({
        voltage: 0,
        capacityValue: -50,
        capacityUnit: "ah",
        chemistry: "lifepo4",
        batteryCount: 0,
        wiring: "single",
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThanOrEqual(3);
      expect(result.errors.some((e) => e.field === "voltage")).toBe(true);
      expect(result.errors.some((e) => e.field === "capacityValue")).toBe(true);
      expect(result.errors.some((e) => e.field === "batteryCount")).toBe(true);
    });
  });

  // 2. Size Battery for Load & Runtime Mode
  describe("2. Mode 2: Size Battery for Load & Runtime", () => {
    it("Case 2A: sizes battery for 300W load over 8 hours (AC load, 85% inverter eff, LiFePO4 85% DoD)", () => {
      const result = sizeBatteryCapacity({
        loadWatts: 300,
        runtimeHours: 8,
        systemVoltage: 12,
        loadType: "ac",
        inverterEfficiency: 85,
        chemistry: "lifepo4",
        unitBatteryAh: 100,
      });

      expect(result.isValid).toBe(true);
      // Raw: 300 * 8 = 2,400 Wh
      expect(result.rawEnergyWh).toBe(2400);
      expect(result.rawEnergyKwh).toBe(2.4);

      // Battery Output: 2,400 / 0.85 = 2,823.5 Wh
      expect(result.requiredBatteryWh).toBeCloseTo(2823.5, 0);

      // Nominal: 2,823.53 / 0.85 = 3,321.8 Wh
      expect(result.requiredNominalWh).toBeCloseTo(3321.8, 0);

      // Required Ah @ 12V: 3,321.8 / 12 = 276.8 Ah
      expect(result.requiredBankAh).toBeCloseTo(276.8, 0);

      // Recommended 100Ah units: ceil(276.8 / 100) = 3 units
      expect(result.recommendedUnits).toBe(3);

      // DC Current: 300 / (12 * 0.85) = 29.4 A
      expect(result.dcCurrentAmps).toBeCloseTo(29.4, 0);
      expect(result.errors).toHaveLength(0);
    });

    it("Case 2B: sizes direct DC load (100W for 10 hours at 12V, LiFePO4 85% DoD)", () => {
      const result = sizeBatteryCapacity({
        loadWatts: 100,
        runtimeHours: 10,
        systemVoltage: 12,
        loadType: "dc",
        chemistry: "lifepo4",
        unitBatteryAh: 100,
      });

      expect(result.isValid).toBe(true);
      // Raw: 100 * 10 = 1,000 Wh
      expect(result.rawEnergyWh).toBe(1000);
      // DC -> 100% efficiency
      expect(result.requiredBatteryWh).toBe(1000);
      // Nominal: 1,000 / 0.85 = 1,176.5 Wh
      expect(result.requiredNominalWh).toBeCloseTo(1176.5, 0);
      // Required Ah @ 12V: 1,176.47 / 12 = 98.0 Ah
      expect(result.requiredBankAh).toBeCloseTo(98.0, 0);
      // Recommended 100Ah units: ceil(98.0 / 100) = 1 unit
      expect(result.recommendedUnits).toBe(1);
      // DC Current: 100 / 12 = 8.3 A
      expect(result.dcCurrentAmps).toBeCloseTo(8.3, 0);
    });

    it("Case 2C: sizes lead-acid bank at 24V with 50% DoD", () => {
      const result = sizeBatteryCapacity({
        loadWatts: 500,
        runtimeHours: 4,
        systemVoltage: 24,
        loadType: "ac",
        inverterEfficiency: 85,
        chemistry: "lead_acid",
        unitBatteryAh: 100,
      });

      expect(result.isValid).toBe(true);
      // Raw: 500 * 4 = 2,000 Wh
      expect(result.rawEnergyWh).toBe(2000);
      // Required output: 2,000 / 0.85 = 2,352.9 Wh
      expect(result.requiredBatteryWh).toBeCloseTo(2352.9, 0);
      // Nominal @ 50% DoD: 2,352.94 / 0.50 = 4,705.9 Wh
      expect(result.requiredNominalWh).toBeCloseTo(4705.9, 0);
      // Required Ah @ 24V: 4,705.88 / 24 = 196.1 Ah
      expect(result.requiredBankAh).toBeCloseTo(196.1, 0);
      // Recommended 100Ah units: ceil(196.1 / 100) = 2 units
      expect(result.recommendedUnits).toBe(2);
    });

    it("Case 2D: triggers high DC current warning when current exceeds 100A", () => {
      const result = sizeBatteryCapacity({
        loadWatts: 1500,
        runtimeHours: 2,
        systemVoltage: 12,
        loadType: "ac",
        inverterEfficiency: 85,
        chemistry: "lifepo4",
      });

      // DC Amps: 1500 / (12 * 0.85) = 147.1 A > 100 A
      expect(result.dcCurrentAmps).toBeGreaterThan(100);
      expect(result.warnings.some((w) => w.includes("High continuous DC current"))).toBe(true);
    });

    it("Case 2E: returns validation errors for invalid wattage, hours, or system voltage", () => {
      const result = sizeBatteryCapacity({
        loadWatts: 0,
        runtimeHours: -2,
        systemVoltage: 0,
        loadType: "ac",
        chemistry: "lifepo4",
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.field === "loadWatts")).toBe(true);
      expect(result.errors.some((e) => e.field === "runtimeHours")).toBe(true);
      expect(result.errors.some((e) => e.field === "systemVoltage")).toBe(true);
    });
  });

  // 3. Presets & Constants Integrity
  describe("3. Presets and Voltages Integrity", () => {
    it("contains valid chemistry presets with expected DoD values", () => {
      expect(BATTERY_CHEMISTRY_PRESETS.lifepo4.defaultDoD).toBe(0.85);
      expect(BATTERY_CHEMISTRY_PRESETS.lead_acid.defaultDoD).toBe(0.5);
      expect(BATTERY_CHEMISTRY_PRESETS.lithium_ion.defaultDoD).toBe(0.8);
      expect(BATTERY_CHEMISTRY_PRESETS.custom.defaultDoD).toBe(0.85);
    });

    it("contains standard US battery voltages: 12V, 24V, 36V, 48V", () => {
      const voltages = COMMON_BATTERY_VOLTAGES.map((v) => v.value);
      expect(voltages).toEqual([12, 24, 36, 48]);
    });
  });
});
