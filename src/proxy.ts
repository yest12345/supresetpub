import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const publicPaths = [
    '/api/auth/login',
    '/api/auth/register',
    '/auth/change-password',
    '/api/auth/change-password',
    '/_next',
    '/favicon.ico'
  ]

  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
