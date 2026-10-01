"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  calculateSolarSystemSize,
  CONSUMPTION_PRESETS,
  REGIONAL_SUN_PRESETS,
  PANEL_WATTAGE_PRESETS,
  SOLAR_SYSTEM_SIZE_DEFAULTS,
  SOLAR_SYSTEM_SIZE_FAQS,
  formatKw,
  formatKwhNumber,
  formatWattsNumber,
} from "@/lib/calculators/solar-system-size";
import { InputField } from "@/components/ui/InputField";
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
import { SolarSystemSizeFlowDiagram } from "@/components/calculators/SolarSystemSizeFlowDiagram";
import {
  Sun,
  Zap,
  Layers,
  Home,
  Sliders,
  CheckCircle2,
  Info,
  Calendar,
  Grid,
  Maximize2,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

const RELATED_TOOLS: RelatedTool[] = [
  {
    title: "Solar Battery Sizing Calculator",
    description:
      "Size off-grid and backup battery storage capacity in Amp-hours and Watt-hours based on daily energy consumption.",
    href: "/solar-battery-calculator",
    category: "Battery Storage",
  },
  {
    title: "Solar Charge Controller Calculator",
    description:
      "Determine MPPT and PWM controller sizing based on PV array wattage, battery bus voltage, and cold-weather open-circuit voltage.",
    href: "/solar-charge-controller-calculator",
    category: "Solar PV",
  },
  {
    title: "Solar Panel Tilt Angle Calculator",
    description:
      "Calculate the optimal solar panel tilt angle and compass orientation for your latitude to maximize seasonal solar harvest.",
    href: "/solar-panel-tilt-calculator",
    category: "Solar PV",
  },
  {
    title: "Solar Panels in Series vs Parallel Guide",
    description:
      "Learn how series and parallel solar panel wiring affects circuit voltage, current, wire size, and line losses.",
    href: "/solar-panels-series-vs-parallel",
    category: "Solar Engineering Guide",
  },
  {
    title: "Voltage Drop Calculator",
    description:
      "Calculate voltage drop and verify conductor wire gauge for DC solar homerun feeders and AC inverter output branch circuits.",
    href: "/voltage-drop-calculator",
    category: "Electrical Circuits",
  },
  {
    title: "Watts to Amps Electrical Calculator",
    description:
      "Convert real power in Watts to circuit current in Amperes across DC, 120V/240V single-phase, and balanced three-phase systems.",
    href: "/watts-to-amps-calculator",
    category: "Electrical",
  },
];

export const SolarSystemSizeCalculator: React.FC = () => {
  // Input State
  const [monthlyKwh, setMonthlyKwh] = useState<number>(SOLAR_SYSTEM_SIZE_DEFAULTS.monthlyKwh);
  const [solarOffsetPercent, setSolarOffsetPercent] = useState<number>(SOLAR_SYSTEM_SIZE_DEFAULTS.solarOffsetPercent!);
  const [peakSunHours, setPeakSunHours] = useState<number>(SOLAR_SYSTEM_SIZE_DEFAULTS.peakSunHours!);
  const [performanceRatioPercent, setPerformanceRatioPercent] = useState<number>(SOLAR_SYSTEM_SIZE_DEFAULTS.performanceRatioPercent!);
  const [panelWattage, setPanelWattage] = useState<number>(SOLAR_SYSTEM_SIZE_DEFAULTS.panelWattage!);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // Calculation Result
  const result = useMemo(() => {
    return calculateSolarSystemSize({
      monthlyKwh,
      daysInMonth: 30,
      solarOffsetPercent,
      peakSunHours,
      performanceRatioPercent,
      panelWattage,
    });
  }, [
    monthlyKwh,
    solarOffsetPercent,
    peakSunHours,
    performanceRatioPercent,
    panelWattage,
  ]);

  const handleReset = () => {
    setMonthlyKwh(SOLAR_SYSTEM_SIZE_DEFAULTS.monthlyKwh);
    setSolarOffsetPercent(SOLAR_SYSTEM_SIZE_DEFAULTS.solarOffsetPercent!);
    setPeakSunHours(SOLAR_SYSTEM_SIZE_DEFAULTS.peakSunHours!);
    setPerformanceRatioPercent(SOLAR_SYSTEM_SIZE_DEFAULTS.performanceRatioPercent!);
    setPanelWattage(SOLAR_SYSTEM_SIZE_DEFAULTS.panelWattage!);
    setShowAdvanced(false);
  };

  const handleConsumptionPreset = (kwh: number) => {
    setMonthlyKwh(kwh);
  };

  const handleSunPreset = (psh: number) => {
    setPeakSunHours(psh);
  };

  // Worked Example steps for 900 kWh/mo, 100% offset, 4.5 PSH, 78% planning performance factor, 400W
  const workedSteps: WorkedStep[] = [
    {
      stepNumber: 1,
      title: "Determine Average Daily Electricity Consumption",
      calculation: "E_daily = 900 kWh/month ÷ 30 days = 30.00 kWh/day",
      explanation:
        "According to the U.S. Energy Information Administration (EIA), average residential utility customers consume roughly 860 to 900 kWh monthly. Dividing monthly consumption by 30 days yields the baseline daily energy demand.",
    },
    {
      stepNumber: 2,
      title: "Apply Target Solar Offset Fraction",
      calculation: "E_target = 30.00 kWh/day × (100% ÷ 100) = 30.00 kWh/day",
      explanation:
        "Aiming to offset 100% of grid consumption sets the target daily solar harvest equal to daily demand. If sizing for a 75% budget offset, target solar energy would be 22.50 kWh/day.",
    },
    {
      stepNumber: 3,
      title: "Compute Required PV Array DC Nameplate Rating",
      calculation:
        "Daily Yield Factor = 4.5 PSH × 0.78 = 3.51 kWh/kW/day\nSystem Size = 30.00 kWh/day ÷ 3.51 kWh/kW/day = 8.547 kW DC (8,547 Watts)",
      explanation:
        "Combining 4.5 peak sun hours with a 78% illustrative planning performance factor accounts for real-world inverter conversion, temperature derating, wiring resistance, and soiling. Dividing target daily energy by daily yield yields the required DC nameplate capacity.",
    },
    {
      stepNumber: 4,
      title: "Calculate Approximate Solar Panel Count",
      calculation:
        "Raw Panels = 8,547 W ÷ 400 W = 21.37 panels\nPlanning Panel Count = Math.ceil(21.37) = 22 panels",
      explanation:
        "Dividing total array wattage by standard 400-Watt residential modules yields 21.37 panels. Because physical solar panels cannot be fractional, the planning estimate rounds upward to 22 panels.",
    },
    {
      stepNumber: 5,
      title: "Verify Actual Array Rating and Physical Roof Footprint",
      calculation:
        "Installed Array Rating = (22 × 400 W) ÷ 1,000 = 8.80 kW DC\nIllustrative Roof Area Estimate = 22 × 21 sq ft = 462 sq ft",
      explanation:
        "An installation of 22 panels produces an 8.80 kW nameplate array with an illustrative module area of approximately 462 sq ft. This illustrative estimate does not model local fire setbacks, access pathways, roof obstructions, structural constraints, or jurisdiction-specific requirements.",
    },
  ];

  // Assumptions & Sizing Boundaries
  const sizingAssumptions: AssumptionItem[] = [
    {
      parameter: "Standard Billing Cycle Divisor",
      defaultVal: "30 Days per Month",
      realisticRange: "28 to 31 calendar days (365 ÷ 12 = 30.4 days)",
      impact:
        "Dividing monthly utility bill usage by 30 days provides a practical planning average for daily household energy consumption. Seasonal billing variations should be reviewed across a full 12-month utility history.",
    },
    {
      parameter: "Peak Sun Hours (PSH)",
      defaultVal: "4.5 Hours per Day (U.S. National Average)",
      realisticRange: "3.5 to 6.0 PSH across continental United States",
      impact:
        "Peak sun hours represent cumulative daily solar radiation normalized to 1,000 W/m². Actual solar harvest varies significantly by latitude, climate, seasonality, and local cloud cover.",
    },
    {
      parameter: "Planning Performance Factor",
      defaultVal: "78% (0.78 Planning Factor)",
      realisticRange: "72% to 85% depending on equipment, climate, and site conditions",
      impact:
        "CalcMyPower uses 78% as an illustrative planning performance factor for this simplified estimate. Actual PV system performance varies with solar resource, tilt, azimuth, shading, soiling, temperature, wiring, inverter behavior, and other site-specific conditions.",
    },
    {
      parameter: "Solar Panel Module Area",
      defaultVal: "21.0 sq ft per 400W Module",
      realisticRange: "18 to 23 sq ft per residential module",
      impact:
        "Standard modern residential 54-cell / 108-half-cell monocrystalline panels measure approximately 68 inches by 44 inches (~20.8 sq ft). This illustrative estimate does not model local fire setbacks, access pathways, roof obstructions, structural constraints, or jurisdiction-specific requirements.",
    },
  ];

  return (
    <CalculatorShell
      title="Solar System Size Calculator"
      badge="Residential Solar PV Planning"
      description="Calculate the solar system size and number of solar panels needed for your home. Estimate required array kW, panel count, and roof space based on electricity usage and peak sun hours."
      category="Solar PV"
      lastUpdated="October 2026"
      onReset={handleReset}
      inputSection={
        <div className="space-y-6">
          {/* Input 1: Monthly Electricity Consumption */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="monthly-kwh-input"
                className="text-sm font-bold text-slate-800 flex items-center gap-1.5"
              >
                <Zap className="w-4 h-4 text-blue-600" />
                <span>Monthly Electricity Consumption (kWh)</span>
              </label>
              <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                ~{(monthlyKwh / 30).toFixed(1)} kWh / day
              </span>
            </div>

            {/* Quick Reference Presets */}
            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Reference Consumption Presets (U.S. Homes)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {CONSUMPTION_PRESETS.map((preset) => {
                  const isSelected = Math.abs(monthlyKwh - preset.monthlyKwh) < 1;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleConsumptionPreset(preset.monthlyKwh)}
                      className={`p-2.5 rounded-xl border text-left transition text-xs ${
                        isSelected
                          ? "bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 text-blue-950 font-bold"
                          : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <div className="font-semibold truncate">{preset.label.split("(")[0]}</div>
                      <div className="text-slate-500 font-mono mt-0.5">
                        {preset.monthlyKwh} kWh/mo
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <InputField
              id="monthly-kwh-input"
              label="Enter Average Monthly Electricity Usage"
              value={monthlyKwh}
              onChange={(val) => setMonthlyKwh(val)}
              min={50}
              max={15000}
              step={25}
              unit="kWh / month"
              helpText="Find total electricity kilowatt-hours from your electric utility bills. U.S. residential national average is roughly 860 to 900 kWh/month."
            />
          </div>

          {/* Input 2: Solar Offset Target */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="solar-offset-input"
                className="text-sm font-bold text-slate-800 flex items-center gap-1.5"
              >
                <Home className="w-4 h-4 text-blue-600" />
                <span>Solar Offset Target (%)</span>
              </label>
              <span className="text-xs font-mono font-bold text-blue-700">
                {solarOffsetPercent}% of Bill
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[50, 75, 100, 120].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setSolarOffsetPercent(pct)}
                  className={`py-2 px-3 rounded-xl border text-center transition text-xs font-bold ${
                    solarOffsetPercent === pct
                      ? "bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 text-blue-950"
                      : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                  }`}
                >
                  {pct}%{pct === 100 ? " (Full)" : pct === 120 ? " (EV Add)" : ""}
                </button>
              ))}
            </div>

            <InputField
              id="solar-offset-input"
              label="Target Solar Energy Offset Percentage"
              value={solarOffsetPercent}
              onChange={(val) => setSolarOffsetPercent(val)}
              min={10}
              max={250}
              step={5}
              unit="%"
              helpText="Target percentage of annual consumption you wish to generate with solar. 100% aims for net-zero electricity usage. Sizing above 100% plans for future EV or heat pump additions."
            />
          </div>

          {/* Input 3: Peak Sun Hours */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="peak-sun-hours-input"
                className="text-sm font-bold text-slate-800 flex items-center gap-1.5"
              >
                <Sun className="w-4 h-4 text-blue-600" />
                <span>Average Daily Peak Sun Hours (PSH)</span>
              </label>
              <span className="text-xs font-mono font-bold text-blue-700">
                {peakSunHours.toFixed(1)} Hours / day
              </span>
            </div>

            {/* Regional Insolation Presets */}
            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                U.S. Regional Planning References (NREL Solar Insolation)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {REGIONAL_SUN_PRESETS.map((preset) => {
                  const isSelected = Math.abs(peakSunHours - preset.peakSunHours) < 0.05;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSunPreset(preset.peakSunHours)}
                      className={`p-2.5 rounded-xl border text-left transition text-xs ${
                        isSelected
                          ? "bg-amber-50 border-amber-500 ring-2 ring-amber-500/20 text-amber-950 font-bold"
                          : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <div className="font-semibold truncate">{preset.label.split("(")[0]}</div>
                      <div className="text-slate-500 text-[11px] truncate mt-0.5">
                        {preset.label.split("(")[1]?.replace(")", "") || ""}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <InputField
              id="peak-sun-hours-input"
              label="Enter Local Daily Peak Sun Hours"
              value={peakSunHours}
              onChange={(val) => setPeakSunHours(val)}
              min={1.0}
              max={10.0}
              step={0.1}
              unit="PSH / day"
              helpText="Peak sun hours measure solar irradiance equivalent to 1,000 W/m² (not total daylight hours). Continental U.S. values range from 3.5 to 6.0 PSH annually."
            />
          </div>

          {/* Advanced Fine-Tuning Toggle */}
          <div className="pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-600 transition"
            >
              <Sliders className="w-4 h-4" />
              <span>{showAdvanced ? "Hide Equipment & Loss Parameters" : "Adjust Panel Wattage & Planning Performance Factor"}</span>
            </button>
          </div>

          {showAdvanced && (
            <div className="space-y-5 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              {/* Input 4: Panel Wattage */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">Solar Panel Rated Wattage</span>
                  <span className="font-mono font-bold text-blue-700">{panelWattage}W</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PANEL_WATTAGE_PRESETS.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setPanelWattage(p.value)}
                      className={`p-2 rounded-lg border text-left transition ${
                        panelWattage === p.value
                          ? "bg-white border-blue-500 ring-2 ring-blue-500/20 font-bold text-blue-950"
                          : "bg-white/80 border-slate-200 text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <div className="font-semibold">{p.value}W</div>
                      <div className="text-[10px] text-slate-500 truncate">{p.label.split("(")[1]?.replace(")", "") || ""}</div>
                    </button>
                  ))}
                </div>
                <InputField
                  id="panel-wattage-input"
                  label="Custom Panel Wattage (W)"
                  value={panelWattage}
                  onChange={(val) => setPanelWattage(val)}
                  min={200}
                  max={700}
                  step={5}
                  unit="Watts"
                  helpText="Standard modern residential monocrystalline half-cell modules range from 380W to 430W."
                />
              </div>

              {/* Input 5: Planning Performance Factor */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">Planning Performance Factor</span>
                  <span className="font-mono font-bold text-blue-700">{performanceRatioPercent}%</span>
                </div>
                <InputField
                  id="performance-ratio-input"
                  label="Planning Performance Factor (%)"
                  value={performanceRatioPercent}
                  onChange={(val) => setPerformanceRatioPercent(val)}
                  min={50}
                  max={95}
                  step={1}
                  unit="%"
                  helpText="CalcMyPower uses 78% as an illustrative planning performance factor for this simplified estimate. Actual PV system performance varies with solar resource, tilt, azimuth, shading, soiling, temperature, wiring, inverter behavior, and other site-specific conditions."
                />
              </div>
            </div>
          )}
        </div>
      }
      resultSection={
        <div className="space-y-6">
          {/* Primary Result Card */}
          <ResultCard
            primaryTitle="Estimated Solar System Size"
            primaryValue={`${formatKw(result.systemSizeKw)} kW DC`}
            primarySubtext={`${formatWattsNumber(result.systemSizeWatts)} Watts DC array nameplate rating`}
            stats={[
              {
                label: "Approximate Panels",
                value: `~${result.roundedPanelCount} Panels`,
                subtext: `Mathematical planning count (@ ${panelWattage}W)`,
              },
              {
                label: "Target Solar Energy",
                value: `${formatKwhNumber(result.targetDailySolarKwh)} kWh/d`,
                subtext: `${solarOffsetPercent}% offset of daily consumption`,
              },
              {
                label: "Illustrative Roof Area Estimate",
                value: `~${result.estimatedRoofAreaModulesSqFt} sq ft`,
                subtext: "Module surface area only",
              },
              {
                label: "Installed Array Rating",
                value: `${formatKw(result.actualArraySizeKw)} kW DC`,
                subtext: `${result.roundedPanelCount} × ${panelWattage}W modules`,
              },
            ]}
          />

          {/* Step-by-Step Energy & Production Breakdown Card */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Step-by-Step Sizing & Production Breakdown</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <span className="text-slate-600">1. Average Monthly Consumption:</span>
                <span className="font-semibold text-slate-900">{formatKwhNumber(result.monthlyKwh)} kWh / month</span>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <span className="text-slate-600">2. Average Daily Energy Demand (÷ 30 days):</span>
                <span className="font-semibold text-slate-900">{formatKwhNumber(result.dailyEnergyKwh)} kWh / day</span>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <span className="text-slate-600">3. Target Daily Solar Offset ({result.solarOffsetPercent}%):</span>
                <span className="font-semibold text-blue-700">{formatKwhNumber(result.targetDailySolarKwh)} kWh / day</span>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <span className="text-slate-600">4. Daily Solar Yield Factor ({result.peakSunHours} PSH × {Math.round(result.performanceRatio * 100)}% PR):</span>
                <span className="font-semibold text-slate-900">{(result.peakSunHours * result.performanceRatio).toFixed(2)} kWh / kW / day</span>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <span className="text-slate-600">5. Required PV Array Size:</span>
                <span className="font-bold text-slate-900">{formatKw(result.systemSizeKw)} kW ({formatWattsNumber(result.systemSizeWatts)} W)</span>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <span className="text-slate-600">6. Unrounded Mathematical Module Ratio:</span>
                <span className="font-mono text-slate-700">{result.rawPanelCount.toFixed(2)} modules</span>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <span className="text-slate-600">7. Approximate Modules (Rounded Up):</span>
                <span className="font-bold text-blue-700">~{result.roundedPanelCount} modules</span>
              </div>
              <div className="flex items-center justify-between pt-1 font-semibold">
                <span className="text-slate-700">Estimated Annual Solar Production:</span>
                <span className="text-emerald-700 font-bold">~{formatKwhNumber(result.estimatedAnnualProductionKwh)} kWh / year</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 italic pt-1 border-t border-slate-100">
              Note: Rounding up panel count yields an installed capacity of {formatKw(result.actualArraySizeKw)} kW, providing a small margin above the exact baseline target.
            </p>
          </div>

          {/* Panel Wattage Comparison Table */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Grid className="w-4 h-4 text-blue-600" />
                <span>Panel Wattage Comparison Table</span>
              </div>
              <span className="text-[11px] font-semibold text-slate-500">
                Target: {formatKw(result.systemSizeKw)} kW
              </span>
            </div>
            <p className="text-xs text-slate-600">
              See how physical panel count and roof footprint adjust depending on the rated wattage of the photovoltaic modules you install:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                    <th className="py-2 px-2.5">Module Rating</th>
                    <th className="py-2 px-2.5">Exact Ratio</th>
                    <th className="py-2 px-2.5">Approx. Panels</th>
                    <th className="py-2 px-2.5">Array Rating</th>
                    <th className="py-2 px-2.5">Module Area</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {result.comparisonRows.map((row) => (
                    <tr
                      key={row.panelWattage}
                      className={
                        row.isCurrentSelection
                          ? "bg-blue-50/80 font-bold text-blue-950"
                          : "hover:bg-slate-50/60 text-slate-800"
                      }
                    >
                      <td className="py-2 px-2.5 flex items-center gap-1.5">
                        {row.isCurrentSelection && (
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                        )}
                        <span>{row.panelWattage} Watts</span>
                        {row.isCurrentSelection && (
                          <span className="text-[10px] bg-blue-200 text-blue-900 px-1 rounded font-normal">
                            selected
                          </span>
                        )}
                      </td>
                      <td className="py-2 px-2.5 font-mono text-slate-600">
                        {row.rawCount.toFixed(1)}
                      </td>
                      <td className="py-2 px-2.5 font-bold">
                        ~{row.roundedCount} panels
                      </td>
                      <td className="py-2 px-2.5 font-mono">
                        {formatKw(row.installedKw)} kW
                      </td>
                      <td className="py-2 px-2.5 text-slate-600">
                        ~{row.estimatedRoofSqFt} sq ft
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-slate-500 italic">
              Illustrative module area calculated using approximately 21 sq ft per panel. This illustrative estimate does not model local fire setbacks, access pathways, roof obstructions, structural constraints, or jurisdiction-specific requirements.
            </p>
          </div>

          {/* Illustrative Roof Area Estimate Card */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Maximize2 className="w-4 h-4 text-blue-600" />
              <span>Illustrative Roof Area Estimate</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200">
              <div className="text-xs font-semibold text-slate-600">Estimated Module Surface Area</div>
              <div className="text-lg font-black text-blue-700 font-mono mt-0.5">
                ~{result.estimatedRoofAreaModulesSqFt} sq ft
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Based on ~{result.roundedPanelCount} modules at approximately 21 sq ft per panel
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              This illustrative estimate does not model local fire setbacks, access pathways, roof obstructions, structural constraints, or jurisdiction-specific requirements.
            </p>
          </div>
        </div>
      }
    >
      {/* Supporting Editorial, Diagrams, and Educational Sections */}
      <div className="space-y-12">
        {/* Figure 1: Hero Visual Image */}
        <figure className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900">
          <Image
            src="/images/calculators/solar-system-size-calculator.webp"
            alt="Modern residential single-family suburban home with sleek rooftop solar panel installation under clear midday sun"
            width={1200}
            height={675}
            priority
            className="w-full h-auto object-cover"
          />
          <figcaption className="p-4 bg-slate-900/90 text-slate-300 text-xs leading-relaxed border-t border-slate-800">
            <span className="font-semibold text-white">Figure 1: Residential Rooftop Solar Array Architecture: </span>
            A typical single-family residential home equipped with modern monocrystalline photovoltaic panels. Sizing an array requires balancing utility energy demand, local solar insolation (peak sun hours), and available unshaded south- and west-facing roof planes.
          </figcaption>
        </figure>

        {/* System Sizing SVG Flow Diagram */}
        <SolarSystemSizeFlowDiagram
          monthlyKwh={result.monthlyKwh}
          dailyEnergyKwh={result.dailyEnergyKwh}
          targetDailySolarKwh={result.targetDailySolarKwh}
          solarOffsetPercent={result.solarOffsetPercent}
          peakSunHours={result.peakSunHours}
          performanceRatio={result.performanceRatio}
          systemSizeKw={result.systemSizeKw}
          panelWattage={result.panelWattage}
          roundedPanelCount={result.roundedPanelCount}
          actualArraySizeKw={result.actualArraySizeKw}
          estimatedAnnualProductionKwh={result.estimatedAnnualProductionKwh}
          estimatedRoofAreaModulesSqFt={result.estimatedRoofAreaModulesSqFt}
        />

        {/* In-Depth Technical Editorial Guide */}
        <section className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed text-sm md:text-base">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            Understanding Residential Solar System Sizing
          </h2>
          <p>
            Determining how many solar panels you need begins with an analysis of your annual electrical energy consumption rather than the physical size of your house. Two homes with identical 2,500-square-foot floor plans can have drastically different power requirements: one with natural gas heating and minimal air conditioning might consume 600 kWh per month, while an all-electric home featuring dual heat pumps, an electric vehicle charger, and a heated pool pump can easily exceed 2,000 kWh per month.
          </p>
          <p>
            A photovoltaic solar system generates electricity whenever sunlight strikes its semiconductor cells. Because energy demand fluctuates across hours, days, and seasons, grid-tied residential solar is traditionally sized to produce an amount of energy over twelve months that offsets your home&apos;s total annual kilowatt-hour demand.
          </p>

          <h3 className="text-lg md:text-xl font-bold text-slate-900 pt-2">
            How to Determine Your Daily Electricity Consumption
          </h3>
          <p>
            Electric utility companies bill customers in kilowatt-hours (kWh). One kilowatt-hour represents 1,000 Watts of electrical power consumed continuously for one hour. To find your consumption baseline:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-semibold text-slate-900">Gather 12 months of utility statements:</span> Electricity consumption changes throughout the year. Winter brings electric heating loads and lighting demands, while summer drives air conditioning compressors. Summing 12 consecutive months captures seasonal peaks and valleys.
            </li>
            <li>
              <span className="font-semibold text-slate-900">Calculate average monthly usage:</span> Divide your annual kilowatt-hours by 12. For example, if your home used 10,800 kWh over the past year, your average monthly consumption is 900 kWh.
            </li>
            <li>
              <span className="font-semibold text-slate-900">Derive daily energy demand:</span> Dividing 900 kWh by 30 days gives a daily consumption baseline of 30.0 kWh per day.
            </li>
          </ul>

          <h3 className="text-lg md:text-xl font-bold text-slate-900 pt-2">
            What Are Peak Sun Hours and Why They Are Not Daylight Hours
          </h3>
          <p>
            One of the most frequent misconceptions in solar planning is confusing total daylight hours with <span className="font-semibold text-slate-900">peak sun hours (PSH)</span>. A location may experience 14 hours of daylight on a June day, yet only accumulate 5.2 peak sun hours.
          </p>
          <p>
            Early morning and late afternoon sunlight strikes solar panels at steep angles and passes through a thicker atmospheric layer, producing weak irradiance (often 100 to 300 W/m²). At solar noon on a clear day, irradiance approaches 1,000 W/m² under standard test conditions. To simplify harvest calculations, solar engineers integrate varying daily sunlight into equivalent hours of full 1,000 W/m² irradiance.
          </p>
          <p>
            According to the National Solar Radiation Database (NSRDB) maintained by the National Renewable Energy Laboratory (NREL), annualized daily peak sun hours across the United States typically range from 3.5 PSH in cloudy northern regions to 6.0+ PSH in the desert Southwest.
          </p>

          <h3 className="text-lg md:text-xl font-bold text-slate-900 pt-2">
            Understanding the Planning Performance Factor and System Losses
          </h3>
          <p>
            Solar panels carry a laboratory DC nameplate rating measured at Standard Test Conditions (STC: cell temperature of 25°C / 77°F, irradiance of 1,000 W/m², and air mass 1.5). Rooftop panels never operate permanently at STC. Several real-world factors reduce power generation:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-900 text-sm">Thermal Derating (Temperature Coefficient)</div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                As dark solar cells absorb sunlight on hot summer roofs, cell temperatures often reach 50°C to 65°C. Monocrystalline silicon exhibits a negative temperature coefficient of roughly -0.35% per °C above 25°C, causing an 8% to 14% drop in peak power on hot sunny days.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-900 text-sm">Inverter DC-to-AC Conversion Efficiency</div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Solar modules generate direct current (DC), whereas household appliances and utility grids use alternating current (AC). Modern string inverters and microinverters operate at 95% to 97% peak conversion efficiency, representing a 3% to 5% loss.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-900 text-sm">Conductor Resistance & Voltage Drop</div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Long wiring homeruns between roof solar strings, rapid-shutdown boxes, and service equipment introduce electrical resistance, consuming 1% to 2% of generated power as heat.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-900 text-sm">Soiling, Snow, and Module Mismatch</div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Pollen, dust, bird droppings, and slight factory tolerances between individual modules contribute an additional 2% to 4% in balance-of-system losses.
              </p>
            </div>
          </div>
          <p>
            Combining these derating factors produces an overall <span className="font-semibold text-slate-900">Planning Performance Factor</span>. CalcMyPower uses 78% as an illustrative planning performance factor for this simplified estimate. Actual PV system performance varies with solar resource, tilt, azimuth, shading, soiling, temperature, wiring, inverter behavior, and other site-specific conditions.
          </p>

          <h3 className="text-lg md:text-xl font-bold text-slate-900 pt-2">
            Panel Wattage: Balancing Module Count and Available Roof Area
          </h3>
          <p>
            Because solar array capacity is calculated in total kilowatts, panel wattage determines the physical module count required. Standard modern residential modules feature 54 full cells or 108 half-cut monocrystalline PERC or TOPCon cells, delivering between 390 Watts and 430 Watts within a standardized dimension of roughly 68 inches by 44 inches (~20.8 sq ft).
          </p>
          <p>
            If your target system size is 8.55 kW (8,550 Watts):
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Using older 350-Watt panels requires 25 panels (~525 sq ft of module space).</li>
            <li>Using modern 400-Watt panels requires 22 panels (~462 sq ft of module space).</li>
            <li>Using high-output 450-Watt panels requires 19 panels (~399 sq ft of module space).</li>
          </ul>
          <p>
            Homes with complex roof geometries, multiple dormers, chimney shadows, or limited south-facing planes benefit substantially from higher-wattage modules because fewer physical panels are needed to hit the target production capacity.
          </p>

          <h3 className="text-lg md:text-xl font-bold text-slate-900 pt-2">
            Roof Plane Sizing and Physical Layout Considerations
          </h3>
          <p>
            Calculating that an array requires approximately 22 panels provides an illustrative module surface estimate of roughly 460 square feet. However, this illustrative estimate does not model local fire setbacks, access pathways, roof obstructions, structural constraints, or jurisdiction-specific requirements. Real-world rooftop planning involves several site-specific physical factors:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-semibold text-slate-900">Local setback and pathway requirements:</span> Municipal building codes often specify access margins along ridges, hips, or valleys to accommodate emergency access and ventilation, which vary by jurisdiction and roof architecture.
            </li>
            <li>
              <span className="font-semibold text-slate-900">Roof pitch and azimuth:</span> True south-facing roofs (180° azimuth) at a tilt angle approximately equal to local latitude capture maximum annual solar energy. West-facing roofs produce slightly less annual total energy but align favorably with afternoon peak utility rates.
            </li>
            <li>
              <span className="font-semibold text-slate-900">Structural framing capacity:</span> Solar panels, racking rails, and mounting hardware add dead load to roof rafters or trusses. Older roofs may require structural verification or reroofing before mounting equipment.
            </li>
          </ul>

          <h3 className="text-lg md:text-xl font-bold text-slate-900 pt-2">
            Grid-Tied Net Metering vs Battery Storage Sizing
          </h3>
          <p>
            This calculator estimates the size of your <span className="font-semibold text-slate-900">solar generation array</span>. In a traditional grid-tied system operating under 1:1 net energy metering (NEM), the utility grid acts as a virtual battery: excess power generated at midday flows into the grid for credits, and you draw power from the grid at night.
          </p>
          <p>
            In areas operating under net billing tariffs (such as California NEM 3.0) or for homes seeking emergency blackout resilience, adding a dedicated battery storage system is essential. If your goal is off-grid living or overnight backup power, use our dedicated{" "}
            <Link
              href="/solar-battery-calculator"
              className="text-blue-600 font-semibold underline hover:text-blue-800"
            >
              Solar Battery Sizing Calculator
            </Link>{" "}
            to determine required Amp-hour and kilowatt-hour battery bank capacities independently.
          </p>
        </section>

        {/* Mathematical Formulas Section */}
        <FormulaSection
          title="Solar System Sizing Calculation Formulas"
          description="Mathematical formulas used to determine daily solar energy target, required DC array nameplate size, approximate panel count, and spatial roof area."
          formulaDisplay="System Size (kW DC) = E_target ÷ (Peak Sun Hours × Planning Performance Factor) | Panel Count = Math.ceil(P_array_W ÷ W_panel)"
          variables={[
            {
              symbol: "E_target",
              name: "Target Daily Solar Energy",
              unit: "kWh / day",
              description: "Target daily solar energy requirement in kilowatt-hours (E_daily × Offset Fraction)",
            },
            {
              symbol: "E_daily",
              name: "Average Daily Demand",
              unit: "kWh / day",
              description: "Average daily electricity consumption in kilowatt-hours (Monthly kWh ÷ 30 days)",
            },
            {
              symbol: "Peak Sun Hours",
              name: "Solar Insolation",
              unit: "Hours (PSH)",
              description: "Average daily solar insolation in equivalent hours at 1,000 W/m² (NSRDB / NREL reference)",
            },
            {
              symbol: "Factor",
              name: "Planning Performance Factor",
              unit: "Unitless (0.50 - 0.95)",
              description: "Illustrative planning factor (default 78% / 0.78 for temperature, inverter, wiring, and soiling losses)",
            },
            {
              symbol: "W_panel",
              name: "Panel Rated Power",
              unit: "Watts (W)",
              description: "Nameplate DC rated wattage of individual photovoltaic solar panels (default 400 Watts)",
            },
            {
              symbol: "Panel Count",
              name: "Approximate Panels",
              unit: "Modules",
              description: "Approximate physical module count rounded up to the nearest integer for planning purposes",
            },
          ]}
          notes={[
            "Assumes a standard 30-day billing cycle divisor for converting monthly utility usage to daily energy demand.",
            "CalcMyPower uses 78% as an illustrative planning performance factor for this simplified estimate. Actual PV system performance varies with solar resource, tilt, azimuth, shading, soiling, temperature, wiring, inverter behavior, and other site-specific conditions.",
            "Panel count rounding up provides a conservative planning margin; actual string inverter configurations may require specific panel multiples (such as even string lengths).",
            "This model provides preliminary energy planning; it does not replace site-specific shading, azimuth, or electrical service panel busbar evaluations.",
          ]}
        />

        {/* Step-by-Step Worked Example */}
        <WorkedExampleSection
          title="Worked Example: Sizing an Average U.S. Household Solar Array (900 kWh/mo)"
          scenario="A single-family residence consumes an average of 900 kWh monthly according to utility billing statements. The home is located in a region receiving 4.5 peak sun hours per day and the homeowner wishes to offset 100% of their consumption using modern 400-Watt monocrystalline modules at a 78% planning performance factor."
          steps={workedSteps}
          conclusion="Sizing for 900 kWh/month under 4.5 peak sun hours with a 78% planning performance factor requires an 8.55 kW DC array, or approximately 22 modern 400-Watt panels with an illustrative module area of approximately 462 square feet. This illustrative estimate does not model local fire setbacks, access pathways, roof obstructions, structural constraints, or jurisdiction-specific requirements."
        />

        {/* Sizing Assumptions Section */}
        <AssumptionsSection
          title="Solar PV Sizing Assumptions & Variables"
          description="Core technical assumptions, solar insolation metrics, and mathematical baselines used in the solar array sizing engine."
          assumptions={sizingAssumptions}
        />

        {/* Frequently Asked Questions (AEO Structured Content) */}
        <FaqSection
          title="Solar System Size Frequently Asked Questions"
          faqs={SOLAR_SYSTEM_SIZE_FAQS.map((faq) => ({
            question: faq.question,
            answer: faq.fullExplanation,
          }))}
        />

        {/* Preliminary Planning & Engineering Disclaimer */}
        <DisclaimerSection
          title="Preliminary Planning & Engineering Disclaimer"
          points={[
            "This solar system size calculator provides preliminary mathematical estimates based on simplified balance-of-system models and user-entered utility consumption data. It does not constitute professional engineering advice, structural roof certification, electrical design, or definitive energy generation forecasts.",
            "Actual solar production depends heavily on exact roof compass orientation (azimuth), roof pitch, local microclimate cloud cover, tree and chimney shading, inverter clipping thresholds, electrical panel busbar limitations (NEC Section 705.12), and utility interconnection rules.",
            "Working with high-voltage photovoltaic direct current and utility electrical panels involves severe risks of electrical shock, arc flash, roof falls, and fire hazards. Always consult a qualified licensed solar contractor or professional electrical engineer to verify physical equipment sizing, roof structural integrity, and local permitting compliance prior to purchasing or installing solar equipment.",
          ]}
        />

        {/* Related Calculators & Sizing Tools */}
        <RelatedCalculators calculators={RELATED_TOOLS} />
      </div>
    </CalculatorShell>
  );
};
