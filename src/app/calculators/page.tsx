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
              <h3 className="text-xl font-bold text-slate-700">
                Wire Gauge (AWG) &amp; Voltage Drop Calculator
              </h3>
              <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                Calculate required wire gauge based on circuit amperage, voltage drop limit (typically 3%), and circuit run distance.
              </p>
            </div>
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
          </div>
        </section>
      </div>
    </>
  );
}
