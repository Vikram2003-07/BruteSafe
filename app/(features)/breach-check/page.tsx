"use client";

import { useState, useCallback } from "react";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  Search,
  Mail,
  Key,
  Info,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BreachDisplay } from "@/components/breach-display";
import { checkBreach } from "@/lib/utils/breach-db";
import type { BreachCheckResult } from "@/lib/types";

export default function BreachCheckPage() {
  const [passwordInput, setPasswordInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordResult, setPasswordResult] =
    useState<BreachCheckResult | null>(null);
  const [emailResult, setEmailResult] = useState<BreachCheckResult | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  const handlePasswordCheck = useCallback(async () => {
    if (!passwordInput.trim()) return;
    setLoading(true);
    try {
      const result = await checkBreach(passwordInput, "password");
      setPasswordResult(result);
    } finally {
      setLoading(false);
    }
  }, [passwordInput]);

  const handleEmailCheck = useCallback(async () => {
    if (!emailInput.trim()) return;
    setLoading(true);
    try {
      const result = await checkBreach(emailInput, "email");
      setEmailResult(result);
    } finally {
      setLoading(false);
    }
  }, [emailInput]);

  return (
    <div className="relative page-transition">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute top-0 left-0 h-[400px] w-[400px] rounded-full bg-orange-500/8 blur-[100px]" />

      <div className="relative container mx-auto px-4 py-12 md:py-20 md:px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-sm text-orange-400 mb-4">
            <ShieldCheck className="h-3.5 w-3.5" />
            Offline Breach Check
          </div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Data Breach Identifier
          </h1>
          <p className="mt-3 text-muted-foreground">
            Check if your passwords or email addresses have been exposed in
            known data breaches — all processed locally.
          </p>
        </div>

        {/* Main content */}
        <div className="max-w-2xl mx-auto space-y-8">
          <Tabs defaultValue="password" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-12">
              <TabsTrigger value="password" className="gap-2 text-sm">
                <Key className="h-4 w-4" />
                Password Check
              </TabsTrigger>
              <TabsTrigger value="email" className="gap-2 text-sm">
                <Mail className="h-4 w-4" />
                Email Check
              </TabsTrigger>
            </TabsList>

            {/* Password Tab */}
            <TabsContent value="password" className="space-y-6 mt-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <Input
                        id="breach-password-input"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password to check..."
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        className="h-12 text-base pr-12 font-mono bg-background/50"
                        autoComplete="off"
                        onKeyDown={(e) =>
                          e.key === "Enter" && handlePasswordCheck()
                        }
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <Button
                      onClick={handlePasswordCheck}
                      disabled={loading || !passwordInput.trim()}
                      className="h-12 px-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0"
                    >
                      {loading ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      ) : (
                        <Search className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {passwordResult && <BreachDisplay result={passwordResult} />}

              {!passwordResult && (
                <div className="text-center py-8">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50 mb-4">
                    <Key className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                  <p className="text-muted-foreground">
                    Enter a password and click search to check against our
                    offline breach database
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Email Tab */}
            <TabsContent value="email" className="space-y-6 mt-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex gap-3">
                    <Input
                      id="breach-email-input"
                      type="email"
                      placeholder="Enter email to check..."
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="h-12 text-base bg-background/50"
                      autoComplete="off"
                      onKeyDown={(e) => e.key === "Enter" && handleEmailCheck()}
                    />
                    <Button
                      onClick={handleEmailCheck}
                      disabled={loading || !emailInput.trim()}
                      className="h-12 px-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0"
                    >
                      {loading ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      ) : (
                        <Search className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {emailResult && <BreachDisplay result={emailResult} />}

              {!emailResult && (
                <div className="text-center py-8">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50 mb-4">
                    <Mail className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                  <p className="text-muted-foreground">
                    Enter an email address to check against known breach
                    databases
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* How It Works */}
          <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-base">How It Works</CardTitle>
              </div>
              <CardDescription>
                Your privacy is protected at every step
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    step: "1",
                    title: "Enter Input",
                    desc: "Type your password or email address",
                  },
                  {
                    step: "2",
                    title: "Local Hash",
                    desc: "SHA-256 hash is computed in your browser",
                  },
                  {
                    step: "3",
                    title: "Offline Match",
                    desc: "Hash is compared against local breach dataset — no network calls",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-sm font-bold text-orange-400">
                      {item.step}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
