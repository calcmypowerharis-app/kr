import React from "react";
import {
  CircuitType,
  ConductorMaterial,
  formatVolts,
  formatPercent,
  formatOhms,
} from "@/lib/calculators/voltage-drop";

interface VoltageDropFlowDiagramProps {
  circuitType: CircuitType;
  sourceVoltage: number;
  currentAmps: number;
  distanceFeet: number;
  conductorMaterial: ConductorMaterial;
  wireName: string;
  voltageDropVolts: number;
  voltageDropPercent: number;
  receivingVoltageVolts: number;
  loopResistanceOhms: number;
  isWithinThreshold: boolean;
  targetThresholdPercent: number;
}

export const VoltageDropFlowDiagram: React.FC<VoltageDropFlowDiagramProps> = ({
  circuitType,
  sourceVoltage,
  currentAmps,
  distanceFeet,
  conductorMaterial,
  wireName,
  voltageDropVolts,
  voltageDropPercent,
  receivingVoltageVolts,
  loopResistanceOhms,
  isWithinThreshold,
  targetThresholdPercent,
}) => {
  const circuitLabel =
    circuitType === "dc"
      ? "DC Circuit"
      : circuitType === "ac_three_phase"
      ? "3-Phase Balanced AC"
      : "Single-Phase AC";

  const multiplierLabel = circuitType === "ac_three_phase" ? "√3 (approx 1.732)" : "2 (outgoing + return)";
  const materialLabel = conductorMaterial === "copper" ? "Copper" : "Aluminum";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Circuit Voltage Drop & Return Path Architecture
          </h3>
          <p className="text-xs text-slate-500">
            Visualizing electrical potential drop from the supply panel through {distanceFeet} ft of {wireName} {materialLabel} conductors to the load terminals.
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 self-start sm:self-auto">
          75°C Stranded Model
        </span>
      </div>

      {/* SVG Flow Canvas */}
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 960 250"
          className="w-full min-w-[760px] h-auto font-sans"
          role="img"
          aria-label={`Voltage drop flow diagram showing source voltage of ${formatVolts(sourceVoltage)} volts dropping by ${formatVolts(voltageDropVolts)} volts to ${formatVolts(receivingVoltageVolts)} volts at the load`}
        >
          <title>Voltage Drop Circuit Diagram</title>
          <desc>
            Source {formatVolts(sourceVoltage)}V delivering {currentAmps}A through {distanceFeet} ft of {wireName} {materialLabel}. Loop resistance is {formatOhms(loopResistanceOhms)} ohms, producing {formatVolts(voltageDropVolts)}V drop ({formatPercent(voltageDropPercent)}%), arriving at {formatVolts(receivingVoltageVolts)}V at the load.
          </desc>

          <defs>
            <marker
              id="arrow-vd-right"
              markerWidth="8"
              markerHeight="6"
              refX="7"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="#3b82f6" />
            </marker>
            <marker
              id="arrow-vd-left"
              markerWidth="8"
              markerHeight="6"
              refX="1"
              refY="3"
              orient="auto"
            >
              <polygon points="8 0, 0 3, 8 6" fill="#64748b" />
            </marker>
          </defs>

          {/* Background Grid Accent */}
          <rect x="0" y="0" width="960" height="250" rx="12" fill="#f8fafc" />

          {/* 1. POWER SOURCE NODE (Left) */}
          <g transform="translate(30, 35)">
            <rect
              width="210"
              height="180"
              rx="12"
              fill="#ffffff"
              stroke="#cbd5e1"
              strokeWidth="1.5"
            />
            <rect
              width="210"
              height="36"
              rx="12"
              fill="#f1f5f9"
            />
            <rect
              y="24"
              width="210"
              height="12"
              fill="#f1f5f9"
            />
            <text x="16" y="24" fontSize="12" fontWeight="700" fill="#475569">
              POWER SOURCE
            </text>
            <text x="16" y="70" fontSize="24" fontWeight="800" fill="#0f172a">
              {formatVolts(sourceVoltage)} V
            </text>
            <text x="16" y="92" fontSize="11" fontWeight="600" fill="#64748b">
              {circuitLabel}
            </text>
            <line x1="16" y1="108" x2="194" y2="108" stroke="#e2e8f0" strokeWidth="1" />
            <text x="16" y="130" fontSize="12" fontWeight="600" fill="#334155">
              Load Current: {currentAmps} A
            </text>
            <text x="16" y="152" fontSize="11" fill="#64748b">
              Multiplier: {multiplierLabel}
            </text>
            <text x="16" y="172" fontSize="10" fill="#94a3b8">
              75°C conductor baseline
            </text>
          </g>

          {/* 2. CIRCUIT RUN & RESISTANCE PATH (Center) */}
          {/* Outgoing Conductor (Top Line) */}
          <line
            x1="240"
            y1="85"
            x2="710"
            y2="85"
            stroke="#3b82f6"
            strokeWidth="3.5"
            strokeDasharray="8 4"
            markerEnd="url(#arrow-vd-right)"
          />
          <text x="475" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1d4ed8">
            One-Way Supply Conductor: {distanceFeet} ft ({wireName} {materialLabel})
          </text>

          {/* Central Calculation & Loss Badge */}
          <g transform="translate(370, 98)">
            <rect
              width="210"
              height="58"
              rx="8"
              fill="#ffffff"
              stroke={isWithinThreshold ? "#86efac" : "#fca5a5"}
              strokeWidth="1.5"
            />
            <text x="105" y="22" textAnchor="middle" fontSize="11" fontWeight="600" fill="#475569">
              Calculated Voltage Drop
            </text>
            <text
              x="105"
              y="44"
              textAnchor="middle"
              fontSize="16"
              fontWeight="800"
              fill={isWithinThreshold ? "#15803d" : "#b91c1c"}
            >
              -{formatVolts(voltageDropVolts)} V ({formatPercent(voltageDropPercent)}%)
            </text>
          </g>

          {/* Return Conductor / Neutral (Bottom Line) */}
          <line
            x1="710"
            y1="168"
            x2="240"
            y2="168"
            stroke="#64748b"
            strokeWidth="3"
            markerEnd="url(#arrow-vd-left)"
          />
          <text x="475" y="190" textAnchor="middle" fontSize="11" fontWeight="600" fill="#475569">
            {circuitType === "ac_three_phase"
              ? "Balanced Return via Phase Conductors (Multiplier √3)"
              : "Return Conductor / Neutral: Accounts for Complete Loop (Multiplier 2)"}
          </text>

          <text x="475" y="210" textAnchor="middle" fontSize="10" fill="#94a3b8">
            Total Loop Resistance: {formatOhms(loopResistanceOhms)} Ω
          </text>

          {/* 3. RECEIVING LOAD NODE (Right) */}
          <g transform="translate(720, 35)">
            <rect
              width="210"
              height="180"
              rx="12"
              fill="#ffffff"
              stroke="#cbd5e1"
              strokeWidth="1.5"
            />
            <rect
              width="210"
              height="36"
              rx="12"
              fill="#f1f5f9"
            />
            <rect
              y="24"
              width="210"
              height="12"
              fill="#f1f5f9"
            />
            <text x="16" y="24" fontSize="12" fontWeight="700" fill="#475569">
              RECEIVING LOAD
            </text>
            <text x="16" y="70" fontSize="24" fontWeight="800" fill="#0f172a">
              {formatVolts(receivingVoltageVolts)} V
            </text>
            <text x="16" y="92" fontSize="11" fontWeight="600" fill="#64748b">
              Voltage at Terminals
            </text>
            <line x1="16" y1="108" x2="194" y2="108" stroke="#e2e8f0" strokeWidth="1" />

            {/* Threshold Badge */}
            <g transform="translate(16, 122)">
              <rect
                width="178"
                height="32"
                rx="6"
                fill={isWithinThreshold ? "#f0fdf4" : "#fef2f2"}
                stroke={isWithinThreshold ? "#bbf7d0" : "#fecaca"}
                strokeWidth="1"
              />
              <text
                x="89"
                y="20"
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill={isWithinThreshold ? "#166534" : "#991b1b"}
              >
                {isWithinThreshold ? `Within ${targetThresholdPercent}% Threshold` : `Exceeds ${targetThresholdPercent}% Threshold`}
              </text>
            </g>

            <text x="16" y="174" fontSize="10" fill="#94a3b8">
              Net available voltage
            </text>
          </g>
        </svg>
      </div>

      {/* Explanatory Architecture Footnote */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs text-slate-600 border-t border-slate-100">
        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
          <span className="font-semibold text-slate-900 block mb-0.5">One-Way User Input</span>
          <span>You specify the physical separation ({distanceFeet} ft). The calculation engine handles conductor return paths automatically.</span>
        </div>
        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
          <span className="font-semibold text-slate-900 block mb-0.5">Conductor Properties</span>
          <span>{wireName} {materialLabel} stranded conductor evaluated at a standardized 75°C internal resistance reference basis.</span>
        </div>
        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
          <span className="font-semibold text-slate-900 block mb-0.5">Terminal Voltage</span>
          <span>Equipment receives {formatVolts(receivingVoltageVolts)} V under full {currentAmps} A load. Actual voltage depends on steady line conditions.</span>
        </div>
      </div>
    </div>
  );
};
