import { Metadata } from "next";
import { ElectricityUseCalculator } from "@/components/calculators/ElectricityUseCalculator";
import { ELECTRICITY_USE_FAQS } from "@/lib/calculators/electricity-use";
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo/schema";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Electricity Use Calculator (Calculate kWh & Energy Consumption)",
  description:
    "Calculate appliance electricity use in Wh and kWh from watts, hours, and usage frequency. Estimate daily and monthly energy consumption and optional utility costs.",
  path: "/electricity-use-calculator",
  ogDescription:
    "Free interactive electricity use calculator to estimate daily and monthly energy consumption in kilowatt-hours (kWh) across multiple household appliances.",
  images: [
    {
      url: "https://calcmypower.com/images/calculators/electricity-use-calculator.webp",
      width: 1200,
      height: 675,
      alt: "Photorealistic residential scene with kitchen appliances and a wall-mounted electronic home energy consumption monitor",
    },
  ],
});

export default function ElectricityUseCalculatorPage() {
  const webAppSchema = generateWebApplicationSchema({
    name: "Electricity Use Calculator",
    description:
      "Calculate appliance electricity use in Watt-hours (Wh) and kilowatt-hours (kWh) from rated power, daily operating time, duty cycle, and quantity. Estimate daily and monthly energy consumption.",
    url: "https://calcmypower.com/electricity-use-calculator",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Calculators", url: "https://calcmypower.com/calculators" },
    {
      name: "Electricity Use Calculator",
      url: "https://calcmypower.com/electricity-use-calculator",
    },
  ]);

  const faqSchema = generateFaqSchema(ELECTRICITY_USE_FAQS);

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

      <ElectricityUseCalculator />
    </>
  );
}
