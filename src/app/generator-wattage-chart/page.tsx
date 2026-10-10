import { Metadata } from "next";
import { GeneratorWattageChart } from "@/components/calculators/GeneratorWattageChart";
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo/schema";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { GENERATOR_WATTAGE_CHART_FAQS } from "@/lib/calculators/generator-wattage-chart";

export const metadata: Metadata = buildPageMetadata({
  title: "Generator Wattage Chart (Running & Starting Watts by Appliance)",
  description:
    "Comprehensive generator wattage chart with typical running and starting surge watts for 35+ appliances, workshop tools, and HVAC equipment. Reference and compare power demands.",
  path: "/generator-wattage-chart",
  ogDescription:
    "Look up typical running and starting surge watts for 35+ home appliances and tools. Compare baseline continuous power and motor inrush requirements.",
});

export default function GeneratorWattageChartPage() {
  const webAppSchema = generateWebApplicationSchema({
    name: "Generator Wattage Chart & Reference Tool",
    description:
      "Interactive appliance generator wattage chart and power reference tool. Compare running watts, motor startup surges, and typical voltages across 35+ household appliances.",
    url: "https://calcmypower.com/generator-wattage-chart",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Calculators", url: "https://calcmypower.com/calculators" },
    {
      name: "Generator Wattage Chart",
      url: "https://calcmypower.com/generator-wattage-chart",
    },
  ]);

  const faqSchema = generateFaqSchema(GENERATOR_WATTAGE_CHART_FAQS);

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

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <GeneratorWattageChart />
      </div>
    </>
  );
}
