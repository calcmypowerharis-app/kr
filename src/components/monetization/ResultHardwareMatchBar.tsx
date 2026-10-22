import React from "react";
import { Zap, ExternalLink } from "lucide-react";
import { getAmazonSearchUrl, AMAZON_LINK_REL } from "@/config/affiliate";

interface ResultHardwareMatchBarProps {
  calculatorSlug?: string;
  calculatedValue?: number;
  className?: string;
}

interface MatchRecommendation {
  label: string;
  buttonText: string;
  searchQuery: string;
}

export function getMatchRecommendation(
  slug?: string,
  value?: number
): MatchRecommendation {
  const val = typeof value === "number" && !isNaN(value) ? value : 0;

  switch (slug) {
    case "generator-size-calculator": {
      if (val <= 2500) {
        return {
          label: "Matched for your load: 2,200W-2,500W Quiet Inverter Generators (Westinghouse / Champion)",
          buttonText: "View Matched Generators on Amazon",
          searchQuery: "2500 watt inverter generator dual fuel",
        };
      }
      if (val <= 5500) {
        return {
          label: "Matched for your load: 3,500W-5,500W Dual-Fuel Inverter Generators + 30A Cord",
          buttonText: "View 3.5kW-5.5kW Generators",
          searchQuery: "dual fuel inverter generator 4500 watt",
        };
      }
      if (val <= 9500) {
        return {
          label: "Matched for your load: 7,500W-9,500W Home Backup Dual-Fuel Generators + 50A Inlet",
          buttonText: "View Home Backup Generators",
          searchQuery: "dual fuel generator 7500 watt 50A",
        };
      }
      return {
        label: "Matched for your load: 12kW-24kW Whole-House Standby Systems & Soft-Start Kits",
        buttonText: "View Standby Systems",
        searchQuery: "whole house standby generator 20kw",
      };
    }

    case "battery-capacity-calculator":
    case "solar-battery-calculator": {
      if (val <= 150) {
        return {
          label: "Matched for your bank: LiTime / Renogy 12V 100Ah LiFePO4 Deep-Cycle Battery (Built-in BMS)",
          buttonText: "View 12V 100Ah Batteries",
          searchQuery: "12V 100Ah LiFePO4 battery",
        };
      }
      if (val <= 300) {
        return {
          label: "Matched for your bank: LiTime / Redodo 12V 200Ah Plus LiFePO4 Lithium Battery",
          buttonText: "View 200Ah LiFePO4 Batteries",
          searchQuery: "12V 200Ah LiFePO4 battery",
        };
      }
      return {
        label: "Matched for your bank: 48V 100Ah Server Rack LiFePO4 Battery Systems (EG4 / SOK)",
        buttonText: "View 48V Server Rack Batteries",
        searchQuery: "48V 100Ah server rack battery LiFePO4",
      };
    }

    case "ups-battery-backup-calculator":
      return {
        label: "Matched backup hardware: CyberPower CP1500PFCLCD / APC 1500VA Pure Sine Wave UPS",
        buttonText: "View 1500VA UPS on Amazon",
        searchQuery: "1500VA pure sine wave UPS",
      };

    case "electricity-use-calculator":
    case "electricity-cost-calculator":
      return {
        label: "Want exact kWh readings? Test any appliance with a P3 Kill A Watt Meter or Emporia Smart Panel Monitor",
        buttonText: "Check Energy Monitors on Amazon",
        searchQuery: "kill a watt electricity monitor",
      };

    case "amps-to-watts-calculator":
    case "watts-to-amps-calculator":
    case "voltage-drop-calculator":
    case "three-phase-power-calculator": {
      if (val <= 15) {
        return {
          label: "Matched for 15A circuits: Klein Tools CL390 Clamp Meter + 14 AWG Copper Cords",
          buttonText: "View 15A Test Gear",
          searchQuery: "digital clamp meter True RMS",
        };
      }
      if (val <= 20) {
        return {
          label: "Matched for 20A circuits: Klein Tools Digital Clamp Meter + 12 AWG Heavy-Duty Cord",
          buttonText: "View 20A Tools on Amazon",
          searchQuery: "digital clamp meter 12 AWG cord",
        };
      }
      if (val <= 30) {
        return {
          label: "Matched for 30A circuits: True-RMS Clamp Meter + 10 AWG Copper Generator Cord",
          buttonText: "View 30A Gear on Amazon",
          searchQuery: "10 AWG generator cord L14-30P",
        };
      }
      return {
        label: "Matched for 50A+ heavy service: Pro True-RMS Inrush Clamp Multimeter + 6 AWG Wire",
        buttonText: "View 50A+ Pro Gear",
        searchQuery: "true rms inrush clamp multimeter",
      };
    }

    case "solar-charge-controller-calculator":
    case "solar-system-size-calculator": {
      if (val <= 25) {
        return {
          label: "Matched for your array: 20A-30A Victron SmartSolar / Renogy Rover MPPT Controller",
          buttonText: "View 30A MPPT Controllers",
          searchQuery: "30A MPPT solar charge controller",
        };
      }
      if (val <= 45) {
        return {
          label: "Matched for your array: 40A Victron SmartSolar / Renogy Rover MPPT Controller",
          buttonText: "View 40A MPPT Controllers",
          searchQuery: "mppt solar charge controller 40A",
        };
      }
      return {
        label: "Matched for your array: 60A-100A Commercial MPPT Solar Charge Controllers",
        buttonText: "View 60A-100A MPPT Controllers",
        searchQuery: "60A MPPT solar charge controller",
      };
    }

    default:
      return {
        label: "Compare tested US electrical test gear and code-compliant accessories on Amazon",
        buttonText: "View Tested Gear on Amazon",
        searchQuery: "digital clamp meter true rms",
      };
  }
}

export const ResultHardwareMatchBar: React.FC<ResultHardwareMatchBarProps> = ({
  calculatorSlug,
  calculatedValue,
  className = "",
}) => {
  const match = getMatchRecommendation(calculatorSlug, calculatedValue);
  const searchUrl = getAmazonSearchUrl(match.searchQuery);

  return (
    <div
      className={`bg-slate-900/95 border-t border-amber-500/30 p-3.5 sm:p-4 rounded-b-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner ${className}`}
    >
      <div className="flex items-start sm:items-center gap-2.5">
        <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 shrink-0 mt-0.5 sm:mt-0">
          <Zap className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block sm:inline mr-2">
            Matched Hardware
          </span>
          <p className="text-xs text-slate-200 font-medium leading-snug">
            {match.label}
          </p>
        </div>
      </div>
      <a
        href={searchUrl}
        target="_blank"
        rel={AMAZON_LINK_REL}
        className="inline-flex items-center justify-center gap-1.5 shrink-0 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold px-3.5 py-2 rounded-xl text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02]"
      >
        <span>{match.buttonText}</span>
        <ExternalLink className="w-3.5 h-3.5 text-slate-950" />
      </a>
    </div>
  );
};
