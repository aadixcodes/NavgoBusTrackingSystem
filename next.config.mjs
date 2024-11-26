/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
      },
      images: {
        domains: ['e7.pngegg.com'], // Add the hostname here
      },
}; 

export default nextConfig;
