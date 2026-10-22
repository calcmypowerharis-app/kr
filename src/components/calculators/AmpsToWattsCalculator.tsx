"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  calculateAmpsToWatts,
  ElectricalSystemType,
  ThreePhaseVoltageType,
  COMMON_CIRCUIT_VOLTAGES,
  AMPS_TO_WATTS_PRESETS,
  AMPS_TO_WATTS_FAQS,
  AMPS_TO_WATTS_REFERENCE_DATA,
  PresetCircuit,
} from "@/lib/calculators/amps-to-watts";
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
import { ResultHardwareMatchBar } from "@/components/monetization/ResultHardwareMatchBar";
import { SidebarHardwareReference } from "@/components/monetization/SidebarHardwareReference";
import {
  AlertCircle,
  ExternalLink,
  Sliders,
  ShoppingBag,
  ArrowRight,
  HelpCircle,
  Table,
} from "lucide-react";

export const AmpsToWattsCalculator: React.FC = () => {
  // Input states with sensible defaults (Standard US 15A @ 120V)
  const [currentAmps, setCurrentAmps] = useState<number>(15);
  const [voltage, setVoltage] = useState<number>(120);
  const [currentType, setCurrentType] = useState<ElectricalSystemType>("ac_single");
  const [voltageType, setVoltageType] = useState<ThreePhaseVoltageType>("line_to_line");
  const [powerFactor, setPowerFactor] = useState<number>(1.0);

  // Pure calculation
  const results = useMemo(() => {
    return calculateAmpsToWatts({
      currentAmps,
      voltage,
      currentType,
      voltageType,
      powerFactor,
    });
  }, [currentAmps, voltage, currentType, voltageType, powerFactor]);

  const handleReset = () => {
    setCurrentAmps(15);
    setVoltage(120);
    setCurrentType("ac_single");
    setVoltageType("line_to_line");
    setPowerFactor(1.0);
  };

  const handlePreset = (preset: PresetCircuit) => {
    setCurrentAmps(preset.amps);
    setVoltage(preset.voltage);
    setCurrentType(preset.system);
    if (preset.voltageType) setVoltageType(preset.voltageType);
    setPowerFactor(preset.pf);
  };

  const systemOptions = [
    { value: "ac_single", label: "AC Single-Phase (Residential & General)" },
    { value: "dc", label: "Direct Current (DC - Solar / Battery / Vehicle)" },
    { value: "ac_three", label: "AC Three-Phase (Commercial & Industrial)" },
  ];

  const threePhaseOptions = [
    { value: "line_to_line", label: "Line-to-Line (V_LL - 208V, 480V)" },
    { value: "line_to_neutral", label: "Line-to-Neutral (V_LN - 120V, 277V)" },
  ];

  return (
    <CalculatorShell
      title="Amps to Watts Electrical Calculator"
      badge="Electrical & Circuit Sizing"
      category="Electrical"
      calculatorSlug="amps-to-watts-calculator"
      description="Convert electrical current in Amperes (Amps) to real power in Watts (W) and Kilowatts (kW) for Direct Current (DC), Single-Phase AC, and balanced Three-Phase systems with power factor and apparent power (VA)."
      onReset={handleReset}
      inputSection={
        <div className="space-y-5">
          {/* Presets */}
          <div>
            <p className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Common Circuit &amp; Breaker Presets
            </p>
            <div className="flex flex-wrap gap-2">
              {AMPS_TO_WATTS_PRESETS.map((p) => {
                const isActive =
                  currentAmps === p.amps &&
                  voltage === p.voltage &&
                  currentType === p.system;
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

          {/* System Selection */}
          <SelectField
            id="currentType"
            label="Electrical System"
            value={currentType}
            options={systemOptions}
            onChange={(val) => setCurrentType(val as ElectricalSystemType)}
            helpText={
              currentType === "dc"
                ? "DC circuits have no alternating frequency or phase shift; power factor is inherently 1.0."
                : currentType === "ac_three"
                ? "Assumes a symmetrical, balanced three-phase commercial or industrial system."
                : "Standard single-phase alternating current used in residential and light commercial circuits."
            }
          />

          {/* Current & Voltage Input Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
            <InputField
              id="currentAmps"
              label="Electrical Current"
              value={currentAmps}
              onChange={setCurrentAmps}
              unit="Amperes (A)"
              min={0}
              max={2000}
              step={1}
              helpText="Enter circuit breaker rating or measured operational current."
              required
            />

            {/* Voltage Input + Quick Select Buttons */}
            <div className="space-y-2">
              <InputField
                id="voltage"
                label="Operating Voltage"
                value={voltage}
                onChange={setVoltage}
                unit="Volts (V)"
                min={1}
                max={1000}
                step={1}
                helpText="Nominal circuit voltage (RMS for AC or steady voltage for DC)."
                required
              />

              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-semibold text-slate-500 mr-1">Quick Select:</span>
                {COMMON_CIRCUIT_VOLTAGES.map((v) => (
                  <button
                    key={v.value}
                    type="button"
                    onClick={() => setVoltage(v.value)}
                    className={`text-[11px] px-2.5 py-1 rounded border font-mono transition ${
                      voltage === v.value
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {v.value}V
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AC Parameters: Three-Phase Reference & Power Factor */}
          {currentType === "ac_three" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
              <SelectField
                id="voltageType"
                label="Three-Phase Voltage Reference"
                value={voltageType}
                options={threePhaseOptions}
                onChange={(val) => setVoltageType(val as ThreePhaseVoltageType)}
                helpText="Line-to-line is measured across two phase legs; line-to-neutral is measured from one phase leg to neutral."
              />
              <InputField
                id="powerFactor"
                label="Power Factor (PF)"
                value={powerFactor}
                onChange={setPowerFactor}
                unit="0.1 to 1.0"
                min={0.1}
                max={1.0}
                step={0.05}
                helpText="Default is 1.0 (pure resistive loads). Enter motor/equipment nameplate PF when available."
              />
            </div>
          ) : currentType !== "dc" ? (
            <InputField
              id="powerFactor"
              label="Power Factor (PF)"
              value={powerFactor}
              onChange={setPowerFactor}
              unit="0.1 to 1.0"
              min={0.1}
              max={1.0}
              step={0.05}
              helpText="Default is 1.0 (resistive loads like space heaters and water heating elements). For motor-driven compressors or inductive equipment, enter the verified nameplate power factor (typically 0.80 to 0.90)."
            />
          ) : null}

          {/* Non-Silent Validation Errors */}
          {results.errors.length > 0 && (
            <div role="alert" aria-live="polite" className="p-4 rounded-xl bg-red-50 border border-red-200 space-y-2">
              <div className="flex items-center gap-2 text-red-800 font-bold text-xs uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>Input Validation Notice</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs text-red-700">
                {results.errors.map((err, idx) => (
                  <li key={idx}>{err.message}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      }
      resultSection={
        <div className="space-y-6">
          <ResultCard
            icon="zap"
            primaryTitle="Calculated Real Power"
            primaryValue={results.isValid ? results.formattedWatts : "--"}
            primarySubtext={
              results.isValid
                ? `At ${voltage}V ${results.systemLabel} with ${currentAmps}A${
                    currentType !== "dc" ? ` (PF: ${powerFactor})` : ""
                  }`
                : "Awaiting valid electrical inputs"
            }
            stats={[
              {
                label: "Power in Kilowatts",
                value: results.isValid ? results.formattedKw : "--",
                subtext: "Standard equipment metric (kW)",
              },
              {
                label: "80% Continuous Ref (NEC)",
                value: results.isValid ? results.formattedContinuousWattsRef : "--",
                subtext: "Standard breakers for 3+ hr loads",
              },
              ...(results.apparentPowerVa !== undefined
                ? [
                    {
                      label: "Apparent Power",
                      value: results.formattedVa || `${results.apparentPowerVa} VA`,
                      subtext: "Total circulating line power (S)",
                    },
                  ]
                : []),
              {
                label: "Operating Voltage",
                value: `${voltage} V`,
                subtext: results.systemLabel,
              },
              {
                label: "Circuit Current",
                value: `${currentAmps} A`,
                subtext: "Nominal load amperage",
              },
            ]}
            warnings={results.warnings}
            hardwareMatchBar={
              <ResultHardwareMatchBar
                calculatorSlug="amps-to-watts-calculator"
                calculatedValue={typeof currentAmps === "number" ? currentAmps : Number(currentAmps) || 0}
              />
            }
          />

          {/* Sister Tool Callout */}
          <div className="bg-blue-50/70 rounded-2xl border border-blue-200/80 p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wider">
              <Sliders className="w-4 h-4 text-blue-600" />
              <span>Dedicated Sister Tool</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Need to find how many Amperes a specific appliance or equipment wattage draws? Use our dedicated reciprocal calculator:
            </p>
            <div>
              <Link
                href="/watts-to-amps-calculator"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 transition"
              >
                <span>Open Watts to Amps Electrical Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Continuous-Duty Code Guidance Box */}
          <div className="bg-slate-50/80 rounded-2xl border border-slate-200/90 p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span>Continuous Load Sizing Rules (NEC Article 100 &amp; 210)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mathematical power conversion determines absolute instantaneous wattage (P = V × I × PF). Branch circuit electrical sizing, however, distinguishes between continuous and non-continuous loads under the National Electrical Code (NEC / NFPA 70):
            </p>
            <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
              <li>
                <strong>Continuous Load Definition (NEC Article 100):</strong> A load where the maximum current is expected to continue for 3 hours or more (such as electric vehicle charging, water heaters, or continuous space heaters).
              </li>
              <li>
                <strong>Standard Overcurrent Sizing (NEC 210.19(A)(1) &amp; 210.20(A)):</strong> For standard (non-100%-rated) branch circuit breakers, the overcurrent device and conductor must be sized for at least 125% of continuous load plus 100% of non-continuous load. On a given standard breaker, this restricts continuous duty to 80% of rated capacity (e.g., 12A / 1,440W continuous on a 15A breaker).
              </li>
              <li>
                <strong>Non-Continuous Duty:</strong> Intermittent appliances operating under 3 hours (microwaves, blenders, power tools) are permitted to draw up to 100% of the breaker rating, subject to receptacle limits.
              </li>
              <li>
                <strong>Installation Safety Beyond 80%:</strong> An 80% continuous benchmark is an overcurrent sizing threshold, not an unconditional guarantee of circuit safety. Safe continuous wattage also requires verifying conductor gauge (14 AWG for 15A, 12 AWG for 20A copper), conductor terminal temperature limits (60°C vs. 75°C per NEC 110.14(C)), ambient temperature corrections, raceway conductor bundling deratings, and voltage drop.
              </li>
            </ul>
          </div>

          {/* Diagnostic Gear Reference (Amazon Associate) */}
          <SidebarHardwareReference
            title="Electrical Diagnostic Tools"
            subtitle="Equipment for safely measuring live electrical current and line voltage:"
            items={[
              {
                title: "True RMS AC/DC Clamp Meters",
                brands: "Klein Tools CL390 / Fluke",
                subtitle: "Accurately measure running current without disconnecting wiring",
                searchQuery: "digital clamp meter true rms AC DC current",
              },
              {
                title: "Plug-In Digital Power & Watt Meters",
                brands: "P3 Kill A Watt / Baldr",
                subtitle: "Monitor household plug loads in real-time Watts, Amps, and kWh",
                searchQuery: "plug in power meter wattmeter kill a watt",
              },
            ]}
          />
        </div>
      }
    >
      {/* Educational Content: Direct Answer & Variable Definitions */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 space-y-6">
        <div className="space-y-3">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">
            How to Convert Amps to Watts
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Converting Amperes (current) to Watts (power) requires multiplying current by circuit voltage. In alternating current (AC) circuits containing inductive components (such as electric motors, pumps, or transformers), you must also multiply by the power factor (PF) to account for phase displacement between voltage and current waveforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <h3 className="font-bold text-slate-900 text-sm">Direct Current (DC) Formula</h3>
            <p className="font-mono text-xs font-semibold text-blue-700">Watts = Amps × Volts</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Direct current flows in one direction without waveform displacement. Power factor is inherently 1.0. Common in automotive, battery storage, and solar DC strings.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <h3 className="font-bold text-slate-900 text-sm">AC Single-Phase Formula</h3>
            <p className="font-mono text-xs font-semibold text-blue-700">Watts = Amps × Volts × Power Factor</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Standard residential 120V and 240V household power. Pure resistive loads (heaters, incandescent lamps) have PF = 1.0; motor-driven loads typically have PF between 0.75 and 0.90.
            </p>
          </div>
        </div>

        {/* Can you convert volts to watts directly? */}
        <div className="p-5 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-2">
          <h3 className="text-sm font-bold text-amber-950 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-amber-700 shrink-0" />
            Can You Convert Volts to Watts Directly?
          </h3>
          <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            No. Volts cannot convert directly into Watts without knowing current or resistance. Voltage measures electrical potential difference, while Watts measures the rate of energy consumption.
          </p>
          <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            To calculate wattage, you need circuit current (P = V × I) or resistance (P = V² ÷ R). A 120V wall outlet delivers zero watts until a device draws current.
          </p>
        </div>

        {/* Direct Answers for Common Queries */}
        <div className="space-y-4 pt-2">
          <div className="border-b border-slate-200 pb-2">
            <h3 className="text-lg font-bold text-slate-900">
              Direct Answers: How Many Watts for Common Amperages?
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Calculations based on standard US voltages and resistive loads at unity power factor (PF = 1.0). For inductive motor loads, actual wattage will be lower based on equipment nameplate power factor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 10 Amps & True Power (GSC Target) */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center justify-between">
                <span>What Is the True Power of 10A at 120V?</span>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">1,200W Real Power</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                The true power of a 120V circuit operating at 10A with unity power factor (PF = 1.0) is exactly 1,200 Watts (1.20 kW). The calculation follows P = V × I × PF = 120V × 10A × 1.0 = 1,200W.
              </p>
              <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-200/80 pt-1.5">
                Because power factor equals 1.0, real power in Watts equals apparent power in Volt-Amperes (1,200 VA). With inductive motor loads at PF 0.85, true power drops to 1,020 Watts while apparent power remains 1,200 VA.
              </p>
            </div>

            {/* 15 Amps */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center justify-between">
                <span>How Many Watts Is 15 Amps?</span>
                <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">1,800W @ 120V</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                At 120 Volts with unity power factor (PF = 1.0), 15 Amps equals 1,800 Watts (15A × 120V = 1,800W). Standard continuous-duty planning benchmarks continuous loads (3+ hours) to 80%, which equals 1,440 Watts.
              </p>
              <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-200/80 pt-1.5">
                At 240 Volts, 15 Amps delivers 3,600 Watts (15A × 240V = 3,600W). Sizing guidelines benchmark continuous duty at 240V to 2,880 Watts.
              </p>
            </div>

            {/* 20 Amps */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center justify-between">
                <span>How Many Watts Is 20 Amps?</span>
                <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">2,400W @ 120V</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                At 120 Volts with unity power factor, 20 Amps provides 2,400 Watts (20A × 120V = 2,400W). Sizing guidelines benchmark continuous duty for 3 or more hours to 1,920 Watts (80%).
              </p>
              <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-200/80 pt-1.5">
                At 240 Volts, a 20-Amp circuit delivers 4,800 Watts (20A × 240V = 4,800W). The 80% continuous planning reference at 240V is 3,840 Watts.
              </p>
            </div>

            {/* 200 Amps */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center justify-between">
                <span>How Many Watts in 200 Amps (240V)?</span>
                <span className="text-xs font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">48,000W Theoretical</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                At 240 Volts single-phase with unity power factor, 200 Amps equals 48,000 Watts (200A × 240V = 48 kW). Standard 80% continuous planning yields a 38,400 Watt benchmark.
              </p>
              <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-200/80 pt-1.5">
                This 48 kW figure represents total theoretical capacity. Actual residential 200-Amp service sizing requires standard NEC load calculations (NEC Article 220) with demand diversity factors rather than simple arithmetic summation.
              </p>
            </div>

            {/* 30 Amps */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center justify-between">
                <span>How Many Watts Is 30 Amps?</span>
                <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">3,600W / 7,200W</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                At 120 Volts, 30 Amps provides 3,600 Watts (30A × 120V = 3,600W), with an 80% continuous planning reference of 2,880 Watts. This rating is common for 30A RV connections.
              </p>
              <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-200/80 pt-1.5">
                At 240 Volts, 30 Amps delivers 7,200 Watts (30A × 240V = 7,200W) with an 80% continuous benchmark of 5,760 Watts. This configuration powers electric dryers and water heaters.
              </p>
            </div>

            {/* 40 Amps */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center justify-between">
                <span>How Many Watts Is 40 Amps?</span>
                <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">9,600W @ 240V</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                At 240 Volts, 40 Amps provides 9,600 Watts (40A × 240V = 9,600W). Standard guidelines benchmark continuous duty of 3 or more hours to 7,680 Watts (80%).
              </p>
              <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-200/80 pt-1.5">
                At 120 Volts, 40 Amps yields 4,800 Watts with an 80% continuous benchmark of 3,840 Watts. This capacity typically feeds electric cooktops and workshop subpanels.
              </p>
            </div>
          </div>

          {/* Fractional and Lower Amperages Callout */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Converting Smaller &amp; Fractional Currents (3 Amps, 8.5 Amps)
            </h4>
            <p className="leading-relaxed">
              Fractional currents also convert linearly using standard formulas. For example, a 3A load at 120V draws 360W, while an 8.5A compressor draws 1,020W at unity power factor.
            </p>
          </div>
        </div>

        {/* Amps to Watts Quick-Reference Chart */}
        <div className="space-y-4 pt-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Table className="w-5 h-5 text-blue-600" />
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Amps to Watts Quick-Reference Chart (12V DC, 120V &amp; 240V AC)
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              This reference table compares electrical power output across common residential, commercial, and DC currents. Values are calculated using standard formulas for direct current (DC) and single-phase alternating current (AC).
            </p>
            <p className="text-xs text-slate-600 leading-relaxed pt-0.5">
              Need to convert power back to current? Use the{" "}
              <Link
                href="/watts-to-amps-calculator"
                className="text-blue-600 hover:text-blue-800 underline font-medium"
              >
                Watts to Amps Electrical Calculator
              </Link>{" "}
              to determine circuit amperage from equipment wattage, or check our guide on{" "}
              <Link
                href="/how-many-watts-can-a-15-amp-or-20-amp-circuit-handle"
                className="text-blue-600 hover:text-blue-800 underline font-medium"
              >
                how many watts a 15-amp or 20-amp circuit can handle
              </Link>
              .
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <caption className="sr-only">
                Amps to Watts conversion table for 12V DC, 120V AC, and 240V AC with 80% continuous planning values
              </caption>
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th scope="col" className="py-3 px-3 sm:px-4 whitespace-nowrap">
                    Current (A)
                  </th>
                  <th scope="col" className="py-3 px-3 sm:px-4 whitespace-nowrap">
                    12V DC Power (W)
                  </th>
                  <th scope="col" className="py-3 px-3 sm:px-4 whitespace-nowrap">
                    120V Single-Phase AC (PF = 1) (W)
                  </th>
                  <th scope="col" className="py-3 px-3 sm:px-4 whitespace-nowrap">
                    120V 80% Continuous Planning (W)
                  </th>
                  <th scope="col" className="py-3 px-3 sm:px-4 whitespace-nowrap">
                    240V Single-Phase AC (PF = 1) (W)
                  </th>
                  <th scope="col" className="py-3 px-3 sm:px-4 whitespace-nowrap">
                    240V 80% Continuous Planning (W)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                {AMPS_TO_WATTS_REFERENCE_DATA.map((row) => (
                  <tr key={row.amps} className="hover:bg-slate-50/70 transition-colors">
                    <th scope="row" className="py-2.5 px-3 sm:px-4 font-semibold text-slate-900 whitespace-nowrap font-mono">
                      {row.amps} A
                    </th>
                    <td className="py-2.5 px-3 sm:px-4 font-mono text-slate-700 whitespace-nowrap">
                      {row.dc12vWatts.toLocaleString("en-US", { maximumFractionDigits: 1 })} W
                    </td>
                    <td className="py-2.5 px-3 sm:px-4 font-mono font-medium text-slate-900 whitespace-nowrap">
                      {row.ac120vWatts.toLocaleString("en-US", { maximumFractionDigits: 1 })} W
                    </td>
                    <td className="py-2.5 px-3 sm:px-4 font-mono text-blue-700 whitespace-nowrap">
                      {row.ac120vContinuousWatts.toLocaleString("en-US", { maximumFractionDigits: 1 })} W
                    </td>
                    <td className="py-2.5 px-3 sm:px-4 font-mono font-medium text-slate-900 whitespace-nowrap">
                      {row.ac240vWatts.toLocaleString("en-US", { maximumFractionDigits: 1 })} W
                    </td>
                    <td className="py-2.5 px-3 sm:px-4 font-mono text-blue-700 whitespace-nowrap">
                      {row.ac240vContinuousWatts.toLocaleString("en-US", { maximumFractionDigits: 1 })} W
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
            <p>
              <strong>Formulas used:</strong> Direct Current: P = V × I. Single-Phase Alternating Current: P = V × I × PF (calculated at unity power factor, PF = 1.0). Continuous 80% planning value: P × 0.80.
            </p>
            <p>
              <strong>Power Factor assumption:</strong> AC values assume a unity power factor of 1.0 for purely resistive loads. Real active power is lower when operating inductive equipment such as motors, air compressors, or pumps.
            </p>
            <p>
              <strong>Continuous Duty planning:</strong> The 80% continuous planning values represent standard sizing benchmarks for loads operating continuously for 3 hours or longer on standard non-100%-rated overcurrent devices. These figures are illustrative planning guides rather than universal safe-load guarantees or full NEC determinations.
            </p>
            <p>
              <strong>Wire gauge &amp; breakers:</strong> This reference table does not specify circuit breaker ratings or wire gauges. Conductor sizing depends on insulation temperature ratings, ambient temperatures, raceway fill, and applicable local electrical codes.
            </p>
          </div>
        </div>
      </section>

      {/* Formula & Methodology Section */}
      <FormulaSection
        formulaDisplay={
          currentType === "dc"
            ? "P = I × V"
            : currentType === "ac_single"
            ? "P = I × V × PF  |  Apparent Power: S = I × V"
            : voltageType === "line_to_line"
            ? "P = √3 × V_LL × I × PF  |  Apparent Power: S = √3 × V_LL × I"
            : "P = 3 × V_LN × I × PF  |  Apparent Power: S = 3 × V_LN × I"
        }
        description="The conversion of electric current (Amperes) to active power (Watts) describes the rate at which electrical energy is transformed into mechanical work, heat, or illumination. In alternating current circuits, real power differs from apparent power whenever current and voltage waveforms are out of phase due to inductive or capacitive reactance."
        variables={[
          {
            symbol: "P",
            name: "Real Power",
            unit: "Watts (W)",
            description: "The rate at which electrical energy is converted into active physical work, heat, or light.",
          },
          {
            symbol: "I",
            name: "Current",
            unit: "Amperes (A)",
            description: "The volume of electric charge flowing through the circuit conductor per unit of time.",
          },
          {
            symbol: "V",
            name: "Voltage",
            unit: "Volts (V)",
            description: "The electrical potential difference across the circuit (continuous for DC, RMS for AC).",
          },
          {
            symbol: "PF",
            name: "Power Factor",
            unit: "Decimal (0.1 to 1.0)",
            description: "The ratio of real power (W) to apparent power (VA). Resistive heating has PF = 1.0.",
          },
          {
            symbol: "S",
            name: "Apparent Power",
            unit: "Volt-Amperes (VA)",
            description: "Total circulating line power, representing the mathematical product of RMS voltage and RMS current.",
          },
        ]}
        notes={[
          "Balanced System Rule: Three-phase calculations assume equal current distribution across all three phase conductors.",
          "Single-Phase Power Factor: Resistive loads (incandescent bulbs, electric baseboards) operate at unity (1.0). Inductive loads (air conditioning compressors, induction motors) operate between 0.75 and 0.90.",
          "DC Simplicity: Direct current has no sinusoidal frequency or inductive reactance, meaning real power equals total power without power factor adjustment.",
        ]}
      />

      {/* Worked Examples Section */}
      <WorkedExampleSection
        title="Verified Worked Calculations"
        scenario="Determining the power capacity of a residential 15A 120V household branch circuit."
        steps={[
          {
            stepNumber: 1,
            title: "Identify Circuit Specifications",
            calculation: "I = 15 Amperes, V = 120 Volts AC, PF = 1.0",
            explanation: "Standard residential branch receptacles are wired to a 15-Amp circuit breaker at 120V nominal voltage.",
          },
          {
            stepNumber: 2,
            title: "Apply Single-Phase Power Formula (Pure Mathematical Conversion)",
            calculation: "P = 15 A × 120 V × 1.0 = 1,800 Watts",
            explanation: "Multiplying current by voltage and unity power factor gives the exact physical active power rating of 1,800 Watts.",
          },
          {
            stepNumber: 3,
            title: "Evaluate Continuous-Duty Planning Benchmark (Referencing NEC 210.19 / 210.20)",
            calculation: "Continuous Planning Benchmark = 1,800 W × 0.80 = 1,440 Watts (or 15 A × 0.80 = 12.0 A)",
            explanation: "Under standard branch-circuit planning practice (referencing NEC Sections 210.19(A)(1) and 210.20(A) for non-100%-rated breakers), circuits supplying continuous loads (operating 3 hours or more) are conventionally sized with a 125% factor, representing an 80% continuous planning threshold (1,440W). Whether an 80% limit applies depends on equipment duty cycle, device listing, and installation context. Intermittent operation under 3 hours operates within the 1,800W physical rating.",
          },
        ]}
        conclusion="A 15A 120V circuit has a mathematical power capacity of 1,800 Watts. When supplying continuous loads operating 3 hours or longer on standard non-100%-rated breakers, standard guidelines benchmark continuous duty to 1,440 Watts (12A). Intermittent non-continuous loads may utilize up to the full 1,800 Watts based on equipment specifications and conductor ampacity."
      />

      {/* Assumptions Section */}
      <AssumptionsSection
        title="Physical & Technical Assumptions"
        impactHeader="Effect on Wattage"
        description="Amps to Watts calculations depend on electrical system type, load duration, and wave properties:"
        assumptions={[
          {
            parameter: "Three-Phase Symmetrical Balance",
            defaultVal: "100% Balanced",
            realisticRange: "98% to 100% balance",
            impact: "Unbalanced commercial loads draw different amperages per line, causing phase-dependent power variation.",
          },
          {
            parameter: "AC Power Factor (PF)",
            defaultVal: "1.0 (Unity)",
            realisticRange: "0.75 to 1.0",
            impact: "Lower power factor decreases real Watts produced for a given current, while apparent power (VA) remains unchanged.",
          },
          {
            parameter: "Continuous Duty Planning Factor",
            defaultVal: "80% (0.80) Reference",
            realisticRange: "80% to 100%",
            impact: "Standard non-100%-rated breakers serving continuous loads (3+ hours per NEC Article 100) are conventionally planned with a 125% factor (80% load). Non-continuous loads and 100%-rated assemblies evaluate at up to 100%. Requirements depend on equipment listing and local code context.",
          },
          {
            parameter: "Conductor Resistance & Voltage Drop",
            defaultVal: "Neglected at Terminals",
            realisticRange: "1% to 3% typical drop",
            impact: "Long extension cord or feeder runs cause voltage drop, reducing terminal voltage delivered to the load.",
          },
        ]}
      />

      {/* Safety Disclaimer */}
      <DisclaimerSection
        title="Electrical Code & Safety Disclaimer"
        points={[
          "This calculator provides mathematical power calculations based on user-entered values and does not approve electrical installations, circuit breaker ratings, or branch wiring compliance.",
          "Circuit breaker selection and wire sizing must account for conductor ampacity, insulation temperature ratings (60°C/75°C/90°C), raceway derating factors, and applicable local electrical codes.",
          "The 80% continuous benchmark represents standard overcurrent design guidance for loads operating 3+ continuous hours on non-100%-rated equipment. It does not represent an unconditional safe wattage for all scenarios, nor does it replace conductor ampacity verification, temperature derating, or professional electrical engineering approval.",
          "This calculator provides preliminary educational planning estimates and does not certify code compliance, electrical safety, or regulatory approval. Always consult the applicable National Electrical Code (NEC / NFPA 70) edition and verify installations with a licensed electrician.",
        ]}
      />

      {/* Native Semantic FAQ Section */}
      <FaqSection faqs={AMPS_TO_WATTS_FAQS} />

      {/* Related Calculators */}
      <RelatedCalculators
        calculators={[
          {
            title: "Watts to Amps Electrical Calculator",
            description: "Convert appliance or equipment wattage back into electrical current in Amperes.",
            href: "/watts-to-amps-calculator",
            category: "Electrical",
          },
          {
            title: "Three Phase Power Calculator",
            description: "Dedicated calculator for commercial 3-phase real power (kW), apparent power (kVA), and line current.",
            href: "/three-phase-power-calculator",
            category: "Electrical",
          },
          {
            title: "Voltage Drop Calculator",
            description: "Calculate circuit voltage drop, percentage loss, and receiving terminal voltage across DC and AC wire runs.",
            href: "/voltage-drop-calculator",
            category: "Electrical",
          },
          {
            title: "15-Amp vs 20-Amp Circuit Wattage Guide",
            description: "Learn safe breaker capacity, the NEC 80% continuous load rule, and 14 AWG vs 12 AWG wiring.",
            href: "/how-many-watts-can-a-15-amp-or-20-amp-circuit-handle",
            category: "Circuit Sizing",
          },
          {
            title: "Generator Size Calculator",
            description: "Calculate required running and starting wattage for portable and home standby generators.",
            href: "/generator-size-calculator",
            category: "Generator Sizing",
          },
          {
            title: "UPS & Battery Backup Run-Time Calculator",
            description: "Determine how long battery backups and UPS systems will power your equipment.",
            href: "/ups-battery-backup-calculator",
            category: "UPS & Battery",
          },
          {
            title: "More Electrical & Power Calculators",
            description: "Browse all live power, battery backup, and generator sizing tools on CalcMyPower.",
            href: "/calculators",
            category: "Directory",
          },
        ]}
      />
    </CalculatorShell>
  );
};
