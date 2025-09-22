import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect the /admin route
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const isAuthenticated = request.cookies.get('admin-auth')?.value === 'true';

    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
