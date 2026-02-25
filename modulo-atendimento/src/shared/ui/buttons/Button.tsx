import React, { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  iconLoading?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      isLoading,
      iconLoading,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const variants = {
      primary:
        "bg-primary text-white hover:bg-primary-hover border border-transparent shadow-sm",
      secondary:
        "bg-surface text-foreground border border-border hover:bg-background shadow-sm",
      outline:
        "bg-transparent text-primary border border-primary hover:bg-primary/10",
      ghost:
        "bg-transparent text-muted hover:text-foreground hover:bg-surface border border-transparent",
      danger:
        "bg-danger text-white hover:bg-danger/90 border border-transparent shadow-sm",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-5 py-2.5 text-sm",
      lg: "px-6 py-3 text-base",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`
          inline-flex items-center justify-center font-medium rounded-lg transition-colors
          disabled:opacity-60 disabled:cursor-not-allowed
          ${variants[variant]}
          ${sizes[size]}
          ${className}
        `}
        {...props}
      >
        {isLoading && (
          <span className="mr-2 animate-spin text-sm">{iconLoading}</span>
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
