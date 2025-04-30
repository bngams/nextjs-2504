import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware triggered for request:', request.url);
  const { pathname } = request.nextUrl;

  // Check if the user is trying to access the dashboard
  if (pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('auth_token');
    console.log('Token:', token);
    // Redirect to login if no valid token is found
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // check if the token is valid...
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/dashboard',  ],
}