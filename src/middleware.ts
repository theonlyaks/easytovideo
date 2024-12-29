import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const MOBILE_REGEX = /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i

export function middleware(request: NextRequest) {
 const userAgent = request.headers.get('user-agent') || ''
 const isMobile = MOBILE_REGEX.test(userAgent)
 
 console.log('User Agent:', userAgent)
 console.log('Device Type:', isMobile ? 'mobile' : 'desktop')

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
   '/((?!api|_next/static|_next/image|favicon.ico).*)',
 ]
}