import Link from "next/link";
import {
  Zap,
  BatteryCharging,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Sliders,
  Sun,
  Plug,
  Car,
  Clock,
} from "lucide-react";

interface CategoryCard {
  name: string;
  description: string;
  icon: React.ElementType;
  status: "active" | "coming_soon";
  href?: string;
  toolCount: string;
}

const CATEGORIES: CategoryCard[] = [
  {
    name: "UPS & Backup",
    description: "Uninterruptible power supply duration, battery runtime, and inverter sizing.",
    icon: Clock,
    status: "active",
    href: "/ups-battery-backup-calculator",
    toolCount: "1 Active Tool",
  },
  {
    name: "Electrical",
    description: "Watts, Amps, Volts, resistance, Ohm's law, and AC power factor conversions.",
    icon: Cpu,
    status: "active",
    href: "/watts-to-amps-calculator",
    toolCount: "1 Active Tool",
  },
  {
    name: "Solar",
    description: "PV array output, peak sun hours, panel sizing, and charge controller matching.",
    icon: Sun,
    status: "coming_soon",
    toolCount: "Planned",
  },
  {
    name: "Battery",
    description: "Amp-hour to Watt-hour conversion, depth of discharge, and LiFePO4 vs SLA comparison.",
    icon: BatteryCharging,
    status: "coming_soon",
    toolCount: "Planned",
  },
  {
    name: "Electricity",
    description: "Appliance power consumption, kilowatt-hour (kWh) cost, and operating run-time.",
    icon: Zap,
    status: "coming_soon",
    toolCount: "Planned",
  },
  {
    name: "Generator",
    description: "Starting vs running wattage, emergency backup load calculation, and fuel consumption.",
    icon: Plug,
    status: "coming_soon",
    toolCount: "Planned",
  },
  {
    name: "RV Power",
    description: "12V/24V house battery setups, boondocking energy budgets, and DC-DC charging.",
    icon: Sliders,
    status: "coming_soon",
    toolCount: "Planned",
  },
  {
    name: "EV Charging",
    description: "Level 1 vs Level 2 charging speeds, circuit ampacity requirements, and charging costs.",
    icon: Car,
    status: "coming_soon",
    toolCount: "Planned",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16 py-10 md:py-16">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>Precision Power &amp; Energy Calculators</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          Clear Sizing for <span className="text-blue-600">Solar, Battery</span> &amp; Electrical Systems
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Accurate, transparent power calculations for homeowners, off-grid DIYers, RV travelers, and electricians. Every tool provides transparent formulas and explicit engineering baselines.
        </p>

        {/* Quick Hero CTA */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/ups-battery-backup-calculator"
            className="px-5 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md shadow-blue-500/20 hover:bg-blue-700 transition flex items-center gap-2"
          >
            <span>Launch UPS Run-Time Calculator</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/calculators"
            className="px-5 py-3 rounded-xl bg-white text-slate-700 border border-slate-200 font-bold text-sm hover:bg-slate-50 transition"
          >
            Browse All Tools
          </Link>
        </div>
      </section>

      {/* Featured Flagship Tool Highlight */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-blue-950 text-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-slate-800 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-500/30">
              Flagship Tool
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              UPS &amp; Battery Backup Run-Time Hours Calculator
            </h2>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              Calculate how long a battery backup or uninterruptible power supply will sustain appliances, servers, or medical equipment. Transparently accounts for depth of discharge, inverter conversion efficiency, and Peukert high discharge notices.
            </p>
            <div className="pt-2">
              <Link
                href="/ups-battery-backup-calculator"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500 text-white font-bold text-sm hover:bg-blue-400 transition"
              >
                <span>Calculate Backup Hours</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Category Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Browse by Power Category
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Explore calculators organized by electrical system discipline.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isClickable = cat.status === "active" && cat.href;

            const CardContent = (
              <div
                className={`p-4 rounded-2xl border transition h-full flex flex-col justify-between ${
                  isClickable
                    ? "bg-white border-slate-200 hover:border-blue-500 hover:shadow-md cursor-pointer group"
                    : "bg-slate-50/70 border-slate-200/80"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isClickable
                          ? "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition"
                          : "bg-slate-200/70 text-slate-600"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        cat.status === "active"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {cat.toolCount}
                    </span>
                  </div>

                  <h3
                    className={`text-sm font-bold mb-1 ${
                      isClickable
                        ? "text-slate-900 group-hover:text-blue-600 transition"
                        : "text-slate-800"
                    }`}
                  >
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-normal line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                {isClickable && (
                  <div className="pt-3 text-[11px] font-semibold text-blue-600 flex items-center gap-1">
                    <span>View Tools</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                )}
              </div>
            );

            return isClickable ? (
              <Link key={cat.name} href={cat.href!} className="block">
                {CardContent}
              </Link>
            ) : (
              <div key={cat.name}>{CardContent}</div>
            );
          })}
        </div>
      </section>

      {/* Featured Tools Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Popular Electrical Calculators
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Formulas derived from standard electrical physics, Ohm&apos;s law, and established energy storage equations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: UPS */}
          <Link
            href="/ups-battery-backup-calculator"
            className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-3"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
              <BatteryCharging className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition">
                UPS Backup Hours
              </h3>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Live
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Calculate backup run-time hours for lead-acid and LiFePO4 battery banks under continuous load.
            </p>
            <div className="text-xs font-semibold text-blue-600 flex items-center gap-1 pt-1">
              <span>Use Calculator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Card 2: Watts to Amps */}
          <Link
            href="/watts-to-amps-calculator"
            className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-3"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
              <Cpu className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition">
                Watts to Amps
              </h3>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Live
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Convert real power to current across DC, single-phase AC, and balanced three-phase circuits.
            </p>
            <div className="text-xs font-semibold text-blue-600 flex items-center gap-1 pt-1">
              <span>Use Calculator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Card 3: Wire Sizing */}
          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3 opacity-85">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-800">Wire Size (AWG)</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded">
                Coming Soon
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Calculate required copper conductor gauge and voltage drop percentage over distance.
            </p>
          </div>
        </div>
      </section>

      {/* Trust & Principles */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100/70 rounded-2xl p-6 md:p-8 border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="space-y-1.5">
            <div className="font-bold text-slate-900 text-sm flex items-center justify-center md:justify-start gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Transparent Math</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every calculator shows the exact formula, variable definitions, and physical assumptions used.
            </p>
          </div>
          <div className="space-y-1.5">
            <div className="font-bold text-slate-900 text-sm flex items-center justify-center md:justify-start gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Standard Safety Margins</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Calculations incorporate standard 125% continuous duty references where relevant for circuit planning.
            </p>
          </div>
          <div className="space-y-1.5">
            <div className="font-bold text-slate-900 text-sm flex items-center justify-center md:justify-start gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Zero Fluff</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Fast, client-side execution designed to provide clear answers immediately on any device.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
