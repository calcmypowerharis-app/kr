import { Metadata } from "next";
import { WattsToAmpsCalculator } from "@/components/calculators/WattsToAmpsCalculator";
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo/schema";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Watts to Amps Calculator (DC, Single-Phase & 3-Phase AC)",
  description:
    "Convert Watts to Amps with our electrical calculator. Supports DC circuits, 120V/240V single-phase AC, and balanced 208V/480V three-phase systems with power factor.",
  path: "/watts-to-amps-calculator",
  ogDescription:
    "Convert electrical power in Watts to current in Amperes across DC, AC single-phase, and balanced three-phase systems.",
});

export default function WattsToAmpsPage() {
  const webAppSchema = generateWebApplicationSchema({
    name: "Watts to Amps Electrical Calculator",
    description:
      "Free online calculator to convert real power in Watts to current in Amperes for DC, single-phase AC, and balanced three-phase AC circuits.",
    url: "https://calcmypower.com/watts-to-amps-calculator",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcmypower.com" },
    { name: "Calculators", url: "https://calcmypower.com/calculators" },
    {
      name: "Watts to Amps Calculator",
      url: "https://calcmypower.com/watts-to-amps-calculator",
    },
  ]);

  const faqSchema = generateFaqSchema([
    {
      question: "How do I convert 1,500 Watts to Amps at 120 Volts?",
      answer:
        "In a standard 120V household circuit with a resistive load (power factor = 1.0), divide 1,500 Watts by 120 Volts: Current = 1,500 / 120 = 12.50 Amps. For continuous operation (loads operating 3 hours or more per NEC Article 100), standard non-100%-rated branch breakers are evaluated at 80% (12.0A on a 15A breaker). Because 12.5A exceeds 12.0A, a 20A branch circuit is required for continuous space heating, whereas non-continuous duty operates within a 15A circuit.",
    },
    {
      question: "Why does 100 Watts produce different Amps on 12V DC compared to 120V AC?",
      answer:
        "Current is inversely proportional to voltage (I = P / V). At 120V AC, 100 Watts requires approximately 0.83 Amps. At 12V DC (automotive or solar battery bank), that same 100 Watts draws 8.33 Amps: ten times more current. Higher current creates more resistance and heat, requiring substantially thicker wire.",
    },
    {
      question: "What is power factor, and when should I change it?",
      answer:
        "Power factor (PF) is the ratio of real power (Watts) to apparent power (Volt-Amperes) in AC circuits. Pure resistive loads have a PF of 1.0. Inductive devices with electric motors or compressors (refrigerators, air conditioners, power tools) typically have a PF between 0.75 and 0.90. When equipment nameplate data is available, enter that specific value.",
    },
    {
      question: "What does the 125% continuous-load reference mean?",
      answer:
        "Under National Electrical Code (NEC) Article 100, a continuous load is defined as any load where maximum current is expected to continue for 3 hours or more. Under NEC Sections 210.19(A)(1) and 210.20(A), branch circuit conductors and standard non-100%-rated overcurrent devices must be sized for at least 125% of the continuous load (I × 1.25), which restricts continuous duty to 80% of standard breaker rating. This is an installation sizing rule, not a change in mathematical current or an unconditional safety guarantee.",
    },
    {
      question: "How do you calculate three-phase Watts to Amps?",
      answer:
        "For a balanced three-phase system using line-to-line voltage (V_LL), divide Watts by the product of the square root of 3 (1.732), the line-to-line voltage, and the power factor: I = P / (√3 × V_LL × PF).",
    },
    {
      question: "How do you calculate inverter DC amp draw from AC watts?",
      answer:
        "To calculate how many DC Amps an inverter draws from a battery bank, divide the AC load wattage by the product of battery DC voltage and inverter efficiency: I_DC = P_AC / (V_DC × Efficiency). For example, running a 1,200-Watt appliance through a 12V inverter with 90% efficiency draws approximately 111.1 Amps DC (1,200 / [12 × 0.90]). On a 24V battery bank, that same 1,200W load draws only 55.6 Amps DC, and on a 48V bank it draws 27.8 Amps DC. Always include a safety margin for inverter standby idle draw and peak compressor motor surge.",
    },
  ]);

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

      <WattsToAmpsCalculator />
    </>
  );
}
