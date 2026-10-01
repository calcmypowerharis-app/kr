import React from "react";
import {
  ControllerTechnology,
  SystemVoltage,
  VoltageCheckStatus,
  formatAmps,
  formatVolts,
  formatWatts,
} from "@/lib/calculators/solar-charge-controller";

interface SolarChargeControllerFlowDiagramProps {
  arrayWatts: number;
  systemVoltage: SystemVoltage;
  controllerType: ControllerTechnology;
  nominalCurrentAmps: number;
  planningCurrentAmps: number;
  recommendedRatingAmps: number;
  isBufferEnabled: boolean;
  bufferPercent: number;
  isVoltageCheckEnabled: boolean;
  coldVocVolts?: number;
  controllerMaxVoc?: number;
  voltageStatus: VoltageCheckStatus;
}

export const SolarChargeControllerFlowDiagram: React.FC<SolarChargeControllerFlowDiagramProps> = ({
  arrayWatts,
  systemVoltage,
  controllerType,
  nominalCurrentAmps,
  planningCurrentAmps,
  recommendedRatingAmps,
  isBufferEnabled,
  bufferPercent,
  isVoltageCheckEnabled,
  coldVocVolts,
  controllerMaxVoc,
  voltageStatus,
}) => {
  const isMppt = controllerType === "mppt";
  const isExceeded = voltageStatus === "exceeded";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            System Power & Sizing Architecture
          </h3>
          <p className="text-xs text-slate-500">
            Visualizing electrical power conversion from the solar array through the charge controller to the battery bank.
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 self-start sm:self-auto">
          Live Interactive Model
        </span>
      </div>

      {/* SVG Diagram Canvas */}
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 960 220"
          className="w-full min-w-[760px] h-auto font-sans"
          role="img"
          aria-label="Solar charge controller sizing flow diagram illustrating array wattage conversion down to battery charging amperage"
        >
          <title>Solar Charge Controller Flow Diagram</title>
          <desc>
            Mathematical sequence: Solar Array ({formatWatts(arrayWatts)}) routed through {isMppt ? "MPPT DC-DC conversion" : "PWM direct coupling"} produces nominal charging current ({formatAmps(nominalCurrentAmps)}). With {isBufferEnabled ? `${bufferPercent}% planning buffer` : "no buffer"}, planning current is {formatAmps(planningCurrentAmps)}, recommending a {recommendedRatingAmps}A controller class charging a {systemVoltage}V battery bank.
          </desc>

          <defs>
            <marker
              id="arrowhead-scc"
              markerWidth="8"
              markerHeight="6"
              refX="7"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="#94a3b8" />
            </marker>
          </defs>

          {/* Connector Lines */}
          <line
            x1="260"
            y1="105"
            x2="330"
            y2="105"
            stroke="#cbd5e1"
            strokeWidth="2.5"
            markerEnd="url(#arrowhead-scc)"
          />
          <line
            x1="630"
            y1="105"
            x2="700"
            y2="105"
            stroke="#cbd5e1"
            strokeWidth="2.5"
            markerEnd="url(#arrowhead-scc)"
          />

          {/* Stage 1: Solar Array */}
          <g transform="translate(20, 20)">
            <rect
              width="240"
              height="170"
              rx="12"
              fill="#f8fafc"
              stroke="#e2e8f0"
              strokeWidth="1.5"
            />
            {/* Header badge */}
            <rect width="240" height="36" rx="12" fill="#f1f5f9" />
            <rect y="24" width="240" height="12" fill="#f1f5f9" />
            <text
              x="16"
              y="23"
              fill="#475569"
              fontSize="12"
              fontWeight="bold"
              letterSpacing="0.05em"
            >
              STAGE 1: SOLAR PV ARRAY
            </text>

            {/* Metrics */}
            <text x="16" y="65" fill="#64748b" fontSize="11" fontWeight="600">
              Total Array Rating:
            </text>
            <text x="16" y="92" fill="#0f172a" fontSize="22" fontWeight="bold">
              {formatWatts(arrayWatts)}
            </text>

            <text x="16" y="120" fill="#64748b" fontSize="11">
              Technology: {isMppt ? "High-Voltage Array" : "Nominal-Voltage Array"}
            </text>

            {isVoltageCheckEnabled && coldVocVolts !== undefined ? (
              <text
                x="16"
                y="145"
                fill={isExceeded ? "#dc2626" : "#059669"}
                fontSize="11"
                fontWeight="600"
              >
                Cold Voc: {formatVolts(coldVocVolts)}
              </text>
            ) : (
              <text x="16" y="145" fill="#94a3b8" fontSize="11">
                Cold Voc Check: Off
              </text>
            )}
          </g>

          {/* Conversion pill between Stage 1 and Stage 2 */}
          <g transform="translate(270, 75)">
            <rect
              width="50"
              height="24"
              rx="6"
              fill="#ffffff"
              stroke="#cbd5e1"
              strokeWidth="1"
            />
            <text
              x="25"
              y="16"
              textAnchor="middle"
              fill="#475569"
              fontSize="10"
              fontWeight="bold"
            >
              {isMppt ? "P ÷ V" : "Isc"}
            </text>
          </g>

          {/* Stage 2: Solar Charge Controller (Center Highlight) */}
          <g transform="translate(330, 15)">
            <rect
              width="300"
              height="180"
              rx="12"
              fill={isExceeded ? "#fef2f2" : "#f0fdf4"}
              stroke={isExceeded ? "#fca5a5" : "#86efac"}
              strokeWidth="2"
            />
            {/* Header badge */}
            <rect
              width="300"
              height="36"
              rx="12"
              fill={isExceeded ? "#fee2e2" : "#dcfce7"}
            />
            <rect
              y="24"
              width="300"
              height="12"
              fill={isExceeded ? "#fee2e2" : "#dcfce7"}
            />
            <text
              x="16"
              y="23"
              fill={isExceeded ? "#991b1b" : "#166534"}
              fontSize="12"
              fontWeight="bold"
              letterSpacing="0.05em"
            >
              STAGE 2: {controllerType.toUpperCase()} CHARGE CONTROLLER
            </text>

            {/* Metrics */}
            <text x="16" y="62" fill="#64748b" fontSize="11" fontWeight="600">
              Nominal Charging Current:
            </text>
            <text x="16" y="85" fill="#0f172a" fontSize="18" fontWeight="bold">
              {formatAmps(nominalCurrentAmps)}
            </text>

            <text x="160" y="62" fill="#64748b" fontSize="11" fontWeight="600">
              Planning Current ({isBufferEnabled ? `+${bufferPercent}%` : "0%"}):
            </text>
            <text
              x="160"
              y="85"
              fill={isExceeded ? "#dc2626" : "#16a34a"}
              fontSize="18"
              fontWeight="bold"
            >
              {formatAmps(planningCurrentAmps)}
            </text>

            <line
              x1="16"
              y1="102"
              x2="284"
              y2="102"
              stroke={isExceeded ? "#fecaca" : "#bbf7d0"}
              strokeWidth="1"
            />

            <text x="16" y="125" fill="#475569" fontSize="12" fontWeight="600">
              Target Controller Rating:
            </text>
            <text
              x="180"
              y="126"
              fill="#0f172a"
              fontSize="14"
              fontWeight="bold"
            >
              ≥ {recommendedRatingAmps}A Class
            </text>

            {isVoltageCheckEnabled && controllerMaxVoc ? (
              <text
                x="16"
                y="152"
                fill={isExceeded ? "#b91c1c" : "#15803d"}
                fontSize="11"
                fontWeight="500"
              >
                Max PV Input: {formatVolts(controllerMaxVoc)} {isExceeded ? "(EXCEEDED)" : "(Safe)"}
              </text>
            ) : (
              <text x="16" y="152" fill="#64748b" fontSize="11">
                {isMppt ? "Step-down DC buck conversion active" : "Direct battery voltage clamping"}
              </text>
            )}
          </g>

          {/* Transfer pill between Stage 2 and Stage 3 */}
          <g transform="translate(640, 75)">
            <rect
              width="50"
              height="24"
              rx="6"
              fill="#ffffff"
              stroke="#cbd5e1"
              strokeWidth="1"
            />
            <text
              x="25"
              y="16"
              textAnchor="middle"
              fill="#475569"
              fontSize="10"
              fontWeight="bold"
            >
              DC Bus
            </text>
          </g>

          {/* Stage 3: Battery Bank */}
          <g transform="translate(700, 20)">
            <rect
              width="240"
              height="170"
              rx="12"
              fill="#f8fafc"
              stroke="#e2e8f0"
              strokeWidth="1.5"
            />
            {/* Header badge */}
            <rect width="240" height="36" rx="12" fill="#f1f5f9" />
            <rect y="24" width="240" height="12" fill="#f1f5f9" />
            <text
              x="16"
              y="23"
              fill="#475569"
              fontSize="12"
              fontWeight="bold"
              letterSpacing="0.05em"
            >
              STAGE 3: BATTERY BANK
            </text>

            {/* Metrics */}
            <text x="16" y="65" fill="#64748b" fontSize="11" fontWeight="600">
              Nominal DC Bus:
            </text>
            <text x="16" y="92" fill="#0f172a" fontSize="22" fontWeight="bold">
              {systemVoltage}V DC
            </text>

            <text x="16" y="120" fill="#64748b" fontSize="11">
              DC Charging Flow:
            </text>
            <text x="16" y="142" fill="#0284c7" fontSize="13" fontWeight="bold">
              {formatAmps(nominalCurrentAmps)} Continuous
            </text>
          </g>
        </svg>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
          <span>1. Array Wattage: Baseline generation</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
          <span>2. Controller Ampere: Step-down current</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
          <span>3. Battery Bus: Voltage level determines amperage</span>
        </div>
      </div>
    </div>
  );
};
