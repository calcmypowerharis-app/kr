import React from "react";
import Link from "next/link";
import { Zap, Calculator, Activity, ShieldCheck, AlertTriangle, Plug, Cpu } from "lucide-react";

interface AmpsToWattsRow {
  amps: number;
  label: string;
  dc12v: string;
  ac120vPeak: string;
  ac120vCont: string;
  ac240vPeak: string;
  ac240vCont: string;
  typicalApp: string;
}

const AMPS_TO_WATTS_DATA: AmpsToWattsRow[] = [
  { amps: 1, label: "1 Amp", dc12v: "12 W", ac120vPeak: "120 W", ac120vCont: "96 W", ac240vPeak: "240 W", ac240vCont: "192 W", typicalApp: "LED bulb bank, WiFi router" },
  { amps: 1.5, label: "1.5 Amps", dc12v: "18 W", ac120vPeak: "180 W", ac120vCont: "144 W", ac240vPeak: "360 W", ac240vCont: "288 W", typicalApp: "Desktop monitor, audio receiver" },
  { amps: 2.4, label: "2.4 Amps", dc12v: "28.8 W", ac120vPeak: "288 W", ac120vCont: "230 W", ac240vPeak: "576 W", ac240vCont: "461 W", typicalApp: "USB-C fast charger, gaming console idle" },
  { amps: 2.5, label: "2.5 Amps", dc12v: "30 W", ac120vPeak: "300 W", ac120vCont: "240 W", ac240vPeak: "600 W", ac240vCont: "480 W", typicalApp: "Ceiling fan, laptop power supply" },
  { amps: 3, label: "3 Amps", dc12v: "36 W", ac120vPeak: "360 W", ac120vCont: "288 W", ac240vPeak: "720 W", ac240vCont: "576 W", typicalApp: "3D printer, CPAP machine" },
  { amps: 4, label: "4 Amps", dc12v: "48 W", ac120vPeak: "480 W", ac120vCont: "384 W", ac240vPeak: "960 W", ac240vCont: "768 W", typicalApp: "High-end desktop PC, TV + soundbar" },
  { amps: 6, label: "6 Amps", dc12v: "72 W", ac120vPeak: "720 W", ac120vCont: "576 W", ac240vPeak: "1,440 W", ac240vCont: "1,152 W", typicalApp: "Full-size refrigerator running, food processor" },
  { amps: 6.5, label: "6.5 Amps", dc12v: "78 W", ac120vPeak: "780 W", ac120vCont: "624 W", ac240vPeak: "1,560 W", ac240vCont: "1,248 W", typicalApp: "Compact microwave, dehumidifier" },
  { amps: 8, label: "8 Amps", dc12v: "96 W", ac120vPeak: "960 W", ac120vCont: "768 W", ac240vPeak: "1,920 W", ac240vCont: "1,536 W", typicalApp: "Portable laser printer, 5,000 BTU window AC" },
  { amps: 8.5, label: "8.5 Amps", dc12v: "102 W", ac120vPeak: "1,020 W", ac120vCont: "816 W", ac240vPeak: "2,040 W", ac240vCont: "1,632 W", typicalApp: "Standard vacuum cleaner, coffee brewer" },
  { amps: 10, label: "10 Amps", dc12v: "120 W", ac120vPeak: "1,200 W", ac120vCont: "960 W", ac240vPeak: "2,400 W", ac240vCont: "1,920 W", typicalApp: "Toaster oven, 8,000 BTU air conditioner" },
  { amps: 12.5, label: "12.5 Amps", dc12v: "150 W", ac120vPeak: "1,500 W", ac120vCont: "1,200 W", ac240vPeak: "3,000 W", ac240vCont: "2,400 W", typicalApp: "Portable ceramic space heater, electric iron" },
  { amps: 13, label: "13 Amps", dc12v: "156 W", ac120vPeak: "1,560 W", ac120vCont: "1,248 W", ac240vPeak: "3,120 W", ac240vCont: "2,496 W", typicalApp: "Heavy microwave, 12,000 BTU window AC" },
  { amps: 15, label: "15 Amps", dc12v: "180 W", ac120vPeak: "1,800 W", ac120vCont: "1,440 W", ac240vPeak: "3,600 W", ac240vCont: "2,880 W", typicalApp: "Standard 15A branch circuit maximum capacity" },
  { amps: 20, label: "20 Amps", dc12v: "240 W", ac120vPeak: "2,400 W", ac120vCont: "1,920 W", ac240vPeak: "4,800 W", ac240vCont: "3,840 W", typicalApp: "Kitchen appliance circuit, small RV 30A branch" },
  { amps: 30, label: "30 Amps", dc12v: "360 W", ac120vPeak: "3,600 W", ac120vCont: "2,880 W", ac240vPeak: "7,200 W", ac240vCont: "5,760 W", typicalApp: "RV 30A service, electric clothes dryer (240V)" },
  { amps: 40, label: "40 Amps", dc12v: "480 W", ac120vPeak: "4,800 W", ac120vCont: "3,840 W", ac240vPeak: "9,600 W", ac240vCont: "7,680 W", typicalApp: "Electric cooking range, central AC heat pump" },
  { amps: 50, label: "50 Amps", dc12v: "600 W", ac120vPeak: "6,000 W", ac120vCont: "4,800 W", ac240vPeak: "12,000 W", ac240vCont: "9,600 W", typicalApp: "50A RV shore hookup, Level 2 EV charging circuit" },
  { amps: 80, label: "80 Amps", dc12v: "960 W", ac120vPeak: "9,600 W", ac120vCont: "7,680 W", ac240vPeak: "19,200 W", ac240vCont: "15,360 W", typicalApp: "Subpanel feeder, large whole-home tankless water heater" },
  { amps: 100, label: "100 Amps", dc12v: "1,200 W", ac120vPeak: "12,000 W", ac120vCont: "9,600 W", ac240vPeak: "24,000 W", ac240vCont: "19,200 W", typicalApp: "100A residential service panel, auxiliary workshop feeder" },
  { amps: 200, label: "200 Amps", dc12v: "2,400 W", ac120vPeak: "24,000 W", ac120vCont: "19,200 W", ac240vPeak: "48,000 W", ac240vCont: "38,400 W", typicalApp: "Standard modern 200A residential main electrical panel" },
];

