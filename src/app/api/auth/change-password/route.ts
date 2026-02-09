import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/middleware'
import { verifyPassword, hashPassword } from '@/lib/auth'

/**
 * POST /api/auth/change-password - 修改密码
 */
export async function POST(request: NextRequest) {
  try {
    // 验证用户身份
    const authResult = await requireAuth(request)
    if (authResult instanceof NextResponse) return authResult

    const { user } = authResult

    const body = await request.json()
    const { currentPassword, newPassword } = body

    // 验证必填字段
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, error: '当前密码和新密码都是必填项' },
        { status: 400 }
      )
    }

    // 验证新密码长度
    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, error: '新密码至少需要 6 个字符' },
        { status: 400 }
      )
    }

    // 获取用户完整信息
    const fullUser = await prisma.user.findUnique({
      where: { id: user.id }
    })

    if (!fullUser) {
      return NextResponse.json(
        { success: false, error: '用户不存在' },
        { status: 404 }
      )
    }

    // 验证当前密码
    const isCurrentPasswordValid = await verifyPassword(currentPassword, fullUser.password)

    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { success: false, error: '当前密码错误' },
        { status: 401 }
      )
    }

    // 检查新密码是否与当前密码相同
    const isSamePassword = await verifyPassword(newPassword, fullUser.password)
    if (isSamePassword) {
      return NextResponse.json(
        { success: false, error: '新密码不能与当前密码相同' },
        { status: 400 }
      )
    }

    // 加密新密码
    const hashedNewPassword = await hashPassword(newPassword)

    // 更新密码并清除 mustChangePassword 标记
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedNewPassword,
        mustChangePassword: false
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        bio: true,
        role: true,
        mustChangePassword: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return NextResponse.json({
      success: true,
      data: updatedUser,
      message: '密码修改成功'
    })
  } catch (error: any) {
    console.error('Change password error:', error)
    return NextResponse.json(
      { success: false, error: '修改密码失败: ' + error.message },
      { status: 500 }
    )
  }
}



