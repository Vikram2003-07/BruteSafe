"use client";

import type { BreachCheckResult, BreachRecord } from "@/lib/types";
import {
  BREACHED_PASSWORD_HASHES,
  BREACHED_EMAIL_PATTERNS,
  BREACH_SOURCES,
} from "@/lib/constants/breach-data";

/**
 * Compute SHA-256 hash of a string using the Web Crypto API
 */
async function sha256(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Determine risk level based on breach count
 */
function getRiskLevel(
  breachCount: number
): "low" | "medium" | "high" | "critical" {
  if (breachCount === 0) return "low";
  if (breachCount <= 1) return "medium";
  if (breachCount <= 3) return "high";
  return "critical";
}

/**
 * Check if a password appears in the offline breach database
 */
async function checkPasswordBreach(
  password: string
): Promise<BreachCheckResult> {
  const hash = await sha256(password);

  const entry = BREACHED_PASSWORD_HASHES[hash];

  if (!entry) {
    return {
      isBreached: false,
      breachCount: 0,
      breaches: [],
      riskLevel: "low",
      hash,
    };
  }

  const breaches: BreachRecord[] = entry.sources.map((sourceName) => {
    const sourceInfo = BREACH_SOURCES[sourceName];
    if (sourceInfo) return sourceInfo;
    return {
      source: sourceName,
      date: "Unknown",
      severity: "high" as const,
      affectedCount: 0,
    };
  });

  return {
    isBreached: true,
    breachCount: entry.count,
    breaches,
    riskLevel: getRiskLevel(breaches.length),
    hash,
  };
}

/**
 * Check if an email domain appears in known breaches
 */
async function checkEmailBreach(email: string): Promise<BreachCheckResult> {
  const hash = await sha256(email.toLowerCase());
  const emailLower = email.toLowerCase();

  const matchingBreaches: BreachRecord[] = [];

  for (const pattern of BREACHED_EMAIL_PATTERNS) {
    if (emailLower.endsWith(pattern.pattern) || emailLower.includes("@")) {
      // For demo purposes, check domain patterns
      const domain = emailLower.split("@")[1];
      if (domain && pattern.pattern.includes(domain)) {
        matchingBreaches.push({
          source: pattern.breachSource,
          date: pattern.date,
          severity:
            pattern.affectedCount > 100000000 ? "critical" : "high",
          affectedCount: pattern.affectedCount,
        });
      }
    }
  }

  // Simulate a probabilistic check — common email providers
  const commonDomains = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "aol.com",
  ];
  const domain = emailLower.split("@")[1];

  if (domain && commonDomains.includes(domain)) {
    // These large providers have had users appear in many breaches
    if (matchingBreaches.length === 0) {
      matchingBreaches.push({
        source: "Various aggregated breaches",
        date: "2019-01-17",
        severity: "medium",
        affectedCount: 773000000,
      });
    }
  }

  return {
    isBreached: matchingBreaches.length > 0,
    breachCount: matchingBreaches.length,
    breaches: matchingBreaches,
    riskLevel: getRiskLevel(matchingBreaches.length),
    hash,
  };
}

/**
 * Main breach check function
 * Works for both passwords and emails
 */
export async function checkBreach(
  input: string,
  type: "password" | "email"
): Promise<BreachCheckResult> {
  if (!input || input.trim().length === 0) {
    return {
      isBreached: false,
      breachCount: 0,
      breaches: [],
      riskLevel: "low",
    };
  }

  if (type === "password") {
    return checkPasswordBreach(input);
  }
  return checkEmailBreach(input);
}
