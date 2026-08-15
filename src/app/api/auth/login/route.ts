import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateToken, hashPassword, verifyPassword } from '@/lib/auth'
import { formatZodError, loginSchema } from '@/lib/validations/auth'
import { randomBytes } from 'crypto'

export const runtime = 'nodejs'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD || 'supreset2024'
const LOGIN_ERROR = '用户名或密码错误'

function sanitizeName(base: string) {
  const cleaned = base.replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase()
  return cleaned.length > 0 ? cleaned : 'user'
}

async function generateUniqueName(email: string) {
  const localPart = email.split('@')[0] || 'user'
  const base = sanitizeName(localPart).slice(0, 24)
  let name = base
  let counter = 0

  while (true) {
    const existing = await prisma.user.findUnique({ where: { name } })
    if (!existing) return name
    counter += 1
    const suffix = `-${counter}`
    name = `${base.slice(0, Math.max(1, 50 - suffix.length))}${suffix}`
  }
}

async function handleEmailCodeLogin(email: string, code: string) {
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { success: false, error: '邮箱格式不正确' },
      { status: 400 }
    )
  }

  const record = await prisma.emailVerificationCode.findUnique({
    where: { email }
  })

  if (!record) {
    return NextResponse.json(
      { success: false, error: '验证码不存在或已过期' },
      { status: 400 }
    )
  }

  if (record.expiresAt.getTime() < Date.now()) {
    await prisma.emailVerificationCode.delete({ where: { email } })
    return NextResponse.json(
      { success: false, error: '验证码已过期，请重新获取' },
      { status: 400 }
    )
  }

  const isValid = await verifyPassword(code, record.codeHash)
  if (!isValid) {
    await prisma.emailVerificationCode.update({
      where: { email },
      data: { attempts: { increment: 1 } }
    })
    return NextResponse.json(
      { success: false, error: '验证码不正确' },
      { status: 400 }
    )
  }

  await prisma.emailVerificationCode.delete({ where: { email } })

  let user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    const name = await generateUniqueName(email)
    const randomPassword = randomBytes(16).toString('hex')
    const hashedPassword = await hashPassword(randomPassword)
    user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'user',
        mustChangePassword: false
      }
    })
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  })

  const { password: _, ...userWithoutPassword } = user

  return NextResponse.json({
    success: true,
    data: {
      user: userWithoutPassword,
      token,
      mustChangePassword: user.mustChangePassword
    },
    message: 'Login successful'
  })
}

async function handlePasswordLogin(name: string, password: string) {
  const user = await prisma.user.findUnique({ where: { name } })

  if (!user) {
    return NextResponse.json(
      { success: false, error: LOGIN_ERROR },
      { status: 401 }
    )
  }

  const isPasswordValid = await verifyPassword(password, user.password)
  if (!isPasswordValid) {
    return NextResponse.json(
      { success: false, error: LOGIN_ERROR },
      { status: 401 }
    )
  }

  const isDefaultPassword = await verifyPassword(DEFAULT_PASSWORD, user.password)
  const mustChangePassword = isDefaultPassword || user.mustChangePassword

  const token = generateToken({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  })

  const { password: _, ...userWithoutPassword } = user

  return NextResponse.json({
    success: true,
    data: {
      user: {
        ...userWithoutPassword,
        mustChangePassword
      },
      token,
      mustChangePassword
    },
    message: 'Login successful'
  })
}

/**
 * POST /api/auth/login
 * 主流程：用户名 + 密码登录
 * 兼容：邮箱 + 验证码登录（遗留接口，前端不再使用）
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, code, name, password } = body

    if (email && code) {
      return await handleEmailCodeLogin(String(email), String(code))
    }

    const parsed = loginSchema.safeParse({ name, password })
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: formatZodError(parsed.error) },
        { status: 400 }
      )
    }

    return await handlePasswordLogin(parsed.data.name, parsed.data.password)
  } catch (error: unknown) {
    console.error('Login error:', error)
    const message = error instanceof Error ? error.message : '未知错误'
    return NextResponse.json(
      { success: false, error: '登录失败: ' + message },
      { status: 500 }
    )
  }
}
