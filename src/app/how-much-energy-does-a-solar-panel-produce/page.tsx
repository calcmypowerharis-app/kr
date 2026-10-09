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
  Compass,
  Maximize2,
  Activity,
  Layers,
  Thermometer,
  CloudSun,
  BatteryCharging,
  Gauge,
  Sliders,
  CheckCircle2,
  TrendingDown,
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
  title: "How Much Energy Does a Solar Panel Produce? 400W Panel Examples",
  description:
    "Learn how much electricity a solar panel can produce per day and month. See 400W panel examples, peak sun hours, system losses, and the factors that affect solar output.",
  alternates: {
    canonical: "https://calcmypower.com/how-much-energy-does-a-solar-panel-produce",
  },
  openGraph: {
    title:
      "How Much Energy Does a Solar Panel Produce? 400W Panel Examples | CalcMyPower",
    description:
      "Learn how much electricity a solar panel can produce per day and month. See 400W panel examples, peak sun hours, system losses, and the factors that affect solar output.",
    url: "https://calcmypower.com/how-much-energy-does-a-solar-panel-produce",
    type: "article",
    publishedTime: "2026-10-01T00:00:00Z",
    modifiedTime: "2026-10-01T00:00:00Z",
    images: [
      {
        url: "https://calcmypower.com/images/articles/how-much-energy-does-a-solar-panel-produce.webp",
        width: 1200,
        height: 675,
        alt: "Technician measuring solar irradiance and energy production on a 400-watt rooftop solar panel array under bright sunlight.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "How Much Energy Does a Solar Panel Produce? 400W Panel Examples | CalcMyPower",
    description:
      "Learn how much electricity a solar panel can produce per day and month. See 400W panel examples, peak sun hours, system losses, and the factors that affect solar output.",
    images: [
      "https://calcmypower.com/images/articles/how-much-energy-does-a-solar-panel-produce.webp",
    ],
  },
};

const TOC_ITEMS: TocItem[] = [
  { id: "quick-answer", label: "Quick Answer: Solar Panel Energy Production" },
  { id: "daily-production", label: "How Much Energy Does a Panel Produce Per Day?" },
  { id: "400w-panel-output", label: "How Much Electricity Does a 400W Panel Produce?" },
  { id: "monthly-production", label: "How Much Energy Does a Panel Produce Per Month?" },
  { id: "annual-production", label: "How Much Energy Does a 400W Panel Produce Per Year?" },
  { id: "what-400w-means", label: "What Does a 400W Solar Panel Actually Mean?" },
  { id: "production-factors", label: "What Determines Solar Panel Energy Production?" },
  { id: "wattage-vs-energy", label: "Does Solar Panel Wattage Determine Production?" },
  { id: "panel-efficiency", label: "Does Panel Efficiency Affect Energy Production?" },
  { id: "geographic-variation", label: "Solar Production Across US Geographic Locations" },
  { id: "orientation-tilt", label: "How Roof Direction and Tilt Affect Solar Output" },
  { id: "system-sizing", label: "Connecting Module Output to Whole-Home Sizing" },
  { id: "calculator-cta", label: "Estimate Your Entire Solar Array" },
  { id: "faq", label: "Frequently Asked Questions" },
];

const FAQ_DATA = [
  {
    question: "How much energy does a 400W solar panel produce?",
    answer:
      "Under typical US sunlight conditions averaging 4.5 peak sun hours per day, a 400-watt solar panel generates roughly 1.8 kilowatt-hours (kWh) per day in unadjusted theoretical energy. When applying an illustrative 78% planning performance factor to account for temperature derating, inverter conversion, soiling, and wiring resistance, the panel produces approximately 1.40 kWh per day, or about 42 kWh per month.",
  },
  {
    question: "How many kWh does a solar panel produce per day?",
    answer:
      "A standard residential solar panel rated between 350 and 450 watts typically produces between 1.1 and 2.0 kWh of alternating-current (AC) electricity per day. The exact output depends on your geographic location's peak sun hours, roof orientation, seasonal sun angles, and balance-of-system electrical losses.",
  },
  {
    question: "How much electricity does one solar panel produce per month?",
    answer:
      "One modern 400-watt solar panel produces between 30 and 55 kWh per month under typical US conditions. In sunny southwestern states with 5.5 or more peak sun hours, monthly output can exceed 50 kWh, while in cloudier northern regions with 3.0 peak sun hours, monthly production averages around 28 to 35 kWh.",
  },
  {
    question: "Does a 400W solar panel produce 400W all day?",
    answer:
      "No. A 400-watt rating is the panel's maximum DC power output under Standard Test Conditions (1,000 W/m² irradiance and 25°C cell temperature). Throughout a normal day, solar irradiance follows a bell curve, starting near zero at dawn, peaking around solar noon, and tapering off toward sunset. Furthermore, real-world summer operating temperatures reduce output below the 400W rating.",
  },
  {
    question: "How many solar panels do I need to power my house?",
    answer:
      "In an illustrative planning scenario based on historical US Energy Information Administration (EIA 2022-2023) residential benchmarks of approximately 890 kWh per month (around 29.26 kWh per day), a home would need roughly 21 solar panels rated at 400 watts (an 8.4 kW DC array) under 4.5 peak sun hours and an illustrative 78% planning performance factor to match annual electricity use. Actual panel requirements depend on individual utility usage, local solar irradiance, roof orientation, and shading.",
  },
  {
    question: "Does solar panel wattage determine energy production?",
    answer:
      "Wattage is a primary baseline, but it does not act alone. A 450-watt panel installed on an east-facing, partially shaded roof in Seattle may generate less annual kilowatt-hour energy than a 350-watt panel mounted at an optimal south-facing tilt in sunny Arizona. Energy output is the integral of instantaneous power over time, governed by local solar irradiance.",
  },
  {
    question: "What causes solar panel output to decrease?",
    answer:
      "The primary causes of decreased solar panel output are high ambient temperatures (which increase silicon cell resistance), partial shading from trees or vents, dust or snow accumulation (soiling), off-angle tilt and compass orientation, DC wiring voltage drop, inverter clipping, and gradual long-term module degradation (typically 0.5% per year).",
  },
  {
    question: "How does solar panel efficiency differ from panel wattage?",
    answer:
      "Wattage measures the total peak power output of the panel under standard laboratory conditions, while efficiency measures the percentage of solar irradiance hitting the module's surface that converts into electricity. A 20% efficient 400W panel and a 22% efficient 400W panel produce the exact same amount of electrical power; the 22% panel simply has a smaller physical surface area.",
  },
];

export default function HowMuchEnergyDoesASolarPanelProducePage() {
  const articleSchema = generateArticleSchema({
    headline: "How Much Energy Does a Solar Panel Produce? 400W Panel Examples",
    description:
      "Learn how much electricity a solar panel can produce per day and month. See 400W panel examples, peak sun hours, system losses, and the factors that affect solar output.",
    url: "https://calcmypower.com/how-much-energy-does-a-solar-panel-produce",
    datePublished: "2026-10-01T00:00:00Z",
    dateModified: "2026-10-01T00:00:00Z",
    images: [
      "https://calcmypower.com/images/articles/how-much-energy-does-a-solar-panel-produce.webp",
    ],
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Guides", url: "https://calcmypower.com/calculators" },
    {
      name: "How Much Energy Does a Solar Panel Produce?",
      url: "https://calcmypower.com/how-much-energy-does-a-solar-panel-produce",
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
            How Much Energy Does a Solar Panel Produce?
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
                  Residential Solar PV Planning Guide
                </span>
                <span className="text-slate-400">•</span>
                <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>14 min read</span>
                </span>
                <span className="text-slate-400">•</span>
                <ArticleDateByline datePublished="2026-10-01" lastModified="2026-10-01" />
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                How Much Energy Does a Solar Panel Produce?
              </h1>

              <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-normal">
                Understand how much electricity a photovoltaic module produces per day, month, and year. Review 400W reference examples, peak sun hours, system deratings, and the physical factors governing solar yield.
              </p>
            </header>

            {/* Featured Visual Asset with Click-to-Zoom */}
            <div className="space-y-3">
              <ZoomableArticleImage
                src="/images/articles/how-much-energy-does-a-solar-panel-produce.webp"
                alt="Technician measuring solar irradiance and energy production on a 400-watt rooftop solar panel array under bright sunlight."
                title="Solar PV Module Energy Production"
                caption="Figure 1: Measuring real-world solar irradiance and energy output on a 400-watt residential photovoltaic module using a handheld solar irradiance meter."
              >
                <Image
                  src="/images/articles/how-much-energy-does-a-solar-panel-produce.webp"
                  alt="Technician measuring solar irradiance and energy production on a 400-watt rooftop solar panel array under bright sunlight."
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                />
              </ZoomableArticleImage>
            </div>

            {/* QUICK ANSWER / AEO BLOCK */}
            <section id="quick-answer" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Quick Answer: How Much Energy Does a Solar Panel Produce?
                </h2>
              </div>

              <div className="p-6 sm:p-7 rounded-2xl bg-blue-50/70 border border-blue-200/90 text-slate-800 space-y-4 shadow-xs">
                <div className="flex items-center gap-2.5 text-blue-900 font-bold text-base sm:text-lg">
                  <Sun className="w-5 h-5 text-blue-700 shrink-0" />
                  <span>Direct Technical Answer</span>
                </div>
                <p className="text-sm sm:text-base leading-relaxed">
                  A solar panel&apos;s daily energy production depends on its rated wattage and the amount of usable sunlight it receives.
                </p>
                <p className="text-sm sm:text-base leading-relaxed">
                  For example, a standard <strong>400-watt (0.40 kW)</strong> residential panel exposed to <strong>4.5 peak sun hours</strong> has a simple theoretical planning calculation of about <strong>1.80 kilowatt-hours (kWh) per day</strong> before applying system-performance assumptions.
                </p>
                <p className="text-sm sm:text-base leading-relaxed">
                  When applying a realistic <strong>78% planning performance factor</strong> to account for real-world balance-of-system losses (thermal cell heating, inverter conversion efficiency, wiring voltage drop, and surface soiling), that 400W panel produces approximately <strong>1.40 kWh per day</strong>, or roughly <strong>42 kWh per month</strong> (about 512 kWh annually).
                </p>
                <div className="pt-2 border-t border-blue-200/60 flex flex-wrap items-center justify-between text-xs text-blue-900 font-medium gap-2">
                  <span>Power Rating: 400 Watts (Instantaneous DC Capacity)</span>
                  <span>Delivered Energy: ~1.40 kWh/day (Usable AC Output)</span>
                </div>
              </div>

              {/* Crucial Concept: Power vs Energy Callout */}
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-slate-800 space-y-2 text-sm leading-relaxed">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <Zap className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Crucial Distinction: Power (Watts) vs. Energy (Watt-Hours)</span>
                </div>
                <p>
                  A 400-watt rating does <strong>not</strong> mean the panel produces 400 watts of power every hour of daylight. <strong>Watts (W)</strong> measure instantaneous capacity, while <strong>Watt-hours (Wh)</strong> and <strong>kilowatt-hours (kWh)</strong> measure electrical energy accumulated over time.
                </p>
                <p>
                  The 400W nameplate rating represents maximum output under specific laboratory conditions. Real energy harvest follows the natural curve of the sun across the day.
                </p>
              </div>
            </section>

            {/* SECTION 1: How Much Energy Per Day */}
            <section id="daily-production" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  How Much Energy Does a Solar Panel Produce Per Day?
                </h2>
              </div>

              <p>
                To estimate daily electrical production for an individual photovoltaic panel, engineers multiply the panel&apos;s rated power capacity by the geographic region&apos;s available solar insolation, expressed in <strong>peak sun hours (PSH)</strong>, and adjust for real-world equipment and environmental losses:
              </p>

              {/* Mathematical Formula Card */}
              <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-3 font-mono text-sm shadow-md">
                <div className="text-xs uppercase tracking-wider text-slate-400 font-sans font-semibold flex items-center justify-between">
                  <span>Solar Panel Daily Energy Formula</span>
                  <span className="text-blue-400 font-mono">Simplified Planning Model</span>
                </div>
                <div className="text-base sm:text-lg font-bold text-amber-300 py-1 overflow-x-auto">
                  Daily Energy (kWh) = Panel Power (kW) × Peak Sun Hours × Planning Performance Factor
                </div>
                <div className="text-xs text-slate-300 font-sans leading-relaxed pt-2 border-t border-slate-800 space-y-1">
                  <p>• <strong>Panel Power (kW):</strong> Rated nameplate DC wattage divided by 1,000 (e.g., 400W = 0.40 kW).</p>
                  <p>• <strong>Peak Sun Hours:</strong> Equivalent hours per day when solar irradiance equals 1,000 W/m².</p>
                  <p>• <strong>Planning Performance Factor:</strong> Derating multiplier (default: 0.78 / 78%) modeling thermal, inverter, and wiring losses.</p>
                </div>
              </div>

              {/* Performance Factor Disclosure Box */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-1">
                <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Planning Performance Factor Assumption</span>
                </p>
                <p>
                  CalcMyPower uses 78% as an illustrative planning performance factor for simplified examples. Actual PV system performance varies with solar resource, tilt, azimuth, shading, soiling, temperature, wiring, inverter behavior, system availability, and other site-specific conditions.
                </p>
                <p className="text-slate-500">
                  NREL PVWatts uses hourly irradiance and weather data and models multiple system effects; therefore this article&apos;s calculation is intentionally simplified.
                </p>
              </div>

              {/* Comparative Table: 300W, 400W, 450W, 500W */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900">
                  Daily Output Comparison Across Standard Solar Panel Sizes
                </h3>
                <p className="text-sm text-slate-600">
                  The following table demonstrates estimated daily energy production across standard residential and commercial module ratings under low (3.0 PSH), average (4.5 PSH), and high (5.5 PSH) US solar conditions. Both unadjusted theoretical values and 78% planning estimates are presented:
                </p>

                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-xs sm:text-sm text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-100/80 text-slate-800 font-bold">
                        <th className="py-3 px-3">Panel Rating</th>
                        <th className="py-3 px-3">DC Power (kW)</th>
                        <th className="py-3 px-3">3.0 PSH (Cloudy/North)</th>
                        <th className="py-3 px-3 bg-blue-50/60 text-blue-950">4.5 PSH (US Average)</th>
                        <th className="py-3 px-3">5.5 PSH (Sunny/Southwest)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr>
                        <td className="py-3 px-3 font-semibold text-slate-900">300 Watts</td>
                        <td className="py-3 px-3 font-mono">0.30 kW</td>
                        <td className="py-3 px-3">0.90 kWh unadjusted <br/><span className="text-blue-700 font-medium">0.70 kWh (78% factor)</span></td>
                        <td className="py-3 px-3 bg-blue-50/30">1.35 kWh unadjusted <br/><span className="text-blue-700 font-bold">1.05 kWh (78% factor)</span></td>
                        <td className="py-3 px-3">1.65 kWh unadjusted <br/><span className="text-blue-700 font-medium">1.29 kWh (78% factor)</span></td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="py-3 px-3 font-semibold text-slate-900">400 Watts</td>
                        <td className="py-3 px-3 font-mono">0.40 kW</td>
                        <td className="py-3 px-3">1.20 kWh unadjusted <br/><span className="text-blue-700 font-medium">0.94 kWh (78% factor)</span></td>
                        <td className="py-3 px-3 bg-blue-50/50">1.80 kWh unadjusted <br/><span className="text-blue-700 font-bold">1.40 kWh (78% factor)</span></td>
                        <td className="py-3 px-3">2.20 kWh unadjusted <br/><span className="text-blue-700 font-medium">1.72 kWh (78% factor)</span></td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-semibold text-slate-900">450 Watts</td>
                        <td className="py-3 px-3 font-mono">0.45 kW</td>
                        <td className="py-3 px-3">1.35 kWh unadjusted <br/><span className="text-blue-700 font-medium">1.05 kWh (78% factor)</span></td>
                        <td className="py-3 px-3 bg-blue-50/30">2.03 kWh unadjusted <br/><span className="text-blue-700 font-bold">1.58 kWh (78% factor)</span></td>
                        <td className="py-3 px-3">2.48 kWh unadjusted <br/><span className="text-blue-700 font-medium">1.93 kWh (78% factor)</span></td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="py-3 px-3 font-semibold text-slate-900">500 Watts</td>
                        <td className="py-3 px-3 font-mono">0.50 kW</td>
                        <td className="py-3 px-3">1.50 kWh unadjusted <br/><span className="text-blue-700 font-medium">1.17 kWh (78% factor)</span></td>
                        <td className="py-3 px-3 bg-blue-50/50">2.25 kWh unadjusted <br/><span className="text-blue-700 font-bold">1.76 kWh (78% factor)</span></td>
                        <td className="py-3 px-3">2.75 kWh unadjusted <br/><span className="text-blue-700 font-medium">2.15 kWh (78% factor)</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-500 italic">
                  Note: Values are rounded to two decimal places assuming clear skies. Output decreases during days with heavy overcast, rain, or snow.
                </p>
              </div>
            </section>

            {/* SECTION 2: 400W Solar Panel Output */}
            <section id="400w-panel-output" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  How Much Electricity Does a 400W Solar Panel Produce?
                </h2>
              </div>

              <p>
                The 400-watt solar panel has become the predominant modern residential benchmark. Balancing physical dimensions (roughly 68 by 40 inches) with high power density, a 400W panel offers an ideal reference point for sizing home arrays.
              </p>

              <p>
                To understand its electrical delivery, we evaluate 400W (0.40 kW DC) across three typical US sunshine conditions:
              </p>

              {/* 3 Scenario Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <span>Moderate Sun</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">3.0 PSH</span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-black text-slate-900">0.94 kWh</div>
                    <div className="text-xs text-slate-500">Delivered daily AC energy</div>
                  </div>
                  <div className="text-xs text-slate-600 border-t border-slate-100 pt-2 space-y-1">
                    <p>• Unadjusted: 0.4 × 3.0 = 1.20 kWh</p>
                    <p>• 78% Planning: 1.20 × 0.78 = 0.936 kWh</p>
                    <p>• Typical of winter months and northern US latitudes.</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between text-xs font-bold text-blue-800 uppercase tracking-wider">
                    <span>US Average</span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">4.5 PSH</span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-black text-blue-900">1.40 kWh</div>
                    <div className="text-xs text-blue-700">Delivered daily AC energy</div>
                  </div>
                  <div className="text-xs text-slate-600 border-t border-blue-200/50 pt-2 space-y-1">
                    <p>• Unadjusted: 0.4 × 4.5 = 1.80 kWh</p>
                    <p>• 78% Planning: 1.80 × 0.78 = 1.404 kWh</p>
                    <p>• Solid baseline for mid-latitude US planning.</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <span>High Insolation</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">5.5 PSH</span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-black text-slate-900">1.72 kWh</div>
                    <div className="text-xs text-slate-500">Delivered daily AC energy</div>
                  </div>
                  <div className="text-xs text-slate-600 border-t border-slate-100 pt-2 space-y-1">
                    <p>• Unadjusted: 0.4 × 5.5 = 2.20 kWh</p>
                    <p>• 78% Planning: 2.20 × 0.78 = 1.716 kWh</p>
                    <p>• Common in Southwest (AZ, NV, Southern CA).</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-600">
                These numbers illustrate why solar professionals evaluate seasonal irradiance rather than relying on a single day&apos;s peak output. On a cool, sunny April afternoon in Colorado, a 400W panel might momentarily produce near 400W due to cold cells.
              </p>
              <p className="text-sm text-slate-600">
                Conversely, on a hot 95°F July day in Texas, thermal losses drag peak production down to roughly 330W to 350W even under intense midday sun.
              </p>
            </section>

            {/* SECTION 3: How Much Energy Per Month */}
            <section id="monthly-production" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  How Much Energy Does a Solar Panel Produce Per Month?
                </h2>
              </div>

              <p>
                Monthly energy yield translates daily performance into billing cycles that correspond directly to utility bills. For preliminary planning, engineers multiply estimated daily generation by 30 days:
              </p>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-sm">
                <div className="font-bold text-slate-900 text-base">
                  Standard 400W Panel Monthly Planning Calculation:
                </div>
                <div className="font-mono text-slate-800 space-y-1 bg-white p-3 rounded-xl border border-slate-200">
                  <p>Daily Generation = 1.404 kWh/day (at 4.5 PSH &amp; 78% Planning Factor)</p>
                  <p>Monthly Generation = 1.404 kWh/day × 30 days = <strong>42.12 kWh/month</strong></p>
                </div>
                <p className="text-xs text-slate-600">
                  By comparison, unadjusted theoretical calculation would yield: 1.80 kWh/day × 30 days = <strong>54.00 kWh/month</strong>. Sizing an off-grid battery bank or grid-tied array based on unadjusted theoretical output would result in an undersized system during cloudy or hot stretches.
                </p>
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                Seasonal Shifts in Monthly Production
              </h3>
              <p className="text-sm text-slate-600">
                Real-world monthly generation does not remain constant at 42 kWh. Solar geometry changes continuously throughout the calendar year:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600">
                <li>
                  <strong>Summer Months (June to August):</strong> The sun reaches its highest solar elevation, days are longest (14 to 15 daylight hours), and cloud cover is often lower in many regions. A 400W panel in an area with 5.5 summer PSH will generate approximately <strong>50 to 55 kWh per month</strong>, despite elevated cell temperatures.
                </li>
                <li>
                  <strong>Winter Months (November to January):</strong> The sun sits low on the southern horizon, days are short (9 to 10 daylight hours), and weather storms are more frequent. The same 400W panel might drop to 2.5 winter PSH, producing roughly <strong>23 to 28 kWh per month</strong>.
                </li>
                <li>
                  <strong>Spring and Autumn (Equinox Seasons):</strong> Spring often yields the highest instantaneous electrical conversion efficiencies because crisp, cool ambient air keeps photovoltaic silicon cells near 25°C while clear skies provide intense solar insolation.
                </li>
              </ul>
            </section>

            {/* SECTION 4: Annual Energy Production */}
            <section id="annual-production" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  How Much Energy Does a 400W Panel Produce Per Year?
                </h2>
              </div>

              <p>
                Annual solar production represents the cumulative energy harvest that determines long-term utility bill savings and payback calculations.
              </p>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
                <div className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  Simplified Annual Planning Estimate
                </div>
                <div className="text-3xl font-black text-slate-900">
                  ~512 kWh / year
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Calculated as: <strong>1.404 kWh/day × 365 days = 512.46 kWh per year</strong> for a single 400W module under average 4.5 peak sun hours and an illustrative 78% planning performance factor.
                </p>
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-900 space-y-1">
                  <p className="font-semibold">Important Modeling Limitation:</p>
                  <p>
                    Multiplying one fixed daily estimate by 365 is strictly a simplified annual planning approximation. In reality, no location experiences identical peak sun hours 365 days a year.
                  </p>
                  <p>
                    Professional software suites like NREL PVWatts simulate performance across all 8,760 hours of a Typical Meteorological Year (TMY), capturing granular shifts in diffuse irradiance, temperature, wind cooling, and sun angles.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 leading-relaxed">
                <p>
                  Annual energy production varies by location, solar resource, orientation, tilt, shading, temperature, system losses, and availability. A simple planning example can illustrate the math, but actual annual production requires site-specific solar-resource and system modeling rather than a flat geographic multiplier.
                </p>
              </div>
            </section>

            {/* SECTION 5: What Does 400W Actually Mean */}
            <section id="what-400w-means" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  What Does a 400W Solar Panel Actually Mean?
                </h2>
              </div>

              <p>
                When a manufacturer stamps &quot;400W&quot; on the backsheet of a solar module, consumers frequently assume the panel constantly pushes 400 watts into their home electrical panel whenever daylight appears. In physics and electrical engineering, that assumption is incorrect.
              </p>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900">
                  Standard Test Conditions (STC) Explained
                </h3>
                <p>
                  According to the <strong>U.S. Department of Energy (DOE)</strong> and the <strong>National Renewable Energy Laboratory (NREL)</strong>, photovoltaic module nameplate power ratings are established under strict laboratory conditions known as <strong>Standard Test Conditions (STC)</strong>:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="text-xs uppercase text-slate-500 font-bold tracking-wider">Irradiance</div>
                    <div className="text-lg font-black text-slate-900">1,000 W/m²</div>
                    <div className="text-slate-600">Simulates pure, unshaded peak sunlight at solar noon on a clear day.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="text-xs uppercase text-slate-500 font-bold tracking-wider">Cell Temperature</div>
                    <div className="text-lg font-black text-slate-900">25°C (77°F)</div>
                    <div className="text-slate-600">Temperature of the silicon wafer itself, not ambient outside air temperature.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="text-xs uppercase text-slate-500 font-bold tracking-wider">Air Mass Spectrum</div>
                    <div className="text-lg font-black text-slate-900">AM 1.5</div>
                    <div className="text-slate-600">Atmospheric sunlight filtration angle across mid-latitude regions.</div>
                  </div>
                </div>

                <p className="text-sm text-slate-600">
                  In practical outdoor installations, these three laboratory conditions rarely align simultaneously. On an 85°F summer day under 1,000 W/m² irradiance, solar cells heat up to <strong>120°F to 145°F (50°C to 63°C)</strong>.
                </p>
                <p className="text-sm text-slate-600">
                  Because silicon semiconductors have a negative temperature coefficient, elevated operating temperatures reduce panel voltage and trim real-world output by 8% to 15% below STC ratings.
                </p>
              </div>
            </section>

            {/* SECTION 6: What Determines Solar Panel Energy Production */}
            <section id="production-factors" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  What Determines Solar Panel Energy Production?
                </h2>
              </div>

              <p>
                Photovoltaic electricity generation is not a fixed mechanical output; it is an ongoing physical conversion that fluctuates based on 10 interconnected atmospheric, geometric, and electrical variables:
              </p>

              <div className="space-y-4">
                {/* Factor 1 */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                    <Sun className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>1. Regional Solar Resource (Global Horizontal Irradiance)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Solar irradiance measures the raw power of solar radiation reaching the earth&apos;s surface. High-altitude, arid climates receive far greater direct beam radiation than cloudy, humid sea-level regions.
                  </p>
                </div>

                {/* Factor 2 */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                    <Clock className="w-4 h-4 text-blue-500 shrink-0" />
                    <span>2. Peak Sun Hours (PSH)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Peak sun hours represent total daily accumulated solar radiation compressed into equivalent hours of 1,000 W/m² sunlight. Twelve hours of weak morning, midday, and twilight sunlight might total only 4.2 peak sun hours.
                  </p>
                </div>

                {/* Factor 3 */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                    <Compass className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>3. Compass Orientation (Azimuth)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    In the Northern Hemisphere, true south-facing panels receive maximum total solar radiation over a full year. West-facing arrays generate slightly less total energy but align production with late-afternoon utility peak rates.
                  </p>
                </div>

                {/* Factor 4 */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                    <Maximize2 className="w-4 h-4 text-purple-500 shrink-0" />
                    <span>4. Roof Pitch and Panel Tilt Angle</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Aligning module tilt with local geographic latitude ensures sunlight strikes the glass at near-perpendicular (90-degree) angles, minimizing surface reflection losses.
                  </p>
                </div>

                {/* Factor 5 */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                    <CloudSun className="w-4 h-4 text-slate-600 shrink-0" />
                    <span>5. Shading Obstructions</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Even localized shading from a chimney, plumbing vent, or tree branch across a single module cell can activate internal bypass diodes and significantly reduce string voltage.
                  </p>
                </div>

                {/* Factor 6 */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                    <Thermometer className="w-4 h-4 text-red-500 shrink-0" />
                    <span>6. Operating Cell Temperature</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Silicon photovoltaic cells experience a temperature coefficient of maximum power (Pmax) between -0.30% and -0.40% per °C above 25°C. At 60°C cell temperatures, module output drops by roughly 12% to 14%.
                  </p>
                </div>

                {/* Factor 7 */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                    <Layers className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>7. Surface Soiling (Dust, Pollen, Snow, Bird Droppings)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Accumulation of airborne dust and agricultural pollen typically causes a 2% to 5% loss in rainy regions, and up to 10% or more in arid regions without periodic rain or manual washing.
                  </p>
                </div>

                {/* Factor 8 */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                    <Activity className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>8. DC Wiring and Voltage Drop Losses</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Electrical resistance along copper conductor homerun cables produces minor heat and voltage drop (typically designed for under 2% to 3% loss under standard design rules).
                  </p>
                </div>

                {/* Factor 9 */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                    <Sliders className="w-4 h-4 text-cyan-600 shrink-0" />
                    <span>9. Inverter Conversion Efficiency and Power Clipping</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Modern grid-tied string inverters and microinverters operate at 96% to 98% efficiency. If the DC array wattage significantly exceeds the AC inverter maximum rating (DC-to-AC ratio &gt; 1.25), slight midday power clipping may occur.
                  </p>
                </div>

                {/* Factor 10 */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                    <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>10. System Availability and Utility Interconnection Downtime</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Grid-tied systems without battery backup must shut down immediately during grid outages for utility lineman safety (anti-islanding protection), pausing generation until grid power returns.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 7: Does Panel Wattage Determine Energy Production */}
            <section id="wattage-vs-energy" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Does Solar Panel Wattage Determine Energy Production?
                </h2>
              </div>

              <p>
                Higher rated wattage creates greater electrical generation capability under identical solar irradiance, but wattage by itself does not assure high annual kilowatt-hours.
              </p>

              <div className="space-y-3">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                  <h3 className="text-lg font-bold text-slate-900">
                    Comparing 300W vs. 400W vs. 450W vs. 500W Under Identical Conditions
                  </h3>
                  <p className="text-sm text-slate-600">
                    Assuming four modules installed side-by-side on the same south-facing roof slope with 4.5 peak sun hours and an illustrative 78% planning performance factor:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="text-xs text-slate-500">300W Module</div>
                      <div className="text-lg font-bold text-slate-900">1.05 kWh/day</div>
                      <div className="text-xs text-blue-600">~384 kWh/yr</div>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100">
                      <div className="text-xs text-blue-800 font-semibold">400W Module</div>
                      <div className="text-lg font-bold text-blue-900">1.40 kWh/day</div>
                      <div className="text-xs text-blue-700 font-semibold">~512 kWh/yr</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="text-xs text-slate-500">450W Module</div>
                      <div className="text-lg font-bold text-slate-900">1.58 kWh/day</div>
                      <div className="text-xs text-blue-600">~576 kWh/yr</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="text-xs text-slate-500">500W Module</div>
                      <div className="text-lg font-bold text-slate-900">1.76 kWh/day</div>
                      <div className="text-xs text-blue-600">~641 kWh/yr</div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-600">
                  While a 500W commercial panel delivers 67% more energy than a 300W legacy panel, physical dimensions must be considered. Most 500W modules measure over 7 feet long and weigh 60+ pounds, making them harder to manipulate around roof obstacles.
                </p>
                <p className="text-sm text-slate-600">
                  Residential arrays predominantly deploy 380W to 420W modules because they maximize power density within residential roof constraints.
                </p>
              </div>
            </section>

            {/* SECTION 8: Does Panel Efficiency Affect Energy Production */}
            <section id="panel-efficiency" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Does Panel Efficiency Affect Energy Production?
                </h2>
              </div>

              <p>
                One of the most persistent misunderstandings among homeowners is confusing <strong>module efficiency</strong> with <strong>module power output</strong>.
              </p>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                    <div className="font-bold text-slate-900 text-base">Module Power Rating (Watts)</div>
                    <p className="text-slate-600">
                      Indicates total electrical capacity delivered under standard test conditions. A 400W panel produces 400W under 1,000 W/m² irradiance regardless of whether its efficiency is 19% or 22%.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                    <div className="font-bold text-slate-900 text-base">Module Efficiency (%)</div>
                    <p className="text-slate-600">
                      Indicates the percentage of sunlight energy hitting the surface that converts into electricity. Higher efficiency simply means the panel produces that 400W from a smaller physical footprint.
                    </p>
                  </div>
                </div>

                <div className="text-xs text-slate-600 leading-relaxed border-t border-slate-200 pt-3">
                  <strong>Practical Rule of Thumb:</strong> If your roof has generous, unshaded south-facing surface area, paying an extreme premium for 23% ultra-high-efficiency panels is rarely necessary. Standard 20% to 21% efficient panels will produce the identical kilowatt-hours for less upfront equipment cost. However, if your roof space is limited by dormers, valleys, or shading, higher-efficiency modules allow you to pack more total kilowatt capacity onto the usable roof area.
                </div>
              </div>
            </section>

            {/* SECTION 9: Geographic Variation Across US */}
            <section id="geographic-variation" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Solar Production Across US Geographic Locations
                </h2>
              </div>

              <p>
                Solar irradiance varies dramatically across the United States. Atmospheric clarity, latitude, and weather patterns establish the daily average peak sun hours available to your roof:
              </p>

              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs sm:text-sm text-amber-950 space-y-1">
                <p className="font-semibold text-slate-900">
                  Solar Resource Sizing Rule:
                </p>
                <p>
                  Solar resource varies substantially by location. For a real project, use a site-specific solar-resource model such as PVWatts rather than assigning a fixed peak-sun-hour value to an entire region.
                </p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-100/80 text-slate-800 font-bold">
                      <th className="py-3 px-3">Region / Site Context</th>
                      <th className="py-3 px-3">Illustrative Planning PSH</th>
                      <th className="py-3 px-3">Important Limitation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-3 px-3 font-semibold text-slate-900">Southwestern Sunbelt &amp; Desert</td>
                      <td className="py-3 px-3 font-mono">
                        5.5 PSH<br/>
                        <span className="text-xs text-slate-500 font-sans italic">Illustrative planning assumption, not a location-specific solar-resource measurement.</span>
                      </td>
                      <td className="py-3 px-3 text-slate-600">High annual solar irradiance, but extreme summer ambient temperatures require thermal cell derating analysis.</td>
                    </tr>
                    <tr className="bg-slate-50/50">
                      <td className="py-3 px-3 font-semibold text-slate-900">Southern &amp; Sunbelt States</td>
                      <td className="py-3 px-3 font-mono">
                        4.8 PSH<br/>
                        <span className="text-xs text-slate-500 font-sans italic">Illustrative planning assumption, not a location-specific solar-resource measurement.</span>
                      </td>
                      <td className="py-3 px-3 text-slate-600">Favorable year-round sun, but summer humidity, convective clouds, and coastal patterns introduce local microclimates.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-semibold text-slate-900">Midwestern &amp; Mid-Atlantic Areas</td>
                      <td className="py-3 px-3 font-mono">
                        4.2 PSH<br/>
                        <span className="text-xs text-slate-500 font-sans italic">Illustrative planning assumption, not a location-specific solar-resource measurement.</span>
                      </td>
                      <td className="py-3 px-3 text-slate-600">Moderate solar resource with significant seasonal disparity between long summer daylight and short winter days.</td>
                    </tr>
                    <tr className="bg-slate-50/50">
                      <td className="py-3 px-3 font-semibold text-slate-900">Northern &amp; Pacific Northwest Coastal</td>
                      <td className="py-3 px-3 font-mono">
                        3.5 PSH<br/>
                        <span className="text-xs text-slate-500 font-sans italic">Illustrative planning assumption, not a location-specific solar-resource measurement.</span>
                      </td>
                      <td className="py-3 px-3 text-slate-600">Persistent winter cloud cover and lower sun angles require site-specific simulation rather than regional rules of thumb.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2">
                <p className="font-semibold text-slate-900">
                  Why Annual Energy Cannot Be Estimated by a Flat Daily Multiplier:
                </p>
                <p>
                  Annual energy production varies by location, solar resource, orientation, tilt, shading, temperature, system losses, and availability. A simple planning example can illustrate the math, but actual annual production requires site-specific solar-resource and system modeling.
                </p>
                <p>
                  Multiplying an illustrative daily average across 365 days does not capture critical real-world factors. Northern regions experience dramatic seasonal variations, generating several times more energy in summer than during short, overcast winter days.
                </p>
                <p>
                  Desert climates enjoy abundant sunlight but face steep high-temperature efficiency deratings during hot months. Accurate annual generation modeling requires tools like NREL PVWatts that evaluate all 8,760 hours of typical meteorological year data for a specific site.
                </p>
              </div>
            </section>

            {/* SECTION 10: Roof Direction and Tilt */}
            <section id="orientation-tilt" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  How Does Roof Direction and Tilt Affect Solar Production?
                </h2>
              </div>

              <p>
                Rooftop geometry plays a direct role in how much of the ambient solar resource enters the panel&apos;s glass:
              </p>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                  <div className="font-bold text-slate-900 text-base">
                    Compass Heading (Azimuth) Impact
                  </div>
                  <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-slate-600">
                    <li>
                      <strong>South-Facing (180° Azimuth):</strong> Captures maximum total annual kWh production in the Northern Hemisphere. Ideal for homeowners aiming for 100% annual volumetric utility offset.
                    </li>
                    <li>
                      <strong>West-Facing (270° Azimuth):</strong> Generates approximately 80% to 85% of south-facing annual energy, but peaks during late afternoon hours (3 PM to 7 PM). In utilities with Time-of-Use (TOU) rates or reduced net metering export credits, west-facing power can have higher economic value per kilowatt-hour.
                    </li>
                    <li>
                      <strong>East-Facing (90° Azimuth):</strong> Generates roughly 80% to 85% of south-facing annual kWh, peaking during morning hours when household consumption is starting up.
                    </li>
                    <li>
                      <strong>North-Facing (0° / 360° Azimuth):</strong> In the continental US, north-facing slopes receive minimal direct beam radiation, reducing output by 35% to 50% or more depending on pitch.
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-2 text-xs sm:text-sm text-purple-950">
                  <div className="flex items-center gap-2 font-bold text-purple-900">
                    <Maximize2 className="w-4 h-4 text-purple-700 shrink-0" />
                    <span>Optimize Your Roof&apos;s Solar Tilt Angle</span>
                  </div>
                  <p>
                    For stationary rooftop systems, setting module tilt close to your geographic latitude (typically 28° to 42° across the US) provides the optimal annual energy harvest. Use our dedicated engineering tool to verify ideal tilt angles:
                  </p>
                  <div className="pt-1">
                    <Link
                      href="/solar-panel-tilt-calculator"
                      className="inline-flex items-center gap-1.5 font-bold text-purple-700 hover:text-purple-900 hover:underline"
                    >
                      <span>Open Solar Panel Tilt Angle Calculator</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 11: Whole-Home Sizing Connection */}
            <section id="system-sizing" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Connecting Individual Module Output to Whole-Home Sizing
                </h2>
              </div>

              <p>
                Estimating one solar panel&apos;s output is only the first step in photovoltaic engineering. The overarching goal is matching total array generation to your household&apos;s actual electrical consumption:
              </p>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="font-bold text-slate-900 text-base">
                  Whole-Home Solar Sizing Example (Transparent Planning Method):
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  The following transparent step-by-step example illustrates how individual panel generation connects to whole-home array sizing. This is strictly a simplified planning exercise, not an engineering recommendation or definitive production forecast.
                </p>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                    <p className="font-semibold text-slate-900">
                      Step 1: Monthly Household Electricity Baseline (Historical Statistical Benchmark)
                    </p>
                    <p className="text-slate-600">
                      According to historical data from the US Energy Information Administration (EIA 2022-2023 residential reports), an average American household consumed approximately <strong>890 kWh per month</strong>. Actual residential consumption varies widely depending on home size, heating fuel, climate zone, and seasonal air conditioning use.
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                    <p className="font-semibold text-slate-900">
                      Step 2: Annual Household Electricity Usage
                    </p>
                    <p className="font-mono text-blue-900 font-semibold">
                      890 kWh/month × 12 months = 10,680 kWh/year
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                    <p className="font-semibold text-slate-900">
                      Step 3: Simplified Daily Solar Generation Requirement
                    </p>
                    <p className="font-mono text-blue-900 font-semibold">
                      10,680 kWh/year ÷ 365 days ≈ 29.26 kWh/day (roughly 30 kWh/day)
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                    <p className="font-semibold text-slate-900">
                      Step 4: Single-Panel Daily Output with Planning Performance Factor
                    </p>
                    <p className="text-slate-600 mb-1">
                      Assuming an illustrative location with 4.5 peak sun hours per day and CalcMyPower&apos;s 78% illustrative planning performance factor for a 400W (0.40 kW) module:
                    </p>
                    <p className="font-mono text-blue-900 font-semibold">
                      0.40 kW × 4.5 PSH × 0.78 = 1.404 kWh/day per panel
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                    <p className="font-semibold text-slate-900">
                      Step 5: Array Size and Panel Count
                    </p>
                    <p className="text-slate-600">
                      Using these simplified assumptions, 29.26 kWh/day ÷ 1.404 kWh/day per panel = 20.84 panels. Rounding up gives approximately 21 panels, or an 8.4 kW DC array (21 × 400W = 8,400 Watts).
                    </p>
                    <p className="text-slate-600">
                      This is a simplified planning example, not a universal system design.
                    </p>
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 font-mono text-center font-bold text-blue-900 text-sm">
                      29.26 kWh/day ÷ 1.404 kWh/panel/day = 20.84 panels, so 21 panels when rounded up (8.4 kW DC)
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-900 space-y-1">
                  <p className="font-semibold">Planning Notice:</p>
                  <p>
                    This calculation does not imply that 21 panels are universally required for an 890 kWh/month home, nor that 4.5 PSH applies to every roof.
                  </p>
                  <p>
                    A home in Arizona with 6.0 PSH may need only 16 panels, whereas a home in the Pacific Northwest with 3.5 PSH may need 27 or more panels for the identical kilowatt-hour offset. Actual system design requires site-specific solar analysis by a licensed professional.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-slate-600 font-medium">
                    Want the full breakdown of electric bills, square footage myths, and panel requirements?
                  </span>
                  <Link
                    href="/how-many-solar-panels-do-i-need"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition"
                  >
                    <span>Read Full Home Solar Sizing Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 12: Interactive Calculator CTA */}
            <section id="calculator-cta" className="space-y-6 scroll-mt-24">
              <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-900 to-indigo-950 text-white space-y-5 shadow-lg border border-blue-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/80 flex items-center justify-center text-white shrink-0">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                      Calculate Your Required Solar System Size
                    </h3>
                    <p className="text-xs sm:text-sm text-blue-200">
                      Size your complete rooftop PV array from monthly kilowatt-hour consumption.
                    </p>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
                  If you want to estimate the total solar array size for your home, use our Solar System Size Calculator.
                </p>
                <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
                  It combines electricity usage, peak sun hours, performance factors, and panel wattage to determine the required PV array and panel count.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/solar-system-size-calculator"
                    className="px-6 py-3.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-sm sm:text-base transition shadow-md flex items-center gap-2"
                  >
                    <span>Open Solar System Size Calculator</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <span className="text-xs text-blue-300">
                    Free online engineering tool • No registration required
                  </span>
                </div>
              </div>
            </section>

            {/* RELATED SIZING TOOLS SECTION */}
            <section className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="text-xl font-bold text-slate-900">
                Related Solar &amp; Electrical Sizing Tools
              </h3>
              <p className="text-sm text-slate-600">
                Explore our full suite of free engineering calculators to design and verify your photovoltaic electrical system:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="/solar-system-size-calculator"
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-2"
                >
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                    <Sun className="w-4 h-4" />
                    <span>Solar System Size Calculator</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Calculate total solar array kW and module count based on monthly electric bill kWh and local peak sun hours.
                  </p>
                </Link>

                <Link
                  href="/solar-battery-calculator"
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-2"
                >
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                    <BatteryCharging className="w-4 h-4" />
                    <span>Solar Battery Storage Calculator</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Size off-grid and backup battery storage in Amp-hours and Watt-hours with chemistry-specific depth of discharge.
                  </p>
                </Link>

                <Link
                  href="/solar-charge-controller-calculator"
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-2"
                >
                  <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
                    <Gauge className="w-4 h-4" />
                    <span>Solar Charge Controller Calculator</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Determine MPPT and PWM charge controller amperage ratings and check cold-weather open-circuit voltage margins.
                  </p>
                </Link>

                <Link
                  href="/solar-panel-tilt-calculator"
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-2"
                >
                  <div className="flex items-center gap-2 text-purple-600 font-bold text-sm">
                    <Maximize2 className="w-4 h-4" />
                    <span>Solar Panel Tilt Angle Calculator</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Find optimal solar panel tilt angles and compass orientation for your latitude across annual and seasonal targets.
                  </p>
                </Link>

                <Link
                  href="/voltage-drop-calculator"
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-2"
                >
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                    <Activity className="w-4 h-4" />
                    <span>Voltage Drop Calculator</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Calculate voltage drop and verify conductor wire gauge for DC array homeruns and AC inverter branch circuits.
                  </p>
                </Link>

                <Link
                  href="/solar-panels-series-vs-parallel"
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-2"
                >
                  <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                    <Layers className="w-4 h-4" />
                    <span>Solar Panels Series vs. Parallel Guide</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Learn how series and parallel panel wiring configurations alter circuit voltage, current, wire size, and shading behavior.
                  </p>
                </Link>
              </div>
            </section>

            {/* SECTION 13: FAQ Accordion */}
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

            {/* Preliminary Planning & Engineering Disclaimer */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-600 leading-relaxed">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Preliminary Planning &amp; Engineering Disclaimer</span>
              </div>
              <p>
                This guide and its calculation models provide preliminary educational estimates based on user-entered solar module wattage and standard solar irradiance baselines. It does not constitute formal engineering design, structural roof assessment, or definitive energy generation forecasts.
              </p>
              <p>
                Actual rooftop photovoltaic production depends on roof compass azimuth, pitch, local shading obstructions, inverter clipping, electrical panel busbar limitations, and utility interconnection rules.
              </p>
              <p>
                Working with high-voltage direct current and utility electrical panels involves risks of shock and fire hazard. Always consult a qualified licensed solar contractor or professional electrical engineer to verify physical equipment sizing and local code compliance prior to purchasing or installing solar equipment.
              </p>
            </div>
          </article>

          {/* Desktop Sticky Sidebar (4 cols on lg) */}
          <aside className="hidden lg:block lg:col-span-4">
            <TableOfContents items={TOC_ITEMS} cluster="solar" />
          </aside>
        </div>
      </div>
    </>
  );
}
