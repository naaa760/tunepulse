/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.scdn.co"], // Allow images from Spotify CDN
  },
  // Add this to disable font optimization if it's causing issues
  optimizeFonts: false,
};

module.exports = nextConfig;
