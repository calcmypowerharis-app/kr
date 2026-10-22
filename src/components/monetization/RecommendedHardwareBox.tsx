import React from "react";
import { ExternalLink, ShieldCheck, ShoppingCart, Sparkles } from "lucide-react";
import { getAmazonSearchUrl, AMAZON_LINK_REL } from "@/lib/monetization/affiliate-config";

interface HardwareItem {
  title: string;
  badge: string;
  description: string;
  searchQuery: string;
}

interface RecommendedHardwareBoxProps {
  calculatorSlug?: string;
}

function getHardwareItemsForSlug(slug?: string): { clusterTitle: string; items: HardwareItem[] } {
  switch (slug) {
    case "generator-size-calculator":
    case "generator-fuel-consumption-calculator":
      return {
        clusterTitle: "Recommended Power Backup Equipment (Amazon)",
        items: [
          {
            title: "2,000W - 2,500W Quiet Inverter Generator",
            badge: "Portable Essentials",
            description: "Ultra-quiet clean power for refrigerators, CPAP machines, and sensitive electronics during outages.",
            searchQuery: "quiet inverter generator 2000 watt 2500 watt clean power",
          },
          {
            title: "5,000W - 7,500W Dual-Fuel Home Backup Generator",
            badge: "Whole-Home Outage",
            description: "Heavy-duty 120V/240V generator running on gasoline or propane for sump pumps and essential circuits.",
            searchQuery: "dual fuel portable generator 5000 watt 7500 watt 120 240v electric start",
          },
          {
            title: "30A / 50A Generator Transfer Switch & Inlet Kit",
            badge: "NEC Code Compliance",
            description: "Manual transfer switch and outdoor power inlet box ensuring safe transfer without utility backfeeding.",
            searchQuery: "generator transfer switch kit 30 amp 50 amp manual interlock outdoor inlet",
          },
        ],
      };

    case "battery-capacity-calculator":
    case "solar-battery-calculator":
    case "ups-battery-backup-calculator":
      return {
        clusterTitle: "Recommended Battery Storage & Backup Gear (Amazon)",
        items: [
          {
            title: "12V 100Ah LiFePO4 Deep-Cycle Battery",
            badge: "High-Cycle Storage",
            description: "Grade-A lithium cells with built-in 100A BMS, delivering 4,000+ cycles and 90% usable depth of discharge.",
            searchQuery: "12V 100Ah LiFePO4 battery built in BMS deep cycle lithium",
          },
          {
            title: "1500VA / 900W Pure Sine Wave UPS Battery Backup",
            badge: "Office & Network Protection",
            description: "Automatic voltage regulation and surge protection to keep workstations, routers, and NAS systems running.",
            searchQuery: "1500VA pure sine wave UPS battery backup AVR surge protector",
          },
          {
            title: "12V/24V Pure Sine Wave Inverter & LiFePO4 Smart Charger",
            badge: "Off-Grid Power",
            description: "High-efficiency DC to AC power conversion and multi-stage smart charging for deep-cycle banks.",
            searchQuery: "pure sine wave power inverter 12V 24V with smart lithium charger",
          },
        ],
      };

    case "electricity-use-calculator":
    case "electricity-cost-calculator":
      return {
        clusterTitle: "Recommended Energy Monitoring Hardware (Amazon)",
        items: [
          {
            title: "Plug-In kWh Electricity Usage Monitor",
            badge: "Kill A Watt Style",
            description: "Accurately measure real-time wattage, cumulative kilowatt-hours, and standby phantom loads of any appliance.",
            searchQuery: "plug in electricity usage monitor kill a watt power meter",
          },
          {
            title: "Smart Home Electrical Panel Energy Monitor",
            badge: "16-Circuit Clamps",
            description: "CT clamp sensors installed inside main panel to track whole-house circuits and solar generation in real time.",
            searchQuery: "smart home energy monitor electrical panel CT clamp sensors 16 circuit",
          },
          {
            title: "WiFi Smart Energy Monitoring Plugs (15A UL-Listed)",
            badge: "Phantom Load Control",
            description: "Schedule automated shutoffs, monitor vampire draw via mobile app, and cut high-cost peak utility consumption.",
            searchQuery: "smart plug energy monitoring 15A UL listed WiFi power meter",
          },
        ],
      };

    case "amps-to-watts-calculator":
    case "watts-to-amps-calculator":
    case "voltage-drop-calculator":
    case "three-phase-power-calculator":
    case "inverter-size-calculator":
      return {
        clusterTitle: "Recommended Electrical Testing & Wiring Tools (Amazon)",
        items: [
          {
            title: "True-RMS AC/DC Digital Clamp Meter",
            badge: "Current Measurement",
            description: "Accurately measure AC/DC amp draw, inrush starting currents, voltage drop, and circuit continuity safely.",
            searchQuery: "true rms digital clamp meter AC DC current inrush multimeter",
          },
          {
            title: "12 AWG / 10 AWG Heavy-Duty Copper Extension Cords",
            badge: "Voltage Drop Prevention",
            description: "UL-listed pure copper outdoor extension cords engineered to prevent excessive voltage drop on continuous loads.",
            searchQuery: "10 AWG 12 AWG heavy duty outdoor extension cord pure copper UL listed",
          },
          {
            title: "UL-Listed Surge Protector & Circuit Receptacle Tester",
            badge: "Safety Inspection",
            description: "Detect open grounds, reversed polarity, and circuit wiring faults before connecting expensive electronics.",
            searchQuery: "GFCI electrical outlet receptacle tester with surge protector strip",
          },
        ],
      };

    case "solar-charge-controller-calculator":
    case "solar-system-size-calculator":
    case "solar-panel-tilt-calculator":
    default:
      return {
        clusterTitle: "Recommended Solar & Renewable Hardware (Amazon)",
        items: [
          {
            title: "30A / 40A / 60A MPPT Solar Charge Controller",
            badge: "Maximum Power Point",
            description: "High-efficiency MPPT tracking with auto 12V/24V/48V detection and 98% peak conversion efficiency.",
            searchQuery: "MPPT solar charge controller 40A 60A 12V 24V auto lithium compatible",
          },
          {
            title: "200W - 400W Monocrystalline Solar Panel Kits",
            badge: "High-Efficiency PV",
            description: "Durable tempered glass solar panels designed for residential backup, RV roofs, and off-grid cabin arrays.",
            searchQuery: "monocrystalline solar panels 200W 400W 12V 24V high efficiency",
          },
          {
            title: "10 AWG Solar Extension Cables & Adjustable Mounts",
            badge: "Tilt & Wiring",
            description: "Pre-crimped MC4 solar cables and heavy-duty adjustable tilt mount brackets to optimize seasonal sun angles.",
            searchQuery: "10 AWG solar PV extension cable MC4 connectors adjustable tilt mount brackets",
          },
        ],
      };
  }
}

export const RecommendedHardwareBox: React.FC<RecommendedHardwareBoxProps> = ({
  calculatorSlug,
}) => {
  const { clusterTitle, items } = getHardwareItemsForSlug(calculatorSlug);

  return (
    <section className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
            <ShoppingCart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900">
              {clusterTitle}
            </h3>
            <p className="text-xs text-slate-500">
              Tested equipment and sizing accessories tailored for this calculation
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>NEC &amp; UL Standards</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item, index) => {
          const searchUrl = getAmazonSearchUrl(item.searchQuery);
          return (
            <a
              key={index}
              href={searchUrl}
              target="_blank"
              rel={AMAZON_LINK_REL}
              className="group flex flex-col justify-between p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:shadow-md transition text-slate-800"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {item.badge}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                <span>Check Prices on Amazon</span>
                <span className="group-hover:translate-x-1 transition">&rarr;</span>
              </div>
            </a>
          );
        })}
      </div>

      <div className="pt-2 text-[11px] text-slate-400 text-center sm:text-left">
        As an Amazon Associate, CalcMyPower earns from qualifying purchases. Pricing and availability subject to change.
      </div>
    </section>
  );
};
