import { Metadata } from "next";
import { SolarSystemSizeCalculator } from "@/components/calculators/SolarSystemSizeCalculator";
import { SolarSystemSizingGuideSection } from "@/components/content/SolarSystemSizingGuideSection";
import { SOLAR_SYSTEM_SIZE_FAQS } from "@/lib/calculators/solar-system-size";
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo/schema";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Solar System Size Calculator - Solar PV Array kW & Panel Sizing",
  description:
    "Calculate solar PV system size, array kW capacity, panel count, and required roof space from monthly kWh usage and peak sun hours. Based on NREL PVWatts derates.",
  path: "/solar-system-size-calculator",
  ogDescription:
    "Calculate solar PV system size, array kW capacity, panel count, and required roof space from monthly kWh usage and peak sun hours. Based on NREL PVWatts derates.",
});

export default function SolarSystemSizeCalculatorPage() {
  const webAppSchema = generateWebApplicationSchema({
    name: "Solar System Size Calculator",
    description:
      "Calculate solar PV system size, array kW capacity, panel count, and required roof space from monthly kWh usage and peak sun hours based on NREL PVWatts derates.",
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <SolarSystemSizingGuideSection />
      </div>
    </>
  );
}
