import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth, optionalAuth } from '@/lib/middleware'

// GET /api/events - 获取活动列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const organizerId = searchParams.get('organizerId')
    const status = searchParams.get('status') || 'published' // 默认只显示已发布的活动
    const sort = searchParams.get('sort') || 'latest'
    const search = searchParams.get('search') || '' // 获取搜索关键词

    const where: any = {}

    // 1. 基础筛选：主办方或状态
    if (organizerId) {
      where.organizerId = parseInt(organizerId)
    } else {
      // 非主办方查看时，只显示已发布的活动
      where.status = status
    }

    // 2. 搜索逻辑：匹配标题 或 地点
    if (search) {
      where.OR = [
        { title: { contains: search } }, // Prisma 默认包含匹配
        { location: { contains: search } }
      ]
    }

    // 3. 排序逻辑 & 修正"即将开始"过滤
    let orderBy: any = {}

    if (sort === 'upcoming') {
      // 关键修复：即将开始 = 开始时间 >= 现在
      where.startTime = {
        gte: new Date(), 
        ...where.startTime // 保留可能存在的其他时间筛选
      }
      orderBy = { startTime: 'asc' } // 按时间从近到远
    } else if (sort === 'latest') {
      orderBy = { createdAt: 'desc' }
    } else if (sort === 'popular') {
      orderBy = { interestedCount: 'desc' }
    } else {
      // 默认
      orderBy = { createdAt: 'desc' }
    }

    const skip = (page - 1) * limit

    // 尝试获取当前用户（可选）
    const currentUser = await optionalAuth(request)

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take: limit,
        include: {
          organizer: {
            select: {
              id: true,
              name: true,
              avatar: true
            }
          },
          _count: {
            select: {
              interestedUsers: true
            }
          }
        },
        orderBy
      }),
      prisma.event.count({ where })
    ])

    // 如果用户已登录，标记用户是否已标记想去
    const eventsWithInterest = await Promise.all(
      events.map(async (event) => {
        let isInterested = false
        if (currentUser) {
          const interest = await prisma.eventInterest.findUnique({
            where: {
              userId_eventId: {
                userId: currentUser.id,
                eventId: event.id
              }
            }
          })
          isInterested = !!interest
        }
        return {
          ...event,
          isInterested
        }
      })
    )

    return NextResponse.json({
      success: true,
      data: eventsWithInterest,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error: any) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// POST /api/events - 创建活动（需要登录）
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { user } = authResult

    const body = await request.json()
    // [修改] 解构出 ticketUrl
    const { title, description, coverImage, ticketUrl, startTime, endTime, location, status } = body

    if (!title || !startTime) {
      return NextResponse.json(
        { success: false, error: '标题和开始时间是必填项' },
        { status: 400 }
      )
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        coverImage,
        ticketUrl, // [修改] 将 ticketUrl 写入数据库
        hasTicketUrl: !!ticketUrl,
        startTime: new Date(startTime),
        endTime: endTime ? new Date(endTime) : null,
        location,
        status: status || 'draft',
        organizerId: user.id
      },
      include: {
        organizer: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    })

    return NextResponse.json({ success: true, data: event }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating event:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}