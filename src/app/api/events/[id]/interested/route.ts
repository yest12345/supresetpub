import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/middleware'

// POST /api/events/[id]/interested - 标记想去/取消标记
export async function POST(
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

    // 检查活动是否存在
    const event = await prisma.event.findUnique({
      where: { id: eventId }
    })

    if (!event) {
      return NextResponse.json(
        { success: false, error: '活动不存在' },
        { status: 404 }
      )
    }

    // 检查用户是否已标记想去
    const existingInterest = await prisma.eventInterest.findUnique({
      where: {
        userId_eventId: {
          userId: user.id,
          eventId: eventId
        }
      }
    })

    if (existingInterest) {
      // 取消标记想去
      await prisma.eventInterest.delete({
        where: {
          userId_eventId: {
            userId: user.id,
            eventId: eventId
          }
        }
      })

      // 减少计数
      await prisma.event.update({
        where: { id: eventId },
        data: { interestedCount: { decrement: 1 } }
      })

      return NextResponse.json({ 
        success: true, 
        isInterested: false,
        message: '已取消标记想去' 
      })
    } else {
      // 标记想去
      await prisma.eventInterest.create({
        data: {
          userId: user.id,
          eventId: eventId
        }
      })

      // 增加计数
      await prisma.event.update({
        where: { id: eventId },
        data: { interestedCount: { increment: 1 } }
      })

      return NextResponse.json({ 
        success: true, 
        isInterested: true,
        message: '已标记想去' 
      })
    }
  } catch (error: any) {
    console.error('Error toggling event interest:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

