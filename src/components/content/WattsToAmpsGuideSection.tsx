import React from "react";
import Link from "next/link";
import { Zap, Calculator, Activity, ShieldCheck, AlertTriangle, Plug, Cpu, ArrowRight } from "lucide-react";

interface WattsToAmpsRow {
  watts: number;
  label: string;
  dc12v: string;
  ac120v: string;
  ac240v: string;
  minBreaker: string;
  minWire: string;
  typicalApp: string;
}

const WATTS_TO_AMPS_DATA: WattsToAmpsRow[] = [
  { watts: 37, label: "37 Watts", dc12v: "3.08 A", ac120v: "0.31 A", ac240v: "0.15 A", minBreaker: "15A", minWire: "14 AWG", typicalApp: "Desk fan, modem, LED aquarium light" },
  { watts: 60, label: "60 Watts", dc12v: "5.00 A", ac120v: "0.50 A", ac240v: "0.25 A", minBreaker: "15A", minWire: "14 AWG", typicalApp: "Standing lamp, compact soldering iron" },
  { watts: 100, label: "100 Watts", dc12v: "8.33 A", ac120v: "0.83 A", ac240v: "0.42 A", minBreaker: "15A", minWire: "14 AWG", typicalApp: "Laptop power adapter, small soundbar" },
  { watts: 120, label: "120 Watts", dc12v: "10.00 A", ac120v: "1.00 A", ac240v: "0.50 A", minBreaker: "15A", minWire: "14 AWG", typicalApp: "Slow cooker low setting, TV display" },
  { watts: 300, label: "300 Watts", dc12v: "25.00 A", ac120v: "2.50 A", ac240v: "1.25 A", minBreaker: "15A", minWire: "14 AWG", typicalApp: "Desktop workstation, refrigerator running" },
  { watts: 500, label: "500 Watts", dc12v: "41.67 A", ac120v: "4.17 A", ac240v: "2.08 A", minBreaker: "15A", minWire: "14 AWG", typicalApp: "Gaming PC under load, 1/3 HP sump pump" },
  { watts: 750, label: "750 Watts", dc12v: "62.50 A", ac120v: "6.25 A", ac240v: "3.13 A", minBreaker: "15A", minWire: "14 AWG", typicalApp: "1 HP motor, standard kitchen blender" },
  { watts: 1000, label: "1,000 Watts", dc12v: "83.33 A", ac120v: "8.33 A", ac240v: "4.17 A", minBreaker: "15A", minWire: "14 AWG", typicalApp: "Small microwave, steam iron, toaster" },
  { watts: 1200, label: "1,200 Watts", dc12v: "100.0 A", ac120v: "10.00 A", ac240v: "5.00 A", minBreaker: "15A", minWire: "14 AWG", typicalApp: "Hair dryer medium setting, waffle maker" },
  { watts: 1500, label: "1,500 Watts", dc12v: "125.0 A", ac120v: "12.50 A", ac240v: "6.25 A", minBreaker: "20A (Cont.)", minWire: "12 AWG", typicalApp: "Ceramic space heater, electric kettle" },
  { watts: 1800, label: "1,800 Watts", dc12v: "150.0 A", ac120v: "15.00 A", ac240v: "7.50 A", minBreaker: "20A (15A Max)", minWire: "12 AWG", typicalApp: "Commercial hair dryer, 15A branch peak" },
  { watts: 2000, label: "2,000 Watts", dc12v: "166.7 A", ac120v: "16.67 A", ac240v: "8.33 A", minBreaker: "25A / 15A", minWire: "10 / 14 AWG", typicalApp: "Large pressure cooker, table saw" },
  { watts: 2400, label: "2,400 Watts", dc12v: "200.0 A", ac120v: "20.00 A", ac240v: "10.00 A", minBreaker: "30A / 15A", minWire: "10 / 14 AWG", typicalApp: "Commercial microwave, 20A branch peak" },
  { watts: 3000, label: "3,000 Watts", dc12v: "250.0 A", ac120v: "25.00 A", ac240v: "12.50 A", minBreaker: "35A / 20A", minWire: "8 / 12 AWG", typicalApp: "RV 30A service peak, water heater" },
  { watts: 3600, label: "3,600 Watts", dc12v: "300.0 A", ac120v: "30.00 A", ac240v: "15.00 A", minBreaker: "40A / 20A", minWire: "8 / 12 AWG", typicalApp: "RV 30A full load, electric clothes dryer" },
  { watts: 5000, label: "5,000 Watts", dc12v: "416.7 A", ac120v: "41.67 A", ac240v: "20.83 A", minBreaker: "30A (240V)", minWire: "10 AWG", typicalApp: "Central AC compressor, water heater" },
  { watts: 7200, label: "7,200 Watts", dc12v: "600.0 A", ac120v: "60.00 A", ac240v: "30.00 A", minBreaker: "40A (240V)", minWire: "8 AWG", typicalApp: "Electric vehicle Level 2 charging (30A)" },
  { watts: 10000, label: "10,000 Watts", dc12v: "833.3 A", ac120v: "83.33 A", ac240v: "41.67 A", minBreaker: "60A (240V)", minWire: "6 AWG", typicalApp: "Whole-home standby generator backup, oven" },
];

