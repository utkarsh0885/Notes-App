"use client"

import Link from "next/link"
import { ArrowRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WishlistItem } from "@/components/wishlist-item"
import { useStore } from "@/lib/store-context"

export default function WishlistPage() {
  const { wishlist, wishlistCount } = useStore()

  if (wishlist.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="rounded-full bg-muted p-6">
            <Heart className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="mt-6 text-2xl font-semibold text-foreground">Your wishlist is empty</h1>
          <p className="mt-2 max-w-sm text-muted-foreground">
            Start adding items you love to your wishlist. Click the heart icon on any product to save it here.
          </p>
          <Button asChild className="mt-8 gap-2">
            <Link href="/products">
              Explore Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          My Wishlist
        </h1>
        <p className="mt-1 text-muted-foreground">
          {wishlistCount} {wishlistCount === 1 ? "item" : "items"} saved
        </p>
      </div>

      {/* Wishlist Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {wishlist.map((product) => (
          <WishlistItem key={product.id} product={product} />
        ))}
      </div>

      {/* Continue Shopping */}
      <div className="mt-12 flex justify-center">
        <Button asChild variant="outline" className="gap-2">
          <Link href="/products">
            Continue Shopping
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
