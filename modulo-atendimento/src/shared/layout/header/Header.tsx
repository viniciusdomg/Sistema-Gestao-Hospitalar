"use client";

import { ReactNode } from "react";
import { FiMenu, FiX } from "react-icons/fi";

interface HeaderProps {
  logo: ReactNode | string;
  children?: ReactNode;
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
}

export function Header({
  logo,
  children,
  onMenuToggle,
  isMenuOpen = false,
}: HeaderProps) {
  return (
    <header className="w-full border-b border-border bg-surface px-4 py-3 transition-colors duration-300 md:px-8 md:py-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuToggle}
            aria-label={isMenuOpen ? "Fechar menu lateral" : "Abrir menu lateral"}
            aria-expanded={isMenuOpen}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-surface md:hidden"
          >
            {isMenuOpen ? <FiX className="text-lg" /> : <FiMenu className="text-lg" />}
          </button>

          <div className="text-base font-bold text-foreground md:text-xl">{logo}</div>
        </div>

        <div className="flex items-center gap-3">{children}</div>
      </div>
    </header>
  );
}
