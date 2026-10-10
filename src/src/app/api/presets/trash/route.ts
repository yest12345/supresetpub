import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/middleware'

// GET /api/presets/trash - 获取用户的已删除预设（回收站）
export async function GET(request: NextRequest) {
  try {
    // 验证用户身份
    const authResult = await requireAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const { user: authUser } = authResult

    // 计算7天前的时间
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    // 查询用户已删除但未超过7天的预设
    const deletedPresets = await prisma.preset.findMany({
      where: {
        userId: authUser.id,
        deletedAt: {
          not: null,
          gte: sevenDaysAgo // 删除时间在7天内
        }
      },
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
        },
        _count: {
          select: {
            comments: true,
            likes: true,
            favorites: true
          }
        }
      },
      orderBy: {
        deletedAt: 'desc' // 按删除时间降序排列
      }
    })

    // 计算每个预设的剩余天数
    const now = new Date()
    const presetsWithDaysLeft = deletedPresets.map(preset => ({
      ...preset,
      daysLeft: preset.deletedAt 
        ? Math.ceil(7 - (now.getTime() - new Date(preset.deletedAt).getTime()) / (1000 * 60 * 60 * 24))
        : 0
    }))

    return NextResponse.json({
      success: true,
      data: presetsWithDaysLeft
    })
  } catch (error: any) {
    console.error('Error fetching trash:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
