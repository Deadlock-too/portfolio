/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'i.scdn.co',
      },
      {
        hostname: 'steamcdn-a.akamaihd.net',
      },
      {
        hostname: 'image.tmdb.org',
      },
    ],
  },
}

export default nextConfig
