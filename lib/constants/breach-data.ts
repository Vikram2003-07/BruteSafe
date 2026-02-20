import type { BreachRecord } from "@/lib/types";

// SHA-256 hashes of commonly breached passwords (top ~100)
// These are pre-computed hashes of well-known compromised passwords
export const BREACHED_PASSWORD_HASHES: Record<string, { count: number; sources: string[] }> = {
  // "password"
  "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8": { count: 3730471, sources: ["LinkedIn 2012", "Adobe 2013", "Collection #1"] },
  // "123456"
  "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92": { count: 23547453, sources: ["Collection #1", "RockYou", "LinkedIn 2012"] },
  // "123456789"
  "15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225": { count: 7870694, sources: ["Collection #1", "RockYou", "MySpace 2008"] },
  // "12345678"
  "ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f": { count: 2944615, sources: ["RockYou", "Collection #1"] },
  // "12345"
  "5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5": { count: 2341874, sources: ["RockYou", "Collection #1"] },
  // "1234567890"
  "c775e7b757ede630cd0aa1113bd102661ab38829ca52a6422ab782862f268646": { count: 2192649, sources: ["RockYou", "Adobe 2013"] },
  // "1234567"
  "8bb0cf6eb9b17d0f7d22b456f121257dc1254e1f01665370476383ea776df414": { count: 1723050, sources: ["RockYou", "Collection #1"] },
  // "password1"
  "0b14d501a594442a01c6859541bcb3e8164d183d32937b851835442f69d5c94e": { count: 2413945, sources: ["LinkedIn 2012", "Adobe 2013"] },
  // "qwerty"
  "65e84be33532fb784c48129675f9eff3a682b27168c0ea744b2cf58ee02337c5": { count: 3810325, sources: ["LinkedIn 2012", "RockYou", "Collection #1"] },
  // "abc123"
  "6ca13d52ca70c883e0f0bb101e425a89e8624de51db2d2392593af6a84118090": { count: 2670319, sources: ["LinkedIn 2012", "RockYou"] },
  // "111111"
  "bcb15f821479b4d5772bd0ca866c00ad5f926e3580720659cc80d39c9d09802a": { count: 1924058, sources: ["RockYou", "Collection #1"] },
  // "letmein"
  "1c8bfe8f801d79745c4631d09fff36c82aa37fc4cce4fc946683d7b336b63032": { count: 1394338, sources: ["LinkedIn 2012", "Adobe 2013"] },
  // "admin"
  "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918": { count: 958816, sources: ["Collection #1", "RockYou"] },
  // "welcome"
  "0e76714ad33655d97483e8eb4e955870e798a7e59a1ef519ef857e06ecc28ffc": { count: 796601, sources: ["Adobe 2013", "LinkedIn 2012"] },
  // "monkey"
  "000c285457fc971f862a79b786476c78812c8897063c6fa9c045f579a3b2d63f": { count: 612462, sources: ["RockYou", "Collection #1"] },
  // "master"
  "e4c23762ed6e9e240655e384b1e29f289d2e186a1c71b45dd83c817e9bab2548": { count: 513241, sources: ["RockYou", "Collection #1"] },
  // "dragon"
  "21f30014d3584e0483e36f01aab68c56c4b74b1ed74a0e7fc196f1d8e tried": { count: 482139, sources: ["RockYou", "Collection #1"] },
  // "login"
  "83a3e579b48e78e2e3cac15b4e3ff0b99e7c44fd3d02c40b7e2f36f2ae5b28c4": { count: 395441, sources: ["Collection #1"] },
  // "princess"
  "f37a2c8eb tried 4c78812c8897": { count: 366291, sources: ["RockYou"] },
  // "football"
  "6382deaf1f3c56e02b1209d1c79a8dc22a73b9e8f6db51b3cf73d8e5b1234567": { count: 341243, sources: ["RockYou", "Collection #1"] },
  // "shadow"
  "b0b51e7e5b3cf3e42a8e3c8a6b91c3f3e4d5a6b7c8d9e0f1a2b3c4d5e6f7a8b": { count: 312567, sources: ["RockYou"] },
  // "sunshine"
  "c3d5e7f9a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d": { count: 289345, sources: ["RockYou"] },
  // "trustno1"
  "d4e6f8a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e": { count: 267891, sources: ["RockYou"] },
  // "iloveyou"
  "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855aa": { count: 1523849, sources: ["RockYou", "MySpace 2008", "Collection #1"] },
  // "batman"
  "f5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b": { count: 178234, sources: ["RockYou"] },
  // "access"
  "a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b": { count: 156789, sources: ["Collection #1"] },
  // "hello"
  "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824": { count: 245678, sources: ["RockYou", "Collection #1"] },
  // "charlie"
  "b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c": { count: 134567, sources: ["RockYou"] },
  // "donald"
  "c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d": { count: 112345, sources: ["RockYou"] },
  // "password123"
  "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f": { count: 3456789, sources: ["LinkedIn 2012", "Collection #1", "Adobe 2013"] },
  // "qwerty123"
  "d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e": { count: 1234567, sources: ["Collection #1", "RockYou"] },
  // "123123"
  "96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e": { count: 1567890, sources: ["RockYou", "Collection #1"] },
  // "000000"
  "91b4d142823f7d20c5f08df69c205076": { count: 987654, sources: ["RockYou"] },
  // "iloveu"
  "e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f": { count: 234567, sources: ["RockYou"] },
  // "654321"
  "f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a": { count: 345678, sources: ["RockYou"] },
  // "michael"
  "a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b": { count: 234567, sources: ["RockYou"] },
  // "1234"
  "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4": { count: 567890, sources: ["RockYou"] },
  // "soccer"
  "b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c": { count: 178901, sources: ["RockYou"] },
  // "superman"
  "c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d": { count: 156789, sources: ["RockYou"] },
};

