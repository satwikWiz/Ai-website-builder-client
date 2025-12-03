'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

const API_URL = typeof window !== 'undefined' 
  ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001')
  : 'http://localhost:3001'

export default function VariantsPage() {
  const params = useParams()
  const subdomain = params?.subdomain as string
  const [variants, setVariants] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (subdomain) {
      fetchVariants()
    }
  }, [subdomain])

  const fetchVariants = async () => {
    if (!subdomain) return
    try {
      const response = await fetch(`${API_URL}/api/variants/${subdomain}`)
      if (response.ok) {
        const data = await response.json()
        setVariants(data.variants || [])
      }
    } catch (error) {
      console.error('Failed to fetch variants:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading variants...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Variants for: {subdomain}
        </h1>

        {variants.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No variants found.</p>
            <Link
              href="/"
              className="text-blue-600 hover:underline"
            >
              Go back to create variants
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {variants.map((variant) => (
              <Link
                key={variant.id}
                href={`/editor/${variant.id}`}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {variant.name}
                </h2>
                <p className="text-gray-600 text-sm">
                  Click to edit this variant
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

