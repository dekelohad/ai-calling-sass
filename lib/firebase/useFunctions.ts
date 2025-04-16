import { useState } from 'react'
import { httpsCallable } from 'firebase/functions'
import { useFirebase } from './FirebaseProvider'

export function useFunctions() {
  const { functions } = useFirebase()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const callFunction = async <T = any, R = any>(
    name: string,
    data?: T
  ): Promise<R | null> => {
    setLoading(true)
    setError(null)
    try {
      const functionRef = httpsCallable<T, R>(functions, name)
      const result = await functionRef(data)
      return result.data
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
    callFunction
  }
} 