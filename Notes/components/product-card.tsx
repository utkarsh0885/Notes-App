"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useStore } from "@/lib/store-context"
import type { Product } from "@/lib/data"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, isInCart } = useStore()
  const inWishlist = isInWishlist(product.id)
  const inCart = isInCart(product.id)

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  return (
    <Card className={cn("group overflow-hidden border-0 bg-card shadow-sm transition-all duration-300 hover:shadow-lg", className)}>
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Discount Badge */}
          {discount && (
            <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
              -{discount}%
            </span>
          )}

          {/* Wishlist Button */}
          <Button
            variant="secondary"
            size="icon"
            className={cn(
              "absolute right-3 top-3 h-8 w-8 rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100",
              inWishlist && "opacity-100 bg-foreground text-background hover:bg-foreground/90"
            )}
            onClick={handleWishlistClick}
          >
            <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
            <span className="sr-only">{inWishlist ? "Remove from wishlist" : "Add to wishlist"}</span>
          </Button>

          {/* Quick Add to Cart */}
          <div className="absolute inset-x-3 bottom-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
            <Button
              className="w-full gap-2"
              size="sm"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingBag className="h-4 w-4" />
              {inCart ? "Add More" : "Add to Cart"}
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Category */}
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {product.category}
          </p>

          {/* Name */}
          <h3 className="mt-1 line-clamp-1 text-sm font-medium text-foreground transition-colors group-hover:text-foreground/80">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="mt-2 flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-foreground text-foreground" />
            <span className="text-xs font-medium text-foreground">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()})</span>
          </div>

          {/* Price */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-base font-semibold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          {!product.inStock && (
            <p className="mt-2 text-xs font-medium text-destructive">Out of Stock</p>
          )}
        </CardContent>
      </Link>
    </Card>
  )
}
