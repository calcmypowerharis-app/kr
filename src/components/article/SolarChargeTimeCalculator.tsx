"use client";

import React, { useState, useMemo } from "react";
import {
  calculateSolarChargeTime,
  SolarChargeTimeInput,
  BatteryChemistry,
  ControllerTechnology,
  SystemVoltage,
  COMMON_SOLAR_CHARGE_PRESETS,
  CHEMISTRY_PROFILES,
  CONTROLLER_PROFILES,
} from "@/lib/calculators/solar-charge-time";
import {
  Sun,
  Battery,
  Sliders,
  AlertTriangle,
  Info,
  Clock,
  Zap,
  CheckCircle2,
  Calendar,
} from "lucide-react";

export function SolarChargeTimeCalculator() {
  const [voltage, setVoltage] = useState<SystemVoltage>(12);
  const [capacityAh, setCapacityAh] = useState<number>(100);
  const [initialSoc, setInitialSoc] = useState<number>(20);
  const [targetSoc, setTargetSoc] = useState<number>(100);
  const [chemistry, setChemistry] = useState<BatteryChemistry>("lifepo4");
  const [solarWatts, setSolarWatts] = useState<number>(200);
  const [controllerType, setControllerType] = useState<ControllerTechnology>("mppt");
  const [peakSunHours, setPeakSunHours] = useState<number>(4.5);
  const [activePreset, setActivePreset] = useState<string>("rv-van-100ah-200w");

  const handleApplyPreset = (presetId: string) => {
    const preset = COMMON_SOLAR_CHARGE_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setVoltage(preset.input.batteryVoltage);
    setCapacityAh(preset.input.batteryCapacityAh);
    setInitialSoc(preset.input.initialSocPercent);
    setTargetSoc(preset.input.targetSocPercent);
    setChemistry(preset.input.chemistry);
    setSolarWatts(preset.input.solarWatts);
    setControllerType(preset.input.controllerType);
    setPeakSunHours(preset.input.peakSunHoursPerDay);
    setActivePreset(presetId);
  };

  const calculationInput: SolarChargeTimeInput = useMemo(
    () => ({
      batteryVoltage: voltage,
      batteryCapacityAh: capacityAh,
      initialSocPercent: initialSoc,
      targetSocPercent: targetSoc,
      chemistry,
      solarWatts,
      controllerType,
      peakSunHoursPerDay: peakSunHours,
    }),
    [
      voltage,
      capacityAh,
      initialSoc,
      targetSoc,
      chemistry,
      solarWatts,
      controllerType,
      peakSunHours,
    ]
  );

  const result = useMemo(
    () => calculateSolarChargeTime(calculationInput),
    [calculationInput]
  );

  return (
    <section
      id="solar-charge-calculator"
      className="my-10 rounded-2xl border-2 border-amber-300 bg-linear-to-b from-amber-50/60 via-white to-slate-50 p-5 sm:p-7 shadow-sm transition"
      aria-label="Solar Battery Charge Time Calculator"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200/80 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-1.5">
            <Sun className="w-3.5 h-3.5 text-amber-600" />
            <span>Interactive Engineering Tool</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Solar Panel Battery Charge Time Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Estimate required peak sun hours and realistic calendar days based on battery chemistry, solar wattage, and controller conversion.
          </p>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="mt-4 pt-1">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Quick Calculation Presets:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          {COMMON_SOLAR_CHARGE_PRESETS.map((preset) => {
            const isSelected = activePreset === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleApplyPreset(preset.id)}
                className={`text-left p-2.5 rounded-xl border text-xs transition font-medium ${
                  isSelected
                    ? "bg-amber-500 text-white border-amber-600 shadow-xs"
                    : "bg-white text-slate-700 border-slate-200 hover:border-amber-400 hover:bg-amber-50/50"
                }`}
              >
                <div className="font-bold truncate">{preset.name.split(":")[0]}</div>
                <div
                  className={`text-[11px] truncate mt-0.5 ${
                    isSelected ? "text-amber-100" : "text-slate-500"
                  }`}
                >
                  {preset.name.split(":")[1]?.trim() || preset.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Calculator Grid */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 space-y-4 shadow-2xs">
            <div className="font-bold text-sm text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Battery className="w-4 h-4 text-amber-600" />
              <span>1. Battery Bank Specifications</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  System Nominal Voltage
                </label>
                <select
                  value={voltage}
                  onChange={(e) => {
                    setVoltage(Number(e.target.value) as SystemVoltage);
                    setActivePreset("");
                  }}
                  className="w-full text-xs sm:text-sm rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 font-medium focus:border-amber-500 focus:outline-hidden"
                >
                  <option value={12}>12 Volts DC</option>
                  <option value={24}>24 Volts DC</option>
                  <option value={48}>48 Volts DC</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Battery Capacity (Ah)
                </label>
                <input
                  type="number"
                  min={1}
                  max={2000}
                  value={capacityAh}
                  onChange={(e) => {
                    setCapacityAh(Math.max(1, Number(e.target.value)));
                    setActivePreset("");
                  }}
                  className="w-full text-xs sm:text-sm rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 font-medium focus:border-amber-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Battery Chemistry
              </label>
              <select
                value={chemistry}
                onChange={(e) => {
                  setChemistry(e.target.value as BatteryChemistry);
                  setActivePreset("");
                }}
                className="w-full text-xs sm:text-sm rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 font-medium focus:border-amber-500 focus:outline-hidden"
              >
                <option value="lifepo4">LiFePO4 Lithium (98% efficient, fast absorption)</option>
                <option value="lead_acid_agm">Lead-Acid AGM / Sealed (85% efficient, 2-4h absorption soak)</option>
                <option value="lead_acid_flooded">Lead-Acid Flooded (80% efficient, high gassing/heat)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3.5 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Starting SoC (%)
                </label>
                <input
                  type="number"
                  min={0}
                  max={99}
                  value={initialSoc}
                  onChange={(e) => {
                    const val = Math.min(99, Math.max(0, Number(e.target.value)));
                    setInitialSoc(val);
                    if (val >= targetSoc) setTargetSoc(Math.min(100, val + 1));
                    setActivePreset("");
                  }}
                  className="w-full text-xs sm:text-sm rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 font-medium focus:border-amber-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target SoC (%)
                </label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={targetSoc}
                  onChange={(e) => {
                    const val = Math.min(100, Math.max(initialSoc + 1, Number(e.target.value)));
                    setTargetSoc(val);
                    setActivePreset("");
                  }}
                  className="w-full text-xs sm:text-sm rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 font-medium focus:border-amber-500 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 space-y-4 shadow-2xs">
            <div className="font-bold text-sm text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Sun className="w-4 h-4 text-amber-600" />
              <span>2. Solar Array &amp; Environmental Factors</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Total Solar Array Rating (Watts STC)
                </label>
                <input
                  type="number"
                  min={10}
                  max={15000}
                  step={50}
                  value={solarWatts}
                  onChange={(e) => {
                    setSolarWatts(Math.max(10, Number(e.target.value)));
                    setActivePreset("");
                  }}
                  className="w-full text-xs sm:text-sm rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 font-medium focus:border-amber-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Solar Charge Controller
                </label>
                <select
                  value={controllerType}
                  onChange={(e) => {
                    setControllerType(e.target.value as ControllerTechnology);
                    setActivePreset("");
                  }}
                  className="w-full text-xs sm:text-sm rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 font-medium focus:border-amber-500 focus:outline-hidden"
                >
                  <option value="mppt">MPPT (82% net outdoor yield)</option>
                  <option value="pwm">PWM (65% net yield, voltage clamped)</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Daily Peak Sun Hours (PSH / day)
                </label>
                <span className="text-xs font-bold text-amber-700">
                  {peakSunHours.toFixed(1)} hrs/day
                </span>
              </div>
              <input
                type="range"
                min={1.5}
                max={7.0}
                step={0.5}
                value={peakSunHours}
                onChange={(e) => {
                  setPeakSunHours(Number(e.target.value));
                  setActivePreset("");
                }}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
                <span>Winter / Cloudy (2.0 PSH)</span>
                <span>US Average (4.5 PSH)</span>
                <span>Southwest Summer (6.5 PSH)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Dashboard (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="bg-slate-900 text-white rounded-xl p-5 sm:p-6 space-y-5 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                Calculation Results
              </span>
              <span className="text-xs text-slate-400">
                {voltage}V · {capacityAh}Ah ({result.nominalBatteryEnergyWh} Wh)
              </span>
            </div>

            {/* Primary Big Metric 1: Peak Sun Hours */}
            <div>
              <div className="text-xs text-slate-400 font-medium">
                Required Solar Peak Sun Hours
              </div>
              <div className="text-3xl sm:text-4xl font-black text-amber-400 mt-0.5 tracking-tight flex items-baseline gap-2">
                <span>{result.chargeTimePeakSunHours}</span>
                <span className="text-sm font-semibold text-slate-300">Peak Sun Hours</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Hours of 1,000 W/m² equivalent direct sunlight needed to replenish {result.deficitEnergyWh} Wh.
              </p>
            </div>

            {/* Primary Big Metric 2: Estimated Days */}
            <div className="border-t border-slate-800 pt-3.5">
              <div className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Estimated Calendar Days to Full Charge</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white mt-0.5 tracking-tight flex items-baseline gap-2">
                <span>{result.chargeTimeDays}</span>
                <span className="text-xs font-semibold text-slate-300">
                  {result.chargeTimeDays <= 1.0 ? "Day (Full Sun)" : "Days (Weather Dependent)"}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Based on your selected local irradiance of {peakSunHours} peak sun hours per day.
              </p>
            </div>

            {/* Detailed Engineering Sub-Metrics */}
            <div className="border-t border-slate-800 pt-3.5 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Effective Solar Output:</span>
                <span className="font-mono font-bold text-amber-300">{result.effectiveSolarWatts} Watts DC</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Bulk Charging Current:</span>
                <span className="font-mono font-bold text-amber-300">{result.effectiveChargingAmps} Amps DC</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Total Energy Needed:</span>
                <span className="font-mono font-bold text-slate-100">{result.energyNeededWh} Wh</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Net System Yield:</span>
                <span className="font-mono font-semibold text-slate-100">{result.systemEfficiencyPercent}%</span>
              </div>
            </div>

            {/* Warning Callout if C-rate is exceeded */}
            {result.cRateWarning && (
              <div className="rounded-lg bg-amber-950/80 border border-amber-600/70 p-3 text-xs text-amber-200 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="leading-snug">{result.cRateWarning}</p>
              </div>
            )}
          </div>

          {/* Chemistry Notice Card */}
          {result.absorptionNote && (
            <div className="rounded-xl border border-slate-200 bg-white p-3.5 text-xs text-slate-700 flex items-start gap-2 shadow-2xs">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block mb-0.5">
                  Charging Behavior Note:
                </span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {result.absorptionNote}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Assumptions Footer Accordion / Note */}
      <div className="mt-5 pt-3.5 border-t border-amber-200/60">
        <div className="text-[11px] text-slate-500 space-y-1">
          <div className="font-bold text-slate-700">Calculation Assumptions &amp; Scope:</div>
          <ul className="list-disc pl-4 space-y-0.5">
            {result.assumptions.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
