'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import EditorProvider from '@/providers/editor/editor-provider'
import SimpleEditor from '@/components/SimpleEditor'
import { ExternalLink, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const API_URL = typeof window !== 'undefined' 
  ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001')
  : 'http://localhost:3001'

const getBaseDomain = () => {
  if (typeof window === 'undefined') return 'localhost:4000'
  const hostname = window.location.hostname
  const port = window.location.port ? `:${window.location.port}` : ''
  
  // For localhost, use subdomain.localhost format
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `localhost${port}`
  }
  
  // For production, use the domain from env or current host
  return process.env.NEXT_PUBLIC_DOMAIN || hostname
}

export default function EditorPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const variantId = params?.variantId as string
  const isPreview = searchParams?.get('preview') === 'true'
  const [variant, setVariant] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

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

  const getSubdomainUrl = () => {
    if (!variant?.subdomain) return null
    
    const baseDomain = getBaseDomain()
    const protocol = typeof window !== 'undefined' ? window.location.protocol : 'http:'
    
    // For localhost, use direct route
    if (baseDomain.includes('localhost')) {
      return `${protocol}//${baseDomain}/${variant.subdomain}`
    }
    
    // For production, use subdomain format
    return `${protocol}//${variant.subdomain}.${baseDomain}`
  }

  const handleCopyLink = async () => {
    const url = getSubdomainUrl()
    if (!url) return
    
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast.success('Link copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error('Failed to copy link')
    }
  }

  const handleOpenLink = () => {
    const url = getSubdomainUrl()
    if (url) {
      window.open(url, '_blank')
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

  const subdomainUrl = getSubdomainUrl()

  return (
    <div className="relative">
      {/* Subdomain Link Banner */}
      {subdomainUrl && (
        <div className="bg-muted/50 border-b px-4 py-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-sm text-muted-foreground whitespace-nowrap">Subdomain:</span>
            <code className="text-sm bg-background px-2 py-1 rounded border flex-1 truncate">
              {subdomainUrl}
            </code>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              className="h-8"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 mr-1" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenLink}
              className="h-8"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Open
            </Button>
          </div>
        </div>
      )}
      
      <EditorProvider>
        <SimpleEditor variantId={variantId} initialElements={variant.elements} previewMode={isPreview} />
      </EditorProvider>
    </div>
  )
}

