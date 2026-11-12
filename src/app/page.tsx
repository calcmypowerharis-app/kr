import { Metadata } from "next";
import Link from "next/link";
import {
  Battery,
  Zap,
  BatteryCharging,
  ArrowRight,
  Cpu,
  Sun,
  Plug,
  BookOpen,
  CheckCircle2,
  Clock,
  Download,
  Gauge,
  Sliders,
  Scale,
  Compass,
} from "lucide-react";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
} from "@/lib/seo/schema";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { QuickPowerChecker } from "@/components/home/QuickPowerChecker";

export const metadata: Metadata = buildPageMetadata({
  title: "CalcMyPower | Power, Energy & Electrical Calculators",
  description:
    "Size backup battery banks, convert watts to amps, and calculate generator wattage using transparent engineering formulas and NEC continuous-load standards.",
  path: "/",
  isRoot: true,
});

export default function Home() {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <div className="space-y-16 py-8 md:py-14">
        {/* 1. Hero Section with Interactive Quick Bench Checker */}
        <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headlines & Standards */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 border border-slate-200/90 text-xs font-mono font-semibold text-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Industrial-Grade US Power Calculators</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Electrical, Battery Backup &amp; Generator Sizing Calculators
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Practical engineering tools for US homeowners, electricians, and off-grid installers. Built with published equations, transparent assumptions, and National Electrical Code (NEC) continuous-load margins.
              </p>

              {/* Quick Jump Action Pills to Categories */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-bold text-slate-400 mr-1 uppercase tracking-wider">
                  Jump to:
                </span>
                <a
                  href="#load-backup"
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-xs font-bold text-slate-700 hover:text-blue-700 transition shadow-2xs"
                >
                  Load &amp; Generator
                </a>
                <a
                  href="#solar-pv"
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-xs font-bold text-slate-700 hover:text-blue-700 transition shadow-2xs"
                >
                  Solar PV
                </a>
                <a
                  href="#battery-dc"
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-xs font-bold text-slate-700 hover:text-blue-700 transition shadow-2xs"
                >
                  Battery &amp; DC
                </a>
                <a
                  href="#wire-circuits"
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-xs font-bold text-slate-700 hover:text-blue-700 transition shadow-2xs"
                >
                  Wire &amp; Circuit
                </a>
                <a
                  href="#field-guides"
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-xs font-bold text-slate-700 hover:text-blue-700 transition shadow-2xs"
                >
                  Wiring Guides
                </a>
                <Link
                  href="/calculators"
                  className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 hover:border-blue-400 hover:bg-blue-100 text-xs font-bold text-blue-700 transition shadow-2xs inline-flex items-center gap-1"
                >
                  <span>All 15 Tools</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Quality & Standards Strip */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-3 text-xs text-slate-500 border-t border-slate-200">
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>NEC (NFPA 70) 2023/2026 References</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Client-Side Calculations</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Pure Math &amp; Code Baselines</span>
                </div>
              </div>
            </div>

            {/* Right Column: Instant Quick Power Checker Widget */}
            <div className="lg:col-span-5">
              <QuickPowerChecker />
            </div>
          </div>
        </section>

        {/* 2. Compact 4-Category Workbench Grid */}
        <section id="workbench" className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Engineering Workbench Calculators
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Select a tool below to size electrical equipment, evaluate storage capacity, and verify conductor limits.
              </p>
            </div>
            <Link
              href="/calculators"
              className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View Full Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-10">
            {/* Category 1: Load & Backup Sizing */}
            <div id="load-backup" className="space-y-4 scroll-mt-20">
              <div className="flex items-baseline justify-between border-b border-slate-100 pb-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    1. Load &amp; Backup Sizing
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Generator wattage, fuel consumption, UPS runtime, and residential energy audits.
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold text-slate-400">
                  5 Tools
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link
                  href="/generator-size-calculator"
                  className="group bg-white rounded-xl border border-slate-200/90 hover:border-blue-500 hover:shadow-md transition p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition shrink-0">
                        <Plug className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded border uppercase tracking-wider bg-blue-50 text-blue-700 border-blue-200">
                        Emergency Power
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                      Generator Size Calculator
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      Size a backup generator that will not bog down when well pumps, furnace blowers, or AC compressors start up.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px] font-mono text-slate-500 bg-slate-50/80 -mx-5 -mb-5 px-5 py-2.5 rounded-b-xl">
                    <span className="truncate">Running W · Motor Surge W · 125% Headroom</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition shrink-0" />
                  </div>
                </Link>

                <Link
                  href="/generator-fuel-consumption-calculator"
                  className="group bg-white rounded-xl border border-slate-200/90 hover:border-blue-500 hover:shadow-md transition p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition shrink-0">
                        <Gauge className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded border uppercase tracking-wider bg-blue-50 text-blue-700 border-blue-200">
                        Fuel Logistics
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                      Generator Fuel Consumption
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      Calculate gas, propane, or diesel gallons burned per hour and estimate tank runtimes across real load levels.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px] font-mono text-slate-500 bg-slate-50/80 -mx-5 -mb-5 px-5 py-2.5 rounded-b-xl">
                    <span className="truncate">Gal/Hr · Tank Runtime Hrs · Cost/Hr</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition shrink-0" />
                  </div>
                </Link>

                <Link
                  href="/ups-battery-backup-calculator"
                  className="group bg-white rounded-xl border border-slate-200/90 hover:border-blue-500 hover:shadow-md transition p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition shrink-0">
                        <BatteryCharging className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded border uppercase tracking-wider bg-emerald-50 text-emerald-700 border-emerald-200">
                        Critical Power
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                      UPS &amp; Battery Backup Runtime
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      Find true backup runtime hours for routers, PCs, and medical gear after inverter idle draw and DoD limits.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px] font-mono text-slate-500 bg-slate-50/80 -mx-5 -mb-5 px-5 py-2.5 rounded-b-xl">
                    <span className="truncate">Runtime Hours · Usable Wh · Inverter Amps</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition shrink-0" />
                  </div>
                </Link>

                <Link
                  href="/electricity-use-calculator"
                  className="group bg-white rounded-xl border border-slate-200/90 hover:border-blue-500 hover:shadow-md transition p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition shrink-0">
                        <Sliders className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded border uppercase tracking-wider bg-slate-100 text-slate-700 border-slate-200">
                        Energy Audit
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                      Electricity Usage Calculator
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      Tally daily and monthly kilowatt-hour consumption across home appliances with realistic duty cycles.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px] font-mono text-slate-500 bg-slate-50/80 -mx-5 -mb-5 px-5 py-2.5 rounded-b-xl">
                    <span className="truncate">Daily Wh · Monthly kWh · Appliance Share %</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition shrink-0" />
                  </div>
                </Link>

                <Link
                  href="/electricity-cost-calculator"
                  className="group bg-white rounded-xl border border-slate-200/90 hover:border-blue-500 hover:shadow-md transition p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition shrink-0">
                        <Scale className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded border uppercase tracking-wider bg-slate-100 text-slate-700 border-slate-200">
                        Utility Billing
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                      Electricity Cost Calculator
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      Estimate electric bills and appliance operating costs across tiered and time-of-use kilowatt-hour rates.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px] font-mono text-slate-500 bg-slate-50/80 -mx-5 -mb-5 px-5 py-2.5 rounded-b-xl">
                    <span className="truncate">Monthly Electric Bill · Cost/Year · Tier Impact</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition shrink-0" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Category 2: Solar PV Systems */}
            <div id="solar-pv" className="space-y-4 scroll-mt-20">
              <div className="flex items-baseline justify-between border-b border-slate-100 pb-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    2. Solar PV Systems
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Array sizing, off-grid battery storage, charge controllers, and seasonal tilt.
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold text-slate-400">
                  4 Tools
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link
                  href="/solar-system-size-calculator"
                  className="group bg-white rounded-xl border border-slate-200/90 hover:border-blue-500 hover:shadow-md transition p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition shrink-0">
                        <Sun className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded border uppercase tracking-wider bg-amber-50 text-amber-800 border-amber-200">
                        PV Array
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                      Solar System Size Calculator
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      Calculate required solar array wattage and panel count based on monthly electric bills and regional sun hours.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px] font-mono text-slate-500 bg-slate-50/80 -mx-5 -mb-5 px-5 py-2.5 rounded-b-xl">
                    <span className="truncate">Array kW · Panel Count · Daily Production Wh</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition shrink-0" />
                  </div>
                </Link>

                <Link
                  href="/solar-battery-calculator"
                  className="group bg-white rounded-xl border border-slate-200/90 hover:border-blue-500 hover:shadow-md transition p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition shrink-0">
                        <Battery className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded border uppercase tracking-wider bg-emerald-50 text-emerald-700 border-emerald-200">
                        Energy Storage
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                      Solar Battery Bank Sizing
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      Size an off-grid or hybrid energy storage bank with realistic cloudy-day autonomy and temperature deratings.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px] font-mono text-slate-500 bg-slate-50/80 -mx-5 -mb-5 px-5 py-2.5 rounded-b-xl">
                    <span className="truncate">Bank Ah · Usable Storage kWh · Unit Count</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition shrink-0" />
                  </div>
                </Link>

                <Link
                  href="/solar-charge-controller-calculator"
                  className="group bg-white rounded-xl border border-slate-200/90 hover:border-blue-500 hover:shadow-md transition p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition shrink-0">
                        <Zap className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded border uppercase tracking-wider bg-amber-50 text-amber-800 border-amber-200">
                        MPPT &amp; PWM
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                      Solar Charge Controller Sizing
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      Match MPPT or PWM charge controller amperage and max voltage with cold-weather panel Voc surge margins.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px] font-mono text-slate-500 bg-slate-50/80 -mx-5 -mb-5 px-5 py-2.5 rounded-b-xl">
                    <span className="truncate">Controller Amps · Array Voc · Array Isc Margin</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition shrink-0" />
                  </div>
                </Link>

                <Link
                  href="/solar-panel-tilt-calculator"
                  className="group bg-white rounded-xl border border-slate-200/90 hover:border-blue-500 hover:shadow-md transition p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition shrink-0">
                        <Compass className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded border uppercase tracking-wider bg-amber-50 text-amber-800 border-amber-200">
                        Roof &amp; Ground
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                      Solar Panel Tilt &amp; Angle
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      Find optimum seasonal solar panel tilt angles and roof slope adjustments to maximize winter and summer harvest.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px] font-mono text-slate-500 bg-slate-50/80 -mx-5 -mb-5 px-5 py-2.5 rounded-b-xl">
                    <span className="truncate">Optimal Tilt Angle · Winter/Summer Deg · Roof Factor</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition shrink-0" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Category 3: Battery Storage & DC */}
            <div id="battery-dc" className="space-y-4 scroll-mt-20">
              <div className="flex items-baseline justify-between border-b border-slate-100 pb-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    3. Battery Storage &amp; DC
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Amp-hour to Watt-hour conversion, usable depth of discharge, and inverter sizing.
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold text-slate-400">
                  2 Tools
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link
                  href="/battery-capacity-calculator"
                  className="group bg-white rounded-xl border border-slate-200/90 hover:border-blue-500 hover:shadow-md transition p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition shrink-0">
                        <Battery className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded border uppercase tracking-wider bg-emerald-50 text-emerald-700 border-emerald-200">
                        Storage Units
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                      Battery Capacity &amp; Sizing (Ah/Wh)
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      Convert between Amp-hours (Ah) and Watt-hours (Wh) with chemistry-specific usable depth of discharge.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px] font-mono text-slate-500 bg-slate-50/80 -mx-5 -mb-5 px-5 py-2.5 rounded-b-xl">
                    <span className="truncate">Total Wh · Usable Wh · Bank Voltage (12/24/48V)</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition shrink-0" />
                  </div>
                </Link>

                <Link
                  href="/inverter-size-calculator"
                  className="group bg-white rounded-xl border border-slate-200/90 hover:border-blue-500 hover:shadow-md transition p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition shrink-0">
                        <Zap className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded border uppercase tracking-wider bg-blue-50 text-blue-700 border-blue-200">
                        DC to AC
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                      Inverter Size Calculator
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      Size continuous and surge inverter wattage for household loads, plus calculate required DC copper cable gauge.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px] font-mono text-slate-500 bg-slate-50/80 -mx-5 -mb-5 px-5 py-2.5 rounded-b-xl">
                    <span className="truncate">Continuous W · Surge W · Min DC Cable AWG</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition shrink-0" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Category 4: Wire, Circuit & AC Power */}
            <div id="wire-circuits" className="space-y-4 scroll-mt-20">
              <div className="flex items-baseline justify-between border-b border-slate-100 pb-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    4. Wire, Circuit &amp; AC Power
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Electrical conversions, voltage drop over distance, and three-phase industrial calculations.
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold text-slate-400">
                  4 Tools
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link
                  href="/watts-to-amps-calculator"
                  className="group bg-white rounded-xl border border-slate-200/90 hover:border-blue-500 hover:shadow-md transition p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition shrink-0">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded border uppercase tracking-wider bg-indigo-50 text-indigo-700 border-indigo-200">
                        Circuit Loading
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                      Watts to Amps Electrical Calculator
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      Convert real wattage to circuit amperage for DC, 120V/240V 1Φ, and 480V 3Φ with NEC continuous-load rules.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px] font-mono text-slate-500 bg-slate-50/80 -mx-5 -mb-5 px-5 py-2.5 rounded-b-xl">
                    <span className="truncate">Current (Amps) · Breaker Size · 80% NEC Limit</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition shrink-0" />
                  </div>
                </Link>

                <Link
                  href="/amps-to-watts-calculator"
                  className="group bg-white rounded-xl border border-slate-200/90 hover:border-blue-500 hover:shadow-md transition p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition shrink-0">
                        <Zap className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded border uppercase tracking-wider bg-indigo-50 text-indigo-700 border-indigo-200">
                        Breaker Wattage
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                      Amps to Watts Electrical Calculator
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      Determine true wattage and maximum continuous electrical capacity from circuit breaker amperage ratings.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px] font-mono text-slate-500 bg-slate-50/80 -mx-5 -mb-5 px-5 py-2.5 rounded-b-xl">
                    <span className="truncate">Real Power (Watts) · Continuous 80% W · kVA</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition shrink-0" />
                  </div>
                </Link>

                <Link
                  href="/voltage-drop-calculator"
                  className="group bg-white rounded-xl border border-slate-200/90 hover:border-blue-500 hover:shadow-md transition p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition shrink-0">
                        <Gauge className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded border uppercase tracking-wider bg-blue-50 text-blue-700 border-blue-200">
                        Wire Sizing
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                      Voltage Drop Calculator
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      Calculate conductor resistance and voltage drop percentage over distance to size copper or aluminum wires.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px] font-mono text-slate-500 bg-slate-50/80 -mx-5 -mb-5 px-5 py-2.5 rounded-b-xl">
                    <span className="truncate">Voltage Drop % · Voltage at Load · Min Conductor AWG</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition shrink-0" />
                  </div>
                </Link>

                <Link
                  href="/three-phase-power-calculator"
                  className="group bg-white rounded-xl border border-slate-200/90 hover:border-blue-500 hover:shadow-md transition p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition shrink-0">
                        <Zap className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded border uppercase tracking-wider bg-slate-100 text-slate-800 border-slate-300">
                        Industrial 3Φ
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                      Three-Phase Power Calculator
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      Solve balanced 3-phase circuits for kW, kVA, line current, and power factor with accurate square-root-of-3 math.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px] font-mono text-slate-500 bg-slate-50/80 -mx-5 -mb-5 px-5 py-2.5 rounded-b-xl">
                    <span className="truncate">Real kW · Apparent kVA · Line Current Amps (3Φ)</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition shrink-0" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Field Guides & Wiring Reference (Unified Editorial Section) */}
        <section
          id="field-guides"
          className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-20"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Field Guides &amp; Wiring Reference
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Practical calculation walk-throughs, NEC code compliance baselines, and printable engineering schematics.
              </p>
            </div>
            <Link
              href="/calculators#sizing-guides"
              className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Browse All Guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Featured Printable Reference Card: Series vs Parallel Wiring */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-1">
                <Sun className="w-6 h-6" />
              </div>
              <div className="space-y-2 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded bg-blue-500 text-white uppercase tracking-wider">
                    Printable Schematic
                  </span>
                  <span className="text-xs text-slate-400">• 2-Page US Letter Engineering PDF</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                  <Link
                    href="/solar-panels-series-vs-parallel"
                    className="hover:text-blue-400 transition"
                  >
                    Solar Panels Series vs. Parallel: Wiring Guide &amp; Printable Schematics
                  </Link>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Learn how series, parallel, and series-parallel array strings govern system voltage, string current, and MPPT charge controller limits. Download our verified two-page schematic sheet for your shop or jobsite binder.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
              <a
                href="/downloads/solar-panel-wiring-diagrams-quick-reference.pdf"
                download="solar-panel-wiring-diagrams-quick-reference.pdf"
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition inline-flex items-center justify-center gap-2 shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF (289 KB)</span>
              </a>
              <Link
                href="/solar-panels-series-vs-parallel"
                className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 hover:text-white hover:bg-slate-700 text-xs font-bold transition inline-flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Clean Editorial Table / High-Density List of All Field Guides */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Editorial Sizing Guides &amp; Calculations
              </span>
              <span className="text-xs font-mono text-slate-500">
                10 Published Articles
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {/* Guide 1 */}
              <Link
                href="/what-size-generator-do-i-need-for-my-house"
                className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/80 transition group"
              >
                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      Generators &amp; Outage
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 font-mono text-[11px] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>12 min read</span>
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="font-mono text-[11px] text-slate-500">
                      NEC Art. 700 &amp; 702
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                    What Size Generator Do I Need to Run My House?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Step-by-step 5.1 kW winter essentials storm model: starting surge deltas, transfer switches, and NEC continuous-load margins.
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:text-blue-800 transition self-start md:self-center">
                  <span>Read Guide</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Guide 2 */}
              <Link
                href="/what-size-generator-to-run-a-refrigerator"
                className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/80 transition group"
              >
                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      Generators &amp; Outage
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 font-mono text-[11px] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>8 min read</span>
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="font-mono text-[11px] text-slate-500">
                      NEMA Design B Inrush
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                    What Size Generator to Run a Refrigerator?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Starting surge demand vs running wattage for residential fridges, chest freezers, and inverter generators.
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:text-blue-800 transition self-start md:self-center">
                  <span>Read Guide</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Guide 3 */}
              <Link
                href="/how-long-will-a-100ah-battery-last"
                className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/80 transition group"
              >
                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Battery Storage
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 font-mono text-[11px] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>11 min read</span>
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="font-mono text-[11px] text-slate-500">
                      Peukert &amp; Inverter Derate
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                    How Long Will a 100Ah Battery Last?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Real-world delivered runtime for refrigerators, CPAPs, laptops, and inverters across LiFePO4 and lead-acid banks.
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:text-blue-800 transition self-start md:self-center">
                  <span>Read Guide</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Guide 4 */}
              <Link
                href="/how-many-watts-can-a-15-amp-or-20-amp-circuit-handle"
                className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/80 transition group"
              >
                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      Circuit Sizing
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 font-mono text-[11px] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>9 min read</span>
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="font-mono text-[11px] text-slate-500">
                      NEC Art. 210.20(A)
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                    How Many Watts Can a 15-Amp or 20-Amp Circuit Handle?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    The 80% continuous-load safety rule, 12 AWG vs 14 AWG wire ampacity, and multi-appliance branch circuit limits.
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:text-blue-800 transition self-start md:self-center">
                  <span>Read Guide</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Guide 5 */}
              <Link
                href="/what-does-ah-mean-on-a-battery"
                className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/80 transition group"
              >
                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Battery Storage
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 font-mono text-[11px] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>10 min read</span>
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="font-mono text-[11px] text-slate-500">
                      Battery Chemistry Physics
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                    What Does Ah Mean on a Battery?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Why Amp-hours are meaningless without voltage: converting Ah to Watt-hours (Wh) and evaluating usable capacity.
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:text-blue-800 transition self-start md:self-center">
                  <span>Read Guide</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Guide 6 */}
              <Link
                href="/what-is-a-watt-hour"
                className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/80 transition group"
              >
                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      Energy Basics
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 font-mono text-[11px] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>7 min read</span>
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="font-mono text-[11px] text-slate-500">
                      SI Units &amp; Utility Billing
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                    What is a Watt-Hour? (Wh vs. W Explained)
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    The critical distinction between electrical power (rate) and energy (stored work) with real household appliances.
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:text-blue-800 transition self-start md:self-center">
                  <span>Read Guide</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Guide 7 */}
              <Link
                href="/how-many-amp-hours-do-i-need"
                className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/80 transition group"
              >
                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Battery Storage
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 font-mono text-[11px] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>10 min read</span>
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="font-mono text-[11px] text-slate-500">
                      IEEE Std 485 Sizing
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                    How Many Amp Hours Do I Need for a Battery Bank?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Calculate total bank capacity from daily appliance Watt-hours, autonomy days, inverter losses, and DoD limits.
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:text-blue-800 transition self-start md:self-center">
                  <span>Read Guide</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Guide 8 */}
              <Link
                href="/how-much-energy-does-a-solar-panel-produce"
                className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/80 transition group"
              >
                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Solar PV
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 font-mono text-[11px] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>9 min read</span>
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="font-mono text-[11px] text-slate-500">
                      NREL PVWatts Baselines
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                    How Much Energy Does a Solar Panel Produce?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Daily and annual kilowatt-hour yields for 400W panels modeled across US regional peak sun hours and real derates.
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:text-blue-800 transition self-start md:self-center">
                  <span>Read Guide</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Guide 9 */}
              <Link
                href="/how-long-does-it-take-to-charge-a-battery-with-solar-panels"
                className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/80 transition group"
              >
                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Solar PV
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 font-mono text-[11px] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>10 min read</span>
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="font-mono text-[11px] text-slate-500">
                      CC/CV Charging Profiles
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                    How Long Does It Take to Charge a Battery with Solar Panels?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Realistic recharge hours across 12V, 24V, and 48V banks accounting for MPPT efficiency and battery absorption phases.
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:text-blue-800 transition self-start md:self-center">
                  <span>Read Guide</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* 4. Engineering Authority & Methodology Strip */}
        <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-4xl">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <BookOpen className="w-5 h-5 text-blue-600 shrink-0" />
                <h2>Calculation Methodology &amp; Engineering Baselines</h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Every CalcMyPower tool displays its governing mathematical formula, efficiency derates, and code references. We explicitly differentiate between <code className="font-mono text-slate-800 bg-white px-1.5 py-0.5 rounded border border-slate-200">1.25x</code> continuous-load safety rules (NEC Article 210/430) and empirical equipment surge allowances.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Review our full formula derivations on our <Link href="/about" className="text-blue-600 font-semibold hover:underline">About &amp; Methodology page</Link>, submit feedback via our <Link href="/contact" className="text-blue-600 font-semibold hover:underline">Contact desk</Link>, or read our <Link href="/terms" className="text-blue-600 font-semibold hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-blue-600 font-semibold hover:underline">Privacy Policy</Link>.
              </p>
            </div>
            <Link
              href="/calculators"
              className="px-5 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 hover:border-blue-500 hover:text-blue-600 text-xs sm:text-sm font-bold transition shrink-0 self-start md:self-center inline-flex items-center gap-2 shadow-2xs"
            >
              <span>Explore All Calculators</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
