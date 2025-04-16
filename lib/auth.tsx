"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

// Hardcoded credentials for successful login
const VALID_EMAIL = "dekelohad@gmail.com"
const VALID_PASSWORD = "13467909"

type User = {
  email: string
  name: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>
  logout: () => void
  resetPassword: (email: string) => Promise<{ success: boolean; message?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      const user = { email, name: "Ohad Dekel" }
      setUser(user)
      localStorage.setItem("user", JSON.stringify(user))
      return { success: true }
    }

    return { success: false, message: "Invalid email or password" }
  }

  const register = async (name: string, email: string, password: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo purposes, we'll just check if the email is already taken
    if (email === VALID_EMAIL) {
      return { success: false, message: "Email already in use" }
    }

    // In a real app, you would create the user in your database
    // For this demo, we'll just log them in
    const user = { email, name }
    setUser(user)
    localStorage.setItem("user", JSON.stringify(user))

    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const resetPassword = async (email: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo purposes, we'll just check if the email exists
    if (email === VALID_EMAIL) {
      return { success: true, message: "Password reset link sent to your email" }
    }

    return { success: false, message: "Email not found" }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