export const AmpsToWattsGuideSection: React.FC = () => {
  return (
    <section className="mt-16 pt-12 border-t border-slate-200 space-y-12 text-slate-800">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5" />
          <span>Current to Active Power Conversion Standards</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Amps to Watts Conversion: DC, Single-Phase &amp; Three-Phase Power Tables
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Converting current in amperes to power in watts depends on circuit voltage, phase arrangement, and whether loads are intermittent or continuous under National Electrical Code standards.
        </p>
      </div>

      {/* Conversion Formula Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-blue-600" />
          <span>The Universal Amps to Watts Formula</span>
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Electric power in watts represents the rate of energy transfer. For direct current circuits and single-phase alternating current circuits with unity power factor, power equals current multiplied by voltage:
        </p>
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 font-mono text-center text-sm sm:text-base text-slate-900 font-bold space-y-2">
          <div>Watts = Amps × Volts × Power Factor</div>
          <div className="text-xs font-normal text-slate-600 font-sans">
            Direct Current (DC): Watts = Amps × Volts (Power Factor = 1.0)
          </div>
        </div>
      </div>

      {/* Master Amps to Watts Lookup Table */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900">
          Amps to Watts Conversion Table (12V DC, 120V AC &amp; 240V AC)
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Reference table comparing real wattage capacity across common household and automotive voltages, including maximum peak capacity and NEC 80% continuous-load deratings:
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white max-h-[560px] overflow-y-auto">
          <table className="min-w-full text-xs sm:text-sm text-left divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-700 font-bold sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="py-3 px-4">Current (Amps)</th>
                <th className="py-3 px-4">12V DC</th>
                <th className="py-3 px-4">120V Peak</th>
                <th className="py-3 px-4">120V (80% Cont.)</th>
                <th className="py-3 px-4">240V Peak</th>
                <th className="py-3 px-4">240V (80% Cont.)</th>
                <th className="py-3 px-4">Typical Equipment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {AMPS_TO_WATTS_DATA.map((row) => (
                <tr key={row.amps} className="hover:bg-slate-50/70 transition">
                  <td className="py-2.5 px-4 font-bold text-slate-900 font-mono">{row.label}</td>
                  <td className="py-2.5 px-4 font-mono text-slate-600">{row.dc12v}</td>
                  <td className="py-2.5 px-4 font-mono font-medium text-slate-800">{row.ac120vPeak}</td>
                  <td className="py-2.5 px-4 font-mono text-blue-700 font-semibold">{row.ac120vCont}</td>
                  <td className="py-2.5 px-4 font-mono font-medium text-slate-800">{row.ac240vPeak}</td>
                  <td className="py-2.5 px-4 font-mono text-emerald-700 font-semibold">{row.ac240vCont}</td>
                  <td className="py-2.5 px-4 text-xs text-slate-500">{row.typicalApp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Worked Engineering Sections for Top Queries */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900">
          Worked Engineering Examples: Sizing Household Circuits
        </h3>

        {/* 15 Amps to Watts */}
        <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-3">
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Plug className="w-5 h-5 text-blue-600" />
            <span>15 Amps to Watts: Standard Residential Branch Circuits</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            At 120 volts, a standard 15-amp branch circuit delivers a theoretical maximum of 1,800 watts (15A × 120V).
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Under National Electrical Code Article 210.19, continuous loads running for 3 hours or more must not exceed 80% of circuit capacity. This sets the safe continuous limit to 1,440 watts (12A × 120V).
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            When connected to a 240-volt single-phase line, 15 amps provides 3,600 peak watts and 2,880 continuous watts.
          </p>
        </div>

        {/* 20 Amps to Watts */}
        <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-3">
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Plug className="w-5 h-5 text-amber-600" />
            <span>20 Amps to Watts: Heavy Kitchen &amp; Workshop Circuits</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            A 20-amp, 120-volt circuit wired with 12 AWG copper conductors supports up to 2,400 peak watts (20A × 120V).
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Applying the NEC 80% continuous-load safety threshold limits running appliances to 1,920 watts (16A × 120V).
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            On 240 volts (such as small air compressor or water heater lines), a 20-amp breaker supports 4,800 peak watts and 3,840 continuous watts.
          </p>
        </div>

        {/* 200 Amps to Watts */}
        <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-3">
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-600" />
            <span>200 Amps to Watts: Whole-Home Electrical Service Panels</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Most modern single-family detached homes in the United States feature a 200-amp, 120/240-volt split-phase service entrance.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Total peak power capacity is calculated across the 240-volt line: 200A × 240V = 48,000 watts (48 kW).
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Derating by 80% for continuous planning margins provides 38,400 watts (38.4 kW). This capacity easily powers central heat pumps, electric vehicle chargers, and kitchen appliances concurrently.
          </p>
        </div>

        {/* 10A Circuit Proof */}
        <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-3">
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            <span>True Power Proof: 120V Circuit Operating at 10A</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            When pure resistive equipment such as a space heater or electric kettle draws 10 amps at 120 volts, current and voltage remain perfectly in phase.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Because the power factor equals 1.0 (unity), real power equals apparent power: P = 120V × 10A × 1.0 = 1,200 watts.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            If an inductive motor draws 10 amps with a 0.85 power factor, real heating work drops to 1,020 watts (120 × 10 × 0.85), while total apparent power remains 1,200 volt-amps.
          </p>
        </div>
      </div>
    </section>
  );
};
