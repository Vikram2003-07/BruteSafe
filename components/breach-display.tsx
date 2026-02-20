"use client";

import { cn } from "@/lib/utils";
import type { BreachCheckResult } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Calendar,
  Users,
  Hash,
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
  return num.toString();
}

export function BreachDisplay({ result, className }: BreachDisplayProps) {
  const RiskIcon = riskIcons[result.riskLevel];

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
                ? `This appears in ${formatNumber(result.breachCount)} breached records across ${result.breaches.length} data breach(es).`
                : "This was not found in our offline breach database. Stay vigilant!"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Hash display */}
      {result.hash && (
        <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-muted/30 p-3">
          <Hash className="h-4 w-4 text-muted-foreground shrink-0" />
          <code className="text-xs text-muted-foreground font-mono truncate">
            SHA-256: {result.hash}
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

      {/* Breach details */}
      {result.breaches.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-muted-foreground">
            Breach Sources
          </h4>
          <div className="grid gap-3">
            {result.breaches.map((breach, index) => (
              <Card
                key={index}
                className="border-border/50 bg-card/50 backdrop-blur-sm"
              >
                <CardHeader className="pb-2 pt-4 px-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                      {breach.source}
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs capitalize",
                        riskColors[breach.severity],
                      )}
                    >
                      {breach.severity}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="px-4 pb-4 pt-0">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{breach.date}</span>
                    </div>
                    {breach.affectedCount > 0 && (
                      <div className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5" />
                        <span>
                          {formatNumber(breach.affectedCount)} affected
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
