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
  title: "Solar System Size Calculator: kW & Panels",
  description:
    "Calculate solar array kW and roof space from monthly energy use, peak sun hours, and panel wattage using an adjustable default 78% planning performance factor.",
  path: "/solar-system-size-calculator",
  ogDescription:
    "Calculate solar array kW and roof space from monthly energy use, peak sun hours, and panel wattage using an adjustable default 78% planning performance factor.",
});

export default function SolarSystemSizeCalculatorPage() {
  const webAppSchema = generateWebApplicationSchema({
    name: "Solar System Size Calculator",
    description:
      "Calculate solar array kW and roof space from monthly energy use, peak sun hours, and panel wattage using an adjustable default 78% planning performance factor.",
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
