import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  deploymentId: process.env.DEPLOYMENT_VERSION,
  reactStrictMode: true,
  turbopack: { root: process.cwd() },
  devIndicators: false,
};

export default nextConfig;
