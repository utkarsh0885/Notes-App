"use client"

import Link from "next/link"
import Image from "next/image"
import { Bell, ChevronRight, CreditCard, Heart, HelpCircle, LogOut, Package, Settings, ShoppingBag, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ProfileCard } from "@/components/profile-card"
import { useStore } from "@/lib/store-context"

// Mock user data
const user = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
  memberSince: "January 2024"
}

// Mock order history
const orders = [
  {
    id: "ORD-001",
    date: "March 10, 2026",
    status: "Delivered",
    total: 349.99,
    items: [
      { name: "Premium Wireless Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop" }
    ]
  },
  {
    id: "ORD-002",
    date: "February 28, 2026",
    status: "Delivered",
    total: 189.99,
    items: [
      { name: "Minimalist Watch", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop" }
    ]
  },
  {
    id: "ORD-003",
    date: "February 15, 2026",
    status: "Delivered",
    total: 279.99,
    items: [
      { name: "Smart Fitness Watch", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=100&h=100&fit=crop" }
    ]
  }
]

const settingsLinks = [
  { icon: User, label: "Account Settings", href: "#" },
  { icon: Bell, label: "Notifications", href: "#" },
  { icon: CreditCard, label: "Payment Methods", href: "#" },
  { icon: Settings, label: "Preferences", href: "#" },
  { icon: HelpCircle, label: "Help & Support", href: "#" },
]

export default function ProfilePage() {
  const { cartCount, wishlistCount } = useStore()

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Card */}
          <ProfileCard user={user} />

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Link href="/cart">
              <Card className="transition-colors hover:bg-muted/50">
                <CardContent className="flex flex-col items-center p-4">
                  <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                  <span className="mt-2 text-2xl font-semibold text-foreground">{cartCount}</span>
                  <span className="text-xs text-muted-foreground">In Cart</span>
                </CardContent>
              </Card>
            </Link>
            <Link href="/wishlist">
              <Card className="transition-colors hover:bg-muted/50">
                <CardContent className="flex flex-col items-center p-4">
                  <Heart className="h-6 w-6 text-muted-foreground" />
                  <span className="mt-2 text-2xl font-semibold text-foreground">{wishlistCount}</span>
                  <span className="text-xs text-muted-foreground">Wishlist</span>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Order History */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order History
              </CardTitle>
              <Button variant="ghost" size="sm" className="gap-1">
                View All
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-border">
                {orders.map((order) => (
                  <div key={order.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                    {/* Order Image */}
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={order.items[0].image}
                        alt={order.items[0].name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>

                    {/* Order Details */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {order.items[0].name}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {order.id} &middot; {order.date}
                      </p>
                    </div>

                    {/* Status & Total */}
                    <div className="text-right">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                        {order.status}
                      </span>
                      <p className="mt-1 text-sm font-semibold text-foreground">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-border">
                {settingsLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center justify-between py-3 first:pt-0 last:pb-0 transition-colors hover:text-muted-foreground"
                  >
                    <div className="flex items-center gap-3">
                      <link.icon className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{link.label}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                ))}

                <Separator className="my-3" />

                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
