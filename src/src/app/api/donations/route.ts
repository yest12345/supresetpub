import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/donations - 获取打赏记录
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const donorId = searchParams.get('donorId')
    const creatorId = searchParams.get('creatorId')
    const presetId = searchParams.get('presetId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const where: any = {}
    if (donorId) where.donorId = parseInt(donorId)
    if (creatorId) where.creatorId = parseInt(creatorId)
    if (presetId) where.presetId = parseInt(presetId)

    const skip = (page - 1) * limit

    const [donations, total] = await Promise.all([
      prisma.donation.findMany({
        where,
        skip,
        take: limit,
        include: {
          donor: {
            select: {
              id: true,
              name: true,
              avatar: true
            }
          },
          creator: {
            select: {
              id: true,
              name: true,
              avatar: true
            }
          },
          preset: {
            select: {
              id: true,
              title: true,
              coverImage: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.donation.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: donations,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error: any) {
    console.error('Error fetching donations:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// POST /api/donations - 创建打赏
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency, donorId, creatorId, presetId, message } = body

    if (!amount || !donorId || !creatorId) {
      return NextResponse.json(
        { success: false, error: 'amount, donorId and creatorId are required' },
        { status: 400 }
      )
    }

    if (amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'amount must be positive' },
        { status: 400 }
      )
    }

    const donation = await prisma.donation.create({
      data: {
        amount,
        currency: currency || 'CNY',
        donorId,
        creatorId,
        presetId,
        message
      },
      include: {
        donor: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        },
        creator: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    })

    // 创建通知给创作者
    await prisma.notification.create({
      data: {
        userId: creatorId,
        title: '收到打赏',
        content: `${donation.donor.name} 打赏了你 ${amount / 100} 元`,
        link: presetId ? `/presets/${presetId}` : `/users/${donorId}`,
        type: 'donation'
      }
    })

    return NextResponse.json({ success: true, data: donation }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating donation:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
