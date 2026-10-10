import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/middleware'

// POST /api/presets/[id]/restore - 恢复已删除的预设
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 验证用户身份
    const authResult = await requireAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const { user: authUser } = authResult
    const { id } = await params
    const presetId = parseInt(id)

    // 获取已删除的预设信息
    const preset = await prisma.preset.findUnique({
      where: { id: presetId }
    })

    if (!preset) {
      return NextResponse.json(
        { success: false, error: 'Preset not found' },
        { status: 404 }
      )
    }

    // 验证是否已删除
    if (!preset.deletedAt) {
      return NextResponse.json(
        { success: false, error: 'Preset is not deleted' },
        { status: 400 }
      )
    }

    // 验证权限：只有作者可以恢复
    if (preset.userId !== authUser.id) {
      return NextResponse.json(
        { success: false, error: 'You do not have permission to restore this preset' },
        { status: 403 }
      )
    }

    // 检查是否超过7天
    const deletedDate = new Date(preset.deletedAt)
    const now = new Date()
    const daysPassed = (now.getTime() - deletedDate.getTime()) / (1000 * 60 * 60 * 24)
    
    if (daysPassed > 7) {
      return NextResponse.json(
        { success: false, error: 'Preset cannot be recovered after 7 days' },
        { status: 410 }
      )
    }

    // 恢复预设：清除 deletedAt
    await prisma.preset.update({
      where: { id: presetId },
      data: {
        deletedAt: null
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Preset restored successfully'
    })
  } catch (error: any) {
    console.error('Error restoring preset:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
