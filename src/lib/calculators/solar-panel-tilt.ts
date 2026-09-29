/**
 * Solar Panel Tilt & Angle Calculator Library
 * CalcMyPower.com
 *
 * Mathematical and heuristic methodology for solar panel tilt angles,
 * roof pitch conversions, and compass orientation guidance.
 *
 * Methodology Tiers:
 * Tier A: Exact mathematical & geometric calculations (roof pitch, angle difference)
 * Tier B: Documented rules of thumb & empirical heuristics (latitude baseline, seasonal +/-15, Landau)
 * Tier C: Site-specific production simulation (explicitly deferred to NREL PVWatts)
 */

export type MountingType = "ground" | "roof" | "adjustable";
export type OptimizationTarget = "year_round" | "winter" | "summer";
export type Hemisphere = "north" | "south" | "equator";

export interface UsRegionPreset {
  id: string;
  name: string;
  state: string;
  latitude: number;
  description: string;
}

export interface RoofPitchPreset {
  id: string;
  label: string;
  rise: number; // e.g. 4 for 4/12
  angleDeg: number; // e.g. 18.43
}

export interface SolarPanelTiltInputs {
  latitude: number; // -90 to +90
  mountingType: MountingType;
  optimizationTarget: OptimizationTarget;
  roofPitchType?: "preset" | "custom";
  roofPitchRise?: number; // e.g. 4 for 4/12
  customRoofAngleDeg?: number; // custom angle in degrees (0 to 90)
}

export interface SeasonalTilts {
  winterTilt: number; // Latitude + 15 deg
  summerTilt: number; // max(0, Latitude - 15 deg)
  equinoxTilt: number; // Latitude
  yearRoundTilt: number; // Landau empirical if 25-50, else Latitude
}

export interface SolarPanelTiltResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];

  // Latitude & Hemisphere
  latitude: number;
  absLatitude: number;
  hemisphere: Hemisphere;
  hemisphereLabel: string;

  // Recommended Tilt
  recommendedTilt: number; // in degrees, e.g. 32.0
  recommendedTiltFormatted: string; // "32.0°"
  methodUsed: string;
  methodTier: "Tier A" | "Tier B" | "Tier C";
  methodDescription: string;

  // Seasonal Reference Values
  seasonal: SeasonalTilts;

  // Orientation / Azimuth
  azimuthDeg: number; // 180 for North Hemisphere (South), 0 for South Hemisphere (North)
  azimuthDirection: string; // "True South" or "True North"
  orientationNotes: string;

  // Roof pitch & comparison (when mountingType === "roof")
  roofAngleDeg?: number;
  roofPitchRise?: number;
  roofPitchFormatted?: string;
  angleDifferenceDeg?: number; // target_tilt - roof_angle
  angleDifferenceFormatted?: string;
  isFlushMountRecommended?: boolean;
  roofComparisonNote?: string;

  // Guidance flags
  isLowTilt: boolean;
  lowTiltNote?: string;
  isSteepTilt: boolean;
  snowNote?: string;
  rvNote?: string;
}

export const US_REGION_PRESETS: UsRegionPreset[] = [
  {
    id: "south_florida",
    name: "South Florida",
    state: "FL",
    latitude: 26,
    description: "Miami / Florida Keys (Subtropical)",
  },
  {
    id: "gulf_coast",
    name: "Texas / Gulf Coast",
    state: "TX",
    latitude: 30,
    description: "Houston / Austin / New Orleans",
  },
  {
    id: "central_us",
    name: "Central U.S.",
    state: "MO/CO",
    latitude: 39,
    description: "Denver / Kansas City / Washington DC",
  },
  {
    id: "northern_us",
    name: "Northern U.S.",
    state: "IL/NY",
    latitude: 42,
    description: "Chicago / New York / Boston / Detroit",
  },
  {
    id: "pacific_nw",
    name: "Pacific Northwest",
    state: "WA",
    latitude: 47,
    description: "Seattle / Portland / Upper Midwest",
  },
];

