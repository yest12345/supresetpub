import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/middleware'

/**
 * GET /api/auth/me - 获取当前登录用户信息
 */
export async function GET(request: NextRequest) {
  try {
    // 验证用户身份
    const authResult = await requireAuth(request)
    
    // 如果不是用户对象，说明认证失败，返回错误响应
    if (authResult instanceof NextResponse) {
      return authResult
    }

    const { user } = authResult

    // 从数据库获取完整用户信息
    const fullUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        bio: true,
        role: true,
        mustChangePassword: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            presets: true,
            likes: true,
            favorites: true,
            comments: true,
            receivedDonations: true
          }
        }
      }
    })

    if (!fullUser) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: fullUser
    })
  } catch (error: any) {
    console.error('Get current user error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
