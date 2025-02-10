import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const MOBILE_REGEX = /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i

export async function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || ''
  const isMobile = MOBILE_REGEX.test(userAgent)
  
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