import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductBySlug, getRelatedProducts } from '@/lib/data'
import { ProductImageGallery } from '@/components/products/ProductImageGallery'
import { ProductGrid } from '@/components/products/ProductGrid'
import { ProductActions } from './ProductActions'
import { Accordion, AccordionItem } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Star, Package, Shield, Heart, Zap } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Product Not Found' }
  return {
    title: product.name,
    description: product.description || `Premium ${product.name} - discreet delivery across Nigeria`,
    openGraph: {
      title: product.name,
      description: product.description || '',
      images: product.images[0] ? [{ url: product.images[0] }] : [],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const relatedProducts = await getRelatedProducts(product.category, product.id)

  const categoryLabels: Record<string, string> = {
    women: 'For Her',
    men: 'For Him',
    couples: 'Couples',
    accessories: 'Accessories',
  }

  const trustBadges = [
    { icon: Package, label: 'Discreet Packaging' },
    { icon: Shield, label: 'Body-Safe' },
    { icon: Zap, label: 'USB Rechargeable' },
    { icon: Heart, label: 'Waterproof' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-8 lg:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-warm-gray mb-8">
        <Link href="/" className="hover:text-gold transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-gold transition-colors">
          Shop
        </Link>
        <span>/</span>
        <Link
          href={`/shop?category=${product.category}`}
          className="hover:text-gold transition-colors"
        >
          {categoryLabels[product.category]}
        </Link>
        <span>/</span>
        <span className="text-chocolate">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Images */}
        <ProductImageGallery images={product.images} name={product.name} />

        {/* Product Info */}
        <div>
          {product.badge && (
            <Badge
              variant={product.badge as 'bestseller' | 'new' | 'sale'}
              className="mb-3"
            >
              {product.badge}
            </Badge>
          )}
          <span className="text-[11px] uppercase tracking-[2px] text-warm-gray font-medium block mb-2">
            {categoryLabels[product.category]}{' '}
            {product.subcategory ? `• ${product.subcategory}` : ''}
          </span>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-4xl font-bold text-wine leading-tight">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-gold fill-gold'
                      : 'text-beige'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-warm-gray">
              ({product.review_count.toLocaleString()} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mt-4">
            <span className="text-3xl font-bold text-gold">
              {formatPrice(product.price)}
            </span>
            {product.compare_price && (
              <span className="text-lg text-warm-gray line-through">
                {formatPrice(product.compare_price)}
              </span>
            )}
            {product.compare_price && (
              <Badge variant="sale">
                {Math.round(
                  (1 - product.price / product.compare_price) * 100
                )}
                % OFF
              </Badge>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-warm-gray mt-6 leading-relaxed">
              {product.description}
            </p>
          )}

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <ul className="mt-4 space-y-2">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-chocolate">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          )}

          {/* Actions (Client Component) */}
          <ProductActions product={product} />

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-beige">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-sm text-warm-gray">
                <badge.icon className="h-4 w-4 text-gold" />
                {badge.label}
              </div>
            ))}
          </div>

          {/* Details Accordion */}
          {product.details && (
            <div className="mt-8">
              <Accordion>
                {product.material && (
                  <AccordionItem title="Material">
                    <p>{product.material}</p>
                  </AccordionItem>
                )}
                {product.details.dimensions && (
                  <AccordionItem title="Dimensions">
                    <p>{product.details.dimensions}</p>
                  </AccordionItem>
                )}
                {product.details.howToUse && (
                  <AccordionItem title="How to Use">
                    <p>{product.details.howToUse}</p>
                  </AccordionItem>
                )}
                {product.details.howToClean && (
                  <AccordionItem title="How to Clean">
                    <p>{product.details.howToClean}</p>
                  </AccordionItem>
                )}
                {product.details.whatsInBox && (
                  <AccordionItem title="What's in the Box">
                    <p>{product.details.whatsInBox}</p>
                  </AccordionItem>
                )}
              </Accordion>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 lg:mt-24">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl lg:text-3xl text-wine mb-8">
            You May Also Like
          </h2>
          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </div>
  )
}
