import { useState } from 'react'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage'
import { useFirebase } from './FirebaseProvider'

export function useStorage() {
  const { storage } = useFirebase()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const uploadFile = async (
    path: string,
    file: File
  ): Promise<string | null> => {
    setLoading(true)
    setError(null)
    try {
      const storageRef = ref(storage, path)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      return url
    } catch (err) {
      setError(err as Error)
      return null
    } finally {
      setLoading(false)
    }
  }

  const deleteFile = async (path: string): Promise<boolean> => {
    setLoading(true)
    setError(null)
    try {
      const storageRef = ref(storage, path)
      await deleteObject(storageRef)
      return true
    } catch (err) {
      setError(err as Error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const getFileUrl = async (path: string): Promise<string | null> => {
    setLoading(true)
    setError(null)
    try {
      const storageRef = ref(storage, path)
      const url = await getDownloadURL(storageRef)
      return url
    } catch (err) {
      setError(err as Error)
      return null
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    uploadFile,
    deleteFile,
    getFileUrl
  }
} 