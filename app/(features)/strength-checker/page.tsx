"use client";

import { useState, useCallback } from "react";
import {
  Eye,
  EyeOff,
  Clock,
  Zap,
  ShieldAlert,
  Lightbulb,
  Type,
  Hash,
  AtSign,
  Asterisk,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StrengthMeter } from "@/components/strength-meter";
import { analyzePassword } from "@/lib/utils/entropy";
import type { PasswordStrengthResult } from "@/lib/types";

export default function StrengthCheckerPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [result, setResult] = useState<PasswordStrengthResult | null>(null);

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setPassword(value);
      if (value.length > 0) {
        setResult(analyzePassword(value));
      } else {
        setResult(null);
      }
    },
    [],
  );

  return (
    <div className="relative page-transition">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-emerald-500/8 blur-[100px]" />

      <div className="relative container mx-auto px-4 py-12 md:py-20 md:px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-400 mb-4">
            <Zap className="h-3.5 w-3.5" />
            Real-Time Analysis
          </div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Password Strength Checker
          </h1>
          <p className="mt-3 text-muted-foreground">
            Enter your password to get instant entropy analysis, crack time
            estimates, and actionable security recommendations.
          </p>
        </div>

        {/* Main input area */}
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Password Input */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="relative">
                <Input
                  id="password-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password..."
                  value={password}
                  onChange={handlePasswordChange}
                  className="h-14 text-lg pr-12 font-mono bg-background/50"
                  autoComplete="off"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {/* Strength Meter */}
              {result && (
                <div className="mt-6">
                  <StrengthMeter score={result.score} />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results */}
          {result && password.length > 0 && (
            <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
              {/* Stats Grid */}
              <div className="grid gap-4 sm:grid-cols-3">
                {/* Entropy */}
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Zap className="h-4 w-4 text-amber-400" />
                      <span className="text-xs font-medium uppercase tracking-wider">
                        Entropy
                      </span>
                    </div>
                    <p className="text-2xl font-bold">
                      {result.entropy}{" "}
                      <span className="text-sm font-normal text-muted-foreground">
                        bits
                      </span>
                    </p>
                  </CardContent>
                </Card>

                {/* Online Crack Time */}
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Clock className="h-4 w-4 text-cyan-400" />
                      <span className="text-xs font-medium uppercase tracking-wider">
                        Online Attack
                      </span>
                    </div>
                    <p className="text-2xl font-bold">
                      {result.crackTime.online}
                    </p>
                  </CardContent>
                </Card>

                {/* Offline Crack Time */}
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Clock className="h-4 w-4 text-violet-400" />
                      <span className="text-xs font-medium uppercase tracking-wider">
                        Offline Attack
                      </span>
                    </div>
                    <p className="text-2xl font-bold">
                      {result.crackTime.offline}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Character Analysis */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">
                    Character Analysis
                  </CardTitle>
                  <CardDescription>
                    Breakdown of your password composition
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {[
                      {
                        icon: Type,
                        label: "Length",
                        value: result.characterAnalysis.length,
                        color: "text-foreground",
                      },
                      {
                        icon: Type,
                        label: "Lowercase",
                        value: result.characterAnalysis.lowercase,
                        color: "text-emerald-400",
                      },
                      {
                        icon: AtSign,
                        label: "Uppercase",
                        value: result.characterAnalysis.uppercase,
                        color: "text-cyan-400",
                      },
                      {
                        icon: Hash,
                        label: "Numbers",
                        value: result.characterAnalysis.numbers,
                        color: "text-amber-400",
                      },
                      {
                        icon: Asterisk,
                        label: "Symbols",
                        value: result.characterAnalysis.symbols,
                        color: "text-rose-400",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex flex-col items-center gap-1 rounded-lg border border-border/40 bg-background/30 p-3"
                      >
                        <item.icon className={`h-4 w-4 ${item.color}`} />
                        <span className="text-xl font-bold">{item.value}</span>
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Warnings */}
              {result.warnings.length > 0 && (
                <Card className="border-orange-500/20 bg-orange-500/5 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="h-5 w-5 text-orange-400" />
                      <CardTitle className="text-base text-orange-400">
                        Warnings
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.warnings.map((warning, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                          {warning}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Suggestions */}
              {result.suggestions.length > 0 && (
                <Card className="border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-cyan-400" />
                      <CardTitle className="text-base text-cyan-400">
                        Suggestions
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.suggestions.map((suggestion, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Empty state */}
          {!result && (
            <div className="text-center py-12">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50 mb-4">
                <Zap className="h-8 w-8 text-muted-foreground/50" />
              </div>
              <p className="text-muted-foreground">
                Start typing to see real-time password analysis
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
