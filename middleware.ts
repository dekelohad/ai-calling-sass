import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of paths that don't require authentication
const publicPaths = [
  '/login',
  '/register',
  '/reset-password',
  '/api/auth'
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if the path is public
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path))
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register')
  
  // Get the token from the cookies
  const token = request.cookies.get('auth-token')?.value
  
  // If trying to access auth pages while logged in, redirect to call history
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard/call-history', request.url))
  }
  
  // If trying to access protected routes without token, redirect to login
  if (!isPublicPath && !token && pathname !== '/') {
    const url = new URL('/login', request.url)
    url.searchParams.set('from', pathname)
    return NextResponse.redirect(url)
  }
  
  // Redirect /dashboard to /dashboard/call-history
  if (pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/dashboard/call-history', request.url))
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