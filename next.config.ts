import type { NextConfig } from "next";

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
};

export default nextConfig;
