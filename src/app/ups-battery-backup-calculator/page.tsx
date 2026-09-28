import { Metadata } from "next";
import { UpsCalculator } from "@/components/calculators/UpsCalculator";
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo/schema";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "UPS Battery Backup Run-Time Hours Calculator",
  description:
    "Estimate uninterruptible power supply (UPS) backup hours and battery run-time from appliance wattage, battery voltage, and Amp-hour capacity.",
  path: "/ups-battery-backup-calculator",
  ogTitle: "UPS & Battery Backup Run-Time Calculator | CalcMyPower",
  ogDescription:
    "Estimate how many hours your UPS or battery backup system will run connected equipment during a power outage.",
});

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
        "As a practical planning margin, size your standalone inverter or UPS continuous wattage rating at least 25% above your total continuous load (Continuous Load × 1.25). For example, a 400W continuous load calls for at least a 500W continuous-rated inverter. While NEC branch-circuit rules apply a 125% factor to continuous circuit loads running 3 hours or more, actual UPS and inverter sizing also depends on manufacturer continuous ratings, power factor (VA), and appliance startup surges.",
    },
    {
      question: "Why does my lead-acid UPS battery die faster than the calculator says?",
      answer:
        "Lead-acid batteries suffer from Peukert's effect: the faster you discharge them (high wattage loads), the lower their effective capacity becomes. If you pull a heavy load in under 2 hours, effective capacity can drop by up to 30%.",
    },
    {
      question: "Can I replace standard UPS lead-acid batteries with LiFePO4 batteries?",
      answer:
        "In many consumer UPS units, drop-in replacement 12V LiFePO4 batteries work well if the built-in charging voltage profile is compatible (typically 13.8V float). Verify that the battery's Battery Management System (BMS) can support the maximum discharge current.",
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
