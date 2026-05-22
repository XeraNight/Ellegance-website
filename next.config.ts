import type { NextConfig } from "next";

// ─────────────────────────────────────────────────────────
// Security Headers (OWASP Top 10 hardening)
// NOTE: On GitHub Pages (static export) these are active
// only in local dev server. For production on Vercel/Railway
// they apply to all responses. For GitHub Pages, use
// Cloudflare proxy or a _headers file (Netlify).
// ─────────────────────────────────────────────────────────
const securityHeaders = [
  // Prevent MIME type sniffing (A02 – Security Misconfiguration)
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Prevent clickjacking via iframes (A01 – Broken Access Control)
  { key: "X-Frame-Options", value: "DENY" },
  // Legacy XSS protection for older browsers
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // Control referrer information sent with requests
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable browser features not needed (privacy hardening)
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  // Enforce HTTPS for 2 years including subdomains (A02)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Content Security Policy – Restricts resource origins (A05 – Injection / XSS)
  // 'unsafe-inline' is needed for Framer Motion inline styles and Google Fonts
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // unsafe-eval required by Framer Motion/GSAP
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https:",
      // Supabase project URL for DB calls
      "connect-src 'self' https://qrmqriyturskjwbcaalr.supabase.co wss://qrmqriyturskjwbcaalr.supabase.co",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/Ellegance-website' : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {},
  // @ts-ignore
  allowedDevOrigins: ['192.168.1.19', '172.20.10.7', 'localhost:3000', '192.168.1.17'],

  // Inject security headers on all routes (active in dev + server-side hosting)
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

