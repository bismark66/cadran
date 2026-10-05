import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // for local testing only — don't ship hotlinked Pinterest images:
      // { protocol: 'https', hostname: 'i.pinimg.com' },
    ],
  },
}

export default nextConfig
