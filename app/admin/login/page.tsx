"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Leaf, LogIn } from "lucide-react"
import { login } from "@/lib/auth"
import { useLanguage } from "@/contexts/language-context"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { t } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const result = await login(email, password)
      if (result.success) {
        router.push("/admin")
      } else {
        setError(result.error || t.admin.login.error)
      }
    } catch (err) {
      setError(t.admin.login.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mx-auto mb-4">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Bio North Madagascar</h2>
          <p className="mt-2 text-gray-600">{t.admin.login.description}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">{t.admin.login.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div>
                <Label htmlFor="email">{t.admin.login.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                  placeholder="admin@bionorthmadagascar.mg"
                />
              </div>

              <div>
                <Label htmlFor="password">{t.admin.login.password}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
                <LogIn className="w-4 h-4 mr-2" />
                {loading ? t.common.loading : t.admin.login.login}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>Identifiants de démonstration :</p>
              <p>Email: admin@bionorthmadagascar.mg</p>
              <p>Mot de passe: BioNorth2025!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
