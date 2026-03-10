import { type FC, type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: "primary" | "secondary" | "ghost";
  /** Compact or standard sizing */
  size?: "sm" | "md";
}

export const Button: FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className = "",
  disabled,
  children,
  ...props
}) => {
  const base = "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 disabled:text-gray-300",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
