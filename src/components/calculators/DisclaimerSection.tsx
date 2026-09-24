import React from "react";
import { ShieldAlert } from "lucide-react";

interface DisclaimerSectionProps {
  title?: string;
  points?: string[];
}

export const DisclaimerSection: React.FC<DisclaimerSectionProps> = ({
  title = "Electrical Safety & Engineering Disclaimer",
  points = [
    "This calculator provides theoretical run-time estimates based on constant nominal power consumption and manufacturer standard capacity ratings.",
    "Actual runtime will vary based on battery state-of-health (SoH), ambient operating temperature, surge/startup inductive loads (compressors, motors), and inverter quiescent idle current.",
    "High DC current draws create substantial fire risks if undersized wire gauge or incorrect fuse ratings are installed. Always consult the National Electrical Code (NEC Article 480 / 706) and local regulations.",
    "For critical life-support, medical equipment, or high-availability data infrastructure, consult a licensed electrical engineer or certified installer before relying on backup sizing.",
  ],
}) => {
  return (
    <section className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-2.5 mb-3 text-amber-900">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0" />
        <h2 className="text-base md:text-lg font-bold">{title}</h2>
      </div>
      <ul className="list-disc list-inside space-y-2 text-xs md:text-sm text-amber-900/90 leading-relaxed">
        {points.map((p, idx) => (
          <li key={idx}>{p}</li>
        ))}
      </ul>
    </section>
  );
};
