"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  calculateSolarPanelTilt,
  MountingType,
  OptimizationTarget,
  ROOF_PITCH_PRESETS,
  US_REGION_PRESETS,
  SOLAR_PANEL_TILT_FAQS,
} from "@/lib/calculators/solar-panel-tilt";
import { InputField } from "@/components/ui/InputField";
import { SelectField } from "@/components/ui/SelectField";
import { ResultCard } from "@/components/ui/ResultCard";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { FormulaSection } from "@/components/calculators/FormulaSection";
import {
  WorkedExampleSection,
  WorkedStep,
} from "@/components/calculators/WorkedExampleSection";
import {
  AssumptionsSection,
  AssumptionItem,
} from "@/components/calculators/AssumptionsSection";
import { DisclaimerSection } from "@/components/calculators/DisclaimerSection";
import { FaqSection } from "@/components/calculators/FaqSection";
import {
  RelatedCalculators,
  RelatedTool,
} from "@/components/calculators/RelatedCalculators";
import {
  Sun,
  Compass,
  Home,
  Layers,
  ArrowRight,
  Info,
  ShieldAlert,
  Sliders,
  ExternalLink,
  MapPin,
  CheckCircle2,
  Calendar,
} from "lucide-react";

const RELATED_TOOLS: RelatedTool[] = [
  {
    title: "Solar Battery Calculator",
    description:
      "Size off-grid and backup solar battery banks in kWh and Amp-hours based on daily energy consumption and days of autonomy.",
    href: "/solar-battery-calculator",
    category: "Solar PV",
  },
  {
    title: "Battery Capacity & Sizing Calculator",
    description:
      "Size off-grid and battery backup storage capacity in Watt-hours (Wh) and Amp-hours (Ah) for solar PV arrays.",
    href: "/battery-capacity-calculator",
    category: "Battery Storage",
  },
  {
    title: "Watts to Amps Electrical Calculator",
    description:
      "Convert solar array wattage into DC circuit charging current and AC inverter output amperage.",
    href: "/watts-to-amps-calculator",
    category: "Electrical",
  },
  {
    title: "Solar Panels Series vs Parallel Guide",
    description:
      "Learn how series and parallel wiring configurations affect solar array voltage, current, and charge controller sizing.",
    href: "/solar-panels-series-vs-parallel",
    category: "Solar Engineering Guide",
  },
  {
    title: "UPS Battery Backup Run-Time Hours Calculator",
    description:
      "Estimate how many backup hours your solar-charged battery bank can sustain critical loads during outages.",
    href: "/ups-battery-backup-calculator",
    category: "Battery Backup",
  },
  {
    title: "What Is a Watt-Hour (Wh)?",
    description:
      "Understand the difference between instantaneous solar power (Watts) and total energy generated (Watt-hours).",
    href: "/what-is-a-watt-hour",
    category: "Educational Guide",
  },
];

