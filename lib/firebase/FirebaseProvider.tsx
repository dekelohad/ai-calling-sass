"use client"

import { createContext, useContext, ReactNode, useEffect } from 'react'
import { Auth } from 'firebase/auth'
import { Firestore } from 'firebase/firestore'
import { FirebaseStorage } from 'firebase/storage'
import { Functions } from 'firebase/functions'
import { useAuthStore } from '@/lib/store/auth-store'

interface FirebaseContextType {
  auth: Auth
  db: Firestore
  storage: FirebaseStorage
  functions: Functions
}

const FirebaseContext = createContext<FirebaseContextType | null>(null)

interface FirebaseProviderProps {
  children: ReactNode
  auth: Auth
  db: Firestore
  storage: FirebaseStorage
  functions: Functions
}

export function FirebaseProvider({
  children,
  auth,
  db,
  storage,
  functions
}: FirebaseProviderProps) {
  const initializeAuth = useAuthStore(state => state.initializeAuth)

  useEffect(() => {
    const unsubscribe = initializeAuth()
    return () => unsubscribe()
  }, [initializeAuth])

  return (
    <FirebaseContext.Provider value={{ auth, db, storage, functions }}>
      {children}
    </FirebaseContext.Provider>
  )
}

export function useFirebase() {
  const context = useContext(FirebaseContext)
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider')
  }
  return context
} 