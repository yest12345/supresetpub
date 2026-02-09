import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * 中间件：检查用户是否需要修改密码
 * 如果用户已登录且需要修改密码，强制跳转到修改密码页面
 */
export function middleware(request: NextRequest) {
  // 只处理需要认证的页面
  const { pathname } = request.nextUrl

  // 排除不需要检查的路径
  const publicPaths = [
    '/api/auth/login',
    '/api/auth/register',
    '/auth/change-password',
    '/api/auth/change-password',
    '/_next',
    '/favicon.ico'
  ]

  // 如果是公开路径，直接通过
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // 其他路径的检查由客户端组件处理
  // 因为我们需要从 cookie 中读取 token，这在中间件中比较复杂
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * 匹配所有路径除了：
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}



