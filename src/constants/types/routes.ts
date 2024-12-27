export const PUBLIC_ROUTES = [
  '/api/auth',
  '/auth/signin',
  '/auth/signup',
  '/',
  '/about',
  '/favicon.ico',    // Add browser requests
  '/_next',          // Add Next.js system routes
  '/assets',         // Add public assets
] as const

export const PROTECTED_ROUTE_PREFIXES = [
  '/api/',
  '/studio/',
  '/projects/',
] as const

export const AUTH_ROUTES = {
  SIGNIN: '/auth/signin',
  SIGNUP: '/auth/signup',
  ERROR: '/auth/error',
} as const
