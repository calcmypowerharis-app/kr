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
import { ArticleDateByline } from "@/components/article/ArticleDateByline";
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
    publishedTime: "2026-10-08T00:00:00Z",
    modifiedTime: "2026-10-08T00:00:00Z",
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
      "A 1,000W inverter running at continuous load on a 12V battery system draws approximately 98 Amps of DC current assuming an illustrative 85% inverter efficiency (1,000W / (12V * 0.85)). To run this 1,000W load for 2 hours, the system requires roughly 2,353 DC Watt-hours or 196 Ah at 12V. Using an illustrative 85% usable depth of discharge planning assumption for LiFePO4, that equates to roughly 230 Ah at 12V. Using an illustrative 50% depth of discharge planning assumption for lead-acid, that equates to roughly 392 Ah at 12V. Actual requirements depend on inverter efficiency ratings, battery manufacturer discharge limits, and operating conditions.",
  },
  {
    question: "How many amp-hours do I need to run a household refrigerator?",
    answer:
      "A standard residential refrigerator consumes roughly 1,000 to 1,500 Watt-hours (Wh) per day, taking into account compressor duty cycles. In an illustrative sizing example using 1,200 Wh per day, a 12V battery bank, an assumed 85% efficient inverter, and an illustrative 80% usable depth of discharge planning assumption, the calculation yields: 1,200 Wh / (12V * 0.80 * 0.85) = approximately 147 Ah of nominal capacity for 24 hours of backup without solar or grid input. Actual consumption varies by appliance rating, ambient temperature, and equipment specifications.",
  },
  {
    question: "Can I mix different Amp-hour battery sizes in the same bank?",
    answer:
      "You should avoid mixing batteries of different Amp-hour capacities, different ages, or different chemistries within the same bank. In parallel strings, batteries with unequal internal resistance can experience circulating balance currents, which may cause one unit to overcharge while the other undercharges. In series strings, the lower-capacity unit discharges first, risking cell imbalance and accelerated degradation.",
  },
  {
    question: "Why is a 24V or 48V battery bank beneficial for larger power systems?",
    answer:
      "Because power equals voltage multiplied by current (P = V * I), higher system voltages reduce operating current for the same wattage. For example, a 3,000W load at 12V requires roughly 250A to 294A DC (depending on inverter efficiency), which requires heavy gauge conductors to manage heat and voltage drop. At 48V, that same 3,000W load requires roughly 62A to 74A DC, which reduces resistive I2R losses and can allow smaller conductor sizes. Conductor sizing must always be verified based on circuit length, temperature ratings, allowable voltage drop, and applicable electrical codes.",
  },
  {
    question: "How do I determine the usable depth of discharge of my battery?",
    answer:
      "Usable depth of discharge (DoD) is established by the battery manufacturer specification sheet. Sizing models often use an illustrative 80% to 90% DoD for deep-cycle LiFePO4 batteries and an illustrative 50% DoD for lead-acid batteries as starting planning assumptions. Actual usable capacity and the recommended discharge floor depend on the specific battery model, manufacturer warranty guidelines, discharge rate, operating temperature, and cycling frequency.",
  },
  {
    question: "What is the difference between battery Amp-hours and Watt-hours?",
    answer:
      "Amp-hours (Ah) measure electric charge capacity at a specific nominal voltage, while Watt-hours (Wh) measure actual stored energy independent of voltage. To convert Ah to Wh, multiply Amp-hours by the nominal voltage (Wh = Ah * Volts). For example, a 12V 100Ah battery contains 1,200 Wh of nominal energy, whereas a 48V 100Ah battery contains 4,800 Wh of nominal energy, four times as much stored work capability.",
  },
];

