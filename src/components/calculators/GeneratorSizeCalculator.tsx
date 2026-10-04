"use client";

import React, { useState, useMemo, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Zap,
  RotateCcw,
  Plus,
  Trash2,
  Search,
  AlertTriangle,
  ShieldAlert,
  Info,
  CheckCircle2,
  ArrowRight,
  Flame,
  Compass,
  ShoppingBag,
  ExternalLink,
  Copy,
  Check,
  ClipboardList,
} from "lucide-react";
import { CalculatorShell } from "./CalculatorShell";
import { FormulaSection } from "./FormulaSection";
import { WorkedExampleSection } from "./WorkedExampleSection";
import { AssumptionsSection } from "./AssumptionsSection";
import { DisclaimerSection } from "./DisclaimerSection";
import { FaqSection } from "./FaqSection";
import { RelatedCalculators } from "./RelatedCalculators";
import { getAmazonSearchUrl, AMAZON_LINK_REL } from "@/config/affiliate";
import {
  calculateGeneratorSize,
  getEssentialOutagePreset,
  getGeneratorScenario,
  formatGeneratorSummaryForClipboard,
  DEFAULT_APPLIANCES,
  GENERATOR_PRESETS,
  APPLIANCE_CATEGORIES,
  SelectedAppliance,
  ApplianceCategory,
} from "@/lib/calculators/generator-size";

const ScenarioUrlSync: React.FC<{
  onScenarioLoad: (appliances: SelectedAppliance[], presetId: string) => void;
}> = ({ onScenarioLoad }) => {
  const searchParams = useSearchParams();
  const scenarioParam = searchParams.get("scenario");

  useEffect(() => {
    if (scenarioParam) {
      const scenario = getGeneratorScenario(scenarioParam);
      if (scenario) {
        onScenarioLoad(scenario.appliances, scenario.id);
      }
    }
  }, [scenarioParam, onScenarioLoad]);

  return null;
};

