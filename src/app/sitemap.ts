// app/sitemap.ts
import { MetadataRoute } from 'next'
import { clubs } from '@/lib/data' // Stellen Sie sicher, dass der Pfad korrekt ist

export default function sitemap(): MetadataRoute.Sitemap {
  const clubUrls = clubs.map((club) => ({
    url: `https://www.petersthal.info/vereine/${club.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const staticUrls = [
    { url: 'https://www.petersthal.info', lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: 'https://www.petersthal.info/veranstaltungen', lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: 'https://www.petersthal.info/gastronomie', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: 'https://www.petersthal.info/unterkuenfte', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: 'https://www.petersthal.info/anfahrt', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: 'https://www.petersthal.info/vereine', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: 'https://www.petersthal.info/buergerblock', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
  ];

  return [
    ...staticUrls,
    ...clubUrls,
  ];
}