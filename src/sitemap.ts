import type { MetadataRoute } from 'next'
import { topics } from '@/lib/data/topics'

export default function sitemap(): MetadataRoute.Sitemap {
  const topicPages = topics.map(topic => ({
    url: `https://physics-path.vercel.app/topics/${topic.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: 'https://physics-path.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: 'https://physics-path.vercel.app/roadmap',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: 'https://physics-path.vercel.app/resources',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...topicPages,
  ]
}