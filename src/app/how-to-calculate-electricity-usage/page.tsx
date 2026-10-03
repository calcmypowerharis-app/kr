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
  Activity,
  Layers,
  CheckCircle2,
  DollarSign,
  TrendingDown,
  Gauge,
  Sliders,
  Receipt,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Tv,
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
  title: "How to Calculate Electricity Usage: kWh, Watts & Appliance Energy",
  description:
    "Learn how to calculate electricity usage in kilowatt-hours (kWh) from appliance wattage and operating hours. See step-by-step formulas, worked examples, and cost estimates.",
  alternates: {
    canonical: "https://calcmypower.com/how-to-calculate-electricity-usage",
  },
  openGraph: {
    title:
      "How to Calculate Electricity Usage: kWh, Watts & Appliance Energy | CalcMyPower",
    description:
      "Learn how to calculate electricity usage in kilowatt-hours (kWh) from appliance wattage and operating hours. See step-by-step formulas, worked examples, and cost estimates.",
    url: "https://calcmypower.com/how-to-calculate-electricity-usage",
    type: "article",
    images: [
      {
        url: "https://calcmypower.com/images/articles/how-to-calculate-electricity-usage.webp",
        width: 1200,
        height: 675,
        alt: "Digital plug-in kilowatt-hour electricity usage monitor measuring power in Watts and cumulative energy on a kitchen countertop outlet.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "How to Calculate Electricity Usage: kWh, Watts & Appliance Energy | CalcMyPower",
    description:
      "Learn how to calculate electricity usage in kilowatt-hours (kWh) from appliance wattage and operating hours. See step-by-step formulas, worked examples, and cost estimates.",
    images: [
      "https://calcmypower.com/images/articles/how-to-calculate-electricity-usage.webp",
    ],
  },
};

const TOC_ITEMS: TocItem[] = [
  { id: "quick-answer", label: "Quick Answer: The Electricity Usage Formula" },
  { id: "core-formula", label: "The Core Electricity Calculation Explained" },
  { id: "watts-vs-kwh", label: "Watts vs. Watt-Hours vs. Kilowatt-Hours" },
  { id: "single-appliance", label: "How to Calculate Electricity Usage for One Appliance" },
  { id: "daily-usage", label: "Calculating Daily Household Electricity Usage" },
  { id: "monthly-usage", label: "Calculating Monthly Electricity Usage" },
  { id: "multiple-appliances", label: "Household Appliance Energy Audit Breakdown" },
  { id: "electricity-cost", label: "Estimating Electricity Cost from Kilowatt-Hours" },
  { id: "variable-loads", label: "Variable Loads, Cycling Compressors & Duty Cycles" },
  { id: "standby-power", label: "Phantom Loads and Standby Power Consumption" },
  { id: "measuring-tools", label: "How to Read Labels, Plug-In Monitors & Smart Meters" },
  { id: "common-mistakes", label: "Common Electricity Calculation Mistakes to Avoid" },
  { id: "interactive-tools", label: "When to Use an Interactive Electrical Calculator" },
  { id: "faq", label: "Frequently Asked Questions" },
];

const FAQ_DATA = [
  {
    question: "What is the formula to calculate electricity usage?",
    answer:
      "To calculate electricity usage in kilowatt-hours (kWh), multiply the appliance power in Watts by the operating time in hours, then divide by 1,000: Energy (kWh) = (Power in Watts × Time in Hours) ÷ 1,000. For example, a 150-watt device running for 6 hours consumes (150 × 6) ÷ 1,000 = 0.9 kWh.",
  },
  {
    question: "How do I calculate monthly electricity usage from wattage?",
    answer:
      "Multiply the appliance wattage by daily operating hours to find daily Watt-hours. Multiply that number by the days in the month (typically 30) and divide by 1,000: Monthly kWh = (Watts × Daily Hours × 30) ÷ 1,000. For instance, a 100-watt television used 5 hours daily consumes (100 × 5 × 30) ÷ 1,000 = 15 kWh per month.",
  },
  {
    question: "How do I estimate the electricity cost of running an appliance?",
    answer:
      "Multiply the total kilowatt-hours consumed by your electric utility rate in dollars per kilowatt-hour: Cost ($) = Energy (kWh) × Rate ($/kWh). If a space heater uses 180 kWh in a month and your energy rate is $0.16 per kWh, the estimated electricity charge is 180 × $0.16 = $28.80.",
  },
  {
    question: "What is the difference between kW and kWh?",
    answer:
      "Kilowatts (kW) measure power, which is the instantaneous rate at which electrical energy is consumed (1 kW = 1,000 Watts). Kilowatt-hours (kWh) measure energy, which is the cumulative volume of electricity delivered over time (1 kWh = 1 kW running for 1 full hour). Power is the speed of electricity flow, while energy is the total distance traveled.",
  },
  {
    question: "How do I calculate electricity usage if the appliance only lists Amps and Volts?",
    answer:
      "Multiply current in Amperes by potential in Volts to find nominal wattage: Watts = Volts × Amps. On standard 120V household branch circuits, a device labeled 2.5A draws roughly 120V × 2.5A = 300 Watts. You can then use the standard (Watts × Hours) ÷ 1,000 equation to determine kilowatt-hours.",
  },
  {
    question: "Why does multiplying rated wattage by hours overestimate refrigerator energy use?",
    answer:
      "Refrigerators and air conditioners are thermostatically controlled cycling loads. Their compressors only run when cooling is demanded, typically operating on a 30% to 50% duty cycle rather than 100% continuous duty. Multiplying maximum nameplate wattage by 24 hours assumes the compressor never shuts off, which overstates actual consumption by double or more.",
  },
];

export default function HowToCalculateElectricityUsagePage() {
  const articleSchema = generateArticleSchema({
    headline: "How to Calculate Electricity Usage: kWh, Watts & Appliance Energy",
    description:
      "Learn how to calculate electricity usage in kilowatt-hours (kWh) from appliance wattage and operating hours. See step-by-step formulas, worked examples, and cost estimates.",
    url: "https://calcmypower.com/how-to-calculate-electricity-usage",
    datePublished: "2026-10-03",
    dateModified: "2026-10-03",
    images: [
      "https://calcmypower.com/images/articles/how-to-calculate-electricity-usage.webp",
    ],
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Guides", url: "https://calcmypower.com/calculators" },
    {
      name: "How to Calculate Electricity Usage",
      url: "https://calcmypower.com/how-to-calculate-electricity-usage",
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
            How to Calculate Electricity Usage
          </span>
        </nav>

        {/* Article Layout Grid: Content DOM First / Left (8 cols), Aside DOM Second / Right (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Content Column */}
          <article
            id="article-content"
            className="lg:col-span-8 space-y-10 text-slate-700 leading-relaxed text-base md:text-lg"
          >
            {/* Article Header */}
            <header className="space-y-4 border-b border-slate-200 pb-8">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 font-semibold">
                  Home Electrical &amp; Energy Guide
                </span>
                <span className="text-slate-400">•</span>
                <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>13 min read</span>
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500">Published October 2026</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                How to Calculate Electricity Usage
              </h1>

              <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-normal">
                Master the fundamental formulas for calculating electrical energy consumption. Learn how to convert rated Watts into kilowatt-hours (kWh), account for operating schedules, estimate monthly utility charges, and avoid common estimation pitfalls.
              </p>
            </header>

            {/* Hero Image */}
            <div className="space-y-3">
              <ZoomableArticleImage
                src="/images/articles/how-to-calculate-electricity-usage.webp"
                alt="Digital plug-in kilowatt-hour electricity usage monitor measuring power in Watts and cumulative energy on a kitchen countertop outlet"
                title="Electricity Usage Monitor"
                caption="Figure 1: A plug-in electricity usage monitor measuring real-time power in Watts and cumulative energy in kilowatt-hours (kWh) on a standard 120V household outlet."
              >
                <Image
                  src="/images/articles/how-to-calculate-electricity-usage.webp"
                  alt="Digital plug-in kilowatt-hour electricity usage monitor measuring power in Watts and cumulative energy on a kitchen countertop outlet"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                />
              </ZoomableArticleImage>
            </div>

            {/* Section 1: Quick Answer */}
            <section id="quick-answer" className="space-y-4 scroll-mt-24">
              <div className="p-6 bg-blue-50/70 border border-blue-200/90 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-base sm:text-lg">
                  <Zap className="w-5 h-5 text-blue-700 shrink-0" />
                  <h2>Quick Answer: The Electricity Usage Formula</h2>
                </div>
                <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
                  To calculate the electricity usage of any electrical device, multiply its power draw in <strong>Watts (W)</strong> by the time it runs in <strong>hours (h)</strong>, then divide by <strong>1,000</strong> to convert the total into <strong>kilowatt-hours (kWh)</strong>:
                </p>
                <div className="p-4 bg-white border border-blue-200 rounded-xl font-mono text-center text-sm sm:text-base text-blue-900 font-bold shadow-xs">
                  Energy (kWh) = [Power (Watts) × Time (Hours)] ÷ 1,000
                </div>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                  For example, a 100-watt television running for 5 hours per day consumes:
                  <br />
                  <span className="font-mono font-semibold text-slate-900">
                    (100 W × 5 h) ÷ 1,000 = 0.5 kWh per day
                  </span>
                  . Over a 30-day billing cycle, that equals{" "}
                  <span className="font-mono font-semibold text-slate-900">15 kWh per month</span>. At an illustrative electricity rate of $0.16 per kWh, running that television costs approximately $2.40 per month.
                </p>
                <div className="pt-2">
                  <Link
                    href="/electricity-use-calculator"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm shadow-xs transition"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>Calculate Your Appliances with the Electricity Use Calculator</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* Section 2: Core Formula Explained */}
            <section id="core-formula" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                The Core Electricity Calculation Explained
              </h2>
              <p>
                Electricity bills are not charged based on how fast appliances consume electricity; they are charged based on the cumulative volume of electrical energy consumed over a billing cycle. To understand energy calculations, you must separate <strong>power</strong> from <strong>energy</strong>.
              </p>
              <p>
                In physics and electrical engineering, power is the instantaneous rate of energy transfer, measured in Watts (W) or kilowatts (kW). Energy is the total work accomplished over a duration, measured in Watt-hours (Wh) or kilowatt-hours (kWh). One kilowatt-hour represents 1,000 Watts of electrical power delivered continuously for one hour.
              </p>

              {/* Equation Box */}
              <div className="p-5 bg-slate-900 text-slate-100 rounded-2xl space-y-4 font-mono text-sm sm:text-base border border-slate-800 shadow-md">
                <div className="text-xs uppercase tracking-wider text-emerald-400 font-bold">
                  Governing Equations
                </div>
                <div className="space-y-2">
                  <div className="text-white font-semibold">
                    1. Energy in Watt-hours:
                    <span className="text-emerald-400 block sm:inline sm:ml-2">
                      Wh = Power (Watts) × Time (Hours)
                    </span>
                  </div>
                  <div className="text-white font-semibold">
                    2. Energy in Kilowatt-hours:
                    <span className="text-emerald-400 block sm:inline sm:ml-2">
                      kWh = Wh ÷ 1,000
                    </span>
                  </div>
                  <div className="text-white font-semibold">
                    3. Monthly Consumption:
                    <span className="text-emerald-400 block sm:inline sm:ml-2">
                      Monthly kWh = (Watts × Daily Hours × Days per Month) ÷ 1,000
                    </span>
                  </div>
                  <div className="text-white font-semibold">
                    4. Volumetric Energy Cost:
                    <span className="text-emerald-400 block sm:inline sm:ml-2">
                      Cost ($) = Total kWh × Rate ($/kWh)
                    </span>
                  </div>
                </div>
              </div>

              <p>
                Because electric utilities bill customers in kilowatt-hours rather than Watt-hours, dividing by 1,000 is a mandatory step in household calculations. If you omit this division, your result remains in raw Watt-hours, which overstates your energy figures by a factor of one thousand.
              </p>
            </section>

            {/* Section 3: Watts vs. Watt-Hours vs. Kilowatt-Hours */}
            <section id="watts-vs-kwh" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Watts vs. Watt-Hours vs. Kilowatt-Hours
              </h2>
              <p>
                Conflating power with energy is the single most common mistake in home energy estimation. An automotive comparison helps clarify the distinction:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-xs">
                  <div className="text-xs uppercase tracking-wider font-bold text-blue-600">
                    Power (Rate)
                  </div>
                  <div className="font-bold text-slate-900 text-lg">Watts (W) &amp; kW</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Analogous to a car&apos;s speedometer (miles per hour). It tells you how fast electricity is flowing into the machine right now. 1 kW = 1,000 Watts.
                  </p>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-xs">
                  <div className="text-xs uppercase tracking-wider font-bold text-emerald-600">
                    Energy (Volume)
                  </div>
                  <div className="font-bold text-slate-900 text-lg">Watt-Hours (Wh)</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Analogous to an odometer (miles driven). It measures the cumulative volume of electricity consumed over time. 1 Wh = 1 Watt drawn for 1 hour.
                  </p>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-xs">
                  <div className="text-xs uppercase tracking-wider font-bold text-purple-600">
                    Billing Unit
                  </div>
                  <div className="font-bold text-slate-900 text-lg">Kilowatt-Hours (kWh)</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Standard utility billing quantity. 1 kWh = 1,000 Watt-hours. Running a 1,000W microwave for one hour consumes exactly 1 kWh of electricity.
                  </p>
                </div>
              </div>

              <p>
                If you leave a 100-watt light bulb turned on for 10 hours, it consumes 1,000 Watt-hours (1 kWh). If you run a 1,000-watt space heater for 1 hour, it also consumes exactly 1,000 Watt-hours (1 kWh). Both scenarios result in identical energy use on your utility bill, even though the heater demanded ten times more instantaneous power from the electrical wiring. For a comprehensive look at the physical definitions of electrical work, read our companion guide on{" "}
                <Link
                  href="/what-is-a-watt-hour"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  what a Watt-hour is and how energy relates to power
                </Link>.
              </p>
            </section>

            {/* Section 4: Calculating One Appliance */}
            <section id="single-appliance" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                How to Calculate Electricity Usage for One Appliance
              </h2>
              <p>
                To calculate the electricity consumption of a single household device, follow a simple three-step process: find the wattage, estimate daily run time, and apply the formula.
              </p>

              {/* Step by step cards */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-base">
                      Locate the Device Power Rating (Watts)
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Inspect the manufacturer nameplate or electrical specification sticker on the back or bottom of the device. If the label lists Watts (W), use that number. If the label only lists Volts (V) and Amps (A), multiply Volts by Amps to find nominal Watts. For example, a 120V blender drawing 4 Amps has a nominal rating of 480 Watts (120 × 4 = 480W). If you need to convert current to wattage across single-phase or three-phase systems, use our{" "}
                      <Link
                        href="/amps-to-watts-calculator"
                        className="text-blue-600 hover:underline font-semibold"
                      >
                        Amps to Watts Calculator
                      </Link>.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-base">
                      Estimate Operating Hours per Day
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Determine how many hours the appliance actively operates during a typical 24-hour day. If a device operates in minutes (such as a 15-minute microwave run or a 45-minute dishwasher cycle), convert minutes into decimal hours by dividing by 60 (for example, 15 minutes ÷ 60 = 0.25 hours).
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-base">
                      Multiply and Divide by 1,000
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Multiply the appliance Watts by daily hours, then divide by 1,000 to obtain daily kilowatt-hours (kWh).
                    </p>
                  </div>
                </div>
              </div>

              {/* Worked Examples 1 and 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-xs">
                  <span className="text-xs uppercase font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    Worked Example 1: 100W Appliance
                  </span>
                  <div className="font-semibold text-slate-900 text-sm pt-1">
                    100-Watt Load Run for 8 Hours Daily
                  </div>
                  <div className="font-mono text-xs bg-slate-900 text-emerald-400 p-2.5 rounded-lg space-y-1">
                    <div>Daily Wh = 100 W × 8 h = 800 Wh</div>
                    <div>Daily kWh = 800 ÷ 1,000 = 0.8 kWh</div>
                    <div>Monthly kWh = 0.8 × 30 = 24.0 kWh</div>
                  </div>
                  <p className="text-xs text-slate-600">
                    Typical of an entertainment console, desktop computer setup, or a group of bright room lighting fixtures.
                  </p>
                </div>

                <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-xs">
                  <span className="text-xs uppercase font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    Worked Example 2: 1,500W Appliance
                  </span>
                  <div className="font-semibold text-slate-900 text-sm pt-1">
                    1,500-Watt Portable Space Heater Run 4 Hours
                  </div>
                  <div className="font-mono text-xs bg-slate-900 text-emerald-400 p-2.5 rounded-lg space-y-1">
                    <div>Daily Wh = 1,500 W × 4 h = 6,000 Wh</div>
                    <div>Daily kWh = 6,000 ÷ 1,000 = 6.0 kWh</div>
                    <div>Monthly kWh = 6.0 × 30 = 180.0 kWh</div>
                  </div>
                  <p className="text-xs text-slate-600">
                    High-draw thermal resistance load showing how heating elements rapidly generate substantial kilowatt-hour totals.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: Daily Usage */}
            <section id="daily-usage" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                How to Calculate Daily Electricity Usage
              </h2>
              <p>
                Calculating daily electricity use provides the foundation for sizing emergency battery backup banks, designing off-grid solar systems, and diagnosing sudden spikes in utility bills.
              </p>
              <p>
                To calculate total daily household consumption, sum the individual daily kilowatt-hour figures of all active devices:
              </p>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-center text-sm sm:text-base text-slate-900 font-bold">
                Total Daily Energy (kWh) = kWh(Device 1) + kWh(Device 2) + ... + kWh(Device N)
              </div>
              <p>
                According to the U.S. Energy Information Administration (EIA), the average American residential utility customer consumed approximately 10,500 kWh of electricity per year in recent historical benchmarks (2022 to 2023 data). Dividing 10,500 kWh by 365 days yields an average daily household consumption of roughly <strong>28.8 to 29.5 kWh per day</strong>.
              </p>
              <p>
                However, daily consumption is heavily seasonal. In summer months with central air conditioning running, or in winter months in homes utilizing resistance space heating or heat pumps, daily consumption often surges past 45 to 60 kWh per day. In mild spring and fall shoulder months, consumption can drop to 12 to 18 kWh per day.
              </p>
            </section>

            {/* Section 6: Monthly Usage */}
            <section id="monthly-usage" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                How to Calculate Monthly Electricity Usage
              </h2>
              <p>
                Utility companies bill customers on monthly meter reading cycles, which typically span 28 to 33 days depending on calendar months and meter-reading schedules. For standard planning, 30 days is the universal baseline.
              </p>

              {/* Worked Example 3: Variable Schedule */}
              <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-3 shadow-xs">
                <span className="text-xs uppercase font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                  Worked Example 3: Intermittent Weekly Appliance Schedule
                </span>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Many appliances are not used every single day. Consider a clothes washing machine rated at 500 Watts that runs for 45 minutes (0.75 hours) per load, used 5 times per week:
                </p>
                <div className="font-mono text-xs sm:text-sm bg-slate-900 text-emerald-400 p-3 rounded-lg space-y-1">
                  <div>Energy per load: 500 W × 0.75 h = 375 Wh = 0.375 kWh</div>
                  <div>Weekly usage: 0.375 kWh × 5 loads = 1.875 kWh per week</div>
                  <div>Monthly usage (4.33 weeks): 1.875 × 4.33 = 8.12 kWh per month</div>
                </div>
                <p className="text-xs text-slate-600">
                  Converting intermittent weekly tasks to monthly totals provides a far more accurate energy profile than assuming uniform daily operation.
                </p>
              </div>

              <p>
                If you have access to your utility bills, you can compare your calculated bottom-up monthly estimate against your actual metered kWh history. If your bottom-up estimate is significantly lower than your utility bill, the difference is almost always driven by heating, ventilation, and air conditioning (HVAC) cycling, electric water heating, or unmeasured standby power.
              </p>
            </section>

            {/* Section 7: Multiple Appliances (Home Energy Audit Breakdown) */}
            <section id="multiple-appliances" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Household Appliance Energy Audit Breakdown
              </h2>
              <p>
                To see how individual appliances aggregate into a monthly utility bill, review this illustrative whole-house appliance audit. Assumptions are explicitly stated for each category.
              </p>

              {/* Appliance Audit Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Appliance Category</th>
                        <th className="p-3">Rated Power</th>
                        <th className="p-3">Estimated Run Time</th>
                        <th className="p-3">Daily Energy (kWh)</th>
                        <th className="p-3">Monthly Energy (kWh)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      <tr>
                        <td className="p-3 font-medium text-slate-900">
                          Central AC / Heat Pump
                        </td>
                        <td className="p-3">3,500 W</td>
                        <td className="p-3">6.0 hrs/day (cycling)</td>
                        <td className="p-3 font-mono font-semibold">21.00 kWh</td>
                        <td className="p-3 font-mono font-semibold">630.0 kWh</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-slate-900">
                          Electric Water Heater
                        </td>
                        <td className="p-3">4,500 W</td>
                        <td className="p-3">2.5 hrs/day (heating)</td>
                        <td className="p-3 font-mono font-semibold">11.25 kWh</td>
                        <td className="p-3 font-mono font-semibold">337.5 kWh</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-slate-900">
                          Refrigerator / Freezer
                        </td>
                        <td className="p-3">150 W</td>
                        <td className="p-3">8.4 hrs/day (35% duty)</td>
                        <td className="p-3 font-mono font-semibold">1.26 kWh</td>
                        <td className="p-3 font-mono font-semibold">37.8 kWh</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-slate-900">
                          LED Lighting (10 fixtures)
                        </td>
                        <td className="p-3">100 W total</td>
                        <td className="p-3">5.0 hrs/day</td>
                        <td className="p-3 font-mono font-semibold">0.50 kWh</td>
                        <td className="p-3 font-mono font-semibold">15.0 kWh</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-slate-900">
                          Living Room Television
                        </td>
                        <td className="p-3">90 W</td>
                        <td className="p-3">4.0 hrs/day</td>
                        <td className="p-3 font-mono font-semibold">0.36 kWh</td>
                        <td className="p-3 font-mono font-semibold">10.8 kWh</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-slate-900">
                          Desktop / Laptop Computer
                        </td>
                        <td className="p-3">60 W avg</td>
                        <td className="p-3">8.0 hrs/day</td>
                        <td className="p-3 font-mono font-semibold">0.48 kWh</td>
                        <td className="p-3 font-mono font-semibold">14.4 kWh</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-slate-900">
                          Microwave Oven
                        </td>
                        <td className="p-3">1,200 W</td>
                        <td className="p-3">0.25 hrs/day (15 min)</td>
                        <td className="p-3 font-mono font-semibold">0.30 kWh</td>
                        <td className="p-3 font-mono font-semibold">9.0 kWh</td>
                      </tr>
                      <tr className="bg-slate-50 font-bold text-slate-900">
                        <td className="p-3" colSpan={3}>
                          Total Illustrative Household Consumption
                        </td>
                        <td className="p-3 font-mono text-blue-700 font-bold">
                          35.15 kWh/day
                        </td>
                        <td className="p-3 font-mono text-blue-700 font-bold">
                          1,054.5 kWh/mo
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <p className="text-xs text-slate-500 italic">
                Note: This breakdown represents an illustrative summer planning model for a home with central cooling and electric water heating. Individual household totals vary significantly based on climate zone, family size, home insulation, and equipment age.
              </p>
            </section>

            {/* Section 8: Electricity Cost */}
            <section id="electricity-cost" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Estimating Electricity Cost from Kilowatt-Hours
              </h2>
              <p>
                Once you calculate kilowatt-hours, you can estimate the financial cost of running appliances. However, utility billing structure requires careful discipline: an electricity bill is rarely calculated by simply multiplying total kWh by one flat number.
              </p>

              {/* Billing Formula and Anatomy */}
              <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-3 shadow-xs">
                <span className="text-xs uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  The Volumetric Energy Charge Formula
                </span>
                <div className="font-mono text-center p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm sm:text-base font-bold text-slate-900">
                  Estimated Energy Charge ($) = Energy Consumed (kWh) × Rate ($/kWh)
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  For example, if your appliance audit indicates that your electric water heater consumes <strong>337.5 kWh</strong> per month, and your electric utility charges a volumetric energy rate of <strong>$0.16 per kWh</strong>:
                </p>
                <div className="font-mono text-xs sm:text-sm bg-slate-900 text-emerald-400 p-3 rounded-lg text-center font-semibold">
                  337.5 kWh × $0.16/kWh = $54.00 per month
                </div>
              </div>

              {/* Worked Example 5: Whole Bill Anatomy */}
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <Receipt className="w-5 h-5 text-slate-700 shrink-0" />
                  <h3>Worked Example 5: Anatomy of a Real Utility Bill</h3>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  An actual electric bill is composed of several distinct fee categories beyond basic kilowatt-hour consumption. Below is an illustrative breakdown for a customer consuming <strong>1,000 kWh</strong> in a billing month:
                </p>
                <div className="bg-white border border-slate-200 rounded-xl p-4 text-xs sm:text-sm space-y-2 font-mono">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-600">Base Energy Charge (1,000 kWh × $0.12/kWh):</span>
                    <span className="font-bold text-slate-900">$120.00</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-600">Delivery &amp; Transmission Rider (1,000 kWh × $0.04/kWh):</span>
                    <span className="font-bold text-slate-900">$40.00</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-600">Fixed Monthly Customer Service Fee (Grid Access):</span>
                    <span className="font-bold text-slate-900">$15.00</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-600">Local Environmental &amp; Franchise Taxes:</span>
                    <span className="font-bold text-slate-900">$8.50</span>
                  </div>
                  <div className="flex justify-between pt-2 text-sm font-bold text-blue-900 border-t border-slate-200">
                    <span>Total Monthly Electric Bill:</span>
                    <span>$183.50</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-sans pt-1">
                    Effective overall electricity cost = $183.50 ÷ 1,000 kWh = <strong>$0.1835 per kWh</strong>.
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Notice that the fixed customer fee ($15.00) does not change whether you use 100 kWh or 2,000 kWh. Furthermore, many utilities employ <strong>tiered rates</strong> (where energy beyond 1,000 kWh is billed at a higher bracket) or <strong>Time-of-Use (TOU) rates</strong> (where on-peak afternoon electricity costs substantially more than off-peak overnight power). Check your recent electric bill to determine your exact rate structure.
                </p>
              </div>
            </section>

            {/* Section 9: Variable Loads & Duty Cycles */}
            <section id="variable-loads" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                What If an Appliance Does Not Run at Full Power?
              </h2>
              <p>
                The simple formula <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-semibold">Watts × Hours</code> works accurately for continuous, steady-state resistive loads like space heaters, incandescent incandescent lamps, and electric kettles. However, many of the largest energy consumers in a home are <strong>variable or cycling loads</strong>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-xs">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
                    <Activity className="w-4 h-4 text-amber-600" />
                    <span>Thermostatically Controlled Cycling</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Refrigerators, freezers, air conditioners, and heat pumps do not run continuously. Their internal compressors cycle on when cooling is needed and switch completely off once the target temperature is reached. A refrigerator rated at 150 Watts might only cycle on for 20 minutes out of every hour (a 33% duty cycle), consuming an average of roughly 50 Watts over time.
                  </p>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-xs">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
                    <Sliders className="w-4 h-4 text-blue-600" />
                    <span>Inverter &amp; Variable-Speed Motors</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Modern high-efficiency heat pumps, variable-speed pool pumps, and inverter washing machines modulate their motor speed based on demand. A 3-ton variable-speed heat pump might draw 3,500 Watts during extreme temperature peaks, but modulate down to 800 Watts during mild maintenance hours.
                  </p>
                </div>
              </div>

              <p>
                To calculate energy for cycling equipment without a physical meter, you must apply an estimated <strong>duty cycle</strong> (the percentage of time the compressor or heating element is active):
              </p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg font-mono text-center text-xs sm:text-sm font-bold text-slate-900">
                Effective Daily kWh = [Rated Watts × (24 Hours × Duty Cycle %)] ÷ 1,000
              </div>
              <p>
                For example, a 180-watt chest freezer operating at a 40% duty cycle runs actively for 9.6 hours per day (24 × 0.40). Its daily energy consumption is (180 W × 9.6 h) ÷ 1,000 = <strong>1.73 kWh per day</strong>. If you instead multiplied 180W by 24 hours, you would calculate 4.32 kWh per day, overestimating its energy consumption by 250%.
              </p>
            </section>

            {/* Section 10: Standby Power & Phantom Loads */}
            <section id="standby-power" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Phantom Loads and Standby Electricity Consumption
              </h2>
              <p>
                Many modern consumer electronics never truly shut off. Instead, they drop into a low-power standby mode to power internal clocks, Wi-Fi receivers, remote control sensors, and standby circuitry. This continuous draw is referred to as <strong>phantom load</strong>, vampire draw, or standby power.
              </p>
              <p>
                While a single device drawing 5 Watts in standby seems negligible, multiplying that draw across 24 hours a day and 365 days a year reveals meaningful energy:
              </p>
              <div className="font-mono text-xs sm:text-sm bg-slate-900 text-emerald-400 p-3 rounded-lg text-center font-semibold">
                5 Watts × 24 hours × 365 days ÷ 1,000 = 43.8 kWh per year
              </div>
              <p>
                In a home with 20 to 30 electronic devices (such as smart TVs, game consoles, audio receivers, cable set-top boxes, smart speakers, microwave clocks, and computer peripherals), continuous standby power can easily total 80 to 120 Watts across the entire home. That equates to <strong>700 to 1,050 kWh per year</strong>, simply maintaining idle electronics.
              </p>
            </section>

            {/* Section 11: Measuring Tools */}
            <section id="measuring-tools" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                How to Use Appliance Labels, Monitors &amp; Smart Meters
              </h2>
              <p>
                When manual estimates are uncertain because of duty cycles or modulated motor speeds, three measurement tools provide higher accuracy:
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-xs">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center">
                      1
                    </span>
                    The FTC EnergyGuide Label
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Major appliances sold in the United States (refrigerators, freezers, dishwashers, clothes washers, and water heaters) feature a bright yellow <strong>EnergyGuide</strong> label. This label publishes an estimated annual electricity consumption figure in <strong>kWh/year</strong> based on standardized U.S. Department of Energy testing procedures. Dividing the label&apos;s annual kWh by 12 yields an immediate, reliable monthly estimate that already accounts for typical cycling.
                  </p>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-xs">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center">
                      2
                    </span>
                    Plug-In Electricity Monitors
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    A plug-in digital wattmeter or energy monitor (such as the unit shown in our photo above) plugs directly into a standard 120V household wall receptacle. By plugging an appliance into the monitor and leaving it running for 24 to 72 hours, the device measures actual cumulative kilowatt-hours, capturing both active running power and idle standby draw under real-world household conditions.
                  </p>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-xs">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center">
                      3
                    </span>
                    Utility Smart Meters &amp; Green Button Data
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Most modern U.S. electric utilities have deployed digital smart meters (Advanced Metering Infrastructure). Through your online utility customer portal, you can often download interval data (15-minute or hourly kilowatt-hour readings) via the standardized Green Button format. This data allows you to track household energy spikes in real time when appliances cycle on.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 12: Common Mistakes */}
            <section id="common-mistakes" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Common Electricity Usage Calculation Mistakes
              </h2>
              <p>
                Avoid these frequent mathematical and conceptual traps when estimating appliance power consumption:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm space-y-1">
                  <span className="font-bold text-amber-900 text-sm block">
                    1. Forgetting to Divide by 1,000
                  </span>
                  <p className="text-amber-800 leading-relaxed">
                    Multiplying 500 Watts by 4 hours gives 2,000 Watt-hours. If you multiply 2,000 by a $0.16/kWh rate without dividing by 1,000, you will incorrectly calculate a daily cost of $320 instead of the real cost of $0.32. Always ensure your energy total is in kilowatt-hours before applying electricity rates.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm space-y-1">
                  <span className="font-bold text-amber-900 text-sm block">
                    2. Confusing Maximum Nameplate Amps with Continuous Load
                  </span>
                  <p className="text-amber-800 leading-relaxed">
                    An appliance label rating reflects its maximum designed input current under worst-case laboratory conditions, not its average draw. A desktop computer with an 850W power supply rarely draws more than 150 to 250 Watts during normal office tasks.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm space-y-1">
                  <span className="font-bold text-amber-900 text-sm block">
                    3. Ignoring Electric Water Heaters and HVAC
                  </span>
                  <p className="text-amber-800 leading-relaxed">
                    Homeowners often focus intensely on turning off 9-watt LED light bulbs or unplugging phone chargers while ignoring 4,500-watt electric water heaters and 3,500-watt air conditioners. In typical all-electric American homes, thermal conditioning and water heating account for over 50% to 65% of total annual kilowatt-hour consumption.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm space-y-1">
                  <span className="font-bold text-amber-900 text-sm block">
                    4. Confusing Energy Sizing with Electrical Circuit Sizing
                  </span>
                  <p className="text-amber-800 leading-relaxed">
                    Calculating cumulative kilowatt-hours determines your energy bill and battery capacity requirements, but it does <strong>not</strong> size circuit breakers or wire gauges. Electrical safety standards require sizing circuit conductors and breakers based on peak amperage and continuous load rules (such as the 125% factor under NEC Article 210), not average energy use.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 13: Interactive Tools */}
            <section id="interactive-tools" className="space-y-4 scroll-mt-24">
              <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-lg border border-blue-800">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-300">
                  <Calculator className="w-4 h-4 text-emerald-400" />
                  <span>Free Engineering Calculators</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  When to Use an Interactive Calculator
                </h2>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                  Manual math works well for quick single-device estimates. However, when you need to convert between Amps and Watts, account for AC power factor, size battery storage banks, or calculate how many solar panels are needed to offset your monthly kWh, dedicated engineering tools eliminate arithmetic errors.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <Link
                    href="/electricity-use-calculator"
                    className="p-4 rounded-xl bg-blue-800/80 hover:bg-blue-750 text-slate-200 transition border border-blue-500/50 block group sm:col-span-2 shadow-sm"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-emerald-300 mb-1">
                      <span>Interactive Appliance Calculator</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                    </div>
                    <div className="font-bold text-white text-base">Electricity Use Calculator</div>
                    <p className="text-xs text-slate-300 mt-1">
                      Calculate daily and monthly energy consumption in Wh and kWh across multiple household appliances with duty cycles and utility cost estimates.
                    </p>
                  </Link>

                  <Link
                    href="/watts-to-amps-calculator"
                    className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition border border-slate-700 block group"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-blue-400 mb-1">
                      <span>Circuit Sizing</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                    </div>
                    <div className="font-bold text-white text-sm">Watts to Amps Calculator</div>
                    <p className="text-xs text-slate-400 mt-1">
                      Convert appliance wattage to circuit current across DC, 120V/240V single-phase, and 3-phase.
                    </p>
                  </Link>

                  <Link
                    href="/amps-to-watts-calculator"
                    className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition border border-slate-700 block group"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-blue-400 mb-1">
                      <span>Power Conversion</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                    </div>
                    <div className="font-bold text-white text-sm">Amps to Watts Calculator</div>
                    <p className="text-xs text-slate-400 mt-1">
                      Find true active power (Watts) and apparent demand (VA) from nameplate current.
                    </p>
                  </Link>

                  <Link
                    href="/solar-system-size-calculator"
                    className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition border border-slate-700 block group"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-emerald-400 mb-1">
                      <span>Solar PV Sizing</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                    </div>
                    <div className="font-bold text-white text-sm">Solar System Size Calculator</div>
                    <p className="text-xs text-slate-400 mt-1">
                      Enter your monthly electricity usage to determine the required solar array kW and panel count.
                    </p>
                  </Link>

                  <Link
                    href="/battery-capacity-calculator"
                    className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition border border-slate-700 block group"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-purple-400 mb-1">
                      <span>Energy Storage</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                    </div>
                    <div className="font-bold text-white text-sm">Battery Capacity Calculator</div>
                    <p className="text-xs text-slate-400 mt-1">
                      Size lithium and lead-acid battery banks in Amp-hours and Watt-hours for daily appliance loads.
                    </p>
                  </Link>
                </div>

                <div className="pt-2">
                  <Link
                    href="/calculators"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-blue-300 hover:text-white transition"
                  >
                    <span>Browse all interactive power and electrical tools</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* Section 14: FAQ */}
            <section id="faq" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    Frequently Asked Questions
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Practical answers to common questions about calculating appliance energy, kilowatt-hours, and electricity bills.
                </p>
              </div>

              <div className="space-y-3">
                {FAQ_DATA.map((faq, idx) => (
                  <details
                    key={idx}
                    open={idx === 0}
                    className="group border border-slate-200 rounded-xl overflow-hidden transition-colors"
                  >
                    <summary className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 bg-white hover:bg-slate-50 transition cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                      <h3 className="font-semibold text-sm sm:text-base text-slate-900">
                        {faq.question}
                      </h3>
                      <span className="text-slate-400 group-open:rotate-180 transition-transform duration-200 shrink-0">
                        ▾
                      </span>
                    </summary>
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50 pt-3">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Electrical Safety Disclaimer */}
            <section className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-2.5 mb-3 text-amber-900">
                <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0" />
                <h2 className="text-base md:text-lg font-bold">
                  Electrical Safety &amp; Planning Disclaimer
                </h2>
              </div>
              <ul className="list-disc list-inside space-y-2 text-xs md:text-sm text-amber-900/90 leading-relaxed">
                <li>
                  This guide provides mathematical formulas and illustrative calculations for educational, energy planning, and budgeting purposes only.
                </li>
                <li>
                  Actual appliance energy consumption varies depending on ambient temperature, operational settings, duty cycle, manufacturer tolerances, and mechanical condition.
                </li>
                <li>
                  Energy consumption calculations (kWh) must never be substituted for branch circuit sizing, overcurrent protection sizing, or electrical conductor selection under the National Electrical Code (NEC).
                </li>
                <li>
                  Always consult a licensed electrician or qualified electrical engineer before modifying home wiring, installing subpanels, or connecting high-draw electrical equipment.
                </li>
              </ul>
            </section>
          </article>

          {/* Sidebar Column (Desktop ASIDE DOM SECOND / RIGHT - 4 cols on lg) */}
          <aside className="hidden lg:block lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              {/* Table of Contents */}
              <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
                <div className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-3">
                  In This Article
                </div>
                <TableOfContents items={TOC_ITEMS} />
              </div>

              {/* Calculator Callout Box */}
              <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                  <Calculator className="w-4 h-4 text-blue-600" />
                  <span>Related Sizing Tools</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Turn your calculated electricity consumption into practical equipment sizing with our interactive tools:
                </p>
                <div className="space-y-2 text-xs font-semibold">
                  <Link
                    href="/watts-to-amps-calculator"
                    className="block p-2 rounded-lg bg-white border border-blue-200 hover:border-blue-400 text-blue-700 transition"
                  >
                    Watts to Amps Calculator →
                  </Link>
                  <Link
                    href="/amps-to-watts-calculator"
                    className="block p-2 rounded-lg bg-white border border-blue-200 hover:border-blue-400 text-blue-700 transition"
                  >
                    Amps to Watts Calculator →
                  </Link>
                  <Link
                    href="/solar-system-size-calculator"
                    className="block p-2 rounded-lg bg-white border border-blue-200 hover:border-blue-400 text-blue-700 transition"
                  >
                    Solar System Size Calculator →
                  </Link>
                  <Link
                    href="/battery-capacity-calculator"
                    className="block p-2 rounded-lg bg-white border border-blue-200 hover:border-blue-400 text-blue-700 transition"
                  >
                    Battery Capacity Sizing →
                  </Link>
                  <Link
                    href="/three-phase-power-calculator"
                    className="block p-2 rounded-lg bg-white border border-blue-200 hover:border-blue-400 text-blue-700 transition"
                  >
                    Three-Phase Power Calculator →
                  </Link>
                </div>
              </div>

              {/* Related Reading Guide Links */}
              <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3">
                <div className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                  Related Reading
                </div>
                <div className="space-y-2 text-xs">
                  <Link
                    href="/what-is-a-watt-hour"
                    className="block text-slate-700 hover:text-blue-600 font-medium transition"
                  >
                    What Is a Watt-Hour? Watts vs. Watt-Hours Explained
                  </Link>
                  <Link
                    href="/how-much-energy-does-a-solar-panel-produce"
                    className="block text-slate-700 hover:text-blue-600 font-medium transition"
                  >
                    How Much Energy Does a Solar Panel Produce?
                  </Link>
                  <Link
                    href="/how-many-solar-panels-do-i-need"
                    className="block text-slate-700 hover:text-blue-600 font-medium transition"
                  >
                    How Many Solar Panels Do I Need to Power My House?
                  </Link>
                  <Link
                    href="/solar-panels-series-vs-parallel"
                    className="block text-slate-700 hover:text-blue-600 font-medium transition"
                  >
                    Solar Panels in Series vs. Parallel
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
