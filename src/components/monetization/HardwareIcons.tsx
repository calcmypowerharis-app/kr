import React from "react";
import { HardwareIconName } from "@/lib/monetization/hardware-catalog";

interface HardwareIconProps {
  name: HardwareIconName;
  className?: string;
}

export const HardwareIcon: React.FC<HardwareIconProps> = ({
  name,
  className = "w-full h-24",
}) => {
  switch (name) {
    case "lifepo4-battery":
      return (
        <svg viewBox="0 0 160 100" fill="none" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="batBody" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="batTop" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
            <linearGradient id="termPos" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#991B1B" />
            </linearGradient>
            <linearGradient id="termNeg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#64748B" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
            <linearGradient id="brass" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FCD34D" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="bmsGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <filter id="batShadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.18" />
            </filter>
          </defs>

          {/* Base Shadow */}
          <ellipse cx="80" cy="88" rx="60" ry="7" fill="#0F172A" fillOpacity="0.08" />

          {/* Main Battery Enclosure */}
          <g filter="url(#batShadow)">
            <rect x="25" y="32" width="110" height="52" rx="7" fill="url(#batBody)" stroke="#475569" strokeWidth="1.5" />
            {/* Top Cover Section */}
            <rect x="25" y="32" width="110" height="15" rx="7" fill="url(#batTop)" />
            <line x1="25" y1="47" x2="135" y2="47" stroke="#0F172A" strokeWidth="1.5" />

            {/* Recessed Side Handles */}
            <rect x="21" y="44" width="4" height="20" rx="2" fill="#1E293B" />
            <rect x="135" y="44" width="4" height="20" rx="2" fill="#1E293B" />

            {/* Brass Terminals with Insulated Bases */}
            {/* Positive (+) Terminal */}
            <rect x="42" y="24" width="18" height="9" rx="3" fill="url(#termPos)" />
            <rect x="48" y="19" width="6" height="6" rx="1.5" fill="url(#brass)" stroke="#B45309" strokeWidth="0.75" />
            <line x1="48" y1="28.5" x2="54" y2="28.5" stroke="#FFFFFF" strokeWidth="1.75" strokeLinecap="round" />
            <line x1="51" y1="25.5" x2="51" y2="31.5" stroke="#FFFFFF" strokeWidth="1.75" strokeLinecap="round" />

            {/* Negative (-) Terminal */}
            <rect x="100" y="24" width="18" height="9" rx="3" fill="url(#termNeg)" />
            <rect x="106" y="19" width="6" height="6" rx="1.5" fill="url(#brass)" stroke="#B45309" strokeWidth="0.75" />
            <line x1="106" y1="28.5" x2="112" y2="28.5" stroke="#FFFFFF" strokeWidth="1.75" strokeLinecap="round" />

            {/* Digital BMS Screen */}
            <rect x="48" y="55" width="64" height="20" rx="4" fill="#020617" stroke="#334155" strokeWidth="1" />
            {/* Battery Level Segments */}
            <rect x="54" y="60" width="28" height="10" rx="2" fill="#1E293B" stroke="#059669" strokeWidth="0.75" />
            <rect x="56" y="62" width="6" height="6" rx="1" fill="#10B981" />
            <rect x="63" y="62" width="6" height="6" rx="1" fill="#10B981" />
            <rect x="70" y="62" width="6" height="6" rx="1" fill="#10B981" />
            <rect x="82" y="63" width="2" height="4" rx="0.5" fill="#059669" />

            {/* BMS Status Indicators */}
            <circle cx="94" cy="65" r="2.5" fill="#10B981" />
            <circle cx="103" cy="65" r="2.5" fill="#38BDF8" />
          </g>
        </svg>
      );

    case "ups-tower":
      return (
        <svg viewBox="0 0 160 100" fill="none" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="upsBody" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="40%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="upsScreen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>
            <filter id="upsShadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.18" />
            </filter>
          </defs>

          {/* Base Shadow */}
          <ellipse cx="80" cy="89" rx="42" ry="6" fill="#0F172A" fillOpacity="0.08" />

          {/* Tower Chassis */}
          <g filter="url(#upsShadow)">
            <rect x="52" y="14" width="56" height="72" rx="8" fill="url(#upsBody)" stroke="#475569" strokeWidth="1.5" />

            {/* Top Bevel Highlight */}
            <path d="M54 20C54 16.6863 56.6863 14 60 14H100C103.314 14 106 16.6863 106 20V24H54V20Z" fill="#475569" fillOpacity="0.3" />

            {/* Glowing Multifunction LCD Screen */}
            <rect x="62" y="24" width="36" height="24" rx="4" fill="#020617" stroke="#0284C7" strokeWidth="1.5" />
            <rect x="65" y="27" width="30" height="18" rx="2" fill="url(#upsScreen)" />

            {/* Sine Wave & Bar Graphics on LCD */}
            <path d="M68 36 Q 72 30, 76 36 T 84 36" stroke="#FFFFFF" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <rect x="86" y="30" width="3" height="3" rx="0.5" fill="#FDE047" />
            <rect x="86" y="34" width="3" height="3" rx="0.5" fill="#10B981" />
            <rect x="86" y="38" width="3" height="3" rx="0.5" fill="#10B981" />

            {/* Illuminated Power Button Ring */}
            <circle cx="80" cy="56" r="6" fill="#0F172A" stroke="#10B981" strokeWidth="1.5" />
            <circle cx="80" cy="56" r="3" fill="#10B981" />
            <line x1="80" y1="52" x2="80" y2="55" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />

            {/* Lower Ventilation Slots */}
            <line x1="64" y1="68" x2="96" y2="68" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
            <line x1="64" y1="73" x2="96" y2="73" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
            <line x1="64" y1="78" x2="96" y2="78" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      );

    case "inverter-generator":
      return (
        <svg viewBox="0 0 160 100" fill="none" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="genShell" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="60%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <linearGradient id="amberAccent" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <filter id="genShadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.18" />
            </filter>
          </defs>

          {/* Base Shadow */}
          <ellipse cx="80" cy="89" rx="55" ry="6" fill="#0F172A" fillOpacity="0.08" />

          {/* Suitcase Generator Enclosure */}
          <g filter="url(#genShadow)">
            <rect x="30" y="26" width="100" height="58" rx="14" fill="url(#genShell)" stroke="#334155" strokeWidth="1.5" />

            {/* Amber Racing Accent Stripe */}
            <path d="M30 42 Q 80 46 130 42 L 130 48 Q 80 52 30 48 Z" fill="url(#amberAccent)" />

            {/* Molded Ergonomic Carry Handle */}
            <path d="M50 26 V 16 C 50 13 54 11 58 11 H 102 C 106 11 110 13 110 16 V 26" stroke="url(#amberAccent)" strokeWidth="4.5" strokeLinecap="round" />
            <rect x="66" y="9" width="28" height="6" rx="2" fill="#1E293B" stroke="#F59E0B" strokeWidth="1" />

            {/* Recessed Electrical Control Panel */}
            <rect x="40" y="52" width="46" height="26" rx="4" fill="#020617" stroke="#475569" strokeWidth="1" />
            {/* Status Indicator LEDs */}
            <circle cx="48" cy="58" r="2" fill="#10B981" />
            <circle cx="55" cy="58" r="2" fill="#F59E0B" />
            <circle cx="62" cy="58" r="2" fill="#EF4444" />
            {/* Duplex 120V Outlets */}
            <rect x="46" y="63" width="9" height="11" rx="2" fill="#1E293B" stroke="#475569" strokeWidth="0.75" />
            <rect x="58" y="63" width="9" height="11" rx="2" fill="#1E293B" stroke="#475569" strokeWidth="0.75" />
            {/* Eco Throttle Toggle */}
            <rect x="71" y="64" width="10" height="6" rx="1.5" fill="#D97706" />

            {/* Exhaust Port & Louvers */}
            <circle cx="112" cy="62" r="9" fill="#020617" stroke="#475569" strokeWidth="1.5" />
            <circle cx="112" cy="62" r="5" fill="#334155" />
            <circle cx="112" cy="62" r="2.5" fill="#0F172A" />

            {/* Heavy-Duty Rubber Feet */}
            <rect x="40" y="83" width="16" height="5" rx="2" fill="#0F172A" stroke="#334155" />
            <rect x="104" y="83" width="16" height="5" rx="2" fill="#0F172A" stroke="#334155" />
          </g>
        </svg>
      );

    case "standby-generator":
      return (
        <svg viewBox="0 0 160 100" fill="none" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="standbyShell" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
            <linearGradient id="standbyLid" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#64748B" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
            <filter id="standbyShadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.18" />
            </filter>
          </defs>

          {/* Base Shadow */}
          <ellipse cx="80" cy="90" rx="58" ry="6" fill="#0F172A" fillOpacity="0.08" />

          {/* Standby Weatherproof Housing */}
          <g filter="url(#standbyShadow)">
            {/* Concrete Pad Base */}
            <rect x="22" y="82" width="116" height="7" rx="2" fill="#334155" stroke="#1E293B" strokeWidth="1" />

            {/* Main Cabinet */}
            <rect x="26" y="28" width="108" height="55" rx="6" fill="url(#standbyShell)" stroke="#64748B" strokeWidth="1.5" />

            {/* Hinged Top Lid */}
            <path d="M25 34 C 25 30 28 27 32 27 H 128 C 132 27 135 30 135 34 V 37 H 25 Z" fill="url(#standbyLid)" stroke="#64748B" strokeWidth="1" />
            <line x1="25" y1="37" x2="135" y2="37" stroke="#0F172A" strokeWidth="1.5" />

            {/* Architectural Air Intake Louvers */}
            <line x1="36" y1="46" x2="78" y2="46" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="36" y1="52" x2="78" y2="52" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="36" y1="58" x2="78" y2="58" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="36" y1="64" x2="78" y2="64" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="36" y1="70" x2="78" y2="70" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />

            {/* Digital Controller Window */}
            <rect x="90" y="44" width="34" height="26" rx="4" fill="#020617" stroke="#38BDF8" strokeWidth="1" />
            <rect x="94" y="48" width="26" height="12" rx="2" fill="#0369A1" />
            <circle cx="98" cy="65" r="2" fill="#10B981" />
            <circle cx="107" cy="65" r="2" fill="#F59E0B" />
            <circle cx="116" cy="65" r="2" fill="#64748B" />

            {/* Exterior Ready Beacon Indicator */}
            <circle cx="122" cy="32" r="3" fill="#10B981" />
          </g>
        </svg>
      );

    case "kill-a-watt":
      return (
        <svg viewBox="0 0 160 100" fill="none" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="plugBody" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F1F5F9" />
            </linearGradient>
            <linearGradient id="lcdScreen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            <filter id="plugShadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Base Shadow */}
          <ellipse cx="80" cy="90" rx="36" ry="6" fill="#0F172A" fillOpacity="0.08" />

          {/* Meter Housing */}
          <g filter="url(#plugShadow)">
            <rect x="52" y="12" width="56" height="76" rx="10" fill="url(#plugBody)" stroke="#CBD5E1" strokeWidth="1.5" />

            {/* High-Contrast LCD Screen */}
            <rect x="60" y="20" width="40" height="24" rx="4" fill="url(#lcdScreen)" stroke="#94A3B8" strokeWidth="1" />
            {/* Digital Readout Graphic */}
            <path d="M68 32 H 74 M 78 28 V 36 M 84 28 H 90 V 36" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

            {/* 5 Tactile Push Buttons */}
            <circle cx="63" cy="52" r="3" fill="#0284C7" />
            <circle cx="71" cy="52" r="3" fill="#0284C7" />
            <circle cx="80" cy="52" r="3.5" fill="#F59E0B" />
            <circle cx="89" cy="52" r="3" fill="#0284C7" />
            <circle cx="97" cy="52" r="3" fill="#0284C7" />

            {/* Grounded Receptacle Face */}
            <rect x="66" y="61" width="28" height="19" rx="4" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1" />
            {/* Hot and Neutral Slots */}
            <rect x="72" y="65" width="3" height="7" rx="1" fill="#0F172A" />
            <rect x="85" y="65" width="3" height="7" rx="1" fill="#0F172A" />
            {/* Ground Pin Hole */}
            <path d="M78 75 C 78 73.5 82 73.5 82 75 V 76 H 78 Z" fill="#0F172A" />
          </g>
        </svg>
      );

    case "panel-monitor":
      return (
        <svg viewBox="0 0 160 100" fill="none" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="hubBody" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <filter id="hubShadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.18" />
            </filter>
          </defs>

          {/* Base Shadow */}
          <ellipse cx="80" cy="89" rx="55" ry="6" fill="#0F172A" fillOpacity="0.08" />

          {/* Main Monitor Hub & CT Sensor Clamps */}
          <g filter="url(#hubShadow)">
            {/* Left CT Sensor Clamp */}
            <path d="M30 46 C 30 34 40 24 52 24 C 64 24 74 34 74 46" stroke="#475569" strokeWidth="7" strokeLinecap="round" fill="none" />
            <circle cx="52" cy="46" r="10" fill="#020617" stroke="#F59E0B" strokeWidth="2" />
            <path d="M42 55 L 42 70 Q 42 76 56 76" stroke="#F59E0B" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* Right CT Sensor Clamp */}
            <path d="M86 46 C 86 34 96 24 108 24 C 120 24 130 34 130 46" stroke="#475569" strokeWidth="7" strokeLinecap="round" fill="none" />
            <circle cx="108" cy="46" r="10" fill="#020617" stroke="#0284C7" strokeWidth="2" />
            <path d="M118 55 L 118 70 Q 118 76 104 76" stroke="#0284C7" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* Central Smart Hub */}
            <rect x="58" y="44" width="44" height="42" rx="6" fill="url(#hubBody)" stroke="#334155" strokeWidth="1.5" />
            <circle cx="72" cy="56" r="3" fill="#10B981" />
            <circle cx="88" cy="56" r="3" fill="#38BDF8" />
            {/* Wi-Fi Wave Icon */}
            <path d="M72 70 Q 80 64 88 70" stroke="#38BDF8" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M75 74 Q 80 70 85 74" stroke="#38BDF8" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <circle cx="80" cy="78" r="1.5" fill="#38BDF8" />
          </g>
        </svg>
      );

    case "clamp-meter":
      return (
        <svg viewBox="0 0 160 100" fill="none" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="meterBody" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EA580C" />
              <stop offset="60%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#C2410C" />
            </linearGradient>
            <linearGradient id="jawGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#B91C1C" />
            </linearGradient>
            <filter id="meterShadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.18" />
            </filter>
          </defs>

          {/* Base Shadow */}
          <ellipse cx="80" cy="90" rx="38" ry="6" fill="#0F172A" fillOpacity="0.08" />

          {/* Clamp Multimeter Body */}
          <g filter="url(#meterShadow)">
            {/* Circular Spring-Loaded Clamp Jaw */}
            <path d="M64 36 C 64 16 96 16 96 36" stroke="url(#jawGrad)" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M72 36 C 72 24 88 24 88 36" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Handheld Meter Chassis */}
            <rect x="62" y="34" width="36" height="54" rx="8" fill="url(#meterBody)" stroke="#9A3412" strokeWidth="1.5" />

            {/* Rotary Selector Dial */}
            <circle cx="80" cy="50" r="9" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" />
            <line x1="80" y1="44" x2="80" y2="48" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
            <circle cx="80" cy="50" r="3" fill="#D97706" />

            {/* Backlit Digital Display */}
            <rect x="68" y="65" width="24" height="14" rx="2" fill="#020617" stroke="#334155" strokeWidth="1" />
            <rect x="71" y="68" width="18" height="8" rx="1" fill="#0369A1" />
            {/* 7-Segment Readout Simulator */}
            <line x1="74" y1="72" x2="85" y2="72" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />

            {/* Shielded Banana Test Terminals */}
            <circle cx="73" cy="85" r="2.5" fill="#0F172A" stroke="#EF4444" strokeWidth="1" />
            <circle cx="87" cy="85" r="2.5" fill="#0F172A" stroke="#64748B" strokeWidth="1" />
          </g>
        </svg>
      );

    case "mppt-controller":
      return (
        <svg viewBox="0 0 160 100" fill="none" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="mpptHeatsink" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>
            <filter id="mpptShadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.18" />
            </filter>
          </defs>

          {/* Base Shadow */}
          <ellipse cx="80" cy="89" rx="46" ry="6" fill="#0F172A" fillOpacity="0.08" />

          {/* MPPT Controller Enclosure */}
          <g filter="url(#mpptShadow)">
            {/* Top Cooling Fins */}
            <line x1="56" y1="18" x2="104" y2="18" stroke="#0369A1" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="56" y1="23" x2="104" y2="23" stroke="#0369A1" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="56" y1="28" x2="104" y2="28" stroke="#0369A1" strokeWidth="2.5" strokeLinecap="round" />

            {/* Main Metal Case */}
            <rect x="52" y="30" width="56" height="52" rx="7" fill="url(#mpptHeatsink)" stroke="#075985" strokeWidth="1.5" />

            {/* Digital Telemetry Display */}
            <rect x="60" y="38" width="40" height="22" rx="4" fill="#020617" stroke="#38BDF8" strokeWidth="1" />
            {/* Sun to Battery Transfer Graphic */}
            <circle cx="68" cy="49" r="3.5" fill="#F59E0B" />
            <path d="M75 49 L 85 49" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
            <rect x="87" y="45" width="7" height="8" rx="1.5" fill="#10B981" />

            {/* Heavy-Duty Screw Terminals (PV+, PV-, BATT+, BATT-) */}
            <rect x="58" y="68" width="44" height="10" rx="2" fill="#0F172A" stroke="#334155" />
            <circle cx="64" cy="73" r="1.75" fill="#FCD34D" />
            <circle cx="72" cy="73" r="1.75" fill="#FCD34D" />
            <circle cx="88" cy="73" r="1.75" fill="#FCD34D" />
            <circle cx="96" cy="73" r="1.75" fill="#FCD34D" />
          </g>
        </svg>
      );

    case "solar-panel":
      return (
        <svg viewBox="0 0 160 100" fill="none" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="pvCell" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="50%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
            <linearGradient id="frameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
            <filter id="solarShadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.18" />
            </filter>
          </defs>

          {/* Base Shadow */}
          <ellipse cx="80" cy="89" rx="55" ry="6" fill="#0F172A" fillOpacity="0.08" />

          {/* Tilted Monocrystalline Solar Panel */}
          <g filter="url(#solarShadow)">
            {/* Aluminum Ground Mounting Legs */}
            <line x1="45" y1="78" x2="35" y2="88" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
            <line x1="115" y1="78" x2="125" y2="88" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
            <line x1="80" y1="40" x2="80" y2="86" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />

            {/* Aluminum Frame */}
            <polygon points="32,24 128,24 136,78 24,78" fill="url(#frameGrad)" stroke="#64748B" strokeWidth="1.5" />

            {/* Monocrystalline Silicon Active Surface */}
            <polygon points="36,28 124,28 131,74 29,74" fill="url(#pvCell)" />

            {/* Photovoltaic Cell Grid Busbars */}
            {/* Horizontal Busbars */}
            <line x1="34" y1="43" x2="126" y2="43" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.7" />
            <line x1="32" y1="58" x2="128" y2="58" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.7" />

            {/* Vertical Cell Dividers */}
            <line x1="58" y1="28" x2="54" y2="74" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.7" />
            <line x1="80" y1="28" x2="80" y2="74" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.7" />
            <line x1="102" y1="28" x2="106" y2="74" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.7" />

            {/* Corner Protectors */}
            <polygon points="32,24 40,24 32,32" fill="#334155" />
            <polygon points="128,24 120,24 128,32" fill="#334155" />
            <polygon points="24,78 32,78 24,70" fill="#334155" />
            <polygon points="136,78 128,78 136,70" fill="#334155" />
          </g>
        </svg>
      );

    default:
      return null;
  }
};
