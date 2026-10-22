import { describe, it, expect } from "vitest";
import {
  HARDWARE_CATALOG,
  getHardwareClusterForSlug,
} from "@/lib/monetization/hardware-catalog";
import { getMatchRecommendation } from "@/components/monetization/ResultHardwareMatchBar";
import { getAmazonSearchUrl, AMAZON_LINK_REL } from "@/config/affiliate";

describe("Hardware Catalog & Dynamic Amazon Matching Engine", () => {
  it("provides complete 3-tier clusters for all supported domains", () => {
    const clusters = Object.keys(HARDWARE_CATALOG);
    expect(clusters.length).toBeGreaterThanOrEqual(5);

    for (const key of clusters) {
      const cluster = HARDWARE_CATALOG[key];
      expect(cluster.clusterTitle).toBeTruthy();
      expect(cluster.subtitle).toBeTruthy();
      expect(cluster.items.length).toBe(3);

      cluster.items.forEach((item, idx) => {
        expect(item.id).toBeTruthy();
        expect(item.title).toBeTruthy();
        expect(item.brand).toBeTruthy();
        expect(item.badge).toBeTruthy();
        expect(["amber", "blue", "emerald"]).toContain(item.ribbonColor);
        expect(item.priceTier).toContain("Typical Range:");
        expect(item.rating).toBeTruthy();
        expect(item.specs.length).toBe(3);
        expect(item.description).toBeTruthy();
        expect(item.searchQuery).toBeTruthy();
        expect(item.iconName).toBeTruthy();

        // Enforce zero em-dashes and zero en-dashes in catalog text
        expect(item.title).not.toContain("\u2014");
        expect(item.title).not.toContain("\u2013");
        expect(item.description).not.toContain("\u2014");
        expect(item.description).not.toContain("\u2013");
      });
    }
  });

  it("resolves correct cluster by calculator slug", () => {
    expect(getHardwareClusterForSlug("generator-size-calculator")).toBe(
      HARDWARE_CATALOG.generators
    );
    expect(getHardwareClusterForSlug("ups-battery-backup-calculator")).toBe(
      HARDWARE_CATALOG["ups-battery"]
    );
    expect(getHardwareClusterForSlug("electricity-use-calculator")).toBe(
      HARDWARE_CATALOG.electricity
    );
    expect(getHardwareClusterForSlug("amps-to-watts-calculator")).toBe(
      HARDWARE_CATALOG["electrical-tools"]
    );
    expect(getHardwareClusterForSlug("solar-charge-controller-calculator")).toBe(
      HARDWARE_CATALOG.solar
    );
    // Fallback
    expect(getHardwareClusterForSlug("unknown-slug")).toBe(HARDWARE_CATALOG.solar);
  });

  describe("Dynamic Matched Hardware Sizing Logic", () => {
    it("dynamically sizes generator hardware to calculated wattage tiers", () => {
      const small = getMatchRecommendation("generator-size-calculator", 2000);
      expect(small.label).toContain("2,200W-2,500W Quiet Inverter");
      expect(small.buttonText).toContain("View Matched Generators");

      const medium = getMatchRecommendation("generator-size-calculator", 4500);
      expect(medium.label).toContain("3,500W-5,500W Dual-Fuel Inverter");

      const large = getMatchRecommendation("generator-size-calculator", 8000);
      expect(large.label).toContain("7,500W-9,500W Home Backup");

      const standby = getMatchRecommendation("generator-size-calculator", 14000);
      expect(standby.label).toContain("12kW-24kW Whole-House Standby");
    });

    it("dynamically sizes battery bank hardware to calculated Ah tiers", () => {
      const tier1 = getMatchRecommendation("battery-capacity-calculator", 100);
      expect(tier1.label).toContain("12V 100Ah LiFePO4");

      const tier2 = getMatchRecommendation("battery-capacity-calculator", 200);
      expect(tier2.label).toContain("12V 200Ah Plus LiFePO4");

      const tier3 = getMatchRecommendation("battery-capacity-calculator", 500);
      expect(tier3.label).toContain("48V 100Ah Server Rack");
    });

    it("matches UPS runtime calculator to 1500VA pure sine wave systems", () => {
      const match = getMatchRecommendation("ups-battery-backup-calculator", 350);
      expect(match.label).toContain("CyberPower CP1500PFCLCD / APC 1500VA");
      expect(match.buttonText).toContain("1500VA UPS");
    });

    it("matches energy audit calculators to Kill A Watt and Emporia meters", () => {
      const matchUse = getMatchRecommendation("electricity-use-calculator", 450);
      expect(matchUse.label).toContain("P3 Kill A Watt");

      const matchCost = getMatchRecommendation("electricity-cost-calculator", 120);
      expect(matchCost.label).toContain("P3 Kill A Watt");
    });

    it("dynamically sizes electrical tools to circuit amperage", () => {
      const fifteen = getMatchRecommendation("amps-to-watts-calculator", 12);
      expect(fifteen.label).toContain("15A circuits");

      const twenty = getMatchRecommendation("amps-to-watts-calculator", 19);
      expect(twenty.label).toContain("20A circuits");

      const thirty = getMatchRecommendation("watts-to-amps-calculator", 28);
      expect(thirty.label).toContain("30A circuits");

      const fifty = getMatchRecommendation("voltage-drop-calculator", 65);
      expect(fifty.label).toContain("50A+ heavy service");
    });

    it("dynamically sizes solar controllers to array amperage", () => {
      const small = getMatchRecommendation("solar-charge-controller-calculator", 20);
      expect(small.label).toContain("20A-30A Victron SmartSolar");

      const medium = getMatchRecommendation("solar-charge-controller-calculator", 35);
      expect(medium.label).toContain("40A Victron SmartSolar");

      const commercial = getMatchRecommendation("solar-charge-controller-calculator", 60);
      expect(commercial.label).toContain("60A-100A Commercial MPPT");
    });

    it("builds compliant Amazon URLs with valid tag and rel attributes", () => {
      const match = getMatchRecommendation("generator-size-calculator", 3500);
      const url = getAmazonSearchUrl(match.searchQuery);

      expect(url).toContain("tag=thedeskriser2-20");
      expect(url).toContain("amazon.com/s?k=");
      expect(AMAZON_LINK_REL).toBe("sponsored nofollow noopener noreferrer");
    });
  });
});
