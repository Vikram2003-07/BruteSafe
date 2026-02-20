"use client";

import { cn } from "@/lib/utils";
import { SCORE_LABELS, SCORE_BG_COLORS, SCORE_COLORS } from "@/lib/types";

interface StrengthMeterProps {
  score: number; // 0-4
  className?: string;
}

export function StrengthMeter({ score, className }: StrengthMeterProps) {
  const percentage = ((score + 1) / 5) * 100;
  const label = SCORE_LABELS[score] || "Very Weak";
  const color = SCORE_COLORS[score] || "text-red-500";

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          Strength
        </span>
        <span className={cn("text-sm font-semibold", color)}>{label}</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            SCORE_BG_COLORS[score] || "bg-red-500",
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn(
              "h-1 w-1 rounded-full transition-colors duration-300",
              i <= score
                ? SCORE_BG_COLORS[score] || "bg-red-500"
                : "bg-muted-foreground/20",
            )}
          />
        ))}
      </div>
    </div>
  );
}
