import { Metadata } from "next";
import { AmpsToWattsCalculator } from "@/components/calculators/AmpsToWattsCalculator";
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo/schema";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Amps to Watts Calculator (DC, Single & 3-Phase AC)",
  description:
    "Convert amps to watts across DC, single-phase 120V/240V, and three-phase AC circuits. Calculate real power (W), apparent power (VA), and power factor.",
  path: "/amps-to-watts-calculator",
  ogDescription:
    "Convert amps to watts across DC, single-phase 120V/240V, and three-phase AC circuits. Calculate real power (W), apparent power (VA), and power factor.",
});

import { AMPS_TO_WATTS_FAQS } from "@/lib/calculators/amps-to-watts";

export default function AmpsToWattsPage() {
  const webAppSchema = generateWebApplicationSchema({
    name: "Amps to Watts Electrical Calculator",
    description:
      "Free online electrical calculator to convert current in Amperes to real power in Watts and kW for DC, single-phase AC, and balanced three-phase AC circuits.",
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
    </>
  );
}
