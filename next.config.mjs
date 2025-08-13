/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'bucket-wacc1.f47d23c072e7b2f871ecca11e36e0b25.r2.cloudflarestorage.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'bucket-wacc1.f47d23c072e7b2f871ecca11e36e0b25.r2.cloudflarestorage.com',
      },
    ],
  },
  experimental: {
    // Increase body size limit to 10MB for API routes
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // Also set for API routes
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default nextConfig;