"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Star, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useStore } from "@/lib/store-context"
import type { Product } from "@/lib/data"

interface WishlistItemProps {
  product: Product
}

export function WishlistItem({ product }: WishlistItemProps) {
  const { moveToCart, removeFromWishlist, isInCart } = useStore()
  const inCart = isInCart(product.id)

  return (
    <Card className="overflow-hidden border-0 bg-card shadow-sm">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </Link>

      <CardContent className="p-4">
        {/* Category */}
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {product.category}
        </p>

        {/* Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="mt-1 line-clamp-1 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground">
            {product.name}
          </h3>
        </Link>

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

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <Button
            size="sm"
            className="flex-1 gap-1.5"
            onClick={() => moveToCart(product.id)}
            disabled={!product.inStock}
          >
            <ShoppingBag className="h-4 w-4" />
            {inCart ? "Add More" : "Move to Cart"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="px-2.5"
            onClick={() => removeFromWishlist(product.id)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove from wishlist</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
