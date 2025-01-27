import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const MOBILE_REGEX = /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i

export async function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || ''
  const isMobile = MOBILE_REGEX.test(userAgent)
  
  // Check if this is an API request
  if (request.nextUrl.pathname.startsWith('/api')) {
    // Skip auth for these paths to prevent infinite loops
    const isAuthRelatedPath = request.nextUrl.pathname.startsWith('/api/auth');
    if (!isAuthRelatedPath) {
      const token = await getToken({ req: request });
      
      if (!token) {
        return NextResponse.json({
          success: false,
          message: 'Authentication required',
          path: request.nextUrl.pathname
        }, { 
          status: 401,
          headers: {
            'WWW-Authenticate': 'Bearer'
          }
        });
      }
    }
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-device-type', isMobile ? 'mobile' : 'desktop')

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: [
    // Match all page routes
    '/((?!_next/static|_next/image|favicon.ico).*)',
    // Match all API routes
    '/api/:path*'
  ]
}