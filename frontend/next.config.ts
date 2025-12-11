import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wewin.edu.vn",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  turbopack: {},
};

export default nextConfig;
