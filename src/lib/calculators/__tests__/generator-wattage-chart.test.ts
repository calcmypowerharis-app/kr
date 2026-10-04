import { describe, expect, it } from "vitest";
import {
  APPLIANCE_WATTAGE_DATA,
  CATEGORY_OPTIONS,
  filterWattageChartData,
  calculateSelectedWattageSummary,
  WattageChartItem,
} from "../generator-wattage-chart";

describe("Generator Wattage Chart Logic & Dataset", () => {
  describe("1. Dataset Integrity & Engineering Constraints", () => {
    it("contains at least 35 verified US appliance wattage entries", () => {
      expect(APPLIANCE_WATTAGE_DATA.length).toBeGreaterThanOrEqual(35);
    });

    it("verifies all entries have valid positive running watts and starting watts >= running watts", () => {
      for (const item of APPLIANCE_WATTAGE_DATA) {
        expect(item.runningWatts).toBeGreaterThan(0);
        expect(item.startingWatts).toBeGreaterThanOrEqual(item.runningWatts);
        expect(item.surgeDelta).toBe(item.startingWatts - item.runningWatts);
        expect(item.name.trim().length).toBeGreaterThan(3);
        expect(item.notes.trim().length).toBeGreaterThan(15);
      }
    });

    it("ensures purely resistive loads have exactly zero surge delta", () => {
      const resistiveLoads = APPLIANCE_WATTAGE_DATA.filter(
        (item) => item.surgeType === "Purely Resistive"
      );
      expect(resistiveLoads.length).toBeGreaterThanOrEqual(3);
      for (const item of resistiveLoads) {
        expect(item.surgeDelta).toBe(0);
        expect(item.startingWatts).toBe(item.runningWatts);
      }
    });

    it("ensures locked-rotor motor loads have positive surge delta", () => {
      const motorLoads = APPLIANCE_WATTAGE_DATA.filter(
        (item) => item.surgeType === "Locked-Rotor Motor"
      );
      expect(motorLoads.length).toBeGreaterThanOrEqual(10);
      for (const item of motorLoads) {
        expect(item.surgeDelta).toBeGreaterThan(0);
        expect(item.startingWatts).toBeGreaterThan(item.runningWatts);
      }
    });

    it("maps all items to valid defined category options", () => {
      const validCategories = new Set(
        CATEGORY_OPTIONS.filter((c) => c.id !== "all").map((c) => c.id)
      );
      for (const item of APPLIANCE_WATTAGE_DATA) {
        expect(validCategories.has(item.category)).toBe(true);
      }
    });
  });

  describe("2. Filtering and Sorting Engine", () => {
    it("returns all items when filter options are default or empty", () => {
      const result = filterWattageChartData(APPLIANCE_WATTAGE_DATA);
      expect(result.length).toBe(APPLIANCE_WATTAGE_DATA.length);
    });

    it("filters correctly by specific category", () => {
      const kitchenItems = filterWattageChartData(APPLIANCE_WATTAGE_DATA, {
        category: "Kitchen & Refrigeration",
      });
      expect(kitchenItems.length).toBeGreaterThanOrEqual(5);
      for (const item of kitchenItems) {
        expect(item.category).toBe("Kitchen & Refrigeration");
      }

      const hvacItems = filterWattageChartData(APPLIANCE_WATTAGE_DATA, {
        category: "Heating & Cooling",
      });
      expect(hvacItems.length).toBeGreaterThanOrEqual(5);
      for (const item of hvacItems) {
        expect(item.category).toBe("Heating & Cooling");
      }
    });

    it("filters correctly by search query matching name, notes, or watts", () => {
      const compressorResults = filterWattageChartData(APPLIANCE_WATTAGE_DATA, {
        query: "compressor",
      });
      expect(compressorResults.length).toBeGreaterThanOrEqual(2);

      const sumpPumpResults = filterWattageChartData(APPLIANCE_WATTAGE_DATA, {
        query: "sump pump",
      });
      expect(sumpPumpResults.length).toBeGreaterThanOrEqual(2);

      const wattResults = filterWattageChartData(APPLIANCE_WATTAGE_DATA, {
        query: "1500",
      });
      expect(wattResults.length).toBeGreaterThanOrEqual(3);
    });

    it("combines category and query filters accurately", () => {
      const result = filterWattageChartData(APPLIANCE_WATTAGE_DATA, {
        category: "Heating & Cooling",
        query: "window",
      });
      expect(result.length).toBe(2);
      expect(result.every((r) => r.category === "Heating & Cooling")).toBe(true);
      expect(result.every((r) => r.name.toLowerCase().includes("window"))).toBe(true);
    });

    it("sorts correctly by runningWatts descending by default", () => {
      const sorted = filterWattageChartData(APPLIANCE_WATTAGE_DATA, {
        sortBy: "runningWatts",
        sortOrder: "desc",
      });
      for (let i = 0; i < sorted.length - 1; i++) {
        expect(sorted[i].runningWatts).toBeGreaterThanOrEqual(sorted[i + 1].runningWatts);
      }
    });

    it("sorts correctly by startingWatts ascending", () => {
      const sorted = filterWattageChartData(APPLIANCE_WATTAGE_DATA, {
        sortBy: "startingWatts",
        sortOrder: "asc",
      });
      for (let i = 0; i < sorted.length - 1; i++) {
        expect(sorted[i].startingWatts).toBeLessThanOrEqual(sorted[i + 1].startingWatts);
      }
    });

    it("sorts correctly by name alphabetically", () => {
      const sorted = filterWattageChartData(APPLIANCE_WATTAGE_DATA, {
        sortBy: "name",
        sortOrder: "asc",
      });
      for (let i = 0; i < sorted.length - 1; i++) {
        expect(sorted[i].name.localeCompare(sorted[i + 1].name)).toBeLessThanOrEqual(0);
      }
    });
  });

  describe("3. Simultaneous Demand & Surge Calculation (Single-Largest-Surge Rule)", () => {
    it("returns zero metrics for empty selection", () => {
      const summary = calculateSelectedWattageSummary([]);
      expect(summary.selectedCount).toBe(0);
      expect(summary.totalRunningWatts).toBe(0);
      expect(summary.largestSurgeDelta).toBe(0);
      expect(summary.largestSurgeAppliance).toBe("None");
      expect(summary.peakDemandWatts).toBe(0);
      expect(summary.recommendedGeneratorWatts).toBe(0);
    });

    it("calculates single appliance accurately", () => {
      const fridge = APPLIANCE_WATTAGE_DATA.find((i) => i.id === "refrigerator-standard")!;
      const summary = calculateSelectedWattageSummary([fridge]);

      expect(summary.selectedCount).toBe(1);
      expect(summary.totalRunningWatts).toBe(700);
      expect(summary.largestSurgeDelta).toBe(800);
      expect(summary.largestSurgeAppliance).toBe(fridge.name);
      expect(summary.peakDemandWatts).toBe(1500); // 700 + 800
      // 1500 * 1.25 = 1875 -> rounded up to next 100W is 1900W
      expect(summary.recommendedGeneratorWatts).toBe(1900);
    });

    it("applies the Single-Largest-Surge Delta rule across multiple concurrent appliances", () => {
      const fridge = APPLIANCE_WATTAGE_DATA.find((i) => i.id === "refrigerator-standard")!; // 700W run, 1500W start (delta 800)
      const windowAC = APPLIANCE_WATTAGE_DATA.find((i) => i.id === "window-ac-12k")!; // 1200W run, 2800W start (delta 1600)
      const tv = APPLIANCE_WATTAGE_DATA.find((i) => i.id === "smart-tv-65")!; // 120W run, 120W start (delta 0)

      const summary = calculateSelectedWattageSummary([fridge, windowAC, tv]);

      expect(summary.selectedCount).toBe(3);
      // Total Running: 700 + 1200 + 120 = 2020 W
      expect(summary.totalRunningWatts).toBe(2020);
      // Largest surge delta is Window AC: 1600 W
      expect(summary.largestSurgeDelta).toBe(1600);
      expect(summary.largestSurgeAppliance).toBe(windowAC.name);
      // Peak Starting Demand: 2020 + 1600 = 3620 W
      expect(summary.peakDemandWatts).toBe(3620);
      // Planning capacity (1.25x reserve): 3620 * 1.25 = 4525 W -> rounded up to 4600 W
      expect(summary.recommendedGeneratorWatts).toBe(4600);
    });

    it("handles workshop load benchmark (Table Saw + Shop Vac + Battery Charger)", () => {
      const tableSaw = APPLIANCE_WATTAGE_DATA.find((i) => i.id === "table-saw")!; // 1800W run, 3800W start (delta 2000)
      const shopVac = APPLIANCE_WATTAGE_DATA.find((i) => i.id === "shop-vacuum")!; // 1200W run, 2000W start (delta 800)
      const charger = APPLIANCE_WATTAGE_DATA.find((i) => i.id === "battery-charger-12v")!; // 250W run, 250W start (delta 0)

      const summary = calculateSelectedWattageSummary([tableSaw, shopVac, charger]);

      expect(summary.selectedCount).toBe(3);
      expect(summary.totalRunningWatts).toBe(3250); // 1800 + 1200 + 250
      expect(summary.largestSurgeDelta).toBe(2000);
      expect(summary.largestSurgeAppliance).toBe(tableSaw.name);
      expect(summary.peakDemandWatts).toBe(5250); // 3250 + 2000
      // 5250 * 1.25 = 6562.5 -> ceil(65.625) * 100 = 6600 W
      expect(summary.recommendedGeneratorWatts).toBe(6600);
    });
  });
});
