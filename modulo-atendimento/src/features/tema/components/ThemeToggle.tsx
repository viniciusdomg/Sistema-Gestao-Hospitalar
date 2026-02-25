"use client";
import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";
import IconButton from "@/src/shared/ui/buttons/IconButton";

interface ThemeToggleProps {
  size?: "sm" | "md" | "lg";
}

export function ThemeToggle({ size = "md" }: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";
  const iconSizeClasses = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <IconButton
      onClick={toggleTheme}
      title={isDark ? "Mudar para modo claro" : "Mudar para modo escuro"}
      size={size}
      icon={
        isDark ? <FiSun className={iconSizeClasses} /> : <FiMoon className={iconSizeClasses} />
      }
    />
  );
}
