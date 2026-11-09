import { Metadata } from "next";
import { ThreePhasePowerCalculator } from "@/components/calculators/ThreePhasePowerCalculator";
import { ThreePhasePowerGuideSection } from "@/components/content/ThreePhasePowerGuideSection";
import { THREE_PHASE_FAQS } from "@/lib/calculators/three-phase-power";
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo/schema";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Three-Phase Power Calculator: kW, kVA, Amps",
  description:
    "Calculate 3-phase real power (kW), apparent power (kVA), and line current (Amps). Supports 208V, 240V, and 480V circuits with balanced loads and power factor.",
  path: "/three-phase-power-calculator",
  ogDescription:
    "Calculate 3-phase real power (kW), apparent power (kVA), and line current (Amps). Supports 208V, 240V, and 480V circuits with balanced loads and power factor.",
});

export default function ThreePhasePowerCalculatorPage() {
  const webAppSchema = generateWebApplicationSchema({
    name: "Three Phase Power Calculator",
    description:
      "Calculate 3-phase real power (kW), apparent power (kVA), and line current (Amps). Supports 208V, 240V, and 480V circuits with balanced loads and power factor.",
    url: "https://calcmypower.com/three-phase-power-calculator",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Calculators", url: "https://calcmypower.com/calculators" },
    {
      name: "Three Phase Power Calculator",
      url: "https://calcmypower.com/three-phase-power-calculator",
    },
  ]);

  const faqSchema = generateFaqSchema(THREE_PHASE_FAQS);

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

      <ThreePhasePowerCalculator />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <ThreePhasePowerGuideSection />
      </div>
    </>
  );
}
