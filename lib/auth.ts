"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store/auth-store'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/config'

export function useAuth() {
  const router = useRouter()
  const { user, isLoading } = useAuthStore()
  const setError = useAuthStore((state) => state.setError)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        const userData = {
          email: firebaseUser.email!,
          name: firebaseUser.displayName || firebaseUser.email!.split('@')[0]
        }
        useAuthStore.setState({ user: userData, isLoading: false })
        
        // Set auth token in cookies
        const token = await firebaseUser.getIdToken()
        document.cookie = `auth-token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; secure; samesite=strict`
      } else {
        // User is signed out
        useAuthStore.setState({ user: null, isLoading: false })
        document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      }
    })

    return () => unsubscribe()
  }, [])

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    ...useAuthStore((state) => ({
      login: state.login,
      register: state.register,
      logout: state.logout,
      resetPassword: state.resetPassword,
      error: state.error,
      setError: state.setError
    }))
  }
} 