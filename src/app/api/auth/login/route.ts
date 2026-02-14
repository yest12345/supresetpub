import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateToken, hashPassword, verifyPassword } from '@/lib/auth'
import { randomBytes } from 'crypto'

export const runtime = 'nodejs'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD || 'supreset2024'

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

async function handlePasswordLogin(identifier: string, password: string) {
  if (!identifier || !password) {
    return NextResponse.json(
      { success: false, error: '账号和密码都是必填项' },
      { status: 400 }
    )
  }

  const isEmail = EMAIL_REGEX.test(identifier)
  const isNumeric = /^\d+$/.test(identifier)

  let user = null
  if (isEmail) {
    user = await prisma.user.findUnique({ where: { email: identifier } })
  } else if (isNumeric) {
    user = await prisma.user.findUnique({ where: { id: parseInt(identifier, 10) } })
  } else {
    return NextResponse.json(
      { success: false, error: '请输入正确的账号格式（邮箱或数字ID）' },
      { status: 400 }
    )
  }

  if (!user) {
    return NextResponse.json(
      { success: false, error: '账号不存在或密码错误' },
      { status: 401 }
    )
  }

  const isPasswordValid = await verifyPassword(password, user.password)
  if (!isPasswordValid) {
    return NextResponse.json(
      { success: false, error: '账号不存在或密码错误' },
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
 * 支持：
 * - 邮箱 + 验证码登录/注册
 * - 账号ID/邮箱 + 密码登录
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, code, identifier, password } = body

    if (email && code) {
      return await handleEmailCodeLogin(String(email), String(code))
    }

    return await handlePasswordLogin(String(identifier || ''), String(password || ''))
  } catch (error: any) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: '登录失败: ' + error.message },
      { status: 500 }
    )
  }
}
