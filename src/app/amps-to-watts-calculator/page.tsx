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
      "In a standard 120V single-phase circuit with a resistive load (power factor = 1.0), 15 Amps equals exactly 1,800 Watts of physical power (15A × 120V = 1,800W). For continuous loads operating 3 hours or more on standard non-100%-rated circuit breakers, electrical codes (NEC Article 210) benchmark continuous duty to 80% of rating, which equals 1,440 Watts (12A). Intermittent non-continuous loads may utilize up to the full 1,800 Watts.",
  },
  {
    question: "What is the true power of a 120V circuit operating at 10A with unity power factor?",
    answer:
      "The true power (real active power) is exactly 1,200 Watts (1.20 kW). Using the single-phase AC power formula: P = V × I × PF = 120 Volts × 10 Amperes × 1.0 = 1,200 Watts. Because the circuit operates at unity power factor (PF = 1.0), real power in Watts equals apparent power in Volt-Amperes (1,200 VA). If the power factor were 0.85 (such as an inductive motor load), true power would be 1,020 Watts while apparent power would remain 1,200 VA.",
  },
  {
    question: "How many watts is 10 amps at 120 volts?",
    answer:
      "At 120 Volts with unity power factor (PF = 1.0), 10 Amps equals exactly 1,200 Watts (10A × 120V = 1,200W). Under NEC continuous load sizing guidelines for standard breakers, continuous operation for 3 hours or more is planned to an 80% benchmark of 960 Watts (8A). At 240 Volts, 10 Amps produces 2,400 Watts.",
  },
  {
    question: "How many watts is 20 amps at 120 volts?",
    answer:
      "At 120 Volts with unity power factor (PF = 1.0), 20 Amps produces exactly 2,400 Watts of electrical power (20A × 120V = 2,400W). Under standard NEC branch circuit design rules for non-100%-rated breakers, loads running continuously for 3 hours or more are designed to an 80% benchmark (1,920 Watts or 16A), while non-continuous equipment may draw up to 2,400 Watts.",
  },
  {
    question: "How many watts is 30 amps at 120V and 240V?",
    answer:
      "At 120 Volts (such as a 30A RV hookup or TT-30 receptacle), 30 Amps produces 3,600 Watts (30A × 120V = 3,600W), with an 80% continuous benchmark of 2,880 Watts. At 240 Volts (such as an electric clothes dryer or residential water heater), 30 Amps delivers 7,200 Watts (30A × 240V = 7,200W), with an 80% continuous benchmark of 5,760 Watts.",
  },
  {
    question: "How many watts is 40 amps at 240 volts?",
    answer:
      "At 240 Volts with unity power factor (PF = 1.0), 40 Amps delivers 9,600 Watts (40A × 240V = 9,600W or 9.60 kW). Under the NEC continuous load 80% sizing benchmark, maximum continuous duty on standard 40A breakers is 7,680 Watts (32A). At 120 Volts, 40 Amps delivers 4,800 Watts.",
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
      "For a balanced three-phase system using line-to-line voltage, multiply the square root of 3 (approximately 1.732) by line-to-line voltage, current in Amps, and power factor: Watts = √3 × V_LL × Amps × PF. For example, 20 Amps on a 208V three-phase circuit with a power factor of 0.90 yields approximately 6,485 Watts (6.48 kW). For dedicated polyphase analysis, kVA transformer sizing, and bidirectional solving, use our Three Phase Power Calculator (/three-phase-power-calculator).",
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
