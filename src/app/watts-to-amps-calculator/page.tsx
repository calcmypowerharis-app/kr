import { Metadata } from "next";
import { WattsToAmpsCalculator } from "@/components/calculators/WattsToAmpsCalculator";
import { WattsToAmpsGuideSection } from "@/components/content/WattsToAmpsGuideSection";
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo/schema";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { WATTS_TO_AMPS_FAQS } from "@/lib/calculators/watts-to-amps";

export const metadata: Metadata = buildPageMetadata({
  title: "Watts to Amps Calculator - 120V/240V/DC Table",
  description:
    "Convert watts to amps for DC, 120V, and 240V circuits. Features complete conversion table from 37W to 10,000W with NEC breaker and copper wire gauge sizing.",
  path: "/watts-to-amps-calculator",
  ogDescription:
    "Convert watts to amps for DC, 120V, and 240V circuits. Features complete conversion table from 37W to 10,000W with NEC breaker and copper wire gauge sizing.",
});

export default function WattsToAmpsPage() {
  const webAppSchema = generateWebApplicationSchema({
    name: "Watts to Amps Electrical Calculator",
    description:
      "Free online calculator to convert real power in Watts to current in Amperes for DC, single-phase AC, and balanced three-phase AC circuits.",
    url: "https://calcmypower.com/watts-to-amps-calculator",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Calculators", url: "https://calcmypower.com/calculators" },
    {
      name: "Watts to Amps Calculator",
      url: "https://calcmypower.com/watts-to-amps-calculator",
    },
  ]);

  const faqSchema = generateFaqSchema(WATTS_TO_AMPS_FAQS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <WattsToAmpsCalculator />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <WattsToAmpsGuideSection />
      </div>
    </>
  );
}
