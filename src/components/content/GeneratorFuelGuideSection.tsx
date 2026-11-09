import React from "react";
import Link from "next/link";
import {
  Fuel,
  Calculator,
  Clock,
  Activity,
  AlertTriangle,
  ShieldCheck,
  Wrench,
  Flame,
  Droplet,
  Gauge,
  ThermometerSnowflake,
  Mountain,
  Compass,
  Zap,
} from "lucide-react";

interface FuelBurnMatrixRow {
  modelClass: string;
  engineType: string;
  fuelType: string;
  load25: string;
  load50: string;
  load75: string;
  load100: string;
  fuel24h50: string;
}

const FUEL_BURN_MATRIX: FuelBurnMatrixRow[] = [
  {
    modelClass: "2,000W to 2,200W",
    engineType: "Inverter (79cc to 121cc OHV)",
    fuelType: "Gasoline",
    load25: "0.10 GPH",
    load50: "0.15 GPH",
    load75: "0.20 GPH",
    load100: "0.25 GPH",
    fuel24h50: "3.6 Gal",
  },
  {
    modelClass: "2,000W to 2,200W",
    engineType: "Inverter (Dual-Fuel)",
    fuelType: "Propane (LPG)",
    load25: "0.13 GPH (0.55 lb/h)",
    load50: "0.19 GPH (0.81 lb/h)",
    load75: "0.26 GPH (1.10 lb/h)",
    load100: "0.32 GPH (1.36 lb/h)",
    fuel24h50: "4.6 Gal (19.4 lbs)",
  },
  {
    modelClass: "3,500W to 4,500W",
    engineType: "Portable (208cc to 224cc OHV)",
    fuelType: "Gasoline",
    load25: "0.25 GPH",
    load50: "0.38 GPH",
    load75: "0.48 GPH",
    load100: "0.55 GPH",
    fuel24h50: "9.1 Gal",
  },
  {
    modelClass: "3,500W to 4,500W",
    engineType: "Portable (Dual-Fuel)",
    fuelType: "Propane (LPG)",
    load25: "0.33 GPH (1.40 lb/h)",
    load50: "0.49 GPH (2.08 lb/h)",
    load75: "0.62 GPH (2.63 lb/h)",
    load100: "0.72 GPH (3.05 lb/h)",
    fuel24h50: "11.8 Gal (49.9 lbs)",
  },
  {
    modelClass: "7,500W to 9,000W",
    engineType: "Heavy Open Frame (389cc to 459cc)",
    fuelType: "Gasoline",
    load25: "0.45 GPH",
    load50: "0.70 GPH",
    load75: "0.95 GPH",
    load100: "1.25 GPH",
    fuel24h50: "16.8 Gal",
  },
  {
    modelClass: "7,500W to 9,000W",
    engineType: "Heavy Open Frame (Dual-Fuel)",
    fuelType: "Propane (LPG)",
    load25: "0.58 GPH (2.46 lb/h)",
    load50: "0.91 GPH (3.86 lb/h)",
    load75: "1.24 GPH (5.26 lb/h)",
    load100: "1.63 GPH (6.91 lb/h)",
    fuel24h50: "21.8 Gal (92.6 lbs)",
  },
  {
    modelClass: "10,000W to 12,000W",
    engineType: "Commercial V-Twin (670cc to 720cc)",
    fuelType: "Gasoline",
    load25: "0.65 GPH",
    load50: "1.05 GPH",
    load75: "1.45 GPH",
    load100: "1.90 GPH",
    fuel24h50: "25.2 Gal",
  },
  {
    modelClass: "10,000W to 12,000W",
    engineType: "Commercial V-Twin (Dual-Fuel)",
    fuelType: "Propane (LPG)",
    load25: "0.85 GPH (3.60 lb/h)",
    load50: "1.37 GPH (5.81 lb/h)",
    load75: "1.89 GPH (8.01 lb/h)",
    load100: "2.47 GPH (10.47 lb/h)",
    fuel24h50: "32.9 Gal (139.4 lbs)",
  },
  {
    modelClass: "18,000W to 22,000W",
    engineType: "Standby V-Twin (999cc OHV)",
    fuelType: "Propane (LPG)",
    load25: "1.42 GPH (6.02 lb/h)",
    load50: "2.16 GPH (9.16 lb/h)",
    load75: "2.95 GPH (12.51 lb/h)",
    load100: "3.85 GPH (16.32 lb/h)",
    fuel24h50: "51.8 Gal (219.8 lbs)",
  },
  {
    modelClass: "18,000W to 22,000W",
    engineType: "Standby V-Twin (999cc OHV)",
    fuelType: "Natural Gas",
    load25: "155 cu ft/h (1.55 CCF)",
    load50: "245 cu ft/h (2.45 CCF)",
    load75: "335 cu ft/h (3.35 CCF)",
    load100: "420 cu ft/h (4.20 CCF)",
    fuel24h50: "58.8 CCF (5,880 cu ft)",
  },
  {
    modelClass: "30,000W to 35,000W",
    engineType: "Stationary Liquid-Cooled (3.3L Diesel)",
    fuelType: "Diesel #2",
    load25: "0.95 GPH",
    load50: "1.55 GPH",
    load75: "2.15 GPH",
    load100: "2.80 GPH",
    fuel24h50: "37.2 Gal",
  },
];

