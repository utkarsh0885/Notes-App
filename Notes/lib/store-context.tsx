"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "./data"

export interface CartItem {
  product: Product
  quantity: number
}

interface StoreContextType {
  cart: CartItem[]
  wishlist: Product[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateCartQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  isInCart: (productId: string) => boolean
  moveToCart: (productId: string) => void
  cartTotal: number
  cartCount: number
  wishlistCount: number
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<Product[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    const savedWishlist = localStorage.getItem("wishlist")
    
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e)
      }
    }
    
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist))
      } catch (e) {
        console.error("Failed to parse wishlist from localStorage", e)
      }
    }
    
    setIsHydrated(true)
  }, [])

  // Save to localStorage when cart or wishlist changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("cart", JSON.stringify(cart))
    }
  }, [cart, isHydrated])

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("wishlist", JSON.stringify(wishlist))
    }
  }, [wishlist, isHydrated])

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.product.id === product.id)
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { product, quantity }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId))
  }

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const addToWishlist = (product: Product) => {
    setWishlist(prev => {
      if (prev.some(item => item.id === product.id)) {
        return prev
      }
      return [...prev, product]
    })
  }

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(item => item.id !== productId))
  }

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId)
  }

  const isInCart = (productId: string) => {
    return cart.some(item => item.product.id === productId)
  }

  const moveToCart = (productId: string) => {
    const product = wishlist.find(item => item.id === productId)
    if (product) {
      addToCart(product)
      removeFromWishlist(productId)
    }
  }

  const cartTotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  )

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0)

  const wishlistCount = wishlist.length

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        isInCart,
        moveToCart,
        cartTotal,
        cartCount,
        wishlistCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}
