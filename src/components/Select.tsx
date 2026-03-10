import { type FC, type SelectHTMLAttributes } from "react";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** Options to render */
  options: SelectOption[];
  /** Placeholder text shown when no value is selected */
  placeholder?: string;
}

export const Select: FC<SelectProps> = ({
  options,
  placeholder = "Select...",
  className = "",
  ...props
}) => {
  return (
    <select
      className={`block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400 ${className}`}
      {...props}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};
