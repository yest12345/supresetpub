import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// DELETE /api/comments/[id] - 删除评论
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const commentId = parseInt(id)

    await prisma.comment.delete({
      where: { id: commentId }
    })

    return NextResponse.json({
      success: true,
      message: 'Comment deleted successfully'
    })
  } catch (error: any) {
    console.error('Error deleting comment:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// PUT /api/comments/[id] - 更新评论
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const commentId = parseInt(id)
    const body = await request.json()
    const { content } = body

    if (!content) {
      return NextResponse.json(
        { success: false, error: 'content is required' },
        { status: 400 }
      )
    }

    const comment = await prisma.comment.update({
      where: { id: commentId },
      data: { content },
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

    return NextResponse.json({ success: true, data: comment })
  } catch (error: any) {
    console.error('Error updating comment:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
