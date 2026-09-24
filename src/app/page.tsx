import Link from "next/link";
import { Zap, BatteryCharging, ArrowRight, ShieldCheck, Cpu, Sliders } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-16 py-12 md:py-20">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>Engineering-Grade Power Calculators</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          Precision Sizing for <span className="text-blue-600">Solar, Battery</span> & Electrical Systems
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Accurate, transparent electrical calculators designed for homeowners, off-grid DIYers, RV travelers, and electricians. No guesswork, no arbitrary formulas.
        </p>

        {/* Quick Hero CTA */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/ups-battery-backup-calculator"
            className="px-6 py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:bg-blue-700 transition flex items-center gap-2"
          >
            <span>Launch UPS Run-Time Calculator</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/calculators"
            className="px-6 py-3.5 rounded-xl bg-white text-slate-700 border border-slate-200 font-bold text-sm hover:bg-slate-50 transition"
          >
            Browse All Tools
          </Link>
        </div>
      </section>

      {/* Featured Flagship Tool Highlight */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-blue-950 text-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-800 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-500/30">
              Flagship Tool
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
              UPS & Battery Backup Run-Time Hours Calculator
            </h2>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              Find out exactly how many hours your battery backup or uninterruptible power supply will sustain critical appliances, servers, or CPAP machines. Integrates depth of discharge, inverter efficiency, and Peukert warnings.
            </p>
            <div className="pt-2">
              <Link
                href="/ups-battery-backup-calculator"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-500 text-white font-bold text-sm hover:bg-blue-400 transition"
              >
                <span>Calculate Backup Hours</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Directory Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Popular Electrical Sizing Calculators
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Built using verified NEC ampacity tables, IEEE 485 baselines, and Ohm&apos;s law.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: UPS */}
          <Link
            href="/ups-battery-backup-calculator"
            className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-lg transition space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
              <BatteryCharging className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
              UPS Backup Hours
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Calculate runtime hours for SLA, AGM, and LiFePO4 battery banks under continuous watt load.
            </p>
            <div className="text-xs font-semibold text-blue-600 flex items-center gap-1 pt-2">
              <span>Use Calculator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Card 2: Watts to Amps */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-3 opacity-80">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Watts to Amps</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                Coming Next
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Convert electrical power to current for DC, single-phase AC, and three-phase AC circuits.
            </p>
          </div>

          {/* Card 3: Wire Sizing */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-3 opacity-80">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Wire Size (AWG)</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                Coming Next
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Determine copper conductor gauge and calculate voltage drop over wire run distances.
            </p>
          </div>
        </div>
      </section>

      {/* Trust & Engineering Principles */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100/80 rounded-2xl p-6 md:p-8 border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="space-y-1.5">
            <div className="font-bold text-slate-900 text-sm flex items-center justify-center md:justify-start gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Transparent Math</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every calculator shows the exact formula, variable definitions, and assumptions used.
            </p>
          </div>
          <div className="space-y-1.5">
            <div className="font-bold text-slate-900 text-sm flex items-center justify-center md:justify-start gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>NEC Aligned</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Calculations incorporate continuous duty safety factors (125%) and code standards.
            </p>
          </div>
          <div className="space-y-1.5">
            <div className="font-bold text-slate-900 text-sm flex items-center justify-center md:justify-start gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Zero Fluff</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Fast, client-side execution designed to give you your answer immediately on any device.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
