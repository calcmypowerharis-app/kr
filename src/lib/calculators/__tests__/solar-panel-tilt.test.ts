import { describe, it, expect } from "vitest";
import {
  calculateSolarPanelTilt,
  calculateRoofAngleFromRise,
  calculatePitchRiseFromAngle,
  calculateLandauTilt,
  calculateSeasonalTilts,
  ROOF_PITCH_PRESETS,
  US_REGION_PRESETS,
} from "../solar-panel-tilt";

describe("Solar Panel Tilt & Angle Calculator Library", () => {
  describe("1. Roof Pitch & Geometric Conversions (Tier A)", () => {
    it("converts common roof pitch rises to accurate angles in degrees", () => {
      // 0/12 = 0 deg
      expect(calculateRoofAngleFromRise(0)).toBe(0);

      // 4/12 pitch = atan(4/12) * 180 / PI = 18.43 deg
      const pitch4 = calculateRoofAngleFromRise(4);
      expect(pitch4).toBeCloseTo(18.43, 1);

      // 6/12 pitch = atan(6/12) * 180 / PI = 26.57 deg
      const pitch6 = calculateRoofAngleFromRise(6);
      expect(pitch6).toBeCloseTo(26.57, 1);

      // 8/12 pitch = atan(8/12) * 180 / PI = 33.69 deg
      const pitch8 = calculateRoofAngleFromRise(8);
      expect(pitch8).toBeCloseTo(33.69, 1);

      // 12/12 pitch = atan(12/12) * 180 / PI = 45.00 deg
      const pitch12 = calculateRoofAngleFromRise(12);
      expect(pitch12).toBe(45);
    });

    it("converts angle in degrees back to pitch rise (inches per 12 inches run)", () => {
      expect(calculatePitchRiseFromAngle(0)).toBe(0);
      expect(calculatePitchRiseFromAngle(45)).toBeCloseTo(12.0, 1);
      expect(calculatePitchRiseFromAngle(18.43)).toBeCloseTo(4.0, 1);
      expect(calculatePitchRiseFromAngle(26.57)).toBeCloseTo(6.0, 1);
    });

    it("verifies all predefined roof pitch presets have matching rise and angle values", () => {
      for (const preset of ROOF_PITCH_PRESETS) {
        if (preset.rise === 0) {
          expect(preset.angleDeg).toBe(0);
        } else {
          const calcAngle = calculateRoofAngleFromRise(preset.rise);
          expect(preset.angleDeg).toBeCloseTo(calcAngle, 1);
        }
      }
    });

    it("calculates exact geometric angle difference between target tilt and roof pitch", () => {
      const res = calculateSolarPanelTilt({
        latitude: 38,
        mountingType: "roof",
        optimizationTarget: "year_round",
        roofPitchType: "preset",
        roofPitchRise: 4, // 18.43 deg
      });

      expect(res.isValid).toBe(true);
      // Landau at 38 deg: 38 * 0.76 + 3.1 = 31.98 -> 32.0 deg
      expect(res.recommendedTilt).toBeCloseTo(32.0, 1);
      expect(res.roofAngleDeg).toBeCloseTo(18.43, 1);
      // Angle diff: 32.0 - 18.4 = +13.6 deg
      expect(res.angleDifferenceDeg).toBeCloseTo(13.6, 1);
      expect(res.angleDifferenceFormatted).toContain("+13.6°");
      expect(res.roofComparisonNote).toContain("Geometric difference only");
    });
  });

  describe("2. Documented Rules of Thumb & Heuristics (Tier B)", () => {
    it("computes Landau empirical formula correctly within valid 25°–50° range", () => {
      // tilt = (lat * 0.76) + 3.1
      expect(calculateLandauTilt(25)).toBe(22.1); // 25 * 0.76 + 3.1 = 22.1
      expect(calculateLandauTilt(38)).toBe(32.0); // 38 * 0.76 + 3.1 = 31.98 -> 32.0
      expect(calculateLandauTilt(50)).toBe(41.1); // 50 * 0.76 + 3.1 = 41.1
    });

    it("computes seasonal planning tilts accurately across latitude", () => {
      const seasonal38 = calculateSeasonalTilts(38);
      // Winter: 38 + 15 = 53
      expect(seasonal38.winterTilt).toBe(53);
      // Summer: 38 - 15 = 23
      expect(seasonal38.summerTilt).toBe(23);
      // Equinox: 38
      expect(seasonal38.equinoxTilt).toBe(38);
      // Year-round: Landau = 32.0
      expect(seasonal38.yearRoundTilt).toBe(32.0);
    });

    it("clamps summer tilt to 0° at low latitudes to prevent negative tilt", () => {
      const seasonal10 = calculateSeasonalTilts(10);
      expect(seasonal10.winterTilt).toBe(25);
      expect(seasonal10.summerTilt).toBe(0); // max(0, 10 - 15) = 0
      expect(seasonal10.equinoxTilt).toBe(10);
    });

    it("uses latitude rule of thumb outside 25°–50° range for year-round optimization", () => {
      // Below 25 deg (e.g. 15 deg)
      const resLow = calculateSolarPanelTilt({
        latitude: 15,
        mountingType: "ground",
        optimizationTarget: "year_round",
      });
      expect(resLow.recommendedTilt).toBe(15);
      expect(resLow.methodUsed).toContain("Latitude Rule-of-Thumb Baseline");

      // Above 50 deg (e.g. 60 deg Alaska)
      const resHigh = calculateSolarPanelTilt({
        latitude: 60,
        mountingType: "ground",
        optimizationTarget: "year_round",
      });
      expect(resHigh.recommendedTilt).toBe(60);
      expect(resHigh.methodUsed).toContain("Latitude Rule-of-Thumb Baseline");
    });

    it("applies winter optimization target (Latitude + 15°)", () => {
      const res = calculateSolarPanelTilt({
        latitude: 40,
        mountingType: "ground",
        optimizationTarget: "winter",
      });
      expect(res.recommendedTilt).toBe(55);
      expect(res.methodUsed).toContain("Winter Heuristic Estimate");
    });

    it("applies summer optimization target (Latitude - 15°)", () => {
      const res = calculateSolarPanelTilt({
        latitude: 40,
        mountingType: "ground",
        optimizationTarget: "summer",
      });
      expect(res.recommendedTilt).toBe(25);
      expect(res.methodUsed).toContain("Summer Heuristic Estimate");
    });
  });

  describe("3. Hemisphere & Orientation / Azimuth Guidance", () => {
    it("assigns True South (180° azimuth) to Northern Hemisphere locations", () => {
      const res = calculateSolarPanelTilt({
        latitude: 34,
        mountingType: "ground",
        optimizationTarget: "year_round",
      });
      expect(res.hemisphere).toBe("north");
      expect(res.azimuthDeg).toBe(180);
      expect(res.azimuthDirection).toBe("True South");
      expect(res.orientationNotes).toContain("True South");
      expect(res.orientationNotes).toContain("magnetic declination");
    });

    it("assigns True North (0° azimuth) to Southern Hemisphere locations", () => {
      const res = calculateSolarPanelTilt({
        latitude: -33.8, // Sydney, Australia
        mountingType: "ground",
        optimizationTarget: "year_round",
      });
      expect(res.hemisphere).toBe("south");
      expect(res.absLatitude).toBeCloseTo(33.8, 1);
      expect(res.azimuthDeg).toBe(0);
      expect(res.azimuthDirection).toBe("True North");
      expect(res.orientationNotes).toContain("True North");
    });

    it("handles Equator (0° latitude) gracefully", () => {
      const res = calculateSolarPanelTilt({
        latitude: 0,
        mountingType: "ground",
        optimizationTarget: "year_round",
      });
      expect(res.hemisphere).toBe("equator");
      expect(res.recommendedTilt).toBe(0);
    });
  });

  describe("4. Mounting Mode & Advisory Flags", () => {
    it("flags low tilt (< 10°) with non-dogmatic drainage advisory", () => {
      const res = calculateSolarPanelTilt({
        latitude: 5,
        mountingType: "ground",
        optimizationTarget: "year_round",
      });
      expect(res.isLowTilt).toBe(true);
      expect(res.lowTiltNote).toBeDefined();
      expect(res.lowTiltNote).toContain("rainwater drainage is reduced");
      // Must NOT claim panels cannot operate below 10°
      expect(res.lowTiltNote).toContain("drainage guideline rather than an absolute physical requirement");
    });

    it("provides snow shedding advisory for northern latitudes", () => {
      const res = calculateSolarPanelTilt({
        latitude: 45,
        mountingType: "ground",
        optimizationTarget: "year_round",
      });
      expect(res.snowNote).toBeDefined();
      expect(res.snowNote).toContain("steeper tilt can improve natural snow shedding");
      expect(res.snowNote).toContain("actual snow clearing depends on");
    });

    it("provides RV and portable mount travel advisory when adjustable is selected", () => {
      const res = calculateSolarPanelTilt({
        latitude: 35,
        mountingType: "adjustable",
        optimizationTarget: "winter",
      });
      expect(res.rvNote).toBeDefined();
      expect(res.rvNote).toContain("Adjustable RV and portable ground mounts");
      expect(res.rvNote).toContain("secure and lock adjustable panels in their flat travel position");
    });
  });

  describe("5. Boundary Conditions & Input Validation", () => {
    it("validates boundary latitudes (-90°, 0°, +90°)", () => {
      const resNorthPole = calculateSolarPanelTilt({
        latitude: 90,
        mountingType: "ground",
        optimizationTarget: "year_round",
      });
      expect(resNorthPole.isValid).toBe(true);
      expect(resNorthPole.recommendedTilt).toBe(90);

      const resSouthPole = calculateSolarPanelTilt({
        latitude: -90,
        mountingType: "ground",
        optimizationTarget: "year_round",
      });
      expect(resSouthPole.isValid).toBe(true);
      expect(resSouthPole.recommendedTilt).toBe(90);
    });

    it("rejects latitudes outside -90° to +90°", () => {
      const resTooHigh = calculateSolarPanelTilt({
        latitude: 95,
        mountingType: "ground",
        optimizationTarget: "year_round",
      });
      expect(resTooHigh.isValid).toBe(false);
      expect(resTooHigh.errors[0]).toContain("between -90° (South Pole) and +90°");

      const resTooLow = calculateSolarPanelTilt({
        latitude: -100,
        mountingType: "ground",
        optimizationTarget: "year_round",
      });
      expect(resTooLow.isValid).toBe(false);
    });

    it("handles custom roof pitch angle cleanly", () => {
      const res = calculateSolarPanelTilt({
        latitude: 38,
        mountingType: "roof",
        optimizationTarget: "year_round",
        roofPitchType: "custom",
        customRoofAngleDeg: 25,
      });
      expect(res.isValid).toBe(true);
      expect(res.roofAngleDeg).toBe(25);
      expect(res.roofPitchRise).toBeCloseTo(5.6, 1);
    });

    it("rejects invalid custom roof angle (< 0° or > 90°)", () => {
      const res = calculateSolarPanelTilt({
        latitude: 38,
        mountingType: "roof",
        optimizationTarget: "year_round",
        roofPitchType: "custom",
        customRoofAngleDeg: -5,
      });
      expect(res.isValid).toBe(false);
      expect(res.errors[0]).toContain("Custom roof angle must be a valid number between 0° and 90°");
    });
  });

  describe("6. US Reference Region Presets", () => {
    it("verifies all US region presets produce valid calculations", () => {
      for (const region of US_REGION_PRESETS) {
        const res = calculateSolarPanelTilt({
          latitude: region.latitude,
          mountingType: "ground",
          optimizationTarget: "year_round",
        });
        expect(res.isValid).toBe(true);
        expect(res.recommendedTilt).toBeGreaterThan(0);
        expect(res.recommendedTilt).toBeLessThan(65);
      }
    });
  });
});
