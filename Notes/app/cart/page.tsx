"use client"

import Link from "next/link"
import { ArrowRight, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CartItem } from "@/components/cart-item"
import { useStore } from "@/lib/store-context"

export default function CartPage() {
  const { cart, cartTotal, cartCount, clearCart } = useStore()

  const shipping = cartTotal >= 100 ? 0 : 9.99
  const total = cartTotal + shipping

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="rounded-full bg-muted p-6">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="mt-6 text-2xl font-semibold text-foreground">Your cart is empty</h1>
          <p className="mt-2 max-w-sm text-muted-foreground">
            Looks like you have not added anything to your cart yet. Start shopping to fill it up!
          </p>
          <Button asChild className="mt-8 gap-2">
            <Link href="/products">
              Continue Shopping
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Shopping Cart
          </h1>
          <p className="mt-1 text-muted-foreground">
            {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={clearCart} className="text-muted-foreground">
          Clear Cart
        </Button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="divide-y divide-border rounded-xl border border-border bg-card">
            {cart.map((item) => (
              <div key={item.product.id} className="px-4 sm:px-6">
                <CartItem item={item} />
              </div>
            ))}
          </div>

          {/* Continue Shopping */}
          <div className="mt-6">
            <Button asChild variant="outline" className="gap-2">
              <Link href="/products">
                <ArrowRight className="h-4 w-4 rotate-180" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium text-foreground">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium text-foreground">
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-muted-foreground">
                  Free shipping on orders over $100
                </p>
              )}
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-foreground">Total</span>
                <span className="text-xl font-semibold text-foreground">${total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>

          {/* Security Notice */}
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Secure checkout. Your information is protected.
          </p>
        </div>
      </div>
    </div>
  )
}
