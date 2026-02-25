import React, { ReactNode } from "react";

interface RadioGroupProps {
  label?: string;
  error?: string;
  children: ReactNode;
  required?: boolean;
  className?: string;
}

export function RadioGroup({
  label,
  error,
  children,
  required,
  className = "",
}: RadioGroupProps) {
  return (
    <fieldset className="flex flex-col gap-2 w-full">
      {label && (
        <legend className="text-sm font-bold text-foreground mb-1">
          {label} {required && <span className="text-danger">*</span>}
        </legend>
      )}

      <div className={`grid gap-3 ${className}`}>{children}</div>

      {error && (
        <span role="alert" className="text-xs font-medium text-danger mt-0.5">
          {error}
        </span>
      )}
    </fieldset>
  );
}
