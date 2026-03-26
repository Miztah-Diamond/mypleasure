import type { MetadataRoute } from 'next'
import { getProducts } from '@/lib/data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mypleasure.vercel.app'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    '', '/shop', '/about', '/contact', '/faq', '/track',
    '/privacy', '/shipping', '/returns', '/terms',
  ].map(page => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page === '' ? 'daily' : 'weekly',
    priority: page === '' ? 1 : page === '/shop' ? 0.9 : 0.7,
  }))

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = [
    'women', 'men', 'couples', 'accessories',
  ].map(cat => ({
    url: `${baseUrl}/shop?category=${cat}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Dynamic product pages
  let productPages: MetadataRoute.Sitemap = []
  try {
    const products = await getProducts()
    productPages = products.map(product => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: new Date(product.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch {
    // If DB unavailable, skip dynamic pages
  }

  return [...staticPages, ...categoryPages, ...productPages]
}
