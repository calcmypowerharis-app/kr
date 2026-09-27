import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Zap,
  Plug,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Info,
  Sliders,
  BatteryCharging,
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
import { TOC_ITEMS } from "@/components/article/tocData";

export const metadata: Metadata = {
  title: "What Size Generator Do I Need for My House? Sizing Guide",
  description:
    "Calculate the generator size you need for your house based on running watts, motor startup surges, and essential circuits rather than misleading square-footage rules.",
  alternates: {
    canonical: "https://calcmypower.com/what-size-generator-do-i-need-for-my-house",
  },
  openGraph: {
    title: "What Size Generator Do I Need for My House? Sizing Guide | CalcMyPower",
    description:
      "A load-based technical guide to sizing portable and whole-house standby generators for residential power outages.",
    url: "https://calcmypower.com/what-size-generator-do-i-need-for-my-house",
    type: "article",
    images: [
      {
        url: "https://calcmypower.com/images/articles/standby-generator-home-installation.jpg",
        width: 1280,
        height: 720,
        alt: "Suburban home exterior with an automatic whole-house standby generator installed on a concrete pad next to the electrical utility meter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "What Size Generator Do I Need for My House? | CalcMyPower",
    description:
      "Calculate the right generator capacity for your home using real running and starting watts.",
    images: [
      "https://calcmypower.com/images/articles/standby-generator-home-installation.jpg",
    ],
  },
};

const FAQ_DATA = [
  {
    question: "What size generator do I need for a house?",
    answer:
      "For basic survival circuits (refrigerator, natural gas furnace blower, internet router, lights, and phones), most homes require 3,500 to 5,000 running Watts. If your home depends on a 1/2 HP sump pump or deep-well pump, plan for 5,000 to 7,500 Watts to handle motor starting inrush. Powering a 3-ton to 4-ton central air conditioner or an all-electric home requires roughly 9,000 to 12,000 Watts on a large portable generator or 18,000 to 24,000 Watts (18 to 24 kW) on a permanent standby generator.",
  },
  {
    question: "Is a 5,000-watt generator enough for a house?",
    answer:
      "A generator rated for 5,000 continuous Watts can power critical essentials together: a modern refrigerator, a 1/2 HP sump pump, a gas furnace fan, LED lighting, and small electronics. However, 5,000 Watts is not enough to start central air conditioners (3 to 5 tons), an electric clothes dryer, an electric water heater, or an electric cooking range.",
  },
  {
    question: "How many watts does a house need during a power outage?",
    answer:
      "Electrical demand depends entirely on which circuits you choose to back up. An emergency circuit profile covering refrigeration, heating controls, and communication typically draws 2,500 to 4,000 running Watts. A broader comfort setup with sump pumps, water pumps, and kitchen outlets draws 5,000 to 7,500 Watts. Full whole-home coverage with central HVAC and electric utilities generally requires 14,000 to 22,000 Watts.",
  },
  {
    question: "Does square footage determine generator size?",
    answer:
      "No. Floor space does not draw amperes. Generator capacity is governed strictly by the specific appliances connected, their steady running power, and the starting surge of their electric motors. Two 2,000-square-foot homes can have completely different power requirements: one with natural gas heating and city water may need only 4,000 Watts, while an identical home with a 240V well pump, electric heat pump, and electric water heater can easily require 20,000 Watts.",
  },
  {
    question: "What is the difference between running watts and starting watts?",
    answer:
      "Running watts (continuous watts) is the steady power an appliance consumes during normal operation. Starting watts (surge watts) is the momentary surge of power (often 2 to 3 times the running watts) required for 1 to 3 seconds by motor-driven equipment (refrigerators, pumps, air conditioners) to break mechanical inertia and spin up from a stop.",
  },
  {
    question: "What size generator do I need for a 2,000 sq ft house?",
    answer:
      "In an illustrative 2,000 sq ft home with natural gas heating and city water, a 5,500 to 7,500-watt portable generator wired through a manual transfer switch easily covers essential circuits, food preservation, and entertainment. If you need to back up a 3-ton central air conditioner, you will need at least 9,000 to 11,000 Watts (or roughly 7,500 Watts if equipped with an AC compressor soft-starter). For hands-off, automatic whole-home coverage on an all-electric 2,000 sq ft property, a 20 kW to 22 kW standby generator is typical.",
  },
];

export default function GeneratorSizingGuidePage() {
  const articleSchema = generateArticleSchema({
    headline: "What Size Generator Do I Need for My House? Sizing Guide",
    description:
      "A load-based technical guide to sizing portable and whole-house standby generators for residential power outages.",
    url: "https://calcmypower.com/what-size-generator-do-i-need-for-my-house",
    datePublished: "2026-09-27T08:00:00+00:00",
    dateModified: "2026-09-27T08:00:00+00:00",
    images: [
      "https://calcmypower.com/images/articles/standby-generator-home-installation.jpg",
      "https://calcmypower.com/images/articles/portable-generator-outdoor-safety.jpg",
    ],
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    {
      name: "What Size Generator Do I Need for My House?",
      url: "https://calcmypower.com/what-size-generator-do-i-need-for-my-house",
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

      <article className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-10">
        {/* Header Section */}
        <header className="space-y-4 border-b border-slate-200 pb-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="text-blue-600 hover:underline">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-slate-700 truncate">What Size Generator Do I Need for My House?</span>
          </nav>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold tracking-wide">
            <Plug className="w-3.5 h-3.5 fill-current" />
            <span>Residential Backup Sizing Guide</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            What Size Generator Do I Need for My House?
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
            A practical method for calculating generator wattage during utility outages, based on appliance running loads, motor startup surges, and electrical panel connections.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-500">
            <span>Published September 2026</span>
            <span>•</span>
            <span>CalcMyPower Technical Publishing</span>
            <span>•</span>
            <span>11 min read</span>
          </div>
        </header>

        {/* Hero Image */}
        <figure className="space-y-2">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
            <Image
              src="/images/articles/standby-generator-home-installation.jpg"
              alt="Suburban detached home exterior with an automatic whole-house standby generator installed on a concrete pad next to the electrical utility meter"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1160px"
              className="object-cover"
            />
          </div>
          <figcaption className="text-xs text-slate-500 italic text-center">
            Figure 1: Permanently installed standby generators connect to the main service panel through an automatic transfer switch, supplying selected subpanels or full-house loads.
          </figcaption>
        </figure>

        {/* Floating Mobile Navigator */}
        <MobileArticleNavigator items={TOC_ITEMS} />

        {/* Two-Column Editorial Layout */}
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_280px] xl:grid-cols-[minmax(0,1fr)_300px] lg:gap-10">
          {/* Main Article Content */}
          <div id="article-content" className="min-w-0 space-y-12 text-slate-700 leading-relaxed text-base">
            {/* Direct Answer / Opening Section */}
            <section className="space-y-4">
              <p className="text-lg font-medium text-slate-900 leading-relaxed">
                Sizing an emergency home generator comes down to an early planning decision: are you powering selected critical circuits to ride out a storm, or are you backing up the entire service panel so life continues without interruption?
              </p>

              <p>
                For basic emergency preservation (keeping food cold in a refrigerator, powering a natural gas furnace blower for heat, running a Wi-Fi router, charging phones, and operating several LED lights), most homes require approximately <strong>3,500 to 5,000 running Watts</strong>. If your basement relies on a 1/2 HP sump pump to prevent flooding or domestic water comes from a 240V deep-well submersible pump, planned capacity rises to <strong>5,000 to 7,500 Watts</strong>. Sizing your electrical requirements with our{" "}
                <Link
                  href="/generator-size-calculator"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  interactive generator sizing tool
                </Link>{" "}
                helps pinpoint your specific household starting and running demands before purchasing equipment.
              </p>

              <p>
                Whole-house backup that includes central air conditioning (3 to 4 tons), an electric water heater, or an electric range enters a different class altogether: either an oversized portable generator producing <strong>9,000 to 12,000 Watts</strong>, or a permanently installed standby generator rated between <strong>18,000 and 24,000 Watts (18 to 24 kW)</strong>.
              </p>

              {/* Quick Reference Summary */}
              <div className="border border-slate-200 rounded-2xl p-5 sm:p-6 bg-slate-50/80 space-y-4 my-6">
                <h2 id="quick-answer" className="text-slate-900 font-bold text-base flex items-center gap-2 scroll-mt-24">
                  <Zap className="w-4 h-4 text-blue-600" />
                  Typical Residential Generator Sizing Brackets
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                    <span className="font-mono font-bold text-blue-600 text-base block">3,500W to 5,000W</span>
                    <span className="font-semibold text-slate-800 block">Critical Essentials</span>
                    <p className="text-slate-600 text-xs">
                      Refrigerator, gas furnace blower, internet router, phone chargers, TV, and basic room lighting.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                    <span className="font-mono font-bold text-blue-600 text-base block">5,000W to 8,000W</span>
                    <span className="font-semibold text-slate-800 block">Pumps &amp; Heavy Essentials</span>
                    <p className="text-slate-600 text-xs">
                      Essentials plus a 1/2 HP sump pump, a 240V well pump, microwave oven, and an occasional small window AC.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                    <span className="font-mono font-bold text-blue-600 text-base block">18,000W to 24,000W</span>
                    <span className="font-semibold text-slate-800 block">Whole-House Standby</span>
                    <p className="text-slate-600 text-xs">
                      Central air conditioning (3 to 5 tons), electric water heating, electric cooking, and unmanaged circuit usage.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Square footage does not dictate electrical demand. Two homes with the exact same 2,000-square-foot floor plan can have completely different power requirements depending on whether heating and cooking rely on natural gas or high-draw 240-volt electric heating elements.
              </p>
            </section>

        {/* Section: How Generator Size Is Determined */}
        <section className="space-y-4 border-t border-slate-200 pt-8">
          <h2
            id="how-generator-size-is-determined"
            className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight scroll-mt-24"
          >
            How Generator Size Is Determined
          </h2>

          <p>
            A generator must deliver enough continuous wattage to sustain all active equipment, while preserving enough momentary surge capacity to start electric motors without bogging down the engine or causing voltage sag. Sizing any residential backup system hinges on four concrete variables:
          </p>

          <ol className="space-y-3 pl-1">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">1</span>
              <div>
                <strong className="text-slate-900 block text-sm">Continuous Running Watts:</strong>
                <span className="text-xs sm:text-sm text-slate-600">The steady-state power consumed while appliances operate normally (such as heating elements, refrigerator run cycles, and lighting).</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">2</span>
              <div>
                <strong className="text-slate-900 block text-sm">Starting (Surge) Demand:</strong>
                <span className="text-xs sm:text-sm text-slate-600">The brief burst of current (typically lasting 1 to 3 seconds) required when motor-driven compressors and pumps start from a dead stop against mechanical head pressure.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">3</span>
              <div>
                <strong className="text-slate-900 block text-sm">Simultaneous Operation (Load Concurrency):</strong>
                <span className="text-xs sm:text-sm text-slate-600">
                  Which appliances realistically operate at the same time. In an emergency, heating and cooling do not run simultaneously, and high-draw countertop appliances can be used one at a time. If you also plan to keep internet routers or home medical devices running during the initial minutes of an outage before a generator starts, calculate your runtime with a{" "}
                  <Link
                    href="/ups-battery-backup-calculator"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    dedicated battery backup calculator
                  </Link>
                  .
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">4</span>
              <div>
                <strong className="text-slate-900 block text-sm">Electrical Connection Method:</strong>
                <span className="text-xs sm:text-sm text-slate-600">Connecting individual devices with extension cords versus feeding a dedicated 6-to-10 circuit manual transfer switch, a breaker interlock kit, or a whole-house automatic transfer switch (ATS).</span>
              </div>
            </li>
          </ol>
        </section>

        {/* Section: Running Watts vs Starting Watts */}
        <section className="space-y-4 border-t border-slate-200 pt-8">
          <h2
            id="running-vs-starting-watts"
            className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight scroll-mt-24"
          >
            Running Watts vs. Starting Watts
          </h2>

          <p>
            Every home electrical device has two distinct power metrics: <strong>running watts</strong> (rated continuous load) and <strong>starting watts</strong> (surge load).
          </p>

          <p>
            Resistive loads (including incandescent lights, electric space heaters, toasters, and water heater elements) turn electricity directly into heat or light through simple resistance. These devices exhibit virtually zero startup surge. A 1,500-Watt space heater draws 1,500 Watts the moment it turns on and continues drawing 1,500 Watts until the thermostat clicks off. To convert individual equipment ratings between electrical units, you can use our{" "}
            <Link
              href="/watts-to-amps-calculator"
              className="text-blue-600 font-semibold hover:underline"
            >
              Watts to Amps calculator
            </Link>{" "}
            to determine the exact circuit breaker current required across 120-volt or 240-volt systems.
          </p>

          <p>
            Motor-driven inductive equipment behaves differently. Compressors in refrigerators, air conditioners, and water pumps must overcome mechanical inertia and compress refrigerants or fluids from a dead stop. During that initial 1-to-3-second startup period, the motor draws what electrical specifications define as <strong>Locked Rotor Amps (LRA)</strong>. This starting inrush current can demand two to three times the appliance&apos;s steady-state running power.
          </p>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Appliance</th>
                  <th className="p-3">Illustrative Running Watts</th>
                  <th className="p-3">Illustrative Starting Watts</th>
                  <th className="p-3">Surge Delta</th>
                  <th className="p-3">Load Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Refrigerator / Freezer (Energy Star)</td>
                  <td className="p-3">150 to 200 W</td>
                  <td className="p-3">1,200 W</td>
                  <td className="p-3 text-amber-700 font-semibold">+1,000 to 1,050 W</td>
                  <td className="p-3 text-slate-500">Inductive (Motor)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Sump Pump (1/2 HP, 120V)</td>
                  <td className="p-3">800 to 1,000 W</td>
                  <td className="p-3">1,800 to 2,200 W</td>
                  <td className="p-3 text-amber-700 font-semibold">+1,000 to 1,200 W</td>
                  <td className="p-3 text-slate-500">Inductive (Motor)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Submersible Well Pump (1/2 HP, 240V)</td>
                  <td className="p-3">1,000 to 1,200 W</td>
                  <td className="p-3">2,500 to 3,000 W</td>
                  <td className="p-3 text-amber-700 font-semibold">+1,500 to 1,800 W</td>
                  <td className="p-3 text-slate-500">Inductive (240V Motor)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Gas Furnace Blower Fan (1/2 HP)</td>
                  <td className="p-3">600 to 800 W</td>
                  <td className="p-3">1,600 to 2,000 W</td>
                  <td className="p-3 text-amber-700 font-semibold">+1,000 to 1,200 W</td>
                  <td className="p-3 text-slate-500">Inductive (Motor)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Central AC (3-Ton / 36,000 BTU)</td>
                  <td className="p-3">3,200 to 3,800 W</td>
                  <td className="p-3">7,500 to 9,500 W</td>
                  <td className="p-3 text-amber-700 font-semibold">+4,300 to 5,700 W</td>
                  <td className="p-3 text-slate-500">Heavy Inductive</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Microwave Oven (1,000W Cooking)</td>
                  <td className="p-3">1,200 to 1,500 W</td>
                  <td className="p-3">1,200 to 1,500 W</td>
                  <td className="p-3 text-slate-500">0 W</td>
                  <td className="p-3 text-slate-500">Resistive / Electronic</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Home Wi-Fi Router &amp; ONT</td>
                  <td className="p-3">20 to 35 W</td>
                  <td className="p-3">20 to 35 W</td>
                  <td className="p-3 text-slate-500">0 W</td>
                  <td className="p-3 text-slate-500">Electronic</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">LED Home Lighting (4 Rooms)</td>
                  <td className="p-3">120 to 160 W</td>
                  <td className="p-3">120 to 160 W</td>
                  <td className="p-3 text-slate-500">0 W</td>
                  <td className="p-3 text-slate-500">Lighting</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 italic">
            *Illustrative baseline values derived from U.S. Department of Energy appliance energy estimates and standard generator manufacturer engineering tables. Actual nameplate ratings vary by age, size, and motor efficiency rating.
          </p>
        </section>

        {/* Section: How to Calculate Generator Size */}
        <section className="space-y-4 border-t border-slate-200 pt-8">
          <h2
            id="how-to-calculate-generator-size"
            className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight scroll-mt-24"
          >
            How to Calculate Generator Size
          </h2>

          <p>
            A common sizing error is adding every appliance&apos;s starting wattage together. If you list a refrigerator (1,200W starting), a sump pump (2,000W starting), and a furnace blower (1,800W starting), naive addition suggests you need 5,000 Watts of surge capacity just for those three items.
          </p>

          <p>
            In practice, electric motors cycle asynchronously. Your refrigerator compressor, sump pump float switch, and heating thermostat do not coordinate their startups. Adding every starting surge together assumes every motor starts at the exact same millisecond, leading to excessive oversizing and unnecessary equipment cost.
          </p>

          <p>
            To reflect real-world operating conditions without overpaying for excess capacity, CalcMyPower uses an established four-step planning model based on our broader suite of{" "}
            <Link
              href="/calculators"
              className="text-blue-600 font-semibold hover:underline"
            >
              electrical and power calculation tools
            </Link>
            :
          </p>

          <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 space-y-3 font-mono text-xs sm:text-sm">
            <div className="space-y-0.5">
              <span className="text-blue-400 font-bold">Step 1: Total Running Watts</span>
              <p className="text-slate-300">W_running = Sum of all selected appliance running watts</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-blue-400 font-bold">Step 2: Largest Additional Starting Surge</span>
              <p className="text-slate-300">Delta_W_max = Maximum of (Starting Watts - Running Watts) among active loads</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-blue-400 font-bold">Step 3: Peak Starting Demand</span>
              <p className="text-slate-300">W_peak = W_running + Delta_W_max</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-blue-400 font-bold">Step 4: CalcMyPower Planning Capacity</span>
              <p className="text-slate-300">W_planning = W_peak × 1.25 (CalcMyPower Planning Headroom Factor)</p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs sm:text-sm space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Understanding the 25% Planning Margin</span>
            </div>
            <p>
              The <strong>1.25× planning headroom factor</strong> is an equipment planning margin used by CalcMyPower and recommended by generator manufacturers (such as Cummins, Generac, and Kohler). Small combustion engines run quieter, consume fuel more efficiently, and suffer less thermal stress when loaded to roughly 70% to 80% of their continuous rating.
            </p>
            <p>
              This 25% margin is a practical equipment guideline, not a universal National Electrical Code (NEC) requirement for portable generators. While NEC Article 210.20(A) requires a 125% continuous duty rating for fixed branch circuits carrying steady loads for three hours or more, generator manufacturers apply headroom to absorb secondary startup cycles, fuel variations, and altitude losses.
            </p>
            <p>
              Note also that this simplified model assumes only one major motor starts at a time. If an automated system re-energizes multiple large compressors simultaneously without staged delays, formal engineering load calculations are required.
            </p>
          </div>
        </section>

        {/* Section: Worked Example */}
        <section className="space-y-4 border-t border-slate-200 pt-8">
          <h2
            id="worked-example"
            className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight scroll-mt-24"
          >
            Worked Example: Sizing a Generator for Essential Home Loads
          </h2>

          <p>
            Here is a realistic outage scenario for a family home backing up critical appliances through a manual transfer switch during a winter storm:
          </p>

          <div className="border border-slate-200 rounded-2xl p-5 sm:p-6 bg-white space-y-4 shadow-sm">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="font-bold text-slate-900 text-sm">
                Illustrative Equipment Profile &amp; Example Load Ratings
              </h3>
              <p className="text-xs text-slate-500">
                Representative baseline estimates for this scenario; verify actual nameplate tags on your appliances for exact values.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between p-2 rounded bg-slate-50">
                <span>1× Refrigerator / Freezer:</span>
                <span className="font-mono font-semibold">180W run / 1,200W start (Δ 1,020W)</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-50">
                <span>1× Gas Furnace Blower (1/2 HP):</span>
                <span className="font-mono font-semibold">700W run / 1,800W start (Δ 1,100W)</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-50">
                <span>1× Sump Pump (1/3 HP):</span>
                <span className="font-mono font-semibold">600W run / 1,400W start (Δ 800W)</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-50">
                <span>1× Microwave Oven:</span>
                <span className="font-mono font-semibold">1,200W run / 1,200W start (Δ 0W)</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-50">
                <span>1× Internet Router &amp; Fiber ONT:</span>
                <span className="font-mono font-semibold">25W run / 25W start (Δ 0W)</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-50">
                <span>5× Rooms LED Lighting:</span>
                <span className="font-mono font-semibold">150W run / 150W start (Δ 0W)</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-50">
                <span>2× Phone &amp; Laptop Chargers:</span>
                <span className="font-mono font-semibold">100W run / 100W start (Δ 0W)</span>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-3 space-y-2 text-xs sm:text-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-100 pb-2">
                <span className="text-slate-700">1. Total Running Watts:</span>
                <span className="font-mono font-bold text-slate-900">
                  180 + 700 + 600 + 1,200 + 25 + 150 + 100 = 2,955 Watts
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-100 pb-2">
                <span className="text-slate-700">2. Largest Single Motor Surge Delta:</span>
                <span className="font-mono font-bold text-amber-700">
                  +1,100 Watts (Gas Furnace Blower: 1,800W - 700W)
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-100 pb-2">
                <span className="text-slate-700">3. Peak Starting Demand:</span>
                <span className="font-mono font-bold text-slate-900">
                  2,955W + 1,100W = 4,055 Watts
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-1">
                <span className="font-bold text-blue-900 text-sm">
                  4. CalcMyPower Planning Capacity (1.25×):
                </span>
                <span className="font-mono font-black text-blue-600 text-base">
                  4,055W × 1.25 = 5,069 Watts (~5.1 kW)
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="font-bold text-slate-900 text-base">
              Translating This Calculation to Generator Nameplate Ratings
            </h3>
            <p>
              When comparing this result against manufacturer specification sheets, distinguish between the calculated planning target and the generator&apos;s physical nameplate ratings:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 pl-4 list-disc">
              <li>
                <strong>Continuous Rating:</strong> Total continuous running load in this scenario is 2,955 Watts. While a 5,000-Watt rated continuous generator can carry the running load, our calculated planning capacity of 5,069 Watts (which includes the 25% planning margin above the single-motor peak) slightly exceeds 5,000 Watts. To maintain comfortable headroom and avoid loading the engine past 80%, equipment in the illustrative <strong>5,500 to 6,500-Watt continuous class</strong> serves as a practical target for this load profile.
              </li>
              <li>
                <strong>Surge Capability:</strong> The generator&apos;s momentary surge rating must comfortably exceed the 4,055-Watt peak. Portable generators in this illustrative 5,500W to 6,500W continuous class frequently provide around 6,800W to 8,500W of starting surge capacity depending on the manufacturer and model, easily absorbing the furnace blower&apos;s inrush demand.
              </li>
              <li>
                <strong>Voltage &amp; Circuit Requirements:</strong> Because this setup feeds circuits across both panel bus bars through a home transfer switch, a dual-voltage 120V/240V connection is required (a common example on portable generators in this class is a 120/240V, 30A 4-prong locking configuration such as a NEMA L14-30 receptacle and power inlet box). The actual generator outlet, inlet box, transfer switch, wire gauge, and circuit breaker ratings must match your specific equipment and electrical installation requirements. A standard 120V-only generator cannot energize both bus bars in a split-phase panel without specialized transfer equipment.
              </li>
              <li>
                <strong>Fuel Type &amp; Output Variations:</strong> If planning to run on liquid propane or natural gas instead of gasoline, verify the fuel-specific nameplate ratings. Generator output can vary by fuel type and model; multi-fuel generators typically deliver lower continuous and surge wattage on propane or natural gas than on gasoline. Check the manufacturer&apos;s specifications for exact fuel-rated capacities when selecting a unit.
              </li>
            </ul>
          </div>
        </section>

        {/* Section: Square Footage Analysis */}
        <section className="space-y-4 border-t border-slate-200 pt-8">
          <h2
            id="square-footage"
            className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight scroll-mt-24"
          >
            What Size Generator for a 1,500, 2,000, or 2,500 Sq Ft House?
          </h2>

          <p>
            Homeowners often look for sizing rules based on home dimensions: <em>&quot;what size generator for 1500 sq ft house&quot;</em> or <em>&quot;what size generator for 2000 sq ft house&quot;</em>.
          </p>

          <p>
            Square footage gives a rough sense of house scale, but it does not determine generator size by itself. What matters is the mechanical fuel source and equipment type. Running your numbers through our{" "}
            <Link
              href="/generator-size-calculator"
              className="text-blue-600 font-semibold hover:underline"
            >
              home generator calculator
            </Link>{" "}
            reveals how connected wattage diverges based on appliances rather than floor space. Consider two homes of the exact same size:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="font-bold text-slate-900 text-sm block">Home A: 2,000 Sq Ft (Gas Infrastructure)</span>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• Natural gas heating (fan only: 700W)</li>
                <li>• Gas water heater (control: 50W)</li>
                <li>• Municipal city water (no pump: 0W)</li>
                <li>• Gas cooktop (igniter: 50W)</li>
              </ul>
              <p className="text-xs text-slate-500 pt-1 border-t border-slate-200">
                <strong>Illustrative Critical Load Profile:</strong> ~3,500 to 4,500 Watts covers all essentials.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="font-bold text-slate-900 text-sm block">Home B: 2,000 Sq Ft (All-Electric Rural)</span>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• Electric heat pump with heat strips (8,000W+)</li>
                <li>• 50-gallon electric water heater (4,500W)</li>
                <li>• Submersible deep-well pump (1,500W run / 3,500W start)</li>
                <li>• Electric range and oven (3,500W)</li>
              </ul>
              <p className="text-xs text-slate-500 pt-1 border-t border-slate-200">
                <strong>Illustrative Critical Load Profile:</strong> ~18,000 to 22,000 Watts required for whole-home continuity.
              </p>
            </div>
          </div>

          <p>
            These figures are illustrative load profiles demonstrating how equipment choice alters power demand, not universal sizing formulas. With that context in mind, here is how typical residential homes generally align across common floor plans:
          </p>

          <div className="space-y-3 pt-2">
            <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-1">
              <h3 className="font-bold text-slate-900 text-sm">
                Illustrative Sizing Profile for a 1,500 Sq Ft Home
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                In a typical 1,500 sq ft home with natural gas heating and city water, essential circuits (refrigerator, furnace fan, lights, and electronics) require roughly <strong>3,500W to 5,000W</strong> of capacity. If you want to power a central air conditioner (typically 2 to 2.5 tons for this footprint), continuous load rises toward <strong>7,500W to 9,500W</strong>. Full automatic whole-home backup for an all-electric 1,500 sq ft layout generally calls for an illustrative <strong>14 kW to 18 kW</strong> standby unit.
              </p>
            </div>

            <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-1">
              <h3 className="font-bold text-slate-900 text-sm">
                Illustrative Sizing Profile for a 2,000 Sq Ft Home
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                For a 2,000 sq ft property with gas heat, essential circuits require an illustrative <strong>4,500W to 6,500W</strong>. Adding a 3-ton central air conditioner raises demand to <strong>8,500W to 10,500W</strong>. For hands-off, automatic whole-house coverage supporting electric water heating and general convenience, a <strong>20 kW to 22 kW</strong> standby generator is standard.
              </p>
            </div>

            <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-1">
              <h3 className="font-bold text-slate-900 text-sm">
                Illustrative Sizing Profile for a 2,500 Sq Ft Home
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                A 2,500 sq ft home frequently features dual heating zones, larger central air conditioning compressors (3.5 to 4 tons), and higher simultaneous lighting density. Essential circuits require roughly <strong>5,500W to 7,500W</strong>. Running central cooling alongside essentials demands <strong>10,000W to 12,500W</strong>. Whole-house automatic standby coverage typically requires a <strong>22 kW to 26 kW</strong> generator paired with an automatic transfer switch.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Common Appliances Sizing */}
        <section className="space-y-4 text-slate-700 leading-relaxed border-t border-slate-200 pt-8">
          <h2
            id="common-appliances"
            className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight scroll-mt-24"
          >
            What Size Generator Do I Need for Common Appliances?
          </h2>

          <p>
            When sizing a generator for high-demand equipment, the figures below represent common residential baseline estimates. Because actual running and starting requirements vary by manufacturer, age, and compressor design, always check your equipment&apos;s data tag. Generator sizing also depends heavily on whether the appliance operates in isolation or alongside other household loads.
          </p>

          <div className="space-y-3 my-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
              <h3 className="font-bold text-slate-900 text-sm flex flex-wrap items-center justify-between gap-1">
                <span>Running a Refrigerator on a Generator</span>
                <span className="text-xs font-mono font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  Isolated Load: ~1,200W Starting Surge
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                A modern residential refrigerator consumes only 150 to 200 running Watts. However, when the compressor cycles on, it demands a momentary startup surge of 1,000 to 1,500 Watts for approximately two seconds. In isolation, a small 2,000-Watt inverter generator handles a refrigerator with ease. In a home outage scenario where lights and a furnace blower are already running, factor in that 1,000W to 1,200W startup delta above the baseline load.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
              <h3 className="font-bold text-slate-900 text-sm flex flex-wrap items-center justify-between gap-1">
                <span>Running Central Air Conditioning</span>
                <span className="text-xs font-mono font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  Isolated Load: ~7,500 to 9,500W Starting Surge
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Central air conditioning is the heaviest motor load in residential homes. A 3-ton (36,000 BTU) unit draws roughly 3,500 running Watts, but starting inrush current can demand 7,500 to 9,500 Watts. Powering a central AC alongside basic home circuits typically requires at least an <strong>8,500W to 10,000W generator</strong>. However, installing an aftermarket compressor soft-starter (such as a Micro-Air EasyStart) reduces startup inrush by 60% to 70%, allowing a smaller 5,500W to 7,000W generator to start the AC without stalling the engine.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
              <h3 className="font-bold text-slate-900 text-sm flex flex-wrap items-center justify-between gap-1">
                <span>Running a Sump Pump</span>
                <span className="text-xs font-mono font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  Isolated Load: ~1,800 to 2,200W Starting Surge
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                A 1/3 HP sump pump draws roughly 600W running and 1,400W starting. A heavier 1/2 HP pump draws 800W to 1,000W running and surges to 1,800W to 2,200W when pumping against head pressure. Operating a sump pump alongside refrigeration and lights generally requires a generator in the <strong>3,500W to 5,000W continuous range</strong> so that other appliances do not drop out when the pump switch engages.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
              <h3 className="font-bold text-slate-900 text-sm flex flex-wrap items-center justify-between gap-1">
                <span>Running a Submersible Well Pump</span>
                <span className="text-xs font-mono font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  Isolated Load: ~2,500 to 3,500W Starting Surge (240V Required)
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Unlike 120-volt sump pumps, most residential submersible well pumps operate on <strong>240 Volts</strong>. For illustrative planning, a typical 1/2 HP well pump draws roughly 1,000W running and 2,500W starting, while a 1 HP pump draws around 1,500W running and 3,500W starting. Because well pumps require 240V, standard 120V-only portable generators cannot power them directly. You must select a generator capable of 120V/240V dual-voltage output (for instance, utilizing a 240V locking outlet such as a NEMA L14-30R or equivalent matching your transfer hardware) with sufficient running and surge capacity for the pump and concurrent household loads, typically starting around <strong>5,000 to 6,500 continuous Watts or higher</strong>. Always verify the pump motor nameplate data and consult a qualified electrician to ensure wire sizing and transfer hardware match the circuit requirements.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Portable vs Standby */}
        <section className="space-y-4 text-slate-700 leading-relaxed border-t border-slate-200 pt-8">
          <h2
            id="portable-vs-standby"
            className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight scroll-mt-24"
          >
            Portable Generator vs. Whole-House Standby Generator
          </h2>

          <p>
            Once you estimate your wattage demand, the primary equipment choice is between a portable unit and a permanently installed standby system. When planning transfer hardware or generator cord sizing, converting wattage to current with our{" "}
            <Link
              href="/watts-to-amps-calculator"
              className="text-blue-600 font-semibold hover:underline"
            >
              Watts to Amps Calculator
            </Link>{" "}
            ensures you match your 30-amp or 50-amp inlet safely.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="border border-slate-200 rounded-2xl p-5 bg-white space-y-2.5 shadow-sm">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <Sliders className="w-5 h-5 text-blue-600" />
                <h3 className="text-base">Portable Generators (3 kW to 12 kW)</h3>
              </div>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-1.5">
                <li>• <strong>Typical Cost:</strong> $600 to $2,500 for the unit; $800 to $1,500 for transfer switch and inlet box installation.</li>
                <li>• <strong>Fuel:</strong> Gasoline, 20-lb propane tanks, or dual-fuel options. Requires fresh fuel storage and regular stabilizer treatment.</li>
                <li>• <strong>Operation:</strong> Manual setup. Must be wheeled outdoors, fueled, plugged in, and started in storm conditions.</li>
                <li>• <strong>Best Suited For:</strong> Sump pumps, refrigeration, heating controls, and homeowners comfortable with manual deployment.</li>
              </ul>
            </div>

            <div className="border border-slate-200 rounded-2xl p-5 bg-white space-y-2.5 shadow-sm">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <Plug className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base">Whole-House Standby (14 kW to 26 kW)</h3>
              </div>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-1.5">
                <li>• <strong>Typical Cost:</strong> $4,000 to $7,500 for the unit; $3,000 to $6,000 for electrical wiring, gas piping, and municipal permits.</li>
                <li>• <strong>Fuel:</strong> Hard-plumbed to natural gas utility lines or a large 250 to 500 gallon propane tank. Continuous runtime without refueling.</li>
                <li>• <strong>Operation:</strong> Fully automatic. Senses utility outage, starts the engine, and transfers load within 10 to 20 seconds.</li>
                <li>• <strong>Best Suited For:</strong> Central air conditioning, medical equipment, all-electric homes, and hands-off reliability.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Common Sizing Mistakes */}
        <section className="space-y-4 text-slate-700 leading-relaxed border-t border-slate-200 pt-8">
          <h2
            id="sizing-mistakes"
            className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight scroll-mt-24"
          >
            Common Generator Sizing Mistakes
          </h2>

          <div className="space-y-3 my-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                1. Sizing Only from Square Footage
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Square footage measures area, not electrical load. A small home with electric baseboard heat and an electric water heater requires far more generator capacity than a large home with natural gas infrastructure.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                2. Summing Every Appliance&apos;s Starting Watts
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Adding every startup surge assumes all motors start at the exact same fraction of a second. This artificially inflates your required generator capacity by thousands of watts.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                3. Running at 100% Continuous Engine Load
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Operating a generator continuously at its maximum nameplate continuous rating causes high engine temperatures, rapid fuel consumption, and voltage sag. Aim to operate within roughly 70% to 80% of rated capacity.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                4. Overlooking 120V vs. 240V Requirements
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Small inverter portables generally output only 120 Volts. If your plan includes a 240V well pump, central AC, or electric clothes dryer, you must have a dual-voltage 120V/240V generator.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                5. Neglecting Elevation Derating
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Atmospheric air density decreases at higher altitudes, reducing engine power output. Most small-engine and generator manufacturers provide model-specific altitude derating tables in their operator manuals (often advising a capacity reduction around 3% to 3.5% per 1,000 feet above a baseline elevation) along with carburetor jetting recommendations for high-altitude operation. Check your equipment manufacturer&apos;s manual if operating above 1,000 to 2,000 feet.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Calculator CTA */}
        <section className="border-t border-slate-200 pt-8">
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-500/30">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Interactive Sizing Engine</span>
            </div>

            <h2
              id="calculator"
              className="text-2xl sm:text-3xl font-black tracking-tight text-white scroll-mt-24"
            >
              Calculate Your Custom Household Generator Size
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Select your specific household appliances, customize wattages, and calculate running load, motor surge demand, and planning capacity directly in our interactive sizing tool.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/generator-size-calculator"
                className="px-6 py-3 rounded-xl bg-blue-500 text-white font-bold text-sm hover:bg-blue-400 transition inline-flex items-center gap-2 shadow-md shadow-blue-500/20"
              >
                <span>Open Generator Size Calculator</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/calculators"
                className="px-5 py-3 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm hover:bg-slate-700 transition"
              >
                All Electrical Calculators
              </Link>
            </div>
          </div>
        </section>

        {/* Section: Safety Considerations */}
        <section className="space-y-4 text-slate-700 leading-relaxed border-t border-slate-200 pt-8">
          <h2
            id="safety"
            className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight scroll-mt-24"
          >
            Critical Generator Safety Rules
          </h2>

          <p>
            Emergency generators provide critical resilience during storms, but improper installation and operation introduce severe life-safety hazards.
          </p>

          {/* Safety Image */}
          <figure className="space-y-2 my-6">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
              <Image
                src="/images/articles/portable-generator-outdoor-safety.jpg"
                alt="Portable dual-fuel inverter generator operating safely outdoors on a gravel driveway well over twenty feet away from home windows and doors"
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
              />
            </div>
            <figcaption className="text-xs text-slate-500 italic text-center">
              Figure 2: Portable generators must operate exclusively outdoors at least 20 feet away from windows, doors, and vents with the exhaust directed away from the building.
            </figcaption>
          </figure>

          <div className="space-y-4">
            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-5 sm:p-6 space-y-2 text-amber-900">
              <h3 className="font-bold text-amber-950 text-base flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
                Carbon Monoxide (CO) Poisoning (CDC &amp; CPSC Rule)
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed">
                The U.S. Consumer Product Safety Commission (CPSC) and Centers for Disease Control and Prevention (CDC) issue clear guidance: portable generator exhaust produces high levels of carbon monoxide (CO), a colorless, odorless, and lethal gas.
              </p>
              <ul className="text-xs sm:text-sm space-y-1 list-disc pl-5">
                <li>Operate portable generators exclusively outdoors, at least <strong>20 feet (6 meters)</strong> away from all windows, doors, vents, and air intakes.</li>
                <li>Direct the exhaust muffler away from the home and any neighboring structures.</li>
                <li>Never run a generator in a garage, basement, crawlspace, or covered porch, even with open doors.</li>
                <li>Install battery-backed carbon monoxide alarms on every living level of your home (NFPA 720).</li>
              </ul>
            </div>

            <div className="bg-rose-50/80 border border-rose-200 rounded-2xl p-5 sm:p-6 space-y-2 text-rose-900">
              <h3 className="font-bold text-rose-950 text-base flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                Anti-Backfeeding &amp; Transfer Equipment (NEC Article 702)
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed">
                Never connect a generator to home wiring using a male-to-male extension cord plugged into an ordinary wall outlet. This illegal practice, known as &quot;backfeeding,&quot; energizes the utility transformer on the street, stepping generator power up to thousands of volts on downed utility lines. This creates an immediate electrocution hazard for utility line workers and can start an electrical fire when utility power restores.
              </p>
              <p className="text-xs sm:text-sm leading-relaxed">
                Under the National Electrical Code (NEC Article 702), connecting a generator to a building&apos;s electrical panel requires an approved manual transfer switch or a mechanical breaker interlock kit. These devices physically prevent the home from connecting to utility power and generator power at the same time. Always hire a licensed electrician to install transfer equipment.
              </p>
            </div>
          </div>
        </section>

        {/* Section: FAQ */}
        <section className="space-y-6 border-t border-slate-200 pt-8">
          <div>
            <h2
              id="faq"
              className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight scroll-mt-24"
            >
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Practical answers to common residential generator sizing and selection questions.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_DATA.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-5 space-y-1.5 shadow-sm"
              >
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Related Tools & Internal Links */}
        <section className="space-y-4 border-t border-slate-200 pt-8">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Related Power &amp; Sizing Tools
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Explore companion calculators on CalcMyPower to plan electrical circuits and battery backups:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            <Link
              href="/generator-size-calculator"
              className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-2"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                <Plug className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition">
                Generator Size Calculator
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tally your exact appliances, calculate single-motor surge demand, and size your generator with planning headroom.
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
                Watts to Amps Calculator
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Convert generator wattage to current draw (Amps) across 120V and 240V circuits to verify breaker and cord capacity.
              </p>
            </Link>

            <Link
              href="/ups-battery-backup-calculator"
              className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-2"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                <BatteryCharging className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition">
                UPS Runtime Calculator
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Calculate battery backup runtime for electronics, routers, and CPAP machines before the generator starts.
              </p>
            </Link>
          </div>
        </section>

        {/* Section: Sources & References */}
        <footer className="border-t border-slate-200 pt-8 space-y-3 text-xs text-slate-500">
          <h2 className="font-bold text-slate-700 text-sm">
            Authoritative Sources &amp; References
          </h2>
          <ul className="space-y-1.5 list-disc pl-5">
            <li>
              <strong>U.S. Consumer Product Safety Commission (CPSC):</strong>{" "}
              <span className="italic">Portable Generators Carbon Monoxide Hazards and Outdoor Distance Guidelines</span> (20-foot outdoor placement rule).
            </li>
            <li>
              <strong>Centers for Disease Control and Prevention (CDC):</strong>{" "}
              <span className="italic">Carbon Monoxide Poisoning Prevention After Disasters and Storms</span>.
            </li>
            <li>
              <strong>National Fire Protection Association (NFPA):</strong>{" "}
              <span className="italic">NFPA 70: National Electrical Code (NEC)</span>, Article 702 (Optional Standby Systems) &amp; Article 210.20(A) (Continuous Duty Overcurrent Protection).
            </li>
            <li>
              <strong>U.S. Department of Energy (DOE):</strong>{" "}
              <span className="italic">Energy Saver: Estimating Appliance and Home Electronic Energy Use</span>.
            </li>
            <li>
              <strong>Manufacturer Engineering Guidelines:</strong>{" "}
              <span className="italic">Cummins Power Generation, Generac Power Systems, and Kohler Power Systems Technical Sizing Manuals</span> (Motor starting inrush, Locked Rotor Amps, and 70 to 80% continuous operating band recommendations).
            </li>
            <li>
              <strong>Small Engine &amp; Generator Manufacturer Guidelines:</strong>{" "}
              <span className="italic">Operator and Service Manuals (e.g., Honda Power Equipment, Briggs &amp; Stratton, Generac)</span> for elevation derating, carburetor re-jetting, and ambient temperature operating limits.
            </li>
          </ul>
        </footer>
          </div>

          {/* Desktop Sticky Table of Contents Sidebar */}
          <aside className="hidden lg:block">
            <TableOfContents items={TOC_ITEMS} />
          </aside>
        </div>
      </article>
    </>
  );
}
