"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  calculateSolarChargeController,
  ControllerTechnology,
  SystemVoltage,
  TemperatureUnit,
  SOLAR_ARRAY_PRESETS,
  CONTROLLER_MAX_VOC_PRESETS,
  SOLAR_CHARGE_CONTROLLER_DEFAULTS,
  SOLAR_CHARGE_CONTROLLER_FAQS,
  formatAmps,
  formatVolts,
  formatWatts,
} from "@/lib/calculators/solar-charge-controller";
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
import { SolarChargeControllerFlowDiagram } from "@/components/calculators/SolarChargeControllerFlowDiagram";
import Link from "next/link";
import {
  Zap,
  Sliders,
  Sun,
  ShieldAlert,
  Info,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Layers,
  ArrowRight,
} from "lucide-react";

const RELATED_TOOLS: RelatedTool[] = [
  {
    title: "Solar System Size Calculator",
    description:
      "Calculate the solar system size in kW and approximate panel count required to power your home based on monthly kWh electricity consumption.",
    href: "/solar-system-size-calculator",
    category: "Solar PV",
  },
  {
    title: "How to Size a Solar Charge Controller",
    description:
      "Complete MPPT vs PWM sizing guide covering cold-weather Voc calculations, battery voltage matching, and overpaneling.",
    href: "/how-to-size-a-solar-charge-controller",
    category: "Solar Engineering Guide",
  },
  {
    title: "Inverter Size Calculator",
    description:
      "Calculate continuous and surge wattage, DC battery current draw, cable gauge (AWG), and fuse sizing across 12V, 24V, and 48V systems.",
    href: "/inverter-size-calculator",
    category: "Inverters & DC Sizing",
  },
  {
    title: "Solar Battery Sizing Calculator",
    description:
      "Size your off-grid or hybrid battery bank in Amp-hours and Watt-hours based on daily energy consumption and days of autonomy.",
    href: "/solar-battery-calculator",
    category: "Battery Storage",
  },
  {
    title: "Solar Panels in Series vs Parallel",
    description:
      "Understand how series and parallel wiring strings affect array operating voltage, short-circuit current, and charge controller compatibility.",
    href: "/solar-panels-series-vs-parallel",
    category: "Solar Engineering Guide",
  },
  {
    title: "Solar Panel Tilt Angle Calculator",
    description:
      "Calculate optimal seasonal tilt angles and compass orientation for your specific latitude to maximize PV generation.",
    href: "/solar-panel-tilt-calculator",
    category: "Solar PV",
  },
  {
    title: "Battery Capacity & Sizing Calculator",
    description:
      "Convert battery Amp-hours to Watt-hours, calculate usable storage based on Depth of Discharge, and estimate runtimes.",
    href: "/battery-capacity-calculator",
    category: "Battery Storage",
  },
  {
    title: "Watts to Amps Electrical Calculator",
    description:
      "Convert real power in Watts to circuit current in Amperes across DC, 120V/240V single-phase, and three-phase circuits.",
    href: "/watts-to-amps-calculator",
    category: "Electrical",
  },
  {
    title: "Voltage Drop Calculator",
    description:
      "Calculate circuit voltage drop and size conductors between solar PV arrays, charge controllers, and battery banks.",
    href: "/voltage-drop-calculator",
    category: "Electrical Circuits",
  },
];

