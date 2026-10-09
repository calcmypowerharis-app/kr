"use client";

import React, { useState, useMemo } from "react";
import {
  calculateGeneratorFuel,
  GENERATOR_FUEL_PRESETS,
  FuelType,
  FuelUnit,
  GeneratorFuelInputs,
} from "@/lib/calculators/generator-fuel";
import { InputField } from "@/components/ui/InputField";
import { SelectField } from "@/components/ui/SelectField";
import { ResultCard } from "@/components/ui/ResultCard";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { FormulaSection } from "@/components/calculators/FormulaSection";
import { AssumptionsSection } from "@/components/calculators/AssumptionsSection";
import { DisclaimerSection } from "@/components/calculators/DisclaimerSection";
import { RelatedCalculators } from "@/components/calculators/RelatedCalculators";
import { Fuel, DollarSign, Clock, Zap } from "lucide-react";

export function GeneratorFuelCalculator() {
  const [calculationMode, setCalculationMode] = useState<"preset" | "custom">("preset");
  const [presetId, setPresetId] = useState<string>(GENERATOR_FUEL_PRESETS[0].id);
  const [customFuelType, setCustomFuelType] = useState<FuelType>("gasoline");
  const [customFuelUnit, setCustomFuelUnit] = useState<FuelUnit>("gallons");
  const [customConsumptionRate, setCustomConsumptionRate] = useState<number>(0.5);
  const [customTankSize, setCustomTankSize] = useState<number>(5);
  const [fuelPricePerUnit, setFuelPricePerUnit] = useState<number>(3.50);

  const results = useMemo(() => {
    try {
      const inputs: GeneratorFuelInputs = {
        calculationMode,
        presetId: calculationMode === "preset" ? presetId : undefined,
        customFuelType: calculationMode === "custom" ? customFuelType : undefined,
        customFuelUnit: calculationMode === "custom" ? customFuelUnit : undefined,
        customConsumptionRate: calculationMode === "custom" ? (Number(customConsumptionRate) || 0) : undefined,
        customTankSize: calculationMode === "custom" && customTankSize !== 0 ? Number(customTankSize) : undefined,
        fuelPricePerUnit: Number(fuelPricePerUnit) || 0,
      };
      return { data: calculateGeneratorFuel(inputs), error: null };
    } catch (err: any) {
      return { data: null, error: err.message || "Invalid input" };
    }
  }, [
    calculationMode,
    presetId,
    customFuelType,
    customFuelUnit,
    customConsumptionRate,
    customTankSize,
    fuelPricePerUnit,
  ]);

  const unitLabel = results.data ? results.data.fuelUnit : "units";
  
  const inputSectionContent = (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Fuel className="w-5 h-5 text-blue-600" />
        Generator Profile
      </h2>
      
      <SelectField
        id="calculationMode"
        label="Calculation Mode"
        value={calculationMode}
        onChange={(v) => setCalculationMode(v as "preset" | "custom")}
        options={[
          { value: "preset", label: "Select from Common Models" },
          { value: "custom", label: "Enter Custom Specs" },
        ]}
        helpText="Choose a common generator or enter your own numbers."
      />

      {calculationMode === "preset" ? (
        <div className="space-y-3">
          <SelectField
            id="presetId"
            label="Generator Model & Load"
            value={presetId}
            onChange={setPresetId}
            options={GENERATOR_FUEL_PRESETS.map((p) => ({
              value: p.id,
              label: p.name,
            }))}
            helpText="Fuel consumption varies heavily by applied load."
          />
          {(() => {
            const selectedPreset = GENERATOR_FUEL_PRESETS.find((p) => p.id === presetId);
            if (!selectedPreset) return null;
            return (
              <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                <span className="font-semibold text-slate-700">Source: </span>
                {selectedPreset.source}{" "}
                {selectedPreset.sourceUrl && (
                  <a
                    href={selectedPreset.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 underline font-medium inline-flex items-center gap-1 ml-1"
                  >
                    View Official Documentation &rarr;
                  </a>
                )}
              </div>
            );
          })()}
        </div>
      ) : (
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <SelectField
            id="customFuelType"
            label="Fuel Type"
            value={customFuelType}
            onChange={(v) => {
              const newType = v as FuelType;
              setCustomFuelType(newType);
              if (newType === "propane") setCustomFuelUnit("lbs");
              else if (newType === "natural_gas") setCustomFuelUnit("ccf");
              else setCustomFuelUnit("gallons");
            }}
            options={[
              { value: "gasoline", label: "Gasoline" },
              { value: "propane", label: "Propane" },
              { value: "diesel", label: "Diesel" },
              { value: "natural_gas", label: "Natural Gas" },
            ]}
          />
          <SelectField
            id="customFuelUnit"
            label="Fuel Unit"
            value={customFuelUnit}
            onChange={(v) => setCustomFuelUnit(v as FuelUnit)}
            options={
                customFuelType === "gasoline" || customFuelType === "diesel" 
                  ? [{ value: "gallons", label: "Gallons" }]
                  : customFuelType === "propane" 
                  ? [{ value: "gallons", label: "Gallons" }, { value: "lbs", label: "Pounds (lbs)" }]
                  : [{ value: "ccf", label: "CCF (100 Cubic Ft)" }]
              }
          />
          <InputField
            id="customConsumptionRate"
            label={`Consumption Rate (${customFuelUnit}/hr)`}
            min={0}
            step={0.01}
            value={customConsumptionRate}
            onChange={setCustomConsumptionRate}
            placeholder="e.g. 0.5"
            helpText="Check your owner's manual for 50% or 100% load specs."
          />
          <InputField
            id="customTankSize"
            label={`Fuel Tank Size (${customFuelUnit})`}
            min={0}
            step={0.1}
            value={customTankSize}
            onChange={setCustomTankSize}
            placeholder="Optional tank capacity"
            helpText="Leave blank if unlimited (like utility natural gas)."
          />
        </div>
      )}

      <div className="mt-6 pt-6 border-t border-slate-100">
        <InputField
          id="fuelPricePerUnit"
          label={`Fuel Price per ${calculationMode === "preset" ? GENERATOR_FUEL_PRESETS.find(p => p.id === presetId)?.fuelUnit || 'unit' : customFuelUnit} ($)`}
          min={0}
          step={0.01}
          value={fuelPricePerUnit}
          onChange={setFuelPricePerUnit}
          placeholder="e.g. 3.50"
          helpText="Enter local prices to calculate operating cost."
        />
      </div>
    </div>
  );

  const resultSectionContent = (
    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
      <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Zap className="w-5 h-5 text-amber-500" />
        Consumption & Cost Estimates
      </h3>
      
      {results.error ? (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
          {results.error}
        </div>
      ) : results.data ? (
        <div className="space-y-6">
                    <div className="flex flex-col gap-4">
            <ResultCard
              primaryTitle="Hourly Consumption"
              primaryValue={`${results.data.consumptionPerHour.toFixed(2)} ${unitLabel}/hr`}
              icon="zap"
              stats={[
                { label: "Hourly Cost", value: `${results.data.costPerHour.toFixed(2)}`, unit: "/hr" }
              ]}
            />
          </div>

          {results.data.tankRuntimeHours !== null && isFinite(results.data.tankRuntimeHours) && (
            <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Full Tank Runtime ({results.data.tankSize} {unitLabel})
                </h4>
                <div className="text-2xl font-bold text-slate-800">
                  {results.data.tankRuntimeHours.toFixed(1)} Hours
                </div>
              </div>
              <Clock className="w-10 h-10 text-slate-300" />
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-100 px-4 py-3 border-b border-slate-200">
              <h4 className="font-semibold text-slate-700">Fuel Required Over Time</h4>
            </div>
            <div className="divide-y divide-slate-100">
              <div className="flex justify-between p-4 hover:bg-slate-50">
                <span className="text-slate-600 font-medium">4 Hours</span>
                <span className="font-bold text-slate-800">{results.data.fuelFor4Hours.toFixed(2)} {unitLabel}</span>
              </div>
              <div className="flex justify-between p-4 hover:bg-slate-50">
                <span className="text-slate-600 font-medium">8 Hours</span>
                <span className="font-bold text-slate-800">{results.data.fuelFor8Hours.toFixed(2)} {unitLabel}</span>
              </div>
              <div className="flex justify-between p-4 hover:bg-slate-50">
                <span className="text-slate-600 font-medium">12 Hours</span>
                <span className="font-bold text-slate-800">{results.data.fuelFor12Hours.toFixed(2)} {unitLabel}</span>
              </div>
              <div className="flex justify-between p-4 bg-slate-50">
                <span className="text-slate-800 font-bold">24 Hours (Full Day)</span>
                <span className="font-bold text-slate-900">{results.data.fuelFor24Hours.toFixed(2)} {unitLabel} <span className="text-slate-500 font-normal text-sm ml-2">(${results.data.costFor24Hours.toFixed(2)})</span></span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );

  return (
    <CalculatorShell
      title="Generator Fuel Consumption Calculator"
      category="Generators"
      description="Estimate fuel usage, run times, and operating costs for your portable or standby generator."
      inputSection={inputSectionContent}
      resultSection={resultSectionContent}
    >
      <div className="mt-12 space-y-8">
        <FormulaSection
          title="How Fuel Consumption is Calculated"
          description="Generator fuel consumption is almost entirely dictated by the engine size and the electrical load placed on the generator. An inverter generator running at 25% load will consume significantly less fuel per hour than the same generator running at 100% capacity."
          formulaDisplay="Hourly Cost = Consumption Rate x Price per Unit"
          variables={[
            {
              name: "Consumption Rate",
              symbol: "R",
              unit: "gal/hr",
              description: "The volume of fuel the generator consumes in one hour at the specific load.",
            },
            {
              name: "Price per Unit",
              symbol: "P",
              unit: "$",
              description: "The local cost of the fuel per gallon or pound.",
            }
          ]}
          notes={[
            "Runtime (Hours) = Tank Capacity / Consumption Rate"
          ]}
        />

        <AssumptionsSection
          description="Real-world fuel consumption differs slightly from preset estimates. Here are the core assumptions used in this calculator:"
          assumptions={[
            ...(calculationMode === "preset"
              ? [
                  {
                    parameter: "Preset Data Source",
                    defaultVal: "Manufacturer Specs",
                    realisticRange: "Fixed per model",
                    impact: "Data derived: " + (GENERATOR_FUEL_PRESETS.find(p => p.id === presetId)?.source || "Manufacturer Spec Sheet"),
                  }
                ]
              : []),
            {
              parameter: "Pricing Model",
              defaultVal: "Linear",
              realisticRange: "Linear (varies by volume discounts)",
              impact: "Assumes price per unit remains constant regardless of the total amount purchased."
            },
            {
              parameter: "Load Variation",
              defaultVal: "Steady-State",
              realisticRange: "Highly variable",
              impact: "Presets assume exactly 50% or 100% load continuously. Real-world consumption cycles with appliance usage."
            },
            {
              parameter: "Environmental Factors",
              defaultVal: "Standard rating",
              realisticRange: "Standard +/- 10%",
              impact: "Temperature, altitude, and generator maintenance status slightly alter physical fuel efficiency."
            }
          ]}
        />
        
        <RelatedCalculators
          calculators={[
            {
              title: "Generator Size Calculator",
              href: "/generator-size-calculator",
              description: "Calculate exactly what size generator you need to run your appliances.",
              category: "Generators"
            },
            {
              title: "Electricity Cost Calculator",
              href: "/electricity-cost-calculator",
              description: "Compare your generator running costs to standard grid electricity.",
              category: "Cost & Usage"
            }
          ]}
        />

        <DisclaimerSection />
      </div>
    </CalculatorShell>
  );
}
