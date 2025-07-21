"use client"

import { useState, useEffect } from "react"
import type { ContactMessage } from "@/lib/supabase"

export function useMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/admin/messages")
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Non autorisé")
        }
        throw new Error("Failed to fetch messages")
      }
      const data = await response.json()
      setMessages(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const updateMessageStatus = async (id: string, status: ContactMessage["status"]) => {
    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!response.ok) throw new Error("Failed to update message")
      const updatedMessage = await response.json()
      setMessages((prev) => prev.map((m) => (m.id === id ? updatedMessage : m)))
      return updatedMessage
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to update message")
    }
  }

  const deleteMessage = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete message")
      setMessages((prev) => prev.filter((m) => m.id !== id))
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to delete message")
    }
  }

  return {
    messages,
    loading,
    error,
    fetchMessages,
    updateMessageStatus,
    deleteMessage,
  }
}
