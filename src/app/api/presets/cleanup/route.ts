import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/presets/cleanup - 清理超过7天的软删除记录（定时任务调用）
export async function POST(request: NextRequest) {
  try {
    // TODO: 添加 API Key 验证，确保只有授权的定时任务可以调用
    // const apiKey = request.headers.get('x-api-key')
    // if (apiKey !== process.env.CLEANUP_API_KEY) {
    //   return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    // }

    // 计算7天前的时间
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    // 查找需要永久删除的预设
    const presetsToDelete = await prisma.preset.findMany({
      where: {
        deletedAt: {
          not: null,
          lt: sevenDaysAgo // 删除时间超过7天
        }
      },
      select: {
        id: true,
        title: true,
        deletedAt: true
      }
    })

    // 永久删除这些预设
    const result = await prisma.preset.deleteMany({
      where: {
        deletedAt: {
          not: null,
          lt: sevenDaysAgo
        }
      }
    })

    console.log(`🗑️ 清理完成: 永久删除了 ${result.count} 个超过7天的软删除记录`)
    console.log('已删除的预设:', presetsToDelete.map(p => `${p.title} (ID: ${p.id})`))

    return NextResponse.json({
      success: true,
      message: `Cleaned up ${result.count} presets`,
      deletedPresets: presetsToDelete
    })
  } catch (error: any) {
    console.error('Error cleaning up deleted presets:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
