import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["image.tmdb.org"], 
  },
  redirects() {
    return Promise.resolve([
      {
        source: "/",
        destination: "/discover/popular",
        permanent: true,
      },
    ]);
  },
};

export default nextConfig;
