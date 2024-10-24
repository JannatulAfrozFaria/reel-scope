import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  redirects() {
    return Promise.resolve([
      {
        source: "/",
        destination: "/discover/now_playing",
        permanent: true,
      },
    ]);
  },
};

export default nextConfig;