export const SolarPanelTiltCalculator: React.FC = () => {
  // Input State
  const [latitude, setLatitude] = useState<number>(38);
  const [mountingType, setMountingType] = useState<MountingType>("roof");
  const [optimizationTarget, setOptimizationTarget] =
    useState<OptimizationTarget>("year_round");
  const [roofPitchType, setRoofPitchType] = useState<"preset" | "custom">(
    "preset"
  );
  const [roofPitchRise, setRoofPitchRise] = useState<number>(4); // default 4/12
  const [customRoofAngle, setCustomRoofAngle] = useState<number>(18.5);

  // Calculation
  const result = useMemo(() => {
    return calculateSolarPanelTilt({
      latitude,
      mountingType,
      optimizationTarget,
      roofPitchType,
      roofPitchRise,
      customRoofAngleDeg: customRoofAngle,
    });
  }, [
    latitude,
    mountingType,
    optimizationTarget,
    roofPitchType,
    roofPitchRise,
    customRoofAngle,
  ]);

  const handleReset = () => {
    setLatitude(38);
    setMountingType("roof");
    setOptimizationTarget("year_round");
    setRoofPitchType("preset");
    setRoofPitchRise(4);
    setCustomRoofAngle(18.5);
  };

  const workedSteps: WorkedStep[] = [
    {
      stepNumber: 1,
      title: "Identify Geographic Latitude and Hemisphere",
      calculation: "Baseline Tilt ≈ Latitude = 38.0° N → Orientation = True South (180° Azimuth)",
      explanation:
        "For Central U.S. (e.g. 38.0° N), the location sits in the Northern Hemisphere where solar panels should orient toward True South (180° compass azimuth).",
    },
    {
      stepNumber: 2,
      title: "Apply Empirical Fixed-Tilt Optimization (Landau Formula)",
      calculation: "Tilt = (Latitude × 0.76) + 3.1° = (38 × 0.76) + 3.1° = 32.0°",
      explanation:
        "Because 38° falls within the documented 25° to 50° empirical range, the Landau formula adjusts the angle slightly flatter than latitude to maximize summer daylight hours.",
    },
    {
      stepNumber: 3,
      title: "Convert Roof Pitch to Geometric Angle in Degrees",
      calculation: "θ_roof = atan(4 / 12) × (180 / π) = atan(0.3333) × 57.2958° = 18.4°",
      explanation:
        "The home features a standard residential 4/12 roof pitch (4 inches of vertical rise per 12 inches of horizontal run). Exact trigonometric conversion determines the roof angle from horizontal.",
    },
    {
      stepNumber: 4,
      title: "Calculate Geometric Angle Difference",
      calculation: "Δθ = Target Tilt - Roof Angle = 32.0° - 18.4° = +13.6°",
      explanation:
        "Compare the recommended year-round tilt angle against the existing roof slope. This calculation is a geometric difference only and does not constitute structural engineering.",
    },
    {
      stepNumber: 5,
      title: "Evaluate Practical Mounting Decision",
      calculation: "Standard Flush Mount Selected: Panels installed parallel to roof plane (18.4°)",
      explanation:
        "While a tilt-up bracket could theoretically add +13.6° of tilt, flush mounting directly parallel to the 18.4° roof plane is standard practice. Flush mounting avoids wind uplift liabilities, eliminates expensive racking hardware, and typically results in only a minor annual production variance.",
    },
  ];

  const assumptions: AssumptionItem[] = [
    {
      parameter: "Calculation Model Scope",
      defaultVal: "Trigonometric & Heuristic Geometry",
      realisticRange: "Not a PV production simulator",
      impact:
        "This tool calculates geometric angles, roof pitch trigonometry, and documented latitude heuristics. It does not calculate actual kilowatt-hour (kWh) solar generation. For authoritative site-specific production modeling including weather, clipping, and shading, use NREL PVWatts (pvwatts.nrel.gov).",
    },
    {
      parameter: "Empirical Fixed-Tilt Optimization",
      defaultVal: "Landau Formula: Tilt = Latitude × 0.76 + 3.1°",
      realisticRange: "25° to 50° Latitude (Empirical Study Bounds)",
      impact:
        "The Landau fixed-tilt optimization formula is an empirical estimate specifically published for 25° to 50° latitudes. It is not an NREL formula or universal law. Outside 25° to 50°, the calculator defaults to the standard latitude baseline.",
    },
    {
      parameter: "Structural vs. Geometric Distinction",
      defaultVal: "Pure Geometric Difference (Δθ)",
      realisticRange: "No structural or wind certification",
      impact:
        "The calculated angle difference between target tilt and roof pitch is purely geometric. It does not certify structural capacity, fastener pullout resistance, wind-load ratings, or building-code compliance. Tilting panels away from a sloped roof creates aerodynamic drag and wind uplift requiring professional structural review.",
    },
    {
      parameter: "Rainwater Drainage Threshold",
      defaultVal: "~10° Tilt Guideline",
      realisticRange: "Drainage guideline, not operational barrier",
      impact:
        "Tilts below about 10° may require more frequent cleaning because rainwater drainage is reduced. Approximately 10° is an installer and manufacturer drainage guideline rather than an absolute physical operational barrier. Solar panels still generate power flat, but dust and pollen do not rinse away as readily.",
    },
    {
      parameter: "Snow Shedding Dynamics",
      defaultVal: "35° to 50° Tilt Assists Slide-Off",
      realisticRange: "Dependent on temperature, moisture, clearance",
      impact:
        "Steeper tilt angles facilitate natural snow slide-off. However, actual snow behavior depends on ambient temperature, snow moisture, panel surface friction, and lower-edge clearance above ground or roof eaves.",
    },
    {
      parameter: "Compass Orientation & Azimuth",
      defaultVal: "True South (180° Azimuth)",
      realisticRange: "True South vs. Magnetic Compass Reading",
      impact:
        "Northern Hemisphere calculations use True South (180° azimuth) as the standard baseline. Handheld compasses point toward Magnetic North, which deviates from True North by local magnetic declination. Adjust your compass reading using local NOAA declination charts when aligning racking.",
    },
  ];

  return (
    <CalculatorShell
      title="Solar Panel Tilt Angle Calculator"
      badge="Optimal Angle & Roof Pitch"
      description="Calculate the optimal solar panel tilt angle and compass orientation for your latitude. Compare roof pitch angles, seasonal adjustments, and mounting options."
      category="Solar PV"
      lastUpdated="September 2026"
      onReset={handleReset}
      inputSection={
        <div className="space-y-6">
          {/* Input 1: Latitude */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="latitude-input"
                className="text-sm font-bold text-slate-800 flex items-center gap-1.5"
              >
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>Geographic Latitude (Degrees)</span>
              </label>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                {result.hemisphereLabel}
              </span>
            </div>

            <InputField
              id="latitude-input"
              label="Latitude"
              value={latitude}
              onChange={(val) => setLatitude(val)}
              unit="°"
              min={-90}
              max={90}
              step={0.1}
              helpText="Enter positive degrees for Northern Hemisphere (e.g. 38 for US), negative for Southern Hemisphere."
            />

            {/* Quick Reference US Regions */}
            <div className="space-y-1.5 pt-1">
              <p className="text-xs font-semibold text-slate-600">
                Quick Select U.S. Reference Regions:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {US_REGION_PRESETS.map((preset) => {
                  const isSelected = latitude === preset.latitude;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setLatitude(preset.latitude)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition font-medium ${
                        isSelected
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                      }`}
                      title={preset.description}
                    >
                      {preset.name} ({preset.latitude}° N)
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Input 2: Mounting Type */}
          <div className="space-y-2">
            <label
              htmlFor="mounting-type-select"
              className="text-sm font-bold text-slate-800 flex items-center gap-1.5"
            >
              <Home className="w-4 h-4 text-blue-600" />
              <span>Mounting Arrangement</span>
            </label>
            <SelectField
              id="mounting-type-select"
              label="Mounting Type"
              value={mountingType}
              onChange={(val) => setMountingType(val as MountingType)}
              options={[
                { value: "roof", label: "Sloped Roof Mount (Residential / Commercial)" },
                { value: "ground", label: "Fixed Ground Mount / Open Rack" },
                { value: "adjustable", label: "Adjustable RV / Portable Mount" },
              ]}
              helpText="Select how the solar array is physically mounted to evaluate roof pitch differences or portable travel requirements."
            />
          </div>

          {/* Input 3: Roof Pitch (Conditional on Sloped Roof) */}
          {mountingType === "roof" && (
            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-blue-600" />
                  <span>Existing Roof Pitch &amp; Slope</span>
                </span>
                <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200 text-xs">
                  <button
                    type="button"
                    onClick={() => setRoofPitchType("preset")}
                    className={`px-2.5 py-1 rounded-md transition font-medium ${
                      roofPitchType === "preset"
                        ? "bg-blue-600 text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Common Pitch
                  </button>
                  <button
                    type="button"
                    onClick={() => setRoofPitchType("custom")}
                    className={`px-2.5 py-1 rounded-md transition font-medium ${
                      roofPitchType === "custom"
                        ? "bg-blue-600 text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Custom Angle
                  </button>
                </div>
              </div>

              {roofPitchType === "preset" ? (
                <SelectField
                  id="roof-pitch-preset-select"
                  label="Common U.S. Roof Pitch"
                  value={roofPitchRise.toString()}
                  onChange={(val) => setRoofPitchRise(Number(val))}
                  options={ROOF_PITCH_PRESETS.map((p) => ({
                    value: p.rise.toString(),
                    label: p.label,
                  }))}
                  helpText="U.S. roof pitch indicates inches of vertical rise per 12 inches of horizontal run (e.g. 4/12 = ~18.4°)."
                />
              ) : (
                <InputField
                  id="custom-roof-angle-input"
                  label="Custom Roof Angle"
                  value={customRoofAngle}
                  onChange={(val) => setCustomRoofAngle(val)}
                  unit="°"
                  min={0}
                  max={90}
                  step={0.5}
                  helpText="Enter roof slope angle directly in degrees relative to horizontal (0° to 90°)."
                />
              )}
            </div>
          )}

          {/* Input 4: Optimization Target */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Production Optimization Target</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setOptimizationTarget("year_round")}
                className={`p-3 rounded-xl border text-left transition ${
                  optimizationTarget === "year_round"
                    ? "bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 text-blue-950"
                    : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                }`}
              >
                <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  Year-Round Max
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Fixed optimal annual harvest
                </div>
              </button>

              <button
                type="button"
                onClick={() => setOptimizationTarget("winter")}
                className={`p-3 rounded-xl border text-left transition ${
                  optimizationTarget === "winter"
                    ? "bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 text-blue-950"
                    : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                }`}
              >
                <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  Winter Bias
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Steeper angle (Lat + 15°)
                </div>
              </button>

              <button
                type="button"
                onClick={() => setOptimizationTarget("summer")}
                className={`p-3 rounded-xl border text-left transition ${
                  optimizationTarget === "summer"
                    ? "bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 text-blue-950"
                    : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                }`}
              >
                <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  Summer Bias
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Flatter angle (Lat - 15°)
                </div>
              </button>
            </div>
            <p className="text-xs text-slate-500 pt-1">
              Select Year-Round for grid-tied rooftop solar. Use Winter bias for off-grid winter heating reliability or Summer bias for high-draw summer cooling.
            </p>
          </div>
        </div>
      }
      resultSection={
        <div className="space-y-4">
          {/* Main Result Card */}
          <ResultCard
            icon="zap"
            primaryTitle="Recommended Tilt Angle"
            primaryValue={result.recommendedTiltFormatted}
            primarySubtext={`${result.methodTier}: ${result.methodDescription}`}
            stats={[
              {
                label: "Compass Azimuth",
                value: `${result.azimuthDeg}°`,
                subtext: result.azimuthDirection,
              },
              {
                label: "Calculation Method",
                value: result.methodTier,
                subtext: result.methodUsed,
              },
              {
                label: "Hemisphere & Latitude",
                value: `${Math.abs(latitude)}° ${latitude >= 0 ? "N" : "S"}`,
                subtext: result.hemisphereLabel,
              },
              ...(mountingType === "roof" && result.roofAngleDeg !== undefined
                ? [
                    {
                      label: "Roof Pitch Slope",
                      value: `${result.roofAngleDeg.toFixed(1)}°`,
                      subtext: result.roofPitchFormatted || "Roof Plane",
                    },
                    {
                      label: "Delta vs. Optimal",
                      value:
                        result.angleDifferenceFormatted ||
                        `${result.angleDifferenceDeg?.toFixed(1)}°`,
                      subtext:
                        Math.abs(result.angleDifferenceDeg || 0) <= 5
                          ? "Close alignment"
                          : "Geometric divergence",
                    },
                  ]
                : []),
            ]}
            warnings={result.warnings}
          />

          {/* Compass Orientation Card */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-slate-900 text-sm">
                  Recommended Compass Orientation
                </span>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                Azimuth {result.azimuthDeg}°
              </span>
            </div>

            <div className="text-2xl font-black text-slate-900">
              {result.azimuthDirection} ({result.azimuthDeg}° Azimuth)
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {result.orientationNotes}
            </p>
          </div>

          {/* Roof vs Target Difference (When Roof Mount is Active) */}
          {mountingType === "roof" && result.angleDifferenceDeg !== undefined && (
            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-amber-700" />
                  <span className="font-bold text-amber-950 text-sm">
                    Roof vs. Target Angle Difference
                  </span>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                  Geometric Comparison
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 py-1 text-center not-prose">
                <div className="p-2 rounded-lg bg-white border border-amber-200">
                  <span className="text-[11px] font-medium text-slate-500 block">
                    Target Tilt
                  </span>
                  <span className="text-base font-bold text-slate-900">
                    {result.recommendedTiltFormatted}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-white border border-amber-200">
                  <span className="text-[11px] font-medium text-slate-500 block">
                    Roof Slope
                  </span>
                  <span className="text-base font-bold text-slate-900">
                    {result.roofAngleDeg?.toFixed(1)}°
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-white border border-amber-200">
                  <span className="text-[11px] font-medium text-slate-500 block">
                    Difference
                  </span>
                  <span className="text-base font-bold text-amber-700">
                    {result.angleDifferenceFormatted}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {result.roofComparisonNote}
              </p>
            </div>
          )}

          {/* Low-Tilt Drainage Advisory */}
          {result.isLowTilt && (
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <Info className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Low-Tilt Drainage Notice</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {result.lowTiltNote}
              </p>
            </div>
          )}

          {/* Snow Advisory */}
          {result.snowNote && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <Sun className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Winter Snow Shedding Guidance</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {result.snowNote}
              </p>
            </div>
          )}

          {/* RV Advisory */}
          {result.rvNote && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>RV Travel Safety Guidance</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {result.rvNote}
              </p>
            </div>
          )}
        </div>
      }
    >
      {/* Visual Tilt & Roof Angle Diagram */}
      <section
        id="tilt-visualizer"
        className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-4"
      >
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">
            Geometric Tilt Angle Visualizer
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Cross-sectional diagram showing horizontal ground baseline (0°), existing roof plane, and solar panel tilt angle.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-950 text-white rounded-xl p-6 overflow-hidden">
          {/* SVG Visualizer */}
          <div className="w-full md:w-2/3 max-w-[480px] aspect-[16/10] relative flex items-center justify-center">
            <svg
              viewBox="0 0 400 250"
              className="w-full h-full"
              aria-label={`Visual cross section showing ${result.recommendedTiltFormatted} panel tilt relative to horizontal ground`}
              role="img"
            >
              {/* Ground Horizontal Line (0°) */}
              <line
                x1="40"
                y1="210"
                x2="320"
                y2="210"
                stroke="#64748b"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <text x="325" y="214" fill="#94a3b8" fontSize="11" fontFamily="sans-serif">
                0° Ground
              </text>

              {/* Roof Slope (if Roof Mount is active and angle > 0) */}
              {mountingType === "roof" && (result.roofAngleDeg || 0) > 0 && (
                <>
                  <line
                    x1="60"
                    y1="210"
                    x2={
                      60 +
                      260 *
                        Math.cos(
                          (((result.roofAngleDeg || 18.4) * Math.PI) / 180)
                        )
                    }
                    y2={
                      210 -
                      260 *
                        Math.sin(
                          (((result.roofAngleDeg || 18.4) * Math.PI) / 180)
                        )
                    }
                    stroke="#d97706"
                    strokeWidth="3"
                  />
                  <text
                    x={
                      60 +
                      190 *
                        Math.cos(
                          (((result.roofAngleDeg || 18.4) * Math.PI) / 180)
                        )
                    }
                    y={
                      200 -
                      190 *
                        Math.sin(
                          (((result.roofAngleDeg || 18.4) * Math.PI) / 180)
                        )
                    }
                    fill="#fbbf24"
                    fontSize="11"
                    fontWeight="bold"
                    fontFamily="sans-serif"
                  >
                    Roof ({result.roofAngleDeg?.toFixed(1)}°)
                  </text>
                </>
              )}

              {/* Solar Panel Surface Line */}
              {(() => {
                const angleRad = (result.recommendedTilt * Math.PI) / 180;
                const panelLen = 220;
                const endX = 60 + panelLen * Math.cos(angleRad);
                const endY = 210 - panelLen * Math.sin(angleRad);
                return (
                  <>
                    <line
                      x1="60"
                      y1="210"
                      x2={endX}
                      y2={endY}
                      stroke="#3b82f6"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    {/* Tilt Angle Arc */}
                    <path
                      d={`M 140 210 A 80 80 0 0 0 ${
                        60 + 80 * Math.cos(angleRad)
                      } ${210 - 80 * Math.sin(angleRad)}`}
                      fill="none"
                      stroke="#60a5fa"
                      strokeWidth="2"
                    />
                    <text
                      x={60 + 95 * Math.cos(angleRad / 2)}
                      y={205 - 95 * Math.sin(angleRad / 2)}
                      fill="#93c5fd"
                      fontSize="14"
                      fontWeight="bold"
                      fontFamily="sans-serif"
                    >
                      {result.recommendedTiltFormatted}
                    </text>
                  </>
                );
              })()}

              {/* Sun Symbol and Incident Rays */}
              <circle cx="330" cy="50" r="16" fill="#facc15" />
              <line x1="330" y1="26" x2="330" y2="16" stroke="#facc15" strokeWidth="2" />
              <line x1="330" y1="74" x2="330" y2="84" stroke="#facc15" strokeWidth="2" />
              <line x1="306" y1="50" x2="296" y2="50" stroke="#facc15" strokeWidth="2" />
              <line x1="354" y1="50" x2="364" y2="50" stroke="#facc15" strokeWidth="2" />
              <line x1="313" y1="33" x2="306" y2="26" stroke="#facc15" strokeWidth="2" />
              <line x1="347" y1="67" x2="354" y2="74" stroke="#facc15" strokeWidth="2" />

              {/* Sun Ray Arrow toward panel */}
              <line
                x1="305"
                y1="70"
                x2="170"
                y2="140"
                stroke="#fef08a"
                strokeWidth="1.5"
                strokeDasharray="5 3"
              />
              <polygon points="170,140 182,133 176,145" fill="#fef08a" />
            </svg>
          </div>

          {/* Diagram Legend & Stats */}
          <div className="w-full md:w-1/3 space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-blue-400 font-bold">
                <div className="w-3 h-1 bg-blue-500 rounded" />
                <span>Panel Tilt Angle: {result.recommendedTiltFormatted}</span>
              </div>
              <p className="text-slate-400">
                Measured from horizontal ground plane (0°).
              </p>
            </div>

            {mountingType === "roof" && (
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <div className="w-3 h-1 bg-amber-500 rounded" />
                  <span>Roof Slope: {result.roofAngleDeg?.toFixed(1)}°</span>
                </div>
                <p className="text-slate-400">
                  {result.roofPitchFormatted}
                </p>
              </div>
            )}

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Compass className="w-3.5 h-3.5" />
                <span>Orientation: {result.azimuthDirection}</span>
              </div>
              <p className="text-slate-400">
                Compass azimuth {result.azimuthDeg}° for maximum annual irradiance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Reference Table (Requirement 3-E) */}
      <section
        id="seasonal-reference"
        className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-4"
      >
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">
            Seasonal Solar Tilt Planning Reference Table
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Illustrative planning estimates showing how solar panel tilt adjustments track seasonal changes in sun elevation across the calendar year.
          </p>
        </div>

        {/* Mobile View: Clean Card Layout (<sm) */}
        <div className="sm:hidden space-y-3">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm">Winter Production Bias</span>
              <span className="text-sm font-bold text-blue-900 px-2 py-0.5 rounded bg-blue-100">
                {result.seasonal.winterTilt.toFixed(1)}°
              </span>
            </div>
            <div className="text-xs font-mono text-blue-700">Formula: Latitude + 15°</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Sun sits lowest in the sky. Steeper angle captures low-horizon rays and aids passive snow slide-off.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm">Spring / Fall (Equinox)</span>
              <span className="text-sm font-bold text-slate-900 px-2 py-0.5 rounded bg-slate-200">
                {result.seasonal.equinoxTilt.toFixed(1)}°
              </span>
            </div>
            <div className="text-xs font-mono text-slate-700">Formula: Latitude</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mid-elevation sun. Standard rule-of-thumb baseline matching the geographic latitude.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm">Summer Production Bias</span>
              <span className="text-sm font-bold text-amber-900 px-2 py-0.5 rounded bg-amber-100">
                {result.seasonal.summerTilt.toFixed(1)}°
              </span>
            </div>
            <div className="text-xs font-mono text-amber-700">Formula: max(0, Latitude - 15°)</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Sun climbs near zenith overhead. Flatter angle aligns with high-angle midsummer sun during longest daylight days.
            </p>
          </div>

          <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-950 text-sm">Fixed Year-Round Optimum</span>
              <span className="text-sm font-black text-blue-950 px-2 py-0.5 rounded bg-blue-200">
                {result.seasonal.yearRoundTilt.toFixed(1)}°
              </span>
            </div>
            <div className="text-xs font-mono text-blue-800">
              Formula: {result.absLatitude >= 25 && result.absLatitude <= 50 ? "(Latitude × 0.76) + 3.1°" : "Latitude Baseline"}
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {result.absLatitude >= 25 && result.absLatitude <= 50
                ? "Empirical fixed-tilt estimate (Landau). Balances higher summer peak irradiance against lower winter solar angles."
                : "Latitude baseline for locations outside the 25° to 50° empirical range."}
            </p>
          </div>
        </div>

        {/* Desktop / Tablet View: Full Table (>=sm) */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-700 font-bold">
                <th className="py-3 px-4">Season / Target</th>
                <th className="py-3 px-4">Heuristic Formula</th>
                <th className="py-3 px-4">Calculated Tilt for {result.absLatitude.toFixed(1)}°</th>
                <th className="py-3 px-4">Solar Elevation &amp; Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              <tr className="hover:bg-slate-50/60 transition">
                <td className="py-3 px-4 font-bold text-slate-900">
                  Winter Production Bias
                </td>
                <td className="py-3 px-4 font-mono text-xs text-blue-700">
                  Latitude + 15°
                </td>
                <td className="py-3 px-4 font-bold text-blue-900">
                  {result.seasonal.winterTilt.toFixed(1)}°
                </td>
                <td className="py-3 px-4 text-xs leading-relaxed">
                  Sun sits lowest in the sky. Steeper angle captures low-horizon rays and aids passive snow slide-off.
                </td>
              </tr>
              <tr className="hover:bg-slate-50/60 transition">
                <td className="py-3 px-4 font-bold text-slate-900">
                  Spring / Fall (Equinox)
                </td>
                <td className="py-3 px-4 font-mono text-xs text-slate-700">
                  Latitude
                </td>
                <td className="py-3 px-4 font-bold text-slate-900">
                  {result.seasonal.equinoxTilt.toFixed(1)}°
                </td>
                <td className="py-3 px-4 text-xs leading-relaxed">
                  Mid-elevation sun. Standard rule-of-thumb baseline matching the geographic latitude.
                </td>
              </tr>
              <tr className="hover:bg-slate-50/60 transition">
                <td className="py-3 px-4 font-bold text-slate-900">
                  Summer Production Bias
                </td>
                <td className="py-3 px-4 font-mono text-xs text-amber-700">
                  max(0, Latitude - 15°)
                </td>
                <td className="py-3 px-4 font-bold text-amber-900">
                  {result.seasonal.summerTilt.toFixed(1)}°
                </td>
                <td className="py-3 px-4 text-xs leading-relaxed">
                  Sun climbs near zenith overhead. Flatter angle aligns with high-angle midsummer sun during longest daylight days.
                </td>
              </tr>
              <tr className="hover:bg-slate-50/60 transition bg-blue-50/30">
                <td className="py-3 px-4 font-bold text-blue-950">
                  Fixed Year-Round Optimum
                </td>
                <td className="py-3 px-4 font-mono text-xs text-blue-800">
                  {result.absLatitude >= 25 && result.absLatitude <= 50
                    ? "(Latitude × 0.76) + 3.1°"
                    : "Latitude Rule of Thumb"}
                </td>
                <td className="py-3 px-4 font-black text-blue-950">
                  {result.seasonal.yearRoundTilt.toFixed(1)}°
                </td>
                <td className="py-3 px-4 text-xs leading-relaxed">
                  {result.absLatitude >= 25 && result.absLatitude <= 50
                    ? "Empirical fixed-tilt estimate (Landau). Balances higher summer peak irradiance against lower winter solar angles."
                    : "Latitude baseline for locations outside the 25° to 50° empirical range."}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Methodology Tiers Diagram (Requirement 9-1) */}
      <section
        id="methodology-tiers"
        className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6"
      >
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">
            Engineering Methodology Tiers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            How CalcMyPower separates exact geometric mathematics from heuristic planning estimates and site-specific PV energy modeling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
          {/* Tier A */}
          <div className="p-5 rounded-2xl border border-blue-200 bg-blue-50/40 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
                  Tier A
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-200 text-blue-900">
                  Exact Geometry
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Mathematical Calculations
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Trigonometric conversions grounded in Euclidean geometry:
              </p>
              <div className="p-2.5 rounded-lg bg-white border border-blue-200 font-mono text-xs text-blue-950 space-y-1">
                <div>θ_roof = atan(pitch / 12) × (180 / π)</div>
                <div>Δθ = Target Tilt - Roof Angle</div>
              </div>
            </div>
            <div className="text-[11px] text-slate-500 pt-2 border-t border-blue-200/60">
              Exact mathematical relationship. Explicitly not structural engineering or wind-load analysis.
            </div>
          </div>

          {/* Tier B */}
          <div className="p-5 rounded-2xl border border-amber-200 bg-amber-50/40 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Tier B
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                  Documented Rules
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Planning Heuristics
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Industry rules of thumb and empirical formulas for initial system sizing:
              </p>
              <div className="p-2.5 rounded-lg bg-white border border-amber-200 font-mono text-xs text-amber-950 space-y-1">
                <div>Baseline: Tilt ≈ Latitude</div>
                <div>Seasonal: Latitude ± 15°</div>
                <div>Landau: (Lat × 0.76) + 3.1° (25°-50°)</div>
              </div>
            </div>
            <div className="text-[11px] text-slate-500 pt-2 border-t border-amber-200/60">
              Heuristic estimates for planning. Not presented as universal physical laws or NREL formulas.
            </div>
          </div>

          {/* Tier C */}
          <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/40 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Tier C
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">
                  Location Modeling
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Site-Specific PV Simulation
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Accurate kilowatt-hour production requires comprehensive simulation accounting for local weather files:
              </p>
              <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                <li>TMY3 solar irradiance data</li>
                <li>Inverter clipping &amp; DC/AC ratio</li>
                <li>Temperature &amp; wind deratings</li>
                <li>Local horizon &amp; tree shading</li>
              </ul>
            </div>
            <div className="pt-2 border-t border-emerald-200/60">
              <a
                href="https://pvwatts.nrel.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900 transition"
              >
                <span>Run NREL PVWatts Simulator</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Architecture Diagram (Requirement 9-2) */}
      <section
        id="calculator-architecture"
        className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6"
      >
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">
            Calculator System Architecture
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Transparent data flow from user inputs through the pure calculation engine to verified outputs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs not-prose">
          {/* Step 1: Inputs */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-blue-600" />
              <span>1. User Inputs</span>
            </div>
            <ul className="space-y-1.5 text-slate-600">
              <li>• Latitude (-90° to +90°) or US Presets</li>
              <li>• Mounting Type (Roof, Ground, RV)</li>
              <li>• Roof Pitch (Preset 0-12/12 or Custom Angle)</li>
              <li>• Optimization Target (Year-Round, Winter, Summer)</li>
            </ul>
          </div>

          {/* Step 2: Pure Engine */}
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-2">
            <div className="font-bold text-blue-950 text-sm flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-blue-600" />
              <span>2. Pure Math Engine</span>
            </div>
            <ul className="space-y-1.5 text-blue-900">
              <li>• Input validation &amp; hemisphere detection</li>
              <li>• Exact roof pitch trigonometry: atan(pitch/12)</li>
              <li>• Heuristic lookup: Landau (25-50°) vs. Lat baseline</li>
              <li>• Boundary clamping (0° min, 90° max)</li>
            </ul>
          </div>

          {/* Step 3: Outputs */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
            <div className="font-bold text-emerald-950 text-sm flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>3. Verified Outputs</span>
            </div>
            <ul className="space-y-1.5 text-emerald-900">
              <li>• Recommended Tilt Angle Estimate</li>
              <li>• Explicit Method Label &amp; Tier Classification</li>
              <li>• Geometric Roof-vs-Target Difference (Δθ)</li>
              <li>• Orientation Azimuth &amp; Magnetic Declination Note</li>
              <li>• Low-Tilt Drainage, Snow &amp; RV Travel Advisories</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Governing Formulas Section */}
      <FormulaSection
        title="Solar Panel Tilt &amp; Roof Pitch Governing Formulas"
        formulaDisplay="θ_roof = atan(Rise / 12) × (180 / π) | θ_opt = (0.76 × Lat) + 3.1° | Δθ = θ_target - θ_roof"
        description="Review the mathematical equations and empirical formulas used to compute optimal solar panel tilt angles, roof pitch slope conversions, and geometric alignment deltas."
        variables={[
          {
            symbol: "θ_roof",
            name: "Roof Slope Angle",
            unit: "Degrees (°)",
            description: "Slope angle of the roof plane from horizontal: θ = atan(Rise / 12) × (180 / π).",
          },
          {
            symbol: "Rise",
            name: "Roof Rise",
            unit: "Inches",
            description: "Vertical inches of rise per 12 inches of horizontal run (e.g., 4 for a 4/12 roof).",
          },
          {
            symbol: "Lat",
            name: "Geographic Latitude",
            unit: "Degrees (°)",
            description: "Location latitude in decimal degrees.",
          },
          {
            symbol: "θ_opt",
            name: "Annual Fixed Tilt",
            unit: "Degrees (°)",
            description: "Landau empirical formula for annual insolation optimization across 25° to 50° latitude.",
          },
          {
            symbol: "Δθ",
            name: "Tilt Delta",
            unit: "Degrees (°)",
            description: "Geometric difference between optimal panel tilt and existing roof slope angle.",
          },
        ]}
        notes={[
          "Roof pitch angle conversion is exact trigonometry (Tier A).",
          "Optimal fixed tilt and seasonal tilt rules of thumb are documented heuristics for system planning (Tier B).",
          "Actual site-specific kilowatt-hour production requires modeling hourly irradiance, shading, and equipment derates via NREL PVWatts (Tier C).",
        ]}
      />

      {/* Worked Example Section */}
      <WorkedExampleSection
        title="Worked Example: Central U.S. Residential Rooftop Solar Tilt"
        scenario="A homeowner in St. Louis, Missouri (Latitude 38.0° N) is planning a grid-tied rooftop solar array on a south-facing 4/12 pitch asphalt shingle roof. They want to determine the optimal year-round tilt angle, calculate how closely their roof pitch matches that angle, and evaluate whether flush mounting or tilted racking brackets make engineering sense."
        steps={workedSteps}
        conclusion="The optimal year-round tilt angle for 38.0° N latitude is 32.0°. The existing 4/12 roof pitch provides an 18.4° slope, creating a +13.6° geometric difference. In residential applications, flush mounting directly to the 18.4° roof plane is standard practice. Flush mounting avoids aerodynamic wind uplift, eliminates engineered tilt racking brackets, and delivers roughly 96% to 98% of the energy that a tilted system would capture."
      />

      {/* Assumptions & Technical Limitations Section */}
      <AssumptionsSection
        title="Calculation Assumptions &amp; Technical Limitations"
        description="Review key electrical, geometric, and site-specific assumptions underlying our solar panel tilt angle calculations."
        assumptions={assumptions}
      />

      {/* Frequently Asked Questions */}
      <FaqSection
        title="Frequently Asked Questions: Solar Panel Angles &amp; Roof Pitch"
        faqs={SOLAR_PANEL_TILT_FAQS}
      />

      {/* Disclaimer Section */}
      <DisclaimerSection />

      {/* Related Calculators */}
      <RelatedCalculators calculators={RELATED_TOOLS} />
    </CalculatorShell>
  );
};
