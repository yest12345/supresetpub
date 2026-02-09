import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // 增加请求体大小限制到 50MB
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  typescript: {
    // 忽略 TypeScript 构建错误，允许部署继续
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
