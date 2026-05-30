import type { NextConfig } from "next";

// ─────────────────────────────────────────────────────────────────────────────
// Security Headers – OWASP Top 10 + modern web hardening
//
// Deployment matrix:
//  • Dev server (next dev)    → applied on every response ✓
//  • Vercel / Railway         → applied on every response ✓
//  • GitHub Pages (static)    → NOT applied here; use public/_headers for
//    Cloudflare Pages or a CDN-level config instead.
// ─────────────────────────────────────────────────────────────────────────────

const isDev = process.env.NODE_ENV !== "production";

// ── Content Security Policy ───────────────────────────────────────────────
// Principle: allowlist only what the app actually needs.
// 'unsafe-inline' on scripts is required by Framer Motion / GSAP inline styles.
// 'unsafe-eval'  is required by Framer Motion's animation engine.
// For a stricter setup, migrate to nonce-based CSP once the app moves to a
// server-side rendering (non-static-export) deployment.
const cspDirectives: string[] = [
  // Deny everything by default
  "default-src 'self'",

  // Scripts: self + inline styles required by animation libs
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",

  // Styles: Google Fonts CDN + inline styles (Tailwind CSS-in-JS)
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",

  // Fonts: Google Fonts static files
  "font-src 'self' https://fonts.gstatic.com data:",

  // Images: local + data URIs (photo uploads) + blob (canvas) + any HTTPS (CDN)
  "img-src 'self' data: blob: https:",

  // XHR/fetch/WebSocket: Supabase project URL + cdn.jsdelivr.net for world-atlas data
  `connect-src 'self' https://qrmqriyturskjwbcaalr.supabase.co https://cdn.jsdelivr.net wss://qrmqriyturskjwbcaalr.supabase.co${isDev ? " ws://localhost:* http://localhost:*" : ""}`,

  // No plugin embeds (Flash, Java, etc.)
  "object-src 'none'",

  // No audio/video from third parties
  "media-src 'self' blob:",

  // Workers (service workers, web workers) – self only
  "worker-src 'self' blob:",

  // Prevent this site from being embedded in an iframe (clickjacking)
  "frame-ancestors 'none'",

  // Allow YouTube embeds on /ponuka (svadobné tance video)
  "frame-src https://www.youtube.com https://www.youtube-nocookie.com",

  // Restrict <base> tag to same origin
  "base-uri 'self'",

  // Only allow form submissions to same origin
  "form-action 'self'",

  // Upgrade HTTP → HTTPS sub-requests automatically (production only)
  // In dev the server runs on plain HTTP – enabling this would block CSS/JS loading.
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
];

// ── Permission Policy ──────────────────────────────────────────────────────
// Deny access to sensitive browser APIs this app does not use.
// Note: geolocation is used by LiveLocation component – allow self only.
const permissionPolicyDirectives: string[] = [
  "camera=()",           // Not used
  "microphone=()",       // Not used
  "geolocation=(self)",  // Used by LiveLocation component
  "payment=()",          // Not used
  "usb=()",              // Not used
  "display-capture=()",  // Not used
  "fullscreen=(self \"https://www.youtube.com\")",   // Gallery + YouTube embeds
  "autoplay=()",         // Not used
  "gyroscope=()",        // Not used
  "magnetometer=()",     // Not used
  "accelerometer=()",    // Not used
  "ambient-light-sensor=()",
  "battery=()",
  "interest-cohort=()",  // Opt out of FLoC/Topics API (privacy)
];

// ── Security Headers Array ─────────────────────────────────────────────────
const securityHeaders = [
  // ── A02: Security Misconfiguration ─────────────────────────────────────
  // Prevent MIME-type sniffing (e.g., serving JS as image)
  { key: "X-Content-Type-Options", value: "nosniff" },

  // ── A01: Broken Access Control – Clickjacking prevention ───────────────
  // Belt-and-suspenders with CSP frame-ancestors 'none' above
  { key: "X-Frame-Options", value: "DENY" },

  // ── Legacy XSS filter (IE/Edge < 18) ───────────────────────────────────
  { key: "X-XSS-Protection", value: "1; mode=block" },

  // ── Referrer Policy – minimal data leakage ─────────────────────────────
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

  // ── HSTS – Enforce HTTPS for 2 years, include subdomains ───────────────
  // Only effective when served over TLS (Vercel/Cloudflare handles this).
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },

  // ── Cross-Origin Opener Policy ─────────────────────────────────────────
  // Isolates browsing context to prevent Spectre-style cross-origin attacks.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },

  // ── Cross-Origin Resource Policy ──────────────────────────────────────
  // Prevents other origins from loading our resources (CSS/images/JS).
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },

  // ── Cross-Origin Embedder Policy ──────────────────────────────────────
  // Required for SharedArrayBuffer; also strengthens isolation.
  // 'require-corp' – resources must opt-in to be loadable cross-origin.
  // Note: Only enable if all third-party resources send CORP headers.
  // Google Fonts doesn't, so use 'unsafe-none' for now.
  { key: "Cross-Origin-Embedder-Policy", value: "unsafe-none" },

  // ── DNS Prefetch Control ───────────────────────────────────────────────
  // Reduce information leakage via DNS prefetch to third parties.
  { key: "X-DNS-Prefetch-Control", value: "on" },

  // ── Permission Policy ──────────────────────────────────────────────────
  {
    key: "Permissions-Policy",
    value: permissionPolicyDirectives.join(", "),
  },

  // ── Content Security Policy ────────────────────────────────────────────
  {
    key: "Content-Security-Policy",
    value: cspDirectives.join("; "),
  },
];

const nextConfig: NextConfig = {
  // Configured for Vercel dynamic hosting with custom domain support
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {},
  // @ts-ignore – allowedDevOrigins is an internal Next.js option
  allowedDevOrigins: [
    "192.168.1.19",
    "172.20.10.7",
    "localhost:3000",
    "192.168.1.17",
  ],

  // ── Turbopack config (Next.js 16 default bundler) ─────────────────────
  // Empty config is required to suppress the Turbopack/webpack conflict warning.
  // Webpack-specific optimizations are not needed for a static export.
  turbopack: {},

  // ── Inject security headers on all routes ─────────────────────────────
  // Active in: Next.js dev server + server-side hosting (Vercel, Railway).
  // For GitHub Pages static export → apply via public/_headers (Cloudflare).
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
