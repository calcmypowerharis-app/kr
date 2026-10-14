import { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Award, CheckCircle, Shield, Cpu, Zap, ArrowRight, FileCode } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbSchema, generateOrganizationSchema } from "@/lib/seo/schema";
import { SITE_URL } from "@/lib/seo/registry";

export const metadata: Metadata = buildPageMetadata({
  title: "About CalcMyPower",
  description:
    "Learn about CalcMyPower's mission, engineering calculation methodology, transparent formula baselines, and authoritative US standards (NEC, IEEE, NREL, DOE).",
  path: "/about",
});

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "About", url: `${SITE_URL}/about` },
  ]);

  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
        <header className="space-y-3 border-b border-slate-200 pb-6">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-medium text-slate-500"
          >
            <Link href="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-slate-800 font-semibold">About</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
            About CalcMyPower
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
            High-utility, technically rigorous US electrical, solar, battery backup, and generator sizing calculators built for homeowners, off-grid builders, and field technicians.
          </p>
        </header>

        {/* Mission Card */}
        <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/80 via-white to-slate-50 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-lg">
            <Zap className="w-5 h-5 text-blue-600" />
            <h2>Our Publishing Mission</h2>
          </div>
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            Electrical sizing tools on the modern web are too often buried under generic AI filler or obscured behind black-box marketing forms. CalcMyPower was established to provide transparent, mathematically verified engineering calculators that publish their formulas, assumptions, and physical constraints openly.
          </p>
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            Our interactive tools execute client-side in your web browser. You receive immediate answers, interactive sliders, worked examples, and actionable electrical guidelines without paywalls or equipment harvesting.
          </p>
        </div>

        {/* Methodology Standards Grid */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-6 h-6 text-indigo-600" />
              <span>Engineering Methodologies and Standards</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Every calculator formula and editorial guideline is grounded in authoritative US technical bodies:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>National Electrical Code (NEC / NFPA 70)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                All circuit breaker sizing models incorporate the mandatory 125% continuous-load safety factor (Articles 210.19, 215.2, and 690.8). Sizing guides reference conductor ampacity tables and 3% voltage drop recommendations.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>IEEE Battery Standards (485 &amp; 1013)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Battery storage calculations follow IEEE Std 485 and Std 1013 sizing principles, incorporating chemistry-specific Depth of Discharge (DoD) limits and Peukert discharge rate warnings for lead-acid and lithium cells.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>NREL PVWatts &amp; Solar Models</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Solar array sizing formulas utilize solar irradiance data and derate methodologies modeled on National Renewable Energy Laboratory (NREL) PVWatts benchmarks and Sandia National Laboratories research.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>U.S. DOE &amp; EIA Energy Benchmarks</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Appliance energy estimates and utility cost calculators draw on baseline electrical consumption studies from the U.S. Department of Energy and average state electric tariffs from the Energy Information Administration.
              </p>
            </div>
          </div>
        </section>

        {/* Core Principles */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Shield className="w-5 h-5 text-slate-700" />
            <span>Our Core Publishing Principles</span>
          </h2>

          <div className="space-y-3 text-slate-700 text-sm leading-relaxed">
            <p>
              <strong>1. Calculator-First Utility:</strong> Interactive tools are our primary product. Sizing guides and technical articles exist to explain mathematical methodologies and practical safety rules, not to inflate word counts.
            </p>
            <p>
              <strong>2. Transparent Baseline Assumptions:</strong> We never hide derating factors. When we assume 85% inverter conversion efficiency, a 0.80 power factor, or a 90% LiFePO4 depth of discharge, the assumption is explicitly labeled and configurable.
            </p>
            <p>
              <strong>3. Independent Engineering Integrity:</strong> We do not accept sponsored calculator modifications or alter sizing outputs to favor particular manufacturers or hardware brands.
            </p>
            <p>
              <strong>4. Safety and Preliminary Planning Disclaimers:</strong> Sizing calculations are theoretical planning tools. Because physical wiring involves fire and life-safety hazards, we always urge users to verify designs with a licensed electrician or professional engineer.
            </p>
          </div>
        </section>

        {/* Contact CTA */}
        <div className="p-6 rounded-2xl bg-slate-100 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 text-base">Have Feedback or a Calculation Correction?</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              We welcome peer review from master electricians, electrical engineers, and solar installers.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition self-start sm:self-auto shrink-0"
          >
            <span>Contact Engineering Team</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
