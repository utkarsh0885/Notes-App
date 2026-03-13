"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStore, type CartItem as CartItemType } from "@/lib/store-context"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateCartQuantity, removeFromCart } = useStore()
  const { product, quantity } = item

  const incrementQuantity = () => updateCartQuantity(product.id, quantity + 1)
  const decrementQuantity = () => updateCartQuantity(product.id, quantity - 1)

  return (
    <div className="flex gap-4 py-6">
      {/* Image */}
      <Link
        href={`/products/${product.id}`}
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-muted sm:h-32 sm:w-32"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="128px"
          className="object-cover transition-transform hover:scale-105"
        />
      </Link>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link
              href={`/products/${product.id}`}
              className="text-sm font-medium text-foreground transition-colors hover:text-muted-foreground sm:text-base"
            >
              {product.name}
            </Link>
            <p className="mt-0.5 text-xs text-muted-foreground capitalize">
              {product.category}
            </p>
          </div>
          <p className="text-sm font-semibold text-foreground sm:text-base">
            ${(product.price * quantity).toFixed(2)}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={decrementQuantity}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={incrementQuantity}
              disabled={quantity >= 10}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Remove Button */}
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-muted-foreground hover:text-destructive"
            onClick={() => removeFromCart(product.id)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Remove</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
