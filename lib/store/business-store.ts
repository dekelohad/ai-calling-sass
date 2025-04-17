import { db } from "../firebase/config"
import { doc, getDoc, setDoc, updateDoc, Timestamp } from "firebase/firestore"
import { create } from "zustand"
import { Business, BusinessHours as CollectionBusinessHours } from "../firebase/collections"

export interface BusinessHours {
  monday: { start: string; end: string; isOpen: boolean }
  tuesday: { start: string; end: string; isOpen: boolean }
  wednesday: { start: string; end: string; isOpen: boolean }
  thursday: { start: string; end: string; isOpen: boolean }
  friday: { start: string; end: string; isOpen: boolean }
  saturday: { start: string; end: string; isOpen: boolean }
  sunday: { start: string; end: string; isOpen: boolean }
}

export interface NotificationPreferences {
  email: boolean
  sms: boolean
  emailAddress?: string
  phoneNumber?: string
}

export interface BusinessProfile {
  id: string
  ownerId: string
  name: string
  description: string
  industry: string
  website?: string
  address?: string
  businessHours: BusinessHours
  notificationPreferences: NotificationPreferences
  createdAt: Date
  updatedAt: Date
}

interface BusinessStore {
  businessProfile: BusinessProfile | null
  isLoading: boolean
  error: string | null
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setBusinessProfile: (profile: BusinessProfile) => void
  fetchBusinessProfile: (userId: string) => Promise<void>
  updateBusinessProfile: (userId: string, profile: Partial<BusinessProfile>) => Promise<void>
}

function convertTimestampsToDates(data: any): any {
  if (!data) return data
  
  const converted = { ...data }
  if (data.createdAt instanceof Timestamp) {
    converted.createdAt = data.createdAt.toDate()
  }
  if (data.updatedAt instanceof Timestamp) {
    converted.updatedAt = data.updatedAt.toDate()
  }
  return converted
}

function convertDatesToTimestamps(data: any): any {
  if (!data) return data
  
  const converted = { ...data }
  if (data.createdAt instanceof Date) {
    converted.createdAt = Timestamp.fromDate(data.createdAt)
  }
  if (data.updatedAt instanceof Date) {
    converted.updatedAt = Timestamp.fromDate(data.updatedAt)
  }
  return converted
}

export const useBusinessStore = create<BusinessStore>((set, get) => ({
  businessProfile: null,
  isLoading: false,
  error: null,

  setLoading: (loading: boolean) => set({ isLoading: loading }),
  
  setError: (error: string | null) => set({ error }),
  
  setBusinessProfile: (profile: BusinessProfile) => set({ businessProfile: profile }),

  fetchBusinessProfile: async (userId: string) => {
    try {
      set({ isLoading: true, error: null })
      
      const businessRef = doc(db, "businesses", userId)
      const businessDoc = await getDoc(businessRef)
      
      if (businessDoc.exists()) {
        const data = businessDoc.data()
        const profile = convertTimestampsToDates(data) as BusinessProfile
        
        // Ensure the profile has all required fields
        if (!profile.ownerId) {
          profile.ownerId = userId
        }
        
        // Set default values for missing fields
        if (!profile.description) profile.description = ""
        if (!profile.industry) profile.industry = ""
        if (!profile.website) profile.website = ""
        if (!profile.address) profile.address = ""
        
        // Convert business hours format if needed
        if (profile.businessHours) {
          // Ensure the business hours have the correct format
          const defaultHours = {
            monday: { start: "09:00", end: "17:00", isOpen: true },
            tuesday: { start: "09:00", end: "17:00", isOpen: true },
            wednesday: { start: "09:00", end: "17:00", isOpen: true },
            thursday: { start: "09:00", end: "17:00", isOpen: true },
            friday: { start: "09:00", end: "17:00", isOpen: true },
            saturday: { start: "09:00", end: "17:00", isOpen: false },
            sunday: { start: "09:00", end: "17:00", isOpen: false },
          }
          
          // Check if the business hours are in the old format
          const isOldFormat = Object.keys(profile.businessHours).some(key => 
            key === 'monday' && 'open' in (profile.businessHours as any).monday
          )
          
          if (isOldFormat) {
            // Convert from old format to new format
            const newBusinessHours = { ...defaultHours }
            Object.keys(profile.businessHours).forEach(day => {
              if (day in newBusinessHours) {
                const typedDay = day as keyof BusinessHours
                newBusinessHours[typedDay] = {
                  start: (profile.businessHours as any)[day].open,
                  end: (profile.businessHours as any)[day].close,
                  isOpen: true
                }
              }
            })
            profile.businessHours = newBusinessHours
          } else {
            // Ensure all days are present
            profile.businessHours = { ...defaultHours, ...profile.businessHours }
          }
        } else {
          profile.businessHours = {
            monday: { start: "09:00", end: "17:00", isOpen: true },
            tuesday: { start: "09:00", end: "17:00", isOpen: true },
            wednesday: { start: "09:00", end: "17:00", isOpen: true },
            thursday: { start: "09:00", end: "17:00", isOpen: true },
            friday: { start: "09:00", end: "17:00", isOpen: true },
            saturday: { start: "09:00", end: "17:00", isOpen: false },
            sunday: { start: "09:00", end: "17:00", isOpen: false },
          }
        }
        
        // Ensure notification preferences are set
        if (!profile.notificationPreferences) {
          profile.notificationPreferences = {
            email: true,
            sms: false,
            emailAddress: "",
            phoneNumber: "",
          }
        }
        
        set({ businessProfile: profile })
      } else {
        set({ businessProfile: null })
      }
    } catch (error) {
      console.error("Error fetching business profile:", error)
      set({ error: error instanceof Error ? error.message : "Failed to fetch business profile" })
    } finally {
      set({ isLoading: false })
    }
  },

  updateBusinessProfile: async (userId: string, profile: Partial<BusinessProfile>) => {
    try {
      console.log("Starting business profile update for user:", userId)
      set({ isLoading: true, error: null })
      
      const businessRef = doc(db, "businesses", userId)
      const businessDoc = await getDoc(businessRef)
      
      let updatedProfile: BusinessProfile
      
      if (businessDoc.exists()) {
        console.log("Updating existing business profile")
        const updateData = {
          ...convertDatesToTimestamps(profile),
          ownerId: userId,
          updatedAt: Timestamp.now()
        }
        
        await updateDoc(businessRef, updateData)
        
        const currentProfile = get().businessProfile
        updatedProfile = {
          ...currentProfile!,
          ...profile,
          ownerId: userId,
          updatedAt: new Date()
        } as BusinessProfile
      } else {
        console.log("Creating new business profile")
        updatedProfile = {
          ...profile,
          id: userId,
          ownerId: userId,
          createdAt: new Date(),
          updatedAt: new Date()
        } as BusinessProfile
        
        const firestoreData = convertDatesToTimestamps(updatedProfile)
        console.log("Saving new profile to Firestore:", firestoreData)
        await setDoc(businessRef, firestoreData)
      }
      
      console.log("Setting updated profile in store:", updatedProfile)
      set({ businessProfile: updatedProfile })
    } catch (error) {
      console.error("Error updating business profile:", error)
      set({ error: error instanceof Error ? error.message : "Failed to update business profile" })
      throw error // Re-throw to handle in the component
    } finally {
      set({ isLoading: false })
    }
  }
})) 