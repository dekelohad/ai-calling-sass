import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of paths that don't require authentication
const publicPaths = [
  '/auth/sign-in',
  '/auth/sign-up',
  '/auth/reset-password',
  '/api/auth',
  '/'
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if the path is public
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path))
  
  // Get the token from the cookies
  const token = request.cookies.get('auth-token')?.value
  
  // Redirect to sign-in if accessing a protected route without a token
  if (!isPublicPath && !token) {
    const url = new URL('/auth/sign-in', request.url)
    url.searchParams.set('from', pathname)
    return NextResponse.redirect(url)
  }
  
  // Redirect to dashboard if accessing auth pages with a token
  if (isPublicPath && token && pathname !== '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  return NextResponse.next()
}

// Configure which routes to run the middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
} 