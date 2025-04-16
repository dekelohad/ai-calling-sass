import { useState, useEffect } from 'react'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  DocumentData,
  QueryConstraint
} from 'firebase/firestore'
import { useFirebase } from './FirebaseProvider'

export function useFirestore() {
  const { db } = useFirebase()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const getDocument = async <T>(
    collectionName: string,
    documentId: string
  ): Promise<T | null> => {
    setLoading(true)
    setError(null)
    try {
      const docRef = doc(db, collectionName, documentId)
      const docSnap = await getDoc(docRef)
      return docSnap.exists() ? (docSnap.data() as T) : null
    } catch (err) {
      setError(err as Error)
      return null
    } finally {
      setLoading(false)
    }
  }

  const getDocuments = async <T>(
    collectionName: string,
    constraints: QueryConstraint[] = []
  ): Promise<T[]> => {
    setLoading(true)
    setError(null)
    try {
      const q = query(collection(db, collectionName), ...constraints)
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as T[]
    } catch (err) {
      setError(err as Error)
      return []
    } finally {
      setLoading(false)
    }
  }

  const addDocument = async <T>(
    collectionName: string,
    data: DocumentData
  ): Promise<string | null> => {
    setLoading(true)
    setError(null)
    try {
      const docRef = await addDoc(collection(db, collectionName), data)
      return docRef.id
    } catch (err) {
      setError(err as Error)
      return null
    } finally {
      setLoading(false)
    }
  }

  const updateDocument = async (
    collectionName: string,
    documentId: string,
    data: DocumentData
  ): Promise<boolean> => {
    setLoading(true)
    setError(null)
    try {
      const docRef = doc(db, collectionName, documentId)
      await updateDoc(docRef, data)
      return true
    } catch (err) {
      setError(err as Error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const deleteDocument = async (
    collectionName: string,
    documentId: string
  ): Promise<boolean> => {
    setLoading(true)
    setError(null)
    try {
      const docRef = doc(db, collectionName, documentId)
      await deleteDoc(docRef)
      return true
    } catch (err) {
      setError(err as Error)
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    getDocument,
    getDocuments,
    addDocument,
    updateDocument,
    deleteDocument
  }
} 