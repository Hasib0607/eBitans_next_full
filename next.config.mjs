import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enables React Strict Mode for highlighting potential problems
  productionBrowserSourceMaps: true, // Enables source maps for production builds
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
