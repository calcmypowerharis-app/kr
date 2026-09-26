import { describe, it, expect } from "vitest";
import { calculateWattsToAmps } from "../watts-to-amps";

describe("calculateWattsToAmps — Unit Test Suite", () => {
  // TC-01: DC Standard
  it("TC-01: converts 120W at 12V DC to exactly 10.00 Amps", () => {
    const res = calculateWattsToAmps({
      powerWatts: 120,
      voltage: 12,
      currentType: "dc",
    });
    expect(res.currentAmps).toBe(10.0);
    expect(res.formattedCurrent).toBe("10.00 A");
    expect(res.continuousLoadRefAmps).toBe(12.5);
    expect(res.isValid).toBe(true);
    expect(res.errors).toHaveLength(0);
  });

  // TC-02: DC High Current
  it("TC-02: converts 1200W at 12V DC to 100.00 Amps and triggers high-current alert", () => {
    const res = calculateWattsToAmps({
      powerWatts: 1200,
      voltage: 12,
      currentType: "dc",
    });
    expect(res.currentAmps).toBe(100.0);
    expect(res.continuousLoadRefAmps).toBe(125.0);
    expect(res.warnings.some((w) => w.includes("High current detected"))).toBe(true);
  });

  // TC-03: AC Single-Phase (PF = 1.0)
  it("TC-03: converts 1500W at 120V AC Single-Phase (PF=1.0) to 12.50 Amps", () => {
    const res = calculateWattsToAmps({
      powerWatts: 1500,
      voltage: 120,
      currentType: "ac_single",
      powerFactor: 1.0,
    });
    expect(res.currentAmps).toBe(12.5);
    expect(res.formattedCurrent).toBe("12.50 A");
    expect(res.continuousLoadRefAmps).toBe(15.63);
    expect(res.apparentPowerVa).toBeUndefined(); // PF is 1.0, no apparent power delta
  });

  // TC-04: AC Single-Phase (PF < 1.0)
  it("TC-04: converts 1800W at 120V AC with PF 0.85 to 17.65 Amps and calculates Apparent Power", () => {
    // Hand calculation: 1800 / (120 * 0.85) = 1800 / 102 = 17.64705... -> 17.65 A
    // Apparent Power: 1800 / 0.85 = 2117.6... -> 2118 VA
    const res = calculateWattsToAmps({
      powerWatts: 1800,
      voltage: 120,
      currentType: "ac_single",
      powerFactor: 0.85,
    });
    expect(res.currentAmps).toBe(17.65);
    expect(res.continuousLoadRefAmps).toBe(22.06);
    expect(res.apparentPowerVa).toBe(2118);
  });

  // TC-05: AC Single-Phase 240V
  it("TC-05: converts 5000W at 240V AC to 20.83 Amps", () => {
    // Hand calculation: 5000 / (240 * 1.0) = 20.8333... -> 20.83 A
    const res = calculateWattsToAmps({
      powerWatts: 5000,
      voltage: 240,
      currentType: "ac_single",
      powerFactor: 1.0,
    });
    expect(res.currentAmps).toBe(20.83);
    expect(res.continuousLoadRefAmps).toBe(26.04);
  });

  // TC-06: AC 3-Phase Line-to-Line (V_LL)
  it("TC-06: converts 10,000W at 480V 3-Phase L-L with PF 0.85 to 14.17 Amps", () => {
    // Hand calculation: 10000 / (sqrt(3) * 480 * 0.85) = 10000 / 706.6766 = 14.1507... -> 14.17 A
    const res = calculateWattsToAmps({
      powerWatts: 10000,
      voltage: 480,
      currentType: "ac_three",
      voltageType: "line_to_line",
      powerFactor: 0.85,
    });
    // Exact math: 10000 / (sqrt(3) * 480 * 0.85) = 10000 / 706.6767 = 14.1507... -> 14.15 A
    // Continuous reference: 14.1507 * 1.25 = 17.688... -> 17.69 A
    expect(res.currentAmps).toBe(14.15);
    expect(res.continuousLoadRefAmps).toBe(17.69);
    expect(res.systemLabel).toContain("Line-to-Line");
  });

  // TC-07: AC 3-Phase Line-to-Neutral (V_LN)
  it("TC-07: converts 10,000W at 277V 3-Phase L-N with PF 0.85 to 14.16 Amps", () => {
    // Hand calculation: 10000 / (3 * 277 * 0.85) = 10000 / 706.35 = 14.157... -> 14.16 A
    const res = calculateWattsToAmps({
      powerWatts: 10000,
      voltage: 277,
      currentType: "ac_three",
      voltageType: "line_to_neutral",
      powerFactor: 0.85,
    });
    expect(res.currentAmps).toBe(14.16);
    expect(res.continuousLoadRefAmps).toBe(17.7);
    expect(res.systemLabel).toContain("Line-to-Neutral");
  });

  // TC-08: Edge: Zero Voltage
  it("TC-08: displays non-silent validation error for zero voltage and prevents division by zero", () => {
    const res = calculateWattsToAmps({
      powerWatts: 1000,
      voltage: 0,
      currentType: "ac_single",
      powerFactor: 1.0,
    });
    expect(res.currentAmps).toBe(0.0);
    expect(res.isValid).toBe(false);
    expect(res.errors.some((e) => e.field === "voltage")).toBe(true);
    expect(Number.isFinite(res.currentAmps)).toBe(true);
  });

  // TC-09: Edge: Zero Watts
  it("TC-09: returns 0.00 Amps cleanly when load is 0 Watts", () => {
    const res = calculateWattsToAmps({
      powerWatts: 0,
      voltage: 120,
      currentType: "ac_single",
      powerFactor: 1.0,
    });
    expect(res.currentAmps).toBe(0.0);
    expect(res.formattedCurrent).toBe("0.00 A");
    expect(res.isValid).toBe(true);
  });

  // TC-10: Edge: Invalid PF > 1
  it("TC-10: displays non-silent validation message when PF > 1.0", () => {
    const res = calculateWattsToAmps({
      powerWatts: 1000,
      voltage: 120,
      currentType: "ac_single",
      powerFactor: 1.2,
    });
    expect(res.errors.some((e) => e.field === "powerFactor")).toBe(true);
    expect(res.errors.some((e) => e.message.includes("cannot exceed 1.0"))).toBe(true);
    expect(res.currentAmps).toBe(8.33); // Falls back safely to 1.0
  });

  // TC-11: Edge: Negative Watts
  it("TC-11: displays non-silent validation message for negative power and clamps safely", () => {
    const res = calculateWattsToAmps({
      powerWatts: -500,
      voltage: 120,
      currentType: "ac_single",
      powerFactor: 1.0,
    });
    expect(res.errors.some((e) => e.field === "powerWatts")).toBe(true);
    expect(res.currentAmps).toBe(0.0);
    expect(res.isValid).toBe(false);
  });

  // TC-12: Extreme Load (100kW Industrial)
  it("TC-12: calculates extreme industrial load (100,000W at 480V 3-Phase PF 0.90) to 133.64 A", () => {
    // Hand calculation: 100000 / (sqrt(3) * 480 * 0.90) = 100000 / 748.2459 = 133.645... -> 133.65 / 133.64
    const res = calculateWattsToAmps({
      powerWatts: 100000,
      voltage: 480,
      currentType: "ac_three",
      voltageType: "line_to_line",
      powerFactor: 0.9,
    });
    expect(res.currentAmps).toBeCloseTo(133.65, 1);
    expect(res.warnings.some((w) => w.includes("High current detected"))).toBe(true);
  });

  // TC-13: Rounding Precision
  it("TC-13: strictly rounds 100W / 120V (0.8333...A) to 0.83 Amps", () => {
    const res = calculateWattsToAmps({
      powerWatts: 100,
      voltage: 120,
      currentType: "ac_single",
      powerFactor: 1.0,
    });
    expect(res.currentAmps).toBe(0.83);
    expect(res.formattedCurrent).toBe("0.83 A");
  });

  // TC-14: Microwave 1,200W @ 120V Preset Verification
  it("TC-14: Microwave 1,200W @ 120V AC Single-Phase (PF=1.0) equals 10.00 Amps and matches UI preset", async () => {
    const { WATTS_TO_AMPS_PRESETS } = await import("../watts-to-amps");
    const microwavePreset = WATTS_TO_AMPS_PRESETS.find((p) => p.label.startsWith("Microwave"));
    expect(microwavePreset).toBeDefined();
    expect(microwavePreset?.watts).toBe(1200);
    expect(microwavePreset?.voltage).toBe(120);
    expect(microwavePreset?.system).toBe("ac_single");
    expect(microwavePreset?.pf).toBe(1.0);

    const res = calculateWattsToAmps({
      powerWatts: microwavePreset!.watts,
      voltage: microwavePreset!.voltage,
      currentType: microwavePreset!.system,
      powerFactor: microwavePreset!.pf,
    });
    expect(res.currentAmps).toBe(10.0);
    expect(res.formattedCurrent).toBe("10.00 A");
    expect(res.continuousLoadRefAmps).toBe(12.5);
  });
});
