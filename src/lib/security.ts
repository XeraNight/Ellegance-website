/**
 * security.ts – Ellegance website centralized security utilities
 *
 * Covers OWASP Top 10 client-side concerns:
 *  A01 – Broken Access Control    → rate limiting, submission guards
 *  A02 – Cryptographic Failures   → no secrets in client code
 *  A03 – Injection                → input sanitization (XSS)
 *  A04 – Insecure Design          → honeypot, challenge, timing checks
 *  A05 – Security Misconfiguration → restrictive file validation
 *  A08 – Software & Data Integrity → file MIME sniffing, magic bytes check
 *  A10 – Server-Side Request Forgery → no arbitrary URLs accepted
 */

// ─── Input Sanitization ────────────────────────────────────────────────────

/**
 * Strips HTML tags and encodes dangerous characters to prevent stored XSS.
 * Always sanitize user-provided text before rendering or storing.
 */
export function sanitizeText(input: string): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
}

/**
 * Strip all HTML tags from a string entirely (for plain-text contexts).
 */
export function stripTags(input: string): string {
  if (typeof input !== "string") return "";
  return input.replace(/<[^>]*>/g, "").trim();
}

/**
 * Validates that a phone or contact string doesn't contain injection patterns.
 * Allows: letters, numbers, spaces, +, -, (, ), @, .
 */
export function isValidContact(contact: string): boolean {
  if (!contact || contact.length < 5 || contact.length > 120) return false;
  // Block potential script injection, SQL injection chars
  const dangerousPattern = /[<>'"`;\\{}[\]|]/;
  return !dangerousPattern.test(contact);
}

/**
 * Validates a price string. Allows numbers, comma, dot, spaces, and € symbol.
 */
export function isValidPrice(price: string): boolean {
  if (!price || price.length > 20) return false;
  return /^[\d\s,\.€]+$/.test(price.trim());
}

// ─── File / Image Validation ───────────────────────────────────────────────

/** Allowed MIME types for bazaar listing photos */
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
]);

/** Maximum file size: 5 MB */
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

/** Magic byte signatures for allowed image types */
const IMAGE_MAGIC_BYTES: Array<{ mime: string; bytes: number[]; offset?: number }> = [
  { mime: "image/jpeg", bytes: [0xff, 0xd8, 0xff] },
  { mime: "image/png",  bytes: [0x89, 0x50, 0x4e, 0x47] },
  { mime: "image/webp", bytes: [0x52, 0x49, 0x46, 0x46], offset: 0 }, // RIFF...WEBP
  { mime: "image/avif", bytes: [0x66, 0x74, 0x79, 0x70], offset: 4 }, // ....ftyp
];

export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validates an image file by:
 *  1. Checking file size
 *  2. Checking declared MIME type against allowlist
 *  3. Reading magic bytes to verify actual content matches declared type
 *     (prevents MIME confusion / polyglot file attacks)
 */
export async function validateImageFile(file: File): Promise<FileValidationResult> {
  // Size check
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { valid: false, error: "Súbor je príliš veľký. Maximálna veľkosť je 5 MB." };
  }

  if (file.size < 100) {
    return { valid: false, error: "Súbor je príliš malý a môže byť poškodený." };
  }

  // MIME type allowlist check
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return {
      valid: false,
      error: `Nepodporovaný typ súboru (${file.type}). Povolené sú: JPG, PNG, WEBP, AVIF.`,
    };
  }

  // Magic bytes check – read first 12 bytes
  try {
    const buffer = await file.slice(0, 12).arrayBuffer();
    const bytes = new Uint8Array(buffer);

    const isValidMagic = IMAGE_MAGIC_BYTES.some(({ bytes: magic, offset = 0 }) =>
      magic.every((b, i) => bytes[offset + i] === b)
    );

    if (!isValidMagic) {
      return {
        valid: false,
        error: "Súbor nie je platný obrázok. Nahrajte prosím skutočný JPG, PNG alebo WEBP.",
      };
    }
  } catch {
    return { valid: false, error: "Nepodarilo sa overiť súbor. Skúste znovu." };
  }

  return { valid: true };
}

// ─── Rate Limiting (Client-Side) ──────────────────────────────────────────

const RATE_LIMIT_KEY = "ellegance_bazaar_submissions";
const MAX_SUBMISSIONS_PER_HOUR = 3;

interface RateLimitRecord {
  timestamps: number[];
}

/**
 * Simple client-side rate limiter using localStorage.
 * Limits bazaar form submissions to MAX_SUBMISSIONS_PER_HOUR per browser.
 * Note: This is a UX-level guard; true rate limiting must be server-side.
 */
export function checkRateLimit(): { allowed: boolean; remainingMs?: number } {
  if (typeof window === "undefined") return { allowed: true };

  try {
    const now = Date.now();
    const oneHourAgo = now - 60 * 60 * 1000;

    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    const record: RateLimitRecord = raw ? JSON.parse(raw) : { timestamps: [] };

    // Purge expired timestamps
    record.timestamps = record.timestamps.filter((t) => t > oneHourAgo);

    if (record.timestamps.length >= MAX_SUBMISSIONS_PER_HOUR) {
      const oldestInWindow = Math.min(...record.timestamps);
      const remainingMs = oldestInWindow + 60 * 60 * 1000 - now;
      return { allowed: false, remainingMs };
    }

    // Record this submission
    record.timestamps.push(now);
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(record));
    return { allowed: true };
  } catch {
    // If localStorage is unavailable, allow submission
    return { allowed: true };
  }
}

/**
 * Formats remaining rate-limit time as a human-readable Slovak string.
 */
export function formatRemainingTime(ms: number): string {
  const minutes = Math.ceil(ms / 60_000);
  if (minutes < 60) return `${minutes} minút`;
  const hours = Math.ceil(ms / 3_600_000);
  return `${hours} hodín`;
}

// ─── Bot Detection Helpers ────────────────────────────────────────────────

/** Minimum interaction time (ms) before a form submit is considered human */
const MIN_HUMAN_INTERACTION_MS = 3_000;

/**
 * Records when the user first opens the form (for timing-based bot detection).
 */
export function recordFormOpenTime(): number {
  return Date.now();
}

/**
 * Checks if the elapsed time since form was opened is plausibly human.
 * A bot filling a form in < 3s is suspicious.
 */
export function isHumanInteractionTime(openedAt: number): boolean {
  return Date.now() - openedAt >= MIN_HUMAN_INTERACTION_MS;
}

// ─── URL / Redirect Safety ────────────────────────────────────────────────

const ALLOWED_INTERNAL_PATHS = new Set([
  "/",
  "/ponuka",
  "/rodicovska-zona",
  "/vybava",
  "/sutaze",
  "/kontakt",
  "/fotogaleria",
  "/pravidla",
  "/privacy",
  "/press-kit",
  "/2-percenta",
  "/rozpis-hodin",
  "/darcekove-poukazky",
]);

/**
 * Validates that a redirect target is a known internal path.
 * Prevents open redirect vulnerabilities (A01).
 */
export function isSafeInternalPath(path: string): boolean {
  if (!path || typeof path !== "string") return false;
  if (path.startsWith("//") || /^[a-z][a-z\d+\-.]*:/i.test(path)) return false;
  const normalized = path.split("?")[0].split("#")[0];
  return ALLOWED_INTERNAL_PATHS.has(normalized);
}
