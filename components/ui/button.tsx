import React, { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "default" | "outline" | "destructive";
  className?: string;
};

export function Button({ children, variant = "default", className = "", ...props }: ButtonProps) {
  let baseClasses = "px-4 py-2 rounded-md font-semibold focus:outline-none ";

  if (variant === "outline") {
    baseClasses += "border border-gray-400 ";
  } else if (variant === "destructive") {
    baseClasses += "bg-red-600 text-white hover:bg-red-700 ";
  } else {
    baseClasses += "bg-blue-600 text-white hover:bg-blue-700 ";
  }

  return (
    <button className={`${baseClasses} ${className}`} {...props}>
      {children}
    </button>
  );
}
