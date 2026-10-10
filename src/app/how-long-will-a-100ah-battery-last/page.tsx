import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Battery,
  Zap,
  BatteryCharging,
  Plug,
  ArrowRight,
  ShieldAlert,
  Info,
  Clock,
  HelpCircle,
  Calculator,
  Flame,
  Thermometer,
  Gauge,
  Sliders,
  CheckCircle2,
  Tv,
  Refrigerator,
  Wifi,
  Laptop,
  Activity,
  Layers,
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
  title: "How Long Will a 100Ah Battery Last? 12V Appliance Runtime Guide",
  description:
    "Find out how long a 12V 100Ah battery will run a refrigerator, TV, CPAP, or inverter. See realistic runtime estimates for LiFePO4 and lead-acid deep-cycle batteries.",
  alternates: {
    canonical: "https://calcmypower.com/how-long-will-a-100ah-battery-last",
  },
  openGraph: {
    title:
      "How Long Will a 100Ah Battery Last? 12V Appliance Runtime Guide | CalcMyPower",
    description:
      "Find out how long a 12V 100Ah battery will run a refrigerator, TV, CPAP, or inverter. Realistic runtime formulas and appliance benchmarks for LiFePO4 and lead-acid deep-cycle batteries.",
    url: "https://calcmypower.com/how-long-will-a-100ah-battery-last",
    type: "article",
    publishedTime: "2026-09-29T00:00:00Z",
    modifiedTime: "2026-09-29T00:00:00Z",
    images: [
      {
        url: "https://calcmypower.com/images/articles/12v-100ah-battery-runtime-comparison.webp",
        width: 2400,
        height: 1350,
        alt: "Educational chart comparing 12V 100Ah battery runtime in hours across common electrical loads for modern LiFePO4 at 90 percent depth of discharge versus lead-acid AGM at 50 percent depth of discharge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "How Long Will a 100Ah Battery Last? 12V Appliance Runtime Guide | CalcMyPower",
    description:
      "Calculate delivered runtime for a 12V 100Ah battery across household appliances, inverters, and direct DC circuits.",
    images: [
      "https://calcmypower.com/images/articles/12v-100ah-battery-runtime-comparison.webp",
    ],
  },
};

const TOC_ITEMS: TocItem[] = [
  { id: "quick-answer", label: "Direct Answer & Quick Runtime Rules" },
  { id: "what-100ah-stores", label: "What Does a 12V 100Ah Battery Actually Store?" },
  { id: "lifepo4-vs-lead-acid", label: "LiFePO4 vs. Lead-Acid: Usable Energy & Weight" },
  { id: "runtime-formula", label: "Practical Runtime Formula & 100W Worked Example" },
  { id: "inverter-factor", label: "The Inverter Factor: DC vs. AC Conversion Losses" },
  { id: "refrigerator-duty-cycle", label: "Can a 100Ah Battery Run a Refrigerator?" },
  { id: "master-runtime-table", label: "Master 12V 100Ah Appliance Runtime Reference Table" },
  { id: "detailed-scenarios", label: "Detailed Real-World Appliance Scenarios" },
  { id: "real-world-factors", label: "Factors That Alter Real-World Delivered Runtime" },
  { id: "runtime-vs-lifespan", label: "Runtime per Charge vs. Battery Lifespan" },
  { id: "calculator-bridge", label: "Interactive Battery Runtime & Sizing Calculators" },
  { id: "faq", label: "Frequently Asked Questions" },
];

const FAQ_DATA = [
  {
    question: "How many watt-hours are in a 12V 100Ah battery?",
    answer:
      "A 12V 100Ah battery contains 1,200 nominal Watt-hours (Wh) of stored electrical energy. This is calculated by multiplying nominal voltage by charge capacity: 12 Volts × 100 Amp-hours = 1,200 Watt-hours (or 1.2 kilowatt-hours). However, the amount of usable energy you can extract depends on battery chemistry, recommended depth of discharge, and conversion efficiency.",
  },
  {
    question: "How long will a 100Ah battery run a 100W load?",
    answer:
      "Under illustrative benchmark assumptions with a 90% inverter efficiency, a 12V 100Ah LiFePO4 battery (using a 90% depth of discharge, or 1,080Wh usable) will power a 100-Watt AC load for approximately 9.7 hours. A deep-cycle lead-acid battery (using an illustrative 50% depth of discharge, or 600Wh usable) will power the same 100-Watt load for approximately 5.4 hours.",
  },
  {
    question: "Can a 100Ah battery run a full-size residential refrigerator?",
    answer:
      "Yes, for a limited emergency duration. A modern Energy Star residential refrigerator averages 40 to 60 Watts of continuous equivalent power over a 24-hour cycle (due to 30% to 45% compressor cycling). Connected through a pure sine wave inverter capable of handling the 800W to 1,200W compressor startup surge, a 12V 100Ah LiFePO4 battery delivers roughly 18 to 24 hours of operation, while a 100Ah lead-acid battery delivers roughly 10 to 13 hours under normal room temperatures.",
  },
  {
    question: "How long will a 12V 100Ah battery run a CPAP machine?",
    answer:
      "Runtime depends heavily on whether the heated humidifier and heated tube are active. Powered directly via a 12V DC power cord without heat, a standard CPAP draws only 10W to 20W, running for 45 to 80 hours on a 100Ah LiFePO4 battery (5 to 10 full nights of sleep). If powered through an AC inverter with the heated humidifier and hose set to high (drawing 60W to 90W continuous), runtime drops to roughly 10 to 14 hours on LiFePO4 and 6 to 8 hours on lead-acid.",
  },
  {
    question: "Can a 12V 100Ah battery run a 1000W or 1500W inverter?",
    answer:
      "A 100Ah battery can physically power a 1,000W or 1,500W inverter, but high loads draw massive current from a 12V battery. Running a 1,000W appliance pulls approximately 90 to 100 Amps of DC current (1,000W ÷ 12V ÷ 0.90 efficiency). While a 100Ah LiFePO4 battery with a 100A continuous BMS rating can sustain this for roughly 50 to 55 minutes, a 100Ah lead-acid battery will experience severe voltage sag, thermal stress, and Peukert capacity loss, cutting delivered runtime to under 25 to 30 minutes.",
  },
  {
    question: "Why does my battery run down faster when using an inverter than direct DC?",
    answer:
      "Inverters introduce two distinct sources of energy loss: conversion inefficiency (typically 8% to 15% lost as heat during the transformation from 12V DC to 120V AC) and idle tare power (standby power consumed by the inverter's internal electronics just being switched on, typically 10W to 25W). Direct 12V DC loads bypass both losses entirely, delivering 15% to 30% longer operating runtime.",
  },
  {
    question: "How long does it take to recharge a 12V 100Ah battery?",
    answer:
      "Recharge time equals discharged Amp-hours divided by charger output current, plus charging efficiency losses. Using a standard 20-Amp smart charger, a fully discharged 100Ah LiFePO4 battery (accepting high current across its full charge curve) recharges in approximately 5 to 5.5 hours. A 100Ah lead-acid battery discharged to 50% (50Ah to restore) requires 4 to 6 hours because its absorption phase slows down current intake significantly once the battery reaches 80% state of charge.",
  },
  {
    question: "What is the difference between battery runtime and battery cycle life?",
    answer:
      "Battery runtime is the duration (measured in hours or minutes) a single full charge can power your connected appliances before the battery requires recharging. Battery lifespan or cycle life is the total number of complete charge-and-discharge cycles the battery chemistry can deliver before its maximum storage capacity permanently degrades below 80% of its original rating.",
  },
];

export default function BatteryRuntimeGuidePage() {
  const articleSchema = generateArticleSchema({
    headline: "How Long Will a 100Ah Battery Last? 12V Appliance Runtime Guide",
    description:
      "Find out how long a 12V 100Ah battery will run a refrigerator, TV, CPAP, or inverter. See realistic runtime estimates for LiFePO4 and lead-acid deep-cycle batteries.",
    url: "https://calcmypower.com/how-long-will-a-100ah-battery-last",
    datePublished: "2026-09-29T00:00:00Z",
    dateModified: "2026-09-29T00:00:00Z",
    images: [
      "https://calcmypower.com/images/articles/12v-100ah-battery-runtime-comparison.webp",
    ],
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    {
      name: "UPS Battery Backup Calculator",
      url: "https://calcmypower.com/ups-battery-backup-calculator",
    },
    {
      name: "100Ah Battery Runtime Guide",
      url: "https://calcmypower.com/how-long-will-a-100ah-battery-last",
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
        {/* Breadcrumb Context */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-6"
        >
          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href="/ups-battery-backup-calculator"
            className="hover:text-blue-600 transition"
          >
            UPS Battery Backup Calculator
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-slate-800 font-semibold truncate">
            100Ah Battery Runtime Guide
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
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold uppercase tracking-wider">
                  Battery Engineering &amp; Sizing
                </span>
                <span className="text-slate-400">•</span>
                <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>12 min read</span>
                </span>
                <span className="text-slate-400">•</span>
                <ArticleDateByline datePublished="2026-09-29" lastModified="2026-09-29" />
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                How Long Will a 100Ah Battery Last? 12V Appliance Runtime Guide
              </h1>

              <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-normal">
                A 12V 100Ah deep-cycle battery is the undisputed workhorse of American backup systems, off-grid cabins, RVs, and marine setups.
              </p>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed font-normal">
                Yet determining real-world runtime is rarely a single number. Operating hours hinge on battery chemistry, inverter efficiency, discharge rates, and appliance duty cycles.
              </p>
            </header>

            {/* Hero Image with Fullscreen Lightbox Zoom */}
            <ZoomableArticleImage
              src="/images/articles/12v-100ah-battery-runtime-comparison.webp"
              alt="Educational chart comparing 12V 100Ah battery runtime in hours across common electrical loads for modern LiFePO4 at 90 percent depth of discharge versus lead-acid AGM at 50 percent depth of discharge"
              caption="Comparing delivered operating runtime across common DC and AC loads for a 12V 100Ah LiFePO4 lithium battery versus a deep-cycle lead-acid AGM battery under benchmark test assumptions."
            >
              <Image
                src="/images/articles/12v-100ah-battery-runtime-comparison.webp"
                alt="Educational chart comparing 12V 100Ah battery runtime in hours across common electrical loads for modern LiFePO4 at 90 percent depth of discharge versus lead-acid AGM at 50 percent depth of discharge"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-contain"
              />
            </ZoomableArticleImage>

            {/* Section 1: Direct Answer */}
            <section id="quick-answer" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Direct Answer: How Long Will a 12V 100Ah Battery Last?
              </h2>

              <p>
                A standard 12V 100Ah deep-cycle battery stores <strong>1,200 nominal Watt-hours (Wh)</strong> of energy. Under common benchmark operating assumptions:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 not-prose">
                <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
                      LiFePO4 Lithium (12V 100Ah)
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-200 text-blue-900">
                      Illustrative ~90% DoD
                    </span>
                  </div>
                  <div className="text-3xl font-black text-blue-950 mb-1">
                    ~9.7 Hours
                  </div>
                  <div className="text-xs font-medium text-blue-800 mb-2">
                    Powering a continuous 100W AC load via inverter
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Provides approximately 1,080 Watt-hours of usable energy. At a 90% inverter efficiency, it delivers ~972 Wh of AC electricity to appliances.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                      Lead-Acid AGM / Gel (12V 100Ah)
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                      Illustrative ~50% DoD
                    </span>
                  </div>
                  <div className="text-3xl font-black text-amber-950 mb-1">
                    ~5.4 Hours
                  </div>
                  <div className="text-xs font-medium text-amber-800 mb-2">
                    Powering a continuous 100W AC load via inverter
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Provides approximately 600 Watt-hours of recommended usable energy to safeguard plate life. At 90% inverter efficiency, it delivers ~540 Wh of AC electricity.
                  </p>
                </div>
              </div>

              <p>
                For common household devices, here is what you can realistically expect from a single 12V 100Ah battery:
              </p>

              <ul className="space-y-2 list-disc pl-5 text-sm md:text-base">
                <li>
                  <strong>Wi-Fi Router &amp; Modem (15W direct DC):</strong> 38 to 40 hours on lead-acid; 68 to 72 hours on LiFePO4.
                </li>
                <li>
                  <strong>Laptop Computer (60W AC via inverter):</strong> 9 hours on lead-acid; 16 hours on LiFePO4 (roughly 8 to 15 full laptop recharges).
                </li>
                <li>
                  <strong>43-Inch LED Smart TV (55W AC via inverter):</strong> 9.8 hours on lead-acid; 17.6 hours on LiFePO4.
                </li>
                <li>
                  <strong>CPAP Machine without heated humidity (15W DC):</strong> 38 to 40 hours on lead-acid; 68 to 72 hours on LiFePO4 (5 to 9 full nights of sleep).
                </li>
                <li>
                  <strong>Residential Refrigerator (40W to 55W average combined draw):</strong> 11 to 14 hours on lead-acid; 19 to 24 hours on LiFePO4.
                </li>
                <li>
                  <strong>Space Heater or Toaster (1,200W AC):</strong> Not recommended. A 100Ah battery will be depleted or tripped on low-voltage shutdown in 15 to 45 minutes.
                </li>
              </ul>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs md:text-sm text-slate-600 leading-relaxed">
                <span className="font-bold text-slate-900">Core Takeaway: </span>
                Delivered runtime is fundamentally governed by appliance wattage, whether you run directly from 12V DC or convert through an inverter, and the chemistry depth of discharge you permit before recharging.
              </div>
            </section>

            {/* Section 2: What a 12V 100Ah Battery Stores */}
            <section id="what-100ah-stores" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                What Does a 12V 100Ah Battery Actually Store?
              </h2>

              <p>
                To understand battery duration, you must first distinguish between electrical charge capacity and stored energy capacity.
              </p>

              <p>
                <strong>Amp-hours (Ah)</strong> measure electrical charge volume over time. A 100Ah rating means the battery can deliver 5 Amps for 20 hours or 10 Amps for 10 hours at standard test rates.
              </p>
              <p>
                However, Amp-hours alone do not tell you how much physical work the battery can perform. Stored energy requires electrical pressure (voltage) to produce usable power.
              </p>

              <p>
                <strong>Watt-hours (Wh)</strong> measure true energy capacity. To convert electrical charge to energy, multiply circuit voltage by Amp-hours:
              </p>

              <div className="bg-slate-900 text-emerald-400 font-mono text-sm md:text-base p-4 rounded-xl border border-slate-800 my-3">
                Nominal Energy (Wh) = Voltage (V) × Capacity (Ah)
                <br />
                Nominal Energy = 12 Volts × 100 Amp-hours = 1,200 Watt-hours (1.2 kWh)
              </div>

              <p>
                If you connect two 12V 100Ah batteries in series, the voltage doubles to 24V while capacity remains 100Ah, storing 2,400 Wh (24V × 100Ah).
              </p>
              <p>
                If you connect them in parallel, voltage remains 12V while capacity doubles to 200Ah, also storing 2,400 Wh (12V × 200Ah). In both arrangements, total stored energy is identical.
              </p>

              <p>
                For a deeper look into electrical charge fundamentals, read our guide on{" "}
                <Link
                  href="/what-does-ah-mean-on-a-battery"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  battery amp-hour ratings
                </Link>{" "}
                or explore our companion tutorial on{" "}
                <Link
                  href="/what-is-a-watt-hour"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  watt-hours versus watts
                </Link>
                .
              </p>
            </section>

            {/* Section 3: LiFePO4 vs Lead-Acid */}
            <section id="lifepo4-vs-lead-acid" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                LiFePO4 vs. Lead-Acid: Usable Energy, Voltage Sag, and Weight
              </h2>

              <p>
                While every 12V 100Ah battery carries the same nominal 1,200 Wh label, how much of that energy you can actually extract before damage occurs depends completely on internal cell chemistry.
              </p>

              <div className="overflow-x-auto my-6">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <thead>
                    <tr className="border-b border-slate-300 bg-slate-50 text-slate-700">
                      <th className="py-3 px-4 font-bold">Engineering Characteristic</th>
                      <th className="py-3 px-4 font-bold">Deep-Cycle Lead-Acid (AGM / Gel)</th>
                      <th className="py-3 px-4 font-bold text-blue-700">LiFePO4 Lithium Iron Phosphate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Recommended Depth of Discharge (DoD)</td>
                      <td className="py-3 px-4">Illustrative benchmark: 50% max recommended</td>
                      <td className="py-3 px-4 font-semibold text-blue-700">Illustrative benchmark: 80% to 90% usable</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Delivered Usable Energy</td>
                      <td className="py-3 px-4 font-mono">~500 to 600 Wh (40 to 50 Ah)</td>
                      <td className="py-3 px-4 font-mono font-semibold text-emerald-600">~960 to 1,080 Wh (80 to 90 Ah)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Discharge Voltage Curve</td>
                      <td className="py-3 px-4">Sloping curve: Drops from 12.8V down to 11.8V under load</td>
                      <td className="py-3 px-4 font-semibold text-blue-700">Flat curve: Stays above 12.8V through 85% of discharge</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Peukert&apos;s Law Losses (Heavy Loads)</td>
                      <td className="py-3 px-4">Severe: High current draws slash delivered capacity</td>
                      <td className="py-3 px-4 font-semibold text-blue-700">Minimal: Maintains rated capacity even at 0.5C to 1C rates</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Typical Physical Weight</td>
                      <td className="py-3 px-4 font-mono">~60 to 70 lbs (27 to 32 kg)</td>
                      <td className="py-3 px-4 font-mono font-semibold text-blue-700">~24 to 28 lbs (11 to 13 kg)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Typical Expected Cycle Life</td>
                      <td className="py-3 px-4">300 to 500 cycles (at 50% DoD)</td>
                      <td className="py-3 px-4 font-semibold text-emerald-600">3,000 to 5,000+ cycles (at 80% to 90% DoD)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                Understanding Depth of Discharge (DoD)
              </h3>
              <p>
                In technical sizing, <strong>Depth of Discharge (DoD)</strong> refers to the percentage of total capacity withdrawn from a battery during a cycle.
              </p>
              <p>
                For traditional lead-acid chemistries (flooded, sealed AGM, and Gel), draining past 50% DoD causes rapid plate sulfation, grid corrosion, and premature cell failure. When a manufacturer recommends a 50% DoD ceiling, your 100Ah battery is effectively a 50Ah usable storage reservoir under daily cycling.
              </p>
              <p>
                In contrast, Lithium Iron Phosphate (LiFePO4) chemistry allows deeper regular discharge. Most manufacturers approve discharging to 80% or 90% without rapid cell degradation.
              </p>
              <p>
                Discharging 90% of a 100Ah LiFePO4 battery releases 90Ah (1,080 Wh) of energy, giving you nearly double the operational service hours of an identically rated lead-acid unit.
              </p>
              <p className="text-xs text-slate-500 italic">
                Note: Recommended DoD varies by battery model, operating temperature, and manufacturer specifications. The figures of 50% for lead-acid and 90% for LiFePO4 are illustrative engineering benchmarks used throughout this guide to demonstrate practical runtime differences.
              </p>

              <h3 className="text-xl font-bold text-slate-900">
                Voltage Sag and Low-Voltage Inverter Cutoffs
              </h3>
              <p>
                As a lead-acid battery discharges, its terminal voltage steadily drops. When powering heavy loads (such as a 600W microwave or blender), internal cell resistance causes immediate voltage sag.
              </p>
              <p>
                Even if the battery still has 40% of its charge remaining, terminal voltage may sag below 10.5 Volts, causing your inverter to beep and trip its low-voltage disconnect protection.
              </p>
              <p>
                LiFePO4 batteries feature an extraordinarily flat discharge curve. A lithium cell remains between 13.0V and 12.8V for almost its entire discharge cycle, ensuring connected electronics receive steady voltage until the cell is virtually empty.
              </p>
            </section>

            {/* Section 4: Practical Runtime Formula */}
            <section id="runtime-formula" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Practical Runtime Formula &amp; 100W Worked Example
              </h2>

              <p>
                To estimate how long any electrical appliance will run from a battery, use the following deterministic energy equation:
              </p>

              <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Deterministic Runtime Formula
                </div>
                <div className="font-mono text-base md:text-lg text-emerald-400 font-semibold">
                  Estimated Runtime (hours) = [Nominal Wh × Usable Fraction × System Efficiency] ÷ Load Watts
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm my-4">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <strong>Nominal Wh:</strong> Voltage × Rated Ah (12V × 100Ah = 1,200 Wh).
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <strong>Usable Fraction:</strong> Permitted DoD (e.g. 0.90 for LiFePO4; 0.50 for lead-acid).
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <strong>System Efficiency:</strong> DC-to-AC inverter conversion efficiency (typically 0.85 to 0.92) or DC circuit efficiency (~0.95).
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <strong>Load Watts:</strong> Operating power consumed by connected equipment.
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 pt-2">
                Step-by-Step Worked Example: 100W AC Load
              </h3>
              <p>
                Suppose a homeowner wants to run a 100-Watt emergency lighting and fan circuit through an inverter from a 12V 100Ah battery. We will assume an inverter conversion efficiency of 90% (0.90).
              </p>

              <div className="space-y-4 my-4">
                <div className="p-4 rounded-xl border border-blue-200 bg-white shadow-sm space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center justify-between">
                    <span>Scenario A: 12V 100Ah LiFePO4 Lithium Battery</span>
                    <span className="text-xs font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded">90% DoD</span>
                  </div>
                  <ol className="list-decimal pl-5 text-xs md:text-sm space-y-1 text-slate-600">
                    <li>Calculate nominal battery energy: 12V × 100Ah = 1,200 Wh</li>
                    <li>Apply usable depth of discharge (90%): 1,200 Wh × 0.90 = 1,080 Wh usable</li>
                    <li>Apply inverter efficiency (90%): 1,080 Wh × 0.90 = 972 delivered AC Wh</li>
                    <li>Divide by appliance draw (100W): 972 Wh ÷ 100W = <strong>9.72 hours (~9.7 hours)</strong></li>
                  </ol>
                </div>

                <div className="p-4 rounded-xl border border-amber-200 bg-white shadow-sm space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center justify-between">
                    <span>Scenario B: 12V 100Ah Deep-Cycle Lead-Acid Battery</span>
                    <span className="text-xs font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded">50% DoD</span>
                  </div>
                  <ol className="list-decimal pl-5 text-xs md:text-sm space-y-1 text-slate-600">
                    <li>Calculate nominal battery energy: 12V × 100Ah = 1,200 Wh</li>
                    <li>Apply recommended depth of discharge (50%): 1,200 Wh × 0.50 = 600 Wh usable</li>
                    <li>Apply inverter efficiency (90%): 600 Wh × 0.90 = 540 delivered AC Wh</li>
                    <li>Divide by appliance draw (100W): 540 Wh ÷ 100W = <strong>5.40 hours (5.4 hours)</strong></li>
                  </ol>
                </div>
              </div>

              <p className="text-xs text-slate-500">
                These calculations illustrate why a single 12V 100Ah LiFePO4 battery delivers nearly 80% more operational time than a lead-acid battery under identical load conditions.
              </p>
            </section>

            {/* Section 5: The Inverter Factor */}
            <section id="inverter-factor" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                The Inverter Factor: DC vs. AC Conversion Losses
              </h2>

              <p>
                Many battery owners are surprised when their battery empties significantly faster than manual calculations predict. The most frequent culprit is the power inverter itself.
              </p>

              <h3 className="text-xl font-bold text-slate-900">
                1. DC-to-AC Inversion Losses (8% to 15%)
              </h3>
              <p>
                Batteries supply Direct Current (DC), but standard household appliances require 120-Volt Alternating Current (AC).
              </p>
              <p>
                Quality pure sine wave inverters operate at 88% to 92% peak efficiency, but light loads or budget units often drop to 80% to 85%. The remaining 10% to 15% is lost as thermal heat through the cooling fan.
              </p>

              <h3 className="text-xl font-bold text-slate-900">
                2. Inverter Tare / Standby Power Consumption
              </h3>
              <p>
                An inverter consumes electrical energy simply by being turned on, even if nothing is plugged into it. This standby draw, known as <strong>tare power</strong> or no-load idle consumption, typically ranges from:
              </p>
              <ul className="list-disc pl-5 text-sm md:text-base space-y-1">
                <li><strong>Compact 300W to 500W Inverters:</strong> 4 to 8 Watts of idle draw.</li>
                <li><strong>Standard 1,000W to 1,500W Inverters:</strong> 10 to 18 Watts of idle draw.</li>
                <li><strong>Heavy-Duty 2,000W to 3,000W Inverters:</strong> 20 to 35 Watts of idle draw.</li>
              </ul>
              <p>
                If you leave a 2,000W inverter running overnight just to charge a 10W smartphone, the inverter itself will waste 20W to 25W continuously, burning over 200 Watt-hours of your battery solely to deliver 30 Watt-hours of phone charge.
              </p>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs md:text-sm text-emerald-950 space-y-2">
                <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>The Direct 12V DC Advantage</span>
                </div>
                <p className="leading-relaxed">
                  Whenever possible, run equipment directly from 12V DC circuits.
                </p>
                <p className="leading-relaxed">
                  Using 12V DC car adapters, USB-C chargers, 12V LED lighting, or direct DC cords bypasses the inverter entirely. This eliminates conversion losses and standby tare, extending battery runtime by 15% to 30%.
                </p>
              </div>
            </section>

            {/* Section 6: Refrigerator Duty Cycles */}
            <section id="refrigerator-duty-cycle" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Can a 100Ah Battery Run a Refrigerator? Compressor Duty Cycles Explained
              </h2>

              <p>
                One of the most frequent search questions from homeowners preparing for storm outages is whether a single 12V 100Ah battery can keep their food cold.
              </p>
              <p>
                The answer is yes, but the calculation requires understanding compressor duty cycles rather than simple nameplate numbers.
              </p>

              <h3 className="text-xl font-bold text-slate-900">
                Why Refrigerator Nameplate Watts Are Deceptive
              </h3>
              <p>
                If you inspect the electrical data label on a residential kitchen refrigerator, you might see a rating such as <strong>115V, 6.0 Amps</strong> (or approximately 700 Watts). Homeowners often assume:
              </p>
              <div className="font-mono text-xs md:text-sm bg-slate-100 p-3 rounded-lg text-slate-700 my-2">
                Incorrect Assumption: 1,200 Wh battery ÷ 700 Watts = 1.7 hours of runtime
              </div>
              <p>
                This calculation is completely misleading. That nameplate number reflects maximum defrost heater current or locked-rotor startup draw.
              </p>
              <p>
                In reality, a modern refrigerator compressor only runs when cooling is demanded, cycling on and off throughout the day.
              </p>

              <h3 className="text-xl font-bold text-slate-900">
                Compressor Duty Cycles &amp; Real-World Energy Use
              </h3>
              <p>
                A standard residential Energy Star refrigerator consumes roughly <strong>350 to 500 kilowatt-hours (kWh) per year</strong> according to U.S. Department of Energy (DOE) testing benchmarks.
              </p>
              <ul className="list-disc pl-5 text-sm md:text-base space-y-1.5">
                <li>
                  <strong>Annual Energy Consumption:</strong> 400 kWh/year ÷ 365 days = approximately 1,100 Wh (1.1 kWh) per day.
                </li>
                <li>
                  <strong>Average Hourly Power Draw:</strong> 1,100 Wh ÷ 24 hours = <strong>approximately 45 Watts average</strong>.
                </li>
                <li>
                  <strong>Compressor Duty Cycle:</strong> When active, the compressor draws 120W to 150W for 15 to 20 minutes, then remains off for 20 to 30 minutes, resulting in an average duty cycle of 30% to 45%.
                </li>
              </ul>

              <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-3 my-4">
                <div className="font-bold text-slate-900 text-sm">
                  Full-Size Residential Fridge on a 12V 100Ah Battery:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm">
                  <div className="p-3 rounded-lg bg-blue-50/50 border border-blue-100 space-y-1">
                    <span className="font-semibold text-blue-900">12V 100Ah LiFePO4 (90% DoD):</span>
                    <p className="text-slate-600">
                      Usable capacity: 1,080 Wh. With an average combined draw of 45W to 55W (including compressor cycling and inverter tare draw), delivered runtime is <strong>roughly 19 to 24 hours</strong>.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-50/50 border border-amber-100 space-y-1">
                    <span className="font-semibold text-amber-900">12V 100Ah Lead-Acid AGM (50% DoD):</span>
                    <p className="text-slate-600">
                      Usable capacity: 600 Wh. With a 45W to 55W average draw, delivered runtime is <strong>roughly 11 to 13 hours</strong> before the battery reaches its safe cutoff limit.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs md:text-sm text-amber-900 space-y-1.5">
                <div className="font-bold flex items-center gap-1.5 text-amber-800">
                  <ShieldAlert className="w-4 h-4 text-amber-700" />
                  <span>Crucial Refrigerator Outage Guidelines</span>
                </div>
                <p className="leading-relaxed">
                  <strong>Startup Surge:</strong> Refrigerator compressors require an instantaneous startup surge of 800W to 1,200W for 1 to 2 seconds. You must use a pure sine wave inverter rated for at least 1,000W continuous and 2,000W surge; smaller inverters will overload and trip immediately.
                </p>
                <p className="leading-relaxed">
                  <strong>Ambient Temperature &amp; Door Seals:</strong> If room temperature climbs above 85°F (29°C) or the door is opened frequently, compressor duty cycle can jump to 60% or higher, shortening battery runtime by 30% to 50%.
                </p>
              </div>

              <p>
                For larger multi-day power outages where you plan to run multiple household appliances or well pumps alongside refrigeration, consult our dedicated guide on{" "}
                <Link
                  href="/what-size-generator-to-run-a-refrigerator"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  What Size Generator Do I Need to Run a Refrigerator?
                </Link>
                .
              </p>
            </section>

            {/* Section 7: Master Runtime Table */}
            <section id="master-runtime-table" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Master 12V 100Ah Appliance Runtime Reference Table
              </h2>

              <p>
                The table below provides realistic, calculation-grounded runtime estimates for common appliances powered by a single 12V 100Ah battery.
              </p>

              <div className="p-3 rounded-lg bg-slate-100 text-xs text-slate-600 leading-normal mb-3">
                <strong>Benchmark Assumptions:</strong> 12V 100Ah nominal = 1,200 Wh. LiFePO4 usable = 90% (1,080 Wh); Lead-Acid AGM usable = 50% (600 Wh). AC loads assume a 90% inverter efficiency (0.90); direct DC loads assume 95% circuit efficiency (0.95). Real-world draw varies by appliance model, age, and temperature.
              </div>

              <div className="overflow-x-auto my-6 border border-slate-200 rounded-xl">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <thead>
                    <tr className="border-b border-slate-300 bg-slate-50 text-slate-700">
                      <th className="py-3 px-3.5 font-bold">Appliance / Load</th>
                      <th className="py-3 px-3.5 font-bold">Typical Draw</th>
                      <th className="py-3 px-3.5 font-bold">Circuit Type</th>
                      <th className="py-3 px-3.5 font-bold">Operating Mode</th>
                      <th className="py-3 px-3.5 font-bold text-amber-700">Lead-Acid Runtime (50% DoD)</th>
                      <th className="py-3 px-3.5 font-bold text-blue-700">LiFePO4 Runtime (90% DoD)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-3.5 font-semibold text-slate-900">Wi-Fi Router &amp; Optical Modem</td>
                      <td className="py-3 px-3.5 font-mono">15 Watts</td>
                      <td className="py-3 px-3.5 font-medium">12V DC</td>
                      <td className="py-3 px-3.5 text-xs text-slate-500">Continuous 100%</td>
                      <td className="py-3 px-3.5 font-mono text-amber-800">~38.0 Hours</td>
                      <td className="py-3 px-3.5 font-mono font-semibold text-blue-700">~68.4 Hours</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-3.5 font-semibold text-slate-900">12V LED Interior / Camp Lights</td>
                      <td className="py-3 px-3.5 font-mono">20 Watts</td>
                      <td className="py-3 px-3.5 font-medium">12V DC</td>
                      <td className="py-3 px-3.5 text-xs text-slate-500">Continuous 100%</td>
                      <td className="py-3 px-3.5 font-mono text-amber-800">~28.5 Hours</td>
                      <td className="py-3 px-3.5 font-mono font-semibold text-blue-700">~51.3 Hours</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-3.5 font-semibold text-slate-900">12V Portable RV/Overland Fridge</td>
                      <td className="py-3 px-3.5 font-mono">15W Avg (45W run)</td>
                      <td className="py-3 px-3.5 font-medium">12V DC</td>
                      <td className="py-3 px-3.5 text-xs text-slate-500">~30% duty cycle</td>
                      <td className="py-3 px-3.5 font-mono text-amber-800">~38.0 Hours</td>
                      <td className="py-3 px-3.5 font-mono font-semibold text-blue-700">~68.4 Hours</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-3.5 font-semibold text-slate-900">CPAP Machine (No Humidity / Heat)</td>
                      <td className="py-3 px-3.5 font-mono">15 Watts</td>
                      <td className="py-3 px-3.5 font-medium">12V DC</td>
                      <td className="py-3 px-3.5 text-xs text-slate-500">Continuous 100%</td>
                      <td className="py-3 px-3.5 font-mono text-amber-800">~38.0 Hours</td>
                      <td className="py-3 px-3.5 font-mono font-semibold text-blue-700">~68.4 Hours</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-3.5 font-semibold text-slate-900">Laptop Computer Charging</td>
                      <td className="py-3 px-3.5 font-mono">60 Watts</td>
                      <td className="py-3 px-3.5 font-medium">120V AC (Inverter)</td>
                      <td className="py-3 px-3.5 text-xs text-slate-500">Active charging</td>
                      <td className="py-3 px-3.5 font-mono text-amber-800">~9.0 Hours</td>
                      <td className="py-3 px-3.5 font-mono font-semibold text-blue-700">~16.2 Hours</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-3.5 font-semibold text-slate-900">43-Inch LED Smart TV</td>
                      <td className="py-3 px-3.5 font-mono">55 Watts</td>
                      <td className="py-3 px-3.5 font-medium">120V AC (Inverter)</td>
                      <td className="py-3 px-3.5 text-xs text-slate-500">Continuous watching</td>
                      <td className="py-3 px-3.5 font-mono text-amber-800">~9.8 Hours</td>
                      <td className="py-3 px-3.5 font-mono font-semibold text-blue-700">~17.6 Hours</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-3.5 font-semibold text-slate-900">Full-Size Residential Fridge</td>
                      <td className="py-3 px-3.5 font-mono">45W Avg (150W run)</td>
                      <td className="py-3 px-3.5 font-medium">120V AC (Inverter)</td>
                      <td className="py-3 px-3.5 text-xs text-slate-500">~35% duty cycle + tare</td>
                      <td className="py-3 px-3.5 font-mono text-amber-800">~12.0 Hours</td>
                      <td className="py-3 px-3.5 font-mono font-semibold text-blue-700">~21.6 Hours</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-3.5 font-semibold text-slate-900">CPAP Machine (Heated Hose &amp; Humidifier)</td>
                      <td className="py-3 px-3.5 font-mono">60 Watts</td>
                      <td className="py-3 px-3.5 font-medium">120V AC (Inverter)</td>
                      <td className="py-3 px-3.5 text-xs text-slate-500">Humidifier active</td>
                      <td className="py-3 px-3.5 font-mono text-amber-800">~9.0 Hours</td>
                      <td className="py-3 px-3.5 font-mono font-semibold text-blue-700">~16.2 Hours</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-3.5 font-semibold text-slate-900">Standard 20-Inch Box Fan</td>
                      <td className="py-3 px-3.5 font-mono">50 Watts</td>
                      <td className="py-3 px-3.5 font-medium">120V AC (Inverter)</td>
                      <td className="py-3 px-3.5 text-xs text-slate-500">Medium speed</td>
                      <td className="py-3 px-3.5 font-mono text-amber-800">~10.8 Hours</td>
                      <td className="py-3 px-3.5 font-mono font-semibold text-blue-700">~19.4 Hours</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-3.5 font-semibold text-slate-900">Standard Continuous 100W Benchmark</td>
                      <td className="py-3 px-3.5 font-mono">100 Watts</td>
                      <td className="py-3 px-3.5 font-medium">120V AC (Inverter)</td>
                      <td className="py-3 px-3.5 text-xs text-slate-500">Continuous 100%</td>
                      <td className="py-3 px-3.5 font-mono text-amber-800">~5.4 Hours</td>
                      <td className="py-3 px-3.5 font-mono font-semibold text-blue-700">~9.7 Hours</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-3.5 font-semibold text-slate-900">Continuous 200W Load</td>
                      <td className="py-3 px-3.5 font-mono">200 Watts</td>
                      <td className="py-3 px-3.5 font-medium">120V AC (Inverter)</td>
                      <td className="py-3 px-3.5 text-xs text-slate-500">Continuous 100%</td>
                      <td className="py-3 px-3.5 font-mono text-amber-800">~2.7 Hours</td>
                      <td className="py-3 px-3.5 font-mono font-semibold text-blue-700">~4.9 Hours</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-3.5 font-semibold text-slate-900">Continuous 500W Load</td>
                      <td className="py-3 px-3.5 font-mono">500 Watts</td>
                      <td className="py-3 px-3.5 font-medium">120V AC (Inverter)</td>
                      <td className="py-3 px-3.5 text-xs text-slate-500">Continuous 100%</td>
                      <td className="py-3 px-3.5 font-mono text-amber-800">~1.1 Hours*</td>
                      <td className="py-3 px-3.5 font-mono font-semibold text-blue-700">~1.9 Hours</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-3.5 font-semibold text-slate-900">Residential Sump Pump (1/3 HP)</td>
                      <td className="py-3 px-3.5 font-mono">800W (2.4 kW surge)</td>
                      <td className="py-3 px-3.5 font-medium">120V AC (Inverter)</td>
                      <td className="py-3 px-3.5 text-xs text-slate-500">Intermittent (~10% cycle)</td>
                      <td className="py-3 px-3.5 font-mono text-amber-800">~6.8 Hours (40 mins pump)</td>
                      <td className="py-3 px-3.5 font-mono font-semibold text-blue-700">~12.2 Hours (73 mins pump)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-3.5 font-semibold text-slate-900">Microwave Oven (Compact)</td>
                      <td className="py-3 px-3.5 font-mono">1,100W Input</td>
                      <td className="py-3 px-3.5 font-medium">120V AC (Inverter)</td>
                      <td className="py-3 px-3.5 text-xs text-slate-500">Active heating</td>
                      <td className="py-3 px-3.5 font-mono text-amber-800">~20 to 25 Minutes*</td>
                      <td className="py-3 px-3.5 font-mono font-semibold text-blue-700">~50 Minutes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-500">
                *Note on high-current loads: Discharging a lead-acid battery at 500W to 1,100W (45A to 100A DC) causes severe Peukert losses and voltage sag, which will drop actual delivered runtime below theoretical math. LiFePO4 cells maintain over 95% of their rated capacity under high discharge rates.
              </p>
            </section>

            {/* Section 8: Detailed Appliance Scenarios */}
            <section id="detailed-scenarios" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Detailed Real-World Appliance Scenarios
              </h2>

              <p>
                To see how multiple devices combine in actual emergency or off-grid situations, explore these practical field scenarios:
              </p>

              <div className="space-y-6">
                {/* Scenario 1: Emergency Communications */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-lg">
                    <Wifi className="w-5 h-5" />
                    <h3 className="text-slate-900">Scenario 1: Home Storm Outage Communications Hub</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    During a regional thunderstorm outage, a family needs to maintain internet access, charge smartphones, and keep an LED floor lamp illuminated.
                  </p>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 font-mono text-slate-700">
                    <div>• Wi-Fi Router + Fiber ONT: 15 Watts (Continuous)</div>
                    <div>• 2× Smartphone Fast Chargers: 20 Watts (Intermittent, ~2 hours/day)</div>
                    <div>• 1× 9W LED Floor Lamp: 9 Watts (Active 6 hours/night)</div>
                    <div className="text-blue-700 font-semibold pt-1">
                      Total Daily Energy Demand: (15W × 24h) + (20W × 2h) + (9W × 6h) = 454 Watt-hours / day
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-slate-600">
                    A single <strong>12V 100Ah LiFePO4 battery</strong> (1,080 Wh usable) will easily power this communication hub for <strong>2.3 full days (roughly 55 hours)</strong> without needing solar or generator recharge. A 100Ah AGM battery (600 Wh usable) delivers approximately <strong>1.3 days (31 hours)</strong>.
                  </p>
                </div>

                {/* Scenario 2: CPAP Sizing */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-indigo-600 font-bold text-lg">
                    <Activity className="w-5 h-5" />
                    <h3 className="text-slate-900">Scenario 2: Medical CPAP Machine Nightly Operation</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    A patient requiring CPAP therapy needs to sleep safely off-grid or during extended utility blackouts.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm pt-1">
                    <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-1">
                      <div className="font-bold text-emerald-950">Option A: Direct 12V DC Adapter (No Heat)</div>
                      <p className="text-slate-600">
                        Draws roughly 12W to 18W (average ~15W), consuming ~120 Wh over an 8-hour sleep cycle. A 100Ah LiFePO4 battery delivers <strong>8 to 9 full nights of sleep</strong>.
                      </p>
                    </div>
                    <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 space-y-1">
                      <div className="font-bold text-amber-950">Option B: AC Inverter + Heated Humidifier &amp; Hose</div>
                      <p className="text-slate-600">
                        Heating water and air pulls 60W to 80W continuous, consuming 550 to 700 Wh over 8 hours. A 100Ah LiFePO4 battery lasts <strong>only 1 to 1.5 nights</strong>, while lead-acid depletes before morning.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Scenario 3: RV Boondocking */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-lg">
                    <Refrigerator className="w-5 h-5" />
                    <h3 className="text-slate-900">Scenario 3: RV Camper Boondocking (Off-Grid 12V System)</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    An overland van camper runs a 45-quart 12V compressor fridge, water pump, cabin lights, and roof exhaust vent fan without shore power.
                  </p>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 font-mono text-slate-700">
                    <div>• 12V Compressor Fridge: 15W average (360 Wh / day)</div>
                    <div>• MaxxFan Roof Vent: 15W on medium for 8 hours (120 Wh / day)</div>
                    <div>• Water Pressure Pump: 60W intermittent (15 mins/day = 15 Wh)</div>
                    <div>• LED Interior Lights + USB Devices: 60 Wh / day</div>
                    <div className="text-emerald-700 font-semibold pt-1">
                      Total Daily DC Energy Consumption: ~555 Watt-hours / day (approx 46 Amp-hours)
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-slate-600">
                    On a 100Ah LiFePO4 battery (1,080 Wh usable), the camper can boondock for <strong>almost two full days (46 hours)</strong> with zero solar generation. On lead-acid (600 Wh usable), the battery must be recharged every 24 hours.
                  </p>
                  <p className="text-xs md:text-sm text-slate-600">
                    Pairing rooftop solar panels tilted with our <Link href="/solar-panel-tilt-calculator" className="text-blue-600 hover:underline font-medium">Solar Panel Tilt Angle Calculator</Link> allows off-grid replenishment during sunny daylight hours.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 9: Real-World Factors */}
            <section id="real-world-factors" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Factors That Alter Real-World Delivered Runtime
              </h2>

              <p>
                Mathematical formulas establish the theoretical upper bound of battery performance. In field applications, several environmental and electrical factors reduce deliverable energy:
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-2">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-blue-600" />
                    <span>1. Discharge Rate &amp; Peukert&apos;s Law</span>
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Formulated in 1897, Peukert&apos;s Law shows that lead-acid chemical capacity drops rapidly as discharge current rises.
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Lead-acid batteries carry a 20-hour rating (C/20, or 5 Amps for a 100Ah pack). Pulling 50 Amps cuts deliverable energy by 20% to 35% due to internal electrolyte resistance and diffusion limits.
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    LiFePO4 lithium batteries exhibit an almost negligible Peukert exponent, maintaining over 95% of rated capacity even under heavy 0.5C to 1C discharge currents.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-2">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-amber-600" />
                    <span>2. Ambient Operating Temperature</span>
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Battery capacity ratings are standardized at 77°F (25°C). In cold weather, chemical reaction rates slow down:
                  </p>
                  <ul className="list-disc pl-5 text-xs md:text-sm text-slate-600 space-y-1">
                    <li>
                      <strong>Lead-Acid in Freezing Temps:</strong> At 32°F (0°C), deliverable capacity drops by approximately 20%. At 0°F (-18°C), capacity can drop by 40% to 50%.
                    </li>
                    <li>
                      <strong>LiFePO4 in Freezing Temps:</strong> Lithium batteries can discharge down to -4°F (-20°C) with modest capacity loss (roughly 10% to 20%), but <em>cannot be safely charged below 32°F (0°C)</em> without permanent lithium plating and fire risk. Quality LiFePO4 batteries feature low-temperature BMS charge cutoffs or internal heating pads.
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-2">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-purple-600" />
                    <span>3. DC Wire Gauge Resistance &amp; Voltage Drop</span>
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Because a 12V battery operates at low voltage, high wattage requires immense electrical current. A 1,200W inverter pulls over 100 Amps of DC current from a 12V battery (Amps = Watts ÷ Volts).
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Using undersized battery cables (such as 6 AWG or 8 AWG) creates significant resistance, dissipating power as heat and causing 0.5V to 1.0V of drop between battery terminals and inverter.
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    This premature drop triggers inverter low-voltage alarms long before the battery is discharged. Always use heavy 2 AWG, 1/0, or 2/0 pure copper cables with crimped lugs for 1,000W+ inverters.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-2">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>4. Battery Age and Internal Degradation</span>
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    As batteries age through charge-discharge cycles and calendar storage, internal cell impedance rises and active chemical material degrades. A lead-acid battery after 2 to 3 years of heavy use might retain only 70% to 80% of its original factory Ah rating, proportionately shortening every runtime estimate.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 10: Runtime vs Lifespan */}
            <section id="runtime-vs-lifespan" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Runtime per Charge vs. Battery Lifespan
              </h2>

              <p>
                When battery buyers ask &quot;How long will a 100Ah battery last?&quot;, they often confuse two completely different engineering metrics:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 not-prose">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    Metric A: Runtime per Charge
                  </div>
                  <div className="text-xl font-bold text-slate-900">
                    Operating Hours
                  </div>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                    How many hours or minutes the battery can supply power to your electrical devices before its voltage drops to its safe cutoff threshold and requires a recharge.
                  </p>
                  <div className="text-xs font-semibold text-slate-700 bg-slate-50 p-2 rounded border border-slate-200">
                    Example: Running a 55W TV for 17.6 hours on a 100Ah LiFePO4 battery.
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-purple-600">
                    Metric B: Total Battery Lifespan
                  </div>
                  <div className="text-xl font-bold text-slate-900">
                    Cycle Life &amp; Calendar Years
                  </div>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                    How many total charge-and-discharge cycles (or calendar years) the battery cell chemistry can survive before its maximum storage capacity permanently drops below 80% of its original nameplate rating.
                  </p>
                  <div className="text-xs font-semibold text-slate-700 bg-slate-50 p-2 rounded border border-slate-200">
                    Example: A LiFePO4 battery delivering 4,000 cycles (10+ years of daily use).
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                Understanding Cycle Life by Chemistry
              </h3>
              <p>
                A <strong>cycle</strong> represents discharging a battery to a specified depth and recharging it back to 100%. The depth to which you discharge directly impacts how many lifetime cycles you receive:
              </p>
              <ul className="list-disc pl-5 text-sm md:text-base space-y-1.5">
                <li>
                  <strong>Standard Deep-Cycle Flooded Lead-Acid:</strong> Delivers roughly 300 to 500 cycles at 50% DoD. If consistently discharged to 80% or 100%, cycle life collapses to under 150 to 200 cycles.
                </li>
                <li>
                  <strong>Sealed AGM Lead-Acid:</strong> Delivers roughly 400 to 600 cycles at 50% DoD under proper temperature-compensated float charging.
                </li>
                <li>
                  <strong>LiFePO4 Lithium Iron Phosphate:</strong> Delivers 3,000 to 5,000+ cycles at 80% to 90% DoD. Even after 4,000 full cycles, the battery does not die; it simply retains ~80% of its initial 100Ah capacity.
                </li>
              </ul>
              <p>
                For daily off-grid or solar cycling, LiFePO4 lithium provides vastly lower total cost of ownership per kilowatt-hour delivered over its operating lifetime, despite higher initial purchase costs.
              </p>
            </section>

            {/* Section 11: Interactive Sizing Calculators Bridge */}
            <section id="calculator-bridge" className="space-y-6 scroll-mt-24">
              <div className="border-t border-slate-200 pt-8">
                <div className="flex items-center gap-2 mb-2">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    Interactive Power &amp; Runtime Calculators
                  </h2>
                </div>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                  Need to calculate runtime for your exact custom equipment, size a multi-battery storage bank, or calculate wire sizes? Use our purpose-built engineering calculators:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
                <Link
                  href="/ups-battery-backup-calculator"
                  className="group block p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      Live Calculator • Runtime
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
                    UPS &amp; Battery Backup Runtime Calculator
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Input your specific appliance watts, battery voltage, and Amp-hour capacity to calculate precise backup hours across customizable DoD and inverter efficiency settings.
                  </p>
                </Link>

                <Link
                  href="/battery-capacity-calculator"
                  className="group block p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      Live Calculator • Sizing
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
                    Battery Capacity &amp; Sizing Calculator
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Convert between Ah and Wh, evaluate usable battery bank energy across chemistries, or calculate the exact number of battery units required for your target runtime.
                  </p>
                </Link>

                <Link
                  href="/solar-battery-calculator"
                  className="group block p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      Live Calculator • Solar Storage
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
                    Solar Battery Calculator
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Size off-grid and backup solar battery banks in kWh and Amp-hours based on daily energy consumption and days of autonomy.
                  </p>
                </Link>

                <Link
                  href="/watts-to-amps-calculator"
                  className="group block p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      Electrical Calculator
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
                    Watts to Amps Electrical Calculator
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Convert appliance wattage into circuit current (Amps) at 12V DC, 24V DC, or 120V AC to properly size circuit breakers, fuses, and battery cables.
                  </p>
                </Link>

                <Link
                  href="/generator-size-calculator"
                  className="group block p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      Emergency Backup
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
                    Generator Size Calculator
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    When battery runtime is not enough for extended multi-day outages, calculate the exact generator wattage required to recharge battery banks and power whole-house loads.
                  </p>
                </Link>
              </div>
            </section>

            {/* Section 12: Frequently Asked Questions */}
            <section id="faq" className="space-y-6 scroll-mt-24">
              <div className="border-t border-slate-200 pt-8">
                <div className="flex items-center gap-2 mb-2">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    Frequently Asked Questions
                  </h2>
                </div>
                <p className="text-sm md:text-base text-slate-600">
                  Real engineering answers to common homeowner, RV, and solar battery runtime questions.
                </p>
              </div>

              <div className="space-y-3">
                {FAQ_DATA.map((item, index) => (
                  <details
                    key={index}
                    className="group bg-white rounded-xl border border-slate-200 p-4 md:p-5 transition hover:border-slate-300"
                  >
                    <summary className="flex items-center justify-between cursor-pointer font-bold text-slate-900 text-base md:text-lg select-none list-none">
                      <span className="pr-4">{item.question}</span>
                      <span className="text-slate-400 group-open:rotate-180 transition-transform duration-200 text-sm">
                        ▼
                      </span>
                    </summary>
                    <div className="mt-3 pt-3 border-t border-slate-100 text-sm md:text-base text-slate-600 leading-relaxed">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Section 13: Authoritative Sources & References */}
            <footer className="border-t border-slate-200 pt-8 space-y-3 text-xs text-slate-500">
              <h2 className="font-bold text-slate-700 text-sm">
                Authoritative Sources &amp; References
              </h2>
              <ul className="space-y-1.5 list-disc pl-5">
                <li>
                  <strong>U.S. Department of Energy (DOE) &amp; National Renewable Energy Laboratory (NREL):</strong>{" "}
                  <span className="italic">Battery Energy Storage System Technology Characteristics and Performance Metrics</span>.
                </li>
                <li>
                  <strong>ENERGY STAR &amp; U.S. Environmental Protection Agency (EPA):</strong>{" "}
                  <span className="italic">Residential Refrigerator Energy Testing Procedures, Annual kWh Consumption Data &amp; Duty Cycle Metrics</span>.
                </li>
                <li>
                  <strong>IEEE Standards Association:</strong>{" "}
                  <span className="italic">IEEE 485: Recommended Practice for Sizing Lead-Acid Batteries for Stationary Applications</span> &amp; <span className="italic">IEEE 1188: Recommended Practice for Maintenance and Testing of VRLA Batteries</span>.
                </li>
                <li>
                  <strong>National Fire Protection Association (NFPA):</strong>{" "}
                  <span className="italic">NFPA 70: National Electrical Code (NEC)</span>, Article 480 (Storage Batteries) &amp; Article 706 (Energy Storage Systems).
                </li>
                <li>
                  <strong>Battery University &amp; Cadex Electronics:</strong>{" "}
                  <span className="italic">BU-501: Basics About Discharging, Peukert&apos;s Law, and Inverter C-Rate Capacity Calculations</span>.
                </li>
                <li>
                  <strong>American Boat and Yacht Council (ABYC):</strong>{" "}
                  <span className="italic">Standard E-10: Storage Batteries</span> &amp; <span className="italic">Standard E-11: AC &amp; DC Electrical Systems on Boats</span> (Direct DC Circuit Protection and Overcurrent Fusing).
                </li>
              </ul>
            </footer>
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
