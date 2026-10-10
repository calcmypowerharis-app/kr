import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Battery,
  Zap,
  ArrowRight,
  ShieldAlert,
  Info,
  Clock,
  HelpCircle,
  Calculator,
  CheckCircle2,
  Layers,
  Activity,
  AlertTriangle,
  GitBranch,
  Split,
  Maximize2,
  Gauge,
  Sliders,
  Scale,
  Cpu,
} from "lucide-react";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo/schema";
import { ReadingProgressBar } from "@/components/article/ReadingProgressBar";
import { TableOfContents } from "@/components/article/TableOfContents";
import { MobileArticleNavigator } from "@/components/article/MobileArticleNavigator";
import { TocItem } from "@/components/article/tocData";
import ZoomableArticleImage from "@/components/article/ZoomableArticleImage";
import { ArticleDateByline } from "@/components/article/ArticleDateByline";

export const metadata: Metadata = {
  title: "How to Calculate Amp-Hours of a Battery Bank",
  description:
    "Calculate battery bank amp-hours (Ah), voltage, and Watt-hours across series, parallel, and 2S2P configurations with step-by-step wiring formulas.",
  alternates: {
    canonical: "https://calcmypower.com/how-to-calculate-amp-hours-of-a-battery-bank",
  },
  openGraph: {
    title:
      "How to Calculate Amp-Hours of a Battery Bank | CalcMyPower",
    description:
      "Calculate battery bank amp-hours (Ah), voltage, and Watt-hours across series, parallel, and 2S2P configurations with step-by-step wiring formulas.",
    url: "https://calcmypower.com/how-to-calculate-amp-hours-of-a-battery-bank",
    type: "article",
    publishedTime: "2026-10-10T00:00:00Z",
    modifiedTime: "2026-10-10T00:00:00Z",
    images: [
      {
        url: "https://calcmypower.com/images/articles/how-to-calculate-amp-hours-of-a-battery-bank.webp",
        width: 1200,
        height: 675,
        alt: "Technical wiring schematics of battery bank connections showing series, parallel, and series-parallel arrangements with voltmeters.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "How to Calculate Amp-Hours of a Battery Bank | CalcMyPower",
    description:
      "Calculate battery bank amp-hours (Ah), voltage, and Watt-hours across series, parallel, and 2S2P configurations with step-by-step wiring formulas.",
    images: [
      "https://calcmypower.com/images/articles/how-to-calculate-amp-hours-of-a-battery-bank.webp",
    ],
  },
};

const TOC_ITEMS: TocItem[] = [
  { id: "quick-summary", label: "Quick Summary: Series vs. Parallel at a Glance" },
  { id: "individual-vs-bank-ah", label: "Individual Battery Ah vs. Total Bank Ah" },
  { id: "core-bank-formulas", label: "Core Mathematical Formulas for Battery Banks" },
  { id: "series-wiring-behavior", label: "Series Wiring: Stepping Up Voltage at Constant Ah" },
  { id: "parallel-wiring-behavior", label: "Parallel Wiring: Multiplying Amp-Hours at Constant Voltage" },
  { id: "series-parallel-wiring", label: "Series-Parallel (2S2P) Wiring: Combining Both Methods" },
  { id: "worked-examples", label: "Step-by-Step Numerical Examples (4S, 4P, 2S2P)" },
  { id: "wh-vs-ah-comparison", label: "Equal Watt-Hours, Different Systems: Why Voltage Matters" },
  { id: "bank-calculation-vs-load-sizing", label: "Calculating an Existing Bank vs. Sizing for a Load" },
  { id: "usable-capacity-chemistry", label: "Nominal Energy vs. Usable Capacity Across Chemistries" },
  { id: "wiring-safety-limits", label: "Parallel String Limits, Balancing & Cable Discipline" },
  { id: "common-mistakes", label: "Common Battery Bank Calculation Mistakes" },
  { id: "related-tools", label: "Related Calculators & Sizing Guides" },
  { id: "faq", label: "Frequently Asked Questions" },
  { id: "sources-disclaimer", label: "Authoritative Sources & Electrical Disclaimer" },
];

const FAQ_DATA = [
  {
    question: "Does wiring batteries in series increase amp-hours?",
    answer:
      "No. Wiring batteries in series increases the total bank voltage while keeping the amp-hour rating identical to a single battery in the string. For example, four 12V 100Ah batteries wired in series produce a 48V 100Ah bank. The total stored energy increases from 1,200 Wh to 4,800 Wh because voltage increases, not because amp-hours change.",
  },
  {
    question: "How do you calculate amp-hours for batteries in parallel?",
    answer:
      "To calculate bank amp-hours in parallel, multiply the rated amp-hour capacity of one battery by the number of parallel strings, assuming all batteries have identical ratings. For example, four 12V 100Ah batteries wired in parallel produce a 12V 400Ah bank. Total bank voltage remains at 12V.",
  },
  {
    question: "How do you calculate amp-hours for a series-parallel (2S2P) battery bank?",
    answer:
      "In a series-parallel bank, first calculate the series string voltage, then multiply the battery amp-hour rating by the number of parallel strings. For four 12V 100Ah batteries arranged in two parallel strings of two batteries in series (2S2P), each series string provides 24V at 100 Ah. Paralleling the two strings yields a 24V 200Ah bank with 4,800 Wh of nominal energy.",
  },
  {
    question: "Why can you not connect an unlimited number of batteries in parallel?",
    answer:
      "Connecting too many battery strings in parallel creates severe current distribution imbalances due to minor differences in cable resistance, terminal connections, and cell internal resistance. Technical guidelines from manufacturers such as Victron Energy recommend limiting parallel strings to a maximum of three to four. If more capacity is required, use larger individual cells or dedicated busbar distribution.",
  },
  {
    question: "Can I combine batteries with different amp-hour ratings or chemistries?",
    answer:
      "No. You should never mix batteries of different amp-hour ratings, different chemistries, or different ages in the same bank. In series strings, the smallest battery dictates total capacity and risks reverse charging or deep discharge. In parallel strings, batteries with lower internal resistance take disproportionate load and circulate parasitic currents.",
  },
];

export default function BatteryBankAmpHoursGuidePage() {
  const articleSchema = generateArticleSchema({
    headline:
      "How to Calculate Amp Hours of a Battery Bank: Series, Parallel & 2S2P Wiring",
    description:
      "Learn how to calculate battery bank amp-hours (Ah), voltage, and nominal Watt-hours across series, parallel, and series-parallel wiring. Includes formulas and worked examples.",
    url: "https://calcmypower.com/how-to-calculate-amp-hours-of-a-battery-bank",
    datePublished: "2026-10-10T00:00:00Z",
    dateModified: "2026-10-10T00:00:00Z",
    images: [
      "https://calcmypower.com/images/articles/how-to-calculate-amp-hours-of-a-battery-bank.webp",
    ],
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Guides", url: "https://calcmypower.com/calculators" },
    {
      name: "How to Calculate Amp Hours of a Battery Bank",
      url: "https://calcmypower.com/how-to-calculate-amp-hours-of-a-battery-bank",
    },
  ]);

  const faqSchema = generateFaqSchema(FAQ_DATA);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <ReadingProgressBar />
      <MobileArticleNavigator items={TOC_ITEMS} />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-6"
        >
          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/calculators" className="hover:text-blue-600 transition">
            Guides
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-slate-800 font-semibold truncate">
            Calculate Battery Bank Amp-Hours
          </span>
        </nav>

        {/* Article Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Content Column (8 cols on lg) */}
          <article
            id="article-content"
            className="lg:col-span-8 space-y-10 text-slate-700 leading-relaxed text-base md:text-lg"
          >
            {/* Article Header */}
            <header className="space-y-4 border-b border-slate-200 pb-8">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 font-semibold">
                  Battery Engineering &amp; Sizing Guide
                </span>
                <span className="text-slate-400">•</span>
                <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>13 min read</span>
                </span>
                <span className="text-slate-400">•</span>
                <ArticleDateByline datePublished="2026-10-10" lastModified="2026-10-10" />
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                How to Calculate Amp Hours of a Battery Bank: Series, Parallel &amp; 2S2P Wiring
              </h1>

              <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-normal">
                Learn how to calculate total battery bank Amp-hours, system voltage, and nominal Watt-hours across series, parallel, and series-parallel connections. Review validated engineering formulas, numerical test cases, and manufacturer string limits.
              </p>
            </header>

            {/* Featured Visual Asset with Click-to-Zoom */}
            <div className="space-y-3">
              <ZoomableArticleImage
                src="/images/articles/how-to-calculate-amp-hours-of-a-battery-bank.webp"
                alt="Technical wiring schematics of battery bank connections showing series, parallel, and series-parallel arrangements with voltmeters."
                title="Battery Bank Connections: Series, Parallel & Series-Parallel"
                caption="Figure 1: Deep-cycle battery bank schematics demonstrating series voltage scaling (48V 100Ah), parallel capacity scaling (12V 400Ah), and series-parallel balance (24V 200Ah)."
              >
                <Image
                  src="/images/articles/how-to-calculate-amp-hours-of-a-battery-bank.webp"
                  alt="Technical wiring schematics of battery bank connections showing series, parallel, and series-parallel arrangements with voltmeters."
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                />
              </ZoomableArticleImage>
            </div>

            {/* SECTION 1: Quick Summary */}
            <section id="quick-summary" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Quick Summary: Series vs. Parallel at a Glance
                </h2>
              </div>

              <p>
                Calculating the Amp-hour capacity of a battery bank depends on how individual batteries are wired together. Wiring direction determines whether you multiply voltage, capacity, or both.
              </p>

              <p>
                The fundamental electrical rule is straightforward. Series wiring increases bank voltage while keeping Amp-hours unchanged, whereas parallel wiring increases Amp-hours while keeping bank voltage unchanged.
              </p>

              {/* Summary Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                    <Zap className="w-4 h-4" />
                    <span>Series Wiring</span>
                  </div>
                  <div className="text-xl font-black text-slate-900">Voltage Multiplies</div>
                  <p className="text-xs text-slate-600">
                    Amp-hours remain equal to a single battery. Connect positive (+) to negative (-).
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                    <Split className="w-4 h-4" />
                    <span>Parallel Wiring</span>
                  </div>
                  <div className="text-xl font-black text-slate-900">Ah Multiplies</div>
                  <p className="text-xs text-slate-600">
                    Bank voltage remains unchanged. Connect positive (+) to (+) and negative (-) to (-).
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                  <div className="flex items-center gap-2 text-purple-600 font-bold text-sm">
                    <Layers className="w-4 h-4" />
                    <span>Series-Parallel (2S2P)</span>
                  </div>
                  <div className="text-xl font-black text-slate-900">Both Multiply</div>
                  <p className="text-xs text-slate-600">
                    String voltage increases, and parallel strings multiply total capacity.
                  </p>
                </div>
              </div>

              <p>
                Regardless of the wiring arrangement chosen, the total stored energy in Watt-hours remains identical for any fixed number of identical batteries.
              </p>
            </section>

            {/* SECTION 2: Individual vs Bank Ah */}
            <section id="individual-vs-bank-ah" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Individual Battery Ah vs. Total Bank Ah
                </h2>
              </div>

              <p>
                An individual battery nameplate states its stand-alone voltage and Amp-hour rating. For example, a standard 12V 100Ah deep-cycle unit delivers 100 Amps for one hour under reference conditions.
              </p>

              <p>
                A battery bank refers to two or more interconnected batteries functioning as a single direct-current power source. The bank rating defines what your inverter, solar charge controller, or DC distribution panel experiences.
              </p>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-950">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Important Distinction: Rating vs. Stored Energy</span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Comparing battery banks by Amp-hours alone without stating voltage is misleading. A 24V 200Ah bank stores twice the energy of a 12V 200Ah bank, even though both have identical 200 Ah ratings.
                </p>
              </div>

              <p>
                To understand true battery capacity, read our primer on{" "}
                <Link
                  href="/what-does-ah-mean-on-a-battery"
                  className="text-blue-600 underline font-semibold hover:text-blue-800"
                >
                  what Ah means on a battery
                </Link>
                . For energy comparisons, convert Amp-hours to Watt-hours by factoring circuit voltage.
              </p>
            </section>

            {/* SECTION 3: Core Bank Formulas */}
            <section id="core-bank-formulas" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Core Mathematical Formulas for Battery Banks
                </h2>
              </div>

              <p>
                When connecting identical batteries of the same chemistry, age, and specification, bank electrical properties follow deterministic circuit formulas.
              </p>

              {/* Dark Formula Block */}
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 text-slate-100 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                    Bank Calculation Equations
                  </span>
                  <span className="text-xs font-mono text-slate-400">NEC &amp; IEEE Compliant Basis</span>
                </div>

                <div className="space-y-3 font-mono text-sm sm:text-base">
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                    <span className="text-slate-400">Bank Voltage: </span>
                    <span className="text-sky-300 font-bold">V_bank = V_b × N_s</span>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                    <span className="text-slate-400">Bank Capacity: </span>
                    <span className="text-emerald-300 font-bold">Ah_bank = Ah_b × N_p</span>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                    <span className="text-slate-400">Total Battery Count: </span>
                    <span className="text-amber-300 font-bold">N = N_s × N_p</span>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                    <span className="text-slate-400">Nominal Bank Energy: </span>
                    <span className="text-purple-300 font-bold">Wh_bank = V_bank × Ah_bank</span>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                    <span className="text-slate-400">Nominal Energy (kWh): </span>
                    <span className="text-indigo-300 font-bold">kWh = Wh_bank ÷ 1000</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <div>• V_b: Nominal voltage of one battery (V)</div>
                  <div>• Ah_b: Rated capacity of one battery (Ah)</div>
                  <div>• N_s: Number of batteries in series per string</div>
                  <div>• N_p: Number of parallel strings in the bank</div>
                </div>
              </div>

              <p>
                To evaluate an existing bank configuration automatically, enter your battery count and wiring pattern into our{" "}
                <Link
                  href="/battery-capacity-calculator"
                  className="text-blue-600 underline font-semibold hover:text-blue-800"
                >
                  Battery Capacity Calculator
                </Link>
                .
              </p>
            </section>

            {/* SECTION 4: Series Wiring Behavior */}
            <section id="series-wiring-behavior" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Series Wiring: Stepping Up Voltage at Constant Ah
                </h2>
              </div>

              <p>
                In a series circuit, batteries connect end to end. The positive terminal of the first battery connects to the negative terminal of the second, continuing until all batteries form one string.
              </p>

              <p>
                Because current must travel sequentially through every cell, the electrical current across the circuit is identical at all points. Each battery contributes its electrical potential, adding voltages together.
              </p>

              {/* Callout Card */}
              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-blue-900 text-sm space-y-2">
                <div className="font-bold text-blue-950 flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-600" />
                  <span>Why Amp-Hours Do Not Add in Series</span>
                </div>
                <p className="text-xs text-blue-800 leading-relaxed">
                  If two 100Ah batteries are wired in series and you draw 100 Amps for one hour, 100 Amp-hours pass through both batteries simultaneously. Both deplete at the same moment, leaving the total delivered capacity at 100 Ah.
                </p>
              </div>

              <p>
                This behavior matches photovoltaic modules in an array. For a comprehensive comparison of series strings in solar circuits, review our guide on{" "}
                <Link
                  href="/solar-panels-series-vs-parallel"
                  className="text-blue-600 underline font-semibold hover:text-blue-800"
                >
                  solar panels in series vs parallel
                </Link>
                .
              </p>
            </section>

            {/* SECTION 5: Parallel Wiring Behavior */}
            <section id="parallel-wiring-behavior" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Parallel Wiring: Multiplying Amp-Hours at Constant Voltage
                </h2>
              </div>

              <p>
                In a parallel connection, all positive terminals connect together to a positive busbar or terminal, and all negative terminals connect together to a negative busbar.
              </p>

              <p>
                Because all batteries share the same electrical potential points, system voltage remains identical to a single unit. However, current divides across all parallel paths during discharge.
              </p>

              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-emerald-900 text-sm space-y-2">
                <div className="font-bold text-emerald-950 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Why Parallel Increases Runtime</span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  When supplying a 100 Amp load from four parallel 100Ah batteries, each battery provides only 25 Amps. This reduced discharge rate extends total run duration by fourfold to 400 Amp-hours.
                </p>
              </div>

              <p>
                To see how individual appliance loads draw current from a 12V 100Ah battery, consult our detailed benchmark in the{" "}
                <Link
                  href="/how-long-will-a-100ah-battery-last"
                  className="text-blue-600 underline font-semibold hover:text-blue-800"
                >
                  12V 100Ah battery runtime guide
                </Link>
                .
              </p>
            </section>

            {/* SECTION 6: Series-Parallel Wiring */}
            <section id="series-parallel-wiring" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Series-Parallel (2S2P) Wiring: Combining Both Methods
                </h2>
              </div>

              <p>
                Many residential solar systems, off-grid cabins, and marine vessels require higher voltages like 24V or 48V while also needing substantial Amp-hour storage reserves.
              </p>

              <p>
                A series-parallel bank achieves this by connecting identical series strings in parallel. The number of batteries in series sets bank voltage, and the number of parallel strings sets total Amp-hours.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                <div className="text-sm font-bold text-slate-900">Understanding the 2S2P Notation</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-blue-600">2S (Series String): </span>
                    Two 12V batteries wired positive to negative create a 24V 100Ah string.
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-emerald-600">2P (Parallel Strings): </span>
                    Two identical 24V strings wired in parallel double capacity to 24V 200Ah.
                  </div>
                </div>
              </div>

              <p>
                This arrangement delivers balanced electrical performance, allowing you to run higher-efficiency 24V inverters without requiring expensive custom large-format battery cells.
              </p>
            </section>

            {/* SECTION 7: Worked Examples */}
            <section id="worked-examples" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Step-by-Step Numerical Examples (4S, 4P, 2S2P)
                </h2>
              </div>

              <p>
                To see these equations in practice, consider four identical 12V 100Ah deep-cycle batteries. Here is how three different wiring configurations alter electrical parameters.
              </p>

              {/* Comparison Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <thead>
                    <tr className="border-b border-slate-300 bg-slate-100 text-slate-800">
                      <th className="py-3 px-4 font-bold">Arrangement</th>
                      <th className="py-3 px-4 font-bold">Wiring Config</th>
                      <th className="py-3 px-4 font-bold">Bank Voltage</th>
                      <th className="py-3 px-4 font-bold">Bank Capacity</th>
                      <th className="py-3 px-4 font-bold">Stored Energy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 font-bold text-slate-900">Case A (2S2P)</td>
                      <td className="py-3 px-4">2 in Series, 2 Strings Parallel</td>
                      <td className="py-3 px-4 font-mono font-semibold text-blue-600">24 V</td>
                      <td className="py-3 px-4 font-mono font-semibold text-emerald-600">200 Ah</td>
                      <td className="py-3 px-4 font-mono">4,800 Wh (4.8 kWh)</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 font-bold text-slate-900">Case B (4S1P)</td>
                      <td className="py-3 px-4">4 in Series, 1 String</td>
                      <td className="py-3 px-4 font-mono font-semibold text-blue-600">48 V</td>
                      <td className="py-3 px-4 font-mono font-semibold text-emerald-600">100 Ah</td>
                      <td className="py-3 px-4 font-mono">4,800 Wh (4.8 kWh)</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 font-bold text-slate-900">Case C (1S4P)</td>
                      <td className="py-3 px-4">1 in Series, 4 Strings Parallel</td>
                      <td className="py-3 px-4 font-mono font-semibold text-blue-600">12 V</td>
                      <td className="py-3 px-4 font-mono font-semibold text-emerald-600">400 Ah</td>
                      <td className="py-3 px-4 font-mono">4,800 Wh (4.8 kWh)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Detailed Breakdown Cards */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 text-xs text-slate-700">
                  <div className="font-bold text-sm text-slate-900">Case A Step-by-Step (2S2P):</div>
                  <div>• Series Voltage: V_bank = 12V × 2 = 24V.</div>
                  <div>• Parallel Capacity: Ah_bank = 100Ah × 2 = 200Ah.</div>
                  <div>• Total Energy: 24V × 200Ah = 4,800 Wh (4.8 kWh).</div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 text-xs text-slate-700">
                  <div className="font-bold text-sm text-slate-900">Case B Step-by-Step (4S1P):</div>
                  <div>• Series Voltage: V_bank = 12V × 4 = 48V.</div>
                  <div>• Parallel Capacity: Ah_bank = 100Ah × 1 = 100Ah.</div>
                  <div>• Total Energy: 48V × 100Ah = 4,800 Wh (4.8 kWh).</div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 text-xs text-slate-700">
                  <div className="font-bold text-sm text-slate-900">Case C Step-by-Step (1S4P):</div>
                  <div>• Series Voltage: V_bank = 12V × 1 = 12V.</div>
                  <div>• Parallel Capacity: Ah_bank = 100Ah × 4 = 400Ah.</div>
                  <div>• Total Energy: 12V × 400Ah = 4,800 Wh (4.8 kWh).</div>
                </div>
              </div>

              <p>
                Notice how the total stored energy of 4,800 Wh is preserved across all three cases. Only the ratio of voltage to amperage shifts.
              </p>
            </section>

            {/* SECTION 8: Wh vs Ah Comparison */}
            <section id="wh-vs-ah-comparison" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Equal Watt-Hours, Different Systems: Why Voltage Matters
                </h2>
              </div>

              <p>
                While a 12V 400Ah bank and a 48V 100Ah bank store the exact same 4,800 Watt-hours of nominal energy, operating them in the real world is radically different.
              </p>

              <p>
                Electrical power equals voltage multiplied by current (Watts = Volts × Amps). When delivering a continuous 2,400 Watt load to an inverter, current demands vary dramatically with bank voltage.
              </p>

              {/* Hardware Spec Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <span className="font-bold text-slate-900 text-sm">12V Bank (2,400W Load)</span>
                  <div className="text-rose-600 font-mono font-bold text-lg">200 Amps DC</div>
                  <p className="text-slate-600">
                    Requires massive 4/0 AWG copper battery cables, heavy fuses, and experiences higher resistive heat losses.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <span className="font-bold text-slate-900 text-sm">48V Bank (2,400W Load)</span>
                  <div className="text-emerald-600 font-mono font-bold text-lg">50 Amps DC</div>
                  <p className="text-slate-600">
                    Requires standard 6 AWG copper conductors, smaller disconnects, and operates with significantly higher electrical efficiency.
                  </p>
                </div>
              </div>

              <p>
                For a detailed breakdown of how power relates to time and energy, read our explanation of{" "}
                <Link
                  href="/what-is-a-watt-hour"
                  className="text-blue-600 underline font-semibold hover:text-blue-800"
                >
                  what a watt-hour is
                </Link>
                .
              </p>
            </section>

            {/* SECTION 9: Bank Calculation vs Load Sizing */}
            <section id="bank-calculation-vs-load-sizing" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Calculating an Existing Bank vs. Sizing for a Load
                </h2>
              </div>

              <p>
                Homeowners and solar designers frequently confuse two separate engineering tasks: evaluating what an existing bank can produce versus sizing how many Amp-hours an electrical load requires.
              </p>

              <p>
                Evaluating an existing bank is a forward calculation. You take known battery nameplate ratings, count series and parallel strings, and compute bank voltage and Amp-hours.
              </p>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs md:text-sm">
                <div className="font-bold text-slate-900">Comparing Sizing Directions:</div>
                <div className="space-y-2 text-slate-700">
                  <div>
                    <span className="font-bold text-blue-600">Forward Bank Evaluation: </span>
                    Batteries on hand → String wiring → Bank Voltage &amp; Amp-Hours.
                  </div>
                  <div>
                    <span className="font-bold text-purple-600">Reverse Load Sizing: </span>
                    Daily Watt-Hours ÷ Battery Voltage ÷ Usable DoD ÷ Inverter Efficiency = Required Ah.
                  </div>
                </div>
              </div>

              <p>
                If you are planning a system from scratch based on daily appliance consumption, use our step-by-step tutorial on{" "}
                <Link
                  href="/how-many-amp-hours-do-i-need"
                  className="text-blue-600 underline font-semibold hover:text-blue-800"
                >
                  how many amp-hours you need for a battery bank
                </Link>
                .
              </p>
            </section>

            {/* SECTION 10: Usable Capacity Across Chemistries */}
            <section id="usable-capacity-chemistry" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Nominal Energy vs. Usable Capacity Across Chemistries
                </h2>
              </div>

              <p>
                Nominal energy calculated from nameplate ratings does not equal the energy you can extract during everyday cycling. Chemistry dictates realistic Depth of Discharge (DoD).
              </p>

              <p>
                Discharging a battery beyond manufacturer limits accelerates cell degradation and drastically reduces cycle life. Lead-acid chemistries suffer severe degradation when discharged past 50%.
              </p>

              {/* Chemistry Comparison Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                  <div className="font-bold text-slate-900 flex items-center justify-between">
                    <span>Lithium Iron Phosphate (LiFePO4)</span>
                    <span className="text-emerald-600 font-mono font-bold">80% - 90% DoD</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    A 100Ah LiFePO4 battery safely delivers 80 to 90 Amp-hours (960 to 1,080 Wh at 12V) without sacrificing cycle longevity.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                  <div className="font-bold text-slate-900 flex items-center justify-between">
                    <span>Lead-Acid (AGM / Flooded / Gel)</span>
                    <span className="text-amber-600 font-mono font-bold">50% Max DoD</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    A 100Ah lead-acid battery provides only 50 Amp-hours (600 Wh at 12V) of usable energy to avoid permanent plate sulfation.
                  </p>
                </div>
              </div>

              <p>
                To calculate battery storage combined with solar panel recharging, use our dedicated{" "}
                <Link
                  href="/solar-battery-calculator"
                  className="text-blue-600 underline font-semibold hover:text-blue-800"
                >
                  Solar Battery Calculator
                </Link>
                .
              </p>
            </section>

            {/* SECTION 11: Wiring Safety Limits */}
            <section id="wiring-safety-limits" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Parallel String Limits, Balancing &amp; Cable Discipline
                </h2>
              </div>

              <p>
                Connecting multiple batteries in parallel is not simply a matter of linking terminals. Technical standards require strict balancing to prevent catastrophic circulating currents.
              </p>

              <p>
                In its technical publication <em>Wiring Unlimited</em>, Victron Energy recommends limiting parallel battery strings to a maximum of three to four strings. Beyond four strings, minor resistance deltas cause severe charging imbalance.
              </p>

              {/* Technical Guidelines Card */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 space-y-3 text-xs md:text-sm">
                <div className="text-blue-400 font-bold uppercase tracking-wider text-xs">
                  Manufacturer Installation Requirements
                </div>
                <div className="space-y-2 text-slate-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Diagonal Cross-Connection:</strong> Connect the main system positive cable to the first battery and the main negative cable to the last battery in the parallel group.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Identical Interconnect Cables:</strong> Discover Battery guidelines require all jumper cables to share exact length, gauge, and terminal lug torque.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>BMS Internal Restrictions:</strong> Many 12V lithium batteries feature integrated battery management systems with strict limits (such as max 4 in series and 4 in parallel).</span>
                  </div>
                </div>
              </div>

              <p>
                Always consult your battery manufacturer documentation before assembling physical series or parallel strings to ensure compliance with internal BMS ratings.
              </p>
            </section>

            {/* SECTION 12: Common Mistakes */}
            <section id="common-mistakes" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Common Battery Bank Calculation Mistakes
                </h2>
              </div>

              <p>
                Incorrect assumptions when calculating battery bank capacity can lead to undersized conductors, blown fuses, or failed battery management systems.
              </p>

              {/* Mistakes List */}
              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/60 text-xs md:text-sm text-rose-950 space-y-1">
                  <span className="font-bold text-rose-900">1. Adding Amp-Hours in Series:</span>
                  <p className="text-rose-800">
                    Assuming that connecting four 100Ah batteries in series creates a 400Ah bank. In reality, bank capacity remains 100 Ah while voltage increases to 48V.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/60 text-xs md:text-sm text-rose-950 space-y-1">
                  <span className="font-bold text-rose-900">2. Mixing Batteries of Different Ages or Chemistries:</span>
                  <p className="text-rose-800">
                    Combining old lead-acid batteries with new ones or mixing AGM with lithium causes rapid degradation because internal resistance differences cause parasitic charging loops.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/60 text-xs md:text-sm text-rose-950 space-y-1">
                  <span className="font-bold text-rose-900">3. Ignoring Inverter Inefficiencies:</span>
                  <p className="text-rose-800">
                    Failing to factor the 10% to 15% conversion loss when an inverter turns DC battery power into 120V household AC electricity.
                  </p>
                </div>
              </div>

              <p>
                Always verify your calculations with our online tools to prevent expensive configuration errors before purchasing battery hardware.
              </p>
            </section>

            {/* SECTION 13: Related Tools */}
            <section id="related-tools" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Related Calculators &amp; Sizing Guides
                </h2>
              </div>

              <p>
                CalcMyPower offers interactive calculators and engineering guides to assist with off-grid, solar, and emergency backup planning:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="/battery-capacity-calculator"
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-2 block"
                >
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <Battery className="w-5 h-5 text-blue-600" />
                    <span>Battery Capacity Calculator</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Calculate battery bank voltage, Amp-hours, and nominal kWh across series and parallel banks.
                  </p>
                </Link>

                <Link
                  href="/solar-battery-calculator"
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-2 block"
                >
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <Zap className="w-5 h-5 text-emerald-600" />
                    <span>Solar Battery Calculator</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Size battery storage banks from daily solar generation, autonomy days, and load demands.
                  </p>
                </Link>

                <Link
                  href="/how-many-amp-hours-do-i-need"
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-2 block"
                >
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <Layers className="w-5 h-5 text-purple-600" />
                    <span>How Many Amp Hours Do I Need?</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Complete walkthrough for sizing total bank capacity from appliance Watt-hours and inverter draw.
                  </p>
                </Link>

                <Link
                  href="/how-long-will-a-100ah-battery-last"
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-2 block"
                >
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <Clock className="w-5 h-5 text-amber-600" />
                    <span>100Ah Battery Runtime Guide</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Practical run times for refrigerators, televisions, inverters, and household backup loads.
                  </p>
                </Link>
              </div>
            </section>

            {/* SECTION 14: FAQ */}
            <section id="faq" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-3">
                {FAQ_DATA.map((faq, index) => (
                  <details
                    key={index}
                    className="group bg-white rounded-2xl border border-slate-200 p-5 open:shadow-xs transition"
                  >
                    <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between text-sm sm:text-base">
                      <span>{faq.question}</span>
                      <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg shrink-0 ml-2">
                        ▾
                      </span>
                    </summary>
                    <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            {/* SECTION 15: Sources and Disclaimer */}
            <section id="sources-disclaimer" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Authoritative Sources &amp; Electrical Disclaimer
                </h2>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <p>
                  Engineering principles and calculation methodologies in this guide reference authoritative manufacturer standards and industry codes:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Discover Battery:</strong> <em>Technical Guide: Battery Banks Connections and Configurations</em>, detailing series and parallel string wiring, interconnect cable sizing, and torque standards.
                  </li>
                  <li>
                    <strong>Victron Energy:</strong> <em>Wiring Unlimited</em>, providing engineering guidance on parallel string imbalance, diagonal cross-connections, and busbar design.
                  </li>
                  <li>
                    <strong>National Electrical Code (NEC / NFPA 70):</strong> Article 480 (Storage Batteries) and Article 706 (Energy Storage Systems), governing disconnects, overcurrent protection, and conductor ampacity.
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 text-xs leading-relaxed space-y-1.5">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-slate-500" />
                  <span>Electrical Safety and Installation Disclaimer</span>
                </div>
                <p>
                  This guide and calculator are educational planning tools. Battery banks store hazardous electrical energy capable of producing severe arc flashes, chemical burns, and fire hazards.
                </p>
                <p>
                  Always follow manufacturer specifications. Consult a licensed electrician or engineer for physical system installation.
                </p>
              </div>
            </section>
          </article>

          {/* Desktop Sticky Sidebar (4 cols on lg) */}
          <aside className="hidden lg:block lg:col-span-4">
            <TableOfContents items={TOC_ITEMS} cluster="ups-battery" />
          </aside>
        </div>
      </div>
    </>
  );
}
