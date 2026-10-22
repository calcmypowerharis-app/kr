import { Metadata } from "next";
import { ElectricityCostCalculator } from "@/components/calculators/ElectricityCostCalculator";
import { ElectricityBillGuideSection } from "@/components/content/ElectricityBillGuideSection";
import { ELECTRICITY_COST_FAQS } from "@/lib/calculators/electricity-cost";
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo/schema";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Electricity Cost Calculator - Electric Bill Chart",
  description:
    "Calculate electric utility bills and true effective cost per kWh from volumetric usage, energy rates, fixed charges, and taxes. Includes tiered bill examples.",
  path: "/electricity-cost-calculator",
  ogDescription:
    "Calculate electric utility bills and true effective cost per kWh from volumetric usage, energy rates, fixed charges, and taxes. Includes tiered bill examples.",
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <ElectricityBillGuideSection />
      </div>
    </>
  );
}
