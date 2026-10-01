import React from "react";
import { formatKw, formatKwhNumber } from "@/lib/calculators/solar-system-size";

interface SolarSystemSizeFlowDiagramProps {
  monthlyKwh: number;
  dailyEnergyKwh: number;
  targetDailySolarKwh: number;
  solarOffsetPercent: number;
  peakSunHours: number;
  performanceRatio: number;
  systemSizeKw: number;
  panelWattage: number;
  roundedPanelCount: number;
  actualArraySizeKw: number;
  estimatedAnnualProductionKwh: number;
  estimatedRoofAreaModulesSqFt: number;
}

export const SolarSystemSizeFlowDiagram: React.FC<SolarSystemSizeFlowDiagramProps> = ({
  monthlyKwh,
  dailyEnergyKwh,
  targetDailySolarKwh,
  solarOffsetPercent,
  peakSunHours,
  performanceRatio,
  systemSizeKw,
  panelWattage,
  roundedPanelCount,
  actualArraySizeKw,
  estimatedAnnualProductionKwh,
  estimatedRoofAreaModulesSqFt,
}) => {
  const prPercent = Math.round(performanceRatio * 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Solar Energy Sizing & Power Flow Architecture
          </h3>
          <p className="text-xs text-slate-500">
            Translating utility electricity demand into daily solar energy, DC array nameplate rating, and physical panel count.
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 self-start sm:self-auto">
          Planning Sizing Model
        </span>
      </div>

      {/* Responsive SVG Graphic */}
      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 800 240"
          className="w-full min-w-[700px] h-auto font-sans"
          role="img"
          aria-label="Solar system sizing diagram showing conversion from utility consumption to peak sun hours, PV array size, and solar panel count"
        >
          <defs>
            <linearGradient id="consumptionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#f1f5f9" />
            </linearGradient>
            <linearGradient id="solarResourceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fffbeb" />
              <stop offset="100%" stopColor="#fef3c7" />
            </linearGradient>
            <linearGradient id="pvArrayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#eff6ff" />
              <stop offset="100%" stopColor="#dbeafe" />
            </linearGradient>
            <linearGradient id="gridOutputGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ecfdf5" />
              <stop offset="100%" stopColor="#d1fae5" />
            </linearGradient>
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

          {/* Connectors */}
          <line
            x1="180"
            y1="120"
            x2="215"
            y2="120"
            stroke="#94a3b8"
            strokeWidth="2"
            strokeDasharray="4 2"
            markerEnd="url(#arrowhead)"
          />
          <line
            x1="380"
            y1="120"
            x2="415"
            y2="120"
            stroke="#94a3b8"
            strokeWidth="2"
            strokeDasharray="4 2"
            markerEnd="url(#arrowhead)"
          />
          <line
            x1="580"
            y1="120"
            x2="615"
            y2="120"
            stroke="#94a3b8"
            strokeWidth="2"
            strokeDasharray="4 2"
            markerEnd="url(#arrowhead)"
          />

          {/* Block 1: Household Consumption */}
          <g transform="translate(10, 20)">
            <rect
              width="170"
              height="200"
              rx="12"
              fill="url(#consumptionGrad)"
              stroke="#cbd5e1"
              strokeWidth="1.5"
            />
            <rect width="170" height="32" rx="12" fill="#e2e8f0" />
            <text x="85" y="21" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="700">
              1. UTILITY CONSUMPTION
            </text>

            <text x="85" y="60" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="800">
              {formatKwhNumber(monthlyKwh)} kWh
            </text>
            <text x="85" y="76" textAnchor="middle" fill="#64748b" fontSize="10">
              Monthly Bill Baseline
            </text>

            <line x1="20" y1="92" x2="150" y2="92" stroke="#cbd5e1" strokeWidth="1" />

            <text x="85" y="112" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="600">
              Daily Demand:
            </text>
            <text x="85" y="128" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="700">
              {formatKwhNumber(dailyEnergyKwh)} kWh/day
            </text>

            <text x="85" y="152" textAnchor="middle" fill="#475569" fontSize="10">
              Target Solar Offset:
            </text>
            <text x="85" y="168" textAnchor="middle" fill="#2563eb" fontSize="12" fontWeight="700">
              {solarOffsetPercent}% ({formatKwhNumber(targetDailySolarKwh)} kWh/d)
            </text>

            <text x="85" y="198" textAnchor="middle" fill="#94a3b8" fontSize="9">
              Standard 30-Day Cycle
            </text>
          </g>

          {/* Block 2: Solar Resource & Derating */}
          <g transform="translate(210, 20)">
            <rect
              width="170"
              height="200"
              rx="12"
              fill="url(#solarResourceGrad)"
              stroke="#fcd34d"
              strokeWidth="1.5"
            />
            <rect width="170" height="32" rx="12" fill="#fef08a" />
            <text x="85" y="21" textAnchor="middle" fill="#78350f" fontSize="11" fontWeight="700">
              2. SOLAR RESOURCE & LOSSES
            </text>

            <text x="85" y="60" textAnchor="middle" fill="#78350f" fontSize="18" fontWeight="800">
              {peakSunHours.toFixed(1)} PSH
            </text>
            <text x="85" y="76" textAnchor="middle" fill="#b45309" fontSize="10">
              Peak Sun Hours (1 kW/m²)
            </text>

            <line x1="20" y1="92" x2="150" y2="92" stroke="#fde68a" strokeWidth="1" />

            <text x="85" y="112" textAnchor="middle" fill="#78350f" fontSize="11" fontWeight="600">
              Planning Factor:
            </text>
            <text x="85" y="128" textAnchor="middle" fill="#92400e" fontSize="13" fontWeight="700">
              {prPercent}% Planning Factor
            </text>

            <text x="85" y="152" textAnchor="middle" fill="#78350f" fontSize="10">
              Daily Yield Factor:
            </text>
            <text x="85" y="168" textAnchor="middle" fill="#b45309" fontSize="12" fontWeight="700">
              {(peakSunHours * performanceRatio).toFixed(2)} kWh / kW / day
            </text>

            <text x="85" y="198" textAnchor="middle" fill="#a16207" fontSize="9">
              Inverter, Temp, Soiling
            </text>
          </g>

          {/* Block 3: Required PV Array & Panels */}
          <g transform="translate(410, 20)">
            <rect
              width="170"
              height="200"
              rx="12"
              fill="url(#pvArrayGrad)"
              stroke="#93c5fd"
              strokeWidth="1.5"
            />
            <rect width="170" height="32" rx="12" fill="#bfdbfe" />
            <text x="85" y="21" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="700">
              3. REQUIRED PV ARRAY
            </text>

            <text x="85" y="60" textAnchor="middle" fill="#1e3a8a" fontSize="18" fontWeight="800">
              {formatKw(systemSizeKw)} kW DC
            </text>
            <text x="85" y="76" textAnchor="middle" fill="#2563eb" fontSize="10">
              Calculated Nameplate Size
            </text>

            <line x1="20" y1="92" x2="150" y2="92" stroke="#bfdbfe" strokeWidth="1" />

            <text x="85" y="112" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="600">
              Selected Panel Rating:
            </text>
            <text x="85" y="128" textAnchor="middle" fill="#1d4ed8" fontSize="13" fontWeight="700">
              {panelWattage}W Modules
            </text>

            <text x="85" y="152" textAnchor="middle" fill="#1e40af" fontSize="10">
              Approximate Module Count:
            </text>
            <text x="85" y="172" textAnchor="middle" fill="#1e3a8a" fontSize="16" fontWeight="800">
              ~{roundedPanelCount} Panels
            </text>

            <text x="85" y="198" textAnchor="middle" fill="#64748b" fontSize="9">
              ~{estimatedRoofAreaModulesSqFt} sq ft module area
            </text>
          </g>

          {/* Block 4: Output & Clean Generation */}
          <g transform="translate(610, 20)">
            <rect
              width="170"
              height="200"
              rx="12"
              fill="url(#gridOutputGrad)"
              stroke="#86efac"
              strokeWidth="1.5"
            />
            <rect width="170" height="32" rx="12" fill="#bbf7d0" />
            <text x="85" y="21" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="700">
              4. ESTIMATED PRODUCTION
            </text>

            <text x="85" y="60" textAnchor="middle" fill="#065f46" fontSize="18" fontWeight="800">
              {formatKw(actualArraySizeKw)} kW
            </text>
            <text x="85" y="76" textAnchor="middle" fill="#059669" fontSize="10">
              Installed Array Rating
            </text>

            <line x1="20" y1="92" x2="150" y2="92" stroke="#a7f3d0" strokeWidth="1" />

            <text x="85" y="112" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="600">
              Daily Solar Harvest:
            </text>
            <text x="85" y="128" textAnchor="middle" fill="#047857" fontSize="13" fontWeight="700">
              {(actualArraySizeKw * peakSunHours * performanceRatio).toFixed(1)} kWh / day
            </text>

            <text x="85" y="152" textAnchor="middle" fill="#047857" fontSize="10">
              Est. Annual Output:
            </text>
            <text x="85" y="170" textAnchor="middle" fill="#065f46" fontSize="14" fontWeight="800">
              ~{formatKwhNumber(estimatedAnnualProductionKwh)} kWh/yr
            </text>

            <text x="85" y="198" textAnchor="middle" fill="#059669" fontSize="9">
              Estimated Solar Production
            </text>
          </g>
        </svg>
      </div>

      {/* Explanatory notes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100 text-xs text-slate-600">
        <div>
          <span className="font-semibold text-slate-800">1. Consumption Offset: </span>
          Planning for {solarOffsetPercent}% offset sizes the solar array to match {formatKwhNumber(targetDailySolarKwh)} kWh of your average daily utility bill.
        </div>
        <div>
          <span className="font-semibold text-slate-800">2. Solar Insolation: </span>
          {peakSunHours.toFixed(1)} peak sun hours combined with a {prPercent}% planning performance factor yields {(peakSunHours * performanceRatio).toFixed(2)} estimated kWh per kW of array capacity daily.
        </div>
        <div>
          <span className="font-semibold text-slate-800">3. Module Count: </span>
          Rounding up to {roundedPanelCount} modules of {panelWattage}W yields a total installed DC nameplate rating of {formatKw(actualArraySizeKw)} kW.
        </div>
      </div>
    </div>
  );
};
