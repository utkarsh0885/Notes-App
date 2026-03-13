"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, ShoppingBag, Heart, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useStore } from "@/lib/store-context"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
]

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { cartCount, wishlistCount } = useStore()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
      setSearchOpen(false)
      setSearchQuery("")
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2 text-xl font-semibold tracking-tight transition-opacity hover:opacity-80"
        >
          <span className="text-foreground">LUXE</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground",
                pathname === link.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="flex items-center gap-1">
          {/* Search */}
          {searchOpen ? (
            <form onSubmit={handleSearch} className="hidden md:flex md:items-center md:gap-2">
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-64"
                autoFocus
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={() => setSearchOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close search</span>
              </Button>
            </form>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="hidden h-9 w-9 md:flex"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          {/* Wishlist */}
          <Button variant="ghost" size="icon" className="relative h-9 w-9" asChild>
            <Link href="/wishlist">
              <Heart className="h-4 w-4" />
              {wishlistCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[10px] font-medium text-background">
                  {wishlistCount > 9 ? "9+" : wishlistCount}
                </span>
              )}
              <span className="sr-only">Wishlist ({wishlistCount})</span>
            </Link>
          </Button>

          {/* Cart */}
          <Button variant="ghost" size="icon" className="relative h-9 w-9" asChild>
            <Link href="/cart">
              <ShoppingBag className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[10px] font-medium text-background">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
              <span className="sr-only">Cart ({cartCount})</span>
            </Link>
          </Button>

          {/* Profile */}
          <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
            <Link href="/profile">
              <User className="h-4 w-4" />
              <span className="sr-only">Profile</span>
            </Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-6 pt-6">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="flex gap-2">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-10"
                  />
                  <Button type="submit" size="icon" className="h-10 w-10">
                    <Search className="h-4 w-4" />
                  </Button>
                </form>

                {/* Mobile Navigation */}
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-foreground",
                        pathname === link.href
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/wishlist"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Wishlist
                    {wishlistCount > 0 && (
                      <span className="rounded-full bg-foreground px-2 py-0.5 text-xs text-background">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    href="/cart"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Cart
                    {cartCount > 0 && (
                      <span className="rounded-full bg-foreground px-2 py-0.5 text-xs text-background">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Profile
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
