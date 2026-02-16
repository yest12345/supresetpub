import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig