import { notFound } from 'next/navigation'
import EditorProvider from '@/providers/editor/editor-provider'
import SimpleEditor from '@/components/SimpleEditor'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

type Props = {
  params: Promise<{ subdomain: string }>
}

/**
 * Subdomain Page - Server Component
 * Similar to Omega-Website-Builder's [domain]/page.tsx
 * Handles subdomain requests and loads the variant
 */
export default async function SubdomainPage({ params }: Props) {
  const resolvedParams = await params
  const subdomain = resolvedParams.subdomain

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
        // Cache for 60 seconds
        next: { revalidate: 60 },
      }
    )

    if (!variantsResponse.ok) {
      return notFound()
    }

    const variantsData = await variantsResponse.json()
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

    // Render the variant in live/preview mode
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
    console.error('Error loading subdomain:', error)
    return notFound()
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params
  const subdomain = resolvedParams.subdomain

  return {
    title: `${subdomain} - Generated Website`,
    description: `Website for ${subdomain}`,
  }
}

