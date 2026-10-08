import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
import {
  Clock,
  Zap,
  ArrowRight,
  ShieldAlert,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Calculator,
  Battery,
  Sliders,
  Scale,
  Gauge,
  HelpCircle,
  BookOpen,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How Many Amp Hours Do I Need for a Battery Bank? Sizing Guide",
  description:
    "Learn how to calculate how many amp-hours (Ah) you need for a battery bank. Calculate daily watt-hours, battery voltage, autonomy days, depth of discharge, and inverter losses.",
  alternates: {
    canonical: "https://calcmypower.com/how-many-amp-hours-do-i-need",
  },
  openGraph: {
    title:
      "How Many Amp Hours Do I Need for a Battery Bank? Sizing Guide | CalcMyPower",
    description:
      "Calculate how many amp-hours (Ah) your battery bank needs. Step-by-step formula covering daily Watt-hours, system voltage, autonomy days, depth of discharge, and inverter losses.",
    url: "https://calcmypower.com/how-many-amp-hours-do-i-need",
    type: "article",
    images: [
      {
        url: "https://calcmypower.com/images/articles/how-many-amp-hours-battery-bank-sizing.webp",
        width: 1200,
        height: 675,
        alt: "Battery bank sizing workflow diagram showing 5 engineering calculation steps from daily load watts to required amp-hours",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "How Many Amp Hours Do I Need for a Battery Bank? Sizing Guide | CalcMyPower",
    description:
      "Calculate how many amp-hours (Ah) your battery bank needs. Step-by-step formula covering daily Watt-hours, system voltage, autonomy days, depth of discharge, and inverter losses.",
    images: [
      "https://calcmypower.com/images/articles/how-many-amp-hours-battery-bank-sizing.webp",
    ],
  },
};

const TOC_ITEMS: TocItem[] = [
  { id: "quick-answer", label: "Direct Answer & Master Sizing Formula" },
  { id: "what-ah-represents", label: "What Battery Bank Amp-Hours Actually Represent" },
  { id: "step-1-daily-watt-hours", label: "Step 1: Calculate Total Daily Load (Watt-Hours)" },
  { id: "step-2-convert-to-ah", label: "Step 2: Convert Energy to Base Amp-Hours" },
  { id: "step-3-autonomy-days", label: "Step 3: Account for Backup & Autonomy Days" },
  { id: "step-4-depth-of-discharge", label: "Step 4: Account for Usable Depth of Discharge" },
  { id: "step-5-inverter-efficiency", label: "Step 5: Account for Inverter & Wiring Losses" },
  { id: "worked-examples", label: "4 Real-World Sizing Scenarios (12V, 24V, 48V)" },
  { id: "12v-vs-24v-vs-48v", label: "Why 100Ah at 12V Is Not 100Ah at 24V or 48V" },
  { id: "series-vs-parallel", label: "Series vs. Parallel Battery Bank Wiring" },
  { id: "battery-quantity", label: "How Many Physical Batteries Do You Need?" },
  { id: "common-mistakes", label: "5 Common Battery Sizing Mistakes" },
  { id: "when-simple-ah-fails", label: "When Simple Ah Math Is Not Enough (C-Rate, Temp, BMS)" },
  { id: "interactive-calculator", label: "Interactive Battery Capacity Calculator" },
  { id: "faq", label: "Frequently Asked Questions" },
  { id: "sources", label: "Authoritative References" },
];

const FAQ_DATA = [
  {
    question: "How many amp-hours do I need for a 1,000 Watt inverter?",
    answer:
      "A 1,000W inverter running at full load on a 12V battery system draws approximately 98 Amps of continuous DC current (1,000W / (12V * 0.85 efficiency)). To run this 1,000W load for 2 continuous hours, you consume roughly 2,350 DC Watt-hours or 196 Ah at 12V. Accounting for an 85% usable depth of discharge, you need a minimum 230Ah 12V lithium (LiFePO4) battery bank, or roughly a 400Ah 12V lead-acid battery bank (limited to 50% depth of discharge).",
  },
  {
    question: "How many amp-hours do I need to run a household refrigerator?",
    answer:
      "A standard residential refrigerator consumes roughly 1,000 to 1,500 Watt-hours (Wh) per day, taking into account compressor cycling. On a 12V battery bank with an 85% efficient inverter and an 80% usable depth of discharge, 1,200 Wh per day requires: 1,200 Wh / (12V * 0.80 * 0.85) = 147 Ah of nominal battery bank capacity for 24 hours of backup without solar or grid recharging.",
  },
  {
    question: "Can I mix different Amp-hour battery sizes in the same bank?",
    answer:
      "No. You should never mix batteries of different Amp-hour capacities, different ages, or different chemistries within the same bank. In parallel strings, batteries with unequal internal resistance experience circulating balance currents, causing one unit to overcharge while the other undercharges. In series strings, the lower-capacity battery fully discharges first, risking cell reversal, thermal stress, and premature failure.",
  },
  {
    question: "Why is a 24V or 48V battery bank better for larger power systems?",
    answer:
      "Because power equals voltage multiplied by current (P = V * I), doubling the system voltage cuts operating current in half for the exact same wattage. Operating a 3,000W inverter on 12V requires roughly 294 Amps DC, demanding very thick 4/0 AWG copper cables. On a 48V system, that same 3,000W load requires only 74 Amps DC, which uses lighter 4 AWG wire, reduces I2R resistive heat losses, and improves overall system efficiency.",
  },
  {
    question: "How do I determine the usable depth of discharge of my battery?",
    answer:
      "Usable depth of discharge (DoD) is established by the battery manufacturer specification sheet. Deep-cycle lithium iron phosphate (LiFePO4) batteries are commonly rated for 80% to 90% usable depth of discharge while still delivering 3,000 to 5,000 cycles. Sealed AGM and flooded lead-acid deep-cycle batteries are typically sized for a maximum 50% depth of discharge under daily cycling to avoid rapid plate sulfation and early capacity loss.",
  },
  {
    question: "What is the difference between battery Amp-hours and Watt-hours?",
    answer:
      "Amp-hours (Ah) measure electric charge capacity at a specific nominal voltage, while Watt-hours (Wh) measure actual stored energy independent of voltage. To convert Ah to Wh, multiply Amp-hours by the nominal voltage (Wh = Ah * Volts). For example, a 12V 100Ah battery contains 1,200 Wh of energy, whereas a 48V 100Ah battery contains 4,800 Wh of energy, four times as much stored work capability.",
  },
];

export default function HowManyAmpHoursDoINeedPage() {
  const articleSchema = generateArticleSchema({
    headline: "How Many Amp Hours Do I Need for a Battery Bank? Sizing Guide",
    description:
      "Calculate how many amp-hours (Ah) your battery bank needs. Step-by-step formula covering daily Watt-hours, system voltage, autonomy days, depth of discharge, and inverter losses.",
    url: "https://calcmypower.com/how-many-amp-hours-do-i-need",
    datePublished: "2026-10-08",
    dateModified: "2026-10-08",
    images: [
      "https://calcmypower.com/images/articles/how-many-amp-hours-battery-bank-sizing.webp",
    ],
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Calculators & Guides", url: "https://calcmypower.com/calculators" },
    {
      name: "How Many Amp Hours Do I Need for a Battery Bank?",
      url: "https://calcmypower.com/how-many-amp-hours-do-i-need",
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

      <div className="min-h-screen bg-slate-50 text-slate-800">
        <header className="bg-gradient-to-b from-slate-900 to-slate-850 text-white pt-10 pb-12 border-b border-slate-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center space-x-2 text-xs text-slate-400 mb-6"
            >
              <Link href="/" className="hover:text-sky-400 transition">
                Home
              </Link>
              <span>/</span>
              <Link href="/calculators" className="hover:text-sky-400 transition">
                Calculators & Guides
              </Link>
              <span>/</span>
              <span className="text-slate-200 truncate">
                How Many Amp Hours Do I Need?
              </span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950 border border-sky-800 text-sky-300 text-xs font-medium mb-4">
              <Battery className="w-3.5 h-3.5" />
              <span>Battery Storage Engineering Guide</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
              How Many Amp Hours Do I Need for a Battery Bank?
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed mb-6">
              A comprehensive engineering methodology to size battery bank capacity.
              Learn how to calculate daily Watt-hours, select system voltage,
              account for autonomy days, and factor in usable depth of discharge
              and inverter losses.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 border-t border-slate-800 pt-4">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Published October 2026</span>
              </div>
              <span>•</span>
              <div>CalcMyPower Technical Publishing</div>
              <span>•</span>
              <div>13 min read</div>
            </div>
          </div>
        </header>

        <MobileArticleNavigator items={TOC_ITEMS} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content Area (Content FIRST in DOM) */}
            <article className="lg:col-span-8 space-y-10">
              {/* Direct Answer Callout Box */}
              <section
                id="quick-answer"
                className="p-6 bg-white rounded-xl border border-sky-200 shadow-sm space-y-4"
              >
                <div className="flex items-center gap-2.5 text-sky-800 font-bold text-lg">
                  <Zap className="w-5 h-5 text-sky-600" />
                  <h2>Direct Answer: The Master Battery Sizing Formula</h2>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  To calculate the total Amp-hours (Ah) required for a battery bank,
                  determine your total daily energy consumption in Watt-hours (Wh),
                  multiply by your required days of autonomy (backup reserve),
                  and divide by the product of your nominal system voltage,
                  usable depth of discharge (DoD), and electrical inverter efficiency:
                </p>
                <div className="p-4 bg-slate-900 rounded-lg text-sky-300 font-mono text-sm sm:text-base leading-relaxed overflow-x-auto">
                  Required Bank Ah = (Daily Load Wh × Autonomy Days) ÷ (System Voltage × Usable DoD × Inverter Efficiency)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-600">
                  <div className="p-3 bg-slate-50 rounded border border-slate-200">
                    <span className="font-semibold text-slate-800 block mb-1">
                      12V Setup (Small Loads):
                    </span>
                    1,200 Wh/day at 1 day backup with LiFePO4 (85% DoD) and 85% inverter requires roughly{" "}
                    <strong className="text-slate-900">166 Ah at 12V</strong>.
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-200">
                    <span className="font-semibold text-slate-800 block mb-1">
                      24V Setup (Medium Loads):
                    </span>
                    2,400 Wh/day at 1 day backup with LiFePO4 (85% DoD) and 88% inverter requires roughly{" "}
                    <strong className="text-slate-900">160 Ah at 24V</strong>.
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-200">
                    <span className="font-semibold text-slate-800 block mb-1">
                      48V Setup (Whole-Home):
                    </span>
                    10,000 Wh/day at 1.5 days backup with LiFePO4 (90% DoD) and 92% inverter requires roughly{" "}
                    <strong className="text-slate-900">377 Ah at 48V</strong>.
                  </div>
                </div>
              </section>

              {/* Unique Technical Diagram */}
              <section className="space-y-3">
                <ZoomableArticleImage
                  src="/images/articles/how-many-amp-hours-battery-bank-sizing.webp"
                  alt="Battery bank sizing workflow diagram showing 5 engineering calculation steps from daily load watts to required amp-hours"
                  title="Battery Bank Sizing Workflow and Engineering Architecture"
                  caption="Figure 1: The 5-step battery bank sizing workflow and a worked comparison across 12V, 24V, and 48V nominal architectures."
                >
                  <Image
                    src="/images/articles/how-many-amp-hours-battery-bank-sizing.webp"
                    alt="Battery bank sizing workflow diagram showing 5 engineering calculation steps from daily load watts to required amp-hours"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover"
                  />
                </ZoomableArticleImage>
              </section>

              {/* Section 2: What Ah Actually Represents */}
              <section id="what-ah-represents" className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900">
                  What Battery Bank Amp-Hours Actually Represent
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  An Amp-hour (Ah) is a measure of electric charge, representing
                  the flow of one Ampere of electrical current continuously for
                  one hour. When sizing an off-grid solar installation, an RV house
                  system, or a home emergency backup bank, Amp-hours alone do not
                  tell you how much work or energy is stored inside the battery.
                </p>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Electrical work is measured in Watt-hours (Wh) or kilowatt-hours
                  (kWh). Stored energy is the product of current, time, and electrical
                  potential (voltage):
                </p>
                <div className="p-4 bg-slate-100 rounded-lg text-slate-800 font-mono text-sm">
                  Energy (Watt-hours) = Charge (Amp-hours) × Nominal Potential (Volts)
                </div>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Because battery energy is voltage dependent, a 100Ah battery rated
                  at 12V holds exactly one quarter of the stored energy of a 100Ah
                  battery bank configured at 48V. For in-depth conceptual fundamentals,
                  see our technical guides on{" "}
                  <Link
                    href="/what-does-ah-mean-on-a-battery"
                    className="text-sky-600 hover:text-sky-800 font-semibold underline"
                  >
                    what Ah means on a battery
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/what-is-a-watt-hour"
                    className="text-sky-600 hover:text-sky-800 font-semibold underline"
                  >
                    Watt-hours explained
                  </Link>.
                </p>
              </section>

              {/* Section 3: Step 1 Daily Load */}
              <section id="step-1-daily-watt-hours" className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900">
                  Step 1: Calculate Total Daily Load (Watt-Hours)
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  The foundation of battery bank sizing is a granular load audit.
                  List every electrical device that will operate from the battery bank,
                  note its power draw in Watts, and estimate the number of hours it will
                  run each 24-hour day.
                </p>
                <div className="p-4 bg-slate-100 rounded-lg text-slate-800 font-mono text-sm">
                  Appliance Energy (Wh/day) = Operating Watts × Operating Hours per Day
                </div>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  For cycling appliances such as refrigerators, air conditioners, or
                  water pumps, calculate energy using the compressor or motor duty
                  cycle rather than assuming 24-hour continuous operation.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-lg overflow-hidden">
                    <thead className="bg-slate-100 text-slate-700 font-semibold">
                      <tr>
                        <th className="p-3 border-b border-slate-200">Appliance</th>
                        <th className="p-3 border-b border-slate-200">Power (W)</th>
                        <th className="p-3 border-b border-slate-200">Daily Runtime</th>
                        <th className="p-3 border-b border-slate-200">Duty Cycle</th>
                        <th className="p-3 border-b border-slate-200">Daily Energy (Wh)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="p-3 font-medium text-slate-800">12V 12V RV Compressor Fridge</td>
                        <td className="p-3">50 W</td>
                        <td className="p-3">24 hrs</td>
                        <td className="p-3">40% duty cycle</td>
                        <td className="p-3 font-semibold text-slate-900">480 Wh</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-slate-800">LED Lighting (5 fixtures)</td>
                        <td className="p-3">45 W</td>
                        <td className="p-3">4 hrs</td>
                        <td className="p-3">100% continuous</td>
                        <td className="p-3 font-semibold text-slate-900">180 Wh</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-slate-800">Laptop Computer</td>
                        <td className="p-3">65 W</td>
                        <td className="p-3">5 hrs</td>
                        <td className="p-3">100% continuous</td>
                        <td className="p-3 font-semibold text-slate-900">325 Wh</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-slate-800">Starlink / WiFi Router</td>
                        <td className="p-3">50 W</td>
                        <td className="p-3">12 hrs</td>
                        <td className="p-3">100% continuous</td>
                        <td className="p-3 font-semibold text-slate-900">600 Wh</td>
                      </tr>
                      <tr className="bg-sky-50 font-bold text-sky-950">
                        <td className="p-3" colSpan={4}>Sample Total Daily Energy Demand</td>
                        <td className="p-3 text-sky-900 font-mono">1,585 Wh / day</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 4: Step 2 Convert to Ah */}
              <section id="step-2-convert-to-ah" className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900">
                  Step 2: Convert Energy to Base Amp-Hours by System Voltage
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Once you know your total daily Watt-hours, divide that energy by
                  the nominal DC operating voltage of your battery bank (12V, 24V,
                  or 48V):
                </p>
                <div className="p-4 bg-slate-100 rounded-lg text-slate-800 font-mono text-sm">
                  Daily Base Current (Ah/day) = Total Daily Load (Wh) ÷ Nominal Voltage (V)
                </div>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Using our sample load of 1,585 Wh per day:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base text-slate-700 pl-2">
                  <li>
                    <strong>On a 12V System:</strong> 1,585 Wh ÷ 12V ={" "}
                    <span className="font-semibold text-slate-900">132.1 Ah/day</span>
                  </li>
                  <li>
                    <strong>On a 24V System:</strong> 1,585 Wh ÷ 24V ={" "}
                    <span className="font-semibold text-slate-900">66.0 Ah/day</span>
                  </li>
                  <li>
                    <strong>On a 48V System:</strong> 1,585 Wh ÷ 48V ={" "}
                    <span className="font-semibold text-slate-900">33.0 Ah/day</span>
                  </li>
                </ul>
                <p className="text-sm text-slate-600 italic">
                  Notice that the total stored energy is identical in all three cases;
                  the higher voltage system simply moves that energy at a lower continuous
                  current.
                </p>
              </section>

              {/* Section 5: Step 3 Autonomy Days */}
              <section id="step-3-autonomy-days" className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900">
                  Step 3: Account for Reserve & Autonomy Days
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Autonomy refers to the number of days your battery bank can power
                  all critical loads without any incoming charging source, such as
                  grid electricity, generator power, or solar panel generation
                  during cloudy winter storms.
                </p>
                <div className="p-4 bg-slate-100 rounded-lg text-slate-800 font-mono text-sm">
                  Required Un-derated Capacity (Ah) = Daily Base Current (Ah/day) × Days of Autonomy
                </div>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Typical planning benchmarks across common installations:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-700 pl-2">
                  <li>
                    <strong>Day-use RV or Weekend Camper:</strong> 1 day of autonomy.
                    Assumes daily generator runs, vehicle alternator charging, or reliable sun.
                  </li>
                  <li>
                    <strong>Home Critical Load Emergency Backup:</strong> 1 to 2 days of autonomy.
                    Provides sufficient runtime during typical residential grid outage durations.
                  </li>
                  <li>
                    <strong>Year-Round Off-Grid Cabin or Solar Home:</strong> 2 to 3 days of autonomy.
                    Essential to bridge multi-day winter cloud cover without immediate generator dispatch.
                  </li>
                </ul>
              </section>

              {/* Section 6: Step 4 Depth of Discharge */}
              <section id="step-4-depth-of-discharge" className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900">
                  Step 4: Account for Usable Capacity & Depth of Discharge (DoD)
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  A battery nominal nameplate rating is not equal to its usable energy.
                  Discharging a battery to absolute zero percent state of charge
                  damages internal chemistry, triggers low-voltage disconnects, or
                  destroys cycle life. Therefore, you must divide your required capacity
                  by the usable Depth of Discharge (DoD):
                </p>
                <div className="p-4 bg-slate-100 rounded-lg text-slate-800 font-mono text-sm">
                  Nameplate Bank Ah = Autonomy Ah ÷ Usable Depth of Discharge (DoD)
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-5 bg-white rounded-lg border border-slate-200 space-y-2 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">
                        Lithium Iron Phosphate (LiFePO4)
                      </span>
                      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800">
                        80% to 90% DoD
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Deep-cycle LiFePO4 cells maintain flat discharge voltage curves
                      and are commonly specified by manufacturers for 80% to 90% usable
                      depth of discharge while retaining 3,000 to 5,000 charge cycles.
                      Integrated Battery Management Systems (BMS) protect cells against
                      over-discharge.
                    </p>
                  </div>

                  <div className="p-5 bg-white rounded-lg border border-slate-200 space-y-2 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">
                        Deep-Cycle Lead-Acid (AGM / Gel / Flooded)
                      </span>
                      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-800">
                        50% DoD Benchmark
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Lead-acid manufacturers strongly advise limiting daily discharge
                      to 50% of nameplate rating. Discharging lead-acid to 80% or deeper
                      accelerates plate sulfation and can reduce expected cycle life
                      from 1,000 cycles down to under 300 cycles.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 flex items-start gap-3 text-xs sm:text-sm text-amber-900">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <p>
                    <strong>Engineering Clarification:</strong> Usable capacity limits
                    are set by manufacturer specifications, temperature operating ranges,
                    and warranty terms. Never assume universal chemical constants;
                    always verify the exact datasheet for your selected battery model.
                  </p>
                </div>
              </section>

              {/* Section 7: Step 5 Inverter Losses */}
              <section id="step-5-inverter-efficiency" className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900">
                  Step 5: Account for Inverter & Wiring Conversion Losses
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  If your battery bank powers 120V or 240V AC household appliances,
                  DC electricity stored in the batteries must pass through an inverter.
                  No inverter operates at 100% efficiency. High-quality pure sine wave
                  inverters typically operate between 85% and 92% efficiency under normal load.
                </p>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  In addition, DC cables, fuses, and terminal connections introduce
                  resistive losses. To avoid under-sizing your bank, divide the required
                  energy by the overall system efficiency factor (typically 0.85 to 0.90 for AC loads,
                  or 0.95 to 0.98 for pure direct DC loads):
                </p>
                <div className="p-4 bg-slate-100 rounded-lg text-slate-800 font-mono text-sm">
                  Final Required Nameplate Ah = (Daily Wh × Autonomy) ÷ (Voltage × Usable DoD × Inverter Efficiency)
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  For detailed inverter current draw formulas and DC cable sizing,
                  consult our{" "}
                  <Link
                    href="/inverter-size-calculator"
                    className="text-sky-600 hover:text-sky-800 font-semibold underline"
                  >
                    inverter size calculator
                  </Link>.
                </p>
              </section>

              {/* Section 8: Worked Examples */}
              <section id="worked-examples" className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  4 Real-World Sizing Scenarios (12V, 24V, and 48V Systems)
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Here is how the master sizing formula applies across four common
                  residential and mobile electrical setups using realistic engineering assumptions.
                </p>

                <div className="space-y-4">
                  {/* Scenario 1 */}
                  <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="font-bold text-slate-900 text-sm sm:text-base">
                        Scenario 1: Small Camper Van (12V DC Loads)
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-sky-100 text-sky-800">
                        12V Architecture
                      </span>
                    </div>
                    <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                      <li>• Daily Demand: 650 Wh/day (LEDs, 12V fridge, USB chargers, ventilation fan)</li>
                      <li>• Autonomy: 1 day</li>
                      <li>• Battery Type: LiFePO4 (assumed 85% usable DoD)</li>
                      <li>• System Efficiency: 95% (direct DC system, no heavy inverter loss)</li>
                    </ul>
                    <div className="p-3 bg-slate-50 rounded font-mono text-xs text-slate-800">
                      Bank Ah = (650 Wh × 1) ÷ (12V × 0.85 × 0.95) = 650 ÷ 9.69 = <strong>67.1 Ah</strong>
                    </div>
                    <p className="text-xs text-slate-600">
                      <strong>Selection:</strong> One standard 12V 100Ah LiFePO4 battery
                      provides generous headroom and protects cycle longevity.
                    </p>
                  </div>

                  {/* Scenario 2 */}
                  <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="font-bold text-slate-900 text-sm sm:text-base">
                        Scenario 2: Home Emergency Outage Backup (12V Inverter)
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-sky-100 text-sky-800">
                        12V Architecture
                      </span>
                    </div>
                    <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                      <li>• Daily Demand: 1,400 Wh/day (internet router, laptop, LED lamp, CPAP machine)</li>
                      <li>• Autonomy: 1.5 days (2,100 Wh total reserve)</li>
                      <li>• Inverter Efficiency: 85%</li>
                    </ul>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="p-3 bg-slate-50 rounded border border-slate-200">
                        <span className="font-semibold text-slate-800 text-xs block mb-1">
                          With LiFePO4 (85% DoD):
                        </span>
                        <div className="font-mono text-xs text-slate-900">
                          2,100 ÷ (12 × 0.85 × 0.85) = <strong>242 Ah</strong>
                        </div>
                        <span className="text-[11px] text-slate-500 mt-1 block">
                          Recommend: (2) 12V 100Ah or (1) 12V 250Ah battery
                        </span>
                      </div>
                      <div className="p-3 bg-slate-50 rounded border border-slate-200">
                        <span className="font-semibold text-slate-800 text-xs block mb-1">
                          With AGM Lead-Acid (50% DoD):
                        </span>
                        <div className="font-mono text-xs text-slate-900">
                          2,100 ÷ (12 × 0.50 × 0.85) = <strong>412 Ah</strong>
                        </div>
                        <span className="text-[11px] text-slate-500 mt-1 block">
                          Recommend: (4) 12V 100Ah deep-cycle AGM batteries
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Scenario 3 */}
                  <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="font-bold text-slate-900 text-sm sm:text-base">
                        Scenario 3: Off-Grid Weekend Cabin (24V System)
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800">
                        24V Architecture
                      </span>
                    </div>
                    <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                      <li>• Daily Demand: 3,200 Wh/day (efficient fridge, pressure water pump, TV, lighting)</li>
                      <li>• Autonomy: 2 days (6,400 Wh total reserve)</li>
                      <li>• Battery Type: LiFePO4 (85% usable DoD)</li>
                      <li>• Inverter Efficiency: 88%</li>
                    </ul>
                    <div className="p-3 bg-slate-50 rounded font-mono text-xs text-slate-800">
                      Bank Ah = 6,400 Wh ÷ (24V × 0.85 × 0.88) = 6,400 ÷ 17.95 = <strong>356.5 Ah at 24V</strong>
                    </div>
                    <p className="text-xs text-slate-600">
                      <strong>Selection:</strong> (4) 24V 100Ah LiFePO4 batteries in parallel,
                      or (8) 12V 100Ah batteries in 4 parallel strings of 2 series batteries.
                    </p>
                  </div>

                  {/* Scenario 4 */}
                  <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="font-bold text-slate-900 text-sm sm:text-base">
                        Scenario 4: Whole-Home Solar Storage (48V System)
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        48V Architecture
                      </span>
                    </div>
                    <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                      <li>• Daily Demand: 12,000 Wh/day (12 kWh essential residential circuits)</li>
                      <li>• Autonomy: 1.5 days (18,000 Wh total reserve)</li>
                      <li>• Battery Type: Modern 48V Server-Rack LiFePO4 (90% usable DoD)</li>
                      <li>• Inverter Efficiency: 92% (high-voltage hybrid inverter)</li>
                    </ul>
                    <div className="p-3 bg-slate-50 rounded font-mono text-xs text-slate-800">
                      Bank Ah = 18,000 Wh ÷ (48V × 0.90 × 0.92) = 18,000 ÷ 39.74 = <strong>452.9 Ah at 48V</strong>
                    </div>
                    <p className="text-xs text-slate-600">
                      <strong>Selection:</strong> (5) 48V 100Ah (5.12 kWh each) server-rack batteries
                      in parallel, delivering 500 Ah (25.6 kWh total nominal energy).
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 9: 12V vs 24V vs 48V */}
              <section id="12v-vs-24v-vs-48v" className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900">
                  Why 100Ah at 12V Is Not 100Ah at 24V or 48V
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  One of the most frequent misconceptions in power system design is
                  comparing Amp-hour ratings across different voltages. Stored
                  energy always depends on nominal voltage:
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-lg overflow-hidden">
                    <thead className="bg-slate-100 text-slate-700 font-semibold">
                      <tr>
                        <th className="p-3 border-b border-slate-200">System Voltage</th>
                        <th className="p-3 border-b border-slate-200">Rating</th>
                        <th className="p-3 border-b border-slate-200">Stored Energy (Wh)</th>
                        <th className="p-3 border-b border-slate-200">Stored Energy (kWh)</th>
                        <th className="p-3 border-b border-slate-200">Relative Capacity</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="p-3 font-semibold text-slate-800">12V DC Bank</td>
                        <td className="p-3">100 Ah</td>
                        <td className="p-3 font-mono">1,200 Wh</td>
                        <td className="p-3 font-mono">1.20 kWh</td>
                        <td className="p-3">Baseline (1x)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-800">24V DC Bank</td>
                        <td className="p-3">100 Ah</td>
                        <td className="p-3 font-mono">2,400 Wh</td>
                        <td className="p-3 font-mono">2.40 kWh</td>
                        <td className="p-3 font-semibold text-indigo-700">2x Baseline</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-800">48V DC Bank</td>
                        <td className="p-3">100 Ah</td>
                        <td className="p-3 font-mono">4,800 Wh</td>
                        <td className="p-3 font-mono">4.80 kWh</td>
                        <td className="p-3 font-semibold text-emerald-700">4x Baseline</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  When sizing equipment for inverters exceeding 1,500 Watts, stepping
                  up to 24V or 48V significantly decreases continuous DC current,
                  allowing smaller copper conductor gauges, reducing voltage drop,
                  and lowering operating temperatures.
                </p>
              </section>

              {/* Section 10: Series vs Parallel */}
              <section id="series-vs-parallel" className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900">
                  Series vs. Parallel Battery Bank Wiring
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Individual batteries can be combined in two primary circuit
                  topologies to match both your required system voltage and your
                  desired Amp-hour capacity:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-white rounded-lg border border-slate-200 space-y-2">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      Series Connection (Increases Voltage)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Wiring the positive terminal of one battery to the negative terminal
                      of the next adds voltages together while Amp-hour capacity remains
                      equal to a single battery.
                    </p>
                    <div className="p-2.5 bg-slate-50 rounded border border-slate-200 font-mono text-xs text-slate-800">
                      Two 12V 100Ah in series = <strong>24V 100Ah</strong> (2,400 Wh)
                    </div>
                  </div>

                  <div className="p-5 bg-white rounded-lg border border-slate-200 space-y-2">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      Parallel Connection (Increases Capacity)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Wiring positive to positive and negative to negative keeps voltage
                      identical while adding Amp-hour capacities together.
                    </p>
                    <div className="p-2.5 bg-slate-50 rounded border border-slate-200 font-mono text-xs text-slate-800">
                      Two 12V 100Ah in parallel = <strong>12V 200Ah</strong> (2,400 Wh)
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed">
                  For complex banks requiring both higher voltage and higher capacity,
                  series-parallel strings are used. For wiring rules, see our comprehensive guide on{" "}
                  <Link
                    href="/solar-panels-series-vs-parallel"
                    className="text-sky-600 hover:text-sky-800 font-semibold underline"
                  >
                    series vs. parallel circuit configurations
                  </Link>.
                </p>
              </section>

              {/* Section 11: Battery Quantity */}
              <section id="battery-quantity" className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900">
                  How Many Physical Batteries Do You Need?
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Once you have calculated your required bank capacity and chosen
                  a specific battery model, determine the number of physical units
                  using this two-step formula:
                </p>

                <div className="p-4 bg-slate-100 rounded-lg text-slate-800 font-mono text-xs sm:text-sm space-y-2">
                  <div>1. Batteries in Series per String = System Voltage ÷ Individual Battery Voltage</div>
                  <div>2. Parallel Strings Needed = Required Bank Ah ÷ Individual Battery Ah</div>
                  <div>3. Total Batteries = (Batteries in Series) × (Parallel Strings)</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2">
                  <p className="font-semibold text-slate-900">Worked Example:</p>
                  <p>
                    Suppose your 24V system requires <strong>300 Ah</strong>, and you are using
                    standard 12V 100Ah batteries:
                  </p>
                  <ul className="list-disc list-inside space-y-1 pl-2 text-slate-600">
                    <li>Series batteries per string: 24V ÷ 12V = 2 batteries</li>
                    <li>Parallel strings: 300 Ah ÷ 100 Ah = 3 strings</li>
                    <li>Total batteries required: 2 × 3 = <strong>6 batteries</strong></li>
                  </ul>
                  <p className="text-xs text-slate-500 pt-1">
                    Always confirm that your battery manufacturer supports the planned
                    number of series and parallel connections in their technical manual.
                  </p>
                </div>
              </section>

              {/* Section 12: Common Mistakes */}
              <section id="common-mistakes" className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900">
                  5 Common Battery Sizing Mistakes to Avoid
                </h2>
                <div className="space-y-3">
                  <div className="p-4 bg-white rounded-lg border border-slate-200 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">
                        Confusing Nameplate Ah with Usable Ah
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1">
                        Buying a 100Ah lead-acid battery and expecting 100Ah of runtime.
                        Lead-acid batteries deliver roughly 50Ah of usable capacity before
                        risking plate degradation.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg border border-slate-200 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">
                        Ignoring Inverter Idle Consumption & Losses
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1">
                        Inverters consume 15W to 50W continuously just staying turned on
                        in standby, which adds 360 Wh to 1,200 Wh per day of phantom load
                        regardless of whether an appliance is running.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg border border-slate-200 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </span>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">
                        Neglecting the Peukert Effect on Lead-Acid
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1">
                        Lead-acid nameplate capacity is typically measured over a slow
                        20-hour discharge (C/20). Drawing heavy currents (like a microwave
                        or power tool) sharply reduces effective delivered capacity.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg border border-slate-200 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      4
                    </span>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">
                        Zero Autonomy Planning
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1">
                        Sizing capacity strictly for 24 hours assuming solar will recharge
                        the bank every morning. Two days of rain or snow will leave the system
                        completely depleted.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg border border-slate-200 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      5
                    </span>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">
                        Comparing 12V and 24V/48V Ah Directly
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1">
                        Assuming a 24V 100Ah bank has the same capacity as a 12V 100Ah bank.
                        Always convert to Watt-hours (Wh = V × Ah) before comparing costs or sizes.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 13: When Simple Ah Math Fails */}
              <section id="when-simple-ah-fails" className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900">
                  When the Simple Ah Calculation Is Not Enough (C-Rate, Temp, BMS)
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  While the 5-step formula calculates total stored capacity, physical
                  power delivery involves three critical operational boundaries:
                </p>

                <div className="space-y-3">
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <h3 className="font-semibold text-slate-900 text-sm">
                      1. Continuous Current & Maximum Discharge Rate (C-Rate)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      A battery with sufficient total Ah may still fail if your peak load
                      exceeds its continuous discharge rating. For example, a single 12V
                      100Ah LiFePO4 battery with a 100A BMS limit cannot power a 2,000W
                      inverter at full output (which requires approximately 196A DC). You
                      must parallel additional batteries to meet the discharge current demand.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <h3 className="font-semibold text-slate-900 text-sm">
                      2. Sub-Freezing Ambient Temperatures
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      Battery performance drops in freezing conditions. More importantly,
                      standard LiFePO4 batteries must never be charged below 32°F (0°C)
                      without internal heating pads, as lithium plating can cause permanent
                      internal short circuits.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <h3 className="font-semibold text-slate-900 text-sm">
                      3. Recharge Capability & Solar / Charger Sizing
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      A massive battery bank is only useful if your charging source can
                      replenish it within available daylight hours. Verify that your solar array
                      and charge controller amperage match your bank size using our{" "}
                      <Link
                        href="/solar-charge-controller-calculator"
                        className="text-sky-600 hover:text-sky-800 font-semibold underline"
                      >
                        solar charge controller calculator
                      </Link>.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 14: Calculator CTA Bridge */}
              <section
                id="interactive-calculator"
                className="p-6 bg-gradient-to-r from-sky-900 to-slate-900 rounded-xl text-white space-y-4 shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-sky-500/20 text-sky-400">
                    <Calculator className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Calculate Your Battery Bank Capacity Interactively
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Run custom load audits, adjust depth of discharge, and size LiFePO4 vs. lead-acid banks instantly.
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed">
                  Use our free online tool to test different autonomy days,
                  toggle inverter efficiency ratings, and determine exact Ah requirements
                  for your specific project.
                </p>

                <div className="pt-2">
                  <Link
                    href="/battery-capacity-calculator"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition shadow"
                  >
                    <span>Open Battery Capacity Calculator</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </section>

              {/* Section 15: FAQ Accordion */}
              <section id="faq" className="space-y-4">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-sky-600" />
                  <h2 className="text-2xl font-bold text-slate-900">
                    Frequently Asked Questions
                  </h2>
                </div>
                <div className="space-y-3">
                  {FAQ_DATA.map((item, idx) => (
                    <details
                      key={idx}
                      className="group p-4 bg-white rounded-lg border border-slate-200 [&_summary::-webkit-details-marker]:none cursor-pointer shadow-2xs"
                    >
                      <summary className="flex items-center justify-between font-semibold text-slate-900 text-sm sm:text-base">
                        <span>{item.question}</span>
                        <ChevronDown className="w-4 h-4 text-slate-400 transition-transform group-open:rotate-180 shrink-0 ml-2" />
                      </summary>
                      <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {item.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>

              {/* Section 16: Authoritative References */}
              <section
                id="sources"
                className="p-6 bg-slate-100 rounded-xl border border-slate-200 space-y-3 text-xs text-slate-600"
              >
                <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                  <BookOpen className="w-4 h-4 text-slate-600" />
                  <h2>Authoritative Sources & Engineering Standards</h2>
                </div>
                <p>
                  Calculations, formulas, and baseline assumptions in this guide are grounded in established US electrical and energy references:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  <li>
                    <strong>National Electrical Code (NEC / NFPA 70):</strong> Article 480 (Storage Batteries) and Article 706 (Energy Storage Systems).
                  </li>
                  <li>
                    <strong>IEEE Standard 485:</strong> Recommended Practice for Sizing Lead-Acid Batteries for Stationary Applications.
                  </li>
                  <li>
                    <strong>IEEE Standard 1184:</strong> Guide for Selection and Sizing of Batteries for Uninterruptible Power Supplies.
                  </li>
                  <li>
                    <strong>National Renewable Energy Laboratory (NREL):</strong> Best Practices for Photovoltaic and Energy Storage System Design.
                  </li>
                  <li>
                    <strong>U.S. Department of Energy (DOE):</strong> Energy Saver Guidelines for Battery Storage and Backup Power Systems.
                  </li>
                </ul>
                <p className="pt-2 text-slate-500 border-t border-slate-200">
                  <strong>Disclaimer:</strong> Sizing formulas and calculations presented on this page are for preliminary planning and educational purposes only. Always consult licensed electricians, system engineers, and manufacturer technical manuals when designing and installing electrical battery storage systems.
                </p>
              </section>
            </article>

            {/* Aside / Sidebar Area (Sticky on Desktop) */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="sticky top-20 space-y-6">
                <TableOfContents items={TOC_ITEMS} />

                {/* Companion Tool CTA Card */}
                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-sky-600 font-bold text-sm">
                    <Calculator className="w-4 h-4" />
                    <span>Companion Calculator</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    Battery Capacity & Sizing Calculator
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Convert Watt-hours to Amp-hours, select battery chemistry, and calculate exact runtime with our interactive tool.
                  </p>
                  <Link
                    href="/battery-capacity-calculator"
                    className="inline-flex items-center justify-between w-full px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs transition"
                  >
                    <span>Launch Calculator</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Related Engineering Guides */}
                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
                  <h3 className="font-bold text-slate-900 text-sm">
                    Related Power Guides
                  </h3>
                  <ul className="space-y-2 text-xs">
                    <li>
                      <Link
                        href="/what-does-ah-mean-on-a-battery"
                        className="text-slate-700 hover:text-sky-600 flex items-center justify-between group"
                      >
                        <span>What Does Ah Mean on a Battery?</span>
                        <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-sky-600 transition" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/what-is-a-watt-hour"
                        className="text-slate-700 hover:text-sky-600 flex items-center justify-between group"
                      >
                        <span>What Is a Watt-Hour (Wh)?</span>
                        <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-sky-600 transition" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/how-long-will-a-100ah-battery-last"
                        className="text-slate-700 hover:text-sky-600 flex items-center justify-between group"
                      >
                        <span>How Long Will a 100Ah Battery Last?</span>
                        <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-sky-600 transition" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/solar-panels-series-vs-parallel"
                        className="text-slate-700 hover:text-sky-600 flex items-center justify-between group"
                      >
                        <span>Series vs. Parallel Wiring Guide</span>
                        <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-sky-600 transition" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/inverter-size-calculator"
                        className="text-slate-700 hover:text-sky-600 flex items-center justify-between group"
                      >
                        <span>Inverter Size & Cable Calculator</span>
                        <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-sky-600 transition" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
