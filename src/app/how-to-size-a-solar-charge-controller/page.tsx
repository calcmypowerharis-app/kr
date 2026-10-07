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
  ThermometerSnowflake,
  Cpu,
  Calculator,
  Sun,
  Battery,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How to Size a Solar Charge Controller: MPPT vs PWM Sizing Guide",
  description:
    "Learn how to size a solar charge controller step by step. Calculate MPPT and PWM charge controller amperage, cold-weather Voc voltage limits, and battery voltage matching.",
  alternates: {
    canonical: "https://calcmypower.com/how-to-size-a-solar-charge-controller",
  },
  openGraph: {
    title:
      "How to Size a Solar Charge Controller: MPPT vs PWM Sizing Guide | CalcMyPower",
    description:
      "Learn how to size a solar charge controller step by step. Calculate MPPT and PWM charge controller amperage, cold-weather Voc voltage limits, and battery voltage matching.",
    url: "https://calcmypower.com/how-to-size-a-solar-charge-controller",
    type: "article",
    images: [
      {
        url: "https://calcmypower.com/images/articles/how-to-size-a-solar-charge-controller.webp",
        width: 1200,
        height: 675,
        alt: "Professional off-grid MPPT solar charge controller installation with wiring conduits, DC breakers, and battery storage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "How to Size a Solar Charge Controller: MPPT vs PWM Sizing Guide | CalcMyPower",
    description:
      "Learn how to size a solar charge controller step by step. Calculate MPPT and PWM charge controller amperage, cold-weather Voc voltage limits, and battery voltage matching.",
    images: [
      "https://calcmypower.com/images/articles/how-to-size-a-solar-charge-controller.webp",
    ],
  },
};

const TOC_ITEMS: TocItem[] = [
  { id: "quick-summary", label: "Quick Summary: Sizing Formulas at a Glance" },
  { id: "mppt-vs-pwm", label: "MPPT vs. PWM: Core Electrical Differences" },
  { id: "mppt-sizing-formula", label: "How to Calculate MPPT Controller Amperage" },
  { id: "pwm-sizing-formula", label: "How to Calculate PWM Controller Amperage" },
  { id: "voc-cold-temperature", label: "Voltage Limits & Sub-Freezing Voc Rise (NEC 690.7)" },
  { id: "worked-examples", label: "3 Real-World Sizing Scenarios (12V, 24V, 48V)" },
  { id: "overpaneling-rules", label: "Array Overpaneling & Current Clipping" },
  { id: "wire-and-fuse-sizing", label: "Wire Sizing, Breakers, and Safety Rules" },
  { id: "interactive-calculator", label: "Using the Solar Charge Controller Calculator" },
  { id: "faq", label: "Frequently Asked Questions" },
];

const FAQ_DATA = [
  {
    question: "What size solar charge controller do I need for a 400 Watt solar array?",
    answer:
      "For a 400W array charging a 12V battery bank with an MPPT controller, divide array wattage by nominal battery voltage and apply a 25% safety margin: (400W / 12V) * 1.25 = 41.7 Amps. The nearest standard commercial controller size is a 40A or 50A MPPT controller. If using a 24V battery bank, the current drops in half to: (400W / 24V) * 1.25 = 20.8 Amps, requiring a 20A or 30A controller.",
  },
  {
    question: "Can a solar charge controller be too big for my solar panels?",
    answer:
      "No. A solar charge controller cannot be too big in terms of amperage capacity. The charge controller only pulls as much power as the solar array produces and delivers what the battery accepts. Installing a 60A controller on a 200W solar array will not damage your equipment; it simply provides spare headroom for future solar expansion. The only parameter you must never exceed is the maximum input voltage rating (Voc limit).",
  },
  {
    question: "Why does cold weather increase solar panel open-circuit voltage (Voc)?",
    answer:
      "Solar photovoltaic cells possess a negative temperature coefficient of voltage. As ambient temperatures drop below standard testing conditions (25 degrees Celsius or 77 degrees Fahrenheit), the semiconductor bandgap widens, causing panel output voltage to rise. On sub-freezing winter mornings, solar array Voc can increase by 10% to 20% above the factory label rating. If this cold Voc exceeds the charge controller maximum voltage rating, internal transistors suffer permanent electrical breakdown.",
  },
  {
    question: "What is the difference between MPPT and PWM charge controller sizing?",
    answer:
      "MPPT controllers are sized based on total array power (Watts) divided by battery bank voltage, because MPPT controllers convert excess voltage into higher charging current. PWM controllers do not transform voltage; they pull panel operating voltage down to match battery voltage. Therefore, PWM controllers are sized strictly on the short-circuit current (Isc) of the solar array multiplied by 1.25, and require nominal panel voltage to closely match battery voltage (e.g., 18V Vmp panel for a 12V battery).",
  },
  {
    question: "What happens if I overpanel my MPPT charge controller?",
    answer:
      "Overpaneling (connecting more solar panel wattage than the controller nominal rating) is standard practice in solar engineering. High-quality MPPT controllers automatically limit (clip) output current to their maximum rated specification (such as 40A). On overcast days or during morning and late afternoon hours, the extra panels harvest significantly more usable energy. However, you must always ensure the array maximum cold Voc never exceeds the controller input voltage ceiling.",
  },
  {
    question: "Where should the circuit breaker or fuse be placed relative to the charge controller?",
    answer:
      "Two overcurrent protection devices are required: one on the positive wire between the solar array and the charge controller input (sized at 1.25 to 1.56 times array short-circuit current), and one on the positive wire between the charge controller output and the battery bank (sized at 1.25 times the controller rated output current, located within 7 inches of the battery terminal per NEC guidelines).",
  },
];

export default function HowToSizeASolarChargeControllerPage() {
  const articleSchema = generateArticleSchema({
    headline: "How to Size a Solar Charge Controller: MPPT vs PWM Sizing Guide",
    description:
      "Learn how to size a solar charge controller step by step. Calculate MPPT and PWM charge controller amperage, cold-weather Voc voltage limits, and battery voltage matching.",
    url: "https://calcmypower.com/how-to-size-a-solar-charge-controller",
    datePublished: "2026-10-07",
    dateModified: "2026-10-07",
    images: [
      "https://calcmypower.com/images/articles/how-to-size-a-solar-charge-controller.webp",
    ],
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Calculators & Guides", url: "https://calcmypower.com/calculators" },
    {
      name: "How to Size a Solar Charge Controller",
      url: "https://calcmypower.com/how-to-size-a-solar-charge-controller",
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
            How to Size a Solar Charge Controller
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
                  Solar PV Engineering Guide
                </span>
                <span className="text-slate-400">•</span>
                <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>12 min read</span>
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500">Published October 2026</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                How to Size a Solar Charge Controller: MPPT vs PWM Sizing Guide
              </h1>

              <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-normal">
                Sizing a solar charge controller requires balancing two critical engineering limits: output charging current (Amps) and maximum input open-circuit voltage (Voc). Learn the mathematical formulas for MPPT and PWM controllers, sub-freezing temperature voltage adjustments, and safe overpaneling limits.
              </p>
            </header>

            {/* Hero Image */}
            <div className="space-y-3">
              <ZoomableArticleImage
                src="/images/articles/how-to-size-a-solar-charge-controller.webp"
                alt="Professional off-grid MPPT solar charge controller installation with wiring conduits, DC breakers, and battery storage"
                title="Off-Grid MPPT Solar Charge Controller Installation"
                caption="Figure 1: High-efficiency MPPT solar charge controller installation featuring dedicated DC input isolators, battery output breakers, and short heavy-gauge pure copper conductors connecting directly to a lithium iron phosphate battery bank."
              >
                <Image
                  src="/images/articles/how-to-size-a-solar-charge-controller.webp"
                  alt="Professional off-grid MPPT solar charge controller installation with wiring conduits, DC breakers, and battery storage"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                />
              </ZoomableArticleImage>
            </div>

            {/* Section 1: Quick Summary */}
            <section id="quick-summary" className="space-y-4 scroll-mt-24">
              <div className="p-6 bg-blue-50/70 border border-blue-200/90 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-base sm:text-lg">
                  <Zap className="w-5 h-5 text-blue-700 shrink-0" />
                  <h2>Quick Summary: Sizing Formulas at a Glance</h2>
                </div>
                <p className="text-sm text-blue-950 leading-relaxed">
                  A solar charge controller regulates current and voltage moving from your photovoltaic panels into your battery bank to prevent overcharging. Sizing correctly comes down to two mandatory parameters:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3.5 rounded-xl bg-white border border-blue-100 shadow-xs space-y-1">
                    <span className="font-bold text-blue-900 block text-sm">MPPT Controller Sizing</span>
                    <p className="font-mono text-slate-800 font-semibold">
                      Amps = (Array Watts / Battery Volts) * 1.25
                    </p>
                    <p className="text-slate-600">
                      Calculates output charging current. The 1.25 factor (25% buffer) accommodates clear-sky cloud-edge irradiance spikes and continuous duty.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-blue-100 shadow-xs space-y-1">
                    <span className="font-bold text-blue-900 block text-sm">PWM Controller Sizing</span>
                    <p className="font-mono text-slate-800 font-semibold">
                      Amps = Array Short-Circuit Current (Isc) * 1.25
                    </p>
                    <p className="text-slate-600">
                      Sized on array short-circuit amperage because PWM controllers pull panel voltage down without converting excess voltage into additional current.
                    </p>
                  </div>
                </div>
                <div className="p-3 bg-amber-50/90 rounded-xl border border-amber-200 text-xs text-amber-900">
                  <strong className="text-amber-950">Critical Safety Limit: </strong>
                  The solar array open-circuit voltage corrected for the coldest expected winter temperature (Cold Voc) must NEVER exceed the charge controller maximum input voltage rating (such as 100V, 150V, or 250V). Exceeding this voltage ceiling destroys the controller instantly.
                </div>
              </div>
            </section>

            {/* Section 2: MPPT vs PWM */}
            <section id="mppt-vs-pwm" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xl sm:text-2xl">
                <Layers className="w-6 h-6 text-blue-600" />
                <h2>MPPT vs. PWM: Core Electrical Differences</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Understanding whether you need a Maximum Power Point Tracking (MPPT) or Pulse Width Modulation (PWM) controller determines your sizing calculations and array wiring geometry.
              </p>

              {/* Comparison Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-800 font-bold">
                    <tr>
                      <th className="p-3.5">Feature</th>
                      <th className="p-3.5">MPPT Controller</th>
                      <th className="p-3.5">PWM Controller</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3.5 font-semibold text-slate-800">Operating Mechanism</td>
                      <td className="p-3.5">DC-to-DC buck converter tracks peak power point (Vmp, Imp) dynamically</td>
                      <td className="p-3.5">Direct electronic switch connects solar panels directly to battery terminals</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3.5 font-semibold text-slate-800">Energy Conversion Efficiency</td>
                      <td className="p-3.5 font-bold text-emerald-700">97% to 99% efficient (15% to 30% higher energy harvest)</td>
                      <td className="p-3.5 text-slate-700">70% to 75% practical seasonal efficiency</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3.5 font-semibold text-slate-800">Voltage Flexibility</td>
                      <td className="p-3.5">Array voltage can be significantly higher than battery (e.g., 100V array charging 12V battery)</td>
                      <td className="p-3.5">Array nominal voltage must match battery voltage (e.g., 12V panels for 12V battery)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3.5 font-semibold text-slate-800">Cold Weather Advantage</td>
                      <td className="p-3.5">Converts higher panel winter voltage into bonus charging amps</td>
                      <td className="p-3.5">Wastes cold-weather voltage rise as excess heat</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3.5 font-semibold text-slate-800">Typical System Application</td>
                      <td className="p-3.5">Arrays 200W or larger, high-voltage residential panels, off-grid cabins, RVs</td>
                      <td className="p-3.5">Small budget setups under 150W, solar trickle chargers, small 12V camper vans</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3.5 font-semibold text-slate-800">Relative Equipment Cost</td>
                      <td className="p-3.5">Higher upfront cost ($80 to $600+)</td>
                      <td className="p-3.5">Very inexpensive ($20 to $60)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong className="text-slate-900">Why PWM Wastes Power: </strong>
                A standard 100W 12V solar panel produces approximately 18 Volts at maximum power (Vmp) and 5.5 Amps (Imp). When connected through a PWM controller to a discharged 12V battery resting at 12.5V, the PWM controller forces the panel to operate at 12.5V while keeping current at 5.5A. The power delivered is: 12.5V * 5.5A = 68.75 Watts. The remaining 31.25 Watts is lost. An MPPT controller takes the full 18V * 5.5A = 100W and converts it down to 12.5V at 7.8 Amps, preserving virtually the entire energy yield.
              </div>
            </section>

            {/* Section 3: MPPT Sizing Formula */}
            <section id="mppt-sizing-formula" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xl sm:text-2xl">
                <Cpu className="w-6 h-6 text-blue-600" />
                <h2>How to Calculate MPPT Controller Amperage</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                MPPT controllers are rated by the maximum output current they can deliver into the battery bank (for example, 20A, 30A, 40A, 60A, 80A, or 100A). Because power must be conserved across the DC-to-DC conversion (Watts In = Watts Out, minus minor thermal conversion loss), the output current is calculated by dividing total array wattage by the battery bank nominal voltage.
              </p>

              {/* Formula Block */}
              <div className="p-5 bg-slate-900 text-emerald-400 font-mono text-sm sm:text-base rounded-2xl border border-slate-800 shadow-inner space-y-2">
                <div className="text-xs text-slate-400 uppercase tracking-wider font-sans">
                  MPPT Amperage Sizing Formula
                </div>
                <div className="text-white font-bold text-base sm:text-lg">
                  I_controller (Amps) = (Total Solar Array Watts / Nominal Battery Voltage) * Safety Factor
                </div>
                <div className="text-xs text-slate-400 font-sans pt-1">
                  Standard continuous safety factor = 1.25 (per NEC Article 690.8 continuous current requirements)
                </div>
              </div>

              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <h3 className="font-bold text-slate-900 text-base">Step-by-Step MPPT Calculation Breakdown:</h3>
                <ol className="list-decimal list-inside space-y-2 pl-2">
                  <li>
                    <strong className="text-slate-900">Determine Total Array Wattage: </strong>
                    Multiply panel count by individual panel rated wattage. For example, four 200W panels in series-parallel equal 800 Watts.
                  </li>
                  <li>
                    <strong className="text-slate-900">Identify Nominal Battery Bank Voltage: </strong>
                    Use the nominal voltage of your battery configuration: 12V, 24V, or 48V.
                  </li>
                  <li>
                    <strong className="text-slate-900">Divide Array Power by Battery Voltage: </strong>
                    800 Watts / 24 Volts = 33.3 Amps nominal charging current.
                  </li>
                  <li>
                    <strong className="text-slate-900">Apply the 1.25 Safety Margin: </strong>
                    33.3 Amps * 1.25 = 41.7 Amps. This buffer accommodates cloud-edge effects (where sunlight reflecting off clouds creates momentary irradiance exceeding 1,000 W/m2) and prevents continuous thermal throttling.
                  </li>
                  <li>
                    <strong className="text-slate-900">Select the Next Standard Commercial Size: </strong>
                    Commercial MPPT controllers typically come in 40A, 50A, and 60A brackets. In this scenario, a 50A or 60A MPPT controller provides clean, reliable operation.
                  </li>
                </ol>
              </div>
            </section>

            {/* Section 4: PWM Sizing Formula */}
            <section id="pwm-sizing-formula" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xl sm:text-2xl">
                <Calculator className="w-6 h-6 text-blue-600" />
                <h2>How to Calculate PWM Controller Amperage</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Unlike MPPT controllers, PWM units cannot step down voltage to generate higher output current. The current entering a PWM controller from the solar panels is essentially the same current delivered to the battery terminals.
              </p>

              <div className="p-5 bg-slate-900 text-emerald-400 font-mono text-sm sm:text-base rounded-2xl border border-slate-800 shadow-inner space-y-2">
                <div className="text-xs text-slate-400 uppercase tracking-wider font-sans">
                  PWM Amperage Sizing Formula
                </div>
                <div className="text-white font-bold text-base sm:text-lg">
                  I_pwm (Amps) = Total Parallel Short-Circuit Current (Isc) * 1.25
                </div>
              </div>

              <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
                <p>
                  Look at the electrical specification sticker on the back of your solar panels to find the Short-Circuit Current (Isc):
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs sm:text-sm">
                  <li>
                    <strong>Single 100W Panel: </strong>
                    If Isc = 5.8 Amps, required controller size is 5.8A * 1.25 = 7.25 Amps. A standard 10A PWM controller is ideal.
                  </li>
                  <li>
                    <strong>Two 100W Panels in Parallel: </strong>
                    Parallel connections add current: Total Isc = 5.8A + 5.8A = 11.6 Amps. Sizing formula: 11.6A * 1.25 = 14.5 Amps. A standard 20A PWM controller is required.
                  </li>
                  <li>
                    <strong>Two Panels in Series on PWM: </strong>
                    Series wiring doubles voltage (approx 36V Vmp). Connecting a 36V array to a 12V battery through a PWM controller causes severe power waste, as the controller forces the 36V array down to 13V. For series wiring strings, always choose an MPPT controller.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 5: Voc Cold Weather Temperature Adjustment */}
            <section id="voc-cold-temperature" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xl sm:text-2xl">
                <ThermometerSnowflake className="w-6 h-6 text-blue-600" />
                <h2>Voltage Limits &amp; Sub-Freezing Voc Rise (NEC 690.7)</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Every MPPT controller has a strict maximum input voltage rating, typically printed prominently on the unit (such as 100V, 150V, or 250V). This is a rigid semiconductor breakdown limit. If the open-circuit voltage (Voc) of your solar array exceeds this threshold even for a single millisecond, the internal MOSFET switching transistors will be destroyed.
              </p>

              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-900 space-y-2 leading-relaxed">
                <div className="flex items-center gap-2 font-bold text-rose-950">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>The Cold-Weather Voltage Hazard</span>
                </div>
                <p>
                  Solar panel specifications on manufacturer spec sheets are rated at Standard Test Conditions (STC), which assume a cell temperature of 25 degrees Celsius (77 degrees Fahrenheit). Solar cells are semiconductors with a negative temperature coefficient: when temperatures drop, cell efficiency increases and output voltage spikes.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 text-base">Mathematical Formula for Maximum Cold Voc (NEC 690.7):</h3>
                <div className="p-4 bg-slate-900 text-emerald-400 font-mono text-xs sm:text-sm rounded-xl border border-slate-800">
                  V_oc_cold = V_oc_STC * [ 1 + (beta_Voc / 100) * (T_min - 25) ]
                </div>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1.5 pl-2 list-disc list-inside">
                  <li><strong>V_oc_STC: </strong> Total array series open-circuit voltage at 25 degrees C.</li>
                  <li><strong>beta_Voc: </strong> Temperature coefficient of Voc, typically between -0.28%/C and -0.35%/C for monocrystalline silicon.</li>
                  <li><strong>T_min: </strong> The historical record-low ambient temperature at your installation site in degrees Celsius.</li>
                </ul>
              </div>

              {/* Cold Voc Example Calculation */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm space-y-2">
                <div className="font-bold text-slate-900">Practical Cold-Weather Verification Example:</div>
                <p className="text-slate-700">
                  Consider three 400W residential solar panels wired in series. Each panel has an STC Voc of 49.5V. Total string Voc at 25C is: 3 * 49.5V = 148.5 Volts.
                </p>
                <p className="text-slate-700">
                  At first glance, this might appear safe for a popular 150V MPPT charge controller (148.5V &lt; 150V). However, if your installation site reaches -15 degrees Celsius (5 degrees Fahrenheit) on winter mornings with a temperature coefficient of -0.30%/C:
                </p>
                <div className="p-3 bg-white rounded-lg border border-slate-200 font-mono text-slate-900 font-semibold text-xs">
                  Delta T = -15C - 25C = -40C<br />
                  Voltage Increase Factor = 1 + [(-0.0030) * (-40)] = 1 + 0.120 = 1.120 (+12% increase)<br />
                  V_oc_cold = 148.5V * 1.120 = 166.3 Volts
                </div>
                <p className="text-rose-800 font-medium">
                  Result: On a cold sunny winter morning, the string voltage will reach 166.3V, instantly burning out the 150V controller. For this system, you must either rewire the array as a 2-series / parallel string or upgrade to a 200V or 250V MPPT controller.
                </p>
              </div>
            </section>

            {/* Section 6: Worked Sizing Scenarios */}
            <section id="worked-examples" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xl sm:text-2xl">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <h2>3 Real-World Sizing Scenarios (12V, 24V, 48V)</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Review these three validated benchmark configurations spanning mobile RV, off-grid cabin, and residential backup systems.
              </p>

              <div className="space-y-4">
                {/* Scenario 1 */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <span className="font-bold text-slate-900 text-sm sm:text-base">
                      Scenario 1: 400W RV Array on 12V LiFePO4 Battery Bank
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-xs">
                      12V Mobile System
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                    <div>
                      <p><strong>Solar Array: </strong> Four 100W panels (2S2P: 2 in series, 2 in parallel)</p>
                      <p><strong>Panel Specs: </strong> Vmp = 18.2V, Imp = 5.5A, Voc = 22.1V, Isc = 5.9A</p>
                      <p><strong>Battery Bank: </strong> 12V 200Ah Lithium Iron Phosphate</p>
                    </div>
                    <div>
                      <p><strong>Array Voc (STC): </strong> 22.1V * 2 = 44.2 Volts</p>
                      <p><strong>Max Cold Voc (-10C): </strong> 44.2V * 1.105 = 48.8 Volts</p>
                      <p><strong>Nominal Charging Amps: </strong> 400W / 12V = 33.3 Amps</p>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200 text-xs text-blue-900 space-y-1">
                    <p><strong>Controller Sizing: </strong> 33.3A * 1.25 buffer = 41.6 Amps planning current.</p>
                    <p><strong>Selected Model: </strong> 100V / 40A or 100V / 50A MPPT Controller.</p>
                    <p className="text-slate-600">The 100V input ceiling easily accommodates the 48.8V cold Voc, and a 40A or 50A unit handles full charging current comfortably.</p>
                  </div>
                </div>

                {/* Scenario 2 */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <span className="font-bold text-slate-900 text-sm sm:text-base">
                      Scenario 2: 800W Off-Grid Cabin on 24V Battery Bank
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold text-xs">
                      24V Cabin System
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                    <div>
                      <p><strong>Solar Array: </strong> Two 400W commercial panels in series</p>
                      <p><strong>Panel Specs: </strong> Vmp = 41.5V, Imp = 9.64A, Voc = 49.8V, Isc = 10.3A</p>
                      <p><strong>Battery Bank: </strong> 24V 300Ah LiFePO4</p>
                    </div>
                    <div>
                      <p><strong>Array Voc (STC): </strong> 49.8V * 2 = 99.6 Volts</p>
                      <p><strong>Max Cold Voc (-20C): </strong> 99.6V * 1.126 = 112.1 Volts</p>
                      <p><strong>Nominal Charging Amps: </strong> 800W / 24V = 33.3 Amps</p>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50/80 rounded-xl border border-purple-200 text-xs text-purple-900 space-y-1">
                    <p><strong>Controller Sizing: </strong> 33.3A * 1.25 buffer = 41.6 Amps planning current.</p>
                    <p><strong>Selected Model: </strong> 150V / 45A or 150V / 50A MPPT Controller.</p>
                    <p className="text-slate-600">Note: A 100V controller cannot be used here because the 112.1V cold Voc exceeds 100V. A 150V controller rating is strictly required.</p>
                  </div>
                </div>

                {/* Scenario 3 */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <span className="font-bold text-slate-900 text-sm sm:text-base">
                      Scenario 3: 2,400W Home Backup on 48V Battery Bank
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                      48V Whole-Home System
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                    <div>
                      <p><strong>Solar Array: </strong> Six 400W panels (3S2P: two parallel strings of 3 panels in series)</p>
                      <p><strong>Panel Specs: </strong> Vmp = 41.5V, Imp = 9.64A, Voc = 49.8V, Isc = 10.3A</p>
                      <p><strong>Battery Bank: </strong> 48V (51.2V nominal) 400Ah Server Rack Batteries</p>
                    </div>
                    <div>
                      <p><strong>String Voc (STC): </strong> 49.8V * 3 = 149.4 Volts</p>
                      <p><strong>Max Cold Voc (-25C): </strong> 149.4V * 1.14 = 170.3 Volts</p>
                      <p><strong>Nominal Charging Amps: </strong> 2,400W / 48V = 50.0 Amps</p>
                    </div>
                  </div>
                  <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
                    <p><strong>Controller Sizing: </strong> 50.0A * 1.25 buffer = 62.5 Amps planning current.</p>
                    <p><strong>Selected Model: </strong> 250V / 60A or 250V / 70A MPPT Controller.</p>
                    <p className="text-slate-600">The 250V input voltage limit comfortably clears the 170.3V sub-freezing string voltage with ample safety margin.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 7: Overpaneling Rules */}
            <section id="overpaneling-rules" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xl sm:text-2xl">
                <Sun className="w-6 h-6 text-blue-600" />
                <h2>Array Overpaneling &amp; Current Clipping</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Overpaneling (or oversizing your solar array relative to charge controller wattage) is a standard design technique among experienced off-grid solar installers.
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong className="text-slate-900">How Current Clipping Works: </strong>
                High-quality MPPT charge controllers have an internal current limiter. If you connect 1,200 Watts of solar panels to a 40A 24V MPPT controller (which nominally maxes out around 1,000 Watts at 24V), the controller will not burn out. During peak solar noon on a clear summer day, it simply caps (clips) its output to its maximum 40 Amps.
                <p className="pt-1">
                  <strong>The Major Advantage: </strong> Solar panels rarely produce 100% of their rated wattage due to dust, angle of incidence, heat derating, and haze. By overpaneling by 20% to 30%, your system reaches full charging output much earlier in the morning, maintains peak output during cloudy weather, and continues charging robustly later into the afternoon.
                </p>
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 font-medium">
                  <strong>The One Inviolable Rule: </strong> You can safely overpanel array wattage and short-circuit amperage, but you must NEVER overpanel open-circuit voltage (Voc). Voltage clipping does not exist. Excess voltage destroys electronics instantly.
                </div>
              </div>
            </section>

            {/* Section 8: Wire and Fuse Sizing */}
            <section id="wire-and-fuse-sizing" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xl sm:text-2xl">
                <Battery className="w-6 h-6 text-blue-600" />
                <h2>Wire Sizing, Breakers, and Safety Rules</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                A properly sized charge controller will not perform to specification if conductors are undersized or overcurrent protection is missing.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <span className="font-bold text-slate-900 block text-base">PV Array to Controller Wiring</span>
                  <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
                    <li>Conductor sized for 1.25x array short-circuit current (Isc).</li>
                    <li>Because MPPT strings run at higher voltage (60V to 150V+), current is low (typically 9A to 20A), allowing standard 10 AWG solar PV wire.</li>
                    <li>Install a two-pole DC circuit breaker or disconnect switch to isolate solar panels during maintenance.</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <span className="font-bold text-slate-900 block text-base">Controller to Battery Bank Wiring</span>
                  <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
                    <li>Carries high current at low battery voltage (e.g., 40A to 80A continuous).</li>
                    <li>Requires thick pure copper battery cables (e.g., 6 AWG, 4 AWG, or 2 AWG depending on distance) to keep voltage drop under 1.5%.</li>
                    <li>Install an inline DC fuse (ANL or MRBF) sized at 1.25x controller rated current within 7 inches of the battery positive terminal.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 9: Interactive Calculator Companion */}
            <section id="interactive-calculator" className="space-y-4 scroll-mt-24">
              <div className="p-6 bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl space-y-4 shadow-lg">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
                  <Calculator className="w-4 h-4" />
                  <span>Validated Engineering Tool</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Calculate Your Exact Controller Size in Seconds
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Put theory into practice. Our interactive Solar Charge Controller Calculator models MPPT vs. PWM dynamics, checks sub-freezing Voc safety margins per NEC 690.7, and outputs exact fuse and cable recommendations.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    href="/solar-charge-controller-calculator"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs sm:text-sm text-white transition shadow-sm"
                  >
                    <span>Launch Solar Charge Controller Calculator</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/inverter-size-calculator"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-semibold text-xs sm:text-sm text-slate-200 transition border border-slate-700"
                  >
                    <span>Size Companion Inverter</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </section>

            {/* Section 10: FAQ */}
            <section id="faq" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xl sm:text-2xl">
                <h2>Frequently Asked Questions</h2>
              </div>
              <div className="space-y-3">
                {FAQ_DATA.map((faq, idx) => (
                  <details
                    key={idx}
                    open={idx === 0}
                    className="group border border-slate-200 rounded-xl overflow-hidden transition-colors"
                  >
                    <summary className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 bg-white hover:bg-slate-50 transition cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                      <h3 className="font-semibold text-sm md:text-base text-slate-900">
                        {faq.question}
                      </h3>
                      <ChevronDown className="w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 group-open:rotate-180 group-open:text-blue-600" />
                    </summary>
                    <div className="px-5 pb-5 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50 pt-3">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Safety & Engineering Disclaimer */}
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2 text-xs text-amber-900">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Electrical Engineering Disclaimer</span>
              </div>
              <p className="leading-relaxed">
                Photovoltaic systems involve high DC voltages and substantial continuous battery currents capable of causing electric shock, arc flash, and fire hazards. This sizing guide is for educational planning. Always consult a licensed electrical engineer, NABCEP certified solar professional, and verify that installations comply with NFPA 70 (National Electrical Code Articles 690 and 706) and local jurisdiction requirements.
              </p>
            </div>
          </div>

          {/* Sticky Sidebar on Desktop */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Quick Sizing Tool Box */}
            <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-4 shadow-lg">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                Interactive Engineering Tools
              </span>
              <h3 className="text-lg font-bold">
                Size Your Solar System Accurately
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Calculate your exact charge controller, battery bank, and pure sine wave inverter requirements using our dedicated engineering calculators.
              </p>
              <div className="space-y-2 pt-2">
                <Link
                  href="/solar-charge-controller-calculator"
                  className="flex items-center justify-between p-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-xs"
                >
                  <span>Solar Charge Controller Calculator</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </Link>
                <Link
                  href="/inverter-size-calculator"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold transition"
                >
                  <span>Inverter Size Calculator</span>
                  <ArrowRight className="w-4 h-4 text-blue-400" />
                </Link>
                <Link
                  href="/solar-battery-calculator"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold transition"
                >
                  <span>Solar Battery Sizing Calculator</span>
                  <ArrowRight className="w-4 h-4 text-blue-400" />
                </Link>
                <Link
                  href="/solar-system-size-calculator"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold transition"
                >
                  <span>Solar System Size Calculator</span>
                  <ArrowRight className="w-4 h-4 text-blue-400" />
                </Link>
              </div>
            </div>

            {/* Table of Contents Desktop Component */}
            <div className="hidden lg:block bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <TableOfContents items={TOC_ITEMS} />
            </div>

            {/* Related Articles Box */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Related Electrical Guides
              </span>
              <div className="space-y-2 text-xs">
                <Link
                  href="/solar-panels-series-vs-parallel"
                  className="block font-medium text-blue-700 hover:underline"
                >
                  Solar Panels in Series vs. Parallel: Voltage, Current, and Power Guide
                </Link>
                <Link
                  href="/how-many-solar-panels-do-i-need"
                  className="block font-medium text-blue-700 hover:underline"
                >
                  How Many Solar Panels Do I Need for My Home?
                </Link>
                <Link
                  href="/how-much-energy-does-a-solar-panel-produce"
                  className="block font-medium text-blue-700 hover:underline"
                >
                  How Much Energy Does a Solar Panel Produce Daily and Monthly?
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
