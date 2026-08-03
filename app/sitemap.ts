import { MetadataRoute } from 'next'
import { CONVERTERS } from '@/lib/converter-config'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://creatorhubtools.com'
  
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/file-converter`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/pdf-merge`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/image-compressor`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/video-to-mp3`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/qr-generator`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ] as MetadataRoute.Sitemap

  const dynamicRoutes = CONVERTERS.map((c) => ({
    url: `${baseUrl}/${c.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  })) as MetadataRoute.Sitemap

  return [...staticRoutes, ...dynamicRoutes]
}
