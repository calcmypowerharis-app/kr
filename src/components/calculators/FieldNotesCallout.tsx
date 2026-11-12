import React from "react";
import { AlertTriangle, Wrench, ShieldAlert } from "lucide-react";

export interface FieldNotePoint {
  title: string;
  text: string;
}

export interface FieldNotesData {
  title?: string;
  badge?: string;
  points: FieldNotePoint[];
}

const FIELD_NOTES_REGISTRY: Record<string, FieldNotesData> = {
  "generator-size-calculator": {
    title: "Where People Get Burned (Generator Sizing Field Notes)",
    badge: "Field Engineering Notes",
    points: [
      {
        title: "Soft-Start Kits Cut AC Inrush Surge by 65% to 70%",
        text: "Direct-on-line compressor starts pull massive Locked Rotor Amps (LRA). Adding an electronic soft-starter (such as a Micro-Air EasyStart) allows a quiet 3,500W inverter generator to reliably start a 13,500 BTU RV or home mini-split AC without tripping.",
      },
      {
        title: "Never Add Every Motor Starting Surge Together",
        text: "Summing every appliance startup surge creates massive, expensive generator oversizing. Sizing standard practice accounts for running wattage across all active equipment plus only the single largest motor starting surge delta.",
      },
      {
        title: "Never Backfeed Through a Dryer Outlet",
        text: "Backfeeding without a mechanical interlock or transfer switch violates NEC Article 702 and can electrocute utility line workers downstream. Always use a dedicated manual transfer switch or interlocked inlet.",
      },
    ],
  },
  "generator-fuel-consumption-calculator": {
    title: "Where People Get Burned (Fuel Planning Field Notes)",
    badge: "Fuel Field Notes",
    points: [
      {
        title: "Light-Load Wet Stacking & Fuel Inefficiency",
        text: "Running a generator below 25% load causes incomplete combustion, cylinder wall glazing, and severe fuel inefficiency. Grouping appliance runtimes or pairing with a battery bank prevents fuel waste.",
      },
      {
        title: "Propane (LPG) Delivers 10% to 15% Lower Output",
        text: "Propane carries fewer BTUs per gallon than gasoline. When running dual-fuel generators on propane, derate maximum continuous wattage by approximately 10% to 15% compared to gasoline ratings.",
      },
      {
        title: "Fuel Degradation and Carburetor Gumming",
        text: "Ethanol-blended pump gasoline begins degrading within 30 to 60 days, gumming small carburetor jets. Always use fuel stabilizer or run the carburetor dry before seasonal storage.",
      },
    ],
  },
  "ups-battery-backup-calculator": {
    title: "Where People Get Burned (Battery & UPS Runtime Notes)",
    badge: "Runtime Field Notes",
    points: [
      {
        title: "Inverter Idle Self-Consumption Drains Batteries",
        text: "A standalone 1,000W to 2,000W inverter consumes 15W to 45W continuously just by being powered on. For light 20W loads (like WiFi routers), inverter self-consumption can exceed the appliance load itself.",
      },
      {
        title: "Active PFC Power Supplies Demand Pure Sine Wave",
        text: "Modern gaming PCs, home servers, and high-efficiency furnace blowers feature Active Power Factor Correction (PFC). Cheaper modified square wave UPS units can cause buzzing, unexpected restarts, or overheating.",
      },
      {
        title: "Internal Battery Degradation Over 3 to 5 Years",
        text: "Standard internal sealed lead-acid (SLA) AGM batteries in desktop UPS units lose 30% to 50% capacity after 3 years of continuous float charging in warm environments.",
      },
    ],
  },
  "battery-capacity-calculator": {
    title: "Where People Get Burned (Battery Sizing Field Notes)",
    badge: "Storage Field Notes",
    points: [
      {
        title: "Peukert Effect Degrades High-Load Lead-Acid Capacity",
        text: "Discharging lead-acid banks at high C-rates (such as running a microwave on a small bank) cuts delivered capacity by 30% to 40%. LiFePO4 cells maintain flat voltage curves and deliver full capacity under heavy draw.",
      },
      {
        title: "Usable Depth of Discharge (DoD) Dictates Cycle Life",
        text: "Lead-acid and AGM batteries should rarely be discharged past 50% DoD to prevent accelerated plate sulfation. LiFePO4 safely cycles to 80% to 90% DoD for 3,000 to 5,000 cycles.",
      },
      {
        title: "Series Wiring Requires Voltage-Matched Balancing",
        text: "When wiring 12V batteries in series for 24V or 48V banks, small internal resistance mismatches cause uneven charging. Always fully charge each battery individually in parallel before series assembly.",
      },
    ],
  },
  "inverter-size-calculator": {
    title: "Where People Get Burned (Inverter Sizing Field Notes)",
    badge: "Inverter Field Notes",
    points: [
      {
        title: "DC Amperage Demands Heavy Gauge Copper Cables",
        text: "A 2,000W inverter running at full capacity on a 12V bank draws over 180 Amps DC. Undersized cables cause severe voltage drop, triggering premature low-voltage inverter shutdown under load.",
      },
      {
        title: "Inverter Surge Ratings Last Only Milliseconds",
        text: "Advertised peak surge ratings (e.g. 4,000W surge on a 2,000W inverter) typically apply for 20 to 100 milliseconds. Sustained motor starting surges longer than half a second will trip inverter overload protection.",
      },
      {
        title: "Fuse Placement at the Battery Terminal",
        text: "The DC positive fuse (Class T or MRBF) must be located within 7 inches of the battery terminal to protect against dead-short catastrophic cable fires before reaching the inverter.",
      },
    ],
  },
  "solar-system-size-calculator": {
    title: "Where People Get Burned (Solar Sizing Field Notes)",
    badge: "Solar Field Notes",
    points: [
      {
        title: "Peak Sun Hours are Not Daylight Hours",
        text: "A 12-hour summer day typically yields only 4.5 to 5.5 Peak Sun Hours (1,000 W/m² equivalent irradiance). Sizing array capacity using daylight hours results in under-producing arrays.",
      },
      {
        title: "Real-World Derate Factors (15% to 22%)",
        text: "Solar panel nameplate ratings reflect Standard Test Conditions (STC) at 25°C. Hot summer roof temperatures, dust, wiring resistance, and inverter clipping reduce actual harvest by 15% to 22%.",
      },
      {
        title: "Net Metering Rules Differ by Utility",
        text: "Under NEM 3.0 policies, excess solar exported to the grid earns wholesale avoided-cost credits (~$0.05/kWh) rather than retail rates. Sizing systems without battery storage for self-consumption lengthens payback periods.",
      },
    ],
  },
  "solar-battery-calculator": {
    title: "Where People Get Burned (Solar Battery Bank Field Notes)",
    badge: "Battery Field Notes",
    points: [
      {
        title: "Never Charge Standard LiFePO4 Below 32°F (0°C)",
        text: "Charging lithium iron phosphate cells at sub-freezing temperatures causes permanent lithium metal plating, capacity loss, and internal short risks. Use batteries with built-in heating pads or low-temp charge cutoff.",
      },
      {
        title: "Consecutive Cloudy Days Require Autonomy Buffers",
        text: "Sizing for single-day storage guarantees blackouts during multi-day storm systems. Off-grid systems require 2 to 3 days of autonomy buffer, or backup generator auto-start integration.",
      },
      {
        title: "Inverter Conversion Efficiency Loss",
        text: "Stored DC battery power must be converted to 120V/240V AC, losing 8% to 15% in inverter conversion heat. Always derate usable storage by inverter efficiency.",
      },
    ],
  },
  "solar-charge-controller-calculator": {
    title: "Where People Get Burned (Charge Controller Field Notes)",
    badge: "Controller Field Notes",
    points: [
      {
        title: "Cold Winter Temperatures Spike Solar Panel Voc",
        text: "Solar panel open-circuit voltage (Voc) rises as temperatures drop (typically -0.28%/°C to -0.35%/°C). A string that is 95V Voc at 25°C can spike above 115V on a 0°F winter morning, permanently destroying a 100V MPPT controller.",
      },
      {
        title: "PWM Controllers Waste 30% to 40% of High-Voltage Panels",
        text: "A pulse-width modulation (PWM) controller forces solar panel operating voltage down to battery voltage. Connecting a 36V panel to a 12V battery with PWM discards more than half the panel's rated wattage.",
      },
      {
        title: "Charge Controller Output Current Bottleneck",
        text: "The controller Amp rating governs charging current into the battery (Watts ÷ Battery Volts = Amps). A 40A controller on a 12V bank maxes out at ~520W of charging power, regardless of array size.",
      },
    ],
  },
  "solar-panel-tilt-calculator": {
    title: "Where People Get Burned (Panel Tilt & Orientation Notes)",
    badge: "Tilt Field Notes",
    points: [
      {
        title: "Winter Solar Harvest Requires Steep Tilt Angles",
        text: "Setting panels flat or at low summer roof pitches severely hampers winter generation when the sun stays low on the horizon. For off-grid winter reliability, tilt at latitude + 15°.",
      },
      {
        title: "Time-of-Use (TOU) Westward Azimuth Advantage",
        text: "While facing true south maximizes total annual kilowatt-hours, orienting panels southwest or west increases late afternoon harvest, offsetting peak utility billing rates (4 PM to 9 PM).",
      },
      {
        title: "Snow Shedding Needs at Least 20° to 30° Slope",
        text: "Panels tilted under 15° accumulate snow and dust that will not naturally shed, blocking sunlight until manually cleared.",
      },
    ],
  },
  "voltage-drop-calculator": {
    title: "Where People Get Burned (Voltage Drop Field Notes)",
    badge: "Wire Sizing Notes",
    points: [
      {
        title: "NEC 3% is an Informational Note, but Practical Reality",
        text: "NEC Article 210.19(A) Informational Note recommends a maximum 3% branch circuit drop and 5% total feeder-branch drop. While advisory in the code text, excessive drop overheats motors and causes inverter low-voltage cutoffs.",
      },
      {
        title: "12V DC Circuits Drop Voltage 10x Faster than 120V",
        text: "Because voltage is 10 times lower, carrying the same wattage at 12V requires 10 times the current. A 15A load over a 20ft run at 12V drops nearly 5% on 12 AWG wire, requiring 8 AWG or 6 AWG copper.",
      },
      {
        title: "Total Circuit Distance is Round-Trip (Hot + Neutral)",
        text: "When calculating DC or single-phase voltage drop manually, total conductor length is twice the one-way distance (to the load and back along the return conductor).",
      },
    ],
  },
  "watts-to-amps-calculator": {
    title: "Where People Get Burned (Circuit Amperage Field Notes)",
    badge: "Circuit Field Notes",
    points: [
      {
        title: "NEC 80% Continuous-Load Rule (Article 210.20)",
        text: "Any load operating for 3 hours or more (such as space heaters, EV chargers, or water heaters) must not exceed 80% of circuit breaker rating. A 20A breaker safely carries only 16A continuous load.",
      },
      {
        title: "Inductive Loads Draw Apparent Power (VA)",
        text: "Electric motors, refrigerators, and power tools have power factors between 0.70 and 0.85. Breakers respond to total current (Amps = VA ÷ Volts), not pure real watts.",
      },
      {
        title: "Startup Surge Exceeds Standard Amperage",
        text: "Motor startup current can spike 3x to 6x full-load running amps for several cycles. Standard residential breakers feature thermal-magnetic trip curves to absorb brief surges without tripping.",
      },
    ],
  },
  "amps-to-watts-calculator": {
    title: "Where People Get Burned (Breaker Capacity Field Notes)",
    badge: "Breaker Field Notes",
    points: [
      {
        title: "15-Amp Circuit Continuous Limit is 1,440 Watts",
        text: "Although 15A × 120V equals 1,800 Watts nameplate, applying the NEC continuous-load 80% rule limits continuous wattage to 1,440W. Plugging two 1,500W space heaters into the same branch circuit will trip the breaker.",
      },
      {
        title: "20-Amp Circuit Continuous Limit is 1,920 Watts",
        text: "Kitchen, bathroom, and garage 20A circuits (wired with 12 AWG copper) support 1,920 Watts continuous and 2,400 Watts non-continuous total load.",
      },
      {
        title: "Multi-Outlet Circuits Share Total Current",
        text: "All wall outlets on a single branch circuit share the same breaker capacity. Sum the wattage of all active devices across all shared room receptacles.",
      },
    ],
  },
  "three-phase-power-calculator": {
    title: "Where People Get Burned (Three-Phase Power Notes)",
    badge: "Three-Phase Field Notes",
    points: [
      {
        title: "The Square Root of 3 (√3 ≈ 1.732) Multiplier",
        text: "Three-phase power using line-to-line voltage requires multiplying by √3: P = √3 × V_LL × I × PF. Forgetting the 1.732 multiplier results in a 42% undersizing calculation error.",
      },
      {
        title: "Wye (480Y/277V, 208Y/120V) vs. Delta Configurations",
        text: "Wye configurations provide a grounded neutral for single-phase line-to-neutral loads (277V lighting or 120V receptacles). Delta systems carry no neutral unless configured as high-leg delta (wild leg).",
      },
      {
        title: "Unbalanced Phase Currents Overheat Transformers",
        text: "Uneven single-phase load distribution across phases creates neutral return current, excessive neutral heating, and voltage imbalance that derates three-phase induction motors.",
      },
    ],
  },
  "electricity-use-calculator": {
    title: "Where People Get Burned (Energy Consumption Notes)",
    badge: "Energy Audit Notes",
    points: [
      {
        title: "Phantom Standby Loads Account for 10% to 15% of Bills",
        text: "Smart TVs, set-top boxes, audio receivers, and smart appliances draw 5W to 25W continuous standby power 24 hours a day, accumulating 50 to 150 kWh of unmetered monthly waste.",
      },
      {
        title: "Duty Cycle Scaling for Cycling Compressors",
        text: "A 600W refrigerator runs approximately 30% to 40% of each hour under normal room temperatures. Multiplying full nameplate wattage by 24 hours overestimates consumption by more than 2.5 times.",
      },
      {
        title: "Resistance Heating vs Heat Pump Efficiency",
        text: "Electric resistance heaters (space heaters, baseboards) have a Coefficient of Performance (COP) of 1.0 (1kW in = 1kW heat). Modern inverter heat pumps deliver COP 2.5 to 3.5, using 60% to 70% less electricity.",
      },
    ],
  },
  "electricity-cost-calculator": {
    title: "Where People Get Burned (Utility Rate Field Notes)",
    badge: "Utility Billing Notes",
    points: [
      {
        title: "Time-of-Use (TOU) On-Peak Rate Spikes",
        text: "Many electric utilities charge 2x to 3x higher rates during afternoon on-peak windows (e.g. 4 PM to 9 PM). Running high-demand appliances during off-peak hours cuts operating costs without reducing consumption.",
      },
      {
        title: "Tiered Inverted-Block Rates",
        text: "Under tiered billing, consuming electricity beyond baseline monthly allowances pushes subsequent kilowatt-hours into significantly more expensive tiers.",
      },
      {
        title: "Fixed Monthly Customer & Transmission Fees",
        text: "Utility bills include fixed customer service charges ($10 to $30/month) plus transmission surcharges and municipal taxes that apply regardless of energy reduction efforts.",
      },
    ],
  },
};

export function FieldNotesCallout({
  calculatorSlug,
}: {
  calculatorSlug?: string;
}) {
  if (!calculatorSlug) return null;
  const data = FIELD_NOTES_REGISTRY[calculatorSlug];
  if (!data || data.points.length === 0) return null;

  return (
    <div className="bg-slate-50/90 rounded-2xl border border-slate-200/90 p-6 md:p-8 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <Wrench className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              {data.title || "Where People Get Burned (Field Engineering Notes)"}
            </h3>
            <p className="text-xs text-slate-500">
              Practical trade insights, common sizing pitfalls, and code nuances from real-world installations.
            </p>
          </div>
        </div>
        {data.badge && (
          <span className="text-[11px] font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-md self-start sm:self-auto font-mono">
            {data.badge}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.points.map((pt, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <h4 className="text-xs font-bold text-slate-900 leading-snug">
                  {pt.title}
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {pt.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
