import React from "react";
import Link from "next/link";
import {
  Zap,
  Calculator,
  Activity,
  ShieldCheck,
  AlertTriangle,
  Layers,
  Wrench,
  Gauge,
  Cpu,
  BarChart3,
  Flame,
  CheckCircle2,
} from "lucide-react";

interface NemaMotorRow {
  hp: number;
  kwMech: string;
  efficiency: string;
  pf: string;
  fla208v: string;
  fla240v: string;
  fla480v: string;
  lra480v: string;
  minWireAmpacity: string;
  maxBreaker480v: string;
}

const NEMA_MOTOR_DATA: NemaMotorRow[] = [
  {
    hp: 5,
    kwMech: "3.73 kW",
    efficiency: "89.5%",
    pf: "0.82",
    fla208v: "16.7 A",
    fla240v: "15.2 A",
    fla480v: "7.6 A",
    lra480v: "46.0 A",
    minWireAmpacity: "9.5 A (14 AWG)",
    maxBreaker480v: "20 A",
  },
  {
    hp: 7.5,
    kwMech: "5.60 kW",
    efficiency: "91.0%",
    pf: "0.83",
    fla208v: "24.2 A",
    fla240v: "22.0 A",
    fla480v: "11.0 A",
    lra480v: "66.0 A",
    minWireAmpacity: "13.8 A (14 AWG)",
    maxBreaker480v: "30 A",
  },
  {
    hp: 10,
    kwMech: "7.46 kW",
    efficiency: "91.7%",
    pf: "0.84",
    fla208v: "30.8 A",
    fla240v: "28.0 A",
    fla480v: "14.0 A",
    lra480v: "84.0 A",
    minWireAmpacity: "17.5 A (12 AWG)",
    maxBreaker480v: "35 A",
  },
  {
    hp: 15,
    kwMech: "11.19 kW",
    efficiency: "92.4%",
    pf: "0.85",
    fla208v: "46.2 A",
    fla240v: "42.0 A",
    fla480v: "21.0 A",
    lra480v: "126.0 A",
    minWireAmpacity: "26.3 A (10 AWG)",
    maxBreaker480v: "50 A",
  },
  {
    hp: 20,
    kwMech: "14.91 kW",
    efficiency: "93.0%",
    pf: "0.86",
    fla208v: "59.4 A",
    fla240v: "54.0 A",
    fla480v: "27.0 A",
    lra480v: "162.0 A",
    minWireAmpacity: "33.8 A (8 AWG)",
    maxBreaker480v: "70 A",
  },
  {
    hp: 25,
    kwMech: "18.64 kW",
    efficiency: "93.6%",
    pf: "0.86",
    fla208v: "74.8 A",
    fla240v: "68.0 A",
    fla480v: "34.0 A",
    lra480v: "204.0 A",
    minWireAmpacity: "42.5 A (8 AWG)",
    maxBreaker480v: "90 A",
  },
  {
    hp: 30,
    kwMech: "22.37 kW",
    efficiency: "93.6%",
    pf: "0.87",
    fla208v: "88.0 A",
    fla240v: "80.0 A",
    fla480v: "40.0 A",
    lra480v: "240.0 A",
    minWireAmpacity: "50.0 A (6 AWG)",
    maxBreaker480v: "100 A",
  },
  {
    hp: 40,
    kwMech: "29.83 kW",
    efficiency: "94.1%",
    pf: "0.87",
    fla208v: "114.0 A",
    fla240v: "104.0 A",
    fla480v: "52.0 A",
    lra480v: "312.0 A",
    minWireAmpacity: "65.0 A (4 AWG)",
    maxBreaker480v: "125 A",
  },
  {
    hp: 50,
    kwMech: "37.29 kW",
    efficiency: "94.5%",
    pf: "0.88",
    fla208v: "143.0 A",
    fla240v: "130.0 A",
    fla480v: "65.0 A",
    lra480v: "390.0 A",
    minWireAmpacity: "81.3 A (3 AWG)",
    maxBreaker480v: "175 A",
  },
  {
    hp: 60,
    kwMech: "44.74 kW",
    efficiency: "95.0%",
    pf: "0.88",
    fla208v: "169.0 A",
    fla240v: "154.0 A",
    fla480v: "77.0 A",
    lra480v: "462.0 A",
    minWireAmpacity: "96.3 A (1 AWG)",
    maxBreaker480v: "200 A",
  },
  {
    hp: 75,
    kwMech: "55.93 kW",
    efficiency: "95.4%",
    pf: "0.88",
    fla208v: "211.0 A",
    fla240v: "192.0 A",
    fla480v: "96.0 A",
    lra480v: "576.0 A",
    minWireAmpacity: "120.0 A (1/0 AWG)",
    maxBreaker480v: "250 A",
  },
  {
    hp: 100,
    kwMech: "74.57 kW",
    efficiency: "95.4%",
    pf: "0.89",
    fla208v: "273.0 A",
    fla240v: "248.0 A",
    fla480v: "124.0 A",
    lra480v: "744.0 A",
    minWireAmpacity: "155.0 A (2/0 AWG)",
    maxBreaker480v: "300 A",
  },
  {
    hp: 150,
    kwMech: "111.86 kW",
    efficiency: "95.8%",
    pf: "0.89",
    fla208v: "396.0 A",
    fla240v: "360.0 A",
    fla480v: "180.0 A",
    lra480v: "1,080.0 A",
    minWireAmpacity: "225.0 A (4/0 AWG)",
    maxBreaker480v: "450 A",
  },
  {
    hp: 200,
    kwMech: "149.14 kW",
    efficiency: "96.2%",
    pf: "0.90",
    fla208v: "528.0 A",
    fla240v: "480.0 A",
    fla480v: "240.0 A",
    lra480v: "1,440.0 A",
    minWireAmpacity: "300.0 A (350 kcmil)",
    maxBreaker480v: "600 A",
  },
];

