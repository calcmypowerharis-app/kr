"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  APPLIANCE_WATTAGE_DATA,
  CATEGORY_OPTIONS,
  filterWattageChartData,
  calculateSelectedWattageSummary,
  WattageChartItem,
} from "@/lib/calculators/generator-wattage-chart";
import {
  Search,
  Zap,
  ArrowRight,
  RotateCcw,
  SlidersHorizontal,
  CheckCircle2,
  AlertTriangle,
  Info,
  Layers,
  ChevronDown,
  Check,
  ShieldCheck,
  Cpu,
  Flame,
} from "lucide-react";

export const GeneratorWattageChart: React.FC = () => {
  // Filter and search states
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"runningWatts" | "startingWatts" | "surgeDelta" | "name">("runningWatts");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Interactive selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(["refrigerator-standard", "gas-furnace-blower", "sump-pump-third-hp", "led-lighting-10bulbs"]));

  // Filtered dataset
  const filteredItems = useMemo(() => {
    return filterWattageChartData(APPLIANCE_WATTAGE_DATA, {
      category: selectedCategory,
      query: searchQuery,
      sortBy,
      sortOrder,
    });
  }, [selectedCategory, searchQuery, sortBy, sortOrder]);

  // Selected items array
  const selectedItems = useMemo(() => {
    return APPLIANCE_WATTAGE_DATA.filter((item) => selectedIds.has(item.id));
  }, [selectedIds]);

  // Simultaneous demand summary
  const summary = useMemo(() => {
    return calculateSelectedWattageSummary(selectedItems);
  }, [selectedItems]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
  };

  const selectAllFiltered = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      for (const item of filteredItems) {
        next.add(item.id);
      }
      return next;
    });
  };

  return (
    <div className="w-full space-y-12">
      {/* Hero / Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-10 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-4xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-wide uppercase">
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            <span>Interactive Appliance Power Matrix</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Generator Wattage Chart: Running &amp; Starting Watts by Appliance
          </h1>

          <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl font-normal">
            Reference starting surge and steady running watts for over 35 household appliances, heavy workshop tools, and HVAC equipment. Select items below to calculate simultaneous running wattage, single largest startup inrush, and recommended generator capacity with continuous safety reserve.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>35+ Verified Appliance Profiles</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Single-Largest-Surge Formula</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>NEC 125% Headroom Guidance</span>
            </span>
          </div>
        </div>

        {/* Visual Background Accent */}
        <div
          aria-hidden="true"
          className="absolute -right-20 -bottom-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"
        />
      </div>

      {/* Hero Infographic Card */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm">
        <div className="relative w-full aspect-[16/9] max-h-[460px]">
          <Image
            src="/images/calculators/generator-wattage-chart.webp"
            alt="Generator wattage chart reference displaying running watts and motor starting surge power for common household appliances"
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
        </div>
        <div className="p-4 bg-slate-100 border-t border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <span>Figure 1: Comparison of typical running vs motor startup surge demand across major residential appliances.</span>
          <span className="font-medium text-slate-700">Source: CalcMyPower Engineering Reference</span>
        </div>
      </div>

      {/* Interactive Estimator Drawer / Summary Banner */}
      <div
        id="quick-estimator-summary"
        className={`rounded-2xl border transition-all duration-300 p-5 sm:p-6 shadow-md ${
          summary.selectedCount > 0
            ? "bg-blue-900 border-blue-700 text-white"
            : "bg-slate-50 border-slate-200 text-slate-700"
        }`}
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                Simultaneous Load Estimator ({summary.selectedCount} {summary.selectedCount === 1 ? "Appliance" : "Appliances"} Selected)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              {summary.selectedCount > 0
                ? "Calculated using the Single-Largest-Surge Delta rule plus a 25% continuous planning buffer."
                : "Select checkboxes in the chart below to tally your concurrent outage power demands."}
            </p>
          </div>

          {summary.selectedCount > 0 && (
            <button
              type="button"
              onClick={clearSelection}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-800/80 hover:bg-blue-800 text-blue-200 hover:text-white border border-blue-700 transition self-start lg:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Selection</span>
            </button>
          )}
        </div>

        {summary.selectedCount > 0 ? (
          <div className="mt-6 pt-6 border-t border-blue-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-blue-950/60 p-4 rounded-xl border border-blue-800">
              <span className="block text-xs font-medium text-blue-300 uppercase tracking-wider">
                Total Running Watts
              </span>
              <span className="text-2xl sm:text-3xl font-black font-mono text-white mt-1 block">
                {summary.totalRunningWatts.toLocaleString("en-US")} W
              </span>
              <span className="text-[11px] text-blue-300/80 mt-1 block">
                Continuous base load
              </span>
            </div>

            <div className="bg-blue-950/60 p-4 rounded-xl border border-blue-800">
              <span className="block text-xs font-medium text-blue-300 uppercase tracking-wider">
                Largest Surge Delta
              </span>
              <span className="text-2xl sm:text-3xl font-black font-mono text-amber-300 mt-1 block">
                +{summary.largestSurgeDelta.toLocaleString("en-US")} W
              </span>
              <span className="text-[11px] text-blue-300/80 mt-1 block truncate" title={summary.largestSurgeAppliance}>
                From: {summary.largestSurgeAppliance}
              </span>
            </div>

            <div className="bg-blue-950/60 p-4 rounded-xl border border-blue-800">
              <span className="block text-xs font-medium text-blue-300 uppercase tracking-wider">
                Peak Demand Watts
              </span>
              <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-300 mt-1 block">
                {summary.peakDemandWatts.toLocaleString("en-US")} W
              </span>
              <span className="text-[11px] text-blue-300/80 mt-1 block">
                Running + Max single surge
              </span>
            </div>

            <div className="bg-blue-950/60 p-4 rounded-xl border border-blue-800 ring-2 ring-emerald-400/30">
              <span className="block text-xs font-medium text-emerald-300 uppercase tracking-wider">
                Recommended Generator
              </span>
              <span className="text-2xl sm:text-3xl font-black font-mono text-white mt-1 block">
                {summary.recommendedGeneratorWatts.toLocaleString("en-US")} W
              </span>
              <span className="text-[11px] text-emerald-300 mt-1 block font-medium">
                Includes 25% safety reserve
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-4 p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 flex items-center gap-3">
            <Info className="w-5 h-5 text-blue-600 shrink-0" />
            <span>Check the box next to any appliance in the table to activate the real-time simultaneous load tally.</span>
          </div>
        )}

        {summary.selectedCount > 0 && (
          <div className="mt-6 pt-4 border-t border-blue-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-blue-200 text-center sm:text-left">
              Need to customize quantities, duty cycles, or room-by-room circuits? Use our dedicated generator sizing tool.
            </p>
            <Link
              href="/generator-size-calculator"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm tracking-wide transition shadow-lg shrink-0 w-full sm:w-auto"
            >
              <span>Launch Full Generator Size Calculator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

      {/* Filter and Search Controls */}
      <div className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="chart-search-input"
              name="chartSearch"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search appliances, watts, or notes (e.g. refrigerator, pump, 1500)..."
              aria-label="Filter appliances in wattage chart"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm text-slate-800 placeholder-slate-400 outline-hidden transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search input"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 px-1 py-0.5"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort By Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <label htmlFor="sort-select" className="text-xs font-semibold text-slate-600 whitespace-nowrap">
              Sort by:
            </label>
            <select
              id="sort-select"
              value={`${sortBy}_${sortOrder}`}
              onChange={(e) => {
                const [newSortBy, newSortOrder] = e.target.value.split("_") as [
                  "runningWatts" | "startingWatts" | "surgeDelta" | "name",
                  "asc" | "desc"
                ];
                setSortBy(newSortBy);
                setSortOrder(newSortOrder);
              }}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-hidden cursor-pointer"
            >
              <option value="runningWatts_desc">Running Watts (Highest First)</option>
              <option value="runningWatts_asc">Running Watts (Lowest First)</option>
              <option value="startingWatts_desc">Starting Watts (Highest First)</option>
              <option value="surgeDelta_desc">Surge Delta (Largest First)</option>
              <option value="name_asc">Appliance Name (A to Z)</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="pt-2">
          <div className="flex flex-wrap gap-2">
            {CATEGORY_OPTIONS.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition cursor-pointer ${
                    isActive
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Counter and Batch Action */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>
            Showing <strong>{filteredItems.length}</strong> of {APPLIANCE_WATTAGE_DATA.length} appliances
          </span>
          <button
            type="button"
            onClick={selectAllFiltered}
            className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
          >
            Select All Shown
          </button>
        </div>
      </div>

      {/* Appliance Wattage Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <caption className="sr-only">
              Complete Generator Wattage Chart showing running watts, starting surge watts, surge delta, and typical voltage for common appliances
            </caption>
            <thead className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider">
              <tr>
                <th scope="col" className="py-3.5 px-4 w-12 text-center">
                  Select
                </th>
                <th scope="col" className="py-3.5 px-4 min-w-[200px]">
                  Appliance &amp; Equipment
                </th>
                <th scope="col" className="py-3.5 px-4 text-right min-w-[120px]">
                  Running Watts
                </th>
                <th scope="col" className="py-3.5 px-4 text-right min-w-[120px]">
                  Starting Watts
                </th>
                <th scope="col" className="py-3.5 px-4 text-right min-w-[110px]">
                  Surge Delta
                </th>
                <th scope="col" className="py-3.5 px-4 min-w-[90px]">
                  Voltage
                </th>
                <th scope="col" className="py-3.5 px-4 min-w-[140px]">
                  Motor / Load Type
                </th>
                <th scope="col" className="py-3.5 px-4 min-w-[220px]">
                  Technical Sizing Notes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    <p className="text-base font-semibold">No appliances match your filter.</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Try clearing your search query or switching to &quot;All Appliances&quot;.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => {
                  const isChecked = selectedIds.has(item.id);
                  return (
                    <tr
                      key={item.id}
                      onClick={() => toggleSelect(item.id)}
                      className={`hover:bg-blue-50/50 transition cursor-pointer ${
                        isChecked ? "bg-blue-50/80" : "bg-white"
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-3 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // Handled by row onClick
                          aria-label={`Select ${item.name}`}
                          className="w-4 h-4 rounded-sm text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                        />
                      </td>

                      {/* Name & Category */}
                      <th scope="row" className="py-3 px-4 font-medium text-slate-900">
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-[11px] text-slate-600">{item.category}</div>
                      </th>

                      {/* Running Watts */}
                      <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">
                        <div>{item.runningWatts.toLocaleString("en-US")} W</div>
                        <div className="text-[11px] text-slate-600 font-sans font-normal">
                          {item.runningWattsRange}
                        </div>
                      </td>

                      {/* Starting Watts */}
                      <td className="py-3 px-4 text-right font-mono font-bold text-amber-800">
                        <div>{item.startingWatts.toLocaleString("en-US")} W</div>
                        <div className="text-[11px] text-slate-600 font-sans font-normal">
                          {item.startingWattsRange}
                        </div>
                      </td>

                      {/* Surge Delta */}
                      <td className="py-3 px-4 text-right font-mono">
                        {item.surgeDelta > 0 ? (
                          <span className="font-bold text-amber-600">
                            +{item.surgeDelta.toLocaleString("en-US")} W
                          </span>
                        ) : (
                          <span className="text-slate-400">0 W</span>
                        )}
                      </td>

                      {/* Typical Voltage */}
                      <td className="py-3 px-4 font-mono text-slate-700">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-xs">
                          {item.typicalVoltage}
                        </span>
                      </td>

                      {/* Surge Type */}
                      <td className="py-3 px-4 text-slate-700">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium ${
                            item.surgeType === "Locked-Rotor Motor"
                              ? "bg-amber-50 border border-amber-200 text-amber-800"
                              : item.surgeType === "Inverter / Soft-Start"
                              ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                              : item.surgeType === "Purely Resistive"
                              ? "bg-rose-50 border border-rose-200 text-rose-800"
                              : "bg-blue-50 border border-blue-200 text-blue-800"
                          }`}
                        >
                          {item.surgeType}
                        </span>
                      </td>

                      {/* Engineering Notes */}
                      <td className="py-3 px-4 text-slate-600 text-xs leading-relaxed">
                        {item.notes}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Guide Content: In-Depth Generator Sizing Principles */}
      <article className="space-y-12 pt-6">
        {/* Section 1: Running vs Starting Watts */}
        <section id="running-vs-starting-watts" className="space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Running Watts vs. Starting Watts: The Engineering Difference
            </h2>
          </div>
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            When sizing a portable or standby generator, confusion frequently arises because electrical appliances consume power in two distinct phases: continuous running demand and momentary starting inrush.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Cpu className="w-5 h-5 text-blue-600" />
                <span>Running Watts (Continuous Power)</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The continuous electrical power an appliance draws during normal, steady-state operation. Once a motor is spinning at rated RPM, or a resistive heating element reaches thermal equilibrium, it consumes its rated running wattage continuously. This number determines your generator base capacity and hourly fuel consumption rate.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
              <h3 className="font-bold text-amber-950 text-base flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-600" />
                <span>Starting Watts (Surge / Inrush Power)</span>
              </h3>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                The peak electrical power drawn for 2 to 3 seconds when an electric motor first starts from a complete standstill. Overcoming rotational inertia and pressurizing compressor lines requires 2x to 6x the continuous running draw. The generator alternator must handle this spike without collapsing output voltage or bogging the engine.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Surge Multipliers & Locked Rotor Amps */}
        <section id="surge-multipliers-lra" className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Motor Surge Multipliers and Locked Rotor Amps (LRA)
          </h2>
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            Different electrical appliances exhibit fundamentally different inrush behaviors based on their underlying electrical architecture. In electrical engineering, this is characterized by motor nameplate Locked Rotor Amps (LRA) versus Full Load Amps (FLA):
          </p>
          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
              <h3 className="font-bold text-slate-900 text-sm">
                1. Locked-Rotor Induction Motors (2.5x to 3.5x Surge)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Appliances like refrigerators, sump pumps, well pumps, and air conditioner compressors feature heavy induction motors. At the moment power is applied, the rotor is stationary (locked), causing an electromagnetic spike 3 to 6 times FLA for 500 to 2,000 milliseconds until back-EMF establishes equilibrium.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
              <h3 className="font-bold text-slate-900 text-sm">
                2. Inverter-Driven &amp; Soft-Start Motors (1.2x to 1.5x Surge)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Modern Energy Star refrigerators, mini-split heat pumps, and AC units equipped with electronic soft starters ramp up motor frequency gradually via pulse-width modulation (PWM). Inrush current is reduced by 60% to 70%, allowing smaller generators to start large HVAC loads safely.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
              <h3 className="font-bold text-slate-900 text-sm">
                3. Purely Resistive Loads (1.0x Surge, Zero Inrush)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Space heaters, electric toasters, water heaters, and incandescent lamps use resistive nichrome wire elements. Starting wattage equals running wattage exactly; there is zero motor inrush surge.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
              <h3 className="font-bold text-slate-900 text-sm">
                4. Switch-Mode Electronics (Brief Capacitor Inrush)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Computers, televisions, Wi-Fi routers, and LED drivers have brief sub-cycle capacitor charging spikes that do not affect generator rotational momentum. However, they are sensitive to Total Harmonic Distortion (THD), requiring clean inverter generator power (&lt;3% THD).
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Single-Largest-Surge Rule */}
        <section id="single-largest-surge-rule" className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            The Single-Largest-Surge Rule: Avoid Over-Sizing Your Generator
          </h2>
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            The most common mistake homeowners make when calculating generator wattage is adding the starting watts of every appliance together. This leads to wildly oversized, expensive generators that consume excessive fuel and risk wet-stacking under light loads.
          </p>
          <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-emerald-400">
              The Engineering Calculation Standard:
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs sm:text-sm text-slate-200">
              Generator Capacity = (Total Running Watts + Single Largest Surge Delta) x 1.25 Headroom
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Motors cycle intermittently and do not start at the exact same millisecond. Once an appliance (such as your refrigerator) has started and drops to its running draw, the generator has its full surge headroom available to start the next appliance (such as your sump pump or furnace blower). Therefore, you only need to account for the single largest starting surge delta among all running equipment.
            </p>
          </div>
        </section>

        {/* Section 4: How to Read Nameplates */}
        <section id="read-appliance-nameplate" className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            How to Read Appliance Electrical Nameplates
          </h2>
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            If an appliance is not listed in this chart or you want exact manufacturer figures, look at the metal specification plate located on the back, bottom, or inside door frame of the equipment:
          </p>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs sm:text-sm text-slate-700">
            <p>
              <strong>1. If Watts (W) are stated:</strong> Use the rated wattage directly as your running wattage.
            </p>
            <p>
              <strong>2. If only Volts (V) and Amps (A) are given:</strong> Multiply Voltage by Amperage to obtain Watts (Watts = Volts x Amps). For example, a 120V freezer drawing 4.5 Amps consumes 540 Watts running (120V x 4.5A = 540W).
            </p>
            <p>
              <strong>3. If Horsepower (HP) is given:</strong> One mechanical horsepower equals 746 Watts of electrical power. However, due to motor electrical efficiency losses (typically 75% to 85%), estimate approximately 1,000 electrical Watts per rated horsepower for running demand, and multiply by 2.5x to 3x for startup inrush.
            </p>
          </div>
        </section>

        {/* Section 5: High-Wattage Equipment to Avoid */}
        <section id="appliances-to-avoid" className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            High-Wattage Household Equipment: What to Leave Off
          </h2>
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            During utility power outages, certain high-draw resistive and heating loads should be deliberately disconnected unless you are running a 20kW+ whole-house standby generator:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/60 space-y-1">
              <span className="font-bold text-rose-950 block">Electric Range / Oven</span>
              <span className="font-mono text-rose-700 font-semibold block">3,000 to 8,000 Watts</span>
              <p className="text-slate-600 text-xs">
                Use a camping stove, microwave, or outdoor gas grill instead to preserve generator capacity.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/60 space-y-1">
              <span className="font-bold text-rose-950 block">Electric Water Heater</span>
              <span className="font-mono text-rose-700 font-semibold block">4,500 Watts continuous</span>
              <p className="text-slate-600 text-xs">
                A single immersion tank heater consumes 100% of a 5kW generator. Consider gas or heat pump water heaters.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/60 space-y-1">
              <span className="font-bold text-rose-950 block">Central Electric Heat Strip</span>
              <span className="font-mono text-rose-700 font-semibold block">10,000 to 20,000 Watts</span>
              <p className="text-slate-600 text-xs">
                Auxiliary resistance heat banks on heat pumps will trip even heavy portable generators instantly.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Worked Sizing Examples */}
        <section id="worked-sizing-examples" className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Worked Sizing Example: Typical Suburban Outage Load
          </h2>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 text-xs sm:text-sm text-slate-700">
            <p>
              Consider a family during a winter storm power outage running essential circuits:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="border-b border-slate-300 font-bold text-slate-800">
                  <tr>
                    <th className="py-2 px-3">Appliance</th>
                    <th className="py-2 px-3 text-right">Running</th>
                    <th className="py-2 px-3 text-right">Starting</th>
                    <th className="py-2 px-3 text-right">Surge Delta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="py-2 px-3 font-medium">Refrigerator / Freezer</td>
                    <td className="py-2 px-3 text-right font-mono">700 W</td>
                    <td className="py-2 px-3 text-right font-mono">1,500 W</td>
                    <td className="py-2 px-3 text-right font-mono text-slate-500">800 W</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Gas Furnace Blower Motor (1/2 HP)</td>
                    <td className="py-2 px-3 text-right font-mono">800 W</td>
                    <td className="py-2 px-3 text-right font-mono">1,900 W</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-amber-700">1,100 W (Largest)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Basement Sump Pump (1/3 HP)</td>
                    <td className="py-2 px-3 text-right font-mono">600 W</td>
                    <td className="py-2 px-3 text-right font-mono">1,400 W</td>
                    <td className="py-2 px-3 text-right font-mono text-slate-500">800 W</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Microwave Oven</td>
                    <td className="py-2 px-3 text-right font-mono">1,500 W</td>
                    <td className="py-2 px-3 text-right font-mono">1,500 W</td>
                    <td className="py-2 px-3 text-right font-mono text-slate-500">0 W</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">LED Lights &amp; Wi-Fi Router</td>
                    <td className="py-2 px-3 text-right font-mono">115 W</td>
                    <td className="py-2 px-3 text-right font-mono">115 W</td>
                    <td className="py-2 px-3 text-right font-mono text-slate-500">0 W</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-2 space-y-1 font-mono text-slate-900 border-t border-slate-200">
              <p>Total Running Load = 700 + 800 + 600 + 1,500 + 115 = <strong>3,715 Watts</strong></p>
              <p>Largest Surge Delta = <strong>1,100 Watts</strong> (Furnace Blower)</p>
              <p>Peak Demand = 3,715 + 1,100 = <strong>4,815 Watts</strong></p>
              <p>Recommended Capacity (1.25x Headroom) = 4,815 x 1.25 = <strong>6,019 Watts</strong></p>
            </div>

            <p className="pt-2 text-xs text-slate-600">
              Conclusion: A 6,500W running / 8,000W starting dual-fuel portable generator handles this entire outage profile with optimal engine margin and fuel economy.
            </p>
          </div>
        </section>

        {/* Section 7: Assumptions & Safety Disclaimers */}
        <section id="safety-disclaimers" className="space-y-4">
          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
              <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
              <h3>Engineering Methodology &amp; Electrical Safety Disclaimer</h3>
            </div>
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              All wattage values in this chart represent typical North American nameplate averages. Actual power draw varies significantly based on appliance age, efficiency rating (such as Energy Star certification), ambient temperature, and compressor head pressure.
            </p>
            <p className="text-xs text-amber-800 leading-relaxed">
              This chart is provided for preliminary planning and educational sizing only. Never connect a portable generator directly into home wiring without an interlock kit or automatic transfer switch installed by a licensed electrician in accordance with NFPA 70 (National Electrical Code) and local utility regulations.
            </p>
          </div>
        </section>

        {/* Section 8: Frequently Asked Questions (FAQ) */}
        <section id="frequently-asked-questions" className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            <details className="group bg-slate-50 border border-slate-200 rounded-xl p-4 transition-all">
              <summary className="font-semibold text-slate-900 text-sm cursor-pointer list-none flex justify-between items-center">
                <span>Can I run a refrigerator and a window air conditioner on a 3,500-watt generator?</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="pt-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200 mt-3">
                Yes, under proper load management. A standard refrigerator draws 700W running (1,500W surge) and a 5,000 to 8,000 BTU window AC draws 500W to 800W running (1,200W to 1,800W surge). Combined running wattage is roughly 1,200W to 1,500W. Their peak starting surge will be approximately 2,800W, which fits comfortably within a 3,500W running / 4,000W surge generator.
              </div>
            </details>

            <details className="group bg-slate-50 border border-slate-200 rounded-xl p-4 transition-all">
              <summary className="font-semibold text-slate-900 text-sm cursor-pointer list-none flex justify-between items-center">
                <span>Why does my generator trip when a motor starts even though total running watts are below the rating?</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="pt-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200 mt-3">
                When an induction motor (like a deep well pump or air compressor) begins spinning from rest, it draws locked-rotor inrush current for 200 to 1,000 milliseconds. If the motor surge demand exceeds the generator peak surge rating, the alternator output voltage drops sharply, causing the generator circuit breaker or inverter protection circuit to trip.
              </div>
            </details>

            <details className="group bg-slate-50 border border-slate-200 rounded-xl p-4 transition-all">
              <summary className="font-semibold text-slate-900 text-sm cursor-pointer list-none flex justify-between items-center">
                <span>What is the difference between surge watts and starting watts on generator spec sheets?</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="pt-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200 mt-3">
                In generator specifications, &quot;starting watts&quot; and &quot;surge watts&quot; are identical terms. They denote the maximum electrical power the alternator and engine can sustain for a brief period (typically 2 to 6 seconds) to accelerate electric motors before settling back to rated continuous running watts.
              </div>
            </details>

            <details className="group bg-slate-50 border border-slate-200 rounded-xl p-4 transition-all">
              <summary className="font-semibold text-slate-900 text-sm cursor-pointer list-none flex justify-between items-center">
                <span>Why is a 25% safety reserve factor recommended when sizing generators?</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="pt-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200 mt-3">
                Running an internal combustion generator at 100% capacity continuously causes extreme engine heat, increased harmonic distortion, rapid oil breakdown, and high fuel consumption. Sizing with a 25% buffer keeps steady operation around 70% to 80% load, which maximizes engine lifespan and prevents stalls during unexpected secondary motor starts.
              </div>
            </details>

            <details className="group bg-slate-50 border border-slate-200 rounded-xl p-4 transition-all">
              <summary className="font-semibold text-slate-900 text-sm cursor-pointer list-none flex justify-between items-center">
                <span>Does an inverter generator provide the same starting surge as an open-frame generator?</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="pt-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200 mt-3">
                Conventional open-frame generators have heavy copper rotor windings with mechanical rotational momentum that can absorb momentary inrush overload. Inverter generators convert AC to DC and back to digital AC; their surge capacity is electronically governed. While top inverter models offer excellent transient response, their surge margins are strictly limited to manufacturer specifications to protect solid-state components.
              </div>
            </details>
          </div>
        </section>

        {/* Section 9: Related Calculators & Guides */}
        <section id="related-tools" className="space-y-4 pt-6 border-t border-slate-200">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Related Power Sizing Calculators &amp; Engineering Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/generator-size-calculator"
              className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition bg-slate-50 hover:bg-white group"
            >
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide block">
                Interactive Sizing Tool
              </span>
              <span className="font-bold text-slate-900 group-hover:text-blue-600 text-sm block mt-1">
                Generator Size Calculator
              </span>
              <span className="text-xs text-slate-500 mt-1 block">
                Calculate whole-house outage requirements room by room with custom runtime and duty cycles.
              </span>
            </Link>

            <Link
              href="/generator-amperage-chart-calculator"
              className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition bg-slate-50 hover:bg-white group"
            >
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide block">
                Current Reference Tool
              </span>
              <span className="font-bold text-slate-900 group-hover:text-blue-600 text-sm block mt-1">
                Generator Amperage Chart &amp; Calculator
              </span>
              <span className="text-xs text-slate-500 mt-1 block">
                Convert Watts to Amps at 120V and 240V split-phase with 80% continuous operating limits.
              </span>
            </Link>

            <Link
              href="/how-to-calculate-watts-for-a-generator"
              className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition bg-slate-50 hover:bg-white group"
            >
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide block">
                Engineering Sizing Guide
              </span>
              <span className="font-bold text-slate-900 group-hover:text-blue-600 text-sm block mt-1">
                How to Calculate Watts for a Generator
              </span>
              <span className="text-xs text-slate-500 mt-1 block">
                In-depth mathematical guide covering running vs starting watts, locked rotor surge, and safety margins.
              </span>
            </Link>

            <Link
              href="/continuous-power-generators"
              className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition bg-slate-50 hover:bg-white group"
            >
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide block">
                Industrial Power Guide
              </span>
              <span className="font-bold text-slate-900 group-hover:text-blue-600 text-sm block mt-1">
                Continuous Power Generators Explained
              </span>
              <span className="text-xs text-slate-500 mt-1 block">
                Understand ISO 8528 continuous ratings, 1800 RPM engines, and why standby units cannot run 24/7.
              </span>
            </Link>

            <Link
              href="/watts-to-amps-calculator"
              className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition bg-slate-50 hover:bg-white group"
            >
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide block">
                Electrical Circuit Tool
              </span>
              <span className="font-bold text-slate-900 group-hover:text-blue-600 text-sm block mt-1">
                Watts to Amps Electrical Calculator
              </span>
              <span className="text-xs text-slate-500 mt-1 block">
                Convert real power to current across DC, 120V/240V single-phase, and 3-phase circuits.
              </span>
            </Link>

            <Link
              href="/electricity-use-calculator"
              className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition bg-slate-50 hover:bg-white group"
            >
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide block">
                Energy Consumption Tool
              </span>
              <span className="font-bold text-slate-900 group-hover:text-blue-600 text-sm block mt-1">
                Electricity Use Calculator
              </span>
              <span className="text-xs text-slate-500 mt-1 block">
                Calculate daily and monthly appliance electricity usage in kWh and utility bill costs.
              </span>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
};
