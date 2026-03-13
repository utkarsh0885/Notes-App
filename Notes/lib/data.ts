export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  category: string
  rating: number
  reviews: number
  inStock: boolean
  featured?: boolean
  trending?: boolean
}

export interface Category {
  id: string
  name: string
  image: string
  productCount: number
}

export const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
    productCount: 156
  },
  {
    id: "fashion",
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
    productCount: 243
  },
  {
    id: "home",
    name: "Home & Living",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    productCount: 89
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    productCount: 178
  }
]

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort cushions for extended listening sessions.",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop"
    ],
    category: "electronics",
    rating: 4.8,
    reviews: 1247,
    inStock: true,
    featured: true,
    trending: true
  },
  {
    id: "2",
    name: "Minimalist Watch",
    description: "Elegant timepiece with a clean, minimalist design. Japanese quartz movement, sapphire crystal glass, and genuine leather strap. Water resistant up to 50 meters.",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=600&fit=crop"
    ],
    category: "accessories",
    rating: 4.6,
    reviews: 892,
    inStock: true,
    featured: true
  },
  {
    id: "3",
    name: "Smart Home Speaker",
    description: "Voice-controlled smart speaker with premium 360-degree sound. Built-in smart assistant, multi-room audio support, and seamless smart home integration.",
    price: 149.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1543512214-318c7553f230?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=600&h=600&fit=crop"
    ],
    category: "electronics",
    rating: 4.5,
    reviews: 2341,
    inStock: true,
    trending: true
  },
  {
    id: "4",
    name: "Designer Sunglasses",
    description: "Premium polarized sunglasses with titanium frame. UV400 protection, anti-reflective coating, and includes premium leather case.",
    price: 245.00,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=600&fit=crop"
    ],
    category: "accessories",
    rating: 4.7,
    reviews: 567,
    inStock: true,
    featured: true
  },
  {
    id: "5",
    name: "Leather Laptop Bag",
    description: "Handcrafted full-grain leather laptop bag. Fits up to 15\" laptops, multiple compartments, and adjustable shoulder strap. Perfect for professionals.",
    price: 329.99,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop"
    ],
    category: "accessories",
    rating: 4.9,
    reviews: 423,
    inStock: true,
    trending: true
  },
  {
    id: "6",
    name: "Wireless Earbuds Pro",
    description: "True wireless earbuds with active noise cancellation. Premium sound quality, touch controls, and 8-hour battery life with wireless charging case.",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&h=600&fit=crop"
    ],
    category: "electronics",
    rating: 4.7,
    reviews: 3156,
    inStock: true,
    featured: true
  },
  {
    id: "7",
    name: "Modern Desk Lamp",
    description: "Adjustable LED desk lamp with touch controls. Multiple brightness levels, color temperature adjustment, and USB charging port. Perfect for home office.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=600&fit=crop"
    ],
    category: "home",
    rating: 4.4,
    reviews: 678,
    inStock: true
  },
  {
    id: "8",
    name: "Premium Backpack",
    description: "Water-resistant travel backpack with anti-theft features. Padded laptop compartment, hidden pockets, and USB charging port. Perfect for daily commute or travel.",
    price: 159.99,
    originalPrice: 189.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&h=600&fit=crop"
    ],
    category: "accessories",
    rating: 4.6,
    reviews: 1892,
    inStock: true,
    trending: true
  },
  {
    id: "9",
    name: "Ceramic Vase Set",
    description: "Set of 3 handcrafted ceramic vases in varying sizes. Modern minimalist design, perfect for fresh or dried flowers. Adds elegance to any room.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=600&h=600&fit=crop"
    ],
    category: "home",
    rating: 4.3,
    reviews: 234,
    inStock: true
  },
  {
    id: "10",
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracker with heart rate monitoring, GPS, and sleep tracking. Water-resistant design, 7-day battery life, and comprehensive health insights.",
    price: 279.99,
    originalPrice: 349.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&h=600&fit=crop"
    ],
    category: "electronics",
    rating: 4.8,
    reviews: 4521,
    inStock: true,
    featured: true,
    trending: true
  },
  {
    id: "11",
    name: "Cashmere Scarf",
    description: "Luxuriously soft 100% cashmere scarf. Lightweight yet warm, perfect for all seasons. Available in classic neutral tones.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1601379329542-31c59347e2b8?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1601379329542-31c59347e2b8?w=600&h=600&fit=crop"
    ],
    category: "fashion",
    rating: 4.5,
    reviews: 312,
    inStock: true
  },
  {
    id: "12",
    name: "Portable Charger",
    description: "High-capacity 20000mAh portable charger with fast charging support. Dual USB ports, LED display, and compact design for on-the-go power.",
    price: 49.99,
    originalPrice: 69.99,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&h=600&fit=crop"
    ],
    category: "electronics",
    rating: 4.4,
    reviews: 2789,
    inStock: true
  }
]

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id)
}

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category)
}

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured)
}

export const getTrendingProducts = (): Product[] => {
  return products.filter(product => product.trending)
}

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(
    product =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
  )
}
