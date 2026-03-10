import { type FC, type ReactNode } from "react";

interface FormItemProps {
  /** Label text displayed above the input area */
  label: string;
  /** Optional HTML `for` attribute linking label to an input */
  htmlFor?: string;
  /** Error message to display below the input area */
  error?: string;
  /** The input element(s) to render */
  children: ReactNode;
}

export const FormItem: FC<FormItemProps> = ({
  label,
  htmlFor,
  error,
  children,
}) => {
  return (
    <div className="space-y-1">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div>{children}</div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};
