import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/users/[id] - 获取用户详情
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const userId = parseInt(id)

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        bio: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            presets: {
              where: {
                deletedAt: null // 只统计未删除的预设
              }
            },
            likes: true,
            favorites: true,
            comments: true,
            receivedDonations: true
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: user })
  } catch (error: any) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// PUT /api/users/[id] - 更新用户信息
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const userId = parseInt(id)
    const body = await request.json()
    const { name, avatar, bio } = body

    // 如果要更新用户名，检查是否已被其他用户使用
    if (name) {
      const existingUser = await prisma.user.findFirst({
        where: {
          name,
          NOT: {
            id: userId // 排除当前用户
          }
        }
      })

      if (existingUser) {
        return NextResponse.json(
          { success: false, error: '该用户名已被使用，请选择其他名称' },
          { status: 400 }
        )
      }
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name && { name }),
        ...(avatar !== undefined && { avatar }),
        ...(bio !== undefined && { bio })
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        bio: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            presets: {
              where: {
                deletedAt: null // 只统计未删除的预设
              }
            },
            likes: true,
            favorites: true,
            comments: true,
            receivedDonations: true
          }
        }
      }
    })

    return NextResponse.json({ success: true, data: user })
  } catch (error: any) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// DELETE /api/users/[id] - 删除用户
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const userId = parseInt(id)

    await prisma.user.delete({
      where: { id: userId }
    })

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully'
    })
  } catch (error: any) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
