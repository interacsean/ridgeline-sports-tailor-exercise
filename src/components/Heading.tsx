import { type FC, type ReactNode } from "react";

interface HeadingProps {
  /** Heading level */
  as?: "h1" | "h2" | "h3" | "h4";
  children: ReactNode;
  className?: string;
}

const styles = {
  h1: "text-2xl font-semibold text-gray-900",
  h2: "text-xl font-semibold text-gray-900",
  h3: "text-lg font-medium text-gray-900",
  h4: "text-base font-medium text-gray-900",
};

export const Heading: FC<HeadingProps> = ({
  as: Tag = "h1",
  children,
  className = "",
}) => {
  return <Tag className={`${styles[Tag]} ${className}`}>{children}</Tag>;
};
