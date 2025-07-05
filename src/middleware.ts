import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Define protected routes
const protectedRoutes = ['/profile', '/settings', '/admin'];
const authRoutes = ['/auth/login', '/auth/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  // Get token from cookies or headers
  const token = request.cookies.get('auth_token')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '');

  // Verify token
  let isAuthenticated = false;
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret');
      await jwtVerify(token, secret);
      isAuthenticated = true;
    } catch (error) {
      // Token is invalid
      isAuthenticated = false;
    }
  }

  // Redirect logic
  if (isProtectedRoute && !isAuthenticated) {
    // Redirect to login if accessing protected route without auth
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && isAuthenticated) {
    // Redirect to dashboard if accessing auth routes while authenticated
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 