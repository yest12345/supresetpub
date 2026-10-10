import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// JWT 密钥（生产环境应该从环境变量读取）
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production'
const JWT_EXPIRES_IN = '7d' // Token 有效期 7 天

// 用户数据接口
export interface UserPayload {
  id: number
  email: string
  name: string
  role: string
}

/**
 * 加密密码
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

/**
 * 验证密码
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

/**
 * 生成 JWT Token
 */
export function generateToken(user: UserPayload): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  )
}

/**
 * 验证 JWT Token
 */
export function verifyToken(token: string): UserPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserPayload
    return decoded
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}

/**
 * 从请求头中提取 Token
 */
export function extractToken(authHeader: string | null): string | null {
  if (!authHeader) return null
  
  // 支持 "Bearer token" 格式
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }
  
  return authHeader
}
