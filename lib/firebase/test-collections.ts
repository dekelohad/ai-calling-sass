import { Timestamp } from 'firebase/firestore'
import { Business, PhoneNumber, Lead, Call, COLLECTIONS } from './collections'
import { addDocument } from './firestore'

// Test data for creating a business
export async function createTestBusiness(ownerId: string): Promise<string> {
  const businessData: Omit<Business, 'id'> = {
    name: 'Test Business',
    ownerId,
    createdAt: Timestamp.now(),
    businessHours: {
      monday: { open: '09:00', close: '17:00' },
      tuesday: { open: '09:00', close: '17:00' },
      wednesday: { open: '09:00', close: '17:00' },
      thursday: { open: '09:00', close: '17:00' },
      friday: { open: '09:00', close: '17:00' }
    },
    notificationPreferences: {
      email: true,
      sms: true
    }
  }

  return await addDocument(COLLECTIONS.BUSINESSES, businessData)
}

// Test data for creating a phone number
export async function createTestPhoneNumber(businessId: string): Promise<string> {
  const phoneNumberData: Omit<PhoneNumber, 'id'> = {
    businessId,
    twilioNumber: '+1234567890',
    status: 'active',
    createdAt: Timestamp.now()
  }

  return await addDocument(COLLECTIONS.PHONE_NUMBERS, phoneNumberData)
}

// Test data for creating a lead
export async function createTestLead(businessId: string, phoneNumber: string): Promise<string> {
  const leadData: Omit<Lead, 'id'> = {
    businessId,
    phoneNumber,
    name: 'Test Lead',
    email: 'test@example.com',
    notes: 'Test lead notes',
    createdAt: Timestamp.now(),
    isSpam: false,
    spamScore: 0.1,
    verificationStatus: 'pending'
  }

  return await addDocument(COLLECTIONS.LEADS, leadData)
}

// Test data for creating a call
export async function createTestCall(
  businessId: string,
  phoneNumberId: string,
  leadId?: string
): Promise<string> {
  const callData: Omit<Call, 'id'> = {
    businessId,
    phoneNumberId,
    leadId,
    duration: 120,
    recordingUrl: 'https://example.com/recording.mp3',
    transcription: 'Test call transcription',
    isSpam: false,
    status: 'completed',
    createdAt: Timestamp.now(),
    summary: 'Test call summary',
    aiAgentId: 'test-agent-id',
    callQuality: {
      latency: 100,
      jitter: 20,
      packetLoss: 0.1
    }
  }

  return await addDocument(COLLECTIONS.CALLS, callData)
}

// Function to create all test data
export async function createAllTestData(ownerId: string) {
  try {
    // Create test business
    const businessId = await createTestBusiness(ownerId)
    console.log('Created test business:', businessId)

    // Create test phone number
    const phoneNumberId = await createTestPhoneNumber(businessId)
    console.log('Created test phone number:', phoneNumberId)

    // Create test lead
    const leadId = await createTestLead(businessId, '+1234567890')
    console.log('Created test lead:', leadId)

    // Create test call
    const callId = await createTestCall(businessId, phoneNumberId, leadId)
    console.log('Created test call:', callId)

    return {
      businessId,
      phoneNumberId,
      leadId,
      callId
    }
  } catch (error) {
    console.error('Error creating test data:', error)
    throw error
  }
} 