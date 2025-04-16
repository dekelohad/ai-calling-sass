import { useState, useEffect } from 'react'
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  updateEmail,
  updatePassword
} from 'firebase/auth'
import { useFirebase } from './FirebaseProvider'

// Helper function to set auth token in cookies
function setAuthToken(user: User) {
  // Get the ID token
  user.getIdToken().then(token => {
    // Set the token in cookies
    document.cookie = `auth-token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; secure; samesite=strict`
  })
}

// Helper function to remove auth token from cookies
function removeAuthToken() {
  document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
}

export function useAuth() {
  const { auth } = useFirebase()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
      
      // Set or remove auth token based on user state
      if (user) {
        setAuthToken(user)
      } else {
        removeAuthToken()
      }
    })

    return () => unsubscribe()
  }, [auth])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      return result.user
    } catch (err) {
      setError(err as Error)
      return null
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      return result.user
    } catch (err) {
      setError(err as Error)
      return null
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    setError(null)
    try {
      await signOut(auth)
      return true
    } catch (err) {
      setError(err as Error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email: string) => {
    setLoading(true)
    setError(null)
    try {
      await sendPasswordResetEmail(auth, email)
      return true
    } catch (err) {
      setError(err as Error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const updateUserProfile = async (displayName?: string, photoURL?: string) => {
    if (!user) return false
    setLoading(true)
    setError(null)
    try {
      await updateProfile(user, { displayName, photoURL })
      return true
    } catch (err) {
      setError(err as Error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const updateUserEmail = async (newEmail: string) => {
    if (!user) return false
    setLoading(true)
    setError(null)
    try {
      await updateEmail(user, newEmail)
      return true
    } catch (err) {
      setError(err as Error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const updateUserPassword = async (newPassword: string) => {
    if (!user) return false
    setLoading(true)
    setError(null)
    try {
      await updatePassword(user, newPassword)
      return true
    } catch (err) {
      setError(err as Error)
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    logout,
    resetPassword,
    updateUserProfile,
    updateUserEmail,
    updateUserPassword
  }
} 