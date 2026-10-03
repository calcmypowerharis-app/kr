"use client";

import React, { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Zap,
  Plus,
  Trash2,
  Copy,
  Check,
  RotateCcw,
  Sliders,
  DollarSign,
  TrendingUp,
  Cpu,
  Tv,
  Flame,
  Lightbulb,
  Snowflake,
  Layers,
  HelpCircle,
} from "lucide-react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { FormulaSection } from "@/components/calculators/FormulaSection";
import { WorkedExampleSection } from "@/components/calculators/WorkedExampleSection";
import { AssumptionsSection } from "@/components/calculators/AssumptionsSection";
import { FaqSection } from "@/components/calculators/FaqSection";
import { DisclaimerSection } from "@/components/calculators/DisclaimerSection";
import { RelatedCalculators } from "@/components/calculators/RelatedCalculators";
import {
  ApplianceInput,
  calculateTotalElectricityUse,
  PRESET_APPLIANCE_LIBRARY,
  CALCULATOR_PRESETS,
  ELECTRICITY_USE_FAQS,
} from "@/lib/calculators/electricity-use";

export const ElectricityUseCalculator: React.FC = () => {
  // State: Active preset identifier
  const [activePresetId, setActivePresetId] = useState<string>("default_home");

  // State: Appliances list
  const [appliances, setAppliances] = useState<ApplianceInput[]>(() =>
    CALCULATOR_PRESETS[0].appliances.map((app) => ({ ...app }))
  );

  // State: Global planning settings
  const [planningDays, setPlanningDays] = useState<number>(30);
  const [electricityRate, setElectricityRate] = useState<string>("0.16"); // illustrative default string
  const [rateEnabled, setRateEnabled] = useState<boolean>(true);

  // State: Quick-add library dropdown selection
  const [selectedLibraryId, setSelectedLibraryId] = useState<string>("");

  // State: Duty cycle visibility toggle per appliance row
  const [showDutyCycleMap, setShowDutyCycleMap] = useState<Record<string, boolean>>({});

  // State: Copy feedback
  const [copied, setCopied] = useState<boolean>(false);

  // Calculation execution
  const calculation = useMemo(() => {
    const rateNum = rateEnabled && electricityRate !== "" ? Number(electricityRate) : undefined;
    return calculateTotalElectricityUse({
      appliances,
      planningDays,
      electricityRate: rateNum,
    });
  }, [appliances, planningDays, electricityRate, rateEnabled]);

  // Preset switch handler
  const handleApplyPreset = (presetId: string) => {
    setActivePresetId(presetId);
    const preset = CALCULATOR_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setAppliances(preset.appliances.map((app) => ({ ...app })));
      setShowDutyCycleMap({});
    }
  };

  // Add new empty custom appliance
  const handleAddCustomAppliance = () => {
    const newId = `custom_${Date.now()}`;
    setAppliances((prev) => [
      ...prev,
      {
        id: newId,
        name: `Appliance ${prev.length + 1}`,
        watts: 100,
        hoursPerDay: 4,
        daysPerMonth: planningDays,
        quantity: 1,
        dutyCycle: 1.0,
        category: "general",
      },
    ]);
  };

  // Add selected appliance from preset library
  const handleAddFromLibrary = (libraryId: string) => {
    if (!libraryId) return;
    const presetItem = PRESET_APPLIANCE_LIBRARY.find((item) => item.id === libraryId);
    if (!presetItem) return;

    const newId = `${presetItem.id}_${Date.now()}`;
    setAppliances((prev) => [
      ...prev,
      {
        id: newId,
        name: presetItem.name,
        watts: presetItem.defaultWatts,
        hoursPerDay: presetItem.defaultHoursPerDay,
        daysPerMonth: planningDays,
        quantity: presetItem.defaultQuantity,
        dutyCycle: presetItem.defaultDutyCycle,
        category: presetItem.category,
      },
    ]);
    if (presetItem.defaultDutyCycle < 1.0) {
      setShowDutyCycleMap((prev) => ({ ...prev, [newId]: true }));
    }
    setSelectedLibraryId("");
  };

  // Remove single appliance
  const handleRemoveAppliance = (id: string) => {
    setAppliances((prev) => prev.filter((app) => app.id !== id));
  };

  // Clear all appliances
  const handleClearAll = () => {
    setAppliances([]);
  };

  // Reset to default
  const handleReset = () => {
    handleApplyPreset("default_home");
    setPlanningDays(30);
    setElectricityRate("0.16");
    setRateEnabled(true);
  };

  // Update specific appliance field
  const handleUpdateAppliance = useCallback(
    (id: string, field: keyof ApplianceInput, value: string | number) => {
      setAppliances((prev) =>
        prev.map((app) => {
          if (app.id !== id) return app;

          if (field === "name") {
            return { ...app, name: String(value) };
          }

          const numVal = Number(value);
          if (field === "watts") {
            return { ...app, watts: isNaN(numVal) ? 0 : Math.max(0, numVal) };
          }
          if (field === "hoursPerDay") {
            return { ...app, hoursPerDay: isNaN(numVal) ? 0 : Math.min(24, Math.max(0, numVal)) };
          }
          if (field === "daysPerMonth") {
            return { ...app, daysPerMonth: isNaN(numVal) ? 30 : Math.min(31, Math.max(1, numVal)) };
          }
          if (field === "quantity") {
            return { ...app, quantity: isNaN(numVal) ? 1 : Math.max(1, Math.floor(numVal)) };
          }
          if (field === "dutyCycle") {
            return { ...app, dutyCycle: isNaN(numVal) ? 1.0 : Math.min(1.0, Math.max(0.01, numVal)) };
          }
          return app;
        })
      );
    },
    []
  );

  // Toggle duty cycle visibility for a row
  const toggleDutyCycle = (id: string) => {
    setShowDutyCycleMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Copy summary to clipboard
  const handleCopySummary = async () => {
    const lines = [
      "CalcMyPower Electricity Use Estimate",
      `Planning Period: ${calculation.planningDays} Days`,
      `Total Daily Energy: ${calculation.totalDailyKwh} kWh/day (${calculation.totalDailyWh} Wh/day)`,
      `Total Monthly Energy: ${calculation.totalMonthlyKwh} kWh/month`,
      calculation.totalEstimatedMonthlyCost !== undefined
        ? `Estimated Monthly Energy Charge: $${calculation.totalEstimatedMonthlyCost.toFixed(2)} (at $${Number(electricityRate).toFixed(3)}/kWh)`
        : "",
      "",
      "Appliance Breakdown:",
      ...calculation.breakdown.map(
        (b) =>
          `- ${b.name}: ${b.watts}W × ${b.hoursPerDay}h/d × ${b.quantity} unit(s) = ${b.dailyKwh} kWh/day | ${b.monthlyKwh} kWh/mo (${b.percentOfTotal}%)`
      ),
      "",
      "https://calcmypower.com/electricity-use-calculator",
    ].filter(Boolean);

    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard fallback
    }
  };

  // Helper icon for categories
  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case "kitchen":
        return <Snowflake className="w-3.5 h-3.5 text-blue-500" />;
      case "climate":
        return <Flame className="w-3.5 h-3.5 text-amber-500" />;
      case "electronics":
        return <Tv className="w-3.5 h-3.5 text-purple-500" />;
      case "lighting":
        return <Lightbulb className="w-3.5 h-3.5 text-yellow-500" />;
      default:
        return <Cpu className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  // -------------------------------------------------------------
  // INPUT SECTION (Left Column on Desktop)
  // -------------------------------------------------------------
  const inputSection = (
    <div className="space-y-6">
      {/* 1. Starter Scenarios / Presets */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center justify-between">
          <span>Starter Scenarios</span>
          <span className="text-[11px] text-slate-400 font-normal">Select to load sample devices</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {CALCULATOR_PRESETS.map((preset) => {
            const isActive = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleApplyPreset(preset.id)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition text-left border ${
                  isActive
                    ? "bg-blue-50 border-blue-500 text-blue-800 shadow-xs"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                }`}
              >
                <div className="font-bold truncate">{preset.name}</div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">
                  {preset.appliances.length} items
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Global Calculation Settings (Days & Optional Rate) */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-slate-800 border-b border-slate-200 pb-2">
          <span className="flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-blue-600" />
            <span>Calculation Planning Parameters</span>
          </span>
          <span className="text-slate-400 font-normal">Applicable to all rows</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Planning Days */}
          <div className="space-y-1.5">
            <label htmlFor="planning-days" className="font-semibold text-slate-700 flex items-center justify-between">
              <span>Days in Calculation Period</span>
              <span className="text-slate-400 font-normal">Default: 30 days</span>
            </label>
            <div className="relative">
              <input
                id="planning-days"
                type="number"
                min="1"
                max="31"
                value={planningDays}
                onChange={(e) => setPlanningDays(Math.min(31, Math.max(1, Number(e.target.value) || 30)))}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 font-mono font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-2 text-slate-400 font-sans pointer-events-none">days</span>
            </div>
          </div>

          {/* Optional Electricity Rate */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="elec-rate" className="font-semibold text-slate-700 flex items-center gap-1.5">
                <span>Optional Utility Rate</span>
              </label>
              <label htmlFor="enable-cost" className="inline-flex items-center gap-1 cursor-pointer">
                <input
                  id="enable-cost"
                  name="enableCost"
                  type="checkbox"
                  checked={rateEnabled}
                  onChange={(e) => setRateEnabled(e.target.checked)}
                  aria-label="Enable utility electricity cost calculations"
                  className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                />
                <span className="text-[11px] text-slate-500">Enable Cost</span>
              </label>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-2 text-slate-400 font-mono pointer-events-none">$</span>
              <input
                id="elec-rate"
                name="electricityRate"
                type="number"
                step="0.01"
                min="0"
                disabled={!rateEnabled}
                value={rateEnabled ? electricityRate : ""}
                placeholder="0.16"
                onChange={(e) => setElectricityRate(e.target.value)}
                className={`w-full pl-7 pr-12 py-2 rounded-lg border font-mono font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-500 ${
                  rateEnabled
                    ? "bg-white border-slate-300 text-slate-900"
                    : "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              />
              <span className="absolute right-3 top-2 text-slate-400 font-sans pointer-events-none">/ kWh</span>
            </div>
          </div>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Note: An illustrative rate of $0.16/kWh is preloaded for quick estimation. Electricity rates vary significantly by state and utility.
        </p>
      </div>

      {/* 3. Multi-Appliance List */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Appliance Inventory ({appliances.length})</span>
          </div>

          {/* Quick Add from Preset Library Dropdown */}
          <div className="flex items-center gap-2">
            <select
              id="library-appliance-select"
              name="libraryApplianceSelect"
              value={selectedLibraryId}
              onChange={(e) => handleAddFromLibrary(e.target.value)}
              className="text-xs py-1.5 px-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-700 font-medium hover:border-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 max-w-[170px] sm:max-w-xs truncate"
              aria-label="Add common appliance from library"
            >
              <option value="">+ Add From Library...</option>
              {PRESET_APPLIANCE_LIBRARY.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} ({item.defaultWatts}W)
                </option>
              ))}
            </select>
          </div>
        </div>

        {appliances.length === 0 ? (
          <div className="p-8 text-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 space-y-3">
            <Zap className="w-8 h-8 text-slate-400 mx-auto" />
            <div className="text-sm font-semibold text-slate-700">No appliances in inventory</div>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Add custom devices or choose a starter scenario above to calculate your total electrical energy consumption.
            </p>
            <div className="flex justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={handleAddCustomAppliance}
                className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
              >
                + Add Custom Appliance
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset("default_home")}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition"
              >
                Load Default Scenario
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {appliances.map((app, index) => {
              const breakdownItem = calculation.breakdown.find((b) => b.id === app.id);
              const showDuty = showDutyCycleMap[app.id] ?? (app.dutyCycle !== undefined && app.dutyCycle < 1.0);

              return (
                <div
                  key={app.id}
                  className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3 transition hover:border-slate-300"
                >
                  {/* Top Bar: Name & Remove */}
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="p-1 rounded bg-slate-100 text-slate-600 shrink-0">
                        {getCategoryIcon(app.category)}
                      </span>
                      <input
                        id={`name-${app.id}`}
                        name={`name-${app.id}`}
                        type="text"
                        value={app.name}
                        onChange={(e) => handleUpdateAppliance(app.id, "name", e.target.value)}
                        placeholder="Appliance Name"
                        aria-label={`Appliance ${index + 1} Name`}
                        className="font-bold text-slate-900 text-sm bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-hidden w-full max-w-xs transition"
                      />
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {breakdownItem && (
                        <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-mono font-semibold">
                          {breakdownItem.dailyKwh} kWh/d • {breakdownItem.monthlyKwh} kWh/mo
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveAppliance(app.id)}
                        className="text-slate-400 hover:text-red-600 p-1 rounded transition"
                        title="Remove appliance"
                        aria-label={`Remove ${app.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Main Numeric Fields Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    {/* Watts */}
                    <div className="space-y-1">
                      <label htmlFor={`watts-${app.id}`} className="font-semibold text-slate-600 block">
                        Rated Power
                      </label>
                      <div className="relative">
                        <input
                          id={`watts-${app.id}`}
                          type="number"
                          min="0"
                          step="1"
                          value={app.watts === 0 ? "" : app.watts}
                          placeholder="0"
                          onChange={(e) => handleUpdateAppliance(app.id, "watts", e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 font-mono font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="absolute right-2.5 top-1.5 text-slate-400 text-[11px] pointer-events-none">
                          W
                        </span>
                      </div>
                    </div>

                    {/* Hours/Day */}
                    <div className="space-y-1">
                      <label htmlFor={`hours-${app.id}`} className="font-semibold text-slate-600 block">
                        Hours / Day
                      </label>
                      <div className="relative">
                        <input
                          id={`hours-${app.id}`}
                          type="number"
                          min="0"
                          max="24"
                          step="0.25"
                          value={app.hoursPerDay === 0 ? "" : app.hoursPerDay}
                          placeholder="0"
                          onChange={(e) => handleUpdateAppliance(app.id, "hoursPerDay", e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 font-mono font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="absolute right-2.5 top-1.5 text-slate-400 text-[11px] pointer-events-none">
                          h/d
                        </span>
                      </div>
                    </div>

                    {/* Days / Month */}
                    <div className="space-y-1">
                      <label htmlFor={`days-${app.id}`} className="font-semibold text-slate-600 block">
                        Days Used
                      </label>
                      <div className="relative">
                        <input
                          id={`days-${app.id}`}
                          type="number"
                          min="1"
                          max="31"
                          value={app.daysPerMonth ?? planningDays}
                          onChange={(e) => handleUpdateAppliance(app.id, "daysPerMonth", e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 font-mono font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="absolute right-2.5 top-1.5 text-slate-400 text-[11px] pointer-events-none">
                          days
                        </span>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="space-y-1">
                      <label htmlFor={`qty-${app.id}`} className="font-semibold text-slate-600 block">
                        Quantity
                      </label>
                      <div className="relative">
                        <input
                          id={`qty-${app.id}`}
                          type="number"
                          min="1"
                          step="1"
                          value={app.quantity ?? 1}
                          onChange={(e) => handleUpdateAppliance(app.id, "quantity", e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 font-mono font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="absolute right-2.5 top-1.5 text-slate-400 text-[11px] pointer-events-none">
                          qty
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Duty Cycle Expandable Option for Cycling Loads */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => toggleDutyCycle(app.id)}
                      className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-1"
                    >
                      <span>{showDuty ? "Hide Duty Cycle Option" : "+ Add Compressor / Cycling Duty Cycle"}</span>
                    </button>

                    {showDuty && (
                      <div className="mt-2 p-2.5 rounded-lg bg-blue-50/60 border border-blue-200 text-xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label htmlFor={`duty-${app.id}`} className="font-semibold text-slate-800">
                            Duty Cycle (Active Motor / Compressor Time)
                          </label>
                          <span className="font-mono font-bold text-blue-700">
                            {Math.round((app.dutyCycle ?? 1.0) * 100)}%
                          </span>
                        </div>
                        <input
                          id={`duty-${app.id}`}
                          type="range"
                          min="0.05"
                          max="1.0"
                          step="0.05"
                          value={app.dutyCycle ?? 1.0}
                          onChange={(e) => handleUpdateAppliance(app.id, "dutyCycle", e.target.value)}
                          className="w-full accent-blue-600 cursor-pointer"
                        />
                        <p className="text-[10px] text-slate-500 leading-tight">
                          For cycling appliances like refrigerators and air conditioners. Effective average power:{" "}
                          <strong>{Math.round((app.watts * (app.dutyCycle ?? 1.0)) * 10) / 10}W</strong>.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={handleAddCustomAppliance}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Custom Appliance</span>
          </button>

          {appliances.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="text-xs text-slate-500 hover:text-red-600 font-semibold transition"
            >
              Clear All Rows
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // -------------------------------------------------------------
  // RESULT SECTION (Right Column on Desktop, Sticky)
  // -------------------------------------------------------------
  const resultSection = (
    <div className="space-y-6">
      {/* Primary Result Headline Card */}
      <div className="p-6 md:p-7 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-blue-800/60 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-300 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Electricity Consumption Result</span>
          </span>
          <span className="text-xs text-slate-400 font-mono">
            {calculation.planningDays}-Day Period
          </span>
        </div>

        {/* Main Monthly Metric */}
        <div className="space-y-1">
          <div className="text-xs text-blue-200 font-medium">Estimated Monthly Electricity Use</div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-black text-white tracking-tight font-mono">
              {calculation.totalMonthlyKwh.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 })}
            </span>
            <span className="text-xl sm:text-2xl font-bold text-amber-400 font-sans">kWh / mo</span>
          </div>
        </div>

        {/* Secondary Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 pt-1 border-t border-blue-900/80">
          {/* Daily kWh */}
          <div className="p-3 rounded-xl bg-blue-900/40 border border-blue-700/40 space-y-0.5">
            <div className="text-[11px] text-blue-300">Daily Average</div>
            <div className="text-xl font-bold text-white font-mono">
              {calculation.totalDailyKwh} <span className="text-xs font-normal text-blue-300 font-sans">kWh/d</span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              ({calculation.totalDailyWh.toLocaleString()} Wh/d)
            </div>
          </div>

          {/* Optional Cost */}
          <div className="p-3 rounded-xl bg-blue-900/40 border border-blue-700/40 space-y-0.5">
            <div className="text-[11px] text-blue-300">Estimated Cost</div>
            {calculation.totalEstimatedMonthlyCost !== undefined ? (
              <>
                <div className="text-xl font-bold text-emerald-400 font-mono">
                  ${calculation.totalEstimatedMonthlyCost.toFixed(2)}
                </div>
                <div className="text-[10px] text-slate-400 font-sans">
                  per month @ ${Number(electricityRate).toFixed(3)}/kWh
                </div>
              </>
            ) : (
              <div className="text-xs text-slate-400 italic pt-1">
                Enter rate above for cost
              </div>
            )}
          </div>
        </div>

        {/* Highest Consumer Callout */}
        {calculation.highestConsumer && calculation.totalMonthlyKwh > 0 && (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
            <div className="text-[11px] text-amber-300 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Highest Consumer</span>
            </div>
            <div className="text-slate-200">
              <strong>{calculation.highestConsumer.name}</strong> accounts for{" "}
              <span className="font-mono font-bold text-amber-300">
                {calculation.highestConsumer.percentOfTotal}%
              </span>{" "}
              of total monthly energy ({calculation.highestConsumer.monthlyKwh} kWh).
            </div>
          </div>
        )}

        {/* Copy Action */}
        <button
          type="button"
          onClick={handleCopySummary}
          disabled={calculation.totalMonthlyKwh === 0}
          className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>Summary Copied to Clipboard</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Calculation Summary</span>
            </>
          )}
        </button>
      </div>

      {/* Energy Consumption Breakdown Card */}
      {calculation.breakdown.length > 0 && calculation.totalMonthlyKwh > 0 && (
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Energy Distribution
            </span>
            <span className="text-xs text-slate-500 font-mono">
              {calculation.totalUnits} active units
            </span>
          </div>

          {/* Visual Proportion Bar */}
          <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden flex shadow-inner">
            {calculation.breakdown.map((item, i) => {
              const colors = [
                "bg-blue-600",
                "bg-amber-500",
                "bg-emerald-500",
                "bg-purple-600",
                "bg-cyan-500",
                "bg-rose-500",
                "bg-indigo-500",
              ];
              const color = colors[i % colors.length];
              return (
                <div
                  key={item.id}
                  style={{ width: `${item.percentOfTotal}%` }}
                  className={`${color} transition-all duration-300`}
                  title={`${item.name}: ${item.percentOfTotal}%`}
                />
              );
            })}
          </div>

          {/* Itemized Breakdown List */}
          <div className="space-y-2 pt-1 max-h-80 overflow-y-auto pr-1">
            {calculation.breakdown.map((item, i) => {
              const colors = [
                "bg-blue-600",
                "bg-amber-500",
                "bg-emerald-500",
                "bg-purple-600",
                "bg-cyan-500",
                "bg-rose-500",
                "bg-indigo-500",
              ];
              const color = colors[i % colors.length];

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between text-xs py-1.5 border-b border-slate-50 last:border-0"
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${color} shrink-0`} />
                    <span className="font-semibold text-slate-800 truncate" title={item.name}>
                      {item.name}
                    </span>
                    {item.quantity > 1 && (
                      <span className="text-[10px] text-slate-400">(&times;{item.quantity})</span>
                    )}
                  </div>
                  <div className="text-right shrink-0 font-mono">
                    <span className="font-bold text-slate-900">{item.monthlyKwh} kWh</span>
                    <span className="text-[10px] text-slate-400 ml-1.5">({item.percentOfTotal}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Helpful Companion Educational Guide Card */}
      <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/90 space-y-2 text-xs">
        <div className="font-bold text-blue-950 flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-blue-600" />
          <span>Need a Complete Energy Audit Guide?</span>
        </div>
        <p className="text-slate-600 leading-relaxed">
          Learn how to read yellow EnergyGuide appliance labels, identify phantom standby loads, and conduct a thorough whole-house electrical audit:
        </p>
        <Link
          href="/how-to-calculate-electricity-usage"
          className="inline-flex items-center gap-1 text-blue-700 font-bold hover:underline pt-1"
        >
          <span>Read Comprehensive Electricity Usage Guide &rarr;</span>
        </Link>
      </div>
    </div>
  );

  return (
    <CalculatorShell
      title="Electricity Use Calculator"
      badge="Multi-Appliance Energy Audit"
      description="Calculate electrical energy use in Watt-hours (Wh) and kilowatt-hours (kWh) from appliance wattage, daily operating time, duty cycles, and quantities. Estimate daily, monthly, and custom period consumption."
      category="Electrical Circuits"
      lastUpdated="October 2026"
      onReset={handleReset}
      inputSection={inputSection}
      resultSection={resultSection}
    >
      {/* Visual Asset */}
      <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xs max-w-4xl mx-auto space-y-2 p-2">
        <div className="relative aspect-16/9 w-full rounded-xl overflow-hidden">
          <Image
            src="/images/calculators/electricity-use-calculator.webp"
            alt="Photorealistic residential scene with kitchen appliances and a wall-mounted electronic home energy consumption monitor"
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
            priority
          />
        </div>
        <p className="text-xs text-slate-500 text-center py-1">
          Figure 1: Evaluating residential electricity consumption across major appliances and monitoring cumulative kilowatt-hours (kWh).
        </p>
      </div>

      {/* Methodology & Formulas */}
      <FormulaSection
        title="Electricity Consumption Formulas & Units Explained"
        description="Electrical energy measures the accumulated power consumed by a circuit over time. Grounded in basic electrical physics and U.S. Department of Energy (DOE) accounting standards."
        formulaDisplay="Daily Energy (Wh) = Power (W) × Duty Cycle × Hours per Day × Quantity | Daily kWh = Wh ÷ 1,000 | Monthly kWh = (Daily kWh) × Days"
        variables={[
          {
            symbol: "P",
            name: "Rated Power",
            unit: "Watts (W)",
            description: "Instantaneous rate of electrical power consumed by the device, stated on the equipment nameplate.",
          },
          {
            symbol: "t",
            name: "Operating Duration",
            unit: "Hours per Day (h)",
            description: "Number of active run-time hours the equipment operates during a typical 24-hour day.",
          },
          {
            symbol: "DC",
            name: "Cycling Duty Factor",
            unit: "Decimal (0.01 to 1.0)",
            description: "Fraction of time that thermostatically controlled cycling loads (like refrigerators and air conditioners) actively run.",
          },
          {
            symbol: "Qty",
            name: "Unit Count",
            unit: "Count",
            description: "Total number of identical electrical devices operating simultaneously on the circuit or within the household.",
          },
          {
            symbol: "Days",
            name: "Planning Period",
            unit: "Days (Typically 30)",
            description: "Standardized planning duration, typically 30 days for a monthly utility billing cycle.",
          },
          {
            symbol: "Rate",
            name: "Utility Energy Rate",
            unit: "$ / kWh",
            description: "Volumetric energy charge per kilowatt-hour billed by your electric utility provider.",
          },
        ]}
        notes={[
          "Instantaneous Power vs Cumulative Energy: Power (Watts or kW) measures the instantaneous flow rate of electricity. Energy (Watt-hours or kWh) measures the accumulated volume of work performed over time.",
          "Thermostatic Duty Cycles: Cycling appliances like refrigerators, freezers, and heat pumps do not draw continuous maximum nameplate power for 24 hours. A refrigerator rated at 150W with a 33% duty cycle averages roughly 50W over time.",
        ]}
      />

      {/* Power vs Energy Direct Educational Comparison */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" />
          <span>Understanding Power vs. Energy: Watts vs. Watt-Hours</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>Electrical Power (Watts / kW)</span>
              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono text-[11px]">Instantaneous Rate</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Power is the speed at which electrical energy flows right now. A 100-watt light bulb demands 100 Joules of energy per second while illuminated. 1 kilowatt (kW) equals 1,000 Watts.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>Electrical Energy (Watt-Hours / kWh)</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[11px]">Cumulative Volume</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Energy is the total accumulated volume of electrical work delivered over time. If that 100-watt bulb runs for 10 hours, it consumes 1,000 Watt-hours (Wh), which equals 1.0 kilowatt-hour (kWh). Utility companies bill for energy (kWh), not instantaneous power.
            </p>
          </div>
        </div>
      </div>

      {/* Worked Example Section */}
      <WorkedExampleSection
        title="Step-by-Step Worked Example: Living Room Entertainment Center"
        scenario="A household operates an entertainment center consisting of a 100-Watt LED television used 5 hours daily, a 150-Watt audio amplifier used 3 hours daily, and a 15-Watt streaming box operating continuously (24 hours daily). Calculate daily energy, monthly energy, and monthly electricity cost at an illustrative utility rate of $0.16 per kWh."
        steps={[
          {
            stepNumber: 1,
            title: "Calculate Television Daily & Monthly Energy",
            calculation: "Daily Wh = 100W × 5h = 500 Wh (0.50 kWh/day) | Monthly = 0.50 × 30 = 15.0 kWh",
            explanation: "Multiply television rated power by daily viewing hours, then multiply by 30 days.",
          },
          {
            stepNumber: 2,
            title: "Calculate Audio Amplifier Energy",
            calculation: "Daily Wh = 150W × 3h = 450 Wh (0.45 kWh/day) | Monthly = 0.45 × 30 = 13.5 kWh",
            explanation: "Multiply amplifier power by daily operating hours to find daily and monthly kilowatt-hours.",
          },
          {
            stepNumber: 3,
            title: "Calculate Streaming Device Continuous Energy",
            calculation: "Daily Wh = 15W × 24h = 360 Wh (0.36 kWh/day) | Monthly = 0.36 × 30 = 10.8 kWh",
            explanation: "Low-wattage devices operating 24 hours continuously accumulate significant energy over a monthly cycle.",
          },
          {
            stepNumber: 4,
            title: "Sum Total Consumption and Compute Monthly Cost",
            calculation: "Total Monthly kWh = 15.0 + 13.5 + 10.8 = 39.3 kWh | Cost = 39.3 × $0.16 = $6.29",
            explanation: "Summing all appliances provides total energy demand and the estimated electric utility line item.",
          },
        ]}
        conclusion="The complete entertainment setup consumes 1,310 Watt-hours (1.31 kWh) per day, resulting in 39.3 kWh per month. At $0.16 per kWh, running this entertainment setup accounts for approximately $6.29 on the monthly electric bill."
      />

      {/* Assumptions Section */}
      <AssumptionsSection
        title="Calculation Assumptions & Engineering Limitations"
        description="Standard energy accounting provides dependable preliminary planning figures. Real-world utility billing and appliance consumption involve the following operational factors:"
        assumptions={[
          {
            parameter: "Standardized Monthly Planning Period",
            defaultVal: "30 Days",
            realisticRange: "28 to 31 Days",
            impact: "Utility billing cycles vary from 28 to 33 calendar days. Calculations use 30 days as a standard reference month.",
          },
          {
            parameter: "Appliance Nameplate vs Actual Draw",
            defaultVal: "Nameplate Rating",
            realisticRange: "50% to 100% of Nameplate",
            impact: "Nameplate labels indicate maximum rated power draw under full design load. Real running power is typically lower unless under peak stress.",
          },
          {
            parameter: "Thermostatic Compressor Duty Cycle",
            defaultVal: "30% to 50%",
            realisticRange: "15% to 90%",
            impact: "Refrigerators, freezers, and air conditioners cycle intermittently. Duty cycle varies with ambient temperature, insulation, and door openings.",
          },
          {
            parameter: "Electric Utility Energy Charge",
            defaultVal: "$0.16 / kWh",
            realisticRange: "$0.10 to $0.45 / kWh",
            impact: "Calculations reflect volumetric energy consumption charges. Actual utility bills include fixed base connection fees, demand charges, and local taxes.",
          },
        ]}
      />

      {/* Frequently Asked Questions */}
      <FaqSection faqs={ELECTRICITY_USE_FAQS} />

      {/* Safety & Compliance Disclaimer */}
      <DisclaimerSection
        title="Electrical Planning & Sizing Disclaimer"
        points={[
          "This calculator estimates electrical energy consumption (Watt-hours and kilowatt-hours) for preliminary planning, budgeting, and energy conservation purposes.",
          "Energy consumption calculations (kWh) do not size electrical conductors, circuit breakers, or service entrance equipment. Conductor wire gauge and overcurrent protection must be sized based on peak continuous current under the National Electrical Code (NEC Article 210 and 215).",
          "Actual utility bills may differ due to tiered rate brackets, time-of-use (TOU) peak pricing schedules, fuel adjustments, and fixed customer distribution fees.",
          "For physical electrical wiring, circuit additions, panel upgrades, or solar battery storage sizing, always consult a licensed electrician or qualified professional engineer.",
        ]}
      />

      {/* Related Power & Energy Tools */}
      <RelatedCalculators
        calculators={[
          {
            title: "Watts to Amps Electrical Calculator",
            description: "Convert electrical power (Watts) to circuit current (Amps) across DC, single-phase 120V/240V, and 3-phase AC systems.",
            href: "/watts-to-amps-calculator",
            category: "Electrical Circuits",
          },
          {
            title: "Amps to Watts Electrical Calculator",
            description: "Convert circuit current in Amperes to real electrical power (Watts) and apparent power (Volt-Amperes).",
            href: "/amps-to-watts-calculator",
            category: "Electrical Circuits",
          },
          {
            title: "Battery Capacity & Sizing Calculator",
            description: "Calculate required battery capacity in Amp-hours and Watt-hours to support your daily appliance energy loads.",
            href: "/battery-capacity-calculator",
            category: "UPS & Battery",
          },
          {
            title: "Solar System Size Calculator",
            description: "Estimate how many solar panels you need based on your calculated monthly kilowatt-hour electricity consumption.",
            href: "/solar-system-size-calculator",
            category: "Solar PV",
          },
          {
            title: "Generator Size Calculator",
            description: "Size whole-house standby and portable inverter generators using running watts and motor starting surge deltas.",
            href: "/generator-size-calculator",
            category: "Generators",
          },
          {
            title: "How to Calculate Electricity Usage (Guide)",
            description: "Read our comprehensive tutorial on appliance audits, phantom standby loads, and utility bill breakdown.",
            href: "/how-to-calculate-electricity-usage",
            category: "Sizing Guide",
          },
        ]}
      />
    </CalculatorShell>
  );
};
