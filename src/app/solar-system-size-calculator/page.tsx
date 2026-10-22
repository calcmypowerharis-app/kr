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
  title: "Solar System Size Calculator (Array kW & Panel Count)",
  description:
    "Calculate solar system size and panel count for your home. Estimate array kW, module count, and roof space from daily kWh use and peak sun hours.",
  path: "/solar-system-size-calculator",
  ogDescription:
    "Calculate solar system size and panel count for your home. Estimate array kW, module count, and roof space from daily kWh use and peak sun hours.",
});

export default function SolarSystemSizeCalculatorPage() {
  const webAppSchema = generateWebApplicationSchema({
    name: "Solar System Size Calculator",
    description:
      "Calculate solar system size and panel count for your home. Estimate array kW, module count, and roof space from daily kWh use and peak sun hours.",
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