export const SolarChargeControllerCalculator: React.FC = () => {
  // Tier 1: Core Sizing Inputs
  const [arrayWatts, setArrayWatts] = useState<number>(400);
  const [systemVoltage, setSystemVoltage] = useState<SystemVoltage>(12);
  const [controllerType, setControllerType] = useState<ControllerTechnology>("mppt");
  const [enableBuffer, setEnableBuffer] = useState<boolean>(true);
  const [bufferPercent, setBufferPercent] = useState<number>(20);
  const [arrayIsc, setArrayIsc] = useState<number>(10.0);

  // Tier 2: Optional Cold Voc Check Inputs
  const [enableVoltageCheck, setEnableVoltageCheck] = useState<boolean>(false);
  const [vocStc, setVocStc] = useState<number>(48.6);
  const [minTemp, setMinTemp] = useState<number>(-10);
  const [tempUnit, setTempUnit] = useState<TemperatureUnit>("c");
  const [tempCoeffPercent, setTempCoeffPercent] = useState<number>(-0.30);
  const [controllerMaxVoc, setControllerMaxVoc] = useState<number>(100);

  // Accordion UI state for advanced voltage check
  const [isAccordionOpen, setIsAccordionOpen] = useState<boolean>(false);

  // Calculation
  const result = useMemo(() => {
    return calculateSolarChargeController({
      arrayWatts,
      systemVoltage,
      controllerType,
      enableBuffer,
      bufferPercent,
      arrayIsc,
      enableVoltageCheck,
      vocStc,
      minTemp,
      tempUnit,
      tempCoeffPercent,
      controllerMaxVoc,
    });
  }, [
    arrayWatts,
    systemVoltage,
    controllerType,
    enableBuffer,
    bufferPercent,
    arrayIsc,
    enableVoltageCheck,
    vocStc,
    minTemp,
    tempUnit,
    tempCoeffPercent,
    controllerMaxVoc,
  ]);

  const handleReset = () => {
    setArrayWatts(SOLAR_CHARGE_CONTROLLER_DEFAULTS.arrayWatts);
    setSystemVoltage(SOLAR_CHARGE_CONTROLLER_DEFAULTS.systemVoltage);
    setControllerType(SOLAR_CHARGE_CONTROLLER_DEFAULTS.controllerType);
    setEnableBuffer(SOLAR_CHARGE_CONTROLLER_DEFAULTS.enableBuffer);
    setBufferPercent(SOLAR_CHARGE_CONTROLLER_DEFAULTS.bufferPercent);
    setArrayIsc(SOLAR_CHARGE_CONTROLLER_DEFAULTS.arrayIsc ?? 10.0);
    setEnableVoltageCheck(false);
    setVocStc(SOLAR_CHARGE_CONTROLLER_DEFAULTS.vocStc ?? 48.6);
    setMinTemp(SOLAR_CHARGE_CONTROLLER_DEFAULTS.minTemp ?? -10);
    setTempUnit(SOLAR_CHARGE_CONTROLLER_DEFAULTS.tempUnit ?? "c");
    setTempCoeffPercent(SOLAR_CHARGE_CONTROLLER_DEFAULTS.tempCoeffPercent ?? -0.30);
    setControllerMaxVoc(SOLAR_CHARGE_CONTROLLER_DEFAULTS.controllerMaxVoc ?? 100);
    setIsAccordionOpen(false);
  };

  const handlePresetSelect = (presetId: string) => {
    const preset = SOLAR_ARRAY_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setArrayWatts(preset.watts);
    setSystemVoltage(preset.voltage);
    setControllerType(preset.tech);
  };

  const handleTempUnitToggle = (newUnit: TemperatureUnit) => {
    if (newUnit === tempUnit) return;
    if (newUnit === "f") {
      setMinTemp(Math.round(minTemp * (9 / 5) + 32));
    } else {
      setMinTemp(Math.round((minTemp - 32) * (5 / 9)));
    }
    setTempUnit(newUnit);
  };

  const workedSteps: WorkedStep[] = [
    {
      stepNumber: 1,
      title: "Identify Total Solar Array Nameplate Wattage",
      calculation: "Array Power = 400 Watts STC",
      explanation:
        "Sum the rated peak power of all solar modules in the array under Standard Test Conditions (STC: 1,000 W/m², 25°C cell temperature).",
    },
    {
      stepNumber: 2,
      title: "Determine Nominal Battery Bus Voltage",
      calculation: "Battery Bus = 12 Volts DC Nominal",
      explanation:
        "Select the nominal direct-current operating voltage of the battery storage bank (12V, 24V, or 48V DC).",
    },
    {
      stepNumber: 3,
      title: "Calculate Nominal Charging Current (MPPT DC-DC Conversion)",
      calculation: "400 Watts ÷ 12 Volts = 33.33 Amps",
      explanation:
        "An MPPT charge controller performs step-down DC-to-DC conversion, converting higher PV string voltage down to battery charging voltage while increasing amperage.",
    },
    {
      stepNumber: 4,
      title: "Apply Illustrative Planning Buffer (20%)",
      calculation: "33.33 Amps × 1.20 = 40.00 Amps Planning Current",
      explanation:
        "An illustrative 20% planning margin accounts for edge-of-cloud irradiance spikes, cool panel operating conditions, and prevents prolonged continuous operation at 100% capacity. This is an illustrative planning buffer, not a universal code requirement.",
    },
    {
      stepNumber: 5,
      title: "Select Next Standard Charge Controller Size Class",
      calculation: "40.00 Amps Planning → 40A Rating Class",
      explanation:
        "Select a charge controller with a continuous output rating meeting or exceeding the planning amperage (e.g. 40A, 50A, or 60A class).",
    },
    {
      stepNumber: 6,
      title: "Verify Cold-Weather Open-Circuit Voltage Headroom (NEC 690.7)",
      calculation: "111.6V Voc × [1 + (-0.0028 × (-20°C - 25°C))] = 125.7V Cold Voc < 150V Max PV",
      explanation:
        "As ambient temperature drops, silicon photovoltaic voltage increases. Sizing must verify that the cold-temperature open-circuit voltage never exceeds the charge controller's maximum DC input voltage.",
    },
  ];

  const assumptions: AssumptionItem[] = [
    {
      parameter: "Nominal vs. Real-World Charging Voltage",
      defaultVal: "12V, 24V, or 48V Nominal DC",
      realisticRange: "Bulk/absorption charging voltages reach 14.4V (12V bank), 28.8V (24V bank), or 57.6V (48V bank)",
      impact:
        "The simplified formula uses nominal battery voltage for conservative baseline current sizing. During actual absorption or equalization stages, battery terminal voltage is higher, which causes real-world amperage to be slightly lower for a given wattage.",
    },
    {
      parameter: "Illustrative Planning Buffer",
      defaultVal: "20% Margin (Editable: 0% to 100%)",
      realisticRange: "0% to 25% depending on system design preferences",
      impact:
        "Photovoltaic panels can occasionally exceed 1,000 W/m² irradiance during cloud-edge reflection phenomena, cold sunny mornings, or high snow-albedo conditions. An illustrative planning buffer provides engineering headroom. It is an illustrative planning buffer, not a universal code requirement.",
    },
    {
      parameter: "MPPT vs. PWM Conversion Physics",
      defaultVal: "MPPT (Step-down DC-DC buck converter)",
      realisticRange: "MPPT efficiency typically 95% to 98% | PWM limited to array short-circuit current (Isc)",
      impact:
        "PWM controllers clamp module voltage directly to the battery bus without stepping down voltage into current. Sizing a PWM controller requires knowing the array short-circuit current (Isc) rather than array wattage.",
    },
    {
      parameter: "Cold-Temperature Open-Circuit Voltage Deration",
      defaultVal: "STC Cell Temp: 25°C | Default Voc Coeff: -0.30%/°C",
      realisticRange: "-0.26%/°C to -0.36%/°C depending on panel silicon specification",
      impact:
        "Open-circuit voltage increases as temperature drops. Exceeding a charge controller's maximum DC input voltage even for milliseconds can cause irreversible internal semiconductor damage. Always obtain the exact temperature coefficient from your panel datasheet.",
    },
  ];

  return (
    <CalculatorShell
      title="Solar Charge Controller Sizing Calculator"
      description="Calculate the required charge controller amperage rating and verify cold-temperature open-circuit voltage headroom for off-grid and battery backup solar systems."
      category="Solar PV"
      lastUpdated="October 2026"
      inputSection={
        <div className="space-y-6">
          {/* Quick Array Preset Selector */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-blue-600" />
                Quick Solar Array Presets
              </label>
              <button
                type="button"
                onClick={handleReset}
                className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 transition"
              >
                Reset to Defaults
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SOLAR_ARRAY_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handlePresetSelect(preset.id)}
                  className={`px-2.5 py-2 text-xs font-medium rounded-lg border transition-all text-center ${
                    arrayWatts === preset.watts && systemVoltage === preset.voltage
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm font-semibold"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <div className="font-bold">{preset.watts}W</div>
                  <div className="text-[10px] opacity-80">{preset.voltage}V DC</div>
                </button>
              ))}
            </div>
          </div>

          {/* Core Inputs Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sun className="w-4 h-4 text-amber-500" />
              Tier 1: Array &amp; Battery Sizing Parameters
            </h3>

            {/* Total Solar Array Watts */}
            <InputField
              id="arrayWatts"
              label="Total Solar Array Rating"
              min={1}
              max={50000}
              step={10}
              value={arrayWatts}
              onChange={(val) => setArrayWatts(val)}
              unit="Watts (W)"
              helpText="Sum total nameplate rated power of all solar modules in the array."
            />

            {/* Battery Nominal Voltage & Controller Technology */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectField
                id="systemVoltage"
                label="Battery System Voltage"
                value={systemVoltage.toString()}
                onChange={(val) => setSystemVoltage(parseInt(val, 10) as SystemVoltage)}
                options={[
                  { value: "12", label: "12V DC (Small RV / Van)" },
                  { value: "24", label: "24V DC (Cabin / Workshop)" },
                  { value: "48", label: "48V DC (Residential / Off-Grid)" },
                ]}
                helpText="Nominal operating voltage of the battery storage bank."
              />

              <SelectField
                id="controllerType"
                label="Controller Technology"
                value={controllerType}
                onChange={(val) => setControllerType(val as ControllerTechnology)}
                options={[
                  { value: "mppt", label: "MPPT (DC-DC Step-Down)" },
                  { value: "pwm", label: "PWM (Direct Switch)" },
                ]}
                helpText="MPPT converts voltage to current; PWM directly switches current."
              />
            </div>

            {/* PWM Array Isc Field (only shown if PWM selected) */}
            {controllerType === "pwm" && (
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-lg space-y-2">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <p className="text-xs text-amber-800">
                    <strong>PWM Sizing Notice:</strong> PWM controllers do not step down voltage to create current. Sizing requires the array short-circuit current (Isc) from module datasheets.
                  </p>
                </div>
                <InputField
                  id="arrayIsc"
                  label="Array Short-Circuit Current (Isc)"
                  min={0.1}
                  max={200}
                  step={0.1}
                  value={arrayIsc}
                  onChange={(val) => setArrayIsc(val)}
                  unit="Amperes (A)"
                  helpText="Total combined short-circuit current of all parallel strings."
                />
              </div>
            )}

            {/* Illustrative Planning Buffer Toggle */}
            <div className="border-t border-slate-100 pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-xs font-semibold text-slate-800">
                    Include Illustrative Planning Buffer
                  </label>
                  <p className="text-[11px] text-slate-500">
                    Illustrative planning buffer, not a universal code requirement.
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={enableBuffer}
                  onClick={() => setEnableBuffer(!enableBuffer)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    enableBuffer ? "bg-blue-600" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      enableBuffer ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {enableBuffer && (
                <div className="pt-2">
                  <InputField
                    id="bufferPercent"
                    label="Planning Buffer Percentage"
                    min={0}
                    max={100}
                    step={5}
                    value={bufferPercent}
                    onChange={(val) => setBufferPercent(val)}
                    unit="Percent (%)"
                    helpText="Typical illustrative engineering margin is 20% to account for cold sunny conditions."
                  />
                </div>
              )}
            </div>
          </div>

          {/* Tier 2: Optional Cold Voc Check Accordion */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <button
              type="button"
              onClick={() => {
                setIsAccordionOpen(!isAccordionOpen);
                if (!enableVoltageCheck && !isAccordionOpen) {
                  setEnableVoltageCheck(true);
                }
              }}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors border-b border-slate-100"
            >
              <div className="flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-blue-600" />
                <div>
                  <span className="text-sm font-bold text-slate-800">
                    Tier 2: Cold-Temperature Voc Compatibility Check
                  </span>
                  <span className="ml-2 text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-normal">
                    Optional Engineering Check
                  </span>
                </div>
              </div>
              {isAccordionOpen ? (
                <ChevronUp className="w-4 h-4 text-slate-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-500" />
              )}
            </button>

            {isAccordionOpen && (
              <div className="p-5 space-y-4 bg-slate-50/50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-xs text-slate-600 font-medium">
                    Enable voltage headroom verification:
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={enableVoltageCheck}
                    onClick={() => setEnableVoltageCheck(!enableVoltageCheck)}
                    className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      enableVoltageCheck ? "bg-blue-600" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                        enableVoltageCheck ? "translate-x-5" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {enableVoltageCheck && (
                  <div className="space-y-4 pt-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InputField
                        id="vocStc"
                        label="Array Open-Circuit Voltage (Voc @ STC)"
                        min={1}
                        max={1000}
                        step={0.1}
                        value={vocStc}
                        onChange={(val) => setVocStc(val)}
                        unit="Volts (V)"
                        helpText="Sum of module Voc for series string under 25°C STC."
                      />

                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label htmlFor="minTemp" className="text-xs font-semibold text-slate-700">
                            Lowest Expected Temperature
                          </label>
                          <div className="inline-flex rounded-md border border-slate-300 p-0.5 bg-white text-[10px]">
                            <button
                              type="button"
                              onClick={() => handleTempUnitToggle("c")}
                              className={`px-1.5 py-0.5 rounded ${
                                tempUnit === "c"
                                  ? "bg-blue-600 text-white font-bold"
                                  : "text-slate-600 hover:text-slate-900"
                              }`}
                            >
                              °C
                            </button>
                            <button
                              type="button"
                              onClick={() => handleTempUnitToggle("f")}
                              className={`px-1.5 py-0.5 rounded ${
                                tempUnit === "f"
                                  ? "bg-blue-600 text-white font-bold"
                                  : "text-slate-600 hover:text-slate-900"
                              }`}
                            >
                              °F
                            </button>
                          </div>
                        </div>
                        <input
                          type="number"
                          id="minTemp"
                          aria-label="Lowest Expected Temperature"
                          value={minTemp}
                          onChange={(e) => setMinTemp(parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-[11px] text-slate-500">
                          Record minimum ambient temperature for your location.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InputField
                        id="tempCoeffPercent"
                        label="Voc Temperature Coefficient (α)"
                        step={0.01}
                        value={tempCoeffPercent}
                        onChange={(val) => setTempCoeffPercent(val)}
                        unit="% / °C"
                        helpText="From module datasheet. Silicon panels are typically negative (-0.28% to -0.35%/°C)."
                      />

                      <InputField
                        id="controllerMaxVoc"
                        label="Controller Max PV Input Voltage"
                        min={20}
                        max={1000}
                        step={5}
                        value={controllerMaxVoc}
                        onChange={(val) => setControllerMaxVoc(val)}
                        unit="Volts (V)"
                        helpText="Maximum absolute DC PV input voltage from controller specs."
                      />
                    </div>

                    {/* Controller Max Voc Presets */}
                    <div className="space-y-1.5 pt-1">
                      <label className="text-[11px] font-semibold text-slate-600">
                        Common Controller Max Voltage Ratings:
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {CONTROLLER_MAX_VOC_PRESETS.map((p) => (
                          <button
                            key={p.value}
                            type="button"
                            onClick={() => setControllerMaxVoc(p.value)}
                            className={`px-2 py-1 text-[11px] rounded border transition-colors ${
                              controllerMaxVoc === p.value
                                ? "bg-slate-800 text-white border-slate-800 font-semibold"
                                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                            }`}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Validation Errors & Warnings */}
          {result.errors.length > 0 && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-red-800 font-bold text-xs">
                <ShieldAlert className="w-4 h-4 text-red-600" />
                Please correct the following inputs:
              </div>
              <ul className="list-disc list-inside text-xs text-red-700 space-y-1">
                {result.errors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {result.warnings.length > 0 && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Engineering Notes &amp; Advisories:
              </div>
              <ul className="list-disc list-inside text-xs text-amber-700 space-y-1">
                {result.warnings.map((warn, idx) => (
                  <li key={idx}>{warn}</li>
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
            primaryTitle={`Recommended ${result.controllerType.toUpperCase()} Controller Rating`}
            primaryValue={
              result.isValid
                ? `≥ ${result.recommendedControllerRatingAmps}A Class`
                : "Invalid Inputs"
            }
            primarySubtext={`Continuous output rating for ${systemVoltage}V DC battery bank`}
            stats={[
              {
                label: "Nominal Charging Current",
                value: result.formattedNominalCurrent,
                subtext:
                  result.controllerType === "mppt"
                    ? `${formatWatts(arrayWatts)} ÷ ${systemVoltage}V (P ÷ V)`
                    : `Array Isc (${formatAmps(arrayIsc)})`,
              },
              {
                label: `Planning Current (${result.isBufferEnabled ? `+${result.bufferPercentUsed}%` : "No"} Buffer)`,
                value: result.formattedPlanningCurrent,
                subtext: result.isBufferEnabled
                  ? "Illustrative planning buffer, not code requirement."
                  : "Baseline nominal current without extra margin.",
              },
              {
                label: "Technology",
                value: result.controllerType.toUpperCase(),
                subtext:
                  result.controllerType === "mppt"
                    ? "DC-to-DC Step-Down Buck"
                    : "Direct Voltage Clamping Switch",
              },
              ...(result.isVoltageCheckEnabled && result.coldVocVolts !== undefined
                ? [
                    {
                      label: "Cold-Adjusted Voc",
                      value: result.formattedColdVoc ?? "0.0 V",
                      subtext: `@ ${result.minTempUsedC?.toFixed(1)}°C (${result.minTempUsedF?.toFixed(1)}°F)`,
                    },
                    {
                      label: "Voltage Headroom",
                      value: result.formattedVoltageHeadroom ?? "0.0 V",
                      subtext:
                        result.voltageStatus === "within_limit"
                          ? `Below ${result.controllerMaxVocUsed}V Max PV`
                          : `Exceeds by ${formatVolts(Math.abs(result.voltageHeadroomVolts ?? 0))}`,
                    },
                  ]
                : []),
            ]}
          />

          {/* Voltage Status Banner (If Tier 2 is active) */}
          {result.isVoltageCheckEnabled && result.coldVocVolts !== undefined && (
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 ${
                result.voltageStatus === "within_limit"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                  : "bg-red-50 border-red-200 text-red-900"
              }`}
            >
              {result.voltageStatus === "within_limit" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wide">
                  {result.voltageStatus === "within_limit"
                    ? "Voltage Headroom Verified"
                    : "Voltage Limit Exceeded"}
                </h4>
                <p className="text-xs leading-relaxed">{result.voltageMessage}</p>
              </div>
            </div>
          )}

          {/* Quick Sizing Context Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-xs text-slate-600">
            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-blue-600" />
              System Voltage Current Comparison
            </div>
            <p>
              Doubling battery bus voltage cuts charge controller current requirement in half:
            </p>
            <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[11px] text-center">
              <div className="bg-white p-1.5 rounded border border-slate-200">
                <span className="block text-slate-400 text-[10px]">12V Bus</span>
                <span className="font-bold text-slate-800">{formatAmps(arrayWatts / 12)}</span>
              </div>
              <div className="bg-white p-1.5 rounded border border-slate-200">
                <span className="block text-slate-400 text-[10px]">24V Bus</span>
                <span className="font-bold text-slate-800">{formatAmps(arrayWatts / 24)}</span>
              </div>
              <div className="bg-white p-1.5 rounded border border-slate-200">
                <span className="block text-slate-400 text-[10px]">48V Bus</span>
                <span className="font-bold text-slate-800">{formatAmps(arrayWatts / 48)}</span>
              </div>
            </div>
          </div>

          {/* Quick Cross-Link to Charge Controller Sizing Guide */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs text-blue-900 flex items-start gap-3">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <span className="font-bold">Need help choosing between MPPT and PWM?</span>
              <p className="text-blue-800 leading-relaxed">
                Learn how series stringing, cold-weather voltage spikes, and overpaneling limits affect controller choice in our complete{" "}
                <Link
                  href="/how-to-size-a-solar-charge-controller"
                  className="font-bold underline hover:text-blue-950 inline-flex items-center gap-0.5"
                >
                  Solar Charge Controller Sizing Guide
                  <ArrowRight className="w-3 h-3" />
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      }
    >
      {/* Featured Visual Asset: Solar Charge Controller System */}
      <div className="my-8 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
        <Image
          src="/images/calculators/solar-charge-controller-system.webp"
          alt="Solar Charge Controller Sizing Schematic showing solar PV array, MPPT and PWM controller conversion, cold Voc calculation, and battery storage bus."
          width={1200}
          height={675}
          className="w-full h-auto object-cover"
          priority
        />
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 leading-relaxed">
          <span className="font-bold text-slate-800">Figure 1: Solar Charge Controller System Architecture: </span>
          Photovoltaic string routing DC power through an MPPT step-down controller into a nominal battery bank, highlighting current transformation and cold-temperature open-circuit voltage headroom.
        </div>
      </div>

      {/* Supporting Technical Flow Diagram */}
      <SolarChargeControllerFlowDiagram
        arrayWatts={arrayWatts}
        systemVoltage={systemVoltage}
        controllerType={controllerType}
        nominalCurrentAmps={result.nominalCurrentAmps}
        planningCurrentAmps={result.planningCurrentAmps}
        recommendedRatingAmps={result.recommendedControllerRatingAmps}
        isBufferEnabled={result.isBufferEnabled}
        bufferPercent={result.bufferPercentUsed}
        isVoltageCheckEnabled={result.isVoltageCheckEnabled}
        coldVocVolts={result.coldVocVolts}
        controllerMaxVoc={result.controllerMaxVocUsed}
        voltageStatus={result.voltageStatus}
      />

      {/* Formula & Calculation Methodology */}
      <FormulaSection
        title="Solar Charge Controller Sizing Formulas"
        description="The mathematical formulas required to calculate nominal charging current, apply illustrative planning buffers, and verify cold-weather open-circuit voltage headroom."
        formulaDisplay="I_nominal = P_array ÷ V_battery | I_planning = I_nominal × (1 + Buffer% ÷ 100) | Voc_cold = Voc_STC × [1 + (α ÷ 100) × (T_min - 25°C)]"
        variables={[
          {
            symbol: "P_array",
            name: "Solar Array Power",
            unit: "Watts (W)",
            description: "Total rated solar array power under Standard Test Conditions (STC: 1,000 W/m², 25°C).",
          },
          {
            symbol: "V_battery",
            name: "Battery System Voltage",
            unit: "Volts DC (V)",
            description: "Nominal direct-current operating voltage of the battery storage bank (12V, 24V, or 48V).",
          },
          {
            symbol: "I_nominal",
            name: "Nominal Charging Current",
            unit: "Amperes (A)",
            description: "Baseline direct-current charging amperage delivered from MPPT conversion to the battery bank.",
          },
          {
            symbol: "Buffer%",
            name: "Planning Buffer",
            unit: "Percent (%)",
            description: "Illustrative engineering margin (default 20%). Illustrative planning buffer, not a universal code requirement.",
          },
          {
            symbol: "Voc_cold",
            name: "Cold-Adjusted Voc",
            unit: "Volts (V)",
            description: "Highest expected open-circuit voltage calculated at the lowest record ambient temperature.",
          },
        ]}
        notes={[
          "MPPT controllers step down high solar array voltage to battery charging voltage, increasing charging amperage proportionally.",
          "PWM controllers clamp panel voltage down to battery voltage and cannot step down voltage into extra current; size PWM controllers from array short-circuit current (Isc).",
          "Open-circuit voltage increases as temperature drops below 25°C. Cold Voc must remain strictly below the controller maximum DC input voltage.",
          "The 20% buffer is an illustrative planning buffer, not a universal code requirement.",
        ]}
      />

      {/* Step-by-Step Worked Example */}
      <WorkedExampleSection
        title="Step-by-Step Worked Example: 400W Solar Array on 12V Battery with Cold-Weather Voc Check"
        scenario="A mobile RV solar system features a 400-watt solar array (two 200W panels in series, Voc_STC = 48.6V, temp coeff α = -0.30%/°C) charging a 12V battery bank. The lowest expected winter temperature is -10°C, and the owner is evaluating a charge controller rated for 100V maximum PV input."
        steps={workedSteps}
        conclusion="For this 400W 12V system, calculated nominal charging current is 33.3 Amps (400W ÷ 12V). Adding an illustrative 20% planning buffer yields an illustrative planning value of 40.0 Amps, indicating that a standard 40A controller rating class may be considered under these planning assumptions. Under -10°C winter conditions, the array's open-circuit voltage rises to 53.7V, which is within the entered controller voltage limit of 100V with 46.3V of calculated headroom."
      />

      {/* Engineering Assumptions & Variables */}
      <AssumptionsSection
        title="Solar Charge Controller Sizing Assumptions & Variables"
        description="Key assumptions and parameters used in calculating solar charge controller amperage, technology selection, and cold-temperature voltage headroom."
        assumptions={assumptions}
      />

      {/* Frequently Asked Questions */}
      <FaqSection
        title="Solar Charge Controller Frequently Asked Questions"
        faqs={SOLAR_CHARGE_CONTROLLER_FAQS}
      />

      {/* Regulatory & Electrical Disclaimers */}
      <DisclaimerSection
        title="Preliminary Planning & Electrical Engineering Disclaimer"
        points={[
          "This tool provides preliminary educational sizing estimates based on user inputs and simplified mathematical models. Real-world solar array power, charging current, and battery absorption rates vary continuously with solar irradiance, module temperature, wiring resistance, and charge controller operational efficiency.",
          "The default 20% planning buffer is an illustrative planning margin intended to demonstrate conservative sizing headroom. It is an illustrative planning buffer, not a universal code requirement. System designers must consult applicable regional electrical codes (such as NFPA 70 / National Electrical Code Article 690) for mandatory conductor, overcurrent, and disconnect sizing requirements.",
          "Photovoltaic generation systems and battery energy storage systems operate with high DC voltages and substantial short-circuit fault currents capable of causing electrical fire, severe injury, or property damage. Always verify equipment compatibility against manufacturer specifications and consult a licensed electrician or engineer before purchasing equipment or performing physical installations.",
        ]}
      />

      {/* Related Tools & Sizing Guides */}
      <RelatedCalculators
        calculators={RELATED_TOOLS}
      />
    </CalculatorShell>
  );
};
