/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['fourhoi.com', 'missav.ws'],
    unoptimized: true,
  },
}

module.exports = nextConfig