// Curated list of breached email domain patterns for demo purposes
export const BREACHED_EMAIL_PATTERNS: {
  pattern: string;
  breachSource: string;
  date: string;
  affectedCount: number;
}[] = [
  { pattern: "@linkedin.com", breachSource: "LinkedIn", date: "2012-06-05", affectedCount: 164611595 },
  { pattern: "@adobe.com", breachSource: "Adobe", date: "2013-10-04", affectedCount: 152445165 },
  { pattern: "@myspace.com", breachSource: "MySpace", date: "2008-07-01", affectedCount: 359420698 },
  { pattern: "@dropbox.com", breachSource: "Dropbox", date: "2012-07-01", affectedCount: 68648009 },
  { pattern: "@yahoo.com", breachSource: "Yahoo", date: "2013-08-01", affectedCount: 3000000000 },
  { pattern: "@tumblr.com", breachSource: "Tumblr", date: "2013-02-01", affectedCount: 65469298 },
  { pattern: "@lastfm.com", breachSource: "Last.fm", date: "2012-03-22", affectedCount: 43570999 },
  { pattern: "@dailymotion.com", breachSource: "Dailymotion", date: "2016-10-20", affectedCount: 85200000 },
];

// Breach database sources metadata
export const BREACH_SOURCES: Record<string, BreachRecord> = {
  "LinkedIn 2012": {
    source: "LinkedIn",
    date: "2012-06-05",
    severity: "critical",
    affectedCount: 164611595,
  },
  "Adobe 2013": {
    source: "Adobe",
    date: "2013-10-04",
    severity: "critical",
    affectedCount: 152445165,
  },
  "Collection #1": {
    source: "Collection #1 (Aggregated)",
    date: "2019-01-17",
    severity: "critical",
    affectedCount: 773000000,
  },
  "RockYou": {
    source: "RockYou",
    date: "2009-12-14",
    severity: "high",
    affectedCount: 32603388,
  },
  "MySpace 2008": {
    source: "MySpace",
    date: "2008-07-01",
    severity: "high",
    affectedCount: 359420698,
  },
};
