import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/favorites - 收藏或取消收藏
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

    // 检查是否已收藏
    const existing = await prisma.favorite.findUnique({
      where: {
        userId_presetId: {
          userId,
          presetId
        }
      }
    })

    if (existing) {
      // 取消收藏
      await prisma.$transaction([
        prisma.favorite.delete({
          where: { id: existing.id }
        }),
        prisma.preset.update({
          where: { id: presetId },
          data: {
            favoritesCount: {
              decrement: 1
            }
          }
        })
      ])

      return NextResponse.json({
        success: true,
        action: 'unfavorited',
        message: 'Favorite removed'
      })
    } else {
      // 添加收藏
      const [favorite] = await prisma.$transaction([
        prisma.favorite.create({
          data: {
            userId,
            presetId
          }
        }),
        prisma.preset.update({
          where: { id: presetId },
          data: {
            favoritesCount: {
              increment: 1
            }
          }
        })
      ])

      return NextResponse.json({
        success: true,
        action: 'favorited',
        data: favorite
      }, { status: 201 })
    }
  } catch (error: any) {
    console.error('Error toggling favorite:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// GET /api/favorites - 获取用户收藏列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'userId is required' },
        { status: 400 }
      )
    }

    const skip = (page - 1) * limit

    const [favorites, total] = await Promise.all([
      prisma.favorite.findMany({
        where: { 
          userId: parseInt(userId),
          preset: {
            deletedAt: null // 只返回未删除的预设
          }
        },
        skip,
        take: limit,
        include: {
          preset: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  avatar: true
                }
              },
              tags: {
                include: {
                  tag: true
                }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.favorite.count({ 
        where: { 
          userId: parseInt(userId),
          preset: {
            deletedAt: null
          }
        }
      })
    ])

    return NextResponse.json({
      success: true,
      data: favorites,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error: any) {
    console.error('Error fetching favorites:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
