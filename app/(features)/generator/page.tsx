"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Sparkles,
  Copy,
  Check,
  Download,
  RefreshCw,
  Settings2,
  Zap,
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
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PasswordCard } from "@/components/password-card";
import { StrengthMeter } from "@/components/strength-meter";
import {
  generatePassword,
  generatePassphrase,
  generateBulkPasswords,
  calculateGeneratedPasswordEntropy,
} from "@/lib/utils/password-gen";
import { analyzePassword } from "@/lib/utils/entropy";
import type { GeneratorConfig } from "@/lib/types";
import { toast } from "sonner";

const DEFAULT_CONFIG: GeneratorConfig = {
  length: 16,
  includeLowercase: true,
  includeUppercase: true,
  includeNumbers: true,
  includeSymbols: true,
  excludeAmbiguous: false,
};

export default function GeneratorPage() {
  const [config, setConfig] = useState<GeneratorConfig>(DEFAULT_CONFIG);
  const [password, setPassword] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [wordCount, setWordCount] = useState(4);
  const [separator, setSeparator] = useState("-");
  const [bulkPasswords, setBulkPasswords] = useState<string[]>([]);
  const [bulkCount, setBulkCount] = useState(5);

  // Generate initial password
  useEffect(() => {
    setPassword(generatePassword(config));
    setPassphrase(generatePassphrase(wordCount, separator));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const regeneratePassword = useCallback(() => {
    setPassword(generatePassword(config));
  }, [config]);

  const regeneratePassphrase = useCallback(() => {
    setPassphrase(generatePassphrase(wordCount, separator));
  }, [wordCount, separator]);

  const handleConfigChange = useCallback(
    (key: keyof GeneratorConfig, value: boolean | number) => {
      const newConfig = { ...config, [key]: value };
      setConfig(newConfig);
      setPassword(generatePassword(newConfig));
    },
    [config],
  );

  const handleBulkGenerate = useCallback(() => {
    const passwords = generateBulkPasswords(config, bulkCount);
    setBulkPasswords(passwords);
  }, [config, bulkCount]);

  const handleBulkExport = useCallback(() => {
    const text = bulkPasswords.join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "brutesafe-passwords.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Passwords exported to file");
  }, [bulkPasswords]);

  const passwordAnalysis = password ? analyzePassword(password) : null;
  const passphraseAnalysis = passphrase ? analyzePassword(passphrase) : null;
  const entropy = calculateGeneratedPasswordEntropy(config);

  return (
    <div className="relative page-transition">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[400px] rounded-full bg-violet-500/8 blur-[100px]" />

      <div className="relative container mx-auto px-4 py-12 md:py-20 md:px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-sm text-violet-400 mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Cryptographically Secure
          </div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Password Generator
          </h1>
          <p className="mt-3 text-muted-foreground">
            Generate strong, unique passwords and passphrases with customizable
            rules and policies.
          </p>
        </div>

        {/* Main content */}
        <div className="max-w-3xl mx-auto space-y-8">
          <Tabs defaultValue="password" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-12">
              <TabsTrigger value="password" className="gap-2 text-sm">
                <Settings2 className="h-4 w-4" />
                Password
              </TabsTrigger>
              <TabsTrigger value="passphrase" className="gap-2 text-sm">
                <Sparkles className="h-4 w-4" />
                Passphrase
              </TabsTrigger>
            </TabsList>

            {/* Password Tab */}
            <TabsContent value="password" className="space-y-6 mt-6">
              {/* Generated password */}
              {password && (
                <PasswordCard
                  password={password}
                  onRegenerate={regeneratePassword}
                />
              )}

              {/* Strength preview */}
              {passwordAnalysis && (
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <StrengthMeter score={passwordAnalysis.score} />
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-muted-foreground">Entropy</p>
                    <p className="text-lg font-bold">
                      {entropy}{" "}
                      <span className="text-xs text-muted-foreground">
                        bits
                      </span>
                    </p>
                  </div>
                </div>
              )}

              {/* Configuration */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Settings2 className="h-4 w-4" />
                    Configuration
                  </CardTitle>
                  <CardDescription>
                    Customize your password generation rules
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Length slider */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Password Length</Label>
                      <span className="text-sm font-mono font-bold text-emerald-400">
                        {config.length}
                      </span>
                    </div>
                    <Slider
                      value={[config.length]}
                      onValueChange={([val]) =>
                        handleConfigChange("length", val)
                      }
                      min={4}
                      max={64}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>4</span>
                      <span>64</span>
                    </div>
                  </div>

                  {/* Character toggles */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      {
                        key: "includeLowercase" as const,
                        label: "Lowercase (a-z)",
                        enabled: config.includeLowercase,
                      },
                      {
                        key: "includeUppercase" as const,
                        label: "Uppercase (A-Z)",
                        enabled: config.includeUppercase,
                      },
                      {
                        key: "includeNumbers" as const,
                        label: "Numbers (0-9)",
                        enabled: config.includeNumbers,
                      },
                      {
                        key: "includeSymbols" as const,
                        label: "Symbols (!@#$%)",
                        enabled: config.includeSymbols,
                      },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between rounded-lg border border-border/40 bg-background/30 p-3"
                      >
                        <Label className="text-sm cursor-pointer">
                          {item.label}
                        </Label>
                        <Switch
                          checked={item.enabled}
                          onCheckedChange={(checked) =>
                            handleConfigChange(item.key, checked)
                          }
                        />
                      </div>
                    ))}
                  </div>

                  {/* Exclude ambiguous */}
                  <div className="flex items-center justify-between rounded-lg border border-border/40 bg-background/30 p-3">
                    <div>
                      <Label className="text-sm cursor-pointer">
                        Exclude Ambiguous Characters
                      </Label>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Removes 0, O, 1, l, I, |
                      </p>
                    </div>
                    <Switch
                      checked={config.excludeAmbiguous}
                      onCheckedChange={(checked) =>
                        handleConfigChange("excludeAmbiguous", checked)
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Bulk generation */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Bulk Generation
                  </CardTitle>
                  <CardDescription>
                    Generate multiple passwords at once
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 flex-1">
                      <Label className="text-sm shrink-0">Count:</Label>
                      <Input
                        type="number"
                        min={1}
                        max={50}
                        value={bulkCount}
                        onChange={(e) =>
                          setBulkCount(
                            Math.min(
                              50,
                              Math.max(1, parseInt(e.target.value) || 1),
                            ),
                          )
                        }
                        className="w-20 h-9 bg-background/50"
                      />
                    </div>
                    <Button
                      onClick={handleBulkGenerate}
                      className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white border-0"
                    >
                      Generate
                    </Button>
                  </div>

                  {bulkPasswords.length > 0 && (
                    <div className="space-y-2">
                      <div className="max-h-64 overflow-y-auto rounded-lg border border-border/40 bg-background/30 p-3 space-y-1">
                        {bulkPasswords.map((pw, i) => (
                          <div
                            key={i}
                            className="font-mono text-sm text-muted-foreground truncate"
                          >
                            <span className="text-xs text-muted-foreground/50 mr-2">
                              {i + 1}.
                            </span>
                            {pw}
                          </div>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleBulkExport}
                        className="gap-2"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Export to File
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Passphrase Tab */}
            <TabsContent value="passphrase" className="space-y-6 mt-6">
              {/* Generated passphrase */}
              {passphrase && (
                <PasswordCard
                  password={passphrase}
                  onRegenerate={regeneratePassphrase}
                />
              )}

              {/* Strength preview */}
              {passphraseAnalysis && (
                <StrengthMeter score={passphraseAnalysis.score} />
              )}

              {/* Configuration */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Settings2 className="h-4 w-4" />
                    Passphrase Settings
                  </CardTitle>
                  <CardDescription>
                    Generate memorable multi-word passwords (Diceware-style)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Word count */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Number of Words</Label>
                      <span className="text-sm font-mono font-bold text-violet-400">
                        {wordCount}
                      </span>
                    </div>
                    <Slider
                      value={[wordCount]}
                      onValueChange={([val]) => {
                        setWordCount(val);
                        setPassphrase(generatePassphrase(val, separator));
                      }}
                      min={3}
                      max={10}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>3 words</span>
                      <span>10 words</span>
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="space-y-3">
                    <Label>Word Separator</Label>
                    <div className="flex gap-2 flex-wrap">
                      {[
                        { value: "-", label: "Dash (-)" },
                        { value: ".", label: "Dot (.)" },
                        { value: "_", label: "Underscore (_)" },
                        { value: " ", label: "Space ( )" },
                        { value: "", label: "None" },
                      ].map((sep) => (
                        <Button
                          key={sep.value}
                          variant={
                            separator === sep.value ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => {
                            setSeparator(sep.value);
                            setPassphrase(
                              generatePassphrase(wordCount, sep.value),
                            );
                          }}
                          className={
                            separator === sep.value
                              ? "bg-violet-500 hover:bg-violet-600 text-white border-0"
                              : ""
                          }
                        >
                          {sep.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
