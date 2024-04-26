import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: [
      'https://craescustefangabriel.com/sitemap.xml',
      'https://www.craescustefangabriel.com/sitemap.xml'
    ]
  }
}