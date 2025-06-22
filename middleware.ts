import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hostname = request.headers.get('host') || ''

  // Only handle CSS/JS MIME types - don't redirect at all
  if (pathname.startsWith('/_next/static/css/')) {
    const response = NextResponse.next()
    response.headers.set('Content-Type', 'text/css; charset=utf-8')
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    return response
  }

  if (pathname.startsWith('/_next/static/js/')) {
    const response = NextResponse.next()
    response.headers.set('Content-Type', 'application/javascript; charset=utf-8')
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    return response
  }

  // For all other requests, just add security headers - no redirects
  const response = NextResponse.next()
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  
  return response
}

export const config = {
  matcher: [
    /*
     * Only match static CSS and JS files for MIME type fixing
     */
    '/_next/static/css/:path*',
    '/_next/static/js/:path*',
  ],
}
