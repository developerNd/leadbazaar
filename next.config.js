/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['leadbazaar-na2mnamow-developernds-projects.vercel.app'], // Replace 'localhost' with your actual domains
    unoptimized: true
  },
  experimental: {
    typedRoutes: false,
    serverActions: {
      bodySizeLimit: '2mb'
    }
  },
  serverExternalPackages: [],
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