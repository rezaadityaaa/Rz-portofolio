import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const hostname = request.headers.get('host')

  // Redirect www to non-www
  if (hostname?.startsWith('www.')) {
    const newUrl = new URL(request.url)
    newUrl.hostname = hostname.replace('www.', '')
    return NextResponse.redirect(newUrl, { status: 301 })
  }

  // Ensure proper MIME types for static assets
  if (pathname.startsWith('/_next/static/css/')) {
    const response = NextResponse.next()
    response.headers.set('Content-Type', 'text/css')
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    return response
  }

  if (pathname.startsWith('/_next/static/js/')) {
    const response = NextResponse.next()
    response.headers.set('Content-Type', 'application/javascript')
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    return response
  }

  // Add security headers
  const response = NextResponse.next()
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  
  return response
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
    '/_next/static/css/:path*',
    '/_next/static/js/:path*',
  ],
}
