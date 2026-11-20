import { Metadata } from "next";
import { VoltageDropCalculator } from "@/components/calculators/VoltageDropCalculator";
import { VOLTAGE_DROP_FAQS } from "@/lib/calculators/voltage-drop";
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo/schema";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Voltage Drop Calculator: Wire Sizing Tool",
  description:
    "A 16A tool 75 ft away on 12 AWG loses 4.75V (3.96%) - over the NEC 3% limit. 10 AWG drops it to 2.48%. Free voltage drop calculator.",
  path: "/voltage-drop-calculator",
  ogDescription:
    "A 16A tool 75 ft away on 12 AWG loses 4.75V (3.96%) - over the NEC 3% limit. 10 AWG drops it to 2.48%. Free voltage drop calculator.",
});

export default function VoltageDropCalculatorPage() {
  const webAppSchema = generateWebApplicationSchema({
    name: "Voltage Drop Calculator",
    description:
      "Calculate voltage drop for DC, single-phase, and three-phase circuits. Determine voltage loss, percentage drop, and receiving voltage based on current, distance, conductor material, and wire size.",
    url: "https://calcmypower.com/voltage-drop-calculator",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Calculators", url: "https://calcmypower.com/calculators" },
    {
      name: "Voltage Drop Calculator",
      url: "https://calcmypower.com/voltage-drop-calculator",
    },
  ]);

  const faqSchema = generateFaqSchema(VOLTAGE_DROP_FAQS);

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

      <VoltageDropCalculator />
    </>
  );
}
