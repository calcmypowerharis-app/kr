import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Sun,
  Zap,
  ArrowRight,
  ShieldAlert,
  Info,
  Clock,
  HelpCircle,
  Calculator,
  Flame,
  Thermometer,
  Sliders,
  CheckCircle2,
  Cpu,
  Layers,
  Activity,
  AlertTriangle,
  GitBranch,
  Split,
  Maximize2,
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

export const metadata: Metadata = {
  title: "Solar Panels in Series vs Parallel: Wiring Diagrams & Sizing",
  description:
    "Compare solar panels in series vs parallel. See clear wiring diagrams, calculate array voltage and current, and size charge controllers for off-grid and RV systems.",
  alternates: {
    canonical: "https://calcmypower.com/solar-panels-series-vs-parallel",
  },
  openGraph: {
    title:
      "Solar Panels in Series vs Parallel: Wiring Diagrams & Sizing | CalcMyPower",
    description:
      "Compare solar panels in series vs parallel. See clear wiring diagrams, calculate array voltage and current, and size charge controllers for off-grid and RV systems.",
    url: "https://calcmypower.com/solar-panels-series-vs-parallel",
    type: "article",
    images: [
      {
        url: "https://calcmypower.com/images/articles/solar-panels-series-vs-parallel-wiring.webp",
        width: 1200,
        height: 675,
        alt: "Solar panel array wiring showing series and parallel connections to an MPPT charge controller.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Solar Panels in Series vs Parallel: Wiring Diagrams & Sizing | CalcMyPower",
    description:
      "Compare solar panels in series vs parallel. See clear wiring diagrams, calculate array voltage and current, and size charge controllers for off-grid and RV systems.",
    images: [
      "https://calcmypower.com/images/articles/solar-panels-series-vs-parallel-wiring.webp",
    ],
  },
};

const TOC_ITEMS: TocItem[] = [
  { id: "quick-summary", label: "Quick Summary: Series vs. Parallel at a Glance" },
  { id: "panel-ratings", label: "Understanding Solar Panel Ratings (Voc, Vmp, Isc, Imp)" },
  { id: "series-behavior", label: "Solar Panels in Series: Voltage and Current Behavior" },
  { id: "series-diagram", label: "Series Solar Panel Wiring Diagram (2S Configuration)" },
  { id: "parallel-behavior", label: "Solar Panels in Parallel: Voltage and Current Behavior" },
  { id: "parallel-diagram", label: "Parallel Solar Panel Wiring Diagram (2P Configuration)" },
  { id: "series-parallel", label: "Series-Parallel Wiring (2S2P): Combining Both Methods" },
  { id: "series-parallel-diagram", label: "Series-Parallel Wiring Diagram (2S2P Configuration)" },
  { id: "controller-compatibility", label: "Charge Controller Compatibility: MPPT vs. PWM" },
  { id: "partial-shading", label: "Partial Shading, Bypass Diodes & Array Performance" },
  { id: "overcurrent-safety", label: "Overcurrent Protection, Fusing & Electrical Safety" },
  { id: "calculation-examples", label: "Step-by-Step Calculation Examples (2S, 2P, 2S2P)" },
  { id: "decision-guide", label: "Decision Guide: Which Wiring Method Should You Choose?" },
  { id: "related-calculators", label: "Related Power & Energy Calculators" },
  { id: "faq", label: "Frequently Asked Questions" },
];

const FAQ_DATA = [
  {
    question: "Do solar panels charge faster in series or parallel?",
    answer:
      "Under identical sunlight conditions and assuming an MPPT charge controller is used, solar panels produce the same total electrical wattage in both series and parallel. However, series wiring often begins charging batteries earlier in the morning and continues later in the evening because the higher combined string voltage reaches the minimum threshold required by the charge controller sooner. Parallel systems require higher current, which can result in higher resistive voltage drops across long wire runs if conductors are not sufficiently oversized.",
  },
  {
    question: "Can I mix different wattage or brand solar panels in series or parallel?",
    answer:
      "Mixing mismatched solar panels is generally not recommended because it causes electrical mismatch losses. When panels with different current (Imp) ratings are connected in series, the entire string is limited by the current of the lowest-rated module. When panels with different voltage (Vmp) ratings are connected in parallel, the modules are forced to operate at the same voltage, pulling higher-voltage panels away from their maximum power point. If mixing is unavoidable, match Imp closely for series strings and match Vmp closely for parallel branches.",
  },
  {
    question: "Do I need fuses when wiring solar panels in parallel?",
    answer:
      "Overcurrent protection requirements depend on the number of parallel strings and the module manufacturer's maximum series fuse rating (listed on the panel's rating label per NEC 690.9). Systems with only one or two parallel strings generally do not require individual string fuses because a single backfeeding string cannot deliver enough current to exceed the conductor or module rating. When three or more parallel strings are combined, individual string fuses or DC circuit breakers are typically required to protect against fault current from multiple backfeeding strings.",
  },
  {
    question: "What happens if one solar panel in a series string gets shaded?",
    answer:
      "When a cell or panel in a series string is shaded, its electrical resistance increases, which restricts current flow through the entire series circuit. Modern crystalline silicon modules incorporate internal bypass diodes that allow current to bypass shaded cell groups, preventing hot-spot damage and preserving partial string power. However, if shading drops string voltage below the MPPT controller's operating tracking window, array charging capacity will drop substantially.",
  },
  {
    question: "Can I wire three solar panels in series or parallel?",
    answer:
      "Yes. You can wire three identical panels in series (3S) to triple the voltage while maintaining single-panel current, provided the total cold-temperature open-circuit voltage does not exceed your charge controller's maximum input voltage rating. Alternatively, you can wire three panels in parallel (3P) using 3-to-1 MC4 branch connectors or a combiner box to triple the current while maintaining single-panel voltage, provided your wire gauge and controller input current rating can safely handle the combined amperage.",
  },
];

export default function SolarPanelsSeriesVsParallelPage() {
  const articleSchema = generateArticleSchema({
    headline:
      "Solar Panels in Series vs Parallel: Wiring, Voltage & Current Explained",
    description:
      "Compare solar panels in series vs parallel. See clear wiring diagrams, calculate array voltage and current, and size charge controllers for off-grid and RV systems.",
    url: "https://calcmypower.com/solar-panels-series-vs-parallel",
    datePublished: "2026-09-30T00:00:00Z",
    dateModified: "2026-09-30T00:00:00Z",
    images: [
      "https://calcmypower.com/images/articles/solar-panels-series-vs-parallel-wiring.webp",
    ],
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Guides", url: "https://calcmypower.com/calculators" },
    {
      name: "Solar Panels in Series vs Parallel",
      url: "https://calcmypower.com/solar-panels-series-vs-parallel",
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
            Solar Panels in Series vs. Parallel
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
                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 font-semibold">
                  Solar PV Circuit Design &amp; Wiring Guide
                </span>
                <span className="text-slate-400">•</span>
                <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>12 min read</span>
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500">Updated September 2026</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Solar Panels in Series vs Parallel: Wiring, Voltage &amp; Current Explained
              </h1>

              <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-normal">
                Learn how connecting solar panels in series versus parallel alters array operating voltage, circuit amperage, wire gauge requirements, and charge controller compatibility. Review clear technical wiring diagrams, cold-weather voltage limits, and practical off-grid sizing examples.
              </p>
            </header>

            {/* Featured Visual Asset with Click-to-Zoom */}
            <div className="space-y-3">
              <ZoomableArticleImage
                src="/images/articles/solar-panels-series-vs-parallel-wiring.webp"
                alt="Solar panel array wiring showing series and parallel connections to an MPPT charge controller."
                title="Solar Panels: Series vs. Parallel Wiring"
                caption="Figure 1: Monocrystalline photovoltaic modules wired with heavy-duty MC4 connectors into an off-grid combiner box and MPPT solar charge controller."
              >
                <Image
                  src="/images/articles/solar-panels-series-vs-parallel-wiring.webp"
                  alt="Solar panel array wiring showing series and parallel connections to an MPPT charge controller."
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

                {/* AEO Direct-Answer Block 1 */}
                <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-200/90 space-y-3">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                    <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Do solar panels produce more voltage in series or parallel?</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                    Solar panels connected in <strong>series</strong> produce higher voltage, while panels connected in <strong>parallel</strong> produce higher current (amperage). In a series circuit, panel voltages add together while current remains constant (V<sub>total</sub> = V<sub>1</sub> + V<sub>2</sub>, I<sub>total</sub> = I<sub>1</sub>). In a parallel circuit, panel currents add together while voltage remains constant (V<sub>total</sub> = V<sub>1</sub>, I<sub>total</sub> = I<sub>1</sub> + I<sub>2</sub>). Under uniform sunlight and identical test conditions, the total theoretical power capacity (V × I) is the same in both configurations.
                  </p>
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  When you connect two or more solar panels together, you are assembling an electrical photovoltaic (PV) array. The arrangement you choose fundamentally dictates how electrical power is transmitted from your array down to your solar charge controller and battery storage bank. While both configurations deliver the same total theoretical wattage under unshaded, standard test conditions, they perform completely differently with respect to wire gauge sizing, voltage drop over distance, partial shading sensitivity, and equipment safety margins.
                </p>

                {/* Master Comparison Table */}
                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                        <th className="p-3 sm:p-4">Electrical Parameter</th>
                        <th className="p-3 sm:p-4">Series Wiring (e.g., 2S)</th>
                        <th className="p-3 sm:p-4">Parallel Wiring (e.g., 2P)</th>
                        <th className="p-3 sm:p-4">Series-Parallel (e.g., 2S2P)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr>
                        <td className="p-3 sm:p-4 font-semibold text-slate-900">Array Operating Voltage</td>
                        <td className="p-3 sm:p-4 text-blue-700 font-semibold">Adds Together (V<sub>1</sub> + V<sub>2</sub>)</td>
                        <td className="p-3 sm:p-4">Stays Same (Equal to 1 Module)</td>
                        <td className="p-3 sm:p-4 text-indigo-700 font-semibold">Intermediate (Series Strings Add)</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-semibold text-slate-900">Array Operating Current</td>
                        <td className="p-3 sm:p-4">Stays Same (Equal to 1 Module)</td>
                        <td className="p-3 sm:p-4 text-amber-700 font-semibold">Adds Together (I<sub>1</sub> + I<sub>2</sub>)</td>
                        <td className="p-3 sm:p-4 text-indigo-700 font-semibold">Intermediate (Parallel Branches Add)</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-semibold text-slate-900">Cable Size &amp; Voltage Drop</td>
                        <td className="p-3 sm:p-4 text-emerald-700 font-medium">Thin wire / Minimal voltage drop</td>
                        <td className="p-3 sm:p-4 text-rose-700 font-medium">Thick wire / High voltage drop risk</td>
                        <td className="p-3 sm:p-4">Balanced conductor requirements</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-semibold text-slate-900">Required Controller Type</td>
                        <td className="p-3 sm:p-4 font-medium text-slate-900">MPPT Controller Required</td>
                        <td className="p-3 sm:p-4">PWM or MPPT Compatible</td>
                        <td className="p-3 sm:p-4 font-medium text-slate-900">MPPT Controller Required</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-semibold text-slate-900">Partial Shading Response</td>
                        <td className="p-3 sm:p-4">Can reduce entire string current</td>
                        <td className="p-3 sm:p-4 text-emerald-700 font-medium">Shaded panel does not bottleneck others</td>
                        <td className="p-3 sm:p-4">Isolates shading to affected string</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-semibold text-slate-900">Best Application</td>
                        <td className="p-3 sm:p-4">Long runs, MPPT setups, off-grid homes</td>
                        <td className="p-3 sm:p-4">Short runs, RVs with localized roof shading</td>
                        <td className="p-3 sm:p-4">Arrays with 4+ panels balancing V &amp; I</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* SECTION 2: Understanding Ratings */}
              <section id="panel-ratings" className="space-y-6 scroll-mt-24">
                <div className="border-b border-slate-200 pb-3">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Understanding Solar Panel Ratings (Voc, Vmp, Isc, Imp)
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Before designing any photovoltaic circuit, you must examine the manufacturer specification label located on the rear of your solar panel. Every module displays four fundamental electrical ratings measured under Standard Test Conditions (STC: 1,000 W/m² solar irradiance, 25°C cell temperature, and Air Mass 1.5 spectrum). Knowing the difference between open-circuit, operating, and short-circuit values is essential for safe circuit sizing and charge controller selection.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Voltage Specifications</span>
                      <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-800">Volts (V)</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Voc vs. Vmp</h3>
                    <ul className="text-xs sm:text-sm text-slate-600 space-y-2">
                      <li>
                        <strong>Open-Circuit Voltage (V<sub>oc</sub>):</strong> The maximum voltage the module produces when disconnected from any electrical load. This is the critical parameter used to prevent exceeding charge controller maximum input voltage ratings.
                      </li>
                      <li>
                        <strong>Maximum Power Voltage (V<sub>mp</sub>):</strong> The voltage produced when the panel operates under load at its peak wattage output. This is the operating voltage you experience during active battery charging.
                      </li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Current Specifications</span>
                      <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800">Amperes (A)</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Isc vs. Imp</h3>
                    <ul className="text-xs sm:text-sm text-slate-600 space-y-2">
                      <li>
                        <strong>Short-Circuit Current (I<sub>sc</sub>):</strong> The maximum current flow when the positive and negative leads are directly shorted together. This value determines minimum conductor ampacity and overcurrent protection fuse ratings.
                      </li>
                      <li>
                        <strong>Maximum Power Current (I<sub>mp</sub>):</strong> The operating current delivered when the module produces its rated peak power at V<sub>mp</sub>.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-600" />
                    <span>The Nominal &quot;12V&quot; or &quot;24V&quot; Panel Fallacy</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Solar panels are frequently marketed as nominal &quot;12V&quot; or &quot;24V&quot; modules. However, a nominal 12V panel typically produces an open-circuit voltage (V<sub>oc</sub>) between 21V and 24.5V, and operates at a V<sub>mp</sub> around 18V to 20.5V. It requires this elevated voltage to drive charging current into a 12V lead-acid or lithium battery, which reaches 14.2V to 14.6V during absorption charging. Never use nominal battery voltages for circuit math; always use the physical V<sub>oc</sub> and V<sub>mp</sub> numbers from your panel label. For a detailed breakdown of how power converts to energy over time, review our guide on{" "}
                    <Link
                      href="/what-is-a-watt-hour"
                      className="text-blue-600 hover:text-blue-800 font-semibold underline underline-offset-2"
                    >
                      understanding Watt-hours and daily energy production
                    </Link>.
                  </p>
                </div>
              </section>

              {/* SECTION 3: Series Behavior */}
              <section id="series-behavior" className="space-y-6 scroll-mt-24">
                <div className="border-b border-slate-200 pb-3">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Solar Panels in Series: How Voltage and Current Behave
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Wiring solar panels in series is analogous to stacking flashlight batteries in a tube: the electrical potentials add together sequentially, while the volume of electrical charge passing through each element remains identical.
                </p>

                {/* Circuit Law Equations */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 text-center space-y-1">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Series Voltage Law</div>
                    <code className="text-sm sm:text-base font-mono font-bold text-blue-700">
                      V_array = V_1 + V_2 + ... + V_n
                    </code>
                    <p className="text-[11px] text-slate-500">Total voltage equals the sum of individual module voltages</p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200 text-center space-y-1">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Series Current Law</div>
                    <code className="text-sm sm:text-base font-mono font-bold text-amber-700">
                      I_array = I_1 = I_2 = ... = I_n
                    </code>
                    <p className="text-[11px] text-slate-500">Array current is limited to the current of a single panel</p>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  Why Higher Voltage Reduces Power Loss Over Long Cable Runs
                </h3>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Electrical power loss in any copper wire conductor follows Joule&apos;s Law: <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-slate-800">P_loss = I² × R</code>, where <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-slate-800">I</code> is current in Amperes and <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-slate-800">R</code> is conductor resistance in Ohms. Notice that resistive power loss increases with the <em>square</em> of the current.
                </p>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  When you double operating voltage by wiring panels in series, you transmit the exact same wattage at half the amperage. Cutting current in half reduces conductor power dissipation to one-fourth (0.5² = 0.25). This allows installers to use smaller, lighter, and more economical copper cables (such as 10 AWG or 12 AWG PV wire) over runs of 50 to 100 feet without suffering unacceptable voltage drop. You can verify total wattage across varying voltage and current combinations with our{" "}
                  <Link
                    href="/amps-to-watts-calculator"
                    className="text-blue-600 hover:text-blue-800 font-semibold underline underline-offset-2"
                  >
                    amps to watts calculator
                  </Link>.
                </p>
              </section>

              {/* SECTION 4: Series Diagram (2S) */}
              <section id="series-diagram" className="space-y-6 scroll-mt-24">
                <div className="border-b border-slate-200 pb-3">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Series Solar Panel Wiring Diagram (2S Configuration)
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  In a two-panel series (2S) configuration, the positive terminal of Module 1 connects directly to the negative terminal of Module 2. The remaining free negative lead from Module 1 and free positive lead from Module 2 are routed into your MPPT charge controller.
                </p>

                {/* DIAGRAM 1: 2S Series Technical Schematic (Accessible Clean SVG) */}
                <figure className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <GitBranch className="w-4 h-4 text-blue-600" />
                      <span>Diagram 1: Two Solar Panels in Series (2S)</span>
                    </span>
                    <span className="text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">
                      Illustrative Benchmark Values
                    </span>
                  </div>

                  <div className="w-full overflow-x-auto">
                    <svg
                      viewBox="0 0 800 360"
                      className="w-full min-w-[640px] h-auto font-sans"
                      role="img"
                      aria-label="Schematic diagram showing two 200W solar panels connected in series. The positive lead of Panel 1 connects to the negative lead of Panel 2, doubling voltage to 40.8V Vmp while maintaining 9.8A Imp to an MPPT charge controller."
                    >
                      <rect width="800" height="360" fill="#f8fafc" rx="12" />

                      {/* Module 1 */}
                      <g transform="translate(60, 40)">
                        <rect width="260" height="180" rx="8" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2" />
                        <path d="M 65 0 L 65 180 M 130 0 L 130 180 M 195 0 L 195 180 M 0 60 L 260 60 M 0 120 L 260 120" stroke="#334155" strokeWidth="1" />
                        <rect x="70" y="14" width="120" height="30" rx="4" fill="#0f172a" />
                        <text x="130" y="34" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
                          PANEL 1 (200W)
                        </text>
                        <text x="130" y="85" fill="#f8fafc" fontSize="11" textAnchor="middle">
                          Vmp: 20.4V | Imp: 9.80A
                        </text>
                        <text x="130" y="105" fill="#94a3b8" fontSize="10" textAnchor="middle">
                          Voc: 24.3V | Isc: 10.20A
                        </text>
                        {/* Terminals */}
                        <circle cx="80" cy="180" r="7" fill="#1e3a8a" />
                        <text x="80" y="184" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">-</text>
                        <circle cx="180" cy="180" r="7" fill="#dc2626" />
                        <text x="180" y="184" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">+</text>
                      </g>

                      {/* Module 2 */}
                      <g transform="translate(380, 40)">
                        <rect width="260" height="180" rx="8" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2" />
                        <path d="M 65 0 L 65 180 M 130 0 L 130 180 M 195 0 L 195 180 M 0 60 L 260 60 M 0 120 L 260 120" stroke="#334155" strokeWidth="1" />
                        <rect x="70" y="14" width="120" height="30" rx="4" fill="#0f172a" />
                        <text x="130" y="34" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
                          PANEL 2 (200W)
                        </text>
                        <text x="130" y="85" fill="#f8fafc" fontSize="11" textAnchor="middle">
                          Vmp: 20.4V | Imp: 9.80A
                        </text>
                        <text x="130" y="105" fill="#94a3b8" fontSize="10" textAnchor="middle">
                          Voc: 24.3V | Isc: 10.20A
                        </text>
                        {/* Terminals */}
                        <circle cx="80" cy="180" r="7" fill="#1e3a8a" />
                        <text x="80" y="184" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">-</text>
                        <circle cx="180" cy="180" r="7" fill="#dc2626" />
                        <text x="180" y="184" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">+</text>
                      </g>

                      {/* Series Bridge Jumper: Panel 1 (+) to Panel 2 (-) */}
                      <path d="M 240 220 C 240 270, 460 270, 460 220" fill="none" stroke="#dc2626" strokeWidth="3" strokeDasharray="6 3" />
                      <rect x="310" y="248" width="80" height="20" rx="4" fill="#ffffff" stroke="#dc2626" />
                      <text x="350" y="262" fill="#dc2626" fontSize="10" fontWeight="bold" textAnchor="middle">
                        Series Jumper
                      </text>

                      {/* Main Feeds to Controller */}
                      {/* Negative Feed from Panel 1 */}
                      <path d="M 140 220 L 140 310 L 680 310" fill="none" stroke="#1e3a8a" strokeWidth="3" />
                      <text x="320" y="304" fill="#1e3a8a" fontSize="10" fontWeight="bold">
                        Negative DC Feed (-) [9.80A]
                      </text>

                      {/* Positive Feed from Panel 2 */}
                      <path d="M 560 220 L 560 280 L 680 280" fill="none" stroke="#dc2626" strokeWidth="3" />
                      <text x="575" y="274" fill="#dc2626" fontSize="10" fontWeight="bold">
                        Positive DC Feed (+) [9.80A]
                      </text>

                      {/* Charge Controller Representation */}
                      <g transform="translate(680, 250)">
                        <rect width="90" height="80" rx="6" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
                        <text x="45" y="28" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                          MPPT SOLAR
                        </text>
                        <text x="45" y="42" fill="#ffffff" fontSize="9" textAnchor="middle">
                          CONTROLLER
                        </text>
                        <circle cx="25" cy="62" r="5" fill="#dc2626" />
                        <circle cx="65" cy="62" r="5" fill="#1e3a8a" />
                        <text x="25" y="75" fill="#ffffff" fontSize="8" textAnchor="middle">PV+</text>
                        <text x="65" y="75" fill="#ffffff" fontSize="8" textAnchor="middle">PV-</text>
                      </g>

                      {/* Array Metrics Summary Box */}
                      <rect x="230" y="10" width="340" height="26" rx="6" fill="#0f172a" />
                      <text x="400" y="27" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                        TOTAL ARRAY: 400W | Vmp: 40.8V | Imp: 9.80A | Voc: 48.6V
                      </text>
                    </svg>
                  </div>

                  <figcaption className="text-xs text-slate-500 text-center leading-relaxed">
                    Figure 2: In a 2S series connection, panel voltages combine (20.4V + 20.4V = 40.8V V<sub>mp</sub>) while operating current remains steady at 9.80A, requiring only two home-run conductors to the MPPT controller.
                  </figcaption>
                </figure>

                <div className="space-y-3">
                  <h3 className="text-base font-bold text-slate-900">Step-by-Step Series Connection Sequence:</h3>
                  <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed pl-1">
                    <li>Place modules adjacent to each other on mounting rails with matching orientation.</li>
                    <li>Locate the male MC4 positive (+) cable on Module 1 and snap it firmly into the female MC4 negative (-) cable on Module 2 until you hear an audible click.</li>
                    <li>Connect the remaining negative (-) lead from Module 1 to your negative DC home-run extension cable.</li>
                    <li>Connect the remaining positive (+) lead from Module 2 to your positive DC home-run extension cable.</li>
                    <li>Verify open-circuit voltage at the charge controller disconnect switch using a digital multimeter prior to engaging the circuit.</li>
                  </ol>
                </div>
              </section>

              {/* SECTION 5: Parallel Behavior */}
              <section id="parallel-behavior" className="space-y-6 scroll-mt-24">
                <div className="border-b border-slate-200 pb-3">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Solar Panels in Parallel: How Voltage and Current Behave
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  In a parallel solar circuit, all positive panel terminals are linked together, and all negative terminals are linked together. This splits incoming solar current across multiple parallel paths while keeping circuit potential fixed at single-panel voltage.
                </p>

                {/* Circuit Law Equations */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 text-center space-y-1">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Parallel Voltage Law</div>
                    <code className="text-sm sm:text-base font-mono font-bold text-blue-700">
                      V_array = V_1 = V_2 = ... = V_n
                    </code>
                    <p className="text-[11px] text-slate-500">Array operating voltage equals single module voltage</p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200 text-center space-y-1">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Parallel Current Law</div>
                    <code className="text-sm sm:text-base font-mono font-bold text-amber-700">
                      I_array = I_1 + I_2 + ... + I_n
                    </code>
                    <p className="text-[11px] text-slate-500">Array current equals the sum of branch currents</p>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  Hardware Requirements: MC4 Branch Connectors and Combiner Boxes
                </h3>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  To wire two panels in parallel, installers commonly use <strong>MC4 2-to-1 Y-branch connectors</strong> (one pair: 2-male-to-1-female and 2-female-to-1-male). The positive leads from both panels plug into one branch connector, and the negative leads plug into the other, merging the outputs into a single pair of heavy-gauge home-run conductors.
                </p>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  When combining three or more parallel modules, a dedicated weatherproof <strong>PV combiner box</strong> equipped with individual branch fuses and a DC disconnect switch is typically utilized. Because current multiplies with each parallel panel, installers must verify wire ampacity using our{" "}
                  <Link
                    href="/watts-to-amps-calculator"
                    className="text-blue-600 hover:text-blue-800 font-semibold underline underline-offset-2"
                  >
                    watts to amps electrical calculator
                  </Link>{" "}
                  to select appropriately sized conductors that avoid resistive overheating and excessive voltage drop.
                </p>
              </section>

              {/* SECTION 6: Parallel Diagram (2P) */}
              <section id="parallel-diagram" className="space-y-6 scroll-mt-24">
                <div className="border-b border-slate-200 pb-3">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Parallel Solar Panel Wiring Diagram (2P Configuration)
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  In a two-panel parallel (2P) configuration, both positive leads terminate into a positive Y-branch connector, and both negative leads terminate into a negative Y-branch connector.
                </p>

                {/* DIAGRAM 2: 2P Parallel Technical Schematic (Accessible Clean SVG) */}
                <figure className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Split className="w-4 h-4 text-amber-600" />
                      <span>Diagram 2: Two Solar Panels in Parallel (2P)</span>
                    </span>
                    <span className="text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">
                      Illustrative Benchmark Values
                    </span>
                  </div>

                  <div className="w-full overflow-x-auto">
                    <svg
                      viewBox="0 0 800 370"
                      className="w-full min-w-[640px] h-auto font-sans"
                      role="img"
                      aria-label="Schematic diagram showing two 200W solar panels connected in parallel. Positive leads combine via an MC4 Y-branch connector, and negative leads combine via a second connector, doubling current to 19.6A Imp while holding voltage steady at 20.4V Vmp."
                    >
                      <rect width="800" height="370" fill="#f8fafc" rx="12" />

                      {/* Module 1 */}
                      <g transform="translate(60, 40)">
                        <rect width="260" height="180" rx="8" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2" />
                        <path d="M 65 0 L 65 180 M 130 0 L 130 180 M 195 0 L 195 180 M 0 60 L 260 60 M 0 120 L 260 120" stroke="#334155" strokeWidth="1" />
                        <rect x="70" y="14" width="120" height="30" rx="4" fill="#0f172a" />
                        <text x="130" y="34" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
                          PANEL 1 (200W)
                        </text>
                        <text x="130" y="85" fill="#f8fafc" fontSize="11" textAnchor="middle">
                          Vmp: 20.4V | Imp: 9.80A
                        </text>
                        <text x="130" y="105" fill="#94a3b8" fontSize="10" textAnchor="middle">
                          Voc: 24.3V | Isc: 10.20A
                        </text>
                        <circle cx="80" cy="180" r="7" fill="#1e3a8a" />
                        <text x="80" y="184" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">-</text>
                        <circle cx="180" cy="180" r="7" fill="#dc2626" />
                        <text x="180" y="184" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">+</text>
                      </g>

                      {/* Module 2 */}
                      <g transform="translate(380, 40)">
                        <rect width="260" height="180" rx="8" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2" />
                        <path d="M 65 0 L 65 180 M 130 0 L 130 180 M 195 0 L 195 180 M 0 60 L 260 60 M 0 120 L 260 120" stroke="#334155" strokeWidth="1" />
                        <rect x="70" y="14" width="120" height="30" rx="4" fill="#0f172a" />
                        <text x="130" y="34" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
                          PANEL 2 (200W)
                        </text>
                        <text x="130" y="85" fill="#f8fafc" fontSize="11" textAnchor="middle">
                          Vmp: 20.4V | Imp: 9.80A
                        </text>
                        <text x="130" y="105" fill="#94a3b8" fontSize="10" textAnchor="middle">
                          Voc: 24.3V | Isc: 10.20A
                        </text>
                        <circle cx="80" cy="180" r="7" fill="#1e3a8a" />
                        <text x="80" y="184" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">-</text>
                        <circle cx="180" cy="180" r="7" fill="#dc2626" />
                        <text x="180" y="184" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">+</text>
                      </g>

                      {/* Positive Branch Combiner */}
                      <path d="M 240 220 L 240 260 L 350 260" fill="none" stroke="#dc2626" strokeWidth="2.5" />
                      <path d="M 560 220 L 560 260 L 370 260" fill="none" stroke="#dc2626" strokeWidth="2.5" />
                      <circle cx="360" cy="260" r="8" fill="#dc2626" />
                      <rect x="300" y="248" width="120" height="24" rx="4" fill="#ffffff" stroke="#dc2626" />
                      <text x="360" y="264" fill="#dc2626" fontSize="9" fontWeight="bold" textAnchor="middle">
                        MC4 (+) Y-Branch
                      </text>

                      {/* Negative Branch Combiner */}
                      <path d="M 140 220 L 140 300 L 270 300" fill="none" stroke="#1e3a8a" strokeWidth="2.5" />
                      <path d="M 460 220 L 460 300 L 290 300" fill="none" stroke="#1e3a8a" strokeWidth="2.5" />
                      <circle cx="280" cy="300" r="8" fill="#1e3a8a" />
                      <rect x="220" y="288" width="120" height="24" rx="4" fill="#ffffff" stroke="#1e3a8a" />
                      <text x="280" y="304" fill="#1e3a8a" fontSize="9" fontWeight="bold" textAnchor="middle">
                        MC4 (-) Y-Branch
                      </text>

                      {/* Main Heavy Gauge Feeds to Controller */}
                      <path d="M 420 260 L 680 260" fill="none" stroke="#dc2626" strokeWidth="4" />
                      <text x="500" y="252" fill="#dc2626" fontSize="10" fontWeight="bold">
                        Combined Positive (+) [19.60A Imp]
                      </text>

                      <path d="M 340 300 L 680 300" fill="none" stroke="#1e3a8a" strokeWidth="4" />
                      <text x="470" y="320" fill="#1e3a8a" fontSize="10" fontWeight="bold">
                        Combined Negative (-) [19.60A Imp]
                      </text>

                      {/* Charge Controller Representation */}
                      <g transform="translate(680, 240)">
                        <rect width="90" height="85" rx="6" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
                        <text x="45" y="28" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                          CHARGE
                        </text>
                        <text x="45" y="42" fill="#ffffff" fontSize="9" textAnchor="middle">
                          CONTROLLER
                        </text>
                        <circle cx="25" cy="64" r="5" fill="#dc2626" />
                        <circle cx="65" cy="64" r="5" fill="#1e3a8a" />
                        <text x="25" y="77" fill="#ffffff" fontSize="8" textAnchor="middle">PV+</text>
                        <text x="65" y="77" fill="#ffffff" fontSize="8" textAnchor="middle">PV-</text>
                      </g>

                      {/* Array Metrics Summary Box */}
                      <rect x="230" y="10" width="340" height="26" rx="6" fill="#0f172a" />
                      <text x="400" y="27" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                        TOTAL ARRAY: 400W | Vmp: 20.4V | Imp: 19.60A | Isc: 20.40A
                      </text>
                    </svg>
                  </div>

                  <figcaption className="text-xs text-slate-500 text-center leading-relaxed">
                    Figure 3: In a 2P parallel configuration, operating voltage remains equal to a single panel (20.4V V<sub>mp</sub>) while operating current doubles to 19.60A Imp, requiring heavier gauge copper wire to control resistive losses.
                  </figcaption>
                </figure>
              </section>

              {/* SECTION 7: Series-Parallel Wiring */}
              <section id="series-parallel" className="space-y-6 scroll-mt-24">
                <div className="border-b border-slate-200 pb-3">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Series-Parallel Wiring (2S2P): Combining Both Methods
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  When solar arrays expand to 4, 6, 8, or more panels, choosing strictly series or strictly parallel often introduces critical design bottlenecks:
                </p>

                <ul className="list-disc list-inside text-xs sm:text-sm text-slate-700 space-y-2 pl-2">
                  <li>
                    <strong>Wiring all 4 panels in series (4S)</strong> produces 97.2V V<sub>oc</sub> at STC (which can exceed 115V in sub-zero winter temperatures), pushing past the maximum 100V input limit of standard entry-level MPPT controllers.
                  </li>
                  <li>
                    <strong>Wiring all 4 panels in parallel (4P)</strong> produces 40.8A I<sub>sc</sub>, requiring heavy 6 AWG or 4 AWG copper wire and multi-branch combiner boxes with dedicated branch fuses to avoid code violations.
                  </li>
                </ul>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  A <strong>series-parallel (2S2P)</strong> configuration solves both dilemmas by pairing modules into two identical series strings (String A and String B), and then wiring those two strings together in parallel. Voltage doubles to 40.8V V<sub>mp</sub>, and current doubles to 19.60A I<sub>mp</sub>, keeping both parameters within comfortable operating ranges for standard 100V/30A or 150V/45A MPPT controllers while using standard 10 AWG solar cable.
                </p>
              </section>

              {/* SECTION 8: Series-Parallel Diagram (2S2P) */}
              <section id="series-parallel-diagram" className="space-y-6 scroll-mt-24">
                <div className="border-b border-slate-200 pb-3">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Series-Parallel Wiring Diagram (2S2P Configuration)
                  </h2>
                </div>

                {/* DIAGRAM 3: 2S2P Technical Schematic */}
                <figure className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-indigo-600" />
                      <span>Diagram 3: Four Solar Panels in Series-Parallel (2S2P)</span>
                    </span>
                    <span className="text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">
                      Illustrative Benchmark Values
                    </span>
                  </div>

                  <div className="w-full overflow-x-auto">
                    <svg
                      viewBox="0 0 800 460"
                      className="w-full min-w-[640px] h-auto font-sans"
                      role="img"
                      aria-label="Schematic diagram showing four 200W solar panels in a 2S2P series-parallel configuration. String A consists of two panels in series; String B consists of two panels in series. Both strings combine in parallel to deliver 800W at 40.8V Vmp and 19.6A Imp."
                    >
                      <rect width="800" height="460" fill="#f8fafc" rx="12" />

                      {/* STRING A (TOP ROW) */}
                      <g transform="translate(60, 40)">
                        {/* Panel 1 */}
                        <rect x="0" y="0" width="220" height="130" rx="6" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2" />
                        <text x="110" y="25" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">PANEL 1 (STRING A)</text>
                        <text x="110" y="55" fill="#f8fafc" fontSize="10" textAnchor="middle">200W | 20.4V | 9.8A</text>
                        <circle cx="60" cy="130" r="6" fill="#1e3a8a" />
                        <circle cx="160" cy="130" r="6" fill="#dc2626" />

                        {/* Panel 2 */}
                        <rect x="290" y="0" width="220" height="130" rx="6" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2" />
                        <text x="400" y="25" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">PANEL 2 (STRING A)</text>
                        <text x="400" y="55" fill="#f8fafc" fontSize="10" textAnchor="middle">200W | 20.4V | 9.8A</text>
                        <circle cx="350" cy="130" r="6" fill="#1e3a8a" />
                        <circle cx="450" cy="130" r="6" fill="#dc2626" />

                        {/* Series Jumper String A: Panel 1 (+) to Panel 2 (-) */}
                        <path d="M 160 130 C 160 170, 350 170, 350 130" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="4 2" />
                      </g>

                      {/* STRING B (BOTTOM ROW) */}
                      <g transform="translate(60, 220)">
                        {/* Panel 3 */}
                        <rect x="0" y="0" width="220" height="130" rx="6" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2" />
                        <text x="110" y="25" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">PANEL 3 (STRING B)</text>
                        <text x="110" y="55" fill="#f8fafc" fontSize="10" textAnchor="middle">200W | 20.4V | 9.8A</text>
                        <circle cx="60" cy="130" r="6" fill="#1e3a8a" />
                        <circle cx="160" cy="130" r="6" fill="#dc2626" />

                        {/* Panel 4 */}
                        <rect x="290" y="0" width="220" height="130" rx="6" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2" />
                        <text x="400" y="25" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">PANEL 4 (STRING B)</text>
                        <text x="400" y="55" fill="#f8fafc" fontSize="10" textAnchor="middle">200W | 20.4V | 9.8A</text>
                        <circle cx="350" cy="130" r="6" fill="#1e3a8a" />
                        <circle cx="450" cy="130" r="6" fill="#dc2626" />

                        {/* Series Jumper String B: Panel 3 (+) to Panel 4 (-) */}
                        <path d="M 160 130 C 160 170, 350 170, 350 130" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="4 2" />
                      </g>

                      {/* Parallel Combining Bus */}
                      {/* String Positive Leads to Positive Bus */}
                      <path d="M 510 170 L 610 170 L 610 260" fill="none" stroke="#dc2626" strokeWidth="3" />
                      <path d="M 510 350 L 610 350 L 610 260" fill="none" stroke="#dc2626" strokeWidth="3" />
                      <circle cx="610" cy="260" r="6" fill="#dc2626" />
                      <text x="610" y="245" fill="#dc2626" fontSize="9" fontWeight="bold" textAnchor="middle">MC4 (+) Parallel</text>

                      {/* String Negative Leads to Negative Bus */}
                      <path d="M 120 170 L 40 170 L 40 380 L 680 380" fill="none" stroke="#1e3a8a" strokeWidth="3" />
                      <path d="M 120 350 L 40 350" fill="none" stroke="#1e3a8a" strokeWidth="3" />
                      <circle cx="40" cy="350" r="5" fill="#1e3a8a" />

                      {/* Final Feeds to MPPT */}
                      <path d="M 610 260 L 680 260" fill="none" stroke="#dc2626" strokeWidth="4" />

                      {/* Charge Controller Representation */}
                      <g transform="translate(680, 240)">
                        <rect width="90" height="90" rx="6" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
                        <text x="45" y="26" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">MPPT SOLAR</text>
                        <text x="45" y="40" fill="#ffffff" fontSize="9" textAnchor="middle">CONTROLLER</text>
                        <circle cx="25" cy="65" r="5" fill="#dc2626" />
                        <circle cx="65" cy="65" r="5" fill="#1e3a8a" />
                        <text x="25" y="78" fill="#ffffff" fontSize="8" textAnchor="middle">PV+</text>
                        <text x="65" y="78" fill="#ffffff" fontSize="8" textAnchor="middle">PV-</text>
                      </g>

                      {/* Array Metrics Summary Box */}
                      <rect x="210" y="8" width="380" height="26" rx="6" fill="#0f172a" />
                      <text x="400" y="25" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                        2S2P ARRAY: 800W | Vmp: 40.8V | Imp: 19.60A | Voc: 48.6V
                      </text>
                    </svg>
                  </div>

                  <figcaption className="text-xs text-slate-500 text-center leading-relaxed">
                    Figure 4: A 2S2P arrangement combines two series strings in parallel. Total wattage quadruples (800W), operating voltage doubles to 40.8V V<sub>mp</sub>, and operating current doubles to 19.60A I<sub>mp</sub>.
                  </figcaption>
                </figure>
              </section>

              {/* SECTION 9: Controller Compatibility */}
              <section id="controller-compatibility" className="space-y-6 scroll-mt-24">
                <div className="border-b border-slate-200 pb-3">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Charge Controller Compatibility: MPPT vs. PWM
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Your choice between series and parallel wiring is intrinsically tied to the technology inside your solar charge controller. Connecting panels without matching controller voltage thresholds can lead to severe equipment damage or massive power loss.
                </p>

                {/* AEO Direct-Answer Block 3: Cold-Temperature Voltage Rise */}
                <div className="p-6 rounded-2xl bg-blue-50/80 border border-blue-200/90 space-y-3">
                  <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                    <Thermometer className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Why does solar panel voltage increase in cold weather?</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                    Photovoltaic cells exhibit a negative temperature coefficient of voltage, meaning open-circuit voltage (V<sub>oc</sub>) increases as cell temperature drops below 25°C (77°F). In freezing conditions, array voltage can rise noticeably above nameplate ratings. Installers must calculate cold-weather V<sub>oc</sub> using the manufacturer&apos;s specific temperature coefficient per NEC 690.7 to ensure array voltage does not exceed the charge controller&apos;s maximum input voltage rating.
                  </p>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  Cold-Temperature Voc Calculation per NEC 690.7
                </h3>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  National Electrical Code (NEC Article 690.7) mandates that maximum PV system voltage must be calculated based on the lowest expected ambient temperature at the installation site. The mathematical formula is:
                </p>

                <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-center text-xs sm:text-sm">
                  V_oc_cold = V_oc_STC × [ 1 + ( (α_Voc ÷ 100) × (T_min - 25°C) ) ]
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <strong>Important Compliance Note:</strong> The temperature coefficient of open-circuit voltage (<code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-slate-800">α_Voc</code> or <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-slate-800">γ_Voc</code>, typically between -0.26%/°C and -0.35%/°C) must be taken directly from the specific module manufacturer&apos;s datasheet or certification listing. Never assume a universal coefficient. Exceeding the controller&apos;s maximum PV input voltage can damage the controller and must be avoided.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm">MPPT Controllers (Maximum Power Point Tracking)</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      MPPT controllers utilize an internal high-frequency DC-DC buck converter. They operate most efficiently when incoming array voltage is significantly higher than battery voltage (e.g., 40V to 80V PV input charging a 12V or 24V battery). The controller dynamically tracks the V<sub>mp</sub> knee of the IV curve and steps down the excess voltage into additional charging current (P<sub>in</sub> ≈ P<sub>out</sub> × η). Series and series-parallel wiring are tailored for MPPT units.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm">PWM Controllers (Pulse Width Modulation)</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      PWM controllers act as an electronic switch directly between the panel and the battery bank. When connected, a PWM controller pulls the panel operating voltage down to near the battery&apos;s immediate voltage (e.g., pulling a 20.4V V<sub>mp</sub> panel down to 12.8V). Actual delivered power depends on module operating curves, battery state of charge, irradiance, and cell temperature. Wiring panels in series with a PWM controller results in severe power dissipation, making parallel wiring mandatory for PWM systems.
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  To calculate battery bank storage requirements and evaluate charging hours from your array wattage, utilize our{" "}
                  <Link
                    href="/battery-capacity-calculator"
                    className="text-blue-600 hover:text-blue-800 font-semibold underline underline-offset-2"
                  >
                    battery capacity and sizing calculator
                  </Link>.
                </p>
              </section>

              {/* SECTION 10: Partial Shading & Bypass Diodes */}
              <section id="partial-shading" className="space-y-6 scroll-mt-24">
                <div className="border-b border-slate-200 pb-3">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Partial Shading, Bypass Diodes, and Array Performance
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  One of the most persistent debates in solar installation is how series versus parallel circuits behave when partially shaded by tree limbs, rooftop vents, chimneys, or utility masts.
                </p>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  How Module Bypass Diodes Function
                </h3>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Many crystalline silicon modules incorporate internal bypass diodes installed inside the rear junction box. These diodes divide the solar cells into series groups (typically three groups in a standard 60-cell or 72-cell module, or six sub-strings in split-cell modules). When one cell is shaded, its resistance spikes, causing it to consume rather than produce power. The bypass diode becomes forward-biased and diverts string current around the shaded cell group, preventing destructive hot-spots and allowing the remaining unshaded cell groups to continue generating power.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
                    <h4 className="font-bold text-amber-950 text-sm">Shading in Series Strings</h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      If bypass diodes activate, the string voltage drops by roughly one-third per diode group, but remaining unshaded panels continue generating power. However, if shading covers cells across multiple sub-strings, overall string voltage can drop below the MPPT tracking threshold, significantly reducing charging output for that string.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
                    <h4 className="font-bold text-emerald-950 text-sm">Shading in Parallel Branches</h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      In a parallel circuit, each panel operates as an independent electrical branch. If one module is partially shaded, its current output drops, but the adjacent unshaded parallel modules continue producing their full rated current into the combiner. For vehicles and camper vans with unavoidable rooftop obstructions, parallel wiring offers localized shading resilience.
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Proper array orientation also plays a critical role in mitigating seasonal shade and optimizing production. Calculate your geographic azimuth and seasonal roof pitch angles using our{" "}
                  <Link
                    href="/solar-panel-tilt-calculator"
                    className="text-blue-600 hover:text-blue-800 font-semibold underline underline-offset-2"
                  >
                    solar panel tilt angle calculator
                  </Link>.
                </p>
              </section>

              {/* SECTION 11: Overcurrent Protection & Safety */}
              <section id="overcurrent-safety" className="space-y-6 scroll-mt-24">
                <div className="border-b border-slate-200 pb-3">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Overcurrent Protection, Fusing, and Electrical Safety
                  </h2>
                </div>

                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-rose-900 leading-relaxed">
                    <strong>Electrical Life Safety Disclaimer:</strong> Photovoltaic circuits generate continuous direct current (DC) power whenever exposed to light. DC arcs do not self-extinguish at zero-crossings like alternating current (AC). Always use properly rated DC overcurrent protection, DC disconnect switches, and consult a licensed electrician or engineer in accordance with local building codes.
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  When Is Series or Parallel String Fusing Required? (NEC 690.9)
                </h3>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Overcurrent protection requirements depend on system design, conductor ampacity, and the module manufacturer&apos;s maximum series fuse rating (listed on the specification label per NEC Article 690.9):
                </p>

                <ul className="list-disc list-inside text-xs sm:text-sm text-slate-700 space-y-2.5 pl-2">
                  <li>
                    <strong>Single Series String (1S or multi-panel series string):</strong> No string fuse is required if the conductor ampacity is rated for 1.25x the module short-circuit current (I<sub>sc</sub>) multiplied by the 1.25x continuous-load factor (1.56 × I<sub>sc</sub>). There is no external source of fault current that can backfeed the string.
                  </li>
                  <li>
                    <strong>Two Parallel Strings (2P):</strong> String fuses are generally not required if the conductor ampacity is sized correctly, because if one string suffers a short circuit, the second string can only backfeed its own I<sub>sc</sub> (approx. 10A), which is well below the module&apos;s typical 15A to 20A series fuse rating.
                  </li>
                  <li>
                    <strong>Three or More Parallel Strings (3P+):</strong> Individual string fuses or DC circuit breakers are typically required on each parallel branch. If a short circuit occurs in one module, multiple parallel strings can simultaneously backfeed into the faulted module, delivering combined currents that exceed the module&apos;s maximum series fuse rating and risking a severe electrical fire.
                  </li>
                </ul>
              </section>

              {/* SECTION 12: Step-by-Step Calculation Examples */}
              <section id="calculation-examples" className="space-y-6 scroll-mt-24">
                <div className="border-b border-slate-200 pb-3">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Step-by-Step Calculation Examples (2S, 2P, and 2S2P)
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  To ground these electrical principles in practical numbers, review the following worked examples based on a standard <strong>illustrative 200W benchmark module</strong>:
                </p>

                <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs sm:text-sm font-mono space-y-1">
                  <div className="text-slate-500 font-bold uppercase tracking-wider text-[11px]">Illustrative Benchmark Module Ratings (STC)</div>
                  <div>Pmp = 200W | Vmp = 20.4V | Imp = 9.80A | Voc = 24.3V | Isc = 10.20A</div>
                </div>

                <div className="space-y-4">
                  {/* Worked Example 1: 2S */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
                    <h3 className="text-base font-bold text-slate-900 flex items-center justify-between">
                      <span>Example 1: Two Modules in Series (2S)</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold">400W Array</span>
                    </h3>
                    <ul className="text-xs sm:text-sm text-slate-700 space-y-1 font-mono">
                      <li>• Array Vmp = 20.4V + 20.4V = <strong>40.8V</strong></li>
                      <li>• Array Imp = <strong>9.80A</strong> (constant)</li>
                      <li>• Array Voc = 24.3V × 2 = <strong>48.6V</strong></li>
                      <li>• Array Isc = <strong>10.20A</strong> (constant)</li>
                      <li>• Rated Peak Output = 40.8V × 9.80A ≈ <strong>400W</strong></li>
                    </ul>
                  </div>

                  {/* Worked Example 2: 2P */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
                    <h3 className="text-base font-bold text-slate-900 flex items-center justify-between">
                      <span>Example 2: Two Modules in Parallel (2P)</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-semibold">400W Array</span>
                    </h3>
                    <ul className="text-xs sm:text-sm text-slate-700 space-y-1 font-mono">
                      <li>• Array Vmp = <strong>20.4V</strong> (constant)</li>
                      <li>• Array Imp = 9.80A + 9.80A = <strong>19.60A</strong></li>
                      <li>• Array Voc = <strong>24.3V</strong> (constant)</li>
                      <li>• Array Isc = 10.20A × 2 = <strong>20.40A</strong></li>
                      <li>• Rated Peak Output = 20.4V × 19.60A ≈ <strong>400W</strong></li>
                    </ul>
                  </div>

                  {/* Worked Example 3: 2S2P */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
                    <h3 className="text-base font-bold text-slate-900 flex items-center justify-between">
                      <span>Example 3: Four Modules in Series-Parallel (2S2P)</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold">800W Array</span>
                    </h3>
                    <ul className="text-xs sm:text-sm text-slate-700 space-y-1 font-mono">
                      <li>• Array Vmp = 2 × 20.4V = <strong>40.8V</strong></li>
                      <li>• Array Imp = 2 × 9.80A = <strong>19.60A</strong></li>
                      <li>• Array Voc = 2 × 24.3V = <strong>48.6V</strong></li>
                      <li>• Array Isc = 2 × 10.20A = <strong>20.40A</strong></li>
                      <li>• Rated Peak Output = 40.8V × 19.60A ≈ <strong>800W</strong></li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* SECTION 13: Decision Guide */}
              <section id="decision-guide" className="space-y-6 scroll-mt-24">
                <div className="border-b border-slate-200 pb-3">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Decision Guide: Which Wiring Method Should You Choose?
                  </h2>
                </div>

                {/* AEO Direct-Answer Block 2 */}
                <div className="p-6 rounded-2xl bg-indigo-50/80 border border-indigo-200/90 space-y-3">
                  <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Should I wire my solar panels in series or parallel?</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                    Wiring configuration depends on your charge controller specifications, cable distances, and installation environment. <strong>Series wiring</strong> is generally preferred when using an MPPT charge controller or when running cables over longer distances, as higher voltage reduces resistive power losses and allows for smaller wire gauges. <strong>Parallel wiring</strong> is typically used with PWM charge controllers or when modules are subject to frequent, independent partial shading. For systems with four or more panels, a <strong>series-parallel</strong> arrangement can provide a balance between voltage and current limits.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Scenario A</span>
                    <h3 className="font-bold text-slate-900 text-sm">Off-Grid Cabins &amp; Homes</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Choose <strong>Series or Series-Parallel</strong> paired with a high-voltage MPPT controller. Long wire runs from ground mounts or roof arrays demand high voltage to keep resistive line losses below 2% without needing massive copper feeders.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Scenario B</span>
                    <h3 className="font-bold text-slate-900 text-sm">RVs &amp; Camper Vans</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Choose <strong>Parallel or 2S2P</strong>. Rooftop air conditioners, vents, and roof racks cause localized shading throughout the day. Short wire runs (under 15 ft) mean higher amperage can be handled safely with 8 or 10 AWG cable.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Scenario C</span>
                    <h3 className="font-bold text-slate-900 text-sm">Portable &amp; Camping Kits</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Choose <strong>Series</strong> if using a portable power station (solar generator) with an internal MPPT controller that accepts up to 50V or 150V, or <strong>Parallel</strong> if connecting to a basic 12V PWM battery maintainer.
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  For sizing battery banks to store your array output and estimating real-world appliance runtimes, see our guide on{" "}
                  <Link
                    href="/how-long-will-a-100ah-battery-last"
                    className="text-blue-600 hover:text-blue-800 font-semibold underline underline-offset-2"
                  >
                    how long will a 100Ah battery last
                  </Link>.
                </p>
              </section>

              {/* SECTION 14: Related Calculators */}
              <section id="related-calculators" className="space-y-6 scroll-mt-24">
                <div className="border-b border-slate-200 pb-3">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Related Power &amp; Energy Calculators
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link
                    href="/watts-to-amps-calculator"
                    className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-2"
                  >
                    <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                      <Cpu className="w-4 h-4" />
                      <span>Watts to Amps Electrical Calculator</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Calculate operating amperage from solar array wattage across DC, single-phase, and 3-phase circuits with NEC 125% continuous-load margins.
                    </p>
                  </Link>

                  <Link
                    href="/amps-to-watts-calculator"
                    className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-2"
                  >
                    <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                      <Zap className="w-4 h-4" />
                      <span>Amps to Watts Calculator</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Convert solar panel short-circuit current and circuit voltage into active power and apparent power.
                    </p>
                  </Link>

                  <Link
                    href="/solar-panel-tilt-calculator"
                    className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-2"
                  >
                    <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
                      <Sun className="w-4 h-4" />
                      <span>Solar Panel Tilt Angle Calculator</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Find optimal panel tilt angles and compass orientation for your latitude across annual, winter, and summer optimization targets.
                    </p>
                  </Link>

                  <Link
                    href="/battery-capacity-calculator"
                    className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-2"
                  >
                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                      <Calculator className="w-4 h-4" />
                      <span>Battery Capacity &amp; Sizing Calculator</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Size off-grid battery banks in Amp-hours and Watt-hours to store solar energy with depth of discharge benchmarks.
                    </p>
                  </Link>
                </div>
              </section>

              {/* SECTION 15: FAQ Accordion */}
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
            </article>

            {/* Desktop Sticky Sidebar (4 cols on lg) */}
            <aside className="hidden lg:block lg:col-span-4">
              <TableOfContents items={TOC_ITEMS} />
            </aside>
        </div>
      </div>
    </>
  );
}
