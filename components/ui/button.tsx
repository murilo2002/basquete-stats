import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "outline" | "destructive"; // só um exemplo, adapte conforme seu código
  className?: string;
};

export function Button({ children, onClick, variant = "default", className = "" }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`btn ${variant} ${className}`} // exemplo de classes, adapte conforme seu projeto
    >
      {children}
    </button>
  );
}
