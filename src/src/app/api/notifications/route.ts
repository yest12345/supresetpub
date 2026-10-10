import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/notifications - 获取用户通知列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const unreadOnly = searchParams.get('unreadOnly') === 'true'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'userId is required' },
        { status: 400 }
      )
    }

    const where: any = { userId: parseInt(userId) }
    if (unreadOnly) where.read = false

    const skip = (page - 1) * limit

    const [notifications, total, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.notification.count({ where }),
      prisma.notification.count({ 
        where: { userId: parseInt(userId), read: false } 
      })
    ])

    return NextResponse.json({
      success: true,
      data: notifications,
      unreadCount,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error: any) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// POST /api/notifications - 创建通知（系统使用）
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, title, content, link, type } = body

    if (!userId || !title || !content || !type) {
      return NextResponse.json(
        { success: false, error: 'userId, title, content and type are required' },
        { status: 400 }
      )
    }

    const notification = await prisma.notification.create({
      data: {
        userId,
        title,
        content,
        link,
        type
      }
    })

    return NextResponse.json({ success: true, data: notification }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating notification:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// PUT /api/notifications - 批量标记为已读
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, notificationIds } = body

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'userId is required' },
        { status: 400 }
      )
    }

    const where: any = { userId }
    if (notificationIds && notificationIds.length > 0) {
      where.id = { in: notificationIds }
    }

    const result = await prisma.notification.updateMany({
      where,
      data: { read: true }
    })

    return NextResponse.json({
      success: true,
      message: `Marked ${result.count} notifications as read`
    })
  } catch (error: any) {
    console.error('Error marking notifications as read:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
