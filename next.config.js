/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['leadbazaar-na2mnamow-developernds-projects.vercel.app'], // Replace 'localhost' with your actual domains
  },
  experimental: {
    serverActions: true,
    typedRoutes: true,
  },
  output: 'standalone',
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        '@': '.',
      },
    }
    return config
  }
}

module.exports = nextConfig 