import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware for subdomain routing
 * Rewrites subdomain requests to /[subdomain] routes
 * Similar to Omega-Website-Builder pattern
 */
export function middleware(request: NextRequest) {
  try {
    const url = request.nextUrl.clone()
    const hostname = request.headers.get('host') || ''
    const searchParams = url.searchParams.toString()
    
    const pathWithSearchParams = `${url.pathname}${
      searchParams.length > 0 ? `?${searchParams}` : ''
    }`

    // Skip middleware for API routes, static files, and Next.js internals
    if (
      url.pathname.startsWith('/api') ||
      url.pathname.startsWith('/_next') ||
      url.pathname.startsWith('/static') ||
      url.pathname.includes('.') ||
      url.pathname.startsWith('/flow') ||
      url.pathname.startsWith('/editor') ||
      url.pathname.startsWith('/variants')
    ) {
      return NextResponse.next()
    }

    // Get the main domain from environment or use default
    const mainDomain = process.env.NEXT_PUBLIC_DOMAIN || 'localhost:4000'
    
    // Extract subdomain from hostname
    // Pattern: subdomain.maindomain.com or subdomain.localhost:4000
    const customSubDomain = hostname
      .split(mainDomain)
      .filter(Boolean)[0]
      ?.replace(/\.$/, '') // Remove trailing dot

    // If we have a subdomain and it's not the main domain routes
    if (customSubDomain && 
        customSubDomain.length > 0 && 
        customSubDomain.length < 64 &&
        !['www', 'app', 'api'].includes(customSubDomain.toLowerCase()) &&
        /^[a-zA-Z0-9-]+$/.test(customSubDomain)) {
      
      // Rewrite to subdomain route (similar to Omega-Website-Builder)
      return NextResponse.rewrite(
        new URL(`/${customSubDomain}${pathWithSearchParams}`, request.url)
      )
    }

    // Handle root path - show main app
    if (url.pathname === '/' && hostname === mainDomain) {
      return NextResponse.next()
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.next()
  }
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
