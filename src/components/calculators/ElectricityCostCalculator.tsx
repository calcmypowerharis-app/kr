"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  calculateElectricityBill,
  ELECTRICITY_COST_PRESETS,
  ElectricityCostPreset,
} from "@/lib/calculators/electricity-cost";
import { InputField } from "@/components/ui/InputField";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { FormulaSection } from "@/components/calculators/FormulaSection";
import { WorkedExampleSection } from "@/components/calculators/WorkedExampleSection";
import { AssumptionsSection } from "@/components/calculators/AssumptionsSection";
import { DisclaimerSection } from "@/components/calculators/DisclaimerSection";
import { FaqSection } from "@/components/calculators/FaqSection";
import { RelatedCalculators } from "@/components/calculators/RelatedCalculators";
import {
  Zap,
  Layers,
  ArrowRight,
  TrendingUp,
  FileText,
  Percent,
} from "lucide-react";

export const ElectricityCostCalculator: React.FC = () => {
  // Input states with Single Source of Truth defaults:
  // 900 kWh @ $0.16/kWh, $15.00 fixed, $18.00 riders, $8.00 flat tax -> $185.00 Total Bill ($0.2056/kWh effective)
  const [monthlyKwh, setMonthlyKwh] = useState<number>(900);
  const [energyRate, setEnergyRate] = useState<number>(0.16);
  const [fixedMonthlyCharge, setFixedMonthlyCharge] = useState<number>(15.0);
  const [additionalMonthlyCharges, setAdditionalMonthlyCharges] = useState<number>(18.0);
  const [taxRatePercent, setTaxRatePercent] = useState<number>(0);
  const [flatTaxAmount, setFlatTaxAmount] = useState<number>(8.0);
  const [billingDays, setBillingDays] = useState<number>(30);

  // Pure calculation
  const results = useMemo(() => {
    return calculateElectricityBill({
      monthlyKwh,
      energyRate,
      fixedMonthlyCharge,
      additionalMonthlyCharges,
      taxRatePercent,
      flatTaxAmount,
      billingDays,
    });
  }, [
    monthlyKwh,
    energyRate,
    fixedMonthlyCharge,
    additionalMonthlyCharges,
    taxRatePercent,
    flatTaxAmount,
    billingDays,
  ]);

  const handleApplyPreset = (preset: ElectricityCostPreset) => {
    setMonthlyKwh(preset.monthlyKwh);
    setEnergyRate(preset.energyRate);
    setFixedMonthlyCharge(preset.fixedMonthlyCharge);
    setAdditionalMonthlyCharges(preset.additionalMonthlyCharges);
    setTaxRatePercent(preset.taxRatePercent);
    setFlatTaxAmount(preset.flatTaxAmount);
  };

  const handleReset = () => {
    setMonthlyKwh(900);
    setEnergyRate(0.16);
    setFixedMonthlyCharge(15.0);
    setAdditionalMonthlyCharges(18.0);
    setTaxRatePercent(0);
    setFlatTaxAmount(8.0);
    setBillingDays(30);
  };

  // -------------------------------------------------------------
  // INPUT SECTION (Left Column on Desktop)
  // -------------------------------------------------------------
  const inputSection = (
    <div className="space-y-6">
      {/* Preset Quick-Select Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Load Reference Scenario</span>
          </h2>
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition"
          >
            Reset Defaults
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {ELECTRICITY_COST_PRESETS.map((p) => {
            const isSelected =
              monthlyKwh === p.monthlyKwh &&
              energyRate === p.energyRate &&
              fixedMonthlyCharge === p.fixedMonthlyCharge &&
              flatTaxAmount === p.flatTaxAmount;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handleApplyPreset(p)}
                className={`p-3 text-left rounded-xl border text-xs transition space-y-1 ${
                  isSelected
                    ? "border-blue-500 bg-blue-50/60 text-blue-900 shadow-sm ring-1 ring-blue-500"
                    : "border-slate-200 hover:border-slate-300 bg-slate-50/60 text-slate-700"
                }`}
              >
                <div className="font-bold flex items-center justify-between">
                  <span>{p.name}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
                  )}
                </div>
                <div className="text-[11px] text-slate-500 leading-snug">
                  {p.monthlyKwh} kWh @ ${(p.energyRate).toFixed(2)}/kWh
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Input Form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-7 shadow-sm space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900">
            Monthly Usage &amp; Tariff Inputs
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Enter your monthly electric utility statement parameters below.
          </p>
        </div>

        {/* Monthly kWh Usage */}
        <div className="space-y-2">
          <InputField
            id="monthlyKwh"
            label="Monthly Electricity Consumption"
            value={monthlyKwh}
            onChange={setMonthlyKwh}
            unit="kWh / month"
            min={0}
            max={50000}
            step={10}
            helpText="Total kilowatt-hours billed during the monthly billing cycle (from meter read difference)."
          />
          <div className="flex items-center gap-1.5 text-xs text-slate-500 pl-1">
            <span className="text-slate-600 font-medium">Average Daily Usage:</span>
            <span className="font-semibold text-slate-700">
              {monthlyKwh > 0 ? (monthlyKwh / (billingDays || 30)).toFixed(1) : 0} kWh / day
            </span>
            <span className="text-slate-600 font-medium ml-2">National EIA Avg:</span>
            <span className="font-semibold text-slate-700">~30 kWh / day</span>
          </div>
        </div>

        {/* Base Energy Supply Rate */}
        <div className="space-y-2">
          <InputField
            id="energyRate"
            label="Base Energy Supply Rate"
            value={energyRate}
            onChange={setEnergyRate}
            unit="$/kWh"
            min={0}
            max={2.0}
            step={0.001}
            helpText="Volumetric rate charged per kWh (for example, $0.1600 corresponds to 16.0 cents per kWh)."
          />
          <div className="flex items-center gap-1.5 text-xs text-slate-500 pl-1">
            <span className="text-slate-600 font-medium">Equivalent in Cents:</span>
            <span className="font-semibold text-blue-700">
              {(energyRate * 100).toFixed(2)}¢ per kWh
            </span>
            <span className="text-slate-600 font-medium ml-2">U.S. National Average:</span>
            <span className="font-semibold text-slate-700">~16.5¢ / kWh</span>
          </div>
        </div>

        {/* Fixed Customer Charge */}
        <InputField
          id="fixedMonthlyCharge"
          label="Fixed Monthly Customer Charge"
          value={fixedMonthlyCharge}
          onChange={setFixedMonthlyCharge}
          unit="$/month"
          min={0}
          max={250}
          step={1}
          helpText="Recurring monthly basic service fee for meter infrastructure and billing. Billed even if usage is zero."
        />

        {/* Delivery, Distribution & Regulatory Riders */}
        <InputField
          id="additionalMonthlyCharges"
          label="Delivery, Distribution &amp; Regulatory Riders"
          value={additionalMonthlyCharges}
          onChange={setAdditionalMonthlyCharges}
          unit="$/month"
          min={0}
          max={500}
          step={1}
          helpText="Grid maintenance, transmission capacity, energy efficiency mandates, and environmental surcharges."
        />

        {/* Taxes and Surcharges Section */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 uppercase tracking-wider">
              <Percent className="w-3.5 h-3.5 text-indigo-600" />
              <span>Taxes &amp; Local Surcharges</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Note: This tool does not maintain regional tax database lookups. Enter your local municipal fee and tax rate directly from your statement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              id="flatTaxAmount"
              label="Flat Tax or Municipal Fee"
              value={flatTaxAmount}
              onChange={setFlatTaxAmount}
              unit="$ / month"
              min={0}
              max={100}
              step={0.5}
              helpText="Fixed local municipal assessment, city franchise fee, or universal service surcharge."
            />

            <InputField
              id="taxRatePercent"
              label="Sales Tax Percentage"
              value={taxRatePercent}
              onChange={setTaxRatePercent}
              unit="%"
              min={0}
              max={25}
              step={0.1}
              helpText="Optional state or local sales tax applied as a percentage of the pre-tax bill subtotal."
            />
          </div>
        </div>

        {/* Billing Period Days */}
        <InputField
          id="billingDays"
          label="Billing Cycle Duration"
          value={billingDays}
          onChange={setBillingDays}
          unit="Days"
          min={15}
          max={45}
          step={1}
          helpText="Standard utility billing periods range from 28 to 33 calendar days (default 30)."
        />
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
            <span>Estimated Total Monthly Bill</span>
          </span>
          <span className="text-xs text-blue-200 font-mono">
            {billingDays}-Day Period
          </span>
        </div>

        {/* Main Monthly Dollar Metric */}
        <div className="space-y-1">
          <div className="text-xs text-blue-200 font-medium">Estimated Statement Amount</div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-black text-white tracking-tight font-mono">
              ${results.totalEstimatedBill.toFixed(2)}
            </span>
            <span className="text-lg sm:text-xl font-bold text-emerald-400 font-sans">total due</span>
          </div>
          <div className="text-xs text-blue-200 pt-1">
            Calculated for {results.monthlyKwh.toLocaleString()} kWh billed consumption
          </div>
        </div>

        {/* Secondary Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 pt-1 border-t border-blue-900/80">
          {/* Effective Rate */}
          <div className="p-3 rounded-xl bg-blue-900/40 border border-blue-700/40 space-y-0.5">
            <div className="text-[11px] text-blue-200 font-medium">Effective Unit Cost</div>
            {results.monthlyKwh > 0 ? (
              <>
                <div className="text-xl font-bold text-amber-300 font-mono">
                  {results.effectiveCentsPerKwh.toFixed(2)}¢
                </div>
                <div className="text-[10px] text-blue-200 font-mono">
                  (${results.effectiveRatePerKwh.toFixed(4)}/kWh)
                </div>
              </>
            ) : (
              <>
                <div className="text-xl font-bold text-slate-200 font-mono">
                  N/A
                </div>
                <div className="text-[10px] text-blue-200 font-sans">
                  0 kWh metered (fixed fees only)
                </div>
              </>
            )}
          </div>

          {/* Daily Average Cost */}
          <div className="p-3 rounded-xl bg-blue-900/40 border border-blue-700/40 space-y-0.5">
            <div className="text-[11px] text-blue-200 font-medium">Daily Average</div>
            <div className="text-xl font-bold text-white font-mono">
              ${results.dailyEstimatedCost.toFixed(2)}
            </div>
            <div className="text-[10px] text-blue-200 font-sans">
              per calendar day
            </div>
          </div>
        </div>

        {/* Annual Projection */}
        <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between text-xs">
          <span className="text-slate-200">Annual Expenditure Projection:</span>
          <span className="font-mono font-bold text-emerald-400 text-sm">
            ${results.annualEstimatedCost.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / yr
          </span>
        </div>
      </div>

      {/* Visual Breakdown Stacked Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <span>Line-Item Bill Breakdown</span>
          </h3>
          <span className="text-xs text-slate-500 font-mono">
            100% of Total Bill
          </span>
        </div>

        {/* Progress Stack Bar */}
        <div className="w-full h-4 rounded-full bg-slate-100 flex overflow-hidden">
          <div
            style={{ width: `${results.lineItems[0].percentOfTotal}%` }}
            className="bg-blue-600 h-full"
            title={`Energy Supply: ${results.lineItems[0].percentOfTotal}%`}
          />
          <div
            style={{ width: `${results.lineItems[1].percentOfTotal}%` }}
            className="bg-amber-500 h-full"
            title={`Fixed Customer Charge: ${results.lineItems[1].percentOfTotal}%`}
          />
          <div
            style={{ width: `${results.lineItems[2].percentOfTotal}%` }}
            className="bg-purple-600 h-full"
            title={`Delivery & Riders: ${results.lineItems[2].percentOfTotal}%`}
          />
          <div
            style={{ width: `${results.lineItems[3].percentOfTotal}%` }}
            className="bg-emerald-500 h-full"
            title={`Taxes & Fees: ${results.lineItems[3].percentOfTotal}%`}
          />
        </div>

        {/* Line Items List */}
        <div className="space-y-3 pt-2">
          {results.lineItems.map((item, idx) => {
            const dotColor =
              idx === 0
                ? "bg-blue-600"
                : idx === 1
                ? "bg-amber-500"
                : idx === 2
                ? "bg-purple-600"
                : "bg-emerald-500";
            const badge =
              idx === 0
                ? { label: "Automatically Calculated", bg: "bg-blue-100 text-blue-800" }
                : idx === 1
                ? { label: "User-Entered Fixed Fee", bg: "bg-amber-100 text-amber-900" }
                : idx === 2
                ? { label: "User-Entered Estimate", bg: "bg-purple-100 text-purple-900" }
                : { label: "User-Entered Tax", bg: "bg-emerald-100 text-emerald-900" };
            return (
              <div
                key={item.name}
                className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-50 border border-slate-100"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${dotColor} shrink-0`} />
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-semibold text-slate-800">{item.name}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${badge.bg}`}>
                        {badge.label}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600 mt-0.5">{item.description}</div>
                  </div>
                </div>
                <div className="text-right shrink-0 pl-2">
                  <div className="font-bold text-slate-900 font-mono">
                    ${item.amount.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-slate-600">
                    {item.percentOfTotal}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* EIA National Benchmark Comparison Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs text-blue-200">
          <span className="flex items-center gap-1.5 font-semibold uppercase tracking-wider text-blue-300">
            <TrendingUp className="w-3.5 h-3.5" />
            U.S. National Baseline (EIA)
          </span>
          <span className="bg-slate-700 px-2 py-0.5 rounded text-[11px] text-slate-200">
            EIA Form 861M
          </span>
        </div>

        <p className="text-xs text-slate-200 leading-relaxed">
          The average U.S. residential customer consumes approximately 900 kWh per month with an average retail rate of ~16.5¢/kWh, yielding an estimated monthly bill of approximately $158.00.
        </p>

        <div className="pt-2 border-t border-slate-700/80 flex items-center justify-between text-xs">
          <span className="text-slate-300">Comparison to EIA Average:</span>
          <span
            className={`font-bold font-mono px-2 py-0.5 rounded ${
              results.benchmarkComparison.differenceFromAverageDollars > 0
                ? "text-amber-300 bg-amber-950/60"
                : "text-emerald-300 bg-emerald-950/60"
            }`}
          >
            {results.benchmarkComparison.differenceFromAverageDollars > 0 ? "+" : ""}
            ${results.benchmarkComparison.differenceFromAverageDollars.toFixed(2)} (
            {results.benchmarkComparison.differenceFromAveragePercent > 0 ? "+" : ""}
            {results.benchmarkComparison.differenceFromAveragePercent}%)
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <CalculatorShell
      title="Electricity Cost Calculator"
      badge="Utility Bill Estimator"
      category="Electrical Circuits"
      lastUpdated="October 2026"
      description="Estimate your monthly electric utility bill and true effective cost per kilowatt-hour (kWh). Breakdown volumetric energy supply charges, fixed monthly customer fees, distribution delivery riders, and local taxes."
      onReset={handleReset}
      inputSection={inputSection}
      resultSection={resultSection}
    >
      {/* Visual Infographic Asset */}
      <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xs max-w-4xl mx-auto space-y-2 p-2">
        <div className="relative aspect-16/9 w-full rounded-xl overflow-hidden">
          <Image
            src="/images/calculators/electricity-cost-calculator.webp"
            alt="Technical diagram illustrating monthly electric utility bill cost breakdown, volumetric kWh charges, fixed customer fees, and effective rate calculation"
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
            priority
          />
        </div>
        <p className="text-xs text-slate-500 text-center py-1">
          Figure 1: Deconstructing electric utility billing into volumetric supply commodity charges, fixed customer fees, distribution riders, and effective unit rates.
        </p>
      </div>

      {/* Strategic Tool Handoff & Guide Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200/80 p-5 md:p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5" />
              Appliance Consumption Audit
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Need to calculate how many kWh your home uses?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              If you do not know your monthly kilowatt-hour figure, use our interactive Electricity Use Calculator to tally individual appliances, operating schedules, and duty cycles.
            </p>
          </div>
          <div>
            <Link
              href="/electricity-use-calculator"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition"
            >
              <span>Open Electricity Use Calculator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="bg-gradient-to-r from-slate-50 to-purple-50 rounded-2xl border border-purple-200/80 p-5 md:p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-semibold">
              <FileText className="w-3.5 h-3.5" />
              Comprehensive Sizing Guide
            </div>
            <h3 className="text-base font-bold text-slate-900">
              How to Calculate Your Electricity Bill (Full Guide)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Learn how electric utilities calculate statements from meter reads, unpack supply vs delivery tariffs, and discover why your true effective $/kWh is higher than quoted rates.
            </p>
          </div>
          <div>
            <Link
              href="/how-to-calculate-electricity-bill"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-sm transition"
            >
              <span>Read Electricity Bill Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Important Notice on Utility Billing Variations */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 md:p-6 space-y-2 text-slate-800">
        <div className="flex items-center gap-2 font-bold text-amber-950 text-sm">
          <Zap className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Important Notice on Real-World Utility Tariff Variations</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Actual electric utility statements vary widely depending on state Public Utility Commission (PUC) regulations, seasonal rate schedules (summer vs winter tiers), time-of-use (TOU) clock hours, and local municipal franchise agreements. Because electric utilities across the United States enforce thousands of distinct tariff formulas, this calculator does not fetch utility-specific tax codes automatically. Instead, it provides an engineering-grade model where you enter your specific utility statement charges directly to calculate your true effective kilowatt-hour cost.
        </p>
      </div>

      {/* Formula & Methodology Section */}
      <FormulaSection
        title="Utility Bill Calculation Formula"
        formulaDisplay="Total Bill = (Billed kWh × Energy Rate) + Fixed Charge + Riders + Taxes"
        description="Electric utility billing decomposes monthly charges into volumetric commodity supply charges, recurring customer infrastructure fees, grid maintenance riders, and government surcharges."
        variables={[
          {
            symbol: "Billed kWh",
            name: "Metered Energy Consumption",
            unit: "kWh",
            description: "Net difference between ending and starting meter readings over the billing cycle.",
          },
          {
            symbol: "Energy Rate",
            name: "Volumetric Commodity Rate",
            unit: "$/kWh",
            description: "Generation supply rate per kilowatt-hour, typically 12¢ to 28¢ depending on utility territory.",
          },
          {
            symbol: "Fixed Charge",
            name: "Basic Customer Service Charge",
            unit: "$/month",
            description: "Recurring flat service charge for maintaining meter connection and billing administration.",
          },
          {
            symbol: "Riders & Surcharges",
            name: "Transmission & Mandate Fees",
            unit: "$/month",
            description: "Distribution reliability fees, energy efficiency mandates, and local franchise assessments.",
          },
          {
            symbol: "Effective Rate",
            name: "All-In Unit Electricity Cost",
            unit: "$/kWh",
            description: "Calculated as Total Billed Dollars divided by Billed kWh (always higher than base supply rate).",
          },
        ]}
        notes={[
          "Nominal brochure rates exclude fixed customer fees and regulatory riders, understating your true unit electricity cost.",
          "Effective unit cost ($/kWh) decreases as monthly consumption rises because fixed fees are amortized over more kilowatt-hours.",
          "When sizing solar PV or battery backup systems, only the volumetric portion of your bill can be eliminated; fixed grid connection fees remain active under standard net metering tariffs.",
        ]}
      />

      {/* Step-by-Step Worked Example matching Single Source of Truth */}
      <WorkedExampleSection
        title="Authoritative Worked Example (900 kWh U.S. Household)"
        scenario="A standard single-family residential home consumes 900 kWh in a 30-day billing cycle. The utility charges a base commodity supply rate of $0.1600 per kWh, a fixed customer charge of $15.00, delivery and environmental riders of $18.00, and a municipal assessment of $8.00."
        steps={[
          {
            stepNumber: 1,
            title: "Calculate the Volumetric Energy Supply Charge",
            calculation: "Energy Charge = 900 kWh × $0.1600/kWh = $144.00",
            explanation: "Multiply total billed kilowatt-hours by the base generation energy rate.",
          },
          {
            stepNumber: 2,
            title: "Sum Fixed and Non-Volumetric Grid Charges",
            calculation: "Fixed & Riders = $15.00 (Customer Charge) + $18.00 (Riders) = $33.00",
            explanation: "These recurring fees cover physical poles, wires, substations, and mandated energy programs.",
          },
          {
            stepNumber: 3,
            title: "Compute Total Statement Amount Due",
            calculation: "Total Bill = $144.00 + $33.00 + $8.00 (Taxes) = $185.00",
            explanation: "Sum the volumetric energy charge, fixed fees, delivery riders, and municipal taxes.",
          },
          {
            stepNumber: 4,
            title: "Determine the True Effective Rate per Kilowatt-Hour",
            calculation: "Effective Rate = $185.00 ÷ 900 kWh = $0.2056 / kWh (20.56¢ / kWh)",
            explanation: "Dividing the total bill by total billed consumption reveals an effective rate +28.5% higher than the nominal $0.1600 brochure rate.",
          },
        ]}
        conclusion="The homeowner must pay $185.00 for the monthly billing cycle. While the base supply rate is 16.0¢ per kWh, the true all-in cost is 20.56¢ per kWh due to fixed connection fees and delivery charges."
      />

      {/* Assumptions & Variables */}
      <AssumptionsSection
        title="Billing Assumptions & Real-World Variables"
        description="Utility statements reflect complex tariff designs approved by state public utility commissions. Understanding these factors ensures accurate forecasting."
        assumptions={[
          {
            parameter: "Rate Tariff Structure",
            defaultVal: "Flat Volumetric ($0.16/kWh)",
            realisticRange: "Flat, Tiered (Inverted Block), or Time-of-Use (TOU)",
            impact: "Tiered tariffs bill consumption beyond baseline thresholds at higher rates; TOU plans price peak afternoon hours higher.",
          },
          {
            parameter: "Billing Period Length",
            defaultVal: "30 Days",
            realisticRange: "28 to 33 Calendar Days",
            impact: "A 33-day billing cycle naturally records higher total kWh usage than a 28-day cycle, even if daily lifestyle consumption is identical.",
          },
          {
            parameter: "Fixed Customer Charge",
            defaultVal: "$15.00 / month",
            realisticRange: "$8.00 to $35.00 / month",
            impact: "Rural electric cooperatives and low-density utilities typically impose higher fixed charges to maintain extensive distribution lines.",
          },
          {
            parameter: "Fuel & Power Cost Adjustments",
            defaultVal: "$18.00 riders included",
            realisticRange: "Fluctuates monthly based on natural gas prices",
            impact: "Utilities pass variable wholesale fuel prices directly to retail customers through monthly fuel cost adjustment riders.",
          },
        ]}
      />

      {/* Disclaimer */}
      <DisclaimerSection
        title="Utility Billing & Rate Estimation Disclaimer"
        points={[
          "This calculator provides planning estimates based on user-supplied rate parameters and standard tariff line-item structures.",
          "Electric utility tariffs vary widely across U.S. service territories and are subject to regulatory approvals by state Public Utility Commissions (PUCs) or municipal governing boards.",
          "Actual bills may include seasonal tiered adjustments, time-of-use pricing windows, power factor penalties (for commercial accounts), and estimated meter reads.",
          "For exact billing disputes, tariff schedules, or net metering interconnections, consult your official utility company statement or contact your electric service provider directly.",
        ]}
      />

      {/* Frequently Asked Questions */}
      <FaqSection
        title="Frequently Asked Questions: Electricity Costs & Electric Bills"
        faqs={[
          {
            question: "Why is my effective electricity rate higher than the rate quoted by my utility?",
            answer:
              "Electric utilities frequently market their base generation or commodity supply rate (for example, 16 cents per kWh). However, your final statement includes fixed monthly customer charges, transmission delivery fees, environmental mandates, and local taxes. Dividing your total bill by your billed kilowatt-hours produces your true effective rate, which is typically 20% to 35% higher than the nominal base rate.",
          },
          {
            question: "What is the difference between supply charges and delivery charges?",
            answer:
              "Supply charges (or generation charges) cover the cost of generating electricity at power plants. Delivery charges (or transmission and distribution charges) cover the physical infrastructure: high-voltage transmission lines, local poles, wires, transformers, and emergency repair crews needed to transport that power to your home.",
          },
          {
            question: "How much electricity does an average American home use per month?",
            answer:
              "According to the U.S. Energy Information Administration (EIA Form EIA-861M), the average U.S. residential home consumes approximately 890 to 900 kilowatt-hours (kWh) per month, resulting in an average monthly electric bill of roughly $155 to $165, depending on state electricity rates and climate conditions.",
          },
          {
            question: "Will installing solar panels eliminate my entire electric bill?",
            answer:
              "No. Even if your solar system generates 100% of the kilowatt-hours you consume over a month, most electric utilities still require you to pay a mandatory monthly fixed customer service charge (typically $10 to $25 per month) to remain interconnected to the electrical grid for nighttime and backup reliability.",
          },
          {
            question: "How do tiered or inverted block rate tariffs work?",
            answer:
              "Under a tiered rate structure, your monthly usage is divided into blocks. Tier 1 covers an essential baseline allowance (for example, up to 400 kWh) billed at a lower rate. Consumption exceeding that baseline enters Tier 2 or Tier 3, where every additional kilowatt-hour is billed at an increasingly higher rate to encourage energy conservation.",
          },
          {
            question: "How can I find out how many kWh specific appliances in my house use?",
            answer:
              "You can audit your appliances using our Electricity Use Calculator, which calculates daily and monthly Watt-hours and kilowatt-hours based on appliance nameplate wattage, hours of operation, and compressor duty cycles.",
          },
        ]}
      />

      {/* Related Calculators */}
      <RelatedCalculators
        calculators={[
          {
            title: "Electricity Use Calculator",
            description: "Calculate daily and monthly kWh consumption across household appliances with duty cycles.",
            href: "/electricity-use-calculator",
            category: "Electricity",
          },
          {
            title: "Watts to Amps Calculator",
            description: "Convert electrical wattage to circuit current across DC, 120V/240V single-phase, and 3-phase systems.",
            href: "/watts-to-amps-calculator",
            category: "Electrical Circuits",
          },
          {
            title: "Amps to Watts Calculator",
            description: "Convert circuit current and voltage to real electrical power (Watts) and apparent power (VA).",
            href: "/amps-to-watts-calculator",
            category: "Electrical Circuits",
          },
          {
            title: "Solar System Size Calculator",
            description: "Calculate solar panel system kW size and panel count to offset your monthly electricity bill.",
            href: "/solar-system-size-calculator",
            category: "Solar PV",
          },
        ]}
      />
    </CalculatorShell>
  );
};
