import type { NextConfig } from "next";

const nextConfig = {
  /* config options here */
  experimental: {},
  allowedDevOrigins: ['192.168.1.19', '172.20.10.7', 'localhost:3000'],
} as any;

export default nextConfig;
