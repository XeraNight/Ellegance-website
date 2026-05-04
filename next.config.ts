import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/Ellegance-website',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {},
  // @ts-ignore
  allowedDevOrigins: ['192.168.1.19', '172.20.10.7', 'localhost:3000'],
};

export default nextConfig;
