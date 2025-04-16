"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth"
import { AuthLayout } from "@/components/auth-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      const result = await resetPassword(email)
      if (result.success) {
        setSuccess(result.message || "Password reset link sent to your email")
      } else {
        setError(result.message || "Failed to send reset link")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Forgot your password?</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        {success && (
          <Alert className="bg-green-50 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Email address</Label>
            <div className="mt-1">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full"
              />
            </div>
          </div>

          {error && <div className="text-sm text-destructive">{error}</div>}

          <div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Send reset link
            </Button>
          </div>

          <div className="text-center text-sm">
            <Link href="/login" className="font-medium text-primary hover:text-primary/90 transition-colors">
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}
