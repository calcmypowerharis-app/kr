import { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageSquare, CheckCircle, Clock, ShieldAlert, Sparkles } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbSchema } from "@/lib/seo/schema";
import { SITE_URL } from "@/lib/seo/registry";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Us",
  description:
    "Contact the CalcMyPower engineering and publishing team for technical feedback, formula suggestions, errata corrections, or editorial inquiries.",
  path: "/contact",
});

export default function ContactPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Contact Us", url: `${SITE_URL}/contact` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
            <span className="text-slate-800 font-semibold">Contact Us</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
            Contact CalcMyPower
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
            Get in touch with our engineering team for technical formula feedback, calculation suggestions, editorial errata, or partnership inquiries.
          </p>
        </header>

        {/* Primary Contact Channel Card */}
        <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/70 via-white to-slate-50 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-lg">
            <Mail className="w-5 h-5 text-blue-600" />
            <h2>Direct Email Channel</h2>
          </div>
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            For all editorial, calculation, and technical support inquiries, please contact our publishing desk directly at:
          </p>
          <div className="inline-block p-4 rounded-xl bg-white border border-blue-200 text-base sm:text-lg font-mono font-bold text-blue-700 shadow-2xs">
            contact@calcmypower.com
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>Average response window: 24 to 48 business hours.</span>
          </div>
        </div>

        {/* Categories of Inquiry */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-600" />
              <span>Inquiry Categories We Prioritize</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              To expedite routing, include the topic in your email subject line:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-2 text-amber-700">
                <ShieldAlert className="w-4 h-4" />
                <span>Technical Errata</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Found a typo, outdated NEC code edition, or numerical discrepancy in a formula? We investigate all verified corrections within 24 hours.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-2 text-blue-700">
                <Sparkles className="w-4 h-4" />
                <span>Tool Suggestions</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Need a specific electrical conversion, battery chemistry preset, or generator sizing scenario? Tell us what tools would save you time on jobsites.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-2 text-emerald-700">
                <CheckCircle className="w-4 h-4" />
                <span>Editorial &amp; Rights</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                For educational citations, syndication, privacy requests, or media inquiries, our publishing editorial desk responds promptly.
              </p>
            </div>
          </div>
        </section>

        {/* Disclaimer Note */}
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-600 space-y-2">
          <p className="font-semibold text-slate-800">
            Electrical Consultation Note:
          </p>
          <p className="leading-relaxed">
            While our engineers are happy to explain mathematical formulas and code references, we cannot provide certified electrical engineering reviews, stamped drawings, or legal site-specific installation advice for individual properties. Please consult a local licensed electrical contractor for physical wiring work.
          </p>
        </div>
      </div>
    </>
  );
}
