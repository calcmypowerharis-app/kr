import { Metadata } from "next";
import { GeneratorFuelCalculator } from "@/components/calculators/GeneratorFuelCalculator";
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo/schema";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Generator Fuel Consumption Calculator",
  description:
    "Estimate your portable or standby generator's fuel usage per hour. Calculate total fuel needed for 24-hour runtimes and operating cost for gas, propane, and diesel.",
  path: "/generator-fuel-consumption-calculator",
  ogDescription:
    "Calculate portable and standby generator fuel consumption per hour, total runtime, and operating cost based on common manufacturer specs.",
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
    </>
  );
}
