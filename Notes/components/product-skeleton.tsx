import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface ProductSkeletonProps {
  className?: string
}

export function ProductSkeleton({ className }: ProductSkeletonProps) {
  return (
    <Card className={cn("overflow-hidden border-0 bg-card shadow-sm", className)}>
      <div className="aspect-square">
        <Skeleton className="h-full w-full" />
      </div>
      <CardContent className="p-4">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="mt-2 h-4 w-full" />
        <Skeleton className="mt-2 h-3 w-24" />
        <Skeleton className="mt-2 h-5 w-20" />
      </CardContent>
    </Card>
  )
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  )
}
