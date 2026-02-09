import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth, optionalAuth } from '@/lib/middleware'

// GET /api/events/[id] - 获取活动详情（增加浏览次数）
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const eventId = parseInt(id)

    // 尝试获取当前用户（可选）
    const currentUser = await optionalAuth(request)

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        organizer: {
          select: {
            id: true,
            name: true,
            avatar: true,
            bio: true
          }
        },
        _count: {
          select: {
            interestedUsers: true
          }
        }
      }
    })

    if (!event) {
      return NextResponse.json(
        { success: false, error: '活动不存在' },
        { status: 404 }
      )
    }

    // 增加浏览次数（每次访问都增加）
    await prisma.event.update({
      where: { id: eventId },
      data: { views: { increment: 1 } }
    })

    // 检查用户是否已标记想去
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

    // 更新 views 后的数据
    const eventWithViews = {
      ...event,
      views: event.views + 1,
      isInterested
    }

    return NextResponse.json({ success: true, data: eventWithViews })
  } catch (error: any) {
    console.error('Error fetching event:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// PUT /api/events/[id] - 更新活动（需要是主办方）
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { user } = authResult

    const { id } = await params
    const eventId = parseInt(id)

    // 检查活动是否存在且用户是主办方
    const event = await prisma.event.findUnique({
      where: { id: eventId }
    })

    if (!event) {
      return NextResponse.json(
        { success: false, error: '活动不存在' },
        { status: 404 }
      )
    }

    if (event.organizerId !== user.id && user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: '无权修改此活动' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { title, description, coverImage, startTime, endTime, location, status } = body

    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(coverImage !== undefined && { coverImage }),
        ...(startTime && { startTime: new Date(startTime) }),
        ...(endTime !== undefined && { endTime: endTime ? new Date(endTime) : null }),
        ...(location !== undefined && { location }),
        ...(status && { status })
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

    return NextResponse.json({ success: true, data: updatedEvent })
  } catch (error: any) {
    console.error('Error updating event:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// DELETE /api/events/[id] - 删除活动（需要是主办方）
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { user } = authResult

    const { id } = await params
    const eventId = parseInt(id)

    // 检查活动是否存在且用户是主办方
    const event = await prisma.event.findUnique({
      where: { id: eventId }
    })

    if (!event) {
      return NextResponse.json(
        { success: false, error: '活动不存在' },
        { status: 404 }
      )
    }

    if (event.organizerId !== user.id && user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: '无权删除此活动' },
        { status: 403 }
      )
    }

    await prisma.event.delete({
      where: { id: eventId }
    })

    return NextResponse.json({ success: true, message: '活动已删除' })
  } catch (error: any) {
    console.error('Error deleting event:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

