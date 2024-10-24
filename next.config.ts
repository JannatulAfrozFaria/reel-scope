import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
