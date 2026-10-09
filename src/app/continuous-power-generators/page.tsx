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
  SlidersHorizontal,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Settings,
  Fuel,
  Activity,
  Layers,
} from "lucide-react";

export const metadata: Metadata = {
  title: "What Is a Continuous Power Generator? Working & Sizing Guide",
  description:
    "Learn what continuous power generators are, how ISO 8528 ratings (COP vs PRP vs ESP) work, 1800 RPM engine mechanics, wet stacking hazards, and when you need one.",
  alternates: {
    canonical: "https://calcmypower.com/continuous-power-generators",
  },
  openGraph: {
    title:
      "What Is a Continuous Power Generator? Working & Sizing Guide | CalcMyPower",
    description:
      "Learn what continuous power generators are, how ISO 8528 ratings (COP vs PRP vs ESP) work, 1800 RPM engine mechanics, wet stacking hazards, and when you need one.",
    url: "https://calcmypower.com/continuous-power-generators",
    type: "article",
    publishedTime: "2026-10-04T00:00:00Z",
    modifiedTime: "2026-10-04T00:00:00Z",
    images: [
      {
        url: "https://calcmypower.com/images/articles/continuous-power-generators.webp",
        width: 1200,
        height: 675,
        alt: "Heavy-duty continuous industrial power generator installation featuring large displacement diesel engine and radiator cooling system.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "What Is a Continuous Power Generator? Working & Sizing Guide | CalcMyPower",
    description:
      "Learn what continuous power generators are, how ISO 8528 ratings (COP vs PRP vs ESP) work, 1800 RPM engine mechanics, wet stacking hazards, and when you need one.",
    images: [
      "https://calcmypower.com/images/articles/continuous-power-generators.webp",
    ],
  },
};

const TOC_ITEMS: TocItem[] = [
  { id: "quick-answer", label: "Quick Summary: What Is a Continuous Power Generator?" },
  { id: "iso-8528-ratings", label: "ISO 8528 Generator Rating Classifications (COP, PRP, ESP)" },
  { id: "mechanical-architecture", label: "Engine Engineering: 1800 RPM vs. 3600 RPM" },
  { id: "cooling-and-lubrication", label: "Cooling Systems, Oil Sumps & Thermal Equilibrium" },
  { id: "wet-stacking-hazard", label: "The Wet Stacking Danger: Why Under-Loading Ruins Engines" },
  { id: "residential-reality-check", label: "Residential Standby Reality: Can You Run 24/7?" },
  { id: "fuel-logistics", label: "Fuel Logistics: Diesel Storage vs. Utility Natural Gas" },
  { id: "when-do-you-need-one", label: "When Do You Actually Need Continuous Power?" },
  { id: "worked-example-comparison", label: "Worked Comparison: Continuous Baseload vs. Outage Sizing" },
  { id: "faq", label: "Frequently Asked Questions" },
];

const FAQ_DATA = [
  {
    question: "Can a portable generator run 24 hours a day continuously?",
    answer:
      "No. Standard portable generators are built with high-revving 3600 RPM air-cooled engines and splash-lubricated oil systems designed for intermittent emergency use (typically 8 to 12 hours at a time). Running them non-stop causes severe thermal stress, rapid oil breakdown, and premature engine wear. They must be shut down periodically to cool and check engine oil.",
  },
  {
    question: "How long can a whole-house standby generator run continuously?",
    answer:
      "Most residential standby generators are classified under ISO 8528 as Emergency Standby Power (ESP). While they can run for several days during a grid outage, manufacturers mandate shutting them down periodically (typically every 100 to 200 operating hours) to check engine oil, replace filters, and inspect valve clearances. They are engineered for emergency utility interruption duty rather than non-stop continuous power supplies.",
  },
  {
    question: "What is the primary difference between continuous power (COP) and prime power (PRP)?",
    answer:
      "Continuous Operating Power (COP) is designed for a constant, non-varying 100% electrical load for unlimited hours per year with no sustained overload allowance under ISO 8528-1. Prime Running Power (PRP) is designed for variable loads with an average 24-hour load factor generally limited to 70% of PRP (unless specified otherwise by the manufacturer), and typically includes a 10% overload reserve capability for 1 hour out of every 12 operating hours where permitted by the engine manufacturer.",
  },
  {
    question: "What causes wet stacking in a diesel generator?",
    answer:
      "Wet stacking occurs when a diesel engine operates continuously under light electrical loads (typically below 30% to 40% of rated capacity). Incomplete combustion prevents exhaust temperatures from reaching the levels needed to vaporize unburned fuel, leading to soot and oil accumulation in exhaust manifolds and turbochargers. Regular operation under proper load (at least 60% capacity) or load banking helps prevent and clear these deposits.",
  },
  {
    question: "Why do continuous generators run at 1800 RPM instead of 3600 RPM?",
    answer:
      "To produce 60 Hz AC power, a 4-pole alternator operates at 1800 RPM, whereas a 2-pole alternator must spin at 3600 RPM. Running at half the rotational speed significantly lowers piston velocities, bearing wear, and mechanical vibration. While light 3600 RPM utility engines typically have service lifespans of 1,000 to 3,000 hours, heavy-duty 1800 RPM industrial diesels routinely achieve 10,000 to 30,000+ operating hours before major overhaul when properly maintained.",
  },
];

export default function ContinuousPowerGeneratorsPage() {
  const articleSchema = generateArticleSchema({
    headline: "What Is a Continuous Power Generator? Working & Sizing Guide",
    description:
      "Learn what continuous power generators are, how ISO 8528 ratings (COP vs PRP vs ESP) work, 1800 RPM engine mechanics, wet stacking hazards, and when you need one.",
    url: "https://calcmypower.com/continuous-power-generators",
    datePublished: "2026-10-04T00:00:00Z",
    dateModified: "2026-10-04T00:00:00Z",
    images: [
      "https://calcmypower.com/images/articles/continuous-power-generators.webp",
    ],
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Calculators & Guides", url: "https://calcmypower.com/calculators" },
    {
      name: "Continuous Power Generators",
      url: "https://calcmypower.com/continuous-power-generators",
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
            Continuous Power Generators
          </span>
        </nav>

        {/* Two-Column Grid: Left Content (DOM First), Right Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Article Content */}
          <article id="article-content" className="lg:col-span-8 min-w-0 space-y-10">
            {/* Header */}
            <header className="space-y-4 border-b border-slate-200 pb-8">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 font-semibold">
                  Industrial &amp; Backup Power Guide
                </span>
                <span className="text-slate-400">•</span>
                <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>14 min read</span>
                </span>
                <span className="text-slate-400">•</span>
                <ArticleDateByline datePublished="2026-10-04" lastModified="2026-10-04" />
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                What Is a Continuous Power Generator? How It Works and When You Need One
              </h1>

              <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-normal">
                Explore the engineering differences between true continuous power generators, prime power systems, and emergency standby units. Understand ISO 8528 standards, 1800 RPM industrial drivetrains, wet stacking risks, and how to size continuous loads reliably.
              </p>
            </header>

            {/* Hero Image */}
            <div className="space-y-3">
              <ZoomableArticleImage
                src="/images/articles/continuous-power-generators.webp"
                alt="Industrial heavy-duty continuous power generator installed at an off-grid facility with diesel engine and radiator cooling system"
                title="Industrial Continuous Power Generator Installation"
                caption="Figure 1: Heavy-duty 1800 RPM industrial continuous power generator featuring a liquid-cooled diesel powertrain, heavy-duty air filtration, and an auxiliary high-capacity lubrication sump."
              >
                <Image
                  src="/images/articles/continuous-power-generators.webp"
                  alt="Industrial heavy-duty continuous power generator installed at an off-grid facility with diesel engine and radiator cooling system"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                />
              </ZoomableArticleImage>
            </div>

            {/* Section 1: Quick Summary */}
            <section id="quick-answer" className="space-y-4 scroll-mt-24">
              <div className="p-6 bg-blue-50/70 border border-blue-200/90 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-base sm:text-lg">
                  <Zap className="w-5 h-5 text-blue-700 shrink-0" />
                  <h2>Quick Summary: What Defines a Continuous Power Generator?</h2>
                </div>
                <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
                  A <strong>continuous power generator</strong> is classified as <strong>Continuous Operating Power (COP)</strong> under international engineering standard ISO 8528-1.
                </p>
                <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
                  It is engineered to deliver a <strong>constant 100% electrical load for an unlimited number of hours per year</strong> without access to utility grid power.
                </p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Unlike residential standby generators or consumer portables, true continuous generators serve as primary standalone power stations.
                </p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  They operate continuously in remote mining sites, off-grid telecommunications hubs, oil fields, and mission-critical data centers.
                </p>
                <div className="pt-2">
                  <Link
                    href="/generator-wattage-chart"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-700 hover:text-blue-900 transition"
                  >
                    <span>Reference our Appliance Wattage Chart for equipment running draws</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </section>

            {/* Section 2: ISO 8528 Classifications */}
            <section id="iso-8528-ratings" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                ISO 8528 Generator Rating Classifications (COP, PRP, ESP, LTP)
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                Stationary generator sets are classified under <strong>ISO 8528-1:2018</strong> for reciprocating engine-driven generating sets.
              </p>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                Understanding these four distinct rating classes prevents premature engine failure, thermal overload, and voided commercial warranties:
              </p>

              {/* Comparison Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <caption className="sr-only">
                    ISO 8528-1 Generator Rating Standards Comparison
                  </caption>
                  <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                    <tr>
                      <th scope="col" className="py-3 px-3.5">ISO Rating Class</th>
                      <th scope="col" className="py-3 px-3">Annual Operating Hours</th>
                      <th scope="col" className="py-3 px-3">Average Load Factor</th>
                      <th scope="col" className="py-3 px-3">Overload Capability</th>
                      <th scope="col" className="py-3 px-3.5">Typical Applications</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    <tr>
                      <th scope="row" className="py-3 px-3.5 font-bold text-slate-900">
                        COP (Continuous Operating Power)
                      </th>
                      <td className="py-3 px-3 font-mono text-emerald-700 font-semibold">Unlimited (8,760 hrs/yr)</td>
                      <td className="py-3 px-3 font-mono">100% constant</td>
                      <td className="py-3 px-3 text-slate-500">None (0%) under ISO 8528</td>
                      <td className="py-3 px-3.5 text-slate-600">Base load grid supply, isolated microgrids, mining operations</td>
                    </tr>
                    <tr>
                      <th scope="row" className="py-3 px-3.5 font-bold text-slate-900">
                        PRP (Prime Running Power)
                      </th>
                      <td className="py-3 px-3 font-mono text-blue-700 font-semibold">Unlimited (8,760 hrs/yr)</td>
                      <td className="py-3 px-3 font-mono">Variable (typically ≤ 70% over 24h)</td>
                      <td className="py-3 px-3 text-emerald-700 font-semibold">+10% (1 hr / 12 hrs, max 25h/yr)</td>
                      <td className="py-3 px-3.5 text-slate-600">Remote construction job sites, rental fleets, industrial variable power</td>
                    </tr>
                    <tr>
                      <th scope="row" className="py-3 px-3.5 font-bold text-slate-900">
                        ESP (Emergency Standby Power)
                      </th>
                      <td className="py-3 px-3 font-mono text-amber-700 font-semibold">Duration of utility outage (ISO baseline ≤ 200h)</td>
                      <td className="py-3 px-3 font-mono">Variable (typically ≤ 70% over 24h)</td>
                      <td className="py-3 px-3 text-slate-500">None (0%)</td>
                      <td className="py-3 px-3.5 text-slate-600">Residential homes, commercial facilities, hospitals during power outages</td>
                    </tr>
                    <tr>
                      <th scope="row" className="py-3 px-3.5 font-bold text-slate-900">
                        LTP (Limited-Time Running Power)
                      </th>
                      <td className="py-3 px-3 font-mono text-slate-700 font-semibold">Up to 500 hrs/year</td>
                      <td className="py-3 px-3 font-mono">100% constant non-varying</td>
                      <td className="py-3 px-3 text-slate-500">None (0%)</td>
                      <td className="py-3 px-3.5 text-slate-600">Utility peak shaving, interruptible power rate contracts</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p>
                  <strong>Standard Baselines vs. Manufacturer Ratings:</strong> While ISO 8528-1 defines the international standard framework, leading power system manufacturers (such as Cummins, Caterpillar, and Kohler) offer specialized commercial ratings.
                </p>
                <p>
                  For example, data centers frequently specify ratings such as Data Center Continuous (DCC) or Mission Critical Standby.
                </p>
                <p>
                  These permit sustained operation at up to 100% of rated capacity during outages without the 70% average 24-hour derating imposed by standard ESP.
                </p>
                <p>
                  Always review manufacturer spec sheets and project engineering requirements for exact site allowances.
                </p>
                <p>
                  <strong>The Sizing Derate Curve:</strong> On identical engine displacements, generator sets carry progressively lower kilowatt ratings as duty severity escalates.
                </p>
                <p>
                  A heavy industrial diesel platform rated for 1,000 kW in Emergency Standby (ESP) mode is typically derated to approximately 900 kW for Prime Running (PRP) duty.
                </p>
                <p>
                  That same engine is derated to 700 kW to 750 kW for true Continuous (COP) operation to maintain thermal equilibrium and mechanical durability.
                </p>
              </div>
            </section>

            {/* Section 3: Mechanical Architecture */}
            <section id="mechanical-architecture" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Engine Engineering: 1800 RPM vs. 3600 RPM
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                The most visible physical difference between intermittent consumer generators and industrial continuous generators is their rotational engine speed:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <h3>1800 RPM Industrial Drivetrains</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Continuous power systems utilize <strong>4-pole alternators</strong>. To produce standard North American 60 Hz alternating current (Frequency = [RPM x Poles] / 120), the engine operates at exactly 1,800 RPM (or 1,500 RPM for 50 Hz international systems).
                  </p>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                    <li>Piston velocity is reduced by 50%, minimizing cylinder wall scuffing.</li>
                    <li>Operates well below engine torque redline for minimal vibration.</li>
                    <li>Designed for <strong>10,000 to 30,000+ operating hours</strong> before major overhaul when maintained to manufacturer specifications.</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-amber-950 text-base">
                    <Flame className="w-5 h-5 text-amber-700" />
                    <h3>3600 RPM Portable &amp; Light Standby</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                    Most portable gasoline/propane generators and entry-level home units use <strong>2-pole alternators</strong> spinning at 3,600 RPM to keep physical weight, engine displacement, and manufacturing costs low.
                  </p>
                  <ul className="text-xs text-amber-800 space-y-1.5 list-disc pl-4">
                    <li>Pistons cycle twice as fast per kilowatt of electrical output.</li>
                    <li>High thermal friction, loud acoustic decibel levels, and rapid oil degradation.</li>
                    <li>Typical expected design lifespan is approximately <strong>1,000 to 3,000 operating hours</strong> under intermittent emergency duty.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4: Cooling and Lubrication */}
            <section id="cooling-and-lubrication" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Cooling Systems, Oil Sumps &amp; Thermal Equilibrium
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                Running an internal combustion engine 24 hours a day for weeks without interruption introduces two severe mechanical challenges: oil depletion and thermal heat rejection:
              </p>

              <div className="space-y-4">
                <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <Settings className="w-4 h-4 text-blue-600" />
                    <span>Heavy Pressurized Lubrication &amp; Oil Sump Capacity</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    A small portable generator typically holds around 1 quart (0.95 L) of motor oil, requiring frequent inspection during prolonged emergency runs.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Industrial continuous diesels incorporate deep-sump oil pans sized for multiple gallons of heavy-duty lubricant, multi-stage filtration, and optional automated oil replenishment reservoirs.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Depending on engine displacement and manufacturer guidelines, these systems support scheduled maintenance intervals of 250 to 500 operating hours between oil services.
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-600" />
                    <span>Liquid Cooling and Thermal Equilibrium</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Air-cooled engines rely on cooling fins blown by engine flywheel fans. In hot weather or under high continuous draw, air cooling cannot maintain uniform cylinder temperature, leading to thermal stress and valve degradation.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Continuous generators utilize heavy industrial liquid cooling loops with ethylene glycol radiators, jacket water heaters, and thermostatically regulated fans.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    These cooling loops maintain stable engine operating temperatures (typically around 170°F to 200°F) to prevent thermal cycling and premature mechanical fatigue.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: Wet Stacking Danger */}
            <section id="wet-stacking-hazard" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                The Wet Stacking Danger: Why Under-Loading Ruins Engines
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                One of the most counterintuitive hazards in generator engineering is <strong>under-loading</strong>.
              </p>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                Homeowners and operators often believe that running an oversized unit at 15% to 25% load preserves engine life. In reality, light loading causes rapid engine damage through <strong>wet stacking</strong>:
              </p>

              <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  <h3>How Wet Stacking Occurs:</h3>
                </div>
                <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                  Under standards such as NFPA 110 and manufacturer guidelines, diesel engines operating below 30% to 40% load fail to reach optimal cylinder exhaust temperatures. This prevents complete fuel atomization and combustion.
                </p>
                <ul className="text-xs text-amber-800 space-y-1.5 list-disc pl-4">
                  <li>Unburned diesel fuel washes cylinder wall lubrication away, causing piston ring blow-by.</li>
                  <li>Fuel mixes with lubricating oil, thinning crankcase viscosity.</li>
                  <li>Thick, oily, black unburned deposits accumulate throughout exhaust valves, turbocharger housings, and exhaust piping.</li>
                  <li>Over time, the engine loses horsepower, emits heavy black exhaust smoke, and risks an internal exhaust fire.</li>
                </ul>
                <p className="text-xs text-amber-900 font-semibold pt-1">
                  Engineering Best Practice: While continuous diesel generators support variable demand, long-term operation is optimized above 60% rated capacity. Facilities with light electrical loads utilize supplemental resistive load banks or hybrid battery systems (BESS) to maintain adequate thermal loading.
                </p>
              </div>
            </section>

            {/* Section 6: Residential Standby Reality */}
            <section id="residential-reality-check" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Residential Standby Reality: Can You Run 24/7 in an Emergency?
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                During extended outages, homeowners often ask whether a standby generator can run 24 hours a day for two straight weeks.
              </p>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                The short engineering answer is yes, but only with disciplined daily maintenance pauses.
              </p>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                Most residential standby generators are classified as <strong>ESP (Emergency Standby Power)</strong> rather than continuous COP units:
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3 text-xs sm:text-sm text-slate-700">
                <h3 className="font-bold text-slate-900 text-sm">
                  Required Extended Outage Maintenance Protocol (Every 100 to 200 Hours):
                </h3>
                <ol className="space-y-2 list-decimal pl-5 text-slate-600">
                  <li>
                    <strong>Switch Off Generator Circuit:</strong> Disconnect heavy household loads before shutting down to allow the engine to cool at no-load idle for 3 to 5 minutes.
                  </li>
                  <li>
                    <strong>Check and Top Off Motor Oil:</strong> Even high-quality standby engines consume oil during heavy continuous runs. Check dipstick levels every 24 to 48 hours.
                  </li>
                  <li>
                    <strong>Perform Oil and Filter Change at 100 to 200 Hours:</strong> Running past the manufacturer-specified oil change interval during a 10-day outage can void warranties and cause catastrophic engine bearing failure. Keep multiple spare oil filters, synthetic 5W-30 oil, and spark plugs on hand before storm season.
                  </li>
                </ol>
              </div>
            </section>

            {/* Section 7: Fuel Logistics */}
            <section id="fuel-logistics" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Fuel Supply Logistics: Diesel, Natural Gas, and Propane
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                A generator is only as continuous as its fuel supply. Running continuous power requires rigorous logistics:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm pt-2">
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <Fuel className="w-4 h-4 text-blue-600" />
                    <h3>Utility Natural Gas</h3>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Provides continuous pipeline fuel delivery without requiring on-site storage tanks. However, utility pipeline supply can experience pressure drops during severe regional winter freezes or automated utility shutoffs following seismic events.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <Fuel className="w-4 h-4 text-amber-600" />
                    <h3>On-Site Diesel Fuel</h3>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    The standard for autonomous off-grid and industrial continuous reliability. Requires on-site sub-base fuel tanks, routine filtration (fuel polishing), and fuel stabilizers where diesel is stored for prolonged periods (12 to 24 months) to prevent microbial contamination and particulate sediment.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <Fuel className="w-4 h-4 text-emerald-600" />
                    <h3>Liquid Propane (LP)</h3>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Propane does not degrade over time in pressurized storage vessels. However, high vapor withdrawal rates in severe sub-zero winter temperatures can lower container vaporization capacity, requiring properly sized storage tanks or liquid-withdrawal external vaporizers on large engines.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 8: When Do You Actually Need One? */}
            <section id="when-do-you-need-one" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                When Do You Actually Need a Continuous Power Generator?
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                Before investing tens of thousands of dollars into a continuous-rated generator system, determine whether your operational profile genuinely justifies it:
              </p>

              <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 text-xs sm:text-sm">
                <div className="space-y-2">
                  <span className="font-bold text-emerald-700 uppercase tracking-wide text-xs block">
                    Genuine Continuous Power Use Cases:
                  </span>
                  <ul className="space-y-1.5 list-disc pl-4 text-slate-700">
                    <li>Off-grid telecommunications cellular towers and radio repeaters without utility access.</li>
                    <li>Off-grid commercial agriculture, livestock ventilation, and deep well irrigation pumping.</li>
                    <li>Remote mining, timber, or construction sites operating 24/7/365.</li>
                    <li>Continuous prime microgrids combined with industrial solar PV and commercial BESS storage.</li>
                  </ul>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-700 uppercase tracking-wide text-xs block">
                    When an Emergency Standby (ESP) Generator is the Better Choice:
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    For 99% of grid-tied homes and commercial businesses, an Emergency Standby (ESP) generator or a portable unit with an interlock kit is the cost-effective choice.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    Standby units provide reliable emergency power for days or weeks during severe outages at a fraction of the capital cost.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 9: Worked Sizing Comparison (Section 26-C Link) */}
            <section id="worked-example-comparison" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Worked Sizing Comparison: Continuous Baseload vs. Intermittent Outage Sizing
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                To illustrate the mathematical contrast between intermittent residential emergency sizing and continuous power engineering, examine our benchmark emergency outage load profile:
              </p>

              {/* Benchmark Box linking to winter-essentials scenario */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      Benchmark Profile: Winter Storm Essentials Outage
                    </h3>
                    <p className="text-xs text-slate-500">
                      Standard residential emergency circuits (refrigerator, furnace blower, sump pump, microwave, LED lighting, router).
                    </p>
                  </div>
                  <Link
                    href="/generator-size-calculator?scenario=winter-essentials"
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 transition self-start sm:self-auto"
                  >
                    <span>Inspect Scenario in Calculator</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">Total Running Watts</span>
                    <span className="text-lg font-bold text-slate-900">2,955 W</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">Largest Surge Delta</span>
                    <span className="text-lg font-bold text-amber-700">1,100 W</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">Peak Starting Demand</span>
                    <span className="text-lg font-bold text-slate-900">4,055 W</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">Planning Capacity (1.25x)</span>
                    <span className="text-lg font-bold text-emerald-700">5,069 W</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 text-xs leading-relaxed text-slate-600">
                  <p>
                    <strong>Residential Standby (ESP) Approach:</strong> Total simultaneous running load equals <strong>2,955</strong> Watts, with the 1/2 HP furnace blower motor generating the largest additional starting surge of <strong>1,100</strong> Watts, creating a peak starting demand of <strong>4,055</strong> Watts.
                  </p>
                  <p>
                    Applying the standard continuous 25% safety reserve yields an engineering planning capacity of <strong>5,069</strong> Watts. A standard 5kW to 6kW portable generator easily handles this profile for intermittent outage duty.
                  </p>
                  <p>
                    <strong>Continuous Industrial (COP) Approach:</strong> Consider this <strong>2,955</strong> Watt load powering an off-grid telecommunications site 24/7 without grid power.
                  </p>
                  <p>
                    An engineer would target an 1800 RPM continuous generator operating at roughly 60% to 75% load factor.
                  </p>
                  <p>
                    That requires a continuous rating of 4,000 to 5,000 Watts (often a 6 kW to 8 kW industrial diesel unit), with dual fuel filtration and an extended oil sump for uninterrupted operation.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/generator-size-calculator"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wide transition shadow-xs"
                >
                  <span>Build Custom Generator Load in Calculator</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/generator-amperage-chart-calculator"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs tracking-wide transition"
                >
                  <span>View Generator Amperage Chart</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </section>

            {/* Section 10: Frequently Asked Questions */}
            <section id="faq" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {FAQ_DATA.map((faq, idx) => (
                  <details
                    key={idx}
                    className="group bg-slate-50 border border-slate-200 rounded-xl p-4 transition-all"
                  >
                    <summary className="font-semibold text-slate-900 text-sm cursor-pointer list-none flex justify-between items-center">
                      <span>{faq.question}</span>
                      <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform shrink-0" />
                    </summary>
                    <div className="pt-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200 mt-3">
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
                Generator sizing and installation involve high-voltage electricity, carbon monoxide exhaust, and fuel fire risks. This guide is for educational and preliminary planning purposes.
              </p>
              <p className="leading-relaxed">
                Always consult a licensed electrical engineer and master electrician, and ensure all installations adhere to NFPA 70 (National Electrical Code), NFPA 110, and local building codes.
              </p>
            </div>
          </article>

          {/* Sticky Sidebar on Desktop */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Quick Sizing Card */}
            <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-4 shadow-lg">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                Interactive Engineering Tools
              </span>
              <h3 className="text-lg font-bold">
                Size Your Generator Load Accurately
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Don&apos;t guess your continuous and surge requirements. Use our validated calculation tools to tally running watts, evaluate locked-rotor motor inrush, and prevent breaker trips.
              </p>
              <div className="space-y-2 pt-2">
                <Link
                  href="/generator-wattage-chart"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold transition"
                >
                  <span>Appliance Wattage Chart</span>
                  <ArrowRight className="w-4 h-4 text-blue-400" />
                </Link>
                <Link
                  href="/generator-size-calculator"
                  className="flex items-center justify-between p-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-xs"
                >
                  <span>Generator Size Calculator</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </Link>
                <Link
                  href="/generator-amperage-chart-calculator"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold transition"
                >
                  <span>Generator Amperage Chart</span>
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
                Recommended Sizing Guides
              </span>
              <div className="space-y-2 text-xs">
                <Link
                  href="/how-to-calculate-watts-for-a-generator"
                  className="block font-medium text-blue-700 hover:underline"
                >
                  How to Calculate Watts for a Generator: Running vs Starting Surge
                </Link>
                <Link
                  href="/what-size-generator-do-i-need-for-my-house"
                  className="block font-medium text-blue-700 hover:underline"
                >
                  What Size Generator Do I Need for My House?
                </Link>
                <Link
                  href="/what-size-generator-to-run-a-refrigerator"
                  className="block font-medium text-blue-700 hover:underline"
                >
                  What Size Generator to Run a Refrigerator?
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