export const ROOF_PITCH_PRESETS: RoofPitchPreset[] = [
  { id: "flat", label: "Flat (0/12)", rise: 0, angleDeg: 0 },
  { id: "2_12", label: "2/12 pitch (~9.5°)", rise: 2, angleDeg: 9.46 },
  { id: "3_12", label: "3/12 pitch (~14.0°)", rise: 3, angleDeg: 14.04 },
  { id: "4_12", label: "4/12 pitch (~18.4°)", rise: 4, angleDeg: 18.43 },
  { id: "5_12", label: "5/12 pitch (~22.6°)", rise: 5, angleDeg: 22.62 },
  { id: "6_12", label: "6/12 pitch (~26.6°)", rise: 6, angleDeg: 26.57 },
  { id: "8_12", label: "8/12 pitch (~33.7°)", rise: 8, angleDeg: 33.69 },
  { id: "10_12", label: "10/12 pitch (~39.8°)", rise: 10, angleDeg: 39.81 },
  { id: "12_12", label: "12/12 pitch (45.0°)", rise: 12, angleDeg: 45.0 },
];

/**
 * Exact geometric conversion of roof pitch rise (in / 12 in) to angle in degrees.
 * theta_roof = atan(pitch / 12) * (180 / PI)
 */
export function calculateRoofAngleFromRise(rise: number): number {
  if (rise <= 0) return 0;
  return Number(((Math.atan(rise / 12) * 180) / Math.PI).toFixed(2));
}

/**
 * Calculate pitch rise (inches per 12 inches run) from an angle in degrees.
 * rise = 12 * tan(angle * PI / 180)
 */
export function calculatePitchRiseFromAngle(angleDeg: number): number {
  if (angleDeg <= 0) return 0;
  if (angleDeg >= 90) return 999;
  return Number((12 * Math.tan((angleDeg * Math.PI) / 180)).toFixed(2));
}

/**
 * Landau Empirical Fixed-Tilt Optimization Estimate.
 * Stated valid range: 25 deg to 50 deg latitude.
 * tilt = (latitude * 0.76) + 3.1 deg
 * Labeled: Empirical Fixed-Tilt Optimization Estimate.
 * Note: Not a universal physical law or NREL formula.
 */
export function calculateLandauTilt(latitude: number): number {
  const absLat = Math.abs(latitude);
  return Number((absLat * 0.76 + 3.1).toFixed(1));
}

/**
 * Heuristic seasonal planning tilts based on latitude.
 * Winter: Latitude + 15 deg
 * Summer: max(0, Latitude - 15 deg)
 * Spring/Fall (Equinox): Latitude
 * Year-Round: Landau empirical estimate if 25-50 deg, else Latitude rule of thumb.
 */
export function calculateSeasonalTilts(latitude: number): SeasonalTilts {
  const absLat = Math.abs(latitude);
  const winterTilt = Math.min(90, Number((absLat + 15).toFixed(1)));
  const summerTilt = Math.max(0, Number((absLat - 15).toFixed(1)));
  const equinoxTilt = Number(absLat.toFixed(1));
  const yearRoundTilt =
    absLat >= 25 && absLat <= 50
      ? calculateLandauTilt(absLat)
      : Number(absLat.toFixed(1));

  return {
    winterTilt,
    summerTilt,
    equinoxTilt,
    yearRoundTilt,
  };
}

/**
 * Core calculation function for Solar Panel Tilt & Angle.
 */
