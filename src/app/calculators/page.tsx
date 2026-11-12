import { Metadata } from "next";
import Link from "next/link";
import {
  Battery,
  BatteryCharging,
  Cpu,
  Sliders,
  ArrowRight,
  Plug,
  BookOpen,
  Clock,
  Zap,
  Sun,
  Activity,
  Flame,
} from "lucide-react";
import { buildPageMetadata } from "@/lib/seo/metadata";
import {
  generateBreadcrumbSchema,
  generateCollectionPageSchema,
} from "@/lib/seo/schema";
import {
  SITE_URL,
  CALCULATOR_REGISTRY,
  GUIDE_REGISTRY,
} from "@/lib/seo/registry";

export const metadata: Metadata = buildPageMetadata({
  title: "Electrical & Power Calculators Directory",
  description:
    "Browse interactive electrical calculators and engineering sizing tools for backup generators, battery storage, solar PV, and AC/DC circuit conversions.",
  path: "/calculators",
});

export default function CalculatorsDirectoryPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Calculators", url: `${SITE_URL}/calculators` },
  ]);

  const collectionSchema = generateCollectionPageSchema({
    name: "Electrical & Power Calculators Directory",
    description:
      "Interactive electrical, battery backup, and generator sizing calculators and engineering guides on CalcMyPower.",
    url: `${SITE_URL}/calculators`,
    items: [
      ...CALCULATOR_REGISTRY.map((c) => ({
        name: c.title,
        url: `${SITE_URL}${c.path}`,
        description: c.metaDescription,
      })),
      ...GUIDE_REGISTRY.map((g) => ({
        name: g.title,
        url: `${SITE_URL}${g.path}`,
        description: g.metaDescription,
      })),
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-14">
        <header className="space-y-3">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-medium text-slate-500"
          >
            <Link href="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-slate-800 font-semibold">Calculators</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
            Electrical &amp; Power Calculators
          </h1>
          <p className="text-base text-slate-600 max-w-2xl leading-relaxed">
            Select an interactive calculator or sizing guide below to size battery backup banks, convert watts to amps across DC and AC circuits, or estimate required backup generator wattage.
          </p>
        </header>

        {/* Section 1: Live Interactive Calculators */}
        <section id="live-calculators" className="space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              Interactive Sizing &amp; Conversion Calculators
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Client-side engineering calculators with published formulas, worked examples, and NEC continuous-load references.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Active: Generator Fuel Consumption Calculator */}
            <Link
              id="generator-fuel"
              href="/generator-fuel-consumption-calculator"
              className="group block p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-lg transition space-y-3 scroll-mt-24"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                  <Flame className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Live Tool • Generators
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition">
                Generator Fuel Consumption Calculator
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Track generator fuel burn in gal/hr and tank runtime for gas, propane, and diesel backup sets under load.
              </p>
              <div className="text-xs font-semibold text-blue-600 flex items-center gap-1 pt-2">
                <span>Open Fuel Calculator</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
            {/* Active: Generator Size Calculator */}
            <Link
              id="generators"
              href="/generator-size-calculator"
              className="group block p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-lg transition space-y-3 scroll-mt-24"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                  <Plug className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Live Tool • Generators
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition">
                Generator Size Calculator
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Size a backup generator for running watts, motor surge, and NEC 125% headroom to keep pumps and AC running.
              </p>
              <div className="text-xs font-semibold text-blue-600 flex items-center gap-1 pt-2">
                <span>Open Calculator</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Active: UPS Battery Backup */}
            <Link
              id="ups-battery"
              href="/ups-battery-backup-calculator"
              className="group block p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-lg transition space-y-3 scroll-mt-24"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                  <BatteryCharging className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Live Tool • UPS &amp; Battery
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition">
                UPS Battery Backup Run-Time Hours Calculator
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Find true UPS backup runtime for routers, CPAP gear, and PCs after inverter idle draw and usable battery DoD.
              </p>
              <div className="text-xs font-semibold text-blue-600 flex items-center gap-1 pt-2">
                <span>Open Calculator</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Active: Battery Capacity & Sizing Calculator */}
            <Link
              id="battery-capacity"
              href="/battery-capacity-calculator"
              className="group block p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-lg transition space-y-3 scroll-mt-24"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                  <Battery className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Live Tool • UPS &amp; Battery
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition">
                Battery Capacity &amp; Sizing Calculator
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Size 12V, 24V, and 48V battery banks in Ah and Wh with usable DoD limits for LiFePO4 and lead-acid storage.
              </p>
              <div className="text-xs font-semibold text-blue-600 flex items-center gap-1 pt-2">
                <span>Open Calculator</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Active: Watts to Amps */}
            <Link
              id="electricity"
              href="/watts-to-amps-calculator"
              className="group block p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-lg transition space-y-3 scroll-mt-24"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Live Tool • Electricity
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition">
                Watts to Amps Electrical Calculator
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Find circuit current in amps across 12V DC, 120V, 240V, and 3-phase power with NEC 125% breaker sizing rules.
              </p>
              <div className="text-xs font-semibold text-blue-600 flex items-center gap-1 pt-2">
                <span>Open Calculator</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Active: Amps to Watts */}
            <Link
              id="amps-to-watts"
              href="/amps-to-watts-calculator"
              className="group block p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-lg transition space-y-3 scroll-mt-24"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Live Tool • Electricity
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition">
                Amps to Watts Electrical Calculator
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Find real power in watts and kW across 12V DC, 120V, and 240V AC circuits with the NEC 80% continuous limit.
              </p>
              <div className="text-xs font-semibold text-blue-600 flex items-center gap-1 pt-2">
                <span>Open Calculator</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Active: Solar Panel Tilt Angle Calculator */}
            <Link
              id="solar"
              href="/solar-panel-tilt-calculator"
              className="group block p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-lg transition space-y-3 scroll-mt-24"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                  <Sun className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Live Tool • Solar PV
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition">
                Solar Panel Tilt Angle Calculator
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Find optimal solar panel tilt angles by latitude with seasonal adjustments and roof pitch slope conversions.
              </p>
              <div className="text-xs font-semibold text-blue-600 flex items-center gap-1 pt-2">
                <span>Open Calculator</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Active: Solar Battery Calculator */}
            <Link
              id="solar-battery"
              href="/solar-battery-calculator"
              className="group block p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-lg transition space-y-3 scroll-mt-24"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                  <BatteryCharging className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Live Tool • Solar PV
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition">
                Solar Battery Calculator
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Size solar battery storage in kWh and Ah from daily energy use, autonomy days, and inverter efficiency.
              </p>
              <div className="text-xs font-semibold text-blue-600 flex items-center gap-1 pt-2">
                <span>Open Calculator</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Active: Solar Charge Controller Calculator */}
            <Link
              id="charge-controller"
              href="/solar-charge-controller-calculator"
              className="group block p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-lg transition space-y-3 scroll-mt-24"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Live Tool • Solar PV
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition">
                Solar Charge Controller Calculator
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Size MPPT and PWM charge controllers in amps with NEC 125% margins and cold-morning array Voc headroom.
              </p>
              <div className="text-xs font-semibold text-blue-600 flex items-center gap-1 pt-2">
                <span>Open Calculator</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Active: Voltage Drop Calculator */}
            <Link
              id="voltage-drop"
              href="/voltage-drop-calculator"
              className="group block p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-lg transition space-y-3 scroll-mt-24"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                  <Sliders className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Live Tool • Electricity
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition">
                Voltage Drop Calculator
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Find wire gauge voltage drop and percentage loss across 120V, 240V, and DC runs to maintain NEC 3% limits.
              </p>
              <div className="text-xs font-semibold text-blue-600 flex items-center gap-1 pt-2">
                <span>Open Calculator</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Active: Solar System Size Calculator */}
            <Link
              id="solar-system-size"
              href="/solar-system-size-calculator"
              className="group block p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-lg transition space-y-3 scroll-mt-24"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                  <Sun className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Live Tool • Solar PV
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition">
                Solar System Size Calculator
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Size rooftop solar arrays in kW and panel count from monthly kWh use, peak sun hours, and derate factors.
              </p>
              <div className="text-xs font-semibold text-blue-600 flex items-center gap-1 pt-2">
                <span>Open Calculator</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>


            {/* Active: Three Phase Power Calculator */}
            <Link
              id="three-phase-power"
              href="/three-phase-power-calculator"
              className="group block p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-lg transition space-y-3 scroll-mt-24"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                  <Activity className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Live Tool • Electricity
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition">
                Three Phase Power Calculator
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Solve 3-phase power in kW, kVA, and line current across 208V, 240V, and 480V balanced industrial circuits.
              </p>
              <div className="text-xs font-semibold text-blue-600 flex items-center gap-1 pt-2">
                <span>Open Calculator</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Active: Electricity Use Calculator */}
            <Link
              id="electricity-use"
              href="/electricity-use-calculator"
              className="group block p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-lg transition space-y-3 scroll-mt-24"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Live Tool • Electricity
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition">
                Electricity Usage Calculator
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Track appliance electricity use in daily and monthly kWh from operating wattage, run hours, and duty cycles.
              </p>
              <div className="text-xs font-semibold text-blue-600 flex items-center gap-1 pt-2">
                <span>Open Calculator</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Active: Electricity Cost Calculator */}
            <Link
              id="electricity-cost"
              href="/electricity-cost-calculator"
              className="group block p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-lg transition space-y-3 scroll-mt-24"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Live Tool • Electricity
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition">
                Electricity Cost Calculator
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Estimate electric utility bills and true cost per kWh from energy usage, monthly fixed fees, and local taxes.
              </p>
              <div className="text-xs font-semibold text-blue-600 flex items-center gap-1 pt-2">
                <span>Open Cost Calculator</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Active: Inverter Size Calculator */}
            <Link
              id="inverter-size"
              href="/inverter-size-calculator"
              className="group block p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-lg transition space-y-3 scroll-mt-24"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Live Tool • Inverters
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition">
                Inverter Size Calculator
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Size power inverters in continuous and surge watts with DC battery cable gauge (AWG) and fuse ratings.
              </p>
              <div className="text-xs font-semibold text-blue-600 flex items-center gap-1 pt-2">
                <span>Open Inverter Calculator</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </section>

        {/* Section 2: Engineering Sizing Guides */}
        <section id="sizing-guides" className="space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                Engineering Sizing Guides &amp; Outage Planning
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Detailed residential power guides with appliance wattage benchmarks, worked calculations, and 1-click calculator presets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/what-size-generator-do-i-need-for-my-house"
              className="group block p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500 hover:shadow-lg transition space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
                  Residential Sizing Guide
                </span>
                <span className="inline-flex items-center gap-1 text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>11 min read</span>
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition">
                What Size Generator Do I Need for My House?
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Compare essential vs whole-house generator wattage, motor surge inrush, and avoid square-foot sizing traps.
              </p>
              <div className="text-xs font-semibold text-indigo-600 flex items-center gap-1 pt-2">
                <span>Read House Generator Guide</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link
              href="/what-size-generator-to-run-a-refrigerator"
              className="group block p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500 hover:shadow-lg transition space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
                  Appliance Outage Guide
                </span>
                <span className="inline-flex items-center gap-1 text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>10 min read</span>
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition">
                What Size Generator Do I Need to Run a Refrigerator?
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Find generator wattage to run a refrigerator during outages from compressor startup surge and household loads.
              </p>
              <div className="text-xs font-semibold text-indigo-600 flex items-center gap-1 pt-2">
                <span>Read Refrigerator Sizing Guide</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link
              href="/what-does-ah-mean-on-a-battery"
              className="group block p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500 hover:shadow-lg transition space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
                  Battery Engineering Guide
                </span>
                <span className="inline-flex items-center gap-1 text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>9 min read</span>
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition">
                What Does Ah Mean on a Battery? Amp-Hours Explained
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Learn what battery Amp-hours (Ah) mean, convert Ah to Wh, and see how discharge rate affects usable capacity.
              </p>
              <div className="text-xs font-semibold text-indigo-600 flex items-center gap-1 pt-2">
                <span>Read Battery Ah Guide</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link
              href="/what-is-a-watt-hour"
              className="group block p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500 hover:shadow-lg transition space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
                  Energy Fundamentals
                </span>
                <span className="inline-flex items-center gap-1 text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>9 min read</span>
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition">
                What Is a Watt-Hour (Wh)? Watts vs. Watt-Hours Explained
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Learn what a Watt-hour (Wh) measures, the difference between Watts vs Wh, and how energy determines runtime.
              </p>
              <div className="text-xs font-semibold text-indigo-600 flex items-center gap-1 pt-2">
                <span>Read Watt-Hour Guide</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link
              href="/how-long-will-a-100ah-battery-last"
              className="group block p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500 hover:shadow-lg transition space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
                  Battery Runtime Guide
                </span>
                <span className="inline-flex items-center gap-1 text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>12 min read</span>
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition">
                How Long Will a 100Ah Battery Last? 12V Appliance Runtime Guide
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Realistic 12V 100Ah battery runtime hours for fridges, TVs, and CPAPs across LiFePO4 vs lead-acid chemistry.
              </p>
              <div className="text-xs font-semibold text-indigo-600 flex items-center gap-1 pt-2">
                <span>Read 100Ah Runtime Guide</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link
              href="/solar-panels-series-vs-parallel"
              className="group block p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500 hover:shadow-lg transition space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
                  Solar PV Engineering Guide
                </span>
                <span className="inline-flex items-center gap-1 text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>12 min read</span>
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition">
                Solar Panels in Series vs Parallel: Wiring Diagrams &amp; Sizing
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Compare solar panels in series vs parallel with wiring schematics, array voltage, current, and MPPT limits.
              </p>
              <div className="text-xs font-semibold text-indigo-600 flex items-center gap-1 pt-2">
                <span>Read Series vs Parallel Guide</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link
              href="/how-much-energy-does-a-solar-panel-produce"
              className="group block p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500 hover:shadow-lg transition space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
                  Solar Energy Production Guide
                </span>
                <span className="inline-flex items-center gap-1 text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>14 min read</span>
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition">
                How Much Energy Does a Solar Panel Produce?
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Daily and monthly kWh output for 400W solar panels based on peak sun hours, tilt, and real system losses.
              </p>
              <div className="text-xs font-semibold text-indigo-600 flex items-center gap-1 pt-2">
                <span>Read Production Guide</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link
              href="/how-long-does-it-take-to-charge-a-battery-with-solar-panels"
              className="group block p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500 hover:shadow-lg transition space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
                  Solar &amp; Battery Guide
                </span>
                <span className="inline-flex items-center gap-1 text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>15 min read</span>
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition">
                How Long Does It Take to Charge a Battery With Solar Panels?
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Solar battery charge times in hours based on panel wattage, peak sun hours, MPPT efficiency, and battery type.
              </p>
              <div className="text-xs font-semibold text-indigo-600 flex items-center gap-1 pt-2">
                <span>Read Solar Recharge Guide</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link
              href="/how-many-amp-hours-do-i-need"
              className="group block p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500 hover:shadow-lg transition space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
                  Battery Storage Guide
                </span>
                <span className="inline-flex items-center gap-1 text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>13 min read</span>
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition">
                How Many Amp Hours Do I Need for a Battery Bank?
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Size battery bank capacity in amp-hours (Ah) using daily watt-hours, system voltage, autonomy, and DoD limits.
              </p>
              <div className="text-xs font-semibold text-indigo-600 flex items-center gap-1 pt-2">
                <span>Read Battery Bank Sizing Guide</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link
              href="/how-many-watts-can-a-15-amp-or-20-amp-circuit-handle"
              className="group block p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500 hover:shadow-lg transition space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
                  Electrical Circuit Guide
                </span>
                <span className="inline-flex items-center gap-1 text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>13 min read</span>
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition">
                How Many Watts on a 15-Amp or 20-Amp Circuit?
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Safe wattage limits for 15A and 20A 120V circuits under the NEC 80% continuous load rule and wire gauge sizes.
              </p>
              <div className="text-xs font-semibold text-indigo-600 flex items-center gap-1 pt-2">
                <span>Read Circuit Wattage Guide</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
