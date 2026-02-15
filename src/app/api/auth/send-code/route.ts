import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'
import { getMailerTransport, getFromAddress } from '@/lib/mailer'

export const runtime = 'nodejs'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const CODE_TTL_SECONDS = Number(process.env.EMAIL_CODE_TTL_SECONDS || 300)
const CODE_COOLDOWN_SECONDS = Number(process.env.EMAIL_CODE_COOLDOWN_SECONDS || 60)

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email = String(body?.email || '').trim().toLowerCase()

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, error: '邮箱格式不正确' },
        { status: 400 }
      )
    }

    const existing = await prisma.emailVerificationCode.findUnique({
      where: { email }
    })

    if (existing) {
      const elapsedSeconds = Math.floor(
        (Date.now() - existing.lastSentAt.getTime()) / 1000
      )

      if (elapsedSeconds < CODE_COOLDOWN_SECONDS) {
        return NextResponse.json(
          {
            success: false,
            error: `发送过于频繁，请 ${CODE_COOLDOWN_SECONDS - elapsedSeconds}s 后再试`
          },
          { status: 429 }
        )
      }
    }

    const code = generateCode()
    const codeHash = await hashPassword(code)
    const expiresAt = new Date(Date.now() + CODE_TTL_SECONDS * 1000)
    const lastSentAt = new Date()

    const transport = getMailerTransport()
    const from = getFromAddress()

    await transport.sendMail({
      from,
      to: email,
      subject: 'Supreset 登录验证码',
      text: `你的验证码是：${code}，5 分钟内有效。`,
      html: `<p>你的验证码是：<b>${code}</b></p><p>5 分钟内有效，请勿泄露。</p>`
    })

    await prisma.emailVerificationCode.upsert({
      where: { email },
      update: {
        codeHash,
        expiresAt,
        lastSentAt,
        attempts: 0
      },
      create: {
        email,
        codeHash,
        expiresAt,
        lastSentAt,
        attempts: 0
      }
    })

    return NextResponse.json({ success: true, message: '验证码已发送' })
  } catch (error: unknown) {
    console.error('Send code error:', error)
    const message = error instanceof Error ? error.message : '未知错误'

    return NextResponse.json(
      { success: false, error: `发送验证码失败: ${message}` },
      { status: 500 }
    )
  }
}
