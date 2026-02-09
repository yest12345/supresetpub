# 内测版本修改说明

## 📋 修改概述

项目已成功转换为内测版本，**禁止公开注册**，账户由管理员分配。

---

## ✅ 已完成的修改

### 1. 禁用注册 API
**文件**: `src/app/api/auth/register/route.ts`

- ✅ 注册接口已禁用，返回 403 错误
- ✅ 提示信息：`当前为内测版本，暂不开放注册。如需账户，请联系管理员分配。`
- ✅ 原代码保留在注释中，便于将来恢复

### 2. 修改登录界面
**文件**: `src/components/AuthModal.tsx`

- ✅ 移除了注册功能
- ✅ 移除了"切换模式"按钮
- ✅ 添加了内测版提示信息
- ✅ 界面只保留登录功能

### 3. 修改导航栏
**文件**: `src/components/Navbar.tsx`

- ✅ 将"登录 / 注册"改为"登录"
- ✅ 为管理员用户添加"用户管理"链接

### 4. 增强用户创建 API
**文件**: `src/app/api/users/route.ts`

- ✅ 添加管理员权限验证
- ✅ 添加密码加密（使用 bcrypt）
- ✅ 添加输入验证（邮箱格式、密码长度）
- ✅ 支持指定用户角色（user/admin）

### 5. 创建管理员界面
**文件**: `src/app/admin/users/page.tsx`

- ✅ 用户列表展示
- ✅ 创建新用户功能
- ✅ 管理员权限验证
- ✅ 美观的用户界面

---

## 🎯 使用方法

### 创建第一个管理员账户

由于注册功能已禁用，你需要通过数据库直接创建第一个管理员账户：

#### 方法 1: 使用 Prisma Studio
```bash
npm run prisma:studio
```

在 Prisma Studio 中：
1. 打开 `User` 表
2. 点击 "Add record"
3. 填写信息：
   - `name`: 管理员名称
   - `email`: 管理员邮箱
   - `password`: 需要先使用 bcrypt 加密（见下方）
   - `role`: `admin`
4. 保存

#### 方法 2: 使用数据库种子脚本

修改 `prisma/seed.ts`，添加管理员账户创建逻辑：

```typescript
import { hashPassword } from '../src/lib/auth'

// 在 seed 函数中添加
const adminPassword = await hashPassword('your-admin-password')
await prisma.user.create({
  data: {
    name: '管理员',
    email: 'admin@example.com',
    password: adminPassword,
    role: 'admin'
  }
})
```

然后运行：
```bash
npm run prisma:seed
```

#### 方法 3: 使用 SQL 直接插入（不推荐）

```sql
-- 注意：密码需要使用 bcrypt 加密
-- 可以使用 Node.js 生成：node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('your-password', 10).then(console.log)"
INSERT INTO users (name, email, password, role, created_at, updated_at)
VALUES ('管理员', 'admin@example.com', '$2a$10$...', 'admin', NOW(), NOW());
```

### 使用管理员界面创建用户

1. 使用管理员账户登录
2. 点击导航栏的"用户管理"
3. 点击"+ 创建新用户"按钮
4. 填写用户信息：
   - 用户名（必填）
   - 邮箱（必填）
   - 密码（必填，至少 6 个字符）
   - 角色（user 或 admin）
   - 简介（可选）
5. 点击"创建用户"

---

## 🔒 安全说明

### API 安全
- ✅ 注册 API 已完全禁用
- ✅ 用户创建 API 需要管理员权限
- ✅ 所有密码都使用 bcrypt 加密存储
- ✅ 输入验证已完善

### 权限控制
- ✅ 只有管理员可以访问 `/admin/users` 页面
- ✅ 只有管理员可以调用 `/api/users` POST 接口
- ✅ 非管理员用户会被重定向到首页

---

## 📝 注意事项

1. **第一个管理员账户**: 由于注册功能已禁用，第一个管理员账户需要通过数据库直接创建（见上方说明）

2. **密码加密**: 所有密码都必须使用 bcrypt 加密，不能直接存储明文密码

3. **恢复注册功能**: 如果需要恢复注册功能，可以：
   - 取消注释 `src/app/api/auth/register/route.ts` 中的代码
   - 恢复 `src/components/AuthModal.tsx` 中的注册功能
   - 恢复 `src/components/Navbar.tsx` 中的"注册"文字

4. **测试账户**: 建议创建几个测试账户用于内测

---

## 🚀 下一步建议

### 可选功能增强

1. **批量导入用户**
   - 支持 CSV 文件导入
   - 支持批量创建用户

2. **用户管理功能**
   - 编辑用户信息
   - 删除用户
   - 重置用户密码
   - 禁用/启用用户账户

3. **邀请码系统**
   - 生成邀请码
   - 使用邀请码注册（替代公开注册）

4. **邮件通知**
   - 新用户创建时发送欢迎邮件
   - 包含登录凭据

---

## 📞 联系信息

如有问题或需要帮助，请联系项目管理员。

---

**修改日期**: 2025-01-XX  
**版本**: 内测版 v1.0



