import React from "react";
import NextForm from "next/form";

interface FormProps {
  children: React.ReactNode;
  className?: string;
  action?: string;
  onSubmit: () => void;
}

export function Form({
  children,
  className = "",
  action,
  onSubmit,
  ...props
}: FormProps) {
  return (
    <NextForm
      onSubmit={onSubmit}
      action={action || ""}
      className={`space-y-6 w-full ${className}`}
      {...props}
    >
      {children}
    </NextForm>
  );
}
