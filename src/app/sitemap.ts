// app/sitemap.ts
import { MetadataRoute } from 'next'
import { clubs } from '@/lib/data' // Stellen Sie sicher, dass der Pfad korrekt ist

export default function sitemap(): MetadataRoute.Sitemap {
  const clubUrls = clubs.map((club) => ({
    url: `https://www.petersthal.info/vereine/${club.slug}`,
    lastModified: new Date(),
  }));

  const staticUrls = [
    { url: 'https://www.petersthal.info', lastModified: new Date() },
    { url: 'https://www.petersthal.info/veranstaltungen', lastModified: new Date() },
    { url: 'https://www.petersthal.info/gastronomie', lastModified: new Date() },
    { url: 'https://www.petersthal.info/unterkuenfte', lastModified: new Date() },
    { url: 'https://www.petersthal.info/anfahrt', lastModified: new Date() },
    { url: 'https://www.petersthal.info/vereine', lastModified: new Date() },
  ];

  return [
    ...staticUrls,
    ...clubUrls,
  ];
}