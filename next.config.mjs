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

export default nextConfig;
