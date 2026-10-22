import { Metadata } from "next";
import Link from "next/link";
import {
  Battery,
  Zap,
  BatteryCharging,
  ArrowRight,
  Cpu,
  Sliders,
  Sun,
  Plug,
  BookOpen,
  CheckCircle2,
  FileText,
  Clock,
  Activity,
  Flame,
  Layers,
  Download,
} from "lucide-react";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
} from "@/lib/seo/schema";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { ArticleDateByline } from "@/components/article/ArticleDateByline";

export const metadata: Metadata = buildPageMetadata({
  title: "CalcMyPower | Power, Energy & Electrical Calculators",
  description:
    "Size backup battery banks, convert watts to amps, and calculate generator wattage using transparent engineering formulas and NEC continuous-load standards.",
  path: "/",
  isRoot: true,
});

interface LiveTool {
  id: string;
  title: string;
  href: string;
  icon: React.ElementType;
  formula: string;
  summary: string;
  outputs: string[];
  cta: string;
}

const LIVE_CALCULATORS: LiveTool[] = [
  {
    id: "electricity-use-tool",
    title: "Electricity Usage Calculator",
    href: "/electricity-use-calculator",
    icon: Zap,
    formula: "E_daily = P × t × DF × Q | E_monthly = (E_daily × 30) ÷ 1,000 | Cost = E_monthly × Rate",
    summary:
      "Calculate daily and monthly electricity usage in Watt-hours and kilowatt-hours across household appliances with duty cycles and utility cost estimates.",
    outputs: [
      "Appliance energy consumption in daily/monthly Wh and kWh",
      "Multi-appliance inventory total with visual consumption share",
      "Compressor and thermostatic duty cycle scaling (10% to 100%)",
      "Estimated monthly electricity utility charge based on local rate",
    ],
    cta: "Open Electricity Usage Calculator",
  },
  {
    id: "battery-capacity-tool",
    title: "Battery Capacity & Sizing Calculator",
    href: "/battery-capacity-calculator",
    icon: Battery,
    formula: "Wh = V × Ah | Wh_usable = Wh × DoD | Ah_req = (P × t) ÷ (V × η × DoD)",
    summary:
      "Calculate battery storage in Watt-hours (Wh) and Amp-hours (Ah). Evaluate usable capacity across LiFePO4 and lead-acid chemistries, or size battery banks and unit counts for target loads.",
    outputs: [
      "Nominal and usable energy in Wh and kWh",
      "Depth of discharge (DoD) benchmarks for LiFePO4, AGM, and NMC",
      "Series vs. parallel bank voltage and capacity calculations",
      "Appliance load sizing with inverter efficiency derating",
    ],
    cta: "Open Battery Capacity Calculator",
  },
  {
    id: "generator-tool",
    title: "Generator Size Calculator",
    href: "/generator-size-calculator",
    icon: Plug,
    formula: "Peak = Running W + Max(Starting Surge W)",
    summary:
      "Calculate running watts, single-motor peak starting demand, and 1.25x recommended generator capacity for home outage backup, RV air conditioners, and jobsite equipment.",
    outputs: [
      "Total running watts and highest motor surge delta",
      "Peak starting demand and 1.25x planning capacity",
      "Apparent power (kVA) at configurable power factor",
      "21 residential, RV, and jobsite appliance presets",
    ],
    cta: "Open Generator Size Calculator",
  },
  {
    id: "ups-tool",
    title: "UPS & Battery Backup Runtime Calculator",
    href: "/ups-battery-backup-calculator",
    icon: BatteryCharging,
    formula: "T = (V × Ah × DoD × η) ÷ W",
    summary:
      "Estimate how long a 12V, 24V, or 48V battery bank or UPS will sustain continuous AC loads while accounting for inverter efficiency, usable depth of discharge, and high discharge C-rates.",
    outputs: [
      "Runtime in hours and minutes",
      "Usable battery energy (Wh) and DC current draw (A)",
      "LiFePO4 (90% DoD), AGM/Gel (50% DoD), and NMC presets",
      "1.25x continuous inverter sizing margin",
    ],
    cta: "Open UPS Runtime Calculator",
  },
  {
    id: "electricity-cost-tool",
    title: "Electricity Cost & Bill Calculator",
    href: "/electricity-cost-calculator",
    icon: Zap,
    formula: "Total Bill = (kWh × Rate) + Fixed + Riders + Tax | Effective = Bill ÷ kWh",
    summary:
      "Calculate monthly electric utility charges from volumetric kWh usage, tiered electric rates, fixed customer fees, and taxes to reveal true effective cost per kWh.",
    outputs: [
      "Monthly and annual electric utility bill estimate",
      "Effective cost per kWh across all charges",
      "Volumetric energy supply vs fixed delivery breakdown",
      "Tiered rate schedules and seasonal rate comparison",
    ],
    cta: "Open Electricity Cost Calculator",
  },
  {
    id: "amps-tool",
    title: "Watts to Amps Calculator",
    href: "/watts-to-amps-calculator",
    icon: Cpu,
    formula: "I = P ÷ (V × PF) | 3Φ: I = P ÷ (√3 × V × PF)",
    summary:
      "Convert active power (Watts) to electrical current (Amps) across DC, single-phase AC (120V/240V), and balanced three-phase AC (208V/240V/480V) circuits with power factor adjustments.",
    outputs: [
      "Operating current (Amps) and apparent power (VA)",
      "NEC 125% continuous-load minimum breaker amps",
      "Standard NEC 240.6(A) breaker trade size match",
      "Line-to-Line vs. Line-to-Neutral 3-phase support",
    ],
    cta: "Open Watts to Amps Calculator",
  },
  {
    id: "watts-tool",
    title: "Amps to Watts Calculator",
    href: "/amps-to-watts-calculator",
    icon: Zap,
    formula: "P = I × V × PF | 3Φ: P = √3 × V × I × PF",
    summary:
      "Convert electrical current (Amps) and voltage to real power (Watts) and apparent power (VA) across DC, single-phase 120V/240V, and balanced 3-phase circuits.",
    outputs: [
      "Real power (Watts) and apparent power (VA)",
      "NEC continuous-load benchmark (80% for 3+ hr duty on standard breakers)",
      "Standard 15A & 20A household circuit capacity benchmarks",
      "DC, single-phase AC, and three-phase AC configurations",
    ],
    cta: "Open Amps to Watts Calculator",
  },
  {
    id: "charge-controller-tool",
    title: "Solar Charge Controller Calculator",
    href: "/solar-charge-controller-calculator",
    icon: Zap,
    formula: "I_nominal = P_array ÷ V_battery | Voc_cold = Voc_STC × [1 + α × (T_min - 25°C)]",
    summary:
      "Calculate the required charge controller amperage rating and verify cold-temperature open-circuit voltage headroom across MPPT and PWM technologies.",
    outputs: [
      "Nominal and planning charging current (Amps)",
      "Standard controller current rating class recommendation",
      "Cold-weather Voc expansion check (NEC 690.7)",
      "12V, 24V, and 48V DC battery system voltage support",
    ],
    cta: "Open Charge Controller Calculator",
  },
  {
    id: "solar-battery-tool",
    title: "Solar Battery Calculator",
    href: "/solar-battery-calculator",
    icon: BatteryCharging,
    formula: "E_nom = (E_daily × N_days) ÷ (η_inv × DoD) | Ah = E_nom ÷ V_dc",
    summary:
      "Size off-grid and backup solar battery banks in kWh and Amp-hours based on daily energy consumption, days of autonomy, inverter losses, and usable depth of discharge.",
    outputs: [
      "Nominal storage capacity in kWh and Watt-hours",
      "Battery-bank Amp-hours at 12V, 24V, and 48V DC bus",
      "Load-side autonomy energy and inverter delivery energy",
      "Simplified solar PV array replenishment wattage estimate",
    ],
    cta: "Open Solar Battery Calculator",
  },
  {
    id: "solar-system-size-tool",
    title: "Solar System Size Calculator",
    href: "/solar-system-size-calculator",
    icon: Sun,
    formula: "P_array_kW = (E_daily × Offset%) ÷ (PSH × PR) | Panels = Math.ceil(P_array_W ÷ W_panel)",
    summary:
      "Calculate the residential solar system size in kW and approximate panel count required to offset monthly electricity usage based on local peak sun hours.",
    outputs: [
      "Estimated system size (kW DC) and panel count",
      "Daily and annual solar energy generation targets",
      "Net module area and gross roof space with fire setbacks",
      "Module wattage comparison across 330W to 450W panels",
    ],
    cta: "Open Solar System Size Calculator",
  },
  {
    id: "voltage-drop-tool",
    title: "Voltage Drop Calculator",
    href: "/voltage-drop-calculator",
    icon: Sliders,
    formula: "VD = mult × I × (L ÷ 1,000) × R | 1Φ: 2 | 3Φ: √3",
    summary:
      "Calculate circuit voltage drop, percentage loss, and receiving terminal voltage across DC, single-phase AC, and balanced three-phase AC systems.",
    outputs: [
      "Calculated voltage loss (Volts) and drop percentage (%)",
      "Receiving terminal voltage at connected load",
      "Total circuit loop resistance (75°C stranded baseline)",
      "Adjacent AWG & kcmil conductor comparison table",
    ],
    cta: "Open Voltage Drop Calculator",
  },
  {
    id: "generator-fuel-tool",
    title: "Generator Fuel Consumption Calculator",
    href: "/generator-fuel-consumption-calculator",
    icon: Flame,
    formula: "Gallons/hr = Max Fuel / Hours",
    summary:
      "Estimate how much gasoline, propane, or diesel your generator will consume based on its running wattage and fuel tank size.",
    outputs: [
      "Hourly fuel consumption rate",
      "Cost per 24 hours of operation",
      "Total fuel tank runtime",
      "Gasoline, Propane, and Diesel presets",
    ],
    cta: "Open Fuel Consumption Calculator",
  },
  {
    id: "three-phase-power-tool",
    title: "Three Phase Power Calculator",
    href: "/three-phase-power-calculator",
    icon: Activity,
    formula: "P = √3 × V_LL × I × PF | S = √3 × V_LL × I | I = P ÷ (√3 × V_LL × PF)",
    summary:
      "Calculate 3-phase real power (kW), apparent power (kVA), reactive power (kVAR), and line current (Amps) across balanced commercial and industrial circuits.",
    outputs: [
      "Real active power (kW) and apparent demand (kVA)",
      "Line current (Amps) solved bidirectionally from load power",
      "Line-to-line (V_LL) and line-to-neutral (V_LN) conversion",
      "Power triangle decomposition (kW, kVA, and kVAR)",
    ],
    cta: "Open Three Phase Power Calculator",
  },
  {
    id: "solar-tilt-tool",
    title: "Solar Panel Tilt Angle Calculator",
    href: "/solar-panel-tilt-calculator",
    icon: Sun,
    formula: "θ_roof = atan(pitch/12) × (180/π) | Tilt_winter = lat + 15°",
    summary:
      "Calculate optimal solar panel tilt angles, compass orientation, and roof pitch differences for your latitude across year-round, winter, and summer optimization targets.",
    outputs: [
      "Optimal tilt angle and empirical Landau estimate (25° to 50° N)",
      "Roof pitch slope conversion (0/12 to 12/12) and geometric delta",
      "True South (180°) and True North (0°) compass azimuth guidance",
      "Low-tilt rainwater drainage and cold-climate snow shedding advisories",
    ],
    cta: "Open Solar Panel Tilt Calculator",
  },
];

