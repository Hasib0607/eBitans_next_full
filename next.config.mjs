import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.ebitans.com",
      },
      {
        protocol: "https",
        hostname: "testing.ebitans.com",
      },
    ],
  },
};

const analyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);

export default analyzerConfig;
