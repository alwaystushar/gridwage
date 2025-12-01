/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  i18n: {
    locales: ["en", "ar", "es"],
    defaultLocale: "en"
  }
};

module.exports = nextConfig;
