import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth, requireAdmin } from '@/lib/middleware'
import { hashPassword } from '@/lib/auth'

// 默认密码（内测账户初始密码）
const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD || 'supreset2024'

// GET /api/users - 获取用户列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const role = searchParams.get('role')

    const where = role ? { role } : {}
    const skip = (page - 1) * limit

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
          bio: true,
          role: true,
          createdAt: true,
          _count: {
            select: {
              presets: {
                where: {
                  deletedAt: null // 只统计未删除的预设
                }
              },
              receivedDonations: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.user.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error: any) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// POST /api/users - 创建用户（仅管理员）
export async function POST(request: NextRequest) {
  try {
    // 验证管理员权限
    const authResult = await requireAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const { user } = authResult
    
    // 检查是否为管理员
    const adminCheck = requireAdmin(user)
    if (adminCheck) return adminCheck

    const body = await request.json()
    const { name, email, password, avatar, bio, role } = body

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
    const existing = await prisma.user.findUnique({
      where: { email }
    })

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Email already exists' },
        { status: 400 }
      )
    }

    // 如果提供了密码，使用提供的密码；否则使用默认密码
    const passwordToUse = password || DEFAULT_PASSWORD
    
    // 加密密码
    const hashedPassword = await hashPassword(passwordToUse)

    // 创建用户（新用户默认需要修改密码）
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        avatar,
        bio,
        role: role || 'user', // 默认角色为 user，管理员可以指定其他角色
        mustChangePassword: true // 新用户必须修改密码
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        bio: true,
        role: true,
        createdAt: true
      }
    })

    return NextResponse.json({ success: true, data: newUser }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
