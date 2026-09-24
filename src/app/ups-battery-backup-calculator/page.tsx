import { Metadata } from "next";
import { UpsCalculator } from "@/components/calculators/UpsCalculator";
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "UPS Battery Backup Run-Time Hours Calculator",
  description:
    "Accurately calculate uninterruptible power supply (UPS) backup hours and battery run-time based on appliance wattage, battery voltage, and Amp-hour capacity.",
  alternates: {
    canonical: "https://calcmypower.com/ups-battery-backup-calculator",
  },
  openGraph: {
    title: "UPS & Battery Backup Run-Time Calculator | CalcMyPower",
    description:
      "Find out exactly how many hours your UPS or battery backup system will run your appliances during a power outage.",
    url: "https://calcmypower.com/ups-battery-backup-calculator",
    type: "website",
  },
};

export default function UpsCalculatorPage() {
  const webAppSchema = generateWebApplicationSchema({
    name: "UPS Battery Backup Run-Time Calculator",
    description:
      "Online calculator to estimate battery backup run-time hours for uninterruptible power supplies, inverters, and battery banks.",
    url: "https://calcmypower.com/ups-battery-backup-calculator",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Calculators", url: "https://calcmypower.com/calculators" },
    {
      name: "UPS Battery Backup Run-Time Calculator",
      url: "https://calcmypower.com/ups-battery-backup-calculator",
    },
  ]);

  const faqSchema = generateFaqSchema([
    {
      question: "How many hours will a 100Ah battery run an uninterruptible power supply (UPS)?",
      answer:
        "A 12V 100Ah LiFePO4 battery providing 918 usable Watt-hours will run a 100W load for approximately 9.1 hours. A standard lead-acid 100Ah battery with a 50% depth of discharge will run that same 100W load for approximately 5.1 hours.",
    },
    {
      question: "What size inverter do I need for my UPS backup?",
      answer:
        "Under National Electrical Code (NEC) continuous duty guidelines, size your inverter at least 25% larger than your total continuous wattage load (Continuous Load × 1.25).",
    },
  ]);

  return (
    <>
      {/* Schema.org Structured Data */}
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

      <UpsCalculator />
    </>
  );
}
