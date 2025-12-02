/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Provide an explicit (empty) turbopack config so Next's dev doesn't error
  // when a custom webpack function is present elsewhere. Keep config minimal
  // to stay compatible with Next 16's Turbopack default.
  turbopack: {},
  // Force any locale-prefixed URLs (like /en, /en/demo) back to the non-locale
  // version so we never stay on /en in production.
  async redirects() {
    return [
      {
        source: "/:locale(en|ar|es)",
        destination: "/",
        permanent: true,
      },
      {
        source: "/:locale(en|ar|es)/:path*",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;