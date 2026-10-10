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
  CheckCircle2,
  Clock,
  HelpCircle,
  Calculator,
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
import { ArticleDateByline } from "@/components/article/ArticleDateByline";
import ZoomableArticleImage from "@/components/article/ZoomableArticleImage";

export const metadata: Metadata = {
  title: "What Size Generator to Run a Refrigerator? Sizing Guide",
  description:
    "Determine what size generator you need to run a refrigerator during a power outage based on running watts, compressor startup surge, and simultaneous household loads.",
  alternates: {
    canonical: "https://calcmypower.com/what-size-generator-to-run-a-refrigerator",
  },
  openGraph: {
    title: "What Size Generator to Run a Refrigerator? Sizing Guide | CalcMyPower",
    description:
      "A practical engineering guide to sizing portable inverter and emergency generators for household refrigerators and freezers.",
    url: "https://calcmypower.com/what-size-generator-to-run-a-refrigerator",
    type: "article",
    publishedTime: "2026-09-27T12:00:00Z",
    modifiedTime: "2026-09-28T00:00:00Z",
    images: [
      {
        url: "https://calcmypower.com/images/articles/residential-refrigerator-kitchen.webp",
        width: 1280,
        height: 720,
        alt: "Modern residential kitchen with a stainless steel French door refrigerator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "What Size Generator to Run a Refrigerator? | CalcMyPower",
    description:
      "Calculate the right generator wattage for your refrigerator and freezer during a storm outage.",
    images: [
      "https://calcmypower.com/images/articles/residential-refrigerator-kitchen.webp",
    ],
  },
};

const REFRIGERATOR_TOC_ITEMS: TocItem[] = [
  { id: "quick-answer", label: "Direct Answer & Sizing Brackets" },
  { id: "how-many-watts", label: "How Many Watts Does a Fridge Use?" },
  { id: "running-vs-starting-watts", label: "Running Watts vs. Starting Watts" },
  { id: "will-a-2000-watt-generator-run-a-refrigerator", label: "Will a 2,000W Generator Run a Fridge?" },
  { id: "refrigerator-and-freezer", label: "Fridge and Separate Freezer Sizing" },
  { id: "check-nameplate", label: "Checking Your Refrigerator Nameplate" },
  { id: "how-to-calculate", label: "How to Calculate Required Capacity" },
  { id: "worked-example", label: "Worked Example: Outage Power Plan" },
  { id: "other-appliances", label: "Adding Other Household Appliances" },
  { id: "common-mistakes", label: "Common Generator Sizing Mistakes" },
  { id: "calculator-bridge", label: "Interactive Generator Calculator" },
  { id: "generator-safety", label: "Carbon Monoxide & Extension Cords" },
  { id: "faq", label: "Frequently Asked Questions" },
];

const FAQ_DATA = [
  {
    question: "What size generator do I need to run a refrigerator?",
    answer:
      "A generator rated for 1,500 to 2,000 starting watts and 1,000 running watts handles almost any modern residential refrigerator. To include household LED lights, phones, and a router, a 2,000-watt inverter generator provides comfortable headroom.",
  },
  {
    question: "Will a 2,000-watt generator run a refrigerator?",
    answer:
      "Yes. A 2,000-watt inverter generator easily provides the 1,000 to 1,200 surge watts needed to start the compressor. Avoid running high-draw heating appliances like microwaves or coffee makers simultaneously to prevent tripping the breaker.",
  },
  {
    question: "How many watts does a standard refrigerator use?",
    answer:
      "A typical modern refrigerator uses between 100 and 200 running watts while the compressor is actively cooling. Because the compressor cycles periodically, average daily energy consumption totals roughly 1 to 2 kilowatt-hours.",
  },
  {
    question: "What size generator do I need for a refrigerator and freezer?",
    answer:
      "Look for a generator delivering at least 2,000 continuous running watts and 2,500 to 3,000 starting surge watts. This reserve comfortably absorbs overlapping motor inrush spikes if both cooling compressors cycle on simultaneously.",
  },
  {
    question: "Why do refrigerators need starting watts?",
    answer:
      "Stationary electric compressor motors lack counter-electromotive force during startup, drawing brief inrush currents to overcome mechanical inertia. This initial surge lasts roughly one second before current drops to steady continuous running wattage.",
  },
  {
    question: "Can I use an extension cord from my generator to my refrigerator?",
    answer:
      "Yes, using a properly rated outdoor cord. A 14 AWG heavy-duty cord works for runs up to 50 feet, while runs up to 100 feet require 12 AWG to prevent excessive voltage drop.",
  },
  {
    question: "Can I run my refrigerator on an inverter generator?",
    answer:
      "Yes, inverter generators are ideal for refrigerators. Their clean electrical output with low harmonic distortion protects sensitive digital control boards and inverter compressors while burning less fuel than open-frame units.",
  },
];

export default function RefrigeratorGeneratorSizingPage() {
  const articleSchema = generateArticleSchema({
    headline: "What Size Generator Do I Need to Run a Refrigerator?",
    description:
      "Determine what size generator you need to run a refrigerator during a power outage based on running watts, compressor startup surge, and simultaneous household loads.",
    url: "https://calcmypower.com/what-size-generator-to-run-a-refrigerator",
    datePublished: "2026-09-27T12:00:00Z",
    dateModified: "2026-09-28T00:00:00Z",
    images: [
      "https://calcmypower.com/images/articles/residential-refrigerator-kitchen.webp",
      "https://calcmypower.com/images/articles/refrigerator-electrical-rating-label.webp",
    ],
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    {
      name: "Generator Size Calculator",
      url: "https://calcmypower.com/generator-size-calculator",
    },
    {
      name: "What Size Generator Do I Need to Run a Refrigerator?",
      url: "https://calcmypower.com/what-size-generator-to-run-a-refrigerator",
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
      <MobileArticleNavigator items={REFRIGERATOR_TOC_ITEMS} />

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
            href="/generator-size-calculator"
            className="hover:text-blue-600 transition"
          >
            Generator Size Calculator
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-slate-800 font-semibold truncate">
            What Size Generator Do I Need to Run a Refrigerator?
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
                  Outage Planning
                </span>
                <span className="text-slate-400">•</span>
                <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>10 min read</span>
                </span>
                <span className="text-slate-400">•</span>
                <ArticleDateByline datePublished="2026-09-27" lastModified="2026-09-28" />
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                What Size Generator Do I Need to Run a Refrigerator?
              </h1>

              <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-normal">
                Keeping perishable food and medication cold is the first priority during a utility power outage. Sizing a generator for your refrigerator requires matching steady running watts and compressor startup surge without paying for unnecessary generator capacity.
              </p>
            </header>

            {/* Hero Image */}
            <div className="space-y-3">
              <ZoomableArticleImage
                src="/images/articles/residential-refrigerator-kitchen.webp"
                alt="Modern residential kitchen with a stainless steel French door refrigerator and granite countertops"
                title="Residential Refrigerator Power Sizing"
                caption="Figure 1: Modern residential refrigerators draw relatively low running wattage, but their cooling compressors demand a brief burst of starting power when cycling on."
              >
                <Image
                  src="/images/articles/residential-refrigerator-kitchen.webp"
                  alt="Modern residential kitchen with a stainless steel French door refrigerator and granite countertops"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                />
              </ZoomableArticleImage>
            </div>

            {/* Section 1: Direct Answer */}
            <section id="quick-answer" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Direct Answer: What Size Generator Runs a Refrigerator?
              </h2>

              <p>
                A generator rated for <strong>2,000 starting watts and 1,000 running watts</strong> can comfortably start and power virtually any standard residential kitchen refrigerator.
              </p>

              <p>
                A compact 2,000 to 2,200-watt portable inverter generator is typically the sweet spot for homeowners seeking to preserve food and maintain basic circuits during an outage.
              </p>

              <p>
                No single wattage number applies universally to every home. The ratings cited throughout this guide (such as 100 to 200 running watts and 800 to 1,200 starting watts) serve as representative benchmarks for typical modern units.
              </p>

              <p>
                Actual requirements depend on compressor type (inverter versus single-speed), cabinet volume, ambient temperature, and shared circuit loads. Always check your refrigerator data plate for exact ratings.
              </p>

              {/* Sizing Brackets Summary Callout */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <h3>Practical Generator Sizing Brackets for Refrigeration</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 block text-sm">
                      1,500 to 2,000 Watts
                    </span>
                    <span className="text-blue-700 font-semibold block text-xs">
                      Single Refrigerator Dedicated
                    </span>
                    <p className="text-slate-600">
                      Sufficient for any modern 14 to 28 cu. ft. refrigerator running on a dedicated heavy-duty extension cord with zero high-draw heating appliances.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 block text-sm">
                      2,000 to 2,500 Watts
                    </span>
                    <span className="text-blue-700 font-semibold block text-xs">
                      Refrigerator + Essential Circuits
                    </span>
                    <p className="text-slate-600">
                      Powers one full-size kitchen refrigerator plus an internet router, four rooms of LED lighting, laptops, and multiple phone chargers.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 block text-sm">
                      2,500 to 3,500 Watts
                    </span>
                    <span className="text-blue-700 font-semibold block text-xs">
                      Refrigerator + Deep Freezer
                    </span>
                    <p className="text-slate-600">
                      Handles a primary kitchen refrigerator, a secondary garage chest or upright freezer, household lighting, and small entertainment loads safely.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 block text-sm">
                      3,500 to 5,000 Watts
                    </span>
                    <span className="text-blue-700 font-semibold block text-xs">
                      Food Storage + Cooking / Sump
                    </span>
                    <p className="text-slate-600">
                      Allows running your refrigerator alongside intermittent 1,000-watt microwave ovens, a 1/2 HP basement sump pump, or a gas furnace blower.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: How Many Watts Does a Fridge Use? */}
            <section id="how-many-watts" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                How Many Watts Does a Refrigerator Use?
              </h2>

              <p>
                Homeowners researching generator sizing frequently encounter contradictory wattage estimates. Some sources list 800 watts, while energy monitors show a modern unit drawing under 150 watts.
              </p>

              <p>
                Both figures stem from real electrical measurements, but they represent completely different operational states.
              </p>

              <p>
                In steady-state operation, modern residential refrigerators draw relatively little electrical power. The figures below represent typical planning benchmarks for common US households.
              </p>

              <p>
                Actual power varies by compressor technology, cabinet volume, ambient room temperature, and appliance age. Always verify your specific model on its manufacturer data plate:
              </p>

              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  <strong>Compact / Mini Fridges (1.7 to 4.5 cubic feet):</strong> Typically consume <strong>40 to 90 running watts</strong> while the compressor is actively circulating refrigerant.
                </li>
                <li>
                  <strong>Standard Top-Freezer Models (14 to 18 cubic feet):</strong> Typically draw <strong>90 to 150 running watts</strong> during normal cooling cycles.
                </li>
                <li>
                  <strong>Large French-Door &amp; Side-by-Side Units (22 to 30 cubic feet):</strong> Typically pull <strong>140 to 220 running watts</strong> while active.
                </li>
                <li>
                  <strong>Older Models (Built before 2005) or Commercial Units:</strong> May draw <strong>250 to 500 running watts</strong> due to older reciprocating compressors, larger fan assemblies, and less effective cabinet thermal insulation.
                </li>
              </ul>

              <p>
                Refrigerators do not run continuously around the clock. The compressor cycles on and off via an internal thermostat, running approximately 30% to 50% of each hour at normal room temperatures.
              </p>

              <p>
                Over a full 24-hour period, a modern 25 cubic foot refrigerator consumes roughly 1.0 to 1.8 kilowatt-hours (kWh) of total electrical energy.
              </p>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs sm:text-sm text-blue-950 flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <p>
                    <strong>Why internet wattage charts vary:</strong> Online guides often multiply nameplate full-load amperes by 120 volts. A 6.5-amp label indicates the maximum current drawn if the compressor, defrost heater, fans, and ice maker all run simultaneously.
                  </p>
                  <p>
                    During an outage, your generator primarily supplies the steady cooling compressor load, which is substantially lower than this theoretical maximum rating.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: Running Watts vs. Starting Watts */}
            <section id="running-vs-starting-watts" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Refrigerator Running Watts vs. Starting Watts
              </h2>

              <p>
                The primary reason you cannot power a 150-watt refrigerator with a tiny 300-watt camping power station is motor inrush current, also known as starting watts or surge watts.
              </p>

              <p>
                A refrigerator relies on an electric motor inside its sealed compressor dome. When cooling begins, the rotor starts from a dead stop.
              </p>

              <p>
                At that moment, the motor draws inrush current to overcome mechanical inertia and compress refrigerant vapor against static head pressure.
              </p>

              <p>
                This startup surge typically lasts between 0.5 and 2 seconds. Stationary induction motors commonly draw momentary inrush currents several times higher than continuous operating levels until rotor speed normalizes.
              </p>

              <p>
                Actual inrush varies by compressor engineering, refrigerant type, head pressure, and ambient temperature. Modern inverter compressors ramp up gradually with negligible surge, whereas older reciprocating units experience higher peaks.
              </p>

              {/* Sizing Comparison Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3 sm:p-4">Appliance Type (Illustrative Examples)</th>
                      <th className="p-3 sm:p-4">Typical Running Watts</th>
                      <th className="p-3 sm:p-4">Typical Starting Surge</th>
                      <th className="p-3 sm:p-4">Startup Characteristics</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-3 sm:p-4 font-medium text-slate-900">Compact / Dorm Mini Fridge</td>
                      <td className="p-3 sm:p-4">50 W</td>
                      <td className="p-3 sm:p-4 font-mono font-bold text-blue-700">350 W</td>
                      <td className="p-3 sm:p-4 text-slate-600">Compact single-speed compressor</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-medium text-slate-900">Standard Top-Freezer (18 cu. ft.)</td>
                      <td className="p-3 sm:p-4">120 W</td>
                      <td className="p-3 sm:p-4 font-mono font-bold text-blue-700">800 W</td>
                      <td className="p-3 sm:p-4 text-slate-600">Standard hermetic motor assembly</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-medium text-slate-900">Modern French-Door Energy Star</td>
                      <td className="p-3 sm:p-4">160 W</td>
                      <td className="p-3 sm:p-4 font-mono font-bold text-blue-700">1,200 W</td>
                      <td className="p-3 sm:p-4 text-slate-600">High-efficiency hermetic compressor</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-medium text-slate-900">Standalone Chest Freezer (7 cu. ft.)</td>
                      <td className="p-3 sm:p-4">100 W</td>
                      <td className="p-3 sm:p-4 font-mono font-bold text-blue-700">750 W</td>
                      <td className="p-3 sm:p-4 text-slate-600">Low-temperature sealed compressor</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-medium text-slate-900">Older Refrigerator (Pre-2005)</td>
                      <td className="p-3 sm:p-4">250 W</td>
                      <td className="p-3 sm:p-4 font-mono font-bold text-blue-700">1,600 W</td>
                      <td className="p-3 sm:p-4 text-slate-600">Older reciprocating design with high inrush</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-500 italic">
                Note: Wattages in this table are illustrative planning benchmarks based on typical residential measurements.
              </p>
              <p className="text-xs text-slate-500 italic">
                Actual running and surge demands depend on specific model engineering, compressor head pressure, and appliance age. Always verify your manufacturer label.
              </p>

              <p>
                If your generator alternator or inverter circuitry cannot supply this surge current, the output voltage will sag dramatically. A severe voltage sag prevents the compressor rotor from spinning up, trips the generator overload protection, and can overheat the compressor motor windings.
              </p>
            </section>

            {/* Section 4: Will a 2,000-Watt Generator Run a Refrigerator? */}
            <section
              id="will-a-2000-watt-generator-run-a-refrigerator"
              className="space-y-4 scroll-mt-24"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Will a 2,000-Watt Generator Run a Refrigerator?
              </h2>

              <p>
                <strong>Yes, a 2,000-watt generator will run virtually any standard household refrigerator</strong>, provided you understand the generator continuous versus peak ratings and practice basic electrical load management.
              </p>

              <p>
                When shopping for portable generators, remember that generators are marketed by their peak surge wattage, not their continuous output:
              </p>

              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li>
                  A typical <strong>2,000-watt inverter generator</strong> (such as a Honda EU2200i, Champion 2000, or Predator 2000) delivers <strong>1,600 to 1,800 continuous running watts</strong> and <strong>2,000 to 2,200 starting surge watts</strong>.
                </li>
                <li>
                  A standard modern kitchen refrigerator requires approximately <strong>160 running watts</strong> and <strong>1,200 starting surge watts</strong>.
                </li>
              </ul>

              <p>
                Because 1,200 starting watts is well below the 2,000-watt surge ceiling, the generator handles the compressor inrush without hesitation. Once running, the 160-watt load consumes less than 10% of the generator continuous capacity.
              </p>

              {/* Conditional Scenario Breakdown */}
              <div className="border border-slate-200 rounded-2xl p-5 bg-white space-y-4">
                <h3 className="text-base font-bold text-slate-900">
                  When a 2,000W Generator Works vs. When It Overloads
                </h3>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                    <div className="flex items-center gap-2 font-bold text-emerald-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Scenario 1: Refrigerator + Communication &amp; Lighting (Successful)</span>
                    </div>
                    <p className="text-emerald-800">
                      Refrigerator (160W run / 1,200W start) + router (25W) + 5 LED bulbs (45W) + phone chargers (30W) totals <strong>260W continuous load</strong>.
                    </p>
                    <p className="text-emerald-800">
                      When the compressor starts, peak demand reaches 260W + 1,040W surge = <strong>1,300W peak</strong>. This fits safely within standard 1,600W continuous / 2,000W surge ratings.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
                    <div className="flex items-center gap-2 font-bold text-rose-900">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>Scenario 2: Refrigerator + Kitchen Microwave (Overload Trip)</span>
                    </div>
                    <p className="text-rose-800">
                      Plugging a 1,000-watt microwave into the same generator pulls roughly 1,400 to 1,500 continuous electrical watts during cooking.
                    </p>
                    <p className="text-rose-800">
                      If the refrigerator starts while cooking, demand spikes to 1,500W + 1,040W surge = <strong>2,540W</strong>. The generator breaker trips immediately, shutting down both appliances.
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-500">
                  A 2,000-watt generator easily handles dedicated refrigeration and personal electronics during an outage.
                </p>
                <p className="text-xs text-slate-500">
                  Step up to a 3,500-watt generator if you need to run high-draw heating appliances like microwaves or coffee makers simultaneously.
                </p>
              </div>
            </section>

            {/* Section 5: Refrigerator and Freezer */}
            <section id="refrigerator-and-freezer" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                What Size Generator Do I Need for a Refrigerator and Freezer?
              </h2>

              <p>
                Many American households maintain both a kitchen refrigerator-freezer combination and a dedicated standalone chest or upright freezer in a garage or basement. Sizing a generator for both cooling units is a very common requirement.
              </p>

              <p>
                To size correctly for two cooling appliances, apply the principle of <strong>staggered compressor starting demand</strong>:
              </p>

              <ol className="list-decimal list-inside space-y-2 pl-2">
                <li>
                  <strong>Sum Continuous Running Power:</strong> A standard French-door refrigerator draws roughly 160 watts running, while a 10 cubic foot chest freezer draws approximately 100 watts running. Combined continuous power is only <strong>260 running watts</strong>.
                </li>
                <li>
                  <strong>Account for One Motor Starting Surge:</strong> Under normal operation, two independent thermostats cycle asynchronously. They will rarely start at the exact same fraction of a second. Therefore, you size for the continuous load of both units plus the starting surge delta of the single largest motor:
                  <div className="font-mono text-xs sm:text-sm bg-slate-900 text-emerald-400 p-3 rounded-xl my-2 inline-block">
                    Peak Demand = (160W + 100W) + (1,200W - 160W) = 260W + 1,040W = 1,300 Watts
                  </div>
                </li>
                <li>
                  <strong>Apply Practical Planning Headroom:</strong> Step 3 establishes a baseline surge demand of 1,300 watts. In Step 4, applying CalcMyPower 25% planning headroom factor yields:
                  <div className="font-mono text-xs sm:text-sm bg-slate-900 text-emerald-400 p-3 rounded-xl my-2 inline-block">
                    CalcMyPower Planning Capacity = Baseline Surge Demand × 1.25 = 1,300W × 1.25 = 1,625 Watts
                  </div>
                </li>
              </ol>

              <p>
                This calculation demonstrates that a quality <strong>2,000 to 2,500-watt inverter generator</strong> provides comfortable planning capacity to support both a kitchen refrigerator and a standalone freezer.
              </p>

              <p>
                After a multi-hour outage, both warmed cabinet interiors may attempt to start simultaneously when restored. If a 1,200W fridge and 750W freezer start at the exact same second, peak inrush approaches 2,000 watts.
              </p>

              <p>
                To avoid nuisance tripping, connect the main refrigerator first. Wait 60 seconds for its compressor to stabilize before connecting the chest freezer.
              </p>
            </section>

            {/* Section 6: Check Nameplate */}
            <section id="check-nameplate" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                How to Check Your Refrigerator Actual Power Requirements
              </h2>

              <p>
                While general estimates are helpful for initial generator shopping, checking your refrigerator physical rating label is the most reliable way to verify its electrical specifications.
              </p>

              <h3 className="text-xl font-bold text-slate-900">
                1. Locating the Electrical Rating Label
              </h3>
              <p>
                On modern residential refrigerators, the manufacturer data plate is typically located in one of four locations:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-sm">
                <li>Inside the fresh food compartment on the upper left or right side wall.</li>
                <li>Along the interior ceiling frame near the front LED light fixture.</li>
                <li>On the outer edge of the refrigerator door frame or crisper drawer track.</li>
                <li>On the exterior back panel near the lower compressor access grille.</li>
              </ul>

              <div className="space-y-3 my-5">
                <ZoomableArticleImage
                  src="/images/articles/refrigerator-electrical-rating-label.webp"
                  alt="Interior fresh food compartment of a residential refrigerator showing an electrical data rating plate label with 115V AC and 6.0 Amps specifications"
                  title="Refrigerator Electrical Data Rating Label"
                  caption="Figure 2: A typical residential refrigerator electrical data plate on the interior fresh food compartment wall, showing voltage (115V AC), frequency (60 Hz), and rated operating current (6.0 Amps)."
                >
                  <Image
                    src="/images/articles/refrigerator-electrical-rating-label.webp"
                    alt="Interior fresh food compartment of a residential refrigerator showing an electrical data rating plate label with 115V AC and 6.0 Amps specifications"
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover"
                  />
                </ZoomableArticleImage>
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                2. Reading Voltage, Amperage, and Locked Rotor Amps
              </h3>
              <p>
                The label will display electrical specifications in alternating current:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  <strong>Voltage (V):</strong> In the United States, this will indicate <strong>115V or 120V AC, 60 Hz</strong>.
                </li>
                <li>
                  <strong>Full Load Amps (FLA) / Rated Amps (A):</strong> You will typically see a figure between <strong>4.5A and 7.5A</strong>. As noted earlier, this represents the maximum combined draw if internal fans, electronic defrost heaters, and the compressor run simultaneously.
                </li>
                <li>
                  <strong>Locked Rotor Amps (LRA):</strong> If listed, this indicates the absolute maximum current drawn when the compressor motor starts from a dead stop. A refrigerator showing an LRA of 11.5A on a 120V circuit requires 11.5A × 120V = <strong>1,380 starting surge watts</strong>.
                </li>
              </ul>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950 space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  Calculating Watts from Volts and Amps (P = V × I)
                </span>
                <p>
                  Multiplying Volts by Amps (120V × 6.0A = 720 Watts) gives apparent power in Volt-Amps (VA), reflecting maximum design capacity rather than steady active watts.
                </p>
                <p>
                  Because inductive motor power factor ranges from 0.85 to 0.95, real active watts are lower. To convert nameplate current accurately, use our{" "}
                  <Link
                    href="/watts-to-amps-calculator"
                    className="font-bold text-blue-700 underline hover:text-blue-900"
                  >
                    Watts to Amps Electrical Calculator
                  </Link>
                  .
                </p>
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                3. The EnergyGuide Label and Plug-In Watt Meters
              </h3>
              <p>
                If you have the yellow EnergyGuide label, find estimated annual consumption in kilowatt-hours (kWh/yr). A rating of 500 kWh per year equates to roughly 1.37 kWh per day.
              </p>
              <p>
                Dividing 1,370 watt-hours across 24 hours yields an average hourly continuous consumption of just <strong>57 watts</strong>, including on and off cycles.
              </p>
              <p>
                To measure your refrigerator real-time active wattage before an emergency storm arrives, plug it into an inexpensive plug-in watt meter (such as a Kill A Watt) for 24 hours.
              </p>
              <p>
                The meter displays both instantaneous running power and the highest peak starting surge recorded.
              </p>
            </section>

            {/* Section 7: Sizing Methodology */}
            <section id="how-to-calculate" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                How to Calculate Required Generator Size
              </h2>

              <p>
                To avoid underpowering your cooling appliances or overspending on excess generator capacity, CalcMyPower utilizes a transparent, four-step load calculation model. This framework clearly separates continuous running power from momentary motor surge and continuous planning headroom:
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-5">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      Sum Total Continuous Running Watts
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Add the steady continuous running wattage of all equipment operating at the same time:
                      <br />
                      <code className="text-slate-800 font-mono bg-white px-2 py-0.5 rounded border border-slate-200 mt-1 inline-block">
                        Total Running Watts = W_fridge + W_lights + W_router + W_other
                      </code>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      Find the Largest Additional Starting Watts Delta
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Determine the momentary inrush surge above running watts for the single largest electric motor:
                      <br />
                      <code className="text-slate-800 font-mono bg-white px-2 py-0.5 rounded border border-slate-200 mt-1 inline-block">
                        Surge Delta = Max(Starting Watts - Running Watts)
                      </code>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      Calculate Peak Starting Demand (Baseline Surge Demand)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Combine continuous running load with the single largest motor surge delta to establish the baseline momentary surge demand:
                      <br />
                      <code className="text-slate-800 font-mono bg-white px-2 py-0.5 rounded border border-slate-200 mt-1 inline-block">
                        Baseline Surge Demand = Total Running Watts + Largest Surge Delta
                      </code>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      Calculate CalcMyPower Planning Capacity (1.25× Headroom)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Multiply baseline surge demand by a 25% equipment safety buffer:
                      <br />
                      <code className="text-slate-800 font-mono bg-white px-2 py-0.5 rounded border border-slate-200 mt-1 inline-block">
                        CalcMyPower Planning Capacity = Baseline Surge Demand × 1.25
                      </code>
                    </p>
                    <p className="text-xs text-slate-500 pt-1">
                      <strong>Planning distinction:</strong> Planning capacity is an overall sizing target rather than the starting rating of a single appliance. It ensures the generator operates at 75% to 80% load rather than running at its limit.
                    </p>
                    <p className="text-xs text-slate-500">
                      This headroom maintains clean voltage regulation, prevents breaker trips, conserves fuel, and prolongs generator engine life.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 8: Worked Example */}
            <section id="worked-example" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Worked Example: Kitchen Refrigerator Outage Plan
              </h2>

              <p>
                To illustrate how this calculation works in practice, examine a realistic storm outage scenario for a suburban American household keeping food preserved while maintaining home communication.
              </p>

              {/* Step by step worked calculation */}
              <div className="border border-slate-200 rounded-2xl bg-white p-6 space-y-5 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-slate-900 text-base">
                    Scenario: Emergency Food Preservation &amp; Communication
                  </h3>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
                    Real-World Model
                  </span>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <strong>Connected Equipment:</strong>
                      <ul className="mt-1 space-y-1 text-xs text-slate-600">
                        <li>• French-Door Refrigerator (Energy Star)</li>
                        <li>• Wi-Fi Router &amp; Fiber Terminal</li>
                        <li>• 4 Rooms LED Lighting (8 bulbs total)</li>
                        <li>• 2 Smartphone Chargers &amp; 1 Laptop</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <strong>Appliance Wattage Breakdown:</strong>
                      <ul className="mt-1 space-y-1 text-xs text-slate-600">
                        <li>• Refrigerator: 160W running / 1,200W starting</li>
                        <li>• Wi-Fi &amp; Fiber ONT: 25W running / 25W starting</li>
                        <li>• LED Lighting: 60W running / 60W starting</li>
                        <li>• Laptop &amp; Phones: 80W running / 80W starting</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="font-bold text-slate-900 block text-xs uppercase text-slate-500">
                        Step 1: Continuous Running Load
                      </span>
                      <p className="font-mono text-sm text-blue-700 font-semibold mt-0.5">
                        Total Running Watts = 160W + 25W + 60W + 80W = 325 Watts
                      </p>
                      <p className="text-xs text-slate-600 mt-1">
                        When the refrigerator compressor is running normally, all active devices together draw 325 continuous running watts.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="font-bold text-slate-900 block text-xs uppercase text-slate-500">
                        Step 2: Largest Starting Surge Delta
                      </span>
                      <p className="font-mono text-sm text-blue-700 font-semibold mt-0.5">
                        Surge Delta = 1,200W - 160W = 1,040 Watts (Refrigerator Compressor)
                      </p>
                      <p className="text-xs text-slate-600 mt-1">
                        The refrigerator compressor is the primary motor load with momentary startup inrush.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="font-bold text-slate-900 block text-xs uppercase text-slate-500">
                        Step 3: Momentary Peak Starting Demand (Baseline Surge Demand)
                      </span>
                      <p className="font-mono text-sm text-blue-700 font-semibold mt-0.5">
                        Baseline Surge Demand = 325W + 1,040W = 1,365 Watts
                      </p>
                      <p className="text-xs text-slate-600 mt-1">
                        Peak starting demand reaches 1,365 watts for roughly one second when the compressor engages while other devices are active.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="font-bold text-slate-900 block text-xs uppercase text-slate-500">
                        Step 4: CalcMyPower Planning Capacity (1.25×)
                      </span>
                      <p className="font-mono text-sm text-blue-700 font-semibold mt-0.5">
                        CalcMyPower Planning Capacity = 1,365W × 1.25 = 1,706 Watts
                      </p>
                      <p className="text-xs text-slate-600 mt-1">
                        Applying a 25% planning margin establishes a recommended generator target of 1,706 watts planning capacity.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 text-xs sm:text-sm">
                    <strong>Recommended Generator Match:</strong> A standard <strong>2,000 to 2,200-watt portable inverter generator</strong> (rated for 1,600 to 1,800 running watts and 2,000 to 2,200 surge watts) provides complete coverage with 400+ watts of spare headroom. It runs quietly, conserves gasoline, and protects sensitive laptop and router electronics.
                  </div>
                </div>
              </div>
            </section>

            {/* Section 9: What Other Appliances Change Size? */}
            <section id="other-appliances" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                What Other Appliances Change the Required Generator Size?
              </h2>

              <p>
                A refrigerator alone is easy to power. What often catches homeowners off guard is how quickly additional household appliances change generator requirements.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>Adding a Countertop Microwave (+1,200W)</span>
                  </h3>
                  <p className="text-slate-600">
                    A standard 1,000W microwave draws roughly 1,400 to 1,500 electrical watts while heating. Adding a microwave increases continuous load from 325W to 1,775W and peak demand to 2,815W.
                  </p>
                  <span className="font-bold text-blue-600 block text-xs">
                    New Minimum Generator: 3,500 Watts
                  </span>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
                    <Plug className="w-4 h-4 text-blue-600" />
                    <span>Adding a 1/2 HP Sump Pump (+2,100W Surge)</span>
                  </h3>
                  <p className="text-slate-600">
                    A 1/2 HP basement sump pump draws 800 running watts and 2,100 starting surge watts. Its 1,300W surge delta becomes the new largest motor driver.
                  </p>
                  <span className="font-bold text-blue-600 block text-xs">
                    New Minimum Generator: 4,000 to 4,500 Watts
                  </span>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
                    <Sliders className="w-4 h-4 text-indigo-600" />
                    <span>Adding a Gas Furnace Blower (+1,800W Surge)</span>
                  </h3>
                  <p className="text-slate-600">
                    During winter storms, heating is vital. A 1/2 HP gas furnace fan draws 600 running watts and 1,800 starting watts, requiring 120V circuit integration.
                  </p>
                  <span className="font-bold text-blue-600 block text-xs">
                    New Minimum Generator: 3,500 to 4,000 Watts
                  </span>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
                    <BatteryCharging className="w-4 h-4 text-emerald-600" />
                    <span>Adding an Upright Deep Freezer (+750W Surge)</span>
                  </h3>
                  <p className="text-slate-600">
                    A standalone freezer adds only 100 to 150 running watts and 750 starting watts. As long as both compressors do not start simultaneously, demand increases modestly.
                  </p>
                  <span className="font-bold text-blue-600 block text-xs">
                    New Minimum Generator: 2,200 to 2,500 Watts
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-600">
                To evaluate your home complete emergency load, including water pumps, heating blowers, and air conditioners, read our comprehensive{" "}
                <Link
                  href="/what-size-generator-do-i-need-for-my-house"
                  className="font-bold text-blue-600 underline hover:text-blue-800"
                >
                  House Generator Sizing Guide
                </Link>
                .
              </p>
            </section>

            {/* Section 10: Common Mistakes */}
            <section id="common-mistakes" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Common Generator Sizing Mistakes for Refrigerators
              </h2>

              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base text-rose-700">
                    1. Sizing Only for Running Watts
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Purchasing a generator rated for only 300 to 500 watts because your refrigerator runs at 150 watts is a common mistake.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600">
                    When the compressor cycles on, the 1,000+ watt inrush surge will instantly stall the generator or trip its overload protection.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base text-rose-700">
                    2. Adding All Motor Starting Watts Together
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Assuming every motor starts at the exact same millisecond severely oversizes the generator. Adding starting surges for a fridge (1,200W), freezer (800W), and sump pump (2,000W) suggests you need a 7,000-watt unit.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600">
                    In reality, asynchronous thermostat cycling means you only need to absorb continuous loads plus the single largest surge delta.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base text-rose-700">
                    3. Using a Light Indoor Extension Cord
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Plugging a refrigerator into a thin, 16 AWG 100-foot household extension cord creates severe electrical resistance. The voltage drop can reduce voltage below 105 volts at the compressor terminals, which causes the motor to stall, overheat, and fail to start.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base text-rose-700">
                    4. Confusing Peak Surge Rating with Continuous Output
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    A generator advertised as 2,000 watts can only deliver 1,600 watts continuously. Sizing continuous loads up to 2,000 watts will trigger overload shutdowns within minutes once thermal breakers heat up.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 11: Calculator Bridge */}
            <section
              id="calculator-bridge"
              className="bg-blue-50/70 border border-blue-200 rounded-2xl p-6 sm:p-8 space-y-5 scroll-mt-24 shadow-xs"
            >
              <div className="flex items-center gap-2.5">
                <Calculator className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Calculate Your Custom Refrigerator Outage Load
                </h2>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Want to calculate exact generator requirements for your specific refrigerator, freezer, and household appliances? Use our interactive Generator Size Calculator to adjust wattages and test custom scenarios.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  href="/generator-size-calculator?scenario=refrigerator-outage"
                  className="py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition shadow-sm"
                >
                  <span>Load Refrigerator Outage Scenario</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/generator-size-calculator"
                  className="py-3 px-5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-sm flex items-center justify-center transition"
                >
                  <span>Build Load List From Scratch</span>
                </Link>
              </div>

              <p className="text-xs text-slate-500">
                Pre-loads the exact worked example (160W/1,200W refrigerator, Wi-Fi router, 4 rooms of LED lighting, and personal electronics) into our interactive sizing workspace.
              </p>
            </section>

            {/* Section 12: Generator Safety */}
            <section id="generator-safety" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Generator Safety: Carbon Monoxide and Safe Connections
              </h2>

              <p>
                Operating a generator during a power outage introduces serious electrical and respiratory hazards if proper safety procedures are ignored.
              </p>

              <div className="border border-red-200 bg-red-50/70 rounded-2xl p-5 sm:p-6 space-y-3">
                <div className="flex items-center gap-2 text-red-900 font-bold text-base">
                  <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
                  <h3>Carbon Monoxide Warning (CPSC &amp; CDC Guidelines)</h3>
                </div>
                <p className="text-xs sm:text-sm text-red-900 leading-relaxed">
                  Portable generator exhaust contains high concentrations of carbon monoxide (CO), an odorless and colorless gas that can kill within minutes.
                </p>
                <p className="text-xs sm:text-sm text-red-900 leading-relaxed">
                  Safety guidance from the US Consumer Product Safety Commission (CPSC) and CDC specifies:
                </p>
                <ul className="list-disc list-inside text-xs sm:text-sm text-red-900 space-y-1 pl-2">
                  <li><strong>Never operate a generator inside a home, garage, basement, crawlspace, or shed</strong>, even with doors and windows open.</li>
                  <li>Position the generator <strong>at least 20 feet away from your home</strong>, with the engine exhaust pointing away from all windows, doors, and fresh air intake vents.</li>
                  <li>Install battery-powered or battery-backup carbon monoxide detectors on every level of your home and outside sleeping areas.</li>
                </ul>
              </div>

              <h3 className="text-xl font-bold text-slate-900 pt-2">
                Safe Extension Cord Selection for Refrigerators
              </h3>
              <p>
                Extension cord selection must protect both household safety and compressor motor life. Cord gauge is never determined by distance alone.
              </p>
              <p>
                Under guidance from ESFI, OSHA, and appliance manufacturers, safe cord selection requires evaluating six interrelated factors:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2 text-sm">
                <li>
                  <strong>Actual Load Current and Starting Wattage:</strong> The cord must comfortably carry the steady continuous running amperage as well as the momentary motor inrush surge when the compressor cycles on.
                </li>
                <li>
                  <strong>Cord Run Length:</strong> Conductor electrical resistance increases with length. Greater distances create larger voltage drops between the generator terminals and the refrigerator plug.
                </li>
                <li>
                  <strong>Cord Continuous Amperage Rating:</strong> Never exceed the manufacturer continuous current rating printed on the cord packaging and jacket.
                </li>
                <li>
                  <strong>Outdoor Weather Rating:</strong> Use only three-prong grounded, UL or ETL-listed cords marked with a &quot;W&quot; designation (such as SJTW) indicating insulation engineered for outdoor moisture and sunlight exposure.
                </li>
                <li>
                  <strong>Manufacturer Instructions:</strong> Review both your refrigerator owner manual and generator operating manual. Some manufacturers prohibit light extension cords or require dedicated direct connections to maintain warranty coverage.
                </li>
                <li>
                  <strong>Applicable Electrical Safety Codes:</strong> Never daisy-chain multiple extension cords together, and never route cords through windows, doors, or under rugs where physical pinching can cause insulation breakdown and fire hazards.
                </li>
              </ul>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2">
                <span className="font-bold text-slate-900 block">
                  Illustrative Sizing Examples
                </span>
                <p className="text-xs text-slate-500 italic">
                  Illustrative examples; always verify the cord rating, connected load, length, outdoor rating, and manufacturer instructions.
                </p>
                <p>
                  To illustrate how conductor thickness must match both amperage and length together:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-1 text-xs sm:text-sm text-slate-600">
                  <li>
                    A <strong>14 AWG outdoor cord</strong> is typically rated to carry loads up to <strong>15 amps for lengths up to 50 feet</strong>, suitable for a single modern refrigerator on a moderate run.
                  </li>
                  <li>
                    For longer distances up to <strong>100 feet</strong>, or for continuous loads up to <strong>20 amps</strong>, step up to a heavier <strong>12 AWG or 10 AWG cord</strong>. While a 12 AWG cord is rated for 20 amps on shorter runs, utilizing 12 AWG for a 15-amp load across 100 feet reduces electrical line resistance. Using an appropriately rated cord with the correct gauge and length helps limit voltage drop at the refrigerator.
                  </li>
                </ul>
              </div>

              <p className="text-sm text-slate-700 pt-1">
                <strong>Critical Grid Safety (Never Backfeed):</strong> Never connect a generator output cord directly into a standard household wall outlet. This dangerous practice, known as backfeeding, can energize utility lines and create a serious electrocution and fire hazard for utility lineworkers and neighbors.
              </p>
            </section>

            {/* Section 13: FAQ */}
            <section id="generator-fuel-calculator" className="mb-12 border-t border-slate-200 pt-8"><h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight scroll-mt-24 mb-4">Calculate Your Generator Operating Costs</h2><p className="text-slate-600 mb-8">After determining your size requirements, you can calculate your ongoing operating costs using our <Link href="/generator-fuel-consumption-calculator" className="text-indigo-600 hover:underline">Generator Fuel Consumption Calculator</Link>.</p></section><section id="faq" className="space-y-4 scroll-mt-24 border-t border-slate-200 pt-8">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-3 pt-2">
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

            {/* Section 14: Related Power & Sizing Tools */}
            <section className="space-y-4 border-t border-slate-200 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Related Power, Generator &amp; Sizing Tools
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Explore companion calculators and residential outage guides on CalcMyPower:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
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
                    Calculate running watts, single-motor starting surge, and 1.25x recommended generator capacity.
                  </p>
                </Link>

                <Link
                  href="/what-size-generator-do-i-need-for-my-house"
                  className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-2"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition">
                    What Size Generator Do I Need for My House?
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Complete residential sizing guide covering furnace blowers, sump pumps, well pumps, and central AC.
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
                    Convert refrigerator nameplate Amperes and Volts to Watts or verify 15A/20A circuit loading.
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
                    UPS &amp; Battery Backup Runtime Calculator
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Estimate how many hours a portable power station or LiFePO4 battery bank will sustain your fridge.
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
                  <strong>U.S. Department of Energy (DOE) &amp; ENERGY STAR:</strong>{" "}
                  <span className="italic">Residential Refrigerator and Freezer Energy Use Benchmarks</span>.
                </li>
                <li>
                  <strong>U.S. Consumer Product Safety Commission (CPSC) &amp; CDC:</strong>{" "}
                  <span className="italic">Carbon Monoxide Poisoning Prevention and 20-Foot Outdoor Portable Generator Placement Rule</span>.
                </li>
                <li>
                  <strong>Electrical Safety Foundation International (ESFI):</strong>{" "}
                  <span className="italic">Portable Generator &amp; Outdoor Extension Cord Gauge Safety Guidelines</span>.
                </li>
                <li>
                  <strong>National Fire Protection Association (NFPA):</strong>{" "}
                  <span className="italic">NFPA 70: National Electrical Code (NEC)</span>, Article 702 (Optional Standby Systems) &amp; Article 430 (Motors and Hermetic Refrigerant Motor-Compressors).
                </li>
              </ul>
            </footer>
          <p className="mt-8 text-slate-600">For more information about ongoing fuel costs and calculations, check out our guide on <Link href="/how-much-gas-does-a-generator-use" className="text-indigo-600 hover:underline">How Much Gas Does a Generator Use Per Hour?</Link></p>
</article>

          {/* Desktop Sticky Sidebar (4 cols on lg) */}
          <aside className="hidden lg:block lg:col-span-4">
            <TableOfContents items={REFRIGERATOR_TOC_ITEMS} cluster="generators" />
          </aside>
        </div>
      </div>
    </>
  );
}
