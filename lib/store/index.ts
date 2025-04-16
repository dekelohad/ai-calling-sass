import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { useAuthStore } from './auth-store'
import { useCallStore } from './call-store'
import { useUserStore } from './user-store'

// Export all stores
export { useAuthStore, useCallStore, useUserStore } 