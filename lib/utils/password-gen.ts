"use client";

import type { GeneratorConfig } from "@/lib/types";
import { WORDLIST } from "@/lib/constants/wordlist";

const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:',.<>?/~`";

// Ambiguous characters that can be confused
const AMBIGUOUS = "0O1lI|";

/**
 * Get a cryptographically random integer in [0, max)
 */
function getSecureRandom(max: number): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

/**
 * Shuffle array using Fisher-Yates with crypto random
 */
function secureShuffle<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = getSecureRandom(i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generate a random password based on configuration
 */
export function generatePassword(config: GeneratorConfig): string {
  let charset = "";
  const requiredChars: string[] = [];

  if (config.includeLowercase) {
    charset += LOWERCASE;
    requiredChars.push(LOWERCASE[getSecureRandom(LOWERCASE.length)]);
  }
  if (config.includeUppercase) {
    charset += UPPERCASE;
    requiredChars.push(UPPERCASE[getSecureRandom(UPPERCASE.length)]);
  }
  if (config.includeNumbers) {
    charset += NUMBERS;
    requiredChars.push(NUMBERS[getSecureRandom(NUMBERS.length)]);
  }
  if (config.includeSymbols) {
    charset += SYMBOLS;
    requiredChars.push(SYMBOLS[getSecureRandom(SYMBOLS.length)]);
  }

  // Remove ambiguous characters if specified
  if (config.excludeAmbiguous) {
    charset = charset
      .split("")
      .filter((c) => !AMBIGUOUS.includes(c))
      .join("");
  }

  if (charset.length === 0) {
    // Fallback: at least lowercase
    charset = LOWERCASE;
    requiredChars.push(LOWERCASE[getSecureRandom(LOWERCASE.length)]);
  }

  // Generate the password  
  const passwordArray: string[] = [...requiredChars];

  // Fill remaining length with random characters
  const remaining = Math.max(0, config.length - requiredChars.length);
  for (let i = 0; i < remaining; i++) {
    passwordArray.push(charset[getSecureRandom(charset.length)]);
  }

  // Shuffle to avoid predictable positions of required characters
  return secureShuffle(passwordArray).join("");
}

/**
 * Generate a Diceware-style passphrase
 */
export function generatePassphrase(
  wordCount: number = 4,
  separator: string = "-"
): string {
  const words: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    const index = getSecureRandom(WORDLIST.length);
    words.push(WORDLIST[index]);
  }
  return words.join(separator);
}

/**
 * Generate multiple passwords for bulk export
 */
export function generateBulkPasswords(
  config: GeneratorConfig,
  count: number
): string[] {
  const passwords: string[] = [];
  for (let i = 0; i < count; i++) {
    passwords.push(generatePassword(config));
  }
  return passwords;
}

/**
 * Calculate estimated entropy of generated password
 */
export function calculateGeneratedPasswordEntropy(
  config: GeneratorConfig
): number {
  let poolSize = 0;
  if (config.includeLowercase) poolSize += 26;
  if (config.includeUppercase) poolSize += 26;
  if (config.includeNumbers) poolSize += 10;
  if (config.includeSymbols) poolSize += 33;

  if (config.excludeAmbiguous) {
    poolSize = Math.max(1, poolSize - AMBIGUOUS.length);
  }

  return Math.round(config.length * Math.log2(poolSize) * 100) / 100;
}
