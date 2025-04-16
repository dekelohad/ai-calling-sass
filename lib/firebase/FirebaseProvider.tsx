"use client"

import { createContext, useContext, ReactNode } from 'react'
import { Auth } from 'firebase/auth'
import { Firestore } from 'firebase/firestore'
import { FirebaseStorage } from 'firebase/storage'
import { Functions } from 'firebase/functions'

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