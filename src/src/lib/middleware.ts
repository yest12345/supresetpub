import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, extractToken, UserPayload } from './auth'

/**
 * 认证中间件 - 验证用户是否已登录
 * 在 API 路由中使用，验证 JWT Token
 */
export async function requireAuth(
  request: NextRequest
): Promise<{ user: UserPayload } | NextResponse> {
  try {
    // 从请求头获取 token
    const authHeader = request.headers.get('authorization')
    const token = extractToken(authHeader)

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Authentication required. Please login.' },
        { status: 401 }
      )
    }

    // 验证 token
    const user = verifyToken(token)

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired token. Please login again.' },
        { status: 401 }
      )
    }

    // 返回用户信息
    return { user }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 401 }
    )
  }
}

/**
 * 可选认证中间件 - 尝试获取用户信息，但不强制要求登录
 */
export async function optionalAuth(
  request: NextRequest
): Promise<UserPayload | null> {
  try {
    const authHeader = request.headers.get('authorization')
    const token = extractToken(authHeader)

    if (!token) return null

    return verifyToken(token)
  } catch (error) {
    return null
  }
}

/**
 * 管理员权限验证
 */
export function requireAdmin(user: UserPayload): NextResponse | null {
  if (user.role !== 'admin') {
    return NextResponse.json(
      { success: false, error: 'Admin access required' },
      { status: 403 }
    )
  }
  return null
}
