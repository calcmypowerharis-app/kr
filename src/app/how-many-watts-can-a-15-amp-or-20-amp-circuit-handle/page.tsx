import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Zap,
  ArrowRight,
  ShieldAlert,
  Info,
  Clock,
  HelpCircle,
  Calculator,
  Flame,
  CheckCircle2,
  Cpu,
  Layers,
  Activity,
  AlertTriangle,
  Sliders,
  Scale,
  Wrench,
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
  title: "How Many Watts on a 15-Amp or 20-Amp Circuit?",
  description:
    "Calculate 15-amp and 20-amp circuit wattage at 120V. Understand the NEC 80% continuous load rule, wire gauge requirements, and space heater load planning.",
  alternates: {
    canonical:
      "https://calcmypower.com/how-many-watts-can-a-15-amp-or-20-amp-circuit-handle",
  },
  openGraph: {
    title:
      "How Many Watts on a 15-Amp or 20-Amp Circuit? | CalcMyPower",
    description:
      "Calculate 15-amp and 20-amp circuit wattage at 120V. Understand the NEC 80% continuous load rule, wire gauge requirements, and space heater load planning.",
    url: "https://calcmypower.com/how-many-watts-can-a-15-amp-or-20-amp-circuit-handle",
    type: "article",
    publishedTime: "2026-10-17T00:00:00Z",
    modifiedTime: "2026-10-18T00:00:00Z",
    images: [
      {
        url: "https://calcmypower.com/images/articles/how-many-watts-can-a-15-amp-or-20-amp-circuit-handle.webp",
        width: 1200,
        height: 675,
        alt: "Technical diagram comparing 15-amp and 20-amp 120V circuit wattage capacities, 80 percent continuous load limits, wire gauges, and receptacle types.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "How Many Watts on a 15-Amp or 20-Amp Circuit? | CalcMyPower",
    description:
      "Calculate 15-amp and 20-amp circuit wattage at 120V. Understand the NEC 80% continuous load rule, wire gauge requirements, and space heater load planning.",
    images: [
      "https://calcmypower.com/images/articles/how-many-watts-can-a-15-amp-or-20-amp-circuit-handle.webp",
    ],
  },
};

const TOC_ITEMS: TocItem[] = [
  { id: "quick-answer", label: "Quick Answer: 15-Amp vs. 20-Amp Circuit Limits" },
  { id: "power-formula", label: "How to Calculate Circuit Wattage (P = V x I)" },
  { id: "continuous-vs-peak", label: "The NEC 80% Continuous Load Rule" },
  { id: "comparison-table", label: "15-Amp vs. 20-Amp Quick-Reference Chart" },
  { id: "space-heater-example", label: "The 1,500W Space Heater: Why Breakers Trip" },
  { id: "real-world-loads", label: "Everyday Household Appliances and Circuit Headroom" },
  { id: "inrush-surge-current", label: "Inrush Current, Motor Surge, and Trip Curves" },
  { id: "wire-gauge-receptacles", label: "Wire Gauge and Outlets: 14 AWG vs. 12 AWG" },
  { id: "breaker-upgrade-safety", label: "Safety Warning: Why You Cannot Just Swap Breakers" },
  { id: "how-to-check-capacity", label: "Step-by-Step Circuit Capacity Audit" },
  { id: "related-calculators", label: "Related Electrical & Power Calculators" },
  { id: "faq", label: "Frequently Asked Questions" },
  { id: "sources-and-disclaimers", label: "Authoritative Engineering Sources" },
];

const FAQ_DATA = [
  {
    question: "How many watts can a 15-amp 120-volt circuit handle?",
    answer:
      "At standard North American 120V residential voltage, a 15-amp circuit has a maximum theoretical capacity of 1,800 watts (120V x 15A). For continuous loads running 3 hours or longer, the National Electrical Code limits loading to 80%, which equals 1,440 watts.",
  },
  {
    question: "How many watts can a 20-amp 120-volt circuit handle?",
    answer:
      "A 20-amp circuit at 120 volts supports an absolute maximum non-continuous rating of 2,400 watts (120V x 20A). Under the NEC 80% continuous-use rule, the safe long-duration design ceiling is 1,920 watts.",
  },
  {
    question: "Can I run a 1,500-watt space heater on a 15-amp circuit?",
    answer:
      "A 1,500-watt space heater draws 12.5 amps at 120 volts, which is 60 watts above the 1,440-watt continuous limit of a 15-amp circuit. While it may run alone for short periods, running it continuously or turning on any additional load on that circuit often causes the breaker to trip.",
  },
  {
    question: "Can I replace a 15-amp circuit breaker with a 20-amp breaker?",
    answer:
      "No. You must never replace a 15-amp breaker with a 20-amp breaker unless an electrician confirms every inch of branch wiring is 12 AWG copper or larger. If the circuit uses 14 AWG wire, a 20-amp breaker allows excess current to overheat the conductors, creating a severe fire hazard.",
  },
  {
    question: "How can I tell if an outlet is on a 15-amp or 20-amp circuit?",
    answer:
      "Inspect the breaker handle in your main electrical panel and confirm conductor gauge. While a 20-amp outlet (NEMA 5-20R) has a horizontal T-slot, 15-amp outlets (NEMA 5-15R) are routinely installed on 20-amp circuits under NEC Table 210.21(B)(3). Receptacle appearance alone does not confirm circuit capacity.",
  },
  {
    question: "What happens if you exceed the 80% continuous load limit?",
    answer:
      "Exceeding 80% continuous loading warms the circuit conductors and heats the bimetallic thermal element inside the circuit breaker. Over time, heat accumulation causes nuisance trips or degrades terminal connections and outlet wire insulation behind your walls.",
  },
];

export default function CircuitWattageGuidePage() {
  const articleSchema = generateArticleSchema({
    headline: "How Many Watts on a 15-Amp or 20-Amp Circuit? Continuous Limits & Sizing",
    description:
      "Calculate 15-amp and 20-amp circuit wattage at 120V. Understand the NEC 80% continuous load rule, wire gauge requirements, and space heater load planning.",
    url: "https://calcmypower.com/how-many-watts-can-a-15-amp-or-20-amp-circuit-handle",
    datePublished: "2026-10-17T00:00:00Z",
    dateModified: "2026-10-18T00:00:00Z",
    images: [
      "https://calcmypower.com/images/articles/how-many-watts-can-a-15-amp-or-20-amp-circuit-handle.webp",
    ],
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Guides", url: "https://calcmypower.com/calculators" },
    {
      name: "15A vs 20A Circuit Wattage",
      url: "https://calcmypower.com/how-many-watts-can-a-15-amp-or-20-amp-circuit-handle",
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
            15A vs 20A Circuit Wattage
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
                  Electrical Circuit Sizing Guide
                </span>
                <span className="text-slate-400">•</span>
                <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>13 min read</span>
                </span>
                <span className="text-slate-400">•</span>
                <ArticleDateByline
                  datePublished="2026-10-17"
                  lastModified="2026-10-18"
                />
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                How Many Watts on a 15-Amp or 20-Amp Circuit?
              </h1>

              <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-normal">
                Determine the real-world wattage capacity of standard 120-volt household circuits. Compare theoretical maximum limits against the National Electrical Code 80% continuous safety threshold to prevent tripped breakers and conductor overheating.
              </p>
            </header>

            {/* Featured Visual Asset with Click-to-Zoom */}
            <div className="space-y-3">
              <ZoomableArticleImage
                src="/images/articles/how-many-watts-can-a-15-amp-or-20-amp-circuit-handle.webp"
                alt="Technical diagram comparing 15-amp and 20-amp 120V circuit wattage capacities, 80 percent continuous load limits, wire gauges, and receptacle types."
                title="15-Amp vs. 20-Amp Circuit Wattage Capacity"
                caption="Figure 1: Comparison of nominal vs continuous wattage limits, wire gauges, and receptacle configurations for standard 120V residential branch circuits."
              >
                <Image
                  src="/images/articles/how-many-watts-can-a-15-amp-or-20-amp-circuit-handle.webp"
                  alt="Technical diagram comparing 15-amp and 20-amp 120V circuit wattage capacities, 80 percent continuous load limits, wire gauges, and receptacle types."
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                />
              </ZoomableArticleImage>
            </div>

            {/* SECTION 1: Quick Answer */}
            <section id="quick-answer" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Quick Answer: 15-Amp vs. 20-Amp Circuit Limits
                </h2>
              </div>

              <p>
                In North American homes, standard residential outlets operate at 120 volts nominal alternating current. Circuit capacity depends directly on the breaker amperage rating and the expected operating duration of connected appliances.
              </p>

              <p>
                Every standard branch circuit has two distinct wattage thresholds: an absolute peak limit and a continuous planning limit. Operating near absolute limits leads to tripped breakers and heated conductors.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                      15-Amp Branch Circuit
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-600 text-white">
                      14 AWG Copper
                    </span>
                  </div>
                  <div className="text-3xl font-black text-slate-900">1,800W Max</div>
                  <div className="text-sm font-semibold text-blue-900">
                    1,440W Continuous Limit (80%)
                  </div>
                  <p className="text-xs text-slate-600">
                    Standard in bedrooms, living rooms, and general household lighting circuits.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                      20-Amp Branch Circuit
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-600 text-white">
                      12 AWG Copper
                    </span>
                  </div>
                  <div className="text-3xl font-black text-slate-900">2,400W Max</div>
                  <div className="text-sm font-semibold text-emerald-900">
                    1,920W Continuous Limit (80%)
                  </div>
                  <p className="text-xs text-slate-600">
                    Standard in kitchens, bathrooms, laundry rooms, and workshops.
                  </p>
                </div>
              </div>

              <p>
                Plugging a 1,500-watt appliance into a 15-amp circuit consumes 83% of total line capacity. That leaves only 300 watts of headroom before the circuit breaker trips.
              </p>
            </section>

            {/* SECTION 2: Power Formula */}
            <section id="power-formula" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  How to Calculate Circuit Wattage (P = V x I)
                </h2>
              </div>

              <p>
                Electric power calculations rely on the fundamental relationship between potential, current flow, and work done. In pure resistive AC circuits, real electrical power in watts equals voltage multiplied by current in amperes.
              </p>

              <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
                  <Cpu className="w-4 h-4" />
                  <span>The Fundamental Power Law</span>
                </div>
                <div className="text-2xl sm:text-3xl font-mono font-bold tracking-wide text-amber-300">
                  Watts = Volts x Amperes x Power Factor
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  For purely resistive loads like space heaters, toasters, and incandescent lights, the power factor equals 1.0. Inductive motor loads carry power factors between 0.80 and 0.95.
                </p>
              </div>

              <p>
                Applying this formula to a 15-amp breaker at standard 120 volts yields 1,800 watts (120V x 15A). Multiplying 120 volts by 20 amps produces 2,400 watts.
              </p>

              <p>
                Actual utility service voltage commonly fluctuates between 114 volts and 126 volts depending on line drop and regional grid loading. Calculating with 120 volts provides a reliable engineering baseline for residential planning.
              </p>

              <p>
                Circuit breakers respond to total current in amperes (apparent power), not just real watts. For appliances with a power factor below 1.0, current draw is higher than a simple watts divided by 120 volts calculation.
              </p>

              <div className="p-4 rounded-xl bg-blue-50 border-l-4 border-blue-600 text-sm text-blue-900">
                <strong>Calculation Tip:</strong> If your appliance only lists amperage on its label, multiply that number by 120 to find its approximate running wattage.
              </div>
            </section>

            {/* SECTION 3: The NEC 80% Rule */}
            <section id="continuous-vs-peak" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  The NEC 80% Continuous Load Rule
                </h2>
              </div>

              <p>
                A circuit breaker rating indicates its maximum instantaneous trip point, not its recommended long-term workload. Running circuits near full capacity for extended durations generates cumulative heat.
              </p>

              <p>
                The National Electrical Code (NEC Article 100) formally defines a continuous load as any load where maximum current continues for 3 hours or longer. Space heaters, vehicle chargers, and grow lights meet this definition.
              </p>

              <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                  <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>NEC 210.19(A)(1) &amp; NEC 210.20(A) Requirement</span>
                </div>
                <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                  Branch circuit conductors and overcurrent protective devices must be sized for 100% of non-continuous loads plus 125% of continuous loads. Inverting this mathematical rule requires that continuous loads not exceed 80% of circuit ampacity.
                </p>
              </div>

              <p>
                On a 15-amp circuit, taking 80% of 15 amps yields a continuous limit of 12 amps. Multiplying 12 amps by 120 volts establishes a maximum continuous limit of 1,440 watts.
              </p>

              <p>
                On a 20-amp circuit, 80% equals 16 amps of continuous current. Multiplying 16 amps by 120 volts provides a continuous safe planning ceiling of 1,920 watts.
              </p>

              <p>
                Under NEC 210.23(A)(1) and Table 210.21(B)(2), any single portable cord-and-plug appliance on a multi-outlet branch circuit is also restricted to 80% of circuit rating (12 amps or 1,440 watts on 15-amp circuits).
              </p>

              <p>
                Non-continuous loads, such as a microwave running for two minutes or a toaster running for three minutes, can safely draw up to 100% of breaker capacity without violating code.
              </p>
            </section>

            {/* SECTION 4: Comparison Chart */}
            <section id="comparison-table" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  15-Amp vs. 20-Amp Quick-Reference Chart
                </h2>
              </div>

              <p>
                Comparing electrical parameters side by side clarifies why modern building codes require 20-amp branch circuits in demanding household zones.
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-900 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Circuit Parameter</th>
                      <th className="py-3 px-4">15-Amp Circuit</th>
                      <th className="py-3 px-4">20-Amp Circuit</th>
                      <th className="py-3 px-4">Engineering Reference</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Breaker Amperage</td>
                      <td className="py-3 px-4">15 Amps</td>
                      <td className="py-3 px-4">20 Amps</td>
                      <td className="py-3 px-4 text-slate-500">Panel breaker handle rating</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Nominal Voltage</td>
                      <td className="py-3 px-4">120 Volts AC</td>
                      <td className="py-3 px-4">120 Volts AC</td>
                      <td className="py-3 px-4 text-slate-500">Standard single-phase line</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Absolute Peak Wattage</td>
                      <td className="py-3 px-4 font-bold text-slate-900">1,800 Watts</td>
                      <td className="py-3 px-4 font-bold text-slate-900">2,400 Watts</td>
                      <td className="py-3 px-4 text-slate-500">100% rated non-continuous</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Continuous Wattage (80%)</td>
                      <td className="py-3 px-4 font-bold text-blue-700">1,440 Watts</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">1,920 Watts</td>
                      <td className="py-3 px-4 text-slate-500">NEC continuous load (3+ hrs)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Minimum Wire Gauge</td>
                      <td className="py-3 px-4">14 AWG Copper</td>
                      <td className="py-3 px-4">12 AWG Copper</td>
                      <td className="py-3 px-4 text-slate-500">NEC 240.4(D) small conductors</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Receptacle Types</td>
                      <td className="py-3 px-4">NEMA 5-15R</td>
                      <td className="py-3 px-4">NEMA 5-15R, NEMA 5-20R</td>
                      <td className="py-3 px-4 text-slate-500">T-slot required for 20A plugs</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Primary Home Locations</td>
                      <td className="py-3 px-4">Bedrooms, living rooms, hallways</td>
                      <td className="py-3 px-4">Kitchens, baths, garage, laundry</td>
                      <td className="py-3 px-4 text-slate-500">NEC 210.11(C) required circuits</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                A 20-amp circuit provides 33% more electrical capacity than a 15-amp circuit. That extra 480 watts of continuous capacity makes a major difference when powering heating elements and motor appliances.
              </p>
            </section>

            {/* SECTION 5: Space Heater Case Study */}
            <section id="space-heater-example" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  The 1,500W Space Heater: Why Breakers Trip
                </h2>
              </div>

              <p>
                Nearly all consumer portable electric heaters sold in the United States are rated at 1,500 watts on high heat. This rating aligns with Underwriters Laboratories standard UL 1278 to operate safely within 15-amp branch limits.
              </p>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-500" />
                  <span>The 1,500W Space Heater Calculation</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-xs text-slate-500 block">Current Draw</span>
                    <span className="text-xl font-bold text-slate-900">12.5 Amps</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-xs text-slate-500 block">15A Continuous Limit</span>
                    <span className="text-xl font-bold text-blue-600">1,440 Watts</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-xs text-slate-500 block">Continuous Deficit</span>
                    <span className="text-xl font-bold text-rose-600">+60 Watts</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Dividing 1,500 watts by 120 volts equals 12.5 amps. Because a space heater runs continuously for hours, it exceeds the 12-amp (1,440-watt) continuous safety limit by 0.5 amps (60 watts).
                </p>
              </div>

              <p>
                Because standard circuit breakers use thermal-magnetic trip mechanisms, drawing 12.5 amps through a 15-amp breaker will not trip it immediately. Instead, the bimetallic strip slowly heats up over 30 to 90 minutes.
              </p>

              <p>
                If a television (100W), laptop charger (65W), or floor lamp (50W) operates on the same circuit, the combined draw reaches 1,715 watts (14.3 amps). This pushes the circuit right to the edge of an immediate thermal trip.
              </p>

              <p>
                If someone turns on a hair dryer (1,500W) or a vacuum cleaner (1,200W) on the same circuit, total demand leaps past 2,700 watts. The breaker trips instantly to protect wire insulation from melting.
              </p>

              <p>
                The U.S. Consumer Product Safety Commission (CPSC) and ESFI strongly advise plugging space heaters directly into wall outlets. Extension cords and power strips introduce contact resistance, creating dangerous localized heat.
              </p>
            </section>

            {/* SECTION 6: Everyday Household Loads */}
            <section id="real-world-loads" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Everyday Household Appliances and Circuit Headroom
                </h2>
              </div>

              <p>
                Multiple outlets in a room are almost always wired in parallel onto a single branch circuit. Knowing the running wattage of common appliances helps you balance loads across separate rooms.
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-900 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Appliance</th>
                      <th className="py-3 px-4">Typical Running Watts</th>
                      <th className="py-3 px-4">Current at 120V</th>
                      <th className="py-3 px-4">Circuit Impact (15A Circuit)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Space Heater (High)</td>
                      <td className="py-3 px-4 font-mono">1,500W</td>
                      <td className="py-3 px-4 font-mono">12.5A</td>
                      <td className="py-3 px-4 text-rose-700 font-medium">Consumes 83% capacity alone</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Hair Dryer</td>
                      <td className="py-3 px-4 font-mono">1,500W - 1,875W</td>
                      <td className="py-3 px-4 font-mono">12.5A - 15.6A</td>
                      <td className="py-3 px-4 text-rose-700 font-medium">Requires dedicated circuit</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Microwave Oven</td>
                      <td className="py-3 px-4 font-mono">1,000W - 1,500W</td>
                      <td className="py-3 px-4 font-mono">8.3A - 12.5A</td>
                      <td className="py-3 px-4 text-amber-700 font-medium">Heavy intermittent draw</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Coffee Maker</td>
                      <td className="py-3 px-4 font-mono">800W - 1,200W</td>
                      <td className="py-3 px-4 font-mono">6.7A - 10.0A</td>
                      <td className="py-3 px-4 text-amber-700 font-medium">High heating load during brew</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Refrigerator (Running)</td>
                      <td className="py-3 px-4 font-mono">150W - 400W</td>
                      <td className="py-3 px-4 font-mono">1.3A - 3.3A</td>
                      <td className="py-3 px-4 text-blue-700 font-medium">Surges up to 1,200W at start</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Desktop Gaming PC</td>
                      <td className="py-3 px-4 font-mono">350W - 650W</td>
                      <td className="py-3 px-4 font-mono">2.9A - 5.4A</td>
                      <td className="py-3 px-4 text-emerald-700 font-medium">Leaves 800W+ safe headroom</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">LED Television (55-65&quot;)</td>
                      <td className="py-3 px-4 font-mono">80W - 140W</td>
                      <td className="py-3 px-4 font-mono">0.7A - 1.2A</td>
                      <td className="py-3 px-4 text-emerald-700 font-medium">Minimal circuit impact</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Wi-Fi Router &amp; Modem</td>
                      <td className="py-3 px-4 font-mono">15W - 30W</td>
                      <td className="py-3 px-4 font-mono">0.1A - 0.25A</td>
                      <td className="py-3 px-4 text-emerald-700 font-medium">Negligible continuous draw</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                In a home office on a 15-amp circuit, running a gaming computer (500W), two monitors (80W), and a desk lamp (20W) consumes 600 watts total (5.0 amps). This leaves 840 watts of continuous headroom, well within safe limits.
              </p>

              <p>
                However, adding a small 1,500-watt personal heater beneath the desk instantly pushes the total load to 2,100 watts (17.5 amps). The circuit breaker will trip within minutes.
              </p>
            </section>

            {/* SECTION 7: Inrush Current & Trip Curves */}
            <section id="inrush-surge-current" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Inrush Current, Motor Surge, and Trip Curves
                </h2>
              </div>

              <p>
                Not all appliances draw steady power from the moment they are switched on. Inductive loads with electric motors, such as air conditioners, refrigerators, and power tools, require an initial surge known as inrush current.
              </p>

              <p>
                When an electric motor starts from a dead standstill, its rotor has zero back-electromotive force. For the first two to six AC cycles, the motor draws three to six times its normal running amperage.
              </p>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  <span>Dual-Action Inverse-Time Circuit Breakers</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="font-bold text-slate-900 block text-base">
                      Thermal Protection (Bimetallic)
                    </span>
                    <p className="text-slate-600">
                      Defends against continuous minor overloads. A bimetallic strip bends as it warms, triggering the trip mechanism over seconds or minutes depending on load severity.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="font-bold text-slate-900 block text-base">
                      Magnetic Protection (Solenoid)
                    </span>
                    <p className="text-slate-600">
                      Defends against severe short circuits. An internal electromagnetic coil creates an instantaneous mechanical trip within milliseconds when current spikes 5x to 10x above rating.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Because standard thermal-magnetic breakers follow an inverse-time response curve, brief inrush spikes from a refrigerator starting up do not trigger a trip. The breaker tolerates short surges while preventing sustained wire overheating.
              </p>
            </section>

            {/* SECTION 8: Wire Gauge and Outlets */}
            <section id="wire-gauge-receptacles" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Wire Gauge and Outlets: 14 AWG vs. 12 AWG
                </h2>
              </div>

              <p>
                Circuit breaker amperage is not selected arbitrarily. It is legally mandated by the National Electrical Code to protect the specific thickness of copper wire hidden inside your walls.
              </p>

              <p>
                Electrical current flowing through a copper conductor creates heat due to electrical resistance. Thinner conductors have higher electrical resistance and build up heat much faster than thicker conductors.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">14 AWG Copper Wire</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-800">
                      White Sheath (NM-B)
                    </span>
                  </div>
                  <div className="text-2xl font-black text-slate-900">15 Amps Maximum</div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Governed by NEC 240.4(D)(3). 14-gauge copper wire is strictly limited to 15-amp overcurrent protection to prevent insulation breakdown.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">12 AWG Copper Wire</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900">
                      Yellow Sheath (NM-B)
                    </span>
                  </div>
                  <div className="text-2xl font-black text-slate-900">20 Amps Maximum</div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Governed by NEC 240.4(D)(5). 12-gauge copper wire has a larger cross-sectional area and safely carries up to 20 amps without overheating.
                  </p>
                </div>
              </div>

              <p>
                Under NEC 334.80, nonmetallic-sheathed cable (NM-B) ampacity is evaluated using the 60°C column of Table 310.16. This limits 14 AWG copper to 15 amps and 12 AWG copper to 20 amps.
              </p>

              <p>
                Modern NM-B cable uses color-coded outer sheathing (white for 14 AWG, yellow for 12 AWG). In homes built before roughly 2001, sheaths were often white for both gauges, requiring physical wire inspection.
              </p>

              <p>
                Receptacles also reflect these ratings. Standard NEMA 5-15R duplex outlets feature two parallel vertical slots. Heavy-duty NEMA 5-20R outlets feature a horizontal T-slot on the neutral opening.
              </p>

              <p>
                Per NEC Table 210.21(B)(3), a 20-amp branch circuit with multiple receptacles may safely use standard 15-amp outlets. This allows standard plugs to connect while the circuit wiring handles higher total combined loads.
              </p>

              <p>
                Crucially, outlet faceplates never guarantee circuit ampacity. A 20-amp T-slot outlet might have been improperly wired to 14 AWG wire by an amateur. Confirm circuit rating by checking breaker size and conductor gauge.
              </p>
            </section>

            {/* SECTION 9: Critical Safety Warning */}
            <section id="breaker-upgrade-safety" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Safety Warning: Why You Cannot Just Swap Breakers
                </h2>
              </div>

              <p>
                When a circuit breaker trips repeatedly from a space heater or microwave, homeowners sometimes ask if they can simply replace the 15-amp breaker with a 20-amp breaker.
              </p>

              <div className="p-6 rounded-2xl bg-rose-50 border-2 border-rose-400 space-y-3">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-base">
                  <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0" />
                  <span>Critical Fire Safety Hazard</span>
                </div>
                <p className="text-xs sm:text-sm text-rose-950 font-medium leading-relaxed">
                  Never swap a 15-amp circuit breaker for a 20-amp breaker without upgrading all branch circuit conductors to 12 AWG copper. Installing a 20-amp breaker on 14 AWG wire turns the wire inside your walls into an unprotected heating element.
                </p>
              </div>

              <p>
                The circuit breaker exists to protect the hidden electrical wire from overheating, not to keep your appliances powered. If you install a 20-amp breaker on 14 AWG wire, the wire can draw 19 amps continuously.
              </p>

              <p>
                At 19 amps, 14 AWG wire produces 60% more resistive heat than its design limit. The PVC insulation bakes, turns brittle, cracks, and can ignite wooden wall studs behind your drywall.
              </p>

              <p>
                If your breaker is tripping frequently, you have an overloaded circuit. The correct solution is redistributing your high-draw appliances or hiring a licensed electrician to install a dedicated 20-amp circuit.
              </p>
            </section>

            {/* SECTION 10: Step-by-Step Audit */}
            <section id="how-to-check-capacity" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Step-by-Step Circuit Capacity Audit
                </h2>
              </div>

              <p>
                Performing a quick electrical audit of your room prevents nuisance tripping and ensures safe continuous operation for home offices, entertainment centers, and workshops.
              </p>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                    1
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-base">
                      Locate the Breaker in Your Main Panel
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Open your breaker panel and read the number stamped on the switch handle. A &quot;15&quot; indicates a 15-amp breaker (1,440W continuous), while a &quot;20&quot; indicates a 20-amp breaker (1,920W continuous).
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                    2
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-base">
                      Map Every Receptacle and Light on the Circuit
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Turn the breaker off. Walk through adjacent rooms with a nightlight or outlet tester to verify every dead receptacle and ceiling fixture sharing that single breaker.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                    3
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-base">
                      Sum the Wattage of Simultaneously Operating Devices
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Check manufacturer data plates on each appliance. Add the running watts of all devices that operate simultaneously. If the total exceeds 1,440 watts on a 15A line, move heavy heating loads to an alternate circuit.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                If you live in an older home, note that outlets in multiple rooms frequently share a single 15-amp branch circuit. A bedroom outlet and an adjacent hallway receptacle often connect to the exact same wire.
              </p>
            </section>

            {/* SECTION 11: Related Calculators */}
            <section id="related-calculators" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Related Electrical &amp; Power Calculators
                </h2>
              </div>

              <p>
                Explore our engineering calculators to convert electrical units, size backup generators, and evaluate conductor voltage drop.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="/amps-to-watts-calculator"
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-2"
                >
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                    <Zap className="w-4 h-4" />
                    <span>Amps to Watts Calculator</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Convert circuit current in amperes to real electrical power in watts with DC, single-phase, and three-phase presets.
                  </p>
                </Link>

                <Link
                  href="/watts-to-amps-calculator"
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-2"
                >
                  <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                    <Calculator className="w-4 h-4" />
                    <span>Watts to Amps Calculator</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Convert appliance wattage into required circuit current and check the NEC 125% continuous-load breaker margin.
                  </p>
                </Link>

                <Link
                  href="/voltage-drop-calculator"
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-2"
                >
                  <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
                    <Sliders className="w-4 h-4" />
                    <span>Voltage Drop Calculator</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Calculate conductor voltage drop across long wire distances to ensure terminal voltage stays within NEC 3% guidelines.
                  </p>
                </Link>

                <Link
                  href="/electricity-cost-calculator"
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-2"
                >
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                    <Scale className="w-4 h-4" />
                    <span>Electricity Cost Calculator</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Estimate the hourly, daily, and monthly utility cost of running continuous electrical appliances like space heaters.
                  </p>
                </Link>
              </div>
            </section>

            {/* SECTION 12: FAQ Accordion */}
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

            {/* SECTION 13: Authoritative Engineering Sources & Disclaimers */}
            <section
              id="sources-and-disclaimers"
              className="space-y-4 pt-6 border-t border-slate-200 text-xs text-slate-500 scroll-mt-24"
            >
              <div className="font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <Info className="w-4 h-4 text-slate-400" />
                <span>Authoritative Engineering Sources &amp; Electrical Standards</span>
              </div>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li>
                  National Fire Protection Association (NFPA). <em>NFPA 70: National Electrical Code (NEC)</em>. Article 100 (Definitions), Article 210.19(A)(1) &amp; 210.20(A) (Continuous Sizing), Article 210.21(B) &amp; Table 210.21(B)(2)/(B)(3) (Receptacle Ratings), Article 210.23(A)(1) (Cord-and-Plug Load Limits), Article 240.4(D) (Small Conductors), and Article 334.80 (NM-B Ampacity).
                </li>
                <li>
                  Underwriters Laboratories (UL). <em>UL 489: Molded-Case Circuit Breakers, Molded-Case Switches, and Circuit-Breaker Enclosures</em> (Inverse-Time Trip Curves), and <em>UL 1278: Standard for Movable and Wall- or Ceiling-Hung Electric Room Heaters</em> (1,500W Residential Limit).
                </li>
                <li>
                  National Electrical Manufacturers Association (NEMA). <em>NEMA WD 6: Wiring Devices - Dimensional Specifications</em> (NEMA 5-15 and 5-20 Configuration Standards).
                </li>
                <li>
                  U.S. Consumer Product Safety Commission (CPSC). <em>Document #5015: Space Heater Fire Safety Guidelines</em>.
                </li>
                <li>
                  Electrical Safety Foundation International (ESFI). <em>Home Electrical Safety &amp; Circuit Overload Prevention</em>.
                </li>
                <li>
                  Institute of Electrical and Electronics Engineers (IEEE). <em>IEEE Std 242: IEEE Recommended Practice for Protection and Coordination of Industrial and Commercial Power Systems</em>.
                </li>
              </ul>

              <p className="pt-2 italic text-[11px] leading-relaxed text-slate-500">
                Preliminary Planning Disclaimer: Calculations and circuit sizing on this page are for informational planning purposes. Residential installations must comply with the National Electrical Code (NFPA 70) and local building regulations.
              </p>
              <p className="italic text-[11px] leading-relaxed text-slate-500">
                Always consult a licensed electrician or professional electrical engineer before modifying breakers, panel schedules, or branch wiring.
              </p>
            </section>
          </article>

          {/* Desktop Sticky Sidebar (4 cols on lg) */}
          <aside className="hidden lg:block lg:col-span-4">
            <TableOfContents items={TOC_ITEMS} cluster="electricity" />
          </aside>
        </div>
      </div>
    </>
  );
}
