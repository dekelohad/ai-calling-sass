"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from 'firebase/auth'
import { auth } from '../firebase/config'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth'

interface UserData {
  email: string
  name: string
}

interface AuthState {
  user: UserData | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<{ success: boolean; message?: string }>
  setError: (error: string | null) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,
      
      setError: (error) => set({ error }),
      
      login: async (email, password) => {
        set({ isLoading: true, error: null })
        
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password)
          const firebaseUser = userCredential.user
          
          // Get user display name or use email as fallback
          const name = firebaseUser.displayName || email.split('@')[0]
          
          const user = { email, name }
          set({ user, isLoading: false })
          
          // Set auth token in cookies for middleware
          const token = await firebaseUser.getIdToken()
          document.cookie = `auth-token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; secure; samesite=strict`
          
          return { success: true }
        } catch (error: any) {
          console.error("Login error:", error)
          let errorMessage = "An error occurred during login"
          
          switch (error.code) {
            case 'auth/invalid-credential':
              errorMessage = "Invalid email or password"
              break
            case 'auth/user-not-found':
              errorMessage = "No account found with this email"
              break
            case 'auth/wrong-password':
              errorMessage = "Incorrect password"
              break
            case 'auth/too-many-requests':
              errorMessage = "Too many failed attempts. Please try again later"
              break
            case 'auth/user-disabled':
              errorMessage = "This account has been disabled"
              break
          }
          
          set({ error: errorMessage, isLoading: false })
          return { success: false, message: errorMessage }
        }
      },
      
      register: async (name, email, password) => {
        set({ isLoading: true, error: null })
        
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password)
          const firebaseUser = userCredential.user
          
          // Update the user's display name
          await updateProfile(firebaseUser, { displayName: name })
          
          const user = { email, name }
          set({ user, isLoading: false })
          
          // Set auth token in cookies for middleware
          const token = await firebaseUser.getIdToken()
          document.cookie = `auth-token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; secure; samesite=strict`
          
          return { success: true }
        } catch (error: any) {
          console.error("Registration error:", error)
          const errorMessage = error.code === 'auth/email-already-in-use' 
            ? "Email already in use" 
            : "An error occurred during registration"
          
          set({ error: errorMessage, isLoading: false })
          return { success: false, message: errorMessage }
        }
      },
      
      logout: async () => {
        set({ isLoading: true, error: null })
        
        try {
          await signOut(auth)
          set({ user: null, isLoading: false })
          
          // Remove auth token from cookies
          document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
        } catch (error) {
          console.error("Logout error:", error)
          set({ error: "An error occurred during logout", isLoading: false })
        }
      },
      
      resetPassword: async (email) => {
        set({ isLoading: true, error: null })
        
        try {
          await sendPasswordResetEmail(auth, email)
          set({ isLoading: false })
          return { success: true, message: "Password reset link sent to your email" }
        } catch (error: any) {
          console.error("Password reset error:", error)
          const errorMessage = error.code === 'auth/user-not-found' 
            ? "Email not found" 
            : "An error occurred while sending the reset email"
          
          set({ error: errorMessage, isLoading: false })
          return { success: false, message: errorMessage }
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
) 