export const WattsToAmpsGuideSection: React.FC = () => {
  return (
    <section className="mt-16 pt-12 border-t border-slate-200 space-y-12 text-slate-800">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5" />
          <span>Circuit Conductor Sizing &amp; Continuous Load Rules</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Watts to Amps Circuit Sizing: Breaker Ratings &amp; Conductor Ampacity Tables
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Calculating the current draw of any electrical load ensures circuit breakers, extension cords, and copper conductors operate safely without thermal overload or nuisance trips.
        </p>
      </div>

      {/* Sizing Formula Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-blue-600" />
          <span>The Watts to Amps Calculation Formula</span>
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Amperes measure the rate of electrical charge flow. To determine current from known power in watts, divide total wattage by the operating line voltage and load power factor:
        </p>
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 font-mono text-center text-sm sm:text-base text-slate-900 font-bold space-y-2">
          <div>Amps = Watts ÷ (Volts × Power Factor)</div>
          <div className="text-xs font-normal text-slate-600 font-sans">
            Direct Current (DC): Amps = Watts ÷ Volts | Single-Phase AC (Unity PF): Amps = Watts ÷ Volts
          </div>
        </div>
      </div>

      {/* Master Watts to Amps Lookup Table */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900">
          Watts to Amps Conversion Table (12V DC, 120V AC &amp; 240V AC)
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Comprehensive conversion chart across common residential wattages, specifying current draw, recommended NEC 125% breaker sizing, and minimum copper conductor gauge:
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white max-h-[560px] overflow-y-auto">
          <table className="min-w-full text-xs sm:text-sm text-left divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-700 font-bold sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="py-3 px-4">Power (Watts)</th>
                <th className="py-3 px-4">12V DC</th>
                <th className="py-3 px-4">120V AC</th>
                <th className="py-3 px-4">240V AC</th>
                <th className="py-3 px-4">NEC Breaker</th>
                <th className="py-3 px-4">Copper Wire</th>
                <th className="py-3 px-4">Common Applications</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {WATTS_TO_AMPS_DATA.map((row) => (
                <tr key={row.watts} className="hover:bg-slate-50/70 transition">
                  <td className="py-2.5 px-4 font-bold text-slate-900 font-mono">{row.label}</td>
                  <td className="py-2.5 px-4 font-mono text-slate-600">{row.dc12v}</td>
                  <td className="py-2.5 px-4 font-mono font-medium text-slate-800">{row.ac120v}</td>
                  <td className="py-2.5 px-4 font-mono text-blue-700 font-semibold">{row.ac240v}</td>
                  <td className="py-2.5 px-4 font-mono text-emerald-700 font-semibold">{row.minBreaker}</td>
                  <td className="py-2.5 px-4 font-mono text-slate-700 font-medium">{row.minWire}</td>
                  <td className="py-2.5 px-4 text-xs text-slate-500">{row.typicalApp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Worked Technical Sizing Sections */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900">
          Worked Technical Calculations &amp; Circuit Sizing Rules
        </h3>

        {/* 37 Watts to Amps */}
        <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-3">
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Plug className="w-5 h-5 text-blue-600" />
            <span>37 Watts to Amps: Household Devices &amp; DC Electronics</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            A 37-watt load represents typical low-power equipment like standing desk fans, LED fixtures, and networking hubs.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            On standard 120-volt AC power, 37 watts draws just 0.31 amps (37 ÷ 120). This places minimal load on a 15-amp branch circuit.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            When operating on a 12-volt battery system, that same 37-watt draw requires 3.08 amps (37 ÷ 12), demanding properly sized DC wiring to avoid voltage sag.
          </p>
        </div>

        {/* NEC 125% Continuous Rule */}
        <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-3">
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>The NEC 125% Rule for Circuit Breaker Sizing</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Under National Electrical Code Article 210.20, branch circuit overcurrent protective devices must be rated for at least 125% of continuous loads plus 100% of non-continuous loads.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            A continuous load is defined as any electrical load operating continuously for 3 hours or longer, such as space heaters, water heaters, and electric vehicle supply equipment.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            For example, a continuous 1,500-watt, 120-volt portable heater draws 12.5 amps. Sizing the breaker requires 12.5A × 1.25 = 15.625 amps, mandating a 20-amp branch circuit breaker.
          </p>
        </div>

        {/* Copper Conductor Sizing */}
        <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-3">
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-amber-600" />
            <span>American Wire Gauge (AWG) Sizing Standards</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Copper conductor sizing must match the circuit breaker rating to prevent overheating inside walls and electrical enclosures.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            NEC Table 310.16 specifies standard non-metallic sheathed cable limits: 14 AWG copper for 15-amp circuits, 12 AWG for 20-amp circuits, and 10 AWG for 30-amp circuits.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            For circuits exceeding 50 feet in length, consider up-sizing one wire gauge size to counteract resistive voltage drop and maintain clean terminal voltage.
          </p>
        </div>
      </div>
    </section>
  );
};
