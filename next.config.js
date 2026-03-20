/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // This is the magic line
  images: {
    unoptimized: true, // Required for GitHub Pages
  },
};
export default nextConfig;

