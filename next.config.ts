import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { hostname: "i.pinimg.com" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "res.cloudinary.com" }
    ],
  },
};

export default nextConfig;
