import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/comments - 获取评论列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const presetId = searchParams.get('presetId')
    const userId = searchParams.get('userId')
    const parentId = searchParams.get('parentId')

    const where: any = {}
    if (presetId) where.presetId = parseInt(presetId)
    if (userId) where.userId = parseInt(userId)
    if (parentId) {
      where.parentId = parentId === 'null' ? null : parseInt(parentId)
    }

    const comments = await prisma.comment.findMany({
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
            title: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ success: true, data: comments })
  } catch (error: any) {
    console.error('Error fetching comments:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// POST /api/comments - 创建评论
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content, presetId, userId, parentId } = body

    if (!content || !presetId || !userId) {
      return NextResponse.json(
        { success: false, error: 'content, presetId and userId are required' },
        { status: 400 }
      )
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        presetId,
        userId,
        parentId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    })

    // 创建通知给预设作者
    const preset = await prisma.preset.findUnique({
      where: { id: presetId },
      select: { userId: true, title: true }
    })

    if (preset && preset.userId !== userId) {
      await prisma.notification.create({
        data: {
          userId: preset.userId,
          title: '新评论',
          content: `有人评论了你的预设「${preset.title}」`,
          link: `/presets/${presetId}`,
          type: 'comment'
        }
      })
    }

    return NextResponse.json({ success: true, data: comment }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating comment:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
