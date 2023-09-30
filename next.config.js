/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "cdn.sanity.io"
    ],
    deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920, 2048], // Specify the device sizes for image optimization
    imageSizes: [16, 32, 48, 64, 96], // Specify the image sizes for image optimization
    loader: "default",
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          
          
        ],
      },
    ];
  },
};

module.exports = nextConfig
