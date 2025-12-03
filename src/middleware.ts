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
    url.pathname.includes('.')
  ) {
    return NextResponse.next()
  }
  
  // Extract subdomain from hostname
  // Format: subdomain.wizcommerce.vercel.app or subdomain.localhost:3000
  const parts = hostname.split('.')
  
  // Main domain names to exclude from subdomain routing
  const mainDomains = ['wizcommerce', 'www', 'app', 'localhost']
  
  // Check if we have a subdomain (more than 2 parts for vercel.app or localhost:3000)
  const hasSubdomain = parts.length > 2 || (parts.length === 2 && parts[1].includes('localhost'))
  
  if (hasSubdomain) {
    const subdomain = parts[0]
    
    // Only route to subdomain page if it's not a main domain name
    if (subdomain && !mainDomains.includes(subdomain.toLowerCase())) {
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

