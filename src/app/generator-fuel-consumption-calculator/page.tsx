import { Metadata } from "next";
import { GeneratorFuelCalculator } from "@/components/calculators/GeneratorFuelCalculator";
import { GeneratorFuelGuideSection } from "@/components/content/GeneratorFuelGuideSection";
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo/schema";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Generator Fuel Consumption Calculator",
  description:
    "A 3,500-4,500W generator burns 0.38 gallons per hour at half load - 9.1 gallons a day. Free fuel calculator for gas, propane and diesel.",
  path: "/generator-fuel-consumption-calculator",
  ogDescription:
    "A 3,500-4,500W generator burns 0.38 gallons per hour at half load - 9.1 gallons a day. Free fuel calculator for gas, propane and diesel.",
});

import { GENERATOR_FUEL_FAQS } from "@/lib/calculators/generator-fuel";

export default function GeneratorFuelCalculatorPage() {
  const webAppSchema = generateWebApplicationSchema({
    name: "Generator Fuel Consumption Calculator",
    description:
      "Free online calculator to estimate generator fuel usage, tank runtime, and daily operating cost for gasoline, propane, and natural gas generators.",
    url: "https://calcmypower.com/generator-fuel-consumption-calculator",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Calculators", url: "https://calcmypower.com/calculators" },
    {
      name: "Generator Fuel Consumption",
      url: "https://calcmypower.com/generator-fuel-consumption-calculator",
    },
  ]);

  const faqSchema = generateFaqSchema(GENERATOR_FUEL_FAQS);

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

      <GeneratorFuelCalculator />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <GeneratorFuelGuideSection />
      </div>
    </>
  );
}