export const GeneratorFuelGuideSection: React.FC = () => {
  return (
    <section className="mt-16 pt-12 border-t border-slate-200 space-y-12 text-slate-800">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider">
          <Fuel className="w-3.5 h-3.5" />
          <span>Engineering Fuel Planning &amp; Consumption Standard</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Generator Fuel Consumption Guide: Burn Rates, Fuel Density &amp; Storage Sizing
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Generator fuel consumption depends on engine displacement, electrical load percentage, governor throttling design, and fuel energy density.
        </p>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Whether planning emergency residential backup, job site power, or commercial facility compliance, estimating fuel burn ensures continuous operation without premature outages.
        </p>
      </div>

      {/* Section 1: Thermodynamic Energy Densities & Specific Fuel Consumption */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
            <Flame className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            1. Thermodynamic Fuel Energy Densities and Brake Specific Fuel Consumption
          </h3>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          Internal combustion engines convert chemical energy stored in fuel hydrocarbons into rotational mechanical shaft work. The electrical generator alternator converts that mechanical torque into usable AC voltage.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          The rate at which a generator burns fuel is governed by the fuel lower heating value, thermal efficiency, and mechanical pumping friction.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-rose-600">Diesel #2</div>
            <div className="text-lg font-black text-slate-900">138,500 BTU / Gal</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Thermal efficiency reaches 32% to 38%. Diesel engines generate 12.5 to 14.0 kWh of electrical output per gallon consumed.
            </p>
            <div className="text-xs font-mono text-slate-700 bg-white p-2 rounded border border-slate-200">
              BSFC: 0.071 to 0.080 gal/kWh
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-600">Gasoline (87 Octane)</div>
            <div className="text-lg font-black text-slate-900">114,000 BTU / Gal</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Thermal efficiency averages 20% to 26%. Spark-ignition gasoline engines deliver 7.0 to 8.5 kWh per gallon under steady load.
            </p>
            <div className="text-xs font-mono text-slate-700 bg-white p-2 rounded border border-slate-200">
              BSFC: 0.118 to 0.143 gal/kWh
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600">Liquid Propane (HD-5)</div>
            <div className="text-lg font-black text-slate-900">91,500 BTU / Gal</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Thermal efficiency averages 19% to 24%. Delivers 5.5 to 6.8 kWh per gallon. Continuous generator output derates by 10% to 15%.
            </p>
            <div className="text-xs font-mono text-slate-700 bg-white p-2 rounded border border-slate-200">
              BSFC: 0.147 to 0.182 gal/kWh
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-600">Natural Gas (Methane)</div>
            <div className="text-lg font-black text-slate-900">1,000 BTU / cu ft</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Thermal efficiency averages 18% to 22%. Yields 6.0 to 7.5 kWh per CCF (100 cu ft). Peak electrical output derates by 15% to 20%.
            </p>
            <div className="text-xs font-mono text-slate-700 bg-white p-2 rounded border border-slate-200">
              BSFC: 13.3 to 16.6 cu ft/kWh
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          Because propane and natural gas carry lower volumetric energy density than gasoline, dual-fuel and tri-fuel engines consume more fuel volume to generate identical wattage. Always account for fuel type deratings when sizing hardware with our <Link href="/generator-size-calculator" className="text-blue-600 hover:underline font-semibold">generator sizing calculator</Link>.
        </p>
      </div>

      {/* Section 2: Master Multi-Fuel Burn Rate Matrix Table */}
      <div className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Gauge className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            2. Master Multi-Fuel Hourly Burn Rate Matrix Table
          </h3>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          Fuel consumption scales non-linearly with electrical load. The reference matrix below compares median hourly burn rates across six generator classes from quarter load to continuous peak rating.
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
          <table className="min-w-full text-xs sm:text-sm text-left divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-700 font-bold">
              <tr>
                <th className="py-3 px-3">Generator Class</th>
                <th className="py-3 px-3">Engine Configuration</th>
                <th className="py-3 px-3">Fuel Type</th>
                <th className="py-3 px-3">25% Load</th>
                <th className="py-3 px-3">50% Load</th>
                <th className="py-3 px-3">75% Load</th>
                <th className="py-3 px-3">100% Load</th>
                <th className="py-3 px-3">24-Hr Total (50% Load)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {FUEL_BURN_MATRIX.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 1 ? "bg-slate-50/50" : ""}>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{row.modelClass}</td>
                  <td className="py-2.5 px-3 text-slate-600">{row.engineType}</td>
                  <td className="py-2.5 px-3 font-medium text-slate-800">{row.fuelType}</td>
                  <td className="py-2.5 px-3 font-mono">{row.load25}</td>
                  <td className="py-2.5 px-3 font-mono font-semibold text-blue-700">{row.load50}</td>
                  <td className="py-2.5 px-3 font-mono">{row.load75}</td>
                  <td className="py-2.5 px-3 font-mono">{row.load100}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-emerald-700">{row.fuel24h50}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          Values represent median test data across certified manufacturers including Honda, Generac, Cummins, Kohler, Champion, and Caterpillar under standard atmospheric conditions (77 degrees Fahrenheit, sea level).
        </p>
      </div>

      {/* Section 3: Inverter Variable Throttling vs Synchronous 3600 RPM */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <Activity className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            3. Inverter Variable-Speed Throttling vs. Fixed 3,600 RPM Alternators
          </h3>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          The mechanical governing mechanism of an engine drastically impacts fuel economy under partial electrical loads. Traditional open-frame generators produce alternating current directly from copper rotor windings.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          To maintain standard 60 Hertz electrical frequency, a two-pole synchronous alternator must spin at an exact fixed rotational speed:
        </p>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 font-mono text-center text-sm text-slate-900 font-bold">
          Speed (RPM) = (120 × Frequency) ÷ Poles = (120 × 60 Hz) ÷ 2 = 3,600 RPM
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          Even with zero electrical loads connected, an open-frame engine running at 3,600 RPM expends substantial energy overcoming internal friction, valve spring resistance, and cooling fan drag.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          At a light 25% load, an open-frame unit still burns 40% to 50% of its maximum full-load fuel. This fixed overhead wastes fuel during overnight operation.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          Digital inverter generators resolve this efficiency penalty. Inverter units produce high-frequency multi-phase AC power, rectify it to direct current, and rebuild a 120V 60Hz pure sine wave via microprocessor pulse-width modulation.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          Because output frequency is electronically synthesized, engine speed varies dynamically from 2,000 RPM at light load up to 4,000 RPM at rated peak.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          Activating Eco-Mode on an inverter generator cuts overnight fuel consumption by 30% to 40%. This savings preserves fuel reserves during multi-day disaster outages.
        </p>
      </div>

      {/* Section 4: Altitude and Temperature Derating Calculations */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
            <Mountain className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            4. Altitude and Ambient Temperature Derating Calculations
          </h3>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          Engine power specifications follow ISO 3046 and SAE J1349 standards. Baseline conditions assume sea level elevation up to 328 feet, 77 degrees Fahrenheit ambient temperature, and 29.53 inches of mercury atmospheric pressure.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          As elevation increases, air density decreases. Because atmospheric oxygen thins out, an engine draws less oxygen mass into each cylinder stroke, reducing peak mechanical torque and power output.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-600" />
              <span>Elevation Derating Formula (3.5% per 1,000 ft)</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Naturally aspirated small engines lose 3.5% of rated power for every 1,000 feet of altitude above sea level:
            </p>
            <div className="text-xs font-mono bg-white p-2.5 rounded border border-slate-200 text-slate-800">
              Derate % = (Elevation in Feet ÷ 1,000) × 3.5%
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              For example, in Denver, Colorado (5,280 feet altitude), the power derating calculation yields:
            </p>
            <div className="text-xs font-mono bg-white p-2.5 rounded border border-slate-200 text-slate-800">
              5.28 × 3.5% = 18.48% Power Loss
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              A 7,500-Watt generator provides only 6,114 Watts of usable capacity. Failing to derate causes engine bogging and unexpected overload shutdowns.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ThermometerSnowflake className="w-4 h-4 text-cyan-600" />
              <span>Temperature &amp; Cold-Weather Physics</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              High ambient temperatures reduce air density. Generators derate by 1.0% for every 10 degrees Fahrenheit above 77 degrees Fahrenheit.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Conversely, sub-freezing winter weather increases fuel consumption. Cold dense air requires choke enrichment, burning 15% to 25% extra fuel during startup.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Propane vaporization drops drastically in winter. A 20-pound cylinder at 0 degrees Fahrenheit delivers insufficient vapor pressure for loads over 25,000 BTU/hr, requiring larger 100-gallon tanks.
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          Above 2,500 feet, carburetor re-jetting is necessary for spark-ignition engines. Installing a high-altitude carburetor jet restores correct air-fuel mixture, preventing fouled spark plugs and excessive fuel waste.
        </p>
      </div>

      {/* Section 5: NFPA 110 Emergency Power Supply Fuel Storage Standards */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            5. NFPA 110 Emergency Power Supply Fuel Storage Standards
          </h3>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          For commercial installations, emergency facilities, and critical municipal infrastructure, fuel storage sizing is regulated by NFPA 110 (Standard for Emergency and Standby Power Systems).
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          NFPA 110 defines Emergency Power Supply (EPS) system classes according to the minimum duration the system must operate without refueling:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-1">
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-center">
            <div className="font-bold text-slate-900 text-sm">Class 2</div>
            <div className="text-xs text-slate-500">2 Hours Minimum</div>
            <div className="text-xs text-slate-600 pt-1">Life safety egress</div>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-center">
            <div className="font-bold text-slate-900 text-sm">Class 6</div>
            <div className="text-xs text-slate-500">6 Hours Minimum</div>
            <div className="text-xs text-slate-600 pt-1">Water pumping stations</div>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-center">
            <div className="font-bold text-slate-900 text-sm">Class 48</div>
            <div className="text-xs text-slate-500">48 Hours Minimum</div>
            <div className="text-xs text-slate-600 pt-1">Hospitals &amp; telecom</div>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-center">
            <div className="font-bold text-slate-900 text-sm">Class 72</div>
            <div className="text-xs text-slate-500">72 Hours Minimum</div>
            <div className="text-xs text-slate-600 pt-1">Severe hurricane zones</div>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-center">
            <div className="font-bold text-slate-900 text-sm">Class 96</div>
            <div className="text-xs text-slate-500">96 Hours Minimum</div>
            <div className="text-xs text-slate-600 pt-1">Remote substations</div>
          </div>
        </div>

        <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-950 text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>The 133% Storage Rule (NFPA 110 Section 5.1.1)</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            NFPA 110 Section 5.1.1 mandates that on-site fuel storage must provide at least 133% of the required operational class duration at the maximum anticipated load.
          </p>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            For a Class 48 emergency hospital installation, the fuel storage system must provide 63.8 hours of autonomous operation before accounting for tank bottom sediment.
          </p>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          Usable tank volume calculations must deduct 5% to 10% bottom sediment volume that fuel pickup pipes cannot reach, as well as 5% upper vapor ullage for thermal expansion.
        </p>
      </div>

      {/* Section 6: Four Worked Outage Planning Scenarios */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            6. Four Worked Real-World Outage Planning Scenarios
          </h3>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          Review these real-world worked scenarios to plan accurate fuel budgets for residential, mobile, and commercial power systems.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Scenario A */}
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100/70 px-2.5 py-0.5 rounded">
                Scenario A
              </span>
              <span className="text-xs font-semibold text-slate-500">72-Hour Winter Storm</span>
            </div>
            <h4 className="text-base font-bold text-slate-900">
              7,500W Dual-Fuel Generator (Gasoline vs. Propane)
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              A homeowner runs critical circuits (furnace blower, refrigerator, well pump) averaging 3,750W (50% load).
            </p>
            <div className="space-y-1.5 text-xs font-mono bg-white p-3 rounded border border-slate-200 text-slate-800">
              <div>Continuous 24-hr/day: 50.4 Gal gas vs. 245 lbs propane</div>
              <div>Intermittent 12-hr/day: 25.2 Gal gas vs. 122 lbs propane</div>
              <div>Storage Requirement: Five 5-gal gas cans or three 40-lb propane tanks</div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Intermittent 12-hour cycling preserves half the fuel while keeping homes heated and food safely frozen.
            </p>
          </div>

          {/* Scenario B */}
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded">
                Scenario B
              </span>
              <span className="text-xs font-semibold text-slate-500">Mobile Off-Grid RV</span>
            </div>
            <h4 className="text-base font-bold text-slate-900">
              2,200W Inverter Generator on Gasoline with Eco-Mode
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Camper operates LED lighting, laptops, ventilation, and a portable refrigerator, averaging 400W load.
            </p>
            <div className="space-y-1.5 text-xs font-mono bg-white p-3 rounded border border-slate-200 text-slate-800">
              <div>Average Burn Rate: 0.12 GPH with Eco-Throttle active</div>
              <div>Operating Profile: 12 hours daily over a 4-day weekend (48 hours total)</div>
              <div>Total Fuel Consumed: 48 hrs × 0.12 GPH = 5.76 Gallons</div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              A single 6-gallon fuel container covers the entire 4-day trip comfortably. Pair with our <Link href="/battery-capacity-calculator" className="text-blue-600 hover:underline font-semibold">battery capacity calculator</Link> for hybrid solar setups.
            </p>
          </div>

          {/* Scenario C */}
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-100/70 px-2.5 py-0.5 rounded">
                Scenario C
              </span>
              <span className="text-xs font-semibold text-slate-500">Whole-House Standby</span>
            </div>
            <h4 className="text-base font-bold text-slate-900">
              22kW Standby Generator (Natural Gas vs. 500-Gal Propane)
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automatic transfer switch powers entire 2,800-sq-ft residence during an extended 5-day grid outage.
            </p>
            <div className="space-y-1.5 text-xs font-mono bg-white p-3 rounded border border-slate-200 text-slate-800">
              <div>Average Diversified Load: 8,000 Watts (~36% capacity)</div>
              <div>Natural Gas Burn: 1.95 CCF/hr × 120 hrs = 234 CCF (23,400 cu ft)</div>
              <div>Propane Burn: 1.75 GPH × 120 hrs = 210 Gallons propane</div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              A 500-gallon propane tank filled to 80% (400 gallons) easily sustains the complete 5-day blackout.
            </p>
          </div>

          {/* Scenario D */}
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-2.5 py-0.5 rounded">
                Scenario D
              </span>
              <span className="text-xs font-semibold text-slate-500">Critical Commercial EPS</span>
            </div>
            <h4 className="text-base font-bold text-slate-900">
              35kW Stationary Diesel Generator under NFPA 110 Class 48
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Outpatient surgical clinic requires 48 hours of continuous emergency operation at 18kW average load.
            </p>
            <div className="space-y-1.5 text-xs font-mono bg-white p-3 rounded border border-slate-200 text-slate-800">
              <div>Burn Rate at 50% Load: 1.55 GPH Diesel #2</div>
              <div>Base 48-Hour Burn: 48 hrs × 1.55 GPH = 74.4 Gallons</div>
              <div>133% NFPA 110 Mandate: 74.4 × 1.33 = 98.95 Gallons Net Usable</div>
              <div>Total Tank Specification: 120-Gallon belly sub-base fuel tank</div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              A 120-gallon sub-base tank provides the required 99 gallons usable capacity while leaving reserve for sediment and expansion.
            </p>
          </div>
        </div>
      </div>

      {/* Section 7: Fuel Storage Safety, Stabilization & Maintenance */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
            <Wrench className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            7. Fuel Storage Safety, Chemical Stabilization and Maintenance
          </h3>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          Stored fuels degrade over time through oxidation, moisture condensation, and microbial contamination. Protecting generator fuel systems requires disciplined storage protocols.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
              <Droplet className="w-4 h-4" />
              <span>Gasoline Stabilization</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Standard pump gasoline contains up to 10% ethanol (E10). Ethanol is hygroscopic, drawing atmospheric water into the fuel tank.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Within 30 to 60 days, phase separation occurs, causing water and ethanol to settle at the bottom. This mixture ruins carburetors.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Always treat stored gasoline with a dedicated fuel stabilizer immediately upon purchase. Stabilizer extends gasoline viability to 12 to 24 months.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
              <Flame className="w-4 h-4" />
              <span>Propane Tank Integrity</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Propane (LPG) does not oxidize, gum up orifices, or degrade. It maintains infinite shelf life inside certified ASME or DOT pressure vessels.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              NFPA 58 mandates storing propane cylinders outdoors in well-ventilated areas, away from building openings, basements, and air conditioning intakes.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Inspect rubber flexible regulator hoses annually for dry rot or micro-cracking to prevent high-pressure fuel leaks.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>Diesel Fuel Polishing</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Diesel #2 degrades through bacterial and fungal growth that thrives at the fuel-water boundary in storage tanks.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Microbial slime clogs 10-micron fuel filters and causes fuel starvation during emergency generator startup.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Treat diesel tanks with biocide additives, install water-separating primary filters, and perform fuel polishing every 12 to 24 months.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-slate-700" />
              <span>Engine Oil Inspection Intervals</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Small air-cooled generator engines hold less than one quart of oil and lack pressurized filters. Check engine oil every 24 continuous operating hours.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Perform complete oil and filter changes every 50 to 100 hours during prolonged blackouts to prevent engine failure.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Preventing Diesel Wet Stacking</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Diesel generators operated below 30% rated electrical capacity suffer from wet stacking. Low combustion cylinder temperatures prevent fuel from atomizing completely.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Unburned diesel collects in exhaust manifolds and turbochargers. Exercise diesel units with a load bank at 70% or higher capacity periodically.
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          For electrical branch circuit wiring and feeder cable sizing from generator transfer switches, verify voltage drop with our <Link href="/voltage-drop-calculator" className="text-blue-600 hover:underline font-semibold">voltage drop calculator</Link> and calculate continuous breaker ampacities using our <Link href="/watts-to-amps-calculator" className="text-blue-600 hover:underline font-semibold">watts to amps calculator</Link>.
        </p>
      </div>
    </section>
  );
};
