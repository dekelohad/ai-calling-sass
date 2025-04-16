"use client"

import { ReactNode } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { FirebaseProvider } from "@/lib/firebase/FirebaseProvider"
import { auth, db, storage, functions } from "@/lib/firebase/config"

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <FirebaseProvider
        auth={auth}
        db={db}
        storage={storage}
        functions={functions}
      >
        {children}
      </FirebaseProvider>
    </ThemeProvider>
  )
} 