import { randomBytes } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, generateToken } from '@/lib/auth'
import { formatZodError, registerSchema } from '@/lib/validations/auth'

/**
 * POST /api/auth/register - 用户注册
 * 入参：用户名 + 密码（+ 可选确认密码）
 */
export const runtime = 'nodejs'

const userSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  avatar: true,
  bio: true,
  createdAt: true,
  mustChangePassword: true
} as const

async function generateUniquePlaceholderEmail() {
  while (true) {
    const candidate = `user-${Date.now()}-${randomBytes(4).toString('hex')}@local.supreset.pub`
    const existing = await prisma.user.findUnique({
      where: { email: candidate }
    })
    if (!existing) return candidate
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = registerSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: formatZodError(parsed.error) },
        { status: 400 }
      )
    }

    const { name, password } = parsed.data

    const existingUser = await prisma.user.findFirst({
      where: { name }
    })

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: '该用户名已被使用，请换一个用户名' },
        { status: 400 }
      )
    }

    const hashedPassword = await hashPassword(password)
    const placeholderEmail = await generateUniquePlaceholderEmail()

    const user = await prisma.user.create({
      data: {
        name,
        email: placeholderEmail,
        password: hashedPassword,
        role: 'user',
        mustChangePassword: false
      },
      select: userSelect
    })

    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    })

    return NextResponse.json(
      {
        success: true,
        data: {
          user,
          token,
          mustChangePassword: user.mustChangePassword
        },
        message: '注册成功'
      },
      { status: 201 }
    )
  } catch (error: unknown) {
    console.error('Registration error:', error)

    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'P2002'
    ) {
      return NextResponse.json(
        { success: false, error: '用户名已存在，请更换后重试' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: '注册失败，请稍后重试' },
      { status: 500 }
    )
  }
}
