import { Metadata } from "next";
import { WattsToAmpsCalculator } from "@/components/calculators/WattsToAmpsCalculator";
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Watts to Amps Calculator (DC, Single-Phase & 3-Phase AC)",
  description:
    "Convert Watts to Amps with our electrical calculator. Supports DC circuits, 120V/240V single-phase AC, and balanced 208V/480V three-phase systems with power factor.",
  keywords: [
    "watts to amps",
    "watts to amps calculator",
    "convert watts to amps",
    "how to calculate amps from watts",
    "watts to amps 120v",
    "watts to amps 12v",
    "watts to amps 240v",
    "3 phase watts to amps",
  ],
  alternates: {
    canonical: "https://calcmypower.com/watts-to-amps-calculator",
  },
  openGraph: {
    title: "Watts to Amps Calculator (DC, Single-Phase & 3-Phase AC) | CalcMyPower",
    description:
      "Accurately convert electrical power in Watts to current in Amperes across DC, AC single-phase, and balanced three-phase systems.",
    url: "https://calcmypower.com/watts-to-amps-calculator",
    type: "website",
  },
};

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
        "In a standard 120V household circuit with a resistive load (power factor = 1.0), divide 1,500 Watts by 120 Volts: Current = 1,500 / 120 = 12.50 Amps. For continuous operation (3 hours or longer), electrical codes limit a 15A circuit to 12.0A (80%). Because 12.5A exceeds 12.0A, a 20A branch circuit is recommended for continuous space heating.",
    },
    {
      question: "Why does 100 Watts produce different Amps on 12V DC compared to 120V AC?",
      answer:
        "Current is inversely proportional to voltage (I = P / V). At 120V AC, 100 Watts requires approximately 0.83 Amps. At 12V DC, that same 100 Watts draws 8.33 Amps—ten times more current.",
    },
    {
      question: "What is power factor, and when should I change it?",
      answer:
        "Power factor (PF) is the ratio of real power (Watts) to apparent power (Volt-Amperes) in AC circuits. Pure resistive loads have a PF of 1.0. Inductive devices with electric motors or compressors typically have a PF between 0.75 and 0.90.",
    },
    {
      question: "What does the 125% continuous-load reference mean?",
      answer:
        "The National Electrical Code defines a continuous load as any load where maximum current is expected to continue for 3 hours or more. Standard overcurrent devices are designed to carry continuous loads up to 80% of their rating. To account for this, engineers size protective equipment for at least 125% of the continuous current (I × 1.25).",
    },
    {
      question: "How do you calculate three-phase Watts to Amps?",
      answer:
        "For a balanced three-phase system using line-to-line voltage (V_LL), divide Watts by the product of the square root of 3 (1.732), the line-to-line voltage, and the power factor: I = P / (√3 × V_LL × PF).",
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
