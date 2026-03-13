"use client"

import { useState, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ProductCard } from "@/components/product-card"
import { ProductGridSkeleton } from "@/components/product-skeleton"
import { products, categories, searchProducts } from "@/lib/data"

function ProductListingContent() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search") || ""
  const categoryParam = searchParams.get("category") || ""
  const featuredParam = searchParams.get("featured") === "true"

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  )
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const maxPrice = Math.max(...products.map((p) => p.price))

  const filteredProducts = useMemo(() => {
    let result = searchQuery ? searchProducts(searchQuery) : [...products]

    if (featuredParam) {
      result = result.filter((p) => p.featured)
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category))
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    )

    return result
  }, [searchQuery, selectedCategories, priceRange, featuredParam])

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setSelectedCategories((prev) =>
      checked
        ? [...prev, categoryId]
        : prev.filter((id) => id !== categoryId)
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, maxPrice])
  }

  const hasActiveFilters = selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < maxPrice

  const FilterContent = () => (
    <div className="flex flex-col gap-6">
      {/* Categories */}
      <div>
        <h3 className="mb-4 text-sm font-semibold text-foreground">Categories</h3>
        <div className="flex flex-col gap-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center gap-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category.id, checked as boolean)
                }
              />
              <Label
                htmlFor={`category-${category.id}`}
                className="flex-1 cursor-pointer text-sm font-normal text-foreground"
              >
                {category.name}
              </Label>
              <span className="text-xs text-muted-foreground">
                {category.productCount}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="mb-4 text-sm font-semibold text-foreground">Price Range</h3>
        <div className="px-1">
          <Slider
            value={priceRange}
            min={0}
            max={maxPrice}
            step={10}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="mb-4"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="outline" size="sm" onClick={clearFilters} className="gap-2">
          <X className="h-4 w-4" />
          Clear Filters
        </Button>
      )}
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {searchQuery
            ? `Search results for "${searchQuery}"`
            : featuredParam
            ? "Featured Products"
            : "All Products"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
        </p>
      </div>

      <div className="flex gap-8 lg:gap-12">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24">
            <h2 className="mb-6 text-lg font-semibold text-foreground">Filters</h2>
            <FilterContent />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile Filter Button */}
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {hasActiveFilters && (
                    <span className="ml-1 rounded-full bg-foreground px-1.5 py-0.5 text-xs text-background">
                      {selectedCategories.length + (priceRange[0] > 0 || priceRange[1] < maxPrice ? 1 : 0)}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="rounded-full bg-muted p-4">
                <SlidersHorizontal className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">No products found</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Try adjusting your filters or search term to find what you are looking for.
              </p>
              <Button variant="outline" className="mt-6" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-8">
          <div className="h-8 w-48 animate-pulse rounded bg-muted" />
          <div className="mt-2 h-5 w-32 animate-pulse rounded bg-muted" />
        </div>
        <ProductGridSkeleton count={6} />
      </div>
    }>
      <ProductListingContent />
    </Suspense>
  )
}
