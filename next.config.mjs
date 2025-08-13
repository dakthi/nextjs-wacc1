/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
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