export default function HowManyAmpHoursDoINeedPage() {
  const articleSchema = generateArticleSchema({
    headline: "How Many Amp Hours Do I Need for a Battery Bank? Sizing Guide",
    description:
      "Calculate how many amp-hours (Ah) your battery bank needs. Step-by-step formula covering daily Watt-hours, system voltage, autonomy days, depth of discharge, and inverter losses.",
    url: "https://calcmypower.com/how-many-amp-hours-do-i-need",
    datePublished: "2026-10-08T00:00:00Z",
    dateModified: "2026-10-08T00:00:00Z",
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
            Calculators &amp; Guides
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-slate-800 font-semibold truncate">
            How Many Amp Hours Do I Need?
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Content Area (Content FIRST in DOM) */}
          <article id="article-content" className="lg:col-span-8 space-y-10 text-slate-700 leading-relaxed text-base md:text-lg">
            {/* Article Header */}
            <header className="space-y-4 border-b border-slate-200 pb-8">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 font-semibold">
                  Battery Storage Engineering Guide
                </span>
                <span className="text-slate-400">•</span>
                <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>13 min read</span>
                </span>
                <span className="text-slate-400">•</span>
                <ArticleDateByline datePublished="2026-10-08" lastModified="2026-10-08" />
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                How Many Amp Hours Do I Need for a Battery Bank?
              </h1>

              <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-normal">
                A comprehensive engineering methodology to size battery bank capacity.
                Learn how to calculate daily Watt-hours, select system voltage,
                account for autonomy days, and factor in usable depth of discharge
                and inverter losses.
              </p>
            </header>

            {/* Featured Visual Asset with Click-to-Zoom */}
            <div className="space-y-3">
              <ZoomableArticleImage
                src="/images/articles/how-many-amp-hours-battery-bank-sizing.webp"
                alt="Battery bank sizing workflow diagram showing 5 engineering calculation steps from daily load watts to required amp-hours"
                title="Battery Bank Sizing Workflow"
                caption="Figure 1: Five-step engineering calculation workflow to convert total daily load Watt-hours into nominal battery bank Amp-hours."
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
            </div>
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
                  To estimate the total Amp-hours (Ah) required for a battery bank,
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
                    1,200 Wh/day at 1 day backup with LiFePO4 (illustrative 85% DoD assumption) and an assumed 85% efficient inverter requires roughly{" "}
                    <strong className="text-slate-900">166 Ah at 12V</strong>.
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-200">
                    <span className="font-semibold text-slate-800 block mb-1">
                      24V Setup (Medium Loads):
                    </span>
                    2,400 Wh/day at 1 day backup with LiFePO4 (illustrative 85% DoD assumption) and an assumed 88% efficient inverter requires roughly{" "}
                    <strong className="text-slate-900">160 Ah at 24V</strong>.
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-200">
                    <span className="font-semibold text-slate-800 block mb-1">
                      48V Setup (Whole-Home):
                    </span>
                    10,000 Wh/day at 1.5 days backup with LiFePO4 (illustrative 90% DoD assumption) and an assumed 92% efficient inverter requires roughly{" "}
                    <strong className="text-slate-900">377 Ah at 48V</strong>.
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 pt-1">
                  Note: Inverter efficiencies and usable DoD figures above are illustrative planning assumptions. Sizing for real installations should use equipment manufacturer specifications.
                </p>
              </section>

              {/* Section 2: What Ah Actually Represents */}
              <section id="what-ah-represents" className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900">
                  What Battery Bank Amp-Hours Actually Represent
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  An Amp-hour (Ah) is a measure of electric charge, representing the flow of one Ampere of electrical current continuously for one hour.
                </p>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  When sizing a solar installation, RV house system, or home backup bank, Amp-hours alone do not tell you how much energy is stored inside the battery.
                </p>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Electrical work is measured in Watt-hours (Wh) or kilowatt-hours (kWh). Stored energy is the product of current, time, and electrical potential (voltage):
                </p>
                <div className="p-4 bg-slate-100 rounded-lg text-slate-800 font-mono text-sm">
                  Energy (Watt-hours) = Charge (Amp-hours) × Nominal Potential (Volts)
                </div>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Because battery energy depends on voltage, a 12V 100Ah battery holds roughly one-fourth of the nominal stored energy of a 48V 100Ah battery bank.
                </p>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  For in-depth conceptual fundamentals, see our technical guides on{" "}
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
                  A battery nominal nameplate rating does not equal its practical usable capacity.
                </p>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Under-sizing leaves insufficient usable storage and causes the bank to deplete sooner than expected. Therefore, calculations divide required autonomy capacity by a DoD planning factor:
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
                        80% to 90% Illustrative DoD
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Deep-cycle LiFePO4 cells maintain flat discharge voltage curves
                      and are commonly referenced in sizing models using an illustrative
                      80% to 90% usable depth of discharge planning assumption for long
                      cycle life. Integrated Battery Management Systems (BMS) protect cells
                      against severe over-discharge.
                    </p>
                  </div>

                  <div className="p-5 bg-white rounded-lg border border-slate-200 space-y-2 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">
                        Deep-Cycle Lead-Acid (AGM / Gel / Flooded)
                      </span>
                      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-800">
                        50% Illustrative DoD Benchmark
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Deep-cycle lead-acid systems (AGM, Gel, Flooded) typically use an
                      illustrative 50% depth of discharge planning assumption for regular
                      cycling, as deeper routine discharges accelerate plate sulfation and
                      shorten expected service life.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 flex items-start gap-3 text-xs sm:text-sm text-amber-900">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1.5">
                    <p>
                      <strong>Important Engineering Qualification:</strong> The 80% to 90% and 50% values used in these sizing examples are illustrative planning assumptions, not universal limits.
                    </p>
                    <p>
                      Actual usable capacity and the recommended discharge floor depend on battery chemistry, model, manufacturer guidelines, warranty conditions, discharge rate, temperature, and operating profile.
                    </p>
                    <p>
                      Always check the manufacturer datasheet and technical documentation for your specific battery.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 7: Step 5 Inverter Losses */}
              <section id="step-5-inverter-efficiency" className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900">
                  Step 5: Account for Inverter & Wiring Conversion Losses
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  When powering 120V or 240V AC appliances, stored DC battery energy converts through an inverter. No inverter operates at 100% efficiency.
                </p>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Pure sine wave inverters commonly operate between 85% and 92% efficiency under nominal load, which serves as an illustrative planning assumption. Sizing for physical installations should use the manufacturer&apos;s specified efficiency rating for your operating load.
                </p>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  In addition, DC conductors, overcurrent protection devices, and connections introduce resistive losses. Follow equipment manufacturer instructions and applicable local electrical requirements when installing DC protection devices.
                </p>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  To account for conversion and delivery losses, calculations incorporate an overall system efficiency factor (such as an illustrative 0.85 to 0.90 for AC inverter circuits, or 0.95 to 0.98 for direct DC circuits):
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
                  residential and mobile electrical setups using illustrative engineering assumptions.
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
                      <li>• Battery Type: LiFePO4 (illustrative 85% usable DoD planning assumption)</li>
                      <li>• System Efficiency: 95% (illustrative direct DC system efficiency, no inverter loss)</li>
                    </ul>
                    <div className="p-3 bg-slate-50 rounded font-mono text-xs text-slate-800">
                      Bank Ah = (650 Wh × 1) ÷ (12V × 0.85 × 0.95) = 650 ÷ 9.69 = <strong>67.1 Ah</strong>
                    </div>
                    <p className="text-xs text-slate-600">
                      <strong>Illustrative Configuration:</strong> One 12V 100Ah LiFePO4 battery
                      provides generous headroom and supports cycle longevity under this load profile.
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
                      <li>• Inverter Efficiency: 85% (illustrative assumed efficiency for this example)</li>
                    </ul>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="p-3 bg-slate-50 rounded border border-slate-200">
                        <span className="font-semibold text-slate-800 text-xs block mb-1">
                          With LiFePO4 (illustrative 85% DoD):
                        </span>
                        <div className="font-mono text-xs text-slate-900">
                          2,100 ÷ (12 × 0.85 × 0.85) = <strong>242 Ah</strong>
                        </div>
                        <span className="text-[11px] text-slate-500 mt-1 block">
                          Illustrative option: (2) 12V 100Ah or (1) 12V 250Ah battery
                        </span>
                      </div>
                      <div className="p-3 bg-slate-50 rounded border border-slate-200">
                        <span className="font-semibold text-slate-800 text-xs block mb-1">
                          With AGM Lead-Acid (illustrative 50% DoD):
                        </span>
                        <div className="font-mono text-xs text-slate-900">
                          2,100 ÷ (12 × 0.50 × 0.85) = <strong>412 Ah</strong>
                        </div>
                        <span className="text-[11px] text-slate-500 mt-1 block">
                          Illustrative option: (4) 12V 100Ah deep-cycle AGM batteries
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
                      <li>• Battery Type: LiFePO4 (illustrative 85% usable DoD planning assumption)</li>
                      <li>• Inverter Efficiency: 88% (illustrative assumed efficiency for this example)</li>
                    </ul>
                    <div className="p-3 bg-slate-50 rounded font-mono text-xs text-slate-800">
                      Bank Ah = 6,400 Wh ÷ (24V × 0.85 × 0.88) = 6,400 ÷ 17.95 = <strong>356.5 Ah at 24V</strong>
                    </div>
                    <p className="text-xs text-slate-600">
                      <strong>Illustrative Configuration:</strong> (4) 24V 100Ah LiFePO4 batteries in parallel,
                      or (8) 12V 100Ah batteries configured in 4 parallel strings of 2 series batteries.
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
                      <li>• Battery Type: Modern 48V Server-Rack LiFePO4 (illustrative 90% usable DoD planning assumption)</li>
                      <li>• Inverter Efficiency: 92% (illustrative assumed efficiency for this example)</li>
                    </ul>
                    <div className="p-3 bg-slate-50 rounded font-mono text-xs text-slate-800">
                      Bank Ah = 18,000 Wh ÷ (48V × 0.90 × 0.92) = 18,000 ÷ 39.74 = <strong>452.9 Ah at 48V</strong>
                    </div>
                    <p className="text-xs text-slate-600">
                      <strong>Illustrative Configuration:</strong> (5) 48V 100Ah (5.12 kWh each) server-rack batteries
                      in parallel, delivering 500 Ah (25.6 kWh total nominal energy).
                    </p>
                  </div>
                </div>

                {/* Companion Callout Card: Battery Bank Calculations & Runtime */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-2 text-sm text-slate-700">
                  <div className="flex items-center gap-2 font-semibold text-blue-900">
                    <Battery className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Connecting Individual Batteries into a Bank?</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    If you are combining multiple 12V or 24V units, follow our guide on{" "}
                    <Link
                      href="/how-to-calculate-amp-hours-of-a-battery-bank"
                      className="text-blue-700 hover:text-blue-900 font-medium underline underline-offset-2"
                    >
                      how to calculate amp-hours of a battery bank
                    </Link>{" "}
                    for series and parallel wiring rules. For real-world runtime charts across popular appliances, see{" "}
                    <Link
                      href="/how-long-will-a-100ah-battery-last"
                      className="text-blue-700 hover:text-blue-900 font-medium underline underline-offset-2"
                    >
                      how long a 100Ah battery lasts
                    </Link>.
                  </p>
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
                  energy is directly related to nominal voltage and charge capacity (Wh = V × Ah):
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

                <div className="pt-2 space-y-3">
                  <h3 className="font-bold text-slate-900 text-base">
                    Conceptual Comparison: How Voltage Governs Operating Current
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Because electrical power equals voltage multiplied by current (P = V × I),
                    increasing the system operating voltage proportionally decreases the circuit
                    amperage for the exact same power demand. Lower current reduces resistive (I2R)
                    heat losses and can allow smaller conductor sizes:
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-lg overflow-hidden">
                      <thead className="bg-slate-100 text-slate-700 font-semibold">
                        <tr>
                          <th className="p-3 border-b border-slate-200">Nominal Voltage</th>
                          <th className="p-3 border-b border-slate-200">Continuous Current (at 1,500W Load)</th>
                          <th className="p-3 border-b border-slate-200">Thermal &amp; Conductor Impact</th>
                          <th className="p-3 border-b border-slate-200">Common Application Profiles</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr>
                          <td className="p-3 font-semibold text-slate-800">12V DC</td>
                          <td className="p-3 font-mono text-slate-900">~125A to ~147A</td>
                          <td className="p-3 text-slate-600">Higher current requires heavier conductors and shorter runs to control voltage drop.</td>
                          <td className="p-3 text-slate-600">RVs, camper vans, marine DC systems, small off-grid cabins.</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold text-slate-800">24V DC</td>
                          <td className="p-3 font-mono text-indigo-700">~63A to ~74A</td>
                          <td className="p-3 text-slate-600">Halving current reduces I2R losses by 75% for the same wire, allowing lighter cabling.</td>
                          <td className="p-3 text-slate-600">Medium off-grid cabins, workshop backup, larger mobile builds.</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold text-slate-800">48V DC</td>
                          <td className="p-3 font-mono text-emerald-700">~31A to ~37A</td>
                          <td className="p-3 text-slate-600">Minimal thermal losses allow efficient transmission over longer distances.</td>
                          <td className="p-3 text-slate-600">Residential solar storage, whole-home backup, commercial UPS.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="text-xs text-slate-500 leading-relaxed pt-1 space-y-1">
                    <p>
                      <strong>Conductor Sizing Note:</strong> Conductor selection requires evaluating continuous current, one-way and round-trip cable length, permissible voltage drop (commonly 2% to 3%), and insulation temperature ratings.
                    </p>
                    <p>
                      Do not rely on fixed gauge rules without calculating specific circuit parameters and consulting applicable electrical codes.
                    </p>
                  </div>
                </div>
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
                    series versus parallel circuit configurations
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
                    Verify that your battery manufacturer supports the planned
                    number of series and parallel connections in their technical documentation.
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
                        Assuming a battery can deliver 100% of its nameplate rating on every cycle causes severe under-sizing.
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1">
                        Deep-cycle lead-acid units commonly use an illustrative 50% depth of discharge planning assumption for regular cycling, while lithium units allow deeper utilization depending on manufacturer specifications.
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
                        depleted without an auxiliary generator or grid source.
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
                        Convert to Watt-hours (Wh = V × Ah) to accurately compare stored energy and system size.
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
                    <div className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed space-y-1.5">
                      <p>
                        A battery with sufficient total Ah may still trip if your load exceeds its continuous discharge rating.
                      </p>
                      <p>
                        For example, a single 12V 100Ah LiFePO4 battery with a 100A BMS limit cannot power a 2,000W inverter at full output (which requires approximately 196A DC).
                      </p>
                      <p>
                        System designers often parallel additional batteries or select higher-discharge units to accommodate continuous current demand.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <h3 className="font-semibold text-slate-900 text-sm">
                      2. Sub-Freezing Ambient Temperatures
                    </h3>
                    <div className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed space-y-1.5">
                      <p>
                        Battery usable capacity, discharge performance, and allowable charging temperatures vary significantly with temperature.
                      </p>
                      <p>
                        Many LiFePO4 battery management systems (BMS) restrict charging below 32°F (0°C) to prevent lithium plating, though units with internal heating pads vary by manufacturer.
                      </p>
                      <p>
                        Lead-acid capacity also drops as electrolyte temperatures fall. Always consult the manufacturer datasheet and BMS operational limits for exact allowable ranges.
                      </p>
                    </div>
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
                  Sizing principles, mathematical formulas, and baseline assumptions in this guide reference established industry engineering standards and educational resources:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  <li>
                    <strong>Electrical Installation Standards:</strong> Applicable electrical codes and installation requirements may apply to stationary battery systems (including NFPA 70 / NEC Article 480 and Article 706). Verify the requirements for the specific installation, equipment, jurisdiction, and applicable NEC edition with a qualified professional.
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
                <div className="pt-2 text-slate-500 border-t border-slate-200 space-y-1">
                  <p>
                    <strong>Disclaimer:</strong> Sizing formulas and calculations presented on this page are for preliminary planning and educational purposes only.
                  </p>
                  <p>
                    Applicable electrical codes and installation requirements may apply to stationary battery systems. Verify specific installation parameters with a qualified professional, and consult licensed electricians, system engineers, and manufacturer technical manuals when designing battery storage systems.
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
