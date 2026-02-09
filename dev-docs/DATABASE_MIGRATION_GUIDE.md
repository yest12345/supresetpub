# 数据库配置与迁移工作流指南

本文档说明如何配置数据库，确保每次版本迭代都能顺利迁移。

## 📋 目录

1. [数据库配置](#数据库配置)
2. [迁移工作流](#迁移工作流)
3. [开发环境操作](#开发环境操作)
4. [生产环境操作](#生产环境操作)
5. [常见问题](#常见问题)

---

## 一、数据库配置

### 1.1 创建数据库和用户

在 MySQL 中执行：

```sql
-- 创建数据库（如果不存在）
CREATE DATABASE IF NOT EXISTS supreset 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

-- 创建用户（如果不存在）
CREATE USER IF NOT EXISTS 'supreset_user'@'localhost' 
  IDENTIFIED BY 'your_strong_password';

-- 授予权限
GRANT ALL PRIVILEGES ON supreset.* TO 'supreset_user'@'localhost';
FLUSH PRIVILEGES;

-- 验证
SHOW DATABASES;
SELECT user, host FROM mysql.user WHERE user = 'supreset_user';
```

### 1.2 配置 .env 文件

在项目根目录创建 `.env` 文件：

```env
# 数据库连接（必须配置）
# 格式: mysql://用户名:密码@主机:端口/数据库名
DATABASE_URL="mysql://supreset_user:your_strong_password@localhost:3306/supreset"

# JWT 密钥（必须配置，生产环境使用强随机字符串）
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# 环境变量
NODE_ENV="production"

# Next.js 公共 URL
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

**重要提示：**
- `.env` 文件**不要**提交到 Git（已在 `.gitignore` 中）
- 生产环境使用强密码
- 定期更换 JWT_SECRET

### 1.3 验证数据库连接

```bash
# 测试数据库连接
npx dotenv -e .env -- npx prisma db pull

# 或使用 MySQL 客户端
mysql -u supreset_user -p supreset
```

---

## 二、迁移工作流

### 2.1 Prisma 迁移原理

Prisma Migrate 使用迁移文件来管理数据库结构变更：

```
prisma/
  migrations/
    20251105102448/        # 迁移时间戳
      migration.sql        # SQL 迁移文件
    migration_lock.toml   # 锁定文件（确保迁移顺序）
```

**关键原则：**
- ✅ 迁移文件必须提交到 Git
- ✅ 生产环境只应用已有迁移，不创建新迁移
- ✅ 开发环境创建迁移，生产环境应用迁移

### 2.2 迁移命令对比

| 命令 | 用途 | 环境 | 是否创建迁移文件 |
|------|------|------|----------------|
| `prisma migrate dev` | 创建并应用迁移 | 开发 | ✅ 是 |
| `prisma migrate deploy` | 仅应用已有迁移 | 生产 | ❌ 否 |
| `prisma db push` | 直接同步 schema | 原型/测试 | ❌ 否 |

---

## 三、开发环境操作

### 3.1 修改数据库结构

当你需要修改数据库结构时：

```bash
# 1. 编辑 prisma/schema.prisma
# 例如：添加新字段、新表等

# 2. 创建迁移
npm run prisma:migrate
# 或
npx dotenv -e .env -- prisma migrate dev

# 3. 输入迁移名称（例如：add_user_avatar_field）
# Prisma 会自动：
#   - 生成迁移文件到 prisma/migrations/
#   - 应用迁移到数据库
#   - 重新生成 Prisma Client
```

### 3.2 检查迁移文件

```bash
# 查看迁移历史
ls -la prisma/migrations/

# 查看迁移文件内容
cat prisma/migrations/最新目录/migration.sql
```

### 3.3 提交到 Git

```bash
# 提交 schema 和迁移文件
git add prisma/schema.prisma
git add prisma/migrations/
git commit -m "feat: 添加用户头像字段"
git push gitlab main
```

**重要：迁移文件必须提交到 Git！**

---

## 四、生产环境操作

### 4.1 一键部署（推荐）

使用部署脚本，自动处理所有步骤：

```bash
cd /var/www/supreset@SODA/nextjs-mysql
bash scripts/deploy-production.sh
```

脚本会自动：
1. 拉取最新代码（包含新迁移文件）
2. 安装依赖
3. 生成 Prisma Client
4. **应用数据库迁移**（`prisma migrate deploy`）
5. 构建项目
6. 重启应用

### 4.2 手动部署步骤

如果需要手动操作：

```bash
# 1. 进入项目目录
cd /var/www/supreset@SODA/nextjs-mysql

# 2. 拉取最新代码
git pull gitlab main

# 3. 安装依赖
npm install

# 4. 生成 Prisma Client
npx prisma generate

# 5. 应用数据库迁移（关键步骤）
npx dotenv -e .env -- npx prisma migrate deploy

# 6. 构建项目
npm run build

# 7. 重启应用
pm2 restart supreset
```

### 4.3 检查迁移状态

```bash
# 查看迁移状态
npx dotenv -e .env -- npx prisma migrate status

# 应该显示：
# Database schema is up to date!
# 或
# X migrations have been applied
```

---

## 五、版本迭代标准流程

### 5.1 开发阶段

```bash
# 1. 修改 prisma/schema.prisma
# 例如：添加新表、新字段等

# 2. 创建迁移
npm run prisma:migrate
# 输入迁移名称：add_notification_table

# 3. 测试迁移
# 在开发环境测试，确保迁移正常

# 4. 提交代码
git add prisma/schema.prisma
git add prisma/migrations/
git commit -m "feat: 添加通知表"
git push gitlab main
```

### 5.2 生产部署

```bash
# 在 ECS 服务器上执行
cd /var/www/supreset@SODA/nextjs-mysql

# 一键部署（推荐）
bash scripts/deploy-production.sh

# 或手动执行
git pull gitlab main
npm install
npx prisma generate
npx dotenv -e .env -- npx prisma migrate deploy
npm run build
pm2 restart supreset
```

---

## 六、常见问题

### 6.1 迁移失败怎么办？

```bash
# 1. 查看迁移状态
npx dotenv -e .env -- npx prisma migrate status

# 2. 查看迁移历史
npx dotenv -e .env -- npx prisma migrate resolve --applied 迁移名称

# 3. 手动修复数据库后，标记迁移为已应用
npx dotenv -e .env -- npx prisma migrate resolve --applied 迁移名称
```

### 6.2 数据库结构不同步？

```bash
# 1. 检查当前数据库结构
npx dotenv -e .env -- npx prisma db pull

# 2. 查看差异
npx dotenv -e .env -- npx prisma migrate diff

# 3. 创建新迁移同步
npx dotenv -e .env -- npx prisma migrate dev --name sync_database
```

### 6.3 回滚迁移（仅开发环境）

```bash
# 开发环境可以重置数据库
npx dotenv -e .env -- npx prisma migrate reset

# ⚠️ 警告：这会删除所有数据！
# 生产环境不要使用此命令
```

### 6.4 迁移文件冲突

如果多人同时修改 schema：

```bash
# 1. 拉取最新代码
git pull gitlab main

# 2. 如果有冲突，解决冲突
# 3. 创建新迁移合并变更
npx dotenv -e .env -- npx prisma migrate dev --name merge_conflicts
```

---

## 七、最佳实践

### ✅ 推荐做法

1. **每次修改 schema 都创建迁移**
   ```bash
   npm run prisma:migrate
   ```

2. **迁移文件必须提交到 Git**
   ```bash
   git add prisma/migrations/
   git commit -m "feat: 数据库迁移"
   ```

3. **生产环境使用 `migrate deploy`**
   ```bash
   npx dotenv -e .env -- npx prisma migrate deploy
   ```

4. **部署前检查迁移状态**
   ```bash
   npx dotenv -e .env -- npx prisma migrate status
   ```

5. **定期备份数据库**
   ```bash
   mysqldump -u supreset_user -p supreset > backup_$(date +%Y%m%d).sql
   ```

### ❌ 避免的做法

1. **不要在生产环境使用 `migrate dev`**
   - 会创建新迁移文件，破坏版本控制

2. **不要使用 `db push` 在生产环境**
   - 不会创建迁移历史，无法追踪变更

3. **不要手动修改数据库结构**
   - 应该通过 Prisma schema 和迁移来管理

4. **不要删除已应用的迁移文件**
   - 会导致迁移历史不一致

---

## 八、迁移检查清单

每次部署前检查：

- [ ] `.env` 文件已配置 `DATABASE_URL`
- [ ] 数据库连接正常
- [ ] 迁移文件已提交到 Git
- [ ] 本地测试迁移成功
- [ ] 生产环境使用 `migrate deploy`
- [ ] 部署后验证迁移状态
- [ ] 应用正常运行

---

## 九、快速参考

### 开发环境

```bash
# 创建迁移
npm run prisma:migrate

# 生成 Client
npm run prisma:generate

# 查看数据库（GUI）
npm run prisma:studio
```

### 生产环境

```bash
# 一键部署（推荐）
bash scripts/deploy-production.sh

# 或手动迁移
npx dotenv -e .env -- npx prisma migrate deploy

# 检查状态
npx dotenv -e .env -- npx prisma migrate status
```

---

## 十、总结

**核心原则：**
1. 开发环境：使用 `prisma migrate dev` 创建迁移
2. 生产环境：使用 `prisma migrate deploy` 应用迁移
3. 迁移文件：必须提交到 Git，确保版本控制
4. 数据库配置：通过 `.env` 文件管理，不提交到 Git

**标准流程：**
```
开发环境修改 schema 
  → 创建迁移 
  → 提交到 Git 
  → 生产环境拉取代码 
  → 应用迁移 
  → 部署完成
```

遵循以上流程，每次版本迭代都能顺利迁移！🎉



