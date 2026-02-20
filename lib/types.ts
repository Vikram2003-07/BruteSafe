export interface PasswordStrengthResult {
  score: number; // 0-4 (weak to strong)
  entropy: number; // Bits of entropy
  crackTime: {
    online: string;
    offline: string;
  };
  warnings: string[];
  suggestions: string[];
  characterAnalysis: {
    length: number;
    lowercase: number;
    uppercase: number;
    numbers: number;
    symbols: number;
  };
}

export interface BreachCheckResult {
  isBreached: boolean;
  breachCount: number;
  riskLevel: "low" | "medium" | "high" | "critical";
  hash?: string;
  error?: string;
}

export interface GeneratorConfig {
  length: number;
  includeLowercase: boolean;
  includeUppercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeAmbiguous: boolean;
}

export type ScoreLabel =
  | "Very Weak"
  | "Weak"
  | "Fair"
  | "Strong"
  | "Very Strong";

export const SCORE_LABELS: ScoreLabel[] = [
  "Very Weak",
  "Weak",
  "Fair",
  "Strong",
  "Very Strong",
];

export const SCORE_COLORS = [
  "text-red-500",
  "text-orange-500",
  "text-yellow-500",
  "text-emerald-500",
  "text-green-500",
];

export const SCORE_BG_COLORS = [
  "bg-red-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-emerald-500",
  "bg-green-500",
];
