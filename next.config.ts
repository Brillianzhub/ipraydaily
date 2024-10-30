import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.brillianzhub.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;