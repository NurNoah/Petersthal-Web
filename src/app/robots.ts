// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/', // Admin-Bereich ausschließen
    },
    sitemap: 'https://petersthal.info/sitemap.xml',
  }
}