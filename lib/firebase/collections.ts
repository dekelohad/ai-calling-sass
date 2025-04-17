import { Timestamp } from 'firebase/firestore'

// Business hours type
export interface BusinessHours {
  [day: string]: {
    open: string
    close: string
  }
}

// Business collection type
export interface Business {
  id: string
  name: string
  ownerId: string
  createdAt: Timestamp
  businessHours: BusinessHours
  notificationPreferences: {
    email: boolean
    sms: boolean
  }
}

// Phone number collection type
export interface PhoneNumber {
  id: string
  businessId: string
  twilioNumber: string
  status: 'active' | 'inactive'
  createdAt: Timestamp
}

// Lead collection type
export interface Lead {
  id: string
  businessId: string
  phoneNumber: string
  name?: string
  email?: string
  notes?: string
  createdAt: Timestamp
  isSpam?: boolean
  spamScore?: number
  verificationStatus: 'pending' | 'verified' | 'rejected'
}

// Call collection type
export interface Call {
  id: string
  businessId: string
  phoneNumberId: string
  leadId?: string
  duration: number
  recordingUrl?: string
  transcription?: string
  isSpam: boolean
  status: 'ongoing' | 'completed' | 'failed'
  createdAt: Timestamp
  summary?: string
  aiAgentId?: string
  callQuality?: {
    latency?: number
    jitter?: number
    packetLoss?: number
  }
}

// Collection names as constants
export const COLLECTIONS = {
  BUSINESSES: 'businesses',
  PHONE_NUMBERS: 'phoneNumbers',
  LEADS: 'leads',
  CALLS: 'calls'
} as const

// Collection paths type
export type CollectionPath = typeof COLLECTIONS[keyof typeof COLLECTIONS] 