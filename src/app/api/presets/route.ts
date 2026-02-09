import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth, optionalAuth } from '@/lib/middleware'

// GET /api/presets - 获取预设列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const daw = searchParams.get('daw')
    const tag = searchParams.get('tag')
    const userId = searchParams.get('userId')
    const search = searchParams.get('search')
    const sort = searchParams.get('sort') || 'latest'

    const where: any = {
      isPublic: true,
      deletedAt: null // 只查询未删除的预设
    }

    if (daw) where.daw = daw
    if (userId) where.userId = parseInt(userId)
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } }
      ]
    }
    if (tag) {
      where.tags = {
        some: {
          tag: {
            name: tag
          }
        }
      }
    }

    const orderBy: any = {
      latest: { createdAt: 'desc' },
      popular: { downloads: 'desc' },
      liked: { likesCount: 'desc' }
    }[sort] || { createdAt: 'desc' }

    const skip = (page - 1) * limit

    const [presets, total] = await Promise.all([
      prisma.preset.findMany({
        where,
        skip,
        take: limit,
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
        orderBy
      }),
      prisma.preset.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: presets,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error: any) {
    console.error('Error fetching presets:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// POST /api/presets - 创建预设
export async function POST(request: NextRequest) {
  try {
    // 验证用户身份
    const authResult = await requireAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const { user: authUser } = authResult

    const body = await request.json()
    const {
      title,
      description,
      daw,
      format,
      filePath,
      fileSize,
      files, // 多个文件信息（预设包）
      coverImage,
      previewAudio,
      isPublic,
      userId,
      tags
    } = body

    if (!title || !daw || !format || !filePath) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // 使用认证用户ID，而不是客户端传入的userId（防止伪造）
    const finalUserId = authUser.id

    const preset = await prisma.preset.create({
      data: {
        title,
        description,
        daw,
        format,
        filePath,
        fileSize: fileSize || 0,
        files: files || null, // 存储多个文件信息
        coverImage,
        previewAudio,
        isPublic: isPublic !== undefined ? isPublic : true,
        userId: finalUserId,
        ...(tags && tags.length > 0 && {
          tags: {
            create: tags.map((tagName: string) => ({
              tag: {
                connectOrCreate: {
                  where: { name: tagName },
                  create: { name: tagName }
                }
              }
            }))
          }
        })
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
        }
      }
    })

    return NextResponse.json({ success: true, data: preset }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating preset:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
