import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  turbopack: { root: process.cwd() },
  devIndicators: false,
};

export default nextConfig;
