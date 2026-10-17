import { describe, expect, it } from "vitest";
import {
  calculateAmpsToWatts,
  AMPS_TO_WATTS_PRESETS,
  COMMON_CIRCUIT_VOLTAGES,
  AMPS_TO_WATTS_REFERENCE_AMPS,
  AMPS_TO_WATTS_REFERENCE_DATA,
  buildAmpsToWattsReferenceRow,
} from "../amps-to-watts";

describe("Amps to Watts Calculator Logic", () => {
  // 1. Direct Current (DC) Conversions: P = I × V
  describe("1. Direct Current (DC) Conversions", () => {
    it("Case 1A: calculates 10A at 12V DC accurately (120W)", () => {
      const result = calculateAmpsToWatts({
        currentAmps: 10,
        voltage: 12,
        currentType: "dc",
      });

      expect(result.isValid).toBe(true);
      expect(result.powerWatts).toBe(120);
      expect(result.powerKw).toBe(0.12);
      expect(result.formattedWatts).toBe("120 W");
      expect(result.formattedKw).toBe("0.12 kW");
      expect(result.continuousLoadWattsRef).toBe(96);
      expect(result.systemLabel).toBe("Direct Current (DC)");
      expect(result.apparentPowerVa).toBeUndefined(); // VA not applicable to DC
    });

    it("Case 1B: calculates 20A at 24V DC accurately (480W)", () => {
      const result = calculateAmpsToWatts({
        currentAmps: 20,
        voltage: 24,
        currentType: "dc",
      });

      expect(result.isValid).toBe(true);
      expect(result.powerWatts).toBe(480);
      expect(result.powerKw).toBe(0.48);
      expect(result.continuousLoadWattsRef).toBe(384);
    });

    it("Case 1C: calculates 50A at 48V DC battery storage (2,400W)", () => {
      const result = calculateAmpsToWatts({
        currentAmps: 50,
        voltage: 48,
        currentType: "dc",
      });

      expect(result.isValid).toBe(true);
      expect(result.powerWatts).toBe(2400);
      expect(result.powerKw).toBe(2.4);
      expect(result.continuousLoadWattsRef).toBe(1920);
    });
  });

  // 2. AC Single-Phase Conversions: P = I × V × PF
  describe("2. AC Single-Phase Conversions", () => {
    it("Case 2A: standard US 15A household circuit at 120V (1,800W max / 1,440W continuous)", () => {
      const result = calculateAmpsToWatts({
        currentAmps: 15,
        voltage: 120,
        currentType: "ac_single",
        powerFactor: 1.0,
      });

      expect(result.isValid).toBe(true);
      expect(result.powerWatts).toBe(1800);
      expect(result.powerKw).toBe(1.8);
      expect(result.formattedWatts).toBe("1,800 W");
      expect(result.formattedKw).toBe("1.80 kW");
      expect(result.continuousLoadWattsRef).toBe(1440);
      expect(result.formattedContinuousWattsRef).toBe("1,440 W");
      expect(result.apparentPowerVa).toBe(1800);
      expect(result.formattedVa).toBe("1,800 VA");
      expect(result.systemLabel).toBe("AC Single-Phase");
    });

    it("Case 2B: standard US 20A kitchen/bath circuit at 120V (2,400W max / 1,920W continuous)", () => {
      const result = calculateAmpsToWatts({
        currentAmps: 20,
        voltage: 120,
        currentType: "ac_single",
        powerFactor: 1.0,
      });

      expect(result.isValid).toBe(true);
      expect(result.powerWatts).toBe(2400);
      expect(result.powerKw).toBe(2.4);
      expect(result.continuousLoadWattsRef).toBe(1920);
    });

    it("Case 2C: 30A at 240V heavy appliance circuit (7,200W max / 5,760W continuous)", () => {
      const result = calculateAmpsToWatts({
        currentAmps: 30,
        voltage: 240,
        currentType: "ac_single",
        powerFactor: 1.0,
      });

      expect(result.isValid).toBe(true);
      expect(result.powerWatts).toBe(7200);
      expect(result.powerKw).toBe(7.2);
      expect(result.continuousLoadWattsRef).toBe(5760);
    });

    it("Case 2D: 50A at 240V EV charging or kitchen range circuit (12,000W max / 9,600W continuous)", () => {
      const result = calculateAmpsToWatts({
        currentAmps: 50,
        voltage: 240,
        currentType: "ac_single",
        powerFactor: 1.0,
      });

      expect(result.isValid).toBe(true);
      expect(result.powerWatts).toBe(12000);
      expect(result.powerKw).toBe(12);
      expect(result.continuousLoadWattsRef).toBe(9600);
    });

    it("Case 2E: AC Single-Phase with inductive motor power factor (10A @ 120V, PF 0.85)", () => {
      const result = calculateAmpsToWatts({
        currentAmps: 10,
        voltage: 120,
        currentType: "ac_single",
        powerFactor: 0.85,
      });

      expect(result.isValid).toBe(true);
      expect(result.powerWatts).toBe(1020); // 10 × 120 × 0.85
      expect(result.powerKw).toBe(1.02);
      expect(result.apparentPowerVa).toBe(1200); // 10 × 120
      expect(result.formattedVa).toBe("1,200 VA");
      expect(result.continuousLoadWattsRef).toBe(816); // 1020 × 0.80
    });

    it("Case 2F: Position 9 benchmark - true power of a 120V circuit operating at 10A with unity power factor", () => {
      const result = calculateAmpsToWatts({
        currentAmps: 10,
        voltage: 120,
        currentType: "ac_single",
        powerFactor: 1.0,
      });

      expect(result.isValid).toBe(true);
      expect(result.powerWatts).toBe(1200); // P = 120 × 10 × 1.0 = 1,200 W
      expect(result.powerKw).toBe(1.2);
      expect(result.formattedWatts).toBe("1,200 W");
      expect(result.formattedKw).toBe("1.20 kW");
      expect(result.apparentPowerVa).toBe(1200); // S = 120 × 10 = 1,200 VA
      expect(result.formattedVa).toBe("1,200 VA");
      expect(result.continuousLoadWattsRef).toBe(960); // 1200 × 0.80 = 960 W
    });

    it("Case 2G: 30A at 120V AC single-phase RV branch circuit (3,600W max)", () => {
      const result = calculateAmpsToWatts({
        currentAmps: 30,
        voltage: 120,
        currentType: "ac_single",
        powerFactor: 1.0,
      });

      expect(result.isValid).toBe(true);
      expect(result.powerWatts).toBe(3600);
      expect(result.powerKw).toBe(3.6);
      expect(result.continuousLoadWattsRef).toBe(2880);
    });

    it("Case 2H: 40A at 240V AC single-phase cooking range or subpanel (9,600W max)", () => {
      const result = calculateAmpsToWatts({
        currentAmps: 40,
        voltage: 240,
        currentType: "ac_single",
        powerFactor: 1.0,
      });

      expect(result.isValid).toBe(true);
      expect(result.powerWatts).toBe(9600);
      expect(result.powerKw).toBe(9.6);
      expect(result.continuousLoadWattsRef).toBe(7680);
    });

    it("Case 2I: Fractional 3.0A and 8.5A loads at 120V AC single-phase", () => {
      const res3A = calculateAmpsToWatts({
        currentAmps: 3.0,
        voltage: 120,
        currentType: "ac_single",
        powerFactor: 1.0,
      });
      expect(res3A.isValid).toBe(true);
      expect(res3A.powerWatts).toBe(360);
      expect(res3A.continuousLoadWattsRef).toBe(288);

      const res8_5A = calculateAmpsToWatts({
        currentAmps: 8.5,
        voltage: 120,
        currentType: "ac_single",
        powerFactor: 1.0,
      });
      expect(res8_5A.isValid).toBe(true);
      expect(res8_5A.powerWatts).toBe(1020);
      expect(res8_5A.continuousLoadWattsRef).toBe(816);
    });
  });

  // 3. AC Three-Phase Conversions
  describe("3. AC Three-Phase Conversions", () => {
    it("Case 3A: Line-to-Line 20A at 208V with PF 0.90 (6,484.50W)", () => {
      const result = calculateAmpsToWatts({
        currentAmps: 20,
        voltage: 208,
        currentType: "ac_three",
        voltageType: "line_to_line",
        powerFactor: 0.90,
      });

      expect(result.isValid).toBe(true);
      // P = √3 × 208 × 20 × 0.90 = 6,484.80 W
      expect(result.powerWatts).toBe(6484.8);
      expect(result.powerKw).toBe(6.48);
      // S = √3 × 208 × 20 = 7,205.33 VA
      expect(result.apparentPowerVa).toBe(7205.33);
      expect(result.systemLabel).toBe("Balanced Three-Phase (Line-to-Line)");
    });

    it("Case 3B: Line-to-Line 30A at 480V with PF 0.85 (21,200.30W)", () => {
      const result = calculateAmpsToWatts({
        currentAmps: 30,
        voltage: 480,
        currentType: "ac_three",
        voltageType: "line_to_line",
        powerFactor: 0.85,
      });

      expect(result.isValid).toBe(true);
      // P = √3 × 480 × 30 × 0.85 = 21200.304...
      expect(result.powerWatts).toBe(21200.3);
      expect(result.powerKw).toBe(21.2);
      // S = √3 × 480 × 30 = 24941.53...
      expect(result.apparentPowerVa).toBe(24941.53);
    });

    it("Case 3C: Line-to-Neutral 20A at 120V with PF 0.90 (6,480W)", () => {
      const result = calculateAmpsToWatts({
        currentAmps: 20,
        voltage: 120,
        currentType: "ac_three",
        voltageType: "line_to_neutral",
        powerFactor: 0.90,
      });

      expect(result.isValid).toBe(true);
      // P = 3 × 120 × 20 × 0.90 = 6,480 W
      expect(result.powerWatts).toBe(6480);
      expect(result.powerKw).toBe(6.48);
      // S = 3 × 120 × 20 = 7,200 VA
      expect(result.apparentPowerVa).toBe(7200);
      expect(result.systemLabel).toBe("Balanced Three-Phase (Line-to-Neutral)");
    });
  });

  // 4. Edge Cases, Zero Inputs & Validation
  describe("4. Edge Cases, Zero Inputs & Validation", () => {
    it("handles zero current (0 Amps) gracefully without NaN", () => {
      const result = calculateAmpsToWatts({
        currentAmps: 0,
        voltage: 120,
        currentType: "ac_single",
      });

      expect(result.isValid).toBe(true);
      expect(result.powerWatts).toBe(0);
      expect(result.powerKw).toBe(0);
      expect(result.formattedWatts).toBe("0 W");
      expect(result.continuousLoadWattsRef).toBe(0);
      expect(result.warnings.some((w) => w.includes("0 Amperes"))).toBe(true);
    });

    it("returns validation error for negative current", () => {
      const result = calculateAmpsToWatts({
        currentAmps: -10,
        voltage: 120,
        currentType: "ac_single",
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.field === "currentAmps")).toBe(true);
    });

    it("returns validation error for 0 or negative voltage", () => {
      const zeroV = calculateAmpsToWatts({
        currentAmps: 15,
        voltage: 0,
        currentType: "ac_single",
      });

      expect(zeroV.isValid).toBe(false);
      expect(zeroV.errors.some((e) => e.field === "voltage")).toBe(true);

      const negV = calculateAmpsToWatts({
        currentAmps: 15,
        voltage: -120,
        currentType: "ac_single",
      });

      expect(negV.isValid).toBe(false);
      expect(negV.errors.some((e) => e.field === "voltage")).toBe(true);
    });

    it("returns validation error for invalid power factor in AC (< 0.1 or > 1.0)", () => {
      const zeroPf = calculateAmpsToWatts({
        currentAmps: 15,
        voltage: 120,
        currentType: "ac_single",
        powerFactor: 0,
      });

      expect(zeroPf.isValid).toBe(false);
      expect(zeroPf.errors.some((e) => e.field === "powerFactor")).toBe(true);

      const overPf = calculateAmpsToWatts({
        currentAmps: 15,
        voltage: 120,
        currentType: "ac_single",
        powerFactor: 1.25,
      });

      expect(overPf.isValid).toBe(false);
      expect(overPf.errors.some((e) => e.field === "powerFactor")).toBe(true);
    });

    it("ignores power factor validation when currentType is DC", () => {
      const result = calculateAmpsToWatts({
        currentAmps: 10,
        voltage: 12,
        currentType: "dc",
        powerFactor: 0.5, // Should be ignored in DC
      });

      expect(result.isValid).toBe(true);
      expect(result.powerWatts).toBe(120); // 10 × 12
    });
  });

  // 5. Engineering Warnings
  describe("5. Engineering Warnings", () => {
    it("generates a high-current warning when current exceeds 200 Amps", () => {
      const result = calculateAmpsToWatts({
        currentAmps: 225,
        voltage: 240,
        currentType: "ac_single",
      });

      expect(result.isValid).toBe(true);
      expect(result.warnings.some((w) => w.includes("Very high current detected"))).toBe(true);
    });

    it("generates a low power factor warning when AC PF is below 0.70", () => {
      const result = calculateAmpsToWatts({
        currentAmps: 15,
        voltage: 120,
        currentType: "ac_single",
        powerFactor: 0.65,
      });

      expect(result.isValid).toBe(true);
      expect(result.warnings.some((w) => w.includes("Low power factor"))).toBe(true);
    });
  });

  // 6. Preset Libraries
  describe("6. Preset Libraries Integrity", () => {
    it("contains valid voltage quick-select options", () => {
      expect(COMMON_CIRCUIT_VOLTAGES.length).toBeGreaterThanOrEqual(8);
      const voltages = COMMON_CIRCUIT_VOLTAGES.map((v) => v.value);
      expect(voltages).toContain(12);
      expect(voltages).toContain(120);
      expect(voltages).toContain(208);
      expect(voltages).toContain(240);
      expect(voltages).toContain(277);
      expect(voltages).toContain(480);
    });

    it("computes valid results for all built-in AMPS_TO_WATTS_PRESETS", () => {
      for (const preset of AMPS_TO_WATTS_PRESETS) {
        const result = calculateAmpsToWatts({
          currentAmps: preset.amps,
          voltage: preset.voltage,
          currentType: preset.system,
          voltageType: preset.voltageType,
          powerFactor: preset.pf,
        });

        expect(result.isValid).toBe(true);
        expect(result.powerWatts).toBeGreaterThan(0);
        expect(result.errors.length).toBe(0);
      }
    });
  });

  // 7. Amps to Watts Static Reference Table & Conversion Benchmarks
  describe("7. Static Reference Table Integrity", () => {
    it("contains exactly the 23 target amperages requested for SEO coverage", () => {
      const expectedAmps = [
        1, 1.3, 1.5, 2.4, 2.5, 3, 4, 4.2, 6, 6.5, 8, 8.5, 10, 12.5, 13, 15, 20, 30, 40, 50, 80, 100, 200,
      ];
      expect(AMPS_TO_WATTS_REFERENCE_AMPS).toEqual(expectedAmps);
      expect(AMPS_TO_WATTS_REFERENCE_DATA).toHaveLength(23);
    });

    it("verifies mathematical precision of all 23 rows across DC, 120V AC, and 240V AC", () => {
      for (const row of AMPS_TO_WATTS_REFERENCE_DATA) {
        const expectedDc = Math.round((12 * row.amps + Number.EPSILON) * 100) / 100;
        const expected120v = Math.round((120 * row.amps + Number.EPSILON) * 100) / 100;
        const expected120vCont = Math.round((120 * row.amps * 0.8 + Number.EPSILON) * 100) / 100;
        const expected240v = Math.round((240 * row.amps + Number.EPSILON) * 100) / 100;
        const expected240vCont = Math.round((240 * row.amps * 0.8 + Number.EPSILON) * 100) / 100;

        expect(row.dc12vWatts).toBe(expectedDc);
        expect(row.ac120vWatts).toBe(expected120v);
        expect(row.ac120vContinuousWatts).toBe(expected120vCont);
        expect(row.ac240vWatts).toBe(expected240v);
        expect(row.ac240vContinuousWatts).toBe(expected240vCont);
      }
    });

    it("verifies specific GSC search query benchmark rows (10A, 15A, 20A, 200A)", () => {
      // 10A benchmark (True power query)
      const row10A = AMPS_TO_WATTS_REFERENCE_DATA.find((r) => r.amps === 10);
      expect(row10A).toBeDefined();
      expect(row10A?.dc12vWatts).toBe(120);
      expect(row10A?.ac120vWatts).toBe(1200);
      expect(row10A?.ac120vContinuousWatts).toBe(960);
      expect(row10A?.ac240vWatts).toBe(2400);
      expect(row10A?.ac240vContinuousWatts).toBe(1920);

      // 15A benchmark (15 amps to watts query)
      const row15A = AMPS_TO_WATTS_REFERENCE_DATA.find((r) => r.amps === 15);
      expect(row15A).toBeDefined();
      expect(row15A?.dc12vWatts).toBe(180);
      expect(row15A?.ac120vWatts).toBe(1800);
      expect(row15A?.ac120vContinuousWatts).toBe(1440);
      expect(row15A?.ac240vWatts).toBe(3600);
      expect(row15A?.ac240vContinuousWatts).toBe(2880);

      // 20A benchmark
      const row20A = AMPS_TO_WATTS_REFERENCE_DATA.find((r) => r.amps === 20);
      expect(row20A).toBeDefined();
      expect(row20A?.dc12vWatts).toBe(240);
      expect(row20A?.ac120vWatts).toBe(2400);
      expect(row20A?.ac120vContinuousWatts).toBe(1920);
      expect(row20A?.ac240vWatts).toBe(4800);
      expect(row20A?.ac240vContinuousWatts).toBe(3840);

      // 200A benchmark (200 amps to watts query)
      const row200A = AMPS_TO_WATTS_REFERENCE_DATA.find((r) => r.amps === 200);
      expect(row200A).toBeDefined();
      expect(row200A?.dc12vWatts).toBe(2400);
      expect(row200A?.ac120vWatts).toBe(24000);
      expect(row200A?.ac120vContinuousWatts).toBe(19200);
      expect(row200A?.ac240vWatts).toBe(48000);
      expect(row200A?.ac240vContinuousWatts).toBe(38400);
    });

    it("verifies fractional amperage rows calculate correctly (1.3A, 4.2A, 8.5A, 12.5A)", () => {
      const row1_3A = buildAmpsToWattsReferenceRow(1.3);
      expect(row1_3A.dc12vWatts).toBe(15.6);
      expect(row1_3A.ac120vWatts).toBe(156);
      expect(row1_3A.ac120vContinuousWatts).toBe(124.8);
      expect(row1_3A.ac240vWatts).toBe(312);
      expect(row1_3A.ac240vContinuousWatts).toBe(249.6);

      const row4_2A = buildAmpsToWattsReferenceRow(4.2);
      expect(row4_2A.dc12vWatts).toBe(50.4);
      expect(row4_2A.ac120vWatts).toBe(504);
      expect(row4_2A.ac120vContinuousWatts).toBe(403.2);
      expect(row4_2A.ac240vWatts).toBe(1008);
      expect(row4_2A.ac240vContinuousWatts).toBe(806.4);

      const row8_5A = buildAmpsToWattsReferenceRow(8.5);
      expect(row8_5A.dc12vWatts).toBe(102);
      expect(row8_5A.ac120vWatts).toBe(1020);
      expect(row8_5A.ac120vContinuousWatts).toBe(816);
      expect(row8_5A.ac240vWatts).toBe(2040);
      expect(row8_5A.ac240vContinuousWatts).toBe(1632);

      const row12_5A = buildAmpsToWattsReferenceRow(12.5);
      expect(row12_5A.dc12vWatts).toBe(150);
      expect(row12_5A.ac120vWatts).toBe(1500);
      expect(row12_5A.ac120vContinuousWatts).toBe(1200);
      expect(row12_5A.ac240vWatts).toBe(3000);
      expect(row12_5A.ac240vContinuousWatts).toBe(2400);
    });
  });
});
