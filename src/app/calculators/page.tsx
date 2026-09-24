import { Metadata } from "next";
import Link from "next/link";
import { BatteryCharging, Cpu, Sliders, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Electrical & Power Calculators Directory",
  description:
    "Explore our complete directory of engineering calculators for solar systems, battery runtimes, inverters, and electrical wiring.",
  alternates: {
    canonical: "https://calcmypower.com/calculators",
  },
};

export default function CalculatorsDirectoryPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
          Electrical & Power Calculators
        </h1>
        <p className="text-base text-slate-600 max-w-2xl leading-relaxed">
          Select an interactive tool below to compute power requirements, backup durations, or conductor sizes according to standard engineering equations.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active: UPS Battery Backup */}
        <Link
          href="/ups-battery-backup-calculator"
          className="group block p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-lg transition space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
              <BatteryCharging className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Live Tool
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition">
            UPS Battery Backup Run-Time Hours Calculator
          </h2>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            Estimate how long an uninterruptible power supply or deep-cycle battery bank will power your equipment during an outage.
          </p>
          <div className="text-xs font-semibold text-blue-600 flex items-center gap-1 pt-2">
            <span>Open Calculator</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        {/* Active: Watts to Amps */}
        <Link
          href="/watts-to-amps-calculator"
          className="group block p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-lg transition space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Live Tool
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition">
            Watts to Amps Electrical Calculator
          </h2>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            Convert continuous power (Watts) to electrical current (Amps) across DC, single-phase AC, and balanced three-phase AC circuits.
          </p>
          <div className="text-xs font-semibold text-blue-600 flex items-center gap-1 pt-2">
            <span>Open Calculator</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        {/* Coming Next: Wire Size */}
        <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
              In Development
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-700">
            Wire Gauge (AWG) & Voltage Drop Calculator
          </h2>
          <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
            Calculate required wire gauge based on circuit amperage, voltage drop limit (typically 3%), and circuit run distance.
          </p>
        </div>
      </div>
    </div>
  );
}
