import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_AUTH_COOKIE_NAME, verifyAdminAuthToken } from '@/lib/admin-auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = request.cookies.get(ADMIN_AUTH_COOKIE_NAME)?.value;
    const isAuthenticated = await verifyAdminAuthToken(token);

    if (!isAuthenticated) {
      const loginUrl = new URL('/admin/login', request.url);
      const response = NextResponse.redirect(loginUrl);

      response.cookies.set(ADMIN_AUTH_COOKIE_NAME, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0,
        path: '/',
      });

      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
