import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/middleware'

// GET /api/presets/[id] - 获取预设详情
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const presetId = parseInt(id)

    const preset = await prisma.preset.findFirst({
      where: { 
        id: presetId,
        deletedAt: null // 只返回未删除的预设
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
            bio: true
          }
        },
        tags: {
          include: {
            tag: true
          }
        },
        comments: {
          where: { parentId: null },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        _count: {
          select: {
            comments: true,
            likes: true,
            favorites: true,
            downloadsLog: true
          }
        }
      }
    })

    if (!preset) {
      return NextResponse.json(
        { success: false, error: 'Preset not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: preset })
  } catch (error: any) {
    console.error('Error fetching preset:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// PUT /api/presets/[id] - 更新预设（需要登录且是作者）
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // 验证用户身份
  const authResult = await requireAuth(request)
  if (authResult instanceof NextResponse) return authResult
  const { user: authUser } = authResult

  try {
    const { id } = await params
    const presetId = parseInt(id)
    
    // 检查预设是否存在且用户是作者
    const existingPreset = await prisma.preset.findFirst({
      where: { 
        id: presetId,
        deletedAt: null
      },
      select: { userId: true }
    });
    
    if (!existingPreset) {
      return NextResponse.json(
        { success: false, error: '预设不存在或已被删除' },
        { status: 404 }
      );
    }
    
    if (existingPreset.userId !== authUser.id) {
      return NextResponse.json(
        { success: false, error: '您没有权限编辑此预设' },
        { status: 403 }
      );
    }
    
    const body = await request.json()
    const {
      title,
      description,
      filePath,
      fileSize,
      files,
      coverImage,
      previewAudio,
      isPublic,
      tags
    } = body

    const updateData: any = {
      ...(title && { title }),
      ...(description !== undefined && { description }),
      ...(filePath && { filePath }),
      ...(fileSize !== undefined && { fileSize }),
      ...(files !== undefined && { files }),
      ...(coverImage !== undefined && { coverImage }),
      ...(previewAudio !== undefined && { previewAudio }),
      ...(isPublic !== undefined && { isPublic })
    }

    // 如果更新标签，先删除旧的，再添加新的
    if (tags) {
      await prisma.tagOnPreset.deleteMany({
        where: { presetId }
      })

      updateData.tags = {
        create: tags.map((tagName: string) => ({
          tag: {
            connectOrCreate: {
              where: { name: tagName },
              create: { name: tagName }
            }
          }
        }))
      }
    }

    const preset = await prisma.preset.update({
      where: { id: presetId },
      data: updateData,
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

    return NextResponse.json({ success: true, data: preset })
  } catch (error: any) {
    console.error('Error updating preset:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// DELETE /api/presets/[id] - 删除预设
export async function DELETE(
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

    // 获取预设信息
    const preset = await prisma.preset.findUnique({
      where: { id: presetId }
    })

    if (!preset) {
      return NextResponse.json(
        { success: false, error: 'Preset not found' },
        { status: 404 }
      )
    }

    // 验证权限：只有作者可以删除
    if (preset.userId !== authUser.id) {
      return NextResponse.json(
        { success: false, error: 'You do not have permission to delete this preset' },
        { status: 403 }
      )
    }

    // 软删除：设置 deletedAt 时间戳（保留7天可恢复）
    await prisma.preset.update({
      where: { id: presetId },
      data: {
        deletedAt: new Date()
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Preset moved to trash, can be recovered within 7 days'
    })
  } catch (error: any) {
    console.error('Error deleting preset:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
