"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  calculateGeneratorAmperage,
  GeneratorVoltageConfig,
  GENERATOR_VOLTAGE_OPTIONS,
  STANDARD_GENERATOR_PRESETS,
  GENERATOR_AMPERAGE_CHART_DATA,
  GeneratorChartRow,
} from "@/lib/calculators/generator-amperage";
import { InputField } from "@/components/ui/InputField";
import { SelectField } from "@/components/ui/SelectField";
import { ResultCard } from "@/components/ui/ResultCard";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { FormulaSection } from "@/components/calculators/FormulaSection";
import { WorkedExampleSection } from "@/components/calculators/WorkedExampleSection";
import { AssumptionsSection } from "@/components/calculators/AssumptionsSection";
import { DisclaimerSection } from "@/components/calculators/DisclaimerSection";
import { FaqSection } from "@/components/calculators/FaqSection";
import { RelatedCalculators } from "@/components/calculators/RelatedCalculators";
import { getAmazonSearchUrl, AMAZON_LINK_REL } from "@/config/affiliate";
import {
  AlertCircle,
  ExternalLink,
  ShoppingBag,
  ArrowRight,
  ShieldAlert,
  Zap,
  Search,
  Table as TableIcon,
} from "lucide-react";

export const GeneratorAmperageCalculator: React.FC = () => {
  // Input states with sensible defaults (7,500W standard portable generator)
  const [powerWatts, setPowerWatts] = useState<number>(7500);
  const [voltageConfig, setVoltageConfig] = useState<GeneratorVoltageConfig>("120_240v_split");
  const [powerFactor, setPowerFactor] = useState<number>(1.0);
  const [continuousLoadPercent, setContinuousLoadPercent] = useState<number>(80);

  // Table filter states
  const [chartSearch, setChartSearch] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Pure calculation
  const results = useMemo(() => {
    return calculateGeneratorAmperage({
      powerWatts,
      voltageConfig,
      powerFactor,
      continuousLoadPercent,
    });
  }, [powerWatts, voltageConfig, powerFactor, continuousLoadPercent]);

  const handleReset = () => {
    setPowerWatts(7500);
    setVoltageConfig("120_240v_split");
    setPowerFactor(1.0);
    setContinuousLoadPercent(80);
  };

  const handlePreset = (preset: { watts: number; config: GeneratorVoltageConfig }) => {
    setPowerWatts(preset.watts);
    setVoltageConfig(preset.config);
  };

  // Filtered chart rows
  const filteredChartRows = useMemo(() => {
    return GENERATOR_AMPERAGE_CHART_DATA.filter((row: GeneratorChartRow) => {
      const matchesCategory =
        categoryFilter === "all" ||
        (categoryFilter === "inverter" && row.category === "Compact Inverter") ||
        (categoryFilter === "portable" && row.category === "Medium Portable") ||
        (categoryFilter === "standby" && row.category === "Heavy Standby");

      const query = chartSearch.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        row.watts.toString().includes(query) ||
        row.kw.toString().includes(query) ||
        row.category.toLowerCase().includes(query) ||
        row.commonApplications.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [chartSearch, categoryFilter]);

  const voltageOptionsForSelect = GENERATOR_VOLTAGE_OPTIONS.map((opt) => ({
    value: opt.value,
    label: opt.label,
  }));

  return (
    <CalculatorShell
      title="Generator Amperage Chart & Electrical Calculator"
      badge="Electrical Current Conversion"
      category="Generators & Outage Backup"
      lastUpdated="October 2026"
      description="Calculate full-load output current (Amps), 80% continuous operating capacity, and apparent power in kVA for portable and standby generators across 120V, 240V split-phase, and 3-phase circuits. Includes a comprehensive generator amperage reference chart."
      onReset={handleReset}
      inputSection={
        <div className="space-y-6">
          {/* Presets */}
          <div>
            <p className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Common Generator Ratings
            </p>
            <div className="flex flex-wrap gap-2">
              {STANDARD_GENERATOR_PRESETS.map((p) => {
                const isActive = powerWatts === p.watts && voltageConfig === p.config;
                return (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => handlePreset(p)}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition ${
                      isActive
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generator Power Input */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
            <InputField
              id="powerWatts"
              label="Generator Rated Power"
              value={powerWatts}
              onChange={setPowerWatts}
              unit="Watts (W)"
              min={100}
              max={250000}
              step={100}
              helpText="Enter the running (continuous) rated wattage of the generator."
              required
            />

            <SelectField
              id="voltageConfig"
              label="Output Voltage System"
              value={voltageConfig}
              options={voltageOptionsForSelect}
              onChange={(val) => setVoltageConfig(val as GeneratorVoltageConfig)}
              helpText="Select 120/240V Split-Phase for standard US portable home backup generators with 4-prong outlets."
            />
          </div>

          {/* Controls: Power Factor and Continuous Operating Band */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start pt-2 border-t border-slate-100">
            <InputField
              id="powerFactor"
              label="Power Factor (PF)"
              value={powerFactor}
              onChange={setPowerFactor}
              unit="0.5 to 1.0"
              min={0.5}
              max={1.0}
              step={0.05}
              helpText="Default is 1.0 (unity) for residential portable generators powering resistive loads."
            />

            <div>
              <span className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Continuous Operating Threshold
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setContinuousLoadPercent(80)}
                  className={`text-xs px-3 py-2.5 rounded-lg border font-medium transition text-center ${
                    continuousLoadPercent === 80
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  80% Continuous Safe Band
                </button>
                <button
                  type="button"
                  onClick={() => setContinuousLoadPercent(100)}
                  className={`text-xs px-3 py-2.5 rounded-lg border font-medium transition text-center ${
                    continuousLoadPercent === 100
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  100% Unrated Capacity
                </button>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Standard operating practice recommends derating continuous loads to 80% to avoid thermal overload during multi-hour outages.
              </p>
            </div>
          </div>

          {/* Validation Errors */}
          {results.errors.length > 0 && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs space-y-1">
              {results.errors.map((err, i) => (
                <div key={i} className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{err.message}</span>
                </div>
              ))}
            </div>
          )}

          {/* Engineering Warnings */}
          {results.warnings.length > 0 && (
            <div className="space-y-2">
              {results.warnings.map((warn, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5 leading-relaxed"
                >
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{warn}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      }
      resultSection={
        <div className="space-y-6">
          {/* Primary Result Banner */}
          <ResultCard
            primaryTitle="Rated Output Current"
            primaryValue={results.formattedRatedAmps}
            primarySubtext={
              voltageConfig === "120_240v_split"
                ? "At 240V across Line 1 and Line 2"
                : `At ${results.nominalVoltage}V nominal operating voltage`
            }
            icon="zap"
            stats={[
              {
                label: "80% Continuous Safe Load",
                value: results.formattedContinuousSafeAmps,
                subtext: "Recommended continuous duty band",
              },
              {
                label: "Real Output Power",
                value: `${results.powerKw.toFixed(1)} kW`,
                subtext: `${results.powerWatts.toLocaleString()} Watts`,
              },
              {
                label: "Apparent Power",
                value: `${results.apparentPowerKva.toFixed(2)} kVA`,
                subtext: `Power Factor: ${results.powerFactor}`,
              },
              {
                label: "Nominal Operating Voltage",
                value: `${results.nominalVoltage} V`,
                subtext: "RMS Circuit Potential",
              },
            ]}
            warnings={results.warnings}
          />

          {/* Split-Phase Detailed Breakdown Card */}
          {results.splitPhaseDetails && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 md:p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-600" />
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  120/240V Dual-Voltage Leg Breakdown
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block mb-0.5">240V Output (Both Legs):</span>
                  <span className="text-base font-bold text-slate-900 font-mono">
                    {results.splitPhaseDetails.formattedAmpsAt240V}
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-1">
                    For 240V well pump, dryer, or whole-house subpanel
                  </span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block mb-0.5">Each 120V Leg (Balanced):</span>
                  <span className="text-base font-bold text-blue-600 font-mono">
                    {results.splitPhaseDetails.formattedAmpsPer120VLeg}
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-1">
                    Maximum current available on Leg 1 or Leg 2 individually
                  </span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block mb-0.5">Total Combined 120V Capacity:</span>
                  <span className="text-base font-bold text-slate-900 font-mono">
                    {results.splitPhaseDetails.formattedTotal120VCombinedAmps}
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-1">
                    Sum of both 120V legs if loads are perfectly split
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Formula Reference */}
          <div className="bg-slate-900 text-slate-200 rounded-xl p-4 font-mono text-xs overflow-x-auto space-y-1.5">
            <p className="text-slate-400 font-sans text-[11px] uppercase tracking-wider">
              Calculation Formula Output:
            </p>
            <p className="text-emerald-400">{results.formulaExplanation}</p>
            <p className="text-slate-400 text-[11px]">
              Continuous rating derated to {continuousLoadPercent}%: {results.ratedAmps.toFixed(2)}A x {(continuousLoadPercent / 100).toFixed(2)} = {results.continuousSafeAmps.toFixed(2)}A
            </p>
          </div>
        </div>
      }
    >
      {/* Section: Comprehensive Generator Amperage Chart Matrix */}
      <section id="chart-section" className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <TableIcon className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                Generator Amperage Chart (1,000W to 26,000W)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              Quick reference guide comparing rated output amperage, continuous safe current, and apparent power in kVA across popular generator ratings.
            </p>
          </div>

          {/* Search and Category Filter Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="chartSearch"
                name="chartSearch"
                aria-label="Search generator wattage or application"
                type="text"
                value={chartSearch}
                onChange={(e) => setChartSearch(e.target.value)}
                placeholder="Search wattage or application..."
                className="pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 sm:w-56"
              />
            </div>
            <div className="flex rounded-lg border border-slate-200 p-0.5 bg-slate-50 text-xs">
              <button
                type="button"
                onClick={() => setCategoryFilter("all")}
                className={`px-2.5 py-1 rounded-md font-medium transition ${
                  categoryFilter === "all" ? "bg-white text-blue-600 shadow-xs" : "text-slate-600"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setCategoryFilter("inverter")}
                className={`px-2.5 py-1 rounded-md font-medium transition ${
                  categoryFilter === "inverter" ? "bg-white text-blue-600 shadow-xs" : "text-slate-600"
                }`}
              >
                Inverter (1 to 3kW)
              </button>
              <button
                type="button"
                onClick={() => setCategoryFilter("portable")}
                className={`px-2.5 py-1 rounded-md font-medium transition ${
                  categoryFilter === "portable" ? "bg-white text-blue-600 shadow-xs" : "text-slate-600"
                }`}
              >
                Portable (3.5 to 8.5kW)
              </button>
              <button
                type="button"
                onClick={() => setCategoryFilter("standby")}
                className={`px-2.5 py-1 rounded-md font-medium transition ${
                  categoryFilter === "standby" ? "bg-white text-blue-600 shadow-xs" : "text-slate-600"
                }`}
              >
                Standby (10 to 26kW)
              </button>
            </div>
          </div>
        </div>

        {/* Responsive Table with semantic markup */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs" aria-label="Generator Amperage and Rating Reference Chart">
            <caption className="sr-only">
              Comprehensive reference chart of generator wattage to amperage conversions across 120V and 240V systems
            </caption>
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th scope="col" className="py-3 px-3.5">Generator Rating</th>
                <th scope="col" className="py-3 px-3">Category</th>
                <th scope="col" className="py-3 px-3">Amps @ 120V</th>
                <th scope="col" className="py-3 px-3">Amps @ 240V</th>
                <th scope="col" className="py-3 px-3">80% Safe Amps</th>
                <th scope="col" className="py-3 px-3">kVA @ 0.8 PF</th>
                <th scope="col" className="py-3 px-3">Typical Applications</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {filteredChartRows.map((row) => (
                <tr
                  key={row.watts}
                  className={`hover:bg-blue-50/40 transition ${
                    powerWatts === row.watts ? "bg-blue-50/70 font-semibold" : ""
                  }`}
                >
                  <th scope="row" className="py-3 px-3.5 whitespace-nowrap font-normal text-left">
                    <span className="font-bold text-slate-900 font-mono">
                      {row.watts.toLocaleString()} W
                    </span>
                    <span className="text-[11px] text-slate-600 block">({row.kw.toFixed(1)} kW)</span>
                  </th>
                  <td className="py-3 px-3 text-slate-700 whitespace-nowrap">{row.category}</td>
                  <td className="py-3 px-3 font-mono text-slate-800 whitespace-nowrap">
                    {row.ratedAmps120V.toFixed(1)} A
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-800 whitespace-nowrap">
                    {row.ratedAmps240V > 0 ? `${row.ratedAmps240V.toFixed(1)} A` : "N/A (120V only)"}
                  </td>
                  <td className="py-3 px-3 font-mono text-emerald-700 whitespace-nowrap">
                    {row.ratedAmps240V > 0
                      ? `${row.continuousAmps240V.toFixed(1)} A @ 240V`
                      : `${row.continuousAmps120V.toFixed(1)} A @ 120V`}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-700 whitespace-nowrap">
                    {row.apparentPowerKva08Pf.toFixed(2)} kVA
                  </td>
                  <td className="py-3 px-3 text-slate-600 max-w-xs">{row.commonApplications}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Note: Amps at 120V and 240V assume standard power factor of 1.0. For 120/240V split-phase units, the 240V column represents the maximum line current delivered to a 240V subpanel or across both hot legs simultaneously.
        </p>
      </section>

      {/* Recommended Hardware & Diagnostic Tools (Rule 11 Affiliate Utility) */}
      <section className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 space-y-5">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg md:text-xl font-bold text-slate-900">
            Recommended Generator Cords &amp; Diagnostic Tools
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Ensure your generator hookup operates safely under continuous electrical current with properly rated cords, power inlet boxes, and diagnostic meters:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <a
            href={getAmazonSearchUrl("NEMA L14-30P generator cord 10 gauge 30 amp")}
            target="_blank"
            rel={AMAZON_LINK_REL}
            className="group p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition space-y-2 block"
          >
            <div className="flex items-center justify-between text-blue-600 font-semibold">
              <span>30A Generator Cord</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Heavy-duty 4-prong NEMA L14-30P twist-lock cord rated for 7,500W generators and 30A manual transfer switch boxes.
            </p>
          </a>

          <a
            href={getAmazonSearchUrl("50 amp generator cord 6 gauge NEMA 14-50P")}
            target="_blank"
            rel={AMAZON_LINK_REL}
            className="group p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition space-y-2 block"
          >
            <div className="flex items-center justify-between text-blue-600 font-semibold">
              <span>50A Heavy Duty Cord</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Heavy copper cord with NEMA 14-50P connection for 10,000W to 12,000W whole-house backup generators.
            </p>
          </a>

          <a
            href={getAmazonSearchUrl("generator power inlet box 30 amp 50 amp weatherproof")}
            target="_blank"
            rel={AMAZON_LINK_REL}
            className="group p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition space-y-2 block"
          >
            <div className="flex items-center justify-between text-blue-600 font-semibold">
              <span>Power Inlet Box</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Exterior weatherproof inlet box wired directly to your transfer switch or mechanical panel interlock kit.
            </p>
          </a>

          <a
            href={getAmazonSearchUrl("digital AC clamp meter true rms electrical")}
            target="_blank"
            rel={AMAZON_LINK_REL}
            className="group p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition space-y-2 block"
          >
            <div className="flex items-center justify-between text-blue-600 font-semibold">
              <span>Digital Clamp Meter</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Verify line current on each 120V generator leg to confirm your household backup load is properly balanced.
            </p>
          </a>
        </div>
      </section>

      {/* Formula Section */}
      <FormulaSection
        title="Generator Amperage Calculation Formulas"
        formulaDisplay={`1. AC Single-Phase (120V or 240V):
   I = P ÷ (V × PF)

2. AC Split-Phase (120/240V Dual Voltage):
   I_240V = P ÷ (240V × PF)
   I_120V_per_leg = (P ÷ 2) ÷ (120V × PF) = I_240V
   I_120V_combined = P ÷ (120V × PF) = 2 × I_240V

3. AC Balanced Three-Phase (Line-to-Line):
   I = P ÷ (√3 × V_LL × PF) = P ÷ (1.732 × V_LL × PF)

4. Continuous Operating Current (80% Reference Band):
   I_continuous = I_rated × 0.80`}
        description="Electrical current is inversely proportional to circuit voltage. Increasing the voltage from 120V to 240V cuts the required amperage exactly in half for the same wattage output, reducing conductor heating and thermal stress."
        variables={[
          {
            symbol: "I",
            name: "Current",
            unit: "Amperes (A)",
            description: "Full-load electrical current flowing through circuit conductors.",
          },
          {
            symbol: "P",
            name: "Real Power",
            unit: "Watts (W)",
            description: "The rated continuous or running power capacity of the generator engine and alternator.",
          },
          {
            symbol: "V",
            name: "Nominal Voltage",
            unit: "Volts (V)",
            description: "Operating root-mean-square (RMS) circuit potential (120V, 240V, 208V, or 480V).",
          },
          {
            symbol: "PF",
            name: "Power Factor",
            unit: "0.5 to 1.0",
            description: "Ratio of real power (W) to apparent power (VA). Unity (1.0) for pure resistive loads.",
          },
        ]}
        notes={[
          "Under standard residential generator ratings, nameplate wattage is specified at unity power factor (PF = 1.0). When driving heavy inductive motors (air conditioning compressors, large well pumps), power factor may decrease to 0.80 to 0.85, increasing the apparent current in Amperes.",
          "On 120/240V dual-voltage portable generators, the 120V outlets are split across two separate winding coils. Each 120V leg provides only half the generator's total rated wattage.",
        ]}
      />

      {/* Worked Example Section */}
      <WorkedExampleSection
        title="Worked Example: Current and Leg Balance for a 7,500-Watt Generator"
        scenario="A homeowner owns a 7,500-Watt dual-fuel portable generator with a 120/240V output. The generator powers essential household circuits through a transfer switch during a utility outage."
        steps={[
          {
            stepNumber: 1,
            title: "Calculate Rated 240V Current",
            calculation: "I = 7,500 W ÷ (240 V × 1.0) = 31.25 Amperes",
            explanation:
              "At 240 Volts, the generator delivers 31.25 Amps across the two hot legs combined. This is the maximum line current flowing into a 240V transfer switch.",
          },
          {
            stepNumber: 2,
            title: "Calculate Balanced 120V Leg Capacity",
            calculation: "I_leg = (7,500 W ÷ 2) ÷ 120 V = 3,750 W ÷ 120 V = 31.25 Amperes per leg",
            explanation:
              "Because the 7,500W rating is divided equally between Line 1 and Line 2, each 120V circuit leg can supply up to 31.25 Amps. Neither individual leg should be loaded beyond 31.25 Amps.",
          },
          {
            stepNumber: 3,
            title: "Apply the 80% Continuous Safe Load Margin",
            calculation: "I_continuous = 31.25 A × 0.80 = 25.0 Amperes continuous",
            explanation:
              "To prevent engine overheating and internal thermal breaker trips during extended outages lasting several hours, continuous demand should be maintained at or below 25 Amps at 240V (6,000 Watts).",
          },
          {
            stepNumber: 4,
            title: "Calculate Apparent Power Under Inductive Loads",
            calculation: "S = 7,500 W ÷ 0.85 PF = 8,823.5 Volt-Amps = 8.82 kVA",
            explanation:
              "When powering inductive motor loads with a 0.85 power factor (such as well pumps and compressors), the alternator must supply 8.82 kVA of apparent power, drawing roughly 36.8 Amps line current at 240V.",
          },
        ]}
        conclusion="A 7,500W generator provides 31.25 rated Amps at 240V and safely sustains up to 25.0 continuous Amps. Ensuring circuits are balanced equally between Line 1 and Line 2 prevents premature breaker tripping."
      />

      {/* Assumptions Section */}
      <AssumptionsSection
        description="Generator output calculations rely on fundamental electrical principles. Real-world operating capacity is influenced by operating variables described below:"
        assumptions={[
          {
            parameter: "Continuous Load Threshold",
            defaultVal: "80% of rated capacity",
            realisticRange: "70% to 85% recommended",
            impact:
              "Running a portable generator continuously at 100% rated capacity shortens engine life and risks breaker trip when motors cycle on.",
          },
          {
            parameter: "Power Factor",
            defaultVal: "1.0 (Unity)",
            realisticRange: "0.80 to 1.0",
            impact:
              "Inductive loads (motors, transformers) cause current to lag voltage, increasing total amperage draw for the same real wattage.",
          },
          {
            parameter: "Elevation Derating",
            defaultVal: "Sea level to 1,000 ft",
            realisticRange: "3.5% loss per 1,000 ft above sea level",
            impact:
              "Thinner air at higher altitudes reduces engine horsepower, lowering maximum achievable wattage and available amperage.",
          },
          {
            parameter: "Conductor Voltage Drop",
            defaultVal: "Under 3% for runs under 50 ft",
            realisticRange: "1% to 5% depending on wire length and gauge",
            impact:
              "Long extension cords cause voltage drops that can lead to motor overheating and trigger internal generator protection.",
          },
        ]}
      />

      {/* Disclaimer Section */}
      <DisclaimerSection
        title="Electrical Safety, Anti-Backfeeding & Carbon Monoxide Standards"
        points={[
          "Anti-Backfeeding Requirement: Never connect a generator directly into a home wall receptacle using a dual-male cord. Connecting a generator to household wiring requires a code-compliant transfer switch or mechanical interlock installed by a licensed electrician.",
          "Carbon Monoxide Hazard (CPSC / CDC / UL 2201): Always operate portable generators outdoors at least 20 feet (6 meters) away from all windows, doors, vents, and air intakes. Never operate a generator inside a home, garage, basement, or enclosed porch.",
          "Split-Phase Leg Balancing: When powering a transfer switch, distribute 120V circuits equally between Line 1 and Line 2. Loading one leg to 35 Amps while the other draws 5 Amps will trip the generator breaker even if total wattage is well below rating.",
          "Preliminary Estimation Only: These calculations provide nominal electrical conversions. Always verify your specific generator manufacturer specifications and consult a licensed electrician for circuit sizing, wire selection, and physical installation.",
        ]}
      />

      {/* FAQ Section */}
      <FaqSection
        title="Frequently Asked Questions About Generator Amperage"
        faqs={[
          {
            question: "How many amps does a 7,500-watt generator produce?",
            answer:
              "At 240 Volts (the standard transfer switch voltage), a 7,500-Watt generator produces 31.25 rated Amps (7,500 / 240 = 31.25A). Following the recommended 80% continuous duty guideline, its safe continuous operating capacity is 25.0 Amps. At 120 Volts across both legs combined, it can provide up to 62.5 Amps total.",
          },
          {
            question: "What is the difference between generator amps at 120V vs 240V?",
            answer:
              "Current and voltage are inversely proportional for a given wattage. Doubling the voltage cuts the current in half. A 6,000-Watt generator produces 50 Amps at 120 Volts, but only 25 Amps at 240 Volts. Powering a home transfer switch at 240V requires smaller wire gauge and generates far less heat than attempting to route the same power through 120V circuits.",
          },
          {
            question: "How many watts can a 30-amp generator circuit deliver?",
            answer:
              "At 120 Volts, a 30-Amp circuit delivers up to 3,600 Watts maximum (2,880 Watts continuous at the 80% operating limit). At 240 Volts (such as through a standard 4-prong generator connection), a 30-Amp circuit can deliver up to 7,200 Watts maximum (5,760 Watts continuous). Always verify your specific generator nameplate specifications and consult a licensed electrician for circuit wiring and breaker protection.",
          },
          {
            question: "Can I get 50 amps from a 10,000-watt generator?",
            answer:
              "A 10,000-Watt generator produces 41.7 Amps at 240 Volts (10,000 / 240 = 41.67A). While many 10,000W portable generators include a 50-Amp outlet for convenience, the generator cannot supply a full continuous 50 Amps at 240V (which would require 12,000 Watts). Its 80% continuous capacity is approximately 33.3 Amps at 240V.",
          },
          {
            question: "What causes a generator breaker to trip when total watts are low?",
            answer:
              "The most common cause is split-phase leg imbalance. On a 120/240V generator, half the total capacity is assigned to Line 1 and half to Line 2. On an 8,000W generator, each leg can supply approximately 33.3 Amps at 120V (4,000W). If you connect a microwave (1,500W), space heater (1,500W), and toaster (1,200W) all to circuits on Line 1, you draw 4,200W (35A) on that single leg, tripping its breaker even though the generator is only at 52% of its total 8,000W rating.",
          },
        ]}
      />

      {/* Cross-linking to Companion Tools and Guides */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-4">
        <h3 className="text-lg md:text-xl font-bold text-slate-900">
          Need to Calculate Total Generator Sizing or Appliance Wattage?
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Explore our companion generator planning tools and authoritative technical guides:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <Link
            href="/generator-size-calculator"
            className="group p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition bg-slate-50/50 hover:bg-white block space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Interactive Sizing Tool</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition">
              Generator Size Calculator
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tally your exact appliances, calculate single-motor surge demand, and size required generator wattage.
            </p>
          </Link>

          <Link
            href="/how-to-calculate-watts-for-a-generator"
            className="group p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition bg-slate-50/50 hover:bg-white block space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Comprehensive Sizing Guide</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition">
              How to Calculate Watts for a Generator
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Master the difference between running watts and starting surges, motor inrush math, and extension cord rules.
            </p>
          </Link>
        </div>
      </section>

      {/* Related Electrical Calculators */}
      <RelatedCalculators
        calculators={[
          {
            title: "Watts to Amps Electrical Calculator",
            description: "Convert power in Watts to current in Amps across DC, single-phase, and 3-phase circuits.",
            href: "/watts-to-amps-calculator",
            category: "Electrical Circuits",
          },
          {
            title: "Voltage Drop Calculator",
            description: "Calculate conductor resistance, voltage drop percentage, and wire gauge for long cord runs.",
            href: "/voltage-drop-calculator",
            category: "Circuit Design",
          },
          {
            title: "Three Phase Power Calculator",
            description: "Calculate line current, apparent power in kVA, and real power for 3-phase commercial generators.",
            href: "/three-phase-power-calculator",
            category: "Commercial Power",
          },
          {
            title: "Amps to Watts Electrical Calculator",
            description: "Convert current draw back to real power in Watts and apparent power in Volt-Amperes.",
            href: "/amps-to-watts-calculator",
            category: "Electrical Circuits",
          },
        ]}
      />
    </CalculatorShell>
  );
};
