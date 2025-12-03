import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/subdomain/:subdomain*',
        destination: '/subdomain/:subdomain*',
      },
    ]
  },
};

export default nextConfig;
