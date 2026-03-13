"use client"

import { use, useState } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft, Heart, Minus, Plus, ShoppingBag, Star, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductGallery } from "@/components/product-gallery"
import { ProductCard } from "@/components/product-card"
import { useStore } from "@/lib/store-context"
import { getProductById, getProductsByCategory } from "@/lib/data"
import { cn } from "@/lib/utils"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params)
  const product = getProductById(id)
  const [quantity, setQuantity] = useState(1)
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, isInCart } = useStore()

  if (!product) {
    notFound()
  }

  const inWishlist = isInWishlist(product.id)
  const inCart = isInCart(product.id)
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setQuantity(1)
  }

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const incrementQuantity = () => setQuantity((q) => Math.min(q + 1, 10))
  const decrementQuantity = () => setQuantity((q) => Math.max(q - 1, 1))

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Products
        </Link>
      </nav>

      {/* Product Details */}
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Gallery */}
        <ProductGallery images={product.images} productName={product.name} />

        {/* Info */}
        <div className="flex flex-col">
          {/* Category */}
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            {product.category}
          </p>

          {/* Name */}
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="mt-4 flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.floor(product.rating)
                      ? "fill-foreground text-foreground"
                      : "fill-muted text-muted"
                  )}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">{product.rating}</span>
            <span className="text-sm text-muted-foreground">
              ({product.reviews.toLocaleString()} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-semibold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
                  Save {discount}%
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {/* Stock Status */}
          <div className="mt-6 flex items-center gap-2">
            <div
              className={cn(
                "h-2 w-2 rounded-full",
                product.inStock ? "bg-green-500" : "bg-red-500"
              )}
            />
            <span className="text-sm font-medium text-foreground">
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="mt-8">
            <label className="text-sm font-medium text-foreground">Quantity</label>
            <div className="mt-2 flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center text-lg font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10"
                onClick={incrementQuantity}
                disabled={quantity >= 10}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="flex-1 gap-2"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingBag className="h-5 w-5" />
              {inCart ? "Add More to Cart" : "Add to Cart"}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className={cn(
                "gap-2",
                inWishlist && "border-foreground bg-foreground text-background hover:bg-foreground/90 hover:text-background"
              )}
              onClick={handleWishlistToggle}
            >
              <Heart className={cn("h-5 w-5", inWishlist && "fill-current")} />
              {inWishlist ? "In Wishlist" : "Add to Wishlist"}
            </Button>
          </div>

          {/* Shipping Info */}
          <div className="mt-8 rounded-xl border border-border bg-card p-4">
            <div className="flex items-start gap-3">
              <Truck className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Free Shipping</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  On orders over $100. Estimated delivery: 3-5 business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 sm:mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            You Might Also Like
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
