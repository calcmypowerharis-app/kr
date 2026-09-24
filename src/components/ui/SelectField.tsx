import React from "react";

export interface SelectOption {
  value: string;
  label: string;
  sublabel?: string;
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  helpText?: string;
  required?: boolean;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  value,
  options,
  onChange,
  helpText,
  required = false,
}) => {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-slate-800 mb-1.5"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative rounded-lg shadow-sm">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 px-3.5 pr-10 text-slate-900 text-base font-medium focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition duration-150"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label} {opt.sublabel ? `(${opt.sublabel})` : ""}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {helpText && (
        <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">{helpText}</p>
      )}
    </div>
  );
};
