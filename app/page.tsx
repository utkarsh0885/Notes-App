import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { categories, getFeaturedProducts, getTrendingProducts } from "@/lib/data"

export default function HomePage() {
  const featuredProducts = getFeaturedProducts()
  const trendingProducts = getTrendingProducts()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col items-start">
              <span className="mb-4 inline-block rounded-full bg-muted px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                New Collection 2026
              </span>
              <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Discover products designed for modern living
              </h1>
              <p className="mt-6 max-w-lg text-pretty text-lg text-muted-foreground">
                Curated selection of premium electronics, accessories, and lifestyle products. 
                Experience quality that speaks for itself.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/products">
                    Shop Collection
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/products?featured=true">
                    Featured Items
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-square lg:aspect-[4/5]">
              <div className="absolute inset-0 rounded-2xl bg-muted" />
              <Image
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=1000&fit=crop"
                alt="Modern lifestyle products showcase"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Shop by Category
              </h2>
              <p className="mt-2 text-muted-foreground">
                Explore our curated collections
              </p>
            </div>
            <Link 
              href="/products" 
              className="hidden items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground sm:flex"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-muted"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/0 to-foreground/0" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                  <p className="mt-0.5 text-sm text-white/80">{category.productCount} products</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-card py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Featured Products
              </h2>
              <p className="mt-2 text-muted-foreground">
                Handpicked favorites from our collection
              </p>
            </div>
            <Link 
              href="/products?featured=true" 
              className="hidden items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground sm:flex"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 flex justify-center sm:hidden">
            <Button asChild variant="outline">
              <Link href="/products?featured=true">View All Featured</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-foreground">
            <div className="absolute inset-0 opacity-20">
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=600&fit=crop"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="relative px-6 py-16 sm:px-12 sm:py-20 lg:py-24">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-balance text-3xl font-semibold tracking-tight text-background sm:text-4xl">
                  Premium Quality, Exceptional Value
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-pretty text-background/80">
                  Every product is carefully selected and quality-tested to ensure you receive only the best.
                </p>
                <Button asChild size="lg" variant="secondary" className="mt-8 gap-2">
                  <Link href="/products">
                    Explore Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="bg-card py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Trending Now
              </h2>
              <p className="mt-2 text-muted-foreground">
                What everyone is loving right now
              </p>
            </div>
            <Link 
              href="/products" 
              className="hidden items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground sm:flex"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trendingProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 flex justify-center sm:hidden">
            <Button asChild variant="outline">
              <Link href="/products">View All Trending</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Free Shipping",
                description: "On orders over $100"
              },
              {
                title: "Easy Returns",
                description: "30-day return policy"
              },
              {
                title: "Secure Payment",
                description: "100% secure checkout"
              },
              {
                title: "24/7 Support",
                description: "Dedicated support team"
              }
            ].map((feature) => (
              <div 
                key={feature.title}
                className="flex flex-col items-center rounded-xl bg-card p-6 text-center shadow-sm"
              >
                <h3 className="text-sm font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
