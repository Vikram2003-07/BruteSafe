"use client";

import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import { translations, dictionary } from "@zxcvbn-ts/language-en";
import { adjacencyGraphs } from "@zxcvbn-ts/language-common";
import type { PasswordStrengthResult } from "@/lib/types";

// Initialize zxcvbn with English language pack
const options = {
  translations,
  graphs: adjacencyGraphs,
  dictionary: {
    ...dictionary,
  },
};
zxcvbnOptions.setOptions(options);

/**
 * Calculate raw entropy bits based on character pool size and password length
 */
function calculateEntropy(password: string): number {
  let poolSize = 0;
  if (/[a-z]/.test(password)) poolSize += 26;
  if (/[A-Z]/.test(password)) poolSize += 26;
  if (/[0-9]/.test(password)) poolSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) poolSize += 33;

  if (poolSize === 0) return 0;
  return Math.round(password.length * Math.log2(poolSize) * 100) / 100;
}

/**
 * Analyze character composition
 */
function analyzeCharacters(password: string) {
  return {
    length: password.length,
    lowercase: (password.match(/[a-z]/g) || []).length,
    uppercase: (password.match(/[A-Z]/g) || []).length,
    numbers: (password.match(/[0-9]/g) || []).length,
    symbols: (password.match(/[^a-zA-Z0-9]/g) || []).length,
  };
}

/**
 * Format crack time into human-readable string
 */
function formatCrackTime(seconds: number): string {
  if (seconds < 1) return "instantly";
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 2592000) return `${Math.round(seconds / 86400)} days`;
  if (seconds < 31536000) return `${Math.round(seconds / 2592000)} months`;
  if (seconds < 3153600000) return `${Math.round(seconds / 31536000)} years`;
  if (seconds < 315360000000) return `${Math.round(seconds / 31536000)} years`;
  return "centuries";
}

/**
 * Main password analysis function
 * Uses zxcvbn for scoring and adds custom entropy calculation
 */
export function analyzePassword(password: string): PasswordStrengthResult {
  if (!password || password.length === 0) {
    return {
      score: 0,
      entropy: 0,
      crackTime: { online: "instantly", offline: "instantly" },
      warnings: ["Please enter a password"],
      suggestions: ["Try a longer password with mixed character types"],
      characterAnalysis: {
        length: 0,
        lowercase: 0,
        uppercase: 0,
        numbers: 0,
        symbols: 0,
      },
    };
  }

  const result = zxcvbn(password);
  const entropy = calculateEntropy(password);
  const characterAnalysis = analyzeCharacters(password);

  // Extract crack time estimates
  const onlineSeconds =
    result.crackTimesSeconds.onlineThrottling100PerHour;
  const offlineSeconds =
    result.crackTimesSeconds.offlineSlowHashing1e4PerSecond;

  // Build warnings list
  const warnings: string[] = [];
  if (result.feedback.warning) {
    warnings.push(result.feedback.warning);
  }
  if (password.length < 8) {
    warnings.push("Password is too short (minimum 8 characters recommended)");
  }
  if (/^[a-z]+$/i.test(password)) {
    warnings.push("Password contains only letters");
  }
  if (/^[0-9]+$/.test(password)) {
    warnings.push("Password contains only numbers");
  }
  if (/(.)\1{2,}/.test(password)) {
    warnings.push("Password contains repeated characters");
  }
  if (/^(abc|123|qwe|password|admin)/i.test(password)) {
    warnings.push("Password starts with a common pattern");
  }

  // Build suggestions
  const suggestions = [...result.feedback.suggestions];
  if (characterAnalysis.uppercase === 0) {
    suggestions.push("Add uppercase letters for more complexity");
  }
  if (characterAnalysis.numbers === 0) {
    suggestions.push("Include numbers to strengthen your password");
  }
  if (characterAnalysis.symbols === 0) {
    suggestions.push("Add special characters (!@#$%^&*) for maximum security");
  }
  if (password.length < 12) {
    suggestions.push("Consider using 12 or more characters");
  }

  return {
    score: result.score,
    entropy,
    crackTime: {
      online: formatCrackTime(onlineSeconds),
      offline: formatCrackTime(offlineSeconds),
    },
    warnings,
    suggestions,
    characterAnalysis,
  };
}
