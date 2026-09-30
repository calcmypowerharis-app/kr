import React from "react";
import { formatKwh, formatWh, formatAh } from "@/lib/calculators/solar-battery";

interface SolarBatteryFlowDiagramProps {
  dailyKwh: number;
  dailyWh: number;
  autonomyDays: number;
  autonomyKwh: number;
  deliveryKwh: number;
  inverterEffPercent: number;
  nominalKwh: number;
  nominalWh: number;
  dodPercent: number;
  systemVoltage: number;
  bankAh: number;
}

export const SolarBatteryFlowDiagram: React.FC<SolarBatteryFlowDiagramProps> = ({
  dailyKwh,
  dailyWh,
  autonomyDays,
  autonomyKwh,
  deliveryKwh,
  inverterEffPercent,
  nominalKwh,
  nominalWh,
  dodPercent,
  systemVoltage,
  bankAh,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Energy Tier Flow: Sizing Deration Sequence
          </h3>
          <p className="text-xs text-slate-500">
            Visualizing the mathematical transition from raw daily consumption down to nominal battery-bank Amp-hours.
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
          aria-label="Solar battery sizing energy tier flow diagram from daily load to battery bank Amp-hours"
        >
          <title>Solar Battery Bank Sizing Flow Diagram</title>
          <desc>
            Mathematical sequence: Daily Load ({formatKwh(dailyKwh)} kWh) multiplied by Autonomy ({autonomyDays} days) yields Load Energy ({formatKwh(autonomyKwh)} kWh), derated by Inverter Efficiency ({inverterEffPercent}%) yields Delivery Energy ({formatKwh(deliveryKwh)} kWh), derated by DoD ({dodPercent}%) yields Nominal Battery Capacity ({formatKwh(nominalKwh)} kWh / {formatWh(nominalWh)} Wh), divided by {systemVoltage}V DC bus yields {formatAh(bankAh)} Amp-hours.
          </desc>

          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="7"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="#94a3b8" />
            </marker>
          </defs>

          {/* Background tracks / connector lines */}
          <line
            x1="180"
            y1="90"
            x2="230"
            y2="90"
            stroke="#cbd5e1"
            strokeWidth="2.5"
            markerEnd="url(#arrowhead)"
          />
          <line
            x1="390"
            y1="90"
            x2="440"
            y2="90"
            stroke="#cbd5e1"
            strokeWidth="2.5"
            markerEnd="url(#arrowhead)"
          />
          <line
            x1="600"
            y1="90"
            x2="650"
            y2="90"
            stroke="#cbd5e1"
            strokeWidth="2.5"
            markerEnd="url(#arrowhead)"
          />
          <line
            x1="810"
            y1="90"
            x2="850"
            y2="90"
            stroke="#cbd5e1"
            strokeWidth="2.5"
            markerEnd="url(#arrowhead)"
          />

          {/* STAGE 1: Daily Energy Consumption */}
          <g transform="translate(10, 20)">
            <rect
              width="170"
              height="140"
              rx="12"
              fill="#f8fafc"
              stroke="#cbd5e1"
              strokeWidth="1.5"
            />
            <rect width="170" height="28" rx="12" fill="#e2e8f0" />
            <rect y="16" width="170" height="12" fill="#e2e8f0" />
            <text
              x="85"
              y="18"
              textAnchor="middle"
              fill="#334155"
              fontSize="11"
              fontWeight="700"
              letterSpacing="0.5"
            >
              1. DAILY LOAD (E_daily)
            </text>
            <text
              x="85"
              y="62"
              textAnchor="middle"
              fill="#0f172a"
              fontSize="19"
              fontWeight="800"
            >
              {formatKwh(dailyKwh)} kWh
            </text>
            <text
              x="85"
              y="82"
              textAnchor="middle"
              fill="#64748b"
              fontSize="11"
              fontFamily="monospace"
            >
              {formatWh(dailyWh)} Wh / day
            </text>
            <line x1="16" y1="98" x2="154" y2="98" stroke="#e2e8f0" strokeWidth="1" />
            <text
              x="85"
              y="118"
              textAnchor="middle"
              fill="#64748b"
              fontSize="10"
            >
              AC &amp; DC Appliance Total
            </text>
          </g>

          {/* Operator 1: Multiply by Autonomy */}
          <g transform="translate(185, 45)">
            <rect
              x="0"
              y="0"
              width="45"
              height="24"
              rx="6"
              fill="#eff6ff"
              stroke="#bfdbfe"
              strokeWidth="1"
            />
            <text
              x="22.5"
              y="16"
              textAnchor="middle"
              fill="#1d4ed8"
              fontSize="10"
              fontWeight="700"
            >
              × {autonomyDays}d
            </text>
            <text
              x="22.5"
              y="68"
              textAnchor="middle"
              fill="#64748b"
              fontSize="9"
              fontWeight="500"
            >
              Autonomy
            </text>
          </g>

          {/* STAGE 2: Load-Side Autonomy Energy */}
          <g transform="translate(230, 20)">
            <rect
              width="160"
              height="140"
              rx="12"
              fill="#f8fafc"
              stroke="#cbd5e1"
              strokeWidth="1.5"
            />
            <rect width="160" height="28" rx="12" fill="#e2e8f0" />
            <rect y="16" width="160" height="12" fill="#e2e8f0" />
            <text
              x="80"
              y="18"
              textAnchor="middle"
              fill="#334155"
              fontSize="11"
              fontWeight="700"
              letterSpacing="0.5"
            >
              2. LOAD AUTONOMY
            </text>
            <text
              x="80"
              y="62"
              textAnchor="middle"
              fill="#0f172a"
              fontSize="19"
              fontWeight="800"
            >
              {formatKwh(autonomyKwh)} kWh
            </text>
            <text
              x="80"
              y="82"
              textAnchor="middle"
              fill="#64748b"
              fontSize="11"
            >
              {autonomyDays} day{autonomyDays !== 1 ? "s" : ""} reserve
            </text>
            <line x1="16" y1="98" x2="144" y2="98" stroke="#e2e8f0" strokeWidth="1" />
            <text
              x="80"
              y="118"
              textAnchor="middle"
              fill="#64748b"
              fontSize="10"
            >
              Before System Losses
            </text>
          </g>

          {/* Operator 2: Divide by Inverter Efficiency */}
          <g transform="translate(395, 45)">
            <rect
              x="0"
              y="0"
              width="45"
              height="24"
              rx="6"
              fill="#fffbeb"
              stroke="#fde68a"
              strokeWidth="1"
            />
            <text
              x="22.5"
              y="16"
              textAnchor="middle"
              fill="#b45309"
              fontSize="10"
              fontWeight="700"
            >
              ÷ {inverterEffPercent}%
            </text>
            <text
              x="22.5"
              y="68"
              textAnchor="middle"
              fill="#64748b"
              fontSize="9"
              fontWeight="500"
            >
              Inverter Loss
            </text>
          </g>

          {/* STAGE 3: Required Battery-Delivery Energy */}
          <g transform="translate(440, 20)">
            <rect
              width="160"
              height="140"
              rx="12"
              fill="#f8fafc"
              stroke="#cbd5e1"
              strokeWidth="1.5"
            />
            <rect width="160" height="28" rx="12" fill="#e2e8f0" />
            <rect y="16" width="160" height="12" fill="#e2e8f0" />
            <text
              x="80"
              y="18"
              textAnchor="middle"
              fill="#334155"
              fontSize="11"
              fontWeight="700"
              letterSpacing="0.5"
            >
              3. BATTERY DELIVERY
            </text>
            <text
              x="80"
              y="62"
              textAnchor="middle"
              fill="#0f172a"
              fontSize="19"
              fontWeight="800"
            >
              {formatKwh(deliveryKwh)} kWh
            </text>
            <text
              x="80"
              y="82"
              textAnchor="middle"
              fill="#b45309"
              fontSize="11"
              fontWeight="600"
            >
              DC Energy Discharged
            </text>
            <line x1="16" y1="98" x2="144" y2="98" stroke="#e2e8f0" strokeWidth="1" />
            <text
              x="80"
              y="118"
              textAnchor="middle"
              fill="#64748b"
              fontSize="10"
            >
              Accounts for {100 - inverterEffPercent}% Loss
            </text>
          </g>

          {/* Operator 3: Divide by Usable DoD */}
          <g transform="translate(605, 45)">
            <rect
              x="0"
              y="0"
              width="45"
              height="24"
              rx="6"
              fill="#f0fdf4"
              stroke="#bbf7d0"
              strokeWidth="1"
            />
            <text
              x="22.5"
              y="16"
              textAnchor="middle"
              fill="#15803d"
              fontSize="10"
              fontWeight="700"
            >
              ÷ {dodPercent}%
            </text>
            <text
              x="22.5"
              y="68"
              textAnchor="middle"
              fill="#64748b"
              fontSize="9"
              fontWeight="500"
            >
              Usable DoD
            </text>
          </g>

          {/* STAGE 4: Required Nominal Battery Capacity */}
          <g transform="translate(650, 10)">
            <rect
              width="160"
              height="160"
              rx="14"
              fill="#eff6ff"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <rect width="160" height="32" rx="14" fill="#3b82f6" />
            <rect y="16" width="160" height="16" fill="#3b82f6" />
            <text
              x="80"
              y="21"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="11"
              fontWeight="800"
              letterSpacing="0.5"
            >
              4. NOMINAL CAPACITY
            </text>
            <text
              x="80"
              y="74"
              textAnchor="middle"
              fill="#1e3a8a"
              fontSize="23"
              fontWeight="900"
            >
              {formatKwh(nominalKwh)} kWh
            </text>
            <text
              x="80"
              y="96"
              textAnchor="middle"
              fill="#2563eb"
              fontSize="11"
              fontFamily="monospace"
              fontWeight="700"
            >
              {formatWh(nominalWh)} Wh
            </text>
            <line x1="16" y1="112" x2="144" y2="112" stroke="#bfdbfe" strokeWidth="1" />
            <text
              x="80"
              y="134"
              textAnchor="middle"
              fill="#1e40af"
              fontSize="11"
              fontWeight="600"
            >
              Nameplate Target
            </text>
          </g>

          {/* Operator 4: Divide by DC Bus Voltage */}
          <g transform="translate(812, 45)">
            <rect
              x="0"
              y="0"
              width="36"
              height="24"
              rx="6"
              fill="#f1f5f9"
              stroke="#cbd5e1"
              strokeWidth="1"
            />
            <text
              x="18"
              y="16"
              textAnchor="middle"
              fill="#475569"
              fontSize="10"
              fontWeight="700"
            >
              ÷ {systemVoltage}V
            </text>
            <text
              x="18"
              y="68"
              textAnchor="middle"
              fill="#64748b"
              fontSize="9"
              fontWeight="500"
            >
              DC Bus
            </text>
          </g>

          {/* STAGE 5: Battery Bank Amp-Hours */}
          <g transform="translate(850, 10)">
            <rect
              width="100"
              height="160"
              rx="14"
              fill="#ecfdf5"
              stroke="#10b981"
              strokeWidth="2"
            />
            <rect width="100" height="32" rx="14" fill="#10b981" />
            <rect y="16" width="100" height="16" fill="#10b981" />
            <text
              x="50"
              y="21"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="11"
              fontWeight="800"
            >
              5. BANK Ah
            </text>
            <text
              x="50"
              y="74"
              textAnchor="middle"
              fill="#065f46"
              fontSize="20"
              fontWeight="900"
            >
              {formatAh(bankAh, 0)}
            </text>
            <text
              x="50"
              y="94"
              textAnchor="middle"
              fill="#059669"
              fontSize="11"
              fontWeight="700"
            >
              Amp-hours
            </text>
            <line x1="10" y1="112" x2="90" y2="112" stroke="#a7f3d0" strokeWidth="1" />
            <text
              x="50"
              y="134"
              textAnchor="middle"
              fill="#047857"
              fontSize="10"
              fontWeight="600"
            >
              @ {systemVoltage}V DC
            </text>
          </g>

          {/* Bottom Footnote Line */}
          <text
            x="480"
            y="205"
            textAnchor="middle"
            fill="#64748b"
            fontSize="11"
          >
            Formula: Nominal Energy (Wh) = (Daily Energy × Days Autonomy) ÷ (Inverter Efficiency × Usable DoD) | Bank Ah = Nominal Wh ÷ DC Volts
          </text>
        </svg>
      </div>
    </div>
  );
};
