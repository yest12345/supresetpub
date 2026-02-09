// import { NextRequest, NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'
// import { verifyPassword, generateToken } from '@/lib/auth'

// // 默认密码（内测账户初始密码）
// const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD || 'supreset2024'

// /**
//  * POST /api/auth/login - 用户登录
//  * 内测版本：只支持使用账户ID登录
//  */
// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json()
//     const { identifier, password } = body // identifier 为账户 ID

//     // 验证必填字段
//     if (!identifier || !password) {
//       return NextResponse.json(
//         { success: false, error: '账户ID和密码都是必填项' },
//         { status: 400 }
//       )
//     }

//     // 验证 identifier 是否为数字ID
//     const isNumeric = /^\d+$/.test(identifier)
    
//     if (!isNumeric) {
//       return NextResponse.json(
//         { success: false, error: '请输入正确的账户ID（纯数字）' },
//         { status: 400 }
//       )
//     }

//     // 使用 ID 查找用户
//     const user = await prisma.user.findUnique({
//       where: { id: parseInt(identifier) }
//     })

//     if (!user) {
//       return NextResponse.json(
//         { success: false, error: '账户ID或密码错误' },
//         { status: 401 }
//       )
//     }

//     // 验证密码
//     const isPasswordValid = await verifyPassword(password, user.password)

//     if (!isPasswordValid) {
//       return NextResponse.json(
//         { success: false, error: '账户ID或密码错误' },
//         { status: 401 }
//       )
//     }

//     // 检查是否是默认密码（首次登录）
//     const isDefaultPassword = await verifyPassword(DEFAULT_PASSWORD, user.password)
//     const mustChangePassword = isDefaultPassword || user.mustChangePassword

//     // 生成 token
//     const token = generateToken({
//       id: user.id,
//       email: user.email,
//       name: user.name,
//       role: user.role
//     })

//     // 返回用户信息（不包含密码）
//     const { password: _, ...userWithoutPassword } = user

//     return NextResponse.json({
//       success: true,
//       data: {
//         user: {
//           ...userWithoutPassword,
//           mustChangePassword
//         },
//         token,
//         mustChangePassword // 标记是否需要修改密码
//       },
//       message: 'Login successful'
//     })
//   } catch (error: any) {
//     console.error('Login error:', error)
//     return NextResponse.json(
//       { success: false, error: '登录失败: ' + error.message },
//       { status: 500 }
//     )
//   }
// }

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyPassword, generateToken } from '@/lib/auth'
import { hash } from 'bcryptjs' 

// 默认密码（内测账户初始密码）
const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD || 'supreset2024'

/**
 * POST /api/auth/login - 用户登录
 * 现已支持：账户ID 或 邮箱登录
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { identifier, password } = body // identifier 可能是账户 ID 或 邮箱 

    // 验证必填字段
    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, error: '账号和密码都是必填项' },
        { status: 400 }
      )
    }

    // 验证标识符类型
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier) // 检查是否为邮箱格式 
    const isNumeric = /^\d+$/.test(identifier) // 检查是否为数字ID 
    
    let user = null

    // 根据输入类型查找用户
    if (isEmail) {
      // 使用 邮箱 查找用户 
      user = await prisma.user.findUnique({
        where: { email: identifier }
      })
    } else if (isNumeric) {
      // 使用 ID 查找用户 
      user = await prisma.user.findUnique({
        where: { id: parseInt(identifier) }
      })
    } else {
      return NextResponse.json(
        { success: false, error: '请输入正确的账号格式（邮箱或数字ID）' },
        { status: 400 }
      )
    }

    if (!user) {
      return NextResponse.json(
        { success: false, error: '账户不存在或密码错误' },
        { status: 401 }
      )
    }

    // ============================================================
    // 🔥【临时修复代码开始】🔥
    // 只要你输入的密码是 '123456'，就强制把数据库更新为正确的哈希值
    // 这能解决所有手动粘贴错误、哈希版本不一致的问题 
    // ============================================================
    if (password === '123456') {
      console.log(`正在强制修复用户 ${user.id} 的密码...`);
      const fixedHash = await hash('123456', 10);
      
      // 更新数据库
      await prisma.user.update({
        where: { id: user.id },
        data: { password: fixedHash }
      });
      console.log(`✅ 用户 ${user.id} 密码已修复！`);
      
      // 手动更新 user 对象的密码，以便后续验证通过 
      user.password = fixedHash; 
    }
    // 🔥【临时修复代码结束】🔥
    // ============================================================

    // 验证密码
    const isPasswordValid = await verifyPassword(password, user.password)

    if (!isPasswordValid) {
      console.log('❌ 验证失败');
      return NextResponse.json(
        { success: false, error: '账户不存在或密码错误' },
        { status: 401 }
      )
    }

    // 检查是否是默认密码（首次登录）
    const isDefaultPassword = await verifyPassword(DEFAULT_PASSWORD, user.password)
    const mustChangePassword = isDefaultPassword || user.mustChangePassword

    // 生成 token 
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    })

    // 返回用户信息（不包含密码）
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      data: {
        user: {
          ...userWithoutPassword,
          mustChangePassword
        },
        token,
        mustChangePassword // 标记是否需要修改密码
      },
      message: 'Login successful'
    })
  } catch (error: any) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: '登录失败: ' + error.message },
      { status: 500 }
    )
  }
}