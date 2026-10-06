import { describe, it, expect } from "vitest";
import {
  calculateEnergyCharge,
  calculateEffectiveRate,
  calculateElectricityBill,
  ELECTRICITY_COST_PRESETS,
  EIA_US_AVERAGE_RESIDENTIAL_RATE,
  EIA_US_AVERAGE_MONTHLY_KWH,
} from "../electricity-cost";

describe("Electricity Cost Calculation Engine", () => {
  describe("Helper Functions", () => {
    it("calculateEnergyCharge correctly multiplies kWh by rate", () => {
      expect(calculateEnergyCharge(900, 0.16)).toBe(144.0);
      expect(calculateEnergyCharge(450, 0.16)).toBe(72.0);
      expect(calculateEnergyCharge(1500, 0.18)).toBe(270.0);
      expect(calculateEnergyCharge(0, 0.16)).toBe(0);
      expect(calculateEnergyCharge(900, 0)).toBe(0);
      expect(calculateEnergyCharge(-100, 0.16)).toBe(0);
    });

    it("calculateEffectiveRate calculates total bill divided by kWh", () => {
      // 185.00 / 900 = 0.205555... -> 0.2056
      expect(calculateEffectiveRate(185.0, 900)).toBe(0.2056);
      expect(calculateEffectiveRate(144.0, 900)).toBe(0.16);
      expect(calculateEffectiveRate(0, 900)).toBe(0);
      expect(calculateEffectiveRate(185.0, 0)).toBe(0);
      expect(calculateEffectiveRate(-50, 900)).toBe(0);
    });
  });

  describe("Single Source of Truth Benchmark Scenario", () => {
    it("matches the authoritative benchmark: 900 kWh @ $0.16/kWh + $15 fixed + $18 riders + $8 tax = $185.00 ($0.2056/kWh)", () => {
      const result = calculateElectricityBill({
        monthlyKwh: 900,
        energyRate: 0.16,
        fixedMonthlyCharge: 15.0,
        additionalMonthlyCharges: 18.0,
        flatTaxAmount: 8.0,
        taxRatePercent: 0,
      });

      expect(result.hasInvalidInputs).toBe(false);
      expect(result.validationErrors.length).toBe(0);
      expect(result.energyCharge).toBe(144.0);
      expect(result.fixedMonthlyCharge).toBe(15.0);
      expect(result.additionalMonthlyCharges).toBe(18.0);
      expect(result.taxAmount).toBe(8.0);
      expect(result.totalEstimatedBill).toBe(185.0);
      expect(result.effectiveRatePerKwh).toBe(0.2056);
      expect(result.effectiveCentsPerKwh).toBe(20.56);
      expect(result.dailyEstimatedCost).toBe(6.17); // 185 / 30 = 6.1666... -> 6.17
      expect(result.annualEstimatedCost).toBe(2220.0); // 185 * 12 = 2220
      expect(result.lineItems.length).toBe(4);

      // Percentage contributions
      // 144 / 185 = 77.8%
      expect(result.lineItems[0].percentOfTotal).toBe(77.8);
      // 15 / 185 = 8.1%
      expect(result.lineItems[1].percentOfTotal).toBe(8.1);
      // 18 / 185 = 9.7%
      expect(result.lineItems[2].percentOfTotal).toBe(9.7);
      // 8 / 185 = 4.3%
      expect(result.lineItems[3].percentOfTotal).toBe(4.3);
    });
  });

  describe("Percentage Tax and Hybrid Taxes", () => {
    it("calculates percentage tax correctly on subtotal", () => {
      // 1000 kWh @ 0.15 = $150
      // Fixed: $10, Riders: $10 -> Subtotal: $170
      // Tax: 5% of $170 = $8.50 -> Total: $178.50
      const result = calculateElectricityBill({
        monthlyKwh: 1000,
        energyRate: 0.15,
        fixedMonthlyCharge: 10.0,
        additionalMonthlyCharges: 10.0,
        taxRatePercent: 5.0,
        flatTaxAmount: 0,
      });

      expect(result.energyCharge).toBe(150.0);
      expect(result.taxAmount).toBe(8.5);
      expect(result.totalEstimatedBill).toBe(178.5);
      expect(result.effectiveRatePerKwh).toBe(0.1785);
      expect(result.effectiveCentsPerKwh).toBe(17.85);
    });

    it("combines percentage tax and flat municipal tax fee", () => {
      // 500 kWh @ 0.20 = $100
      // Fixed: $10 -> Subtotal: $110
      // Tax: 10% of $110 ($11.00) + $5.00 flat = $16.00
      // Total: $126.00
      const result = calculateElectricityBill({
        monthlyKwh: 500,
        energyRate: 0.2,
        fixedMonthlyCharge: 10.0,
        taxRatePercent: 10.0,
        flatTaxAmount: 5.0,
      });

      expect(result.energyCharge).toBe(100.0);
      expect(result.taxAmount).toBe(16.0);
      expect(result.totalEstimatedBill).toBe(126.0);
      expect(result.effectiveRatePerKwh).toBe(0.252);
    });
  });

  describe("Edge Cases and Boundary Protection", () => {
    it("handles zero kWh usage with non-zero fixed charge (vacant home / seasonal cottage)", () => {
      const result = calculateElectricityBill({
        monthlyKwh: 0,
        energyRate: 0.16,
        fixedMonthlyCharge: 15.0,
        additionalMonthlyCharges: 0,
        flatTaxAmount: 1.0,
      });

      expect(result.energyCharge).toBe(0);
      expect(result.fixedMonthlyCharge).toBe(15.0);
      expect(result.taxAmount).toBe(1.0);
      expect(result.totalEstimatedBill).toBe(16.0);
      expect(result.effectiveRatePerKwh).toBe(0);
      expect(result.effectiveCentsPerKwh).toBe(0);
      expect(result.dailyEstimatedCost).toBe(0.53);
    });

    it("handles commodity-only calculation with no fixed charges or taxes", () => {
      const result = calculateElectricityBill({
        monthlyKwh: 1000,
        energyRate: 0.14,
        fixedMonthlyCharge: 0,
        additionalMonthlyCharges: 0,
        taxRatePercent: 0,
        flatTaxAmount: 0,
      });

      expect(result.energyCharge).toBe(140.0);
      expect(result.totalEstimatedBill).toBe(140.0);
      expect(result.effectiveRatePerKwh).toBe(0.14);
      expect(result.effectiveCentsPerKwh).toBe(14.0);
    });

    it("captures validation errors when negative inputs are passed", () => {
      const result = calculateElectricityBill({
        monthlyKwh: -500,
        energyRate: -0.15,
        fixedMonthlyCharge: -10,
        additionalMonthlyCharges: -5,
        taxRatePercent: 120, // out of range
        flatTaxAmount: -2,
      });

      expect(result.hasInvalidInputs).toBe(true);
      expect(result.validationErrors.length).toBe(6);
      expect(result.energyCharge).toBe(0);
      expect(result.totalEstimatedBill).toBe(0);
    });
  });

  describe("Preset Library Verification", () => {
    it("validates all presets produce mathematically sound results", () => {
      ELECTRICITY_COST_PRESETS.forEach((preset) => {
        const result = calculateElectricityBill(preset);
        expect(result.hasInvalidInputs).toBe(false);
        expect(result.totalEstimatedBill).toBeGreaterThan(0);
        expect(result.effectiveRatePerKwh).toBeGreaterThan(0);
      });
    });

    it("first preset matches the U.S. Benchmark Household exactly", () => {
      const benchmarkPreset = ELECTRICITY_COST_PRESETS[0];
      expect(benchmarkPreset.id).toBe("us-average-benchmark");
      expect(benchmarkPreset.monthlyKwh).toBe(900);
      expect(benchmarkPreset.energyRate).toBe(0.16);
      expect(benchmarkPreset.fixedMonthlyCharge).toBe(15.0);
      expect(benchmarkPreset.additionalMonthlyCharges).toBe(18.0);
      expect(benchmarkPreset.flatTaxAmount).toBe(8.0);

      const result = calculateElectricityBill(benchmarkPreset);
      expect(result.totalEstimatedBill).toBe(185.0);
      expect(result.effectiveRatePerKwh).toBe(0.2056);
    });
  });

  describe("National EIA Benchmark Comparison", () => {
    it("exports standard EIA constants and computes relative delta", () => {
      expect(EIA_US_AVERAGE_RESIDENTIAL_RATE).toBe(0.165);
      expect(EIA_US_AVERAGE_MONTHLY_KWH).toBe(900);

      const result = calculateElectricityBill({
        monthlyKwh: 900,
        energyRate: 0.16,
        fixedMonthlyCharge: 15.0,
        additionalMonthlyCharges: 18.0,
        flatTaxAmount: 8.0,
      });

      // Total bill is $185, benchmark is $158
      // Difference = $27.00
      expect(result.benchmarkComparison.differenceFromAverageDollars).toBe(27.0);
      expect(result.benchmarkComparison.differenceFromAveragePercent).toBe(17.1);
    });
  });
});
