/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3008",
        // pathname: '/account123/**',
        // search: '',
      },
    ],
  },
};

export default nextConfig;
