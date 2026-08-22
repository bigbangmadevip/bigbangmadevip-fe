import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  deploymentId: process.env.DEPLOYMENT_VERSION,
  reactStrictMode: true,
  turbopack: {
    root: process.cwd(),
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  webpack(config) {
    const svgAssetRule = config.module.rules.find(
      (rule: { test?: RegExp }) =>
        rule && typeof rule === 'object' && rule.test?.test?.('.svg'),
    );

    if (svgAssetRule && typeof svgAssetRule === 'object') {
      svgAssetRule.exclude = /\.svg$/i;
    }

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  devIndicators: false,
};

export default nextConfig;
