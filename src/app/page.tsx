import { Metadata } from "next";
import Link from "next/link";
import {
  Zap,
  BatteryCharging,
  ArrowRight,
  Cpu,
  Sliders,
  Sun,
  Plug,
  Car,
  BookOpen,
} from "lucide-react";
import { generateWebSiteSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "CalcMyPower — Power, Energy & Electrical Calculators",
  description:
    "Size backup battery banks, convert watts to amps across DC and AC circuits, and calculate portable or standby generator wattage with explicit equations and NEC-referenced assumptions.",
  alternates: {
    canonical: "https://calcmypower.com",
  },
};

interface LiveTool {
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
    title: "UPS & Battery Backup Runtime Calculator",
    href: "/ups-battery-backup-calculator",
    icon: BatteryCharging,
    formula: "T = (V × Ah × DoD × η) ÷ W",
    summary:
      "Estimate how long a 12V, 24V, or 48V battery bank or UPS will sustain continuous AC loads while accounting for inverter efficiency, usable depth of discharge, and high discharge C-rates.",
    outputs: [
      "Runtime in hours & minutes",
      "Usable battery energy (Wh) & DC current draw (A)",
      "LiFePO4 (90% DoD), AGM/Gel (50% DoD), and NMC presets",
      "1.25× continuous inverter sizing margin",
    ],
    cta: "Open UPS Runtime Calculator",
  },
  {
    title: "Watts to Amps Calculator",
    href: "/watts-to-amps-calculator",
    icon: Cpu,
    formula: "I = P ÷ (V × PF)  |  3Φ: I = P ÷ (√3 × V × PF)",
    summary:
      "Convert active power (Watts) to electrical current (Amps) across DC, single-phase AC (120V/240V), and balanced three-phase AC (208V/240V/480V) circuits with power factor adjustments.",
    outputs: [
      "Operating current (Amps) & apparent power (VA)",
      "NEC 125% continuous-load minimum breaker amps",
      "Standard NEC 240.6(A) breaker trade size match",
      "Line-to-Line vs. Line-to-Neutral 3-phase support",
    ],
    cta: "Open Watts to Amps Calculator",
  },
  {
    title: "Generator Size Calculator",
    href: "/generator-size-calculator",
    icon: Plug,
    formula: "Peak = Running W + Max(Starting Surge W)",
    summary:
      "Calculate running watts, single-motor peak starting demand, and 1.25× recommended generator capacity for home outage backup, RV air conditioners, and jobsite equipment.",
    outputs: [
      "Total running watts & highest motor surge delta",
      "Peak starting demand & 1.25× planning capacity",
      "Apparent power (kVA) at configurable power factor",
      "21 residential, RV, and jobsite appliance presets",
    ],
    cta: "Open Generator Size Calculator",
  },
];

interface PlannedTool {
  category: string;
  title: string;
  scope: string;
  icon: React.ElementType;
}

const PLANNED_TOOLS: PlannedTool[] = [
  {
    category: "Electrical Wiring",
    title: "Wire Gauge (AWG) & Voltage Drop",
    scope: "Conductor sizing for 3% branch-circuit voltage drop over one-way cable distance.",
    icon: Sliders,
  },
  {
    category: "Solar PV",
    title: "Solar Panel Array & Charge Controller Sizing",
    scope: "PV array wattage from daily kWh consumption, peak sun hours, and system derating.",
    icon: Sun,
  },
  {
    category: "Battery Storage",
    title: "Amp-Hours (Ah) ↔ Watt-Hours (Wh) Converter",
    scope: "Nominal voltage energy conversion and series/parallel battery bank configuration.",
    icon: BatteryCharging,
  },
  {
    category: "Electricity Cost",
    title: "Appliance kWh & Monthly Cost Calculator",
    scope: "Daily and monthly utility billing estimates from wattage, duty cycle, and $/kWh rate.",
    icon: Zap,
  },
  {
    category: "RV & Mobile Power",
    title: "RV 12V / 24V House Battery Energy Budget",
    scope: "Boondocking daily amp-hour draw, inverter losses, and alternator/solar recharge time.",
    icon: Sliders,
  },
  {
    category: "EV Charging",
    title: "Level 1 & Level 2 EV Circuit & Charge Time",
    scope: "240V circuit breaker sizing (80% continuous load rule) and kWh replenishment hours.",
    icon: Car,
  },
];

export default function HomePage() {
  const websiteSchema = generateWebSiteSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <div className="space-y-14 py-8 md:py-12">
        {/* 1. Compact Hero Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold tracking-wide">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>US Electrical, Battery &amp; Backup Power Reference Tools</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-3xl">
            Electrical, Battery Backup &amp; Generator Sizing Calculators
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Calculate UPS battery runtime hours, circuit amperage, and backup generator wattage using published equations, explicit efficiency factors, and NEC continuous-load margins.
          </p>
        </section>

        {/* 2. Three Live Calculators */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Live Calculators
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Select a tool below to run interactive calculations with full step-by-step formulas and worked examples.
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md self-start sm:self-auto">
              3 Active Tools
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {LIVE_CALCULATORS.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition p-5 sm:p-6 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <code className="text-[11px] font-mono font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-1 rounded">
                        {tool.formula}
                      </code>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                      {tool.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {tool.summary}
                    </p>

                    <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
                      {tool.outputs.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold leading-none mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs sm:text-sm font-bold text-blue-600 group-hover:text-blue-700">
                    <span>{tool.cta}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 3. Compact "More Calculators / In Development" Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                More Calculators in Development
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Upcoming tools on the CalcMyPower roadmap. We publish calculators individually after verifying equations and test cases.
              </p>
            </div>
            <Link
              href="/calculators"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View Calculator Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              {PLANNED_TOOLS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className={`p-4 sm:px-5 flex items-start gap-3.5 ${
                      idx >= 2 ? "md:border-t md:border-slate-200" : ""
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm font-bold text-slate-800">
                          {item.title}
                        </h3>
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {item.category} · Planned
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {item.scope}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. Brief Methodology / Trust Note */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-100/80 rounded-2xl p-5 sm:p-6 border border-slate-200/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
                <h2>How CalcMyPower Models Electrical &amp; Power Loads</h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Every calculator displays its governing formula, default parameters (such as inverter efficiency, depth of discharge, and power factor), and where <code className="font-mono text-slate-800 bg-white px-1 py-0.5 rounded border border-slate-200">1.25×</code> margins reflect NFPA 70 (NEC) branch-circuit rules versus practical equipment planning headroom. All calculations run locally in your browser for planning and educational use.
              </p>
            </div>
            <Link
              href="/calculators"
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 hover:border-blue-500 hover:text-blue-600 text-xs font-bold transition shrink-0 self-start md:self-center inline-flex items-center gap-1.5"
            >
              <span>All Calculators</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

