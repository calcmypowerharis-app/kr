import { Metadata } from "next";
import { ThreePhasePowerCalculator } from "@/components/calculators/ThreePhasePowerCalculator";
import { THREE_PHASE_FAQS } from "@/lib/calculators/three-phase-power";
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo/schema";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Three Phase Power Calculator (kW, Amps & Power Factor)",
  description:
    "Calculate 3-phase real power (kW), apparent power (kVA), and line current (Amps). Supports line-to-line (208V, 240V, 480V) and line-to-neutral voltages with power factor.",
  path: "/three-phase-power-calculator",
  ogDescription:
    "Calculate 3-phase real power (kW), apparent power (kVA), and line current (Amps). Supports line-to-line (208V, 240V, 480V) and line-to-neutral voltages with power factor.",
});

export default function ThreePhasePowerCalculatorPage() {
  const webAppSchema = generateWebApplicationSchema({
    name: "Three Phase Power Calculator",
    description:
      "Calculate 3-phase real power (kW), apparent power (kVA), and line current (Amps). Supports line-to-line (208V, 240V, 480V) and line-to-neutral voltages with power factor.",
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
    </>
  );
}
