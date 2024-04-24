/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'i.scdn.co'
      },
      {
        hostname: 'cdn.akamai.steamstatic.com'
      },
      {
        hostname: 'image.tmdb.org'
      }
    ]
  }
};

export default nextConfig;
