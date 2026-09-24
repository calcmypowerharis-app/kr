import { describe, it, expect } from "vitest";
import { calculateUpsRuntime } from "../ups-runtime";

describe("calculateUpsRuntime - Independent Hand Calculations", () => {
  it("calculates correct runtime for 12V 100Ah LiFePO4 battery under 150W load", () => {
    // Hand calculation:
    // Stored: 12V * 100Ah = 1200 Wh
    // Usable: 1200 Wh * 0.90 (DoD) * 0.85 (eff) = 918 Wh
    // Runtime: 918 Wh / 150W = 6.12 hours = 6 hr 7 min
    // DC Current: 150W / (12V * 0.85) = 14.705... A -> 14.7 A
    const result = calculateUpsRuntime({
      loadWatts: 150,
      batteryVoltage: 12,
      batteryCapacityAh: 100,
      batteryChemistry: "lifepo4",
    });

    expect(result.totalStoredWh).toBe(1200);
    expect(result.usableWh).toBe(918);
    expect(result.usableKwh).toBe(0.92);
    expect(result.runtimeHours).toBe(6.12);
    expect(result.hours).toBe(6);
    expect(result.minutes).toBe(7);
    expect(result.formattedRuntime).toBe("6 hr 7 min");
    expect(result.dcCurrentAmps).toBe(14.7);
    expect(result.usedDoDPercent).toBe(90);
    expect(result.usedEfficiencyPercent).toBe(85);
  });

  it("calculates correct runtime for 12V 100Ah Lead-Acid battery under 100W load", () => {
    // Hand calculation:
    // Stored: 12V * 100Ah = 1200 Wh
    // Usable: 1200 Wh * 0.50 (DoD) * 0.85 (eff) = 510 Wh
    // Runtime: 510 Wh / 100W = 5.1 hours = 5 hr 6 min
    const result = calculateUpsRuntime({
      loadWatts: 100,
      batteryVoltage: 12,
      batteryCapacityAh: 100,
      batteryChemistry: "lead_acid",
    });

    expect(result.totalStoredWh).toBe(1200);
    expect(result.usableWh).toBe(510);
    expect(result.runtimeHours).toBe(5.1);
    expect(result.hours).toBe(5);
    expect(result.minutes).toBe(6);
    expect(result.usedDoDPercent).toBe(50);
  });

  it("handles 0 Watts load gracefully without division by zero or NaN", () => {
    const result = calculateUpsRuntime({
      loadWatts: 0,
      batteryVoltage: 12,
      batteryCapacityAh: 100,
      batteryChemistry: "lifepo4",
    });

    expect(result.runtimeHours).toBe(999);
    expect(result.formattedRuntime).toBe("Indefinite (No Load)");
    expect(result.dcCurrentAmps).toBe(0);
    expect(result.warnings.some((w) => w.includes("0 Watts"))).toBe(true);
  });

  it("flags Peukert warning when Lead-Acid battery is discharged above 0.2C", () => {
    // 12V 50Ah battery under 300W load:
    // DC Amps = 300 / (12 * 0.85) = 29.4A.
    // C-rate = 29.4 / 50 = 0.588C (> 0.2C).
    const result = calculateUpsRuntime({
      loadWatts: 300,
      batteryVoltage: 12,
      batteryCapacityAh: 50,
      batteryChemistry: "lead_acid",
    });

    expect(result.warnings.some((w) => w.includes("Peukert"))).toBe(true);
  });

  it("flags high current warning when DC current exceeds 100A", () => {
    // 12V 200Ah battery under 1500W load:
    // DC Amps = 1500 / (12 * 0.85) = 147A (> 100A).
    const result = calculateUpsRuntime({
      loadWatts: 1500,
      batteryVoltage: 12,
      batteryCapacityAh: 200,
      batteryChemistry: "lifepo4",
    });

    expect(result.warnings.some((w) => w.includes("High DC current draw"))).toBe(true);
  });

  it("handles negative or invalid values defensively", () => {
    const result = calculateUpsRuntime({
      loadWatts: -50,
      batteryVoltage: -12,
      batteryCapacityAh: -100,
      batteryChemistry: "lifepo4",
    });

    // Should clamp negative values to 0
    expect(result.totalStoredWh).toBe(0);
    expect(result.usableWh).toBe(0);
    expect(result.dcCurrentAmps).toBe(0);
  });
});
