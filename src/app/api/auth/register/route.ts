import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, generateToken } from '@/lib/auth'
import { formatZodError, registerSchema } from '@/lib/validations/auth'

/**
 * POST /api/auth/register - 用户注册
 * 入参：用户名 + 密码（+ 可选确认密码）
 */
export const runtime = 'nodejs'

const userSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  avatar: true,
  bio: true,
  createdAt: true,
  mustChangePassword: true
} as const

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = registerSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: formatZodError(parsed.error) },
        { status: 400 }
      )
    }

    const { name, password } = parsed.data

    // #region agent log
    fetch('http://127.0.0.1:7326/ingest/e817ea01-bad5-4725-806f-3cb2badf1854',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'10f942'},body:JSON.stringify({sessionId:'10f942',runId:'pre-fix',hypothesisId:'B',location:'register/route.ts:parse',message:'register parsed',data:{nameLen:name.length,hasPassword:Boolean(password)},timestamp:Date.now()})}).catch(()=>{});
    // #endregion

    const existingUser = await prisma.user.findUnique({
      where: { name }
    })

    // #region agent log
    fetch('http://127.0.0.1:7326/ingest/e817ea01-bad5-4725-806f-3cb2badf1854',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'10f942'},body:JSON.stringify({sessionId:'10f942',runId:'pre-fix',hypothesisId:'B',location:'register/route.ts:findUnique',message:'name lookup',data:{found:Boolean(existingUser)},timestamp:Date.now()})}).catch(()=>{});
    // #endregion

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: '该用户名已被使用，请换一个用户名' },
        { status: 400 }
      )
    }

    const hashedPassword = await hashPassword(password)

    // #region agent log
    fetch('http://127.0.0.1:7326/ingest/e817ea01-bad5-4725-806f-3cb2badf1854',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'10f942'},body:JSON.stringify({sessionId:'10f942',runId:'pre-fix',hypothesisId:'A',location:'register/route.ts:beforeCreate',message:'about to create user without email',data:{createKeys:['name','password','role','mustChangePassword'],hashLen:hashedPassword.length},timestamp:Date.now()})}).catch(()=>{});
    // #endregion

    const user = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        role: 'user',
        mustChangePassword: false
      },
      select: userSelect
    })

    // #region agent log
    fetch('http://127.0.0.1:7326/ingest/e817ea01-bad5-4725-806f-3cb2badf1854',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'10f942'},body:JSON.stringify({sessionId:'10f942',runId:'pre-fix',hypothesisId:'D',location:'register/route.ts:afterCreate',message:'user created',data:{userId:user.id,emailIsNull:user.email==null},timestamp:Date.now()})}).catch(()=>{});
    // #endregion

    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    })

    return NextResponse.json(
      {
        success: true,
        data: {
          user,
          token,
          mustChangePassword: user.mustChangePassword
        },
        message: '注册成功'
      },
      { status: 201 }
    )
  } catch (error: unknown) {
    console.error('Registration error:', error)
    // #region agent log
    fetch('http://127.0.0.1:7326/ingest/e817ea01-bad5-4725-806f-3cb2badf1854',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'10f942'},body:JSON.stringify({sessionId:'10f942',runId:'pre-fix',hypothesisId:'A',location:'register/route.ts:catch',message:'register threw',data:{errName:error instanceof Error?error.name:'unknown',errMessage:error instanceof Error?error.message:String(error),code:error&&typeof error==='object'&&'code' in error?(error as {code:unknown}).code:undefined,meta:error&&typeof error==='object'&&'meta' in error?(error as {meta:unknown}).meta:undefined},timestamp:Date.now()})}).catch(()=>{});
    // #endregion

    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'P2002'
    ) {
      return NextResponse.json(
        { success: false, error: '用户名已存在，请更换后重试' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: '注册失败，请稍后重试' },
      { status: 500 }
    )
  }
}
