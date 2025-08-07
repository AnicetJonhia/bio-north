"use client"

import { useState, useEffect } from "react"
import type { ContactInfo } from "@/lib/supabase"

export function useContactInfo() {
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchContactInfo()
  }, [])

  const fetchContactInfo = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/admin/contact-info")
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Non autorisé")
        }
        throw new Error("Failed to fetch contact info")
      }
      const data = await response.json()
      setContactInfo(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const updateContactInfo = async (updates: { key: string; value: string }[]) => {



    try {
      const response = await fetch("/api/admin/contact-info", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates }),
      })
      if (!response.ok) throw new Error("Failed to update contact info")
      await fetchContactInfo() // Refresh data
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to update contact info")
    }
  }

  const getContactValue = (key: string) => {
    const item = contactInfo.find((info) => info.key === key)
    return item?.value || ""
  }

  return {
    contactInfo,
    loading,
    error,
    fetchContactInfo,
    updateContactInfo,
    getContactValue,
  }
}
