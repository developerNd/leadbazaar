/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  output: 'standalone',
  experimental: {
    serverActions: true,
  }
}

module.exports = nextConfig 