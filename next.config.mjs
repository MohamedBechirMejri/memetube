// import MillionLint from "@million/lint";
import withSerwistInit from "@serwist/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: process.env.NODE_ENV === "development" ? true : true,
    // ppr: true,
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
  // react 19 breaks framer motion so this is a workaround until it gets fixed
  reactStrictMode: process.env.NODE_ENV === "development" ? false : true,
};
const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  disable: true, // process.env.NODE_ENV === "development",
  // exclude manifest.json from service worker
  exclude: [/^manifest/],
});
// export default MillionLint.next({
//   rsc: true
// })(withSerwist(nextConfig));

export default withSerwist(nextConfig);