export function calculateSolarPanelTilt(
  inputs: SolarPanelTiltInputs
): SolarPanelTiltResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const rawLat = inputs.latitude;

  // Validation: Latitude bounds (-90 to +90)
  if (typeof rawLat !== "number" || isNaN(rawLat)) {
    errors.push("Latitude must be a valid number between -90° and +90°.");
  } else if (rawLat < -90 || rawLat > 90) {
    errors.push("Latitude must be between -90° (South Pole) and +90° (North Pole).");
  }

  // Validate roof pitch if roof mounting is selected
  let roofAngleDeg = 0;
  let roofPitchRise = 0;
  if (inputs.mountingType === "roof") {
    if (inputs.roofPitchType === "custom") {
      const customAngle = inputs.customRoofAngleDeg ?? 0;
      if (typeof customAngle !== "number" || isNaN(customAngle) || customAngle < 0 || customAngle > 90) {
        errors.push("Custom roof angle must be a valid number between 0° and 90°.");
      } else {
        roofAngleDeg = Number(customAngle.toFixed(1));
        roofPitchRise = calculatePitchRiseFromAngle(roofAngleDeg);
      }
    } else {
      const rise = inputs.roofPitchRise ?? 4;
      if (typeof rise !== "number" || isNaN(rise) || rise < 0) {
        errors.push("Roof pitch rise must be a positive number.");
      } else {
        roofPitchRise = rise;
        roofAngleDeg = calculateRoofAngleFromRise(rise);
      }
    }
  }

  if (errors.length > 0) {
    return {
      isValid: false,
      errors,
      warnings,
      latitude: rawLat,
      absLatitude: Math.abs(rawLat || 0),
      hemisphere: (rawLat || 0) < 0 ? "south" : (rawLat || 0) === 0 ? "equator" : "north",
      hemisphereLabel: "Unknown",
      recommendedTilt: 0,
      recommendedTiltFormatted: "0.0°",
      methodUsed: "None",
      methodTier: "Tier B",
      methodDescription: "Validation failed.",
      seasonal: { winterTilt: 0, summerTilt: 0, equinoxTilt: 0, yearRoundTilt: 0 },
      azimuthDeg: 180,
      azimuthDirection: "True South",
      orientationNotes: "Please correct input errors.",
      isLowTilt: false,
      isSteepTilt: false,
    };
  }

  const absLatitude = Math.abs(rawLat);
  const hemisphere: Hemisphere =
    rawLat > 0 ? "north" : rawLat < 0 ? "south" : "equator";

  const hemisphereLabel =
    hemisphere === "north"
      ? `Northern Hemisphere (${absLatitude.toFixed(1)}° N)`
      : hemisphere === "south"
      ? `Southern Hemisphere (${absLatitude.toFixed(1)}° S)`
      : "Equator (0.0°)";

  // Compute seasonal reference values
  const seasonal = calculateSeasonalTilts(rawLat);

  // Determine recommended tilt based on optimization target
  let recommendedTilt = 0;
  let methodUsed = "";
  let methodDescription = "";
  const methodTier: "Tier A" | "Tier B" | "Tier C" = "Tier B";

  if (inputs.optimizationTarget === "winter") {
    recommendedTilt = seasonal.winterTilt;
    methodUsed = "Winter Heuristic Estimate (Latitude + 15°)";
    methodDescription =
      "Heuristic planning estimate for maximizing cold-weather production when the sun travels lowest across the horizon. Steeper tilt captures low-angle solar rays and improves passive snow shedding.";
  } else if (inputs.optimizationTarget === "summer") {
    recommendedTilt = seasonal.summerTilt;
    methodUsed = "Summer Heuristic Estimate (Latitude - 15°)";
    methodDescription =
      "Heuristic planning estimate for peak midsummer irradiance when the sun reaches maximum zenith angle directly overhead.";
  } else {
    // Year-round target
    if (absLatitude >= 25 && absLatitude <= 50) {
      recommendedTilt = seasonal.yearRoundTilt;
      methodUsed = "Empirical Fixed-Tilt Optimization Estimate (Landau)";
      methodDescription =
        "Empirical formula for latitudes between 25° and 50°: Tilt = (Latitude × 0.76) + 3.1°. Balances longer summer daylight hours against lower winter sun elevation. Labeled as an empirical estimate, not a universal physical law or NREL formula.";
    } else {
      recommendedTilt = seasonal.equinoxTilt;
      methodUsed = "Latitude Rule-of-Thumb Baseline";
      methodDescription =
        "Rule-of-thumb baseline setting panel tilt approximately equal to geographic latitude. Best suited as a simple planning reference outside the 25° to 50° empirical range.";
    }
  }

  // Orientation / Compass Azimuth
  let azimuthDeg = 180;
  let azimuthDirection = "True South";
  let orientationNotes = "";

  if (hemisphere === "north") {
    azimuthDeg = 180;
    azimuthDirection = "True South";
    orientationNotes =
      "In the Northern Hemisphere, True South (180° azimuth) is the standard baseline for maximum annual solar harvest. Note that a magnetic compass points toward Magnetic North rather than True North; adjust for local magnetic declination when using a handheld compass. Panels do not need to face exactly True South; deviations of ±15° to 30° typically reduce annual yield by only 1% to 4%, and southwest or west orientations can be advantageous under Time-of-Use utility rate structures.";
  } else if (hemisphere === "south") {
    azimuthDeg = 0;
    azimuthDirection = "True North";
    orientationNotes =
      "In the Southern Hemisphere, True North (0° azimuth) is the standard baseline for maximum annual solar harvest. Align panels with True North rather than Magnetic North by adjusting for local magnetic declination.";
  } else {
    azimuthDeg = 180;
    azimuthDirection = "Overhead / Flexible";
    orientationNotes =
      "Near the Equator, the sun passes directly overhead twice per year. A very low tilt (around 10°) provides natural rainwater drainage while capturing near-vertical solar rays.";
  }

  // Low-tilt drainage guidance (Requirement 4)
  const isLowTilt = recommendedTilt < 10;
  let lowTiltNote: string | undefined;
  if (isLowTilt) {
    lowTiltNote =
      "Tilts below about 10° may require more frequent cleaning because rainwater drainage is reduced. Approximately 10° is an installer and manufacturer drainage guideline rather than an absolute physical requirement. Panels operate at flat angles, but dust and pollen wash off less effectively with rainfall.";
  }

  // Snow shedding guidance (Requirement 5)
  const isSteepTilt = recommendedTilt >= 40;
  let snowNote: string | undefined;
  if (absLatitude >= 38) {
    snowNote =
      "In cold climates, steeper tilt can improve natural snow shedding. However, actual snow clearing depends on ambient temperature, snow type and moisture, panel surface friction, and lower-edge clearance above ground or roof surfaces. Steeper tilt does not replace manual clearing during heavy blizzards.";
  }

  // RV / Portable Mount Guidance (Requirement 7)
  let rvNote: string | undefined;
  if (inputs.mountingType === "adjustable") {
    rvNote =
      "Adjustable RV and portable ground mounts allow manual tilt optimization when stationary. Seasonal adjustment provides more noticeable benefits during winter and shoulder months when the sun stays low. Summer midday differences are generally smaller. Always secure and lock adjustable panels in their flat travel position before highway transit.";
  }

  // Roof pitch comparison (Requirements 2 & 6)
  let angleDifferenceDeg: number | undefined;
  let angleDifferenceFormatted: string | undefined;
  let roofPitchFormatted: string | undefined;
  let isFlushMountRecommended: boolean | undefined;
  let roofComparisonNote: string | undefined;

  if (inputs.mountingType === "roof") {
    angleDifferenceDeg = Number((recommendedTilt - roofAngleDeg).toFixed(1));
    angleDifferenceFormatted =
      angleDifferenceDeg > 0
        ? `+${angleDifferenceDeg.toFixed(1)}°`
        : `${angleDifferenceDeg.toFixed(1)}°`;

    roofPitchFormatted =
      inputs.roofPitchType === "custom"
        ? `${roofAngleDeg.toFixed(1)}° (${roofPitchRise.toFixed(1)}/12 equivalent)`
        : `${roofPitchRise}/12 pitch (${roofAngleDeg.toFixed(1)}°)`;

    isFlushMountRecommended = true;

    roofComparisonNote =
      "Geometric difference only: This calculation represents a purely geometric angle difference and does NOT constitute structural engineering, racking certification, wind-load analysis, or installation approval. On residential sloped roofs, flush mounting parallel to the existing roof plane is standard practice. Tilting panels away from the roof slope introduces additional racking hardware, substantial wind uplift forces, structural engineering review requirements, and installation complexity.";
  }

  return {
    isValid: true,
    errors,
    warnings,
    latitude: rawLat,
    absLatitude,
    hemisphere,
    hemisphereLabel,
    recommendedTilt,
    recommendedTiltFormatted: `${recommendedTilt.toFixed(1)}°`,
    methodUsed,
    methodTier,
    methodDescription,
    seasonal,
    azimuthDeg,
    azimuthDirection,
    orientationNotes,
    roofAngleDeg: inputs.mountingType === "roof" ? roofAngleDeg : undefined,
    roofPitchRise: inputs.mountingType === "roof" ? roofPitchRise : undefined,
    roofPitchFormatted,
    angleDifferenceDeg,
    angleDifferenceFormatted,
    isFlushMountRecommended,
    roofComparisonNote,
    isLowTilt,
    lowTiltNote,
    isSteepTilt,
    snowNote,
    rvNote,
  };
}

