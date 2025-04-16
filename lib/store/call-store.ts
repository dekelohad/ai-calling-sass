"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CallState {
  isInCall: boolean
  currentCallId: string | null
  callDuration: number
  startCall: (callId: string) => void
  endCall: () => void
  updateCallDuration: (duration: number) => void
}

export const useCallStore = create<CallState>()(
  persist(
    (set) => ({
      isInCall: false,
      currentCallId: null,
      callDuration: 0,
      
      startCall: (callId) => set({ 
        isInCall: true, 
        currentCallId: callId,
        callDuration: 0
      }),
      
      endCall: () => set({ 
        isInCall: false, 
        currentCallId: null,
        callDuration: 0
      }),
      
      updateCallDuration: (duration) => set({ callDuration: duration })
    }),
    {
      name: 'call-storage',
      partialize: (state) => ({ 
        isInCall: state.isInCall,
        currentCallId: state.currentCallId,
        callDuration: state.callDuration
      }),
    }
  )
) 