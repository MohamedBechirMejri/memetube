import withSerwistInit from "@serwist/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: process.env.NODE_ENV === "development" ? false : true,
  },
  // allow all image domains
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  disable: false,
  // exclude manifest.json from service worker
  exclude: [/^manifest./],
});

export default withSerwist(nextConfig);
