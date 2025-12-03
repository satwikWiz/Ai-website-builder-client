'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import EditorProvider from '@/providers/editor/editor-provider'
import SimpleEditor from '@/components/SimpleEditor'

const API_URL = typeof window !== 'undefined' 
  ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001')
  : 'http://localhost:3001'

export default function EditorPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const variantId = params?.variantId as string
  const isPreview = searchParams?.get('preview') === 'true'
  const [variant, setVariant] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (variantId) {
      fetchVariant()
    }
  }, [variantId])

  const fetchVariant = async () => {
    if (!variantId) return
    try {
      const response = await fetch(`${API_URL}/api/variant/${variantId}`)
      if (response.ok) {
        const data = await response.json()
        setVariant(data.variant)
      }
    } catch (error) {
      console.error('Failed to fetch variant:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading editor...</div>
      </div>
    )
  }

  if (!variant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Variant not found</div>
      </div>
    )
  }

  return (
    <EditorProvider>
      <SimpleEditor variantId={variantId} initialElements={variant.elements} previewMode={isPreview} />
    </EditorProvider>
  )
}