export const ThreePhasePowerGuideSection: React.FC = () => {
  return (
    <section className="mt-16 pt-12 border-t border-slate-200 space-y-12 text-slate-800">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5" />
          <span>Polyphase Engineering &amp; Power Distribution Standards</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Three-Phase Electrical Engineering Guide: Delta vs. Wye, Motor Circuits &amp; Harmonics
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Three-phase alternating current serves as the global standard for industrial power distribution, large motor operations, and commercial electrical infrastructure.
        </p>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Unlike single-phase circuits that pulse with fluctuating instantaneous power, a balanced three-phase system delivers constant mechanical torque to motors and transmits three times more electrical energy using only 75% of the conductor copper mass.
        </p>
      </div>

      {/* Section 1: US Commercial & Industrial Three-Phase Systems */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            1. US Commercial and Industrial Three-Phase Distribution Systems
          </h3>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          In the United States, commercial and industrial power distribution relies on five standard voltage configurations. Each architecture satisfies distinct operational trade-offs between lighting branch convenience, motor torque efficiency, and copper conductor cross-section.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          The table below outlines nominal line-to-line and line-to-neutral ratings, transformer secondary grounding methods, and typical facility applications across North America.
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
          <table className="min-w-full text-xs sm:text-sm text-left divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-700 font-bold">
              <tr>
                <th className="py-3 px-3">System Voltage</th>
                <th className="py-3 px-3">Topology</th>
                <th className="py-3 px-3">Line-to-Line (V_LL)</th>
                <th className="py-3 px-3">Line-to-Neutral (V_LN)</th>
                <th className="py-3 px-3">Grounding Method</th>
                <th className="py-3 px-3">Typical Facility Applications</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-900">120/208V</td>
                <td className="py-2.5 px-3">4-Wire Wye</td>
                <td className="py-2.5 px-3 font-mono">208 V RMS</td>
                <td className="py-2.5 px-3 font-mono text-blue-700 font-semibold">120 V RMS</td>
                <td className="py-2.5 px-3">Solidly Grounded Neutral</td>
                <td className="py-2.5 px-3 text-slate-600">Offices, retail, schools, light commercial equipment</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="py-2.5 px-3 font-semibold text-slate-900">240V</td>
                <td className="py-2.5 px-3">3-Wire Delta</td>
                <td className="py-2.5 px-3 font-mono">240 V RMS</td>
                <td className="py-2.5 px-3 font-mono text-slate-400">None (No neutral)</td>
                <td className="py-2.5 px-3">Ungrounded or Corner-Grounded</td>
                <td className="py-2.5 px-3 text-slate-600">Heavy industrial motor shops, fabrication, rural irrigation</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-900">120/240V</td>
                <td className="py-2.5 px-3">4-Wire High-Leg Delta</td>
                <td className="py-2.5 px-3 font-mono">240 V RMS</td>
                <td className="py-2.5 px-3 font-mono text-amber-700 font-semibold">120V / 208V Wild</td>
                <td className="py-2.5 px-3">Center-Tapped on Phase A-C</td>
                <td className="py-2.5 px-3 text-slate-600">Small manufacturing plants with combined power and lighting</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="py-2.5 px-3 font-semibold text-slate-900">277/480V</td>
                <td className="py-2.5 px-3">4-Wire Wye</td>
                <td className="py-2.5 px-3 font-mono">480 V RMS</td>
                <td className="py-2.5 px-3 font-mono text-blue-700 font-semibold">277 V RMS</td>
                <td className="py-2.5 px-3">Solidly Grounded Neutral</td>
                <td className="py-2.5 px-3 text-slate-600">Standard US industrial plants, data centers, commercial HVAC</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-900">347/600V</td>
                <td className="py-2.5 px-3">4-Wire Wye</td>
                <td className="py-2.5 px-3 font-mono">600 V RMS</td>
                <td className="py-2.5 px-3 font-mono text-blue-700 font-semibold">347 V RMS</td>
                <td className="py-2.5 px-3">Solidly Grounded Neutral</td>
                <td className="py-2.5 px-3 text-slate-600">Canadian standard industrial, heavy mining, paper mills</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 2: Delta vs. Wye Vector Derivation & High-Leg Delta */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <Calculator className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            2. Delta vs. Wye Mathematical Derivation and Vector Geometry
          </h3>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          The relationship between line-to-line voltage and line-to-neutral voltage in a three-phase Wye system is derived from phasor trigonometry. In a balanced system, the three phase voltages are separated by 120 electrical degrees:
        </p>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 font-mono text-xs sm:text-sm text-slate-900 space-y-1.5">
          <div>V_A = V_LN ∠ 0° = V_LN (1.0 + j0.0)</div>
          <div>V_B = V_LN ∠ -120° = V_LN (-0.5 - j0.8660)</div>
          <div>V_AB = V_A - V_B = V_LN [1.0 - (-0.5) + j(0 - (-0.8660))] = V_LN (1.5 + j0.8660)</div>
          <div>|V_AB| = V_LN × √((1.5)² + (0.8660)²) = V_LN × √(2.25 + 0.75) = V_LN × √3 ≈ 1.73205 × V_LN</div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          This mathematical proof confirms why standard 120V line-to-neutral voltage produces 208V line-to-line (120 × 1.73205 = 207.85V), and why 277V line-to-neutral produces 480V line-to-line (277.13 × 1.73205 = 480V).
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          Current relationships follow an inverse pattern. In a Wye system, line current equals phase winding current. In a Delta system, line current equals square root of three times phase current.
        </p>

        {/* High-Leg Delta Callout Card */}
        <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 font-bold text-amber-950 text-sm sm:text-base">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>High-Leg Delta 208V Wild Leg Hazard (NEC 110.15)</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            In a 120/240V 4-wire High-Leg Delta system, one transformer winding is center-tapped to supply 120V branch circuits from Phase A and Phase C to neutral.
          </p>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Because Phase B sits geometrically opposite the center tap, the voltage between Phase B and neutral calculates to:
          </p>
          <div className="bg-white p-2.5 rounded border border-amber-200 font-mono text-xs text-amber-950 font-bold">
            V_B-N = √((240)² - (120)²) = √(57,600 - 14,400) = √43,200 ≈ 207.85 Volts
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Connecting a single-phase 120V load to Phase B destroys equipment instantly. NEC Section 110.15 mandates that Phase B must be permanently identified by an orange finish or tag at all connection points.
          </p>
        </div>
      </div>

      {/* Section 3: Master NEMA Design B Motor Sizing Table */}
      <div className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
            <Gauge className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            3. Master NEMA Design B Motor Sizing Table (5 HP to 200 HP)
          </h3>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          Electric induction motors drive most three-phase loads in industrial and commercial buildings. Motor horsepower reflects mechanical shaft output, not electrical input demand.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          To calculate electrical full-load current (FLA), divide shaft power by operating efficiency and power factor. The reference table below details electrical parameters, locked-rotor inrush current, and minimum conductor ampacities based on NEC Table 430.250.
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
          <table className="min-w-full text-xs sm:text-sm text-left divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-700 font-bold">
              <tr>
                <th className="py-3 px-3">Motor HP</th>
                <th className="py-3 px-3">Mech kW</th>
                <th className="py-3 px-3">Efficiency</th>
                <th className="py-3 px-3">Power Factor</th>
                <th className="py-3 px-3">208V FLA</th>
                <th className="py-3 px-3">240V FLA</th>
                <th className="py-3 px-3">480V FLA</th>
                <th className="py-3 px-3">480V LRA Inrush</th>
                <th className="py-3 px-3">Min Conductor Ampacity</th>
                <th className="py-3 px-3">Max 480V Breaker</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {NEMA_MOTOR_DATA.map((row) => (
                <tr key={row.hp} className={row.hp % 2 === 0 ? "bg-slate-50/50" : ""}>
                  <td className="py-2.5 px-3 font-bold text-slate-900">{row.hp} HP</td>
                  <td className="py-2.5 px-3 text-slate-600">{row.kwMech}</td>
                  <td className="py-2.5 px-3 font-mono">{row.efficiency}</td>
                  <td className="py-2.5 px-3 font-mono">{row.pf}</td>
                  <td className="py-2.5 px-3 font-mono">{row.fla208v}</td>
                  <td className="py-2.5 px-3 font-mono">{row.fla240v}</td>
                  <td className="py-2.5 px-3 font-mono font-semibold text-blue-700">{row.fla480v}</td>
                  <td className="py-2.5 px-3 font-mono text-rose-700 font-semibold">{row.lra480v}</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-700 font-semibold">{row.minWireAmpacity}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-900">{row.maxBreaker480v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          FLA values conform to NEC Table 430.250 for squirrel-cage induction motors operating at standard 1,800 RPM synchronous speeds. LRA values reflect NEMA Code G locked-rotor standards.
        </p>
      </div>

      {/* Section 4: NEC Article 430 Motor Branch Circuit Sizing & Worked Example */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
            <Wrench className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            4. NEC Article 430 Motor Branch Circuit Sizing and Worked Example
          </h3>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          Sizing an electric motor circuit under the National Electrical Code requires coordinating four separate protection elements. Unlike ordinary resistive branch circuits where breakers provide both overload and short-circuit protection, motor circuits separate these functions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <div className="font-bold text-slate-900 text-sm">Part 1: Branch Conductors</div>
            <div className="text-xs text-blue-700 font-mono font-semibold">NEC Section 430.22</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Conductors supplying a single motor must possess an allowable ampacity of not less than 125% of the motor full-load current rating from Table 430.250.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <div className="font-bold text-slate-900 text-sm">Part 2: Overload Protection</div>
            <div className="text-xs text-blue-700 font-mono font-semibold">NEC Section 430.32</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Thermal overload heaters or solid-state electronic relays must be sized between 115% and 125% of the motor actual nameplate current to guard against winding burnout.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <div className="font-bold text-slate-900 text-sm">Part 3: Short-Circuit Protection</div>
            <div className="text-xs text-blue-700 font-mono font-semibold">NEC Table 430.52</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Inverse-time circuit breakers may be sized up to 250% of Table 430.250 FLA to absorb starting inrush current without nuisance tripping during motor acceleration.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <div className="font-bold text-slate-900 text-sm">Part 4: Disconnecting Means</div>
            <div className="text-xs text-blue-700 font-mono font-semibold">NEC 430.109 / 430.110</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Disconnect switches must be horsepower-rated, located within sight of the motor controller, and sized for at least 115% of motor full-load current.
            </p>
          </div>
        </div>

        {/* Worked Walkthrough Card */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3">
          <h4 className="text-base font-bold text-slate-900">
            Worked Engineering Walkthrough: 30 HP 480V Commercial Chiller Motor
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Consider a 30 HP, 480V, 3-phase commercial chiller motor with a nameplate FLA of 36.5 Amps and a 1.15 service factor.
          </p>
          <div className="space-y-2 text-xs font-mono bg-white p-4 rounded border border-slate-200 text-slate-800">
            <div>Step 1 (Table FLA): NEC Table 430.250 establishes standard 30 HP 480V motor FLA as 40.0 Amps.</div>
            <div>Step 2 (Conductors): 40.0 A × 125% = 50.0 Amps minimum ampacity. Selecting 75°C THHN copper requires 6 AWG (rated 65 Amps).</div>
            <div>Step 3 (Overload): 36.5 A nameplate × 125% = 45.6 Amps maximum overload trip setting.</div>
            <div>Step 4 (Breaker): 40.0 A × 250% = 100.0 Amps. Selecting a standard 100A 3-pole inverse-time thermal-magnetic circuit breaker.</div>
            <div>Step 5 (Disconnect): 40.0 A × 115% = 46.0 Amps. Requires a 60A / 30 HP rated heavy-duty fused safety switch.</div>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Verify voltage drop across the feeder run with our <Link href="/voltage-drop-calculator" className="text-blue-600 hover:underline font-semibold">voltage drop calculator</Link> to ensure voltage loss remains below 3% under continuous full load.
          </p>
        </div>
      </div>

      {/* Section 5: Unbalanced Phase Loads & Triplen Harmonics */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
            <Activity className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            5. Unbalanced Loads, Neutral Return Currents and Triplen Harmonics
          </h3>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          In a perfectly balanced three-phase Wye circuit, the instantaneous sum of currents in all three phase conductors equals zero at every instant. The grounded neutral conductor carries zero Amps.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          However, real commercial facilities connect single-phase branch circuits unevenly across phases, creating current unbalance. The return current flowing through the neutral conductor is determined by vector summation:
        </p>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 font-mono text-center text-xs sm:text-sm text-slate-900 font-bold">
          I_Neutral = √(I_A² + I_B² + I_C² - (I_A × I_B + I_B × I_C + I_C × I_A))
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          For example, if Phase A carries 65 Amps, Phase B carries 45 Amps, and Phase C carries 20 Amps, the neutral conductor carries 39.05 Amps back to the transformer.
        </p>

        {/* Harmonics Sub-card */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3">
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Flame className="w-4 h-4 text-rose-600" />
            <span>Zero-Sequence Triplen Harmonics and 200% Neutral Sizing</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Modern commercial facilities operate high concentrations of non-linear electronic equipment, including variable frequency drives, LED drivers, computer servers, and switching power supplies.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            These non-linear loads draw distorted, non-sinusoidal currents rich in third-order odd harmonics (3rd, 9th, 15th, and 21st harmonic frequencies).
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Unlike fundamental 60 Hz currents that cancel at 120-degree phase angles, third harmonic currents (180 Hz) are in-phase with one another. Triplen harmonics sum arithmetically inside the neutral conductor:
          </p>
          <div className="bg-white p-2.5 rounded border border-slate-200 font-mono text-xs text-rose-950 font-bold">
            I_Neutral(triplen) = 3 × I_Phase(3rd harmonic)
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            In server rooms and broadcast studios, measured neutral current can reach 130% to 173% of phase conductor current. NEC Section 310.15(E)(3) classifies such neutrals as current-carrying conductors, requiring 200% oversized neutral busbars and K-rated transformers to prevent electrical fires.
          </p>
        </div>
      </div>

      {/* Section 6: Power Factor Correction Capacitors & Utility Economics */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-cyan-50 text-cyan-600 rounded-lg">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            6. Power Factor Correction Capacitors and Utility Demand Economics
          </h3>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          Three-phase AC power divides into three orthogonal components forming the electrical power triangle: active real power (P in kW), reactive magnetizing power (Q in kVAR), and apparent total power (S in kVA).
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          Induction motors and transformers require reactive current to sustain magnetic fields. When an industrial facility operates with low power factor (e.g. 0.70 to 0.80 lagging), conductors carry excess non-working current.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <h4 className="text-sm font-bold text-slate-900">Capacitor Bank Sizing Equation</h4>
            <div className="text-xs font-mono bg-white p-2.5 rounded border border-slate-200 text-slate-800">
              Q_cap (kVAR) = P (kW) × (tan(θ₁) - tan(θ₂))
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Where θ₁ is the initial phase angle (arccos(PF₁)) and θ₂ is the target corrected phase angle (arccos(PF₂)).
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <h4 className="text-sm font-bold text-slate-900">Conductor Thermal Loss Reduction</h4>
            <div className="text-xs font-mono bg-white p-2.5 rounded border border-slate-200 text-slate-800">
              Loss Reduction % = (1 - (PF₁ ÷ PF₂)²) × 100%
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Improving plant power factor from 0.75 to 0.95 cuts conductor I²R thermal resistive line losses by 37.7%, reducing transformer operating temperatures.
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          Worked scenario: A manufacturing facility draws 100 kW at an uncorrected 0.75 lagging power factor (133.3 kVA demand). Installing a 55.3 kVAR capacitor bank raises power factor to 0.95, reducing apparent power to 105.3 kVA and liberating 28 kVA of transformer capacity while eliminating utility penalty surcharges.
        </p>
      </div>

      {/* Section 7: Field Power Measurement & Two-Wattmeter Method */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            7. Field Power Measurement: Blondel&apos;s Theorem and Two-Wattmeter Method
          </h3>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          Measuring true three-phase electrical power in the field is governed by Blondel&apos;s Theorem. The theorem proves that total real power in any system of N conductors can be measured completely using N - 1 wattmeters.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          In a 3-wire system (Delta or ungrounded Wye without neutral), exactly two wattmeters are sufficient to measure total real power and calculate load power factor using the Aron two-wattmeter method:
        </p>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 font-mono text-xs sm:text-sm text-slate-900 space-y-1.5">
          <div>P_Total = P₁ + P₂</div>
          <div>P₁ = V_AC × I_A × cos(30° - θ)</div>
          <div>P₂ = V_BC × I_B × cos(30° + θ)</div>
          <div>tan(θ) = √3 × ((P₁ - P₂) ÷ (P₁ + P₂))</div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          When the circuit power factor is exactly unity (1.0), both wattmeters display identical positive values. When power factor equals 0.50 lagging, the phase angle reaches 60 degrees, and wattmeter 2 drops to exactly zero.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          If power factor drops below 0.50 lagging, wattmeter 2 displays a negative reading. The technician must reverse the meter voltage leads and subtract the reading from wattmeter 1 to determine true active power.
        </p>

        <p className="text-sm text-slate-600 leading-relaxed">
          To calculate single-phase equivalent branch loads and breaker sizing, explore our companion <Link href="/watts-to-amps-calculator" className="text-blue-600 hover:underline font-semibold">watts to amps calculator</Link> and <Link href="/amps-to-watts-calculator" className="text-blue-600 hover:underline font-semibold">amps to watts calculator</Link>, or check residential panel limits with our guide on <Link href="/how-many-watts-can-a-15-amp-or-20-amp-circuit-handle" className="text-blue-600 hover:underline font-semibold">how many watts a 15A or 20A circuit can handle</Link>.
        </p>
      </div>
    </section>
  );
};
