import { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, Cookie, FileText, Mail, Info } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbSchema } from "@/lib/seo/schema";
import { SITE_URL } from "@/lib/seo/registry";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "CalcMyPower privacy policy. Learn how we handle cookies, analytics, and advertising data in accordance with GDPR, CCPA, and Google AdSense guidelines.",
  path: "/privacy",
});

export default function PrivacyPolicyPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Privacy Policy", url: `${SITE_URL}/privacy` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-10">
        <header className="space-y-3 border-b border-slate-200 pb-6">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-medium text-slate-500"
          >
            <Link href="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-slate-800 font-semibold">Privacy Policy</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Last Updated: October 14, 2026 • Effective Date: September 28, 2026
          </p>
        </header>

        {/* Core Privacy Highlights Card */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-6 space-y-3">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-base">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <h2>Zero Personal Equipment Data Harvesting</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            All CalcMyPower engineering calculators operate entirely client-side in your web browser. We never log, transmit, store, or sell your electrical equipment parameters, household wattage numbers, battery specifications, or system designs.
          </p>
        </div>

        <div className="space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Eye className="w-5 h-5 text-slate-700" />
              <span>1. Information We Collect</span>
            </h2>
            <p>
              CalcMyPower does not require user registration, account creation, or passwords. You can access every calculator, formula, and engineering guide anonymously.
            </p>
            <p>
              Like most online publishers, our servers automatically collect standard web server access logs. This technical data includes Internet Protocol (IP) addresses, browser type, Internet Service Provider (ISP), referring and exit pages, platform type, and date and time stamps.
            </p>
            <p>
              This log information is used strictly to diagnose technical server problems, prevent denial-of-service attacks, and ensure website uptime. It is not linked to personally identifiable information.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Cookie className="w-5 h-5 text-slate-700" />
              <span>2. Cookies and Advertising Technologies</span>
            </h2>
            <p>
              We partner with third-party advertising platforms, including Google AdSense, to display non-intrusive advertisements that support our free engineering tools.
            </p>
            <p>
              Google uses cookies to serve ads based on your prior visits to this website and other sites across the internet. In particular, Google uses advertising cookies (such as the DoubleClick DART cookie) to serve ads based on your visit to CalcMyPower.com and other websites on the internet.
            </p>
            <p>
              You can opt out of personalized advertising by visiting{" "}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              >
                Google Ad Settings
              </a>
              . You may also opt out of third-party vendor use of cookies for personalized advertising by visiting{" "}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              >
                www.aboutads.info
              </a>
              .
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-700" />
              <span>3. Amazon Associates Affiliate Disclosure</span>
            </h2>
            <p>
              CalcMyPower.com is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
            </p>
            <p>
              When you click on an affiliate product link and make a qualifying purchase, we may receive a small referral commission at zero additional cost to you.
            </p>
            <p>
              We recommend physical equipment solely based on engineering merit, National Electrical Code (NEC) compliance, and electrical sizing requirements.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-slate-700" />
              <span>4. Your Privacy Rights (CCPA, CPRA &amp; GDPR)</span>
            </h2>
            <p>
              If you reside in California, the European Economic Area, or other jurisdictions with comprehensive data protection laws, you are entitled to specific consumer rights:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>
                <strong>Right to Know:</strong> You may request information regarding the categories of personal data collected, disclosed, or sold.
              </li>
              <li>
                <strong>Right to Deletion:</strong> You may request the deletion of any personal data collected from you, subject to legal recordkeeping exemptions.
              </li>
              <li>
                <strong>Do Not Sell My Info:</strong> CalcMyPower does not sell or rent personal information to data brokers or commercial third parties.
              </li>
              <li>
                <strong>Non-Discrimination:</strong> We do not restrict access to calculators or charge different rates for exercising your privacy rights.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Info className="w-5 h-5 text-slate-700" />
              <span>5. External Links</span>
            </h2>
            <p>
              Our sizing guides and documentation reference external engineering resources, including the National Electrical Code (NFPA 70), IEEE standards, and the National Renewable Energy Laboratory (NREL).
            </p>
            <p>
              CalcMyPower is not responsible for the privacy practices, content, or cookie policies of third-party websites. We encourage you to review their policies upon navigating outside our domain.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Mail className="w-5 h-5 text-slate-700" />
              <span>6. Contact Information</span>
            </h2>
            <p>
              If you have questions regarding this Privacy Policy, cookie settings, or data practices, contact us at:
            </p>
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-sm font-mono text-slate-800">
              Email: contact@calcmypower.com
            </div>
            <p>
              We respond to all verified privacy and data requests within 30 calendar days.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
