import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/tags - 获取所有标签
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const popular = searchParams.get('popular') === 'true'

    if (popular) {
      // 获取热门标签（按使用次数排序）
      const tags = await prisma.tag.findMany({
        include: {
          _count: {
            select: { presets: true }
          }
        },
        orderBy: {
          presets: {
            _count: 'desc'
          }
        },
        take: 20
      })

      return NextResponse.json({ success: true, data: tags })
    }

    // 获取所有标签
    const tags = await prisma.tag.findMany({
      include: {
        _count: {
          select: { presets: true }
        }
      },
      orderBy: { name: 'asc' }
    })

    return NextResponse.json({ success: true, data: tags })
  } catch (error: any) {
    console.error('Error fetching tags:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// POST /api/tags - 创建标签
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name } = body

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'name is required' },
        { status: 400 }
      )
    }

    const tag = await prisma.tag.create({
      data: { name }
    })

    return NextResponse.json({ success: true, data: tag }, { status: 201 })
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: 'Tag already exists' },
        { status: 400 }
      )
    }
    console.error('Error creating tag:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
