import React, { forwardRef, SelectHTMLAttributes, ReactNode } from "react";

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  iconExpand: ReactNode;
  options: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, error, icon, iconExpand, options, className = "", id, ...props },
    ref,
  ) => {
    const selectId = id || props.name;

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label
            htmlFor={selectId}
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

          <select
            id={selectId}
            ref={ref}
            className={`
              block w-full py-3 pr-10 rounded-xl border bg-background transition-all text-sm font-medium appearance-none
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
          >
            <option value="" disabled>
              Selecione...
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-muted">
            {iconExpand}
          </span>
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

Select.displayName = "Select";
