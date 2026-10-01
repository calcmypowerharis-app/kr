import { Metadata } from "next";
import { SolarSystemSizeCalculator } from "@/components/calculators/SolarSystemSizeCalculator";
import { SOLAR_SYSTEM_SIZE_FAQS } from "@/lib/calculators/solar-system-size";
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo/schema";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Solar System Size Calculator (How Many Solar Panels Do I Need?)",
  description:
    "Calculate the solar system size and number of solar panels needed for your home. Estimate required array kW, panel count, and roof space based on electricity usage and peak sun hours.",
  path: "/solar-system-size-calculator",
  ogDescription:
    "Calculate the solar system size and number of solar panels needed for your home. Estimate required array kW, panel count, and roof space based on electricity usage and peak sun hours.",
});

export default function SolarSystemSizeCalculatorPage() {
  const webAppSchema = generateWebApplicationSchema({
    name: "Solar System Size Calculator",
    description:
      "Calculate the solar system size and number of solar panels needed for your home. Estimate required array kW, panel count, and roof space based on electricity usage and peak sun hours.",
    url: "https://calcmypower.com/solar-system-size-calculator",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Calculators", url: "https://calcmypower.com/calculators" },
    {
      name: "Solar System Size Calculator",
      url: "https://calcmypower.com/solar-system-size-calculator",
    },
  ]);

  const faqSchema = generateFaqSchema(
    SOLAR_SYSTEM_SIZE_FAQS.map((faq) => ({
      question: faq.question,
      answer: faq.fullExplanation,
    }))
  );

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

      <SolarSystemSizeCalculator />
    </>
  );
}
