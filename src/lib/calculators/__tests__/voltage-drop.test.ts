import { describe, expect, it } from "vitest";
import {
  calculateVoltageDrop,
  validateVoltageDropInputs,
  getConductorResistance,
  getCircuitMultiplier,
  formatVolts,
  formatPercent,
  formatOhms,
  WIRE_SPECS_TABLE_8,
  VOLTAGE_DROP_FAQS,
  type VoltageDropInputs,
} from "../voltage-drop";

describe("Voltage Drop Calculator Engine", () => {
  describe("1. Approved Benchmark Test Scenarios", () => {
    it("Scenario 1: 12V DC, 20A, 20ft, 10 AWG copper", () => {
      const inputs: VoltageDropInputs = {
        circuitType: "dc",
        sourceVoltage: 12,
        currentAmps: 20,
        distanceFeet: 20,
        conductorMaterial: "copper",
        wireSizeId: "10_awg",
        targetThresholdPercent: 3.0,
      };

      const result = calculateVoltageDrop(inputs);

      expect(result.isValid).toBe(true);
      expect(result.circuitMultiplier).toBe(2);
      expect(result.conductorResistance75C).toBe(1.24);
      expect(result.loopResistanceOhms).toBeCloseTo(0.0496, 4);
      expect(result.voltageDropVolts).toBeCloseTo(0.992, 3);
      expect(result.voltageDropPercent).toBeCloseTo(8.27, 2);
      expect(result.receivingVoltageVolts).toBeCloseTo(11.008, 3);
      expect(result.isWithinThreshold).toBe(false);
      expect(result.thresholdStatusText).toBe("Exceeds selected comparison threshold");
    });

    it("Scenario 2: 120V single-phase AC, 16A, 75ft, 12 AWG copper", () => {
      const inputs: VoltageDropInputs = {
        circuitType: "ac_single_phase",
        sourceVoltage: 120,
        currentAmps: 16,
        distanceFeet: 75,
        conductorMaterial: "copper",
        wireSizeId: "12_awg",
        targetThresholdPercent: 3.0,
      };

      const result = calculateVoltageDrop(inputs);

      expect(result.isValid).toBe(true);
      expect(result.circuitMultiplier).toBe(2);
      expect(result.conductorResistance75C).toBe(1.98);
      expect(result.loopResistanceOhms).toBeCloseTo(0.297, 3);
      expect(result.voltageDropVolts).toBeCloseTo(4.752, 3);
      expect(result.voltageDropPercent).toBeCloseTo(3.96, 2);
      expect(result.receivingVoltageVolts).toBeCloseTo(115.248, 3);
      expect(result.isWithinThreshold).toBe(false);
      expect(result.thresholdStatusText).toBe("Exceeds selected comparison threshold");
    });

    it("Scenario 3: 240V single-phase AC, 50A, 150ft, 2 AWG aluminum", () => {
      const inputs: VoltageDropInputs = {
        circuitType: "ac_single_phase",
        sourceVoltage: 240,
        currentAmps: 50,
        distanceFeet: 150,
        conductorMaterial: "aluminum",
        wireSizeId: "2_awg",
        targetThresholdPercent: 3.0,
      };

      const result = calculateVoltageDrop(inputs);

      expect(result.isValid).toBe(true);
      expect(result.circuitMultiplier).toBe(2);
      expect(result.conductorResistance75C).toBe(0.319);
      expect(result.loopResistanceOhms).toBeCloseTo(0.0957, 4);
      expect(result.voltageDropVolts).toBeCloseTo(4.785, 3);
      expect(result.voltageDropPercent).toBeCloseTo(1.99375, 4);
      expect(result.receivingVoltageVolts).toBeCloseTo(235.215, 3);
      expect(result.isWithinThreshold).toBe(true);
      expect(result.thresholdStatusText).toBe("Within selected comparison threshold");
    });

    it("Scenario 4: 208V three-phase AC, 80A, 200ft, 1/0 AWG copper", () => {
      const inputs: VoltageDropInputs = {
        circuitType: "ac_three_phase",
        sourceVoltage: 208,
        currentAmps: 80,
        distanceFeet: 200,
        conductorMaterial: "copper",
        wireSizeId: "1_0",
        targetThresholdPercent: 3.0,
      };

      const result = calculateVoltageDrop(inputs);

      expect(result.isValid).toBe(true);
      expect(result.circuitMultiplier).toBeCloseTo(Math.sqrt(3), 6);
      expect(result.conductorResistance75C).toBe(0.122);
      // VD = sqrt(3) * 80 * (200/1000) * 0.122 ≈ 3.38138... V
      expect(result.voltageDropVolts).toBeCloseTo(3.382, 2);
      expect(result.voltageDropPercent).toBeCloseTo(1.626, 2);
      expect(result.receivingVoltageVolts).toBeCloseTo(204.618, 2);
      expect(result.isWithinThreshold).toBe(true);
      expect(result.thresholdStatusText).toBe("Within selected comparison threshold");
    });

    it("Scenario 5: 48V DC, 100A, 15ft, 4/0 AWG copper", () => {
      const inputs: VoltageDropInputs = {
        circuitType: "dc",
        sourceVoltage: 48,
        currentAmps: 100,
        distanceFeet: 15,
        conductorMaterial: "copper",
        wireSizeId: "4_0",
        targetThresholdPercent: 3.0,
      };

      const result = calculateVoltageDrop(inputs);

      expect(result.isValid).toBe(true);
      expect(result.circuitMultiplier).toBe(2);
      expect(result.conductorResistance75C).toBe(0.0608);
      expect(result.loopResistanceOhms).toBeCloseTo(0.001824, 6);
      expect(result.voltageDropVolts).toBeCloseTo(0.1824, 4);
      expect(result.voltageDropPercent).toBeCloseTo(0.38, 2);
      expect(result.receivingVoltageVolts).toBeCloseTo(47.8176, 4);
      expect(result.isWithinThreshold).toBe(true);
      expect(result.thresholdStatusText).toBe("Within selected comparison threshold");
    });
  });

  describe("2. NEC Chapter 9 Table 8 Resistance Dataset Integrity", () => {
    it("contains all 17 standard AWG and kcmil wire sizes", () => {
      expect(WIRE_SPECS_TABLE_8.length).toBe(17);
      const expectedSizes = [
        "14 AWG", "12 AWG", "10 AWG", "8 AWG", "6 AWG", "4 AWG", "3 AWG", "2 AWG", "1 AWG",
        "1/0 AWG", "2/0 AWG", "3/0 AWG", "4/0 AWG", "250 kcmil", "300 kcmil", "350 kcmil", "500 kcmil",
      ];
      expect(WIRE_SPECS_TABLE_8.map((w) => w.name)).toEqual(expectedSizes);
    });

    it("verifies aluminum resistance is strictly higher than copper for every gauge", () => {
      for (const wire of WIRE_SPECS_TABLE_8) {
        expect(wire.aluminumResistance75C).toBeGreaterThan(wire.copperResistance75C);
      }
    });

    it("verifies resistance strictly decreases as conductor size increases", () => {
      for (let i = 1; i < WIRE_SPECS_TABLE_8.length; i++) {
        expect(WIRE_SPECS_TABLE_8[i].copperResistance75C).toBeLessThan(
          WIRE_SPECS_TABLE_8[i - 1].copperResistance75C
        );
        expect(WIRE_SPECS_TABLE_8[i].aluminumResistance75C).toBeLessThan(
          WIRE_SPECS_TABLE_8[i - 1].aluminumResistance75C
        );
      }
    });
  });

  describe("3. Input Validation and Guardrails", () => {
    it("rejects non-positive voltage, current, or distance", () => {
      const invalidInputs: VoltageDropInputs = {
        circuitType: "ac_single_phase",
        sourceVoltage: 0,
        currentAmps: -5,
        distanceFeet: 0,
        conductorMaterial: "copper",
        wireSizeId: "12_awg",
      };

      const errors = validateVoltageDropInputs(invalidInputs);
      expect(errors).toContain("Source voltage must be a positive number greater than 0.");
      expect(errors).toContain("Load current must be a positive number greater than 0 Amps.");
      expect(errors).toContain("One-way distance must be a positive number greater than 0 feet.");

      const result = calculateVoltageDrop(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThanOrEqual(3);
    });

    it("rejects unknown wire sizes", () => {
      const invalidInputs: VoltageDropInputs = {
        circuitType: "dc",
        sourceVoltage: 12,
        currentAmps: 10,
        distanceFeet: 50,
        conductorMaterial: "copper",
        wireSizeId: "unknown_gauge",
      };

      const errors = validateVoltageDropInputs(invalidInputs);
      expect(errors).toContain("Select a valid wire size from the standard AWG/kcmil options.");
    });

    it("rejects invalid target comparison thresholds", () => {
      const invalidInputs: VoltageDropInputs = {
        circuitType: "dc",
        sourceVoltage: 12,
        currentAmps: 10,
        distanceFeet: 50,
        conductorMaterial: "copper",
        wireSizeId: "12_awg",
        targetThresholdPercent: 75,
      };

      const errors = validateVoltageDropInputs(invalidInputs);
      expect(errors).toContain("Target comparison threshold must be between 0.1% and 50%.");
    });
  });

  describe("4. Wire Comparison Table Generation", () => {
    it("generates comparison metrics for all 17 wire sizes and correctly flags the selected wire", () => {
      const inputs: VoltageDropInputs = {
        circuitType: "ac_single_phase",
        sourceVoltage: 120,
        currentAmps: 16,
        distanceFeet: 75,
        conductorMaterial: "copper",
        wireSizeId: "12_awg",
        targetThresholdPercent: 3.0,
      };

      const result = calculateVoltageDrop(inputs);
      expect(result.comparisonRows.length).toBe(17);

      const selectedRow = result.comparisonRows.find((r) => r.wireSizeId === "12_awg");
      expect(selectedRow).toBeDefined();
      expect(selectedRow?.isSelectedWire).toBe(true);
      expect(selectedRow?.voltageDropVolts).toBeCloseTo(4.752, 3);
      expect(selectedRow?.isWithinThreshold).toBe(false); // 3.96% > 3%

      // 10 AWG (R = 1.24) -> VD = 2 * 16 * 0.075 * 1.24 = 2.976 V (2.48%) -> within 3% threshold
      const tenAwgRow = result.comparisonRows.find((r) => r.wireSizeId === "10_awg");
      expect(tenAwgRow?.isSelectedWire).toBe(false);
      expect(tenAwgRow?.voltageDropVolts).toBeCloseTo(2.976, 3);
      expect(tenAwgRow?.voltageDropPercent).toBeCloseTo(2.48, 2);
      expect(tenAwgRow?.isWithinThreshold).toBe(true);
    });
  });

  describe("5. Format Helpers & FAQs", () => {
    it("formats volts, percent, and ohms accurately", () => {
      expect(formatVolts(115.248, 2)).toBe("115.25");
      expect(formatPercent(3.96, 2)).toBe("3.96");
      expect(formatOhms(0.0496, 4)).toBe("0.0496");
    });

    it("includes all 7 required AEO FAQs", () => {
      expect(VOLTAGE_DROP_FAQS.length).toBe(7);
      const expectedQuestions = [
        "What is voltage drop?",
        "How do you calculate voltage drop?",
        "Is voltage drop calculated using one-way or round-trip distance?",
        "Why is voltage drop more significant on 12V systems?",
        "How does wire gauge affect voltage drop?",
        "When is √3 used in voltage drop calculations?",
        "What does the NEC say about voltage drop?",
      ];
      expect(VOLTAGE_DROP_FAQS.map((f) => f.question)).toEqual(expectedQuestions);
    });
  });
});
