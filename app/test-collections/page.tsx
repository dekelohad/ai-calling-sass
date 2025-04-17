'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/firebase/useAuth'
import { createAllTestData } from '@/lib/firebase/test-collections'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

export default function TestCollectionsPage() {
  const { user, loading } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [testResults, setTestResults] = useState<{
    businessId?: string
    phoneNumberId?: string
    leadId?: string
    callId?: string
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCreateTestData = async () => {
    if (!user) {
      setError('You must be logged in to create test data')
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      const results = await createAllTestData(user.uid)
      setTestResults(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">Loading...</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Test Firestore Collections</CardTitle>
          <CardDescription>
            Create test data in all collections to verify the setup
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!user ? (
            <Alert className="bg-destructive/15 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Authentication Required</AlertTitle>
              <AlertDescription>
                You must be logged in to create test data. Please sign in first.
              </AlertDescription>
            </Alert>
          ) : (
            <Button
              onClick={handleCreateTestData}
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Test Data'}
            </Button>
          )}

          {error && (
            <Alert className="mt-4 bg-destructive/15 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {testResults && (
            <div className="mt-4 space-y-2">
              <h3 className="font-semibold">Created Documents:</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
                {JSON.stringify(testResults, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 