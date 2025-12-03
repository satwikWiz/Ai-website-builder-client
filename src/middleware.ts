import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') || ''
  
  // Skip middleware for API routes, static files, and known paths
  if (
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/static') ||
    url.pathname.startsWith('/subdomain') ||
    url.pathname.startsWith('/flow') ||
    url.pathname.startsWith('/editor') ||
    url.pathname.startsWith('/variants') ||
    url.pathname === '/' ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next()
  }
  
  // Extract subdomain from hostname
  // Format: subdomain.wizcommerce.vercel.app or subdomain.localhost:3000
  const parts = hostname.split('.')
  
  // Main domain names to exclude from subdomain routing
  const mainDomains = ['wizcommerce', 'www', 'app', 'localhost', 'vercel']
  
  // Check if we have a subdomain
  // For vercel.app: subdomain.wizcommerce.vercel.app (4 parts: [subdomain, wizcommerce, vercel, app])
  // For custom domain: subdomain.domain.com (3 parts: [subdomain, domain, com])
  const isVercelApp = hostname.includes('vercel.app')
  const hasSubdomain = isVercelApp ? parts.length === 4 : parts.length === 3
  
  if (hasSubdomain) {
    const subdomain = parts[0]
    
    // Only route to subdomain page if it's not a main domain name and is a valid subdomain
    if (subdomain && 
        subdomain.length > 0 && 
        !mainDomains.includes(subdomain.toLowerCase()) &&
        /^[a-zA-Z0-9-]+$/.test(subdomain)) {
      // Rewrite to subdomain page
      url.pathname = `/subdomain/${subdomain}`
      return NextResponse.rewrite(url)
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

