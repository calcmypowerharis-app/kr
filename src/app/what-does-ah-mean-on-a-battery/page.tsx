import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BatteryCharging,
  Zap,
  Plug,
  ArrowRight,
  ShieldAlert,
  Info,
  Sliders,
  Cpu,
  CheckCircle2,
  Clock,
  HelpCircle,
  Calculator,
  Flame,
  Thermometer,
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

export const metadata: Metadata = {
  title: "What Does Ah Mean on a Battery? Amp-Hours Explained",
  description:
    "Understand what Ah (Amp-hours) means on a battery, how to convert Ah to Watt-hours (Wh), and why usable battery runtime depends on chemistry and discharge rate.",
  alternates: {
    canonical: "https://calcmypower.com/what-does-ah-mean-on-a-battery",
  },
  openGraph: {
    title: "What Does Ah Mean on a Battery? Amp-Hours Explained | CalcMyPower",
    description:
      "A practical engineering guide explaining battery Amp-hour ratings, energy conversion to Watt-hours, depth of discharge, and real-world runtime factors.",
    url: "https://calcmypower.com/what-does-ah-mean-on-a-battery",
    type: "article",
    images: [
      {
        url: "https://calcmypower.com/images/articles/deep-cycle-battery-amp-hours.jpg",
        width: 1280,
        height: 720,
        alt: "12V 100Ah deep cycle battery on a workshop bench with multimeter test leads",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "What Does Ah Mean on a Battery? | CalcMyPower",
    description:
      "Demystify battery Amp-hour ratings, convert Ah to Watt-hours, and calculate real usable backup runtime.",
    images: [
      "https://calcmypower.com/images/articles/deep-cycle-battery-amp-hours.jpg",
    ],
  },
};

const BATTERY_AH_TOC_ITEMS: TocItem[] = [
  { id: "quick-answer", label: "Direct Answer: What Does Ah Mean?" },
  { id: "charge-vs-energy", label: "Charge vs. Energy: Ah vs. Wh vs. W vs. V" },
  { id: "ah-vs-amps", label: "Amp-Hours vs. Amps: Capacity vs. Flow" },
  { id: "why-voltage-matters", label: "Why Voltage Matters with Amp-Hours" },
  { id: "convert-ah-to-wh", label: "How to Convert Ah to Wh (Formulas)" },
  { id: "practical-12v-100ah-example", label: "Practical 12V 100Ah Worked Example" },
  { id: "why-actual-runtime-differs", label: "Why Delivered Runtime Differs from Math" },
  { id: "battery-chemistry-comparison", label: "Lead-Acid vs. AGM vs. LiFePO4 Comparison" },
  { id: "practical-applications", label: "Applications: UPS, RV & Solar Storage" },
  { id: "common-battery-sizing-mistakes", label: "Common Battery Sizing Mistakes" },
  { id: "calculator-bridge", label: "Interactive Battery Runtime Calculator" },
  { id: "battery-safety", label: "Battery Safety & Protection Guidelines" },
  { id: "faq", label: "Frequently Asked Questions" },
];

const FAQ_DATA = [
  {
    question: "What does Ah mean on a battery?",
    answer:
      "An Amp-hour (Ah) is a unit of electrical charge capacity that indicates how much current a battery can deliver continuously over a specified duration. Specifically, 1 Amp-hour represents a current flow of 1 Ampere sustained for exactly 1 hour, or 2 Amps for 30 minutes, or 0.5 Amps for 2 hours. It measures the total volume of electrical charge stored inside the battery chemistry.",
  },
  {
    question: "How many Watt-hours is a 100Ah battery?",
    answer:
      "To find total nominal Watt-hours (Wh), multiply the battery Amp-hour rating by its nominal operating voltage (Wh = Ah × V). A 12-volt 100Ah battery holds 1,200 nominal Watt-hours (12V × 100Ah = 1,200Wh). A 24-volt 100Ah battery holds 2,400 Watt-hours, and a 48-volt 100Ah battery bank holds 4,800 Watt-hours. Delivered usable energy will be lower based on chemistry depth of discharge and inverter efficiency.",
  },
  {
    question: "Can I replace a 50Ah battery with a 100Ah battery?",
    answer:
      "Yes, provided both batteries share the exact same nominal system voltage (such as replacing a 12V 50Ah battery with a 12V 100Ah battery) and your physical mounting tray, wiring terminals, and charger accommodate the larger pack. Increasing Amp-hours doubles your available operating runtime without altering the electrical voltage supplied to your connected equipment. Recharge duration will be proportionally longer unless you use a higher-output charger.",
  },
  {
    question: "Why does my battery run out faster than its Amp-hour rating suggests?",
    answer:
      "Three primary engineering factors reduce real-world delivered runtime compared to simple nameplate math: depth of discharge limitations (traditional flooded lead-acid batteries degrade rapidly if discharged beyond 50%), Peukert's law (high current discharge rates increase internal battery resistance and decrease available chemical capacity), and inverter conversion losses (converting 12V DC power to 120V AC household electricity wastes 8% to 15% as thermal heat).",
  },
  {
    question: "What is the difference between Ah and mAh?",
    answer:
      "Both units measure electrical charge capacity. One Amp-hour (Ah) equals exactly 1,000 milliamp-hours (mAh). Small consumer electronics, smartphone cells, and rechargeable AA batteries typically specify their charge capacity in mAh (for example, a 3,000mAh phone cell or a 2,500mAh NiMH AA battery). Larger deep-cycle marine, RV, UPS, and residential solar storage batteries specify capacity in Ah (such as 100Ah or 200Ah).",
  },
  {
    question: "Is a higher Ah rating always better for a battery?",
    answer:
      "A higher Ah rating provides longer operational runtime between charging cycles, but it also increases physical weight, exterior enclosure dimensions, recharge time, and initial equipment purchase cost. For vehicle starting batteries, Cold Cranking Amps (CCA) is far more critical than Ah capacity because engines require thousands of watts for only a few seconds. For deep-cycle solar, RV, and UPS applications, matching Ah capacity to your daily energy consumption and depth of discharge profile is the optimal engineering approach.",
  },
];

export default function BatteryAmpHoursExplainedPage() {
  const articleSchema = generateArticleSchema({
    headline: "What Does Ah Mean on a Battery? Amp-Hours Explained",
    description:
      "Understand what Ah (Amp-hours) means on a battery, how to convert Ah to Watt-hours (Wh), and why usable battery runtime depends on chemistry and discharge rate.",
    url: "https://calcmypower.com/what-does-ah-mean-on-a-battery",
    datePublished: "2026-09-28T00:00:00Z",
    dateModified: "2026-09-28T00:00:00Z",
    images: [
      "https://calcmypower.com/images/articles/deep-cycle-battery-amp-hours.jpg",
    ],
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    {
      name: "UPS Battery Backup Calculator",
      url: "https://calcmypower.com/ups-battery-backup-calculator",
    },
    {
      name: "What Does Ah Mean on a Battery?",
      url: "https://calcmypower.com/what-does-ah-mean-on-a-battery",
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
      <MobileArticleNavigator items={BATTERY_AH_TOC_ITEMS} />

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
            What Does Ah Mean on a Battery?
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
                  Battery Engineering
                </span>
                <span className="text-slate-400">•</span>
                <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>9 min read</span>
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500">Published September 2026</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                What Does Ah Mean on a Battery? Amp-Hours Explained
              </h1>

              <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-normal">
                Whether you are shopping for a home UPS battery backup, an RV house battery, a marine trolling motor pack, or an off-grid solar storage bank, the letters <strong>Ah</strong> are stamped across almost every label. Understanding what Amp-hours measure and why nominal Ah math does not guarantee real-world runtime is the key to sizing dependable backup power.
              </p>
            </header>

            {/* Hero Image */}
            <figure className="space-y-2">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
                <Image
                  src="/images/articles/deep-cycle-battery-amp-hours.jpg"
                  alt="12V 100Ah deep cycle battery on a workshop bench with multimeter test leads"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                />
              </div>
              <figcaption className="text-xs text-slate-500 text-center">
                A standard 12V 100Ah deep-cycle battery stores 1,200 nominal Watt-hours of energy, but usable runtime depends on chemistry depth of discharge and discharge current.
              </figcaption>
            </figure>

            {/* Section 1: Direct Answer */}
            <section id="quick-answer" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Direct Answer: What Does Ah Mean on a Battery?
              </h2>

              <p>
                <strong>Ah stands for Ampere-hour (or Amp-hour).</strong> It is a metric of electrical charge capacity that describes how much electric current a battery can deliver over time before reaching its discharged cutoff voltage.
              </p>

              <p>
                In practical terms, a 100Ah battery can theoretically deliver:
              </p>

              <ul className="list-disc pl-6 space-y-1.5 text-slate-700">
                <li><strong>5 Amps</strong> of continuous current for <strong>20 hours</strong> (5A × 20h = 100Ah)</li>
                <li><strong>10 Amps</strong> of continuous current for <strong>10 hours</strong> (10A × 10h = 100Ah)</li>
                <li><strong>20 Amps</strong> of continuous current for <strong>5 hours</strong> (20A × 5h = 100Ah)</li>
                <li><strong>100 Amps</strong> of continuous current for <strong>1 hour</strong> (100A × 1h = 100Ah)</li>
              </ul>

              {/* Direct AEO Summary Callout */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <h3>Three Core Facts About Battery Amp-Hours</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 block">1. Ah is Charge, Not Energy</span>
                    <p className="text-slate-600 leading-relaxed">
                      Amp-hours measure the total volume of electrical charge. To calculate actual work or energy (Watt-hours), you must multiply Ah by the battery operating voltage.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 block">2. Usable Ah Depends on Chemistry</span>
                    <p className="text-slate-600 leading-relaxed">
                      A lead-acid battery only provides roughly 50% safe depth of discharge (50 usable Ah per 100Ah pack), whereas Lithium Iron Phosphate (LiFePO4) safely yields 80% to 90% (80 to 90 usable Ah).
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 block">3. Discharge Speed Affects Delivery</span>
                    <p className="text-slate-600 leading-relaxed">
                      Lead-acid capacity ratings are standardized at a slow 20-hour rate (C/20). Heavy current draws trigger Peukert losses that cut delivered capacity by 20% to 40%.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Charge vs Energy */}
            <section id="charge-vs-energy" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Electric Charge vs. Electrical Energy: Ah vs. Wh vs. W vs. V
              </h2>

              <p>
                One of the most common sources of confusion in power planning is treating Amp-hours as a direct measurement of energy. Electrical physics defines four interrelated yet distinct measurements:
              </p>

              <div className="overflow-x-auto my-4">
                <table className="w-full text-left text-xs sm:text-sm border-collapse bg-white rounded-xl border border-slate-200">
                  <thead className="bg-slate-100 text-slate-900 border-b border-slate-200">
                    <tr>
                      <th className="p-3 font-bold">Metric</th>
                      <th className="p-3 font-bold">Unit Symbol</th>
                      <th className="p-3 font-bold">Physical Property</th>
                      <th className="p-3 font-bold">Water Pipe Analogy</th>
                      <th className="p-3 font-bold">Governing Formula</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Voltage</td>
                      <td className="p-3 font-mono font-bold text-blue-600">V (Volts)</td>
                      <td className="p-3">Electrical potential difference</td>
                      <td className="p-3">Water pressure in the pipe</td>
                      <td className="p-3 font-mono">V = P ÷ I</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Current</td>
                      <td className="p-3 font-mono font-bold text-blue-600">A (Amps)</td>
                      <td className="p-3">Rate of electron flow</td>
                      <td className="p-3">Gallons per minute flowing</td>
                      <td className="p-3 font-mono">I = P ÷ V</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Charge Capacity</td>
                      <td className="p-3 font-mono font-bold text-blue-600">Ah (Amp-hours)</td>
                      <td className="p-3">Total electric charge stored</td>
                      <td className="p-3">Total gallons passed through meter</td>
                      <td className="p-3 font-mono">Ah = I × t (hours)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Power</td>
                      <td className="p-3 font-mono font-bold text-blue-600">W (Watts)</td>
                      <td className="p-3">Instantaneous rate of work done</td>
                      <td className="p-3">Force turning a waterwheel right now</td>
                      <td className="p-3 font-mono">P = V × I</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Total Energy</td>
                      <td className="p-3 font-mono font-bold text-blue-600">Wh (Watt-hours)</td>
                      <td className="p-3">Total energy capacity / total work</td>
                      <td className="p-3">Total work done by the waterwheel</td>
                      <td className="p-3 font-mono">Wh = Ah × V</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                As the table demonstrates, <strong>Amp-hours tell you how much current can flow over time</strong>, but they say nothing about the pressure (voltage) driving that current. Without knowing the voltage, you cannot determine how much work the battery can actually perform. For a comprehensive walkthrough of electrical energy units and utility billing calculations, read our foundational guide on <Link href="/what-is-a-watt-hour" className="text-blue-600 font-semibold hover:underline">What Is a Watt-Hour (Wh)? Watts vs. Watt-Hours Explained</Link>.
              </p>
            </section>

            {/* Section 3: Ah vs Amps */}
            <section id="ah-vs-amps" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Amp-Hours vs. Amps: Capacity vs. Flow
              </h2>

              <p>
                People often use the terms <em>Amps</em> and <em>Amp-hours</em> interchangeably, but they represent two fundamentally different physical quantities:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5 text-base">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>Amps (A) = Speedometer</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Amperes measure instantaneous flow rate. An electric trolling motor drawing 25 Amps is pulling 25 Coulombs of charge per second right at this exact moment. If you switch the motor off, instantaneous Amps drop to zero immediately.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5 text-base">
                    <BatteryCharging className="w-4 h-4 text-emerald-600" />
                    <span>Amp-Hours (Ah) = Fuel Gauge</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Amp-hours measure cumulative stored volume over time. A 100Ah battery contains a reservoir of 100 Amp-hours. Running that 25-Amp motor consumes 25 Amp-hours every hour, which drains the full reservoir in 4 hours under ideal theoretical conditions.
                  </p>
                </div>
              </div>

              <p>
                Just as your vehicle speedometer (miles per hour) measures how fast you are moving while your fuel tank (gallons) dictates how far you can travel, Amps describe your current load demand and Amp-hours describe your battery storage reserve.
              </p>
            </section>

            {/* Section 4: Why Voltage Matters */}
            <section id="why-voltage-matters" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Why Voltage Matters: The Hidden Half of the Equation
              </h2>

              <p>
                Comparing two batteries based solely on their Amp-hour rating can lead to catastrophic sizing errors if the batteries operate at different voltages. Consider this comparison:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm space-y-2">
                  <div className="font-bold text-slate-900 text-base">
                    Example: AA Rechargeable Cell vs. 12V Deep Cycle Marine Battery vs. 48V Solar Bank
                  </div>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600">•</span>
                      <span>
                        <strong>Rechargeable AA Cell:</strong> Rated at 2.5Ah (2,500mAh) at 1.2 Volts. Total stored energy: <strong>3 Watt-hours</strong> (1.2V × 2.5Ah = 3Wh).
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600">•</span>
                      <span>
                        <strong>12V 100Ah Deep-Cycle Battery:</strong> Rated at 100Ah at 12 Volts. Total stored energy: <strong>1,200 Watt-hours</strong> (12V × 100Ah = 1,200Wh).
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600">•</span>
                      <span>
                        <strong>48V 100Ah Server Rack Battery:</strong> Rated at 100Ah at 48 Volts. Total stored energy: <strong>4,800 Watt-hours</strong> (48V × 100Ah = 4,800Wh).
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <p>
                Notice that both the 12V marine battery and the 48V server rack battery share the exact same <strong>100Ah</strong> label on their faceplates. However, because the server rack battery operates at four times the electrical potential (48V vs. 12V), it contains <strong>four times as much total energy</strong> (4,800Wh vs. 1,200Wh).
              </p>

              <p className="font-semibold text-slate-800">
                Rule of thumb: Never compare battery capacity in Amp-hours unless you have first verified that both systems operate at the identical nominal voltage.
              </p>
            </section>

            {/* Section 5: Convert Ah to Wh */}
            <section id="convert-ah-to-wh" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                How to Convert Amp-Hours to Watt-Hours (Formulas &amp; Math)
              </h2>

              <p>
                Because household appliances, power tools, electronics, and inverters rate their power consumption in <strong>Watts</strong> (or Watt-hours over time), converting battery Amp-hours to Watt-hours is necessary for any accurate runtime calculation.
              </p>

              {/* Formula Card */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-4 shadow-md">
                <div className="text-xs uppercase tracking-wider text-blue-400 font-bold">
                  Governing Energy Conversion Formulas
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
                    <span className="text-xs text-slate-400 block">Convert Ah to Watt-Hours:</span>
                    <div className="text-xl sm:text-2xl font-mono font-bold text-emerald-400">
                      Wh = Ah × V
                    </div>
                    <span className="text-xs text-slate-400 block pt-1">
                      Watt-hours = Amp-hours × Nominal Voltage
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
                    <span className="text-xs text-slate-400 block">Convert Watt-Hours to Ah:</span>
                    <div className="text-xl sm:text-2xl font-mono font-bold text-blue-400">
                      Ah = Wh ÷ V
                    </div>
                    <span className="text-xs text-slate-400 block pt-1">
                      Amp-hours = Watt-hours ÷ Nominal Voltage
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h3 className="font-bold text-slate-900 text-lg">
                  Common Nominal Battery Conversion Reference Table
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Here is how standard commercial battery capacities translate from Amp-hours to nominal stored energy in Watt-hours and kilowatt-hours (kWh):
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse bg-white rounded-xl border border-slate-200">
                    <thead className="bg-slate-100 text-slate-900 border-b border-slate-200">
                      <tr>
                        <th className="p-3 font-bold">System Voltage</th>
                        <th className="p-3 font-bold">Rated Amp-Hours (Ah)</th>
                        <th className="p-3 font-bold">Nominal Watt-Hours (Wh)</th>
                        <th className="p-3 font-bold">Kilowatt-Hours (kWh)</th>
                        <th className="p-3 font-bold">Typical Application</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700">
                      <tr>
                        <td className="p-3 font-semibold">12V DC</td>
                        <td className="p-3 font-mono">50 Ah</td>
                        <td className="p-3 font-mono font-bold text-slate-900">600 Wh</td>
                        <td className="p-3 font-mono">0.60 kWh</td>
                        <td className="p-3">Small UPS, kayak trolling motor, portable cooler</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold">12V DC</td>
                        <td className="p-3 font-mono">100 Ah</td>
                        <td className="p-3 font-mono font-bold text-slate-900">1,200 Wh</td>
                        <td className="p-3 font-mono">1.20 kWh</td>
                        <td className="p-3">Standard RV house battery, marine deep-cycle, desk UPS</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold">12V DC</td>
                        <td className="p-3 font-mono">200 Ah</td>
                        <td className="p-3 font-mono font-bold text-slate-900">2,400 Wh</td>
                        <td className="p-3 font-mono">2.40 kWh</td>
                        <td className="p-3">Camper van boondocking, off-grid cabin lighting</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold">24V DC</td>
                        <td className="p-3 font-mono">100 Ah</td>
                        <td className="p-3 font-mono font-bold text-slate-900">2,400 Wh</td>
                        <td className="p-3 font-mono">2.40 kWh</td>
                        <td className="p-3">Medium off-grid solar system, floor scrubbers</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold">48V DC</td>
                        <td className="p-3 font-mono">100 Ah</td>
                        <td className="p-3 font-mono font-bold text-slate-900">4,800 Wh</td>
                        <td className="p-3 font-mono">4.80 kWh</td>
                        <td className="p-3">Whole-home solar storage, telecom server rack backup</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Section 6: Practical 12V 100Ah Worked Example */}
            <section id="practical-12v-100ah-example" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Practical 12V 100Ah Worked Example: Nominal vs. Delivered Power
              </h2>

              <p>
                Let us examine the single most common battery setup in North America: a <strong>12V 100Ah deep-cycle battery</strong> powering household AC electronics through an inverter.
              </p>

              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
                <div className="font-bold text-blue-900 text-base flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  <span>The Theoretical Math</span>
                </div>
                <p className="text-sm text-blue-900 leading-relaxed font-mono">
                  12 Volts × 100 Amp-hours = 1,200 Watt-hours (Wh)
                </p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  If you connect a 100-Watt appliance (such as an office computer monitor, internet router, and LED desk lamp), simple theoretical division suggests:
                </p>
                <p className="text-sm text-blue-900 font-mono font-bold">
                  1,200 Watt-hours ÷ 100 Watts = 12 Hours of Runtime
                </p>
              </div>

              <p className="font-bold text-slate-900 text-lg">
                In real life, will that battery actually run the 100W load for 12 hours?
              </p>

              <p>
                <strong>No. In the real world, you will never get 12 hours of runtime from a 12V 100Ah battery running a 100W load.</strong> Depending on the internal battery chemistry, your delivered runtime will range from roughly 5.1 hours to 9.2 hours. Here is why the numbers diverge.
              </p>
            </section>

            {/* Section 7: Why Actual Runtime Differs */}
            <section id="why-actual-runtime-differs" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Why Delivered Battery Runtime Differs from Nameplate Math
              </h2>

              <p>
                When sizing any energy storage system, five physical engineering factors determine how much of that theoretical 1,200Wh capacity you can extract:
              </p>

              <div className="space-y-4 pt-2">
                {/* Factor 1: Depth of Discharge */}
                <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-base">
                      1. Depth of Discharge (DoD) Limits
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      Major Factor
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Depth of Discharge indicates what percentage of a battery capacity can be safely discharged without damaging the internal cell plates.
                  </p>
                  <ul className="text-xs sm:text-sm text-slate-700 space-y-1 list-disc pl-5">
                    <li>
                      <strong>Flooded Lead-Acid &amp; Sealed AGM:</strong> Standard safe DoD is <strong>50%</strong>. Discharging a lead-acid battery deeper than 50% causes irreversible lead sulfate crystallization (sulfation) on the negative plates, permanently destroying cycle life. That means a 100Ah lead-acid battery provides only <strong>50 usable Amp-hours (600 usable Watt-hours)</strong>.
                    </li>
                    <li>
                      <strong>Lithium Iron Phosphate (LiFePO4):</strong> Modern lithium deep-cycle batteries can safely sustain <strong>80% to 90%</strong> DoD every cycle without rapid degradation. A 100Ah LiFePO4 battery delivers <strong>80 to 90 usable Amp-hours (960 to 1,080 usable Watt-hours)</strong>.
                    </li>
                  </ul>
                </div>

                {/* Factor 2: Peukert Effect */}
                <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-base">
                      2. Peukert&apos;s Law &amp; Discharge Rate (C-Rating)
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                      Discharge Rate
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Discovered by German scientist Wilhelm Peukert in 1897, Peukert&apos;s Law states that as the rate of discharge increases, the available capacity of a lead-acid battery decreases non-linearly.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Lead-acid batteries are rated at the <strong>20-hour rate (C/20)</strong>. A 100Ah battery earns that 100Ah rating only if discharged over 20 hours (a tiny 5-Amp load). If you connect a heavy 50-Amp load (such as a 600W microwave or inverter load), internal electrolyte diffusion cannot keep pace with the chemical reaction, and internal resistance rises. At that discharge rate, a 100Ah lead-acid battery may deliver only <strong>60 to 70 total Amp-hours</strong> before its voltage collapses.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <strong>Lithium Advantage:</strong> LiFePO4 cells have a Peukert exponent of roughly 1.02 to 1.05 (nearly ideal), meaning they deliver virtually their entire rated capacity whether discharged slowly over 20 hours or rapidly over 1 hour.
                  </p>
                </div>

                {/* Factor 3: Inverter Efficiency */}
                <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-base">
                      3. Inverter DC-to-AC Conversion Losses
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                      8% to 15% Loss
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Batteries store direct current (DC). To run standard 120-volt household AC loads, you must route battery power through an inverter. High-quality pure sine wave inverters operate at <strong>85% to 92% efficiency</strong>. The remaining 8% to 15% is converted into thermal heat by internal transformers, MOSFET switching circuits, and cooling fans.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 font-mono">
                    Example: Powering a 100W load at 85% inverter efficiency draws: 100W ÷ 0.85 = 117.6W from the battery.
                  </p>
                </div>

                {/* Factor 4: Temperature */}
                <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-base">
                      4. Ambient Operating Temperature
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-cyan-100 text-cyan-800">
                      Thermal Factor
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Battery capacity is universally rated at <strong>77°F (25°C)</strong>. As temperature drops, chemical kinetics inside the electrolyte slow down significantly:
                  </p>
                  <ul className="text-xs sm:text-sm text-slate-700 space-y-1 list-disc pl-5">
                    <li>At <strong>32°F (0°C)</strong>, a lead-acid battery loses roughly 20% to 25% of its rated capacity.</li>
                    <li>At <strong>-4°F (-20°C)</strong>, lead-acid capacity can drop by 50% or more.</li>
                    <li>
                      <strong>Lithium Low-Temp Warning:</strong> Standard LiFePO4 batteries deliver good discharge performance down to 14°F (-10°C), but <em>they must never be charged below 32°F (0°C)</em> without internal heating pads or Battery Management System (BMS) low-temperature charge protection, as charging below freezing causes permanent lithium metal plating and short-circuits.
                    </li>
                  </ul>
                </div>

                {/* Factor 5: Voltage Sag & Inverter Cutoff */}
                <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-base">
                      5. Terminal Voltage Sag &amp; Low-Voltage Disconnect (LVD)
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                      Cutoff Limit
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under high electrical loads, internal cell resistance causes the terminal voltage to drop momentarily (voltage sag). Inverters have an automatic Low-Voltage Disconnect (typically set between 10.5V and 11.0V for 12V systems) to prevent over-discharging the battery. If a sudden surge load causes terminal voltage to dip below the LVD threshold, the inverter will shut down immediately, even if chemical charge remains inside the battery cells.
                  </p>
                </div>
              </div>

              {/* Realistic Runtime Calculation Summary */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-3 mt-6">
                <div className="text-xs uppercase tracking-wider text-emerald-400 font-bold">
                  The Realistic Runtime Comparison for a 100W Load on a 12V 100Ah Battery
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 space-y-2">
                    <div className="font-bold text-slate-100 text-base">
                      Lead-Acid / AGM Battery (50% DoD)
                    </div>
                    <ul className="space-y-1 text-slate-300 font-mono text-xs">
                      <li>Nominal Energy: 1,200 Wh</li>
                      <li>Safe Usable Energy (50%): 600 Wh</li>
                      <li>Inverter Efficiency (85%): 600 × 0.85 = 510 Wh</li>
                      <li>Actual 100W Load Runtime: 510 ÷ 100 = <strong>5.1 Hours</strong></li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 space-y-2">
                    <div className="font-bold text-slate-100 text-base">
                      LiFePO4 Lithium Battery (90% DoD)
                    </div>
                    <ul className="space-y-1 text-slate-300 font-mono text-xs">
                      <li>Nominal Energy: 1,200 Wh</li>
                      <li>Safe Usable Energy (90%): 1,080 Wh</li>
                      <li>Inverter Efficiency (85%): 1,080 × 0.85 = 918 Wh</li>
                      <li>Actual 100W Load Runtime: 918 ÷ 100 = <strong>9.2 Hours</strong></li>
                    </ul>
                  </div>
                </div>

                <p className="text-xs text-slate-400 pt-1">
                  Notice that the LiFePO4 battery provides <strong>nearly 80% longer real-world runtime</strong> (9.2 hours vs. 5.1 hours) from the exact same 100Ah faceplate rating because of higher usable depth of discharge and reduced voltage sag.
                </p>
              </div>
            </section>

            {/* Section 8: Battery Chemistry Comparison */}
            <section id="battery-chemistry-comparison" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Battery Chemistry Comparison: Lead-Acid vs. AGM vs. LiFePO4
              </h2>

              <p>
                Not all Amp-hours are created equal. When evaluating battery capacity for UPS backups, RV boondocking, or solar storage, the underlying chemistry dictates how much of that capacity you can use, how many years the pack will survive, and how much the battery weighs.
              </p>

              <div className="overflow-x-auto my-4">
                <table className="w-full text-left text-xs sm:text-sm border-collapse bg-white rounded-xl border border-slate-200">
                  <thead className="bg-slate-100 text-slate-900 border-b border-slate-200">
                    <tr>
                      <th className="p-3 font-bold">Parameter</th>
                      <th className="p-3 font-bold">Flooded Lead-Acid</th>
                      <th className="p-3 font-bold">Sealed AGM / Gel</th>
                      <th className="p-3 font-bold">Lithium Iron Phosphate (LiFePO4)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Recommended Safe DoD</td>
                      <td className="p-3 font-mono">50%</td>
                      <td className="p-3 font-mono">50% to 60%</td>
                      <td className="p-3 font-mono font-bold text-emerald-600">80% to 95%</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Usable Energy per 100Ah (12V)</td>
                      <td className="p-3 font-mono">600 Wh</td>
                      <td className="p-3 font-mono">600 to 720 Wh</td>
                      <td className="p-3 font-mono font-bold text-emerald-600">960 to 1,140 Wh</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Cycle Life (to 80% original cap)</td>
                      <td className="p-3">300 to 500 cycles</td>
                      <td className="p-3">500 to 800 cycles</td>
                      <td className="p-3 font-bold text-emerald-600">3,000 to 5,000+ cycles</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Typical Weight (12V 100Ah)</td>
                      <td className="p-3">60 to 68 lbs</td>
                      <td className="p-3">62 to 72 lbs</td>
                      <td className="p-3 font-bold text-emerald-600">24 to 28 lbs</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Peukert Sensitivity</td>
                      <td className="p-3 text-red-600 font-semibold">High (1.20 to 1.30)</td>
                      <td className="p-3 text-amber-600 font-semibold">Moderate (1.15 to 1.25)</td>
                      <td className="p-3 text-emerald-600 font-semibold">Very Low (1.02 to 1.05)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Round-Trip Efficiency</td>
                      <td className="p-3 font-mono">75% to 80%</td>
                      <td className="p-3 font-mono">80% to 85%</td>
                      <td className="p-3 font-mono font-bold text-emerald-600">92% to 98%</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Routine Maintenance</td>
                      <td className="p-3">Distilled water refilling required</td>
                      <td className="p-3">Maintenance-free sealed</td>
                      <td className="p-3">Maintenance-free sealed + BMS</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Off-Gassing / Ventilation</td>
                      <td className="p-3 text-amber-700">Releases explosive H2 gas</td>
                      <td className="p-3">VRLA sealed, rare off-gas</td>
                      <td className="p-3 font-bold text-emerald-600">Zero off-gassing (safe indoors)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 9: Practical Applications */}
            <section id="practical-applications" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Practical System Applications: UPS, RV Boondocking &amp; Solar
              </h2>

              <p>
                Depending on how you use your battery system, calculating your required Amp-hours involves different operational workflows:
              </p>

              <div className="space-y-4 pt-2">
                {/* Application 1: UPS Backup */}
                <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs">
                  <div className="font-bold text-slate-900 flex items-center gap-2 text-base">
                    <Cpu className="w-5 h-5 text-blue-600" />
                    <span>1. Uninterruptible Power Supply (UPS) Runtime</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Most standard consumer UPS units use small sealed lead-acid (SLA) batteries rated between 7Ah and 9Ah at 12V. A 12V 9Ah battery contains roughly 108 nominal Watt-hours. Discharging it at 50% DoD gives 54 usable Watt-hours. Running a 150-Watt desktop computer workstation through an 85% efficient inverter consumes approximately 176 Watts from the battery, yielding about 18 minutes of backup runtime (54Wh ÷ 176W × 60 min ≈ 18 min).
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Upgrading to an external 100Ah LiFePO4 battery bank increases usable energy to over 900Wh, extending your emergency computer and networking runtime from 18 minutes to more than 5 hours.
                  </p>
                </div>

                {/* Application 2: RV Boondocking */}
                <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs">
                  <div className="font-bold text-slate-900 flex items-center gap-2 text-base">
                    <Sliders className="w-5 h-5 text-indigo-600" />
                    <span>2. RV &amp; Camper Van Boondocking DC Budgets</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    RV electrical systems are typically planned using daily DC Amp-hour budgets. For example:
                  </p>
                  <ul className="text-xs sm:text-sm text-slate-700 space-y-1 list-disc pl-5">
                    <li>12V Compressor Refrigerator: 3.5 Amps running at 40% duty cycle = 33.6 Ah/day</li>
                    <li>RV Furnace Blower Fan: 6.0 Amps running for 4 hours/night = 24.0 Ah/day</li>
                    <li>LED Interior Lights &amp; Water Pump: 15.0 Ah/day</li>
                    <li>Phone and Laptop Charging via Inverter: 20.0 Ah/day</li>
                    <li><strong>Total Daily Demand:</strong> Approximately <strong>92.6 Ah per day at 12V</strong></li>
                  </ul>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    With a traditional lead-acid battery setup (50% DoD), you would need at least <strong>two 100Ah batteries (200Ah total)</strong> just to survive a single 24-hour period off-grid. With a single 100Ah LiFePO4 battery (providing 90 usable Ah), you can cover almost the entire day from a single lightweight pack.
                  </p>
                </div>

                {/* Application 3: Solar Storage Bank */}
                <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs">
                  <div className="font-bold text-slate-900 flex items-center gap-2 text-base">
                    <Zap className="w-5 h-5 text-amber-500" />
                    <span>3. Off-Grid Solar Energy Storage Bank</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    When sizing solar battery banks, your daily solar panel generation must balance your battery Amp-hour storage capacity. A 400-Watt rooftop solar array operating in an area with 5 peak sun hours produces roughly 2,000 Watt-hours of gross energy per day (400W × 5h = 2,000Wh). Accounting for charge controller conversion losses (roughly 10%), that array delivers approximately 1,800Wh into a 12V battery bank, which equals 150 Amp-hours of daily charging current (1,800Wh ÷ 12V = 150Ah).
                  </p>
                </div>
              </div>
            </section>

            {/* Section 10: Common Sizing Mistakes */}
            <section id="common-battery-sizing-mistakes" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Common Battery Sizing Mistakes to Avoid
              </h2>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm space-y-1">
                  <span className="font-bold text-amber-900 text-sm block">
                    Mistake 1: Confusing Starting Batteries (CCA) with Deep-Cycle Batteries (Ah)
                  </span>
                  <p className="text-amber-800 leading-relaxed">
                    Automotive starting batteries have thin, porous lead sponge plates designed to deliver massive burst current (Cold Cranking Amps or CCA) for 3 to 5 seconds to spin an internal combustion engine. They are not rated in Amp-hours and will fail rapidly if used for continuous UPS, RV, or solar power. Deep-cycle batteries use thick, solid lead plates or lithium chemistry designed for steady, sustained current discharge over hours.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm space-y-1">
                  <span className="font-bold text-amber-900 text-sm block">
                    Mistake 2: Discharging Lead-Acid Batteries Down to 0%
                  </span>
                  <p className="text-amber-800 leading-relaxed">
                    A completely drained lead-acid battery does not measure 0 Volts; an open-circuit voltage below 10.5V indicates a 100% discharged battery. Repeatedly running a lead-acid battery past 50% DoD causes permanent sulfation that can destroy the battery in as few as 50 to 100 cycles instead of the expected 500 cycles.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm space-y-1">
                  <span className="font-bold text-amber-900 text-sm block">
                    Mistake 3: Forgetting Inverter No-Load Idle Consumption
                  </span>
                  <p className="text-amber-800 leading-relaxed">
                    Even when no appliances are plugged in or active, an inverter remains powered and consumes continuous background idle current (typically 1.0 to 2.5 Amps at 12V DC, or 12W to 30W). Leaving an inverter turned on 24 hours a day drains 24 to 60 Amp-hours from your battery bank just running the inverter idle circuitry.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm space-y-1">
                  <span className="font-bold text-amber-900 text-sm block">
                    Mistake 4: Mismatching Series and Parallel Battery Wiring
                  </span>
                  <p className="text-amber-800 leading-relaxed">
                    Wiring two identical 12V 100Ah batteries in <strong>parallel</strong> (positive to positive, negative to negative) maintains 12 Volts and doubles capacity to <strong>200Ah</strong> (2,400Wh). Wiring two identical 12V 100Ah batteries in <strong>series</strong> (positive of one to negative of the other) doubles voltage to <strong>24 Volts</strong> while capacity remains <strong>100Ah</strong> (2,400Wh). Total stored energy is identical in both configurations, but the electrical voltage is completely different.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 11: Interactive Calculator Bridge */}
            <section id="calculator-bridge" className="space-y-4 scroll-mt-24">
              <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-lg border border-blue-800">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-300">
                  <Calculator className="w-4 h-4 text-emerald-400" />
                  <span>Free Engineering Calculator</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Calculate Your Exact Battery Backup Run-Time Hours
                </h2>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                  Skip the manual math. Our interactive UPS Battery Backup Calculator uses published engineering formulas to factor in appliance wattage, battery voltage, Amp-hour capacity, chemistry depth of discharge (DoD), and inverter conversion efficiency.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/ups-battery-backup-calculator"
                    className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm inline-flex items-center gap-2 transition shadow-md"
                  >
                    <span>Open UPS Battery Runtime Calculator</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/watts-to-amps-calculator"
                    className="px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold text-sm inline-flex items-center gap-2 transition border border-slate-700"
                  >
                    <span>Watts to Amps Calculator</span>
                  </Link>

                  <Link
                    href="/amps-to-watts-calculator"
                    className="px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold text-sm inline-flex items-center gap-2 transition border border-slate-700"
                  >
                    <span>Amps to Watts Calculator</span>
                  </Link>
                </div>
              </div>
            </section>

            {/* Section 12: Battery Safety */}
            <section id="battery-safety" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Battery Safety, Overcurrent Protection &amp; Ventilation
              </h2>

              <p>
                Working with high-capacity battery systems presents genuine physical and electrical safety hazards. A standard 12V 100Ah lead-acid or lithium battery can discharge thousands of Amps instantaneously if dead-shorted, creating intense electrical arc flashes, melting metal tools, and triggering fires.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 space-y-2">
                  <div className="font-bold text-red-900 flex items-center gap-1.5 text-base">
                    <ShieldAlert className="w-4 h-4 text-red-600" />
                    <span>Overcurrent Protection (Fusing)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-red-900 leading-relaxed">
                    Always install a high-interrupting-capacity fuse (such as a Class T or MRBF terminal fuse) on the positive cable as close as physically possible to the battery terminal (within 7 inches per ABYC and NEC guidelines). Class T fuses can safely interrupt 20,000 Amps DC without arcing over.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
                  <div className="font-bold text-amber-900 flex items-center gap-1.5 text-base">
                    <Flame className="w-4 h-4 text-amber-600" />
                    <span>Hydrogen Ventilation (Lead-Acid)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                    Flooded lead-acid batteries emit flammable hydrogen gas during charging. They must always be mounted in a dedicated battery box vented to the outdoors. Never charge flooded lead-acid batteries inside living quarters, unventilated closets, or sealed camper compartments.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-2">
                  <div className="font-bold text-blue-900 flex items-center gap-1.5 text-base">
                    <Cpu className="w-4 h-4 text-blue-600" />
                    <span>Battery Management System (BMS)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-blue-900 leading-relaxed">
                    Never use lithium batteries that lack an internal or external Battery Management System. The BMS protects the cells against over-charging, over-discharging, over-current short circuits, high temperatures, and low-temperature charging.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5 text-base">
                    <Thermometer className="w-4 h-4 text-slate-700" />
                    <span>Proper Cable Gauge Sizing</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Low DC voltages require thick copper conductors to carry high amperage safely without hazardous voltage drop and cable heating. For example, a 1,000-Watt inverter on a 12V battery pulls roughly 100 Amps DC, requiring heavy 2 AWG or 1/0 AWG battery cables.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 13: FAQ Section */}
            <section id="faq" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Frequently Asked Questions
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Clear, practical answers to common questions about battery Amp-hour ratings and runtime calculations.
                </p>
              </div>

              <div className="space-y-4">
                {FAQ_DATA.map((faq, index) => (
                  <details
                    key={index}
                    className="group bg-white rounded-2xl border border-slate-200 p-5 open:shadow-xs transition space-y-2"
                  >
                    <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between gap-4 text-base sm:text-lg">
                      <span>{faq.question}</span>
                      <span className="text-slate-400 group-open:rotate-180 transition-transform duration-200 shrink-0">
                        ▾
                      </span>
                    </summary>
                    <p className="text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            {/* Section 14: Related Power & Sizing Tools */}
            <section className="space-y-4 border-t border-slate-200 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Related Power, Battery Backup &amp; Sizing Tools
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Explore companion calculators and residential power guides on CalcMyPower:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <Link
                  href="/ups-battery-backup-calculator"
                  className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-2"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                    <BatteryCharging className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition">
                    UPS Battery Backup Run-Time Calculator
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Calculate exact runtime hours from appliance wattage, battery voltage, and Amp-hour capacity.
                  </p>
                </Link>

                <Link
                  href="/watts-to-amps-calculator"
                  className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-2"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition">
                    Watts to Amps Electrical Calculator
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Convert appliance Watts to DC current Amperes to size battery cables and fuses.
                  </p>
                </Link>

                <Link
                  href="/amps-to-watts-calculator"
                  className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-2"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition">
                    Amps to Watts Electrical Calculator
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Convert circuit current in Amperes to real electrical power (Watts) and apparent power (VA).
                  </p>
                </Link>

                <Link
                  href="/what-is-a-watt-hour"
                  className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-2"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition">
                    What Is a Watt-Hour (Wh)?
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Learn how power over time translates to energy consumption, utility billing (kWh), and battery runtime.
                  </p>
                </Link>

                <Link
                  href="/what-size-generator-do-i-need-for-my-house"
                  className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-2"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                    <Plug className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition">
                    What Size Generator Do I Need for My House?
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Complete residential backup sizing guide covering furnace blowers, sump pumps, and transfer switches.
                  </p>
                </Link>
              </div>
            </section>

            {/* Section 15: Authoritative Sources & References */}
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
                  <strong>IEEE Standards Association:</strong>{" "}
                  <span className="italic">IEEE 485: Recommended Practice for Sizing Lead-Acid Batteries for Stationary Applications</span> &amp; <span className="italic">IEEE 1188: Recommended Practice for Maintenance, Testing, and Replacement of Valve-Regulated Lead-Acid (VRLA) Batteries</span>.
                </li>
                <li>
                  <strong>Battery University &amp; Cadex Electronics:</strong>{" "}
                  <span className="italic">BU-501: Basics About Discharging, Peukert&apos;s Law, and C-Rate Capacity Formulations</span>.
                </li>
                <li>
                  <strong>National Fire Protection Association (NFPA):</strong>{" "}
                  <span className="italic">NFPA 70: National Electrical Code (NEC)</span>, Article 480 (Storage Batteries) &amp; Article 706 (Energy Storage Systems).
                </li>
                <li>
                  <strong>American Boat and Yacht Council (ABYC):</strong>{" "}
                  <span className="italic">Standard E-10: Storage Batteries</span> &amp; <span className="italic">Standard E-11: AC &amp; DC Electrical Systems on Boats</span> (Battery Fusing &amp; Venting Requirements).
                </li>
              </ul>
            </footer>
          </article>

          {/* Desktop Sticky Sidebar (4 cols on lg) */}
          <aside className="hidden lg:block lg:col-span-4">
            <TableOfContents items={BATTERY_AH_TOC_ITEMS} />
          </aside>
        </div>
      </div>
    </>
  );
}
