import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Skip TypeScript type-checking during builds (prevents multi-minute hangs).
  // TypeScript errors will still be visible in your editor and during `tsc` runs.
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/douvu5qu2/**",
      },
    ],
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
  allowedDevOrigins: ["192.168.0.246"],
};

export default nextConfig;
