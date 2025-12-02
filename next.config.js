/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Provide an explicit (empty) turbopack config so Next's dev doesn't error
  // when a custom webpack function is present elsewhere. Keep config minimal
  // to stay compatible with Next 16's Turbopack default.
  turbopack: {},
};

module.exports = nextConfig;