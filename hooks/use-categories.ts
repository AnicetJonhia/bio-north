"use client"

import { useState, useEffect } from "react"
import type { Category } from "@/lib/supabase"

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/categories")
      if (!response.ok) throw new Error("Failed to fetch categories")
      const data = await response.json()
      setCategories(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const createCategory = async (categoryData: Omit<Category, "id" | "created_at" | "updated_at">) => {
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryData),
      })
      if (!response.ok) throw new Error("Failed to create category")
      const newCategory = await response.json()
      setCategories((prev) => [newCategory, ...prev])
      return newCategory
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to create category")
    }
  }

  const updateCategory = async (id: string, updates: Partial<Category>) => {
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })
      if (!response.ok) throw new Error("Failed to update category")
      const updatedCategory = await response.json()
      setCategories((prev) => prev.map((c) => (c.id === id ? updatedCategory : c)))
      return updatedCategory
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to update category")
    }
  }

  const deleteCategory = async (id: string) => {
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete category")
      setCategories((prev) => prev.filter((c) => c.id !== id))
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to delete category")
    }
  }

  return {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  }
}
