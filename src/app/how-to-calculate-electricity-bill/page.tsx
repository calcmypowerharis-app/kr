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
  SlidersHorizontal,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  Layers,
  DollarSign,
  FileText,
  Calculator,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How to Calculate Your Electricity Bill: kWh, Rates, and Charges",
  description:
    "Learn how to calculate your electric utility bill from meter reading to final balance. Understand supply vs delivery rates, fixed fees, riders, and effective kWh cost.",
  alternates: {
    canonical: "https://calcmypower.com/how-to-calculate-electricity-bill",
  },
  openGraph: {
    title:
      "How to Calculate Your Electricity Bill: kWh, Rates, and Charges | CalcMyPower",
    description:
      "Learn how to calculate your electric utility bill from meter reading to final balance. Understand supply vs delivery rates, fixed fees, riders, and effective kWh cost.",
    url: "https://calcmypower.com/how-to-calculate-electricity-bill",
    type: "article",
    images: [
      {
        url: "https://calcmypower.com/images/articles/how-to-calculate-electricity-bill.webp",
        width: 1200,
        height: 675,
        alt: "Technical infographic breaking down electric utility bill calculation line items, supply vs delivery, and effective kilowatt-hour rate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "How to Calculate Your Electricity Bill: kWh, Rates, and Charges | CalcMyPower",
    description:
      "Learn how to calculate your electric utility bill from meter reading to final balance. Understand supply vs delivery rates, fixed fees, riders, and effective kWh cost.",
    images: [
      "https://calcmypower.com/images/articles/how-to-calculate-electricity-bill.webp",
    ],
  },
};

const TOC_ITEMS: TocItem[] = [
  { id: "quick-summary", label: "Quick Summary: The Universal Bill Calculation" },
  { id: "meter-reading", label: "Reading Your Electric Meter & Determining Billed kWh" },
  { id: "supply-vs-delivery", label: "Supply vs. Delivery: Where Your Money Actually Goes" },
  { id: "fixed-customer-charges", label: "Fixed Customer Charges: The Grid Connection Fee" },
  { id: "riders-and-taxes", label: "Regulatory Riders, Mandates & Municipal Taxes" },
  { id: "rate-tariff-structures", label: "Tariff Structures: Flat, Tiered, and Time-of-Use" },
  { id: "worked-example-single-source", label: "Step-by-Step Worked Example (The 900 kWh Benchmark)" },
  { id: "effective-rate-calculation", label: "Why Your Effective $/kWh Is Higher Than Quoted Rates" },
  { id: "solar-and-efficiency-impact", label: "What Happens to Your Bill with Solar PV or Batteries?" },
  { id: "faq", label: "Frequently Asked Questions" },
];

const FAQ_DATA = [
  {
    question: "Why is my electric bill higher than the rate per kWh multiplied by my usage?",
    answer:
      "Electric utilities add fixed monthly customer charges, transmission and delivery tariffs, fuel cost adjustments, environmental compliance riders, and local taxes on top of your base energy rate. These mandatory line items ensure grid infrastructure reliability and can increase your total bill by 20% to 35% above the raw energy supply cost.",
  },
  {
    question: "How do I calculate my billed kilowatt-hours (kWh) from my meter?",
    answer:
      "Subtract your previous meter reading from your current meter reading. For example, if your previous reading was 42,150 kWh and your current reading is 43,050 kWh, your consumption for that billing cycle is 43,050 minus 42,150, which equals 900 kWh. If your meter has a billing multiplier (common on commercial three-phase services, but rare on residential single-phase homes), multiply the difference by that factor.",
  },
  {
    question: "What is the difference between supply charges and delivery charges?",
    answer:
      "Supply charges (generation) reflect the wholesale cost of creating electrical power at power plants, wind farms, or solar installations. Delivery charges (transmission and distribution) cover the physical network of high-voltage transmission lines, neighborhood transformers, utility poles, substations, and emergency line crews required to deliver that power to your home.",
  },
  {
    question: "What is an effective electricity rate, and how do I calculate it?",
    answer:
      "Your effective electricity rate is the true all-in cost per kilowatt-hour. You calculate it by dividing your total bill amount by your total billed kWh. For example, if your total monthly bill is $185.00 for 900 kWh of usage, your effective rate is $185.00 divided by 900 kWh, which equals $0.2056 per kWh (20.56 cents per kWh), even if your nominal base rate was only 16 cents.",
  },
  {
    question: "Does net metering eliminate all utility charges if I produce 100% solar power?",
    answer:
      "No. Even if your rooftop solar panels produce 100% of the kilowatt-hours you consume over a billing period, you remain connected to the electric utility grid for nighttime power and cloudy days. Most utilities charge a mandatory monthly fixed customer service fee (typically $10 to $25 per month) plus grid reliability fees that cannot be offset by solar energy credits.",
  },
  {
    question: "How do tiered or inverted block rate tariffs affect bill calculations?",
    answer:
      "In an inverted block tariff, kilowatt-hours are priced in blocks. For instance, Tier 1 baseline consumption (such as the first 400 kWh) might be billed at a lower rate (such as $0.14 per kWh), while all consumption exceeding 400 kWh enters Tier 2 and is billed at a higher rate (such as $0.21 per kWh) to incentivize energy conservation.",
  },
];

export default function HowToCalculateElectricityBillPage() {
  const articleSchema = generateArticleSchema({
    headline: "How to Calculate Your Electricity Bill: kWh, Rates, and Monthly Charges",
    description:
      "Learn how to calculate your electric utility bill from meter reading to final balance. Understand supply vs delivery rates, fixed fees, riders, and effective kWh cost.",
    url: "https://calcmypower.com/how-to-calculate-electricity-bill",
    datePublished: "2026-10-06",
    dateModified: "2026-10-06",
    images: [
      "https://calcmypower.com/images/articles/how-to-calculate-electricity-bill.webp",
    ],
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Calculators & Guides", url: "https://calcmypower.com/calculators" },
    {
      name: "How to Calculate Electricity Bill",
      url: "https://calcmypower.com/how-to-calculate-electricity-bill",
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
            How to Calculate Electricity Bill
          </span>
        </nav>

        {/* Two-Column Grid: Left Content, Right Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Article Content */}
          <div className="lg:col-span-8 min-w-0 space-y-10">
            {/* Header */}
            <header className="space-y-4 border-b border-slate-200 pb-8">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 font-semibold">
                  Utility Billing &amp; Energy Sizing Guide
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
                How to Calculate Your Electricity Bill: kWh, Rates, and Monthly Charges
              </h1>

              <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-normal">
                Opening an electric utility statement often feels like deciphering a secret code. Between generation supply charges, delivery tariffs, fixed customer meter fees, and regulatory riders, your final balance rarely matches the simple kilowatt-hour rate advertised by your power company. This guide breaks down every line item on a residential electric bill and teaches you how to calculate your true effective cost per kilowatt-hour.
              </p>
            </header>

            {/* Hero Image */}
            <div className="space-y-3">
              <ZoomableArticleImage
                src="/images/articles/how-to-calculate-electricity-bill.webp"
                alt="Technical infographic deconstructing residential electric utility bill line items, supply vs delivery, fixed meter charges, and effective rate"
                title="Electric Utility Bill Deconstruction Matrix"
                caption="Figure 1: Anatomy of a residential electric utility bill. Volumetric supply charges represent approximately 75% to 80% of total costs, while fixed charges, distribution tariffs, and taxes account for the remainder."
              >
                <Image
                  src="/images/articles/how-to-calculate-electricity-bill.webp"
                  alt="Technical infographic deconstructing residential electric utility bill line items, supply vs delivery, fixed meter charges, and effective rate"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                />
              </ZoomableArticleImage>
            </div>

            {/* Section 1: Quick Summary */}
            <section id="quick-summary" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Quick Summary: The Universal Bill Calculation
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Calculating your electricity bill requires summing two distinct categories of utility costs: variable volumetric charges that change with the amount of energy you consume, and fixed non-volumetric fees that remain constant regardless of consumption.
              </p>

              <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md space-y-4 border border-slate-800">
                <div className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-bold">
                  The Universal Electric Bill Formula
                </div>
                <div className="font-mono text-base sm:text-lg text-emerald-300 font-bold bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
                  Total Bill = (Billed kWh × Energy Rate) + Fixed Customer Fee + Delivery Riders + Taxes
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Where <span className="text-white font-semibold">Billed kWh</span> is your metered electricity volume, <span className="text-white font-semibold">Energy Rate</span> is your volumetric supply and transmission charge ($/kWh), <span className="text-white font-semibold">Fixed Customer Fee</span> is the flat monthly grid connection charge, and <span className="text-white font-semibold">Delivery Riders</span> represent regulatory and environmental programs.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200/80 text-blue-900 text-sm flex items-start gap-3">
                <Calculator className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Interactive Tool Available: </span>
                  Skip manual arithmetic by running your numbers through our{" "}
                  <Link
                    href="/electricity-cost-calculator"
                    className="font-bold underline hover:text-blue-700 transition"
                  >
                    Electricity Cost Calculator
                  </Link>
                  , which isolates supply charges, riders, and taxes automatically.
                </div>
              </div>
            </section>

            {/* Section 2: Meter Reading */}
            <section id="meter-reading" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Reading Your Electric Meter &amp; Determining Billed kWh
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Every calculation begins with billed volume. Your electric meter continuously measures the cumulative quantity of electrical work delivered to your service panel in kilowatt-hours (kWh). One kilowatt-hour equals 1,000 Watts of electrical power sustained for one continuous hour (or ten 100-Watt incandescent light bulbs operated simultaneously for 60 minutes).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Digital Smart Meters (AMI)</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Advanced Metering Infrastructure (AMI) smart meters transmit encrypted digital usage data via wireless mesh networks to the utility. The digital LCD screen cycles every few seconds between code 01 (current cumulative kWh reading) and code 02 (real-time instantaneous kilowatt power draw).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Analog Dial Meters</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Older electromechanical meters feature four or five rotating clock-like dials. You read the dials from left to right. When a pointer rests between two digits, always record the smaller number (unless it rests between 9 and 0, in which case record 9).
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
                <h4 className="font-bold text-slate-900 text-sm">
                  The Meter Consumption Math
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your utility determines billed energy by taking a beginning reading at the start of your service cycle and an ending reading at the close of the period:
                </p>
                <div className="bg-white p-3 rounded-lg border border-slate-200 font-mono text-xs text-slate-800 space-y-1">
                  <div>Previous Meter Reading (August 15):  42,150 kWh</div>
                  <div>Current Meter Reading (September 14):   43,050 kWh</div>
                  <div className="font-bold text-blue-600 pt-1 border-t border-slate-200">
                    Net Billed Consumption: 43,050 - 42,150 = 900 kWh
                  </div>
                </div>
                <p className="text-xs text-slate-500">
                  Always inspect whether your bill indicates an &quot;Actual&quot; or &quot;Estimated&quot; read. During severe winter storms or access issues, utilities may estimate usage based on historical weather algorithms, which can lead to unexpected catch-up adjustments on future statements.
                </p>
              </div>
            </section>

            {/* Section 3: Supply vs. Delivery */}
            <section id="supply-vs-delivery" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Supply vs. Delivery: Where Your Money Actually Goes
              </h2>
              <p className="text-slate-700 leading-relaxed">
                In deregulated electrical markets across the United States (including Texas, Pennsylvania, Ohio, Illinois, New York, and parts of New England), and even within vertically integrated regulated utility territories (like Florida, the Southeast, and California), electric statements separate charges into two distinct business functions: Generation Supply and Transmission/Distribution Delivery.
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                    <tr>
                      <th className="p-3 sm:p-4">Billing Category</th>
                      <th className="p-3 sm:p-4">What It Covers</th>
                      <th className="p-3 sm:p-4">Rate Structure</th>
                      <th className="p-3 sm:p-4">Can You Shop or Reduce It?</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-600">
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-slate-900">
                        Supply / Generation
                      </td>
                      <td className="p-3 sm:p-4">
                        Cost of producing raw electric energy at generation facilities (nuclear, natural gas, hydro, solar, wind).
                      </td>
                      <td className="p-3 sm:p-4 font-mono text-xs">
                        Volumetric ($/kWh)
                      </td>
                      <td className="p-3 sm:p-4 text-emerald-700 font-semibold">
                        Yes: Shop retail suppliers in deregulated states or conserve kWh.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-slate-900">
                        Transmission Delivery
                      </td>
                      <td className="p-3 sm:p-4">
                        High-voltage interstate power lines (regulated by the Federal Energy Regulatory Commission / FERC).
                      </td>
                      <td className="p-3 sm:p-4 font-mono text-xs">
                        Volumetric ($/kWh)
                      </td>
                      <td className="p-3 sm:p-4 text-slate-600">
                        No: Regulated monopoly fee tied to regional grid operator tariffs.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-slate-900">
                        Local Distribution
                      </td>
                      <td className="p-3 sm:p-4">
                        Local neighborhood utility poles, wires, transformers, substations, and storm response trucks.
                      </td>
                      <td className="p-3 sm:p-4 font-mono text-xs">
                        Volumetric + Fixed
                      </td>
                      <td className="p-3 sm:p-4 text-slate-600">
                        No: Regulated by your state Public Utility Commission (PUC).
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-slate-700 leading-relaxed text-sm">
                Understanding this split is critical when evaluating third-party energy marketing offers. An energy broker might offer an enticing supply rate of $0.09 per kWh. However, you will still pay your local electric distribution company an additional $0.07 to $0.10 per kWh for delivery, resulting in an actual energy cost of $0.16 to $0.19 per kWh before taxes and fixed charges.
              </p>
            </section>

            {/* Section 4: Fixed Customer Charges */}
            <section id="fixed-customer-charges" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Fixed Customer Charges: The Grid Connection Fee
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Even if you turn off every circuit breaker in your house, leave on a 30-day vacation, and consume zero kilowatt-hours of electricity, you will still receive a bill. That minimum charge is your fixed monthly customer charge (frequently labeled &quot;Basic Service Fee&quot;, &quot;Customer Availability Charge&quot;, or &quot;Monthly System Access Fee&quot;).
              </p>

              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 space-y-2 text-xs sm:text-sm text-amber-900">
                <div className="flex items-center gap-2 font-bold text-amber-950">
                  <ShieldAlert className="w-4 h-4 text-amber-700" />
                  <span>Why Utilities Charge Fixed Fees</span>
                </div>
                <p className="leading-relaxed">
                  Fixed customer charges cover the utility&apos;s capital expenses that exist regardless of energy throughput: physical meter hardware maintenance, computerized billing administration, 24/7 dispatch call centers, and standby capacity required to keep transformers energized.
                </p>
                <div className="pt-2 text-xs text-amber-800">
                  Typical U.S. residential fixed customer charges range from <span className="font-bold">$8.00 to $18.00 per month</span> for suburban municipal utilities, and up to <span className="font-bold">$25.00 to $35.00 per month</span> for rural electric cooperatives with extensive line mileage per meter.
                </div>
              </div>
            </section>

            {/* Section 5: Riders and Taxes */}
            <section id="riders-and-taxes" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Regulatory Riders, Mandates &amp; Municipal Taxes
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Between the basic energy rates and your final account balance lies an assortment of riders, surcharges, and municipal taxes. State Public Utility Commissions allow regulated monopolies to pass specific operational and environmental expenses directly to ratepayers:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                  <div className="font-bold text-slate-900 text-sm">
                    1. Fuel Cost Adjustment (FAC)
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Fluctuates monthly based on wholesale prices of natural gas, coal, or market-purchased power. If natural gas prices rise in winter, this rider increases without a full formal rate case.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                  <div className="font-bold text-slate-900 text-sm">
                    2. Energy Efficiency &amp; Mandates
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Funds public utility rebate programs for residential heat pump installations, smart thermostats, and low-income weatherization assistance programs.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                  <div className="font-bold text-slate-900 text-sm">
                    3. Environmental &amp; Renewable Portfolios
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Recovers utility capital investments in renewable energy credits (RECs), solar farm interconnections, and coal plant decommissioning compliance.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                  <div className="font-bold text-slate-900 text-sm">
                    4. Municipal Franchise Fees &amp; Sales Tax
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Local city rights-of-way fees for running electrical cables under city streets, plus applicable county and state sales taxes (typically 2% to 7%).
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6: Rate Tariff Structures */}
            <section id="rate-tariff-structures" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Tariff Structures: Flat, Tiered, and Time-of-Use
              </h2>
              <p className="text-slate-700 leading-relaxed">
                How your kilowatt-hours are multiplied depends on your utility rate tariff schedule. The three most common residential rate structures in North America are:
              </p>

              <div className="space-y-4">
                {/* Structure 1 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <h3 className="font-bold text-slate-900 text-base flex items-center justify-between">
                    <span>1. Flat Volumetric Tariff (Standard Rate)</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                      Most Common
                    </span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Every kilowatt-hour consumed costs the exact same amount, regardless of when it is used or how much total energy you consume. If your rate is $0.16/kWh, kilowatt-hour number 1 costs $0.16 and kilowatt-hour number 1,200 costs $0.16. This is the simplest structure to calculate.
                  </p>
                </div>

                {/* Structure 2 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <h3 className="font-bold text-slate-900 text-base flex items-center justify-between">
                    <span>2. Tiered / Inverted Block Tariff (Conservation Rate)</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-700">
                      Tiered Blocks
                    </span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Usage is divided into blocks with graduated price tiers:
                  </p>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs font-mono text-slate-700 space-y-1">
                    <div>Tier 1 (First 500 kWh):  $0.13 / kWh  (Essential Baseline)</div>
                    <div>Tier 2 (501 to 1,000 kWh): $0.17 / kWh  (Standard Usage)</div>
                    <div>Tier 3 (Over 1,000 kWh):   $0.24 / kWh  (High Usage Penalty)</div>
                  </div>
                  <p className="text-xs text-slate-500">
                    If you use 900 kWh under this structure, you pay (500 × $0.13) + (400 × $0.17) = $65.00 + $68.00 = $133.00 for supply.
                  </p>
                </div>

                {/* Structure 3 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <h3 className="font-bold text-slate-900 text-base flex items-center justify-between">
                    <span>3. Time-of-Use Tariff (TOU Rate)</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-700">
                      Dynamic Clock
                    </span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Kilowatt-hour rates change dynamically based on the time of day and day of week to reflect wholesale power grid stress:
                  </p>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs font-mono text-slate-700 space-y-1">
                    <div className="text-red-700 font-semibold">On-Peak (4:00 PM to 9:00 PM weekdays):  $0.34 / kWh</div>
                    <div className="text-emerald-700 font-semibold">Off-Peak (Overnight &amp; weekends):     $0.12 / kWh</div>
                    <div className="text-blue-700 font-semibold">Super Off-Peak (Midnight to 6:00 AM): $0.08 / kWh</div>
                  </div>
                  <p className="text-xs text-slate-500">
                    TOU tariffs make running electric vehicle chargers or pool pumps overnight highly economical, while running central air conditioning during late afternoon peak hours incurs severe cost premiums.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 7: Step-by-Step Worked Example */}
            <section id="worked-example-single-source" className="scroll-mt-24 space-y-5">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Step-by-Step Worked Example (The 900 kWh Benchmark)
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Let us walk through a complete residential electric bill calculation using the authoritative U.S. single-family household baseline established in our engineering benchmarks:
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2 text-xs sm:text-sm">
                <div className="font-bold text-slate-900">Baseline Engineering Scenario:</div>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li><span className="font-semibold text-slate-800">Monthly Usage:</span> 900 kWh over a 30-day billing cycle</li>
                  <li><span className="font-semibold text-slate-800">Base Energy Rate:</span> $0.1600 per kWh (supply and commodity)</li>
                  <li><span className="font-semibold text-slate-800">Fixed Customer Charge:</span> $15.00 per month (meter &amp; accounting fee)</li>
                  <li><span className="font-semibold text-slate-800">Delivery &amp; Regulatory Riders:</span> $18.00 per month (distribution maintenance)</li>
                  <li><span className="font-semibold text-slate-800">Municipal Taxes / Fees:</span> $8.00 per month (local franchise fee)</li>
                </ul>
              </div>

              {/* Steps Card Stack */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider">
                    <span>Step 1: Volumetric Energy Supply Charge</span>
                  </div>
                  <div className="font-mono text-sm bg-slate-900 text-emerald-400 p-3 rounded-xl">
                    Energy Charge = 900 kWh × $0.1600/kWh = $144.00
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Multiply your metered volume by your contracted energy generation rate. In this scenario, $144.00 represents the raw electricity consumed.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
                    <span>Step 2: Add Fixed Customer Charge</span>
                  </div>
                  <div className="font-mono text-sm bg-slate-900 text-emerald-400 p-3 rounded-xl">
                    Customer Infrastructure Charge = $15.00
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    This flat recurring fee connects your breaker panel to the grid and remains constant regardless of whether you consume 100 kWh or 2,000 kWh.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider">
                    <span>Step 3: Add Delivery Riders &amp; Environmental Programs</span>
                  </div>
                  <div className="font-mono text-sm bg-slate-900 text-emerald-400 p-3 rounded-xl">
                    Regulatory &amp; Delivery Riders = $18.00
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Covers mandated grid reliability investments, tree trimming along power lines, and state energy efficiency program administration.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    <span>Step 4: Add Municipal Assessment &amp; Taxes</span>
                  </div>
                  <div className="font-mono text-sm bg-slate-900 text-emerald-400 p-3 rounded-xl">
                    Taxes &amp; Franchise Surcharges = $8.00
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Government assessments remitted directly to state and municipal taxing authorities.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    Step 5: Final Statement Balance Due
                  </div>
                  <div className="font-mono text-xl sm:text-2xl font-black text-emerald-900">
                    Total Bill = $144.00 + $15.00 + $18.00 + $8.00 = $185.00
                  </div>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    The total amount due on the electric utility statement is exactly $185.00 for the 30-day billing cycle.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 8: Effective Rate Calculation */}
            <section id="effective-rate-calculation" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Why Your Effective $/kWh Is Higher Than Quoted Rates
              </h2>
              <p className="text-slate-700 leading-relaxed">
                If you ask a homeowner what they pay for electricity, they typically cite the base rate printed on their agreement, such as &quot;16 cents per kilowatt-hour.&quot; However, if they divide their actual check payment by their metered consumption, a substantial discrepancy emerges:
              </p>

              <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md space-y-3 border border-slate-800">
                <div className="text-xs font-mono uppercase text-blue-400 font-bold">
                  Effective Rate Equation
                </div>
                <div className="font-mono text-base sm:text-lg text-emerald-300 font-bold bg-slate-950 p-4 rounded-xl border border-slate-800">
                  Effective Rate = Total Amount Due ÷ Total Billed kWh
                </div>
                <div className="font-mono text-sm text-slate-300">
                  Effective Rate = $185.00 ÷ 900 kWh = $0.2056 / kWh (20.56¢ / kWh)
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  While the nominal brochure rate was $0.1600 per kWh, the true unit price paid by the customer is <span className="text-emerald-400 font-bold">20.56 cents per kWh</span>, which represents a <span className="text-amber-400 font-bold">+28.5% premium</span> driven by the fixed fee ($15), delivery riders ($18), and local taxes ($8).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-purple-50/80 border border-purple-200/80 text-purple-950 text-xs sm:text-sm space-y-1">
                <span className="font-bold">The Amortization Law of Fixed Charges: </span>
                As monthly consumption decreases (for example, in a low-usage vacation cottage consuming only 150 kWh/month), the fixed $15 customer charge and $18 delivery fee must be amortized across fewer kilowatt-hours. In that case, the effective rate spikes to over 42 cents per kWh. Conversely, heavy power consumers achieve effective rates closer to their base rate because fixed fees are diluted across thousands of kilowatt-hours.
              </div>
            </section>

            {/* Section 9: Solar and Efficiency Impact */}
            <section id="solar-and-efficiency-impact" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                What Happens to Your Bill with Solar PV or Batteries?
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Many homeowners install rooftop solar panels expecting their monthly utility bill to become zero dollars. In practice, utility tariffs prevent bills from reaching zero even with 100% solar offset:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm text-xs sm:text-sm space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Avoidable Costs: The Volumetric Supply &amp; Delivery</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Solar generation directly cancels out metered kilowatt-hours. In our 900 kWh benchmark scenario, eliminating 900 kWh of grid consumption eliminates the $144.00 energy charge and volumetric riders, saving $144.00+ each month.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm text-xs sm:text-sm space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Unavoidable Costs: Minimum Grid Interconnection Fees</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Under standard net metering tariffs, the $15.00 fixed customer fee, monthly meter surcharge, and state universal service fees remain mandatory. A 100% net solar home will typically still receive a monthly bill of $15.00 to $25.00 to maintain grid connection reliability.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
                <Layers className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800">Solar Sizing Guidance: </span>
                  When evaluating return on investment (ROI) for solar panels or backup battery banks, calculate your financial payback using your avoidable volumetric rate, not your total effective rate. Use our{" "}
                  <Link
                    href="/solar-system-size-calculator"
                    className="text-blue-600 underline font-semibold hover:text-blue-700"
                  >
                    Solar System Size Calculator
                  </Link>{" "}
                  to size your array accurately based on your true monthly kilowatt-hour consumption.
                </div>
              </div>
            </section>

            {/* Section 10: FAQ */}
            <section id="faq" className="scroll-mt-24 space-y-4 border-t border-slate-200 pt-8">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {FAQ_DATA.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2"
                  >
                    <h3 className="text-base font-bold text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 11: Related Tools Navigation */}
            <section className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 space-y-4">
              <h2 className="text-xl font-bold text-slate-900">
                Explore Related Electrical &amp; Power Calculators
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                CalcMyPower provides engineering tools to plan your energy consumption, circuit wiring, and backup power equipment:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <Link
                  href="/electricity-cost-calculator"
                  className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-1 block"
                >
                  <div className="font-bold text-slate-900 text-sm text-blue-600 flex items-center justify-between">
                    <span>Electricity Cost Calculator</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <div className="text-xs text-slate-500">
                    Estimate monthly electric bills and calculate effective $/kWh line by line.
                  </div>
                </Link>

                <Link
                  href="/electricity-use-calculator"
                  className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-1 block"
                >
                  <div className="font-bold text-slate-900 text-sm text-blue-600 flex items-center justify-between">
                    <span>Electricity Use Calculator</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <div className="text-xs text-slate-500">
                    Calculate appliance Watt-hours and kilowatt-hours across duty cycles.
                  </div>
                </Link>

                <Link
                  href="/how-to-calculate-electricity-usage"
                  className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-1 block"
                >
                  <div className="font-bold text-slate-900 text-sm text-blue-600 flex items-center justify-between">
                    <span>How to Calculate Electricity Usage</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <div className="text-xs text-slate-500">
                    Step-by-step guide to calculating home appliance wattage and daily energy.
                  </div>
                </Link>

                <Link
                  href="/solar-system-size-calculator"
                  className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition space-y-1 block"
                >
                  <div className="font-bold text-slate-900 text-sm text-blue-600 flex items-center justify-between">
                    <span>Solar System Size Calculator</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <div className="text-xs text-slate-500">
                    Size solar panel arrays in kW and panel count to offset monthly bill kWh.
                  </div>
                </Link>
              </div>
            </section>
          </div>

          {/* Right Sticky Sidebar (Desktop TOC) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Article Contents</span>
              </div>
              <TableOfContents items={TOC_ITEMS} />
            </div>

            {/* Sticky Tool Promotion Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md space-y-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-semibold">
                <Calculator className="w-3.5 h-3.5" />
                Interactive Calculator
              </div>
              <h3 className="text-lg font-bold">
                Electricity Cost Calculator
              </h3>
              <p className="text-xs text-blue-100 leading-relaxed">
                Plug in your monthly kWh usage, base energy rate, customer charge, and taxes to see your complete line-item bill breakdown and effective rate.
              </p>
              <Link
                href="/electricity-cost-calculator"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs shadow-sm transition"
              >
                <span>Launch Calculator</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
