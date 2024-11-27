import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /dashboard)
  const path = request.nextUrl.pathname;

  // Define routes that require authentication
  const protectedRoutes = ['/dashboard', '/dashboard/create-contribution', '/wallet'];

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));

  // Check if the user is authenticated (wallet connected)
  const token = request.cookies.get('wallet_connected')?.value;

  // If trying to access a protected route without being authenticated
  if (isProtectedRoute && !token) {
    // Redirect to the connect wallet page
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If already on connect wallet page and authenticated, redirect to dashboard
  if (path === '/' && token) {
    return NextResponse.redirect(new URL('/wallet', request.url));
  }

  // Continue with the request
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/create-contribution/:path*', 
    '/wallet/:path*', 
    '/connect-wallet'
  ]
}