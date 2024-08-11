import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {};

const analyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);

export default analyzerConfig;
