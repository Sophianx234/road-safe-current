import type { NextConfig } from "next";



const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('danfojs-node');
    }
    return config;
  },
};

export default nextConfig;
