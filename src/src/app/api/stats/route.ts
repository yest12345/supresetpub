import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/stats - 获取平台统计数据
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'overview'

    if (type === 'overview') {
      // 平台总体统计
      const [
        totalUsers,
        totalPresets,
        totalDownloads,
        totalDonations
      ] = await Promise.all([
        prisma.user.count(),
        prisma.preset.count(),
        prisma.downloadHistory.count(),
        prisma.donation.aggregate({
          _sum: { amount: true }
        })
      ])

      return NextResponse.json({
        success: true,
        data: {
          totalUsers,
          totalPresets,
          totalDownloads,
          totalDonations: totalDonations._sum.amount || 0
        }
      })
    }

    if (type === 'trending') {
      // 趋势数据：最近热门预设
      const trendingPresets = await prisma.preset.findMany({
        where: { isPublic: true },
        orderBy: [
          { downloads: 'desc' },
          { likesCount: 'desc' }
        ],
        take: 10,
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
      })

      return NextResponse.json({
        success: true,
        data: trendingPresets
      })
    }

    if (type === 'daw') {
      // DAW 分布统计
      const dawStats = await prisma.preset.groupBy({
        by: ['daw'],
        _count: {
          id: true
        },
        orderBy: {
          _count: {
            id: 'desc'
          }
        }
      })

      return NextResponse.json({
        success: true,
        data: dawStats
      })
    }

    if (type === 'user') {
      // 用户统计（需要 userId 参数）
      const userId = searchParams.get('userId')
      if (!userId) {
        return NextResponse.json(
          { success: false, error: 'userId is required for user stats' },
          { status: 400 }
        )
      }

      const userIdInt = parseInt(userId)

      const [
        presetsCount,
        likesCount,
        favoritesCount,
        downloadsCount,
        receivedDonations
      ] = await Promise.all([
        prisma.preset.count({ where: { userId: userIdInt } }),
        prisma.like.count({ where: { userId: userIdInt } }),
        prisma.favorite.count({ where: { userId: userIdInt } }),
        prisma.downloadHistory.count({ where: { userId: userIdInt } }),
        prisma.donation.aggregate({
          where: { creatorId: userIdInt },
          _sum: { amount: true }
        })
      ])

      return NextResponse.json({
        success: true,
        data: {
          presetsCount,
          likesCount,
          favoritesCount,
          downloadsCount,
          receivedDonations: receivedDonations._sum.amount || 0
        }
      })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid stats type' },
      { status: 400 }
    )
  } catch (error: any) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
