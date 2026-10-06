import { Metadata } from "next";
import { ElectricityCostCalculator } from "@/components/calculators/ElectricityCostCalculator";
import { ELECTRICITY_COST_FAQS } from "@/lib/calculators/electricity-cost";
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo/schema";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Electricity Cost Calculator (Monthly kWh & Electric Bill Breakdown)",
  description:
    "Calculate your estimated monthly electricity cost from kWh usage, energy rates ($/kWh), fixed customer charges, and taxes. Compare effective rates.",
  path: "/electricity-cost-calculator",
  ogDescription:
    "Free interactive electricity cost calculator to estimate monthly electric utility bills, breakdown volumetric supply vs fixed grid fees, and calculate true effective cost per kWh.",
  images: [
    {
      url: "https://calcmypower.com/images/calculators/electricity-cost-calculator.webp",
      width: 1200,
      height: 675,
      alt: "Technical diagram illustrating monthly electric utility bill cost breakdown, volumetric kWh charges, fixed customer fees, and effective rate calculation",
    },
  ],
});

export default function ElectricityCostCalculatorPage() {
  const webAppSchema = generateWebApplicationSchema({
    name: "Electricity Cost Calculator",
    description:
      "Calculate monthly electric utility bills and true effective cost per kilowatt-hour from volumetric usage, energy rates, fixed customer charges, delivery riders, and taxes.",
    url: "https://calcmypower.com/electricity-cost-calculator",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Calculators", url: "https://calcmypower.com/calculators" },
    {
      name: "Electricity Cost Calculator",
      url: "https://calcmypower.com/electricity-cost-calculator",
    },
  ]);

  const faqSchema = generateFaqSchema(ELECTRICITY_COST_FAQS);

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

      <ElectricityCostCalculator />
    </>
  );
}
