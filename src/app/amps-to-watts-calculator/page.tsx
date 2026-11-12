import { Metadata } from "next";
import { AmpsToWattsCalculator } from "@/components/calculators/AmpsToWattsCalculator";
import { AmpsToWattsGuideSection } from "@/components/content/AmpsToWattsGuideSection";
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo/schema";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { AMPS_TO_WATTS_FAQS } from "@/lib/calculators/amps-to-watts";

export const metadata: Metadata = buildPageMetadata({
  title: "Amps to Watts Calculator: 120V, 240V, DC",
  description:
    "Find real power in watts and kW across 12V DC, 120V, and 240V AC circuits with the NEC 80% continuous limit.",
  path: "/amps-to-watts-calculator",
  ogDescription:
    "Find real power in watts and kW across 12V DC, 120V, and 240V AC circuits with the NEC 80% continuous limit.",
});

export default function AmpsToWattsPage() {
  const webAppSchema = generateWebApplicationSchema({
    name: "Amps to Watts Electrical Calculator",
    description:
      "Convert amps to watts across 12V DC, 120V, 240V AC, and 3-phase circuits. Calculate real power in Watts and kW with NEC continuous-load limits from 1A to 200A.",
    url: "https://calcmypower.com/amps-to-watts-calculator",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Calculators", url: "https://calcmypower.com/calculators" },
    {
      name: "Amps to Watts Calculator",
      url: "https://calcmypower.com/amps-to-watts-calculator",
    },
  ]);

  const faqSchema = generateFaqSchema(AMPS_TO_WATTS_FAQS);

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

      <AmpsToWattsCalculator />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <AmpsToWattsGuideSection />
      </div>
    </>
  );
}
