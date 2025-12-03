'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import EditorProvider from '@/providers/editor/editor-provider'
import SimpleEditor from '@/components/SimpleEditor'

const API_URL = typeof window !== 'undefined' 
  ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001')
  : 'http://localhost:3001'

export default function SubdomainPage() {
  const params = useParams()
  const subdomain = params?.subdomain as string
  const [variant, setVariant] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (subdomain) {
      fetchVariant()
    }
  }, [subdomain])

  const fetchVariant = async () => {
    if (!subdomain) return
    try {
      // Get all variants for this subdomain
      const response = await fetch(`${API_URL}/api/variants/${subdomain}`)
      if (response.ok) {
        const data = await response.json()
        // Use the first variant (or you can implement variant selection)
        const firstVariant = data.variants?.[0]
        if (firstVariant) {
          // Fetch the full variant data
          const variantResponse = await fetch(`${API_URL}/api/variant/${firstVariant.id}`)
          if (variantResponse.ok) {
            const variantData = await variantResponse.json()
            setVariant(variantData.variant)
          }
        }
      }
    } catch (error) {
      console.error('Failed to fetch variant:', error)
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

  if (!variant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold text-foreground">Website not found</h1>
          <p className="text-muted-foreground">
            No variant found for subdomain: <strong>{subdomain}</strong>
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

