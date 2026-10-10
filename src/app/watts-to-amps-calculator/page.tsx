import { Metadata } from "next";
import { WattsToAmpsCalculator } from "@/components/calculators/WattsToAmpsCalculator";
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo/schema";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { WATTS_TO_AMPS_FAQS } from "@/lib/calculators/watts-to-amps";

export const metadata: Metadata = buildPageMetadata({
  title: "Watts to Amps Calculator (DC, Single-Phase & 3-Phase AC)",
  description:
    "Convert Watts to Amps with our electrical calculator. Supports DC circuits, 120V/240V single-phase AC, and balanced 208V/480V three-phase systems with power factor.",
  path: "/watts-to-amps-calculator",
  ogDescription:
    "Convert electrical power in Watts to current in Amperes across DC, AC single-phase, and balanced three-phase systems.",
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
    </>
  );
}
