import { type FC, type InputHTMLAttributes } from "react";

interface DatePickerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Currently selected date value (ISO string or YYYY-MM-DD) */
  value?: string;
}

export const DatePicker: FC<DatePickerProps> = ({
  className = "",
  ...props
}) => {
  return (
    <input
      type="date"
      className={`block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400 ${className}`}
      {...props}
    />
  );
};
