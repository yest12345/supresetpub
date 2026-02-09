# 数据库配置完整步骤（ECS 服务器）

本文档提供在 ECS 服务器上配置数据库的完整步骤。

## 📋 步骤概览

1. [登录 MySQL](#步骤-1-登录-mysql)
2. [创建数据库](#步骤-2-创建数据库)
3. [创建数据库用户](#步骤-3-创建数据库用户)
4. [授予权限](#步骤-4-授予权限)
5. [验证用户和数据库](#步骤-5-验证用户和数据库)
6. [配置 .env 文件](#步骤-6-配置-env-文件)
7. [测试数据库连接](#步骤-7-测试数据库连接)

---

## 步骤 1: 登录 MySQL

在 ECS 服务器上执行：

```bash
# 使用 root 用户登录 MySQL
sudo mysql -u root -p

# 或者如果 root 没有密码
sudo mysql -u root
```

输入 MySQL root 密码后，你会看到 MySQL 提示符：`mysql>`

---

## 步骤 2: 创建数据库

在 MySQL 命令行中执行：

```sql
-- 创建数据库（如果不存在）
CREATE DATABASE IF NOT EXISTS supreset 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

-- 验证数据库是否创建成功
SHOW DATABASES;
```

你应该能看到 `supreset` 数据库在列表中。

---

## 步骤 3: 创建数据库用户

在 MySQL 命令行中执行：

```sql
-- 创建用户（替换 'your_strong_password' 为你的实际密码）
CREATE USER IF NOT EXISTS 'supreset_user'@'localhost' 
  IDENTIFIED BY 'your_strong_password';

-- 如果用户已存在，可以先删除再创建
-- DROP USER IF EXISTS 'supreset_user'@'localhost';
-- CREATE USER 'supreset_user'@'localhost' IDENTIFIED BY 'your_strong_password';
```

**重要：**
- 将 `your_strong_password` 替换为你的实际密码
- 密码应该足够强（至少 12 个字符，包含字母、数字和特殊字符）
- 记住这个密码，稍后需要在 `.env` 文件中使用

---

## 步骤 4: 授予权限

在 MySQL 命令行中执行：

```sql
-- 授予所有权限
GRANT ALL PRIVILEGES ON supreset.* TO 'supreset_user'@'localhost';

-- 刷新权限
FLUSH PRIVILEGES;

-- 验证权限
SHOW GRANTS FOR 'supreset_user'@'localhost';
```

---

## 步骤 5: 验证用户和数据库

在 MySQL 命令行中执行：

```sql
-- 查看所有用户
SELECT user, host FROM mysql.user WHERE user = 'supreset_user';

-- 查看数据库
SHOW DATABASES LIKE 'supreset';

-- 退出 MySQL
EXIT;
```

---

## 步骤 6: 配置 .env 文件

回到终端，配置 `.env` 文件：

```bash
# 进入项目目录
cd /var/www/supreset@SODA/nextjs-mysql

# 如果 .env 不存在，从模板创建
if [ ! -f .env ]; then
    cp env.template .env
fi

# 编辑 .env 文件
nano .env
```

在 `.env` 文件中配置以下内容（**替换为实际值**）：

```env
# 数据库连接
# 格式: mysql://用户名:密码@主机:端口/数据库名
# 注意：将 your_strong_password 替换为你在步骤 3 中设置的密码
DATABASE_URL="mysql://supreset_user:your_strong_password@localhost:3306/supreset"

# JWT 密钥（生成强随机字符串）
# 在终端执行: openssl rand -base64 32
JWT_SECRET="生成的JWT密钥"

# 环境变量
NODE_ENV="production"

# Next.js 公共 URL（根据实际情况修改）
NEXT_PUBLIC_APP_URL="https://你的域名.com"
```

**在 nano 编辑器中：**
- 按 `Ctrl + O` 保存
- 按 `Enter` 确认
- 按 `Ctrl + X` 退出

**生成 JWT_SECRET：**

```bash
# 生成 JWT 密钥
openssl rand -base64 32

# 复制输出的字符串，粘贴到 .env 文件的 JWT_SECRET 中
```

---

## 步骤 7: 测试数据库连接

### 方法 1: 使用 MySQL 客户端测试

```bash
# 使用新创建的用户登录测试
mysql -u supreset_user -p supreset

# 输入密码后，如果成功登录，说明用户和密码正确
# 然后退出
EXIT;
```

### 方法 2: 使用 Prisma 测试

```bash
# 测试 Prisma 连接
npx dotenv -e .env -- npx prisma db pull

# 或检查迁移状态
npx dotenv -e .env -- npx prisma migrate status
```

如果成功，你会看到：
- `Database schema is up to date!` 或
- 数据库结构信息

如果失败，检查：
1. 密码是否正确
2. 用户是否存在
3. 权限是否授予

---

## 完整配置脚本（一键执行）

如果你想一次性完成所有配置，可以使用以下脚本：

```bash
cd /var/www/supreset@SODA/nextjs-mysql

# 1. 生成 JWT 密钥
JWT_SECRET=$(openssl rand -base64 32)

# 2. 提示输入数据库密码
echo "请输入数据库用户 supreset_user 的密码："
read -s DB_PASSWORD

# 3. 创建 .env 文件
cat > .env << EOF
# 数据库连接
DATABASE_URL="mysql://supreset_user:${DB_PASSWORD}@localhost:3306/supreset"

# JWT 密钥
JWT_SECRET="${JWT_SECRET}"

# 环境变量
NODE_ENV="production"

# Next.js 公共 URL
NEXT_PUBLIC_APP_URL="https://你的域名.com"
EOF

# 4. 设置文件权限
chmod 600 .env

echo "✅ .env 文件已创建"
echo "📝 请先在 MySQL 中创建数据库和用户（见步骤 1-4）"
```

---

## 常见问题排查

### 问题 1: 认证失败 (P1000)

**错误信息：**
```
Error: P1000: Authentication failed
```

**解决方法：**

1. **检查密码是否正确**
   ```bash
   # 测试 MySQL 登录
   mysql -u supreset_user -p supreset
   # 输入密码，如果失败说明密码错误
   ```

2. **检查用户是否存在**
   ```sql
   SELECT user, host FROM mysql.user WHERE user = 'supreset_user';
   ```

3. **重新设置密码**
   ```sql
   ALTER USER 'supreset_user'@'localhost' IDENTIFIED BY '新密码';
   FLUSH PRIVILEGES;
   ```

4. **更新 .env 文件中的密码**
   ```bash
   nano .env
   # 更新 DATABASE_URL 中的密码
   ```

### 问题 2: 数据库不存在

**错误信息：**
```
Unknown database 'supreset'
```

**解决方法：**
```sql
CREATE DATABASE supreset CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 问题 3: 权限不足

**错误信息：**
```
Access denied for user 'supreset_user'@'localhost'
```

**解决方法：**
```sql
GRANT ALL PRIVILEGES ON supreset.* TO 'supreset_user'@'localhost';
FLUSH PRIVILEGES;
```

### 问题 4: 密码包含特殊字符

如果密码包含特殊字符（如 `@`、`#`、`%`），需要 URL 编码：

```bash
# 原始密码: P@ssw0rd#123
# URL 编码后:
DATABASE_URL="mysql://supreset_user:P%40ssw0rd%23123@localhost:3306/supreset"
```

常见字符编码：
- `@` → `%40`
- `#` → `%23`
- `%` → `%25`
- `:` → `%3A`
- `/` → `%2F`
- ` ` (空格) → `%20`

---

## 验证配置清单

配置完成后，检查以下项目：

- [ ] 数据库 `supreset` 已创建
- [ ] 用户 `supreset_user` 已创建
- [ ] 用户有访问 `supreset` 数据库的权限
- [ ] `.env` 文件已创建
- [ ] `DATABASE_URL` 配置正确（密码正确）
- [ ] `JWT_SECRET` 已配置
- [ ] 可以使用 `mysql -u supreset_user -p` 登录
- [ ] Prisma 可以连接数据库

---

## 下一步

配置完成后，运行部署脚本：

```bash
bash scripts/deploy-production.sh
```

脚本会自动：
1. 拉取最新代码
2. 安装依赖
3. 生成 Prisma Client
4. 运行数据库迁移
5. 构建项目
6. 重启应用

---

## 总结

**关键步骤：**
1. 在 MySQL 中创建数据库和用户
2. 设置强密码并记住它
3. 在 `.env` 文件中配置 `DATABASE_URL`（使用实际密码）
4. 测试连接确保配置正确

**重要提示：**
- `.env` 文件包含敏感信息，不要提交到 Git
- 密码要足够强，定期更换
- 配置一次后，每次拉取代码都会使用这个配置