export const GeneratorSizeCalculator: React.FC = () => {
  // State: selected appliances initialized deterministically with the "Essential Outage" preset for SSR
  const [selectedAppliances, setSelectedAppliances] = useState<SelectedAppliance[]>(
    () => getEssentialOutagePreset()
  );

  // State: Active preset tracker for UX feedback
  const [activePresetId, setActivePresetId] = useState<string | null>(
    "essential_outage"
  );

  const handleScenarioLoad = useCallback(
    (appliances: SelectedAppliance[], presetId: string) => {
      setSelectedAppliances(appliances);
      setActivePresetId(presetId);
    },
    []
  );

  // State: Copy summary feedback
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  // State: Search and category filters for available appliances library
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ApplianceCategory | "all">("all");

  // State: Custom appliance form
  const [customName, setCustomName] = useState("");
  const [customRunning, setCustomRunning] = useState<string>("");
  const [customStarting, setCustomStarting] = useState<string>("");
  const [customNoSurge, setCustomNoSurge] = useState(false);
  const [customError, setCustomError] = useState<string | null>(null);

  // Power factor selection (default 0.80 illustrative assumption)
  const [powerFactor, setPowerFactor] = useState<number>(0.8);

  // Filtered available appliances
  const filteredAvailableAppliances = useMemo(() => {
    return DEFAULT_APPLIANCES.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.notes?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Main Calculation Execution
  const calculation = useMemo(() => {
    return calculateGeneratorSize({
      appliances: selectedAppliances,
      powerFactor,
    });
  }, [selectedAppliances, powerFactor]);

  // Preset Handlers
  const handleApplyPreset = (presetId: string) => {
    setActivePresetId(presetId);
    const preset = GENERATOR_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    const newSelected: SelectedAppliance[] = [];
    for (const item of preset.items) {
      const def = DEFAULT_APPLIANCES.find((d) => d.id === item.id);
      if (def) {
        newSelected.push({
          id: `${def.id}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          name: def.name,
          category: def.category,
          quantity: item.quantity,
          runningWatts: def.defaultRunningWatts,
          startingWatts: def.defaultStartingWatts,
          isCustom: false,
        });
      }
    }

    setSelectedAppliances(newSelected);
  };

  const handleClearAll = () => {
    setSelectedAppliances([]);
    setActivePresetId(null);
  };

  const handleResetDefaults = () => {
    setSelectedAppliances(getEssentialOutagePreset());
    setActivePresetId("essential_outage");
    setSearchQuery("");
    setSelectedCategory("all");
    setCustomName("");
    setCustomRunning("");
    setCustomStarting("");
    setCustomNoSurge(false);
    setCustomError(null);
  };

  // Copy Summary Handler for Contractor / Electrician
  const handleCopySummary = useCallback(async () => {
    const summaryText = formatGeneratorSummaryForClipboard(
      calculation,
      selectedAppliances
    );
    let success = false;

    if (typeof window !== "undefined") {
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(summaryText);
          success = true;
        } catch {
          // Fall back to execCommand
        }
      }

      if (!success) {
        try {
          const textArea = document.createElement("textarea");
          textArea.value = summaryText;
          textArea.style.position = "fixed";
          textArea.style.left = "-999999px";
          textArea.style.top = "-999999px";
          textArea.setAttribute("aria-hidden", "true");
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          success = document.execCommand("copy");
          document.body.removeChild(textArea);
        } catch {
          success = false;
        }
      }
    }

    if (success) {
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 2500);
    } else {
      setCopyState("error");
      setTimeout(() => setCopyState("idle"), 3000);
    }
  }, [calculation, selectedAppliances]);

  // Appliance List Item Handlers
  const handleAddFromLibrary = (defId: string) => {
    const def = DEFAULT_APPLIANCES.find((d) => d.id === defId);
    if (!def) return;

    setActivePresetId(null); // Customized
    // Check if item already exists in selected list, increment qty
    const existingIndex = selectedAppliances.findIndex(
      (item) => !item.isCustom && item.name === def.name
    );

    if (existingIndex >= 0) {
      const updated = [...selectedAppliances];
      updated[existingIndex].quantity += 1;
      setSelectedAppliances(updated);
    } else {
      setSelectedAppliances([
        ...selectedAppliances,
        {
          id: `${def.id}_${Date.now()}`,
          name: def.name,
          category: def.category,
          quantity: 1,
          runningWatts: def.defaultRunningWatts,
          startingWatts: def.defaultStartingWatts,
          isCustom: false,
        },
      ]);
    }
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setActivePresetId(null);
    setSelectedAppliances((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = Math.max(0, item.quantity + delta);
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleUpdateRunningWatts = (id: string, val: string) => {
    setActivePresetId(null);
    const num = Math.max(0, Number(val) || 0);
    setSelectedAppliances((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStart = Math.max(item.startingWatts, num);
          return { ...item, runningWatts: num, startingWatts: newStart };
        }
        return item;
      })
    );
  };

  const handleUpdateStartingWatts = (id: string, val: string) => {
    setActivePresetId(null);
    const num = Math.max(0, Number(val) || 0);
    setSelectedAppliances((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, startingWatts: num };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id: string) => {
    setActivePresetId(null);
    setSelectedAppliances((prev) => prev.filter((item) => item.id !== id));
  };

  // Custom Appliance Handler
  const handleAddCustomAppliance = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomError(null);

    if (!customName.trim()) {
      setCustomError("Please enter an appliance name.");
      return;
    }

    const runNum = Number(customRunning);
    if (isNaN(runNum) || runNum <= 0) {
      setCustomError("Running watts must be greater than 0.");
      return;
    }

    let startNum = runNum;
    if (!customNoSurge) {
      startNum = Number(customStarting);
      if (isNaN(startNum) || startNum < runNum) {
        setCustomError(
          "Starting watts must be greater than or equal to running watts (or check 'No Motor Surge / Unknown')."
        );
        return;
      }
    }

    const newItem: SelectedAppliance = {
      id: `custom_${Date.now()}`,
      name: customName.trim(),
      category: "other",
      quantity: 1,
      runningWatts: runNum,
      startingWatts: startNum,
      isCustom: true,
    };

    setSelectedAppliances((prev) => [...prev, newItem]);
    setActivePresetId(null);
    setCustomName("");
    setCustomRunning("");
    setCustomStarting("");
    setCustomNoSurge(false);
  };

  // Input Controls Node
  const inputSectionContent = (
    <div className="space-y-8">
      {/* Model Limitation Notice */}
      <div className="rounded-xl border border-amber-300 bg-amber-50/80 p-4 text-xs md:text-sm text-amber-900 flex items-start gap-3 shadow-xs">
        <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-amber-950">Important Planning Model Limitation:</p>
          <p className="leading-relaxed">
            This practical planning model assumes that only one significant motor-driven load starts at a time. If multiple large motors can start simultaneously, generator sizing may require a more detailed manufacturer or engineering analysis.
          </p>
        </div>
      </div>

      {/* Quick Presets & Clear All Controls */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Quick Scenario Presets
            </p>
            <p className="text-xs text-slate-600 mt-0.5">
              Select an example outage scenario or build your load list from scratch.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClearAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {GENERATOR_PRESETS.map((p) => {
            const isActive = activePresetId === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handleApplyPreset(p.id)}
                className={`text-left p-3 rounded-xl border transition flex flex-col justify-between ${
                  isActive
                    ? "border-blue-600 bg-blue-50/80 text-blue-950 ring-2 ring-blue-500/20 shadow-xs"
                    : "border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-white text-slate-800"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs">{p.name}</span>
                    {isActive && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-blue-600 text-white rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    {p.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {activePresetId === "essential_outage" && (
          <div className="text-[11px] text-blue-800 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span>
              <strong>Example Scenario (Editable):</strong> Pre-loaded with common essential home circuits. Adjust quantities below or add custom loads.
            </span>
          </div>
        )}

        {activePresetId === "winter-essentials" && (
          <div className="text-[11px] text-indigo-950 bg-indigo-50/90 border border-indigo-200 rounded-xl px-3.5 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
              <span>
                <strong>Loaded Storm Scenario:</strong> Winter Storm Essentials (5.1 kW Outage Scenario). Edit wattages or quantities below to model your home.
              </span>
            </div>
            <button
              type="button"
              onClick={handleResetDefaults}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold underline shrink-0 text-left sm:text-right"
            >
              Reset to Defaults
            </button>
          </div>
        )}

        {activePresetId === "refrigerator-outage" && (
          <div className="text-[11px] text-blue-950 bg-blue-50/90 border border-blue-200 rounded-xl px-3.5 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>
                <strong>Loaded Refrigerator Scenario:</strong> Kitchen Refrigerator Outage Plan (from Sizing Guide). Edit wattages or quantities below to model your home.
              </span>
            </div>
            <button
              type="button"
              onClick={handleResetDefaults}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold underline shrink-0 text-left sm:text-right"
            >
              Reset to Defaults
            </button>
          </div>
        )}
      </div>

      {/* Selected Loads Section */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Selected Appliances &amp; Equipment ({selectedAppliances.length})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Default wattages are typical estimates. Check equipment nameplates and edit values as needed.
          </p>
        </div>

        {selectedAppliances.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl space-y-2">
            <Zap className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-sm font-semibold text-slate-700">No appliances selected</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Select appliances from the library below or choose a preset scenario to compute your generator size.
            </p>
          </div>
        ) : (
          <>
            {/* Mobile (<640px) Card/Row Layout: No Horizontal Scrolling Required */}
            <div className="sm:hidden space-y-2.5">
              {selectedAppliances.map((item) => {
                const isDriver = calculation.surgeDriverName === item.name;
                const subtotalRun = item.quantity * item.runningWatts;
                const surgeDelta = Math.max(0, item.startingWatts - item.runningWatts);

                return (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-xl border space-y-3 ${
                      isDriver
                        ? "border-amber-300 bg-amber-50/40"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="font-semibold text-xs text-slate-900 flex items-center gap-1.5 flex-wrap">
                          <span>{item.name}</span>
                          {item.isCustom && (
                            <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full font-medium">
                              Custom
                            </span>
                          )}
                          {isDriver && (
                            <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full font-bold inline-flex items-center gap-0.5">
                              <Flame className="w-2.5 h-2.5 text-amber-600" />
                              Surge Driver
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500">
                          <span className="capitalize">{item.category.replace("_", " ")}</span>
                          <span>•</span>
                          <span>
                            {surgeDelta > 0
                              ? `+${surgeDelta.toLocaleString()}W startup surge`
                              : "No startup surge"}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg border border-slate-200 bg-slate-50 transition shrink-0"
                        title={`Remove ${item.name}`}
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-100">
                      {/* Quantity */}
                      <div>
                        <span className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">
                          Qty
                        </span>
                        <div className="flex items-center justify-between border border-slate-300 rounded-lg px-1.5 py-1 bg-white">
                          <button
                            type="button"
                            onClick={() => handleUpdateQuantity(item.id, -1)}
                            className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs"
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            -
                          </button>
                          <span className="font-bold text-xs text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleUpdateQuantity(item.id, 1)}
                            className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs"
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Running Watts */}
                      <div>
                        <label
                          htmlFor={`mobile-running-watts-${item.id}`}
                          className="block text-[10px] font-semibold text-slate-500 uppercase mb-1"
                        >
                          Running (W)
                        </label>
                        <input
                          type="number"
                          min="0"
                          id={`mobile-running-watts-${item.id}`}
                          name={`mobile-running-watts-${item.id}`}
                          aria-label={`Running watts for ${item.name}`}
                          value={item.runningWatts}
                          onChange={(e) =>
                            handleUpdateRunningWatts(item.id, e.target.value)
                          }
                          className="w-full text-right font-medium text-xs px-2 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                        />
                      </div>

                      {/* Starting Watts */}
                      <div>
                        <label
                          htmlFor={`mobile-starting-watts-${item.id}`}
                          className="block text-[10px] font-semibold text-slate-500 uppercase mb-1"
                        >
                          Starting (W)
                        </label>
                        <input
                          type="number"
                          min={item.runningWatts}
                          id={`mobile-starting-watts-${item.id}`}
                          name={`mobile-starting-watts-${item.id}`}
                          aria-label={`Starting watts for ${item.name}`}
                          value={item.startingWatts}
                          onChange={(e) =>
                            handleUpdateStartingWatts(item.id, e.target.value)
                          }
                          className="w-full text-right font-medium text-xs px-2 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 border-t border-slate-100">
                      <span>Running Subtotal ({item.quantity}×):</span>
                      <span className="font-bold text-slate-900">
                        {subtotalRun.toLocaleString()} W
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tablet & Desktop (>=640px) Table Layout */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
                    <th className="py-2.5 px-2">Appliance</th>
                    <th className="py-2.5 px-2 text-center w-20">Qty</th>
                    <th className="py-2.5 px-2 text-right w-24">Running (W)</th>
                    <th className="py-2.5 px-2 text-right w-24">Starting (W)</th>
                    <th className="py-2.5 px-2 text-right w-24">Subtotal</th>
                    <th className="py-2.5 px-1 text-center w-8"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedAppliances.map((item) => {
                    const isDriver = calculation.surgeDriverName === item.name;
                    const subtotalRun = item.quantity * item.runningWatts;

                    return (
                      <tr
                        key={item.id}
                        className={`hover:bg-slate-50/70 transition ${
                          isDriver ? "bg-amber-50/50" : ""
                        }`}
                      >
                        <td className="py-2.5 px-2">
                          <div className="font-semibold text-slate-900 flex items-center gap-1.5 flex-wrap">
                            <span>{item.name}</span>
                            {item.isCustom && (
                              <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full font-medium">
                                Custom
                              </span>
                            )}
                            {isDriver && (
                              <span
                                className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full font-bold inline-flex items-center gap-0.5"
                                title="Largest additional startup surge driver"
                              >
                                <Flame className="w-2.5 h-2.5 text-amber-600" />
                                Surge Driver
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-500 capitalize">
                            {item.category.replace("_", " ")}
                          </span>
                        </td>

                        {/* Quantity Stepper */}
                        <td className="py-2.5 px-2">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleUpdateQuantity(item.id, -1)}
                              className="w-5 h-5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center transition text-xs"
                              title={`Decrease quantity of ${item.name}`}
                              aria-label={`Decrease quantity of ${item.name}`}
                            >
                              -
                            </button>
                            <span className="w-5 text-center font-bold text-slate-800">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleUpdateQuantity(item.id, 1)}
                              className="w-5 h-5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center transition text-xs"
                              title={`Increase quantity of ${item.name}`}
                              aria-label={`Increase quantity of ${item.name}`}
                            >
                              +
                            </button>
                          </div>
                        </td>

                        {/* Editable Running Watts */}
                        <td className="py-2.5 px-2 text-right">
                          <input
                            type="number"
                            min="0"
                            id={`running-watts-${item.id}`}
                            name={`running-watts-${item.id}`}
                            aria-label={`Running watts for ${item.name}`}
                            value={item.runningWatts}
                            onChange={(e) =>
                              handleUpdateRunningWatts(item.id, e.target.value)
                            }
                            className="w-20 text-right font-medium text-xs px-1.5 py-1 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                            title="Edit running wattage estimate"
                          />
                        </td>

                        {/* Editable Starting Watts */}
                        <td className="py-2.5 px-2 text-right">
                          <input
                            type="number"
                            min={item.runningWatts}
                            id={`starting-watts-${item.id}`}
                            name={`starting-watts-${item.id}`}
                            aria-label={`Starting watts for ${item.name}`}
                            value={item.startingWatts}
                            onChange={(e) =>
                              handleUpdateStartingWatts(item.id, e.target.value)
                            }
                            className="w-20 text-right font-medium text-xs px-1.5 py-1 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                            title="Edit starting wattage estimate"
                          />
                        </td>

                        {/* Subtotal Running */}
                        <td className="py-2.5 px-2 text-right font-bold text-slate-900">
                          {subtotalRun.toLocaleString()} W
                        </td>

                        {/* Remove Action */}
                        <td className="py-2.5 px-1 text-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition"
                            title={`Remove ${item.name}`}
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Appliance Library Picker & Search */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Add Appliances from Library
            </h2>
            <p className="text-xs text-slate-500">
              Click any appliance to add it to your calculation table.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              id="library-search"
              name="librarySearch"
              aria-label="Search appliance library"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search fridge, pump, saw..."
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition ${
              selectedCategory === "all"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
          >
            All
          </button>
          {APPLIANCE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition ${
                selectedCategory === cat.id
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid of Available Appliances */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
          {filteredAvailableAppliances.map((def) => {
            const delta = Math.max(0, def.defaultStartingWatts - def.defaultRunningWatts);

            return (
              <div
                key={def.id}
                className="p-2.5 border border-slate-200 rounded-xl hover:border-blue-400 bg-slate-50/50 hover:bg-white transition flex flex-col justify-between"
              >
                <div className="mb-1.5">
                  <p className="font-bold text-xs text-slate-900 leading-snug">
                    {def.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-600">
                    <span>{def.defaultRunningWatts}W run</span>
                    {delta > 0 ? (
                      <span className="text-amber-700 font-semibold">
                        +{delta}W surge
                      </span>
                    ) : (
                      <span className="text-slate-400">no surge</span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleAddFromLibrary(def.id)}
                  className="w-full mt-1 inline-flex items-center justify-center gap-1 px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-lg transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to List</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Appliance Entry */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Add Custom Equipment / Unlisted Appliance
          </h2>
          <p className="text-xs text-slate-500">
            Enter specific nameplate wattages for appliances not listed in the library. We do not apply arbitrary multipliers.
          </p>
        </div>

        <form onSubmit={handleAddCustomAppliance} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div>
              <label htmlFor="custom-appliance-name" className="block text-xs font-semibold text-slate-700 mb-1">
                Appliance Name
              </label>
              <input
                type="text"
                id="custom-appliance-name"
                name="customName"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g. Dehumidifier, Welder"
                className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label htmlFor="custom-running-watts" className="block text-xs font-semibold text-slate-700 mb-1">
                Running Watts (W)
              </label>
              <input
                type="number"
                min="0"
                id="custom-running-watts"
                name="customRunning"
                value={customRunning}
                onChange={(e) => setCustomRunning(e.target.value)}
                placeholder="e.g. 700"
                className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label htmlFor="custom-starting-watts" className="block text-xs font-semibold text-slate-700 mb-1">
                Starting / Surge Watts (W)
              </label>
              <input
                type="number"
                min={customRunning || "0"}
                id="custom-starting-watts"
                name="customStarting"
                disabled={customNoSurge}
                value={customNoSurge ? customRunning : customStarting}
                onChange={(e) => setCustomStarting(e.target.value)}
                placeholder="e.g. 1500"
                className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden disabled:bg-slate-100 disabled:text-slate-400"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <label htmlFor="custom-no-surge" className="inline-flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                id="custom-no-surge"
                name="customNoSurge"
                checked={customNoSurge}
                onChange={(e) => setCustomNoSurge(e.target.checked)}
                className="rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>No motor surge / unknown (sets starting = running watts)</span>
            </label>

            <button
              type="submit"
              className="px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Load</span>
            </button>
          </div>

          {customError && (
            <p className="text-xs text-rose-600 font-semibold bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-lg">
              {customError}
            </p>
          )}
        </form>
      </div>

      {/* Informational Methodology Breakdown Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-400" />
          <h2 className="text-sm md:text-base font-bold">
            How We Calculated Your Generator Size
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80 space-y-0.5">
            <span className="text-slate-400 text-[10px] block">Step 1: Running Load</span>
            <p className="text-base font-black text-white">
              {calculation.totalRunningWatts.toLocaleString()} W
            </p>
            <p className="text-[10px] text-slate-400">
              Sum of all operational running watts.
            </p>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80 space-y-0.5">
            <span className="text-slate-400 text-[10px] block">Step 2: Largest Surge</span>
            <p className="text-base font-black text-amber-400">
              +{calculation.largestAdditionalStartingWatts.toLocaleString()} W
            </p>
            <p className="text-[10px] text-slate-400 leading-snug">
              {calculation.surgeDriverName
                ? `Driver: ${calculation.surgeDriverName}`
                : "No motor surge"}
            </p>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80 space-y-0.5">
            <span className="text-slate-400 text-[10px] block">Step 3: Peak Demand</span>
            <p className="text-base font-black text-white">
              {calculation.peakStartingDemand.toLocaleString()} W
            </p>
            <p className="text-[10px] text-slate-400">
              Running + single largest surge.
            </p>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-xl border border-blue-500/50 bg-blue-950/20 space-y-0.5">
            <span className="text-blue-300 text-[10px] block">
              Step 4: Planning (+25%)
            </span>
            <p className="text-base font-black text-blue-400">
              {calculation.planningCapacityWatts.toLocaleString(undefined, {
                maximumFractionDigits: 1,
              })}{" "}
              W
            </p>
            <p className="text-[10px] text-blue-200">
              Peak demand × 1.25 headroom factor.
            </p>
          </div>
        </div>

        <p className="text-[11px] text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
          <strong>Engineering Notice:</strong> Sizing with the 25% planning headroom factor prevents operating your generator at 100% continuous output, ensuring reserve capacity for engine wear, altitude derating, and voltage stability during motor inrush events.
        </p>
      </div>
    </div>
  );

  // Result Section Node
  const resultSectionContent = (
    <div className="space-y-6">
      {/* Primary Capacity Card */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-6 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-blue-500/40 text-blue-100 border border-blue-400/40">
            <Zap className="w-3.5 h-3.5 text-blue-200" />
            <span>Recommended Capacity</span>
          </span>
          <span className="text-xs text-blue-200">1.25× Planning Margin</span>
        </div>

        <div>
          <p className="text-3xl sm:text-4xl font-black tracking-tight">
            {Math.round(calculation.planningCapacityWatts).toLocaleString()} Watts
          </p>
          <p className="text-sm font-medium text-blue-100 mt-1">
            ({calculation.planningKw.toFixed(2)} kW Planning Capacity)
          </p>
        </div>

        <div className="text-xs text-blue-100/90 leading-relaxed pt-2 border-t border-blue-500/40">
          Sized to support a <strong>{calculation.totalRunningWatts.toLocaleString()}W</strong> running load and absorb a{" "}
          <strong>{calculation.largestAdditionalStartingWatts.toLocaleString()}W</strong> motor surge with 25% planning headroom.
        </div>
      </div>

      {/* Secondary Electrical Metrics Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Electrical Sizing Metrics
        </h3>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 block text-[11px]">Total Running Load</span>
            <p className="text-base font-bold text-slate-900 mt-0.5">
              {calculation.totalRunningWatts.toLocaleString()} W
            </p>
            <span className="text-[10px] text-slate-500 block">
              {(calculation.totalRunningWatts / 1000).toFixed(2)} kW continuous
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 block text-[11px]">Peak Starting Demand</span>
            <p className="text-base font-bold text-slate-900 mt-0.5">
              {calculation.peakStartingDemand.toLocaleString()} W
            </p>
            <span className="text-[10px] text-slate-500 block">
              {(calculation.peakStartingDemand / 1000).toFixed(2)} kW momentary
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 col-span-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-slate-500 text-[11px]">Apparent Power (kVA)</span>
              <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-semibold">
                PF = {calculation.powerFactorUsed.toFixed(2)} (Assumption)
              </span>
            </div>
            <p className="text-base font-bold text-slate-900">
              {calculation.planningKva.toFixed(2)} kVA
            </p>
            <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1 pt-1 border-t border-slate-200">
              <span>Running: {calculation.runningKva.toFixed(2)} kVA</span>
              <span>Peak: {calculation.peakKva.toFixed(2)} kVA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contractor & Electrician Clipboard Export Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-blue-600 shrink-0" />
            <h3 className="font-bold text-slate-900 text-sm">
              Contractor &amp; Electrician Summary
            </h3>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">1-Click Export</span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Copy this summary to share your calculated load with an electrician or contractor for equipment selection and transfer switch planning.
        </p>

        <button
          type="button"
          onClick={handleCopySummary}
          className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition duration-150 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            copyState === "copied"
              ? "bg-emerald-600 text-white"
              : copyState === "error"
              ? "bg-rose-600 text-white"
              : "bg-slate-900 text-white hover:bg-slate-800 cursor-pointer"
          }`}
          aria-label="Copy load calculation summary to clipboard"
        >
          {copyState === "copied" ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>Copied to Clipboard!</span>
            </>
          ) : copyState === "error" ? (
            <>
              <AlertTriangle className="w-4 h-4 text-white" />
              <span>Could Not Copy Automatically</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-slate-300" />
              <span>Copy for Electrician / Contractor</span>
            </>
          )}
        </button>

        <p className="text-[11px] text-slate-400 leading-normal text-center">
          Includes continuous load, surge drivers, voltage notes, and safety disclaimers.
        </p>
      </div>

      {/* Generator Specification Matching Guide */}
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 text-xs text-emerald-950 space-y-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <h4 className="font-bold text-emerald-900 text-sm">
            How to Match Generator Spec Sheets
          </h4>
        </div>

        <div className="space-y-2 leading-relaxed">
          <p>
            When shopping for portable or standby generators, compare your calculated figures against manufacturer nameplates:
          </p>
          <ul className="space-y-1.5 list-disc list-inside text-emerald-900 font-medium">
            <li>
              <strong>Rated (Running) Watts:</strong> Must meet or exceed{" "}
              <strong>{Math.round(calculation.planningCapacityWatts).toLocaleString()} W</strong> to operate continuously within safe engine duty limits.
            </li>
            <li>
              <strong>Surge (Starting) Watts:</strong> Must meet or exceed{" "}
              <strong>{calculation.peakStartingDemand.toLocaleString()} W</strong> to start your largest motor without stalling the alternator.
            </li>
          </ul>
          <p className="text-[11px] text-emerald-800 pt-1">
            Always verify actual equipment specifications before purchasing or renting.
          </p>
        </div>
      </div>

      {/* Contextual Amazon Hardware Section (Secondary) */}
      <div className="bg-slate-50/60 rounded-2xl border border-slate-200/80 p-4 sm:p-5 space-y-3 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
            <ShoppingBag className="w-3.5 h-3.5 text-slate-500" />
            <span>Generator Hardware Reference</span>
          </div>
          <span className="text-[10px] text-slate-400">Amazon Associate</span>
        </div>

        <p className="text-slate-500 leading-normal">
          Standard equipment categories for portable backup power and safe transfer connection:
        </p>

        <div className="space-y-2.5">
          <a
            href={getAmazonSearchUrl("dual fuel inverter generator 3500w 4500w")}
            target="_blank"
            rel={AMAZON_LINK_REL}
            className="group flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:bg-blue-50/30 transition text-xs font-medium text-slate-800"
          >
            <div>
              <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition">
                Dual-Fuel Inverter Generators (3,500W to 4,500W)
              </div>
              <div className="text-[11px] text-slate-500">
                Clean power (&lt;3% THD) for electronics; operates on gasoline or propane
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 shrink-0 ml-2" />
          </a>

          <a
            href={getAmazonSearchUrl("30 amp 50 amp generator power inlet box nema 3r")}
            target="_blank"
            rel={AMAZON_LINK_REL}
            className="group flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:bg-blue-50/30 transition text-xs font-medium text-slate-800"
          >
            <div>
              <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition">
                Outdoor Power Inlet Boxes (30A / 50A)
              </div>
              <div className="text-[11px] text-slate-500">
                NEMA 3R weatherproof exterior connection for transfer cords
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 shrink-0 ml-2" />
          </a>

          <a
            href={getAmazonSearchUrl("manual generator transfer switch kit 30 amp")}
            target="_blank"
            rel={AMAZON_LINK_REL}
            className="group flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:bg-blue-50/30 transition text-xs font-medium text-slate-800"
          >
            <div>
              <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition">
                Manual Transfer Switch Kits
              </div>
              <div className="text-[11px] text-slate-500">
                Break-before-make subpanels to isolate generator power from utility lines
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 shrink-0 ml-2" />
          </a>

          <a
            href={getAmazonSearchUrl("10 awg l14-30p generator cord 4 prong")}
            target="_blank"
            rel={AMAZON_LINK_REL}
            className="group flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:bg-blue-50/30 transition text-xs font-medium text-slate-800"
          >
            <div>
              <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition">
                4-Prong Generator Cords (L14-30P, 10 AWG)
              </div>
              <div className="text-[11px] text-slate-500">
                Heavy-duty copper extension cords for 120V/240V 30-Amp generator outlets
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 shrink-0 ml-2" />
          </a>
        </div>

        <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-200/70">
          As an Amazon Associate, CalcMyPower earns from qualifying purchases.
        </p>
      </div>
    </div>
  );

  return (
    <CalculatorShell
      title="Generator Size Calculator"
      description="Calculate what size generator you need for home emergency backup, RV camping, or jobsite tools. Accounts for continuous running load, motor startup surges, and planning headroom."
      badge="Electrical Sizing Tool"
      category="Generator Sizing"
      lastUpdated="September 2026"
      onReset={handleResetDefaults}
      inputSection={inputSectionContent}
      resultSection={resultSectionContent}
    >
      <div className="space-y-10">
        <Suspense fallback={null}>
          <ScenarioUrlSync onScenarioLoad={handleScenarioLoad} />
        </Suspense>
        {/* Contextual Guide Link / Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-xs sm:text-sm text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Info className="w-4 h-4 text-blue-600 shrink-0" />
            <p>
              Need help understanding running watts, starting surge, and sizing? Read our{" "}
              <Link
                href="/what-size-generator-do-i-need-for-my-house"
                className="font-bold text-blue-700 hover:text-blue-900 underline"
              >
                House Generator Guide
              </Link>
              {" "}or our dedicated{" "}
              <Link
                href="/what-size-generator-to-run-a-refrigerator"
                className="font-bold text-blue-700 hover:text-blue-900 underline"
              >
                Refrigerator Sizing Guide
              </Link>
              .
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/what-size-generator-to-run-a-refrigerator"
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800"
            >
              <span>Fridge Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Formula Section */}
        <FormulaSection
          title="The Four-Step Generator Sizing Methodology"
          formulaDisplay="W_planning = (W_running + ΔW_max) × 1.25"
          description="Generator planning capacity is calculated as total continuous running wattage plus the single largest motor startup surge delta, multiplied by the 25% CalcMyPower planning headroom factor."
          variables={[
            {
              symbol: "W_running",
              name: "Total Running Watts",
              unit: "Watts (W)",
              description:
                "Sum of continuous active power across all operational equipment (Σ Q_i × W_{r,i}).",
            },
            {
              symbol: "ΔW_max",
              name: "Largest Additional Starting Watts",
              unit: "Watts (W)",
              description:
                "The maximum surge delta among active loads: max(Starting Watts - Running Watts).",
            },
            {
              symbol: "W_peak",
              name: "Peak Starting Demand",
              unit: "Watts (W)",
              description:
                "The momentary electrical surge demand when the single largest motor cycles on: W_running + ΔW_max.",
            },
            {
              symbol: "1.25",
              name: "CalcMyPower Planning Headroom Factor",
              unit: "Multiplier",
              description:
                "A 25% safety margin ensuring the generator operates within ~80% of its rated capacity for engine protection.",
            },
          ]}
        />

        {/* Worked Example */}
        <WorkedExampleSection
          title="Worked Example: Mixed Residential Power Outage"
          scenario="A homeowner needs emergency backup power during a winter storm for a modern refrigerator (180W running / 1,200W starting), a 1/2 HP gas furnace blower (800W running / 2,300W starting), a 1/3 HP sump pump (800W running / 1,800W starting), Wi-Fi router (25W), and 4 rooms of LED lighting (160W)."
          steps={[
            {
              stepNumber: 1,
              title: "Sum Total Continuous Running Watts",
              calculation: "W_running = 180 + 800 + 800 + 25 + 160 = 1,965 Watts",
              explanation:
                "Continuous load represents the steady-state electrical power needed to keep all active appliances operating simultaneously.",
            },
            {
              stepNumber: 2,
              title: "Determine the Largest Single Motor Surge Delta",
              calculation:
                "Fridge delta = 1,200 - 180 = 1,020W; Sump delta = 1,800 - 800 = 1,000W; Furnace Blower delta = 2,300 - 800 = 1,500W. Max delta = 1,500 Watts (Furnace Blower).",
              explanation:
                "Under standard asynchronous operation, only one significant motor draws inrush current at any given instant. Sizing for all surges simultaneously would severely oversize the generator.",
            },
            {
              stepNumber: 3,
              title: "Compute Peak Starting Demand",
              calculation: "W_peak = 1,965 W + 1,500 W = 3,465 Watts",
              explanation:
                "This momentary peak represents the maximum electrical inrush event the generator alternator must support.",
            },
            {
              stepNumber: 4,
              title: "Apply the CalcMyPower Planning Headroom Factor",
              calculation: "W_planning = 3,465 W × 1.25 = 4,331.25 Watts (rounded to 4,331 W)",
              explanation:
                "The 25% planning margin ensures the generator does not operate at 100% capacity, providing fuel economy, engine protection, and transient reserve.",
            },
          ]}
          conclusion="Based on this 1,965W continuous load and 3,465W peak demand, a generator with at least 4,350W rated running watts and 3,500W surge watts provides comfortable, safe emergency backup capacity."
        />

        {/* Generator Technology Educational Comparison */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                Comparing Generator Technologies
              </h2>
              <p className="text-xs md:text-sm text-slate-500">
                Compare portable inverter, open-frame, dual-fuel, and standby generators by power quality (THD), noise level, portability, and fuel storage.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
                  <th className="py-2.5 px-3">Technology</th>
                  <th className="py-2.5 px-3">Power Quality (THD)</th>
                  <th className="py-2.5 px-3">Noise Level</th>
                  <th className="py-2.5 px-3">Portability</th>
                  <th className="py-2.5 px-3">Fuel Flexibility</th>
                  <th className="py-2.5 px-3">Typical Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition">
                  <td className="py-3 px-3 font-bold text-slate-900">
                    Portable Inverter
                  </td>
                  <td className="py-3 px-3 text-emerald-700 font-semibold">
                    Clean (&lt;3% THD)
                  </td>
                  <td className="py-3 px-3 text-slate-600">Quiet (50 to 65 dBA)</td>
                  <td className="py-3 px-3 text-slate-600">High (40 to 120 lbs)</td>
                  <td className="py-3 px-3 text-slate-600">Gasoline / Dual-Fuel</td>
                  <td className="py-3 px-3 text-slate-600">
                    Electronics, camping, RVs, essential home circuits
                  </td>
                </tr>

                <tr className="hover:bg-slate-50 transition">
                  <td className="py-3 px-3 font-bold text-slate-900">
                    Conventional Open-Frame
                  </td>
                  <td className="py-3 px-3 text-amber-700 font-semibold">
                    Distorted (10% to 25% THD)
                  </td>
                  <td className="py-3 px-3 text-slate-600">Loud (68 to 80+ dBA)</td>
                  <td className="py-3 px-3 text-slate-600">Moderate (Wheeled)</td>
                  <td className="py-3 px-3 text-slate-600">Gasoline</td>
                  <td className="py-3 px-3 text-slate-600">
                    Jobsite power tools, compressors, sump pumps
                  </td>
                </tr>

                <tr className="hover:bg-slate-50 transition">
                  <td className="py-3 px-3 font-bold text-slate-900">
                    Dual-Fuel / Tri-Fuel
                  </td>
                  <td className="py-3 px-3 text-slate-600">Varies by alternator</td>
                  <td className="py-3 px-3 text-slate-600">Moderate to loud</td>
                  <td className="py-3 px-3 text-slate-600">Moderate to heavy</td>
                  <td className="py-3 px-3 text-blue-700 font-semibold">
                    Gas, Propane (LPG), Natural Gas
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    Storm prep; propane stores indefinitely without carburetor clogging
                  </td>
                </tr>

                <tr className="hover:bg-slate-50 transition">
                  <td className="py-3 px-3 font-bold text-slate-900">
                    Home Standby (Stationary)
                  </td>
                  <td className="py-3 px-3 text-emerald-700 font-semibold">
                    Utility grade (&lt;5% THD)
                  </td>
                  <td className="py-3 px-3 text-slate-600">Baffled (60 to 70 dBA)</td>
                  <td className="py-3 px-3 text-slate-600">Permanent outdoor pad</td>
                  <td className="py-3 px-3 text-blue-700 font-semibold">
                    Piped Natural Gas / LP
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    Whole-house automatic backup via Automatic Transfer Switch
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Safety & Hazard Section */}
        <section className="bg-rose-50/70 border border-rose-200 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-100 text-rose-700 rounded-lg">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-rose-950">
                Critical Generator Safety &amp; Installation Rules
              </h2>
              <p className="text-xs md:text-sm text-rose-800">
                Portable generators produce lethal carbon monoxide gas and severe electrical hazards if misused.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs md:text-sm text-rose-900">
            {/* CO Hazard */}
            <div className="bg-white/80 p-5 rounded-xl border border-rose-200/80 space-y-2">
              <h3 className="font-bold text-rose-950 text-base flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Carbon Monoxide (CO) Poisoning (CDC &amp; CPSC)
              </h3>
              <p className="leading-relaxed">
                <strong>NEVER</strong> operate a generator indoors, in a garage, in a basement, shed, or crawlspace, even if doors and windows are left open.
              </p>
              <p className="leading-relaxed">
                Operate generators <strong>outdoors only, at least 20 feet away</strong> from all windows, doors, and fresh air intake vents, with the engine exhaust directed away from living spaces per current CDC and CPSC guidelines. Install working battery-powered CO alarms inside your home.
              </p>
            </div>

            {/* Backfeeding Hazard */}
            <div className="bg-white/80 p-5 rounded-xl border border-rose-200/80 space-y-2">
              <h3 className="font-bold text-rose-950 text-base flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Anti-Backfeeding &amp; Transfer Equipment
              </h3>
              <p className="leading-relaxed">
                <strong>NEVER</strong> connect a generator directly to a wall outlet or dryer plug. This illegal practice (&quot;backfeeding&quot;) energizes outdoor power lines, creating lethal electrocution hazards for utility lineworkers.
              </p>
              <p className="leading-relaxed">
                Use properly installed transfer equipment or an approved interlock arrangement where applicable to prevent unintended interconnection with utility power. Follow applicable NEC and local code requirements and use qualified electrical professionals for installation.
              </p>
            </div>
          </div>
        </section>

        {/* Assumptions Section */}
        <AssumptionsSection
          title="Calculation Assumptions & Engineering Planning Model"
          impactHeader="Effect on Generator Sizing"
          description="Transparent electrical assumptions used in this generator sizing calculator:"
          assumptions={[
            {
              parameter: "Motor Startup Sequencing",
              defaultVal: "Single Largest Surge",
              realisticRange: "1 to 2 motors simultaneously",
              impact:
                "Assumes only one major motor starts at any instant; simultaneous starts require larger commercial sizing.",
            },
            {
              parameter: "CalcMyPower Planning Headroom",
              defaultVal: "25% (1.25×)",
              realisticRange: "10% to 30%",
              impact:
                "Maintains engine operation near 80% rated continuous duty for thermal reserve and longevity.",
            },
            {
              parameter: "Apparent Power Factor (PF)",
              defaultVal: "0.80 Lagging",
              realisticRange: "0.80 (Standby) to 1.0 (Inverter)",
              impact:
                "Used for kVA apparent power estimates on standby and prime commercial generator sets.",
            },
            {
              parameter: "Appliance Wattage Defaults",
              defaultVal: "DOE / Energy Star Benchmarks",
              realisticRange: "Varies by manufacturer",
              impact:
                "Serves as editable planning estimates; nameplate ratings should always be confirmed.",
            },
          ]}
        />

        {/* Disclaimer Section */}
        <DisclaimerSection
          title="Generator Sizing & Safety Disclaimer"
          points={[
            "The generator capacity figures provided by this calculator are planning estimates for consumer guidance only.",
            "Electrical loads, motor inrush characteristics (Locked Rotor Amps), altitude deratings, and local electrical codes vary. Sizing estimates do not substitute for professional engineering analysis, manufacturer-specific sizing software, or licensed electrical contractor assessment.",
            "Always install equipment in compliance with applicable National Electrical Code (NEC) articles and local building codes.",
            "Never operate portable generators indoors, in garages, or near open windows due to lethal carbon monoxide hazards.",
          ]}
        />

        {/* FAQ Section */}
        <FaqSection
          faqs={[
            {
              question: "What size generator do I need to run a refrigerator and a freezer?",
              answer:
                "A modern Energy Star refrigerator runs on approximately 180 Watts but requires 1,200 Watts during compressor startup. A separate freezer requires about 180 to 400 Watts running and 1,200 to 1,600 Watts starting. Total continuous running load is about 360 to 580 Watts, with the largest single startup surge contributing roughly 1,200 Watts above running draw, yielding a peak demand of about 1,560 Watts. Under the CalcMyPower planning model with a 25% headroom factor, a 2,000 to 2,500 Watt inverter generator provides reliable operation.",
            },
            {
              question: "Can a 5,000-Watt generator run a whole house?",
              answer:
                "A 5,000W generator can easily power essential household circuits (refrigerator, sump pump, gas furnace blower, lights, Wi-Fi, television, and microwave) with planning capacity to spare. However, it cannot run large 240V central air conditioning compressors (3 to 5 tons) or electric water heaters simultaneously, which require large standby generators (14kW to 22kW).",
            },
            {
              question: "What is the difference between starting watts and running watts?",
              answer:
                "Running watts (rated watts) is the continuous power an appliance consumes while operating normally. Starting watts (surge watts) is the temporary extra power (up to 3 times running watts) needed for 1 to 3 seconds by motor-driven equipment (refrigerators, pumps, air conditioners) to overcome mechanical inertia during startup.",
            },
            {
              question: "How do I connect a generator to my house safely without backfeeding?",
              answer:
                "Use properly installed transfer equipment or an approved interlock arrangement where applicable to prevent unintended interconnection with utility power. Follow applicable NEC and local code requirements and use qualified electrical professionals for installation. Never attempt to 'backfeed' a generator through an ordinary wall outlet or dryer plug, which creates deadly electrocution hazards for utility lineworkers and can cause an electrical fire when utility power returns.",
            },
            {
              question: "What size generator is needed for a 30-amp RV?",
              answer:
                "A 30-amp RV service operates at 120 Volts, representing a maximum electrical capacity of 3,600 Watts (30A × 120V). Sizing a generator with 3,500W to 4,500W starting surge and at least 3,000W continuous capacity allows you to start and run a 13,500 or 15,000 BTU rooftop air conditioner while running the internal RV converter charger and residential electronics.",
            },
          ]}
        />

        {/* Related Calculators */}
        <RelatedCalculators
          calculators={[
            {
              title: "Generator Wattage Chart & Appliance Reference",
              description:
                "Look up running and starting surge watts for 35+ appliances with real-time outage demand estimation.",
              href: "/generator-wattage-chart",
              category: "Appliance Reference",
            },
            {
              title: "Generator Amperage Chart & Electrical Calculator",
              description:
                "Convert generator Watts to Amps at 120V and 240V split-phase with 80% continuous operating limits.",
              href: "/generator-amperage-chart-calculator",
              category: "Electrical Sizing",
            },
            {
              title: "What Size Generator Do I Need for My House?",
              description:
                "Step-by-step residential outage sizing guide for furnaces, sump pumps, well pumps, and central air conditioners.",
              href: "/what-size-generator-do-i-need-for-my-house",
              category: "Sizing Guide",
            },
            {
              title: "Continuous Power Generators Explained",
              description:
                "Understand ISO 8528 continuous ratings (COP vs PRP vs ESP), 1800 RPM engines, and wet stacking prevention.",
              href: "/continuous-power-generators",
              category: "Industrial Power",
            },
            {
              title: "UPS Battery Backup Run-Time Hours Calculator",
              description:
                "Estimate how long an uninterruptible power supply or battery bank will sustain electronics, Wi-Fi, or computers during an outage.",
              href: "/ups-battery-backup-calculator",
              category: "Battery Backup",
            },
            {
              title: "Watts to Amps Electrical Calculator",
              description:
                "Convert appliance nameplate Watts to Amperes across DC, 120V/240V single-phase, and balanced three-phase AC circuits.",
              href: "/watts-to-amps-calculator",
              category: "Electrical Sizing",
            },
          ]}
        />
      </div>
    </CalculatorShell>
  );
};
