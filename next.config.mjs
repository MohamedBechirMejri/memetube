/** @type {import('next').NextConfig} */
const nextConfig = {
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
