import React, { ReactNode } from "react";
import { FiTrendingUp, FiTrendingDown, FiMinus } from "react-icons/fi";

type ColorScheme = "primary" | "success" | "warning" | "danger";
type Direction = "up" | "down" | "neutral";

interface Trend {
  value: string;
  label: ReactNode;
  direction: Direction;
}

interface IndicatorCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  colorScheme?: ColorScheme;
  trend?: Trend;
}

const colorStyles = {
  primary: {
    bg: "bg-primary/10",
    text: "text-primary",
    blob: "bg-primary/5",
  },
  success: {
    bg: "bg-success/10",
    text: "text-success",
    blob: "bg-success/5",
  },
  warning: {
    bg: "bg-warning/10",
    text: "text-warning",
    blob: "bg-warning/5",
  },
  danger: { bg: "bg-danger/10", text: "text-danger", blob: "bg-danger/5" },
} as const;

const trendIcons = {
  up: <FiTrendingUp className="mr-1" />,
  down: <FiTrendingDown className="mr-1" />,
  neutral: <FiMinus className="mr-1" />,
};

export default function IndicatorCard({
  title,
  value,
  icon,
  colorScheme = "primary",
  trend,
}: IndicatorCardProps) {
  const currentColor = colorStyles[colorScheme];

  return (
    <article className="group relative flex min-h-[146px] flex-col justify-between overflow-hidden rounded-xl border border-border bg-surface p-4 shadow-sm transition-all hover:shadow-md sm:p-6">
      <div
        className={`absolute -mr-4 -mt-4 h-20 w-20 rounded-bl-full right-0 top-0 transition-transform group-hover:scale-110 sm:h-24 sm:w-24 ${currentColor.blob}`}
      ></div>

      <div className="z-10 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-muted sm:text-sm">{title}</p>
          <h3 className="mt-2 break-words text-2xl font-bold leading-none text-foreground sm:text-3xl">
            {value}
          </h3>
        </div>

        <div
          className={`${currentColor.bg} ${currentColor.text} shrink-0 rounded-lg p-2.5 text-lg sm:p-3 sm:text-xl`}
        >
          {icon}
        </div>
      </div>
      {trend && (
        <div className="z-10 mt-4 flex flex-wrap items-start gap-2">
          <span
            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-bold ${currentColor.text} ${currentColor.bg}`}
          >
            {trendIcons[trend.direction]}
            {trend.value}
          </span>
          <span className="min-w-0 break-words text-xs text-muted">
            {trend.label}
          </span>
        </div>
      )}
    </article>
  );
}
