"use client";

import { useState, useCallback, useEffect } from "react";
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
  Search,
  Key,
  Info,
  ShieldCheck,
  Sparkles,
  Settings2,
  Download,
  Shield,
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

import { StrengthMeter } from "@/components/strength-meter";
import { BreachDisplay } from "@/components/breach-display";
import { PasswordCard } from "@/components/password-card";
import { analyzePassword } from "@/lib/utils/entropy";
import { checkBreach } from "@/lib/utils/breach-db";
import {
  generatePassword,
  generatePassphrase,
  generateBulkPasswords,
  calculateGeneratedPasswordEntropy,
} from "@/lib/utils/password-gen";
import type {
  PasswordStrengthResult,
  BreachCheckResult,
  GeneratorConfig,
} from "@/lib/types";
import { toast } from "sonner";

// ─── Strength Checker Section ────────────────────────────────────────────────

function StrengthCheckerSection() {
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
    <div className="space-y-8">
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
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Clock className="h-4 w-4 text-cyan-400" />
                  <span className="text-xs font-medium uppercase tracking-wider">
                    Online Attack
                  </span>
                </div>
                <p className="text-2xl font-bold">{result.crackTime.online}</p>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Clock className="h-4 w-4 text-violet-400" />
                  <span className="text-xs font-medium uppercase tracking-wider">
                    Offline Attack
                  </span>
                </div>
                <p className="text-2xl font-bold">{result.crackTime.offline}</p>
              </CardContent>
            </Card>
          </div>

          {/* Character Analysis */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Character Analysis</CardTitle>
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

      {!result && (
        <div className="text-center py-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50 mb-4">
            <Zap className="h-8 w-8 text-muted-foreground/50" />
          </div>
          <p className="text-muted-foreground">
            Start typing to see real-time password analysis
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Breach Check Section ────────────────────────────────────────────────────

function BreachCheckSection() {
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [result, setResult] = useState<BreachCheckResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = useCallback(async () => {
    if (!passwordInput.trim()) return;
    setLoading(true);
    try {
      const checkResult = await checkBreach(passwordInput);
      setResult(checkResult);
    } finally {
      setLoading(false);
    }
  }, [passwordInput]);

  return (
    <div className="space-y-8">
      {/* Password Input */}
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
                onKeyDown={(e) => e.key === "Enter" && handleCheck()}
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
              onClick={handleCheck}
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

      {/* Result */}
      {result && <BreachDisplay result={result} />}

      {!result && (
        <div className="text-center py-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50 mb-4">
            <Key className="h-8 w-8 text-muted-foreground/50" />
          </div>
          <p className="text-muted-foreground">
            Enter a password and click search to check against the Have I Been
            Pwned database
          </p>
        </div>
      )}

      {/* How It Works */}
      <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-base">
              How It Works (k-Anonymity)
            </CardTitle>
          </div>
          <CardDescription>
            Your password never leaves your browser — only a tiny hash prefix is
            sent
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "SHA-1 Hash",
                desc: "Your password is hashed with SHA-1 entirely in your browser",
              },
              {
                step: "2",
                title: "Send Prefix Only",
                desc: "Only the first 5 characters of the hash are sent to the HIBP API",
              },
              {
                step: "3",
                title: "Local Match",
                desc: "Matching hashes are returned and compared locally — your full hash is never exposed",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-sm font-bold text-orange-400">
                  {item.step}
                </div>
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Password Generator Section ──────────────────────────────────────────────

const DEFAULT_CONFIG: GeneratorConfig = {
  length: 16,
  includeLowercase: true,
  includeUppercase: true,
  includeNumbers: true,
  includeSymbols: true,
  excludeAmbiguous: false,
};

function GeneratorSection() {
  const [config, setConfig] = useState<GeneratorConfig>(DEFAULT_CONFIG);
  const [password, setPassword] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [wordCount, setWordCount] = useState(4);
  const [separator, setSeparator] = useState("-");
  const [bulkPasswords, setBulkPasswords] = useState<string[]>([]);
  const [bulkCount, setBulkCount] = useState(5);

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
    <div className="space-y-8">
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
          {password && (
            <PasswordCard
              password={password}
              onRegenerate={regeneratePassword}
            />
          )}
          {passwordAnalysis && (
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <StrengthMeter score={passwordAnalysis.score} />
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-muted-foreground">Entropy</p>
                <p className="text-lg font-bold">
                  {entropy}{" "}
                  <span className="text-xs text-muted-foreground">bits</span>
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
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Password Length</Label>
                  <span className="text-sm font-mono font-bold text-emerald-400">
                    {config.length}
                  </span>
                </div>
                <Slider
                  value={[config.length]}
                  onValueChange={([val]) => handleConfigChange("length", val)}
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
          {passphrase && (
            <PasswordCard
              password={passphrase}
              onRegenerate={regeneratePassphrase}
            />
          )}
          {passphraseAnalysis && (
            <StrengthMeter score={passphraseAnalysis.score} />
          )}

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
                      variant={separator === sep.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setSeparator(sep.value);
                        setPassphrase(generatePassphrase(wordCount, sep.value));
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
  );
}

// ─── Main Tools Page ─────────────────────────────────────────────────────────

const sections = [
  {
    id: "strength-checker",
    icon: Search,
    title: "Password Strength Checker",
    description:
      "Real-time entropy analysis with brute-force time estimation and weakness detection.",
    gradient: "from-emerald-500 to-teal-500",
    badge: "Real-Time Analysis",
    badgeBorder: "border-emerald-500/20",
    badgeBg: "bg-emerald-500/10",
    badgeText: "text-emerald-400",
  },
  {
    id: "breach-check",
    icon: ShieldCheck,
    title: "Data Breach Identifier",
    description:
      "Check passwords and emails against curated offline breach datasets using SHA-256 hashing.",
    gradient: "from-orange-500 to-red-500",
    badge: "Offline Breach Check",
    badgeBorder: "border-orange-500/20",
    badgeBg: "bg-orange-500/10",
    badgeText: "text-orange-400",
  },
  {
    id: "generator",
    icon: Sparkles,
    title: "Password Generator",
    description:
      "Cryptographically secure password and passphrase generation with customizable policies.",
    gradient: "from-violet-500 to-purple-500",
    badge: "Cryptographically Secure",
    badgeBorder: "border-violet-500/20",
    badgeBg: "bg-violet-500/10",
    badgeText: "text-violet-400",
  },
];

export default function ToolsPage() {
  return (
    <div className="relative page-transition">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute top-0 left-1/4 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-emerald-500/8 blur-[120px]" />
      <div className="absolute top-[800px] right-0 h-[400px] w-[400px] rounded-full bg-orange-500/6 blur-[100px]" />
      <div className="absolute top-[1600px] left-0 h-[400px] w-[400px] rounded-full bg-violet-500/6 blur-[100px]" />

      <div className="relative container mx-auto px-4 py-12 md:py-20 md:px-6">
        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400 mb-6">
            <Shield className="h-3.5 w-3.5" />
            <span>All-in-One Security Suite</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Password Security{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Tools
            </span>
          </h1>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to assess, protect, and generate secure
            passwords — all in one place, processed entirely in your browser.
          </p>
        </div>

        {/* Feature Sections */}
        <div className="max-w-3xl mx-auto space-y-20">
          {sections.map((section, index) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              {/* Section Header */}
              <div className="mb-8">
                <div
                  className={`inline-flex items-center gap-2 rounded-full border ${section.badgeBorder} ${section.badgeBg} px-3 py-1 text-sm ${section.badgeText} mb-4`}
                >
                  <section.icon className="h-3.5 w-3.5" />
                  {section.badge}
                </div>
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                  {section.title}
                </h2>
                <p className="mt-2 text-muted-foreground">
                  {section.description}
                </p>
              </div>

              {/* Section Content */}
              {index === 0 && <StrengthCheckerSection />}
              {index === 1 && <BreachCheckSection />}
              {index === 2 && <GeneratorSection />}

              {/* Divider (not on last) */}
              {index < sections.length - 1 && (
                <div className="mt-20 flex items-center gap-4">
                  <div className="flex-1 h-px bg-border/50" />
                  <div className="h-2 w-2 rounded-full bg-border" />
                  <div className="flex-1 h-px bg-border/50" />
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
