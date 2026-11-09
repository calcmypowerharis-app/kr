import { Metadata } from "next";
import { SolarBatteryCalculator } from "@/components/calculators/SolarBatteryCalculator";
import { SOLAR_BATTERY_FAQS } from "@/lib/calculators/solar-battery";
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo/schema";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Solar Battery Storage Sizing Calculator",
  description:
    "Calculate solar battery storage in kWh and Amp-hours for off-grid or backup systems based on daily energy use, days of autonomy, and inverter efficiency.",
  path: "/solar-battery-calculator",
  ogDescription:
    "Calculate solar battery storage in kWh and Amp-hours for off-grid or backup systems based on daily energy use, days of autonomy, and inverter efficiency.",
});

export default function SolarBatteryPage() {
  const webAppSchema = generateWebApplicationSchema({
    name: "Solar Battery Calculator",
    description:
      "Calculate solar battery storage in kWh and Amp-hours for off-grid or backup systems based on daily energy use, days of autonomy, and inverter efficiency.",
    url: "https://calcmypower.com/solar-battery-calculator",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Calculators", url: "https://calcmypower.com/calculators" },
    {
      name: "Solar Battery Calculator",
      url: "https://calcmypower.com/solar-battery-calculator",
    },
  ]);

  const faqSchema = generateFaqSchema(SOLAR_BATTERY_FAQS);

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

      <SolarBatteryCalculator />
    </>
  );
}
