import { notFound } from 'next/navigation'
import EditorProvider from '@/providers/editor/editor-provider'
import SimpleEditor from '@/components/SimpleEditor'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

type Props = {
  params: Promise<{ subdomain: string; path: string }>
}

/**
 * Subdomain Path Page - Server Component
 * Similar to Omega-Website-Builder's [domain]/[path]/page.tsx
 * Handles subdomain requests with paths (for future multi-page support)
 */
export default async function SubdomainPathPage({ params }: Props) {
  const resolvedParams = await params
  const subdomain = resolvedParams.subdomain
  const path = resolvedParams.path

  if (!subdomain) {
    return notFound()
  }

  try {
    // Fetch variants for this subdomain
    const variantsResponse = await fetch(
      `${API_URL}/api/variants/${encodeURIComponent(subdomain)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 },
      }
    )

    if (!variantsResponse.ok) {
      return notFound()
    }

    const variantsData = await variantsResponse.json()
    
    // For now, use first variant. In future, can match by path
    const firstVariant = variantsData.variants?.[0]

    if (!firstVariant || !firstVariant.id) {
      return notFound()
    }

    // Fetch full variant data
    const variantResponse = await fetch(
      `${API_URL}/api/variant/${firstVariant.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 },
      }
    )

    if (!variantResponse.ok) {
      return notFound()
    }

    const variantData = await variantResponse.json()
    const variant = variantData.variant

    if (!variant) {
      return notFound()
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
  } catch (error) {
    console.error('Error loading subdomain path:', error)
    return notFound()
  }
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params
  const { subdomain, path } = resolvedParams

  return {
    title: `${subdomain} - ${path}`,
    description: `Website for ${subdomain}`,
  }
}

