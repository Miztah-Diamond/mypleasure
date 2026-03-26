import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mypleasureltd.com'

  const staticPages = [
    '', '/shop', '/about', '/contact', '/faq', '/track',
    '/privacy', '/shipping', '/returns', '/terms',
  ]

  return staticPages.map(page => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page === '' ? 'daily' : 'weekly',
    priority: page === '' ? 1 : page === '/shop' ? 0.9 : 0.7,
  }))
}
