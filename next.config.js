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
}

module.exports = nextConfig 