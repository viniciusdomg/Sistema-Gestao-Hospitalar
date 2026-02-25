import React, { forwardRef, InputHTMLAttributes, ReactNode } from "react";

export type RadioColorTheme =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "primary";

export interface RadioCardProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  subLabel?: string;
  icon?: ReactNode;
  colorTheme?: RadioColorTheme;
}

export const RadioCard = forwardRef<HTMLInputElement, RadioCardProps>(
  (
    { label, subLabel, icon, colorTheme = "primary", className = "", ...props },
    ref,
  ) => {
    const themeStyles = {
      red: "hover:border-danger/50 peer-checked:border-danger peer-checked:bg-danger/10 peer-checked:ring-danger/20 text-danger",
      orange:
        "hover:border-warning/50 peer-checked:border-warning peer-checked:bg-warning/10 peer-checked:ring-warning/20 text-warning",
      yellow:
        "hover:border-yellow-500/50 peer-checked:border-yellow-500 peer-checked:bg-yellow-500/10 peer-checked:ring-yellow-500/20 text-yellow-600 dark:text-yellow-400",
      green:
        "hover:border-success/50 peer-checked:border-success peer-checked:bg-success/10 peer-checked:ring-success/20 text-success",
      blue: "hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:ring-primary/20 text-primary",
      primary:
        "hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:ring-primary/20 text-primary",
    };

    const currentTheme = themeStyles[colorTheme];

    return (
      <label className={`cursor-pointer group relative flex-1 ${className}`}>
        <input type="radio" className="peer sr-only" ref={ref} {...props} />

        <div
          className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 border-border bg-surface transition-all peer-checked:shadow-md peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-primary ${currentTheme}`}
        >
          {icon && (
            <div className="mb-1.5 flex items-center justify-center text-2xl">
              {icon}
            </div>
          )}

          <span className="font-bold text-foreground text-[11px] text-center uppercase tracking-wide">
            {label}
          </span>

          {subLabel && (
            <span className="text-[10px] font-bold mt-0.5 opacity-90 text-center">
              {subLabel}
            </span>
          )}
        </div>
      </label>
    );
  },
);

RadioCard.displayName = "RadioCard";
