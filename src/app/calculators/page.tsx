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
    "Browse CalcMyPower's interactive calculators and engineering sizing guides for UPS battery backup runtime, Watts to Amps circuit conversion, and backup generator sizing.",
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
                Calculate required generator wattage for home backup, RV camping, or jobsite tools with single-motor surge handling and 25% planning headroom.
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
                Estimate how long an uninterruptible power supply or deep-cycle battery bank will power your equipment during an outage.
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
                Calculate battery energy storage in Watt-hours (Wh) and Amp-hours (Ah), evaluate usable capacity across chemistries, and size battery banks for loads.
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
                Convert continuous power (Watts) to electrical current (Amps) across DC, single-phase AC, and balanced three-phase AC circuits.
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
                Convert circuit current (Amps) and voltage (Volts) to real electrical power (Watts) and apparent power (VA) across DC and AC systems.
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
                Calculate the optimal solar panel tilt angle and compass orientation for your latitude. Compare roof pitch angles, seasonal adjustments, and mounting options.
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
                Calculate the battery bank capacity needed for your off-grid or backup solar system. Size storage in kWh and Amp-hours based on daily usage and autonomy.
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
                Calculate the charge controller size needed for your solar panels. Sizing calculator for MPPT and PWM controllers based on array wattage, battery voltage, and Voc.
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
                Calculate voltage drop for DC, single-phase, and balanced three-phase circuits. Determine voltage loss, percentage drop, receiving voltage, and evaluate adjacent wire sizes.
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
                Calculate the solar system size in kW and approximate panel count required to power your home based on monthly kilowatt-hour consumption and local peak sun hours.
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
                Calculate 3-phase real power (kW), apparent power (kVA), reactive power (kVAR), and line current (Amps). Supports line-to-line and line-to-neutral voltages with power factor.
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
                Electricity Use Calculator
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Calculate daily and monthly electricity usage in Watt-hours (Wh) and kilowatt-hours (kWh) across household appliances with duty cycles and utility cost estimates.
              </p>
              <div className="text-xs font-semibold text-blue-600 flex items-center gap-1 pt-2">
                <span>Open Calculator</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Active: Generator Amperage Chart & Calculator */}
            <Link
              id="generator-amperage"
              href="/generator-amperage-chart-calculator"
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
                Generator Amperage Chart &amp; Calculator
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Calculate generator output current in Amps across 120V, 240V split-phase, and 3-phase circuits. Look up standard outlet ratings, breaker sizing, and wire gauges from 1kW to 26kW.
              </p>
              <div className="text-xs font-semibold text-blue-600 flex items-center gap-1 pt-2">
                <span>Open Calculator</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Active: Generator Wattage Chart */}
            <Link
              id="generator-wattage-chart"
              href="/generator-wattage-chart"
              className="group block p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-lg transition space-y-3 scroll-mt-24"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Live Tool • Generators
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition">
                Generator Wattage Chart &amp; Appliance Reference
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Reference running watts and motor starting surge requirements for 35+ appliances. Select items to calculate simultaneous outage load with 25% continuous reserve.
              </p>
              <div className="text-xs font-semibold text-blue-600 flex items-center gap-1 pt-2">
                <span>Open Wattage Chart</span>
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
                Calculate required continuous running wattage and motor startup surge demand for your home during utility outages using our four-step sizing method and 5.1 kW worked storm scenario.
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
                Determine exact running and compressor starting wattage for modern Energy Star refrigerators, deep freezers, and simultaneous household outage loads.
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
                Understand battery charge capacity, convert Amp-hours to Watt-hours (Wh), and evaluate how chemistry, depth of discharge, and Peukert losses determine real-world runtime.
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
                Discover the difference between instantaneous power (Watts) and energy consumed over time (Watt-hours), with practical battery runtime and utility billing calculations.
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
                Realistic delivered runtime estimates for refrigerators, CPAP machines, laptops, TVs, and inverters across LiFePO4 and lead-acid deep-cycle batteries.
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
                Compare solar panels in series vs parallel. See clear wiring diagrams, calculate array voltage and current, and size charge controllers for off-grid and RV systems.
              </p>
              <div className="text-xs font-semibold text-indigo-600 flex items-center gap-1 pt-2">
                <span>Read Series vs Parallel Guide</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link
              href="/how-many-solar-panels-do-i-need"
              className="group block p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500 hover:shadow-lg transition space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
                  Solar PV Planning Guide
                </span>
                <span className="inline-flex items-center gap-1 text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>14 min read</span>
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition">
                How Many Solar Panels Do I Need to Power My House?
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Determine required solar panels from your electric bill. Step-by-step sizing using monthly kWh, peak sun hours, system performance factor, and panel wattage.
              </p>
              <div className="text-xs font-semibold text-indigo-600 flex items-center gap-1 pt-2">
                <span>Read Solar Sizing Guide</span>
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
                Learn daily, monthly, and annual solar panel electricity generation. 400W reference examples, peak sun hours, system deratings, and production variables.
              </p>
              <div className="text-xs font-semibold text-indigo-600 flex items-center gap-1 pt-2">
                <span>Read Production Guide</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link
              href="/how-to-calculate-electricity-usage"
              className="group block p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500 hover:shadow-lg transition space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
                  Energy Auditing Guide
                </span>
                <span className="inline-flex items-center gap-1 text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>15 min read</span>
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition">
                How to Calculate Electricity Usage: kWh, Appliance Audits &amp; Costs
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Step-by-step methodology for converting Watts to kWh, calculating single appliance and household consumption, factoring duty cycles and standby phantom power, and estimating monthly utility costs.
              </p>
              <div className="text-xs font-semibold text-indigo-600 flex items-center gap-1 pt-2">
                <span>Read Electricity Usage Guide</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link
              href="/how-to-calculate-watts-for-a-generator"
              className="group block p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500 hover:shadow-lg transition space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
                  Generator Sizing Guide
                </span>
                <span className="inline-flex items-center gap-1 text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>14 min read</span>
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition">
                How to Calculate Watts for a Generator: Running &amp; Starting Watts Explained
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Master running watts, starting surge demand, motor inrush math, and 25% safety margins to calculate the exact generator capacity needed during utility outages.
              </p>
              <div className="text-xs font-semibold text-indigo-600 flex items-center gap-1 pt-2">
                <span>Read Generator Watts Guide</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link
              href="/continuous-power-generators"
              className="group block p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500 hover:shadow-lg transition space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
                  Industrial Power Guide
                </span>
                <span className="inline-flex items-center gap-1 text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>14 min read</span>
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition">
                What Is a Continuous Power Generator? How It Works and When You Need One
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Understand ISO 8528 continuous ratings (COP vs PRP vs ESP), 1800 RPM industrial powertrains, wet stacking hazards, and residential standby realities.
              </p>
              <div className="text-xs font-semibold text-indigo-600 flex items-center gap-1 pt-2">
                <span>Read Continuous Power Guide</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
