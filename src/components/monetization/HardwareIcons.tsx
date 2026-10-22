import React from "react";
import { HardwareIconName } from "@/lib/monetization/hardware-catalog";

interface HardwareIconProps {
  name: HardwareIconName;
  className?: string;
}

export const HardwareIcon: React.FC<HardwareIconProps> = ({
  name,
  className = "w-16 h-16",
}) => {
  switch (name) {
    case "inverter-generator":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <rect x="8" y="18" width="48" height="34" rx="8" fill="#1E293B" stroke="#0EA5E9" strokeWidth="2" />
          <path d="M18 18V12C18 10.8954 18.8954 10 20 10H44C45.1046 10 46 10.8954 46 12V18" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="14" y="24" width="22" height="16" rx="3" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
          <circle cx="20" cy="30" r="2" fill="#22C55E" />
          <circle cx="26" cy="30" r="2" fill="#EAB308" />
          <circle cx="32" cy="30" r="2" fill="#EF4444" />
          <rect x="18" y="34" width="6" height="4" rx="1" fill="#38BDF8" />
          <rect x="26" y="34" width="6" height="4" rx="1" fill="#38BDF8" />
          <circle cx="45" cy="32" r="6" fill="#0F172A" stroke="#F59E0B" strokeWidth="2" />
          <path d="M43 32L47 32M45 30L45 34" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="12" y="48" width="10" height="4" rx="2" fill="#64748B" />
          <rect x="42" y="48" width="10" height="4" rx="2" fill="#64748B" />
        </svg>
      );

    case "standby-generator":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <rect x="6" y="16" width="52" height="38" rx="6" fill="#334155" stroke="#64748B" strokeWidth="2" />
          <path d="M6 24H58" stroke="#475569" strokeWidth="1.5" />
          <line x1="12" y1="30" x2="28" y2="30" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="36" x2="28" y2="36" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="42" x2="28" y2="42" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <rect x="36" y="28" width="16" height="18" rx="3" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
          <circle cx="44" cy="34" r="2" fill="#22C55E" />
          <rect x="40" y="39" width="8" height="4" rx="1" fill="#F59E0B" />
          <rect x="4" y="52" width="56" height="4" rx="2" fill="#1E293B" stroke="#0F172A" />
        </svg>
      );

    case "lifepo4-battery":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <rect x="8" y="20" width="48" height="34" rx="6" fill="#0F172A" stroke="#22C55E" strokeWidth="2" />
          <rect x="14" y="14" width="8" height="6" rx="1.5" fill="#EF4444" stroke="#DC2626" />
          <rect x="42" y="14" width="8" height="6" rx="1.5" fill="#334155" stroke="#1E293B" />
          <line x1="16" y1="17" x2="20" y2="17" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="18" y1="15" x2="18" y2="19" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="44" y1="17" x2="48" y2="17" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="14" y="28" width="36" height="16" rx="3" fill="#1E293B" stroke="#334155" strokeWidth="1" />
          <path d="M28 32L24 37H30L26 42" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <text x="33" y="39" fill="#22C55E" fontSize="7" fontWeight="bold" fontFamily="sans-serif">
            LiFePO4
          </text>
        </svg>
      );

    case "ups-tower":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <rect x="18" y="10" width="28" height="46" rx="5" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
          <rect x="24" y="16" width="16" height="14" rx="2" fill="#0284C7" />
          <text x="26" y="24" fill="#FFFFFF" fontSize="6" fontWeight="bold" fontFamily="monospace">
            120V
          </text>
          <text x="26" y="28" fill="#FDE047" fontSize="5" fontWeight="bold" fontFamily="monospace">
            [||||]
          </text>
          <circle cx="32" cy="36" r="3" fill="#1E293B" stroke="#22C55E" strokeWidth="1.5" />
          <line x1="24" y1="44" x2="40" y2="44" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
          <line x1="24" y1="48" x2="40" y2="48" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "kill-a-watt":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <rect x="14" y="8" width="36" height="48" rx="8" fill="#F8FAFC" stroke="#0284C7" strokeWidth="2" />
          <rect x="20" y="14" width="24" height="14" rx="2" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
          <text x="23" y="24" fill="#0F172A" fontSize="7" fontWeight="bold" fontFamily="monospace">
            120.4W
          </text>
          <circle cx="22" cy="35" r="2.5" fill="#0284C7" />
          <circle cx="28.5" cy="35" r="2.5" fill="#0284C7" />
          <circle cx="35" cy="35" r="2.5" fill="#0284C7" />
          <circle cx="41.5" cy="35" r="2.5" fill="#0284C7" />
          <rect x="24" y="42" width="16" height="10" rx="3" fill="#CBD5E1" stroke="#64748B" strokeWidth="1" />
          <rect x="28" y="45" width="2" height="4" rx="0.5" fill="#0F172A" />
          <rect x="34" y="45" width="2" height="4" rx="0.5" fill="#0F172A" />
          <circle cx="32" cy="50" r="1.5" fill="#0F172A" />
        </svg>
      );

    case "panel-monitor":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <rect x="10" y="16" width="44" height="36" rx="6" fill="#1E293B" stroke="#6366F1" strokeWidth="2" />
          <circle cx="22" cy="28" r="4" fill="#0F172A" stroke="#22C55E" strokeWidth="2" />
          <circle cx="34" cy="28" r="4" fill="#0F172A" stroke="#F59E0B" strokeWidth="2" />
          <circle cx="46" cy="28" r="4" fill="#0F172A" stroke="#EF4444" strokeWidth="2" />
          <path d="M16 42H48" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
          <path d="M22 16V10M34 16V8M46 16V10" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          <path d="M20 8C20 6.89543 20.8954 6 22 6H24" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "clamp-meter":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <circle cx="32" cy="18" r="10" stroke="#F59E0B" strokeWidth="3" fill="none" />
          <path d="M29 18H35" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <rect x="22" y="24" width="20" height="34" rx="4" fill="#1E293B" stroke="#F59E0B" strokeWidth="1.5" />
          <circle cx="32" cy="33" r="4" fill="#0F172A" stroke="#E2E8F0" strokeWidth="1" />
          <line x1="32" y1="33" x2="34" y2="31" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="25" y="41" width="14" height="8" rx="1.5" fill="#E2E8F0" />
          <text x="27" y="47" fill="#0F172A" fontSize="5" fontWeight="bold" fontFamily="monospace">
            19.8A
          </text>
        </svg>
      );

    case "mppt-controller":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <rect x="12" y="12" width="40" height="42" rx="5" fill="#1E293B" stroke="#0284C7" strokeWidth="2" />
          <line x1="16" y1="17" x2="48" y2="17" stroke="#334155" strokeWidth="1.5" />
          <line x1="16" y1="21" x2="48" y2="21" stroke="#334155" strokeWidth="1.5" />
          <line x1="16" y1="25" x2="48" y2="25" stroke="#334155" strokeWidth="1.5" />
          <rect x="18" y="29" width="28" height="14" rx="2" fill="#0F172A" stroke="#0284C7" strokeWidth="1" />
          <text x="21" y="38" fill="#38BDF8" fontSize="6" fontWeight="bold" fontFamily="monospace">
            MPPT 98%
          </text>
          <circle cx="20" cy="48" r="1.5" fill="#22C55E" />
          <circle cx="26" cy="48" r="1.5" fill="#22C55E" />
          <circle cx="32" cy="48" r="1.5" fill="#F59E0B" />
          <circle cx="38" cy="48" r="1.5" fill="#F59E0B" />
          <circle cx="44" cy="48" r="1.5" fill="#38BDF8" />
        </svg>
      );

    case "solar-panel":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <polygon points="14,14 50,14 56,50 8,50" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
          <line x1="32" y1="14" x2="32" y2="50" stroke="#38BDF8" strokeWidth="1.5" />
          <line x1="11" y1="32" x2="53" y2="32" stroke="#38BDF8" strokeWidth="1.5" />
          <line x1="23" y1="14" x2="20" y2="50" stroke="#1E293B" strokeWidth="1" />
          <line x1="41" y1="14" x2="44" y2="50" stroke="#1E293B" strokeWidth="1" />
          <path d="M12 50L6 58M52 50L58 58" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    default:
      return null;
  }
};
