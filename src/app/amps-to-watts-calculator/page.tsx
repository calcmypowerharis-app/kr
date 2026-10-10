import { Metadata } from "next";
import { AmpsToWattsCalculator } from "@/components/calculators/AmpsToWattsCalculator";
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo/schema";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Amps to Watts Calculator (DC, Single-Phase & 3-Phase AC)",
  description:
    "Convert Amps to Watts with our electrical calculator. Calculate real power (Watts), kW, and VA across DC, 120V/240V single-phase, and balanced three-phase AC circuits.",
  path: "/amps-to-watts-calculator",
  ogDescription:
    "Convert electrical current in Amperes to power in Watts and kW across DC, AC single-phase, and balanced three-phase systems.",
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
