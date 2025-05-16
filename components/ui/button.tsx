import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "destructive";
  children: React.ReactNode;
}

export function Button({ variant = "default", children, className = "", ...props }: ButtonProps) {
  let baseClass = "px-4 py-2 rounded font-semibold transition ";

  if (variant === "default") baseClass += "bg-blue-600 text-white hover:bg-blue-700";
  if (variant === "outline") baseClass += "border border-gray-500 text-gray-700 hover:bg-gray-100";
  if (variant === "destructive") baseClass += "bg-red-600 text-white hover:bg-red-700";

  return (
    <button className={`${baseClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
