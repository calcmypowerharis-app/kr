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
  Clock,
  HelpCircle,
  Calculator,
  Activity,
  Layers,
  CheckCircle2,
  Sliders,
  Gauge,
  Cpu,
  Flame,
  BatteryCharging,
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
import { getAmazonSearchUrl, AMAZON_LINK_REL } from "@/config/affiliate";

export const metadata: Metadata = {
  title: "How to Calculate Watts for a Generator: Running & Starting Watts",
  description:
    "Learn how to calculate watts for a generator during power outages. Master running vs starting watts, locked rotor surge inrush, 25% safety margins, and worked examples.",
  alternates: {
    canonical: "https://calcmypower.com/how-to-calculate-watts-for-a-generator",
  },
  openGraph: {
    title:
      "How to Calculate Watts for a Generator: Running & Starting Watts | CalcMyPower",
    description:
      "Learn how to calculate watts for a generator during power outages. Master running vs starting watts, locked rotor surge inrush, 25% safety margins, and worked examples.",
    url: "https://calcmypower.com/how-to-calculate-watts-for-a-generator",
    type: "article",
    images: [
      {
        url: "https://calcmypower.com/images/articles/how-to-calculate-watts-for-a-generator.webp",
        width: 1200,
        height: 675,
        alt: "Electrical technician measuring starting surge inrush current and running watts on an appliance circuit connected to a portable generator.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "How to Calculate Watts for a Generator: Running & Starting Watts | CalcMyPower",
    description:
      "Learn how to calculate watts for a generator during power outages. Master running vs starting watts, locked rotor surge inrush, 25% safety margins, and worked examples.",
    images: [
      "https://calcmypower.com/images/articles/how-to-calculate-watts-for-a-generator.webp",
    ],
  },
};

const TOC_ITEMS: TocItem[] = [
  { id: "quick-answer", label: "Quick Answer: The Generator Sizing Formula" },
  { id: "running-vs-starting-watts", label: "Running Watts vs. Starting Surge Watts" },
  { id: "motor-inrush-lra", label: "Motor Inrush & Locked Rotor Amps (LRA)" },
  { id: "single-largest-surge", label: "The Single-Largest-Surge Rule" },
  { id: "reading-nameplates", label: "How to Find Wattage on Appliance Nameplates" },
  { id: "step-by-step-formula", label: "Step-by-Step Calculation Methodology" },
  { id: "planning-headroom", label: "Continuous Duty Headroom (The 25% Margin)" },
  { id: "worked-example", label: "Worked Example: Essential Outage Sizing" },
  { id: "voltage-amperage-balancing", label: "Output Amperage & Split-Phase Leg Balancing" },
  { id: "extension-cord-losses", label: "Extension Cord Wire Gauge & Voltage Drop" },
  { id: "fuel-altitude-derating", label: "Fuel Derating & High-Altitude Adjustments" },
  { id: "common-mistakes", label: "Common Generator Wattage Sizing Mistakes" },
  { id: "safety-and-compliance", label: "Carbon Monoxide Safety & Transfer Switches" },
  { id: "faq", label: "Frequently Asked Questions" },
];

const FAQ_DATA = [
  {
    question: "What is the formula for calculating watts for a generator?",
    answer:
      "To calculate generator size, sum the running watts of all appliances operating simultaneously, add the single largest starting surge delta among your motor-driven appliances, and multiply the peak demand by a 1.25 safety headroom factor: Generator Capacity = (Total Running Watts + Largest Starting Surge Delta) x 1.25.",
  },
  {
    question: "Do all motor-driven appliances start at the exact same moment?",
    answer:
      "No. Under realistic household operation, appliances cycle independently. Sizing a generator by adding together every starting surge is a common mistake that drastically oversizes equipment. Electrical engineering practice sizes for continuous running loads plus the single largest startup surge.",
  },
  {
    question: "Why does my generator trip when total wattage is well below rating?",
    answer:
      "The most common cause is split-phase leg imbalance on 120/240V generators. If an 8,000-Watt generator has 4,000W available per 120V leg, placing 4,200W of 120V loads on Line 1 will trip that leg's breaker even if Line 2 has zero load and total demand is only 52% of rated capacity.",
  },
  {
    question: "What is the difference between rated watts and surge watts on a generator?",
    answer:
      "Rated watts (continuous running watts) is the maximum power the generator engine and alternator can sustain continuously for hours. Surge watts (starting or maximum watts) is the brief peak output the alternator can deliver for 2 to 3 seconds to start electric motors without stalling.",
  },
  {
    question: "How do I calculate generator watts from Volts and Amps?",
    answer:
      "Multiply operating Volts by full-load Amperes: Watts = Volts x Amps. For example, a 120-Volt appliance drawing 8.5 Amps consumes 1,020 Watts (120 x 8.5 = 1,020W). On motor-driven appliances, multiply Volts by Amps by the power factor (typically 0.85).",
  },
];

export default function HowToCalculateWattsForAGeneratorPage() {
  const articleSchema = generateArticleSchema({
    headline:
      "How to Calculate Watts for a Generator: Running & Starting Watts Explained",
    description:
      "Master running watts, starting surge demand, motor inrush math, and safety headroom to calculate the exact generator size needed for home backup.",
    url: "https://calcmypower.com/how-to-calculate-watts-for-a-generator",
    datePublished: "2026-10-04T08:00:00+00:00",
    dateModified: "2026-10-04T08:00:00+00:00",
    images: [
      "https://calcmypower.com/images/articles/how-to-calculate-watts-for-a-generator.webp",
    ],
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Guides", url: "https://calcmypower.com/calculators" },
    {
      name: "How to Calculate Watts for a Generator",
      url: "https://calcmypower.com/how-to-calculate-watts-for-a-generator",
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
          <span className="text-slate-800 font-medium truncate">
            How to Calculate Watts for a Generator
          </span>
        </nav>

        {/* Two-Column Grid: Left Content (DOM First), Right Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Article Content */}
          <div className="lg:col-span-8 min-w-0 space-y-10">
            {/* Header */}
            <header className="space-y-4 border-b border-slate-200 pb-8">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 font-semibold">
                  Generator Engineering &amp; Sizing Guide
                </span>
                <span className="text-slate-400">•</span>
                <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>14 min read</span>
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500">Published October 2026</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                How to Calculate Watts for a Generator: Running &amp; Starting Watts Explained
              </h1>

              <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-normal">
                Determine the exact electrical capacity required to keep your critical appliances running during an emergency. Learn how to tally continuous wattage, account for momentary motor inrush surges, apply engineering safety margins, and prevent generator overloads.
              </p>
            </header>

            {/* Hero Image */}
            <div className="space-y-3">
              <ZoomableArticleImage
                src="/images/articles/how-to-calculate-watts-for-a-generator.webp"
                alt="Electrical technician measuring starting surge inrush current and running watts on an appliance circuit connected to a portable generator"
                title="Measuring Appliance Inrush Current"
                caption="Figure 1: Measuring real-time motor startup inrush current and steady running watts using a digital clamp meter during a residential generator power audit."
              >
                <Image
                  src="/images/articles/how-to-calculate-watts-for-a-generator.webp"
                  alt="Electrical technician measuring starting surge inrush current and running watts on an appliance circuit connected to a portable generator"
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
                  <h2>Quick Answer: The Generator Sizing Formula</h2>
                </div>
                <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
                  To calculate generator wattage during an outage, sum the steady-state <strong>running watts</strong> of all appliances that run concurrently.
                </p>
                <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
                  Then add the <strong>single largest starting surge delta</strong> among motorized appliances, and apply a <strong>1.25 safety headroom factor (25% reserve)</strong>:
                </p>
                <div className="bg-white p-4 rounded-xl border border-blue-200 font-mono text-sm md:text-base text-slate-900 shadow-xs">
                  Generator Planning Watts = (Total Running Watts + Largest Additional Starting Surge) x 1.25
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  For example, if your simultaneous emergency loads draw <strong>2,955 running Watts</strong> and your furnace blower motor produces the largest additional starting surge at <strong>1,100 surge Watts</strong>, your momentary peak demand is <strong>4,055 Watts</strong>.
                </p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Multiplying by 1.25 yields a continuous planning capacity of <strong>5,069 Watts</strong>, indicating that a standard 5,000W to 5,500W running (6,500W surge) generator is the appropriate match.
                </p>
                <div className="pt-2">
                  <Link
                    href="/generator-size-calculator"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-700 hover:text-blue-900 transition"
                  >
                    <span>Use our Interactive Generator Size Calculator</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </section>

            {/* Section 2: Running Watts vs. Starting Surge Watts */}
            <section id="running-vs-starting-watts" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Running Watts vs. Starting Surge Watts
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                Every electrical generator comes with two prominent wattage specifications printed on its box and control panel: <strong>Rated (Running) Watts</strong> and <strong>Starting (Surge or Maximum) Watts</strong>. Understanding the fundamental physical distinction between these two numbers is the foundation of generator sizing.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
                    Continuous Power
                  </span>
                  <h3 className="text-base font-bold text-slate-900">Rated Running Watts</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    The steady-state electrical power the generator engine and alternator can output continuously for hours without overheating windings or tripping circuit breakers. Resistive devices like incandescent light bulbs, electric heaters, toasters, and router power adapters draw purely running watts.
                  </p>
                </div>
                <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block">
                    Momentary Inrush
                  </span>
                  <h3 className="text-base font-bold text-slate-900">Starting Surge Watts</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    The maximum instantaneous burst of electrical power the alternator delivers for 2 to 3 seconds.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Motor-driven appliances like refrigerator compressors and sump pumps need 2 to 3 times their running power momentarily to spin up from a dead stop.
                  </p>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                If connected load exceeds rated running watts, the engine will bog down, drop below 60 Hz, and trip its main breaker.
              </p>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                Conversely, if surge capacity is insufficient, an appliance motor will stall on startup, causing brownouts that can damage electronics.
              </p>
            </section>

            {/* Section 3: Motor Inrush & Locked Rotor Amps */}
            <section id="motor-inrush-lra" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Why Motors Surge: Locked Rotor Amps (LRA)
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                When an alternating-current (AC) induction motor is at rest, its rotor is completely stationary.
              </p>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                At the millisecond power is applied, the motor acts as a temporary electrical short circuit because no back-EMF yet exists to oppose current flow.
              </p>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                In electrical engineering, this initial current spike is formally designated as <strong>Locked Rotor Amps (LRA)</strong>.
              </p>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                Equipment tags for air conditioners, heat pumps, and heavy motors publish both <strong>Rated Load Amps (RLA / FLA)</strong> and <strong>LRA</strong>:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc pl-5">
                <li>
                  <strong>Rated Load Amps (RLA / FLA):</strong> The normal current drawn once the motor reaches full operating RPM under mechanical load.
                </li>
                <li>
                  <strong>Locked Rotor Amps (LRA):</strong> The peak inrush current drawn during the initial 50 to 500 milliseconds before rotation begins. LRA is typically <strong>4 to 6 times</strong> greater than FLA on air conditioner compressors, and <strong>2 to 3 times</strong> greater on household refrigerators.
                </li>
              </ul>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-1.5">
                <span className="font-bold text-slate-900 block">Example Motor Calculation:</span>
                <p>
                  A 1/2 HP sump pump at 120V may draw 8.0 Full Load Amps (8.0A x 120V = 960 running Watts). With nameplate LRA of 21.0 Amps, it momentarily pulls 21.0A x 120V = <strong>2,520 starting Watts</strong>.
                </p>
                <p>
                  The additional startup surge delta is 2,520W - 960W = <strong>1,560 Watts</strong>.
                </p>
              </div>
            </section>

            {/* Section 4: Single Largest Surge Rule */}
            <section id="single-largest-surge" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                The Single-Largest-Surge Sizing Principle
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                A frequent mistake is adding up the starting surge wattage of every motorized appliance in the home.
              </p>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                For example, summing surges for a refrigerator (1,200W), deep freezer (1,200W), sump pump (2,100W), and furnace blower (2,300W) yields nearly 7,000 Watts on top of running loads.
              </p>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                In reality, electric motors do not cycle on simultaneously unless power was just restored after a complete grid outage. Under normal backup operation, household appliances cycle intermittently according to thermostats, pressure switches, and float sensors:
              </p>
              <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/70 space-y-2 text-emerald-950">
                <div className="flex items-center gap-2 font-bold text-sm sm:text-base text-emerald-900">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>The Established Industry Sizing Rule</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed">
                  Size the generator for total continuous running watts operating together, plus <strong>only the single largest additional startup surge</strong> among motorized loads.
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  Once that motor reaches speed, generator rotating inertia starts smaller subsequent motors (like a refrigerator compressor) without stalling.
                </p>
              </div>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                If multiple large motors must start simultaneously (such as during initial utility outage transfer), stage the loads manually.
              </p>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                Turn branch circuit breakers on one at a time, beginning with the largest motor first.
              </p>
            </section>

            {/* Section 5: Reading Nameplates */}
            <section id="reading-nameplates" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                How to Find Wattage on Appliance Nameplates
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                Every electrical appliance sold in North America features a metal or plastic data plate mandated by Underwriters Laboratories (UL). This tag is typically riveted to the back of refrigerators, stamped inside microwave door frames, or etched onto motor housings.
              </p>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                Data tags usually display either rated Watts directly, or operating Volts and Amps:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <span className="font-bold text-slate-900 text-sm block">Direct Wattage Rating</span>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    If the nameplate specifies Watts (e.g., &quot;1,200W&quot; or &quot;1.2 kW&quot;), record this as the running wattage. Many resistive appliances (space heaters, toasters, coffee makers) state exact wattage directly.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <span className="font-bold text-slate-900 text-sm block">Volts and Amps Conversion</span>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    If only Volts and Amps are shown, use the electrical formula: <code>Watts = Volts x Amps</code>. For an appliance labeled 120V and 6.5A, the real running wattage is <code>120 x 6.5 = 780 Watts</code>.
                  </p>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                For detailed conversions across alternating current circuits, consult our companion{" "}
                <Link
                  href="/watts-to-amps-calculator"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Watts to Amps Electrical Calculator
                </Link>{" "}
                or our comprehensive guide on{" "}
                <Link
                  href="/what-is-a-watt-hour"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Watt-Hours and Electrical Energy
                </Link>.
              </p>
            </section>

            {/* Section 6: Step-by-Step Formula */}
            <section id="step-by-step-formula" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Step-by-Step Generator Wattage Calculation Formula
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                Follow this systematic four-step procedure to calculate the exact generator size required for your home:
              </p>
              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <span className="text-xs font-bold text-blue-600 uppercase">Step 1</span>
                  <h3 className="text-base font-bold text-slate-900">Inventory Essential Simultaneous Loads</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    List every appliance, light circuit, and device you intend to power simultaneously during an outage. Exclude luxury appliances that can remain unpowered.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <span className="text-xs font-bold text-blue-600 uppercase">Step 2</span>
                  <h3 className="text-base font-bold text-slate-900">Sum Continuous Running Watts</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Add together the running wattage for every item on your inventory list: <code>Total Running Watts = W_1 + W_2 + ... + W_n</code>.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <span className="text-xs font-bold text-blue-600 uppercase">Step 3</span>
                  <h3 className="text-base font-bold text-slate-900">Determine Largest Additional Starting Surge</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    For every motorized device, compute its surge delta: <code>Surge Delta = Starting Watts - Running Watts</code>. Identify the single largest delta on your list and add it to total running watts to establish peak starting demand.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <span className="text-xs font-bold text-blue-600 uppercase">Step 4</span>
                  <h3 className="text-base font-bold text-slate-900">Apply the 25% Safety Headroom Margin</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Multiply your peak starting demand by 1.25 to prevent generator engines from running at 100% full capacity continuously and to account for power factor and fuel deratings.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 7: Planning Headroom (25% Rule) */}
            <section id="planning-headroom" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Continuous Duty Headroom (The 25% Reserve Margin)
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                Why shouldn&apos;t you buy a 4,000-Watt generator for a 4,000-Watt peak load? Operating portable small-displacement engines at 100% continuous capacity produces severe thermal and mechanical stresses:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc pl-5">
                <li>
                  <strong>Fuel Efficiency &amp; Engine Wear:</strong> Running a generator continuously at 70% to 80% load reduces engine wear, lowers exhaust gas temperatures, and extends run time per tank of fuel.
                </li>
                <li>
                  <strong>Voltage &amp; Frequency Stability:</strong> When a generator runs at full capacity, its mechanical governor has zero reserve throttle. Any additional load or compressor cycling causes immediate RPM drop, driving line frequency below 58 Hz and dropping voltage below 108V.
                </li>
                <li>
                  <strong>NEC Continuous Load Standard:</strong> Under the National Electrical Code (NEC Article 210.20), branch circuits and overcurrent protective devices are derated to 80% for continuous duty (loads running 3 hours or longer). Sizing with a 1.25 multiplier (1 / 0.80 = 1.25) aligns generator capacity directly with this core safety principle.
                </li>
              </ul>
            </section>

            {/* Section 8: Worked Calculation Example (Winter Essentials) */}
            <section id="worked-example" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Worked Example: Essential Winter Outage Scenario
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                To illustrate the complete methodology, let us examine an emergency winter storm outage profile modeled after our validated{" "}
                <Link
                  href="/generator-size-calculator?scenario=winter-essentials"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Winter Essentials generator sizing scenario
                </Link>.
              </p>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-800 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-3.5">Appliance</th>
                      <th className="py-3 px-3">Running Watts</th>
                      <th className="py-3 px-3">Starting Watts</th>
                      <th className="py-3 px-3">Surge Delta</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    <tr>
                      <td className="py-2.5 px-3.5 font-medium text-slate-900">Natural Gas Furnace Blower</td>
                      <td className="py-2.5 px-3 font-mono">800 W</td>
                      <td className="py-2.5 px-3 font-mono">1,900 W</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-amber-700">1,100 W (Largest)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3.5 font-medium text-slate-900">Household Refrigerator / Freezer</td>
                      <td className="py-2.5 px-3 font-mono">700 W</td>
                      <td className="py-2.5 px-3 font-mono">1,500 W</td>
                      <td className="py-2.5 px-3 font-mono text-slate-600">800 W</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3.5 font-medium text-slate-900">Basement Sump Pump (1/3 HP)</td>
                      <td className="py-2.5 px-3 font-mono">800 W</td>
                      <td className="py-2.5 px-3 font-mono">1,300 W</td>
                      <td className="py-2.5 px-3 font-mono text-slate-600">500 W</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3.5 font-medium text-slate-900">Microwave Oven (Intermittent)</td>
                      <td className="py-2.5 px-3 font-mono">1,000 W</td>
                      <td className="py-2.5 px-3 font-mono">1,000 W</td>
                      <td className="py-2.5 px-3 font-mono text-slate-600">0 W</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3.5 font-medium text-slate-900">Wi-Fi Router &amp; Fiber Modem</td>
                      <td className="py-2.5 px-3 font-mono">25 W</td>
                      <td className="py-2.5 px-3 font-mono">25 W</td>
                      <td className="py-2.5 px-3 font-mono text-slate-600">0 W</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3.5 font-medium text-slate-900">LED Lighting (5 Rooms)</td>
                      <td className="py-2.5 px-3 font-mono">50 W</td>
                      <td className="py-2.5 px-3 font-mono">50 W</td>
                      <td className="py-2.5 px-3 font-mono text-slate-600">0 W</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3.5 font-medium text-slate-900">Smart TV &amp; Laptop Charger</td>
                      <td className="py-2.5 px-3 font-mono">180 W</td>
                      <td className="py-2.5 px-3 font-mono">180 W</td>
                      <td className="py-2.5 px-3 font-mono text-slate-600">0 W</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Exact Formula Application */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3 text-xs sm:text-sm">
                <h3 className="font-bold text-slate-900 uppercase tracking-wide text-xs">
                  Calculating Total System Requirements:
                </h3>
                <div className="space-y-1 font-mono text-slate-800">
                  <p>1. Total Running Demand: <strong>2,955</strong> Watts</p>
                  <p>2. Largest Additional Starting Surge: <strong>1,100</strong> Watts (Furnace Blower)</p>
                  <p>3. Peak Starting Demand: 2,955 + 1,100 = <strong>4,055</strong> Watts</p>
                  <p>4. Recommended Planning Capacity (1.25x Margin): 4,055 x 1.25 = <strong>5,069</strong> Watts</p>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed pt-1">
                  In this worked emergency scenario, total running load equals <strong>2,955</strong> Watts and furnace blower surge is <strong>1,100</strong> Watts, generating a peak starting demand of <strong>4,055</strong> Watts.
                </p>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Applying the continuous 25% safety reserve yields an engineering planning capacity of <strong>5,069</strong> Watts.
                </p>
                <p className="text-xs text-blue-700 font-semibold pt-1">
                  Result: A portable generator with 5,000 to 5,500 running Watts and 6,500 starting Watts satisfies this entire household outage profile with safety reserve.
                </p>
              </div>
            </section>

            {/* Section 9: Voltage, Amperage and Leg Balancing */}
            <section id="voltage-amperage-balancing" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Output Amperage &amp; Split-Phase Leg Balancing
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                Calculating generator wattage is only half of the installation equation; you must also evaluate circuit current in Amperes.
              </p>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                Standard North American homes receive 120/240V split-phase utility service consisting of two 120V hot lines (Line 1 and Line 2), one neutral, and one equipment ground.
              </p>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                Portable generators rated 5,000 Watts or larger generally feature a 4-prong 120/240V receptacle (NEMA L14-30R or 14-50R). Inside the alternator, half the generator&apos;s wattage is produced on Line 1, and half on Line 2:
              </p>
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 text-xs sm:text-sm">
                <span className="font-bold text-slate-900 block">The Split-Phase Balancing Rule:</span>
                <p className="text-slate-600 leading-relaxed">
                  On an 8,000-Watt generator, each 120V hot leg provides at most 4,000 Watts (33.3 Amps at 120V). Placing large appliances solely on Line 1 can draw 3,500 Watts while Line 2 remains idle.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  When another motor starts on Line 1, the resulting inrush trips that breaker despite total generator output being well below capacity.
                </p>
              </div>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                To check exact amperage ratings across 120V and 240V outputs, consult our companion{" "}
                <Link
                  href="/generator-amperage-chart-calculator"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Generator Amperage Chart &amp; Calculator
                </Link>.
              </p>
            </section>

            {/* Section 10: Extension Cord Losses */}
            <section id="extension-cord-losses" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Extension Cord Wire Gauge &amp; Voltage Drop
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                Because carbon monoxide safety requires operating portable generators at least 20 feet away from living structures, extension cords typically run 25 to 100 feet in length. Long electrical cables introduce copper conductor resistance that causes voltage drop:
              </p>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-800 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Current Draw</th>
                      <th className="py-2.5 px-3">Up to 25 Feet</th>
                      <th className="py-2.5 px-3">50 Feet</th>
                      <th className="py-2.5 px-3">75 to 100 Feet</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-slate-900">Up to 15 Amps (1,800W)</td>
                      <td className="py-2.5 px-3 text-slate-700">14 AWG Copper</td>
                      <td className="py-2.5 px-3 text-slate-700">12 AWG Copper</td>
                      <td className="py-2.5 px-3 font-semibold text-blue-700">10 AWG Copper</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-slate-900">Up to 20 Amps (2,400W)</td>
                      <td className="py-2.5 px-3 text-slate-700">12 AWG Copper</td>
                      <td className="py-2.5 px-3 text-slate-700">10 AWG Copper</td>
                      <td className="py-2.5 px-3 font-semibold text-blue-700">10 AWG Copper</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-slate-900">Up to 30 Amps (7,200W @ 240V)</td>
                      <td className="py-2.5 px-3 text-slate-700">10 AWG Copper</td>
                      <td className="py-2.5 px-3 text-slate-700">10 AWG Copper</td>
                      <td className="py-2.5 px-3 font-semibold text-blue-700">8 AWG Copper</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-slate-900">Up to 50 Amps (12,000W @ 240V)</td>
                      <td className="py-2.5 px-3 text-slate-700">6 AWG Copper</td>
                      <td className="py-2.5 px-3 text-slate-700">6 AWG Copper</td>
                      <td className="py-2.5 px-3 font-semibold text-blue-700">4 AWG Copper</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Excessive voltage drop (greater than 3% to 5%) starves motorized appliances of operating voltage.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                When voltage falls, motor windings draw increased current to maintain shaft power, causing thermal overload. For conductor calculations, check our{" "}
                <Link
                  href="/voltage-drop-calculator"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Voltage Drop Calculator
                </Link>.
              </p>
            </section>

            {/* Section 11: Fuel and Altitude Derating */}
            <section id="fuel-altitude-derating" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Fuel Derating &amp; High-Altitude Adjustments
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                Published generator wattage ratings are established in factory test laboratories at sea level using fresh standard gasoline. In real-world emergency conditions, two environmental factors reduce available engine output:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Flame className="w-4 h-4 text-amber-600" />
                    <span>Alternative Fuel Deratings</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Dual-fuel and tri-fuel generators produce lower power on gaseous fuels. Liquid propane yields roughly <strong>10% less wattage</strong>, while natural gas yields <strong>15% to 20% less</strong>.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    An 8,000 running Watt gasoline generator may deliver only 7,200W on propane and 6,500W on natural gas.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Gauge className="w-4 h-4 text-blue-600" />
                    <span>Altitude Derating Curve</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    At higher elevations, reduced atmospheric oxygen density impairs engine combustion. Naturally aspirated engines lose roughly <strong>3.5% horsepower per 1,000 feet</strong> elevation.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    At 5,000 feet (such as Denver, Colorado), a generator loses approximately 17.5% of its rated power output.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 12: Common Sizing Mistakes */}
            <section id="common-mistakes" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Common Generator Wattage Sizing Mistakes
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                Avoid these frequent sizing errors when calculating generator wattage:
              </p>
              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <span className="font-bold text-slate-900 text-sm block">1. Sizing by Home Square Footage</span>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Square footage does not consume electricity. Two identical 2,500-square-foot homes can have completely different power demands.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    A home with natural gas heat and city water needs 4,000 Watts, while one with a well pump, electric water heater, and central heat pump requires 18,000 Watts.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <span className="font-bold text-slate-900 text-sm block">2. Summing All Motor Surges Together</span>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Adding every starting surge wattage together leads to buying an oversized, heavy generator that wastes fuel and wet-stacks its engine. Size for running loads plus the single largest startup delta.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <span className="font-bold text-slate-900 text-sm block">3. Ignoring Continuous 80% Duty Margins</span>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Loading a generator to 100% of its rated capacity leaves zero headroom for motor cycling and shortens engine life. Always leave 20% to 25% reserve capacity.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <span className="font-bold text-slate-900 text-sm block">4. Overlooking Inductive Power Factor</span>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Assuming power factor is always 1.0. Heavy inductive loads (motors, transformers) cause current to lag voltage, increasing actual amperage draw and alternator heating.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 13: Safety & Code Compliance */}
            <section id="safety-and-compliance" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Carbon Monoxide Safety &amp; Transfer Switch Compliance
              </h2>
              <div className="space-y-4">
                <div className="p-5 rounded-xl border border-amber-300 bg-amber-50/80 space-y-2 text-amber-950">
                  <div className="flex items-center gap-2 font-bold text-base text-amber-900">
                    <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0" />
                    <span>Lethal Hazard: Carbon Monoxide (CPSC &amp; CDC 20-Foot Rule)</span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed">
                    Internal combustion generator exhaust produces high concentrations of carbon monoxide (CO), a colorless, odorless, and lethal gas.
                  </p>
                  <p className="text-xs sm:text-sm leading-relaxed">
                    Portable generators must operate strictly outdoors, at least <strong>20 feet (6 meters)</strong> away from doors, windows, and vents, with exhaust directed away. Never run a generator in a garage, carport, or basement.
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-rose-300 bg-rose-50/80 space-y-2 text-rose-950">
                  <div className="flex items-center gap-2 font-bold text-base text-rose-900">
                    <AlertTriangle className="w-5 h-5 text-rose-700 shrink-0" />
                    <span>Anti-Backfeeding Requirement (NEC Article 702)</span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed">
                    Never attempt to connect a portable generator to a household wall outlet using a hazardous male-to-male cord.
                  </p>
                  <p className="text-xs sm:text-sm leading-relaxed">
                    This practice backfeeds current through utility transformers, stepping voltage up to thousands of volts on downed lines. Safe home connection requires an approved manual transfer switch or mechanical interlock kit per NEC Article 702 installed by a licensed electrician.
                  </p>
                </div>
              </div>
            </section>

            {/* Recommended Extension Cords & Inlets (Rule 11 Affiliate Utility) */}
            <section className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">
                Recommended Generator Cords &amp; Electrical Hardware
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Connect your calculated generator wattage safely using industrial grade transfer equipment:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <a
                  href={getAmazonSearchUrl("NEMA L14-30 generator extension cord 10 gauge")}
                  target="_blank"
                  rel={AMAZON_LINK_REL}
                  className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-xs transition block space-y-1.5"
                >
                  <span className="font-bold text-blue-600 block">30A Generator Cord (10 AWG)</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Heavy-duty 4-conductor L14-30 cord for generators up to 7,500 running Watts.
                  </p>
                </a>
                <a
                  href={getAmazonSearchUrl("50 amp generator power inlet box outdoor NEMA 3R")}
                  target="_blank"
                  rel={AMAZON_LINK_REL}
                  className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-xs transition block space-y-1.5"
                >
                  <span className="font-bold text-blue-600 block">Weatherproof Inlet Box</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Exterior NEMA 3R inlet box for connecting generator power cords safely through outer walls.
                  </p>
                </a>
                <a
                  href={getAmazonSearchUrl("true rms digital clamp meter AC electrical")}
                  target="_blank"
                  rel={AMAZON_LINK_REL}
                  className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-xs transition block space-y-1.5"
                >
                  <span className="font-bold text-blue-600 block">True RMS Clamp Meter</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Measure startup surge inrush and verify 120V split-phase leg balancing across lines.
                  </p>
                </a>
              </div>
            </section>

            {/* Section 14: FAQ */}
            <section id="generator-fuel-calculator" className="mb-12 border-t border-slate-200 pt-8"><h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight scroll-mt-24 mb-4">Calculate Your Generator Operating Costs</h2><p className="text-slate-600 mb-8">After determining your size requirements, you can calculate your ongoing operating costs using our <Link href="/generator-fuel-consumption-calculator" className="text-indigo-600 hover:underline">Generator Fuel Consumption Calculator</Link>.</p></section><section id="faq" className="space-y-4 scroll-mt-24 border-t border-slate-200 pt-8">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {FAQ_DATA.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-slate-200 bg-white space-y-1.5 shadow-xs"
                  >
                    <h3 className="text-base font-bold text-slate-900">{faq.question}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Related Tools & Sizing Guides */}
            <section className="space-y-4 border-t border-slate-200 pt-8">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Related Sizing Tools &amp; Electrical Calculators
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="/generator-size-calculator"
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-500 transition block space-y-1"
                >
                  <span className="text-xs font-bold text-blue-600 uppercase">Interactive Calculator</span>
                  <h4 className="text-sm font-bold text-slate-900">Generator Size Calculator</h4>
                  <p className="text-xs text-slate-600">
                    Tally your exact household appliances and calculate your surge demand automatically.
                  </p>
                </Link>

                <Link
                  href="/generator-amperage-chart-calculator"
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-500 transition block space-y-1"
                >
                  <span className="text-xs font-bold text-blue-600 uppercase">Electrical Reference</span>
                  <h4 className="text-sm font-bold text-slate-900">Generator Amperage Chart &amp; Calculator</h4>
                  <p className="text-xs text-slate-600">
                    Compare output Amps across 120V and 240V circuits and look up wire gauge ratings.
                  </p>
                </Link>

                <Link
                  href="/what-size-generator-do-i-need-for-my-house"
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-500 transition block space-y-1"
                >
                  <span className="text-xs font-bold text-blue-600 uppercase">Sizing Guide</span>
                  <h4 className="text-sm font-bold text-slate-900">What Size Generator Do I Need for My House?</h4>
                  <p className="text-xs text-slate-600">
                    Whole-house vs critical circuit generator sizing guide with emergency profiles.
                  </p>
                </Link>

                <Link
                  href="/generator-wattage-chart"
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-500 transition block space-y-1"
                >
                  <span className="text-xs font-bold text-blue-600 uppercase">Appliance Matrix</span>
                  <h4 className="text-sm font-bold text-slate-900">Generator Wattage Chart</h4>
                  <p className="text-xs text-slate-600">
                    Running and starting surge wattage reference table for 35+ household appliances and workshop tools.
                  </p>
                </Link>

                <Link
                  href="/continuous-power-generators"
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-500 transition block space-y-1"
                >
                  <span className="text-xs font-bold text-blue-600 uppercase">Industrial Power</span>
                  <h4 className="text-sm font-bold text-slate-900">Continuous Power Generators</h4>
                  <p className="text-xs text-slate-600">
                    Understand ISO 8528 continuous ratings, 1800 RPM engines, and wet stacking prevention.
                  </p>
                </Link>
              </div>
            </section>
          </div>

          {/* Desktop Sticky Table of Contents Sidebar */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-6">
            <TableOfContents items={TOC_ITEMS} />
          </aside>
        </div>
      </div>
    </>
  );
}
