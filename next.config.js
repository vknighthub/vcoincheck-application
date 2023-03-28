/** @type {import('next').NextConfig} */

const runtimeCaching = require("next-pwa/cache");
const { i18n } = require("./next-i18next.config");
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  runtimeCaching,
});

const nextConfig = withPWA({
  reactStrictMode: true,
  i18n,
  images: {
    domains: ["localhost", "127.0.0.1","api.vcoincheck.io","103.77.166.246"],
  },
  ...(process.env.APPLICATION_MODE === "production" && {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  }),
});

module.exports = nextConfig;
