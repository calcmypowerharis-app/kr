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
  Flame,
  Thermometer,
  Sliders,
  CheckCircle2,
  Cpu,
  Layers,
  Activity,
  AlertTriangle,
  BatteryCharging,
  Battery,
  Calendar,
  Maximize2,
} from "lucide-react";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
  generateWebApplicationSchema,
} from "@/lib/seo/schema";
import { ReadingProgressBar } from "@/components/article/ReadingProgressBar";
import { TableOfContents } from "@/components/article/TableOfContents";
import { MobileArticleNavigator } from "@/components/article/MobileArticleNavigator";
import { TocItem } from "@/components/article/tocData";
import ZoomableArticleImage from "@/components/article/ZoomableArticleImage";
import { ArticleDateByline } from "@/components/article/ArticleDateByline";
import { SolarChargeTimeCalculator } from "@/components/article/SolarChargeTimeCalculator";

export const metadata: Metadata = {
  title: "How Long Does It Take to Charge a Battery With Solar Panels? (Solar Charge Time Calculator)",
  description:
    "Calculate how long it takes to charge a battery with solar panels. Use our solar charge time calculator and engineering guide covering peak sun hours, MPPT vs PWM, and battery chemistry.",
  alternates: {
    canonical:
      "https://calcmypower.com/how-long-does-it-take-to-charge-a-battery-with-solar-panels",
  },
  openGraph: {
    title:
      "How Long Does It Take to Charge a Battery With Solar Panels? | CalcMyPower",
    description:
      "Calculate how long it takes to charge a battery with solar panels. Master peak sun hours, derate factors, MPPT vs PWM controllers, and battery chemistry absorption.",
    url: "https://calcmypower.com/how-long-does-it-take-to-charge-a-battery-with-solar-panels",
    type: "article",
    publishedTime: "2026-10-13T00:00:00Z",
    modifiedTime: "2026-10-13T00:00:00Z",
    images: [
      {
        url: "https://calcmypower.com/images/articles/how-long-does-it-take-to-charge-a-battery-with-solar-panels.webp",
        width: 1200,
        height: 675,
        alt: "Solar battery charging time engineering schematic and energy balance diagram",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "How Long Does It Take to Charge a Battery With Solar Panels? | CalcMyPower",
    description:
      "Calculate solar battery charging time using panel wattage, battery capacity, peak sun hours, and system efficiency deratings.",
    images: [
      "https://calcmypower.com/images/articles/how-long-does-it-take-to-charge-a-battery-with-solar-panels.webp",
    ],
  },
};

const TOC_ITEMS: TocItem[] = [
  { id: "direct-answer", label: "Direct Answer: Solar Recharge Equation" },
  { id: "solar-charge-calculator", label: "Solar Charge Time Calculator" },
  { id: "why-wattage-is-not-enough", label: "Why Panel Wattage Alone Is Not Enough" },
  { id: "the-calculation-formula", label: "Step-by-Step Mathematical Formula" },
  { id: "mppt-vs-pwm-controllers", label: "Charge Controller Impact: MPPT vs PWM" },
  { id: "battery-chemistry-effects", label: "Battery Chemistry: LiFePO4 vs Lead-Acid" },
  { id: "worked-examples", label: "Three Worked Engineering Sizing Examples" },
  { id: "solar-charge-benchmark-table", label: "Solar Charging Benchmark Table" },
  { id: "real-world-vs-theoretical", label: "Why Real-World Recharging Takes Longer" },
  { id: "safety-wiring-nec-rules", label: "System Sizing, Wiring & Safety Rules" },
  { id: "faq", label: "Frequently Asked Questions" },
  { id: "sources-and-disclaimers", label: "Engineering References & Disclaimers" },
];

const FAQS = [
  {
    question: "How long does a 200W solar panel take to charge a 100Ah battery?",
    answer:
      "Under optimal peak sunlight with an MPPT charge controller (roughly 82% net outdoor efficiency delivering 164W effective power), charging a depleted 12V 100Ah LiFePO4 battery (requiring ~980 Wh net) takes roughly 6.0 peak sun hours. Across typical US geographic regions receiving 4.0 to 5.0 peak sun hours daily, this equals approximately 1.2 to 1.5 sunny days. If using a lead-acid AGM battery with a PWM controller, charging takes roughly 11 peak sun hours, or 2.5 to 3 sunny days.",
  },
  {
    question: "Can I connect a solar panel directly to a battery without a charge controller?",
    answer:
      "No. Connecting a standard 12V solar panel directly to a battery without a charge controller risks battery destruction and fire hazards. Standard solar panels produce an open-circuit voltage between 18V and 24V, whereas a 12V battery requires regulated bulk charging between 14.2V and 14.6V. Without a charge controller, continuous unregulated voltage will boil lead-acid electrolyte or trigger lithium battery management system (BMS) over-voltage shutdowns.",
  },
  {
    question: "Why does my battery charge slower as it approaches 100% state of charge?",
    answer:
      "Lead-acid batteries enter constant-voltage absorption mode once they reach roughly 80% state of charge. As internal chemical resistance rises, the battery limits how much current it can safely accept. Charging current naturally tapers from full bulk amperage down to just 1 to 3 amps for the final 20% of capacity, requiring 2 to 4 additional hours of steady sunlight to achieve full saturation.",
  },
  {
    question: "Does solar panel tilt angle and compass orientation affect charging duration?",
    answer:
      "Yes. Solar panels generate maximum energy when sunlight strikes photovoltaic cells at a perpendicular 90-degree angle. In the Northern Hemisphere, panels facing true south and tilted to match seasonal solar altitude collect up to 30% to 50% more daily kilowatt-hours than poorly oriented or flat horizontal modules, directly reducing charging time.",
  },
  {
    question: "Can a solar panel charge a battery on an overcast or cloudy day?",
    answer:
      "Solar panels still generate electricity under diffuse daylight, but output drops to 10% to 25% of rated standard capacity under overcast skies and below 10% during heavy rain storms. A 200W array producing only 30W to 40W on a dark day will take four to six times longer to recharge your battery bank.",
  },
  {
    question: "How many solar panels do I need to charge a 100Ah lithium battery in one single day?",
    answer:
      "To reliably charge a depleted 12V 100Ah lithium battery (requiring ~1,000 Wh net replenishment) within a single 4.5-hour peak sun day, you need roughly 275W to 300W of solar capacity paired with an MPPT charge controller. Installing two 150W or two 200W solar panels (300W to 400W total array) provides comfortable margin against passing clouds, temperature losses, and seasonal haze.",
  },
];

export default function SolarBatteryChargeTimePage() {
  const articleSchema = generateArticleSchema({
    headline:
      "How Long Does It Take to Charge a Battery With Solar Panels? (Solar Charge Time Calculator)",
    description:
      "Calculate how long it takes to charge a battery with solar panels. Use our solar charge time calculator and engineering guide covering peak sun hours, MPPT vs PWM, and battery chemistry.",
    url: "https://calcmypower.com/how-long-does-it-take-to-charge-a-battery-with-solar-panels",
    datePublished: "2026-10-13",
    dateModified: "2026-10-13",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Guides", url: "https://calcmypower.com/calculators#solar" },
    {
      name: "How Long Does It Take to Charge a Battery With Solar Panels?",
      url: "https://calcmypower.com/how-long-does-it-take-to-charge-a-battery-with-solar-panels",
    },
  ]);

  const faqSchema = generateFaqSchema(FAQS);

  const webAppSchema = generateWebApplicationSchema({
    name: "Solar Panel Battery Charge Time Calculator",
    description:
      "Interactive engineering tool calculating solar battery recharge hours and days based on panel wattage, battery capacity, chemistry, and daily peak sun hours.",
    url: "https://calcmypower.com/how-long-does-it-take-to-charge-a-battery-with-solar-panels#solar-charge-calculator",
  });

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      <ReadingProgressBar />

      <div className="min-h-screen bg-slate-50 py-8 md:py-12">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500">
              <li>
                <Link href="/" className="hover:text-amber-600 transition">
                  Home
                </Link>
              </li>
              <li>
                <span className="text-slate-300">/</span>
              </li>
              <li>
                <Link
                  href="/calculators#solar"
                  className="hover:text-amber-600 transition"
                >
                  Solar PV Guides
                </Link>
              </li>
              <li>
                <span className="text-slate-300">/</span>
              </li>
              <li className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-none">
                Solar Battery Charging Time
              </li>
            </ol>
          </nav>

          {/* Canonical 12-Column Responsive Layout Grid (No items-start) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Primary Left Content Column (8 cols) */}
            <article id="article-content" className="lg:col-span-8 space-y-10">
              {/* Header Title & Metadata */}
              <header className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider">
                  <Sun className="w-3.5 h-3.5 text-amber-600" />
                  <span>Solar Energy Storage &amp; System Sizing</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  How Long Does It Take to Charge a Battery With Solar Panels?
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
                  Recharging a battery with solar panels depends on battery capacity, daily peak sun hours, system efficiency losses, and charge controller technology. Here is how to calculate exact solar recharge hours and realistic calendar days using verified electrical formulas.
                </p>

                <ArticleDateByline
                  datePublished="2026-10-13"
                  lastModified="2026-10-13"
                />
              </header>

              {/* Contextual Technical Hero Image */}
              <div className="space-y-3">
                <ZoomableArticleImage
                  src="/images/articles/how-long-does-it-take-to-charge-a-battery-with-solar-panels.webp"
                  alt="Solar battery charging time engineering schematic and energy balance diagram showing panel derating and battery bank recharge flow"
                  title="Solar Battery Charging Time"
                  caption="Engineering schematic: Balancing battery capacity (Wh = V * Ah) against solar panel thermal derating, controller conversion efficiency, and local daily peak sun hours."
                >
                  <Image
                    src="/images/articles/how-long-does-it-take-to-charge-a-battery-with-solar-panels.webp"
                    alt="Solar battery charging time engineering schematic and energy balance diagram showing panel derating and battery bank recharge flow"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover"
                  />
                </ZoomableArticleImage>
              </div>

              {/* Section 1: Direct Answer */}
              <section id="direct-answer" className="space-y-4 pt-2">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight border-b border-slate-200 pb-3">
                  Direct Answer: The Solar Battery Recharge Equation
                </h2>

                <p className="text-slate-700 leading-relaxed text-base">
                  Under ideal direct sunlight, fully charging a depleted deep-cycle battery with a matched solar panel array typically takes <strong>5 to 8 peak sun hours</strong>, or roughly <strong>1 to 2 sunny calendar days</strong>.
                </p>

                <p className="text-slate-700 leading-relaxed text-base">
                  For example, recharging a common 12V 100Ah lithium (LiFePO4) battery from 20% to 100% requires approximately 980 Watt-hours of net energy. A standard 200W solar panel paired with an MPPT charge controller delivers roughly 164 Watts of effective charging power after real-world temperature and wiring losses.
                </p>

                <p className="text-slate-700 leading-relaxed text-base">
                  Dividing 980 Watt-hours by 164 Watts gives approximately <strong>6.0 peak sun hours</strong>. Because most regions in the United States receive between 4.0 and 5.0 peak sun hours per day, this system takes approximately <strong>1.3 sunny days</strong> to complete a full recharge.
                </p>

                {/* Key Takeaways Card */}
                <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-5 space-y-3">
                  <div className="font-bold text-amber-950 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-700" />
                    <span>Key Solar Charging Takeaways</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-700 font-bold">•</span>
                      <span><strong>Nominal vs Usable Energy:</strong> Watt-hours equal battery voltage multiplied by Amp-hours.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-700 font-bold">•</span>
                      <span><strong>Real-World Derate:</strong> Panels produce 75% to 85% of nameplate rating due to outdoor heat.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-700 font-bold">•</span>
                      <span><strong>MPPT vs PWM:</strong> MPPT controllers charge 20% to 30% faster than entry-level PWM units.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-700 font-bold">•</span>
                      <span><strong>Absorption Taper:</strong> Lead-acid batteries require 2 to 4 extra hours for the final 20% top-off.</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 2: Interactive Calculator Widget */}
              <div id="solar-charge-calculator" className="scroll-mt-24">
                <SolarChargeTimeCalculator />
              </div>

              {/* Section 3: Why Wattage Alone Is Not Enough */}
              <section id="why-wattage-is-not-enough" className="space-y-4 pt-4">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight border-b border-slate-200 pb-3">
                  Why Solar Panel Wattage Alone Does Not Determine Charging Time
                </h2>

                <p className="text-slate-700 leading-relaxed text-base">
                  A common homeowner misconception is assuming a 200W solar panel outputs 200 Watts continuously throughout the day. Under real operating conditions, solar panels rarely achieve their advertised nameplate capacity for extended periods.
                </p>

                <p className="text-slate-700 leading-relaxed text-base">
                  Manufacturers rate photovoltaic modules under Standard Test Conditions (STC): an artificial laboratory environment with an irradiance of exactly 1,000 Watts per square meter, an air mass of 1.5, and a cell temperature of 25°C (77°F).
                </p>

                <p className="text-slate-700 leading-relaxed text-base">
                  In practical outdoor installations, dark silicon solar panels exposed to midday sunshine routinely reach operating temperatures between 45°C and 65°C (113°F to 149°F). Because monocrystalline silicon exhibits a negative temperature coefficient of maximum power (typically -0.35% to -0.40% per degree Celsius above 25°C), thermal derating reduces actual electrical output by 8% to 15%.
                </p>

                <p className="text-slate-700 leading-relaxed text-base">
                  When you compound thermal loss with atmospheric dust, soiling, glass reflections, and cable voltage drop, a 200W solar module typically delivers between 150W and 170W under strong midday sun. Sizing calculations must always account for this environmental derate factor.
                </p>
              </section>

              {/* Section 4: Step-by-Step Mathematical Formula */}
              <section id="the-calculation-formula" className="space-y-4 pt-4">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight border-b border-slate-200 pb-3">
                  The Step-by-Step Mathematical Formula for Solar Battery Charging
                </h2>

                <p className="text-slate-700 leading-relaxed text-base">
                  Calculating charging duration requires four distinct engineering steps: determining energy deficit, factoring chemical efficiency, derating solar generation, and dividing by daily sun hours.
                </p>

                {/* Step Breakdown Cards */}
                <div className="space-y-4">
                  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs space-y-2">
                    <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
                      <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-black">1</span>
                      <span>Calculate Nominal and Deficit Battery Energy in Watt-hours (Wh)</span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Convert battery capacity from Amp-hours (Ah) into Watt-hours (Wh) by multiplying by nominal system voltage. Then determine the exact energy deficit from your starting depth of discharge:
                    </p>
                    <div className="bg-slate-900 text-amber-300 font-mono text-xs sm:text-sm p-3 rounded-lg overflow-x-auto">
                      Deficit Energy (Wh) = Voltage (V) × Capacity (Ah) × [(Target SoC% - Current SoC%) ÷ 100]
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs space-y-2">
                    <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
                      <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-black">2</span>
                      <span>Account for Battery Chemistry Inefficiencies</span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      No electrochemical cell absorbs 100% of incoming energy. Some power is lost as heat and internal chemical resistance. Divide the energy deficit by the chemistry coulombic efficiency factor:
                    </p>
                    <div className="bg-slate-900 text-amber-300 font-mono text-xs sm:text-sm p-3 rounded-lg overflow-x-auto">
                      Net Energy Needed (Wh) = Deficit Energy (Wh) ÷ Battery Coulombic Efficiency (0.80 to 0.98)
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs space-y-2">
                    <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
                      <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-black">3</span>
                      <span>Determine Effective Solar Array Charging Power</span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Apply real-world outdoor derating and charge controller conversion factors to your solar array nameplate wattage:
                    </p>
                    <div className="bg-slate-900 text-amber-300 font-mono text-xs sm:text-sm p-3 rounded-lg overflow-x-auto">
                      Effective Solar Power (W) = Rated Solar Watts × Net System Yield Factor (0.65 for PWM, 0.82 for MPPT)
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs space-y-2">
                    <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
                      <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-black">4</span>
                      <span>Calculate Peak Sun Hours and Calendar Days</span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Divide net energy required by effective solar wattage to obtain required Peak Sun Hours. Then divide by your regional average daily sun hours:
                    </p>
                    <div className="bg-slate-900 text-amber-300 font-mono text-xs sm:text-sm p-3 rounded-lg overflow-x-auto">
                      Charging Days = [Net Energy Needed (Wh) ÷ Effective Solar Watts (W)] ÷ Daily Peak Sun Hours
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 5: MPPT vs PWM Impact */}
              <section id="mppt-vs-pwm-controllers" className="space-y-4 pt-4">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight border-b border-slate-200 pb-3">
                  Charge Controller Impact: MPPT vs PWM Conversion
                </h2>

                <p className="text-slate-700 leading-relaxed text-base">
                  Your choice of solar charge controller has a massive impact on charging duration. The difference between Pulse Width Modulation (PWM) and Maximum Power Point Tracking (MPPT) represents a 20% to 35% difference in actual delivered energy.
                </p>

                <p className="text-slate-700 leading-relaxed text-base">
                  A standard 12V monocrystalline solar panel typically produces a maximum power voltage (Vmp) of approximately 18.0V to 18.5V under standard sunlight.
                </p>

                <p className="text-slate-700 leading-relaxed text-base">
                  A PWM charge controller operates like an electronic switch. It clamps the solar panel operating voltage directly down to the battery voltage, which is typically 13.5V to 14.2V during charging. Because electrical power equals voltage multiplied by current, forcing the panel from 18V down to 13.5V immediately discards roughly 25% of the panel&apos;s potential wattage.
                </p>

                <p className="text-slate-700 leading-relaxed text-base">
                  An MPPT controller functions as a high-efficiency DC-to-DC converter. It tracks the optimal electrical operating point of the solar panel, accepts power at high voltage (18V to 100V+), and steps the voltage down while boosting charging current into the battery bank. With typical conversion efficiencies between 95% and 98%, an MPPT controller captures almost all available array power.
                </p>

                {/* Comparison Card */}
                <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-2xs">
                  <div className="bg-slate-900 px-4 py-3 text-white font-bold text-sm flex items-center justify-between">
                    <span>Charge Controller Technology Comparison</span>
                    <span className="text-xs text-amber-400 font-normal">Based on 200W Solar Array</span>
                  </div>
                  <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div className="space-y-2 border-b md:border-b-0 md:border-r border-slate-200 pb-3 md:pb-0 md:pr-3">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5 text-amber-700">
                        <Sliders className="w-4 h-4" />
                        <span>PWM Controller (Budget)</span>
                      </div>
                      <p className="text-slate-600">
                        Forces panel voltage to match battery terminal voltage. Net outdoor efficiency averages 62% to 68%.
                      </p>
                      <ul className="text-slate-600 space-y-1">
                        <li>• 200W Array Delivers: <strong>~130 Watts DC</strong></li>
                        <li>• Bulk Current into 12V Bank: <strong>~9.0 Amps</strong></li>
                        <li>• Relative Recharge Speed: <strong>Baseline</strong></li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5 text-blue-700">
                        <Cpu className="w-4 h-4" />
                        <span>MPPT Controller (Recommended)</span>
                      </div>
                      <p className="text-slate-600">
                        Performs active DC-DC voltage down-conversion and current boosting. Net outdoor efficiency averages 80% to 84%.
                      </p>
                      <ul className="text-slate-600 space-y-1">
                        <li>• 200W Array Delivers: <strong>~164 Watts DC</strong></li>
                        <li>• Bulk Current into 12V Bank: <strong>~11.5 Amps</strong></li>
                        <li>• Relative Recharge Speed: <strong>25% to 30% faster</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 6: Battery Chemistry Differences */}
              <section id="battery-chemistry-effects" className="space-y-4 pt-4">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight border-b border-slate-200 pb-3">
                  Battery Chemistry: LiFePO4 vs Lead-Acid Absorption Taper
                </h2>

                <p className="text-slate-700 leading-relaxed text-base">
                  Battery chemistry influences charging time just as heavily as solar array wattage. The two dominant off-grid battery families, Lithium Iron Phosphate (LiFePO4) and Lead-Acid (AGM, Gel, Flooded), exhibit drastically different charging physics.
                </p>

                <p className="text-slate-700 leading-relaxed text-base">
                  LiFePO4 lithium batteries feature exceptionally high coulombic efficiency (typically 97% to 99%). They maintain a virtually flat voltage curve and accept maximum bulk charging current continuously until reaching roughly 95% to 98% state of charge.
                </p>

                <p className="text-slate-700 leading-relaxed text-base">
                  Consequently, lithium battery charging time follows an almost straight mathematical line. Once the bulk phase finishes, the battery requires only 15 to 30 minutes of brief constant-voltage absorption for cell balancing before charging completes.
                </p>

                <p className="text-slate-700 leading-relaxed text-base">
                  In contrast, lead-acid batteries suffer from a pronounced absorption taper. While an AGM battery absorbs heavy current while deeply depleted, internal resistance climbs sharply once the battery reaches approximately 80% state of charge.
                </p>

                <p className="text-slate-700 leading-relaxed text-base">
                  To prevent electrolyte boiling and plate damage, the charge controller holds voltage steady while charging current naturally tapers down. Squeezing the final 20% of energy into an AGM or flooded battery takes between 2 and 4 additional hours of sunlight, regardless of how large your solar panel array is.
                </p>
              </section>

              {/* Section 7: Three Worked Examples */}
              <section id="worked-examples" className="space-y-4 pt-4">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight border-b border-slate-200 pb-3">
                  Three Worked Engineering Sizing Examples
                </h2>

                <p className="text-slate-700 leading-relaxed text-base">
                  To see the mathematical formulas applied in practice, examine these three representative off-grid and mobile solar installations.
                </p>

                {/* Example 1 */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-900 text-sm">
                      Scenario A: Camper Van 12V 100Ah LiFePO4 with 200W Solar &amp; MPPT
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                      Mobile RV
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                    <div>
                      <strong>System Inputs:</strong>
                      <ul className="mt-1 space-y-0.5 text-slate-600">
                        <li>• Nominal Storage: 12V × 100Ah = 1,200 Wh</li>
                        <li>• Discharge Level: Recharging from 20% to 100% (80% deficit)</li>
                        <li>• Solar Array: 200W monocrystalline modules</li>
                        <li>• Controller: MPPT (82% net yield factor)</li>
                        <li>• Local Sunlight: 4.5 peak sun hours per day</li>
                      </ul>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <strong>Step-by-Step Calculation:</strong>
                      <ol className="mt-1 space-y-1 text-slate-700 text-xs font-mono">
                        <li>1. Deficit = 1,200 Wh × 0.80 = 960 Wh</li>
                        <li>2. Net Needed = 960 Wh ÷ 0.98 = 979.6 Wh</li>
                        <li>3. Effective Solar = 200W × 0.82 = 164.0 W</li>
                        <li>4. Peak Sun Hours = 979.6 ÷ 164.0 = 5.97 hrs</li>
                        <li>5. Calendar Days = 5.97 ÷ 4.5 = 1.33 days</li>
                      </ol>
                    </div>
                  </div>
                  <div className="text-xs text-slate-600 border-t border-slate-100 pt-2">
                    <strong>Verdict:</strong> Fully recharges in approximately 6 peak sun hours, requiring 1 full sunny day plus 1.5 hours of morning sunlight on day two.
                  </div>
                </div>

                {/* Example 2 */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-900 text-sm">
                      Scenario B: Weekend Boat 12V 100Ah AGM with 100W Solar &amp; PWM
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                      Budget Marine
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                    <div>
                      <strong>System Inputs:</strong>
                      <ul className="mt-1 space-y-0.5 text-slate-600">
                        <li>• Nominal Storage: 12V × 100Ah = 1,200 Wh</li>
                        <li>• Discharge Level: Recharging from 50% to 100% (50% deficit)</li>
                        <li>• Solar Array: 100W portable folding panel</li>
                        <li>• Controller: PWM (65% net yield factor)</li>
                        <li>• Local Sunlight: 4.0 peak sun hours per day</li>
                      </ul>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <strong>Step-by-Step Calculation:</strong>
                      <ol className="mt-1 space-y-1 text-slate-700 text-xs font-mono">
                        <li>1. Deficit = 1,200 Wh × 0.50 = 600 Wh</li>
                        <li>2. Net Needed = 600 Wh ÷ 0.85 = 705.9 Wh</li>
                        <li>3. Effective Solar = 100W × 0.65 = 65.0 W</li>
                        <li>4. Peak Sun Hours = 705.9 ÷ 65.0 = 10.86 hrs</li>
                        <li>5. Calendar Days = 10.86 ÷ 4.0 = 2.71 days</li>
                      </ol>
                    </div>
                  </div>
                  <div className="text-xs text-slate-600 border-t border-slate-100 pt-2">
                    <strong>Verdict:</strong> Requires nearly 11 peak sun hours, translating to almost 3 full days of clear weather due to PWM voltage clipping and AGM absorption taper.
                  </div>
                </div>

                {/* Example 3 */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-900 text-sm">
                      Scenario C: Off-Grid Cabin 24V 200Ah Lithium with 800W Solar &amp; MPPT
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Off-Grid Homestead
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                    <div>
                      <strong>System Inputs:</strong>
                      <ul className="mt-1 space-y-0.5 text-slate-600">
                        <li>• Nominal Storage: 24V × 200Ah = 4,800 Wh (4.8 kWh)</li>
                        <li>• Discharge Level: Recharging from 20% to 100% (80% deficit)</li>
                        <li>• Solar Array: Two 400W commercial rooftop panels (800W)</li>
                        <li>• Controller: MPPT (82% net yield factor)</li>
                        <li>• Local Sunlight: 5.0 peak sun hours per day</li>
                      </ul>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <strong>Step-by-Step Calculation:</strong>
                      <ol className="mt-1 space-y-1 text-slate-700 text-xs font-mono">
                        <li>1. Deficit = 4,800 Wh × 0.80 = 3,840 Wh</li>
                        <li>2. Net Needed = 3,840 Wh ÷ 0.98 = 3,918.4 Wh</li>
                        <li>3. Effective Solar = 800W × 0.82 = 656.0 W</li>
                        <li>4. Peak Sun Hours = 3,918.4 ÷ 656.0 = 5.97 hrs</li>
                        <li>5. Calendar Days = 5.97 ÷ 5.0 = 1.19 days</li>
                      </ol>
                    </div>
                  </div>
                  <div className="text-xs text-slate-600 border-t border-slate-100 pt-2">
                    <strong>Verdict:</strong> A substantial 4.8 kWh energy bank recharges in just 1.2 sunny days due to matched 800W array power and 24V system efficiency.
                  </div>
                </div>
              </section>

              {/* Section 8: Benchmark Comparison Table */}
              <section id="solar-charge-benchmark-table" className="space-y-4 pt-4">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight border-b border-slate-200 pb-3">
                  Solar Battery Charging Time Benchmark Table
                </h2>

                <p className="text-slate-700 leading-relaxed text-base">
                  This reference lookup table compares solar battery charging duration across popular battery bank sizes and solar array configurations.
                </p>

                <p className="text-slate-700 leading-relaxed text-xs text-slate-500 italic">
                  Assumptions: LiFePO4 chemistry with 80% discharge deficit (98% coulombic efficiency); MPPT charge controller (82% net outdoor yield factor); average regional sunlight of 4.5 peak sun hours per day; zero concurrent electrical loads.
                </p>

                <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-2xs">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-white font-bold border-b border-slate-800">
                        <th className="py-3 px-3.5">Battery Bank Size</th>
                        <th className="py-3 px-3">Nominal Energy</th>
                        <th className="py-3 px-3">Solar Array Watts</th>
                        <th className="py-3 px-3">Effective Solar W</th>
                        <th className="py-3 px-3">Bulk Current (A)</th>
                        <th className="py-3 px-3">Peak Sun Hours</th>
                        <th className="py-3 px-3">Days (4.5 PSH)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-3.5 font-bold text-slate-900">12V 50Ah Lithium</td>
                        <td className="py-2.5 px-3 font-mono">600 Wh</td>
                        <td className="py-2.5 px-3">100W</td>
                        <td className="py-2.5 px-3 font-mono">82W</td>
                        <td className="py-2.5 px-3 font-mono">5.8A</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-amber-700">5.98 hrs</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900">1.3 days</td>
                      </tr>
                      <tr className="hover:bg-slate-50 bg-amber-50/30">
                        <td className="py-2.5 px-3.5 font-bold text-slate-900">12V 100Ah Lithium</td>
                        <td className="py-2.5 px-3 font-mono">1,200 Wh</td>
                        <td className="py-2.5 px-3">100W</td>
                        <td className="py-2.5 px-3 font-mono">82W</td>
                        <td className="py-2.5 px-3 font-mono">5.8A</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-amber-700">11.95 hrs</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900">2.7 days</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-3.5 font-bold text-slate-900">12V 100Ah Lithium</td>
                        <td className="py-2.5 px-3 font-mono">1,200 Wh</td>
                        <td className="py-2.5 px-3">200W</td>
                        <td className="py-2.5 px-3 font-mono">164W</td>
                        <td className="py-2.5 px-3 font-mono">11.5A</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-amber-700">5.98 hrs</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900">1.3 days</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-3.5 font-bold text-slate-900">12V 100Ah Lithium</td>
                        <td className="py-2.5 px-3 font-mono">1,200 Wh</td>
                        <td className="py-2.5 px-3">400W</td>
                        <td className="py-2.5 px-3 font-mono">328W</td>
                        <td className="py-2.5 px-3 font-mono">23.1A</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-amber-700">2.99 hrs</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900">0.7 days</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-3.5 font-bold text-slate-900">12V 200Ah Lithium</td>
                        <td className="py-2.5 px-3 font-mono">2,400 Wh</td>
                        <td className="py-2.5 px-3">400W</td>
                        <td className="py-2.5 px-3 font-mono">328W</td>
                        <td className="py-2.5 px-3 font-mono">23.1A</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-amber-700">5.98 hrs</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900">1.3 days</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-3.5 font-bold text-slate-900">24V 100Ah Lithium</td>
                        <td className="py-2.5 px-3 font-mono">2,400 Wh</td>
                        <td className="py-2.5 px-3">400W</td>
                        <td className="py-2.5 px-3 font-mono">328W</td>
                        <td className="py-2.5 px-3 font-mono">11.5A</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-amber-700">5.98 hrs</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900">1.3 days</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-3.5 font-bold text-slate-900">24V 200Ah Lithium</td>
                        <td className="py-2.5 px-3 font-mono">4,800 Wh</td>
                        <td className="py-2.5 px-3">800W</td>
                        <td className="py-2.5 px-3 font-mono">656W</td>
                        <td className="py-2.5 px-3 font-mono">23.1A</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-amber-700">5.98 hrs</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900">1.3 days</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-3.5 font-bold text-slate-900">48V 100Ah Lithium</td>
                        <td className="py-2.5 px-3 font-mono">4,800 Wh</td>
                        <td className="py-2.5 px-3">1,200W</td>
                        <td className="py-2.5 px-3 font-mono">984W</td>
                        <td className="py-2.5 px-3 font-mono">17.3A</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-amber-700">3.98 hrs</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900">0.9 days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 9: Real-World vs Theoretical */}
              <section id="real-world-vs-theoretical" className="space-y-4 pt-4">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight border-b border-slate-200 pb-3">
                  Why Real-World Recharging Takes Longer Than the Theoretical Formula
                </h2>

                <p className="text-slate-700 leading-relaxed text-base">
                  When field measurements disagree with paper calculations, one of four environmental or electrical variables is almost always responsible.
                </p>

                <p className="text-slate-700 leading-relaxed text-base">
                  <strong>1. Changing Sun Angles and Cosine Losses:</strong> Peak sun hours represent a mathematical abstraction. In reality, the sun traverses an arc across the sky. Fixed rooftop solar panels experience oblique sun angles during the early morning and late afternoon, capturing substantially less photons than midday sun.
                </p>

                <p className="text-slate-700 leading-relaxed text-base">
                  <strong>2. Simultaneous Electrical Loads:</strong> Many vanlifers and homeowners run 12V refrigerators, LED lighting, or inverter standby power while attempting to charge. If your solar panels produce 150 Watts, but an active 12V compressor refrigerator consumes 50 Watts, only 100 Watts actually enters the battery, extending charging time by 50%.
                </p>

                <p className="text-slate-700 leading-relaxed text-base">
                  <strong>3. Intermittent Cloud Cover and Haze:</strong> High altitude cirrus clouds, wildfire smoke, and summer humidity diffuse solar radiation. Even when the sky appears bright, invisible atmospheric haze can suppress photovoltaic generation by 15% to 30%.
                </p>

                <p className="text-slate-700 leading-relaxed text-base">
                  <strong>4. Cold Weather BMS Protections:</strong> LiFePO4 batteries cannot safely receive charging current when internal cell temperatures drop below freezing (0°C / 32°F). Modern smart batteries feature internal Battery Management Systems (BMS) that automatically disconnect incoming solar power in winter until internal heating elements warm the cells.
                </p>
              </section>

              {/* Section 10: Safety & Wiring Rules */}
              <section id="safety-wiring-nec-rules" className="space-y-4 pt-4">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight border-b border-slate-200 pb-3">
                  System Sizing, Wiring &amp; Electrical Safety Rules
                </h2>

                <p className="text-slate-700 leading-relaxed text-base">
                  Installing a solar battery charging system requires adhering to established electrical engineering safety margins and National Electrical Code (NEC) guidelines.
                </p>

                <p className="text-slate-700 leading-relaxed text-base">
                  <strong>Charge Controller Continuous Sizing (NEC 690.8):</strong> Solar photovoltaic circuits are classified as continuous electrical loads. When selecting a charge controller, calculate maximum potential solar array current and apply a minimum 1.25 continuous-load safety factor.
                </p>

                <p className="text-slate-700 leading-relaxed text-base">
                  <strong>Wire Gauge and Voltage Drop (NEC 210.19):</strong> Low-voltage DC circuits are highly vulnerable to voltage drop. Running heavy current through undersized conductor cables causes resistive heat and prevents the charge controller from maintaining target absorption voltage. Keep total DC circuit voltage drop strictly below 3% using properly sized AWG copper conductors.
                </p>

                {/* Safety Warning Card */}
                <div className="rounded-xl border border-red-200 bg-red-50/70 p-5 space-y-2 text-slate-800 text-xs sm:text-sm">
                  <div className="font-bold text-red-900 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-red-700" />
                    <span>Battery C-Rate and Thermal Safety Warning</span>
                  </div>
                  <p className="leading-relaxed">
                    Never exceed manufacturer maximum charge current ratings. Flooded and sealed lead-acid batteries should generally not be charged at rates exceeding 0.20C to 0.25C (20A to 25A for a 100Ah battery) to prevent violent electrolyte boiling and thermal runaway. While lithium LiFePO4 batteries accept up to 0.50C (50A for a 100Ah battery), always verify your specific battery BMS specifications before connecting high-wattage solar arrays.
                  </p>
                </div>
              </section>

              {/* Related Calculators Cross-Link Grid */}
              <section className="space-y-4 pt-4">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Related Solar &amp; Battery Calculation Tools
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link
                    href="/solar-battery-calculator"
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-amber-500 hover:shadow-xs transition group block"
                  >
                    <div className="font-bold text-slate-900 group-hover:text-amber-700 flex items-center justify-between text-sm">
                      <span>Solar Battery Sizing Calculator</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition" />
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      Size your battery bank capacity in kWh and Ah based on daily household electrical consumption and autonomy days.
                    </p>
                  </Link>

                  <Link
                    href="/solar-charge-controller-calculator"
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-amber-500 hover:shadow-xs transition group block"
                  >
                    <div className="font-bold text-slate-900 group-hover:text-amber-700 flex items-center justify-between text-sm">
                      <span>Solar Charge Controller Calculator</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition" />
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      Size MPPT and PWM charge controllers with cold-weather Voc calculations and array amperage headroom.
                    </p>
                  </Link>

                  <Link
                    href="/how-long-will-a-100ah-battery-last"
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-amber-500 hover:shadow-xs transition group block"
                  >
                    <div className="font-bold text-slate-900 group-hover:text-amber-700 flex items-center justify-between text-sm">
                      <span>How Long Will a 100Ah Battery Last?</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition" />
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      Explore discharge runtimes for 12V 100Ah batteries powering refrigerators, CPAP machines, TVs, and inverters.
                    </p>
                  </Link>

                  <Link
                    href="/solar-panels-series-vs-parallel"
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-amber-500 hover:shadow-xs transition group block"
                  >
                    <div className="font-bold text-slate-900 group-hover:text-amber-700 flex items-center justify-between text-sm">
                      <span>Solar Panels in Series vs Parallel</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition" />
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      Learn how series and parallel wiring arrangements impact solar string operating voltage, current, and charge controller choice.
                    </p>
                  </Link>
                </div>
              </section>

              {/* Section 11: FAQs (Semantic Accordions matching FAQ Schema) */}
              <section id="faq" className="space-y-4 pt-4">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight border-b border-slate-200 pb-3 flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-amber-600" />
                  <span>Frequently Asked Questions</span>
                </h2>

                <div className="space-y-3">
                  {FAQS.map((faq, index) => (
                    <details
                      key={index}
                      className="group rounded-xl border border-slate-200 bg-white p-4 transition shadow-2xs open:border-amber-400"
                    >
                      <summary className="flex items-center justify-between font-bold text-slate-900 cursor-pointer list-none text-sm sm:text-base pr-2">
                        <span>{faq.question}</span>
                        <span className="text-slate-400 group-open:rotate-180 transition transform duration-200 shrink-0 ml-2">
                          ▼
                        </span>
                      </summary>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3 border-t border-slate-100 pt-3">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>

              {/* Section 12: Sources and Disclaimers */}
              <section
                id="sources-and-disclaimers"
                className="space-y-3 pt-4 border-t border-slate-200 text-xs text-slate-500"
              >
                <div className="font-bold text-slate-700 uppercase tracking-wider">
                  Authoritative Engineering Sources &amp; Standards:
                </div>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>
                    National Fire Protection Association (NFPA). <em>NFPA 70: National Electrical Code (NEC)</em>, Article 690 (Solar Photovoltaic Systems) and Article 705 (Interconnected Electric Power Production Sources).
                  </li>
                  <li>
                    National Renewable Energy Laboratory (NREL). <em>PVWatts Calculator and Photovoltaic System Performance Models</em>. U.S. Department of Energy.
                  </li>
                  <li>
                    Institute of Electrical and Electronics Engineers (IEEE). <em>IEEE Std 1013: Recommended Practice for Sizing Lead-Acid Batteries for Stand-Alone Photovoltaic (PV) Systems</em>.
                  </li>
                  <li>
                    Sandia National Laboratories. <em>Photovoltaic System Performance and Reliability Benchmarks</em>.
                  </li>
                </ul>

                <p className="pt-2 italic text-[11px] leading-relaxed text-slate-500">
                  Preliminary Planning Disclaimer: This solar battery charging calculator and sizing guide provides engineering estimates for preliminary planning purposes. Actual charging times depend on real-time solar irradiance, ambient temperature, cloud cover, wire resistance, and battery health. Always verify manufacturer specifications for battery maximum charge current and consult a licensed electrician for physical photovoltaic installations.
                </p>
              </section>
            </article>

            {/* Desktop Supporting Aside Column (4 cols) */}
            <aside className="hidden lg:block lg:col-span-4">
              <TableOfContents items={TOC_ITEMS} cluster="solar" />
            </aside>
          </div>
        </div>
      </div>

      {/* Floating Mobile Reading Navigator */}
      <MobileArticleNavigator items={TOC_ITEMS} />
    </>
  );
}
