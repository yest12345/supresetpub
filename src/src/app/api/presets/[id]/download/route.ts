import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken, extractToken } from '@/lib/auth'

// POST /api/presets/[id]/download - 记录下载并增加计数（需要登录）
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // 验证用户登录状态
  const authHeader = request.headers.get('authorization');
  const token = extractToken(authHeader);
  
  if (!token) {
    return NextResponse.json(
      { success: false, error: '请先登录后再下载预设' },
      { status: 401 }
    );
  }

  const user = verifyToken(token);
  if (!user) {
    return NextResponse.json(
      { success: false, error: '登录已过期，请重新登录' },
      { status: 401 }
    );
  }

  try {
    const { id } = await params
    const presetId = parseInt(id)
    const userId = user.id

    // 获取 IP 地址
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'

    // 检查该用户是否已经下载过此预设
    const existingDownload = await prisma.downloadHistory.findFirst({
      where: {
        userId,
        presetId
      }
    });

    let download;
    let shouldIncrement = false;

    if (existingDownload) {
      // 用户已下载过，不创建新记录，不增加计数
      download = existingDownload;
      console.log(`✅ 用户 ${userId} 已下载过预设 ${presetId}，跳过计数`);
    } else {
      // 首次下载，创建记录并增加计数
      shouldIncrement = true;
      download = await prisma.downloadHistory.create({
        data: {
          userId,
          presetId,
          ipAddress
        }
      });
      console.log(`✅ 用户 ${userId} 首次下载预设 ${presetId}，记录下载`);
    }

    // 如果是首次下载，增加计数
    const preset = shouldIncrement 
      ? await prisma.preset.update({
          where: { id: presetId },
          data: {
            downloads: {
              increment: 1
            }
          },
          select: {
            id: true,
            title: true,
            filePath: true,
            downloads: true
          }
        })
      : await prisma.preset.findUnique({
          where: { id: presetId },
          select: {
            id: true,
            title: true,
            filePath: true,
            downloads: true
          }
        });

    if (!preset) {
      return NextResponse.json(
        { success: false, error: '预设不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        download,
        preset,
        isFirstDownload: shouldIncrement
      }
    })
  } catch (error: any) {
    console.error('Error recording download:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// GET /api/presets/[id]/download - 获取下载记录
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const presetId = parseInt(id)
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const skip = (page - 1) * limit

    const [downloads, total] = await Promise.all([
      prisma.downloadHistory.findMany({
        where: { presetId },
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.downloadHistory.count({ where: { presetId } })
    ])

    return NextResponse.json({
      success: true,
      data: downloads,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error: any) {
    console.error('Error fetching downloads:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
