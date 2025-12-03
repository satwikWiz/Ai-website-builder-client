'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import EditorProvider from '@/providers/editor/editor-provider'
import SimpleEditor from '@/components/SimpleEditor'

// Get API URL - use relative URL in production if same domain, otherwise use env var
const getApiUrl = () => {
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
  }
  
  // In production, if API is on same domain, use relative URL
  const envUrl = process.env.NEXT_PUBLIC_API_URL
  if (envUrl && !envUrl.includes('localhost')) {
    return envUrl
  }
  
  // Fallback to localhost for development
  return 'http://localhost:3001'
}

const API_URL = getApiUrl()

export default function SubdomainPage() {
  const params = useParams()
  const subdomain = params?.subdomain as string
  const [variant, setVariant] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (subdomain) {
      fetchVariant()
    } else {
      setLoading(false)
      setError('No subdomain provided')
    }
  }, [subdomain])

  const fetchVariant = async () => {
    if (!subdomain) {
      setLoading(false)
      return
    }
    
    try {
      // Get all variants for this subdomain
      const response = await fetch(`${API_URL}/api/variants/${encodeURIComponent(subdomain)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (response.ok) {
        const data = await response.json()
        // Use the first variant (or you can implement variant selection)
        const firstVariant = data.variants?.[0]
        if (firstVariant && firstVariant.id) {
          // Fetch the full variant data
          const variantResponse = await fetch(`${API_URL}/api/variant/${firstVariant.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          
          if (variantResponse.ok) {
            const variantData = await variantResponse.json()
            if (variantData.variant) {
              setVariant(variantData.variant)
            }
          }
        }
      } else {
        const errorText = await response.text().catch(() => 'Unknown error')
        console.error('Failed to fetch variants:', response.status, response.statusText, errorText)
        setError(`Failed to load website: ${response.status} ${response.statusText}`)
      }
    } catch (error: any) {
      console.error('Failed to fetch variant:', error)
      setError(error?.message || 'Failed to load website. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-xl text-foreground">Loading website...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4 max-w-md px-4">
          <h1 className="text-2xl font-semibold text-foreground">Error</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  if (!variant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4 max-w-md px-4">
          <h1 className="text-2xl font-semibold text-foreground">Website not found</h1>
          <p className="text-muted-foreground">
            No variant found for subdomain: <strong>{subdomain}</strong>
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Make sure you have generated variants for this domain in the flow editor.
          </p>
        </div>
      </div>
    )
  }

  return (
    <EditorProvider>
      <SimpleEditor 
        variantId={variant.id} 
        initialElements={variant.elements} 
        previewMode={true}
        hidePreviewIcon={true}
      />
    </EditorProvider>
  )
}

