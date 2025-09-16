import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export', // Static HTML export
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
