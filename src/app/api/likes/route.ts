import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/likes - 点赞或取消点赞
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, presetId } = body

    if (!userId || !presetId) {
      return NextResponse.json(
        { success: false, error: 'userId and presetId are required' },
        { status: 400 }
      )
    }

    // 检查是否已点赞
    const existing = await prisma.like.findUnique({
      where: {
        userId_presetId: {
          userId,
          presetId
        }
      }
    })

    if (existing) {
      // 取消点赞
      await prisma.$transaction([
        prisma.like.delete({
          where: { id: existing.id }
        }),
        prisma.preset.update({
          where: { id: presetId },
          data: {
            likesCount: {
              decrement: 1
            }
          }
        })
      ])

      return NextResponse.json({
        success: true,
        action: 'unliked',
        message: 'Like removed'
      })
    } else {
      // 添加点赞
      const [like] = await prisma.$transaction([
        prisma.like.create({
          data: {
            userId,
            presetId
          }
        }),
        prisma.preset.update({
          where: { id: presetId },
          data: {
            likesCount: {
              increment: 1
            }
          }
        })
      ])

      return NextResponse.json({
        success: true,
        action: 'liked',
        data: like
      }, { status: 201 })
    }
  } catch (error: any) {
    console.error('Error toggling like:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// GET /api/likes - 获取用户点赞列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const presetId = searchParams.get('presetId')

    const where: any = {
      preset: {
        deletedAt: null // 只返回未删除的预设
      }
    }
    if (userId) where.userId = parseInt(userId)
    if (presetId) where.presetId = parseInt(presetId)

    const likes = await prisma.like.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        },
        preset: {
          select: {
            id: true,
            title: true,
            coverImage: true,
            daw: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ success: true, data: likes })
  } catch (error: any) {
    console.error('Error fetching likes:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
