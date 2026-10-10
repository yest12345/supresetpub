import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, generateToken } from '@/lib/auth'

/**
 * POST /api/auth/register - 用户注册（已禁用 - 内测版）
 * 内测版本不允许公开注册，账户由管理员分配
 */
export async function POST(request: NextRequest) {
  return NextResponse.json(
    { 
      success: false, 
      error: '当前为内测版本，暂不开放注册。如需账户，请联系管理员分配。' 
    },
    { status: 403 }
  )
  
  // 以下代码已禁用，保留用于参考
  /*
  try {
    const body = await request.json()
    const { name, email, password } = body

    // 验证必填字段
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Name, email and password are required' },
        { status: 400 }
      )
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // 验证密码长度
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // 检查邮箱是否已存在
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Email already registered' },
        { status: 400 }
      )
    }

    // 加密密码
    const hashedPassword = await hashPassword(password)

    // 创建用户
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'user'
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        createdAt: true
      }
    })

    // 生成 token
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    })

    return NextResponse.json({
      success: true,
      data: {
        user,
        token
      },
      message: 'Registration successful'
    }, { status: 201 })
  } catch (error: any) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, error: 'Registration failed: ' + error.message },
      { status: 500 }
    )
  }
  */
}
