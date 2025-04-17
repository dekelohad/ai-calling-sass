import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  QueryConstraint,
  DocumentReference,
  CollectionReference
} from 'firebase/firestore'
import { db } from './config'
import { Business, PhoneNumber, Lead, Call, COLLECTIONS } from './collections'

// Generic type for all collection documents
type CollectionType = Business | PhoneNumber | Lead | Call

// Generic CRUD operations
export async function getDocument<T extends CollectionType>(
  collectionName: string,
  documentId: string
): Promise<T | null> {
  try {
    const docRef = doc(db, collectionName, documentId)
    const docSnap = await getDoc(docRef)
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as T : null
  } catch (error) {
    console.error('Error getting document:', error)
    throw error
  }
}

export async function getDocuments<T extends CollectionType>(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<T[]> {
  try {
    const collectionRef = collection(db, collectionName)
    const q = query(collectionRef, ...constraints)
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as T)
  } catch (error) {
    console.error('Error getting documents:', error)
    throw error
  }
}

export async function addDocument<T extends Omit<CollectionType, 'id'>>(
  collectionName: string,
  data: T
) {
  try {
    const collectionRef = collection(db, collectionName)
    const docRef = await addDoc(collectionRef, {
      ...data,
      createdAt: serverTimestamp()
    })
    return docRef.id
  } catch (error) {
    console.error('Error adding document:', error)
    throw error
  }
}

export async function updateDocument<T extends Partial<CollectionType>>(
  collectionName: string,
  documentId: string,
  data: T
) {
  try {
    const docRef = doc(db, collectionName, documentId)
    await updateDoc(docRef, data)
  } catch (error) {
    console.error('Error updating document:', error)
    throw error
  }
}

export async function deleteDocument(
  collectionName: string,
  documentId: string
) {
  try {
    const docRef = doc(db, collectionName, documentId)
    await deleteDoc(docRef)
  } catch (error) {
    console.error('Error deleting document:', error)
    throw error
  }
}

// Collection-specific operations

// Business operations
export async function getBusinessByOwner(ownerId: string): Promise<Business | null> {
  try {
    const businesses = await getDocuments<Business>(
      COLLECTIONS.BUSINESSES,
      [where('ownerId', '==', ownerId)]
    )
    return businesses[0] || null
  } catch (error) {
    console.error('Error getting business by owner:', error)
    throw error
  }
}

// Phone number operations
export async function getBusinessPhoneNumbers(businessId: string): Promise<PhoneNumber[]> {
  try {
    return await getDocuments<PhoneNumber>(
      COLLECTIONS.PHONE_NUMBERS,
      [where('businessId', '==', businessId)]
    )
  } catch (error) {
    console.error('Error getting business phone numbers:', error)
    throw error
  }
}

// Lead operations
export async function getBusinessLeads(
  businessId: string,
  verificationStatus?: Lead['verificationStatus']
): Promise<Lead[]> {
  try {
    const constraints: QueryConstraint[] = [where('businessId', '==', businessId)]
    if (verificationStatus) {
      constraints.push(where('verificationStatus', '==', verificationStatus))
    }
    return await getDocuments<Lead>(COLLECTIONS.LEADS, constraints)
  } catch (error) {
    console.error('Error getting business leads:', error)
    throw error
  }
}

// Call operations
export async function getBusinessCalls(
  businessId: string,
  status?: Call['status']
): Promise<Call[]> {
  try {
    const constraints: QueryConstraint[] = [where('businessId', '==', businessId)]
    if (status) {
      constraints.push(where('status', '==', status))
    }
    return await getDocuments<Call>(COLLECTIONS.CALLS, constraints)
  } catch (error) {
    console.error('Error getting business calls:', error)
    throw error
  }
} 