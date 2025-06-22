import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hostname = request.headers.get('host')

  // Only handle www redirect for non-static assets
  if (hostname?.startsWith('www.') && !pathname.startsWith('/_next/')) {
    const newUrl = new URL(request.url)
    newUrl.hostname = hostname.replace('www.', '')
    return NextResponse.redirect(newUrl, { status: 301 })
  }

  // Set MIME types for static CSS files
  if (pathname.startsWith('/_next/static/css/')) {
    const response = NextResponse.next()
    response.headers.set('Content-Type', 'text/css; charset=utf-8')
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    return response
  }

  // Set MIME types for static JS files
  if (pathname.startsWith('/_next/static/js/')) {
    const response = NextResponse.next()
    response.headers.set('Content-Type', 'application/javascript; charset=utf-8')
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    return response
  }

  // Add security headers to all other requests
  const response = NextResponse.next()
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
    '/_next/static/css/:path*',
    '/_next/static/js/:path*',
  ],
}
