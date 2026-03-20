/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

module.exports = {
  reactStrictMode: true,
  output: 'export',
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
};
