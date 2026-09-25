/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lautechneuro.org.ng',
      },
      {
        protocol: 'https',
        hostname: 'jzceqrvrndgcnqoszwos.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  trailingSlash: true,
};

module.exports = nextConfig;

