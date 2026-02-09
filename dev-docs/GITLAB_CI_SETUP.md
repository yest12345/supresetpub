# GitLab CI/CD 配置说明

## 📋 概述

`.gitlab-ci.yml` 文件用于自动化构建和部署 Supreset 项目。包含以下阶段：

1. **构建阶段** - 安装依赖、生成 Prisma Client、构建 Next.js 应用
2. **测试阶段** - 运行代码检查（Lint）
3. **部署阶段** - 自动部署到 ECS 服务器

---

## 🔧 配置步骤

### 步骤 1: 在 GitLab 中配置 CI/CD 变量

1. 进入项目：`https://jihulab.com/yest12345/supreset`
2. 进入设置：**Settings** → **CI/CD** → **Variables** → **Expand**
3. 添加以下变量：

#### 生产环境变量

| 变量名 | 类型 | 说明 | 示例值 |
|--------|------|------|--------|
| `SERVER_HOST` | Variable | ECS 服务器 IP 或域名 | `47.109.131.215` |
| `SERVER_USER` | Variable | SSH 用户名 | `root` |
| `SSH_PRIVATE_KEY` | File | SSH 私钥内容 | 见下方说明 |

#### 测试环境变量（可选）

| 变量名 | 类型 | 说明 | 示例值 |
|--------|------|------|--------|
| `STAGING_SERVER_HOST` | Variable | 测试服务器 IP | `staging-server-ip` |
| `STAGING_SERVER_USER` | Variable | 测试服务器 SSH 用户 | `root` |

---

### 步骤 2: 生成 SSH 密钥对

在 ECS 服务器上执行：

```bash
# 生成 SSH 密钥对（如果还没有）
ssh-keygen -t rsa -b 4096 -C "gitlab-ci@supreset" -f ~/.ssh/gitlab_ci_key

# 查看公钥（需要添加到服务器的 authorized_keys）
cat ~/.ssh/gitlab_ci_key.pub >> ~/.ssh/authorized_keys

# 查看私钥（复制到 GitLab CI/CD 变量）
cat ~/.ssh/gitlab_ci_key
```

**重要**：
- 将私钥内容（`~/.ssh/gitlab_ci_key`）复制到 GitLab 的 `SSH_PRIVATE_KEY` 变量
- 将 `SSH_PRIVATE_KEY` 设置为 **File** 类型（不是 Variable）
- 确保私钥包含完整的 `-----BEGIN RSA PRIVATE KEY-----` 到 `-----END RSA PRIVATE KEY-----`

---

### 步骤 3: 配置服务器权限

在 ECS 服务器上执行：

```bash
# 确保项目目录存在
mkdir -p /var/www/supreset@SODA/nextjs-mysql

# 确保 Git 远程仓库已配置
cd /var/www/supreset@SODA/nextjs-mysql
git remote add gitlab https://jihulab.com/yest12345/supreset.git || echo "已存在"

# 确保 PM2 已安装
npm install -g pm2

# 确保有执行权限
chmod +x scripts/*.sh
```

---

## 🚀 使用流程

### 自动构建

每次推送到 `main` 或 `develop` 分支时，GitLab 会自动：

1. ✅ 安装依赖
2. ✅ 生成 Prisma Client
3. ✅ 构建 Next.js 应用
4. ✅ 运行代码检查

### 手动部署

部署需要手动触发：

1. 进入 **CI/CD** → **Pipelines**
2. 找到对应的 Pipeline
3. 点击 **Play** 按钮触发部署

#### 部署到生产环境

- 触发条件：推送到 `main` 分支
- 部署命令：点击 `deploy:production` 作业的 **Play** 按钮

#### 部署到测试环境

- 触发条件：推送到 `develop` 分支
- 部署命令：点击 `deploy:staging` 作业的 **Play** 按钮

---

## 📝 工作流程示例

### 开发新功能

```bash
# 1. 创建功能分支
git checkout -b feature/new-feature

# 2. 开发代码...
# ... 编写代码 ...

# 3. 提交并推送
git add .
git commit -m "feat: 添加新功能"
git push gitlab feature/new-feature

# 4. 在 GitLab 创建 Merge Request
# 5. 代码审查通过后，合并到 develop 分支
# 6. 自动触发构建和测试
# 7. 手动触发测试环境部署
```

### 发布到生产环境

```bash
# 1. 从 develop 合并到 main
git checkout main
git merge develop
git push gitlab main

# 2. 自动触发构建
# 3. 在 GitLab Pipeline 中手动触发生产环境部署
```

---

## 🔍 查看构建日志

1. 进入 **CI/CD** → **Pipelines**
2. 点击对应的 Pipeline
3. 查看各个阶段的日志

---

## ⚙️ 自定义配置

### 修改部署路径

编辑 `.gitlab-ci.yml`，修改 `PROJECT_DIR` 变量：

```yaml
variables:
  PROJECT_DIR: "/your/custom/path"
```

### 修改 PM2 应用名称

编辑 `.gitlab-ci.yml`，修改 `PM2_APP_NAME` 变量：

```yaml
variables:
  PM2_APP_NAME: "your-app-name"
```

### 添加环境变量

在部署脚本中添加环境变量设置：

```yaml
script:
  - |
    ssh $SERVER_USER@$SERVER_HOST << 'ENDSSH'
      export NODE_ENV=production
      export DATABASE_URL="your-database-url"
      # ... 其他命令
    ENDSSH
```

---

## 🐛 常见问题

### 问题 1: SSH 连接失败

**错误信息**：`Permission denied (publickey)`

**解决方案**：
1. 检查 `SSH_PRIVATE_KEY` 变量是否正确配置
2. 确保私钥格式正确（包含完整的 BEGIN/END 标记）
3. 检查服务器的 `~/.ssh/authorized_keys` 是否包含公钥

### 问题 2: 部署时找不到命令

**错误信息**：`command not found: npm` 或 `command not found: pm2`

**解决方案**：
1. 确保服务器已安装 Node.js 和 PM2
2. 在部署脚本中添加 PATH 设置：
   ```bash
   export PATH=$PATH:/usr/local/bin
   ```

### 问题 3: 数据库迁移失败

**错误信息**：`Prisma migration failed`

**解决方案**：
1. 检查服务器的 `.env` 文件中的 `DATABASE_URL`
2. 确保数据库连接正常
3. 可以暂时跳过迁移（脚本中已有 `|| echo` 处理）

### 问题 4: PM2 重启失败

**错误信息**：`pm2 restart failed`

**解决方案**：
1. 检查 PM2 应用名称是否正确
2. 如果应用不存在，脚本会自动创建
3. 检查服务器上的 PM2 状态：`pm2 status`

---

## 📚 相关文档

- [GitLab CI/CD 官方文档](https://docs.gitlab.com/ee/ci/)
- [ECS 部署指南](./ECS_DEPLOYMENT.md)
- [快速部署指南](./DEPLOYMENT_QUICK_START.md)

---

## ✅ 检查清单

配置完成后，请确认：

- [ ] GitLab CI/CD 变量已配置（`SERVER_HOST`, `SERVER_USER`, `SSH_PRIVATE_KEY`）
- [ ] SSH 密钥对已生成并配置
- [ ] 服务器上的项目目录已创建
- [ ] 服务器上已安装 Node.js、npm、PM2
- [ ] 服务器上的 Git 远程仓库已配置
- [ ] 测试推送代码，查看 Pipeline 是否正常运行

---

配置完成后，每次推送代码都会自动构建，部署需要手动触发以确保安全。


