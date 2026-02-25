import React, { forwardRef, InputHTMLAttributes, ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = "", id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-bold text-foreground"
          >
            {label} {props.required && <span className="text-danger">*</span>}
          </label>
        )}

        <div className="relative">
          {icon && (
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted pointer-events-none">
              {icon}
            </span>
          )}

          <input
            id={inputId}
            ref={ref}
            className={`
              block w-full py-3 pr-4 rounded-xl border bg-background transition-all text-sm font-medium placeholder:text-muted/60
              focus:outline-none focus:ring-2 focus:bg-surface
              disabled:opacity-50 disabled:cursor-not-allowed
              ${icon ? "pl-10" : "pl-4"} 
              ${
                error
                  ? "border-danger focus:border-danger focus:ring-danger/20"
                  : "border-border focus:border-primary focus:ring-primary/20"
              }
              ${className}
            `}
            {...props}
          />
        </div>

        {error && (
          <span role="alert" className="text-xs font-medium text-danger mt-0.5">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
