/**
 * Centralized Electrical & Energy Unit Conversion Utilities
 * CalcMyPower.com
 */

// Power conversions
export function wattsToKilowatts(watts: number): number {
  return watts / 1000;
}

export function kilowattsToWatts(kilowatts: number): number {
  return kilowatts * 1000;
}

export function horsepowerToWatts(hp: number): number {
  return hp * 745.7;
}

export function wattsToHorsepower(watts: number): number {
  return watts / 745.7;
}

// Energy conversions
export function wattHoursToKilowattHours(wh: number): number {
  return wh / 1000;
}

export function kilowattHoursToWattHours(kwh: number): number {
  return kwh * 1000;
}

// Current & Capacity conversions
export function milliampsToAmps(ma: number): number {
  return ma / 1000;
}

export function ampsToMilliamps(a: number): number {
  return a * 1000;
}

export function milliampHoursToAmpHours(mah: number): number {
  return mah / 1000;
}

export function ampHoursToMilliampHours(ah: number): number {
  return ah * 1000;
}

// Battery stored energy (nominal)
export function calculateStoredEnergyWh(voltage: number, ampCapacityAh: number): number {
  return voltage * ampCapacityAh;
}

// Time formatting for display
export function formatHoursToHoursMinutes(decimalHours: number): {
  hours: number;
  minutes: number;
  formattedText: string;
} {
  if (isNaN(decimalHours) || decimalHours <= 0) {
    return { hours: 0, minutes: 0, formattedText: "0 min" };
  }

  const totalMinutes = Math.round(decimalHours * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return { hours, minutes, formattedText: `${minutes} min` };
  }
  if (minutes === 0) {
    return { hours, minutes, formattedText: `${hours} hr` };
  }
  return { hours, minutes, formattedText: `${hours} hr ${minutes} min` };
}
