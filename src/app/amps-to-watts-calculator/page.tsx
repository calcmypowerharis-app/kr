import { Metadata } from "next";
import { AmpsToWattsCalculator } from "@/components/calculators/AmpsToWattsCalculator";
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo/schema";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Amps to Watts Calculator (DC, Single-Phase & 3-Phase AC)",
  description:
    "Convert Amps to Watts with our electrical calculator. Calculate real power (Watts), kW, and VA across DC, 120V/240V single-phase, and balanced three-phase AC circuits.",
  path: "/amps-to-watts-calculator",
  ogDescription:
    "Convert electrical current in Amperes to power in Watts and kW across DC, AC single-phase, and balanced three-phase systems.",
});

const FAQ_DATA = [
  {
    question: "How many watts is 15 amps at 120 volts?",
    answer:
      "In a standard 120V single-phase circuit with a resistive load (power factor = 1.0), 15 Amps equals exactly 1,800 Watts (15A × 120V = 1,800W). For continuous loads operating 3 hours or more, electrical codes limit branch circuit loading to 80%, which corresponds to 1,440 Watts.",
  },
  {
    question: "How many watts is 20 amps at 120 volts?",
    answer:
      "At 120 Volts with unity power factor (PF = 1.0), 20 Amps produces 2,400 Watts of electrical power (20A × 120V = 2,400W). Under the standard 80% continuous load rule for circuit breakers, continuous draw should be limited to 1,920 Watts.",
  },
  {
    question: "How do you convert amps to watts?",
    answer:
      "To convert Amps to Watts, multiply current in Amperes by circuit voltage in Volts. For direct current (DC), the formula is P = I × V. For alternating current (AC) single-phase circuits, multiply by the power factor: P = I × V × PF. For balanced three-phase circuits, multiply by the square root of 3 (1.732): P = √3 × V_LL × I × PF.",
  },
  {
    question: "Can volts be converted directly to watts?",
    answer:
      "No. Voltage is electrical potential difference, whereas wattage is the rate of energy consumption. You cannot convert volts directly into watts without knowing circuit current (Amperes) or electrical resistance (Ohms). A 120V outlet draws zero watts until a device drawing current is plugged in.",
  },
  {
    question: "How do you calculate three-phase watts from amps?",
    answer:
      "For a balanced three-phase system using line-to-line voltage, multiply the square root of 3 (approximately 1.732) by line-to-line voltage, current in Amps, and power factor: Watts = √3 × V_LL × Amps × PF. For example, 20 Amps on a 208V three-phase circuit with a power factor of 0.90 yields approximately 6,485 Watts (6.48 kW).",
  },
  {
    question: "What is the difference between watts and volt-amperes (VA)?",
    answer:
      "Watts (W) measures real active power that performs physical work or generates heat. Volt-Amperes (VA) measures apparent power, which is the total circulating voltage and current in an AC circuit. In circuits with motors or compressors, current and voltage are slightly out of phase, making VA higher than Watts (Watts = VA × Power Factor).",
  },
];

export default function AmpsToWattsPage() {
  const webAppSchema = generateWebApplicationSchema({
    name: "Amps to Watts Electrical Calculator",
    description:
      "Free online electrical calculator to convert current in Amperes to real power in Watts and kW for DC, single-phase AC, and balanced three-phase AC circuits.",
    url: "https://calcmypower.com/amps-to-watts-calculator",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Calculators", url: "https://calcmypower.com/calculators" },
    {
      name: "Amps to Watts Calculator",
      url: "https://calcmypower.com/amps-to-watts-calculator",
    },
  ]);

  const faqSchema = generateFaqSchema(FAQ_DATA);

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

      <AmpsToWattsCalculator />
    </>
  );
}