/**
 * 5 Approved FAQs for Solar Panel Tilt Angle Calculator.
 * Structured data must match visible FAQ content 1:1.
 */
export const SOLAR_PANEL_TILT_FAQS = [
  {
    question: "How do I calculate the angle for my solar panels?",
    answer:
      "For a fixed year-round solar installation in the continental United States, a common baseline rule of thumb sets the tilt angle approximately equal to your geographic latitude. For latitudes between 25° N and 50° N, empirical formulas such as the Landau method (Tilt = Latitude × 0.76 + 3.1°) adjust this angle slightly flatter to capture higher summer solar irradiance when daylight hours are longest. If you have an adjustable mount and want to optimize for winter power, increase the tilt by roughly 15° above your latitude. For summer optimization, decrease tilt by roughly 15°.",
  },
  {
    question: "What is the difference between solar panel tilt and roof pitch?",
    answer:
      "Solar panel tilt is the angle of the solar panel surface relative to a perfectly flat, horizontal plane (measured in degrees from 0° to 90°). Roof pitch is the steepness of a building roof, traditionally expressed in the United States as inches of vertical rise per 12 inches of horizontal run (such as a 4/12 or 6/12 pitch). A 4/12 roof has an angle of approximately 18.4°, while a 6/12 roof has an angle of approximately 26.6°. Most residential solar installations use flush mounting, meaning the panels sit parallel to the existing roof pitch rather than using tilted tilt-leg brackets.",
  },
  {
    question: "Do solar panels have to face exactly True South?",
    answer:
      "No. While True South (180° compass azimuth in the Northern Hemisphere) captures the highest total solar radiation over a full calendar year, deviations of 15° to 30° toward the southeast or southwest usually reduce annual energy output by only 1% to 4%. In regions where electric utilities use Time-of-Use (TOU) rate plans with expensive peak electricity pricing in late afternoon, facing solar panels toward the southwest or west can be financially advantageous by generating more electricity when rates are highest.",
  },
  {
    question: "Can solar panels be installed flat on a roof or RV?",
    answer:
      "Yes, solar panels will generate electricity when mounted flat (0° tilt), but tilts below about 10° may require more frequent cleaning because rainwater drainage is reduced. At very low angles, dust, pollen, bird droppings, and standing rainwater tend to collect on the glass and frame lip rather than washing away naturally. For commercial flat roofs, installers frequently use 5° to 10° ballasted tilt racks. For RV rooftops, flat mounting is common for aerodynamic highway travel, though manual tilt brackets can be used when stationary.",
  },
  {
    question: "How much does adjusting solar panel tilt seasonally help?",
    answer:
      "Seasonal tilt adjustment can boost solar production by approximately 5% to 15% across a full year compared to a fixed angle, with the largest relative benefits occurring during winter and shoulder months when the sun sits low in the sky. During summer, the sun rides high enough that adjusting tilt delivers smaller percentage differences. For residential rooftop systems, the mechanical complexity, racking expense, and wind-load liabilities of adjustable brackets generally outweigh the modest energy gains, making fixed flush mounting the standard choice.",
  },
];
