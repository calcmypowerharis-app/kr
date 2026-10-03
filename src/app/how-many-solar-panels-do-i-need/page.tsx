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
  GitBranch,
  Split,
  Maximize2,
  Home,
  Check,
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

export const metadata: Metadata = {
  title: "How Many Solar Panels Do I Need to Power My House?",
  description:
    "Learn how to estimate how many solar panels your home needs using electricity usage, peak sun hours, system performance, and panel wattage. Includes examples and a free solar sizing calculator.",
  alternates: {
    canonical: "https://calcmypower.com/how-many-solar-panels-do-i-need",
  },
  openGraph: {
    title:
      "How Many Solar Panels Do I Need to Power My House? | CalcMyPower",
    description:
      "Learn how to estimate how many solar panels your home needs using electricity usage, peak sun hours, system performance, and panel wattage. Includes examples and a free solar sizing calculator.",
    url: "https://calcmypower.com/how-many-solar-panels-do-i-need",
    type: "article",
    images: [
      {
        url: "https://calcmypower.com/images/articles/how-many-solar-panels-do-i-need.webp",
        width: 1200,
        height: 675,
        alt: "American single-family home with rooftop solar panel array, utility bill, and layout clipboard.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "How Many Solar Panels Do I Need to Power My House? | CalcMyPower",
    description:
      "Learn how to estimate how many solar panels your home needs using electricity usage, peak sun hours, system performance, and panel wattage. Includes examples and a free solar sizing calculator.",
    images: [
      "https://calcmypower.com/images/articles/how-many-solar-panels-do-i-need.webp",
    ],
  },
};

const TOC_ITEMS: TocItem[] = [
  { id: "quick-answer", label: "Quick Answer: How Many Panels Do You Need?" },
  { id: "typical-needs", label: "How Many Solar Panels Does a House Usually Need?" },
  { id: "determining-factors", label: "Key Factors Determining Your Solar Panel Count" },
  { id: "calculation-steps", label: "How to Calculate Your Panel Count Step-by-Step" },
  { id: "worked-example-900", label: "Worked Example: Sizing an Array for 900 kWh/Month" },
  { id: "example-500-kwh", label: "How Many Solar Panels for 500 kWh Per Month?" },
  { id: "example-1000-kwh", label: "How Many Solar Panels for 1,000 kWh Per Month?" },
  { id: "panel-wattage-impact", label: "Does Panel Wattage Change the Number of Panels Needed?" },
  { id: "roof-size-constraints", label: "Does Roof Size Determine How Many Panels You Need?" },
  { id: "shading-orientation", label: "What About Shading, Roof Pitch, and Compass Direction?" },
  { id: "estimate-accuracy", label: "How Accurate Is a Solar Panel Count Estimate?" },
  { id: "calculator-cta", label: "Estimate Your Home with the Solar System Size Calculator" },
  { id: "related-tools", label: "Related Power & Energy Sizing Tools" },
  { id: "faq", label: "Frequently Asked Questions" },
];

const FAQ_DATA = [
  {
    question: "How many solar panels does the average house need?",
    answer:
      "Under typical planning assumptions, an average American single-family household consuming roughly 900 kWh per month in a region with 4.5 peak sun hours needs approximately 22 modern 400-Watt solar panels (an 8.55 kW DC array) to offset 100% of its annual electricity usage. Depending on your home's actual electricity consumption, local solar irradiance, and panel wattage, typical residential systems range from 14 to 28 panels.",
  },
  {
    question: "How many solar panels do I need for 500 kWh per month?",
    answer:
      "For a home consuming 500 kWh per month in an area receiving 4.5 peak sun hours per day with a 78% planning performance factor, the required array size is approximately 4.75 kW DC. Using standard 400-Watt panels, this translates to an illustrative planning estimate of approximately 12 panels (yielding a 4.80 kW DC installed capacity).",
  },
  {
    question: "How many solar panels do I need for 1,000 kWh per month?",
    answer:
      "For a home consuming 1,000 kWh per month under 4.5 peak sun hours per day and a 78% planning performance factor, the target array size is approximately 9.50 kW DC. Using modern 400-Watt modules, the planning estimate is approximately 24 panels (yielding a 9.60 kW DC installed capacity).",
  },
  {
    question: "How many solar panels does it take to power a house?",
    answer:
      "There is no single panel count that fits every house. A home does not consume solar panels; it consumes kilowatt-hours of electrical energy. A compact, energy-efficient home might require 10 to 14 panels, while a large home with central electric heat pumps, swimming pool equipment, and electric vehicles can require 30 to 45 panels or more. Sizing depends strictly on utility kWh usage, regional sun hours, and panel efficiency.",
  },
  {
    question: "Does a bigger house need more solar panels?",
    answer:
      "Not necessarily. Square footage does not consume electricity; electrical appliances, heating, cooling, and occupants do. A 3,500-square-foot home with natural gas heating and high-efficiency appliances may use far less electricity (and therefore need fewer solar panels) than a 1,800-square-foot all-electric home running baseboard resistance heaters, a hot tub, and daily EV charging.",
  },
  {
    question: "Do higher-wattage solar panels reduce the number of panels needed?",
    answer:
      "Yes. Because system capacity is measured in total kilowatts, installing higher-wattage modules allows you to reach your target array capacity with fewer physical units. For instance, an 8.55 kW DC system requires approximately 25 older 350-Watt panels, 22 modern 400-Watt panels, or 19 high-output 450-Watt panels. Higher wattage is particularly helpful on roofs with limited unshaded surface area.",
  },
  {
    question: "How much roof space do solar panels need?",
    answer:
      "A typical modern 400-Watt residential photovoltaic module occupies an illustrative surface area of approximately 21 square feet (roughly 68 inches long by 44 inches wide). An array of 22 panels has an illustrative module surface area of roughly 462 square feet. This illustrative estimate does not model local fire setbacks, access pathways, roof obstructions, structural constraints, or jurisdiction-specific requirements.",
  },
  {
    question: "Can solar panels completely eliminate my electric bill?",
    answer:
      "A solar array sized for 100% annual energy offset can eliminate most or all of your volumetric energy charges under favorable 1:1 net metering tariffs. However, most utility companies still charge monthly fixed customer service fees, grid connection charges, and non-bypassable infrastructure fees regardless of how much solar electricity you generate.",
  },
];

export default function HowManySolarPanelsDoINeedPage() {
  const articleSchema = generateArticleSchema({
    headline: "How Many Solar Panels Do I Need to Power My House?",
    description:
      "Learn how to estimate how many solar panels your home needs using electricity usage, peak sun hours, system performance, and panel wattage. Includes examples and a free solar sizing calculator.",
    url: "https://calcmypower.com/how-many-solar-panels-do-i-need",
    datePublished: "2026-10-01T00:00:00Z",
    dateModified: "2026-10-01T00:00:00Z",
    images: [
      "https://calcmypower.com/images/articles/how-many-solar-panels-do-i-need.webp",
    ],
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Guides", url: "https://calcmypower.com/calculators" },
    {
      name: "How Many Solar Panels Do I Need?",
      url: "https://calcmypower.com/how-many-solar-panels-do-i-need",
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
            How Many Solar Panels Do I Need?
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
                <span className="text-slate-500">Published October 2026</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                How Many Solar Panels Do I Need to Power My House?
              </h1>

              <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-normal">
                Determine the realistic number of solar panels required to offset your home electricity usage. Learn the complete calculation chain from monthly kilowatt-hours to peak sun hours, balance-of-system losses, panel wattage ratings, and available roof space.
              </p>
            </header>

            {/* Featured Visual Asset with Click-to-Zoom */}
            <div className="space-y-3">
              <ZoomableArticleImage
                src="/images/articles/how-many-solar-panels-do-i-need.webp"
                alt="American single-family home with rooftop solar panel array, utility bill, and layout clipboard."
                title="Residential Solar PV Planning & Sizing"
                caption="Figure 1: Sizing a rooftop solar photovoltaic system requires matching actual kilowatt-hour consumption from utility bills with regional peak sun hours, system derating, and module wattage."
              >
                <Image
                  src="/images/articles/how-many-solar-panels-do-i-need.webp"
                  alt="American single-family home with rooftop solar panel array, utility bill, and layout clipboard."
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                />
              </ZoomableArticleImage>
            </div>

            {/* QUICK ANSWER / AEO BLOCK 1 */}
            <section id="quick-answer" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Quick Answer: How Many Panels Do You Need?
                </h2>
              </div>

              {/* AEO Direct-Answer Block 1 */}
              <div className="p-6 rounded-2xl bg-blue-50/80 border border-blue-200/90 space-y-3">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                  <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>How many solar panels does an average home need?</span>
                </div>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                  Under standard planning assumptions, an average American single-family household consuming <strong>900 kWh per month</strong> in an area with <strong>4.5 peak sun hours per day</strong> needs approximately <strong>22 modern 400-Watt panels</strong> (an <strong>8.55 kW DC array</strong>) to offset 100% of its electricity consumption. Across different home sizes, climates, and electricity habits, typical residential installations range between <strong>14 and 28 panels</strong>.
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                When homeowners ask how many solar panels they need, they often expect a simple number based on house square footage. In practice, square footage does not consume electricity; air conditioners, water heaters, kitchen appliances, and lifestyle habits do. Two identical 2,500-square-foot homes on the same street can have drastically different power requirements. One home using natural gas for heating and water might consume 600 kWh per month, while an all-electric home with twin air conditioning compressors, a heated swimming pool, and an electric vehicle can easily use 2,000 kWh per month.
              </p>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                To determine your specific panel count, you need a transparent calculation method based on your recent utility bills, your local solar climate, and the power output of the panels you select.
              </p>
            </section>

            {/* SECTION 1: Typical Needs Table */}
            <section id="typical-needs" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  How Many Solar Panels Does a House Usually Need?
                </h2>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Because electricity consumption and solar insolation vary across the United States, there is no universal panel count. The table below presents illustrative estimates for common household consumption tiers.
              </p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="font-semibold text-slate-800">Baseline Planning Assumptions for Table:</div>
                <div>• Solar Offset: 100% of monthly electricity consumption</div>
                <div>• Solar Resource: 4.5 peak sun hours per day (contiguous U.S. annual baseline reference)</div>
                <div>• Planning Performance Factor: 78% (accounting for thermal losses, inverter efficiency, and wiring resistance)</div>
                <div>• Panel Wattage: 400 Watts per module (modern residential standard)</div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-100/80 text-slate-800 font-bold">
                      <th className="py-3 px-3">Monthly Usage</th>
                      <th className="py-3 px-3">Daily Energy</th>
                      <th className="py-3 px-3">Planning System Size</th>
                      <th className="py-3 px-3">Approx. Panels (400W)</th>
                      <th className="py-3 px-3">Installed Rating</th>
                      <th className="py-3 px-3">Illustrative Module Area</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-semibold text-slate-900">500 kWh / mo</td>
                      <td className="py-3 px-3 font-mono text-slate-700">16.7 kWh/d</td>
                      <td className="py-3 px-3 font-mono text-slate-700">4.75 kW DC</td>
                      <td className="py-3 px-3 font-bold text-blue-700">~12 panels</td>
                      <td className="py-3 px-3 font-mono text-slate-700">4.80 kW DC</td>
                      <td className="py-3 px-3 text-slate-600">~252 sq ft</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-semibold text-slate-900">700 kWh / mo</td>
                      <td className="py-3 px-3 font-mono text-slate-700">23.3 kWh/d</td>
                      <td className="py-3 px-3 font-mono text-slate-700">6.65 kW DC</td>
                      <td className="py-3 px-3 font-bold text-blue-700">~17 panels</td>
                      <td className="py-3 px-3 font-mono text-slate-700">6.80 kW DC</td>
                      <td className="py-3 px-3 text-slate-600">~357 sq ft</td>
                    </tr>
                    <tr className="bg-blue-50/50 hover:bg-blue-50 font-medium">
                      <td className="py-3 px-3 font-bold text-blue-950">900 kWh / mo (U.S. Baseline)</td>
                      <td className="py-3 px-3 font-mono text-slate-800">30.0 kWh/d</td>
                      <td className="py-3 px-3 font-mono text-blue-800 font-bold">8.55 kW DC</td>
                      <td className="py-3 px-3 font-black text-blue-900 text-base">~22 panels</td>
                      <td className="py-3 px-3 font-mono text-slate-800">8.80 kW DC</td>
                      <td className="py-3 px-3 text-slate-700">~462 sq ft</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-semibold text-slate-900">1,000 kWh / mo</td>
                      <td className="py-3 px-3 font-mono text-slate-700">33.3 kWh/d</td>
                      <td className="py-3 px-3 font-mono text-slate-700">9.50 kW DC</td>
                      <td className="py-3 px-3 font-bold text-blue-700">~24 panels</td>
                      <td className="py-3 px-3 font-mono text-slate-700">9.60 kW DC</td>
                      <td className="py-3 px-3 text-slate-600">~504 sq ft</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-semibold text-slate-900">1,200 kWh / mo</td>
                      <td className="py-3 px-3 font-mono text-slate-700">40.0 kWh/d</td>
                      <td className="py-3 px-3 font-mono text-slate-700">11.40 kW DC</td>
                      <td className="py-3 px-3 font-bold text-blue-700">~29 panels</td>
                      <td className="py-3 px-3 font-mono text-slate-700">11.60 kW DC</td>
                      <td className="py-3 px-3 text-slate-600">~609 sq ft</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-semibold text-slate-900">1,500 kWh / mo</td>
                      <td className="py-3 px-3 font-mono text-slate-700">50.0 kWh/d</td>
                      <td className="py-3 px-3 font-mono text-slate-700">14.25 kW DC</td>
                      <td className="py-3 px-3 font-bold text-blue-700">~36 panels</td>
                      <td className="py-3 px-3 font-mono text-slate-700">14.40 kW DC</td>
                      <td className="py-3 px-3 text-slate-600">~756 sq ft</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-semibold text-slate-900">2,000 kWh / mo</td>
                      <td className="py-3 px-3 font-mono text-slate-700">66.7 kWh/d</td>
                      <td className="py-3 px-3 font-mono text-slate-700">19.00 kW DC</td>
                      <td className="py-3 font-bold text-blue-700 px-3">~48 panels</td>
                      <td className="py-3 px-3 font-mono text-slate-700">19.20 kW DC</td>
                      <td className="py-3 px-3 text-slate-600">~1,008 sq ft</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-slate-500 italic">
                Note: Values shown in this table are illustrative estimates calculated using transparent mathematical baselines. This illustrative estimate does not model local fire setbacks, access pathways, roof obstructions, structural constraints, or jurisdiction-specific requirements.
              </p>
            </section>

            {/* SECTION 2: Determining Factors */}
            <section id="determining-factors" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  What Determines How Many Solar Panels You Need?
                </h2>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Sizing a residential photovoltaic array is governed by six core engineering and environmental variables. Understanding how these factors interact allows you to evaluate solar proposals objectively.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Zap className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>1. Electricity Consumption</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Your electricity usage in kilowatt-hours (kWh) over a full 12-month period is the primary foundation of system sizing. Annual review is crucial because seasonal heating and cooling cause significant month-to-month swings. If you need to estimate your usage from individual appliances, see our step-by-step guide on{" "}
                    <Link
                      href="/how-to-calculate-electricity-usage"
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      how to calculate electricity usage
                    </Link>.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Sun className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>2. Peak Sun Hours (Solar Resource)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Peak sun hours measure the intensity and duration of sunlight normalized to 1,000 Watts per square meter. A home in Arizona receiving 6.0 PSH requires fewer panels to generate the same energy as an identical home in Michigan receiving 3.8 PSH.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Sliders className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>3. Target Solar Offset Percentage</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Homeowners can choose whether they want to offset 100% of their annual utility bill or a smaller percentage (such as 70% or 80%) based on budget, roof space limits, or utility net energy metering rules.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Activity className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>4. Planning Performance Factor</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Solar panels lose efficiency in real-world conditions due to elevated cell temperatures, inverter DC-to-AC conversion, wire resistance, and module dust. Derating accounts for these inevitable balance-of-system losses.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Layers className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>5. Solar Panel Rated Wattage</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    The rated power of individual panels determines how many units make up the required array size. Using 450W panels requires fewer physical modules than 350W panels to produce the same total array output.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Maximize2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>6. Roof Orientation &amp; Shading</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Roof planes facing south or west receive optimal solar irradiance in the Northern Hemisphere. Trees, chimneys, dormers, and steep roof pitches can diminish energy capture, requiring design adjustments.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 3: Step-by-Step Calculation Chain */}
            <section id="calculation-steps" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  How to Calculate How Many Solar Panels You Need
                </h2>
              </div>

              {/* AEO Direct-Answer Block 2 */}
              <div className="p-6 rounded-2xl bg-blue-50/80 border border-blue-200/90 space-y-3">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                  <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>What is the formula to calculate the number of solar panels?</span>
                </div>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                  To calculate how many solar panels you need, divide your target daily solar energy by your daily solar harvest factor to get array size in kilowatts, then divide total array wattage by individual panel wattage:
                </p>
                <div className="p-3 bg-white rounded-xl border border-blue-200 font-mono text-xs sm:text-sm text-slate-900 space-y-1">
                  <div>1. Daily kWh = Monthly kWh ÷ 30</div>
                  <div>2. Target Daily Solar = Daily kWh × (Solar Offset % ÷ 100)</div>
                  <div>3. Required PV Array (kW DC) = Target Daily Solar ÷ (Peak Sun Hours × Planning Factor)</div>
                  <div>4. Approximate Panels = Math.ceil(Array Watts ÷ Panel Wattage)</div>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Here is the complete eight-step calculation chain used by professional preliminary planning models:
              </p>

              <div className="space-y-4 text-sm sm:text-base text-slate-700">
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-900">Step 1: Find Your Monthly Electricity Consumption</div>
                  <p className="text-slate-600 text-xs sm:text-sm">
                    Gather your electric utility statements from the past 12 months. Sum the total kilowatt-hours (kWh) consumed over the year and divide by 12 to find your true monthly average. If your annual usage is 10,800 kWh, your average monthly consumption is 900 kWh.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-900">Step 2: Convert Monthly Usage to Daily Energy Demand</div>
                  <p className="text-slate-600 text-xs sm:text-sm">
                    Divide your monthly consumption by 30 days (the standard utility billing cycle divisor):
                  </p>
                  <p className="font-mono text-xs bg-slate-50 p-2 rounded text-slate-800">
                    Daily Demand (kWh/day) = Monthly kWh ÷ 30 = 900 ÷ 30 = 30.00 kWh/day
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-900">Step 3: Choose Your Target Solar Offset Fraction</div>
                  <p className="text-slate-600 text-xs sm:text-sm">
                    Decide what portion of your electricity you want your solar array to generate. A 100% offset targets zero net grid energy over the year. Multiply your daily demand by your offset fraction:
                  </p>
                  <p className="font-mono text-xs bg-slate-50 p-2 rounded text-slate-800">
                    Target Daily Solar (kWh/day) = Daily Demand × (Offset % ÷ 100) = 30.00 × 1.00 = 30.00 kWh/day
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-900">Step 4: Identify Your Location Peak Sun Hours (PSH)</div>
                  <p className="text-slate-600 text-xs sm:text-sm">
                    Look up the annualized daily peak sun hours for your geographic region from public databases like the National Solar Radiation Database (NSRDB). Across the continental United States, annualized values typically range from 3.5 PSH in the cloudy North to 6.0+ PSH in the Southwest. The U.S. national planning average is approximately 4.5 PSH.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-900">Step 5: Apply the Planning Performance Factor</div>
                  <p className="text-slate-600 text-xs sm:text-sm">
                    Solar panels do not operate under ideal laboratory test conditions on a hot roof. Real-world systems experience balance-of-system losses from elevated cell temperatures (8% to 14%), inverter DC-to-AC conversion (3% to 5%), conductor electrical resistance (1% to 2%), and atmospheric dust or soiling (2% to 4%).
                  </p>
                  <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded border border-slate-200">
                    CalcMyPower uses 78% as an illustrative planning performance factor for this simplified estimate. Actual PV system performance varies with solar resource, tilt, azimuth, shading, soiling, temperature, wiring, inverter behavior, and other site-specific conditions.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-900">Step 6: Calculate Required PV Array Nameplate Size</div>
                  <p className="text-slate-600 text-xs sm:text-sm">
                    Multiply peak sun hours by the planning performance factor to determine the daily energy yield per kilowatt of installed solar. Then divide target daily solar energy by this yield factor:
                  </p>
                  <p className="font-mono text-xs bg-slate-50 p-2 rounded text-slate-800">
                    Daily Yield Factor = 4.5 PSH × 0.78 = 3.51 kWh / kW / day<br />
                    Required System Size = 30.00 kWh/day ÷ 3.51 = 8.547 kW DC (8,547 Watts)
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-900">Step 7: Divide Array Wattage by Panel Rated Power</div>
                  <p className="text-slate-600 text-xs sm:text-sm">
                    Divide total required array wattage by the nameplate wattage of the solar panels you plan to install (for example, standard 400-Watt modules):
                  </p>
                  <p className="font-mono text-xs bg-slate-50 p-2 rounded text-slate-800">
                    Raw Panel Count = 8,547 Watts ÷ 400 Watts = 21.37 panels
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-900">Step 8: Round Upward to the Nearest Whole Panel</div>
                  <p className="text-slate-600 text-xs sm:text-sm">
                    Because physical solar panels cannot be installed as fractions, always round up to the nearest whole integer. Rounding 21.37 upward yields <strong>22 panels</strong>. Multiplying 22 panels by 400 Watts produces an actual installed capacity of <strong>8.80 kW DC</strong>, providing a comfortable margin above the exact baseline target.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4: Worked Example (900 kWh/mo) */}
            <section id="worked-example-900" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Worked Example: Sizing an Array for 900 kWh/Month
                </h2>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Home className="w-4 h-4 text-blue-600" />
                  <span>Scenario: Standard U.S. Single-Family Residence</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  A homeowner reviews their utility statements and discovers their household consumed 10,800 kWh over the past 12 months, averaging exactly 900 kWh per month. The home is located in an area receiving an average of 4.5 peak sun hours per day. The homeowner wants to offset 100% of their utility electricity using modern 400-Watt monocrystalline panels.
                </p>

                <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-2 font-mono">
                  <div className="text-slate-500 font-sans font-semibold text-xs uppercase tracking-wider">Step-by-Step Mathematical Sizing:</div>
                  <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-600">Daily Demand (900 ÷ 30):</span>
                    <span className="font-bold text-slate-900">30.00 kWh / day</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-600">Target Solar Offset (100%):</span>
                    <span className="font-bold text-blue-700">30.00 kWh / day</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-600">Solar Resource &amp; Losses:</span>
                    <span className="font-bold text-slate-900">4.5 PSH × 78% = 3.51 kWh/kW/day</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-600">Required PV Array Size:</span>
                    <span className="font-bold text-slate-900">30.00 ÷ 3.51 = 8.547 kW DC (8,547 W)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-600">Raw Panel Calculation:</span>
                    <span className="font-bold text-slate-900">8,547 W ÷ 400 W = 21.37 modules</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-600">Planning Panel Count:</span>
                    <span className="font-bold text-blue-700">Math.ceil(21.37) = ~22 panels</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-600">Installed Array Rating:</span>
                    <span className="font-bold text-slate-900">22 × 400 W = 8.80 kW DC</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-600">Illustrative Module Area:</span>
                    <span className="font-bold text-slate-900">22 × 21 sq ft ≈ 462 sq ft</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  <strong>Conclusion:</strong> Under these assumptions, the planning estimate is approximately 22 400W panels. This array provides an illustrative module surface area of approximately 462 square feet. This illustrative estimate does not model local fire setbacks, access pathways, roof obstructions, structural constraints, or jurisdiction-specific requirements.
                </p>
              </div>
            </section>

            {/* SECTION 5: Example for 500 kWh/mo */}
            <section id="example-500-kwh" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  How Many Solar Panels Do I Need for 500 kWh Per Month?
                </h2>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                A consumption level of 500 kWh per month is typical for energy-efficient homes, compact single-family residences, townhouses, or households located in temperate climates that rely minimally on electric air conditioning.
              </p>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="font-bold text-slate-900 text-sm">Calculation for 500 kWh/Month:</div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc pl-5">
                  <li><strong>Daily Demand:</strong> 500 kWh ÷ 30 days = 16.67 kWh per day</li>
                  <li><strong>Target Solar (100%):</strong> 16.67 kWh per day</li>
                  <li><strong>Daily Yield:</strong> 4.5 PSH × 0.78 planning factor = 3.51 kWh per kW per day</li>
                  <li><strong>Required Array Size:</strong> 16.67 kWh ÷ 3.51 = <strong>4.749 kW DC (4,749 Watts)</strong></li>
                  <li><strong>Raw Panel Count (400W):</strong> 4,749 W ÷ 400 W = 11.87 modules</li>
                  <li><strong>Planning Panel Count:</strong> Math.ceil(11.87) = <strong>~12 panels</strong></li>
                  <li><strong>Installed Nameplate Capacity:</strong> 12 × 400 W = <strong>4.80 kW DC</strong></li>
                  <li><strong>Illustrative Module Area:</strong> 12 × 21 sq ft ≈ <strong>252 sq ft</strong></li>
                </ul>
                <p className="text-xs text-slate-600 italic border-t border-slate-100 pt-2">
                  Under these assumptions, a home consuming 500 kWh per month requires an illustrative planning estimate of approximately 12 400-Watt panels occupying roughly 252 square feet of module surface area.
                </p>
              </div>
            </section>

            {/* SECTION 6: Example for 1,000 kWh/mo */}
            <section id="example-1000-kwh" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  How Many Solar Panels Do I Need for 1,000 kWh Per Month?
                </h2>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                A consumption level of 1,000 kWh per month is representative of medium-to-large suburban American homes with central air conditioning, family laundry loads, and electric water heating.
              </p>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="font-bold text-slate-900 text-sm">Calculation for 1,000 kWh/Month:</div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc pl-5">
                  <li><strong>Daily Demand:</strong> 1,000 kWh ÷ 30 days = 33.33 kWh per day</li>
                  <li><strong>Target Solar (100%):</strong> 33.33 kWh per day</li>
                  <li><strong>Daily Yield:</strong> 4.5 PSH × 0.78 planning factor = 3.51 kWh per kW per day</li>
                  <li><strong>Required Array Size:</strong> 33.33 kWh ÷ 3.51 = <strong>9.497 kW DC (9,497 Watts)</strong></li>
                  <li><strong>Raw Panel Count (400W):</strong> 9,497 W ÷ 400 W = 23.74 modules</li>
                  <li><strong>Planning Panel Count:</strong> Math.ceil(23.74) = <strong>~24 panels</strong></li>
                  <li><strong>Installed Nameplate Capacity:</strong> 24 × 400 W = <strong>9.60 kW DC</strong></li>
                  <li><strong>Illustrative Module Area:</strong> 24 × 21 sq ft ≈ <strong>504 sq ft</strong></li>
                </ul>
                <p className="text-xs text-slate-600 italic border-t border-slate-100 pt-2">
                  Under these assumptions, a home consuming 1,000 kWh per month requires an illustrative planning estimate of approximately 24 400-Watt panels occupying roughly 504 square feet of module surface area.
                </p>
              </div>
            </section>

            {/* SECTION 7: Panel Wattage Comparison */}
            <section id="panel-wattage-impact" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Does Panel Wattage Change the Number of Panels Needed?
                </h2>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Yes. Because solar systems are sized based on total electrical power (kilowatts), the rated wattage of each individual panel directly dictates the physical module count needed to achieve that target capacity.
              </p>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Modern residential panels range from 350 Watts to 500 Watts. Installing higher-wattage panels allows you to generate identical system power using fewer total physical units on your roof. This is particularly advantageous for homes with dormers, skylights, plumbing vents, or limited south-facing roof planes.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-100/80 text-slate-800 font-bold">
                      <th className="py-2.5 px-3">Panel Rating</th>
                      <th className="py-2.5 px-3">Target Array</th>
                      <th className="py-2.5 px-3">Exact Ratio</th>
                      <th className="py-2.5 px-3">Approx. Panels</th>
                      <th className="py-2.5 px-3">Installed Array</th>
                      <th className="py-2.5 px-3">Illustrative Module Area</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-semibold text-slate-900">350 Watts (Compact / Older)</td>
                      <td className="py-2.5 px-3 font-mono text-slate-700">8.55 kW DC</td>
                      <td className="py-2.5 px-3 font-mono text-slate-600">24.4 modules</td>
                      <td className="py-2.5 px-3 font-bold text-slate-900">~25 panels</td>
                      <td className="py-2.5 px-3 font-mono text-slate-700">8.75 kW DC</td>
                      <td className="py-2.5 px-3 text-slate-600">~525 sq ft</td>
                    </tr>
                    <tr className="bg-blue-50/50 hover:bg-blue-50 font-medium">
                      <td className="py-2.5 px-3 font-bold text-blue-950">400 Watts (Modern Standard)</td>
                      <td className="py-2.5 px-3 font-mono text-slate-800">8.55 kW DC</td>
                      <td className="py-2.5 px-3 font-mono text-slate-700">21.4 modules</td>
                      <td className="py-2.5 px-3 font-black text-blue-900">~22 panels</td>
                      <td className="py-2.5 px-3 font-mono text-slate-800">8.80 kW DC</td>
                      <td className="py-2.5 px-3 text-slate-700">~462 sq ft</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-semibold text-slate-900">450 Watts (High-Output Tier)</td>
                      <td className="py-2.5 px-3 font-mono text-slate-700">8.55 kW DC</td>
                      <td className="py-2.5 px-3 font-mono text-slate-600">19.0 modules</td>
                      <td className="py-2.5 px-3 font-bold text-slate-900">~19 panels</td>
                      <td className="py-2.5 px-3 font-mono text-slate-700">8.55 kW DC</td>
                      <td className="py-2.5 px-3 text-slate-600">~399 sq ft</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-semibold text-slate-900">500 Watts (Commercial / Premium)</td>
                      <td className="py-2.5 px-3 font-mono text-slate-700">8.55 kW DC</td>
                      <td className="py-2.5 px-3 font-mono text-slate-600">17.1 modules</td>
                      <td className="py-2.5 px-3 font-bold text-slate-900">~18 panels</td>
                      <td className="py-2.5 px-3 font-mono text-slate-700">9.00 kW DC</td>
                      <td className="py-2.5 px-3 text-slate-600">~378 sq ft</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
                <div className="font-semibold text-slate-800">Does higher wattage always mean a better system?</div>
                <p>
                  Not necessarily. Higher-wattage modules are often physically larger (using 72 full cells or 144 half-cells instead of standard 54/108-cell formats) and may carry a higher price per Watt. In addition, physical dimensions must match your specific roof plane layout. Working with standard 400W modules frequently offers the best balance of cost, ease of handling, and spatial layout flexibility for residential rooftops.
                </p>
              </div>
            </section>

            {/* SECTION 8: Roof Size Constraints */}
            <section id="roof-size-constraints" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Does Roof Size Determine How Many Solar Panels You Need?
                </h2>
              </div>

              {/* AEO Direct-Answer Block 3 */}
              <div className="p-6 rounded-2xl bg-blue-50/80 border border-blue-200/90 space-y-3">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                  <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Does a bigger house need more solar panels?</span>
                </div>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                  No. Roof size and home square footage do not determine your electricity requirement. Your electricity consumption determines how many panels you need, while your available unshaded roof space determines whether that required array can physically fit. A small home with an electric heat pump and EV charger may need more solar panels than a sprawling home with efficient natural gas appliances.
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                When evaluating your roof for solar feasibility, professional installers distinguish between gross roof area and usable roof surface. Several real-world physical constraints reduce how much roof area can host solar modules:
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900">Roof Obstructions:</span>
                  <p className="text-slate-600">Plumbing soil vents, attic exhaust fans, combustion flues, chimneys, and satellite dishes fragment contiguous roof planes. Installers must lay out solar arrays around these penetration points.</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900">Local Access Margins &amp; Setbacks:</span>
                  <p className="text-slate-600">Local building codes specify clear access pathways along roof ridges, hips, and valleys to allow emergency ventilation and safe access. These margins vary by jurisdiction, roof geometry, and local building requirements.</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900">Structural Rafter Capacity:</span>
                  <p className="text-slate-600">Photovoltaic modules, mounting rails, and hardware add approximately 2.8 to 4.0 pounds per square foot of dead load. Older homes or lightweight truss systems may require structural evaluation before equipment is mounted.</p>
                </div>
              </div>

              <p className="text-xs text-slate-500 italic">
                This illustrative estimate does not model local fire setbacks, access pathways, roof obstructions, structural constraints, or jurisdiction-specific requirements.
              </p>
            </section>

            {/* SECTION 9: Shading and Roof Direction */}
            <section id="shading-orientation" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  What About Shading, Roof Pitch, and Compass Direction?
                </h2>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                The orientation and slope of your roof planes directly govern the amount of solar insolation your panels absorb throughout the year:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">South-Facing Roofs</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    In the Northern Hemisphere, true south-facing roof planes (180° compass azimuth) maximize total annual kilowatt-hour production. They receive direct sunlight throughout peak solar noon hours.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">West-Facing Roofs</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    West-facing planes generate slightly less annual energy than south-facing arrays, but peak during late afternoon hours. Under time-of-use utility rates, afternoon production can be financially valuable.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">East-Facing Roofs</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    East-facing planes capture early morning sunlight, offsetting morning breakfast and heating routines before tapering off during the heat of the afternoon.
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Roof pitch also influences harvest efficiency. For maximum annual production, optimal tilt roughly matches your geographical latitude. You can use our dedicated{" "}
                <Link
                  href="/solar-panel-tilt-calculator"
                  className="text-blue-600 font-semibold underline hover:text-blue-800"
                >
                  Solar Panel Tilt Angle Calculator
                </Link>{" "}
                to check optimal angles for your specific location.
              </p>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Partial shading from tall trees or neighboring buildings reduces output significantly. Modern module electronics such as microinverters or DC power optimizers isolate shaded panels so that one shadowed module does not pull down the entire array string. If you want to understand how panel strings interact electrically, read our comprehensive guide on{" "}
                <Link
                  href="/solar-panels-series-vs-parallel"
                  className="text-blue-600 font-semibold underline hover:text-blue-800"
                >
                  Solar Panels in Series vs. Parallel
                </Link>.
              </p>
            </section>

            {/* SECTION 10: Sizing Estimate Accuracy */}
            <section id="estimate-accuracy" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  How Accurate Is a Solar Panel Count Estimate?
                </h2>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                An online calculation provides a transparent mathematical baseline to establish preliminary sizing budgets. However, turning a preliminary estimate into a physical installation requires professional on-site engineering verification:
              </p>

              <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-slate-700">
                <li>
                  <strong>Physical Shading Analysis:</strong> On-site tools or high-resolution LIDAR aerial data quantify shading losses from nearby tree canopies and parapet walls.
                </li>
                <li>
                  <strong>Electrical Service Panel Capacity:</strong> National electrical codes govern the maximum solar backfeed permitted on your home main service panel busbar (such as the 120% rule in NEC Section 705.12). Some homes require a service panel upgrade before installing a large solar array.
                </li>
                <li>
                  <strong>Conductor Sizing and Line Losses:</strong> Long wiring runs from rooftop arrays down to service equipment require proper wire gauge sizing to keep resistive voltage drop under 2% to 3%. You can calculate conductor requirements with our{" "}
                  <Link
                    href="/voltage-drop-calculator"
                    className="text-blue-600 font-semibold underline hover:text-blue-800"
                  >
                    Voltage Drop Calculator
                  </Link>.
                </li>
                <li>
                  <strong>Utility Interconnection and Net Metering:</strong> Local utility rules determine whether excess solar generated during midday is credited at full retail value (traditional net metering) or reduced wholesale avoided-cost rates (net billing).
                </li>
              </ul>
            </section>

            {/* SECTION 11: Calculator CTA Card */}
            <section id="calculator-cta" className="space-y-6 scroll-mt-24">
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-900 to-slate-900 text-white shadow-lg space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Free Interactive Sizing Tool</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Calculate Your Home Solar System Size Now
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  If you want to run your own numbers, use the CalcMyPower Solar System Size Calculator. Enter your monthly electricity use, peak sun hours, planning performance factor, solar offset, and panel wattage to estimate the required PV array and approximate panel count.
                </p>

                <div className="pt-2">
                  <Link
                    href="/solar-system-size-calculator"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base transition shadow-md hover:shadow-lg"
                  >
                    <span>Launch Solar System Size Calculator</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 12: Related Sizing Tools */}
            <section id="related-tools" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Related Power &amp; Energy Sizing Tools
                </h2>
              </div>

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
                    Calculate required solar PV array size in kW, panel count, and illustrative module area based on monthly electricity usage.
                  </p>
                </Link>

                <Link
                  href="/solar-battery-calculator"
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-2"
                >
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                    <Zap className="w-4 h-4" />
                    <span>Solar Battery Sizing Calculator</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Size off-grid and backup battery storage capacity in Amp-hours and Watt-hours for night storage and outage resilience.
                  </p>
                </Link>

                <Link
                  href="/solar-charge-controller-calculator"
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-2"
                >
                  <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
                    <Sliders className="w-4 h-4" />
                    <span>Solar Charge Controller Calculator</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Determine MPPT and PWM controller amperage ratings and check cold-weather open-circuit voltage margins.
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
                    Calculate voltage drop and verify conductor wire gauge for DC array homeruns and AC branch circuits.
                  </p>
                </Link>

                <Link
                  href="/solar-panels-series-vs-parallel"
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-2"
                >
                  <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                    <GitBranch className="w-4 h-4" />
                    <span>Solar Panels Series vs. Parallel Guide</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Learn how series and parallel panel wiring configurations alter circuit voltage, current, wire size, and shading behavior.
                  </p>
                </Link>

                <Link
                  href="/how-much-energy-does-a-solar-panel-produce"
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-2"
                >
                  <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
                    <Sun className="w-4 h-4" />
                    <span>How Much Energy Does a Solar Panel Produce?</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Explore daily, monthly, and annual energy output benchmarks for 400W panels with peak sun hours and system losses.
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
                This guide and its calculation models provide preliminary educational estimates based on user-entered utility consumption data and standard solar irradiance baselines. It does not constitute formal engineering design, structural roof certification, or definitive energy generation forecasts.
              </p>
              <p>
                Actual rooftop photovoltaic production depends on roof compass azimuth, pitch, local shading obstructions, inverter clipping, electrical panel busbar limitations, and utility interconnection rules. Working with high-voltage direct current and utility electrical panels involves risks of shock and fire hazard. Always consult a qualified licensed solar contractor or professional electrical engineer to verify physical equipment sizing and local code compliance prior to purchasing or installing solar equipment.
              </p>
            </div>
          </article>

          {/* Desktop Sticky Sidebar (4 cols on lg) */}
          <aside className="hidden lg:block lg:col-span-4">
            <TableOfContents items={TOC_ITEMS} />
          </aside>
        </div>
      </div>
    </>
  );
}
