/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://tunepulse-backend.onrender.com/api/:path*",
      },
    ];
  },
  images: {
    domains: ["i.scdn.co"],
  },
};

module.exports = nextConfig;
