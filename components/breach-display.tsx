"use client";

import { cn } from "@/lib/utils";
import type { BreachCheckResult } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Hash,
  AlertCircle,
} from "lucide-react";

interface BreachDisplayProps {
  result: BreachCheckResult;
  className?: string;
}

const riskColors = {
  low: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
  medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
  high: "bg-orange-500/10 text-orange-500 border-orange-500/30",
  critical: "bg-red-500/10 text-red-500 border-red-500/30",
};

const riskIcons = {
  low: ShieldCheck,
  medium: AlertTriangle,
  high: ShieldAlert,
  critical: ShieldAlert,
};

function formatNumber(num: number): string {
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toLocaleString();
}

export function BreachDisplay({ result, className }: BreachDisplayProps) {
  const RiskIcon = riskIcons[result.riskLevel];

  // Error state
  if (result.error) {
    return (
      <div className={cn("space-y-4", className)}>
        <Card className="border-2 border-yellow-500/30 bg-yellow-500/5">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-yellow-500/15">
              <AlertCircle className="h-7 w-7 text-yellow-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-yellow-500">
                Unable to Check
              </h3>
              <p className="text-sm text-muted-foreground">
                {result.error}. Please check your internet connection and try
                again.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main status card */}
      <Card
        className={cn(
          "border-2 transition-all duration-300",
          result.isBreached
            ? "border-red-500/30 bg-red-500/5"
            : "border-emerald-500/30 bg-emerald-500/5",
        )}
      >
        <CardContent className="flex items-center gap-4 pt-6">
          <div
            className={cn(
              "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl",
              result.isBreached ? "bg-red-500/15" : "bg-emerald-500/15",
            )}
          >
            {result.isBreached ? (
              <ShieldAlert className="h-7 w-7 text-red-500 animate-pulse" />
            ) : (
              <ShieldCheck className="h-7 w-7 text-emerald-500" />
            )}
          </div>
          <div>
            <h3
              className={cn(
                "text-lg font-bold",
                result.isBreached ? "text-red-500" : "text-emerald-500",
              )}
            >
              {result.isBreached
                ? "⚠ Found in Breach Database"
                : "✓ Not Found in Breaches"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {result.isBreached
                ? `This password has been seen ${formatNumber(result.breachCount)} time(s) in data breaches. It should never be used.`
                : "This password was not found in the Have I Been Pwned database. Keep it strong!"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Hash display */}
      {result.hash && (
        <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-muted/30 p-3">
          <Hash className="h-4 w-4 text-muted-foreground shrink-0" />
          <code className="text-xs text-muted-foreground font-mono truncate">
            SHA-1: {result.hash}
          </code>
        </div>
      )}

      {/* Risk badge */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Risk Level:</span>
        <Badge
          variant="outline"
          className={cn("gap-1.5 capitalize", riskColors[result.riskLevel])}
        >
          <RiskIcon className="h-3.5 w-3.5" />
          {result.riskLevel}
        </Badge>
      </div>

      {/* HIBP attribution */}
      <p className="text-xs text-muted-foreground">
        Powered by{" "}
        <a
          href="https://haveibeenpwned.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-400 hover:underline"
        >
          Have I Been Pwned
        </a>{" "}
        — Only the first 5 characters of the SHA-1 hash are sent (k-anonymity).
      </p>
    </div>
  );
}
