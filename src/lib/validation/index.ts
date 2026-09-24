/**
 * Centralized Validation Utilities
 * CalcMyPower.com
 */

export interface ValidationResult<T> {
  isValid: boolean;
  value: T;
  errorMessage?: string;
}

export function sanitizePositiveNumber(
  input: string | number,
  fallback = 0,
  min = 0,
  max = Number.MAX_SAFE_INTEGER
): number {
  if (typeof input === "number") {
    if (isNaN(input) || !isFinite(input)) return fallback;
    return Math.min(Math.max(input, min), max);
  }

  const parsed = parseFloat(input);
  if (isNaN(parsed) || !isFinite(parsed)) {
    return fallback;
  }
  return Math.min(Math.max(parsed, min), max);
}

export function validateNumberRange(
  val: number,
  min: number,
  max: number,
  fieldName: string
): { isValid: boolean; error?: string } {
  if (isNaN(val)) {
    return { isValid: false, error: `${fieldName} must be a valid number.` };
  }
  if (val < min) {
    return { isValid: false, error: `${fieldName} cannot be less than ${min}.` };
  }
  if (val > max) {
    return { isValid: false, error: `${fieldName} cannot exceed ${max}.` };
  }
  return { isValid: true };
}
