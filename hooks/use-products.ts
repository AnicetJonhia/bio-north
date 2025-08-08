"use client"

import { useState, useEffect } from "react"
import type { Product } from "@/lib/supabase"

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/products")
      if (!response.ok) throw new Error("Failed to fetch products")
      const data = await response.json()
      setProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const createProduct = async (productData: Omit<Product, "id" | "created_at" | "updated_at">) => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      })
      if (!response.ok) throw new Error("Failed to create product")
      const newProduct = await response.json()
      setProducts((prev) => [newProduct, ...prev])
      return newProduct
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to create product")
    }
  }

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })
      if (!response.ok) throw new Error("Failed to update product")
      const updatedProduct = await response.json()
      setProducts((prev) => prev.map((p) => (p.id === id ? updatedProduct : p)))
      return updatedProduct
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to update product")
    }
  }

  const deleteProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete product")
      setProducts((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to delete product")
    }
  }

  const searchProducts = async (query?: string, category?: string) => {
    try {

      const params = new URLSearchParams()
      if (query) params.append("q", query)
      if (category && category !== "all") params.append("category", category)

      const response = await fetch(`/api/products/search?${params}`)
      if (!response.ok) throw new Error("Failed to search products")
      const data = await response.json()
      setProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed")
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
  }
}
