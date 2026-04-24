import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i2thj8wjpx8c8akx.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
    ]
  },
};

export default nextConfig;
