import React from "react";

interface InputFieldProps {
  id: string;
  label: string;
  value: number | string;
  onChange: (value: number) => void;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  helpText?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  unit,
  min = 0,
  max,
  step = 1,
  helpText,
  placeholder,
  error,
  required = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === "") {
      onChange(0);
      return;
    }
    const parsed = parseFloat(raw);
    if (!isNaN(parsed)) {
      onChange(parsed);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1.5">
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-slate-800"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {unit && (
          <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
            {unit}
          </span>
        )}
      </div>

      <div className="relative rounded-lg shadow-sm">
        <input
          type="number"
          id={id}
          name={id}
          value={value === 0 && placeholder ? "" : value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : helpText ? `${id}-help` : undefined}
          className={`block w-full rounded-lg border py-2.5 px-3.5 text-slate-900 text-base font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-1 transition duration-150 ${
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50/20"
              : "border-slate-300 focus:border-blue-600 focus:ring-blue-100 bg-white"
          }`}
        />
      </div>

      {helpText && !error && (
        <p id={`${id}-help`} className="mt-1.5 text-xs text-slate-500 leading-relaxed">
          {helpText}
        </p>
      )}

      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600 font-medium">
          {error}
        </p>
      )}
    </div>
  );
};
