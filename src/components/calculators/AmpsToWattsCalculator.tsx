"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  calculateAmpsToWatts,
  ElectricalSystemType,
  ThreePhaseVoltageType,
  COMMON_CIRCUIT_VOLTAGES,
  AMPS_TO_WATTS_PRESETS,
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
      lastUpdated="September 2026"
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
          <div className="bg-slate-50/60 rounded-2xl border border-slate-200/80 p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                <ShoppingBag className="w-3.5 h-3.5 text-slate-500" />
                <span>Electrical Diagnostic Tools</span>
              </div>
              <span className="text-[10px] text-slate-600 font-medium">Amazon Associate</span>
            </div>

            <p className="text-xs text-slate-600 leading-normal">
              Equipment for safely measuring live electrical current and line voltage:
            </p>

            <div className="space-y-2.5">
              <a
                href={getAmazonSearchUrl("digital clamp meter true rms")}
                target="_blank"
                rel={AMAZON_LINK_REL}
                className="group flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:bg-blue-50/30 transition text-xs font-medium text-slate-800"
              >
                <div>
                  <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition">
                    True RMS AC/DC Clamp Meters
                  </div>
                  <div className="text-[11px] text-slate-600">
                    Accurately measure running current without disconnecting wiring
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-blue-600 shrink-0 ml-2" />
              </a>

              <a
                href={getAmazonSearchUrl("plug in power meter wattmeter")}
                target="_blank"
                rel={AMAZON_LINK_REL}
                className="group flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:bg-blue-50/30 transition text-xs font-medium text-slate-800"
              >
                <div>
                  <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition">
                    Plug-In Digital Power &amp; Watt Meters
                  </div>
                  <div className="text-[11px] text-slate-600">
                    Monitor household plug loads in real-time Watts, Amps, and kWh
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-blue-600 shrink-0 ml-2" />
              </a>
            </div>

            <p className="text-[10px] text-slate-600 font-medium pt-1 border-t border-slate-200/70">
              As an Amazon Associate, CalcMyPower earns from qualifying purchases.
            </p>
          </div>
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
            No. Volts alone cannot be directly converted into Watts. Voltage measures electrical potential difference (the electrical pressure driving charge), whereas Watts measures the rate of energy consumption (physical work or heat). To calculate Watts, you must know at least one additional electrical property: either circuit current in Amperes (using P = V × I) or circuit resistance in Ohms (using P = V² / R). A 120-volt outlet delivers zero watts until a device drawing current is connected.
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
            {/* 15 Amps */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center justify-between">
                <span>How Many Watts Is 15 Amps?</span>
                <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">1,800W @ 120V</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                At <strong>120 Volts</strong> with unity power factor (PF = 1.0), 15 Amps equals exactly <strong>1,800 Watts</strong> (15A × 120V = 1,800W). For continuous loads operating 3 hours or more on standard non-100%-rated breakers, standard branch-circuit planning guidelines benchmark continuous duty to 80%, which equals <strong>1,440 Watts</strong> (12A). Applicable continuous-load requirements depend on equipment listing, duty duration, and local code context.
              </p>
              <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-200/80 pt-1.5">
                At <strong>240 Volts</strong> (such as a 240V workshop circuit or water heater), 15 Amps delivers <strong>3,600 Watts</strong> (15A × 240V = 3,600W), with an 80% continuous planning reference of 2,880 Watts for sustained loads.
              </p>
            </div>

            {/* 10 Amps & True Power (Position 9 Target) */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center justify-between">
                <span>What Is the True Power of 10A at 120V?</span>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">1,200W Real Power</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                The <strong>true power</strong> of a 120V circuit operating at 10A with unity power factor (PF = 1.0) is exactly <strong>1,200 Watts</strong> (1.20 kW). Formula: P = V × I × PF = 120V × 10A × 1.0 = 1,200W.
              </p>
              <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-200/80 pt-1.5">
                <strong>Real vs. Apparent Power:</strong> Because power factor is 1.0, real active power (1,200 Watts) exactly equals apparent power (1,200 VA). If powering an inductive motor operating at PF = 0.85, true power drops to 1,020 Watts while apparent circuit draw remains 1,200 VA. At 240V and PF 1.0, 10 Amps delivers 2,400 Watts.
              </p>
            </div>

            {/* 30 Amps */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center justify-between">
                <span>How Many Watts Is 30 Amps?</span>
                <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">3,600W / 7,200W</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                At <strong>120 Volts</strong> (such as a 30-Amp RV park connection or TT-30 receptacle), 30 Amps provides <strong>3,600 Watts</strong> (30A × 120V = 3,600W), with an 80% continuous planning reference of 2,880 Watts for loads sustained over 3 hours.
              </p>
              <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-200/80 pt-1.5">
                At <strong>240 Volts</strong> (such as an electric clothes dryer or residential water heater), 30 Amps provides <strong>7,200 Watts</strong> (30A × 240V = 7,200W), with an 80% continuous planning reference of 5,760 Watts for sustained duty.
              </p>
            </div>

            {/* 40 Amps */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center justify-between">
                <span>How Many Watts Is 40 Amps?</span>
                <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">9,600W @ 240V</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                At <strong>240 Volts</strong> (standard for electric cooking ranges and subpanel feeders), 40 Amps delivers <strong>9,600 Watts</strong> (40A × 240V = 9,600W). Where continuous duty of 3 hours or more applies on standard non-100%-rated equipment, continuous load is conventionally planned at 80% (7,680 Watts or 32A). Non-continuous equipment or 100%-rated assemblies operate under different criteria based on installation listing.
              </p>
              <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-200/80 pt-1.5">
                At <strong>120 Volts</strong>, 40 Amps produces <strong>4,800 Watts</strong> (40A × 120V = 4,800W), with an 80% continuous planning benchmark of 3,840 Watts.
              </p>
            </div>
          </div>

          {/* Fractional and Lower Amperages (3A, 8.5A) Callout */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Converting Smaller &amp; Fractional Currents (3 Amps, 8.5 Amps)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-slate-700">
              <div>• <strong>3.0 Amps @ 120V (PF 1.0):</strong> 3A × 120V = 360 Watts (e.g., desktop PC, TV)</div>
              <div>• <strong>8.5 Amps @ 120V (PF 1.0):</strong> 8.5A × 120V = 1,020 Watts (e.g., refrigerator compressor)</div>
            </div>
          </div>
        </div>

        {/* Quick Reference Table */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <Table className="w-4 h-4 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">
              Quick Reference: Common US Voltage &amp; Amperage Capacities (At Power Factor 1.0)
            </h3>
          </div>
          <p className="text-xs text-slate-600">
            The table below compares nominal mathematical power with the standard 80% continuous-duty planning reference (for loads sustained 3+ hours on standard non-100%-rated equipment) for common US branch circuits at unity power factor (PF = 1.0):
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Circuit Specification</th>
                  <th className="py-2.5 px-3">System Type</th>
                  <th className="py-2.5 px-3">Nominal Max Power</th>
                  <th className="py-2.5 px-3">80% Continuous Planning Ref</th>
                  <th className="py-2.5 px-3">Typical Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2 px-3 font-semibold text-slate-900">3.0 Amps @ 120 Volts</td>
                  <td className="py-2 px-3">AC Single-Phase (PF 1.0)</td>
                  <td className="py-2 px-3 font-mono font-medium text-slate-800">360 W (0.36 kW)</td>
                  <td className="py-2 px-3 font-mono text-blue-700">288 W</td>
                  <td className="py-2 px-3">Small electronics, desktop workstation, audio amplifier</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2 px-3 font-semibold text-slate-900">8.5 Amps @ 120 Volts</td>
                  <td className="py-2 px-3">AC Single-Phase (PF 1.0)</td>
                  <td className="py-2 px-3 font-mono font-medium text-slate-800">1,020 W (1.02 kW)</td>
                  <td className="py-2 px-3 font-mono text-blue-700">816 W</td>
                  <td className="py-2 px-3">Refrigerator defrost cycle, circular saw, commercial blender</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2 px-3 font-semibold text-slate-900">10 Amps @ 120 Volts</td>
                  <td className="py-2 px-3">AC Single-Phase (PF 1.0)</td>
                  <td className="py-2 px-3 font-mono font-medium text-slate-800">1,200 W (1.20 kW)</td>
                  <td className="py-2 px-3 font-mono text-blue-700">960 W</td>
                  <td className="py-2 px-3">True power benchmark: laser printer, vacuum, air fryer</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2 px-3 font-semibold text-slate-900">10 Amps @ 12 Volts</td>
                  <td className="py-2 px-3">Direct Current (DC)</td>
                  <td className="py-2 px-3 font-mono font-medium text-slate-800">120 W (0.12 kW)</td>
                  <td className="py-2 px-3 font-mono text-blue-700">96 W</td>
                  <td className="py-2 px-3">Automotive auxiliary socket or 12V LED string</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2 px-3 font-semibold text-slate-900">15 Amps @ 120 Volts</td>
                  <td className="py-2 px-3">AC Single-Phase (PF 1.0)</td>
                  <td className="py-2 px-3 font-mono font-medium text-slate-800">1,800 W (1.80 kW)</td>
                  <td className="py-2 px-3 font-mono text-blue-700">1,440 W</td>
                  <td className="py-2 px-3">Standard bedroom / living room receptacle (NEMA 5-15R)</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2 px-3 font-semibold text-slate-900">15 Amps @ 240 Volts</td>
                  <td className="py-2 px-3">AC Single-Phase (PF 1.0)</td>
                  <td className="py-2 px-3 font-mono font-medium text-slate-800">3,600 W (3.60 kW)</td>
                  <td className="py-2 px-3 font-mono text-blue-700">2,880 W</td>
                  <td className="py-2 px-3">Workshop power tools, mini-split AC, electric baseboard</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2 px-3 font-semibold text-slate-900">20 Amps @ 120 Volts</td>
                  <td className="py-2 px-3">AC Single-Phase (PF 1.0)</td>
                  <td className="py-2 px-3 font-mono font-medium text-slate-800">2,400 W (2.40 kW)</td>
                  <td className="py-2 px-3 font-mono text-blue-700">1,920 W</td>
                  <td className="py-2 px-3">Kitchen small appliance &amp; bathroom branch circuits</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2 px-3 font-semibold text-slate-900">20 Amps @ 240 Volts</td>
                  <td className="py-2 px-3">AC Single-Phase (PF 1.0)</td>
                  <td className="py-2 px-3 font-mono font-medium text-slate-800">4,800 W (4.80 kW)</td>
                  <td className="py-2 px-3 font-mono text-blue-700">3,840 W</td>
                  <td className="py-2 px-3">Large air compressor or baseboard heater zone</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2 px-3 font-semibold text-slate-900">30 Amps @ 120 Volts</td>
                  <td className="py-2 px-3">AC Single-Phase (PF 1.0)</td>
                  <td className="py-2 px-3 font-mono font-medium text-slate-800">3,600 W (3.60 kW)</td>
                  <td className="py-2 px-3 font-mono text-blue-700">2,880 W</td>
                  <td className="py-2 px-3">30-Amp RV park service hookup (NEMA TT-30)</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2 px-3 font-semibold text-slate-900">30 Amps @ 240 Volts</td>
                  <td className="py-2 px-3">AC Single-Phase (PF 1.0)</td>
                  <td className="py-2 px-3 font-mono font-medium text-slate-800">7,200 W (7.20 kW)</td>
                  <td className="py-2 px-3 font-mono text-blue-700">5,760 W</td>
                  <td className="py-2 px-3">Electric clothes dryer, water heater, 30A RV</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2 px-3 font-semibold text-slate-900">40 Amps @ 240 Volts</td>
                  <td className="py-2 px-3">AC Single-Phase (PF 1.0)</td>
                  <td className="py-2 px-3 font-mono font-medium text-slate-800">9,600 W (9.60 kW)</td>
                  <td className="py-2 px-3 font-mono text-blue-700">7,680 W</td>
                  <td className="py-2 px-3">Electric cooktop, garage subpanel feed, welder circuit</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2 px-3 font-semibold text-slate-900">50 Amps @ 240 Volts</td>
                  <td className="py-2 px-3">AC Single-Phase (PF 1.0)</td>
                  <td className="py-2 px-3 font-mono font-medium text-slate-800">12,000 W (12.0 kW)</td>
                  <td className="py-2 px-3 font-mono text-blue-700">9,600 W</td>
                  <td className="py-2 px-3">Level 2 EV charger, electric range, 50A RV</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2 px-3 font-semibold text-slate-900">20 Amps @ 208V 3-Phase</td>
                  <td className="py-2 px-3">AC 3-Phase (PF 0.90)</td>
                  <td className="py-2 px-3 font-mono font-medium text-slate-800">6,485 W (7,205 VA)</td>
                  <td className="py-2 px-3 font-mono text-blue-700">5,188 W</td>
                  <td className="py-2 px-3">Commercial 3-phase kitchen &amp; HVAC equipment</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2 px-3 font-semibold text-slate-900">30 Amps @ 480V 3-Phase</td>
                  <td className="py-2 px-3">AC 3-Phase (PF 0.85)</td>
                  <td className="py-2 px-3 font-mono font-medium text-slate-800">21,200 W (24,942 VA)</td>
                  <td className="py-2 px-3 font-mono text-blue-700">16,960 W</td>
                  <td className="py-2 px-3">Industrial motor machinery &amp; chiller pumps</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <p>
              <strong>Educational Planning Note:</strong> Nominal Max Power represents pure mathematical conversion (P = V × I × PF). The 80% Continuous Planning Reference illustrates conventional sizing practice where continuous loads (operating for 3 hours or longer) are connected to standard, non-100%-rated overcurrent protective devices (referencing NEC Article 100). Whether an 80% threshold applies depends on equipment listing, continuous duty duration, and applicable local codes. Intermittent non-continuous loads and 100%-rated equipment operate under different sizing criteria. This calculator provides preliminary planning estimates only and does not certify code compliance or installation safety. Always verify physical installations with a licensed electrician.
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
      <FaqSection
        faqs={[
          {
            question: "How many watts is 15 amps at 120 volts?",
            answer:
              "In a standard 120V single-phase circuit with a resistive load (power factor = 1.0), 15 Amps equals exactly 1,800 Watts of physical power (15A × 120V = 1,800W). For continuous loads operating 3 hours or more on standard non-100%-rated circuit breakers, common sizing practice benchmarks continuous duty to 80% of rating (1,440 Watts or 12A per NEC guidelines). Applicable requirements depend on equipment duty, listing, and local codes; intermittent loads may operate up to the full 1,800 Watts based on circuit design.",
          },
          {
            question: "What is the true power of a 120V circuit operating at 10A with unity power factor?",
            answer:
              "The true power (real active power) is exactly 1,200 Watts (1.20 kW). Using the single-phase AC power formula: P = V × I × PF = 120 Volts × 10 Amperes × 1.0 = 1,200 Watts. Because the circuit operates at unity power factor (PF = 1.0), real power in Watts equals apparent power in Volt-Amperes (1,200 VA). If the power factor were 0.85 (such as an inductive motor load), true power would be 1,020 Watts while apparent power would remain 1,200 VA.",
          },
          {
            question: "How many watts is 10 amps at 120 volts?",
            answer:
              "At 120 Volts with unity power factor (PF = 1.0), 10 Amps equals exactly 1,200 Watts (10A × 120V = 1,200W). For continuous duty operating 3 hours or more on standard non-100%-rated breakers, continuous duty is typically planned to an 80% benchmark of 960 Watts (8A), depending on the equipment listing and installation context. At 240 Volts, 10 Amps produces 2,400 Watts.",
          },
          {
            question: "How many watts is 20 amps at 120 volts?",
            answer:
              "At 120 Volts with unity power factor (PF = 1.0), 20 Amps produces exactly 2,400 Watts of electrical power (20A × 120V = 2,400W). For continuous duty (3 hours or longer) on standard non-100%-rated breakers, sizing practice commonly uses an 80% planning benchmark (1,920 Watts or 16A), whereas non-continuous equipment may utilize up to 2,400 Watts subject to circuit and conductor design.",
          },
          {
            question: "How many watts is 30 amps at 120V and 240V?",
            answer:
              "At 120 Volts (such as a 30A RV park receptacle), 30 Amps produces 3,600 Watts (30A × 120V = 3,600W), with an 80% continuous planning benchmark of 2,880 Watts for loads sustained over 3 hours. At 240 Volts (such as an electric clothes dryer or water heater), 30 Amps delivers 7,200 Watts (30A × 240V = 7,200W), with an 80% continuous planning reference of 5,760 Watts.",
          },
          {
            question: "How many watts is 40 amps at 240 volts?",
            answer:
              "At 240 Volts with unity power factor (PF = 1.0), 40 Amps delivers 9,600 Watts (40A × 240V = 9,600W or 9.60 kW). Where continuous duty of 3 hours or more applies on standard non-100%-rated equipment, planning guidelines benchmark continuous load to 80% (7,680 Watts or 32A). Actual limits depend on installation type, conductor temperature ratings, and local codes. At 120 Volts, 40 Amps delivers 4,800 Watts.",
          },
          {
            question: "How do you convert amps to watts?",
            answer:
              "To convert Amps to Watts, multiply current in Amperes by circuit voltage in Volts. For direct current (DC), the formula is P = I × V. For alternating current (AC) single-phase circuits, multiply by the power factor: P = I × V × PF. For balanced three-phase circuits, multiply by the square root of 3 (1.732): P = √3 × V_LL × I × PF.",
          },
          {
            question: "Can volts be converted directly to watts?",
            answer:
              "No. Voltage is electrical potential difference, whereas wattage is the rate of energy consumption. You cannot convert volts directly into watts without knowing circuit current (Amperes) or electrical resistance (Ohms). A 120V outlet draws zero watts until a device drawing current is plugged in.",
          },
          {
            question: "How do you calculate three-phase watts from amps?",
            answer:
              "For a balanced three-phase system using line-to-line voltage, multiply the square root of 3 (approximately 1.732) by line-to-line voltage, current in Amps, and power factor: Watts = √3 × V_LL × Amps × PF. For example, 20 Amps on a 208V three-phase circuit with a power factor of 0.90 yields approximately 6,485 Watts (6.48 kW).",
          },
          {
            question: "What is the difference between watts and volt-amperes (VA)?",
            answer:
              "Watts (W) measures real active power that performs physical work or generates heat. Volt-Amperes (VA) measures apparent power, which is the total circulating voltage and current in an AC circuit. In circuits with motors or compressors, current and voltage are slightly out of phase, making VA higher than Watts (Watts = VA × Power Factor).",
          },
        ]}
      />

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