export default function HomePage() {
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
        {/* 1. Enhanced Hero Section */}
        <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold tracking-wide shadow-xs">
            <Zap className="w-3.5 h-3.5 fill-current text-blue-600" />
            <span>US Electrical, Battery &amp; Backup Power Engineering Tools</span>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Electrical, Battery Backup &amp; Generator Sizing Calculators
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl">
              Calculate UPS battery runtime hours, circuit amperage, and backup generator wattage using published equations, explicit efficiency factors, and National Electrical Code (NEC) continuous-load margins.
            </p>
          </div>

          {/* Quick Jump Action Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-semibold text-slate-400 mr-1 uppercase tracking-wider">
              Quick Jump:
            </span>
            <a
              href="#electricity-use-tool"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-xs font-semibold text-slate-700 hover:text-blue-700 transition shadow-xs"
            >
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              <span>Electricity Usage</span>
            </a>
            <a
              href="#battery-capacity-tool"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-xs font-semibold text-slate-700 hover:text-blue-700 transition shadow-xs"
            >
              <Battery className="w-3.5 h-3.5 text-blue-600" />
              <span>Battery Capacity</span>
            </a>
            <a
              href="#generator-tool"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-xs font-semibold text-slate-700 hover:text-blue-700 transition shadow-xs"
            >
              <Plug className="w-3.5 h-3.5 text-blue-600" />
              <span>Generator Sizing</span>
            </a>
            <a
              href="#ups-tool"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-xs font-semibold text-slate-700 hover:text-blue-700 transition shadow-xs"
            >
              <BatteryCharging className="w-3.5 h-3.5 text-blue-600" />
              <span>UPS Runtime</span>
            </a>
            <a
              href="#amps-tool"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-xs font-semibold text-slate-700 hover:text-blue-700 transition shadow-xs"
            >
              <Cpu className="w-3.5 h-3.5 text-blue-600" />
              <span>Watts to Amps</span>
            </a>
            <a
              href="#watts-tool"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-xs font-semibold text-slate-700 hover:text-blue-700 transition shadow-xs"
            >
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              <span>Amps to Watts</span>
            </a>
            <a
              href="#featured-guides"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/50 text-xs font-semibold text-slate-700 hover:text-indigo-700 transition shadow-xs"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              <span>Sizing Guides</span>
            </a>
            <Link
              href="/calculators"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 hover:border-blue-400 hover:bg-blue-100 text-xs font-bold text-blue-700 transition shadow-xs"
            >
              <span>View All Calculators</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
            </Link>
          </div>

          {/* Quality & Standards Strip */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-4 text-xs text-slate-500 border-t border-slate-200/80">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>NEC (NFPA 70) Sizing References</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Client-Side Privacy (Zero Remote Tracking)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Transparent Formulas &amp; Worked Calculations</span>
            </div>
          </div>
        </section>

        {/* 2. Live Interactive Calculators (Balanced 3-Column Grid) */}
        <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Live Interactive Calculators
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Select a tool below to run interactive calculations with transparent equations, NEC continuous-load margins, and instant results.
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full self-start sm:self-auto flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{LIVE_CALCULATORS.length} Live Calculators</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LIVE_CALCULATORS.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  id={tool.id}
                  key={tool.href}
                  href={tool.href}
                  className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all p-6 sm:p-7 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <code className="text-[11px] font-mono font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg truncate max-w-[200px] sm:max-w-none">
                        {tool.formula}
                      </code>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                      {tool.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {tool.summary}
                    </p>

                    <div className="pt-2 border-t border-slate-100">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Key Outputs &amp; Capabilities:
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {tool.outputs.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold leading-none mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="w-full py-2.5 px-4 rounded-xl bg-slate-50 group-hover:bg-blue-600 group-hover:text-white border border-slate-200 group-hover:border-blue-600 text-slate-800 text-xs sm:text-sm font-bold flex items-center justify-between transition-colors">
                      <span>{tool.cta}</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 3. Featured Engineering Guides & Outage Planning (Editorial Integration) */}
        <section
          id="featured-guides"
          className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Practical Engineering Guides &amp; Outage Planning
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                In-depth technical guides explaining calculations, safety codes, and equipment selection with worked examples.
              </p>
            </div>
            <Link
              href="/what-size-generator-do-i-need-for-my-house"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Explore Sizing Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Featured Large Guide Card */}
          <div className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-lg transition p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
                In-Depth Technical Guide
              </span>
              <span className="text-slate-400">•</span>
              <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>12 min read</span>
              </span>
              <span className="text-slate-400">•</span>
              <ArticleDateByline datePublished="2026-09-27" lastModified="2026-09-28" className="text-slate-400" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-4">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                  <Link
                    href="/what-size-generator-do-i-need-for-my-house"
                    className="hover:text-indigo-600 transition"
                  >
                    What Size Generator Do I Need to Run My House? (Complete Calculation Guide)
                  </Link>
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Learn how to calculate required continuous running wattage and motor startup surge demand for your home during utility outages. This comprehensive engineering resource walks through real-world electrical equipment, inrush currents, power transfer methods, and NEC continuous-load margins.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <div className="font-bold text-slate-800 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span>Four-Step Sizing Method</span>
                    </div>
                    <p className="text-slate-600">
                      Running Watts + Max Starting Surge Delta + 25% Planning Margin.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <div className="font-bold text-slate-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>Worked Storm Scenario</span>
                    </div>
                    <p className="text-slate-600">
                      Step-by-step 5.1 kW winter essentials outage model with furnace and fridge.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Interactive Features
                </div>
                <ul className="text-xs text-slate-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>1-click bridge to load the 5.1 kW storm scenario directly into the calculator</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>Transfer switch safety vs. illegal backfeeding guidelines (NEC Article 702)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>Inverter vs. open-frame vs. standby generator comparison table</span>
                  </li>
                </ul>

                <Link
                  href="/what-size-generator-do-i-need-for-my-house"
                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition"
                >
                  <span>Read Sizing Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Secondary Guides (Balanced 2x2 Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Guide 1: 100Ah Battery Runtime (Flagship) */}
            <div className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-md transition p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
                    Battery Runtime Guide
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>12 min read</span>
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  <Link
                    href="/how-long-will-a-100ah-battery-last"
                    className="hover:text-indigo-600 transition"
                  >
                    How Long Will a 100Ah Battery Last? 12V Appliance Runtime Guide
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Realistic delivered runtime estimates for refrigerators, CPAP machines, laptops, TVs, and inverters across LiFePO4 and lead-acid deep-cycle batteries.
                </p>
              </div>

              <Link
                href="/how-long-will-a-100ah-battery-last"
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 pt-1"
              >
                <span>Read 100Ah Runtime Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Guide 2: Refrigerator Generator Sizing */}
            <div className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-md transition p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
                    Appliance Outage Guide
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>10 min read</span>
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  <Link
                    href="/what-size-generator-to-run-a-refrigerator"
                    className="hover:text-indigo-600 transition"
                  >
                    What Size Generator Do I Need to Run a Refrigerator?
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Determine exact running watts and compressor startup surge requirements for residential kitchen refrigerators, garage freezers, and extension cord AWG safety.
                </p>
              </div>

              <Link
                href="/what-size-generator-to-run-a-refrigerator"
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 pt-1"
              >
                <span>Read Refrigerator Sizing Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <Link
                    href="/generator-fuel-consumption-calculator"
                    className="text-xs font-semibold text-slate-600 hover:text-indigo-600 inline-flex items-center gap-1"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Generator Fuel Consumption Guide</span>
                  </Link>
                </div>
            </div>

            {/* Guide 3: Battery Amp-Hours Explained */}
            <div className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-md transition p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
                    Battery Engineering Guide
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>9 min read</span>
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  <Link
                    href="/what-does-ah-mean-on-a-battery"
                    className="hover:text-indigo-600 transition"
                  >
                    What Does Ah Mean on a Battery? Amp-Hours Explained
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Understand battery charge capacity, convert Amp-hours to Watt-hours (Wh), and evaluate how chemistry, depth of discharge, and Peukert losses determine runtime.
                </p>
              </div>

              <Link
                href="/what-does-ah-mean-on-a-battery"
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 pt-1"
              >
                <span>Read Battery Ah Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Guide 4: Watt-Hours Explained */}
            <div className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-md transition p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
                    Energy Fundamentals
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>9 min read</span>
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  <Link
                    href="/what-is-a-watt-hour"
                    className="hover:text-indigo-600 transition"
                  >
                    What Is a Watt-Hour (Wh)? Watts vs. Watt-Hours Explained
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Discover the difference between instantaneous power (Watts) and energy consumed over time (Watt-hours), with practical battery runtime and utility calculations.
                </p>
              </div>

              <Link
                href="/what-is-a-watt-hour"
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 pt-1"
              >
                <span>Read Watt-Hour Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* 4. Complete Engineering Directory by Topical Cluster (1-Hop Crawl Discovery) */}
        <section id="directory" className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
                <Layers className="w-4 h-4" />
                <span>Sitewide Engineering Directory</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Browse Calculators &amp; Sizing Guides by Power Cluster
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Immediate 1-hop access to all 34 interactive calculators, appliance references, and NEC engineering sizing guides.
              </p>
            </div>
            <Link
              href="/calculators"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 self-start sm:self-auto shrink-0"
            >
              <span>View Full Directory Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Cluster 1: Solar PV & Off-Grid */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between space-y-5 hover:border-amber-400 hover:shadow-md transition">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Sun className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug">
                      Solar PV &amp; Storage
                    </h3>
                    <p className="text-[11px] text-slate-500">Array sizing, tilt &amp; charge time</p>
                  </div>
                </div>

                <div className="space-y-2 border-t border-slate-100 pt-3">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Calculators &amp; Tools
                  </div>
                  <ul className="space-y-1.5 text-xs">
                    <li>
                      <Link href="/solar-panel-tilt-calculator" className="text-slate-700 hover:text-amber-600 transition flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                        <span>Solar Panel Tilt Calculator</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/solar-battery-calculator" className="text-slate-700 hover:text-amber-600 transition flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                        <span>Solar Battery Calculator</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/solar-charge-controller-calculator" className="text-slate-700 hover:text-amber-600 transition flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                        <span>Solar Charge Controller</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/solar-system-size-calculator" className="text-slate-700 hover:text-amber-600 transition flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                        <span>Solar System Size Calculator</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/how-long-does-it-take-to-charge-a-battery-with-solar-panels" className="text-slate-700 hover:text-amber-600 transition flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                        <span>Solar Battery Charge Time</span>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2 border-t border-slate-100 pt-3">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Sizing Guides
                  </div>
                  <ul className="space-y-1.5 text-xs">
                    <li>
                      <Link href="/solar-panels-series-vs-parallel" className="text-slate-600 hover:text-amber-600 transition flex items-center gap-1.5">
                        <span className="text-slate-400">•</span>
                        <span>Series vs Parallel Wiring</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/solar-system-size-calculator" className="text-slate-600 hover:text-amber-600 transition flex items-center gap-1.5">
                        <span className="text-slate-400">•</span>
                        <span>Solar System Sizing & Panels</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/how-much-energy-does-a-solar-panel-produce" className="text-slate-600 hover:text-amber-600 transition flex items-center gap-1.5">
                        <span className="text-slate-400">•</span>
                        <span>Panel Energy Production (Wh)</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/solar-charge-controller-calculator" className="text-slate-600 hover:text-amber-600 transition flex items-center gap-1.5">
                        <span className="text-slate-400">•</span>
                        <span>Charge Controller Sizing</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <Link
                href="/calculators#solar"
                className="text-xs font-semibold text-amber-600 hover:text-amber-800 flex items-center gap-1 pt-2 border-t border-slate-100"
              >
                <span>Explore Solar Tools</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Cluster 2: Generators & Outage Power */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between space-y-5 hover:border-blue-400 hover:shadow-md transition">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Plug className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug">
                      Generators &amp; Outage
                    </h3>
                    <p className="text-[11px] text-slate-500">Wattage, fuel rate &amp; home backup</p>
                  </div>
                </div>

                <div className="space-y-2 border-t border-slate-100 pt-3">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Calculators &amp; Charts
                  </div>
                  <ul className="space-y-1.5 text-xs">
                    <li>
                      <Link href="/generator-size-calculator" className="text-slate-700 hover:text-blue-600 transition flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                        <span>Generator Size Calculator</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/generator-fuel-consumption-calculator" className="text-slate-700 hover:text-blue-600 transition flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                        <span>Generator Fuel Consumption</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/generator-size-calculator" className="text-slate-700 hover:text-blue-600 transition flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                        <span>Generator Amperage Chart</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/generator-size-calculator" className="text-slate-700 hover:text-blue-600 transition flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                        <span>Generator Wattage Chart</span>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2 border-t border-slate-100 pt-3">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Sizing Guides
                  </div>
                  <ul className="space-y-1.5 text-xs">
                    <li>
                      <Link href="/what-size-generator-do-i-need-for-my-house" className="text-slate-600 hover:text-blue-600 transition flex items-center gap-1.5">
                        <span className="text-slate-400">•</span>
                        <span>Whole House Generator Sizing</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/what-size-generator-to-run-a-refrigerator" className="text-slate-600 hover:text-blue-600 transition flex items-center gap-1.5">
                        <span className="text-slate-400">•</span>
                        <span>Refrigerator Outage Sizing</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/generator-fuel-consumption-calculator" className="text-slate-600 hover:text-blue-600 transition flex items-center gap-1.5">
                        <span className="text-slate-400">•</span>
                        <span>Gas Usage (Gal/Hr) Guide</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/generator-size-calculator" className="text-slate-600 hover:text-blue-600 transition flex items-center gap-1.5">
                        <span className="text-slate-400">•</span>
                        <span>Running vs Starting Watts</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/what-size-generator-do-i-need-for-my-house" className="text-slate-600 hover:text-blue-600 transition flex items-center gap-1.5">
                        <span className="text-slate-400">•</span>
                        <span>Continuous Power Generators</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <Link
                href="/calculators#generators"
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 pt-2 border-t border-slate-100"
              >
                <span>Explore Generator Tools</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Cluster 3: Battery Storage & UPS Backup */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between space-y-5 hover:border-emerald-400 hover:shadow-md transition">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <BatteryCharging className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug">
                      Battery &amp; UPS Storage
                    </h3>
                    <p className="text-[11px] text-slate-500">Capacity, runtime &amp; inverter size</p>
                  </div>
                </div>

                <div className="space-y-2 border-t border-slate-100 pt-3">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Calculators &amp; Tools
                  </div>
                  <ul className="space-y-1.5 text-xs">
                    <li>
                      <Link href="/ups-battery-backup-calculator" className="text-slate-700 hover:text-emerald-600 transition flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                        <span>UPS Runtime Calculator</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/battery-capacity-calculator" className="text-slate-700 hover:text-emerald-600 transition flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                        <span>Battery Capacity &amp; Sizing</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/inverter-size-calculator" className="text-slate-700 hover:text-emerald-600 transition flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                        <span>Inverter Size Calculator</span>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2 border-t border-slate-100 pt-3">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Sizing Guides
                  </div>
                  <ul className="space-y-1.5 text-xs">
                    <li>
                      <Link href="/what-does-ah-mean-on-a-battery" className="text-slate-600 hover:text-emerald-600 transition flex items-center gap-1.5">
                        <span className="text-slate-400">•</span>
                        <span>Amp-Hours (Ah) Explained</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/how-long-will-a-100ah-battery-last" className="text-slate-600 hover:text-emerald-600 transition flex items-center gap-1.5">
                        <span className="text-slate-400">•</span>
                        <span>100Ah Battery Runtime</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/how-many-amp-hours-do-i-need" className="text-slate-600 hover:text-emerald-600 transition flex items-center gap-1.5">
                        <span className="text-slate-400">•</span>
                        <span>How Many Ah Do I Need?</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/battery-capacity-calculator" className="text-slate-600 hover:text-emerald-600 transition flex items-center gap-1.5">
                        <span className="text-slate-400">•</span>
                        <span>Bank Amp-Hours (Series/Parallel)</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <Link
                href="/calculators#ups-battery"
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 flex items-center gap-1 pt-2 border-t border-slate-100"
              >
                <span>Explore Battery Tools</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Cluster 4: Electrical Circuits & Power */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between space-y-5 hover:border-indigo-400 hover:shadow-md transition">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug">
                      Circuits &amp; Electricity
                    </h3>
                    <p className="text-[11px] text-slate-500">Amps, watts, voltage drop &amp; cost</p>
                  </div>
                </div>

                <div className="space-y-2 border-t border-slate-100 pt-3">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Calculators &amp; Tools
                  </div>
                  <ul className="space-y-1.5 text-xs">
                    <li>
                      <Link href="/watts-to-amps-calculator" className="text-slate-700 hover:text-indigo-600 transition flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
                        <span>Watts to Amps Calculator</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/amps-to-watts-calculator" className="text-slate-700 hover:text-indigo-600 transition flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
                        <span>Amps to Watts Calculator</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/voltage-drop-calculator" className="text-slate-700 hover:text-indigo-600 transition flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
                        <span>Voltage Drop Calculator</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/three-phase-power-calculator" className="text-slate-700 hover:text-indigo-600 transition flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
                        <span>Three Phase Power</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/electricity-use-calculator" className="text-slate-700 hover:text-indigo-600 transition flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
                        <span>Electricity Usage Calculator</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/electricity-cost-calculator" className="text-slate-700 hover:text-indigo-600 transition flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
                        <span>Electricity Cost Calculator</span>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2 border-t border-slate-100 pt-3">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Sizing Guides
                  </div>
                  <ul className="space-y-1.5 text-xs">
                    <li>
                      <Link href="/what-is-a-watt-hour" className="text-slate-600 hover:text-indigo-600 transition flex items-center gap-1.5">
                        <span className="text-slate-400">•</span>
                        <span>Watt-Hour (Wh) Explained</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/electricity-use-calculator" className="text-slate-600 hover:text-indigo-600 transition flex items-center gap-1.5">
                        <span className="text-slate-400">•</span>
                        <span>Calculate Electricity Usage</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/electricity-cost-calculator" className="text-slate-600 hover:text-indigo-600 transition flex items-center gap-1.5">
                        <span className="text-slate-400">•</span>
                        <span>Calculate Electric Utility Bill</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/how-many-watts-can-a-15-amp-or-20-amp-circuit-handle" className="text-slate-600 hover:text-indigo-600 transition flex items-center gap-1.5">
                        <span className="text-slate-400">•</span>
                        <span>15A vs 20A Circuit Wattage</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <Link
                href="/calculators#electricity"
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 pt-2 border-t border-slate-100"
              >
                <span>Explore Circuit Tools</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* 5. Essential Sizing Guides & Reference Schematics */}
        <section
          id="reference-schematics"
          className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-1">
                <BookOpen className="w-4 h-4" />
                <span>Engineering Reference &amp; Schematics</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Essential Sizing Guides &amp; Reference Schematics
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Worked engineering sizing methodologies, calculation benchmarks, and downloadable quick-reference diagrams.
              </p>
            </div>
            <Link
              href="/calculators#sizing-guides"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 self-start sm:self-auto shrink-0"
            >
              <span>Explore All Sizing Guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Highlight Card: Solar Wiring Reference & Printable PDF */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-50/80 via-white to-indigo-50/40 border border-blue-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-1">
                <Sun className="w-6 h-6" />
              </div>
              <div className="space-y-2 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-600 text-white tracking-wide">
                    Printable Reference
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    Solar PV Wiring
                  </span>
                  <span className="text-xs text-slate-400">• Includes 2-Page Quick-Reference PDF</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  <Link
                    href="/solar-panels-series-vs-parallel"
                    className="hover:text-blue-600 transition"
                  >
                    Solar Panels Series vs Parallel: Complete Wiring Guide &amp; Printable Schematics
                  </Link>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Understand how series, parallel, and series-parallel strings determine array voltage, operating current, and charge controller compatibility. Download our verified two-page US Letter engineering reference schematic for your workbench or jobsite binder.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
              <a
                href="/downloads/solar-panel-wiring-diagrams-quick-reference.pdf"
                download="solar-panel-wiring-diagrams-quick-reference.pdf"
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition inline-flex items-center justify-center gap-2 shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF (289 KB)</span>
              </a>
              <Link
                href="/solar-panels-series-vs-parallel"
                className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600 text-xs font-bold transition inline-flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Supporting Engineering Guides Grid (3 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Guide 1: Solar Charge Controller Sizing */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md transition flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Sizing Guide
                  </span>
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Solar Charge Controllers
                  </span>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    <Link
                      href="/solar-charge-controller-calculator"
                      className="hover:text-indigo-600 transition"
                    >
                      How to Size a Solar Charge Controller (MPPT vs PWM)
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Calculate required charge controller amperage and verify cold-weather open-circuit voltage expansion margins per NEC 690.7. Compare MPPT and PWM efficiency differences across battery voltages.
                  </p>
                </div>
              </div>
              <Link
                href="/solar-charge-controller-calculator"
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 pt-2 border-t border-slate-100"
              >
                <span>Read Controller Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Guide 2: Solar Battery Charge Time */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md transition flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <BatteryCharging className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Charging Guide
                  </span>
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Solar &amp; Battery Storage
                  </span>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    <Link
                      href="/how-long-does-it-take-to-charge-a-battery-with-solar-panels"
                      className="hover:text-indigo-600 transition"
                    >
                      How Long Does It Take to Charge a Battery with Solar Panels?
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Calculate realistic battery recharge hours across 12V, 24V, and 48V banks. Model solar panel wattage, controller efficiency, effective solar irradiance, and chemistry-specific charging factors.
                  </p>
                </div>
              </div>
              <Link
                href="/how-long-does-it-take-to-charge-a-battery-with-solar-panels"
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 pt-2 border-t border-slate-100"
              >
                <span>Read Charge Time Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Guide 3: 100Ah Battery Runtime */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md transition flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Battery className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Runtime Guide
                  </span>
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    UPS &amp; Battery Backup
                  </span>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    <Link
                      href="/how-long-will-a-100ah-battery-last"
                      className="hover:text-indigo-600 transition"
                    >
                      How Long Will a 100Ah Battery Last? Appliance Runtime Guide
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Evaluate realistic runtime hours for refrigerators, CPAP machines, laptops, TVs, and inverters. Compare usable capacity across LiFePO4 and lead-acid deep-cycle batteries with inverter deratings.
                  </p>
                </div>
              </div>
              <Link
                href="/how-long-will-a-100ah-battery-last"
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 pt-2 border-t border-slate-100"
              >
                <span>Read 100Ah Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* 6. Methodology & Technical Authority Note */}
        <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-100/90 rounded-2xl p-6 sm:p-8 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-4xl">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <BookOpen className="w-5 h-5 text-blue-600 shrink-0" />
                <h2>How CalcMyPower Models Electrical &amp; Power Loads</h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Every CalcMyPower calculator displays its governing mathematical formula and transparent baseline parameters. We clearly identify where <code className="font-mono text-slate-800 bg-white px-1.5 py-0.5 rounded border border-slate-200">1.25x</code> planning margins reflect National Electrical Code (NEC Article 210/430) continuous-load rules versus practical equipment surge headroom.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Read more on our <Link href="/about" className="text-blue-600 font-semibold hover:underline">About page</Link>, submit technical feedback via our <Link href="/contact" className="text-blue-600 font-semibold hover:underline">Contact desk</Link>, or review our <Link href="/terms" className="text-blue-600 font-semibold hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-blue-600 font-semibold hover:underline">Privacy Policy</Link>. All calculations run client-side in your web browser for planning and educational use.
              </p>
            </div>
            <Link
              href="/calculators"
              className="px-5 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 hover:border-blue-500 hover:text-blue-600 text-xs sm:text-sm font-bold transition shrink-0 self-start md:self-center inline-flex items-center gap-2 shadow-xs"
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
