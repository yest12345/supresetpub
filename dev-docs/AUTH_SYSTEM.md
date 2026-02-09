# 🔐 用户认证系统文档

## 功能概述

实现了完整的用户注册、登录和认证系统，包括：

- ✅ 用户注册（密码 bcrypt 加密）
- ✅ 用户登录（JWT Token 认证）
- ✅ 自动登录状态保持（Cookie 存储）
- ✅ 认证中间件（保护 API 端点）
- ✅ 前端认证上下文（全局用户状态管理）
- ✅ 登录/注册模态框组件
- ✅ Navbar 用户状态显示

## 技术栈

### 后端
- **bcryptjs** - 密码加密
- **jsonwebtoken** - JWT Token 生成和验证
- **Next.js API Routes** - RESTful API

### 前端
- **React Context** - 全局状态管理
- **js-cookie** - Cookie 操作
- **React Hooks** - 状态和副作用管理

## API 端点

### 1. 用户注册

**POST** `/api/auth/register`

请求体：
```json
{
  "name": "用户名",
  "email": "user@example.com",
  "password": "至少6个字符"
}
```

响应：
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "用户名",
      "email": "user@example.com",
      "role": "user",
      "avatar": null,
      "createdAt": "2025-11-10T..."
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Registration successful"
}
```

### 2. 用户登录

**POST** `/api/auth/login`

请求体：
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

响应：
```json
{
  "success": true,
  "data": {
    "user": { /* 用户信息 */ },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful"
}
```

### 3. 获取当前用户

**GET** `/api/auth/me`

请求头：
```
Authorization: Bearer <token>
```

响应：
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "用户名",
    "email": "user@example.com",
    "avatar": null,
    "bio": null,
    "role": "user",
    "createdAt": "2025-11-10T...",
    "updatedAt": "2025-11-10T...",
    "_count": {
      "presets": 5,
      "likes": 10,
      "favorites": 8,
      "comments": 15,
      "receivedDonations": 3
    }
  }
}
```

## 使用认证中间件

### 在 API 路由中使用

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/middleware'

export async function POST(request: NextRequest) {
  // 验证用户身份
  const authResult = await requireAuth(request)
  
  // 如果认证失败，返回错误响应
  if (authResult instanceof NextResponse) {
    return authResult
  }

  // 认证成功，获取用户信息
  const { user } = authResult
  
  // 使用用户信息进行操作
  console.log('当前用户:', user.name)
  
  // ... 你的业务逻辑
}
```

### 可选认证（支持匿名访问）

```typescript
import { optionalAuth } from '@/lib/middleware'

export async function GET(request: NextRequest) {
  // 尝试获取用户信息，但不强制要求登录
  const user = await optionalAuth(request)
  
  if (user) {
    console.log('已登录用户:', user.name)
  } else {
    console.log('匿名用户')
  }
  
  // ... 你的业务逻辑
}
```

### 管理员权限验证

```typescript
import { requireAuth, requireAdmin } from '@/lib/middleware'

export async function DELETE(request: NextRequest) {
  const authResult = await requireAuth(request)
  if (authResult instanceof NextResponse) return authResult
  
  const { user } = authResult
  
  // 验证管理员权限
  const adminError = requireAdmin(user)
  if (adminError) return adminError
  
  // 只有管理员能执行到这里
  // ... 管理员操作
}
```

## 前端使用

### 1. 使用 AuthContext

```typescript
import { useAuth } from '@/contexts/AuthContext'

function MyComponent() {
  const { user, token, loading, login, register, logout } = useAuth()
  
  if (loading) {
    return <div>加载中...</div>
  }
  
  if (user) {
    return (
      <div>
        <p>欢迎，{user.name}！</p>
        <button onClick={logout}>退出登录</button>
      </div>
    )
  }
  
  return <button onClick={() => login('user@example.com', 'password')}>登录</button>
}
```

### 2. 在 API 请求中使用 Token

```typescript
const { token } = useAuth()

const response = await fetch('/api/some-protected-endpoint', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ /* 数据 */ })
})
```

### 3. 保护页面路由

```typescript
'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  
  useEffect(() => {
    if (!loading && !user) {
      router.push('/') // 未登录则跳转到首页
    }
  }, [user, loading, router])
  
  if (loading) return <div>加载中...</div>
  if (!user) return null
  
  return <div>受保护的内容</div>
}
```

## 安全特性

### 1. 密码安全
- ✅ 使用 bcrypt 加密，默认 10 轮 salt
- ✅ 密码不会在 API 响应中返回
- ✅ 最小长度 6 个字符

### 2. Token 安全
- ✅ JWT Token 有效期 7 天
- ✅ Token 存储在 HttpOnly Cookie 中（推荐）
- ✅ 支持 Bearer Token 认证头

### 3. 输入验证
- ✅ 邮箱格式验证
- ✅ 密码长度验证
- ✅ 防止重复注册

## 环境变量配置

在 `.env` 文件中添加：

```env
# JWT 密钥（生产环境必须使用强随机字符串）
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
```

**生成强随机密钥**：
```bash
# 使用 OpenSSL
openssl rand -base64 32

# 或使用 Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## 文件结构

```
src/
├── lib/
│   ├── auth.ts              # 认证工具函数
│   └── middleware.ts        # 认证中间件
├── contexts/
│   └── AuthContext.tsx      # 认证上下文
├── components/
│   ├── Navbar.tsx           # 导航栏（含用户状态）
│   └── AuthModal.tsx        # 登录/注册模态框
└── app/
    └── api/
        └── auth/
            ├── register/route.ts   # 注册 API
            ├── login/route.ts      # 登录 API
            └── me/route.ts         # 获取当前用户 API
```

## 测试认证系统

### 使用 curl 测试

```bash
# 1. 注册新用户
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# 2. 登录
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# 3. 获取当前用户（使用返回的 token）
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 在浏览器中测试

1. 访问网站首页
2. 点击右上角"登录 / 注册"按钮
3. 切换到"注册"标签
4. 填写信息并提交
5. 注册成功后自动登录
6. 查看右上角显示用户信息

## 下一步改进

### 优先级 P0
- [ ] 邮箱验证（发送验证邮件）
- [ ] 忘记密码功能
- [ ] 刷新 Token 机制

### 优先级 P1
- [ ] 第三方登录（Google, GitHub）
- [ ] 双因素认证（2FA）
- [ ] 登录历史记录

### 优先级 P2
- [ ] 账号锁定（多次登录失败）
- [ ] IP 白名单/黑名单
- [ ] 会话管理（多设备登录）

## 常见问题

### Q: Token 存储在哪里？
A: Token 存储在浏览器 Cookie 中，有效期 7 天。

### Q: 如何退出登录？
A: 调用 `logout()` 函数会清除 Cookie 和用户状态。

### Q: 如何保护 API 端点？
A: 在 API 路由中使用 `requireAuth` 中间件。

### Q: 密码是如何加密的？
A: 使用 bcryptjs 进行单向加密，无法解密。

### Q: Token 过期后会怎样？
A: 过期 Token 会被认证中间件拒绝，需要重新登录。

## 总结

认证系统已完整实现，包括：

1. ✅ 安全的密码存储（bcrypt）
2. ✅ JWT Token 认证
3. ✅ 前端全局状态管理
4. ✅ 认证中间件保护 API
5. ✅ 用户友好的登录/注册界面

系统可以立即投入使用！🎉
