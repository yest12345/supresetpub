import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyPassword, generateToken } from '@/lib/auth'

// 默认密码（内测账户初始密码）
const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD || 'supreset2024'

/**
 * POST /api/auth/login - 用户登录
 * 内测版本：只支持使用账户ID登录
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { identifier, password } = body // identifier 为账户 ID

    // 验证必填字段
    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, error: '账户ID和密码都是必填项' },
        { status: 400 }
      )
    }

    // 验证 identifier 是否为数字ID
    const isNumeric = /^\d+$/.test(identifier)
    
    if (!isNumeric) {
      return NextResponse.json(
        { success: false, error: '请输入正确的账户ID（纯数字）' },
        { status: 400 }
      )
    }

    // 使用 ID 查找用户
    const user = await prisma.user.findUnique({
      where: { id: parseInt(identifier) }
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: '账户ID或密码错误' },
        { status: 401 }
      )
    }

    // 验证密码
    const isPasswordValid = await verifyPassword(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: '账户ID或密码错误' },
        { status: 401 }
      )
    }

    // 检查是否是默认密码（首次登录）
    const isDefaultPassword = await verifyPassword(DEFAULT_PASSWORD, user.password)
    const mustChangePassword = isDefaultPassword || user.mustChangePassword

    // 生成 token
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    })

    // 返回用户信息（不包含密码）
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      data: {
        user: {
          ...userWithoutPassword,
          mustChangePassword
        },
        token,
        mustChangePassword // 标记是否需要修改密码
      },
      message: 'Login successful'
    })
  } catch (error: any) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: '登录失败: ' + error.message },
      { status: 500 }
    )
  }
}
