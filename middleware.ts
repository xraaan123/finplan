import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token =
    req.cookies.get('token')?.value || req.headers.get('authorization') || req.nextUrl.searchParams.get('token') || '';
  const isLoggedIn = req.cookies.has('token') || token === 'mocked-token';

  if (req.nextUrl.pathname.startsWith('/dashboard') && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path'],
};
