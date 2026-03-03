import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, generateToken } from '@/lib/auth'
import { randomBytes } from 'crypto'

/**
 * POST /api/auth/register - 用户注册
 * 支持自由注册：用户名 + 密码 + 确认密码
 */
export const runtime = 'nodejs'

const USERNAME_MIN_LENGTH = 3
const USERNAME_MAX_LENGTH = 20
const PASSWORD_MIN_LENGTH = 8
const PASSWORD_MAX_LENGTH = 64
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).+$/

function isValidUsername(name: string) {
  if (name.length < USERNAME_MIN_LENGTH || name.length > USERNAME_MAX_LENGTH) {
    return false
  }
  if (/\s/.test(name)) {
    return false
  }
  if (/^\d+$/.test(name)) {
    return false
  }
  return true
}

function isStrongPassword(password: string) {
  if (password.length < PASSWORD_MIN_LENGTH || password.length > PASSWORD_MAX_LENGTH) {
    return false
  }
  return PASSWORD_REGEX.test(password)
}

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
    const name = String(body?.name || '').trim()
    const password = String(body?.password || '')
    const confirmPassword = String(body?.confirmPassword || '')

    if (!name || !password || !confirmPassword) {
      return NextResponse.json(
        { success: false, error: '用户名、密码和确认密码都是必填项' },
        { status: 400 }
      )
    }

    if (!isValidUsername(name)) {
      return NextResponse.json(
        { success: false, error: '用户名需为 3-20 位，不能含空格，且不能为纯数字' },
        { status: 400 }
      )
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { success: false, error: '两次输入的密码不一致' },
        { status: 400 }
      )
    }

    if (!isStrongPassword(password)) {
      return NextResponse.json(
        { success: false, error: '密码需为 8-64 位，且至少包含字母和数字' },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: { name }
    })

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: '该用户名已被使用，请换一个用户名' },
        { status: 400 }
      )
    }

    const placeholderEmail = await generateUniquePlaceholderEmail()
    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        name,
        email: placeholderEmail,
        password: hashedPassword,
        role: 'user',
        mustChangePassword: false
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        bio: true,
        createdAt: true,
        mustChangePassword: true
      }
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
  } catch (error: any) {
    console.error('Registration error:', error)

    if (error?.code === 'P2002') {
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
