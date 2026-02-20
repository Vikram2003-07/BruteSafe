"use client";

import type { BreachCheckResult } from "@/lib/types";

/**
 * Compute SHA-1 hash of a string using the Web Crypto API
 * HIBP Pwned Passwords uses SHA-1 for k-anonymity lookups
 */
async function sha1(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("").toUpperCase();
}

/**
 * Determine risk level based on how many times the password appeared in breaches
 */
function getRiskLevel(
  count: number
): "low" | "medium" | "high" | "critical" {
  if (count === 0) return "low";
  if (count < 100) return "medium";
  if (count < 10000) return "high";
  return "critical";
}

/**
 * Check a password against the Have I Been Pwned Pwned Passwords API
 * Uses k-anonymity: only the first 5 chars of the SHA-1 hash are sent
 * The full hash never leaves the browser
 *
 * @see https://haveibeenpwned.com/API/v3#PwnedPasswords
 */
export async function checkPasswordBreach(
  password: string
): Promise<BreachCheckResult> {
  if (!password || password.trim().length === 0) {
    return {
      isBreached: false,
      breachCount: 0,
      riskLevel: "low",
    };
  }

  const hash = await sha1(password);
  const prefix = hash.substring(0, 5);
  const suffix = hash.substring(5);

  try {
    const response = await fetch(
      `https://api.pwnedpasswords.com/range/${prefix}`,
      {
        headers: {
          "Add-Padding": "true", // Request padded responses for extra privacy
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HIBP API returned ${response.status}`);
    }

    const text = await response.text();
    const lines = text.split("\r\n");

    let breachCount = 0;
    for (const line of lines) {
      const [hashSuffix, count] = line.split(":");
      if (hashSuffix === suffix) {
        breachCount = parseInt(count, 10);
        break;
      }
    }

    return {
      isBreached: breachCount > 0,
      breachCount,
      riskLevel: getRiskLevel(breachCount),
      hash,
    };
  } catch (error) {
    // Network error — return an error state so UI can handle it
    console.error("HIBP API error:", error);
    return {
      isBreached: false,
      breachCount: 0,
      riskLevel: "low",
      hash,
      error: error instanceof Error ? error.message : "Failed to reach Have I Been Pwned API",
    };
  }
}

/**
 * Main breach check function (password only)
 */
export async function checkBreach(
  input: string
): Promise<BreachCheckResult> {
  return checkPasswordBreach(input);
}
