import { Metadata } from "next";
import { SolarChargeControllerCalculator } from "@/components/calculators/SolarChargeControllerCalculator";
import { SolarChargeControllerGuideSection } from "@/components/content/SolarChargeControllerGuideSection";
import { SOLAR_CHARGE_CONTROLLER_FAQS } from "@/lib/calculators/solar-charge-controller";
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo/schema";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Solar Charge Controller Calculator (MPPT & PWM Sizing)",
  description:
    "Calculate solar battery charge controller size for 12V, 24V, and 48V systems. Size MPPT and PWM units using array wattage, short-circuit current, and cold Voc.",
  path: "/solar-charge-controller-calculator",
  ogDescription:
    "Calculate solar battery charge controller size for 12V, 24V, and 48V systems. Size MPPT and PWM units using array wattage, short-circuit current, and cold Voc.",
});

export default function SolarChargeControllerPage() {
  const webAppSchema = generateWebApplicationSchema({
    name: "Solar Charge Controller Calculator",
    description:
      "Calculate solar battery charge controller size for 12V, 24V, and 48V systems. Size MPPT and PWM units using array wattage, short-circuit current, and cold Voc.",
    url: "https://calcmypower.com/solar-charge-controller-calculator",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Calculators", url: "https://calcmypower.com/calculators" },
    {
      name: "Solar Charge Controller Calculator",
      url: "https://calcmypower.com/solar-charge-controller-calculator",
    },
  ]);

  const faqSchema = generateFaqSchema(SOLAR_CHARGE_CONTROLLER_FAQS);

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

      <SolarChargeControllerCalculator />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <SolarChargeControllerGuideSection />
      </div>
    </>
  );
}
